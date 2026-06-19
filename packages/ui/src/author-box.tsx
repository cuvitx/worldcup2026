import Link from "next/link";

/**
 * AuthorBox component — Displays author information and methodology link.
 * 
 * @example
 * ```tsx
 * <AuthorBox />
 * ```
 */
export function AuthorBox({ lang = "fr" }: { lang?: "fr" | "de" } = {}) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
          EC
        </div>
        <div>
          <p className="font-bold text-gray-900">{lang === "de" ? "WM 2026 Team" : "Équipe CDM 2026"}</p>
          <p className="mt-1 text-sm text-gray-600 leading-relaxed">
            {lang === "de"
              ? "Unser Team kombiniert statistische Analyse (ELO-Modell), künstliche Intelligenz und Fußball-Expertise, um die zuverlässigsten Prognosen für die WM 2026 zu erstellen."
              : "Notre équipe combine analyse statistique (modèle ELO), intelligence artificielle et expertise football pour produire les pronostics les plus fiables de la Coupe du Monde 2026."}
          </p>
          <Link
            href={lang === "de" ? "/ueber-uns" : "/methodologie"}
            className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
          >
            {lang === "de" ? "Unsere Methodik entdecken \u2192" : "Découvrir notre méthodologie \u2192"}
          </Link>
        </div>
      </div>
    </section>
  );
}
