const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
  page.on('requestfailed', request => console.log('BROWSER_NET_ERR:', request.url(), request.failure().errorText));

  await page.goto('file:///d:/caseBook/admin.html', {waitUntil: 'networkidle2'});
  await browser.close();
})();
