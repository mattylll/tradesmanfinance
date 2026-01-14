"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import {
  PoundSterling,
  Calendar,
  Building2,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Truck,
  Wrench,
  Users,
  Building,
  Cog,
  Megaphone,
  Info,
} from "lucide-react";
import {
  calculateBusinessLoan,
  BUSINESS_LOAN_CONFIG,
  saveBusinessLoanData,
  loadBusinessLoanData,
  type BusinessLoanInputs,
  type BusinessLoanResult,
  type BusinessAge,
  type AnnualTurnover,
  type EligibilityStatus,
} from "@/lib/calculators/business-loan";
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

interface BusinessLoanCalculatorProps {
  className?: string;
  compact?: boolean;
  showCTA?: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  truck: Truck,
  wrench: Wrench,
  users: Users,
  building: Building,
  cog: Cog,
  megaphone: Megaphone,
};

const eligibilityColors: Record<EligibilityStatus, { bg: string; text: string; border: string }> = {
  high: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  low: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

const eligibilityIcons: Record<EligibilityStatus, React.ComponentType<{ className?: string }>> = {
  high: CheckCircle,
  medium: AlertCircle,
  low: XCircle,
};

export function BusinessLoanCalculator({
  className = "",
  compact = false,
  showCTA = true,
}: BusinessLoanCalculatorProps) {
  // Input state
  const [loanAmount, setLoanAmount] = useState<number>(BUSINESS_LOAN_CONFIG.loanAmount.default);
  const [termMonths, setTermMonths] = useState<number>(BUSINESS_LOAN_CONFIG.termMonths.default);
  const [businessAge, setBusinessAge] = useState<BusinessAge>(BUSINESS_LOAN_CONFIG.businessAge.default);
  const [annualTurnover, setAnnualTurnover] = useState<AnnualTurnover>(BUSINESS_LOAN_CONFIG.annualTurnover.default);

  // Results
  const [results, setResults] = useState<BusinessLoanResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lead capture popup
  const { isOpen: isPopupOpen, triggerPopup, closePopup } = useLeadCapturePopup();

  // Wrapper to trigger popup on slider interaction
  const handleSliderChange = <T,>(setter: (value: T) => void) => (value: T) => {
    triggerPopup();
    setter(value);
  };

  // Create inputs object
  const inputs: BusinessLoanInputs = useMemo(
    () => ({
      loanAmount,
      termMonths,
      businessAge,
      annualTurnover,
    }),
    [loanAmount, termMonths, businessAge, annualTurnover]
  );

  // Calculate results
  const calculate = useCallback(() => {
    const result = calculateBusinessLoan(inputs);
    setResults(result);
    saveBusinessLoanData({ inputs, results: result });
    return result;
  }, [inputs]);

  // Load from storage on mount
  useEffect(() => {
    const stored = loadBusinessLoanData();
    if (stored) {
      setLoanAmount(stored.inputs.loanAmount);
      setTermMonths(stored.inputs.termMonths);
      setBusinessAge(stored.inputs.businessAge);
      setAnnualTurnover(stored.inputs.annualTurnover);
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
      <Card className={`border-[#ff6b35]/20 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <PoundSterling className="h-4 w-4 text-[#ff6b35]" />
              <span className="font-semibold text-sm">Loan Calculator</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {results?.adjustedRate?.toFixed(1)}% APR
            </Badge>
          </div>

          <div className="space-y-3">
            <CurrencySliderInput
              label="Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
              min={BUSINESS_LOAN_CONFIG.loanAmount.min}
              max={BUSINESS_LOAN_CONFIG.loanAmount.max}
              step={BUSINESS_LOAN_CONFIG.loanAmount.step}
              showInput={false}
            />

            {results && (
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monthly Payment</span>
                  <motion.span
                    key={results.monthlyPayment}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-bold text-[#ff6b35]"
                  >
                    {formatCurrency(results.monthlyPayment)}
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
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Inputs */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <PoundSterling className="h-5 w-5 text-[#ff6b35]" />
              Business Loan Calculator
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Loan Amount */}
            <CurrencySliderInput
              label="Loan Amount"
              value={loanAmount}
              onChange={handleSliderChange(setLoanAmount)}
              min={BUSINESS_LOAN_CONFIG.loanAmount.min}
              max={BUSINESS_LOAN_CONFIG.loanAmount.max}
              step={BUSINESS_LOAN_CONFIG.loanAmount.step}
              icon={PoundSterling}
            />

            {/* Term */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 text-[#ff6b35]" />
                Loan Term
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={BUSINESS_LOAN_CONFIG.termMonths.min}
                  max={BUSINESS_LOAN_CONFIG.termMonths.max}
                  step={BUSINESS_LOAN_CONFIG.termMonths.step}
                  value={termMonths}
                  onChange={(e) => handleSliderChange(setTermMonths)(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff6b35]"
                />
                <span className="w-24 text-right font-semibold text-gray-900">
                  {termMonths} months
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {Math.floor(termMonths / 12)} year{termMonths >= 24 ? 's' : ''}{termMonths % 12 > 0 ? ` ${termMonths % 12} months` : ''}
              </p>
            </div>

            {/* Business Profile Section */}
            <div className="pt-4 border-t space-y-6">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#ff6b35]" />
                Your Business Profile
              </h4>

              {/* Business Age */}
              <SelectInput
                label="Business Age"
                value={businessAge}
                onChange={(val) => {
                  triggerPopup();
                  setBusinessAge(val as BusinessAge);
                }}
                options={BUSINESS_LOAN_CONFIG.businessAge.options}
                icon={Clock}
              />

              {/* Annual Turnover */}
              <SelectInput
                label="Annual Turnover"
                value={annualTurnover}
                onChange={(val) => {
                  triggerPopup();
                  setAnnualTurnover(val as AnnualTurnover);
                }}
                options={BUSINESS_LOAN_CONFIG.annualTurnover.options}
                icon={TrendingUp}
              />
            </div>

            {/* Rate Info */}
            {results && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Your Indicative Rate</p>
                  <p className="text-blue-700">
                    Based on your business profile, your indicative rate is{' '}
                    <strong>{results.adjustedRate.toFixed(1)}% APR</strong>.
                    {results.rateAdjustment !== 0 && (
                      <span>
                        {' '}This is{' '}
                        {results.rateAdjustment > 0 ? 'above' : 'below'}{' '}
                        our base rate of {results.baseRate}%.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {results && (
            <>
              {/* Primary Result */}
              <ResultHighlight
                label="Monthly Payment"
                value={results.monthlyPayment}
                format="currency"
                description={`Over ${termMonths} months at ${results.adjustedRate.toFixed(1)}% APR`}
              />

              {/* Key Stats */}
              <ResultsGrid columns={3}>
                <ResultCard
                  label="Total Repayable"
                  value={results.totalAmount}
                  format="currency"
                  size="sm"
                />
                <ResultCard
                  label="Total Interest"
                  value={results.totalInterest}
                  format="currency"
                  size="sm"
                  variant="warning"
                />
                <ResultCard
                  label="APR"
                  value={results.adjustedRate}
                  format="percentage"
                  size="sm"
                />
              </ResultsGrid>

              {/* Eligibility Indicator */}
              <Card className={`${eligibilityColors[results.eligibility.status].bg} ${eligibilityColors[results.eligibility.status].border} border`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {(() => {
                      const IconComponent = eligibilityIcons[results.eligibility.status];
                      return (
                        <IconComponent className={`h-6 w-6 ${eligibilityColors[results.eligibility.status].text} flex-shrink-0 mt-0.5`} />
                      );
                    })()}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold ${eligibilityColors[results.eligibility.status].text}`}>
                          Eligibility: {results.eligibility.status.charAt(0).toUpperCase() + results.eligibility.status.slice(1)}
                        </span>
                        <Badge
                          className={`${eligibilityColors[results.eligibility.status].bg} ${eligibilityColors[results.eligibility.status].text} ${eligibilityColors[results.eligibility.status].border} border`}
                        >
                          {results.eligibility.score}/100
                        </Badge>
                      </div>
                      <p className={`text-sm ${eligibilityColors[results.eligibility.status].text}`}>
                        {results.eligibility.message}
                      </p>

                      {/* Factors */}
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        {results.eligibility.factors.positive.slice(0, 2).map((factor, i) => (
                          <div key={i} className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            <span>{factor}</span>
                          </div>
                        ))}
                        {results.eligibility.factors.negative.slice(0, 2).map((factor, i) => (
                          <div key={i} className="flex items-center gap-1 text-red-600">
                            <XCircle className="h-3 w-3" />
                            <span>{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Breakdown Pie Chart */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-gray-700">Payment Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={results.breakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="label"
                        >
                          {results.breakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrencyPrecise(Number(value) || 0)} />
                        <Legend
                          formatter={(value, entry) => {
                            const payload = entry.payload as { value?: number } | undefined;
                            return (
                              <span className="text-sm">
                                {value}: {formatCurrency(payload?.value || 0)}
                              </span>
                            );
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Repayment Chart */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-gray-700">Yearly Repayment Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.yearlyBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="year"
                          tickFormatter={(year) => `Year ${year}`}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis
                          tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                          formatter={(value) => formatCurrency(Number(value) || 0)}
                          labelFormatter={(year) => `Year ${year}`}
                        />
                        <Bar dataKey="principal" stackId="a" fill="#22c55e" name="Principal" />
                        <Bar dataKey="interest" stackId="a" fill="#f97316" name="Interest" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* What This Could Buy */}
              {results.comparisons.length > 0 && (
                <Card className="bg-gradient-to-br from-[#ff6b35]/5 to-[#ffd93d]/5 border-[#ff6b35]/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-gray-700">
                      What {formatCurrency(loanAmount)} Could Buy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="grid gap-3">
                      {results.comparisons.map((comparison, i) => {
                        const IconComponent = iconMap[comparison.icon] || Cog;
                        return (
                          <motion.div
                            key={comparison.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100"
                          >
                            <div className="p-2 bg-[#ff6b35]/10 rounded-lg">
                              <IconComponent className="h-5 w-5 text-[#ff6b35]" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{comparison.title}</p>
                              <p className="text-xs text-gray-500">{comparison.description}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Representative Example</p>
                  <p className="text-amber-700">
                    Borrow {formatCurrency(loanAmount)} over {termMonths} months at{' '}
                    {results.adjustedRate.toFixed(1)}% APR. Monthly payment: {formatCurrency(results.monthlyPayment)}.
                    Total amount repayable: {formatCurrency(results.totalAmount)}.
                    Total interest: {formatCurrency(results.totalInterest)}.
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
                          {formatCurrency(loanAmount)} over {termMonths} months
                        </p>
                        <a
                          href={`/contact?product=business-loan&amount=${loanAmount}&term=${termMonths}`}
                          className="block w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold text-lg py-4 rounded-lg transition-colors text-center"
                        >
                          Apply Now
                          <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Or call us free on</p>
                        <a
                          href="tel:08000869015"
                          className="inline-flex items-center gap-2 text-xl font-bold text-[#ff6b35] hover:text-[#ffd93d] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          0800 086 9015
                        </a>
                      </div>

                      <div className="flex justify-center gap-6 pt-4 border-t border-gray-700">
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>No Fees</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Fast Decision</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>92% Approved</span>
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
        calculatorType="business-loan"
        title="Unlock Your Business Loan Results"
        subtitle="Enter your details to save your calculation and receive a personalised quote"
      />
    </div>
  );
}

export default BusinessLoanCalculator;
