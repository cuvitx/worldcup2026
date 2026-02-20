interface EloRatingCardProps {
  teamName: string;
  eloRating: number;
}

export function EloRatingCard({ teamName, eloRating }: EloRatingCardProps) {
  const eloMin = 1400;
  const eloMax = 2100;
  const eloPercent = Math.min(100, Math.max(0, ((eloRating - eloMin) / (eloMax - eloMin)) * 100));

  return (
    <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rating ELO de {teamName}</h2>
      <div className="flex items-end gap-4 mb-4">
        <p className="text-3xl font-extrabold text-primary sm:text-5xl">{eloRating}</p>
        <p className="text-sm text-gray-500 pb-1">points ELO</p>
      </div>
      <div className="relative h-4 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${eloPercent}%`,
            background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
          }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-gray-500">
        <span>{eloMin}</span>
        <span>{eloMax}</span>
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Le rating ELO mesure la force relative de chaque équipe. Plus le score est eleve, plus l&apos;équipe est consideree comme favorite. {teamName} se situe dans le{" "}
        {eloPercent > 75 ? "top tier mondial" : eloPercent > 50 ? "haut du classement" : eloPercent > 25 ? "milieu de tableau" : "bas du classement"}.
      </p>
    </section>
  );
}
