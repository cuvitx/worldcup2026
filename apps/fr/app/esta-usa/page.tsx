import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { AlertTriangle, Baby, Ban, Check, CheckCircle, ClipboardList, Clock, DollarSign, ExternalLink, FileText, Globe, Lightbulb, Pin, Plane, Shield, ShieldCheck, Ticket, X, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "ESTA USA pour la Coupe du Monde 2026 — Guide complet pour les Français",
  description:
    "Guide ESTA complet pour la CDM 2026 : procédure, prix (21$), pièges à éviter, délai, validité 2 ans. Tout pour les supporters français voyageant aux États-Unis.",
  openGraph: {
    title: "ESTA USA — CDM 2026 : Guide complet pour les Français",
    description:
      "Procédure ESTA pas à pas, prix officiel 21$, pièges des sites frauduleux, cas particuliers. Le guide indispensable pour voir la CDM 2026 aux USA.",
    url: "https://cdm2026.fr/esta-usa",
  },
  alternates: { canonical: "https://cdm2026.fr/esta-usa" },
};

const faqItems = [
  {
    question: "Faut-il un ESTA pour aller voir un match de la CDM 2026 aux USA ?",
    answer:
      "Oui, tous les ressortissants français voyageant aux États-Unis dans le cadre du Visa Waiver Program doivent obtenir une autorisation ESTA avant l'embarquement, même pour un court séjour de quelques jours pour assister à des matchs de la Coupe du Monde 2026.",
  },
  {
    question: "Combien de temps avant mon départ dois-je faire ma demande ESTA ?",
    answer:
      "Il est recommandé de faire la demande au minimum 72 heures avant le départ, mais idéalement plusieurs semaines à l'avance. La plupart des autorisations sont accordées en quelques minutes, mais certaines peuvent nécessiter jusqu'à 72 heures de traitement.",
  },
  {
    question: "Mon ESTA est encore valide, dois-je en refaire un pour la CDM 2026 ?",
    answer:
      "Si votre ESTA est toujours valide (moins de 2 ans depuis l'approbation et même passeport), vous pouvez l'utiliser pour la CDM 2026. Vérifiez votre statut sur le site officiel esta.cbp.dhs.gov. Attention : si vous avez changé de passeport, il faut refaire une demande.",
  },
  {
    question: "Puis-je rester plus de 90 jours aux USA avec un ESTA pour voir toute la CDM 2026 ?",
    answer:
      "Non. L'ESTA autorise un séjour maximum de 90 jours consécutifs. La CDM 2026 se déroulant du 11 juin au 19 juillet (39 jours), vous serez largement dans les limites. Mais vous ne pouvez pas cumuler pour dépasser 90 jours.",
  },
  {
    question: "Que faire si mon ESTA est refusé ?",
    answer:
      "En cas de refus ESTA, vous devrez demander un visa B1/B2 auprès de l'ambassade américaine à Paris. Prévoyez un délai de plusieurs semaines. Les refus ESTA sont généralement liés à des voyages dans certains pays (Iran, Irak, Syrie, etc.) ou à des antécédents judiciaires.",
  },
  {
    question: "Les sites qui facturent 50€ ou plus pour l'ESTA sont-ils légitimes ?",
    answer:
      "Non. Le seul site officiel est esta.cbp.dhs.gov et le coût est de 21 $. Les sites tiers qui facturent 50 à 80 € sont des intermédiaires non officiels qui ajoutent des frais de « service » inutiles. Certains sont des arnaques pures. Faites toujours votre demande sur le site officiel.",
  },
];

export default function EstaUsaPage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "ESTA USA — CDM 2026" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
              🇺🇸 Formalités USA
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              ESTA USA pour la Coupe du Monde 2026 : le guide complet
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              21 $, quelques minutes en ligne, valable 2 ans. L&apos;ESTA est
              obligatoire pour tous les supporters français voyageant aux
              États-Unis. Voici tout ce qu&apos;il faut savoir — et les pièges à
              éviter.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://esta.cbp.dhs.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-bold text-white hover:bg-accent/90 hover:-translate-y-0.5 transition-all shadow-lg w-full sm:w-auto"
              >
                <ExternalLink className="h-4 w-4" />
                Faire ma demande ESTA (site officiel)
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
        {/* Qu'est-ce que l'ESTA */}
        <section id="esta">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-7 w-7 text-accent" />
            Qu&apos;est-ce que l&apos;ESTA ?
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            L&apos;ESTA (<strong>Electronic System for Travel Authorization</strong>) est une autorisation de voyage
            électronique obligatoire pour entrer aux États-Unis sans visa, dans le cadre du programme d&apos;exemption
            de visa (<em>Visa Waiver Program</em>). Ce programme concerne 41 pays, dont la France.
          </p>
          <p className="text-secondary leading-relaxed mb-4">
            Concrètement, l&apos;ESTA est un formulaire en ligne que vous remplissez avant votre départ. Il ne
            s&apos;agit pas d&apos;un visa, mais d&apos;une pré-autorisation d&apos;embarquement. L&apos;agent des
            douanes américain garde le pouvoir de vous refuser l&apos;entrée à l&apos;arrivée, même avec un ESTA
            approuvé — mais c&apos;est très rare pour les touristes.
          </p>
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
            <h3 className="font-bold text-lg mb-3"><ClipboardList className="h-5 w-5 inline-block" /> Résumé ESTA en un coup d&apos;œil</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-secondary">
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Prix : <strong>21 $ USD</strong> (≈ 19 €)</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Validité : <strong>2 ans</strong> ou jusqu&apos;à expiration du passeport</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Séjour max : <strong>90 jours</strong> consécutifs</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Délai : quelques minutes à 72h</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Entrées multiples autorisées</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Obligatoire même en transit</span></li>
            </ul>
          </div>
        </section>

        {/* Français = ESTA obligatoire */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-7 w-7 text-accent" />
            En tant que Français, ai-je besoin d&apos;un ESTA ?
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            <strong>Oui, absolument.</strong> La France fait partie des 41 pays éligibles au Visa Waiver Program.
            Si vous êtes titulaire d&apos;un passeport biométrique ou électronique français, vous devez obtenir
            un ESTA pour voyager aux États-Unis par avion ou par mer — que ce soit pour un match de poule à
            New York ou la finale à East Rutherford.
          </p>
          <p className="text-secondary leading-relaxed">
            Sans ESTA valide, votre compagnie aérienne refusera purement et simplement votre embarquement.
            Ne prenez pas ce risque : faites votre demande au minimum 72 heures avant le départ, idéalement
            plusieurs semaines à l&apos;avance.
          </p>
        </section>

        {/* Procédure pas à pas */}
        <section id="procedure">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-7 w-7 text-accent" />
            Procédure ESTA pas à pas
          </h2>
          <p className="text-secondary leading-relaxed mb-6">
            La demande prend environ 15 minutes. Munissez-vous de votre passeport et d&apos;une carte bancaire.
          </p>
          <ol className="space-y-4">
            {[
              {
                step: "1",
                title: "Rendez-vous sur le site officiel",
                desc: (
                  <>
                    Allez sur{" "}
                    <a href="https://esta.cbp.dhs.gov/" target="_blank" rel="noopener noreferrer" className="text-accent underline font-semibold">
                      esta.cbp.dhs.gov
                    </a>{" "}
                    — c&apos;est le <strong>seul site officiel</strong>. Attention aux imitations.
                  </>
                ),
              },
              {
                step: "2",
                title: "Créez un compte ou faites une demande directe",
                desc: "Vous pouvez créer un compte pour gérer vos demandes ou soumettre une demande individuelle/groupe sans compte.",
              },
              {
                step: "3",
                title: "Remplissez le formulaire",
                desc: "Informations personnelles, numéro de passeport, coordonnées aux USA (hôtel prévu), employeur, questions de sécurité (antécédents, maladies, voyages dans certains pays).",
              },
              {
                step: "4",
                title: "Payez les 21 $ par carte",
                desc: "Visa, Mastercard, American Express ou PayPal acceptés. Le paiement est obligatoire pour que la demande soit traitée.",
              },
              {
                step: "5",
                title: "Recevez votre autorisation",
                desc: "Dans la grande majorité des cas, la réponse est immédiate (« Authorization Approved »). Parfois, le traitement peut prendre jusqu'à 72 heures (« Authorization Pending »).",
              },
              {
                step: "6",
                title: "Imprimez ou sauvegardez la confirmation",
                desc: "Bien que l'ESTA soit lié électroniquement à votre passeport, gardez une copie de la confirmation avec votre numéro de demande.",
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

        {/* Pièges à éviter */}
        <section id="pieges">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-red-500" />
            Pièges à éviter : sites frauduleux et faux ESTA
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            Chaque année, des milliers de voyageurs se font arnaquer par des sites qui imitent le site officiel
            de l&apos;ESTA. Ces sites facturent entre 50 € et 80 € pour un simple transfert de données — quand
            ils ne volent pas purement et simplement vos informations personnelles.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50red-950/30 p-4">
              <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-700"><Ban className="h-5 w-5 inline-block" /> Sites à éviter</p>
                <p className="text-sm text-secondary mt-1">
                  Tout site dont l&apos;URL n&apos;est PAS <code className="bg-gray-100gray-800 px-1 rounded">esta.cbp.dhs.gov</code>.
                  Les faux sites utilisent des noms comme &quot;esta-france.com&quot;, &quot;esta-formulaire.fr&quot; ou &quot;us-esta.org&quot;.
                  Ils apparaissent souvent en publicité Google.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50green-950/30 p-4">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-700"><Check className="h-5 w-5 inline-block" /> Le seul site officiel</p>
                <p className="text-sm text-secondary mt-1">
                  <a href="https://esta.cbp.dhs.gov/" target="_blank" rel="noopener noreferrer" className="text-accent underline font-semibold">
                    https://esta.cbp.dhs.gov/
                  </a>{" "}
                  — Coût : 21 $ USD, point final. Si on vous demande plus, c&apos;est une arnaque.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Validité et conditions */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <Clock className="h-7 w-7 text-accent" />
            Durée de validité et conditions
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            Une fois approuvé, votre ESTA est valable <strong>2 ans</strong> à compter de la date d&apos;approbation,
            ou jusqu&apos;à la date d&apos;expiration de votre passeport (si celle-ci intervient avant les 2 ans).
            Pendant cette période, vous pouvez effectuer plusieurs voyages aux États-Unis sans refaire de demande.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border p-5">
              <h3 className="font-bold mb-2"><Check className="h-5 w-5 inline-block" /> Ce que permet l&apos;ESTA</h3>
              <ul className="space-y-2 text-sm text-secondary">
                <li>• Séjour touristique ou affaires jusqu&apos;à 90 jours</li>
                <li>• Entrées multiples pendant 2 ans</li>
                <li>• Transit par les États-Unis</li>
                <li>• Parfait pour la CDM 2026 (39 jours de compétition)</li>
              </ul>
            </div>
            <div className="rounded-xl border p-5">
              <h3 className="font-bold mb-2"><X className="h-5 w-5 inline-block" /> Ce que NE permet PAS l&apos;ESTA</h3>
              <ul className="space-y-2 text-sm text-secondary">
                <li>• Travailler aux États-Unis</li>
                <li>• Étudier (cursus long)</li>
                <li>• Rester plus de 90 jours</li>
                <li>• Immigrer ou chercher la résidence permanente</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cas particuliers */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-7 w-7 text-accent" />
            Cas particuliers
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border p-5">
              <h3 className="font-bold mb-2"><ShieldCheck className="h-5 w-5 inline-block" /> Double nationalité</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Si vous avez la double nationalité (ex. franco-américaine), vous devez entrer aux USA avec votre
                passeport américain — l&apos;ESTA ne sera pas nécessaire. Si votre seconde nationalité est celle
                d&apos;un pays non éligible au VWP (ex. Iran, Irak, Syrie, Soudan, Libye, Yémen, Somalie, Corée
                du Nord), vous ne pouvez <strong>pas</strong> utiliser l&apos;ESTA même avec un passeport français :
                un visa B1/B2 sera obligatoire.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <h3 className="font-bold mb-2"><X className="h-5 w-5 inline-block" /> Refus ESTA : que faire ?</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Un refus ESTA (&quot;Travel Not Authorized&quot;) signifie que vous devez solliciter un visa classique
                auprès de l&apos;ambassade des États-Unis à Paris. Les motifs fréquents : voyage récent en Iran, Irak,
                Syrie, Libye, Somalie, Yémen ou Corée du Nord ; antécédents judiciaires ; séjour précédent prolongé
                aux USA. Prévoyez un rendez-vous consulaire et un délai de plusieurs semaines.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <h3 className="font-bold mb-2"><Baby className="h-5 w-5 inline-block" /> Mineurs</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Chaque voyageur, y compris les enfants et bébés, doit avoir son propre ESTA et son propre passeport
                biométrique. Un parent peut remplir le formulaire pour un mineur.
              </p>
            </div>
          </div>
        </section>

        {/* CDM 2026 spécifique */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
            <Plane className="h-7 w-7 text-accent" />
            ESTA et CDM 2026 : ce qu&apos;il faut savoir
          </h2>
          <p className="text-secondary leading-relaxed mb-4">
            La Coupe du Monde 2026 se déroule du <strong>11 juin au 19 juillet 2026</strong> dans 11 villes
            américaines (ainsi qu&apos;au Canada et au Mexique). Si vous prévoyez de voir des matchs
            uniquement aux États-Unis, un seul ESTA suffit pour tout votre séjour.
          </p>
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
            <h3 className="font-bold text-lg mb-3"><Lightbulb className="h-5 w-5 inline-block" /> Conseils CDM 2026</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li>• <strong>Faites votre ESTA dès maintenant</strong> — valable 2 ans, il couvrira la CDM 2026</li>
              <li>• Si vous voyagez aussi au <Link href="/formalites-canada" className="text-accent underline">Canada</Link> ou au <Link href="/visa-mexique" className="text-accent underline">Mexique</Link>, vous aurez besoin de formalités supplémentaires (AVE, FMM)</li>
              <li>• Vérifiez que votre passeport est valide au-delà du 19 juillet 2026</li>
              <li>• Pour l&apos;adresse aux USA dans le formulaire, indiquez votre hôtel (même si pas encore réservé, mettez une adresse approximative)</li>
              <li>• Si vous faites un road trip entre plusieurs villes hôtes (ex. New York → Philadelphie → Miami), un seul ESTA couvre tout le territoire américain</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-accent p-6 sm:p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">🇺🇸 Faites votre ESTA maintenant</h2>
          <p className="mb-5 text-white/80">
            21 $, 15 minutes, valable 2 ans. N&apos;attendez pas la dernière minute.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://esta.cbp.dhs.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-accent px-6 py-3.5 font-bold hover:bg-white/90 transition-all"
            >
              <ExternalLink className="h-4 w-4" />
              Site officiel ESTA
            </a>
            <Link
              href="/billets"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-bold hover:bg-white/10 transition-all"
            >
              <Ticket className="h-5 w-5 inline-block" /> Acheter ses billets CDM 2026
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          title=" Questions fréquentes — ESTA et CDM 2026"
          items={faqItems}
        />

        {/* Liens connexes */}
        <section>
          <h2 className="text-2xl font-bold mb-4"><Pin className="h-5 w-5 inline-block" /> Voir aussi</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { href: "/visa-mexique", icon: "🇲🇽", title: "Formalités Mexique", desc: "FMM, documents nécessaires et conseils pour les matchs au Mexique." },
              { href: "/formalites-canada", icon: "🇨🇦", title: "Formalités Canada (AVE)", desc: "Autorisation de Voyage Électronique pour les matchs à Vancouver et Toronto." },
              { href: "/billets", icon: "", title: "Billets CDM 2026", desc: "Prix, dates de vente et comment acheter ses places sur FIFA.com." },
              { href: "/assurance-voyage", icon: "", title: "Assurance voyage", desc: "Comparatif des assurances voyage pour la CDM 2026." },
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
