import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Banknote, ArrowRight, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Guide du Cashout paris sportifs CDM 2026 — Quand et comment l'utiliser",
  description:
    "Guide complet du cashout en paris sportifs pour la CDM 2026. Comment ça marche, quand l'utiliser, pièges à éviter, comparatif par bookmaker.",
  alternates: { canonical: "https://cdm2026.fr/cashout-guide" },
  openGraph: {
    title: "Guide du Cashout — Paris sportifs CDM 2026",
    description: "Maîtrisez le cashout pour sécuriser vos gains pendant la CDM 2026.",
    url: "https://cdm2026.fr/cashout-guide",
  },
};

const avantages = [
  "Sécuriser un gain partiel avant la fin du match",
  "Limiter les pertes quand le match tourne mal",
  "Gérer le risque sur les combinés longs",
  "Réagir en temps réel aux événements du match (carton rouge, blessure)",
];

const pieges = [
  "Le cashout est toujours calculé en faveur du bookmaker (marge intégrée)",
  "Sur le long terme, accepter le cashout réduit votre rentabilité",
  "Le cashout partiel est souvent plus intéressant que le total",
  "Certains bookmakers désactivent le cashout dans les moments critiques",
  "Ne pas cashouter par peur — analysez rationnellement chaque situation",
];

const comparatif = [
  { bookmaker: "Bet365", cashout: "Total + Partiel", live: true, auto: true, note: "Référence du cashout, le plus complet" },
  { bookmaker: "Betclic", cashout: "Total + Partiel", live: true, auto: false, note: "Bon cashout, disponible sur la plupart des marchés" },
  { bookmaker: "Unibet", cashout: "Total", live: true, auto: false, note: "Cashout total uniquement, pas de partiel" },
  { bookmaker: "Winamax", cashout: "Total + Partiel", live: true, auto: false, note: "Cashout fiable, bien intégré à l'app" },
  { bookmaker: "ParionsSport", cashout: "Total", live: true, auto: false, note: "Cashout basique mais fonctionnel" },
  { bookmaker: "PMU", cashout: "Total", live: false, auto: false, note: "Cashout limité, pas disponible en live" },
];

export default function CashoutGuidePage() {
  const faqItems = [
    {
      question: "Qu'est-ce que le cashout en paris sportifs ?",
      answer: "Le cashout permet de clôturer un pari avant la fin de l'événement. Si votre pari est en bonne voie, le bookmaker vous propose un montant inférieur au gain potentiel mais garanti. Si votre pari tourne mal, vous récupérez une partie de votre mise.",
    },
    {
      question: "Le cashout est-il rentable sur le long terme ?",
      answer: "Statistiquement, non. Le cashout inclut une marge en faveur du bookmaker (5-10% en moyenne). Sur le long terme, vous gagnez plus en laissant vos paris vivre. Utilisez-le de manière sélective pour des situations spécifiques.",
    },
    {
      question: "Quand est-il judicieux de cashouter ?",
      answer: "Cashoutez quand : (1) un joueur clé est blessé et votre pari est en danger, (2) vous avez un combiné à 5 sélections et les 4 premières sont gagnées, (3) la situation du match change radicalement (carton rouge, penalty). Évitez de cashouter par peur.",
    },
  ];

  return (
    <>
<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guide du Cashout" }]} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Guide paris sportifs
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Guide du Cashout CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Sécurisez vos gains ou limitez vos pertes : maîtrisez le cashout pendant la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Comment ça marche */}
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
            <Banknote className="h-7 w-7 text-accent" /> Comment fonctionne le cashout
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Le cashout est une fonctionnalité proposée par la plupart des bookmakers qui vous permet
              de <strong>clôturer un pari en cours</strong> avant que l&apos;événement ne se termine.
              Le montant proposé varie en temps réel selon l&apos;évolution du match.
            </p>
            <p>
              <strong>Exemple :</strong> Vous pariez 10 EUR sur France vainqueur à 2.00 (gain potentiel : 20 EUR).
              À la 70e minute, la France mène 1-0. Le bookmaker vous propose un cashout de 16 EUR.
              Vous pouvez accepter 16 EUR garantis ou attendre les 20 minutes restantes pour potentiellement
              gagner 20 EUR — ou tout perdre si l&apos;adversaire égalise.
            </p>
          </div>
        </section>

        {/* Avantages */}
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
            <CheckCircle className="h-7 w-7 text-green-500" /> Avantages
          </h2>
          <ul className="space-y-2">
            {avantages.map((a) => (
              <li key={a} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{a}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pièges */}
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-yellow-500" /> Pièges à éviter
          </h2>
          <ul className="space-y-2">
            {pieges.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Comparatif bookmakers */}
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
            <Clock className="h-7 w-7 text-accent" /> Comparatif cashout par bookmaker
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Bookmaker</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-center">Live</th>
                  <th className="py-3 px-4 text-center">Auto</th>
                  <th className="py-3 px-4 text-left rounded-tr-lg">Note</th>
                </tr>
              </thead>
              <tbody>
                {comparatif.map((b, i) => (
                  <tr key={b.bookmaker} className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                    <td className="py-3 px-4 font-medium">{b.bookmaker}</td>
                    <td className="py-3 px-4">{b.cashout}</td>
                    <td className="py-3 px-4 text-center">{b.live ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-red-400 mx-auto" />}</td>
                    <td className="py-3 px-4 text-center">{b.auto ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-red-400 mx-auto" />}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{b.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="text-center">
          <Link href="/bankroll-cdm" className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
            Gestion de bankroll CDM <ArrowRight className="h-4 w-4" />
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
