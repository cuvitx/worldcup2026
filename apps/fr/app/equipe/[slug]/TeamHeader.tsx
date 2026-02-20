import { HeroSection } from "@repo/ui/hero-section";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import Image from "next/image";
import Link from "next/link";
import { getFlagPath } from "@repo/data/country-codes";

interface TeamHeaderProps {
  team: {
    slug: string;
    name: string;
    flag: string;
    group: string;
    confederation: string;
    fifaRanking: number;
    isHost: boolean;
  };
}

export function TeamHeader({ team }: TeamHeaderProps) {
  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Équipes",url:"/equipes"},{name:"Groupe "+team.group,url:"/groupe/"+team.group.toLowerCase()},{name:team.name,url:"/equipe/"+team.slug}]} baseUrl={domains.fr} />
      {/* Breadcrumbs */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/equipes" className="text-primary dark:text-secondary hover:underline">Équipes</Link></li>
            <li>/</li>
            <li><Link href={`/groupe/${team.group.toLowerCase()}`} className="text-primary dark:text-secondary hover:underline">Groupe {team.group}</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{team.name}</li>
          </ol>
        </div>
      </nav>

      {/* Team Header */}
      <HeroSection title={team.name} subtitle={`${team.confederation} · Classement FIFA #${team.fifaRanking} · Groupe ${team.group}`}>
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 mt-4">
          {getFlagPath(team.slug) ? (
            <div className="relative h-24 w-36 sm:h-32 sm:w-48 overflow-hidden rounded-xl shadow-lg border-2 border-white/20 shrink-0">
              <Image
                src={getFlagPath(team.slug)!}
                alt={`Drapeau de ${team.name}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 144px, 192px"
              />
            </div>
          ) : (
            <span className="text-5xl sm:text-8xl" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
          )}
          <div className="flex flex-wrap items-center gap-3">
            {team.isHost && (
              <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                Pays hôte
              </span>
            )}
            <Link
              href={`/pronostic/${team.slug}`}
              className="inline-block rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/80"
            >
              Voir le pronostic &rarr;
            </Link>
          </div>
        </div>
      </HeroSection>
    </>
  );
}
