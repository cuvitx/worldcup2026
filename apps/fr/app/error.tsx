"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting in production
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center bg-gray-50 dark:bg-slate-900">
      {/* Icône animée */}
      <div className="relative mb-8">
        <div className="text-7xl animate-pulse select-none" aria-hidden="true">
          ⚠️
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-gold/30 blur-sm" />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-semibold mb-6">
        🟡 Carton Jaune — Incident technique
      </div>

      {/* Message principal */}
      <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
        Le VAR a détecté un problème !
      </h1>

      <p className="text-gray-500 dark:text-gray-300 text-base max-w-md mb-2">
        Une erreur inattendue s&apos;est produite. Notre équipe technique est
        déjà sur le terrain pour intervenir.
      </p>

      {/* Code d'erreur (discret) */}
      {error?.message && (
        <p className="text-xs text-gray-300 dark:text-gray-600 font-mono mt-2 mb-8 max-w-sm break-words">
          {error.message}
        </p>
      )}
      {!error?.message && <div className="mb-8" />}

      {/* Séparateur terrain */}
      <div className="w-full max-w-xs h-px rounded-full bg-gradient-to-r from-transparent via-gray-200 dark:via-slate-700 to-transparent mb-8" />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 hover:shadow-primary/50 transition-all hover:-translate-y-0.5 text-sm"
        >
          🔄 Réessayer
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-7 py-3.5 font-bold text-gray-700 dark:text-gray-200 shadow-sm hover:border-primary/30 hover:text-primary dark:hover:border-primary/30 dark:hover:text-primary transition-all hover:-translate-y-0.5 text-sm"
        >
          🏠 Retour à l&apos;accueil
        </a>
      </div>

      {/* Message rassureur */}
      <p className="mt-10 text-xs text-gray-400 dark:text-gray-600">
        Si le problème persiste,{" "}
        <a
          href="/contact"
          className="underline underline-offset-2 hover:text-primary transition-colors"
        >
          contactez-nous
        </a>
        .
      </p>
    </div>
  );
}
