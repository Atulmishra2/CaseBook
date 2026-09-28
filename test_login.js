import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-web-security', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if(msg.type() === 'error') console.log('BROWSER_ERR:', msg.text());
        else console.log('BROWSER_LOG:', msg.text());
    });
    page.on('pageerror', error => console.log('PAGE_ERR:', error.message));

    await page.goto('http://localhost:8080/admin.html', {waitUntil: 'networkidle2'});
    
    // Check if the login form is bound
    const isBound = await page.evaluate(() => {
        return !!window.handleAdminLogin;
    });
    console.log("Is handleAdminLogin globally available?", isBound);
    
    // Click the login button and see what happens
    await page.type('#username', 'admin');
    await page.type('#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait a sec for any errors
    await new Promise(r => setTimeout(r, 1000));
    
    await browser.close();
  } catch (e) {
    console.log("Puppeteer script error:", e);
  }
})();
