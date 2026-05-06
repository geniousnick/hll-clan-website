const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const PLAYERS_FILE = path.join(__dirname, "src/data/players.ts");

// Extract the players array string from the file
let playersContent = fs.readFileSync(PLAYERS_FILE, "utf-8");

async function fetchStats(hllId) {
  const url = `https://hllrecords.com/profiles/${hllId}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5"
    }
  });

  if (!response.ok) {
    console.log(`Failed to fetch ${url} - Status: ${response.status}`);
    return null;
  }
  const html = await response.text();
  const $ = cheerio.load(html);

  let stats = { kd: null, winRate: null, games: null };

  const nextDataEl = $("#__NEXT_DATA__");
  if (nextDataEl.length > 0) {
    try {
      const nextData = JSON.parse(nextDataEl.text());
      const pageProps = nextData?.props?.pageProps || nextData?.props || {};
      const profile = pageProps?.profile || pageProps?.player || pageProps?.data?.profile;
      
      if (profile) {
        let kills = profile.kills ?? profile.total_kills ?? null;
        let deaths = profile.deaths ?? profile.total_deaths ?? null;
        stats.kd = profile.kd ?? profile.kill_death_ratio ?? (kills && deaths ? Math.round((kills/deaths)*100)/100 : null);
        stats.winRate = profile.win_rate ?? profile.winRate ?? profile.win_percentage ?? null;
        stats.games = profile.games_played ?? profile.matches ?? profile.battles ?? null;
      }
    } catch(e) {}
  }

  // Fallback scraping
  if (!stats.kd || !stats.games) {
    const allText = $("body").text();
    const kdMatch = allText.match(/K\/D[:\s]*([0-9]+\.[0-9]+)/i);
    if (kdMatch) stats.kd = parseFloat(kdMatch[1]);
    const winRateMatch = allText.match(/Win\s*Rate[:\s]*([0-9]+(?:\.[0-9]+)?)\s*%/i);
    if (winRateMatch) stats.winRate = parseFloat(winRateMatch[1]);
    const matchesMatch = allText.match(/([0-9,]+)\s*(?:matches?|battles?|games?)/i);
    if (matchesMatch) stats.games = parseFloat(matchesMatch[1].replace(/,/g, ""));
  }

  return stats;
}

async function main() {
  console.log("Extraction des IDs et récupération des stats...");
  
  // RegEx pour trouver chaque bloc de joueur
  const blockRegex = /{\s*id:\s*(\d+),[\s\S]*?hllRecordsId:\s*"([^"]+)",?\s*(?:games:\s*[^,\n]+,?)?\s*(?:winRate:\s*[^,\n]+,?)?\s*(?:kd:\s*[^,\n]+,?)?\s*}/g;
  
  let newContent = playersContent;
  let matches = [...playersContent.matchAll(blockRegex)];
  
  for (const match of matches) {
    const fullMatch = match[0];
    const id = match[1];
    const hllId = match[2];
    
    console.log(`- Fetching stats pour Joueur ${id} (ID: ${hllId.substring(0,8)}...)`);
    const stats = await fetchStats(hllId);
    
    if (stats && (stats.kd || stats.games)) {
      // Nettoyer les anciennes stats si elles existent
      let cleanMatch = fullMatch
        .replace(/,\s*games:\s*[^,\n]+/g, "")
        .replace(/,\s*winRate:\s*[^,\n]+/g, "")
        .replace(/,\s*kd:\s*[^,\n]+/g, "");
      
      // Ajouter les nouvelles stats avant l'accolade finale
      let insertStats = "";
      if (stats.games !== null) insertStats += `,\n    games: ${stats.games}`;
      if (stats.winRate !== null) insertStats += `,\n    winRate: ${Math.round(stats.winRate)}`;
      if (stats.kd !== null) insertStats += `,\n    kd: ${stats.kd}`;
      
      cleanMatch = cleanMatch.replace(/\s*}$/, `${insertStats}\n  }`);
      
      newContent = newContent.replace(fullMatch, cleanMatch);
    } else {
        console.log(`  -> No stats found for ${hllId}`);
    }
    
    // Pause pour ne pas spammer hllrecords
    await new Promise(r => setTimeout(r, 1000));
  }
  
  fs.writeFileSync(PLAYERS_FILE, newContent);
  console.log("Fichier players.ts mis à jour avec succès !");
}

main();
