# La 9ème Ombre [L9O] — Site Web Officiel

Site de présentation complet pour le clan compétitif **La 9ème Ombre [L9O]** sur **Hell Let Loose**.

> Design immersif inspiré de la Seconde Guerre mondiale — sombre, tactique, militaire.

---

## 🖥️ Aperçu

| Page | Route | Description |
|---|---|---|
| **Accueil** | `/` | Hero banner + Philosophie du clan + Navigation rapide |
| **Effectif** | `/roster` | Grille des joueurs organisée par rôle HLL |
| **Palmarès** | `/matches` | Tableau des résultats officiels |
| **Recrutement** | `/recrutement` | Critères + CTA Discord |

**Bilingue** : FR 🇫🇷 / EN 🇬🇧 (switch dans la Navbar)

---

## ⚙️ Stack Technique

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **TypeScript**
- **Google Fonts** : Bebas Neue + Inter

---

## 🚀 Lancer le projet en local

### Prérequis

- [Node.js](https://nodejs.org/) v18+ installé
- [npm](https://www.npmjs.com/) v8+

### Installation

```bash
# 1. Cloner ou accéder au répertoire du projet
cd hll-clan-website

# 2. Installer les dépendances (si pas déjà fait)
npm install

# 3. Démarrer le serveur de développement
npm run dev
```

### Accéder au site

Ouvre ton navigateur et va sur :

```
http://localhost:3000
```

---

## 🔧 Configuration

### Ajouter ton lien Discord

Cherche et remplace toutes les occurrences de `LIEN_DISCORD_ICI` dans le projet :

```bash
# Trouver tous les fichiers à modifier
grep -r "LIEN_DISCORD_ICI" src/
```

Les fichiers concernés sont :
- `src/components/layout/Navbar.tsx` (×2)
- `src/components/layout/Footer.tsx`
- `src/components/home/HeroBanner.tsx`
- `src/components/recruitment/RecruitmentSection.tsx`

Remplace simplement `LIEN_DISCORD_ICI` par ton lien Discord, ex : `https://discord.gg/XXXXXXX`

---

## 📁 Structure du Projet

```
hll-clan-website/
├── public/
│   └── images/
│       └── hero-bg.png          ← Image de fond du Hero
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← Layout racine (fonts, metadata)
│   │   ├── page.tsx             ← Page d'Accueil
│   │   ├── globals.css          ← Styles globaux
│   │   ├── roster/page.tsx      ← Page Effectif
│   │   ├── matches/page.tsx     ← Page Palmarès
│   │   └── recrutement/page.tsx ← Page Recrutement
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── ClientLayout.tsx ← Contexte langue (FR/EN)
│   │   │   ├── Navbar.tsx       ← Navigation sticky + mobile menu
│   │   │   └── Footer.tsx       ← Footer avec liens + Discord
│   │   ├── home/
│   │   │   ├── HeroBanner.tsx   ← Section Hero
│   │   │   └── PhilosophySection.tsx ← 3 piliers
│   │   ├── roster/
│   │   │   ├── PlayerCard.tsx   ← Carte joueur
│   │   │   └── RosterSection.tsx ← Grille par rôle
│   │   ├── matches/
│   │   │   └── MatchTable.tsx   ← Tableau des matchs
│   │   └── recruitment/
│   │       └── RecruitmentSection.tsx ← Critères + CTA
│   │
│   └── data/
│       ├── players.ts           ← Données des joueurs
│       ├── matches.ts           ← Données des matchs
│       └── translations.ts      ← Textes FR/EN
│
├── tailwind.config.ts           ← Design system L9O
├── next.config.ts               ← Config Next.js
└── README.md                    ← Ce fichier
```

---

## ✏️ Personnalisation

### Modifier les joueurs

Edite le fichier `src/data/players.ts` :

```typescript
{
  id: 1,
  pseudo: "TonPseudo",
  role: "infantry",         // commander | squadLeader | infantry | armor | recon
  grade: "Soldat",          // Fondateur | Officier | Sous-Officier | Soldat | Recrue
  specialty: "Medic",
  games: 150,
  winRate: 65,
  kd: 1.4,
}
```

### Modifier les résultats

Edite `src/data/matches.ts` pour ajouter des matchs :

```typescript
{
  id: 9,
  date: "2026-05-01",
  opponent: "Nom Équipe Adverse",
  map: "Foy",
  scoreL9O: 5,
  scoreOpponent: 3,
  result: "win",            // "win" | "loss" | "draw"
  competition: "Ligue FR #13",
}
```

### Changer les textes bilingues

Edite `src/data/translations.ts` pour modifier n'importe quel texte du site en FR et EN.

---

## 🏗️ Build de production

```bash
# Générer le build optimisé
npm run build

# Démarrer en mode production
npm run start
```

---

## 📄 Licence

Projet propriétaire — **La 9ème Ombre [L9O]**. Tous droits réservés.
