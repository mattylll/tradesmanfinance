"use client";

import { Label } from "@/registry/new-york-v4/ui/label";
import { Slider } from "@/registry/new-york-v4/ui/slider";
import { Input } from "@/registry/new-york-v4/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select";
import { formatCurrency } from "@/lib/calculator";
import type { LucideIcon } from "lucide-react";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  icon?: LucideIcon;
  unit?: string;
  formatValue?: (value: number) => string;
  showInput?: boolean;
  className?: string;
}

export function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  icon: Icon,
  unit = "",
  formatValue,
  showInput = true,
  className = "",
}: SliderInputProps) {
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;
  const displayMin = formatValue ? formatValue(min) : `${min}${unit}`;
  const displayMax = formatValue ? formatValue(max) : `${max}${unit}`;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          {Icon && <Icon className="h-4 w-4 text-gray-500" />}
          {label}
        </Label>
        <span className="text-lg font-bold text-[#ff6b35]">{displayValue}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        min={min}
        max={max}
        step={step}
        className="[&_[role=slider]]:bg-[#ff6b35] [&_[role=slider]]:border-[#ff6b35] [&>.bg-primary]:bg-[#ff6b35]"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{displayMin}</span>
        <span>{displayMax}</span>
      </div>
      {showInput && (
        <Input
          type="number"
          value={value}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            if (!isNaN(parsed)) {
              onChange(Math.max(min, Math.min(max, parsed)));
            }
          }}
          min={min}
          max={max}
          step={step}
          className="text-right"
        />
      )}
    </div>
  );
}

interface SelectInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: readonly { readonly value: string | number; readonly label: string }[];
  icon?: LucideIcon;
  className?: string;
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  icon: Icon,
  className = "",
}: SelectInputProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        {label}
      </Label>
      <Select value={String(value)} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface CurrencySliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  icon?: LucideIcon;
  showInput?: boolean;
  className?: string;
}

export function CurrencySliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  icon,
  showInput = true,
  className = "",
}: CurrencySliderInputProps) {
  return (
    <SliderInput
      label={label}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      icon={icon}
      formatValue={formatCurrency}
      showInput={showInput}
      className={className}
    />
  );
}

interface PercentageSliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  icon?: LucideIcon;
  suffix?: string;
  showInput?: boolean;
  className?: string;
}

export function PercentageSliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  icon,
  suffix = "%",
  showInput = false,
  className = "",
}: PercentageSliderInputProps) {
  return (
    <SliderInput
      label={label}
      value={value}
      onChange={(v) => onChange(Math.round(v * 10) / 10)}
      min={min}
      max={max}
      step={step}
      icon={icon}
      formatValue={(v) => `${v.toFixed(1)}${suffix}`}
      showInput={showInput}
      className={className}
    />
  );
}
