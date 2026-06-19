import { NextRequest, NextResponse } from "next/server";
import { deTeamSlugs } from "./app/slug-redirects";

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

  // German team slug → French slug redirect
  const teamMatch = pathname.match(/^\/mannschaft\/([^/]+)$/);
  if (teamMatch && teamMatch[1]) {
    const slug = teamMatch[1];
    if (slug in deTeamSlugs) {
      const url = request.nextUrl.clone();
      url.pathname = `/mannschaft/${deTeamSlugs[slug]}`;
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|.*\\..*).*)" ],
};
