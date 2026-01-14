"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, Phone, Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Label } from "@/registry/new-york-v4/ui/label";

const STORAGE_KEY = "tradesman-lead-captured";
const DISMISSED_KEY = "tradesman-lead-popup-dismissed";

interface LeadCapturePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: LeadData) => void;
  calculatorType?: string;
  title?: string;
  subtitle?: string;
}

export interface LeadData {
  email: string;
  phone: string;
  calculatorType?: string;
  capturedAt: string;
}

export function LeadCapturePopup({
  isOpen,
  onClose,
  onSubmit,
  calculatorType = "calculator",
  title = "Get Your Personalised Results",
  subtitle = "Enter your details to save your calculation and receive a custom quote",
}: LeadCapturePopupProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate UK phone format
  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\s+/g, "");
    const phoneRegex = /^(?:(?:\+44)|(?:0))(?:\d{10}|\d{9})$/;
    return phoneRegex.test(cleanPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const newErrors: { email?: string; phone?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid UK phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const leadData: LeadData = {
      email,
      phone,
      calculatorType,
      capturedAt: new Date().toISOString(),
    };

    // Store in localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leadData));
    } catch (e) {
      console.error("Failed to save lead data", e);
    }

    // Call onSubmit callback
    if (onSubmit) {
      await onSubmit(leadData);
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    // Auto close after success
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleDismiss = () => {
    try {
      // Store dismissal in sessionStorage (resets on browser close)
      sessionStorage.setItem(DISMISSED_KEY, "true");
    } catch (e) {
      console.error("Failed to save dismissal", e);
    }
    onClose();
  };

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPhone("");
      setErrors({});
      setIsSuccess(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] p-6 relative">
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  aria-label="Close popup"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{title}</h2>
                </div>
                <p className="text-white/90 text-sm">{subtitle}</p>
              </div>

              {/* Content */}
              <div className="p-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600">
                      We'll be in touch with your personalised quote shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`pl-10 ${
                            errors.email
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="07XXX XXXXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`pl-10 ${
                            errors.phone
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>

                    {/* Trust indicators */}
                    <div className="flex items-center gap-4 py-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        No spam
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        No credit check
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Free quote
                      </span>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold py-6 text-lg"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Saving...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Continue to Results
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      )}
                    </Button>

                    {/* Skip link */}
                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Skip for now
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook to manage popup state and trigger on first interaction
export function useLeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // Check if lead already captured or dismissed
    try {
      const captured = localStorage.getItem(STORAGE_KEY);
      const dismissed = sessionStorage.getItem(DISMISSED_KEY);
      if (captured || dismissed) {
        setHasBeenShown(true);
      }
    } catch (e) {
      // Storage not available
    }
  }, []);

  const triggerPopup = () => {
    if (!hasInteracted && !hasBeenShown) {
      setHasInteracted(true);
      setIsOpen(true);
      setHasBeenShown(true);
    }
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    triggerPopup,
    closePopup,
    hasBeenShown,
  };
}

// Check if lead already captured
export function isLeadCaptured(): boolean {
  try {
    return !!localStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
}

// Get captured lead data
export function getCapturedLead(): LeadData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
