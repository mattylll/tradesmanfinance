/**
 * Loan Calculator Utilities
 * Implements amortization formula for tradesman finance calculations
 */

export interface LoanCalculation {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  effectiveRate: number;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * Calculate loan repayment using standard amortization formula
 * @param principal - Loan amount in pounds
 * @param termMonths - Loan term in months
 * @param annualRate - Annual interest rate as percentage (e.g., 9.9 for 9.9%)
 */
export function calculateLoan(
  principal: number,
  termMonths: number,
  annualRate: number
): LoanCalculation {
  // Handle edge cases
  if (principal <= 0 || termMonths <= 0) {
    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalAmount: 0,
      effectiveRate: 0,
    };
  }

  // Handle 0% interest rate
  if (annualRate === 0) {
    const monthlyPayment = principal / termMonths;
    return {
      monthlyPayment,
      totalInterest: 0,
      totalAmount: principal,
      effectiveRate: 0,
    };
  }

  // Monthly interest rate
  const monthlyRate = annualRate / 100 / 12;

  // Amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const compoundFactor = Math.pow(1 + monthlyRate, termMonths);
  const monthlyPayment =
    principal * ((monthlyRate * compoundFactor) / (compoundFactor - 1));

  const totalAmount = monthlyPayment * termMonths;
  const totalInterest = totalAmount - principal;

  // Calculate effective annual rate (APR)
  const effectiveRate = (Math.pow(1 + monthlyRate, 12) - 1) * 100;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
  };
}

/**
 * Generate full amortization schedule
 */
export function generateAmortizationSchedule(
  principal: number,
  termMonths: number,
  annualRate: number
): AmortizationRow[] {
  const { monthlyPayment } = calculateLoan(principal, termMonths, annualRate);
  const monthlyRate = annualRate / 100 / 12;

  const schedule: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= termMonths; month++) {
    const interest = balance * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    balance = Math.max(0, balance - principalPayment);

    schedule.push({
      month,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });
  }

  return schedule;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format currency with pence
 */
export function formatCurrencyPrecise(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[£,]/g, "");
  return parseFloat(cleaned) || 0;
}

/**
 * Calculator configuration
 */
export const CALCULATOR_CONFIG = {
  amount: {
    min: 1000,
    max: 500000,
    step: 1000,
    default: 25000,
  },
  term: {
    min: 6,
    max: 60,
    step: 6,
    default: 36,
  },
  rate: {
    min: 4.9,
    max: 29.9,
    step: 0.1,
    default: 9.9,
  },
} as const;

/**
 * Storage key for calculator data persistence
 */
export const CALCULATOR_STORAGE_KEY = "tradesman-finance-calculator";

/**
 * Save calculator data to sessionStorage
 */
export function saveCalculatorData(data: {
  amount: number;
  term: number;
  rate: number;
  results: LoanCalculation;
}): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(CALCULATOR_STORAGE_KEY, JSON.stringify(data));
  }
}

/**
 * Load calculator data from sessionStorage
 */
export function loadCalculatorData(): {
  amount: number;
  term: number;
  rate: number;
  results: LoanCalculation;
} | null {
  if (typeof window === "undefined") return null;

  const stored = sessionStorage.getItem(CALCULATOR_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}
