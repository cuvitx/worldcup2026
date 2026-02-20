import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

import { players, playersBySlug } from "./_components/player-data";
import { PortraitHero } from "./_components/PortraitHero";
import { CareerSection } from "./_components/CareerSection";
import { WorldCupHistory } from "./_components/WorldCupHistory";
import { WhyDecisive } from "./_components/WhyDecisive";
import { PlayStyleSection } from "./_components/PlayStyleSection";
import { PortraitFaq } from "./_components/PortraitFaq";

export const dynamicParams = false;

export function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) return {};
  return {
    title: player.metaTitle,
    description: player.metaDescription,
    openGraph: {
      title: player.metaTitle,
      description: player.metaDescription,
    },
  };
}

export default async function PortraitPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: player.faq.map((f) => ({
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
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Joueurs", url: "/portrait" },
          { name: player.name, url: `/portrait/${player.slug}` },
        ]}
        baseUrl={domains.fr}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white dark:bg-deep">
        <PortraitHero player={player} />
        <CareerSection career={player.career} />
        <WorldCupHistory history={player.worldCupHistory} />
        <WhyDecisive reasons={player.whyDecisive2026} />
        <PlayStyleSection styles={player.playStyle} />
        <PortraitFaq faq={player.faq} />

        {/* ─── Back navigation ─── */}
        <section className="py-8 border-t border-gray-100 dark:border-white/5">
          <div className="mx-auto max-w-5xl px-4 flex flex-wrap gap-4">
            <Link href="/" className="text-sm text-accent hover:underline">
              ← Accueil
            </Link>
            <Link href="/joueurs" className="text-sm text-accent hover:underline">
              ← Tous les joueurs
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
