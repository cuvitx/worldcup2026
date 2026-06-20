#!/usr/bin/env python3
"""
GA4 analysis for cdm2026.fr — traffic, top pages, sources, conversions.
"""

import json
from google.oauth2 import service_account
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    RunReportRequest, DateRange, Metric, Dimension, OrderBy, FilterExpression, Filter
)

KEY_FILE = "/Users/admin/Downloads/cdm2026-499912-2208cf4fc995.json"
PROPERTY_ID = "properties/538362805"

creds = service_account.Credentials.from_service_account_file(
    KEY_FILE, scopes=["https://www.googleapis.com/auth/analytics.readonly"]
)
client = BetaAnalyticsDataClient(credentials=creds)


def run_report(metrics, dimensions=None, date_start="2026-06-01", date_end="2026-06-19", limit=25, order_by_metric=None):
    request = RunReportRequest(
        property=PROPERTY_ID,
        date_ranges=[DateRange(start_date=date_start, end_date=date_end)],
        metrics=[Metric(name=m) for m in metrics],
        dimensions=[Dimension(name=d) for d in (dimensions or [])],
        limit=limit,
    )
    if order_by_metric:
        request.order_bys = [OrderBy(metric=OrderBy.MetricOrderBy(metric_name=order_by_metric), desc=True)]
    return client.run_report(request)


def print_section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")


# 1. Overview
print_section("1. OVERVIEW — Jun 1-19, 2026")
resp = run_report(["activeUsers", "sessions", "screenPageViews", "averageSessionDuration", "bounceRate", "engagedSessions"])
for row in resp.rows:
    vals = [v.value for v in row.metric_values]
    print(f"  Active Users:     {vals[0]}")
    print(f"  Sessions:         {vals[1]}")
    print(f"  Page Views:       {vals[2]}")
    print(f"  Avg Session (s):  {vals[3]}")
    print(f"  Bounce Rate:      {float(vals[4])*100:.1f}%")
    print(f"  Engaged Sessions: {vals[5]}")

# 2. Daily trend
print_section("2. DAILY TREND — Jun 1-19")
resp = run_report(["activeUsers", "sessions", "screenPageViews"], ["date"], order_by_metric="sessions")
rows = []
for row in resp.rows:
    d = row.dimension_values[0].value
    rows.append((d, row.metric_values[0].value, row.metric_values[1].value, row.metric_values[2].value))
rows.sort(key=lambda x: x[0])
print(f"  {'Date':<12} {'Users':>8} {'Sessions':>10} {'PageViews':>10}")
for d, u, s, p in rows:
    print(f"  {d:<12} {u:>8} {s:>10} {p:>10}")

# 3. Top pages
print_section("3. TOP 30 PAGES by Page Views")
resp = run_report(["screenPageViews", "activeUsers", "averageSessionDuration"], ["pagePath"], order_by_metric="screenPageViews", limit=30)
print(f"  {'Page':<55} {'Views':>8} {'Users':>8}")
for row in resp.rows:
    page = row.dimension_values[0].value
    views = row.metric_values[0].value
    users = row.metric_values[1].value
    print(f"  {page:<55} {views:>8} {users:>8}")

# 4. Traffic sources
print_section("4. TRAFFIC SOURCES")
resp = run_report(["sessions", "activeUsers"], ["sessionSource", "sessionMedium"], order_by_metric="sessions", limit=20)
print(f"  {'Source / Medium':<45} {'Sessions':>10} {'Users':>8}")
for row in resp.rows:
    src = f"{row.dimension_values[0].value} / {row.dimension_values[1].value}"
    print(f"  {src:<45} {row.metric_values[0].value:>10} {row.metric_values[1].value:>8}")

# 5. Countries
print_section("5. TOP COUNTRIES")
resp = run_report(["activeUsers", "sessions"], ["country"], order_by_metric="activeUsers", limit=15)
print(f"  {'Country':<30} {'Users':>10} {'Sessions':>10}")
for row in resp.rows:
    print(f"  {row.dimension_values[0].value:<30} {row.metric_values[0].value:>10} {row.metric_values[1].value:>10}")

# 6. Devices
print_section("6. DEVICES")
resp = run_report(["activeUsers", "sessions", "bounceRate"], ["deviceCategory"], order_by_metric="activeUsers")
print(f"  {'Device':<15} {'Users':>10} {'Sessions':>10} {'Bounce':>10}")
for row in resp.rows:
    br = f"{float(row.metric_values[2].value)*100:.1f}%"
    print(f"  {row.dimension_values[0].value:<15} {row.metric_values[0].value:>10} {row.metric_values[1].value:>10} {br:>10}")

# 7. Landing pages (entry pages)
print_section("7. TOP LANDING PAGES")
resp = run_report(["sessions", "bounceRate", "averageSessionDuration"], ["landingPage"], order_by_metric="sessions", limit=20)
print(f"  {'Landing Page':<55} {'Sessions':>10} {'Bounce':>8}")
for row in resp.rows:
    br = f"{float(row.metric_values[1].value)*100:.1f}%"
    print(f"  {row.dimension_values[0].value:<55} {row.metric_values[0].value:>10} {br:>8}")

# 8. Outbound link clicks (if events exist)
print_section("8. OUTBOUND CLICKS (click events)")
try:
    resp = run_report(["eventCount"], ["eventName"], order_by_metric="eventCount", limit=15)
    print(f"  {'Event Name':<40} {'Count':>10}")
    for row in resp.rows:
        print(f"  {row.dimension_values[0].value:<40} {row.metric_values[0].value:>10}")
except Exception as e:
    print(f"  Error: {e}")

# 9. New vs Returning
print_section("9. NEW vs RETURNING USERS")
resp = run_report(["activeUsers", "sessions"], ["newVsReturning"], order_by_metric="activeUsers")
print(f"  {'Type':<20} {'Users':>10} {'Sessions':>10}")
for row in resp.rows:
    print(f"  {row.dimension_values[0].value:<20} {row.metric_values[0].value:>10} {row.metric_values[1].value:>10}")

# 10. Page views per day for tournament start (Jun 11-14)
print_section("10. TOURNAMENT OPENING DAYS DETAIL (Jun 11-14)")
resp = run_report(["activeUsers", "sessions", "screenPageViews"], ["date"],
                  date_start="2026-06-11", date_end="2026-06-14", order_by_metric="sessions")
rows = []
for row in resp.rows:
    rows.append((row.dimension_values[0].value, row.metric_values[0].value,
                 row.metric_values[1].value, row.metric_values[2].value))
rows.sort(key=lambda x: x[0])
print(f"  {'Date':<12} {'Users':>8} {'Sessions':>10} {'PageViews':>10}")
for d, u, s, p in rows:
    print(f"  {d:<12} {u:>8} {s:>10} {p:>10}")

print("\n\nDone!")
