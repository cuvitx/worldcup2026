export default function MatchLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 animate-pulse">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 px-4 py-3">
        <div className="max-w-7xl mx-auto px-4 flex gap-2 items-center">
          <div className="h-3.5 w-12 bg-gray-200 dark:bg-slate-700 rounded-full" />
          <span className="text-gray-300 dark:text-slate-600">/</span>
          <div className="h-3.5 w-16 bg-gray-200 dark:bg-slate-700 rounded-full" />
          <span className="text-gray-300 dark:text-slate-600">/</span>
          <div className="h-3.5 w-36 bg-gray-200 dark:bg-slate-700 rounded-full" />
        </div>
      </div>

      {/* Hero match — Deux équipes */}
      <div className="bg-gradient-to-br from-primary via-secondary to-primary py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Badge phase */}
          <div className="h-6 w-40 bg-white/10 rounded-full mx-auto mb-6" />

          {/* Équipes vs */}
          <div className="flex items-center justify-center gap-4 sm:gap-10">
            {/* Équipe domicile */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-16 h-11 sm:w-24 sm:h-16 rounded-lg bg-white/10" />
              <div className="h-5 w-24 bg-white/20 rounded" />
              <div className="h-3.5 w-16 bg-white/10 rounded-full" />
            </div>

            {/* Séparateur VS */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="h-10 w-16 bg-white/10 rounded-xl" />
              <div className="h-4 w-20 bg-white/10 rounded-full" />
            </div>

            {/* Équipe extérieure */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-16 h-11 sm:w-24 sm:h-16 rounded-lg bg-white/10" />
              <div className="h-5 w-24 bg-white/20 rounded" />
              <div className="h-3.5 w-16 bg-white/10 rounded-full" />
            </div>
          </div>

          {/* Infos match (stade, date) */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="h-5 w-32 bg-white/10 rounded-full" />
            <div className="h-5 w-24 bg-white/10 rounded-full" />
            <div className="h-5 w-28 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analyse IA */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-5 w-5 bg-gray-200 dark:bg-slate-700 rounded" />
                <div className="h-5 w-40 bg-gray-200 dark:bg-slate-700 rounded" />
              </div>
              <div className="space-y-2.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-100 dark:bg-slate-700 rounded"
                    style={{ width: `${85 + Math.sin(i) * 12}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Cotes */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="h-5 w-36 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="h-10 w-full bg-gray-100 dark:bg-slate-700 rounded-lg mb-2" />
                    <div className="h-3.5 w-12 bg-gray-100 dark:bg-slate-700 rounded-full mx-auto" />
                  </div>
                ))}
              </div>
              <div className="h-10 w-full bg-gray-100 dark:bg-slate-700 rounded-lg" />
            </div>

            {/* Stats H2H */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="h-5 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-5" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-3.5 w-8 bg-gray-100 dark:bg-slate-700 rounded-full text-right flex-shrink-0" />
                    <div className="h-3 flex-1 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-200 dark:bg-slate-600 rounded-full"
                        style={{ width: `${40 + i * 15}%` }}
                      />
                    </div>
                    <div className="h-3.5 w-8 bg-gray-100 dark:bg-slate-700 rounded-full flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Météo */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="h-5 w-24 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gray-200 dark:bg-slate-700 rounded-full" />
                <div>
                  <div className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded mb-1" />
                  <div className="h-3.5 w-24 bg-gray-100 dark:bg-slate-700 rounded" />
                </div>
              </div>
            </div>

            {/* Blessés / absents */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="h-5 w-36 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-2.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-slate-700" />
                    <div className="h-3.5 flex-1 bg-gray-100 dark:bg-slate-700 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Pronostic expert */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="h-5 w-40 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="h-20 w-full bg-gray-100 dark:bg-slate-700 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
