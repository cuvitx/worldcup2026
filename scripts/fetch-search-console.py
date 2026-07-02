#!/usr/bin/env python3
"""Fetch Google Search Console data and generate SEO opportunity reports.

Credentials are loaded from /etc/cdm2026/google-search-console.env by default.
The script intentionally has no third-party Python dependencies.
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import shutil
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any


DEFAULT_ENV_PATH = Path("/etc/cdm2026/google-search-console.env")
DEFAULT_OUTPUT_DIR = Path("/srv/cdm2026/shared/search-console")
TOKEN_URL = "https://oauth2.googleapis.com/token"
API_BASE = "https://searchconsole.googleapis.com/webmasters/v3"
USER_AGENT = "cdm2026-search-console/1.0"


@dataclass(frozen=True)
class FetchConfig:
  site_url: str
  client_id: str
  client_secret: str
  refresh_token: str
  start_date: date
  end_date: date
  output_dir: Path
  row_limit: int
  max_rows: int
  force: bool


def load_env(path: Path) -> dict[str, str]:
  values: dict[str, str] = {}
  if not path.exists():
    return values
  for raw_line in path.read_text().splitlines():
    line = raw_line.strip()
    if not line or line.startswith("#") or "=" not in line:
      continue
    key, value = line.split("=", 1)
    values[key.strip()] = value.strip().strip('"').strip("'")
  return values


def parse_date(value: str) -> date:
  return datetime.strptime(value, "%Y-%m-%d").date()


def default_dates(days: int) -> tuple[date, date]:
  # Search Console data is often delayed; yesterday/2-days-ago are safer.
  end = datetime.now(timezone.utc).date() - timedelta(days=2)
  start = end - timedelta(days=days - 1)
  return start, end


def build_config(args: argparse.Namespace) -> FetchConfig:
  env_values = load_env(Path(args.env))
  start, end = default_dates(args.days)
  if args.start:
    start = parse_date(args.start)
  if args.end:
    end = parse_date(args.end)
  if start > end:
    raise SystemExit("start date must be before end date")

  site_url = os.environ.get("GSC_SITE_URL") or env_values.get("GSC_SITE_URL")
  client_id = os.environ.get("GSC_CLIENT_ID") or env_values.get("GSC_CLIENT_ID")
  client_secret = os.environ.get("GSC_CLIENT_SECRET") or env_values.get("GSC_CLIENT_SECRET")
  refresh_token = os.environ.get("GSC_REFRESH_TOKEN") or env_values.get("GSC_REFRESH_TOKEN")
  missing = [
    name
    for name, value in [
      ("GSC_SITE_URL", site_url),
      ("GSC_CLIENT_ID", client_id),
      ("GSC_CLIENT_SECRET", client_secret),
      ("GSC_REFRESH_TOKEN", refresh_token),
    ]
    if not value
  ]
  if missing:
    raise SystemExit(f"Missing Search Console credentials: {', '.join(missing)}")

  return FetchConfig(
    site_url=str(site_url),
    client_id=str(client_id),
    client_secret=str(client_secret),
    refresh_token=str(refresh_token),
    start_date=start,
    end_date=end,
    output_dir=Path(args.output_dir),
    row_limit=args.row_limit,
    max_rows=args.max_rows,
    force=args.force,
  )


def request_json(
  url: str,
  *,
  method: str = "GET",
  headers: dict[str, str] | None = None,
  payload: dict[str, Any] | None = None,
  form: dict[str, str] | None = None,
  timeout: int = 45,
) -> dict[str, Any]:
  body: bytes | None = None
  final_headers = {"User-Agent": USER_AGENT, **(headers or {})}
  if payload is not None:
    body = json.dumps(payload).encode("utf-8")
    final_headers["Content-Type"] = "application/json"
  if form is not None:
    body = urllib.parse.urlencode(form).encode("utf-8")
    final_headers["Content-Type"] = "application/x-www-form-urlencoded"

  request = urllib.request.Request(url, data=body, headers=final_headers, method=method)
  try:
    with urllib.request.urlopen(request, timeout=timeout) as response:
      return json.loads(response.read().decode("utf-8"))
  except urllib.error.HTTPError as error:
    detail = error.read().decode("utf-8", "replace")
    raise RuntimeError(f"HTTP {error.code} for {url}: {detail}") from error


def access_token(config: FetchConfig) -> str:
  data = request_json(
    TOKEN_URL,
    method="POST",
    form={
      "client_id": config.client_id,
      "client_secret": config.client_secret,
      "refresh_token": config.refresh_token,
      "grant_type": "refresh_token",
    },
  )
  token = data.get("access_token")
  if not token:
    raise RuntimeError("Google token refresh did not return access_token")
  return str(token)


def dataset_key(dimensions: list[str]) -> str:
  return "_".join(dimensions) if dimensions else "site"


def fetch_dataset(
  *,
  config: FetchConfig,
  token: str,
  dimensions: list[str],
) -> list[dict[str, Any]]:
  encoded_site = urllib.parse.quote(config.site_url, safe="")
  url = f"{API_BASE}/sites/{encoded_site}/searchAnalytics/query"
  rows: list[dict[str, Any]] = []
  start_row = 0

  while True:
    body = {
      "startDate": config.start_date.isoformat(),
      "endDate": config.end_date.isoformat(),
      "dimensions": dimensions,
      "rowLimit": config.row_limit,
      "startRow": start_row,
      "searchType": "web",
      "dataState": "final",
    }
    response = request_json(
      url,
      method="POST",
      headers={"Authorization": f"Bearer {token}"},
      payload=body,
    )
    batch = response.get("rows", [])
    if not isinstance(batch, list):
      batch = []
    for row in batch:
      keys = row.get("keys", [])
      item: dict[str, Any] = {
        "clicks": int(row.get("clicks", 0) or 0),
        "impressions": int(row.get("impressions", 0) or 0),
        "ctr": float(row.get("ctr", 0.0) or 0.0),
        "position": float(row.get("position", 0.0) or 0.0),
      }
      for index, dimension in enumerate(dimensions):
        item[dimension] = keys[index] if index < len(keys) else ""
      rows.append(item)

    start_row += len(batch)
    if len(batch) < config.row_limit or len(rows) >= config.max_rows:
      return rows[: config.max_rows]
    time.sleep(0.25)


def ensure_dirs(base: Path) -> dict[str, Path]:
  dirs = {
    "raw": base / "raw",
    "csv": base / "csv",
    "summary": base / "summary",
    "reports": base / "reports",
  }
  for directory in dirs.values():
    directory.mkdir(parents=True, exist_ok=True)
  return dirs


def write_csv(path: Path, rows: list[dict[str, Any]], columns: list[str]) -> None:
  with path.open("w", newline="", encoding="utf-8") as handle:
    writer = csv.DictWriter(handle, fieldnames=columns, extrasaction="ignore")
    writer.writeheader()
    for row in rows:
      writer.writerow(row)


def money_score(row: dict[str, Any]) -> int:
  haystack = f"{row.get('query', '')} {row.get('page', '')}".lower()
  score = 0
  for token in [
    "pronostic",
    "pari",
    "paris",
    "cote",
    "bookmaker",
    "bonus",
    "score exact",
    "vainqueur",
    "champion",
    "pmu",
    "bet",
  ]:
    if token in haystack:
      score += 1
  return score


def build_opportunities(rows: list[dict[str, Any]]) -> dict[str, list[dict[str, Any]]]:
  enriched = [
    {
      **row,
      "ctr_pct": round(float(row.get("ctr", 0.0)) * 100, 2),
      "position": round(float(row.get("position", 0.0)), 2),
      "money_score": money_score(row),
    }
    for row in rows
    if row.get("query") and row.get("page")
  ]

  high_impressions_low_ctr = sorted(
    [
      row
      for row in enriched
      if row["impressions"] >= 100 and row["position"] <= 12 and row["ctr"] < 0.035
    ],
    key=lambda item: (item["impressions"], -item["ctr"]),
    reverse=True,
  )[:25]

  striking_distance = sorted(
    [
      row
      for row in enriched
      if row["impressions"] >= 50 and 8 <= row["position"] <= 20
    ],
    key=lambda item: (item["money_score"], item["impressions"]),
    reverse=True,
  )[:25]

  money_queries = sorted(
    [
      row
      for row in enriched
      if row["money_score"] > 0 and row["impressions"] >= 10
    ],
    key=lambda item: (item["money_score"], item["clicks"], item["impressions"]),
    reverse=True,
  )[:25]

  zero_click_impressions = sorted(
    [
      row
      for row in enriched
      if row["clicks"] == 0 and row["impressions"] >= 50 and row["position"] <= 25
    ],
    key=lambda item: item["impressions"],
    reverse=True,
  )[:25]

  return {
    "high_impressions_low_ctr": high_impressions_low_ctr,
    "striking_distance": striking_distance,
    "money_queries": money_queries,
    "zero_click_impressions": zero_click_impressions,
  }


def aggregate_summary(datasets: dict[str, list[dict[str, Any]]]) -> dict[str, Any]:
  site = datasets.get("site", [])
  site_row = site[0] if site else {}
  query_page = datasets.get("query_page", [])
  pages = datasets.get("page", [])
  queries = datasets.get("query", [])

  return {
    "total_clicks": int(site_row.get("clicks", sum(row.get("clicks", 0) for row in query_page)) or 0),
    "total_impressions": int(site_row.get("impressions", sum(row.get("impressions", 0) for row in query_page)) or 0),
    "avg_ctr": float(site_row.get("ctr", 0.0) or 0.0),
    "avg_position": float(site_row.get("position", 0.0) or 0.0),
    "query_count": len(queries),
    "page_count": len(pages),
    "query_page_count": len(query_page),
  }


def fmt_pct(value: float) -> str:
  return f"{value * 100:.2f}%"


def md_table(rows: list[dict[str, Any]], columns: list[tuple[str, str]], limit: int = 12) -> list[str]:
  if not rows:
    return ["Aucune opportunite detectee sur cette fenetre."]
  lines = [
    "| " + " | ".join(label for label, _ in columns) + " |",
    "| " + " | ".join("---" for _ in columns) + " |",
  ]
  for row in rows[:limit]:
    cells = []
    for _, key in columns:
      value = row.get(key, "")
      if key == "ctr":
        value = fmt_pct(float(value))
      elif key == "ctr_pct":
        value = f"{float(value):.2f}%"
      elif key == "position":
        value = f"{float(value):.2f}"
      cells.append(str(value).replace("\n", " ")[:140])
    lines.append("| " + " | ".join(cells) + " |")
  return lines


def build_report(
  *,
  config: FetchConfig,
  generated_at: str,
  summary: dict[str, Any],
  opportunities: dict[str, list[dict[str, Any]]],
  datasets: dict[str, list[dict[str, Any]]],
) -> str:
  lines = [
    "# Search Console - opportunites SEO CDM2026",
    "",
    f"Generated at: {generated_at}",
    f"Site: {config.site_url}",
    f"Period: {config.start_date.isoformat()} -> {config.end_date.isoformat()}",
    "",
    "## Synthese",
    "",
    f"- Clics: {summary['total_clicks']}",
    f"- Impressions: {summary['total_impressions']}",
    f"- CTR moyen: {fmt_pct(summary['avg_ctr'])}",
    f"- Position moyenne: {summary['avg_position']:.2f}",
    f"- Requetes: {summary['query_count']}",
    f"- Pages: {summary['page_count']}",
    "",
    "## Actions prioritaires",
    "",
    "1. Optimiser title/meta et intro des pages avec beaucoup d'impressions mais CTR faible.",
    "2. Ajouter maillage interne vers les pages en positions 8-20, surtout requetes pronostic/cote/paris.",
    "3. Creer ou enrichir les pages qui captent des impressions sans clic.",
    "4. Prioriser les requetes money avant les requetes purement informationnelles.",
    "",
    "## Fortes impressions, CTR faible",
    "",
    *md_table(
      opportunities["high_impressions_low_ctr"],
      [
        ("Requete", "query"),
        ("Page", "page"),
        ("Impr.", "impressions"),
        ("Clics", "clicks"),
        ("CTR", "ctr_pct"),
        ("Pos.", "position"),
      ],
    ),
    "",
    "## Positions 8-20 a pousser",
    "",
    *md_table(
      opportunities["striking_distance"],
      [
        ("Requete", "query"),
        ("Page", "page"),
        ("Impr.", "impressions"),
        ("Clics", "clicks"),
        ("CTR", "ctr_pct"),
        ("Pos.", "position"),
        ("Money", "money_score"),
      ],
    ),
    "",
    "## Requetes money",
    "",
    *md_table(
      opportunities["money_queries"],
      [
        ("Requete", "query"),
        ("Page", "page"),
        ("Impr.", "impressions"),
        ("Clics", "clicks"),
        ("CTR", "ctr_pct"),
        ("Pos.", "position"),
        ("Money", "money_score"),
      ],
    ),
    "",
    "## Impressions sans clic",
    "",
    *md_table(
      opportunities["zero_click_impressions"],
      [
        ("Requete", "query"),
        ("Page", "page"),
        ("Impr.", "impressions"),
        ("Pos.", "position"),
      ],
    ),
    "",
    "## Top pages",
    "",
    *md_table(
      sorted(datasets.get("page", []), key=lambda row: row.get("clicks", 0), reverse=True),
      [
        ("Page", "page"),
        ("Clics", "clicks"),
        ("Impr.", "impressions"),
        ("CTR", "ctr"),
        ("Pos.", "position"),
      ],
    ),
  ]
  return "\n".join(lines) + "\n"


def copy_latest(source: Path, destination: Path) -> None:
  shutil.copyfile(source, destination)


def maybe_rate_limit(output_dir: Path, force: bool) -> None:
  if force:
    return
  marker = output_dir / ".last-request.json"
  if not marker.exists():
    return
  try:
    data = json.loads(marker.read_text())
    last = datetime.fromisoformat(data["requested_at"])
  except Exception:
    return
  elapsed = datetime.now(timezone.utc) - last
  if elapsed < timedelta(minutes=5):
    raise SystemExit("Refusing to call Search Console API again within 5 minutes; use --force.")


def update_rate_limit(output_dir: Path) -> None:
  marker = output_dir / ".last-request.json"
  marker.write_text(json.dumps({"requested_at": datetime.now(timezone.utc).isoformat()}, indent=2))


def run(config: FetchConfig) -> dict[str, Any]:
  dirs = ensure_dirs(config.output_dir)
  maybe_rate_limit(config.output_dir, config.force)
  token = access_token(config)

  dimension_sets = [
    [],
    ["query"],
    ["page"],
    ["query", "page"],
    ["page", "device"],
    ["query", "page", "device"],
    ["query", "page", "country"],
  ]

  datasets: dict[str, list[dict[str, Any]]] = {}
  for dimensions in dimension_sets:
    key = dataset_key(dimensions)
    datasets[key] = fetch_dataset(config=config, token=token, dimensions=dimensions)
    time.sleep(0.3)

  update_rate_limit(config.output_dir)

  generated_at = datetime.now(timezone.utc).isoformat()
  period = f"{config.start_date.isoformat()}_{config.end_date.isoformat()}"
  raw_path = dirs["raw"] / f"search_console_{period}.json"
  summary_path = dirs["summary"] / f"search_console_{period}.summary.json"
  report_path = dirs["reports"] / f"search_console_{period}.md"

  raw_payload = {
    "generated_at": generated_at,
    "site_url": config.site_url,
    "start_date": config.start_date.isoformat(),
    "end_date": config.end_date.isoformat(),
    "datasets": datasets,
  }
  raw_path.write_text(json.dumps(raw_payload, ensure_ascii=False, indent=2))

  for key, rows in datasets.items():
    if not rows:
      continue
    columns = list(rows[0].keys())
    write_csv(dirs["csv"] / f"search_console_{period}.{key}.csv", rows, columns)

  opportunities = build_opportunities(datasets.get("query_page", []))
  summary = {
    "generated_at": generated_at,
    "site_url": config.site_url,
    "start_date": config.start_date.isoformat(),
    "end_date": config.end_date.isoformat(),
    **aggregate_summary(datasets),
    "opportunity_counts": {key: len(value) for key, value in opportunities.items()},
  }
  summary_path.write_text(json.dumps(summary, ensure_ascii=False, indent=2))
  report = build_report(
    config=config,
    generated_at=generated_at,
    summary=summary,
    opportunities=opportunities,
    datasets=datasets,
  )
  report_path.write_text(report)

  copy_latest(raw_path, config.output_dir / "latest.raw.json")
  copy_latest(summary_path, config.output_dir / "latest.summary.json")
  copy_latest(report_path, config.output_dir / "latest.md")
  query_page_csv = dirs["csv"] / f"search_console_{period}.query_page.csv"
  if query_page_csv.exists():
    copy_latest(query_page_csv, config.output_dir / "latest.query_page.csv")

  return {
    "summary": summary,
    "raw": str(raw_path),
    "summary_path": str(summary_path),
    "report": str(report_path),
  }


def main() -> int:
  parser = argparse.ArgumentParser(description=__doc__)
  parser.add_argument("--env", default=str(DEFAULT_ENV_PATH))
  parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
  parser.add_argument("--days", type=int, default=28)
  parser.add_argument("--start")
  parser.add_argument("--end")
  parser.add_argument("--row-limit", type=int, default=25000)
  parser.add_argument("--max-rows", type=int, default=100000)
  parser.add_argument("--force", action="store_true")
  args = parser.parse_args()

  config = build_config(args)
  result = run(config)
  print(json.dumps(result, ensure_ascii=False, indent=2))
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
