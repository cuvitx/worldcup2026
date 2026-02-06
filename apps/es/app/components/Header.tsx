import Link from "next/link";

export function Header() {
  return (
    <header className="bg-primary text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-gold">Mundial</span> 2026
        </Link>
        <ul className="hidden gap-6 text-sm font-medium md:flex">
          <li>
            <Link href="/grupo/a" className="hover:text-gold transition-colors">
              Grupos
            </Link>
          </li>
          <li>
            <Link href="/equipo/mexico" className="hover:text-gold transition-colors">
              Equipos
            </Link>
          </li>
          <li>
            <Link href="/match/calendario" className="hover:text-gold transition-colors">
              Calendario
            </Link>
          </li>
          <li>
            <Link href="/estadio/metlife-stadium" className="hover:text-gold transition-colors">
              Estadios
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
