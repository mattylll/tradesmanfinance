import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Lead management - captures all quote requests and contact form submissions
  leads: defineTable({
    // Contact Information
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    businessName: v.optional(v.string()),

    // Trade & Location Context
    tradeType: v.string(),
    location: v.object({
      county: v.string(),
      town: v.string(),
      postcode: v.optional(v.string()),
    }),

    // Finance Details
    financeDetails: v.object({
      amount: v.number(),
      purpose: v.string(),
      urgency: v.string(), // "urgent", "this-week", "this-month", "planning"
      term: v.optional(v.number()), // months
      preferredRate: v.optional(v.number()),
    }),

    // Business Information (from multi-step form)
    businessInfo: v.optional(v.object({
      yearsTrading: v.optional(v.string()),
      annualRevenue: v.optional(v.string()),
      employees: v.optional(v.string()),
      certifications: v.optional(v.array(v.string())),
      creditScore: v.optional(v.string()),
    })),

    // Lead Scoring & Status
    score: v.number(), // 0-100 based on urgency, amount, business info
    status: v.string(), // "new", "contacted", "qualified", "proposal", "converted", "lost"
    priority: v.string(), // "hot", "warm", "cold"

    // Tracking
    source: v.string(), // page URL or campaign
    referrer: v.optional(v.string()),
    utmParams: v.optional(v.object({
      source: v.optional(v.string()),
      medium: v.optional(v.string()),
      campaign: v.optional(v.string()),
    })),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
    lastContactedAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_priority", ["priority"])
    .index("by_trade", ["tradeType"])
    .index("by_created", ["createdAt"]),

  // Quote calculations saved by users
  quoteCalculations: defineTable({
    // Calculator inputs
    loanAmount: v.number(),
    termMonths: v.number(),
    interestRate: v.number(),

    // Calculated results
    monthlyPayment: v.number(),
    totalInterest: v.number(),
    totalAmount: v.number(),

    // Context
    tradeType: v.optional(v.string()),
    location: v.optional(v.object({
      county: v.string(),
      town: v.string(),
    })),

    // Optional lead association
    leadId: v.optional(v.id("leads")),

    // Session tracking (for anonymous users)
    sessionId: v.optional(v.string()),

    // Timestamps
    createdAt: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_lead", ["leadId"]),

  // Contact form submissions (general inquiries)
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),

    // Optional association
    leadId: v.optional(v.id("leads")),

    // Status
    status: v.string(), // "new", "read", "replied", "archived"

    // Timestamps
    createdAt: v.number(),
    repliedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),

  // Analytics events for tracking user behavior
  analyticsEvents: defineTable({
    // Event identification
    eventType: v.string(), // "page_view", "calculator_use", "form_start", "form_complete", "cta_click"
    eventData: v.optional(v.any()),

    // Page context
    pagePath: v.string(),
    pageTitle: v.optional(v.string()),

    // Trade/Location context
    tradeType: v.optional(v.string()),
    county: v.optional(v.string()),
    town: v.optional(v.string()),

    // Session tracking
    sessionId: v.string(),

    // Device info
    userAgent: v.optional(v.string()),
    deviceType: v.optional(v.string()), // "mobile", "tablet", "desktop"

    // Timestamps
    createdAt: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_event_type", ["eventType"])
    .index("by_page", ["pagePath"])
    .index("by_created", ["createdAt"]),
});
