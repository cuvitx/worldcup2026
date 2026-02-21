import { Bus } from "lucide-react"
export function TransportSection({ cityName, transport }: { cityName: string; transport: string }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          <Bus className="h-5 w-5 inline-block" /> Se déplacer à {cityName}
        </h2>
        <div className="p-5 rounded-xl bg-gray-50gray-dark border border-gray-100">
          <p className="text-gray-700 leading-relaxed">{transport}</p>
        </div>
      </div>
    </section>
  );
}
