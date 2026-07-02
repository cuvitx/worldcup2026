import { chromium } from "playwright";

const url = process.argv[2] ?? "https://www.cdm2026.fr/";

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

const browser = await chromium.launch({ headless: true });

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto(url, { waitUntil: "networkidle", timeout: 60000 });
const desktopResult = await desktop.evaluate(() => {
  const nav = Array.from(document.querySelectorAll("div")).find((el) => {
    const className = String(el.getAttribute("class") ?? "");
    const text = el.textContent ?? "";
    return className.includes("hidden md:flex") && text.includes("Phase finale") && text.includes("Calendrier");
  });
  const items = nav
    ? Array.from(nav.children).map((child) => child.textContent?.replace(/\s+/g, " ").trim() ?? "")
    : [];
  return {
    items,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
});

const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});
await mobile.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await mobile.getByRole("button", { name: "Ouvrir le menu" }).click();
const mobileResult = await mobile.evaluate(() => {
  const menu = Array.from(document.querySelectorAll("div")).find((el) => {
    const className = String(el.getAttribute("class") ?? "");
    const text = el.textContent ?? "";
    return className.includes("max-h-[80vh]") && text.includes("Phase finale") && text.includes("Calendrier");
  });
  const items = menu
    ? Array.from(menu.children).map((child) => child.textContent?.replace(/\s+/g, " ").trim() ?? "")
    : [];
  return {
    items,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
});

console.log(JSON.stringify({
  desktop: {
    firstItems: desktopResult.items.slice(0, 6).map(normalize),
    overflow: desktopResult.overflow,
  },
  mobile: {
    firstItems: mobileResult.items.slice(0, 6).map(normalize),
    overflow: mobileResult.overflow,
  },
}, null, 2));

await browser.close();
