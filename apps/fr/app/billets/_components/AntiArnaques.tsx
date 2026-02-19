export function AntiArnaques() {
  const tips = [
    { icon: "❌", title: "Sites non officiels", desc: "Méfiez-vous de TOUS les sites autres que fifa.com/tickets. Des centaines de faux sites existent." },
    { icon: "❌", title: "Réseaux sociaux", desc: "Les ventes de billets sur Facebook, Instagram, Twitter sont quasiment toutes des arnaques ou billets volés." },
    { icon: "❌", title: "Revendeurs non officiels", desc: "StubHub, Viagogo et similaires ne sont PAS partenaires officiels FIFA. Les billets peuvent être invalidés." },
    { icon: "✅", title: "Canal officiel unique", desc: "fifa.com/tickets est le SEUL endroit où acheter. Bookmarkez cette URL exacte." },
    { icon: "✅", title: "Revente officielle FIFA", desc: "Si vous devez revendre, utilisez la plateforme officielle de transfert FIFA. Les billets restent valides." },
    { icon: "✅", title: "Vérifiez l'URL", desc: "Assurez-vous que l'URL commence par fifa.com/tickets avec HTTPS. Pas de tirets, variantes ou sous-domaines suspects." },
  ];

  return (
    <section className="bg-red-50 dark:bg-red-900/10 py-12 border-t border-red-100 dark:border-red-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-red-800 dark:text-red-400 mb-2">
          🚨 Conseils pratiques — Éviter les arnaques
        </h2>
        <p className="text-sm text-red-700 dark:text-red-300/80 mb-6">
          La CDM 2026 sera la cible de nombreuses escroqueries. Voici comment vous protéger.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className={`rounded-xl border p-4 ${
                tip.icon === "✅"
                  ? "border-success//30 dark:border-success//20 bg-success//10 dark:bg-success//10"
                  : "border-red-200 dark:border-red-800/50 bg-red-50/50 dark:bg-red-900/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{tip.icon}</span>
                <h3 className={`text-sm font-semibold ${ tip.icon === "✅" ? "text-success dark:text-success" : "text-red-800 dark:text-red-400" }`}>
                  {tip.title}
                </h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{tip.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-red-800 dark:text-red-400 mb-2">
            🛡️ Que faire si vous avez été arnaqué ?
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
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
