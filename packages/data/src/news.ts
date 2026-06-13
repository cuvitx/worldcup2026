export type NewsCategory = "transferts" | "stades" | "billets" | "equipes" | "paris";

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: NewsCategory;
  tags: string[];
  imageEmoji: string;
}

export const newsArticles: NewsArticle[] = [];

export const newsCategories: Record<NewsCategory, string> = {
  transferts: "Transferts",
  stades: "Stades",
  billets: "Billets",
  equipes: "Équipes",
  paris: "Paris sportifs",
};

export const newsBySlug = Object.fromEntries(
  newsArticles.map((a) => [a.slug, a])
);

export const newsByCategory: Record<string, NewsArticle[]> = newsArticles.reduce<Record<string, NewsArticle[]>>((acc, a) => {
  (acc[a.category] ??= []).push(a);
  return acc;
}, {});
