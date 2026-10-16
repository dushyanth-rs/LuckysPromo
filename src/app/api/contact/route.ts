import { NextRequest, NextResponse } from 'next/server';

// Luckys Promo's existing WordPress site runs Contact Form 7, which already
// emails info@luckyspromo.com on submission. Reusing its public REST
// feedback endpoint here means this form sends real mail without needing a
// separate email service or new credentials. Proxied server-side (rather
// than called from the browser) to sidestep any CORS restrictions on the
// WordPress REST API and keep these implementation details server-only.
const WPCF7_FEEDBACK_URL =
  'https://luckyspromo.com/wp-json/contact-form-7/v1/contact-forms/21686/feedback';
const WPCF7_UNIT_TAG = 'wpcf7-f21686-p21635-o1';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, phone, message } = body as Record<string, string>;
  if (!name || !email || !phone || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }

  const formData = new FormData();
  formData.append('_wpcf7', '21686');
  formData.append('_wpcf7_version', '6.1.6');
  formData.append('_wpcf7_locale', 'en_US');
  formData.append('_wpcf7_unit_tag', WPCF7_UNIT_TAG);
  formData.append('_wpcf7_container_post', '21635');
  formData.append('_wpcf7_posted_data_hash', '');
  formData.append('your-name', name);
  formData.append('your-email', email);
  formData.append('tel-603', phone || '');
  formData.append('your-message', message);
  formData.append('checkbox-953', 'You agree to our friendly privacy policy.');

  try {
    const wpResponse = await fetch(WPCF7_FEEDBACK_URL, {
      method: 'POST',
      body: formData,
    });
    const wpResult = await wpResponse.json();

    if (wpResult.status === 'mail_sent') {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, error: wpResult.message || 'The message could not be sent' },
      { status: 502 }
    );
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to reach the mail service' }, { status: 502 });
  }
}
