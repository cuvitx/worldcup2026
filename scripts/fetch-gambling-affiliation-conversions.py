#!/usr/bin/env python3
"""Import Gambling Affiliation conversions for CDM2026.

The API token must be provided through GAFF_API_TOKEN. The script writes
raw JSON, enriched CSV, JSON summary, and a short Markdown report to a
persistent output directory outside the release tree.
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from datetime import UTC, date, datetime
from pathlib import Path
from typing import Any


DEFAULT_SITE_ID = "93648"
DEFAULT_OUTPUT_DIR = Path("/srv/cdm2026/shared/gambling-affiliation")
DEFAULT_MIN_INTERVAL_SECONDS = 300
API_BASE = "https://api.gambling-affiliation.com/aff/v1/{token}/report/conversion"
USER_AGENT = "cdm2026-gambling-affiliation-import/1.0"
ACCEPTED_COLUMNS = [
    "id_cpx",
    "campaign",
    "url",
    "date",
    "type",
    "tracking",
    "aff_var",
    "nr",
    "aff_com",
    "payment",
    "status",
]


def month_start(today: date) -> date:
    return today.replace(day=1)


def parse_args() -> argparse.Namespace:
    today = date.today()
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--start", default=month_start(today).isoformat())
    parser.add_argument("--end", default=today.isoformat())
    parser.add_argument("--site-id", default=os.environ.get("GAFF_SITE_ID", DEFAULT_SITE_ID))
    parser.add_argument("--output-dir", default=os.environ.get("GAFF_OUTPUT_DIR", str(DEFAULT_OUTPUT_DIR)))
    parser.add_argument(
        "--min-interval-seconds",
        type=int,
        default=int(os.environ.get("GAFF_MIN_INTERVAL_SECONDS", DEFAULT_MIN_INTERVAL_SECONDS)),
    )
    parser.add_argument("--force", action="store_true", help="Ignore the local 5-minute rate-limit state.")
    return parser.parse_args()


def redact_url(url: str) -> str:
    return re.sub(r"/aff/v1/[^/]+/", "/aff/v1/[TOKEN]/", url)


def parse_iso_date(value: str, name: str) -> date:
    try:
        return date.fromisoformat(value)
    except ValueError as exc:
        raise SystemExit(f"{name} must be YYYY-MM-DD, got {value!r}") from exc


def build_url(token: str, site_id: str, start: str, end: str) -> str:
    query: list[tuple[str, str]] = [
        ("sites[]", site_id),
        ("campaigns[]", "active"),
        ("period", "custom"),
        ("start", start),
        ("end", end),
    ]
    query.extend(("type[]", value) for value in ("1", "2", "3", "4", "5"))
    query.extend(("status[]", value) for value in ("0", "1", "2", "3"))
    query.append(("ad_id", ""))
    query.append(("order_by", "c.id"))
    query.append(("order_direction", "DESC"))
    query.extend(("columns[]", column) for column in ACCEPTED_COLUMNS)
    return f"{API_BASE.format(token=token)}?{urllib.parse.urlencode(query)}"


def load_json(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def enforce_rate_limit(state_path: Path, min_interval_seconds: int, force: bool) -> None:
    state = load_json(state_path)
    last_attempt = float(state.get("last_attempt_epoch") or 0)
    elapsed = time.time() - last_attempt
    if not force and last_attempt and elapsed < min_interval_seconds:
        wait = int(min_interval_seconds - elapsed)
        raise SystemExit(
            f"Refusing to call Gambling Affiliation API yet. "
            f"Wait {wait}s or rerun with --force."
        )


def mark_attempt(state_path: Path, url: str) -> None:
    state_path.parent.mkdir(parents=True, exist_ok=True)
    state = {
        "last_attempt_epoch": time.time(),
        "last_attempt_at": datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "last_request_url": redact_url(url),
    }
    state_path.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")


def fetch_json(url: str) -> dict[str, Any]:
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/json",
            "User-Agent": USER_AGENT,
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=45) as response:
            return json.loads(response.read().decode("utf-8", "replace"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", "replace")
        try:
            payload: Any = json.loads(body)
        except json.JSONDecodeError:
            payload = {"raw": body[:1000]}
        raise SystemExit(
            f"API error {exc.code} for {redact_url(url)}\n"
            f"{json.dumps(payload, ensure_ascii=False, indent=2)}"
        ) from exc


def unserialize_aff_var(value: Any) -> Any:
    if not isinstance(value, str) or not value:
        return value

    scalar = re.fullmatch(r's:\d+:"(.*)";', value, re.DOTALL)
    if scalar:
        return scalar.group(1)

    pairs = re.findall(r's:\d+:"([^"]+)";s:\d+:"([^"]*)";', value)
    if pairs:
        return {key: val for key, val in pairs}

    return value


def normalized_aff_var(row: dict[str, Any]) -> str:
    parsed = unserialize_aff_var(row.get("aff_var"))
    if isinstance(parsed, dict):
        for key in ("aff_var_1", "aff_var", "subid", "sub_id"):
            if parsed.get(key):
                return str(parsed[key])
        return json.dumps(parsed, ensure_ascii=False, sort_keys=True)
    return "" if parsed is None else str(parsed)


def to_float(value: Any) -> float:
    try:
        return float(value or 0)
    except (TypeError, ValueError):
        return 0.0


def enrich_rows(conversions: Any) -> list[dict[str, Any]]:
    if not isinstance(conversions, list):
        raise SystemExit("API response does not contain a conversions list.")

    rows: list[dict[str, Any]] = []
    for row in conversions:
        if not isinstance(row, dict):
            continue
        enriched = dict(row)
        enriched["aff_var_normalized"] = normalized_aff_var(row)
        # Format canonique actuel "pageType--slug--placement" ; ":" garde pour
        # les conversions historiques anterieures au fix du 2026-07-02.
        normalized = enriched["aff_var_normalized"]
        enriched["is_canonical_aff_var"] = "--" in normalized or ":" in normalized
        rows.append(enriched)
    return rows


def summarize(rows: list[dict[str, Any]], request_url: str, start: str, end: str) -> dict[str, Any]:
    by_aff_var: dict[str, dict[str, Any]] = defaultdict(
        lambda: {"count": 0, "commission": 0.0, "netrevenue": 0.0, "cpl": 0, "cpa": 0}
    )
    by_type = Counter()
    by_status = Counter()
    by_campaign = Counter()
    by_date: dict[str, dict[str, Any]] = defaultdict(lambda: {"count": 0, "commission": 0.0})

    for row in rows:
        aff = row.get("aff_var_normalized") or "(empty)"
        row_type = str(row.get("type") or "(empty)")
        row_status = str(row.get("status") or "(empty)")
        campaign = str(row.get("campaign_name") or row.get("campaign") or "(empty)")
        commission = to_float(row.get("commission"))
        netrevenue = to_float(row.get("netrevenue"))
        day = str(row.get("date") or "")[:10] or "(empty)"

        by_aff_var[aff]["count"] += 1
        by_aff_var[aff]["commission"] += commission
        by_aff_var[aff]["netrevenue"] += netrevenue
        if row_type in ("cpl", "cpa"):
            by_aff_var[aff][row_type] += 1

        by_type[row_type] += 1
        by_status[row_status] += 1
        by_campaign[campaign] += 1
        by_date[day]["count"] += 1
        by_date[day]["commission"] += commission

    return {
        "generated_at": datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "period": {"start": start, "end": end},
        "request": {"url": redact_url(request_url)},
        "total_conversions": len(rows),
        "total_commission": sum(to_float(row.get("commission")) for row in rows),
        "by_aff_var": dict(
            sorted(
                by_aff_var.items(),
                key=lambda item: (item[1]["commission"], item[1]["count"]),
                reverse=True,
            )
        ),
        "by_type": dict(by_type.most_common()),
        "by_status": dict(by_status.most_common()),
        "by_campaign": dict(by_campaign.most_common()),
        "by_date": dict(sorted(by_date.items())),
    }


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    fields = sorted({key for row in rows for key in row.keys()})
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def write_latest(path: Path, latest_path: Path) -> None:
    latest_path.write_bytes(path.read_bytes())


def format_money(value: Any) -> str:
    return f"{to_float(value):.2f} EUR"


def render_markdown(summary: dict[str, Any]) -> str:
    lines = [
        "# Gambling Affiliation - conversions CDM2026",
        "",
        f"- Periode : {summary['period']['start']} -> {summary['period']['end']}",
        f"- Genere : {summary['generated_at']}",
        f"- Conversions : {summary['total_conversions']}",
        f"- Commission potentielle : {format_money(summary['total_commission'])}",
        "",
        "## Par type",
        "",
    ]
    for key, value in summary["by_type"].items():
        lines.append(f"- {key}: {value}")

    lines.extend(["", "## Par statut", ""])
    for key, value in summary["by_status"].items():
        lines.append(f"- {key}: {value}")

    lines.extend(
        [
            "",
            "## Top aff_var",
            "",
            "| aff_var | conversions | CPL | CPA | commission |",
            "|---|---:|---:|---:|---:|",
        ]
    )
    for aff_var, stats in list(summary["by_aff_var"].items())[:30]:
        lines.append(
            f"| `{aff_var}` | {stats['count']} | {stats.get('cpl', 0)} | "
            f"{stats.get('cpa', 0)} | {format_money(stats['commission'])} |"
        )

    lines.extend(["", "## Par jour", "", "| date | conversions | commission |", "|---|---:|---:|"])
    for day, stats in summary["by_date"].items():
        lines.append(f"| {day} | {stats['count']} | {format_money(stats['commission'])} |")

    lines.append("")
    return "\n".join(lines)


def main() -> int:
    args = parse_args()
    token = os.environ.get("GAFF_API_TOKEN")
    if not token:
        print("Missing GAFF_API_TOKEN environment variable.", file=sys.stderr)
        return 2

    start_date = parse_iso_date(args.start, "--start")
    end_date = parse_iso_date(args.end, "--end")
    if end_date < start_date:
        raise SystemExit("--end must be greater than or equal to --start")

    output_dir = Path(args.output_dir)
    state_path = output_dir / ".last-request.json"
    url = build_url(token, args.site_id, start_date.isoformat(), end_date.isoformat())

    enforce_rate_limit(state_path, args.min_interval_seconds, args.force)
    mark_attempt(state_path, url)

    payload = fetch_json(url)
    rows = enrich_rows(payload.get("conversions"))
    summary = summarize(rows, url, start_date.isoformat(), end_date.isoformat())

    stamp = f"{start_date.isoformat()}_{end_date.isoformat()}"
    raw_path = output_dir / "raw" / f"conversions_{stamp}.json"
    csv_path = output_dir / "csv" / f"conversions_{stamp}.csv"
    summary_path = output_dir / "summary" / f"conversions_{stamp}.summary.json"
    report_path = output_dir / "reports" / f"conversions_{stamp}.md"

    raw_path.parent.mkdir(parents=True, exist_ok=True)
    summary_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.parent.mkdir(parents=True, exist_ok=True)

    raw_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    write_csv(csv_path, rows)
    summary_path.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    report_path.write_text(render_markdown(summary), encoding="utf-8")

    write_latest(raw_path, output_dir / "latest.raw.json")
    write_latest(csv_path, output_dir / "latest.csv")
    write_latest(summary_path, output_dir / "latest.summary.json")
    write_latest(report_path, output_dir / "latest.md")

    print(
        json.dumps(
            {
                "ok": True,
                "period": summary["period"],
                "total_conversions": summary["total_conversions"],
                "total_commission": summary["total_commission"],
                "files": {
                    "raw": str(raw_path),
                    "csv": str(csv_path),
                    "summary": str(summary_path),
                    "report": str(report_path),
                    "latest_report": str(output_dir / "latest.md"),
                },
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
