import { chromium } from "playwright";

const baseUrl = process.argv[2] || "https://www.cdm2026.fr";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 430, height: 932 } });

try {
  await page.goto(`${baseUrl}/match/calendrier`, {
    waitUntil: "networkidle",
    timeout: 45000,
  });
  await page.getByRole("button", { name: "Liste" }).first().click();
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    const overflow = Math.max(
      0,
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
      document.body.scrollWidth - document.body.clientWidth,
    );
    const text = document.body.innerText;
    return {
      overflow,
      hasListButton: text.includes("Liste"),
      hasTreeButton: text.includes("Arbre"),
      hasRoundHeader: text.includes("16es de finale"),
      hasMatchCount: /16 match/.test(text),
      hasSourceContext: text.includes("vient de") || text.includes("Vainqueur 16e"),
    };
  });

  console.log(JSON.stringify(result, null, 2));
  if (
    result.overflow !== 0 ||
    !result.hasListButton ||
    !result.hasTreeButton ||
    !result.hasRoundHeader ||
    !result.hasMatchCount
  ) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
