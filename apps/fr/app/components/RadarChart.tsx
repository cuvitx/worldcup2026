"use client";

import type { TeamRating } from "@repo/data/team-ratings";

const AXES: { key: keyof TeamRating; label: string }[] = [
  { key: "attack", label: "Attaque" },
  { key: "defense", label: "Défense" },
  { key: "physical", label: "Physique" },
  { key: "technique", label: "Technique" },
  { key: "experience", label: "Expérience CDM" },
];

const PAD = 50;
const SIZE = 300 + PAD * 2;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 120; // max radius
const LEVELS = 5;

function polarToXY(angle: number, radius: number): [number, number] {
  // Start from top (−π/2) and go clockwise
  const a = angle - Math.PI / 2;
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)];
}

export interface RadarChartProps {
  rating: TeamRating;
  /** Accent colour (hex). Falls back to secondary brand color */
  color?: string;
  className?: string;
}

export default function RadarChart({ rating, color = "#FFB800", className }: RadarChartProps) {
  const n = AXES.length;
  const angleStep = (2 * Math.PI) / n;

  // Grid rings
  const gridRings = Array.from({ length: LEVELS }, (_, i) => {
    const r = (R / LEVELS) * (i + 1);
    const pts = AXES.map((_, j) => polarToXY(j * angleStep, r).join(",")).join(" ");
    return <polygon key={i} points={pts} fill="none" stroke="currentColor" className="text-gray-300 dark:text-slate-600" strokeWidth={i === LEVELS - 1 ? 1.5 : 0.7} />;
  });

  // Axis lines
  const axisLines = AXES.map((_, i) => {
    const [x, y] = polarToXY(i * angleStep, R);
    return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="currentColor" className="text-gray-300 dark:text-slate-600" strokeWidth={0.7} />;
  });

  // Data polygon
  const dataPoints = AXES.map((axis, i) => {
    const val = rating[axis.key] / 100;
    return polarToXY(i * angleStep, R * val);
  });
  const dataPoly = dataPoints.map((p) => p.join(",")).join(" ");

  // Labels
  const labels = AXES.map((axis, i) => {
    const [x, y] = polarToXY(i * angleStep, R + 28);
    const val = rating[axis.key];
    return (
      <text
        key={axis.key}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-gray-700 dark:fill-gray-300 text-[11px] font-medium"
      >
        <tspan x={x} dy="-0.4em">{axis.label}</tspan>
        <tspan x={x} dy="1.2em" className="fill-gray-500 dark:fill-gray-400 text-[10px]">{val}</tspan>
      </text>
    );
  });

  // Value dots
  const dots = dataPoints.map(([x, y], i) => (
    <circle key={AXES[i]!.key} cx={x} cy={y} r={3.5} fill={color} stroke="white" strokeWidth={1.5} />
  ));

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={`w-full max-w-[320px] mx-auto ${className ?? ""}`}
      role="img"
      aria-label="Radar chart des notes de l'équipe"
    >
      {gridRings}
      {axisLines}
      <polygon
        points={dataPoly}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {dots}
      {labels}
    </svg>
  );
}
