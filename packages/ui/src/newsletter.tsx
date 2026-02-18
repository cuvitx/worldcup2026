"use client";

import { useState } from "react";

const translations = {
  fr: {
    title: "Newsletter CDM 2026",
    description: "Recevez nos pronostics et analyses directement dans votre boite mail.",
    placeholder: "Votre email",
    button: "S'inscrire",
    success: "Merci ! Vous serez notifie des prochaines analyses.",
    error: "Veuillez entrer un email valide.",
  },
  en: {
    title: "World Cup 2026 Newsletter",
    description: "Get our predictions and analyses delivered to your inbox.",
    placeholder: "Your email",
    button: "Subscribe",
    success: "Thanks! You'll be notified of upcoming analyses.",
    error: "Please enter a valid email.",
  },
  es: {
    title: "Newsletter Mundial 2026",
    description: "Recibe nuestros pronosticos y analisis directamente en tu correo.",
    placeholder: "Tu email",
    button: "Suscribirse",
    success: "Gracias! Seras notificado de los proximos analisis.",
    error: "Por favor, introduce un email valido.",
  },
};

export function Newsletter({ locale = "fr" }: { locale?: "fr" | "en" | "es" }) {
  const t = translations[locale];
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg bg-field/10 px-4 py-3 text-center text-sm text-field-light">
        {t.success}
      </div>
    );
  }

  return (
    <div className="w-full">
      <h4 className="mb-1 text-sm font-semibold text-white">{t.title}</h4>
      <p className="mb-3 text-xs text-gray-400">{t.description}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(false); }}
          placeholder={t.placeholder}
          className="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/80 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          {t.button}
        </button>
      </form>
      {error && <p className="mt-1 text-xs text-red-400">{t.error}</p>}
    </div>
  );
}
