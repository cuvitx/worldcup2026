import { type NextRequest, NextResponse } from "next/server";
import { getAffiliateTrackingData } from "@repo/data/affiliates";

/**
 * Serves a minimal HTML page containing the GA CPM script.
 * The script uses document.write() which only works during a real page load.
 * Our GABanner component loads this in an iframe.
 */

const GA_SCRIPTS: Record<string, string> = {
  "728x90": "p-ktSu91BxaZGtLk3-JxEMvon63xVw5PV-aEacCuJUA_GA7331V2",
  "300x250": "5xAZxfSvUmYyK6RUdeIFXMu8Q7jUZurFO0x6ZHXlYNY_GA7331V2",
  "370x90": "h4sOPUsxeJjJultZIo9JBOaL1yLFEpxYhrGf7Bv-t6g_GA7331V2",
  "1380x300": "bjjpByzimRUnt8pN84IYmkE-lLcTAeJ2cFZrik5KDsk_GA7331V2",
  "1080x192": "erBtbOD1NpCsXxVY4-DRg3DplRb7MGRy0FkjsvvXK3E_GA7331V2",
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const variant = searchParams.get("v") ?? "";
  const tracking = searchParams.get("t") ?? "";

  const scriptId = GA_SCRIPTS[variant];
  if (!scriptId) {
    return new NextResponse("Invalid variant", { status: 400 });
  }

  const { affVar } = getAffiliateTrackingData(tracking);
  const src = `https://www.gambling-affiliation.com/cpm/v=${scriptId}&aff_var_1=${encodeURIComponent(affVar)}`;

  const html = `<!DOCTYPE html>
<html>
<head>
<style>*{margin:0;padding:0;}body{overflow:hidden;background:transparent;}</style>
</head>
<body>
<script type="text/javascript" charset="utf-8" src="${src}"></script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      // Override restrictive CSP for this iframe page so GA scripts/iframes/clicks work
      "Content-Security-Policy": "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
      "X-Frame-Options": "",
    },
  });
}
