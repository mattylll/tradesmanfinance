const Bull = require('bull');
const cron = require('node-cron');
const Lead = require('../models/Lead');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const ghlService = require('../services/ghlService');
const logger = require('../utils/logger');

class LeadAutomation {
  constructor() {
    // Create job queues
    this.newLeadQueue = new Bull('new-lead-processing', process.env.REDIS_URL);
    this.followUpQueue = new Bull('follow-up-automation', process.env.REDIS_URL);
    this.nurturingQueue = new Bull('lead-nurturing', process.env.REDIS_URL);
    
    this.initializeQueues();
    this.scheduleCronJobs();
  }

  /**
   * Initialize queue processors
   */
  initializeQueues() {
    // Process new leads
    this.newLeadQueue.process(async (job) => {
      const { leadId } = job.data;
      await this.processNewLead(leadId);
    });

    // Process follow-ups
    this.followUpQueue.process(async (job) => {
      const { leadId, followUpType } = job.data;
      await this.processFollowUp(leadId, followUpType);
    });

    // Process nurturing campaigns
    this.nurturingQueue.process(async (job) => {
      const { leadId, campaignStep } = job.data;
      await this.processNurturingStep(leadId, campaignStep);
    });
  }

  /**
   * Process new lead workflow
   */
  async processNewLead(leadId) {
    try {
      const lead = await Lead.findById(leadId);
      if (!lead) throw new Error('Lead not found');

      logger.info(`Processing new lead: ${leadId}`);

      // Step 1: Calculate and update lead score
      lead.calculateScore();
      await lead.save();

      // Step 2: Create/update in GoHighLevel
      if (process.env.GHL_API_KEY) {
        const ghlContact = await ghlService.createOrUpdateContact(lead);
        lead.ghlContactId = ghlContact.id;
        
        const ghlOpportunity = await ghlService.createOpportunity(ghlContact.id, lead);
        lead.ghlOpportunityId = ghlOpportunity.id;
        
        await lead.save();
      }

      // Step 3: Send immediate notifications
      await Promise.all([
        // Send welcome email to lead
        emailService.sendWelcomeEmail(lead),
        
        // Send notification to sales team
        emailService.sendNewLeadNotification(lead),
        
        // Send SMS if urgent
        lead.financeDetails.urgency === 'urgent' ? 
          smsService.sendUrgentLeadSMS(lead) : 
          smsService.sendWelcomeSMS(lead)
      ]);

      // Step 4: Add communication records
      lead.addCommunication('email', 'outbound', 'Welcome Email', 'Automated welcome email sent', 'System');
      lead.addCommunication('sms', 'outbound', 'Welcome SMS', 'Automated welcome SMS sent', 'System');
      await lead.save();

      // Step 5: Schedule follow-ups based on urgency
      await this.scheduleFollowUps(lead);

      // Step 6: Trigger immediate call for high-value urgent leads
      if (lead.leadScore >= 70 && lead.financeDetails.urgency === 'urgent') {
        await this.triggerImmediateCall(lead);
      }

      // Step 7: Add to GHL workflow if configured
      if (lead.ghlContactId && process.env.GHL_WORKFLOW_ID) {
        await ghlService.addToWorkflow(lead.ghlContactId, process.env.GHL_WORKFLOW_ID);
      }

      logger.info(`New lead processing completed: ${leadId}`);
      
    } catch (error) {
      logger.error(`Error processing new lead ${leadId}:`, error);
      throw error;
    }
  }

  /**
   * Schedule follow-up sequences
   */
  async scheduleFollowUps(lead) {
    const delays = {
      'urgent': {
        first: 30 * 60 * 1000,      // 30 minutes
        second: 2 * 60 * 60 * 1000,  // 2 hours
        third: 24 * 60 * 60 * 1000   // 24 hours
      },
      'this-week': {
        first: 2 * 60 * 60 * 1000,   // 2 hours
        second: 24 * 60 * 60 * 1000,  // 24 hours
        third: 3 * 24 * 60 * 60 * 1000 // 3 days
      },
      'this-month': {
        first: 24 * 60 * 60 * 1000,     // 24 hours
        second: 3 * 24 * 60 * 60 * 1000, // 3 days
        third: 7 * 24 * 60 * 60 * 1000   // 7 days
      },
      'planning': {
        first: 3 * 24 * 60 * 60 * 1000,  // 3 days
        second: 7 * 24 * 60 * 60 * 1000,  // 7 days
        third: 14 * 24 * 60 * 60 * 1000  // 14 days
      }
    };

    const urgencyDelays = delays[lead.financeDetails.urgency] || delays['this-month'];

    // Schedule follow-up sequences
    await this.followUpQueue.add(
      { leadId: lead._id, followUpType: 'first' },
      { delay: urgencyDelays.first }
    );

    await this.followUpQueue.add(
      { leadId: lead._id, followUpType: 'second' },
      { delay: urgencyDelays.second }
    );

    await this.followUpQueue.add(
      { leadId: lead._id, followUpType: 'third' },
      { delay: urgencyDelays.third }
    );
  }

  /**
   * Process follow-up automation
   */
  async processFollowUp(leadId, followUpType) {
    try {
      const lead = await Lead.findById(leadId);
      if (!lead) throw new Error('Lead not found');

      // Skip if lead is already won or lost
      if (['won', 'lost'].includes(lead.status)) {
        logger.info(`Skipping follow-up for ${leadId} - status: ${lead.status}`);
        return;
      }

      // Skip if recently contacted
      const hoursSinceLastActivity = (Date.now() - lead.lastActivityAt) / (1000 * 60 * 60);
      if (hoursSinceLastActivity < 4) {
        logger.info(`Skipping follow-up for ${leadId} - recently contacted`);
        return;
      }

      logger.info(`Processing ${followUpType} follow-up for lead: ${leadId}`);

      // Send appropriate follow-up
      switch (followUpType) {
        case 'first':
          await this.sendFirstFollowUp(lead);
          break;
        case 'second':
          await this.sendSecondFollowUp(lead);
          break;
        case 'third':
          await this.sendFinalFollowUp(lead);
          break;
      }

      // Update automation status
      lead.automation.completedSteps.push(`followup-${followUpType}`);
      lead.lastActivityAt = new Date();
      await lead.save();

    } catch (error) {
      logger.error(`Error processing follow-up for ${leadId}:`, error);
      throw error;
    }
  }

  /**
   * Send first follow-up
   */
  async sendFirstFollowUp(lead) {
    // Multi-channel approach
    await Promise.all([
      emailService.sendFollowUpEmail(lead, 'first-followup'),
      smsService.sendFollowUpSMS(lead, 'first')
    ]);

    // Add communication records
    lead.addCommunication('email', 'outbound', 'First Follow-up', 'Automated first follow-up sent', 'System');
    lead.addCommunication('sms', 'outbound', 'First Follow-up SMS', 'Automated follow-up SMS sent', 'System');
    
    // Create task in GHL
    if (lead.ghlContactId) {
      await ghlService.createTask(
        lead.ghlContactId,
        `Call ${lead.firstName} - First Follow-up`,
        `Lead hasn't responded to initial contact. Score: ${lead.leadScore}`,
        new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        lead.assignedTo?.email
      );
    }
  }

  /**
   * Send second follow-up
   */
  async sendSecondFollowUp(lead) {
    // Increase urgency
    await emailService.sendFollowUpEmail(lead, 'second-followup');
    
    // Only SMS during business hours
    if (this.isBusinessHours()) {
      await smsService.sendFollowUpSMS(lead, 'second');
    }

    lead.addCommunication('email', 'outbound', 'Second Follow-up', 'Automated second follow-up sent', 'System');
    
    // Update lead score (slight decrease for non-response)
    lead.leadScore = Math.max(0, lead.leadScore - 10);
    
    // Escalate in GHL
    if (lead.ghlOpportunityId) {
      await ghlService.updateOpportunityStage(lead.ghlOpportunityId, process.env.GHL_FOLLOW_UP_STAGE_ID);
    }
  }

  /**
   * Send final follow-up
   */
  async sendFinalFollowUp(lead) {
    await emailService.sendFollowUpEmail(lead, 'final-followup');
    
    // Final SMS attempt
    if (this.isBusinessHours()) {
      await smsService.sendFollowUpSMS(lead, 'final');
    }

    lead.addCommunication('email', 'outbound', 'Final Follow-up', 'Automated final follow-up sent', 'System');
    
    // Schedule for long-term nurturing
    await this.nurturingQueue.add(
      { leadId: lead._id, campaignStep: 'monthly-1' },
      { delay: 30 * 24 * 60 * 60 * 1000 } // 30 days
    );

    // Update status
    lead.status = 'on-hold';
    lead.automation.currentStep = 'nurturing';
  }

  /**
   * Trigger immediate call for hot leads
   */
  async triggerImmediateCall(lead) {
    try {
      // Integration with call system (e.g., Aircall, RingCentral)
      // For now, we'll send urgent notifications
      
      // SMS to assigned salesperson
      if (lead.assignedTo?.phone) {
        await smsService.sendSMS(
          lead.assignedTo.phone,
          `🔥 HOT LEAD: ${lead.firstName} ${lead.lastName} needs £${lead.financeDetails.amount} URGENTLY. Call NOW: ${lead.phone}`
        );
      }

      // Create high-priority task
      if (lead.ghlContactId) {
        await ghlService.createTask(
          lead.ghlContactId,
          `🔥 URGENT CALL REQUIRED`,
          `High-value urgent lead. Call within 5 minutes!`,
          new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
          lead.assignedTo?.email
        );
      }

      logger.info(`Immediate call triggered for lead: ${lead._id}`);
      
    } catch (error) {
      logger.error('Error triggering immediate call:', error);
    }
  }

  /**
   * Process nurturing campaign steps
   */
  async processNurturingStep(leadId, campaignStep) {
    try {
      const lead = await Lead.findById(leadId);
      if (!lead || ['won', 'lost'].includes(lead.status)) return;

      // Long-term nurturing content
      const nurturingContent = {
        'monthly-1': {
          subject: 'New Finance Options Available',
          template: 'nurturing-new-options'
        },
        'monthly-2': {
          subject: 'Success Story: How We Helped a Fellow ' + lead.tradeType,
          template: 'nurturing-case-study'
        },
        'monthly-3': {
          subject: 'Exclusive Rates for ' + lead.tradeType + ' Businesses',
          template: 'nurturing-special-offer'
        }
      };

      // Send nurturing email
      // await emailService.sendNurturingEmail(lead, nurturingContent[campaignStep]);

      // Schedule next step
      const nextSteps = {
        'monthly-1': 'monthly-2',
        'monthly-2': 'monthly-3',
        'monthly-3': 'monthly-1'
      };

      await this.nurturingQueue.add(
        { leadId: lead._id, campaignStep: nextSteps[campaignStep] },
        { delay: 30 * 24 * 60 * 60 * 1000 } // 30 days
      );

    } catch (error) {
      logger.error(`Error processing nurturing for ${leadId}:`, error);
    }
  }

  /**
   * Schedule cron jobs for regular tasks
   */
  scheduleCronJobs() {
    // Daily lead review at 9 AM
    cron.schedule('0 9 * * *', async () => {
      await this.dailyLeadReview();
    });

    // Check for stale leads every 4 hours
    cron.schedule('0 */4 * * *', async () => {
      await this.checkStaleLeads();
    });

    // Weekly performance report on Mondays at 8 AM
    cron.schedule('0 8 * * 1', async () => {
      await this.weeklyPerformanceReport();
    });
  }

  /**
   * Daily lead review
   */
  async dailyLeadReview() {
    try {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      // Find leads that haven't been contacted
      const unconctactedLeads = await Lead.find({
        createdAt: { $gte: yesterday },
        status: 'new',
        'communications.0': { $exists: false }
      });

      // Send alert if there are uncontacted leads
      if (unconctactedLeads.length > 0) {
        // Send alert to admin
        logger.warn(`${unconctactedLeads.length} leads from yesterday haven't been contacted`);
      }

    } catch (error) {
      logger.error('Error in daily lead review:', error);
    }
  }

  /**
   * Check for stale leads
   */
  async checkStaleLeads() {
    try {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      
      const staleLeads = await Lead.find({
        status: { $in: ['new', 'contacted'] },
        lastActivityAt: { $lt: threeDaysAgo }
      });

      for (const lead of staleLeads) {
        // Re-engage stale leads
        await this.followUpQueue.add(
          { leadId: lead._id, followUpType: 'first' },
          { delay: 0 } // Immediate
        );
      }

      logger.info(`Re-engaged ${staleLeads.length} stale leads`);
      
    } catch (error) {
      logger.error('Error checking stale leads:', error);
    }
  }

  /**
   * Helper methods
   */
  isBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    // Monday-Friday, 9 AM - 6 PM
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  }
}

module.exports = new LeadAutomation();