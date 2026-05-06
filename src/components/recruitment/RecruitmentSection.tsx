"use client";

import { translations, Lang } from "@/data/translations";

interface RecruitmentSectionProps {
  lang: Lang;
}

export default function RecruitmentSection({ lang }: RecruitmentSectionProps) {
  const t = translations[lang].recruitment;

  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="max-w-3xl">
        <p className="text-[#B0B2A8] text-lg leading-relaxed border-l-2 border-[#C45C1A] pl-6">
          {t.intro}
        </p>
      </div>

      {/* Criteria grid */}
      <div>
        <h3 className="font-display text-3xl text-[#E8E4DA] tracking-widest uppercase mb-8">
          {t.criteria.title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.criteria.items.map((item, index) => (
            <div
              key={index}
              id={`criteria-${index}`}
              className="group bg-[#111310] border border-[#2A2E27] hover:border-[#C45C1A]/30 p-6 transition-all duration-300 hover:bg-[#161A13] relative overflow-hidden"
            >
              {/* Hover accent */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-[#C45C1A] group-hover:w-full transition-all duration-500" />

              {/* Icon */}
              <div className="text-3xl mb-4">{item.icon}</div>

              {/* Title */}
              <h4 className="font-display text-xl text-[#E8E4DA] tracking-wider mb-2 group-hover:text-[#C45C1A] transition-colors duration-200">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-[#8A8C85] text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA block */}
      <div className="relative bg-[#111310] border border-[#2A2E27] p-8 sm:p-12 text-center overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #C45C1A 0, #C45C1A 1px, transparent 1px, transparent 50px)",
          }}
        />
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#C45C1A]" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#C45C1A]" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#C45C1A]" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#C45C1A]" />

        <div className="relative z-10">
          <p className="font-mono text-xs text-[#C45C1A] tracking-[0.5em] uppercase mb-4">
            ◆ DISCORD ◆
          </p>
          <h3 className="font-display text-4xl sm:text-5xl text-[#E8E4DA] tracking-wider mb-4">
            {t.cta.title}
          </h3>
          <p className="text-[#8A8C85] text-base max-w-md mx-auto mb-8 leading-relaxed">
            {t.cta.description}
          </p>
          <a
            href="LIEN_DISCORD_ICI"
            target="_blank"
            rel="noopener noreferrer"
            id="recruitment-discord-btn"
            className="inline-flex items-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold px-10 py-4 text-base uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5865F2]/20"
          >
            <svg
              width="22"
              height="17"
              viewBox="0 0 71 55"
              fill="currentColor"
            >
              <path d="M60.1 4.9A58.5 58.5 0 0045.6 1a.22.22 0 00-.23.11 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37.4 37.4 0 0025.5 1.1a.23.23 0 00-.23-.1A58.3 58.3 0 0010.8 4.9C10.7 5 10.6 5 10.6 5.1 1.5 18.7-0.9 32 0.3 45c0 .1.1.1.1.2a58.8 58.8 0 0017.7 9 .23.23 0 00.25-.09 42 42 0 003.6-5.9.23.23 0 00-.12-.32 38.7 38.7 0 01-5.5-2.6.23.23 0 01-.02-.39c.37-.28.74-.57 1.1-.86a.22.22 0 01.23-.03c11.5 5.3 24 5.3 35.4 0a.22.22 0 01.23.02c.36.3.73.59 1.1.87a.23.23 0 01-.02.39 36 36 0 01-5.5 2.6.23.23 0 00-.12.32 47.1 47.1 0 003.6 5.9.22.22 0 00.25.09A58.6 58.6 0 0070.6 45.1c.1-.1.1-.1.1-.2 1.5-15.4-2.5-28.5-10.6-40.1 0-.1-.1-.1-.1-.1zM23.7 37.3c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2zm23.6 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2z" />
            </svg>
            {t.cta.button}
          </a>
        </div>
      </div>
    </div>
  );
}
