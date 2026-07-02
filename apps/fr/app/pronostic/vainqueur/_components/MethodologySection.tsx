import Link from "next/link";
import { Card } from "@repo/ui/card";
import { SectionHeading } from "@repo/ui/section-heading";
import type { LiveWinnerForecast } from "../_data/vainqueur-data";

interface MethodologySectionProps {
  forecast: LiveWinnerForecast;
}

export function MethodologySection({ forecast }: MethodologySectionProps) {
  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card hover padding="md">
          <SectionHeading emoji="" title="Méthodologie du live forecast" />
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Le forecast part du modèle ELO pré-tournoi, puis il est recalculé avec
            le tableau réel : équipes éliminées à 0%, qualifiés au tour suivant,
            résultat des matchs à élimination directe et signal des cotes disponibles.
            Les probabilités sont renormalisées sur les {forecast.activeTeams.length} équipes encore en course.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              {
                icon: "",
                title: "Base ELO",
                desc: "Force initiale de chaque sélection, conservée comme socle pour éviter de sur-réagir à un seul match",
              },
              {
                icon: "",
                title: "Tableau live",
                desc: "Le chemin restant et le tour atteint modifient les chances de titre après chaque qualification",
              },
              {
                icon: "",
                title: "Filtre élimination",
                desc: "Une équipe sortie du tournoi est automatiquement retirée du top actif et passe à 0%",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg bg-white p-4 border border-gray-200"
              >
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="font-bold text-gray-900 text-sm mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/methodologie"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Lire notre méthodologie complète →
          </Link>
        </Card>
      </div>
    </section>
  );
}
