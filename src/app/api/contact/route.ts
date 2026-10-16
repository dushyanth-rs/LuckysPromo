import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Sends contact-form submissions via the info@luckyspromo.com mailbox's own
// SMTP, hosted on Hostinger alongside the domain. This keeps mail delivery
// independent of the WordPress site, which is being retired once the domain
// points here. Credentials are read from environment variables only -
// never hardcoded - set in the Netlify dashboard (Site settings >
// Environment variables):
//   SMTP_HOST      e.g. smtp.hostinger.com
//   SMTP_PORT      465 (SSL) or 587 (STARTTLS)
//   SMTP_USER      info@luckyspromo.com
//   SMTP_PASSWORD  that mailbox's password
//   CONTACT_TO     (optional) defaults to info@luckyspromo.com

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, phone, message } = body as Record<string, string>;
  if (!name || !email || !phone || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: 'Email is not configured on the server' },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: `"Luckys Promo Website" <${SMTP_USER}>`,
      to: CONTACT_TO || 'info@luckyspromo.com',
      replyTo: email,
      subject: `New enquiry from ${name} (via luckyspromo.com)`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to send the message' }, { status: 502 });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
