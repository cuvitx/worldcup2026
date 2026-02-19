import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

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
