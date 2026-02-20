import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: "analyse" | "guide" | "portrait" | "actualite" | "pronostic";
  tags: string[];
  image?: string;
  imageEmoji?: string;
  readingTime?: number;
  featured: boolean;
  slug: string;
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllArticles(): ArticleFrontmatter[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const readingTime = data.readingTime ?? calculateReadingTime(content);
    return { ...data, slug, readingTime } as ArticleFrontmatter;
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const readingTime = data.readingTime ?? calculateReadingTime(content);
  const frontmatter = { ...data, slug, readingTime } as ArticleFrontmatter;

  return { frontmatter, content };
}

export function getArticlesByCategory(category: string): ArticleFrontmatter[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getRelatedArticles(
  slug: string,
  limit = 4
): ArticleFrontmatter[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];

  const all = getAllArticles().filter((a) => a.slug !== slug);

  // Score: same category = 2, each shared tag = 1
  const scored = all.map((a) => {
    let score = 0;
    if (a.category === current.frontmatter.category) score += 2;
    const sharedTags = a.tags.filter((t) =>
      current.frontmatter.tags.includes(t)
    );
    score += sharedTags.length;
    return { article: a, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.article);
}

export function getMdxSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
