import { newsArticles } from "@repo/data/news";
import { domains } from "@repo/data/route-mapping";

export const dynamic = "force-static";
export const revalidate = 3600; // 1h

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
  const baseUrl = domains.fr;
  const feedUrl = `${baseUrl}/feed.xml`;
  const now = new Date().toUTCString();

  const items = newsArticles
    .slice(0, 20)
    .map((article) => {
      const url = `${baseUrl}/actualites/${article.slug}`;
      const pubDate = new Date(article.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(article.category)}</category>
      ${article.tags.map((t) => `<tag>${escapeXml(t)}</tag>`).join("\n      ")}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>CDM 2026 - Actualités Coupe du Monde</title>
    <link>${escapeXml(baseUrl)}</link>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
    <description>Toutes les actualités de la Coupe du Monde 2026 : stades, équipes, billets, paris sportifs.</description>
    <language>fr-FR</language>
    <lastBuildDate>${now}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${escapeXml(baseUrl)}/images/og-default.png</url>
      <title>CDM 2026 - Actualités Coupe du Monde</title>
      <link>${escapeXml(baseUrl)}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
