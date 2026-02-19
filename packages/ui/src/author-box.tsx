import Link from "next/link";

export function AuthorBox() {
  return (
    <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
          EC
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white">Équipe CDM 2026</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Notre équipe combine analyse statistique (modèle ELO), intelligence
            artificielle et expertise football pour produire les pronostics les
            plus fiables de la Coupe du Monde 2026.
          </p>
          <Link
            href="/methodologie"
            className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
          >
            Découvrir notre méthodologie &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
