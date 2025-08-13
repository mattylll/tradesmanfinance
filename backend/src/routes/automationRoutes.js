const express = require('express');
const Lead = require('../models/Lead');
const leadAutomation = require('../automations/leadAutomation');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * Get automation status for a lead
 */
router.get('/lead/:leadId/status', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.leadId);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json({
      leadId: lead._id,
      automation: lead.automation,
      communications: lead.communications.slice(-10), // Last 10 communications
      status: lead.status,
      leadScore: lead.leadScore
    });

  } catch (error) {
    logger.error('Error getting automation status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Manually trigger automation step
 */
router.post('/lead/:leadId/trigger', async (req, res) => {
  try {
    const { action } = req.body;
    const lead = await Lead.findById(req.params.leadId);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    let result;
    
    switch (action) {
      case 'welcome-email':
        result = await emailService.sendWelcomeEmail(lead);
        break;
        
      case 'welcome-sms':
        result = await smsService.sendWelcomeSMS(lead);
        break;
        
      case 'first-followup':
        await leadAutomation.followUpQueue.add(
          { leadId: lead._id, followUpType: 'first' },
          { delay: 0 }
        );
        result = { queued: true };
        break;
        
      case 'calculate-score':
        lead.calculateScore();
        await lead.save();
        result = { leadScore: lead.leadScore };
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({
      success: true,
      action,
      result
    });

  } catch (error) {
    logger.error('Error triggering automation:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Pause/resume automation for a lead
 */
router.patch('/lead/:leadId/enrollment', async (req, res) => {
  try {
    const { enrolled } = req.body;
    const lead = await Lead.findById(req.params.leadId);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    lead.automation.enrolled = enrolled;
    
    if (!enrolled) {
      // Cancel any scheduled jobs
      const jobs = await leadAutomation.followUpQueue.getJobs(['delayed', 'waiting']);
      for (const job of jobs) {
        if (job.data.leadId === req.params.leadId) {
          await job.remove();
        }
      }
    }
    
    await lead.save();

    res.json({
      success: true,
      enrolled: lead.automation.enrolled
    });

  } catch (error) {
    logger.error('Error updating enrollment:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Get queue statistics
 */
router.get('/queues/stats', async (req, res) => {
  try {
    const queues = {
      newLead: leadAutomation.newLeadQueue,
      followUp: leadAutomation.followUpQueue,
      nurturing: leadAutomation.nurturingQueue
    };

    const stats = {};

    for (const [name, queue] of Object.entries(queues)) {
      const counts = await queue.getJobCounts();
      stats[name] = {
        waiting: counts.waiting,
        active: counts.active,
        completed: counts.completed,
        failed: counts.failed,
        delayed: counts.delayed,
        paused: counts.paused
      };
    }

    res.json(stats);

  } catch (error) {
    logger.error('Error getting queue stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Retry failed jobs
 */
router.post('/queues/:queueName/retry-failed', async (req, res) => {
  try {
    const queueMap = {
      'new-lead': leadAutomation.newLeadQueue,
      'follow-up': leadAutomation.followUpQueue,
      'nurturing': leadAutomation.nurturingQueue
    };

    const queue = queueMap[req.params.queueName];
    
    if (!queue) {
      return res.status(400).json({ error: 'Invalid queue name' });
    }

    const failedJobs = await queue.getFailed();
    let retried = 0;

    for (const job of failedJobs) {
      await job.retry();
      retried++;
    }

    res.json({
      success: true,
      retriedJobs: retried
    });

  } catch (error) {
    logger.error('Error retrying failed jobs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Send test communication
 */
router.post('/test/communication', async (req, res) => {
  try {
    const { type, to, content } = req.body;
    
    let result;
    
    switch (type) {
      case 'email':
        result = await emailService.sendEmail(
          to,
          'Test Email from Tradesman Finance',
          content || 'This is a test email.'
        );
        break;
        
      case 'sms':
        result = await smsService.sendSMS(
          to,
          content || 'Test SMS from Tradesman Finance'
        );
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid type' });
    }

    res.json({
      success: true,
      type,
      result
    });

  } catch (error) {
    logger.error('Error sending test communication:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get automation templates
 */
router.get('/templates', async (req, res) => {
  try {
    const templates = {
      email: {
        welcome: 'Welcome email sent immediately after form submission',
        'first-followup': 'First follow-up email (timing based on urgency)',
        'second-followup': 'Second follow-up email',
        'final-followup': 'Final follow-up before moving to nurturing'
      },
      sms: {
        welcome: 'Welcome SMS with confirmation',
        urgent: 'Urgent lead SMS for immediate attention',
        'follow-up': 'Follow-up SMS variations',
        reminder: 'Appointment reminder SMS'
      },
      workflows: {
        'new-lead': 'Complete new lead processing workflow',
        'follow-up': 'Multi-channel follow-up sequence',
        'nurturing': 'Long-term nurturing campaign'
      }
    };

    res.json(templates);

  } catch (error) {
    logger.error('Error getting templates:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Bulk update automation settings
 */
router.post('/bulk/update', async (req, res) => {
  try {
    const { leadIds, updates } = req.body;
    
    if (!Array.isArray(leadIds) || leadIds.length === 0) {
      return res.status(400).json({ error: 'Lead IDs array is required' });
    }

    const result = await Lead.updateMany(
      { _id: { $in: leadIds } },
      { 
        $set: {
          'automation.enrolled': updates.enrolled,
          'automation.tags': updates.tags
        }
      }
    );

    res.json({
      success: true,
      modified: result.modifiedCount
    });

  } catch (error) {
    logger.error('Error bulk updating:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;