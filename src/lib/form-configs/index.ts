/**
 * Trade Form Configuration Types
 * Defines the structure for multi-step trade-specific forms
 */

export type StepType =
  | "welcome"
  | "text"
  | "email"
  | "phone"
  | "select-cards"
  | "checkbox-cards"
  | "slider"
  | "emoji-select"
  | "textarea"
  | "summary";

export interface FormOption {
  value: string;
  label: string;
  icon?: string;
  emoji?: string;
  description?: string;
}

export interface FormStep {
  type: StepType;
  id: string;
  question?: string;
  subtitle?: string;
  placeholder?: string;
  required?: boolean;
  options?: FormOption[];
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  autoAdvance?: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}

export interface TradeFormConfig {
  tradeId: string;
  tradeName: string;
  tradeIcon: string;
  estimatedTime: number; // minutes
  steps: FormStep[];
}

export interface FormData {
  [key: string]: string | string[] | number | boolean | undefined;
}

export interface FormState {
  currentStep: number;
  data: FormData;
  isComplete: boolean;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

// Default form steps that apply to all trades
export const DEFAULT_FORM_STEPS: FormStep[] = [
  {
    type: "welcome",
    id: "welcome",
  },
  {
    type: "text",
    id: "name",
    question: "What's your name?",
    subtitle: "So we know what to call you",
    placeholder: "Enter your full name",
    required: true,
    validation: {
      minLength: 2,
      message: "Please enter your full name",
    },
  },
  {
    type: "phone",
    id: "phone",
    question: "What's the best number to reach you?",
    subtitle: "We'll only use this to discuss your finance options",
    placeholder: "07XXX XXXXXX",
    required: true,
  },
  {
    type: "email",
    id: "email",
    question: "What's your email address?",
    subtitle: "We'll send your quote here",
    placeholder: "you@example.com",
    required: true,
  },
  {
    type: "select-cards",
    id: "yearsTrading",
    question: "How long have you been trading?",
    subtitle: "This helps us find the right finance options",
    required: true,
    options: [
      { value: "0-1", label: "Less than 1 year", emoji: "🌱" },
      { value: "1-3", label: "1-3 years", emoji: "🌿" },
      { value: "3-5", label: "3-5 years", emoji: "🌳" },
      { value: "5+", label: "5+ years", emoji: "🏆" },
    ],
  },
  {
    type: "slider",
    id: "loanAmount",
    question: "How much funding do you need?",
    subtitle: "Drag the slider or enter an amount",
    min: 1000,
    max: 150000,
    step: 1000,
    prefix: "£",
    required: true,
  },
  {
    type: "select-cards",
    id: "purpose",
    question: "What will you use the funding for?",
    subtitle: "Select the main purpose",
    required: true,
    options: [
      { value: "equipment", label: "Equipment", emoji: "🔧" },
      { value: "van", label: "Van/Vehicle", emoji: "🚐" },
      { value: "materials", label: "Materials", emoji: "📦" },
      { value: "expansion", label: "Business Expansion", emoji: "📈" },
      { value: "working-capital", label: "Working Capital", emoji: "💷" },
      { value: "other", label: "Other", emoji: "✨" },
    ],
  },
  {
    type: "select-cards",
    id: "urgency",
    question: "When do you need the funding?",
    subtitle: "This helps us prioritize your application",
    required: true,
    autoAdvance: true,
    options: [
      { value: "urgent", label: "ASAP", emoji: "🚀", description: "Within 24-48 hours" },
      { value: "this-week", label: "This Week", emoji: "📅" },
      { value: "this-month", label: "This Month", emoji: "🗓️" },
      { value: "planning", label: "Just Planning", emoji: "🤔" },
    ],
  },
  {
    type: "emoji-select",
    id: "creditScore",
    question: "How would you describe your credit?",
    subtitle: "Be honest - we work with all credit profiles",
    required: true,
    options: [
      { value: "excellent", label: "Excellent", emoji: "😊" },
      { value: "good", label: "Good", emoji: "🙂" },
      { value: "fair", label: "Fair", emoji: "😐" },
      { value: "poor", label: "Poor", emoji: "😟" },
      { value: "unsure", label: "Not Sure", emoji: "🤷" },
    ],
  },
  {
    type: "textarea",
    id: "additionalInfo",
    question: "Anything else we should know?",
    subtitle: "Optional - tell us about your business or specific needs",
    placeholder: "E.g., type of work you do, specific equipment needed, etc.",
    required: false,
  },
  {
    type: "summary",
    id: "summary",
  },
];

// Trade-specific certifications that can be added to forms
export const TRADE_CERTIFICATIONS: Record<string, FormOption[]> = {
  electrician: [
    { value: "niceic", label: "NICEIC", emoji: "⚡" },
    { value: "napit", label: "NAPIT", emoji: "✓" },
    { value: "elecsa", label: "ELECSA", emoji: "🔌" },
    { value: "eca", label: "ECA Member", emoji: "🏅" },
    { value: "part-p", label: "Part P Registered", emoji: "📋" },
  ],
  plumber: [
    { value: "gas-safe", label: "Gas Safe", emoji: "🔥" },
    { value: "oftec", label: "OFTEC", emoji: "🛢️" },
    { value: "ciphe", label: "CIPHE", emoji: "🔧" },
    { value: "watersafe", label: "WaterSafe", emoji: "💧" },
  ],
  "heating-engineer": [
    { value: "gas-safe", label: "Gas Safe", emoji: "🔥" },
    { value: "oftec", label: "OFTEC", emoji: "🛢️" },
    { value: "hetas", label: "HETAS", emoji: "🔥" },
    { value: "mcs", label: "MCS Certified", emoji: "☀️" },
  ],
  builder: [
    { value: "fmb", label: "FMB Member", emoji: "🏗️" },
    { value: "nhbc", label: "NHBC Registered", emoji: "🏠" },
    { value: "citb", label: "CITB Card", emoji: "📋" },
    { value: "cscs", label: "CSCS Card", emoji: "🎫" },
  ],
  roofer: [
    { value: "nfrc", label: "NFRC Member", emoji: "🏠" },
    { value: "competent-roofer", label: "Competent Roofer", emoji: "✓" },
    { value: "trust-mark", label: "TrustMark", emoji: "⭐" },
  ],
};

// Helper to get trade-specific form config
export function getTradeFormConfig(tradeId: string, tradeName: string): TradeFormConfig {
  const certifications = TRADE_CERTIFICATIONS[tradeId];
  const steps = [...DEFAULT_FORM_STEPS];

  // Insert certifications step after years trading if trade has certifications
  if (certifications && certifications.length > 0) {
    const yearsIndex = steps.findIndex((s) => s.id === "yearsTrading");
    if (yearsIndex !== -1) {
      steps.splice(yearsIndex + 1, 0, {
        type: "checkbox-cards",
        id: "certifications",
        question: `What certifications do you hold?`,
        subtitle: "Select all that apply",
        required: false,
        options: certifications,
      });
    }
  }

  return {
    tradeId,
    tradeName,
    tradeIcon: getTradeIcon(tradeId),
    estimatedTime: Math.ceil(steps.length * 0.4),
    steps,
  };
}

// Map trade IDs to emoji icons
function getTradeIcon(tradeId: string): string {
  const icons: Record<string, string> = {
    electrician: "⚡",
    plumber: "🔧",
    builder: "🏗️",
    carpenter: "🪚",
    "heating-engineer": "🔥",
    roofer: "🏠",
    landscaper: "🌳",
    bricklayer: "🧱",
    plasterer: "🎨",
    tiler: "🔲",
    "painter-decorator": "🖌️",
    scaffolder: "🏗️",
    "flooring-contractor": "🪵",
    "window-fitter": "🪟",
    "bathroom-fitter": "🛁",
    "shop-fitter": "🏪",
    locksmith: "🔐",
    groundworker: "⛏️",
    demolition: "💥",
    "air-conditioning": "❄️",
  };
  return icons[tradeId] || "🔧";
}
