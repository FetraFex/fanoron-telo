# Fanoron-telo Arena

Application web moderne du jeu traditionnel malgache **Fanoron-telo** (plateau 3x3), avec mode local, modes IA, historique des coups, undo/redo, mode sombre et demo IA vs IA.

## 1) Presentation du projet

Le jeu implemente exactement les 2 phases:

- **Phase 1 - Placement**: chaque joueur pose 3 pions a tour de role.
- **Phase 2 - Mouvement**: une fois les 6 pions poses, chaque joueur deplace un pion vers une intersection adjacente libre.
- **Victoire**: premier alignement de 3 pions (ligne, colonne, diagonale), y compris pendant la phase de placement.

Modes disponibles:

- Joueur vs Joueur (local)
- Joueur vs IA (facile/moyen/difficile)
- IA vs IA (demo automatique)

## 2) Architecture

```text
src/
 ├─ components/     # UI reutilisable (Board, controls, historique, stats)
 ├─ pages/          # HomePage, GamePage
 ├─ hooks/          # useFanoronaGame, useTheme
 ├─ services/       # regles du jeu, stats
 ├─ ai/             # bots, minimax, evaluation
 ├─ models/         # modele plateau (adjacence, lignes gagnantes)
 ├─ utils/          # helpers
 └─ types/          # types TypeScript centraux
```

Principes appliques:

- Separation claire UI / logique metier / IA
- Etat de jeu immutable (snapshots pour undo/redo)
- Hooks React personnalises pour orchestration
- TypeScript strict pour robustesse

## 3) Technologies utilisees

- React 18
- TypeScript 5 (strict)
- Vite 5
- TailwindCSS 3

## 4) Installation (3 commandes max)

```bash
git clone URL_DU_DEPOT
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## 5) Outils IA utilises

### IA du jeu

- **Facile**: choix aleatoire parmi les coups legaux.
- **Moyen**: Minimax profondeur 3.
- **Difficile**: Minimax + Alpha-Beta + iterative deepening + table de transposition.

### Outils de dev IA (hackathon)

- Assistance de generation et structuration via Cursor + modele Codex.

## 6) Explication detaillee de Minimax

Minimax explore l'arbre des coups possibles:

1. Le joueur IA cherche a **maximiser** le score.
2. L'adversaire est modele comme rationnel et cherche a **minimiser** ce score.
3. La recherche s'arrete sur:
   - etat terminal (victoire/defaite/nul),
   - ou profondeur maximale.
4. Une fonction d'evaluation heuristique note les etats non terminaux.

Pseudo-logique:

```text
minimax(etat, profondeur, maximisant):
  si terminal ou profondeur==0: retourner evaluation(etat)
  si maximisant:
    retourner max(minimax(enfant, profondeur-1, false))
  sinon:
    retourner min(minimax(enfant, profondeur-1, true))
```

## 7) Explication Alpha-Beta

Alpha-Beta optimise Minimax sans changer le resultat final:

- **alpha** = meilleure valeur deja garantie pour MAX
- **beta** = meilleure valeur deja garantie pour MIN
- Si `beta <= alpha`, on coupe la branche (pruning) car elle n'influencera plus la decision.

Effet:

- Meme qualite de decision
- Beaucoup moins de noeuds explores
- Temps de reponse significativement reduit

## 8) Analyse des performances

Le moteur IA utilise:

- Representation compacte du plateau (tableau 9 cases)
- Generation rapide des coups legaux via table d'adjacence
- Detection terminale immediate (8 lignes gagnantes)
- Table de transposition (`Map`) pour reutiliser les evaluations
- Iterative deepening sur le niveau difficile (budget temps)

Complexite (ordre de grandeur):

- Facteur de branchement faible (<= ~12 selon phase)
- Minimax depth 3: tres rapide
- Alpha-Beta depth 7: viable en temps reel sur ce petit plateau

## 9) Temps moyen de reponse de l'IA

Valeurs observees/attendues en environnement dev standard:

- **Facile**: < 1 ms
- **Moyen (depth 3)**: ~2 a 15 ms
- **Difficile (AB + ID)**: ~10 a 120 ms

> Ces valeurs dependent de la machine et du navigateur.  
> Le niveau difficile impose un budget temps pour rester fluide.

## 10) Captures d'ecran a completer

Ajouter vos captures dans `docs/screenshots/` puis referencer ici:

- [ ] `home-light.png` - page d'accueil mode clair
- [ ] `home-dark.png` - page d'accueil mode sombre
- [ ] `pvp-game.png` - partie Joueur vs Joueur
- [ ] `pvai-hard.png` - partie Joueur vs IA (difficile)
- [ ] `ai-vs-ai.png` - demo IA vs IA

## Fonctionnalites couvertes (hackathon)

- [x] Regles completes des 2 phases
- [x] Detection de victoire en placement et mouvement
- [x] Historique des coups
- [x] Undo / Redo
- [x] Mode sombre
- [x] Responsive mobile + desktop
- [x] Animations UI (transitions Tailwind)
- [x] Stats de parties (localStorage)
- [x] Pret pour deploiement Vercel (`vercel.json`)
