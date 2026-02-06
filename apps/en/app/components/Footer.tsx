import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Teams */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Teams</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/team/france" className="hover:text-white">France</Link></li>
              <li><Link href="/team/bresil" className="hover:text-white">Brazil</Link></li>
              <li><Link href="/team/argentine" className="hover:text-white">Argentina</Link></li>
              <li><Link href="/team/espagne" className="hover:text-white">Spain</Link></li>
              <li><Link href="/team/allemagne" className="hover:text-white">Germany</Link></li>
              <li><Link href="/team/angleterre" className="hover:text-white">England</Link></li>
              <li><Link href="/team/portugal" className="hover:text-white">Portugal</Link></li>
              <li><Link href="/team/pays-bas" className="hover:text-white">Netherlands</Link></li>
              <li className="pt-1">
                <Link href="/teams" className="text-gold hover:text-white font-medium">
                  All teams &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Groups */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Groups</h3>
            <ul className="space-y-2 text-sm">
              {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"].map((g) => (
                <li key={g}>
                  <Link href={`/group/${g.toLowerCase()}`} className="hover:text-white">
                    Group {g}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Predictions */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Predictions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/prediction/france" className="hover:text-white">France Prediction</Link></li>
              <li><Link href="/prediction/bresil" className="hover:text-white">Brazil Prediction</Link></li>
              <li><Link href="/prediction/argentine" className="hover:text-white">Argentina Prediction</Link></li>
              <li><Link href="/prediction/espagne" className="hover:text-white">Spain Prediction</Link></li>
              <li><Link href="/prediction/allemagne" className="hover:text-white">Germany Prediction</Link></li>
              <li><Link href="/match/schedule" className="hover:text-white">Match schedule</Link></li>
              <li><Link href="/players" className="hover:text-white">Key players</Link></li>
            </ul>
          </div>

          {/* Cities & Stadiums */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Cities & Stadiums</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/city/new-york-new-jersey" className="hover:text-white">New York</Link></li>
              <li><Link href="/city/los-angeles" className="hover:text-white">Los Angeles</Link></li>
              <li><Link href="/city/miami" className="hover:text-white">Miami</Link></li>
              <li><Link href="/city/mexico-city" className="hover:text-white">Mexico City</Link></li>
              <li><Link href="/city/toronto" className="hover:text-white">Toronto</Link></li>
              <li className="pt-1">
                <Link href="/cities" className="text-gold hover:text-white font-medium">
                  All cities &rarr;
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/stadiums" className="text-gold hover:text-white font-medium">
                  All stadiums &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Betting & Guides */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Betting & Guides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/betting" className="hover:text-white">WC 2026 Betting</Link></li>
              <li><Link href="/scorers" className="hover:text-white">Scorer Odds</Link></li>
              <li><Link href="/bookmaker/betclic" className="hover:text-white">Betclic Review</Link></li>
              <li><Link href="/bookmaker/winamax" className="hover:text-white">Winamax Review</Link></li>
              <li><Link href="/guide/comment-parier-cdm-2026" className="hover:text-white">How to Bet on WC</Link></li>
              <li className="pt-1">
                <Link href="/guides" className="text-gold hover:text-white font-medium">
                  All guides &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/legal" className="hover:text-white">Legal</Link></li>
              <li><Link href="/responsible-gambling" className="hover:text-white">Responsible Gambling</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-xs text-gray-400">
          <p>
            Gambling is prohibited for minors. Gambling involves risk: debt, addiction.
          </p>
          <p className="mt-4">&copy; 2026 WC 2026. All rights reserved. Not affiliated with FIFA.</p>
        </div>
      </div>
    </footer>
  );
}
