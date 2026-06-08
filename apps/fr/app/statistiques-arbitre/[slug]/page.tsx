import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { AlertTriangle, ArrowRight, BarChart3, Calendar, CircleDot, Flag, Scale, Shield, TrendingUp, User } from "lucide-react";

export const revalidate = 3600;
export const dynamicParams = false;

/* ── Referee data ── */
interface Referee {
  slug: string;
  name: string;
  nationality: string;
  confederation: string;
  birthYear: number;
  matchesReffed: number;
  yellowPerMatch: number;
  redPerMatch: number;
  penaltiesPerMatch: number;
  severity: number; // 1-10
  style: "Permissif" | "Équilibré" | "Sévère" | "Très sévère";
}

const referees: Referee[] = [
  { slug: "facundo-tello", name: "Facundo Tello", nationality: "Argentine", confederation: "CONMEBOL", birthYear: 1982, matchesReffed: 58, yellowPerMatch: 4.8, redPerMatch: 0.32, penaltiesPerMatch: 0.38, severity: 8, style: "Sévère" },
  { slug: "jesus-valenzuela", name: "Jesús Valenzuela", nationality: "Venezuela", confederation: "CONMEBOL", birthYear: 1983, matchesReffed: 52, yellowPerMatch: 4.3, redPerMatch: 0.25, penaltiesPerMatch: 0.35, severity: 7, style: "Sévère" },
  { slug: "wilton-sampaio", name: "Wilton Sampaio", nationality: "Brésil", confederation: "CONMEBOL", birthYear: 1982, matchesReffed: 61, yellowPerMatch: 4.5, redPerMatch: 0.28, penaltiesPerMatch: 0.42, severity: 7, style: "Sévère" },
  { slug: "raphael-claus", name: "Raphael Claus", nationality: "Brésil", confederation: "CONMEBOL", birthYear: 1979, matchesReffed: 55, yellowPerMatch: 4.1, redPerMatch: 0.22, penaltiesPerMatch: 0.45, severity: 6, style: "Équilibré" },
  { slug: "cesar-ramos", name: "César Ramos", nationality: "Mexique", confederation: "CONCACAF", birthYear: 1983, matchesReffed: 64, yellowPerMatch: 3.8, redPerMatch: 0.18, penaltiesPerMatch: 0.33, severity: 5, style: "Équilibré" },
  { slug: "fernando-rapallini", name: "Fernando Rapallini", nationality: "Argentine", confederation: "CONMEBOL", birthYear: 1978, matchesReffed: 48, yellowPerMatch: 4.0, redPerMatch: 0.20, penaltiesPerMatch: 0.30, severity: 6, style: "Équilibré" },
  { slug: "andres-matonte", name: "Andrés Matonte", nationality: "Uruguay", confederation: "CONMEBOL", birthYear: 1981, matchesReffed: 45, yellowPerMatch: 4.2, redPerMatch: 0.24, penaltiesPerMatch: 0.36, severity: 7, style: "Sévère" },
  { slug: "piero-maza", name: "Piero Maza", nationality: "Chili", confederation: "CONMEBOL", birthYear: 1987, matchesReffed: 38, yellowPerMatch: 3.9, redPerMatch: 0.19, penaltiesPerMatch: 0.34, severity: 6, style: "Équilibré" },
  { slug: "mario-escobar", name: "Mario Escobar", nationality: "Guatemala", confederation: "CONCACAF", birthYear: 1987, matchesReffed: 42, yellowPerMatch: 3.6, redPerMatch: 0.15, penaltiesPerMatch: 0.28, severity: 5, style: "Équilibré" },
  { slug: "ivan-barton", name: "Ivan Barton", nationality: "Salvador", confederation: "CONCACAF", birthYear: 1986, matchesReffed: 40, yellowPerMatch: 3.5, redPerMatch: 0.14, penaltiesPerMatch: 0.31, severity: 4, style: "Permissif" },
  { slug: "clement-turpin", name: "Clément Turpin", nationality: "France", confederation: "UEFA", birthYear: 1982, matchesReffed: 72, yellowPerMatch: 4.1, redPerMatch: 0.21, penaltiesPerMatch: 0.38, severity: 6, style: "Équilibré" },
  { slug: "francois-letexier", name: "François Letexier", nationality: "France", confederation: "UEFA", birthYear: 1989, matchesReffed: 48, yellowPerMatch: 3.7, redPerMatch: 0.16, penaltiesPerMatch: 0.35, severity: 5, style: "Équilibré" },
  { slug: "szymon-marciniak", name: "Szymon Marciniak", nationality: "Pologne", confederation: "UEFA", birthYear: 1981, matchesReffed: 68, yellowPerMatch: 3.9, redPerMatch: 0.20, penaltiesPerMatch: 0.40, severity: 6, style: "Équilibré" },
  { slug: "daniele-orsato", name: "Daniele Orsato", nationality: "Italie", confederation: "UEFA", birthYear: 1975, matchesReffed: 82, yellowPerMatch: 4.4, redPerMatch: 0.26, penaltiesPerMatch: 0.42, severity: 7, style: "Sévère" },
  { slug: "antonio-mateu-lahoz", name: "Antonio Mateu Lahoz", nationality: "Espagne", confederation: "UEFA", birthYear: 1977, matchesReffed: 76, yellowPerMatch: 5.2, redPerMatch: 0.35, penaltiesPerMatch: 0.48, severity: 9, style: "Très sévère" },
  { slug: "felix-brych", name: "Felix Brych", nationality: "Allemagne", confederation: "UEFA", birthYear: 1975, matchesReffed: 80, yellowPerMatch: 3.8, redPerMatch: 0.17, penaltiesPerMatch: 0.36, severity: 5, style: "Équilibré" },
  { slug: "daniel-siebert", name: "Daniel Siebert", nationality: "Allemagne", confederation: "UEFA", birthYear: 1984, matchesReffed: 52, yellowPerMatch: 4.0, redPerMatch: 0.22, penaltiesPerMatch: 0.37, severity: 6, style: "Équilibré" },
  { slug: "michael-oliver", name: "Michael Oliver", nationality: "Angleterre", confederation: "UEFA", birthYear: 1985, matchesReffed: 58, yellowPerMatch: 3.4, redPerMatch: 0.13, penaltiesPerMatch: 0.44, severity: 4, style: "Permissif" },
  { slug: "anthony-taylor", name: "Anthony Taylor", nationality: "Angleterre", confederation: "UEFA", birthYear: 1978, matchesReffed: 65, yellowPerMatch: 3.6, redPerMatch: 0.16, penaltiesPerMatch: 0.40, severity: 5, style: "Équilibré" },
  { slug: "slavko-vincic", name: "Slavko Vinčić", nationality: "Slovénie", confederation: "UEFA", birthYear: 1979, matchesReffed: 55, yellowPerMatch: 3.8, redPerMatch: 0.19, penaltiesPerMatch: 0.33, severity: 5, style: "Équilibré" },
  { slug: "istvan-kovacs", name: "István Kovács", nationality: "Roumanie", confederation: "UEFA", birthYear: 1984, matchesReffed: 50, yellowPerMatch: 4.3, redPerMatch: 0.27, penaltiesPerMatch: 0.39, severity: 7, style: "Sévère" },
  { slug: "halil-umut-meler", name: "Halil Umut Meler", nationality: "Turquie", confederation: "UEFA", birthYear: 1986, matchesReffed: 44, yellowPerMatch: 4.6, redPerMatch: 0.30, penaltiesPerMatch: 0.36, severity: 8, style: "Sévère" },
  { slug: "abdulrahman-al-jassim", name: "Abdulrahman Al-Jassim", nationality: "Qatar", confederation: "AFC", birthYear: 1984, matchesReffed: 46, yellowPerMatch: 3.7, redPerMatch: 0.16, penaltiesPerMatch: 0.32, severity: 5, style: "Équilibré" },
  { slug: "mustapha-ghorbal", name: "Mustapha Ghorbal", nationality: "Algérie", confederation: "CAF", birthYear: 1985, matchesReffed: 43, yellowPerMatch: 4.0, redPerMatch: 0.21, penaltiesPerMatch: 0.30, severity: 6, style: "Équilibré" },
  { slug: "victor-gomes", name: "Victor Gomes", nationality: "Afrique du Sud", confederation: "CAF", birthYear: 1984, matchesReffed: 47, yellowPerMatch: 4.2, redPerMatch: 0.23, penaltiesPerMatch: 0.34, severity: 6, style: "Équilibré" },
  { slug: "bakary-gassama", name: "Bakary Gassama", nationality: "Gambie", confederation: "CAF", birthYear: 1979, matchesReffed: 62, yellowPerMatch: 3.5, redPerMatch: 0.14, penaltiesPerMatch: 0.29, severity: 4, style: "Permissif" },
  { slug: "salima-mukansanga", name: "Salima Mukansanga", nationality: "Rwanda", confederation: "CAF", birthYear: 1988, matchesReffed: 35, yellowPerMatch: 3.3, redPerMatch: 0.12, penaltiesPerMatch: 0.27, severity: 4, style: "Permissif" },
  { slug: "maguette-ndiaye", name: "Maguette Ndiaye", nationality: "Sénégal", confederation: "CAF", birthYear: 1982, matchesReffed: 50, yellowPerMatch: 4.1, redPerMatch: 0.22, penaltiesPerMatch: 0.33, severity: 6, style: "Équilibré" },
  { slug: "ma-ning", name: "Ma Ning", nationality: "Chine", confederation: "AFC", birthYear: 1979, matchesReffed: 53, yellowPerMatch: 3.6, redPerMatch: 0.15, penaltiesPerMatch: 0.31, severity: 5, style: "Équilibré" },
  { slug: "yoshimi-yamashita", name: "Yoshimi Yamashita", nationality: "Japon", confederation: "AFC", birthYear: 1986, matchesReffed: 38, yellowPerMatch: 3.2, redPerMatch: 0.11, penaltiesPerMatch: 0.25, severity: 3, style: "Permissif" },
  { slug: "chris-beath", name: "Chris Beath", nationality: "Australie", confederation: "AFC", birthYear: 1982, matchesReffed: 44, yellowPerMatch: 3.7, redPerMatch: 0.17, penaltiesPerMatch: 0.33, severity: 5, style: "Équilibré" },
  { slug: "matthew-conger", name: "Matthew Conger", nationality: "Nouvelle-Zélande", confederation: "OFC", birthYear: 1980, matchesReffed: 41, yellowPerMatch: 3.4, redPerMatch: 0.13, penaltiesPerMatch: 0.28, severity: 4, style: "Permissif" },
  { slug: "ismail-elfath", name: "Ismail Elfath", nationality: "États-Unis", confederation: "CONCACAF", birthYear: 1984, matchesReffed: 50, yellowPerMatch: 3.5, redPerMatch: 0.15, penaltiesPerMatch: 0.32, severity: 5, style: "Équilibré" },
  { slug: "kralovec-pavel", name: "Pavel Královec", nationality: "Tchéquie", confederation: "UEFA", birthYear: 1977, matchesReffed: 56, yellowPerMatch: 4.0, redPerMatch: 0.20, penaltiesPerMatch: 0.35, severity: 6, style: "Équilibré" },
  { slug: "nicholas-mohammed", name: "Nicholas Mohammed", nationality: "Trinité-et-Tobago", confederation: "CONCACAF", birthYear: 1985, matchesReffed: 36, yellowPerMatch: 3.8, redPerMatch: 0.18, penaltiesPerMatch: 0.30, severity: 5, style: "Équilibré" },
  { slug: "said-martinez", name: "Saíd Martínez", nationality: "Honduras", confederation: "CONCACAF", birthYear: 1990, matchesReffed: 34, yellowPerMatch: 3.9, redPerMatch: 0.19, penaltiesPerMatch: 0.34, severity: 6, style: "Équilibré" },
];

const refereesBySlug: Record<string, Referee> = Object.fromEntries(
  referees.map((r) => [r.slug, r])
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return referees.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ref = refereesBySlug[slug];
  if (!ref) return {};

  const age = 2026 - ref.birthYear;

  return {
    title: `${ref.name} — Statistiques Arbitre CDM 2026 | Cartons, Sévérité & Impact Paris`,
    description: `Profil et stats de ${ref.name} (${ref.nationality}) : ${ref.yellowPerMatch} jaunes/match, style ${ref.style}. Impact sur les paris CDM 2026.`,
    openGraph: {
      title: `${ref.name} — Arbitre CDM 2026`,
      description: `Stats de ${ref.name} : ${ref.yellowPerMatch} jaunes/match, sévérité ${ref.severity}/10. Impact sur les paris.`,
      url: `${domains.fr}/statistiques-arbitre/${ref.slug}`,
    },
    alternates: {
      canonical: `https://www.cdm2026.fr/statistiques-arbitre/${ref.slug}`,
    },
  };
}

/* ── Style color helpers ── */
function styleColor(style: Referee["style"]) {
  switch (style) {
    case "Permissif": return { bg: "bg-green-100", text: "text-green-800", bar: "from-green-400 to-green-500" };
    case "Équilibré": return { bg: "bg-blue-100", text: "text-blue-800", bar: "from-blue-400 to-blue-500" };
    case "Sévère": return { bg: "bg-orange-100", text: "text-orange-800", bar: "from-orange-400 to-orange-500" };
    case "Très sévère": return { bg: "bg-red-100", text: "text-red-800", bar: "from-red-400 to-red-500" };
  }
}

function overUnderRecommendation(ref: Referee) {
  if (ref.yellowPerMatch >= 4.5) {
    return {
      cards: "Over 4.5 cartons recommandé",
      detail: `Avec ${ref.yellowPerMatch} jaunes/match en moyenne, ${ref.name} est un arbitre généreux en cartons. Le marché over 4.5 cartons totaux est statistiquement favorable.`,
      trend: "up" as const,
    };
  }
  if (ref.yellowPerMatch >= 3.8) {
    return {
      cards: "Over 3.5 cartons envisageable",
      detail: `${ref.name} distribue ${ref.yellowPerMatch} jaunes/match. Le over 3.5 cartons est un pari solide, surtout dans des matchs à enjeu.`,
      trend: "up" as const,
    };
  }
  return {
    cards: "Under 3.5 cartons à considérer",
    detail: `${ref.name} est un arbitre plutôt permissif avec seulement ${ref.yellowPerMatch} jaunes/match. Le under 3.5 cartons peut offrir de la valeur.`,
    trend: "down" as const,
  };
}

export default async function StatistiquesArbitrePage({ params }: PageProps) {
  const { slug } = await params;
  const ref = refereesBySlug[slug];
  if (!ref) notFound();

  const age = 2026 - ref.birthYear;
  const colors = styleColor(ref.style);
  const recommendation = overUnderRecommendation(ref);

  const faqItems = [
    {
      question: `Quel est le style d'arbitrage de ${ref.name} ?`,
      answer: `${ref.name} est considéré comme un arbitre "${ref.style}" avec une sévérité de ${ref.severity}/10. Il distribue en moyenne ${ref.yellowPerMatch} cartons jaunes et ${ref.redPerMatch} carton rouge par match.`,
    },
    {
      question: `${ref.name} siffle-t-il beaucoup de penalties ?`,
      answer: `${ref.name} siffle en moyenne ${ref.penaltiesPerMatch} penalty par match, ce qui est ${ref.penaltiesPerMatch >= 0.4 ? "au-dessus" : ref.penaltiesPerMatch >= 0.3 ? "dans" : "en-dessous de"} la moyenne FIFA.`,
    },
    {
      question: `Quels matchs ${ref.name} va-t-il arbitrer à la CDM 2026 ?`,
      answer: `Les désignations des arbitres pour chaque match de la CDM 2026 seront annoncées par la FIFA quelques jours avant chaque rencontre. Cette page sera mise à jour en temps réel.`,
    },
    {
      question: `L'arbitre influence-t-il les paris sportifs ?`,
      answer: `Oui, le profil de l'arbitre impacte certains marchés : nombre de cartons (over/under), penalties, et même le nombre de buts. Un arbitre sévère favorise les cartons, tandis qu'un arbitre permissif laisse jouer davantage.`,
    },
  ];

  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm text-white/60 mb-2">{ref.confederation} — {ref.nationality}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            <span className="text-accent">{ref.name}</span>
          </h1>
          <p className="text-white/80">
            Arbitre international — {age} ans — {ref.matchesReffed} matchs internationaux dirigés
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 space-y-12">
        {/* Breadcrumb visuel */}
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#022149]">Accueil</Link>
          <span>/</span>
          <Link href="/arbitres" className="hover:text-[#022149]">Arbitres</Link>
          <span>/</span>
          <span className="text-[#022149] font-medium">{ref.name}</span>
        </nav>

        {/* Profil */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <User className="h-6 w-6 text-[#00B865]" />
            Profil
          </h2>
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Nationalité", value: ref.nationality, icon: Flag },
                { label: "Confédération", value: ref.confederation, icon: Shield },
                { label: "Âge", value: `${age} ans`, icon: Calendar },
                { label: "Matchs dirigés", value: String(ref.matchesReffed), icon: BarChart3 },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className="h-5 w-5 mx-auto mb-2 text-[#D4AF37]" />
                  <div className="text-lg font-bold text-[#022149]">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistiques */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#00B865]" />
            Statistiques par match
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Cartons jaunes / match", value: ref.yellowPerMatch.toFixed(1), icon: AlertTriangle, color: "text-yellow-500" },
              { label: "Cartons rouges / match", value: ref.redPerMatch.toFixed(2), icon: AlertTriangle, color: "text-red-500" },
              { label: "Penalties / match", value: ref.penaltiesPerMatch.toFixed(2), icon: TrendingUp, color: "text-[#00B865]" },
              { label: "Sévérité", value: `${ref.severity}/10`, icon: Scale, color: "text-[#D4AF37]" },
              { label: "Style", value: ref.style, icon: Shield, color: "text-[#022149]" },
              { label: "Matchs internationaux", value: String(ref.matchesReffed), icon: Flag, color: "text-[#022149]" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-gray-200 p-4 text-center">
                <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-[#022149]">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Jauge de sévérité */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-[#D4AF37]" />
            Jauge de sévérité
          </h2>
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-lg font-bold text-[#022149]">Style :</div>
              <span className={`px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-medium`}>
                {ref.style}
              </span>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Permissif</span>
                <span>Équilibré</span>
                <span>Sévère</span>
                <span>Très sévère</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${colors.bar} rounded-full transition-all`}
                  style={{ width: `${ref.severity * 10}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-700">
              {ref.name} affiche une sévérité de <strong>{ref.severity}/10</strong>.{" "}
              {ref.severity >= 8
                ? "C'est un arbitre très strict qui n'hésite pas à sortir les cartons. Les joueurs doivent faire attention à chaque tacle."
                : ref.severity >= 6
                  ? "C'est un arbitre modérément strict qui sanctionne les fautes grossières tout en laissant le jeu se dérouler."
                  : "C'est un arbitre permissif qui laisse jouer et intervient principalement sur les fautes flagrantes."}
            </p>
          </div>
        </section>

        {/* Impact sur les paris */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[#00B865]" />
            Impact sur les paris
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 border-l-4 border-l-[#00B865] p-4">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-bold text-[#022149]"><BarChart3 className="h-5 w-5 inline-block" /> Marché cartons</h3>
                <span className="text-xs font-medium text-[#00B865]">{recommendation.cards}</span>
              </div>
              <p className="text-sm text-gray-700">{recommendation.detail}</p>
            </div>
            <div className="rounded-xl border border-gray-200 border-l-4 border-l-[#D4AF37] p-4">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-bold text-[#022149]"><CircleDot className="h-5 w-5 inline-block" /> Penalties</h3>
                <span className="text-xs font-medium text-[#D4AF37]">
                  {ref.penaltiesPerMatch >= 0.4 ? "Tendance élevée" : ref.penaltiesPerMatch >= 0.3 ? "Moyenne" : "Tendance basse"}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                Avec {ref.penaltiesPerMatch} penalty/match, {ref.name}{" "}
                {ref.penaltiesPerMatch >= 0.4
                  ? "a une tendance au-dessus de la moyenne à siffler des penalties. Le marché \"penalty dans le match\" peut avoir de la valeur."
                  : ref.penaltiesPerMatch >= 0.3
                    ? "est dans la moyenne FIFA pour les penalties. Pas de biais particulier."
                    : "siffle peu de penalties. Le marché \"pas de penalty\" pourrait être intéressant."}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 border-l-4 border-l-red-500 p-4">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-bold text-[#022149]"> Cartons rouges</h3>
                <span className="text-xs font-medium text-red-500">
                  {ref.redPerMatch >= 0.3 ? "Risque élevé" : ref.redPerMatch >= 0.2 ? "Risque modéré" : "Risque faible"}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {ref.redPerMatch} rouge/match — {ref.redPerMatch >= 0.3
                  ? "Attention, cet arbitre n'hésite pas à exclure. Le marché \"carton rouge dans le match\" mérite d'être étudié."
                  : ref.redPerMatch >= 0.2
                    ? "Dans la norme FIFA. Les expulsions restent des événements rares mais possibles."
                    : "Peu d'expulsions attendues. Cet arbitre préfère le carton jaune d'avertissement."}
              </p>
            </div>
          </div>
        </section>

        {/* Matchs assignés */}
        <section>
          <h2 className="text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-[#00B865]" />
            Matchs assignés — CDM 2026
          </h2>
          <div className="rounded-xl border-2 border-dashed border-[#D4AF37]/40 bg-[#D4AF37]/5 p-8 text-center">
            <Scale className="h-10 w-10 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-bold text-[#022149] mb-2">À confirmer par la FIFA</h3>
            <p className="text-sm text-gray-500">
              Les désignations officielles sont annoncées quelques jours avant chaque match.
              Cette section sera mise à jour automatiquement dès les annonces de la FIFA.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Link
            href="/arbitres"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold text-lg hover:opacity-90 transition"
          >
            Voir tous les arbitres CDM 2026
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="mt-4">
            <Link href="/simulateur" className="text-sm text-[#022149] underline hover:no-underline">
              Simuler les matchs de la CDM 2026
            </Link>
          </div>
        </section>

        <FAQSection title="Questions sur l'arbitrage" items={faqItems} />

        <p className="text-xs text-gray-400 text-center">
          Les paris sportifs comportent des risques. Jouez responsable. 18+ | Autorité Nationale des Jeux (ANJ) —{" "}
          <a href="https://www.joueurs-info-service.fr" className="underline" target="_blank" rel="noopener noreferrer">
            joueurs-info-service.fr
          </a>
        </p>
      </main>
    </>
  );
}
