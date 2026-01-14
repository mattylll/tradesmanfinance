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
import {
  Wrench,
  Percent,
  Calendar,
  CheckCircle,
  AlertCircle,
  Info,
  PoundSterling,
  ArrowRight,
  TrendingUp,
  Banknote,
} from "lucide-react";
import {
  calculateEquipmentFinance,
  EQUIPMENT_FINANCE_CONFIG,
  saveEquipmentFinanceData,
  loadEquipmentFinanceData,
  type EquipmentFinanceInputs,
  type EquipmentFinanceResult,
} from "@/lib/calculators/equipment-finance";
import { trades } from "@/data/trades";
import { formatCurrency, formatCurrencyPrecise } from "@/lib/calculator";
import {
  CurrencySliderInput,
  PercentageSliderInput,
  SelectInput,
  ResultHighlight,
  ResultsGrid,
  ResultCard,
  LeadCapturePopup,
  useLeadCapturePopup,
} from "./shared";

interface EquipmentCalculatorProps {
  className?: string;
  compact?: boolean;
  showCTA?: boolean;
  defaultTrade?: string;
}

export function EquipmentCalculator({
  className = "",
  compact = false,
  showCTA = true,
  defaultTrade,
}: EquipmentCalculatorProps) {
  // Get trade options from trades data
  const tradeOptions = useMemo(
    () => trades.map((t) => ({ value: t.slug, label: t.name })),
    []
  );

  // Input state
  const [tradeSlug, setTradeSlug] = useState<string>(defaultTrade || "electrician");
  const [equipmentCategory, setEquipmentCategory] = useState<string>("");
  const [equipmentValue, setEquipmentValue] = useState<number>(
    EQUIPMENT_FINANCE_CONFIG.equipmentValue.default
  );
  const [depositPercent, setDepositPercent] = useState<number>(
    EQUIPMENT_FINANCE_CONFIG.depositPercent.default
  );
  const [termMonths, setTermMonths] = useState<number>(
    EQUIPMENT_FINANCE_CONFIG.termMonths.default
  );

  // Results
  const [results, setResults] = useState<EquipmentFinanceResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lead capture popup
  const { isOpen: isPopupOpen, triggerPopup, closePopup } = useLeadCapturePopup();

  // Get current trade data
  const currentTrade = useMemo(
    () => trades.find((t) => t.slug === tradeSlug),
    [tradeSlug]
  );

  // Get equipment categories for current trade
  const categoryOptions = useMemo(() => {
    if (!currentTrade) return [];
    return currentTrade.equipmentCategories.map((c) => ({
      value: c.name,
      label: `${c.name} (${c.priceRange})`,
    }));
  }, [currentTrade]);

  // Set default category when trade changes
  useEffect(() => {
    if (categoryOptions.length > 0 && !categoryOptions.find((c) => c.value === equipmentCategory)) {
      setEquipmentCategory(categoryOptions[0].value);
    }
  }, [categoryOptions, equipmentCategory]);

  // Wrapper to trigger popup on slider interaction
  const handleSliderChange = <T,>(setter: (value: T) => void) => (value: T) => {
    triggerPopup();
    setter(value);
  };

  // Create inputs object
  const inputs: EquipmentFinanceInputs = useMemo(
    () => ({
      tradeSlug,
      equipmentCategory,
      equipmentValue,
      depositPercent,
      termMonths,
    }),
    [tradeSlug, equipmentCategory, equipmentValue, depositPercent, termMonths]
  );

  // Calculate results
  const calculate = useCallback(() => {
    const result = calculateEquipmentFinance(inputs);
    setResults(result);
    saveEquipmentFinanceData({ inputs, results: result });
    return result;
  }, [inputs]);

  // Load from storage on mount
  useEffect(() => {
    const stored = loadEquipmentFinanceData();
    if (stored) {
      setTradeSlug(stored.inputs.tradeSlug);
      setEquipmentCategory(stored.inputs.equipmentCategory);
      setEquipmentValue(stored.inputs.equipmentValue);
      setDepositPercent(stored.inputs.depositPercent);
      setTermMonths(stored.inputs.termMonths);
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

  // Get current category details
  const currentCategory = useMemo(() => {
    if (!currentTrade) return null;
    return currentTrade.equipmentCategories.find((c) => c.name === equipmentCategory);
  }, [currentTrade, equipmentCategory]);

  // Compact version
  if (compact) {
    return (
      <Card className={`border-[#0ea5a5]/20 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[#0ea5a5]" />
              <span className="font-semibold text-sm">Equipment Calculator</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {depositPercent}% Deposit
            </Badge>
          </div>

          <div className="space-y-3">
            <CurrencySliderInput
              label="Equipment Value"
              value={equipmentValue}
              onChange={setEquipmentValue}
              min={EQUIPMENT_FINANCE_CONFIG.equipmentValue.min}
              max={EQUIPMENT_FINANCE_CONFIG.equipmentValue.max}
              step={EQUIPMENT_FINANCE_CONFIG.equipmentValue.step}
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
                    className="text-lg font-bold text-[#0ea5a5]"
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
              <Wrench className="h-5 w-5 text-[#0ea5a5]" />
              Equipment Finance Calculator
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Trade Selection */}
            <SelectInput
              label="Your Trade"
              value={tradeSlug}
              onChange={(val) => {
                triggerPopup();
                setTradeSlug(val);
              }}
              options={tradeOptions}
              icon={Wrench}
            />

            {/* Equipment Category */}
            {categoryOptions.length > 0 && (
              <SelectInput
                label="Equipment Category"
                value={equipmentCategory}
                onChange={(val) => {
                  triggerPopup();
                  setEquipmentCategory(val);
                }}
                options={categoryOptions}
                icon={Wrench}
              />
            )}

            {/* Equipment Examples */}
            {currentCategory && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Examples:</p>
                <div className="flex flex-wrap gap-2">
                  {currentCategory.items.slice(0, 4).map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="bg-white text-gray-700 text-xs"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment Value */}
            <CurrencySliderInput
              label="Equipment Value"
              value={equipmentValue}
              onChange={handleSliderChange(setEquipmentValue)}
              min={EQUIPMENT_FINANCE_CONFIG.equipmentValue.min}
              max={EQUIPMENT_FINANCE_CONFIG.equipmentValue.max}
              step={EQUIPMENT_FINANCE_CONFIG.equipmentValue.step}
              icon={PoundSterling}
            />

            {/* Deposit */}
            <PercentageSliderInput
              label="Deposit"
              value={depositPercent}
              onChange={handleSliderChange(setDepositPercent)}
              min={EQUIPMENT_FINANCE_CONFIG.depositPercent.min}
              max={EQUIPMENT_FINANCE_CONFIG.depositPercent.max}
              step={EQUIPMENT_FINANCE_CONFIG.depositPercent.step}
              icon={Percent}
            />
            {results && (
              <p className="text-xs text-gray-500 -mt-4">
                Deposit amount: {formatCurrency(results.depositAmount)}
              </p>
            )}

            {/* Term */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 text-[#0ea5a5]" />
                Finance Term
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={EQUIPMENT_FINANCE_CONFIG.termMonths.min}
                  max={EQUIPMENT_FINANCE_CONFIG.termMonths.max}
                  step={EQUIPMENT_FINANCE_CONFIG.termMonths.step}
                  value={termMonths}
                  onChange={(e) => handleSliderChange(setTermMonths)(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0ea5a5]"
                />
                <span className="w-24 text-right font-semibold text-gray-900">
                  {termMonths} months
                </span>
              </div>
            </div>

            {/* Tax Benefit Info */}
            {results && (
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex gap-3">
                <Banknote className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-medium mb-1">Tax Benefit Available</p>
                  <p className="text-green-700">
                    This equipment qualifies for Annual Investment Allowance.
                    You could save <strong>{formatCurrency(results.taxBenefit.taxSaving)}</strong> in
                    corporation tax (25% of equipment value).
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
                label="Monthly Payment (HP)"
                value={results.monthlyPayment}
                format="currency"
                description={`Over ${termMonths} months at ${results.effectiveRate.toFixed(1)}% APR`}
              />

              {/* Key Stats */}
              <ResultsGrid columns={3}>
                <ResultCard
                  label="Finance Amount"
                  value={results.financeAmount}
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
                  label="Total Payable"
                  value={results.totalPayable}
                  format="currency"
                  size="sm"
                />
              </ResultsGrid>

              {/* HP vs Lease Comparison */}
              <Card className="bg-white shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#0ea5a5]/10 to-[#22d3d3]/10 pb-3">
                  <CardTitle className="text-base text-gray-700 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#0ea5a5]" />
                    HP vs Lease Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 divide-x">
                    {/* HP Option */}
                    <div className={`p-4 ${results.comparison.recommendation === 'hp' ? 'bg-green-50' : ''}`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900">Hire Purchase</span>
                        {results.comparison.recommendation === 'hp' && (
                          <Badge className="bg-green-500 text-white text-xs">Recommended</Badge>
                        )}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly</span>
                          <span className="font-semibold">{formatCurrency(results.comparison.hp.monthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total</span>
                          <span className="font-semibold">{formatCurrency(results.comparison.hp.totalPayable)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ownership</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">{results.comparison.hp.description}</p>
                    </div>

                    {/* Lease Option */}
                    <div className={`p-4 ${results.comparison.recommendation === 'lease' ? 'bg-green-50' : ''}`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900">Lease</span>
                        {results.comparison.recommendation === 'lease' && (
                          <Badge className="bg-green-500 text-white text-xs">Recommended</Badge>
                        )}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly</span>
                          <span className="font-semibold">{formatCurrency(results.comparison.lease.monthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total</span>
                          <span className="font-semibold">{formatCurrency(results.comparison.lease.totalPayable)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ownership</span>
                          <span className="text-gray-400">No</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">{results.comparison.lease.description}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border-t text-xs text-gray-600">
                    {results.comparison.recommendationReason}
                  </div>
                </CardContent>
              </Card>

              {/* Tax Benefit Card */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Banknote className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-800 mb-2">
                        Capital Allowance Tax Benefit
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-green-600">Tax Saving</p>
                          <p className="text-lg font-bold text-green-700">
                            {formatCurrency(results.taxBenefit.taxSaving)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600">Net Cost After Tax</p>
                          <p className="text-lg font-bold text-green-700">
                            {formatCurrency(results.netCostAfterTax)}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-green-700 mt-2">
                        You can claim {formatCurrency(results.taxBenefit.capitalAllowance)} as Annual Investment Allowance,
                        reducing your corporation tax by {results.taxBenefit.savingsPercentage.toFixed(0)}%.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Breakdown Pie Chart */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-gray-700">Cost Breakdown</CardTitle>
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

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Representative Example</p>
                  <p className="text-amber-700">
                    {formatCurrency(equipmentValue)} equipment with {depositPercent}% deposit
                    ({formatCurrency(results.depositAmount)}). Finance {formatCurrency(results.financeAmount)} over{' '}
                    {termMonths} months at {results.effectiveRate.toFixed(1)}% APR.
                    Monthly payment: {formatCurrency(results.monthlyPayment)}.
                    Total payable: {formatCurrency(results.totalCostOfOwnership)}.
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
                          Finance Your {currentCategory?.name || 'Equipment'} Today
                        </p>
                        <p className="text-sm text-gray-300 mb-4">
                          {formatCurrency(equipmentValue)} with {formatCurrency(results.monthlyPayment)}/month
                        </p>
                        <a
                          href={`/contact?product=equipment-finance&amount=${equipmentValue}&term=${termMonths}&trade=${tradeSlug}`}
                          className="block w-full bg-[#0ea5a5] hover:bg-[#0d9494] text-white font-semibold text-lg py-4 rounded-lg transition-colors text-center"
                        >
                          Get a Quote
                          <ArrowRight className="w-5 h-5 inline ml-2" />
                        </a>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Or call us free on</p>
                        <a
                          href="tel:08000869015"
                          className="inline-flex items-center gap-2 text-xl font-bold text-[#0ea5a5] hover:text-[#22d3d3] transition-colors"
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
                          <span>Same Day Decision</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Tax Efficient</span>
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
        calculatorType="equipment-finance"
        title="Unlock Your Equipment Finance Results"
        subtitle="Enter your details to save your calculation and receive a personalised quote"
      />
    </div>
  );
}

export default EquipmentCalculator;
