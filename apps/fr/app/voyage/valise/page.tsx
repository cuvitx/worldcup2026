import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Luggage, Shirt, Smartphone, FileText, Flag, Sun, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Que mettre dans sa valise CDM 2026 — Checklist complète | CDM 2026",
  description:
    "Checklist complète pour la Coupe du Monde 2026 : vêtements, tech, documents, équipement supporter. Adapté à la météo US et aux règles des stades FIFA.",
  openGraph: {
    title: "Valise CDM 2026 — La checklist ultime du supporter",
    description: "Ne rien oublier pour la CDM 2026 : notre checklist par catégorie.",
    url: "https://www.cdm2026.fr/voyage/valise",
  },
  alternates: { canonical: "https://www.cdm2026.fr/voyage/valise" },
};

const categories = [
  {
    icon: Shirt,
    titre: "Vêtements",
    items: [
      "Maillot de l'équipe de France (2026 si disponible, sinon 2024)",
      "T-shirts légers en coton / synthétique (juin-juillet = 30-40°C dans le sud US)",
      "Short / bermuda confortable pour les journées match",
      "1 pantalon léger pour les soirées / restaurants climatisés",
      "Sweat ou veste légère (la clim US est très forte !)",
      "K-way compact (averses possibles, surtout à Houston, Miami)",
      "Casquette / bob indispensable contre le soleil",
      "Lunettes de soleil",
      "Baskets confortables (vous marcherez beaucoup dans les stades immenses)",
      "Tongs / sandales pour l'hôtel",
      "Sous-vêtements et chaussettes pour la durée + 2 jours de marge",
      "Maillot de bain (piscines hôtel, plage à Miami/LA)",
    ],
  },
  {
    icon: Smartphone,
    titre: "Tech & électronique",
    items: [
      "Adaptateur prise US (Type A/B — les prises françaises ne rentrent pas !)",
      " Voltage : les USA utilisent 110V/60Hz. Les chargeurs modernes (téléphone, laptop) sont bi-voltage (100-240V). Vérifiez la mention sur votre chargeur. Les sèche-cheveux et fers à lisser européens NE fonctionneront PAS sans convertisseur.",
      "Batterie externe / power bank (10 000+ mAh recommandé)",
      "Câbles de charge (USB-C, Lightning)",
      "eSIM ou carte SIM US prépayée (T-Mobile, AT&T)",
      "Écouteurs / AirPods pour les transports",
      "Appareil photo ou GoPro (optionnel, le smartphone suffit)",
      "Multiprise de voyage compacte (très utile en Airbnb partagé)",
    ],
  },
  {
    icon: FileText,
    titre: "Documents essentiels",
    items: [
      "Passeport biométrique (validité > date de retour)",
      "ESTA approuvé (imprimez une copie papier)",
      "Billets d'avion (numériques + copie papier)",
      "Billets de match FIFA (sur l'app FIFA ou imprimés)",
      "Assurance voyage avec couverture médicale USA (≥ 300 000 €)",
      "Carte bancaire internationale (Visa/Mastercard, idéalement sans frais à l'étranger)",
      "Permis de conduire (si location de voiture prévue)",
      "Copies de tous les documents dans un dossier Google Drive / iCloud",
      "Ordonnances médicales traduites en anglais si nécessaire",
      "Numéros d'urgence : ambassade de France, assurance, banque",
    ],
  },
  {
    icon: Flag,
    titre: "Équipement supporter",
    items: [
      "Écharpe France (les drapeaux sont autorisés mais limités en taille dans les stades)",
      "Drapeau français petit format (80×60 cm max dans les stades FIFA)",
      "Maquillage tricolore / peinture visage",
      "Clap-clap ou tambourin (vérifiez les règles du stade — instruments souvent interdits)",
      "Perruque coq (classique mais encombrant !)",
      "Crème solaire SPF 50 (indispensable, même par temps couvert)",
    ],
  },
];

const interditsStade = [
  "Sacs à dos de plus de 35×25×15 cm (politique « clear bag » dans la plupart des stades US)",
  "Bouteilles d'eau (sauf formats mini < 500ml selon le stade)",
  "Parapluies",
  "Perches à selfie / trépieds",
  "Drapeaux avec manche en métal ou bois (tissu uniquement)",
  "Instruments de musique de grande taille",
  "Fumigènes, pétards, lasers",
  "Nourriture et boissons extérieures",
  "Drones",
];

const faqItems = [
  {
    question: "Faut-il un adaptateur de prise pour les USA ?",
    answer:
      "Oui, obligatoirement. Les prises américaines sont de type A (2 broches plates) ou B (2 plates + 1 ronde). Les prises françaises (type E/F) ne sont pas compatibles. Achetez un adaptateur avant le départ (3-10 € en grande surface).",
  },
  {
    question: "Mon sèche-cheveux français fonctionnera-t-il aux USA ?",
    answer:
      "Non, sauf s'il est bi-voltage (100-240V). La plupart des sèche-cheveux européens fonctionnent en 220V uniquement et risquent de griller sur le 110V américain. Vérifiez l'étiquette. Les hôtels US fournissent généralement un sèche-cheveux.",
  },
  {
    question: "Puis-je apporter un drapeau au stade ?",
    answer:
      "Oui, mais en tissu uniquement et dans une taille raisonnable (environ 80×60 cm). Les drapeaux avec manche en métal ou bois sont interdits. Les grands tifos nécessitent une autorisation préalable de la FIFA.",
  },
  {
    question: "Quelle taille de valise recommandez-vous ?",
    answer:
      "Pour un séjour de 10-14 jours, une valise cabine (55×40×20 cm) + un sac à dos suffit si vous voyagez léger. Pour 2-3 semaines, optez pour une valise soute de 65-70 cm. Prévoyez de la place pour les achats souvenirs !",
  },
];

export default function ValisePageCDM() {
  const breadcrumbItems = [{ label: "Accueil", href: "/" }, { label: "Valise CDM 2026" }];
  
  return (
    <>
<Breadcrumb transparent items={breadcrumbItems} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Préparation voyage
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Que mettre dans sa valise CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            La checklist ultime du supporter français : vêtements, tech, documents et équipement
            pour ne rien oublier.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Météo */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <Sun className="h-7 w-7 text-accent" /> Météo attendue (juin-juillet 2026)
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 prose max-w-none">
            <p>
              La CDM 2026 se déroule en <strong>été nord-américain</strong>. Attendez-vous à des températures
              de <strong>28-38°C</strong> dans le sud (Houston, Dallas, Miami, Mexico) et <strong>22-30°C</strong> dans
              le nord (New York, Toronto, Seattle). La climatisation est omniprésente et souvent très froide :
              un pull léger est indispensable pour les intérieurs. Les averses tropicales sont possibles
              à Houston et Miami (courtes mais intenses). Mexico peut connaître des pluies en fin de journée
              (saison des pluies).
            </p>
          </div>
        </section>

        {/* Checklists par catégorie */}
        {categories.map((cat) => (
          <section key={cat.titre}>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <cat.icon className="h-7 w-7 text-accent" /> {cat.titre}
            </h2>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <ul className="space-y-2">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* Interdits stade */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-500" /> Objets interdits dans les stades
          </h2>
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <ul className="space-y-2">
              {interditsStade.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/voyage/supporter-francais"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Guide supporter français <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/budget"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Budget CDM 2026
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
