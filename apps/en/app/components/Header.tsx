import Link from "next/link";

export function Header() {
  return (
    <header className="bg-primary text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-gold">WC</span> 2026
        </Link>
        <ul className="hidden gap-6 text-sm font-medium md:flex">
          <li>
            <Link href="/group/a" className="hover:text-gold transition-colors">
              Groups
            </Link>
          </li>
          <li>
            <Link href="/team/england" className="hover:text-gold transition-colors">
              Teams
            </Link>
          </li>
          <li>
            <Link href="/match/schedule" className="hover:text-gold transition-colors">
              Schedule
            </Link>
          </li>
          <li>
            <Link href="/stadium/metlife-stadium" className="hover:text-gold transition-colors">
              Stadiums
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
