export default function PlayerLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 animate-pulse">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 px-4 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8flex gap-2 items-center">
          <div className="h-3.5 w-12 bg-gray-200 dark:bg-slate-700 rounded-full" />
          <span className="text-gray-300 dark:text-slate-600">/</span>
          <div className="h-3.5 w-16 bg-gray-200 dark:bg-slate-700 rounded-full" />
          <span className="text-gray-300 dark:text-slate-600">/</span>
          <div className="h-3.5 w-32 bg-gray-200 dark:bg-slate-700 rounded-full" />
        </div>
      </div>

      {/* Hero joueur */}
      <div className="bg-gradient-to-br from-primary to-secondary py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Photo / avatar */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-white/10 flex-shrink-0" />

          <div className="flex-1 text-center sm:text-left">
            {/* Poste badge */}
            <div className="h-5 w-20 bg-white/20 rounded-full mb-3 mx-auto sm:mx-0" />
            {/* Nom */}
            <div className="h-9 w-52 bg-white/20 rounded-lg mb-3 mx-auto sm:mx-0" />
            {/* Équipe + drapeau */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
              <div className="w-8 h-5 rounded bg-white/10" />
              <div className="h-4 w-28 bg-white/15 rounded" />
            </div>
            {/* Stats rapides (sélections, buts, âge) */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-7 w-12 bg-white/20 rounded-lg mb-1 mx-auto" />
                  <div className="h-3 w-16 bg-white/10 rounded-full mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Biographie */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="h-5 w-24 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-2.5">
                <div className="h-4 w-full bg-gray-100 dark:bg-slate-700 rounded" />
                <div className="h-4 w-11/12 bg-gray-100 dark:bg-slate-700 rounded" />
                <div className="h-4 w-full bg-gray-100 dark:bg-slate-700 rounded" />
                <div className="h-4 w-4/5 bg-gray-100 dark:bg-slate-700 rounded" />
                <div className="h-4 w-full bg-gray-100 dark:bg-slate-700 rounded" />
                <div className="h-4 w-3/4 bg-gray-100 dark:bg-slate-700 rounded" />
              </div>
            </div>

            {/* Statistiques détaillées */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="h-5 w-36 bg-gray-200 dark:bg-slate-700 rounded mb-5" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3 text-center">
                    <div className="h-8 w-14 bg-gray-200 dark:bg-slate-700 rounded-lg mx-auto mb-2" />
                    <div className="h-3.5 w-16 bg-gray-100 dark:bg-slate-600 rounded-full mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Barres de compétences */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="h-5 w-28 bg-gray-200 dark:bg-slate-700 rounded mb-5" />
              <div className="space-y-4">
                {[90, 75, 85, 70, 80].map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-3.5 w-24 bg-gray-100 dark:bg-slate-700 rounded flex-shrink-0" />
                    <div className="h-2.5 flex-1 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-200 dark:bg-slate-600 rounded-full"
                        style={{ width: `${w}%` }}
                      />
                    </div>
                    <div className="h-3.5 w-8 bg-gray-100 dark:bg-slate-700 rounded flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Infos personnelles */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="h-5 w-28 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-3.5 w-20 bg-gray-100 dark:bg-slate-700 rounded" />
                    <div className="h-3.5 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Matchs à la CDM */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="h-5 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 w-full bg-gray-100 dark:bg-slate-700 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Joueurs similaires */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="h-5 w-40 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-slate-700 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-4 w-28 bg-gray-200 dark:bg-slate-700 rounded mb-1" />
                      <div className="h-3 w-16 bg-gray-100 dark:bg-slate-700 rounded" />
                    </div>
                    <div className="h-4 w-8 bg-gray-100 dark:bg-slate-700 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
