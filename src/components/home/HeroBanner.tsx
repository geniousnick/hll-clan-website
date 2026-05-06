"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { translations, Lang } from "@/data/translations";

interface HeroBannerProps {
  lang: Lang;
}

export default function HeroBanner({ lang }: HeroBannerProps) {
  const t = translations[lang].hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080908]/40 via-[#080908]/60 to-[#0C0D0B] z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080908]/60 via-transparent to-[#080908]/60 z-10" />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Logo L9O */}
        <div
          className="mb-6 flex justify-center animate-fade-in-up"
          style={{ animationDelay: "0s", animationFillMode: "both" }}
        >
          <div
            className="relative w-40 h-40 sm:w-52 sm:h-52"
            style={{
              filter: "drop-shadow(0 0 30px rgba(196,92,26,0.4)) drop-shadow(0 0 60px rgba(0,200,180,0.15))",
            }}
          >
            <Image
              src="/images/logo-l9o.png"
              alt="La 9ème Ombre [L9O]"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Tag */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <span className="inline-block border border-[#C45C1A]/50 text-[#C45C1A] font-mono text-xs tracking-[0.5em] uppercase px-4 py-1.5 bg-[#C45C1A]/5">
            ◆ {t.tag} · HELL LET LOOSE ◆
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display text-6xl sm:text-8xl lg:text-[120px] text-[#E8E4DA] leading-none tracking-wider mb-4 animate-fade-in-up"
          style={{
            animationDelay: "0.3s",
            animationFillMode: "both",
            textShadow: "0 0 60px rgba(196,92,26,0.3), 0 4px 20px rgba(0,0,0,0.9)",
          }}
        >
          LA 9ÈME
          <br />
          <span className="text-[#C45C1A]">OMBRE</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[#8A8C85] font-mono text-sm sm:text-base tracking-[0.4em] uppercase mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          {t.subtitle}
        </p>

        {/* Divider */}
        <div
          className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          <span className="flex-1 max-w-[80px] h-px bg-gradient-to-r from-transparent to-[#C45C1A]/60" />
          <span className="text-[#C45C1A] text-lg">✦</span>
          <span className="flex-1 max-w-[80px] h-px bg-gradient-to-l from-transparent to-[#C45C1A]/60" />
        </div>

        {/* Description */}
        <p
          className="text-[#B0B2A8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.7s", animationFillMode: "both" }}
        >
          {t.description}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.9s", animationFillMode: "both" }}
        >
          <a
            href="LIEN_DISCORD_ICI"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-discord-btn"
            className="group relative inline-flex items-center gap-3 bg-[#C45C1A] hover:bg-[#D97A35] text-white font-semibold px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 animate-glow-pulse"
          >
            <svg
              className="flex-shrink-0"
              width="18"
              height="14"
              viewBox="0 0 71 55"
              fill="currentColor"
            >
              <path d="M60.1 4.9A58.5 58.5 0 0045.6 1a.22.22 0 00-.23.11 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37.4 37.4 0 0025.5 1.1a.23.23 0 00-.23-.1A58.3 58.3 0 0010.8 4.9C10.7 5 10.6 5 10.6 5.1 1.5 18.7-0.9 32 0.3 45c0 .1.1.1.1.2a58.8 58.8 0 0017.7 9 .23.23 0 00.25-.09 42 42 0 003.6-5.9.23.23 0 00-.12-.32 38.7 38.7 0 01-5.5-2.6.23.23 0 01-.02-.39c.37-.28.74-.57 1.1-.86a.22.22 0 01.23-.03c11.5 5.3 24 5.3 35.4 0a.22.22 0 01.23.02c.36.3.73.59 1.1.87a.23.23 0 01-.02.39 36 36 0 01-5.5 2.6.23.23 0 00-.12.32 47.1 47.1 0 003.6 5.9.22.22 0 00.25.09A58.6 58.6 0 0070.6 45.1c.1-.1.1-.1.1-.2 1.5-15.4-2.5-28.5-10.6-40.1 0-.1-.1-.1-.1-.1zM23.7 37.3c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2zm23.6 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2z" />
            </svg>
            {t.cta}
          </a>

          <Link
            href="/roster"
            id="hero-roster-btn"
            className="inline-flex items-center gap-2 border border-[#4A5240] hover:border-[#8A9B56] text-[#B0B2A8] hover:text-[#E8E4DA] font-medium px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 hover:bg-[#4A5240]/10"
          >
            {t.ctaSecondary}
            <span>→</span>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[#3A3B33] text-xs font-mono tracking-widest uppercase">
            scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[#3A3B33] to-transparent" />
        </div>
      </div>
    </section>
  );
}
