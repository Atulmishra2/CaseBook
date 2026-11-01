import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('NewHome Tab - Modular Architecture & Color Tokens Sync', () => {
  const htmlPath = path.resolve(__dirname, '../components/tabs/newhome/tab-newhome.html');
  const cssPath = path.resolve(__dirname, '../components/tabs/newhome/tab-newhome.css');
  const jsPath = path.resolve(__dirname, '../components/tabs/newhome/tab-newhome.js');

  it('verifies that all modular NewHome tab files exist', () => {
    expect(fs.existsSync(htmlPath)).toBe(true);
    expect(fs.existsSync(cssPath)).toBe(true);
    expect(fs.existsSync(jsPath)).toBe(true);
  });

  it('ensures CSS tokens are synced with CaseBook design system and supports mobile swipeable KPI cards', () => {
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('--nh-bg');
    expect(css).toContain('--nh-surface');
    expect(css).toContain('--nh-text-main');
    expect(css).toContain('--nh-text-muted');
    expect(css).toContain('--nh-border');
    expect(css).toContain('--nh-primary');
    // Dark mode overrides
    expect(css).toContain('html.dark .newhome-container');
    expect(css).toContain('#0b1120'); // Dark bg token
    expect(css).toContain('#151e32'); // Dark surface token
    expect(css).toContain('#f8fafc'); // Dark textMain token
    // Mobile swipeable cards
    expect(css).toContain('scroll-snap-type: x mandatory');
    expect(css).toContain('scroll-snap-align: start');
  });

  it('validates comprehensive responsive breakpoints for tablet, mobile, and small screens', () => {
    const css = fs.readFileSync(cssPath, 'utf-8');
    
    // Tablet landscape / portrait layout: 2-column side widgets
    expect(css).toContain('@media (max-width: 1024px)');
    expect(css).toContain('.newhome-col-side');
    expect(css).toContain('grid-template-columns: 1fr 1fr');

    // Phablets & small tablets
    expect(css).toContain('@media (min-width: 641px) and (max-width: 768px)');

    // Mobile screens <= 640px
    expect(css).toContain('@media (max-width: 640px)');
    expect(css).toContain('overscroll-behavior-x: contain');
    expect(css).toContain('grid-template-columns: 1fr 1fr'); // Hero actions grid on mobile

    // Extra small mobile screens <= 380px
    expect(css).toContain('@media (max-width: 380px)');

    // Accessibility prefers-reduced-motion
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('ensures index.html links the stylesheet, script, sidebar item, and container', () => {
    const indexHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
    expect(indexHtml).toContain('components/tabs/newhome/tab-newhome.css');
    expect(indexHtml).toContain('components/tabs/newhome/tab-newhome.js');
    expect(indexHtml).toContain('id="newhome"');
    expect(indexHtml).toContain("showTab('newhome'");
  });

  it('renders dynamic stats, timeline, and chart data', () => {
    const html = fs.readFileSync(htmlPath, 'utf-8');
    document.body.innerHTML = html;

    // Load tab-newhome.js logic
    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    eval(jsContent);

    // Mock global case data and tasks
    window.allCaseRecords = [
      { caseNo: 'CIV/101/2026', caseType: 'civil', caseStatus: 'Pending', nextHearing: new Date().toISOString().split('T')[0], courtName: 'Court 1' },
      { caseNo: 'CRI/202/2026', caseType: 'criminal', caseStatus: 'Pending', nextHearing: '2026-12-01', courtName: 'Court 2' },
      { caseNo: 'DISP/303/2026', caseType: 'civil', caseStatus: 'Disposed Off', nextHearing: '—', courtName: 'Court 3' },
    ];
    window.caseTasks = [
      { id: 't1', taskTitle: 'Draft Urgent Rejoinder', status: 'pending', priority: 'high', deadlineDate: '2026-11-05' },
      { id: 't2', taskTitle: 'Finished Client Consultation', status: 'completed', priority: 'medium', deadlineDate: '2026-11-01' }
    ];

    expect(typeof window.renderNewHomeDashboard).toBe('function');
    window.renderNewHomeDashboard();

    expect(document.getElementById('newhomeTotalCases').textContent).toBe('3');
    expect(document.getElementById('newhomePendingCases').textContent).toBe('2');
    expect(document.getElementById('newhomeDisposedCases').textContent).toBe('1');
    expect(document.getElementById('newhomeTimelineBadge').textContent).toContain('1 Hearing');
    expect(document.getElementById('newhomeTasksDueBadge').textContent).toContain('1 Due');

    // Verify ONLY pending tasks are rendered in the list
    const renderedTaskItems = document.querySelectorAll('.newhome-task-item');
    expect(renderedTaskItems.length).toBe(1);
    expect(document.getElementById('newhomeTasksList').textContent).toContain('Draft Urgent Rejoinder');
    expect(document.getElementById('newhomeTasksList').textContent).not.toContain('Finished Client Consultation');
  });

  it("syncs Today's Timeline with live case docket, chronological ordering, and interactive actions", () => {
    const html = fs.readFileSync(htmlPath, 'utf-8');
    document.body.innerHTML = html;

    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    eval(jsContent);

    const todayStr = new Date().toISOString().split('T')[0];

    window.allCaseRecords = [
      {
        caseNo: 'CRI/555/2026',
        caseType: 'criminal',
        caseStatus: 'Pending',
        nextHearing: todayStr,
        hearingTime: '02:00 PM',
        hearingProcess: 'Evidence',
        victimName: 'State',
        accusedName: 'Vikram Singh',
        courtName: 'Sessions Court Room 4',
        courtRoom: '4',
        criminalClientName: 'Vikram Singh',
        criminalClientNumber: '+919876543210',
        remark: 'Cross examination of IO',
      },
      {
        caseNo: 'CIV/101/2026',
        caseType: 'civil',
        caseStatus: 'Pending',
        nextHearing: todayStr,
        hearingTime: '10:30 AM',
        hearingProcess: 'Final Arguments',
        plaintiff: 'Ramesh Sharma',
        defendant: 'Suresh Verma',
        courtName: 'Civil Court Room 2',
        courtRoom: '2',
        clientName: 'Ramesh Sharma',
        clientNumber: '+919123456789',
        remark: 'Keep paperbook ready',
      },
      {
        caseNo: 'REV/999/2026',
        caseType: 'revenue',
        caseStatus: 'Decided',
        nextHearing: todayStr, // Disposed case should NOT appear in timeline
        courtName: 'Revenue Board',
      },
    ];

    window.renderNewHomeDashboard();

    const badge = document.getElementById('newhomeTimelineBadge');
    expect(badge.textContent).toBe('2 Hearings');

    const timelineItems = document.querySelectorAll('.newhome-timeline-item');
    expect(timelineItems.length).toBe(2);

    // Item 1 must be the earlier hearing (10:30 AM before 02:00 PM)
    const firstItemText = timelineItems[0].textContent;
    expect(firstItemText).toContain('10:30 AM');
    expect(firstItemText).toContain('CIV/101/2026');
    expect(firstItemText).toContain('Ramesh Sharma vs. Suresh Verma');
    expect(firstItemText).toContain('Final Arguments');
    expect(firstItemText).toContain('Civil Court Room 2');
    expect(firstItemText).toContain('Keep paperbook ready');

    // Item 2 must be 02:00 PM
    const secondItemText = timelineItems[1].textContent;
    expect(secondItemText).toContain('02:00 PM');
    expect(secondItemText).toContain('CRI/555/2026');
    expect(secondItemText).toContain('State vs. Vikram Singh');
    expect(secondItemText).toContain('Evidence');
    expect(secondItemText).toContain('Cross examination of IO');

    // Verify Action buttons in each timeline card
    const forwardBtns = document.querySelectorAll('.action-forward');
    expect(forwardBtns.length).toBe(2);
    expect(forwardBtns[0].getAttribute('onclick')).toContain('CIV/101/2026');

    const callBtns = document.querySelectorAll('.action-call');
    expect(callBtns.length).toBe(2);
    expect(callBtns[0].getAttribute('href')).toBe('tel:+919123456789');

    const whatsappBtns = document.querySelectorAll('.action-whatsapp');
    expect(whatsappBtns.length).toBe(2);

    const dossierBtns = document.querySelectorAll('.action-dossier');
    expect(dossierBtns.length).toBe(2);

    // Verify refreshNewHomeLiveTimeline function exists
    expect(typeof window.refreshNewHomeLiveTimeline).toBe('function');
  });

  it('displays empty state when no active hearings are scheduled today', () => {
    const html = fs.readFileSync(htmlPath, 'utf-8');
    document.body.innerHTML = html;

    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    eval(jsContent);

    window.allCaseRecords = [
      { caseNo: 'CIV/200/2026', caseType: 'civil', caseStatus: 'Pending', nextHearing: '2026-12-31' },
    ];

    window.renderNewHomeDashboard();

    expect(document.getElementById('newhomeTimelineBadge').textContent).toBe('0 Hearings');
    expect(document.getElementById('newhomeTimelineList').style.display).toBe('none');
    expect(document.getElementById('newhomeTimelineEmpty').style.display).toBe('flex');
  });
});
