/**
 * Translations for AI match preview.
 */
const translations = {
  fr: { title: "Analyse du match", verified: "Sources verifiees", factors: "Facteurs decisifs", prediction: "Prediction", bettingAngle: "Angle de pari" },
  en: { title: "Match analysis", verified: "Verified sources", factors: "Key factors", prediction: "Prediction", bettingAngle: "Betting angle" },
  es: { title: "Analisis del partido", verified: "Fuentes verificadas", factors: "Factores clave", prediction: "Prediccion", bettingAngle: "Angulo de apuesta" },
};

/**
 * Props for the AiMatchPreview component.
 * 
 * @param preview - AI-generated match preview text (2-3 paragraphs)
 * @param keyFactors - Array of key deciding factors (max 4)
 * @param prediction - Prediction text
 * @param bettingAngle - Recommended betting angle
 * @param grounded - Whether the analysis is grounded in verified data
 * @param locale - UI language
 */
interface AiMatchPreviewProps {
  preview: string;
  keyFactors: string[];
  prediction: string;
  bettingAngle: string;
  grounded: boolean;
  locale?: "fr" | "en" | "es";
}

/**
 * CheckIcon — Verification checkmark icon.
 */
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill="#00B865" opacity="0.15" />
      <path d="M4 7l2 2 4-4" stroke="#00B865" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FactorIcon({ index }: { index: number }) {
  const colors = ["#2563eb", "#d97706", "#dc2626", "#00B865"];
  const color = colors[index % colors.length] ?? "#6b7280";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill={color} opacity="0.1" />
      <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>
        {index + 1}
      </text>
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="#d97706" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="4" stroke="#d97706" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1.5" fill="#d97706" />
    </svg>
  );
}

/**
 * AiMatchPreview component — AI-generated match preview with key factors and prediction.
 * 
 * @example
 * ```tsx
 * <AiMatchPreview
 *   preview="France possède un avantage technique clair. Le Brésil manque de régularité défensive..."
 *   keyFactors={["Blessure de Neymar", "Forme récente de la France", "Domination au milieu"]}
 *   prediction="France 2-0"
 *   bettingAngle="France -1 handicap asiatique"
 *   grounded={true}
 *   locale="fr"
 * />
 * ```
 */
export function AiMatchPreview({ preview, keyFactors, prediction, bettingAngle, grounded, locale }: AiMatchPreviewProps) {
  const t = translations[locale ?? "fr"];
  // Split long preview into paragraphs (~2-3 sentences each)
  const paragraphs = splitIntoParagraphs(preview);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-label="Analyse IA">
            <rect width="22" height="22" rx="6" fill="#2563eb" opacity="0.1" />
            <path d="M7 11h8M11 7v8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">{t.title}</h2>
        </div>
        {grounded && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/5 px-2.5 py-1 text-xs font-medium text-accent border border-accent/20">
            <CheckIcon />
            {t.verified}
          </span>
        )}
      </div>

      {/* Preview text — split into readable paragraphs */}
      {paragraphs.length > 0 && (
        <div className="mb-5 space-y-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-gray-700">{p}</p>
          ))}
        </div>
      )}

      {/* Key factors — visual cards */}
      {keyFactors.length > 0 && (
        <div className="mb-5">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            {t.factors}
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {keyFactors.map((factor, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 border border-gray-100">
                <FactorIcon index={i} />
                <p className="text-sm text-gray-700 leading-snug">{factor}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom row: prediction + betting angle */}
      <div className="grid gap-3 sm:grid-cols-2">
        {prediction && (
          <div className="rounded-lg bg-primary/5 p-4 border border-primary/10">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary/60">{t.prediction}</p>
            <p className="text-sm font-semibold text-gray-900">{prediction}</p>
          </div>
        )}
        {bettingAngle && (
          <div className="rounded-lg bg-gold/5 p-4 border border-gold/20">
            <div className="mb-1 flex items-center gap-1.5">
              <TargetIcon />
              <p className="text-xs font-bold uppercase tracking-wider text-gold">{t.bettingAngle}</p>
            </div>
            <p className="text-sm text-gray-700">{bettingAngle}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/** Split long text into ~2-3 sentence paragraphs for readability */
function splitIntoParagraphs(text: string): string[] {
  if (!text) return [];
  // Split on existing paragraph breaks first
  const existing = text.split(/\n\n+/).filter(Boolean);
  if (existing.length > 1) return existing;
  // Otherwise split long text every ~2 sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    paragraphs.push(sentences.slice(i, i + 3).join("").trim());
  }
  return paragraphs;
}
