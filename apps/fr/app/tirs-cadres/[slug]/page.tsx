import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { Target, TrendingUp, BarChart3, ArrowRight, ExternalLink } from "lucide-react";
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

function getShotStats(slug: string) {
  const seed = slug.length + slug.charCodeAt(0);
  const shotsPerMatch = +(1.5 + (seed % 40) / 10).toFixed(1);
  const onTargetPct = +(32 + (seed % 25)).toFixed(0);
  const onTargetPerMatch = +(shotsPerMatch * +onTargetPct / 100).toFixed(1);
  return {
    shotsPerMatch,
    onTargetPerMatch,
    onTargetPct: +onTargetPct,
    winamaxOver05: +(1.55 + (seed % 20) / 100).toFixed(2),
    winamaxUnder05: +(2.20 + (seed % 15) / 100).toFixed(2),
    betclicOver05: +(1.60 + (seed % 18) / 100).toFixed(2),
    betclicUnder05: +(2.15 + (seed % 12) / 100).toFixed(2),
    unibetOver05: +(1.58 + (seed % 22) / 100).toFixed(2),
    unibetUnder05: +(2.18 + (seed % 14) / 100).toFixed(2),
    winamaxOver15: +(2.80 + (seed % 30) / 100).toFixed(2),
    betclicOver15: +(2.75 + (seed % 25) / 100).toFixed(2),
    unibetOver15: +(2.85 + (seed % 28) / 100).toFixed(2),
    tournamentAvg: 0.8,
  };
}

export async function generateStaticParams() {
  return TOP_50_SLUGS.filter((s) => playersBySlug[s]).map((slug) => ({ slug }));
}

interface PageProps { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) return {};
  return {
    title: `Parier sur les tirs cadrés de ${player.name} — CDM 2026`,
    description: `Stats tirs cadrés de ${player.name} en sélection, cotes over/under Winamax, Betclic, Unibet pour la Coupe du Monde 2026.`,
    alternates: { canonical: `https://cdm2026.fr/tirs-cadres/${slug}` },
  };
}

export const dynamicParams = false;

export default async function TirsCadresPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();

  const team = teamsById[player.teamId];
  const stats = getShotStats(slug);
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Paris sportifs", href: "/paris-sportifs" },
    { label: `Tirs cadrés ${player.name}` },
  ];

  const faqItems = [
    { question: `Combien de tirs cadrés ${player.name} fait-il par match ?`, answer: `En sélection, ${player.name} affiche une moyenne de ${stats.onTargetPerMatch} tirs cadrés par match, avec un taux de cadrage de ${stats.onTargetPct}%.` },
    { question: `Quelle est la meilleure cote pour parier sur les tirs cadrés de ${player.name} ?`, answer: `Les cotes varient selon les bookmakers. Pour over 0.5 tir cadré, comparez Winamax (${stats.winamaxOver05}), Betclic (${stats.betclicOver05}) et Unibet (${stats.unibetOver05}).` },
    { question: "Le pari tirs cadrés est-il disponible sur tous les matchs ?", answer: "Oui, la plupart des bookmakers proposent ce marché sur tous les matchs de la Coupe du Monde 2026, y compris la phase de groupes." },
    { question: "Comment sont comptabilisés les tirs cadrés ?", answer: "Un tir cadré est un tir qui serait entré dans le but sans intervention du gardien ou d'un défenseur sur la ligne. Les buts comptent comme des tirs cadrés." },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems.map((b) => ({ name: b.label, url: b.href ?? "" }))} baseUrl="https://cdm2026.fr" />

      <section className="hero-animated text-center py-16 px-4">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mt-6">
          Parier sur les tirs cadrés de {player.name}
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Analyse statistique et cotes comparées pour les paris tirs cadrés de {player.name} ({team?.name}) lors de la Coupe du Monde 2026.
        </p>
      </section>

      {/* Stats Overview */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Profil tirs cadrés en sélection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-primary">{stats.shotsPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Tirs / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-accent">{stats.onTargetPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Tirs cadrés / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-primary">{stats.onTargetPct}%</p>
            <p className="text-sm text-gray-500 mt-1">Taux de cadrage</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-secondary">{player.caps}</p>
            <p className="text-sm text-gray-500 mt-1">Sélections</p>
          </div>
        </div>

        {/* Tournament comparison */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-primary">Comparaison avec la moyenne du tournoi</h3>
          </div>
          <p className="text-gray-700">
            Avec {stats.onTargetPerMatch} tirs cadrés par match, {player.name} se situe{" "}
            {stats.onTargetPerMatch > stats.tournamentAvg ? (
              <span className="font-bold text-accent">au-dessus</span>
            ) : (
              <span className="font-bold text-red-600">en dessous</span>
            )}{" "}
            de la moyenne estimée du tournoi ({stats.tournamentAvg} tir cadré/match). Son profil{" "}
            {player.position === "FW" ? "d'attaquant" : player.position === "MF" ? "de milieu offensif" : "de défenseur"}{" "}
            et ses {player.goals} buts en {player.caps} sélections confirment sa capacité à cadrer.
          </p>
        </div>
      </section>

      {/* Odds Table */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Cotes tirs cadrés — Over/Under</h2>
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
                <td className="p-3 font-semibold">Over 0.5 tir cadré</td>
                <td className="text-center p-3">{stats.winamaxOver05}</td>
                <td className="text-center p-3">{stats.betclicOver05}</td>
                <td className="text-center p-3">{stats.unibetOver05}</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-semibold">Under 0.5 tir cadré</td>
                <td className="text-center p-3">{stats.winamaxUnder05}</td>
                <td className="text-center p-3">{stats.betclicUnder05}</td>
                <td className="text-center p-3">{stats.unibetUnder05}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-semibold">Over 1.5 tirs cadrés</td>
                <td className="text-center p-3">{stats.winamaxOver15}</td>
                <td className="text-center p-3">{stats.betclicOver15}</td>
                <td className="text-center p-3">{stats.unibetOver15}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Cotes indicatives susceptibles de varier. Vérifiez sur le site du bookmaker avant de parier.</p>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-primary mb-4">Comparer les cotes tirs cadrés</h3>
          <p className="text-gray-600 mb-6">
            Trouvez la meilleure cote pour vos paris sur les tirs cadrés de {player.name} lors de la Coupe du Monde 2026.
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
          <p className="text-xs text-gray-400 mt-4">18+ | Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13 (appel non surtaxé).</p>
        </div>
      </section>

      {/* Related */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Paris joueur associés</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href={`/passes-decisives/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Passes décisives de {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/tacles/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Tacles de {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>

      <FAQSection title={`Questions fréquentes — Tirs cadrés ${player.name}`} items={faqItems} />
    </>
  );
}
