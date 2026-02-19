'use client';

import { useState } from 'react';

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    try {
      const stored = JSON.parse(localStorage.getItem('cdm2026_newsletter') ?? '[]') as string[];
      if (stored.includes(email.toLowerCase())) {
        setStatus('duplicate');
        return;
      }
      stored.push(email.toLowerCase());
      localStorage.setItem('cdm2026_newsletter', JSON.stringify(stored));
      localStorage.setItem('cdm2026_newsletter_date', new Date().toISOString());
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 rounded-xl border border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-900/20 ${compact ? 'p-3' : 'p-5'}`}>
        <span className="text-2xl">✅</span>
        <div>
          <p className={`font-bold text-green-700 dark:text-green-400 ${compact ? 'text-sm' : 'text-base'}`}>
            Inscription confirmée !
          </p>
          {!compact && (
            <p className="text-sm text-green-600 dark:text-green-500 mt-0.5">
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
          onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
          placeholder="votre@email.fr"
          aria-label="Votre adresse email"
          required
          className={`flex-1 rounded-lg border bg-white dark:bg-gray-800 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all focus:ring-2 focus:ring-accent/50 ${
            status === 'error' || status === 'duplicate'
              ? 'border-red-300 dark:border-red-700'
              : 'border-gray-300 dark:border-gray-600'
          } ${compact ? 'py-2 text-sm' : 'py-3 text-base'}`}
        />
        <button
          type="submit"
          className={`shrink-0 rounded-lg bg-accent font-bold text-white shadow-md shadow-accent/30 transition-all hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg ${
            compact ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'
          }`}
        >
          {compact ? 'S\'abonner' : '📧 Recevoir la newsletter'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          ⚠️ Veuillez entrer une adresse email valide.
        </p>
      )}
      {status === 'duplicate' && (
        <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
          📬 Cette adresse est déjà inscrite. À très bientôt !
        </p>
      )}
      {!compact && status === 'idle' && (
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          Gratuit · Sans spam · Désinscription en 1 clic
        </p>
      )}
    </form>
  );
}
