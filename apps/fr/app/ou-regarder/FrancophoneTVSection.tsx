interface Channel {
  name: string;
  type: string;
  matches: string;
  details: string;
}

interface StreamingLink {
  name: string;
  url: string;
  free: boolean;
  desc: string;
}

interface CountryTV {
  country: string;
  channels: Channel[];
  streaming: StreamingLink[];
}

interface FrancophoneTVSectionProps {
  tvByCountryFrancophone: CountryTV[];
}

export function FrancophoneTVSection({ tvByCountryFrancophone }: FrancophoneTVSectionProps) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        📡 Droits TV — Belgique, Suisse, Canada
      </h2>

      <div className="space-y-8">
        {tvByCountryFrancophone.map((country) => (
          <div
            key={country.country}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{country.country}</h3>
            </div>
            <div className="p-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-3">📺 Chaînes TV</h4>
                <div className="space-y-3">
                  {country.channels.map((ch) => (
                    <div key={ch.name} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-gray-900 dark:text-gray-100">{ch.name}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            ch.type.toLowerCase().includes("gratuit")
                              ? "bg-field/10 dark:bg-field/20 text-field dark:text-field"
                              : "bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary"
                          }`}>{ch.type}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">{ch.details}</p>
                        <p className="text-xs font-semibold text-primary dark:text-secondary mt-1">{ch.matches}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-3">💻 Streaming légal</h4>
                <div className="space-y-3">
                  {country.streaming.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors">{s.name}</span>
                          {s.free && (
                            <span className="text-xs font-bold bg-field/10 dark:bg-field/20 text-field dark:text-field px-2 py-0.5 rounded-full">Gratuit</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">{s.desc}</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-primary dark:group-hover:text-primary shrink-0 mt-0.5 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
