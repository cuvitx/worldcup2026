import Link from "next/link";
import type { Team } from "@repo/data";
import type { TeamPrediction } from "@repo/data/predictions";
import { estimatedOutrightOdds } from "@repo/data/affiliates";
import { featuredBookmaker } from "@repo/data/affiliates";

interface PronosticSidebarProps {
  team: Team;
  prediction: TeamPrediction | undefined;
  groupTeams: Team[];
}

export function PronosticSidebar({ team, prediction, groupTeams }: PronosticSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats Card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiche rapide</h3>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-gray-500">Classement FIFA</dt><dd className="font-medium">#{team.fifaRanking}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Groupe</dt><dd className="font-medium"><Link href={`/groupe/${team.group.toLowerCase()}`} className="text-primary hover:underline">Groupe {team.group}</Link></dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Confederation</dt><dd className="font-medium">{team.confederation}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Participations CDM</dt><dd className="font-medium">{team.wcAppearances}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Meilleur résultat</dt><dd className="font-medium text-right max-w-[55%]">{team.bestResult}</dd></div>
          {prediction && (
            <>
              <div className="border-t border-gray-100 pt-3 flex justify-between"><dt className="text-gray-500">Rating ELO</dt><dd className="font-bold text-primary">{prediction.eloRating}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Cote vainqueur</dt><dd className="font-bold text-accent">{estimatedOutrightOdds(prediction.winnerProb)}</dd></div>
            </>
          )}
        </dl>
        <div className="mt-4">
          <Link href={`/equipe/${team.slug}`} className="block w-full text-center rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">Voir la fiche complète &rarr;</Link>
        </div>
      </div>

      {/* Related Teams */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Équipes du Groupe {team.group}</h3>
        <ul className="space-y-2">
          {groupTeams.map((t) => (
            <li key={t.id}>
              <Link href={`/equipe/${t.slug}`} className="flex items-center justify-between gap-2 text-sm rounded-lg p-2 hover:bg-gray-50-700 transition-colors">
                <div className="flex items-center gap-2"><span role="img" aria-label={`Drapeau de ${t.name}`}>{t.flag}</span><span className="font-medium">{t.name}</span></div>
                <span className="text-xs text-gray-500">#{t.fifaRanking}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-3"><Link href={`/groupe/${team.group.toLowerCase()}`} className="text-sm text-primary hover:underline">Voir le Groupe {team.group} &rarr;</Link></div>
      </div>

      {/* H2H Links */}
      {groupTeams.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Confrontations directes</h3>
          <ul className="space-y-2">
            {groupTeams.map((t) => (
              <li key={t.id}>
                <Link href={`/h2h/${team.slug}-vs-${t.slug}`} className="flex items-center gap-2 text-sm text-primary hover:text-primary transition-colors">
                  <span>{team.flag} vs {t.flag}</span><span className="font-medium">{team.name} - {t.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sidebar CTA */}
      <div className="rounded-lg bg-primary/5 border border-primary/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Parier sur {team.name}</h3>
        {prediction ? (
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm"><span className="text-gray-600">Cote vainqueur</span><span className="font-bold text-accent">{estimatedOutrightOdds(prediction.winnerProb)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Passer les groupes</span><span className="font-bold text-field">{Math.round(prediction.groupStageProb * 100)}%</span></div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-4">Les pronostics seront disponibles prochainement.</p>
        )}
        <a href={featuredBookmaker.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="block w-full text-center rounded-xl bg-accent py-3.5 text-sm font-bold text-white hover:bg-accent/80 transition-colors">{featuredBookmaker.bonus} sur {featuredBookmaker.name}</a>
        <p className="mt-2 text-xs text-gray-500 text-center">{featuredBookmaker.bonusDetail}</p>
      </div>
    </div>
  );
}
