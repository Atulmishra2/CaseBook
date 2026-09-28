import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-web-security', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER:', msg.type().toUpperCase(), msg.text()));
    page.on('pageerror', error => console.log('PAGE_ERR:', error.message));

    await page.goto('file:///d:/caseBook/admin.html', {waitUntil: 'networkidle0'});
    
    // Set theme to 'light' in evaluate
    await page.evaluate(() => {
        if (typeof window.setAppTheme === 'function') {
            window.setAppTheme('light');
        }
    });
    
    const themeClass = await page.evaluate(() => document.documentElement.className);
    console.log("Applied HTML Theme Class:", themeClass);
    
    await new Promise(r => setTimeout(r, 1000));
    await browser.close();
  } catch (e) {
    console.log("Puppeteer script error:", e);
  }
})();
