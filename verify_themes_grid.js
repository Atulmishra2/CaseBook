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
    
    // Call showTab('themes') and renderThemeSettings
    await page.evaluate(async () => {
        if (typeof window.showTab === 'function') {
            await window.showTab('themes');
        }
        if (typeof window.renderThemeSettings === 'function') {
            window.renderThemeSettings();
        }
    });
    
    const gridHtml = await page.evaluate(() => {
        const wrap = document.getElementById('themeOptionsGrid');
        return wrap ? wrap.innerHTML : 'GRID_NOT_FOUND';
    });
    
    console.log("Rendered Grid HTML Contains 'Pure Luminary Light':", gridHtml.includes('Pure Luminary Light'));
    
    await new Promise(r => setTimeout(r, 1000));
    await browser.close();
  } catch (e) {
    console.log("Puppeteer script error:", e);
  }
})();
