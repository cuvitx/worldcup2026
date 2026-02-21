import Link from "next/link";
import { Newsletter } from "@repo/ui/newsletter";
import { ANJBanner } from "@repo/ui/anj-banner";

const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const columns = [
  {
    title: "Tournoi",
    links: [
      { href: "/match/calendrier", label: "Calendrier des matchs" },
      { href: "/groupes", label: "Les 12 groupes" },
      { href: "/equipe", label: "48 équipes" },
      { href: "/equipe/france", label: "🇫🇷 Équipe de France" },
      { href: "/stades", label: "Stades" },
      { href: "/carte-stades", label: "Carte des stades" },
      { href: "/villes", label: "Villes hôtes" },
      { href: "/palmares", label: "Palmarès CDM" },
      { href: "/billets", label: "Billets" },
      { href: "/live", label: "Live scores" },
    ],
  },
  {
    title: "Pronostics",
    links: [
      { href: "/pronostic/vainqueur", label: "Pronostic vainqueur" },
      { href: "/pronostic/france", label: "Pronostic France" },
      { href: "/pronostic/bresil", label: "Pronostic Brésil" },
      { href: "/comparateur-cotes", label: "Comparateur de cotes" },
      { href: "/paris-sportifs", label: "Paris sportifs" },
      { href: "/comparateur-joueurs", label: "Comparateur joueurs" },
      { href: "/simulateur", label: "Simulateur" },
      { href: "/buteurs", label: "Meilleurs buteurs" },
    ],
  },
  {
    title: "Infos",
    links: [
      { href: "/actualites", label: "Actualités" },
      { href: "/guides", label: "Guides" },
      { href: "/ou-regarder", label: "Où regarder" },
      { href: "/joueurs", label: "Joueurs" },
      { href: "/h2h", label: "Face-à-face (H2H)" },
      { href: "/recherche", label: "Recherche" },
      { href: "/quiz", label: "Quiz CDM" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "À propos",
    links: [
      { href: "/a-propos", label: "À propos" },
      { href: "/methodologie", label: "Méthodologie" },
      { href: "/jeu-responsable", label: "Jeu responsable" },
      { href: "/contact", label: "Contact" },
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/politique-de-confidentialite", label: "Confidentialité" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="text-gray-300 pb-24 sm:pb-0">
      
      <ANJBanner />
      <div className="hero-animated">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-6">

        {/* Brand + social row */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

          {/* Logo + description */}
          <div className="max-w-xs">
            <Link href="/" className="inline-block mb-3">
              <img src="/images/logo-navbar.png?v=2" srcSet="/images/logo-navbar.png?v=2 2x, /images/logo-navbar@3x.png?v=2 3x" alt="CDM 2026" width={130} height={80} className="h-10 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Guide complet de la Coupe du Monde 2026. Pronostics, cotes,
              analyses et outils pour tous les fans de football.
            </p>
          </div>

          {/* Bookmaker partners */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Partenaires agréés ANJ
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {["Betclic", "Winamax", "Unibet", "PMU"].map((bk) => (
                <span
                  key={bk}
                  className="inline-block rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-gray-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  {bk}
                </span>
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

        {/* Groupes row */}
        <div className="border-t border-white/5 pt-6 mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
            Les 12 groupes
          </p>
          <div className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <Link
                key={g}
                href={`/groupe/${g.toLowerCase()}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/8 text-sm font-bold hover:bg-primary/20 hover:border-primary/30 hover:text-white transition-all"
              >
                {g}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/5 pt-6 mb-6">
          <Newsletter locale="fr" />
        </div>

        {/* Legal bottom */}
        <div className="border-t border-white/5 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { href: "/mentions-legales", label: "Mentions légales" },
                { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
                { href: "/jeu-responsable", label: "Jeu responsable" },
                { href: "/methodologie", label: "Méthodologie" },
                { href: "/a-propos", label: "À propos" },
                { href: "/contact", label: "Contact" },
                { href: "/faq", label: "FAQ" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-gray-300 transition-colors py-1 inline-block">
                  {item.label}
                </Link>
              ))}
            </div>
            <p>&copy; 2026 CDM 2026. Site non affilié à la FIFA.</p>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
