"use client";

import { useState } from "react";

/* ── Types ─────────────────────────────────────────────────────────────────── */

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

export interface NewsletterProps {
  /** 'banner' = full-width section, 'card' = compact widget, 'footer' = minimal (footer) */
  variant?: "banner" | "card" | "footer";
  locale?: "fr" | "en" | "es";
  /** Extra Brevo tags, e.g. ["alerts-france"] */
  tags?: string[];
  className?: string;
}

/* ── i18n ──────────────────────────────────────────────────────────────────── */

const t = {
  fr: {
    title: "Newsletter CDM 2026",
    subtitle: "Recevez nos pronostics et analyses directement dans votre boîte mail.",
    bannerTitle: "Recevez nos pronostics par email",
    bannerSubtitle: "Programme de la semaine · Pronostics exclusifs · Alertes matchs · Meilleures cotes",
    placeholder: "votre@email.fr",
    button: "S'inscrire",
    bannerButton: "S'abonner →",
    success: "Inscription réussie !",
    successDetail: "Vous recevrez nos pronostics chaque semaine.",
    duplicate: "Déjà inscrit(e) !",
    error: "Email invalide.",
    apiError: "Une erreur est survenue. Réessayez plus tard.",
    free: "Gratuit",
    noSpam: "Sans spam",
    weekly: "1×/semaine",
    seeExample: "Voir un exemple",
  },
  en: {
    title: "World Cup 2026 Newsletter",
    subtitle: "Get our predictions and analyses delivered to your inbox.",
    bannerTitle: "Get our predictions by email",
    bannerSubtitle: "Weekly schedule · Exclusive predictions · Match alerts · Best odds",
    placeholder: "your@email.com",
    button: "Subscribe",
    bannerButton: "Subscribe →",
    success: "Successfully subscribed!",
    successDetail: "You'll receive our weekly predictions.",
    duplicate: "Already subscribed!",
    error: "Invalid email.",
    apiError: "An error occurred. Please try again.",
    free: "Free",
    noSpam: "No spam",
    weekly: "1×/week",
    seeExample: "See an example",
  },
  es: {
    title: "Newsletter Mundial 2026",
    subtitle: "Recibe nuestros pronósticos y análisis directamente en tu correo.",
    bannerTitle: "Recibe nuestros pronósticos por email",
    bannerSubtitle: "Programa semanal · Pronósticos exclusivos · Alertas de partidos · Mejores cuotas",
    placeholder: "tu@email.com",
    button: "Suscribirse",
    bannerButton: "Suscribirse →",
    success: "¡Inscripción exitosa!",
    successDetail: "Recibirás nuestros pronósticos cada semana.",
    duplicate: "¡Ya estás inscrito!",
    error: "Email inválido.",
    apiError: "Ocurrió un error. Inténtalo más tarde.",
    free: "Gratis",
    noSpam: "Sin spam",
    weekly: "1×/semana",
    seeExample: "Ver un ejemplo",
  },
};

/* ── Helpers ───────────────────────────────────────────────────────────────── */

function saveToLocalStorage(email: string) {
  try {
    const stored = JSON.parse(localStorage.getItem("cdm2026_newsletter") ?? "[]") as string[];
    if (!stored.includes(email)) stored.push(email);
    localStorage.setItem("cdm2026_newsletter", JSON.stringify(stored));
    localStorage.setItem("cdm2026_newsletter_date", new Date().toISOString());
  } catch {
    /* noop */
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Hook ──────────────────────────────────────────────────────────────────── */

function useNewsletter(tags?: string[]) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const reset = () => { setStatus("idle"); setErrorMsg(""); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setErrorMsg("");
      return;
    }

    setStatus("loading");
    try {
      const body: Record<string, unknown> = { email: trimmed };
      if (tags?.length) body.tags = tags;
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 409) {
        saveToLocalStorage(trimmed);
        setStatus("duplicate");
        return;
      }
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? "API error");

      saveToLocalStorage(trimmed);
      setStatus("success");
      setEmail("");
      return;
    } catch (err) {
      console.warn("[newsletter] API failed, localStorage fallback:", err);
    }

    // Fallback localStorage
    try {
      const stored = JSON.parse(localStorage.getItem("cdm2026_newsletter") ?? "[]") as string[];
      if (stored.includes(trimmed)) { setStatus("duplicate"); return; }
      saveToLocalStorage(trimmed);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("api");
    }
  };

  return { email, setEmail, status, errorMsg, reset, handleSubmit };
}

/* ── Component ─────────────────────────────────────────────────────────────── */

export function Newsletter({
  variant = "footer",
  locale = "fr",
  tags,
  className = "",
}: NewsletterProps) {
  const l = t[locale];
  const { email, setEmail, status, errorMsg, reset, handleSubmit } = useNewsletter(tags);

  /* ── SUCCESS ── */
  if (status === "success") {
    if (variant === "footer") {
      return (
        <div className={`rounded-lg bg-field/10 px-4 py-3 text-center text-sm text-field-light ${className}`}>
          {l.success}
        </div>
      );
    }
    return (
      <div className={`rounded-2xl border border-success//30 dark:border-success//20 bg-success//10 dark:bg-success//10 p-5 flex items-center gap-4 ${className}`}>
        <span className="text-3xl shrink-0">✅</span>
        <div>
          <p className="font-bold text-success dark:text-success">{l.success}</p>
          <p className="text-sm text-success dark:text-success//80 mt-0.5">{l.successDetail}</p>
        </div>
      </div>
    );
  }

  /* ── FOOTER VARIANT (minimal) ── */
  if (variant === "footer") {
    return (
      <div className={`w-full ${className}`}>
        <h4 className="mb-1 text-sm font-semibold text-white">{l.title}</h4>
        <p className="mb-3 text-xs text-gray-400">{l.subtitle}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); reset(); }}
            placeholder={l.placeholder}
            className="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/80 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-60"
          >
            {status === "loading" ? "⏳" : l.button}
          </button>
        </form>
        {status === "error" && <p className="mt-1 text-xs text-red-400">{l.error}</p>}
        {status === "duplicate" && <p className="mt-1 text-xs text-accent">{l.duplicate}</p>}
      </div>
    );
  }

  /* ── CARD VARIANT ── */
  if (variant === "card") {
    return (
      <div className={`rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm p-5 ${className}`}>
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl shrink-0">📧</span>
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-sm leading-snug">{l.bannerTitle}</p>
            <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">{l.bannerSubtitle}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); reset(); }}
            placeholder={l.placeholder}
            aria-label={l.placeholder}
            required
            disabled={status === "loading"}
            className="flex-1 min-w-0 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-primary/20 dark:focus:border-primary/20 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-lg bg-accent px-3 py-2 text-sm font-bold text-white hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-wait"
          >
            {status === "loading" ? "⏳" : "OK"}
          </button>
        </form>
        {status === "error" && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errorMsg === "api" ? l.apiError : l.error}</p>}
        {status === "duplicate" && <p className="mt-1.5 text-xs text-accent dark:text-accent">{l.duplicate}</p>}
      </div>
    );
  }

  /* ── BANNER VARIANT (default) ── */
  return (
    <section
      className={`border-t border-gray-100 dark:border-gray-800 ${className}`}
      style={{ background: "linear-gradient(160deg, #0D3B66 0%, #0F1923 50%, #0D3B66 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-2xl">📧</span>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                {l.title}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{l.bannerTitle}</h2>
            <p className="text-sm text-gray-300 leading-relaxed">{l.bannerSubtitle}</p>
            <div className="mt-3 flex flex-wrap gap-3 justify-center md:justify-start">
              {[`✅ ${l.free}`, `🚫 ${l.noSpam}`, `📅 ${l.weekly}`].map((tag) => (
                <span key={tag} className="text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full md:w-auto md:min-w-[360px]">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); reset(); }}
                placeholder={l.placeholder}
                aria-label={l.placeholder}
                required
                disabled={status === "loading"}
                className={`flex-1 rounded-xl border bg-white/10 dark:bg-white/5 backdrop-blur-sm px-4 py-3 text-white placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-primary/50 disabled:opacity-60 ${
                  status === "error" || status === "duplicate"
                    ? "border-red-400/50"
                    : "border-white/20 focus:border-primary/20"
                }`}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="shrink-0 rounded-xl bg-accent px-5 py-3 font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-wait"
              >
                {status === "loading" ? "⏳" : l.bannerButton}
              </button>
            </form>
            {status === "error" && (
              <p className="mt-2 text-xs text-red-400">⚠️ {errorMsg === "api" ? l.apiError : l.error}</p>
            )}
            {status === "duplicate" && (
              <p className="mt-2 text-xs text-accent">📬 {l.duplicate}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
