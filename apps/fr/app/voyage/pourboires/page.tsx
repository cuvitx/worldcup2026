import type { Metadata } from "next";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { DollarSign, Coffee, Car, Hotel, AlertTriangle, Smartphone, Globe, CreditCard } from "lucide-react";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: "Guide des pourboires aux USA pour supporters français — CDM 2026",
    description:
      "Combien laisser de pourboire aux USA pendant la Coupe du Monde 2026 ? Restaurants, bars, taxis, hôtels : le guide complet pour les supporters français.",
    openGraph: {
      title: "Guide des pourboires aux USA — CDM 2026",
      description:
        "Tout savoir sur les pourboires américains : restaurants, bars, taxis, hôtels. Évitez les faux pas pendant la Coupe du Monde 2026.",
      url: `${domains.fr}/voyage/pourboires`,
    },
    alternates: { canonical: "https://www.cdm2026.fr/voyage/pourboires" },
  };
}

const tips = [
  {
    icon: Coffee,
    title: "Restaurants",
    pct: "15 à 20 %",
    detail:
      "Le pourboire au restaurant est quasi obligatoire aux États-Unis. Les serveurs dépendent de ces tips pour vivre, leur salaire de base étant souvent inférieur à 3 $/h. Laissez 15 % pour un service correct, 18 % pour un bon service et 20 % ou plus si le service était excellent. Le pourboire se calcule sur le montant avant taxes. Dans les restaurants à service rapide (fast-casual), un pourboire de 10 % est apprécié mais pas attendu.",
  },
  {
    icon: Coffee,
    title: "Bars et cafés",
    pct: "1 à 2 $ par boisson",
    detail:
      "Au bar, la règle est simple : 1 $ par bière ou boisson simple, 2 $ pour un cocktail élaboré. Si vous ouvrez un tab (ardoise), laissez 18 à 20 % du total à la fin de la soirée. Dans les coffee shops, un pourboire de 1 $ par café est courant. Le pot à pourboires sur le comptoir est une invitation, pas une obligation, mais les habitués contribuent systématiquement.",
  },
  {
    icon: Car,
    title: "Taxis et VTC (Uber/Lyft)",
    pct: "15 %",
    detail:
      "Dans les taxis traditionnels, le pourboire standard est de 15 à 20 % de la course. Pour Uber et Lyft, l'application propose de laisser un pourboire après la course : 15 % est la norme. Si le chauffeur vous aide avec vos bagages ou prend un itinéraire particulièrement efficace, montez à 20 %. Ne pas laisser de pourboire dans un taxi est considéré comme impoli.",
  },
  {
    icon: Hotel,
    title: "Hôtels",
    pct: "1 à 5 $ selon le service",
    detail:
      "Le porteur de bagages s'attend à 1 à 2 $ par bagage. Le service de ménage mérite 2 à 5 $ par nuit, laissés sur l'oreiller avec un petit mot « Housekeeping — Thank you ». Le concierge qui vous obtient des réservations difficiles apprécie 5 à 20 $. Le voiturier reçoit 2 à 5 $ quand il ramène votre véhicule. Le room service inclut souvent un service charge — vérifiez la note avant d'ajouter un pourboire.",
  },
];

const countryComparison = [
  {
    country: "États-Unis",
    icon: "🇺🇸",
    restaurant: "15-20 %",
    bar: "1-2 $/boisson",
    taxi: "15-20 %",
    hotel: "1-5 $/service",
    note: "Quasi obligatoire. Le salaire des serveurs en dépend.",
  },
  {
    country: "Canada",
    icon: "🇨🇦",
    restaurant: "15-18 %",
    bar: "1-2 CAD/boisson",
    taxi: "15 %",
    hotel: "1-3 CAD/service",
    note: "Similaire aux USA mais légèrement moins élevé.",
  },
  {
    country: "Mexique",
    icon: "🇲🇽",
    restaurant: "10-15 %",
    bar: "10-15 %",
    taxi: "Arrondir",
    hotel: "20-50 MXN/service",
    note: "Le « propina » est apprécié mais la pression sociale est moindre.",
  },
];

const faqItems = [
  {
    question: "Le pourboire est-il obligatoire aux USA ?",
    answer:
      "Légalement non, mais socialement oui. Ne pas laisser de pourboire est considéré comme très impoli et peut être interprété comme une insulte envers le serveur. Les serveurs américains gagnent souvent moins de 3 $/h de salaire de base et dépendent des tips pour vivre.",
  },
  {
    question: "Comment calculer le pourboire facilement ?",
    answer:
      "Astuce simple : regardez le montant des taxes sur la note (environ 8-10 % selon les États). Doublez ce montant pour obtenir un pourboire de 16-20 %. Sinon, la plupart des terminaux de paiement proposent directement 18 %, 20 % ou 25 %.",
  },
  {
    question: "Peut-on payer le pourboire en espèces ?",
    answer:
      "Oui, et c'est même préféré par beaucoup de serveurs car les pourboires en espèces sont reçus immédiatement. Sur les paiements par carte, le pourboire est ajouté sur la note ou via le terminal — mais il peut être partagé ou taxé différemment.",
  },
  {
    question: "Et dans les fast-foods ?",
    answer:
      "Dans les fast-foods classiques (McDonald's, Burger King), le pourboire n'est pas attendu. En revanche, dans les restaurants « fast-casual » comme Chipotle ou Sweetgreen, un pot à pourboires ou un écran de paiement avec option tip est souvent présent.",
  },
  {
    question: "Les pourboires sont-ils les mêmes au Canada et au Mexique ?",
    answer:
      "Au Canada, les usages sont proches des USA (15-18 % au restaurant). Au Mexique, le pourboire (propina) est de 10-15 % au restaurant. Dans les deux cas, la pression sociale est légèrement moindre qu'aux États-Unis.",
  },
];

export default function PourbioiresUsaPage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Guide des pourboires USA" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">Lifestyle Supporter</p>
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Guide des pourboires pour les supporters français aux USA
          </h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            Le système de pourboires américain peut surprendre. Voici tout ce que vous devez savoir pour ne pas commettre d&apos;impair pendant la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="prose prose-lg max-w-none">
          <p>
            En France, le service est compris dans l&apos;addition. Aux États-Unis, c&apos;est une tout autre histoire.
            Le <strong>tip</strong> (pourboire) représente une part essentielle du revenu des travailleurs du secteur
            des services. Pendant la Coupe du Monde 2026, vous serez amené à fréquenter restaurants, bars, hôtels et
            taxis dans les 11 villes hôtes américaines. Ce guide vous évitera les situations gênantes et vous aidera à
            naviguer sereinement dans la culture du pourboire.
          </p>
        </div>
      </section>

      {/* Tips by category */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-8">
          <DollarSign className="inline-block w-6 h-6 mr-2 text-[#00B865]" />
          Combien laisser selon la situation
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="rounded-2xl border border-gray-200 bg-white p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <tip.icon className="w-6 h-6 text-[#00B865]" />
                <h3 className="font-bold text-lg">{tip.title}</h3>
                <span className="ml-auto bg-[#00B865]/10 text-[#00B865] font-semibold text-sm px-3 py-1 rounded-full">
                  {tip.pct}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{tip.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Country comparison */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Globe className="inline-block w-6 h-6 mr-2 text-[#D4AF37]" />
          Différences USA / Canada / Mexique
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#022149] text-white">
                <th className="px-4 py-3 text-left rounded-tl-xl">Pays</th>
                <th className="px-4 py-3 text-left">Restaurant</th>
                <th className="px-4 py-3 text-left">Bar</th>
                <th className="px-4 py-3 text-left">Taxi</th>
                <th className="px-4 py-3 text-left">Hôtel</th>
                <th className="px-4 py-3 text-left rounded-tr-xl">Note</th>
              </tr>
            </thead>
            <tbody>
              {countryComparison.map((c, i) => (
                <tr
                  key={c.country}
                  className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-3 font-semibold">{c.country}</td>
                  <td className="px-4 py-3">{c.restaurant}</td>
                  <td className="px-4 py-3">{c.bar}</td>
                  <td className="px-4 py-3">{c.taxi}</td>
                  <td className="px-4 py-3">{c.hotel}</td>
                  <td className="px-4 py-3 text-gray-500">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pitfalls */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <AlertTriangle className="inline-block w-6 h-6 mr-2 text-red-500" />
          Pièges à éviter
        </h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p>
              <strong>Le double pourboire :</strong> certains restaurants ajoutent automatiquement un « gratuity » de 18 %
              pour les groupes de 6 personnes ou plus. Vérifiez votre note avant d&apos;ajouter un pourboire supplémentaire.
            </p>
          </div>
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p>
              <strong>Les écrans de paiement piégeux :</strong> les terminaux de paiement proposent souvent 20 %, 25 % et
              30 %. Ne vous sentez pas obligé de choisir l&apos;option la plus élevée. 18-20 % reste le standard.
            </p>
          </div>
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p>
              <strong>Le pourboire sur le montant TTC :</strong> calculez votre tip sur le montant avant taxes (subtotal),
              pas sur le total avec taxes.
            </p>
          </div>
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p>
              <strong>Ne jamais laisser zéro :</strong> aux USA, ne pas laisser de pourboire signifie que le service était
              catastrophique. C&apos;est un message très fort. Si vous êtes mécontent, 10 % est le minimum acceptable.
            </p>
          </div>
        </div>
      </section>

      {/* Apps */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Smartphone className="inline-block w-6 h-6 mr-2 text-[#00B865]" />
          Applications utiles
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-bold mb-1">Tip Calculator (gratuite)</h3>
            <p className="text-sm text-gray-600">
              Calculez instantanément le pourboire et partagez la note entre convives. Disponible sur iOS et Android.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-bold mb-1">Splitwise</h3>
            <p className="text-sm text-gray-600">
              Idéal pour les groupes de supporters : suivez les dépenses partagées et les pourboires sur tout le séjour.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-bold mb-1">XE Currency</h3>
            <p className="text-sm text-gray-600">
              Convertissez rapidement euros en dollars pour calculer le vrai coût de vos pourboires.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-bold mb-1">
              <CreditCard className="inline w-4 h-4 mr-1" />
              Revolut / Wise
            </h3>
            <p className="text-sm text-gray-600">
              Payez en dollars sans frais de change et gérez vos pourboires directement depuis l&apos;appli.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <FAQSection title="Questions fréquentes sur les pourboires" items={faqItems} />
      </section>
    </>
  );
}
