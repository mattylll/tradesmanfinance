"use client";

import Link from "next/link";
import { Button } from "@/registry/new-york-v4/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface CalculatorCTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  trustBadges?: boolean;
  variant?: "light" | "dark";
  className?: string;
}

export function CalculatorCTA({
  title = "Ready to Apply?",
  subtitle = "Get your personalised quote in minutes",
  buttonText = "Get Your Quote",
  buttonHref = "/contact",
  onButtonClick,
  trustBadges = true,
  variant = "light",
  className = "",
}: CalculatorCTAProps) {
  const isDark = variant === "dark";

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main CTA Button */}
      <div className="text-center">
        {title && (
          <p className={`text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            {title}
          </p>
        )}
        {subtitle && (
          <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {subtitle}
          </p>
        )}
        <Button
          asChild
          size="lg"
          className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold text-lg py-6"
          onClick={onButtonClick}
        >
          <Link href={buttonHref}>
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* Trust Badges */}
      {trustBadges && (
        <div className={`flex justify-center gap-6 pt-4 ${isDark ? "border-t border-gray-700" : "border-t"}`}>
          <div className={`flex items-center gap-1.5 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>No Fees</span>
          </div>
          <div className={`flex items-center gap-1.5 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Fast Decision</span>
          </div>
          <div className={`flex items-center gap-1.5 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>No Obligation</span>
          </div>
        </div>
      )}
    </div>
  );
}

interface MiniCTAProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function MiniCTA({
  text = "Get Quote",
  href = "/contact",
  onClick,
  className = "",
}: MiniCTAProps) {
  return (
    <Button
      asChild
      size="sm"
      className={`bg-[#ff6b35] hover:bg-[#e55a2b] ${className}`}
      onClick={onClick}
    >
      <Link href={href}>
        {text}
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Link>
    </Button>
  );
}
