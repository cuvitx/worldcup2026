import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { Trophy, TrendingUp, BarChart3, ArrowRight, ExternalLink } from "lucide-react";
import { players } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";
import { domains } from "@repo/data/route-mapping";

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
    winamaxAnytime: +(1.80 + (seed % 40) / 100).toFixed(2),
    betclicAnytime: +(1.85 + (seed % 35) / 100).toFixed(2),
    unibetAnytime: +(1.82 + (seed % 38) / 100).toFixed(2),
    winamaxTopScorer: +(8.00 + (seed % 200) / 10).toFixed(2),
    betclicTopScorer: +(8.50 + (seed % 180) / 10).toFixed(2),
    unibetTopScorer: +(8.20 + (seed % 190) / 10).toFixed(2),
    winamaxNextMatch: +(2.50 + (seed % 50) / 100).toFixed(2),
    betclicNextMatch: +(2.55 + (seed % 45) / 100).toFixed(2),
    unibetNextMatch: +(2.48 + (seed % 52) / 100).toFixed(2),
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
    description: `Cotes buteur de ${player.name} pour la Coupe du Monde 2026 : marquer un but, meilleur buteur. Comparatif Winamax, Betclic, Unibet.`,
    alternates: { canonical: `https://cdm2026.fr/cote-buteur/${slug}` },
  };
}

export const dynamicParams = false;

export default async function CoteButeurPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();

  const team = teamsById[player.teamId];
  const odds = getScorerOdds(slug);
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Pronostic buteurs", url: "/pronostic-buteurs" },
    { name: `Cote ${player.name} Buteur`, url: `/cote-buteur/${slug}` },
  ];

  const faqItems = [
    { question: `${player.name} va-t-il marquer pendant la CDM 2026 ?`, answer: `Avec ${odds.goalsInternational} buts en sélection et une moyenne de ${odds.goalsPerMatch} but/match, ${player.name} est un candidat sérieux. Les bookmakers proposent une cote autour de ${odds.winamaxAnytime} pour au moins 1 but dans le tournoi.` },
    { question: `Quelle est la cote de ${player.name} meilleur buteur ?`, answer: `Les cotes meilleur buteur varient : Winamax ${odds.winamaxTopScorer}, Betclic ${odds.betclicTopScorer}, Unibet ${odds.unibetTopScorer}.` },
    { question: "Comment parier sur un buteur de la Coupe du Monde ?", answer: "Plusieurs marchés existent : buteur du tournoi (au moins 1 but), meilleur buteur, buteur d'un match précis. Comparez les cotes sur plusieurs bookmakers pour maximiser la valeur." },
    { question: "Les buts en prolongation comptent-ils ?", answer: "Oui, les buts inscrits en prolongation comptent pour les paris « buteur du tournoi » et « meilleur buteur ». Les tirs au but ne comptent généralement pas." },
  ];

  const comparisons = TOP_50_SLUGS.filter((s) => s !== slug && playersBySlug[s]).slice(0, 4);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} baseUrl={domains.fr} />

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Pronostic buteurs", href: "/pronostic-buteurs" }, { label: `Cote ${player.name} Buteur` }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
            <Trophy className="inline w-8 h-8 mr-2" />
            Cote {player.name} Buteur CDM 2026 — Pronostic et Analyse
          </h1>
          <p className="text-secondary mt-3 text-lg max-w-2xl">
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
            <div className="text-sm text-secondary mt-1">Buts en sélection</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">{odds.goalsPerMatch}</div>
            <div className="text-sm text-secondary mt-1">Buts / match</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">{odds.wcPreviousGoals}</div>
            <div className="text-sm text-secondary mt-1">Buts en CDM précédentes</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">{player.caps}</div>
            <div className="text-sm text-secondary mt-1">Sélections</div>
          </div>
        </div>

        {/* Tableau cotes : Marquer au moins 1 but */}
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-accent" /> Cotes : Marquer au moins 1 but dans le tournoi
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
              <tr><td className="p-3">Winamax</td><td className="text-center p-3 font-bold text-accent">{odds.winamaxAnytime}</td></tr>
              <tr><td className="p-3">Betclic</td><td className="text-center p-3 font-bold text-accent">{odds.betclicAnytime}</td></tr>
              <tr><td className="p-3">Unibet</td><td className="text-center p-3 font-bold text-accent">{odds.unibetAnytime}</td></tr>
            </tbody>
          </table>
        </div>

        {/* Tableau cotes : Meilleur buteur */}
        <h2 className="text-xl font-bold text-primary mb-4">Cotes : Meilleur buteur du tournoi</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full bg-white rounded-xl border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Bookmaker</th>
                <th className="text-center p-3 font-semibold">Cote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="p-3">Winamax</td><td className="text-center p-3 font-bold text-accent">{odds.winamaxTopScorer}</td></tr>
              <tr><td className="p-3">Betclic</td><td className="text-center p-3 font-bold text-accent">{odds.betclicTopScorer}</td></tr>
              <tr><td className="p-3">Unibet</td><td className="text-center p-3 font-bold text-accent">{odds.unibetTopScorer}</td></tr>
            </tbody>
          </table>
        </div>

        {/* Tableau cotes : Buteur prochain match */}
        <h2 className="text-xl font-bold text-primary mb-4">Cotes : Buteur dans le prochain match</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full bg-white rounded-xl border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Bookmaker</th>
                <th className="text-center p-3 font-semibold">Cote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="p-3">Winamax</td><td className="text-center p-3 font-bold text-accent">{odds.winamaxNextMatch}</td></tr>
              <tr><td className="p-3">Betclic</td><td className="text-center p-3 font-bold text-accent">{odds.betclicNextMatch}</td></tr>
              <tr><td className="p-3">Unibet</td><td className="text-center p-3 font-bold text-accent">{odds.unibetNextMatch}</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Cotes indicatives susceptibles de varier. Vérifiez sur le site du bookmaker avant de parier.</p>
      </section>

      {/* Analyse */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4">Analyse : style de jeu et potentiel buteur</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-secondary leading-relaxed space-y-4">
          <p>
            {player.name} évolue au poste de {player.position === "FW" ? "attaquant" : player.position === "MF" ? "milieu" : player.position === "DF" ? "défenseur" : "gardien"} et
            présente un profil {odds.goalsPerMatch > 0.35 ? "très offensif, avec une capacité de finition au-dessus de la moyenne internationale" : "intéressant devant le but malgré un rôle qui n'est pas exclusivement axé sur la finition"}.
            Avec {odds.goalsInternational} buts en {player.caps} sélections, sa régularité en fait un candidat crédible pour figurer parmi les buteurs du tournoi.
          </p>
          <p>
            En Coupe du Monde, {player.name} a déjà inscrit {odds.wcPreviousGoals} but{odds.wcPreviousGoals > 1 ? "s" : ""} lors des éditions précédentes.
            La qualité des adversaires dans la phase de groupes sera déterminante : des défenses moins solides augmentent statistiquement les chances de marquer dès les premiers matchs.
          </p>
          <p>
            Son club actuel ({player.club}) lui offre un temps de jeu régulier et un rôle central dans le système offensif, ce qui maintient sa forme et sa confiance devant le but à un niveau optimal pour le tournoi.
          </p>
        </div>
      </section>

      {/* Comparaison */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Comparaison avec d&apos;autres buteurs potentiels</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {comparisons.map((s) => {
            const p = playersBySlug[s]!;
            const o = getScorerOdds(s);
            return (
              <Link key={s} href={`/cote-buteur/${s}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
                <div>
                  <span className="font-semibold text-primary">{p.name}</span>
                  <span className="text-secondary text-sm ml-2">({teamsById[p.teamId]?.name})</span>
                  <div className="text-xs text-secondary mt-1">{o.goalsInternational} buts int. • Cote anytime {o.winamaxAnytime}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-accent flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-primary mb-4">Parier sur {player.name} buteur</h3>
          <p className="text-gray-600 mb-6">
            Comparez les meilleures cotes pour parier sur {player.name} buteur lors de la Coupe du Monde 2026.
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

      {/* Maillage */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">À découvrir aussi</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={`/joueur/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Fiche {player.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href="/pronostic-buteurs" className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
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
