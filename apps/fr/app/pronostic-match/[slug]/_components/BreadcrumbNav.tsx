import Link from "next/link";

interface BreadcrumbNavProps {
  homeName: string;
  awayName: string;
}

export function BreadcrumbNav({ homeName, awayName }: BreadcrumbNavProps) {
  return (
    <nav className="bg-whiteslate-900 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
        <ol className="flex items-center gap-2 text-xs text-gray-500 flex-wrap min-w-0">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li>
            <Link href="/match/calendrier" className="hover:text-primary transition-colors">
              Calendrier
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li className="text-gray-900 font-medium truncate">
            {homeName} vs {awayName}
          </li>
        </ol>
      </div>
    </nav>
  );
}
