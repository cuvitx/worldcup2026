import Link from "next/link";
import { Newsletter } from "@repo/ui/newsletter";
import { BzgaBanner } from "./BzgaBanner";

const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const columns = [
  {
    title: "Turnier",
    links: [
      { href: "/spiel/spielplan", label: "Spielplan" },
      { href: "/gruppen", label: "Die 12 Gruppen" },
      { href: "/mannschaften", label: "48 Mannschaften" },
      { href: "/mannschaft/deutschland", label: "\u{1F1E9}\u{1F1EA} DFB-Elf" },
      { href: "/stadien", label: "Stadien" },
      { href: "/staedte", label: "Austragungsorte" },
      { href: "/ergebnisse", label: "Ergebnisse" },
      { href: "/live", label: "Live-Ergebnisse" },
    ],
  },
  {
    title: "Prognosen",
    links: [
      { href: "/prognose/weltmeister", label: "WM-Sieger Prognose" },
      { href: "/prognose/deutschland", label: "Prognose Deutschland" },
      { href: "/prognose/brasilien", label: "Prognose Brasilien" },
      { href: "/quotenvergleich", label: "Quotenvergleich" },
      { href: "/sportwetten", label: "Sportwetten" },
      { href: "/spielervergleich", label: "Spielervergleich" },
      { href: "/turnierbaum", label: "Turnierbaum" },
      { href: "/torschuetzen", label: "Torjäger" },
    ],
  },
  {
    title: "Infos",
    links: [
      { href: "/nachrichten", label: "Nachrichten" },
      { href: "/ratgeber", label: "Ratgeber" },
      { href: "/wo-schauen", label: "Wo schauen" },
      { href: "/spieler", label: "Spieler" },
      { href: "/h2h", label: "Direktvergleich (H2H)" },
      { href: "/suche", label: "Suche" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Über uns",
    links: [
      { href: "/ueber-uns", label: "Über uns" },
      { href: "/methodik", label: "Methodik" },
      { href: "/verantwortungsvolles-spielen", label: "Verantwortungsvolles Spielen" },
      { href: "/kontakt", label: "Kontakt" },
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="text-gray-300 pb-24 sm:pb-0">

      <BzgaBanner />
      <div className="hero-animated">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-6">

        {/* Brand + social row */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

          {/* Logo + description */}
          <div className="max-w-xs">
            <Link href="/" className="inline-block mb-3">
              <img src="/images/logo-navbar.png?v=2" srcSet="/images/logo-navbar.png?v=2 2x, /images/logo-navbar@3x.png?v=2 3x" alt="WM 2026" width={130} height={80} className="h-10 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Kompletter Guide zur Fussball-WM 2026. Prognosen, Quoten,
              Analysen und Tools für alle Fussball-Fans.
            </p>
          </div>

          {/* Betting partners */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Wettpartner
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {["Betano", "Bet-at-Home"].map((bk) => (
                <span
                  key={bk}
                  className="inline-block rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-gray-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  {bk}
                </span>
              ))}
            </div>
          </div>

          {/* Official sources (E-E-A-T) */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Offizielle Quellen
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { href: "https://www.fifa.com/fifaplus/de/tournaments/mens/worldcup/canadamexicousa2026", label: "FIFA.com" },
                { href: "https://www.dfb.de", label: "DFB" },
                { href: "https://www.bzga.de", label: "BZgA" },
              ].map((source) => (
                <a
                  key={source.label}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-gray-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  {source.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 4-column main grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10 border-t border-white/5 pt-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold text-white mb-4 uppercase tracking-widest">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors py-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Groups row */}
        <div className="border-t border-white/5 pt-6 mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
            Die 12 Gruppen
          </p>
          <div className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <Link
                key={g}
                href={`/gruppe/${g.toLowerCase()}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/8 text-sm font-bold hover:bg-primary/20 hover:border-primary/30 hover:text-white transition-all"
              >
                {g}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/5 pt-6 mb-6">
          <Newsletter locale="de" />
        </div>

        {/* Legal bottom */}
        <div className="border-t border-white/5 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { href: "/impressum", label: "Impressum" },
                { href: "/datenschutz", label: "Datenschutz" },
                { href: "/verantwortungsvolles-spielen", label: "Verantwortungsvolles Spielen" },
                { href: "/methodik", label: "Methodik" },
                { href: "/ueber-uns", label: "Über uns" },
                { href: "/kontakt", label: "Kontakt" },
                { href: "/faq", label: "FAQ" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-gray-300 transition-colors py-1 inline-block">
                  {item.label}
                </Link>
              ))}
            </div>
            <p>&copy; 2026 WM 2026. Nicht affiliiert mit der FIFA.</p>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
