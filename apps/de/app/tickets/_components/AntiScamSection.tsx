export function AntiScamSection() {
  const tips = [
    { type: "danger" as const, title: "Inoffizielle Websites", desc: "Misstrauen Sie ALLEN Websites außer fifa.com/tickets. Hunderte gefälschte Websites existieren." },
    { type: "danger" as const, title: "Soziale Netzwerke", desc: "Ticketverkäufe auf Facebook, Instagram, Twitter sind fast ausnahmslos Betrug oder gestohlene Tickets." },
    { type: "danger" as const, title: "Inoffizielle Wiederverkäufer", desc: "StubHub, Viagogo und ähnliche sind KEINE offiziellen FIFA-Partner. Tickets können ungültig gemacht werden." },
    { type: "safe" as const, title: "Einziger offizieller Kanal", desc: "fifa.com/tickets ist der EINZIGE Ort zum Kaufen. Setzen Sie ein Lesezeichen für diese URL." },
    { type: "safe" as const, title: "Offizieller FIFA-Weiterverkauf", desc: "Wenn Sie weiterverkaufen müssen, nutzen Sie die offizielle FIFA-Transferplattform. Die Tickets bleiben gültig." },
    { type: "safe" as const, title: "URL überprüfen", desc: "Stellen Sie sicher, dass die URL mit fifa.com/tickets und HTTPS beginnt. Keine Bindestriche, Varianten oder verdächtige Subdomains." },
  ];

  return (
    <section id="anti-arnaques" className="bg-red-50 py-12 border-t border-red-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-red-800 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> Praktische Tipps — Betrug vermeiden
        </h2>
        <p className="text-sm text-red-700 mb-6">
          Die WM 2026 wird Ziel zahlreicher Betrügereien sein. So schützen Sie sich.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className={`rounded-xl border p-4 ${
                tip.type === "safe"
                  ? "border-accent/30 bg-accent/10"
                  : "border-red-200 bg-red-50/50"
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
                <h3 className={`text-sm font-semibold ${tip.type === "safe" ? "text-accent" : "text-red-800"}`}>
                  {tip.title}
                </h3>
              </div>
              <p className="text-sm text-gray-700">{tip.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 text-red-800 mb-2">
             Was tun, wenn Sie betrogen wurden?
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Melden Sie es sofort Ihrer Bank, um die Zahlung zu blockieren (Chargeback)</li>
            <li>• Erstatten Sie Anzeige bei Ihrer örtlichen Polizei</li>
            <li>• Melden Sie die Website bei der <a href="https://www.verbraucherzentrale.de" target="_blank" rel="noopener noreferrer" className="text-primary underline">Verbraucherzentrale</a></li>
            <li>• Kontaktieren Sie die FIFA über fifa.com/contact</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
