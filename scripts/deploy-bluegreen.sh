#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="${ROOT_DIR:-/srv/cdm2026}"
REPO_DIR="${REPO_DIR:-$ROOT_DIR/repo}"
RELEASES_DIR="${RELEASES_DIR:-$ROOT_DIR/releases}"
CURRENT_LINK="${CURRENT_LINK:-$ROOT_DIR/current}"
SLOTS_DIR="${SLOTS_DIR:-$ROOT_DIR/slots}"
UPSTREAM_CONF="${UPSTREAM_CONF:-/etc/nginx/conf.d/cdm2026-active-upstreams.conf}"
APPS="${APPS:-fr de}"
SKIP_GIT_SYNC="${SKIP_GIT_SYNC:-0}"
SKIP_NPM_CI="${SKIP_NPM_CI:-0}"
BUILD_DISABLE_EXTERNAL_ENRICHMENT="${BUILD_DISABLE_EXTERNAL_ENRICHMENT:-1}"
PROXY_CACHE_DIRS="${PROXY_CACHE_DIRS:-/var/cache/nginx/cdm2026-fr /var/cache/nginx/wm2026-de}"

timestamp="$(date +%Y%m%d-%H%M%S)"
release_dir="$RELEASES_DIR/$timestamp"
tmp_upstream="/tmp/cdm2026-active-upstreams.$$.conf"
old_upstream_backup="/tmp/cdm2026-active-upstreams.$$.before.conf"
old_current_target="$(readlink -f "$CURRENT_LINK" 2>/dev/null || true)"
fr_candidate=""
de_candidate=""
fr_old_color=""
de_old_color=""
fr_new_port=""
de_new_port=""
fr_old_port=""
de_old_port=""
started_services=()
switched="0"

log() {
  printf '[%s] %s\n' "$(date +%H:%M:%S)" "$*"
}

app_enabled() {
  local app="$1"
  [[ " $APPS " == *" $app "* ]]
}

port_for() {
  local app="$1"
  local color="$2"
  case "$app:$color" in
    fr:blue) printf '3000' ;;
    fr:green) printf '3001' ;;
    de:blue) printf '3002' ;;
    de:green) printf '3003' ;;
    *) return 1 ;;
  esac
}

active_port_for_upstream() {
  local upstream="$1"
  awk -v upstream="$upstream" '
    $1 == "upstream" && $2 == upstream { in_upstream = 1; next }
    in_upstream && $1 == "server" {
      split($2, parts, ":")
      gsub(";", "", parts[2])
      print parts[2]
      exit
    }
    in_upstream && $1 == "}" { in_upstream = 0 }
  ' "$UPSTREAM_CONF"
}

color_for_port() {
  local app="$1"
  local port="$2"
  case "$app:$port" in
    fr:3000|de:3002) printf 'blue' ;;
    fr:3001|de:3003) printf 'green' ;;
    *) return 1 ;;
  esac
}

opposite_color() {
  local color="$1"
  if [[ "$color" == "blue" ]]; then
    printf 'green'
  else
    printf 'blue'
  fi
}

service_for() {
  local app="$1"
  local color="$2"
  case "$app" in
    fr) printf 'cdm2026-fr@%s' "$color" ;;
    de) printf 'wm2026-de@%s' "$color" ;;
    *) return 1 ;;
  esac
}

legacy_service_for() {
  local app="$1"
  case "$app" in
    fr) printf 'cdm2026' ;;
    de) printf 'wm2026-de' ;;
    *) return 1 ;;
  esac
}

healthcheck_port() {
  local app="$1"
  local port="$2"
  local path="/"

  if [[ "$app" == "fr" ]]; then
    path="/tableau"
  fi

  for attempt in $(seq 1 40); do
    local code
    code="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 5 "http://127.0.0.1:$port$path" || true)"
    if [[ "$code" =~ ^(200|301|302|307|308)$ ]]; then
      log "$app candidate is healthy on port $port ($code)"
      return 0
    fi
    sleep 2
  done

  log "$app candidate failed healthcheck on port $port"
  return 1
}

write_upstream_conf() {
  local fr_port="$1"
  local de_port="$2"

  cat > "$tmp_upstream" <<EOF
upstream cdm2026_fr {
    server 127.0.0.1:$fr_port;
    keepalive 32;
}

upstream wm2026_de {
    server 127.0.0.1:$de_port;
    keepalive 32;
}
EOF
}

clear_proxy_cache() {
  local dir

  for dir in $PROXY_CACHE_DIRS; do
    if [[ -d "$dir" ]]; then
      log "clearing nginx proxy cache $dir"
      find "$dir" -type f -delete
    fi
  done
}

rollback() {
  local exit_code="$?"

  if [[ "$exit_code" -eq 0 ]]; then
    return
  fi

  log "deploy failed; preserving active traffic"

  if [[ "$switched" == "1" ]]; then
    if [[ -s "$old_upstream_backup" ]]; then
      cp "$old_upstream_backup" "$UPSTREAM_CONF" || true
      nginx -t >/dev/null 2>&1 && systemctl reload nginx || true
    fi
    if [[ -n "$old_current_target" ]]; then
      ln -sfn "$old_current_target" "$CURRENT_LINK" || true
    fi
  fi

  for service in "${started_services[@]:-}"; do
    systemctl stop "$service" >/dev/null 2>&1 || true
  done

  rm -f "$tmp_upstream" "$old_upstream_backup"
  exit "$exit_code"
}

trap rollback EXIT

mkdir -p "$RELEASES_DIR" "$SLOTS_DIR"

if [[ ! -f "$UPSTREAM_CONF" ]]; then
  log "missing upstream config: $UPSTREAM_CONF"
  exit 1
fi

fr_old_port="$(active_port_for_upstream cdm2026_fr || true)"
de_old_port="$(active_port_for_upstream wm2026_de || true)"
fr_old_port="${fr_old_port:-3000}"
de_old_port="${de_old_port:-3002}"
fr_old_color="$(color_for_port fr "$fr_old_port")"
de_old_color="$(color_for_port de "$de_old_port")"
fr_candidate="$(opposite_color "$fr_old_color")"
de_candidate="$(opposite_color "$de_old_color")"
fr_new_port="$(port_for fr "$fr_candidate")"
de_new_port="$(port_for de "$de_candidate")"

if ! app_enabled fr; then
  fr_candidate="$fr_old_color"
  fr_new_port="$fr_old_port"
fi

if ! app_enabled de; then
  de_candidate="$de_old_color"
  de_new_port="$de_old_port"
fi

log "active FR port $fr_old_port ($fr_old_color), candidate $fr_candidate:$fr_new_port"
log "active DE port $de_old_port ($de_old_color), candidate $de_candidate:$de_new_port"

cd "$REPO_DIR"

if [[ "$SKIP_GIT_SYNC" != "1" ]]; then
  log "syncing repo from origin/main"
  sudo -u deploy git fetch origin
  dirty_status="$(sudo -u deploy git status --porcelain -- . ':(exclude)apps/fr/public/sitemap.xml')"
  if [[ -n "$dirty_status" ]]; then
    log "repo has local changes; aborting before git reset. Push/commit them or rerun with SKIP_GIT_SYNC=1."
    exit 1
  fi
  if ! sudo -u deploy git merge-base --is-ancestor HEAD origin/main; then
    log "repo has local commits not present on origin/main; aborting before git reset."
    exit 1
  fi
  sudo -u deploy git reset --hard origin/main
else
  log "skipping git sync; using current repo worktree"
fi

if [[ "$SKIP_NPM_CI" != "1" ]]; then
  log "installing dependencies"
  sudo -u deploy npm ci
else
  log "skipping npm ci"
fi

export NODE_ENV=production
export CDM_DISABLE_EXTERNAL_ENRICHMENT="$BUILD_DISABLE_EXTERNAL_ENRICHMENT"

for app in $APPS; do
  if [[ -d "apps/$app/.next" ]]; then
    log "removing stale build workspace apps/$app/.next"
    rm -rf "apps/$app/.next"
  fi
  log "building apps/$app"
  sudo -u deploy env NODE_ENV="$NODE_ENV" CDM_DISABLE_EXTERNAL_ENRICHMENT="$CDM_DISABLE_EXTERNAL_ENRICHMENT" npm run build --workspace="apps/$app"
done

log "creating release $release_dir"
mkdir -p "$release_dir"
rsync -a --delete \
  --exclude='.git' \
  --exclude='._*' \
  --exclude='.DS_Store' \
  --exclude='__pycache__' \
  --exclude='node_modules/.cache' \
  --exclude='apps/*/.next/cache' \
  "$REPO_DIR/" "$release_dir/"

if [[ -n "$old_current_target" ]]; then
  for app in fr de; do
    if [[ -d "$old_current_target/apps/$app/.next/static" && -d "$release_dir/apps/$app/.next" ]]; then
      mkdir -p "$release_dir/apps/$app/.next/static"
      rsync -a "$old_current_target/apps/$app/.next/static/" "$release_dir/apps/$app/.next/static/"
    fi
  done
fi

chown -R deploy:deploy "$release_dir"

if app_enabled fr; then
  ln -sfn "$release_dir" "$SLOTS_DIR/fr-$fr_candidate"
  chown -h deploy:deploy "$SLOTS_DIR/fr-$fr_candidate"
  fr_service="$(service_for fr "$fr_candidate")"
  log "starting $fr_service"
  systemctl restart "$fr_service"
  started_services+=("$fr_service")
  healthcheck_port fr "$fr_new_port"
fi

if app_enabled de; then
  ln -sfn "$release_dir" "$SLOTS_DIR/de-$de_candidate"
  chown -h deploy:deploy "$SLOTS_DIR/de-$de_candidate"
  de_service="$(service_for de "$de_candidate")"
  log "starting $de_service"
  systemctl restart "$de_service"
  started_services+=("$de_service")
  healthcheck_port de "$de_new_port"
fi

cp "$UPSTREAM_CONF" "$old_upstream_backup"
write_upstream_conf "$fr_new_port" "$de_new_port"
install -m 0644 "$tmp_upstream" "$UPSTREAM_CONF"
ln -sfn "$release_dir" "$CURRENT_LINK"
switched="1"

log "validating nginx"
nginx -t
log "reloading nginx"
systemctl reload nginx
clear_proxy_cache

sleep 3

if app_enabled fr; then
  healthcheck_port fr "$fr_new_port"
  systemctl enable "$(service_for fr "$fr_candidate")" >/dev/null
  systemctl disable "$(service_for fr "$fr_old_color")" >/dev/null 2>&1 || true
  systemctl stop "$(service_for fr "$fr_old_color")" >/dev/null 2>&1 || true
  systemctl disable "$(legacy_service_for fr)" >/dev/null 2>&1 || true
  systemctl stop "$(legacy_service_for fr)" >/dev/null 2>&1 || true
fi

if app_enabled de; then
  healthcheck_port de "$de_new_port"
  systemctl enable "$(service_for de "$de_candidate")" >/dev/null
  systemctl disable "$(service_for de "$de_old_color")" >/dev/null 2>&1 || true
  systemctl stop "$(service_for de "$de_old_color")" >/dev/null 2>&1 || true
  systemctl disable "$(legacy_service_for de)" >/dev/null 2>&1 || true
  systemctl stop "$(legacy_service_for de)" >/dev/null 2>&1 || true
fi

rm -f "$tmp_upstream" "$old_upstream_backup"
trap - EXIT

log "deployment complete: $release_dir"
