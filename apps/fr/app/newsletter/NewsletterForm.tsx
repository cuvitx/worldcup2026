'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setErrorMsg('Veuillez entrer une adresse email valide.');
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

      const data = (await res.json()) as { success?: boolean; error?: string; message?: string };

      if (res.status === 409) {
        // Duplicate — stocker quand même dans localStorage
        saveToLocalStorage(trimmed);
        setStatus('duplicate');
        return;
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'Erreur inconnue');
      }

      // ── Succès API ────────────────────────────────────────────────────────
      saveToLocalStorage(trimmed);
      setStatus('success');
      setEmail('');
      return;
    } catch (err) {
      // API call failed, falling back to localStorage
      void err;
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

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 rounded-xl border border-accent/30 dark:border-accent/20 bg-accent/10 dark:bg-accent/10 ${compact ? 'p-3' : 'p-5'}`}>
        <span className="text-2xl"></span>
        <div>
          <p className={`font-bold text-accent dark:text-accent ${compact ? 'text-sm' : 'text-base'}`}>
            Inscription confirmée !
          </p>
          {!compact && (
            <p className="text-sm text-accent dark:text-accent/80 mt-0.5">
              Vous recevrez notre newsletter chaque semaine dès le coup d&apos;envoi de la CDM 2026.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex ${compact ? 'flex-row gap-2' : 'flex-col sm:flex-row gap-3'} w-full`}>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
          placeholder="votre@email.fr"
          aria-label="Votre adresse email"
          required
          disabled={status === 'loading'}
          className={`flex-1 rounded-lg border bg-white dark:bg-slate-800 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all focus:ring-2 focus:ring-primary/50 disabled:opacity-60 ${
            status === 'error' || status === 'duplicate'
              ? 'border-red-300 dark:border-red-700'
              : 'border-gray-300 dark:border-gray-600'
          } ${compact ? 'py-2 text-sm' : 'py-3 text-base'}`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`shrink-0 rounded-xl bg-accent font-bold text-white transition-all hover:bg-accent/80 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-wait ${
            compact ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'
          }`}
        >
          {status === 'loading' ? '' : compact ? "S'abonner" : ' Recevoir la newsletter'}
        </button>
      </div>

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {errorMsg || 'Veuillez entrer une adresse email valide.'}
        </p>
      )}
      {status === 'duplicate' && (
        <p className="mt-2 text-xs text-accent dark:text-accent">
           Cette adresse est déjà inscrite. À très bientôt !
        </p>
      )}
      {!compact && (status === 'idle' || status === 'loading') && (
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-400">
          Gratuit · Sans spam · Désinscription en 1 clic
        </p>
      )}
    </form>
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
    // localStorage indisponible (SSR, mode privé strict) → silencieux
  }
}
