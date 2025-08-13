const express = require('express');
const { body, validationResult } = require('express-validator');
const Lead = require('../models/Lead');
const leadAutomation = require('../automations/leadAutomation');
const logger = require('../utils/logger');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * Create new lead from website form
 */
router.post('/submit', [
  // Validation
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('businessName').trim().notEmpty().withMessage('Business name is required'),
  body('tradeType').isIn(['electrician', 'plumber', 'builder', 'carpenter', 'heating-engineer', 
    'roofer', 'painter-decorator', 'plasterer', 'tiler', 'scaffolder',
    'groundworker', 'landscaper', 'shop-fitter', 'window-fitter', 
    'bathroom-fitter', 'flooring-contractor', 'demolition', 'bricklayer',
    'air-conditioning', 'locksmith']).withMessage('Valid trade type is required'),
  body('financeDetails.amount').isNumeric().withMessage('Finance amount must be a number'),
  body('financeDetails.purpose').isIn(['equipment', 'vehicle', 'working-capital', 'expansion', 'other']).withMessage('Valid purpose is required')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check for duplicate submission
    const existingLead = await Lead.findOne({
      email: req.body.email,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Within last 24 hours
    });

    if (existingLead) {
      return res.status(409).json({
        error: 'Duplicate submission',
        message: 'You have already submitted an application recently. We will contact you soon.'
      });
    }

    // Create new lead
    const leadData = {
      ...req.body,
      source: {
        page: req.headers.referer || 'unknown',
        campaign: req.query.utm_campaign || 'organic',
        medium: req.query.utm_medium || 'website',
        device: req.headers['user-agent'],
        ip: req.ip
      }
    };

    const lead = new Lead(leadData);
    
    // Calculate initial lead score
    lead.calculateScore();
    
    // Save to database
    await lead.save();
    
    logger.info(`New lead created: ${lead._id} - ${lead.email}`);

    // Add to automation queue
    await leadAutomation.newLeadQueue.add({ leadId: lead._id });

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Your application has been received. We will contact you shortly.',
      leadId: lead._id,
      estimatedResponseTime: lead.financeDetails.urgency === 'urgent' ? '30 minutes' : '2 hours'
    });

  } catch (error) {
    logger.error('Error creating lead:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'There was an error processing your application. Please try again or call us directly.'
    });
  }
});

/**
 * Get lead by ID (for internal use)
 */
router.get('/:id([a-f0-9]{24})', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    logger.error('Error fetching lead:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Update lead status
 */
router.patch('/:id([a-f0-9]{24})/status', auth, [
  body('status').isIn(['new', 'contacted', 'qualified', 'proposal-sent', 'negotiating', 'won', 'lost', 'on-hold']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const oldStatus = lead.status;
    lead.status = req.body.status;
    
    // Update timestamps based on status
    if (req.body.status === 'contacted' && !lead.contactedAt) {
      lead.contactedAt = new Date();
    } else if (req.body.status === 'qualified' && !lead.qualifiedAt) {
      lead.qualifiedAt = new Date();
    } else if (['won', 'lost'].includes(req.body.status) && !lead.closedAt) {
      lead.closedAt = new Date();
    }

    lead.lastActivityAt = new Date();
    await lead.save();

    logger.info(`Lead ${lead._id} status updated: ${oldStatus} -> ${req.body.status}`);

    res.json({
      success: true,
      lead: lead
    });

  } catch (error) {
    logger.error('Error updating lead status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Add note to lead
 */
router.post('/:id([a-f0-9]{24})/notes', auth, [
  body('content').trim().notEmpty().withMessage('Note content is required'),
  body('createdBy').trim().notEmpty().withMessage('Creator name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    lead.notes.push({
      content: req.body.content,
      createdBy: req.body.createdBy,
      createdAt: new Date()
    });

    lead.lastActivityAt = new Date();
    await lead.save();

    res.json({
      success: true,
      note: lead.notes[lead.notes.length - 1]
    });

  } catch (error) {
    logger.error('Error adding note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Add communication record
 */
router.post('/:id([a-f0-9]{24})/communications', auth, [
  body('type').isIn(['email', 'sms', 'call', 'note']).withMessage('Invalid communication type'),
  body('direction').isIn(['inbound', 'outbound']).withMessage('Invalid direction'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('sentBy').trim().notEmpty().withMessage('Sender is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    lead.addCommunication(
      req.body.type,
      req.body.direction,
      req.body.subject,
      req.body.content || '',
      req.body.sentBy
    );

    await lead.save();

    res.json({
      success: true,
      communication: lead.communications[lead.communications.length - 1]
    });

  } catch (error) {
    logger.error('Error adding communication:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Search leads
 */
router.get('/search', auth, async (req, res) => {
  try {
    const {
      status,
      tradeType,
      minScore,
      assignedTo,
      dateFrom,
      dateTo,
      page = 1,
      limit = 20
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (tradeType) query.tradeType = tradeType;
    if (minScore) query.leadScore = { $gte: parseInt(minScore) };
    if (assignedTo) query['assignedTo.email'] = assignedTo;
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Lead.countDocuments(query);

    res.json({
      leads,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    logger.error('Error searching leads:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Get lead statistics
 */
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    
    const thisMonth = new Date();
    thisMonth.setMonth(thisMonth.getMonth() - 1);

    const stats = await Promise.all([
      // Total leads
      Lead.countDocuments(),
      
      // Today's leads
      Lead.countDocuments({ createdAt: { $gte: today } }),
      
      // This week's leads
      Lead.countDocuments({ createdAt: { $gte: thisWeek } }),
      
      // This month's leads
      Lead.countDocuments({ createdAt: { $gte: thisMonth } }),
      
      // Status breakdown
      Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      
      // Average lead score
      Lead.aggregate([
        { $group: { _id: null, avgScore: { $avg: '$leadScore' } } }
      ]),
      
      // Top trade types
      Lead.aggregate([
        { $group: { _id: '$tradeType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    res.json({
      total: stats[0],
      today: stats[1],
      thisWeek: stats[2],
      thisMonth: stats[3],
      statusBreakdown: stats[4],
      averageScore: stats[5][0]?.avgScore || 0,
      topTrades: stats[6]
    });

  } catch (error) {
    logger.error('Error getting stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
