import Link from "next/link";

export function PalmaresSection2026() {
 return (
 <section className="rounded-2xl bg-gradient-to-br from-primary to-primary text-white p-8 text-center shadow-xl">
 <h2 className="text-2xl font-bold text-accent mb-3">
 Et en 2026 ?
 </h2>
 <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
 La Coupe du Monde 2026 (USA · Canada · Mexique) est la plus grande de l&apos;histoire avec{" "}
 <strong className="text-white">48 équipes</strong> et{" "}
 <strong className="text-white">104 matchs</strong>. Qui écrira la prochaine page ?
 </p>
 <div className="flex flex-wrap justify-center gap-4 mb-8">
 {[
 { flag: "🇧🇷", country: "Brésil", note: "6e titre ?" },
 { flag: "🇦🇷", country: "Argentine", note: "Défend son titre" },
 { flag: "🇫🇷", country: "France", note: "3e titre ?" },
 { flag: "🇩🇪", country: "Allemagne", note: "5e titre ?" },
 { flag: "🇵🇹", country: "Portugal", note: "1er titre ?" },
 { flag: "🇪🇸", country: "Espagne", note: "2e titre ?" },
 ].map(({ flag, country, note }) => (
 <div
 key={country}
 className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 text-center min-w-[100px]"
 >
 <div className="text-3xl">{flag}</div>
 <div className="font-bold text-sm mt-1">{country}</div>
 <div className="text-xs text-white/70 mt-0.5">{note}</div>
 </div>
 ))}
 </div>
 <Link
 href="/pronostic/vainqueur"
 className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-bold px-8 py-4 text-lg hover:bg-gray-100 transition-colors shadow-lg"
 >
 Voir le pronostic vainqueur 2026
 </Link>
 <div className="mt-4">
 <Link
 href="/pronostic"
 className="text-white/70 hover:text-white text-sm underline transition-colors"
 >
 Tous les pronostics →
 </Link>
 </div>
 </section>
 );
}
