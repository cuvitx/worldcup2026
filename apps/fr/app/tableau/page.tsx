import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { teamsById } from "@repo/data/teams";
import { champion } from "./_components/bracket-data";
import { DesktopBracket, MobileBracket } from "./_components/BracketView";
import { ProbabilitiesTable } from "./_components/ProbabilitiesTable";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tableau final CDM 2026 | Bracket et phase a elimination directe",
  description:
    "Tableau final de la Coupe du Monde 2026 : bracket complet des 32e, 16e, quarts, demis et finale. Pronostics et équipes favorites pour chaque tour.",
  alternates: getStaticAlternates("bracket", "fr"),
  openGraph: {
    title: "Tableau final - Coupe du Monde 2026",
    description: "Visualisez le bracket complet de la phase a elimination directe du Mondial 2026.",
  },
};

export default function BracketPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Tableau final</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Tableau final CDM 2026</h1>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Bracket complet de la phase a elimination directe : 32e de finale, 16e de finale,
            quarts de finale, demi-finales et finale. Pronostics bases sur les classements ELO.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12">
        {/* Champion prediction */}
        {champion && teamsById[champion] && (
          <section className="rounded-xl border-2 border-yellow-400 dark:border-yellow-600 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 p-6 text-center">
            <p className="text-sm font-medium text-accent dark:text-accent uppercase tracking-wide mb-2">🏆 Champion prédit</p>
            <Link href={`/equipe/${teamsById[champion]!.slug}`} className="inline-flex items-center gap-3 hover:opacity-80">
              <span className="text-3xl sm:text-5xl" role="img" aria-label={`Drapeau de ${teamsById[champion]!.name}`}>{teamsById[champion]!.flag}</span>
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{teamsById[champion]!.name}</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">Base sur les classements ELO et les pronostics de la phase de groupes</p>
          </section>
        )}

        <DesktopBracket />
        <MobileBracket />
        <ProbabilitiesTable />

        {/* SEO text */}
        <section className="prose max-w-none">
          <h2>Comment fonctionne le tableau final de la Coupe du Monde 2026 ?</h2>
          <p>
            La Coupe du Monde 2026 accueille 48 équipes reparties en 12 groupes de 4. A l&#39;issue de la phase de
            groupes, les deux premiers de chaque groupe (24 équipes) et les 8 meilleurs troisièmes se qualifient
            pour la phase a elimination directe, soit 32 équipes au total.
          </p>
          <p>
            Le tableau final commence par les 32e de finale (16 matchs), suivis des 16e de finale (8 matchs),
            des quarts de finale (4 matchs), des demi-finales (2 matchs), et enfin la grande finale au
            MetLife Stadium de New York le 19 juillet 2026.
          </p>
          <h3>Pronostics du bracket</h3>
          <p>
            Les pronostics affiches sur cette page sont bases sur les classements ELO des équipes. L&#39;équipe
            avec le meilleur classement ELO est predite comme vainqueur de chaque confrontation. Ces pronostics
            seront mis à jour au fur et a mesure de l&#39;avancée du tournoi avec les résultats réels.
          </p>
        </section>
      </div>
    </>
  );
}
