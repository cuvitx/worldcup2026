import type { Metadata } from "next";
import Link from "next/link";
import { TableOfContents } from "@repo/ui";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { ShieldCheck, TrainFront } from "lucide-react"
export const metadata: Metadata = {
  title: "Visa ESTA pour les USA — Tout savoir pour la CDM 2026",
  description:
    "Guide complet sur le Visa ESTA pour assister à la Coupe du Monde 2026 aux États-Unis. Procédure, délais, coût, conseils et FAQ.",
  alternates: {
    canonical: "https://www.cdm2026.fr/guide/guide-visa-esta",
  },
  openGraph: {
    title: "Visa ESTA pour les USA — Guide CDM 2026",
    description: "Tout savoir sur l'ESTA pour voyager aux USA pendant la Coupe du Monde 2026.",
    type: "article",
    publishedTime: "2026-02-19",
  },
};

export default function GuideVisaEsta() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Visa ESTA pour les USA : tout savoir pour la CDM 2026",
    description: metadata.description,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: { "@type": "Organization", name: "CDM 2026" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://www.cdm2026.fr" },
    mainEntityOfPage: "https://www.cdm2026.fr/guide/guide-visa-esta",
    image: "https://www.cdm2026.fr/og-default.jpg",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Qu'est-ce que l'ESTA ?",
        acceptedAnswer: { "@type": "Answer", text: "L'ESTA (Electronic System for Travel Authorization) est une autorisation électronique de voyage pour les ressortissants des pays participants au Programme d'Exemption de Visa (VWP). Elle permet de séjourner aux USA jusqu'à 90 jours pour le tourisme ou les affaires." },
      },
      {
        "@type": "Question",
        name: "Combien coûte l'ESTA en 2026 ?",
        acceptedAnswer: { "@type": "Answer", text: "L'ESTA coûte 21 USD (environ 19 €). Méfiez-vous des sites intermédiaires qui facturent bien plus cher. Seul le site officiel esta.cbp.dhs.gov est recommandé." },
      },
      {
        "@type": "Question",
        name: "Combien de temps faut-il pour obtenir l'ESTA ?",
        acceptedAnswer: { "@type": "Answer", text: "La réponse est généralement immédiate ou sous 72 heures. En période de forte demande (comme avant la CDM 2026), prévoyez au moins 2 semaines de marge." },
      },
      {
        "@type": "Question",
        name: "L'ESTA est-elle valable pour le Mexique et le Canada aussi ?",
        acceptedAnswer: { "@type": "Answer", text: "Non, l'ESTA n'est valable que pour les États-Unis. Pour le Mexique, les ressortissants français n'ont pas besoin de visa pour un séjour touristique de moins de 180 jours. Pour le Canada, une AVE (Autorisation de Voyage Électronique) est nécessaire." },
      },
      {
        "@type": "Question",
        name: "Puis-je assister à des matchs dans les 3 pays avec un seul document ?",
        acceptedAnswer: { "@type": "Answer", text: "Non, vous aurez besoin de l'ESTA pour les USA, de l'AVE pour le Canada, et votre passeport suffira pour le Mexique (pour les Français). Préparez les trois documents si vous comptez voyager entre les pays." },
      },
    ],
  };

  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Guide Visa & ESTA" },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-5xl px-4 py-10 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div>
        <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-gray-500">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link href="/" className="text-primary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/guides" className="text-primary hover:underline">Guides</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Visa ESTA</li>
          </ol>
        </nav>

        <article className="prose prose-lg max-w-none">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Guide pratique</span>
            <time className="text-sm text-gray-500" dateTime="2026-02-19">19 février 2026</time>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl mb-6">
            <ShieldCheck className="h-5 w-5 inline-block" /> Visa ESTA pour les USA : tout savoir pour la CDM 2026
          </h1>

          <p className="text-lg text-gray-600 font-medium mb-8 not-prose">
            La majorité des matchs de la Coupe du Monde 2026 se joueront aux États-Unis. Pour les ressortissants français et européens, l&apos;ESTA est le document indispensable. Voici tout ce qu&apos;il faut savoir.
          </p>

          <h2 id="esta-definition">Qu&apos;est-ce que l&apos;ESTA ?</h2>
          <p>
            L&apos;ESTA (Electronic System for Travel Authorization) est une <strong>autorisation électronique de voyage</strong> obligatoire pour entrer aux États-Unis sans visa. Elle concerne les ressortissants des 41 pays participants au Programme d&apos;Exemption de Visa (Visa Waiver Program), dont la France, la Belgique, la Suisse et la plupart des pays européens.
          </p>
          <p>
            L&apos;ESTA permet un séjour de <strong>90 jours maximum</strong> pour le tourisme ou les affaires. Elle est valable <strong>2 ans</strong> ou jusqu&apos;à expiration du passeport (la date la plus proche).
          </p>

          <h2 id="demande-esta">Comment faire sa demande ESTA ?</h2>
          <h3>Étape 1 : Préparer les documents</h3>
          <p>
            Vous aurez besoin de votre <strong>passeport biométrique ou électronique</strong> en cours de validité, d&apos;une adresse e-mail, d&apos;une carte bancaire pour le paiement et de vos coordonnées d&apos;hébergement aux USA (hôtel ou adresse d&apos;un proche).
          </p>

          <h3>Étape 2 : Remplir le formulaire en ligne</h3>
          <p>
            Rendez-vous sur le <strong>site officiel</strong> : <a href="https://esta.cbp.dhs.gov" target="_blank" rel="noopener noreferrer">esta.cbp.dhs.gov</a>. Attention aux sites intermédiaires qui facturent des frais supplémentaires ! Le formulaire prend environ 15 minutes à remplir. Les questions portent sur votre identité, votre voyage et des questions de sécurité standard.
          </p>

          <h3>Étape 3 : Payer et attendre la réponse</h3>
          <p>
            Le coût est de <strong>21 USD</strong> (environ 19 €). La réponse est généralement <strong>immédiate</strong>, mais peut prendre jusqu&apos;à 72 heures. Trois réponses possibles : Autorisation approuvée, Voyage non autorisé, ou Autorisation en attente.
          </p>

          <h2 id="delais">Délais et timing recommandés</h2>
          <p>
            En période de Coupe du Monde, le volume de demandes ESTA va exploser. Nous recommandons de faire votre demande <strong>au minimum 3 mois avant votre départ</strong>. Si vous avez déjà un ESTA valide, vérifiez sa date d&apos;expiration dès maintenant.
          </p>

          <div className="not-prose my-8 rounded-xl bg-accent/10 border border-accent/30 p-6">
            <h3 className="text-lg font-semibold text-gray-900 text-accent mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> Attention aux arnaques</h3>
            <p className="text-sm text-accent">
              De nombreux sites frauduleux proposent des « ESTA express  à des prix exorbitants (50-100 €). Le seul site officiel est <strong>esta.cbp.dhs.gov</strong>. Ne payez jamais plus de 21 USD.
            </p>
          </div>

          <h2 id="mexique-canada">Et pour le Mexique et le Canada ?</h2>
          <h3>Mexique</h3>
          <p>
            Bonne nouvelle pour les Français : <strong>aucun visa n&apos;est nécessaire</strong> pour un séjour touristique de moins de 180 jours au Mexique. Un passeport valide suffit. Vous recevrez un formulaire migratoire (FMM) à votre arrivée. Les matchs auront lieu à Mexico (Estadio Azteca), Guadalajara et Monterrey.
          </p>

          <h3>Canada</h3>
          <p>
            Pour le Canada, les ressortissants français ont besoin d&apos;une <strong>AVE (Autorisation de Voyage Électronique)</strong>, l&apos;équivalent canadien de l&apos;ESTA. Le coût est de 7 CAD (environ 5 €), et la demande se fait en ligne sur le site officiel du gouvernement canadien. Les matchs canadiens se joueront à Toronto et Vancouver.
          </p>

          <h2 id="conseils">Conseils pratiques pour les supporters</h2>
          <ul>
            <li><strong>Passeport valide 6 mois après la date de retour</strong> : vérifiez dès maintenant la validité de votre passeport</li>
            <li><strong>Assurance voyage</strong> : indispensable aux USA où les frais médicaux sont exorbitants. Budget 50-100 € pour la durée du séjour</li>
            <li><strong>Photocopies</strong> : gardez des copies numériques de tous vos documents dans votre téléphone et votre e-mail</li>
            <li><strong>Douanes</strong> : déclarez tout ce qui doit l&apos;être. Les contrôles à l&apos;entrée aux USA sont stricts</li>
          </ul>

          <h2 id="faq">FAQ — Visa ESTA CDM 2026</h2>

          <h3>Puis-je entrer aux USA avec un passeport périmé et un ESTA valide ?</h3>
          <p>Non. Votre passeport doit être valide pendant toute la durée de votre séjour, et idéalement 6 mois après votre date de retour.</p>

          <h3>Mon ESTA a été refusé, que faire ?</h3>
          <p>En cas de refus, vous devez faire une demande de visa classique (B1/B2) auprès de l&apos;ambassade des États-Unis. Prévoyez un délai de 2-3 mois pour le rendez-vous et le traitement.</p>

          <h3>L&apos;ESTA suffit-elle pour travailler aux USA ?</h3>
          <p>Non. L&apos;ESTA est strictement réservée au tourisme et aux voyages d&apos;affaires courts. Toute activité rémunérée nécessite un visa de travail.</p>

          <h3>Puis-je modifier mon ESTA après validation ?</h3>
          <p>Certaines informations (adresse aux USA, numéro de vol) peuvent être modifiées. Pour toute modification de données d&apos;identité, une nouvelle demande est nécessaire.</p>
        </article>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Guides liés</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/guide/guide-hebergement" className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900">Où dormir pendant la CDM 2026</h3>
              <p className="text-sm text-gray-500 mt-1">Guide hébergement villes hôtes</p>
            </Link>
            <Link href="/guide/guide-transport" className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900"><TrainFront className="h-5 w-5 inline-block" /> Se déplacer entre les stades</h3>
              <p className="text-sm text-gray-500 mt-1">Transport inter-villes et logistique</p>
            </Link>
            <Link href="/guide/guide-budget" className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900"> Budget CDM 2026</h3>
              <p className="text-sm text-gray-500 mt-1">Combien ça coûte ? Estimation complète</p>
            </Link>
            <Link href="/stades" className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900"> Les stades de la CDM 2026</h3>
              <p className="text-sm text-gray-500 mt-1">Tous les stades du Mondial</p>
            </Link>
          </div>
        </div>
        </div>
        <TableOfContents items={[
          { id: "esta-definition", label: "Qu'est-ce que l'ESTA ?", level: 2 },
          { id: "demande-esta", label: "Faire sa demande", level: 2 },
          { id: "delais", label: "Délais recommandés", level: 2 },
          { id: "mexique-canada", label: "Mexique & Canada", level: 2 },
          { id: "conseils", label: "Conseils pratiques", level: 2 },
          { id: "faq", label: "FAQ", level: 2 },
        ]} />
      </div>
    </>
  );
}
