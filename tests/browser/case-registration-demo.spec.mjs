import { test, expect } from 'playwright/test';
import path from 'path';

const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-iphone-390x844', width: 390, height: 844 },
  { name: 'mobile-realme-360x800', width: 360, height: 800 },
];

test.describe('Case Registration Enhancement Demo UI Tests', () => {
  const demoUrl = '/artifacts/case-registration-enhancement-demo.html';

  test('UI Structure & Interaction Tests across Desktop & Mobile', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(demoUrl, { waitUntil: 'domcontentloaded' });

    // 1. Verify Category Pills are GONE and Master Dropdown is present
    const pillsRail = page.locator('.category-chips-rail');
    await expect(pillsRail).toHaveCount(0); // Pills rail must NOT exist

    const masterSelect = page.locator('#caseCategoryMasterSelect');
    await expect(masterSelect).toBeVisible();
    await expect(masterSelect).toHaveValue('family');

    // 2. Verify Party Representation Auto-Sync interaction
    const btnPet = page.locator('#btnRepPet');
    const btnResp = page.locator('#btnRepResp');
    const clientInput = page.locator('#inpClientName');

    // Initially petitioner
    await expect(btnPet).toHaveClass(/active/);
    await expect(clientInput).toHaveValue('Smt. Pooja Sharma');

    // Switch to respondent
    await btnResp.click();
    await expect(btnResp).toHaveClass(/active/);
    await expect(btnPet).not.toHaveClass(/active/);
    await expect(clientInput).toHaveValue('Rahul Sharma & Ors.');

    // Switch back to petitioner
    await btnPet.click();
    await expect(btnPet).toHaveClass(/active/);
    await expect(clientInput).toHaveValue('Smt. Pooja Sharma');

    // 3. Verify Preset Insertion into Dossier
    const textarea = page.locator('#dossierTextarea');
    const initialText = await textarea.inputValue();
    const presetBtn = page.locator('button.preset-pill-btn', { hasText: 'Minor Children' });
    await presetBtn.click();
    const updatedText = await textarea.inputValue();
    expect(updatedText).toContain('Minor Children: 1 Son (Age 5)');

    // 4. Verify Theme Switcher works
    const themeBtn = page.locator('.theme-switch-btn');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await themeBtn.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await themeBtn.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // 5. Verify Sticky Footer Bar
    const submitBtn = page.locator('#hubAddSubmitBtn');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText('Register Case Record');
  });

  for (const vp of viewports) {
    test(`Responsive Layout & Zero Overflow on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(demoUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(300);

      // Verify no horizontal overflow
      const overflowInfo = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const bodyWidth = document.body.scrollWidth;
        const winWidth = window.innerWidth;
        return {
          winWidth,
          docWidth,
          bodyWidth,
          hasOverflow: docWidth > winWidth + 1 || bodyWidth > winWidth + 1
        };
      });

      expect(overflowInfo.hasOverflow).toBe(false);

      // Capture screenshot for visual inspection
      await page.screenshot({
        path: `artifacts/screenshots/${vp.name}-redesign.png`,
        fullPage: false
      });
    });
  }
});
