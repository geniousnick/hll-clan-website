// Match history data for La 9ème Ombre [L9O]

export type MatchResult = "win" | "loss" | "draw";

export interface Match {
  id: number;
  date: string;
  opponent: string;
  map: string;
  scoreL9O: number;
  scoreOpponent: number;
  result: MatchResult;
  competition?: string;
}

export const matches: Match[] = [
  {
    id: 1,
    date: "2026-04-28",
    opponent: "Iron Division",
    map: "Foy",
    scoreL9O: 5,
    scoreOpponent: 2,
    result: "win",
    competition: "Ligue FR #12",
  },
  {
    id: 2,
    date: "2026-04-21",
    opponent: "Black Wolf Unit",
    map: "Kursk",
    scoreL9O: 3,
    scoreOpponent: 5,
    result: "loss",
    competition: "Ligue FR #12",
  },
  {
    id: 3,
    date: "2026-04-14",
    opponent: "Ghost Company",
    map: "Omaha Beach",
    scoreL9O: 5,
    scoreOpponent: 1,
    result: "win",
    competition: "Ligue FR #12",
  },
  {
    id: 4,
    date: "2026-04-07",
    opponent: "Wehrmacht Elite",
    map: "Stalingrad",
    scoreL9O: 4,
    scoreOpponent: 4,
    result: "draw",
    competition: "Ligue FR #12",
  },
  {
    id: 5,
    date: "2026-03-31",
    opponent: "Vanguard Squad",
    map: "Hurtgen Forest",
    scoreL9O: 5,
    scoreOpponent: 0,
    result: "win",
    competition: "Coupe Mars",
  },
  {
    id: 6,
    date: "2026-03-24",
    opponent: "Desert Foxes",
    map: "Purple Heart Lane",
    scoreL9O: 5,
    scoreOpponent: 3,
    result: "win",
    competition: "Coupe Mars",
  },
  {
    id: 7,
    date: "2026-03-17",
    opponent: "Tempest Company",
    map: "Remagen",
    scoreL9O: 2,
    scoreOpponent: 5,
    result: "loss",
    competition: "Coupe Mars",
  },
  {
    id: 8,
    date: "2026-03-10",
    opponent: "Shadow Hunters",
    map: "El Alamein",
    scoreL9O: 5,
    scoreOpponent: 2,
    result: "win",
    competition: "Coupe Mars",
  },
];

export const getStats = (matchList: Match[]) => {
  const wins = matchList.filter((m) => m.result === "win").length;
  const losses = matchList.filter((m) => m.result === "loss").length;
  const draws = matchList.filter((m) => m.result === "draw").length;
  const total = matchList.length;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
  return { wins, losses, draws, total, winRate };
};
