import { EXTERNAL_URLS } from "@repo/data/constants";

export function CommentAcheter() {
  const steps = [
    {
      step: 1, icon: "👤", title: "Créer un compte FIFA+",
      desc: "Rendez-vous sur FIFA.com et créez un compte FIFA+ gratuit. Renseignez vos informations exactes (elles seront vérifiées à l'entrée du stade).",
      tip: "Conseil : créez votre compte longtemps à l'avance pour bénéficier des accès prioritaires.",
    },
    {
      step: 2, icon: "", title: "S'inscrire aux alertes",
      desc: "Activez les notifications e-mail et SMS pour être averti dès l'ouverture des nouvelles phases de vente. Les meilleures places partent en quelques minutes.",
      tip: "Alerte clé : phase 3 de vente générale prévue printemps 2026.",
    },
    {
      step: 3, icon: "", title: "Choisir ses matchs",
      desc: "Parcourez le calendrier sur fifa.com/tickets. Sélectionnez votre groupe de matchs (ticket package) ou des matchs individuels selon disponibilité.",
      tip: "Packages multi-matchs souvent disponibles à prix réduit.",
    },
    {
      step: 4, icon: "", title: "Participer au tirage (si applicable)",
      desc: "Pour les matchs à forte demande, soumettez une demande dans la fenêtre de tirage. La FIFA sélectionne aléatoirement les acheteurs. Aucun avantage à soumettre tôt.",
      tip: "Le tirage est équitable — pas besoin de se ruer dès l'ouverture.",
    },
    {
      step: 5, icon: "💳", title: "Payer et confirmer",
      desc: "Si sélectionné (ou premier arrivé), finalisez le paiement par carte bancaire. Le billet sera associé à votre compte FIFA+. Délai de 48h pour payer.",
      tip: "Prévoyez une carte sans frais de change (USD).",
    },
    {
      step: 6, icon: "", title: "Accéder au stade",
      desc: "Vos billets sont dans l'application FIFA+. QR code à présenter à l'entrée avec une pièce d'identité valide correspondant au compte. Les billets papier ne sont pas disponibles.",
      tip: "Téléchargez l'app FIFA+ avant le jour du match.",
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🛒 Comment acheter sur FIFA.com — Guide étape par étape
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.step}
              className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                  {step.step}
                </div>
                <span className="text-xl">{step.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{step.desc}</p>
              <div className="rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20 p-2.5">
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
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 font-bold text-white text-lg hover:bg-accent/80 hover:-translate-y-0.5 transition-all"
          >
            🎟 Aller sur fifa.com/tickets →
          </a>
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">Lien officiel FIFA — Seul canal d&apos;achat garanti</p>
        </div>
      </div>
    </section>
  );
}
