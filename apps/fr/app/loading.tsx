export default function Loading() {
  return (
    <div className="flex flex-1 flex-col min-h-[70vh] bg-gray-50 dark:bg-slate-900">
      {/* Barre de progression en haut */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gray-200 dark:bg-slate-800 overflow-hidden">
        <div className="h-full w-1/3 bg-accent rounded-full animate-[loading-bar_1.5s_ease-in-out_infinite]" />
      </div>

      {/* Skeleton navbar */}
      <div className="fixed top-0.5 left-0 right-0 z-40 h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-gray-100 dark:border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo skeleton */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-4 w-28 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />
        </div>
        {/* Nav links skeleton (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {[72, 60, 80, 56, 68].map((w, i) => (
            <div
              key={i}
              className="h-3.5 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse"
              style={{ width: `${w}px`, animationDelay: `${i * 0.07}s` }}
            />
          ))}
        </div>
        {/* Actions skeleton (search + CTA) */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="hidden sm:block h-8 w-24 rounded-lg bg-gray-200 dark:bg-slate-700 animate-pulse" />
        </div>
      </div>

      {/* Spacer pour compenser la navbar fixe */}
      <div className="h-14" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero skeleton */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-8 mb-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-slate-700/30 to-transparent animate-[shimmer_1.8s_infinite] -translate-x-full" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded-full mb-4 animate-pulse" />
          <div className="h-8 w-3/4 bg-gray-200 dark:bg-slate-700 rounded-lg mb-3 animate-pulse" />
          <div className="h-5 w-1/2 bg-gray-200 dark:bg-slate-700 rounded-lg mb-6 animate-pulse" />
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
            <div className="h-10 w-28 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Grille de cartes skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Ballon centré en bas */}
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <BouncingBall />
          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium animate-pulse">
            Chargement en cours…
          </p>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes ball-bounce {
          0%, 100% { transform: translateY(0) scaleY(1); animation-timing-function: ease-in; }
          40% { transform: translateY(-28px) scaleY(1.05); animation-timing-function: ease-out; }
          80% { transform: translateY(0) scaleY(0.9); animation-timing-function: ease-in; }
          90% { transform: translateY(-6px) scaleY(1); animation-timing-function: ease-out; }
        }
        @keyframes shadow-pulse {
          0%, 100% { transform: scaleX(1); opacity: 0.3; }
          40% { transform: scaleX(0.6); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}

function SkeletonCard({ delay }: { delay: number }) {
  return (
    <div
      className="rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 overflow-hidden relative"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-slate-700/20 to-transparent animate-[shimmer_1.8s_infinite] -translate-x-full" />
      {/* Thumbnail */}
      <div className="h-36 w-full bg-gray-100 dark:bg-slate-700 rounded-lg mb-4 animate-pulse" />
      {/* Badge */}
      <div className="h-3.5 w-16 bg-gray-100 dark:bg-slate-700 rounded-full mb-3 animate-pulse" />
      {/* Title */}
      <div className="h-5 w-full bg-gray-100 dark:bg-slate-700 rounded-md mb-2 animate-pulse" />
      <div className="h-5 w-3/4 bg-gray-100 dark:bg-slate-700 rounded-md mb-4 animate-pulse" />
      {/* Meta */}
      <div className="flex gap-2">
        <div className="h-4 w-12 bg-gray-100 dark:bg-slate-700 rounded-full animate-pulse" />
        <div className="h-4 w-16 bg-gray-100 dark:bg-slate-700 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

function BouncingBall() {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="text-4xl select-none"
        style={{ animation: "ball-bounce 0.9s infinite" }}
        aria-label="Chargement"
        role="status"
      >
        ⚽
      </span>
      <div
        className="w-8 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600"
        style={{ animation: "shadow-pulse 0.9s infinite" }}
      />
    </div>
  );
}
