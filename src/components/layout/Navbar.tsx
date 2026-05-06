"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { translations, Lang } from "@/data/translations";

interface NavbarProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function Navbar({ lang, onLangChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = translations[lang].nav;
  const ticking = useRef(false);

  useEffect(() => {
    // Utiliser requestAnimationFrame pour éviter les mises à jour trop fréquentes
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // État initial immédiat
    setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu au changement de page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/roster", label: t.roster },
    { href: "/matches", label: t.matches },
    { href: "/portfolio", label: t.portfolio },
    { href: "/recrutement", label: t.recruitment },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ willChange: "transform" }}
    >
      {/* Fond animé via opacity uniquement — beaucoup plus fluide que background-color */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "#0C0D0B",
          borderBottom: "1px solid #3A3B33",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          opacity: scrolled ? 0.97 : 0,
          transition: "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="relative w-10 h-10 flex-shrink-0"
              style={{
                transition: "filter 300ms ease",
                filter: "drop-shadow(0 0 0px rgba(196,92,26,0))",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter =
                  "drop-shadow(0 0 8px rgba(196,92,26,0.65))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter =
                  "drop-shadow(0 0 0px rgba(196,92,26,0))";
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
            <div className="hidden sm:block">
              <p className="text-[#E8E4DA] font-display text-xl tracking-widest leading-none">
                LA 9ÈME OMBRE
              </p>
              <p className="text-[#8A8C85] text-xs font-mono tracking-[0.3em] uppercase">
                Hell Let Loose
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium tracking-widest uppercase overflow-hidden"
                  style={{
                    color: isActive ? "#C45C1A" : "#8A8C85",
                    transition: "color 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#E8E4DA";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#8A8C85";
                  }}
                >
                  {link.label}
                  {/* Underline animée */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: 0,
                      height: "1px",
                      width: isActive ? "100%" : "0%",
                      backgroundColor: "#C45C1A",
                      transition: "width 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </Link>
              );
            })}

            {/* Lang switcher */}
            <div className="flex items-center gap-1 border border-[#3A3B33] rounded px-2 py-1">
              <button
                onClick={() => onLangChange("fr")}
                className="text-xs font-mono uppercase px-1 py-0.5 rounded"
                style={{
                  color: lang === "fr" ? "#C45C1A" : "#8A8C85",
                  fontWeight: lang === "fr" ? 700 : 400,
                  transition: "color 150ms ease",
                }}
              >
                FR
              </button>
              <span className="text-[#3A3B33] text-xs">|</span>
              <button
                onClick={() => onLangChange("en")}
                className="text-xs font-mono uppercase px-1 py-0.5 rounded"
                style={{
                  color: lang === "en" ? "#C45C1A" : "#8A8C85",
                  fontWeight: lang === "en" ? 700 : 400,
                  transition: "color 150ms ease",
                }}
              >
                EN
              </button>
            </div>

            {/* Discord CTA — transform au lieu de scale pour éviter le layout reflow */}
            <a
              href="LIEN_DISCORD_ICI"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-discord-btn"
              className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded"
              style={{
                backgroundColor: "#5865F2",
                transition: "background-color 200ms ease, transform 200ms ease",
                willChange: "transform",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "#4752C4";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "#5865F2";
                el.style.transform = "translateY(0)";
              }}
            >
              <svg width="16" height="12" viewBox="0 0 71 55" fill="currentColor">
                <path d="M60.1 4.9A58.5 58.5 0 0045.6 1a.22.22 0 00-.23.11 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37.4 37.4 0 0025.5 1.1a.23.23 0 00-.23-.1A58.3 58.3 0 0010.8 4.9C10.7 5 10.6 5 10.6 5.1 1.5 18.7-0.9 32 0.3 45c0 .1.1.1.1.2a58.8 58.8 0 0017.7 9 .23.23 0 00.25-.09 42 42 0 003.6-5.9.23.23 0 00-.12-.32 38.7 38.7 0 01-5.5-2.6.23.23 0 01-.02-.39c.37-.28.74-.57 1.1-.86a.22.22 0 01.23-.03c11.5 5.3 24 5.3 35.4 0a.22.22 0 01.23.02c.36.3.73.59 1.1.87a.23.23 0 01-.02.39 36 36 0 01-5.5 2.6.23.23 0 00-.12.32 47.1 47.1 0 003.6 5.9.22.22 0 00.25.09A58.6 58.6 0 0070.6 45.1c.1-.1.1-.1.1-.2 1.5-15.4-2.5-28.5-10.6-40.1 0-.1-.1-.1-.1-.1zM23.7 37.3c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2zm23.6 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2z" />
              </svg>
              Discord
            </a>
          </div>

          {/* Mobile: lang + burger */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center gap-1 border border-[#3A3B33] rounded px-2 py-1">
              <button
                onClick={() => onLangChange("fr")}
                className="text-xs font-mono uppercase px-1"
                style={{ color: lang === "fr" ? "#C45C1A" : "#8A8C85" }}
              >
                FR
              </button>
              <span className="text-[#3A3B33] text-xs">|</span>
              <button
                onClick={() => onLangChange("en")}
                className="text-xs font-mono uppercase px-1"
                style={{ color: lang === "en" ? "#C45C1A" : "#8A8C85" }}
              >
                EN
              </button>
            </div>

            {/* Bouton burger — 3 barres animées en croix */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-[#E8E4DA]"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              id="mobile-menu-btn"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  style={{
                    display: "block",
                    height: "1px",
                    backgroundColor: "currentColor",
                    transformOrigin: "center",
                    transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: menuOpen
                      ? "translateY(7px) rotate(45deg)"
                      : "none",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    height: "1px",
                    backgroundColor: "currentColor",
                    transition: "opacity 200ms ease, transform 200ms ease",
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    height: "1px",
                    backgroundColor: "currentColor",
                    transformOrigin: "center",
                    transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: menuOpen
                      ? "translateY(-7px) rotate(-45deg)"
                      : "none",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — animé via transform+opacity, pas max-height */}
      <div
        aria-hidden={!menuOpen}
        style={{
          overflow: "hidden",
          backgroundColor: "rgba(12,13,11,0.98)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: menuOpen ? "1px solid #3A3B33" : "1px solid transparent",
          maxHeight: menuOpen ? "400px" : "0px",
          opacity: menuOpen ? 1 : 0,
          transition:
            "max-height 350ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease, border-color 250ms ease",
          willChange: "max-height, opacity",
        }}
        className="md:hidden"
      >
        <div className="px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium tracking-widest uppercase py-2 border-b border-[#1E2318]"
              style={{
                color: pathname === link.href ? "#C45C1A" : "#8A8C85",
                transition: "color 150ms ease",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="LIEN_DISCORD_ICI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#5865F2] text-white text-sm font-semibold px-4 py-3 rounded mt-2"
          >
            <svg width="16" height="12" viewBox="0 0 71 55" fill="currentColor">
              <path d="M60.1 4.9A58.5 58.5 0 0045.6 1a.22.22 0 00-.23.11 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37.4 37.4 0 0025.5 1.1a.23.23 0 00-.23-.1A58.3 58.3 0 0010.8 4.9C10.7 5 10.6 5 10.6 5.1 1.5 18.7-0.9 32 0.3 45c0 .1.1.1.1.2a58.8 58.8 0 0017.7 9 .23.23 0 00.25-.09 42 42 0 003.6-5.9.23.23 0 00-.12-.32 38.7 38.7 0 01-5.5-2.6.23.23 0 01-.02-.39c.37-.28.74-.57 1.1-.86a.22.22 0 01.23-.03c11.5 5.3 24 5.3 35.4 0a.22.22 0 01.23.02c.36.3.73.59 1.1.87a.23.23 0 01-.02.39 36 36 0 01-5.5 2.6.23.23 0 00-.12.32 47.1 47.1 0 003.6 5.9.22.22 0 00.25.09A58.6 58.6 0 0070.6 45.1c.1-.1.1-.1.1-.2 1.5-15.4-2.5-28.5-10.6-40.1 0-.1-.1-.1-.1-.1zM23.7 37.3c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2zm23.6 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2z" />
            </svg>
            Discord
          </a>
        </div>
      </div>
    </nav>
  );
}
