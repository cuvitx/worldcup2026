import Link from "next/link";
import { Newsletter } from "@repo/ui/newsletter";

export function Footer() {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Équipes favorites */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Équipes</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/equipe/france" className="hover:text-white">France</Link></li>
              <li><Link href="/equipe/bresil" className="hover:text-white">Brésil</Link></li>
              <li><Link href="/equipe/argentine" className="hover:text-white">Argentine</Link></li>
              <li><Link href="/equipe/espagne" className="hover:text-white">Espagne</Link></li>
              <li><Link href="/equipe/allemagne" className="hover:text-white">Allemagne</Link></li>
              <li><Link href="/equipe/angleterre" className="hover:text-white">Angleterre</Link></li>
              <li><Link href="/equipe/portugal" className="hover:text-white">Portugal</Link></li>
              <li><Link href="/equipe/pays-bas" className="hover:text-white">Pays-Bas</Link></li>
              <li className="pt-1">
                <Link href="/equipes" className="text-gold hover:text-white font-medium">
                  Toutes les équipes &rarr;
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
              <li><Link href="/pronostic/bresil" className="hover:text-white">Pronostic Brésil</Link></li>
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

          {/* Paris & Guides */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase">Paris & Guides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/paris-sportifs" className="hover:text-white">Paris sportifs CDM 2026</Link></li>
              <li><Link href="/buteurs" className="hover:text-white">Cotes buteurs</Link></li>
              <li><Link href="/bookmaker/betclic" className="hover:text-white">Avis Betclic</Link></li>
              <li><Link href="/bookmaker/winamax" className="hover:text-white">Avis Winamax</Link></li>
              <li><Link href="/guide/comment-parier-cdm-2026" className="hover:text-white">Guide parier CDM</Link></li>
              <li className="pt-1">
                <Link href="/guides" className="text-gold hover:text-white font-medium">
                  Tous les guides &rarr;
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
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8">
          <Newsletter locale="fr" />
        </div>
        {/* Social links */}
        <div className="flex items-center justify-center gap-6 border-t border-white/10 pt-8">
          <a href="https://twitter.com/mondial2026" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 transition-colors hover:text-white">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a href="https://facebook.com/mondial2026" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 transition-colors hover:text-white">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
          </a>
          <a href="https://instagram.com/mondial2026" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 transition-colors hover:text-white">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
          </a>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-xs text-gray-400">
          <p>
            Les jeux d&apos;argent sont interdits aux mineurs. Jouer comporte des risques : endettement, dependance.
            Appelez le 09 74 75 13 13 (appel non surtaxe).
          </p>
          <p className="mt-4">&copy; 2026 CDM 2026. Tous droits réservés. Site non affiliéà la FIFA.</p>
        </div>
      </div>
    </footer>
  );
}
