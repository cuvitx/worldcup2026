import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Equipos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/equipo/mexico" className="hover:text-white">Mexico</Link></li>
              <li><Link href="/equipo/bresil" className="hover:text-white">Brasil</Link></li>
              <li><Link href="/equipo/argentine" className="hover:text-white">Argentina</Link></li>
              <li><Link href="/equipo/espagne" className="hover:text-white">Espana</Link></li>
              <li><Link href="/equipo/allemagne" className="hover:text-white">Alemania</Link></li>
              <li><Link href="/equipo/angleterre" className="hover:text-white">Inglaterra</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Competicion</h3>
            <ul className="space-y-2 text-sm">
              {["A", "B", "C", "D", "E", "F"].map((g) => (
                <li key={g}>
                  <Link href={`/grupo/${g.toLowerCase()}`} className="hover:text-white">
                    Grupo {g}
                  </Link>
                </li>
              ))}
              <li><Link href="/match/calendario" className="hover:text-white">Calendario de partidos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Ciudades sede</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ciudad/new-york-new-jersey" className="hover:text-white">New York</Link></li>
              <li><Link href="/ciudad/los-angeles" className="hover:text-white">Los Angeles</Link></li>
              <li><Link href="/ciudad/miami" className="hover:text-white">Miami</Link></li>
              <li><Link href="/ciudad/mexico-city" className="hover:text-white">Mexico</Link></li>
              <li><Link href="/ciudad/toronto" className="hover:text-white">Toronto</Link></li>
              <li><Link href="/ciudad/vancouver" className="hover:text-white">Vancouver</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/acerca-de" className="hover:text-white">Acerca de</Link></li>
              <li><Link href="/match/calendario" className="hover:text-white">Calendario</Link></li>
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
