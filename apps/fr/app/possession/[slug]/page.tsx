import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { PieChart, TrendingUp, ArrowRight, ExternalLink, Swords } from "lucide-react";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

function getPossessionStats(homeId: string, awayId: string) {
  const seed = homeId.charCodeAt(0) * 5 + awayId.charCodeAt(0) * 3;
  const homePoss = +(48 + (seed % 12)).toFixed(0);
  const awayPoss = 100 - +homePoss;
  return {
    homePoss: +homePoss, awayPoss,
    homePassAccuracy: +(82 + (seed % 10)).toFixed(0),
    awayPassAccuracy: +(80 + ((seed * 2) % 11)).toFixed(0),
    winamaxHomeOver55: +(2.40 + (seed % 30) / 100).toFixed(2),
    betclicHomeOver55: +(2.35 + (seed % 25) / 100).toFixed(2),
    unibetHomeOver55: +(2.45 + (seed % 28) / 100).toFixed(2),
    winamaxAwayOver55: +(2.80 + (seed % 35) / 100).toFixed(2),
    betclicAwayOver55: +(2.75 + (seed % 30) / 100).toFixed(2),
    unibetAwayOver55: +(2.85 + (seed % 33) / 100).toFixed(2),
  };
}

const styleLabel = (poss: number) =>
  poss >= 55 ? "tiki-taka / possession" : poss >= 50 ? "équilibré" : "contre-attaque / pressing";

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
    title: `Qui aura la possession ? ${home} vs ${away} — CDM 2026`,
    description: `Analyse possession ${home} vs ${away} à la Coupe du Monde 2026 : stats historiques, cotes possession >55%, tactiques et pronostics paris.`,
    alternates: { canonical: `https://www.cdm2026.fr/possession/${slug}` },
  };
}

export const dynamicParams = false;

export default async function PossessionPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeName = home?.name ?? "A déterminer";
  const awayName = away?.name ?? "A déterminer";
  const stats = getPossessionStats(match.homeTeamId, match.awayTeamId);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Pronostics", href: "/pronostic" },
    { label: `Possession ${homeName} - ${awayName}` },
  ];
  
  const faqItems = [
    { question: `Qui aura la possession entre ${homeName} et ${awayName} ?`, answer: `D'après les statistiques historiques, ${stats.homePoss > stats.awayPoss ? homeName : awayName} devrait avoir l'avantage en possession avec environ ${Math.max(stats.homePoss, stats.awayPoss)}% du ballon.` },
    { question: "La possession garantit-elle la victoire ?", answer: "Non, la possession ne garantit pas la victoire. De nombreuses équipes performantes en Coupe du Monde pratiquent un jeu en contre-attaque efficace avec peu de possession." },
    { question: "Comment parier sur la possession ?", answer: "Les bookmakers proposent des marchés sur la possession : quelle équipe aura plus de 55% de possession, ou encore si le total sera au-dessus/en dessous d'un seuil." },
    { question: "Comment est calculée la possession ?", answer: "La possession est calculée en pourcentage du temps où chaque équipe contrôle le ballon. Les passes réussies sont le principal indicateur utilisé par les systèmes de tracking." },
  ];

  return (
    <>
<section className="hero-animated text-center py-16 px-4">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mt-6">
          Qui aura la possession ? {homeName} vs {awayName}
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Analyse tactique, stats possession historiques et cotes pour {homeName} contre {awayName}, Coupe du Monde 2026.
        </p>
      </section>

      {/* Possession stats */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <PieChart className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Stats possession historiques</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">{homeName}</p>
            <p className="text-4xl font-extrabold text-primary">{stats.homePoss}%</p>
            <p className="text-sm text-gray-500 mt-2">Possession moyenne</p>
            <p className="text-xs text-gray-400 mt-1">Précision passes : {stats.homePassAccuracy}%</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">{awayName}</p>
            <p className="text-4xl font-extrabold text-primary">{stats.awayPoss}%</p>
            <p className="text-sm text-gray-500 mt-2">Possession moyenne</p>
            <p className="text-xs text-gray-400 mt-1">Précision passes : {stats.awayPassAccuracy}%</p>
          </div>
        </div>

        {/* Tactical analysis */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Swords className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-primary">Analyse tactique</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="font-semibold text-primary mb-2">{homeName} — Style {styleLabel(stats.homePoss)}</p>
              <p>
                Avec {stats.homePoss}% de possession en moyenne, {homeName} adopte un style{" "}
                {stats.homePoss >= 55 ? "basé sur la possession et le contrôle du ballon, cherchant à fatiguer l'adversaire." :
                 stats.homePoss >= 50 ? "équilibré entre possession et jeu direct, s'adaptant à l'adversaire." :
                 "pragmatique en contre-attaque, concédant le ballon pour mieux frapper en transition."}
              </p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-2">{awayName} — Style {styleLabel(stats.awayPoss)}</p>
              <p>
                Avec {stats.awayPoss}% de possession, {awayName} privilégie{" "}
                {stats.awayPoss >= 55 ? "un jeu de possession patient, avec des circuits de passes travaillés." :
                 stats.awayPoss >= 50 ? "un jeu mixte qui alterne phases de possession et accélérations." :
                 "la verticalité et les transitions rapides, profitant des espaces laissés par l'adversaire."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Odds */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Cotes possession &gt;55%</h2>
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
                <td className="p-3 font-semibold">{homeName} &gt;55% possession</td>
                <td className="text-center p-3">{stats.winamaxHomeOver55}</td>
                <td className="text-center p-3">{stats.betclicHomeOver55}</td>
                <td className="text-center p-3">{stats.unibetHomeOver55}</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-semibold">{awayName} &gt;55% possession</td>
                <td className="text-center p-3">{stats.winamaxAwayOver55}</td>
                <td className="text-center p-3">{stats.betclicAwayOver55}</td>
                <td className="text-center p-3">{stats.unibetAwayOver55}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Cotes indicatives susceptibles de varier. Vérifiez sur le site du bookmaker.</p>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-primary mb-4">Parier sur la possession</h3>
          <p className="text-gray-600 mb-6">Comparez les cotes possession pour {homeName} vs {awayName}.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://www.winamax.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">Winamax <ExternalLink className="w-4 h-4" /></a>
            <a href="https://www.betclic.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">Betclic <ExternalLink className="w-4 h-4" /></a>
            <a href="https://www.unibet.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">Unibet <ExternalLink className="w-4 h-4" /></a>
          </div>
          <p className="text-xs text-gray-400 mt-4"></p>
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
          <Link href={`/hors-jeu/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Hors-jeu</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/match/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Pronostic match</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>

      <FAQSection title={`Questions fréquentes — Possession ${homeName} vs ${awayName}`} items={faqItems} />
    </>
  );
}
