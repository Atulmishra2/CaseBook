import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Small Scale (392x872)', width: 392, height: 872 },
];

test.describe('Phase 7: Global Modals, Sheets & Toasts Realme 9 Pro+ Responsive Audit', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    await page.evaluate(() => {
      if (typeof window.createAdminSession === 'function') {
        window.createAdminSession('admin', false);
      }
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 15000 });
    await page.locator('#appSkeletonOverlay').waitFor({ state: 'detached', timeout: 15000 }).catch(() => {});
    await page.waitForSelector('.tab.active', { timeout: 10000 }).catch(() => {});
  });

  for (const vp of mobileViewports) {
    test(`Audit Toast Region & Global Modal Bottom Sheet on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(300);

      await page.evaluate(() => {
        const region = document.getElementById('toast-region');
        if (region) {
          region.innerHTML = `
            <div class="toast toast--success" role="status">
              <div class="toast__content">
                <div class="toast__title">Hearing Updated</div>
                <div class="toast__desc">Next date saved cleanly above dock.</div>
              </div>
              <button type="button" class="toast__close" aria-label="Close">×</button>
            </div>
          `;
        }
        const fdOverlay = document.getElementById('fdModalOverlay') || document.querySelector('.fd-modal-overlay');
        if (fdOverlay) {
          fdOverlay.classList.remove('hidden');
          fdOverlay.style.display = 'flex';
        }
      });

      await page.waitForTimeout(350);

      const audit = await page.evaluate((vpWidth) => {
        const fdOverlay = document.getElementById('fdModalOverlay') || document.querySelector('.fd-modal-overlay');

        const toastRegion = document.getElementById('toast-region');
        const toastClose = document.querySelector('#toast-region .toast__close');
        const toastRect = toastRegion ? toastRegion.getBoundingClientRect() : null;
        const closeRect = toastClose ? toastClose.getBoundingClientRect() : null;

        const fdModal = document.querySelector('.fd-modal');
        const fdRect = fdModal ? fdModal.getBoundingClientRect() : null;
        const overlayAlign = fdOverlay ? window.getComputedStyle(fdOverlay).alignItems : null;

        const modalInputs = Array.from(
          document.querySelectorAll('.fd-modal input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), .fd-modal select, .fd-modal textarea')
        ).filter((el) => window.getComputedStyle(el).display !== 'none' && el.offsetParent !== null);
        const inputFontSizes = modalInputs.map((el) => parseFloat(window.getComputedStyle(el).fontSize));

        const modalButtons = Array.from(
          document.querySelectorAll('.fd-modal-footer button, .fd-modal-close, .fd-cal-nav-btn')
        ).filter((el) => el.offsetParent !== null);
        const buttonHeights = modalButtons.map((b) => b.getBoundingClientRect().height);

        return {
          rootScrollWidth: document.documentElement.scrollWidth,
          vpWidth,
          toastBottomGap: toastRect ? window.innerHeight - toastRect.bottom : 0,
          toastCloseWidth: closeRect ? closeRect.width : 0,
          toastCloseHeight: closeRect ? closeRect.height : 0,
          fdModalExists: !!fdModal,
          fdModalWidth: fdRect ? fdRect.width : 0,
          overlayAlign,
          inputFontSizes,
          buttonHeights,
        };
      }, vp.width);

      expect(audit.rootScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.toastBottomGap).toBeGreaterThanOrEqual(60);
      expect(audit.toastCloseWidth).toBeGreaterThanOrEqual(43.5);
      expect(audit.toastCloseHeight).toBeGreaterThanOrEqual(43.5);
      if (audit.fdModalExists) {
        expect(audit.overlayAlign).toBe('flex-end');
        expect(audit.fdModalWidth).toBeLessThanOrEqual(vp.width + 1);
      }
      audit.inputFontSizes.forEach((fs) => expect(fs).toBeGreaterThanOrEqual(16));
      audit.buttonHeights.forEach((h) => expect(h).toBeGreaterThanOrEqual(43.5));
    });
  }

  test('Verify Desktop Viewport (1280x800) Baseline 0% Regression on Global Modals & Toasts', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(300);

    const desktopCheck = await page.evaluate(() => {
      const region = document.getElementById('toast-region');
      const regionStyle = region ? window.getComputedStyle(region) : null;
      const fdOverlay = document.getElementById('fdModalOverlay') || document.querySelector('.fd-modal-overlay');
      if (fdOverlay) {
        fdOverlay.classList.remove('hidden');
        fdOverlay.style.display = 'flex';
      }
      const overlayAlign = fdOverlay ? window.getComputedStyle(fdOverlay).alignItems : null;
      return {
        toastBottom: regionStyle ? parseFloat(regionStyle.bottom) : 0,
        toastRight: regionStyle ? parseFloat(regionStyle.right) : 0,
        overlayAlign,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });

    expect(desktopCheck.toastBottom).toBe(24);
    expect(desktopCheck.toastRight).toBe(24);
    if (desktopCheck.overlayAlign) {
      expect(desktopCheck.overlayAlign).toBe('center');
    }
    expect(desktopCheck.scrollWidth).toBeLessThanOrEqual(desktopCheck.clientWidth + 1);
  });
});
