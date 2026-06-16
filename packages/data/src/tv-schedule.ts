export interface TVInfo {
  channels: string[]; // e.g. ["beIN Sports", "TF1"]
  streaming: string[]; // e.g. ["beIN CONNECT", "MYTF1"]
}

// Default: all matches are on beIN Sports
const defaultTV: TVInfo = {
  channels: ["beIN Sports"],
  streaming: ["beIN CONNECT"],
};

// Matches that are ALSO on TF1 or M6 (override with additional channels)
// Key: match slug
const tvOverrides: Record<string, TVInfo> = {
  // Opening match
  "mexique-vs-panama": {
    channels: ["TF1", "beIN Sports"],
    streaming: ["MYTF1", "beIN CONNECT"],
  },
  // France group matches
  "france-vs-senegal": {
    channels: ["TF1", "beIN Sports"],
    streaming: ["MYTF1", "beIN CONNECT"],
  },
  "france-vs-irak": {
    channels: ["TF1", "beIN Sports"],
    streaming: ["MYTF1", "beIN CONNECT"],
  },
  "norvege-vs-france": {
    channels: ["TF1", "beIN Sports"],
    streaming: ["MYTF1", "beIN CONNECT"],
  },
  // Prominent matches on M6
  "bresil-vs-maroc": {
    channels: ["M6", "beIN Sports"],
    streaming: ["6play", "beIN CONNECT"],
  },
  "argentine-vs-algerie": {
    channels: ["M6", "beIN Sports"],
    streaming: ["6play", "beIN CONNECT"],
  },
  "espagne-vs-equateur": {
    channels: ["M6", "beIN Sports"],
    streaming: ["6play", "beIN CONNECT"],
  },
  "angleterre-vs-etats-unis": {
    channels: ["M6", "beIN Sports"],
    streaming: ["6play", "beIN CONNECT"],
  },
  "allemagne-vs-colombie": {
    channels: ["M6", "beIN Sports"],
    streaming: ["6play", "beIN CONNECT"],
  },
  // Other TF1 picks
  "portugal-vs-canada": {
    channels: ["TF1", "beIN Sports"],
    streaming: ["MYTF1", "beIN CONNECT"],
  },
};

export function getTVInfo(matchSlug: string): TVInfo {
  return tvOverrides[matchSlug] ?? defaultTV;
}
