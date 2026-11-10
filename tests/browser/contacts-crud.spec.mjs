import { test, expect } from 'playwright/test';

test.describe('Contacts Tab (Helpers) - Full CRUD Functionality Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    // Establish admin session and clear contacts to start from a clean state
    await page.evaluate(() => {
      if (typeof window.createAdminSession === 'function') {
        window.createAdminSession('admin', false);
      }
      localStorage.removeItem('casebook_court_helpers');
      localStorage.setItem('casebook_active_tab', 'helpers');
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 15000 });

    // Switch to helpers tab and re-render
    await page.evaluate(async () => {
      await window.showTab('helpers');
      if (typeof window.renderHelpersTable === 'function') {
        window.renderHelpersTable();
      }
    });

    await expect(page.locator('#helpers')).toHaveClass(/active/, { timeout: 15000 });
    await expect(page.locator('#helpersCardsGrid')).toBeVisible({ timeout: 15000 });
  });

  test('1. Initial State: Displays empty state with zero contacts badge', async ({ page }) => {
    const emptyState = page.locator('#helpersCardsGrid .contacts-empty-state');
    await expect(emptyState).toBeVisible();
    await expect(page.locator('#helpersCardsGrid .contacts-empty-title')).toHaveText('No court helpers or workers found');
    await expect(page.locator('#helpersTotalCountBadge')).toContainText('0 Helpers Registered');
  });

  test('2. Create (Validation & Add Contact): Validates required fields and creates new contact card', async ({ page }) => {
    // Open Add Modal
    await page.click('.contacts-add-btn');
    const modal = page.locator('#addHelperModal');
    await expect(modal).not.toHaveClass(/hidden/);

    // Test form validation: submitting empty form
    await page.evaluate(() => {
      window.handleSaveHelper();
    });
    const errorMsg = page.locator('#addHelperErrorMsg');
    await expect(errorMsg).not.toHaveClass(/hidden/);
    await expect(errorMsg).toContainText('Please enter the worker / staff name');

    // Fill valid data
    await page.fill('#helperNameInput', 'Shri Rajeshwar Nath');
    
    // Select court
    await page.evaluate(() => {
      const select = document.getElementById('helperCourtSelect');
      if (select && select.options.length > 1) {
        select.selectedIndex = 1;
      }
    });
    const selectedCourt = await page.evaluate(() => {
      return document.getElementById('helperCourtSelect')?.value;
    });

    await page.fill('#helperPositionInput', 'Reader (पेशकार)');
    await page.fill('#helperMobileInput', '9876543210');

    // Submit form
    await page.click('#saveHelperSubmitBtn');
    await page.waitForTimeout(300);

    // Modal should close
    await expect(modal).toHaveClass(/hidden/);

    // Verify card rendered
    const card = page.locator('.contact-card');
    await expect(card).toBeVisible();
    await expect(card.locator('.contact-name')).toHaveText('Shri Rajeshwar Nath');
    await expect(card.locator('.contact-role')).toHaveText('Reader (पेशकार)');
    await expect(card.locator('.contact-court-text')).toHaveText(selectedCourt);
    await expect(card.locator('.contact-phone-text')).toHaveText('9876543210');

    // Verify Avatar initials
    await expect(card.locator('.contact-avatar')).toContainText('SN');

    // Verify action links
    const waBtn = card.locator('.contact-action-chat');
    await expect(waBtn).toHaveAttribute('href', 'https://wa.me/919876543210');

    const callBtn = card.locator('.contact-action-call');
    await expect(callBtn).toHaveAttribute('href', 'tel:9876543210');

    // Verify badge updated
    await expect(page.locator('#helpersTotalCountBadge')).toContainText('1 Helper Registered');
  });

  test('3. Read & Search/Filter: Real-time search and custom court dropdown filtering', async ({ page }) => {
    // Populate with 2 contacts
    await page.evaluate(() => {
      const testContacts = [
        { id: 'h1', name: 'Shri Rajeshwar Nath', court: 'Commercial Court', position: 'Reader', mobile: '9876543210' },
        { id: 'h2', name: 'Sunita Verma', court: 'Family Court', position: 'Stenographer', mobile: '9123456789' }
      ];
      localStorage.setItem('casebook_court_helpers', JSON.stringify(testContacts));
      window.renderHelpersTable();
    });
    await page.waitForTimeout(200);

    await expect(page.locator('.contact-card')).toHaveCount(2);

    // Test text search by role
    await page.fill('#helperSearchInput', 'Steno');
    await page.waitForTimeout(150);
    let names = await page.evaluate(() => Array.from(document.querySelectorAll('.contact-name')).map(el => el.textContent));
    expect(names).toEqual(['Sunita Verma']);

    // Test text search by phone
    await page.fill('#helperSearchInput', '9876');
    await page.waitForTimeout(150);
    names = await page.evaluate(() => Array.from(document.querySelectorAll('.contact-name')).map(el => el.textContent));
    expect(names).toEqual(['Shri Rajeshwar Nath']);

    // Clear search input
    await page.fill('#helperSearchInput', '');
    await page.waitForTimeout(150);
    names = await page.evaluate(() => Array.from(document.querySelectorAll('.contact-name')).map(el => el.textContent));
    expect(names.length).toBe(2);

    // Test custom dropdown filtering
    await page.evaluate(() => {
      window.selectContactsCourtOption('Family Court');
    });
    await page.waitForTimeout(200);

    // Verify dropdown label updated
    await expect(page.locator('#contactsCourtDropdownLabel')).toHaveText('Family Court');

    // Only Family Court contact visible
    names = await page.evaluate(() => Array.from(document.querySelectorAll('.contact-name')).map(el => el.textContent));
    expect(names).toEqual(['Sunita Verma']);

    // Reset dropdown to all courts
    await page.evaluate(() => {
      window.selectContactsCourtOption('');
    });
    await page.waitForTimeout(200);
    await expect(page.locator('#contactsCourtDropdownLabel')).toHaveText('All Courts (All Forums)');
    names = await page.evaluate(() => Array.from(document.querySelectorAll('.contact-name')).map(el => el.textContent));
    expect(names.length).toBe(2);
  });

  test('4. Update (Edit Contact): Modifies contact details and updates card in real time', async ({ page }) => {
    // Populate with 1 contact
    await page.evaluate(() => {
      const testContacts = [
        { id: 'h1', name: 'Shri Rajeshwar Nath', court: 'Commercial Court', position: 'Reader', mobile: '9876543210' }
      ];
      localStorage.setItem('casebook_court_helpers', JSON.stringify(testContacts));
      window.renderHelpersTable();
    });
    await page.waitForTimeout(200);

    // Click Edit button
    await page.click('.edit-helper-btn');
    const editModal = page.locator('#editHelperModal');
    await expect(editModal).not.toHaveClass(/hidden/);

    // Verify existing values pre-filled
    await expect(page.locator('#editHelperNameInput')).toHaveValue('Shri Rajeshwar Nath');
    await expect(page.locator('#editHelperPositionInput')).toHaveValue('Reader');
    await expect(page.locator('#editHelperMobileInput')).toHaveValue('9876543210');

    // Modify fields
    await page.fill('#editHelperPositionInput', 'Chief Reader / Senior Peshkar');
    await page.fill('#editHelperMobileInput', '9998887776');

    // Save changes
    await page.click('#saveEditHelperBtn');
    await page.waitForTimeout(300);

    // Verify modal closed
    await expect(editModal).toHaveClass(/hidden/);

    // Verify card content updated
    const card = page.locator('.contact-card');
    await expect(card.locator('.contact-role')).toHaveText('Chief Reader / Senior Peshkar');
    await expect(card.locator('.contact-phone-text')).toHaveText('9998887776');
    await expect(card.locator('.contact-action-call')).toHaveAttribute('href', 'tel:9998887776');
    await expect(card.locator('.contact-action-chat')).toHaveAttribute('href', 'https://wa.me/919998887776');
  });

  test('5. Delete (Removal & Cleanup): Confirms deletion modal and cleans up records', async ({ page }) => {
    // Populate with 1 contact
    await page.evaluate(() => {
      const testContacts = [
        { id: 'h1', name: 'Shri Rajeshwar Nath', court: 'Commercial Court', position: 'Reader', mobile: '9876543210' }
      ];
      localStorage.setItem('casebook_court_helpers', JSON.stringify(testContacts));
      window.renderHelpersTable();
    });
    await page.waitForTimeout(200);

    // Click Delete button
    await page.click('.delete-helper-btn');
    const deleteModal = page.locator('#deleteHelperModal');
    await expect(deleteModal).not.toHaveClass(/hidden/);

    // Verify prompt text includes contact name
    await expect(page.locator('#deleteHelperDisplayName')).toContainText('Shri Rajeshwar Nath');

    // Confirm deletion
    await page.click('#deleteHelperModal .helper-btn-danger');
    await page.waitForTimeout(300);

    // Verify modal closed
    await expect(deleteModal).toHaveClass(/hidden/);

    // Verify card removed and empty state shown
    await expect(page.locator('.contact-card')).toHaveCount(0);
    await expect(page.locator('#helpersCardsGrid .contacts-empty-state')).toBeVisible();
    await expect(page.locator('#helpersTotalCountBadge')).toContainText('0 Helpers Registered');

    // Verify localStorage cleaned up
    const stored = await page.evaluate(() => localStorage.getItem('casebook_court_helpers'));
    expect(JSON.parse(stored || '[]')).toHaveLength(0);
  });
});
