import { NextRequest, NextResponse } from "next/server";

/**
 * Lead delivery endpoint: receives every site form (contact, quick quote,
 * trade enquiry, calculator) and emails the lead via Resend.
 *
 * Mirrors the Resend structure used on the property-finance sites
 * (industrialpropertyfinance / hotelpropertyfinance / warehousepropertyfinance).
 *
 * Env vars (set in the Netlify site, never committed):
 *   RESEND_API_KEY   Resend API key (REQUIRED)
 *   RESEND_TO        recipient inbox (defaults to the shared lead inbox — on
 *                    free-tier Resend only the account owner's address delivers)
 *   RESEND_FROM      sender (defaults to Resend's free shared sender; verify the
 *                    domain in Resend and set this to send from a branded address)
 *
 * LEAD_TO_EMAIL / LEAD_FROM_EMAIL are still honoured as legacy fallbacks.
 */

export const dynamic = "force-dynamic";

const BRAND = "Tradesman Finance";
const SITE = "tradesmanfinance.co.uk";
const LEAD_INBOX = "commercialmortgagesbroker@gmail.com"; // Resend account owner — only deliverable address on free tier
const DEFAULT_FROM = `${BRAND} <onboarding@resend.dev>`;

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  businessName: "Business",
  tradeType: "Trade",
  financeType: "Finance type",
  amount: "Amount",
  urgency: "Urgency",
  location: "Location",
  subject: "Subject",
  message: "Message",
  pageUrl: "Page",
  utmSource: "UTM source",
  utmMedium: "UTM medium",
  utmCampaign: "UTM campaign",
  submittedAt: "Submitted",
};

// Control fields that should never appear in the email body
const SKIP = new Set(["bot-field", "form-name", "formType", "source"]);

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

const isEmail = (s: unknown): s is string =>
  typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

const fail = (error: string, status: number) => NextResponse.json({ success: false, error }, { status });

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid JSON", 400);
  }
  if (!body || typeof body !== "object") return fail("Invalid payload", 400);

  // Honeypot: bots fill the hidden field — drop silently but report success
  if (body["bot-field"]) return NextResponse.json({ success: true });

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (!email && !phone) return fail("Missing contact details", 400);

  const KEY = process.env.RESEND_API_KEY;
  const TO = process.env.RESEND_TO || process.env.LEAD_TO_EMAIL || LEAD_INBOX;
  const FROM = process.env.RESEND_FROM || process.env.LEAD_FROM_EMAIL || DEFAULT_FROM;

  if (!KEY) {
    console.error("[lead] RESEND_API_KEY missing — lead NOT sent:", JSON.stringify(body));
    return fail("Lead delivery not configured", 500);
  }

  const formType = typeof body.formType === "string" && body.formType ? body.formType : "enquiry";
  const page = (typeof body.pageUrl === "string" && body.pageUrl) || request.headers.get("referer") || "";

  const rows: [string, string][] = [];
  for (const [k, raw] of Object.entries(body)) {
    if (SKIP.has(k) || raw === undefined || raw === null) continue;
    let v = String(raw).trim();
    if (!v) continue;
    if (k === "amount" && !Number.isNaN(Number(v))) v = `£${Number(v).toLocaleString("en-GB")}`;
    rows.push([LABELS[k] || k, v]);
  }
  if (page && !rows.some(([k]) => k === "Page")) rows.push(["Page", page]);

  const name = (typeof body.name === "string" && body.name.trim()) || email || phone || "Unknown";
  const amount = rows.find(([k]) => k === "Amount")?.[1];
  const subject = `Lead: ${name} - ${formType}${amount ? ` - ${amount}` : ""} (${BRAND})`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nForm: ${formType} · ${SITE}`;
  const html =
    `<h2 style="font-family:system-ui,sans-serif">New ${esc(formType)} lead (${esc(BRAND)})</h2>` +
    `<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#6a7682;white-space:nowrap;vertical-align:top">${esc(k)}</td>` +
          `<td style="padding:4px 0"><strong>${esc(v).replace(/\n/g, "<br>")}</strong></td></tr>`,
      )
      .join("") +
    `</table><p style="font-family:system-ui,sans-serif;color:#6a7682;font-size:12px">Form: ${esc(formType)} · ${SITE}</p>`;

  const payload: Record<string, unknown> = { from: FROM, to: [TO], subject, text, html };
  if (isEmail(email)) payload.reply_to = email;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error(`[lead] Resend error ${r.status}: ${detail}`, JSON.stringify(body));
      return fail(`Email delivery failed (${r.status})`, 502);
    }
  } catch (e) {
    console.error("[lead] send failed:", e instanceof Error ? e.message : e, JSON.stringify(body));
    return fail("Email delivery failed", 502);
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } });
}
