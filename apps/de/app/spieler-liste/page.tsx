import { getStaticAlternates } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import { RelatedLinks } from "../components/RelatedLinks";
import type { Metadata } from "next";
import Link from "next/link";
import { players } from "@repo/data/players";
import { teams, teamsById } from "@repo/data/teams";
export const metadata: Metadata = {
  title: "210 Spielers cles der WM 2026 | Kaders & Stats",
  description:
    "Les 210 Spielers cles des 48 Mannschafts der WM 2026. Statistiques, clubs, selections et buts pour chaque Spieler.",
  alternates: getStaticAlternates("players", "de"),
  openGraph: {
    title: "210 Spielers clés der WM 2026",
    description: "Stats, clubs et sélections des 210 Spielers clés des 48 Mannschafts de la CDM 2026.",
  },
};

export default function PlayersPage() {
  const faqItems = [
    {
      question: "Combien de Spielers composent une Mannschaft pour la WM ?",
      answer: "Chaque Mannschaft peut convoquer 26 Spielers für die WM 2026 (contre 23 auparavant). Cette règle a été adoptée par la FIFA en 2022 pour permettre plus de rotation et gérer les blessures. Parmi ces 26 Spielers, 3 doivent obligatoirement être Torwarts de but. Le sélectionneur peut faire appel à tous les Spielers de la liste selon les besoins tactiques et la forme physique."
    },
    {
      question: "Qui sont les favoris pour le Ballon d'Or de la CDM 2026 ?",
      answer: "Les principaux candidats au Ballon d'Or der WM 2026 sont Kylian Mbappé (France, déjà Ballon d'Or 2022), Erling Haaland (Norvège), Vinícius Júnior (Brésil), Jude Bellingham (Angleterre) et Lamine Yamal (Espagne). Mbappé est le grand favori grce à son statut de meilleur Spieler du monde, ses 12 buts en CDM et la force de l'Mannschaft de France. Le Ballon d'Or est attribué au meilleur Spieler des Turniers, indépendamment du vainqueur final."
    },
    {
      question: "Quel Spieler a marqué le plus de buts en sélection ?",
      answer: "Cristiano Ronaldo (Portugal) détient le record absolu avec 130 buts en sélection en 212 matchs. Il devance Lionel Messi (Argentine, 106 buts), Ali Daei (Iran, 109 buts) et Sunil Chhetri (Inde, 94 buts). En France, Olivier Giroud est le Torschützenkönig de l'histoire avec 57 buts, devançant Thierry Henry (51 buts) et Antoine Griezmann (44 buts). Kylian Mbappé (48 buts à 25 ans) devrait devenir le Torschützenkönig français d'ici 2026."
    },
    {
      question: "Quels sont les Spielers les plus chers de la CDM 2026 ?",
      answer: "Les Spielers les plus chers en valeur marchande pour la CDM 2026 sont : Kylian Mbappé (France, ~180M€), Erling Haaland (Norvège, ~175M€), Vinícius Júnior (Brésil, ~150M€), Jude Bellingham (Angleterre, ~150M€) et Jamal Musiala (Allemagne, ~130M€). Ces valorisations reflètent l'ge, le talent, les performances récentes et le potentiel commercial. Mbappé reste le Spieler le plus bankable du monde."
    },
    {
      question: "Quel ge ont les Spielers de la CDM 2026 ?",
      answer: "L'ge moyen des Spielers en WM tourne généralement autour de 27-28 ans, soit le pic de performance physique et technique. Les plus jeunes ont 18-19 ans (comme Lamine Yamal, Espagne), tandis que les plus expérimentés peuvent aller jusqu'à 37-40 ans (comme Cristiano Ronaldo, s'il se qualifie). La FIFA n'impose aucune limite d'ge pour la CDM senior, contrairement aux JO qui ont une règle des -23 ans."
    },
    {
      question: "Combien de remplacements sont autorisés en WM ?",
      answer: "5 remplacements sont autorisés en WM 2026, sur un maximum de 3 fenêtres de remplacement (mi-temps non comptée). Cette règle, introduite pendant la COVID-19, a été maintenue par la FIFA pour préserver la santé des Spielers et permettre plus de rotation. En cas de prolongation, un 6e remplacement supplémentaire est autorisé. Les Torwarts peuvent également être remplacés en cas de blessure, même si les 5 changements ont été effectués."
    }
  ];

  const positionLabels: Record<string, string> = {
    GK: "Torwarts",
    DF: "Defenseurs",
    MF: "Mittelfeldspielerx",
    FW: "Stürmers",
  };
  const positions = ["FW", "MF", "DF", "GK"] as const;

  return (
    <>
<section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Kaders</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Spielers cles de la CDM 2026</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {players.length} Spielers cles des 48 selections. Stürmers, Mittelfeldspielerx, defenseurs et Torwarts.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        {/* Annuaires */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Parcourir par Mannschaft</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {teams.filter(t => players.some(p => p.teamId === t.id)).map((t) => (
              <Link key={t.slug} href={`/spieler-liste/mannschaft/${t.slug}`} className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm font-medium text-gray-900">
                <span>{t.flag}</span> {t.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Top Scorers */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Beste Torschützen en sélection</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">Spieler</th>
                  <th className="pb-3 font-medium text-gray-500">Mannschaft</th>
                  <th className="pb-3 font-medium text-gray-500">Club</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Buts</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Sel.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...players]
                  .sort((a, b) => b.goals - a.goals)
                  .slice(0, 20)
                  .map((player) => {
                    const team = teamsById[player.teamId];
                    return (
                      <tr key={player.id} className="hover:bg-gray-50">
                        <td className="py-3">
                          <Link href={`/spieler/${player.slug}`} className="font-medium hover:text-primary">
                            {player.name}
                          </Link>
                        </td>
                        <td className="py-3">
                          {team && (
                            <Link href={`/mannschaft/${team.slug}`} className="flex items-center gap-1 hover:text-primary">
                              <span role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
                              <span className="text-gray-600">{team.name}</span>
                            </Link>
                          )}
                        </td>
                        <td className="py-3 text-gray-500">{player.club}</td>
                        <td className="py-3 text-right font-bold text-primary">{player.goals}</td>
                        <td className="py-3 text-right text-gray-500">{player.caps}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>

        {/* By Position */}
        {positions.map((pos) => {
          const posPlayers = players
            .filter((p) => p.position === pos)
            .sort((a, b) => b.goals - a.goals || b.caps - a.caps);
          return (
            <section key={pos} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{positionLabels[pos]} ({posPlayers.length})</h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {posPlayers.map((player) => {
                  const team = teamsById[player.teamId];
                  return (
                    <Link
                      key={player.id}
                      href={`/spieler/${player.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-xs text-gray-500">
                          <span role="img" aria-label={`Drapeau de ${team?.name ?? "Inconnu"}`}>{team?.flag}</span> {team?.name} &middot; {player.club}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{player.goals} buts</p>
                        <p className="text-xs text-gray-500">{player.caps} sel.</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedLinks variant="compact" title="Verwandte Seiten" links={[
          { href: "/torschuetzen", title: "Beste Torschützen", description: "Rangliste des buteurs de la CDM 2026", icon: "" },
          { href: "/comparateur-Spielers", title: "Comparateur de Spielers", description: "Comparez les stats de 2 Spielers", icon: "" },
          { href: "/mannschaft", title: "Les 48 Mannschafts", description: "Kaders complets par sélection", icon: "" },
          { href: "/fifa-ranking", title: "Rangliste FIFA", description: "Ranking mondial des Mannschafts", icon: "" },
        ]} />
      </div>

      <FAQSection title="Questions sur les Spielers de la CDM 2026" items={faqItems} />
    </>
  );
}
