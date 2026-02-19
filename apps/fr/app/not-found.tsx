import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[80vh] px-4 py-16 text-center bg-gray-50 dark:bg-slate-900">
      {/* Animated red card + ball */}
      <div className="relative mb-8 flex items-center justify-center gap-4">
        {/* Ballon qui rebondit */}
        <div className="animate-bounce text-7xl select-none" aria-hidden="true">
          ⚽
        </div>
        {/* Carton rouge */}
        <div
          className="relative flex-shrink-0 w-20 h-28 rounded-lg bg-accent shadow-2xl shadow-accent/40"
          style={{ transform: "rotate(12deg)" }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-500 to-red-700" />
          <div className="absolute bottom-3 left-0 right-0 text-center text-white text-xs font-bold tracking-widest">
            404
          </div>
        </div>
      </div>

      {/* Badge arbitre */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-semibold mb-6">
        🟥 Carton Rouge
      </div>

      {/* Titre principal */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
        Cette page a pris{" "}
        <span className="text-accent">un carton rouge</span> !
      </h1>

      {/* Sous-titre fun */}
      <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mb-3">
        L&apos;arbitre a expulsé cette URL du terrain. Elle ne joue plus pour
        cette équipe.
      </p>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-10 font-mono">
        Erreur 404 — Page introuvable
      </p>

      {/* Terrain / séparateur décoratif */}
      <div className="w-full max-w-sm h-1 rounded-full bg-gradient-to-r from-transparent via-field to-transparent mb-10 opacity-50" />

      {/* Liens utiles */}
      <p className="text-sm text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-5">
        Retour sur le terrain
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full">
        <Link
          href="/"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 font-semibold text-sm shadow-sm hover:border-accent hover:text-accent dark:hover:border-accent dark:hover:text-accent transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <span className="text-2xl">🏠</span>
          Accueil
        </Link>
        <Link
          href="/calendrier"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 font-semibold text-sm shadow-sm hover:border-accent hover:text-accent dark:hover:border-accent dark:hover:text-accent transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <span className="text-2xl">📅</span>
          Calendrier
        </Link>
        <Link
          href="/equipes"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 font-semibold text-sm shadow-sm hover:border-accent hover:text-accent dark:hover:border-accent dark:hover:text-accent transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <span className="text-2xl">🌍</span>
          Équipes
        </Link>
        <Link
          href="/recherche"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 font-semibold text-sm shadow-sm hover:border-accent hover:text-accent dark:hover:border-accent dark:hover:text-accent transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <span className="text-2xl">🔍</span>
          Recherche
        </Link>
      </div>

      {/* CTA principal */}
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 hover:shadow-accent/50 transition-all hover:-translate-y-0.5 text-sm"
      >
        ← Retour à l&apos;accueil
      </Link>
    </div>
  );
}
