const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-web-security', '--disable-setuid-sandbox'],
      headless: "new"
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if(msg.type() === 'error') console.log('BROWSER_ERR:', msg.text());
    });
    page.on('pageerror', error => console.log('PAGE_ERR:', error.message));

    await page.goto('http://localhost:8080/admin.html', {waitUntil: 'networkidle2'});
    
    // Check if the login form is bound
    const isBound = await page.evaluate(() => {
        return !!window.handleAdminLogin;
    });
    console.log("Is handleAdminLogin globally available?", isBound);
    
    await browser.close();
  } catch (e) {
    console.log("Puppeteer script error:", e);
  }
})();
