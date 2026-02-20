import Link from "next/link";

export interface RelatedLink {
  href: string;
  title: string;
  description: string;
  icon?: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
  variant?: "default" | "compact";
}

export function RelatedLinks({ 
  title = "À voir aussi", 
  links,
  variant = "default" 
}: RelatedLinksProps) {
  if (links.length === 0) return null;

  if (variant === "compact") {
    return (
      <section className="my-8 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-xl">🔗</span>
          {title}
        </h2>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-center gap-2 text-primary dark:text-accent hover:underline"
              >
                {link.icon && <span className="text-lg">{link.icon}</span>}
                <span className="font-medium">{link.title}</span>
                <svg
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="my-12 sm:my-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="text-2xl">🔗</span>
          {title}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-5 hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                {link.icon && (
                  <span className="text-3xl shrink-0">{link.icon}</span>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {link.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary dark:text-accent font-medium mt-2 group-hover:gap-2 transition-all">
                    En savoir plus
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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
