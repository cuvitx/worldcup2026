import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import CalendarFilters from "./CalendarFilters";

const faqCalendrierItems = [
  {
    question: "Quand commence la Coupe du Monde 2026 ?",
    answer:
      "La Coupe du Monde 2026 débute le 11 juin 2026 avec le match d'ouverture au stade Azteca de Mexico (Mexique). La finale est prévue le 19 juillet 2026 au MetLife Stadium de New York/New Jersey. Le tournoi s'étend donc sur 39 jours.",
  },
  {
    question: "Combien de matchs compte la CDM 2026 ?",
    answer:
      "La Coupe du Monde 2026 comprend 104 matchs au total : 72 matchs de phase de groupes (12 groupes × 3 matchs + 1 match par groupe), 32 matchs à élimination directe (huitièmes, quarts, demi-finales, match pour la 3e place et finale). C'est 40 matchs de plus que les éditions à 32 équipes.",
  },
  {
    question: "Quelle chaîne diffuse la CDM 2026 en France ?",
    answer:
      "En France, les droits de diffusion de la Coupe du Monde 2026 sont partagés entre TF1 et M6 pour les matchs en clair (dont tous les matchs de l'équipe de France), et beIN Sports pour une couverture intégrale. Les matchs peuvent également être suivis en streaming via les applications de ces chaînes.",
  },
  {
    question: "Où se déroulent les matchs de l'équipe de France ?",
    answer:
      "Les matchs de phase de groupes de la France (Groupe I) se jouent aux États-Unis : au MetLife Stadium (New York/NJ, ~82 500 places), au Lincoln Financial Field (Philadelphia, ~69 000 places) et au Gillette Stadium (Boston, ~65 000 places). En cas de qualification, les matchs à élimination directe peuvent avoir lieu dans d'autres villes hôtes.",
  },
];

export const metadata: Metadata = {
  title: "Calendrier des matchs - Coupe du Monde 2026",
  description:
    "Calendrier complet des 104 matchs de la Coupe du Monde 2026. Phase de groupes, huitièmes, quarts, demi-finales et finale. Du 11 juin au 19 juillet 2026.",
  alternates: getStaticAlternates("matchSchedule", "fr"),
};

export default function CalendrierPage() {
  // Serialize data for client component
  const matchData = matches.map((m) => ({
    id: m.id,
    slug: m.slug,
    homeTeamId: m.homeTeamId,
    awayTeamId: m.awayTeamId,
    date: m.date,
    time: m.time,
    stadiumId: m.stadiumId,
    stage: m.stage,
    group: m.group,
  }));

  const teamData: Record<string, { id: string; name: string; flag: string }> = {};
  for (const [id, t] of Object.entries(teamsById)) {
    if (t) teamData[id] = { id: t.id, name: t.name, flag: t.flag };
  }

  const stadiumData: Record<string, { id: string; name: string }> = {};
  for (const [id, s] of Object.entries(stadiumsById)) {
    if (s) stadiumData[id] = { id: s.id, name: s.name };
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCalendrierItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Calendrier des matchs</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Calendrier des matchs</h1>
          <p className="mt-2 text-gray-300">
            104 matchs du 11 juin au 19 juillet 2026
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/api/calendar"
              download="cdm2026.ics"
              className="inline-flex items-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors backdrop-blur-sm"
            >
              📅 Ajouter au calendrier
            </a>
            <a
              href="/calendrier/imprimer"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors backdrop-blur-sm"
            >
              📄 Télécharger le calendrier PDF
            </a>
          </div>
        </div>
      </section>

      <CalendarFilters
        matches={matchData}
        teamsById={teamData}
        stadiumsById={stadiumData}
      />

      {/* ===== FAQ ===== */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ❓ Questions fréquentes — Calendrier CDM 2026
          </h2>
          <div className="space-y-3">
            {faqCalendrierItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white hover:text-accent transition-colors list-none">
                    {item.question}
                    <span className="ml-4 shrink-0 text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-slate-700 pt-3">
                    {item.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
