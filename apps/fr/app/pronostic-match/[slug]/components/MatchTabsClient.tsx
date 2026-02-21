"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: "pronostic", label: "Pronostic", icon: "" },
  { id: "cotes", label: "Cotes", icon: "" },
  { id: "stats", label: "Stats", icon: "" },
  { id: "h2h", label: "H2H", icon: "" },
  { id: "infos", label: "Infos", icon: "" },
];

interface MatchTabsClientProps {
  children: React.ReactNode[];
  // children[0] = pronostic, [1] = cotes, [2] = stats, [3] = h2h, [4] = infos
}

export function MatchTabsClient({ children }: MatchTabsClientProps) {
  const [activeTab, setActiveTab] = useState("pronostic");
  const tabIndex = TABS.findIndex((t) => t.id === activeTab);
  const content = children[tabIndex] ?? children[0];

  return (
    <div>
      {/* Tab bar */}
      <div className="sticky top-[105px] z-30 bg-whiteslate-900 border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div role="tablist" aria-label="Sections du match" className="flex overflow-x-auto scrollbar-hide gap-0.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-3 sm:py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-primary/20 text-primary"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <span className="text-base" aria-hidden="true">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="animate-fadeIn"
      >
        {content}
      </div>
    </div>
  );
}
