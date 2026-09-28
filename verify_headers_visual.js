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

    const htmlPath = 'file:///' + path.resolve('admin.html').replace(/\\/g, '/');
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });

    await page.evaluate(() => {
      const loginScreen = document.getElementById('loginScreen');
      if (loginScreen) loginScreen.classList.add('hidden');
      const guestScreen = document.getElementById('guestScreen');
      if (guestScreen) guestScreen.classList.add('hidden');
      const adminScreen = document.getElementById('adminScreen');
      if (adminScreen) adminScreen.classList.remove('hidden');
    });

    await new Promise(r => setTimeout(r, 500));

    const tabsToTest = ['upcoming', 'causelist', 'add', 'paisa', 'themes'];
    
    for (const tab of tabsToTest) {
      await page.evaluate((t) => {
        if (typeof window.showTab === 'function') {
          window.showTab(t);
        }
      }, tab);
      
      await new Promise(r => setTimeout(r, 600));
      
      await page.screenshot({
        path: `C:/Users/Lenovo/.gemini/antigravity/brain/5c2006a4-ff68-49a8-ad47-f5664a5e251f/header_tab_${tab}.png`,
        fullPage: false
      });
      console.log(`Captured screenshot for tab: ${tab}`);
    }

    await browser.close();
    console.log("Visual verification complete!");
  } catch (err) {
    console.error("Visual test error:", err);
  }
})();
