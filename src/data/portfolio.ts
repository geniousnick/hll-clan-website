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

  {
    id: 1,
    type: "video",
    title: "Offensive sur St-Mere-Eglise — L9O",
    titleEn: "Offensive on St-Mere-Eglise — L9O",
    youtubeId: "dbI6uwDFlas", // ← Remplace par l'ID YouTube réel
    description: "Match compétitif vs 7cie",
    descriptionEn: "Competitive match vs 7cie",
    date: "2026-02-03",
    tags: ["St-Mere-Eglise", "assaut"],
  },


  {
    id: 2,
    type: "video",
    title: "La L9O est efficace",
    titleEn: "L9O is efficient",
    videoSrc: "/front/video1.mp4",       // ← fichier dans /public/front/
    thumbnail: "/front/logo-l9o.png",
    date: "2026-05-09",
  },

  {
    id: 3,
    type: "video",
    title: "Assaut de Squad Leader",
    titleEn: "Squad Leader assault",
    videoSrc: "/front/video2.mp4",       // ← fichier dans /public/front/
    thumbnail: "/front/logo-l9o.png",
    date: "2026-05-09",
  },



  // ── Exemples Vidéos YouTube ──────────────────────────────────────────────
  // {
  // id: 1,
  // type: "video",
  // title: "Offensive sur Carentan — L9O",
  // titleEn: "Carentan Offensive — L9O",
  //  youtubeId: "dQw4w9WgXcQ", // ← Remplace par l'ID YouTube réel
  //  description: "Opération coordonnée sur Carentan. Beau travail d'équipe.",
  // descriptionEn: "Coordinated operation on Carentan. Great teamwork.",
  //  date: "2026-04-28",
  //  tags: ["carentan", "assaut"],
  // },

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
    id: 4,
    type: "photo",
    title: "C'est de l'art",
    titleEn: "It's art",
    src: "/front/cestdelart.jpg", // ← Remplace par /front/photo1.jpg
    description: "Magnifique structure de blindés.",
    descriptionEn: "Nice structure of tanks.",
    date: "2026-05-09",
    tags: ["Carentan", "capture"],
  },

  {
    id: 5,
    type: "video",
    title: "Combat de blindés",
    titleEn: "Tank fight",
    videoSrc: "/front/combatblindé.mp4",       // ← fichier dans /public/front/
    thumbnail: "/front/logo-l9o.png",
    date: "2026-05-09",
  },

  {
    id: 6,
    type: "video",
    title: "Clip TikTok — L9O",
    tiktokId: "7594092462088441110",       // ← ID dans l'URL TikTok
    tiktokUrl: "https://www.tiktok.com/@genious.le.tocard/video/7594092462088441110",
    thumbnail: "/front/logo-l9o.png",   // ← miniature manuelle obligatoire
    date: "2026-05-10",
  },
];
