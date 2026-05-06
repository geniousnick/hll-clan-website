"use client";

import { matches, getStats, Match, MatchResult } from "@/data/matches";
import { translations, Lang } from "@/data/translations";

interface MatchTableProps {
  lang: Lang;
}

const resultConfig: Record<
  MatchResult,
  { bg: string; text: string; border: string; dot: string }
> = {
  win: {
    bg: "bg-[#6B7A3E]/10",
    text: "text-[#8A9B56]",
    border: "border-[#6B7A3E]/30",
    dot: "bg-[#8A9B56]",
  },
  loss: {
    bg: "bg-[#7A2E08]/10",
    text: "text-[#C45C1A]",
    border: "border-[#7A2E08]/30",
    dot: "bg-[#C45C1A]",
  },
  draw: {
    bg: "bg-[#3A3B33]/20",
    text: "text-[#8A8C85]",
    border: "border-[#3A3B33]",
    dot: "bg-[#8A8C85]",
  },
};

function formatDate(dateStr: string, lang: Lang): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function MatchTable({ lang }: MatchTableProps) {
  const t = translations[lang].matches;
  const stats = getStats(matches);

  return (
    <div>
      {/* Stats banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { label: t.stats.totalMatches, value: stats.total, color: "#E8E4DA" },
          { label: t.stats.wins, value: stats.wins, color: "#8A9B56" },
          { label: t.stats.losses, value: stats.losses, color: "#C45C1A" },
          { label: t.stats.winRate, value: `${stats.winRate}%`, color: "#C45C1A" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111310] border border-[#2A2E27] p-5 text-center"
          >
            <p
              className="font-display text-4xl mb-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="text-[#5A5C50] text-xs font-mono uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Match table — desktop */}
      <div className="hidden md:block border border-[#2A2E27] overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_1.5fr_1.5fr_auto_auto] bg-[#111310] border-b border-[#2A2E27]">
          {[t.columns.date, t.columns.opponent, t.columns.map, t.columns.score, t.columns.result].map((col) => (
            <div
              key={col}
              className="px-5 py-4 text-[#5A5C50] text-xs font-mono uppercase tracking-widest"
            >
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {matches.map((match, index) => {
          const rc = resultConfig[match.result];
          return (
            <div
              key={match.id}
              className={`grid grid-cols-[1fr_1.5fr_1.5fr_auto_auto] border-b border-[#1E2318] last:border-b-0 transition-colors hover:bg-[#161A13] ${
                index % 2 === 0 ? "bg-[#0C0D0B]" : "bg-[#111310]"
              }`}
            >
              <div className="px-5 py-4">
                <span className="text-[#8A8C85] text-sm font-mono">
                  {formatDate(match.date, lang)}
                </span>
                {match.competition && (
                  <p className="text-[#3A3B33] text-xs font-mono mt-0.5">
                    {match.competition}
                  </p>
                )}
              </div>
              <div className="px-5 py-4 flex items-center">
                <span className="text-[#E8E4DA] text-sm font-medium">
                  {match.opponent}
                </span>
              </div>
              <div className="px-5 py-4 flex items-center">
                <span className="text-[#8A8C85] text-sm font-mono">
                  {match.map}
                </span>
              </div>
              <div className="px-5 py-4 flex items-center">
                <span className="font-mono text-sm">
                  <span className="text-[#8A9B56]">{match.scoreL9O}</span>
                  <span className="text-[#3A3B33]"> — </span>
                  <span className="text-[#C45C1A]">{match.scoreOpponent}</span>
                </span>
              </div>
              <div className="px-5 py-4 flex items-center">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase tracking-wider border ${rc.bg} ${rc.text} ${rc.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${rc.dot}`} />
                  {t.results[match.result]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Match cards — mobile */}
      <div className="md:hidden space-y-3">
        {matches.map((match) => {
          const rc = resultConfig[match.result];
          return (
            <div
              key={match.id}
              className="bg-[#111310] border border-[#2A2E27] p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#E8E4DA] font-medium">{match.opponent}</p>
                  <p className="text-[#5A5C50] text-xs font-mono mt-0.5">
                    {formatDate(match.date, lang)} · {match.map}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono uppercase tracking-wider border ${rc.bg} ${rc.text} ${rc.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${rc.dot}`} />
                  {t.results[match.result]}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[#1E2318] pt-3">
                <span className="text-[#5A5C50] text-xs font-mono uppercase">Score</span>
                <span className="font-mono text-sm">
                  <span className="text-[#8A9B56]">{match.scoreL9O}</span>
                  <span className="text-[#3A3B33]"> — </span>
                  <span className="text-[#C45C1A]">{match.scoreOpponent}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
