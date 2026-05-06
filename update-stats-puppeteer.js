const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PLAYERS_FILE = path.join(__dirname, 'src/data/players.ts');
let playersContent = fs.readFileSync(PLAYERS_FILE, 'utf-8');

async function fetchStats(page, hllId) {
  const url = `https://hllrecords.com/profiles/${hllId}`;
  await page.goto(url, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000)); // wait for rendering
  
  const html = await page.content();
  const $ = cheerio.load(html);
  
  let stats = { kills: null, winRate: null, highestKills: null };
  const allText = $('body').text().replace(/\s+/g, ' ');

  // Total Kills
  const killsMatch = allText.match(/Total kills([0-9,]+)/i) || allText.match(/Kills([0-9,]+)\s*\(/i);
  if (killsMatch) {
    stats.kills = parseInt(killsMatch[1].replace(/,/g, ''), 10);
  }

  // Win Rate
  const winRateMatch = allText.match(/Win\s*Rate([0-9]+(?:\.[0-9]+)?)\s*%/i) || allText.match(/([0-9]+(?:\.[0-9]+)?)%\s*Win\s*Rate/i) || allText.match(/([0-9]+)%Defense/i);
  // Actually, in the dump it was "ore56%Defense44%Offense" where 56 is the win rate (score56%Defense). Wait, "Overall K/D ratio0.96". 
  // Let's use a broader regex for Win Rate
  if (!stats.winRate) {
     const wrMatch = allText.match(/([0-9]{1,3})%Defense/i) || allText.match(/Win\s*Rate([0-9]+(?:\.[0-9]+)?)\s*%/i);
     if (wrMatch) stats.winRate = parseInt(wrMatch[1], 10);
  }

  // Highest Kills (Record)
  const highestMatch = allText.match(/Most kills matches(?:Show more)?([0-9,]+)\s*kills/i) || allText.match(/Most kills in one game(?:Show more)?(?:Infantry)?([0-9,]+)/i);
  if (highestMatch) {
    stats.highestKills = parseInt(highestMatch[1].replace(/,/g, ''), 10);
  } else {
    // try to find just "Most kills... " followed by a number
    const fallbackMatch = allText.match(/Most kills.*?([0-9]+)\s*kills/i);
    if (fallbackMatch) stats.highestKills = parseInt(fallbackMatch[1].replace(/,/g, ''), 10);
  }

  return stats;
}

async function main() {
  console.log("Lancement de Puppeteer...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  const blockRegex = /{\s*id:\s*(\d+),[\s\S]*?hllRecordsId:\s*"([^"]+)",?\s*(?:winRate:\s*[^,\n]+,?)?\s*(?:kills:\s*[^,\n]+,?)?\s*(?:highestKills:\s*[^,\n]+,?)?\s*}/g;
  
  let newContent = playersContent;
  let matches = [...playersContent.matchAll(blockRegex)];
  
  for (const match of matches) {
    const fullMatch = match[0];
    const id = match[1];
    const hllId = match[2];
    
    console.log(`- Fetching stats pour Joueur ${id} (ID: ${hllId.substring(0,8)}...)`);
    try {
      const stats = await fetchStats(page, hllId);
      console.log(`  -> Kills: ${stats.kills}, WinRate: ${stats.winRate}%, Record: ${stats.highestKills}`);
      
      if (stats && (stats.kills !== null || stats.highestKills !== null)) {
        let cleanMatch = fullMatch
          .replace(/,\s*winRate:\s*[^,\n]+/g, "")
          .replace(/,\s*kills:\s*[^,\n]+/g, "")
          .replace(/,\s*highestKills:\s*[^,\n]+/g, "");
        
        let insertStats = "";
        if (stats.winRate !== null && !isNaN(stats.winRate)) insertStats += `,\n    winRate: ${stats.winRate}`;
        if (stats.kills !== null && !isNaN(stats.kills)) insertStats += `,\n    kills: ${stats.kills}`;
        if (stats.highestKills !== null && !isNaN(stats.highestKills)) insertStats += `,\n    highestKills: ${stats.highestKills}`;
        
        cleanMatch = cleanMatch.replace(/\s*}$/, `${insertStats}\n  }`);
        newContent = newContent.replace(fullMatch, cleanMatch);
      }
    } catch(e) {
      console.log("  -> Erreur: " + e.message);
    }
  }
  
  fs.writeFileSync(PLAYERS_FILE, newContent);
  console.log("Fichier players.ts mis à jour !");
  await browser.close();
}

main();
