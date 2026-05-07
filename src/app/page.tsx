"use client";

import HeroBanner from "@/components/home/HeroBanner";
import PhilosophySection from "@/components/home/PhilosophySection";
import { useLang } from "@/components/layout/ClientLayout";
import Link from "next/link";
import { translations } from "@/data/translations";

import ServerStatusWidget from "@/components/home/ServerStatusWidget";

export default function HomePage() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <>
      <HeroBanner lang={lang} />
      
      {/* Widget du Serveur HLL */}
      <section className="bg-[#0C0D0B] relative z-20 px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <ServerStatusWidget />
      </section>

      <PhilosophySection lang={lang} />

      {/* Quick links teaser section */}
      <section className="py-20 bg-[#080908] border-t border-[#1E2318]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                href: "/roster",
                icon: "🪖",
                title: lang === "fr" ? "Effectif" : "Roster",
                desc:
                  lang === "fr"
                    ? `${14} soldats en opération`
                    : `${14} soldiers on duty`,
              },
              {
                href: "/matches",
                icon: "⚔️",
                title: lang === "fr" ? "Palmarès" : "Results",
                desc:
                  lang === "fr"
                    ? "Historique de nos matchs officiels"
                    : "Official match history",
              },
              {
                href: "/recrutement",
                icon: "📋",
                title: lang === "fr" ? "Recrutement" : "Recruitment",
                desc:
                  lang === "fr"
                    ? "Rejoindre l'Ombre"
                    : "Join the Shadow",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                id={`home-link-${item.href.replace("/", "")}`}
                className="group bg-[#111310] border border-[#2A2E27] hover:border-[#C45C1A]/40 p-6 flex items-center gap-4 transition-all duration-300 hover:bg-[#161A13]"
              >
                <span className="text-3xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-[#E8E4DA] font-display text-xl tracking-wider group-hover:text-[#C45C1A] transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[#5A5C50] text-xs font-mono mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <span className="text-[#3A3B33] group-hover:text-[#C45C1A] transition-colors text-xl">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
