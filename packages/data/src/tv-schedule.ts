export interface TVInfo {
  channels: string[]; // e.g. ["M6", "beIN Sports"]
  streaming: string[]; // e.g. ["M6+", "beIN CONNECT"]
}

// Default: all 104 matches are on beIN Sports (subscription)
const defaultTV: TVInfo = {
  channels: ["beIN Sports"],
  streaming: ["beIN CONNECT"],
};

// M6 broadcasts ~54 matches in free-to-air (34 group stage + 20 knockout).
// TF1 has ZERO matches — M6 won exclusive free-to-air rights for 2026 & 2030.
// Key = match slug
const tvOverrides: Record<string, TVInfo> = {
  // ─── GROUP STAGE — MATCHDAY 1 ───
  // Opening match
  "mexique-vs-afrique-du-sud": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  // Major J1 matches
  "allemagne-vs-curacao": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "pays-bas-vs-japon": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "espagne-vs-cap-vert": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "belgique-vs-egypte": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  // France J1
  "france-vs-senegal": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "barrage-interconf-2-vs-norvege": {
    // Irak vs Norvège
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "portugal-vs-barrage-interconf-1": {
    // Portugal vs RD Congo
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "angleterre-vs-croatie": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },

  // ─── GROUP STAGE — MATCHDAY 2 ───
  "barrage-uefa-d-vs-afrique-du-sud": {
    // Tchéquie vs Afrique du Sud
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "suisse-vs-barrage-uefa-a": {
    // Suisse vs Bosnie
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "etats-unis-vs-australie": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "ecosse-vs-maroc": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "pays-bas-vs-barrage-uefa-b": {
    // Pays-Bas vs Suède
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "allemagne-vs-cote-divoire": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "espagne-vs-arabie-saoudite": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "belgique-vs-iran": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "argentine-vs-autriche": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  // France J2
  "france-vs-barrage-interconf-2": {
    // France vs Irak
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "portugal-vs-ouzbekistan": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "angleterre-vs-ghana": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },

  // ─── GROUP STAGE — MATCHDAY 3 ───
  "suisse-vs-canada": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "ecosse-vs-bresil": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "equateur-vs-allemagne": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "tunisie-vs-pays-bas": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  // France J3
  "norvege-vs-france": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "panama-vs-angleterre": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "colombie-vs-portugal": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },

  // ─── KNOCKOUT STAGE ───
  // Round of 32 (prime-time matches)
  "r32-match-1": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r32-match-2": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r32-match-3": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r32-match-5": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r32-match-6": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r32-match-8": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r32-match-9": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r32-match-11": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r32-match-14": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  // Round of 16
  "r16-match-1": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r16-match-2": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r16-match-3": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r16-match-5": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r16-match-6": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r16-match-7": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "r16-match-8": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  // Quarter-finals (all on M6)
  "qf-1": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "qf-2": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "qf-3": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "qf-4": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  // Semi-finals
  "sf-1": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  "sf-2": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  // Third place
  "third-place": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
  // Final
  "finale": {
    channels: ["M6", "beIN Sports"],
    streaming: ["M6+", "beIN CONNECT"],
  },
};

export function getTVInfo(matchSlug: string): TVInfo {
  return tvOverrides[matchSlug] ?? defaultTV;
}
