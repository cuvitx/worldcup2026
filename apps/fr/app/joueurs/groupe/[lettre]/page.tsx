import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsById } from "@repo/data/teams";
import { groups } from "@repo/data/groups";
import { players } from "@repo/data/players";

interface Props { params: Promise<{ lettre: string }> }

export async function generateStaticParams() {
  return groups.map((g) => ({ lettre: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lettre } = await params;
  const group = groups.find((g) => g.slug === lettre);
  if (!group) return {};
  return {
    title: `Joueurs Groupe ${group.letter.toUpperCase()} — CDM 2026`,
    description: `Tous les joueurs du Groupe ${group.letter.toUpperCase()} de la Coupe du Monde 2026. Fiches et statistiques par équipe.`,
  };
}

export default async function JoueursGroupePage({ params }: Props) {
  const { lettre } = await params;
  const group = groups.find((g) => g.slug === lettre);
  if (!group) notFound();

  const groupTeams = group.teams.map((id) => teamsById[id]).filter(Boolean);

  return (
    <>
      <section className="hero-animated text-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Joueurs Groupe {group.letter.toUpperCase()} — CDM 2026
          </h1>
          <p className="mt-3 text-white/70 text-lg">{groupTeams.length} équipes</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {groupTeams.map((team) => {
          if (!team) return null;
          const teamPlayers = players.filter((p) => p.teamId === team.id);
          return (
            <div key={team.slug} className="mb-10">
              <h2 className="text-xl font-bold text-primary mb-4">
                <Link href={`/equipe/${team.slug}`} className="hover:underline">{team.flag} {team.name}</Link>
                <span className="text-gray-400 font-normal ml-2">({teamPlayers.length} joueurs)</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {teamPlayers.slice(0, 12).map((p) => (
                  <Link key={p.slug} href={`/joueur/${p.slug}`} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                    <div>
                      <div className="font-semibold text-gray-900">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.club} · {p.age} ans</div>
                    </div>
                  </Link>
                ))}
              </div>
              {teamPlayers.length > 12 && (
                <Link href={`/joueurs/equipe/${team.slug}`} className="text-primary hover:underline text-sm mt-2 inline-block">
                  Voir les {teamPlayers.length} joueurs →
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
