import { test, expect } from 'playwright/test';

async function setupHearingTab(page) {
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

  await page.evaluate(async () => {
    await window.showTab('hearing');
  });

  await page.waitForSelector('#hearing.active', { timeout: 10000 });
}

test.describe('Forward Date (hearing tab) issues verification', () => {
  test('Issue 1: Dropdown search bar has no icon/text overlap in both light and dark modes', async ({ page }) => {
    await setupHearingTab(page);

    // Open dropdown
    const trigger = page.locator('#hearingDropdownTrigger');
    await expect(trigger).toBeVisible({ timeout: 10000 });
    await trigger.click();
    await page.waitForTimeout(300);

    const checkSearchPadding = async (themeName) => {
      return await page.evaluate(() => {
        const icon = document.querySelector('#hearing .custom-dropdown-search-wrap .custom-dropdown-search-icon');
        const input = document.getElementById('hearingDropdownSearch');
        const wrap = document.querySelector('#hearing .custom-dropdown-search-wrap');

        const iconRect = icon.getBoundingClientRect();
        const inputRect = input.getBoundingClientRect();
        const wrapRect = wrap.getBoundingClientRect();
        const inputStyle = window.getComputedStyle(input);

        const paddingLeft = parseFloat(inputStyle.paddingLeft);
        const iconRightRelativeToInput = iconRect.right - inputRect.left;
        const clearance = paddingLeft - iconRightRelativeToInput;

        return {
          paddingLeft,
          iconRightRelativeToInput,
          clearance,
          noOverlap: clearance >= 10
        };
      });
    };

    // Check light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(200);
    const lightMetrics = await checkSearchPadding('light');
    console.log('LIGHT MODE METRICS:', lightMetrics);
    expect(lightMetrics.noOverlap).toBe(true);
    expect(lightMetrics.paddingLeft).toBeGreaterThanOrEqual(44);

    // Check dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(200);
    const darkMetrics = await checkSearchPadding('dark');
    console.log('DARK MODE METRICS:', darkMetrics);
    expect(darkMetrics.noOverlap).toBe(true);
    expect(darkMetrics.paddingLeft).toBeGreaterThanOrEqual(44);
  });

  test('Issue 2: Active date in calendar shows prominently with active/selected classes and distinct styling', async ({ page }) => {
    await setupHearingTab(page);

    // 1. Click a day cell (e.g. day 15)
    const day15Btn = page.locator('#hearingCalDays button:not(.other)').filter({ hasText: /^15$/ }).first();
    await expect(day15Btn).toBeVisible({ timeout: 10000 });
    await day15Btn.click();
    await page.waitForTimeout(300);

    const day15State = await day15Btn.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        hasSelectedClass: el.classList.contains('selected'),
        hasActiveClass: el.classList.contains('active'),
        hasIsActiveClass: el.classList.contains('is-active'),
        background: style.backgroundColor,
        color: style.color,
        inputVal: document.getElementById('hearingDate')?.value
      };
    });

    console.log('DAY 15 ACTIVE STATE:', day15State);
    expect(day15State.hasSelectedClass).toBe(true);
    expect(day15State.hasActiveClass).toBe(true);
    expect(day15State.inputVal).toContain('-15');
    // Teal highlight color
    expect(day15State.background).toBe('rgb(13, 148, 136)');
    expect(day15State.color).toBe('rgb(255, 255, 255)');

    // 2. Click a preset (e.g. Tomorrow)
    const tomorrowBtn = page.locator('#hearing .presets-grid .preset-btn').first();
    await tomorrowBtn.click();
    await page.waitForTimeout(300);

    const activePresetState = await page.evaluate(() => {
      const activeCell = document.querySelector('#hearingCalDays button.active');
      const inputVal = document.getElementById('hearingDate')?.value;
      const footerText = document.getElementById('hearingCalSelectedText')?.textContent;
      return {
        foundActiveCell: Boolean(activeCell),
        activeCellText: activeCell ? activeCell.querySelector('.cal-day-num')?.textContent.trim() : null,
        inputVal,
        footerText
      };
    });

    console.log('ACTIVE PRESET STATE:', activePresetState);
    expect(activePresetState.foundActiveCell).toBe(true);
    expect(activePresetState.footerText).toContain('Tomorrow');
  });

  test('Issue 3: Calendar refreshes immediately after forwarding date with updated hearing indicator', async ({ page }) => {
    await setupHearingTab(page);

    const result = await page.evaluate(async () => {
      // Setup test case
      const testCase = {
        caseNo: 'CIV-VERIFY-999',
        caseName: 'Alpha vs Beta',
        courtName: 'High Court',
        caseType: 'civil',
        nextHearing: '2026-11-05',
        hearingProcess: 'Filing'
      };
      if (!Array.isArray(window.allCaseRecords)) window.allCaseRecords = [];
      window.allCaseRecords.unshift(testCase);

      // Select this case
      document.getElementById('hearingCaseNo').value = testCase.caseNo;
      if (document.getElementById('hearingCaseSelect')) {
        document.getElementById('hearingCaseSelect').value = testCase.caseNo;
      }
      renderHearingCaseInfo(testCase.caseNo);

      // Pick forward date (2026-11-28) and stage
      const forwardDate = '2026-11-28';
      document.getElementById('hearingDate').value = forwardDate;
      if (typeof quickSelectHearingStage === 'function') {
        quickSelectHearingStage('Arguments');
      } else if (typeof syncHearingStageFromValue === 'function') {
        syncHearingStageFromValue('Arguments');
      } else {
        document.getElementById('hearingProcess').value = 'Arguments';
      }
      updateHearingLivePreview();
      renderHearingTabCalendar();

      // Submit forward
      const form = document.getElementById('updateHearingForm');
      await handleUpdateHearingSubmit(new Event('submit'));

      // Check calendar for the load indicator on day 28
      const day28Cell = Array.from(document.querySelectorAll('#hearingCalDays button')).find(b => {
        const num = b.querySelector('.cal-day-num')?.textContent.trim();
        return num === '28' && !b.classList.contains('other');
      });

      const indicator = day28Cell ? day28Cell.querySelector('.cal-load-indicator') : null;
      const updatedCase = window.allCaseRecords.find(c => c.caseNo === testCase.caseNo);

      return {
        caseNextHearing: updatedCase?.nextHearing,
        caseHearingProcess: updatedCase?.hearingProcess,
        day28HasIndicator: Boolean(indicator),
        indicatorClass: indicator?.className,
        day28Title: day28Cell?.getAttribute('title')
      };
    });

    console.log('CALENDAR REFRESH TEST RESULT:', result);
    expect(result.caseNextHearing).toBe('2026-11-28');
    expect(result.caseHearingProcess).toBe('Arguments');
    expect(result.day28HasIndicator).toBe(true);
    expect(result.day28Title).toContain('1 hearing(s) scheduled');
  });

  test('Issue 4: Selected Case Details Metadata Strip is ONLY shown when a case is selected from dropdown', async ({ page }) => {
    await setupHearingTab(page);

    const caseCard = page.locator('#caseDetailsCard');

    // 1. Initially without selecting any case, case details card MUST be hidden
    await expect(caseCard).toBeHidden();

    // 2. Select a case from dropdown or via API
    await page.evaluate(() => {
      const testCase = {
        caseNo: 'CIV-TEST-777',
        caseName: 'Ramesh vs Suresh',
        courtName: 'Civil Court',
        caseType: 'civil',
        nextHearing: '2026-11-20',
        hearingProcess: 'Evidence'
      };
      if (!Array.isArray(window.allCaseRecords)) window.allCaseRecords = [];
      window.allCaseRecords.unshift(testCase);

      const select = document.getElementById('hearingCaseSelect');
      if (select) {
        select.value = 'CIV-TEST-777';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      renderHearingCaseInfo('CIV-TEST-777');
    });

    await page.waitForTimeout(300);

    // 3. Now that a case is selected, the details card MUST be visible
    await expect(caseCard).toBeVisible();

    // 4. When case is cleared or reset, card MUST be hidden again
    await page.evaluate(() => {
      renderHearingCaseInfo('');
    });

    await page.waitForTimeout(300);
    await expect(caseCard).toBeHidden();
  });
});
