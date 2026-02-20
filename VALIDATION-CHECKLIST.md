# ✅ Checklist Validation Migration Palette

## Étapes de validation (À FAIRE AVANT PUSH)

### 1. Build Check
```bash
cd apps/fr
npx turbo build --filter=fr
```
- [ ] Build réussi sans erreurs
- [ ] Pas de warnings CSS
- [ ] Taille bundle acceptable

### 2. Serveur de développement
```bash
cd apps/fr
npx next dev -p 3099
```
Tester visuellement dans le navigateur (localhost:3099) :

#### Pages à vérifier visuellement
- [ ] **Homepage (/)** → Hero or+vert, sections alternées, stats or
- [ ] **Équipes (/equipes)** → Breadcrumb or, probabilités or
- [ ] **Stades (/stades)** → Capacités en or
- [ ] **Groupes (/groupes)** → Titres or, badges hôte or
- [ ] **Pronostic Match (/pronostic-match/...)** → Probabilités or, stats duels or
- [ ] **Buteur (/buteur/...)** → Stats or, CTA vert, badges or
- [ ] **Pronostic Vainqueur (/pronostic-vainqueur)** → Cotes or

#### Éléments à checker
- [ ] **CTAs primaires** → Tous en vert émeraude (#00B865)
- [ ] **CTAs secondaires** → Bordure blanche sur fond sombre
- [ ] **Stats & highlights** → Tous en or (#FFB800)
- [ ] **Badges "Hôte"** → Fond or + texte noir
- [ ] **Live badges** → Vert émeraude
- [ ] **Countdown hero** → Chiffres en or

#### Dark Mode
- [ ] Toutes les pages testées en dark mode
- [ ] Contraste suffisant pour l'or (amber-400 en dark)
- [ ] Vert émeraude lisible en dark

### 3. QA Automatisée (Screenshots)
```bash
cd apps/fr && npx next start -p 3099 &
bash scripts/visual-qa.sh
```
- [ ] 40 screenshots générés (4 viewports × 10 pages)
- [ ] Pas d'overflow horizontal
- [ ] Textes non tronqués
- [ ] Couleurs cohérentes

### 4. Responsive Check
Viewports à tester :
- [ ] **Mobile (375px)** → Pas d'overflow, CTA accessibles
- [ ] **Tablet (768px)** → Layout correct
- [ ] **Laptop (1280px)** → Espacement harmonieux
- [ ] **Desktop (1920px)** → Contenu centré

### 5. Validation finale
- [ ] TypeScript check : `cd apps/fr && npx tsc --noEmit` → ✅ PASSED
- [ ] Aucune couleur orange (#FF6B35) restante
- [ ] Aucune couleur turquoise (#2EC4B6) restante
- [ ] Palette cohérente sur toutes les pages

### 6. Deployment (APRÈS validation Xavier)
```bash
git add .
git commit -m "feat(design): migration palette complète - vert émeraude + or"
git push origin main
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_WD6DntyHssipXDI4pD8ibdvuKm4f/J27MMsR3hg
```

---

## ⚠️ RÈGLES AVANT PUSH

❌ **NE PAS PUSH sans :**
1. Screenshots QA validés
2. Approbation visuelle de Xavier
3. Test en production locale (next start)

✅ **PUSH quand :**
1. Tous les checks sont verts
2. Xavier a validé les screenshots
3. Pas de problème visuel détecté

---

**Dernière mise à jour:** 20/02/2026 11:20 CET
