import { test, expect } from 'playwright/test';
import fs from 'fs';
import path from 'path';

const viewports = [
  { name: 'mobile-320x568', width: 320, height: 568, desc: 'Ultra-Compact / iPhone SE (1st Gen)' },
  { name: 'mobile-360x800', width: 360, height: 800, desc: 'Compact Android / Samsung Galaxy A-series' },
  { name: 'mobile-390x844', width: 390, height: 844, desc: 'Standard iOS / iPhone 12/13/14/15/16' },
  { name: 'mobile-412x915', width: 412, height: 915, desc: 'Large Android / Samsung S24 & Google Pixel' },
];

const mockCases = [
  {
    caseNo: 'OS/104/2024',
    caseName: 'Ramesh Sharma vs Suresh Verma',
    plaintiff: 'Ramesh Sharma',
    defendant: 'Suresh Verma',
    caseType: 'civil',
    courtName: 'Civil Judge Senior Division, Lucknow',
    nextHearing: new Date().toISOString().split('T')[0], // Today's appearance!
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
    nextHearing: new Date().toISOString().split('T')[0], // Today's appearance!
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
    courtName: 'Sub Divisional Magistrate (SDM) Revenue Court',
    nextHearing: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Upcoming in 3 days
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
    courtName: 'High Court of Judicature, Bench Lucknow',
    nextHearing: '', // Undated
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
    nextHearing: null, // Undated
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

const testResultsData = [];

test.describe('Home Dashboard Deep Mobile UI Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    // Establish local admin session
    await page.evaluate(() => {
      if (typeof window.createAdminSession === 'function') {
        window.createAdminSession('admin', false);
      }
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 15000 });
  });

  for (const vp of viewports) {
    test(`Empty State & Baseline Layout Analysis on ${vp.name} (${vp.desc})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.evaluate(async () => {
        window.allCaseRecords = [];
        window.caseTasks = [];
        await window.showTab('home');
        if (typeof window.renderHomeDashboard === 'function') {
          window.renderHomeDashboard();
        }
      });

      await page.waitForTimeout(600);
      await expect(page.locator('#home .home-hero-card')).toBeVisible();

      // Deep inspection of DOM and layout geometry
      const audit = await page.evaluate((viewportWidth) => {
        const root = document.documentElement;
        const body = document.body;
        const home = document.querySelector('#home');
        const container = document.querySelector('.home-dashboard-container');
        const hero = document.querySelector('.home-hero-card');
        const kpiRow = document.querySelector('.kpi-materialize-row');
        const kpiCols = Array.from(document.querySelectorAll('.kpi-materialize-row .col'));
        const appearanceBoard = document.querySelector('.appearance-board');
        const emptyState = document.querySelector('#homeTodayEmptyState');
        const bottomGrid = document.querySelector('.home-bottom-grid');
        const bottomPanels = Array.from(document.querySelectorAll('.home-bottom-grid > .home-panel-card'));
        const undatedCard = document.querySelector('.undated-analysis-card');

        // Check horizontal overflow culprits
        const overflowingElements = [];
        document.querySelectorAll('#home *').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (rect.right > viewportWidth + 1.5 || el.scrollWidth > el.clientWidth + 1.5) {
              overflowingElements.push({
                tagName: el.tagName,
                className: el.className,
                id: el.id,
                rectRight: rect.right,
                rectWidth: rect.width,
                scrollWidth: el.scrollWidth,
                clientWidth: el.clientWidth,
                outerHTML: el.outerHTML.slice(0, 120),
              });
            }
          }
        });

        // Hero card buttons
        const heroButtons = Array.from(document.querySelectorAll('.hero-actions-bar button')).map((b) => {
          const r = b.getBoundingClientRect();
          const s = window.getComputedStyle(b);
          return {
            text: b.innerText.trim(),
            width: r.width,
            height: r.height,
            display: s.display,
            isFullWidth: r.width >= (hero?.clientWidth || viewportWidth) - 36,
          };
        });

        // KPI card stacking
        const kpiMetrics = kpiCols.map((col, idx) => {
          const card = col.querySelector('.kpi-card');
          const r = col.getBoundingClientRect();
          const cs = window.getComputedStyle(col);
          return {
            index: idx + 1,
            type: card?.getAttribute('data-type'),
            width: r.width,
            height: r.height,
            flex: cs.flex,
            maxWidth: cs.maxWidth,
            top: r.top,
            isFullWidth: r.width >= viewportWidth - 34,
          };
        });

        // Interactive touch target audit (< 44px)
        const touchTargets = [];
        home.querySelectorAll('button, a, .kpi-card, .shortcut-row').forEach((el) => {
          const r = el.getBoundingClientRect();
          const text = (el.innerText || el.getAttribute('aria-label') || el.title || el.className).slice(0, 30).trim();
          touchTargets.push({
            tag: el.tagName,
            class: el.className,
            text,
            width: Math.round(r.width),
            height: Math.round(r.height),
            passedMin44: r.width >= 44 && r.height >= 44,
            passedMin38: r.width >= 38 && r.height >= 38,
          });
        });

        // Bottom panels layout
        const panelData = bottomPanels.map((p, idx) => {
          const r = p.getBoundingClientRect();
          const cs = window.getComputedStyle(p);
          return {
            index: idx + 1,
            classes: p.className,
            width: r.width,
            height: r.height,
            computedHeight: cs.height,
            isFullWidth: r.width >= viewportWidth - 34,
          };
        });

        return {
          viewportWidth,
          docScrollWidth: root.scrollWidth,
          bodyScrollWidth: body.scrollWidth,
          containerWidth: container?.getBoundingClientRect().width,
          containerScrollWidth: container?.scrollWidth,
          heroWidth: hero?.getBoundingClientRect().width,
          appearanceBoardWidth: appearanceBoard?.getBoundingClientRect().width,
          emptyStateVisible: emptyState ? window.getComputedStyle(emptyState).display !== 'none' : false,
          heroButtons,
          kpiMetrics,
          panelData,
          overflowCulpritsCount: overflowingElements.length,
          topOverflowCulprits: overflowingElements.slice(0, 5),
          touchTargetsTotal: touchTargets.length,
          touchTargetsBelow44: touchTargets.filter((t) => !t.passedMin44).length,
          touchTargetsBelow38: touchTargets.filter((t) => !t.passedMin38).length,
          touchTargetsSamplesBelow44: touchTargets.filter((t) => !t.passedMin44).slice(0, 8),
        };
      }, vp.width);

      testResultsData.push({
        testType: 'Empty-State',
        viewport: vp,
        theme: 'dark',
        audit,
      });

      // Capture screenshot
      const shotPath = `artifacts/home-mobile-tests/${vp.name}-empty-dark.png`;
      await page.screenshot({ path: shotPath, fullPage: true });

      // Basic layout assertions
      expect(audit.docScrollWidth).toBeLessThanOrEqual(vp.width + 1.5);
      expect(audit.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1.5);
      expect(audit.emptyStateVisible).toBe(true);
    });

    test(`Populated Realistic State Analysis on ${vp.name} (${vp.desc})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // First ensure home tab is active and loaded
      await page.evaluate(async () => {
        await window.showTab('home');
      });

      // Inject realistic case and task records and render dashboard
      await page.evaluate(
        ({ cases, tasks }) => {
          window.allCaseRecords = cases;
          try { allCaseRecords = cases; } catch (e) {}
          window.caseTasks = tasks;
          try { caseTasks = tasks; } catch (e) {}
          if (typeof window.renderHomeDashboard === 'function') {
            window.renderHomeDashboard();
          }
        },
        { cases: mockCases, tasks: mockTasks }
      );

      // Wait until count updates
      await page.waitForFunction(() => {
        const el = document.querySelector('#homeTotalCases');
        return el && el.textContent === '6';
      }, null, { timeout: 10000 });

      // Verify populated counts
      const counts = await page.evaluate(() => {
        return {
          total: document.querySelector('#homeTotalCases')?.textContent,
          today: document.querySelector('#homeTodayCases')?.textContent,
          upcoming: document.querySelector('#homeUpcomingCases')?.textContent,
          pending: document.querySelector('#homePendingCases')?.textContent,
          undated: document.querySelector('#homeUndatedCases')?.textContent,
          disposed: document.querySelector('#homeDisposedCases')?.textContent,
          todayCardsCount: document.querySelectorAll('.home-today-card').length,
          taskCardsCount: document.querySelectorAll('.home-task-card').length,
          undatedGraphTotal: document.querySelector('#undatedGraphTotal')?.textContent,
        };
      });

      expect(counts.total).toBe('6');
      expect(counts.today).toBe('2');
      expect(counts.todayCardsCount).toBe(2);
      expect(counts.taskCardsCount).toBe(3);

      // Deep inspection of populated components on mobile
      const populatedAudit = await page.evaluate((viewportWidth) => {
        const root = document.documentElement;
        const body = document.body;

        // Bounding boxes and wrapping of Today's Court Appearance cards
        const todayCards = Array.from(document.querySelectorAll('.home-today-card')).map((card, idx) => {
          const r = card.getBoundingClientRect();
          const actions = card.querySelector('.home-today-card-actions');
          const actionsRect = actions?.getBoundingClientRect();
          const buttons = Array.from(card.querySelectorAll('.home-today-card-actions button, .home-today-card-actions a')).map(
            (b) => {
              const br = b.getBoundingClientRect();
              return {
                text: b.innerText.trim() || b.title,
                width: br.width,
                height: br.height,
              };
            }
          );
          return {
            index: idx + 1,
            cardWidth: r.width,
            cardHeight: r.height,
            actionsWidth: actionsRect?.width,
            actionsHeight: actionsRect?.height,
            buttons,
          };
        });

        // Bounding boxes of Priority Tasks
        const taskCards = Array.from(document.querySelectorAll('.home-task-card')).map((t, idx) => {
          const r = t.getBoundingClientRect();
          const btn = t.querySelector('.home-task-manage-btn');
          const btnR = btn?.getBoundingClientRect();
          return {
            index: idx + 1,
            width: r.width,
            height: r.height,
            manageBtnWidth: btnR?.width,
            manageBtnHeight: btnR?.height,
          };
        });

        // Shortcuts table rows
        const shortcutRows = Array.from(document.querySelectorAll('.shortcuts-table .shortcut-row')).map((row, idx) => {
          const r = row.getBoundingClientRect();
          return {
            index: idx + 1,
            height: r.height,
            width: r.width,
          };
        });

        // Undated cases SVG Donut & Vertical Bar chart
        const donut = document.querySelector('.undated-donut-svg');
        const donutRect = donut?.getBoundingClientRect();
        const vChart = document.querySelector('.undated-vertical-chart');
        const vChartRect = vChart?.getBoundingClientRect();

        // Check horizontal overflow
        const overflowing = [];
        document.querySelectorAll('#home *').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (rect.right > viewportWidth + 1.5 || el.scrollWidth > el.clientWidth + 1.5) {
              overflowing.push({
                tag: el.tagName,
                class: el.className,
                id: el.id,
                right: rect.right,
                scrollWidth: el.scrollWidth,
                clientWidth: el.clientWidth,
              });
            }
          }
        });

        return {
          viewportWidth,
          docScrollWidth: root.scrollWidth,
          bodyScrollWidth: body.scrollWidth,
          todayCards,
          taskCards,
          shortcutRows,
          donutRect: donutRect ? { width: donutRect.width, height: donutRect.height } : null,
          vChartRect: vChartRect ? { width: vChartRect.width, height: vChartRect.height } : null,
          overflowCount: overflowing.length,
          overflowDetails: overflowing.slice(0, 5),
        };
      }, vp.width);

      testResultsData.push({
        testType: 'Populated-State',
        viewport: vp,
        theme: 'dark',
        counts,
        audit: populatedAudit,
      });

      const shotPath = `artifacts/home-mobile-tests/${vp.name}-populated-dark.png`;
      await page.screenshot({ path: shotPath, fullPage: true });

      // Assertions
      expect(populatedAudit.docScrollWidth).toBeLessThanOrEqual(vp.width + 1.5);
      expect(populatedAudit.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1.5);
    });

    test(`Light Theme Verification on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('casebook-theme', 'light');
        await window.showTab('home');
      });

      await page.evaluate(
        ({ cases, tasks }) => {
          window.allCaseRecords = cases;
          try { allCaseRecords = cases; } catch (e) {}
          window.caseTasks = tasks;
          try { caseTasks = tasks; } catch (e) {}
          if (typeof window.renderHomeDashboard === 'function') {
            window.renderHomeDashboard();
          }
        },
        { cases: mockCases, tasks: mockTasks }
      );

      await page.waitForTimeout(400);

      // Contrast & Background check in Light Mode
      const styleCheck = await page.evaluate(() => {
        const hero = document.querySelector('.home-hero-card');
        const kpi = document.querySelector('.kpi-card');
        const board = document.querySelector('.appearance-board');
        const panel = document.querySelector('.home-bottom-grid > .home-panel-card');

        return {
          heroBg: hero ? window.getComputedStyle(hero).backgroundColor : null,
          kpiBg: kpi ? window.getComputedStyle(kpi).backgroundColor : null,
          boardBg: board ? window.getComputedStyle(board).backgroundColor : null,
          panelBg: panel ? window.getComputedStyle(panel).backgroundColor : null,
          isDarkClass: document.documentElement.classList.contains('dark'),
        };
      });

      testResultsData.push({
        testType: 'Light-Theme-State',
        viewport: vp,
        theme: 'light',
        styleCheck,
      });

      const shotPath = `artifacts/home-mobile-tests/${vp.name}-populated-light.png`;
      await page.screenshot({ path: shotPath, fullPage: true });

      expect(styleCheck.isDarkClass).toBe(false);
    });
  }

  test.afterAll(async () => {
    // Write collected test telemetry data to disk for report generation
    const jsonPath = path.resolve('artifacts/home-mobile-tests/audit-telemetry.json');
    fs.writeFileSync(jsonPath, JSON.stringify(testResultsData, null, 2), 'utf-8');
    console.log(`[TEST COMPLETE] Telemetry saved to ${jsonPath}`);
  });
});
