#!/usr/bin/env python3
"""Fetch a private GA4 report for CDM2026.

Credentials are loaded from /etc/cdm2026/ga4.env by default. The script writes a
stable status payload even when credentials or Google dependencies are missing,
so dashboards and timers can run without breaking deploys.
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import sys
from dataclasses import dataclass
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any


DEFAULT_ENV_PATH = Path("/etc/cdm2026/ga4.env")
DEFAULT_OUTPUT_DIR = Path("/srv/cdm2026/shared/ga4")
DEFAULT_DAYS = 28
GA4_SCOPE = "https://www.googleapis.com/auth/analytics.readonly"


@dataclass(frozen=True)
class Ga4Config:
  property_id: str
  service_account_json: Path
  output_dir: Path
  start_date: date
  end_date: date
  row_limit: int


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


def parse_date(value: str) -> date:
  return datetime.strptime(value, "%Y-%m-%d").date()


def default_dates(days: int) -> tuple[date, date]:
  end = datetime.now(timezone.utc).date() - timedelta(days=1)
  start = end - timedelta(days=days - 1)
  return start, end


def normalize_property_id(value: str) -> str:
  value = value.strip()
  if not value:
    return value
  return value if value.startswith("properties/") else f"properties/{value}"


def build_config(args: argparse.Namespace) -> tuple[Ga4Config | None, list[str]]:
  env = load_env(Path(args.env))
  start, end = default_dates(args.days)
  if args.start:
    start = parse_date(args.start)
  if args.end:
    end = parse_date(args.end)

  property_id = normalize_property_id(
    os.environ.get("GA4_PROPERTY_ID") or env.get("GA4_PROPERTY_ID") or env.get("PROPERTY_ID") or ""
  )
  service_account = (
    os.environ.get("GA4_SERVICE_ACCOUNT_JSON")
    or env.get("GA4_SERVICE_ACCOUNT_JSON")
    or env.get("GOOGLE_APPLICATION_CREDENTIALS")
    or ""
  )
  output_dir = Path(os.environ.get("GA4_OUTPUT_DIR") or env.get("GA4_OUTPUT_DIR") or args.output_dir)

  missing: list[str] = []
  if not property_id:
    missing.append("GA4_PROPERTY_ID")
  if not service_account:
    missing.append("GA4_SERVICE_ACCOUNT_JSON")
  elif not Path(service_account).exists():
    missing.append(f"service account file not found: {service_account}")

  if start > end:
    missing.append("start date must be before end date")

  if missing:
    return None, missing

  return (
    Ga4Config(
      property_id=property_id,
      service_account_json=Path(service_account),
      output_dir=output_dir,
      start_date=start,
      end_date=end,
      row_limit=args.row_limit,
    ),
    [],
  )


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


def import_google_modules() -> tuple[Any, Any, dict[str, Any]]:
  try:
    from google.oauth2 import service_account
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, OrderBy, RunReportRequest
  except Exception as exc:
    raise RuntimeError(
      "Missing GA4 Python dependencies. Install google-analytics-data and google-auth in the runtime."
    ) from exc
  return service_account, BetaAnalyticsDataClient, {
    "DateRange": DateRange,
    "Dimension": Dimension,
    "Metric": Metric,
    "OrderBy": OrderBy,
    "RunReportRequest": RunReportRequest,
  }


def run_ga4(config: Ga4Config) -> dict[str, Any]:
  service_account, client_class, types = import_google_modules()
  credentials = service_account.Credentials.from_service_account_file(
    str(config.service_account_json),
    scopes=[GA4_SCOPE],
  )
  client = client_class(credentials=credentials)

  def request(
    *,
    metrics: list[str],
    dimensions: list[str] | None = None,
    limit: int | None = None,
    order_by_metric: str | None = None,
  ) -> Any:
    req = types["RunReportRequest"](
      property=config.property_id,
      date_ranges=[
        types["DateRange"](
          start_date=config.start_date.isoformat(),
          end_date=config.end_date.isoformat(),
        )
      ],
      metrics=[types["Metric"](name=name) for name in metrics],
      dimensions=[types["Dimension"](name=name) for name in (dimensions or [])],
      limit=limit or config.row_limit,
    )
    if order_by_metric:
      req.order_bys = [
        types["OrderBy"](
          metric=types["OrderBy"].MetricOrderBy(metric_name=order_by_metric),
          desc=True,
        )
      ]
    return client.run_report(req)

  def rows(response: Any, dimensions: list[str], metrics: list[str]) -> list[dict[str, Any]]:
    output: list[dict[str, Any]] = []
    for row in response.rows:
      item: dict[str, Any] = {}
      for index, name in enumerate(dimensions):
        item[name] = row.dimension_values[index].value if index < len(row.dimension_values) else ""
      for index, name in enumerate(metrics):
        item[name] = row.metric_values[index].value if index < len(row.metric_values) else ""
      output.append(item)
    return output

  overview_metrics = ["activeUsers", "sessions", "screenPageViews", "engagedSessions", "eventCount"]
  overview_rows = rows(request(metrics=overview_metrics), [], overview_metrics)
  overview = overview_rows[0] if overview_rows else {}

  page_metrics = ["sessions", "screenPageViews", "activeUsers", "engagedSessions"]
  source_metrics = ["sessions", "activeUsers", "engagedSessions"]
  event_metrics = ["eventCount", "activeUsers"]
  landing_metrics = ["sessions", "engagedSessions", "screenPageViews"]
  device_metrics = ["sessions", "activeUsers", "engagedSessions"]

  datasets = {
    "top_pages": rows(
      request(metrics=page_metrics, dimensions=["pagePath"], order_by_metric="screenPageViews"),
      ["pagePath"],
      page_metrics,
    ),
    "landing_pages": rows(
      request(metrics=landing_metrics, dimensions=["landingPage"], order_by_metric="sessions"),
      ["landingPage"],
      landing_metrics,
    ),
    "sources": rows(
      request(metrics=source_metrics, dimensions=["sessionSource", "sessionMedium"], order_by_metric="sessions"),
      ["sessionSource", "sessionMedium"],
      source_metrics,
    ),
    "events": rows(
      request(metrics=event_metrics, dimensions=["eventName"], order_by_metric="eventCount"),
      ["eventName"],
      event_metrics,
    ),
    "devices": rows(
      request(metrics=device_metrics, dimensions=["deviceCategory"], order_by_metric="sessions"),
      ["deviceCategory"],
      device_metrics,
    ),
  }

  outbound_events = [
    row
    for row in datasets["events"]
    if any(token in str(row.get("eventName", "")).lower() for token in ["click", "pmu", "affiliate", "outbound"])
  ]

  return {
    "status": "ok",
    "connected": True,
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "property_id": config.property_id,
    "period": {
      "start": config.start_date.isoformat(),
      "end": config.end_date.isoformat(),
    },
    "summary": {
      "active_users": to_int(overview.get("activeUsers")),
      "sessions": to_int(overview.get("sessions")),
      "page_views": to_int(overview.get("screenPageViews")),
      "engaged_sessions": to_int(overview.get("engagedSessions")),
      "event_count": to_int(overview.get("eventCount")),
      "tracked_click_events": sum(to_int(row.get("eventCount")) for row in outbound_events),
    },
    "datasets": datasets,
    "outbound_events": outbound_events[:25],
  }


def status_payload(status: str, reasons: list[str], output_dir: Path, args: argparse.Namespace) -> dict[str, Any]:
  start, end = default_dates(args.days)
  if args.start:
    start = parse_date(args.start)
  if args.end:
    end = parse_date(args.end)
  return {
    "status": status,
    "connected": False,
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "period": {"start": start.isoformat(), "end": end.isoformat()},
    "summary": {
      "active_users": 0,
      "sessions": 0,
      "page_views": 0,
      "engaged_sessions": 0,
      "event_count": 0,
      "tracked_click_events": 0,
    },
    "warnings": reasons,
    "output_dir": str(output_dir),
  }


def md(value: Any) -> str:
  return str(value).replace("|", "\\|").replace("\n", " ").strip()


def render_markdown(payload: dict[str, Any]) -> str:
  summary = payload.get("summary", {})
  lines = [
    "# GA4 report CDM2026",
    "",
    f"Generated at: {payload.get('generated_at')}",
    f"Status: `{payload.get('status')}`",
    f"Connected: `{payload.get('connected')}`",
    f"Period: {(payload.get('period') or {}).get('start')} -> {(payload.get('period') or {}).get('end')}",
    "",
    "## KPIs",
    "",
    "| Metric | Value |",
    "| --- | ---: |",
    f"| Active users | {to_int(summary.get('active_users'))} |",
    f"| Sessions | {to_int(summary.get('sessions'))} |",
    f"| Page views | {to_int(summary.get('page_views'))} |",
    f"| Engaged sessions | {to_int(summary.get('engaged_sessions'))} |",
    f"| Events | {to_int(summary.get('event_count'))} |",
    f"| Tracked click events | {to_int(summary.get('tracked_click_events'))} |",
  ]
  warnings = payload.get("warnings") if isinstance(payload.get("warnings"), list) else []
  if warnings:
    lines.extend(["", "## Warnings", ""])
    lines.extend(f"- {md(item)}" for item in warnings)

  datasets = payload.get("datasets") if isinstance(payload.get("datasets"), dict) else {}
  top_pages = datasets.get("top_pages") if isinstance(datasets.get("top_pages"), list) else []
  if top_pages:
    lines.extend(["", "## Top pages", "", "| Page | Views | Sessions | Users |", "| --- | ---: | ---: | ---: |"])
    for row in top_pages[:15]:
      lines.append(
        f"| `{md(row.get('pagePath'))}` | {to_int(row.get('screenPageViews'))} | {to_int(row.get('sessions'))} | {to_int(row.get('activeUsers'))} |"
      )

  outbound = payload.get("outbound_events") if isinstance(payload.get("outbound_events"), list) else []
  if outbound:
    lines.extend(["", "## Click / outbound events", "", "| Event | Count | Users |", "| --- | ---: | ---: |"])
    for row in outbound[:15]:
      lines.append(f"| {md(row.get('eventName'))} | {to_int(row.get('eventCount'))} | {to_int(row.get('activeUsers'))} |")

  lines.append("")
  return "\n".join(lines)


def write_outputs(payload: dict[str, Any], output_dir: Path) -> dict[str, str]:
  output_dir.mkdir(parents=True, exist_ok=True)
  (output_dir / "json").mkdir(parents=True, exist_ok=True)
  (output_dir / "reports").mkdir(parents=True, exist_ok=True)
  stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
  json_path = output_dir / "json" / f"ga4_{stamp}.json"
  md_path = output_dir / "reports" / f"ga4_{stamp}.md"
  json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
  md_path.write_text(render_markdown(payload), encoding="utf-8")
  latest_json = output_dir / "latest.json"
  latest_md = output_dir / "latest.md"
  summary_json = output_dir / "latest.summary.json"
  shutil.copy2(json_path, latest_json)
  shutil.copy2(md_path, latest_md)
  summary_json.write_text(
    json.dumps(
      {
        "generated_at": payload.get("generated_at"),
        "status": payload.get("status"),
        "connected": payload.get("connected"),
        "period": payload.get("period"),
        "summary": payload.get("summary", {}),
        "warnings": payload.get("warnings", []),
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
    "latest_summary": str(summary_json),
  }


def main() -> int:
  parser = argparse.ArgumentParser(description=__doc__)
  parser.add_argument("--env", default=str(DEFAULT_ENV_PATH))
  parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
  parser.add_argument("--days", type=int, default=DEFAULT_DAYS)
  parser.add_argument("--start")
  parser.add_argument("--end")
  parser.add_argument("--row-limit", type=int, default=50)
  parser.add_argument("--strict", action="store_true")
  args = parser.parse_args()

  config, missing = build_config(args)
  output_dir = Path(args.output_dir)
  if config is None:
    payload = status_payload("missing_config", missing, output_dir, args)
    files = write_outputs(payload, output_dir)
    print(json.dumps({"status": payload["status"], "warnings": missing, "files": files}, ensure_ascii=False, indent=2))
    return 2 if args.strict else 0

  try:
    payload = run_ga4(config)
  except Exception as exc:
    payload = status_payload("error", [str(exc)], config.output_dir, args)
    files = write_outputs(payload, config.output_dir)
    print(json.dumps({"status": payload["status"], "warnings": payload["warnings"], "files": files}, ensure_ascii=False, indent=2))
    return 1 if args.strict else 0

  files = write_outputs(payload, config.output_dir)
  print(
    json.dumps(
      {
        "status": payload["status"],
        "connected": payload["connected"],
        "summary": payload["summary"],
        "files": files,
      },
      ensure_ascii=False,
      indent=2,
    )
  )
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
