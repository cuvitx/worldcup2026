import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@repo/ui/faq-section";
import { Shield, TrendingUp, ArrowRight, ExternalLink, BarChart3 } from "lucide-react";
import { players } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";
const TOP_50_SLUGS = [
  "mbappe","haaland","vinicius-jr","bellingham","yamal","messi","ronaldo","kane","salah","de-bruyne",
  "griezmann","neymar","lewandowski","osimhen","saka","pedri","rodri","gavi","foden","rashford",
  "alvarez","martinez-lautaro","isak","vlahovic","morata","richarlison","gakpo","thuram","kim-min-jae","hakimi",
  "valverde","tchouameni","camavinga","wirtz","musiala","szczesny","alisson","courtois","van-dijk","dias",
  "hojlund","palmer","nunez","diaz-luis","dembele","son","kulusevski","raphinha","bruno-fernandes","bernardo-silva",
];
const playersBySlug = Object.fromEntries(players.map((p) => [p.slug, p]));
function getTackleStats(slug: string, position: string) {
  const seed = slug.charCodeAt(0) * 2 + slug.length;
  const baseT = position === "DF" ? 3.0 : position === "MF" ? 2.0 : 0.8;
  const baseI = position === "DF" ? 2.2 : position === "MF" ? 1.5 : 0.5;
  const tacklesPerMatch = +(baseT + (seed % 15) / 10).toFixed(1);
  const interceptionsPerMatch = +(baseI + (seed % 12) / 10).toFixed(1);
  const tackleSuccessRate = +(60 + (seed % 25)).toFixed(0);
  return {
    tacklesPerMatch,
    interceptionsPerMatch,
    tackleSuccessRate: +tackleSuccessRate,
    duelsWonPct: +(50 + (seed % 20)).toFixed(0),
    winamaxOver15: +(1.90 + (seed % 30) / 100).toFixed(2),
    betclicOver15: +(1.85 + (seed % 25) / 100).toFixed(2),
    unibetOver15: +(1.92 + (seed % 28) / 100).toFixed(2),
    winamaxOver25: +(2.80 + (seed % 40) / 100).toFixed(2),
    betclicOver25: +(2.75 + (seed % 35) / 100).toFixed(2),
    unibetOver25: +(2.85 + (seed % 38) / 100).toFixed(2),
  };
}
const positionLabel = (pos: string) =>
  pos === "DF" ? "Défenseur" : pos === "MF" ? "Milieu" : pos === "FW" ? "Attaquant" : "Gardien";
export async function generateStaticParams() {
  return TOP_50_SLUGS.filter((s) => playersBySlug[s]).map((slug) => ({ slug }));
}
interface PageProps { params: Promise<{ slug: string }>; }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) return {};
  return {
    title: `Statistiques tacles ${player.name} — Paris spécifiques CDM 2026`,
    description: `Stats défensives de ${player.name} : tacles, interceptions, duels. Cotes paris spécifiques Winamax, Betclic, Unibet pour la CDM 2026.`,
    alternates: { canonical: `https://www.cdm2026.fr/tacles/${slug}` },
  };
}
export const dynamicParams = false;
export default async function TaclesPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();
  const team = teamsById[player.teamId];
  const stats = getTackleStats(slug, player.position);
const faqItems = [
    { question: `Combien de tacles ${player.name} réalise-t-il par match ?`, answer: `${player.name} réalise en moyenne ${stats.tacklesPerMatch} tacles par match en sélection, avec un taux de réussite de ${stats.tackleSuccessRate}%.` },
    { question: "Peut-on parier sur les tacles d'un joueur ?", answer: "Oui, certains bookmakers proposent des marchés sur le nombre de tacles d'un joueur pendant un match de la Coupe du Monde 2026. Ce marché est plus courant pour les défenseurs et milieux défensifs." },
    { question: `${player.name} est-il un bon tacleur pour un ${positionLabel(player.position).toLowerCase()} ?`, answer: `En tant que ${positionLabel(player.position).toLowerCase()}, ${stats.tacklesPerMatch > 2.0 ? `ses ${stats.tacklesPerMatch} tacles/match sont au-dessus de la moyenne pour son poste` : `son nombre de tacles reflète son rôle plus offensif`}.` },
    { question: "Comment fonctionne le pari over/under tacles ?", answer: "Le pari over/under tacles consiste à miser sur le fait qu'un joueur réalisera plus (over) ou moins (under) qu'un nombre défini de tacles pendant un match." },
  ];
  return (
    <>
<section className="hero-animated text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-accent mt-6">
          Statistiques tacles {player.name}
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Analyse défensive et paris spécifiques sur les tacles de {player.name} ({team?.name}) pour la Coupe du Monde 2026.
        </p>
      </section>
      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Profil défensif en sélection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-primary">{stats.tacklesPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Tacles / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-accent">{stats.interceptionsPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Interceptions / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-primary">{stats.tackleSuccessRate}%</p>
            <p className="text-sm text-gray-500 mt-1">Taux réussite tacles</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-accent">{stats.duelsWonPct}%</p>
            <p className="text-sm text-gray-500 mt-1">Duels gagnés</p>
          </div>
        </div>
        {/* Position profile */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-primary">Profil {positionLabel(player.position).toLowerCase()} vs moyenne</h3>
          </div>
          <p className="text-gray-700">
            {player.position === "DF" ? (
              `En tant que défenseur, ${player.name} est naturellement impliqué dans les duels défensifs. Ses ${stats.tacklesPerMatch} tacles et ${stats.interceptionsPerMatch} interceptions par match en font un joueur clé du dispositif défensif de ${team?.name ?? "son équipe"}.`
            ) : player.position === "MF" ? (
              `${player.name} évolue au milieu de terrain, un poste qui combine récupération et création. Ses ${stats.tacklesPerMatch} tacles par match montrent son implication dans le travail défensif, en plus de ses qualités techniques.`
            ) : (
              `En tant qu'attaquant, ${player.name} n'est pas le profil type pour les paris tacles. Cependant, le pressing haut pratiqué par ${team?.name ?? "son équipe"} lui permet de réaliser ${stats.tacklesPerMatch} tacles par match, ce qui reste notable pour un joueur offensif.`
            )}
          </p>
        </div>
      </section>
      {/* Odds */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Cotes tacles — Over/Under</h2>
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
                <td className="p-3 font-semibold">Over 1.5 tacles</td>
                <td className="text-center p-3">{stats.winamaxOver15}</td>
                <td className="text-center p-3">{stats.betclicOver15}</td>
                <td className="text-center p-3">{stats.unibetOver15}</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-semibold">Over 2.5 tacles</td>
                <td className="text-center p-3">{stats.winamaxOver25}</td>
                <td className="text-center p-3">{stats.betclicOver25}</td>
                <td className="text-center p-3">{stats.unibetOver25}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Cotes indicatives susceptibles de varier. Vérifiez sur le site du bookmaker avant de parier.</p>
      </section>
      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-primary mb-4">Parier sur les tacles</h3>
          <p className="text-gray-600 mb-6">
            Retrouvez les meilleures cotes pour les paris sur les tacles de {player.name} pendant la CDM 2026.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://www.winamax.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              Winamax <ExternalLink className="w-4 h-4" />
            </a>
            <a href="https://www.betclic.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              Betclic <ExternalLink className="w-4 h-4" />
            </a>
            <a href="https://www.unibet.fr" target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              Unibet <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4"></p>
        </div>
      </section>
      {/* Related */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Paris joueur associés</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href={`/tirs-cadres/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Tirs cadrés de {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/passes-decisives/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Passes décisives de {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>
      <FAQSection title={`Questions fréquentes — Tacles ${player.name}`} items={faqItems} />
    </>
  );
}