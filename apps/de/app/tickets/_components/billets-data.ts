export const ticketPhases = [
  {
    phase: "Gruppenphase",
    icon: "group",
    dates: "11 juin – 27 juin 2026",
    catPrices: [
      { cat: "Cat 1", price: "60 – 100 USD", desc: "Supporters locaux" },
      { cat: "Cat 2", price: "100 – 180 USD", desc: "Standard" },
      { cat: "Cat 3", price: "180 – 350 USD", desc: "Premium" },
      { cat: "Cat 4", price: "Sur devis", desc: "Hospitalité" },
    ],
    note: "Prix indicatifs pour les matchs de groupes les moins demandés.",
    color: "blue",
  },
  {
    phase: "Huitièmes de finale (Round of 32)",
    icon: "medal",
    dates: "29 juin – 4 juillet 2026",
    catPrices: [
      { cat: "Cat 1", price: "100 – 150 USD", desc: "Supporters locaux" },
      { cat: "Cat 2", price: "200 – 300 USD", desc: "Standard" },
      { cat: "Cat 3", price: "350 – 600 USD", desc: "Premium" },
      { cat: "Cat 4", price: "Sur devis", desc: "Hospitalité" },
    ],
    note: "Phase à élimination directe — prix plus élevés.",
    color: "green",
  },
  {
    phase: "Quarts de finale",
    icon: "target",
    dates: "6 – 8 juillet 2026",
    catPrices: [
      { cat: "Cat 1", price: "150 – 250 USD", desc: "Supporters locaux" },
      { cat: "Cat 2", price: "300 – 500 USD", desc: "Standard" },
      { cat: "Cat 3", price: "600 – 1 000 USD", desc: "Premium" },
      { cat: "Cat 4", price: "Sur devis", desc: "Hospitalité" },
    ],
    note: "Matchs très demandés — disponibilité limitée.",
    color: "orange",
  },
  {
    phase: "Halbfinales",
    icon: "flame",
    dates: "14 – 15 juillet 2026",
    catPrices: [
      { cat: "Cat 1", price: "200 – 400 USD", desc: "Supporters locaux" },
      { cat: "Cat 2", price: "500 – 800 USD", desc: "Standard" },
      { cat: "Cat 3", price: "900 – 1 500 USD", desc: "Premium" },
      { cat: "Cat 4", price: "Sur devis", desc: "Hospitalité" },
    ],
    note: "Disponibilité très limitée, réservez dès ouverture.",
    color: "purple",
  },
  {
    phase: "Finale",
    icon: "trophy",
    dates: "19 juillet 2026 — MetLife Stadium (NY/NJ)",
    catPrices: [
      { cat: "Cat 1", price: "300 – 500 USD", desc: "Supporters locaux" },
      { cat: "Cat 2", price: "700 – 1 100 USD", desc: "Standard" },
      { cat: "Cat 3", price: "1 200 – 2 500 USD", desc: "Premium" },
      { cat: "Cat 4", price: "10 000 USD+", desc: "Hospitalité VIP" },
    ],
    note: "La finale la plus disputée de l'histoire — achetez dès ouverture.",
    color: "gold",
  },
];

export const salePhases = [
  {
    phase: "Phase 1 — Vente prioritaire",
    period: "Septembre – Novembre 2025",
    status: "Terminée",
    statusColor: "gray",
    desc: "Réservée aux titulaires de compte FIFA+ créés avant septembre 2025. Tirage au sort pour les matchs les plus demandés.",
  },
  {
    phase: "Phase 2 — Vente générale",
    period: "Décembre 2025 – Mars 2026",
    status: "En cours",
    statusColor: "green",
    desc: "Ouverte à tous sur FIFA.com. Premier arrivé, premier servi pour la majorité des matchs. Tirage pour les matchs à forte demande.",
  },
  {
    phase: "Phase 3 — Dernière chance",
    period: "Avril – Juin 2026",
    status: "À venir",
    statusColor: "blue",
    desc: "Tickets restants mis en vente progressivement. Remises possibles sur matchs de groupes peu demandés.",
  },
  {
    phase: "Vente pendant le tournoi",
    period: "Juin – Juillet 2026",
    status: "À venir",
    statusColor: "blue",
    desc: "Tickets récupérés (no-shows, retours) remis en vente avant chaque match. Disponibilité très limitée.",
  },
];

export const ticketCategories = [
  {
    cat: "Catégorie 1",
    emoji: "green",
    target: "Supporters locaux (résidents du pays hôte)",
    desc: "Tarif le plus abordable, réservé aux résidents américains, canadiens et mexicains. Nécessite une preuve de résidence.",
    access: "Toutes zones du stade sauf VIP",
  },
  {
    cat: "Catégorie 2",
    emoji: "🔵",
    target: "Grand public international",
    desc: "La catégorie standard pour les supporters internationaux. Offre un bon rapport qualité-prix pour profiter de l'ambiance.",
    access: "Tribune principale et virages",
  },
  {
    cat: "Catégorie 3",
    emoji: "yellow",
    target: "Premium standard",
    desc: "Meilleures places en tribune latérale, meilleure visibilité sur le terrain. Plus cher mais expérience améliorée.",
    access: "Tribunes latérales premium",
  },
  {
    cat: "Catégorie 4 (Hospitalité)",
    emoji: "red",
    target: "Entreprises & VIP",
    desc: "Packages all-inclusive avec loges, restauration gastronomique, parking et accueil personnalisé. Via FIFA Corporate Hospitality.",
    access: "Loges VIP, suites privatives",
  },
];

export const faqItems = [
  {
    question: "Où acheter des Tickets officiels pour la CDM 2026 ?",
    answer:
      "Les seuls Tickets officiels sont vendus sur FIFA.com (fifa.com/tickets). Tout autre site est soit une arnaque soit de la revente non officielle. Créez un compte FIFA+ gratuitement pour accéder aux ventes.",
  },
  {
    question: "Combien coûtent les Tickets pour la WM 2026 ?",
    answer:
      "Les prix varient selon la phase et la catégorie : phase de groupes de 60 à 350 USD (Cat 1-3), huitièmes de 100 à 600 USD, demi-finales de 200 à 1 500 USD, finale de 300 à 2 500 USD (hors hospitalité). Les prix sont en USD pour tous les pays hôtes.",
  },
  {
    question: "Comment fonctionne le système de tirage au sort FIFA ?",
    answer:
      "Pour les matchs à forte demande (finales, demi-finales, matchs des grandes nations), la FIFA organise un tirage au sort parmi les demandes. Vous soumettez votre demande dans un délai défini, puis la FIFA tire au sort les heureux gagnants qui peuvent procéder au paiement.",
  },
  {
    question: "Peut-on revendre ses Tickets CDM 2026 officiellement ?",
    answer:
      "Oui, la FIFA propose une plateforme officielle de transfert de Tickets sur FIFA.com. C'est la seule méthode de revente autorisée. La revente non officielle est interdite par les conditions générales et peut entraîner l'annulation du billet.",
  },
  {
    question: "Les Tickets CDM 2026 sont-ils nominatifs ?",
    answer:
      "Oui, les Tickets sont nominatifs et liés à un compte FIFA+. Lors de l'entrée au stade, une pièce d'identité peut être demandée. Les transferts officiels via FIFA.com permettent de changer le nom du détenteur.",
  },
  {
    question: "Quels stades accueillent les matchs à fort intérêt ?",
    answer:
      "La finale aura lieu au MetLife Stadium (New York/NJ, 82 500 places). Les demi-finales au Rose Bowl (Pasadena) et au Azteca (Mexico). Les matchs de France à MetLife (New York), Lincoln Financial Field (Philadelphia) et Gillette Stadium (Boston).",
  },
  {
    question: "Y a-t-il des packages Tickets + hôtel + transport ?",
    answer:
      "Oui, la FIFA propose des packages officiels via ses agences de voyages partenaires (Tours Operators Program). Ces packages incluent billet, hôtel et parfois les transferts. Ils sont plus chers mais facilitent l'organisation.",
  },
  {
    question: "Comment éviter les arnaques de Tickets CDM 2026 ?",
    answer:
      "N'achetez que sur FIFA.com ou via les agences officielles TOP partenaires de la FIFA. Méfiez-vous des sites tiers, réseaux sociaux et particuliers. Les Tickets achetés hors circuits officiels peuvent être annulés par la FIFA.",
  },
  {
    question: "Les enfants ont-ils besoin d'un billet CDM 2026 ?",
    answer:
      "Les enfants de moins de 2 ans (sans siège attribué) peuvent entrer gratuitement. Les enfants de 3 à 16 ans bénéficient de tarifs réduits dans certaines catégories pour les matchs de groupes. Vérifiez les détails sur FIFA.com.",
  },
  {
    question: "Quand ouvrent les prochaines ventes de Tickets CDM 2026 ?",
    answer:
      "La Phase 3 de vente générale devrait ouvrir au printemps 2026. Inscrivez-vous à la newsletter FIFA pour être notifié en priorité. Des Tickets de dernière minute sont aussi disponibles juste avant les matchs sur FIFA.com.",
  },
  {
    question: "La CDM 2026 est-elle dans plusieurs villes différentes ?",
    answer:
      "Oui ! La CDM 2026 se déroule dans 16 villes réparties dans 3 pays : 11 villes aux États-Unis (Atlanta, Boston, Dallas, Kansas City, Los Angeles, Miami, New York/NJ, Philadelphia, San Francisco, Seattle, Toronto — ville canadienne désignée), 3 au Canada (Toronto, Vancouver, Calgary) et 3 au Mexique (Mexico, Guadalajara, Monterrey).",
  },
  {
    question: "Faut-il un visa pour assister à la CDM 2026 ?",
    answer:
      "Cela dépend de votre nationalité et du pays hôte où vous vous rendez. Les ressortissants français voyageant aux États-Unis doivent obtenir une autorisation ESTA (14 USD, valable 2 ans) s'ils voyagent sans visa. Pour le Canada et le Mexique, d'autres conditions s'appliquent. La FIFA et les gouvernements des pays hôtes ont mis en place des facilités d'entrée spéciales pour les détenteurs de Tickets officiels CDM 2026. Vérifiez les conditions actuelles sur le site de l'ambassade du pays concerné et sur fifa.com.",
  },
];
