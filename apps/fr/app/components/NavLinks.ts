import type { LucideIcon } from "lucide-react";
import {
  Users, UserCheck, Target, Swords, Trophy,
  BarChart3, TrendingUp, ArrowLeftRight, ArrowUpDown, ShieldAlert, Square,
  Gamepad2, Scale, Grid3X3, Medal, GitCompare,
  CircleDollarSign, BookOpen, Wallet, Book, Undo2,
  Star, CornerDownRight, Zap, Clock, Layers,
  Plane, FileCheck, PlaneTakeoff, ShieldCheck, Smartphone,
  Building, MapPin, Building2, Hotel, Bus, CloudSun,
  Ticket, PartyPopper, Tv, Shield, Wifi, Wine,
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
  equipes: {
    label: "Équipes & Groupes",
    icon: Users,
    sections: [
      {
        title: "Favoris",
        links: [
          { href: "/equipe/france", label: "France", sub: "#2 FIFA", flagEmoji: "🇫🇷" },
          { href: "/equipe/argentine", label: "Argentine", sub: "#1 FIFA", flagEmoji: "🇦🇷" },
          { href: "/equipe/espagne", label: "Espagne", sub: "#3 FIFA", flagEmoji: "🇪🇸" },
          { href: "/equipe/angleterre", label: "Angleterre", sub: "#4 FIFA", flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
          { href: "/equipe/bresil", label: "Brésil", sub: "#5 FIFA", flagEmoji: "🇧🇷" },
        ],
      },
      {
        title: "Groupes",
        links: [
          { href: "/groupe/a", label: "Groupe A" },
          { href: "/groupe/b", label: "Groupe B" },
          { href: "/groupe/c", label: "Groupe C" },
          { href: "/groupe/d", label: "Groupe D" },
          { href: "/groupe/e", label: "Groupe E" },
          { href: "/groupe/f", label: "Groupe F" },
          { href: "/groupe/g", label: "Groupe G" },
          { href: "/groupe/h", label: "Groupe H" },
          { href: "/groupe/i", label: "Groupe I" },
          { href: "/groupe/j", label: "Groupe J" },
          { href: "/groupe/k", label: "Groupe K" },
          { href: "/groupe/l", label: "Groupe L" },
          { href: "/groupes", label: "Tous les groupes →" },
        ],
      },
      {
        title: "Explorer",
        links: [
          { href: "/equipes", label: "Toutes les équipes", icon: Users },
          { href: "/joueurs", label: "Joueurs clés", icon: UserCheck },
          { href: "/buteurs", label: "Meilleurs buteurs", icon: Target },
          { href: "/h2h", label: "Confrontations H2H", icon: Swords },
          { href: "/statistiques", label: "Statistiques", icon: Trophy },
        ],
      },
    ],
  },
  pronostics: {
    label: "Matchs & Pronostics",
    icon: BarChart3,
    sections: [
      {
        title: "Pronostics",
        links: [
          { href: "/pronostic-vainqueur", label: "Pronostic vainqueur", icon: TrendingUp },
          { href: "/pronostic-btts", label: "BTTS", icon: ArrowLeftRight },
          { href: "/pronostic-over-under", label: "Over/Under", icon: ArrowUpDown },
          { href: "/pronostic-buteurs", label: "Buteurs", icon: ShieldAlert },
          { href: "/pronostic-scores-exacts", label: "Scores exacts", icon: Target },
          { href: "/pronostic-cartons", label: "Cartons & Clean sheet", icon: Square },
        ],
      },
      {
        title: "Outils",
        links: [
          { href: "/simulateur", label: "Simulateur bracket", icon: Gamepad2 },
          { href: "/comparateur-cotes", label: "Comparateur cotes", icon: Scale },
          { href: "/pronostics/grille", label: "Grille de pronostics", icon: Grid3X3 },
          { href: "/pronostics/leaderboard", label: "Leaderboard", icon: Medal },
          { href: "/comparateur-joueurs", label: "Comparateur joueurs", icon: Users },
          { href: "/comparateur-equipes", label: "Comparateur équipes", icon: GitCompare },
        ],
      },
      {
        title: "Tournoi",
        links: [
          { href: "/tableau", label: "Tableau & résultats", icon: Trophy },
          { href: "/match/calendrier", label: "Calendrier complet", icon: BarChart3 },
          { href: "/pronostic-finalistes", label: "Finalistes", icon: Medal },
          { href: "/pronostic-tirs-au-but", label: "Tirs au but", icon: Target },
          { href: "/dark-horses", label: "Dark horses", icon: Star },
          { href: "/ballon-or-cdm", label: "Ballon d'or CDM", icon: Trophy },
        ],
      },
    ],
  },
  paris: {
    label: "Paris sportifs",
    icon: CircleDollarSign,
    sections: [
      {
        title: "Guides",
        links: [
          { href: "/paris-sportifs", label: "Guide paris CDM", icon: BookOpen },
          { href: "/strategie-paris-groupes", label: "Stratégie groupes", icon: Target },
          { href: "/bankroll-cdm", label: "Bankroll", icon: Wallet },
          { href: "/value-bets", label: "Value bets", icon: TrendingUp },
          { href: "/lexique-paris", label: "Lexique paris", icon: Book },
          { href: "/cashout-guide", label: "Cashout guide", icon: Undo2 },
        ],
      },
      {
        title: "Bookmakers",
        links: [
          { href: "/bookmaker/betclic", label: "Betclic + bonus", icon: Star },
          { href: "/bookmaker/winamax", label: "Winamax + bonus", icon: Star },
          { href: "/bookmaker/unibet", label: "Unibet + bonus", icon: Star },
          { href: "/bookmaker/parions-sport", label: "ParionsSport + bonus", icon: Star },
          { href: "/comparateur-cotes", label: "Comparateur cotes", icon: Scale },
        ],
      },
      {
        title: "Types de paris",
        links: [
          { href: "/paris-corners", label: "Corners", icon: CornerDownRight },
          { href: "/paris-handicap", label: "Handicap", icon: ArrowLeftRight },
          { href: "/paris-live", label: "Live", icon: Zap },
          { href: "/paris-mi-temps", label: "Mi-temps", icon: Clock },
          { href: "/paris-combines", label: "Combinés", icon: Layers },
          { href: "/guide-paris", label: "Guide complet", icon: BookOpen },
        ],
      },
    ],
  },
  voyage: {
    label: "Guide voyage",
    icon: Plane,
    sections: [
      {
        title: "Préparer",
        links: [
          { href: "/esta-usa", label: "ESTA / Visa USA", icon: FileCheck },
          { href: "/visa-mexique", label: "Visa Mexique", icon: FileCheck },
          { href: "/formalites-canada", label: "Formalités Canada", icon: FileCheck },
          { href: "/calculateur-budget", label: "Vols & budget", icon: PlaneTakeoff },
          { href: "/assurance-voyage", label: "Assurance voyage", icon: ShieldCheck },
          { href: "/carte-sim-usa", label: "Carte SIM & Valise", icon: Smartphone },
        ],
      },
      {
        title: "Stades & Villes",
        links: [
          { href: "/stades", label: "Tous les stades", icon: Building },
          { href: "/carte-stades", label: "Carte des stades", icon: MapPin },
          { href: "/villes", label: "Toutes les villes", icon: Building2 },
          { href: "/hebergement", label: "Hébergement", icon: Hotel },
          { href: "/securite", label: "Transport", icon: Bus },
          { href: "/ou-regarder", label: "Météo", icon: CloudSun },
        ],
      },
      {
        title: "Sur place",
        links: [
          { href: "/billets", label: "Billets", icon: Ticket },
          { href: "/fan-zones", label: "Fan zones", icon: PartyPopper },
          { href: "/ou-regarder", label: "Où regarder", icon: Tv },
          { href: "/securite", label: "Sécurité", icon: Shield },
          { href: "/wifi-stades", label: "WiFi stades", icon: Wifi },
          { href: "/alcool-stades", label: "Alcool stades", icon: Wine },
        ],
      },
    ],
  },
};

export type MenuKey = keyof typeof megaMenus;
