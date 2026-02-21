#!/usr/bin/env python3
"""Replace decorative emojis with Lucide React icons in TSX files."""

import re
import os
import glob

# Emoji → Lucide component mapping
EMOJI_MAP = {
    '⚽': ('CircleDot', True),
    '🏆': ('Trophy', True),
    '🎯': ('Target', True),
    '📊': ('BarChart3', True),
    '🔥': ('Flame', True),
    '💡': ('Lightbulb', True),
    '⭐': ('Star', True),
    '💰': ('DollarSign', True),
    '📱': ('Smartphone', True),
    '📺': ('Tv', True),
    '🗓️': ('Calendar', True),
    '🗓': ('Calendar', True),
    '🌍': ('Globe', True),
    '🎬': ('Clapperboard', True),
    '🥇': ('Medal', True),
    '🥈': ('Medal', True),
    '🥉': ('Medal', True),
    '📈': ('TrendingUp', True),
    '📉': ('TrendingDown', True),
    '🔒': ('Lock', True),
    '🎉': ('PartyPopper', True),
    '⚡': ('Zap', True),
    '💪': ('Dumbbell', True),
    '🧠': ('Brain', True),
    '👑': ('Crown', True),
    '📋': ('ClipboardList', True),
    '🔮': ('Sparkles', True),
    '💎': ('Gem', True),
    '🚀': ('Rocket', True),
    '📌': ('Pin', True),
    '🔍': ('Search', True),
    '🎲': ('Dice5', True),
    '🎰': ('Dice5', True),
    '📅': ('Calendar', True),
    '🌤️': ('Sun', True),
    '🌤': ('Sun', True),
    '☀️': ('Sun', True),
    '☀': ('Sun', True),
    '🎟️': ('Ticket', True),
    '🎟': ('Ticket', True),
    '📜': ('ScrollText', True),
    '📖': ('BookOpen', True),
    '🛂': ('ShieldCheck', True),
    '🔗': ('Link', True),
    '🌎': ('Globe', True),
    '🏨': ('Hotel', True),
    '🏙️': ('Building2', True),
    '🏙': ('Building2', True),
    '🛡️': ('Shield', True),
    '🛡': ('Shield', True),
    '📐': ('Ruler', True),
    '🥅': ('Goal', False),  # no direct lucide, remove
    '🟨': (None, False),
    '🟥': (None, False),
    '🛒': ('ShoppingCart', True),
    '🚗': ('Car', True),
    '🚌': ('Bus', True),
    '🗺️': ('Map', True),
    '🕐': ('Clock', True),
    '📍': ('MapPin', True),
    '📄': ('FileText', True),
    '💳': ('CreditCard', True),
    '👤': ('User', True),
    '🐎': (None, False),
    '🎫': ('Ticket', True),
    '🌐': ('Globe', True),
    '✈️': ('Plane', True),
    '⏱': ('Timer', True),
    '👥': ('Users', True),
    '📝': ('PenLine', True),
    '📑': ('FileText', True),
    '💾': ('Save', True),
    '🖨': ('Printer', True),
    '🔭': ('Telescope', True),
    '🔄': ('RefreshCw', True),
    '📧': ('Mail', True),
    '🎽': ('Shirt', True),
    '🎒': ('Backpack', False),
    '🍽': ('UtensilsCrossed', True),
    '🍔': ('UtensilsCrossed', True),
    '🌦': ('CloudRain', True),
    '🌡️': ('Thermometer', True),
    '🌙': ('Moon', True),
    '🌆': ('Building2', True),
    '🏠': ('Home', True),
    '🏔': ('Mountain', True),
    '🏈': ('CircleDot', True),
    '⚔️': ('Swords', True),
    '⚔': ('Swords', True),
    '⚠️': ('AlertTriangle', True),
    '⚠': ('AlertTriangle', True),
    '❓': ('HelpCircle', True),
    '❌': ('X', True),
    '✅': ('Check', True),
    '🤖': ('Bot', True),
    '🚫': ('Ban', True),
    '🚇': ('TrainFront', True),
    '🚆': ('TrainFront', True),
    '🗂': ('FolderOpen', True),
    '👶': ('Baby', True),
    '👩': ('User', True),
    '👨': ('User', True),
    '🐾': (None, False),
    '🎪': ('Tent', True),
    '🎭': ('Drama', True),
    '💥': ('Zap', True),
    '🎊': ('PartyPopper', True),
    '🏅': ('Medal', True),
    '🤝': ('Handshake', True),
    '💬': ('MessageCircle', True),
    '🧩': ('Puzzle', True),
    '🃏': ('Joystick', False),
    '⏰': ('AlarmClock', True),
    '⏪': ('Rewind', True),
    '❤': ('Heart', True),
    '✨': (None, False),  # decorative, remove
    '🏟️': ('Landmark', True),
    '🏟': ('Landmark', True),
    '🎮': ('Gamepad2', True),
    '🔞': None,  # KEEP - don't touch
    '🟡': (None, False),
    '😕': (None, False),
}

# Flag emojis pattern - don't touch these
FLAG_PATTERN = re.compile(r'[\U0001F1E0-\U0001F1FF]{2}|🏴[\u200D\uE0061-\uE007F]+|🏴')
# Also keep 🏳️‍🌈 etc
KEEP_PATTERN = re.compile(r'🏳️[\u200D\uFE0F]*[^\s]*')

def is_flag(text, pos):
    """Check if emoji at position is a flag."""
    for m in FLAG_PATTERN.finditer(text):
        if m.start() <= pos < m.end():
            return True
    for m in KEEP_PATTERN.finditer(text):
        if m.start() <= pos < m.end():
            return True
    return False

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    needed_icons = set()
    
    # Build pattern from all emojis we want to replace
    emojis_to_replace = [e for e in EMOJI_MAP.keys() if EMOJI_MAP[e] is not None]
    
    for emoji in emojis_to_replace:
        if emoji not in content:
            continue
        
        mapping = EMOJI_MAP[emoji]
        if mapping is None:
            continue
        
        icon_name, use_icon = mapping
        
        # Find all occurrences
        idx = 0
        while True:
            idx = content.find(emoji, idx)
            if idx == -1:
                break
            
            # Skip flags
            if is_flag(content, idx):
                idx += len(emoji)
                continue
            
            # Skip 🔞
            if emoji == '🔞':
                idx += len(emoji)
                continue
            
            # Determine context: is it inside JSX text or inside a string?
            # Look for surrounding context
            line_start = content.rfind('\n', 0, idx) + 1
            line = content[line_start:content.find('\n', idx)]
            
            if use_icon and icon_name:
                # Check if emoji is inside a string (quotes)
                before = content[line_start:idx]
                # Count unescaped quotes
                in_string = False
                quote_char = None
                for i, c in enumerate(before):
                    if c in ('"', "'", '`') and (i == 0 or before[i-1] != '\\'):
                        if not in_string:
                            in_string = True
                            quote_char = c
                        elif c == quote_char:
                            in_string = False
                
                if in_string:
                    # Inside a string - just remove the emoji (can't put JSX there)
                    content = content[:idx] + content[idx+len(emoji):]
                else:
                    # In JSX - replace with icon component
                    replacement = f'<{icon_name} className="h-5 w-5 inline-block" />'
                    # Check if there's a space after emoji
                    after_idx = idx + len(emoji)
                    if after_idx < len(content) and content[after_idx] == ' ':
                        replacement = f'<{icon_name} className="h-5 w-5 inline-block" /> '
                        content = content[:idx] + replacement + content[after_idx+1:]
                    else:
                        content = content[:idx] + replacement + content[after_idx:]
                    needed_icons.add(icon_name)
            else:
                # Remove emoji
                content = content[:idx] + content[idx+len(emoji):]
            
            idx += 1  # Move past replacement
    
    if content == original:
        return False, set()
    
    # Add lucide imports if needed
    if needed_icons:
        # Check existing lucide import
        lucide_import_pattern = re.compile(r'import\s*\{([^}]+)\}\s*from\s*["\']lucide-react["\']')
        m = lucide_import_pattern.search(content)
        
        if m:
            # Parse existing imports
            existing = set(x.strip() for x in m.group(1).split(',') if x.strip())
            all_icons = sorted(existing | needed_icons)
            new_import = f'import {{ {", ".join(all_icons)} }} from "lucide-react"'
            content = content[:m.start()] + new_import + content[m.end():]
        else:
            # Add new import after last import
            last_import = 0
            for im in re.finditer(r'^import\s.+$', content, re.MULTILINE):
                last_import = im.end()
            
            if last_import > 0:
                import_line = f'\nimport {{ {", ".join(sorted(needed_icons))} }} from "lucide-react"'
                content = content[:last_import] + import_line + content[last_import:]
            else:
                # No imports found, add at top
                import_line = f'import {{ {", ".join(sorted(needed_icons))} }} from "lucide-react"\n'
                content = import_line + content
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True, needed_icons

# Process all TSX files
base = '/data/.openclaw/workspace/worldcup2026/apps/fr/app'
files = glob.glob(os.path.join(base, '**/*.tsx'), recursive=True)

total_modified = 0
all_icons_used = set()

for f in sorted(files):
    modified, icons = process_file(f)
    if modified:
        rel = os.path.relpath(f, base)
        print(f"  ✓ {rel} (icons: {', '.join(sorted(icons)) if icons else 'removed only'})")
        total_modified += 1
        all_icons_used |= icons

print(f"\n{total_modified} files modified")
print(f"Icons used: {', '.join(sorted(all_icons_used))}")
