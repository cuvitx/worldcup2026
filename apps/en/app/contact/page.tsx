import type { Metadata } from "next";
import Link from "next/link";
import { domains, getStaticAlternates } from "@repo/data/route-mapping";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact the WC 2026 team. For any questions about our website, content or partnerships.",
  alternates: getStaticAlternates("contact", "en"),
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        baseUrl={domains.en}
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900">Contact</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary py-12 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-300">
            Have a question, suggestion or partnership inquiry? Get in touch
            with us.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Get in touch
            </h2>
            <p>
              For any questions about our website, content or analysis, you can
              reach us at the following email address:
            </p>
            <p className="mt-4">
              <a
                href="mailto:contact@worldcup2026guide.com"
                className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 font-semibold text-primary hover:bg-primary/20"
              >
                contact@worldcup2026guide.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              About this website
            </h2>
            <p>
              WC 2026 is an independent informational website dedicated to the
              FIFA World Cup 2026. We provide predictions, statistical analysis,
              odds comparisons and practical guides for supporters.
            </p>
            <p className="mt-2">
              This website is not affiliated with FIFA or any sports betting
              operator. Our content is informational and does not constitute
              betting advice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Responsible gambling
            </h2>
            <p>
              If you choose to bet, please do so responsibly. Gambling involves
              risks. Visit our dedicated page for more information.
            </p>
            <p className="mt-4">
              <Link
                href="/responsible-gambling"
                className="text-accent font-medium hover:underline"
              >
                Visit our Responsible Gambling page
              </Link>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Useful links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-accent hover:underline"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="text-accent hover:underline"
                >
                  Legal notice
                </Link>
              </li>
              <li>
                <Link
                  href="/responsible-gambling"
                  className="text-accent hover:underline"
                >
                  Responsible gambling
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
