// Fichier des données des joueurs
//
// ─── COMMENT OBTENIR UN ID HLL RECORDS ? ─────────────────────────────────────
// 1. Va sur https://hllrecords.com/
// 2. Cherche le pseudo du joueur
// 3. Dans l'URL du profil, copie la longue suite de caractères (le hash)
//    Ex: https://hllrecords.com/profiles/30a2eded44779430855098b3880dd2da
//                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 4. Colle cet ID dans le champ hllRecordsId ci-dessous
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
  | "Leader"
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
  winRate?: number;
  kills?: number;
  highestKills?: number;
}

export const players: Player[] = [
  // ── Commandant ───────────────────────────────────────────────────────────
  {
    id: 1,
    pseudo: "Genious",
    role: "commander",
    grade: "Leader",
    specialty: "Commandant",
    hllRecordsId: "f53ee8524fb1cd8f4c7423fd364a78ce",
    winRate: 56,
    kills: 8538,
    highestKills: 63
  },

  // ── Squad Leaders ────────────────────────────────────────────────────────
  {
    id: 2,
    pseudo: "Jo2754",
    role: "squadLeader",
    grade: "Fondateur",
    specialty: "Squad Leader",
    hllRecordsId: "7a0b5acc7264432253ce1f5adf30fca4",
    winRate: 63,
    kills: 16329,
    highestKills: 106
  },
  {
    id: 3,
    pseudo: "JeanGab",
    role: "squadLeader",
    grade: "Officier",
    specialty: "Squad Leader",
    hllRecordsId: "281a78000b9297a0b024c201f27bef37",
    winRate: 80,
    kills: 39685,
    highestKills: 96
  },
  {
    id: 4,
    pseudo: "Airborne",
    role: "squadLeader",
    grade: "Officier",
    specialty: "Squad Leader",
    hllRecordsId: "49e28cd448ea61017379119d1ffd11f1",
    winRate: 57,
    kills: 48564,
    highestKills: 121
  },
  {
    id: 5,
    pseudo: "Floo21S-s",
    role: "squadLeader",
    grade: "Officier",
    specialty: "Squad Leader",
    hllRecordsId: "c60d0eda902919022364cc9a57d3aeb9",
    winRate: 61,
    kills: 10185,
    highestKills: 77
  },
  {
    id: 6,
    pseudo: "P4",
    role: "squadLeader",
    grade: "Officier",
    specialty: "Squad Leader",
    hllRecordsId: "5deda4b9249e6bacd98675c6f224aec6",
    winRate: 59,
    kills: 16123,
    highestKills: 50
  },
  {
    id: 7,
    pseudo: "BenJ",
    role: "squadLeader",
    grade: "Officier",
    specialty: "Squad Leader",
    hllRecordsId: "dc64caa55b60feb1dccdf5b4de29f162",
    winRate: 48,
    kills: 2526,
    highestKills: 51
  },
  {
    id: 8,
    pseudo: "Brasier",
    role: "squadLeader",
    grade: "Soldat",
    specialty: "Squad Leader",
    hllRecordsId: "37858fa832068ea4a3edd2f0b93a6b83",
    winRate: 60,
    kills: 4243,
    highestKills: 57
  },
  {
    id: 9,
    pseudo: ".il_genio_",
    role: "squadLeader",
    grade: "Soldat",
    specialty: "Squad Leader",
    hllRecordsId: "21d529aed73a463a2704b212c4f5a5de",
    winRate: 64,
    kills: 25036,
    highestKills: 80
  },
  {
    id: 10,
    pseudo: "K2",
    role: "squadLeader",
    grade: "Soldat",
    specialty: "Squad Leader",
    hllRecordsId: "d27cce69c7f551d128f1d0f283d94e8f",
    winRate: 51,
    kills: 4486,
    highestKills: 67
  },
  {
    id: 11,
    pseudo: "blackscar",
    role: "squadLeader",
    grade: "Soldat",
    specialty: "Squad Leader / Soldat d'attaque",
    hllRecordsId: "fbac944b9fb8e09a4b90e3f67fcd9e21",
    winRate: 67,
    kills: 42564,
    highestKills: 109
  },

  // ── Reconnaissance ───────────────────────────────────────────────────────
  {
    id: 12,
    pseudo: "Djiybz",
    role: "recon",
    grade: "Officier",
    specialty: "Tireur d'élite",
    hllRecordsId: "f43a995900ef82ae781f02139a076310",
    winRate: 67,
    kills: 26835,
    highestKills: 102
  },

  // ── Blindés ──────────────────────────────────────────────────────────────
  {
    id: 13,
    pseudo: "Angeleternel",
    role: "armor",
    grade: "Soldat",
    specialty: "Squad Leader Blindé",
    hllRecordsId: "4d286518b8ec5519e64e84d41a24edf5",
    winRate: 55,
    kills: 3640,
    highestKills: 39
  },
  {
    id: 14,
    pseudo: "FilykamiD",
    role: "armor",
    grade: "Soldat",
    specialty: "Squad Leader Blindé",
    hllRecordsId: "ae75e682179d0affb83899233b1c6bd5",
    winRate: 68,
    kills: 13299,
    highestKills: 150
  },
  {
    id: 15,
    pseudo: "Capote",
    role: "armor",
    grade: "Soldat",
    specialty: "Squad Leader Blindé",
    hllRecordsId: "9403f7ce6f0138c27162404536af5906",
    winRate: 68,
    kills: 8088,
    highestKills: 63
  },
  {
    id: 16,
    pseudo: "Ctrocool",
    role: "armor",
    grade: "Soldat",
    specialty: "Conducteur de char",
    hllRecordsId: "1dff510934c6f659106c8c49535093c8",
    winRate: 60,
    kills: 8544,
    highestKills: 60
  },
  {
    id: 17,
    pseudo: "SparTaN CrioS",
    role: "armor",
    grade: "Soldat",
    specialty: "Conducteur de char",
    hllRecordsId: "791d40d7f2cab78849695e69191e9249",
    winRate: 66,
    kills: 5832,
    highestKills: 77
  },
  {
    id: 18,
    pseudo: "BUMPY-971",
    role: "armor",
    grade: "Soldat",
    specialty: "Artilleur Principal",
    hllRecordsId: "1afea8a89b535f97dedf662e25a0dce3",
    winRate: 57,
    kills: 5259,
    highestKills: 152
  },
  {
    id: 19,
    pseudo: "El_Geonaldo FR",
    role: "armor",
    grade: "Soldat",
    specialty: "Tireur blindé",
    hllRecordsId: "bf708d9a7b60aeff3641f4729f7d55fc",
    winRate: 53,
    kills: 10700,
    highestKills: 108
  },
  {
    id: 20,
    pseudo: "Thierry Halmes",
    role: "armor",
    grade: "Soldat",
    specialty: "Équipier de char",
    hllRecordsId: "4dfa29adad372664a91064e2f3bad5c5",
    winRate: 76,
    kills: 1357,
    highestKills: 62
  },

  // ── Infanterie - Attaque ─────────────────────────────────────────────────
  {
    id: 21,
    pseudo: "Cactus",
    role: "infantry",
    grade: "Fondateur",
    specialty: "Soldat d'attaque",
    hllRecordsId: "9d7bc756fe509882cea58af0b7e97b36",
    winRate: 57,
    kills: 5589,
    highestKills: 94
  },
  {
    id: 22,
    pseudo: "Gwen",
    role: "infantry",
    grade: "Officier",
    specialty: "Soldat d'attaque",
    hllRecordsId: "0f8f3743e5831306ca9363d5ed27beb8",
    winRate: 48,
    kills: 7758,
    highestKills: 62
  },
  {
    id: 23,
    pseudo: "Beliik",
    role: "infantry",
    grade: "Officier",
    specialty: "Soldat d'attaque",
    hllRecordsId: "8fca9c3621395599a33532383cc98cfa",
    winRate: 71,
    kills: 14163,
    highestKills: 87
  },
  {
    id: 24,
    pseudo: "P'tit Nicolas",
    role: "infantry",
    grade: "Officier",
    specialty: "Soldat d'attaque",
    hllRecordsId: "9cca3f369aca015589e63863d46aade8",
    winRate: 55,
    kills: 11277,
    highestKills: 71
  },
  {
    id: 25,
    pseudo: "Spaxe_03",
    role: "infantry",
    grade: "Officier",
    specialty: "Soldat d'attaque",
    hllRecordsId: "9a6929d0c9d4fecd828dc05a51297283",
  },
  {
    id: 26,
    pseudo: "TOM",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat d'attaque",
    hllRecordsId: "3bcd957e4d69ee99e517fa472bce3f80",
    winRate: 43,
    kills: 4394,
    highestKills: 57
  },
  {
    id: 27,
    pseudo: "Ramuncho",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat d'attaque",
    hllRecordsId: "30a2eded44779430855098b3880dd2da",
    winRate: 52,
    kills: 5607,
    highestKills: 54
  },
  {
    id: 28,
    pseudo: "Bob",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat d'attaque",
    hllRecordsId: "27150f2c9e8976b9175ea98e86221a02",
    winRate: 69,
    kills: 31897,
    highestKills: 140
  },
  {
    id: 29,
    pseudo: "Jacky Jacquart",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat d'attaque",
    hllRecordsId: "94e2677d0de83fcca451580f145ba87c",
    winRate: 51,
    kills: 7292,
    highestKills: 69
  },
  {
    id: 30,
    pseudo: "Lanteric",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat d'attaque",
    hllRecordsId: "907fa88ff6dfb6660dbd98c029eba168",
    winRate: 68,
    kills: 3654,
    highestKills: 54
  },
  {
    id: 31,
    pseudo: "nitro-blast38",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat d'attaque",
    hllRecordsId: "Bdc64a1ec54c2679a6b68fdd09def0a3",
  },
  {
    id: 32,
    pseudo: "Arnobase",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat d'attaque",
    hllRecordsId: "1631f8b86ba7e92a6540ee8778d54f99",
    winRate: 64,
    kills: 17326,
    highestKills: 63
  },
  {
    id: 33,
    pseudo: "Light",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat d'attaque",
    hllRecordsId: "a434e2fec63078f865be403ecdc7f774",
    winRate: 46,
    kills: 21873,
    highestKills: 110
  },

  // ── Infanterie - Défense ─────────────────────────────────────────────────
  {
    id: 34,
    pseudo: "Zepeckk",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat de défense",
    hllRecordsId: "1cd5a328eba2c106d8704f5aa8470ffa",
    winRate: 52,
    kills: 3911,
    highestKills: 55
  },
  {
    id: 35,
    pseudo: "Jack Stan",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat de défense",
    hllRecordsId: "7234580a20bb991277d0d7f41513c173",
    winRate: 71,
    kills: 1943,
    highestKills: 121
  },
  {
    id: 36,
    pseudo: "Alan",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat de défense",
    hllRecordsId: "3d67f80bab0082a67fbde2ff3c69a099",
    winRate: 56,
    kills: 5506,
    highestKills: 66
  },
  {
    id: 37,
    pseudo: "Chicobaings",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat de défense",
    hllRecordsId: "4500fed5adcbff0f7be0f9b017f7a327",
    winRate: 52,
    kills: 5358,
    highestKills: 60
  },
  {
    id: 38,
    pseudo: "cRiz.OneR",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat de défense",
    hllRecordsId: "daf17df5d116a4632bebba4a83fe213e",
    winRate: 57,
    kills: 10929,
    highestKills: 67
  },
  {
    id: 39,
    pseudo: "ContreSens",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat de défense",
    hllRecordsId: "e760e417e441a1fb1b8ec18c981c81cb",
    winRate: 52,
    kills: 5566,
    highestKills: 72
  },
  {
    id: 40,
    pseudo: "Lexxa",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat de défense",
    hllRecordsId: "03a30581827152ece4220a6906e82efb",
    winRate: 60,
    kills: 7338,
    highestKills: 66
  },
  {
    id: 41,
    pseudo: "Skunkz59120fr",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat de défense",
    hllRecordsId: "6aac6f49c7120379879b9e401755b056",
    winRate: 66,
    kills: 2166,
    highestKills: 35
  },
  {
    id: 42,
    pseudo: "Vagabonix 40686",
    role: "infantry",
    grade: "Soldat",
    specialty: "Soldat de défense",
    hllRecordsId: "2f3f37d1a29f83df95c9bd40882580bf",
    winRate: 63,
    kills: 3286,
    highestKills: 36
  },
];

export const roleOrder: PlayerRole[] = [
  "commander",
  "squadLeader",
  "infantry",
  "armor",
  "recon",
];

