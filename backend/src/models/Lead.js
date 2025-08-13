const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  // Basic Information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  businessName: { type: String, required: true },
  
  // Trade Information
  tradeType: { 
    type: String, 
    required: true,
    enum: ['electrician', 'plumber', 'builder', 'carpenter', 'heating-engineer', 
           'roofer', 'painter-decorator', 'plasterer', 'tiler', 'scaffolder',
           'groundworker', 'landscaper', 'shop-fitter', 'window-fitter', 
           'bathroom-fitter', 'flooring-contractor', 'demolition', 'bricklayer',
           'air-conditioning', 'locksmith']
  },
  
  // Location
  location: {
    city: String,
    region: String,
    postcode: String,
    fullAddress: String
  },
  
  // Finance Requirements
  financeDetails: {
    purpose: { type: String, enum: ['equipment', 'vehicle', 'working-capital', 'expansion', 'other'] },
    amount: { type: Number, required: true },
    term: { type: Number }, // in months
    urgency: { type: String, enum: ['urgent', 'this-week', 'this-month', 'planning'] },
    specificNeeds: String
  },
  
  // Business Information
  businessInfo: {
    yearsTrading: Number,
    monthlyRevenue: Number,
    companyNumber: String,
    vatRegistered: { type: Boolean, default: false },
    employees: Number,
    accreditations: [String]
  },
  
  // Lead Status
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal-sent', 'negotiating', 'won', 'lost', 'on-hold'],
    default: 'new'
  },
  
  // Lead Score (0-100)
  leadScore: {
    type: Number,
    default: 0
  },
  
  // Source Information
  source: {
    page: String,
    campaign: String,
    medium: String,
    device: String,
    ip: String
  },
  
  // Communication History
  communications: [{
    type: { type: String, enum: ['email', 'sms', 'call', 'note'] },
    direction: { type: String, enum: ['inbound', 'outbound'] },
    subject: String,
    content: String,
    timestamp: { type: Date, default: Date.now },
    sentBy: String,
    status: String
  }],
  
  // Automation Status
  automation: {
    enrolled: { type: Boolean, default: true },
    currentStep: String,
    completedSteps: [String],
    nextActionDate: Date,
    tags: [String]
  },
  
  // Assignment
  assignedTo: {
    name: String,
    email: String,
    phone: String
  },
  
  // GoHighLevel Integration
  ghlContactId: String,
  ghlOpportunityId: String,
  
  // Timestamps
  contactedAt: Date,
  qualifiedAt: Date,
  closedAt: Date,
  lastActivityAt: { type: Date, default: Date.now },
  
  // Custom Fields
  customFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  
  // Notes
  notes: [{
    content: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Indexes for performance
leadSchema.index({ email: 1 });
leadSchema.index({ phone: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ 'assignedTo.email': 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ leadScore: -1 });

// Calculate lead score
leadSchema.methods.calculateScore = function() {
  let score = 0;
  
  // Amount requested (higher = better)
  if (this.financeDetails.amount >= 50000) score += 20;
  else if (this.financeDetails.amount >= 25000) score += 15;
  else if (this.financeDetails.amount >= 10000) score += 10;
  
  // Business maturity
  if (this.businessInfo.yearsTrading >= 3) score += 15;
  else if (this.businessInfo.yearsTrading >= 1) score += 10;
  
  // Monthly revenue
  if (this.businessInfo.monthlyRevenue >= 20000) score += 20;
  else if (this.businessInfo.monthlyRevenue >= 10000) score += 15;
  else if (this.businessInfo.monthlyRevenue >= 5000) score += 10;
  
  // Urgency
  if (this.financeDetails.urgency === 'urgent') score += 20;
  else if (this.financeDetails.urgency === 'this-week') score += 15;
  else if (this.financeDetails.urgency === 'this-month') score += 10;
  
  // Complete information
  if (this.businessInfo.companyNumber) score += 5;
  if (this.businessInfo.vatRegistered) score += 5;
  if (this.location.postcode) score += 5;
  
  this.leadScore = Math.min(score, 100);
  return this.leadScore;
};

// Add communication
leadSchema.methods.addCommunication = function(type, direction, subject, content, sentBy) {
  this.communications.push({
    type,
    direction,
    subject,
    content,
    sentBy,
    timestamp: new Date()
  });
  this.lastActivityAt = new Date();
};

module.exports = mongoose.model('Lead', leadSchema);