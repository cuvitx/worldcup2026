"use client";

import { useState, useEffect } from "react";

const translations = {
  fr: {
    title: "Nous respectons votre vie privée",
    message:
      "Ce site utilise des cookies pour améliorer votre expérience et analyser le trafic. Vous pouvez accepter ou refuser leur utilisation.",
    accept: "Accepter tout",
    decline: "Refuser",
    learnMore: "Politique de confidentialité",
    learnMoreLink: "/politique-de-confidentialite",
  },
  en: {
    title: "We respect your privacy",
    message:
      "This site uses cookies to improve your experience and analyze traffic. You can accept or decline their use.",
    accept: "Accept all",
    decline: "Decline",
    learnMore: "Privacy policy",
    learnMoreLink: "/privacy",
  },
  es: {
    title: "Respetamos tu privacidad",
    message:
      "Este sitio utiliza cookies para mejorar su experiencia y analizar el tráfico. Puede aceptar o rechazar su uso.",
    accept: "Aceptar todo",
    decline: "Rechazar",
    learnMore: "Política de privacidad",
    learnMoreLink: "/politica-de-privacidad",
  },
};

interface CookieConsentProps {
  lang: "fr" | "en" | "es";
}

export function CookieConsent({ lang }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay to avoid layout shift on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "refused");
    setVisible(false);
  };

  if (!visible) return null;

  const t = translations[lang];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 p-4"
      style={{ WebkitBackdropFilter: "blur(4px)", backdropFilter: "blur(4px)", zIndex: 2147483647, WebkitTransform: "translateZ(0)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Consentement cookies"
    >
      <div className="w-full max-w-lg rounded-2xl bg-whiteslate-800 shadow-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            {t.title}
          </h2>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          {t.message}{" "}
          <a
            href={t.learnMoreLink}
            className="underline text-primary hover:opacity-80 transition-opacity"
          >
            {t.learnMore}
          </a>
        </p>

        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={handleDecline}
            className="flex-1 cursor-pointer rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100"
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 cursor-pointer rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white transition-all hover:bg-accent/80 hover:-translate-y-0.5"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
