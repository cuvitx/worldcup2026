import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Equipes favorites */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Equipes</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/equipe/france" className="hover:text-white">France</Link></li>
              <li><Link href="/equipe/bresil" className="hover:text-white">Bresil</Link></li>
              <li><Link href="/equipe/argentine" className="hover:text-white">Argentine</Link></li>
              <li><Link href="/equipe/espagne" className="hover:text-white">Espagne</Link></li>
              <li><Link href="/equipe/allemagne" className="hover:text-white">Allemagne</Link></li>
              <li><Link href="/equipe/angleterre" className="hover:text-white">Angleterre</Link></li>
              <li><Link href="/equipe/portugal" className="hover:text-white">Portugal</Link></li>
              <li><Link href="/equipe/pays-bas" className="hover:text-white">Pays-Bas</Link></li>
              <li className="pt-1">
                <Link href="/equipes" className="text-gold hover:text-white font-medium">
                  Toutes les equipes &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Groupes */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Groupes</h3>
            <ul className="space-y-2 text-sm">
              {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"].map((g) => (
                <li key={g}>
                  <Link href={`/groupe/${g.toLowerCase()}`} className="hover:text-white">
                    Groupe {g}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pronostics */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Pronostics</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pronostic/france" className="hover:text-white">Pronostic France</Link></li>
              <li><Link href="/pronostic/bresil" className="hover:text-white">Pronostic Bresil</Link></li>
              <li><Link href="/pronostic/argentine" className="hover:text-white">Pronostic Argentine</Link></li>
              <li><Link href="/pronostic/espagne" className="hover:text-white">Pronostic Espagne</Link></li>
              <li><Link href="/pronostic/allemagne" className="hover:text-white">Pronostic Allemagne</Link></li>
              <li><Link href="/match/calendrier" className="hover:text-white">Calendrier des matchs</Link></li>
              <li><Link href="/joueurs" className="hover:text-white">Joueurs cles</Link></li>
            </ul>
          </div>

          {/* Villes & Stades */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Villes & Stades</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ville/new-york-new-jersey" className="hover:text-white">New York</Link></li>
              <li><Link href="/ville/los-angeles" className="hover:text-white">Los Angeles</Link></li>
              <li><Link href="/ville/miami" className="hover:text-white">Miami</Link></li>
              <li><Link href="/ville/mexico-city" className="hover:text-white">Mexico</Link></li>
              <li><Link href="/ville/toronto" className="hover:text-white">Toronto</Link></li>
              <li className="pt-1">
                <Link href="/villes" className="text-gold hover:text-white font-medium">
                  Toutes les villes &rarr;
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/stades" className="text-gold hover:text-white font-medium">
                  Tous les stades &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Infos */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Infos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/a-propos" className="hover:text-white">A propos</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-white">Mentions legales</Link></li>
              <li><Link href="/jeu-responsable" className="hover:text-white">Jeu responsable</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-xs text-gray-400">
          <p>
            Les jeux d&apos;argent sont interdits aux mineurs. Jouer comporte des risques : endettement, dependance.
            Appelez le 09 74 75 13 13 (appel non surtaxe).
          </p>
          <p className="mt-4">&copy; 2026 CDM 2026. Tous droits reserves. Site non affilie a la FIFA.</p>
        </div>
      </div>
    </footer>
  );
}
