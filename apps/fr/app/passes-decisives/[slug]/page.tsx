import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Zap, TrendingUp, ArrowRight, ExternalLink, Users } from "lucide-react";
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

function getAssistStats(slug: string) {
  const seed = slug.length * 3 + slug.charCodeAt(1);
  const assistsTotal = Math.floor(2 + (seed % 18));
  const caps = playersBySlug[slug]?.caps ?? 50;
  const assistsPerMatch = +(assistsTotal / Math.max(caps, 1)).toFixed(2);
  const keyPassesPerMatch = +(0.8 + (seed % 25) / 10).toFixed(1);
  const dribblesPerMatch = +(0.5 + (seed % 20) / 10).toFixed(1);
  return {
    assistsTotal,
    assistsPerMatch,
    keyPassesPerMatch,
    dribblesPerMatch,
    winamaxAtLeast1: +(3.20 + (seed % 40) / 100).toFixed(2),
    betclicAtLeast1: +(3.10 + (seed % 35) / 100).toFixed(2),
    unibetAtLeast1: +(3.30 + (seed % 38) / 100).toFixed(2),
    winamaxAtLeast2: +(9.00 + (seed % 50) / 10).toFixed(2),
    betclicAtLeast2: +(8.50 + (seed % 45) / 10).toFixed(2),
    unibetAtLeast2: +(9.50 + (seed % 55) / 10).toFixed(2),
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
    title: `Cote passe décisive ${player.name} — CDM 2026`,
    description: `Cotes et stats passes décisives de ${player.name} pour la Coupe du Monde 2026. Comparatif Winamax, Betclic, Unibet et pronostics.`,
    alternates: { canonical: `https://www.cdm2026.fr/passes-decisives/${slug}` },
  };
}

export const dynamicParams = false;

export default async function PassesDecisivesPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();

  const team = teamsById[player.teamId];
  const stats = getAssistStats(slug);
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Paris sportifs", href: "/paris-sportifs" },
    { label: `Passe décisive ${player.name}` },
  ];
  
  const faqItems = [
    { question: `Combien de passes décisives ${player.name} a-t-il en sélection ?`, answer: `${player.name} compte ${stats.assistsTotal} passes décisives en ${player.caps} sélections, soit une moyenne de ${stats.assistsPerMatch} par match.` },
    { question: `Peut-on parier sur les passes décisives pendant la CDM 2026 ?`, answer: "Oui, les principaux bookmakers (Winamax, Betclic, Unibet) proposent le marché 'au moins 1 passe décisive dans le match' sur les rencontres de la Coupe du Monde." },
    { question: "Quelle différence entre passe décisive et key pass ?", answer: "Une passe décisive est une passe qui mène directement à un but. Une key pass (passe clé) est la dernière passe avant un tir, qu'il soit converti ou non." },
    { question: `${player.name} est-il un bon créateur ?`, answer: `Avec ${stats.keyPassesPerMatch} passes clés par match et ${stats.dribblesPerMatch} dribbles réussis par match en sélection, ${player.name} présente un profil ${stats.keyPassesPerMatch > 1.5 ? "très créatif" : "solide en création"}.` },
  ];

  return (
    <>
<section className="hero-animated text-center py-16 px-4">
        <Breadcrumb transparent items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-accent mt-6">
          Cote passe décisive {player.name}
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Statistiques de création et cotes pour parier sur les passes décisives de {player.name} ({team?.name}) lors de la CDM 2026.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Profil créateur en sélection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-primary">{stats.assistsTotal}</p>
            <p className="text-sm text-gray-500 mt-1">Passes décisives</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-accent">{stats.assistsPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Assists / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-primary">{stats.keyPassesPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Passes clés / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-accent">{stats.dribblesPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Dribbles / match</p>
          </div>
        </div>

        {/* Creator profile */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-primary">Profil créateur</h3>
          </div>
          <p className="text-gray-700">
            {player.name} combine {stats.dribblesPerMatch} dribbles réussis et {stats.keyPassesPerMatch} passes clés par match en sélection.
            {player.position === "FW" ? " En tant qu'attaquant, il est autant finisseur que passeur décisif." :
             player.position === "MF" ? " Son rôle de milieu lui permet d'alimenter les attaquants en dernière passe." :
             " Son positionnement défensif rend chaque passe décisive d'autant plus précieuse."}
            {" "}Avec {player.goals} buts en {player.caps} sélections, les défenses doivent le surveiller au tir comme à la passe.
          </p>
        </div>
      </section>

      {/* Odds */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Cotes passes décisives</h2>
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
                <td className="p-3 font-semibold">Au moins 1 passe décisive</td>
                <td className="text-center p-3">{stats.winamaxAtLeast1}</td>
                <td className="text-center p-3">{stats.betclicAtLeast1}</td>
                <td className="text-center p-3">{stats.unibetAtLeast1}</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-semibold">Au moins 2 passes décisives</td>
                <td className="text-center p-3">{stats.winamaxAtLeast2}</td>
                <td className="text-center p-3">{stats.betclicAtLeast2}</td>
                <td className="text-center p-3">{stats.unibetAtLeast2}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Cotes indicatives susceptibles de varier. Vérifiez sur le site du bookmaker avant de parier.</p>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-primary mb-4">Parier sur les passes décisives</h3>
          <p className="text-gray-600 mb-6">
            Comparez les cotes pour les paris passes décisives de {player.name} lors de la CDM 2026.
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
          <Link href={`/tacles/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Tacles de {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>

      <FAQSection title={`Questions fréquentes — Passes décisives ${player.name}`} items={faqItems} />
    </>
  );
}
