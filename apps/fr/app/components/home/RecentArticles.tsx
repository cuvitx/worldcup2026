import { SectionHeading } from "@repo/ui/section-heading";
import Link from "next/link";

interface ArticleData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageEmoji: string;
}

interface RecentArticlesProps {
  recentArticles: ArticleData[];
}

const categoryColors: Record<string, string> = {
  stades: "bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary",
  billets: "bg-field/10 text-field dark:bg-field/20 dark:text-field",
  equipes: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-white",
  paris: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary",
  transferts: "bg-[#FF6B35]/15 text-[#FF6B35] dark:bg-[#FF6B35]/10 dark:text-[#FF6B35]",
};

const categoryLabels: Record<string, string> = {
  stades: "Stades",
  billets: "Billets",
  equipes: "Équipes",
  paris: "Paris",
  transferts: "Transferts",
};

export function RecentArticles({ recentArticles }: RecentArticlesProps) {
  return (
    <section className="bg-white dark:bg-gray-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-1.5">
            Actualités
          </p>
          <SectionHeading title="Articles récents" linkHref="/actualites" linkLabel="Toutes les actus →" />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {recentArticles.map((article, i) => (
            <Link
              key={article.id}
              href={`/actualites/${article.slug}`}
              className="group relative flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                <span className="text-6xl opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500">
                  {article.imageEmoji}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {i === 0 && (
                  <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider bg-primary text-white px-2.5 py-1 rounded-full">
                    À la une
                  </span>
                )}
              </div>

              <div className="flex flex-col flex-1 p-5">
                <span
                  className={`self-start text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider ${
                    categoryColors[article.category] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {categoryLabels[article.category] ?? article.category}
                </span>

                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed line-clamp-2 flex-1">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 dark:border-gray-800">
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                    {new Date(article.date + "T00:00:00Z").toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </p>
                  <span className="text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Lire →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
