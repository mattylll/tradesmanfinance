import { NextRequest, NextResponse } from "next/server";

/**
 * Lead delivery endpoint.
 * Receives form submissions and emails them via Resend.
 *
 * Required env (server-side, set in Netlify):
 *   RESEND_API_KEY - Resend API key
 * Optional:
 *   LEAD_TO_EMAIL   - recipient (defaults to matt.lenzie@gmail.com)
 *   LEAD_FROM_EMAIL - verified sender (defaults to onboarding@resend.dev)
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.LEAD_TO_EMAIL || "matt.lenzie@gmail.com";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "Tradesman Finance <onboarding@resend.dev>";

interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  formType?: string;
  subject?: string;
  message?: string;
  amount?: number | string;
  tradeType?: string;
  financeType?: string;
  urgency?: string;
  pageUrl?: string;
  location?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  submittedAt?: string;
}

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label: string, value: unknown): string {
  if (value === undefined || value === null || value === "") return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#555;white-space:nowrap;vertical-align:top"><strong>${label}</strong></td><td style="padding:4px 0">${esc(value)}</td></tr>`;
}

export async function POST(request: NextRequest) {
  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Minimal validation: a lead without any contact route is useless
  if (!data.email && !data.phone) {
    return NextResponse.json(
      { success: false, error: "Missing contact details" },
      { status: 400 }
    );
  }

  if (!RESEND_API_KEY) {
    console.error("[lead] RESEND_API_KEY not configured");
    return NextResponse.json(
      { success: false, error: "Lead delivery not configured" },
      { status: 500 }
    );
  }

  const formType = data.formType || "enquiry";
  const amount = data.amount ? `£${Number(data.amount).toLocaleString("en-GB")}` : undefined;

  const html = `
    <h2 style="font-family:sans-serif">New ${esc(formType)} lead - tradesmanfinance.co.uk</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Business", data.businessName)}
      ${row("Trade", data.tradeType)}
      ${row("Finance type", data.financeType)}
      ${row("Amount", amount)}
      ${row("Urgency", data.urgency)}
      ${row("Location", data.location)}
      ${row("Subject", data.subject)}
      ${row("Message", data.message)}
      ${row("Page", data.pageUrl)}
      ${row("UTM", [data.utmSource, data.utmMedium, data.utmCampaign].filter(Boolean).join(" / "))}
      ${row("Submitted", data.submittedAt)}
    </table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: data.email || undefined,
        subject: `Lead: ${data.name || "Unknown"} - ${formType}${amount ? ` - ${amount}` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[lead] Resend error ${res.status}: ${body}`);
      return NextResponse.json(
        { success: false, error: `Email delivery failed (${res.status})` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[lead] Delivery error:", error);
    return NextResponse.json(
      { success: false, error: "Email delivery failed" },
      { status: 502 }
    );
  }
}
