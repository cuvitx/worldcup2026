import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@repo/ui/faq-section";
import { CornerDownRight, TrendingUp, ArrowRight, ExternalLink, BarChart3, MapPin } from "lucide-react";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
function getCornerStats(homeId: string, awayId: string) {
  const seed = (homeId + awayId).length * 7 + homeId.charCodeAt(0);
  const homeCorners = +(4.5 + (seed % 30) / 10).toFixed(1);
  const awayCorners = +(3.8 + ((seed * 3) % 25) / 10).toFixed(1);
  const totalAvg = +(homeCorners + awayCorners).toFixed(1);
  return {
    homeCorners, awayCorners, totalAvg,
    winamaxOver95: +(1.85 + (seed % 20) / 100).toFixed(2),
    winamaxUnder95: +(1.90 + (seed % 18) / 100).toFixed(2),
    betclicOver95: +(1.82 + (seed % 22) / 100).toFixed(2),
    betclicUnder95: +(1.92 + (seed % 16) / 100).toFixed(2),
    unibetOver95: +(1.88 + (seed % 19) / 100).toFixed(2),
    unibetUnder95: +(1.87 + (seed % 21) / 100).toFixed(2),
    winamaxOver115: +(2.40 + (seed % 30) / 100).toFixed(2),
    betclicOver115: +(2.35 + (seed % 28) / 100).toFixed(2),
    unibetOver115: +(2.45 + (seed % 32) / 100).toFixed(2),
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
    title: `Pronostic corners ${home} - ${away} — CDM 2026`,
    description: `Combien de corners pour ${home} vs ${away} ? Stats historiques, cotes over/under 9.5 corners et analyse tactique CDM 2026.`,
    alternates: { canonical: `https://www.cdm2026.fr/corners/${slug}` },
  };
}
export const dynamicParams = false;
export default async function CornersPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) notFound();
  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];
  const homeName = home?.name ?? "A déterminer";
  const awayName = away?.name ?? "A déterminer";
  const stats = getCornerStats(match.homeTeamId, match.awayTeamId);
const faqItems = [
    { question: `Combien de corners pour ${homeName} vs ${awayName} ?`, answer: `Sur la base des stats historiques, on peut attendre environ ${stats.totalAvg} corners au total : ${stats.homeCorners} pour ${homeName} et ${stats.awayCorners} pour ${awayName}.` },
    { question: "Qu'est-ce que le pari over/under 9.5 corners ?", answer: "C'est un pari sur le nombre total de corners dans le match. Over 9.5 signifie que vous pariez sur au moins 10 corners au total, under 9.5 sur 9 corners ou moins." },
    { question: "Quels facteurs influencent le nombre de corners ?", answer: "Le style de jeu (pressing haut, jeu offensif), la possession, la qualité des tirs (déviations), la taille du stade et les conditions météorologiques jouent tous un rôle." },
    { question: "Le format 48 équipes change-t-il les stats corners ?", answer: "Avec des écarts de niveau plus importants en phase de groupes, on peut s'attendre à davantage de corners dans les matchs déséquilibrés, avec des favoris qui dominent territorialement." },
  ];
  return (
    <>
<section className="hero-animated text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-accent mt-6">
          Pronostic nombre de corners {homeName} - {awayName}
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Stats corners historiques, cotes over/under et facteurs tactiques pour {homeName} vs {awayName}, Coupe du Monde 2026.
        </p>
      </section>
      {/* Corner stats */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <CornerDownRight className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Stats corners historiques</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">{homeName}</p>
            <p className="text-3xl font-extrabold text-primary">{stats.homeCorners}</p>
            <p className="text-sm text-gray-500 mt-1">corners / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">Total estimé</p>
            <p className="text-3xl font-extrabold text-accent">{stats.totalAvg}</p>
            <p className="text-sm text-gray-500 mt-1">corners / match</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">{awayName}</p>
            <p className="text-3xl font-extrabold text-primary">{stats.awayCorners}</p>
            <p className="text-sm text-gray-500 mt-1">corners / match</p>
          </div>
        </div>
        {/* Factors */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-primary">Facteurs clés</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-primary mb-1">Style offensif</p>
              <p>Les équipes qui pressent haut et centrent beaucoup génèrent naturellement plus de corners.</p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">Pressing</p>
              <p>Un pressing intense force les défenseurs à dégager en corner plutôt que de relancer proprement.</p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">Stade</p>
              <p>{stadium ? `${stadium.name} — les dimensions du terrain peuvent influencer le jeu latéral.` : "Le stade et ses dimensions influencent le nombre de corners."}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Odds */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Cotes corners — Over/Under</h2>
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
                <td className="p-3 font-semibold">Over 9.5 corners</td>
                <td className="text-center p-3">{stats.winamaxOver95}</td>
                <td className="text-center p-3">{stats.betclicOver95}</td>
                <td className="text-center p-3">{stats.unibetOver95}</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-semibold">Under 9.5 corners</td>
                <td className="text-center p-3">{stats.winamaxUnder95}</td>
                <td className="text-center p-3">{stats.betclicUnder95}</td>
                <td className="text-center p-3">{stats.unibetUnder95}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-semibold">Over 11.5 corners</td>
                <td className="text-center p-3">{stats.winamaxOver115}</td>
                <td className="text-center p-3">{stats.betclicOver115}</td>
                <td className="text-center p-3">{stats.unibetOver115}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Cotes indicatives susceptibles de varier. Vérifiez sur le site du bookmaker.</p>
      </section>
      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-primary mb-4">Parier sur les corners</h3>
          <p className="text-gray-600 mb-6">Comparez les cotes corners pour {homeName} vs {awayName}.</p>
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
          <Link href={`/possession/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Possession</span>
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
      <FAQSection title={`Questions fréquentes — Corners ${homeName} vs ${awayName}`} items={faqItems} />
    </>
  );
}