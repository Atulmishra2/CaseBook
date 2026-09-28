import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-web-security', '--disable-setuid-sandbox', '--allow-file-access-from-files']
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        console.log('BROWSER:', msg.type().toUpperCase(), msg.text());
    });
    page.on('pageerror', error => console.log('PAGE_ERR:', error.message));

    await page.goto('file:///d:/caseBook/admin.html', {waitUntil: 'networkidle0'});
    
    // Check if the login form is bound
    const isBound = await page.evaluate(() => {
        return typeof window.handleAdminLogin;
    });
    console.log("window.handleAdminLogin type:", isBound);
    
    // Click the login button and see what happens
    await page.type('#username', 'admin');
    await page.type('#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait a sec for any errors
    await new Promise(r => setTimeout(r, 2000));
    
    await browser.close();
  } catch (e) {
    console.log("Puppeteer script error:", e);
  }
})();
