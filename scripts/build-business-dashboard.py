#!/usr/bin/env python3
"""Build a private CDM2026 business dashboard from existing exports.

This script does not call external APIs. It reads already-generated Search
Console, Gambling Affiliation, SEO-affiliation and monitoring reports, then
writes a private JSON/Markdown dashboard under /srv/cdm2026/shared.
"""

from __future__ import annotations

import argparse
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


DEFAULT_SEARCH_SUMMARY = Path("/srv/cdm2026/shared/search-console/latest.summary.json")
DEFAULT_GAFF_SUMMARY = Path("/srv/cdm2026/shared/gambling-affiliation/latest.summary.json")
DEFAULT_SEO_AFFILIATION = Path("/srv/cdm2026/shared/seo-affiliation/latest.json")
DEFAULT_MONITORING = Path("/srv/cdm2026/shared/monitoring/latest.json")
DEFAULT_GA4_SUMMARY = Path("/srv/cdm2026/shared/ga4/latest.summary.json")
DEFAULT_EDITORIAL_SUMMARY = Path("/srv/cdm2026/shared/editorial-engine/latest.summary.json")
DEFAULT_ATTRIBUTION_FUNNEL_SUMMARY = Path("/srv/cdm2026/shared/attribution-funnel/latest.summary.json")
DEFAULT_OUTPUT_DIR = Path("/srv/cdm2026/shared/business-dashboard")

MONEY_PATHS = {
  "/cote-champion/france",
  "/cote-champion/portugal",
  "/cote-champion/argentine",
  "/cote-champion/bresil",
  "/cote-champion/espagne",
}

HUB_PATHS = {
  "/joueurs",
  "/phase-finale",
  "/tableau",
  "/match/calendrier",
  "/simulateur",
}


def read_json(path: Path) -> dict[str, Any]:
  if not path.exists():
    return {}
  try:
    data = json.loads(path.read_text(encoding="utf-8"))
  except json.JSONDecodeError:
    return {}
  return data if isinstance(data, dict) else {}


def to_float(value: Any, default: float = 0.0) -> float:
  try:
    if value in ("", None):
      return default
    return float(value)
  except (TypeError, ValueError):
    return default


def to_int(value: Any, default: int = 0) -> int:
  try:
    if value in ("", None):
      return default
    return int(float(value))
  except (TypeError, ValueError):
    return default


def parse_dt(value: Any) -> datetime | None:
  if not isinstance(value, str) or not value:
    return None
  normalized = value.replace("Z", "+00:00")
  try:
    parsed = datetime.fromisoformat(normalized)
  except ValueError:
    return None
  if parsed.tzinfo is None:
    parsed = parsed.replace(tzinfo=timezone.utc)
  return parsed.astimezone(timezone.utc)


def age_hours(value: Any, now: datetime) -> float | None:
  parsed = parse_dt(value)
  if parsed is None:
    return None
  return max(0.0, (now - parsed).total_seconds() / 3600)


def pct(value: float) -> str:
  return f"{value * 100:.2f}%"


def pct_from_points(value: float) -> str:
  return f"{value:.2f}%"


def eur(value: Any) -> str:
  return f"{to_float(value):.2f} EUR"


def md(value: Any) -> str:
  return str(value).replace("|", "\\|").replace("\n", " ").strip()


def short(value: Any, limit: int = 120) -> str:
  text = md(value)
  return text if len(text) <= limit else text[: limit - 1].rstrip() + "..."


def is_canonical_aff_var(value: str) -> bool:
  if not value or value == "(empty)":
    return False
  # Format canonique actuel "pageType--slug--placement" ; ":" garde pour
  # les conversions historiques anterieures au fix du 2026-07-02.
  separator = "--" if "--" in value else ":"
  parts = value.split(separator)
  return len(parts) >= 3 and all(parts[:3])


def health_status(ok: bool, warning: bool = False) -> str:
  if ok:
    return "ok"
  return "warning" if warning else "critical"


def score_health(items: list[dict[str, Any]]) -> dict[str, Any]:
  weights = {"ok": 1.0, "warning": 0.55, "critical": 0.0}
  if not items:
    return {"score": 0, "status": "critical"}
  score = sum(weights.get(item["status"], 0.0) for item in items) / len(items) * 100
  if score >= 85:
    status = "ok"
  elif score >= 55:
    status = "warning"
  else:
    status = "critical"
  return {"score": round(score), "status": status}


def top_aff_vars(gaff_summary: dict[str, Any], limit: int = 12) -> list[dict[str, Any]]:
  rows = []
  for aff_var, stats in (gaff_summary.get("by_aff_var") or {}).items():
    if not isinstance(stats, dict):
      continue
    rows.append(
      {
        "aff_var": aff_var,
        "count": to_int(stats.get("count")),
        "cpl": to_int(stats.get("cpl")),
        "cpa": to_int(stats.get("cpa")),
        "commission": round(to_float(stats.get("commission")), 2),
        "canonical": is_canonical_aff_var(str(aff_var)),
      }
    )
  return sorted(rows, key=lambda row: (row["commission"], row["count"]), reverse=True)[:limit]


def attribution_debt(gaff_summary: dict[str, Any], seo: dict[str, Any]) -> dict[str, Any]:
  conversion_index = seo.get("conversions") if isinstance(seo.get("conversions"), dict) else {}
  aff_rows = top_aff_vars(gaff_summary, limit=100)
  legacy = [row for row in aff_rows if not row["canonical"]]
  total = max(to_int(gaff_summary.get("total_conversions")), to_int(conversion_index.get("total")))
  legacy_count = sum(row["count"] for row in legacy)
  empty_count = to_int(conversion_index.get("empty_count")) or sum(
    row["count"] for row in aff_rows if row["aff_var"] in {"", "(empty)"}
  )
  non_canonical_count = to_int(conversion_index.get("non_canonical_count")) or legacy_count
  return {
    "total_conversions": total,
    "legacy_or_noncanonical_count": non_canonical_count,
    "empty_count": empty_count,
    "legacy_rate": round((non_canonical_count / total * 100) if total else 0.0, 2),
    "top_legacy_aff_vars": legacy[:12],
  }


def pick_pages(seo: dict[str, Any]) -> dict[str, list[dict[str, Any]]]:
  page_rollups = seo.get("page_rollups") if isinstance(seo.get("page_rollups"), list) else []
  money = []
  hubs = []
  for row in page_rollups:
    if not isinstance(row, dict):
      continue
    path = str(row.get("path") or "")
    if path in MONEY_PATHS or path.startswith("/cote-champion/"):
      money.append(row)
    if path in HUB_PATHS or path.startswith("/joueurs"):
      hubs.append(row)
  key = lambda row: (to_float(row.get("page_score")), to_int(row.get("impressions")))
  return {
    "money_pages": sorted(money, key=key, reverse=True)[:12],
    "hub_pages": sorted(hubs, key=key, reverse=True)[:12],
  }


def top_opportunity_lists(seo: dict[str, Any]) -> dict[str, list[dict[str, Any]]]:
  def rows(name: str, limit: int) -> list[dict[str, Any]]:
    value = seo.get(name)
    if not isinstance(value, list):
      return []
    return [row for row in value if isinstance(row, dict)][:limit]

  return {
    "money_opportunities": rows("money_opportunities", 15),
    "traffic_to_money": rows("traffic_to_money", 15),
    "top_opportunities": rows("top_opportunities", 15),
  }


def data_health(
  *,
  now: datetime,
  search_summary: dict[str, Any],
  gaff_summary: dict[str, Any],
  seo: dict[str, Any],
  monitoring: dict[str, Any],
  ga4_summary: dict[str, Any],
  editorial_summary: dict[str, Any],
  attribution_funnel: dict[str, Any],
  debt: dict[str, Any],
) -> dict[str, Any]:
  search_age = age_hours(search_summary.get("generated_at"), now)
  gaff_age = age_hours(gaff_summary.get("generated_at"), now)
  seo_age = age_hours((seo.get("summary") or {}).get("generated_at"), now)
  monitoring_age = age_hours(monitoring.get("generatedAt"), now)
  ga4_age = age_hours(ga4_summary.get("generated_at"), now)
  editorial_age = age_hours(editorial_summary.get("generated_at"), now)
  funnel_age = age_hours(attribution_funnel.get("generated_at"), now)
  ga4_connected = bool(ga4_summary.get("connected"))
  ga4_status = str(ga4_summary.get("status") or "").lower()
  funnel_status = str(attribution_funnel.get("status") or "").lower()
  funnel_kpis = attribution_funnel.get("kpis") if isinstance(attribution_funnel.get("kpis"), dict) else {}
  monitoring_ok = str(monitoring.get("overallStatus") or "").lower() == "ok"
  warning_count = to_int((monitoring.get("summary") or {}).get("warnings"))
  failed_count = to_int((monitoring.get("summary") or {}).get("failed"))

  items = [
    {
      "name": "Search Console",
      "status": health_status(search_age is not None and search_age <= 48, warning=True),
      "detail": f"export age {search_age:.1f}h" if search_age is not None else "export missing",
    },
    {
      "name": "Gambling Affiliation",
      "status": health_status(gaff_age is not None and gaff_age <= 36, warning=True),
      "detail": f"export age {gaff_age:.1f}h" if gaff_age is not None else "export missing",
    },
    {
      "name": "SEO-affiliation scoring",
      "status": health_status(seo_age is not None and seo_age <= 48, warning=True),
      "detail": f"export age {seo_age:.1f}h" if seo_age is not None else "export missing",
    },
    {
      "name": "Production monitoring",
      "status": health_status(monitoring_ok and failed_count == 0, warning=warning_count > 0),
      "detail": f"{failed_count} failed, {warning_count} warnings",
    },
    {
      "name": "GA4 server loop",
      "status": "ok" if ga4_connected and ga4_age is not None and ga4_age <= 36 else "warning",
      "detail": (
        f"export age {ga4_age:.1f}h, status {ga4_status}"
        if ga4_age is not None
        else "GA4 production export not detected"
      ),
    },
    {
      "name": "Editorial engine",
      "status": health_status(editorial_age is not None and editorial_age <= 36, warning=True),
      "detail": f"export age {editorial_age:.1f}h" if editorial_age is not None else "editorial export missing",
    },
    {
      "name": "Attribution funnel",
      "status": "ok" if funnel_age is not None and funnel_age <= 36 and funnel_status == "ok" else "warning",
      "detail": (
        f"export age {funnel_age:.1f}h, status {funnel_status}, click signal {to_int(funnel_kpis.get('page_click_signal'))}, custom dims {'ok' if funnel_kpis.get('custom_dimensions_registered') else 'missing'}"
        if funnel_age is not None
        else "funnel export missing"
      ),
    },
    {
      "name": "Affiliate attribution",
      "status": "ok" if debt["legacy_rate"] <= 10 else "warning",
      "detail": f"{debt['legacy_rate']:.2f}% conversions legacy/non-canonical",
    },
  ]
  return {
    "overall": score_health(items),
    "items": items,
  }


def build_actions(
  pages: dict[str, list[dict[str, Any]]],
  opps: dict[str, list[dict[str, Any]]],
  debt: dict[str, Any],
  health: dict[str, Any],
  ga4_summary: dict[str, Any],
  attribution_funnel: dict[str, Any],
) -> list[dict[str, Any]]:
  actions = []
  money_paths = {str(row.get("path")) for row in pages["money_pages"]}
  for path in ["/cote-champion/france", "/cote-champion/portugal"]:
    priority = "P0" if path in money_paths else "P1"
    actions.append(
      {
        "priority": priority,
        "area": "money_page",
        "target": path,
        "action": "Afficher les cotes et le CTA PMU au-dessus de la ligne de flottaison, enrichir FAQ/comparatif et preuves de fraicheur.",
      }
    )

  actions.append(
    {
      "priority": "P0",
      "area": "attribution",
      "target": "aff_var",
      "action": f"Reduire les conversions legacy/non-canoniques ({debt['legacy_rate']:.2f}%) et surveiller les top aff_var generiques.",
    }
  )
  if not ga4_summary.get("connected"):
    actions.append(
      {
        "priority": "P0",
        "area": "ga4",
        "target": "/srv/cdm2026/shared/ga4",
        "action": "Installer la config GA4 serveur pour relier pages, sources, events CTA et conversions PMU.",
      }
    )
  funnel_kpis = attribution_funnel.get("kpis") if isinstance(attribution_funnel.get("kpis"), dict) else {}
  if attribution_funnel and not funnel_kpis.get("custom_dimensions_registered"):
    actions.append(
      {
        "priority": "P0",
        "area": "ga4",
        "target": "custom dimensions",
        "action": "Declarer `aff_var`, `page_type`, `placement` et `affiliate_program` comme dimensions personnalisees GA4 event-scoped.",
      }
    )
  actions.append(
    {
      "priority": "P1",
      "area": "players_hub",
      "target": "/joueurs",
      "action": "Transformer le hub en entree SEO utile : joueurs par equipe, buteurs, joueurs a suivre, liens buteur/tirs cadres/cote champion.",
    }
  )
  actions.append(
    {
      "priority": "P1",
      "area": "phase_finale",
      "target": "/phase-finale + /match/calendrier",
      "action": "Ajouter switch arbre/liste, tooltips de provenance et hierarchie mobile plus claire.",
    }
  )
  actions.append(
    {
      "priority": "P1",
      "area": "editorial",
      "target": "brief quotidien",
      "action": "Generer chaque jour une short-list d'articles depuis tendances Search Console + actus, avec liens vers match/equipe/pronostic/cotes.",
    }
  )
  if health["overall"]["status"] != "ok":
    actions.append(
      {
        "priority": "P0",
        "area": "data_health",
        "target": "monitoring",
        "action": "Corriger les checks warning/critical avant d'etendre les pages, sinon les decisions SEO reposent sur une donnees fragile.",
      }
    )

  if opps["traffic_to_money"]:
    row = opps["traffic_to_money"][0]
    actions.append(
      {
        "priority": "P1",
        "area": "internal_linking",
        "target": row.get("path"),
        "action": f"Exploiter le trafic existant sur '{row.get('query')}' avec des liens money visibles et contextuels.",
      }
    )
  return actions


def build_payload(args: argparse.Namespace) -> dict[str, Any]:
  now = datetime.now(timezone.utc)
  search_summary = read_json(Path(args.search_summary))
  gaff_summary = read_json(Path(args.gaff_summary))
  seo = read_json(Path(args.seo_affiliation))
  monitoring = read_json(Path(args.monitoring))
  ga4_summary = read_json(Path(args.ga4_summary))
  editorial_summary = read_json(Path(args.editorial_summary))
  attribution_funnel = read_json(Path(args.attribution_funnel_summary))
  debt = attribution_debt(gaff_summary, seo)
  pages = pick_pages(seo)
  opps = top_opportunity_lists(seo)
  health = data_health(
    now=now,
    search_summary=search_summary,
    gaff_summary=gaff_summary,
    seo=seo,
    monitoring=monitoring,
    ga4_summary=ga4_summary,
    editorial_summary=editorial_summary,
    attribution_funnel=attribution_funnel,
    debt=debt,
  )
  actions = build_actions(pages, opps, debt, health, ga4_summary, attribution_funnel)

  search_clicks = to_int(search_summary.get("total_clicks"))
  search_impressions = to_int(search_summary.get("total_impressions"))
  conversions = to_int(gaff_summary.get("total_conversions"))
  commission = to_float(gaff_summary.get("total_commission"))
  cvr_per_100k_clicks = round((conversions / search_clicks * 100000) if search_clicks else 0.0, 2)
  revenue_per_100k_clicks = round((commission / search_clicks * 100000) if search_clicks else 0.0, 2)

  return {
    "generated_at": now.isoformat(),
    "inputs": {
      "search_summary": str(args.search_summary),
      "gaff_summary": str(args.gaff_summary),
      "seo_affiliation": str(args.seo_affiliation),
      "monitoring": str(args.monitoring),
      "ga4_summary": str(args.ga4_summary),
      "editorial_summary": str(args.editorial_summary),
      "attribution_funnel_summary": str(args.attribution_funnel_summary),
    },
    "kpis": {
      "search_clicks": search_clicks,
      "search_impressions": search_impressions,
      "search_ctr": to_float(search_summary.get("avg_ctr")),
      "search_avg_position": round(to_float(search_summary.get("avg_position")), 2),
      "conversions": conversions,
      "commission": round(commission, 2),
      "conversions_per_100k_search_clicks": cvr_per_100k_clicks,
      "commission_per_100k_search_clicks": revenue_per_100k_clicks,
      "query_count": to_int(search_summary.get("query_count")),
      "page_count": to_int(search_summary.get("page_count")),
      "ga4_sessions": to_int((ga4_summary.get("summary") or {}).get("sessions")),
      "ga4_page_views": to_int((ga4_summary.get("summary") or {}).get("page_views")),
      "ga4_tracked_click_events": to_int((ga4_summary.get("summary") or {}).get("tracked_click_events")),
      "funnel_click_signal": to_int(((attribution_funnel.get("kpis") or {}) if isinstance(attribution_funnel.get("kpis"), dict) else {}).get("page_click_signal")),
      "funnel_custom_dimensions_registered": bool(((attribution_funnel.get("kpis") or {}) if isinstance(attribution_funnel.get("kpis"), dict) else {}).get("custom_dimensions_registered")),
    },
    "periods": {
      "search_console": f"{search_summary.get('start_date')} -> {search_summary.get('end_date')}",
      "gambling_affiliation": (
        f"{(gaff_summary.get('period') or {}).get('start')} -> {(gaff_summary.get('period') or {}).get('end')}"
      ),
    },
    "health": health,
    "ga4": ga4_summary,
    "editorial": editorial_summary,
    "attribution_funnel": attribution_funnel,
    "attribution": {
      **debt,
      "top_aff_vars": top_aff_vars(gaff_summary, limit=15),
    },
    "priority_pages": pages,
    "opportunities": opps,
    "next_actions": actions,
  }


def render_page_rows(rows: list[dict[str, Any]], limit: int = 8) -> list[str]:
  if not rows:
    return ["| - | - | - | - | - | - |", "| --- | ---: | ---: | ---: | ---: | --- |"]
  output = ["| Page | Score | Impr. | Clics | CTR | Requetes cles |", "| --- | ---: | ---: | ---: | ---: | --- |"]
  for row in rows[:limit]:
    top_queries = ", ".join(str(item.get("query")) for item in row.get("top_queries", [])[:3])
    output.append(
      f"| `{md(row.get('path'))}` | {to_float(row.get('page_score')):.1f} | {to_int(row.get('impressions'))} | {to_int(row.get('clicks'))} | {pct_from_points(to_float(row.get('ctr_pct')))} | {short(top_queries, 110)} |"
    )
  return output


def render_opportunity_rows(rows: list[dict[str, Any]], limit: int = 8) -> list[str]:
  output = ["| Score | Requete | Page | Impr. | Clics | Pos. | Action |", "| ---: | --- | --- | ---: | ---: | ---: | --- |"]
  if not rows:
    output.append("| - | - | - | - | - | - | - |")
    return output
  for row in rows[:limit]:
    output.append(
      f"| {to_float(row.get('score')):.1f} | {short(row.get('query'), 70)} | `{md(row.get('path'))}` | {to_int(row.get('impressions'))} | {to_int(row.get('clicks'))} | {to_float(row.get('position')):.2f} | {short(row.get('action'), 95)} |"
    )
  return output


def render_aff_rows(rows: list[dict[str, Any]], limit: int = 10) -> list[str]:
  output = ["| aff_var | Conv. | CPL | CPA | Comm. | Canonique |", "| --- | ---: | ---: | ---: | ---: | --- |"]
  if not rows:
    output.append("| - | - | - | - | - | - |")
    return output
  for row in rows[:limit]:
    output.append(
      f"| `{md(row['aff_var'])}` | {row['count']} | {row['cpl']} | {row['cpa']} | {eur(row['commission'])} | {'oui' if row['canonical'] else 'non'} |"
    )
  return output


def render_markdown(payload: dict[str, Any]) -> str:
  kpis = payload["kpis"]
  health = payload["health"]
  attribution = payload["attribution"]
  priority_pages = payload["priority_pages"]
  opps = payload["opportunities"]
  lines = [
    "# Business dashboard CDM2026",
    "",
    f"Genere : {payload['generated_at']}",
    f"Search Console : {payload['periods']['search_console']}",
    f"Gambling Affiliation : {payload['periods']['gambling_affiliation']}",
    "",
    "## KPIs",
    "",
    "| Indicateur | Valeur |",
    "| --- | ---: |",
    f"| Clics SEO | {kpis['search_clicks']} |",
    f"| Impressions SEO | {kpis['search_impressions']} |",
    f"| CTR SEO moyen | {pct(kpis['search_ctr'])} |",
    f"| Position moyenne | {kpis['search_avg_position']:.2f} |",
    f"| Conversions PMU | {kpis['conversions']} |",
    f"| Commission potentielle | {eur(kpis['commission'])} |",
    f"| Conversions / 100k clics SEO | {kpis['conversions_per_100k_search_clicks']} |",
    f"| Commission / 100k clics SEO | {eur(kpis['commission_per_100k_search_clicks'])} |",
    f"| Sessions GA4 | {kpis['ga4_sessions']} |",
    f"| Pages vues GA4 | {kpis['ga4_page_views']} |",
    f"| Events clic GA4 detectes | {kpis['ga4_tracked_click_events']} |",
    f"| Signal clic page funnel | {kpis['funnel_click_signal']} |",
    f"| Custom dimensions GA4 funnel | {'oui' if kpis['funnel_custom_dimensions_registered'] else 'non'} |",
    "",
    "## Data health",
    "",
    f"Statut global : **{health['overall']['status']}** ({health['overall']['score']}/100)",
    "",
    "| Source | Statut | Detail |",
    "| --- | --- | --- |",
  ]
  for item in health["items"]:
    lines.append(f"| {md(item['name'])} | `{item['status']}` | {md(item['detail'])} |")

  lines.extend(
    [
      "",
      "## Dette d'attribution",
      "",
      f"- Conversions avec `aff_var` legacy/non canonique : {attribution['legacy_or_noncanonical_count']} / {attribution['total_conversions']} ({attribution['legacy_rate']:.2f}%).",
      f"- Conversions sans `aff_var` : {attribution['empty_count']}.",
      "",
      "### Top aff_var",
      "",
      *render_aff_rows(attribution["top_aff_vars"], 12),
      "",
      "### Top aff_var a nettoyer",
      "",
      *render_aff_rows(attribution["top_legacy_aff_vars"], 12),
      "",
      "## Pages money prioritaires",
      "",
      *render_page_rows(priority_pages["money_pages"], 10),
      "",
      "## Hubs a convertir",
      "",
      *render_page_rows(priority_pages["hub_pages"], 10),
      "",
      "## Opportunites money",
      "",
      *render_opportunity_rows(opps["money_opportunities"], 10),
      "",
      "## Gros trafic a pousser vers PMU",
      "",
      *render_opportunity_rows(opps["traffic_to_money"], 10),
      "",
      "## Prochaines actions",
      "",
      "| Priorite | Zone | Cible | Action |",
      "| --- | --- | --- | --- |",
    ]
  )
  for action in payload["next_actions"]:
    lines.append(
      f"| `{md(action['priority'])}` | {md(action['area'])} | `{md(action['target'])}` | {md(action['action'])} |"
    )
  lines.append("")
  return "\n".join(lines)


def write_outputs(payload: dict[str, Any], output_dir: Path) -> dict[str, str]:
  output_dir.mkdir(parents=True, exist_ok=True)
  (output_dir / "json").mkdir(parents=True, exist_ok=True)
  (output_dir / "reports").mkdir(parents=True, exist_ok=True)
  stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
  json_path = output_dir / "json" / f"business_dashboard_{stamp}.json"
  md_path = output_dir / "reports" / f"business_dashboard_{stamp}.md"
  json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
  md_path.write_text(render_markdown(payload), encoding="utf-8")
  latest_json = output_dir / "latest.json"
  latest_md = output_dir / "latest.md"
  shutil.copy2(json_path, latest_json)
  shutil.copy2(md_path, latest_md)
  return {
    "json": str(json_path),
    "markdown": str(md_path),
    "latest_json": str(latest_json),
    "latest_markdown": str(latest_md),
  }


def main() -> int:
  parser = argparse.ArgumentParser(description=__doc__)
  parser.add_argument("--search-summary", default=str(DEFAULT_SEARCH_SUMMARY))
  parser.add_argument("--gaff-summary", default=str(DEFAULT_GAFF_SUMMARY))
  parser.add_argument("--seo-affiliation", default=str(DEFAULT_SEO_AFFILIATION))
  parser.add_argument("--monitoring", default=str(DEFAULT_MONITORING))
  parser.add_argument("--ga4-summary", default=str(DEFAULT_GA4_SUMMARY))
  parser.add_argument("--editorial-summary", default=str(DEFAULT_EDITORIAL_SUMMARY))
  parser.add_argument("--attribution-funnel-summary", default=str(DEFAULT_ATTRIBUTION_FUNNEL_SUMMARY))
  parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
  args = parser.parse_args()

  payload = build_payload(args)
  files = write_outputs(payload, Path(args.output_dir))
  print(
    json.dumps(
      {
        "status": "ok",
        "generated_at": payload["generated_at"],
        "health": payload["health"]["overall"],
        "conversions": payload["kpis"]["conversions"],
        "commission": payload["kpis"]["commission"],
        "files": files,
      },
      ensure_ascii=False,
      indent=2,
    )
  )
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
