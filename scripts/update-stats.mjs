#!/usr/bin/env node
// ─── Script de mise à jour automatique des stats HLL Records ───────────────
// Exécuté chaque nuit à minuit CET via GitHub Actions.
// Utilise Puppeteer pour contourner la protection CDN de hllrecords.com.
// ────────────────────────────────────────────────────────────────────────────

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PLAYERS_FILE = path.join(__dirname, "..", "src", "data", "players.ts");

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Scrape un profil HLL Records ────────────────────────────────────────────
async function scrapePlayer(page, hllId) {
  const url = `https://hllrecords.com/profiles/${hllId}`;
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    await delay(2500);

    return await page.evaluate(() => {
      const text = document.body.innerText.replace(/\s+/g, " ");
      let kills = null,
        winRate = null,
        highestKills = null;

      const km =
        text.match(/Total kills\s*([0-9,]+)/i) ||
        text.match(/Kills\s*([0-9,]+)\s*\(/i);
      if (km) kills = parseInt(km[1].replace(/,/g, ""), 10);

      const wm =
        text.match(/([0-9]{1,3})%\s*Defense/i) ||
        text.match(/Win\s*[Rr]ate\s*([0-9]+(?:\.[0-9]+)?)\s*%/i);
      if (wm) winRate = parseInt(wm[1], 10);

      const hm = text.match(/Most kills.*?([0-9,]+)\s*kills/i);
      if (hm) highestKills = parseInt(hm[1].replace(/,/g, ""), 10);

      return { kills, winRate, highestKills };
    });
  } catch (e) {
    console.error(`  ❌ Erreur pour ${hllId}: ${e.message}`);
    return null;
  }
}

// ── Met à jour le fichier players.ts ────────────────────────────────────────
function applyStats(filePath, statsMap) {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const idMatch = lines[i].match(/hllRecordsId:\s*"([^"]+)"/);

    if (idMatch && statsMap[idMatch[1]]) {
      const stats = statsMap[idMatch[1]];

      // Assurer que la ligne hllRecordsId se termine par une virgule
      let idLine = lines[i].trimEnd();
      if (!idLine.endsWith(",")) idLine += ",";
      result.push(idLine);
      i++;

      // Sauter les anciennes lignes de stats
      while (
        i < lines.length &&
        /^\s*(winRate|kills|highestKills):/.test(lines[i])
      ) {
        i++;
      }

      // Insérer les nouvelles stats
      const indent = "    ";
      const entries = [];
      if (stats.winRate !== null) entries.push(`${indent}winRate: ${stats.winRate}`);
      if (stats.kills !== null) entries.push(`${indent}kills: ${stats.kills}`);
      if (stats.highestKills !== null) entries.push(`${indent}highestKills: ${stats.highestKills}`);

      entries.forEach((e, j) => {
        result.push(j < entries.length - 1 ? e + "," : e);
      });
    } else {
      result.push(lines[i]);
      i++;
    }
  }

  fs.writeFileSync(filePath, result.join("\n"), "utf-8");
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🔄 Mise à jour des stats HLL Records…\n");

  const content = fs.readFileSync(PLAYERS_FILE, "utf-8");

  // Extraire tous les joueurs avec un hllRecordsId
  const rx = /pseudo:\s*"([^"]+)"[\s\S]*?hllRecordsId:\s*"([^"]+)"/g;
  const players = [];
  let m;
  while ((m = rx.exec(content)) !== null) {
    players.push({ pseudo: m[1], id: m[2] });
  }

  console.log(`📋 ${players.length} joueurs trouvés.\n`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
  );

  const statsMap = {};
  let ok = 0,
    fail = 0;

  for (let i = 0; i < players.length; i++) {
    const p = players[i];
    process.stdout.write(`[${i + 1}/${players.length}] ${p.pseudo}… `);

    const stats = await scrapePlayer(page, p.id);

    if (stats && (stats.kills !== null || stats.winRate !== null)) {
      statsMap[p.id] = stats;
      ok++;
      console.log(`✅ ${stats.kills} kills, ${stats.winRate}% WR, record ${stats.highestKills}`);
    } else {
      fail++;
      console.log("⚠️  Aucune donnée");
    }

    // Pause 3-5 s entre chaque requête
    if (i < players.length - 1) await delay(3000 + Math.random() * 2000);
  }

  await browser.close();

  // Écrire les résultats dans players.ts
  applyStats(PLAYERS_FILE, statsMap);

  console.log(`\n📊 Terminé : ${ok} OK, ${fail} échecs sur ${players.length}.`);
  process.exit(fail > players.length / 2 ? 1 : 0);
}

main().catch((e) => {
  console.error("💥 Erreur fatale :", e);
  process.exit(1);
});
