/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

interface Channel {
  name: string;
  type: string;
  matches: string;
  details: string;
}

interface StreamingLink {
  name: string;
  url: string;
  free: boolean;
  desc: string;
}

interface CountryTV {
  country: string;
  channels: Channel[];
  streaming: StreamingLink[];
}

interface FrancophoneTVSectionProps {
  tvByCountryFrancophone: CountryTV[];
}

// Mapping des logos des chaînes francophones
const channelLogos: Record<string, string> = {
  "RTBF (La Une / La Deux)": "/images/logos/tv/rtbf.svg",
  "RTBF": "/images/logos/tv/rtbf.svg",
  "RTS (RTS 1 / RTS 2)": "/images/logos/tv/rts.svg",
  "RTS": "/images/logos/tv/rts.svg",
  "TVA Sports": "/images/logos/tv/tva.svg",
  "TSN / CTV": "/images/logos/tv/tsn.svg",
  "TSN": "/images/logos/tv/tsn.svg",
};

export function FrancophoneTVSection({ tvByCountryFrancophone }: FrancophoneTVSectionProps) {
  return (
    <section id="tv-francophone" className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="m21 15-3.086-3.086A2 2 0 0 0 16.5 11.5H12"/><path d="m21 3-8.5 8.5"/><path d="M10 17.5A6 6 0 0 1 2.5 10"/><path d="M10 13.5A2 2 0 0 1 7.5 11"/></svg> Droits TV — Belgique, Suisse, Canada
      </h2>

      <div className="space-y-8">
        {tvByCountryFrancophone.map((country) => (
          <div
            key={country.country}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{country.country}</h3>
            </div>
            <div className="p-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3"> Chaînes TV</h4>
                <div className="space-y-3">
                  {country.channels.map((ch) => {
                    const logoPath = channelLogos[ch.name];
                    return (
                    <div key={ch.name} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                      {logoPath ? (
                        <div className="h-8 max-h-8 w-16 flex items-center justify-center shrink-0">
                          <Image 
                            src={logoPath} 
                            alt={ch.name} 
                            width={64}
                            height={32}
                            className="max-h-8 w-auto object-contain grayscale hover:grayscale-0 transition"
                          />
                        </div>
                      ) : (
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs shrink-0">
                          {ch.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-gray-900">{ch.name}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            ch.type.toLowerCase().includes("gratuit")
                              ? "bg-field/10 text-field"
                              : "bg-secondary/10 text-secondary"
                          }`}>{ch.type}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{ch.details}</p>
                        <p className="text-xs font-semibold text-primary mt-1">{ch.matches}</p>
                      </div>
                    </div>
                  )})}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3"> Streaming légal</h4>
                <div className="space-y-3">
                  {country.streaming.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">{s.name}</span>
                          {s.free && (
                            <span className="text-xs font-bold bg-field/10 text-field px-2 py-0.5 rounded-full">Gratuit</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-primary shrink-0 mt-0.5 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
