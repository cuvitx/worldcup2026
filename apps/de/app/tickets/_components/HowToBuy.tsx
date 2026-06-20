import { EXTERNAL_URLS } from "@repo/data/constants";
import { ShoppingCart, Ticket } from "lucide-react"

export function HowToBuy() {
  const steps = [
    {
      step: 1, icon: "", title: "FIFA+-Konto erstellen",
      desc: "Gehen Sie auf FIFA.com und erstellen Sie ein kostenloses FIFA+-Konto. Geben Sie Ihre korrekten Daten ein (diese werden beim Stadioneingang überprüft).",
      tip: "Tipp: Erstellen Sie Ihr Konto lange im Voraus, um von bevorzugtem Zugang zu profitieren.",
    },
    {
      step: 2, icon: "", title: "Für Benachrichtigungen anmelden",
      desc: "Aktivieren Sie E-Mail- und SMS-Benachrichtigungen, um sofort über neue Verkaufsphasen informiert zu werden. Die besten Plätze sind in Minuten vergriffen.",
      tip: "Wichtig: Phase 3 des allgemeinen Verkaufs ist für Frühjahr 2026 geplant.",
    },
    {
      step: 3, icon: "", title: "Spiele auswählen",
      desc: "Durchstöbern Sie den Spielplan auf fifa.com/tickets. Wählen Sie Ihr Spielpaket (Ticket-Package) oder einzelne Spiele je nach Verfügbarkeit.",
      tip: "Multi-Spiel-Pakete oft zu reduzierten Preisen verfügbar.",
    },
    {
      step: 4, icon: "", title: "Am Losverfahren teilnehmen (falls zutreffend)",
      desc: "Für stark nachgefragte Spiele reichen Sie eine Anfrage im Losfenster ein. Die FIFA wählt die Käufer zufällig aus. Es gibt keinen Vorteil, früh einzureichen.",
      tip: "Das Losverfahren ist fair — kein Grund, sich beim Start zu beeilen.",
    },
    {
      step: 5, icon: "", title: "Bezahlen und bestätigen",
      desc: "Wenn ausgewählt (oder als Erster da), schließen Sie die Zahlung per Kreditkarte ab. Das Ticket wird Ihrem FIFA+-Konto zugeordnet. 48 Stunden Zahlungsfrist.",
      tip: "Verwenden Sie eine Karte ohne Fremdwährungsgebühren (USD).",
    },
    {
      step: 6, icon: "", title: "Zugang zum Stadion",
      desc: "Ihre Tickets befinden sich in der FIFA+-App. QR-Code am Eingang zusammen mit einem gültigen Ausweis vorzeigen, der zum Konto passt. Papiertickets sind nicht verfügbar.",
      tip: "Laden Sie die FIFA+-App vor dem Spieltag herunter.",
    },
  ];

  return (
    <section id="so-kaufen" className="bg-white py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          <ShoppingCart className="h-5 w-5 inline-block" /> Auf FIFA.com kaufen — Schritt-für-Schritt-Anleitung
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.step}
              className="rounded-xl border border-gray-200 bg-white p-5 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                  {step.step}
                </div>
                <span className="text-xl">{step.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{step.desc}</p>
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-2.5">
                <p className="text-xs text-primary font-medium"> {step.tip}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href={EXTERNAL_URLS.FIFA_TICKETS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 font-bold text-white text-lg hover:bg-accent/80 hover:-translate-y-0.5 transition-all"
          >
            <Ticket className="h-5 w-5 inline-block" /> Zu fifa.com/tickets →
          </a>
          <p className="mt-2 text-xs text-gray-600">Offizieller FIFA-Link — Einziger garantierter Kaufkanal</p>
        </div>
      </div>
    </section>
  );
}
