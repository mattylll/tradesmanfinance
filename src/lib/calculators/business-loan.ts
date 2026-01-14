/**
 * Business Loan Repayment Calculator
 *
 * Enhanced loan calculator with:
 * - Business profile-based rate adjustments
 * - Eligibility scoring
 * - Amortization schedule
 * - Comparison metrics
 */

import { calculateLoan, generateAmortizationSchedule, type LoanCalculation, type AmortizationRow } from '../calculator';

export type BusinessAge = 'under-1' | '1-2' | '2-5' | 'over-5';
export type AnnualTurnover = 'under-50k' | '50k-100k' | '100k-500k' | 'over-500k';
export type EligibilityStatus = 'high' | 'medium' | 'low';

export interface BusinessLoanInputs {
  loanAmount: number;
  termMonths: number;
  businessAge: BusinessAge;
  annualTurnover: AnnualTurnover;
}

export interface EligibilityResult {
  status: EligibilityStatus;
  score: number;        // 0-100
  message: string;
  factors: {
    positive: string[];
    negative: string[];
  };
}

export interface BusinessLoanResult extends LoanCalculation {
  // Core loan details
  loanAmount: number;
  termMonths: number;

  // Rate information
  baseRate: number;
  adjustedRate: number;
  rateAdjustment: number;

  // Eligibility
  eligibility: EligibilityResult;

  // Amortization
  schedule: AmortizationRow[];

  // Yearly breakdown for charts
  yearlyBreakdown: {
    year: number;
    principal: number;
    interest: number;
    endBalance: number;
  }[];

  // Comparison cards
  comparisons: {
    title: string;
    description: string;
    icon: string;
  }[];

  // For pie chart
  breakdown: {
    label: string;
    value: number;
    color: string;
  }[];
}

/**
 * Get rate adjustment based on business profile
 */
function getRateAdjustment(businessAge: BusinessAge, annualTurnover: AnnualTurnover): {
  adjustment: number;
  factors: { positive: string[]; negative: string[] };
} {
  let adjustment = 0;
  const factors = { positive: [] as string[], negative: [] as string[] };

  // Business age adjustments
  switch (businessAge) {
    case 'under-1':
      adjustment += 4.0;
      factors.negative.push('New business (under 1 year)');
      break;
    case '1-2':
      adjustment += 2.0;
      factors.negative.push('Early-stage business (1-2 years)');
      break;
    case '2-5':
      adjustment += 0.5;
      factors.positive.push('Established business (2-5 years)');
      break;
    case 'over-5':
      adjustment -= 0.5;
      factors.positive.push('Mature business (5+ years)');
      break;
  }

  // Turnover adjustments
  switch (annualTurnover) {
    case 'under-50k':
      adjustment += 2.0;
      factors.negative.push('Lower turnover band');
      break;
    case '50k-100k':
      adjustment += 0.5;
      break;
    case '100k-500k':
      adjustment -= 0.5;
      factors.positive.push('Strong turnover (£100k-500k)');
      break;
    case 'over-500k':
      adjustment -= 1.0;
      factors.positive.push('High turnover (£500k+)');
      break;
  }

  return { adjustment, factors };
}

/**
 * Calculate eligibility score and status
 */
function calculateEligibility(
  businessAge: BusinessAge,
  annualTurnover: AnnualTurnover,
  loanAmount: number
): EligibilityResult {
  let score = 50; // Base score
  const factors = { positive: [] as string[], negative: [] as string[] };

  // Business age scoring
  switch (businessAge) {
    case 'under-1':
      score -= 15;
      factors.negative.push('Trading less than 1 year');
      break;
    case '1-2':
      score += 5;
      factors.positive.push('1-2 years trading history');
      break;
    case '2-5':
      score += 15;
      factors.positive.push('Established trading history');
      break;
    case 'over-5':
      score += 25;
      factors.positive.push('Long trading history');
      break;
  }

  // Turnover scoring
  switch (annualTurnover) {
    case 'under-50k':
      score -= 10;
      factors.negative.push('Lower annual turnover');
      break;
    case '50k-100k':
      score += 10;
      factors.positive.push('Solid turnover');
      break;
    case '100k-500k':
      score += 20;
      factors.positive.push('Strong turnover');
      break;
    case 'over-500k':
      score += 30;
      factors.positive.push('Excellent turnover');
      break;
  }

  // Loan amount relative to turnover
  const turnoverMap: Record<AnnualTurnover, number> = {
    'under-50k': 40000,
    '50k-100k': 75000,
    '100k-500k': 250000,
    'over-500k': 750000,
  };

  const estimatedTurnover = turnoverMap[annualTurnover];
  const loanToTurnoverRatio = loanAmount / estimatedTurnover;

  if (loanToTurnoverRatio < 0.25) {
    score += 10;
    factors.positive.push('Conservative loan amount');
  } else if (loanToTurnoverRatio > 0.75) {
    score -= 10;
    factors.negative.push('High loan-to-turnover ratio');
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  // Determine status
  let status: EligibilityStatus;
  let message: string;

  if (score >= 70) {
    status = 'high';
    message = 'Strong eligibility - You have a good chance of approval';
  } else if (score >= 45) {
    status = 'medium';
    message = 'Moderate eligibility - Additional documentation may be required';
  } else {
    status = 'low';
    message = 'Lower eligibility - Specialist lenders may still be available';
  }

  return { status, score, message, factors };
}

/**
 * Get comparison cards based on loan amount
 */
function getComparisons(loanAmount: number): BusinessLoanResult['comparisons'] {
  const comparisons = [];

  if (loanAmount >= 10000 && loanAmount <= 50000) {
    comparisons.push({
      title: 'New Work Van',
      description: 'Ford Transit Custom or Mercedes Sprinter',
      icon: 'truck',
    });
  }

  if (loanAmount >= 5000 && loanAmount <= 25000) {
    comparisons.push({
      title: 'Complete Tool Kit',
      description: 'Professional-grade power tools and equipment',
      icon: 'wrench',
    });
  }

  if (loanAmount >= 15000) {
    comparisons.push({
      title: 'Staff Expansion',
      description: 'Hire and train a new team member',
      icon: 'users',
    });
  }

  if (loanAmount >= 25000) {
    comparisons.push({
      title: 'Workshop Upgrade',
      description: 'Expand or improve your premises',
      icon: 'building',
    });
  }

  if (loanAmount >= 50000) {
    comparisons.push({
      title: 'Major Equipment',
      description: 'Excavators, scaffolding, or plant machinery',
      icon: 'cog',
    });
  }

  if (loanAmount <= 15000) {
    comparisons.push({
      title: 'Marketing Push',
      description: 'Website, signage, and advertising campaign',
      icon: 'megaphone',
    });
  }

  return comparisons.slice(0, 3);
}

/**
 * Calculate business loan with enhanced features
 */
export function calculateBusinessLoan(inputs: BusinessLoanInputs): BusinessLoanResult {
  const { loanAmount, termMonths, businessAge, annualTurnover } = inputs;

  // Get base rate and adjustments
  const baseRate = 9.9;
  const { adjustment, factors: rateFactors } = getRateAdjustment(businessAge, annualTurnover);
  const adjustedRate = Math.max(4.9, Math.min(24.9, baseRate + adjustment));

  // Calculate loan
  const loanCalc = calculateLoan(loanAmount, termMonths, adjustedRate);

  // Generate amortization schedule
  const schedule = generateAmortizationSchedule(loanAmount, termMonths, adjustedRate);

  // Calculate yearly breakdown
  const yearlyBreakdown: BusinessLoanResult['yearlyBreakdown'] = [];
  const years = Math.ceil(termMonths / 12);

  for (let year = 1; year <= years; year++) {
    const startMonth = (year - 1) * 12 + 1;
    const endMonth = Math.min(year * 12, termMonths);

    let yearPrincipal = 0;
    let yearInterest = 0;
    let endBalance = loanAmount;

    for (let m = startMonth; m <= endMonth; m++) {
      const row = schedule[m - 1];
      if (row) {
        yearPrincipal += row.principal;
        yearInterest += row.interest;
        endBalance = row.balance;
      }
    }

    yearlyBreakdown.push({
      year,
      principal: Math.round(yearPrincipal),
      interest: Math.round(yearInterest),
      endBalance: Math.round(endBalance),
    });
  }

  // Calculate eligibility
  const eligibility = calculateEligibility(businessAge, annualTurnover, loanAmount);

  // Merge rate factors into eligibility factors
  eligibility.factors.positive.push(...rateFactors.positive);
  eligibility.factors.negative.push(...rateFactors.negative);

  // Get comparisons
  const comparisons = getComparisons(loanAmount);

  // Create breakdown for pie chart
  const breakdown = [
    {
      label: 'Principal',
      value: loanAmount,
      color: '#22c55e', // Green
    },
    {
      label: 'Interest',
      value: loanCalc.totalInterest,
      color: '#f97316', // Orange
    },
  ];

  return {
    ...loanCalc,
    loanAmount,
    termMonths,
    baseRate,
    adjustedRate,
    rateAdjustment: adjustment,
    eligibility,
    schedule,
    yearlyBreakdown,
    comparisons,
    breakdown,
  };
}

/**
 * Business Loan Calculator Configuration
 */
export const BUSINESS_LOAN_CONFIG = {
  loanAmount: {
    min: 5000,
    max: 500000,
    step: 1000,
    default: 50000,
    label: 'Loan Amount',
  },
  termMonths: {
    min: 12,
    max: 60,
    step: 6,
    default: 36,
    label: 'Loan Term',
    options: [
      { value: 12, label: '12 months' },
      { value: 24, label: '24 months' },
      { value: 36, label: '36 months' },
      { value: 48, label: '48 months' },
      { value: 60, label: '60 months' },
    ],
  },
  businessAge: {
    options: [
      { value: 'under-1', label: 'Under 1 year' },
      { value: '1-2', label: '1-2 years' },
      { value: '2-5', label: '2-5 years' },
      { value: 'over-5', label: '5+ years' },
    ] as const,
    default: '2-5' as BusinessAge,
    label: 'Business Age',
  },
  annualTurnover: {
    options: [
      { value: 'under-50k', label: 'Under £50,000' },
      { value: '50k-100k', label: '£50,000 - £100,000' },
      { value: '100k-500k', label: '£100,000 - £500,000' },
      { value: 'over-500k', label: 'Over £500,000' },
    ] as const,
    default: '100k-500k' as AnnualTurnover,
    label: 'Annual Turnover',
  },
} as const;

/**
 * Storage key for business loan calculator
 */
export const BUSINESS_LOAN_STORAGE_KEY = 'tradesman-calculator-business-loan';

/**
 * Save business loan calculator data
 */
export function saveBusinessLoanData(data: {
  inputs: BusinessLoanInputs;
  results: BusinessLoanResult;
}): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(BUSINESS_LOAN_STORAGE_KEY, JSON.stringify(data));
  }
}

/**
 * Load business loan calculator data
 */
export function loadBusinessLoanData(): {
  inputs: BusinessLoanInputs;
  results: BusinessLoanResult;
} | null {
  if (typeof window === 'undefined') return null;

  const stored = sessionStorage.getItem(BUSINESS_LOAN_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Business Loan FAQs
 */
export const BUSINESS_LOAN_FAQS = [
  {
    question: 'What is a business loan and how does it work?',
    answer: 'A business loan provides a lump sum of capital that you repay over a fixed term with interest. Monthly payments are typically fixed, making budgeting easier. Funds can be used for any business purpose including equipment, vehicles, expansion, or working capital.',
  },
  {
    question: 'How much can tradesmen borrow with a business loan?',
    answer: 'Business loan amounts typically range from £5,000 to £500,000 depending on your turnover, business age, and creditworthiness. Most tradesmen borrow between £15,000 and £75,000 for equipment, vehicles, or expansion.',
  },
  {
    question: 'What affects the interest rate I\'m offered?',
    answer: 'Your interest rate depends on several factors: business trading history, annual turnover, credit history, loan amount, and loan term. Established businesses with strong turnover typically receive the best rates.',
  },
  {
    question: 'How long does it take to get approved?',
    answer: 'Most business loan decisions are made within 24-48 hours. Once approved, funds are typically in your account within 3-5 business days, though some lenders offer same-day funding.',
  },
  {
    question: 'Can I repay my business loan early?',
    answer: 'Most business loans allow early repayment, though some may charge an early settlement fee (typically 1-2 months interest). Check the specific terms before signing. Paying early can save significant interest.',
  },
  {
    question: 'What documents do I need to apply?',
    answer: 'Typically you\'ll need: 3-6 months of business bank statements, proof of identity, proof of business address, and details of any existing debts. Limited companies may also need recent accounts.',
  },
];
