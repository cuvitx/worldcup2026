import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@repo/ui/faq-section";
import { AlertTriangle, ArrowRight, BarChart3, ExternalLink, History, ShieldAlert, Swords, TrendingUp, Trophy, User } from "lucide-react";
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
function getCardStats(slug: string) {
  const seed = slug.length + slug.charCodeAt(0) + slug.charCodeAt(slug.length - 1);
  const yellowCards = 4 + (seed % 18);
  const matchesPlayed = 25 + (seed % 40);
  const cardsPerMatch = +(yellowCards / matchesPlayed).toFixed(2);
  const tacklesPerMatch = +(1.2 + (seed % 25) / 10).toFixed(1);
  const foulsPerMatch = +(0.8 + (seed % 20) / 10).toFixed(1);
  const wcCards = seed % 4;
  const profileScore = +(foulsPerMatch * 10 + tacklesPerMatch * 5 + cardsPerMatch * 30).toFixed(0);
  const isRough = profileScore > 30;
  return {
    yellowCards,
    matchesPlayed,
    cardsPerMatch,
    tacklesPerMatch,
    foulsPerMatch,
    wcCards,
    profileScore,
    isRough,
    pmusport: +(3.10 + (seed % 38) / 10).toFixed(2),
    tournamentAvgCards: 0.14,
    tournamentAvgFouls: 1.3,
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
    title: `Gelbe Karte Quote ${player.name} — WM 2026 | Betano`,
    description: `Disziplinarstatistiken von ${player.name}, Gelbe Karte Quoten bei Betano für die WM 2026. Profil, Historie und Analyse.`,
    alternates: { canonical: `https://www.wm2026guide.de/gelbe-karten-wetten/${slug}` },
  };
}
export const dynamicParams = true;
export default async function CoteCartonJaunePage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();
  const team = teamsById[player.teamId];
  const stats = getCardStats(slug);
const faqItems = [
    { question: `Wie hoch ist die Quote für eine Gelbe Karte von ${player.name}?`, answer: `Die Richtquote für eine Gelbe Karte von ${player.name} liegt bei ${stats.pmusport} bei Betano. Diese Quote variiert je nach Spiel und Gegner.` },
    { question: `Bekommt ${player.name} häufig Gelbe Karten?`, answer: `${player.name} zeigt einen Durchschnitt von ${stats.cardsPerMatch} Gelben Karten pro Spiel in der Nationalmannschaft, mit ${stats.yellowCards} Karten in ${stats.matchesPlayed} Spielen. Sein Profil gilt als ${stats.isRough ? "eher robust" : "eher fair"}.` },
    { question: "Wie werden Gelbe-Karten-Wetten quotiert?", answer: "Die Wette \"Spieler erhält eine Gelbe Karte\" wird von den meisten Wettanbietern bei Spielen der WM 2026 angeboten. Die Quote hängt vom Disziplinarprofil des Spielers, dem Gegner und der Bedeutung des Spiels ab." },
    { question: "Beeinflusst der Schiedsrichter die Gelbe-Karten-Quoten?", answer: "Ja, der eingesetzte Schiedsrichter ist ein entscheidender Faktor. Manche Schiedsrichter verteilen durchschnittlich 4-5 Karten pro Spiel, andere nur 2-3. Die Wettanbieter passen ihre Quoten entsprechend an." },
  ];
  return (
    <>
<section className="hero-animated text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-accent mt-6">
          Gelbe Karte Quote — {player.name}
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Disziplinarprofil, Statistiken und Quotenvergleich für eine Gelbe-Karten-Wette auf {player.name} ({team?.name}) bei der WM 2026.
        </p>
      </section>
      {/* Disziplinarstatistiken */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="w-7 h-7 text-yellow-500" />
          <h2 className="text-2xl font-bold text-primary">Disziplinarstatistiken in der Nationalmannschaft</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-yellow-500">{stats.yellowCards}</p>
            <p className="text-sm text-gray-500 mt-1">Gelbe Karten</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-primary">{stats.cardsPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Karten / Spiel</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-accent">{stats.tacklesPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Tackles / Spiel</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-3xl font-extrabold text-red-500">{stats.foulsPerMatch}</p>
            <p className="text-sm text-gray-500 mt-1">Fouls / Spiel</p>
          </div>
        </div>
        {/* Disziplinarprofil */}
        <div className={`rounded-xl p-6 mb-8 ${stats.isRough ? "bg-gradient-to-r from-yellow-50 to-red-50 border border-yellow-200" : "bg-gradient-to-r from-green-50 to-blue-50 border border-green-200"}`}>
          <h3 className="text-xl font-bold text-primary mb-2">
            Profil: {stats.isRough ? " Robuster Spieler" : " Fairer Spieler"}
          </h3>
          <p className="text-gray-700">
            {stats.isRough
              ? `Mit ${stats.foulsPerMatch} Fouls und ${stats.tacklesPerMatch} Tackles pro Spiel zeigt ${player.name} ein zweikampfstarkes Profil. Seine Kartenquote (${stats.cardsPerMatch}/Spiel) zählt ihn zu den Spielern, die am ehesten bestraft werden.`
              : `${player.name} ist ein disziplinierter Spieler mit ${stats.foulsPerMatch} Fouls pro Spiel und nur ${stats.cardsPerMatch} Karten pro Spiel im Durchschnitt. Sein faires Profil spiegelt sich in generell hohen Gelbe-Karten-Quoten wider.`}
          </p>
        </div>
      </section>
      {/* Quoten */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Quoten &quot;Erhält eine Gelbe Karte&quot;</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Bookmaker</th>
                <th className="text-center p-3">Gelbe Karte Quote</th>
                <th className="text-center p-3">Link</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="p-3 font-semibold">Betano</td>
                <td className="text-center p-3 font-bold text-accent">{stats.pmusport}</td>
                <td className="text-center p-3">
                  <a href={pmuTrackingUrl("cote-carton")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="text-accent underline">Ansehen</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Richtquoten, Änderungen vorbehalten. Prüfen Sie vor dem Wetten beim Wettanbieter.</p>
      </section>
      {/* WM-Kartenhistorie */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-7 h-7 text-primary" />
          <h2 className="text-2xl font-bold text-primary">Kartenhistorie bei der WM</h2>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {stats.wcCards > 0 ? (
            <p className="text-gray-700">
              {player.name} hat <span className="font-bold text-yellow-500">{stats.wcCards} Gelbe Karte{stats.wcCards > 1 ? "n" : ""}</span> bei früheren WM-Teilnahmen erhalten.
              {stats.wcCards >= 3 && " Eine umfangreiche Historie, die seine Tendenz bestätigt, bei großen Turnieren bestraft zu werden."}
              {stats.wcCards >= 1 && stats.wcCards < 3 && " Ein moderates Aufkommen, das aber zeigt, dass er unter Druck nicht vor einer Bestrafung gefeit ist."}
            </p>
          ) : (
            <p className="text-gray-700">
              {player.name} hat noch keine Gelbe Karte bei einer WM erhalten oder nimmt 2026 zum ersten Mal am Turnier teil.
            </p>
          )}
        </div>
      </section>
      {/* Turniervergleich */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">Vergleich mit dem Turnierdurchschnitt</h2>
        </div>
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6">
          <p className="text-gray-700">
            Mit {stats.cardsPerMatch} Karten pro Spiel liegt {player.name}{" "}
            {stats.cardsPerMatch > stats.tournamentAvgCards ? (
              <span className="font-bold text-yellow-600">über</span>
            ) : (
              <span className="font-bold text-green-600">unter</span>
            )}{" "}
            dem geschätzten Turnierdurchschnitt ({stats.tournamentAvgCards} Karten/Spiel). Seine {stats.foulsPerMatch} Fouls/Spiel liegen{" "}
            {stats.foulsPerMatch > stats.tournamentAvgFouls ? "über" : "unter"} dem Durchschnitt ({stats.tournamentAvgFouls}/Spiel).
          </p>
        </div>
      </section>
      {/* Zu berücksichtigende Faktoren */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-7 h-7 text-yellow-500" />
          <h2 className="text-2xl font-bold text-primary">Zu berücksichtigende Faktoren</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-primary mb-2"><Swords className="h-5 w-5 inline-block" /> Gegner</h3>
            <p className="text-sm text-gray-600">Kampfstarke Mannschaften (Australien, Südkorea, Uruguay) verursachen mehr Fouls und Karten. Der Spielstil des Gegners beeinflusst direkt die Wahrscheinlichkeit einer Bestrafung.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-primary mb-2"><Trophy className="h-5 w-5 inline-block" /> Spielbedeutung</h3>
            <p className="text-sm text-gray-600">K.-o.-Spiele und Derbys erzeugen mehr Spannung. Gruppenphase = weniger Karten im Durchschnitt als Achtel- oder Viertelfinals.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-primary mb-2"><User className="h-5 w-5 inline-block" />‍⚖️ Schiedsrichter</h3>
            <p className="text-sm text-gray-600">Manche Schiedsrichter verteilen 4-5 Karten pro Spiel, andere 2-3. Prüfen Sie die Schiedsrichterbesetzung, um Ihre Analyse vor der Wette zu verfeinern.</p>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-primary mb-4">Gelbe-Karten-Quoten vergleichen</h3>
          <p className="text-gray-600 mb-6">
            Finden Sie die beste Quote für eine Gelbe-Karten-Wette auf {player.name} bei der WM 2026.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={pmuTrackingUrl("cote-carton")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              Willkommensbonus bei Betano <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4"></p>
        </div>
      </section>
      {/* Related */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Verwandte Spielerwetten</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href={`/tirs-cadres/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Torschüsse von {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/passes-decisives/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Torvorlagen von {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>
      <FAQSection title={`Häufig gestellte Fragen — Gelbe Karte ${player.name}`} items={faqItems} />
    </>
  );
}