import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import nodemailer from 'nodemailer';
import { rateLimit } from '../_lib/rate-limit';

export const runtime = 'nodejs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = 'contact@cdm2026.fr';
const SUBJECTS = ['Question', 'Suggestion', 'Partenariat', 'Signaler une erreur', 'Autre'] as const;

/**
 * Forward a contact form message to the contact@cdm2026.fr Zoho mailbox via Zoho SMTP
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

  const smtpUser = process.env.ZOHO_SMTP_USER ?? CONTACT_EMAIL;
  const smtpPassword = process.env.ZOHO_SMTP_PASSWORD;
  if (!smtpPassword) {
    console.warn('[contact] ZOHO_SMTP_PASSWORD manquant — message non envoyé');
    return NextResponse.json(
      { error: `Service temporairement indisponible. Écrivez-nous à ${CONTACT_EMAIL}.` },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST ?? 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: { user: smtpUser, pass: smtpPassword },
  });

  try {
    await transporter.sendMail({
      from: { name: 'Formulaire CDM 2026', address: smtpUser },
      to: CONTACT_EMAIL,
      replyTo: { name: cleanName, address: cleanEmail },
      subject: `[Contact CDM 2026] ${cleanSubject} — ${cleanName}`,
      text: `Nom : ${cleanName}\nEmail : ${cleanEmail}\nSujet : ${cleanSubject}\n\n${cleanMessage}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] Envoi SMTP Zoho échoué:', err);
    return NextResponse.json(
      { error: `Impossible d'envoyer le message pour le moment. Écrivez-nous à ${CONTACT_EMAIL}.` },
      { status: 502 },
    );
  }
}
