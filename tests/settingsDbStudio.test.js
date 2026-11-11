import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Settings Tab - GOD Mode Database Studio & Dummy Seeder Suite', () => {
  let htmlContent;
  let jsContent;
  let cssContent;

  beforeEach(() => {
    htmlContent = readFileSync(
      resolve(process.cwd(), 'components/tabs/settings/tab-settings.html'),
      'utf8'
    );
    jsContent = readFileSync(
      resolve(process.cwd(), 'components/tabs/settings/tab-settings.js'),
      'utf8'
    );
    cssContent = readFileSync(
      resolve(process.cwd(), 'components/tabs/settings/tab-settings.css'),
      'utf8'
    );
  });

  it('matches HTML template parity between static HTML and in-memory JS export', () => {
    expect(htmlContent).toContain('id="btnSettingsSubtabPref"');
    expect(jsContent).toContain('id="btnSettingsSubtabPref"');

    expect(htmlContent).toContain('id="btnSettingsSubtabDb"');
    expect(jsContent).toContain('id="btnSettingsSubtabDb"');

    expect(htmlContent).toContain('id="settingsSubtabPreferences"');
    expect(jsContent).toContain('id="settingsSubtabPreferences"');

    expect(htmlContent).toContain('id="settingsSubtabDbStudio"');
    expect(jsContent).toContain('id="settingsSubtabDbStudio"');
  });

  it('declares mobile-first subtab navigation with proper ARIA accessibility roles', () => {
    expect(htmlContent).toContain('class="settings-subtabs-bar" role="tablist"');
    expect(htmlContent).toContain('role="tab" aria-selected="true" aria-controls="settingsSubtabPreferences"');
    expect(htmlContent).toContain('role="tab" aria-selected="false" aria-controls="settingsSubtabDbStudio"');
    expect(htmlContent).toContain('id="dbStudioBadgeCount"');
  });

  it('declares all HUD elements, health monitor, and quick action buttons', () => {
    expect(htmlContent).toContain('class="db-studio-hud"');
    expect(htmlContent).toContain('id="dbStudioStatusPill"');
    expect(htmlContent).toContain('id="dbStudioStatusLabel"');
    expect(htmlContent).toContain('id="dbStudioTotalRecordsCount"');

    // Quick action buttons
    expect(htmlContent).toContain('openDbStudioRecordEditor(null, true)');
    expect(htmlContent).toContain('openDbStudioSeederModal()');
    expect(htmlContent).toContain('reloadDbStudioData()');
    expect(htmlContent).toContain('exportDbStudioJSON()');
    expect(htmlContent).toContain('id="dbStudioImportInput"');
    expect(htmlContent).toContain('purgeDummyDataOnly()');

    // Search bar
    expect(htmlContent).toContain('id="dbStudioSearchInput"');
    expect(htmlContent).toContain('id="dbStudioClearSearchBtn"');
  });

  it('declares collection pills for all database collections', () => {
    expect(htmlContent).toContain('data-col="cases" onclick="selectDbStudioCollection(\'cases\')"');
    expect(htmlContent).toContain('data-col="hearings" onclick="selectDbStudioCollection(\'hearings\')"');
    expect(htmlContent).toContain('data-col="courts" onclick="selectDbStudioCollection(\'courts\')"');
    expect(htmlContent).toContain('data-col="todos" onclick="selectDbStudioCollection(\'todos\')"');
    expect(htmlContent).toContain('data-col="transfers" onclick="selectDbStudioCollection(\'transfers\')"');
    expect(htmlContent).toContain('data-col="paisa" onclick="selectDbStudioCollection(\'paisa\')"');
    expect(htmlContent).toContain('data-col="storage" onclick="selectDbStudioCollection(\'storage\')"');

    expect(htmlContent).toContain('id="badgeColCases"');
    expect(htmlContent).toContain('id="badgeColHearings"');
    expect(htmlContent).toContain('id="badgeColCourts"');
    expect(htmlContent).toContain('id="badgeColTodos"');
    expect(htmlContent).toContain('id="badgeColTransfers"');
    expect(htmlContent).toContain('id="badgeColPaisa"');
    expect(htmlContent).toContain('id="badgeColStorage"');
  });

  it('declares case category subfilter chips', () => {
    expect(htmlContent).toContain('id="dbStudioCaseSubfilters"');
    expect(htmlContent).toContain('filterDbStudioCasesByType(\'all\')');
    expect(htmlContent).toContain('filterDbStudioCasesByType(\'civil\')');
    expect(htmlContent).toContain('filterDbStudioCasesByType(\'criminal\')');
    expect(htmlContent).toContain('filterDbStudioCasesByType(\'family\')');
    expect(htmlContent).toContain('filterDbStudioCasesByType(\'revenue\')');
    expect(htmlContent).toContain('filterDbStudioCasesByType(\'misc_civil\')');
    expect(htmlContent).toContain('filterDbStudioCasesByType(\'misc_criminal\')');
    expect(htmlContent).toContain('filterDbStudioCasesByType(\'complaint\')');
  });

  it('includes interactive data table and mobile adaptive cards container', () => {
    expect(htmlContent).toContain('id="dbStudioTable"');
    expect(htmlContent).toContain('id="dbStudioTableHead"');
    expect(htmlContent).toContain('id="dbStudioTableBody"');
    expect(htmlContent).toContain('id="dbStudioMobileCards"');

    // Bulk actions
    expect(htmlContent).toContain('id="dbStudioBulkExportBtn"');
    expect(htmlContent).toContain('id="dbStudioBulkDeleteBtn"');
    expect(htmlContent).toContain('id="dbStudioSelectedCount"');

    // Pagination
    expect(htmlContent).toContain('id="dbStudioPrevPageBtn"');
    expect(htmlContent).toContain('id="dbStudioNextPageBtn"');
    expect(htmlContent).toContain('id="dbStudioPageSizeSelect"');
    expect(htmlContent).toContain('id="dbStudioPageIndicator"');
  });

  it('includes Universal Record Editor modal with Form and Raw JSON tabs', () => {
    expect(htmlContent).toContain('id="dbStudioEditorModal"');
    expect(htmlContent).toContain('id="dbEditorModalTitle"');
    expect(htmlContent).toContain('id="btnEditorTabForm"');
    expect(htmlContent).toContain('id="btnEditorTabJson"');
    expect(htmlContent).toContain('id="dbEditorFormContainer"');
    expect(htmlContent).toContain('id="dbEditorJsonContainer"');
    expect(htmlContent).toContain('id="dbEditorJsonTextarea"');
    expect(htmlContent).toContain('saveDbStudioRecord()');
    expect(htmlContent).toContain('closeDbStudioEditorModal()');
  });

  it('includes GOD Mode Dummy Seeder Engine modal with 1-click presets and custom generator', () => {
    expect(htmlContent).toContain('id="dbStudioSeederModal"');
    expect(htmlContent).toContain('runDummyPreset(\'supreme\')');
    expect(htmlContent).toContain('runDummyPreset(\'hearings\')');
    expect(htmlContent).toContain('runDummyPreset(\'paisa\')');
    expect(htmlContent).toContain('id="seederTargetCol"');
    expect(htmlContent).toContain('id="seederRecordCount"');
    expect(htmlContent).toContain('id="seederCaseTypeSelect"');
    expect(htmlContent).toContain('id="seederAttachHearings"');
    expect(htmlContent).toContain('runCustomDummyGenerator()');
    expect(htmlContent).toContain('closeDbStudioSeederModal()');
  });

  it('strictly adheres to Rule 2 by using Lucide inline SVGs exclusively across all new studio markup', () => {
    // Check subtabs bar
    const subtabsBar = htmlContent.substring(
      htmlContent.indexOf('class="settings-subtabs-bar"'),
      htmlContent.indexOf('id="settingsSubtabPreferences"')
    );
    expect(subtabsBar).toContain('lucide-sliders-horizontal');
    expect(subtabsBar).toContain('lucide-database-zap');

    // Check Database Studio container & modals
    const dbStudioSection = htmlContent.substring(htmlContent.indexOf('id="settingsSubtabDbStudio"'));
    
    // Check that Lucide SVGs are present
    expect(dbStudioSection).toContain('class="lucide lucide-');
    expect(dbStudioSection).toContain('lucide-sparkles');
    expect(dbStudioSection).toContain('lucide-plus');
    expect(dbStudioSection).toContain('lucide-refresh-cw');
    expect(dbStudioSection).toContain('lucide-download');
    expect(dbStudioSection).toContain('lucide-upload');
    expect(dbStudioSection).toContain('lucide-eraser');

    // Rule 2 check: Ensure no foreign icon libraries are introduced in Database Studio
    expect(dbStudioSection).not.toContain('class="fa-solid');
    expect(dbStudioSection).not.toContain('class="fa-regular');
    expect(dbStudioSection).not.toContain('class="material-icons');
  });

  it('exports all necessary Database Studio functions on window in tab-settings.js', () => {
    expect(jsContent).toContain('window.switchSettingsSubtab = switchSettingsSubtab');
    expect(jsContent).toContain('window.initDatabaseStudio = initDatabaseStudio');
    expect(jsContent).toContain('window.selectDbStudioCollection = selectDbStudioCollection');
    expect(jsContent).toContain('window.filterDbStudioCasesByType = filterDbStudioCasesByType');
    expect(jsContent).toContain('window.filterDbStudioRecords = filterDbStudioRecords');
    expect(jsContent).toContain('window.renderDbStudioTable = renderDbStudioTable');
    expect(jsContent).toContain('window.openDbStudioRecordEditor = openDbStudioRecordEditor');
    expect(jsContent).toContain('window.saveDbStudioRecord = saveDbStudioRecord');
    expect(jsContent).toContain('window.deleteDbStudioRecord = deleteDbStudioRecord');
    expect(jsContent).toContain('window.bulkDeleteDbStudioSelection = bulkDeleteDbStudioSelection');
    expect(jsContent).toContain('window.bulkExportDbStudioSelection = bulkExportDbStudioSelection');
    expect(jsContent).toContain('window.openDbStudioSeederModal = openDbStudioSeederModal');
    expect(jsContent).toContain('window.runDummyPreset = runDummyPreset');
    expect(jsContent).toContain('window.runCustomDummyGenerator = runCustomDummyGenerator');
    expect(jsContent).toContain('window.purgeDummyDataOnly = purgeDummyDataOnly');
    expect(jsContent).toContain('window.exportDbStudioJSON = exportDbStudioJSON');
    expect(jsContent).toContain('window.importDbStudioJSON = importDbStudioJSON');
  });

  it('includes mobile-first responsive CSS rules and design token sync in tab-settings.css', () => {
    expect(cssContent).toContain('.settings-subtabs-bar');
    expect(cssContent).toContain('.settings-subtab-btn');
    expect(cssContent).toContain('.db-studio-hud');
    expect(cssContent).toContain('.db-studio-collections-nav');
    expect(cssContent).toContain('.db-studio-table-wrap');
    expect(cssContent).toContain('.db-studio-mobile-cards');
    expect(cssContent).toContain('.db-tag-dummy');
    expect(cssContent).toContain('.db-studio-modal-backdrop');
    expect(cssContent).toContain('.db-studio-modal-card');

    // Mobile-first breakpoint rule check
    expect(cssContent).toContain('@media (max-width: 639px)');
  });
});
