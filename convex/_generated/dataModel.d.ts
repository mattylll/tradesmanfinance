/* eslint-disable */
/**
 * Generated data model stub - will be replaced when running `npx convex dev`
 */

import type { GenericDataModel, GenericTableInfo } from "convex/server";
import type { GenericId } from "convex/values";

/**
 * The names of all tables in your Convex deployment.
 */
export type TableNames = "leads" | "quoteCalculations" | "contactSubmissions" | "analyticsEvents";

/**
 * The type of a document in each table.
 */
export type Doc<TableName extends TableNames> =
  TableName extends "leads" ? {
    _id: GenericId<"leads">;
    _creationTime: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    businessName?: string;
    tradeType: string;
    location: {
      county: string;
      town: string;
      postcode?: string;
    };
    financeDetails: {
      amount: number;
      purpose: string;
      urgency: string;
      term?: number;
      preferredRate?: number;
    };
    businessInfo?: {
      yearsTrading?: string;
      annualRevenue?: string;
      employees?: string;
      certifications?: string[];
      creditScore?: string;
    };
    score: number;
    status: string;
    priority: string;
    source: string;
    referrer?: string;
    utmParams?: {
      source?: string;
      medium?: string;
      campaign?: string;
    };
    createdAt: number;
    updatedAt: number;
    lastContactedAt?: number;
  } :
  TableName extends "quoteCalculations" ? {
    _id: GenericId<"quoteCalculations">;
    _creationTime: number;
    loanAmount: number;
    termMonths: number;
    interestRate: number;
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
    tradeType?: string;
    location?: {
      county: string;
      town: string;
    };
    leadId?: GenericId<"leads">;
    sessionId?: string;
    createdAt: number;
  } :
  TableName extends "contactSubmissions" ? {
    _id: GenericId<"contactSubmissions">;
    _creationTime: number;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    leadId?: GenericId<"leads">;
    status: string;
    createdAt: number;
    repliedAt?: number;
  } :
  TableName extends "analyticsEvents" ? {
    _id: GenericId<"analyticsEvents">;
    _creationTime: number;
    eventType: string;
    eventData?: unknown;
    pagePath: string;
    pageTitle?: string;
    tradeType?: string;
    county?: string;
    town?: string;
    sessionId: string;
    userAgent?: string;
    deviceType?: string;
    createdAt: number;
  } :
  never;

/**
 * An identifier for a document in each table.
 */
export type Id<TableName extends TableNames> = GenericId<TableName>;

/**
 * The data model types.
 */
export type DataModel = {
  leads: GenericTableInfo;
  quoteCalculations: GenericTableInfo;
  contactSubmissions: GenericTableInfo;
  analyticsEvents: GenericTableInfo;
};
