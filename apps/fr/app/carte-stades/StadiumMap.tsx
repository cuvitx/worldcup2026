"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useState, useMemo } from "react";

interface Stadium {
  slug: string;
  name: string;
  city: string;
  country: "USA" | "Mexique" | "Canada";
  capacity: number;
  lat: number;
  lng: number;
  matches: number;
}

const COUNTRY_COLORS: Record<string, string> = {
  USA: "#3c3b6e",
  Mexique: "#006847",
  Canada: "#ff0000",
};

const COUNTRY_FLAGS: Record<string, string> = {
  USA: "🇺🇸",
  Mexique: "🇲🇽",
  Canada: "🇨🇦",
};

const STADIUMS: Stadium[] = [
  { slug: "metlife-stadium", name: "MetLife Stadium", city: "East Rutherford", country: "USA", capacity: 82500, lat: 40.8128, lng: -74.0742, matches: 8 },
  { slug: "rose-bowl", name: "Rose Bowl", city: "Pasadena", country: "USA", capacity: 88432, lat: 34.1613, lng: -118.1676, matches: 6 },
  { slug: "att-stadium", name: "AT&T Stadium", city: "Arlington", country: "USA", capacity: 80000, lat: 32.7473, lng: -97.0945, matches: 6 },
  { slug: "sofi-stadium", name: "SoFi Stadium", city: "Inglewood", country: "USA", capacity: 70240, lat: 33.9535, lng: -118.3392, matches: 6 },
  { slug: "hard-rock-stadium", name: "Hard Rock Stadium", city: "Miami", country: "USA", capacity: 65326, lat: 25.9580, lng: -80.2389, matches: 7 },
  { slug: "mercedes-benz-stadium", name: "Mercedes-Benz Stadium", city: "Atlanta", country: "USA", capacity: 71000, lat: 33.7553, lng: -84.4006, matches: 5 },
  { slug: "nrg-stadium", name: "NRG Stadium", city: "Houston", country: "USA", capacity: 72220, lat: 29.6847, lng: -95.4107, matches: 5 },
  { slug: "lincoln-financial-field", name: "Lincoln Financial Field", city: "Philadelphia", country: "USA", capacity: 69176, lat: 39.9008, lng: -75.1674, matches: 6 },
  { slug: "lumen-field", name: "Lumen Field", city: "Seattle", country: "USA", capacity: 69000, lat: 47.5952, lng: -122.3316, matches: 6 },
  { slug: "gillette-stadium", name: "Gillette Stadium", city: "Foxborough", country: "USA", capacity: 65878, lat: 42.0909, lng: -71.2643, matches: 5 },
  { slug: "arrowhead-stadium", name: "Arrowhead Stadium", city: "Kansas City", country: "USA", capacity: 76416, lat: 39.0489, lng: -94.4839, matches: 5 },
  { slug: "estadio-azteca", name: "Estadio Azteca", city: "Mexico", country: "Mexique", capacity: 87523, lat: 19.3029, lng: -99.1505, matches: 6 },
  { slug: "estadio-bbva", name: "Estadio BBVA", city: "Monterrey", country: "Mexique", capacity: 53500, lat: 25.6699, lng: -100.2447, matches: 5 },
  { slug: "estadio-akron", name: "Estadio Akron", city: "Guadalajara", country: "Mexique", capacity: 49850, lat: 20.6810, lng: -103.4625, matches: 5 },
  { slug: "bc-place", name: "BC Place", city: "Vancouver", country: "Canada", capacity: 54500, lat: 49.2768, lng: -123.1118, matches: 7 },
  { slug: "bmo-field", name: "BMO Field", city: "Toronto", country: "Canada", capacity: 45000, lat: 43.6332, lng: -79.4186, matches: 5 },
];

const MIN_DOT = 20;
const MAX_DOT = 36;
const minCap = Math.min(...STADIUMS.map((s) => s.capacity));
const maxCap = Math.max(...STADIUMS.map((s) => s.capacity));

function dotSize(capacity: number) {
  const t = (capacity - minCap) / (maxCap - minCap || 1);
  return Math.round(MIN_DOT + t * (MAX_DOT - MIN_DOT));
}

function createStadiumIcon(stadium: Stadium) {
  const size = dotSize(stadium.capacity);
  const color = COUNTRY_COLORS[stadium.country];
  return L.divIcon({
    className: "",
    html: `<div style="display:flex;flex-direction:column;align-items:center;pointer-events:auto;">
      <div style="
        width:${size}px;height:${size}px;border-radius:50%;
        background:${color};border:3px solid rgba(255,255,255,0.9);
        box-shadow:0 2px 8px rgba(0,0,0,0.5),0 0 20px ${color}44;
        transition:transform 0.2s;
      "></div>
      <span style="
        margin-top:4px;font-size:10px;font-weight:600;color:#fff;
        text-shadow:0 1px 4px rgba(0,0,0,0.9),0 0 2px rgba(0,0,0,0.7);
        white-space:nowrap;letter-spacing:0.02em;
      ">${stadium.name}</span>
    </div>`,
    iconSize: [120, size + 20],
    iconAnchor: [60, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

export default function StadiumMap() {
  const [activeCountries, setActiveCountries] = useState<Record<string, boolean>>({
    USA: true,
    Mexique: true,
    Canada: true,
  });

  const filteredStadiums = useMemo(
    () => STADIUMS.filter((s) => activeCountries[s.country]),
    [activeCountries]
  );

  const toggleCountry = (country: string) => {
    setActiveCountries((prev) => ({ ...prev, [country]: !prev[country] }));
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[700px] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
      <MapContainer
        center={[35, -100]}
        zoom={3}
        scrollWheelZoom
        className="w-full h-full z-0"
        style={{ width: "100%", height: "100%" }}
        ref={(mapRef) => { if (mapRef) setTimeout(() => mapRef.invalidateSize(), 300); }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {filteredStadiums.map((s) => (
          <Marker key={s.slug} position={[s.lat, s.lng]} icon={createStadiumIcon(s)}>
            <Popup>
              <div style={{ minWidth: 200, fontFamily: "system-ui, sans-serif" }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{s.name}</div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
                  {s.city} · {COUNTRY_FLAGS[s.country]} {s.country}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                  <span>{s.capacity.toLocaleString("fr-FR")} places</span>
                  <span>{s.matches} matchs</span>
                </div>
                <Link
                  href={`/stade/${s.slug}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "6px 0",
                    borderRadius: 8,
                    background: COUNTRY_COLORS[s.country],
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Voir la fiche →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div
        className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5 rounded-xl p-2.5"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      >
        {(["USA", "Canada", "Mexique"] as const).map((country) => (
          <button
            key={country}
            onClick={() => toggleCountry(country)}
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all"
            style={{
              background: activeCountries[country] ? COUNTRY_COLORS[country] : "rgba(255,255,255,0.1)",
              opacity: activeCountries[country] ? 1 : 0.5,
            }}
          >
            <span>{COUNTRY_FLAGS[country]}</span>
            <span>{country}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
