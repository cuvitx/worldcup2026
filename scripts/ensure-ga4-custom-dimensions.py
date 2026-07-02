#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import requests
from google.auth.transport.requests import Request
from google.oauth2 import service_account


DEFAULT_ENV_PATH = Path("/etc/cdm2026/ga4.env")
DEFAULT_SERVICE_ACCOUNT_PATH = Path("/etc/cdm2026/ga4-service-account.json")
ADMIN_API_BASE = "https://analyticsadmin.googleapis.com/v1beta"
ADMIN_SCOPES = ["https://www.googleapis.com/auth/analytics.edit"]


class ApiError(RuntimeError):
    def __init__(self, status_code: int, url: str, detail: dict[str, Any]) -> None:
        self.status_code = status_code
        self.url = url
        self.detail = detail
        super().__init__(
            json.dumps(
                {
                    "status_code": status_code,
                    "url": url,
                    "error": detail,
                },
                ensure_ascii=False,
            )
        )


@dataclass(frozen=True)
class DimensionSpec:
    parameter_name: str
    display_name: str
    description: str
    required_for_funnel: bool = False


DIMENSIONS = [
    DimensionSpec(
        "aff_var",
        "Affiliate aff_var",
        "Canonical affiliate variable in the format pageType:slug:placement.",
        True,
    ),
    DimensionSpec(
        "page_type",
        "Affiliate page type",
        "CDM2026 page type that emitted the affiliate click.",
        True,
    ),
    DimensionSpec(
        "placement",
        "Affiliate CTA placement",
        "Affiliate CTA placement on the page.",
        True,
    ),
    DimensionSpec(
        "affiliate_program",
        "Affiliate program",
        "Affiliate program or bookmaker targeted by the click.",
        True,
    ),
    DimensionSpec(
        "page_slug",
        "Affiliate page slug",
        "CDM2026 page slug that emitted the affiliate click.",
    ),
    DimensionSpec(
        "cta_type",
        "Affiliate CTA type",
        "Visual or semantic CTA type used for the affiliate click.",
    ),
    DimensionSpec(
        "outbound_domain",
        "Affiliate outbound domain",
        "Outbound affiliate domain, without the full URL.",
    ),
]


def parse_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    if not path.exists():
        return values
    for raw_line in path.read_text().splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip("\"'")
    return values


def request_json(
    session: requests.Session,
    method: str,
    url: str,
    *,
    payload: dict[str, Any] | None = None,
) -> dict[str, Any]:
    response = session.request(method, url, json=payload, timeout=30)
    if response.status_code >= 400:
        try:
            detail = response.json()
        except Exception:  # pragma: no cover - defensive diagnostics
            detail = {"raw": response.text[:1000]}
        raise ApiError(response.status_code, url, detail)
    if not response.text:
        return {}
    return response.json()


def build_session(service_account_path: Path) -> requests.Session:
    credentials = service_account.Credentials.from_service_account_file(
        str(service_account_path),
        scopes=ADMIN_SCOPES,
    )
    credentials.refresh(Request())
    session = requests.Session()
    session.headers.update(
        {
            "Authorization": f"Bearer {credentials.token}",
            "Content-Type": "application/json",
        }
    )
    return session


def normalize_property_id(value: str) -> str:
    value = value.strip()
    if value.startswith("properties/"):
        return value.split("/", 1)[1]
    return value


def list_dimensions(session: requests.Session, property_id: str) -> list[dict[str, Any]]:
    dimensions: list[dict[str, Any]] = []
    page_token = ""
    while True:
        url = f"{ADMIN_API_BASE}/properties/{property_id}/customDimensions?pageSize=200"
        if page_token:
            url += f"&pageToken={page_token}"
        data = request_json(session, "GET", url)
        dimensions.extend(data.get("customDimensions", []))
        page_token = data.get("nextPageToken", "")
        if not page_token:
            return dimensions


def create_dimension(
    session: requests.Session,
    property_id: str,
    spec: DimensionSpec,
) -> dict[str, Any]:
    payload = {
        "parameterName": spec.parameter_name,
        "displayName": spec.display_name,
        "description": spec.description,
        "scope": "EVENT",
        "disallowAdsPersonalization": False,
    }
    url = f"{ADMIN_API_BASE}/properties/{property_id}/customDimensions"
    return request_json(session, "POST", url, payload=payload)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Ensure GA4 custom dimensions required for CDM2026 affiliate attribution."
    )
    parser.add_argument("--env", type=Path, default=DEFAULT_ENV_PATH)
    parser.add_argument("--property-id", default="")
    parser.add_argument("--service-account", type=Path, default=None)
    parser.add_argument("--required-only", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    env = parse_env(args.env)
    property_id = normalize_property_id(args.property_id or env.get("GA4_PROPERTY_ID", ""))
    service_account_path = args.service_account or Path(
        env.get("GA4_SERVICE_ACCOUNT_JSON", str(DEFAULT_SERVICE_ACCOUNT_PATH))
    )

    if not property_id:
        print(json.dumps({"status": "missing_property_id"}, ensure_ascii=False))
        return 2
    if not service_account_path.exists():
        print(
            json.dumps(
                {
                    "status": "missing_service_account",
                    "service_account_path": str(service_account_path),
                },
                ensure_ascii=False,
            )
        )
        return 2

    specs = [spec for spec in DIMENSIONS if spec.required_for_funnel or not args.required_only]

    session = build_session(service_account_path)
    existing = list_dimensions(session, property_id)
    existing_by_parameter = {
        item.get("parameterName"): item
        for item in existing
        if item.get("parameterName")
    }

    created: list[str] = []
    already_present: list[str] = []
    would_create: list[str] = []

    for spec in specs:
        if spec.parameter_name in existing_by_parameter:
            already_present.append(spec.parameter_name)
            continue
        if args.dry_run:
            would_create.append(spec.parameter_name)
            continue
        create_dimension(session, property_id, spec)
        created.append(spec.parameter_name)

    final_existing = existing
    if created:
        final_existing = list_dimensions(session, property_id)

    final_names = sorted(
        item.get("parameterName", "")
        for item in final_existing
        if item.get("parameterName")
    )

    print(
        json.dumps(
            {
                "status": "ok",
                "property_id_suffix": property_id[-4:],
                "dry_run": args.dry_run,
                "requested": [spec.parameter_name for spec in specs],
                "already_present": sorted(already_present),
                "would_create": sorted(would_create),
                "created": sorted(created),
                "custom_dimensions_count": len(final_existing),
                "final_requested_present": all(
                    spec.parameter_name in final_names for spec in specs
                ),
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ApiError as exc:
        action = ""
        if exc.status_code == 403:
            action = (
                "Grant this service account Editor or Administrator access "
                "on the GA4 property, then rerun the script."
            )
        print(
            json.dumps(
                {
                    "status": "error",
                    "error_type": type(exc).__name__,
                    "status_code": exc.status_code,
                    "error": exc.detail,
                    "action": action,
                },
                ensure_ascii=False,
                indent=2,
            ),
            file=sys.stderr,
        )
        raise SystemExit(1)
    except Exception as exc:
        print(
            json.dumps(
                {
                    "status": "error",
                    "error_type": type(exc).__name__,
                    "error": str(exc),
                },
                ensure_ascii=False,
                indent=2,
            ),
            file=sys.stderr,
        )
        raise SystemExit(1)
