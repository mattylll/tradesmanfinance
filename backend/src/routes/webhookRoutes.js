const express = require('express');
const crypto = require('crypto');
const Lead = require('../models/Lead');
const smsService = require('../services/smsService');
const logger = require('../utils/logger');
const twilio = require('twilio');

const router = express.Router();

/**
 * Verify webhook signature from GoHighLevel
 */
function verifyGHLWebhook(req) {
  const signature = req.headers['x-ghl-signature'];
  const secret = process.env.GHL_WEBHOOK_SECRET;
  
  if (!signature || !secret) return false;
  
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');
  
  return signature === hash;
}

/**
 * GoHighLevel webhook endpoint
 */
router.post('/gohighlevel', async (req, res) => {
  try {
    // Verify webhook signature
    if (!verifyGHLWebhook(req)) {
      logger.warn('Invalid GHL webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { type, locationId, contactId, opportunityId, data } = req.body;

    logger.info(`GHL webhook received: ${type}`);

    switch (type) {
      case 'ContactCreate':
      case 'ContactUpdate':
        await handleContactUpdate(data);
        break;
        
      case 'OpportunityStatusUpdate':
        await handleOpportunityUpdate(data);
        break;
        
      case 'InboundMessage':
        await handleInboundMessage(data);
        break;
        
      case 'TaskCompleted':
        await handleTaskCompleted(data);
        break;
        
      default:
        logger.info(`Unhandled GHL webhook type: ${type}`);
    }

    res.json({ success: true });
    
  } catch (error) {
    logger.error('GHL webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * Twilio SMS webhook endpoint
 */
/**
 * Helper: Compute public URL for signature validation (behind proxy-safe)
 */
function computePublicUrl(req) {
  const base = process.env.TWILIO_WEBHOOK_BASE_URL || process.env.API_URL || `${req.protocol}://${req.get('host')}`;
  return `${base}${req.originalUrl}`;
}

/**
 * Verify Twilio webhook signature
 */
function verifyTwilioWebhook(req) {
  const signature = req.headers['x-twilio-signature'];
  const url = computePublicUrl(req);
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken || !signature) return false;
  // Twilio validates against form params for urlencoded payloads
  return twilio.validateRequest(authToken, signature, url, req.body || {});
}

router.post('/twilio/sms', async (req, res) => {
  try {
    // Validate Twilio signature
    if (!verifyTwilioWebhook(req)) {
      logger.warn('Invalid Twilio SMS webhook signature');
      return res.status(401).send('Invalid signature');
    }

    const { From, Body, MessageSid } = req.body;
    
    logger.info(`SMS received from ${From}: ${Body}`);

    // Find lead by phone number
    const lead = await Lead.findOne({ 
      phone: { $regex: From.replace(/\D/g, '').slice(-10) } 
    });

    if (lead) {
      // Add to communication history
      lead.addCommunication(
        'sms',
        'inbound',
        'SMS Reply',
        Body,
        'Customer'
      );
      
      lead.lastActivityAt = new Date();
      await lead.save();
      
      // Process auto-response
      const response = await smsService.handleIncomingSMS(From, Body);
      
      // Update lead based on response
      if (response.keyword === 'callback') {
        lead.automation.tags.push('requested-callback');
        await lead.save();
      }
    } else {
      // Unknown number - still send auto-response
      await smsService.handleIncomingSMS(From, Body);
    }

    // Twilio expects TwiML response
    res.type('text/xml');
    res.send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
    
  } catch (error) {
    logger.error('Twilio webhook error:', error);
    res.status(500).send('Error processing SMS');
  }
});

/**
 * Twilio voice status webhook
 */
router.post('/twilio/voice/status', async (req, res) => {
  try {
    // Validate Twilio signature
    if (!verifyTwilioWebhook(req)) {
      logger.warn('Invalid Twilio Voice webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { CallSid, CallStatus, To, Duration } = req.body;
    
    logger.info(`Call status update: ${CallStatus} for ${To}`);

    // Find lead by phone number
    const lead = await Lead.findOne({ 
      phone: { $regex: To.replace(/\D/g, '').slice(-10) } 
    });

    if (lead) {
      // Add call record
      lead.addCommunication(
        'call',
        'outbound',
        `Call ${CallStatus}`,
        `Duration: ${Duration} seconds`,
        'System'
      );
      
      // Update status based on call outcome
      if (CallStatus === 'completed' && parseInt(Duration) > 30) {
        lead.status = 'contacted';
        lead.contactedAt = new Date();
      }
      
      lead.lastActivityAt = new Date();
      await lead.save();
    }

    res.json({ success: true });
    
  } catch (error) {
    logger.error('Twilio voice webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * SendGrid webhook endpoint
 */
router.post('/sendgrid/events', async (req, res) => {
  try {
    // Optional: Verify SendGrid (Twilio Email) event webhook signature
    try {
      const publicKey = process.env.SENDGRID_WEBHOOK_PUBLIC_KEY;
      const sgSig = req.headers['x-twilio-email-event-webhook-signature'];
      const sgTs = req.headers['x-twilio-email-event-webhook-timestamp'];
      if (publicKey && sgSig && sgTs) {
        try {
          const { EventWebhook } = require('@sendgrid/eventwebhook');
          const eventWebhook = new EventWebhook();
          const ecPublicKey = eventWebhook.convertPublicKeyToECDSA(publicKey);
          const payload = req.rawBody || JSON.stringify(req.body || '');
          const isValid = eventWebhook.verifySignature(ecPublicKey, payload, sgSig, sgTs);
          if (!isValid) {
            logger.warn('Invalid SendGrid event webhook signature');
            return res.status(401).json({ error: 'Invalid signature' });
          }
        } catch (e) {
          logger.warn('SendGrid signature verification not available (dependency missing). Proceeding without verification.');
        }
      }
    } catch (e) {
      logger.warn('SendGrid verification check failed to initialize');
    }

    const events = req.body;
    
    for (const event of events) {
      const { email, event: eventType, timestamp, url, leadId } = event;
      
      logger.info(`SendGrid event: ${eventType} for ${email}`);
      
      // Find lead by email or custom leadId
      const lead = await Lead.findOne({ 
        $or: [
          { email: email },
          { _id: leadId }
        ]
      });

      if (lead) {
        // Track email engagement
        switch (eventType) {
          case 'open':
            lead.automation.tags.push('email-opened');
            break;
          case 'click':
            lead.automation.tags.push('email-clicked');
            lead.leadScore = Math.min(100, lead.leadScore + 5);
            break;
          case 'bounce':
          case 'dropped':
            lead.automation.tags.push('email-invalid');
            break;
          case 'unsubscribe':
            lead.automation.enrolled = false;
            lead.automation.tags.push('unsubscribed');
            break;
        }
        
        await lead.save();
      }
    }

    res.json({ success: true });
    
  } catch (error) {
    logger.error('SendGrid webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * Helper functions
 */
async function handleContactUpdate(data) {
  try {
    const { id, email, tags } = data;
    
    const lead = await Lead.findOne({ 
      $or: [
        { ghlContactId: id },
        { email: email }
      ]
    });

    if (lead) {
      // Sync tags
      if (tags && Array.isArray(tags)) {
        lead.automation.tags = [...new Set([...lead.automation.tags, ...tags])];
      }
      
      await lead.save();
      logger.info(`Updated lead ${lead._id} from GHL contact ${id}`);
    }
  } catch (error) {
    logger.error('Error handling contact update:', error);
  }
}

async function handleOpportunityUpdate(data) {
  try {
    const { id, status, stageId } = data;
    
    const lead = await Lead.findOne({ ghlOpportunityId: id });
    
    if (lead) {
      // Map GHL stages to our statuses
      const stageMapping = {
        'new': 'new',
        'contacted': 'contacted',
        'qualified': 'qualified',
        'proposal': 'proposal-sent',
        'negotiation': 'negotiating',
        'won': 'won',
        'lost': 'lost'
      };
      
      const newStatus = stageMapping[status] || lead.status;
      
      if (newStatus !== lead.status) {
        lead.status = newStatus;
        lead.lastActivityAt = new Date();
        await lead.save();
        
        logger.info(`Updated lead ${lead._id} status to ${newStatus} from GHL`);
      }
    }
  } catch (error) {
    logger.error('Error handling opportunity update:', error);
  }
}

async function handleInboundMessage(data) {
  try {
    const { contactId, type, body } = data;
    
    const lead = await Lead.findOne({ ghlContactId: contactId });
    
    if (lead) {
      lead.addCommunication(
        type.toLowerCase(),
        'inbound',
        'Message from GHL',
        body,
        'Customer'
      );
      
      lead.lastActivityAt = new Date();
      await lead.save();
      
      // Trigger response if needed
      if (type === 'SMS' && body.toLowerCase().includes('urgent')) {
        lead.automation.tags.push('urgent-response-needed');
        await lead.save();
      }
    }
  } catch (error) {
    logger.error('Error handling inbound message:', error);
  }
}

async function handleTaskCompleted(data) {
  try {
    const { contactId, title, completedBy } = data;
    
    const lead = await Lead.findOne({ ghlContactId: contactId });
    
    if (lead) {
      lead.addCommunication(
        'note',
        'outbound',
        `Task Completed: ${title}`,
        `Completed by ${completedBy}`,
        completedBy
      );
      
      lead.lastActivityAt = new Date();
      await lead.save();
    }
  } catch (error) {
    logger.error('Error handling task completion:', error);
  }
}

module.exports = router;
