import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Teams</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/team/france" className="hover:text-white">France</Link></li>
              <li><Link href="/team/bresil" className="hover:text-white">Brazil</Link></li>
              <li><Link href="/team/argentine" className="hover:text-white">Argentina</Link></li>
              <li><Link href="/team/espagne" className="hover:text-white">Spain</Link></li>
              <li><Link href="/team/allemagne" className="hover:text-white">Germany</Link></li>
              <li><Link href="/team/angleterre" className="hover:text-white">England</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Competition</h3>
            <ul className="space-y-2 text-sm">
              {["A", "B", "C", "D", "E", "F"].map((g) => (
                <li key={g}>
                  <Link href={`/group/${g.toLowerCase()}`} className="hover:text-white">
                    Group {g}
                  </Link>
                </li>
              ))}
              <li><Link href="/match/schedule" className="hover:text-white">Match schedule</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Host Cities</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/city/new-york-new-jersey" className="hover:text-white">New York</Link></li>
              <li><Link href="/city/los-angeles" className="hover:text-white">Los Angeles</Link></li>
              <li><Link href="/city/miami" className="hover:text-white">Miami</Link></li>
              <li><Link href="/city/mexico-city" className="hover:text-white">Mexico City</Link></li>
              <li><Link href="/city/toronto" className="hover:text-white">Toronto</Link></li>
              <li><Link href="/city/vancouver" className="hover:text-white">Vancouver</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/match/schedule" className="hover:text-white">Schedule</Link></li>
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
