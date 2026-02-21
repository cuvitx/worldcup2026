import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Shield, AlertTriangle, Phone, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Sécurité Coupe du Monde 2026 - Conseils par ville | CDM 2026",
  description:
    "Conseils sécurité pour la CDM 2026 : recommandations par ville, focus Mexique, quartiers à éviter, numéros d'urgence et assurance voyage.",
  openGraph: {
    title: "Sécurité CDM 2026 - Guide par ville",
    description: "Conseils sécurité pour voyager pendant la Coupe du Monde 2026.",
    url: "https://www.cdm2026.fr/securite",
  },
  alternates: { canonical: "https://www.cdm2026.fr/securite" },
};

const urgences = [
  { pays: "🇺🇸 États-Unis", police: "911", ambassade: "+1 202-944-6000", notes: "Numéro unique urgences" },
  { pays: "🇨🇦 Canada", police: "911", ambassade: "+1 613-789-1795", notes: "Numéro unique urgences" },
  { pays: "🇲🇽 Mexique", police: "911", ambassade: "+52 55 9171 9700", notes: "911 depuis 2017" },
];

const faqItems = [
  {
    question: "Le Mexique est-il dangereux pour la CDM 2026 ?",
    answer: "Les villes hôtes (Mexico, Guadalajara, Monterrey) sont des grandes métropoles avec des zones touristiques sûres. Comme dans toute grande ville, restez vigilant, évitez les quartiers isolés la nuit et utilisez des taxis officiels ou Uber. Le dispositif de sécurité sera renforcé pour le tournoi.",
  },
  {
    question: "Faut-il prendre une assurance voyage ?",
    answer: "Oui, fortement recommandé. Les frais médicaux aux États-Unis sont très élevés (une simple consultation peut coûter 200-500$). Souscrivez une assurance couvrant les frais médicaux (minimum 150 000€), le rapatriement et l'annulation de voyage. Vérifiez si votre carte bancaire inclut une couverture.",
  },
  {
    question: "Quels vaccins sont nécessaires ?",
    answer: "Aucun vaccin n'est obligatoire pour les États-Unis, le Canada ou le Mexique. Les vaccins habituels (DTP, hépatite A/B) sont recommandés. Pour le Mexique, la vaccination contre l'hépatite A est conseillée si vous n'êtes pas déjà vacciné.",
  },
  {
    question: "Comment se déplacer en sécurité la nuit ?",
    answer: "Utilisez Uber/Lyft plutôt que de marcher seul la nuit. Évitez les quartiers isolés. Dans les grandes villes US, les transports en commun sont sûrs jusqu'en début de soirée. Au Mexique, utilisez exclusivement Uber ou des taxis de sitio (officiels).",
  },
];

export default function SecuritePage() {
  return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Guide pratique
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-accent">Sécurité</span> CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Conseils de sécurité par ville hôte, numéros d&apos;urgence
            et recommandations pour un voyage serein.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        {/* Conseils généraux */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">Conseils généraux</h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-3 text-gray-700 text-sm leading-relaxed">
            <ul className="space-y-2">
              <li>Gardez une copie numérique de votre passeport (photo + cloud)</li>
              <li>Ne transportez pas de grosses sommes en liquide — privilégiez la carte bancaire</li>
              <li>Restez dans les zones touristiques et bien éclairées la nuit</li>
              <li>Utilisez un VPN sur les Wi-Fi publics des stades et fan zones</li>
              <li>Hydratez-vous : les matchs en juin-juillet aux USA/Mexique se jouent par forte chaleur</li>
              <li>Enregistrez-vous sur Ariane (service du ministère des Affaires étrangères) avant votre départ</li>
            </ul>
          </div>
        </section>

        {/* Focus Mexique */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            <h2 className="text-2xl font-bold text-gray-900">Focus Mexique</h2>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 space-y-3 text-sm">
            <p className="text-amber-900">
              Les 3 villes hôtes mexicaines (Mexico, Guadalajara, Monterrey) sont des métropoles
              modernes avec des infrastructures touristiques développées. Cependant, certaines
              précautions supplémentaires s&apos;imposent :
            </p>
            <ul className="space-y-2 text-amber-800">
              <li><strong>Mexico :</strong> Évitez Tepito, Doctores et Lagunilla la nuit. Restez dans Roma, Condesa, Polanco, Centro Histórico (zone touristique).</li>
              <li><strong>Guadalajara :</strong> Le centre historique et Chapultepec sont sûrs. Évitez les banlieues éloignées.</li>
              <li><strong>Monterrey :</strong> Le quartier San Pedro Garza García est le plus sûr. Le centre-ville est correct en journée.</li>
              <li>Utilisez exclusivement Uber ou taxis de sitio (officiels avec licence visible)</li>
              <li>Ne portez pas de bijoux voyants ni de maillots d&apos;équipes rivales hors du stade</li>
              <li>L&apos;eau du robinet n&apos;est pas potable — buvez de l&apos;eau en bouteille</li>
            </ul>
          </div>
        </section>

        {/* Numéros d'urgence */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Phone className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">Numéros d&apos;urgence</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Pays</th>
                  <th className="px-4 py-3 text-left">Urgences</th>
                  <th className="px-4 py-3 text-left">Ambassade de France</th>
                  <th className="px-4 py-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {urgences.map((u) => (
                  <tr key={u.pays} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{u.pays}</td>
                    <td className="px-4 py-3 font-bold text-red-600">{u.police}</td>
                    <td className="px-4 py-3 text-gray-600">{u.ambassade}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{u.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Assurance */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">Assurance voyage</h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              <strong>Indispensable pour les États-Unis.</strong> Les frais médicaux américains
              sont parmi les plus élevés au monde : une nuit d&apos;hospitalisation peut coûter
              5 000 à 20 000$. Une simple consultation aux urgences revient à 500-2 000$.
            </p>
            <p>Votre assurance voyage doit couvrir au minimum :</p>
            <ul className="space-y-1 ml-4">
              <li>Frais médicaux : 150 000€ minimum (300 000€ recommandé)</li>
              <li>Rapatriement sanitaire</li>
              <li>Responsabilité civile à l&apos;étranger</li>
              <li>Annulation / interruption de voyage</li>
              <li>Perte / vol de bagages</li>
            </ul>
            <p>
              Comparez les offres sur{" "}
              <a
                href="https://www.chapkadirect.fr"
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="text-primary underline hover:text-accent"
              >
                Chapka
              </a>
              ,{" "}
              <a
                href="https://www.allianz-voyage.fr"
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="text-primary underline hover:text-accent"
              >
                Allianz Travel
              </a>{" "}
              ou{" "}
              <a
                href="https://www.axa-assistance.fr"
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="text-primary underline hover:text-accent"
              >
                AXA Assistance
              </a>
              .
            </p>
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/budget"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Voir le guide budget
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
