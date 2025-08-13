const twilio = require('twilio');
const logger = require('../utils/logger');

class SMSService {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
  }

  /**
   * Send SMS to lead
   */
  async sendSMS(to, message) {
    try {
      // Ensure UK format
      const formattedNumber = this.formatUKNumber(to);
      
      const result = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: formattedNumber
      });

      logger.info(`SMS sent successfully: ${result.sid}`);
      return {
        success: true,
        messageId: result.sid,
        status: result.status
      };
    } catch (error) {
      logger.error('SMS sending error:', error);
      throw error;
    }
  }

  /**
   * Send welcome SMS to new lead
   */
  async sendWelcomeSMS(lead) {
    const message = `Hi ${lead.firstName}, thanks for your finance enquiry with Tradesman Finance. We're reviewing your £${lead.financeDetails.amount} request and will call you shortly. Need urgent help? Call 020 3778 0274`;

    return this.sendSMS(lead.phone, message);
  }

  /**
   * Send urgent lead SMS
   */
  async sendUrgentLeadSMS(lead) {
    const message = `${lead.firstName}, I see you need URGENT finance. I'm ${lead.assignedTo?.name || 'your specialist'} from Tradesman Finance. I can get you approved TODAY. Call me now: 020 3778 0274`;

    return this.sendSMS(lead.phone, message);
  }

  /**
   * Send follow-up SMS
   */
  async sendFollowUpSMS(lead, followUpType) {
    const messages = {
      'first': `Hi ${lead.firstName}, tried calling about your £${lead.financeDetails.amount} finance. You pre-qualify! Call back on 020 3778 0274 or reply CALLBACK`,
      'second': `${lead.firstName}, your pre-approved finance expires tomorrow. Don't miss out on rates from 4.9%. Call 020 3778 0274 now`,
      'final': `Last chance ${lead.firstName}! Your £${lead.financeDetails.amount} finance approval expires today. Call urgently: 020 3778 0274`
    };

    const message = messages[followUpType];
    if (!message) {
      throw new Error(`Unknown follow-up type: ${followUpType}`);
    }

    return this.sendSMS(lead.phone, message);
  }

  /**
   * Send appointment reminder
   */
  async sendAppointmentReminder(lead, appointmentTime) {
    const message = `Reminder: ${lead.firstName}, we have your finance consultation scheduled for ${appointmentTime}. We'll call you on ${lead.phone}. Reply CONFIRM or RESCHEDULE`;

    return this.sendSMS(lead.phone, message);
  }

  /**
   * Send status update SMS
   */
  async sendStatusUpdateSMS(lead, status) {
    const messages = {
      'qualified': `Great news ${lead.firstName}! You're PRE-APPROVED for finance. Check your email or call 020 3778 0274 to proceed`,
      'proposal-sent': `${lead.firstName}, your finance proposal is ready! Check your email now. Questions? Call 020 3778 0274`,
      'won': `Congratulations ${lead.firstName}! Your £${lead.financeDetails.amount} finance is APPROVED! We'll call you shortly with next steps`,
      'documents-needed': `Hi ${lead.firstName}, we need a few documents to complete your finance. Check your email or call 020 3778 0274`
    };

    const message = messages[status];
    if (!message) {
      throw new Error(`No SMS template for status: ${status}`);
    }

    return this.sendSMS(lead.phone, message);
  }

  /**
   * Send OTP for verification
   */
  async sendOTP(phone, otp) {
    const message = `Your Tradesman Finance verification code is: ${otp}. Valid for 10 minutes. Don't share this code.`;
    return this.sendSMS(phone, message);
  }

  /**
   * Handle incoming SMS (webhooks)
   */
  async handleIncomingSMS(from, body) {
    const normalizedBody = body.toLowerCase().trim();
    
    // Auto-responses
    const responses = {
      'callback': 'Thanks for your message. A finance specialist will call you within 30 minutes during business hours.',
      'stop': 'You\'ve been unsubscribed from Tradesman Finance SMS. Call 020 3778 0274 if you need help.',
      'help': 'Tradesman Finance: Call 020 3778 0274 Mon-Fri 9am-6pm. Email: help@tradesmanfinance.co.uk',
      'confirm': 'Thanks for confirming! We\'ll call you as scheduled.',
      'reschedule': 'No problem. Please call 020 3778 0274 to reschedule your consultation.'
    };

    // Check for keywords
    for (const [keyword, response] of Object.entries(responses)) {
      if (normalizedBody.includes(keyword)) {
        await this.sendSMS(from, response);
        return { handled: true, keyword, response };
      }
    }

    // Default response for unrecognized messages
    await this.sendSMS(from, 'Thanks for your message. A team member will review and respond shortly. For urgent help, call 020 3778 0274');
    
    return { handled: false, body };
  }

  /**
   * Send bulk SMS (for campaigns)
   */
  async sendBulkSMS(recipients, message, options = {}) {
    const results = [];
    const { batchSize = 10, delayMs = 1000 } = options;

    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      
      const batchPromises = batch.map(recipient => 
        this.sendSMS(recipient.phone, this.personalizeMessage(message, recipient))
          .then(result => ({ ...result, recipient: recipient.phone }))
          .catch(error => ({ 
            success: false, 
            recipient: recipient.phone, 
            error: error.message 
          }))
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Delay between batches to avoid rate limits
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    logger.info(`Bulk SMS complete: ${successful} sent, ${failed} failed`);
    
    return {
      total: recipients.length,
      successful,
      failed,
      results
    };
  }

  /**
   * Helper methods
   */
  formatUKNumber(phone) {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, '');
    
    // Handle UK numbers
    if (cleaned.startsWith('44')) {
      return `+${cleaned}`;
    } else if (cleaned.startsWith('0')) {
      return `+44${cleaned.substring(1)}`;
    } else if (cleaned.length === 10) {
      // Assume UK number without country code or leading 0
      return `+44${cleaned}`;
    }
    
    // Default: assume it's already in correct format
    return phone.startsWith('+') ? phone : `+${phone}`;
  }

  personalizeMessage(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || match;
    });
  }

  /**
   * Check SMS delivery status
   */
  async checkMessageStatus(messageId) {
    try {
      const message = await this.client.messages(messageId).fetch();
      return {
        status: message.status,
        errorCode: message.errorCode,
        errorMessage: message.errorMessage,
        dateUpdated: message.dateUpdated
      };
    } catch (error) {
      logger.error('Error checking message status:', error);
      throw error;
    }
  }

  /**
   * Get SMS usage stats
   */
  async getUsageStats(startDate, endDate) {
    try {
      const messages = await this.client.messages.list({
        dateSentAfter: startDate,
        dateSentBefore: endDate,
        from: this.fromNumber
      });

      const stats = {
        total: messages.length,
        delivered: messages.filter(m => m.status === 'delivered').length,
        failed: messages.filter(m => m.status === 'failed').length,
        pending: messages.filter(m => ['queued', 'sending'].includes(m.status)).length
      };

      return stats;
    } catch (error) {
      logger.error('Error getting SMS stats:', error);
      throw error;
    }
  }
}

module.exports = new SMSService();