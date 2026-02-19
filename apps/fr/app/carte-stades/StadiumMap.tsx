"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// ─── Stadium data ─────────────────────────────────────────────────────────────

interface StadiumMarker {
  slug: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  lat: number;
  lng: number;
  countryCode: "usa" | "canada" | "mexico";
}

// All 16 stadiums with real lat/lng from @repo/data/stadiums
const STADIUMS: StadiumMarker[] = [
  // USA
  { slug: "metlife-stadium",        name: "MetLife Stadium",          city: "New York / New Jersey",  country: "USA",    capacity: 82500, lat: 40.8128, lng: -74.0742, countryCode: "usa" },
  { slug: "att-stadium",            name: "AT&T Stadium",             city: "Dallas / Arlington",     country: "USA",    capacity: 80000, lat: 32.7473, lng: -97.0945, countryCode: "usa" },
  { slug: "hard-rock-stadium",      name: "Hard Rock Stadium",        city: "Miami",                  country: "USA",    capacity: 65326, lat: 25.9580, lng: -80.2389, countryCode: "usa" },
  { slug: "mercedes-benz-stadium",  name: "Mercedes-Benz Stadium",    city: "Atlanta",                country: "USA",    capacity: 71000, lat: 33.7553, lng: -84.4010, countryCode: "usa" },
  { slug: "lumen-field",            name: "Lumen Field",              city: "Seattle",                country: "USA",    capacity: 69000, lat: 47.5952, lng: -122.3316, countryCode: "usa" },
  { slug: "nrg-stadium",            name: "NRG Stadium",              city: "Houston",                country: "USA",    capacity: 72220, lat: 29.6847, lng: -95.4107, countryCode: "usa" },
  { slug: "lincoln-financial-field",name: "Lincoln Financial Field",  city: "Philadelphia",           country: "USA",    capacity: 69176, lat: 39.9008, lng: -75.1675, countryCode: "usa" },
  { slug: "arrowhead-stadium",      name: "Arrowhead Stadium",        city: "Kansas City",            country: "USA",    capacity: 76416, lat: 39.0489, lng: -94.4840, countryCode: "usa" },
  { slug: "gillette-stadium",       name: "Gillette Stadium",         city: "Boston",                 country: "USA",    capacity: 65878, lat: 42.0909, lng: -71.2643, countryCode: "usa" },
  { slug: "levis-stadium",          name: "Levi's Stadium",           city: "San Francisco",          country: "USA",    capacity: 68500, lat: 37.4033, lng: -121.9694, countryCode: "usa" },
  { slug: "sofi-stadium",           name: "SoFi Stadium",             city: "Los Angeles",            country: "USA",    capacity: 70240, lat: 33.9534, lng: -118.3392, countryCode: "usa" },
  // Mexico
  { slug: "estadio-azteca",         name: "Estadio Azteca",           city: "Mexico City",            country: "Mexique", capacity: 87523, lat: 19.3029, lng: -99.1505, countryCode: "mexico" },
  { slug: "estadio-akron",          name: "Estadio Akron",            city: "Guadalajara",            country: "Mexique", capacity: 49850, lat: 20.6821, lng: -103.4625, countryCode: "mexico" },
  { slug: "estadio-bbva",           name: "Estadio BBVA",             city: "Monterrey",              country: "Mexique", capacity: 53500, lat: 25.6699, lng: -100.2436, countryCode: "mexico" },
  // Canada
  { slug: "bmo-field",              name: "BMO Field",                city: "Toronto",                country: "Canada", capacity: 45000, lat: 43.6332, lng: -79.4186, countryCode: "canada" },
  { slug: "bc-place",               name: "BC Place",                 city: "Vancouver",              country: "Canada", capacity: 54500, lat: 49.2768, lng: -123.1120, countryCode: "canada" },
];

// ─── Geo → SVG projection ─────────────────────────────────────────────────────

// Map bounds (lat/lng for the SVG viewport)
const MAP_BOUNDS = {
  latMin: 14.5,   // southern Mexico
  latMax: 55.0,   // northern Canada
  lngMin: -130.0, // west coast
  lngMax: -55.0,  // east coast
};

// SVG dimensions
const SVG_W = 900;
const SVG_H = 600;

function geoToSvg(lat: number, lng: number): [number, number] {
  const x =
    ((lng - MAP_BOUNDS.lngMin) / (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin)) *
    SVG_W;
  // Invert Y (lat increases upward, SVG Y increases downward)
  const y =
    (1 - (lat - MAP_BOUNDS.latMin) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)) *
    SVG_H;
  return [x, y];
}

// ─── Country flag helper ──────────────────────────────────────────────────────

const COUNTRY_FLAGS: Record<StadiumMarker["countryCode"], string> = {
  usa: "🇺🇸",
  canada: "🇨🇦",
  mexico: "🇲🇽",
};

const MARKER_COLORS: Record<StadiumMarker["countryCode"], { fill: string; ring: string; glow: string }> = {
  usa:    { fill: "#3b82f6", ring: "#1d4ed8", glow: "rgba(59,130,246,0.35)" },
  canada: { fill: "#ef4444", ring: "#b91c1c", glow: "rgba(239,68,68,0.35)" },
  mexico: { fill: "#22c55e", ring: "#15803d", glow: "rgba(34,197,94,0.35)" },
};

// ─── Stadium map component ────────────────────────────────────────────────────

export function StadiumMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; stadium: StadiumMarker } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMarkerEnter = (stadium: StadiumMarker, svgX: number, svgY: number) => {
    setHovered(stadium.slug);
    setTooltip({ x: svgX, y: svgY, stadium });
  };

  const handleMarkerLeave = () => {
    setHovered(null);
    setTooltip(null);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-[#e8f4fd] dark:bg-[#0d1b2a] shadow-lg">
      {/* Legend */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl p-2.5 shadow-md text-xs font-medium">
        {(["usa", "canada", "mexico"] as const).map((code) => (
          <div key={code} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full border-2 shrink-0"
              style={{
                background: MARKER_COLORS[code].fill,
                borderColor: MARKER_COLORS[code].ring,
              }}
            />
            <span className="text-gray-700 dark:text-gray-200">
              {COUNTRY_FLAGS[code]}{" "}
              {code === "usa" ? "États-Unis" : code === "canada" ? "Canada" : "Mexique"}
            </span>
          </div>
        ))}
      </div>

      {/* SVG map */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Carte interactive des 16 stades de la CDM 2026"
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
          </filter>
          <radialGradient id="ocean" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </radialGradient>
          <radialGradient id="ocean-dark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f2a4a" />
            <stop offset="100%" stopColor="#0a1e36" />
          </radialGradient>
          {/* Glow filter for hovered markers */}
          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ocean background */}
        <rect width={SVG_W} height={SVG_H} fill="#c8e6f7" className="dark:fill-[#0d1b2a]" />

        {/* Simplified North America SVG land masses */}
        {/* === CANADA === */}
        <path
          d="
            M 105,0 L 160,0 L 220,20 L 290,5 L 360,0 L 400,10 L 450,0 L 520,15 L 560,0 L 650,0 L 700,20
            L 750,10 L 820,0 L 900,0 L 900,180
            L 850,175 L 800,160 L 780,170 L 740,155 L 700,165 L 680,150 L 640,160 L 610,145
            L 590,155 L 560,140 L 540,150 L 510,135 L 490,148 L 460,130 L 430,145 L 410,125
            L 385,140 L 360,120 L 335,135 L 310,115 L 280,130 L 255,110 L 225,125 L 200,108
            L 175,120 L 150,105 L 125,118 L 105,100 Z
          "
          fill="#d4edda"
          className="dark:fill-[#1a3a25] dark:stroke-[#2d5438]"
          stroke="#9dccab"
          strokeWidth="1"
        />
        {/* === USA === */}
        <path
          d="
            M 105,100 L 125,118 L 150,105 L 175,120 L 200,108 L 225,125 L 255,110 L 280,130
            L 310,115 L 335,135 L 360,120 L 385,140 L 410,125 L 430,145 L 460,130
            L 490,148 L 510,135 L 540,150 L 560,140 L 590,155 L 610,145 L 640,160
            L 680,150 L 700,165 L 740,155 L 780,170 L 800,160 L 850,175 L 900,180
            L 900,380 L 870,385 L 840,370 L 790,380 L 750,365 L 700,375 L 650,360
            L 610,370 L 580,355 L 550,365 L 510,350 L 480,363 L 450,345 L 415,360
            L 380,342 L 350,358 L 315,340 L 280,355 L 245,337 L 210,350 L 175,335
            L 150,348 L 120,332 L 105,342
            L 100,320 L 105,300 L 95,280 L 100,260 L 90,240 L 95,220 L 88,200
            L 92,180 L 85,165 L 90,145 L 80,125 L 85,110 L 100,108 L 105,100 Z
          "
          fill="#dbeafe"
          className="dark:fill-[#1a2a4a]"
          stroke="#93c5fd"
          strokeWidth="1"
        />
        {/* West coast notch (Pacific protrusion) */}
        <path
          d="M 85,110 L 75,130 L 60,160 L 50,190 L 55,220 L 48,250 L 55,280 L 45,310 L 55,340
             L 80,350 L 105,342 L 120,332 L 150,348 L 105,342"
          fill="#dbeafe"
          className="dark:fill-[#1a2a4a]"
          stroke="#93c5fd"
          strokeWidth="1"
        />
        {/* === MEXICO === */}
        <path
          d="
            M 105,342 L 150,348 L 175,335 L 210,350 L 245,337 L 280,355 L 315,340
            L 350,358 L 380,342 L 415,360 L 450,345 L 480,363 L 510,350
            L 500,380 L 490,400 L 475,420 L 460,440 L 445,460 L 425,480 L 400,495
            L 380,510 L 360,490 L 340,475 L 320,455 L 300,465 L 280,445
            L 260,458 L 240,435 L 220,450 L 200,430 L 185,450 L 165,430
            L 150,415 L 135,400 L 120,385 L 105,370 L 105,342 Z
          "
          fill="#fef9c3"
          className="dark:fill-[#3a3010]"
          stroke="#fde68a"
          strokeWidth="1"
        />

        {/* ── Markers ─────────────────────────────────────────────────────── */}
        {STADIUMS.map((stadium) => {
          const [svgX, svgY] = geoToSvg(stadium.lat, stadium.lng);
          const isHovered = hovered === stadium.slug;
          const colors = MARKER_COLORS[stadium.countryCode];
          const r = isHovered ? 10 : 7;

          return (
            <g key={stadium.slug}>
              {/* Pulse ring on hover */}
              {isHovered && (
                <circle
                  cx={svgX}
                  cy={svgY}
                  r={18}
                  fill="none"
                  stroke={colors.fill}
                  strokeWidth="2"
                  opacity="0.4"
                  style={{ animation: "ping 1s ease-in-out infinite" }}
                />
              )}
              {/* Clickable marker */}
              <a href={`/stade/${stadium.slug}`} style={{ cursor: "pointer" }}>
                <circle
                  cx={svgX}
                  cy={svgY}
                  r={r + 3}
                  fill="white"
                  opacity="0.7"
                  filter="url(#shadow)"
                />
                <circle
                  cx={svgX}
                  cy={svgY}
                  r={r}
                  fill={colors.fill}
                  stroke={colors.ring}
                  strokeWidth="2"
                  style={{ transition: "r 0.15s ease", cursor: "pointer" }}
                  onMouseEnter={() => handleMarkerEnter(stadium, svgX, svgY)}
                  onMouseLeave={handleMarkerLeave}
                  onFocus={() => handleMarkerEnter(stadium, svgX, svgY)}
                  onBlur={handleMarkerLeave}
                />
              </a>
            </g>
          );
        })}

        {/* ── Tooltip ──────────────────────────────────────────────────────── */}
        {tooltip && (() => {
          const { x, y, stadium } = tooltip;
          const colors = MARKER_COLORS[stadium.countryCode];
          const ttW = 200;
          const ttH = 75;
          // Keep tooltip in bounds
          const tx = Math.min(Math.max(x - ttW / 2, 10), SVG_W - ttW - 10);
          const ty = y - ttH - 18 < 5 ? y + 18 : y - ttH - 18;

          return (
            <g pointerEvents="none">
              {/* Shadow */}
              <rect x={tx + 2} y={ty + 2} width={ttW} height={ttH} rx="8" fill="rgba(0,0,0,0.15)" />
              {/* Background */}
              <rect x={tx} y={ty} width={ttW} height={ttH} rx="8" fill="white" className="dark:fill-gray-800" />
              {/* Accent bar */}
              <rect x={tx} y={ty} width={ttW} height={4} rx="4" fill={colors.fill} />
              {/* Stadium name */}
              <text x={tx + 10} y={ty + 22} fontSize="11" fontWeight="bold" fill="#111">
                {stadium.name}
              </text>
              {/* City */}
              <text x={tx + 10} y={ty + 37} fontSize="10" fill="#555">
                {stadium.city} · {COUNTRY_FLAGS[stadium.countryCode]} {stadium.country}
              </text>
              {/* Capacity */}
              <text x={tx + 10} y={ty + 52} fontSize="10" fill={colors.fill} fontWeight="600">
                🏟️ {stadium.capacity.toLocaleString("fr-FR")} places
              </text>
              {/* Click hint */}
              <text x={tx + 10} y={ty + 67} fontSize="9" fill="#888">
                Cliquez pour plus d&apos;infos
              </text>
            </g>
          );
        })()}
      </svg>

      {/* Pulse animation */}
      <style>{`
        @keyframes ping {
          0%, 100% { transform-origin: center; transform: scale(1); opacity: 0.4; }
          50% { transform-origin: center; transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
