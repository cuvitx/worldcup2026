import Link from "next/link";
import { Newsletter } from "@repo/ui/newsletter";

const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const columns = [
  {
    title: "Tournoi",
    links: [
      { href: "/match/calendrier", label: "Calendrier des matchs" },
      { href: "/groupes", label: "Les 12 groupes" },
      { href: "/equipes", label: "48 équipes" },
      { href: "/equipe-de-france", label: "🇫🇷 Équipe de France" },
      { href: "/stades", label: "Stades" },
      { href: "/carte-stades", label: "Carte des stades" },
      { href: "/villes", label: "Villes hôtes" },
      { href: "/palmares", label: "Palmarès CDM" },
      { href: "/billets", label: "🎟️ Billets" },
      { href: "/live", label: "⚡ Live scores" },
    ],
  },
  {
    title: "Pronostics",
    links: [
      { href: "/pronostic-vainqueur", label: "🏆 Pronostic vainqueur" },
      { href: "/pronostic/france", label: "Pronostic France" },
      { href: "/pronostic/bresil", label: "Pronostic Brésil" },
      { href: "/pronostic/argentine", label: "Pronostic Argentine" },
      { href: "/pronostic/espagne", label: "Pronostic Espagne" },
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
      { href: "/recherche", label: "🔍 Recherche" },
      { href: "/quiz", label: "🧩 Quiz CDM" },
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
    <footer className="bg-primary text-gray-400 dark:bg-slate-900">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6">

        {/* Brand + social row */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

          {/* Logo + description */}
          <div className="max-w-xs">
            <Link href="/" className="inline-block mb-3">
              <span className="text-xl font-extrabold">
                <span className="text-gold">⚽ CDM</span>{" "}
                <span className="text-white">2026</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Guide complet de la Coupe du Monde 2026. Pronostics, cotes,
              analyses et outils pour tous les fans de football.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/mondial2026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/15 hover:text-white transition-all"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/mondial2026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/15 hover:text-white transition-all"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://instagram.com/mondial2026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/15 hover:text-white transition-all"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@mondial2026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/15 hover:text-white transition-all"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bookmaker partners */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">
              Partenaires agréés ANJ
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {["Betclic", "Winamax", "Unibet", "PMU"].map((bk) => (
                <span
                  key={bk}
                  className="inline-block rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-gray-400 hover:text-white hover:border-white/20 transition-colors"
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
              <h3 className="mb-4 text-xs font-bold text-white uppercase tracking-widest">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">
            Les 12 groupes
          </p>
          <div className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <Link
                key={g}
                href={`/groupe/${g.toLowerCase()}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/8 text-sm font-bold hover:bg-accent/20 hover:border-accent/40 hover:text-white transition-all"
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
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
            <div className="flex flex-wrap gap-4">
              {[
                { href: "/mentions-legales", label: "Mentions légales" },
                { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
                { href: "/jeu-responsable", label: "Jeu responsable" },
                { href: "/methodologie", label: "Méthodologie" },
                { href: "/a-propos", label: "À propos" },
                { href: "/contact", label: "Contact" },
                { href: "/faq", label: "FAQ" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-gray-400 transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
            <p>&copy; 2026 CDM 2026. Site non affilié à la FIFA.</p>
          </div>
          <p className="mt-3 text-xs text-gray-700 leading-relaxed">
            Les jeux d&apos;argent sont interdits aux mineurs. Jouer comporte des risques : endettement, dépendance.
            Appelez le{" "}
            <a href="tel:0974751313" className="text-gray-500 hover:text-gray-400 transition-colors">
              09 74 75 13 13
            </a>{" "}
            (appel non surtaxé).
          </p>
        </div>
      </div>
    </footer>
  );
}
