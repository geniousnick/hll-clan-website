// Player roster data for La 9ème Ombre [L9O]
//
// Pour lier un joueur à son profil hllrecords.com :
// 1. Cherche le pseudo sur https://hllrecords.com
// 2. Clique sur le profil → copie l'ID dans l'URL (ex: /profiles/30a2eded...)
// 3. Colle cet ID dans le champ hllRecordsId ci-dessous
//
// Les IDs peuvent être un hash Team17 (console) ou un SteamID64 (PC, 17 chiffres)

export type PlayerRole =
  | "commander"
  | "squadLeader"
  | "infantry"
  | "armor"
  | "recon";

export type PlayerGrade =
  | "Fondateur"
  | "Officier"
  | "Sous-Officier"
  | "Soldat"
  | "Recrue";

export interface Player {
  id: number;
  pseudo: string;
  role: PlayerRole;
  grade: PlayerGrade;
  specialty?: string;
  // ↓ ID hllrecords.com (hash Team17 ou SteamID64). null = stats manuelles uniquement.
  hllRecordsId?: string | null;
  // Stats manuelles — utilisées en fallback si hllRecordsId est null ou si le fetch échoue
  games?: number;
  winRate?: number;
  kd?: number;
}

export const players: Player[] = [
  // ── Commander ───────────────────────────────────────────────────────────
  {
    id: 1,
    pseudo: "ShadowActuel",
    role: "commander",
    grade: "Fondateur",
    specialty: "Commandant en Chef",
    hllRecordsId: null, // → Cherche "ShadowActuel" sur hllrecords.com et colle l'ID ici
    games: 312,
    winRate: 74,
    kd: 1.8,
  },

  // ── Squad Leaders ────────────────────────────────────────────────────────
  {
    id: 2,
    pseudo: "NightOwl_L9O",
    role: "squadLeader",
    grade: "Officier",
    specialty: "Chef d'Escouade Assaut",
    hllRecordsId: null,
    games: 241,
    winRate: 68,
    kd: 1.6,
  },
  {
    id: 3,
    pseudo: "IronGhost",
    role: "squadLeader",
    grade: "Officier",
    specialty: "Chef d'Escouade Soutien",
    hllRecordsId: null,
    games: 189,
    winRate: 65,
    kd: 1.4,
  },
  {
    id: 4,
    pseudo: "DarkEagle",
    role: "squadLeader",
    grade: "Sous-Officier",
    specialty: "Chef d'Escouade Blindés",
    hllRecordsId: null,
    games: 156,
    winRate: 62,
    kd: 2.1,
  },

  // ── Infanterie ───────────────────────────────────────────────────────────
  {
    id: 5,
    pseudo: "BreachKing",
    role: "infantry",
    grade: "Soldat",
    specialty: "Fusilier / Anti-Tank",
    hllRecordsId: null,
    games: 198,
    winRate: 61,
    kd: 1.5,
  },
  {
    id: 6,
    pseudo: "MudRunner",
    role: "infantry",
    grade: "Soldat",
    specialty: "Medic",
    hllRecordsId: null,
    games: 167,
    winRate: 63,
    kd: 0.9,
  },
  {
    id: 7,
    pseudo: "TrenchFox",
    role: "infantry",
    grade: "Soldat",
    specialty: "Ingénieur",
    hllRecordsId: null,
    games: 145,
    winRate: 59,
    kd: 1.2,
  },
  {
    id: 8,
    pseudo: "CrimsonShade",
    role: "infantry",
    grade: "Sous-Officier",
    specialty: "Mitrailleur",
    hllRecordsId: null,
    games: 221,
    winRate: 66,
    kd: 1.7,
  },
  {
    id: 9,
    pseudo: "GrimReaper_L9",
    role: "infantry",
    grade: "Soldat",
    specialty: "Fusilier",
    hllRecordsId: null,
    games: 123,
    winRate: 57,
    kd: 1.3,
  },
  {
    id: 10,
    pseudo: "VoidWalker",
    role: "infantry",
    grade: "Recrue",
    specialty: "Medic",
    hllRecordsId: null,
    games: 45,
    winRate: 53,
    kd: 0.8,
  },

  // ── Blindés ──────────────────────────────────────────────────────────────
  {
    id: 11,
    pseudo: "SteelDrake",
    role: "armor",
    grade: "Sous-Officier",
    specialty: "Commandant de Char",
    hllRecordsId: null,
    games: 178,
    winRate: 64,
    kd: 3.2,
  },
  {
    id: 12,
    pseudo: "IronHull",
    role: "armor",
    grade: "Soldat",
    specialty: "Pilote",
    hllRecordsId: null,
    games: 134,
    winRate: 60,
    kd: 2.8,
  },

  // ── Reconnaissance ───────────────────────────────────────────────────────
  {
    id: 13,
    pseudo: "PhantomEye",
    role: "recon",
    grade: "Sous-Officier",
    specialty: "Sniper",
    hllRecordsId: null,
    games: 267,
    winRate: 70,
    kd: 2.6,
  },
  {
    id: 14,
    pseudo: "SilentSight",
    role: "recon",
    grade: "Soldat",
    specialty: "Observateur",
    hllRecordsId: null,
    games: 189,
    winRate: 65,
    kd: 2.3,
  },
];

export const roleOrder: PlayerRole[] = [
  "commander",
  "squadLeader",
  "infantry",
  "armor",
  "recon",
];
