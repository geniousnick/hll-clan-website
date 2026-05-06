"use client";

import { useLang } from "@/components/layout/ClientLayout";
import { translations } from "@/data/translations";
import RosterSection from "@/components/roster/RosterSection";

export default function RosterPage() {
  const { lang } = useLang();
  const t = translations[lang].roster;

  return (
    <div className="min-h-screen bg-[#0C0D0B] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-16 border-b border-[#2A2E27] pb-10">
          <span className="font-mono text-xs text-[#C45C1A] tracking-[0.5em] uppercase block mb-4">
            ◆ [L9O] ◆
          </span>
          <h1 className="font-display text-5xl sm:text-7xl text-[#E8E4DA] tracking-wide mb-4">
            {t.title}
          </h1>
          <p className="text-[#5A5C50] font-mono text-sm tracking-widest uppercase">
            {t.subtitle}
          </p>
        </div>

        {/* Roster */}
        <RosterSection lang={lang} />
      </div>
    </div>
  );
}
