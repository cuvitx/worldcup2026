import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import { Music, ArrowRight, Mic, Globe, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Chants de supporters CDM 2026 — Hymnes et chansons par pays",
  description:
    "Les chants de supporters les plus emblématiques de la Coupe du Monde : Allez les Bleus, Seven Nation Army, Olé Olé, et bien d'autres. Top 10 des hymnes légendaires.",
  alternates: { canonical: "https://cdm2026.fr/chants-supporters" },
  openGraph: {
    title: "Chants de supporters CDM 2026",
    description: "Top 10 des chants les plus iconiques de la Coupe du Monde. De Allez les Bleus à Seven Nation Army.",
    url: "https://cdm2026.fr/chants-supporters",
  },
};

interface Chant {
  rank: number;
  title: string;
  country: string;
  origin: string;
  description: string;
  lyrics: string;
}

const topChants: Chant[] = [
  {
    rank: 1,
    title: "Seven Nation Army",
    country: "Universel",
    origin: "The White Stripes (2003), adopté depuis l'Euro 2006",
    description: "Le riff de guitare le plus repris dans tous les stades du monde. Devenu l'hymne officieux du football mondial.",
    lyrics: "Bum, bum bum bum bum buuuum bum...",
  },
  {
    rank: 2,
    title: "Allez les Bleus !",
    country: "France",
    origin: "Tradition française, popularisé en 1998",
    description: "Le cri de guerre des supporters français. Simple, efficace, fédérateur. Résonne dans tous les stades où joue l'Équipe de France.",
    lyrics: "Allez les Bleus ! Allez les Bleus ! On va gagner !",
  },
  {
    rank: 3,
    title: "Olé, Olé, Olé",
    country: "International (origine sud-américaine)",
    origin: "Années 1980, popularisé par la CDM 1986",
    description: "Chant universel repris par toutes les nations. Simplicité qui permet à n'importe quel supporter de le chanter.",
    lyrics: "Olé, olé olé olé... Olé, olé !",
  },
  {
    rank: 4,
    title: "Muchachos",
    country: "Argentine",
    origin: "La Mosca (2003), adapté pour la CDM 2022",
    description: "L'hymne de la troisième étoile argentine. Devenu viral pendant la CDM 2022, chanté par Messi et toute l'équipe.",
    lyrics: "Muchachos, ahora nos volvimos a ilusionar...",
  },
  {
    rank: 5,
    title: "Three Lions (Football's Coming Home)",
    country: "Angleterre",
    origin: "Baddiel, Skinner & Lightning Seeds (Euro 1996)",
    description: "L'hymne anglais par excellence. Repris à chaque tournoi majeur avec un optimisme toujours renouvelé.",
    lyrics: "It's coming home, it's coming home, football's coming home!",
  },
  {
    rank: 6,
    title: "Brasil, Decanta Samba de Janeiro",
    country: "Brésil",
    origin: "Bellini, inspiré de Mas que Nada",
    description: "Les supporters brésiliens transforment chaque tribune en carnaval. Rythme de samba irrésistible.",
    lyrics: "Eu sou brasileiro, com muito orgulho, com muito amor!",
  },
  {
    rank: 7,
    title: "Vamos Argentina",
    country: "Argentine",
    origin: "Tradition des hinchadas argentines",
    description: "Les supporters argentins sont considérés comme les plus passionnés du monde. Leurs chants ne s'arrêtent jamais.",
    lyrics: "Vamos, vamos Argentina! Vamos, vamos a ganar!",
  },
  {
    rank: 8,
    title: "I Believe That We Will Win",
    country: "États-Unis",
    origin: "Chant universitaire américain, adopté par le football US",
    description: "Le chant signature des fans américains. Simple et puissant, il reflète l'enthousiasme croissant pour le soccer aux USA.",
    lyrics: "I believe that we will win! I believe that we will win!",
  },
  {
    rank: 9,
    title: "Waka Waka (This Time for Africa)",
    country: "Afrique",
    origin: "Shakira, hymne officiel CDM 2010",
    description: "L'hymne officiel de la première Coupe du Monde en Afrique. Toujours chanté dans les stades africains.",
    lyrics: "Tsamina mina, eh eh, Waka Waka, eh eh!",
  },
  {
    rank: 10,
    title: "Pö Pö Pö (Skol Vikings adapted)",
    country: "Islande",
    origin: "Euro 2016, le clap islandais",
    description: "Le thunderclap islandais a conquis le monde en 2016. Un moment de communion unique entre joueurs et supporters.",
    lyrics: "Húh! (clap synchronisé)",
  },
];

export default function ChantsSupportersPage() {
  const faqItems = [
    {
      question: "Quel est le chant de supporters le plus connu au monde ?",
      answer: "Seven Nation Army des White Stripes est devenu le chant le plus universel du football. Son riff emblématique est repris dans pratiquement tous les stades du monde depuis l'Euro 2006 en Allemagne.",
    },
    {
      question: "Les chants de supporters changent-ils à chaque Coupe du Monde ?",
      answer: "Certains chants sont intemporels (Seven Nation Army, Olé Olé), mais chaque Coupe du Monde voit émerger de nouveaux hymnes. En 2022, 'Muchachos' de l'Argentine est devenu viral. La CDM 2026 verra certainement naître de nouveaux chants.",
    },
    {
      question: "Quelle est l'ambiance en tribune pendant la CDM ?",
      answer: "L'ambiance en Coupe du Monde est incomparable. Les supporters de chaque pays apportent leur culture, leurs instruments, leurs couleurs et leurs chants. Les stades américains de 60 000 à 80 000 places promettent une atmosphère électrique en 2026.",
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Chants de supporters", url: "/chants-supporters" },
        ]}
        baseUrl={domains.fr}
      />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Chants de supporters" }]} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Culture football
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Chants de supporters CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Les hymnes qui font vibrer les stades du monde entier. Top 10 des chants les plus
            emblématiques de la Coupe du Monde.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Music className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary dark:text-white">
              Top 10 des chants légendaires
            </h2>
          </div>
          <div className="space-y-4">
            {topChants.map((chant) => (
              <div
                key={chant.rank}
                className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/20 text-secondary font-black text-lg shrink-0">
                    {chant.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-primary dark:text-white text-lg">
                        {chant.title}
                      </h3>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Globe className="h-3 w-3" /> {chant.country}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {chant.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Mic className="h-3 w-3" /> {chant.origin}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm italic text-gray-600 dark:text-gray-400">
                      &ldquo;{chant.lyrics}&rdquo;
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/fan-zones"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
          >
            Découvrir les fan zones <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
