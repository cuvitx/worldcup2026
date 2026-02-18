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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 backdrop-blur-sm bg-white/80">
      <div className="mx-auto max-w-7xl rounded-lg bg-white p-4 shadow-lg">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-sm text-gray-700">
            <p>
              {t.message}{" "}
              <a
                href={t.learnMoreLink}
                className="underline text-accent hover:text-accent/80"
              >
                {t.learnMore}
              </a>
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              onClick={handleDecline}
              className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              {t.decline}
            </button>
            <button
              onClick={handleAccept}
              className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
