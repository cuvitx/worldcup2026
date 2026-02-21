import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { User, BarChart3, TrendingUp, Globe, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos de l'auteur | CDM 2026",
  description:
    "Découvrez Xavier C., fondateur et rédacteur de CDM 2026 — analyses, pronostics et guides pour la Coupe du Monde 2026.",
  openGraph: {
    title: "Xavier C. — Auteur CDM 2026",
    description: "Fondateur et rédacteur de CDM 2026.",
    url: "https://cdm2026.fr/equipe-editoriale",
  },
  alternates: { canonical: "https://cdm2026.fr/equipe-editoriale" },
};

function PersonSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Xavier C.",
    jobTitle: "Fondateur & Rédacteur",
    worksFor: {
      "@type": "Organization",
      name: "CDM 2026",
      url: "https://cdm2026.fr",
    },
    description:
      "Passionné de football et d'analyse data, Xavier est le fondateur de CDM 2026. Il rédige les analyses, pronostics et guides du site.",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

const specialites = [
  { icon: BarChart3, label: "Analyse statistique", desc: "Modèles ELO, xG, probabilités de qualification" },
  { icon: TrendingUp, label: "Pronostics & Paris", desc: "Cotes, value bets, stratégies de paris sportifs" },
  { icon: Globe, label: "Guides voyage", desc: "Villes hôtes, budget, hébergement, sécurité" },
  { icon: Target, label: "SEO & Contenu", desc: "Rédaction experte, données actualisées, sources FIFA" },
];

export default function EquipeEditorialePage() {
  return (
    <>
      <PersonSchema />
<section className="hero-animated text-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "À propos de l'auteur" },
            ]}
          />
          <h1 className="mt-6 text-3xl sm:text-4xl font-bold text-secondary">
            Xavier C.
          </h1>
          <p className="mt-3 text-lg text-white/80">
            Fondateur & Rédacteur de CDM 2026
          </p>
        </div>
      </section>

      <main id="main-content" className="mx-auto max-w-4xl px-4 py-12">
        {/* Avatar + Bio */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary text-white text-3xl font-bold">
            XC
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Passionné de football depuis toujours, je suis le créateur et unique rédacteur de CDM 2026.
              Mon objectif : proposer le guide le plus complet sur la Coupe du Monde 2026 — analyses statistiques,
              pronostics argumentés, guides pratiques pour les supporters et comparatifs de paris sportifs.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Toutes les données du site proviennent de sources officielles (FIFA, confédérations) et sont
              régulièrement mises à jour. Les pronostics sont basés sur des modèles statistiques (ELO, xG)
              et non sur de simples intuitions.
            </p>
          </div>
        </div>

        {/* Spécialités */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Domaines d&apos;expertise
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {specialites.map((s) => (
            <div
              key={s.label}
              className="flex items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{s.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Engagements */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Engagements
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-12">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span><strong>Sources vérifiées</strong> — Données FIFA, UEFA, CONMEBOL et confédérations officielles</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span><strong>Jeu responsable</strong> — Conformité ANJ, mentions légales sur chaque page de paris</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span><strong>Transparence</strong> — Méthodologie de pronostics détaillée sur la page dédiée</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span><strong>Indépendance</strong> — Les classements de bookmakers reflètent une analyse objective</span>
          </li>
        </ul>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/methodologie"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-center font-bold text-white hover:bg-accent/90 transition-colors"
          >
            Voir la méthodologie
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 px-6 py-2.5 text-center font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Me contacter
          </Link>
        </div>
      </main>
    </>
  );
}
