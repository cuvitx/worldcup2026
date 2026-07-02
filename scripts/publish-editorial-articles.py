#!/usr/bin/env python3
"""Publish original CDM2026 articles from RSS trend signals.

RSS headlines are used as trend signals only. The generated MDX is first-party
analysis with internal links, affiliate-aware CTAs and quality gates.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
import re
import shutil
import subprocess
import sys
import textwrap
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


DEFAULT_REPO_DIR = Path("/srv/cdm2026/repo")
DEFAULT_ARTICLES_DIR = DEFAULT_REPO_DIR / "apps/fr/content/articles"
DEFAULT_RUNTIME_ARTICLES_DIR = Path("/srv/cdm2026/current/apps/fr/content/articles")
DEFAULT_OUTPUT_DIR = Path("/srv/cdm2026/shared/editorial-publisher")
DEFAULT_DRAFTS_DIR = DEFAULT_OUTPUT_DIR / "drafts"
DEFAULT_STATE_PATH = DEFAULT_OUTPUT_DIR / "state.json"
DEFAULT_RSS_URL = (
  "https://news.google.com/rss/search?q=Coupe+du+monde+2026+football"
  "&hl=fr&gl=FR&ceid=FR:fr"
)
DEFAULT_MAX_PER_RUN = 2
DEFAULT_MAX_PER_DAY = 6
MIN_WORDS = 580

PUBLICATION_DISABLED_REASON = (
  "automatic-publication-disabled-until-editorial-quality-review"
)

PUBLIC_BANNED_PATTERNS = (
  "mise à jour automatique",
  "mise a jour automatique",
  "signal de veille rss",
  "veille rss",
  "source détectée",
  "source detectee",
  "côté conversion",
  "cote conversion",
  "angle seo",
  "méthode et garde-fous",
  "methode et garde-fous",
  "article généré",
  "article genere",
  "généré à partir",
  "genere a partir",
)

SPAM_TOKENS = (
  "casino",
  "bonus sans depot",
  "pronostic gratuit fiable 100",
  ".vip",
  "streaming illegal",
)


@dataclass(frozen=True)
class Team:
  id: str
  name: str
  slug: str
  code: str
  flag: str
  group: str
  fifa_ranking: int | None


@dataclass(frozen=True)
class RssItem:
  title: str
  link: str
  source: str
  published_at: str


def slugify(value: str, max_len: int = 86) -> str:
  normalized = (
    value.lower()
    .replace("’", "'")
    .replace("œ", "oe")
    .replace("æ", "ae")
  )
  accents = {
    "à": "a", "â": "a", "ä": "a", "á": "a",
    "ç": "c",
    "é": "e", "è": "e", "ê": "e", "ë": "e",
    "î": "i", "ï": "i", "í": "i",
    "ô": "o", "ö": "o", "ó": "o",
    "ù": "u", "û": "u", "ü": "u", "ú": "u",
    "ñ": "n",
  }
  for src, dst in accents.items():
    normalized = normalized.replace(src, dst)
  normalized = re.sub(r"[^a-z0-9]+", "-", normalized)
  normalized = re.sub(r"-+", "-", normalized).strip("-")
  return normalized[:max_len].strip("-") or "article-cdm-2026"


def normalize_text(value: str) -> str:
  return slugify(value, 220).replace("-", " ")


def short_hash(value: str) -> str:
  return hashlib.sha1(value.encode("utf-8")).hexdigest()[:10]


def read_json(path: Path, default: Any) -> Any:
  if not path.exists():
    return default
  try:
    return json.loads(path.read_text(encoding="utf-8"))
  except json.JSONDecodeError:
    return default


def write_json(path: Path, payload: Any) -> None:
  path.parent.mkdir(parents=True, exist_ok=True)
  path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def fetch_text(url: str, timeout: int = 20) -> str:
  request = urllib.request.Request(
    url,
    headers={
      "User-Agent": "CDM2026 editorial publisher (+https://www.cdm2026.fr)",
    },
  )
  with urllib.request.urlopen(request, timeout=timeout) as response:
    charset = response.headers.get_content_charset() or "utf-8"
    return response.read().decode(charset, errors="replace")


def parse_rss(xml: str) -> list[RssItem]:
  root = ET.fromstring(xml)
  items: list[RssItem] = []
  for node in root.findall(".//item"):
    title = html.unescape((node.findtext("title") or "").strip())
    link = html.unescape((node.findtext("link") or "").strip())
    source_node = node.find("{*}source")
    source = html.unescape((source_node.text if source_node is not None else "") or "")
    published_at = html.unescape((node.findtext("pubDate") or "").strip())
    if title and link:
      items.append(RssItem(title=title, link=link, source=source or domain_of(link), published_at=published_at))
  return items


def domain_of(url: str) -> str:
  host = urlparse(url).netloc.lower()
  return host.replace("www.", "")


def parse_teams(repo_dir: Path) -> list[Team]:
  raw = (repo_dir / "packages/data/src/teams.ts").read_text(encoding="utf-8")
  teams: list[Team] = []

  def decode_ts_string(value: str) -> str:
    try:
      return json.loads(f'"{value}"')
    except json.JSONDecodeError:
      return value

  for block in re.findall(r"\{\s*id:\s*\"[^\"]+\".*?\n\s*\},", raw, re.S):
    def field(name: str) -> str:
      match = re.search(rf"{name}:\s*\"([^\"]*)\"", block)
      return decode_ts_string(match.group(1)) if match else ""

    ranking_match = re.search(r"fifaRanking:\s*(\d+)", block)
    team_id = field("id")
    name = field("name")
    slug = field("slug")
    if not team_id or not name or not slug:
      continue
    teams.append(
      Team(
        id=team_id,
        name=name,
        slug=slug,
        code=field("code"),
        flag=field("flag"),
        group=field("group"),
        fifa_ranking=int(ranking_match.group(1)) if ranking_match else None,
      )
    )
  return teams


def existing_article_slugs(articles_dir: Path) -> set[str]:
  return {path.stem for path in articles_dir.glob("*.mdx")}


def existing_article_fingerprints(articles_dir: Path) -> set[str]:
  fingerprints: set[str] = set()
  for path in articles_dir.glob("*.mdx"):
    raw = path.read_text(encoding="utf-8", errors="replace")
    for value in re.findall(r"sourceFingerprint:\s*\"([^\"]+)\"", raw):
      fingerprints.add(value)
  return fingerprints


def existing_article_title_keys(articles_dir: Path) -> set[str]:
  keys: set[str] = set()
  today = datetime.now(timezone.utc).date().isoformat()
  for path in articles_dir.glob("*.mdx"):
    raw = path.read_text(encoding="utf-8", errors="replace")
    title_match = re.search(r"^title:\s*\"([^\"]+)\"", raw, re.M)
    date_match = re.search(r"^date:\s*\"([^\"]+)\"", raw, re.M)
    if not title_match:
      continue
    if date_match and date_match.group(1) != today:
      continue
    keys.add(slugify(title_match.group(1), 140))
  return keys


def detect_teams(title: str, teams: list[Team]) -> list[Team]:
  text = normalize_text(title)
  detected: list[Team] = []
  aliases = {
    "etats unis": "etats-unis",
    "usa": "etats-unis",
    "rd congo": "rd-congo",
    "coree du sud": "coree-du-sud",
    "cote d ivoire": "cote-divoire",
    "pays bas": "pays-bas",
    "angleterre": "angleterre",
  }
  by_slug = {team.slug: team for team in teams}
  for alias, slug in aliases.items():
    if alias in text and slug in by_slug:
      detected.append(by_slug[slug])
  for team in teams:
    tokens = {normalize_text(team.name), normalize_text(team.slug)}
    if team.code:
      tokens.add(normalize_text(team.code))
    matched = False
    for token in tokens:
      if not token:
        continue
      if len(token) <= 3:
        matched = re.search(rf"(?<![a-z0-9]){re.escape(token)}(?![a-z0-9])", text) is not None
      else:
        matched = token in text
      if matched:
        break
    if matched:
      detected.append(team)
  unique: list[Team] = []
  seen: set[str] = set()
  for team in detected:
    if team.slug not in seen:
      seen.add(team.slug)
      unique.append(team)
  return unique[:3]


def classify(title: str, teams: list[Team]) -> str:
  text = normalize_text(title)
  if any(token in text for token in ["cote", "cotes", "bookmaker", "pari", "pmu", "vainqueur"]):
    if "cote d ivoire" not in text and "cote divoire" not in text:
      return "paris"
  if any(token in text for token in ["blesse", "blessure", "forfait", "tremble", "selection", "liste", "joueur"]):
    return "equipes"
  if any(token in text for token in ["direct", "score", "resultat", "bat", "victoire", "match"]):
    return "match"
  if any(token in text for token in ["16e", "8e", "quart", "demi", "finale", "phase finale", "tableau"]):
    return "phase-finale"
  if teams:
    return "equipes"
  return "analyse"


def is_spam(item: RssItem) -> bool:
  text = normalize_text(f"{item.title} {item.source}")
  return any(token in text for token in SPAM_TOKENS)


def select_money_links(topic: str, teams: list[Team]) -> list[tuple[str, str]]:
  links: list[tuple[str, str]] = []
  primary = teams[0] if teams else None
  if primary:
    links.extend(
      [
        (f"/equipe/{primary.slug}", f"fiche {primary.name}"),
        (f"/effectif/{primary.slug}", f"effectif {primary.name}"),
        (f"/pronostic/{primary.slug}", f"pronostic {primary.name}"),
        (f"/cote-champion/{primary.slug}", f"cote champion {primary.name}"),
      ]
    )
  if topic == "paris":
    links.extend(
      [
        ("/comparateur-cotes", "comparateur de cotes"),
        ("/pronostic/vainqueur", "pronostic vainqueur"),
        ("/meilleurs-bookmakers", "bookmakers Coupe du Monde"),
      ]
    )
  elif topic == "phase-finale":
    links.extend(
      [
        ("/phase-finale", "phase finale officielle"),
        ("/tableau", "tableau pronostic"),
        ("/pronostic/vainqueur", "pronostic vainqueur"),
      ]
    )
  else:
    links.extend(
      [
        ("/match/calendrier", "calendrier des matchs"),
        ("/phase-finale", "phase finale"),
        ("/pronostics", "pronostics CDM 2026"),
      ]
    )
  deduped: list[tuple[str, str]] = []
  seen: set[str] = set()
  for href, label in links:
    if href not in seen:
      seen.add(href)
      deduped.append((href, label))
  return deduped[:7]


def title_for(item: RssItem, topic: str, teams: list[Team], today: str) -> str:
  if len(teams) >= 2:
    return f"{teams[0].name} - {teams[1].name} : ce que le signal du jour change pour le Mondial 2026"
  if teams:
    if topic == "paris":
      return f"{teams[0].name} au Mondial 2026 : cote, dynamique et angle de pari à suivre"
    if topic == "equipes":
      return f"{teams[0].name} Coupe du Monde 2026 : forme, effectif et signal à surveiller"
    return f"{teams[0].name} au Mondial 2026 : l'analyse du signal du jour"
  if topic == "phase-finale":
    return "Phase finale CDM 2026 : les signaux à suivre dans le tableau"
  if topic == "paris":
    return "Cotes Coupe du Monde 2026 : le signal betting du jour à analyser"
  return f"Coupe du Monde 2026 : les signaux à surveiller ce {today}"


def description_for(topic: str, teams: list[Team]) -> str:
  if teams:
    return (
      f"Analyse originale CDM 2026 autour de {', '.join(team.name for team in teams)} : "
      "contexte sportif, impact sur le parcours, liens utiles et angles de pronostic."
    )
  if topic == "paris":
    return "Analyse originale des signaux de cotes Coupe du Monde 2026, avec contexte, prudence et liens utiles pour comparer."
  return "Analyse originale des tendances Coupe du Monde 2026 détectées par la veille RSS, enrichie avec les données CDM2026."


def paragraph(text: str) -> str:
  return textwrap.fill(text, width=96)


def words_count(text: str) -> int:
  cleaned = re.sub(r"<[^>]+>", " ", text)
  return len(re.findall(r"\b[\wÀ-ÿ'-]+\b", cleaned))


def public_quality_issues(mdx: str) -> list[str]:
  normalized = (
    mdx.lower()
    .replace("’", "'")
    .replace("œ", "oe")
    .replace("æ", "ae")
  )
  accents = {
    "à": "a", "â": "a", "ä": "a", "á": "a",
    "ç": "c",
    "é": "e", "è": "e", "ê": "e", "ë": "e",
    "î": "i", "ï": "i", "í": "i",
    "ô": "o", "ö": "o", "ó": "o",
    "ù": "u", "û": "u", "ü": "u", "ú": "u",
    "ñ": "n",
  }
  for src, dst in accents.items():
    normalized = normalized.replace(src, dst)

  issues: list[str] = []
  for pattern in PUBLIC_BANNED_PATTERNS:
    clean_pattern = pattern.lower()
    for src, dst in accents.items():
      clean_pattern = clean_pattern.replace(src, dst)
    if clean_pattern in normalized:
      issues.append(f"internal-pattern:{pattern}")
  return issues


def build_article_body(
  item: RssItem,
  title: str,
  topic: str,
  teams: list[Team],
  links: list[tuple[str, str]],
  generated_at: str,
) -> str:
  team_names = ", ".join(team.name for team in teams) if teams else "la Coupe du Monde 2026"
  source_name = item.source or domain_of(item.link)
  primary = teams[0] if teams else None
  ranking_sentence = ""
  if primary and primary.fifa_ranking:
    ranking_sentence = (
      f" Dans notre base, {primary.name} arrive avec un classement FIFA #{primary.fifa_ranking}, "
      f"ce qui donne un repère utile pour replacer le bruit médiatique dans une hiérarchie sportive."
    )

  bullets = "\n".join(f"- [{label}]({href})" for href, label in links[:5])
  cta_href = links[0][0] if links else "/pronostics"
  cta_label = "Comparer le contexte et les cotes" if topic == "paris" else "Voir l'analyse liée"

  body = f"""
<InfoBox type="info">
Mise à jour automatique CDM2026 : cet article est généré à partir d'un signal de veille RSS, puis enrichi avec nos pages match, équipe, pronostic et cotes. La source sert de déclencheur éditorial, pas de contenu à recopier.
</InfoBox>

## Pourquoi ce sujet ressort maintenant

{paragraph(f"Un signal récent repéré via la veille RSS francophone mentionne {team_names}. La source détectée est {source_name}. Plutôt que de reprendre l'article d'origine, on l'utilise comme point de départ pour répondre à la vraie question utile pour les lecteurs : qu'est-ce que cela change pour suivre, pronostiquer ou comparer le parcours de cette équipe dans la Coupe du Monde 2026 ?")}

{paragraph(f"Le sujet mérite d'être traité parce qu'il se situe au croisement de trois intentions fortes : information chaude, lecture sportive et décision de clic vers les pages qui aident à comparer. {ranking_sentence} L'objectif est donc de donner une grille de lecture rapide, pas de produire un résumé générique.")}

## Lecture sportive

{paragraph(f"Pour {team_names}, le premier filtre reste le calendrier. Une actualité isolée a peu de valeur si elle n'est pas replacée dans la séquence des matchs, la phase de compétition et les adversaires possibles. C'est précisément ce qui permet de distinguer un simple bruit médiatique d'un vrai signal de performance ou de risque.")}

{paragraph("Dans une Coupe du Monde à 48 équipes, le rythme change vite : un résultat, une blessure, une qualification ou une rotation peut modifier la perception d'une équipe en quelques heures. Les pages match et phase finale doivent donc rester les points d'ancrage : elles donnent les horaires, le stade, les affiches officielles et les liens de pronostic les plus proches de l'intention utilisateur.")}

## Ce que cela peut changer pour les pronostics

{paragraph("Un signal d'actualité n'est pas une certitude de pari. Il doit plutôt servir à vérifier trois éléments : la dynamique récente, l'importance du match suivant et la cohérence avec les cotes disponibles. Si ces trois éléments convergent, la page devient intéressante à suivre. Si un seul élément ressort, il vaut mieux garder une lecture prudente.")}

{paragraph("Côté conversion, le meilleur parcours utilisateur n'est pas de pousser directement un bouton bookmaker au hasard. Le bon tunnel consiste à envoyer vers la fiche équipe, le pronostic du match ou la page cote champion selon l'intention. C'est ce maillage qui permet de transformer un trafic d'actualité en trafic qualifié, sans dégrader l'expérience du lecteur.")}

## Angle SEO à suivre

{paragraph("Le bon indicateur après publication n'est pas seulement le volume de visites. Il faut regarder si la page capte des requêtes proches de l'intention réelle : horaire du match, adversaire suivant, cote champion, pronostic, chaîne TV ou composition probable. Si Search Console montre des impressions mais peu de clics, le titre, l'introduction et les liens internes doivent être ajustés. Si la page génère des clics vers les CTA PMU, elle peut devenir un support durable pour les pages money liées.")}

## Pages à ouvrir ensuite

{bullets}

<BettingCta label="{cta_label}" href="{cta_href}" />

## Méthode et garde-fous

{paragraph(f"Article généré le {generated_at}. Les données sportives internes, les pages de calendrier et les pages de pronostic doivent rester prioritaires sur le signal RSS. Si une information change après publication, l'article peut être remplacé ou complété par une page match, équipe ou phase finale plus précise.")}

{paragraph("Jeu responsable : les cotes peuvent évoluer et ne garantissent jamais un résultat. Les contenus de paris doivent aider à comparer et à comprendre, pas à pousser une prise de risque excessive.")}
""".strip()
  return f"{body}\n"


def frontmatter(
  *,
  title: str,
  description: str,
  slug: str,
  topic: str,
  teams: list[Team],
  item: RssItem,
  source_fingerprint: str,
) -> str:
  now = datetime.now(timezone.utc)
  tags = ["CDM 2026", "actualité", topic]
  tags.extend(team.name for team in teams[:2])
  image = teams[0].flag if teams else ("📈" if topic == "paris" else "📰")
  category = "pronostic" if topic == "paris" else "actualite"
  safe = {
    "title": title,
    "description": description,
    "date": now.date().isoformat(),
    "updated": now.isoformat(),
    "author": "Rédaction CDM 2026",
    "category": category,
    "tags": tags,
    "imageEmoji": image,
    "featured": False,
    "slug": slug,
    "sourceName": item.source,
    "sourceUrl": item.link,
    "sourceFingerprint": source_fingerprint,
    "autoGenerated": True,
  }
  lines = ["---"]
  for key, value in safe.items():
    if isinstance(value, bool):
      lines.append(f"{key}: {str(value).lower()}")
    elif isinstance(value, list):
      encoded = ", ".join(json.dumps(item, ensure_ascii=False) for item in value)
      lines.append(f"{key}: [{encoded}]")
    else:
      lines.append(f"{key}: {json.dumps(value, ensure_ascii=False)}")
  lines.append("---")
  return "\n".join(lines)


def build_article(item: RssItem, teams_index: list[Team]) -> dict[str, Any] | None:
  if is_spam(item):
    return None
  teams = detect_teams(item.title, teams_index)
  topic = classify(item.title, teams)
  if not teams and topic == "analyse":
    return None

  today_label = datetime.now(timezone.utc).strftime("%d/%m")
  title = title_for(item, topic, teams, today_label)
  slug_base = slugify(title)
  slug = f"{slug_base}-{datetime.now(timezone.utc).strftime('%Y%m%d')}"
  fingerprint = short_hash(f"{item.title}|{item.link}")
  links = select_money_links(topic, teams)
  description = description_for(topic, teams)
  body = build_article_body(
    item=item,
    title=title,
    topic=topic,
    teams=teams,
    links=links,
    generated_at=datetime.now(timezone.utc).strftime("%d/%m/%Y %H:%M UTC"),
  )
  if words_count(body) < MIN_WORDS:
    return None
  mdx = f"{frontmatter(title=title, description=description, slug=slug, topic=topic, teams=teams, item=item, source_fingerprint=fingerprint)}\n\n{body}"
  quality_issues = public_quality_issues(mdx)
  return {
    "slug": slug,
    "title": title,
    "topic": topic,
    "teams": [team.slug for team in teams],
    "source": {"title": item.title, "url": item.link, "name": item.source},
    "sourceFingerprint": fingerprint,
    "wordCount": words_count(body),
    "links": [href for href, _label in links],
    "qualityIssues": quality_issues,
    "mdx": mdx,
  }


def published_today(state: dict[str, Any]) -> int:
  today = datetime.now(timezone.utc).date().isoformat()
  return sum(1 for item in state.get("published", []) if str(item.get("date")) == today)


def write_report(output_dir: Path, payload: dict[str, Any]) -> None:
  output_dir.mkdir(parents=True, exist_ok=True)
  reports = output_dir / "reports"
  reports.mkdir(parents=True, exist_ok=True)
  stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
  json_path = reports / f"publisher_{stamp}.json"
  json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
  shutil.copy2(json_path, output_dir / "latest.json")
  lines = [
    "# Publisher editorial CDM2026",
    "",
    f"Genere : {payload['generated_at']}",
    f"Status : `{payload['status']}`",
    f"RSS items lus : {payload['rss_items']}",
    f"Articles publies : {len(payload['published'])}",
    f"Brouillons : {len(payload.get('drafted', []))}",
    "",
  ]
  for article in payload["published"]:
    lines.extend(
      [
        f"## {article['title']}",
        "",
        f"- Slug : `{article['slug']}`",
        f"- Topic : `{article['topic']}`",
        f"- Mots : {article['wordCount']}",
        f"- Source signal : {article['source']['name']}",
        f"- Liens : {', '.join(f'`{link}`' for link in article['links'])}",
        "",
      ]
    )
  for article in payload.get("drafted", []):
    lines.extend(
      [
        f"## Brouillon bloque - {article['title']}",
        "",
        f"- Slug : `{article['slug']}`",
        f"- Raisons : {', '.join(article.get('qualityIssues') or [payload.get('publicationMode', 'draft')])}",
        "",
      ]
    )
  md_path = reports / f"publisher_{stamp}.md"
  md_path.write_text("\n".join(lines), encoding="utf-8")
  shutil.copy2(md_path, output_dir / "latest.md")


def refresh_sitemap(repo_dir: Path, runtime_articles_dir: Path) -> dict[str, Any]:
  try:
    result = subprocess.run(
      ["npx", "tsx", "apps/fr/scripts/generate-sitemap.ts"],
      cwd=repo_dir,
      check=False,
      timeout=120,
      capture_output=True,
      text=True,
    )
    repo_sitemap = repo_dir / "apps/fr/public/sitemap.xml"
    runtime_sitemap = runtime_articles_dir.parent.parent / "public/sitemap.xml"
    copied = False
    if result.returncode == 0 and repo_sitemap.exists() and runtime_sitemap.parent.exists():
      shutil.copy2(repo_sitemap, runtime_sitemap)
      copied = True
    return {
      "status": "ok" if result.returncode == 0 else "failed",
      "returnCode": result.returncode,
      "copiedToRuntime": copied,
      "stdoutTail": result.stdout[-500:],
      "stderrTail": result.stderr[-500:],
    }
  except (OSError, subprocess.TimeoutExpired) as exc:
    return {"status": "failed", "error": str(exc), "copiedToRuntime": False}


def main() -> int:
  parser = argparse.ArgumentParser(description=__doc__)
  parser.add_argument("--repo-dir", type=Path, default=DEFAULT_REPO_DIR)
  parser.add_argument("--articles-dir", type=Path, default=DEFAULT_ARTICLES_DIR)
  parser.add_argument("--runtime-articles-dir", type=Path, default=DEFAULT_RUNTIME_ARTICLES_DIR)
  parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
  parser.add_argument("--drafts-dir", type=Path, default=DEFAULT_DRAFTS_DIR)
  parser.add_argument("--state-path", type=Path, default=DEFAULT_STATE_PATH)
  parser.add_argument("--rss-url", default=os.environ.get("EDITORIAL_RSS_URL", DEFAULT_RSS_URL))
  parser.add_argument("--max-per-run", type=int, default=int(os.environ.get("EDITORIAL_MAX_PER_RUN", DEFAULT_MAX_PER_RUN)))
  parser.add_argument("--max-per-day", type=int, default=int(os.environ.get("EDITORIAL_MAX_PER_DAY", DEFAULT_MAX_PER_DAY)))
  parser.add_argument("--publish", action="store_true", help="Write public MDX files. Default is draft/report only.")
  parser.add_argument("--dry-run", action="store_true")
  args = parser.parse_args()

  args.articles_dir.mkdir(parents=True, exist_ok=True)
  article_dirs = [args.articles_dir]
  try:
    runtime_dir = args.runtime_articles_dir.resolve()
    primary_dir = args.articles_dir.resolve()
    if args.runtime_articles_dir.exists() and runtime_dir != primary_dir:
      article_dirs.append(args.runtime_articles_dir)
  except OSError:
    pass
  state = read_json(args.state_path, {"published": [], "seenFingerprints": []})
  seen_fingerprints = set(state.get("seenFingerprints") or [])
  seen_title_keys = set(state.get("seenTitleKeys") or [])
  for directory in article_dirs:
    seen_fingerprints |= existing_article_fingerprints(directory)
    seen_title_keys |= existing_article_title_keys(directory)
  existing_slugs: set[str] = set()
  for directory in article_dirs:
    existing_slugs |= existing_article_slugs(directory)
  remaining_today = max(0, args.max_per_day - published_today(state))
  publish_limit = min(args.max_per_run, remaining_today)

  xml = fetch_text(args.rss_url)
  rss_items = parse_rss(xml)
  teams = parse_teams(args.repo_dir)
  candidates: list[dict[str, Any]] = []

  for item in rss_items if publish_limit > 0 else []:
    article = build_article(item, teams)
    if not article:
      continue
    if article["sourceFingerprint"] in seen_fingerprints:
      continue
    title_key = slugify(article["title"], 140)
    if title_key in seen_title_keys:
      continue
    article["titleKey"] = title_key
    original_slug = article["slug"]
    suffix = 2
    while article["slug"] in existing_slugs:
      article["slug"] = f"{original_slug}-{suffix}"
      article["mdx"] = re.sub(r"slug: \"[^\"]+\"", f"slug: \"{article['slug']}\"", article["mdx"], count=1)
      suffix += 1
    candidates.append(article)
    if len(candidates) >= publish_limit:
      break

  public_candidates = [
    article for article in candidates
    if not article.get("qualityIssues")
  ]
  blocked_candidates = [
    article for article in candidates
    if article.get("qualityIssues")
  ]

  published: list[dict[str, Any]] = []
  drafted: list[dict[str, Any]] = []

  if args.dry_run:
    drafted = [{key: value for key, value in article.items() if key != "mdx"} for article in candidates]
  elif args.publish:
    for article in public_candidates:
      for directory in article_dirs:
        directory.mkdir(parents=True, exist_ok=True)
        path = directory / f"{article['slug']}.mdx"
        path.write_text(article["mdx"] + "\n", encoding="utf-8")
      existing_slugs.add(article["slug"])
      seen_fingerprints.add(article["sourceFingerprint"])
      seen_title_keys.add(article["titleKey"])
      published.append({key: value for key, value in article.items() if key != "mdx"})
    for article in blocked_candidates:
      args.drafts_dir.mkdir(parents=True, exist_ok=True)
      draft_path = args.drafts_dir / f"{article['slug']}.mdx"
      draft_path.write_text(article["mdx"] + "\n", encoding="utf-8")
      drafted.append({key: value for key, value in article.items() if key != "mdx"})
    today = datetime.now(timezone.utc).date().isoformat()
    state.setdefault("published", [])
    state["published"].extend({**article, "date": today} for article in published)
    state["seenFingerprints"] = sorted(seen_fingerprints)
    state["seenTitleKeys"] = sorted(seen_title_keys)
    state["updatedAt"] = datetime.now(timezone.utc).isoformat()
    write_json(args.state_path, state)
  else:
    args.drafts_dir.mkdir(parents=True, exist_ok=True)
    for article in candidates:
      draft_path = args.drafts_dir / f"{article['slug']}.mdx"
      draft_path.write_text(article["mdx"] + "\n", encoding="utf-8")
      payload = {key: value for key, value in article.items() if key != "mdx"}
      payload.setdefault("qualityIssues", [])
      payload["qualityIssues"].append(PUBLICATION_DISABLED_REASON)
      drafted.append(payload)

  sitemap_refresh = (
    refresh_sitemap(args.repo_dir, args.runtime_articles_dir)
    if args.publish and not args.dry_run and published
    else {"status": "skipped", "copiedToRuntime": False}
  )

  payload = {
    "status": "ok",
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "dry_run": args.dry_run,
    "publicationMode": "public" if args.publish else "draft-only",
    "rss_items": len(rss_items),
    "remaining_today_before_run": remaining_today,
    "article_dirs": [str(directory) for directory in article_dirs],
    "drafts_dir": str(args.drafts_dir),
    "sitemap_refresh": sitemap_refresh,
    "published": published,
    "drafted": drafted,
  }
  write_report(args.output_dir, payload)
  print(json.dumps(payload, ensure_ascii=False, indent=2))
  return 0


if __name__ == "__main__":
  try:
    raise SystemExit(main())
  except (urllib.error.URLError, ET.ParseError, OSError) as exc:
    print(json.dumps({"status": "error", "error": str(exc)}, ensure_ascii=False), file=sys.stderr)
    raise SystemExit(1)
