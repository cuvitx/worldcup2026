#!/bin/bash

# Script pour ajouter BreadcrumbSchema aux pages qui ont déjà Breadcrumb

add_schema() {
  local file="$1"
  local items="$2"
  
  # Vérifier si le fichier existe
  if [ ! -f "$file" ]; then
    echo "❌ $file - fichier introuvable"
    return 1
  fi
  
  # Vérifier si BreadcrumbSchema est déjà importé
  if grep -q "BreadcrumbSchema" "$file"; then
    echo "⏭️  $file - déjà OK"
    return 0
  fi
  
  # 1. Ajouter les imports après l'import de Breadcrumb
  sed -i '/import { Breadcrumb } from "@repo\/ui\/breadcrumb";/a\
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";\
import { domains } from "@repo/data/route-mapping";' "$file"
  
  # 2. Ajouter <BreadcrumbSchema /> avant <Breadcrumb
  # Trouver la ligne avec <Breadcrumb et ajouter le schema avant
  sed -i "/<Breadcrumb/i\\      <BreadcrumbSchema items={$items} baseUrl={domains.fr} />" "$file"
  
  echo "✅ $file"
}

echo "🔧 Ajout des BreadcrumbSchema..."
echo ""

# Pages avec breadcrumb existant
add_schema "apps/fr/app/buteurs/page.tsx" '[{name:"Accueil",url:"/"},{name:"Buteurs",url:"/buteurs"}]'
add_schema "apps/fr/app/calendrier/imprimer/page.tsx" '[{name:"Accueil",url:"/"},{name:"Calendrier",url:"/match/calendrier"},{name:"Imprimer",url:"/calendrier/imprimer"}]'
add_schema "apps/fr/app/contact/page.tsx" '[{name:"Accueil",url:"/"},{name:"Contact",url:"/contact"}]'
add_schema "apps/fr/app/equipes/page.tsx" '[{name:"Accueil",url:"/"},{name:"Équipes",url:"/equipes"}]'
add_schema "apps/fr/app/faq/page.tsx" '[{name:"Accueil",url:"/"},{name:"FAQ",url:"/faq"}]'
add_schema "apps/fr/app/groupes/page.tsx" '[{name:"Accueil",url:"/"},{name:"Groupes",url:"/groupes"}]'
add_schema "apps/fr/app/guide/guide-visa-esta/page.tsx" '[{name:"Accueil",url:"/"},{name:"Guide",url:"/guides"},{name:"Guide Visa ESTA",url:"/guide/guide-visa-esta"}]'
add_schema "apps/fr/app/guides/page.tsx" '[{name:"Accueil",url:"/"},{name:"Guides",url:"/guides"}]'
add_schema "apps/fr/app/joueurs/page.tsx" '[{name:"Accueil",url:"/"},{name:"Joueurs",url:"/joueurs"}]'
add_schema "apps/fr/app/match/aujourdhui/page.tsx" '[{name:"Accueil",url:"/"},{name:"Matchs",url:"/match/calendrier"},{name:"Aujourd'\''hui",url:"/match/aujourdhui"}]'
add_schema "apps/fr/app/match/calendrier/page.tsx" '[{name:"Accueil",url:"/"},{name:"Calendrier",url:"/match/calendrier"}]'
add_schema "apps/fr/app/mentions-legales/page.tsx" '[{name:"Accueil",url:"/"},{name:"Mentions légales",url:"/mentions-legales"}]'
add_schema "apps/fr/app/methodologie/page.tsx" '[{name:"Accueil",url:"/"},{name:"Méthodologie",url:"/methodologie"}]'
add_schema "apps/fr/app/newsletter/page.tsx" '[{name:"Accueil",url:"/"},{name:"Newsletter",url:"/newsletter"}]'
add_schema "apps/fr/app/ou-regarder/page.tsx" '[{name:"Accueil",url:"/"},{name:"Où regarder",url:"/ou-regarder"}]'
add_schema "apps/fr/app/palmares/page.tsx" '[{name:"Accueil",url:"/"},{name:"Palmarès",url:"/palmares"}]'
add_schema "apps/fr/app/paris-sportifs/page.tsx" '[{name:"Accueil",url:"/"},{name:"Paris sportifs",url:"/paris-sportifs"}]'
add_schema "apps/fr/app/pronostic-vainqueur/page.tsx" '[{name:"Accueil",url:"/"},{name:"Pronostics",url:"/pronostic"},{name:"Vainqueur",url:"/pronostic-vainqueur"}]'
add_schema "apps/fr/app/pronostics/grille/page.tsx" '[{name:"Accueil",url:"/"},{name:"Pronostics",url:"/pronostic"},{name:"Grille",url:"/pronostics/grille"}]'
add_schema "apps/fr/app/pronostics/leaderboard/page.tsx" '[{name:"Accueil",url:"/"},{name:"Pronostics",url:"/pronostic"},{name:"Classement",url:"/pronostics/leaderboard"}]'
add_schema "apps/fr/app/stades/page.tsx" '[{name:"Accueil",url:"/"},{name:"Stades",url:"/stades"}]'
add_schema "apps/fr/app/villes/page.tsx" '[{name:"Accueil",url:"/"},{name:"Villes",url:"/villes"}]'

echo ""
echo "✅ Schemas ajoutés !"
echo "Vérification : node audit-breadcrumbs.js"
