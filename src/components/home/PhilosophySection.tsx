"use client";

import { useEffect, useRef } from "react";
import { translations, Lang } from "@/data/translations";

interface PhilosophySectionProps {
  lang: Lang;
}

export default function PhilosophySection({ lang }: PhilosophySectionProps) {
  const t = translations[lang].philosophy;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".philosophy-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-[#0C0D0B] relative overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #E8E4DA 0, #E8E4DA 1px, transparent 1px, transparent 80px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#C45C1A] tracking-[0.5em] uppercase block mb-4">
            ◆ DOCTRINE ◆
          </span>
          <h2 className="font-display text-5xl sm:text-6xl text-[#E8E4DA] tracking-wide mb-4">
            {t.title}
          </h2>
          <p className="text-[#5A5C50] font-mono text-sm tracking-widest uppercase">
            {t.subtitle}
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#3A3B33]" />
            <span className="text-[#C45C1A]">◆</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#3A3B33]" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.cards.map((card, index) => (
            <div
              key={index}
              className="philosophy-card group relative bg-[#111310] border border-[#2A2E27] hover:border-[#C45C1A]/40 p-8 transition-all duration-500 hover:bg-[#161A13]"
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: `opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, background-color 0.3s ease`,
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C45C1A]/30 group-hover:border-[#C45C1A] transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C45C1A]/30 group-hover:border-[#C45C1A] transition-colors duration-300" />

              {/* Icon */}
              <div className="text-4xl mb-6">{card.icon}</div>

              {/* Number */}
              <div className="font-mono text-[#3A3B33] text-xs tracking-widest mb-3 group-hover:text-[#C45C1A]/50 transition-colors">
                0{index + 1} —
              </div>

              {/* Title */}
              <h3 className="font-display text-3xl text-[#E8E4DA] tracking-wider mb-4 group-hover:text-[#C45C1A] transition-colors duration-300">
                {card.title}
              </h3>

              {/* Divider */}
              <div className="w-8 h-px bg-[#C45C1A]/40 mb-4 group-hover:w-16 transition-all duration-300" />

              {/* Description */}
              <p className="text-[#8A8C85] text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
