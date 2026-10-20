import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const hearingCss = readFileSync(
  resolve(process.cwd(), 'components/tabs/hearing/tab-hearing.css'),
  'utf8'
);

describe('Forward Hearing tab responsive contract', () => {
  it('defines a 480px mobile layout for the narrow portrait viewport', () => {
    expect(hearingCss).toContain('@media (max-width: 480px)');
    expect(hearingCss).toMatch(
      /@media \(max-width: 480px\)[\s\S]*?#hearing \.cal-header[\s\S]*?grid-template-areas:/
    );
    expect(hearingCss).toMatch(
      /@media \(max-width: 480px\)[\s\S]*?#hearing \.cal-btn,[\s\S]*?#hearing \.cal-today-btn[\s\S]*?min-height: 44px/
    );
  });

  it('protects long case/timeline content from forcing horizontal overflow', () => {
    expect(hearingCss).toMatch(
      /@media \(max-width: 480px\)[\s\S]*?#hearing \.case-detail-value,[\s\S]*?overflow-wrap: anywhere/
    );
    expect(hearingCss).toMatch(
      /@media \(max-width: 480px\)[\s\S]*?#hearing \.timeline-data,[\s\S]*?word-break: break-word/
    );
  });

  it('keeps the date, stage, disposal, and submit controls touch-friendly', () => {
    expect(hearingCss).toMatch(
      /@media \(max-width: 480px\)[\s\S]*?#hearing \.fd-cal-day[\s\S]*?min-height: 44px !important/
    );
    expect(hearingCss).toMatch(
      /@media \(max-width: 480px\)[\s\S]*?#hearing \.radio-item[\s\S]*?min-height: 44px/
    );
    expect(hearingCss).toMatch(
      /@media \(max-width: 480px\)[\s\S]*?#hearing #hearingSubmitBtn,[\s\S]*?#hearing #sendWhatsAppHearingBtn[\s\S]*?min-height: 48px/
    );
  });

  it('styles hearing stages as an iOS settings-style grouped list', () => {
    expect(hearingCss).toMatch(
      /#hearing #hearingStageRadioGrid\.radio-grid[\s\S]*?display: flex !important[\s\S]*?flex-direction: column !important[\s\S]*?border-radius: 14px !important/
    );
    expect(hearingCss).toMatch(
      /#hearing #hearingStageRadioGrid \.radio-item[\s\S]*?min-height: 52px !important[\s\S]*?border-bottom: 1px solid/
    );
    expect(hearingCss).toMatch(
      /#hearing #hearingStageRadioGrid \.radio-item input\[type="radio"\][\s\S]*?order: 2[\s\S]*?margin-left: auto !important/
    );
  });
});
