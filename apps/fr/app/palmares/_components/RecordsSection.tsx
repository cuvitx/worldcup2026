export function RecordsSection({ records }: { records: { icon: string; label: string; value: string; detail: string }[] }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Records &amp; stats marquantes
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {records.map((rec) => (
          <div
            key={rec.label}
            className="rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 shadow-sm hover:border-primary/30 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent mb-3">
              <RecordIcon label={rec.label} />
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{rec.label}</div>
            <div className="font-bold text-lg mb-1">{rec.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300">{rec.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecordIcon({ label }: { label: string }) {
  const cls = "w-5 h-5";
  const props = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: cls };

  if (label.includes("buteur") || label.includes("buts"))
    return <svg {...props}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>; // target
  if (label.includes("matchs") || label.includes("CDM"))
    return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>; // calendar
  if (label.includes("titres"))
    return <svg {...props}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>; // trophy
  if (label.includes("jeune"))
    return <svg {...props}><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>; // user
  if (label.includes("vieux"))
    return <svg {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; // clock
  if (label.includes("victoire") || label.includes("déroute"))
    return <svg {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>; // trending-up
  if (label.includes("nations") || label.includes("Pays"))
    return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; // globe
  if (label.includes("2026"))
    return <svg {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; // star
  // default: award
  return <svg {...props}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
}
