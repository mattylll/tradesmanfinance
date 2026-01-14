"use client";

import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency, formatCurrencyPrecise } from "@/lib/calculator";
import type { LucideIcon } from "lucide-react";

interface ResultCardProps {
  label: string;
  value: number;
  format?: "currency" | "currency-precise" | "percentage" | "number";
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "success" | "warning" | "muted";
  icon?: LucideIcon;
  subtitle?: string;
  animate?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const variantClasses = {
  default: "text-gray-900",
  primary: "text-[#ff6b35]",
  success: "text-green-600",
  warning: "text-amber-600",
  muted: "text-gray-500",
};

export function ResultCard({
  label,
  value,
  format = "currency",
  size = "lg",
  variant = "primary",
  icon: Icon,
  subtitle,
  animate = true,
  className = "",
}: ResultCardProps) {
  const formatValue = (val: number): string => {
    switch (format) {
      case "currency":
        return formatCurrency(val);
      case "currency-precise":
        return formatCurrencyPrecise(val);
      case "percentage":
        return `${val.toFixed(1)}%`;
      case "number":
        return val.toLocaleString("en-GB");
      default:
        return String(val);
    }
  };

  const content = (
    <div className={`text-center ${className}`}>
      <p className="text-sm text-gray-600 mb-1 flex items-center justify-center gap-1.5">
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </p>
      <p className={`font-bold ${sizeClasses[size]} ${variantClasses[variant]}`}>
        {formatValue(value)}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );

  if (!animate) {
    return content;
  }

  return (
    <motion.div
      key={value}
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.div>
  );
}

interface ResultsGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ResultsGrid({ children, columns = 2, className = "" }: ResultsGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {children}
    </div>
  );
}

interface ResultHighlightProps {
  label: string;
  value: number;
  format?: "currency" | "currency-precise" | "percentage";
  description?: string;
  className?: string;
}

export function ResultHighlight({
  label,
  value,
  format = "currency",
  description,
  className = "",
}: ResultHighlightProps) {
  const formatValue = (val: number): string => {
    switch (format) {
      case "currency":
        return formatCurrency(val);
      case "currency-precise":
        return formatCurrencyPrecise(val);
      case "percentage":
        return `${val.toFixed(1)}%`;
      default:
        return String(val);
    }
  };

  return (
    <motion.div
      key={value}
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 ${className}`}
    >
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <p className="text-4xl font-bold text-green-600">{formatValue(value)}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      )}
    </motion.div>
  );
}

interface FeeBreakdownProps {
  items: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  total?: {
    label: string;
    value: number;
  };
  className?: string;
}

export function FeeBreakdown({ items, total, className = "" }: FeeBreakdownProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex justify-between items-center text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            {item.color && (
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            )}
            {item.label}
          </span>
          <span className="font-medium text-gray-900">
            {formatCurrencyPrecise(item.value)}
          </span>
        </div>
      ))}
      {total && (
        <>
          <div className="border-t pt-2 mt-2" />
          <div className="flex justify-between items-center font-semibold">
            <span className="text-gray-700">{total.label}</span>
            <span className="text-[#ff6b35]">{formatCurrencyPrecise(total.value)}</span>
          </div>
        </>
      )}
    </div>
  );
}
