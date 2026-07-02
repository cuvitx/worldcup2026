#!/usr/bin/env python3
"""Build daily editorial briefs from Search Console and affiliation exports.

The goal is not to scrape or rewrite third-party news. This script turns
existing first-party signals into original content briefs with internal links
and conversion-aware CTA placement.
"""

from __future__ import annotations

import argparse
import csv
import json
import math
import re
import shutil
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


DEFAULT_QUERY_PAGE_CSV = Path("/srv/cdm2026/shared/search-console/latest.query_page.csv")
DEFAULT_SEARCH_SUMMARY = Path("/srv/cdm2026/shared/search-console/latest.summary.json")
DEFAULT_SEO_AFFILIATION = Path("/srv/cdm2026/shared/seo-affiliation/latest.json")
DEFAULT_GAFF_SUMMARY = Path("/srv/cdm2026/shared/gambling-affiliation/latest.summary.json")
DEFAULT_OUTPUT_DIR = Path("/srv/cdm2026/shared/editorial-engine")

MONEY_LINKS = {
  "champion": ["/cote-champion/france", "/cote-champion/portugal", "/cote-champion/bresil"],
  "players": ["/joueurs", "/cote-buteur/mbappe", "/tirs-cadres/mbappe"],
  "match": ["/pronostics", "/match/calendrier", "/paris-sportifs"],
  "phase_finale": ["/phase-finale", "/16emes-de-finale", "/tableau"],
}

SPAM_TOKENS = [
  "casino",
  "casinocyrille",
  ".vip",
  ".org",
  "bonus sans depot",
  "site de pari en ligne illegal",
]

TEAM_ALIASES = {
  "bresil": "Bresil",
  "france": "France",
  "portugal": "Portugal",
  "argentine": "Argentine",
  "allemagne": "Allemagne",
  "espagne": "Espagne",
  "angleterre": "Angleterre",
  "senegal": "Senegal",
  "uruguay": "Uruguay",
  "algerie": "Algerie",
  "maroc": "Maroc",
  "mexique": "Mexique",
  "canada": "Canada",
  "japon": "Japon",
  "ghana": "Ghana",
  "suisse": "Suisse",
  "suede": "Suede",
}


@dataclass(frozen=True)
class QueryRow:
  query: str
  page: str
  path: str
  clicks: int
  impressions: int
  ctr: float
  position: float


def read_json(path: Path) -> dict[str, Any]:
  if not path.exists():
    return {}
  try:
    data = json.loads(path.read_text(encoding="utf-8"))
  except json.JSONDecodeError:
    return {}
  return data if isinstance(data, dict) else {}


def to_int(value: Any) -> int:
  try:
    return int(float(value or 0))
  except (TypeError, ValueError):
    return 0


def to_float(value: Any) -> float:
  try:
    return float(value or 0)
  except (TypeError, ValueError):
    return 0.0


def path_from_url(value: str) -> str:
  parsed = urlparse(value)
  path = parsed.path or "/"
  return path.rstrip("/") or "/"


def normalize_text(value: str) -> str:
  value = value.lower()
  replacements = {
    "é": "e",
    "è": "e",
    "ê": "e",
    "à": "a",
    "â": "a",
    "î": "i",
    "ï": "i",
    "ô": "o",
    "ù": "u",
    "û": "u",
    "ç": "c",
    "'": " ",
    "-": " ",
  }
  for old, new in replacements.items():
    value = value.replace(old, new)
  return re.sub(r"\s+", " ", value).strip()


def read_rows(path: Path, limit: int) -> list[QueryRow]:
  if not path.exists():
    return []
  rows: list[QueryRow] = []
  with path.open(newline="", encoding="utf-8") as handle:
    reader = csv.DictReader(handle)
    for raw in reader:
      rows.append(
        QueryRow(
          query=str(raw.get("query") or "").strip(),
          page=str(raw.get("page") or "").strip(),
          path=path_from_url(str(raw.get("page") or "")),
          clicks=to_int(raw.get("clicks")),
          impressions=to_int(raw.get("impressions")),
          ctr=to_float(raw.get("ctr")),
          position=to_float(raw.get("position")),
        )
      )
      if len(rows) >= limit:
        break
  return [row for row in rows if row.query and row.path]


def classify(row: QueryRow) -> str:
  text = normalize_text(f"{row.query} {row.path}")
  if "cote d ivoire" in text or "cote divoire" in text:
    if any(token in text for token in ["joueur", "joueurs", "effectif", "liste"]):
      return "players"
    return "information"
  if any(token in text for token in ["cote", "cotes", "vainqueur", "champion", "bookmaker", "bonus", "pmu"]):
    return "champion"
  if any(token in text for token in ["joueur", "joueurs", "buteur", "tir cadre", "effectif", "liste"]):
    return "players"
  if any(token in text for token in ["pronostic", "score exact", "vs", "match nul", "pari"]):
    return "match"
  if any(token in text for token in ["tableau", "bracket", "phase finale", "16e", "8e", "quart", "demi", "finale"]):
    return "phase_finale"
  if any(token in text for token in ["calendrier", "horaire", "date", "programme"]):
    return "calendar"
  return "information"


def detect_team(query: str) -> str | None:
  text = normalize_text(query)
  for token, label in TEAM_ALIASES.items():
    if token in text:
      return label
  return None


def is_money_query(row: QueryRow) -> bool:
  text = normalize_text(row.query)
  if "cote d ivoire" in text or "cote divoire" in text:
    return False
  return classify(row) in {"champion", "match"} or any(
    token in text for token in ["pmu", "pari", "bookmaker", "bonus", "cote"]
  )


def is_spam_query(row: QueryRow) -> bool:
  text = normalize_text(row.query)
  return any(token in text for token in SPAM_TOKENS)


def score(row: QueryRow) -> float:
  ctr_pct = row.ctr * 100
  low_ctr_boost = max(0.0, 4.0 - ctr_pct) * 6.0
  impression_boost = math.log10(max(row.impressions, 1)) * 10.0
  position_boost = max(0.0, 18.0 - row.position)
  money_boost = 16.0 if is_money_query(row) else 0.0
  player_boost = 10.0 if classify(row) == "players" else 0.0
  return round(impression_boost + low_ctr_boost + position_boost + money_boost + player_boost, 2)


def target_for(row: QueryRow, topic: str) -> str:
  if topic == "match" and row.path == "/":
    return "/match/calendrier"
  if topic == "phase_finale" and row.path == "/tableau":
    return "/phase-finale"
  if topic == "calendar":
    return "/match/calendrier"
  if topic == "players" and row.path == "/":
    return "/joueurs"
  return row.path


def title_for(row: QueryRow, topic: str, team: str | None) -> str:
  if topic == "champion":
    target = team or "la Coupe du Monde 2026"
    return f"Cotes vainqueur Coupe du Monde 2026 : analyse {target}"
  if topic == "players":
    if team:
      return f"Liste des joueurs {team} Coupe du Monde 2026 : titulaires, stars et joueurs a suivre"
    return "Joueurs Coupe du Monde 2026 : stars, buteurs et effectifs a suivre"
  if topic == "match":
    return f"{row.query.title()} : pronostic, cote et infos utiles"
  if topic == "phase_finale":
    return "Phase finale Coupe du Monde 2026 : affiches, horaires et tableau"
  if topic == "calendar":
    return "Calendrier Coupe du Monde 2026 : prochains matchs, horaires et phase finale"
  return f"{row.query.title()} : guide rapide Coupe du Monde 2026"


def angle_for(row: QueryRow, topic: str, team: str | None) -> str:
  if topic == "champion":
    return "Comparer la cote PMU, le parcours potentiel, les adversaires probables et les signaux de forme sans survendre le pari."
  if topic == "players":
    return "Repondre vite a l'intention liste/effectif, puis orienter vers buteurs, tirs cadres et pages equipe."
  if topic == "match":
    return "Centraliser horaire, contexte, dynamique, cotes et liens vers fiche match/pronostic pour capter l'intention chaude."
  if topic == "phase_finale":
    return "Clarifier les affiches officielles, la provenance des vainqueurs et les prochains croisements du tableau."
  if topic == "calendar":
    return "Donner une lecture simple du programme avec filtres jour/phase et liens vers les matchs a forte intention."
  return "Creer une reponse courte, originale et utile, puis pousser vers la page hub la plus proche."


def internal_links_for(row: QueryRow, topic: str, target: str) -> list[str]:
  links = [target]
  links.extend(MONEY_LINKS.get(topic, []))
  if topic == "calendar":
    links.extend(["/phase-finale", "/live"])
  if topic == "information":
    links.extend(["/match/calendrier", "/pronostics"])
  deduped: list[str] = []
  for link in links:
    if link not in deduped:
      deduped.append(link)
  return deduped[:6]


def cta_for(topic: str, target: str) -> dict[str, str]:
  if topic == "champion":
    return {
      "label": "Comparer la cote PMU du vainqueur",
      "target": target if target.startswith("/cote-champion/") else "/cote-champion/france",
      "aff_var": f"editorial:{target.strip('/') or 'home'}:champion",
    }
  if topic == "players":
    return {
      "label": "Voir les marches joueur PMU",
      "target": "/joueurs",
      "aff_var": f"editorial:{target.strip('/') or 'home'}:players",
    }
  if topic == "match":
    return {
      "label": "Voir le pronostic et les cotes du match",
      "target": target,
      "aff_var": f"editorial:{target.strip('/') or 'match'}:match",
    }
  return {
    "label": "Voir les pronostics CDM 2026",
    "target": "/pronostics",
    "aff_var": f"editorial:{target.strip('/') or 'home'}:hub",
  }


def build_briefs(rows: list[QueryRow], limit: int) -> list[dict[str, Any]]:
  candidates = []
  seen_targets: set[tuple[str, str]] = set()
  for row in rows:
    if row.impressions < 50:
      continue
    if is_spam_query(row):
      continue
    topic = classify(row)
    target = target_for(row, topic)
    key = (topic, target)
    if key in seen_targets and topic not in {"match", "champion"}:
      continue
    seen_targets.add(key)
    team = detect_team(row.query)
    row_score = score(row)
    if row_score < 25 and not is_money_query(row):
      continue
    candidates.append(
      {
        "priority_score": row_score,
        "topic": topic,
        "query": row.query,
        "target_page": target,
        "proposed_title": title_for(row, topic, team),
        "angle": angle_for(row, topic, team),
        "content_format": "optimisation_page" if target == row.path else "article_support",
        "metrics": {
          "clicks": row.clicks,
          "impressions": row.impressions,
          "ctr_pct": round(row.ctr * 100, 2),
          "position": round(row.position, 2),
        },
        "internal_links": internal_links_for(row, topic, target),
        "cta": cta_for(topic, target),
        "checklist": [
          "Verifier les donnees sportives actuelles avant publication.",
          "Ajouter date de mise a jour et source des donnees.",
          "Inclure au moins trois liens internes utiles.",
          "Eviter la copie d'actualite brute : ajouter analyse, contexte et action utilisateur.",
        ],
      }
    )
  return sorted(candidates, key=lambda item: item["priority_score"], reverse=True)[:limit]


def build_payload(args: argparse.Namespace) -> dict[str, Any]:
  rows = read_rows(Path(args.query_page_csv), args.max_rows)
  search_summary = read_json(Path(args.search_summary))
  seo = read_json(Path(args.seo_affiliation))
  gaff = read_json(Path(args.gaff_summary))
  briefs = build_briefs(rows, args.limit)

  return {
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "inputs": {
      "query_page_csv": str(args.query_page_csv),
      "search_summary": str(args.search_summary),
      "seo_affiliation": str(args.seo_affiliation),
      "gaff_summary": str(args.gaff_summary),
    },
    "period": {
      "search_console": f"{search_summary.get('start_date')} -> {search_summary.get('end_date')}",
      "gambling_affiliation": f"{(gaff.get('period') or {}).get('start')} -> {(gaff.get('period') or {}).get('end')}",
    },
    "summary": {
      "rows_read": len(rows),
      "brief_count": len(briefs),
      "search_clicks": to_int(search_summary.get("total_clicks")),
      "search_impressions": to_int(search_summary.get("total_impressions")),
      "conversions": to_int(gaff.get("total_conversions")),
      "commission": to_float(gaff.get("total_commission")),
      "ga4_connected": bool((seo.get("ga4") or {}).get("connected")) if isinstance(seo.get("ga4"), dict) else False,
    },
    "briefs": briefs,
  }


def md(value: Any) -> str:
  return str(value).replace("|", "\\|").replace("\n", " ").strip()


def render_markdown(payload: dict[str, Any]) -> str:
  summary = payload["summary"]
  lines = [
    "# Moteur editorial CDM2026",
    "",
    f"Genere : {payload['generated_at']}",
    f"Search Console : {payload['period']['search_console']}",
    f"Gambling Affiliation : {payload['period']['gambling_affiliation']}",
    "",
    "## Synthese",
    "",
    f"- Lignes Search Console lues : {summary['rows_read']}",
    f"- Briefs prioritaires : {summary['brief_count']}",
    f"- Clics SEO : {summary['search_clicks']}",
    f"- Impressions SEO : {summary['search_impressions']}",
    f"- Conversions PMU : {summary['conversions']}",
    f"- Commission potentielle : {summary['commission']:.2f} EUR",
    "",
    "## Briefs prioritaires",
    "",
  ]
  for index, brief in enumerate(payload["briefs"], start=1):
    metrics = brief["metrics"]
    lines.extend(
      [
        f"### {index}. {md(brief['proposed_title'])}",
        "",
        f"- Score : {brief['priority_score']}",
        f"- Topic : `{brief['topic']}`",
        f"- Requete cible : `{md(brief['query'])}`",
        f"- Page cible : `{md(brief['target_page'])}`",
        f"- Metrics : {metrics['impressions']} impressions, {metrics['clicks']} clics, CTR {metrics['ctr_pct']:.2f}%, position {metrics['position']:.2f}",
        f"- Angle : {md(brief['angle'])}",
        f"- CTA : {md(brief['cta']['label'])} -> `{md(brief['cta']['target'])}` (`{md(brief['cta']['aff_var'])}`)",
        f"- Liens internes : {', '.join(f'`{md(link)}`' for link in brief['internal_links'])}",
        "",
      ]
    )
  return "\n".join(lines)


def write_outputs(payload: dict[str, Any], output_dir: Path) -> dict[str, str]:
  output_dir.mkdir(parents=True, exist_ok=True)
  (output_dir / "json").mkdir(parents=True, exist_ok=True)
  (output_dir / "reports").mkdir(parents=True, exist_ok=True)
  stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
  json_path = output_dir / "json" / f"editorial_engine_{stamp}.json"
  md_path = output_dir / "reports" / f"editorial_engine_{stamp}.md"
  json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
  md_path.write_text(render_markdown(payload), encoding="utf-8")
  latest_json = output_dir / "latest.json"
  latest_md = output_dir / "latest.md"
  latest_summary = output_dir / "latest.summary.json"
  shutil.copy2(json_path, latest_json)
  shutil.copy2(md_path, latest_md)
  latest_summary.write_text(
    json.dumps(
      {
        "generated_at": payload["generated_at"],
        "period": payload["period"],
        "summary": payload["summary"],
        "top_briefs": [
          {
            "priority_score": brief["priority_score"],
            "topic": brief["topic"],
            "query": brief["query"],
            "target_page": brief["target_page"],
          }
          for brief in payload["briefs"][:8]
        ],
      },
      ensure_ascii=False,
      indent=2,
    ),
    encoding="utf-8",
  )
  return {
    "json": str(json_path),
    "markdown": str(md_path),
    "latest_json": str(latest_json),
    "latest_markdown": str(latest_md),
    "latest_summary": str(latest_summary),
  }


def main() -> int:
  parser = argparse.ArgumentParser(description=__doc__)
  parser.add_argument("--query-page-csv", default=str(DEFAULT_QUERY_PAGE_CSV))
  parser.add_argument("--search-summary", default=str(DEFAULT_SEARCH_SUMMARY))
  parser.add_argument("--seo-affiliation", default=str(DEFAULT_SEO_AFFILIATION))
  parser.add_argument("--gaff-summary", default=str(DEFAULT_GAFF_SUMMARY))
  parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
  parser.add_argument("--limit", type=int, default=14)
  parser.add_argument("--max-rows", type=int, default=80000)
  args = parser.parse_args()

  payload = build_payload(args)
  files = write_outputs(payload, Path(args.output_dir))
  print(
    json.dumps(
      {
        "status": "ok",
        "generated_at": payload["generated_at"],
        "brief_count": payload["summary"]["brief_count"],
        "files": files,
      },
      ensure_ascii=False,
      indent=2,
    )
  )
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
