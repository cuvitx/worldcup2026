import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Trophy, ArrowRight, History, Weight, Gem, Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Le Trophée de la Coupe du Monde FIFA — Histoire, poids, design",
  description:
    "Tout sur le trophée de la Coupe du Monde FIFA : 6.175 kg d'or 18 carats, histoire du trophée Jules Rimet, design de Silvio Gazzaniga, anecdotes.",
  alternates: { canonical: "https://www.cdm2026.fr/trophee" },
  openGraph: {
    title: "Le Trophée de la Coupe du Monde FIFA",
    description: "6.175 kg d'or 18 carats, 36.8 cm de haut. L'objet le plus convoité du sport mondial.",
    url: "https://www.cdm2026.fr/trophee",
  },
};

const specs = [
  { icon: Weight, label: "Poids", value: "6.175 kg" },
  { icon: Ruler, label: "Hauteur", value: "36.8 cm" },
  { icon: Gem, label: "Matériau", value: "Or 18 carats" },
  { icon: Trophy, label: "Valeur estimée", value: "~20 M$" },
];

const timeline = [
  {
    year: "1930–1970",
    title: "Le Trophée Jules Rimet",
    description: "Le trophée original, en argent sterling plaqué or, a été créé par le sculpteur français Abel Lafleur. Nommé en l'honneur du président de la FIFA Jules Rimet, il représentait Nike, la déesse grecque de la victoire. Le Brésil l'a remporté définitivement en 1970 après son 3e titre. Il a été volé en 1983 au Brésil et jamais retrouvé.",
  },
  {
    year: "1974–présent",
    title: "Le Trophée FIFA actuel",
    description: "Créé par le sculpteur italien Silvio Gazzaniga, le trophée actuel représente deux figures humaines soutenant le globe terrestre. Réalisé en or 18 carats massif avec une base en malachite, il pèse 6.175 kg. Contrairement au Jules Rimet, aucun pays ne peut le conserver définitivement — le vainqueur reçoit une réplique plaquée or.",
  },
  {
    year: "1966",
    title: "Vol en Angleterre",
    description: "Le trophée Jules Rimet a été volé lors d'une exposition à Londres avant la CDM 1966. Il a été retrouvé 7 jours plus tard par un chien nommé Pickles, enveloppé dans du papier journal sous une haie. Pickles est devenu un héros national.",
  },
  {
    year: "1983",
    title: "Vol définitif au Brésil",
    description: "Le trophée Jules Rimet, conservé au siège de la Fédération brésilienne, a été volé en décembre 1983. Malgré des arrestations, le trophée n'a jamais été retrouvé. Il aurait été fondu par les voleurs. La CBF possède désormais une réplique.",
  },
];

export default function TropheePage() {
  const faqItems = [
    {
      question: "Le vainqueur de la CDM garde-t-il le trophée ?",
      answer: "Non. Depuis 1974, le trophée FIFA ne peut plus être conservé définitivement. Le vainqueur le garde jusqu'à la prochaine édition et reçoit une réplique plaquée or. L'ancien trophée Jules Rimet pouvait être conservé après 3 victoires (le Brésil l'a obtenu en 1970).",
    },
    {
      question: "Combien vaut le trophée de la Coupe du Monde ?",
      answer: "Le trophée FIFA actuel est estimé à environ 20 millions de dollars pour sa valeur en or pur (6.175 kg d'or 18 carats). Sa valeur symbolique et historique est bien sûr inestimable.",
    },
    {
      question: "Qui a conçu le trophée actuel ?",
      answer: "Le trophée actuel a été conçu en 1974 par le sculpteur italien Silvio Gazzaniga. Son design a été choisi parmi 53 propositions soumises à la FIFA. Il représente deux figures humaines portant le monde sur leurs épaules.",
    },
    {
      question: "Le trophée original a-t-il été retrouvé ?",
      answer: "Non. Le trophée Jules Rimet, volé au Brésil en 1983, n'a jamais été retrouvé. Selon l'enquête, il aurait été fondu par les voleurs. Seules quelques répliques existent aujourd'hui.",
    },
  ];

  return (
    <>
<Breadcrumb transparent items={[{ label: "Accueil", href: "/" }, { label: "Le Trophée" }]} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Le Graal du football
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Le Trophée de la Coupe du Monde
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-8">
            6.175 kg d&apos;or 18 carats, 36.8 cm de haut : l&apos;objet le plus convoité du sport mondial.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {specs.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="h-6 w-6 text-accent mx-auto mb-1" />
                <span className="block text-2xl font-black text-white">{s.value}</span>
                <span className="text-xs uppercase tracking-wider text-gray-300">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Design */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Gem className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Design et caractéristiques
            </h2>
          </div>
          <div className="prose max-w-none">
            <p>
              Le trophée actuel de la Coupe du Monde FIFA a été conçu par le sculpteur italien
              <strong> Silvio Gazzaniga</strong> en 1974. Il représente deux figures humaines
              soutenant le globe terrestre, symbolisant l&apos;universalité du football.
            </p>
            <p>
              Réalisé en <strong>or 18 carats massif</strong>, il pèse exactement <strong>6.175 kg</strong> pour
              une hauteur de <strong>36.8 cm</strong>. Sa base est ornée de deux bandes de malachite verte.
              Les noms de tous les pays vainqueurs depuis 1974 sont gravés sur la base, avec de la place
              prévue jusqu&apos;en 2038.
            </p>
          </div>
        </section>

        {/* Chronologie */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <History className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Histoire du trophée
            </h2>
          </div>
          <div className="space-y-4">
            {timeline.map((event) => (
              <div
                key={event.year}
                className="flex gap-4 rounded-xl border border-gray-200 p-5"
              >
                <div className="shrink-0">
                  <span className="inline-block bg-accent/20 text-accent font-bold text-sm px-3 py-1 rounded-full">
                    {event.year}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

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
