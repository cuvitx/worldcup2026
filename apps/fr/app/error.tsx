"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[80vh] px-4 py-16 text-center bg-gray-50 dark:bg-slate-900">
      {/* Carton jaune animé */}
      <div className="relative mb-8 flex items-end justify-center gap-6 h-36">
        <div className="flex flex-col items-center" aria-hidden="true">
          <span
            className="text-7xl select-none"
            style={{ animation: "ball-kick 1.1s cubic-bezier(.36,.07,.19,.97) infinite" }}
          >
            
          </span>
          <div
            className="w-12 h-2 rounded-full bg-black/10 dark:bg-black/30 blur-sm mt-1"
            style={{ animation: "ball-shadow 1.1s cubic-bezier(.36,.07,.19,.97) infinite" }}
          />
        </div>

        <div
          className="relative flex-shrink-0 w-16 h-24 rounded-lg shadow-2xl mb-1"
          style={{ animation: "card-wave 1.4s ease-in-out infinite" }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 shadow-yellow-500/40 shadow-xl" />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-2 left-0 right-0 text-center text-white/90 text-[10px] font-black tracking-widest">
            ERREUR
          </div>
        </div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent//10 border border-accent//20 text-accent text-sm font-semibold mb-6">
        🟨 Carton Jaune — Faute technique
      </div>

      {/* Titre */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
        Carton jaune&nbsp;!{" "}
        <span className="text-primary">Une erreur technique</span> est survenue
      </h1>

      {/* Sous-titre */}
      <p className="text-gray-500 dark:text-gray-300 text-lg max-w-md mb-3">
        L&apos;arbitre a sifflé une faute technique. Pas de panique, on peut reprendre le jeu.
      </p>
      {error.digest && (
        <p className="text-gray-400 dark:text-gray-500 text-xs mb-6 font-mono">
          Réf : {error.digest}
        </p>
      )}

      {/* Séparateur terrain */}
      <div className="w-full max-w-sm h-1 rounded-full bg-gradient-to-r from-transparent via-secondary//40 to-transparent mb-10" />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-white shadow-lg shadow-primary//30 hover:bg-primary//90 hover:shadow-primary//50 transition-all hover:-translate-y-0.5 text-sm cursor-pointer"
        >
          🔄 Réessayer
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-8 py-3.5 font-bold text-gray-700 dark:text-gray-200 shadow-sm hover:border-primary//30 hover:text-primary dark:hover:border-primary//30 dark:hover:text-secondary transition-all hover:-translate-y-0.5 text-sm"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>

      {/* Animations CSS custom */}
      <style>{`
        @keyframes ball-kick {
          0%   { transform: translateY(0)    rotate(0deg)   scale(1); }
          20%  { transform: translateY(-40px) rotate(60deg)  scale(1.05); }
          40%  { transform: translateY(0)    rotate(120deg) scale(0.92) scaleY(0.88); }
          55%  { transform: translateY(-16px) rotate(160deg) scale(1.02); }
          70%  { transform: translateY(0)    rotate(200deg) scale(0.96) scaleY(0.94); }
          85%  { transform: translateY(-5px)  rotate(220deg) scale(1); }
          100% { transform: translateY(0)    rotate(240deg) scale(1); }
        }
        @keyframes ball-shadow {
          0%   { transform: scaleX(1);   opacity: 0.25; }
          20%  { transform: scaleX(0.5); opacity: 0.08; }
          40%  { transform: scaleX(1);   opacity: 0.25; }
          55%  { transform: scaleX(0.7); opacity: 0.15; }
          70%  { transform: scaleX(1);   opacity: 0.25; }
          85%  { transform: scaleX(0.85);opacity: 0.20; }
          100% { transform: scaleX(1);   opacity: 0.25; }
        }
        @keyframes card-wave {
          0%, 100% { transform: rotate(10deg)  translateY(0); }
          25%       { transform: rotate(14deg)  translateY(-4px); }
          50%       { transform: rotate(8deg)   translateY(2px); }
          75%       { transform: rotate(12deg)  translateY(-2px); }
        }
      `}</style>
    </div>
  );
}
