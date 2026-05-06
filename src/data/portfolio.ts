// Portfolio data for La 9ème Ombre [L9O]
//
// Pour ajouter un média :
// 1. Photos → place le fichier dans /public/portfolio/ et renseigne type: "photo"
// 2. Vidéos YouTube → utilise l'URL YouTube et renseigne type: "video", source: "youtube"
// 3. Vidéos locales → place le fichier .mp4 dans /public/portfolio/ et source: "local"

export type MediaType = "photo" | "video";
export type VideoSource = "youtube" | "local";

export interface PortfolioItem {
  id: number;
  type: MediaType;
  title: string;
  titleEn?: string;
  // Pour les photos : chemin vers /public/portfolio/
  src?: string;
  // Pour les vidéos YouTube : ID de la vidéo (ex: "dQw4w9WgXcQ")
  youtubeId?: string;
  // Pour les vidéos locales : chemin vers /public/portfolio/
  videoSrc?: string;
  // Miniature (obligatoire pour les vidéos locales)
  thumbnail?: string;
  // Infos optionnelles
  description?: string;
  descriptionEn?: string;
  date?: string; // format "YYYY-MM-DD"
  tags?: string[];
}

export const portfolioItems: PortfolioItem[] = [
  // ── Exemples Vidéos YouTube ──────────────────────────────────────────────
  {
    id: 1,
    type: "video",
    title: "Offensive sur Carentan — L9O",
    titleEn: "Carentan Offensive — L9O",
    youtubeId: "dQw4w9WgXcQ", // ← Remplace par l'ID YouTube réel
    description: "Opération coordonnée sur Carentan. Beau travail d'équipe.",
    descriptionEn: "Coordinated operation on Carentan. Great teamwork.",
    date: "2026-04-28",
    tags: ["carentan", "assaut"],
  },
  {
    id: 2,
    type: "video",
    title: "Victoire à Stalingrad — Ligue FR",
    titleEn: "Stalingrad Victory — FR League",
    youtubeId: "dQw4w9WgXcQ", // ← Remplace par l'ID YouTube réel
    description: "Match de ligue, victoire écrasante 5-1.",
    descriptionEn: "League match, crushing 5-1 victory.",
    date: "2026-04-14",
    tags: ["stalingrad", "ligue"],
  },

  // ── Exemples Photos ──────────────────────────────────────────────────────
  {
    id: 3,
    type: "photo",
    title: "Capture du drapeau — Foy",
    titleEn: "Flag Capture — Foy",
    src: "/images/hero-bg.png", // ← Remplace par /portfolio/photo1.jpg
    description: "Moment décisif lors de la capture du dernier point.",
    descriptionEn: "Decisive moment during the last point capture.",
    date: "2026-04-07",
    tags: ["foy", "capture"],
  },
  {
    id: 4,
    type: "photo",
    title: "Formation de commandement",
    titleEn: "Command Formation",
    src: "/images/hero-bg.png", // ← Remplace par /portfolio/photo2.jpg
    description: "Briefing stratégique avant le match.",
    descriptionEn: "Strategic briefing before the match.",
    date: "2026-03-31",
    tags: ["commandement", "tactique"],
  },
  {
    id: 5,
    type: "photo",
    title: "Assaut sur Purple Heart Lane",
    titleEn: "Assault on Purple Heart Lane",
    src: "/images/hero-bg.png", // ← Remplace par /portfolio/photo3.jpg
    description: "Action intense lors de la Coupe Mars.",
    descriptionEn: "Intense action during the March Cup.",
    date: "2026-03-24",
    tags: ["phl", "assaut"],
  },
  {
    id: 6,
    type: "video",
    title: "Highlights Avril 2026",
    titleEn: "April 2026 Highlights",
    youtubeId: "dQw4w9WgXcQ", // ← Remplace par l'ID YouTube réel
    description: "Les meilleurs moments du mois d'avril.",
    descriptionEn: "Best moments of April.",
    date: "2026-04-30",
    tags: ["highlights", "montage"],
  },
];
