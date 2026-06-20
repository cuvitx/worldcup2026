import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsById } from "../../../../lib/localized-data";
import { players } from "../../../../lib/localized-data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return teams.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const team = teams.find((t) => t.slug === slug);
  if (!team) return {};
  return {
    title: `Spieler ${team.name} -- WM 2026 | Komplette Liste`,
    description: `Alle Spieler von ${team.name} im Kader fur die WM 2026. Ausfuhrliche Steckbriefe, Statistiken und Profile.`,
    openGraph: { images: [{ url: `/api/og?type=mannschaft&slug=${slug}`, width: 1200, height: 630 }] },
  };
}

const POS_LABELS: Record<string, string> = { GK: "Torhüter", DF: "Verteidiger", MF: "Mittelfeldspieler", FW: "Stürmer" };
const POS_ORDER = ["GK", "DF", "MF", "FW"];

export default async function SpielerMannschaftPage({ params }: Props) {
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
            {team.flag} Spieler {team.name} -- WM 2026
          </h1>
          <p className="mt-3 text-white/70 text-lg">{teamPlayers.length} Spieler im Kader</p>
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
                  <Link key={p.slug} href={`/spieler/${p.slug}`} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                    <div>
                      <div className="font-semibold text-gray-900">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.club} · {p.age} J.</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        <div className="mt-8 text-center">
          <Link href={`/mannschaft/${slug}`} className="text-primary hover:underline font-medium">← Vollstandiges Profil {team.name}</Link>
        </div>
      </div>
    </>
  );
}
