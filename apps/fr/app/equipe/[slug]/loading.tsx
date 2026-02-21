export default function Loading() {
  return (
    <div className="flex flex-1 flex-col min-h-[70vh] bg-gray-50slate-900">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero équipe */}
        <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm p-6 mb-8">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-14 bg-gray-200slate-700 rounded-lg animate-pulse" />
            <div className="flex-1">
              <div className="h-8 w-48 bg-gray-200slate-700 rounded-lg mb-2 animate-pulse" />
              <div className="h-4 w-32 bg-gray-200slate-700 rounded-full animate-pulse" />
            </div>
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-200slate-700 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>

        {/* Joueurs */}
        <div className="h-6 w-32 bg-gray-200slate-700 rounded-full mb-4 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-whiteslate-800 p-4 animate-pulse">
              <div className="w-16 h-16 mx-auto bg-gray-200slate-700 rounded-full mb-3" />
              <div className="h-4 w-24 mx-auto bg-gray-200slate-700 rounded-full mb-2" />
              <div className="h-3 w-16 mx-auto bg-gray-200slate-700 rounded-full" />
            </div>
          ))}
        </div>

        {/* Matchs */}
        <div className="h-6 w-28 bg-gray-200slate-700 rounded-full mb-4 animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-whiteslate-800 border border-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
