import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { rateLimit } from '../_lib/rate-limit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * E-Mail für den WM 2026 Newsletter über Brevo API anmelden
 * Enthält Ratenbegrenzung, Duplikaterkennung und Validierung
 * @param {NextRequest} req - Next.js Request mit { email: string } Body
 * @returns {Promise<NextResponse>} Erfolgs-/Fehler-JSON-Antwort
 * @example
 * // POST /api/newsletter
 * // Body: { "email": "user@example.com" }
 * // Returns: { "success": true } or { "error": "..." }
 */
export async function POST(req: NextRequest) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? headersList.get("x-real-ip") ?? "unknown";
  if (!rateLimit(ip, 3)) {
    return NextResponse.json({ error: "Zu viele Anfragen. Versuchen Sie es in 1 Minute erneut." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ungültiger Anfragetext.' }, { status: 400 });
  }

  const { email } = body as { email?: string };

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID ?? '2');

  if (!apiKey) {
    // Schlüssel fehlt → Teilerfolg zurückgeben (Frontend verwaltet localStorage-Fallback)
    console.warn('[newsletter] BREVO_API_KEY fehlt — E-Mail serverseitig nicht gespeichert');
    return NextResponse.json(
      { success: false, error: 'Dienst vorübergehend nicht verfügbar.' },
      { status: 503 },
    );
  }

  const brevoHeaders = {
    'api-key': apiKey,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // ── Ratenbegrenzung: Prüfen ob Kontakt bereits existiert (angemeldet vor < 24h) ──
  try {
    const checkRes = await fetch(
      `https://api.brevo.com/v3/kontakts/${encodeURIComponent(normalizedEmail)}`,
      { headers: brevoHeaders, cache: 'no-store' },
    );

    if (checkRes.ok) {
      const existing = (await checkRes.json()) as {
        createdAt?: string;
        listIds?: number[];
      };

      // Bereits in der Zielliste → Duplikat
      if (existing.listIds?.includes(listId)) {
        // Prüfen ob in den letzten 24h angemeldet
        const createdAt = existing.createdAt ? new Date(existing.createdAt).getTime() : 0;
        const ageMs = Date.now() - createdAt;
        if (ageMs < 24 * 60 * 60 * 1000) {
          return NextResponse.json(
            { error: 'duplicate', message: 'Bereits kürzlich angemeldet.' },
            { status: 409 },
          );
        }
        // Angemeldet vor > 24h → durchlassen (Aktualisierung möglich)
        return NextResponse.json(
          { error: 'duplicate', message: 'Diese E-Mail-Adresse ist bereits angemeldet.' },
          { status: 409 },
        );
      }
    }
    // 404 = Kontakt unbekannt → weiter zur Erstellung
  } catch (err) {
    console.error('[newsletter] Fehler bei der Brevo-Kontaktprüfung:', err);
    // Nicht blockierend: Versuch trotzdem den Kontakt hinzuzufügen
  }

  // ── Kontakt erstellen / aktualisieren ────────────────────────────────────────
  try {
    const createRes = await fetch('https://api.brevo.com/v3/kontakts', {
      method: 'POST',
      headers: brevoHeaders,
      body: JSON.stringify({
        email: normalizedEmail,
        listIds: [listId],
        updateEnabled: true, // aktualisiert falls der Kontakt bereits existiert
      }),
    });

    if (!createRes.ok) {
      const errBody = await createRes.text();
      console.error('[newsletter] Brevo error:', createRes.status, errBody);

      // 400 + "Contact already exist" → duplicate
      if (createRes.status === 400 && errBody.includes('already exist')) {
        return NextResponse.json(
          { error: 'duplicate', message: 'Diese E-Mail-Adresse ist bereits angemeldet.' },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { error: 'Anmeldung derzeit nicht möglich. Versuchen Sie es später erneut.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[newsletter] Fetch Brevo failed:', err);
    return NextResponse.json(
      { error: 'Netzwerkfehler. Versuchen Sie es später erneut.' },
      { status: 503 },
    );
  }
}
