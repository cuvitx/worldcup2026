import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Legal information for WC 2026. Information about the publisher, hosting and terms of use.",
};

export default function LegalPage() {
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
            <li className="text-gray-900 font-medium">Legal</li>
          </ol>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-extrabold">Legal</h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Site Publisher</h2>
            <p>
              This site is published as a personal project for sports
              information purposes. All content is provided for informational
              purposes only.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Hosting</h2>
            <p>
              This site is hosted by Vercel Inc., 440 N Barranca Ave #4133,
              Covina, CA 91723, United States.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Intellectual Property
            </h2>
            <p>
              This site is not affiliated with FIFA or any official World Cup
              organization. Team names, logos and trademarks mentioned belong
              to their respective owners.
            </p>
            <p className="mt-2">
              Statistical data is compiled from public sources for information
              and analysis purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Affiliate Links
            </h2>
            <p>
              This site may contain affiliate links to licensed sports betting
              operators. We may receive a commission if you sign up through
              these links. This does not affect the cost to you and does not
              influence our analyses or predictions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Data Protection
            </h2>
            <p>
              This site does not directly collect any personal data. Third-party
              cookies may be used by our advertising and analytics partners. You
              can configure your browser to refuse cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Limitation of Liability
            </h2>
            <p>
              The predictions and analyses presented on this site are provided
              for informational purposes only and do not constitute betting
              advice. Sports betting carries the risk of financial loss. See
              our{" "}
              <Link
                href="/responsible-gambling"
                className="text-accent hover:underline"
              >
                Responsible Gambling
              </Link>{" "}
              page.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Contact</h2>
            <p>
              For any questions regarding this site, you can contact us by
              email at the address provided on the{" "}
              <Link href="/about" className="text-accent hover:underline">
                About
              </Link>{" "}
              page.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
