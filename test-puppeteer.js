const puppeteer = require('puppeteer');

(async () => {
  console.log("Lancement du navigateur...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set User-Agent to avoid immediate bot rejection
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  console.log("Navigation...");
  await page.goto('https://hllrecords.com/profiles/f53ee8524fb1cd8f4c7423fd364a78ce', { waitUntil: 'networkidle2' });
  
  // Wait a bit for JS challenge
  await new Promise(r => setTimeout(r, 5000));
  
  const content = await page.content();
  console.log("Titre de la page:", await page.title());
  console.log("Longueur du contenu:", content.length);
  
  const nextData = await page.evaluate(() => {
    const el = document.getElementById('__NEXT_DATA__');
    return el ? el.textContent : null;
  });
  
  if (nextData) {
    const data = JSON.parse(nextData);
    const props = data.props?.pageProps || data.props || {};
    const profile = props.profile || props.player || props.data?.profile;
    if (profile) {
      console.log("Stats trouvées:", {
        kills: profile.kills ?? profile.total_kills,
        highestKills: profile.highest_kills ?? profile.highest_kills_match ?? profile.most_kills ?? profile.best_kills,
        winRate: profile.win_rate ?? profile.winRate ?? profile.win_percentage
      });
    } else {
      console.log("Profil introuvable dans les props.");
    }
  } else {
    console.log("Pas de __NEXT_DATA__ trouvé.");
  }
  
  await browser.close();
})();
