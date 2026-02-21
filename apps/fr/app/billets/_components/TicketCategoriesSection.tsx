import { ticketCategories } from "./data";
import { Users } from "lucide-react"

export function TicketCategoriesSection() {
  return (
    <section id="categories" className="bg-white py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg> Les catégories de billets
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {ticketCategories.map((cat) => (
            <div
              key={cat.cat}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-block w-4 h-4 rounded-full shrink-0 ${cat.emoji === "green" ? "bg-accent" : cat.emoji === "yellow" ? "bg-secondary" : cat.emoji === "red" ? "bg-red-500" : "bg-blue-500"}`} />
                <h3 className="text-lg font-semibold text-gray-900">{cat.cat}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 shrink-0"><Users className="h-5 w-5 inline-block" /></span>
                  <span className="text-gray-700"><strong>Public :</strong> {cat.target}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 shrink-0"></span>
                  <span className="text-gray-700"><strong>Accès :</strong> {cat.access}</span>
                </div>
                <p className="text-gray-600 mt-2 leading-relaxed">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
