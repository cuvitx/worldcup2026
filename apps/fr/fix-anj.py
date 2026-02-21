#!/usr/bin/env python3
"""Replace hardcoded ANJ disclaimers with <ANJBanner /> component."""
import re, subprocess, sys

# Get files with hardcoded disclaimers
result = subprocess.run(
    ['grep', '-rln', 'Jouer comporte des risques\\|09 74 75 13 13', 'app/',
     '--include=*.tsx'],
    capture_output=True, text=True, cwd='/data/.openclaw/workspace/worldcup2026/apps/fr'
)
files = [f for f in result.stdout.strip().split('\n') if f and 'anj-banner' not in f and '_components' not in f]

IMPORT_LINE = 'import { ANJBanner } from "@repo/ui/anj-banner";'

for filepath in sorted(files):
    full = f'/data/.openclaw/workspace/worldcup2026/apps/fr/{filepath}'
    with open(full, 'r') as f:
        content = f.read()
    
    original = content
    
    # Pattern 1: <p ...> ... Jouer comporte des risques ... </p> (single or multi-line)
    # Match <p> tags containing the disclaimer text
    patterns = [
        # <section> wrapping a <p> with disclaimer
        r'<section[^>]*>\s*<p[^>]*>[\s\S]*?(?:Jouer comporte des risques|09 74 75 13 13)[\s\S]*?</p>\s*</section>',
        # <div> wrapping a <p> with disclaimer  
        r'<div[^>]*>\s*<p[^>]*>[\s\S]*?(?:Jouer comporte des risques|09 74 75 13 13)[\s\S]*?</p>\s*</div>',
        # Standalone <p> with disclaimer
        r'<p[^>]*>[\s\S]*?(?:Jouer comporte des risques|09 74 75 13 13)[\s\S]*?</p>',
    ]
    
    replaced = False
    for pattern in patterns:
        matches = list(re.finditer(pattern, content))
        for match in matches:
            matched_text = match.group(0)
            # Verify it's actually a disclaimer (not just a reference)
            if 'Jouer comporte des risques' in matched_text or ('09 74 75 13 13' in matched_text and len(matched_text) < 800):
                # Check if it also contains non-disclaimer content (like cotes info)
                if 'Cotes indicatives' in matched_text or 'susceptibles de varier' in matched_text:
                    # This has mixed content - only replace the disclaimer part within
                    # Replace just the sentence about gambling
                    disclaimer_sentence = re.search(
                        r'(?:\s*Les paris sportifs sont réservés aux personnes majeures \(18\+\)\.\s*)?'
                        r'(?:18\+ \| )?'
                        r'Jouer comporte des risques\s*:\s*endettement,?\s*(?:isolement,?\s*dépendance|dépendance,?\s*isolement)\.?\s*'
                        r'Appelez le 09 74 75 13 13 \(appel non surtaxé\)\.?'
                        r'(?:\s*<a[^>]*>anj\.fr</a>)?',
                        matched_text
                    )
                    if disclaimer_sentence:
                        # Remove the sentence, put ANJBanner after the container
                        clean = content[match.start():match.end()].replace(disclaimer_sentence.group(0), '')
                        content = content[:match.start()] + clean + '\n        <ANJBanner />' + content[match.end():]
                        replaced = True
                        break
                else:
                    content = content[:match.start()] + '<ANJBanner />' + content[match.end():]
                    replaced = True
                    break
        if replaced:
            break
    
    if not replaced:
        # Try a more aggressive approach for remaining patterns
        # Look for lines containing the disclaimer
        lines = content.split('\n')
        new_lines = []
        skip_until_close = False
        found_disclaimer = False
        i = 0
        while i < len(lines):
            line = lines[i]
            if not found_disclaimer and ('Jouer comporte des risques' in line or '09 74 75 13 13' in line):
                # Find the containing element
                # Look backwards for opening tag
                found_disclaimer = True
                # Just replace this approach won't work well, skip
            new_lines.append(line)
            i += 1
        
        if not found_disclaimer:
            print(f"SKIP (no match): {filepath}")
            continue
        else:
            print(f"WARN (complex pattern): {filepath}")
            # Don't write, handle manually
            continue
    
    # Add import if needed
    if IMPORT_LINE not in content and '<ANJBanner' in content:
        # Add after last import
        import_pos = 0
        for m in re.finditer(r'^import\s.*?;?\s*$', content, re.MULTILINE):
            import_pos = m.end()
        if import_pos > 0:
            content = content[:import_pos] + '\n' + IMPORT_LINE + content[import_pos:]
        else:
            content = IMPORT_LINE + '\n' + content
    
    if content != original:
        with open(full, 'w') as f:
            f.write(content)
        print(f"OK: {filepath}")
    else:
        print(f"NOCHANGE: {filepath}")

print("\nDone!")
