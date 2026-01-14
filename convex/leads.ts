import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Calculate lead score based on various factors
function calculateLeadScore(data: {
  amount: number;
  urgency: string;
  yearsTrading?: string;
  annualRevenue?: string;
  creditScore?: string;
}): { score: number; priority: "hot" | "warm" | "cold" } {
  let score = 0;

  // Amount scoring (0-30 points)
  if (data.amount >= 100000) score += 30;
  else if (data.amount >= 50000) score += 25;
  else if (data.amount >= 25000) score += 20;
  else if (data.amount >= 10000) score += 15;
  else if (data.amount >= 5000) score += 10;
  else score += 5;

  // Urgency scoring (0-30 points)
  switch (data.urgency) {
    case "urgent":
      score += 30;
      break;
    case "this-week":
      score += 25;
      break;
    case "this-month":
      score += 15;
      break;
    case "planning":
      score += 5;
      break;
  }

  // Years trading scoring (0-15 points)
  if (data.yearsTrading) {
    if (data.yearsTrading === "5+") score += 15;
    else if (data.yearsTrading === "3-5") score += 12;
    else if (data.yearsTrading === "1-3") score += 8;
    else score += 4;
  }

  // Annual revenue scoring (0-15 points)
  if (data.annualRevenue) {
    if (data.annualRevenue === "500k+") score += 15;
    else if (data.annualRevenue === "250k-500k") score += 12;
    else if (data.annualRevenue === "100k-250k") score += 8;
    else if (data.annualRevenue === "50k-100k") score += 5;
    else score += 2;
  }

  // Credit score scoring (0-10 points)
  if (data.creditScore) {
    if (data.creditScore === "excellent") score += 10;
    else if (data.creditScore === "good") score += 8;
    else if (data.creditScore === "fair") score += 5;
    else score += 2;
  }

  // Determine priority
  let priority: "hot" | "warm" | "cold";
  if (score >= 70) priority = "hot";
  else if (score >= 40) priority = "warm";
  else priority = "cold";

  return { score: Math.min(score, 100), priority };
}

// Create a new lead from form submission
export const createLead = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    businessName: v.optional(v.string()),
    tradeType: v.string(),
    location: v.object({
      county: v.string(),
      town: v.string(),
      postcode: v.optional(v.string()),
    }),
    financeDetails: v.object({
      amount: v.number(),
      purpose: v.string(),
      urgency: v.string(),
      term: v.optional(v.number()),
      preferredRate: v.optional(v.number()),
    }),
    businessInfo: v.optional(v.object({
      yearsTrading: v.optional(v.string()),
      annualRevenue: v.optional(v.string()),
      employees: v.optional(v.string()),
      certifications: v.optional(v.array(v.string())),
      creditScore: v.optional(v.string()),
    })),
    source: v.string(),
    referrer: v.optional(v.string()),
    utmParams: v.optional(v.object({
      source: v.optional(v.string()),
      medium: v.optional(v.string()),
      campaign: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Calculate lead score and priority
    const { score, priority } = calculateLeadScore({
      amount: args.financeDetails.amount,
      urgency: args.financeDetails.urgency,
      yearsTrading: args.businessInfo?.yearsTrading,
      annualRevenue: args.businessInfo?.annualRevenue,
      creditScore: args.businessInfo?.creditScore,
    });

    const leadId = await ctx.db.insert("leads", {
      ...args,
      score,
      priority,
      status: "new",
      createdAt: now,
      updatedAt: now,
    });

    return { leadId, score, priority };
  },
});

// Update lead status
export const updateLeadStatus = mutation({
  args: {
    leadId: v.id("leads"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.leadId, {
      status: args.status,
      updatedAt: Date.now(),
      ...(args.status === "contacted" ? { lastContactedAt: Date.now() } : {}),
    });
  },
});

// Get lead by ID
export const getLeadById = query({
  args: { leadId: v.id("leads") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.leadId);
  },
});

// Get leads by status (for admin dashboard)
export const getLeadsByStatus = query({
  args: {
    status: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    return await ctx.db
      .query("leads")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .take(limit);
  },
});

// Get hot leads (priority = hot, status = new)
export const getHotLeads = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    return await ctx.db
      .query("leads")
      .withIndex("by_priority", (q) => q.eq("priority", "hot"))
      .filter((q) => q.eq(q.field("status"), "new"))
      .order("desc")
      .take(limit);
  },
});

// Get recent leads
export const getRecentLeads = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    return await ctx.db
      .query("leads")
      .withIndex("by_created")
      .order("desc")
      .take(limit);
  },
});

// Get leads by trade type
export const getLeadsByTrade = query({
  args: {
    tradeType: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    return await ctx.db
      .query("leads")
      .withIndex("by_trade", (q) => q.eq("tradeType", args.tradeType))
      .order("desc")
      .take(limit);
  },
});

// Check if email already exists
export const checkEmailExists = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existingLead = await ctx.db
      .query("leads")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    return !!existingLead;
  },
});

// Get lead stats for dashboard
export const getLeadStats = query({
  args: {},
  handler: async (ctx) => {
    const allLeads = await ctx.db.query("leads").collect();

    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

    const stats = {
      total: allLeads.length,
      today: allLeads.filter((l) => Number(l.createdAt || 0) > oneDayAgo).length,
      thisWeek: allLeads.filter((l) => Number(l.createdAt || 0) > oneWeekAgo).length,
      thisMonth: allLeads.filter((l) => Number(l.createdAt || 0) > oneMonthAgo).length,
      byStatus: {
        new: allLeads.filter((l) => l.status === "new").length,
        contacted: allLeads.filter((l) => l.status === "contacted").length,
        qualified: allLeads.filter((l) => l.status === "qualified").length,
        converted: allLeads.filter((l) => l.status === "converted").length,
      },
      byPriority: {
        hot: allLeads.filter((l) => l.priority === "hot").length,
        warm: allLeads.filter((l) => l.priority === "warm").length,
        cold: allLeads.filter((l) => l.priority === "cold").length,
      },
      avgScore: allLeads.length > 0
        ? Math.round(allLeads.reduce((sum, l) => sum + Number(l.score || 0), 0) / allLeads.length)
        : 0,
    };

    return stats;
  },
});
