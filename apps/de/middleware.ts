import { NextRequest, NextResponse } from "next/server";
import { frenchToGermanSlug } from "./app/slug-redirects";

// Routes where the slug is a single team slug
const SINGLE_SLUG_PREFIXES = [
  "/mannschaft/",
  "/prognose/",
  "/kader/",
  "/meister-wetten/",
];

// Routes where the slug is compound: team1-vs-team2
const COMPOUND_SLUG_PREFIXES = [
  "/spiel/",
  "/prognose-spiel/",
  "/h2h/",
];

/** Translate a single French team slug to German (returns null if no translation needed) */
function translateSlug(slug: string): string | null {
  const german = frenchToGermanSlug[slug];
  return german && german !== slug ? german : null;
}

/** Translate a compound match slug like "mexique-vs-afrique-du-sud" → "mexiko-vs-suedafrika" */
function translateCompoundSlug(slug: string): string | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;

  const left = frenchToGermanSlug[parts[0]!];
  const right = frenchToGermanSlug[parts[1]!];

  // Only redirect if at least one part was translated
  if (!left && !right) return null;

  const newLeft = left ?? parts[0]!;
  const newRight = right ?? parts[1]!;
  const result = `${newLeft}-vs-${newRight}`;

  return result !== slug ? result : null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Trailing slash redirect
  if (pathname !== "/" && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // Lowercase redirect
  const lower = pathname.toLowerCase();
  if (pathname !== lower) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 301);
  }

  // French → German single team slug redirects
  for (const prefix of SINGLE_SLUG_PREFIXES) {
    if (pathname.startsWith(prefix)) {
      const slug = pathname.slice(prefix.length);
      // Only match clean slugs (no further path segments)
      if (slug && !slug.includes("/")) {
        const germanSlug = translateSlug(slug);
        if (germanSlug) {
          const url = request.nextUrl.clone();
          url.pathname = `${prefix}${germanSlug}`;
          return NextResponse.redirect(url, 301);
        }
      }
      break;
    }
  }

  // French → German compound match slug redirects (team1-vs-team2)
  for (const prefix of COMPOUND_SLUG_PREFIXES) {
    if (pathname.startsWith(prefix)) {
      const slug = pathname.slice(prefix.length);
      if (slug && !slug.includes("/")) {
        const germanSlug = translateCompoundSlug(slug);
        if (germanSlug) {
          const url = request.nextUrl.clone();
          url.pathname = `${prefix}${germanSlug}`;
          return NextResponse.redirect(url, 301);
        }
      }
      break;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|.*\\..*).*)" ],
};
