import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Admin — cdm2026.fr",
  alternates: { canonical: "https://www.cdm2026.fr/admin" },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
