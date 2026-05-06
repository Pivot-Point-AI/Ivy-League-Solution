import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
};

type EmailContent = {
  subject: string;
  text: string;
  html: string;
};

type ApiErrorResponse = { error: string };
type ApiSuccessResponse = { ok: true };

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const REQUIRED_ENV_VARS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_TO_EMAIL",
] as const;

type RequiredEnvVar = (typeof REQUIRED_ENV_VARS)[number];

// ─────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────

/** Returns the trimmed value or "N/A" if empty. */
const formatValue = (value?: string): string =>
  value?.trim() || "N/A";

/** Returns the first missing required env var, or undefined if all present. */
const getMissingEnvVar = (): RequiredEnvVar | undefined =>
  REQUIRED_ENV_VARS.find((key) => !process.env[key]);

/** Creates a configured Nodemailer transporter from env vars. */
const createTransporter = (): nodemailer.Transporter => {
  const port = Number(process.env.SMTP_PORT);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// ─────────────────────────────────────────────
// Email Template
// ─────────────────────────────────────────────

/** Builds the plain-text and HTML email content from the contact payload. */
const generateEmailContent = (data: ContactPayload): EmailContent => {
  const { name, email, company, service, budget, message } = data;

  const subject = `New contact form message from ${formatValue(name)}`;

  const text = [
    `Name    : ${formatValue(name)}`,
    `Email   : ${formatValue(email)}`,
    `Company : ${formatValue(company)}`,
    `Service : ${formatValue(service)}`,
    `Budget  : ${formatValue(budget)}`,
    "",
    "Message:",
    formatValue(message),
  ].join("\n");

  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const fieldCell = (label: string, value: string) => /* html */ `
    <td width="50%" style="padding: 0 8px 20px 0; vertical-align: top;">
      <table cellpadding="0" cellspacing="0" width="100%" style="
        background: #f9f9fc;
        border: 1px solid #ebebf2;
        border-radius: 8px;
        overflow: hidden;
      ">
        <tr>
          <td style="
            background: #f2f2f8;
            padding: 7px 14px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: #7878a0;
            border-bottom: 1px solid #ebebf2;
          ">${label}</td>
        </tr>
        <tr>
          <td style="
            padding: 11px 14px;
            font-size: 14px;
            font-weight: 500;
            color: #1a1a2e;
            line-height: 1.4;
            word-break: break-word;
          ">${value}</td>
        </tr>
      </table>
    </td>`;

  const html = /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: #edeef4;
  font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
  color: #1a1a2e;
  -webkit-font-smoothing: antialiased;
">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 48px 0 56px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="700" cellpadding="0" cellspacing="0" style="
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06);
        ">

          <!-- ── Accent bar ── -->
          <tr>
            <td style="
              height: 5px;
              background: linear-gradient(90deg, #1a1744 0%, #3d3799 40%, #6c5ce7 70%, #a29bfe 100%);
            "></td>
          </tr>

          <!-- ── Header ── -->
          <tr>
            <td style="
              background: linear-gradient(135deg, #13103a 0%, #1e1b55 45%, #2a2470 100%);
              padding: 44px 52px 40px;
            ">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="
                      margin: 0 0 8px;
                      font-size: 10px;
                      font-weight: 700;
                      letter-spacing: 3.5px;
                      text-transform: uppercase;
                      color: rgba(162,155,254,0.75);
                    ">Contact Form · Incoming Submission</p>
                    <h1 style="
                      margin: 0 0 14px;
                      font-size: 28px;
                      font-weight: 700;
                      color: #ffffff;
                      line-height: 1.25;
                      letter-spacing: -0.3px;
                    ">New Message Received</h1>
                    <p style="
                      margin: 0;
                      font-size: 13px;
                      color: rgba(255,255,255,0.45);
                      line-height: 1.5;
                    ">Submitted on ${timestamp}</p>
                  </td>
                  <td width="56" style="vertical-align: middle; text-align: right;">
                    <div style="
                      width: 52px;
                      height: 52px;
                      background: rgba(108,92,231,0.25);
                      border: 1px solid rgba(162,155,254,0.3);
                      border-radius: 14px;
                      text-align: center;
                      line-height: 52px;
                      font-size: 24px;
                    ">✉️</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Section label: Details ── -->
          <tr>
            <td style="padding: 36px 52px 4px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 2.5px;
                    text-transform: uppercase;
                    color: #a0a0bc;
                    padding-bottom: 16px;
                    border-bottom: 1px solid #ebebf2;
                  ">Sender Details</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Fields: row 1 — Name + Email ── -->
          <tr>
            <td style="padding: 20px 44px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${fieldCell("Full Name", formatValue(name))}
                  ${fieldCell("Email Address", formatValue(email))}
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Fields: row 2 — Company + Service ── -->
          <tr>
            <td style="padding: 0 44px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${fieldCell("Company", formatValue(company))}
                  ${fieldCell("Service Requested", formatValue(service))}
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Fields: row 3 — Budget (full width) ── -->
          <tr>
            <td style="padding: 0 44px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 0 20px; vertical-align: top;">
                    <table cellpadding="0" cellspacing="0" width="100%" style="
                      background: #f9f9fc;
                      border: 1px solid #ebebf2;
                      border-radius: 8px;
                      overflow: hidden;
                    ">
                      <tr>
                        <td style="
                          background: #f2f2f8;
                          padding: 7px 14px;
                          font-size: 10px;
                          font-weight: 700;
                          letter-spacing: 1.8px;
                          text-transform: uppercase;
                          color: #7878a0;
                          border-bottom: 1px solid #ebebf2;
                        ">Budget Range</td>
                      </tr>
                      <tr>
                        <td style="
                          padding: 11px 14px;
                          font-size: 14px;
                          font-weight: 500;
                          color: #1a1a2e;
                        ">${formatValue(budget)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Section label: Message ── -->
          <tr>
            <td style="padding: 8px 52px 4px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 2.5px;
                    text-transform: uppercase;
                    color: #a0a0bc;
                    padding-bottom: 16px;
                    border-bottom: 1px solid #ebebf2;
                  ">Message</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Message body ── -->
          <tr>
            <td style="padding: 20px 44px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    background: #f6f6fb;
                    border: 1px solid #e4e4ef;
                    border-left: 4px solid #6c5ce7;
                    border-radius: 0 10px 10px 0;
                    padding: 22px 24px;
                    font-size: 15px;
                    line-height: 1.75;
                    color: #2c2c3e;
                  ">${formatValue(message).replace(/\n/g, "<br />")}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Reply CTA ── -->
          <tr>
            <td style="padding: 28px 44px 0; text-align: center;">
              <a href="mailto:${formatValue(email)}" style="
                display: inline-block;
                background: linear-gradient(135deg, #2a2470 0%, #6c5ce7 100%);
                color: #ffffff;
                text-decoration: none;
                font-size: 14px;
                font-weight: 600;
                letter-spacing: 0.3px;
                padding: 14px 36px;
                border-radius: 8px;
              ">Reply to ${formatValue(name)}</a>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="padding: 32px 52px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    border-top: 1px solid #ebebf2;
                    padding-top: 24px;
                    font-size: 12px;
                    color: #b8b8ce;
                    text-align: center;
                    line-height: 1.7;
                  ">
                    This is an automated notification from your contact form.<br />
                    Do not forward or share this email — it contains personal contact information.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Bottom accent bar ── -->
          <tr>
            <td style="
              height: 4px;
              background: linear-gradient(90deg, #a29bfe 0%, #6c5ce7 30%, #3d3799 70%, #1a1744 100%);
            "></td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;

  return { subject, text, html };
};

// ─────────────────────────────────────────────
// Route Handler
// ─────────────────────────────────────────────

/**
 * POST /api/contact
 * Validates the payload, checks env config, and dispatches the contact email.
 */
export async function POST(
  request: Request
): Promise<NextResponse<ApiSuccessResponse | ApiErrorResponse>> {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, service, message } = body;

    // 1. Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // 2. Validate env variables
    const missingEnv = getMissingEnvVar();
    if (missingEnv) {
      return NextResponse.json(
        { error: `Server email config missing: ${missingEnv}` },
        { status: 500 }
      );
    }

    // 3. Setup transporter
    const transporter = createTransporter();

    const to = process.env.CONTACT_TO_EMAIL as string;
    const from = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

    // 4. Generate email content
    const emailContent = generateEmailContent(body);

    // 5. Dispatch email
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      ...emailContent,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}