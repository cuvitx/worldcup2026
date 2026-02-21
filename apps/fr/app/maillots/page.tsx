import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Shirt, ArrowRight, Palette, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Maillots CDM 2026 — Les 48 maillots domicile et extérieur",
  description:
    "Galerie des maillots des 48 équipes de la Coupe du Monde 2026. Domicile et extérieur, équipementier, couleurs et liens vers les fiches équipes.",
  alternates: { canonical: "https://cdm2026.fr/maillots" },
  openGraph: {
    title: "Maillots CDM 2026 — Galerie 48 équipes",
    description: "Tous les maillots domicile et extérieur de la Coupe du Monde 2026.",
    url: "https://cdm2026.fr/maillots",
  },
};

interface TeamKit {
  team: string;
  slug: string;
  brand: string;
  homeColors: string;
  awayColors: string;
  homeCss: string;
  awayCss: string;
}

const kits: TeamKit[] = [
  { team: "Argentine", slug: "argentine", brand: "Adidas", homeColors: "Bleu ciel / Blanc", awayColors: "Violet / Noir", homeCss: "bg-sky-200", awayCss: "bg-purple-800" },
  { team: "France", slug: "france", brand: "Nike", homeColors: "Bleu marine / Blanc / Rouge", awayColors: "Blanc / Or", homeCss: "bg-blue-900", awayCss: "bg-white border border-gray-200" },
  { team: "Brésil", slug: "bresil", brand: "Nike", homeColors: "Jaune / Vert", awayColors: "Bleu / Blanc", homeCss: "bg-yellow-400", awayCss: "bg-blue-700" },
  { team: "Angleterre", slug: "angleterre", brand: "Nike", homeColors: "Blanc / Bleu marine", awayColors: "Rouge / Bleu", homeCss: "bg-white border border-gray-200", awayCss: "bg-red-600" },
  { team: "Espagne", slug: "espagne", brand: "Adidas", homeColors: "Rouge / Jaune", awayColors: "Blanc / Bleu", homeCss: "bg-red-600", awayCss: "bg-white border border-gray-200" },
  { team: "Allemagne", slug: "allemagne", brand: "Adidas", homeColors: "Blanc / Noir", awayColors: "Rose / Violet", homeCss: "bg-white border border-gray-200", awayCss: "bg-pink-500" },
  { team: "Portugal", slug: "portugal", brand: "Nike", homeColors: "Rouge / Vert", awayColors: "Turquoise / Noir", homeCss: "bg-red-700", awayCss: "bg-teal-400" },
  { team: "Pays-Bas", slug: "pays-bas", brand: "Nike", homeColors: "Orange / Noir", awayColors: "Bleu marine / Orange", homeCss: "bg-orange-500", awayCss: "bg-blue-900" },
  { team: "Belgique", slug: "belgique", brand: "Adidas", homeColors: "Rouge / Noir", awayColors: "Blanc / Rouge", homeCss: "bg-red-600", awayCss: "bg-white border border-gray-200" },
  { team: "Italie", slug: "italie", brand: "Adidas", homeColors: "Bleu / Blanc", awayColors: "Blanc / Vert", homeCss: "bg-blue-600", awayCss: "bg-white border border-gray-200" },
  { team: "Croatie", slug: "croatie", brand: "Nike", homeColors: "Damier rouge/blanc", awayColors: "Bleu marine / Rouge", homeCss: "bg-red-500", awayCss: "bg-blue-900" },
  { team: "Uruguay", slug: "uruguay", brand: "Puma", homeColors: "Bleu ciel / Noir", awayColors: "Blanc / Bleu", homeCss: "bg-sky-400", awayCss: "bg-white border border-gray-200" },
  { team: "Colombie", slug: "colombie", brand: "Adidas", homeColors: "Jaune / Bleu", awayColors: "Bleu marine / Rouge", homeCss: "bg-yellow-400", awayCss: "bg-blue-900" },
  { team: "Mexique", slug: "mexique", brand: "Adidas", homeColors: "Vert / Blanc / Rouge", awayColors: "Blanc / Vert", homeCss: "bg-green-700", awayCss: "bg-white border border-gray-200" },
  { team: "États-Unis", slug: "etats-unis", brand: "Nike", homeColors: "Blanc / Bleu / Rouge", awayColors: "Bleu marine / Rouge", homeCss: "bg-white border border-gray-200", awayCss: "bg-blue-800" },
  { team: "Canada", slug: "canada", brand: "Nike", homeColors: "Rouge / Blanc", awayColors: "Noir / Rouge", homeCss: "bg-red-600", awayCss: "bg-gray-900" },
  { team: "Japon", slug: "japon", brand: "Adidas", homeColors: "Bleu / Blanc", awayColors: "Blanc / Rouge", homeCss: "bg-blue-700", awayCss: "bg-white border border-gray-200" },
  { team: "Maroc", slug: "maroc", brand: "Puma", homeColors: "Rouge / Vert", awayColors: "Blanc / Rouge", homeCss: "bg-red-600", awayCss: "bg-white border border-gray-200" },
  { team: "Sénégal", slug: "senegal", brand: "Puma", homeColors: "Blanc / Vert", awayColors: "Vert / Jaune", homeCss: "bg-white border border-gray-200", awayCss: "bg-green-600" },
  { team: "Nigeria", slug: "nigeria", brand: "Nike", homeColors: "Vert / Blanc", awayColors: "Blanc / Vert", homeCss: "bg-green-600", awayCss: "bg-white border border-gray-200" },
];

export default function MaillotsPage() {
  const faqItems = [
    {
      question: "Quand les maillots CDM 2026 seront-ils révélés ?",
      answer: "Les équipementiers révèlent généralement les maillots de Coupe du Monde entre mars et mai de l'année du tournoi. Certains maillots sont déjà portés lors des matchs de qualification.",
    },
    {
      question: "Quel est l'équipementier le plus représenté à la CDM 2026 ?",
      answer: "Nike et Adidas se partagent traditionnellement la majorité des sélections nationales, suivis de Puma, New Balance et quelques marques locales.",
    },
    {
      question: "Où acheter les maillots officiels de la CDM 2026 ?",
      answer: "Les maillots officiels sont disponibles sur les boutiques en ligne des équipementiers (nike.com, adidas.com, puma.com), les sites des fédérations nationales et les points de vente physiques agréés.",
    },
  ];

  return (
    <>
<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Maillots" }]} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Galerie maillots
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Maillots Coupe du Monde 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Domicile et extérieur : découvrez les maillots des 48 équipes qualifiées pour la CDM 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Shirt className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Galerie des maillots
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {kits.map((kit) => (
              <Link
                key={kit.slug}
                href={`/equipe/${kit.slug}`}
                className="group rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-primary group-hover:text-accent transition-colors">
                    {kit.team}
                  </h3>
                  <span className="text-xs text-gray-500">{kit.brand}</span>
                </div>
                <div className="flex gap-3 mb-3">
                  <div className="text-center flex-1">
                    <div className={`h-16 rounded-lg ${kit.homeCss} flex items-center justify-center`}>
                      <Shirt className="h-6 w-6 text-gray-600 opacity-50" />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">Domicile</span>
                  </div>
                  <div className="text-center flex-1">
                    <div className={`h-16 rounded-lg ${kit.awayCss} flex items-center justify-center`}>
                      <Shirt className="h-6 w-6 text-gray-600 opacity-50" />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">Extérieur</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <Palette className="h-3 w-3" /> Dom : {kit.homeColors}
                  </div>
                  <div className="flex items-center gap-1">
                    <Palette className="h-3 w-3" /> Ext : {kit.awayColors}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500 text-center">
            20 équipes affichées. Les maillots des 28 autres équipes seront ajoutés à leur révélation officielle.
          </p>
        </section>

        <div className="text-center">
          <Link
            href="/equipes"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
          >
            Voir toutes les équipes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
