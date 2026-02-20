#!/usr/bin/env python3
"""
Purge des couleurs hex hardcodées - Remplacement par variables Tailwind
"""

import re
import os
from pathlib import Path

# Mapping des couleurs hex vers les classes Tailwind (case-insensitive)
COLOR_MAPPINGS = {
    # Primary palette - from @theme in globals.css
    '0d3b66': 'primary',
    'ff6b35': 'accent',
    'f5a623': 'gold',
    '2d6a4f': 'field',
    '2ec4b6': 'secondary',
    '40916c': 'field-light',
    
    # Semantic
    '06d6a0': 'success',
    'ef476f': 'error',
    'f39c12': 'warning',
    '3498db': 'info',
    
    # Neutrals - from @theme
    'f7f7f8': 'gray-light',
    '636370': 'gray-mid',
    '1e2d3d': 'gray-dark',
    '080e1a': 'deep',
    '060d18': 'deep',  # Map to deep (closest match)
    
    # Country colors
    '3c3b6e': 'usa',
    '006847': 'mexico',
    'ff0000': 'canada',  # Warning: might conflict with red-500
    '002395': '[#002395]',  # France blue - keep hex (not in design system)
}

# Normalize variations (uppercase, lowercase, remove #)
def normalize_hex(hex_str):
    """Normalize hex to lowercase without #"""
    return hex_str.lower().lstrip('#')

def get_tailwind_class(hex_color, prefix='bg'):
    """Get Tailwind class for a hex color"""
    normalized = normalize_hex(hex_color)
    for hex_key, tw_name in COLOR_MAPPINGS.items():
        if normalize_hex(hex_key) == normalized:
            return f"{prefix}-{tw_name}"
    return None

def replace_bg_colors(content):
    """Replace bg-[#...] with proper Tailwind classes"""
    replacements = 0
    
    def replacer(match):
        nonlocal replacements
        full_match = match.group(0)
        hex_color = match.group(1)
        opacity = match.group(2) if match.group(2) else ""
        
        tw_class = get_tailwind_class(hex_color, 'bg')
        if tw_class:
            replacements += 1
            return f"{tw_class}{opacity}"
        return full_match
    
    # Match bg-[#XXXXXX] or bg-[#XXXXXX]/opacity
    pattern = r'bg-\[#([0-9A-Fa-f]{6})\](\/\d+)?'
    result = re.sub(pattern, replacer, content)
    if replacements > 0:
        print(f"    bg: {replacements} replacements")
    return result

def replace_text_colors(content):
    """Replace text-[#...] with proper Tailwind classes"""
    def replacer(match):
        full_match = match.group(0)
        hex_color = match.group(1)
        opacity = match.group(2) if match.group(2) else ""
        
        tw_class = get_tailwind_class(hex_color, 'text')
        if tw_class:
            return f"{tw_class}{opacity}"
        return full_match
    
    pattern = r'text-\[#([0-9A-Fa-f]{6})\](\/\d+)?'
    return re.sub(pattern, replacer, content)

def replace_border_colors(content):
    """Replace border-[#...] with proper Tailwind classes"""
    def replacer(match):
        full_match = match.group(0)
        hex_color = match.group(1)
        opacity = match.group(2) if match.group(2) else ""
        
        tw_class = get_tailwind_class(hex_color, 'border')
        if tw_class:
            return f"{tw_class}{opacity}"
        return full_match
    
    pattern = r'border-\[#([0-9A-Fa-f]{6})\](\/\d+)?'
    return re.sub(pattern, replacer, content)

def replace_rgba_borders(content):
    """Replace border-[rgba(255,255,255,0.1)] with Tailwind utilities"""
    replacements = {
        r'border-\[rgba\(255,\s*255,\s*255,\s*0\.1\)\]': 'border-white/10',
        r'border-\[rgba\(255,\s*255,\s*255,\s*0\.05\)\]': 'border-white/5',
        r'border-\[rgba\(0,\s*0,\s*0,\s*0\.06\)\]': 'border-black/6',
        r'border-\[rgba\(0,\s*0,\s*0,\s*0\.08\)\]': 'border-black/8',
    }
    for pattern, replacement in replacements.items():
        content = re.sub(pattern, replacement, content)
    return content

def process_file(filepath):
    """Process a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            original = f.read()
        
        # Skip files that are data/constants (legitimate hex colors)
        if '/data/' in str(filepath) or 'constants' in str(filepath).lower():
            return False, 0
        
        # Skip admin page (test colors) - keep original colors for reference
        if 'admin/page.tsx' in str(filepath):
            return False, 0
        
        # Debug: check if file has hex colors
        has_hex = bool(re.search(r'#[0-9A-Fa-f]{6}', original))
        if has_hex and 'MobileMenu.tsx' in str(filepath):
            print(f"DEBUG: {filepath} has hex colors")
            
        modified = original
        modified = replace_bg_colors(modified)
        modified = replace_text_colors(modified)
        modified = replace_border_colors(modified)
        modified = replace_rgba_borders(modified)
        
        if modified != original:
            # Count lines changed
            orig_lines = original.split('\n')
            mod_lines = modified.split('\n')
            lines_changed = sum(1 for a, b in zip(orig_lines, mod_lines) if a != b)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(modified)
            
            return True, lines_changed
        
        return False, 0
        
    except Exception as e:
        import traceback
        print(f"❌ Error processing {filepath}: {e}")
        traceback.print_exc()
        return False, 0

def main():
    base_path = Path('/data/.openclaw/workspace/worldcup2026/apps/fr/app')
    
    files_modified = 0
    total_changes = 0
    files_checked = 0
    
    for ext in ['*.tsx', '*.ts']:
        for filepath in base_path.rglob(ext):
            files_checked += 1
            modified, changes = process_file(filepath)
            if modified:
                files_modified += 1
                total_changes += changes
                rel_path = str(filepath.relative_to(base_path))
                print(f"✅ {rel_path}")
    
    print(f"\n🎯 Summary: {files_checked} files checked, {files_modified} files modified, {total_changes} lines changed")

if __name__ == "__main__":
    main()
