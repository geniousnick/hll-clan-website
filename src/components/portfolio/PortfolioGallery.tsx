"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { portfolioItems, PortfolioItem, MediaType } from "@/data/portfolio";
import { Lang } from "@/data/translations";

interface PortfolioGalleryProps {
  lang: Lang;
}

type FilterType = "all" | MediaType;

// Extrait l'ID YouTube depuis une URL complète ou un ID court
function getYouTubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

// Composant Lightbox photo
function PhotoLightbox({
  item,
  onClose,
  lang,
}: {
  item: PortfolioItem;
  onClose: () => void;
  lang: Lang;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const title = lang === "fr" ? item.title : (item.titleEn ?? item.title);
  const description =
    lang === "fr"
      ? item.description
      : (item.descriptionEn ?? item.description);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        style={{ animation: "fadeIn 200ms ease" }}
      />

      {/* Contenu */}
      <div
        className="relative z-10 max-w-5xl w-full flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "scaleIn 200ms cubic-bezier(0.4,0,0.2,1)" }}
      >
        {/* Image */}
        <div className="relative w-full aspect-video max-h-[75vh]">
          <Image
            src={item.src!}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        {/* Légende */}
        <div className="text-center">
          <p className="text-[#E8E4DA] font-display text-xl tracking-widest">
            {title}
          </p>
          {description && (
            <p className="text-[#8A8C85] text-sm font-mono mt-1">
              {description}
            </p>
          )}
        </div>

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-[#8A8C85] hover:text-[#E8E4DA] transition-colors text-sm font-mono uppercase tracking-widest"
          aria-label="Fermer"
        >
          ESC ✕
        </button>
      </div>
    </div>
  );
}

// Composant Lightbox vidéo
function VideoLightbox({
  item,
  onClose,
  lang,
}: {
  item: PortfolioItem;
  onClose: () => void;
  lang: Lang;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const title = lang === "fr" ? item.title : (item.titleEn ?? item.title);
  const description =
    lang === "fr"
      ? item.description
      : (item.descriptionEn ?? item.description);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/92 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-5xl flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "scaleIn 200ms cubic-bezier(0.4,0,0.2,1)" }}
      >
        {/* Player YouTube ou vidéo locale */}
        <div className="relative w-full aspect-video bg-black">
          {item.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : item.videoSrc ? (
            <video
              src={item.videoSrc}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full"
            />
          ) : null}
        </div>

        {/* Légende */}
        <div>
          <p className="text-[#E8E4DA] font-display text-xl tracking-widest">
            {title}
          </p>
          {description && (
            <p className="text-[#8A8C85] text-sm font-mono mt-1">
              {description}
            </p>
          )}
        </div>

        {/* Fermer */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-[#8A8C85] hover:text-[#E8E4DA] transition-colors text-sm font-mono uppercase tracking-widest"
          aria-label="Fermer"
        >
          ESC ✕
        </button>
      </div>
    </div>
  );
}

// Carte de média
function MediaCard({
  item,
  lang,
  onClick,
}: {
  item: PortfolioItem;
  lang: Lang;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const title = lang === "fr" ? item.title : (item.titleEn ?? item.title);

  const thumbnailSrc =
    item.type === "video"
      ? item.thumbnail ?? (item.youtubeId ? getYouTubeThumbnail(item.youtubeId) : null)
      : item.src;

  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString(
        lang === "fr" ? "fr-FR" : "en-GB",
        { day: "numeric", month: "short", year: "numeric" }
      )
    : null;

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C45C1A]"
      aria-label={`Ouvrir : ${title}`}
    >
      {/* Thumbnail container */}
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
          <div className="absolute inset-0 flex items-center justify-center bg-[#0C0D0B]">
            <span className="text-4xl opacity-20">
              {item.type === "video" ? "▶" : "🖼"}
            </span>
          </div>
        )}

        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          {item.type === "video" ? (
            // Bouton play
            <div
              className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/60 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ transform: "scale(0.8)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(196,92,26,0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(0.8)";
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6 ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          ) : (
            // Icône loupe
            <div className="w-10 h-10 rounded-full bg-black/50 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </div>
          )}
        </div>

        {/* Badge type */}
        <div className="absolute top-2 left-2">
          <span
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border"
            style={
              item.type === "video"
                ? { color: "#C45C1A", borderColor: "#C45C1A40", backgroundColor: "#C45C1A10" }
                : { color: "#8A9B56", borderColor: "#8A9B5640", backgroundColor: "#8A9B5610" }
            }
          >
            {item.type === "video" ? "▶ Vidéo" : "📷 Photo"}
          </span>
        </div>
      </div>

      {/* Infos sous la carte */}
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

export default function PortfolioGallery({ lang }: PortfolioGalleryProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const filtered =
    filter === "all"
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
      {/* Barre de filtres */}
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
            {/* Icône */}
            <span>
              {f === "all" ? "⊞" : f === "video" ? "▶" : "📷"}
            </span>
            {filterLabels[f][lang]}
            {/* Compteur */}
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
            <MediaCard
              key={item.id}
              item={item}
              lang={lang}
              onClick={() => setActiveItem(item)}
            />
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
