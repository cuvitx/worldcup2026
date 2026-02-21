import type { Metadata } from 'next';
import Link from 'next/link';
import { NewsletterForm } from './NewsletterForm';
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { Heart } from "lucide-react"
export const metadata: Metadata = {
  title: 'Newsletter CDM 2026 — Recevez le programme chaque semaine',
  description:
    'Abonnez-vous à la newsletter CDM 2026 : programme de la semaine, pronostics exclusifs, alertes matchs, cotes en temps réel. Gratuit, sans spam.',
  openGraph: {
    title: 'Newsletter CDM 2026 — Recevez le programme chaque semaine',
    description:
      'Pronostics exclusifs, programme de la semaine et alertes matchs directement dans votre boîte mail. Gratuit.',
    url: 'https://www.cdm2026.fr/newsletter',
  },
  alternates: {
    canonical: 'https://www.cdm2026.fr/newsletter',
  },
};

const newsletterJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Newsletter CDM 2026',
  description:
    'Recevez chaque semaine le programme de la Coupe du Monde 2026, nos pronostics exclusifs et les alertes matchs.',
  url: 'https://www.cdm2026.fr/newsletter',
  inLanguage: 'fr',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: 'Newsletter CDM 2026 gratuite',
  },
};

const testimonials = [
  {
    name: 'Thomas D.',
    city: 'Paris',
    text: 'La meilleure source d\'info sur la CDM. Les pronostics sont vraiment bien argumentés.',
    avatar: '‍💼',
  },
  {
    name: 'Marie L.',
    city: 'Lyon',
    text: 'Parfait pour suivre le programme de la semaine sans passer des heures sur Google.',
    avatar: '‍',
  },
  {
    name: 'Kevin R.',
    city: 'Marseille',
    text: 'Les alertes matchs m\'ont sauvé plusieurs fois. Je ne rate plus aucun match de la France !',
    avatar: '‍<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M21.64 3.64a1.5 1.5 0 0 0-1.95-.14l-3.26 2.44a1 1 0 0 1-1.15.08L12.82 4.5a1 1 0 0 0-1.32.26L9 8l7 7 3.24-2.5a1 1 0 0 0 .26-1.32L17.98 8.7a1 1 0 0 1 .08-1.15l2.44-3.26a1.5 1.5 0 0 0-.14-1.95z"/><path d="m14 15 5.5 5.5a2.12 2.12 0 1 1-3-3L11 12"/><path d="m2.5 21.5 3-3"/><path d="m6 15-3.26 3.26a1 1 0 0 0 0 1.41l1.59 1.59a1 1 0 0 0 1.41 0L9 18"/></svg> ',
  },
];

const benefits = [
  {
    icon: '',
    title: 'Programme de la semaine',
    desc: 'Tous les matchs à venir, horaires, stades, phases — en un seul mail, chaque lundi.',
    badge: null,
  },
  {
    icon: '',
    title: 'Pronostics exclusifs',
    desc: 'Nos analystes décryptent les matchs phares. Qui gagnera ? Quel score ? Quelle cote jouer ?',
    badge: 'Exclusif',
  },
  {
    icon: <svg className="w-8 h-8 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
    title: 'Alertes matchs',
    desc: 'Rappels 2h avant chaque match important. Ne ratez plus jamais une rencontre cruciale.',
    badge: null,
  },
  {
    icon: '',
    title: 'Meilleures cotes',
    desc: 'Comparatif des cotes bookmakers sur les matchs de la semaine. Maximisez vos gains.',
    badge: 'Nouveau',
  },
  {
    icon: '',
    title: 'Stats & Analyses',
    desc: 'Données ELO, forme récente, confrontations directes — toute l\'intelligence pour parier.',
    badge: null,
  },
  {
    icon: '',
    title: 'Classements en temps réel',
    desc: 'Groupes, buteurs, meilleures équipes — le point complet sur l\'évolution du tournoi.',
    badge: null,
  },
];

const stats = [
  { value: '12K+', label: 'Abonnés' },
  { value: '1/sem', label: 'Fréquence' },
  { value: '0€', label: 'Gratuit' },
  { value: '100%', label: 'Sans spam' },
];

export default function NewsletterPage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Newsletter" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsletterJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden py-20 md:py-28 text-white"
        style={{ background: 'linear-gradient(160deg, var(--color-primary) 0%, var(--color-deep) 50%, var(--color-primary) 100%)' }}
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-field/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary backdrop-blur-sm">
            CDM 2026 · Newsletter officielle
          </div>

          <h1 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl drop-shadow-lg leading-tight">
            Recevez le{' '}
            <span className="text-secondary">programme CDM 2026</span>
            <br />
            <span className="text-primary">chaque semaine</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base text-gray-300/90 leading-relaxed md:text-lg">
            Programme des matchs, pronostics exclusifs, meilleures cotes &amp; alertes.
            Tout ce qu&apos;il faut pour ne rien rater du Mondial 2026.
          </p>

          {/* Hero form */}
          <div className="mx-auto max-w-md">
            <NewsletterForm />
          </div>

          {/* Social proof mini */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold text-secondary">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BÉNÉFICES ===== */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Pourquoi s&apos;abonner ?
            </h2>
            <p className="text-sm text-gray-500">
              Chaque semaine, l&apos;essentiel de la CDM 2026 dans votre boîte mail
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                {b.badge && (
                  <span className="absolute top-3 right-3 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                    {b.badge}
                  </span>
                )}
                <div className="mb-3 text-3xl">{b.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1.5">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APERÇU D'UN MAIL ===== */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg> À quoi ressemble notre newsletter ?
            </h2>
            <p className="text-sm text-gray-500">
              Un aperçu d&apos;un email type que vous recevrez chaque semaine
            </p>
          </div>

          {/* Email mockup */}
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            {/* Email client bar */}
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <div className="w-3 h-3 rounded-full bg-field" />
              </div>
              <div className="flex-1 ml-4 rounded-md bg-whitegray-700 px-3 py-1 text-xs text-gray-500">
                newsletter@cdm2026.fr → vous
              </div>
            </div>

            {/* Email content */}
            <div className="bg-white p-6">
              <div className="border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-gray-500">DE :</span>
                  <span className="text-xs text-gray-700">CDM 2026 &lt;newsletter@cdm2026.fr&gt;</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500">OBJET :</span>
                  <span className="text-xs font-semibold text-gray-900">
                    CDM 2026 · Semaine 3 : France-Argentine en 8e de finale !
                  </span>
                </div>
              </div>

              {/* Fake email body */}
              <div className="space-y-4">
                <div
                  className="rounded-xl p-4 text-white text-center"
                  style={{ background: 'linear-gradient(160deg, var(--color-primary) 0%, var(--color-deep) 50%, var(--color-primary) 100%)' }}
                >
                  <p className="text-xs uppercase tracking-widest text-secondary mb-1">CDM 2026 · Semaine 3</p>
                  <p className="font-extrabold text-lg">Programme du 28 juin – 4 juillet</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Match de la semaine</p>
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🇫🇷</span>
                        <span className="font-bold text-sm text-gray-900">France</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded">VS</span>
                        <p className="text-[10px] text-gray-500 mt-0.5">8e de finale · 22h00</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">Argentine</span>
                        <span className="text-xl">🇦🇷</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: 'Victoire France', value: '45%', color: 'text-primary' },
                    { label: 'Nul (ap)', value: '25%', color: 'text-gray-500' },
                    { label: 'Victoire Argentine', value: '30%', color: 'text-secondary' },
                  ].map((p) => (
                    <div key={p.label} className="rounded-lg bg-gray-50 p-2">
                      <p className={`text-lg font-extrabold ${p.color}`}>{p.value}</p>
                      <p className="text-[10px] text-gray-500">{p.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-400 text-center border-t border-gray-100 pt-3">
                  Se désinscrire · Voir dans le navigateur · cdm2026.fr
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              <Heart className="h-5 w-5 inline-block" />Ils nous font confiance
            </h2>
            <p className="text-sm text-gray-500">Ils ont rejoint la communauté CDM 2026</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{t.avatar}</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.city}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-secondary text-sm">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FORM FINAL ===== */}
      <section
        className="py-20 text-white"
        style={{ background: 'linear-gradient(160deg, var(--color-primary) 0%, var(--color-deep) 50%, var(--color-primary) 100%)' }}
      >
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="text-4xl mb-4"><svg className="w-10 h-10 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Rejoignez <span className="text-secondary">nos abonnés</span> fans du Mondial
          </h2>
          <p className="text-gray-300/90 text-sm mb-8 leading-relaxed">
            Pronostics exclusifs · Programme hebdo · Alertes matchs · Meilleures cotes.
            <br />
            Gratuit. Sans spam. Désinscription en 1 clic.
          </p>

          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
            <NewsletterForm />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Retour à l&apos;accueil
            </Link>
            <span className="text-gray-600">·</span>
            <Link href="/pronostic-vainqueur" className="text-sm text-gray-400 hover:text-white transition-colors">
              Pronostic vainqueur
            </Link>
            <span className="text-gray-600">·</span>
            <Link href="/match/calendrier" className="text-sm text-gray-400 hover:text-white transition-colors">
              Calendrier CDM 2026
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
