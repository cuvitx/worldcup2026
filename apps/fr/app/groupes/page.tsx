import { HeroSection } from "@repo/ui/hero-section";
import { FAQSection } from "@repo/ui/faq-section";
import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teamsById } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";
import { RelatedLinks } from "../components/RelatedLinks";
export const metadata: Metadata = {
  title: "Les 12 groupes de la Coupe du Monde 2026 | Classement & Pronostics",
  description:
    "Tous les groupes de la Coupe du Monde 2026 (A à L). Classement, équipes qualifiées, calendrier des matchs et pronostics pour chaque groupe.",
  alternates: getStaticAlternates("teams", "fr"),
  openGraph: {
    title: "Les 12 groupes - Coupe du Monde 2026",
    description: "Groupes A à L de la CDM 2026 avec classement et pronostics.",
  },
};

export default function GroupsPage() {
  const faqItems = [
    {
      question: "Combien de groupes y a-t-il dans la Coupe du Monde 2026 ?",
      answer: "La Coupe du Monde 2026 compte 12 groupes (de A à L). Chaque groupe est composé de 4 équipes, soit un total de 48 équipes participantes. C'est la première fois que le format passe de 32 à 48 équipes."
    },
    {
      question: "Combien d'équipes se qualifient par groupe ?",
      answer: "Les 2 premières équipes de chaque groupe se qualifient automatiquement pour les huitièmes de finale, soit 24 équipes. En plus de ces 24 équipes, les 8 meilleurs troisièmes parmi l'ensemble des 12 groupes se qualifient également, portant le total à 32 équipes qualifiées pour la phase à élimination directe."
    },
    {
      question: "Comment sont déterminés les meilleurs troisièmes ?",
      answer: "Les 8 meilleurs troisièmes sont classés selon les critères FIFA : nombre de points, puis différence de buts, puis nombre de buts marqués, puis fair-play, puis tirage au sort en dernier recours. Seuls les 8 meilleurs troisièmes sur les 12 groupes se qualifient."
    },
    {
      question: "Quels sont les groupes les plus relevés de la CDM 2026 ?",
      answer: "Les groupes les plus difficiles sont généralement ceux qui comportent plusieurs équipes du top 15 mondial. Le Groupe G (Espagne, Pays-Bas) et le Groupe H (Portugal, Danemark) sont considérés comme des « groupes de la mort  avec plusieurs favoris. La composition des groupes dépend du tirage au sort effectué fin 2025."
    },
    {
      question: "Quand se joue la phase de groupes de la CDM 2026 ?",
      answer: "La phase de groupes se déroule du 11 juin au 27 juin 2026. Chaque équipe joue 3 matchs de poule (un contre chaque adversaire de son groupe). Les matchs sont répartis sur les 16 stades des trois pays hôtes : États-Unis, Canada et Mexique."
    }
  ];

  return (
    <>
<HeroSection
        badge="Phase de groupes"
        title="Les 12 groupes de la CDM 2026"
        subtitle="48 équipes réparties en 12 groupes de 4. Les 2 premiers de chaque groupe et les 8 meilleurs 3e sont qualifiés."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const groupTeams = group.teams
              .map((id) => {
                const team = teamsById[id];
                const pred = predictionsByTeamId[id];
                return { team, pred, id };
              })
              .sort((a, b) => (b.pred?.eloRating ?? 0) - (a.pred?.eloRating ?? 0));

            return (
              <Link
                key={group.letter}
                href={`/groupe/${group.slug}`}
                className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
              >
                {/* Header */}
                <div className="hero-animated px-4 py-3 flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-accent">
                    Groupe {group.letter}
                  </h2>
                  <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                    Voir détails →
                  </span>
                </div>

                {/* Teams table */}
                <div className="divide-y divide-gray-100">
                  {groupTeams.map(({ team, pred, id }, idx) => {
                    const isQualified = idx < 2;
                    return (
                      <div
                        key={id}
                        className={`flex items-center gap-3 px-4 py-3 text-sm ${
                          isQualified
                            ? "bg-accent/5"
                            : ""
                        }`}
                      >
                        <span className="w-5 text-center text-xs font-bold text-gray-600">
                          {idx + 1}
                        </span>
                        <span className="text-xl" role="img" aria-label={team?.name ?? id}>
                          {team?.flag ?? ""}
                        </span>
                        <span className={`flex-1 font-medium break-words text-sm ${
                          isQualified 
                            ? "text-accent" 
                            : "text-gray-800"
                        }`}>
                          {team?.name ?? id}
                        </span>
                        {team && (
                          <span className="text-xs text-gray-500">
                            #{team.fifaRanking}
                          </span>
                        )}
                        {pred && (
                          <span className="text-xs font-bold text-primary tabular-nums">
                            {(pred.groupStageProb * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded bg-accent/10 border border-accent/30" />
            Qualifié (top 2)
          </span>
          <span>% = chances de sortie de groupe</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedLinks
          variant="compact"
          links={[
            {
              href: "/equipe",
              title: "Toutes les équipes",
              description: "Découvrez les 48 équipes qualifiées avec stats et pronostics.",
              icon: ""
            },
            {
              href: "/match/calendrier",
              title: " Calendrier des matchs",
              description: "Tous les matchs de la phase de groupes avec dates et horaires.",
              icon: ""
            },
            {
              href: "/pronostic/vainqueur",
              title: "Pronostic vainqueur",
              description: "Nos prédictions et cotes pour le vainqueur de la CDM 2026.",
              icon: ""
            }
          ]}
        />
      </div>

      <FAQSection title="Questions fréquentes sur les groupes" items={faqItems} />
    </>
  );
}
