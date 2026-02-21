import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Target, ArrowRight, TrendingUp, AlertTriangle, Users, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Stratégie paris phase de groupes CDM 2026 — 48 équipes, 12 groupes",
  description:
    "Comment parier sur la phase de groupes de la CDM 2026 à 48 équipes : 12 groupes, meilleurs 3e, matchs du 3e jour, nouvelles dynamiques et stratégies.",
  alternates: { canonical: "https://www.cdm2026.fr/paris-sportifs/strategie" },
  openGraph: {
    title: "Stratégie paris — Phase de groupes CDM 2026",
    description: "Exploitez le nouveau format 48 équipes pour vos paris : 12 groupes, meilleurs 3e, matchs inutiles.",
    url: "https://www.cdm2026.fr/paris-sportifs/strategie",
  },
};

const strategies = [
  {
    icon: Users,
    title: "12 groupes = plus d'opportunités",
    content: "Avec 12 groupes au lieu de 8, le volume de matchs de phase de groupes explose (36 → 48 matchs). Plus de matchs = plus de value à trouver, notamment dans les groupes avec des équipes moins médiatisées où les bookmakers ont moins de données.",
  },
  {
    icon: TrendingUp,
    title: "Les meilleurs 3e : la clé",
    content: "Seulement 8 des 12 troisièmes se qualifient. Cela crée une incertitude permanente : une équipe 3e avec +1 de différence de buts peut se qualifier, une autre avec 0 non. Les cotes en live bougent énormément lors du 3e match de groupe — c'est là que la value se trouve.",
  },
  {
    icon: AlertTriangle,
    title: "Attention aux matchs 'inutiles' du J3",
    content: "Quand deux équipes sont déjà qualifiées avant le 3e match, le match peut devenir 'inutile'. Les sélectionneurs font tourner, la motivation baisse. Pariez sur des scores faibles (under 2.5) ou des nuls dans ces configurations. Mais attention : parfois la 1re place est cruciale pour le tableau.",
  },
  {
    icon: Lightbulb,
    title: "Les petites équipes en J1",
    content: "Historiquement, les 'petites' équipes surperforment lors de leur premier match de CDM (effet euphorie, motivation maximale, tactique ultra-défensive). Recherchez les handicaps asiatiques et les under sur ces matchs J1.",
  },
  {
    icon: Target,
    title: "Live betting sur le J3",
    content: "Le 3e jour de chaque groupe est un terrain de jeu idéal pour le live betting. Les scénarios changent en temps réel selon les résultats de l'autre match simultané. Surveillez les situations où une équipe apprend qu'elle est éliminée en cours de match — l'effondrement est fréquent.",
  },
];

export default function StrategieParisGroupesPage() {
  const faqItems = [
    {
      question: "Le format 48 équipes change-t-il vraiment les paris ?",
      answer: "Oui, fondamentalement. Plus de groupes signifie plus de matchs, plus de scénarios croisés entre groupes (meilleurs 3e), et des bookmakers moins affûtés sur les petites sélections. La value est plus facile à trouver qu'avec 32 équipes.",
    },
    {
      question: "Faut-il parier sur les favoris en phase de groupes ?",
      answer: "Les favoris gagnent souvent mais à des cotes basses (1.20-1.40). La value se trouve dans les handicaps, les over/under et les marchés exacts. Un Brésil -1.5 à 2.10 est souvent plus intéressant qu'un Brésil vainqueur à 1.25.",
    },
    {
      question: "Comment identifier un match 'inutile' ?",
      answer: "Analysez les scénarios de qualification avant le J3 : si les deux équipes sont qualifiées indépendamment des résultats, le match sera probablement à faible intensité. Vérifiez aussi l'enjeu de la 1re place pour le tableau des phases finales.",
    },
  ];

  return (
    <>
<Breadcrumb transparent items={[{ label: "Accueil", href: "/" }, { label: "Stratégie paris groupes" }]} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Stratégie paris sportifs
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Paris sur la phase de groupes CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            48 équipes, 12 groupes, de nouvelles dynamiques : comment exploiter le format inédit
            de la CDM 2026 pour vos paris sportifs.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        <div className="space-y-6">
          {strategies.map((s) => (
            <div key={s.title} className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                  <s.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/paris-sportifs/handicap" className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
            Guide du handicap asiatique <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />

        <p className="text-xs text-gray-400 text-center">
          Les paris sportifs comportent des risques. Jouez responsablement. 18+ | Informations et aide sur joueurs-info-service.fr (ANJ).
        </p>
      </div>
    </>
  );
}
