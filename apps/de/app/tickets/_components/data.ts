export const ticketPhases = [
  {
    phase: "Gruppenphase",
    icon: "group",
    dates: "11. Juni – 27. Juni 2026",
    catPrices: [
      { cat: "Kat. 1", price: "60 – 100 USD", desc: "Lokale Fans" },
      { cat: "Kat. 2", price: "100 – 180 USD", desc: "Standard" },
      { cat: "Kat. 3", price: "180 – 350 USD", desc: "Premium" },
      { cat: "Kat. 4", price: "Auf Anfrage", desc: "Hospitality" },
    ],
    note: "Richtpreise für die am wenigsten nachgefragten Gruppenspiele.",
    color: "blue",
  },
  {
    phase: "Achtelfinale (Round of 32)",
    icon: "medal",
    dates: "29. Juni – 4. Juli 2026",
    catPrices: [
      { cat: "Kat. 1", price: "100 – 150 USD", desc: "Lokale Fans" },
      { cat: "Kat. 2", price: "200 – 300 USD", desc: "Standard" },
      { cat: "Kat. 3", price: "350 – 600 USD", desc: "Premium" },
      { cat: "Kat. 4", price: "Auf Anfrage", desc: "Hospitality" },
    ],
    note: "K.-o.-Phase — höhere Preise.",
    color: "green",
  },
  {
    phase: "Viertelfinale",
    icon: "target",
    dates: "6. – 8. Juli 2026",
    catPrices: [
      { cat: "Kat. 1", price: "150 – 250 USD", desc: "Lokale Fans" },
      { cat: "Kat. 2", price: "300 – 500 USD", desc: "Standard" },
      { cat: "Kat. 3", price: "600 – 1 000 USD", desc: "Premium" },
      { cat: "Kat. 4", price: "Auf Anfrage", desc: "Hospitality" },
    ],
    note: "Sehr nachgefragte Spiele — begrenzte Verfügbarkeit.",
    color: "orange",
  },
  {
    phase: "Halbfinale",
    icon: "flame",
    dates: "14. – 15. Juli 2026",
    catPrices: [
      { cat: "Kat. 1", price: "200 – 400 USD", desc: "Lokale Fans" },
      { cat: "Kat. 2", price: "500 – 800 USD", desc: "Standard" },
      { cat: "Kat. 3", price: "900 – 1 500 USD", desc: "Premium" },
      { cat: "Kat. 4", price: "Auf Anfrage", desc: "Hospitality" },
    ],
    note: "Sehr begrenzte Verfügbarkeit, buchen Sie sofort bei Verkaufsstart.",
    color: "purple",
  },
  {
    phase: "Finale",
    icon: "trophy",
    dates: "19. Juli 2026 — MetLife Stadium (NY/NJ)",
    catPrices: [
      { cat: "Kat. 1", price: "300 – 500 USD", desc: "Lokale Fans" },
      { cat: "Kat. 2", price: "700 – 1 100 USD", desc: "Standard" },
      { cat: "Kat. 3", price: "1 200 – 2 500 USD", desc: "Premium" },
      { cat: "Kat. 4", price: "10 000 USD+", desc: "Hospitality VIP" },
    ],
    note: "Das meistumkämpfte Finale der Geschichte — kaufen Sie sofort bei Verkaufsstart.",
    color: "gold",
  },
];

export const salePhases = [
  {
    phase: "Phase 1 — Vorverkauf",
    period: "September – November 2025",
    status: "Beendet",
    statusColor: "gray",
    desc: "Reserviert für FIFA+-Kontoinhaber, die vor September 2025 registriert waren. Losverfahren für die meistgefragten Spiele.",
  },
  {
    phase: "Phase 2 — Allgemeiner Verkauf",
    period: "Dezember 2025 – März 2026",
    status: "Laufend",
    statusColor: "green",
    desc: "Offen für alle auf FIFA.com. Wer zuerst kommt, mahlt zuerst für die meisten Spiele. Losverfahren für stark nachgefragte Spiele.",
  },
  {
    phase: "Phase 3 — Letzte Chance",
    period: "April – Juni 2026",
    status: "Demnächst",
    statusColor: "blue",
    desc: "Resttickets werden schrittweise zum Verkauf angeboten. Ermäßigungen möglich für wenig nachgefragte Gruppenspiele.",
  },
  {
    phase: "Verkauf während des Turniers",
    period: "Juni – Juli 2026",
    status: "Demnächst",
    statusColor: "blue",
    desc: "Rückgegebene Tickets (No-Shows, Rückgaben) werden vor jedem Spiel wieder zum Verkauf angeboten. Sehr begrenzte Verfügbarkeit.",
  },
];

export const ticketCategories = [
  {
    cat: "Kategorie 1",
    emoji: "green",
    target: "Lokale Fans (Einwohner des Gastgeberlandes)",
    desc: "Günstigster Tarif, reserviert für Einwohner der USA, Kanadas und Mexikos. Ein Wohnsitznachweis ist erforderlich.",
    access: "Alle Stadionbereiche außer VIP",
  },
  {
    cat: "Kategorie 2",
    emoji: "🔵",
    target: "Internationales Publikum",
    desc: "Die Standardkategorie für internationale Fans. Bietet ein gutes Preis-Leistungs-Verhältnis, um die Atmosphäre zu genießen.",
    access: "Haupttribüne und Kurven",
  },
  {
    cat: "Kategorie 3",
    emoji: "yellow",
    target: "Premium Standard",
    desc: "Beste Plätze auf der Seitentribüne, bessere Sicht auf das Spielfeld. Teurer, aber verbessertes Erlebnis.",
    access: "Premium-Seitentribünen",
  },
  {
    cat: "Kategorie 4 (Hospitality)",
    emoji: "red",
    target: "Unternehmen & VIP",
    desc: "All-inclusive-Pakete mit Logen, Gourmet-Catering, Parkplatz und persönlichem Empfang. Über FIFA Corporate Hospitality.",
    access: "VIP-Logen, private Suiten",
  },
];

export const faqItems = [
  {
    question: "Wo kann man offizielle Tickets für die WM 2026 kaufen?",
    answer:
      "Die einzigen offiziellen Tickets werden auf FIFA.com (fifa.com/tickets) verkauft. Jede andere Website ist entweder Betrug oder inoffizieller Weiterverkauf. Erstellen Sie kostenlos ein FIFA+-Konto, um Zugang zum Ticketverkauf zu erhalten.",
  },
  {
    question: "Wie viel kosten die Tickets für die WM 2026?",
    answer:
      "Die Preise variieren je nach Phase und Kategorie: Gruppenphase von 60 bis 350 USD (Kat. 1-3), Achtelfinale von 100 bis 600 USD, Halbfinale von 200 bis 1.500 USD, Finale von 300 bis 2.500 USD (ohne Hospitality). Die Preise sind in USD für alle Gastgeberländer.",
  },
  {
    question: "Wie funktioniert das FIFA-Losverfahren?",
    answer:
      "Für stark nachgefragte Spiele (Finale, Halbfinale, Spiele der großen Nationen) veranstaltet die FIFA ein Losverfahren unter den Bewerbungen. Sie reichen Ihre Anfrage innerhalb eines festgelegten Zeitraums ein, dann zieht die FIFA per Los die glücklichen Gewinner, die zur Zahlung übergehen können.",
  },
  {
    question: "Kann man seine WM-2026-Tickets offiziell weiterverkaufen?",
    answer:
      "Ja, die FIFA bietet eine offizielle Ticket-Transfer-Plattform auf FIFA.com an. Dies ist die einzige autorisierte Weiterverkaufsmethode. Inoffizieller Weiterverkauf ist durch die AGB verboten und kann zur Stornierung des Tickets führen.",
  },
  {
    question: "Sind die WM-2026-Tickets namentlich?",
    answer:
      "Ja, die Tickets sind namentlich und an ein FIFA+-Konto gebunden. Beim Stadioneingang kann ein Ausweis verlangt werden. Offizielle Transfers über FIFA.com ermöglichen die Änderung des Inhabernamens.",
  },
  {
    question: "Welche Stadien beherbergen die Spiele mit dem größten Interesse?",
    answer:
      "Das Finale findet im MetLife Stadium (New York/NJ, 82.500 Plätze) statt. Die Halbfinals im AT&T Stadium (Dallas) und MetLife Stadium (New York). Spiele großer Nationen im MetLife (New York), Lincoln Financial Field (Philadelphia) und Gillette Stadium (Boston).",
  },
  {
    question: "Gibt es Pakete mit Tickets + Hotel + Transport?",
    answer:
      "Ja, die FIFA bietet offizielle Pakete über ihre Reisepartner-Agenturen (Tours Operators Program) an. Diese Pakete umfassen Ticket, Hotel und manchmal Transfers. Sie sind teurer, erleichtern aber die Organisation.",
  },
  {
    question: "Wie kann man Betrug bei WM-2026-Tickets vermeiden?",
    answer:
      "Kaufen Sie nur auf FIFA.com oder über die offiziellen TOP-Partneragenturen der FIFA. Seien Sie vorsichtig bei Drittanbieter-Websites, sozialen Netzwerken und Privatpersonen. Tickets, die außerhalb offizieller Kanäle gekauft werden, können von der FIFA storniert werden.",
  },
  {
    question: "Brauchen Kinder ein Ticket für die WM 2026?",
    answer:
      "Kinder unter 2 Jahren (ohne zugewiesenen Sitzplatz) können kostenlos eintreten. Kinder von 3 bis 16 Jahren profitieren in bestimmten Kategorien von ermäßigten Tarifen für Gruppenspiele. Prüfen Sie die Details auf FIFA.com.",
  },
  {
    question: "Wann beginnt der nächste WM-2026-Ticketverkauf?",
    answer:
      "Phase 3 des allgemeinen Verkaufs soll im Frühjahr 2026 eröffnet werden. Melden Sie sich für den FIFA-Newsletter an, um vorrangig benachrichtigt zu werden. Last-Minute-Tickets sind auch kurz vor den Spielen auf FIFA.com verfügbar.",
  },
  {
    question: "Findet die WM 2026 in mehreren verschiedenen Städten statt?",
    answer:
      "Ja! Die WM 2026 findet in 16 Städten in 3 Ländern statt: 11 Städte in den USA (Atlanta, Boston, Dallas, Kansas City, Los Angeles, Miami, New York/NJ, Philadelphia, San Francisco, Seattle), 3 in Kanada (Toronto, Vancouver, Calgary) und 3 in Mexiko (Mexiko-Stadt, Guadalajara, Monterrey).",
  },
  {
    question: "Braucht man ein Visum, um die WM 2026 zu besuchen?",
    answer:
      "Das hängt von Ihrer Staatsangehörigkeit und dem Gastgeberland ab. Deutsche Staatsbürger, die in die USA reisen, müssen eine ESTA-Genehmigung (21 USD, 2 Jahre gültig) beantragen, wenn sie ohne Visum reisen. Für Kanada und Mexiko gelten andere Bedingungen. Die FIFA und die Regierungen der Gastgeberländer haben besondere Einreiseerleichterungen für Inhaber offizieller WM-2026-Tickets eingerichtet. Prüfen Sie die aktuellen Bedingungen auf der Website der zuständigen Botschaft und auf fifa.com.",
  },
];
