#!/usr/bin/env python3
"""Build a Search Console x Gambling Affiliation opportunity report.

The script is intentionally dependency-free so it can run on the production
server after the existing Search Console and Gambling Affiliation exports.
It does not call external APIs.
"""

from __future__ import annotations

import argparse
import csv
import json
import math
import os
import re
import shutil
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


DEFAULT_SEARCH_CONSOLE_CSV = Path("/srv/cdm2026/shared/search-console/latest.query_page.csv")
DEFAULT_SEARCH_CONSOLE_SUMMARY = Path("/srv/cdm2026/shared/search-console/latest.summary.json")
DEFAULT_GAMBLING_CSV = Path("/srv/cdm2026/shared/gambling-affiliation/latest.csv")
DEFAULT_GAMBLING_SUMMARY = Path("/srv/cdm2026/shared/gambling-affiliation/latest.summary.json")
DEFAULT_OUTPUT_DIR = Path("/srv/cdm2026/shared/seo-affiliation")

MONEY_TOKENS = {
  "cote": 4,
  "cotes": 4,
  "pari": 4,
  "paris": 4,
  "parier": 4,
  "bookmaker": 4,
  "bookmakers": 4,
  "bonus": 4,
  "pmu": 4,
  "vainqueur": 3,
  "champion": 3,
  "pronostic": 3,
  "pronostics": 3,
  "score exact": 3,
  "qualification": 2,
  "tableau": 2,
  "bracket": 2,
  "compo": 1,
  "composition": 1,
  "joueurs": 1,
  "effectif": 1,
}

ROUND_TERMS = [
  "16e",
  "16es",
  "8e",
  "8es",
  "quart",
  "quarts",
  "demi",
  "finale",
]

PROMPT_PATTERNS = [
  "tu es expert",
  "json valide",
  "sans markdown",
  "format:",
  "reponds uniquement",
]

PARASITE_PATTERNS = [
  "casino",
  "casinocyrille",
  "casinotricolore",
  "dexsport",
  ".vip",
  ".org",
]


@dataclass(frozen=True)
class ConversionBucket:
  count: int = 0
  cpl: int = 0
  cpa: int = 0
  commission: float = 0.0


def read_json(path: Path) -> dict[str, Any]:
  if not path.exists():
    return {}
  try:
    return json.loads(path.read_text(encoding="utf-8"))
  except json.JSONDecodeError:
    return {}


def read_csv(path: Path) -> list[dict[str, str]]:
  if not path.exists():
    return []
  with path.open(newline="", encoding="utf-8") as handle:
    return list(csv.DictReader(handle))


def to_float(value: Any, default: float = 0.0) -> float:
  try:
    if value in (None, ""):
      return default
    return float(value)
  except (TypeError, ValueError):
    return default


def to_int(value: Any, default: int = 0) -> int:
  try:
    if value in (None, ""):
      return default
    return int(float(value))
  except (TypeError, ValueError):
    return default


def slug_from_path(path: str, prefix: str) -> str:
  if not path.startswith(prefix):
    return ""
  return path[len(prefix) :].strip("/").split("/")[0]


def normalize_query(value: str) -> str:
  return " ".join(value.lower().strip().split())


def query_money_score(query: str, page_path: str) -> int:
  haystack = f"{normalize_query(query)} {page_path.lower()}"
  score = 0
  for token, weight in MONEY_TOKENS.items():
    if token in haystack:
      score += weight
  if any(term in haystack for term in ROUND_TERMS):
    score += 1
  return min(score, 12)


def anomaly_flags(query: str) -> list[str]:
  normalized = normalize_query(query)
  flags = []
  if any(pattern in normalized for pattern in PROMPT_PATTERNS):
    flags.append("possible_prompt_leak")
  if any(pattern in normalized for pattern in PARASITE_PATTERNS):
    flags.append("parasite_serp_query")
  return flags


def expected_ctr(position: float) -> float:
  if position <= 1.5:
    return 0.28
  if position <= 2.5:
    return 0.16
  if position <= 3.5:
    return 0.10
  if position <= 4.5:
    return 0.07
  if position <= 5.5:
    return 0.05
  if position <= 6.5:
    return 0.035
  if position <= 7.5:
    return 0.026
  if position <= 8.5:
    return 0.020
  if position <= 9.5:
    return 0.017
  if position <= 10.5:
    return 0.014
  if position <= 20:
    return 0.010
  return 0.004


def page_info(url: str) -> dict[str, Any]:
  parsed = urlparse(url)
  path = parsed.path or "/"
  if not path.startswith("/"):
    path = "/" + path

  info = {
    "url": url,
    "path": path,
    "page_type": "info",
    "conversion_family": "info",
    "direct_key": "",
    "related_key": "",
    "page_fit": 1,
    "action": "Enrichir le contenu et ajouter un lien interne vers une page money pertinente.",
  }

  if path == "/":
    info.update(
      page_type="homepage",
      conversion_family="homepage",
      direct_key="homepage:/",
      page_fit=3,
      action="Conserver les entrees SEO fortes et pousser vers tableau, pronostic vainqueur et pages cote champion.",
    )
    return info

  if path.startswith("/cote-champion/"):
    slug = slug_from_path(path, "/cote-champion/")
    info.update(
      page_type="cote_champion",
      conversion_family="cote_champion",
      direct_key=f"cote_champion:{slug}",
      page_fit=5,
      action="Priorite money : renforcer title, intro, FAQ, odds copy et CTA PMU au-dessus de la ligne de flottaison.",
    )
    return info

  if path.startswith("/pronostic-match/"):
    slug = slug_from_path(path, "/pronostic-match/")
    info.update(
      page_type="pronostic_match",
      conversion_family="match",
      direct_key=f"pronostic_match:{slug}",
      page_fit=5,
      action="Page money match : optimiser title/meta, odds block, score exact et CTA avec aff_var du slug.",
    )
    return info

  if path.startswith("/match/"):
    slug = slug_from_path(path, "/match/")
    family = "calendar" if slug == "calendrier" else "match"
    info.update(
      page_type="calendar" if slug == "calendrier" else "match",
      conversion_family=family,
      direct_key=f"match:{slug}" if slug != "calendrier" else "calendar:/match/calendrier",
      page_fit=3 if slug == "calendrier" else 4,
      action="Ajouter un pont clair vers pronostic match, score exact et CTA pari contextualise.",
    )
    return info

  match_support_prefixes = [
    "/score-exact/",
    "/compos-officielles/",
    "/sur-quelle-chaine/",
    "/corners/",
    "/arbitre/",
    "/hors-jeu/",
    "/possession/",
    "/h2h/",
  ]
  for prefix in match_support_prefixes:
    if path.startswith(prefix):
      slug = slug_from_path(path, prefix)
      info.update(
        page_type=prefix.strip("/").replace("/", "_"),
        conversion_family="match",
        direct_key=f"support_match:{slug}",
        page_fit=3,
        action="Transformer le trafic info match en clics vers pronostic match et score exact avec blocs internes visibles.",
      )
      return info

  if path in {"/tableau", "/simulateur"} or path.startswith("/tableau/"):
    info.update(
      page_type="bracket",
      conversion_family="cote_champion",
      direct_key=f"bracket:{path}",
      page_fit=4,
      action="Relier fortement vers pronostic vainqueur, cote champion et prochains matchs de phase finale.",
    )
    return info

  if path.startswith("/effectif/"):
    slug = slug_from_path(path, "/effectif/")
    info.update(
      page_type="team_profile",
      conversion_family="cote_champion",
      direct_key=f"team_profile:{slug}",
      related_key=f"cote_champion:{slug}",
      page_fit=3,
      action="Ajouter un bloc discret cote vainqueur / parcours de l'equipe et liens vers groupe, matchs, pronostics.",
    )
    return info

  if path.startswith("/joueurs/equipe/"):
    slug = slug_from_path(path, "/joueurs/equipe/")
    info.update(
      page_type="team_players",
      conversion_family="cote_champion",
      direct_key=f"team_players:{slug}",
      related_key=f"cote_champion:{slug}",
      page_fit=2,
      action="Exploiter le trafic joueurs avec liens vers effectif, cote champion et prochains matchs de l'equipe.",
    )
    return info

  if path == "/joueurs" or path.startswith("/joueurs/"):
    info.update(
      page_type="players_index",
      conversion_family="cote_champion",
      direct_key="players:index",
      page_fit=2,
      action="Creer des entrees par equipe et un module vers favoris/vainqueur pour capter le trafic massif joueurs.",
    )
    return info

  if path.startswith("/groupe/"):
    group = slug_from_path(path, "/groupe/")
    info.update(
      page_type="group",
      conversion_family="match",
      direct_key=f"group:{group}",
      page_fit=3,
      action="Ajouter scenarios, liens matchs/pronostics et CTA qualification/vainqueur contextualises.",
    )
    return info

  if path in {"/paris-sportifs", "/meilleurs-bookmakers"} or path.startswith("/bookmaker/"):
    info.update(
      page_type="bookmakers",
      conversion_family="bookmakers",
      direct_key=f"bookmakers:{path}",
      page_fit=5,
      action="Priorite affiliation : nettoyer SERP parasite, renforcer comparatif, bonus, confiance et tracking CTA.",
    )
    return info

  if path.startswith("/actualites/"):
    info.update(
      page_type="article",
      conversion_family="bookmakers" if "pari" in path or "bonus" in path else "info",
      direct_key=f"article:{slug_from_path(path, '/actualites/')}",
      page_fit=2,
      action="Ajouter angle original, liens internes vers pages money et CTA seulement si l'intention est betting.",
    )
    return info

  return info


def aff_var_to_keys(raw_aff_var: str) -> tuple[str, str]:
  aff_var = (raw_aff_var or "").strip()
  if not aff_var:
    return "unknown", "unknown"

  # Format canonique actuel "pageType--slug--placement" ; ":" garde pour
  # les conversions historiques anterieures au fix du 2026-07-02.
  canonical_parts = aff_var.split("--") if "--" in aff_var else aff_var.split(":")
  if len(canonical_parts) >= 2:
    page_type = canonical_parts[0]
    slug = canonical_parts[1]
    if page_type == "cote-champion":
      return "cote_champion", f"cote_champion:{slug}"
    if page_type in {"pronostic-match", "match"}:
      return "match", f"{page_type.replace('-', '_')}:{slug}"
    if page_type == "homepage":
      return "homepage", "homepage:/"
    if page_type in {"bookmaker", "paris-sportifs", "meilleurs-bookmakers"}:
      return "bookmakers", f"bookmakers:{slug}"
    if page_type == "global":
      return "global", "global"

  legacy = aff_var.lower()
  if legacy in {"cdm2026", "homepage"}:
    return "homepage", "homepage:/"
  if legacy in {"popup", "global-footer"}:
    return "global", "global"
  if legacy == "cote-champion-portugal":
    return "cote_champion", "cote_champion:portugal"
  if legacy == "cote-champion-france":
    return "cote_champion", "cote_champion:france"
  if legacy in {"cote-champion", "prono-vainqueur"}:
    return "cote_champion", "cote_champion:generic"
  if legacy.startswith("match"):
    return "match", "match:generic"
  if legacy in {"bookmakers", "bonus"}:
    return "bookmakers", "bookmakers:generic"
  return "other", legacy


def add_bucket(target: dict[str, dict[str, float]], key: str, row: dict[str, str]) -> None:
  bucket = target.setdefault(key, {"count": 0, "cpl": 0, "cpa": 0, "commission": 0.0})
  bucket["count"] += 1
  row_type = (row.get("type") or "").lower()
  if row_type == "cpl":
    bucket["cpl"] += 1
  if row_type == "cpa":
    bucket["cpa"] += 1
  bucket["commission"] += to_float(row.get("commission"))


def build_conversion_indexes(rows: list[dict[str, str]]) -> dict[str, Any]:
  by_family: dict[str, dict[str, float]] = {}
  by_direct: dict[str, dict[str, float]] = {}
  by_aff_var: dict[str, dict[str, float]] = {}
  non_canonical = 0
  empty_count = 0

  for row in rows:
    aff_var = (row.get("aff_var_normalized") or row.get("aff_var") or "").strip()
    if not aff_var:
      empty_count += 1
    if (row.get("is_canonical_aff_var") or "").lower() not in {"true", "1", "yes"}:
      non_canonical += 1
    family, direct = aff_var_to_keys(aff_var)
    add_bucket(by_family, family, row)
    add_bucket(by_direct, direct, row)
    add_bucket(by_aff_var, aff_var or "(empty)", row)

  return {
    "by_family": by_family,
    "by_direct": by_direct,
    "by_aff_var": by_aff_var,
    "non_canonical_count": non_canonical,
    "empty_count": empty_count,
    "total": len(rows),
  }


def bucket_value(bucket: dict[str, float] | None, field: str) -> float:
  if not bucket:
    return 0.0
  return float(bucket.get(field, 0.0) or 0.0)


def score_row(row: dict[str, str], conversions: dict[str, Any]) -> dict[str, Any]:
  url = row.get("page", "")
  info = page_info(url)
  query = row.get("query", "")
  clicks = to_int(row.get("clicks"))
  impressions = to_int(row.get("impressions"))
  ctr = to_float(row.get("ctr"))
  position = to_float(row.get("position"), 99.0)

  target_ctr = expected_ctr(position)
  potential_clicks = max(0.0, (target_ctr * impressions) - clicks)
  money_intent = query_money_score(query, info["path"])
  flags = anomaly_flags(query)

  direct_bucket = conversions["by_direct"].get(info["direct_key"])
  related_bucket = conversions["by_direct"].get(info.get("related_key", ""))
  family_bucket = conversions["by_family"].get(info["conversion_family"])

  direct_commission = bucket_value(direct_bucket, "commission")
  related_commission = bucket_value(related_bucket, "commission")
  family_commission = bucket_value(family_bucket, "commission")
  direct_conversions = bucket_value(direct_bucket, "count")
  related_conversions = bucket_value(related_bucket, "count")
  family_conversions = bucket_value(family_bucket, "count")

  conversion_signal = (
    direct_commission * 1.0
    + related_commission * 0.8
    + family_commission * 0.25
    + direct_conversions * 12
    + related_conversions * 9
    + family_conversions * 2
  )

  position_boost = 0.0
  if 4 <= position <= 12:
    position_boost = 15 - position
  elif 12 < position <= 20:
    position_boost = 3

  seo_score = (
    min(20.0, math.log1p(impressions) / math.log(1_000_000) * 20.0)
    + min(15.0, min(potential_clicks, 5000) / 5000 * 15.0)
  )
  intent_score = min(25.0, money_intent / 12 * 25.0)
  fit_score = min(15.0, int(info["page_fit"]) / 5 * 15.0)
  conversion_score = min(20.0, math.log1p(conversion_signal) / math.log1p(250) * 20.0)
  position_score = min(5.0, max(position_boost, 0.0) / 11 * 5.0)
  score = seo_score + intent_score + fit_score + conversion_score + position_score

  return {
    "score": round(min(score, 100.0), 2),
    "score_parts": {
      "seo": round(seo_score, 2),
      "intent": round(intent_score, 2),
      "fit": round(fit_score, 2),
      "conversion": round(conversion_score, 2),
      "position": round(position_score, 2),
    },
    "query": query,
    "page": url,
    "path": info["path"],
    "page_type": info["page_type"],
    "conversion_family": info["conversion_family"],
    "clicks": clicks,
    "impressions": impressions,
    "ctr": ctr,
    "ctr_pct": round(ctr * 100, 2),
    "position": round(position, 2),
    "expected_ctr_pct": round(target_ctr * 100, 2),
    "potential_clicks": int(round(potential_clicks)),
    "money_intent": money_intent,
    "anomaly_flags": flags,
    "is_anomaly": bool(flags),
    "page_fit": info["page_fit"],
    "direct_conversions": int(direct_conversions),
    "family_conversions": int(family_conversions),
    "direct_commission": round(direct_commission, 2),
    "family_commission": round(family_commission, 2),
    "action": info["action"],
  }


def rollup_pages(records: list[dict[str, Any]]) -> list[dict[str, Any]]:
  grouped: dict[str, dict[str, Any]] = {}
  for record in records:
    key = record["page"]
    item = grouped.setdefault(
      key,
      {
        "page": record["page"],
        "path": record["path"],
        "page_type": record["page_type"],
        "conversion_family": record["conversion_family"],
        "clicks": 0,
        "impressions": 0,
        "weighted_position": 0.0,
        "potential_clicks": 0,
        "max_score": 0.0,
        "money_intent": 0,
        "query_count": 0,
        "top_queries": [],
        "action": record["action"],
        "family_conversions": record["family_conversions"],
        "family_commission": record["family_commission"],
        "direct_conversions": record["direct_conversions"],
        "direct_commission": record["direct_commission"],
      },
    )
    item["clicks"] += record["clicks"]
    item["impressions"] += record["impressions"]
    item["weighted_position"] += record["position"] * max(record["impressions"], 1)
    item["potential_clicks"] += record["potential_clicks"]
    item["max_score"] = max(item["max_score"], record["score"])
    item["money_intent"] = max(item["money_intent"], record["money_intent"])
    item["query_count"] += 1
    item["top_queries"].append(
      {
        "query": record["query"],
        "score": record["score"],
        "impressions": record["impressions"],
        "clicks": record["clicks"],
      },
    )

  rollups = []
  for item in grouped.values():
    impressions = max(int(item["impressions"]), 1)
    item["avg_position"] = round(float(item["weighted_position"]) / impressions, 2)
    item["ctr_pct"] = round(float(item["clicks"]) / impressions * 100, 2)
    item["top_queries"] = sorted(
      item["top_queries"],
      key=lambda row: (row["score"], row["impressions"]),
      reverse=True,
    )[:5]
    traffic_score = min(25.0, math.log1p(item["impressions"]) / math.log(1_000_000) * 25.0)
    potential_score = min(20.0, min(item["potential_clicks"], 10000) / 10000 * 20.0)
    query_score = min(25.0, item["max_score"] * 0.35)
    intent_score = min(15.0, item["money_intent"] / 12 * 15.0)
    conversion_score = min(15.0, math.log1p(item["family_commission"] + item["family_conversions"] * 15) / math.log1p(350) * 15.0)
    item["page_score"] = round(
      min(100.0, traffic_score + potential_score + query_score + intent_score + conversion_score),
      2,
    )
    item.pop("weighted_position", None)
    rollups.append(item)
  return sorted(rollups, key=lambda row: row["page_score"], reverse=True)


def find_anomalies(records: list[dict[str, Any]]) -> dict[str, list[dict[str, Any]]]:
  prompt_leaks = []
  parasite_queries = []
  for record in records:
    flags = record.get("anomaly_flags", [])
    if "possible_prompt_leak" in flags:
      prompt_leaks.append(record)
    if "parasite_serp_query" in flags:
      parasite_queries.append(record)

  return {
    "possible_prompt_leaks": sorted(
      prompt_leaks,
      key=lambda row: (row["impressions"], row["score"]),
      reverse=True,
    )[:25],
    "parasite_serp_queries": sorted(
      parasite_queries,
      key=lambda row: (row["impressions"], row["score"]),
      reverse=True,
    )[:25],
  }


def ga4_status() -> dict[str, Any]:
  candidates = [
    Path("/etc/cdm2026/google-analytics.env"),
    Path("/etc/cdm2026/ga4.env"),
    Path("/etc/cdm2026/google-analytics-service-account.json"),
    Path("/etc/cdm2026/ga4-service-account.json"),
  ]
  existing = [str(path) for path in candidates if path.exists()]
  return {
    "connected": bool(existing),
    "files_detected": existing,
    "note": (
      "GA4 credentials detected; extend this report with landingPage/sessionSource/affiliate_click exports."
      if existing
      else "No production GA4 credentials detected in /etc/cdm2026. Current report uses Search Console and Gambling Affiliation only."
    ),
  }


def ensure_output_dirs(base: Path) -> dict[str, Path]:
  dirs = {
    "base": base,
    "reports": base / "reports",
    "json": base / "json",
    "csv": base / "csv",
  }
  for directory in dirs.values():
    directory.mkdir(parents=True, exist_ok=True)
  return dirs


def md_escape(value: Any) -> str:
  return str(value).replace("|", "\\|").replace("\n", " ").strip()


def fmt_eur(value: float) -> str:
  return f"{value:.2f} EUR"


def short_path(page: str) -> str:
  parsed = urlparse(page)
  return parsed.path or page


def write_ranked_csv(path: Path, records: list[dict[str, Any]]) -> None:
  fields = [
    "score",
    "query",
    "path",
    "page_type",
    "clicks",
    "impressions",
    "ctr_pct",
    "position",
    "expected_ctr_pct",
    "potential_clicks",
    "money_intent",
    "family_conversions",
    "family_commission",
    "direct_conversions",
    "direct_commission",
    "action",
    "page",
  ]
  with path.open("w", newline="", encoding="utf-8") as handle:
    writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
    writer.writeheader()
    for record in records:
      writer.writerow(record)


def table_rows(records: list[dict[str, Any]], limit: int) -> list[str]:
  rows = []
  for record in records[:limit]:
    rows.append(
      "| "
      + " | ".join(
        [
          md_escape(record["score"]),
          md_escape(record["query"][:90]),
          md_escape(short_path(record["page"])),
          md_escape(record["impressions"]),
          md_escape(record["clicks"]),
          md_escape(f"{record['ctr_pct']:.2f}%"),
          md_escape(record["position"]),
          md_escape(record["potential_clicks"]),
          md_escape(record["money_intent"]),
          md_escape(record["family_conversions"]),
          md_escape(fmt_eur(float(record["family_commission"]))),
          md_escape(record["action"][:100]),
        ],
      )
      + " |",
    )
  return rows


def page_rows(records: list[dict[str, Any]], limit: int) -> list[str]:
  rows = []
  for record in records[:limit]:
    top_queries = ", ".join(q["query"] for q in record["top_queries"][:3])
    rows.append(
      "| "
      + " | ".join(
        [
          md_escape(record["page_score"]),
          md_escape(record["path"]),
          md_escape(record["page_type"]),
          md_escape(record["impressions"]),
          md_escape(record["clicks"]),
          md_escape(f"{record['ctr_pct']:.2f}%"),
          md_escape(record["avg_position"]),
          md_escape(record["potential_clicks"]),
          md_escape(record["family_conversions"]),
          md_escape(fmt_eur(float(record["family_commission"]))),
          md_escape(top_queries[:120]),
        ],
      )
      + " |",
    )
  return rows


def build_markdown(payload: dict[str, Any]) -> str:
  summary = payload["summary"]
  conversions = payload["conversions"]
  ga4 = payload["ga4"]
  top = payload["top_opportunities"]
  money = payload["money_opportunities"]
  traffic = payload["traffic_to_money"]
  page_rollups = payload["page_rollups"]
  anomalies = payload["anomalies"]

  lines = [
    "# SEO x affiliation - priorites business CDM2026",
    "",
    f"Generated at: {summary['generated_at']}",
    f"Search Console period: {summary.get('search_console_period', 'unknown')}",
    f"Gambling Affiliation period: {summary.get('gambling_period', 'unknown')}",
    "",
    "## Synthese",
    "",
    f"- Search Console clicks: {summary.get('search_clicks', 0)}",
    f"- Search Console impressions: {summary.get('search_impressions', 0)}",
    f"- Query/page rows analysed: {summary.get('query_page_rows', 0)}",
    f"- Rows kept for business scoring: {summary.get('rows_scored_excluding_anomalies', 0)}",
    f"- Search Console anomaly rows isolated: {summary.get('anomaly_count', 0)}",
    f"- Gambling conversions: {conversions.get('total', 0)}",
    f"- Gambling commission potential: {fmt_eur(float(summary.get('gambling_commission', 0.0)))}",
    f"- Non canonical / legacy aff_var rows: {conversions.get('non_canonical_count', 0)}",
    f"- Empty aff_var rows: {conversions.get('empty_count', 0)}",
    f"- GA4 status: {ga4['note']}",
    "",
    "## Ce que ca veut dire",
    "",
    "- Les conversions connues confirment que les familles `cote champion`, `homepage` et `match/pronostic` peuvent monetiser.",
    "- Les anciens `aff_var` generiques limitent l'attribution fine page par page ; le nouveau tracking canonique corrigera cela sur les prochaines conversions.",
    "- Sans export GA4 production, ce rapport priorise avec Search Console + conversions Gambling, mais ne voit pas encore les sessions, sources et clics CTA par landing page.",
    "",
    "## Top opportunites combinees",
    "",
    "| Score | Requete | Page | Impr. | Clics | CTR | Pos. | Clics potentiels | Intent | Conv famille | Comm. famille | Action |",
    "| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
    *table_rows(top, 25),
    "",
    "## Opportunites money directes",
    "",
    "| Score | Requete | Page | Impr. | Clics | CTR | Pos. | Clics potentiels | Intent | Conv famille | Comm. famille | Action |",
    "| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
    *table_rows(money, 20),
    "",
    "## Gros trafic a convertir par maillage interne",
    "",
    "| Score | Requete | Page | Impr. | Clics | CTR | Pos. | Clics potentiels | Intent | Conv famille | Comm. famille | Action |",
    "| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
    *table_rows(traffic, 20),
    "",
    "## Pages prioritaires",
    "",
    "| Score page | Page | Type | Impr. | Clics | CTR | Pos. moy. | Clics potentiels | Conv famille | Comm. famille | Requetes cles |",
    "| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
    *page_rows(page_rollups, 25),
    "",
    "## Anomalies Search Console a traiter",
    "",
    "### Requetes qui ressemblent a des prompts indexes",
    "",
    "| Score | Requete | Page | Impr. | Clics | Pos. | Action |",
    "| ---: | --- | --- | ---: | ---: | ---: | --- |",
    *[
      f"| {row['score']} | {md_escape(row['query'][:120])} | {md_escape(row['path'])} | {row['impressions']} | {row['clicks']} | {row['position']} | Auditer le contenu public et supprimer toute trace de prompt/instruction interne. |"
      for row in anomalies["possible_prompt_leaks"][:10]
    ],
    "",
    "### Requetes parasites casino/bookmakers externes",
    "",
    "| Score | Requete | Page | Impr. | Clics | Pos. | Action |",
    "| ---: | --- | --- | ---: | ---: | ---: | --- |",
    *[
      f"| {row['score']} | {md_escape(row['query'][:120])} | {md_escape(row['path'])} | {row['impressions']} | {row['clicks']} | {row['position']} | Recentrer title/meta/contenu et surveiller les ancres ou contenus parasites. |"
      for row in anomalies["parasite_serp_queries"][:10]
    ],
    "",
    "## Conversions par famille",
    "",
    "| Famille | Conversions | CPL | CPA | Commission |",
    "| --- | ---: | ---: | ---: | ---: |",
  ]

  for family, bucket in sorted(
    conversions["by_family"].items(),
    key=lambda item: (item[1].get("commission", 0), item[1].get("count", 0)),
    reverse=True,
  ):
    lines.append(
      f"| `{md_escape(family)}` | {int(bucket.get('count', 0))} | {int(bucket.get('cpl', 0))} | {int(bucket.get('cpa', 0))} | {fmt_eur(float(bucket.get('commission', 0.0)))} |",
    )

  lines.extend(
    [
      "",
      "## Actions recommandees",
      "",
      "1. Prioriser les pages `/cote-champion/france` et `/cote-champion/portugal` : elles ont deja de l'intention money et des conversions.",
      "2. Transformer `/joueurs`, `/effectif/*`, `/compos-officielles/*` et `/tableau` en tunnels vers pages money avec modules contextuels.",
      "3. Sur les pages match/support, placer des liens visibles vers `/pronostic-match/<slug>` et `/score-exact/<slug>` avec tracking canonique.",
    "4. Nettoyer les requetes parasites autour de `casino...` sur `/paris-sportifs` avec title/meta/contenu plus stricts et monitoring Search Console.",
      "5. Auditer les URLs remontees dans la section anomalies pour retirer toute trace de prompt IA ou de contenu parasite.",
      "6. Brancher GA4 production pour mesurer `landingPage + sessionSource + affiliate_click + aff_var` et fermer la boucle SEO -> clic -> conversion.",
    ],
  )

  return "\n".join(lines) + "\n"


def main() -> int:
  parser = argparse.ArgumentParser()
  parser.add_argument("--search-console-csv", default=str(DEFAULT_SEARCH_CONSOLE_CSV))
  parser.add_argument("--search-console-summary", default=str(DEFAULT_SEARCH_CONSOLE_SUMMARY))
  parser.add_argument("--gambling-csv", default=str(DEFAULT_GAMBLING_CSV))
  parser.add_argument("--gambling-summary", default=str(DEFAULT_GAMBLING_SUMMARY))
  parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
  parser.add_argument("--min-impressions", type=int, default=25)
  args = parser.parse_args()

  search_rows_raw = read_csv(Path(args.search_console_csv))
  gambling_rows = read_csv(Path(args.gambling_csv))
  search_summary = read_json(Path(args.search_console_summary))
  gambling_summary = read_json(Path(args.gambling_summary))

  if not search_rows_raw:
    raise SystemExit(f"No Search Console rows found at {args.search_console_csv}")

  conversions = build_conversion_indexes(gambling_rows)
  scored = [
    score_row(row, conversions)
    for row in search_rows_raw
    if to_int(row.get("impressions")) >= args.min_impressions
  ]
  scored.sort(key=lambda row: row["score"], reverse=True)
  clean_scored = [row for row in scored if not row["is_anomaly"]]

  money = [
    row
    for row in clean_scored
    if row["money_intent"] >= 5 or row["page_type"] in {"cote_champion", "pronostic_match", "bookmakers"}
  ]
  traffic_to_money = [
    row
    for row in clean_scored
    if row["page_type"] in {"players_index", "team_players", "team_profile", "bracket", "calendar", "compos-officielles", "article"}
    and row["impressions"] >= 500
  ]

  page_rollups = rollup_pages(clean_scored)
  anomalies = find_anomalies(scored)
  output_dirs = ensure_output_dirs(Path(args.output_dir))
  now = datetime.now(timezone.utc)
  stamp = now.strftime("%Y%m%d-%H%M%S")

  total_commission = sum(float(row.get("commission", 0.0) or 0.0) for row in conversions["by_family"].values())
  payload = {
    "summary": {
      "generated_at": now.isoformat(),
      "search_console_period": (
        f"{search_summary.get('start_date')} -> {search_summary.get('end_date')}"
        if search_summary
        else "unknown"
      ),
      "gambling_period": (
        f"{gambling_summary.get('period', {}).get('start')} -> {gambling_summary.get('period', {}).get('end')}"
        if gambling_summary
        else "unknown"
      ),
      "search_clicks": search_summary.get("total_clicks", 0),
      "search_impressions": search_summary.get("total_impressions", 0),
      "query_page_rows": len(search_rows_raw),
      "rows_scored": len(scored),
      "rows_scored_excluding_anomalies": len(clean_scored),
      "anomaly_count": len(scored) - len(clean_scored),
      "gambling_commission": round(total_commission, 2),
    },
    "ga4": ga4_status(),
    "conversions": conversions,
    "top_opportunities": clean_scored[:100],
    "money_opportunities": money[:100],
    "traffic_to_money": traffic_to_money[:100],
    "page_rollups": page_rollups[:100],
    "anomalies": anomalies,
  }

  json_path = output_dirs["json"] / f"seo_affiliation_{stamp}.json"
  md_path = output_dirs["reports"] / f"seo_affiliation_{stamp}.md"
  csv_path = output_dirs["csv"] / f"seo_affiliation_{stamp}.csv"

  json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
  md_path.write_text(build_markdown(payload), encoding="utf-8")
  write_ranked_csv(csv_path, clean_scored[:1000])

  shutil.copy2(json_path, output_dirs["base"] / "latest.json")
  shutil.copy2(md_path, output_dirs["base"] / "latest.md")
  shutil.copy2(csv_path, output_dirs["base"] / "latest.csv")

  print(
    json.dumps(
      {
        "status": "ok",
        "generated_at": payload["summary"]["generated_at"],
        "output_dir": str(output_dirs["base"]),
        "rows_scored": len(scored),
        "top_score": clean_scored[0]["score"] if clean_scored else 0,
        "ga4_connected": payload["ga4"]["connected"],
      },
      indent=2,
    ),
  )
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
