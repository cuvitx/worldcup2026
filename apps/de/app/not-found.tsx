import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seite nicht gefunden -- WM 2026",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[80vh] px-4 py-16 text-center bg-gray-50">
      <h1 className="text-5xl font-extrabold text-primary mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-3">
        Diese Seite wurde nicht gefunden.
      </p>
      <p className="text-gray-400 text-sm mb-10 font-mono">
        Fehler 404 -- Seite nicht gefunden
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full">
        <Link
          href="/"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm shadow-sm hover:border-primary/30 hover:text-primary transition-all"
        >
          Startseite
        </Link>
        <Link
          href="/gruppen"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm shadow-sm hover:border-primary/30 hover:text-primary transition-all"
        >
          Gruppen
        </Link>
        <Link
          href="/mannschaften"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm shadow-sm hover:border-primary/30 hover:text-primary transition-all"
        >
          Mannschaften
        </Link>
        <Link
          href="/spiel/spielplan"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm shadow-sm hover:border-primary/30 hover:text-primary transition-all"
        >
          Spielplan
        </Link>
      </div>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-white hover:bg-primary/90 transition-all text-sm"
      >
        Zurueck zur Startseite
      </Link>
    </div>
  );
}
