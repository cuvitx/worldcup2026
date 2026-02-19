import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Où regarder la Coupe du Monde 2026 | TV, streaming, horaires",
  description:
    "Toutes les infos pour regarder la Coupe du Monde 2026 : chaînes TV par pays (France, Belgique, Suisse, Canada), streaming légal, horaires convertis en heure française et FAQ complète.",
  openGraph: {
    title: "Où regarder la CDM 2026 — TV & Streaming par pays",
    description:
      "TF1, beIN, RTBF, RTS, TSN, RDS… Tout ce qu'il faut savoir pour ne rater aucun match du Mondial 2026.",
    url: "https://cdm2026.fr/ou-regarder",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const tvByCountry = [
  {
    country: "🇫🇷 France",
    channels: [
      { name: "TF1", type: "Gratuit (TNT)", matches: "28 matchs en clair", details: "Match d'ouverture, matchs de la France, demies & finale." },
      { name: "beIN Sports 1-3", type: "Abonnement (~15€/mois)", matches: "104 matchs (intégralité)", details: "Intégrale du tournoi avec studio d'analyse et multi-diffusion." },
      { name: "Canal+", type: "Abonnement", matches: "~35 matchs sélectionnés", details: "Affiches du soir et phases finales en co-diffusion." },
    ],
    streaming: [
      { name: "TF1+ (MyTF1)", url: "https://www.tf1.fr/", free: true, desc: "Streaming gratuit des matchs TF1. App iOS, Android, Smart TV." },
      { name: "beIN Connect", url: "https://connect.bein.net/", free: false, desc: "Service streaming officiel beIN Sports. Tous les matchs en direct." },
      { name: "MyCanal", url: "https://www.canalplus.com/", free: false, desc: "Canal+ & beIN Sports pour abonnés. Replay inclus." },
    ],
  },
  {
    country: "🇧🇪 Belgique",
    channels: [
      { name: "RTBF (La Une / La Deux)", type: "Gratuit", matches: "Matchs des Diables Rouges + sélection", details: "Service public belge francophone, diffusion en clair." },
      { name: "RTL Belgium", type: "Gratuit", matches: "Sélection de matchs", details: "Co-diffusion avec RTBF pour les grands rendez-vous." },
      { name: "Eleven Sports", type: "Abonnement (~7€/mois)", matches: "Intégralité des matchs", details: "Plateforme dédiée au sport, anciennement Play Sports." },
    ],
    streaming: [
      { name: "Auvio (RTBF)", url: "https://www.rtbf.be/auvio/", free: true, desc: "Streaming gratuit des matchs RTBF. App officielle." },
      { name: "Eleven+ / Pickx", url: "https://www.proximus.be/", free: false, desc: "Streaming Eleven Sports via Proximus Pickx." },
    ],
  },
  {
    country: "🇨🇭 Suisse",
    channels: [
      { name: "RTS (RTS 1 / RTS 2)", type: "Gratuit", matches: "Matchs de la Nati + sélection", details: "Service public romand, diffusion en clair des grands matchs." },
      { name: "SRF (SRF 2)", type: "Gratuit (en allemand)", matches: "Sélection de matchs", details: "Télévision publique alémanique." },
      { name: "Blue TV / Teleclub", type: "Abonnement", matches: "Intégralité", details: "Droits étendus pour les abonnés Sunrise/UPC." },
    ],
    streaming: [
      { name: "Play RTS", url: "https://www.rts.ch/play/", free: true, desc: "Streaming gratuit RTS. Live et replay. App officielle." },
      { name: "Blue TV", url: "https://blue.ch/", free: false, desc: "Streaming Sunrise/UPC avec droits complets." },
    ],
  },
  {
    country: "🇨🇦 Canada (franco)",
    channels: [
      { name: "TVA Sports", type: "Abonnement (câble/satellite)", matches: "Matchs en français", details: "Chaîne sportive du groupe Québecor, commentaires en français." },
      { name: "RDS", type: "Abonnement", matches: "Sélection matchs FR", details: "Réseau Des Sports, diffusion en français au Québec." },
      { name: "TSN / CTV", type: "Abonnement / Gratuit", matches: "Matchs en anglais", details: "TSN pour les droits complets, CTV pour les grands matchs en clair." },
    ],
    streaming: [
      { name: "TVA+ / TVA Sports", url: "https://www.tvasports.ca/", free: false, desc: "Streaming TVA Sports. App disponible." },
      { name: "RDS.ca", url: "https://www.rds.ca/", free: false, desc: "Streaming RDS pour les abonnés." },
      { name: "TSN Direct", url: "https://www.tsn.ca/", free: false, desc: "Streaming TSN, anglophone, droits complets au Canada." },
    ],
  },
];

const timeZones = [
  { city: "New York / Miami / Atlanta / Philly / Boston",   utcOffset: "UTC-4 (EDT)", frDiff: "-6h", frTime: "19h → 1h du matin" },
  { city: "Chicago / Houston / Dallas / Kansas City",       utcOffset: "UTC-5 (CDT)", frDiff: "-7h", frTime: "19h → 2h du matin" },
  { city: "Denver",                                         utcOffset: "UTC-6 (MDT)", frDiff: "-8h", frTime: "19h → 3h du matin" },
  { city: "Los Angeles / Seattle / San Francisco / Vancouver", utcOffset: "UTC-7 (PDT)", frDiff: "-9h", frTime: "19h → 4h du matin" },
  { city: "Mexico City / Guadalajara / Monterrey / Toronto", utcOffset: "UTC-5 (CDT)", frDiff: "-7h", frTime: "19h → 2h du matin" },
];

const typicalSchedule = [
  { local: "13h00 (EDT)", france: "19h00 (CET)", note: "1er créneau — soirée accessible 🌟", hot: true },
  { local: "16h00 (EDT)", france: "22h00 (CET)", note: "2e créneau — début de soirée" },
  { local: "19h00 (EDT)", france: "01h00 (CET+1)", note: "3e créneau — tard dans la nuit 🌙" },
  { local: "21h00 (EDT)", france: "03h00 (CET+1)", note: "4e créneau — milieu de nuit ⚠️" },
];

const faqItems = [
  {
    q: "Peut-on regarder la CDM 2026 gratuitement en France ?",
    a: "Oui, TF1 diffusera environ 28 matchs en clair dont tous les matchs de la France, les demi-finales et la finale. La plateforme gratuite TF1+ permettra également de les regarder en streaming sans abonnement.",
  },
  {
    q: "Quel est le décalage horaire entre la France et les États-Unis ?",
    a: "En été (heure CEST, UTC+2), il faut ajouter entre 6h et 9h selon la ville hôte. Un match à 19h locale à New York (EDT) est diffusé à 1h du matin en France. Les matchs sur la côte Est sont les plus accessibles.",
  },
  {
    q: "Comment regarder la CDM 2026 en Belgique ?",
    a: "La RTBF (La Une) diffuse les matchs des Diables Rouges et une sélection en clair. La plateforme Auvio permet le streaming gratuit. Pour tous les matchs, Eleven Sports (abonnement) est disponible.",
  },
  {
    q: "La CDM 2026 sera-t-elle diffusée en Suisse ?",
    a: "Oui, RTS (RTS 1 et RTS 2) diffusera les matchs de la Nati et une sélection en clair. Le streaming est disponible via Play RTS gratuitement. Blue TV propose l'intégralité pour les abonnés.",
  },
  {
    q: "Peut-on regarder la Coupe du Monde en direct sur téléphone ?",
    a: "Absolument. TF1+, beIN Connect, MyCanal, Auvio (RTBF), Play RTS, TVA Sports et TSN Direct proposent tous des applications mobiles iOS et Android permettant de suivre les matchs en direct.",
  },
  {
    q: "Quand ont lieu les matchs de la France à la CDM 2026 ?",
    a: "Les matchs de la France seront programmés en priorité sur des créneaux favorables au public européen (typiquement 19h ou 22h heure française). TF1 diffusera tous les matchs des Bleus en clair. Le calendrier exact sera disponible dès le tirage au sort.",
  },
  {
    q: "Existe-t-il des fan zones en France pour la CDM 2026 ?",
    a: "Les fan zones officielles seront annoncées par les municipalités et la fédération. Les grandes villes (Paris, Lyon, Marseille, Bordeaux, Lille) proposeront très probablement des écrans géants. Des bars sportifs retransmettront également tous les matchs.",
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
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link href="/" className="hover:text-primary dark:hover:text-accent">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Où regarder les matchs</li>
          </ol>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8" id="main-content">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 md:text-4xl mb-2">
          📺 Où regarder la Coupe du Monde 2026
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-3xl">
          TV en clair, abonnements et streaming légal — guide complet par pays (France, Belgique, Suisse, Canada)
          avec les horaires convertis en heure française.
        </p>

        {/* ── TV par pays ─────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            📡 Droits TV par pays
          </h2>

          <div className="space-y-10">
            {tvByCountry.map((country) => (
              <div
                key={country.country}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
              >
                {/* Country header */}
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{country.country}</h3>
                </div>

                <div className="p-6 grid gap-6 lg:grid-cols-2">
                  {/* Channels */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                      📺 Chaînes TV
                    </h4>
                    <div className="space-y-3">
                      {country.channels.map((ch) => (
                        <div
                          key={ch.name}
                          className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-gray-900 dark:text-gray-100">{ch.name}</span>
                              <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                  ch.type.toLowerCase().includes("gratuit")
                                    ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                                    : "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                                }`}
                              >
                                {ch.type}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ch.details}</p>
                            <p className="text-xs font-semibold text-primary dark:text-accent mt-1">{ch.matches}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Streaming */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                      💻 Streaming légal
                    </h4>
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
                              <span className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                                {s.name}
                              </span>
                              {s.free && (
                                <span className="text-xs font-bold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                                  Gratuit
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.desc}</p>
                          </div>
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-primary dark:group-hover:text-accent shrink-0 mt-0.5 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        {/* ── Décalage horaire ─────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            🕐 Décalage horaire — Villes hôtes → France (CEST)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            La CDM 2026 se joue en été (juin–juillet). La France est à l'heure CEST (UTC+2).
            Voici les décalages par rapport à chaque ville hôte :
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-sm bg-white dark:bg-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-700">
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
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 font-mono text-xs">{tz.utcOffset}</td>
                    <td className="px-4 py-3 font-bold text-primary dark:text-accent">{tz.frDiff}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{tz.frTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Horaires types ───────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            ⏰ Horaires types des matchs (EDT → France CEST)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            La majorité des matchs de groupes se joue sur la côte Est américaine (EDT = UTC-4).
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {typicalSchedule.map((s) => (
              <div
                key={s.local}
                className={`rounded-xl p-4 border ${
                  s.hot
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="font-mono text-sm text-gray-500 dark:text-gray-400">{s.local}</div>
                <div className="text-2xl font-extrabold text-primary dark:text-accent mt-1">
                  {s.france}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.note}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-sm text-amber-800 dark:text-amber-200">
            <p className="font-semibold">💡 Bon à savoir</p>
            <p className="mt-1">
              Les matchs de la France seront programmés en priorité sur des créneaux accessibles pour le public européen.
              TF1 diffusera tous les matchs des Bleus en clair, y compris ceux à l'heure tardive.
            </p>
          </div>
        </section>

        {/* ── Fan Zones ────────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">🎉 Bars & Fan Zones</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🏟️</div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">Fan zones officielles</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                  Les fan zones officielles en France seront annoncées prochainement par les municipalités et la FFF.
                  Paris, Lyon, Marseille, Bordeaux et Lille proposeront très probablement des écrans géants et des animations.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">
                  En Belgique, la RTBF et les villes organisent des dispositifs similaires lors des tournois.
                  En Suisse, RTS coordinate des retransmissions publiques dans les grandes villes romandes.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-3 italic">
                  Cette section sera mise à jour dès l&apos;annonce officielle des fan zones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            ❓ Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq, i) => (
              <details
                key={i}
                className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
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
                <div className="px-5 pb-5 pt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700">
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
          <p className="text-gray-600 dark:text-gray-400 mb-4">
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
              className="inline-block bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              🗺️ Carte des stades
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
