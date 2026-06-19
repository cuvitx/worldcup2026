// Mock odds data for World Cup 2026 group stage matches
// Based on approximate ELO ratings / FIFA rankings with ~8% bookmaker margin
// Each bookmaker has slightly different odds to simulate real market variation

import { pmuTrackingUrl } from "@repo/data/affiliates";

export interface MatchOdds {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  group: string;
  date: string;
  odds: {
    bookmaker: string;
    home: number;
    draw: number;
    away: number;
    url: string;
  }[];
}

const PMU_URL = pmuTrackingUrl("comparateur-cotes");

function makeOdds(home: number, draw: number, away: number) {
  return [
    {
      bookmaker: "Betano",
      home,
      draw,
      away,
      url: PMU_URL,
    },
  ];
}

export const mockOdds: MatchOdds[] = [
  // GROUP A
  { matchId: "m01", homeTeam: "Mexique", awayTeam: "Afrique du Sud", homeFlag: "🇲🇽", awayFlag: "🇿🇦", group: "A", date: "11 juin", odds: makeOdds(1.55, 3.80, 5.50) },
  { matchId: "m02", homeTeam: "Corée du Sud", awayTeam: "Barrage UEFA D", homeFlag: "🇰🇷", awayFlag: "️", group: "A", date: "12 juin", odds: makeOdds(1.90, 3.40, 4.00) },
  { matchId: "m-a3", homeTeam: "Mexique", awayTeam: "Corée du Sud", homeFlag: "🇲🇽", awayFlag: "🇰🇷", group: "A", date: "15 juin", odds: makeOdds(1.80, 3.50, 4.20) },
  { matchId: "m-a4", homeTeam: "Afrique du Sud", awayTeam: "Barrage UEFA D", homeFlag: "🇿🇦", awayFlag: "️", group: "A", date: "15 juin", odds: makeOdds(2.20, 3.20, 3.30) },
  { matchId: "m-a5", homeTeam: "Corée du Sud", awayTeam: "Mexique", homeFlag: "🇰🇷", awayFlag: "🇲🇽", group: "A", date: "19 juin", odds: makeOdds(3.20, 3.40, 2.10) },
  { matchId: "m-a6", homeTeam: "Barrage UEFA D", awayTeam: "Afrique du Sud", homeFlag: "️", awayFlag: "🇿🇦", group: "A", date: "19 juin", odds: makeOdds(2.50, 3.20, 2.80) },

  // GROUP B
  { matchId: "m03", homeTeam: "Canada", awayTeam: "Barrage UEFA A", homeFlag: "🇨🇦", awayFlag: "️", group: "B", date: "12 juin", odds: makeOdds(1.75, 3.50, 4.50) },
  { matchId: "m04", homeTeam: "Suisse", awayTeam: "Qatar", homeFlag: "🇨🇭", awayFlag: "🇶🇦", group: "B", date: "12 juin", odds: makeOdds(1.50, 3.90, 6.00) },
  { matchId: "m-b3", homeTeam: "Canada", awayTeam: "Suisse", homeFlag: "🇨🇦", awayFlag: "🇨🇭", group: "B", date: "16 juin", odds: makeOdds(2.60, 3.20, 2.70) },
  { matchId: "m-b4", homeTeam: "Qatar", awayTeam: "Barrage UEFA A", homeFlag: "🇶🇦", awayFlag: "️", group: "B", date: "16 juin", odds: makeOdds(2.40, 3.20, 2.90) },
  { matchId: "m-b5", homeTeam: "Suisse", awayTeam: "Canada", homeFlag: "🇨🇭", awayFlag: "🇨🇦", group: "B", date: "20 juin", odds: makeOdds(2.30, 3.30, 3.00) },
  { matchId: "m-b6", homeTeam: "Barrage UEFA A", awayTeam: "Qatar", homeFlag: "️", awayFlag: "🇶🇦", group: "B", date: "20 juin", odds: makeOdds(2.20, 3.20, 3.30) },

  // GROUP C
  { matchId: "m05", homeTeam: "Brésil", awayTeam: "Maroc", homeFlag: "🇧🇷", awayFlag: "🇲🇦", group: "C", date: "12 juin", odds: makeOdds(1.75, 3.50, 4.50) },
  { matchId: "m06", homeTeam: "Écosse", awayTeam: "Haïti", homeFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", awayFlag: "🇭🇹", group: "C", date: "13 juin", odds: makeOdds(1.35, 4.50, 8.50) },
  { matchId: "m-c3", homeTeam: "Brésil", awayTeam: "Écosse", homeFlag: "🇧🇷", awayFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", date: "17 juin", odds: makeOdds(1.30, 5.00, 9.50) },
  { matchId: "m-c4", homeTeam: "Maroc", awayTeam: "Haïti", homeFlag: "🇲🇦", awayFlag: "🇭🇹", group: "C", date: "17 juin", odds: makeOdds(1.25, 5.20, 10.00) },
  { matchId: "m-c5", homeTeam: "Maroc", awayTeam: "Brésil", homeFlag: "🇲🇦", awayFlag: "🇧🇷", group: "C", date: "21 juin", odds: makeOdds(4.00, 3.40, 1.85) },
  { matchId: "m-c6", homeTeam: "Haïti", awayTeam: "Écosse", homeFlag: "🇭🇹", awayFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", date: "21 juin", odds: makeOdds(6.50, 4.00, 1.50) },

  // GROUP D
  { matchId: "m07", homeTeam: "États-Unis", awayTeam: "Paraguay", homeFlag: "🇺🇸", awayFlag: "🇵🇾", group: "D", date: "13 juin", odds: makeOdds(1.55, 3.80, 5.50) },
  { matchId: "m08", homeTeam: "Australie", awayTeam: "Barrage UEFA C", homeFlag: "🇦🇺", awayFlag: "️", group: "D", date: "13 juin", odds: makeOdds(2.10, 3.30, 3.40) },
  { matchId: "m-d3", homeTeam: "États-Unis", awayTeam: "Australie", homeFlag: "🇺🇸", awayFlag: "🇦🇺", group: "D", date: "17 juin", odds: makeOdds(1.50, 3.90, 6.00) },
  { matchId: "m-d4", homeTeam: "Paraguay", awayTeam: "Barrage UEFA C", homeFlag: "🇵🇾", awayFlag: "️", group: "D", date: "17 juin", odds: makeOdds(1.95, 3.30, 3.90) },
  { matchId: "m-d5", homeTeam: "Australie", awayTeam: "États-Unis", homeFlag: "🇦🇺", awayFlag: "🇺🇸", group: "D", date: "21 juin", odds: makeOdds(4.80, 3.60, 1.70) },
  { matchId: "m-d6", homeTeam: "Barrage UEFA C", awayTeam: "Paraguay", homeFlag: "️", awayFlag: "🇵🇾", group: "D", date: "21 juin", odds: makeOdds(3.20, 3.20, 2.25) },

  // GROUP E
  { matchId: "m09", homeTeam: "Allemagne", awayTeam: "Équateur", homeFlag: "🇩🇪", awayFlag: "🇪🇨", group: "E", date: "13 juin", odds: makeOdds(1.40, 4.20, 7.50) },
  { matchId: "m10", homeTeam: "Côte d'Ivoire", awayTeam: "Curaçao", homeFlag: "🇨🇮", awayFlag: "🇨🇼", group: "E", date: "14 juin", odds: makeOdds(1.30, 4.80, 9.00) },
  { matchId: "m-e3", homeTeam: "Allemagne", awayTeam: "Côte d'Ivoire", homeFlag: "🇩🇪", awayFlag: "🇨🇮", group: "E", date: "18 juin", odds: makeOdds(1.45, 4.00, 7.00) },
  { matchId: "m-e4", homeTeam: "Équateur", awayTeam: "Curaçao", homeFlag: "🇪🇨", awayFlag: "🇨🇼", group: "E", date: "18 juin", odds: makeOdds(1.30, 4.80, 9.00) },
  { matchId: "m-e5", homeTeam: "Équateur", awayTeam: "Allemagne", homeFlag: "🇪🇨", awayFlag: "🇩🇪", group: "E", date: "22 juin", odds: makeOdds(5.50, 3.80, 1.55) },
  { matchId: "m-e6", homeTeam: "Curaçao", awayTeam: "Côte d'Ivoire", homeFlag: "🇨🇼", awayFlag: "🇨🇮", group: "E", date: "22 juin", odds: makeOdds(7.00, 4.20, 1.45) },

  // GROUP F
  { matchId: "m11", homeTeam: "France", awayTeam: "Colombie", homeFlag: "🇫🇷", awayFlag: "🇨🇴", group: "F", date: "14 juin", odds: makeOdds(1.65, 3.60, 5.00) },
  { matchId: "m12", homeTeam: "Arabie Saoudite", awayTeam: "Pérou", homeFlag: "🇸🇦", awayFlag: "🇵🇪", group: "F", date: "14 juin", odds: makeOdds(2.50, 3.10, 2.90) },
  { matchId: "m-f3", homeTeam: "France", awayTeam: "Arabie Saoudite", homeFlag: "🇫🇷", awayFlag: "🇸🇦", group: "F", date: "18 juin", odds: makeOdds(1.20, 5.80, 12.00) },
  { matchId: "m-f4", homeTeam: "Colombie", awayTeam: "Pérou", homeFlag: "🇨🇴", awayFlag: "🇵🇪", group: "F", date: "18 juin", odds: makeOdds(1.80, 3.40, 4.40) },
  { matchId: "m-f5", homeTeam: "Colombie", awayTeam: "France", homeFlag: "🇨🇴", awayFlag: "🇫🇷", group: "F", date: "22 juin", odds: makeOdds(4.00, 3.40, 1.85) },
  { matchId: "m-f6", homeTeam: "Pérou", awayTeam: "Arabie Saoudite", homeFlag: "🇵🇪", awayFlag: "🇸🇦", group: "F", date: "22 juin", odds: makeOdds(2.30, 3.20, 3.10) },

  // GROUP G
  { matchId: "m13", homeTeam: "Espagne", awayTeam: "Turquie", homeFlag: "🇪🇸", awayFlag: "🇹🇷", group: "G", date: "14 juin", odds: makeOdds(1.55, 3.80, 5.50) },
  { matchId: "m14", homeTeam: "Nouvelle-Zélande", awayTeam: "Chine", homeFlag: "🇳🇿", awayFlag: "🇨🇳", group: "G", date: "15 juin", odds: makeOdds(2.30, 3.20, 3.10) },
  { matchId: "m-g3", homeTeam: "Espagne", awayTeam: "Nouvelle-Zélande", homeFlag: "🇪🇸", awayFlag: "🇳🇿", group: "G", date: "19 juin", odds: makeOdds(1.12, 7.50, 18.00) },
  { matchId: "m-g4", homeTeam: "Turquie", awayTeam: "Chine", homeFlag: "🇹🇷", awayFlag: "🇨🇳", group: "G", date: "19 juin", odds: makeOdds(1.35, 4.50, 8.50) },
  { matchId: "m-g5", homeTeam: "Turquie", awayTeam: "Espagne", homeFlag: "🇹🇷", awayFlag: "🇪🇸", group: "G", date: "23 juin", odds: makeOdds(4.50, 3.60, 1.70) },
  { matchId: "m-g6", homeTeam: "Chine", awayTeam: "Nouvelle-Zélande", homeFlag: "🇨🇳", awayFlag: "🇳🇿", group: "G", date: "23 juin", odds: makeOdds(2.50, 3.20, 2.80) },

  // GROUP H
  { matchId: "m15", homeTeam: "Argentine", awayTeam: "Cameroun", homeFlag: "🇦🇷", awayFlag: "🇨🇲", group: "H", date: "15 juin", odds: makeOdds(1.25, 5.20, 10.00) },
  { matchId: "m16", homeTeam: "Japon", awayTeam: "Sénégal", homeFlag: "🇯🇵", awayFlag: "🇸🇳", group: "H", date: "15 juin", odds: makeOdds(2.20, 3.30, 3.20) },
  { matchId: "m-h3", homeTeam: "Argentine", awayTeam: "Japon", homeFlag: "🇦🇷", awayFlag: "🇯🇵", group: "H", date: "19 juin", odds: makeOdds(1.40, 4.20, 7.50) },
  { matchId: "m-h4", homeTeam: "Cameroun", awayTeam: "Sénégal", homeFlag: "🇨🇲", awayFlag: "🇸🇳", group: "H", date: "19 juin", odds: makeOdds(2.80, 3.10, 2.60) },
  { matchId: "m-h5", homeTeam: "Japon", awayTeam: "Argentine", homeFlag: "🇯🇵", awayFlag: "🇦🇷", group: "H", date: "23 juin", odds: makeOdds(5.50, 3.80, 1.55) },
  { matchId: "m-h6", homeTeam: "Sénégal", awayTeam: "Cameroun", homeFlag: "🇸🇳", awayFlag: "🇨🇲", group: "H", date: "23 juin", odds: makeOdds(2.10, 3.30, 3.40) },

  // GROUP I
  { matchId: "m17", homeTeam: "Portugal", awayTeam: "Serbie", homeFlag: "🇵🇹", awayFlag: "🇷🇸", group: "I", date: "15 juin", odds: makeOdds(1.55, 3.80, 5.50) },
  { matchId: "m18", homeTeam: "Iran", awayTeam: "Barrage interconf. 1", homeFlag: "🇮🇷", awayFlag: "️", group: "I", date: "16 juin", odds: makeOdds(1.80, 3.40, 4.40) },
  { matchId: "m-i3", homeTeam: "Portugal", awayTeam: "Iran", homeFlag: "🇵🇹", awayFlag: "🇮🇷", group: "I", date: "20 juin", odds: makeOdds(1.25, 5.20, 10.00) },
  { matchId: "m-i4", homeTeam: "Serbie", awayTeam: "Barrage interconf. 1", homeFlag: "🇷🇸", awayFlag: "️", group: "I", date: "20 juin", odds: makeOdds(1.60, 3.70, 5.20) },
  { matchId: "m-i5", homeTeam: "Serbie", awayTeam: "Portugal", homeFlag: "🇷🇸", awayFlag: "🇵🇹", group: "I", date: "24 juin", odds: makeOdds(4.50, 3.60, 1.70) },
  { matchId: "m-i6", homeTeam: "Barrage interconf. 1", awayTeam: "Iran", homeFlag: "️", awayFlag: "🇮🇷", group: "I", date: "24 juin", odds: makeOdds(3.50, 3.30, 2.10) },

  // GROUP J
  { matchId: "m19", homeTeam: "Angleterre", awayTeam: "Danemark", homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag: "🇩🇰", group: "J", date: "16 juin", odds: makeOdds(1.65, 3.60, 5.00) },
  { matchId: "m20", homeTeam: "Nigéria", awayTeam: "Barrage UEFA B", homeFlag: "🇳🇬", awayFlag: "️", group: "J", date: "16 juin", odds: makeOdds(1.70, 3.50, 4.80) },
  { matchId: "m-j3", homeTeam: "Angleterre", awayTeam: "Nigéria", homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag: "🇳🇬", group: "J", date: "20 juin", odds: makeOdds(1.45, 4.00, 7.00) },
  { matchId: "m-j4", homeTeam: "Danemark", awayTeam: "Barrage UEFA B", homeFlag: "🇩🇰", awayFlag: "️", group: "J", date: "20 juin", odds: makeOdds(1.45, 4.00, 7.00) },
  { matchId: "m-j5", homeTeam: "Danemark", awayTeam: "Angleterre", homeFlag: "🇩🇰", awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "J", date: "24 juin", odds: makeOdds(4.20, 3.50, 1.75) },
  { matchId: "m-j6", homeTeam: "Barrage UEFA B", awayTeam: "Nigéria", homeFlag: "️", awayFlag: "🇳🇬", group: "J", date: "24 juin", odds: makeOdds(3.80, 3.30, 2.00) },

  // GROUP K
  { matchId: "m21", homeTeam: "Pays-Bas", awayTeam: "Belgique", homeFlag: "🇳🇱", awayFlag: "🇧🇪", group: "K", date: "16 juin", odds: makeOdds(2.10, 3.30, 3.40) },
  { matchId: "m22", homeTeam: "Ghana", awayTeam: "Barrage interconf. 2", homeFlag: "🇬🇭", awayFlag: "️", group: "K", date: "17 juin", odds: makeOdds(1.90, 3.30, 4.00) },
  { matchId: "m-k3", homeTeam: "Pays-Bas", awayTeam: "Ghana", homeFlag: "🇳🇱", awayFlag: "🇬🇭", group: "K", date: "21 juin", odds: makeOdds(1.35, 4.50, 8.50) },
  { matchId: "m-k4", homeTeam: "Belgique", awayTeam: "Barrage interconf. 2", homeFlag: "🇧🇪", awayFlag: "️", group: "K", date: "21 juin", odds: makeOdds(1.30, 4.80, 9.00) },
  { matchId: "m-k5", homeTeam: "Belgique", awayTeam: "Pays-Bas", homeFlag: "🇧🇪", awayFlag: "🇳🇱", group: "K", date: "25 juin", odds: makeOdds(2.90, 3.20, 2.40) },
  { matchId: "m-k6", homeTeam: "Barrage interconf. 2", awayTeam: "Ghana", homeFlag: "️", awayFlag: "🇬🇭", group: "K", date: "25 juin", odds: makeOdds(3.40, 3.20, 2.15) },

  // GROUP L
  { matchId: "m23", homeTeam: "Italie", awayTeam: "Croatie", homeFlag: "🇮🇹", awayFlag: "🇭🇷", group: "L", date: "17 juin", odds: makeOdds(2.10, 3.30, 3.40) },
  { matchId: "m24", homeTeam: "Uruguay", awayTeam: "Panama", homeFlag: "🇺🇾", awayFlag: "🇵🇦", group: "L", date: "17 juin", odds: makeOdds(1.30, 4.80, 9.00) },
  { matchId: "m-l3", homeTeam: "Italie", awayTeam: "Uruguay", homeFlag: "🇮🇹", awayFlag: "🇺🇾", group: "L", date: "21 juin", odds: makeOdds(2.20, 3.20, 3.30) },
  { matchId: "m-l4", homeTeam: "Croatie", awayTeam: "Panama", homeFlag: "🇭🇷", awayFlag: "🇵🇦", group: "L", date: "21 juin", odds: makeOdds(1.35, 4.50, 8.50) },
  { matchId: "m-l5", homeTeam: "Croatie", awayTeam: "Italie", homeFlag: "🇭🇷", awayFlag: "🇮🇹", group: "L", date: "25 juin", odds: makeOdds(2.90, 3.20, 2.40) },
  { matchId: "m-l6", homeTeam: "Panama", awayTeam: "Uruguay", homeFlag: "🇵🇦", awayFlag: "🇺🇾", group: "L", date: "25 juin", odds: makeOdds(7.50, 4.20, 1.40) },
];

export const allGroups = ["A","B","C","D","E","F","G","H","I","J","K","L"] as const;
