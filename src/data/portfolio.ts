// Portfolio data for La 9ème Ombre [L9O]
//
// ─── COMMENT AJOUTER UN MÉDIA ────────────────────────────────────────────────
//
// 📷 PHOTO
//   → Place le fichier dans /public/front/
//   → Renseigne : type: "photo", src: "/front/ma-photo.jpg"
//
// ▶ VIDÉO YOUTUBE
//   → Copie l'ID depuis l'URL : youtube.com/watch?v=XXXXXXX
//   → Renseigne : type: "video", youtubeId: "XXXXXXX"
//   → La miniature est générée automatiquement
//
// 📱 VIDÉO TIKTOK
//   → Copie l'ID depuis l'URL : tiktok.com/@pseudo/video/1234567890123456789
//   → Renseigne : type: "video", tiktokId: "1234567890123456789"
//   → Ajoute une miniature manuellement : thumbnail: "/front/thumb-tiktok.jpg"
//
// 🖥️ VIDÉO LOCALE (sur ton serveur)
//   → Place le fichier .mp4 dans /public/front/
//   → Renseigne : type: "video", videoSrc: "/front/ma-video.mp4"
//   → Ajoute une miniature : thumbnail: "/front/ma-video-thumb.jpg"
//
// ─────────────────────────────────────────────────────────────────────────────

export type MediaType = "photo" | "video";
export type VideoSource = "youtube" | "tiktok" | "local";

export interface PortfolioItem {
  id: number;
  type: MediaType;
  title: string;
  titleEn?: string;

  // ── Photo ─────────────────────────────────────────────
  src?: string; // chemin vers /public/front/

  // ── Vidéo YouTube ─────────────────────────────────────
  youtubeId?: string; // ex: "dQw4w9WgXcQ"

  // ── Vidéo TikTok ──────────────────────────────────────
  tiktokId?: string; // ex: "7123456789012345678"
  // Pour ouvrir le lien TikTok dans un nouvel onglet au lieu d'un embed
  tiktokUrl?: string; // ex: "https://www.tiktok.com/@pseudo/video/7123..."

  // ── Vidéo locale (serveur) ────────────────────────────
  videoSrc?: string; // chemin vers /public/front/ (ex: "/front/clip.mp4")

  // ── Commun vidéos ─────────────────────────────────────
  thumbnail?: string; // miniature manuelle (obligatoire pour TikTok + local)

  // ── Métadonnées ───────────────────────────────────────
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

  // ── Exemple Vidéo TikTok ─────────────────────────────────────────────────
  // {
  //   id: 7,
  //   type: "video",
  //   title: "Clip TikTok — Sniper L9O",
  //   tiktokId: "7123456789012345678",       // ← ID dans l'URL TikTok
  //   tiktokUrl: "https://www.tiktok.com/@tonpseudo/video/7123456789012345678",
  //   thumbnail: "/front/tiktok-thumb.jpg",   // ← miniature manuelle obligatoire
  //   date: "2026-05-01",
  // },

  // ── Exemple Vidéo Locale (serveur) ───────────────────────────────────────
  // {
  //   id: 8,
  //   type: "video",
  //   title: "Match vs EXD — Highlights",
  //   videoSrc: "/front/match-exd.mp4",       // ← fichier dans /public/front/
  //   thumbnail: "/front/match-exd-thumb.jpg",
  //   date: "2026-04-20",
  // },

  // ── Exemples Photos ──────────────────────────────────────────────────────
  {
    id: 3,
    type: "photo",
    title: "Capture du drapeau — Foy",
    titleEn: "Flag Capture — Foy",
    src: "/images/hero-bg.png", // ← Remplace par /front/photo1.jpg
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
    src: "/images/hero-bg.png", // ← Remplace par /front/photo2.jpg
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
    src: "/images/hero-bg.png", // ← Remplace par /front/photo3.jpg
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
