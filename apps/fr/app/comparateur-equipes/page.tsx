"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, ArrowRight, Trophy, Target, Users, TrendingUp } from "lucide-react";

interface TeamStats {
  name: string;
  fifaRanking: number;
  wcTitles: number;
  wcParticipations: number;
  wcGoals: number;
  wcMatches: number;
  bestResult: string;
  confederation: string;
  topPlayer: string;
}

const teamsData: TeamStats[] = [
  { name: "Argentine", fifaRanking: 1, wcTitles: 3, wcParticipations: 18, wcGoals: 137, wcMatches: 88, bestResult: "Champion (1978, 1986, 2022)", confederation: "CONMEBOL", topPlayer: "Lionel Messi" },
  { name: "France", fifaRanking: 2, wcTitles: 2, wcParticipations: 16, wcGoals: 120, wcMatches: 73, bestResult: "Champion (1998, 2018)", confederation: "UEFA", topPlayer: "Kylian Mbappé" },
  { name: "Brésil", fifaRanking: 5, wcTitles: 5, wcParticipations: 22, wcGoals: 229, wcMatches: 114, bestResult: "Champion (1958-2002, 5 titres)", confederation: "CONMEBOL", topPlayer: "Vinícius Jr" },
  { name: "Angleterre", fifaRanking: 4, wcTitles: 1, wcParticipations: 16, wcGoals: 91, wcMatches: 74, bestResult: "Champion (1966)", confederation: "UEFA", topPlayer: "Jude Bellingham" },
  { name: "Espagne", fifaRanking: 8, wcTitles: 1, wcParticipations: 16, wcGoals: 99, wcMatches: 67, bestResult: "Champion (2010)", confederation: "UEFA", topPlayer: "Lamine Yamal" },
  { name: "Allemagne", fifaRanking: 11, wcTitles: 4, wcParticipations: 20, wcGoals: 232, wcMatches: 112, bestResult: "Champion (1954-2014, 4 titres)", confederation: "UEFA", topPlayer: "Jamal Musiala" },
  { name: "Portugal", fifaRanking: 6, wcTitles: 0, wcParticipations: 8, wcGoals: 44, wcMatches: 36, bestResult: "3e (1966)", confederation: "UEFA", topPlayer: "Cristiano Ronaldo" },
  { name: "Pays-Bas", fifaRanking: 3, wcTitles: 0, wcParticipations: 11, wcGoals: 90, wcMatches: 54, bestResult: "Finaliste (1974, 1978, 2010)", confederation: "UEFA", topPlayer: "Virgil van Dijk" },
  { name: "Belgique", fifaRanking: 7, wcTitles: 0, wcParticipations: 14, wcGoals: 52, wcMatches: 51, bestResult: "3e (2018)", confederation: "UEFA", topPlayer: "Kevin De Bruyne" },
  { name: "Italie", fifaRanking: 9, wcTitles: 4, wcParticipations: 18, wcGoals: 128, wcMatches: 83, bestResult: "Champion (1934-2006, 4 titres)", confederation: "UEFA", topPlayer: "Nicolò Barella" },
  { name: "Croatie", fifaRanking: 10, wcTitles: 0, wcParticipations: 6, wcGoals: 28, wcMatches: 28, bestResult: "Finaliste (2018, 2022 3e)", confederation: "UEFA", topPlayer: "Luka Modrić" },
  { name: "Uruguay", fifaRanking: 14, wcTitles: 2, wcParticipations: 14, wcGoals: 87, wcMatches: 59, bestResult: "Champion (1930, 1950)", confederation: "CONMEBOL", topPlayer: "Federico Valverde" },
  { name: "Colombie", fifaRanking: 15, wcTitles: 0, wcParticipations: 6, wcGoals: 20, wcMatches: 21, bestResult: "Quart (2014)", confederation: "CONMEBOL", topPlayer: "Luis Díaz" },
  { name: "Mexique", fifaRanking: 13, wcTitles: 0, wcParticipations: 17, wcGoals: 60, wcMatches: 60, bestResult: "Quart (1970, 1986)", confederation: "CONCACAF", topPlayer: "Hirving Lozano" },
  { name: "États-Unis", fifaRanking: 16, wcTitles: 0, wcParticipations: 11, wcGoals: 37, wcMatches: 37, bestResult: "3e (1930)", confederation: "CONCACAF", topPlayer: "Christian Pulisic" },
  { name: "Japon", fifaRanking: 18, wcTitles: 0, wcParticipations: 7, wcGoals: 18, wcMatches: 24, bestResult: "8e (2002, 2010, 2018, 2022)", confederation: "AFC", topPlayer: "Takefusa Kubo" },
  { name: "Maroc", fifaRanking: 14, wcTitles: 0, wcParticipations: 6, wcGoals: 12, wcMatches: 20, bestResult: "4e (2022)", confederation: "CAF", topPlayer: "Achraf Hakimi" },
  { name: "Sénégal", fifaRanking: 20, wcTitles: 0, wcParticipations: 3, wcGoals: 8, wcMatches: 10, bestResult: "Quart (2002)", confederation: "CAF", topPlayer: "Sadio Mané" },
  { name: "Nigeria", fifaRanking: 28, wcTitles: 0, wcParticipations: 6, wcGoals: 16, wcMatches: 21, bestResult: "8e (1994, 1998, 2014)", confederation: "CAF", topPlayer: "Victor Osimhen" },
  { name: "Australie", fifaRanking: 23, wcTitles: 0, wcParticipations: 6, wcGoals: 9, wcMatches: 20, bestResult: "8e (2006, 2022)", confederation: "AFC", topPlayer: "Jackson Irvine" },
];

function StatBar({ val1, val2, label }: { val1: number; val2: number; label: string }) {
  const max = Math.max(val1, val2, 1);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium text-gray-500">{label}<span /></div>
      <div className="flex items-center gap-2">
        <span className="w-10 text-right text-sm font-bold text-primary">{val1}</span>
        <div className="flex-1 flex gap-1 h-5">
          <div className="flex-1 flex justify-end">
            <div className="bg-accent rounded-l-md h-full transition-all duration-500" style={{ width: `${(val1 / max) * 100}%` }} />
          </div>
          <div className="flex-1">
            <div className="bg-accent rounded-r-md h-full transition-all duration-500" style={{ width: `${(val2 / max) * 100}%` }} />
          </div>
        </div>
        <span className="w-10 text-sm font-bold text-primary">{val2}</span>
      </div>
    </div>
  );
}

export default function ComparateurEquipesPage() {
  const [team1, setTeam1] = useState("France");
  const [team2, setTeam2] = useState("Brésil");

  const t1 = teamsData.find((t) => t.name === team1);
  const t2 = teamsData.find((t) => t.name === team2);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Outil interactif
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Comparateur d&apos;équipes CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Comparez deux sélections nationales : classement FIFA, titres, buts marqués et statistiques historiques.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {/* Sélecteurs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <select
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            className="w-full sm:w-64 rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium bg-whitegray-800"
          >
            {teamsData.map((t) => (
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>
          <span className="text-xl font-black text-accent">VS</span>
          <select
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            className="w-full sm:w-64 rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium bg-whitegray-800"
          >
            {teamsData.map((t) => (
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>

        {t1 && t2 && (
          <>
            {/* Header noms */}
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <h3 className="text-xl font-extrabold text-primary">{t1.name}</h3>
                <p className="text-xs text-gray-500">{t1.confederation}</p>
              </div>
              <BarChart3 className="h-6 w-6 text-gray-300" />
              <div className="text-center flex-1">
                <h3 className="text-xl font-extrabold text-primary">{t2.name}</h3>
                <p className="text-xs text-gray-500">{t2.confederation}</p>
              </div>
            </div>

            {/* Stats comparées */}
            <div className="space-y-4 rounded-xl border border-gray-200 p-6">
              <StatBar val1={t1.fifaRanking} val2={t2.fifaRanking} label="Classement FIFA (plus bas = meilleur)" />
              <StatBar val1={t1.wcTitles} val2={t2.wcTitles} label="Titres de Champion du Monde" />
              <StatBar val1={t1.wcParticipations} val2={t2.wcParticipations} label="Participations en CDM" />
              <StatBar val1={t1.wcGoals} val2={t2.wcGoals} label="Buts marqués en CDM (historique)" />
              <StatBar val1={t1.wcMatches} val2={t2.wcMatches} label="Matchs joués en CDM" />
            </div>

            {/* Détails */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[t1, t2].map((t) => (
                <div key={t.name} className="rounded-xl border border-gray-200 p-5 space-y-3">
                  <h4 className="font-bold text-primary flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" /> {t.name}
                  </h4>
                  <div className="text-sm space-y-1.5 text-gray-600">
                    <p className="flex items-center gap-2"><TrendingUp className="h-3.5 w-3.5 text-gray-400" /> Classement FIFA : <strong>#{t.fifaRanking}</strong></p>
                    <p className="flex items-center gap-2"><Trophy className="h-3.5 w-3.5 text-gray-400" /> Meilleur résultat : <strong>{t.bestResult}</strong></p>
                    <p className="flex items-center gap-2"><Target className="h-3.5 w-3.5 text-gray-400" /> Ratio buts/match : <strong>{(t.wcGoals / Math.max(t.wcMatches, 1)).toFixed(2)}</strong></p>
                    <p className="flex items-center gap-2"><Users className="h-3.5 w-3.5 text-gray-400" /> Joueur star : <strong>{t.topPlayer}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-center">
          <Link
            href="/equipe"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
          >
            Voir toutes les équipes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
