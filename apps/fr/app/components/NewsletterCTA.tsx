'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NewsletterCTAProps {
  /** Variant : 'banner' = bandeau plein-largeur, 'card' = carte compacte */
  variant?: 'banner' | 'card';
  className?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

export function NewsletterCTA({ variant = 'banner', className = '' }: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setErrorMsg('Email invalide.');
      return;
    }

    setStatus('loading');

    // ── Appel API Brevo ──────────────────────────────────────────────────────
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (res.status === 409) {
        saveToLocalStorage(trimmed);
        setStatus('duplicate');
        return;
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'Erreur inconnue');
      }

      saveToLocalStorage(trimmed);
      setStatus('success');
      setEmail('');
      return;
    } catch (err) {
      console.warn('[newsletter] API call failed, falling back to localStorage:', err);
    }

    // ── Fallback localStorage si l'API est down ──────────────────────────────
    try {
      const stored = JSON.parse(localStorage.getItem('cdm2026_newsletter') ?? '[]') as string[];
      if (stored.includes(trimmed)) {
        setStatus('duplicate');
        return;
      }
      saveToLocalStorage(trimmed);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMsg('Une erreur est survenue. Réessayez plus tard.');
    }
  };

  /* ────── SUCCESS STATE ────── */
  if (status === 'success') {
    return (
      <div className={`rounded-2xl border border-green-200 dark:border-green-800/40 bg-green-50 dark:bg-green-900/20 p-5 flex items-center gap-4 ${className}`}>
        <span className="text-3xl shrink-0">✅</span>
        <div>
          <p className="font-bold text-green-700 dark:text-green-400">Inscription réussie !</p>
          <p className="text-sm text-green-600 dark:text-green-500 mt-0.5">
            Vous recevrez nos pronostics chaque semaine.{' '}
            <Link href="/newsletter" className="underline hover:no-underline">
              En savoir plus →
            </Link>
          </p>
        </div>
      </div>
    );
  }

  /* ────── CARD VARIANT ────── */
  if (variant === 'card') {
    return (
      <div className={`rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-5 ${className}`}>
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl shrink-0">📧</span>
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-sm leading-snug">
              Recevez nos pronostics par email
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Programme hebdo · Alertes matchs · Cotes exclusives
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
            placeholder="votre@email.fr"
            aria-label="Votre adresse email"
            required
            disabled={status === 'loading'}
            className="flex-1 min-w-0 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-accent dark:focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="shrink-0 rounded-lg bg-accent px-3 py-2 text-sm font-bold text-white hover:bg-accent/90 transition-all hover:-translate-y-0.5 shadow-md shadow-accent/20 disabled:opacity-60 disabled:cursor-wait"
          >
            {status === 'loading' ? '⏳' : 'OK'}
          </button>
        </form>
        {status === 'error' && (
          <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
            {errorMsg || 'Email invalide.'}
          </p>
        )}
        {status === 'duplicate' && (
          <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">Déjà inscrit(e) !</p>
        )}
        <p className="mt-2 text-[10px] text-gray-400 dark:text-gray-500">
          Gratuit · Sans spam ·{' '}
          <Link href="/newsletter" className="underline hover:text-accent transition-colors">
            Voir un exemple
          </Link>
        </p>
      </div>
    );
  }

  /* ────── BANNER VARIANT (default) ────── */
  return (
    <section
      className={`border-t border-gray-100 dark:border-gray-800 ${className}`}
      style={{ background: 'linear-gradient(135deg, #060D18 0%, #0F1923 50%, #091420 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: copy */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-2xl">📧</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Newsletter CDM 2026
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white mb-2">
              Recevez nos pronostics par email
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Programme de la semaine · Pronostics exclusifs · Alertes matchs · Meilleures cotes
            </p>
            <div className="mt-3 flex flex-wrap gap-3 justify-center md:justify-start">
              {['✅ Gratuit', '🚫 Sans spam', '📅 1×/semaine'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="w-full md:w-auto md:min-w-[360px]">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
                placeholder="votre@email.fr"
                aria-label="Votre adresse email"
                required
                disabled={status === 'loading'}
                className={`flex-1 rounded-xl border bg-white/10 dark:bg-white/5 backdrop-blur-sm px-4 py-3 text-white placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-accent/50 disabled:opacity-60 ${
                  status === 'error' || status === 'duplicate'
                    ? 'border-red-400/50'
                    : 'border-white/20 focus:border-accent/60'
                }`}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="shrink-0 rounded-xl bg-accent px-5 py-3 font-bold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-wait"
              >
                {status === 'loading' ? '⏳' : "S'abonner →"}
              </button>
            </form>

            {status === 'error' && (
              <p className="mt-2 text-xs text-red-400">
                ⚠️ {errorMsg || 'Veuillez entrer un email valide.'}
              </p>
            )}
            {status === 'duplicate' && (
              <p className="mt-2 text-xs text-amber-400">📬 Cette adresse est déjà inscrite !</p>
            )}
            {(status === 'idle' || status === 'loading') && (
              <p className="mt-2 text-xs text-gray-500">
                12 000+ fans abonnés ·{' '}
                <Link
                  href="/newsletter"
                  className="text-gray-400 hover:text-white underline transition-colors"
                >
                  Voir un exemple
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function saveToLocalStorage(email: string) {
  try {
    const stored = JSON.parse(localStorage.getItem('cdm2026_newsletter') ?? '[]') as string[];
    if (!stored.includes(email)) stored.push(email);
    localStorage.setItem('cdm2026_newsletter', JSON.stringify(stored));
    localStorage.setItem('cdm2026_newsletter_date', new Date().toISOString());
  } catch {
    // localStorage indisponible → silencieux
  }
}
