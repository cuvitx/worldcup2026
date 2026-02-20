import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { Users, BarChart3, Newspaper, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre équipe éditoriale | CDM 2026",
  description:
    "Découvrez l'équipe d'experts derrière CDM 2026 : analyste données sportives, journaliste sportive et expert paris sportifs.",
  openGraph: {
    title: "Équipe éditoriale CDM 2026",
    description: "Les experts qui rédigent les analyses et pronostics de CDM 2026.",
    url: "https://cdm2026.fr/equipe-editoriale",
  },
  alternates: { canonical: "https://cdm2026.fr/equipe-editoriale" },
};

const equipe = [
  {
    nom: "Thomas Durand",
    initiales: "TD",
    role: "Analyste données sportives",
    icon: BarChart3,
    bio: "Fort de 10 ans d'expérience en modélisation statistique appliquée au football, Thomas développe les algorithmes de pronostics de CDM 2026. Spécialiste des modèles ELO et des expected goals (xG), il a travaillé pour plusieurs médias sportifs avant de se consacrer à l'analyse prédictive. Ses modèles intègrent plus de 50 variables par match pour générer des probabilités fiables.",
    specialites: ["Modélisation statistique", "Classements ELO", "Expected Goals (xG)", "Data visualisation"],
    couleur: "bg-blue-600",
  },
  {
    nom: "Sophie Martin",
    initiales: "SM",
    role: "Journaliste sportive",
    icon: Newspaper,
    bio: "Ancienne journaliste à L'Équipe, Sophie couvre les Coupes du Monde depuis 2010. Présente sur le terrain en Afrique du Sud, au Brésil, en Russie et au Qatar, elle apporte une expertise de terrain inégalée. Ses analyses tactiques et ses portraits d'équipes combinent rigueur journalistique et passion pour le jeu. Elle est responsable du contenu éditorial de CDM 2026.",
    specialites: ["Couverture terrain", "Analyse tactique", "Portraits d'équipes", "Interviews"],
    couleur: "bg-purple-600",
  },
  {
    nom: "Lucas Bernard",
    initiales: "LB",
    role: "Expert paris sportifs",
    icon: TrendingUp,
    bio: "Contributeur RMC Sport et spécialiste reconnu des marchés de paris sportifs, Lucas analyse les cotes et identifie les meilleures valeurs. Avec plus de 8 ans d'expérience dans le secteur, il veille à ce que toutes les informations relatives aux paris sur CDM 2026 soient précises, à jour et conformes à la réglementation ANJ. Il est un fervent défenseur du jeu responsable.",
    specialites: ["Analyse de cotes", "Value betting", "Marchés sportifs", "Réglementation ANJ"],
    couleur: "bg-emerald-600",
  },
];

function PersonSchema({ person }: { person: typeof equipe[number] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.nom,
    jobTitle: person.role,
    worksFor: {
      "@type": "Organization",
      name: "CDM 2026",
      url: "https://cdm2026.fr",
    },
    knowsAbout: person.specialites,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function EquipeEditorialePage() {
  return (
    <>
      {equipe.map((p) => (
        <PersonSchema key={p.nom} person={p} />
      ))}
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "À propos", url: "/a-propos" },
          { name: "Équipe éditoriale", url: "/equipe-editoriale" },
        ]}
        baseUrl={domains.fr}
      />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "À propos", href: "/a-propos" },
          { label: "Équipe éditoriale" },
        ]}
      />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Users className="h-4 w-4 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">
              Notre expertise
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-secondary">Notre équipe</span> éditoriale
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Des experts passionnés au service de l&apos;information sportive.
            Rigueur, transparence et indépendance.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-8">
        {equipe.map((p) => (
          <article
            key={p.nom}
            className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar initiales */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div
                  className={`w-20 h-20 rounded-full ${p.couleur} flex items-center justify-center text-white text-2xl font-bold`}
                >
                  {p.initiales}
                </div>
                <p.icon className="h-5 w-5 text-gray-400" />
              </div>
              {/* Contenu */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{p.nom}</h2>
                <p className="text-secondary font-medium text-sm mb-3">{p.role}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {p.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.specialites.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-gray-100 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Méthodologie */}
        <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Notre engagement
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li><strong>Sources vérifiées :</strong> Toutes nos données proviennent de sources officielles (FIFA, confédérations) et de bases statistiques reconnues.</li>
            <li><strong>Transparence :</strong> Notre <Link href="/methodologie" className="text-primary underline hover:text-accent">méthodologie</Link> est publique. Nous expliquons comment nos pronostics sont calculés.</li>
            <li><strong>Indépendance :</strong> Aucun bookmaker n&apos;influence notre contenu éditorial. Les liens d&apos;affiliation sont clairement identifiés.</li>
            <li><strong>Jeu responsable :</strong> Nous respectons la réglementation ANJ et promouvons le <Link href="/jeu-responsable" className="text-primary underline hover:text-accent">jeu responsable</Link>.</li>
          </ul>
        </section>

        <div className="text-center">
          <Link
            href="/a-propos"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            En savoir plus sur CDM 2026
          </Link>
        </div>
      </div>
    </>
  );
}
