import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Building2, ClipboardList, Clock, ExternalLink, Globe, Landmark, Link, MapPin, Monitor, Radio, Tv, Wifi } from "lucide-react";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import { stageLabels } from "@repo/data/constants";

export const revalidate = 86400;
export const dynamicParams = false;

// ─── Deterministic channel assignment ─────────────────────────────────────────

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = ((h << 5) - h + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getFrenchChannel(slug: string, homeTeamId: string, awayTeamId: string, stage: string): { name: string; type: string; free: boolean } {
  const isFranceMatch = homeTeamId === "france" || awayTeamId === "france";
  const isBigStage = ["semi-final", "final", "third-place"].includes(stage);

  if (isFranceMatch || isBigStage) {
    return { name: "TF1", type: "Gratuit (TNT)", free: true };
  }
  const isQuarter = stage === "quarter-final";
  if (isQuarter) {
    return hashSlug(slug) % 2 === 0
      ? { name: "TF1", type: "Gratuit (TNT)", free: true }
      : { name: "M6", type: "Gratuit (TNT)", free: true };
  }
  const h = hashSlug(slug) % 3;
  if (h === 0) return { name: "TF1", type: "Gratuit (TNT)", free: true };
  if (h === 1) return { name: "M6", type: "Gratuit (TNT)", free: true };
  return { name: "beIN Sports", type: "Abonnement (~15 €/mois)", free: false };
}

function getInternationalChannels(slug: string) {
  const h = hashSlug(slug);
  return [
    { country: "🇬🇧 Royaume-Uni", channel: h % 2 === 0 ? "BBC One" : "ITV 1" },
    { country: "🇩🇪 Allemagne", channel: h % 2 === 0 ? "ARD" : "ZDF" },
    { country: "🇺🇸 États-Unis", channel: h % 2 === 0 ? "Fox" : "Telemundo" },
    { country: "🇨🇭 Suisse", channel: "RTS 2" },
    { country: "🇧🇪 Belgique", channel: "RTBF / La Une" },
    { country: "🇨🇦 Canada", channel: "TSN / RDS" },
  ];
}

// ─── Time zone helpers ────────────────────────────────────────────────────────

function formatTimeInZone(date: string, timeUtc: string, tz: string, label: string): { label: string; time: string } {
  const dt = new Date(`${date}T${timeUtc}:00Z`);
  const formatted = dt.toLocaleTimeString("fr-FR", { timeZone: tz, hour: "2-digit", minute: "2-digit" });
  return { label, time: formatted };
}

// ─── Static params ────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeName = home?.name ?? "À déterminer";
  const awayName = away?.name ?? "À déterminer";

  const title = `Sur quelle chaîne regarder ${homeName} vs ${awayName} ? Programme TV CDM 2026`;
  const description = `Découvrez sur quelle chaîne regarder ${homeName} - ${awayName} en direct (TF1, M6, beIN Sports). Horaires, streaming et diffusion internationale pour la Coupe du Monde 2026.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${domains.fr}/sur-quelle-chaine/${slug}`,
      },
    alternates: { canonical: `https://cdm2026.fr/sur-quelle-chaine/${slug}` },
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SurQuelleChaineMatchPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];
  const city = stadium ? citiesById[stadium.cityId] ?? null : null;
  const stage = stageLabels[match.stage] ?? match.stage;

  const homeName = home?.name ?? "À déterminer";
  const awayName = away?.name ?? "À déterminer";
  const homeFlag = home?.flag ?? "🏳️";
  const awayFlag = away?.flag ?? "🏳️";

  const dateStr = new Date(`${match.date}T${match.time}:00Z`).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
  const heureParisStr = new Date(`${match.date}T${match.time}:00Z`).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  });

  const frenchChannel = getFrenchChannel(slug, match.homeTeamId, match.awayTeamId, match.stage);
  const intlChannels = getInternationalChannels(slug);
  const timeZones = [
    formatTimeInZone(match.date, match.time, "Europe/Paris", "🇫🇷 Paris"),
    formatTimeInZone(match.date, match.time, "America/New_York", "🇺🇸 New York"),
    formatTimeInZone(match.date, match.time, "America/Los_Angeles", "🇺🇸 Los Angeles"),
    formatTimeInZone(match.date, match.time, "America/Mexico_City", "🇲🇽 Mexico"),
  ];

  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Où regarder", url: "/ou-regarder" },
    { name: `${homeName} vs ${awayName}`, url: `/sur-quelle-chaine/${slug}` },
  ];

  const faqItems = [
    {
      question: `Sur quelle chaîne voir ${homeName} vs ${awayName} gratuitement ?`,
      answer: frenchChannel.free
        ? `Le match ${homeName} - ${awayName} sera diffusé gratuitement sur ${frenchChannel.name} (TNT). Vous pouvez aussi le regarder en streaming gratuit sur ${frenchChannel.name === "TF1" ? "TF1+" : "6play"}.`
        : `Ce match sera diffusé sur beIN Sports (abonnement requis). Retrouvez certains matchs gratuits sur TF1 et M6.`,
    },
    {
      question: `À quelle heure est ${homeName} - ${awayName} ?`,
      answer: `Le coup d'envoi est prévu le ${dateStr} à ${heureParisStr} (heure de Paris). ${timeZones[1]!.time} à New York, ${timeZones[2]!.time} à Los Angeles.`,
    },
    {
      question: "Comment regarder la CDM 2026 en streaming ?",
      answer: "Plusieurs options : TF1+ et 6play (gratuit, sélection de matchs), beIN Connect (intégralité, ~15€/mois), Molotov TV et myCANAL pour accéder aux chaînes en direct.",
    },
    {
      question: `Où se joue ${homeName} vs ${awayName} ?`,
      answer: `Ce match se jouera au ${stadium?.name ?? "stade à confirmer"}${city ? ` à ${city.name}` : ""}, ${stadium?.country ?? ""}.`,
    },
  ];

  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Breadcrumb items={breadcrumbItems.map((b) => ({ label: b.name, href: b.url }))} />
          <p className="text-sm font-medium text-gray-300 mt-4 uppercase tracking-wide">{stage} — CDM 2026</p>
          <h1 className="mt-4 text-2xl font-extrabold sm:text-4xl lg:text-5xl leading-tight">
            Sur quelle chaîne regarder<br />
            <span className="text-accent">{homeFlag} {homeName} vs {awayName} {awayFlag}</span> ?
          </h1>
          <p className="mt-4 text-secondary text-lg">
            Programme TV &amp; streaming — {dateStr} à {heureParisStr}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-300">
            <span><Landmark className="h-5 w-5 inline-block" /> {stadium?.name ?? "Stade à confirmer"}</span>
            {city && <span><MapPin className="h-5 w-5 inline-block" /> {city.name}, {stadium?.country}</span>}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">

            {/* Diffusion France */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <Tv className="h-6 w-6 text-primary" /> Diffusion en France
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Chaîne</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 bg-green-50/50green-900/10">
                      <td className="py-3 px-4 font-semibold text-gray-900">{frenchChannel.name}</td>
                      <td className="py-3 px-4 text-gray-600">{frenchChannel.type}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${frenchChannel.free ? "bg-green-100 text-green-800green-900/30" : "bg-amber-100 text-amber-800amber-900/30"}`}>
                          {frenchChannel.free ? " Gratuit" : " Payant"}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-semibold text-gray-900">beIN Sports</td>
                      <td className="py-3 px-4 text-gray-600">Abonnement (~15 €/mois)</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800blue-900/30">
                          <Tv className="h-5 w-5 inline-block" /> 104 matchs
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Diffusion internationale */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <Globe className="h-6 w-6 text-primary" /> Diffusion internationale
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Pays</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Chaîne</th>
                    </tr>
                  </thead>
                  <tbody>
                    {intlChannels.map((ch) => (
                      <tr key={ch.country} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-900">{ch.country}</td>
                        <td className="py-3 px-4 font-medium text-gray-700">{ch.channel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Streaming */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <Wifi className="h-6 w-6 text-primary" /> Streaming &amp; replay
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { name: "beIN Connect", desc: "104 matchs en direct et replay", price: "~15 €/mois", free: false },
                  { name: "Molotov TV", desc: "Accès aux chaînes TNT (TF1, M6)", price: "Gratuit (base)", free: true },
                  { name: "myCANAL", desc: "Via option beIN Sports", price: "Inclus avec abonnement", free: false },
                ].map((s) => (
                  <div key={s.name} className="rounded-lg border border-gray-200 p-4 text-center">
                    <Monitor className="mx-auto h-8 w-8 text-accent mb-2" />
                    <h3 className="font-bold text-gray-900">{s.name}</h3>
                    <p className="text-xs text-secondary mt-1">{s.desc}</p>
                    <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${s.free ? "bg-green-100 text-green-800green-900/30" : "bg-amber-100 text-amber-800amber-900/30"}`}>
                      {s.price}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Fuseaux horaires */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <Clock className="h-6 w-6 text-primary" /> Horaires par fuseau
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {timeZones.map((tz) => (
                  <div key={tz.label} className="text-center rounded-lg bg-gray-50-700/50 p-4">
                    <p className="text-sm text-secondary">{tz.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{tz.time}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <FAQSection title={`FAQ — ${homeName} vs ${awayName} à la TV`} items={faqItems} />

            {/* Maillage interne */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3"><BookOpen className="h-5 w-5 inline-block" /> À lire aussi</h2>
              <div className="flex flex-wrap gap-3">
                <Link href={`/match/${slug}`} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                  <ExternalLink className="h-4 w-4" /> Fiche match {homeName} vs {awayName}
                </Link>
                <Link href={`/pronostic-match/${slug}`} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                  <ExternalLink className="h-4 w-4" /> Pronostic {homeName} - {awayName}
                </Link>
                <Link href={`/compos-officielles/${slug}`} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                  <ExternalLink className="h-4 w-4" /> Compos officielles
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA */}
            <div className="rounded-xl bg-accent p-6 text-center text-white shadow-lg">
              <Radio className="mx-auto h-10 w-10 mb-3" />
              <h3 className="text-lg font-bold">Ne ratez aucun match !</h3>
              <p className="text-sm mt-2 text-white/80">Retrouvez le guide complet TV &amp; streaming pour les 104 matchs de la CDM 2026.</p>
              <Link href="/ou-regarder" className="mt-4 inline-block rounded-lg bg-white text-accent font-bold px-6 py-3 text-sm hover:bg-gray-100 transition-colors">
                Guide complet TV →
              </Link>
            </div>

            {/* Match info card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3"><ClipboardList className="h-5 w-5 inline-block" /> Infos match</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-secondary">Date</dt>
                  <dd className="font-medium text-gray-900">{dateStr}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-secondary">Heure (Paris)</dt>
                  <dd className="font-medium text-gray-900">{heureParisStr}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-secondary">Stade</dt>
                  <dd className="font-medium text-gray-900">{stadium?.name ?? "TBC"}</dd>
                </div>
                {city && (
                  <div className="flex justify-between">
                    <dt className="text-secondary">Ville</dt>
                    <dd className="font-medium text-gray-900">{city.name}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-secondary">Phase</dt>
                  <dd className="font-medium text-gray-900">{stage}</dd>
                </div>
                {match.group && (
                  <div className="flex justify-between">
                    <dt className="text-secondary">Groupe</dt>
                    <dd className="font-medium text-gray-900">Groupe {match.group}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Links */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3"><Link className="h-5 w-5 inline-block" /> Pages liées</h3>
              <ul className="space-y-2 text-sm">
                {stadium && (
                  <li>
                    <Link href={`/stade/${stadium.slug}`} className="text-primary hover:underline">
                      <Landmark className="h-5 w-5 inline-block" /> {stadium.name}
                    </Link>
                  </li>
                )}
                {city && (
                  <li>
                    <Link href={`/ville/${city.slug}`} className="text-primary hover:underline">
                      <Building2 className="h-5 w-5 inline-block" /> {city.name}
                    </Link>
                  </li>
                )}
                {home && (
                  <li>
                    <Link href={`/equipe/${home.slug}`} className="text-primary hover:underline">
                      {home.flag} {home.name}
                    </Link>
                  </li>
                )}
                {away && (
                  <li>
                    <Link href={`/equipe/${away.slug}`} className="text-primary hover:underline">
                      {away.flag} {away.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
