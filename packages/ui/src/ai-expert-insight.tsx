"use client";

import { useState, memo } from "react";

/**
 * Translations for AI expert insight widget.
 */
const translations = {
  fr: { title: "Analyse Expert", badge: "Claude IA", scorePredicted: "Score predit", tacticalAnalysis: "Analyse tactique", valueBets: "Value Bets detectes", edgeDetected: "Edge detecte", model: "Modele", market: "Marche", seeLess: "Voir moins", seeReasoning: "Voir le raisonnement", disclaimer: "Analyse generee par IA. Ne constitue pas un conseil de paris. 18+. Jouez responsablement." },
  en: { title: "Expert Analysis", badge: "Claude AI", scorePredicted: "Predicted score", tacticalAnalysis: "Tactical analysis", valueBets: "Value Bets detected", edgeDetected: "Edge detected", model: "Model", market: "Market", seeLess: "See less", seeReasoning: "See reasoning", disclaimer: "AI-generated analysis. Not betting advice. 18+. Gamble responsibly." },
  es: { title: "Analisis Experto", badge: "Claude IA", scorePredicted: "Marcador previsto", tacticalAnalysis: "Analisis tactico", valueBets: "Value Bets detectados", edgeDetected: "Edge detectado", model: "Modelo", market: "Mercado", seeLess: "Ver menos", seeReasoning: "Ver razonamiento", disclaimer: "Analisis generado por IA. No constituye consejo de apuestas. 18+. Juegue responsablemente." },
};

/**
 * A value bet recommendation from AI analysis.
 * 
 * @param market - Bet market (e.g., "1X2", "Over/Under 2.5")
 * @param selection - Specific selection (e.g., "Home Win", "Over 2.5")
 * @param bookmakerOdds - Current bookmaker odds
 * @param modelProbability - AI model probability (0-1 or 0-100)
 * @param edge - Edge percentage (positive = value, negative = no value)
 * @param confidence - Confidence score (0-5)
 * @param reasoning - Explanation text
 */
interface ValueBet {
  market: string;
  selection: string;
  bookmakerOdds: number;
  modelProbability: number;
  edge: number;
  confidence: number;
  reasoning: string;
}

/**
 * Props for the AiExpertInsight component.
 * 
 * @param valueBets - Array of value bet recommendations
 * @param matchAnalysis - AI-generated match analysis text (supports markdown with **bold**)
 * @param scorePrediction - Predicted score (e.g., "2-0 (France domine)")
 * @param keyInsight - One-sentence key insight (highlighted box)
 * @param locale - UI language: "fr" | "en" | "es" (default: "fr")
 */
interface AiExpertInsightProps {
  valueBets: ValueBet[];
  matchAnalysis: string;
  scorePrediction: string;
  keyInsight: string;
  locale?: "fr" | "en" | "es";
}

// ─── SVG Components ──────────────────────────────────────────────────────────

/** Circular confidence gauge (0-5) */
function ConfidenceGauge({ value, size = 48 }: { value: number; size?: number }) {
  const clamped = Math.min(Math.max(value, 0), 5);
  const percentage = clamped / 5;
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage);
  const color = clamped >= 4 ? "#00B865" : clamped >= 3 ? "#d97706" : "#dc2626";

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`Confiance ${clamped}/5`}>
        {/* Background circle */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        {/* Progress arc */}
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Center text */}
        <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle"
          fontSize="13" fontWeight="800" fill={color}>
          {clamped}
        </text>
      </svg>
      <span className="text-[10px] font-medium text-gray-400">/5</span>
    </div>
  );
}

/** Horizontal edge bar with gradient */
function EdgeBar({ edge }: { edge: number }) {
  const absEdge = Math.abs(edge);
  const maxEdge = 25; // cap visual at 25%
  const width = Math.min((absEdge / maxEdge) * 100, 100);
  const isPositive = edge > 0;
  const color = isPositive
    ? absEdge >= 15 ? "#00B865" : absEdge >= 8 ? "#00B865" : "#00B865"
    : "#ef4444";
  const label = `${isPositive ? "+" : ""}${edge.toFixed(1)}%`;

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden" aria-label={`Edge ${label}`}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold tabular-nums min-w-[48px] text-right" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

/** Probability comparison mini-chart */
function ProbabilityCompare({ modelProb, impliedProb, t }: { modelProb: number; impliedProb: number; t: { model: string; market: string } }) {
  const modelPct = Math.round(modelProb * 100);
  const impliedPct = Math.round(impliedProb * 100);
  const barMax = 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] w-14 text-gray-400">{t.model}</span>
        <div className="h-1.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full bg-primary" style={{ width: `${(modelPct / barMax) * 100}%` }} />
        </div>
        <span className="text-xs font-bold text-primary tabular-nums w-8 text-right">{modelPct}%</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] w-14 text-gray-400">{t.market}</span>
        <div className="h-1.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full bg-gray-400" style={{ width: `${(impliedPct / barMax) * 100}%` }} />
        </div>
        <span className="text-xs font-bold text-gray-500 tabular-nums w-8 text-right">{impliedPct}%</span>
      </div>
    </div>
  );
}

/** Brain icon for the header */
function BrainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.8 1.5 3.8C6.5 12 6 13.5 6 15c0 3.5 2.5 7 6 7s6-3.5 6-7c0-1.5-.5-3-1.5-4.2C17.5 9.8 18 8.5 18 7c0-2.5-2.5-5-6-5z" fill="#7c3aed" opacity="0.1" />
      <path d="M12 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM12 22c-2.8 0-4-2.5-4-5s1.2-4 4-4 4 1.5 4 4-1.2 5-4 5z" stroke="#7c3aed" strokeWidth="1.5" />
      <circle cx="12" cy="8" r="1.5" fill="#7c3aed" />
    </svg>
  );
}

/** Collapsible text block */
function CollapsibleText({ text, maxLength = 120, t }: { text: string; maxLength?: number; t: { seeLess: string; seeReasoning: string } }) {
  const [expanded, setExpanded] = useState(false);
  if (text.length <= maxLength) return <p className="text-xs text-gray-600 leading-relaxed">{renderMarkdown(text)}</p>;

  return (
    <div>
      <p className="text-xs text-gray-600 leading-relaxed">
        {expanded ? renderMarkdown(text) : `${text.slice(0, maxLength).trim()}...`}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-1 text-xs font-medium text-primary hover:text-primary/80"
      >
        {expanded ? t.seeLess : t.seeReasoning}
      </button>
    </div>
  );
}

/** Simple markdown renderer (bold + line breaks) */
function renderMarkdown(text: string): React.ReactNode {
  // Split on **bold** markers
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * AiExpertInsight component — Displays AI-generated match analysis with value bets.
 * 
 * Features:
 * - Key insight highlight box
 * - Score prediction with large display
 * - Markdown-formatted tactical analysis
 * - Value bet cards with confidence gauges and edge bars
 * - Probability comparison charts
 * - Collapsible reasoning texts
 * 
 * @example
 * ```tsx
 * <AiExpertInsight
 *   keyInsight="La France domine largement sur le plan offensif."
 *   scorePrediction="2-0 (France gagne)"
 *   matchAnalysis="La France possède **60% de possession**. Le Brésil a des difficultés défensives."
 *   valueBets={[
 *     {
 *       market: "1X2",
 *       selection: "France Win",
 *       bookmakerOdds: 2.1,
 *       modelProbability: 0.55,
 *       edge: 15.5,
 *       confidence: 4,
 *       reasoning: "Strong home advantage and recent form."
 *     }
 *   ]}
 *   locale="fr"
 * />
 * ```
 */
export const AiExpertInsight = memo(function AiExpertInsight({ valueBets, matchAnalysis, scorePrediction, keyInsight, locale }: AiExpertInsightProps) {
  const t = translations[locale ?? "fr"];

  // Parse score from prediction (extract "2-0" pattern)
  const scoreMatch = scorePrediction.match(/(\d+)\s*[-–]\s*(\d+)/);
  const shortScore = scoreMatch ? `${scoreMatch[1]} - ${scoreMatch[2]}` : scorePrediction;
  const scoreDetail = scoreMatch ? scorePrediction.replace(scoreMatch[0], "").replace(/^\s*[:(,]\s*/, "").replace(/\)\s*$/, "").trim() : "";

  return (
    <div className="rounded-xl border border-purple-200 bg-gradient-to-b from-purple-50/50 to-white p-6">
      {/* Header */}
      <div className="mb-5 flex items-center gap-2">
        <BrainIcon />
        <h2 className="text-lg font-bold text-purple-900">{t.title}</h2>
        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 uppercase tracking-wider">
          {t.badge}
        </span>
      </div>

      {/* Key Insight — highlighted box */}
      {keyInsight && (
        <div className="mb-5 rounded-lg bg-purple-50 p-4 border border-purple-100">
          <div className="flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
              <path d="M8 1l2 4 4.5.7-3.3 3.1.8 4.5L8 11.2 3.9 13.3l.8-4.5L1.5 5.7 6 5z" fill="#d97706" />
            </svg>
            <p className="text-sm text-purple-900 leading-relaxed">{renderMarkdown(keyInsight)}</p>
          </div>
        </div>
      )}

      {/* Score Prediction — clean and bold */}
      {scorePrediction && (
        <div className="mb-5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{t.scorePredicted}</p>
          <p className="text-3xl font-black text-gray-900">{shortScore}</p>
          {scoreDetail && (
            <p className="mt-1 text-xs text-gray-500">{scoreDetail}</p>
          )}
        </div>
      )}

      {/* Match Analysis — with markdown rendering + paragraphs */}
      {matchAnalysis && (
        <div className="mb-5">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">{t.tacticalAnalysis}</h3>
          <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
            {matchAnalysis.split(/\n+/).filter(Boolean).map((para, i) => (
              <p key={i}>{renderMarkdown(para)}</p>
            ))}
          </div>
        </div>
      )}

      {/* Value Bets — visual cards */}
      {valueBets.length > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            {t.valueBets} ({valueBets.length})
          </h3>
          <div className="space-y-3">
            {valueBets.map((bet, i) => {
              const odds = Number(bet.bookmakerOdds) || 1;
              const rawModelProb = Number(bet.modelProbability) || 0;
              const impliedProb = 1 / odds;
              const modelProb = rawModelProb < 1 ? rawModelProb : rawModelProb / 100;

              return (
                <div key={i} className="rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
                  {/* Top row: market + selection + confidence gauge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{bet.market}</p>
                      <p className="text-base font-bold text-gray-900">{bet.selection}</p>
                    </div>
                    <ConfidenceGauge value={Number(bet.confidence) || 0} />
                  </div>

                  {/* Odds badge */}
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-lg bg-gray-900 px-3 py-1.5">
                      <span className="text-lg font-black text-white tabular-nums">{odds.toFixed(2)}</span>
                    </div>
                    <div className="flex-1">
                      <ProbabilityCompare modelProb={modelProb} impliedProb={impliedProb} t={t} />
                    </div>
                  </div>

                  {/* Edge bar */}
                  <div className="mb-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">{t.edgeDetected}</p>
                    <EdgeBar edge={Number(bet.edge) || 0} />
                  </div>

                  {/* Collapsible reasoning */}
                  <CollapsibleText text={String(bet.reasoning ?? "")} t={t} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-5 text-center text-[10px] text-gray-400">
        {t.disclaimer}
      </p>
    </div>
  );
});
