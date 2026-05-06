import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

const CACHE_DIR = path.join(process.cwd(), ".hll-cache");
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 heures

interface HLLStats {
  pseudo: string;
  level: number | null;
  kills: number | null;
  deaths: number | null;
  kd: number | null;
  kpm: number | null;
  winRate: number | null;
  gamesPlayed: number | null;
  hoursPlayed: number | null;
  profileUrl: string;
  lastUpdated: string;
}

function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function getCachePath(hllId: string): string {
  // Sanitize ID to be safe as a filename
  const safeId = hllId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(CACHE_DIR, `${safeId}.json`);
}

function readCache(hllId: string): HLLStats | null {
  try {
    const cachePath = getCachePath(hllId);
    if (!fs.existsSync(cachePath)) return null;
    const raw = fs.readFileSync(cachePath, "utf-8");
    const data = JSON.parse(raw) as HLLStats;
    const age = Date.now() - new Date(data.lastUpdated).getTime();
    if (age > CACHE_TTL_MS) return null; // Cache expiré
    return data;
  } catch {
    return null;
  }
}

function writeCache(hllId: string, data: HLLStats) {
  try {
    ensureCacheDir();
    fs.writeFileSync(getCachePath(hllId), JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("[hll-cache] Erreur écriture cache:", err);
  }
}

function parseNumber(str: string | undefined): number | null {
  if (!str) return null;
  const cleaned = str.replace(/[^0-9.,]/g, "").replace(",", ".");
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

async function scrapeHLLProfile(hllId: string): Promise<HLLStats> {
  const profileUrl = `https://hllrecords.com/profiles/${hllId}`;

  const response = await fetch(profileUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8",
    },
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} pour ${profileUrl}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Extraire les données de __NEXT_DATA__ si disponible
  const nextDataEl = $("#__NEXT_DATA__");
  let stats: Partial<HLLStats> = {};

  if (nextDataEl.length > 0) {
    try {
      const nextData = JSON.parse(nextDataEl.text());
      // hllrecords injecte les props dans pageProps
      const pageProps =
        nextData?.props?.pageProps ||
        nextData?.props ||
        {};

      // Tenter d'extraire depuis les props Next.js
      const profile = pageProps?.profile || pageProps?.player || pageProps?.data?.profile;

      if (profile) {
        stats.pseudo = profile.name || profile.username || profile.pseudo || "";
        stats.level = profile.level ?? null;
        stats.kills = profile.kills ?? profile.total_kills ?? null;
        stats.deaths = profile.deaths ?? profile.total_deaths ?? null;
        stats.kd =
          profile.kd ??
          profile.kill_death_ratio ??
          (stats.kills && stats.deaths && stats.deaths > 0
            ? Math.round((stats.kills / stats.deaths) * 100) / 100
            : null);
        stats.kpm = profile.kpm ?? profile.kills_per_minute ?? null;
        stats.winRate =
          profile.win_rate ??
          profile.winRate ??
          profile.win_percentage ??
          null;
        stats.gamesPlayed =
          profile.games_played ??
          profile.matches ??
          profile.battles ??
          null;
        stats.hoursPlayed =
          profile.hours ??
          profile.hours_played ??
          profile.playtime_hours ??
          null;
      }
    } catch (e) {
      console.warn("[hll-scraper] Impossible de parser __NEXT_DATA__:", e);
    }
  }

  // Fallback : scraping HTML si __NEXT_DATA__ n'a pas donné de résultats
  if (!stats.kills && !stats.level) {
    // Pseudo du joueur
    const pseudoEl =
      $("h1").first().text().trim() ||
      $('[class*="name"]').first().text().trim() ||
      $('[class*="player"]').first().text().trim();
    stats.pseudo = pseudoEl || "";

    // Chercher les stats dans les éléments textuels
    // hllrecords affiche les stats dans des cartes avec label + valeur
    const statCards: string[] = [];
    $('[class*="stat"], [class*="card"], [class*="metric"], dt, dd').each((_, el) => {
      statCards.push($(el).text().trim());
    });

    // Regex patterns pour extraire les valeurs
    const allText = $("body").text();

    const kdMatch = allText.match(/K\/D[:\s]*([0-9]+\.[0-9]+)/i);
    if (kdMatch) stats.kd = parseNumber(kdMatch[1]);

    const kpmMatch = allText.match(/KPM[:\s]*([0-9]+\.[0-9]+)/i);
    if (kpmMatch) stats.kpm = parseNumber(kpmMatch[1]);

    const winRateMatch = allText.match(/Win\s*Rate[:\s]*([0-9]+(?:\.[0-9]+)?)\s*%/i);
    if (winRateMatch) stats.winRate = parseNumber(winRateMatch[1]);

    const killsMatch = allText.match(/(?:Total\s*)?Kills?[:\s]*([0-9,]+)/i);
    if (killsMatch) stats.kills = parseNumber(killsMatch[1]);

    const deathsMatch = allText.match(/(?:Total\s*)?Deaths?[:\s]*([0-9,]+)/i);
    if (deathsMatch) stats.deaths = parseNumber(deathsMatch[1]);

    const levelMatch = allText.match(/Level[:\s]*([0-9]+)/i);
    if (levelMatch) stats.level = parseNumber(levelMatch[1]);

    const hoursMatch = allText.match(/([0-9,]+(?:\.[0-9]+)?)\s*hours?/i);
    if (hoursMatch) stats.hoursPlayed = parseNumber(hoursMatch[1]);

    const matchesMatch = allText.match(/([0-9,]+)\s*(?:matches?|battles?|games?)/i);
    if (matchesMatch) stats.gamesPlayed = parseNumber(matchesMatch[1]);
  }

  // Calculer K/D si manquant
  if (!stats.kd && stats.kills && stats.deaths && stats.deaths > 0) {
    stats.kd = Math.round((stats.kills / stats.deaths) * 100) / 100;
  }

  return {
    pseudo: stats.pseudo || "",
    level: stats.level ?? null,
    kills: stats.kills ?? null,
    deaths: stats.deaths ?? null,
    kd: stats.kd ?? null,
    kpm: stats.kpm ?? null,
    winRate: stats.winRate ?? null,
    gamesPlayed: stats.gamesPlayed ?? null,
    hoursPlayed: stats.hoursPlayed ?? null,
    profileUrl,
    lastUpdated: new Date().toISOString(),
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hllId = searchParams.get("hllId");
  const forceRefresh = searchParams.get("force") === "true";

  if (!hllId) {
    return NextResponse.json(
      { error: "Paramètre hllId requis" },
      { status: 400 }
    );
  }

  // Vérifier le cache sauf si force=true
  if (!forceRefresh) {
    const cached = readCache(hllId);
    if (cached) {
      return NextResponse.json({ ...cached, fromCache: true });
    }
  }

  // Scraper le profil
  try {
    const stats = await scrapeHLLProfile(hllId);
    writeCache(hllId, stats);
    return NextResponse.json({ ...stats, fromCache: false });
  } catch (error) {
    console.error("[hll-stats] Erreur scraping:", error);

    // Retourner le cache même expiré en cas d'erreur
    const staleCache = (() => {
      try {
        const cachePath = getCachePath(hllId);
        if (fs.existsSync(cachePath)) {
          return JSON.parse(fs.readFileSync(cachePath, "utf-8")) as HLLStats;
        }
      } catch { /* silent */ }
      return null;
    })();

    if (staleCache) {
      return NextResponse.json({
        ...staleCache,
        fromCache: true,
        stale: true,
      });
    }

    return NextResponse.json(
      {
        error: "Impossible de récupérer les stats",
        message: String(error),
      },
      { status: 502 }
    );
  }
}
