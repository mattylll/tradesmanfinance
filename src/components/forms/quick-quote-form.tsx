"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/registry/new-york-v4/ui/card";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Label } from "@/registry/new-york-v4/ui/label";
import { Slider } from "@/registry/new-york-v4/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select";
import { Loader2, ArrowRight, CheckCircle, Calculator } from "lucide-react";
import { cn } from "@/registry/new-york-v4/lib/utils";
import { submitToWebhook, getUTMParams, getPageUrl, getLocationFromPath, getTradeFromPath } from "@/lib/webhook";

// Form validation schema
const quickQuoteSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone required"),
  tradeType: z.string().min(1, "Select your trade"),
  amount: z.number().min(1000).max(500000),
});

type QuickQuoteData = z.infer<typeof quickQuoteSchema>;

const TRADE_OPTIONS = [
  { value: "electrician", label: "Electrician" },
  { value: "plumber", label: "Plumber" },
  { value: "builder", label: "Builder" },
  { value: "carpenter", label: "Carpenter" },
  { value: "roofer", label: "Roofer" },
  { value: "heating-engineer", label: "Heating Engineer" },
  { value: "landscaper", label: "Landscaper" },
  { value: "tiler", label: "Tiler" },
  { value: "painter-decorator", label: "Painter & Decorator" },
  { value: "plasterer", label: "Plasterer" },
  { value: "other", label: "Other Trade" },
];

// Product type configuration for customized forms
const PRODUCT_CONFIG: Record<string, { title: string; description: string; maxAmount: number }> = {
  "equipment-finance": {
    title: "Equipment Finance Quote",
    description: "Finance tools, machinery & equipment",
    maxAmount: 500000,
  },
  "vehicle-finance": {
    title: "Vehicle Finance Quote",
    description: "Finance vans, trucks & work vehicles",
    maxAmount: 150000,
  },
  "business-loans": {
    title: "Business Loan Quote",
    description: "Flexible funding for growth",
    maxAmount: 500000,
  },
  "cashflow-finance": {
    title: "Cashflow Finance Quote",
    description: "Working capital solutions",
    maxAmount: 250000,
  },
  "invoice-finance": {
    title: "Invoice Finance Quote",
    description: "Unlock cash in unpaid invoices",
    maxAmount: 500000,
  },
  "asset-finance": {
    title: "Asset Finance Quote",
    description: "Hire purchase & leasing options",
    maxAmount: 500000,
  },
};

interface QuickQuoteFormProps {
  className?: string;
  tradeType?: string;
  location?: string;
  variant?: "default" | "compact" | "sidebar";
  productType?: keyof typeof PRODUCT_CONFIG | string;
  sourcePage?: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function QuickQuoteForm({
  className,
  tradeType,
  location,
  variant = "default",
  productType,
  sourcePage,
}: QuickQuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get product-specific configuration
  const productConfig = productType ? PRODUCT_CONFIG[productType] : null;
  const maxAmount = productConfig?.maxAmount || 250000;
  const [amount, setAmount] = useState(Math.min(25000, maxAmount));

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuickQuoteData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tradeType: tradeType || "",
      amount: 25000,
    },
  });

  const selectedTrade = watch("tradeType");

  const onSubmit = async (data: QuickQuoteData) => {
    setIsSubmitting(true);

    try {
      const result = await submitToWebhook({
        name: data.name,
        email: data.email,
        phone: data.phone,
        formType: 'quick-quote',
        amount: data.amount,
        tradeType: data.tradeType || tradeType || getTradeFromPath(),
        financeType: productType || 'general',
        location: location || getLocationFromPath(),
        pageUrl: getPageUrl(),
        ...getUTMParams(),
        submittedAt: new Date().toISOString(),
      });

      if (!result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAmountChange = (value: number[]) => {
    const newAmount = value[0];
    setAmount(newAmount);
    setValue("amount", newAmount);
  };

  if (isSuccess) {
    return (
      <Card className={cn("border-green-500/50 bg-green-50/50", className)}>
        <CardContent className="p-8 text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h3 className="text-2xl font-bold text-green-800">Quote Request Received!</h3>
          <p className="text-green-700">
            Thanks for your interest. One of our trade finance specialists will contact you within 24 hours with your personalised quote.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSuccess(false)}
            className="border-green-500 text-green-700 hover:bg-green-100"
          >
            Request Another Quote
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className={cn("border-[#ff6b35]/30", className)}>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-5 w-5 text-[#ff6b35]" />
              <span className="font-semibold">Quick Quote</span>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Amount Needed: {formatCurrency(amount)}</Label>
              <Slider
                value={[amount]}
                onValueChange={handleAmountChange}
                min={1000}
                max={maxAmount}
                step={1000}
                className="[&_[role=slider]]:bg-[#ff6b35]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              <Input
                placeholder="Phone"
                {...register("phone")}
                className={errors.phone ? "border-red-500" : ""}
              />
            </div>

            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#ff6b35] hover:bg-[#ff5722]"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("border-[#e5e7eb] bg-white rounded-2xl overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f66] text-white p-6">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calculator className="h-6 w-6" />
          {productConfig?.title || "Get Your Free Quote"}
        </CardTitle>
        <CardDescription className="text-white/90">
          {productConfig?.description || "No obligation, no credit check required"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Amount Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-[#1f2937]">How much do you need?</Label>
              <span className="text-2xl font-bold text-[#ff6b35]">
                {formatCurrency(amount)}
              </span>
            </div>
            <Slider
              value={[amount]}
              onValueChange={handleAmountChange}
              min={1000}
              max={maxAmount}
              step={1000}
              className="[&_[role=slider]]:bg-[#ff6b35] [&_[role=slider]]:border-[#ff6b35] [&_[role=slider]]:shadow-md"
            />
            <div className="flex justify-between text-xs text-[#6b7280]">
              <span>£1,000</span>
              <span>{formatCurrency(maxAmount)}</span>
            </div>
          </div>

          {/* Trade Selection */}
          {!tradeType && (
            <div className="space-y-2">
              <Label className="text-[#1f2937]">What&apos;s your trade?</Label>
              <Select
                value={selectedTrade}
                onValueChange={(value) => setValue("tradeType", value)}
              >
                <SelectTrigger className={cn("rounded-xl border-[#e5e7eb]", errors.tradeType ? "border-red-500" : "")}>
                  <SelectValue placeholder="Select your trade" />
                </SelectTrigger>
                <SelectContent>
                  {TRADE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Contact Details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#1f2937]">Full Name</Label>
              <Input
                id="name"
                placeholder="John Smith"
                {...register("name")}
                className={cn("rounded-xl border-[#e5e7eb]", errors.name ? "border-red-500" : "")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#1f2937]">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="07XXX XXXXXX"
                {...register("phone")}
                className={cn("rounded-xl border-[#e5e7eb]", errors.phone ? "border-red-500" : "")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#1f2937]">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              {...register("email")}
              className={cn("rounded-xl border-[#e5e7eb]", errors.email ? "border-red-500" : "")}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-lg py-6 rounded-xl shadow-[0_4px_14px_rgba(255,107,53,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)] hover:-translate-y-0.5 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-[#6b7280]">
            By submitting, you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-[#ff6b35]">
              Privacy Policy
            </a>
            . We&apos;ll never share your details.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default QuickQuoteForm;
