const express = require('express');
const Lead = require('../models/Lead');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * Dashboard overview
 */
router.get('/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const thisWeek = new Date(now.setDate(now.getDate() - 7));
    const thisMonth = new Date(now.setMonth(now.getMonth() - 1));

    // Parallel queries for efficiency
    const [
      totalLeads,
      todayLeads,
      weekLeads,
      monthLeads,
      statusCounts,
      urgentLeads,
      highScoreLeads,
      recentLeads,
      conversionStats
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: today } }),
      Lead.countDocuments({ createdAt: { $gte: thisWeek } }),
      Lead.countDocuments({ createdAt: { $gte: thisMonth } }),
      Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Lead.countDocuments({ 
        'financeDetails.urgency': 'urgent',
        status: { $in: ['new', 'contacted'] }
      }),
      Lead.countDocuments({ leadScore: { $gte: 70 } }),
      Lead.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select('firstName lastName businessName tradeType financeDetails.amount status leadScore createdAt'),
      Lead.aggregate([
        {
          $match: {
            createdAt: { $gte: thisMonth }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            won: {
              $sum: { $cond: [{ $eq: ['$status', 'won'] }, 1, 0] }
            },
            lost: {
              $sum: { $cond: [{ $eq: ['$status', 'lost'] }, 1, 0] }
            },
            totalValue: {
              $sum: { $cond: [{ $eq: ['$status', 'won'] }, '$financeDetails.amount', 0] }
            }
          }
        }
      ])
    ]);

    const statusMap = {};
    statusCounts.forEach(s => {
      statusMap[s._id] = s.count;
    });

    const conversion = conversionStats[0] || { total: 0, won: 0, lost: 0, totalValue: 0 };
    const conversionRate = conversion.total > 0 ? (conversion.won / conversion.total * 100).toFixed(1) : 0;

    res.json({
      overview: {
        total: totalLeads,
        today: todayLeads,
        thisWeek: weekLeads,
        thisMonth: monthLeads
      },
      status: statusMap,
      alerts: {
        urgent: urgentLeads,
        highScore: highScoreLeads
      },
      conversion: {
        rate: conversionRate,
        won: conversion.won,
        lost: conversion.lost,
        totalValue: conversion.totalValue
      },
      recentLeads
    });

  } catch (error) {
    logger.error('Error getting dashboard data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Get all leads with filters and pagination
 */
router.get('/leads', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      status,
      tradeType,
      urgency,
      minScore,
      maxScore,
      assignedTo,
      dateFrom,
      dateTo,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (tradeType) query.tradeType = tradeType;
    if (urgency) query['financeDetails.urgency'] = urgency;
    if (minScore || maxScore) {
      query.leadScore = {};
      if (minScore) query.leadScore.$gte = parseInt(minScore);
      if (maxScore) query.leadScore.$lte = parseInt(maxScore);
    }
    if (assignedTo) query['assignedTo.email'] = assignedTo;
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query
    const leads = await Lead.find(query)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Lead.countDocuments(query);

    res.json({
      leads,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    logger.error('Error getting leads:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Export leads as CSV
 */
router.get('/leads/export', async (req, res) => {
  try {
    const { dateFrom, dateTo, status } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const leads = await Lead.find(query);

    // Create CSV
    const csv = [
      // Headers
      ['Name', 'Business', 'Email', 'Phone', 'Trade', 'Amount', 'Purpose', 'Urgency', 'Status', 'Score', 'Created', 'Last Activity'].join(','),
      // Data rows
      ...leads.map(lead => [
        `"${lead.firstName} ${lead.lastName}"`,
        `"${lead.businessName}"`,
        lead.email,
        lead.phone,
        lead.tradeType,
        lead.financeDetails.amount,
        lead.financeDetails.purpose,
        lead.financeDetails.urgency,
        lead.status,
        lead.leadScore,
        lead.createdAt.toISOString(),
        lead.lastActivityAt.toISOString()
      ].join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="leads-export-${Date.now()}.csv"`);
    res.send(csv);

  } catch (error) {
    logger.error('Error exporting leads:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Get performance metrics
 */
router.get('/metrics/performance', async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    const periodMap = {
      '24h': 1,
      '7d': 7,
      '30d': 30,
      '90d': 90
    };
    
    const days = periodMap[period] || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get daily metrics
    const dailyMetrics = await Lead.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            status: '$status'
          },
          count: { $sum: 1 },
          totalValue: { $sum: '$financeDetails.amount' }
        }
      },
      {
        $sort: { '_id.date': 1 }
      }
    ]);

    // Get conversion funnel
    const funnel = await Lead.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          contacted: {
            $sum: { $cond: [{ $ne: ['$contactedAt', null] }, 1, 0] }
          },
          qualified: {
            $sum: { $cond: [{ $ne: ['$qualifiedAt', null] }, 1, 0] }
          },
          proposalSent: {
            $sum: { $cond: [{ $eq: ['$status', 'proposal-sent'] }, 1, 0] }
          },
          won: {
            $sum: { $cond: [{ $eq: ['$status', 'won'] }, 1, 0] }
          }
        }
      }
    ]);

    // Response time metrics
    const responseMetrics = await Lead.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          contactedAt: { $ne: null }
        }
      },
      {
        $project: {
          responseTime: {
            $divide: [
              { $subtract: ['$contactedAt', '$createdAt'] },
              1000 * 60 // Convert to minutes
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          avgResponseTime: { $avg: '$responseTime' },
          minResponseTime: { $min: '$responseTime' },
          maxResponseTime: { $max: '$responseTime' }
        }
      }
    ]);

    res.json({
      period,
      dailyMetrics,
      funnel: funnel[0] || {},
      responseTime: responseMetrics[0] || {}
    });

  } catch (error) {
    logger.error('Error getting performance metrics:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Get team performance
 */
router.get('/metrics/team', async (req, res) => {
  try {
    const teamMetrics = await Lead.aggregate([
      {
        $match: {
          'assignedTo.email': { $exists: true }
        }
      },
      {
        $group: {
          _id: '$assignedTo.email',
          name: { $first: '$assignedTo.name' },
          totalLeads: { $sum: 1 },
          contacted: {
            $sum: { $cond: [{ $ne: ['$contactedAt', null] }, 1, 0] }
          },
          qualified: {
            $sum: { $cond: [{ $eq: ['$status', 'qualified'] }, 1, 0] }
          },
          won: {
            $sum: { $cond: [{ $eq: ['$status', 'won'] }, 1, 0] }
          },
          totalValue: {
            $sum: { $cond: [{ $eq: ['$status', 'won'] }, '$financeDetails.amount', 0] }
          },
          avgScore: { $avg: '$leadScore' }
        }
      },
      {
        $project: {
          email: '$_id',
          name: 1,
          totalLeads: 1,
          contacted: 1,
          qualified: 1,
          won: 1,
          totalValue: 1,
          avgScore: { $round: ['$avgScore', 1] },
          conversionRate: {
            $multiply: [
              { $divide: ['$won', '$totalLeads'] },
              100
            ]
          }
        }
      },
      {
        $sort: { conversionRate: -1 }
      }
    ]);

    res.json(teamMetrics);

  } catch (error) {
    logger.error('Error getting team metrics:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Assign lead to team member
 */
router.post('/leads/:id/assign', async (req, res) => {
  try {
    const { assignedTo } = req.body;
    
    if (!assignedTo || !assignedTo.email) {
      return res.status(400).json({ error: 'Assigned user email is required' });
    }

    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    lead.assignedTo = assignedTo;
    lead.lastActivityAt = new Date();
    
    // Add note about assignment
    lead.notes.push({
      content: `Lead assigned to ${assignedTo.name}`,
      createdBy: 'System',
      createdAt: new Date()
    });
    
    await lead.save();

    res.json({
      success: true,
      lead
    });

  } catch (error) {
    logger.error('Error assigning lead:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Bulk actions on leads
 */
router.post('/leads/bulk-action', async (req, res) => {
  try {
    const { leadIds, action, data } = req.body;
    
    if (!Array.isArray(leadIds) || leadIds.length === 0) {
      return res.status(400).json({ error: 'Lead IDs array is required' });
    }

    let result;
    
    switch (action) {
      case 'assign':
        result = await Lead.updateMany(
          { _id: { $in: leadIds } },
          { 
            $set: { 
              assignedTo: data.assignedTo,
              lastActivityAt: new Date()
            }
          }
        );
        break;
        
      case 'updateStatus':
        result = await Lead.updateMany(
          { _id: { $in: leadIds } },
          { 
            $set: { 
              status: data.status,
              lastActivityAt: new Date()
            }
          }
        );
        break;
        
      case 'addTag':
        result = await Lead.updateMany(
          { _id: { $in: leadIds } },
          { 
            $push: { 'automation.tags': data.tag }
          }
        );
        break;
        
      case 'delete':
        result = await Lead.deleteMany({ _id: { $in: leadIds } });
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({
      success: true,
      affected: result.modifiedCount || result.deletedCount
    });

  } catch (error) {
    logger.error('Error performing bulk action:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;