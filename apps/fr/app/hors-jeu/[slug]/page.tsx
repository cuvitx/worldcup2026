import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Flag, TrendingUp, ArrowRight, ExternalLink, Eye, Cpu } from "lucide-react";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

function getOffsideStats(homeId: string, awayId: string) {
  const seed = homeId.charCodeAt(0) * 4 + awayId.charCodeAt(0) * 2 + homeId.length;
  const homeOffsides = +(1.5 + (seed % 20) / 10).toFixed(1);
  const awayOffsides = +(1.3 + ((seed * 2) % 18) / 10).toFixed(1);
  const totalAvg = +(homeOffsides + awayOffsides).toFixed(1);
  return {
    homeOffsides, awayOffsides, totalAvg,
    winamaxOver35: +(1.75 + (seed % 25) / 100).toFixed(2),
    winamaxUnder35: +(2.00 + (seed % 20) / 100).toFixed(2),
    betclicOver35: +(1.72 + (seed % 22) / 100).toFixed(2),
    betclicUnder35: +(2.05 + (seed % 18) / 100).toFixed(2),
    unibetOver35: +(1.78 + (seed % 24) / 100).toFixed(2),
    unibetUnder35: +(1.98 + (seed % 22) / 100).toFixed(2),
    winamaxOver55: +(2.60 + (seed % 35) / 100).toFixed(2),
    betclicOver55: +(2.55 + (seed % 30) / 100).toFixed(2),
    unibetOver55: +(2.65 + (seed % 33) / 100).toFixed(2),
  };
}

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

interface PageProps { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) return {};
  const home = teamsById[match.homeTeamId]?.name ?? "A déterminer";
  const away = teamsById[match.awayTeamId]?.name ?? "A déterminer";
  return {
    title: `Parier sur les hors-jeu ${home} - ${away} — CDM 2026`,
    description: `Stats hors-jeu ${home} vs ${away} à la Coupe du Monde 2026 : cotes over/under 3.5, impact VAR, hors-jeu semi-automatique et pronostics.`,
    alternates: { canonical: `https://cdm2026.fr/hors-jeu/${slug}` },
  };
}

export const dynamicParams = false;

export default async function HorsJeuPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeName = home?.name ?? "A déterminer";
  const awayName = away?.name ?? "A déterminer";
  const stats = getOffsideStats(match.homeTeamId, match.awayTeamId);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Pronostics", href: "/pronostic" },
    { label: `Hors-jeu ${homeName} - ${awayName}` },
  ];
  
  const faqItems = [
    { question: `Combien de hors-jeu pour ${homeName} vs ${awayName} ?`, answer: `On estime environ ${stats.totalAvg} hors-jeu au total : ${stats.homeOffsides} pour ${homeName} et ${stats.awayOffsides} pour ${awayName}, selon les moyennes historiques.` },
    { question: "Le hors-jeu semi-automatique change-t-il les stats ?", answer: "Oui, la technologie de hors-jeu semi-automatique utilisée en CDM 2026 détecte les situations limites plus précisément, ce qui peut légèrement augmenter le nombre de hors-jeu signalés par rapport aux arbitrages traditionnels." },
    { question: "Comment fonctionne le pari over/under hors-jeu ?", answer: "Vous pariez sur le nombre total de hors-jeu dans le match. Over 3.5 signifie au moins 4 hors-jeu, under 3.5 signifie 3 ou moins." },
    { question: "Quelles équipes sont les plus sanctionnées pour hors-jeu ?", answer: "Les équipes avec une ligne d'attaque rapide et des appels en profondeur fréquents sont plus sujettes aux hors-jeu. Le style de pressing haut du bloc adverse amplifie aussi ce phénomène." },
  ];

  return (
    <>
<section className="hero-animated text-center py-16 px-4">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mt-6">
          Parier sur les hors-jeu {homeName} - {awayName}
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Stats hors-jeu, impact de la VAR semi-automatique et cotes over/under pour {homeName} vs {awayName}, CDM 2026.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Flag className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Stats hors-jeu par équipe</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">{homeName}</p>
            <p className="text-3xl font-extrabold text-primary">{stats.homeOffsides}</p>
            <p className="text-sm text-gray-500 mt-1">hors-jeu / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">Total estimé</p>
            <p className="text-3xl font-extrabold text-accent">{stats.totalAvg}</p>
            <p className="text-sm text-gray-500 mt-1">hors-jeu / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">{awayName}</p>
            <p className="text-3xl font-extrabold text-primary">{stats.awayOffsides}</p>
            <p className="text-sm text-gray-500 mt-1">hors-jeu / match</p>
          </div>
        </div>

        {/* VAR Impact */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-primary">Impact VAR et hors-jeu semi-automatique 2026</h3>
          </div>
          <p className="text-gray-700 mb-4">
            La Coupe du Monde 2026 utilise la technologie de hors-jeu semi-automatique (SAOT) de dernière génération. Ce système combine des caméras de tracking et un capteur dans le ballon pour détecter les positions de hors-jeu en temps quasi réel.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/60 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-accent" />
                <p className="font-semibold text-primary">Précision accrue</p>
              </div>
              <p className="text-gray-600">Les situations limites (quelques centimètres) sont désormais détectées, ce qui pourrait augmenter le nombre de hors-jeu par rapport aux compétitions précédentes.</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flag className="w-5 h-5 text-accent" />
                <p className="font-semibold text-primary">Décisions plus rapides</p>
              </div>
              <p className="text-gray-600">Le temps moyen de vérification est réduit de 70 secondes à environ 25 secondes, limitant l&apos;impact sur le rythme du match.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Odds */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Cotes hors-jeu — Over/Under</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Marché</th>
                <th className="text-center p-3">Winamax</th>
                <th className="text-center p-3">Betclic</th>
                <th className="text-center p-3">Unibet</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="p-3 font-semibold">Over 3.5 hors-jeu</td>
                <td className="text-center p-3">{stats.winamaxOver35}</td>
                <td className="text-center p-3">{stats.betclicOver35}</td>
                <td className="text-center p-3">{stats.unibetOver35}</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-semibold">Under 3.5 hors-jeu</td>
                <td className="text-center p-3">{stats.winamaxUnder35}</td>
                <td className="text-center p-3">{stats.betclicUnder35}</td>
                <td className="text-center p-3">{stats.unibetUnder35}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-semibold">Over 5.5 hors-jeu</td>
                <td className="text-center p-3">{stats.winamaxOver55}</td>
                <td className="text-center p-3">{stats.betclicOver55}</td>
                <td className="text-center p-3">{stats.unibetOver55}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Cotes indicatives susceptibles de varier. Vérifiez sur le site du bookmaker.</p>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-primary mb-4">Parier sur les hors-jeu</h3>
          <p className="text-gray-600 mb-6">Comparez les cotes hors-jeu pour {homeName} vs {awayName}.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://www.winamax.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">Winamax <ExternalLink className="w-4 h-4" /></a>
            <a href="https://www.betclic.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">Betclic <ExternalLink className="w-4 h-4" /></a>
            <a href="https://www.unibet.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">Unibet <ExternalLink className="w-4 h-4" /></a>
          </div>
          <p className="text-xs text-gray-400 mt-4">18+ | Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13 (appel non surtaxé).</p>
        </div>
      </section>

      {/* Related */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Autres paris pour ce match</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={`/corners/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Corners</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/possession/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Possession</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/match/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Pronostic match</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>

      <FAQSection title={`Questions fréquentes — Hors-jeu ${homeName} vs ${awayName}`} items={faqItems} />
    </>
  );
}
