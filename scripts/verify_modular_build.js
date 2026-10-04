import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-web-security', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    page.on('pageerror', err => {
      errors.push(err.message);
    });

    await page.evaluateOnNewDocument(() => {
      sessionStorage.setItem('cmUser', 'admin');
      sessionStorage.setItem('cmSessionToken', 'admin-token');
      localStorage.setItem('cmUser', 'admin');
      localStorage.setItem('cmSessionToken', 'admin-token');
    });

    console.log('Navigating to http://localhost:3000/admin.html...');
    await page.goto('http://localhost:3000/admin.html', { waitUntil: 'networkidle2', timeout: 15000 });

    const checkDom = await page.evaluate(async () => {
      // Test showTab paisa, todo, causelist
      if (typeof window.showTab === 'function') {
        await window.showTab('paisa');
      }

      const caseModals = document.getElementById('caseModalsContainer');
      const printTemplates = document.getElementById('printTemplatesContainer');
      const paisaTab = document.getElementById('paisa');

      return {
        caseModalsLoaded: caseModals ? caseModals.dataset.loaded : null,
        caseModalsChildren: caseModals ? caseModals.children.length : 0,
        printTemplatesLoaded: printTemplates ? printTemplates.dataset.loaded : null,
        printTemplatesChildren: printTemplates ? printTemplates.children.length : 0,
        paisaTabLoaded: paisaTab ? paisaTab.dataset.loaded : null,
        paisaTabChildren: paisaTab ? paisaTab.children.length : 0,
        hasPrintDailyCauseList: typeof window.printDailyCauseList === 'function',
        hasPopulatePrintableCaseDossier: typeof window.populatePrintableCaseDossier === 'function',
        hasLoadCaseModals: typeof window.loadCaseModals === 'function',
        hasLoadPrintTemplates: typeof window.loadPrintTemplates === 'function'
      };
    });

    console.log('DOM & Runtime check:', JSON.stringify(checkDom, null, 2));

    await page.screenshot({
      path: 'scripts/modular_test_screenshot.png',
      fullPage: false
    });

    await browser.close();

    console.log('Errors caught during run:', errors.length);
    if (errors.length > 0) {
      console.log('Errors details:', errors.slice(0, 5));
    }
    console.log('Test completed successfully!');
  } catch (err) {
    console.error('Fatal Test Error:', err);
    process.exit(1);
  }
})();
