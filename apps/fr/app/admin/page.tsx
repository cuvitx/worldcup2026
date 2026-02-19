"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"

const SECRET = "cdm2026-admin-secret"

const colors = [
  { name: "Primary", hex: "#1a1a2e", tw: "bg-[#1a1a2e]" },
  { name: "Accent Blue", hex: "#0f3460", tw: "bg-[#0f3460]" },
  { name: "Accent Red", hex: "#e94560", tw: "bg-[#e94560]" },
  { name: "Gold", hex: "#f5c518", tw: "bg-[#f5c518]" },
  { name: "Light BG", hex: "#f4f4f5", tw: "bg-[#f4f4f5]" },
  { name: "White", hex: "#ffffff", tw: "bg-white border border-gray-200" },
]

const stats = [
  { label: "Équipes", value: "48", icon: "🏴" },
  { label: "Matchs", value: "104", icon: "⚽" },
  { label: "Stades", value: "16", icon: "🏟️" },
  { label: "Villes", value: "16", icon: "🌆" },
  { label: "Joueurs", value: "966", icon: "👤" },
  { label: "Pages", value: "3073+", icon: "📄" },
]

const links = [
  { name: "GitHub", url: "https://github.com/cuvitx/worldcup2026", icon: "🐙" },
  { name: "Vercel", url: "https://vercel.com", icon: "▲" },
  { name: "Search Console", url: "https://search.google.com/search-console", icon: "🔍" },
  { name: "Mission Control", url: "#", icon: "🚀" },
]

const checklist = [
  { task: "Indexation Google — sitemap soumis", done: true },
  { task: "GA4 — tag installé et vérifié", done: false },
  { task: "Search Console — propriété vérifiée", done: true },
  { task: "Mentions ANJ — conformité validée", done: false },
  { task: "Liens affiliés — tracking OK", done: false },
  { task: "Vercel Pro — upgrade avant lancement", done: false },
  { task: "robots.txt — pages sensibles bloquées", done: true },
  { task: "Meta OG — images et descriptions", done: true },
]

function AdminContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (searchParams.get("key") !== SECRET) {
      router.replace("/")
    } else {
      setAuthorized(true)
    }
  }, [searchParams, router])

  if (!authorized) return null

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-xl px-6 py-4 text-center font-semibold text-yellow-800 dark:text-yellow-200">
          🔒 Page admin — accès restreint
        </div>

        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-space-grotesk)]">
          Dashboard cdm2026.fr
        </h1>

        {/* Brand Book */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🎨 Brand Book</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Palette</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <div key={c.hex} className="flex flex-col items-center gap-1">
                    <div className={`w-14 h-14 rounded-lg ${c.tw}`} />
                    <span className="text-xs font-mono">{c.hex}</span>
                    <span className="text-xs text-gray-500">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Typographie</h3>
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">Space Grotesk</p>
                  <p className="text-sm text-gray-500">Titres & headings</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-2xl">Inter</p>
                  <p className="text-sm text-gray-500">Body text</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📊 Stats du projet</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-300">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Liens utiles */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🔗 Liens utiles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-xl">{l.icon}</span>
                <span className="font-medium">{l.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">✅ Checklist pré-lancement</h2>
          <ul className="space-y-2">
            {checklist.map((item) => (
              <li key={item.task} className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded flex items-center justify-center text-xs ${item.done ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-slate-800 text-gray-400"}`}>
                  {item.done ? "✓" : "○"}
                </span>
                <span className={item.done ? "line-through text-gray-400" : ""}>{item.task}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-gray-500">{checklist.filter((c) => c.done).length}/{checklist.length} complétés</p>
        </section>

        <p className="text-center text-xs text-gray-400 pb-8">Admin interne — ne pas indexer</p>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense>
      <AdminContent />
    </Suspense>
  )
}

