import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About WC 2026: your complete guide for the 2026 World Cup. Predictions, statistics and analysis for all 48 teams.",
};

export default function AboutPage() {
  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">About</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold">About WC 2026</h1>
          <p className="mt-4 text-lg text-gray-300">
            Your complete guide for the first ever 48-team World Cup.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Our Mission
            </h2>
            <p>
              WC 2026 is an independent website dedicated to the 2026 FIFA
              World Cup, taking place from June 11 to July 19, 2026 in the
              United States, Canada and Mexico. Our goal is to provide the most
              comprehensive information and insightful analysis of this
              historic event.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              What We Offer
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Team Profiles</h3>
                <p className="mt-1 text-sm">
                  Detailed analysis of all 48 qualified teams, with squads,
                  statistics and World Cup history.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Predictions</h3>
                <p className="mt-1 text-sm">
                  Predictions based on statistical data and ELO rankings for
                  every match and head-to-head encounter.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Odds Comparison</h3>
                <p className="mt-1 text-sm">
                  Comparison of odds from major licensed bookmakers to help you
                  find the best value.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Practical Guide</h3>
                <p className="mt-1 text-sm">
                  Guides to all 16 host cities and stadiums, with practical
                  information for fans.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Our Methodology
            </h2>
            <p>
              Our analyses are based on statistical data from recognized public
              sources. Our predictions use an algorithmic model combining ELO
              rankings, advanced statistics (xG, possession, recent form) and
              head-to-head history.
            </p>
            <p className="mt-2">
              We strive to be transparent about our methodology and remind
              users that all predictions carry a degree of uncertainty. Our
              predictions do not constitute betting advice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Editorial Independence
            </h2>
            <p>
              WC 2026 is an independent website, not affiliated with FIFA or
              any sports betting operator. Our analyses and predictions are
              produced independently. Affiliate links on the site do not
              influence our editorial content.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              The 2026 World Cup in Numbers
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "48", label: "Teams" },
                { value: "104", label: "Matches" },
                { value: "16", label: "Host Cities" },
                { value: "3", label: "Host Countries" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-gray-50 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Useful Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/legal" className="text-accent hover:underline">
                  Legal
                </Link>
              </li>
              <li>
                <Link href="/responsible-gambling" className="text-accent hover:underline">
                  Responsible Gambling
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
