export default function Loading() {
  return (
    <div className="flex flex-1 flex-col min-h-[70vh] bg-gray-50slate-900">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Score hero */}
        <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-12 bg-gray-200slate-700 rounded-lg animate-pulse" />
              <div className="h-4 w-20 bg-gray-200slate-700 rounded-full animate-pulse" />
            </div>
            <div className="h-10 w-16 bg-gray-200slate-700 rounded-lg animate-pulse" />
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-12 bg-gray-200slate-700 rounded-lg animate-pulse" />
              <div className="h-4 w-20 bg-gray-200slate-700 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="h-4 w-48 mx-auto bg-gray-200slate-700 rounded-full animate-pulse mb-2" />
          <div className="h-3 w-32 mx-auto bg-gray-200slate-700 rounded-full animate-pulse" />
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl border border-gray-200 bg-whiteslate-800 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
