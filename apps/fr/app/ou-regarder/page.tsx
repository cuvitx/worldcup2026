import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Où regarder la Coupe du Monde 2026 | TV, streaming, horaires",
  description:
    "Toutes les infos pour regarder la Coupe du Monde 2026 en France : chaînes TV (TF1, beIN Sports, Canal+), streaming légal, décalage horaire et fan zones.",
  openGraph: {
    title: "Où regarder la CDM 2026 en France",
    description: "TV, streaming légal et horaires des matchs de la Coupe du Monde 2026.",
  },
};

const tvChannels = [
  {
    name: "TF1",
    type: "Gratuit (TNT)",
    description: "TF1 diffusera les plus grands matchs en clair : match d'ouverture, matchs de la France, demi-finales et finale.",
    logo: "📺",
    matchCount: "28 matchs en clair",
  },
  {
    name: "beIN Sports",
    type: "Abonnement",
    description: "L'intégralité des 104 matchs en direct et en exclusivité pour les abonnés. Studio d'analyse avant et après chaque match.",
    logo: "⚽",
    matchCount: "104 matchs (intégralité)",
  },
  {
    name: "Canal+",
    type: "Abonnement",
    description: "Canal+ co-diffusera une sélection de matchs, notamment les affiches du soir et les phases finales.",
    logo: "🎬",
    matchCount: "~35 matchs sélectionnés",
  },
];

const streamingPlatforms = [
  { name: "TF1+", url: "https://www.tf1.fr/", description: "Streaming gratuit des matchs diffusés sur TF1. Accessible sur mobile, tablette et Smart TV.", free: true },
  { name: "MyCanal", url: "https://www.canalplus.com/", description: "Replay et direct des matchs Canal+ et beIN Sports (avec abonnement correspondant).", free: false },
  { name: "beIN Connect", url: "https://connect.bein.net/", description: "Le service de streaming officiel de beIN Sports. Tous les matchs en direct.", free: false },
];

const timeZones = [
  { city: "New York / Miami / Atlanta", utcOffset: "UTC-4 (EDT)", frDiff: "+6h", example: "19h locale = 1h du matin en France" },
  { city: "Chicago / Houston / Dallas", utcOffset: "UTC-5 (CDT)", frDiff: "+7h", example: "19h locale = 2h du matin en France" },
  { city: "Denver", utcOffset: "UTC-6 (MDT)", frDiff: "+8h", example: "19h locale = 3h du matin en France" },
  { city: "Los Angeles / Seattle / San Francisco", utcOffset: "UTC-7 (PDT)", frDiff: "+9h", example: "19h locale = 4h du matin en France" },
  { city: "Mexico / Guadalajara / Monterrey", utcOffset: "UTC-5 (CDT)", frDiff: "+7h", example: "19h locale = 2h du matin en France" },
  { city: "Toronto / Vancouver", utcOffset: "UTC-4 / UTC-7", frDiff: "+6h à +9h", example: "Selon la ville hôte" },
];

const typicalSchedule = [
  { local: "13h00", france: "19h00 (J)", note: "Premier créneau – matchs accessibles en soirée" },
  { local: "16h00", france: "22h00 (J)", note: "Deuxième créneau – début de soirée en France" },
  { local: "19h00", france: "01h00 (J+1)", note: "Troisième créneau – tard dans la nuit" },
  { local: "21h00", france: "03h00 (J+1)", note: "Dernier créneau – milieu de la nuit" },
];

export default function OuRegarderPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.mondial2026.fr/" },
      { "@type": "ListItem", position: 2, name: "Où regarder", item: "https://www.mondial2026.fr/ou-regarder" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Où regarder les matchs</li>
          </ol>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl mb-2">
          Où regarder la Coupe du Monde 2026
        </h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Toutes les infos pour ne rater aucun match du Mondial 2026 : chaînes TV, streaming légal,
          décalage horaire et fan zones en France.
        </p>

        {/* TV Channels */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📺 Chaînes TV en France</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {tvChannels.map((ch) => (
              <div key={ch.name} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
                <div className="text-3xl mb-2">{ch.logo}</div>
                <h3 className="text-xl font-bold text-gray-900">{ch.name}</h3>
                <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded ${
                  ch.type === "Gratuit (TNT)" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {ch.type}
                </span>
                <p className="text-gray-600 mt-3 text-sm">{ch.description}</p>
                <p className="text-primary font-semibold text-sm mt-2">{ch.matchCount}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Streaming */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💻 Streaming légal</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {streamingPlatforms.map((p) => (
              <div key={p.name} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                  {p.free && (
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">Gratuit</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{p.description}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-block mt-3 text-primary font-semibold text-sm hover:underline"
                >
                  Accéder à {p.name} →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Time Zones */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🕐 Décalage horaire avec la France</h2>
          <p className="text-gray-600 mb-4">
            La Coupe du Monde 2026 se déroule aux États-Unis, au Canada et au Mexique.
            En été (heure d'été française, CEST = UTC+2), voici les décalages horaires :
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-xl border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Ville hôte</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Fuseau</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Décalage</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Exemple</th>
                </tr>
              </thead>
              <tbody>
                {timeZones.map((tz) => (
                  <tr key={tz.city} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{tz.city}</td>
                    <td className="px-4 py-3 text-gray-600">{tz.utcOffset}</td>
                    <td className="px-4 py-3 text-gray-600">{tz.frDiff}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{tz.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Typical Schedule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⏰ Horaires types des matchs (côte Est US → France)</h2>
          <p className="text-gray-600 mb-4">
            La plupart des matchs de la phase de groupes se joueront sur la côte Est américaine (EDT).
            Voici les créneaux habituels convertis en heure française :
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-xl border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Heure locale (EDT)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Heure en France (CEST)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Note</th>
                </tr>
              </thead>
              <tbody>
                {typicalSchedule.map((s) => (
                  <tr key={s.local} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-mono font-semibold text-gray-900">{s.local}</td>
                    <td className="px-4 py-3 font-mono font-semibold text-primary">{s.france}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            <p className="font-semibold">💡 Bon à savoir</p>
            <p>
              Les matchs de la France seront programmés en priorité sur des créneaux accessibles
              pour le public français. TF1 diffusera les matchs des Bleus en clair.
            </p>
          </div>
        </section>

        {/* Fan Zones */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 Bars & Fan Zones en France</h2>
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🏟️</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Fan zones officielles</h3>
                <p className="text-gray-600 mt-1">
                  Les fan zones officielles en France seront annoncées prochainement par les municipalités.
                  Les grandes villes (Paris, Lyon, Marseille, Bordeaux, Lille...) proposeront très probablement
                  des écrans géants et des animations.
                </p>
                <p className="text-gray-600 mt-3">
                  En attendant, de nombreux bars sportifs retransmettront les matchs.
                  Pensez à réserver vos places à l'avance pour les matchs de la France !
                </p>
                <p className="text-sm text-gray-400 mt-3 italic">
                  Cette section sera mise à jour dès l'annonce officielle des fan zones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="p-6 bg-primary/5 rounded-xl text-center">
          <p className="text-lg font-semibold text-gray-900 mb-2">Envie de parier sur les matchs ?</p>
          <p className="text-gray-600 mb-4">Comparez les cotes des meilleurs bookmakers français pour la CDM 2026.</p>
          <Link
            href="/comparateur-cotes"
            className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            Comparateur de cotes →
          </Link>
        </div>
      </main>
    </>
  );
}
