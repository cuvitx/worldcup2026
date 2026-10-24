import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { rateLimit } from '../_lib/rate-limit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = 'contact@cdm2026.fr';
const SUBJECTS = ['Question', 'Suggestion', 'Partenariat', 'Signaler une erreur', 'Autre'] as const;

/**
 * Forward a contact form message to the contact@cdm2026.fr Zoho mailbox via FormSubmit
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

  try {
    // FormSubmit relaie le message vers la boîte Zoho ; `email` sert de reply-to
    const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://www.cdm2026.fr',
        Referer: 'https://www.cdm2026.fr/contact',
      },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        sujet: cleanSubject,
        message: cleanMessage,
        _subject: `[Contact CDM 2026] ${cleanSubject} — ${cleanName}`,
        _template: 'table',
        _captcha: 'false',
      }),
      cache: 'no-store',
    });
    const result = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };

    if (!res.ok || String(result.success) !== 'true') {
      console.error('[contact] FormSubmit error:', res.status, result.message ?? '');
      return NextResponse.json(
        { error: `Impossible d'envoyer le message pour le moment. Écrivez-nous à ${CONTACT_EMAIL}.` },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] Fetch FormSubmit failed:', err);
    return NextResponse.json(
      { error: `Impossible d'envoyer le message pour le moment. Écrivez-nous à ${CONTACT_EMAIL}.` },
      { status: 502 },
    );
  }
}
