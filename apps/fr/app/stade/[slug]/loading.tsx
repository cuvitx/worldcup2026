export default function Loading() {
  return (
    <div className="flex flex-1 flex-col min-h-[70vh] bg-gray-50slate-900">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero stade */}
        <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm overflow-hidden mb-8">
          <div className="h-56 w-full bg-gray-200slate-700 animate-pulse" />
          <div className="p-6">
            <div className="h-8 w-64 bg-gray-200slate-700 rounded-lg mb-3 animate-pulse" />
            <div className="h-4 w-40 bg-gray-200slate-700 rounded-full mb-4 animate-pulse" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-200slate-700 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Matchs dans ce stade */}
        <div className="h-6 w-40 bg-gray-200slate-700 rounded-full mb-4 animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-whiteslate-800 border border-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
