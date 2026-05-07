"use client";

import { players, roleOrder, PlayerRole } from "@/data/players";
import { translations, Lang } from "@/data/translations";
import PlayerCard from "./PlayerCard";

interface RosterSectionProps {
  lang: Lang;
}

const roleIcons: Record<PlayerRole, string> = {
  commander: "🎖️",
  artillery: "💣",
  squadLeader: "⭐",
  infantry: "🪖",
  armor: "🛡️",
  recon: "🔭",
};

export default function RosterSection({ lang }: RosterSectionProps) {
  const t = translations[lang].roster;

  return (
    <div className="space-y-16">
      {/* Barre info HLL Records */}
      <div className="flex items-center gap-3 p-4 bg-[#0C0D0B] border border-[#2A2E27]">
        <div className="w-7 h-7 bg-[#1E2318] border border-[#3A3B33] flex items-center justify-center text-xs font-mono text-[#8A8C85]">
          📊
        </div>
        <div>
          <p className="text-[#8A8C85] text-xs font-mono uppercase tracking-widest">
            HLL Records
          </p>
          <p className="text-[#3A3B33] text-[10px] font-mono">
            {lang === "fr"
              ? "Stats mises à jour automatiquement chaque nuit"
              : "Stats auto-updated every night"}
          </p>
        </div>
      </div>

      {/* Grille par rôle */}
      {roleOrder.map((role) => {
        const rolePlayers = players.filter((p) => p.role === role);
        if (rolePlayers.length === 0) return null;

        const roleLabel = t.roles[role];

        return (
          <div key={role} id={`role-${role}`}>
            {/* En-tête de rôle */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl">{roleIcons[role]}</span>
              <div className="flex-1">
                <h3 className="font-display text-2xl sm:text-3xl text-[#E8E4DA] tracking-widest uppercase">
                  {roleLabel}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="h-px flex-1 bg-[#2A2E27]" />
                  <span className="font-mono text-[#5A5C50] text-xs">
                    {rolePlayers.length}{" "}
                    {lang === "fr" ? "joueur" : "player"}
                    {rolePlayers.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Cartes joueurs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {rolePlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  lang={lang}
                  forceRefresh={false}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
