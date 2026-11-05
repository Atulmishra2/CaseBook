import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Settings Tab Redesign - Zen Chambers Architecture Suite', () => {
  let htmlContent;
  let jsContent;

  beforeEach(() => {
    htmlContent = readFileSync(
      resolve(process.cwd(), 'components/tabs/settings/tab-settings.html'),
      'utf8'
    );
    jsContent = readFileSync(
      resolve(process.cwd(), 'components/tabs/settings/tab-settings.js'),
      'utf8'
    );
  });

  it('matches HTML template between static file and in-memory JS export', () => {
    // Both files should declare the new Zen executive structure
    expect(htmlContent).toContain('class="settings-container"');
    expect(jsContent).toContain('class="settings-container"');

    expect(htmlContent).toContain('class="settings-hero"');
    expect(jsContent).toContain('class="settings-hero"');

    expect(htmlContent).toContain('class="settings-stats-row"');
    expect(jsContent).toContain('class="settings-stats-row"');
  });

  it('preserves all critical Supabase configuration DOM IDs and event handlers', () => {
    expect(htmlContent).toContain('id="supabaseConfigForm"');
    expect(htmlContent).toContain('id="supabaseProjectUrlInput"');
    expect(htmlContent).toContain('id="supabaseAnonKeyInput"');
    expect(htmlContent).toContain('id="supabaseConnBadge"');
    expect(htmlContent).toContain('id="statusDot"');
    expect(htmlContent).toContain('id="statusText"');
    expect(htmlContent).toContain('id="disconnectBtn"');
    expect(htmlContent).toContain('id="testBtn"');
    expect(htmlContent).toContain('id="testBtnText"');
    expect(htmlContent).toContain('id="connectBtn"');
    expect(htmlContent).toContain('id="connectBtnText"');
    expect(htmlContent).toContain('id="connectIcon"');
    expect(htmlContent).toContain('id="loadingSpinner"');
    expect(htmlContent).toContain('id="supabaseConfigStatus"');

    expect(htmlContent).toContain('handleSaveSupabaseConfig(event)');
    expect(htmlContent).toContain('handleTestSupabaseConfig()');
    expect(htmlContent).toContain('handleClearSupabaseConfig()');
  });

  it('preserves all critical Admin Security Credentials DOM IDs and event handlers', () => {
    expect(htmlContent).toContain('id="settingsForm"');
    expect(htmlContent).toContain('id="currentPassword"');
    expect(htmlContent).toContain('id="newUsername"');
    expect(htmlContent).toContain('id="newPassword"');
    expect(htmlContent).toContain('id="confirmNewPassword"');
    expect(htmlContent).toContain('id="settingsStatus"');

    expect(htmlContent).toContain('handleChangeCredentials(event)');
    expect(htmlContent).toContain('togglePasswordVisibility');
  });

  it('includes live password requirement chips and diagnostic counters', () => {
    expect(htmlContent).toContain('id="pwReqLen"');
    expect(htmlContent).toContain('id="pwReqAlphaNum"');
    expect(htmlContent).toContain('id="pwReqMatch"');

    expect(htmlContent).toContain('id="settingsCasesCount"');
    expect(htmlContent).toContain('id="settingsHearingsCount"');
    expect(htmlContent).toContain('id="settingsCourtsCount"');
    expect(htmlContent).toContain('id="settingsTotalRecordsVal"');
  });

  it('exports controller helpers in tab-settings.js', () => {
    expect(jsContent).toContain('window.initSettingsTabEnhancements');
    expect(jsContent).toContain('window.updateSettingsThemeLabel');
    expect(jsContent).toContain('window.updateSettingsDiagnostics');
    expect(jsContent).toContain('window.updateSettingsGatewayBadge');
  });

  it('keeps collapsible sections collapsed by default', () => {
    expect(htmlContent).toContain('id="supabaseContent" class="collapse-content"');
    expect(jsContent).toContain('id="supabaseContent" class="collapse-content"');

    expect(htmlContent).toContain('id="passwordContent" class="collapse-content"');
    expect(jsContent).toContain('id="passwordContent" class="collapse-content"');

    expect(htmlContent).toContain('id="supabaseChevron" class="fa-solid fa-chevron-down chevron-icon"');
    expect(htmlContent).toContain('id="passwordChevron" class="fa-solid fa-chevron-down chevron-icon"');
  });
});
