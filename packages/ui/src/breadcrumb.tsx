import Link from "next/link";
import { BreadcrumbSchema } from "./breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

/**
 * A single breadcrumb item.
 * 
 * @param label - Display text for the breadcrumb
 * @param href - Optional link URL (omit for the current page)
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Props for the Breadcrumb component.
 * 
 * @param items - Array of breadcrumb items (first = homepage, last = current page)
 */
interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb component — Navigation breadcrumb with JSON-LD schema.
 * 
 * Renders a horizontal breadcrumb trail with automatic schema.org BreadcrumbList markup.
 * The last item is styled as current page (non-clickable).
 * 
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: "Accueil", href: "/" },
 *     { label: "Équipes", href: "/equipes" },
 *     { label: "France" } // current page, no href
 *   ]}
 * />
 * ```
 */
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
      <nav className="bg-whiteslate-800 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
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
                    <span className={isLast ? "text-gray-900 font-medium" : ""}>
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
