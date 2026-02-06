import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Selecciones */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Selecciones</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/equipo/mexico" className="hover:text-white">Mexico</Link></li>
              <li><Link href="/equipo/bresil" className="hover:text-white">Brasil</Link></li>
              <li><Link href="/equipo/argentine" className="hover:text-white">Argentina</Link></li>
              <li><Link href="/equipo/espagne" className="hover:text-white">Espana</Link></li>
              <li><Link href="/equipo/allemagne" className="hover:text-white">Alemania</Link></li>
              <li><Link href="/equipo/angleterre" className="hover:text-white">Inglaterra</Link></li>
              <li><Link href="/equipo/portugal" className="hover:text-white">Portugal</Link></li>
              <li><Link href="/equipo/pays-bas" className="hover:text-white">Paises Bajos</Link></li>
              <li className="pt-1">
                <Link href="/equipos" className="text-gold hover:text-white font-medium">
                  Todas las selecciones &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Grupos */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Grupos</h3>
            <ul className="space-y-2 text-sm">
              {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"].map((g) => (
                <li key={g}>
                  <Link href={`/grupo/${g.toLowerCase()}`} className="hover:text-white">
                    Grupo {g}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pronosticos */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Pronosticos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pronostico/mexico" className="hover:text-white">Pronostico Mexico</Link></li>
              <li><Link href="/pronostico/bresil" className="hover:text-white">Pronostico Brasil</Link></li>
              <li><Link href="/pronostico/argentine" className="hover:text-white">Pronostico Argentina</Link></li>
              <li><Link href="/pronostico/espagne" className="hover:text-white">Pronostico Espana</Link></li>
              <li><Link href="/pronostico/allemagne" className="hover:text-white">Pronostico Alemania</Link></li>
              <li><Link href="/match/calendario" className="hover:text-white">Calendario de partidos</Link></li>
              <li><Link href="/jugadores" className="hover:text-white">Jugadores clave</Link></li>
            </ul>
          </div>

          {/* Ciudades y Estadios */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Ciudades y Estadios</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ciudad/new-york-new-jersey" className="hover:text-white">New York</Link></li>
              <li><Link href="/ciudad/los-angeles" className="hover:text-white">Los Angeles</Link></li>
              <li><Link href="/ciudad/miami" className="hover:text-white">Miami</Link></li>
              <li><Link href="/ciudad/mexico-city" className="hover:text-white">Mexico</Link></li>
              <li><Link href="/ciudad/toronto" className="hover:text-white">Toronto</Link></li>
              <li className="pt-1">
                <Link href="/ciudades" className="text-gold hover:text-white font-medium">
                  Todas las ciudades &rarr;
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/estadios" className="text-gold hover:text-white font-medium">
                  Todos los estadios &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Informacion */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Informacion</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/acerca-de" className="hover:text-white">Acerca de</Link></li>
              <li><Link href="/aviso-legal" className="hover:text-white">Aviso legal</Link></li>
              <li><Link href="/juego-responsable" className="hover:text-white">Juego responsable</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-xs text-gray-400">
          <p>
            Los juegos de azar estan prohibidos para menores. Jugar conlleva riesgos: endeudamiento, adiccion.
            Llama al 900 200 225 (llamada gratuita).
          </p>
          <p className="mt-4">&copy; 2026 Mundial 2026. Todos los derechos reservados. Sitio no afiliado a la FIFA.</p>
        </div>
      </div>
    </footer>
  );
}
