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
  { matchId: "m01", homeTeam: "Mexiko", awayTeam: "Sudafrika", homeFlag: "🇲🇽", awayFlag: "🇿🇦", group: "A", date: "11. Juni", odds: makeOdds(1.55, 3.80, 5.50) },
  { matchId: "m02", homeTeam: "Sudkorea", awayTeam: "Playoff UEFA D", homeFlag: "🇰🇷", awayFlag: "️", group: "A", date: "12. Juni", odds: makeOdds(1.90, 3.40, 4.00) },
  { matchId: "m-a3", homeTeam: "Mexiko", awayTeam: "Sudkorea", homeFlag: "🇲🇽", awayFlag: "🇰🇷", group: "A", date: "15. Juni", odds: makeOdds(1.80, 3.50, 4.20) },
  { matchId: "m-a4", homeTeam: "Sudafrika", awayTeam: "Playoff UEFA D", homeFlag: "🇿🇦", awayFlag: "️", group: "A", date: "15. Juni", odds: makeOdds(2.20, 3.20, 3.30) },
  { matchId: "m-a5", homeTeam: "Sudkorea", awayTeam: "Mexiko", homeFlag: "🇰🇷", awayFlag: "🇲🇽", group: "A", date: "19. Juni", odds: makeOdds(3.20, 3.40, 2.10) },
  { matchId: "m-a6", homeTeam: "Playoff UEFA D", awayTeam: "Sudafrika", homeFlag: "️", awayFlag: "🇿🇦", group: "A", date: "19. Juni", odds: makeOdds(2.50, 3.20, 2.80) },

  // GROUP B
  { matchId: "m03", homeTeam: "Canada", awayTeam: "Playoff UEFA A", homeFlag: "🇨🇦", awayFlag: "️", group: "B", date: "12. Juni", odds: makeOdds(1.75, 3.50, 4.50) },
  { matchId: "m04", homeTeam: "Schweiz", awayTeam: "Qatar", homeFlag: "🇨🇭", awayFlag: "🇶🇦", group: "B", date: "12. Juni", odds: makeOdds(1.50, 3.90, 6.00) },
  { matchId: "m-b3", homeTeam: "Canada", awayTeam: "Schweiz", homeFlag: "🇨🇦", awayFlag: "🇨🇭", group: "B", date: "16. Juni", odds: makeOdds(2.60, 3.20, 2.70) },
  { matchId: "m-b4", homeTeam: "Qatar", awayTeam: "Playoff UEFA A", homeFlag: "🇶🇦", awayFlag: "️", group: "B", date: "16. Juni", odds: makeOdds(2.40, 3.20, 2.90) },
  { matchId: "m-b5", homeTeam: "Schweiz", awayTeam: "Canada", homeFlag: "🇨🇭", awayFlag: "🇨🇦", group: "B", date: "20. Juni", odds: makeOdds(2.30, 3.30, 3.00) },
  { matchId: "m-b6", homeTeam: "Playoff UEFA A", awayTeam: "Qatar", homeFlag: "️", awayFlag: "🇶🇦", group: "B", date: "20. Juni", odds: makeOdds(2.20, 3.20, 3.30) },

  // GROUP C
  { matchId: "m05", homeTeam: "Brasilien", awayTeam: "Marokko", homeFlag: "🇧🇷", awayFlag: "🇲🇦", group: "C", date: "12. Juni", odds: makeOdds(1.75, 3.50, 4.50) },
  { matchId: "m06", homeTeam: "Schottland", awayTeam: "Haiti", homeFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", awayFlag: "🇭🇹", group: "C", date: "13. Juni", odds: makeOdds(1.35, 4.50, 8.50) },
  { matchId: "m-c3", homeTeam: "Brasilien", awayTeam: "Schottland", homeFlag: "🇧🇷", awayFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", date: "17. Juni", odds: makeOdds(1.30, 5.00, 9.50) },
  { matchId: "m-c4", homeTeam: "Marokko", awayTeam: "Haiti", homeFlag: "🇲🇦", awayFlag: "🇭🇹", group: "C", date: "17. Juni", odds: makeOdds(1.25, 5.20, 10.00) },
  { matchId: "m-c5", homeTeam: "Marokko", awayTeam: "Brasilien", homeFlag: "🇲🇦", awayFlag: "🇧🇷", group: "C", date: "21. Juni", odds: makeOdds(4.00, 3.40, 1.85) },
  { matchId: "m-c6", homeTeam: "Haiti", awayTeam: "Schottland", homeFlag: "🇭🇹", awayFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", date: "21. Juni", odds: makeOdds(6.50, 4.00, 1.50) },

  // GROUP D
  { matchId: "m07", homeTeam: "USA", awayTeam: "Paraguay", homeFlag: "🇺🇸", awayFlag: "🇵🇾", group: "D", date: "13. Juni", odds: makeOdds(1.55, 3.80, 5.50) },
  { matchId: "m08", homeTeam: "Australien", awayTeam: "Playoff UEFA C", homeFlag: "🇦🇺", awayFlag: "️", group: "D", date: "13. Juni", odds: makeOdds(2.10, 3.30, 3.40) },
  { matchId: "m-d3", homeTeam: "USA", awayTeam: "Australien", homeFlag: "🇺🇸", awayFlag: "🇦🇺", group: "D", date: "17. Juni", odds: makeOdds(1.50, 3.90, 6.00) },
  { matchId: "m-d4", homeTeam: "Paraguay", awayTeam: "Playoff UEFA C", homeFlag: "🇵🇾", awayFlag: "️", group: "D", date: "17. Juni", odds: makeOdds(1.95, 3.30, 3.90) },
  { matchId: "m-d5", homeTeam: "Australien", awayTeam: "USA", homeFlag: "🇦🇺", awayFlag: "🇺🇸", group: "D", date: "21. Juni", odds: makeOdds(4.80, 3.60, 1.70) },
  { matchId: "m-d6", homeTeam: "Playoff UEFA C", awayTeam: "Paraguay", homeFlag: "️", awayFlag: "🇵🇾", group: "D", date: "21. Juni", odds: makeOdds(3.20, 3.20, 2.25) },

  // GROUP E
  { matchId: "m09", homeTeam: "Deutschland", awayTeam: "Ecuador", homeFlag: "🇩🇪", awayFlag: "🇪🇨", group: "E", date: "13. Juni", odds: makeOdds(1.40, 4.20, 7.50) },
  { matchId: "m10", homeTeam: "Elfenbeinkuste", awayTeam: "Curaçao", homeFlag: "🇨🇮", awayFlag: "🇨🇼", group: "E", date: "14. Juni", odds: makeOdds(1.30, 4.80, 9.00) },
  { matchId: "m-e3", homeTeam: "Deutschland", awayTeam: "Elfenbeinkuste", homeFlag: "🇩🇪", awayFlag: "🇨🇮", group: "E", date: "18. Juni", odds: makeOdds(1.45, 4.00, 7.00) },
  { matchId: "m-e4", homeTeam: "Ecuador", awayTeam: "Curaçao", homeFlag: "🇪🇨", awayFlag: "🇨🇼", group: "E", date: "18. Juni", odds: makeOdds(1.30, 4.80, 9.00) },
  { matchId: "m-e5", homeTeam: "Ecuador", awayTeam: "Deutschland", homeFlag: "🇪🇨", awayFlag: "🇩🇪", group: "E", date: "22. Juni", odds: makeOdds(5.50, 3.80, 1.55) },
  { matchId: "m-e6", homeTeam: "Curaçao", awayTeam: "Elfenbeinkuste", homeFlag: "🇨🇼", awayFlag: "🇨🇮", group: "E", date: "22. Juni", odds: makeOdds(7.00, 4.20, 1.45) },

  // GROUP F
  { matchId: "m11", homeTeam: "Frankreich", awayTeam: "Kolumbien", homeFlag: "🇫🇷", awayFlag: "🇨🇴", group: "F", date: "14. Juni", odds: makeOdds(1.65, 3.60, 5.00) },
  { matchId: "m12", homeTeam: "Saudi-Arabien", awayTeam: "Peru", homeFlag: "🇸🇦", awayFlag: "🇵🇪", group: "F", date: "14. Juni", odds: makeOdds(2.50, 3.10, 2.90) },
  { matchId: "m-f3", homeTeam: "Frankreich", awayTeam: "Saudi-Arabien", homeFlag: "🇫🇷", awayFlag: "🇸🇦", group: "F", date: "18. Juni", odds: makeOdds(1.20, 5.80, 12.00) },
  { matchId: "m-f4", homeTeam: "Kolumbien", awayTeam: "Peru", homeFlag: "🇨🇴", awayFlag: "🇵🇪", group: "F", date: "18. Juni", odds: makeOdds(1.80, 3.40, 4.40) },
  { matchId: "m-f5", homeTeam: "Kolumbien", awayTeam: "Frankreich", homeFlag: "🇨🇴", awayFlag: "🇫🇷", group: "F", date: "22. Juni", odds: makeOdds(4.00, 3.40, 1.85) },
  { matchId: "m-f6", homeTeam: "Peru", awayTeam: "Saudi-Arabien", homeFlag: "🇵🇪", awayFlag: "🇸🇦", group: "F", date: "22. Juni", odds: makeOdds(2.30, 3.20, 3.10) },

  // GROUP G
  { matchId: "m13", homeTeam: "Spanien", awayTeam: "Turkei", homeFlag: "🇪🇸", awayFlag: "🇹🇷", group: "G", date: "14. Juni", odds: makeOdds(1.55, 3.80, 5.50) },
  { matchId: "m14", homeTeam: "Neuseeland", awayTeam: "China", homeFlag: "🇳🇿", awayFlag: "🇨🇳", group: "G", date: "15. Juni", odds: makeOdds(2.30, 3.20, 3.10) },
  { matchId: "m-g3", homeTeam: "Spanien", awayTeam: "Neuseeland", homeFlag: "🇪🇸", awayFlag: "🇳🇿", group: "G", date: "19. Juni", odds: makeOdds(1.12, 7.50, 18.00) },
  { matchId: "m-g4", homeTeam: "Turkei", awayTeam: "China", homeFlag: "🇹🇷", awayFlag: "🇨🇳", group: "G", date: "19. Juni", odds: makeOdds(1.35, 4.50, 8.50) },
  { matchId: "m-g5", homeTeam: "Turkei", awayTeam: "Spanien", homeFlag: "🇹🇷", awayFlag: "🇪🇸", group: "G", date: "23. Juni", odds: makeOdds(4.50, 3.60, 1.70) },
  { matchId: "m-g6", homeTeam: "China", awayTeam: "Neuseeland", homeFlag: "🇨🇳", awayFlag: "🇳🇿", group: "G", date: "23. Juni", odds: makeOdds(2.50, 3.20, 2.80) },

  // GROUP H
  { matchId: "m15", homeTeam: "Argentinien", awayTeam: "Kamerun", homeFlag: "🇦🇷", awayFlag: "🇨🇲", group: "H", date: "15. Juni", odds: makeOdds(1.25, 5.20, 10.00) },
  { matchId: "m16", homeTeam: "Japan", awayTeam: "Senegal", homeFlag: "🇯🇵", awayFlag: "🇸🇳", group: "H", date: "15. Juni", odds: makeOdds(2.20, 3.30, 3.20) },
  { matchId: "m-h3", homeTeam: "Argentinien", awayTeam: "Japan", homeFlag: "🇦🇷", awayFlag: "🇯🇵", group: "H", date: "19. Juni", odds: makeOdds(1.40, 4.20, 7.50) },
  { matchId: "m-h4", homeTeam: "Kamerun", awayTeam: "Senegal", homeFlag: "🇨🇲", awayFlag: "🇸🇳", group: "H", date: "19. Juni", odds: makeOdds(2.80, 3.10, 2.60) },
  { matchId: "m-h5", homeTeam: "Japan", awayTeam: "Argentinien", homeFlag: "🇯🇵", awayFlag: "🇦🇷", group: "H", date: "23. Juni", odds: makeOdds(5.50, 3.80, 1.55) },
  { matchId: "m-h6", homeTeam: "Senegal", awayTeam: "Kamerun", homeFlag: "🇸🇳", awayFlag: "🇨🇲", group: "H", date: "23. Juni", odds: makeOdds(2.10, 3.30, 3.40) },

  // GROUP I
  { matchId: "m17", homeTeam: "Portugal", awayTeam: "Serbien", homeFlag: "🇵🇹", awayFlag: "🇷🇸", group: "I", date: "15. Juni", odds: makeOdds(1.55, 3.80, 5.50) },
  { matchId: "m18", homeTeam: "Iran", awayTeam: "Interkont. Playoff 1", homeFlag: "🇮🇷", awayFlag: "️", group: "I", date: "16. Juni", odds: makeOdds(1.80, 3.40, 4.40) },
  { matchId: "m-i3", homeTeam: "Portugal", awayTeam: "Iran", homeFlag: "🇵🇹", awayFlag: "🇮🇷", group: "I", date: "20. Juni", odds: makeOdds(1.25, 5.20, 10.00) },
  { matchId: "m-i4", homeTeam: "Serbien", awayTeam: "Interkont. Playoff 1", homeFlag: "🇷🇸", awayFlag: "️", group: "I", date: "20. Juni", odds: makeOdds(1.60, 3.70, 5.20) },
  { matchId: "m-i5", homeTeam: "Serbien", awayTeam: "Portugal", homeFlag: "🇷🇸", awayFlag: "🇵🇹", group: "I", date: "24. Juni", odds: makeOdds(4.50, 3.60, 1.70) },
  { matchId: "m-i6", homeTeam: "Interkont. Playoff 1", awayTeam: "Iran", homeFlag: "️", awayFlag: "🇮🇷", group: "I", date: "24. Juni", odds: makeOdds(3.50, 3.30, 2.10) },

  // GROUP J
  { matchId: "m19", homeTeam: "England", awayTeam: "Danemark", homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag: "🇩🇰", group: "J", date: "16. Juni", odds: makeOdds(1.65, 3.60, 5.00) },
  { matchId: "m20", homeTeam: "Nigeria", awayTeam: "Playoff UEFA B", homeFlag: "🇳🇬", awayFlag: "️", group: "J", date: "16. Juni", odds: makeOdds(1.70, 3.50, 4.80) },
  { matchId: "m-j3", homeTeam: "England", awayTeam: "Nigeria", homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag: "🇳🇬", group: "J", date: "20. Juni", odds: makeOdds(1.45, 4.00, 7.00) },
  { matchId: "m-j4", homeTeam: "Danemark", awayTeam: "Playoff UEFA B", homeFlag: "🇩🇰", awayFlag: "️", group: "J", date: "20. Juni", odds: makeOdds(1.45, 4.00, 7.00) },
  { matchId: "m-j5", homeTeam: "Danemark", awayTeam: "England", homeFlag: "🇩🇰", awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "J", date: "24. Juni", odds: makeOdds(4.20, 3.50, 1.75) },
  { matchId: "m-j6", homeTeam: "Playoff UEFA B", awayTeam: "Nigeria", homeFlag: "️", awayFlag: "🇳🇬", group: "J", date: "24. Juni", odds: makeOdds(3.80, 3.30, 2.00) },

  // GROUP K
  { matchId: "m21", homeTeam: "Niederlande", awayTeam: "Belgien", homeFlag: "🇳🇱", awayFlag: "🇧🇪", group: "K", date: "16. Juni", odds: makeOdds(2.10, 3.30, 3.40) },
  { matchId: "m22", homeTeam: "Ghana", awayTeam: "Interkont. Playoff 2", homeFlag: "🇬🇭", awayFlag: "️", group: "K", date: "17. Juni", odds: makeOdds(1.90, 3.30, 4.00) },
  { matchId: "m-k3", homeTeam: "Niederlande", awayTeam: "Ghana", homeFlag: "🇳🇱", awayFlag: "🇬🇭", group: "K", date: "21. Juni", odds: makeOdds(1.35, 4.50, 8.50) },
  { matchId: "m-k4", homeTeam: "Belgien", awayTeam: "Interkont. Playoff 2", homeFlag: "🇧🇪", awayFlag: "️", group: "K", date: "21. Juni", odds: makeOdds(1.30, 4.80, 9.00) },
  { matchId: "m-k5", homeTeam: "Belgien", awayTeam: "Niederlande", homeFlag: "🇧🇪", awayFlag: "🇳🇱", group: "K", date: "25. Juni", odds: makeOdds(2.90, 3.20, 2.40) },
  { matchId: "m-k6", homeTeam: "Interkont. Playoff 2", awayTeam: "Ghana", homeFlag: "️", awayFlag: "🇬🇭", group: "K", date: "25. Juni", odds: makeOdds(3.40, 3.20, 2.15) },

  // GROUP L
  { matchId: "m23", homeTeam: "Italien", awayTeam: "Kroatien", homeFlag: "🇮🇹", awayFlag: "🇭🇷", group: "L", date: "17. Juni", odds: makeOdds(2.10, 3.30, 3.40) },
  { matchId: "m24", homeTeam: "Uruguay", awayTeam: "Panama", homeFlag: "🇺🇾", awayFlag: "🇵🇦", group: "L", date: "17. Juni", odds: makeOdds(1.30, 4.80, 9.00) },
  { matchId: "m-l3", homeTeam: "Italien", awayTeam: "Uruguay", homeFlag: "🇮🇹", awayFlag: "🇺🇾", group: "L", date: "21. Juni", odds: makeOdds(2.20, 3.20, 3.30) },
  { matchId: "m-l4", homeTeam: "Kroatien", awayTeam: "Panama", homeFlag: "🇭🇷", awayFlag: "🇵🇦", group: "L", date: "21. Juni", odds: makeOdds(1.35, 4.50, 8.50) },
  { matchId: "m-l5", homeTeam: "Kroatien", awayTeam: "Italien", homeFlag: "🇭🇷", awayFlag: "🇮🇹", group: "L", date: "25. Juni", odds: makeOdds(2.90, 3.20, 2.40) },
  { matchId: "m-l6", homeTeam: "Panama", awayTeam: "Uruguay", homeFlag: "🇵🇦", awayFlag: "🇺🇾", group: "L", date: "25. Juni", odds: makeOdds(7.50, 4.20, 1.40) },
];

export const allGroups = ["A","B","C","D","E","F","G","H","I","J","K","L"] as const;
