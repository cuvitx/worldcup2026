/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

interface Broadcaster {
  flag: string;
  country: string;
  channels: string;
  details: string;
  free: string;
}

interface InternationalBroadcastersProps {
  internationalBroadcasters: Broadcaster[];
}

// Mapping des logos par pays
const countryLogos: Record<string, string[]> = {
  "États-Unis": ["/images/logos/tv/fox.svg", "/images/logos/tv/telemundo.svg"],
  "Royaume-Uni": ["/images/logos/tv/bbc.svg", "/images/logos/tv/itv.svg"],
  "Allemagne": ["/images/logos/tv/ard.svg", "/images/logos/tv/zdf.svg"],
  "Espagne": ["/images/logos/tv/rtve.svg"],
  "Italie": ["/images/logos/tv/rai.svg"],
  "Brésil": ["/images/logos/tv/globo.svg"],
  "Mexique": ["/images/logos/tv/televisa.svg", "/images/logos/tv/azteca.svg"],
};

export function InternationalBroadcasters({ internationalBroadcasters }: InternationalBroadcastersProps) {
  return (
    <section id="diffuseurs-internationaux" className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
         Diffuseurs internationaux
      </h2>

      {/* Mobile: cards */}
      <div className="md:hidden space-y-3">
        {internationalBroadcasters.map((b) => {
          const logos = countryLogos[b.country] || [];
          return (
          <div key={b.country} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{b.flag}</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">{b.country}</span>
            </div>
            {logos.length > 0 && (
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {logos.map((logo, idx) => (
                  <div key={idx} className="h-6 max-h-6 flex items-center">
                    <Image 
                      src={logo} 
                      alt={`Logo diffuseur ${b.country}`} 
                      width={60}
                      height={24}
                      className="max-h-6 w-auto object-contain grayscale hover:grayscale-0 transition"
                    />
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm font-semibold text-primary dark:text-secondary mb-1">{b.channels}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{b.details}</p>
            <span className="text-xs font-semibold bg-field/10 dark:bg-field/20 text-field dark:text-field px-2 py-0.5 rounded-full">
              Gratuit : {b.free}
            </span>
          </div>
        )})}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="w-full text-sm bg-white dark:bg-slate-800">
          <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Logo</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Pays</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Chaînes / Diffuseurs</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Détails</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Accès gratuit</th>
            </tr>
          </thead>
          <tbody>
            {internationalBroadcasters.map((b) => {
              const logos = countryLogos[b.country] || [];
              return (
              <tr key={b.country} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {logos.length > 0 ? (
                      logos.map((logo, idx) => (
                        <div key={idx} className="h-8 max-h-8 flex items-center">
                          <Image 
                            src={logo} 
                            alt={`Logo diffuseur ${b.country}`} 
                            width={80}
                            height={32}
                            className="max-h-8 w-auto object-contain grayscale hover:grayscale-0 transition"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
                        {b.flag}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  {b.flag} {b.country}
                </td>
                <td className="px-4 py-3 font-semibold text-primary dark:text-secondary">{b.channels}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{b.details}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-semibold bg-field/10 dark:bg-field/20 text-field dark:text-field px-2 py-1 rounded-full">
                    {b.free}
                  </span>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </section>
  );
}
