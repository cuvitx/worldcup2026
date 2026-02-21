import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { ANJBanner } from "@repo/ui/anj-banner";
import { CreditCard, Smartphone, Banknote, ArrowRight, CheckCircle, X, Clock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Méthodes de Paiement Paris Sportifs CDM 2026 | Dépôt & Retrait",
  description:
    "Comparatif des méthodes de dépôt et retrait sur les bookmakers CDM 2026 : carte bancaire, PayPal, Apple Pay, Skrill, Neteller, virement. Tableau par bookmaker.",
  openGraph: {
    title: "Méthodes de Paiement Paris Sportifs CDM 2026",
    description: "Comparatif complet des méthodes de dépôt et retrait : CB, PayPal, Apple Pay, Skrill, Neteller, virement.",
    url: "https://cdm2026.fr/methodes-paiement",
  },
  alternates: { canonical: "https://cdm2026.fr/methodes-paiement" },
};

interface MethodePaiement {
  nom: string;
  icon: typeof CreditCard;
  depotMin: string;
  depotMax: string;
  delaiDepot: string;
  delaiRetrait: string;
  frais: string;
  avantages: string[];
  inconvenients: string[];
}

const methodes: MethodePaiement[] = [
  {
    nom: "Carte bancaire (Visa/Mastercard)",
    icon: CreditCard,
    depotMin: "10€",
    depotMax: "10 000€",
    delaiDepot: "Instantané",
    delaiRetrait: "1 à 3 jours ouvrés",
    frais: "Gratuit",
    avantages: ["Méthode la plus répandue", "Dépôt instantané", "Acceptée partout"],
    inconvenients: ["Retrait plus lent", "Relevé bancaire visible"],
  },
  {
    nom: "PayPal",
    icon: Smartphone,
    depotMin: "10€",
    depotMax: "5 000€",
    delaiDepot: "Instantané",
    delaiRetrait: "Quelques heures à 24h",
    frais: "Gratuit",
    avantages: ["Retrait rapide", "Sécurité renforcée", "Pas de données bancaires partagées"],
    inconvenients: ["Non disponible partout", "Limites de compte PayPal"],
  },
  {
    nom: "Apple Pay",
    icon: Smartphone,
    depotMin: "10€",
    depotMax: "5 000€",
    delaiDepot: "Instantané",
    delaiRetrait: "Non disponible",
    frais: "Gratuit",
    avantages: ["Ultra rapide (Face ID)", "Très sécurisé", "Pas de saisie de numéro"],
    inconvenients: ["Uniquement pour dépôts", "Réservé aux appareils Apple"],
  },
  {
    nom: "Skrill",
    icon: Banknote,
    depotMin: "10€",
    depotMax: "10 000€",
    delaiDepot: "Instantané",
    delaiRetrait: "Quelques heures à 24h",
    frais: "Gratuit sur bookmakers",
    avantages: ["Retrait très rapide", "Anonymat relatif", "Programme VIP"],
    inconvenients: ["Frais internes Skrill", "Moins connu du grand public"],
  },
  {
    nom: "Neteller",
    icon: Banknote,
    depotMin: "10€",
    depotMax: "10 000€",
    delaiDepot: "Instantané",
    delaiRetrait: "Quelques heures à 24h",
    frais: "Gratuit sur bookmakers",
    avantages: ["Retrait rapide", "Spécialisé paris en ligne", "Carte prépayée disponible"],
    inconvenients: ["Frais de conversion devises", "Vérification d'identité stricte"],
  },
  {
    nom: "Virement bancaire",
    icon: Banknote,
    depotMin: "20€",
    depotMax: "50 000€",
    delaiDepot: "1 à 3 jours ouvrés",
    delaiRetrait: "2 à 5 jours ouvrés",
    frais: "Gratuit",
    avantages: ["Plafonds élevés", "Très sécurisé", "Aucun intermédiaire"],
    inconvenients: ["Le plus lent", "Minimum de dépôt plus élevé"],
  },
];

interface BookmakerPaiement {
  nom: string;
  cb: boolean;
  paypal: boolean;
  applePay: boolean;
  skrill: boolean;
  neteller: boolean;
  virement: boolean;
}

const bookmakersPaiement: BookmakerPaiement[] = [
  { nom: "Winamax", cb: true, paypal: false, applePay: true, skrill: true, neteller: true, virement: true },
  { nom: "Betclic", cb: true, paypal: true, applePay: true, skrill: true, neteller: true, virement: true },
  { nom: "Unibet", cb: true, paypal: true, applePay: false, skrill: true, neteller: true, virement: true },
  { nom: "ParionsSport", cb: true, paypal: true, applePay: false, skrill: false, neteller: false, virement: true },
  { nom: "Bwin", cb: true, paypal: true, applePay: false, skrill: true, neteller: true, virement: true },
];

function BoolIcon({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle className="w-4 h-4 text-accent mx-auto" />
  ) : (
    <X className="w-4 h-4 text-gray-300  mx-auto" />
  );
}

export default function MethodesPaiementPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Paris sportifs", href: "/paris-sportifs" },
          { label: "Méthodes de paiement" },
        ]}
      />

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary">
            Méthodes de Paiement
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Comparatif complet des méthodes de dépôt et retrait sur les bookmakers pour la Coupe du Monde 2026. CB, PayPal, Apple Pay, Skrill, Neteller et virement.
          </p>
        </div>
      </section>

      <ANJBanner />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Intro */}
        <section className="prose  max-w-none mb-12">
          <p className="text-lg text-gray-700  leading-relaxed">
            Le choix de votre méthode de paiement influence directement votre expérience de paris sportifs : rapidité des dépôts, délais de retrait, sécurité et frais éventuels. Nous avons comparé les 6 principales méthodes de paiement acceptées par les bookmakers agréés en France pour vous aider à choisir la solution la plus adaptée à vos besoins pendant la CDM 2026.
          </p>
        </section>

        {/* Tableau par bookmaker */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-secondary" />
            Disponibilité par bookmaker
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 ">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Bookmaker</th>
                  <th className="px-4 py-3 text-center font-semibold">CB</th>
                  <th className="px-4 py-3 text-center font-semibold">PayPal</th>
                  <th className="px-4 py-3 text-center font-semibold">Apple Pay</th>
                  <th className="px-4 py-3 text-center font-semibold">Skrill</th>
                  <th className="px-4 py-3 text-center font-semibold">Neteller</th>
                  <th className="px-4 py-3 text-center font-semibold">Virement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200  bg-white ">
                {bookmakersPaiement.map((bk) => (
                  <tr key={bk.nom}>
                    <td className="px-4 py-3 font-bold text-gray-900 ">{bk.nom}</td>
                    <td className="px-4 py-3"><BoolIcon value={bk.cb} /></td>
                    <td className="px-4 py-3"><BoolIcon value={bk.paypal} /></td>
                    <td className="px-4 py-3"><BoolIcon value={bk.applePay} /></td>
                    <td className="px-4 py-3"><BoolIcon value={bk.skrill} /></td>
                    <td className="px-4 py-3"><BoolIcon value={bk.neteller} /></td>
                    <td className="px-4 py-3"><BoolIcon value={bk.virement} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Détail des méthodes */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-secondary" />
            Détail des méthodes de paiement
          </h2>
          <div className="space-y-4">
            {methodes.map((m) => (
              <div key={m.nom} className="rounded-2xl border border-gray-200  bg-white  p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <m.icon className="w-6 h-6 text-accent" />
                  <h3 className="text-lg font-bold text-gray-900 ">{m.nom}</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4 text-xs">
                  <div className="rounded-lg bg-gray-50  p-3 text-center">
                    <p className="text-gray-500 mb-1">Dépôt min.</p>
                    <p className="font-bold text-gray-900 ">{m.depotMin}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50  p-3 text-center">
                    <p className="text-gray-500 mb-1">Dépôt max.</p>
                    <p className="font-bold text-gray-900 ">{m.depotMax}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50  p-3 text-center">
                    <p className="text-gray-500 mb-1">Délai dépôt</p>
                    <p className="font-bold text-gray-900 ">{m.delaiDepot}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50  p-3 text-center">
                    <p className="text-gray-500 mb-1">Délai retrait</p>
                    <p className="font-bold text-gray-900 ">{m.delaiRetrait}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50  p-3 text-center col-span-2 sm:col-span-1">
                    <p className="text-gray-500 mb-1">Frais</p>
                    <p className="font-bold text-accent">{m.frais}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900  mb-2">Avantages</p>
                    <ul className="space-y-1">
                      {m.avantages.map((a) => (
                        <li key={a} className="flex items-center gap-2 text-gray-600 ">
                          <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900  mb-2">Inconvénients</p>
                    <ul className="space-y-1">
                      {m.inconvenients.map((inc) => (
                        <li key={inc} className="flex items-center gap-2 text-gray-600 ">
                          <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conseils */}
        <section className="rounded-2xl bg-primary/5 border border-primary/10 p-6 sm:p-8 mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-4">Nos conseils pour les paiements</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700 ">
            <div>
              <h3 className="font-bold text-gray-900  mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" /> Rapidité de retrait
              </h3>
              <p>Si la rapidité de retrait est votre priorité, privilégiez PayPal, Skrill ou Neteller. Vos gains sont disponibles en quelques heures contre 1 à 5 jours pour la CB ou le virement.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900  mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" /> Sécurité
              </h3>
              <p>Toutes les méthodes listées sont sécurisées sur les bookmakers agréés ANJ. PayPal et Apple Pay ajoutent une couche de sécurité supplémentaire car vos données bancaires ne sont pas partagées.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900  mb-2">Même méthode dépôt/retrait</h3>
              <p>La plupart des bookmakers exigent que vous retiriez avec la même méthode que celle utilisée pour le dépôt. Choisissez donc dès le départ une méthode qui accepte les retraits.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900  mb-2">Limites de dépôt</h3>
              <p>Tous les bookmakers agréés ANJ permettent de fixer des limites de dépôt (quotidiennes, hebdomadaires, mensuelles). Utilisez cette fonctionnalité pour jouer responsablement.</p>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="rounded-2xl bg-white  border border-gray-200  p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900  mb-4">Pages associées</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/meilleurs-bookmakers" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Meilleurs bookmakers
            </Link>
            <Link href="/bonus" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Bonus & codes promo
            </Link>
            <Link href="/guide-paris" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Guide des paris
            </Link>
          </div>
        </section>
        <ANJBanner />
      </div>

      <FAQSection
        title="Questions sur les paiements"
        items={[
          { question: "Quelle est la méthode de paiement la plus rapide ?", answer: "Pour les dépôts, toutes les méthodes sont instantanées sauf le virement (1-3 jours). Pour les retraits, PayPal, Skrill et Neteller sont les plus rapides (quelques heures), suivis de la carte bancaire (1-3 jours) et du virement (2-5 jours)." },
          { question: "Y a-t-il des frais de dépôt ou retrait ?", answer: "Non, les bookmakers agréés ANJ ne facturent généralement aucun frais sur les dépôts et retraits. Attention toutefois aux frais internes de certains portefeuilles électroniques (Skrill, Neteller) pour les transferts vers votre compte bancaire." },
          { question: "Puis-je retirer sur une autre méthode que celle du dépôt ?", answer: "En général, les bookmakers exigent que le retrait soit effectué sur la même méthode que le dépôt (pour des raisons anti-blanchiment). Si la méthode de dépôt n'accepte pas les retraits (ex : Apple Pay), le retrait se fera par virement bancaire." },
          { question: "Quel est le dépôt minimum sur les bookmakers ?", answer: "Le dépôt minimum est généralement de 10€ sur les bookmakers français (Winamax, Betclic, Unibet, ParionsSport), quelle que soit la méthode de paiement. Le virement bancaire peut avoir un minimum plus élevé (20€)." },
          { question: "Les paiements sont-ils sécurisés ?", answer: "Oui, tous les bookmakers agréés ANJ utilisent le cryptage SSL 256 bits et respectent les normes PCI DSS pour la protection des données bancaires. PayPal et Apple Pay ajoutent une couche de sécurité supplémentaire." },
        ]}
      />
    </>
  );
}
