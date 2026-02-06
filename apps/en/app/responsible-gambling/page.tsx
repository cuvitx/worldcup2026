import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Responsible Gambling - Sports Betting",
  description:
    "Information about responsible gambling and sports betting. Tips for betting responsibly during the 2026 World Cup.",
};

export default function ResponsibleGamblingPage() {
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
            <li className="text-gray-900 font-medium">Responsible Gambling</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-extrabold">Responsible Gambling</h1>
          <p className="mt-4 text-lg text-gray-300">
            Sports betting should remain entertainment. Please gamble
            responsibly.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div className="rounded-lg border-2 border-accent/30 bg-accent/5 p-6">
            <p className="text-lg font-bold text-accent">
              Gambling can be dangerous: financial losses, family conflicts,
              addiction. If you or someone you know has a gambling problem,
              help is available. Call 1-800-522-4700 (US) or visit
              BeGambleAware.org (UK).
            </p>
          </div>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Our Commitments
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                We do not target minors. Sports betting is prohibited for
                persons under the age of 18 (or 21 in some jurisdictions).
              </li>
              <li>
                Our predictions are provided for informational purposes and do
                not guarantee any winnings.
              </li>
              <li>
                We only recommend licensed and regulated betting operators.
              </li>
              <li>
                We encourage moderate and responsible gambling practices.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Tips for Gambling Responsibly
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Set a budget",
                  text: "Decide in advance how much you can afford to lose. Never exceed this budget.",
                },
                {
                  title: "Don't chase your losses",
                  text: "If you lose, don't try to recover your losses by betting more.",
                },
                {
                  title: "Set time limits",
                  text: "Gambling should not interfere with your daily life, work or relationships.",
                },
                {
                  title: "Don't gamble under the influence",
                  text: "Don't bet while under the influence of alcohol, medication or emotional stress.",
                },
                {
                  title: "Stay informed",
                  text: "Understand the odds and probabilities. A prediction is never a certainty.",
                },
                {
                  title: "Ask for help",
                  text: "If you feel you are losing control, don't hesitate to seek help.",
                },
              ].map((tip) => (
                <div
                  key={tip.title}
                  className="rounded-lg bg-gray-50 p-4"
                >
                  <h3 className="font-bold text-gray-900">{tip.title}</h3>
                  <p className="mt-1 text-sm">{tip.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Signs of Problem Gambling
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You bet more than you can afford to lose</li>
              <li>You borrow money to gamble</li>
              <li>You lie to family and friends about your gambling habits</li>
              <li>You gamble to escape personal problems</li>
              <li>You feel anxious or irritable when you are not gambling</li>
              <li>You neglect work or relationships because of gambling</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Help Resources
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">
                  National Council on Problem Gambling (US)
                </h3>
                <p className="text-sm">
                  1-800-522-4700 (24/7 confidential helpline)
                </p>
                <p className="text-sm text-gray-500">ncpgambling.org</p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">
                  BeGambleAware (UK)
                </h3>
                <p className="text-sm">0808 8020 133 (freephone)</p>
                <p className="text-sm text-gray-500">begambleaware.org</p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">
                  Gamblers Anonymous
                </h3>
                <p className="text-sm">
                  International fellowship for problem gamblers
                </p>
                <p className="text-sm text-gray-500">gamblersanonymous.org</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Self-Exclusion Tools
            </h2>
            <p>
              All licensed betting operators offer self-limitation and
              self-exclusion tools:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Deposit and wager limits</li>
              <li>Session time limits</li>
              <li>Temporary or permanent self-exclusion</li>
              <li>
                Voluntary exclusion programs (e.g., GamStop in the UK, state
                self-exclusion programs in the US)
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
