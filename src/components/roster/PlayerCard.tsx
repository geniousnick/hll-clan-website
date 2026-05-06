"use client";

import { useState, useEffect, useCallback } from "react";
import { Player } from "@/data/players";
import { translations, Lang } from "@/data/translations";

interface PlayerCardProps {
  player: Player;
  lang: Lang;
  forceRefresh?: boolean; // déclenché depuis le bouton global "Rafraîchir"
}

// Stats retournées par notre API /api/hll-stats
interface HLLLiveStats {
  pseudo?: string;
  level?: number | null;
  kills?: number | null;
  highestKills?: number | null;
  deaths?: number | null;
  kd?: number | null;
  kpm?: number | null;
  winRate?: number | null;
  gamesPlayed?: number | null;
  hoursPlayed?: number | null;
  profileUrl?: string;
  lastUpdated?: string;
  fromCache?: boolean;
  stale?: boolean;
  error?: string;
}

type FetchStatus = "idle" | "loading" | "success" | "error";

const gradeColors: Record<string, string> = {
  Fondateur: "#C45C1A",
  Officier: "#8A9B56",
  "Sous-Officier": "#6B7A3E",
  Soldat: "#5A5C50",
  Recrue: "#3A3B33",
};

const gradeLabel: Record<string, { fr: string; en: string }> = {
  Fondateur: { fr: "Fondateur", en: "Founder" },
  Officier: { fr: "Officier", en: "Officer" },
  "Sous-Officier": { fr: "Sous-Officier", en: "NCO" },
  Soldat: { fr: "Soldat", en: "Soldier" },
  Recrue: { fr: "Recrue", en: "Recruit" },
};

function formatRelativeTime(isoDate: string, lang: Lang): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (lang === "fr") {
    if (minutes < 2) return "à l'instant";
    if (hours < 1) return `il y a ${minutes} min`;
    if (days < 1) return `il y a ${hours}h`;
    return `il y a ${days}j`;
  } else {
    if (minutes < 2) return "just now";
    if (hours < 1) return `${minutes}m ago`;
    if (days < 1) return `${hours}h ago`;
    return `${days}d ago`;
  }
}

export default function PlayerCard({
  player,
  lang,
  forceRefresh,
}: PlayerCardProps) {
  const t = translations[lang].roster;
  const gradeColor = gradeColors[player.grade] || "#5A5C50";
  const gradeLabelText = gradeLabel[player.grade]?.[lang] ?? player.grade;

  const [liveStats, setLiveStats] = useState<HLLLiveStats | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");

  // Avatar avec initiales
  const initials = player.pseudo
    .split(/(?=[A-Z_])|_/)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const fetchStats = useCallback(
    async (force = false) => {
      if (!player.hllRecordsId) return; // Pas d'ID = stats manuelles seulement
      setStatus("loading");
      try {
        const url = `/api/hll-stats?hllId=${player.hllRecordsId}${force ? "&force=true" : ""}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: HLLLiveStats = await res.json();
        if (data.error) throw new Error(data.error);
        setLiveStats(data);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    },
    [player.hllRecordsId]
  );

  // Fetch au montage
  useEffect(() => {
    fetchStats(false);
  }, [fetchStats]);

  // Réagir au force refresh global
  useEffect(() => {
    if (forceRefresh) {
      fetchStats(true);
    }
  }, [forceRefresh, fetchStats]);

  // Valeurs affichées : live si disponibles, sinon manuelles
  const displayKills =
    liveStats?.kills !== undefined && liveStats.kills !== null
      ? liveStats.kills
      : player.kills ?? "—";

  const displayHighestKills =
    liveStats?.highestKills !== undefined && liveStats.highestKills !== null
      ? liveStats.highestKills
      : player.highestKills ?? "—";

  const displayWinRate =
    liveStats?.winRate !== undefined && liveStats.winRate !== null
      ? `${Math.round(liveStats.winRate)}%`
      : player.winRate !== undefined
      ? `${player.winRate}%`
      : "—";

  const isLive = status === "success" && player.hllRecordsId;
  const hasLink = player.hllRecordsId && liveStats?.profileUrl;

  return (
    <div className="group relative bg-[#111310] border border-[#2A2E27] hover:border-[#C45C1A]/40 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Barre supérieure couleur grade */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: gradeColor }}
      />

      <div className="p-5 flex-1 flex flex-col">
        {/* En-tête */}
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <div
            className="w-11 h-11 flex-shrink-0 flex items-center justify-center font-display text-base tracking-wider border-2 transition-colors duration-300"
            style={{
              backgroundColor: `${gradeColor}15`,
              borderColor: `${gradeColor}40`,
              color: gradeColor,
            }}
          >
            {initials}
          </div>

          {/* Nom + rôle */}
          <div className="flex-1 min-w-0">
            <p className="text-[#E8E4DA] font-semibold text-sm truncate leading-tight mb-0.5">
              {player.pseudo}
            </p>
            {player.specialty && (
              <p className="text-[#8A8C85] text-xs truncate font-mono">
                {player.specialty}
              </p>
            )}
          </div>

          {/* Indicateur live / statut */}
          <div className="flex-shrink-0">
            {status === "loading" && (
              <div
                className="w-3 h-3 border border-[#C45C1A]/50 border-t-[#C45C1A] rounded-full animate-spin"
                title="Chargement..."
              />
            )}
            {status === "success" && isLive && (
              <span
                className="inline-block w-2 h-2 rounded-full bg-[#8A9B56] animate-pulse"
                title={`Live — mis à jour ${formatRelativeTime(liveStats!.lastUpdated!, lang)}`}
              />
            )}
            {status === "error" && (
              <span
                className="text-[#C45C1A] text-xs font-mono"
                title="Impossible de récupérer les stats"
              >
                ⚠
              </span>
            )}
          </div>
        </div>

        {/* Grade */}
        <div className="mb-3">
          <span
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider px-2 py-1 border"
            style={{
              color: gradeColor,
              borderColor: `${gradeColor}40`,
              backgroundColor: `${gradeColor}10`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: gradeColor }}
            />
            {gradeLabelText}
          </span>
        </div>

        {/* Stats */}
        <div className="border-t border-[#1E2318] pt-3 mt-auto">
          <div className="grid grid-cols-3 gap-1">
            {/* Kills */}
            <div className="text-center">
              <p className="font-display text-base leading-none text-[#C45C1A]">
                {displayKills}
              </p>
              <p className="text-[#5A5C50] text-[10px] font-mono uppercase tracking-wider mt-0.5">
                {t.stats.kills}
              </p>
            </div>

            {/* Win rate */}
            <div className="text-center border-x border-[#1E2318]">
              <p className="font-display text-base leading-none text-[#8A9B56]">
                {displayWinRate}
              </p>
              <p className="text-[#5A5C50] text-[10px] font-mono uppercase tracking-wider mt-0.5">
                {t.stats.winRate}
              </p>
            </div>

            {/* Record Kills */}
            <div className="text-center">
              <p className="font-display text-base leading-none text-[#B0B2A8]">
                {displayHighestKills}
              </p>
              <p className="text-[#5A5C50] text-[10px] font-mono uppercase tracking-wider mt-0.5">
                {t.stats.highestKills}
              </p>
            </div>
          </div>

          {/* Stats supplémentaires si live */}
          {isLive && liveStats && (
            <div className="mt-2 pt-2 border-t border-[#1E2318] flex items-center justify-between">
              <div className="flex gap-3">
                {liveStats.level !== null && liveStats.level !== undefined && (
                  <span className="text-[#5A5C50] text-[10px] font-mono">
                    Lvl{" "}
                    <span className="text-[#8A8C85]">{liveStats.level}</span>
                  </span>
                )}
                {liveStats.kpm !== null && liveStats.kpm !== undefined && (
                  <span className="text-[#5A5C50] text-[10px] font-mono">
                    KPM{" "}
                    <span className="text-[#8A8C85]">
                      {liveStats.kpm.toFixed(2)}
                    </span>
                  </span>
                )}
              </div>
              {/* Lien vers profil HLL Records */}
              {hasLink && (
                <a
                  href={liveStats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3A3B33] hover:text-[#C45C1A] text-[10px] font-mono transition-colors"
                  title="Voir sur HLL Records"
                >
                  hllrecords ↗
                </a>
              )}
            </div>
          )}

          {/* Lien vers HLL Records si ID configuré mais pas encore chargé */}
          {!isLive && player.hllRecordsId && status !== "loading" && (
            <div className="mt-2 pt-2 border-t border-[#1E2318]">
              <a
                href={`https://hllrecords.com/profiles/${player.hllRecordsId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3A3B33] hover:text-[#C45C1A] text-[10px] font-mono transition-colors"
              >
                hllrecords ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
