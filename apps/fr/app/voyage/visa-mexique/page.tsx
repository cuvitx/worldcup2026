import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { AlertTriangle, CheckCircle, ClipboardList, DollarSign, ExternalLink, FileText, Globe, Heart, Lightbulb, Pin, Plane, Shield, Ticket } from "lucide-react";

export const metadata: Metadata = {
  title: "Visa Mexique CDM 2026 — Formalités d'entrée pour les Français",
  description:
    "Formalités Mexique CDM 2026 : pas de visa pour les Français, FMM obligatoire, documents nécessaires, vols directs et précautions sanitaires.",
  openGraph: {
    title: "Formalités Mexique — CDM 2026",
    description: "Pas de visa mais une FMM obligatoire. Guide complet pour les supporters français au Mexique.",
    url: "https://www.cdm2026.fr/voyage/visa-mexique",
  },
  alternates: { canonical: "https://www.cdm2026.fr/voyage/visa-mexique" },
};

const faqItems = [
  {
    question: "Faut-il un visa pour aller au Mexique voir la CDM 2026 ?",
    answer:
      "Non. Les ressortissants français sont exemptés de visa pour un séjour touristique de moins de 180 jours au Mexique. Vous aurez uniquement besoin d'un passeport valide et du formulaire FMM (Forma Migratoria Múltiple).",
  },
  {
    question: "Qu'est-ce que la FMM et comment l'obtenir ?",
    answer:
      "La FMM (Forma Migratoria Múltiple) est un formulaire migratoire obligatoire pour entrer au Mexique. Vous pouvez le remplir en ligne sur le site de l'INM (Instituto Nacional de Migración) avant votre départ, ou le recevoir dans l'avion. Conservez-le précieusement : il sera demandé à la sortie du territoire.",
  },
  {
    question: "Mon passeport doit-il être valide combien de temps ?",
    answer:
      "Votre passeport doit être valide pendant toute la durée de votre séjour au Mexique. Il est recommandé d'avoir une validité d'au moins 6 mois après la date d'entrée pour éviter tout problème.",
  },
  {
    question: "Y a-t-il des vaccins obligatoires pour le Mexique ?",
    answer:
      "Aucun vaccin n'est obligatoire pour entrer au Mexique depuis la France. Cependant, les vaccins contre l'hépatite A, la typhoïde et la mise à jour du DTP sont recommandés. Consultez votre médecin avant le départ.",
  },
];

export default function VisaMexiquePage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Formalités Mexique — CDM 2026" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
              🇲🇽 Formalités Mexique
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Formalités d&apos;entrée au Mexique pour la CDM 2026
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Bonne nouvelle : les Français n&apos;ont pas besoin de visa pour le Mexique.
              Mais attention à la FMM, le formulaire migratoire obligatoire.
            </p>
            <a
              href="#formalites"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-bold text-white hover:bg-accent/90 hover:-translate-y-0.5 transition-all shadow-lg"
            >
              Voir les formalités
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Pas de visa */}
        <section id="formalites">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="h-7 w-7 text-green-500" />
            Pas de visa pour les Français
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            Les ressortissants français bénéficient d&apos;une <strong>exemption de visa</strong> pour les
            séjours touristiques au Mexique d&apos;une durée inférieure à <strong>180 jours</strong>. Puisque
            la Coupe du Monde 2026 se déroule du 11 juin au 19 juillet, vous êtes largement dans les limites.
          </p>
          <p className="text-secondary leading-relaxed">
            Le Mexique accueille 3 villes hôtes de la CDM 2026 : <strong>Mexico</strong> (Estadio Azteca),
            <strong> Guadalajara</strong> (Estadio Akron) et <strong>Monterrey</strong> (Estadio BBVA).
            L&apos;Estadio Azteca accueillera notamment le match d&apos;ouverture.
          </p>
        </section>

        {/* FMM */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-7 w-7 text-accent" />
            La FMM : formulaire migratoire obligatoire
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            La <strong>FMM</strong> (Forma Migratoria Múltiple) est le document d&apos;immigration que tout
            visiteur étranger doit remplir pour entrer au Mexique. C&apos;est l&apos;équivalent mexicain
            d&apos;une carte d&apos;embarquement migratoire.
          </p>
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 space-y-3">
            <h3 className="font-bold text-lg"><ClipboardList className="h-5 w-5 inline-block" /> Comment obtenir la FMM</h3>
            <ol className="space-y-2 text-sm text-secondary list-decimal list-inside">
              <li><strong>En ligne (recommandé)</strong> : sur le site de l&apos;INM (<a href="https://www.inm.gob.mx/" target="_blank" rel="noopener noreferrer" className="text-accent underline">inm.gob.mx</a>) avant votre départ. Imprimez le formulaire.</li>
              <li><strong>Dans l&apos;avion</strong> : les compagnies aériennes distribuent le formulaire papier pendant le vol.</li>
              <li><strong>À l&apos;arrivée</strong> : des formulaires sont disponibles aux guichets d&apos;immigration de l&apos;aéroport.</li>
            </ol>
            <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
              <p className="text-sm text-secondary">
                <strong>Important :</strong> Conservez votre FMM pendant tout votre séjour. Elle vous sera
                demandée à la sortie du territoire. La perte de ce document peut entraîner une amende.
              </p>
            </div>
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
              { icon: "", title: "Passeport valide", desc: "Valide au moins 6 mois après la date d'entrée au Mexique. Passeport biométrique recommandé." },
              { icon: "", title: "FMM remplie", desc: "Formulaire migratoire à remplir en ligne ou dans l'avion." },
              { icon: "", title: "Billet retour", desc: "Preuve de sortie du territoire (billet d'avion retour ou continuation)." },
              { icon: "", title: "Justificatif d'hébergement", desc: "Réservation d'hôtel ou adresse de séjour (peut être demandé)." },
            ].map((doc) => (
              <div key={doc.title} className="rounded-xl border p-4">
                <p className="font-bold">{doc.icon} {doc.title}</p>
                <p className="text-sm text-secondary mt-1">{doc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vols directs */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <Plane className="h-7 w-7 text-accent" />
            Vols directs depuis la France
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            Plusieurs compagnies proposent des vols directs entre Paris et le Mexique :
          </p>
          <div className="space-y-3">
            {[
              { route: "Paris CDG → Mexico (MEX)", airline: "Air France (direct)", duration: "~12h", price: "600-1 200 €" },
              { route: "Paris CDG → Cancún (CUN)", airline: "Air France, Transavia (saisonnier)", duration: "~11h", price: "500-1 000 €" },
              { route: "Paris CDG → Guadalajara (GDL)", airline: "Via Mexico ou escale US", duration: "~15-18h", price: "700-1 400 €" },
              { route: "Paris CDG → Monterrey (MTY)", airline: "Via Mexico ou escale US", duration: "~15-18h", price: "700-1 400 €" },
            ].map((vol) => (
              <div key={vol.route} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 gap-2">
                <div>
                  <p className="font-bold text-sm">{vol.route}</p>
                  <p className="text-xs text-secondary">{vol.airline} — {vol.duration}</p>
                </div>
                <span className="text-accent font-bold text-sm">{vol.price}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-secondary mt-3">
            <Lightbulb className="h-5 w-5 inline-block" /> Astuce : si vous voyagez aussi aux USA pour d&apos;autres matchs, attention — un transit
            par les États-Unis nécessite un{" "}
            <Link href="/voyage/esta-visa-usa" className="text-accent underline">ESTA valide</Link>.
          </p>
        </section>

        {/* Précautions sanitaires */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <Heart className="h-7 w-7 text-red-500" />
            Précautions sanitaires
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            Le Mexique ne requiert aucun vaccin obligatoire pour les voyageurs venant de France,
            mais plusieurs précautions sont recommandées :
          </p>
          <ul className="space-y-2 text-secondary text-sm">
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span><strong>Vaccins recommandés :</strong> Hépatite A, Typhoïde, mise à jour DTP</span></li>
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span><strong>Eau :</strong> Ne buvez que de l&apos;eau en bouteille (même pour se brosser les dents)</span></li>
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span><strong>Alimentation :</strong> Évitez les crudités et glaçons dans les stands de rue les premiers jours</span></li>
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span><strong>Altitude :</strong> Mexico est à 2 240 m — prévoyez un temps d&apos;acclimatation</span></li>
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span><strong>Assurance :</strong> Souscrivez une <Link href="/voyage/assurance" className="text-accent underline">assurance voyage</Link> couvrant les frais médicaux</span></li>
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-accent p-6 sm:p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">🇲🇽 Préparez votre voyage au Mexique</h2>
          <p className="mb-5 text-white/80">
            Match d&apos;ouverture à l&apos;Estadio Azteca, ambiance de feu à Guadalajara...
            Le Mexique vous attend !
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/billets"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-accent px-6 py-3.5 font-bold hover:bg-white/90 transition-all"
            >
              <Ticket className="h-5 w-5 inline-block" /> Acheter ses billets
            </Link>
            <Link
              href="/voyage/vols-budget"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-bold hover:bg-white/10 transition-all"
            >
              <DollarSign className="h-5 w-5 inline-block" /> Calculer mon budget
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          title=" Questions fréquentes — Formalités Mexique CDM 2026"
          items={faqItems}
        />

        {/* Liens connexes */}
        <section>
          <h2 className="text-2xl font-bold mb-4"><Pin className="h-5 w-5 inline-block" /> Voir aussi</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { href: "/voyage/esta-visa-usa", icon: "🇺🇸", title: "ESTA USA", desc: "Guide complet pour l'autorisation de voyage aux États-Unis." },
              { href: "/voyage/formalites-canada", icon: "🇨🇦", title: "Formalités Canada (AVE)", desc: "AVE obligatoire pour les matchs à Vancouver et Toronto." },
              { href: "/budget", icon: "", title: "Budget CDM 2026", desc: "Combien coûte un voyage pour la Coupe du Monde 2026 ?" },
              { href: "/voyage/assurance", icon: "", title: "Assurance voyage", desc: "Comparatif des meilleures assurances pour la CDM 2026." },
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
