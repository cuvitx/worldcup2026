import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsById } from "@repo/data/teams";
import { players } from "@repo/data/players";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return teams.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const team = teams.find((t) => t.slug === slug);
  if (!team) return {};
  return {
    title: `Joueurs ${team.name} — CDM 2026 | Liste complète`,
    description: `Tous les joueurs de ${team.name} sélectionnés pour la Coupe du Monde 2026. Fiches détaillées, statistiques et profils.`,
    openGraph: { images: [{ url: `/api/og?type=equipe&slug=${slug}`, width: 1200, height: 630 }] },
  };
}

const POS_LABELS: Record<string, string> = { GK: "Gardiens", DF: "Défenseurs", MF: "Milieux", FW: "Attaquants" };
const POS_ORDER = ["GK", "DF", "MF", "FW"];

export default async function JoueursEquipePage({ params }: Props) {
  const { slug } = await params;
  const team = teams.find((t) => t.slug === slug);
  if (!team) notFound();

  const teamPlayers = players.filter((p) => p.teamId === team.id);
  const byPosition: Record<string, typeof players> = {};
  for (const p of teamPlayers) {
    const pos = p.position || "FW";
    if (!byPosition[pos]) byPosition[pos] = [];
    byPosition[pos].push(p);
  }

  return (
    <>
      <section className="hero-animated text-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {team.flag} Joueurs {team.name} — CDM 2026
          </h1>
          <p className="mt-3 text-white/70 text-lg">{teamPlayers.length} joueurs sélectionnés</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {POS_ORDER.map((pos) => {
          const group = byPosition[pos];
          if (!group || group.length === 0) return null;
          return (
            <div key={pos} className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-4">{POS_LABELS[pos] || pos} ({group.length})</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.map((p) => (
                  <Link key={p.slug} href={`/joueur/${p.slug}`} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                    <div>
                      <div className="font-semibold text-gray-900">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.club} · {p.age} ans</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        <div className="mt-8 text-center">
          <Link href={`/equipe/${slug}`} className="text-primary hover:underline font-medium">← Fiche complète {team.name}</Link>
        </div>
      </div>
    </>
  );
}
