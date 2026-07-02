import { getStaticAlternates } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import type { Metadata } from "next";
import Link from "next/link";
import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { top10Favorites } from "@repo/data/predictions-2026";
import { PmuCTA } from "../components/PmuCTA";
import { buildBracketData } from "./_components/bracket-data";
import { DesktopBracket, MobileBracket } from "./_components/BracketView";
import { ProbabilitiesTable } from "./_components/ProbabilitiesTable";
export const revalidate = 300;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tableau pronostic CDM 2026 | Projection bracket et favoris",
  description:
    "Projection du tableau final de la Coupe du Monde 2026 : 16es de finale, 8es de finale, quarts, demis et finale. Pronostics et equipes favorites pour chaque tour.",
  alternates: getStaticAlternates("bracket", "fr"),
  openGraph: {
    title: "Tableau pronostic - Coupe du Monde 2026",
    description: "Visualisez une projection du bracket de la phase a elimination directe du Mondial 2026.",
  },
};

export default async function BracketPage() {
  const sourceMatches = await enrichMatchesWithResults(matches, {});
  const bracketData = buildBracketData(sourceMatches);
  const { champion } = bracketData;
  const championTeam = champion ? teamsById[champion] : undefined;
  const championOdds = champion
    ? top10Favorites.find((fav) => fav.teamId === champion)?.pmuSport
    : undefined;

  const faqItems = [
    {
      question: "Comment fonctionne le tableau final de la Coupe du Monde 2026 ?",
      answer: "Le tableau final (bracket) de la CDM 2026 commence après la phase de groupes avec 32 équipes qualifiées (les 2 premiers de chaque groupe + les 8 meilleurs troisièmes). La phase à élimination directe comprend : 16es de finale (16 matchs), 8es de finale (8 matchs), quarts de finale (4 matchs), demi-finales (2 matchs), petite finale (match pour la 3e place) et grande finale. Chaque match à élimination directe se joue en un seul match ; en cas d'égalité après 90 minutes, il y a prolongation (2×15 min) puis tirs au but si nécessaire."
    },
    {
      question: "Quand commencent les 16es de finale de la CDM 2026 ?",
      answer: "Les 16es de finale débutent le 28 juin 2026, soit le lendemain de la fin de la phase de groupes. Les 16 matchs de ce premier tour à élimination directe se déroulent du 28 juin au 4 juillet. Les 8es de finale ont lieu du 4 au 7 juillet, les quarts du 9 au 12 juillet, les demi-finales les 14-15 juillet, la petite finale le 18 juillet et la grande finale le 19 juillet 2026 au MetLife Stadium de New York."
    },
    {
      question: "Quel est le favori pour remporter la CDM 2026 selon le bracket ?",
      answer: "Selon le bracket basé sur les classements ELO et les probabilités statistiques, la France est le grand favori pour remporter la Coupe du Monde 2026. Avec un effectif exceptionnel mené par Kylian Mbappé, une solidité défensive et une expérience des grandes compétitions (champion 2018, vice-champion 2022), les Bleus ont les meilleures chances. Le Brésil, l'Angleterre, l'Argentine et l'Espagne sont également des prétendants sérieux au titre."
    },
    {
      question: "Comment sont déterminés les appariements du tableau final ?",
      answer: "Les appariements du tableau final sont déterminés par le classement de la phase de groupes. Les premiers de groupe affrontent les deuxièmes ou troisièmes d'autres groupes selon un schéma prédéfini par la FIFA. Ce schéma est conçu pour éviter que deux équipes du même groupe se retrouvent avant les quarts de finale. Les matchs sont également répartis géographiquement entre les 16 stades pour limiter les déplacements et favoriser l'équité sportive."
    },
    {
      question: "Peut-on parier sur le tableau final de la CDM 2026 ?",
      answer: "Oui, PMU Sport propose des paris sur le tableau final : vainqueur de chaque match à élimination directe, score exact, qualification d'une équipe en quarts/demi/finale, et bien sûr le vainqueur final du tournoi. Les cotes évoluent en fonction des résultats de la phase de groupes. Les paris combinés permettent de parier sur plusieurs matchs simultanément pour des gains potentiels plus élevés. 18+, jouez responsablement."
    }
  ];

  return (
    <>
{/* Breadcrumbs */}
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Tableau pronostic CDM 2026</h1>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Projection de la phase a elimination directe : 16es de finale, 8es de finale,
            quarts de finale, demi-finales et finale. Pronostics bases sur les classements ELO,
            avec liens vers les cotes vainqueur et la phase finale officielle.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12">
        {/* Champion prediction */}
        {champion && teamsById[champion] && (
          <section className="rounded-xl border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50 p-6 text-center">
            <p className="text-sm font-medium text-accent uppercase tracking-wide mb-2">Champion prédit</p>
            <Link href={`/equipe/${teamsById[champion]!.slug}`} className="inline-flex items-center gap-3 hover:opacity-80">
              <span className="text-3xl sm:text-5xl" role="img" aria-label={`Drapeau de ${teamsById[champion]!.name}`}>{teamsById[champion]!.flag}</span>
              <span className="text-3xl font-extrabold text-gray-900">{teamsById[champion]!.name}</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">Base sur les classements ELO et les pronostics de la phase de groupes</p>
          </section>
        )}

        {/* CTA cotes champion — la projection convertit en decision de pari */}
        {championTeam && (
          <PmuCTA
            tracking={{ pageType: "tableau", slug: championTeam.slug, placement: "champion" }}
            heading={
              championOdds
                ? `${championTeam.name} champion : cote ${championOdds.toFixed(2)} chez PMU Play`
                : `Pariez sur ${championTeam.name} champion avec PMU Play`
            }
            subheading="1er pari remboursé en cash | Cotes vainqueur CDM 2026"
          />
        )}

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/phase-finale"
            className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Officiel</p>
            <p className="mt-1 text-sm font-bold text-gray-900">Phase finale et resultats</p>
            <p className="mt-1 text-xs text-gray-500">Vrais matchs, scores et horaires</p>
          </Link>
          <Link
            href="/pronostic/vainqueur"
            className="rounded-xl border border-accent/30 bg-accent/5 p-4 transition-all hover:border-accent hover:shadow-md"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-accent">Vainqueur final</p>
            <p className="mt-1 text-sm font-bold text-gray-900">Pronostic champion CDM 2026</p>
            <p className="mt-1 text-xs text-gray-500">Favoris, outsiders et value bets</p>
          </Link>
          {champion && teamsById[champion] && (
            <Link
              href={`/cote-champion/${teamsById[champion]!.slug}`}
              className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-primary">Cote favorite</p>
              <p className="mt-1 text-sm font-bold text-gray-900">Cote {teamsById[champion]!.name} championne</p>
              <p className="mt-1 text-xs text-gray-500">Analyse de la cote et du parcours</p>
            </Link>
          )}
          <Link
            href="/comparateur-cotes"
            className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Comparer</p>
            <p className="mt-1 text-sm font-bold text-gray-900">Comparateur de cotes</p>
            <p className="mt-1 text-xs text-gray-500">Voir les marchés clés du Mondial</p>
          </Link>
        </section>

        <section className="rounded-xl border border-primary/15 bg-primary/5 p-5 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                Tableau et cotes Coupe du Monde 2026
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                Lire le bracket avec les favoris du marche
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Le tableau pronostic aide a visualiser les parcours possibles.
                Pour convertir cette projection en decision de pari, comparez les
                cotes vainqueur, les probabilites et le calendrier officiel des
                matchs de phase finale.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Link
                href="/cote-champion/france"
                className="rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-primary hover:border-primary hover:bg-primary hover:text-white"
              >
                Cote France
              </Link>
              <Link
                href="/cote-champion/portugal"
                className="rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-primary hover:border-primary hover:bg-primary hover:text-white"
              >
                Cote Portugal
              </Link>
              <Link
                href="/pronostic/vainqueur"
                className="rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-primary hover:border-primary hover:bg-primary hover:text-white"
              >
                Pronostic vainqueur
              </Link>
            </div>
          </div>
        </section>

        <DesktopBracket data={bracketData} />
        <MobileBracket data={bracketData} />
        <ProbabilitiesTable />

        {/* SEO text removed — covered by FAQ section below */}
      </div>

      <FAQSection title="Questions sur le tableau final" items={faqItems} />
    </>
  );
}
