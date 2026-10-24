import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { rateLimit } from '../_lib/rate-limit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = 'contact@cdm2026.fr';
const SUBJECTS = ['Question', 'Suggestion', 'Partenariat', 'Signaler une erreur', 'Autre'] as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Forward a contact form message to contact@cdm2026.fr via Brevo transactional API
 * Includes rate limiting, honeypot and validation
 * @param {NextRequest} req - Next.js request with { name, email, subject, message, website } body
 * @returns {Promise<NextResponse>} Success/error JSON response
 */
export async function POST(req: NextRequest) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? headersList.get("x-real-ip") ?? "unknown";
  if (!rateLimit(`contact:${ip}`, 3)) {
    return NextResponse.json({ error: "Trop de requêtes. Réessayez dans 1 minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  }

  const { name, email, subject, message, website } = body as Record<string, unknown>;

  // Honeypot rempli → robot : on répond succès sans rien envoyer
  if (typeof website === 'string' && website.trim() !== '') {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // ── Validation ──────────────────────────────────────────────────────────────
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const cleanSubject = SUBJECTS.find((s) => s === subject) ?? 'Autre';
  const cleanMessage = typeof message === 'string' ? message.trim() : '';

  if (cleanName.length < 2 || cleanName.length > 100) {
    return NextResponse.json({ error: 'Merci d\'indiquer votre nom.' }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 200) {
    return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
  }
  if (cleanMessage.length < 10 || cleanMessage.length > 5000) {
    return NextResponse.json({ error: 'Votre message doit contenir entre 10 et 5000 caractères.' }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('[contact] BREVO_API_KEY manquante — message non envoyé');
    return NextResponse.json(
      { error: `Service temporairement indisponible. Écrivez-nous à ${CONTACT_EMAIL}.` },
      { status: 503 },
    );
  }

  const senderEmail = process.env.CONTACT_SENDER_EMAIL ?? CONTACT_EMAIL;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL ?? CONTACT_EMAIL;

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Formulaire CDM 2026', email: senderEmail },
        to: [{ email: recipient }],
        replyTo: { email: cleanEmail, name: cleanName },
        subject: `[Contact CDM 2026] ${cleanSubject} — ${cleanName}`,
        htmlContent:
          `<p><strong>Nom :</strong> ${escapeHtml(cleanName)}<br>` +
          `<strong>Email :</strong> ${escapeHtml(cleanEmail)}<br>` +
          `<strong>Sujet :</strong> ${escapeHtml(cleanSubject)}</p>` +
          `<p>${escapeHtml(cleanMessage).replace(/\n/g, '<br>')}</p>`,
      }),
    });

    if (!res.ok) {
      console.error('[contact] Brevo error:', res.status, await res.text());
      return NextResponse.json(
        { error: `Impossible d'envoyer le message pour le moment. Écrivez-nous à ${CONTACT_EMAIL}.` },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] Fetch Brevo failed:', err);
    return NextResponse.json(
      { error: `Erreur réseau. Écrivez-nous à ${CONTACT_EMAIL}.` },
      { status: 503 },
    );
  }
}
