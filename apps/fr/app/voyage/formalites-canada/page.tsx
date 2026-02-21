import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { AlertTriangle, CheckCircle, ClipboardList, Clock, ExternalLink, FileText, Globe, Landmark, Pin, Plane, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Formalités Canada CDM 2026 — AVE pour les supporters français",
  description:
    "Guide AVE Canada pour la CDM 2026 : procédure en ligne (7 CAD), délai, documents nécessaires. Tout pour les Français voyageant à Vancouver et Toronto.",
  openGraph: {
    title: "AVE Canada — CDM 2026 : Guide pour les Français",
    description: "Autorisation de Voyage Électronique (AVE) : 7 CAD, quelques minutes. Le guide pour voir la CDM 2026 au Canada.",
    url: "https://www.cdm2026.fr/voyage/formalites-canada",
  },
  alternates: { canonical: "https://www.cdm2026.fr/voyage/formalites-canada" },
};

const faqItems = [
  {
    question: "Faut-il un visa pour aller au Canada voir la CDM 2026 ?",
    answer:
      "Non, les Français n'ont pas besoin de visa pour un séjour touristique au Canada de moins de 6 mois. En revanche, une AVE (Autorisation de Voyage Électronique) est obligatoire pour entrer par voie aérienne.",
  },
  {
    question: "Combien coûte l'AVE Canada et combien de temps est-elle valide ?",
    answer:
      "L'AVE coûte 7 CAD (environ 5 €) et est valable 5 ans ou jusqu'à expiration de votre passeport. Elle est liée électroniquement à votre passeport.",
  },
  {
    question: "Quelle est la différence entre l'AVE et l'ESTA ?",
    answer:
      "L'AVE (Canada) et l'ESTA (USA) sont des autorisations de voyage électroniques similaires mais distinctes. L'AVE coûte 7 CAD (vs 21 $ pour l'ESTA), est valable 5 ans (vs 2 ans) et autorise un séjour de 6 mois (vs 90 jours). Les deux sont obligatoires : si vous voyagez aux USA et au Canada pendant la CDM, il vous faut les deux.",
  },
  {
    question: "Puis-je transiter par le Canada pour aller aux USA sans AVE ?",
    answer:
      "Non. Même en transit aérien par le Canada, l'AVE est obligatoire. Si vous avez un vol avec escale à Toronto ou Vancouver avant de continuer vers une ville américaine, vous devez avoir une AVE valide.",
  },
];

export default function FormalitesCanadaPage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Formalités Canada — CDM 2026" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
              🇨🇦 Formalités Canada
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              AVE Canada pour la Coupe du Monde 2026
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              7 CAD, quelques minutes en ligne, valable 5 ans. L&apos;AVE est obligatoire
              pour les Français voyageant au Canada par avion — y compris en transit.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada/ave.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-bold text-white hover:bg-accent/90 hover:-translate-y-0.5 transition-all shadow-lg w-full sm:w-auto"
              >
                <ExternalLink className="h-4 w-4" />
                Demander mon AVE (site officiel)
              </a>
              <a
                href="#procedure"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition-all w-full sm:w-auto"
              >
                Voir la procédure
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Qu'est-ce que l'AVE */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-7 w-7 text-accent" />
            Qu&apos;est-ce que l&apos;AVE ?
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            L&apos;<strong>AVE</strong> (Autorisation de Voyage Électronique), ou <em>eTA</em> (Electronic Travel
            Authorization) en anglais, est une exigence d&apos;entrée pour les ressortissants de pays dispensés
            de visa qui voyagent au Canada par <strong>voie aérienne</strong>. Elle est liée électroniquement
            à votre passeport.
          </p>
          <p className="text-secondary leading-relaxed">
            La France fait partie des pays éligibles. Les Français n&apos;ont pas besoin de visa pour un séjour
            touristique de moins de 6 mois, mais l&apos;AVE est <strong>obligatoire</strong> pour tout vol
            à destination du Canada (y compris les transits).
          </p>
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 mt-4">
            <h3 className="font-bold text-lg mb-3"><ClipboardList className="h-5 w-5 inline-block" /> AVE en un coup d&apos;œil</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-secondary">
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Prix : <strong>7 CAD</strong> (≈ 5 €)</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Validité : <strong>5 ans</strong> ou expiration du passeport</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Séjour max : <strong>6 mois</strong></span></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Délai : quelques minutes en général</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Entrées multiples autorisées</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Obligatoire même en transit aérien</span></li>
            </ul>
          </div>
        </section>

        {/* Procédure */}
        <section id="procedure">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-7 w-7 text-accent" />
            Procédure AVE pas à pas
          </h2>
          <ol className="space-y-4">
            {[
              {
                step: "1",
                title: "Accédez au site officiel",
                desc: (
                  <>
                    Rendez-vous sur{" "}
                    <a href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada/ave.html" target="_blank" rel="noopener noreferrer" className="text-accent underline font-semibold">
                      canada.ca/ave
                    </a>. C&apos;est le seul site officiel du gouvernement canadien.
                  </>
                ),
              },
              {
                step: "2",
                title: "Vérifiez votre éligibilité",
                desc: "En tant que ressortissant français, vous êtes éligible à l'AVE pour un séjour touristique.",
              },
              {
                step: "3",
                title: "Remplissez le formulaire en ligne",
                desc: "Informations personnelles, numéro de passeport, coordonnées, questions de sécurité. Le formulaire est disponible en français.",
              },
              {
                step: "4",
                title: "Payez les 7 CAD",
                desc: "Paiement par carte de crédit (Visa, Mastercard, American Express). Environ 5 € au taux de change actuel.",
              },
              {
                step: "5",
                title: "Recevez votre AVE par email",
                desc: "Dans la plupart des cas, l'approbation arrive en quelques minutes par email. Certaines demandes peuvent nécessiter quelques jours de traitement.",
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white font-bold text-sm">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Différences AVE vs ESTA */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-7 w-7 text-accent" />
            AVE vs ESTA : les différences
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            Si vous prévoyez de voir des matchs aux États-Unis ET au Canada pendant la CDM 2026,
            vous aurez besoin des <strong>deux autorisations</strong>. Voici les différences :
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-bold">Critère</th>
                  <th className="text-left py-3 px-4 font-bold">🇨🇦 AVE Canada</th>
                  <th className="text-left py-3 px-4 font-bold">🇺🇸 ESTA USA</th>
                </tr>
              </thead>
              <tbody className="text-secondary">
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Prix</td>
                  <td className="py-3 px-4">7 CAD (≈ 5 €)</td>
                  <td className="py-3 px-4">21 $ (≈ 19 €)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Validité</td>
                  <td className="py-3 px-4">5 ans</td>
                  <td className="py-3 px-4">2 ans</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Séjour max</td>
                  <td className="py-3 px-4">6 mois</td>
                  <td className="py-3 px-4">90 jours</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Délai</td>
                  <td className="py-3 px-4">Quelques minutes</td>
                  <td className="py-3 px-4">Minutes à 72h</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Site officiel</td>
                  <td className="py-3 px-4"><a href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada/ave.html" target="_blank" rel="noopener noreferrer" className="text-accent underline">canada.ca</a></td>
                  <td className="py-3 px-4"><a href="https://esta.cbp.dhs.gov/" target="_blank" rel="noopener noreferrer" className="text-accent underline">esta.cbp.dhs.gov</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Documents nécessaires */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-7 w-7 text-accent" />
            Documents nécessaires
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "", title: "Passeport valide", desc: "Passeport français valide pendant toute la durée du séjour. Biométrique ou électronique." },
              { icon: "", title: "AVE approuvée", desc: "Demande en ligne approuvée, liée à votre passeport. Gardez l'email de confirmation." },
              { icon: "", title: "Billet retour", desc: "Preuve de sortie du territoire canadien (billet retour ou continuation)." },
              { icon: "", title: "Preuve de fonds", desc: "Moyens financiers suffisants pour le séjour (peut être demandé à l'arrivée)." },
            ].map((doc) => (
              <div key={doc.title} className="rounded-xl border p-4">
                <p className="font-bold">{doc.icon} {doc.title}</p>
                <p className="text-sm text-secondary mt-1">{doc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CDM 2026 au Canada */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <Plane className="h-7 w-7 text-accent" />
            CDM 2026 au Canada : Vancouver et Toronto
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            Le Canada accueille des matchs dans <strong>2 villes</strong> :
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border p-5">
              <h3 className="font-bold text-lg mb-2"><Landmark className="h-5 w-5 inline-block" /> Vancouver</h3>
              <p className="text-secondary text-sm">
                <strong>BC Place</strong> (54 500 places). Matchs de phase de groupes et huitièmes de finale.
                Vol Paris → Vancouver : environ 10h direct (Air Canada, Air France).
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <h3 className="font-bold text-lg mb-2"><Landmark className="h-5 w-5 inline-block" /> Toronto</h3>
              <p className="text-secondary text-sm">
                <strong>BMO Field</strong> (45 000 places étendues pour la CDM). Phase de groupes.
                Vol Paris → Toronto : environ 8h direct (Air Canada, Air France, Air Transat).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
            <p className="text-sm text-secondary">
              <strong>Attention :</strong> Si vous traversez la frontière terrestre USA-Canada (ex. road trip
              Seattle → Vancouver), l&apos;AVE n&apos;est pas nécessaire pour l&apos;entrée terrestre —
              mais vous devrez présenter votre passeport aux douanes canadiennes.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-accent p-6 sm:p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">🇨🇦 Demandez votre AVE maintenant</h2>
          <p className="mb-5 text-white/80">
            7 CAD, 5 minutes, valable 5 ans. Simple et rapide.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada/ave.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-accent px-6 py-3.5 font-bold hover:bg-white/90 transition-all"
            >
              <ExternalLink className="h-4 w-4" />
              Site officiel AVE Canada
            </a>
            <Link
              href="/voyage/esta-visa-usa"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-bold hover:bg-white/10 transition-all"
            >
              🇺🇸 Guide ESTA USA
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          title=" Questions fréquentes — AVE Canada et CDM 2026"
          items={faqItems}
        />

        {/* Liens connexes */}
        <section>
          <h2 className="text-2xl font-bold mb-4"><Pin className="h-5 w-5 inline-block" /> Voir aussi</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { href: "/voyage/esta-visa-usa", icon: "🇺🇸", title: "ESTA USA", desc: "Guide complet ESTA pour les matchs aux États-Unis." },
              { href: "/voyage/visa-mexique", icon: "🇲🇽", title: "Formalités Mexique", desc: "FMM et documents pour les matchs au Mexique." },
              { href: "/billets", icon: "", title: "Billets CDM 2026", desc: "Prix, dates de vente et comment acheter ses places." },
              { href: "/voyage/vols-budget", icon: "", title: "Calculateur budget", desc: "Estimez le coût total de votre voyage CDM 2026." },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="rounded-xl border p-4 hover:border-accent/50 transition-colors block">
                <p className="font-bold">{link.icon} {link.title}</p>
                <p className="text-sm text-secondary mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
