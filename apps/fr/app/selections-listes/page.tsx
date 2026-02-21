import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Users, Clock, ArrowRight, ClipboardList } from "lucide-react";

export const metadata: Metadata = {
  title: "Listes des 26 joueurs CDM 2026 — Sélections par équipe",
  description:
    "Les listes officielles des 26 joueurs sélectionnés par chaque équipe pour la Coupe du Monde 2026. Annonces prévues en mai 2026.",
  alternates: { canonical: "https://www.cdm2026.fr/selections-listes" },
  openGraph: {
    title: "Listes des 26 — Sélections CDM 2026",
    description: "Les 26 joueurs de chaque équipe pour la CDM 2026. Annonces en mai 2026.",
    url: "https://www.cdm2026.fr/selections-listes",
  },
};

const teams = [
  "Argentine", "France", "Brésil", "Angleterre", "Espagne", "Allemagne", "Portugal", "Pays-Bas",
  "Belgique", "Italie", "Croatie", "Uruguay", "Colombie", "Mexique", "États-Unis", "Canada",
  "Japon", "Corée du Sud", "Australie", "Arabie Saoudite", "Iran", "Qatar", "Maroc", "Sénégal",
  "Cameroun", "Ghana", "Nigeria", "Tunisie", "Égypte", "Côte d'Ivoire", "Afrique du Sud", "Mali",
  "Équateur", "Paraguay", "Suisse", "Danemark", "Autriche", "Serbie", "Pologne", "Ukraine",
  "Turquie", "Écosse", "Pays de Galles", "Norvège", "Indonésie", "Nouvelle-Zélande", "Costa Rica", "Pérou",
];

export default function SelectionsListesPage() {
  const faqItems = [
    {
      question: "Quand les listes des 26 seront-elles annoncées ?",
      answer: "Les sélectionneurs nationaux communiqueront leurs listes de 26 joueurs à la FIFA courant mai 2026, généralement 2 à 3 semaines avant le début de la compétition le 11 juin 2026.",
    },
    {
      question: "Pourquoi 26 joueurs et pas 23 ?",
      answer: "Depuis la Coupe du Monde 2022, la FIFA a élargi les effectifs de 23 à 26 joueurs pour mieux gérer les calendriers chargés et le risque de blessures. Ce format est maintenu pour 2026.",
    },
    {
      question: "Un sélectionneur peut-il modifier sa liste après l'annonce ?",
      answer: "Oui, un remplacement est possible en cas de blessure grave jusqu'à 24 heures avant le premier match de l'équipe. Après le début du tournoi, des règles strictes s'appliquent.",
    },
  ];

  return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Sélections officielles
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Les listes des 26 joueurs
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Découvrez les 26 joueurs sélectionnés par chaque équipe pour la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Banner à venir */}
        <div className="flex items-center gap-4 rounded-xl bg-accent/10 border border-accent/30 p-6">
          <Clock className="h-8 w-8 text-accent shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-primary">
              Annonces prévues en mai 2026
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Les listes officielles des 26 joueurs seront publiées par chaque fédération environ
              3 semaines avant le coup d&apos;envoi. Cette page sera mise à jour en temps réel.
            </p>
          </div>
        </div>

        {/* Grid équipes */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              48 équipes qualifiées
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {teams.map((team) => (
              <Link
                key={team}
                href={`/equipe/${team.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/'/g, "-")}`}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 hover:border-accent hover:shadow-md transition-all text-sm font-medium"
              >
                <Users className="h-4 w-4 text-gray-400" />
                <span className="truncate">{team}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/blessures"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
          >
            Suivre les blessures <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
