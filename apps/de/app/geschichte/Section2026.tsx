import Link from "next/link";

export function Section2026() {
  return (
    <div className="mt-16">
      <div className="relative">
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-8 w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 top-0">
          <div className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-xl font-bold text-white shadow-xl bg-gradient-to-br from-primary to-primary">
            
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-primary border-2 border-primary/20 p-8 shadow-2xl text-white mt-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <span></span>
            <span>Historische Ausgabe</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            2026: Die grösste WM der Geschichte
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Die WM 2026 wird alle Rekorde brechen mit einem revolutionären Format
            und einer nie dagewesenen Dimension.
          </p>
        </div>

        {/* Stats clés */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { val: "48", label: "Mannschaften", icon: "", desc: "vs. 32 zuvor (+50%)" },
            { val: "104", label: "Spiele", icon: "", desc: "vs. 64 in 2022" },
            { val: "3", label: "Gastgeberländer", icon: "", desc: "USA · Kanada · Mexiko" },
            { val: "16", label: "Städte", icon: "", desc: "auf 3 Kontinenten" },
          ].map(({ val, label, icon, desc }) => (
            <div
              key={label}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center"
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-3xl font-extrabold">{val}</div>
              <div className="font-bold text-sm">{label}</div>
              <div className="text-[11px] text-white/80 mt-1">{desc}</div>
            </div>
          ))}
        </div>

        {/* 3 pays hôtes */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { flag: "🇺🇸", country: "Vereinigte Staaten", cities: "New York, Los Angeles, Dallas, San Francisco, Seattle, Boston, Miami, Atlanta, Houston, Kansas City, Philadelphia", matches: "78 Spiele", color: "from-blue-600/30 to-red-500/30" },
            { flag: "🇨🇦", country: "Kanada", cities: "Toronto, Vancouver", matches: "13 Spiele", color: "from-red-600/30 to-red-700/30" },
            { flag: "🇲🇽", country: "Mexiko", cities: "Mexiko-Stadt, Guadalajara, Monterrey", matches: "13 Spiele", color: "from-accent/30 to-red-500/30" },
          ].map((p) => (
            <div
              key={p.country}
              className={`rounded-2xl border border-white/20 bg-gradient-to-br ${p.color} p-4`}
            >
              <div className="text-4xl mb-2">{p.flag}</div>
              <div className="font-bold text-lg">{p.country}</div>
              <div className="text-xs text-white/80 mt-1 mb-2">{p.cities}</div>
              <div className="inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs font-bold">
                 {p.matches}
              </div>
            </div>
          ))}
        </div>

        {/* Nouveau format */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg> Revolutionäres neues Format
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
            <div>
              <div className="font-semibold text-white mb-1">Gruppenphase</div>
              <ul className="space-y-1 text-xs">
                <li><svg className="w-4 h-4 inline-block text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg> 12 Gruppen zu je 4 Mannschaften</li>
                <li><svg className="w-4 h-4 inline-block text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Die 2 Erstplatzierten + 8 beste Gruppendritte qualifiziert</li>
                <li><svg className="w-4 h-4 inline-block text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg> 32 Mannschaften in der nächsten Runde</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-1">K.-o.-Runden</div>
              <ul className="space-y-1 text-xs">
                <li><svg className="w-4 h-4 inline-block text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Achtelfinale</li>
                <li><svg className="w-4 h-4 inline-block text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Viertelfinale</li>
                <li><svg className="w-4 h-4 inline-block text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Halbfinale</li>
                <li><svg className="w-4 h-4 inline-block text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Finale: 19. Juli 2026, MetLife Stadium (New York)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Favoris 2026 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4"> Favoriten für 2026</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { flag: "🇧🇷", country: "Brasilien", cote: "5. Titel?" },
              { flag: "🇦🇷", country: "Argentinien", cote: "Titelverteidiger" },
              { flag: "🇫🇷", country: "Frankreich", cote: "3. Titel?" },
              { flag: "🇩🇪", country: "Deutschland", cote: "5. Titel?" },
              { flag: "🇵🇹", country: "Portugal", cote: "1. Titel?" },
              { flag: "🇪🇸", country: "Spanien", cote: "2. Titel?" },
              { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "England", cote: "2. Titel?" },
            ].map(({ flag, country, cote }) => (
              <div
                key={country}
                className="rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-center min-w-[90px]"
              >
                <div className="text-2xl">{flag}</div>
                <div className="text-xs font-bold mt-1">{country}</div>
                <div className="text-[10px] text-white/80">{cote}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/prognose/sieger"
            className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-bold px-6 py-3 hover:bg-gray-100 transition-colors shadow-lg"
          >
             Siegerprognose 2026
          </Link>
          <Link
            href="/turnierbaum"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 text-white font-bold px-6 py-3 hover:bg-white/10 transition-colors"
          >
             WM simulieren
          </Link>
          <Link
            href="/statistiken"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 text-white font-bold px-6 py-3 hover:bg-white/10 transition-colors"
          >
             Historische Statistiken
          </Link>
        </div>
      </div>
    </div>
  );
}
