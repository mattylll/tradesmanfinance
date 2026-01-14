/**
 * Equipment Finance Calculator
 *
 * Trade-specific equipment finance with:
 * - Dynamic equipment categories based on trade
 * - HP vs Lease comparison
 * - Capital allowance tax benefits
 * - Deposit options
 */

import { calculateLoan, type LoanCalculation } from '../calculator';

export type FinanceType = 'hp' | 'lease';

export interface EquipmentFinanceInputs {
  tradeSlug: string;
  equipmentCategory: string;
  equipmentValue: number;
  depositPercent: number;
  termMonths: number;
}

export interface TaxBenefit {
  capitalAllowance: number;    // AIA claim amount
  taxSaving: number;           // Actual tax saved (25% corp tax)
  effectiveNetCost: number;    // Cost after tax benefit
  savingsPercentage: number;   // Tax saving as % of equipment cost
}

export interface FinanceComparison {
  hp: {
    monthlyPayment: number;
    totalPayable: number;
    totalInterest: number;
    ownership: boolean;
    vatRecovery: string;
    description: string;
  };
  lease: {
    monthlyPayment: number;
    totalPayable: number;
    totalCost: number;
    ownership: boolean;
    vatRecovery: string;
    description: string;
  };
  recommendation: 'hp' | 'lease';
  recommendationReason: string;
}

export interface EquipmentFinanceResult {
  // Core values
  equipmentValue: number;
  depositAmount: number;
  financeAmount: number;
  termMonths: number;

  // Primary calculation (HP)
  monthlyPayment: number;
  totalPayable: number;
  totalInterest: number;
  effectiveRate: number;

  // Tax benefits
  taxBenefit: TaxBenefit;

  // HP vs Lease comparison
  comparison: FinanceComparison;

  // Total cost of ownership
  totalCostOfOwnership: number;
  netCostAfterTax: number;

  // For charts
  breakdown: {
    label: string;
    value: number;
    color: string;
  }[];

  // Monthly payment comparison data
  comparisonData: {
    month: number;
    hp: number;
    lease: number;
  }[];
}

/**
 * Get interest rate based on equipment value and term
 */
function getEquipmentRate(equipmentValue: number, termMonths: number): number {
  // Base rate decreases for larger equipment values
  let rate = 11.9; // Base rate

  if (equipmentValue >= 50000) {
    rate = 7.9;
  } else if (equipmentValue >= 25000) {
    rate = 8.9;
  } else if (equipmentValue >= 10000) {
    rate = 9.9;
  }

  // Shorter terms get slightly better rates
  if (termMonths <= 24) {
    rate -= 0.5;
  } else if (termMonths >= 48) {
    rate += 0.5;
  }

  return rate;
}

/**
 * Calculate tax benefits (Annual Investment Allowance)
 */
function calculateTaxBenefits(equipmentValue: number): TaxBenefit {
  // AIA limit is £1M - most trade equipment qualifies
  const capitalAllowance = Math.min(equipmentValue, 1000000);

  // Corporation tax rate for small businesses (25% from April 2023)
  const taxRate = 0.25;
  const taxSaving = capitalAllowance * taxRate;

  const effectiveNetCost = equipmentValue - taxSaving;
  const savingsPercentage = (taxSaving / equipmentValue) * 100;

  return {
    capitalAllowance,
    taxSaving,
    effectiveNetCost,
    savingsPercentage,
  };
}

/**
 * Calculate HP vs Lease comparison
 */
function calculateComparison(
  financeAmount: number,
  termMonths: number,
  rate: number
): FinanceComparison {
  // HP calculation
  const hpCalc = calculateLoan(financeAmount, termMonths, rate);

  // Lease calculation (typically slightly higher monthly but no ownership)
  // Lease rates are usually 1-2% lower but balloon payment equivalent
  const leaseRate = rate - 1;
  const leaseMonthly = financeAmount * (1 + (leaseRate / 100 * termMonths / 12)) / termMonths;
  const leaseTotalPayable = leaseMonthly * termMonths;
  const leaseTotalCost = leaseTotalPayable; // No ownership at end

  const hp = {
    monthlyPayment: hpCalc.monthlyPayment,
    totalPayable: hpCalc.totalAmount,
    totalInterest: hpCalc.totalInterest,
    ownership: true,
    vatRecovery: '100% on payments',
    description: 'Own the equipment at the end of the term',
  };

  const lease = {
    monthlyPayment: Math.round(leaseMonthly * 100) / 100,
    totalPayable: Math.round(leaseTotalPayable * 100) / 100,
    totalCost: Math.round(leaseTotalCost * 100) / 100,
    ownership: false,
    vatRecovery: '100% on payments',
    description: 'Return or upgrade equipment at end of term',
  };

  // Recommend based on total cost and ownership preference
  // HP typically better for equipment you'll keep long-term
  const recommendation: 'hp' | 'lease' = hp.totalPayable <= lease.totalPayable ? 'hp' : 'lease';
  const recommendationReason = recommendation === 'hp'
    ? 'Hire Purchase gives you ownership at a lower total cost'
    : 'Leasing offers lower monthly payments with upgrade flexibility';

  return { hp, lease, recommendation, recommendationReason };
}

/**
 * Calculate equipment finance
 */
export function calculateEquipmentFinance(
  inputs: EquipmentFinanceInputs
): EquipmentFinanceResult {
  const { equipmentValue, depositPercent, termMonths } = inputs;

  // Calculate deposit and finance amount
  const depositAmount = equipmentValue * (depositPercent / 100);
  const financeAmount = equipmentValue - depositAmount;

  // Get rate based on equipment value
  const rate = getEquipmentRate(equipmentValue, termMonths);

  // Calculate HP loan
  const loanCalc = calculateLoan(financeAmount, termMonths, rate);

  // Calculate tax benefits
  const taxBenefit = calculateTaxBenefits(equipmentValue);

  // Calculate comparison
  const comparison = calculateComparison(financeAmount, termMonths, rate);

  // Total cost of ownership (deposit + finance)
  const totalCostOfOwnership = depositAmount + loanCalc.totalAmount;
  const netCostAfterTax = totalCostOfOwnership - taxBenefit.taxSaving;

  // Create breakdown for chart
  const breakdown = [
    {
      label: 'Deposit',
      value: depositAmount,
      color: '#22c55e', // Green
    },
    {
      label: 'Finance (Principal)',
      value: financeAmount,
      color: '#6366f1', // Purple
    },
    {
      label: 'Interest',
      value: loanCalc.totalInterest,
      color: '#f97316', // Orange
    },
  ];

  // Generate comparison data for chart
  const comparisonData = [];
  for (let month = 1; month <= termMonths; month++) {
    comparisonData.push({
      month,
      hp: loanCalc.monthlyPayment,
      lease: comparison.lease.monthlyPayment,
    });
  }

  return {
    equipmentValue,
    depositAmount,
    financeAmount,
    termMonths,
    monthlyPayment: loanCalc.monthlyPayment,
    totalPayable: loanCalc.totalAmount,
    totalInterest: loanCalc.totalInterest,
    effectiveRate: rate,
    taxBenefit,
    comparison,
    totalCostOfOwnership,
    netCostAfterTax,
    breakdown,
    comparisonData,
  };
}

/**
 * Equipment Finance Configuration
 */
export const EQUIPMENT_FINANCE_CONFIG = {
  equipmentValue: {
    min: 500,
    max: 100000,
    step: 500,
    default: 15000,
    label: 'Equipment Value',
  },
  depositPercent: {
    min: 0,
    max: 50,
    step: 5,
    default: 10,
    label: 'Deposit',
    unit: '%',
  },
  termMonths: {
    min: 12,
    max: 60,
    step: 6,
    default: 36,
    label: 'Finance Term',
    options: [
      { value: 12, label: '12 months' },
      { value: 24, label: '24 months' },
      { value: 36, label: '36 months' },
      { value: 48, label: '48 months' },
      { value: 60, label: '60 months' },
    ],
  },
} as const;

/**
 * Storage key
 */
export const EQUIPMENT_FINANCE_STORAGE_KEY = 'tradesman-calculator-equipment-finance';

/**
 * Save equipment finance calculator data
 */
export function saveEquipmentFinanceData(data: {
  inputs: EquipmentFinanceInputs;
  results: EquipmentFinanceResult;
}): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(EQUIPMENT_FINANCE_STORAGE_KEY, JSON.stringify(data));
  }
}

/**
 * Load equipment finance calculator data
 */
export function loadEquipmentFinanceData(): {
  inputs: EquipmentFinanceInputs;
  results: EquipmentFinanceResult;
} | null {
  if (typeof window === 'undefined') return null;

  const stored = sessionStorage.getItem(EQUIPMENT_FINANCE_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Equipment Finance FAQs
 */
export const EQUIPMENT_FINANCE_FAQS = [
  {
    question: 'What equipment can tradesmen finance?',
    answer: 'Almost any professional equipment can be financed including power tools, test equipment, diagnostic tools, workshop machinery, vehicles, and specialist trade equipment. From £500 to £500,000+, we can help finance the kit you need.',
  },
  {
    question: 'What\'s the difference between HP and leasing?',
    answer: 'With Hire Purchase (HP), you own the equipment at the end of the term. With leasing, you return the equipment or have the option to upgrade. HP typically has lower total costs if you plan to keep the equipment long-term.',
  },
  {
    question: 'Can I claim tax relief on equipment finance?',
    answer: 'Yes, equipment purchases qualify for Annual Investment Allowance (AIA), allowing you to deduct up to £1 million from your profits. This can reduce your corporation tax bill by 25% of the equipment value.',
  },
  {
    question: 'Do I need to pay a deposit?',
    answer: 'A deposit isn\'t always required, but paying 10-20% can reduce your monthly payments and may help with approval if you have limited credit history.',
  },
  {
    question: 'How long does equipment finance approval take?',
    answer: 'Most equipment finance applications receive a decision within 4-24 hours. Once approved, funds are typically available within 2-3 business days.',
  },
  {
    question: 'Can I add equipment to an existing finance agreement?',
    answer: 'In some cases, yes. We can often consolidate multiple equipment purchases into a single agreement or add new items to an existing facility.',
  },
];
