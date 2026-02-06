import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jeu responsable - Paris sportifs",
  description:
    "Informations sur le jeu responsable et les paris sportifs. Conseils pour parier de maniere responsable pendant la Coupe du Monde 2026.",
};

export default function JeuResponsablePage() {
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
            <li className="text-gray-900 font-medium">Jeu responsable</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-extrabold">Jeu responsable</h1>
          <p className="mt-4 text-lg text-gray-300">
            Les paris sportifs doivent rester un divertissement. Jouez de
            maniere responsable.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div className="rounded-lg border-2 border-accent/30 bg-accent/5 p-6">
            <p className="text-lg font-bold text-accent">
              Les jeux d&apos;argent et de hasard peuvent etre dangereux : pertes
              d&apos;argent, conflits familiaux, addiction... Retrouvez nos
              conseils sur joueurs-info-service.fr (09 74 75 13 13 - appel non
              surtaxe).
            </p>
          </div>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Nos engagements
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Nous ne ciblons pas les mineurs. Les paris sportifs sont
                interdits aux personnes de moins de 18 ans.
              </li>
              <li>
                Nos pronostics sont fournis a titre informatif et ne garantissent
                aucun gain.
              </li>
              <li>
                Nous ne recommandons que des operateurs agrees par l&apos;Autorite
                Nationale des Jeux (ANJ) en France.
              </li>
              <li>
                Nous encourageons une pratique moderee et responsable des paris
                sportifs.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Conseils pour parier responsablement
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Fixez un budget",
                  text: "Determinez a l'avance le montant que vous etes pret a perdre. Ne depassez jamais ce budget.",
                },
                {
                  title: "Ne courez pas apres vos pertes",
                  text: "Si vous perdez, ne cherchez pas a recuperer vos pertes en pariant davantage.",
                },
                {
                  title: "Fixez des limites de temps",
                  text: "Les paris ne doivent pas empieter sur votre vie quotidienne, votre travail ou vos relations.",
                },
                {
                  title: "Ne pariez pas sous influence",
                  text: "Ne pariez pas sous l'effet de l'alcool, de medicaments ou en situation de stress emotionnel.",
                },
                {
                  title: "Restez informe",
                  text: "Comprenez les cotes et les probabilites. Un pronostic n'est jamais une certitude.",
                },
                {
                  title: "Demandez de l'aide",
                  text: "Si vous sentez que vous perdez le controle, n'hesitez pas a demander de l'aide.",
                },
              ].map((conseil) => (
                <div
                  key={conseil.title}
                  className="rounded-lg bg-gray-50 p-4"
                >
                  <h3 className="font-bold text-gray-900">{conseil.title}</h3>
                  <p className="mt-1 text-sm">{conseil.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Signes d&apos;une pratique problematique
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Vous pariez plus que ce que vous pouvez vous permettre de perdre</li>
              <li>Vous empruntez de l&apos;argent pour parier</li>
              <li>Vous mentez a vos proches sur vos habitudes de jeu</li>
              <li>Vous pariez pour echapper a des problemes personnels</li>
              <li>Vous devenez anxieux ou irritable quand vous ne pariez pas</li>
              <li>Vous negligez votre travail ou vos relations a cause des paris</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Ressources d&apos;aide
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">
                  Joueurs Info Service
                </h3>
                <p className="text-sm">
                  09 74 75 13 13 (appel non surtaxe, 7j/7 de 8h a 2h)
                </p>
                <p className="text-sm text-gray-500">joueurs-info-service.fr</p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">
                  SOS Joueurs
                </h3>
                <p className="text-sm">09 69 39 55 12</p>
                <p className="text-sm text-gray-500">sosjoueurs.org</p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">
                  Autorite Nationale des Jeux (ANJ)
                </h3>
                <p className="text-sm">
                  Regulateur des jeux d&apos;argent en ligne en France
                </p>
                <p className="text-sm text-gray-500">anj.fr</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Outils d&apos;auto-exclusion
            </h2>
            <p>
              Tous les operateurs agrees par l&apos;ANJ proposent des outils
              d&apos;auto-limitation et d&apos;auto-exclusion :
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Limitation des depots et des mises</li>
              <li>Limitation du temps de jeu</li>
              <li>Auto-exclusion temporaire ou definitive</li>
              <li>
                Interdiction volontaire de jeu (fichier national des interdits
                de jeu)
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
