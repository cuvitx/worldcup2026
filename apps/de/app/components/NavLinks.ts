import type { LucideIcon } from "lucide-react";
import {
  Users, UserCheck, Target, Swords, Trophy,
  BarChart3, TrendingUp, ArrowLeftRight, ArrowUpDown, ShieldAlert, Square,
  Gamepad2, Scale, Grid3X3, Medal, GitCompare,
  CircleDollarSign, BookOpen, Wallet, Book, Undo2,
  Star, CornerDownRight, Zap, Clock, Layers,
} from "lucide-react";

// Menu types
export interface MenuLink {
  href: string;
  label: string;
  sub?: string;
  icon?: LucideIcon;
  flagEmoji?: string;
}

interface MenuSection {
  title: string;
  links: MenuLink[];
}

export interface MegaMenuDef {
  label: string;
  icon: LucideIcon;
  sections: MenuSection[];
}

export const megaMenus: Record<string, MegaMenuDef> = {
  mannschaften: {
    label: "Mannschaften & Gruppen",
    icon: Users,
    sections: [
      {
        title: "Favoriten",
        links: [
          { href: "/mannschaft/deutschland", label: "Deutschland", sub: "#12 FIFA", flagEmoji: "\u{1F1E9}\u{1F1EA}" },
          { href: "/mannschaft/argentinien", label: "Argentinien", sub: "#1 FIFA", flagEmoji: "\u{1F1E6}\u{1F1F7}" },
          { href: "/mannschaft/frankreich", label: "Frankreich", sub: "#2 FIFA", flagEmoji: "\u{1F1EB}\u{1F1F7}" },
          { href: "/mannschaft/spanien", label: "Spanien", sub: "#3 FIFA", flagEmoji: "\u{1F1EA}\u{1F1F8}" },
          { href: "/mannschaft/brasilien", label: "Brasilien", sub: "#5 FIFA", flagEmoji: "\u{1F1E7}\u{1F1F7}" },
        ],
      },
      {
        title: "Gruppen",
        links: [
          { href: "/gruppe/a", label: "Gruppe A" },
          { href: "/gruppe/b", label: "Gruppe B" },
          { href: "/gruppe/c", label: "Gruppe C" },
          { href: "/gruppe/d", label: "Gruppe D" },
          { href: "/gruppe/e", label: "Gruppe E" },
          { href: "/gruppe/f", label: "Gruppe F" },
          { href: "/gruppe/g", label: "Gruppe G" },
          { href: "/gruppe/h", label: "Gruppe H" },
          { href: "/gruppe/i", label: "Gruppe I" },
          { href: "/gruppe/j", label: "Gruppe J" },
          { href: "/gruppe/k", label: "Gruppe K" },
          { href: "/gruppe/l", label: "Gruppe L" },
          { href: "/gruppen", label: "Alle Gruppen \u2192" },
        ],
      },
      {
        title: "Entdecken",
        links: [
          { href: "/mannschaften", label: "Alle Mannschaften", icon: Users },
          { href: "/spieler", label: "Top-Spieler", icon: UserCheck },
          { href: "/torschuetzen", label: "Torjäger", icon: Target },
          { href: "/h2h", label: "Direktvergleich H2H", icon: Swords },
          { href: "/statistiken", label: "Statistiken", icon: Trophy },
        ],
      },
    ],
  },
  prognosen: {
    label: "Spiele & Prognosen",
    icon: BarChart3,
    sections: [
      {
        title: "Prognosen",
        links: [
          { href: "/prognose/weltmeister", label: "WM-Sieger Prognose", icon: TrendingUp },
          { href: "/prognose/btts", label: "BTTS", icon: ArrowLeftRight },
          { href: "/prognose/over-under", label: "Over/Under", icon: ArrowUpDown },
          { href: "/prognose/torschuetzen", label: "Torschützen", icon: ShieldAlert },
          { href: "/prognose/exakte-ergebnisse", label: "Exakte Ergebnisse", icon: Target },
          { href: "/prognose/karten", label: "Karten & Clean Sheet", icon: Square },
        ],
      },
      {
        title: "Tools",
        links: [
          { href: "/turnierbaum", label: "Turnierbaum Simulator", icon: Gamepad2 },
          { href: "/quotenvergleich", label: "Quotenvergleich", icon: Scale },
          { href: "/prognosen/tippspiel", label: "Tippspiel", icon: Grid3X3 },
          { href: "/prognosen/rangliste", label: "Rangliste", icon: Medal },
          { href: "/spielervergleich", label: "Spielervergleich", icon: Users },
          { href: "/mannschaftsvergleich", label: "Mannschaftsvergleich", icon: GitCompare },
        ],
      },
      {
        title: "Turnier",
        links: [
          { href: "/ergebnisse", label: "Ergebnisse", icon: Trophy },
          { href: "/spiel/spielplan", label: "Kompletter Spielplan", icon: BarChart3 },
          { href: "/prognose/finalisten", label: "Finalisten", icon: Medal },
          { href: "/prognose/elfmeterschiessen", label: "Elfmeterschießen", icon: Target },
          { href: "/sportwetten/geheimfavoriten", label: "Geheimfavoriten", icon: Star },
          { href: "/sportwetten/bester-spieler", label: "Bester Spieler WM", icon: Trophy },
        ],
      },
    ],
  },
  sportwetten: {
    label: "Sportwetten",
    icon: CircleDollarSign,
    sections: [
      {
        title: "Ratgeber",
        links: [
          { href: "/sportwetten", label: "WM Wett-Guide", icon: BookOpen },
          { href: "/sportwetten/strategie", label: "Gruppenphasen-Strategie", icon: Target },
          { href: "/sportwetten/bankroll", label: "Bankroll Management", icon: Wallet },
          { href: "/sportwetten/value-bets", label: "Value Bets", icon: TrendingUp },
          { href: "/sportwetten/lexikon", label: "Wett-Lexikon", icon: Book },
          { href: "/sportwetten/cashout", label: "Cashout Guide", icon: Undo2 },
        ],
      },
      {
        title: "Wettanbieter",
        links: [
          { href: "/wettanbieter/betano", label: "Betano", icon: Star },
          { href: "/wettanbieter/bet-at-home", label: "Bet-at-Home", icon: Star },
          { href: "/quotenvergleich", label: "Quotenvergleich", icon: Scale },
        ],
      },
      {
        title: "Wettarten",
        links: [
          { href: "/sportwetten/ecken", label: "Ecken", icon: CornerDownRight },
          { href: "/sportwetten/handicap", label: "Handicap", icon: ArrowLeftRight },
          { href: "/sportwetten/live", label: "Live-Wetten", icon: Zap },
          { href: "/sportwetten/halbzeit", label: "Halbzeit", icon: Clock },
          { href: "/sportwetten/kombiwetten", label: "Kombiwetten", icon: Layers },
          { href: "/sportwetten/ratgeber", label: "Kompletter Guide", icon: BookOpen },
        ],
      },
    ],
  },
};

export type MenuKey = keyof typeof megaMenus;
