import type { Metadata } from "next";
import Link from "next/link";
import { domains, getStaticAlternates } from "@repo/data/route-mapping";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Jeu responsable — Paris sportifs et prévention",
  description:
    "Informations sur le jeu responsable : signes de jeu problématique, numéros d'aide (09 74 75 13 13), ressources ANJ et SOS Joueurs, outils d'auto-exclusion.",
  alternates: getStaticAlternates("responsibleGambling", "fr"),
};

const signesProblematiques = [
  "Vous pariez plus que ce que vous pouvez vous permettre de perdre",
  "Vous empruntez de l'argent pour parier ou rembourser des dettes de jeu",
  "Vous mentez à vos proches sur vos habitudes de jeu ou le montant de vos pertes",
  "Vous pariez pour échapper à des problèmes personnels, au stress ou à l'ennui",
  "Vous devenez anxieux, irritable ou agité quand vous ne pouvez pas parier",
  "Vous négligez votre travail, vos études ou vos relations à cause des paris",
  "Vous tentez de « vous refaire » en augmentant les mises après une perte",
  "Vous ressentez un besoin croissant de parier des sommes plus importantes",
  "Vous avez déjà tenté d'arrêter ou de réduire sans y parvenir",
];

const conseils = [
  {
    title: "Fixez un budget strict",
    text: "Déterminez à l'avance le montant maximum que vous êtes prêt à perdre. Ne dépassez jamais cette limite, même en cas de série de gains.",
  },
  {
    title: "Ne courez pas après vos pertes",
    text: "Si vous perdez, acceptez la perte. Chercher à récupérer en pariant davantage mène à un cercle vicieux.",
  },
  {
    title: "Fixez des limites de temps",
    text: "Les paris ne doivent pas empiéter sur votre vie quotidienne. Définissez un temps maximum de jeu par semaine.",
  },
  {
    title: "Ne pariez pas sous influence",
    text: "Évitez de parier sous l'effet de l'alcool, de médicaments ou en situation de stress émotionnel intense.",
  },
  {
    title: "Comprenez les probabilités",
    text: "Les cotes reflètent une probabilité. Un pronostic n'est jamais une certitude. Sur le long terme, le bookmaker est toujours avantagé.",
  },
  {
    title: "Demandez de l'aide",
    text: "Si vous sentez que vous perdez le contrôle, parlez-en à un proche ou contactez un service d'aide spécialisé.",
  },
];

const ressources = [
  {
    name: "Joueurs Info Service",
    phone: "09 74 75 13 13",
    hours: "Appel non surtaxé, 7j/7 de 8h à 2h",
    url: "https://www.joueurs-info-service.fr",
    description:
      "Service national d'aide et d'information pour les joueurs et leur entourage. Écoute, conseil et orientation gratuits.",
  },
  {
    name: "SOS Joueurs",
    phone: "09 69 39 55 12",
    url: "https://www.sosjoueurs.org",
    description:
      "Association d'aide aux joueurs en difficulté. Accompagnement personnalisé, groupes de parole et suivi thérapeutique.",
  },
  {
    name: "Autorité Nationale des Jeux (ANJ)",
    url: "https://www.anj.fr",
    description:
      "Régulateur des jeux d'argent en ligne en France. Vérifie que les opérateurs respectent la réglementation et protège les joueurs.",
  },
  {
    name: "ADICTEL",
    phone: "02 40 84 76 20",
    url: "https://www.adictel.com",
    description:
      "Association spécialisée dans la prévention et le traitement des addictions aux jeux d'argent et de hasard.",
  },
];

export default function JeuResponsablePage() {
  return (
    <>
      <BreadcrumbSchema
        baseUrl={domains.fr}
        items={[
          { name: "Accueil", url: "/" },
          { name: "Jeu responsable", url: "/jeu-responsable" },
        ]}
      />

      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900">Jeu responsable</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary py-12 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Jeu responsable</h1>
          <p className="mt-4 text-lg text-gray-300">
            Les paris sportifs doivent rester un divertissement. Jouez de
            manière responsable.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* Bannière d'alerte */}
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-6">
            <p className="text-lg font-bold text-red-800">
              ⚠️ Les jeux d&apos;argent et de hasard peuvent être dangereux :
              pertes d&apos;argent, conflits familiaux, addiction…
            </p>
            <p className="mt-3 text-lg font-semibold text-red-700">
              Appelez le{" "}
              <a
                href="tel:0974751313"
                className="underline decoration-2"
              >
                09 74 75 13 13
              </a>{" "}
              (Joueurs Info Service — appel non surtaxé, 7j/7).
            </p>
          </div>

          {/* Nos engagements */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Nos engagements
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Nous ne ciblons pas les mineurs. Les paris sportifs sont{" "}
                <strong>interdits aux personnes de moins de 18 ans</strong>.
              </li>
              <li>
                Nos pronostics sont fournis à titre informatif et{" "}
                <strong>ne garantissent aucun gain</strong>.
              </li>
              <li>
                Nous ne recommandons que des opérateurs{" "}
                <strong>agréés par l&apos;ANJ</strong> en France.
              </li>
              <li>
                Nous encourageons une pratique modérée et responsable des paris
                sportifs.
              </li>
              <li>
                Nous affichons systématiquement les messages de prévention
                réglementaires.
              </li>
            </ul>
          </section>

          {/* Conseils */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Conseils pour parier responsablement
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {conseils.map((conseil) => (
                <div
                  key={conseil.title}
                  className="rounded-lg bg-gray-50 p-5"
                >
                  <h3 className="font-bold text-gray-900">{conseil.title}</h3>
                  <p className="mt-2 text-sm">{conseil.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Signes problématiques */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Signes d&apos;une pratique problématique
            </h2>
            <p className="mb-4">
              Si vous vous reconnaissez dans un ou plusieurs des signes
              suivants, il est important de demander de l&apos;aide :
            </p>
            <ul className="space-y-2">
              {signesProblematiques.map((signe) => (
                <li key={signe} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs text-red-600">
                    !
                  </span>
                  <span>{signe}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Test rapide */}
          <section className="rounded-xl bg-gray-50 p-6">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              🧪 Auto-évaluation rapide
            </h2>
            <p className="mb-3">
              Si vous répondez « oui » à <strong>2 questions ou plus</strong>{" "}
              ci-dessous, il est conseillé de consulter un professionnel :
            </p>
            <ol className="list-decimal space-y-2 pl-6 text-sm">
              <li>
                Avez-vous déjà parié plus que ce que vous pouviez vous permettre
                de perdre ?
              </li>
              <li>
                Avez-vous besoin de parier des sommes de plus en plus
                importantes pour ressentir de l&apos;excitation ?
              </li>
              <li>
                Avez-vous déjà essayé de réduire ou d&apos;arrêter de parier
                sans succès ?
              </li>
              <li>
                Vos paris ont-ils causé des problèmes dans vos relations ou
                votre travail ?
              </li>
            </ol>
          </section>

          {/* Ressources d'aide */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Ressources d&apos;aide
            </h2>
            <div className="space-y-4">
              {ressources.map((r) => (
                <div
                  key={r.name}
                  className="rounded-lg border border-gray-200 bg-white p-5"
                >
                  <h3 className="text-lg font-bold text-gray-900">{r.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {r.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    {r.phone && (
                      <a
                        href={`tel:${r.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                      >
                        📞 {r.phone}
                      </a>
                    )}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      🌐 {r.url.replace("https://www.", "")}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Outils d'auto-exclusion */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Outils d&apos;auto-exclusion
            </h2>
            <p className="mb-4">
              Tous les opérateurs agréés par l&apos;ANJ proposent des outils
              pour vous aider à garder le contrôle :
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-bold text-gray-900">💰 Limites de dépôts</h3>
                <p className="mt-1 text-sm">
                  Fixez un plafond journalier, hebdomadaire ou mensuel de
                  dépôts sur votre compte.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-bold text-gray-900">⏱️ Limites de temps</h3>
                <p className="mt-1 text-sm">
                  Définissez un temps maximum de connexion pour éviter les
                  sessions prolongées.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-bold text-gray-900">🚫 Auto-exclusion temporaire</h3>
                <p className="mt-1 text-sm">
                  Bloquez votre compte pendant une période choisie (24h, 1
                  semaine, 1 mois…).
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-bold text-gray-900">🔒 Interdiction volontaire de jeu</h3>
                <p className="mt-1 text-sm">
                  Inscrivez-vous au fichier national des interdits de jeux pour
                  une durée de 3 ans (renouvelable). Demande sur{" "}
                  <a
                    href="https://www.anj.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    anj.fr
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
              <h3 className="font-bold text-gray-900">
                Outils chez les principaux bookmakers
              </h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <strong>Betclic :</strong> Limites de mises, auto-exclusion,
                  réalité augmentée des pertes (Espace Jeu Responsable)
                </li>
                <li>
                  <strong>Winamax :</strong> Limites de dépôts, auto-exclusion
                  temporaire et définitive, historique de jeu détaillé
                </li>
                <li>
                  <strong>Unibet :</strong> Limites personnalisables, test
                  d&apos;auto-évaluation, suspension de compte
                </li>
                <li>
                  <strong>ParionsSport :</strong> Plafonds de mises, alertes de
                  jeu, auto-exclusion via l&apos;espace client
                </li>
              </ul>
            </div>
          </section>

          {/* Rappel final */}
          <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-6 text-center">
            <p className="text-lg font-bold text-gray-900">
              Les jeux d&apos;argent sont interdits aux mineurs.
            </p>
            <p className="mt-2 font-semibold">
              Jouer comporte des risques : endettement, isolement, dépendance.
            </p>
            <p className="mt-3 text-xl font-bold text-primary">
              <a href="tel:0974751313" className="hover:underline">
                📞 09 74 75 13 13
              </a>
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Joueurs Info Service — appel non surtaxé, 7j/7 de 8h à 2h
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
