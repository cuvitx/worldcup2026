import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, citiesBySlug } from "./_components/city-data";
import { CityHero } from "./_components/CityHero";
import { TransportSection } from "./_components/TransportSection";
import { LodgingSection } from "./_components/LodgingSection";
import { FoodSection } from "./_components/FoodSection";
import { AttractionsSection } from "./_components/AttractionsSection";
import { MatchInfoSection } from "./_components/MatchInfoSection";
import { SecuritySection } from "./_components/SecuritySection";
import { CityFaqSection } from "./_components/CityFaqSection";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
    },
    alternates: { canonical: `https://www.cdm2026.fr/guide-ville/${slug}` },
  };
}

export default async function GuideVillePage({ params }: PageProps) {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-whitedeep">
        <CityHero city={city} />
        <TransportSection cityName={city.name} transport={city.transport} />
        <LodgingSection lodging={city.lodging} />
        <FoodSection food={city.food} />
        <AttractionsSection attractions={city.attractions} />
        <MatchInfoSection stadium={city.stadium} matchInfo={city.matchInfo} />
        <SecuritySection security={city.security} visa={city.visa} />
        <CityFaqSection faq={city.faq} />

        {/* ─── Back navigation ─── */}
        <section className="py-8 border-t border-gray-100">
          <div className="mx-auto max-w-5xl px-4 flex flex-wrap gap-4">
            <Link href="/" className="text-sm text-accent hover:underline">
              ← Accueil
            </Link>
            <Link href="/guides" className="text-sm text-accent hover:underline">
              ← Tous les guides
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
