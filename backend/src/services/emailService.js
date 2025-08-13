const sgMail = require('@sendgrid/mail');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL;
    this.fromName = process.env.SENDGRID_FROM_NAME;
  }

  /**
   * Send welcome email to new lead
   */
  async sendWelcomeEmail(lead) {
    const template = {
      to: lead.email,
      from: {
        email: this.fromEmail,
        name: this.fromName
      },
      subject: `Welcome ${lead.firstName} - Your Finance Application Received`,
      html: this.getWelcomeTemplate(lead),
      text: this.getWelcomeTextTemplate(lead)
    };

    try {
      await sgMail.send(template);
      logger.info(`Welcome email sent to ${lead.email}`);
      return { success: true };
    } catch (error) {
      logger.error('Welcome email error:', error);
      throw error;
    }
  }

  /**
   * Send notification to admin/sales team
   */
  async sendNewLeadNotification(lead) {
    const template = {
      to: process.env.SALES_TEAM_EMAIL,
      from: {
        email: this.fromEmail,
        name: this.fromName
      },
      subject: `🔥 New ${lead.tradeType} Lead - ${lead.businessName} - £${lead.financeDetails.amount}`,
      html: this.getNewLeadTemplate(lead),
      text: this.getNewLeadTextTemplate(lead),
      cc: process.env.ADMIN_EMAIL
    };

    try {
      await sgMail.send(template);
      logger.info(`New lead notification sent for ${lead._id}`);
      return { success: true };
    } catch (error) {
      logger.error('New lead notification error:', error);
      throw error;
    }
  }

  /**
   * Send follow-up email
   */
  async sendFollowUpEmail(lead, followUpType) {
    const templates = {
      'first-followup': {
        subject: `${lead.firstName}, Quick Question About Your £${lead.financeDetails.amount} Finance Request`,
        html: this.getFirstFollowUpTemplate(lead)
      },
      'second-followup': {
        subject: `Important: Your Finance Pre-Approval Status`,
        html: this.getSecondFollowUpTemplate(lead)
      },
      'final-followup': {
        subject: `Final Notice: Your Finance Application Expires Soon`,
        html: this.getFinalFollowUpTemplate(lead)
      }
    };

    const template = templates[followUpType];
    if (!template) {
      throw new Error(`Unknown follow-up type: ${followUpType}`);
    }

    const email = {
      to: lead.email,
      from: {
        email: this.fromEmail,
        name: this.fromName
      },
      subject: template.subject,
      html: template.html,
      replyTo: process.env.SALES_TEAM_EMAIL
    };

    try {
      await sgMail.send(email);
      logger.info(`${followUpType} email sent to ${lead.email}`);
      return { success: true };
    } catch (error) {
      logger.error(`${followUpType} email error:`, error);
      throw error;
    }
  }

  /**
   * Send application status update
   */
  async sendStatusUpdate(lead, newStatus, message) {
    const statusMessages = {
      'qualified': 'Great news! You\'ve been pre-qualified for finance.',
      'proposal-sent': 'Your personalized finance proposal is ready.',
      'won': 'Congratulations! Your finance has been approved.',
      'lost': 'Update on your finance application.'
    };

    const email = {
      to: lead.email,
      from: {
        email: this.fromEmail,
        name: this.fromName
      },
      subject: statusMessages[newStatus] || 'Update on Your Finance Application',
      html: this.getStatusUpdateTemplate(lead, newStatus, message),
      replyTo: lead.assignedTo?.email || process.env.SALES_TEAM_EMAIL
    };

    try {
      await sgMail.send(email);
      logger.info(`Status update email sent to ${lead.email}`);
      return { success: true };
    } catch (error) {
      logger.error('Status update email error:', error);
      throw error;
    }
  }

  /**
   * Email Templates
   */
  getWelcomeTemplate(lead) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ff6b35; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .button { display: inline-block; padding: 12px 30px; background-color: #ff6b35; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Tradesman Finance</h1>
          </div>
          <div class="content">
            <h2>Hi ${lead.firstName},</h2>
            <p>Thank you for choosing Tradesman Finance for your ${lead.tradeType} business funding needs.</p>
            <p><strong>Your Application Details:</strong></p>
            <ul>
              <li>Amount Requested: £${lead.financeDetails.amount.toLocaleString()}</li>
              <li>Purpose: ${lead.financeDetails.purpose}</li>
              <li>Business: ${lead.businessName}</li>
            </ul>
            <p><strong>What Happens Next?</strong></p>
            <ol>
              <li>Our finance expert will review your application within 2 hours</li>
              <li>We'll call you on ${lead.phone} to discuss your options</li>
              <li>You'll receive your personalized quote within 24 hours</li>
            </ol>
            <a href="tel:02037780274" class="button">Call Us Now: 020 3778 0274</a>
            <p>Need urgent funding? Reply to this email or call us directly.</p>
            <p>Best regards,<br>The Tradesman Finance Team</p>
          </div>
          <div class="footer">
            <p>Tradesman Finance Ltd | Built Tough for Business</p>
            <p>This email was sent to ${lead.email}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getWelcomeTextTemplate(lead) {
    return `
Hi ${lead.firstName},

Thank you for choosing Tradesman Finance for your ${lead.tradeType} business funding needs.

Your Application Details:
- Amount Requested: £${lead.financeDetails.amount.toLocaleString()}
- Purpose: ${lead.financeDetails.purpose}
- Business: ${lead.businessName}

What Happens Next?
1. Our finance expert will review your application within 2 hours
2. We'll call you on ${lead.phone} to discuss your options
3. You'll receive your personalized quote within 24 hours

Need urgent funding? Call us now: 020 3778 0274

Best regards,
The Tradesman Finance Team
    `;
  }

  getNewLeadTemplate(lead) {
    const urgencyColors = {
      'urgent': '#ff0000',
      'this-week': '#ff6b35',
      'this-month': '#ffd93d',
      'planning': '#39ff14'
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .alert { background-color: #ff6b35; color: white; padding: 15px; text-align: center; font-weight: bold; }
          .lead-score { font-size: 48px; font-weight: bold; color: ${lead.leadScore >= 70 ? '#39ff14' : lead.leadScore >= 40 ? '#ffd93d' : '#ff6b35'}; }
          .details { background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .urgency { display: inline-block; padding: 5px 15px; background-color: ${urgencyColors[lead.financeDetails.urgency]}; color: white; border-radius: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="alert">🔥 NEW LEAD ALERT - IMMEDIATE ACTION REQUIRED</div>
          
          <h2>Lead Score: <span class="lead-score">${lead.leadScore}/100</span></h2>
          
          <div class="details">
            <h3>Contact Information:</h3>
            <p><strong>Name:</strong> ${lead.firstName} ${lead.lastName}</p>
            <p><strong>Business:</strong> ${lead.businessName}</p>
            <p><strong>Phone:</strong> <a href="tel:${lead.phone}">${lead.phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
            <p><strong>Location:</strong> ${lead.location.city || 'Not specified'}</p>
          </div>
          
          <div class="details">
            <h3>Finance Requirements:</h3>
            <p><strong>Trade Type:</strong> ${lead.tradeType}</p>
            <p><strong>Amount:</strong> £${lead.financeDetails.amount.toLocaleString()}</p>
            <p><strong>Purpose:</strong> ${lead.financeDetails.purpose}</p>
            <p><strong>Urgency:</strong> <span class="urgency">${lead.financeDetails.urgency.toUpperCase()}</span></p>
          </div>
          
          <div class="details">
            <h3>Business Details:</h3>
            <p><strong>Years Trading:</strong> ${lead.businessInfo.yearsTrading || 'Not specified'}</p>
            <p><strong>Monthly Revenue:</strong> £${lead.businessInfo.monthlyRevenue?.toLocaleString() || 'Not specified'}</p>
            <p><strong>VAT Registered:</strong> ${lead.businessInfo.vatRegistered ? 'Yes' : 'No'}</p>
          </div>
          
          <div class="details" style="background-color: #ffeeee;">
            <h3>⚡ Action Required:</h3>
            <ol>
              <li>Call within 5 minutes for urgent leads</li>
              <li>Check CRM for duplicate entries</li>
              <li>Prepare quote based on requirements</li>
              <li>Update lead status after contact</li>
            </ol>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getNewLeadTextTemplate(lead) {
    return `
🔥 NEW LEAD ALERT - IMMEDIATE ACTION REQUIRED

Lead Score: ${lead.leadScore}/100

Contact Information:
Name: ${lead.firstName} ${lead.lastName}
Business: ${lead.businessName}
Phone: ${lead.phone}
Email: ${lead.email}
Location: ${lead.location.city || 'Not specified'}

Finance Requirements:
Trade Type: ${lead.tradeType}
Amount: £${lead.financeDetails.amount.toLocaleString()}
Purpose: ${lead.financeDetails.purpose}
Urgency: ${lead.financeDetails.urgency.toUpperCase()}

Business Details:
Years Trading: ${lead.businessInfo.yearsTrading || 'Not specified'}
Monthly Revenue: £${lead.businessInfo.monthlyRevenue?.toLocaleString() || 'Not specified'}
VAT Registered: ${lead.businessInfo.vatRegistered ? 'Yes' : 'No'}

Action Required:
1. Call within 5 minutes for urgent leads
2. Check CRM for duplicate entries
3. Prepare quote based on requirements
4. Update lead status after contact
    `;
  }

  getFirstFollowUpTemplate(lead) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ff6b35; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .button { display: inline-block; padding: 12px 30px; background-color: #ff6b35; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .highlight { background-color: #ffd93d; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Quick Question, ${lead.firstName}</h1>
          </div>
          <div class="content">
            <p>Hi ${lead.firstName},</p>
            <p>I've been reviewing your finance application for £${lead.financeDetails.amount.toLocaleString()} and have some great news!</p>
            <div class="highlight">
              <p><strong>✅ You pre-qualify for multiple funding options</strong></p>
              <p>Based on your ${lead.tradeType} business profile, we've identified 3-5 lenders who are actively looking to fund businesses like yours.</p>
            </div>
            <p>I just need 2 minutes on the phone to:</p>
            <ul>
              <li>Confirm your best rate (starting from 4.9% APR)</li>
              <li>Lock in your pre-approval amount</li>
              <li>Get your funds released within 24-48 hours</li>
            </ul>
            <p><strong>I'll be calling ${lead.phone} shortly, but if you want to speed things up:</strong></p>
            <a href="tel:02037780274" class="button">Call Me Direct: 020 3778 0274</a>
            <p>Speak soon,<br>
            ${lead.assignedTo?.name || 'Your Finance Specialist'}<br>
            Tradesman Finance</p>
            <p style="font-size: 12px; color: #666;">P.S. These pre-approved rates are only valid for 48 hours, so let's chat soon!</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getSecondFollowUpTemplate(lead) {
    // Similar template structure...
    return `<!-- Second follow-up template HTML -->`;
  }

  getFinalFollowUpTemplate(lead) {
    // Similar template structure...
    return `<!-- Final follow-up template HTML -->`;
  }

  getStatusUpdateTemplate(lead, newStatus, message) {
    // Similar template structure...
    return `<!-- Status update template HTML -->`;
  }
}

module.exports = new EmailService();