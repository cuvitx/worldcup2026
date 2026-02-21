"use client";

import { useState } from "react";
import Link from "next/link";
import { Bus, Calculator, Calendar, ChevronDown, DollarSign, ExternalLink, Hotel, Lightbulb, MapPin, Plane, Ticket, Utensils } from "lucide-react";

/* ────────── Data ────────── */

type Standing = "budget" | "moyen" | "premium";

interface CityData {
  name: string;
  country: string;
  vol: Record<Standing, number>;
  hotel: Record<Standing, number>;
  repas: Record<Standing, number>;
  transport: Record<Standing, number>;
}

const cities: CityData[] = [
  // USA
  { name: "New York / East Rutherford", country: "🇺🇸", vol: { budget: 600, moyen: 900, premium: 1200 }, hotel: { budget: 120, moyen: 250, premium: 400 }, repas: { budget: 40, moyen: 70, premium: 120 }, transport: { budget: 15, moyen: 25, premium: 35 } },
  { name: "Los Angeles / Inglewood", country: "🇺🇸", vol: { budget: 650, moyen: 950, premium: 1300 }, hotel: { budget: 110, moyen: 220, premium: 380 }, repas: { budget: 35, moyen: 65, premium: 110 }, transport: { budget: 15, moyen: 25, premium: 35 } },
  { name: "Miami / Miami Gardens", country: "🇺🇸", vol: { budget: 600, moyen: 900, premium: 1250 }, hotel: { budget: 100, moyen: 200, premium: 350 }, repas: { budget: 35, moyen: 60, premium: 100 }, transport: { budget: 12, moyen: 22, premium: 30 } },
  { name: "Dallas", country: "🇺🇸", vol: { budget: 650, moyen: 950, premium: 1300 }, hotel: { budget: 90, moyen: 180, premium: 320 }, repas: { budget: 30, moyen: 55, premium: 95 }, transport: { budget: 12, moyen: 22, premium: 30 } },
  { name: "Houston", country: "🇺🇸", vol: { budget: 650, moyen: 950, premium: 1300 }, hotel: { budget: 85, moyen: 170, premium: 300 }, repas: { budget: 30, moyen: 55, premium: 90 }, transport: { budget: 12, moyen: 20, premium: 30 } },
  { name: "Atlanta", country: "🇺🇸", vol: { budget: 600, moyen: 900, premium: 1200 }, hotel: { budget: 90, moyen: 180, premium: 320 }, repas: { budget: 30, moyen: 55, premium: 90 }, transport: { budget: 10, moyen: 20, premium: 30 } },
  { name: "Philadelphie", country: "🇺🇸", vol: { budget: 600, moyen: 880, premium: 1200 }, hotel: { budget: 100, moyen: 200, premium: 350 }, repas: { budget: 35, moyen: 60, premium: 100 }, transport: { budget: 10, moyen: 20, premium: 30 } },
  { name: "Seattle", country: "🇺🇸", vol: { budget: 700, moyen: 1000, premium: 1400 }, hotel: { budget: 100, moyen: 210, premium: 360 }, repas: { budget: 35, moyen: 65, premium: 110 }, transport: { budget: 12, moyen: 22, premium: 30 } },
  { name: "San Francisco / Bay Area", country: "🇺🇸", vol: { budget: 680, moyen: 980, premium: 1350 }, hotel: { budget: 120, moyen: 250, premium: 400 }, repas: { budget: 40, moyen: 70, premium: 120 }, transport: { budget: 15, moyen: 25, premium: 35 } },
  { name: "Boston / Foxborough", country: "🇺🇸", vol: { budget: 580, moyen: 870, premium: 1200 }, hotel: { budget: 110, moyen: 230, premium: 380 }, repas: { budget: 40, moyen: 65, premium: 110 }, transport: { budget: 12, moyen: 22, premium: 30 } },
  { name: "Kansas City", country: "🇺🇸", vol: { budget: 700, moyen: 1000, premium: 1400 }, hotel: { budget: 80, moyen: 160, premium: 280 }, repas: { budget: 28, moyen: 50, premium: 85 }, transport: { budget: 10, moyen: 18, premium: 28 } },
  // Mexico
  { name: "Mexico (Estadio Azteca)", country: "🇲🇽", vol: { budget: 650, moyen: 950, premium: 1300 }, hotel: { budget: 60, moyen: 130, premium: 250 }, repas: { budget: 20, moyen: 40, premium: 80 }, transport: { budget: 8, moyen: 15, premium: 25 } },
  { name: "Guadalajara", country: "🇲🇽", vol: { budget: 700, moyen: 1000, premium: 1400 }, hotel: { budget: 55, moyen: 120, premium: 230 }, repas: { budget: 18, moyen: 38, premium: 75 }, transport: { budget: 8, moyen: 15, premium: 25 } },
  { name: "Monterrey", country: "🇲🇽", vol: { budget: 700, moyen: 1000, premium: 1400 }, hotel: { budget: 55, moyen: 120, premium: 230 }, repas: { budget: 18, moyen: 38, premium: 75 }, transport: { budget: 8, moyen: 15, premium: 25 } },
  // Canada
  { name: "Vancouver", country: "🇨🇦", vol: { budget: 700, moyen: 1000, premium: 1400 }, hotel: { budget: 100, moyen: 210, premium: 370 }, repas: { budget: 35, moyen: 60, premium: 100 }, transport: { budget: 10, moyen: 20, premium: 30 } },
  { name: "Toronto", country: "🇨🇦", vol: { budget: 550, moyen: 850, premium: 1150 }, hotel: { budget: 95, moyen: 200, premium: 350 }, repas: { budget: 35, moyen: 60, premium: 100 }, transport: { budget: 10, moyen: 20, premium: 30 } },
];

const matchPrices: Record<Standing, number> = { budget: 70, moyen: 150, premium: 300 };

const standingLabels: Record<Standing, string> = {
  budget: " Budget",
  moyen: " Moyen",
  premium: " Premium",
};

/* ────────── Helpers ────────── */

function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ────────── Page ────────── */

export default function CalculateurBudgetPage() {
  const [cityIdx, setCityIdx] = useState(0);
  const [days, setDays] = useState(10);
  const [standing, setStanding] = useState<Standing>("moyen");
  const [matchCount, setMatchCount] = useState(3);

  const city = cities[cityIdx]!;

  const volPrice = city.vol[standing];
  const hotelPrice = city.hotel[standing] * days;
  const matchPrice = matchPrices[standing] * matchCount;
  const repasPrice = city.repas[standing] * days;
  const transportPrice = city.transport[standing] * days;
  const total = volPrice + hotelPrice + matchPrice + repasPrice + transportPrice;

  const postes = [
    { label: "Vol A/R Paris →", value: volPrice, icon: Plane, color: "bg-blue-500" },
    { label: `Hôtel (${days} nuits)`, value: hotelPrice, icon: Hotel, color: "bg-purple-500" },
    { label: `Billets match (×${matchCount})`, value: matchPrice, icon: Ticket, color: "bg-accent" },
    { label: `Repas (${days} jours)`, value: repasPrice, icon: Utensils, color: "bg-orange-500" },
    { label: `Transport local (${days} j.)`, value: transportPrice, icon: Bus, color: "bg-green-500" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
              <DollarSign className="h-5 w-5 inline-block" /> Outil interactif
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Calculateur budget CDM 2026
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Combien va coûter votre voyage pour la Coupe du Monde 2026 ?
              Sélectionnez votre ville, durée et standing pour une estimation en temps réel.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ville */}
            <div>
              <label className="block text-sm font-bold mb-2"><MapPin className="h-5 w-5 inline-block" /> Ville de destination</label>
              <div className="relative">
                <select
                  value={cityIdx}
                  onChange={(e) => setCityIdx(Number(e.target.value))}
                  className="w-full appearance-none rounded-xl border bg-whitegray-900 px-4 py-3 pr-10 font-medium focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {cities.map((c, i) => (
                    <option key={c.name} value={i}>
                      {c.country} {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent pointer-events-none" />
              </div>
            </div>

            {/* Jours */}
            <div>
              <label className="block text-sm font-bold mb-2">
                <Calendar className="h-5 w-5 inline-block" /> Nombre de jours : <span className="text-accent">{days}</span>
              </label>
              <input
                type="range"
                min={3}
                max={21}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-xs text-accent mt-1">
                <span>3 jours</span>
                <span>21 jours</span>
              </div>
            </div>

            {/* Standing */}
            <div>
              <label className="block text-sm font-bold mb-2"><Hotel className="h-5 w-5 inline-block" /> Standing</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(standingLabels) as Standing[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStanding(s)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                      standing === s
                        ? "border-accent bg-accent/10 text-accent ring-2 ring-accent/30"
                        : "hover:border-accent/30"
                    }`}
                  >
                    {standingLabels[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Matchs */}
            <div>
              <label className="block text-sm font-bold mb-2">
                <Ticket className="h-5 w-5 inline-block" /> Nombre de matchs : <span className="text-accent">{matchCount}</span>
              </label>
              <input
                type="range"
                min={1}
                max={7}
                value={matchCount}
                onChange={(e) => setMatchCount(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-xs text-accent mt-1">
                <span>1 match</span>
                <span>7 matchs</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">
            {/* Total */}
            <div className="rounded-2xl border-2 border-accent bg-accent/5 p-6 text-center">
              <p className="text-sm text-accent font-medium mb-1">Budget total estimé</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-accent">{fmt(total)} €</p>
              <p className="text-xs text-accent mt-2">
                {city.country} {city.name} · {days} jours · {standingLabels[standing]} · {matchCount} match{matchCount > 1 ? "s" : ""}
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              {postes.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.label} className="rounded-xl border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-accent" />
                        <span className="text-sm font-medium">{p.label}</span>
                      </div>
                      <span className="font-bold">{fmt(p.value)} €</span>
                    </div>
                    <ProgressBar value={p.value} max={total} color={p.color} />
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <Link
                href="/billets"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 font-bold text-white hover:bg-accent/90 transition-all"
              >
                <Ticket className="h-5 w-5 inline-block" /> Acheter ses billets
              </Link>
              <a
                href="https://www.booking.com/searchresults.fr.html?ss=United+States"
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent text-accent px-5 py-3.5 font-bold hover:bg-accent/5 transition-all"
              >
                <Hotel className="h-4 w-4" />
                Réserver sur Booking
              </a>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                href="/hebergement"
                className="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium hover:border-accent/50 transition-all"
              >
                <Hotel className="h-5 w-5 inline-block" /> Guide hébergement
              </Link>
              <a
                href="https://www.airbnb.fr/"
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium hover:border-accent/50 transition-all"
              >
                <ExternalLink className="h-4 w-4" />
                Chercher sur Airbnb
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-accent text-center mt-10 max-w-2xl mx-auto">
          <Lightbulb className="h-5 w-5 inline-block" /> Ces estimations sont indicatives et basées sur les prix moyens constatés début 2025.
          Les tarifs réels peuvent varier selon la période, la disponibilité et les promotions.
          Les prix des billets correspondent aux catégories FIFA officielles (phase de groupes).
        </p>
      </div>
    </>
  );
}
