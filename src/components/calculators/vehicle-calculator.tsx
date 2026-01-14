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
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Switch } from "@/registry/new-york-v4/ui/switch";
import {
  Truck,
  Percent,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  PoundSterling,
  ArrowRight,
  TrendingUp,
  Star,
  Gauge,
  Wrench,
  Receipt,
} from "lucide-react";
import {
  calculateVehicleFinance,
  VEHICLE_FINANCE_CONFIG,
  saveVehicleFinanceData,
  loadVehicleFinanceData,
  type VehicleFinanceInputs,
  type VehicleFinanceResult,
  type VehicleType,
  type MileageBand,
  type FinanceOption,
} from "@/lib/calculators/vehicle-finance";
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

interface VehicleCalculatorProps {
  className?: string;
  compact?: boolean;
  showCTA?: boolean;
}

const vehicleTypeOptions = VEHICLE_FINANCE_CONFIG.vehicleType.options.map((opt) => ({
  value: opt.value,
  label: opt.label,
}));

const mileageOptions = VEHICLE_FINANCE_CONFIG.annualMileage.options.map((opt) => ({
  value: opt.value,
  label: opt.label,
}));

const termOptions = VEHICLE_FINANCE_CONFIG.termMonths.options.map((opt) => ({
  value: String(opt.value),
  label: opt.label,
}));

// Colors for the finance options
const OPTION_COLORS = {
  hp: "#0ea5a5",
  lease: "#8b5cf6",
  contract: "#f59e0b",
};

export function VehicleCalculator({
  className = "",
  compact = false,
  showCTA = true,
}: VehicleCalculatorProps) {
  // Input state
  const [vehicleType, setVehicleType] = useState<VehicleType>(
    VEHICLE_FINANCE_CONFIG.vehicleType.default
  );
  const [vehicleValue, setVehicleValue] = useState<number>(
    VEHICLE_FINANCE_CONFIG.vehicleValue.default
  );
  const [depositPercent, setDepositPercent] = useState<number>(
    VEHICLE_FINANCE_CONFIG.depositPercent.default
  );
  const [termMonths, setTermMonths] = useState<number>(
    VEHICLE_FINANCE_CONFIG.termMonths.default
  );
  const [annualMileage, setAnnualMileage] = useState<MileageBand>(
    VEHICLE_FINANCE_CONFIG.annualMileage.default
  );
  const [vatRegistered, setVatRegistered] = useState<boolean>(true);

  // Results
  const [results, setResults] = useState<VehicleFinanceResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lead capture popup
  const { isOpen: isPopupOpen, triggerPopup, closePopup } = useLeadCapturePopup();

  // Wrapper to trigger popup on slider interaction
  const handleSliderChange = <T,>(setter: (value: T) => void) => (value: T) => {
    triggerPopup();
    setter(value);
  };

  // Create inputs object
  const inputs: VehicleFinanceInputs = useMemo(
    () => ({
      vehicleType,
      vehicleValue,
      depositPercent,
      termMonths,
      annualMileage,
      vatRegistered,
    }),
    [vehicleType, vehicleValue, depositPercent, termMonths, annualMileage, vatRegistered]
  );

  // Calculate results
  const calculate = useCallback(() => {
    const result = calculateVehicleFinance(inputs);
    setResults(result);
    saveVehicleFinanceData({ inputs, results: result });
    return result;
  }, [inputs]);

  // Load from storage on mount
  useEffect(() => {
    const stored = loadVehicleFinanceData();
    if (stored) {
      setVehicleType(stored.inputs.vehicleType);
      setVehicleValue(stored.inputs.vehicleValue);
      setDepositPercent(stored.inputs.depositPercent);
      setTermMonths(stored.inputs.termMonths);
      setAnnualMileage(stored.inputs.annualMileage);
      setVatRegistered(stored.inputs.vatRegistered);
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

  // Chart data for bar comparison
  const chartData = useMemo(() => {
    if (!results) return [];
    return [
      {
        name: "Monthly",
        "Hire Purchase": results.hp.monthlyPayment,
        "Finance Lease": results.lease.monthlyPayment,
        "Contract Hire": results.contract.monthlyPayment,
      },
    ];
  }, [results]);

  // Total cost comparison data
  const totalCostData = useMemo(() => {
    if (!results) return [];
    return [
      {
        name: "Total Cost",
        "Hire Purchase": results.hp.totalPayable,
        "Finance Lease": results.lease.totalPayable,
        "Contract Hire": results.contract.totalPayable,
      },
    ];
  }, [results]);

  // Compact version
  if (compact) {
    return (
      <Card className={`border-[#0ea5a5]/20 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#0ea5a5]" />
              <span className="font-semibold text-sm">Vehicle Finance</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Compare Options
            </Badge>
          </div>

          <div className="space-y-3">
            <CurrencySliderInput
              label="Vehicle Value"
              value={vehicleValue}
              onChange={setVehicleValue}
              min={VEHICLE_FINANCE_CONFIG.vehicleValue.min}
              max={VEHICLE_FINANCE_CONFIG.vehicleValue.max}
              step={VEHICLE_FINANCE_CONFIG.vehicleValue.step}
              showInput={false}
            />

            {results && (
              <div className="pt-2 border-t">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">HP</span>
                    <span className="font-semibold text-[#0ea5a5]">
                      {formatCurrency(results.hp.monthlyPayment)}/mo
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Lease</span>
                    <span className="font-semibold text-purple-600">
                      {formatCurrency(results.lease.monthlyPayment)}/mo
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Contract</span>
                    <span className="font-semibold text-amber-600">
                      {formatCurrency(results.contract.monthlyPayment)}/mo
                    </span>
                  </div>
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
              <Truck className="h-5 w-5 text-[#0ea5a5]" />
              Vehicle Finance Comparison
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Vehicle Type */}
            <SelectInput
              label="Vehicle Type"
              value={vehicleType}
              onChange={(val) => {
                triggerPopup();
                setVehicleType(val as VehicleType);
              }}
              options={vehicleTypeOptions}
              icon={Truck}
            />

            {/* Vehicle Value */}
            <CurrencySliderInput
              label="Vehicle Value"
              value={vehicleValue}
              onChange={handleSliderChange(setVehicleValue)}
              min={VEHICLE_FINANCE_CONFIG.vehicleValue.min}
              max={VEHICLE_FINANCE_CONFIG.vehicleValue.max}
              step={VEHICLE_FINANCE_CONFIG.vehicleValue.step}
              icon={PoundSterling}
            />

            {/* Deposit */}
            <PercentageSliderInput
              label="Deposit"
              value={depositPercent}
              onChange={handleSliderChange(setDepositPercent)}
              min={VEHICLE_FINANCE_CONFIG.depositPercent.min}
              max={VEHICLE_FINANCE_CONFIG.depositPercent.max}
              step={VEHICLE_FINANCE_CONFIG.depositPercent.step}
              icon={Percent}
            />
            {results && (
              <p className="text-xs text-gray-500 -mt-4">
                Deposit amount: {formatCurrency(results.depositAmount)}
              </p>
            )}

            {/* Term Selection */}
            <SelectInput
              label="Agreement Term"
              value={String(termMonths)}
              onChange={(val) => {
                triggerPopup();
                setTermMonths(parseInt(val));
              }}
              options={termOptions}
              icon={Calendar}
            />

            {/* Annual Mileage */}
            <SelectInput
              label="Annual Mileage"
              value={annualMileage}
              onChange={(val) => {
                triggerPopup();
                setAnnualMileage(val as MileageBand);
              }}
              options={mileageOptions}
              icon={Gauge}
            />

            {/* VAT Registered Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-[#0ea5a5]" />
                <span className="text-sm font-medium text-gray-700">VAT Registered?</span>
              </div>
              <Switch
                checked={vatRegistered}
                onCheckedChange={(checked) => {
                  triggerPopup();
                  setVatRegistered(checked);
                }}
              />
            </div>

            {/* VAT Info */}
            {vatRegistered && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
                <p className="font-medium">VAT Recovery:</p>
                <ul className="mt-1 space-y-0.5 text-blue-700">
                  <li>• HP: 100% VAT on payments</li>
                  <li>• Lease/Contract: 50% VAT on rentals</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column - Results (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {results && (
            <>
              {/* Recommendation Banner */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3] text-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Recommended: {results[results.recommendation].name}
                    </h3>
                    <p className="text-white/90 text-sm">{results.recommendationReason}</p>
                  </div>
                </div>
              </motion.div>

              {/* Three Option Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* HP Card */}
                <FinanceOptionCard
                  option={results.hp}
                  isRecommended={results.recommendation === "hp"}
                  color={OPTION_COLORS.hp}
                />

                {/* Lease Card */}
                <FinanceOptionCard
                  option={results.lease}
                  isRecommended={results.recommendation === "lease"}
                  color={OPTION_COLORS.lease}
                />

                {/* Contract Card */}
                <FinanceOptionCard
                  option={results.contract}
                  isRecommended={results.recommendation === "contract"}
                  color={OPTION_COLORS.contract}
                />
              </div>

              {/* Monthly Comparison Chart */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-gray-700 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#0ea5a5]" />
                    Monthly Payment Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Hire Purchase", value: results.hp.monthlyPayment, fill: OPTION_COLORS.hp },
                          { name: "Finance Lease", value: results.lease.monthlyPayment, fill: OPTION_COLORS.lease },
                          { name: "Contract Hire", value: results.contract.monthlyPayment, fill: OPTION_COLORS.contract },
                        ]}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis
                          type="number"
                          tickFormatter={(value) => formatCurrency(value)}
                        />
                        <YAxis type="category" dataKey="name" width={90} />
                        <Tooltip
                          formatter={(value) => formatCurrencyPrecise(Number(value))}
                          labelStyle={{ fontWeight: "bold" }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Comparison Table */}
              <Card className="bg-white shadow-lg overflow-hidden">
                <CardHeader className="bg-gray-50 border-b pb-3">
                  <CardTitle className="text-base text-gray-700">
                    Feature Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-gray-600 font-medium">Feature</th>
                          <th className="px-4 py-3 text-center font-medium" style={{ color: OPTION_COLORS.hp }}>
                            Hire Purchase
                          </th>
                          <th className="px-4 py-3 text-center font-medium" style={{ color: OPTION_COLORS.lease }}>
                            Finance Lease
                          </th>
                          <th className="px-4 py-3 text-center font-medium" style={{ color: OPTION_COLORS.contract }}>
                            Contract Hire
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {results.comparisonData.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-4 py-3 font-medium text-gray-700">{row.metric}</td>
                            <td className="px-4 py-3 text-center">
                              {typeof row.hp === "number" ? formatCurrency(row.hp) : row.hp}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {typeof row.lease === "number" ? formatCurrency(row.lease) : row.lease}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {typeof row.contract === "number" ? formatCurrency(row.contract) : row.contract}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Representative Comparison</p>
                  <p className="text-amber-700">
                    {vehicleType === "van" ? "Van" : vehicleType === "pickup" ? "Pickup" : "Truck"} valued at{" "}
                    {formatCurrency(vehicleValue)} with {depositPercent}% deposit over {termMonths} months.
                    Rates and terms are indicative. Your actual quote may vary based on credit profile and vehicle.
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
                          Get Your {vehicleType === "van" ? "Van" : vehicleType === "pickup" ? "Pickup" : "Truck"} Finance Quote
                        </p>
                        <p className="text-sm text-gray-300 mb-4">
                          {formatCurrency(vehicleValue)} vehicle • Compare all options
                        </p>
                        <a
                          href={`/contact?product=vehicle-finance&amount=${vehicleValue}&term=${termMonths}&type=${vehicleType}`}
                          className="block w-full bg-[#0ea5a5] hover:bg-[#0d9494] text-white font-semibold text-lg py-4 rounded-lg transition-colors text-center"
                        >
                          Compare Quotes
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
                          <span>All Options</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Fast Decisions</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Expert Advice</span>
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
        calculatorType="vehicle-finance"
        title="Unlock Your Vehicle Finance Comparison"
        subtitle="Enter your details to save your calculation and receive personalised quotes"
      />
    </div>
  );
}

// Finance Option Card Component
function FinanceOptionCard({
  option,
  isRecommended,
  color,
}: {
  option: VehicleFinanceResult["hp"];
  isRecommended: boolean;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`h-full transition-all ${
          isRecommended
            ? "ring-2 ring-offset-2 shadow-lg"
            : "hover:shadow-md"
        }`}
        style={{
          borderColor: isRecommended ? color : undefined,
        }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold" style={{ color }}>
              {option.name}
            </CardTitle>
            {isRecommended && (
              <Badge className="bg-green-500 text-white text-xs">Best</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Monthly Payment */}
          <div>
            <p className="text-xs text-gray-500">Monthly Payment</p>
            <p className="text-2xl font-bold" style={{ color }}>
              {formatCurrency(option.monthlyPayment)}
            </p>
          </div>

          {/* Total */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Payable</span>
            <span className="font-semibold">{formatCurrency(option.totalPayable)}</span>
          </div>

          {/* Key Feature */}
          <div className="flex items-center gap-2 text-sm">
            {option.ownAtEnd ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-700">Own at End</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Return Vehicle</span>
              </>
            )}
          </div>

          {/* VAT Recovery */}
          <div className="text-xs text-gray-600">
            <span className="font-medium">VAT:</span> {option.vatRecovery}
          </div>

          {/* Maintenance */}
          <div className="text-xs text-gray-600">
            <span className="font-medium">Maintenance:</span> {option.maintenance}
          </div>

          {/* Best For */}
          <div className="pt-2 border-t text-xs">
            <span className="text-gray-500">Best for: </span>
            <span className="font-medium text-gray-700">{option.bestFor}</span>
          </div>

          {/* Pros */}
          <div className="pt-2">
            <p className="text-xs font-medium text-gray-500 mb-1">Pros:</p>
            <ul className="space-y-0.5">
              {option.pros.slice(0, 2).map((pro, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default VehicleCalculator;
