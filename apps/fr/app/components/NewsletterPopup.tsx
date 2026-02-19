'use client';

import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY_DISMISSED = 'cdm2026_newsletter_popup_dismissed';
const STORAGE_KEY_SUBSCRIBED = 'newsletter-subscribed';
const DISMISS_DAYS = 7;

export function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const shouldShow = useCallback((): boolean => {
    try {
      if (localStorage.getItem(STORAGE_KEY_SUBSCRIBED)) return false;
      const dismissed = localStorage.getItem(STORAGE_KEY_DISMISSED);
      if (dismissed) {
        const ts = parseInt(dismissed, 10);
        if (Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000) return false;
      }
      return true;
    } catch {
      return false;
    }
  }, []);

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      localStorage.setItem(STORAGE_KEY_DISMISSED, String(Date.now()));
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    if (!shouldShow()) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setShow(true);
    };

    // Timer: 60s
    const timer = setTimeout(trigger, 60000);

    // Scroll: 50%
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPct >= 0.5) trigger();
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [shouldShow]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.ok || res.status === 409) {
        setStatus('success');
        try {
          localStorage.setItem(STORAGE_KEY_SUBSCRIBED, 'true');
        } catch { /* noop */ }
        setTimeout(() => setShow(false), 3000);
        return;
      }
      throw new Error('fail');
    } catch {
      setStatus('error');
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-6 shadow-2xl">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 rounded-full p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Fermer"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <span className="text-5xl block mb-3">✅</span>
            <p className="text-lg font-bold text-gray-900 dark:text-white">Inscription confirmée !</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              À très bientôt dans votre boîte mail.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <span className="text-4xl block mb-2">⚽📬</span>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                Ne manquez rien de la CDM 2026
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Pronostics, analyses et actus chaque semaine. Gratuit, sans spam.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                placeholder="votre@email.fr"
                aria-label="Votre adresse email"
                required
                disabled={status === 'loading'}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-lg bg-accent py-3 text-sm font-bold text-white shadow-md shadow-primary/30 hover:bg-primary/90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-wait"
              >
                {status === 'loading' ? '⏳ Inscription...' : '📧 Je m\'abonne gratuitement'}
              </button>
            </form>

            {status === 'error' && (
              <p className="mt-2 text-center text-xs text-red-500">
                ⚠️ Veuillez entrer un email valide ou réessayer.
              </p>
            )}

            <p className="mt-3 text-center text-[10px] text-gray-400 dark:text-gray-500">
              Désinscription en 1 clic · Pas de spam, promis 🤞
            </p>
          </>
        )}
      </div>
    </div>
  );
}
