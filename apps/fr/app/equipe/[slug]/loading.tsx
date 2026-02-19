export default function TeamLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 animate-pulse">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex gap-2 items-center">
          <div className="h-3.5 w-12 bg-gray-200 dark:bg-slate-700 rounded-full" />
          <span className="text-gray-300 dark:text-slate-600">/</span>
          <div className="h-3.5 w-20 bg-gray-200 dark:bg-slate-700 rounded-full" />
          <span className="text-gray-300 dark:text-slate-600">/</span>
          <div className="h-3.5 w-28 bg-gray-200 dark:bg-slate-700 rounded-full" />
        </div>
      </div>

      {/* Hero équipe */}
      <div className="bg-gradient-to-br from-primary to-secondary text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Drapeau */}
          <div className="w-24 h-16 rounded-lg bg-white/10 flex-shrink-0" />
          <div className="flex-1 text-center sm:text-left">
            <div className="h-4 w-24 bg-white/20 rounded-full mb-3 mx-auto sm:mx-0" />
            <div className="h-9 w-56 bg-white/20 rounded-lg mb-3 mx-auto sm:mx-0" />
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <div className="h-7 w-28 bg-white/10 rounded-full" />
              <div className="h-7 w-24 bg-white/10 rounded-full" />
              <div className="h-7 w-32 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats rapides */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="h-5 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="h-8 w-16 bg-gray-200 dark:bg-slate-700 rounded-lg mx-auto mb-2" />
                    <div className="h-3.5 w-20 bg-gray-100 dark:bg-slate-700 rounded-full mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Description IA */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="h-5 w-40 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-2.5">
                <div className="h-4 w-full bg-gray-100 dark:bg-slate-700 rounded" />
                <div className="h-4 w-5/6 bg-gray-100 dark:bg-slate-700 rounded" />
                <div className="h-4 w-full bg-gray-100 dark:bg-slate-700 rounded" />
                <div className="h-4 w-3/4 bg-gray-100 dark:bg-slate-700 rounded" />
              </div>
            </div>

            {/* Effectif */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="h-5 w-28 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-slate-700/50 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-1" />
                      <div className="h-3 w-20 bg-gray-100 dark:bg-slate-700 rounded" />
                    </div>
                    <div className="h-4 w-10 bg-gray-100 dark:bg-slate-700 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Groupe */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="h-5 w-24 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-4 rounded bg-gray-200 dark:bg-slate-700" />
                    <div className="h-4 flex-1 bg-gray-100 dark:bg-slate-700 rounded" />
                    <div className="h-4 w-8 bg-gray-100 dark:bg-slate-700 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Cotes */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="h-5 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="h-16 w-full bg-gray-100 dark:bg-slate-700 rounded-lg" />
            </div>

            {/* Calendrier matchs */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="h-5 w-28 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 w-full bg-gray-100 dark:bg-slate-700 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
