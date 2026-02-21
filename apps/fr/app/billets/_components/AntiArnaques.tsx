export function AntiArnaques() {
  const tips = [
    { type: "danger" as const, title: "Sites non officiels", desc: "Méfiez-vous de TOUS les sites autres que fifa.com/tickets. Des centaines de faux sites existent." },
    { type: "danger" as const, title: "Réseaux sociaux", desc: "Les ventes de billets sur Facebook, Instagram, Twitter sont quasiment toutes des arnaques ou billets volés." },
    { type: "danger" as const, title: "Revendeurs non officiels", desc: "StubHub, Viagogo et similaires ne sont PAS partenaires officiels FIFA. Les billets peuvent être invalidés." },
    { type: "safe" as const, title: "Canal officiel unique", desc: "fifa.com/tickets est le SEUL endroit où acheter. Bookmarkez cette URL exacte." },
    { type: "safe" as const, title: "Revente officielle FIFA", desc: "Si vous devez revendre, utilisez la plateforme officielle de transfert FIFA. Les billets restent valides." },
    { type: "safe" as const, title: "Vérifiez l'URL", desc: "Assurez-vous que l'URL commence par fifa.com/tickets avec HTTPS. Pas de tirets, variantes ou sous-domaines suspects." },
  ];

  return (
    <section className="bg-red-50red-900/10 py-12 border-t border-red-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-red-800 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> Conseils pratiques — Éviter les arnaques
        </h2>
        <p className="text-sm text-red-700 mb-6">
          La CDM 2026 sera la cible de nombreuses escroqueries. Voici comment vous protéger.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className={`rounded-xl border p-4 ${
                tip.type === "safe"
                  ? "border-accent/30 bg-accent/10accent/10"
                  : "border-red-200 bg-red-50/50red-900/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">
                  {tip.type === "safe" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0 text-accent"><path d="M20 6 9 17l-5-5"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0 text-red-600"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  )}
                </span>
                <h3 className={`text-sm font-semibold ${ tip.type === "safe" ? "text-accent" : "text-red-800" }`}>
                  {tip.title}
                </h3>
              </div>
              <p className="text-sm text-gray-700">{tip.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 text-red-800 mb-2">
             Que faire si vous avez été arnaqué ?
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Signalez immédiatement à votre banque pour bloquer le paiement (chargeback)</li>
            <li>• Déposez plainte auprès de votre service de police local</li>
            <li>• Signalez le site sur <a href="https://www.signal-spam.fr" target="_blank" rel="noopener noreferrer" className="text-primary underline">Signal-Spam</a> (France)</li>
            <li>• Contactez la FIFA via fifa.com/contact</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
