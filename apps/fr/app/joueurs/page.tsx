import { getStaticAlternates } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import type { Metadata } from "next";
import Link from "next/link";
import { players } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";

export const metadata: Metadata = {
  title: "210 joueurs cles de la Coupe du Monde 2026 | Effectifs & Stats",
  description:
    "Les 210 joueurs cles des 48 équipes de la Coupe du Monde 2026. Statistiques, clubs, selections et buts pour chaque joueur.",
  alternates: getStaticAlternates("players", "fr"),
  openGraph: {
    title: "210 joueurs clés de la Coupe du Monde 2026",
    description: "Stats, clubs et sélections des 210 joueurs clés des 48 équipes de la CDM 2026.",
  },
};

export default function PlayersPage() {
  const faqItems = [
    {
      question: "Combien de joueurs composent une équipe pour la Coupe du Monde ?",
      answer: "Chaque équipe peut convoquer 26 joueurs pour la Coupe du Monde 2026 (contre 23 auparavant). Cette règle a été adoptée par la FIFA en 2022 pour permettre plus de rotation et gérer les blessures. Parmi ces 26 joueurs, 3 doivent obligatoirement être gardiens de but. Le sélectionneur peut faire appel à tous les joueurs de la liste selon les besoins tactiques et la forme physique."
    },
    {
      question: "Qui sont les favoris pour le Ballon d'Or de la CDM 2026 ?",
      answer: "Les principaux candidats au Ballon d'Or de la Coupe du Monde 2026 sont Kylian Mbappé (France, déjà Ballon d'Or 2022), Erling Haaland (Norvège), Vinícius Júnior (Brésil), Jude Bellingham (Angleterre) et Lamine Yamal (Espagne). Mbappé est le grand favori grâce à son statut de meilleur joueur du monde, ses 12 buts en CDM et la force de l'équipe de France. Le Ballon d'Or est attribué au meilleur joueur du tournoi, indépendamment du vainqueur final."
    },
    {
      question: "Quel joueur a marqué le plus de buts en sélection ?",
      answer: "Cristiano Ronaldo (Portugal) détient le record absolu avec 130 buts en sélection en 212 matchs. Il devance Lionel Messi (Argentine, 106 buts), Ali Daei (Iran, 109 buts) et Sunil Chhetri (Inde, 94 buts). En France, Olivier Giroud est le meilleur buteur de l'histoire avec 57 buts, devançant Thierry Henry (51 buts) et Antoine Griezmann (44 buts). Kylian Mbappé (48 buts à 25 ans) devrait devenir le meilleur buteur français d'ici 2026."
    },
    {
      question: "Quels sont les joueurs les plus chers de la CDM 2026 ?",
      answer: "Les joueurs les plus chers en valeur marchande pour la CDM 2026 sont : Kylian Mbappé (France, ~180M€), Erling Haaland (Norvège, ~175M€), Vinícius Júnior (Brésil, ~150M€), Jude Bellingham (Angleterre, ~150M€) et Jamal Musiala (Allemagne, ~130M€). Ces valorisations reflètent l'âge, le talent, les performances récentes et le potentiel commercial. Mbappé reste le joueur le plus bankable du monde."
    },
    {
      question: "Quel âge ont les joueurs de la CDM 2026 ?",
      answer: "L'âge moyen des joueurs en Coupe du Monde tourne généralement autour de 27-28 ans, soit le pic de performance physique et technique. Les plus jeunes ont 18-19 ans (comme Lamine Yamal, Espagne), tandis que les plus expérimentés peuvent aller jusqu'à 37-40 ans (comme Cristiano Ronaldo, s'il se qualifie). La FIFA n'impose aucune limite d'âge pour la CDM senior, contrairement aux JO qui ont une règle des -23 ans."
    },
    {
      question: "Combien de remplacements sont autorisés en Coupe du Monde ?",
      answer: "5 remplacements sont autorisés en Coupe du Monde 2026, sur un maximum de 3 fenêtres de remplacement (mi-temps non comptée). Cette règle, introduite pendant la COVID-19, a été maintenue par la FIFA pour préserver la santé des joueurs et permettre plus de rotation. En cas de prolongation, un 6e remplacement supplémentaire est autorisé. Les gardiens peuvent également être remplacés en cas de blessure, même si les 5 changements ont été effectués."
    }
  ];

  const positionLabels: Record<string, string> = {
    GK: "Gardiens",
    DF: "Defenseurs",
    MF: "Milieux",
    FW: "Attaquants",
  };
  const positions = ["FW", "MF", "DF", "GK"] as const;

  return (
    <>
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Joueurs</li>
          </ol>
        </div>
      </nav>

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Effectifs</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Joueurs cles de la CDM 2026</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {players.length} joueurs cles des 48 selections. Attaquants, milieux, defenseurs et gardiens.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        {/* Top Scorers */}
        <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Meilleurs buteurs en sélection</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 text-left">
                  <th className="pb-3 font-medium text-gray-500">Joueur</th>
                  <th className="pb-3 font-medium text-gray-500">Équipe</th>
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
                      <tr key={player.id} className="hover:bg-gray-50 dark:bg-slate-700">
                        <td className="py-3">
                          <Link href={`/joueur/${player.slug}`} className="font-medium hover:text-primary">
                            {player.name}
                          </Link>
                        </td>
                        <td className="py-3">
                          {team && (
                            <Link href={`/equipe/${team.slug}`} className="flex items-center gap-1 hover:text-primary">
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
            <section key={pos} className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{positionLabels[pos]} ({posPlayers.length})</h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {posPlayers.map((player) => {
                  const team = teamsById[player.teamId];
                  return (
                    <Link
                      key={player.id}
                      href={`/joueur/${player.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
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

      <FAQSection title="❓ Questions sur les joueurs de la CDM 2026" items={faqItems} />
    </>
  );
}
