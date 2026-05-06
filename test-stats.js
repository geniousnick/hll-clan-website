const cheerio = require('cheerio');
fetch('https://hllrecords.com/profiles/f53ee8524fb1cd8f4c7423fd364a78ce', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept-Language': 'en-US,en;q=0.5'
  }
}).then(r => r.text()).then(html => {
  const $ = cheerio.load(html);
  console.log($('body').text().replace(/\s+/g, ' '));
});
