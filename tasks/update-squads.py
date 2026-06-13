#!/usr/bin/env python3
"""
Update all 48 World Cup 2026 squads from API-Football data.
Reads saved squad JSONs + our current players.ts, generates updated file.
"""
import json
import os
import re
import unicodedata
import subprocess

SQUADS_DIR = "/Users/admin/Desktop/worldcup2026/tasks/api-squads"
PLAYERS_FILE = "/Users/admin/Desktop/worldcup2026/packages/data/src/players.ts"
API_KEY = "2f3dad3c178e9f596ce5345b84b8fdd1"

# Mapping API team ID → our teamId
TEAM_MAP = {
    1: "belgique", 2: "france", 3: "croatie", 5: "suede", 6: "bresil",
    7: "uruguay", 8: "colombie", 9: "espagne", 10: "angleterre", 11: "panama",
    12: "japon", 13: "senegal", 15: "suisse", 16: "mexique", 17: "coree-du-sud",
    20: "australie", 22: "iran", 23: "arabie-saoudite", 25: "allemagne",
    26: "argentine", 27: "portugal", 28: "tunisie", 31: "maroc", 32: "egypte",
    770: "tchequie", 775: "autriche", 777: "turquie", 1090: "norvege",
    1108: "ecosse", 1113: "bosnie-herzegovine", 1118: "pays-bas",
    1501: "cote-divoire", 1504: "ghana", 1508: "rd-congo",
    1531: "afrique-du-sud", 1532: "algerie", 1533: "cap-vert",
    1548: "jordanie", 1567: "irak", 1568: "ouzbekistan", 1569: "qatar",
    2380: "paraguay", 2382: "equateur", 2384: "etats-unis", 2386: "haiti",
    4673: "nouvelle-zelande", 5529: "canada", 5530: "curacao",
}

POS_MAP = {
    "Goalkeeper": "GK", "Defender": "DF", "Midfielder": "MF", "Attacker": "FW"
}

def normalize(name):
    """Normalize name for matching: remove accents, lowercase, strip."""
    s = unicodedata.normalize('NFD', name)
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return s.lower().strip()

def get_last_name(name):
    """Extract last name(s) from full name."""
    parts = name.strip().split()
    if len(parts) <= 1:
        return normalize(name)
    # Handle abbreviated first name like "M. Maignan"
    if parts[0].endswith('.') and len(parts[0]) <= 3:
        return normalize(' '.join(parts[1:]))
    return normalize(parts[-1])

def make_slug(name):
    """Create URL slug from name."""
    s = normalize(name)
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'\s+', '-', s.strip())
    s = re.sub(r'-+', '-', s)
    return s

def parse_existing_players(content):
    """Parse players from the TS file content."""
    players = {}  # key: (teamId, normalized_last_name) -> player dict

    # Extract player blocks using regex
    pattern = r'\{[^}]*?id:\s*"([^"]+)"[^}]*?name:\s*"([^"]+)"[^}]*?teamId:\s*"([^"]+)"[^}]*?\}'

    for match in re.finditer(pattern, content, re.DOTALL):
        block = match.group(0)
        pid = match.group(1)
        name = match.group(2)
        team_id = match.group(3)

        # Extract all fields
        player = {
            'id': pid,
            'name': name,
            'teamId': team_id,
        }

        slug_m = re.search(r'slug:\s*"([^"]+)"', block)
        if slug_m: player['slug'] = slug_m.group(1)

        pos_m = re.search(r'position:\s*"([^"]+)"', block)
        if pos_m: player['position'] = pos_m.group(1)

        num_m = re.search(r'number:\s*(\d+)', block)
        if num_m: player['number'] = int(num_m.group(1))

        age_m = re.search(r'age:\s*(\d+)', block)
        if age_m: player['age'] = int(age_m.group(1))

        club_m = re.search(r'club:\s*"([^"]+)"', block)
        if club_m: player['club'] = club_m.group(1)

        goals_m = re.search(r'goals:\s*(\d+)', block)
        if goals_m: player['goals'] = int(goals_m.group(1))

        caps_m = re.search(r'caps:\s*(\d+)', block)
        if caps_m: player['caps'] = int(caps_m.group(1))

        desc_m = re.search(r'description:\s*"([^"]*)"', block)
        if desc_m: player['description'] = desc_m.group(1)

        last = get_last_name(name)
        key = (team_id, last)
        players[key] = player

        # Also store by (teamId, full_normalized_name)
        full_key = (team_id, normalize(name))
        players[full_key] = player

    return players

def fetch_full_names(api_team_id, player_ids):
    """Fetch full player names from API-Football for a batch of player IDs."""
    results = {}
    for pid in player_ids:
        try:
            cmd = f'curl -s -H "x-apisports-key: {API_KEY}" "https://v3.football.api-sports.io/players?id={pid}&season=2025"'
            out = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=10)
            data = json.loads(out.stdout)
            if data.get('results', 0) > 0:
                p = data['response'][0]['player']
                full_name = f"{p.get('firstname', '')} {p.get('lastname', '')}".strip()
                club = ''
                if data['response'][0].get('statistics'):
                    club = data['response'][0]['statistics'][0].get('team', {}).get('name', '')
                results[pid] = {'name': full_name, 'club': club}
        except:
            pass
    return results

def main():
    # 1. Read existing players
    with open(PLAYERS_FILE) as f:
        content = f.read()

    existing = parse_existing_players(content)
    print(f"Parsed {len(existing)} existing player entries (with duplicates)")

    # 2. Process each team
    all_players = []  # Final player list
    teams_processed = 0
    players_kept = 0
    players_added = 0
    players_needing_names = []

    # Sort teams for consistent output
    sorted_teams = sorted(TEAM_MAP.items(), key=lambda x: x[1])

    for api_id, team_id in sorted_teams:
        squad_file = os.path.join(SQUADS_DIR, f"{api_id}.json")
        if not os.path.exists(squad_file):
            print(f"WARNING: No squad file for {team_id} (API ID {api_id})")
            continue

        with open(squad_file) as f:
            data = json.load(f)

        if not data.get('response') or len(data['response']) == 0:
            print(f"WARNING: Empty squad for {team_id}")
            continue

        api_players = data['response'][0]['players']
        team_players = []
        unmatched_api_players = []

        for ap in api_players:
            api_name = ap['name']
            api_last = get_last_name(api_name)
            api_pos = POS_MAP.get(ap.get('position', ''), 'MF')
            api_num = ap.get('number')
            api_age = ap.get('age')
            api_pid = ap.get('id')

            # Try to match with existing player
            key1 = (team_id, api_last)
            key2 = (team_id, normalize(api_name))

            matched = existing.get(key1) or existing.get(key2)

            if matched:
                # Update existing player with API data
                p = dict(matched)
                if api_num: p['number'] = api_num
                if api_age: p['age'] = api_age
                p['position'] = api_pos
                team_players.append(p)
                players_kept += 1
            else:
                # New player - need to create entry
                unmatched_api_players.append({
                    'api_id': api_pid,
                    'api_name': api_name,
                    'position': api_pos,
                    'number': api_num,
                    'age': api_age,
                })

        # Fetch full names for unmatched players
        if unmatched_api_players:
            ids_to_fetch = [p['api_id'] for p in unmatched_api_players if p['api_id']]
            full_names = fetch_full_names(api_id, ids_to_fetch) if ids_to_fetch else {}

            for ap in unmatched_api_players:
                api_pid = ap['api_id']
                full_info = full_names.get(api_pid, {})
                full_name = full_info.get('name', '') or ap['api_name']
                club = full_info.get('club', '')

                # If name is still abbreviated, use it but flag
                if not full_name or len(full_name) < 3:
                    full_name = ap['api_name']

                slug = make_slug(full_name)
                p = {
                    'id': slug,
                    'name': full_name,
                    'slug': slug,
                    'teamId': team_id,
                    'position': ap['position'],
                    'number': ap['number'],
                    'age': ap['age'] or 25,
                    'club': club or 'N/A',
                    'goals': 0,
                    'caps': 0,
                    'description': '',
                }
                team_players.append(p)
                players_added += 1
                if not club:
                    players_needing_names.append(f"{team_id}: {full_name}")

        all_players.extend(team_players)
        teams_processed += 1
        print(f"  {team_id}: {len(team_players)} players ({len(team_players) - len(unmatched_api_players)} kept, {len(unmatched_api_players)} new)")

    print(f"\nTotal: {teams_processed} teams, {len(all_players)} players")
    print(f"Kept: {players_kept}, Added: {players_added}")
    if players_needing_names:
        print(f"\nPlayers without club info ({len(players_needing_names)}):")
        for p in players_needing_names[:20]:
            print(f"  {p}")

    # 3. Generate TypeScript output
    generate_ts(all_players)

def generate_ts(players):
    """Generate the updated players.ts file."""
    # Group by team
    teams = {}
    for p in players:
        tid = p['teamId']
        if tid not in teams:
            teams[tid] = []
        teams[tid].append(p)

    # Team display names for comments
    TEAM_NAMES = {
        "afrique-du-sud": "South Africa", "algerie": "Algeria", "allemagne": "Germany",
        "angleterre": "England", "arabie-saoudite": "Saudi Arabia", "argentine": "Argentina",
        "australie": "Australia", "autriche": "Austria", "belgique": "Belgium",
        "bosnie-herzegovine": "Bosnia", "bresil": "Brazil", "canada": "Canada",
        "cap-vert": "Cape Verde", "colombie": "Colombia", "coree-du-sud": "South Korea",
        "cote-divoire": "Ivory Coast", "croatie": "Croatia", "curacao": "Curaçao",
        "ecosse": "Scotland", "egypte": "Egypt", "equateur": "Ecuador",
        "espagne": "Spain", "etats-unis": "USA", "france": "France",
        "ghana": "Ghana", "haiti": "Haiti", "irak": "Iraq", "iran": "Iran",
        "japon": "Japan", "jordanie": "Jordan", "maroc": "Morocco",
        "mexique": "Mexico", "norvege": "Norway", "nouvelle-zelande": "New Zealand",
        "ouzbekistan": "Uzbekistan", "panama": "Panama", "paraguay": "Paraguay",
        "pays-bas": "Netherlands", "portugal": "Portugal", "qatar": "Qatar",
        "rd-congo": "DR Congo", "senegal": "Senegal", "suede": "Sweden",
        "suisse": "Switzerland", "tchequie": "Czech Republic", "tunisie": "Tunisia",
        "turquie": "Turkey", "uruguay": "Uruguay",
    }

    lines = []
    lines.append('import type { Player } from "./types";')
    lines.append('')
    lines.append('// ============================================================================')
    lines.append('// FIFA World Cup 2026 — Official Squads (26 players per team)')
    lines.append(f'// Updated: 2026-06-12 via API-Football')
    lines.append('// ============================================================================')
    lines.append('')
    lines.append('export const LAST_UPDATED = "2026-06-12";')
    lines.append('')
    lines.append('export const players: Player[] = [')

    # Sort teams alphabetically by teamId
    for tid in sorted(teams.keys()):
        team_name = TEAM_NAMES.get(tid, tid)
        team_players = teams[tid]

        # Sort: GK first, then DF, MF, FW
        pos_order = {"GK": 0, "DF": 1, "MF": 2, "FW": 3}
        team_players.sort(key=lambda p: (pos_order.get(p.get('position', 'MF'), 4), p.get('name', '')))

        lines.append(f'  // {team_name}')

        for p in team_players:
            num_str = str(p.get('number', 'undefined')) if p.get('number') else 'undefined'
            desc = p.get('description', '').replace('"', '\\"').replace("'", "\\'")
            name = p.get('name', '').replace('"', '\\"')
            club = p.get('club', 'N/A').replace('"', '\\"')

            lines.append('  {')
            lines.append(f'    id: "{p.get("id", p.get("slug", ""))}",')
            lines.append(f'    name: "{name}",')
            lines.append(f'    slug: "{p.get("slug", p.get("id", ""))}",')
            lines.append(f'    teamId: "{tid}",')
            lines.append(f'    position: "{p.get("position", "MF")}",')
            lines.append(f'    number: {num_str},')
            lines.append(f'    age: {p.get("age", 25)},')
            lines.append(f'    club: "{club}",')
            lines.append(f'    goals: {p.get("goals", 0)},')
            lines.append(f'    caps: {p.get("caps", 0)},')
            lines.append(f'    description: "{desc}"')
            lines.append('  },')

        lines.append('')

    lines.append('];')
    lines.append('')

    output = '\n'.join(lines)
    with open(PLAYERS_FILE, 'w') as f:
        f.write(output)

    print(f"\nWrote {len(players)} players to {PLAYERS_FILE}")

if __name__ == '__main__':
    main()
