#!/usr/bin/env python3
"""
Cleanup accent (orange) color usage across the CDM 2026 project.

Rules:
- KEEP accent ONLY on actual CTA buttons (bg-accent + text-white + px-N + py-N)
  and gradient CTA buttons (from-accent to-X + text-white + px-N + py-N)
- REPLACE everything else with primary/secondary/gray alternatives

Do NOT touch Header.tsx
"""

import os
import re

PROJECT_DIR = "/data/.openclaw/workspace/worldcup2026/apps/fr"
HEADER_RELPATH = "app/components/Header.tsx"

# ─── File discovery ───────────────────────────────────────────────────────────
def get_files():
    files = []
    for root, dirs, filenames in os.walk(PROJECT_DIR):
        dirs[:] = [d for d in dirs if d not in ('.next', 'node_modules', '.git')]
        for fn in filenames:
            if fn.endswith(('.tsx', '.ts')):
                rel = os.path.relpath(os.path.join(root, fn), PROJECT_DIR)
                if rel != HEADER_RELPATH:
                    files.append(os.path.join(root, fn))
    return sorted(files)

# ─── CTA detection ────────────────────────────────────────────────────────────
def is_cta_line(line: str) -> bool:
    """Detect if a line is a CTA button element (bg-accent or from-accent gradient CTA)."""
    has_text_white = 'text-white' in line
    has_padding = bool(re.search(r'\bpx-\d|\bpy-\d', line))
    has_accent_bg = 'bg-accent' in line or 'from-accent' in line
    return has_accent_bg and has_text_white and has_padding

# ─── Replacement rules (order matters) ────────────────────────────────────────

# Always-safe replacements (never appear on CTA buttons)
SAFE_REPLACEMENTS = [
    # ── hover: variants ────────────────────────────────────────────────────
    (r'\bhover:text-accent\b',                 'hover:text-primary'),
    (r'\bdark:hover:text-accent\b',            'dark:hover:text-secondary'),
    (r'\bhover:border-accent(?:/\d+)?\b',      'hover:border-primary/30'),
    (r'\bdark:hover:border-accent(?:/\d+)?\b', 'dark:hover:border-secondary/30'),
    # hover:bg-accent/N → hover:bg-primary/N
    (r'\bhover:bg-accent/(\d+)\b',             lambda m: f'hover:bg-primary/{m.group(1)}'),

    # ── opacity/alpha variants (never standalone CTA) ──────────────────────
    # bg-accent/N → bg-primary/N
    (r'\bbg-accent/(\d+)\b',                   lambda m: f'bg-primary/{m.group(1)}'),
    (r'\bdark:bg-accent/(\d+)\b',              lambda m: f'dark:bg-primary/{m.group(1)}'),

    # ── text-accent → text-primary ─────────────────────────────────────────
    # (CTA buttons always use text-white, so text-accent is never a CTA)
    (r'\bdark:text-accent\b',                  'dark:text-secondary'),
    (r'\btext-accent\b',                       'text-primary'),

    # ── border-accent variants ─────────────────────────────────────────────
    (r'\bborder-accent/(\d+)\b',               'border-primary/20'),
    (r'\bdark:border-accent(?:/\d+)?\b',       'dark:border-secondary/30'),
    (r'\bborder-accent\b',                     'border-primary/20'),

    # ── shadow-accent ──────────────────────────────────────────────────────
    (r'\bshadow-accent/(\d+)\b',               lambda m: f'shadow-primary/{m.group(1)}'),
    (r'\bshadow-accent\b',                     'shadow-primary'),

    # ── ring-accent ────────────────────────────────────────────────────────
    (r'\bfocus-visible:ring-accent\b',         'focus-visible:ring-primary'),
    (r'\bfocus:ring-accent\b',                 'focus:ring-primary'),

    # ── via-accent (gradient midpoints, always decorative) ─────────────────
    (r'\bvia-accent(?:/\d+)?\b',               'via-primary'),

    # ── from/to-accent in alpha variants (always decorative) ──────────────
    (r'\bfrom-accent/(\d+)\b',                 lambda m: f'from-primary/{m.group(1)}'),
    (r'\bto-accent/(\d+)\b',                   lambda m: f'to-primary/{m.group(1)}'),
    (r'\bdark:from-accent(?:/\d+)?\b',         lambda m: f'dark:from-primary/{m.group(1)}' if '/' in m.group(0) else 'dark:from-primary'),
    (r'\bdark:to-accent(?:/\d+)?\b',           lambda m: f'dark:to-primary/{m.group(1)}' if '/' in m.group(0) else 'dark:to-primary'),
]


def apply_safe_replacements(content: str) -> str:
    """Apply all safe (non-context-dependent) replacements."""
    for pattern, replacement in SAFE_REPLACEMENTS:
        if callable(replacement):
            content = re.sub(pattern, replacement, content)
        else:
            content = re.sub(pattern, replacement, content)
    return content


def process_bg_accent_lines(content: str) -> str:
    """
    Process solid bg-accent on a line-by-line basis.
    CTA buttons (text-white + padding) are kept; everything else is replaced.
    """
    lines = content.split('\n')
    new_lines = []

    for line in lines:
        if 'bg-accent' not in line:
            new_lines.append(line)
            continue

        if is_cta_line(line):
            # This is a CTA button line → keep all accent
            new_lines.append(line)
            continue

        new_line = line

        # Animate-pulse/ping dots (live indicators) → bg-secondary
        if re.search(r'animate-(?:pulse|ping)', new_line):
            new_line = re.sub(r'\bbg-accent\b', 'bg-secondary', new_line)
        # Loading bar with animation
        elif 'animate-' in new_line:
            new_line = re.sub(r'\bbg-accent\b', 'bg-secondary', new_line)
        # Everything else → bg-primary
        else:
            new_line = re.sub(r'\bbg-accent\b', 'bg-primary', new_line)

        new_lines.append(new_line)

    return '\n'.join(new_lines)


def process_from_accent_lines(content: str) -> str:
    """
    Process from-accent gradient usage line by line.
    CTA gradient buttons (text-white + padding) are kept; everything else is replaced.
    """
    lines = content.split('\n')
    new_lines = []

    for line in lines:
        if 'from-accent' not in line:
            new_lines.append(line)
            continue

        if is_cta_line(line):
            # Gradient CTA button → keep
            new_lines.append(line)
            continue

        # Non-CTA gradient → replace
        new_line = re.sub(r'\bfrom-accent\b', 'from-primary', line)
        new_lines.append(new_line)

    return '\n'.join(new_lines)


def process_to_accent_lines(content: str) -> str:
    """Process to-accent (destination of gradient) — always decorative if not on CTA."""
    lines = content.split('\n')
    new_lines = []

    for line in lines:
        if 'to-accent' not in line:
            new_lines.append(line)
            continue

        if is_cta_line(line):
            new_lines.append(line)
            continue

        new_line = re.sub(r'\bto-accent\b', 'to-primary', line)
        new_lines.append(new_line)

    return '\n'.join(new_lines)


def process_file(filepath: str) -> tuple[bool, str]:
    """Process a file and return (changed, new_content)."""
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original

    # 1. Safe replacements first (alpha variants, hover, text, border, shadow, ring)
    content = apply_safe_replacements(content)

    # 2. Solid bg-accent (context-dependent)
    content = process_bg_accent_lines(content)

    # 3. from-accent gradient (context-dependent)
    content = process_from_accent_lines(content)

    # 4. to-accent (usually destination of decorative gradients)
    content = process_to_accent_lines(content)

    # 5. Any remaining dark:bg-accent (solid, no alpha)
    content = re.sub(r'\bdark:bg-accent\b', 'dark:bg-primary', content)

    changed = content != original
    return changed, content


def count_remaining(filepath: str) -> list[str]:
    """Count remaining accent occurrences in a file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    matches = []
    for i, line in enumerate(lines, 1):
        if re.search(r'\b(?:text-accent|bg-accent|border-accent)\b', line):
            matches.append(f"  L{i}: {line.rstrip()}")
    return matches


def main():
    files = get_files()
    changed_files = []

    print("🎨 Cleaning up accent color usage...\n")

    for filepath in files:
        changed, new_content = process_file(filepath)

        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            rel = os.path.relpath(filepath, PROJECT_DIR)
            changed_files.append(rel)
            print(f"  ✓ {rel}")

    print(f"\n✅ Done: {len(changed_files)} files modified")

    # ── Verify: show remaining accent occurrences ─────────────────────────────
    print("\n🔍 Verifying remaining accent occurrences (should be CTA only):\n")
    total_remaining = 0
    files_with_remaining = 0

    for filepath in files:
        remaining = count_remaining(filepath)
        if remaining:
            files_with_remaining += 1
            total_remaining += len(remaining)
            rel = os.path.relpath(filepath, PROJECT_DIR)
            print(f"  📄 {rel} ({len(remaining)} occurrence(s)):")
            for line in remaining[:8]:
                print(f"   {line}")
            if len(remaining) > 8:
                print(f"    ... +{len(remaining) - 8} more")
            print()

    # Also check header (should be untouched)
    header_path = os.path.join(PROJECT_DIR, HEADER_RELPATH)
    if os.path.exists(header_path):
        header_remaining = count_remaining(header_path)
        if header_remaining:
            print(f"  📄 {HEADER_RELPATH} (untouched, {len(header_remaining)} occurrences as expected)")

    print(f"\n  Files with remaining accent: {files_with_remaining}")
    print(f"  Total remaining occurrences: {total_remaining}")
    print("\n  ⚠️  Review the remaining occurrences above to confirm they are all CTA buttons.")


if __name__ == '__main__':
    main()
