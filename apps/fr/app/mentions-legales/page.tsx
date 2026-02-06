import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions legales",
  description:
    "Mentions legales du site CDM 2026. Informations sur l'editeur, l'hebergement et les conditions d'utilisation.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Mentions legales</li>
          </ol>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-extrabold">Mentions legales</h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Editeur du site</h2>
            <p>
              Ce site est edite a titre personnel dans le cadre d&apos;un projet
              d&apos;information sportive. Le contenu est fourni a titre informatif
              uniquement.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Hebergement</h2>
            <p>
              Ce site est heberge par Vercel Inc., 440 N Barranca Ave #4133,
              Covina, CA 91723, Etats-Unis.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Propriete intellectuelle
            </h2>
            <p>
              Ce site n&apos;est pas affilie a la FIFA ni a aucune organisation
              officielle de la Coupe du Monde. Les noms d&apos;equipes, logos et
              marques mentionnes appartiennent a leurs proprietaires respectifs.
            </p>
            <p className="mt-2">
              Les donnees statistiques sont compilees a partir de sources
              publiques a des fins d&apos;information et d&apos;analyse.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Liens d&apos;affiliation
            </h2>
            <p>
              Ce site peut contenir des liens d&apos;affiliation vers des
              operateurs de paris sportifs agrees. Nous pouvons percevoir une
              commission si vous vous inscrivez via ces liens. Cela n&apos;affecte
              pas le cout pour vous et n&apos;influence pas nos analyses ou
              pronostics.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Protection des donnees
            </h2>
            <p>
              Ce site ne collecte aucune donnee personnelle directement. Des
              cookies tiers peuvent etre utilises par nos partenaires publicitaires
              et d&apos;analyse. Vous pouvez configurer votre navigateur pour
              refuser les cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Limitation de responsabilite
            </h2>
            <p>
              Les pronostics et analyses presentes sur ce site sont fournis a
              titre informatif uniquement et ne constituent en aucun cas des
              conseils de paris. Les paris sportifs comportent des risques de
              pertes financieres. Voir notre page{" "}
              <Link
                href="/jeu-responsable"
                className="text-accent hover:underline"
              >
                Jeu responsable
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Contact</h2>
            <p>
              Pour toute question concernant ce site, vous pouvez nous contacter
              par email a l&apos;adresse indiquee dans la page{" "}
              <Link href="/a-propos" className="text-accent hover:underline">
                A propos
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
