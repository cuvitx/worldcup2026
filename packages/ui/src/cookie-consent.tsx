"use client";

import { useState, useEffect } from "react";

const translations = {
  fr: {
    message:
      "Ce site utilise des cookies pour ameliorer votre experience et analyser le trafic.",
    accept: "Accepter",
    decline: "Refuser",
    learnMore: "En savoir plus",
    learnMoreLink: "/mentions-legales",
  },
  en: {
    message:
      "This site uses cookies to improve your experience and analyze traffic.",
    accept: "Accept",
    decline: "Decline",
    learnMore: "Learn more",
    learnMoreLink: "/legal",
  },
  es: {
    message:
      "Este sitio utiliza cookies para mejorar su experiencia y analizar el trafico.",
    accept: "Aceptar",
    decline: "Rechazar",
    learnMore: "Saber mas",
    learnMoreLink: "/aviso-legal",
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
      setVisible(true);
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
    <div className="fixed bottom-0 left-0 right-0 z-[60] py-2 px-4 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-t border-gray-200 dark:border-slate-700 shadow-lg">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
          {t.message}{" "}
          <a
            href={t.learnMoreLink}
            className="underline text-primary dark:text-secondary hover:text-primary/80 dark:hover:text-secondary/80"
          >
            {t.learnMore}
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={handleDecline}
            className="cursor-pointer rounded-lg border border-gray-300 dark:border-slate-600 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 min-h-[44px] min-w-[44px]"
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            className="cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent/90 min-h-[44px] min-w-[44px]"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
