export default function Loading() {
  return (
    <div className="flex flex-1 flex-col min-h-[70vh] bg-gray-50">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Groupe header */}
        <div className="mb-8">
          <div className="h-10 w-48 bg-gray-200 rounded-lg mb-3 animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Classement table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-8">
          <div className="h-12 bg-gray-100/50 animate-pulse" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 border-t border-gray-100">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="w-8 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-28 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1" />
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ))}
        </div>

        {/* Matchs */}
        <div className="h-6 w-36 bg-gray-200 rounded-full mb-4 animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-white border border-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
