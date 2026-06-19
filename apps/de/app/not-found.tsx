import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[80vh] px-4 py-16 text-center bg-gray-50">
      {/* Animierter Ball + Rote Karte */}
      <div className="relative mb-8 flex items-end justify-center gap-6 h-36">
        <div className="flex flex-col items-center" aria-hidden="true">
          <span
            className="text-7xl select-none"
            style={{ animation: "ball-kick 1.1s cubic-bezier(.36,.07,.19,.97) infinite" }}
          >

          </span>
          <div
            className="w-12 h-2 rounded-full bg-black/10 blur-sm mt-1"
            style={{ animation: "ball-shadow 1.1s cubic-bezier(.36,.07,.19,.97) infinite" }}
          />
        </div>

        <div
          className="relative flex-shrink-0 w-16 h-24 rounded-lg shadow-2xl mb-1"
          style={{ animation: "card-wave 1.4s ease-in-out infinite" }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-500 via-red-600 to-red-800 shadow-red-500/40 shadow-xl" />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-2 left-0 right-0 text-center text-white/90 text-[10px] font-black tracking-widest">
            404
          </div>
        </div>
      </div>

      {/* Schiedsrichter-Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
         Rote Karte — Platzverweis
      </div>

      {/* Titel */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
        Diese Seite hat{" "}
        <span className="text-primary">die Rote Karte</span> bekommen!
      </h1>

      {/* Untertitel */}
      <p className="text-gray-500 text-lg max-w-md mb-3">
        Der Schiedsrichter hat diese URL vom Platz gestellt. Sie spielt nicht mehr mit.
      </p>
      <p className="text-gray-400 text-sm mb-10 font-mono">
        Fehler 404 — Seite nicht gefunden
      </p>

      {/* Feldtrenner */}
      <div className="w-full max-w-sm h-1 rounded-full bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-10" />

      {/* Nützliche Links */}
      <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-5">
        Zurück aufs Spielfeld
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full">
        <Link
          href="/"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm shadow-sm hover:border-primary/30 hover:text-primary transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <span className="text-2xl"></span>
          Startseite
        </Link>
        <Link
          href="/gruppen"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm shadow-sm hover:border-primary/30 hover:text-primary transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <span className="text-2xl"></span>
          Gruppen
        </Link>
        <Link
          href="/turnierbaum"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm shadow-sm hover:border-primary/30 hover:text-primary transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <span className="text-2xl"></span>
          Turnierbaum
        </Link>
        <Link
          href="/spiel/spielplan"
          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm shadow-sm hover:border-primary/30 hover:text-primary transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <span className="text-2xl"></span>
          Spielplan
        </Link>
      </div>

      {/* Haupt-CTA */}
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-white hover:bg-primary/90 transition-all hover:-translate-y-0.5 text-sm"
      >
        ← Zurück zur Startseite
      </Link>

      {/* Custom CSS Animationen */}
      <style>{`
        @keyframes ball-kick {
          0%   { transform: translateY(0)    rotate(0deg)   scale(1); }
          20%  { transform: translateY(-40px) rotate(60deg)  scale(1.05); }
          40%  { transform: translateY(0)    rotate(120deg) scale(0.92) scaleY(0.88); }
          55%  { transform: translateY(-16px) rotate(160deg) scale(1.02); }
          70%  { transform: translateY(0)    rotate(200deg) scale(0.96) scaleY(0.94); }
          85%  { transform: translateY(-5px)  rotate(220deg) scale(1); }
          100% { transform: translateY(0)    rotate(240deg) scale(1); }
        }
        @keyframes ball-shadow {
          0%   { transform: scaleX(1);   opacity: 0.25; }
          20%  { transform: scaleX(0.5); opacity: 0.08; }
          40%  { transform: scaleX(1);   opacity: 0.25; }
          55%  { transform: scaleX(0.7); opacity: 0.15; }
          70%  { transform: scaleX(1);   opacity: 0.25; }
          85%  { transform: scaleX(0.85);opacity: 0.20; }
          100% { transform: scaleX(1);   opacity: 0.25; }
        }
        @keyframes card-wave {
          0%, 100% { transform: rotate(10deg)  translateY(0); }
          25%       { transform: rotate(14deg)  translateY(-4px); }
          50%       { transform: rotate(8deg)   translateY(2px); }
          75%       { transform: rotate(12deg)  translateY(-2px); }
        }
      `}</style>
    </div>
  );
}
