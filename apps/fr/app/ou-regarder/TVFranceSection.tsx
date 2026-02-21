/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

interface TVChannel {
  name: string;
  type: string;
  matches: string;
  details: string;
  logo: string;
  free: boolean;
}

interface TVFranceSectionProps {
  tvFranceDetailed: TVChannel[];
}

// Mapping des logos des chaînes TV (utilise les logos existants)
const tvLogos: Record<string, string> = {
  "TF1": "/images/logos/tf1.png",
  "M6": "/images/logos/m6.png",
  "beIN Sports": "/images/logos/bein.png",
};

export function TVFranceSection({ tvFranceDetailed }: TVFranceSectionProps) {
  return (
    <section id="tv-france" className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        🇫🇷 Droits TV en France — Détail par chaîne
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {tvFranceDetailed.map((ch) => {
          const logoPath = tvLogos[ch.name];
          return (
          <div
            key={ch.name}
            className={`rounded-2xl border p-6 flex flex-col ${
              ch.free
                ? "bg-field/5 border-field/20"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              {logoPath ? (
                <div className="h-10 max-h-10 w-20 flex items-center justify-center">
                  <Image 
                    src={logoPath} 
                    alt={ch.name} 
                    width={80}
                    height={40}
                    className="max-h-10 w-auto object-contain grayscale hover:grayscale-0 transition"
                  />
                </div>
              ) : (
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  {ch.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{ch.name}</h3>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    ch.free
                      ? "bg-field/10 text-field"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {ch.type}
                </span>
              </div>
            </div>
            <p className="text-lg font-bold text-primary mb-2">{ch.matches}</p>
            <p className="text-sm text-gray-600 flex-1">{ch.details}</p>
          </div>
        )})}
      </div>

      <div className="mt-4 p-4 bg-accent/10 border border-accent/30 rounded-xl text-sm text-accent">
        <p className="font-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> Note importante</p>
        <p className="mt-1">
          Les droits TV de TF1 sont encore en cours de finalisation. M6 a confirmé 54 matchs.
          beIN Sports reste le seul diffuseur de l&apos;intégralité (104 matchs). Cette page sera mise à jour dès confirmation officielle.
        </p>
      </div>
    </section>
  );
}
