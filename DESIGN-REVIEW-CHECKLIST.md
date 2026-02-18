# 🎨 Design Review Checklist — mondial2026.fr

## Boucle d'amélioration
Pour chaque page :
1. Screenshot desktop (1280x900) + mobile (390x844) + dark mode
2. Analyser visuellement contre cette checklist
3. Implémenter les fixes
4. Re-screenshot et vérifier

## Checklist par page

### Layout & Spacing
- [ ] Marges consistantes (px-4 mobile, max-w-7xl desktop)
- [ ] Pas de texte collé aux bords
- [ ] Espacement vertical cohérent entre sections (space-y-8 ou space-y-12)
- [ ] Pas de sections visuellement "vides" ou trop espacées

### Typographie
- [ ] Hiérarchie claire H1 > H2 > H3 (taille + poids)
- [ ] H1 unique par page
- [ ] Texte de lecture en 16px minimum (text-base)
- [ ] Line-height confortable (leading-relaxed sur les paragraphes)
- [ ] Pas de lignes trop longues (max-w-prose ou ~65-75 caractères)

### Couleurs & Contraste
- [ ] Texte principal ≥ 4.5:1 contraste (WCAG AA)
- [ ] Texte secondaire ≥ 3:1 contraste
- [ ] CTA visibles et contrastés
- [ ] Dark mode : pas de texte illisible
- [ ] Dark mode : pas de fond blanc résiduel

### Navigation
- [ ] Breadcrumb présent et fonctionnel
- [ ] Lien "retour" ou navigation évidente
- [ ] Active state dans la nav/sidebar
- [ ] Footer avec liens complets

### CTA & Conversion
- [ ] Au moins 1 CTA bookmaker visible sans scroll
- [ ] CTA cohérent (même style, même couleur accent)
- [ ] Disclaimer jeu responsable visible
- [ ] Liens affiliés avec rel="sponsored nofollow"

### Mobile
- [ ] Pas de scroll horizontal
- [ ] Touch targets ≥ 44px
- [ ] Tableaux scrollables ou convertis en cards
- [ ] Images pas plus larges que l'écran
- [ ] Texte lisible sans zoom

### Images & Médias
- [ ] Alt text sur toutes les images
- [ ] Drapeaux avec aria-label
- [ ] Pas de broken images
- [ ] Emojis utilisés comme fallback (pas comme contenu principal à long terme)

### Performance
- [ ] Pas de layout shift visible
- [ ] Chargement rapide (pas de spinner interminable)
- [ ] Lazy loading sur images below fold

### Cohérence
- [ ] Style de cards identique partout
- [ ] Couleurs d'accent cohérentes (emerald/accent)
- [ ] Boutons même style (rounded-lg, padding, couleur)
- [ ] Tables même style (headers, borders, zebra stripes)

## Pages à vérifier
1. Homepage `/`
2. Équipe `/equipe/france`
3. Match `/pronostic-match/[slug]`
4. Calendrier `/match/calendrier`
5. Stade `/stade/metlife-stadium`
6. Ville `/ville/miami`
7. Guide `/guide/[slug]`
8. Simulateur `/simulateur`
9. Quiz `/quiz`
10. Comparateur `/comparateur-cotes`
11. Glossaire `/guide/glossaire`
12. Où regarder `/ou-regarder`
13. Méthodologie `/methodologie`
14. Live `/live`
15. FAQ `/faq`
16. Actualités `/actualites`
17. H2H `/h2h/[slug]`
18. Pronostic équipe `/pronostic/[slug]`
