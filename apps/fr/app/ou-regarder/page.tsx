import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Où regarder la Coupe du Monde 2026 | TV, streaming, horaires",
  description:
    "Toutes les infos pour regarder la Coupe du Monde 2026 : chaînes TV par pays (France, Belgique, Suisse, Canada + international), streaming légal gratuit et payant, VPN et FAQ complète.",
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
    details:
      "Chaîne historique du foot français. Diffuse tous les matchs des Bleus, les demi-finales et la finale en clair. Droits en cours de finalisation.",
    logo: "/images/logos/tf1.png",
    free: true,
  },
  {
    name: "M6",
    type: "Gratuit (TNT)",
    matches: "54 matchs",
    details:
      "Co-diffusion avec TF1 sur certains matchs clés (ouverture, quarts). Large couverture de la phase de groupes et des 8es de finale.",
    logo: "/images/logos/m6.png",
    free: true,
  },
  {
    name: "beIN Sports",
    type: "Abonnement (~15 €/mois)",
    matches: "104 matchs (intégralité)",
    details:
      "Seul diffuseur à proposer l'intégralité des 104 matchs du tournoi. Studio d'analyse, multi-diffusion sur beIN Sports 1, 2 et 3.",
    logo: "/images/logos/bein.png",
    free: false,
  },
];

const streamingFrance = {
  gratuit: [
    {
      name: "TF1+",
      url: "https://www.tf1.fr/",
      desc: "Streaming gratuit des matchs TF1 (France, demi-finales, finale). App iOS, Android, Smart TV.",
    },
    {
      name: "M6+",
      url: "https://www.6play.fr/",
      desc: "Streaming gratuit des 54 matchs M6. Disponible sur mobile et navigateur.",
    },
    {
      name: "Molotov",
      url: "https://www.molotov.tv/",
      desc: "Accès gratuit aux chaînes TNT (TF1, M6). Replay et start-over disponibles.",
    },
  ],
  payant: [
    {
      name: "myCANAL",
      url: "https://www.canalplus.com/",
      desc: "Pour les abonnés beIN Sports via Canal+. Tous les 104 matchs en streaming.",
      price: "~35 €/mois (pack sport)",
    },
    {
      name: "beIN Connect",
      url: "https://connect.bein.net/",
      desc: "Service streaming officiel beIN Sports. Intégralité du tournoi en direct et replay.",
      price: "~15 €/mois",
    },
    {
      name: "Amazon Prime Video (Ligue 1 Pass)",
      url: "https://www.primevideo.com/",
      desc: "Possibilité d'ajout du pass beIN Sports. À confirmer pour la CDM 2026.",
      price: "~15 €/mois (en sus)",
    },
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

// ─── Matchs à suivre — programme TV ───────────────────────────────────────────
const featuredMatches = [
  {
    id: "m01",
    date: "Jeu 11 juin 2026",
    timeFR: "21h00",
    match: "Mexique 🇲🇽 vs 🇿🇦 Afrique du Sud",
    stage: "Phase de groupes — Gr. A",
    stadium: "Estadio Azteca, Mexico",
    tvFR: ["TF1", "M6", "beIN Sports 1"],
    isFrance: false,
    note: "🎉 Match d'ouverture",
    free: true,
  },
  {
    id: "m17",
    date: "Mar 16 juin 2026",
    timeFR: "21h00",
    match: "France 🇫🇷 vs 🇸🇳 Sénégal",
    stage: "Phase de groupes — Gr. I",
    stadium: "MetLife Stadium, New York/NJ",
    tvFR: ["TF1", "beIN Sports 1"],
    isFrance: true,
    note: "🇫🇷 Premier match des Bleus",
    free: true,
  },
  {
    id: "m43",
    date: "Lun 22 juin 2026",
    timeFR: "21h00",
    match: "France 🇫🇷 vs Barrage Interconf. 2",
    stage: "Phase de groupes — Gr. I",
    stadium: "Lincoln Financial Field, Philadelphia",
    tvFR: ["TF1", "beIN Sports 1"],
    isFrance: true,
    note: "🇫🇷 Bleus J2",
    free: true,
  },
  {
    id: "m66",
    date: "Ven 26 juin 2026",
    timeFR: "21h00",
    match: "Norvège 🇳🇴 vs 🇫🇷 France",
    stage: "Phase de groupes — Gr. I",
    stadium: "Gillette Stadium, Boston",
    tvFR: ["TF1", "beIN Sports 1"],
    isFrance: true,
    note: "🇫🇷 Bleus J3 (décisif !)",
    free: true,
  },
  {
    id: "sf1",
    date: "Mar 15 juil. 2026",
    timeFR: "21h00",
    match: "Demi-finale 1",
    stage: "Demi-finale",
    stadium: "MetLife Stadium, New York/NJ",
    tvFR: ["TF1", "beIN Sports 1"],
    isFrance: false,
    note: "🔥 Demi-finale",
    free: true,
  },
  {
    id: "sf2",
    date: "Mer 16 juil. 2026",
    timeFR: "21h00",
    match: "Demi-finale 2",
    stage: "Demi-finale",
    stadium: "AT&T Stadium, Dallas",
    tvFR: ["TF1", "beIN Sports 1"],
    isFrance: false,
    note: "🔥 Demi-finale",
    free: true,
  },
  {
    id: "final",
    date: "Dim 19 juil. 2026",
    timeFR: "21h00",
    match: "Finale — Coupe du Monde 2026",
    stage: "Finale",
    stadium: "MetLife Stadium, New York/NJ",
    tvFR: ["TF1", "beIN Sports 1"],
    isFrance: false,
    note: "🏆 Grand final du Mondial",
    free: true,
  },
];

const timeZones = [
  { city: "New York / Miami / Atlanta / Philly / Boston", utcOffset: "UTC-4 (EDT)", frDiff: "-6h", frTime: "19h → 1h du matin" },
  { city: "Chicago / Houston / Dallas / Kansas City", utcOffset: "UTC-5 (CDT)", frDiff: "-7h", frTime: "19h → 2h du matin" },
  { city: "Denver", utcOffset: "UTC-6 (MDT)", frDiff: "-8h", frTime: "19h → 3h du matin" },
  { city: "Los Angeles / Seattle / San Francisco / Vancouver", utcOffset: "UTC-7 (PDT)", frDiff: "-9h", frTime: "19h → 4h du matin" },
  { city: "Mexico City / Guadalajara / Monterrey / Toronto", utcOffset: "UTC-5 (CDT)", frDiff: "-7h", frTime: "19h → 2h du matin" },
];

const typicalSchedule = [
  { local: "13h00 (EDT)", france: "19h00 (CEST)", note: "1er créneau — soirée accessible 🌟", hot: true },
  { local: "16h00 (EDT)", france: "22h00 (CEST)", note: "2e créneau — début de soirée" },
  { local: "19h00 (EDT)", france: "01h00 (CEST+1)", note: "3e créneau — tard dans la nuit 🌙" },
  { local: "21h00 (EDT)", france: "03h00 (CEST+1)", note: "4e créneau — milieu de nuit ⚠️" },
];

const faqItems = [
  {
    q: "Peut-on regarder la CDM 2026 gratuitement en France ?",
    a: "Oui ! TF1 diffusera les matchs de la France, les demi-finales et la finale en clair. M6 proposera 54 matchs en clair. En streaming gratuit : TF1+, M6+ (6play) et Molotov permettent de suivre ces matchs sans abonnement.",
  },
  {
    q: "Combien de matchs sont diffusés sur chaque chaîne en France ?",
    a: "beIN Sports diffuse l'intégralité des 104 matchs (abonnement requis). M6 propose 54 matchs en clair. TF1 couvre les matchs de la France, les demi-finales et la finale. Certains matchs clés sont en co-diffusion TF1/M6.",
  },
  {
    q: "Quel est le décalage horaire entre la France et les États-Unis ?",
    a: "En été (heure CEST, UTC+2), le décalage est de -6h avec la côte Est (New York), -7h avec le centre (Dallas, Chicago), et -9h avec la côte Ouest (Los Angeles). Un match à 19h locale à New York est diffusé à 1h du matin en France.",
  },
  {
    q: "Comment regarder tous les matchs de la CDM 2026 ?",
    a: "Pour voir les 104 matchs, un abonnement beIN Sports (~15 €/mois) est nécessaire. Accessible via beIN Connect, myCANAL ou Amazon Prime Video (pass beIN). Sans abonnement, TF1 et M6 couvrent une large sélection en clair.",
  },
  {
    q: "Comment regarder la CDM 2026 depuis l'étranger ?",
    a: "Si vous êtes à l'étranger, les plateformes françaises (TF1+, M6+) sont géo-bloquées. Un VPN permet de simuler une connexion depuis la France. Choisissez un VPN fiable (NordVPN, ExpressVPN, CyberGhost), connectez-vous à un serveur français, puis accédez normalement aux plateformes de streaming.",
  },
  {
    q: "Peut-on regarder la CDM 2026 sur téléphone ?",
    a: "Oui. TF1+, M6+, beIN Connect, myCANAL et Molotov proposent tous des applications mobiles iOS et Android. Les matchs gratuits sur TF1+ et M6+ ne nécessitent aucun abonnement.",
  },
  {
    q: "La CDM 2026 est-elle diffusée gratuitement dans d'autres pays ?",
    a: "Oui ! Au Royaume-Uni (BBC iPlayer + ITVX), en Allemagne (ARD/ZDF Mediathek), en Espagne (RTVE Play), en Italie (RaiPlay), au Brésil (Globoplay) et au Mexique (Televisa/TV Azteca) — la Coupe du Monde est diffusée gratuitement sur les chaînes publiques.",
  },
  {
    q: "Quelles chaînes diffusent la CDM 2026 aux États-Unis ?",
    a: "Fox Sports (en anglais) et Telemundo (en espagnol) détiennent les droits TV aux États-Unis. Le streaming est disponible sur Peacock (NBC) et Tubi (Fox). Telemundo est accessible gratuitement.",
  },
  {
    q: "Existe-t-il des fan zones en France pour la CDM 2026 ?",
    a: "Les fan zones officielles seront annoncées par les municipalités et la FFF. Paris, Lyon, Marseille, Bordeaux et Lille proposeront très probablement des écrans géants. Les bars sportifs retransmettront également tous les matchs.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OuRegarderPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cdm2026.fr/" },
      { "@type": "ListItem", position: 2, name: "Où regarder", item: "https://www.cdm2026.fr/ou-regarder" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Où regarder les matchs</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl mb-2">📺 Où regarder la Coupe du Monde 2026</h1>
          <p className="text-gray-300 max-w-3xl">
            Guide complet des droits TV et du streaming légal pour suivre les 104 matchs du Mondial 2026.
            France en détail, pays francophones et diffuseurs internationaux.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12" id="main-content">

        {/* ── 1. FRANCE — Droits TV détaillés ─────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🇫🇷 Droits TV en France — Détail par chaîne
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {tvFranceDetailed.map((ch) => (
              <div
                key={ch.name}
                className={`rounded-2xl border p-6 flex flex-col ${
                  ch.free
                    ? "bg-field/5 dark:bg-field/10 border-field/20 dark:border-field/30"
                    : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={ch.logo} alt={ch.name} className="h-12 w-12 rounded-lg object-contain" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{ch.name}</h3>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        ch.free
                          ? "bg-field/10 dark:bg-field/20 text-field dark:text-field"
                          : "bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary"
                      }`}
                    >
                      {ch.type}
                    </span>
                  </div>
                </div>
                <p className="text-lg font-bold text-primary dark:text-secondary mb-2">{ch.matches}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">{ch.details}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/10 border border-[#FF6B35]/30 dark:border-[#FF6B35]/20 rounded-xl text-sm text-[#FF6B35] dark:text-[#FF6B35]">
            <p className="font-semibold">⚠️ Note importante</p>
            <p className="mt-1">
              Les droits TV de TF1 sont encore en cours de finalisation. M6 a confirmé 54 matchs.
              beIN Sports reste le seul diffuseur de l&apos;intégralité (104 matchs). Cette page sera mise à jour dès confirmation officielle.
            </p>
          </div>
        </section>

        {/* ── 2. Streaming France — Gratuit vs Payant ─────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            💻 Streaming en France — Gratuit vs Payant
          </h2>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Gratuit */}
            <div className="rounded-2xl border border-field/20 dark:border-field/30 overflow-hidden">
              <div className="bg-field/5 dark:bg-field/10 px-6 py-4 border-b border-field/20 dark:border-field/30">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-field">✅ Streaming gratuit</h3>
                <p className="text-sm text-field dark:text-field">Aucun abonnement requis</p>
              </div>
              <div className="p-6 space-y-3 bg-white dark:bg-slate-800">
                {streamingFrance.gratuit.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="block p-4 rounded-xl bg-field/5 dark:bg-field/10 hover:bg-field/10 dark:hover:bg-field/20 transition-colors"
                  >
                    <span className="font-bold text-gray-900 dark:text-gray-100">{s.name}</span>
                    <span className="ml-2 text-xs font-bold bg-field/10 dark:bg-field/20 text-field dark:text-field px-2 py-0.5 rounded-full">
                      Gratuit
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Payant */}
            <div className="rounded-2xl border border-secondary/20 dark:border-secondary/30 overflow-hidden">
              <div className="bg-secondary/5 dark:bg-secondary/10 px-6 py-4 border-b border-secondary/20 dark:border-secondary/30">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🔒 Streaming payant</h3>
                <p className="text-sm text-secondary dark:text-secondary">Abonnement requis — 104 matchs</p>
              </div>
              <div className="p-6 space-y-3 bg-white dark:bg-slate-800">
                {streamingFrance.payant.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="block p-4 rounded-xl bg-secondary/5 dark:bg-secondary/10 hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-gray-900 dark:text-gray-100">{s.name}</span>
                      <span className="text-xs font-bold bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary px-2 py-0.5 rounded-full">
                        {s.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Pays francophones ────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📡 Droits TV — Belgique, Suisse, Canada
          </h2>

          <div className="space-y-8">
            {tvByCountryFrancophone.map((country) => (
              <div
                key={country.country}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
              >
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{country.country}</h3>
                </div>
                <div className="p-6 grid gap-6 lg:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-3">📺 Chaînes TV</h4>
                    <div className="space-y-3">
                      {country.channels.map((ch) => (
                        <div key={ch.name} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-gray-900 dark:text-gray-100">{ch.name}</span>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                ch.type.toLowerCase().includes("gratuit")
                                  ? "bg-field/10 dark:bg-field/20 text-field dark:text-field"
                                  : "bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary"
                              }`}>{ch.type}</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">{ch.details}</p>
                            <p className="text-xs font-semibold text-primary dark:text-secondary mt-1">{ch.matches}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-3">💻 Streaming légal</h4>
                    <div className="space-y-3">
                      {country.streaming.map((s) => (
                        <a
                          key={s.name}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors">{s.name}</span>
                              {s.free && (
                                <span className="text-xs font-bold bg-field/10 dark:bg-field/20 text-field dark:text-field px-2 py-0.5 rounded-full">Gratuit</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">{s.desc}</p>
                          </div>
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-primary dark:group-hover:text-primary shrink-0 mt-0.5 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Diffuseurs internationaux ────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🌍 Diffuseurs internationaux
          </h2>

          {/* Mobile: cards */}
          <div className="md:hidden space-y-3">
            {internationalBroadcasters.map((b) => (
              <div key={b.country} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{b.flag}</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{b.country}</span>
                </div>
                <p className="text-sm font-semibold text-primary dark:text-secondary mb-1">{b.channels}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{b.details}</p>
                <span className="text-xs font-semibold bg-field/10 dark:bg-field/20 text-field dark:text-field px-2 py-0.5 rounded-full">
                  Gratuit : {b.free}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-sm bg-white dark:bg-slate-800">
              <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Pays</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Chaînes / Diffuseurs</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Détails</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Accès gratuit</th>
                </tr>
              </thead>
              <tbody>
                {internationalBroadcasters.map((b) => (
                  <tr key={b.country} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                      {b.flag} {b.country}
                    </td>
                    <td className="px-4 py-3 font-semibold text-primary dark:text-secondary">{b.channels}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{b.details}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold bg-field/10 dark:bg-field/20 text-field dark:text-field px-2 py-1 rounded-full">
                        {b.free}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 5. Regarder depuis l'étranger (VPN) ─────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
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

            <div className="p-4 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/10 border border-[#FF6B35]/30 dark:border-[#FF6B35]/20 rounded-xl text-sm text-[#FF6B35] dark:text-[#FF6B35]">
              <p className="font-semibold">⚠️ Légalité du VPN</p>
              <p className="mt-1">
                L&apos;utilisation d&apos;un VPN est légale en France et dans la plupart des pays. Cependant, contourner un géo-blocage
                peut enfreindre les conditions d&apos;utilisation de certaines plateformes. Nous recommandons de vérifier les conditions
                du service que vous utilisez.
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. Programme TV par match ───────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            📅 Programme TV — Matchs clés en France
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            Heures indiquées en <strong>heure française (CEST, UTC+2)</strong>. Les matchs de la 🇫🇷 France sont sur TF1 (gratuit).
          </p>

          {/* Mobile: cards */}
          <div className="md:hidden space-y-3">
            {featuredMatches.map((m) => (
              <div
                key={m.id}
                className={`rounded-xl border p-4 ${
                  m.isFrance
                    ? "bg-secondary/5 dark:bg-secondary/10 border-secondary/30 dark:border-secondary/40"
                    : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wide">{m.date}</span>
                  <span className="text-lg font-extrabold text-primary dark:text-secondary shrink-0">{m.timeFR}</span>
                </div>
                <p className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1">{m.match}</p>
                <p className="text-xs text-gray-500 dark:text-gray-300 mb-2">{m.stage} · {m.stadium}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {m.tvFR.map((ch) => (
                    <span key={ch} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      ch === "TF1" || ch === "M6"
                        ? "bg-field/10 dark:bg-field/20 text-field dark:text-field"
                        : "bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary"
                    }`}>{ch}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 italic">{m.note}</span>
                  {m.free && (
                    <span className="text-[10px] font-bold bg-field/10 dark:bg-field/20 text-field dark:text-field px-1.5 py-0.5 rounded-full">GRATUIT</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-sm bg-white dark:bg-slate-800">
              <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Heure 🇫🇷</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Match</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Phase</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Chaînes 🇫🇷</th>
                </tr>
              </thead>
              <tbody>
                {featuredMatches.map((m) => (
                  <tr
                    key={m.id}
                    className={`border-t border-gray-100 dark:border-gray-700 ${
                      m.isFrance
                        ? "bg-secondary/5 dark:bg-secondary/10 hover:bg-secondary/10 dark:hover:bg-secondary/15"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs whitespace-nowrap">{m.date}</td>
                    <td className="px-4 py-3 font-extrabold text-primary dark:text-secondary whitespace-nowrap">{m.timeFR}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{m.match}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-400">{m.stadium}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">{m.stage}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {m.tvFR.map((ch) => (
                          <span key={ch} className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                            ch === "TF1" || ch === "M6"
                              ? "bg-field/10 dark:bg-field/20 text-field dark:text-field"
                              : "bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary"
                          }`}>{ch}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-400 mt-3 italic">
            * Programme indicatif. Horaires en heure française (CEST, UTC+2).
            Légende : <span className="font-semibold text-field dark:text-field">Vert = Gratuit</span> · <span className="font-semibold text-secondary dark:text-secondary">Bleu = Abonnement</span>
          </p>
        </section>

        {/* ── 7. Décalage horaire ─────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            🕐 Décalage horaire — Villes hôtes → France
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            La CDM 2026 se joue en été (juin–juillet). La France est à l&apos;heure CEST (UTC+2).
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-sm bg-white dark:bg-slate-800">
              <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Villes hôtes</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Fuseau local</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Décalage</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Exemple (19h locale)</th>
                </tr>
              </thead>
              <tbody>
                {timeZones.map((tz) => (
                  <tr key={tz.city} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 text-xs">{tz.city}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">{tz.utcOffset}</td>
                    <td className="px-4 py-3 font-bold text-primary dark:text-secondary">{tz.frDiff}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-300 text-xs">{tz.frTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 8. Horaires types ───────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ⏰ Horaires types des matchs (EDT → France CEST)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            La majorité des matchs de groupes se joue sur la côte Est américaine (EDT = UTC-4).
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {typicalSchedule.map((s) => (
              <div
                key={s.local}
                className={`rounded-xl p-4 border ${
                  s.hot
                    ? "bg-field/5 dark:bg-field/10 border-field/20 dark:border-field/30"
                    : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="font-mono text-sm text-gray-500 dark:text-gray-300">{s.local}</div>
                <div className="text-2xl font-extrabold text-primary dark:text-secondary mt-1">{s.france}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">{s.note}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/10 border border-[#FF6B35]/30 dark:border-[#FF6B35]/20 rounded-xl text-sm text-[#FF6B35] dark:text-[#FF6B35]">
            <p className="font-semibold">💡 Bon à savoir</p>
            <p className="mt-1">
              Les matchs de la France seront programmés en priorité sur des créneaux accessibles pour le public européen.
              TF1 diffusera tous les matchs des Bleus en clair, y compris ceux à l&apos;heure tardive.
            </p>
          </div>
        </section>

        {/* ── 9. Fan Zones ────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🎉 Bars & Fan Zones</h2>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🏟️</div>
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

        {/* ── 10. FAQ ─────────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ❓ Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq, i) => (
              <details
                key={i}
                className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors list-none">
                  <span>{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-gray-400 shrink-0 ml-3 transition-transform group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

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
              🗺️ Carte des stades
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
