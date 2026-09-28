import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-web-security', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    await page.evaluateOnNewDocument(() => {
      sessionStorage.setItem('cmUser', 'admin');
      sessionStorage.setItem('cmSessionToken', 'admin-token');
      localStorage.setItem('cmUser', 'admin');
      localStorage.setItem('cmSessionToken', 'admin-token');
    });

    const htmlPath = 'file:///' + path.resolve('admin.html').replace(/\\/g, '/');
    try {
      await page.goto(htmlPath, { waitUntil: 'domcontentloaded', timeout: 5000 });
    } catch (e) {}

    await page.evaluate(() => {
      const loginScreen = document.getElementById('loginScreen');
      if (loginScreen) loginScreen.classList.add('hidden');
      const guestScreen = document.getElementById('guestScreen');
      if (guestScreen) guestScreen.classList.add('hidden');
      const adminScreen = document.getElementById('adminScreen');
      if (adminScreen) adminScreen.classList.remove('hidden');
      if (typeof window.showTab === 'function') window.showTab('cards');
    });

    await new Promise(r => setTimeout(r, 600));

    // Capture Cards tab
    await page.screenshot({
      path: `C:/Users/Lenovo/.gemini/antigravity/brain/5c2006a4-ff68-49a8-ad47-f5664a5e251f/test_cards_inline_kpi.png`,
      fullPage: false
    });

    await browser.close();
    console.log("Screenshot saved successfully!");
  } catch (err) {
    console.error("Error:", err);
  }
})();
