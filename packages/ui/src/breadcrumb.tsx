import Link from "next/link";
import { BreadcrumbSchema } from "./breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // Convert items to BreadcrumbSchema format
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: item.href || "",
  }));

  return (
    <>
      {/* Schema.org JSON-LD */}
      <BreadcrumbSchema items={schemaItems} baseUrl={domains.fr} />

      {/* Breadcrumb UI */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              
              return (
                <li key={index} className="flex items-center gap-2">
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-gray-900 dark:text-white font-medium" : ""}>
                      {item.label}
                    </span>
                  )}
                  {!isLast && <span>/</span>}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
