import { describe, it, expect, beforeEach } from 'vitest';
import '../utils/dateUtils.js';
import '../admin.js';
import '../components/tabs/paisa/tab-paisa.js';

describe('components/tabs/paisa/tab-paisa.js - Currency & Amount Formatting', () => {
  it('formatPaisaAmount should format numbers with Indian comma grouping and rounding', () => {
    expect(window.formatPaisaAmount).toBeDefined();

    expect(window.formatPaisaAmount(0)).toBe('0');
    expect(window.formatPaisaAmount(1000)).toBe('1,000');
    expect(window.formatPaisaAmount(100000)).toBe('1,00,000');
    expect(window.formatPaisaAmount(1250000)).toBe('12,50,000');

    // Rounding floats
    expect(window.formatPaisaAmount(999.4)).toBe('999');
    expect(window.formatPaisaAmount(999.6)).toBe('1,000');

    // Null and invalid inputs
    expect(window.formatPaisaAmount(null)).toBe('0');
    expect(window.formatPaisaAmount(undefined)).toBe('0');
    expect(window.formatPaisaAmount('invalid')).toBe('0');
  });
});

describe('components/tabs/paisa/tab-paisa.js - Vendor Rates & Ticket Calculations', () => {
  beforeEach(() => {
    window.safeStorage.remove('paisa_vendors');
  });

  it('getPaisaVendors should load default Ajay and Zameer rates', () => {
    expect(window.getPaisaVendors).toBeDefined();
    const vendors = window.getPaisaVendors();
    expect(vendors.ajay).toBeDefined();
    expect(vendors.ajay.rate).toBe(11);
    expect(vendors.zameer).toBeDefined();
    expect(vendors.zameer.rate).toBe(12);
  });

  it('savePaisaVendors should persist updated rates to safeStorage', () => {
    const updated = {
      ajay: { name: 'Ajay', rate: 15 },
      zameer: { name: 'Zameer', rate: 16 }
    };
    window.savePaisaVendors(updated);

    const reloaded = window.getPaisaVendors();
    expect(reloaded.ajay.rate).toBe(15);
    expect(reloaded.zameer.rate).toBe(16);
  });

  it('calculatePaisaTicketTotal should accurately multiply qty by vendor rate', () => {
    document.body.innerHTML = `
      <select id="paisaTicketVendor">
        <option value="ajay" selected>Ajay (₹11)</option>
        <option value="zameer">Zameer (₹12)</option>
      </select>
      <input id="paisaTicketQty" value="10" />
      <span id="paisaVendorRateHint"></span>
      <input id="paisaSpendAmount" value="" />
    `;

    window.calculatePaisaTicketTotal();

    const amtInput = document.getElementById('paisaSpendAmount');
    const hint = document.getElementById('paisaVendorRateHint');

    // 10 qty * ₹11 (Ajay) = ₹110
    expect(amtInput.value).toBe('110');
    expect(hint.textContent).toContain('₹11/ticket');

    // Change to Zameer: 5 qty * ₹12 = ₹60
    document.getElementById('paisaTicketVendor').value = 'zameer';
    document.getElementById('paisaTicketQty').value = '5';
    window.calculatePaisaTicketTotal();

    expect(amtInput.value).toBe('60');
    expect(hint.textContent).toContain('₹12/ticket');
  });
});

describe('components/tabs/paisa/tab-paisa.js - Financial Ledger & Net Balances', () => {
  beforeEach(() => {
    if (window.allPaisaTransactions) {
      window.allPaisaTransactions.length = 0;
    }
    if (window.allPersonalTransactions) {
      window.allPersonalTransactions.length = 0;
    }
  });

  it('getVirtualNetBalance should accurately compute: Received - Spent - TransferToPersonal', () => {
    expect(window.getVirtualNetBalance).toBeDefined();

    // 0 balance when empty
    expect(window.getVirtualNetBalance()).toBe(0);

    // Add received fee: ₹50,000
    window.allPaisaTransactions.push({ id: '1', type: 'received', amount: 50000 });
    expect(window.getVirtualNetBalance()).toBe(50000);

    // Add court expense: ₹5,000
    window.allPaisaTransactions.push({ id: '2', type: 'spent', amount: 5000 });
    expect(window.getVirtualNetBalance()).toBe(45000);

    // Transfer to advocate personal wallet: ₹10,000
    window.allPaisaTransactions.push({ id: '3', type: 'transfer_to_personal', amount: 10000 });
    expect(window.getVirtualNetBalance()).toBe(35000);
  });

  it('getPersonalBalance should compute: TransferIn - PersonalSpent', () => {
    expect(window.getPersonalBalance).toBeDefined();

    expect(window.getPersonalBalance()).toBe(0);

    // Received transfer into personal wallet: ₹10,000
    window.allPersonalTransactions.push({ id: 'p1', type: 'transfer_in', amount: 10000 });
    expect(window.getPersonalBalance()).toBe(10000);

    // Spent on personal expense: ₹3,200
    window.allPersonalTransactions.push({ id: 'p2', type: 'personal_spent', amount: 3200 });
    expect(window.getPersonalBalance()).toBe(6800);
  });
});

describe('components/tabs/paisa/tab-paisa.js - Transaction Date Range Filter', () => {
  it('getPaisaDateRangeFilter should correctly filter transactions by period', () => {
    expect(window.getPaisaDateRangeFilter).toBeDefined();

    const todayStr = window.getTodayDateString();
    const filterAll = window.getPaisaDateRangeFilter('all');
    const filterToday = window.getPaisaDateRangeFilter('today');

    const txnToday = { id: 't1', date: todayStr };
    const txnOld = { id: 't2', date: '2020-01-01' };

    // 'all' includes everything
    expect(filterAll(txnToday)).toBe(true);
    expect(filterAll(txnOld)).toBe(true);

    // 'today' includes only today
    expect(filterToday(txnToday)).toBe(true);
    expect(filterToday(txnOld)).toBe(false);
  });

  it('normalizePaisaDate should format various date formats into YYYY-MM-DD', () => {
    expect(window.normalizePaisaDate).toBeDefined();
    expect(window.normalizePaisaDate('2026-10-14')).toBe('2026-10-14');
    expect(window.normalizePaisaDate('2026-10-14T09:30:00.000Z')).toBe('2026-10-14');
    expect(window.normalizePaisaDate('14/10/2026')).toBe('2026-10-14');
    expect(window.normalizePaisaDate('14-10-2026')).toBe('2026-10-14');
  });

  it('reconcilePersonalTransactions should automatically populate Personal Account with transfers from Virtual Account', () => {
    expect(window.reconcilePersonalTransactions).toBeDefined();

    window.allPaisaTransactions.length = 0;
    window.allPersonalTransactions.length = 0;

    // Simulate transfer recorded in Virtual Account
    window.allPaisaTransactions.push({
      id: 'transfer_101',
      type: 'transfer_to_personal',
      amount: 15000,
      note: 'Transfer for household',
      date: '2026-10-14'
    });

    // Before reconciliation, Personal Account is empty
    expect(window.allPersonalTransactions.length).toBe(0);

    // Run reconciliation
    window.reconcilePersonalTransactions();

    // After reconciliation, Personal Account should show the transfer entry
    expect(window.allPersonalTransactions.length).toBe(1);
    expect(window.allPersonalTransactions[0].type).toBe('transfer_in');
    expect(window.allPersonalTransactions[0].amount).toBe(15000);
    expect(window.allPersonalTransactions[0].note).toBe('Transfer for household');
    expect(window.allPersonalTransactions[0].date).toBe('2026-10-14');
    expect(window.getPersonalBalance()).toBe(15000);
  });
});
