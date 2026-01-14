/**
 * Affordability Calculator
 *
 * Helps users understand how much they can borrow based on their
 * business financials, credit profile, and existing obligations.
 */

import { calculateLoan, type LoanCalculation } from '../calculator';

export type BusinessAge = 'under1' | '1to2' | '2to5' | 'over5';
export type CreditProfile = 'excellent' | 'good' | 'fair' | 'challenged';
export type AffordabilityScore = 'high' | 'medium' | 'low';

export interface AffordabilityInputs {
  monthlyRevenue: number;
  monthlyExpenses: number;
  existingDebtPayments: number;
  businessAge: BusinessAge;
  creditProfile: CreditProfile;
}

export interface ProductBorrowingPower {
  productName: string;
  maxAmount: number;
  typicalTerm: number;
  monthlyPayment: number;
  description: string;
}

export interface AffordabilityResult {
  // Input summary
  monthlyRevenue: number;
  monthlyExpenses: number;
  existingDebtPayments: number;

  // Calculated metrics
  freeCashflow: number;
  netProfit: number;
  profitMargin: number;
  maxComfortablePayment: number;
  debtServiceCoverageRatio: number;

  // Affordability assessment
  score: AffordabilityScore;
  scorePercentage: number;
  recommendation: string;

  // Borrowing power by product
  businessLoan: ProductBorrowingPower;
  equipmentFinance: ProductBorrowingPower;
  vehicleFinance: ProductBorrowingPower;
  invoiceFinance: ProductBorrowingPower;

  // Factors affecting borrowing
  positiveFactors: string[];
  negativeFactors: string[];

  // For charts
  cashflowBreakdown: { label: string; value: number; color: string }[];
  borrowingPowerChart: { product: string; amount: number }[];
}

/**
 * Get multiplier based on business age
 */
function getBusinessAgeMultiplier(age: BusinessAge): number {
  switch (age) {
    case 'under1': return 0.6;
    case '1to2': return 0.8;
    case '2to5': return 1.0;
    case 'over5': return 1.15;
    default: return 1.0;
  }
}

/**
 * Get multiplier based on credit profile
 */
function getCreditMultiplier(profile: CreditProfile): number {
  switch (profile) {
    case 'excellent': return 1.2;
    case 'good': return 1.0;
    case 'fair': return 0.75;
    case 'challenged': return 0.5;
    default: return 1.0;
  }
}

/**
 * Get base rate based on credit profile
 */
function getBaseRate(profile: CreditProfile): number {
  switch (profile) {
    case 'excellent': return 6.9;
    case 'good': return 9.9;
    case 'fair': return 14.9;
    case 'challenged': return 19.9;
    default: return 9.9;
  }
}

/**
 * Calculate maximum loan amount for a given monthly payment
 */
function calculateMaxLoan(monthlyPayment: number, termMonths: number, rate: number): number {
  const monthlyRate = rate / 100 / 12;
  if (monthlyRate === 0) return monthlyPayment * termMonths;

  const maxLoan = monthlyPayment * (1 - Math.pow(1 + monthlyRate, -termMonths)) / monthlyRate;
  return Math.round(maxLoan);
}

/**
 * Determine affordability score
 */
function calculateScore(
  freeCashflow: number,
  monthlyRevenue: number,
  existingDebtPayments: number,
  businessAge: BusinessAge,
  creditProfile: CreditProfile
): { score: AffordabilityScore; percentage: number } {
  let points = 50; // Base score

  // Free cashflow as % of revenue (up to 20 points)
  const cashflowRatio = freeCashflow / monthlyRevenue;
  points += Math.min(20, cashflowRatio * 50);

  // Existing debt burden (up to -20 or +10 points)
  const debtRatio = existingDebtPayments / monthlyRevenue;
  if (debtRatio < 0.1) points += 10;
  else if (debtRatio < 0.2) points += 5;
  else if (debtRatio > 0.4) points -= 20;
  else if (debtRatio > 0.3) points -= 10;

  // Business age (up to 15 points)
  switch (businessAge) {
    case 'over5': points += 15; break;
    case '2to5': points += 10; break;
    case '1to2': points += 5; break;
    case 'under1': points += 0; break;
  }

  // Credit profile (up to 15 points)
  switch (creditProfile) {
    case 'excellent': points += 15; break;
    case 'good': points += 10; break;
    case 'fair': points += 5; break;
    case 'challenged': points += 0; break;
  }

  const percentage = Math.max(0, Math.min(100, Math.round(points)));

  let score: AffordabilityScore;
  if (percentage >= 70) score = 'high';
  else if (percentage >= 40) score = 'medium';
  else score = 'low';

  return { score, percentage };
}

/**
 * Get recommendation based on score and factors
 */
function getRecommendation(
  score: AffordabilityScore,
  freeCashflow: number,
  businessAge: BusinessAge,
  creditProfile: CreditProfile
): string {
  if (score === 'high') {
    if (creditProfile === 'excellent' && businessAge === 'over5') {
      return "Your business is in an excellent position to borrow. You may qualify for the best rates and higher limits.";
    }
    return "Your business shows strong affordability. You're likely to be approved for most finance products.";
  }

  if (score === 'medium') {
    if (freeCashflow < 500) {
      return "Your affordability is moderate. Consider reducing expenses to improve cashflow before borrowing.";
    }
    if (businessAge === 'under1') {
      return "Building more trading history will improve your borrowing power. Consider starting with smaller amounts.";
    }
    return "You have reasonable borrowing capacity. We can likely find suitable options for your business.";
  }

  // Low score
  if (creditProfile === 'challenged') {
    return "We work with all credit profiles. Speak to us about specialist lenders who may be able to help.";
  }
  if (freeCashflow < 200) {
    return "Your current cashflow limits borrowing options. Focus on improving profitability before taking on new debt.";
  }
  return "Your borrowing capacity is limited. Consider invoice finance to improve cashflow without fixed monthly payments.";
}

/**
 * Identify positive and negative factors
 */
function analyzeFactors(
  inputs: AffordabilityInputs,
  freeCashflow: number
): { positive: string[]; negative: string[] } {
  const positive: string[] = [];
  const negative: string[] = [];

  // Cashflow analysis
  const cashflowRatio = freeCashflow / inputs.monthlyRevenue;
  if (cashflowRatio > 0.3) {
    positive.push("Strong profit margin over 30%");
  } else if (cashflowRatio < 0.1) {
    negative.push("Low profit margin limits borrowing capacity");
  }

  // Revenue
  if (inputs.monthlyRevenue > 20000) {
    positive.push("Healthy monthly revenue");
  } else if (inputs.monthlyRevenue < 5000) {
    negative.push("Lower revenue may limit options");
  }

  // Existing debt
  const debtRatio = inputs.existingDebtPayments / inputs.monthlyRevenue;
  if (inputs.existingDebtPayments === 0) {
    positive.push("No existing debt payments");
  } else if (debtRatio < 0.1) {
    positive.push("Low existing debt burden");
  } else if (debtRatio > 0.3) {
    negative.push("High existing debt may reduce approval chances");
  }

  // Business age
  switch (inputs.businessAge) {
    case 'over5':
      positive.push("5+ years trading history");
      break;
    case '2to5':
      positive.push("Established business (2-5 years)");
      break;
    case '1to2':
      // Neutral
      break;
    case 'under1':
      negative.push("Less than 1 year trading history");
      break;
  }

  // Credit profile
  switch (inputs.creditProfile) {
    case 'excellent':
      positive.push("Excellent credit profile");
      break;
    case 'good':
      positive.push("Good credit history");
      break;
    case 'fair':
      negative.push("Credit profile may affect rates");
      break;
    case 'challenged':
      negative.push("Credit challenges may limit options");
      break;
  }

  return { positive, negative };
}

/**
 * Calculate affordability and borrowing power
 */
export function calculateAffordability(
  inputs: AffordabilityInputs
): AffordabilityResult {
  const { monthlyRevenue, monthlyExpenses, existingDebtPayments, businessAge, creditProfile } = inputs;

  // Calculate key metrics
  const netProfit = monthlyRevenue - monthlyExpenses;
  const freeCashflow = netProfit - existingDebtPayments;
  const profitMargin = (netProfit / monthlyRevenue) * 100;

  // Max comfortable payment (40% of free cashflow, conservative)
  const maxComfortablePayment = Math.max(0, Math.round(freeCashflow * 0.4));

  // DSCR (Debt Service Coverage Ratio)
  const totalDebtService = existingDebtPayments + maxComfortablePayment;
  const debtServiceCoverageRatio = totalDebtService > 0
    ? Math.round((netProfit / totalDebtService) * 100) / 100
    : 0;

  // Get multipliers
  const ageMultiplier = getBusinessAgeMultiplier(businessAge);
  const creditMultiplier = getCreditMultiplier(creditProfile);
  const combinedMultiplier = ageMultiplier * creditMultiplier;

  // Get base rate
  const baseRate = getBaseRate(creditProfile);

  // Calculate borrowing power for each product
  const adjustedPayment = maxComfortablePayment * combinedMultiplier;

  // Business Loan (36 months typical)
  const businessLoanMax = calculateMaxLoan(adjustedPayment, 36, baseRate);
  const businessLoanCalc = calculateLoan(Math.min(businessLoanMax, 100000), 36, baseRate);

  // Equipment Finance (48 months, slightly lower rate)
  const equipmentMax = calculateMaxLoan(adjustedPayment * 0.8, 48, baseRate - 1);
  const equipmentCalc = calculateLoan(Math.min(equipmentMax, 75000), 48, baseRate - 1);

  // Vehicle Finance (48 months)
  const vehicleMax = calculateMaxLoan(adjustedPayment * 0.9, 48, baseRate);
  const vehicleCalc = calculateLoan(Math.min(vehicleMax, 60000), 48, baseRate);

  // Invoice Finance (facility based on turnover)
  const invoiceFacility = Math.round(monthlyRevenue * 0.8 * combinedMultiplier);

  // Calculate score
  const { score, percentage } = calculateScore(
    freeCashflow,
    monthlyRevenue,
    existingDebtPayments,
    businessAge,
    creditProfile
  );

  // Get recommendation
  const recommendation = getRecommendation(score, freeCashflow, businessAge, creditProfile);

  // Analyze factors
  const { positive: positiveFactors, negative: negativeFactors } = analyzeFactors(inputs, freeCashflow);

  // Prepare chart data
  const cashflowBreakdown = [
    { label: 'Operating Expenses', value: monthlyExpenses, color: '#ef4444' },
    { label: 'Existing Debt', value: existingDebtPayments, color: '#f97316' },
    { label: 'Available for Borrowing', value: maxComfortablePayment, color: '#22c55e' },
    { label: 'Remaining Profit', value: Math.max(0, freeCashflow - maxComfortablePayment), color: '#0ea5a5' },
  ];

  const borrowingPowerChart = [
    { product: 'Business Loan', amount: businessLoanMax },
    { product: 'Equipment', amount: equipmentMax },
    { product: 'Vehicle', amount: vehicleMax },
    { product: 'Invoice Facility', amount: invoiceFacility },
  ];

  return {
    monthlyRevenue,
    monthlyExpenses,
    existingDebtPayments,
    freeCashflow,
    netProfit,
    profitMargin: Math.round(profitMargin * 10) / 10,
    maxComfortablePayment,
    debtServiceCoverageRatio,
    score,
    scorePercentage: percentage,
    recommendation,
    businessLoan: {
      productName: 'Business Loan',
      maxAmount: businessLoanMax,
      typicalTerm: 36,
      monthlyPayment: businessLoanCalc.monthlyPayment,
      description: 'Flexible funding for any business purpose',
    },
    equipmentFinance: {
      productName: 'Equipment Finance',
      maxAmount: equipmentMax,
      typicalTerm: 48,
      monthlyPayment: equipmentCalc.monthlyPayment,
      description: 'Finance tools, machinery and equipment',
    },
    vehicleFinance: {
      productName: 'Vehicle Finance',
      maxAmount: vehicleMax,
      typicalTerm: 48,
      monthlyPayment: vehicleCalc.monthlyPayment,
      description: 'Vans, pickups and commercial vehicles',
    },
    invoiceFinance: {
      productName: 'Invoice Finance',
      maxAmount: invoiceFacility,
      typicalTerm: 0, // Revolving
      monthlyPayment: 0, // Fee-based
      description: 'Release cash from unpaid invoices',
    },
    positiveFactors,
    negativeFactors,
    cashflowBreakdown,
    borrowingPowerChart,
  };
}

/**
 * Affordability Calculator Configuration
 */
export const AFFORDABILITY_CONFIG = {
  monthlyRevenue: {
    min: 1000,
    max: 100000,
    step: 500,
    default: 10000,
    label: 'Monthly Revenue',
  },
  monthlyExpenses: {
    min: 500,
    max: 80000,
    step: 500,
    default: 6000,
    label: 'Monthly Expenses',
  },
  existingDebtPayments: {
    min: 0,
    max: 10000,
    step: 100,
    default: 500,
    label: 'Existing Debt Payments',
  },
  businessAge: {
    options: [
      { value: 'under1', label: 'Less than 1 year' },
      { value: '1to2', label: '1-2 years' },
      { value: '2to5', label: '2-5 years' },
      { value: 'over5', label: '5+ years' },
    ] as const,
    default: '2to5' as BusinessAge,
    label: 'Business Age',
  },
  creditProfile: {
    options: [
      { value: 'excellent', label: 'Excellent (680+)' },
      { value: 'good', label: 'Good (600-679)' },
      { value: 'fair', label: 'Fair (500-599)' },
      { value: 'challenged', label: 'Challenged (<500)' },
    ] as const,
    default: 'good' as CreditProfile,
    label: 'Credit Profile',
  },
} as const;

/**
 * Storage key
 */
export const AFFORDABILITY_STORAGE_KEY = 'tradesman-calculator-affordability';

/**
 * Save affordability calculator data
 */
export function saveAffordabilityData(data: {
  inputs: AffordabilityInputs;
  results: AffordabilityResult;
}): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(AFFORDABILITY_STORAGE_KEY, JSON.stringify(data));
  }
}

/**
 * Load affordability calculator data
 */
export function loadAffordabilityData(): {
  inputs: AffordabilityInputs;
  results: AffordabilityResult;
} | null {
  if (typeof window === 'undefined') return null;

  const stored = sessionStorage.getItem(AFFORDABILITY_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Affordability FAQs
 */
export const AFFORDABILITY_FAQS = [
  {
    question: 'How is affordability calculated?',
    answer: 'We look at your free cashflow (revenue minus expenses and existing debt), then apply conservative multipliers based on your business age and credit profile. We recommend borrowing no more than 40% of your free cashflow to maintain healthy finances.',
  },
  {
    question: 'What affects my borrowing power?',
    answer: 'Key factors include: your monthly profit margin, existing debt obligations, how long you\'ve been trading, and your credit history. Businesses with higher profits, lower existing debt, longer trading history, and better credit can typically borrow more.',
  },
  {
    question: 'Can I borrow more than the calculator shows?',
    answer: 'The calculator provides conservative estimates. Actual approval amounts depend on a full assessment of your business accounts, personal circumstances, and the specific lender. Some businesses may qualify for more, especially with asset security or strong growth.',
  },
  {
    question: 'Does this calculation affect my credit score?',
    answer: 'No. This is an indicative calculator only and does not perform any credit checks. Your credit score is only checked if you submit a formal application.',
  },
  {
    question: 'What if I have poor credit?',
    answer: 'We work with all credit profiles. While rates may be higher and amounts lower, we have specialist lenders who consider the whole picture - including your business performance and future potential.',
  },
  {
    question: 'Why is invoice finance shown separately?',
    answer: 'Invoice finance works differently - it\'s based on the value of your unpaid invoices rather than fixed monthly payments. This can be ideal for businesses with cashflow gaps, as you only pay fees when you use the facility.',
  },
];
