"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

// Fix default marker icons in webpack/next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Stadium {
  slug: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  lat: number;
  lng: number;
  color: string;
}

const STADIUMS: Stadium[] = [
  { slug: "metlife-stadium", name: "MetLife Stadium", city: "East Rutherford", country: "USA", capacity: 82500, lat: 40.8128, lng: -74.0742, color: "#3b82f6" },
  { slug: "rose-bowl", name: "Rose Bowl", city: "Pasadena", country: "USA", capacity: 88432, lat: 34.1613, lng: -118.1676, color: "#3b82f6" },
  { slug: "att-stadium", name: "AT&T Stadium", city: "Arlington", country: "USA", capacity: 80000, lat: 32.7473, lng: -97.0945, color: "#3b82f6" },
  { slug: "sofi-stadium", name: "SoFi Stadium", city: "Inglewood", country: "USA", capacity: 70240, lat: 33.9535, lng: -118.3392, color: "#3b82f6" },
  { slug: "hard-rock-stadium", name: "Hard Rock Stadium", city: "Miami", country: "USA", capacity: 65326, lat: 25.9580, lng: -80.2389, color: "#3b82f6" },
  { slug: "mercedes-benz-stadium", name: "Mercedes-Benz Stadium", city: "Atlanta", country: "USA", capacity: 71000, lat: 33.7553, lng: -84.4006, color: "#3b82f6" },
  { slug: "nrg-stadium", name: "NRG Stadium", city: "Houston", country: "USA", capacity: 72220, lat: 29.6847, lng: -95.4107, color: "#3b82f6" },
  { slug: "lincoln-financial-field", name: "Lincoln Financial Field", city: "Philadelphia", country: "USA", capacity: 69176, lat: 39.9008, lng: -75.1674, color: "#3b82f6" },
  { slug: "lumen-field", name: "Lumen Field", city: "Seattle", country: "USA", capacity: 69000, lat: 47.5952, lng: -122.3316, color: "#3b82f6" },
  { slug: "gillette-stadium", name: "Gillette Stadium", city: "Foxborough", country: "USA", capacity: 65878, lat: 42.0909, lng: -71.2643, color: "#3b82f6" },
  { slug: "arrowhead-stadium", name: "Arrowhead Stadium", city: "Kansas City", country: "USA", capacity: 76416, lat: 39.0489, lng: -94.4839, color: "#3b82f6" },
  { slug: "estadio-azteca", name: "Estadio Azteca", city: "Mexico City", country: "Mexique", capacity: 87523, lat: 19.3029, lng: -99.1505, color: "#22c55e" },
  { slug: "estadio-bbva", name: "Estadio BBVA", city: "Monterrey", country: "Mexique", capacity: 53500, lat: 25.6699, lng: -100.2447, color: "#22c55e" },
  { slug: "estadio-akron", name: "Estadio Akron", city: "Guadalajara", country: "Mexique", capacity: 49850, lat: 20.6810, lng: -103.4625, color: "#22c55e" },
  { slug: "bc-place", name: "BC Place", city: "Vancouver", country: "Canada", capacity: 54500, lat: 49.2768, lng: -123.1118, color: "#ef4444" },
  { slug: "bmo-field", name: "BMO Field", city: "Toronto", country: "Canada", capacity: 45000, lat: 43.6332, lng: -79.4186, color: "#ef4444" },
];

function createColoredIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 24px; height: 24px; border-radius: 50%;
      background: ${color}; border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
}

export function StadiumMap() {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="w-full h-full dark:invert dark:hue-rotate-180 dark:brightness-150">
        <MapContainer
          center={[35, -100]}
          zoom={4}
          scrollWheelZoom
          className="w-full h-full z-0"
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {STADIUMS.map((s) => (
            <Marker key={s.slug} position={[s.lat, s.lng]} icon={createColoredIcon(s.color)}>
              <Popup>
                <div className="text-sm">
                  <strong>{s.name}</strong>
                  <br />
                  {s.city} · {s.country}
                  <br />
                  🏟️ {s.capacity.toLocaleString("fr-FR")} places
                  <br />
                  <Link href={`/stade/${s.slug}`} className="text-blue-600 underline text-xs">
                    Voir la fiche →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
