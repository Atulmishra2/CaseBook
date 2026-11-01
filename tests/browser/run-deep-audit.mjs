import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const viewports = [
  { name: 'iPhone SE (320x568)', width: 320, height: 568, category: 'Ultra-Compact' },
  { name: 'Samsung Galaxy A-series (360x800)', width: 360, height: 800, category: 'Budget/Compact Android' },
  { name: 'iPhone 14/15/16 (390x844)', width: 390, height: 844, category: 'Mainstream iOS' },
  { name: 'Pixel 8 / Galaxy S24 (412x915)', width: 412, height: 915, category: 'Modern Flagship Android' },
];

const mockCases = [
  {
    caseNo: 'OS/104/2024',
    caseName: 'Ramesh Sharma vs Suresh Verma',
    plaintiff: 'Ramesh Sharma',
    defendant: 'Suresh Verma',
    caseType: 'civil',
    courtName: 'Civil Judge Senior Division, Lucknow',
    nextHearing: new Date().toISOString().split('T')[0],
    hearingProcess: 'Cross Examination of PW-1',
    caseStatus: 'Pending',
    clientName: 'Ramesh Sharma',
    clientNumber: '+91 98765 43210',
  },
  {
    caseNo: 'ST/552/2023',
    caseName: 'State of UP vs Vikram Singh',
    victimName: 'State of UP',
    accusedName: 'Vikram Singh',
    caseType: 'criminal',
    criminalCaseNumber: 'ST/552/2023',
    criminalCourtName: 'Additional Sessions Judge Court 3',
    nextHearing: new Date().toISOString().split('T')[0],
    hearingProcess: 'Arguments on Bail Application',
    caseStatus: 'Pending',
    clientName: 'Vikram Singh (Accused)',
    clientNumber: '+91 98111 22334',
  },
  {
    caseNo: 'REV/89/2023',
    caseName: 'Kailash Nath vs Gram Sabha',
    plaintiff: 'Kailash Nath',
    defendant: 'Gram Sabha',
    caseType: 'revenue',
    courtName: 'SDM Revenue Court, Mohanlalganj',
    nextHearing: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    hearingProcess: 'Demarcation Report Verification',
    caseStatus: 'Pending',
    clientName: 'Kailash Nath',
    clientNumber: '+91 94500 11223',
  },
  {
    caseNo: 'CS/302/2021',
    caseName: 'Amitabh Sen vs Union of India',
    plaintiff: 'Amitabh Sen',
    defendant: 'Union of India',
    caseType: 'civil',
    courtName: 'High Court Bench Lucknow',
    nextHearing: '',
    hearingProcess: 'Awaiting Order',
    caseStatus: 'Pending',
    clientName: 'Amitabh Sen',
  },
  {
    caseNo: 'CR/404/2022',
    caseName: 'Mahesh Gupta vs Rajesh Trading Co.',
    plaintiff: 'Mahesh Gupta',
    defendant: 'Rajesh Trading Co.',
    caseType: 'criminal',
    courtName: 'Chief Judicial Magistrate Court',
    nextHearing: null,
    hearingProcess: 'Framing of Charges',
    caseStatus: 'Pending',
    clientName: 'Mahesh Gupta',
  },
  {
    caseNo: 'MISC/12/2020',
    caseName: 'Radha Devi vs Satish Kumar',
    plaintiff: 'Radha Devi',
    defendant: 'Satish Kumar',
    caseType: 'civil',
    courtName: 'Family Court, Lucknow',
    nextHearing: '2024-01-15',
    hearingProcess: 'Decreed Final Order',
    caseStatus: 'Disposed',
    clientName: 'Radha Devi',
  },
];

const mockTasks = [
  {
    taskTitle: 'Draft Rejoinder Affidavit in OS/104/2024',
    caseNo: 'OS/104/2024',
    priority: 'high',
    deadlineDate: new Date().toISOString().split('T')[0],
    status: 'pending',
  },
  {
    taskTitle: 'Procure Certified Copy of Police Charge Sheet',
    caseNo: 'ST/552/2023',
    priority: 'medium',
    deadlineDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'in-progress',
  },
  {
    taskTitle: 'Prepare Vakalatnama for new Revenue filing',
    caseNo: 'REV/89/2023',
    priority: 'normal',
    deadlineDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pending',
  },
];

async function runDeepAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('[1/5] Booting test browser session...');
  await page.goto('http://127.0.0.1:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    if (typeof window.createAdminSession === 'function') {
      window.createAdminSession('admin', false);
    }
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 15000 });

  const fullAuditReport = {
    generatedAt: new Date().toISOString(),
    viewportsTested: viewports,
    results: [],
  };

  for (const vp of viewports) {
    console.log(`\nEvaluating Viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewportSize({ width: vp.width, height: vp.height });

    // Mode 1: Empty State (Dark Theme)
    await page.evaluate(async () => {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      await window.showTab('home');
      window.allCaseRecords = [];
      try { allCaseRecords = []; } catch(e){}
      window.caseTasks = [];
      try { caseTasks = []; } catch(e){}
      if (typeof window.renderHomeDashboard === 'function') {
        window.renderHomeDashboard();
      }
    });
    await page.waitForTimeout(500);

    const emptyAudit = await page.evaluate((vpWidth) => {
      const home = document.querySelector('#home');
      const root = document.documentElement;
      const body = document.body;
      const hero = document.querySelector('.home-hero-card');
      const kpis = Array.from(document.querySelectorAll('.kpi-materialize-row .col'));
      const emptyStateEl = document.querySelector('#homeTodayEmptyState');
      const bottomCards = Array.from(document.querySelectorAll('.home-bottom-grid > .home-panel-card'));

      // Check overflow
      const horizontalOverflows = [];
      home.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          if (r.right > vpWidth + 1.5) {
            horizontalOverflows.push({
              tag: el.tagName,
              class: el.className,
              id: el.id,
              right: r.right,
              width: r.width,
            });
          }
        }
      });

      // Touch Targets
      const touchTargets = [];
      home.querySelectorAll('button, a, .kpi-card, .shortcut-row').forEach((el) => {
        const r = el.getBoundingClientRect();
        const text = (el.innerText || el.getAttribute('aria-label') || el.title || el.className).trim().slice(0, 35);
        touchTargets.push({
          tag: el.tagName,
          class: el.className,
          text,
          width: Math.round(r.width),
          height: Math.round(r.height),
          meetsMin44: r.width >= 44 && r.height >= 44,
          meetsMin38: r.width >= 38 && r.height >= 38,
        });
      });

      // Small Font audit (< 12px)
      const smallFonts = [];
      home.querySelectorAll('*').forEach((el) => {
        if (el.children.length === 0 && el.textContent.trim().length > 0) {
          const fs = parseFloat(window.getComputedStyle(el).fontSize);
          if (fs < 12) {
            smallFonts.push({
              tag: el.tagName,
              class: el.className,
              text: el.textContent.trim().slice(0, 30),
              fontSize: fs,
            });
          }
        }
      });

      return {
        docScrollWidth: root.scrollWidth,
        bodyScrollWidth: body.scrollWidth,
        heroRect: hero ? hero.getBoundingClientRect() : null,
        kpiColsCount: kpis.length,
        kpiLayout: kpis.map((k) => ({
          width: k.getBoundingClientRect().width,
          height: k.getBoundingClientRect().height,
          flex: window.getComputedStyle(k).flex,
        })),
        emptyStateDisplay: emptyStateEl ? window.getComputedStyle(emptyStateEl).display : null,
        bottomPanelHeights: bottomCards.map((b) => ({
          class: b.className,
          height: b.getBoundingClientRect().height,
          computedHeight: window.getComputedStyle(b).height,
        })),
        overflowCount: horizontalOverflows.length,
        overflowCulprits: horizontalOverflows.slice(0, 5),
        touchTargetsTotal: touchTargets.length,
        touchTargetsUnder44: touchTargets.filter((t) => !t.meetsMin44).length,
        touchTargetsUnder38: touchTargets.filter((t) => !t.meetsMin38).length,
        smallFontsCount: smallFonts.length,
        smallFontsSamples: smallFonts.slice(0, 8),
      };
    }, vp.width);

    // Mode 2: Populated State (Dark Theme)
    await page.evaluate(
      ({ cases, tasks }) => {
        window.allCaseRecords = cases;
        try { allCaseRecords = cases; } catch(e){}
        window.caseTasks = tasks;
        try { caseTasks = tasks; } catch(e){}
        if (typeof window.renderHomeDashboard === 'function') {
          window.renderHomeDashboard();
        }
      },
      { cases: mockCases, tasks: mockTasks }
    );
    await page.waitForTimeout(600);

    const populatedAudit = await page.evaluate((vpWidth) => {
      const todayCards = Array.from(document.querySelectorAll('.home-today-card')).map((card) => {
        const r = card.getBoundingClientRect();
        const btns = Array.from(card.querySelectorAll('.home-today-card-actions button, .home-today-card-actions a')).map((b) => {
          const br = b.getBoundingClientRect();
          return {
            text: b.innerText.trim() || b.title,
            width: Math.round(br.width),
            height: Math.round(br.height),
          };
        });
        return {
          width: Math.round(r.width),
          height: Math.round(r.height),
          buttons: btns,
        };
      });

      const taskCards = Array.from(document.querySelectorAll('.home-task-card')).map((t) => {
        const r = t.getBoundingClientRect();
        const titleEl = t.querySelector('.home-task-title');
        return {
          width: Math.round(r.width),
          height: Math.round(r.height),
          titleScrollWidth: titleEl ? titleEl.scrollWidth : 0,
          titleClientWidth: titleEl ? titleEl.clientWidth : 0,
          isTitleTruncated: titleEl ? titleEl.scrollWidth > titleEl.clientWidth : false,
        };
      });

      const shortcuts = Array.from(document.querySelectorAll('.shortcuts-table .shortcut-row')).map((s) => {
        const r = s.getBoundingClientRect();
        return {
          height: Math.round(r.height),
          width: Math.round(r.width),
        };
      });

      const donut = document.querySelector('.undated-donut-svg');
      const vChart = document.querySelector('.undated-vertical-chart');

      return {
        todayCards,
        taskCards,
        shortcuts,
        donutSize: donut ? { width: Math.round(donut.getBoundingClientRect().width), height: Math.round(donut.getBoundingClientRect().height) } : null,
        vChartSize: vChart ? { width: Math.round(vChart.getBoundingClientRect().width), height: Math.round(vChart.getBoundingClientRect().height) } : null,
      };
    }, vp.width);

    // Mode 3: Light Theme Contrast Check
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('casebook-theme', 'light');
    });
    await page.waitForTimeout(400);

    const lightAudit = await page.evaluate(() => {
      const hero = document.querySelector('.home-hero-card');
      const kpi = document.querySelector('.kpi-card');
      const board = document.querySelector('.appearance-board');
      const panel = document.querySelector('.home-bottom-grid > .home-panel-card');
      const heroText = document.querySelector('.hero-greeting');
      const kpiValue = document.querySelector('.kpi-value');

      return {
        heroBg: window.getComputedStyle(hero).backgroundColor,
        kpiBg: window.getComputedStyle(kpi).backgroundColor,
        boardBg: window.getComputedStyle(board).backgroundColor,
        panelBg: window.getComputedStyle(panel).backgroundColor,
        heroTextColor: heroText ? window.getComputedStyle(heroText).color : null,
        kpiValueColor: kpiValue ? window.getComputedStyle(kpiValue).color : null,
      };
    });

    fullAuditReport.results.push({
      viewport: vp,
      emptyAudit,
      populatedAudit,
      lightAudit,
    });
  }

  const outPath = path.resolve('artifacts/home-mobile-tests/comprehensive-audit-report.json');
  fs.writeFileSync(outPath, JSON.stringify(fullAuditReport, null, 2), 'utf8');
  console.log(`\nAudit completed successfully! Saved to: ${outPath}`);

  await browser.close();
}

runDeepAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
