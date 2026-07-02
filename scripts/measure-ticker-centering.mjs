import { chromium } from "playwright";

const url = process.argv[2] ?? "https://www.cdm2026.fr/match/calendrier";
const width = Number(process.argv[3] ?? 430);
const height = Number(process.argv[4] ?? 932);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});

await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

const result = await page.evaluate(() => {
  const label = Array.from(document.querySelectorAll("span")).find(
    (node) => node.textContent?.trim() === "MATCHS" || node.textContent?.trim() === "LIVE"
  );
  if (!label) return { error: "ticker label not found" };

  const rail = label.parentElement;
  const band = rail?.parentElement?.parentElement;
  const firstLink = rail?.querySelector("a");
  const firstPill = firstLink?.firstElementChild;

  if (!rail || !band || !firstPill) return { error: "ticker structure not found" };

  const rect = (node) => {
    const r = node.getBoundingClientRect();
    return {
      top: r.top,
      bottom: r.bottom,
      left: r.left,
      right: r.right,
      width: r.width,
      height: r.height,
      centerY: r.top + r.height / 2,
    };
  };

  const bandRect = rect(band);
  const railRect = rect(rail);
  const labelRect = rect(label);
  const linkRect = rect(firstLink);
  const pillRect = rect(firstPill);
  const style = (node) => {
    const s = getComputedStyle(node);
    return {
      display: s.display,
      alignItems: s.alignItems,
      justifyContent: s.justifyContent,
      height: s.height,
      paddingTop: s.paddingTop,
      paddingBottom: s.paddingBottom,
      overflowX: s.overflowX,
      scrollSnapType: s.scrollSnapType,
      scrollSnapAlign: s.scrollSnapAlign,
      transform: s.transform,
      boxSizing: s.boxSizing,
    };
  };

  const gap = (child) => ({
    top: Number((child.top - bandRect.top).toFixed(3)),
    bottom: Number((bandRect.bottom - child.bottom).toFixed(3)),
    delta: Number(Math.abs((child.top - bandRect.top) - (bandRect.bottom - child.bottom)).toFixed(3)),
    centerDelta: Number((child.centerY - bandRect.centerY).toFixed(3)),
  });

  return {
    url: location.href,
    viewport: { width: innerWidth, height: innerHeight, devicePixelRatio },
    labelText: label.textContent?.trim(),
    text: rail.innerText.replace(/\s+/g, " ").trim().slice(0, 160),
    band: bandRect,
    rail: railRect,
    label: labelRect,
    firstLink: linkRect,
    firstPill: pillRect,
    labelGap: gap(labelRect),
    linkGap: gap(linkRect),
    pillGap: gap(pillRect),
    linkClass: firstLink.getAttribute("class"),
    pillClass: firstPill.getAttribute("class"),
    railStyle: style(rail),
    bandStyle: style(band),
    linkStyle: style(firstLink),
    pillStyle: style(firstPill),
    bodyOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
