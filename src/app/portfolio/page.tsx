"use client";

import { useLang } from "@/components/layout/ClientLayout";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";

export default function PortfolioPage() {
  const { lang } = useLang();

  const hero = {
    fr: {
      tag: "Galerie",
      title: "Portfolio",
      subtitle: "Photos & Vidéos · La 9ème Ombre [L9O]",
      description:
        "Les meilleurs moments de notre clan — actions de combat, moments d'équipe et highlights de matchs.",
    },
    en: {
      tag: "Gallery",
      title: "Portfolio",
      subtitle: "Photos & Videos · La 9ème Ombre [L9O]",
      description:
        "The best moments of our clan — combat actions, team moments and match highlights.",
    },
  };

  const t = hero[lang];

  return (
    <main className="min-h-screen bg-[#0C0D0B]">
      {/* Hero section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ligne déco */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C45C1A]/30 to-transparent" />

        <div className="max-w-7xl mx-auto">
          {/* Tag */}
          <div className="mb-4">
            <span className="inline-block border border-[#C45C1A]/40 text-[#C45C1A] font-mono text-xs tracking-[0.5em] uppercase px-4 py-1.5 bg-[#C45C1A]/5">
              ◆ {t.tag}
            </span>
          </div>

          {/* Titre */}
          <h1 className="font-display text-6xl sm:text-8xl text-[#E8E4DA] tracking-wider mb-4"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
          >
            {t.title}
          </h1>

          {/* Sous-titre */}
          <p className="text-[#8A8C85] font-mono text-sm tracking-[0.3em] uppercase mb-4">
            {t.subtitle}
          </p>

          {/* Séparateur */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-[#C45C1A]/60 to-transparent" />
          </div>

          <p className="text-[#8A8C85] text-base max-w-2xl leading-relaxed">
            {t.description}
          </p>
        </div>
      </section>

      {/* Galerie */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <PortfolioGallery lang={lang} />
        </div>
      </section>
    </main>
  );
}
