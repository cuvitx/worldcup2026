import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Medal, ArrowRight, Target, Shield, Clock, Users, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Records Coupe du Monde FIFA — Buteurs, sélections, statistiques historiques",
  description:
    "Tous les records de la Coupe du Monde FIFA : meilleurs buteurs (Klose 16), plus jeune buteur, gardien le plus efficace, score le plus large, et bien plus.",
  alternates: { canonical: "https://www.cdm2026.fr/records" },
  openGraph: {
    title: "Records de la Coupe du Monde FIFA",
    description: "Klose 16 buts, Pelé 17 ans, Hongrie-Salvador 10-1... Tous les records historiques.",
    url: "https://www.cdm2026.fr/records",
  },
};

interface RecordCategory {
  icon: typeof Medal;
  title: string;
  records: { label: string; value: string; detail: string }[];
}

const categories: RecordCategory[] = [
  {
    icon: Target,
    title: "Buteurs",
    records: [
      { label: "Meilleur buteur all-time", value: "Miroslav Klose (16 buts)", detail: "Allemagne, 4 CDM (2002-2014)" },
      { label: "2e meilleur buteur", value: "Ronaldo Nazário (15 buts)", detail: "Brésil, 4 CDM (1998-2006)" },
      { label: "3e meilleur buteur", value: "Gerd Müller (14 buts)", detail: "Allemagne, 2 CDM (1970-1974)" },
      { label: "Plus de buts en une édition", value: "Just Fontaine (13 buts)", detail: "France, CDM 1958 — record imbattable" },
      { label: "Plus jeune buteur en CDM", value: "Pelé (17 ans et 239 jours)", detail: "Brésil vs Pays de Galles, CDM 1958" },
      { label: "Plus vieux buteur en CDM", value: "Roger Milla (42 ans et 39 jours)", detail: "Cameroun vs Russie, CDM 1994" },
      { label: "But le plus rapide", value: "Hakan Şükür (11 secondes)", detail: "Turquie vs Corée du Sud, CDM 2002" },
      { label: "Triplé le plus rapide", value: "László Kiss (7 minutes)", detail: "Hongrie vs Salvador, CDM 1982" },
    ],
  },
  {
    icon: Users,
    title: "Sélections et participations",
    records: [
      { label: "Plus de matchs en CDM", value: "Lionel Messi (26 matchs)", detail: "Argentine, 5 CDM (2006-2022)" },
      { label: "Plus de CDM jouées", value: "5 joueurs à 5 éditions", detail: "Messi, Cristiano, Carbajal, Matthäus, Buffon" },
      { label: "Plus de CDM consécutives (équipe)", value: "Brésil (22 éditions)", detail: "Seule équipe présente à chaque CDM depuis 1930" },
      { label: "Plus jeune joueur", value: "Norman Whiteside (17 ans et 41 jours)", detail: "Irlande du Nord, CDM 1982" },
      { label: "Plus vieux joueur", value: "Essam El-Hadary (45 ans et 161 jours)", detail: "Égypte, CDM 2018" },
    ],
  },
  {
    icon: Shield,
    title: "Gardiens et défenses",
    records: [
      { label: "Plus de clean sheets", value: "Fabien Barthez (10)", detail: "France, CDM 1998 et 2006" },
      { label: "Plus longue invincibilité", value: "Walter Zenga (517 minutes)", detail: "Italie, CDM 1990" },
      { label: "Plus d'arrêts en un match", value: "Tim Howard (16 arrêts)", detail: "États-Unis vs Belgique, CDM 2014" },
      { label: "Moins de buts encaissés (champion)", value: "France 1998 (2 buts en 7 matchs)", detail: "Dont 0 but en phase de groupes" },
    ],
  },
  {
    icon: TrendingUp,
    title: "Scores et résultats",
    records: [
      { label: "Score le plus large", value: "Hongrie 10-1 Salvador", detail: "CDM 1982, phase de groupes" },
      { label: "Match le plus prolifique", value: "Autriche 7-5 Suisse (12 buts)", detail: "CDM 1954, quart de finale" },
      { label: "Plus grand comeback", value: "Portugal 3-3 Corée du Nord (de 0-3)", detail: "CDM 1966, Eusébio marque 4 buts" },
      { label: "Plus longue séance de tirs au but", value: "Argentine 4-2 Pays-Bas (après 5-4 tab complet)", detail: "CDM 2014, demi-finale" },
      { label: "Plus de buts en un tournoi", value: "CDM 1998 (171 buts en 64 matchs)", detail: "Moyenne de 2.67 buts/match" },
    ],
  },
  {
    icon: Medal,
    title: "Palmarès équipes",
    records: [
      { label: "Plus de titres", value: "Brésil (5)", detail: "1958, 1962, 1970, 1994, 2002" },
      { label: "Plus de finales", value: "Allemagne (8)", detail: "Dont 4 victoires" },
      { label: "Plus de finales perdues", value: "Pays-Bas (3)", detail: "1974, 1978, 2010 — aucune victoire" },
      { label: "Champion en tant qu'hôte (dernière fois)", value: "France (1998)", detail: "6 pays hôtes ont été champions" },
      { label: "Meilleure différence de buts (tournoi)", value: "Hongrie 1954 (+17)", detail: "27 buts marqués, 10 encaissés — mais finaliste battu" },
    ],
  },
];

export default function RecordsPage() {
  const faqItems = [
    {
      question: "Qui est le meilleur buteur de l'histoire de la Coupe du Monde ?",
      answer: "Miroslav Klose (Allemagne) détient le record avec 16 buts marqués en 4 Coupes du Monde (2002, 2006, 2010, 2014). Il a dépassé Ronaldo Nazário (15 buts) lors de la CDM 2014 au Brésil.",
    },
    {
      question: "Le record de Just Fontaine (13 buts en une édition) peut-il être battu ?",
      answer: "Ce record de 1958 est considéré comme l'un des plus imbattables du sport. Avec le football moderne plus défensif et les rotations d'effectif, aucun joueur ne s'en est approché. Le plus proche fut Ronaldo avec 8 buts en 2002.",
    },
    {
      question: "Quel pays a perdu le plus de finales de CDM ?",
      answer: "Les Pays-Bas et l'Allemagne partagent un triste record : les Pays-Bas ont perdu leurs 3 finales (1974, 1978, 2010) tandis que l'Allemagne a perdu 4 finales sur 8 disputées.",
    },
  ];

  return (
    <>
<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Records" }]} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Statistiques historiques
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Records de la Coupe du Monde
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            De Klose à Pelé, de Hongrie 10-1 Salvador aux 13 buts de Fontaine : tous les records
            qui ont marqué l&apos;histoire de la Coupe du Monde FIFA.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {categories.map((cat) => (
          <section key={cat.title}>
            <div className="flex items-center gap-3 mb-6">
              <cat.icon className="h-7 w-7 text-accent" />
              <h2 className="text-2xl font-bold text-primary">{cat.title}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="py-3 px-4 text-left rounded-tl-lg">Record</th>
                    <th className="py-3 px-4 text-left">Détenteur</th>
                    <th className="py-3 px-4 text-left rounded-tr-lg">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.records.map((r, i) => (
                    <tr
                      key={r.label}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-whitegray-900"}
                    >
                      <td className="py-3 px-4 font-medium">{r.label}</td>
                      <td className="py-3 px-4 font-bold text-accent">{r.value}</td>
                      <td className="py-3 px-4 text-gray-500">{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <div className="text-center">
          <Link
            href="/palmares"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
          >
            Voir le palmarès complet <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
