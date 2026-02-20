# Color Mapping - Purge Hex Hardcodés

## Palette Continental (définies dans globals.css)

### Couleurs primaires
- `#0D3B66` → `primary` (Bleu Marine)
- `#FF6B35` → `accent` (Orange Kick-off)
- `#f5a623` → `gold` (Or Champion)
- `#2d6a4f` → `green` ou `field` (Vert Terrain)

### Couleurs secondaires
- `#2EC4B6` → `secondary` ou `turquoise` (Turquoise Azteca)
- `#40916c` → `field-light`

### Couleurs sémantiques
- `#06D6A0` → `success` (But !)
- `#EF476F` → `error` (Carton Rouge)
- `#f39c12` → `warning`
- `#3498db` → `info`

### Neutres
- `#F7F7F8` → `gray-light` (Blanc Pelouse)
- `#636370` → `gray-mid` (Gris Moyen)
- `#1e2d3d` → `gray-dark` (Gris Foncé dark)
- `#080E1A` → `deep` (Nuit de Match)
- `#060D18` → utiliser `bg-bg-elevated` en dark mode

### Pays hôtes
- `#3c3b6e` → `usa`
- `#006847` → `mexico`
- `#ff0000` → `canada`

## Remplacements dans classes Tailwind

### Backgrounds
- `bg-[#060D18]` → `bg-bg-elevated` ou custom class
- `bg-[#0D3B66]` → `bg-primary`
- `bg-[#FF6B35]` → `bg-accent`
- `bg-[#F7F7F8]` → `bg-gray-light`
- `bg-[#080E1A]` → `bg-deep`

### Text colors
- `text-[#0D3B66]` → `text-primary`
- `text-[#FF6B35]` → `text-accent`
- `text-[#2EC4B6]` → `text-secondary`

### Border colors
- `border-[#...]` → `border-{color}`

### Autres (fill, stroke, etc.)
- À traiter au cas par cas
