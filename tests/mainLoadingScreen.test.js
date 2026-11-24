import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Main Application Loading Screen & Preloader Shield (#appSkeletonOverlay)', () => {
  let htmlDoc;

  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const parser = new DOMParser();
    htmlDoc = parser.parseFromString(htmlContent, 'text/html');
  });

  it('1. should define #earlySkeletonStyles inside <head> for zero-FOUC shimmer', () => {
    const earlyStyles = htmlDoc.getElementById('earlySkeletonStyles');
    expect(earlyStyles).not.toBeNull();
    const cssText = earlyStyles.textContent;
    expect(cssText).toContain('#appSkeletonOverlay');
    expect(cssText).toContain('cbShimmerWave');
    expect(cssText).toContain('cbPulseGold');
    expect(cssText).toContain('cbProgressFlow');
    expect(cssText).toContain('fade-out');
  });

  it('2. should render #appSkeletonOverlay with proper accessibility attributes', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    expect(overlay).not.toBeNull();
    expect(overlay.getAttribute('role')).toBe('status');
    expect(overlay.getAttribute('aria-label')).toBe('Loading CaseBook workspace');
  });

  it('3. should render executive top navigation header with Lucide scale brand emblem', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    const topNav = overlay.querySelector('.skeleton-top-nav');
    expect(topNav).not.toBeNull();

    const scaleIcon = topNav.querySelector('.lucide-scale');
    expect(scaleIcon).not.toBeNull();

    const menuIcon = topNav.querySelector('.lucide-menu');
    expect(menuIcon).not.toBeNull();

    const brandTitle = topNav.querySelector('.skeleton-brand-title');
    expect(brandTitle).not.toBeNull();
    expect(brandTitle.textContent).toContain('CaseBook');
  });

  it('4. should render live status strip and glowing gold progress rail', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    const statusStrip = overlay.querySelector('.skeleton-status-strip');
    expect(statusStrip).not.toBeNull();

    const pulseDot = statusStrip.querySelector('.skeleton-pulse-dot');
    expect(pulseDot).not.toBeNull();

    const progressRail = overlay.querySelector('.skeleton-progress-rail');
    expect(progressRail).not.toBeNull();
    const progressBar = progressRail.querySelector('.skeleton-progress-bar');
    expect(progressBar).not.toBeNull();
  });

  it('5. should render navigation tabs rail with active Daily Cause List pill', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    const tabsRail = overlay.querySelector('.skeleton-tabs-rail');
    expect(tabsRail).not.toBeNull();

    const activePill = tabsRail.querySelector('.skeleton-tab-pill.active');
    expect(activePill).not.toBeNull();
    expect(activePill.textContent).toContain('Daily Cause List');

    const allPills = tabsRail.querySelectorAll('.skeleton-tab-pill');
    expect(allPills.length).toBeGreaterThanOrEqual(5);
  });

  it('6. should render cockpit header banner and 4 KPI metrics cards', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    const cockpit = overlay.querySelector('.skeleton-cockpit-banner');
    expect(cockpit).not.toBeNull();

    const kpiCards = overlay.querySelectorAll('.skeleton-kpi-card');
    expect(kpiCards.length).toBe(4);
  });

  it('7. should render universal 5-column docket table matching DESIGN.md parity', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    const docketCard = overlay.querySelector('.skeleton-docket-card');
    expect(docketCard).not.toBeNull();

    const tableHead = docketCard.querySelector('.skeleton-table-head');
    expect(tableHead).not.toBeNull();
    expect(tableHead.children.length).toBe(5);

    const docketRows = docketCard.querySelectorAll('.skeleton-docket-row');
    expect(docketRows.length).toBe(3);

    // Verify universal action buttons in docket rows
    docketRows.forEach(row => {
      const primaryBtn = row.querySelector('.skeleton-act-btn.primary');
      expect(primaryBtn).not.toBeNull();
      expect(primaryBtn.textContent).toContain('Update Date');

      const dossierBtn = row.querySelector('.skeleton-act-btn.secondary');
      expect(dossierBtn).not.toBeNull();

      const callBtn = row.querySelector('.skeleton-act-btn.call');
      expect(callBtn).not.toBeNull();

      const waBtn = row.querySelector('.skeleton-act-btn.whatsapp');
      expect(waBtn).not.toBeNull();
    });
  });

  it('8. should render spinning Lucide loader-2 in footnote watermark', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    const footnote = overlay.querySelector('.skeleton-footnote');
    expect(footnote).not.toBeNull();

    const loaderIcon = footnote.querySelector('.lucide-loader-2.skeleton-spin');
    expect(loaderIcon).not.toBeNull();
    expect(footnote.textContent).toContain('Connecting to Supabase Legal Database');
  });

  it('9. should exclusively use Lucide icons with zero iconify-icon or material icons', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    const iconifyTags = overlay.querySelectorAll('iconify-icon');
    expect(iconifyTags.length).toBe(0);

    const fontAwesome = overlay.querySelectorAll('.fa, .fas, .far, .material-icons');
    expect(fontAwesome.length).toBe(0);

    const lucideSvgs = overlay.querySelectorAll('svg.lucide');
    expect(lucideSvgs.length).toBeGreaterThan(10);
  });
});
