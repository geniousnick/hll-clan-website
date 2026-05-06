"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { portfolioItems, PortfolioItem, MediaType } from "@/data/portfolio";
import { Lang } from "@/data/translations";

interface PortfolioGalleryProps {
  lang: Lang;
}

type FilterType = "all" | MediaType;

function getYouTubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

// Détermine la source principale d'une vidéo
function getVideoSource(item: PortfolioItem): "youtube" | "tiktok" | "local" | null {
  if (item.youtubeId) return "youtube";
  if (item.tiktokId || item.tiktokUrl) return "tiktok";
  if (item.videoSrc) return "local";
  return null;
}

// Badge source vidéo
function VideoBadge({ source }: { source: "youtube" | "tiktok" | "local" | null }) {
  if (!source) return null;
  const config = {
    youtube: { label: "YouTube", color: "#FF0000", bg: "#FF000015", border: "#FF000040" },
    tiktok: { label: "TikTok", color: "#69C9D0", bg: "#69C9D015", border: "#69C9D040" },
    local: { label: "Vidéo", color: "#C45C1A", bg: "#C45C1A15", border: "#C45C1A40" },
  };
  const c = config[source];
  return (
    <span
      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border"
      style={{ color: c.color, backgroundColor: c.bg, borderColor: c.border }}
    >
      {source === "youtube" && (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z"/>
        </svg>
      )}
      {source === "tiktok" && (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.96a8.26 8.26 0 0 0 4.83 1.55V7.05a4.85 4.85 0 0 1-1.06-.36z"/>
        </svg>
      )}
      {source === "local" && "▶"}
      {c.label}
    </span>
  );
}

// ─── Lightbox partagée ────────────────────────────────────────────────────────
function useLightboxClose(onClose: () => void) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
}

// ─── Lightbox Photo ───────────────────────────────────────────────────────────
function PhotoLightbox({ item, onClose, lang }: { item: PortfolioItem; onClose: () => void; lang: Lang }) {
  useLightboxClose(onClose);
  const title = lang === "fr" ? item.title : (item.titleEn ?? item.title);
  const description = lang === "fr" ? item.description : (item.descriptionEn ?? item.description);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" style={{ animation: "fadeIn 200ms ease" }} />
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "scaleIn 200ms cubic-bezier(0.4,0,0.2,1)" }}
      >
        <div className="relative w-full aspect-video max-h-[75vh]">
          <Image src={item.src!} alt={title} fill className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px" />
        </div>
        <div className="text-center">
          <p className="text-[#E8E4DA] font-display text-xl tracking-widest">{title}</p>
          {description && <p className="text-[#8A8C85] text-sm font-mono mt-1">{description}</p>}
        </div>
        <button onClick={onClose} className="absolute -top-12 right-0 text-[#8A8C85] hover:text-[#E8E4DA] transition-colors text-sm font-mono uppercase tracking-widest">
          ESC ✕
        </button>
      </div>
    </div>
  );
}

// ─── Lightbox Vidéo (YouTube + Local + TikTok) ────────────────────────────────
function VideoLightbox({ item, onClose, lang }: { item: PortfolioItem; onClose: () => void; lang: Lang }) {
  useLightboxClose(onClose);
  const title = lang === "fr" ? item.title : (item.titleEn ?? item.title);
  const description = lang === "fr" ? item.description : (item.descriptionEn ?? item.description);
  const source = getVideoSource(item);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/92 backdrop-blur-sm" style={{ animation: "fadeIn 200ms ease" }} />

      <div
        className={`relative z-10 flex flex-col gap-4 ${source === "tiktok" ? "w-full max-w-sm" : "w-full max-w-5xl"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "scaleIn 200ms cubic-bezier(0.4,0,0.2,1)" }}
      >
        {/* ── YouTube ── */}
        {source === "youtube" && (
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        )}

        {/* ── TikTok (embed 9:16) ── */}
        {source === "tiktok" && (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-full bg-black overflow-hidden" style={{ aspectRatio: "9/16", maxHeight: "75vh" }}>
              {item.tiktokId ? (
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${item.tiktokId}`}
                  title={title}
                  allow="autoplay"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                  style={{ background: "#000" }}
                />
              ) : (
                // Fallback si seulement tiktokUrl : bouton pour ouvrir dans un onglet
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#111]">
                  <svg viewBox="0 0 24 24" fill="#69C9D0" className="w-16 h-16">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.96a8.26 8.26 0 0 0 4.83 1.55V7.05a4.85 4.85 0 0 1-1.06-.36z"/>
                  </svg>
                  <a
                    href={item.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#69C9D0] text-black font-bold text-sm px-5 py-2.5 rounded font-mono uppercase tracking-widest"
                  >
                    Voir sur TikTok ↗
                  </a>
                </div>
              )}
            </div>

            {/* Lien externe TikTok */}
            {item.tiktokUrl && (
              <a
                href={item.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#69C9D0] text-xs font-mono hover:underline"
              >
                Ouvrir dans TikTok ↗
              </a>
            )}
          </div>
        )}

        {/* ── Vidéo locale ── */}
        {source === "local" && (
          <div className="relative w-full aspect-video bg-black">
            <video
              src={item.videoSrc}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full"
              style={{ maxHeight: "75vh" }}
            >
              <source src={item.videoSrc} type="video/mp4" />
              <p className="text-white text-center p-4">
                Ton navigateur ne supporte pas la lecture vidéo.
              </p>
            </video>
          </div>
        )}

        {/* Légende */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <p className="text-[#E8E4DA] font-display text-xl tracking-widest">{title}</p>
            {source && <VideoBadge source={source} />}
          </div>
          {description && <p className="text-[#8A8C85] text-sm font-mono">{description}</p>}
        </div>

        {/* Fermer */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-[#8A8C85] hover:text-[#E8E4DA] transition-colors text-sm font-mono uppercase tracking-widest"
        >
          ESC ✕
        </button>
      </div>
    </div>
  );
}

// ─── Carte média ──────────────────────────────────────────────────────────────
function MediaCard({ item, lang, onClick }: { item: PortfolioItem; lang: Lang; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);
  const title = lang === "fr" ? item.title : (item.titleEn ?? item.title);
  const source = getVideoSource(item);

  const thumbnailSrc =
    item.type === "video"
      ? item.thumbnail ?? (item.youtubeId ? getYouTubeThumbnail(item.youtubeId) : null)
      : item.src;

  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB",
        { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C45C1A]"
      aria-label={`Ouvrir : ${title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#111310] border border-[#2A2E27] group-hover:border-[#C45C1A]/40 transition-colors duration-300">
        {thumbnailSrc && !imgError ? (
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0C0D0B]">
            {/* Icône selon la source */}
            {source === "tiktok" ? (
              <svg viewBox="0 0 24 24" fill="#69C9D0" className="w-10 h-10 opacity-30">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.96a8.26 8.26 0 0 0 4.83 1.55V7.05a4.85 4.85 0 0 1-1.06-.36z"/>
              </svg>
            ) : (
              <span className="text-4xl opacity-20">{item.type === "video" ? "▶" : "🖼"}</span>
            )}
          </div>
        )}

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", transform: "scale(0.85)" }}
          >
            {item.type === "video" ? (
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            )}
          </div>
        </div>

        {/* Badge source en haut à gauche */}
        <div className="absolute top-2 left-2">
          {item.type === "video" && source ? (
            <VideoBadge source={source} />
          ) : (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border"
              style={{ color: "#8A9B56", borderColor: "#8A9B5640", backgroundColor: "#8A9B5610" }}>
              📷 Photo
            </span>
          )}
        </div>
      </div>

      {/* Infos */}
      <div className="pt-2 pb-1">
        <p className="text-[#E8E4DA] text-sm font-medium leading-tight group-hover:text-[#C45C1A] transition-colors duration-200 line-clamp-1">
          {title}
        </p>
        {formattedDate && (
          <p className="text-[#5A5C50] text-xs font-mono mt-0.5">{formattedDate}</p>
        )}
      </div>
    </button>
  );
}

// ─── Galerie principale ───────────────────────────────────────────────────────
export default function PortfolioGallery({ lang }: PortfolioGalleryProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const filtered = filter === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.type === filter);

  const closeLightbox = useCallback(() => setActiveItem(null), []);

  const filterLabels: Record<FilterType, { fr: string; en: string }> = {
    all: { fr: "Tout", en: "All" },
    photo: { fr: "Photos", en: "Photos" },
    video: { fr: "Vidéos", en: "Videos" },
  };

  const counts = {
    all: portfolioItems.length,
    photo: portfolioItems.filter((i) => i.type === "photo").length,
    video: portfolioItems.filter((i) => i.type === "video").length,
  };

  return (
    <>
      {/* Filtres */}
      <div className="flex items-center gap-2 mb-10 flex-wrap">
        {(["all", "video", "photo"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            id={`filter-${f}`}
            className="relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-200"
            style={{
              borderColor: filter === f ? "#C45C1A" : "#2A2E27",
              color: filter === f ? "#C45C1A" : "#8A8C85",
              backgroundColor: filter === f ? "#C45C1A10" : "transparent",
            }}
          >
            <span>{f === "all" ? "⊞" : f === "video" ? "▶" : "📷"}</span>
            {filterLabels[f][lang]}
            <span
              className="inline-block px-1.5 py-px text-[10px] rounded-sm ml-1"
              style={{
                backgroundColor: filter === f ? "#C45C1A30" : "#2A2E2760",
                color: filter === f ? "#C45C1A" : "#5A5C50",
              }}
            >
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[#3A3B33] font-mono text-sm uppercase tracking-widest">
            {lang === "fr" ? "Aucun média dans cette catégorie" : "No media in this category"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <MediaCard key={item.id} item={item} lang={lang} onClick={() => setActiveItem(item)} />
          ))}
        </div>
      )}

      {/* Lightboxes */}
      {activeItem?.type === "photo" && (
        <PhotoLightbox item={activeItem} onClose={closeLightbox} lang={lang} />
      )}
      {activeItem?.type === "video" && (
        <VideoLightbox item={activeItem} onClose={closeLightbox} lang={lang} />
      )}
    </>
  );
}
