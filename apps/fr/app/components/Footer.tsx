import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Equipes</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/equipe/france" className="hover:text-white">France</Link></li>
              <li><Link href="/equipe/bresil" className="hover:text-white">Bresil</Link></li>
              <li><Link href="/equipe/argentine" className="hover:text-white">Argentine</Link></li>
              <li><Link href="/equipe/espagne" className="hover:text-white">Espagne</Link></li>
              <li><Link href="/equipe/allemagne" className="hover:text-white">Allemagne</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Groupes</h3>
            <ul className="space-y-2 text-sm">
              {["A", "B", "C", "D", "E", "F"].map((g) => (
                <li key={g}>
                  <Link href={`/groupe/${g.toLowerCase()}`} className="hover:text-white">
                    Groupe {g}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Villes hotes</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ville/miami" className="hover:text-white">Miami</Link></li>
              <li><Link href="/ville/mexico" className="hover:text-white">Mexico</Link></li>
              <li><Link href="/ville/los-angeles" className="hover:text-white">Los Angeles</Link></li>
              <li><Link href="/ville/toronto" className="hover:text-white">Toronto</Link></li>
              <li><Link href="/ville/new-york" className="hover:text-white">New York</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Infos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/format" className="hover:text-white">Format 48 equipes</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-white">Mentions legales</Link></li>
              <li><Link href="/jeu-responsable" className="hover:text-white">Jeu responsable</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2026 CDM 2026. Tous droits reserves. Site non affilie a la FIFA.</p>
        </div>
      </div>
    </footer>
  );
}
