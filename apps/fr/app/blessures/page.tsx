import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import { HeartPulse, AlertTriangle, Clock, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Blessures CDM 2026 — Joueurs blessés, incertains et forfaits",
  description:
    "Suivi des blessures avant la Coupe du Monde 2026 : joueurs aptes, incertains ou forfaits par équipe. Tableau mis à jour régulièrement.",
  alternates: { canonical: "https://cdm2026.fr/blessures" },
  openGraph: {
    title: "Blessures CDM 2026 — Suivi des joueurs",
    description: "Qui sera apte pour la CDM 2026 ? Suivi des blessures par équipe.",
    url: "https://cdm2026.fr/blessures",
  },
};

type Status = "Apte" | "Incertain" | "Forfait";

interface PlayerInjury {
  player: string;
  team: string;
  position: string;
  injury: string;
  status: Status;
  returnDate: string;
}

const injuries: PlayerInjury[] = [
  { player: "Thibaut Courtois", team: "Belgique", position: "Gardien", injury: "Genou (LCA)", status: "Incertain", returnDate: "Avril 2026" },
  { player: "Neymar Jr", team: "Brésil", position: "Attaquant", injury: "Genou (LCA)", status: "Incertain", returnDate: "Mars 2026" },
  { player: "Gavi", team: "Espagne", position: "Milieu", injury: "Genou (LCA)", status: "Incertain", returnDate: "Retour progressif" },
  { player: "Diogo Jota", team: "Portugal", position: "Attaquant", injury: "Genou", status: "Apte", returnDate: "Rétabli" },
  { player: "Lucas Hernandez", team: "France", position: "Défenseur", injury: "Genou (LCA)", status: "Incertain", returnDate: "Mai 2026" },
  { player: "Presnel Kimpembe", team: "France", position: "Défenseur", injury: "Tendon d'Achille", status: "Forfait", returnDate: "Indéterminé" },
  { player: "N'Golo Kanté", team: "France", position: "Milieu", injury: "Ischio-jambiers", status: "Apte", returnDate: "Rétabli" },
  { player: "Leroy Sané", team: "Allemagne", position: "Ailier", injury: "Genou", status: "Incertain", returnDate: "Février 2026" },
  { player: "Sergio Ramos", team: "Espagne", position: "Défenseur", injury: "Non retenu", status: "Forfait", returnDate: "N/A" },
  { player: "Giorgio Chiellini", team: "Italie", position: "Défenseur", injury: "Retraite internationale", status: "Forfait", returnDate: "N/A" },
];

const statusConfig: Record<Status, { bg: string; text: string; icon: typeof ShieldCheck }> = {
  Apte: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", icon: ShieldCheck },
  Incertain: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400", icon: Clock },
  Forfait: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", icon: AlertTriangle },
};

export default function BlessuresPage() {
  const faqItems = [
    {
      question: "Quand les listes officielles des 26 joueurs seront-elles publiées ?",
      answer: "Les sélectionneurs doivent communiquer leur liste de 26 joueurs à la FIFA en mai 2026, environ 2 à 3 semaines avant le début du tournoi le 11 juin 2026.",
    },
    {
      question: "Un joueur blessé peut-il être remplacé après l'annonce de la liste ?",
      answer: "Oui, la FIFA autorise le remplacement d'un joueur blessé jusqu'à 24 heures avant le premier match de l'équipe, sans restriction de poste. Après le début du tournoi, les remplacements sont soumis à des règles plus strictes.",
    },
    {
      question: "Ces informations sont-elles à jour ?",
      answer: "Cette page est mise à jour régulièrement en fonction des informations disponibles. Les statuts définitifs ne seront confirmés qu'à l'annonce des listes officielles en mai 2026.",
    },
  ];

  const aptes = injuries.filter((p) => p.status === "Apte");
  const incertains = injuries.filter((p) => p.status === "Incertain");
  const forfaits = injuries.filter((p) => p.status === "Forfait");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Blessures CDM 2026", url: "/blessures" },
        ]}
        baseUrl={domains.fr}
      />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Blessures" }]} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Suivi médical
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Blessures CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Suivi des joueurs blessés, incertains et forfaits pour la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Stats rapides */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Aptes", count: aptes.length, color: "text-green-600" },
            { label: "Incertains", count: incertains.length, color: "text-yellow-600" },
            { label: "Forfaits", count: forfaits.length, color: "text-red-600" },
          ].map((s) => (
            <div key={s.label} className="text-center rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <span className={`block text-3xl font-black ${s.color}`}>{s.count}</span>
              <span className="text-sm text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Tableau */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <HeartPulse className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary dark:text-white">
              Tableau des blessures par joueur
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Joueur</th>
                  <th className="py-3 px-4 text-left">Équipe</th>
                  <th className="py-3 px-4 text-left">Poste</th>
                  <th className="py-3 px-4 text-left">Blessure</th>
                  <th className="py-3 px-4 text-center">Statut</th>
                  <th className="py-3 px-4 text-left rounded-tr-lg">Retour estimé</th>
                </tr>
              </thead>
              <tbody>
                {injuries.map((p, i) => {
                  const cfg = statusConfig[p.status];
                  const Icon = cfg.icon;
                  return (
                    <tr
                      key={p.player}
                      className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}
                    >
                      <td className="py-3 px-4 font-medium">{p.player}</td>
                      <td className="py-3 px-4">{p.team}</td>
                      <td className="py-3 px-4">{p.position}</td>
                      <td className="py-3 px-4">{p.injury}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                          <Icon className="h-3 w-3" /> {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{p.returnDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Dernière mise à jour : février 2026. Les statuts seront actualisés à l&apos;approche de la CDM.
            </p>
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/selections-listes"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
          >
            Voir les listes des 26 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
