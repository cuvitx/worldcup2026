# STRATÉGIE DE CONTENU & ANALYSE UX — mondial2026.fr

**Date** : 18 février 2026
**Auteur** : Max (IA)
**Version** : 1.0
**Objectif** : Document de référence pour le développement contenu + UX jusqu'à juillet 2026

---

# PARTIE 1 : STRATÉGIE DE CONTENU

---

## 1.1 Audit des contenus existants

### Page Homepage
- **Profondeur** : ~300 mots de contenu textuel + éléments structurés (groupes, équipes, stades)
- **Qualité SEO** : 6/10 — Title et meta OK, H1 cible "Coupe du Monde 2026", manque de contenu rédactionnel dense. Pas de paragraphe d'introduction SEO riche en mots-clés. Linking interne vers groupes et équipes mais pas vers pronostics ni guides.
- **Ce qui manque** : Countdown, matchs à venir, pronostic vedette du jour, section actualités, CTA bookmaker, paragraphe intro de 200+ mots
- **Note** : 6/10

### Pages Équipe (×48)
- **Profondeur** : ~500-800 mots par page (description + données structurées). Le contenu rédactionnel "naturel" se limite à `team.description` (~50-80 mots).
- **Qualité SEO** : 7/10 — SportsTeam schema, breadcrumbs, title unique par équipe, H1 avec nom d'équipe + CDM 2026. Manque : contenu rédactionnel long (500-1000 mots), linking contextuel dans le texte, images avec alt text.
- **Ce qui manque** : Historique détaillé en CDM, analyse tactique, profil entraîneur, section "pourquoi cette équipe peut gagner", FAQ inline
- **Note** : 7/10

### Pages Match (×104)
- **Profondeur** : ~800-1200 mots équivalents (preview IA + comparaison + expert insight + cotes)
- **Qualité SEO** : 8/10 — SportsEvent schema, adaptation live/upcoming/completed, H1 "Équipe A vs Équipe B", enrichissement IA multi-facteurs. La page la plus riche du site.
- **Ce qui manque** : Historique des confrontations détaillé, compositions probables illustrées, section "comment regarder ce match", liens vers résumés post-match
- **Note** : 8/10

### Pages Pronostic Match (×104)
- **Profondeur** : ~1000-1500 mots (9 sous-composants : MatchHero, OddsTable, H2H, etc.)
- **Qualité SEO** : 8/10 — Page de monétisation principale, CTAs bookmakers, cotes estimées, analyse match. Excellente densité de valeur.
- **Ce qui manque** : Contenu rédactionnel plus "humain", exemples de mises concrètes, screenshots d'interface bookmaker, FAQ inline "Quel est le meilleur pari pour ce match ?"
- **Note** : 8/10

### Pages Pronostic Équipe (×48)
- **Profondeur** : ~700-1000 mots (ELO, probabilités par tour, cotes, matchs de groupe)
- **Qualité SEO** : 7.5/10 — Bon ciblage "pronostic [équipe] CDM 2026", jauges visuelles, barres de progression. Manque de contenu éditorial.
- **Ce qui manque** : Analyse rédactionnelle de 300-500 mots, comparaison avec les bookmakers, historique CDM de l'équipe, "notre avis"
- **Note** : 7.5/10

### Page Bracket / Tableau
- **Profondeur** : ~200 mots + visualisation interactive
- **Qualité SEO** : 6/10 — Cible "tableau coupe du monde 2026" mais peu de contenu textuel. Le bracket visuel est impressionnant mais non crawlable.
- **Ce qui manque** : Explication textuelle du format, description du chemin probable des favoris, FAQ "comment fonctionne le tableau éliminatoire CDM 2026"
- **Note** : 6/10

### Pages Groupe (×12)
- **Profondeur** : ~300-500 mots (classement, matchs, descriptions équipes)
- **Qualité SEO** : 6.5/10 — Cible "groupe [lettre] coupe du monde 2026". Manque de contenu d'analyse.
- **Ce qui manque** : Analyse complète du groupe (favori, outsider, pronostic de classement), historique des équipes du groupe, cotes de qualification
- **Note** : 6.5/10

### Pages Joueur (×210+)
- **Profondeur** : ~150-300 mots (description + stats basiques)
- **Qualité SEO** : 5/10 — Person schema OK, mais contenu très maigre. Chaque fiche est un stub.
- **Ce qui manque** : Biographie détaillée, parcours en CDM, stats de saison en club, forces/faiblesses, comparaison avec d'autres joueurs, cotes buteur
- **Note** : 5/10

### Pages Buteur (~100)
- **Profondeur** : ~400-600 mots (stats, cotes buteur, analyse, teammates)
- **Qualité SEO** : 7/10 — Bonne niche SEO "cote buteur [joueur] CDM 2026". Contenu correct.
- **Ce qui manque** : Stats détaillées par compétition, graphique d'évolution, comparaison avec les concurrents au Soulier d'Or
- **Note** : 7/10

### Pages Stade (×16)
- **Profondeur** : ~300-500 mots
- **Qualité SEO** : 5.5/10 — Manque schema StadiumOrArena, pas d'images réelles du stade, peu de contenu rédactionnel.
- **Ce qui manque** : Photos/images, informations pratiques (transports, parkings, restauration), historique du stade, matchs programmés avec liens, guide "aller au stade"
- **Note** : 5.5/10

### Pages Ville (×12)
- **Profondeur** : ~300-500 mots
- **Qualité SEO** : 5/10 — Manque schema Place, pas d'images, contenu insuffisant pour ranker sur "coupe du monde 2026 [ville]"
- **Ce qui manque** : Guide touristique complet, hébergement, transports, restaurants, activités, météo, matchs dans la ville
- **Note** : 5/10

### Pages Guide (×9)
- **Profondeur** : ~2000-4000 mots par guide (sections avec contenu dense)
- **Qualité SEO** : 5/10 — Article schema OK. Mais les guides, bien que détaillés dans leurs sections, manquent de structure H2/H3 optimisée, d'exemples visuels, de tableaux comparatifs intégrés, de FAQ inline, et de screenshots. Pour ranker sur "comment parier CDM 2026" il faut 5000-8000 mots avec un contenu BEAUCOUP plus riche.
- **Ce qui manque** : Exemples concrets avec montants, screenshots d'interface, tableaux comparatifs côte à côte, FAQ inline, infographies, sommaire cliquable, date de mise à jour, auteur identifié
- **Note** : 5/10

### Pages Bookmaker (×5-7)
- **Profondeur** : ~600-800 mots (rating 6 critères, pros/cons, infos pratiques)
- **Qualité SEO** : 6.5/10 — Review schema, bonne structure. Manque de profondeur.
- **Ce qui manque** : Screenshots, tutoriel d'inscription pas à pas, comparaison détaillée des cotes sur un match CDM, FAQ "comment s'inscrire chez [bookmaker]"
- **Note** : 6.5/10

### Pages H2H (~1128)
- **Profondeur** : ~200-400 mots (historique confrontations, stats)
- **Qualité SEO** : 4/10 — Énorme volume de pages mais quasi orphelines (peu de liens entrants). Contenu très maigre. Potentiel long tail massif inexploité.
- **Ce qui manque** : Contenu rédactionnel, dernières confrontations détaillées, pronostic, cotes, lien vers le match si programmé en CDM
- **Note** : 4/10

### Page FAQ
- **Profondeur** : ~2500 mots (16+ questions/réponses)
- **Qualité SEO** : 7.5/10 — FAQPage schema, catégorisé, bon contenu. Bien fait.
- **Ce qui manque** : Plus de questions (objectif 50+), intégration de FAQ inline sur chaque page thématique
- **Note** : 7.5/10

### Pages légales (Contact, À propos, Mentions légales, Jeu responsable)
- **Note** : 6/10 — Fonctionnel, conforme. À propos manque de crédibilité E-E-A-T (pas de vrais noms/photos).

---

## 1.2 Articles et pages à créer

### Catégorie 1 : Guides de paris — Transformation des 9 guides existants

#### Guide 1 : "Comment parier sur la Coupe du Monde 2026 ?"
- **Slug** : `comment-parier-cdm-2026`
- **Mot-clé principal** : "comment parier coupe du monde 2026"
- **Volume estimé** : 8 000-15 000/mois (montée exponentielle mars-juin)
- **Nombre de mots cible** : 7 000-8 000 mots
- **Structure H2/H3** :
  - H2: Pourquoi parier sur la CDM 2026 ? (Le plus grand événement de paris au monde)
  - H2: Étape 1 — Choisir un bookmaker agréé ANJ
    - H3: Tableau comparatif des 5 meilleurs bookmakers
    - H3: Notre recommandation : ouvrir 2-3 comptes
  - H2: Étape 2 — Créer son compte et vérifier son identité
    - H3: Documents nécessaires
    - H3: Délais de vérification par bookmaker
  - H2: Étape 3 — Effectuer son premier dépôt et profiter du bonus
    - H3: Tableau des bonus de bienvenue (montant, conditions)
    - H3: Stratégie de cumul des bonus (jusqu'à 540€)
  - H2: Les types de paris pour la CDM 2026
    - H3: Paris 1N2 (le classique)
    - H3: Plus/moins de buts
    - H3: Buteurs (premier, anytime, dernier)
    - H3: Score exact
    - H3: Handicap asiatique
    - H3: Paris combinés / Accumulateurs
    - H3: Paris long terme (vainqueur, meilleur buteur)
  - H2: Comprendre les cotes décimales (avec exemples CDM)
    - H3: Calcul du gain potentiel
    - H3: Probabilité implicite
    - H3: La marge du bookmaker
  - H2: Gérer son budget : la règle des 2-5%
    - H3: Système de mise fixe (débutants)
    - H3: Système proportionnel (avancé)
    - H3: Perte maximale quotidienne
  - H2: Le format 48 équipes : impact sur les paris
  - H2: Analyser un match de CDM avant de parier
    - H3: Classement FIFA et ELO
    - H3: Forme récente
    - H3: Absences et compositions
    - H3: Conditions de jeu (altitude, chaleur, décalage)
  - H2: Les paris en direct pendant la CDM 2026
    - H3: Meilleurs moments pour parier en live
    - H3: Meilleurs bookmakers pour le live
  - H2: FAQ : 10 questions fréquentes sur les paris CDM
- **Contenu à inclure** : Tableau comparatif bookmakers avec bonus/cotes/note, exemples de mises concrètes (10€ sur France à 1.45 = 14.50€), screenshots des interfaces, infographie "parcours du parieur", encarts "conseil de Max"

#### Guide 2 : "Meilleurs sites de paris sportifs 2026"
- **Slug** : `meilleurs-sites-paris-sportifs`
- **Mot-clé principal** : "meilleur site paris sportif 2026"
- **Volume estimé** : 20 000-40 000/mois
- **Nombre de mots cible** : 8 000-10 000 mots
- **Structure H2/H3** :
  - H2: Notre classement 2026 des meilleurs bookmakers
    - H3: #1 Betclic — Le meilleur rapport qualité/prix
    - H3: #2 Winamax — Les meilleures cotes du marché
    - H3: #3 Unibet — Le roi des statistiques
    - H3: #4 Parions Sport — Le plus accessible
    - H3: #5 ZEbet — Le meilleur bonus
  - H2: Comparatif détaillé des bonus de bienvenue (tableau)
  - H2: Comparatif des cotes sur un match type CDM
    - H3: Exemple concret : France vs Sénégal (cotes des 5 bookmakers)
  - H2: Comparatif des applications mobiles
    - H3: Notes App Store / Google Play
    - H3: Fonctionnalités clés par app
  - H2: Quel bookmaker pour quel profil de parieur ?
    - H3: Débutant → Parions Sport ou Betclic
    - H3: Parieur régulier → Betclic
    - H3: Expert → Winamax
    - H3: Chasseur de bonus → ZEbet + multi-comptes
    - H3: Fan de live → Unibet
  - H2: Sécurité et régulation ANJ : tout ce qu'il faut savoir
  - H2: Comparatif des méthodes de paiement
  - H2: Stratégie multi-comptes pour la CDM 2026
  - H2: FAQ : 15 questions sur le choix d'un bookmaker
- **Contenu à inclure** : Tableaux comparatifs (bonus, cotes, apps, paiements), badges "Choix de la rédaction", captures d'écran des apps, témoignages utilisateurs stylisés, encarts "bon plan"

#### Guide 3 : "Guide du parieur débutant"
- **Slug** : `guide-parieur-debutant`
- **Mot-clé principal** : "paris sportifs débutant guide"
- **Volume estimé** : 12 000-20 000/mois
- **Nombre de mots cible** : 6 000-7 000 mots
- **Structure H2/H3** :
  - H2: Les paris sportifs, c'est quoi exactement ?
  - H2: Le vocabulaire essentiel (glossaire rapide de 20 termes)
  - H2: Comment fonctionnent les cotes ?
    - H3: Cotes décimales (Europe/France)
    - H3: Cotes fractionnelles (UK)
    - H3: Cotes américaines (USA)
    - H3: Exercices pratiques
  - H2: Les 5 types de paris à connaître
  - H2: Votre premier pari en 5 étapes (tutoriel illustré)
  - H2: Les 10 erreurs de débutant à éviter
  - H2: Gérer son argent comme un pro
  - H2: Où trouver l'information avant de parier
  - H2: Le jeu responsable : savoir s'arrêter
  - H2: FAQ débutant

#### Guide 4 : "Stratégie de paris en direct"
- **Slug** : `strategie-paris-direct`
- **Mot-clé principal** : "paris en direct stratégie"
- **Volume estimé** : 5 000-10 000/mois
- **Nombre de mots cible** : 5 000-6 000 mots
- **Structure H2/H3** :
  - H2: Pourquoi le live betting explose pendant la CDM
  - H2: Les marchés disponibles en direct
  - H2: Les 5 meilleurs moments pour parier en live
    - H3: Après les 10 premières minutes
    - H3: Juste après un but (surréaction des cotes)
    - H3: À la mi-temps
    - H3: 60e-75e minute (remplacements)
    - H3: Après un carton rouge
  - H2: Stratégies avancées de live betting
    - H3: Le "lay the draw" (parier contre le nul)
    - H3: Le trading de cotes
    - H3: L'assurance en live
  - H2: Comparatif des plateformes live (Betclic vs Winamax vs Unibet)
  - H2: Gérer ses émotions en live
  - H2: FAQ paris en direct

#### Guide 5 : "Parier sur les buteurs CDM 2026"
- **Slug** : `parier-buteurs`
- **Mot-clé principal** : "parier buteur coupe du monde 2026"
- **Volume estimé** : 5 000-8 000/mois
- **Nombre de mots cible** : 5 000-6 000 mots
- **Structure H2/H3** :
  - H2: Les marchés buteurs disponibles
    - H3: Premier buteur
    - H3: Buteur à tout moment (anytime)
    - H3: Dernier buteur
    - H3: Meilleur buteur du tournoi (Soulier d'Or)
    - H3: Nombre de buts d'un joueur
  - H2: Top 10 favoris pour le Soulier d'Or 2026
    - H3: Mbappé, Haaland, Vinicius, Kane, Yamal... (analyse + cotes)
  - H2: Les outsiders à surveiller
  - H2: Historique des meilleurs buteurs en CDM (1930-2022)
  - H2: Stratégie : comment choisir son buteur
    - H3: Favoriser les attaquants d'équipes qui iront loin
    - H3: Tireurs de penalty = avantage statistique
    - H3: Le format 48 équipes = plus de matchs = plus de buts
  - H2: FAQ buteurs

#### Guide 6 : "Comment retirer ses gains"
- **Slug** : `comment-retirer-gains`
- **Mot-clé principal** : "retirer gains paris sportifs"
- **Volume estimé** : 8 000-12 000/mois
- **Nombre de mots cible** : 4 000-5 000 mots
- **Structure H2/H3** :
  - H2: Les méthodes de retrait par bookmaker (tableau)
  - H2: Délais de traitement (comparatif)
  - H2: Tutoriel retrait Betclic (pas à pas)
  - H2: Tutoriel retrait Winamax
  - H2: Tutoriel retrait Parions Sport
  - H2: Le KYC : pourquoi on vous demande vos documents
  - H2: Fiscalité des gains de paris en France
  - H2: FAQ retrait

#### Guide 7 : "Paris combinés et Bet Builder CDM 2026"
- **Slug** : `paris-combines-bet-builder`
- **Mot-clé principal** : "pari combiné coupe du monde"
- **Volume estimé** : 3 000-6 000/mois
- **Nombre de mots cible** : 5 000 mots
- **Structure H2/H3** :
  - H2: Qu'est-ce qu'un pari combiné ?
  - H2: Combiné vs Bet Builder : quelle différence ?
  - H2: 5 exemples de combinés rentables pour la CDM
  - H2: Les erreurs classiques sur les combinés
  - H2: Stratégie : le système de Kelly pour les combinés
  - H2: Comparatif Bet Builder (Betclic vs Winamax vs Unibet)
  - H2: FAQ paris combinés

#### Guide 8 : "Cotes et value bets CDM 2026"
- **Slug** : `cotes-value-bets-cdm-2026`
- **Mot-clé principal** : "value bet coupe du monde"
- **Volume estimé** : 3 000-5 000/mois
- **Nombre de mots cible** : 5 000 mots
- **Structure H2/H3** :
  - H2: Qu'est-ce qu'un value bet ?
  - H2: Comment calculer la valeur d'une cote
    - H3: Formule : Expected Value (EV)
    - H3: Exemples concrets CDM 2026
  - H2: Comparer les cotes : notre méthode
  - H2: Les meilleures sources de données pour identifier les value bets
  - H2: 10 value bets potentiels pour la CDM 2026
  - H2: Outils et comparateurs de cotes
  - H2: FAQ value bets

#### Guide 9 : "Bonus et promotions CDM 2026"
- **Slug** : `bonus-promotions-cdm-2026`
- **Mot-clé principal** : "bonus paris sportifs coupe du monde 2026"
- **Volume estimé** : 5 000-10 000/mois
- **Nombre de mots cible** : 5 000-6 000 mots
- **Structure H2/H3** :
  - H2: Tous les bonus de bienvenue disponibles (tableau mise à jour)
  - H2: Les offres spéciales CDM 2026 attendues
    - H3: Boosts de cotes
    - H3: Freebets quotidiens
    - H3: Assurance combiné
    - H3: Cashback
  - H2: Comment maximiser les bonus (stratégie multi-comptes)
  - H2: Conditions de mise : ce qu'il faut vérifier
  - H2: Calendrier des promotions attendues
  - H2: FAQ bonus et promotions

---

### Catégorie 2 : Articles SEO informationnels (nouveaux)

#### Article 1
- **Titre** : "Coupe du Monde 2026 : tout ce qu'il faut savoir (format, dates, stades, équipes)"
- **Mot-clé** : "coupe du monde 2026" — Volume : 200K+/mois — Difficulté : haute
- **Angle** : Article pilier exhaustif, la page de référence francophone sur la CDM 2026
- **Structure** : H2: Dates et calendrier / H2: Le nouveau format 48 équipes / H2: Les 16 stades / H2: Les 12 groupes / H2: Les favoris / H2: Billetterie / H2: Comment regarder / H2: FAQ 20 questions

#### Article 2
- **Titre** : "Les favoris de la Coupe du Monde 2026 : analyse et classement"
- **Mot-clé** : "favoris coupe du monde 2026" — Volume : 30K-50K/mois — Difficulté : moyenne
- **Angle** : Classement data-driven (ELO + cotes + analyse tactique)
- **Structure** : H2: Top 5 favoris (France, Argentine, Espagne, Brésil, Angleterre) / H2: Dark horses (Pays-Bas, Portugal, Allemagne, Croatie) / H2: Outsiders (Maroc, Japon, Sénégal) / H2: Les cotes comparées / H2: Notre pronostic

#### Article 3
- **Titre** : "Dark horses CDM 2026 : les 10 équipes qui peuvent créer la surprise"
- **Mot-clé** : "surprise coupe du monde 2026" — Volume : 5K-10K/mois — Difficulté : faible
- **Angle** : Analyse des outsiders avec arguments data + tactiques
- **Structure** : H2 par équipe (Maroc, Japon, Sénégal, Colombie, Norvège, Corée du Sud, Suisse, Autriche, Équateur, Iran) avec analyse + cotes

#### Article 4
- **Titre** : "France Coupe du Monde 2026 : effectif, pronostic et chances de victoire"
- **Mot-clé** : "france coupe du monde 2026" — Volume : 20K-30K/mois — Difficulté : moyenne
- **Angle** : Dossier complet sur les Bleus
- **Structure** : H2: L'effectif probable / H2: Le parcours en éliminatoires / H2: Analyse tactique / H2: Les matchs de groupe / H2: Le chemin possible vers la finale / H2: Les cotes / H2: Notre pronostic

#### Article 5
- **Titre** : "Argentine : Messi peut-il remporter un deuxième Mondial ?"
- **Mot-clé** : "argentine coupe du monde 2026 messi" — Volume : 10K-20K/mois — Difficulté : moyenne
- **Angle** : Dossier sur la défense du titre, la question Messi à 39 ans

#### Article 6
- **Titre** : "Calendrier Coupe du Monde 2026 : dates, horaires et programme TV (heure française)"
- **Mot-clé** : "calendrier coupe du monde 2026 heure française" — Volume : 40K+/mois — Difficulté : moyenne
- **Angle** : Calendrier complet avec décalage horaire, chaînes TV

#### Article 7
- **Titre** : "Où regarder la Coupe du Monde 2026 à la TV et en streaming"
- **Mot-clé** : "coupe du monde 2026 TV streaming" — Volume : 20K+/mois — Difficulté : moyenne
- **Angle** : Guide des chaînes, streaming légal, bars et écrans géants

#### Article 8
- **Titre** : "Stades de la Coupe du Monde 2026 : guide complet des 16 enceintes"
- **Mot-clé** : "stades coupe du monde 2026" — Volume : 15K/mois — Difficulté : faible
- **Angle** : Guide illustré de chaque stade avec capacité, histoire, accès, matchs programmés

#### Article 9
- **Titre** : "Meilleur buteur CDM 2026 : pronostics et cotes du Soulier d'Or"
- **Mot-clé** : "meilleur buteur coupe du monde 2026" — Volume : 15K+/mois — Difficulté : moyenne
- **Angle** : Analyse des candidats avec stats, cotes, historique

#### Article 10
- **Titre** : "Groupe de la mort CDM 2026 : analyse des groupes les plus relevés"
- **Mot-clé** : "groupe de la mort coupe du monde 2026" — Volume : 10K/mois — Difficulté : faible
- **Angle** : Analyse des groupes C (Brésil, Maroc), I (France, Sénégal), L (Angleterre, Croatie)

#### Article 11
- **Titre** : "Simulateur de bracket Coupe du Monde 2026 : créez votre parcours"
- **Mot-clé** : "simulateur coupe du monde 2026" — Volume : 10K+/mois — Difficulté : faible
- **Angle** : Page interactive (à lier avec le simulateur à développer)

#### Article 12
- **Titre** : "Historique de la Coupe du Monde : palmarès, records et légendes (1930-2022)"
- **Mot-clé** : "historique coupe du monde" — Volume : 15K/mois — Difficulté : moyenne
- **Angle** : Contenu evergreen, palmarès, records, anecdotes

#### Article 13
- **Titre** : "Nouveau format CDM 2026 : comment fonctionnent les 48 équipes ?"
- **Mot-clé** : "format coupe du monde 2026 48 équipes" — Volume : 8K/mois — Difficulté : faible
- **Angle** : Explication détaillée du nouveau format avec schémas

#### Article 14
- **Titre** : "Pronostic vainqueur Coupe du Monde 2026 : qui va gagner ?"
- **Mot-clé** : "pronostic vainqueur coupe du monde 2026" — Volume : 20K+/mois — Difficulté : haute
- **Angle** : Article pilier pronostic, avec modèle ELO + analyse + cotes

#### Article 15
- **Titre** : "Les premières participations : Curaçao, Cap-Vert, Jordanie, Haïti et les débutants de 2026"
- **Mot-clé** : "première participation coupe du monde 2026" — Volume : 3K/mois — Difficulté : faible
- **Angle** : Portraits des petites nations qui vivent leur rêve

#### Article 16
- **Titre** : "Cristiano Ronaldo à 41 ans : sa dernière Coupe du Monde ?"
- **Mot-clé** : "ronaldo coupe du monde 2026" — Volume : 15K/mois — Difficulté : moyenne
- **Angle** : Dossier émotionnel + stats + question de la retraite

#### Article 17
- **Titre** : "Haaland en Coupe du Monde : la Norvège peut-elle surprendre ?"
- **Mot-clé** : "haaland coupe du monde 2026" — Volume : 10K/mois — Difficulté : faible
- **Angle** : Focus sur le duo Haaland-Ødegaard dans le groupe I avec la France

#### Article 18
- **Titre** : "Mbappé au Real Madrid : le favori pour le Ballon d'Or et le Soulier d'Or"
- **Mot-clé** : "mbappé coupe du monde 2026" — Volume : 15K/mois — Difficulté : moyenne
- **Angle** : Analyse de Mbappé en sélection, stats, parcours CDM 2018 et 2022

#### Article 19
- **Titre** : "Lamine Yamal : le prodige de 18 ans qui peut illuminer la CDM 2026"
- **Mot-clé** : "yamal coupe du monde 2026" — Volume : 8K/mois — Difficulté : faible
- **Angle** : Portrait du plus jeune talent, comparaison avec Pelé 1958

#### Article 20
- **Titre** : "CDM 2026 aux États-Unis : guide de voyage pour les supporters français"
- **Mot-clé** : "voyage coupe du monde 2026 états-unis" — Volume : 5K/mois — Difficulté : faible
- **Angle** : Guide pratique (VISA, vols, hébergement, budget, sécurité, décalage horaire)

#### Article 21
- **Titre** : "Glossaire des paris sportifs : 100+ termes expliqués simplement"
- **Mot-clé** : "glossaire paris sportifs" — Volume : 5K/mois — Difficulté : faible
- **Angle** : Page de référence A-Z avec ancres, linked depuis tous les guides

#### Article 22
- **Titre** : "Altitude et chaleur : l'impact des conditions climatiques sur les matchs CDM 2026"
- **Mot-clé** : "altitude stade azteca coupe du monde" — Volume : 2K/mois — Difficulté : faible
- **Angle** : Unique — personne ne traite ce sujet. Altitude Mexico (2240m), chaleur Miami/Dallas/Houston en juillet

#### Article 23
- **Titre** : "Paris sportifs et Coupe du Monde : combien les Français vont-ils parier en 2026 ?"
- **Mot-clé** : "paris sportifs coupe du monde 2026 france" — Volume : 3K/mois — Difficulté : faible
- **Angle** : Chiffres du marché, tendances, comparaison 2018 et 2022

#### Article 24
- **Titre** : "Top 10 des plus belles surprises de l'histoire de la Coupe du Monde"
- **Mot-clé** : "surprises coupe du monde histoire" — Volume : 5K/mois — Difficulté : faible
- **Angle** : Contenu evergreen + engagement (Corée 2002, Islande 2018, Arabie Saoudite 2022...)

#### Article 25
- **Titre** : "Les records de la Coupe du Monde qui pourraient tomber en 2026"
- **Mot-clé** : "records coupe du monde" — Volume : 3K/mois — Difficulté : faible
- **Angle** : 13 buts de Fontaine, 25 matchs sans défaite du Brésil, plus vieux buteur...

---

### Catégorie 3 : Pages transactionnelles (monétisation)

1. **Comparateur de cotes CDM 2026** (`/comparateur-cotes/`)
   - Tableau comparatif des cotes de tous les bookmakers pour chaque match
   - Mise à jour temps réel via API
   - Filtre par match, groupe, type de pari
   - CTA direct vers chaque bookmaker

2. **Landing page par bookmaker enrichie** (`/bookmaker/[slug]/inscription/`)
   - Tutoriel d'inscription pas à pas avec screenshots
   - Code promo exclusif si disponible
   - CTA "S'inscrire maintenant" prominent

3. **Page "Meilleur bonus du moment"** (`/bonus/`)
   - Mise à jour hebdomadaire
   - Classement des bonus par montant
   - Tableau comparatif interactif
   - Section "Offres spéciales CDM 2026"

4. **Page "Paris sportifs CDM 2026"** (hub existant, à enrichir)
   - Réécrire en tant que page pilier de 3000+ mots
   - Centraliser les liens vers tous les guides
   - Section pronostics vedettes du moment
   - Comparaison des bookmakers en un coup d'œil

5. **Pages "Pronostic + cotes" par journée** (`/pronostic/journee-1/`, etc.)
   - 3 journées de groupe × 12 groupes + phases éliminatoires
   - Multi-matchs sur une seule page = plus de temps passé
   - CTAs bookmaker contextualisés par match

---

### Catégorie 4 : Pages engagement (retour visiteurs)

1. **Simulateur de bracket interactif** (`/simulateur/`)
   - L'utilisateur clique sur le vainqueur de chaque match
   - Cascade automatique 32e → 16e → quarts → demis → finale
   - "Qui sera ton champion ?" → résultat partageable en image
   - Compare ton bracket avec le bracket IA du site
   - Pendant le tournoi : vrais résultats superposés

2. **Quiz Coupe du Monde** (`/quiz/`)
   - 100+ questions en 5 catégories (Histoire, Règles, Joueurs, Stades, Stats)
   - Score partageable : "J'ai eu 17/20 au Quiz CDM 2026 sur mondial2026.fr !"
   - Nouveau quiz chaque semaine
   - Classement des scores

3. **Pronostics communautaires** (`vote sur chaque page match`)
   - Vote 1/N/2 en un clic sans compte
   - Affichage temps réel : "73% pensent que la France gagne"
   - Classement des meilleurs pronostiqueurs

4. **Comparateur de stats joueurs** (`/comparer-joueurs/`)
   - Sélectionner 2-3 joueurs, radar chart comparatif
   - Partage réseaux sociaux
   - "Mbappé vs Vinicius vs Haaland"

5. **"Compose ton XI de la CDM 2026"** (`/xi-ideal/`)
   - Sélection avec budget fictif
   - Image partageable du XI choisi
   - Classement des XI les plus populaires

6. **Classement pronostiqueurs** (`/classement-pronostiqueurs/`)
   - Points par pronostic correct (1N2 = 3 pts, score exact = 10 pts)
   - Classement hebdo + global
   - Badge "Top 10%"

---

### Catégorie 5 : Contenu "snackable"

1. **"Le saviez-vous ?" quotidien** — Widget sur la homepage + page dédiée
   - 1 anecdote CDM par jour
   - Ex : "Le record de Just Fontaine (13 buts en 1958) tient depuis 66 ans"

2. **"Stat du jour"** — Widget homepage
   - Stat clé du jour liée à l'actualité CDM
   - Ex : "Mbappé a marqué dans ses 4 derniers matchs de CDM"

3. **"Record à battre"** — Section dédiée
   - Top 20 records CDM avec contexte historique
   - Barres de progression ("Ronaldo à 8 buts CDM, record = 16 de Klose")

4. **"Ce jour-là en CDM"** — Widget calendrier historique
   - Matchs historiques au même date

5. **Infographies partageables** — 1 par semaine pré-tournoi
   - "Les 10 favoris en un coup d'œil"
   - "Le chemin de la France vers la finale"
   - "Comparaison des 3 groupes de la mort"
   - "Les 48 équipes en chiffres"

6. **Mini-podcast IA "Le Pronostic du Jour"** (2 min, TTS)
   - Audio quotidien avec pronostic + analyse
   - Publié sur le site + RSS podcast

---

### Catégorie 6 : Pages tournoi dynamiques (pendant la CDM)

1. **Centre live / Hub résultats** (`/live/`)
   - Tous les matchs du jour avec scores temps réel
   - Timeline événements (buts, cartons, remplacements)
   - Dashboard groupes mis à jour

2. **Résumés post-match automatiques** (IA)
   - Résumé IA de chaque match dans les 2h
   - Stats clés, buts, homme du match
   - Impact sur le classement du groupe / bracket

3. **Page "Matchs du jour" enrichie** (`/match/aujourdhui/`)
   - Preview + cotes + pronostic + météo pour chaque match du jour
   - CTA bookmaker contextuel

4. **Articles réactifs**
   - "L'équipe X éliminée : analyse", "Sensation : [outsider] bat [favori]"
   - Générés par IA, publiés dans les heures suivant l'événement

5. **Dashboard tournoi** (`/dashboard/`)
   - Classements des 12 groupes sur une page
   - Course au Soulier d'Or en temps réel
   - Bracket mis à jour avec vrais résultats
   - Stats globales du tournoi

6. **Page "Buteur du tournoi" live** (`/soulier-dor/`)
   - Classement live des buteurs
   - Cotes actualisées
   - Prochains matchs des candidats

---

## 1.3 Planning éditorial (février — juillet 2026)

### Février 2026 (S8-S9)

| Semaine | Contenu | Priorité | Format | Production |
|---------|---------|----------|--------|-----------|
| S8 (17-23 fév) | Fix bugs critiques + corrections accents | 🔴 Critique | Code | Dev |
| S8 | Réécriture guide "Comment parier CDM 2026" (7000 mots) | 🔴 Haute | Article long | IA + relecture |
| S8 | Article "Tout savoir sur la CDM 2026" (pilier) | 🔴 Haute | Article long | IA + relecture |
| S9 (24 fév - 2 mars) | Réécriture guide "Meilleurs sites paris sportifs" (8000 mots) | 🔴 Haute | Article long | IA + relecture |
| S9 | Article "Favoris CDM 2026" | 🟡 Haute | Article long | IA + relecture |
| S9 | Page "Notre méthodologie" + profils auteur | 🟡 Haute | Page statique | Hybride |

### Mars 2026 (S10-S13)

| Semaine | Contenu | Priorité | Format | Production |
|---------|---------|----------|--------|-----------|
| S10 | Réécriture guides 3-5 (débutant, live, buteurs) | 🔴 Haute | Articles longs | IA + relecture |
| S10 | Article "France CDM 2026" | 🟡 Haute | Article long | IA |
| S11 | Réécriture guides 6-9 (retrait, combinés, value, bonus) | 🟡 Haute | Articles longs | IA + relecture |
| S11 | Article "Calendrier heure française" | 🟡 Haute | Page interactive | Hybride |
| S12 | Simulateur de bracket (dev) | 🔴 Haute | Page interactive | Dev |
| S12 | Article "Pronostic vainqueur CDM 2026" | 🟡 Haute | Article long | IA |
| S13 | Articles joueurs stars (Mbappé, Haaland, Ronaldo, Yamal) | 🟡 Moyenne | Articles × 4 | IA |
| S13 | Glossaire des paris sportifs | 🟠 Moyenne | Page référence | IA |

### Avril 2026 (S14-S17)

| Semaine | Contenu | Priorité | Format | Production |
|---------|---------|----------|--------|-----------|
| S14 | Comparateur de cotes (dev) | 🟡 Haute | Page interactive | Dev |
| S14 | Articles Dark horses + Groupes de la mort | 🟡 Moyenne | Articles × 2 | IA |
| S15 | Quiz CDM (dev) | 🟡 Moyenne | Page interactive | Dev |
| S15 | Article "Stades CDM 2026 guide complet" | 🟡 Moyenne | Article long | IA |
| S16 | Section News/Actualités (dev) | 🔴 Haute | Infrastructure | Dev |
| S16 | Article "Format 48 équipes expliqué" | 🟠 Moyenne | Article | IA |
| S17 | Article "Historique CDM 1930-2022" | 🟠 Moyenne | Article evergreen | IA |
| S17 | Pronostics communautaires (dev vote) | 🟡 Moyenne | Feature | Dev |

### Mai 2026 (S18-S22)

| Semaine | Contenu | Priorité | Format | Production |
|---------|---------|----------|--------|-----------|
| S18 | Enrichir 48 pages équipe (+500 mots chacune) | 🟡 Haute | Contenu pages | IA batch |
| S19 | Enrichir pages stade et ville | 🟡 Moyenne | Contenu pages | IA batch |
| S20 | Article "Guide voyage CDM 2026 USA" | 🟡 Moyenne | Article long | IA + relecture |
| S20 | Article "Où regarder CDM 2026 TV streaming" | 🟡 Haute | Article | IA |
| S21 | Centre live / Hub résultats (dev) | 🔴 Haute | Infrastructure | Dev |
| S21 | Infographies × 4 (favoris, groupes, stades, format) | 🟡 Moyenne | Visuels | Design |
| S22 | Dashboard tournoi (dev) | 🟡 Haute | Page interactive | Dev |
| S22 | Newsletter setup + landing page | 🟡 Moyenne | Infrastructure | Dev |

### Juin 2026 — Pré-tournoi (S23-S24)

| Semaine | Contenu | Priorité | Format | Production |
|---------|---------|----------|--------|-----------|
| S23 (1-7 juin) | Articles pré-tournoi finaux (5 articles) | 🔴 Haute | Articles | IA |
| S23 | Vérification générale de tout le contenu | 🔴 Haute | QA | Manuel |
| S23 | "Stat du jour" + "Le saviez-vous" — contenus pour 40 jours | 🟡 Moyenne | Snackable × 40 | IA batch |
| S24 (8-10 juin) | Dernier polish, test live features, monitoring setup | 🔴 Critique | QA | Dev |

### Juin-Juillet 2026 — Pendant le tournoi (S24-S29)

| Période | Contenu | Priorité | Format | Production |
|---------|---------|----------|--------|-----------|
| Chaque jour | Résumé post-match IA (2-4 par jour) | 🔴 Critique | Articles auto | IA auto |
| Chaque jour | "Stat du jour" + "Le saviez-vous" | 🟡 Haute | Widget | IA auto |
| Chaque jour | Mise à jour pronostics, classements, bracket | 🔴 Critique | Data | Auto |
| Chaque jour | Newsletter quotidienne "3 pronostics du jour" | 🟡 Haute | Email | IA auto |
| Chaque journée de match | Preview enrichi "Matchs du jour" | 🔴 Critique | Page | IA + relecture |
| Après phase de groupes | Articles "Bilan des groupes" × 12 | 🟡 Haute | Articles | IA auto |
| Phases éliminatoires | Articles preview/résumé chaque match | 🔴 Critique | Articles | IA auto |
| Fin tournoi | "Bilan CDM 2026" + "Stats finales" | 🟡 Haute | Article long | Hybride |

---

## 1.4 Stratégie de mots-clés détaillée

| # | Mot-clé | Volume estimé | Difficulté | Page cible |
|---|---------|--------------|------------|-----------|
| 1 | coupe du monde 2026 | 200K+ | Haute | Homepage + article pilier |
| 2 | cdm 2026 | 50K+ | Moyenne | Homepage (title template) |
| 3 | calendrier coupe du monde 2026 | 40K+ | Moyenne | /match/calendrier/ |
| 4 | pronostic coupe du monde 2026 | 30K+ | Haute | Hub pronostics |
| 5 | groupe coupe du monde 2026 | 30K+ | Moyenne | Pages /groupe/ |
| 6 | favoris coupe du monde 2026 | 30K+ | Moyenne | Article "Favoris" |
| 7 | france coupe du monde 2026 | 20K+ | Moyenne | /equipe/france/ + article dédié |
| 8 | tableau coupe du monde 2026 | 20K+ | Moyenne | /tableau/ |
| 9 | pronostic vainqueur cdm 2026 | 20K+ | Haute | Article "Pronostic vainqueur" |
| 10 | meilleur site paris sportif 2026 | 20K+ | Haute | Guide "Meilleurs sites" |
| 11 | résultat coupe du monde 2026 | 100K+ (pendant) | Haute | Hub live + /match/aujourdhui/ |
| 12 | match aujourd'hui coupe du monde | 50K+ (pendant) | Faible | /match/aujourdhui/ |
| 13 | stade coupe du monde 2026 | 15K+ | Faible | Pages /stade/ + article |
| 14 | paris sportifs cdm 2026 | 15K+ | Haute | Hub paris sportifs |
| 15 | meilleur buteur cdm 2026 | 15K+ | Moyenne | Pages buteur + article |
| 16 | mbappé coupe du monde 2026 | 15K+ | Moyenne | /joueur/mbappe/ + article |
| 17 | ronaldo coupe du monde 2026 | 15K+ | Moyenne | /joueur/ronaldo/ + article |
| 18 | comment parier coupe du monde | 15K+ | Moyenne | Guide "Comment parier" |
| 19 | cote coupe du monde 2026 | 12K+ | Moyenne | Comparateur de cotes |
| 20 | argentine coupe du monde 2026 | 12K+ | Moyenne | /equipe/argentine/ + article |
| 21 | espagne coupe du monde 2026 | 10K+ | Moyenne | /equipe/espagne/ |
| 22 | angleterre coupe du monde 2026 | 10K+ | Moyenne | /equipe/angleterre/ |
| 23 | bresil coupe du monde 2026 | 10K+ | Moyenne | /equipe/bresil/ |
| 24 | simulateur coupe du monde 2026 | 10K+ | Faible | /simulateur/ (à créer) |
| 25 | haaland coupe du monde 2026 | 10K+ | Faible | /joueur/haaland/ + article |
| 26 | effectif france cdm 2026 | 10K+ | Faible | /equipe/france/ |
| 27 | bonus paris sportifs cdm 2026 | 10K+ | Moyenne | Guide "Bonus et promotions" |
| 28 | quiz coupe du monde | 8K+ | Faible | /quiz/ (à créer) |
| 29 | yamal coupe du monde 2026 | 8K+ | Faible | Article dédié |
| 30 | format coupe du monde 2026 | 8K+ | Faible | Article "Format 48 équipes" |
| 31 | parier coupe du monde 2026 | 8K+ | Moyenne | Guide "Comment parier" |
| 32 | comparateur cotes cdm 2026 | 5K+ | Moyenne | /comparateur-cotes/ |
| 33 | villes hôtes coupe du monde 2026 | 5K+ | Faible | Pages /ville/ |
| 34 | glossaire paris sportifs | 5K+ | Faible | /guide/glossaire/ |
| 35 | voyage coupe du monde 2026 | 5K+ | Faible | Article guide voyage |
| 36 | dark horse coupe du monde 2026 | 5K+ | Faible | Article dark horses |
| 37 | coupe du monde 2026 tv streaming | 5K+ | Moyenne | Article TV/streaming |
| 38 | value bet coupe du monde | 5K+ | Faible | Guide value bets |
| 39 | paris en direct stratégie | 5K+ | Faible | Guide paris en direct |
| 40 | retirer gains paris sportifs | 5K+ | Faible | Guide retrait |
| 41 | pari combiné coupe du monde | 3K+ | Faible | Guide paris combinés |
| 42 | première participation cdm 2026 | 3K+ | Faible | Article premiers participants |
| 43 | altitude stade azteca | 2K+ | Faible | Article conditions climatiques |
| 44 | france vs sénégal pronostic | 3K+ | Faible | /pronostic-match/france-vs-senegal/ |
| 45 | brésil vs maroc pronostic | 3K+ | Faible | /pronostic-match/bresil-vs-maroc/ |
| 46 | argentine vs algérie pronostic | 2K+ | Faible | /pronostic-match/argentine-vs-algerie/ |
| 47 | angleterre vs croatie pronostic | 3K+ | Faible | /pronostic-match/angleterre-vs-croatie/ |
| 48 | record coupe du monde | 3K+ | Faible | Article records |
| 49 | surprise coupe du monde histoire | 3K+ | Faible | Article surprises historiques |
| 50 | soulier d'or cdm 2026 | 3K+ | Faible | /soulier-dor/ (à créer) |
| 51 | pays-bas coupe du monde 2026 | 5K+ | Faible | /equipe/pays-bas/ |
| 52 | allemagne coupe du monde 2026 | 5K+ | Faible | /equipe/allemagne/ |
| 53 | maroc coupe du monde 2026 | 5K+ | Faible | /equipe/maroc/ |
| 54 | messi dernière coupe du monde | 5K+ | Faible | Article Argentine/Messi |
| 55 | bellingham coupe du monde 2026 | 3K+ | Faible | /joueur/bellingham/ |

---

# PARTIE 2 : ANALYSE UX PAGE PAR PAGE

---

## 2.1 Homepage

### Structure actuelle
1. Header (nav 8 liens, search, lang switcher, dark mode)
2. Hero (titre H1 + baseline + CTA)
3. Stats clés (48 équipes, 104 matchs, 16 stades, 12 groupes)
4. 12 groupes (cards GroupCard)
5. Top 10 équipes (cards TeamCard)
6. 8 stades (cards)
7. CTA final
8. Footer (6 colonnes, 48+ liens)

**Above the fold** : Hero + Stats clés

### Problèmes UX identifiés
- ❌ **Aucun CTA bookmaker** sur la page la plus visitée du site → monétisation ratée
- ❌ Pas de countdown avant le tournoi → pas d'urgence
- ❌ Pas de "matchs à venir" / "prochain match" → l'utilisateur ne sait pas quand ça commence
- ❌ Pas de section pronostics populaires → le parieur ne trouve pas ce qu'il cherche
- ❌ Pas d'actualités / derniers articles → pas de raison de revenir
- ❌ L'utilisateur parieur doit cliquer 3-4 fois pour atteindre un CTA bookmaker
- ❌ Les groupes prennent beaucoup de place mais intéressent peu les parieurs

### Recommandation de redesign

```
[HEADER]
[HERO — H1 + Baseline + 2 CTAs : "Voir les pronostics" | "Meilleur bonus CDM"]

[COUNTDOWN — J-XX avant le match d'ouverture]

[PROCHAINS MATCHS — 3-4 prochains matchs avec cotes mini + lien pronostic]

[PRONOSTIC VEDETTE — Le pronostic IA du jour avec analyse rapide]

[MEILLEUR BONUS DU MOMENT — 1 bookmaker featured avec CTA]

[TOP FAVORIS — Top 5 favoris avec probabilité de victoire + cotes]

[GROUPES — 12 cards (collapsible, moins d'espace)]

[ÉQUIPES POPULAIRES — France, Argentine, Brésil, Angleterre, Espagne]

[STADES — Carousel horizontal au lieu de grid]

[DERNIERS ARTICLES — 3-4 articles récents]

[NEWSLETTER — CTA inscription]

[FOOTER]
```

**Pourquoi** : Le parcours parieur est raccourci (hero → pronostic → CTA bookmaker en 2 clics au lieu de 4). Le countdown crée l'urgence. Les prochains matchs donnent une raison de revenir. Le contenu éditorial (articles) améliore le SEO de la homepage.

### Mobile spécifique
- Countdown toujours visible
- "Prochains matchs" en carousel horizontal (swipeable)
- Groupes en accordéon (1 seul ouvert à la fois)
- CTA bookmaker sticky en bas d'écran
- Stades masqués (accessibles via "Voir tous les stades")

---

## 2.2 Page Équipe

### Structure actuelle
1. Breadcrumb
2. Hero (drapeau emoji, nom, stats rapides, CTA "Voir le pronostic")
3. Contenu principal (2 colonnes + sidebar)
   - Description, historique, analyse IA
   - Joueurs clés
   - Matchs de groupe
4. Sidebar (fiche technique, forme récente, blessures, CTA bookmaker)

**Above the fold** : Hero avec drapeau, nom, rang FIFA, groupe, CTA pronostic

### Problèmes UX identifiés
- ❌ Description trop courte (~50-80 mots) → impression de page vide
- ❌ Pas de section "Effectif complet" (seulement joueurs "clés" = 5 joueurs)
- ❌ Pas de section historique en CDM détaillé
- ❌ Pas de photos/images → page très "data" et peu engageante
- ❌ Analyse IA via `dangerouslySetInnerHTML` → risque de rendu cassé
- ❌ Sidebar CTA bookmaker identique sur toutes les équipes (pas contextualisé)
- ❌ Pas de lien vers les H2H liés à cette équipe

### Recommandation de redesign

```
[BREADCRUMB]
[HERO — Drapeau SVG, nom, rang FIFA, groupe, confédération]
[STATS RAPIDES — Sélections CDM, meilleur résultat, ELO score, probabilité de victoire]

[2 COLONNES]
  [MAIN]
    [INTRODUCTION — 300-500 mots rédactionnels bien écrits]
    [EFFECTIF COMPLET — Tous les joueurs avec position, club, sélections — tableau filtrable]
    [JOUEURS CLÉS — Top 5 avec mini-fiche et lien /joueur/]
    [MATCHS DE GROUPE — 3 matchs avec date, adversaire, stade, cote]
    [HISTORIQUE EN CDM — Palmarès, participations, résultats marquants]
    [ANALYSE IA — Preview tactique enrichie]
    [H2H LIÉS — "Confrontations historiques" liens vers les pages H2H des adversaires de groupe]
    [FAQ INLINE — 3-5 questions sur cette équipe à la CDM]
  [SIDEBAR]
    [FICHE TECHNIQUE]
    [PRONOSTIC RÉSUMÉ — Probabilité tour par tour avec barre]
    [CTA BOOKMAKER — Contextualisé : "Parier sur [Équipe] dès [cote]"]
    [FORME RÉCENTE]
    [BLESSURES]
```

### Mobile spécifique
- Sidebar passe en dessous du contenu principal
- CTA bookmaker sticky en bas d'écran
- Effectif complet en accordéon par position (GK/DF/MF/FW)
- Matchs de groupe en cards full-width

---

## 2.3 Page Match

### Structure actuelle
1. Hero adaptatif (live/upcoming/completed) — score ou countdown
2. Comparaison face-à-face (stats des 2 équipes)
3. Preview IA
4. Expert insight IA
5. Pronostic + cotes estimées
6. Sidebar (stade, météo, blessures, cotes, CTA)

**Above the fold** : Hero adaptatif avec les 2 équipes + score/countdown

### Problèmes UX identifiés
- ✅ C'est la meilleure page du site — très peu de problèmes
- ❌ Pas de lien vers la page pronostic-match depuis le hero (seulement en sidebar)
- ❌ Pas de "matchs de la même journée" → l'utilisateur ne découvre pas les autres matchs
- ❌ Pas de section "Comment regarder ce match" (chaîne TV)
- ❌ Compositions probables non illustrées (pas de formation visuelle)

### Recommandation de redesign

```
[BREADCRUMB]
[HERO ADAPTATIF]
  — Upcoming : Countdown + date/heure locale + stade + liens équipes
  — Live : Score + minute + événements récents
  — Completed : Score final + buteurs
  [CTA : "Voir notre pronostic complet" — lien vers pronostic-match]

[OÙ REGARDER — Chaîne TV + heure française]

[COMPARAISON FACE À FACE — Stats side by side]

[COMPOSITIONS PROBABLES — Formation visuelle 4-3-3 etc.]

[PREVIEW IA — Analyse multi-facteurs]

[MÉTÉO + CONDITIONS — Widget compact]

[COTES ESTIMÉES — Tableau avec CTA bookmakers]

[MATCHS DE LA MÊME JOURNÉE — 3-4 cards horizontales]

[SIDEBAR : Stade, Blessures, CTA]
```

### Mobile spécifique
- Hero simplifié (pas d'animation trop lourde)
- Comparaison face-à-face en tableau vertical (pas horizontal)
- "Où regarder" très visible (les gens cherchent sur mobile)
- CTA bookmaker sticky

---

## 2.4 Page Pronostic Match

### Structure actuelle
1. MatchHero (équipes, score prédit, confiance)
2. OddsTable (cotes 1N2 des bookmakers)
3. Score exact suggéré
4. H2H Section
5. Analyse match IA
6. Expert insight
7. CTA bookmakers
8. Sidebar

**Above the fold** : MatchHero avec pronostic principal (1N2 + score) + confiance

### Problèmes UX identifiés
- ❌ CTAs bookmakers tous identiques ("Parier") → pas contextualisé
- ❌ Pas d'exemples de mises concrètes ("Mise 10€ sur la victoire de la France à 1.45 = gain de 14.50€")
- ❌ Pas de FAQ inline ("Quel est le meilleur pari pour France vs Sénégal ?")
- ❌ Duplication composants avec `apps/fr/app/components/prediction/` (dette technique)

### Recommandation de redesign

```
[BREADCRUMB]
[MATCH HERO — Équipes, pronostic principal, score prédit, niveau de confiance IA]

[NOTRE PRONOSTIC EN RÉSUMÉ — Encart visuel : "Victoire France 2-1 | Confiance 72%"]

[EXEMPLE DE MISE — "10€ sur France gagne → 14.50€ chez Betclic (cote 1.45)"]

[TABLEAU DES COTES — Tous les bookmakers, cotes 1N2 + plus/moins buts]

[H2H — Dernières confrontations avec résultats]

[ANALYSE COMPLÈTE IA — Tactique, forme, blessures, météo, altitude]

[PARIS RECOMMANDÉS — 3 paris suggérés avec justification et cote]
  - Pari 1 : France gagne → cote 1.45 → CTA Betclic
  - Pari 2 : Plus de 2.5 buts → cote 1.85 → CTA Winamax
  - Pari 3 : Mbappé buteur → cote 2.10 → CTA Unibet

[FAQ INLINE — 5 questions : "Qui va gagner ?", "Quel score ?", "Meilleur pari ?"]

[PRONOSTIC COMMUNAUTAIRE — Vote 1/N/2 avec résultats]

[CTA FINAL — Meilleur bookmaker pour ce match]
```

### Mobile spécifique
- Pronostic résumé compact above the fold
- Tableau cotes en scroll horizontal
- Paris recommandés en cards full-width avec gros CTA
- FAQ en accordéon

---

## 2.5 Page Pronostic Équipe

### Structure actuelle
1. ELO rating avec jauge visuelle
2. Probabilités par tour (groupes, R32, R16, QF, SF, Finale, Champion)
3. Cotes estimées vainqueur
4. Pronostics des 3 matchs de groupe
5. Joueurs clés
6. CTA bookmakers

### Problèmes UX identifiés
- ❌ Pas de paragraphe d'analyse rédactionnelle ("notre avis")
- ❌ Pas de comparaison avec les cotes réelles des bookmakers → value bet invisible
- ❌ Pas de section historique CDM de cette équipe

### Recommandation de redesign

```
[HERO — Équipe + "Pronostic CDM 2026" + probabilité champion]

[NOTRE AVIS EN 1 PHRASE — "La France est notre 2e favori avec 15% de chances de titre"]

[JAUGE ELO — Visuelle + explication courte]

[PROBABILITÉS PAR TOUR — Barres de progression animées]

[COMPARAISON COTES — Notre modèle vs bookmakers → "value bet si cote > X"]

[MATCHS DE GROUPE — 3 matchs avec pronostic résumé + liens]

[JOUEURS CLÉS — Top 5]

[ANALYSE RÉDACTIONNELLE — 300 mots "pourquoi cette équipe peut/ne peut pas gagner"]

[CTA — "Parier sur [Équipe] championne du monde chez [Bookmaker]"]
```

### Mobile spécifique
- Jauge ELO compacte
- Probabilités en liste verticale (pas en barres larges)
- CTA sticky

---

## 2.6 Page Bracket / Tableau

### Structure actuelle
1. Champion prédit
2. Bracket horizontal desktop / vertical mobile
3. Tableau de probabilités

### Problèmes UX identifiés
- ❌ Magic numbers CSS (pt-[36px], mb-[52px]) → fragile
- ❌ Peu de contenu textuel (mauvais pour le SEO)
- ❌ Pas d'interactivité (l'utilisateur ne peut pas créer son propre bracket)
- ❌ Desktop horizontal scroll illisible même sur tablette

### Recommandation de redesign

```
[H1 + INTRO — 200 mots expliquant le format éliminatoire 48 équipes]

[CTA — "Créer votre propre bracket" → lien simulateur]

[BRACKET IA — Version actuelle, améliorée visuellement]
  — Tabs : "Bracket IA" | "Mon bracket" (si simulateur activé)

[CHEMINS DES FAVORIS — "Le chemin probable de la France : R32 vs X → R16 vs Y → QF vs Z..."]

[TABLEAU PROBABILITÉS — Toutes les équipes, % par tour]

[FAQ — "Comment fonctionne le tableau CDM 2026 ?" × 3-4 questions]
```

### Mobile spécifique
- Bracket en mode vertical (déjà fait ✅)
- Tabs pour switch entre IA et personnel
- Tableau probabilités en accordéon par phase

---

## 2.7 Page Buteur

### Structure actuelle
1. Stats joueur (buts, sélections, club, âge)
2. Cotes buteur estimées (anytime, 2+, 3+, top scorer)
3. Analyse textuelle
4. Teammates

### Problèmes UX identifiés
- ❌ Pas de graphique d'évolution des buts en sélection
- ❌ Pas de comparaison directe avec les autres candidats au Soulier d'Or
- ❌ CTA bookmaker non contextualisé

### Recommandation de redesign
- Ajouter : graphique buts/matchs, "vs les concurrents" (mini classement buteurs), course au Soulier d'Or position
- CTA : "Parier sur [Joueur] buteur à [cote] chez [Bookmaker]"

### Mobile spécifique
- Stats en cards compactes, graphique simplifié

---

## 2.8 Page Joueur

### Structure actuelle
1. Nom, position, numéro, club, âge
2. Stats (buts, sélections)
3. Description courte (~30-50 mots)

### Problèmes UX identifiés
- ❌ **Page la plus faible du site** — contenu stub de ~150 mots
- ❌ Pas de biographie
- ❌ Pas de parcours CDM
- ❌ Pas de stats détaillées de saison en club
- ❌ Pas de lien vers la page buteur (si applicable)
- ❌ Pas de lien vers l'équipe de manière proéminente

### Recommandation de redesign

```
[HERO — Nom, poste, numéro, club, âge, drapeau équipe]

[STATS PRINCIPALES — Buts, sélections, passes décisives en cards]

[BIOGRAPHIE — 200-300 mots (parcours, palmarès, style de jeu)]

[PARCOURS EN CDM — Résultats lors des CDM précédentes]

[STATS SAISON EN CLUB — 2025-2026 : buts, passes, minutes]

[MATCHS CDM 2026 — Matchs de son équipe avec liens]

[SI BUTEUR → Lien proéminant vers /buteur/slug/ avec cotes]

[JOUEURS SIMILAIRES — 3-4 joueurs du même poste/niveau]
```

### Mobile spécifique
- Stats en horizontal scroll cards
- Biographie collapsible si > 200 mots

---

## 2.9 Page Stade

### Structure actuelle
1. Nom, ville, capacité
2. Description
3. Matchs programmés

### Problèmes UX identifiés
- ❌ Pas d'images
- ❌ Pas de schema StadiumOrArena
- ❌ Pas d'informations pratiques (transport, parking)
- ❌ Pas de carte / localisation
- ❌ Pas de conditions de jeu (altitude, climat)

### Recommandation de redesign

```
[HERO — Image stade, nom, ville, capacité]

[FICHE TECHNIQUE — Capacité, année construction, surface, altitude]

[CONDITIONS DE JEU — Climat type en juin-juillet, altitude, impact sur le jeu]

[MATCHS PROGRAMMÉS — Liste chronologique avec liens match]

[INFORMATIONS PRATIQUES — Transport, parking, quartier, restaurants proches]

[CARTE — Embed Google Maps ou OpenStreetMap]

[GUIDE DE LA VILLE — Lien vers /ville/slug/]
```

### Mobile spécifique
- Image stade en full-width
- Carte interactive tactile
- Matchs programmés en timeline verticale

---

## 2.10 Page Ville

### Structure actuelle
1. Nom, pays
2. Description
3. Stade(s) dans la ville

### Problèmes UX identifiés
- ❌ Contenu très insuffisant pour ranker
- ❌ Pas d'infos touristiques (hébergement, transport, activités)
- ❌ Pas de schema Place
- ❌ Pas de météo type

### Recommandation de redesign

```
[HERO — Nom ville, pays, image]

[MATCHS DANS CETTE VILLE — Chronologique avec liens]

[STADE — Card avec lien /stade/slug/]

[GUIDE PRATIQUE]
  — Accès : aéroport, transports en commun
  — Hébergement : quartiers recommandés, budget
  — Décalage horaire avec la France
  — Météo en juin-juillet
  — Sécurité : conseils
  — À voir / À faire : attractions proches

[FANS ZONES — Si applicable]

[LIEN VERS GUIDE VOYAGE COMPLET]
```

### Mobile spécifique
- Guide pratique en sections accordéon
- Carte cliquable

---

## 2.11 Page Guide

### Structure actuelle
1. Titre + intro
2. Sections avec H2 et contenu texte
3. Guides liés en sidebar/footer
4. Bookmakers mentionnés

### Problèmes UX identifiés
- ❌ Pas de sommaire/table des matières cliquable
- ❌ Pas de date de mise à jour
- ❌ Pas d'auteur identifié
- ❌ Pas de screenshots/images
- ❌ Pas de tableaux comparatifs visuels (tout est texte)
- ❌ Pas de FAQ inline
- ❌ Pas de temps de lecture estimé
- ❌ Accents manquants dans le contenu

### Recommandation de redesign

```
[BREADCRUMB]
[H1 — Titre du guide]
[META — Auteur avec photo + date mise à jour + temps de lecture + catégorie]

[TABLE DES MATIÈRES — Sommaire cliquable avec ancres]

[INTRO — 150 mots d'accroche + aperçu du contenu]

[CONTENU PRINCIPAL]
  — H2/H3 bien structurés
  — Tableaux comparatifs visuels (pas juste du texte)
  — Screenshots annotés
  — Encarts "Conseil de Max" / "Bon à savoir"
  — CTAs bookmaker contextuels intégrés dans le texte
  — Exemples concrets avec montants

[FAQ INLINE — 5-10 questions spécifiques au guide]

[GUIDES LIÉS — 3-4 cards "À lire aussi"]

[CTA FINAL — "Prêt à parier ? Inscrivez-vous chez [Bookmaker]"]
```

### Mobile spécifique
- Table des matières sticky en haut (hamburger ou dropdown)
- Images responsive avec lazy loading
- Tableaux en scroll horizontal
- CTAs en full-width

---

## 2.12 Page Bookmaker

### Structure actuelle
1. Nom, logo, note globale
2. Rating détaillé (6 critères avec barres)
3. Pros/Cons
4. Sections de contenu
5. Infos pratiques, moyens de paiement

### Problèmes UX identifiés
- ❌ Pas de screenshots de l'interface/app
- ❌ Pas de tutoriel d'inscription
- ❌ Pas d'exemple concret de pari CDM
- ❌ CTA "S'inscrire" pas assez proéminent

### Recommandation de redesign

```
[HERO — Logo, nom, note /5, badge "Agréé ANJ", CTA "S'inscrire"]

[BONUS — En gros : "150€ offerts" avec conditions résumées]

[RATING DÉTAILLÉ — 6 barres avec notes]

[PROS / CONS — 2 colonnes colorées]

[SCREENSHOTS — 3-4 captures (app, interface paris, live)]

[TUTORIEL INSCRIPTION — 5 étapes illustrées]

[EXEMPLE DE PARI CDM — "Parier sur France vs Sénégal chez [Bookmaker]"]

[COMPARAISON DES COTES — Ce bookmaker vs la moyenne du marché]

[INFOS PRATIQUES — Paiement, retrait, service client]

[AVIS UTILISATEURS — (si disponibles)]

[FAQ — 5-8 questions "Comment s'inscrire ?", "Combien de temps pour retirer ?"]

[CTA FINAL — "Profitez de [bonus] dès maintenant"]
```

### Mobile spécifique
- CTA inscription sticky en haut
- Screenshots en carousel
- Tutoriel en stepper vertical

---

## 2.13 Page H2H (Head-to-Head)

### Structure actuelle
1. 2 équipes face-à-face
2. Historique des confrontations
3. Stats comparées

### Problèmes UX identifiés
- ❌ **Pages quasi orphelines** — 1128 pages avec très peu de liens entrants
- ❌ Contenu très maigre (~200 mots)
- ❌ Pas de pronostic
- ❌ Pas de lien vers le match CDM si programmé

### Recommandation de redesign

```
[HERO — Équipe A 🏳️ vs Équipe B 🏳️]

[SI MATCH CDM → Encart proéminent "Ces 2 équipes se rencontrent le [date] → Voir le pronostic"]

[BILAN H2H — Victoires A / Nuls / Victoires B — Graphique]

[DERNIÈRES CONFRONTATIONS — 5-10 derniers matchs avec score, date, compétition]

[STATS COMPARÉES — FIFA ranking, ELO, buts marqués, buts encaissés]

[ANALYSE — 100-200 mots de contexte rédactionnel]

[LIENS — Lien /equipe/a/, /equipe/b/, /pronostic-match/ si applicable]
```

**Stratégie de désorphelinisation** :
- Ajouter des liens H2H sur chaque page match (adversaires du match)
- Ajouter des liens H2H sur chaque page équipe (adversaires de groupe)
- Ajouter un hub /h2h/ qui liste les confrontations les plus recherchées
- Maillage interne dans les articles (ex : "dans l'historique des France vs Sénégal...")

### Mobile spécifique
- Graphique bilan en donuts compact
- Confrontations en liste verticale compacte

---

## 2.14 Page FAQ

### Structure actuelle
1. Catégories (Tournoi, Paris, Pronostics, Équipes)
2. Questions/réponses accordéon
3. FAQPage schema

### Problèmes UX identifiés
- ✅ Bien structurée et fonctionnelle
- ❌ Seulement ~16 questions → objectif 50+
- ❌ Pas de barre de recherche dans la FAQ
- ❌ Pas de lien contextuel vers les pages pertinentes dans les réponses

### Recommandation de redesign
- Ajouter 30+ questions supplémentaires
- Ajouter des liens internes dans chaque réponse
- Ajouter une barre de recherche/filtre
- Disperser les FAQ inline sur les pages thématiques (pas tout centraliser)

### Mobile spécifique
- Accordéon compact, 1 catégorie ouverte à la fois

---

## 2.15 Page Contact

### Structure actuelle
- Email, à propos, liens utiles

### Problèmes UX identifiés
- ❌ Pas de formulaire de contact
- ❌ Pas de temps de réponse estimé
- ❌ Très basique

### Recommandation
- Ajouter formulaire de contact (Formspree ou similaire)
- Ajouter FAQ rapide en haut ("Avant de nous contacter, peut-être que...")
- Ajouter liens réseaux sociaux

---

## 2.16 Page Calendrier

### Structure actuelle
- Liste chronologique des 104 matchs

### Problèmes UX identifiés
- ❌ Pas de filtre par équipe / groupe / stade
- ❌ Pas de toggle heure locale vs UTC
- ❌ Pas de téléchargement ICS/PDF
- ❌ Pas de cotes à côté des matchs

### Recommandation de redesign

```
[H1 — Calendrier complet CDM 2026]

[FILTRES — Par groupe | Par équipe | Par stade | Par date]

[TOGGLE — Heure française | Heure locale du match | UTC]

[LISTE DES MATCHS — Cards par jour]
  — Date
  — Matchs du jour : Équipe A vs Équipe B | Heure | Stade | Cote 1N2 mini
  — Lien vers chaque match

[TÉLÉCHARGER — Bouton "Ajouter à mon calendrier (ICS)" + "Télécharger PDF"]

[PHASES — Tabs : Groupes | R32 | R16 | QF | SF | Finale]
```

### Mobile spécifique
- Filtres en dropdown compact
- Matchs en cards full-width
- "Ajouter à mon calendrier" très visible

---

## 2.17 Page Matchs du Jour

### Structure actuelle
- ISR 300s, affiche les matchs du jour

### Problèmes UX identifiés
- ❌ Pas de cotes à côté des matchs
- ❌ Pas de mini-pronostic par match
- ❌ Pas de météo
- ❌ Pas de CTA bookmaker
- ❌ Hors tournoi : page vide → besoin d'un état "pas de matchs aujourd'hui"

### Recommandation de redesign

```
[H1 — Matchs du jour — CDM 2026 | [Date]]

[SI PAS DE MATCHS → "Pas de match aujourd'hui. Prochain match : [Équipe A vs B] dans X jours"]

[POUR CHAQUE MATCH]
  [CARD MATCH]
    — Équipe A vs Équipe B
    — Heure (heure française)
    — Stade + ville
    — Cotes 1N2 des meilleurs bookmakers
    — Mini-pronostic : "Victoire France probable (72%)"
    — Météo : "28°C, ensoleillé"
    — CTA : "Voir le pronostic complet" | "Parier chez Betclic"
  [/CARD]

[RÉSUMÉ DU JOUR — "3 matchs, 2 favoris, 1 surprise potentielle"]

[MATCHS DE DEMAIN — Preview rapide]

[CTA BOOKMAKER — "Profitez des offres du jour"]
```

### Mobile spécifique
- Cards matchs full-width
- CTA bookmaker sticky
- Notifications push si autorisées ("Le match commence dans 1h !")

---

## 2.18 Pages Groupe (×12)

### Structure actuelle
1. Nom du groupe (Groupe A)
2. Classement du groupe
3. Matchs du groupe (3 journées)
4. Descriptions des équipes

### Problèmes UX identifiés
- ❌ Pas de pronostic de classement
- ❌ Pas d'analyse du groupe (difficulté, favori, outsider)
- ❌ Pas de cotes de qualification
- ❌ Contenu trop court pour ranker sur "groupe [X] coupe du monde 2026"

### Recommandation de redesign

```
[H1 — Groupe [X] — Coupe du Monde 2026]

[CLASSEMENT PRÉDIT — Avec probabilité de qualification par équipe]

[ANALYSE DU GROUPE — 200-300 mots : "Le groupe X est considéré comme... Le favori est... L'outsider pourrait..."]

[CLASSEMENT ACTUEL — Tableau officiel (pendant le tournoi)]

[MATCHS — Journée 1, 2, 3 avec scores/cotes]

[ÉQUIPES DU GROUPE — 4 cards avec description + lien]

[PRONOSTIC — "Notre pronostic : [Équipe A] et [Équipe B] se qualifient"]

[COTES DE QUALIFICATION — Tableau des cotes par bookmaker]

[FAQ — "Qui est favori du groupe X ?", "Comment fonctionne la qualification ?"]
```

### Mobile spécifique
- Classement prédit en barres horizontales compactes
- Matchs par journée en accordéon

---

## Synthèse des priorités UX

| Page | Urgence | Impact | Action principale |
|------|---------|--------|-------------------|
| Homepage | 🔴 Critique | Très élevé | Ajouter countdown, matchs à venir, CTA bookmaker, pronostic vedette |
| Guides | 🔴 Critique | Élevé | Réécriture complète 5000-8000 mots, sommaire, screenshots, FAQ |
| Pronostic-match | 🟡 Haute | Élevé | Ajouter exemples de mises, paris recommandés contextualisés, FAQ |
| Joueur | 🟡 Haute | Moyen | Enrichir biographie, stats saison, parcours CDM |
| Stade | 🟡 Haute | Moyen | Images, schema, infos pratiques, carte |
| Ville | 🟡 Haute | Moyen | Guide touristique complet |
| H2H | 🟠 Moyenne | Moyen | Désorpheliniser, enrichir contenu, lier aux matchs CDM |
| Calendrier | 🟠 Moyenne | Moyen | Filtres, toggle horaire, téléchargement ICS |
| Bracket | 🟠 Moyenne | Moyen | Contenu textuel SEO, lien simulateur |
| Groupe | 🟠 Moyenne | Moyen | Analyse rédactionnelle, pronostic qualification |
| Bookmaker | 🟠 Moyenne | Élevé (monétisation) | Screenshots, tutoriel inscription, exemples paris CDM |
| Homepage mobile | 🔴 Critique | Très élevé | CTA sticky, carousel matchs, groupes en accordéon |

---

*Document de référence créé le 18 février 2026 par Max (IA). À mettre à jour mensuellement jusqu'au tournoi.*
