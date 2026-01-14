/**
 * Vehicle Finance Comparison Calculator
 *
 * Compares three vehicle finance options:
 * - Hire Purchase (HP): Own the vehicle at the end
 * - Finance Lease: Flexible end-of-term options
 * - Contract Hire: All-inclusive monthly rental
 */

import { calculateLoan, type LoanCalculation } from '../calculator';

export type VehicleType = 'van' | 'pickup' | 'truck';
export type MileageBand = '10k' | '15k' | '20k' | '25k';
export type FinanceOption = 'hp' | 'lease' | 'contract';

export interface VehicleFinanceInputs {
  vehicleType: VehicleType;
  vehicleValue: number;
  depositPercent: number;
  termMonths: number;
  annualMileage: MileageBand;
  vatRegistered: boolean;
}

export interface FinanceOptionResult {
  type: FinanceOption;
  name: string;
  monthlyPayment: number;
  totalPayable: number;
  effectiveRate: number;
  ownAtEnd: boolean;
  vatRecovery: string;
  vatRecoveryPercent: number;
  maintenance: string;
  bestFor: string;
  pros: string[];
  cons: string[];
}

export interface VehicleFinanceResult {
  // Input summary
  vehicleValue: number;
  depositAmount: number;
  financeAmount: number;
  termMonths: number;

  // Three finance options
  hp: FinanceOptionResult;
  lease: FinanceOptionResult;
  contract: FinanceOptionResult;

  // Recommendation
  recommendation: FinanceOption;
  recommendationReason: string;

  // For comparison chart
  comparisonData: {
    metric: string;
    hp: string | number;
    lease: string | number;
    contract: string | number;
  }[];

  // Monthly payment comparison
  monthlyComparisonData: {
    month: number;
    hp: number;
    lease: number;
    contract: number;
  }[];
}

/**
 * Get base interest rate based on vehicle type and value
 */
function getBaseRate(vehicleType: VehicleType, vehicleValue: number): number {
  let rate = 9.9; // Base rate

  // Adjust for vehicle type
  switch (vehicleType) {
    case 'van':
      rate = 8.9;
      break;
    case 'pickup':
      rate = 9.5;
      break;
    case 'truck':
      rate = 10.5;
      break;
  }

  // Adjust for value (lower rates for higher values)
  if (vehicleValue >= 50000) {
    rate -= 1.0;
  } else if (vehicleValue >= 30000) {
    rate -= 0.5;
  }

  return Math.max(4.9, rate);
}

/**
 * Calculate mileage adjustment for contract hire
 */
function getMileageMultiplier(mileage: MileageBand): number {
  switch (mileage) {
    case '10k': return 0.95;
    case '15k': return 1.0;
    case '20k': return 1.08;
    case '25k': return 1.18;
    default: return 1.0;
  }
}

/**
 * Calculate Hire Purchase option
 */
function calculateHP(
  financeAmount: number,
  termMonths: number,
  rate: number,
  vatRegistered: boolean
): FinanceOptionResult {
  const loanCalc = calculateLoan(financeAmount, termMonths, rate);

  return {
    type: 'hp',
    name: 'Hire Purchase',
    monthlyPayment: loanCalc.monthlyPayment,
    totalPayable: loanCalc.totalAmount,
    effectiveRate: rate,
    ownAtEnd: true,
    vatRecovery: vatRegistered ? '100% on payments' : 'N/A',
    vatRecoveryPercent: vatRegistered ? 100 : 0,
    maintenance: 'Your responsibility',
    bestFor: 'Long-term ownership',
    pros: [
      'Own the vehicle at the end',
      '100% VAT recovery on finance',
      'No mileage restrictions',
      'Can modify or sell freely',
    ],
    cons: [
      'Higher monthly payments',
      'Responsible for maintenance',
      'Asset depreciates on your books',
    ],
  };
}

/**
 * Calculate Finance Lease option
 */
function calculateLease(
  financeAmount: number,
  termMonths: number,
  rate: number,
  vatRegistered: boolean
): FinanceOptionResult {
  // Lease typically has lower monthly due to residual value
  const residualValue = financeAmount * 0.15; // 15% balloon at end
  const netFinance = financeAmount - residualValue;
  const loanCalc = calculateLoan(netFinance, termMonths, rate - 0.5);

  // Add residual value portion to monthly payment
  const residualMonthly = residualValue / termMonths;
  const monthlyPayment = Math.round((loanCalc.monthlyPayment + residualMonthly) * 100) / 100;
  const totalPayable = monthlyPayment * termMonths;

  return {
    type: 'lease',
    name: 'Finance Lease',
    monthlyPayment,
    totalPayable: Math.round(totalPayable * 100) / 100,
    effectiveRate: rate - 0.5,
    ownAtEnd: false,
    vatRecovery: vatRegistered ? '50% on rentals' : 'N/A',
    vatRecoveryPercent: vatRegistered ? 50 : 0,
    maintenance: 'Your responsibility',
    bestFor: 'Tax efficiency',
    pros: [
      'Lower monthly payments than HP',
      'Off-balance sheet (usually)',
      'Flexible end options',
      'Rentals are tax deductible',
    ],
    cons: [
      'Only 50% VAT recovery',
      'Don\'t own the vehicle',
      'End of term options vary',
    ],
  };
}

/**
 * Calculate Contract Hire option
 */
function calculateContract(
  vehicleValue: number,
  termMonths: number,
  mileage: MileageBand,
  vatRegistered: boolean
): FinanceOptionResult {
  // Contract hire based on depreciation + margin + service
  const annualDepreciation = vehicleValue * 0.20; // 20% annual depreciation
  const monthlyDepreciation = annualDepreciation / 12;

  // Add margin and service cost
  const mileageMultiplier = getMileageMultiplier(mileage);
  const serviceCost = vehicleValue * 0.015 / 12; // ~1.5% annual maintenance
  const marginCost = vehicleValue * 0.02 / 12; // ~2% margin

  const monthlyPayment = Math.round((monthlyDepreciation + serviceCost + marginCost) * mileageMultiplier * 100) / 100;
  const totalPayable = monthlyPayment * termMonths;

  return {
    type: 'contract',
    name: 'Contract Hire',
    monthlyPayment,
    totalPayable: Math.round(totalPayable * 100) / 100,
    effectiveRate: 0, // N/A for contract hire
    ownAtEnd: false,
    vatRecovery: vatRegistered ? '50% on rentals' : 'N/A',
    vatRecoveryPercent: vatRegistered ? 50 : 0,
    maintenance: 'Often included',
    bestFor: 'Fixed budgeting',
    pros: [
      'Fixed monthly costs',
      'Maintenance often included',
      'No depreciation risk',
      'Easy to upgrade regularly',
    ],
    cons: [
      'Mileage limits apply',
      'Early termination costly',
      'Don\'t build equity',
      'Fair wear guidelines',
    ],
  };
}

/**
 * Determine best recommendation based on inputs
 */
function getRecommendation(
  hp: FinanceOptionResult,
  lease: FinanceOptionResult,
  contract: FinanceOptionResult,
  termMonths: number,
  vatRegistered: boolean
): { type: FinanceOption; reason: string } {
  // If planning to keep long-term (48+ months), HP makes sense
  if (termMonths >= 48) {
    return {
      type: 'hp',
      reason: 'Hire Purchase is best for long-term ownership - you\'ll own the vehicle outright.',
    };
  }

  // If VAT registered and want tax efficiency, lease can be good
  if (vatRegistered && termMonths <= 36) {
    if (lease.monthlyPayment < hp.monthlyPayment * 0.9) {
      return {
        type: 'lease',
        reason: 'Finance Lease offers lower monthly costs and tax deductible rentals.',
      };
    }
  }

  // If lowest monthly and fixed budget preferred
  if (contract.monthlyPayment <= hp.monthlyPayment && contract.monthlyPayment <= lease.monthlyPayment) {
    return {
      type: 'contract',
      reason: 'Contract Hire provides fixed monthly costs with maintenance often included.',
    };
  }

  // Default to HP for ownership benefits
  return {
    type: 'hp',
    reason: 'Hire Purchase gives you full ownership and no mileage restrictions.',
  };
}

/**
 * Calculate vehicle finance comparison
 */
export function calculateVehicleFinance(
  inputs: VehicleFinanceInputs
): VehicleFinanceResult {
  const { vehicleType, vehicleValue, depositPercent, termMonths, annualMileage, vatRegistered } = inputs;

  // Calculate deposit and finance amount
  const depositAmount = vehicleValue * (depositPercent / 100);
  const financeAmount = vehicleValue - depositAmount;

  // Get base rate
  const baseRate = getBaseRate(vehicleType, vehicleValue);

  // Calculate all three options
  const hp = calculateHP(financeAmount, termMonths, baseRate, vatRegistered);
  const lease = calculateLease(financeAmount, termMonths, baseRate, vatRegistered);
  const contract = calculateContract(vehicleValue, termMonths, annualMileage, vatRegistered);

  // Get recommendation
  const { type: recommendation, reason: recommendationReason } = getRecommendation(
    hp, lease, contract, termMonths, vatRegistered
  );

  // Create comparison data for table
  const comparisonData = [
    { metric: 'Monthly Payment', hp: hp.monthlyPayment, lease: lease.monthlyPayment, contract: contract.monthlyPayment },
    { metric: 'Total Payable', hp: hp.totalPayable, lease: lease.totalPayable, contract: contract.totalPayable },
    { metric: 'Own at End', hp: 'Yes', lease: 'No', contract: 'No' },
    { metric: 'VAT Recovery', hp: hp.vatRecovery, lease: lease.vatRecovery, contract: contract.vatRecovery },
    { metric: 'Maintenance', hp: 'Your cost', lease: 'Your cost', contract: 'Often included' },
    { metric: 'Mileage Limit', hp: 'None', lease: 'None', contract: `${annualMileage.replace('k', ',000')} miles/year` },
  ];

  // Create monthly comparison data for chart
  const monthlyComparisonData = [];
  for (let month = 1; month <= termMonths; month++) {
    monthlyComparisonData.push({
      month,
      hp: hp.monthlyPayment,
      lease: lease.monthlyPayment,
      contract: contract.monthlyPayment,
    });
  }

  return {
    vehicleValue,
    depositAmount,
    financeAmount,
    termMonths,
    hp,
    lease,
    contract,
    recommendation,
    recommendationReason,
    comparisonData,
    monthlyComparisonData,
  };
}

/**
 * Vehicle Finance Configuration
 */
export const VEHICLE_FINANCE_CONFIG = {
  vehicleType: {
    options: [
      { value: 'van', label: 'Van (Transit, Sprinter, etc.)' },
      { value: 'pickup', label: 'Pickup (Ranger, Hilux, etc.)' },
      { value: 'truck', label: 'Truck (7.5t+)' },
    ] as const,
    default: 'van' as VehicleType,
    label: 'Vehicle Type',
  },
  vehicleValue: {
    min: 10000,
    max: 80000,
    step: 1000,
    default: 30000,
    label: 'Vehicle Value',
  },
  depositPercent: {
    min: 0,
    max: 30,
    step: 5,
    default: 10,
    label: 'Deposit',
    unit: '%',
  },
  termMonths: {
    min: 24,
    max: 60,
    step: 12,
    default: 48,
    label: 'Agreement Term',
    options: [
      { value: 24, label: '24 months (2 years)' },
      { value: 36, label: '36 months (3 years)' },
      { value: 48, label: '48 months (4 years)' },
      { value: 60, label: '60 months (5 years)' },
    ],
  },
  annualMileage: {
    options: [
      { value: '10k', label: '10,000 miles/year' },
      { value: '15k', label: '15,000 miles/year' },
      { value: '20k', label: '20,000 miles/year' },
      { value: '25k', label: '25,000+ miles/year' },
    ] as const,
    default: '15k' as MileageBand,
    label: 'Annual Mileage',
  },
} as const;

/**
 * Storage key
 */
export const VEHICLE_FINANCE_STORAGE_KEY = 'tradesman-calculator-vehicle-finance';

/**
 * Save vehicle finance calculator data
 */
export function saveVehicleFinanceData(data: {
  inputs: VehicleFinanceInputs;
  results: VehicleFinanceResult;
}): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(VEHICLE_FINANCE_STORAGE_KEY, JSON.stringify(data));
  }
}

/**
 * Load vehicle finance calculator data
 */
export function loadVehicleFinanceData(): {
  inputs: VehicleFinanceInputs;
  results: VehicleFinanceResult;
} | null {
  if (typeof window === 'undefined') return null;

  const stored = sessionStorage.getItem(VEHICLE_FINANCE_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Vehicle Finance FAQs
 */
export const VEHICLE_FINANCE_FAQS = [
  {
    question: 'What\'s the difference between HP, Lease, and Contract Hire?',
    answer: 'HP (Hire Purchase) means you own the vehicle at the end. Finance Lease is a rental with flexible end options but no ownership. Contract Hire is a fixed-term rental with maintenance often included - you return the vehicle at the end.',
  },
  {
    question: 'Which option is best for tax purposes?',
    answer: 'It depends on your situation. With HP, you can claim capital allowances and 100% VAT recovery. With Lease and Contract Hire, rentals are fully tax deductible but only 50% VAT is recoverable. Speak to your accountant for specific advice.',
  },
  {
    question: 'What happens at the end of a finance lease?',
    answer: 'You have options: extend the lease at a reduced rental, return the vehicle, or arrange a sale (though you can\'t benefit directly from any sale proceeds under a standard finance lease).',
  },
  {
    question: 'Are there mileage restrictions on HP?',
    answer: 'No, HP has no mileage restrictions as you\'re buying the vehicle. Contract Hire has strict mileage limits, and you\'ll pay excess charges if you exceed them.',
  },
  {
    question: 'Can I add maintenance to HP or Finance Lease?',
    answer: 'Yes, maintenance packages can usually be added to any finance option. This can make budgeting easier but isn\'t always the most cost-effective approach.',
  },
  {
    question: 'What deposit do I need for van finance?',
    answer: 'Deposits typically range from 0-30%. A higher deposit reduces monthly payments but ties up your working capital. Many tradesmen opt for 10-20%.',
  },
];
