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

  it('getTicketUnitPrice should accurately return unit price based on face value rules', () => {
    expect(window.getTicketUnitPrice).toBeDefined();

    // Standard preset face values
    expect(window.getTicketUnitPrice(1)).toBe(1.25);
    expect(window.getTicketUnitPrice(2)).toBe(2.50);
    expect(window.getTicketUnitPrice(5)).toBe(6.00);
    expect(window.getTicketUnitPrice(10)).toBe(12.00);
    expect(window.getTicketUnitPrice(20)).toBe(30.00);
    expect(window.getTicketUnitPrice(50)).toBe(70.00);
    expect(window.getTicketUnitPrice(100)).toBe(120.00);

    // Range from 200 to 1000 (+20 for each)
    expect(window.getTicketUnitPrice(200)).toBe(220.00);
    expect(window.getTicketUnitPrice(300)).toBe(320.00);
    expect(window.getTicketUnitPrice(500)).toBe(520.00);
    expect(window.getTicketUnitPrice(1000)).toBe(1020.00);
  });

  it('calculatePaisaTicketTotal should compute final price = price * qty based on face value', () => {
    document.body.innerHTML = `
      <select id="paisaTicketValue">
        <option value="1">₹1</option>
        <option value="2">₹2</option>
        <option value="5">₹5</option>
        <option value="10" selected>₹10</option>
        <option value="20">₹20</option>
        <option value="50">₹50</option>
        <option value="100">₹100</option>
        <option value="200">₹200</option>
        <option value="500">₹500</option>
        <option value="1000">₹1000</option>
      </select>
      <input id="paisaCustomFaceValue" value="" />
      <input id="paisaTicketQty" value="1" />
      <span id="paisaVendorRateHint"></span>
      <span id="paisaCalcSummaryRate"></span>
      <span id="paisaCalcSummaryTotal"></span>
      <input id="paisaSpendAmount" value="" />
      <input id="paisaSpendPayeeName" value="" />
    `;

    // 1. Face Value 1: Price 1.25 * 1 = 1.25
    document.getElementById('paisaTicketValue').value = '1';
    document.getElementById('paisaTicketQty').value = '1';
    window.calculatePaisaTicketTotal();
    expect(document.getElementById('paisaSpendAmount').value).toBe('1.25');

    // 2. Face Value 2: Price 2.50 * 1 = 2.50
    document.getElementById('paisaTicketValue').value = '2';
    document.getElementById('paisaTicketQty').value = '1';
    window.calculatePaisaTicketTotal();
    expect(document.getElementById('paisaSpendAmount').value).toBe('2.50');

    // 3. Face Value 5: Price 6.00 * 1 = 6
    document.getElementById('paisaTicketValue').value = '5';
    document.getElementById('paisaTicketQty').value = '1';
    window.calculatePaisaTicketTotal();
    expect(document.getElementById('paisaSpendAmount').value).toBe('6');

    // 4. Face Value 10: Price 12.00 * 1 = 12
    document.getElementById('paisaTicketValue').value = '10';
    document.getElementById('paisaTicketQty').value = '1';
    window.calculatePaisaTicketTotal();
    expect(document.getElementById('paisaSpendAmount').value).toBe('12');

    // 5. Face Value 20: Price 30.00 * 1 = 30
    document.getElementById('paisaTicketValue').value = '20';
    document.getElementById('paisaTicketQty').value = '1';
    window.calculatePaisaTicketTotal();
    expect(document.getElementById('paisaSpendAmount').value).toBe('30');

    // 6. Face Value 50: Price 70.00 * 1 = 70
    document.getElementById('paisaTicketValue').value = '50';
    document.getElementById('paisaTicketQty').value = '1';
    window.calculatePaisaTicketTotal();
    expect(document.getElementById('paisaSpendAmount').value).toBe('70');

    // 7. Face Value 100: Price 120.00 * 1 = 120
    document.getElementById('paisaTicketValue').value = '100';
    document.getElementById('paisaTicketQty').value = '1';
    window.calculatePaisaTicketTotal();
    expect(document.getElementById('paisaSpendAmount').value).toBe('120');

    // 8. Range 200 to 1000 (+20 for each): Face Value 200 -> Price 220 * 1 = 220
    document.getElementById('paisaTicketValue').value = '200';
    document.getElementById('paisaTicketQty').value = '1';
    window.calculatePaisaTicketTotal();
    expect(document.getElementById('paisaSpendAmount').value).toBe('220');

    // Face Value 500: Price 520 * 2 = 1040
    document.getElementById('paisaTicketValue').value = '500';
    document.getElementById('paisaTicketQty').value = '2';
    window.calculatePaisaTicketTotal();
    expect(document.getElementById('paisaSpendAmount').value).toBe('1040');

    // Face Value 1000: Price 1020 * 1 = 1020
    document.getElementById('paisaTicketValue').value = '1000';
    document.getElementById('paisaTicketQty').value = '1';
    window.calculatePaisaTicketTotal();
    expect(document.getElementById('paisaSpendAmount').value).toBe('1020');

    // Custom Face Value in 200-1000 range: e.g. 350 -> Price 370 * 2 = 740
    document.getElementById('paisaCustomFaceValue').value = '350';
    document.getElementById('paisaTicketQty').value = '2';
    window.calculatePaisaTicketTotal();
    expect(document.getElementById('paisaSpendAmount').value).toBe('740');
  });

  it('calculatePaisaTicketTotal should fallback gracefully when only vendor select is present', () => {
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
    // 10 qty * ₹11 (Ajay) = ₹110
    expect(amtInput.value).toBe('110');

    // Change to Zameer: 5 qty * ₹12 = ₹60
    document.getElementById('paisaTicketVendor').value = 'zameer';
    document.getElementById('paisaTicketQty').value = '5';
    window.calculatePaisaTicketTotal();

    expect(amtInput.value).toBe('60');
  });

  it('setPaisaReceivedCategory should update hidden input and toggle active category chip', () => {
    document.body.innerHTML = `
      <div id="paisaReceivedModal">
        <input type="hidden" id="paisaReceivedCategory" value="fee" />
        <button type="button" class="paisa-cat-chip active" data-cat="fee">Fee</button>
        <button type="button" class="paisa-cat-chip" data-cat="advance">Advance</button>
        <button type="button" class="paisa-cat-chip" data-cat="final">Final</button>
      </div>
    `;

    expect(window.setPaisaReceivedCategory).toBeDefined();
    window.setPaisaReceivedCategory('advance');

    expect(document.getElementById('paisaReceivedCategory').value).toBe('advance');
    const chips = document.querySelectorAll('.paisa-cat-chip');
    expect(chips[0].classList.contains('active')).toBe(false);
    expect(chips[1].classList.contains('active')).toBe(true);
    expect(chips[2].classList.contains('active')).toBe(false);
  });

  it('setPaisaFaceValue and handlePaisaCustomFaceValue should update ticket face value and chip states', () => {
    document.body.innerHTML = `
      <div id="paisaSpendModal">
        <select id="paisaTicketValue">
          <option value="5">₹5</option>
          <option value="10" selected>₹10</option>
          <option value="20">₹20</option>
          <option value="50">₹50</option>
        </select>
        <input id="paisaCustomFaceValue" value="" />
        <button type="button" class="paisa-fv-chip active" data-fv="10">₹10</button>
        <button type="button" class="paisa-fv-chip" data-fv="20">₹20</button>
        <select id="paisaTicketVendor">
          <option value="ajay" selected>Ajay (₹11)</option>
        </select>
        <input id="paisaTicketQty" value="2" />
        <input id="paisaSpendAmount" value="" />
        <span id="paisaVendorRateHint"></span>
      </div>
    `;

    expect(window.setPaisaFaceValue).toBeDefined();
    window.setPaisaFaceValue(20);

    expect(document.getElementById('paisaTicketValue').value).toBe('20');
    expect(document.getElementById('paisaCustomFaceValue').value).toBe('');
    expect(document.querySelector('.paisa-fv-chip[data-fv="20"]').classList.contains('active')).toBe(true);
    expect(document.querySelector('.paisa-fv-chip[data-fv="10"]').classList.contains('active')).toBe(false);

    // Custom face value
    expect(window.handlePaisaCustomFaceValue).toBeDefined();
    window.handlePaisaCustomFaceValue('50');
    expect(document.getElementById('paisaTicketValue').value).toBe('50');
    expect(document.querySelector('.paisa-fv-chip[data-fv="20"]').classList.contains('active')).toBe(false);
  });

  it('setPaisaSpendCategory should only open ticket calculator panel when ticket is selected and hide it for other categories', () => {
    document.body.innerHTML = `
      <div id="paisaSpendModal">
        <input type="hidden" id="paisaSpendCategory" value="ticket" />
        <button type="button" class="cat-btn paisa-cat-chip active" data-cat="ticket"><span>🎫</span> Ticket</button>
        <button type="button" class="cat-btn paisa-cat-chip" data-cat="clerk"><span>👨‍💼</span> Clerk</button>
        <button type="button" class="cat-btn paisa-cat-chip" data-cat="travel"><span>🚗</span> Travel</button>
        <div id="paisaTicketCalcBox" class="calculator-panel"></div>
        <div id="paisaSpendLinkSection" style="display: none;"></div>
        <input id="paisaSpendPayeeName" value="" />
        <select id="paisaTicketVendor"><option value="ajay">Ajay</option></select>
        <select id="paisaTicketValue"><option value="10">10</option></select>
        <input id="paisaTicketQty" value="1" />
        <span id="paisaVendorRateHint"></span>
      </div>
    `;

    expect(window.setPaisaSpendCategory).toBeDefined();

    // Selecting 'clerk' hides the ticket calc box
    window.setPaisaSpendCategory('clerk');
    const calcBox = document.getElementById('paisaTicketCalcBox');
    expect(calcBox.style.display).toBe('none');
    expect(calcBox.classList.contains('hidden')).toBe(true);
    expect(document.querySelector('[data-cat="clerk"]').classList.contains('active')).toBe(true);
    expect(document.querySelector('[data-cat="ticket"]').classList.contains('active')).toBe(false);

    // Selecting 'ticket' opens the ticket calc box
    window.setPaisaSpendCategory('ticket');
    expect(calcBox.style.display).toBe('flex');
    expect(calcBox.classList.contains('hidden')).toBe(false);
    expect(document.querySelector('[data-cat="ticket"]').classList.contains('active')).toBe(true);
    expect(document.querySelector('[data-cat="clerk"]').classList.contains('active')).toBe(false);

    // Selecting 'travel' hides it again
    window.setPaisaSpendCategory('travel');
    expect(calcBox.style.display).toBe('none');
    expect(calcBox.classList.contains('hidden')).toBe(true);
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


describe('components/tabs/paisa/tab-paisa.js - Personal Budget Pulse (Option 4)', () => {
  it('renderPersonalBudgetPulse should compute safe daily spend, pace badge, and top category drains', () => {
    expect(window.renderPersonalBudgetPulse).toBeDefined();

    document.body.innerHTML = `
      <div id="paisaPersonalBudgetPulseCard">
        <span id="paisaPulseStatusBadge"><span id="paisaPulseStatusText"></span></span>
        <div id="paisaPulseDailySafeVal"></div>
        <div id="paisaPulseDaysRemainingVal"></div>
        <div id="paisaPulseTotalSpentVal"></div>
        <div id="paisaPulseCapProgressVal"></div>
        <div id="paisaPulseProgressBar" style="width: 0%"></div>
        <span id="paisaPulseCapBoundLabel"></span>
        <span id="paisaPulseDrainsCount"></span>
        <div id="paisaPulseDrainsList"></div>
        <strong id="paisaPulseReserveVal"></strong>
      </div>
    `;

    window.allPersonalTransactions.length = 0;
    localStorage.setItem('casebook_personal_budget_cap', '30000');
    window.paisaPersonalSelectedPeriod = 'all';

    window.allPersonalTransactions.push(
      { id: 'in1', type: 'transfer_in', amount: 30000, date: '2026-10-10' },
      { id: 'sp1', type: 'personal_spent', amount: 7000, category: 'groceries', note: 'Food market', date: '2026-10-12' },
      { id: 'sp2', type: 'personal_spent', amount: 5000, category: 'fuel', note: 'Petrol pump', date: '2026-10-15' }
    );

    window.renderPersonalBudgetPulse();

    expect(document.getElementById('paisaPulseTotalSpentVal').textContent).toBe('₹12,000');
    expect(document.getElementById('paisaPulseReserveVal').textContent).toBe('₹18,000');
    expect(document.getElementById('paisaPulseCapProgressVal').textContent).toContain('40%');
    expect(document.getElementById('paisaPulseProgressBar').style.width).toBe('40%');
    expect(document.getElementById('paisaPulseStatusText').textContent).toBe('On Track');
    expect(document.getElementById('paisaPulseDrainsList').innerHTML).toContain('Food &amp; Dining');
    expect(document.getElementById('paisaPulseDrainsList').innerHTML).toContain('Fuel &amp; Travel');
  });
});


describe('components/tabs/paisa/tab-paisa.js - Virtual Account Refactoring & Cashflow Pulse', () => {
  it('renderVirtualCashflowPulse should compute operating margin, collection split, and available transfer', () => {
    expect(window.renderVirtualCashflowPulse).toBeDefined();

    document.body.innerHTML = `
      <div id="paisaVirtualCashflowPulseCard">
        <span id="paisaVirtualStatusBadge"><span id="paisaVirtualStatusText"></span></span>
        <div id="paisaVirtualMarginVal"></div>
        <div id="paisaVirtualSurplusVal"></div>
        <div id="paisaVirtualAvgReceiptVal"></div>
        <div id="paisaVirtualReceiptCount"></div>
        <span id="paisaVirtualOnlinePct"></span>
        <span id="paisaVirtualCashPct"></span>
        <div id="paisaVirtualOnlineBar" style="width: 50%"></div>
        <div id="paisaVirtualCashBar" style="width: 50%"></div>
        <span id="paisaVirtualOnlineAmtLbl"></span>
        <span id="paisaVirtualCashAmtLbl"></span>
        <span id="paisaVirtualExpenseCount"></span>
        <div id="paisaVirtualDrainsList"></div>
        <strong id="paisaVirtualAvailableTransferVal"></strong>
      </div>
    `;

    const mockTransactions = [
      { id: 'v1', type: 'received', amount: 50000, mode: 'online', date: '2026-10-10' },
      { id: 'v2', type: 'received', amount: 20000, mode: 'cash', date: '2026-10-12' },
      { id: 'v3', type: 'spent', amount: 15000, category: 'court', note: 'High court stamp', date: '2026-10-14' },
      { id: 'v4', type: 'transfer_to_personal', amount: 10000, date: '2026-10-15' }
    ];

    window.renderVirtualCashflowPulse(mockTransactions);

    // Total received = 70,000, Total spent = 15,000, Transferred = 10,000 -> Net = 45,000
    // Margin = (45,000 / 70,000) * 100 = 64%
    expect(document.getElementById('paisaVirtualMarginVal').textContent).toBe('64%');
    expect(document.getElementById('paisaVirtualSurplusVal').textContent).toContain('Surplus +₹45,000');
    expect(document.getElementById('paisaVirtualStatusText').textContent).toBe('Healthy Margin');

    // Online vs Cash: Online 50k (71%), Cash 20k (29%)
    expect(document.getElementById('paisaVirtualOnlinePct').textContent).toBe('71%');
    expect(document.getElementById('paisaVirtualCashPct').textContent).toBe('29%');
    expect(document.getElementById('paisaVirtualOnlineAmtLbl').textContent).toBe('₹50,000');
    expect(document.getElementById('paisaVirtualCashAmtLbl').textContent).toBe('₹20,000');

    // Available to transfer
    expect(document.getElementById('paisaVirtualAvailableTransferVal').textContent).toBe('₹45,000');
  });
});
