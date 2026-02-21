import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { Trophy, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Wall of Fame — Les 15 plus grands moments de la Coupe du Monde",
  description:
    "Revivez les 15 moments les plus iconiques de l'histoire de la CDM : but de Maradona, tête de Zidane, 7-1, triplé de Mbappé en finale et bien d'autres.",
  openGraph: {
    title: "Wall of Fame CDM — Les moments qui ont marqué l'histoire",
    description: "Les 15 instants de légende de la Coupe du Monde, du but du siècle au 7-1.",
    url: "https://cdm2026.fr/wall-of-fame",
  },
  alternates: { canonical: "https://cdm2026.fr/wall-of-fame" },
};

const moments = [
  {
    rang: 1,
    titre: "Le but du siècle — Maradona vs Angleterre (1986)",
    contexte: "Quart de finale, Azteca, Mexico. 4 minutes après la « main de Dieu ».",
    description:
      "Diego Maradona récupère le ballon dans sa moitié de terrain, dribble 6 joueurs anglais sur 60 mètres et marque le plus beau but de l'histoire du football. Une chevauchée solitaire de 10 secondes qui défie les lois de la physique et du football.",
    impact: "Élu « But du siècle » par la FIFA en 2002. A cimenté la légende de Maradona comme l'un des plus grands joueurs de tous les temps.",
  },
  {
    rang: 2,
    titre: "Le Maracanazo — Uruguay 2-1 Brésil (1950)",
    contexte: "Match décisif, Maracanã, Rio de Janeiro. 199 854 spectateurs.",
    description:
      "Le Brésil n'avait besoin que d'un nul pour être champion. Menés 1-0, les Uruguayens renversent le match. Ghiggia marque le but décisif à la 79e minute. Le silence qui s'abat sur le Maracanã est décrit comme « le silence le plus bruyant de l'histoire ».",
    impact: "Un traumatisme national au Brésil. Le maillot blanc est abandonné au profit du jaune. Jules Rimet pleure en remettant le trophée.",
  },
  {
    rang: 3,
    titre: "Zidane sacre la France — Finale 1998",
    contexte: "Finale, Stade de France, Saint-Denis. La France n'a jamais gagné la CDM.",
    description:
      "Deux coups de tête magistraux sur corners de Djorkaeff et Petit. Zinédine Zidane, fils d'immigrés algériens, offre à la France sa première Coupe du Monde. Un million de personnes envahissent les Champs-Élysées.",
    impact: "Unité nationale sans précédent. « Black-Blanc-Beur » devient un symbole. Le football français entre dans une nouvelle ère.",
  },
  {
    rang: 4,
    titre: "Allemagne 7-1 Brésil — La débâcle (2014)",
    contexte: "Demi-finale, Estádio Mineirão, Belo Horizonte. Le Brésil joue à domicile.",
    description:
      "5 buts allemands en 18 minutes (entre la 11e et la 29e minute). Müller, Klose, Kroos (×2), Khedira puis Schürrle (×2). Le Brésil s'effondre. Les supporters pleurent dans les tribunes. Un score impensable au plus haut niveau.",
    impact: "Le score le plus humiliant de l'histoire des demi-finales de CDM. A généré plus de tweets que tout autre événement sportif. Klose devient le meilleur buteur de l'histoire de la CDM (16 buts).",
  },
  {
    rang: 5,
    titre: "Le coup de tête de Zidane — Finale 2006",
    contexte: "Finale, Olympiastadion, Berlin. Prolongation. Zidane joue son dernier match.",
    description:
      "À la 110e minute, après une altercation verbale avec Marco Materazzi, Zidane lui assène un coup de tête en pleine poitrine. Carton rouge. L'Italie gagne aux penalties. La fin tragique du plus grand joueur français.",
    impact: "L'image la plus reproduite de l'histoire de la CDM. Un débat éternel : aurait-il dû rester calme ? Zidane dira : « Je ne regrette pas. »",
  },
  {
    rang: 6,
    titre: "Mbappé illumine la finale — Argentine-France 2022",
    contexte: "Finale, Lusail, Qatar. La France est menée 2-0 à la 80e minute.",
    description:
      "Kylian Mbappé inscrit un doublé en 97 secondes (80e et 81e) pour égaliser. Messi redonne l'avantage en prolongation, Mbappé égalise à nouveau (penalty, 118e) et complète son triplé. L'Argentine gagne aux tirs au but (4-2), mais Mbappé a écrit l'une des plus belles pages individuelles de l'histoire.",
    impact: "Premier triplé en finale depuis Geoff Hurst (1966). Considérée comme la plus grande finale de tous les temps.",
  },
  {
    rang: 7,
    titre: "La main de Dieu — Maradona (1986)",
    contexte: "Quart de finale, Azteca, Mexico. 51e minute.",
    description:
      "Maradona saute avec le gardien Shilton et pousse le ballon dans les filets de la main gauche. L'arbitre valide le but. Interrogé après le match, Maradona répond : « C'était un peu avec la tête de Maradona et un peu avec la main de Dieu. »",
    impact: "Le but le plus controversé de l'histoire. A relancé le débat sur la vidéo-arbitrage, finalement instauré en 2018 (VAR).",
  },
  {
    rang: 8,
    titre: "Pelé, 17 ans, conquiert le monde (1958)",
    contexte: "Finale, Rasunda, Stockholm. Brésil vs Suède. Pelé a 17 ans et 249 jours.",
    description:
      "Le jeune prodige brésilien inscrit un doublé en finale, dont un but où il jongle par-dessus un défenseur avant de reprendre de volée. Le Brésil remporte sa première Coupe du Monde (5-2). Pelé pleure de joie dans les bras de ses coéquipiers.",
    impact: "Naissance de la légende Pelé. Le plus jeune buteur en finale de CDM (record toujours debattu). Le Brésil devient la référence mondiale.",
  },
  {
    rang: 9,
    titre: "Messi soulève enfin le trophée (2022)",
    contexte: "Finale, Lusail, Qatar. Dernier match de CDM de Messi à 35 ans.",
    description:
      "Après des années de déceptions (finale 2014, éliminations précoces), Lionel Messi réalise son rêve. Il marque en finale (ouverture au penalty, puis en prolongation) et soulève le trophée dans un bisht arabe. L'Argentine entière explose de joie.",
    impact: "Le GOAT debate se clôt pour beaucoup. 4 millions de personnes dans les rues de Buenos Aires. L'image de Messi avec le trophée devient la photo la plus likée d'Instagram.",
  },
  {
    rang: 10,
    titre: "Italie-Allemagne, le match du siècle (1970)",
    contexte: "Demi-finale, Azteca, Mexico. Prolongation.",
    description:
      "Après un 1-1 soporifique en 90 minutes, la prolongation donne lieu à un festival : 5 buts en 15 minutes. Beckenbauer joue avec l'épaule démise. Rivera marque le 4-3 décisif. Le football dans toute sa beauté et sa dramaturgie.",
    impact: "Une plaque commémorative est installée à l'Azteca : « Le match du siècle ». Souvent cité comme le plus grand match jamais joué.",
  },
  {
    rang: 11,
    titre: "Le penalty raté de Baggio (1994)",
    contexte: "Finale, Rose Bowl, Pasadena. Première finale décidée aux tirs au but.",
    description:
      "Roberto Baggio, meilleur joueur du tournoi, s'avance pour le tir décisif. Il envoie le ballon bien au-dessus de la barre. Le Brésil est champion pour la 4e fois. L'image de Baggio, tête baissée, mains sur les hanches, est devenue iconique.",
    impact: "Le moment le plus cruel de l'histoire des penalties. Baggio dira : « Ce penalty me hante encore. »",
  },
  {
    rang: 12,
    titre: "Séville 1982 — Le drame français",
    contexte: "Demi-finale, Sánchez Pizjuán, Séville. France vs Allemagne.",
    description:
      "Schumacher percute violemment Battiston (inconscient, dents cassées) sans être sanctionné. Menée 3-1 en prolongation, la France est rattrapée. Défaite aux penalties. Platini, Giresse, Tigana sont en larmes. La France n'ira pas en finale.",
    impact: "Le match fondateur de la passion française pour le football. La faute de Schumacher reste l'une des plus scandaleuses de l'histoire.",
  },
  {
    rang: 13,
    titre: "La remontée de Suárez — Uruguay-Ghana (2010)",
    contexte: "Quart de finale, Soccer City, Johannesburg. Dernière minute de la prolongation.",
    description:
      "Sur la ligne de but, Luis Suárez arrête de la main un tir ghanéen qui allait entrer. Carton rouge. Asamoah Gyan tire le penalty… sur la barre ! L'Uruguay se qualifie aux tirs au but. L'Afrique est privée de sa première demi-finale.",
    impact: "Suárez devient un vilain pour certains, un héros pour d'autres. Le débat sur « l'antisportivité récompensée » est relancé.",
  },
  {
    rang: 14,
    titre: "Mbappé foudroie l'Argentine (2018)",
    contexte: "Huitième de finale, Kazan Arena, Russie. Mbappé a 19 ans.",
    description:
      "Un doublé dévastateur en contre-attaque (64e et 68e) dans un match à 7 buts (4-3). Mbappé devient le premier adolescent depuis Pelé à marquer en phase finale de CDM (doublé). Sa vitesse et sa puissance sidèrent le monde entier.",
    impact: "La révélation mondiale de Mbappé. Comparé à Pelé par la presse internationale. Le début d'une nouvelle ère pour le football français.",
  },
  {
    rang: 15,
    titre: "Ronaldo, la rédemption (2002)",
    contexte: "Finale, Yokohama, Japon. 4 ans après le mystère de 1998.",
    description:
      "Ronaldo, fantôme de la finale 1998 (convulsions avant le match, prestation fantomatique), marque un doublé face à l'Allemagne et offre au Brésil sa 5e étoile. La coupe Ronaldo (la coupe de cheveux étrange) devient un symbole de cette victoire.",
    impact: "La plus belle histoire de rédemption du football. Ronaldo termine meilleur buteur (8 buts). Le Brésil remporte son 5e et dernier titre mondial à ce jour.",
  },
];

const faqItems = [
  {
    question: "Quel est le plus grand moment de l'histoire de la Coupe du Monde ?",
    answer:
      "Le but du siècle de Maradona en 1986 est généralement considéré comme le moment le plus iconique, suivi de près par le 7-1 de 2014, la finale 2022 et la tête de Zidane en 1998. Le choix est subjectif et dépend souvent de la génération.",
  },
  {
    question: "Qui détient le record de buts en Coupe du Monde ?",
    answer:
      "Miroslav Klose (Allemagne) avec 16 buts en 4 éditions (2002-2014). Il a dépassé Ronaldo (15 buts) lors du 7-1 contre le Brésil en 2014. Pelé est 3e avec 12 buts.",
  },
  {
    question: "Quelle est la finale la plus spectaculaire ?",
    answer:
      "Argentine-France 2022 (3-3, tab 4-2) est quasi unanimement considérée comme la plus grande finale de l'histoire, avec 6 buts, des retournements impensables et un triplé de Mbappé. Avant cela, Italie-Allemagne 1970 et Italie-France 2006 étaient souvent citées.",
  },
];

export default function WallOfFamePage() {
  const breadcrumbItems = [{ label: "Accueil", href: "/" }, { label: "Wall of Fame CDM" }];
  const schemaItems = [
    { name: "Accueil", url: "/" },
    { name: "Wall of Fame CDM", url: "/wall-of-fame" },
  ];


  return (
    <>
      <BreadcrumbSchema items={schemaItems} baseUrl={domains.fr} />
      <Breadcrumb items={breadcrumbItems} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Légendes du football
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Wall of Fame — Les plus grands moments
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Les 15 instants qui ont marqué l&apos;histoire de la Coupe du Monde à jamais.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {moments.map((m) => (
          <section
            key={m.rang}
            className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-extrabold text-lg">
                  {m.rang}
                </span>
                <Star className="h-4 w-4 text-yellow-500 mt-1" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{m.titre}</h2>
                <p className="text-sm text-accent font-medium mt-1">{m.contexte}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">{m.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                  <strong>Impact :</strong> {m.impact}
                </p>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/confrontations-historiques"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Confrontations mythiques <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/buteurs"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Meilleurs buteurs CDM
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
