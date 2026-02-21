export default function Loading() {
  return (
    <div className="flex flex-1 flex-col min-h-[70vh] bg-gray-50-900">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero joueur */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-200-700 rounded-full animate-pulse flex-shrink-0" />
            <div className="flex-1">
              <div className="h-8 w-48 bg-gray-200-700 rounded-lg mb-2 animate-pulse" />
              <div className="h-4 w-32 bg-gray-200-700 rounded-full mb-2 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200-700 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 animate-pulse">
              <div className="h-3 w-16 bg-gray-200-700 rounded-full mb-3" />
              <div className="h-8 w-12 bg-gray-200-700 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Bio / infos */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6">
          <div className="h-5 w-24 bg-gray-200-700 rounded-full mb-4 animate-pulse" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200-700 rounded-full animate-pulse" style={{ width: `${85 - i * 15}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
