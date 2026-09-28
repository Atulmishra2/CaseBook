import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-web-security', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER:', msg.type().toUpperCase(), msg.text()));
    page.on('pageerror', error => console.log('PAGE_ERR:', error.message));

    await page.goto('file:///d:/caseBook/admin.html#themes', {waitUntil: 'networkidle0'});
    
    const showTabType = await page.evaluate(() => typeof window.showTab);
    console.log("window.showTab type:", showTabType);
    
    await new Promise(r => setTimeout(r, 1000));
    await browser.close();
  } catch (e) {
    console.log("Puppeteer script error:", e);
  }
})();
