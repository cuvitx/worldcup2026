import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import CalendarViewWrapper from "./CalendarViewWrapper";
import { FileText } from "lucide-react";
import { RelatedLinks } from "../../components/RelatedLinks";

const CalendarFilters = dynamic(() => import("./CalendarFilters"), {
  loading: () => (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-200gray-700 rounded-lg w-full" />
        <div className="h-64 bg-gray-200gray-700 rounded-lg w-full" />
      </div>
    </div>
  ),
});

const CalendarGrid = dynamic(() => import("./CalendarGrid"), {
  loading: () => (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-64 bg-gray-200gray-700 rounded-lg w-full" />
      </div>
    </div>
  ),
});

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
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Calendrier des matchs" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
<section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Calendrier des matchs</h1>
          <p className="mt-2 text-gray-300">
            104 matchs du 11 juin au 19 juillet 2026
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href="/api/calendar"
              download="cdm2026.ics"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              Calendrier
            </a>
            <a
              href="/calendrier/imprimer"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              <FileText className="w-4 h-4" />
              PDF
            </a>
          </div>
        </div>
      </section>

      <CalendarViewWrapper
        matches={matchData}
        teamsById={teamData}
        stadiumsById={stadiumData}
        CalendarFilters={CalendarFilters}
        CalendarGrid={CalendarGrid}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <RelatedLinks
          variant="compact"
          links={[
            {
              href: "/groupes",
              title: " Les 12 groupes",
              description: "Composition et classements de la phase de groupes.",
              icon: ""
            },
            {
              href: "/stades",
              title: " Les 16 stades",
              description: "Découvrez les stades qui accueilleront les matchs.",
              icon: ""
            },
            {
              href: "/ou-regarder",
              title: " Où regarder",
              description: "Chaînes TV et streaming pour suivre tous les matchs.",
              icon: ""
            }
          ]}
        />
      </div>

      {/* ===== FAQ ===== */}
      <section className="bg-gray-50slate-900/50 py-12 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Questions fréquentes — Calendrier CDM 2026
          </h2>
          <div className="space-y-3">
            {faqCalendrierItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-whiteslate-800 overflow-hidden"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 hover:text-primary transition-colors list-none">
                    {item.question}
                    <span className="ml-4 shrink-0 text-gray-600 group-open:rotate-45 transition-transform">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
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
