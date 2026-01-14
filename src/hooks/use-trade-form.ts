"use client";

import { useState, useCallback, useEffect } from "react";
import type { FormData, FormState, FormStep, TradeFormConfig } from "@/lib/form-configs";

const FORM_STORAGE_KEY = "tradesman-finance-form";

interface UseTradeFormProps {
  config: TradeFormConfig;
  onComplete?: (data: FormData) => void | Promise<void>;
}

interface UseTradeFormReturn {
  state: FormState;
  currentStepConfig: FormStep;
  progress: number;
  canGoBack: boolean;
  canGoForward: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  setValue: (key: string, value: string | string[] | number | boolean) => void;
  getValue: (key: string) => string | string[] | number | boolean | undefined;
  setError: (key: string, message: string) => void;
  clearError: (key: string) => void;
  validateCurrentStep: () => boolean;
  resetForm: () => void;
  submitForm: () => Promise<void>;
}

export function useTradeForm({ config, onComplete }: UseTradeFormProps): UseTradeFormReturn {
  const [state, setState] = useState<FormState>(() => {
    // Try to load from storage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(`${FORM_STORAGE_KEY}-${config.tradeId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return {
            ...parsed,
            isSubmitting: false,
          };
        } catch {
          // Invalid storage, ignore
        }
      }
    }

    return {
      currentStep: 0,
      data: {},
      isComplete: false,
      isSubmitting: false,
      errors: {},
    };
  });

  // Save to storage on state change
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        `${FORM_STORAGE_KEY}-${config.tradeId}`,
        JSON.stringify({
          currentStep: state.currentStep,
          data: state.data,
          isComplete: state.isComplete,
          errors: {},
        })
      );
    }
  }, [state.currentStep, state.data, state.isComplete, config.tradeId]);

  const currentStepConfig = config.steps[state.currentStep];
  const progress = ((state.currentStep + 1) / config.steps.length) * 100;
  const canGoBack = state.currentStep > 0;
  const canGoForward = state.currentStep < config.steps.length - 1;

  // Validate the current step
  const validateCurrentStep = useCallback((): boolean => {
    const step = config.steps[state.currentStep];

    if (!step.required) return true;

    const value = state.data[step.id];

    // Check for empty values
    if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
      setState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [step.id]: step.validation?.message || "This field is required",
        },
      }));
      return false;
    }

    // Type-specific validation
    if (step.type === "email" && typeof value === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            [step.id]: "Please enter a valid email address",
          },
        }));
        return false;
      }
    }

    if (step.type === "phone" && typeof value === "string") {
      const phoneRegex = /^[\d\s+()-]{10,}$/;
      if (!phoneRegex.test(value)) {
        setState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            [step.id]: "Please enter a valid phone number",
          },
        }));
        return false;
      }
    }

    if (step.validation?.minLength && typeof value === "string") {
      const minLength = step.validation.minLength;
      if (value.length < minLength) {
        setState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            [step.id]: step.validation?.message || `Minimum ${minLength} characters required`,
          },
        }));
        return false;
      }
    }

    // Clear any existing error
    setState((prev) => {
      const newErrors = { ...prev.errors };
      delete newErrors[step.id];
      return { ...prev, errors: newErrors };
    });

    return true;
  }, [config.steps, state.currentStep, state.data]);

  // Go to next step
  const goToNextStep = useCallback(() => {
    // Skip validation for welcome step
    if (currentStepConfig.type !== "welcome" && !validateCurrentStep()) {
      return;
    }

    if (state.currentStep < config.steps.length - 1) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    }
  }, [validateCurrentStep, state.currentStep, config.steps.length, currentStepConfig.type]);

  // Go to previous step
  const goToPreviousStep = useCallback(() => {
    if (state.currentStep > 0) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }));
    }
  }, [state.currentStep]);

  // Go to specific step
  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < config.steps.length) {
        setState((prev) => ({
          ...prev,
          currentStep: step,
        }));
      }
    },
    [config.steps.length]
  );

  // Set a value
  const setValue = useCallback(
    (key: string, value: string | string[] | number | boolean) => {
      setState((prev) => {
        // Remove the error for this key when setting a value
        const newErrors = { ...prev.errors };
        delete newErrors[key];

        return {
          ...prev,
          data: {
            ...prev.data,
            [key]: value,
          },
          errors: newErrors,
        };
      });

      // Auto-advance for certain step types
      const step = config.steps.find((s) => s.id === key);
      if (step?.autoAdvance && step.type === "select-cards") {
        setTimeout(() => {
          goToNextStep();
        }, 300);
      }
    },
    [config.steps, goToNextStep]
  );

  // Get a value
  const getValue = useCallback(
    (key: string) => {
      return state.data[key];
    },
    [state.data]
  );

  // Set an error
  const setError = useCallback((key: string, message: string) => {
    setState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [key]: message,
      },
    }));
  }, []);

  // Clear an error
  const clearError = useCallback((key: string) => {
    setState((prev) => {
      const newErrors = { ...prev.errors };
      delete newErrors[key];
      return { ...prev, errors: newErrors };
    });
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setState({
      currentStep: 0,
      data: {},
      isComplete: false,
      isSubmitting: false,
      errors: {},
    });
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(`${FORM_STORAGE_KEY}-${config.tradeId}`);
    }
  }, [config.tradeId]);

  // Submit form
  const submitForm = useCallback(async () => {
    setState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      if (onComplete) {
        await onComplete(state.data);
      }
      setState((prev) => ({
        ...prev,
        isComplete: true,
        isSubmitting: false,
      }));
    } catch (error) {
      console.error("Form submission error:", error);
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        errors: {
          ...prev.errors,
          submit: "Failed to submit form. Please try again.",
        },
      }));
    }
  }, [onComplete, state.data]);

  return {
    state,
    currentStepConfig,
    progress,
    canGoBack,
    canGoForward,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    setValue,
    getValue,
    setError,
    clearError,
    validateCurrentStep,
    resetForm,
    submitForm,
  };
}

export default useTradeForm;
