import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Trophy, ArrowRight, Swords } from "lucide-react";

export const metadata: Metadata = {
  title: "Confrontations historiques de la Coupe du Monde — Top 20 matchs mythiques",
  description:
    "Revivez les 20 confrontations les plus mythiques de l'histoire de la Coupe du Monde : France-Brésil 1998, Argentine-Angleterre 1986, Allemagne-Brésil 2014 et bien d'autres.",
  openGraph: {
    title: "Top 20 confrontations mythiques en Coupe du Monde",
    description: "De Maradona 86 à la finale 2022 : les matchs qui ont marqué l'histoire du football.",
    url: "https://cdm2026.fr/confrontations-historiques",
  },
  alternates: { canonical: "https://cdm2026.fr/confrontations-historiques" },
};

const confrontations = [
  {
    annee: "1970",
    match: "Italie 4 – 3 Allemagne",
    tour: "Demi-finale",
    slug: "italie-allemagne-1970",
    resume: "Le « match du siècle ». 5 buts en prolongation dans une folie offensive à l'Azteca. Rivera marque le but décisif. Un monument du football mondial.",
  },
  {
    annee: "1986",
    match: "Argentine 2 – 1 Angleterre",
    tour: "Quart de finale",
    slug: "argentine-angleterre-1986",
    resume: "La main de Dieu et le plus beau but de l'histoire. Maradona traverse tout le terrain et dribble 6 joueurs. Deux buts aux antipodes, un match légendaire.",
  },
  {
    annee: "1998",
    match: "France 3 – 0 Brésil",
    tour: "Finale",
    slug: "france-bresil-1998",
    resume: "Zidane inscrit un doublé de la tête et la France décroche sa première étoile au Stade de France. Le mystère Ronaldo et la consécration des Bleus.",
  },
  {
    annee: "1982",
    match: "Italie 3 – 2 Brésil",
    tour: "2e tour",
    slug: "italie-bresil-1982",
    resume: "Paolo Rossi inscrit un triplé face au Brésil le plus beau de l'histoire. Le « jogo bonito » s'incline devant le réalisme italien dans un match d'anthologie.",
  },
  {
    annee: "1982",
    match: "France 3 – 3 Allemagne (tab 4-5)",
    tour: "Demi-finale",
    slug: "france-allemagne-1982",
    resume: "Le drame de Séville. La faute de Schumacher sur Battiston, la remontée française en prolongation, et l'issue cruelle aux tirs au but. Le match fondateur du football français.",
  },
  {
    annee: "1950",
    match: "Uruguay 2 – 1 Brésil",
    tour: "Match décisif",
    slug: "uruguay-bresil-1950",
    resume: "Le « Maracanazo ». L'Uruguay renverse le Brésil devant 200 000 spectateurs au Maracanã. Le silence du stade est resté dans l'histoire comme le plus assourdissant.",
  },
  {
    annee: "2014",
    match: "Allemagne 7 – 1 Brésil",
    tour: "Demi-finale",
    slug: "allemagne-bresil-2014",
    resume: "L'humiliation du siècle. 5 buts en 18 minutes. Le Brésil s'effondre dans son propre Mondial. Un score impensable qui restera gravé pour l'éternité.",
  },
  {
    annee: "2006",
    match: "Italie 1 – 1 France (tab 5-3)",
    tour: "Finale",
    slug: "italie-france-2006",
    resume: "Le coup de tête de Zidane sur Materazzi, l'expulsion en finale et la victoire italienne aux penalties. La fin tragique d'un immense champion.",
  },
  {
    annee: "2022",
    match: "Argentine 3 – 3 France (tab 4-2)",
    tour: "Finale",
    slug: "argentine-france-2022",
    resume: "La plus grande finale de l'histoire. Mbappé inscrit un triplé mais Messi soulève enfin le trophée. 6 buts, des retournements incroyables, 120 minutes de folie.",
  },
  {
    annee: "1966",
    match: "Angleterre 4 – 2 Allemagne",
    tour: "Finale",
    slug: "angleterre-allemagne-1966",
    resume: "Le but fantôme de Hurst et le triplé en finale. L'unique titre de l'Angleterre, à domicile à Wembley. Un match encore débattu 60 ans plus tard.",
  },
  {
    annee: "1986",
    match: "France 0 – 2 Allemagne",
    tour: "Demi-finale",
    slug: "france-allemagne-1986",
    resume: "La revanche ratée de Séville. Brehme et Völler éliminent les Bleus de Platini. La malédiction des demi-finales se poursuit pour la France.",
  },
  {
    annee: "2010",
    match: "Uruguay 1 – 1 Ghana (tab 4-2)",
    tour: "Quart de finale",
    slug: "uruguay-ghana-2010",
    resume: "La main de Suárez sur la ligne, le penalty manqué par Gyan. L'Afrique si proche d'une première demi-finale. Un des moments les plus dramatiques de l'histoire.",
  },
  {
    annee: "1994",
    match: "Brésil 0 – 0 Italie (tab 3-2)",
    tour: "Finale",
    slug: "bresil-italie-1994",
    resume: "La première finale décidée aux tirs au but. Baggio envoie son penalty au-dessus. Le Brésil remporte sa 4e étoile, Baggio est inconsolable.",
  },
  {
    annee: "2002",
    match: "Brésil 2 – 0 Allemagne",
    tour: "Finale",
    slug: "bresil-allemagne-2002",
    resume: "Ronaldo, fantôme en 1998, marque un doublé et offre au Brésil sa 5e étoile. La rédemption du Fenômeno à Yokohama.",
  },
  {
    annee: "1998",
    match: "Argentine 2 – 2 Angleterre (tab 4-3)",
    tour: "Huitième de finale",
    slug: "argentine-angleterre-1998",
    resume: "Le but génial d'Owen, l'expulsion de Beckham, la dramaturgie des penalties. La rivalité Argentine-Angleterre à son paroxysme.",
  },
  {
    annee: "2018",
    match: "France 4 – 3 Argentine",
    tour: "Huitième de finale",
    slug: "france-argentine-2018",
    resume: "Mbappé explose à la face du monde avec un doublé foudroyant. 7 buts, du spectacle total. Le match qui a lancé la nouvelle ère Mbappé.",
  },
  {
    annee: "1958",
    match: "Brésil 5 – 2 Suède",
    tour: "Finale",
    slug: "bresil-suede-1958",
    resume: "Le premier sacre brésilien. Pelé, 17 ans, inscrit un doublé en finale et entre dans la légende. La naissance du roi du football.",
  },
  {
    annee: "2014",
    match: "Allemagne 1 – 0 Argentine",
    tour: "Finale",
    slug: "allemagne-argentine-2014",
    resume: "Götze marque en prolongation et brise le rêve de Messi. L'Allemagne décroche sa 4e étoile au Brésil dans une finale tactique intense.",
  },
  {
    annee: "2002",
    match: "Corée du Sud 2 – 1 Italie",
    tour: "Huitième de finale",
    slug: "coree-italie-2002",
    resume: "Ahn Jung-hwan élimine l'Italie en prolongation dans un match très controversé. Arbitrage scandaleux et héroïsme coréen devant un public en fusion.",
  },
  {
    annee: "1974",
    match: "Allemagne 2 – 1 Pays-Bas",
    tour: "Finale",
    slug: "allemagne-pays-bas-1974",
    resume: "Le football total néerlandais face à l'efficacité allemande. Cruyff obtient un penalty après 1 minute sans que les Allemands touchent le ballon. Müller donne le titre à l'Allemagne.",
  },
];

const faqItems = [
  {
    question: "Quelle est la plus grande confrontation de l'histoire de la CDM ?",
    answer:
      "Difficile à trancher, mais la finale Argentine-France 2022 (3-3, tab 4-2) est considérée par beaucoup comme la plus grande finale de l'histoire, avec 6 buts et des retournements incroyables. Argentine-Angleterre 1986 et Italie-Allemagne 1970 sont aussi régulièrement citées.",
  },
  {
    question: "Combien de fois France et Brésil se sont-ils affrontés en CDM ?",
    answer:
      "France et Brésil se sont affrontés 4 fois en Coupe du Monde : 1958 (demi-finale, 2-5), 1986 (quart, 1-1 tab 4-3), 1998 (finale, 3-0) et 2006 (quart, 1-0). Un bilan équilibré avec des matchs toujours spectaculaires.",
  },
  {
    question: "Peut-on revoir ces matchs en vidéo ?",
    answer:
      "FIFA+ propose gratuitement de nombreux matchs historiques en intégralité. YouTube dispose également de highlights officiels. Pour les matchs les plus anciens, les documentaires FIFA « Official Film » de chaque édition sont d'excellentes sources.",
  },
];

export default function ConfrontationsHistoriquesPage() {
  const breadcrumbItems = [{ label: "Accueil", href: "/" }, { label: "Confrontations historiques" }];
  
  return (
    <>
<Breadcrumb items={breadcrumbItems} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Histoire du football
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Les 20 confrontations mythiques de la CDM
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            De la main de Dieu au 7-1, en passant par la finale 2022 : les matchs qui ont écrit
            l&apos;histoire de la Coupe du Monde.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        <section>
          <div className="space-y-4">
            {confrontations.map((c, i) => (
              <Link
                key={c.slug}
                href={`/h2h/${c.slug}`}
                className="block rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 hover:border-accent/50 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-xs font-bold text-accent bg-accent/10 rounded-full px-2.5 py-1">
                      #{i + 1}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.annee}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{c.match}</h3>
                      <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                        {c.tour}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                      {c.resume}
                    </p>
                  </div>
                  <Swords className="h-5 w-5 text-gray-400 shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/wall-of-fame"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Wall of Fame CDM <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/palmares"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Palmarès complet
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
