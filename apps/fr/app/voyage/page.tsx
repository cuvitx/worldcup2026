import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck, PlaneTakeoff, ShieldCheck, Smartphone, Hotel, Shield, Wifi, Wine, Clock, Heart, User, Luggage } from "lucide-react";

export const metadata: Metadata = {
  title: "Guide voyage CDM 2026 — Préparer son séjour USA, Mexique, Canada",
  description: "Tout pour préparer votre voyage à la Coupe du Monde 2026 : visa, vols, hébergement, budget, sécurité, carte SIM, décalage horaire.",
};

const sections = [
  {
    title: "Formalités & Visas",
    links: [
      { href: "/voyage/esta-visa-usa", label: "ESTA / Visa USA", icon: FileCheck, desc: "Procédure ESTA, délais, coût" },
      { href: "/voyage/visa-mexique", label: "Visa Mexique", icon: FileCheck, desc: "Formalités d'entrée au Mexique" },
      { href: "/voyage/formalites-canada", label: "Formalités Canada", icon: FileCheck, desc: "AVE et documents nécessaires" },
    ],
  },
  {
    title: "Préparer le voyage",
    links: [
      { href: "/voyage/vols-budget", label: "Vols & budget", icon: PlaneTakeoff, desc: "Comparateur vols, estimation budget" },
      { href: "/voyage/assurance", label: "Assurance voyage", icon: ShieldCheck, desc: "Quelle assurance choisir ?" },
      { href: "/voyage/carte-sim", label: "Carte SIM", icon: Smartphone, desc: "Rester connecté sur place" },
      { href: "/voyage/valise", label: "Valise", icon: Luggage, desc: "Checklist pour ne rien oublier" },
      { href: "/voyage/decalage-horaire", label: "Décalage horaire", icon: Clock, desc: "Horaires par ville hôte" },
    ],
  },
  {
    title: "Sur place",
    links: [
      { href: "/voyage/hebergement", label: "Hébergement", icon: Hotel, desc: "Où dormir par ville" },
      { href: "/voyage/securite", label: "Sécurité", icon: Shield, desc: "Conseils sécurité par ville" },
      { href: "/voyage/wifi-stades", label: "WiFi stades", icon: Wifi, desc: "Connexion dans les stades" },
      { href: "/voyage/alcool-stades", label: "Alcool stades", icon: Wine, desc: "Règles alcool dans les stades" },
      { href: "/voyage/pourboires", label: "Pourboires", icon: Heart, desc: "Usage des tips aux USA" },
      { href: "/voyage/supporter-francais", label: "Supporter français", icon: User, desc: "Guide pour les fans français" },
    ],
  },
];

export default function VoyagePage() {
  return (
    <>
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold">Guide voyage CDM 2026</h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
            Tout pour préparer votre séjour aux États-Unis, au Mexique et au Canada.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                    <Icon className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">{link.label}</div>
                      <div className="text-sm text-gray-500">{link.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
