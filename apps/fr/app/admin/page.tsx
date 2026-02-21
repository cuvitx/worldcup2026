"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Flag, MapPin, Users, FileText } from "lucide-react"
import { Breadcrumb } from "@repo/ui/breadcrumb";

const SECRET = "cdm2026-admin-secret"

const colors = [
  { name: "Primary", hex: "#022149", tw: "bg-primary" },
  { name: "CTA Primaire", hex: "#00B865", tw: "bg-accent" },
  { name: "Or (Highlight)", hex: "#E8C547", tw: "bg-amber-400" },
  { name: "Success", hex: "#06D6A0", tw: "bg-accent" },
  { name: "Error", hex: "#EF476F", tw: "bg-error" },
]

const statsData = [
  { label: "Équipes", value: "48", Icon: Flag },
  { label: "Matchs", value: "104", Icon: null },
  { label: "Stades", value: "16", Icon: null },
  { label: "Villes", value: "16", Icon: MapPin },
  { label: "Joueurs", value: "966", Icon: Users },
  { label: "Pages", value: "3073+", Icon: FileText },
]

const links = [
  { name: "GitHub", url: "https://github.com/cuvitx/worldcup2026", icon: "" },
  { name: "Vercel", url: "https://vercel.com", icon: "" },
  { name: "Search Console", url: "https://search.google.com/search-console", icon: "" },
  { name: "Mission Control", url: "#", icon: "" },
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
    <>
<Breadcrumb items={[
          {
                    "label": "Accueil",
                    "href": "/"
          },
          {
                    "label": "Admin"
          }
]} />
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-accent/10 dark:bg-accent/10 border border-accent/30 dark:border-accent/20 rounded-xl px-6 py-4 text-center font-semibold text-accent dark:text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Page admin — accès restreint
        </div>

        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-montserrat)]">
          Dashboard cdm2026.fr
        </h1>

        {/* Brand Book */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Brand Book</h2>
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
                  <p className="font-[family-name:var(--font-montserrat)] text-2xl font-bold">Montserrat</p>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Stats du projet</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {statsData.map((s) => (
              <div key={s.label} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 text-center">
                <div className="flex justify-center mb-1">
                  {s.Icon ? <s.Icon className="w-6 h-6" /> : <div className="h-6" />}
                </div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-300">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Liens utiles */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Liens utiles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium">{l.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Checklist pré-lancement</h2>
          <ul className="space-y-2">
            {checklist.map((item) => (
              <li key={item.task} className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded flex items-center justify-center text-xs ${item.done ? "bg-accent/15 dark:bg-accent/10 text-accent dark:text-accent" : "bg-gray-100 dark:bg-slate-800 text-gray-400"}`}>
                  {item.done ? "✓" : "○"}
                </span>
                <span className={item.done ? "line-through text-gray-400" : ""}>{item.task}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-gray-500">{checklist.filter((c) => c.done).length}/{checklist.length} complétés</p>
        </section>

        <p className="text-center text-xs text-gray-500 pb-8">Admin interne — ne pas indexer</p>
      </div>
    </div>
    </>
  )
}

export default function AdminPage() {
  return (
    <Suspense>
      <AdminContent />
    </Suspense>
  )
}

