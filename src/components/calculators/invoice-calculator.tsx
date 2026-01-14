"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs";
import {
  FileText,
  PoundSterling,
  Percent,
  Clock,
  TrendingUp,
  AlertCircle,
  Info,
  Layers,
  Receipt,
  Calendar,
  Building2,
} from "lucide-react";
import {
  calculateInvoiceFinance,
  INVOICE_FINANCE_CONFIG,
  saveInvoiceCalculatorData,
  loadInvoiceCalculatorData,
  type InvoiceFinanceInputs,
  type InvoiceFinanceResult,
  type CalculatorMode,
} from "@/lib/calculators/invoice-finance";
import { formatCurrency, formatCurrencyPrecise } from "@/lib/calculator";
import {
  CurrencySliderInput,
  PercentageSliderInput,
  SelectInput,
  ResultHighlight,
  ResultsGrid,
  ResultCard,
  FeeBreakdown,
  LeadCapturePopup,
  useLeadCapturePopup,
} from "./shared";
import { InvoiceFinanceApplicationFlow } from "./invoice-application-flow";

interface InvoiceCalculatorProps {
  className?: string;
  compact?: boolean;
  showCTA?: boolean;
}

export function InvoiceCalculator({
  className = "",
  compact = false,
  showCTA = true,
}: InvoiceCalculatorProps) {
  // Mode state
  const [mode, setMode] = useState<CalculatorMode>("facility");

  // Input state - Single Invoice
  const [invoiceValue, setInvoiceValue] = useState<number>(
    INVOICE_FINANCE_CONFIG.invoiceValue.default
  );

  // Input state - Facility
  const [monthlyTurnover, setMonthlyTurnover] = useState<number>(
    INVOICE_FINANCE_CONFIG.monthlyTurnover.default
  );
  const [invoicesPerMonth, setInvoicesPerMonth] = useState<number>(
    INVOICE_FINANCE_CONFIG.invoicesPerMonth.default
  );

  // Common inputs
  const [advanceRate, setAdvanceRate] = useState<number>(
    INVOICE_FINANCE_CONFIG.advanceRate.default
  );
  const [serviceFeeRate, setServiceFeeRate] = useState<number>(
    INVOICE_FINANCE_CONFIG.serviceFeeRate.default
  );
  const [discountFeeRate, setDiscountFeeRate] = useState<number>(
    INVOICE_FINANCE_CONFIG.discountFeeRate.default
  );
  const [paymentDays, setPaymentDays] = useState<number>(
    INVOICE_FINANCE_CONFIG.paymentDays.default
  );

  // Results
  const [results, setResults] = useState<InvoiceFinanceResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Application flow state
  const [showApplicationFlow, setShowApplicationFlow] = useState(false);

  // Lead capture popup
  const { isOpen: isPopupOpen, triggerPopup, closePopup } = useLeadCapturePopup();

  // Wrapper to trigger popup on slider interaction
  const handleSliderChange = <T,>(setter: (value: T) => void) => (value: T) => {
    triggerPopup();
    setter(value);
  };

  // Create inputs object
  const inputs: InvoiceFinanceInputs = useMemo(
    () => ({
      mode,
      invoiceValue,
      monthlyTurnover,
      invoicesPerMonth,
      advanceRate,
      serviceFeeRate,
      discountFeeRate,
      paymentDays,
    }),
    [mode, invoiceValue, monthlyTurnover, invoicesPerMonth, advanceRate, serviceFeeRate, discountFeeRate, paymentDays]
  );

  // Calculate results
  const calculate = useCallback(() => {
    const result = calculateInvoiceFinance(inputs);
    setResults(result);
    saveInvoiceCalculatorData({ inputs, results: result });
    return result;
  }, [inputs]);

  // Load from storage on mount
  useEffect(() => {
    const stored = loadInvoiceCalculatorData();
    if (stored) {
      setMode(stored.inputs.mode || "facility");
      setInvoiceValue(stored.inputs.invoiceValue);
      setMonthlyTurnover(stored.inputs.monthlyTurnover || INVOICE_FINANCE_CONFIG.monthlyTurnover.default);
      setInvoicesPerMonth(stored.inputs.invoicesPerMonth || INVOICE_FINANCE_CONFIG.invoicesPerMonth.default);
      setAdvanceRate(stored.inputs.advanceRate);
      setServiceFeeRate(stored.inputs.serviceFeeRate);
      setDiscountFeeRate(stored.inputs.discountFeeRate);
      setPaymentDays(stored.inputs.paymentDays);
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

  // Handle Apply Now click
  const handleApplyNow = () => {
    setShowApplicationFlow(true);
  };

  // Compact version
  if (compact) {
    return (
      <Card className={`border-[#ff6b35]/20 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#ff6b35]" />
              <span className="font-semibold text-sm">Invoice Calculator</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {advanceRate}% Advance
            </Badge>
          </div>

          <div className="space-y-3">
            <CurrencySliderInput
              label="Invoice Value"
              value={invoiceValue}
              onChange={setInvoiceValue}
              min={INVOICE_FINANCE_CONFIG.invoiceValue.min}
              max={INVOICE_FINANCE_CONFIG.invoiceValue.max}
              step={INVOICE_FINANCE_CONFIG.invoiceValue.step}
              showInput={false}
            />

            {results && (
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">You Receive Now</span>
                  <motion.span
                    key={results.netReceived}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-bold text-green-600"
                  >
                    {formatCurrency(results.netReceived)}
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
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <FileText className="h-5 w-5 text-[#ff6b35]" />
                Invoice Finance Calculator
              </CardTitle>
            </div>

            {/* Mode Toggle */}
            <div className="mt-4">
              <Tabs value={mode} onValueChange={(v) => setMode(v as CalculatorMode)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="facility" className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Facility
                  </TabsTrigger>
                  <TabsTrigger value="single" className="flex items-center gap-2">
                    <Receipt className="h-4 w-4" />
                    Single Invoice
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <p className="text-xs text-gray-500 mt-2">
                {mode === "facility"
                  ? "Calculate costs for ongoing invoice funding"
                  : "Calculate costs for a single invoice"}
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <AnimatePresence mode="wait">
              {mode === "facility" ? (
                <motion.div
                  key="facility"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Monthly Turnover */}
                  <CurrencySliderInput
                    label="Monthly Invoice Turnover"
                    value={monthlyTurnover}
                    onChange={handleSliderChange(setMonthlyTurnover)}
                    min={INVOICE_FINANCE_CONFIG.monthlyTurnover.min}
                    max={INVOICE_FINANCE_CONFIG.monthlyTurnover.max}
                    step={INVOICE_FINANCE_CONFIG.monthlyTurnover.step}
                    icon={Building2}
                  />

                  {/* Invoices Per Month */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Calendar className="h-4 w-4 text-[#ff6b35]" />
                      Invoices Per Month
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={INVOICE_FINANCE_CONFIG.invoicesPerMonth.min}
                        max={INVOICE_FINANCE_CONFIG.invoicesPerMonth.max}
                        step={INVOICE_FINANCE_CONFIG.invoicesPerMonth.step}
                        value={invoicesPerMonth}
                        onChange={(e) => handleSliderChange(setInvoicesPerMonth)(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff6b35]"
                      />
                      <span className="w-16 text-right font-semibold text-gray-900">
                        {invoicesPerMonth}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Avg invoice: {formatCurrency(monthlyTurnover / invoicesPerMonth)}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="single"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {/* Invoice Value */}
                  <CurrencySliderInput
                    label="Invoice Value"
                    value={invoiceValue}
                    onChange={handleSliderChange(setInvoiceValue)}
                    min={INVOICE_FINANCE_CONFIG.invoiceValue.min}
                    max={INVOICE_FINANCE_CONFIG.invoiceValue.max}
                    step={INVOICE_FINANCE_CONFIG.invoiceValue.step}
                    icon={PoundSterling}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Common Inputs */}
            <div className="pt-4 border-t space-y-6">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Percent className="h-4 w-4 text-[#ff6b35]" />
                Rates & Terms
              </h4>

              {/* Advance Rate */}
              <PercentageSliderInput
                label="Advance Rate"
                value={advanceRate}
                onChange={handleSliderChange(setAdvanceRate)}
                min={INVOICE_FINANCE_CONFIG.advanceRate.min}
                max={INVOICE_FINANCE_CONFIG.advanceRate.max}
                step={INVOICE_FINANCE_CONFIG.advanceRate.step}
                icon={TrendingUp}
              />

              {/* Service Fee Rate */}
              <PercentageSliderInput
                label="Service Fee"
                value={serviceFeeRate}
                onChange={handleSliderChange(setServiceFeeRate)}
                min={INVOICE_FINANCE_CONFIG.serviceFeeRate.min}
                max={INVOICE_FINANCE_CONFIG.serviceFeeRate.max}
                step={INVOICE_FINANCE_CONFIG.serviceFeeRate.step}
                icon={Percent}
              />

              {/* Discount Fee Rate */}
              <PercentageSliderInput
                label="Discount Fee (per month)"
                value={discountFeeRate}
                onChange={handleSliderChange(setDiscountFeeRate)}
                min={INVOICE_FINANCE_CONFIG.discountFeeRate.min}
                max={INVOICE_FINANCE_CONFIG.discountFeeRate.max}
                step={INVOICE_FINANCE_CONFIG.discountFeeRate.step}
                icon={Percent}
                suffix="% /mo"
              />

              {/* Payment Days */}
              <SelectInput
                label="Average Payment Time"
                value={paymentDays}
                onChange={(val) => {
                  triggerPopup();
                  setPaymentDays(parseInt(val));
                }}
                options={INVOICE_FINANCE_CONFIG.paymentDays.options}
                icon={Clock}
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">
                  {mode === "facility" ? "About Invoice Facilities" : "How it works"}
                </p>
                <p className="text-blue-700">
                  {mode === "facility"
                    ? `With a ${formatCurrency(results?.facility?.facilityLimit || 0)} facility, you can fund multiple invoices each month. We advance ${advanceRate}% immediately, with the reserve released when customers pay.`
                    : `We advance ${advanceRate}% of your invoice value immediately. The remaining ${100 - advanceRate}% is held in reserve and released when your customer pays.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {results && (
            <>
              {/* Primary Result */}
              {mode === "facility" ? (
                <ResultHighlight
                  label="Monthly Cash Released"
                  value={results.facility.monthlyNetReceived}
                  format="currency"
                  description={`From ${results.facility.invoicesPerMonth} invoices totalling ${formatCurrency(results.facility.monthlyTurnover)}`}
                />
              ) : (
                <ResultHighlight
                  label="Amount You Receive Now"
                  value={results.netReceived}
                  format="currency"
                  description="After fees are deducted from advance"
                />
              )}

              {/* Facility Summary (only in facility mode) */}
              {mode === "facility" && (
                <Card className="bg-gradient-to-br from-[#ff6b35]/10 to-[#ffd93d]/10 border-[#ff6b35]/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-gray-700 flex items-center gap-2">
                      <Layers className="h-4 w-4 text-[#ff6b35]" />
                      Facility Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Suggested Facility Size</p>
                        <p className="text-lg font-bold text-[#ff6b35]">
                          {formatCurrency(results.facility.facilityLimit)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Monthly Fees</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(results.facility.monthlyFees)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Annual Fees (Est.)</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(results.facility.annualFees)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Per Invoice Cost</p>
                        <p className="text-lg font-bold text-gray-900">
                          {results.costPerInvoice.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Per-Invoice Breakdown */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-gray-700">
                    {mode === "facility" ? "Per Invoice (Average)" : "Invoice Breakdown"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ResultsGrid columns={2}>
                    <ResultCard
                      label={mode === "facility" ? "Avg Invoice Value" : "Invoice Value"}
                      value={results.invoiceValue}
                      format="currency"
                      size="md"
                      variant="default"
                    />
                    <ResultCard
                      label="Advance"
                      value={results.advanceAmount}
                      format="currency"
                      size="md"
                      variant="default"
                    />
                  </ResultsGrid>
                </CardContent>
              </Card>

              {/* Fee Breakdown */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-gray-700">
                    Fee Breakdown {mode === "facility" ? "(Per Invoice)" : ""}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <FeeBreakdown
                    items={[
                      {
                        label: "Service Fee",
                        value: results.serviceFee,
                        color: "#f97316",
                      },
                      {
                        label: `Discount Fee (${paymentDays} days)`,
                        value: results.discountFee,
                        color: "#ef4444",
                      },
                    ]}
                    total={{
                      label: "Total Fees",
                      value: results.totalFees,
                    }}
                  />

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Effective Annual Cost
                    </span>
                    <span className="font-semibold text-amber-600">
                      {results.effectiveAnnualCost.toFixed(1)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-gray-700">
                    {mode === "facility" ? "Average Invoice Breakdown" : "Invoice Breakdown"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={results.breakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="label"
                        >
                          {results.breakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => formatCurrencyPrecise(Number(value) || 0)}
                        />
                        <Legend
                          formatter={(value, entry) => {
                            const payload = entry.payload as { percentage?: number } | undefined;
                            return (
                              <span className="text-sm">
                                {value}{" "}
                                <span className="text-gray-400">
                                  ({payload?.percentage?.toFixed(1) ?? 0}%)
                                </span>
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
                    {mode === "facility"
                      ? `For monthly turnover of ${formatCurrency(results.facility.monthlyTurnover)} across ${results.facility.invoicesPerMonth} invoices, you could receive ${formatCurrency(results.facility.monthlyNetReceived)} per month. Total monthly fees of ${formatCurrencyPrecise(results.facility.monthlyFees)} apply.`
                      : `For an invoice of ${formatCurrency(results.invoiceValue)}, you could receive ${formatCurrency(results.netReceived)} immediately. Total fees of ${formatCurrencyPrecise(results.totalFees)} apply based on a ${paymentDays}-day payment period.`}
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
                          Get Your Invoice Finance Quote
                        </p>
                        <p className="text-sm text-gray-300 mb-4">
                          {mode === "facility"
                            ? `Facility up to ${formatCurrency(results.facility.facilityLimit)}`
                            : `Release ${formatCurrency(results.netReceived)} from your invoice`}
                        </p>
                        <button
                          onClick={handleApplyNow}
                          className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold text-lg py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          Apply Now
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">
                          Or call us free on
                        </p>
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
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>No Fees</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Fast Decision</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
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
        calculatorType="invoice-finance"
        title="Unlock Your Invoice Finance Results"
        subtitle="Enter your details to save your calculation and receive a personalised quote"
      />

      {/* Application Flow */}
      <InvoiceFinanceApplicationFlow
        isOpen={showApplicationFlow}
        onClose={() => setShowApplicationFlow(false)}
        calculatorData={results ? { inputs, results } : null}
      />
    </div>
  );
}

export default InvoiceCalculator;
