import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save a quote calculation
export const saveQuoteCalculation = mutation({
  args: {
    loanAmount: v.number(),
    termMonths: v.number(),
    interestRate: v.number(),
    monthlyPayment: v.number(),
    totalInterest: v.number(),
    totalAmount: v.number(),
    tradeType: v.optional(v.string()),
    location: v.optional(v.object({
      county: v.string(),
      town: v.string(),
    })),
    leadId: v.optional(v.id("leads")),
    sessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const quoteId = await ctx.db.insert("quoteCalculations", {
      ...args,
      createdAt: Date.now(),
    });
    return quoteId;
  },
});

// Get quotes by session ID (for anonymous users)
export const getQuotesBySession = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("quoteCalculations")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .collect();
  },
});

// Get quotes by lead ID
export const getQuotesByLead = query({
  args: { leadId: v.id("leads") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("quoteCalculations")
      .withIndex("by_lead", (q) => q.eq("leadId", args.leadId))
      .order("desc")
      .collect();
  },
});

// Create a contact submission
export const createContactSubmission = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    leadId: v.optional(v.id("leads")),
  },
  handler: async (ctx, args) => {
    const submissionId = await ctx.db.insert("contactSubmissions", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
    return submissionId;
  },
});

// Get contact submissions by status
export const getContactSubmissions = query({
  args: {
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    if (args.status) {
      const status = args.status;
      return await ctx.db
        .query("contactSubmissions")
        .withIndex("by_status", (q) => q.eq("status", status))
        .order("desc")
        .take(limit);
    }

    return await ctx.db
      .query("contactSubmissions")
      .order("desc")
      .take(limit);
  },
});

// Update contact submission status
export const updateContactStatus = mutation({
  args: {
    submissionId: v.id("contactSubmissions"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.submissionId, {
      status: args.status,
      ...(args.status === "replied" ? { repliedAt: Date.now() } : {}),
    });
  },
});

// Track analytics event
export const trackEvent = mutation({
  args: {
    eventType: v.string(),
    eventData: v.optional(v.any()),
    pagePath: v.string(),
    pageTitle: v.optional(v.string()),
    tradeType: v.optional(v.string()),
    county: v.optional(v.string()),
    town: v.optional(v.string()),
    sessionId: v.string(),
    userAgent: v.optional(v.string()),
    deviceType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("analyticsEvents", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Get analytics events by session
export const getEventsBySession = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("analyticsEvents")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .collect();
  },
});

// Get page view counts (basic analytics)
export const getPageViewCounts = query({
  args: {
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const startDate = args.startDate ?? now - 7 * 24 * 60 * 60 * 1000; // Default to last 7 days
    const endDate = args.endDate ?? now;

    const events = await ctx.db
      .query("analyticsEvents")
      .withIndex("by_event_type", (q) => q.eq("eventType", "page_view"))
      .filter((q) =>
        q.and(
          q.gte(q.field("createdAt"), startDate),
          q.lte(q.field("createdAt"), endDate)
        )
      )
      .collect();

    // Group by page path
    const pageViews: Record<string, number> = {};
    for (const event of events) {
      const path = String(event.pagePath);
      pageViews[path] = (pageViews[path] ?? 0) + 1;
    }

    return {
      total: events.length,
      byPage: pageViews,
      uniqueSessions: new Set(events.map((e) => String(e.sessionId))).size,
    };
  },
});

// Get calculator usage stats
export const getCalculatorStats = query({
  args: {},
  handler: async (ctx) => {
    const quotes = await ctx.db.query("quoteCalculations").collect();

    if (quotes.length === 0) {
      return {
        total: 0,
        avgLoanAmount: 0,
        avgTermMonths: 0,
        avgInterestRate: 0,
        byTrade: {},
      };
    }

    const byTrade: Record<string, number> = {};
    let totalAmount = 0;
    let totalTerm = 0;
    let totalRate = 0;

    for (const quote of quotes) {
      totalAmount += Number(quote.loanAmount || 0);
      totalTerm += Number(quote.termMonths || 0);
      totalRate += Number(quote.interestRate || 0);
      if (quote.tradeType) {
        const trade = String(quote.tradeType);
        byTrade[trade] = (byTrade[trade] ?? 0) + 1;
      }
    }

    return {
      total: quotes.length,
      avgLoanAmount: Math.round(totalAmount / quotes.length),
      avgTermMonths: Math.round(totalTerm / quotes.length),
      avgInterestRate: Math.round((totalRate / quotes.length) * 100) / 100,
      byTrade,
    };
  },
});
