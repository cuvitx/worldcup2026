import type { CountryRecord } from "./palmares-data";

export function PalmaresByCountry({ countryRecords }: { countryRecords: CountryRecord[] }) {
 return (
 <section>
 <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
 Palmarès par pays
 </h2>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 {countryRecords.map((cr, idx) => (
 <div
 key={cr.country}
 className={`rounded-xl border-2 p-5 shadow-sm transition-transform hover:-translate-y-1 ${
 idx === 0
 ? "border-primary bg-primary/5"
 : idx <= 2
 ? "border-gray-300 bg-gray-50/40"
 : "border-gray-200 bg-white"
 }`}
 >
 <div className="flex items-center gap-3 mb-3">
 <span className="text-4xl">{cr.flag}</span>
 <div>
 <div className="font-bold text-lg">{cr.country}</div>
 <div className="text-xs text-gray-500">
 {cr.confederation}
 </div>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-2 text-center">
 <div className="rounded-lg bg-white py-2">
 <div className="text-2xl font-extrabold text-primary">
 {cr.titles}
 </div>
 <div className="text-xs text-gray-500">titre{cr.titles > 1 ? "s" : ""}</div>
 </div>
 <div className="rounded-lg bg-white py-2">
 <div className="text-2xl font-extrabold text-gray-600">
 {cr.finals}
 </div>
 <div className="text-xs text-gray-500">finale{cr.finals > 1 ? "s" : ""}</div>
 </div>
 </div>
 <div className="mt-3 flex flex-wrap gap-1">
 {cr.years.map((y) => (
 <span
 key={y}
 className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
 >
 {y}
 </span>
 ))}
 </div>
 </div>
 ))}
 </div>
 </section>
 );
}
