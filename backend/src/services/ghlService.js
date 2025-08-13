const axios = require('axios');
const logger = require('../utils/logger');

class GoHighLevelService {
  constructor() {
    this.apiKey = process.env.GHL_API_KEY;
    this.locationId = process.env.GHL_LOCATION_ID;
    this.baseURL = 'https://rest.gohighlevel.com/v1';
    
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Create or update a contact in GoHighLevel
   */
  async createOrUpdateContact(leadData) {
    try {
      // Check if contact exists
      const existingContact = await this.findContactByEmail(leadData.email);
      
      const contactData = {
        email: leadData.email,
        phone: leadData.phone,
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        name: `${leadData.firstName} ${leadData.lastName}`,
        companyName: leadData.businessName,
        tags: [
          `trade:${leadData.tradeType}`,
          `amount:${leadData.financeDetails.amount}`,
          `urgency:${leadData.financeDetails.urgency}`,
          `source:website`,
          'new-lead'
        ],
        customField: {
          trade_type: leadData.tradeType,
          finance_amount: leadData.financeDetails.amount,
          finance_purpose: leadData.financeDetails.purpose,
          years_trading: leadData.businessInfo.yearsTrading,
          monthly_revenue: leadData.businessInfo.monthlyRevenue,
          lead_score: leadData.leadScore,
          city: leadData.location.city,
          postcode: leadData.location.postcode
        },
        source: 'Tradesman Finance Website',
        locationId: this.locationId
      };

      let contact;
      if (existingContact) {
        // Update existing contact
        contact = await this.axiosInstance.put(`/contacts/${existingContact.id}`, contactData);
        logger.info(`Updated GHL contact: ${existingContact.id}`);
      } else {
        // Create new contact
        contact = await this.axiosInstance.post('/contacts/', contactData);
        logger.info(`Created new GHL contact: ${contact.data.contact.id}`);
      }

      return contact.data.contact;
    } catch (error) {
      logger.error('GHL contact creation error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Create an opportunity (deal) in GoHighLevel
   */
  async createOpportunity(contactId, leadData) {
    try {
      const opportunityData = {
        title: `${leadData.businessName} - ${leadData.tradeType} - £${leadData.financeDetails.amount}`,
        contactId: contactId,
        status: 'open',
        pipelineId: await this.getDefaultPipelineId(),
        pipelineStageId: await this.getNewLeadStageId(),
        monetaryValue: leadData.financeDetails.amount,
        assignedTo: await this.getAssignedUserId(leadData),
        customFields: {
          trade_type: leadData.tradeType,
          urgency: leadData.financeDetails.urgency,
          finance_purpose: leadData.financeDetails.purpose
        },
        locationId: this.locationId
      };

      const opportunity = await this.axiosInstance.post('/opportunities/', opportunityData);
      logger.info(`Created GHL opportunity: ${opportunity.data.opportunity.id}`);
      
      return opportunity.data.opportunity;
    } catch (error) {
      logger.error('GHL opportunity creation error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Add a note to a contact
   */
  async addNote(contactId, noteContent) {
    try {
      const noteData = {
        body: noteContent,
        contactId: contactId,
        userId: await this.getSystemUserId()
      };

      await this.axiosInstance.post('/contacts/notes', noteData);
      logger.info(`Added note to GHL contact: ${contactId}`);
    } catch (error) {
      logger.error('GHL note creation error:', error.response?.data || error.message);
    }
  }

  /**
   * Send SMS via GoHighLevel
   */
  async sendSMS(contactId, message) {
    try {
      const smsData = {
        type: 'SMS',
        contactId: contactId,
        message: message
      };

      const response = await this.axiosInstance.post('/conversations/messages', smsData);
      logger.info(`Sent SMS via GHL to contact: ${contactId}`);
      return response.data;
    } catch (error) {
      logger.error('GHL SMS error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Send email via GoHighLevel
   */
  async sendEmail(contactId, subject, body, attachments = []) {
    try {
      const emailData = {
        type: 'Email',
        contactId: contactId,
        subject: subject,
        body: body,
        attachments: attachments
      };

      const response = await this.axiosInstance.post('/conversations/messages', emailData);
      logger.info(`Sent email via GHL to contact: ${contactId}`);
      return response.data;
    } catch (error) {
      logger.error('GHL email error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Create a task in GoHighLevel
   */
  async createTask(contactId, title, description, dueDate, assignedTo) {
    try {
      const taskData = {
        title: title,
        body: description,
        dueDate: dueDate,
        contactId: contactId,
        assignedTo: assignedTo || await this.getSystemUserId(),
        status: 'pending'
      };

      const response = await this.axiosInstance.post('/contacts/tasks', taskData);
      logger.info(`Created task in GHL for contact: ${contactId}`);
      return response.data;
    } catch (error) {
      logger.error('GHL task creation error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Update opportunity stage
   */
  async updateOpportunityStage(opportunityId, stageId) {
    try {
      const response = await this.axiosInstance.put(`/opportunities/${opportunityId}`, {
        pipelineStageId: stageId
      });
      logger.info(`Updated GHL opportunity stage: ${opportunityId}`);
      return response.data;
    } catch (error) {
      logger.error('GHL opportunity update error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Add contact to workflow/campaign
   */
  async addToWorkflow(contactId, workflowId) {
    try {
      const response = await this.axiosInstance.post(`/contacts/${contactId}/workflow/${workflowId}`);
      logger.info(`Added contact ${contactId} to workflow ${workflowId}`);
      return response.data;
    } catch (error) {
      logger.error('GHL workflow error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Helper methods
   */
  async findContactByEmail(email) {
    try {
      const response = await this.axiosInstance.get('/contacts/', {
        params: {
          email: email,
          locationId: this.locationId
        }
      });
      return response.data.contacts[0] || null;
    } catch (error) {
      logger.error('GHL contact search error:', error.response?.data || error.message);
      return null;
    }
  }

  async getDefaultPipelineId() {
    // In production, fetch this from GHL API or use environment variable
    return process.env.GHL_PIPELINE_ID || 'default-pipeline-id';
  }

  async getNewLeadStageId() {
    // In production, fetch this from GHL API or use environment variable
    return process.env.GHL_NEW_LEAD_STAGE_ID || 'new-lead-stage-id';
  }

  async getSystemUserId() {
    // In production, fetch this from GHL API or use environment variable
    return process.env.GHL_SYSTEM_USER_ID || 'system-user-id';
  }

  async getAssignedUserId(leadData) {
    // Logic to determine which user to assign based on lead data
    // For now, use round-robin or lead score based assignment
    if (leadData.leadScore >= 70) {
      return process.env.GHL_SENIOR_SALES_USER_ID || 'senior-sales-id';
    }
    return process.env.GHL_SALES_USER_ID || 'sales-user-id';
  }
}

module.exports = new GoHighLevelService();