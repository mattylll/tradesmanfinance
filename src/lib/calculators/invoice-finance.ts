/**
 * Invoice Finance Calculator
 *
 * Invoice finance uses fee-based pricing, not APR.
 * - Advance Rate: Percentage of invoice value advanced immediately (typically 70-95%)
 * - Service Fee: Flat percentage charged on invoice value (0.5-3%)
 * - Discount Fee: Interest charged on advanced amount for payment period (1-5% per month)
 * - Reserve: Amount held back until customer pays (released on payment)
 *
 * Supports two modes:
 * - Single Invoice: Calculate for one invoice
 * - Facility: Calculate for ongoing monthly turnover (multiple invoices)
 */

export type CalculatorMode = 'single' | 'facility';

export interface InvoiceFinanceInputs {
  mode: CalculatorMode;
  // Single invoice inputs
  invoiceValue: number;
  // Facility inputs
  monthlyTurnover: number;        // Total monthly invoice turnover
  invoicesPerMonth: number;       // Average number of invoices per month
  // Common inputs
  advanceRate: number;            // As percentage (e.g., 85 for 85%)
  serviceFeeRate: number;         // As percentage (e.g., 1.5 for 1.5%)
  discountFeeRate: number;        // As percentage per month (e.g., 2.5 for 2.5%)
  paymentDays: number;            // Average days until customer pays (14, 30, 60, 90)
}

export interface InvoiceFinanceResult {
  mode: CalculatorMode;

  // Per-invoice amounts (for single mode, or average for facility)
  invoiceValue: number;           // Single invoice value or average invoice
  advanceAmount: number;          // Amount received immediately per invoice
  reserveAmount: number;          // Held until customer pays per invoice

  // Per-invoice fees
  serviceFee: number;             // One-time service fee per invoice
  discountFee: number;            // Interest charged for payment period per invoice
  totalFees: number;              // Combined fees per invoice
  netReceived: number;            // Advance minus fees per invoice

  // Facility-level totals (only meaningful in facility mode)
  facility: {
    monthlyTurnover: number;
    invoicesPerMonth: number;
    monthlyAdvance: number;       // Total monthly advance
    monthlyFees: number;          // Total monthly fees
    monthlyNetReceived: number;   // Total monthly net received
    annualFees: number;           // Projected annual fees
    facilityLimit: number;        // Suggested facility size
  };

  // Analysis
  effectiveAnnualCost: number;    // Annualized cost as percentage
  costPerInvoice: number;         // Percentage cost per invoice

  // For charts
  breakdown: {
    label: string;
    value: number;
    color: string;
    percentage: number;
  }[];
}

/**
 * Calculate invoice finance costs and returns
 */
export function calculateInvoiceFinance(
  inputs: InvoiceFinanceInputs
): InvoiceFinanceResult {
  const {
    mode,
    invoiceValue: singleInvoiceValue,
    monthlyTurnover,
    invoicesPerMonth,
    advanceRate,
    serviceFeeRate,
    discountFeeRate,
    paymentDays,
  } = inputs;

  // Determine invoice value based on mode
  const invoiceValue = mode === 'single'
    ? singleInvoiceValue
    : invoicesPerMonth > 0
      ? monthlyTurnover / invoicesPerMonth
      : 0;

  // Handle edge cases
  if (invoiceValue <= 0) {
    return createEmptyResult(mode);
  }

  // Calculate per-invoice advance and reserve
  const advanceAmount = invoiceValue * (advanceRate / 100);
  const reserveAmount = invoiceValue - advanceAmount;

  // Calculate per-invoice fees
  const serviceFee = invoiceValue * (serviceFeeRate / 100);

  // Discount fee is charged on the advanced amount for the payment period
  // Convert monthly rate to the actual period
  const discountFee = advanceAmount * (discountFeeRate / 100) * (paymentDays / 30);

  const totalFees = serviceFee + discountFee;

  // Net received per invoice (what you actually get after fees deducted from advance)
  const netReceived = advanceAmount - totalFees;

  // Calculate facility-level totals
  const monthlyInvoices = mode === 'facility' ? invoicesPerMonth : 1;
  const monthlyTurnoverValue = mode === 'facility' ? monthlyTurnover : invoiceValue;

  const facility = {
    monthlyTurnover: monthlyTurnoverValue,
    invoicesPerMonth: monthlyInvoices,
    monthlyAdvance: round(advanceAmount * monthlyInvoices),
    monthlyFees: round(totalFees * monthlyInvoices),
    monthlyNetReceived: round(netReceived * monthlyInvoices),
    annualFees: round(totalFees * monthlyInvoices * 12),
    // Facility limit based on outstanding invoices (turnover × payment days / 30)
    facilityLimit: round(monthlyTurnoverValue * (paymentDays / 30) * (advanceRate / 100)),
  };

  // Calculate effective annual cost
  // Formula: (Total Fees / Net Received) * (365 / Payment Days) * 100
  const effectiveAnnualCost =
    paymentDays > 0 && netReceived > 0
      ? (totalFees / netReceived) * (365 / paymentDays) * 100
      : 0;

  // Cost as percentage of invoice value
  const costPerInvoice = (totalFees / invoiceValue) * 100;

  // Create breakdown for pie chart (based on single invoice / average invoice)
  const breakdown = [
    {
      label: 'Net Advance',
      value: netReceived,
      color: '#22c55e', // Green
      percentage: (netReceived / invoiceValue) * 100,
    },
    {
      label: 'Service Fee',
      value: serviceFee,
      color: '#f97316', // Orange
      percentage: (serviceFee / invoiceValue) * 100,
    },
    {
      label: 'Discount Fee',
      value: discountFee,
      color: '#ef4444', // Red
      percentage: (discountFee / invoiceValue) * 100,
    },
    {
      label: 'Reserve (Held)',
      value: reserveAmount,
      color: '#6b7280', // Gray
      percentage: (reserveAmount / invoiceValue) * 100,
    },
  ];

  return {
    mode,
    invoiceValue: round(invoiceValue),
    advanceAmount: round(advanceAmount),
    reserveAmount: round(reserveAmount),
    serviceFee: round(serviceFee),
    discountFee: round(discountFee),
    totalFees: round(totalFees),
    netReceived: round(netReceived),
    facility,
    effectiveAnnualCost: round(effectiveAnnualCost, 1),
    costPerInvoice: round(costPerInvoice, 2),
    breakdown,
  };
}

/**
 * Create empty result for edge cases
 */
function createEmptyResult(mode: CalculatorMode): InvoiceFinanceResult {
  return {
    mode,
    invoiceValue: 0,
    advanceAmount: 0,
    reserveAmount: 0,
    serviceFee: 0,
    discountFee: 0,
    totalFees: 0,
    netReceived: 0,
    facility: {
      monthlyTurnover: 0,
      invoicesPerMonth: 0,
      monthlyAdvance: 0,
      monthlyFees: 0,
      monthlyNetReceived: 0,
      annualFees: 0,
      facilityLimit: 0,
    },
    effectiveAnnualCost: 0,
    costPerInvoice: 0,
    breakdown: [],
  };
}

/**
 * Round to specified decimal places
 */
function round(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Invoice Finance Calculator Configuration
 */
export const INVOICE_FINANCE_CONFIG = {
  // Single invoice mode
  invoiceValue: {
    min: 1000,
    max: 500000,
    step: 1000,
    default: 25000,
    label: 'Invoice Value',
  },
  // Facility mode
  monthlyTurnover: {
    min: 5000,
    max: 2000000,
    step: 5000,
    default: 100000,
    label: 'Monthly Invoice Turnover',
  },
  invoicesPerMonth: {
    min: 1,
    max: 100,
    step: 1,
    default: 10,
    label: 'Invoices Per Month',
  },
  // Common settings
  advanceRate: {
    min: 70,
    max: 95,
    step: 1,
    default: 85,
    label: 'Advance Rate',
    unit: '%',
  },
  serviceFeeRate: {
    min: 0.5,
    max: 3,
    step: 0.1,
    default: 1.5,
    label: 'Service Fee',
    unit: '%',
  },
  discountFeeRate: {
    min: 1,
    max: 5,
    step: 0.1,
    default: 2.5,
    label: 'Discount Fee',
    unit: '% per month',
  },
  paymentDays: {
    options: [
      { value: 14, label: '14 days' },
      { value: 30, label: '30 days' },
      { value: 60, label: '60 days' },
      { value: 90, label: '90 days' },
    ] as const,
    default: 30,
    label: 'Average Payment Time',
  },
} as const;

/**
 * Storage key for invoice calculator data persistence
 */
export const INVOICE_CALCULATOR_STORAGE_KEY = 'tradesman-calculator-invoice-finance';

/**
 * Save invoice calculator data to sessionStorage
 */
export function saveInvoiceCalculatorData(data: {
  inputs: InvoiceFinanceInputs;
  results: InvoiceFinanceResult;
}): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(INVOICE_CALCULATOR_STORAGE_KEY, JSON.stringify(data));
  }
}

/**
 * Load invoice calculator data from sessionStorage
 */
export function loadInvoiceCalculatorData(): {
  inputs: InvoiceFinanceInputs;
  results: InvoiceFinanceResult;
} | null {
  if (typeof window === 'undefined') return null;

  const stored = sessionStorage.getItem(INVOICE_CALCULATOR_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Invoice Finance FAQs for the calculator page
 */
export const INVOICE_FINANCE_FAQS = [
  {
    question: 'What is invoice finance and how does it work?',
    answer: 'Invoice finance lets you access cash tied up in unpaid invoices immediately. You sell your invoice to a finance provider who advances you 70-95% of the value upfront. When your customer pays, you receive the remainder minus fees.',
  },
  {
    question: 'What is the difference between single invoice finance and a facility?',
    answer: 'Single invoice finance (or selective invoice finance) lets you choose which invoices to fund on a case-by-case basis. A facility provides an ongoing arrangement where you can fund multiple invoices each month, often with better rates due to the committed volume.',
  },
  {
    question: 'What fees are involved in invoice finance?',
    answer: 'There are typically two fees: a service fee (0.5-3% of invoice value) which covers administration, and a discount fee (1-5% per month) which is interest on the advanced amount for the time until your customer pays.',
  },
  {
    question: 'How quickly can I receive funds from invoice finance?',
    answer: 'Once set up with a facility, funds from individual invoices are typically released within 24 hours of submission. Initial facility setup may take 2-5 business days for verification.',
  },
  {
    question: 'What is the difference between invoice factoring and invoice discounting?',
    answer: 'With factoring, the finance provider takes over credit control and collects payment from your customers. With discounting, you maintain customer relationships and collect payments yourself. Discounting is confidential - customers don\'t know you\'re using it.',
  },
  {
    question: 'Can tradesmen use invoice finance for commercial work?',
    answer: 'Yes, invoice finance works well for tradesmen doing commercial and contract work where payment terms are 30-90 days. It\'s particularly useful for managing cash flow when you have multiple large contracts.',
  },
];
