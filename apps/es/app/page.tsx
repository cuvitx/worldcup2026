import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teams, teamsById } from "@repo/data/teams";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { GroupCard } from "./components/GroupCard";
import { TeamCard } from "./components/TeamCard";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Copa del Mundo <span className="text-gold">2026</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            Pronosticos, estadisticas y guia completa de la primera Copa del
            Mundo con 48 selecciones. 104 partidos, 210 jugadores, 16 estadios en
            Estados Unidos, Canada y Mexico.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/grupo/a"
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Ver los grupos
            </Link>
            <Link
              href="/match/calendario"
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Calendario de partidos
            </Link>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="border-b border-gray-200 bg-white py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-4">
          {[
            { value: "48", label: "Equipos" },
            { value: "104", label: "Partidos" },
            { value: "16", label: "Ciudades sede" },
            { value: "39", label: "Dias" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Groups */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            Los 12 grupos
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {groups.map((group) => {
              const groupTeams = group.teams
                .map((id) => teamsById[id])
                .filter((t): t is NonNullable<typeof t> => t != null);
              return (
                <GroupCard
                  key={group.letter}
                  group={group}
                  teams={groupTeams}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Favorites */}
      <section className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Equipos favoritos
            </h2>
            <Link
              href="/equipos"
              className="text-sm font-medium text-accent hover:underline"
            >
              Ver las 48 selecciones &rarr;
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teams
              .filter((t) => t.fifaRanking <= 10)
              .sort((a, b) => a.fifaRanking - b.fifaRanking)
              .map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
          </div>
        </div>
      </section>

      {/* Estadios y ciudades */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Estadios y ciudades sede
            </h2>
            <div className="flex gap-4">
              <Link
                href="/estadios"
                className="text-sm font-medium text-accent hover:underline"
              >
                Todos los estadios &rarr;
              </Link>
              <Link
                href="/ciudades"
                className="text-sm font-medium text-accent hover:underline"
              >
                Todas las ciudades &rarr;
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stadiums.slice(0, 8).map((stadium) => {
              const city = cities.find((c) => c.id === stadium.cityId);
              return (
                <Link
                  key={stadium.id}
                  href={`/estadio/${stadium.slug}`}
                  className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-accent hover:bg-accent/5"
                >
                  <p className="font-semibold">{stadium.name}</p>
                  <p className="text-sm text-gray-500">
                    {city?.name ?? stadium.city} &middot;{" "}
                    {stadium.capacity.toLocaleString("es-ES")} plazas
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-field py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            11 de junio - 19 de julio de 2026
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-field-light">
            La primera Copa del Mundo con 48 selecciones se celebra en Estados Unidos,
            Canada y Mexico. Descubre todas las selecciones, los estadios y
            los pronosticos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/match/calendario"
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Calendario de partidos
            </Link>
            <Link
              href="/estadios"
              className="rounded-lg bg-white/10 px-6 py-3 font-semibold transition-colors hover:bg-white/20"
            >
              Guia de estadios
            </Link>
            <Link
              href="/ciudades"
              className="rounded-lg bg-white/10 px-6 py-3 font-semibold transition-colors hover:bg-white/20"
            >
              Ciudades sede
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
