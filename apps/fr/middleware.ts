import { NextRequest, NextResponse } from "next/server";

const retiredArticlePaths = new Set([
  "/actualites/favoris-coupe-du-monde-2026",
  "/actualites/joueurs-a-suivre-mondial-2026",
  "/actualites/parcours-france-mondial-2026",
  "/actualites/guide-paris-coupe-du-monde-2026",
  "/actualites/guide-stades-mondial-2026",
  "/actualites/bresil-japon-ce-que-le-signal-du-jour-change-pour-le-mondial-2026-20260629-2",
  "/actualites/tchequie-au-mondial-2026-l-analyse-du-signal-du-jour-20260629",
  "/actualites/bresil-allemagne-ce-que-le-signal-du-jour-change-pour-le-mondial-2026-20260629",
  "/actualites/bresil-japon-ce-que-le-signal-du-jour-change-pour-le-mondial-2026-20260629",
  "/actualites/pays-bas-bresil-ce-que-le-signal-du-jour-change-pour-le-mondial-2026-20260629",
  "/actualites/pays-bas-coupe-du-monde-2026-forme-effectif-et-signal-a-surveiller-20260629",
  "/actualites/pays-bas-maroc-ce-que-le-signal-du-jour-change-pour-le-mondial-2026-20260629",
]);

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (retiredArticlePaths.has(pathname)) {
    return new NextResponse("Article retire", {
      status: 410,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex, follow",
      },
    });
  }

  // 1. Trailing slash redirect: /equipes/ → /equipes (except root /)
  if (pathname !== "/" && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // 2. Lowercase redirect: /Equipes → /equipes
  const lower = pathname.toLowerCase();
  if (pathname !== lower) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 301);
  }

  // 3. Admin protection: /admin without ?key=cdm2026-admin-secret → 404
  if (pathname.startsWith("/admin")) {
    const key = request.nextUrl.searchParams.get("key");
    if (key !== "cdm2026-admin-secret") {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next (Next.js internals)
     * - api routes
     * - static files (images, fonts, etc.)
     */
    "/((?!_next|api|favicon\\.ico|.*\\..*).*)",
  ],
};
