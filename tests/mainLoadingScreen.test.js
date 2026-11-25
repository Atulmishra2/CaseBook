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

  it('3. should render centered Advocate Chamber crest with Lucide scale icon and editorial title', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    const center = overlay.querySelector('.pwa-splash-center');
    expect(center).not.toBeNull();

    const crest = center.querySelector('.pwa-splash-crest-wrap');
    expect(crest).not.toBeNull();

    const scaleIcon = crest.querySelector('.lucide-scale');
    expect(scaleIcon).not.toBeNull();

    const brandTitle = center.querySelector('.pwa-splash-title');
    expect(brandTitle).not.toBeNull();
    expect(brandTitle.textContent).toContain('CaseBook');

    const edition = center.querySelector('.pwa-splash-edition');
    expect(edition).not.toBeNull();
    expect(edition.textContent).toContain('Advocate Chamber Edition');
  });

  it('4. should render sleek gold progress rail and status subtitle', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    const progressRail = overlay.querySelector('.pwa-splash-progress-rail');
    expect(progressRail).not.toBeNull();

    const progressBar = progressRail.querySelector('.pwa-splash-progress-bar');
    expect(progressBar).not.toBeNull();

    const subtitle = overlay.querySelector('.pwa-splash-subtitle');
    expect(subtitle).not.toBeNull();
    expect(subtitle.textContent).toContain('Synchronizing your legal diary');
  });

  it('5. should render encrypted registry footer pill with Lucide shield-check icon', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    const footer = overlay.querySelector('.pwa-splash-footer');
    expect(footer).not.toBeNull();

    const shieldIcon = footer.querySelector('.lucide-shield-check');
    expect(shieldIcon).not.toBeNull();
    expect(footer.textContent).toContain('End-to-End Encrypted Registry');
  });

  it('6. should exclusively use Lucide icons with zero iconify-icon or material icons', () => {
    const overlay = htmlDoc.getElementById('appSkeletonOverlay');
    const iconifyTags = overlay.querySelectorAll('iconify-icon');
    expect(iconifyTags.length).toBe(0);

    const fontAwesome = overlay.querySelectorAll('.fa, .fas, .far, .material-icons');
    expect(fontAwesome.length).toBe(0);

    const lucideSvgs = overlay.querySelectorAll('svg.lucide');
    expect(lucideSvgs.length).toBeGreaterThanOrEqual(2);
  });
});
