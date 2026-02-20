/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";

import { TVFranceSection } from "./TVFranceSection";
import { StreamingFranceSection } from "./StreamingFranceSection";
import { FrancophoneTVSection } from "./FrancophoneTVSection";
import { InternationalBroadcasters } from "./InternationalBroadcasters";
import { TVScheduleSection } from "./TVScheduleSection";
import { TimeZoneSection } from "./TimeZoneSection";
import { FAQSection } from "@repo/ui/faq-section";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { TableOfContents } from "@repo/ui";
import { RelatedLinks } from "../components/RelatedLinks";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

export const metadata: Metadata = {
  title: "Où regarder la Coupe du Monde 2026 | TV, streaming, horaires",
  description:
    "Où regarder la Coupe du Monde 2026 : chaînes TV par pays, streaming légal gratuit et payant, VPN et FAQ. Guide complet.",
  openGraph: {
    title: "Où regarder la CDM 2026 — TV & Streaming par pays",
    description:
      "TF1, M6, beIN Sports, BBC, Fox Sports… Tout ce qu'il faut savoir pour ne rater aucun match du Mondial 2026.",
    url: "https://cdm2026.fr/ou-regarder",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const tvFranceDetailed = [
  {
    name: "TF1",
    type: "Gratuit (TNT)",
    matches: "Matchs de la France + finale + demi-finales",
    details: "Chaîne historique du foot français. Diffuse tous les matchs des Bleus, les demi-finales et la finale en clair. Droits en cours de finalisation.",
    logo: "/images/logos/tf1.png",
    free: true,
  },
  {
    name: "M6",
    type: "Gratuit (TNT)",
    matches: "54 matchs",
    details: "Co-diffusion avec TF1 sur certains matchs clés (ouverture, quarts). Large couverture de la phase de groupes et des 8es de finale.",
    logo: "/images/logos/m6.png",
    free: true,
  },
  {
    name: "beIN Sports",
    type: "Abonnement (~15 €/mois)",
    matches: "104 matchs (intégralité)",
    details: "Seul diffuseur à proposer l'intégralité des 104 matchs du tournoi. Studio d'analyse, multi-diffusion sur beIN Sports 1, 2 et 3.",
    logo: "/images/logos/bein.png",
    free: false,
  },
];

const streamingFrance = {
  gratuit: [
    { name: "TF1+", url: "https://www.tf1.fr/", desc: "Streaming gratuit des matchs TF1 (France, demi-finales, finale). App iOS, Android, Smart TV." },
    { name: "M6+", url: "https://www.6play.fr/", desc: "Streaming gratuit des 54 matchs M6. Disponible sur mobile et navigateur." },
    { name: "Molotov", url: "https://www.molotov.tv/", desc: "Accès gratuit aux chaînes TNT (TF1, M6). Replay et start-over disponibles." },
  ],
  payant: [
    { name: "myCANAL", url: "https://www.canalplus.com/", desc: "Pour les abonnés beIN Sports via Canal+. Tous les 104 matchs en streaming.", price: "~35 €/mois (pack sport)" },
    { name: "beIN Connect", url: "https://connect.bein.net/", desc: "Service streaming officiel beIN Sports. Intégralité du tournoi en direct et replay.", price: "~15 €/mois" },
    { name: "Amazon Prime Video (Ligue 1 Pass)", url: "https://www.primevideo.com/", desc: "Possibilité d'ajout du pass beIN Sports. À confirmer pour la CDM 2026.", price: "~15 €/mois (en sus)" },
  ],
};

const tvByCountryFrancophone = [
  {
    country: "🇧🇪 Belgique",
    channels: [
      { name: "RTBF (La Une / La Deux)", type: "Gratuit", matches: "Matchs des Diables Rouges + sélection", details: "Service public belge francophone, diffusion en clair." },
      { name: "RTL Belgium", type: "Gratuit", matches: "Sélection de matchs", details: "Co-diffusion avec RTBF pour les grands rendez-vous." },
      { name: "Eleven Sports", type: "Abonnement (~7 €/mois)", matches: "Intégralité des matchs", details: "Plateforme dédiée au sport." },
    ],
    streaming: [
      { name: "Auvio (RTBF)", url: "https://www.rtbf.be/auvio/", free: true, desc: "Streaming gratuit des matchs RTBF." },
      { name: "Eleven+ / Pickx", url: "https://www.proximus.be/", free: false, desc: "Streaming Eleven Sports via Proximus Pickx." },
    ],
  },
  {
    country: "🇨🇭 Suisse",
    channels: [
      { name: "RTS (RTS 1 / RTS 2)", type: "Gratuit", matches: "Matchs de la Nati + sélection", details: "Service public romand." },
      { name: "SRF (SRF 2)", type: "Gratuit (en allemand)", matches: "Sélection de matchs", details: "Télévision publique alémanique." },
      { name: "Blue TV / Teleclub", type: "Abonnement", matches: "Intégralité", details: "Droits étendus pour les abonnés Sunrise/UPC." },
    ],
    streaming: [
      { name: "Play RTS", url: "https://www.rts.ch/play/", free: true, desc: "Streaming gratuit RTS. Live et replay." },
      { name: "Blue TV", url: "https://blue.ch/", free: false, desc: "Streaming Sunrise/UPC avec droits complets." },
    ],
  },
  {
    country: "🇨🇦 Canada (franco)",
    channels: [
      { name: "TVA Sports", type: "Abonnement", matches: "Matchs en français", details: "Chaîne sportive du groupe Québecor." },
      { name: "RDS", type: "Abonnement", matches: "Sélection matchs FR", details: "Réseau Des Sports, diffusion en français au Québec." },
      { name: "TSN / CTV", type: "Abonnement / Gratuit", matches: "Matchs en anglais", details: "TSN pour les droits complets, CTV pour les grands matchs en clair." },
    ],
    streaming: [
      { name: "TVA+", url: "https://www.tvasports.ca/", free: false, desc: "Streaming TVA Sports." },
      { name: "TSN Direct", url: "https://www.tsn.ca/", free: false, desc: "Streaming TSN, anglophone, droits complets." },
    ],
  },
];

const internationalBroadcasters = [
  { flag: "🇺🇸", country: "États-Unis", channels: "Fox Sports / Telemundo", details: "Fox (anglais) + Telemundo (espagnol). Streaming sur Peacock et Tubi.", free: "Telemundo (espagnol)" },
  { flag: "🇬🇧", country: "Royaume-Uni", channels: "BBC / ITV", details: "Couverture partagée entre BBC (iPlayer gratuit) et ITV (ITVX gratuit).", free: "BBC iPlayer + ITVX" },
  { flag: "🇩🇪", country: "Allemagne", channels: "ARD / ZDF", details: "Service public allemand, intégralité en clair. Streaming sur ARD/ZDF Mediathek.", free: "Oui (intégralité)" },
  { flag: "🇪🇸", country: "Espagne", channels: "TVE (RTVE)", details: "Télévision publique espagnole. Streaming gratuit sur RTVE Play.", free: "Oui (RTVE Play)" },
  { flag: "🇮🇹", country: "Italie", channels: "RAI", details: "RAI 1 et RAI Sport. Streaming gratuit sur RaiPlay.", free: "Oui (RaiPlay)" },
  { flag: "🇧🇷", country: "Brésil", channels: "Globo", details: "TV Globo en clair + Globoplay (streaming). Plus grande audience mondiale.", free: "TV Globo + Globoplay" },
  { flag: "🇲🇽", country: "Mexique", channels: "Televisa / TV Azteca", details: "Double diffusion en clair. Pays hôte avec forte couverture.", free: "Oui (les deux)" },
];

const featuredMatches = [
  { id: "m01", date: "Jeu 11 juin 2026", timeFR: "21h00", match: "Mexique 🇲🇽 vs 🇿🇦 Afrique du Sud", stage: "Phase de groupes — Gr. A", stadium: "Estadio Azteca, Mexico", tvFR: ["TF1", "M6", "beIN Sports 1"], isFrance: false, note: " Match d'ouverture", free: true },
  { id: "m17", date: "Mar 16 juin 2026", timeFR: "21h00", match: "France 🇫🇷 vs 🇸🇳 Sénégal", stage: "Phase de groupes — Gr. I", stadium: "MetLife Stadium, New York/NJ", tvFR: ["TF1", "beIN Sports 1"], isFrance: true, note: "🇫🇷 Premier match des Bleus", free: true },
  { id: "m43", date: "Lun 22 juin 2026", timeFR: "21h00", match: "France 🇫🇷 vs Barrage Interconf. 2", stage: "Phase de groupes — Gr. I", stadium: "Lincoln Financial Field, Philadelphia", tvFR: ["TF1", "beIN Sports 1"], isFrance: true, note: "🇫🇷 Bleus J2", free: true },
  { id: "m66", date: "Ven 26 juin 2026", timeFR: "21h00", match: "Norvège 🇳🇴 vs 🇫🇷 France", stage: "Phase de groupes — Gr. I", stadium: "Gillette Stadium, Boston", tvFR: ["TF1", "beIN Sports 1"], isFrance: true, note: "🇫🇷 Bleus J3 (décisif !)", free: true },
  { id: "sf1", date: "Mar 15 juil. 2026", timeFR: "21h00", match: "Demi-finale 1", stage: "Demi-finale", stadium: "MetLife Stadium, New York/NJ", tvFR: ["TF1", "beIN Sports 1"], isFrance: false, note: " Demi-finale", free: true },
  { id: "sf2", date: "Mer 16 juil. 2026", timeFR: "21h00", match: "Demi-finale 2", stage: "Demi-finale", stadium: "AT&T Stadium, Dallas", tvFR: ["TF1", "beIN Sports 1"], isFrance: false, note: " Demi-finale", free: true },
  { id: "final", date: "Dim 19 juil. 2026", timeFR: "21h00", match: "Finale — Coupe du Monde 2026", stage: "Finale", stadium: "MetLife Stadium, New York/NJ", tvFR: ["TF1", "beIN Sports 1"], isFrance: false, note: " Grand final du Mondial", free: true },
];

const timeZones = [
  { city: "New York / Miami / Atlanta / Philly / Boston", utcOffset: "UTC-4 (EDT)", frDiff: "-6h", frTime: "19h → 1h du matin" },
  { city: "Chicago / Houston / Dallas / Kansas City", utcOffset: "UTC-5 (CDT)", frDiff: "-7h", frTime: "19h → 2h du matin" },
  { city: "Denver", utcOffset: "UTC-6 (MDT)", frDiff: "-8h", frTime: "19h → 3h du matin" },
  { city: "Los Angeles / Seattle / San Francisco / Vancouver", utcOffset: "UTC-7 (PDT)", frDiff: "-9h", frTime: "19h → 4h du matin" },
  { city: "Mexico City / Guadalajara / Monterrey / Toronto", utcOffset: "UTC-5 (CDT)", frDiff: "-7h", frTime: "19h → 2h du matin" },
];

const typicalSchedule = [
  { local: "13h00 (EDT)", france: "19h00 (CEST)", note: "1er créneau — soirée accessible ", hot: true },
  { local: "16h00 (EDT)", france: "22h00 (CEST)", note: "2e créneau — début de soirée" },
  { local: "19h00 (EDT)", france: "01h00 (CEST+1)", note: "3e créneau — tard dans la nuit 🌙" },
  { local: "21h00 (EDT)", france: "03h00 (CEST+1)", note: "4e créneau — milieu de nuit " },
];

const faqItems = [
  { question: "Peut-on regarder la CDM 2026 gratuitement en France ?", answer: "Oui ! TF1 diffusera les matchs de la France, les demi-finales et la finale en clair. M6 proposera 54 matchs en clair. En streaming gratuit : TF1+, M6+ (6play) et Molotov permettent de suivre ces matchs sans abonnement." },
  { question: "Combien de matchs sont diffusés sur chaque chaîne en France ?", answer: "beIN Sports diffuse l'intégralité des 104 matchs (abonnement requis). M6 propose 54 matchs en clair. TF1 couvre les matchs de la France, les demi-finales et la finale. Certains matchs clés sont en co-diffusion TF1/M6." },
  { question: "Quel est le décalage horaire entre la France et les États-Unis ?", answer: "En été (heure CEST, UTC+2), le décalage est de -6h avec la côte Est (New York), -7h avec le centre (Dallas, Chicago), et -9h avec la côte Ouest (Los Angeles). Un match à 19h locale à New York est diffusé à 1h du matin en France." },
  { question: "Comment regarder tous les matchs de la CDM 2026 ?", answer: "Pour voir les 104 matchs, un abonnement beIN Sports (~15 €/mois) est nécessaire. Accessible via beIN Connect, myCANAL ou Amazon Prime Video (pass beIN). Sans abonnement, TF1 et M6 couvrent une large sélection en clair." },
  { question: "Comment regarder la CDM 2026 depuis l'étranger ?", answer: "Si vous êtes à l'étranger, les plateformes françaises (TF1+, M6+) sont géo-bloquées. Un VPN permet de simuler une connexion depuis la France. Choisissez un VPN fiable (NordVPN, ExpressVPN, CyberGhost), connectez-vous à un serveur français, puis accédez normalement aux plateformes de streaming." },
  { question: "Peut-on regarder la CDM 2026 sur téléphone ?", answer: "Oui. TF1+, M6+, beIN Connect, myCANAL et Molotov proposent tous des applications mobiles iOS et Android. Les matchs gratuits sur TF1+ et M6+ ne nécessitent aucun abonnement." },
  { question: "La CDM 2026 est-elle diffusée gratuitement dans d'autres pays ?", answer: "Oui ! Au Royaume-Uni (BBC iPlayer + ITVX), en Allemagne (ARD/ZDF Mediathek), en Espagne (RTVE Play), en Italie (RaiPlay), au Brésil (Globoplay) et au Mexique (Televisa/TV Azteca) — la Coupe du Monde est diffusée gratuitement sur les chaînes publiques." },
  { question: "Quelles chaînes diffusent la CDM 2026 aux États-Unis ?", answer: "Fox Sports (en anglais) et Telemundo (en espagnol) détiennent les droits TV aux États-Unis. Le streaming est disponible sur Peacock (NBC) et Tubi (Fox). Telemundo est accessible gratuitement." },
  { question: "Existe-t-il des fan zones en France pour la CDM 2026 ?", answer: "Les fan zones officielles seront annoncées par les municipalités et la FFF. Paris, Lyon, Marseille, Bordeaux et Lille proposeront très probablement des écrans géants. Les bars sportifs retransmettront également tous les matchs." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OuRegarderPage() {
  return (
    <>
      <BreadcrumbSchema items={[{"name":"Accueil","url":"/"},{"name":"Où regarder","url":"/ou-regarder"}]} baseUrl={domains.fr} />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Où regarder les matchs" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Diffusion & Streaming</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4"> Où regarder la Coupe du Monde 2026</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Guide complet des droits TV et du streaming légal pour suivre les 104 matchs du Mondial 2026.
            France en détail, pays francophones et diffuseurs internationaux.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8" id="main-content">
        <div>
        <TVFranceSection tvFranceDetailed={tvFranceDetailed} />
        <StreamingFranceSection gratuit={streamingFrance.gratuit} payant={streamingFrance.payant} />
        <FrancophoneTVSection tvByCountryFrancophone={tvByCountryFrancophone} />
        <InternationalBroadcasters internationalBroadcasters={internationalBroadcasters} />

        {/* VPN Section */}
        <section className="mb-14">
          <h2 id="vpn" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🌐 Comment regarder depuis l&apos;étranger (VPN)
          </h2>
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow md:p-8">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Les plateformes de streaming françaises (TF1+, M6+, myCANAL) sont <strong className="text-gray-900 dark:text-gray-100">géo-bloquées</strong> à
              l&apos;étranger. Un VPN (Virtual Private Network) vous permet de simuler une connexion depuis la France
              pour accéder aux flux en direct.
            </p>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              {[
                { step: "1", title: "Choisir un VPN", desc: "Optez pour un VPN fiable avec des serveurs en France : NordVPN, ExpressVPN, CyberGhost ou Surfshark." },
                { step: "2", title: "Se connecter à un serveur 🇫🇷", desc: "Lancez le VPN et sélectionnez un serveur situé en France (Paris, Lyon…)." },
                { step: "3", title: "Regarder les matchs", desc: "Accédez à TF1+, M6+ ou beIN Connect normalement. Le streaming fonctionne comme si vous étiez en France." },
              ].map((s) => (
                <div key={s.step} className="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-5">
                  <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary text-white flex items-center justify-center font-extrabold text-lg mb-3">
                    {s.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-accent/10 dark:bg-accent/10 border border-accent/30 dark:border-accent/20 rounded-xl text-sm text-accent dark:text-accent">
              <p className="font-semibold">Légalité du VPN</p>
              <p className="mt-1">
                L&apos;utilisation d&apos;un VPN est légale en France et dans la plupart des pays. Cependant, contourner un géo-blocage
                peut enfreindre les conditions d&apos;utilisation de certaines plateformes. Nous recommandons de vérifier les conditions
                du service que vous utilisez.
              </p>
            </div>
          </div>
        </section>

        <TVScheduleSection featuredMatches={featuredMatches} />
        <TimeZoneSection timeZones={timeZones} typicalSchedule={typicalSchedule} />

        {/* Fan Zones */}
        <section className="mb-14">
          <h2 id="fan-zones" className="text-2xl font-bold text-gray-900 dark:text-white mb-4"> Bars & Fan Zones</h2>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fan zones officielles</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                  Les fan zones officielles en France seront annoncées prochainement par les municipalités et la FFF.
                  Paris, Lyon, Marseille, Bordeaux et Lille proposeront très probablement des écrans géants et des animations.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
                  Cette section sera mise à jour dès l&apos;annonce officielle des fan zones.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FAQSection items={faqItems} />

        <RelatedLinks
          links={[
            {
              href: "/match/calendrier",
              title: "📅 Calendrier des matchs",
              description: "Tous les matchs avec dates, horaires et stades. Filtrez par phase ou équipe.",
              icon: "📅"
            },
            {
              href: "/billets",
              title: "🎫 Billets CDM 2026",
              description: "Prix, dates de vente et conseils pour acheter vos billets sur FIFA.com.",
              icon: "🎫"
            },
            {
              href: "/quiz",
              title: "🧠 Quiz CDM 2026",
              description: "Testez vos connaissances sur la Coupe du Monde et les équipes participantes.",
              icon: "🧠"
            }
          ]}
        />

        {/* CTA */}
        <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Envie de parier sur les matchs ?
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Comparez les cotes des meilleurs bookmakers français pour la CDM 2026.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/comparateur-cotes"
              className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition"
            >
              Comparateur de cotes →
            </Link>
            <Link
              href="/carte-stades"
              className="inline-block bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 font-bold px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
               Carte des stades
            </Link>
          </div>
        </div>
        </div>
        <TableOfContents items={[
          { id: "tv-france", label: "TV en France", level: 2 },
          { id: "streaming-france", label: "Streaming France", level: 2 },
          { id: "tv-francophone", label: "Belgique, Suisse, Canada", level: 2 },
          { id: "diffuseurs-internationaux", label: "International", level: 2 },
          { id: "vpn", label: "VPN & étranger", level: 2 },
          { id: "programme-tv", label: "Programme TV", level: 2 },
          { id: "decalage-horaire", label: "Décalage horaire", level: 2 },
          { id: "horaires-types", label: "Horaires types", level: 2 },
          { id: "fan-zones", label: "Bars & Fan Zones", level: 2 },
        ]} />
      </main>
    </>
  );
}
