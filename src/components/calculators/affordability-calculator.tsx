"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Progress } from "@/registry/new-york-v4/ui/progress";
import {
  Calculator,
  PoundSterling,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowRight,
  Briefcase,
  Clock,
  CreditCard,
  FileText,
  Wrench,
  Truck,
  Sparkles,
} from "lucide-react";
import {
  calculateAffordability,
  AFFORDABILITY_CONFIG,
  saveAffordabilityData,
  loadAffordabilityData,
  type AffordabilityInputs,
  type AffordabilityResult,
  type BusinessAge,
  type CreditProfile,
} from "@/lib/calculators/affordability";
import { formatCurrency, formatCurrencyPrecise } from "@/lib/calculator";
import {
  CurrencySliderInput,
  SelectInput,
  ResultHighlight,
  ResultsGrid,
  ResultCard,
  LeadCapturePopup,
  useLeadCapturePopup,
} from "./shared";

interface AffordabilityCalculatorProps {
  className?: string;
  compact?: boolean;
  showCTA?: boolean;
}

const businessAgeOptions = AFFORDABILITY_CONFIG.businessAge.options.map((opt) => ({
  value: opt.value,
  label: opt.label,
}));

const creditProfileOptions = AFFORDABILITY_CONFIG.creditProfile.options.map((opt) => ({
  value: opt.value,
  label: opt.label,
}));

// Colors for the score indicator
const SCORE_COLORS = {
  high: "#22c55e",
  medium: "#f59e0b",
  low: "#ef4444",
};

// Product colors
const PRODUCT_COLORS = {
  'Business Loan': '#6366f1',
  'Equipment': '#0ea5a5',
  'Vehicle': '#10b981',
  'Invoice Facility': '#ff6b35',
};

export function AffordabilityCalculator({
  className = "",
  compact = false,
  showCTA = true,
}: AffordabilityCalculatorProps) {
  // Input state
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(
    AFFORDABILITY_CONFIG.monthlyRevenue.default
  );
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(
    AFFORDABILITY_CONFIG.monthlyExpenses.default
  );
  const [existingDebtPayments, setExistingDebtPayments] = useState<number>(
    AFFORDABILITY_CONFIG.existingDebtPayments.default
  );
  const [businessAge, setBusinessAge] = useState<BusinessAge>(
    AFFORDABILITY_CONFIG.businessAge.default
  );
  const [creditProfile, setCreditProfile] = useState<CreditProfile>(
    AFFORDABILITY_CONFIG.creditProfile.default
  );

  // Results
  const [results, setResults] = useState<AffordabilityResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lead capture popup
  const { isOpen: isPopupOpen, triggerPopup, closePopup } = useLeadCapturePopup();

  // Wrapper to trigger popup on slider interaction
  const handleSliderChange = <T,>(setter: (value: T) => void) => (value: T) => {
    triggerPopup();
    setter(value);
  };

  // Create inputs object
  const inputs: AffordabilityInputs = useMemo(
    () => ({
      monthlyRevenue,
      monthlyExpenses,
      existingDebtPayments,
      businessAge,
      creditProfile,
    }),
    [monthlyRevenue, monthlyExpenses, existingDebtPayments, businessAge, creditProfile]
  );

  // Calculate results
  const calculate = useCallback(() => {
    const result = calculateAffordability(inputs);
    setResults(result);
    saveAffordabilityData({ inputs, results: result });
    return result;
  }, [inputs]);

  // Load from storage on mount
  useEffect(() => {
    const stored = loadAffordabilityData();
    if (stored) {
      setMonthlyRevenue(stored.inputs.monthlyRevenue);
      setMonthlyExpenses(stored.inputs.monthlyExpenses);
      setExistingDebtPayments(stored.inputs.existingDebtPayments);
      setBusinessAge(stored.inputs.businessAge);
      setCreditProfile(stored.inputs.creditProfile);
      setResults(stored.results);
    } else {
      calculate();
    }
    setIsLoaded(true);
  }, []);

  // Recalculate on input changes
  useEffect(() => {
    if (isLoaded) {
      calculate();
    }
  }, [inputs, calculate, isLoaded]);

  // Compact version
  if (compact) {
    return (
      <Card className={`border-[#f59e0b]/20 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-[#f59e0b]" />
              <span className="font-semibold text-sm">Affordability Check</span>
            </div>
            {results && (
              <Badge
                className="text-xs"
                style={{
                  backgroundColor: `${SCORE_COLORS[results.score]}20`,
                  color: SCORE_COLORS[results.score],
                  borderColor: `${SCORE_COLORS[results.score]}50`,
                }}
              >
                {results.score.charAt(0).toUpperCase() + results.score.slice(1)}
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            <CurrencySliderInput
              label="Monthly Revenue"
              value={monthlyRevenue}
              onChange={setMonthlyRevenue}
              min={AFFORDABILITY_CONFIG.monthlyRevenue.min}
              max={AFFORDABILITY_CONFIG.monthlyRevenue.max}
              step={AFFORDABILITY_CONFIG.monthlyRevenue.step}
              showInput={false}
            />

            {results && (
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Max Payment</span>
                  <motion.span
                    key={results.maxComfortablePayment}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-bold text-[#f59e0b]"
                  >
                    {formatCurrency(results.maxComfortablePayment)}/mo
                  </motion.span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full calculator
  return (
    <div className={`${className}`}>
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Column - Inputs (2 cols) */}
        <Card className="lg:col-span-2 bg-white shadow-lg">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Calculator className="h-5 w-5 text-[#f59e0b]" />
              Affordability Calculator
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Monthly Revenue */}
            <CurrencySliderInput
              label="Monthly Revenue"
              value={monthlyRevenue}
              onChange={handleSliderChange(setMonthlyRevenue)}
              min={AFFORDABILITY_CONFIG.monthlyRevenue.min}
              max={AFFORDABILITY_CONFIG.monthlyRevenue.max}
              step={AFFORDABILITY_CONFIG.monthlyRevenue.step}
              icon={TrendingUp}
            />

            {/* Monthly Expenses */}
            <CurrencySliderInput
              label="Monthly Expenses"
              value={monthlyExpenses}
              onChange={handleSliderChange(setMonthlyExpenses)}
              min={AFFORDABILITY_CONFIG.monthlyExpenses.min}
              max={AFFORDABILITY_CONFIG.monthlyExpenses.max}
              step={AFFORDABILITY_CONFIG.monthlyExpenses.step}
              icon={TrendingDown}
            />

            {/* Existing Debt */}
            <CurrencySliderInput
              label="Existing Debt Payments"
              value={existingDebtPayments}
              onChange={handleSliderChange(setExistingDebtPayments)}
              min={AFFORDABILITY_CONFIG.existingDebtPayments.min}
              max={AFFORDABILITY_CONFIG.existingDebtPayments.max}
              step={AFFORDABILITY_CONFIG.existingDebtPayments.step}
              icon={CreditCard}
            />

            {/* Business Age */}
            <SelectInput
              label="How Long Have You Been Trading?"
              value={businessAge}
              onChange={(val) => {
                triggerPopup();
                setBusinessAge(val as BusinessAge);
              }}
              options={businessAgeOptions}
              icon={Clock}
            />

            {/* Credit Profile */}
            <SelectInput
              label="Credit Profile"
              value={creditProfile}
              onChange={(val) => {
                triggerPopup();
                setCreditProfile(val as CreditProfile);
              }}
              options={creditProfileOptions}
              icon={Briefcase}
            />

            {/* Quick Stats */}
            {results && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly Profit</span>
                  <span className={`font-semibold ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.netProfit)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Profit Margin</span>
                  <span className={`font-semibold ${results.profitMargin >= 20 ? 'text-green-600' : results.profitMargin >= 10 ? 'text-amber-600' : 'text-red-600'}`}>
                    {results.profitMargin}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Free Cashflow</span>
                  <span className={`font-semibold ${results.freeCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.freeCashflow)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column - Results (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {results && (
            <>
              {/* Affordability Score */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="shadow-lg overflow-hidden">
                  <div
                    className="p-6"
                    style={{
                      background: `linear-gradient(135deg, ${SCORE_COLORS[results.score]}15 0%, white 100%)`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-3 rounded-xl"
                          style={{ backgroundColor: `${SCORE_COLORS[results.score]}20` }}
                        >
                          {results.score === 'high' && <Sparkles className="h-6 w-6" style={{ color: SCORE_COLORS.high }} />}
                          {results.score === 'medium' && <AlertCircle className="h-6 w-6" style={{ color: SCORE_COLORS.medium }} />}
                          {results.score === 'low' && <XCircle className="h-6 w-6" style={{ color: SCORE_COLORS.low }} />}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Affordability Score</h3>
                          <p className="text-sm text-gray-600 capitalize">{results.score} Borrowing Power</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <motion.span
                          key={results.scorePercentage}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="text-4xl font-bold"
                          style={{ color: SCORE_COLORS[results.score] }}
                        >
                          {results.scorePercentage}
                        </motion.span>
                        <span className="text-lg text-gray-500">/100</span>
                      </div>
                    </div>

                    <Progress
                      value={results.scorePercentage}
                      className="h-3 mb-4"
                      style={{
                        backgroundColor: `${SCORE_COLORS[results.score]}20`,
                      }}
                    />

                    <p className="text-gray-700">{results.recommendation}</p>
                  </div>
                </Card>
              </motion.div>

              {/* Max Comfortable Payment */}
              <ResultHighlight
                label="Maximum Comfortable Monthly Payment"
                value={results.maxComfortablePayment}
                format="currency"
                description="Based on 40% of your free cashflow - a conservative approach to maintain healthy finances"
              />

              {/* Borrowing Power by Product */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-gray-700 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#f59e0b]" />
                    Your Borrowing Power
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Business Loan */}
                    <ProductCard
                      name="Business Loan"
                      icon={PoundSterling}
                      maxAmount={results.businessLoan.maxAmount}
                      term={`${results.businessLoan.typicalTerm} months`}
                      payment={results.businessLoan.monthlyPayment}
                      description={results.businessLoan.description}
                      color={PRODUCT_COLORS['Business Loan']}
                      href="/calculators/business-loans"
                    />

                    {/* Equipment Finance */}
                    <ProductCard
                      name="Equipment Finance"
                      icon={Wrench}
                      maxAmount={results.equipmentFinance.maxAmount}
                      term={`${results.equipmentFinance.typicalTerm} months`}
                      payment={results.equipmentFinance.monthlyPayment}
                      description={results.equipmentFinance.description}
                      color={PRODUCT_COLORS['Equipment']}
                      href="/calculators/equipment-finance"
                    />

                    {/* Vehicle Finance */}
                    <ProductCard
                      name="Vehicle Finance"
                      icon={Truck}
                      maxAmount={results.vehicleFinance.maxAmount}
                      term={`${results.vehicleFinance.typicalTerm} months`}
                      payment={results.vehicleFinance.monthlyPayment}
                      description={results.vehicleFinance.description}
                      color={PRODUCT_COLORS['Vehicle']}
                      href="/calculators/vehicle-finance"
                    />

                    {/* Invoice Finance */}
                    <ProductCard
                      name="Invoice Finance"
                      icon={FileText}
                      maxAmount={results.invoiceFinance.maxAmount}
                      term="Revolving"
                      payment={0}
                      description={results.invoiceFinance.description}
                      color={PRODUCT_COLORS['Invoice Facility']}
                      href="/calculators/invoice-finance"
                      isInvoice
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Factors */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Positive Factors */}
                {results.positiveFactors.length > 0 && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Working in Your Favour
                      </h4>
                      <ul className="space-y-2">
                        {results.positiveFactors.map((factor, idx) => (
                          <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                            <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Negative Factors */}
                {results.negativeFactors.length > 0 && (
                  <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Areas to Consider
                      </h4>
                      <ul className="space-y-2">
                        {results.negativeFactors.map((factor, idx) => (
                          <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                            <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Borrowing Power Chart */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-gray-700">
                    Borrowing Power by Product
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={results.borrowingPowerChart}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis
                          type="number"
                          tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                        />
                        <YAxis type="category" dataKey="product" width={90} />
                        <Tooltip
                          formatter={(value) => formatCurrencyPrecise(Number(value))}
                          labelStyle={{ fontWeight: "bold" }}
                        />
                        <Bar
                          dataKey="amount"
                          radius={[0, 4, 4, 0]}
                          fill="#f59e0b"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Warning */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Indicative Assessment</p>
                  <p className="text-blue-700">
                    This calculator provides estimates based on the information you've entered.
                    Actual borrowing amounts depend on a full assessment of your business accounts,
                    personal circumstances, and lender criteria. Speak to us for an accurate quote.
                  </p>
                </div>
              </div>

              {/* CTA */}
              {showCTA && (
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-white mb-1">
                          Get Your Personalised Quote
                        </p>
                        <p className="text-sm text-gray-300 mb-4">
                          Up to {formatCurrency(results.businessLoan.maxAmount)} available
                        </p>
                        <a
                          href={`/contact?product=business-loan&amount=${results.businessLoan.maxAmount}`}
                          className="block w-full bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold text-lg py-4 rounded-lg transition-colors text-center"
                        >
                          Get a Quote
                          <ArrowRight className="w-5 h-5 inline ml-2" />
                        </a>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Or call us free on</p>
                        <a
                          href="tel:08000869015"
                          className="inline-flex items-center gap-2 text-xl font-bold text-[#f59e0b] hover:text-[#fbbf24] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          0800 086 9015
                        </a>
                      </div>

                      <div className="flex justify-center gap-6 pt-4 border-t border-gray-700">
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>No Obligation</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>All Credit Profiles</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Fast Decisions</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lead Capture Popup */}
      <LeadCapturePopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        calculatorType="affordability"
        title="Unlock Your Affordability Assessment"
        subtitle="Enter your details to save your calculation and receive personalised options"
      />
    </div>
  );
}

// Product Card Component
function ProductCard({
  name,
  icon: Icon,
  maxAmount,
  term,
  payment,
  description,
  color,
  href,
  isInvoice = false,
}: {
  name: string;
  icon: typeof PoundSterling;
  maxAmount: number;
  term: string;
  payment: number;
  description: string;
  color: string;
  href: string;
  isInvoice?: boolean;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      className="block"
    >
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-l-4" style={{ borderLeftColor: color }}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="h-4 w-4" style={{ color }} />
            </div>
            <span className="font-semibold text-gray-900">{name}</span>
          </div>

          <div className="mb-2">
            <p className="text-xs text-gray-500">{isInvoice ? 'Facility up to' : 'Borrow up to'}</p>
            <p className="text-2xl font-bold" style={{ color }}>
              {formatCurrency(maxAmount)}
            </p>
          </div>

          {!isInvoice && payment > 0 && (
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{term}</span>
              <span>{formatCurrency(payment)}/mo</span>
            </div>
          )}
          {isInvoice && (
            <p className="text-sm text-gray-600 mb-2">Fee-based • No fixed payments</p>
          )}

          <p className="text-xs text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </motion.a>
  );
}

export default AffordabilityCalculator;
