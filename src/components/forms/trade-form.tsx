"use client";

import { useTradeForm } from "@/hooks/use-trade-form";
import { getTradeFormConfig, type FormData } from "@/lib/form-configs";
import { loadCalculatorData } from "@/lib/calculator";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Progress } from "@/registry/new-york-v4/ui/progress";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Textarea } from "@/registry/new-york-v4/ui/textarea";
import { Slider } from "@/registry/new-york-v4/ui/slider";
import { Label } from "@/registry/new-york-v4/ui/label";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Loader2,
  CheckCircle,
  Send,
} from "lucide-react";
import { cn } from "@/registry/new-york-v4/lib/utils";
import { submitToWebhook, getUTMParams, getPageUrl } from "@/lib/webhook";

interface TradeFormProps {
  tradeId: string;
  tradeName: string;
  location?: {
    county: string;
    town: string;
  };
  className?: string;
}

export function TradeForm({ tradeId, tradeName, location, className }: TradeFormProps) {
  const config = getTradeFormConfig(tradeId, tradeName);

  const handleComplete = async (data: FormData) => {
    // Get calculator data if available
    const calculatorData = loadCalculatorData();

    // Build location string
    const locationStr = location ? `${location.town}, ${location.county}` : undefined;

    // Submit to webhook
    const result = await submitToWebhook({
      name: data.name as string,
      email: data.email as string,
      phone: data.phone as string,
      formType: 'trade-enquiry',
      tradeType: tradeName,
      amount: (data.loanAmount as number) || calculatorData?.amount || 25000,
      financeType: (data.purpose as string) || 'equipment',
      urgency: (data.urgency as string) || 'this-month',
      location: locationStr,
      message: `Years Trading: ${data.yearsTrading || 'Not specified'}, Certifications: ${(data.certifications as string[])?.join(', ') || 'None specified'}, Credit: ${data.creditScore || 'Not specified'}`,
      pageUrl: getPageUrl(),
      ...getUTMParams(),
      submittedAt: new Date().toISOString(),
    });

    if (!result.success) {
      throw new Error(result.error || 'Submission failed');
    }
  };

  const {
    state,
    currentStepConfig,
    progress,
    canGoBack,
    goToNextStep,
    goToPreviousStep,
    setValue,
    getValue,
    submitForm,
  } = useTradeForm({ config, onComplete: handleComplete });

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Render the current step
  const renderStep = () => {
    const step = currentStepConfig;
    const value = getValue(step.id);
    const error = state.errors[step.id];

    switch (step.type) {
      case "welcome":
        return (
          <div className="text-center space-y-6 py-8">
            <div className="text-6xl mb-4">{config.tradeIcon}</div>
            <h2 className="text-2xl font-bold">
              Get Your {tradeName} Finance Quote
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Answer a few quick questions and we'll find the best finance options for your business.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Takes about {config.estimatedTime} minutes</span>
            </div>
            <Button onClick={goToNextStep} size="lg" className="mt-4">
              Let's Start <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case "text":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={step.id} className="text-lg font-semibold">
                {step.question}
              </Label>
              {step.subtitle && (
                <p className="text-sm text-muted-foreground">{step.subtitle}</p>
              )}
            </div>
            <Input
              id={step.id}
              type="text"
              placeholder={step.placeholder}
              value={(value as string) || ""}
              onChange={(e) => setValue(step.id, e.target.value)}
              className={cn("text-lg py-6", error && "border-destructive")}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "email":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={step.id} className="text-lg font-semibold">
                {step.question}
              </Label>
              {step.subtitle && (
                <p className="text-sm text-muted-foreground">{step.subtitle}</p>
              )}
            </div>
            <Input
              id={step.id}
              type="email"
              placeholder={step.placeholder}
              value={(value as string) || ""}
              onChange={(e) => setValue(step.id, e.target.value)}
              className={cn("text-lg py-6", error && "border-destructive")}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "phone":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={step.id} className="text-lg font-semibold">
                {step.question}
              </Label>
              {step.subtitle && (
                <p className="text-sm text-muted-foreground">{step.subtitle}</p>
              )}
            </div>
            <Input
              id={step.id}
              type="tel"
              placeholder={step.placeholder}
              value={(value as string) || ""}
              onChange={(e) => setValue(step.id, e.target.value)}
              className={cn("text-lg py-6", error && "border-destructive")}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "select-cards":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-lg font-semibold">{step.question}</Label>
              {step.subtitle && (
                <p className="text-sm text-muted-foreground">{step.subtitle}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {step.options?.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setValue(step.id, option.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                    value === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                  <span className="font-medium text-sm">{option.label}</span>
                  {option.description && (
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  )}
                  {value === option.value && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "checkbox-cards":
        const selectedValues = (value as string[]) || [];
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-lg font-semibold">{step.question}</Label>
              {step.subtitle && (
                <p className="text-sm text-muted-foreground">{step.subtitle}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {step.options?.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setValue(
                          step.id,
                          selectedValues.filter((v) => v !== option.value)
                        );
                      } else {
                        setValue(step.id, [...selectedValues, option.value]);
                      }
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                    <span className="font-medium text-sm">{option.label}</span>
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </button>
                );
              })}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "slider":
        const sliderValue = (value as number) || step.min || 1000;
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-lg font-semibold">{step.question}</Label>
              {step.subtitle && (
                <p className="text-sm text-muted-foreground">{step.subtitle}</p>
              )}
            </div>
            <div className="text-center py-4">
              <span className="text-4xl font-bold text-primary">
                {step.prefix}
                {sliderValue.toLocaleString()}
                {step.suffix}
              </span>
            </div>
            <Slider
              value={[sliderValue]}
              onValueChange={([val]) => setValue(step.id, val)}
              min={step.min}
              max={step.max}
              step={step.step}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {step.prefix}
                {step.min?.toLocaleString()}
              </span>
              <span>
                {step.prefix}
                {step.max?.toLocaleString()}
              </span>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "emoji-select":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-lg font-semibold">{step.question}</Label>
              {step.subtitle && (
                <p className="text-sm text-muted-foreground">{step.subtitle}</p>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {step.options?.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setValue(step.id, option.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all min-w-[80px]",
                    value === option.value
                      ? "border-primary bg-primary/5 scale-110"
                      : "border-border hover:border-primary/50 hover:scale-105"
                  )}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              ))}
            </div>
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={step.id} className="text-lg font-semibold">
                {step.question}
              </Label>
              {step.subtitle && (
                <p className="text-sm text-muted-foreground">{step.subtitle}</p>
              )}
            </div>
            <Textarea
              id={step.id}
              placeholder={step.placeholder}
              value={(value as string) || ""}
              onChange={(e) => setValue(step.id, e.target.value)}
              className="min-h-[120px]"
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "summary":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <h2 className="text-xl font-bold">Ready to Submit!</h2>
              <p className="text-muted-foreground">
                Review your details and submit your application
              </p>
            </div>

            <div className="space-y-3 bg-muted/50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{state.data.name as string}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{state.data.phone as string}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{state.data.email as string}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">
                  {formatCurrency(state.data.loanAmount as number)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purpose</span>
                <span className="font-medium capitalize">
                  {(state.data.purpose as string)?.replace("-", " ")}
                </span>
              </div>
            </div>

            <Button
              onClick={submitForm}
              disabled={state.isSubmitting}
              size="lg"
              className="w-full"
            >
              {state.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>

            {state.errors.submit && (
              <p className="text-sm text-destructive text-center">{state.errors.submit}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Success state
  if (state.isComplete) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center space-y-6">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-bold">Application Submitted!</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Thanks {(state.data.name as string)?.split(" ")[0]}! We've received your application
            and will be in touch within 24 hours.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary">
              <Clock className="mr-1 h-3 w-3" />
              Response within 24h
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        {/* Progress */}
        {currentStepConfig.type !== "welcome" && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                Step {state.currentStep} of {config.steps.length - 1}
              </span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Step Content */}
        <div className="min-h-[300px] flex flex-col justify-center">
          {renderStep()}
        </div>

        {/* Navigation */}
        {currentStepConfig.type !== "welcome" && currentStepConfig.type !== "summary" && (
          <div className="flex justify-between mt-6 pt-4 border-t">
            <Button
              variant="ghost"
              onClick={goToPreviousStep}
              disabled={!canGoBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={goToNextStep}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TradeForm;
