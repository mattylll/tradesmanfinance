"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Building2,
  User,
  Phone,
  Mail,
  Briefcase,
  Calendar,
  PoundSterling,
  FileText,
  Loader2,
} from "lucide-react";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Label } from "@/registry/new-york-v4/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select";
import { Textarea } from "@/registry/new-york-v4/ui/textarea";
import { formatCurrency } from "@/lib/calculator";
import type { InvoiceFinanceInputs, InvoiceFinanceResult } from "@/lib/calculators/invoice-finance";

interface InvoiceFinanceApplicationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorData: {
    inputs: InvoiceFinanceInputs;
    results: InvoiceFinanceResult;
  } | null;
}

interface FormData {
  // Step 1: Business Details
  businessName: string;
  tradingYears: string;
  industry: string;
  annualTurnover: string;
  // Step 2: Contact Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Step 3: Additional Info
  preferredContact: string;
  bestTimeToCall: string;
  additionalInfo: string;
}

const INITIAL_FORM_DATA: FormData = {
  businessName: "",
  tradingYears: "",
  industry: "",
  annualTurnover: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: "phone",
  bestTimeToCall: "morning",
  additionalInfo: "",
};

const INDUSTRIES = [
  "Electrical",
  "Plumbing & Heating",
  "Building & Construction",
  "Carpentry & Joinery",
  "Roofing",
  "Landscaping",
  "Flooring",
  "Painting & Decorating",
  "HVAC",
  "Other Trade",
];

const TRADING_YEARS = [
  { value: "0-1", label: "Less than 1 year" },
  { value: "1-2", label: "1-2 years" },
  { value: "2-5", label: "2-5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10+", label: "10+ years" },
];

const ANNUAL_TURNOVER = [
  { value: "0-50k", label: "Under £50,000" },
  { value: "50k-100k", label: "£50,000 - £100,000" },
  { value: "100k-250k", label: "£100,000 - £250,000" },
  { value: "250k-500k", label: "£250,000 - £500,000" },
  { value: "500k-1m", label: "£500,000 - £1 million" },
  { value: "1m+", label: "Over £1 million" },
];

const BEST_TIMES = [
  { value: "morning", label: "Morning (9am - 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm - 5pm)" },
  { value: "evening", label: "Evening (5pm - 7pm)" },
  { value: "anytime", label: "Any time" },
];

export function InvoiceFinanceApplicationFlow({
  isOpen,
  onClose,
  calculatorData,
}: InvoiceFinanceApplicationFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 3;

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      setIsSuccess(false);
    }
  }, [isOpen]);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.businessName.trim()) {
        newErrors.businessName = "Business name is required";
      }
      if (!formData.tradingYears) {
        newErrors.tradingYears = "Please select trading years";
      }
      if (!formData.industry) {
        newErrors.industry = "Please select your industry";
      }
    }

    if (step === 2) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else {
        const cleanPhone = formData.phone.replace(/\s+/g, "");
        if (!/^(?:(?:\+44)|(?:0))(?:\d{10}|\d{9})$/.test(cleanPhone)) {
          newErrors.phone = "Please enter a valid UK phone number";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    // Prepare application data
    const applicationData = {
      ...formData,
      calculator: calculatorData
        ? {
            mode: calculatorData.inputs.mode,
            monthlyTurnover: calculatorData.inputs.monthlyTurnover,
            invoicesPerMonth: calculatorData.inputs.invoicesPerMonth,
            invoiceValue: calculatorData.inputs.invoiceValue,
            advanceRate: calculatorData.inputs.advanceRate,
            paymentDays: calculatorData.inputs.paymentDays,
            facilityLimit: calculatorData.results.facility.facilityLimit,
            monthlyAdvance: calculatorData.results.facility.monthlyNetReceived,
          }
        : null,
      submittedAt: new Date().toISOString(),
    };

    // TODO: Replace with actual API call
    console.log("Application submitted:", applicationData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store in localStorage for now
    try {
      const existingApplications = JSON.parse(
        localStorage.getItem("tradesman-applications") || "[]"
      );
      existingApplications.push(applicationData);
      localStorage.setItem(
        "tradesman-applications",
        JSON.stringify(existingApplications)
      );
    } catch (e) {
      console.error("Failed to save application", e);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              step < currentStep
                ? "bg-green-500 text-white"
                : step === currentStep
                ? "bg-[#ff6b35] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step < currentStep ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              step
            )}
          </div>
          {step < 3 && (
            <div
              className={`w-12 h-1 mx-1 ${
                step < currentStep ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderQuoteSummary = () => {
    if (!calculatorData) return null;

    const { inputs, results } = calculatorData;

    return (
      <div className="bg-gradient-to-br from-[#ff6b35]/10 to-[#ffd93d]/10 border border-[#ff6b35]/20 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#ff6b35]" />
          Your Quote Summary
        </h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {inputs.mode === "facility" ? (
            <>
              <div>
                <p className="text-gray-500">Monthly Turnover</p>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(inputs.monthlyTurnover)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Facility Size</p>
                <p className="font-semibold text-[#ff6b35]">
                  {formatCurrency(results.facility.facilityLimit)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Monthly Advance</p>
                <p className="font-semibold text-green-600">
                  {formatCurrency(results.facility.monthlyNetReceived)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Invoices/Month</p>
                <p className="font-semibold text-gray-900">
                  {inputs.invoicesPerMonth}
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-gray-500">Invoice Value</p>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(inputs.invoiceValue)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">You Receive</p>
                <p className="font-semibold text-green-600">
                  {formatCurrency(results.netReceived)}
                </p>
              </div>
            </>
          )}
          <div>
            <p className="text-gray-500">Advance Rate</p>
            <p className="font-semibold text-gray-900">{inputs.advanceRate}%</p>
          </div>
          <div>
            <p className="text-gray-500">Payment Terms</p>
            <p className="font-semibold text-gray-900">{inputs.paymentDays} days</p>
          </div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Business Details</h3>
        <p className="text-sm text-gray-500">Tell us about your business</p>
      </div>

      {renderQuoteSummary()}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name *</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="businessName"
              placeholder="Your business name"
              value={formData.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
              className={`pl-10 ${errors.businessName ? "border-red-500" : ""}`}
            />
          </div>
          {errors.businessName && (
            <p className="text-red-500 text-sm">{errors.businessName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Industry *</Label>
          <Select
            value={formData.industry}
            onValueChange={(value) => updateField("industry", value)}
          >
            <SelectTrigger className={errors.industry ? "border-red-500" : ""}>
              <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
              <SelectValue placeholder="Select your trade" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-red-500 text-sm">{errors.industry}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Years Trading *</Label>
            <Select
              value={formData.tradingYears}
              onValueChange={(value) => updateField("tradingYears", value)}
            >
              <SelectTrigger className={errors.tradingYears ? "border-red-500" : ""}>
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {TRADING_YEARS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.tradingYears && (
              <p className="text-red-500 text-sm">{errors.tradingYears}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Annual Turnover</Label>
            <Select
              value={formData.annualTurnover}
              onValueChange={(value) => updateField("annualTurnover", value)}
            >
              <SelectTrigger>
                <PoundSterling className="h-4 w-4 text-gray-400 mr-2" />
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {ANNUAL_TURNOVER.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
        <p className="text-sm text-gray-500">How can we reach you?</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              placeholder="07XXX XXXXXX"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Almost There!</h3>
        <p className="text-sm text-gray-500">Any final details to help us serve you better</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Preferred Contact Method</Label>
            <Select
              value={formData.preferredContact}
              onValueChange={(value) => updateField("preferredContact", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="either">Either</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Best Time to Call</Label>
            <Select
              value={formData.bestTimeToCall}
              onValueChange={(value) => updateField("bestTimeToCall", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {BEST_TIMES.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
          <Textarea
            id="additionalInfo"
            placeholder="Tell us anything else that might help us prepare your quote..."
            value={formData.additionalInfo}
            onChange={(e) => updateField("additionalInfo", e.target.value)}
            rows={3}
          />
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Application Summary</h4>
          <div className="text-sm space-y-1">
            <p>
              <span className="text-gray-500">Business:</span>{" "}
              <span className="font-medium">{formData.businessName}</span>
            </p>
            <p>
              <span className="text-gray-500">Contact:</span>{" "}
              <span className="font-medium">
                {formData.firstName} {formData.lastName}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Email:</span>{" "}
              <span className="font-medium">{formData.email}</span>
            </p>
            <p>
              <span className="text-gray-500">Phone:</span>{" "}
              <span className="font-medium">{formData.phone}</span>
            </p>
            {calculatorData && (
              <p>
                <span className="text-gray-500">
                  {calculatorData.inputs.mode === "facility" ? "Facility:" : "Invoice:"}
                </span>{" "}
                <span className="font-medium text-[#ff6b35]">
                  {calculatorData.inputs.mode === "facility"
                    ? formatCurrency(calculatorData.results.facility.facilityLimit)
                    : formatCurrency(calculatorData.inputs.invoiceValue)}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Application Submitted!
      </h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        Thank you {formData.firstName}! Our team will review your application and contact you within 24 hours.
      </p>
      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left max-w-sm mx-auto">
        <p className="text-sm text-gray-500 mb-1">Your reference number:</p>
        <p className="font-mono font-bold text-[#ff6b35]">
          TF-{Date.now().toString(36).toUpperCase()}
        </p>
      </div>
      <Button
        onClick={onClose}
        className="bg-[#ff6b35] hover:bg-[#e55a2b]"
      >
        Close
      </Button>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                <h2 className="text-xl font-bold text-white mb-1">
                  Invoice Finance Application
                </h2>
                <p className="text-gray-300 text-sm">
                  Complete your application in 3 simple steps
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {isSuccess ? (
                  renderSuccess()
                ) : (
                  <>
                    {renderStepIndicator()}

                    <AnimatePresence mode="wait">
                      {currentStep === 1 && renderStep1()}
                      {currentStep === 2 && renderStep2()}
                      {currentStep === 3 && renderStep3()}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-between mt-6 pt-4 border-t">
                      {currentStep > 1 ? (
                        <Button
                          variant="outline"
                          onClick={handleBack}
                          disabled={isSubmitting}
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>
                      ) : (
                        <div />
                      )}

                      {currentStep < totalSteps ? (
                        <Button
                          onClick={handleNext}
                          className="bg-[#ff6b35] hover:bg-[#e55a2b]"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Application
                              <CheckCircle className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
