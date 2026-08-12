/**
 * Webhook Integration for Tradesman Finance
 * Sends form submissions to Zapier (or GoHighLevel when ready)
 *
 * SETUP:
 * 1. Create a Zapier Zap with "Webhooks by Zapier" trigger
 * 2. Add your webhook URL to .env.local as NEXT_PUBLIC_WEBHOOK_URL
 */

// Webhook URL from environment variable
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || '';

export interface WebhookPayload {
  // Contact info
  name: string;
  email: string;
  phone?: string;
  businessName?: string;

  // Form details
  formType: 'contact' | 'quick-quote' | 'trade-enquiry' | 'calculator';
  subject?: string;
  message?: string;

  // Finance details
  amount?: number | string;
  tradeType?: string;
  financeType?: string;
  urgency?: string;

  // Context
  pageUrl: string;
  location?: string;

  // UTM tracking
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;

  // Metadata
  submittedAt: string;
}

export interface WebhookResponse {
  success: boolean;
  error?: string;
}

/**
 * Submit form data for lead delivery.
 *
 * Primary path: the site's own /api/lead endpoint, which emails the lead
 * via Resend. If NEXT_PUBLIC_WEBHOOK_URL is also configured, the payload is
 * additionally forwarded there (Zapier/CRM), but the email path decides
 * success. No silent fake-success: if delivery fails, the caller hears it.
 */
export async function submitToWebhook(data: WebhookPayload): Promise<WebhookResponse> {
  const payload = {
    ...data,
    source: 'tradesmanfinance.co.uk',
  };

  // Optional extra forward to an external webhook (fire-and-forget)
  if (WEBHOOK_URL) {
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch((error) => {
      console.error('[Webhook] External forward failed:', error);
    });
  }

  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
      throw new Error(result.error || `Lead endpoint returned ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('[Lead] Submission failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get UTM parameters from URL
 */
export function getUTMParams(): Pick<WebhookPayload, 'utmSource' | 'utmMedium' | 'utmCampaign'> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
  };
}

/**
 * Get current page URL
 */
export function getPageUrl(): string {
  if (typeof window === 'undefined') return '';
  return window.location.href;
}

/**
 * Extract location from URL path
 */
export function getLocationFromPath(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  const path = window.location.pathname;
  const match = path.match(/\/locations\/([^\/]+)(?:\/([^\/]+))?/);

  if (match) {
    const county = match[1]?.replace(/-/g, ' ');
    const town = match[2]?.replace(/-/g, ' ');
    return town ? `${town}, ${county}` : county;
  }

  return undefined;
}

/**
 * Extract trade type from URL path
 */
export function getTradeFromPath(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  const path = window.location.pathname;
  const trades = [
    'electrician', 'plumber', 'builder', 'carpenter', 'heating-engineer',
    'roofer', 'painter-decorator', 'plasterer', 'tiler', 'scaffolder',
    'groundworker', 'landscaper', 'shop-fitter', 'window-fitter',
    'bathroom-fitter', 'flooring-contractor', 'demolition', 'bricklayer',
    'air-conditioning', 'locksmith'
  ];

  for (const trade of trades) {
    if (path.includes(trade)) {
      return trade.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  }

  return undefined;
}
