"use client";

import { useCallback, useEffect, useState } from "react";
import {
  calculateLoan,
  formatCurrency,
  formatCurrencyPrecise,
  formatPercentage,
  CALCULATOR_CONFIG,
  saveCalculatorData,
  loadCalculatorData,
  type LoanCalculation,
} from "@/lib/calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Slider } from "@/registry/new-york-v4/ui/slider";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Label } from "@/registry/new-york-v4/ui/label";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Calculator, PoundSterling, Clock, Percent, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

interface LoanCalculatorProps {
  className?: string;
  tradeType?: string;
  location?: {
    county: string;
    town: string;
  };
  compact?: boolean;
  showCTA?: boolean;
}

export function LoanCalculator({
  className = "",
  tradeType,
  location,
  compact = false,
  showCTA = true,
}: LoanCalculatorProps) {
  // Calculator state
  const [amount, setAmount] = useState<number>(CALCULATOR_CONFIG.amount.default);
  const [term, setTerm] = useState<number>(CALCULATOR_CONFIG.term.default);
  const [rate, setRate] = useState<number>(CALCULATOR_CONFIG.rate.default);
  const [results, setResults] = useState<LoanCalculation | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate results when inputs change
  const calculate = useCallback(() => {
    const calculation = calculateLoan(amount, term, rate);
    setResults(calculation);

    // Save to session storage
    saveCalculatorData({ amount, term, rate, results: calculation });

    return calculation;
  }, [amount, term, rate]);

  // Initial calculation and load from storage
  useEffect(() => {
    const stored = loadCalculatorData();
    if (stored) {
      setAmount(stored.amount);
      setTerm(stored.term);
      setRate(stored.rate);
      setResults(stored.results);
    } else {
      calculate();
    }
  }, []);

  // Recalculate on input changes
  useEffect(() => {
    const calculation = calculate();

    // Animate the results
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [amount, term, rate, calculate]);

  // Handle amount input change
  const handleAmountChange = (value: number) => {
    const clamped = Math.max(
      CALCULATOR_CONFIG.amount.min,
      Math.min(CALCULATOR_CONFIG.amount.max, value)
    );
    setAmount(clamped);
  };

  // Handle term input change
  const handleTermChange = (value: number) => {
    const clamped = Math.max(
      CALCULATOR_CONFIG.term.min,
      Math.min(CALCULATOR_CONFIG.term.max, value)
    );
    setTerm(clamped);
  };

  // Handle rate input change
  const handleRateChange = (value: number) => {
    const clamped = Math.max(
      CALCULATOR_CONFIG.rate.min,
      Math.min(CALCULATOR_CONFIG.rate.max, value)
    );
    setRate(Math.round(clamped * 10) / 10);
  };

  // Save quote to database
  const handleSaveQuote = async () => {
    if (!results) return;

    try {
      // Log quote data for now - will connect to Convex when configured
      const quoteData = {
        loanAmount: amount,
        termMonths: term,
        interestRate: rate,
        monthlyPayment: results.monthlyPayment,
        totalInterest: results.totalInterest,
        totalAmount: results.totalAmount,
        tradeType,
        location,
        sessionId: typeof window !== "undefined" ? window.sessionStorage.getItem("session-id") || undefined : undefined,
      };
      console.log("Quote saved:", quoteData);

      // TODO: Connect to Convex when NEXT_PUBLIC_CONVEX_URL is configured
      // await saveQuote(quoteData);
    } catch (error) {
      console.error("Failed to save quote:", error);
    }
  };

  if (compact) {
    return (
      <Card className={`border-primary/20 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">Quick Quote</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {formatPercentage(rate)} APR
            </Badge>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Loan Amount</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[amount]}
                  onValueChange={([val]) => handleAmountChange(val)}
                  min={CALCULATOR_CONFIG.amount.min}
                  max={CALCULATOR_CONFIG.amount.max}
                  step={CALCULATOR_CONFIG.amount.step}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-20 text-right">
                  {formatCurrency(amount)}
                </span>
              </div>
            </div>

            {results && (
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Payment</span>
                  <span className={`text-lg font-bold text-primary transition-transform ${isAnimating ? "scale-110" : ""}`}>
                    {formatCurrencyPrecise(results.monthlyPayment)}
                  </span>
                </div>
              </div>
            )}

            {showCTA && (
              <Button asChild className="w-full mt-2" size="sm">
                <Link href="/contact">
                  Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Finance Calculator
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Controls */}
          <div className="space-y-6">
            {/* Loan Amount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <PoundSterling className="h-4 w-4 text-muted-foreground" />
                  Loan Amount
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(amount)}
                  </span>
                </div>
              </div>
              <Slider
                value={[amount]}
                onValueChange={([val]) => handleAmountChange(val)}
                min={CALCULATOR_CONFIG.amount.min}
                max={CALCULATOR_CONFIG.amount.max}
                step={CALCULATOR_CONFIG.amount.step}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(CALCULATOR_CONFIG.amount.min)}</span>
                <span>{formatCurrency(CALCULATOR_CONFIG.amount.max)}</span>
              </div>
              <Input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(parseInt(e.target.value) || 0)}
                min={CALCULATOR_CONFIG.amount.min}
                max={CALCULATOR_CONFIG.amount.max}
                step={CALCULATOR_CONFIG.amount.step}
                className="text-right"
              />
            </div>

            {/* Loan Term */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Loan Term
                </Label>
                <span className="text-lg font-bold text-primary">
                  {term} months
                </span>
              </div>
              <Slider
                value={[term]}
                onValueChange={([val]) => handleTermChange(val)}
                min={CALCULATOR_CONFIG.term.min}
                max={CALCULATOR_CONFIG.term.max}
                step={CALCULATOR_CONFIG.term.step}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{CALCULATOR_CONFIG.term.min} months</span>
                <span>{CALCULATOR_CONFIG.term.max} months</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  Interest Rate (APR)
                </Label>
                <span className="text-lg font-bold text-primary">
                  {formatPercentage(rate)}
                </span>
              </div>
              <Slider
                value={[rate]}
                onValueChange={([val]) => handleRateChange(val)}
                min={CALCULATOR_CONFIG.rate.min}
                max={CALCULATOR_CONFIG.rate.max}
                step={CALCULATOR_CONFIG.rate.step}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatPercentage(CALCULATOR_CONFIG.rate.min)}</span>
                <span>{formatPercentage(CALCULATOR_CONFIG.rate.max)}</span>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="space-y-4">
            <div className="bg-primary/5 rounded-lg p-6 space-y-4">
              {/* Monthly Payment - Primary Result */}
              <div className="text-center pb-4 border-b">
                <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                <p className={`text-4xl font-bold text-primary transition-transform ${isAnimating ? "scale-105" : ""}`}>
                  {results ? formatCurrencyPrecise(results.monthlyPayment) : "—"}
                </p>
              </div>

              {/* Secondary Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                  <p className={`text-xl font-semibold transition-transform ${isAnimating ? "scale-105" : ""}`}>
                    {results ? formatCurrency(results.totalInterest) : "—"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Repayment</p>
                  <p className={`text-xl font-semibold transition-transform ${isAnimating ? "scale-105" : ""}`}>
                    {results ? formatCurrency(results.totalAmount) : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center gap-1 p-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-xs text-muted-foreground">No Fees</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-xs text-muted-foreground">Fast Decision</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-xs text-muted-foreground">92% Approved</span>
              </div>
            </div>

            {/* CTA */}
            {showCTA && (
              <div className="space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/contact" onClick={handleSaveQuote}>
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Representative APR {formatPercentage(rate)}. Rates from {formatPercentage(CALCULATOR_CONFIG.rate.min)}.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoanCalculator;
