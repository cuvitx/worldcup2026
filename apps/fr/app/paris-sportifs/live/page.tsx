import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Zap, Smartphone, TrendingUp, Shield, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Paris Live CDM 2026 — Guide du Live Betting en Direct",
  description:
    "Guide complet du live betting pour la CDM 2026. Comment parier en direct, meilleures apps, stratégies live et cashout.",
  alternates: { canonical: "https://www.cdm2026.fr/paris-sportifs/live" },
  openGraph: {
    title: "Paris Live CDM 2026 — Guide Complet",
    description: "Stratégies live betting, meilleures apps et cashout pour la Coupe du Monde 2026.",
    url: "https://www.cdm2026.fr/paris-sportifs/live",
  },
};

const apps = [
  { name: "Winamax", note: "4.8/5", points: "Interface fluide, cotes live compétitives, cashout rapide.", url: "https://www.winamax.fr/paris-sportifs" },
  { name: "Betclic", note: "4.7/5", points: "Nombreux marchés live, streaming intégré, notifications.", url: "https://www.betclic.fr/paris-sportifs" },
  { name: "Unibet", note: "4.6/5", points: "Stats en direct, cashout partiel disponible, interface claire.", url: "https://www.unibet.fr/paris-sportifs" },
  { name: "ParionsSport (FDJ)", note: "4.4/5", points: "Fiable, offre solide, bonus fréquents pour les grands événements.", url: "https://www.enligne.parionssport.fdj.fr" },
];

const strategies = [
  { title: "Le pari sur le prochain but", icon: "goal", desc: "Après un but marqué tôt, les cotes se réajustent. Si le favori mène 1-0, pariez sur 'prochain but' pour l'outsider à une cote intéressante — les équipes menées prennent des risques." },
  { title: "Over 0.5 buts 2ème mi-temps", icon: "half", desc: "Si le score est 0-0 à la pause entre deux bonnes équipes, Over 0.5 buts en 2ème mi-temps offre souvent une cote à 1.30-1.50 très sûre. Les coachs ajustent leurs tactiques." },
  { title: "Le lay du favori après 1-0", icon: "lay", desc: "Quand le favori mène 1-0, ses cotes chutent. Si vous aviez parié sur lui pré-match, c'est le moment idéal pour cashout ou hedger votre position." },
  { title: "Paris sur les cartons 2ème période", icon: "card", desc: "70% des cartons sont distribués en 2ème mi-temps. Attendez la pause pour évaluer la tension du match avant de parier sur Over cartons." },
  { title: "Le corner tardif", icon: "corner", desc: "Les 15 dernières minutes concentrent un pic de corners. Si le match est serré, pariez sur 'prochain corner dans les 5 min' à des cotes avantageuses." },
];

const cashoutTips = [
  "Cashout à 70-80% du gain potentiel si votre équipe mène mais subit la pression.",
  "Ne jamais cashout un pari sûr à plus de 90% de chance de réussite — laissez courir.",
  "Utilisez le cashout partiel pour sécuriser une partie de vos gains tout en gardant de l'exposition.",
  "Évitez le cashout émotionnel après un but contre : attendez 5 minutes que les cotes se stabilisent.",
];

const faqItems = [
  { question: "Qu'est-ce que le live betting ?", answer: "Le live betting (ou paris en direct) permet de parier pendant qu'un match est en cours. Les cotes évoluent en temps réel selon le score, la possession, les occasions et le temps restant. C'est le mode de paris le plus populaire pour les grands événements comme la CDM." },
  { question: "Quelle est la meilleure app pour parier en live sur la CDM 2026 ?", answer: "Winamax et Betclic sont les meilleures apps françaises pour le live betting. Winamax excelle sur la rapidité des cotes et le cashout, tandis que Betclic propose le streaming live de certains matchs directement dans l'app. Les deux sont agréées ANJ." },
  { question: "Qu'est-ce que le cashout ?", answer: "Le cashout permet de clôturer un pari avant la fin du match pour sécuriser un gain (si votre pari est en bonne voie) ou limiter une perte (si le match tourne mal). Le montant proposé dépend des cotes en temps réel. Tous les grands bookmakers français proposent cette option." },
  { question: "Les paris live sont-ils plus rentables que les paris pré-match ?", answer: "Les paris live offrent plus d'opportunités mais requièrent une bonne lecture du jeu. L'avantage : vous voyez le match se dérouler et pouvez repérer des tendances que les cotes n'ont pas encore intégrées. L'inconvénient : les cotes live incluent une marge plus élevée du bookmaker." },
];

export default function ParisLivePage() {
  return (
    <>
<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Paris live" }]} />

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">Paris Live — CDM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Guide complet pour parier en direct pendant les matchs de la Coupe du Monde 2026. Stratégies, apps et cashout.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Comment parier en direct</h2>
        </div>
        <div className="bg-primary/5 rounded-xl p-6">
          <p className="text-gray-700 leading-relaxed mb-4">
            Le live betting transforme chaque match en une expérience immersive. Contrairement aux paris pré-match, vous disposez d&apos;informations en temps réel : forme des équipes, blessures, tempo du jeu, domination territoriale. Ces données permettent de prendre des décisions éclairées.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pour commencer, ouvrez un compte sur un bookmaker agréé ANJ, déposez via carte bancaire ou virement, et rendez-vous dans la section &quot;En direct&quot; pendant un match. Les marchés disponibles incluent : prochain but, score exact live, Over/Under ajusté, corners, cartons et bien plus.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Conseil clé : ne pariez jamais pendant les 5 premières minutes ni juste après un but. Attendez que les cotes se stabilisent pour repérer la vraie value.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Smartphone className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Meilleures apps pour le live betting</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {apps.map((a) => (
            <div key={a.name} className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-primary text-lg">{a.name}</h3>
                <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-lg text-sm">{a.note}</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{a.points}</p>
              <Link href={a.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="text-sm text-accent font-semibold hover:underline">
                Voir l&apos;offre <ArrowRight className="inline w-3 h-3 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-secondary" />
          <h2 className="text-2xl font-bold text-primary">5 stratégies live pour la CDM 2026</h2>
        </div>
        <div className="space-y-4">
          {strategies.map((s, i) => (
            <div key={s.title} className="border-l-4 border-accent pl-5 py-3">
              <h3 className="font-bold text-primary">{i + 1}. {s.title}</h3>
              <p className="text-sm text-gray-700 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Cashout — Sécurisez vos gains</h2>
        </div>
        <div className="bg-secondary/5 rounded-xl p-6">
          <p className="text-gray-700 mb-4">
            Le cashout est votre meilleur allié en live betting. Il permet de transformer un pari en cours en gain assuré (ou de limiter les pertes). Voici les règles d&apos;or :
          </p>
          <ul className="space-y-3">
            {cashoutTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-sm text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <Link href="https://www.winamax.fr/paris-sportifs" target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Commencer les paris live CDM 2026 <ArrowRight className="inline w-4 h-4 ml-1" />
        </Link>
      </section>

      <FAQSection title="Questions fréquentes — Paris live CDM 2026" items={faqItems} />

    </>
  );
}
