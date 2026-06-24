# 🤖 Projet Fanoron-telo Arena | ISPM

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=00b4d8&height=200&section=header&text=Fanoron-telo%20Arena&fontSize=50&animation=fadeIn&fontAlignY=38" alt="Header Banner">
</p>

<p align="center">
  <a href="https://github.com/FetraFex/fanoron-telo">
    <img src="https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

## 👥 Présentation de l'Équipe

|                                                 Photo                                                  | Informations Personnelles                 |  Classe  | N°  |
| :----------------------------------------------------------------------------------------------------: | :---------------------------------------- | :------: | :-: |
| <img src="https://avatars.githubusercontent.com/u/106149835?v=4" width="50" style="border-radius:50%"> | **RASOAMAHAZOMANANA** Tsitoniaina Rogella | IGGLIA 4 | 15  |
| <img src="https://avatars.githubusercontent.com/u/171586866?v=4" width="50" style="border-radius:50%"> | **ANDRIAMAHEFA** Ny Fetra Phanoël         | IGGLIA 4 | 16  |
| <img src="https://avatars.githubusercontent.com/u/144239227?v=4" width="50" style="border-radius:50%"> | **ANDRIANTSOA** Velotiana Todisoa Angelo  | IGGLIA 4 | 22  |
| <img src="https://avatars.githubusercontent.com/u/110011721?v=4" width="50" style="border-radius:50%"> | **RAKOTOARISOA** Fanaja Manoa Ny Avo      | IGGLIA 4 | 32  |
| <img src="https://avatars.githubusercontent.com/u/117814535?v=4" width="50" style="border-radius:50%"> | **NOMESAHANINA** Aiky                     | IGGLIA 4 | 35  |
| <img src="https://avatars.githubusercontent.com/u/160345626?v=4" width="50" style="border-radius:50%"> | **ANDRIANARAHINJAKA** Yohannee Aintsoa    | IGGLIA 4 | 53  |
| <img src="https://avatars.githubusercontent.com/u/165788737?v=4" width="50" style="border-radius:50%"> | **ANDRIANARAHINJAKA** Yohannee Aintsoa    | IGGLIA 4 | 54  |

---

## Description du Projet

`Fanoron-telo Arena` est une application web moderne inspirée du jeu traditionnel malgache **Fanoron-telo** (plateau 3x3).  
Le projet propose une expérience complète avec interface immersive, logique de jeu stricte et intelligence artificielle multi-niveaux.

### Objectif du jeu implémenté

- **Phase 1 - Placement** : chaque joueur pose ses 3 pions tour à tour.
- **Phase 2 - Mouvement** : lorsque les 6 pions sont posés, chaque joueur déplace un pion vers une case adjacente libre.
- **Condition de victoire** : aligner 3 pions (ligne, colonne ou diagonale), y compris durant la phase de placement.
- **Match nul** : en phase de mouvement, si le joueur courant n'a aucun coup légal.

---

## Modes de Jeu Disponibles

- **Joueur vs Joueur (PVP)** : jeu local sur le même écran.
- **Joueur vs IA (PVAI)** : l'humain joue contre une IA configurable.
- **IA vs IA (Demo)** : visualisation automatique d'une partie entre deux IA.

---

## Fonctionnalités Actuelles

- Interface de menu stylisée avec sélection du mode de jeu.
- Sélection de difficulté (`easy`, `medium`, `hard`) pour les modes avec IA.
- Plateau interactif avec sélection des pièces et destinations légales.
- Historique des coups en temps réel (barre déroulante).
- Annulation du dernier coup (`Undo`) en partie.
- Moteur de règles séparé et typé (`TypeScript`) pour une logique fiable.
- Sauvegarde des statistiques de parties en `localStorage`.
- Déploiement prêt pour Vercel (`vercel.json`).

---

## Intelligence Artificielle

L'IA est implémentée avec trois comportements :

- **Facile** : choix aléatoire parmi les coups légaux.
- **Moyen** : Minimax profondeur 3.
- **Difficile** : Minimax + Alpha-Beta + Iterative Deepening + table de transposition (budget temps).

### Évaluation heuristique

Le moteur combine :

- évaluation des lignes gagnantes potentielles,
- mobilité des joueurs (nombre de coups légaux),
- score terminal fort en cas de victoire/défaite.

---

## Structure du Répertoire

```text
root/
├─ public/                 # Assets visuels (board, background, ui, audio)
├─ src/
│  ├─ ai/                  # Bots, minimax, evaluation
│  ├─ components/          # UI (menu, écran de jeu, sidebars, historique)
│  ├─ hooks/               # Hooks métier (useFanoronaGame, thème)
│  ├─ models/              # Modèle du plateau (adjacence, lignes gagnantes)
│  ├─ pages/               # Pages applicatives
│  ├─ services/            # Règles du jeu, stats
│  ├─ types/               # Types TypeScript centraux
│  └─ utils/               # Helpers
├─ vercel.json             # Configuration de déploiement
└─ README.md
```

---

## Stack Technique

- **Frontend** : React 18 + TypeScript 5
- **Build Tool** : Vite
- **Styles** : TailwindCSS
- **Qualité** : ESLint

---

## Installation et Lancement

```bash
git clone git@github.com:FetraFex/fanoron-telo.git
cd fanoron-telo
npm install
npm run dev
```

### Scripts utiles

```bash
npm run build   # Build production
npm run preview # Preview du build
npm run lint    # Vérification lint
```

---

## Améliorations Possibles

- Afficher les statistiques directement dans le menu principal.
- Ajouter un bouton `Redo` visible dans l'interface.
- Ajouter un mode en ligne (multijoueur distant).
- Compléter la section captures d'écran et démo vidéo.

---

<p align="right"><i>Dernière mise à jour : 24 juin 2026.</i></p>
