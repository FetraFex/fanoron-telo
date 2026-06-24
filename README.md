# Fanoron-telo Arena | ISPM

## Section 1 : En-tête Institutionnel et Identification

- Institut : [ISPM](https://www.ispm-edu.com)
- Nom du groupe de projet : **NooAI**

| Nom Complet | Numéro d'étudiant | Classe | Rôle précis pour ce Hackathon |
| :---------- | :---------------: | :----: | :--------------------------- |
| ANDRIAMAHEFA Ny Fetra Phanoël | 16 | IGGLIA 4 | Lead développeur et designer d’expérience : architecte de l’interface, responsable du code principal et pilote de l’intégration visuelle. |
| ANDRIANTSOA Velotiana Todisoa Angelo | 22 | IGGLIA 4 | Designer UI/UX senior : amélioration du parcours utilisateur, prototypes d’interaction et cohérence graphique sur mobile/desktop. |
| NOMESAHANINA Aiky | 35 | IGGLIA 4 | Ingénieur moteur de jeu : responsable de la logique de placement, des règles de déplacement et de l’analyse des coups légaux. |
| RAKOTOARISOA Fanaja Manoa Ny Avo | 32 | IGGLIA 4 | Expert tests et intégration : validation des règles, couverture des cas limites, coordination des flux de jeu et fiabilité. |
| ANDRIANARAHINJAKA Yohannee Aintsoa | 54 | IGGLIA 4 | Responsable UI/IA : optimisation de l’interface utilisateur, ajustement des retours visuels et supervision de l’IA en jeu. |
| RASOAMAHAZOMANANA Tsitoniaina Rogella | 15 | IGGLIA 4 | Lead IA : implémentation Minimax, stratégies de difficulté et tutorat IA pour l’équipe. |
| LAPORTE Hantaharimanana Marie Fabia | 53 | IGGLIA 4 | Spécialiste UI et tests : polish visuel, accessibilité et vérification de la robustesse des interactions. |

---

## Section 2 : Description du Travail Réalisé

`Fanoron-telo Arena` est une application web qui reproduit le jeu traditionnel malgache Fanoron-telo sur un plateau 3x3.
Dans le délai, nous avons implémenté :

- un plateau interactif et une interface utilisateur responsive ;
- trois modes de jeu : PVP, PVAI, IA vs IA ;
- un moteur de règles séparé pour le placement, le déplacement et la détection de victoire ;
- une IA configurable avec plusieurs niveaux de difficulté ;
- un historique des coups et une fonction d'annulation du dernier coup.

### Architecture

- Application frontend en React 18 + TypeScript.
- Build et serveur de développement avec Vite.
- Styles avec TailwindCSS.
- Organisation modulaire : `src/ai`, `src/components`, `src/services`, `src/models`, `src/utils`, `src/hooks`.
- Règles de jeu centralisées dans `src/services/gameRules.ts`.
- Algorithme IA dans `src/ai/minimax.ts` et `src/ai/evaluation.ts`.

### Stack technologique

- React 18
- TypeScript 5
- Vite
- TailwindCSS
- ESLint

### Hébergement
 
Version hébergée : https://fanoron-telo-jade.vercel.app/

---

## Section 3 : Guide d'Installation Rapide (3 Commandes Max)

```bash
git clone https://github.com/FetraFex/fanoron-telo.git
cd fanoron-telo
npm install
npm run dev
```

---

## Section 4 : Outils d'Aide IA Utilisés

Nous avons utilisé des assistants IA pour accélérer le développement et vérifier la logique métier.

- GitHub Copilot pour générer les composants React, les hooks et la structure des pages.
- ChatGPT pour expliquer le fonctionnement du minimax, produire des exemples d’évaluation heuristique et détecter des cas limites.
- Outils IA pour aider au débogage, à l’écriture d’algorithmes et à l’optimisation de code.

Exemples d’utilisation :

- écriture rapide de l’algorithme Minimax et de la boucle de recherche ;
- création de tests de vérification des coups légaux ;
- amélioration du CSS et de l’UX de l’interface de jeu.

---

## Section 5 : Modélisation et Algorithmes de l'IA du Jeu

### Représentation de l’état du plateau

- Le plateau est représenté comme un tableau 1D de 9 cases (`CellValue[]`) dans `src/models/board.ts`.
- Les positions gagnantes (`WIN_LINES`) et la matrice d’adjacence (`ADJACENCY`) sont définies dans `src/models/board.ts`.
- Les lignes gagnantes couvrent 3 lignes horizontales, 3 colonnes et 2 diagonales.
- `ADJACENCY` décrit les cases vers lesquelles chaque position peut se déplacer en phase de mouvement.
- Les constantes du plateau sont utilisées directement par `src/services/gameRules.ts` et par l’évaluation IA.

### Fonctionnement du Minimax

- L’IA est implémentée dans `src/ai/minimax.ts`.
- `pickBestMove()` explore l’arbre des coups légaux à partir du snapshot courant.
- La recherche est portée par `minimaxCore()` :
  - cas terminal : victoire, match nul ou profondeur 0 ;
  - exploration récursive des coups légaux obtenus via `getLegalMoves()` dans `src/services/gameRules.ts` ;
  - score maximum pour l’IA quand elle joue, score minimum pour l’adversaire.
- Les options de recherche sont paramétrées avec :
  - `maxDepth` : profondeur de recherche ;
  - `useAlphaBeta` : activation de l’élagage alpha-beta ;
  - `timeLimitMs` : budget temps en millisecondes pour la recherche.

### Fonction d’évaluation

- L’évaluation est centralisée dans `src/ai/evaluation.ts`.
- Si l’état est terminal, la fonction renvoie :
  - `+1000` pour une victoire de l’IA ;
  - `-1000` pour une défaite ;
  - `0` pour un match nul.
- Pour les positions non terminales :
  - `lineScore()` dans `src/utils/gameHelpers.ts` calcule une heuristique sur chaque ligne gagnante possible ;
  - la mobilité est mesurée par le nombre de coups légaux disponibles pour l’IA et l’adversaire via `getLegalMoves()` ;
  - en phase de mouvement, la différence de mobilité est pondérée plus fortement.
- `lineScore()` favorise les lignes proches du gain et pénalise celles contrôlées par l’adversaire.

### Techniques avancées utilisées

- Table de transposition légère :
  - `transposition` est une `Map<string, CacheEntry>` dans `src/ai/minimax.ts` qui mémorise les scores déjà évalués.
  - Les clés sont générées par `serializeSnapshot()` dans `src/services/gameRules.ts`, ce qui évite de recalculer les états déjà vus.
- Iterative deepening :
  - activé pour les recherches avec alpha-beta.
  - le moteur relance la recherche de profondeur 1 à `maxDepth`, en conservant le meilleur coup trouvé à chaque itération.
- Budget temps en mode difficile :
  - `pickHardMove()` dans `src/ai/bots.ts` fixe `timeLimitMs: 450` ms.
- Pas de bitboards ni d’ouverture prédéfinie dans cette version.
- Pas de machine learning explicite : aucun apprentissage par renforcement ou classification n’est intégré.

---

## Section 6 : Analyses de Performances

### Temps de réponse de l’IA

- Mode `easy` : réponse instantanée car l’IA choisit un coup aléatoire parmi les coups légaux.
- Mode `medium` : recherche Minimax jusqu’à profondeur 3 sans alpha-beta.
  - Mesure réelle : environ **2,45 ms** par coup en moyenne sur un état de plateau initial.
- Mode `hard` : recherche jusqu’à profondeur 7 avec alpha-beta et limite de temps de 450 ms.
  - Mesure réelle : environ **26,87 ms** par coup en moyenne sur un état de plateau initial.
- Le code limite explicitement la recherche à 450 ms pour éviter des blocages d’interface en mode difficile.

### Mesure des valeurs

- Les temps ont été mesurés avec un script local en Node.js (`measure-ia.cjs`).
- Le script reconstitue le moteur Minimax à partir des mêmes règles et heuristiques que `src/ai/minimax.ts`, `src/ai/evaluation.ts` et `src/services/gameRules.ts`.
- Les moyennes proviennent d’une trentaine d’itérations pour limiter la variance due aux fluctuations du système.
- La mesure est faite côté terminal pour obtenir une estimation réaliste du coût de recherche avant rendu UI.

### Statistiques d’IA vs IA

- L’application propose un mode `AIVSAI` et enregistre les résultats globaux dans `src/services/statsService.ts`.
- Les statistiques stockées sont : parties jouées, victoires X, victoires O, nuls.
- Tests réalisés : `medium vs hard`, `hard vs hard`, `medium vs medium`, `hard vs medium`.
- Résultat observé : dans ces tests, **le joueur qui joue en premier remporte systématiquement la partie**.
- Cela indique un avantage important de l’ouverture dans le moteur actuel et suggère que les valeurs heuristiques du début de partie sont déterminantes.
- Il n’existe pas de tableau de bord dédié aux statistiques IA vs IA par difficulté dans la version actuelle.

### Observations

- Les tests IA vs IA montrent que l’avantage du premier coup est très fort dans le moteur actuel.
- L’IA difficile est plus coûteuse que l’IA moyenne, mais le budget de 450 ms permet un bon compromis entre qualité et réactivité.
- Le constat que le joueur qui commence gagne toujours indique une faiblesse dans l’équilibre du début de partie ou dans la fonction d’évaluation heuristique.
- Il est probable que les différences de profondeur (`medium` vs `hard`) soient masquées par cet avantage d’ouverture.
- Pour un benchmark plus précis, il serait utile d’ajouter une instrumentation dédiée aux temps de recherche, aux coups joués et aux résultats par niveau.

