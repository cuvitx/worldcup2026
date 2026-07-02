#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
import math
import re
import unicodedata
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse


MONEY_TERMS = [
    "cote",
    "cotes",
    "pari",
    "paris",
    "parier",
    "pronostic",
    "pronostics",
    "bookmaker",
    "bonus",
    "vainqueur",
    "champion",
    "score exact",
    "pmu",
]


CLUSTERS = [
    ("money_cotes", ["cote", "cotes", "pari", "parier", "vainqueur", "champion", "bookmaker", "bonus", "pmu"]),
    ("joueurs_effectifs", ["joueur", "joueurs", "effectif", "liste", "convoqué", "convoques", "composition equipe"]),
    ("compos_match", ["composition", "compo", "officielle", "onze", "lineup"]),
    ("phase_finale_tableau", ["tableau", "bracket", "phase finale", "16e", "16es", "8e", "quart", "demi", "finale"]),
    ("calendrier_live", ["calendrier", "match aujourd", "match cdm", "programme", "horaire", "live"]),
    ("groupes_qualification", ["groupe", "qualification", "classement", "meilleur troisième", "meilleurs troisiemes"]),
    ("stats_h2h", ["statistique", "stats", "h2h", "face à face", "confrontation"]),
    ("general_brand", ["cdm", "coupe du monde", "world cup"]),
]


TEAM_HINTS = [
    "france",
    "portugal",
    "bresil",
    "brésil",
    "espagne",
    "algerie",
    "algérie",
    "maroc",
    "senegal",
    "sénégal",
    "argentine",
    "allemagne",
    "pays bas",
    "belgique",
    "uruguay",
    "colombie",
    "mexique",
    "cote d'ivoire",
    "côte d’ivoire",
    "norvege",
    "norvège",
]


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def to_int(value: str | None) -> int:
    try:
        return int(float(value or 0))
    except ValueError:
        return 0


def to_float(value: str | None) -> float:
    try:
        return float(value or 0)
    except ValueError:
        return 0.0


def path_from_url(url: str) -> str:
    path = urlparse(url).path or "/"
    return path if path.startswith("/") else f"/{path}"


def norm(value: str) -> str:
    folded = "".join(
        char
        for char in unicodedata.normalize("NFKD", value.lower())
        if not unicodedata.combining(char)
    )
    folded = folded.replace("’", "'")
    folded = re.sub(r"[/_-]+", " ", folded)
    folded = re.sub(r"[^a-z0-9']+", " ", folded)
    return " ".join(folded.strip().split())


def money_haystack(query: str, page_path: str) -> str:
    haystack = norm(f"{query} {page_path}")
    for pattern in [
        r"\bcote\s+d\s+ivoir\w*\b",
        r"\bcote\s+d'ivoir\w*\b",
        r"\bcote\s+divoir\w*\b",
        r"\bcote\s+ivoir\w*\b",
        r"\bcotedivoir\w*\b",
    ]:
        haystack = re.sub(pattern, "pays ivoire", haystack)
    return haystack


def cluster_for(query: str, page_path: str) -> str:
    general_haystack = norm(f"{query} {page_path}")
    haystack = money_haystack(query, page_path)
    for cluster, terms in CLUSTERS:
        target = haystack if cluster == "money_cotes" else general_haystack
        if any(norm(term) in target for term in terms):
            return cluster
    return "autres"


def money_intent(query: str, page_path: str) -> int:
    haystack = money_haystack(query, page_path)
    score = sum(1 for term in MONEY_TERMS if norm(term) in haystack)
    return min(score, 8)


def is_noise_query(query: str) -> bool:
    haystack = norm(query)
    return any(
        pattern in haystack
        for pattern in [
            "tu es expert",
            "json valide",
            "sans markdown",
            "recommendation",
        ]
    )


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


def page_type(path: str) -> str:
    if path == "/":
        return "homepage"
    if path.startswith("/cote-champion/"):
        return "money_cote_champion"
    if path.startswith("/pronostic-match/"):
        return "money_pronostic_match"
    if path.startswith("/effectif/"):
        return "effectif"
    if path.startswith("/joueurs/equipe/"):
        return "joueurs_equipe"
    if path == "/joueurs" or path.startswith("/joueurs/"):
        return "joueurs"
    if path.startswith("/compos-officielles/"):
        return "compos"
    if path.startswith("/match/"):
        return "match"
    if path in {"/tableau", "/phase-finale", "/16emes-de-finale", "/8emes-de-finale", "/quarts-de-finale", "/demi-finales", "/finale"}:
        return "phase_finale"
    if path.startswith("/groupe/"):
        return "groupe"
    if path.startswith("/actualites/"):
        return "article"
    if path in {"/paris-sportifs", "/comparateur-cotes", "/meilleurs-bookmakers"} or path.startswith("/bookmaker/"):
        return "bookmaker"
    return "info"


def action_for(record: dict) -> tuple[str, str]:
    cluster = record["cluster"]
    path = record["path"]
    query = record["query"]
    ptype = record["page_type"]
    pos = record["position"]
    ctr = record["ctr"]

    if cluster == "money_cotes":
        if ptype.startswith("money_"):
            return (
                "optimiser",
                "Renforcer title/H1 autour de 'cotes Coupe du Monde 2026', ajouter comparatif cotes, FAQ betting, CTA PMU visible et maillage vers pronostic vainqueur.",
            )
        return (
            "creer/mailler",
            "Créer ou pousser une page money dédiée si la requête est récurrente, puis mailler depuis la page actuelle vers cote champion/pronostic.",
        )

    if cluster == "joueurs_effectifs":
        return (
            "optimiser",
            "Optimiser les pages joueurs/effectifs pour les formulations exactes 'joueurs de l'équipe...', 'liste des joueurs...', avec index par équipe, tables filtrables et liens cote champion.",
        )

    if cluster == "compos_match":
        return (
            "optimiser",
            "Enrichir la page compo match : XI probable/officiel, date de mise à jour, blocs pronostic/score exact, schema et title avec les deux équipes.",
        )

    if cluster == "phase_finale_tableau":
        return (
            "optimiser",
            "Consolider l'intention tableau/bracket/phase finale : différencier page officielle et pronostic, ajouter textes courts ciblés et liens vers tours.",
        )

    if cluster == "calendrier_live":
        return (
            "optimiser",
            "Optimiser calendrier/live : title orienté 'match aujourd'hui', intro avec date du jour, blocs phase finale et liens match/pronostic.",
        )

    if cluster == "groupes_qualification":
        return (
            "creer/optimiser",
            "Créer ou renforcer les pages intention 'groupe de [équipe]' et scénarios qualification, avec maillage vers groupe officiel et équipe.",
        )

    if cluster == "stats_h2h":
        return (
            "optimiser",
            "Renforcer stats/H2H : résumé au-dessus de la ligne de flottaison, tableaux utiles, liens vers pronostic match et score exact.",
        )

    if pos <= 12 and ctr < 0.01:
        return ("optimiser_ctr", "Réécrire title/meta pour aligner la promesse SERP avec la requête exacte et ajouter une réponse courte en intro.")

    return ("surveiller", "Conserver en suivi, opportunité secondaire.")


def is_new_page_candidate(record: dict) -> bool:
    q = norm(record["query"])
    p = record["path"]
    if record["cluster"] == "groupes_qualification" and p.startswith("/effectif/"):
        return True
    if record["cluster"] == "money_cotes" and not record["page_type"].startswith("money_") and record["impressions"] >= 30:
        return True
    if "bonus" in q and "coupe du monde" in q and not p.startswith("/bookmaker/"):
        return True
    if "match aujourd" in q and p != "/match/aujourdhui":
        return True
    return False


def score_record(row: dict[str, str]) -> dict:
    path = path_from_url(row.get("page", ""))
    query = row.get("query", "")
    clicks = to_int(row.get("clicks"))
    impressions = to_int(row.get("impressions"))
    ctr = to_float(row.get("ctr"))
    position = to_float(row.get("position"))
    potential_clicks = max(0, int(round(expected_ctr(position) * impressions - clicks)))
    cluster = cluster_for(query, path)
    intent = money_intent(query, path)
    action_type, action = action_for(
        {
            "cluster": cluster,
            "path": path,
            "query": query,
            "page_type": page_type(path),
            "position": position,
            "ctr": ctr,
        }
    )
    opportunity_score = (
        min(35, math.log1p(impressions) / math.log(1_000_000) * 35)
        + min(25, potential_clicks / 5000 * 25)
        + min(20, intent / 8 * 20)
        + (10 if 4 <= position <= 12 else 5 if 12 < position <= 20 else 0)
        + (10 if ctr < expected_ctr(position) * 0.5 else 0)
    )
    return {
        "query": query,
        "page": row.get("page", ""),
        "path": path,
        "page_type": page_type(path),
        "cluster": cluster,
        "clicks": clicks,
        "impressions": impressions,
        "ctr": ctr,
        "ctr_pct": round(ctr * 100, 2),
        "position": round(position, 2),
        "expected_ctr_pct": round(expected_ctr(position) * 100, 2),
        "potential_clicks": potential_clicks,
        "money_intent": intent,
        "score": round(opportunity_score, 2),
        "action_type": action_type,
        "action": action,
        "new_page_candidate": is_new_page_candidate(
            {
                "query": query,
                "path": path,
                "cluster": cluster,
                "page_type": page_type(path),
                "impressions": impressions,
            }
        ),
    }


def aggregate(records: list[dict], key: str) -> list[dict]:
    buckets: dict[str, dict] = {}
    for record in records:
        bucket = buckets.setdefault(
            record[key],
            {
                key: record[key],
                "clicks": 0,
                "impressions": 0,
                "potential_clicks": 0,
                "weighted_position": 0.0,
                "money_intent": 0,
                "max_score": 0.0,
                "top": [],
            },
        )
        bucket["clicks"] += record["clicks"]
        bucket["impressions"] += record["impressions"]
        bucket["potential_clicks"] += record["potential_clicks"]
        bucket["weighted_position"] += record["position"] * max(record["impressions"], 1)
        bucket["money_intent"] = max(bucket["money_intent"], record["money_intent"])
        bucket["max_score"] = max(bucket["max_score"], record["score"])
        bucket["top"].append(record)
    output = []
    for bucket in buckets.values():
        impressions = max(bucket["impressions"], 1)
        bucket["ctr_pct"] = round(bucket["clicks"] / impressions * 100, 2)
        bucket["avg_position"] = round(bucket["weighted_position"] / impressions, 2)
        bucket["top"] = sorted(bucket["top"], key=lambda row: (row["score"], row["impressions"]), reverse=True)[:8]
        bucket["rollup_score"] = round(
            min(
                100,
                min(35, math.log1p(bucket["impressions"]) / math.log(1_000_000) * 35)
                + min(25, bucket["potential_clicks"] / 10000 * 25)
                + min(20, bucket["money_intent"] / 8 * 20)
                + min(20, bucket["max_score"] / 100 * 20),
            ),
            2,
        )
        bucket.pop("weighted_position")
        output.append(bucket)
    return sorted(output, key=lambda row: row["rollup_score"], reverse=True)


def table(rows: list[dict], columns: list[tuple[str, str]], limit: int = 15) -> str:
    if not rows:
        return "_Aucune donnée._"
    lines = [
        "| " + " | ".join(label for label, _ in columns) + " |",
        "| " + " | ".join("---" for _ in columns) + " |",
    ]
    for row in rows[:limit]:
        cells = []
        for _, field in columns:
            value = row.get(field, "")
            if isinstance(value, float):
                value = f"{value:.2f}"
            cells.append(str(value).replace("\n", " ")[:150])
        lines.append("| " + " | ".join(cells) + " |")
    return "\n".join(lines)


def build_report(records: list[dict], summary: dict, seo_aff: dict) -> str:
    records = [
        r
        for r in records
        if r["impressions"] >= 20
        and "casino" not in norm(r["query"])
        and not is_noise_query(r["query"])
    ]
    clusters = aggregate(records, "cluster")
    pages = aggregate(records, "path")
    optimize = sorted(
        [r for r in records if not r["new_page_candidate"] and r["score"] >= 45],
        key=lambda r: (r["score"], r["potential_clicks"], r["impressions"]),
        reverse=True,
    )
    create = sorted(
        [r for r in records if r["new_page_candidate"]],
        key=lambda r: (r["score"], r["potential_clicks"], r["impressions"]),
        reverse=True,
    )
    money = sorted(
        [r for r in records if r["money_intent"] >= 2],
        key=lambda r: (r["score"], r["impressions"]),
        reverse=True,
    )
    zero_clicks = sorted(
        [r for r in records if r["clicks"] == 0 and r["impressions"] >= 200 and r["position"] <= 15],
        key=lambda r: (r["potential_clicks"], r["impressions"]),
        reverse=True,
    )

    lines = [
        "# Opportunites Search Console CDM2026",
        "",
        f"Generated at: {datetime.now(timezone.utc).isoformat()}",
        f"Search Console period: {summary.get('start_date')} -> {summary.get('end_date')}",
        "",
        "## Synthese",
        "",
        f"- Clics Search Console: {summary.get('total_clicks')}",
        f"- Impressions: {summary.get('total_impressions')}",
        f"- CTR moyen: {float(summary.get('avg_ctr', 0)) * 100:.2f}%",
        f"- Position moyenne: {float(summary.get('avg_position', 0)):.2f}",
        f"- Requetes analysees: {summary.get('query_count')}",
        f"- Pages analysees: {summary.get('page_count')}",
        f"- Conversions Gambling connues: {seo_aff.get('summary', {}).get('gambling_commission', 0)} EUR commission potentielle ; GA4 prod detecte: {seo_aff.get('ga4', {}).get('connected')}",
        "",
        "## Priorite executive",
        "",
        "1. Optimiser `/joueurs` et les pages `effectif/*` : volume massif, CTR tres faible, et tunnel naturel vers cote champion/pronostic.",
        "2. Consolider les pages money `/cote-champion/france` et `/cote-champion/portugal` : intention forte, conversions deja observees, positions 5-10 a pousser.",
        "3. Transformer les pages compositions/H2H a gros volume en pages de conversion vers pronostic match et score exact.",
        "4. Creer/renforcer les pages groupe-par-equipe et bonus/bookmakers Coupe du Monde pour capter les requetes sans page parfaitement alignee.",
        "5. Nettoyer ou neutraliser les requetes parasites casino dans les SERP betting, sans les renforcer editorialement.",
        "",
        "## Clusters prioritaires",
        "",
        table(
            clusters,
            [
                ("Cluster", "cluster"),
                ("Impr.", "impressions"),
                ("Clics", "clicks"),
                ("CTR %", "ctr_pct"),
                ("Pos.", "avg_position"),
                ("Clics pot.", "potential_clicks"),
                ("Score", "rollup_score"),
            ],
            12,
        ),
        "",
        "## Pages a optimiser en priorite",
        "",
        table(
            pages,
            [
                ("Page", "path"),
                ("Impr.", "impressions"),
                ("Clics", "clicks"),
                ("CTR %", "ctr_pct"),
                ("Pos.", "avg_position"),
                ("Clics pot.", "potential_clicks"),
                ("Score", "rollup_score"),
            ],
            20,
        ),
        "",
        "## Requetes a optimiser sur pages existantes",
        "",
        table(
            optimize,
            [
                ("Score", "score"),
                ("Requete", "query"),
                ("Page", "path"),
                ("Impr.", "impressions"),
                ("Clics", "clicks"),
                ("CTR %", "ctr_pct"),
                ("Pos.", "position"),
                ("Clics pot.", "potential_clicks"),
                ("Action", "action"),
            ],
            25,
        ),
        "",
        "## Pages ou hubs a creer / renforcer",
        "",
        table(
            create,
            [
                ("Score", "score"),
                ("Requete", "query"),
                ("Page actuelle", "path"),
                ("Cluster", "cluster"),
                ("Impr.", "impressions"),
                ("Pos.", "position"),
                ("Action", "action"),
            ],
            25,
        ),
        "",
        "## Opportunites money",
        "",
        table(
            money,
            [
                ("Score", "score"),
                ("Requete", "query"),
                ("Page", "path"),
                ("Impr.", "impressions"),
                ("Clics", "clicks"),
                ("CTR %", "ctr_pct"),
                ("Pos.", "position"),
                ("Intent", "money_intent"),
                ("Action", "action"),
            ],
            25,
        ),
        "",
        "## Zero clics a fort potentiel",
        "",
        table(
            zero_clicks,
            [
                ("Requete", "query"),
                ("Page", "path"),
                ("Impr.", "impressions"),
                ("Pos.", "position"),
                ("Clics pot.", "potential_clicks"),
                ("Action", "action"),
            ],
            20,
        ),
        "",
        "## Roadmap proposee",
        "",
        "### Sprint 1 - gains rapides CTR + money",
        "",
        "- `/cote-champion/france` et `/cote-champion/portugal` : title/meta/H1 plus generiques `Cotes Coupe du Monde 2026`, intro orientee comparaison, FAQ betting, CTA PMU au-dessus de la ligne de flottaison.",
        "- `/joueurs` : title/H1 cible `Joueurs Coupe du Monde 2026`, index equipes plus visible, liens vers `effectif/*`, `cote-champion/*`, `pronostic/vainqueur`.",
        "- `/tableau` + `/phase-finale` : ajouter blocs de texte courts ciblant `bracket`, `tableau phase finale`, `tableau pronostic`, avec maillage reciproque clair.",
        "",
        "### Sprint 2 - pages a gros volume info -> conversion",
        "",
        "- `effectif/espagne`, `effectif/portugal`, `effectif/bresil`, `effectif/algerie`, `effectif/france` : sections `liste joueurs`, `composition probable`, `groupe`, `parcours`, CTA cote champion.",
        "- `compos-officielles/france-vs-senegal` et autres compos a fort volume : contenu plus riche, date de mise a jour, liens pronostic/score exact.",
        "- Pages H2H/statistiques a gros volume : accroche reponse directe, tableaux utiles, CTA pronostic match.",
        "",
        "### Sprint 3 - nouvelles pages/hubs",
        "",
        "- Hub `Cotes Coupe du Monde 2026` canonique si `/cote-champion/*` ne couvre pas assez l'intention generique.",
        "- Hub `Bonus paris sportifs Coupe du Monde 2026` ou renforcer l'article existant si l'intention bonus reste en page 3.",
        "- Hubs `Groupe de [equipe] Coupe du Monde 2026` ou sections dediees sur pages equipe pour capter `groupe espagne`, `groupe allemagne`, etc.",
        "",
        "## Limites",
        "",
        "- Donnees Search Console disponibles jusqu'au 26 juin 2026, delai normal de 2 jours.",
        "- GA4 production non detecte sur le serveur, donc le lien page -> clic CTA -> conversion reste partiel.",
        "- Les conversions Gambling de cette periode utilisent encore plusieurs `aff_var` legacy ; les prochains rapports seront plus fiables avec les `aff_var` canoniques deja deployes.",
        "",
    ]
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--query-page", default="/srv/cdm2026/shared/search-console/latest.query_page.csv")
    parser.add_argument("--summary", default="/srv/cdm2026/shared/search-console/latest.summary.json")
    parser.add_argument("--seo-affiliation", default="/srv/cdm2026/shared/seo-affiliation/latest.json")
    parser.add_argument("--output", default="/srv/cdm2026/repo/outputs/search-console/seo-opportunities-action-plan.md")
    parser.add_argument("--json-output", default="/srv/cdm2026/repo/outputs/search-console/seo-opportunities-action-plan.json")
    args = parser.parse_args()

    rows = read_csv(Path(args.query_page))
    records = [score_record(row) for row in rows]
    summary = json.loads(Path(args.summary).read_text(encoding="utf-8"))
    seo_aff = json.loads(Path(args.seo_affiliation).read_text(encoding="utf-8"))
    report = build_report(records, summary, seo_aff)

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(report, encoding="utf-8")

    json_output = Path(args.json_output)
    json_output.write_text(
        json.dumps(
            {
                "generated_at": datetime.now(timezone.utc).isoformat(),
                "summary": summary,
                "records": records,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(output)
    print(json_output)


if __name__ == "__main__":
    main()
