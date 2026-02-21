import type { Metadata } from "next";
import Link from "next/link";
import { getStaticAlternates } from "@repo/data/route-mapping";
import { ANJBanner } from "@repo/ui/anj-banner";
import { Globe, Timer } from "lucide-react"
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
  "Vous tentez de « vous refaire  en augmentant les mises après une perte",
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
<section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Prévention & aide</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Jeu responsable</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Les paris sportifs doivent rester un divertissement. Jouez de
            manière responsable.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* Bannière d'alerte */}
          <ANJBanner />

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
                  <h3 className="text-lg font-semibold text-gray-900">{conseil.title}</h3>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16.5h10"/></svg> Auto-évaluation rapide
            </h2>
            <p className="mb-3">
              Si vous répondez « oui  à <strong>2 questions ou plus</strong>{" "}
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
                  <h3 className="text-lg font-semibold text-gray-900">{r.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {r.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    {r.phone && (
                      <a
                        href={`tel:${r.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                      >
                        <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg> {r.phone}
                      </a>
                    )}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                    >
                      <Globe className="h-5 w-5 inline-block" /> {r.url.replace("https://www.", "")}
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
                <h3 className="text-lg font-semibold text-gray-900"> Limites de dépôts</h3>
                <p className="mt-1 text-sm">
                  Fixez un plafond journalier, hebdomadaire ou mensuel de
                  dépôts sur votre compte.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-lg font-semibold text-gray-900"><Timer className="h-5 w-5 inline-block" />Limites de temps</h3>
                <p className="mt-1 text-sm">
                  Définissez un temps maximum de connexion pour éviter les
                  sessions prolongées.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-lg font-semibold text-gray-900">Auto-exclusion temporaire</h3>
                <p className="mt-1 text-sm">
                  Bloquez votre compte pendant une période choisie (24h, 1
                  semaine, 1 mois…).
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-lg font-semibold text-gray-900"><svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Interdiction volontaire de jeu</h3>
                <p className="mt-1 text-sm">
                  Inscrivez-vous au fichier national des interdits de jeux pour
                  une durée de 3 ans (renouvelable). Demande sur{" "}
                  <a
                    href="https://www.anj.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    anj.fr
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-primary/5 border border-primary/20 p-4">
              <h3 className="text-lg font-semibold text-gray-900">
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
          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
            <p className="text-lg font-bold text-gray-900">
              Les jeux d&apos;argent sont interdits aux mineurs.
            </p>
            <p className="mt-2 font-semibold">
              Jouer comporte des risques : endettement, isolement, dépendance.
            </p>
            <p className="mt-3 text-xl font-bold text-primary">
              <a href="tel:0974751313" className="hover:underline">
                <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg> 09 74 75 13 13
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
