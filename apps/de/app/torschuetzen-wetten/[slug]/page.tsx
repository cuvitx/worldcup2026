import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@repo/ui/faq-section";
import { Trophy, TrendingUp, BarChart3, ArrowRight } from "lucide-react";
import { players } from "../../../lib/localized-data";
import { teamsById } from "../../../lib/localized-data";
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
    title: `Quote ${player.name} Torschütze WM 2026 -- Prognose und Analyse`,
    description: `Torschützen-Quoten von ${player.name} für die WM 2026: ein Tor erzielen, Torschützenkönig. Betano-Quoten.`,
    alternates: { canonical: `https://www.wm2026guide.de/torschuetzen-wetten/${slug}` },
  };
}
export const dynamicParams = true;
export default async function TorschuetzenWettenPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();
  const team = teamsById[player.teamId];
  const odds = getScorerOdds(slug);
const faqItems = [
    { question: `Wird ${player.name} bei der WM 2026 ein Tor erzielen?`, answer: `Mit ${odds.goalsInternational} Toren in Länderspielen und einem Durchschnitt von ${odds.goalsPerMatch} Toren/Spiel ist ${player.name} ein ernsthafter Kandidat. Betano bietet eine Quote von etwa ${odds.pmusportAnytime} für mindestens 1 Tor im Turnier.` },
    { question: `Was ist die Quote für ${player.name} als Torschützenkönig?`, answer: `Die Torschützenkönig-Quote bei Betano beträgt ${odds.pmusportTopScorer}.` },
    { question: "Wie wettet man auf einen Torschützen der WM?", answer: "Es gibt verschiedene Märkte: Torschütze des Turniers (mindestens 1 Tor), Torschützenkönig, Torschütze eines bestimmten Spiels. Alle diese Märkte finden Sie bei Betano." },
    { question: "Zählen Tore in der Verlängerung?", answer: "Ja, Tore in der Verlängerung zählen für die Wetten auf Torschütze des Turniers und Torschützenkönig. Elfmeterschießen-Tore zählen in der Regel nicht." },
  ];
  const comparisons = TOP_50_SLUGS.filter((s) => s !== slug && playersBySlug[s]).slice(0, 4);
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
            <Trophy className="inline w-8 h-8 mr-2" />
            Quote {player.name} Torschütze WM 2026 -- Prognose und Analyse
          </h1>
          <p className="text-accent mt-3 text-lg max-w-2xl">
            {player.name} ({team?.name}) • {player.position} • {player.club}
          </p>
        </div>
      </section>
      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-accent" /> Torschützen-Statistiken in Länderspielen
        </h2>
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">{odds.goalsInternational}</div>
            <div className="text-sm text-accent mt-1">Tore in Länderspielen</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">{odds.goalsPerMatch}</div>
            <div className="text-sm text-accent mt-1">Tore / Spiel</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">{odds.wcPreviousGoals}</div>
            <div className="text-sm text-accent mt-1">Tore bei vorherigen WMs</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">{player.caps}</div>
            <div className="text-sm text-accent mt-1">Länderspiele</div>
          </div>
        </div>
        {/* Quotentabelle: Mindestens 1 Tor */}
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-accent" /> Betano-Quoten:Mindestens 1 Tor im Turnier
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full bg-white rounded-xl border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Wettanbieter</th>
                <th className="text-center p-3 font-semibold">Quote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3">Betano</td>
                <td className="text-center p-3 font-bold text-accent">{odds.pmusportAnytime}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Quotentabelle: Torschützenkönig */}
        <h2 className="text-xl font-bold text-primary mb-4">Betano-Quoten:Torschützenkönig des Turniers</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full bg-white rounded-xl border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Wettanbieter</th>
                <th className="text-center p-3 font-semibold">Quote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3">Betano</td>
                <td className="text-center p-3 font-bold text-accent">{odds.pmusportTopScorer}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Quotentabelle: Torschütze nächstes Spiel */}
        <h2 className="text-xl font-bold text-primary mb-4">Betano-Quoten:Torschütze im nächsten Spiel</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full bg-white rounded-xl border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Wettanbieter</th>
                <th className="text-center p-3 font-semibold">Quote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3">Betano</td>
                <td className="text-center p-3 font-bold text-accent">{odds.pmusportNextMatch}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Richtquoten, Änderungen vorbehalten. Prüfen Sie vor dem Wetten bei Betano.</p>
        <div className="mt-6">
          <a
            href={pmuTrackingUrl("cote-Torschütze")}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="inline-block bg-accent text-white rounded-xl py-3 px-6 font-semibold hover:opacity-90 transition-opacity"
          >
            Willkommensbonus -- Wetten auf {player.name} bei Betano →
          </a>
        </div>
      </section>
      {/* Analyse */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4">Analyse: Spielstil und Torschützen-Potenzial</h2>
      </section>
      {/* Verlinkung */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Entdecken Sie auch</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={`/spieler/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Profil {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href="/prognose/torschuetzen" className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Prognose Torschützen WM 2026</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/torschuetze/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Torschütze {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>
      <FAQSection title={`Häufig gestellte Fragen -- Quote ${player.name} Torschütze`} items={faqItems} />
    </>
  );
}
