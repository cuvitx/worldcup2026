export interface PlayerStats {
  id: string;
  name: string;
  teamId: string;
  position: "GK" | "DF" | "MF" | "FW";
  age: number;
  club: string;
  goals: number;
  assists: number;
  appearances: number;
  minutesPlayed: number;
  passAccuracy: number;
  dribbleSuccess: number;
  aerialDuels: number;
  rating: number;
}

export const playerStats: PlayerStats[] = [
  // France
  { id: "mbappe", name: "Kylian Mbappé", teamId: "france", position: "FW", age: 27, club: "Real Madrid", goals: 38, assists: 12, appearances: 45, minutesPlayed: 3780, passAccuracy: 82, dribbleSuccess: 68, aerialDuels: 35, rating: 8.9 },
  { id: "griezmann", name: "Antoine Griezmann", teamId: "france", position: "FW", age: 35, club: "Atletico Madrid", goals: 14, assists: 10, appearances: 40, minutesPlayed: 3200, passAccuracy: 85, dribbleSuccess: 52, aerialDuels: 42, rating: 7.8 },
  { id: "tchouameni", name: "Aurélien Tchouaméni", teamId: "france", position: "MF", age: 26, club: "Real Madrid", goals: 4, assists: 6, appearances: 42, minutesPlayed: 3600, passAccuracy: 91, dribbleSuccess: 45, aerialDuels: 65, rating: 7.6 },
  { id: "saliba", name: "William Saliba", teamId: "france", position: "DF", age: 25, club: "Arsenal", goals: 3, assists: 2, appearances: 40, minutesPlayed: 3500, passAccuracy: 92, dribbleSuccess: 30, aerialDuels: 72, rating: 7.7 },

  // Espagne
  { id: "yamal", name: "Lamine Yamal", teamId: "espagne", position: "FW", age: 18, club: "FC Barcelona", goals: 18, assists: 16, appearances: 42, minutesPlayed: 3400, passAccuracy: 84, dribbleSuccess: 72, aerialDuels: 22, rating: 8.4 },
  { id: "pedri", name: "Pedri", teamId: "espagne", position: "MF", age: 23, club: "FC Barcelona", goals: 8, assists: 14, appearances: 38, minutesPlayed: 3100, passAccuracy: 93, dribbleSuccess: 65, aerialDuels: 30, rating: 8.2 },
  { id: "rodri", name: "Rodri", teamId: "espagne", position: "MF", age: 29, club: "Manchester City", goals: 6, assists: 9, appearances: 35, minutesPlayed: 3000, passAccuracy: 94, dribbleSuccess: 40, aerialDuels: 58, rating: 8.5 },

  // Angleterre
  { id: "bellingham", name: "Jude Bellingham", teamId: "angleterre", position: "MF", age: 22, club: "Real Madrid", goals: 22, assists: 11, appearances: 44, minutesPlayed: 3700, passAccuracy: 88, dribbleSuccess: 62, aerialDuels: 48, rating: 8.7 },
  { id: "saka", name: "Bukayo Saka", teamId: "angleterre", position: "FW", age: 24, club: "Arsenal", goals: 20, assists: 14, appearances: 42, minutesPlayed: 3500, passAccuracy: 83, dribbleSuccess: 66, aerialDuels: 28, rating: 8.3 },
  { id: "foden", name: "Phil Foden", teamId: "angleterre", position: "MF", age: 25, club: "Manchester City", goals: 16, assists: 12, appearances: 40, minutesPlayed: 3200, passAccuracy: 87, dribbleSuccess: 60, aerialDuels: 25, rating: 8.1 },
  { id: "rice", name: "Declan Rice", teamId: "angleterre", position: "MF", age: 27, club: "Arsenal", goals: 5, assists: 8, appearances: 42, minutesPlayed: 3600, passAccuracy: 90, dribbleSuccess: 42, aerialDuels: 55, rating: 7.9 },

  // Argentine
  { id: "messi", name: "Lionel Messi", teamId: "argentine", position: "FW", age: 38, club: "Inter Miami", goals: 22, assists: 18, appearances: 35, minutesPlayed: 2800, passAccuracy: 88, dribbleSuccess: 70, aerialDuels: 18, rating: 8.6 },
  { id: "alvarez", name: "Julián Álvarez", teamId: "argentine", position: "FW", age: 26, club: "Atletico Madrid", goals: 24, assists: 8, appearances: 44, minutesPlayed: 3600, passAccuracy: 80, dribbleSuccess: 55, aerialDuels: 45, rating: 8.0 },
  { id: "fernandez", name: "Enzo Fernández", teamId: "argentine", position: "MF", age: 25, club: "Chelsea", goals: 6, assists: 10, appearances: 40, minutesPlayed: 3400, passAccuracy: 89, dribbleSuccess: 48, aerialDuels: 50, rating: 7.8 },

  // Brésil
  { id: "vinicius", name: "Vinícius Jr", teamId: "bresil", position: "FW", age: 25, club: "Real Madrid", goals: 30, assists: 14, appearances: 44, minutesPlayed: 3700, passAccuracy: 81, dribbleSuccess: 74, aerialDuels: 20, rating: 8.8 },
  { id: "rodrygo", name: "Rodrygo", teamId: "bresil", position: "FW", age: 25, club: "Real Madrid", goals: 16, assists: 10, appearances: 42, minutesPlayed: 3400, passAccuracy: 83, dribbleSuccess: 60, aerialDuels: 26, rating: 7.9 },
  { id: "endrick", name: "Endrick", teamId: "bresil", position: "FW", age: 19, club: "Real Madrid", goals: 12, assists: 4, appearances: 30, minutesPlayed: 2200, passAccuracy: 78, dribbleSuccess: 58, aerialDuels: 38, rating: 7.5 },

  // Allemagne
  { id: "musiala", name: "Jamal Musiala", teamId: "allemagne", position: "MF", age: 23, club: "Bayern Munich", goals: 16, assists: 14, appearances: 42, minutesPlayed: 3500, passAccuracy: 86, dribbleSuccess: 71, aerialDuels: 24, rating: 8.4 },
  { id: "wirtz", name: "Florian Wirtz", teamId: "allemagne", position: "MF", age: 22, club: "Bayer Leverkusen", goals: 18, assists: 16, appearances: 40, minutesPlayed: 3300, passAccuracy: 87, dribbleSuccess: 64, aerialDuels: 22, rating: 8.5 },
  { id: "havertz", name: "Kai Havertz", teamId: "allemagne", position: "FW", age: 26, club: "Arsenal", goals: 15, assists: 8, appearances: 38, minutesPlayed: 3100, passAccuracy: 82, dribbleSuccess: 48, aerialDuels: 56, rating: 7.7 },

  // Portugal
  { id: "ronaldo", name: "Cristiano Ronaldo", teamId: "portugal", position: "FW", age: 41, club: "Al-Nassr", goals: 35, assists: 6, appearances: 40, minutesPlayed: 3400, passAccuracy: 78, dribbleSuccess: 42, aerialDuels: 62, rating: 8.2 },
  { id: "bernardo", name: "Bernardo Silva", teamId: "portugal", position: "MF", age: 31, club: "Manchester City", goals: 10, assists: 12, appearances: 42, minutesPlayed: 3500, passAccuracy: 91, dribbleSuccess: 62, aerialDuels: 28, rating: 8.1 },
  { id: "rafael-leao", name: "Rafael Leão", teamId: "portugal", position: "FW", age: 26, club: "AC Milan", goals: 14, assists: 10, appearances: 38, minutesPlayed: 3000, passAccuracy: 80, dribbleSuccess: 68, aerialDuels: 24, rating: 7.8 },

  // Pays-Bas
  { id: "gakpo", name: "Cody Gakpo", teamId: "pays-bas", position: "FW", age: 25, club: "Liverpool", goals: 18, assists: 10, appearances: 42, minutesPlayed: 3400, passAccuracy: 82, dribbleSuccess: 58, aerialDuels: 40, rating: 7.9 },

  // Belgique
  { id: "de-bruyne", name: "Kevin De Bruyne", teamId: "belgique", position: "MF", age: 34, club: "Manchester City", goals: 10, assists: 20, appearances: 36, minutesPlayed: 2900, passAccuracy: 92, dribbleSuccess: 50, aerialDuels: 32, rating: 8.6 },

  // Norvège
  { id: "haaland", name: "Erling Haaland", teamId: "norvege", position: "FW", age: 25, club: "Manchester City", goals: 42, assists: 6, appearances: 40, minutesPlayed: 3400, passAccuracy: 74, dribbleSuccess: 38, aerialDuels: 58, rating: 8.9 },

  // Croatie
  { id: "modric", name: "Luka Modrić", teamId: "croatie", position: "MF", age: 40, club: "Real Madrid", goals: 4, assists: 10, appearances: 34, minutesPlayed: 2600, passAccuracy: 93, dribbleSuccess: 55, aerialDuels: 30, rating: 8.0 },

  // Uruguay
  { id: "valverde", name: "Federico Valverde", teamId: "uruguay", position: "MF", age: 27, club: "Real Madrid", goals: 10, assists: 8, appearances: 44, minutesPlayed: 3800, passAccuracy: 87, dribbleSuccess: 52, aerialDuels: 50, rating: 8.1 },
  { id: "nunez", name: "Darwin Núñez", teamId: "uruguay", position: "FW", age: 26, club: "Liverpool", goals: 22, assists: 6, appearances: 42, minutesPlayed: 3400, passAccuracy: 72, dribbleSuccess: 48, aerialDuels: 55, rating: 7.7 },

  // Colombie
  { id: "luis-diaz", name: "Luis Díaz", teamId: "colombie", position: "FW", age: 29, club: "Liverpool", goals: 16, assists: 10, appearances: 40, minutesPlayed: 3200, passAccuracy: 80, dribbleSuccess: 64, aerialDuels: 22, rating: 7.8 },

  // Maroc
  { id: "hakimi", name: "Achraf Hakimi", teamId: "maroc", position: "DF", age: 27, club: "PSG", goals: 4, assists: 12, appearances: 42, minutesPlayed: 3600, passAccuracy: 85, dribbleSuccess: 60, aerialDuels: 45, rating: 7.9 },

  // Sénégal
  { id: "ismaila-sarr", name: "Ismaïla Sarr", teamId: "senegal", position: "FW", age: 28, club: "Crystal Palace", goals: 12, assists: 8, appearances: 38, minutesPlayed: 3000, passAccuracy: 76, dribbleSuccess: 62, aerialDuels: 30, rating: 7.4 },

  // Japon
  { id: "kubo", name: "Takefusa Kubo", teamId: "japon", position: "FW", age: 24, club: "Real Sociedad", goals: 14, assists: 8, appearances: 40, minutesPlayed: 3200, passAccuracy: 82, dribbleSuccess: 66, aerialDuels: 18, rating: 7.7 },

  // Canada
  { id: "david", name: "Jonathan David", teamId: "canada", position: "FW", age: 26, club: "Lille", goals: 24, assists: 6, appearances: 42, minutesPlayed: 3500, passAccuracy: 78, dribbleSuccess: 50, aerialDuels: 40, rating: 7.8 },

  // États-Unis
  { id: "pulisic", name: "Christian Pulisic", teamId: "etats-unis", position: "FW", age: 27, club: "AC Milan", goals: 14, assists: 12, appearances: 40, minutesPlayed: 3200, passAccuracy: 83, dribbleSuccess: 64, aerialDuels: 22, rating: 7.9 },

  // Mexique
  { id: "lozano", name: "Hirving Lozano", teamId: "mexique", position: "FW", age: 30, club: "PSV Eindhoven", goals: 12, assists: 8, appearances: 36, minutesPlayed: 2800, passAccuracy: 79, dribbleSuccess: 60, aerialDuels: 20, rating: 7.5 },

  // Équateur
  { id: "caicedo", name: "Moisés Caicedo", teamId: "equateur", position: "MF", age: 24, club: "Chelsea", goals: 4, assists: 6, appearances: 40, minutesPlayed: 3400, passAccuracy: 88, dribbleSuccess: 46, aerialDuels: 60, rating: 7.7 },
];

export const playerStatsById: Record<string, PlayerStats> = Object.fromEntries(
  playerStats.map((p) => [p.id, p])
);

export const playerStatsByTeam: Record<string, PlayerStats[]> = playerStats.reduce(
  (acc, p) => {
    (acc[p.teamId] ??= []).push(p);
    return acc;
  },
  {} as Record<string, PlayerStats[]>
);
