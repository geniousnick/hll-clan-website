const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  await page.goto('https://hllrecords.com/profiles/f53ee8524fb1cd8f4c7423fd364a78ce', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));
  
  const html = await page.content();
  const $ = cheerio.load(html);
  
  const allText = $('body').text();
  console.log("Win rate match:", allText.match(/Win\s*Rate[:\s]*([0-9]+(?:\.[0-9]+)?)\s*%/i));
  console.log("Kills match:", allText.match(/(?:Total\s*)?Kills?[:\s]*([0-9,]+)/i));
  console.log("Highest Kills match:", allText.match(/(?:Highest|Most|Best|Record)\s*Kills?[:\s]*([0-9,]+)/i));
  
  // Try finding any divs containing "Kills" and their siblings
  $('div:contains("Kills")').each((i, el) => {
    if ($(el).text().length < 50) {
       console.log("Found div containing 'Kills':", $(el).text(), "Parent text:", $(el).parent().text());
    }
  });

  await browser.close();
})();
