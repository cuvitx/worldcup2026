/** Reusable skeleton loading components */

export function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-gray-200 ${className}`}>
      <div className="invisible">.</div>
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-gray-100 p-4 ${className}`}>
      <div className="mb-3 h-4 w-3/4 rounded bg-gray-200" />
      <div className="mb-2 h-3 w-full rounded bg-gray-200" />
      <div className="mb-2 h-3 w-5/6 rounded bg-gray-200" />
      <div className="h-3 w-2/3 rounded bg-gray-200" />
    </div>
  );
}

export function SkeletonTable({ rows = 3, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg bg-gray-100 p-4">
      <div className="mb-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-3 flex-1 rounded bg-gray-200" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="mb-2 flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="h-3 flex-1 rounded bg-gray-200" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonMatchPreview() {
  return (
    <div className="animate-pulse rounded-xl bg-gray-100 p-6">
      <div className="mb-4 h-5 w-1/2 rounded bg-gray-200" />
      <div className="mb-3 h-3 w-full rounded bg-gray-200" />
      <div className="mb-3 h-3 w-full rounded bg-gray-200" />
      <div className="mb-3 h-3 w-4/5 rounded bg-gray-200" />
      <div className="mt-6 flex gap-4">
        <div className="h-8 flex-1 rounded bg-gray-200" />
        <div className="h-8 flex-1 rounded bg-gray-200" />
        <div className="h-8 flex-1 rounded bg-gray-200" />
      </div>
    </div>
  );
}
