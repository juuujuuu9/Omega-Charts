import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { company, leadMagnet } from '../../lib/site';

// Needs to run on-demand, not be prerendered at build time.
export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface LeadPayload {
  firstName?: unknown;
  email?: unknown;
  platform?: unknown;
  experience?: unknown;
  consent?: unknown;
  company_website?: unknown;
}

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/** Trim, cap length, and strip control characters before echoing into an email. */
const clean = (value: unknown, max = 200): string =>
  typeof value === 'string'
    ? // eslint-disable-next-line no-control-regex
      value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max)
    : '';

/** Escape for safe interpolation into the HTML email body. */
const esc = (s: string): string =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );

export const POST: APIRoute = async ({ request }) => {
  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return json({ error: 'Malformed request.' }, 400);
  }

  // Honeypot — a filled hidden field means a bot. Return 200 so it does not retry.
  if (clean(payload.company_website)) {
    return json({ ok: true }, 200);
  }

  const firstName = clean(payload.firstName, 80);
  const email = clean(payload.email, 160).toLowerCase();
  const platform = clean(payload.platform, 60);
  const experience = clean(payload.experience, 40);

  if (!firstName) return json({ error: 'First name is required.' }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: 'A valid email is required.' }, 400);
  if (!payload.consent) return json({ error: 'Consent is required.' }, 400);

  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM;
  const notifyTo = import.meta.env.LEAD_NOTIFY_TO;
  const guideUrl = import.meta.env.LEAD_MAGNET_URL;
  const replyTo = import.meta.env.RESEND_REPLY_TO || company.email;

  if (!apiKey || !from || !notifyTo) {
    console.error('[subscribe] Missing RESEND_API_KEY, RESEND_FROM, or LEAD_NOTIFY_TO');
    return json({ error: 'The form is temporarily unavailable.' }, 503);
  }

  const resend = new Resend(apiKey);
  const submittedAt = new Date().toISOString();

  // 1. Deliver the guide to the lead.
  const deliveryHtml = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0e1a2c">
      <p style="font-size:15px;line-height:1.6">Hi ${esc(firstName)},</p>
      <p style="font-size:15px;line-height:1.6">
        Here is <strong>${esc(leadMagnet.title)}</strong> &mdash; ${esc(leadMagnet.subtitle)}.
      </p>
      ${
        guideUrl
          ? `<p style="margin:28px 0">
               <a href="${esc(guideUrl)}" style="background:#0e9f47;color:#fff;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;display:inline-block">Download the PDF</a>
             </p>`
          : `<p style="font-size:15px;line-height:1.6">We will follow up with your copy shortly.</p>`
      }
      <p style="font-size:15px;line-height:1.6">
        Read section four first &mdash; the pre-trade checklist is the part members tell us
        changed the most about how they operate.
      </p>
      <p style="font-size:15px;line-height:1.6">
        If our tools are a poor fit for how you trade, reply and tell me what you trade.
        I would rather say so now.
      </p>
      <p style="font-size:15px;line-height:1.6">&mdash; The ${esc(company.name)} team<br>
        <a href="tel:${esc(company.phoneHref)}" style="color:#1d7fe0">${esc(company.phone)}</a>
      </p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0">
      <p style="font-size:11px;line-height:1.6;color:#64748b">
        ${esc(company.legalName)} &middot; ${esc(company.address.street)},
        ${esc(company.address.city)}, ${esc(company.address.state)} ${esc(company.address.zip)}.
        Trading involves substantial risk of loss and is not suitable for every investor.
        We are a software and education company, not a registered investment adviser.
        Past performance does not indicate future results.
      </p>
    </div>`;

  // 2. Notify the client that a lead came in.
  const notifyHtml = `
    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;line-height:1.7;color:#0e1a2c">
      <p style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:16px;font-weight:600">
        New guide download &mdash; ${esc(firstName)}
      </p>
      <table cellpadding="0" cellspacing="0" style="font-size:13px">
        <tr><td style="padding:3px 16px 3px 0;color:#64748b">Name</td><td>${esc(firstName)}</td></tr>
        <tr><td style="padding:3px 16px 3px 0;color:#64748b">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:3px 16px 3px 0;color:#64748b">Platform</td><td>${esc(platform) || '&mdash;'}</td></tr>
        <tr><td style="padding:3px 16px 3px 0;color:#64748b">Experience</td><td>${esc(experience) || '&mdash;'}</td></tr>
        <tr><td style="padding:3px 16px 3px 0;color:#64748b">Submitted</td><td>${esc(submittedAt)}</td></tr>
      </table>
    </div>`;

  try {
    const [delivery, notification] = await Promise.all([
      resend.emails.send({
        from,
        to: email,
        replyTo,
        subject: `${leadMagnet.title} — your copy inside`,
        html: deliveryHtml,
      }),
      resend.emails.send({
        from,
        to: notifyTo.split(',').map((s) => s.trim()).filter(Boolean),
        replyTo: email,
        subject: `New lead: ${firstName} (${email})`,
        html: notifyHtml,
      }),
    ]);

    // The lead-facing email is the one that must land. If it failed, tell the
    // visitor honestly rather than showing a success state.
    if (delivery.error) {
      console.error('[subscribe] guide delivery failed', delivery.error);
      return json({ error: 'We could not send the email.' }, 502);
    }

    if (notification.error) {
      // Non-fatal for the visitor, but must be visible in logs.
      console.error('[subscribe] internal notification failed', notification.error);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error('[subscribe] unexpected error', err);
    return json({ error: 'Something went wrong on our end.' }, 500);
  }
};
