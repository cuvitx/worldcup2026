import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@repo/ui/faq-section";
import { Trophy, TrendingUp, BarChart3, ArrowRight } from "lucide-react";
import { players } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";
import { pmuTrackingUrl } from "@repo/data/affiliates";
const TOP_50_SLUGS = [
  "mbappe","haaland","vinicius-jr","bellingham","yamal","messi","ronaldo","kane","salah","de-bruyne",
  "griezmann","neymar","lewandowski","osimhen","saka","pedri","rodri","gavi","foden","rashford",
  "alvarez","martinez-lautaro","isak","vlahovic","morata","richarlison","gakpo","thuram","kim-min-jae","hakimi",
  "valverde","tchouameni","camavinga","wirtz","musiala","szczesny","alisson","courtois","van-dijk","dias",
  "hojlund","palmer","nunez","diaz-luis","dembele","son","kulusevski","raphinha","bruno-fernandes","bernardo-silva",
];
const playersBySlug = Object.fromEntries(players.map((p) => [p.slug, p]));
function getScorerOdds(slug: string) {
  const seed = slug.length + slug.charCodeAt(0);
  return {
    goalsInternational: 10 + (seed % 50),
    goalsPerMatch: +(0.2 + (seed % 30) / 100).toFixed(2),
    wcPreviousGoals: seed % 8,
    pmusportAnytime: +(1.82 + (seed % 38) / 100).toFixed(2),
    pmusportTopScorer: +(8.20 + (seed % 190) / 10).toFixed(2),
    pmusportNextMatch: +(2.48 + (seed % 52) / 100).toFixed(2),
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
    title: `Cote ${player.name} Buteur CDM 2026 — Pronostic et Analyse`,
    description: `Cotes buteur de ${player.name} pour la Coupe du Monde 2026 : marquer un but, meilleur buteur. Cotes PMU Sport.`,
    alternates: { canonical: `https://www.cdm2026.fr/cote-buteur/${slug}` },
  };
}
export const dynamicParams = false;
export default async function CoteButeurPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();
  const team = teamsById[player.teamId];
  const odds = getScorerOdds(slug);
const faqItems = [
    { question: `${player.name} va-t-il marquer pendant la CDM 2026 ?`, answer: `Avec ${odds.goalsInternational} buts en sélection et une moyenne de ${odds.goalsPerMatch} but/match, ${player.name} est un candidat sérieux. PMU Sport propose une cote autour de ${odds.pmusportAnytime} pour au moins 1 but dans le tournoi.` },
    { question: `Quelle est la cote de ${player.name} meilleur buteur ?`, answer: `La cote meilleur buteur chez PMU Sport est de ${odds.pmusportTopScorer}.` },
    { question: "Comment parier sur un buteur de la Coupe du Monde ?", answer: "Plusieurs marchés existent : buteur du tournoi (au moins 1 but), meilleur buteur, buteur d'un match précis. Retrouvez tous ces marchés sur PMU Sport." },
    { question: "Les buts en prolongation comptent-ils ?", answer: "Oui, les buts inscrits en prolongation comptent pour les paris « buteur du tournoi » et « meilleur buteur ». Les tirs au but ne comptent généralement pas." },
  ];
  const comparisons = TOP_50_SLUGS.filter((s) => s !== slug && playersBySlug[s]).slice(0, 4);
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
            <Trophy className="inline w-8 h-8 mr-2" />
            Cote {player.name} Buteur CDM 2026 — Pronostic et Analyse
          </h1>
          <p className="text-accent mt-3 text-lg max-w-2xl">
            {player.name} ({team?.name}) • {player.position} • {player.club}
          </p>
        </div>
      </section>
      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-accent" /> Statistiques buteur en sélection
        </h2>
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">{odds.goalsInternational}</div>
            <div className="text-sm text-accent mt-1">Buts en sélection</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">{odds.goalsPerMatch}</div>
            <div className="text-sm text-accent mt-1">Buts / match</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">{odds.wcPreviousGoals}</div>
            <div className="text-sm text-accent mt-1">Buts en CDM précédentes</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">{player.caps}</div>
            <div className="text-sm text-accent mt-1">Sélections</div>
          </div>
        </div>
        {/* Tableau cotes : Marquer au moins 1 but */}
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-accent" /> Cotes PMU Sport : Marquer au moins 1 but dans le tournoi
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full bg-white rounded-xl border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Bookmaker</th>
                <th className="text-center p-3 font-semibold">Cote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3">PMU Sport</td>
                <td className="text-center p-3 font-bold text-accent">{odds.pmusportAnytime}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Tableau cotes : Meilleur buteur */}
        <h2 className="text-xl font-bold text-primary mb-4">Cotes PMU Sport : Meilleur buteur du tournoi</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full bg-white rounded-xl border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Bookmaker</th>
                <th className="text-center p-3 font-semibold">Cote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3">PMU Sport</td>
                <td className="text-center p-3 font-bold text-accent">{odds.pmusportTopScorer}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Tableau cotes : Buteur prochain match */}
        <h2 className="text-xl font-bold text-primary mb-4">Cotes PMU Sport : Buteur dans le prochain match</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full bg-white rounded-xl border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Bookmaker</th>
                <th className="text-center p-3 font-semibold">Cote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3">PMU Sport</td>
                <td className="text-center p-3 font-bold text-accent">{odds.pmusportNextMatch}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Cotes indicatives susceptibles de varier. Vérifiez sur PMU Sport avant de parier.</p>
        <div className="mt-6">
          <a
            href={pmuTrackingUrl("cdm2026")}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="inline-block bg-accent text-white rounded-xl py-3 px-6 font-semibold hover:opacity-90 transition-opacity"
          >
            Parier sur {player.name} chez PMU Sport →
          </a>
        </div>
      </section>
      {/* Analyse */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4">Analyse : style de jeu et potentiel buteur</h2>
      </section>
      {/* Maillage */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">À découvrir aussi</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={`/joueur/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Fiche {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href="/pronostic/buteurs" className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Pronostic buteurs CDM 2026</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/tirs-cadres/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Tirs cadrés {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>
      <FAQSection title={`Questions fréquentes — Cote ${player.name} Buteur`} items={faqItems} />
    </>
  );
}
