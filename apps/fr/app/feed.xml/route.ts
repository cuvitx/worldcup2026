import { newsArticles } from "@repo/data/news";
import { domains } from "@repo/data/route-mapping";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = domains.fr;

  const items = newsArticles
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 20)
    .map(
      (article) => `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/actualites/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/actualites/${article.slug}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${article.category}</category>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CDM 2026 - Actualités Coupe du Monde</title>
    <link>${siteUrl}</link>
    <description>Toute l'actualité de la Coupe du Monde 2026 : équipes, matchs, stades et pronostics.</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
