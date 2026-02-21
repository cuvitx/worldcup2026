export default function Loading() {
  return (
    <div className="flex flex-1 flex-col min-h-[70vh] bg-gray-50-900">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Match header */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 mb-8">
          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-10 bg-gray-200-700 rounded-lg animate-pulse" />
              <div className="h-4 w-20 bg-gray-200-700 rounded-full animate-pulse" />
            </div>
            <div className="h-6 w-8 bg-gray-200-700 rounded animate-pulse" />
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-10 bg-gray-200-700 rounded-lg animate-pulse" />
              <div className="h-4 w-20 bg-gray-200-700 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Pronostic form skeleton */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 mb-6">
          <div className="h-6 w-40 bg-gray-200-700 rounded-full mb-6 animate-pulse" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 bg-gray-200-700 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="h-12 w-full bg-gray-200-700 rounded-xl mt-6 animate-pulse" />
        </div>

        {/* Community stats */}
        <div className="h-32 rounded-xl border border-gray-200 bg-white animate-pulse" />
      </div>
    </div>
  );
}
