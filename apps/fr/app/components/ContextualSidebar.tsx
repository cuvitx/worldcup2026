"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Target,
  Users,
  Swords,
  MapPin,
  CircleDollarSign,
  BarChart3,
  Calendar,
  Shield,
  Plane,
} from "lucide-react";

type SidebarLink = { href: string; label: string; icon: React.ReactNode };

function getSidebarLinks(pathname: string): SidebarLink[] {
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[1] || "";

  // Joueur detail
  if (pathname.startsWith("/joueur/") && slug) {
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return [
      { href: `/pronostic-buteurs`, label: `Cote buteur ${name}`, icon: <Target className="h-4 w-4 text-[#D4AF37]" /> },
      { href: `/joueurs`, label: "Tous les joueurs", icon: <Users className="h-4 w-4 text-[#00B865]" /> },
      { href: `/comparateur-joueurs`, label: "Comparer les joueurs", icon: <BarChart3 className="h-4 w-4 text-[#022149]" /> },
      { href: `/match/calendrier`, label: "Prochain match", icon: <Calendar className="h-4 w-4 text-[#00B865]" /> },
    ];
  }

  // Match detail
  if (pathname.startsWith("/match/") && slug && slug !== "calendrier") {
    return [
      { href: `/compos-officielles/${slug}`, label: "Compo officielle", icon: <Users className="h-4 w-4 text-[#00B865]" /> },
      { href: `/arbitre/${slug}`, label: "Arbitre du match", icon: <Shield className="h-4 w-4 text-[#D4AF37]" /> },
      { href: `/corners/${slug}`, label: "Consulter les cotes corners", icon: <Target className="h-4 w-4 text-[#022149]" /> },
      { href: `/pronostic-match/${slug}`, label: "Voir l'analyse du match", icon: <BarChart3 className="h-4 w-4 text-[#00B865]" /> },
      { href: `/score-exact/${slug}`, label: "Pronostic score exact", icon: <Swords className="h-4 w-4 text-[#D4AF37]" /> },
    ];
  }

  // Equipe detail
  if (pathname.startsWith("/equipe/") && slug) {
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return [
      { href: `/effectif/${slug}`, label: `Effectif ${name}`, icon: <Users className="h-4 w-4 text-[#00B865]" /> },
      { href: `/pronostic/${slug}`, label: `Accéder au pronostic`, icon: <BarChart3 className="h-4 w-4 text-[#D4AF37]" /> },
      { href: `/parier/${slug}`, label: `Consulter les cotes`, icon: <CircleDollarSign className="h-4 w-4 text-[#022149]" /> },
      { href: `/match/calendrier`, label: "Calendrier des matchs", icon: <Calendar className="h-4 w-4 text-[#00B865]" /> },
    ];
  }

  // Ville detail
  if (pathname.startsWith("/ville/") && slug) {
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return [
      { href: `/stade/${slug}`, label: `Stade de ${name}`, icon: <MapPin className="h-4 w-4 text-[#00B865]" /> },
      { href: `/securite/${slug}`, label: `Sécurité ${name}`, icon: <Shield className="h-4 w-4 text-[#D4AF37]" /> },
      { href: `/hebergement/${slug}`, label: `Hébergement ${name}`, icon: <Plane className="h-4 w-4 text-[#022149]" /> },
      { href: `/fan-zone/${slug}`, label: `Fan zones ${name}`, icon: <Users className="h-4 w-4 text-[#00B865]" /> },
    ];
  }

  // Stade detail
  if (pathname.startsWith("/stade/") && slug) {
    return [
      { href: `/carte-stades`, label: "Explorer la carte des stades", icon: <MapPin className="h-4 w-4 text-[#00B865]" /> },
      { href: `/villes`, label: "Guide des villes hôtes", icon: <Plane className="h-4 w-4 text-[#D4AF37]" /> },
      { href: `/billets`, label: "Acheter des billets", icon: <CircleDollarSign className="h-4 w-4 text-[#022149]" /> },
    ];
  }

  // Bookmaker detail
  if (pathname.startsWith("/bookmaker/") && slug) {
    return [
      { href: `/meilleurs-bookmakers`, label: "Comparer les bookmakers", icon: <BarChart3 className="h-4 w-4 text-[#00B865]" /> },
      { href: `/bonus`, label: "Découvrir les bonus", icon: <CircleDollarSign className="h-4 w-4 text-[#D4AF37]" /> },
      { href: `/guide-paris`, label: "Explorer le guide paris", icon: <Target className="h-4 w-4 text-[#022149]" /> },
      { href: `/jeu-responsable`, label: "Jouer responsable", icon: <Shield className="h-4 w-4 text-[#00B865]" /> },
    ];
  }

  // Generic fallback
  return [
    { href: `/pronostic-vainqueur`, label: "Accéder au pronostic", icon: <BarChart3 className="h-4 w-4 text-[#00B865]" /> },
    { href: `/match/calendrier`, label: "Calendrier des matchs", icon: <Calendar className="h-4 w-4 text-[#D4AF37]" /> },
    { href: `/meilleurs-bookmakers`, label: "Comparer les bookmakers", icon: <CircleDollarSign className="h-4 w-4 text-[#022149]" /> },
    { href: `/equipes`, label: "Toutes les équipes", icon: <Users className="h-4 w-4 text-[#00B865]" /> },
  ];
}

interface ContextualSidebarProps {
  pathname?: string;
}

export function ContextualSidebar({ pathname: pathnameProp }: ContextualSidebarProps) {
  const hookPathname = usePathname();
  const pathname = pathnameProp || hookPathname;
  const links = getSidebarLinks(pathname);

  if (links.length === 0) return null;

  return (
    <aside className="hidden lg:block sticky top-24 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#022149] mb-3 px-3">
        Sur le même sujet
      </p>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
        >
          {link.icon}
          <span className="flex-1">{link.label}</span>
          <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#00B865] transition-colors" />
        </Link>
      ))}
    </aside>
  );
}
