"use client";

import { useState, useCallback } from "react";
import { players } from "@/data/players";
import { translations, Lang } from "@/data/translations";

interface StatsRefreshButtonProps {
  lang: Lang;
  onRefreshStart?: () => void;
  onRefreshComplete?: () => void;
}

export default function StatsRefreshButton({
  lang,
  onRefreshStart,
  onRefreshComplete,
}: StatsRefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  // Uniquement les joueurs avec un hllRecordsId configuré
  const linkedPlayers = players.filter((p) => p.hllRecordsId);

  const handleRefresh = useCallback(async () => {
    if (isRefreshing || linkedPlayers.length === 0) return;

    setIsRefreshing(true);
    onRefreshStart?.();

    // Rafraîchir tous les profils liés en parallèle
    await Promise.allSettled(
      linkedPlayers.map((p) =>
        fetch(`/api/hll-stats?hllId=${p.hllRecordsId}&force=true`).catch(
          () => null
        )
      )
    );

    setLastRefreshed(new Date());
    setIsRefreshing(false);
    onRefreshComplete?.();
  }, [isRefreshing, linkedPlayers, onRefreshStart, onRefreshComplete]);

  // Ne pas afficher si aucun joueur n'est lié
  if (linkedPlayers.length === 0) {
    return (
      <div className="flex items-center gap-2 text-[#3A3B33] text-xs font-mono">
        <span>⚠</span>
        <span>
          {lang === "fr"
            ? "Aucun joueur lié à HLL Records — ajoutez les IDs dans players.ts"
            : "No players linked to HLL Records — add IDs in players.ts"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        id="refresh-stats-btn"
        className={`inline-flex items-center gap-2 border px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-200 ${
          isRefreshing
            ? "border-[#3A3B33] text-[#3A3B33] cursor-not-allowed"
            : "border-[#4A5240] text-[#8A8C85] hover:border-[#C45C1A] hover:text-[#C45C1A]"
        }`}
      >
        {/* Icône spinner ou refresh */}
        <span
          className={`text-base ${isRefreshing ? "animate-spin inline-block" : ""}`}
        >
          {isRefreshing ? "⟳" : "🔄"}
        </span>
        {isRefreshing
          ? lang === "fr"
            ? `Mise à jour (${linkedPlayers.length} joueurs)…`
            : `Updating (${linkedPlayers.length} players)…`
          : lang === "fr"
          ? "Rafraîchir les stats HLL Records"
          : "Refresh HLL Records Stats"}
      </button>

      {/* Indicateur dernière mise à jour */}
      <div className="flex items-center gap-2 text-[#3A3B33] text-xs font-mono">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            linkedPlayers.length > 0 ? "bg-[#8A9B56]" : "bg-[#3A3B33]"
          }`}
        />
        <span>
          {linkedPlayers.length}{" "}
          {lang === "fr" ? "joueur(s) lié(s) à HLL Records" : "player(s) linked to HLL Records"}
        </span>
        {lastRefreshed && (
          <span>
            · {lang === "fr" ? "mis à jour" : "updated"}{" "}
            {lastRefreshed.toLocaleTimeString(lang === "fr" ? "fr-FR" : "en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </div>
  );
}
