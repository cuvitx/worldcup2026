import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { rateLimit } from '../_lib/rate-limit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Subscribe an email to the CDM 2026 newsletter via Brevo API
 * Includes rate limiting, duplicate detection, and validation
 * @param {NextRequest} req - Next.js request with { email: string } body
 * @returns {Promise<NextResponse>} Success/error JSON response
 * @example
 * // POST /api/newsletter
 * // Body: { "email": "user@example.com" }
 * // Returns: { "success": true } or { "error": "..." }
 */
export async function POST(req: NextRequest) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? headersList.get("x-real-ip") ?? "unknown";
  if (!rateLimit(ip, 3)) {
    return NextResponse.json({ error: "Trop de requêtes. Réessayez dans 1 minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  }

  const { email } = body as { email?: string };

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID ?? '2');

  if (!apiKey) {
    // Clé absente → on renvoie succès partiel (le frontend gère le fallback localStorage)
    console.warn('[newsletter] BREVO_API_KEY manquante — email non enregistré côté serveur');
    return NextResponse.json(
      { success: false, error: 'Service temporairement indisponible.' },
      { status: 503 },
    );
  }

  const brevoHeaders = {
    'api-key': apiKey,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // ── Rate-limit : vérifier si le contact existe déjà (inscrit il y a < 24h) ──
  try {
    const checkRes = await fetch(
      `https://api.brevo.com/v3/contacts/${encodeURIComponent(normalizedEmail)}`,
      { headers: brevoHeaders, cache: 'no-store' },
    );

    if (checkRes.ok) {
      const existing = (await checkRes.json()) as {
        createdAt?: string;
        listIds?: number[];
      };

      // Déjà dans la liste cible → duplicate
      if (existing.listIds?.includes(listId)) {
        // Vérifier si inscrit dans les dernières 24h
        const createdAt = existing.createdAt ? new Date(existing.createdAt).getTime() : 0;
        const ageMs = Date.now() - createdAt;
        if (ageMs < 24 * 60 * 60 * 1000) {
          return NextResponse.json(
            { error: 'duplicate', message: 'Déjà inscrit(e) récemment.' },
            { status: 409 },
          );
        }
        // Inscrit il y a > 24h → on laisse passer (mise à jour possible)
        return NextResponse.json(
          { error: 'duplicate', message: 'Cette adresse est déjà inscrite.' },
          { status: 409 },
        );
      }
    }
    // 404 = contact inconnu → on continue vers la création
  } catch (err) {
    console.error('[newsletter] Erreur lors du check contact Brevo:', err);
    // Non bloquant : on tente quand même l'ajout
  }

  // ── Création / mise à jour du contact ────────────────────────────────────────
  try {
    const createRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: brevoHeaders,
      body: JSON.stringify({
        email: normalizedEmail,
        listIds: [listId],
        updateEnabled: true, // met à jour si le contact existe déjà
      }),
    });

    if (!createRes.ok) {
      const errBody = await createRes.text();
      console.error('[newsletter] Brevo error:', createRes.status, errBody);

      // 400 + "Contact already exist" → duplicate
      if (createRes.status === 400 && errBody.includes('already exist')) {
        return NextResponse.json(
          { error: 'duplicate', message: 'Cette adresse est déjà inscrite.' },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { error: 'Impossible de vous inscrire pour le moment. Réessayez plus tard.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[newsletter] Fetch Brevo failed:', err);
    return NextResponse.json(
      { error: 'Erreur réseau. Réessayez plus tard.' },
      { status: 503 },
    );
  }
}
