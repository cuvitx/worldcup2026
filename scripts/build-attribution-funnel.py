#!/usr/bin/env python3
"""Build a private attribution funnel report for CDM2026.

The report joins existing Search Console, SEO-affiliation and Gambling
Affiliation exports with GA4 page and click data. It intentionally avoids
printing secrets and stores outputs under /srv/cdm2026/shared by default.
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


DEFAULT_ENV_PATH = Path("/etc/cdm2026/ga4.env")
DEFAULT_GA4 = Path("/srv/cdm2026/shared/ga4/latest.json")
DEFAULT_GAFF = Path("/srv/cdm2026/shared/gambling-affiliation/latest.summary.json")
DEFAULT_SEO_AFFILIATION = Path("/srv/cdm2026/shared/seo-affiliation/latest.json")
DEFAULT_SEARCH_SUMMARY = Path("/srv/cdm2026/shared/search-console/latest.summary.json")
DEFAULT_OUTPUT_DIR = Path("/srv/cdm2026/shared/attribution-funnel")
GA4_SCOPE = "https://www.googleapis.com/auth/analytics.readonly"

CUSTOM_DIMENSIONS = [
  "customEvent:aff_var",
  "customEvent:page_type",
  "customEvent:placement",
  "customEvent:affiliate_program",
]

LEGACY_AFF_VAR_PATHS = {
  "cote-champion-portugal": "/cote-champion/portugal",
  "cote-champion-france": "/cote-champion/france",
  "cote-champion": "/cote-champion",
  "prono-vainqueur": "/pronostic/vainqueur",
  "match-hero-cta": "/match",
  "match-cta": "/match",
  "match": "/match",
  "homepage": "/",
  "bookmakers": "/meilleurs-bookmakers",
  "bonus": "/bonus",
  "global-footer": "(global)",
  "popup": "(popup)",
  "cdm2026": "(global)",
  "(empty)": "(unknown)",
  "": "(unknown)",
}

MONEY_PREFIXES = (
  "/cote-champion",
  "/pronostic",
  "/pronostic-match",
  "/score-exact",
  "/parier",
  "/cote-buteur",
  "/tirs-cadres",
)

HUB_PREFIXES = (
  "/joueurs",
  "/match/calendrier",
  "/phase-finale",
  "/tableau",
  "/simulateur",
  "/match/aujourdhui",
)


def read_json(path: Path) -> dict[str, Any]:
  if not path.exists():
    return {}
  try:
    data = json.loads(path.read_text(encoding="utf-8"))
  except json.JSONDecodeError:
    return {}
  return data if isinstance(data, dict) else {}


def load_env(path: Path) -> dict[str, str]:
  values: dict[str, str] = {}
  if not path.exists():
    return values
  for raw_line in path.read_text(encoding="utf-8").splitlines():
    line = raw_line.strip()
    if not line or line.startswith("#") or "=" not in line:
      continue
    key, value = line.split("=", 1)
    values[key.strip()] = value.strip().strip('"').strip("'")
  return values


def to_int(value: Any, default: int = 0) -> int:
  try:
    if value in ("", None):
      return default
    return int(float(value))
  except (TypeError, ValueError):
    return default


def to_float(value: Any, default: float = 0.0) -> float:
  try:
    if value in ("", None):
      return default
    return float(value)
  except (TypeError, ValueError):
    return default


def pct(value: float) -> str:
  return f"{value * 100:.2f}%"


def pct_points(value: float) -> str:
  return f"{value:.2f}%"


def eur(value: Any) -> str:
  return f"{to_float(value):.2f} EUR"


def md(value: Any) -> str:
  return str(value).replace("|", "\\|").replace("\n", " ").strip()


def short(value: Any, limit: int = 110) -> str:
  text = md(value)
  return text if len(text) <= limit else text[: limit - 1].rstrip() + "..."


def normalize_property_id(value: str) -> str:
  value = value.strip()
  return value if value.startswith("properties/") else f"properties/{value}"


def normalize_path(value: Any) -> str:
  raw = str(value or "").strip()
  if not raw or raw in {"(not set)", "not set"}:
    return ""
  if raw.startswith("http://") or raw.startswith("https://"):
    parsed = urlparse(raw)
    raw = parsed.path or "/"
  raw = raw.split("?", 1)[0].split("#", 1)[0]
  if not raw.startswith("/"):
    raw = f"/{raw}"
  if len(raw) > 1:
    raw = raw.rstrip("/")
  return raw or "/"


def page_family(path: str) -> str:
  if path == "/":
    return "homepage"
  if path.startswith("/cote-champion"):
    return "cote_champion"
  if path.startswith("/pronostic-match"):
    return "pronostic_match"
  if path.startswith("/pronostic"):
    return "pronostic"
  if path.startswith("/joueurs") or path.startswith("/joueur"):
    return "joueurs"
  if path.startswith("/match"):
    return "match"
  if path.startswith("/phase-finale") or path.startswith("/tableau"):
    return "phase_finale"
  if path.startswith("/effectif") or path.startswith("/equipe"):
    return "equipe"
  return path.strip("/").split("/", 1)[0] or "other"


def is_money_page(path: str) -> bool:
  return path.startswith(MONEY_PREFIXES)


def is_hub_page(path: str) -> bool:
  return path.startswith(HUB_PREFIXES)


def is_pmu_url(value: str) -> bool:
  text = value.lower()
  return any(token in text for token in ["gambling-affiliation.com", "pmu", "pmuplay", "pmu-play"])


def domain_of(value: str) -> str:
  if not value:
    return ""
  try:
    return urlparse(value).netloc or ""
  except ValueError:
    return ""


def import_google_modules() -> tuple[Any, Any, dict[str, Any]]:
  try:
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import (
      DateRange,
      Dimension,
      Filter,
      FilterExpression,
      Metric,
      OrderBy,
      RunReportRequest,
    )
    from google.oauth2 import service_account
  except Exception as exc:
    raise RuntimeError("Missing GA4 Python dependencies") from exc
  return service_account, BetaAnalyticsDataClient, {
    "DateRange": DateRange,
    "Dimension": Dimension,
    "Filter": Filter,
    "FilterExpression": FilterExpression,
    "Metric": Metric,
    "OrderBy": OrderBy,
    "RunReportRequest": RunReportRequest,
  }


def exact_dimension_filter(types: dict[str, Any], field: str, values: list[str]) -> Any:
  return types["FilterExpression"](
    filter=types["Filter"](
      field_name=field,
      in_list_filter=types["Filter"].InListFilter(values=values),
    )
  )


def run_report(
  *,
  client: Any,
  types: dict[str, Any],
  property_id: str,
  start_date: str,
  end_date: str,
  dimensions: list[str],
  metrics: list[str],
  dimension_filter: Any | None = None,
  order_by_metric: str | None = None,
  limit: int = 10000,
) -> list[dict[str, Any]]:
  request = types["RunReportRequest"](
    property=property_id,
    date_ranges=[types["DateRange"](start_date=start_date, end_date=end_date)],
    dimensions=[types["Dimension"](name=name) for name in dimensions],
    metrics=[types["Metric"](name=name) for name in metrics],
    dimension_filter=dimension_filter,
    limit=limit,
  )
  if order_by_metric:
    request.order_bys = [
      types["OrderBy"](
        metric=types["OrderBy"].MetricOrderBy(metric_name=order_by_metric),
        desc=True,
      )
    ]
  response = client.run_report(request)
  rows: list[dict[str, Any]] = []
  for row in response.rows:
    item: dict[str, Any] = {}
    for index, name in enumerate(dimensions):
      item[name] = row.dimension_values[index].value if index < len(row.dimension_values) else ""
    for index, name in enumerate(metrics):
      item[name] = row.metric_values[index].value if index < len(row.metric_values) else ""
    rows.append(item)
  return rows


def query_ga4_clicks(env_path: Path, ga4_latest: dict[str, Any], row_limit: int) -> dict[str, Any]:
  env = load_env(env_path)
  property_id = normalize_property_id(
    os.environ.get("GA4_PROPERTY_ID") or env.get("GA4_PROPERTY_ID") or ""
  )
  service_account_json = (
    os.environ.get("GA4_SERVICE_ACCOUNT_JSON")
    or env.get("GA4_SERVICE_ACCOUNT_JSON")
    or env.get("GOOGLE_APPLICATION_CREDENTIALS")
    or ""
  )
  warnings: list[str] = []
  if not property_id:
    warnings.append("GA4_PROPERTY_ID missing")
  if not service_account_json or not Path(service_account_json).exists():
    warnings.append("GA4_SERVICE_ACCOUNT_JSON missing")
  if warnings:
    return {"status": "missing_config", "warnings": warnings, "by_page": {}, "outbound_links": []}

  try:
    service_account, client_class, types = import_google_modules()
  except RuntimeError as exc:
    return {"status": "missing_dependencies", "warnings": [str(exc)], "by_page": {}, "outbound_links": []}

  period = ga4_latest.get("period") if isinstance(ga4_latest.get("period"), dict) else {}
  start_date = str(period.get("start") or "")
  end_date = str(period.get("end") or "")
  if not start_date or not end_date:
    return {"status": "missing_period", "warnings": ["GA4 latest period missing"], "by_page": {}, "outbound_links": []}

  credentials = service_account.Credentials.from_service_account_file(
    service_account_json,
    scopes=[GA4_SCOPE],
  )
  client = client_class(credentials=credentials)

  by_page: dict[str, dict[str, Any]] = defaultdict(dict)
  details: dict[str, Any] = {
    "status": "ok",
    "warnings": [],
    "period": {"start": start_date, "end": end_date},
    "custom_dimensions": {},
    "by_page": by_page,
    "outbound_links": [],
  }

  event_filter = exact_dimension_filter(types, "eventName", ["affiliate_click"])
  for row in run_report(
    client=client,
    types=types,
    property_id=property_id,
    start_date=start_date,
    end_date=end_date,
    dimensions=["pagePath"],
    metrics=["eventCount", "activeUsers"],
    dimension_filter=event_filter,
    order_by_metric="eventCount",
    limit=row_limit,
  ):
    path = normalize_path(row.get("pagePath"))
    if not path:
      continue
    by_page[path]["affiliate_click_events"] = to_int(row.get("eventCount"))
    by_page[path]["affiliate_click_users"] = to_int(row.get("activeUsers"))

  click_filter = exact_dimension_filter(types, "eventName", ["click"])
  outbound_rows = run_report(
    client=client,
    types=types,
    property_id=property_id,
    start_date=start_date,
    end_date=end_date,
    dimensions=["pagePath", "linkUrl"],
    metrics=["eventCount", "activeUsers"],
    dimension_filter=click_filter,
    order_by_metric="eventCount",
    limit=row_limit,
  )
  link_totals: dict[tuple[str, str], dict[str, Any]] = {}
  for row in outbound_rows:
    link_url = str(row.get("linkUrl") or "")
    if not is_pmu_url(link_url):
      continue
    path = normalize_path(row.get("pagePath"))
    if not path:
      continue
    events = to_int(row.get("eventCount"))
    users = to_int(row.get("activeUsers"))
    by_page[path]["pmu_outbound_click_events"] = to_int(by_page[path].get("pmu_outbound_click_events")) + events
    by_page[path]["pmu_outbound_click_users"] = to_int(by_page[path].get("pmu_outbound_click_users")) + users
    key = (path, domain_of(link_url))
    link_totals.setdefault(key, {"path": path, "domain": key[1], "events": 0, "users": 0})
    link_totals[key]["events"] += events
    link_totals[key]["users"] += users

  details["outbound_links"] = sorted(
    link_totals.values(),
    key=lambda row: (to_int(row.get("events")), to_int(row.get("users"))),
    reverse=True,
  )[:50]

  for dimension in CUSTOM_DIMENSIONS:
    try:
      rows = run_report(
        client=client,
        types=types,
        property_id=property_id,
        start_date=start_date,
        end_date=end_date,
        dimensions=["eventName", dimension],
        metrics=["eventCount"],
        dimension_filter=event_filter,
        limit=1,
      )
      details["custom_dimensions"][dimension] = {"registered": True, "sample_rows": len(rows)}
    except Exception as exc:  # noqa: BLE001 - GA4 schema probe
      details["custom_dimensions"][dimension] = {
        "registered": False,
        "error": str(exc)[:180],
      }

  if not all(item["registered"] for item in details["custom_dimensions"].values()):
    details["warnings"].append("GA4 custom dimensions for affiliate parameters are not fully registered")

  details["by_page"] = dict(by_page)
  return details


def build_legacy_conversion_map(gaff_summary: dict[str, Any]) -> dict[str, dict[str, Any]]:
  by_path: dict[str, dict[str, Any]] = defaultdict(lambda: {"conversions": 0, "commission": 0.0, "aff_vars": []})
  for aff_var, stats in (gaff_summary.get("by_aff_var") or {}).items():
    if not isinstance(stats, dict):
      continue
    path = LEGACY_AFF_VAR_PATHS.get(str(aff_var))
    if not path:
      # Format canonique actuel "pageType--slug--placement" ; ":" garde pour
      # les conversions historiques anterieures au fix du 2026-07-02.
      raw = str(aff_var)
      parts = raw.split("--") if "--" in raw else raw.split(":")
      if len(parts) >= 2 and parts[0] == "cote-champion":
        path = f"/cote-champion/{parts[1]}"
    if not path:
      continue
    conversions = to_int(stats.get("count"))
    commission = to_float(stats.get("commission"))
    by_path[path]["conversions"] += conversions
    by_path[path]["commission"] += commission
    by_path[path]["aff_vars"].append(
      {
        "aff_var": str(aff_var) or "(empty)",
        "conversions": conversions,
        "commission": round(commission, 2),
      }
    )
  return dict(by_path)


def merge_records(
  *,
  ga4_latest: dict[str, Any],
  seo: dict[str, Any],
  ga4_clicks: dict[str, Any],
  legacy_conversions: dict[str, dict[str, Any]],
) -> list[dict[str, Any]]:
  records: dict[str, dict[str, Any]] = {}

  def record(path: str) -> dict[str, Any]:
    path = normalize_path(path) if not path.startswith("(") else path
    if not path:
      path = "(unknown)"
    if path not in records:
      records[path] = {
        "path": path,
        "family": page_family(path) if path.startswith("/") else path.strip("()"),
        "is_money_page": is_money_page(path),
        "is_hub_page": is_hub_page(path),
        "seo_clicks": 0,
        "seo_impressions": 0,
        "seo_ctr_pct": 0.0,
        "avg_position": 0.0,
        "top_queries": [],
        "ga4_page_views": 0,
        "ga4_sessions": 0,
        "ga4_landing_sessions": 0,
        "affiliate_click_events": 0,
        "affiliate_click_users": 0,
        "pmu_outbound_click_events": 0,
        "pmu_outbound_click_users": 0,
        "click_signal": 0,
        "click_rate": 0.0,
        "legacy_conversions": 0,
        "legacy_commission": 0.0,
        "legacy_aff_vars": [],
        "family_conversion_signal": 0,
        "family_commission_signal": 0.0,
        "score": 0.0,
        "recommended_action": "",
      }
    return records[path]

  for row in seo.get("page_rollups") or []:
    if not isinstance(row, dict):
      continue
    item = record(str(row.get("path") or ""))
    item["seo_clicks"] = to_int(row.get("clicks"))
    item["seo_impressions"] = to_int(row.get("impressions"))
    item["seo_ctr_pct"] = to_float(row.get("ctr_pct"))
    item["avg_position"] = round(to_float(row.get("avg_position")), 2)
    item["top_queries"] = row.get("top_queries") if isinstance(row.get("top_queries"), list) else []
    item["family_conversion_signal"] = to_int(row.get("family_conversions"))
    item["family_commission_signal"] = round(to_float(row.get("family_commission")), 2)

  datasets = ga4_latest.get("datasets") if isinstance(ga4_latest.get("datasets"), dict) else {}
  for row in datasets.get("top_pages") or []:
    path = normalize_path(row.get("pagePath"))
    if not path:
      continue
    item = record(path)
    item["ga4_page_views"] += to_int(row.get("screenPageViews"))
    item["ga4_sessions"] += to_int(row.get("sessions"))

  for row in datasets.get("landing_pages") or []:
    path = normalize_path(row.get("landingPage"))
    if not path:
      continue
    item = record(path)
    item["ga4_landing_sessions"] += to_int(row.get("sessions"))

  for path, stats in (ga4_clicks.get("by_page") or {}).items():
    item = record(path)
    item["affiliate_click_events"] = to_int(stats.get("affiliate_click_events"))
    item["affiliate_click_users"] = to_int(stats.get("affiliate_click_users"))
    item["pmu_outbound_click_events"] = to_int(stats.get("pmu_outbound_click_events"))
    item["pmu_outbound_click_users"] = to_int(stats.get("pmu_outbound_click_users"))

  for path, stats in legacy_conversions.items():
    item = record(path)
    item["legacy_conversions"] = to_int(stats.get("conversions"))
    item["legacy_commission"] = round(to_float(stats.get("commission")), 2)
    item["legacy_aff_vars"] = stats.get("aff_vars") if isinstance(stats.get("aff_vars"), list) else []

  for item in records.values():
    item["click_signal"] = max(item["affiliate_click_events"], item["pmu_outbound_click_events"])
    denominator = max(item["ga4_page_views"], item["ga4_sessions"], item["seo_clicks"], item["click_signal"])
    item["click_rate"] = round(item["click_signal"] / denominator, 4) if denominator else 0.0
    traffic_score = min(40.0, (item["ga4_page_views"] / 1000) + (item["seo_clicks"] / 200))
    click_score = min(30.0, item["click_signal"] / 30)
    conversion_score = min(25.0, item["legacy_conversions"] * 5)
    if item["family_conversion_signal"] and not item["legacy_conversions"]:
      conversion_score += min(5.0, item["family_conversion_signal"])
    item["score"] = round(traffic_score + click_score + conversion_score, 1)
    item["recommended_action"] = recommend_action(item)

  return sorted(records.values(), key=lambda row: (to_float(row["score"]), to_int(row["click_signal"])), reverse=True)


def recommend_action(item: dict[str, Any]) -> str:
  path = str(item.get("path") or "")
  clicks = to_int(item.get("click_signal"))
  views = to_int(item.get("ga4_page_views"))
  conversions = to_int(item.get("legacy_conversions"))
  if conversions > 0 and clicks > 0:
    return "Conserver le CTA, mesurer avec aff_var canonique et tester une variante above-the-fold."
  if path.startswith("/cote-champion"):
    return "Priorite money : cotes et CTA PMU visibles haut de page, FAQ/comparatif et preuves de fraicheur."
  if views >= 5000 and clicks == 0:
    return "Fort trafic sans signal de clic PMU : ajouter un bloc contextuel discret vers pronostic/cote."
  if path.startswith("/joueurs"):
    return "Ajouter des liens joueur money : buteur, tirs cadres, cote champion equipe et match associe."
  if is_hub_page(path):
    return "Transformer le hub en passerelle : liens vers pages match, pronostic et cote champion."
  if clicks > 0:
    return "Page assistante : garder le maillage et attendre les conversions avec aff_var canonique."
  return "Surveillance : pas d'action urgente tant que trafic/clics restent faibles."


def build_payload(args: argparse.Namespace) -> dict[str, Any]:
  now = datetime.now(timezone.utc)
  ga4_latest = read_json(Path(args.ga4))
  gaff_summary = read_json(Path(args.gaff))
  seo = read_json(Path(args.seo_affiliation))
  search_summary = read_json(Path(args.search_summary))
  ga4_clicks = query_ga4_clicks(Path(args.ga4_env), ga4_latest, args.row_limit)
  legacy_conversions = build_legacy_conversion_map(gaff_summary)
  records = merge_records(
    ga4_latest=ga4_latest,
    seo=seo,
    ga4_clicks=ga4_clicks,
    legacy_conversions=legacy_conversions,
  )

  custom_registered = all(
    item.get("registered") for item in (ga4_clicks.get("custom_dimensions") or {}).values()
  )
  top_click_pages = [row for row in records if to_int(row.get("click_signal")) > 0][:20]
  traffic_without_clicks = [
    row
    for row in records
    if to_int(row.get("click_signal")) == 0
    and (to_int(row.get("ga4_page_views")) >= 2500 or to_int(row.get("seo_impressions")) >= 50000)
  ][:20]
  conversion_pages = [
    row
    for row in records
    if to_int(row.get("legacy_conversions")) > 0
  ][:20]
  money_pages = [row for row in records if row.get("is_money_page")][:20]
  hub_pages = [row for row in records if row.get("is_hub_page")][:20]

  total_click_signal = sum(to_int(row.get("click_signal")) for row in records if str(row.get("path", "")).startswith("/"))
  total_legacy_conversions = to_int(gaff_summary.get("total_conversions"))
  payload = {
    "generated_at": now.isoformat(),
    "status": "ok" if ga4_clicks.get("status") == "ok" else "warning",
    "periods": {
      "ga4": ga4_clicks.get("period") or (ga4_latest.get("period") if isinstance(ga4_latest.get("period"), dict) else {}),
      "search_console": {
        "start": search_summary.get("start_date"),
        "end": search_summary.get("end_date"),
      },
      "gambling_affiliation": gaff_summary.get("period") if isinstance(gaff_summary.get("period"), dict) else {},
    },
    "inputs": {
      "ga4": str(args.ga4),
      "gaff": str(args.gaff),
      "seo_affiliation": str(args.seo_affiliation),
      "search_summary": str(args.search_summary),
    },
    "kpis": {
      "ga4_page_views": to_int((ga4_latest.get("summary") or {}).get("page_views")),
      "ga4_sessions": to_int((ga4_latest.get("summary") or {}).get("sessions")),
      "ga4_tracked_click_events": to_int((ga4_latest.get("summary") or {}).get("tracked_click_events")),
      "page_click_signal": total_click_signal,
      "gambling_conversions": total_legacy_conversions,
      "gambling_commission": round(to_float(gaff_summary.get("total_commission")), 2),
      "legacy_conversion_rate": 100.0 if total_legacy_conversions else 0.0,
      "custom_dimensions_registered": custom_registered,
    },
    "ga4_clicks": {
      "status": ga4_clicks.get("status"),
      "warnings": ga4_clicks.get("warnings") or [],
      "custom_dimensions": ga4_clicks.get("custom_dimensions") or {},
      "top_outbound_links": ga4_clicks.get("outbound_links") or [],
    },
    "sections": {
      "top_click_pages": top_click_pages,
      "traffic_without_clicks": traffic_without_clicks,
      "conversion_pages": conversion_pages,
      "money_pages": money_pages,
      "hub_pages": hub_pages,
    },
    "records": records,
    "next_actions": build_actions(custom_registered, traffic_without_clicks, conversion_pages, money_pages),
  }
  return payload


def build_actions(
  custom_registered: bool,
  traffic_without_clicks: list[dict[str, Any]],
  conversion_pages: list[dict[str, Any]],
  money_pages: list[dict[str, Any]],
) -> list[dict[str, Any]]:
  actions = []
  if not custom_registered:
    actions.append(
      {
        "priority": "P0",
        "area": "GA4",
        "target": "custom dimensions",
        "action": "Declarer aff_var, page_type, placement et affiliate_program comme dimensions personnalisees GA4 event-scoped.",
      }
    )
  if conversion_pages:
    actions.append(
      {
        "priority": "P0",
        "area": "PMU",
        "target": conversion_pages[0]["path"],
        "action": "Analyser la page deja associee aux conversions et tester une variante CTA PMU canonique.",
      }
    )
  if money_pages:
    actions.append(
      {
        "priority": "P0",
        "area": "money page",
        "target": money_pages[0]["path"],
        "action": money_pages[0]["recommended_action"],
      }
    )
  for row in traffic_without_clicks[:3]:
    actions.append(
      {
        "priority": "P1",
        "area": "traffic to PMU",
        "target": row["path"],
        "action": row["recommended_action"],
      }
    )
  return actions


def render_record_rows(rows: list[dict[str, Any]], limit: int = 10) -> list[str]:
  output = [
    "| Page | Score | Vues GA4 | Clic signal | Taux clic | SEO clics | Conv. directes | Signal famille | Action |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
  ]
  if not rows:
    output.append("| - | - | - | - | - | - | - | - | - |")
    return output
  for row in rows[:limit]:
    output.append(
      f"| `{md(row.get('path'))}` | {to_float(row.get('score')):.1f} | {to_int(row.get('ga4_page_views'))} | {to_int(row.get('click_signal'))} | {pct(to_float(row.get('click_rate')))} | {to_int(row.get('seo_clicks'))} | {to_int(row.get('legacy_conversions'))} | {to_int(row.get('family_conversion_signal'))} | {short(row.get('recommended_action'), 95)} |"
    )
  return output


def render_custom_dimensions(custom_dimensions: dict[str, Any]) -> list[str]:
  output = ["| Dimension | Statut | Detail |", "| --- | --- | --- |"]
  if not custom_dimensions:
    output.append("| - | - | - |")
    return output
  for name, item in custom_dimensions.items():
    status = "ok" if item.get("registered") else "manquante"
    detail = "declared" if item.get("registered") else short(item.get("error"), 140)
    output.append(f"| `{md(name)}` | `{status}` | {md(detail)} |")
  return output


def render_actions(actions: list[dict[str, Any]]) -> list[str]:
  output = ["| Priorite | Zone | Cible | Action |", "| --- | --- | --- | --- |"]
  if not actions:
    output.append("| - | - | - | - |")
    return output
  for action in actions:
    output.append(
      f"| `{md(action.get('priority'))}` | {md(action.get('area'))} | `{md(action.get('target'))}` | {md(action.get('action'))} |"
    )
  return output


def render_markdown(payload: dict[str, Any]) -> str:
  kpis = payload["kpis"]
  sections = payload["sections"]
  ga4_clicks = payload["ga4_clicks"]
  lines = [
    "# Attribution funnel CDM2026",
    "",
    f"Genere : {payload['generated_at']}",
    f"Statut : `{payload['status']}`",
    "",
    "## KPIs",
    "",
    "| Indicateur | Valeur |",
    "| --- | ---: |",
    f"| Sessions GA4 | {kpis['ga4_sessions']} |",
    f"| Pages vues GA4 | {kpis['ga4_page_views']} |",
    f"| Events clic GA4 detectes | {kpis['ga4_tracked_click_events']} |",
    f"| Signal clic page estime | {kpis['page_click_signal']} |",
    f"| Conversions Gambling | {kpis['gambling_conversions']} |",
    f"| Commission potentielle | {eur(kpis['gambling_commission'])} |",
    f"| Custom dimensions GA4 declarees | {'oui' if kpis['custom_dimensions_registered'] else 'non'} |",
    "",
    "## Limite attribution",
    "",
    "GA4 collecte les evenements `affiliate_click` et les clics sortants PMU, mais les dimensions custom event-scoped doivent etre declarees dans GA4 pour attribuer finement par `aff_var`, page type et placement.",
    "",
    *render_custom_dimensions(ga4_clicks.get("custom_dimensions") or {}),
    "",
    "## Pages avec signal clic PMU",
    "",
    *render_record_rows(sections["top_click_pages"], 12),
    "",
    "## Fort trafic sans signal clic PMU",
    "",
    *render_record_rows(sections["traffic_without_clicks"], 12),
    "",
    "## Pages associees aux conversions",
    "",
    *render_record_rows(sections["conversion_pages"], 12),
    "",
    "## Pages money",
    "",
    *render_record_rows(sections["money_pages"], 12),
    "",
    "## Hubs a convertir",
    "",
    *render_record_rows(sections["hub_pages"], 12),
    "",
    "## Prochaines actions",
    "",
    *render_actions(payload["next_actions"]),
    "",
  ]
  return "\n".join(lines)


def summary_payload(payload: dict[str, Any]) -> dict[str, Any]:
  sections = payload["sections"]
  return {
    "generated_at": payload["generated_at"],
    "status": payload["status"],
    "periods": payload["periods"],
    "kpis": payload["kpis"],
    "warnings": payload["ga4_clicks"].get("warnings") or [],
    "top_click_pages": [
      {
        "path": row["path"],
        "click_signal": row["click_signal"],
        "ga4_page_views": row["ga4_page_views"],
        "click_rate": row["click_rate"],
      }
      for row in sections["top_click_pages"][:8]
    ],
    "traffic_without_clicks": [
      {
        "path": row["path"],
        "ga4_page_views": row["ga4_page_views"],
        "seo_impressions": row["seo_impressions"],
      }
      for row in sections["traffic_without_clicks"][:8]
    ],
    "next_actions": payload["next_actions"][:8],
  }


def write_outputs(payload: dict[str, Any], output_dir: Path) -> dict[str, str]:
  output_dir.mkdir(parents=True, exist_ok=True)
  (output_dir / "json").mkdir(parents=True, exist_ok=True)
  (output_dir / "reports").mkdir(parents=True, exist_ok=True)
  stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
  json_path = output_dir / "json" / f"attribution_funnel_{stamp}.json"
  md_path = output_dir / "reports" / f"attribution_funnel_{stamp}.md"
  summary_path = output_dir / "latest.summary.json"
  latest_json = output_dir / "latest.json"
  latest_md = output_dir / "latest.md"
  json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
  md_path.write_text(render_markdown(payload), encoding="utf-8")
  latest_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
  latest_md.write_text(render_markdown(payload), encoding="utf-8")
  summary_path.write_text(json.dumps(summary_payload(payload), ensure_ascii=False, indent=2), encoding="utf-8")
  shutil.copy2(summary_path, output_dir / "json" / f"attribution_funnel_summary_{stamp}.json")
  return {
    "json": str(json_path),
    "markdown": str(md_path),
    "latest_json": str(latest_json),
    "latest_markdown": str(latest_md),
    "latest_summary": str(summary_path),
  }


def main() -> int:
  parser = argparse.ArgumentParser(description=__doc__)
  parser.add_argument("--ga4-env", default=str(DEFAULT_ENV_PATH))
  parser.add_argument("--ga4", default=str(DEFAULT_GA4))
  parser.add_argument("--gaff", default=str(DEFAULT_GAFF))
  parser.add_argument("--seo-affiliation", default=str(DEFAULT_SEO_AFFILIATION))
  parser.add_argument("--search-summary", default=str(DEFAULT_SEARCH_SUMMARY))
  parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
  parser.add_argument("--row-limit", type=int, default=10000)
  args = parser.parse_args()

  payload = build_payload(args)
  files = write_outputs(payload, Path(args.output_dir))
  print(
    json.dumps(
      {
        "status": payload["status"],
        "generated_at": payload["generated_at"],
        "click_signal": payload["kpis"]["page_click_signal"],
        "custom_dimensions_registered": payload["kpis"]["custom_dimensions_registered"],
        "files": files,
      },
      ensure_ascii=False,
      indent=2,
    )
  )
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
