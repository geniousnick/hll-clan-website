const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  
  await page.goto('https://hllrecords.com/profiles/f53ee8524fb1cd8f4c7423fd364a78ce', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  const html = await page.content();
  const $ = cheerio.load(html);
  
  const text = $('body').text().replace(/\s+/g, ' ');
  const regex = /.{0,30}kill.{0,30}/gi;
  let matches = text.match(regex);
  if(matches) console.log([...new Set(matches)].join('\n'));
  
  await browser.close();
})();
