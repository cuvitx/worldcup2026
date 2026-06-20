#!/usr/bin/env python3
"""
Add service account as Viewer on GA4 property via OAuth + REST API.
"""

import json
import requests
from google_auth_oauthlib.flow import InstalledAppFlow

CLIENT_SECRETS_FILE = "/Users/admin/Downloads/client_secret_461631870405-mm1kqjnilmtrehm8b33pbg3k4031fqk3.apps.googleusercontent.com.json"
PROPERTY_ID = "538362805"
SERVICE_ACCOUNT_EMAIL = "cdm2026@cdm2026-499912.iam.gserviceaccount.com"
SCOPES = ["https://www.googleapis.com/auth/analytics.manage.users"]

def main():
    flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, scopes=SCOPES)
    credentials = flow.run_local_server(port=8086)
    print("Authenticated successfully!")

    token = credentials.token
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    # Try v1alpha accessBindings
    url = f"https://analyticsadmin.googleapis.com/v1alpha/properties/{PROPERTY_ID}/accessBindings"
    body = {"user": SERVICE_ACCOUNT_EMAIL, "roles": ["predefinedRoles/viewer"]}

    print(f"\nAdding {SERVICE_ACCOUNT_EMAIL} as Viewer...")
    print(f"POST {url}")

    resp = requests.post(url, headers=headers, json=body)
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.text}")

    if resp.status_code == 200:
        print("\nSuccess!")
        return

    # Try v1beta
    url2 = f"https://analyticsadmin.googleapis.com/v1beta/properties/{PROPERTY_ID}/accessBindings"
    resp2 = requests.post(url2, headers=headers, json=body)
    print(f"\nv1beta Status: {resp2.status_code}")
    print(f"v1beta Response: {resp2.text}")

    if resp2.status_code == 200:
        print("\nSuccess (v1beta)!")
        return

    # List current access to debug
    print("\n--- Listing current access bindings ---")
    resp3 = requests.get(url, headers=headers)
    print(f"Status: {resp3.status_code}")
    print(f"Response: {resp3.text[:500]}")

if __name__ == "__main__":
    main()
