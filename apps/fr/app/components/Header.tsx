import Link from "next/link";

export function Header() {
  return (
    <header className="bg-primary text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-gold">CDM</span> 2026
        </Link>
        <ul className="hidden gap-6 text-sm font-medium md:flex">
          <li>
            <Link href="/groupe/a" className="hover:text-gold transition-colors">
              Groupes
            </Link>
          </li>
          <li>
            <Link href="/equipe/france" className="hover:text-gold transition-colors">
              Equipes
            </Link>
          </li>
          <li>
            <Link href="/match/calendrier" className="hover:text-gold transition-colors">
              Calendrier
            </Link>
          </li>
          <li>
            <Link href="/stade/metlife-stadium" className="hover:text-gold transition-colors">
              Stades
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
