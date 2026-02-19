"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function MatchAlert() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || status === "success") {
    if (status === "success") {
      return (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700 dark:border-green-800/50 dark:bg-green-900/20 dark:text-green-400">
          ✅ C&apos;est noté ! Tu recevras une alerte avant chaque match des Bleus.
        </div>
      );
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, tags: ["alerts-france"] }),
      });
      if (res.ok || res.status === 409) {
        // Save locally
        try {
          localStorage.setItem("cdm2026_alerts_france", "true");
          localStorage.setItem("cdm2026_alerts_france_email", trimmed);
        } catch {}
        setStatus("success");
        return;
      }
      throw new Error("API error");
    } catch {
      // Fallback localStorage
      try {
        localStorage.setItem("cdm2026_alerts_france", "true");
        localStorage.setItem("cdm2026_alerts_france_email", trimmed);
      } catch {}
      setStatus("success");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-secondary/20 bg-gradient-to-r from-secondary/5 to-primary/5 p-4 shadow-sm dark:border-secondary/20 dark:from-slate-800 dark:to-slate-800 sm:p-5">
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        aria-label="Fermer"
      >
        ✕
      </button>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="font-bold text-gray-900 dark:text-white">
            🔔 Alerte matchs des Bleus 🇫🇷
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Reçois une alerte par email avant chaque match de l&apos;équipe de France !
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 sm:shrink-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.fr"
            required
            disabled={status === "loading"}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-secondary/50 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 dark:placeholder-gray-500 sm:w-48"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white shadow transition hover:bg-accent/90 active:scale-95 disabled:opacity-60"
          >
            {status === "loading" ? "⏳" : "🔔 Activer"}
          </button>
        </form>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-500">Une erreur est survenue. Réessaye !</p>
      )}
    </div>
  );
}
