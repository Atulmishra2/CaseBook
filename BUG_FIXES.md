# 🐞 CaseBook - Bug Fixes & Improvements Log

Yeh document CaseBook application me identify aur fix kiye gaye sabhi bugs, runtime errors, aur logical flaws ka complete, detailed record maintain karta hai.

---

## 📋 Summary Table

| Bug ID | Date | Affected File(s) | Severity | Status | Short Description |
|---|---|---|---|---|---|
| **BUG-001** | 2026-10-14 | `admin.js` | 🟡 Medium | ✅ Fixed | `window.matchMedia` missing function check crash in PWA state check |
| **BUG-002** | 2026-10-14 | `services/todoService.js`, `admin.js` | 🔴 High | ✅ Fixed | `ReferenceError: supabaseClient is not defined` jab scripts out-of-order load hon |
| **BUG-003** | 2026-10-14 | `services/todoService.js` | 🔴 Critical | ✅ Fixed | `deleteCaseTask` me task delete hone ke baad `saveCaseTasksLocally` se revert hona |
| **BUG-004** | 2026-10-14 | `admin.js` | 🔴 High | ✅ Fixed | `showTab()` me unhandled ReferenceErrors agar koi tab script load na hui ho |
| **BUG-005** | 2026-10-14 | `admin.js` | 🟡 Medium | ✅ Fixed | `window.showTab` sirf function ke andar assign hona (pre-invocation undefined issue) |
| **BUG-006** | 2026-10-14 | `admin.js` | 🟡 Medium | ✅ Fixed | Security & Normalization helpers (`timingSafeEqual`, `sha256Sync`, `normalizeCaseRecord`) ka global export missing hona |
| **BUG-007** | 2026-10-14 | `components/tabs/paisa/paisa.js` | 🔴 High | ✅ Fixed | `getPaisaDateRangeFilter` me missing `getTodayDateString` se runtime crash hona |
| **BUG-008** | 2026-10-14 | `services/caseService.js` | 🔴 High | ✅ Fixed | `checkCaseNumberExists` & `updateCaseTableHearing` me null client `from()` call crash |
| **BUG-009** | 2026-10-14 | `services/caseService.js` | 🔴 High | ✅ Fixed | `performPostCrudRefresh` me undeclared `currentSelectedCase` fatal ReferenceError |

---

## 🔍 Detailed Bug Reports

---

### 1. BUG-001: `window.matchMedia` TypeError in PWA Install UI Check

* **Affected File:** [`admin.js`](file:///d:/caseBook-modular/admin.js#L9222) (`updateInstallUiState`)
* **Severity:** 🟡 Medium (UI / Runtime Crash)
* **Root Cause:**
  PWA display mode check karte waqt code directly call kar raha tha:
  ```javascript
  // BEFORE (Buggy)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  ```
  Agar user ka browser, older Android WebView, headless environment (Vitest/jsdom), ya restricted iframe me `window.matchMedia` available na ho ya `undefined` ho, toh script turant crash ho jati thi:
  `TypeError: window.matchMedia is not a function`.
* **Fix Applied:**
  `window.matchMedia` ko function check ke saath safely evaluate kiya gaya:
  ```javascript
  // AFTER (Fixed)
  const isStandalone = (typeof window.matchMedia === 'function' ? window.matchMedia('(display-mode: standalone)').matches : false) || window.navigator?.standalone === true;
  ```
* **Verification Test:**
  Covered under [`tests/securityAndAuth.test.js`](file:///d:/caseBook-modular/tests/securityAndAuth.test.js).

---

### 2. BUG-002: Undeclared `supabaseClient` Causing Fatal ReferenceError

* **Affected Files:**
  * [`services/todoService.js`](file:///d:/caseBook-modular/services/todoService.js#L8) (top-level & event listeners)
  * [`admin.js`](file:///d:/caseBook-modular/admin.js#L398) (`ensureSupabaseClient`)
* **Severity:** 🔴 High (Script Initialization Blocker)
* **Root Cause:**
  `todoService.js` top-level par direct evaluation kar raha tha:
  ```javascript
  // BEFORE (Buggy)
  updateSupabaseStatusIndicator(navigator.onLine && !!supabaseClient);
  ```
  Aur `admin.js` ke `ensureSupabaseClient()` me:
  ```javascript
  if (!supabaseClient && isSupabaseConfigured && window.supabase?.createClient) { ... }
  ```
  Dono files me `supabaseClient` scoped variable ke taur par declare hi nahi tha. Agar `services/supabaseClient.js` slow network ya CDN glitch ki wajah se baad me load ho, toh browser turant throw karta tha:
  `ReferenceError: supabaseClient is not defined`, jisse baki ke script tags execute hone se ruk jate the.
* **Fix Applied:**
  Scope me `supabaseClient` ko safe fallback ke saath declare aur resolve kiya gaya:
  ```javascript
  // AFTER (Fixed in todoService.js)
  var supabaseClient = (typeof window !== 'undefined' && window.supabaseClient) ? window.supabaseClient : null;

  // AFTER (Fixed in admin.js)
  var supabaseClient = (typeof window !== 'undefined' && window.supabaseClient) ? window.supabaseClient : null;
  var isSupabaseConfigured = (typeof window !== 'undefined' && typeof window.isSupabaseConfigured !== 'undefined') ? window.isSupabaseConfigured : false;
  ```
* **Verification Tests:**
  Covered under [`tests/todoService.test.js`](file:///d:/caseBook-modular/tests/todoService.test.js) aur [`tests/caseService.test.js`](file:///d:/caseBook-modular/tests/caseService.test.js).

---

### 3. BUG-003: Deleted Tasks Reverting Back in `deleteCaseTask`

* **Affected File:** [`services/todoService.js`](file:///d:/caseBook-modular/services/todoService.js#L73-L85) & [`#L953`](file:///d:/caseBook-modular/services/todoService.js#L953)
* **Severity:** 🔴 Critical (Data Persistence Bug)
* **Root Cause:**
  `deleteCaseTask(taskId)` task ko filter karta tha:
  ```javascript
  caseTasks = caseTasks.filter(t => t.id !== taskId);
  saveCaseTasksLocally();
  ```
  Lekin `saveCaseTasksLocally()` ke andar yeh logic likhi thi:
  ```javascript
  // BEFORE (Buggy)
  function saveCaseTasksLocally() {
    if (Array.isArray(window.caseTasks)) {
      caseTasks = window.caseTasks; // <-- OVERWRITES filter with old unfiltered window.caseTasks!
    }
    window.caseTasks = caseTasks;
    safeStorage.set('cmCaseTasks', JSON.stringify(caseTasks), true);
  }
  ```
  Kyuki `window.caseTasks` ko `deleteCaseTask` ne update nahi kiya tha, `saveCaseTasksLocally()` ne filtered `caseTasks` ko clobber karke purani list dobara restore kar di! Is wajah se deleted task wapas aa jata tha.
* **Fix Applied:**
  1. `saveCaseTasksLocally()` ko correct direction me sync kiya gaya: `window.caseTasks = caseTasks`.
  2. Ek dedicated `setCaseTasks(tasks)` setter helper create kiya gaya jo dono scopes ko atomic tareeqe se sync rakhta hai.
  ```javascript
  // AFTER (Fixed)
  function setCaseTasks(tasks) {
    caseTasks = Array.isArray(tasks) ? tasks : [];
    window.caseTasks = caseTasks;
  }
  if (typeof setCaseTasks !== 'undefined') window.setCaseTasks = setCaseTasks;

  function saveCaseTasksLocally() {
    window.caseTasks = caseTasks;
    try {
      safeStorage.set('cmCaseTasks', JSON.stringify(caseTasks), true);
    } catch (e) {
      console.error('Failed to save tasks locally:', e);
    }
    if (typeof updateTodoCounters === 'function') updateTodoCounters();
  }
  ```
* **Verification Test:**
  [`tests/todoService.test.js`](file:///d:/caseBook-modular/tests/todoService.test.js#L70-L80) (`should delete task correctly`).

---

### 4. BUG-004: Tab Switcher Freeze on Missing/Late Script Files

* **Affected File:** [`admin.js`](file:///d:/caseBook-modular/admin.js#L4180-L4295) (`showTab`)
* **Severity:** 🔴 High (Navigation Blocker)
* **Root Cause:**
  Jab user kisi tab par click karta tha, toh `showTab(tabId)` tab-specific functions ko direct call karta tha:
  ```javascript
  // BEFORE (Buggy)
  if (tabId === 'todo') {
    populateTodoCaseDropdown();
    renderCaseTasks();
  }
  if (tabId === 'all') {
    renderAllCasesTableWithFilters();
  }
  if (tabId === 'courts') {
    renderCourtsTable();
  }
  ```
  Agar user ne page load hone se pehle ya network lag ke dauraan tab change kiya, ya koi single tab script fail hui, toh console me `ReferenceError: <func> is not defined` aa jata tha aur tab change hona stop ho jata tha (active class remove ho jati thi par new tab nahi khulta tha).
* **Fix Applied:**
  Sabhi tab lifecycle callbacks ko defensive `typeof ... === 'function'` check me wrap kiya gaya:
  ```javascript
  // AFTER (Fixed)
  if (tabId === 'todo') {
    if (typeof populateTodoCaseDropdown === 'function') populateTodoCaseDropdown();
    if (typeof renderCaseTasks === 'function') renderCaseTasks();
  }
  if (tabId === 'courts') {
    if (typeof renderCourtsTable === 'function') renderCourtsTable();
  }
  ```
* **Verification Test:**
  [`tests/tabsNavigation.test.js`](file:///d:/caseBook-modular/tests/tabsNavigation.test.js).

---

### 5. BUG-005: `showTab` Missing from Global Scope Pre-Invocation

* **Affected File:** [`admin.js`](file:///d:/caseBook-modular/admin.js#L4051) & [`#L4325`](file:///d:/caseBook-modular/admin.js#L4325)
* **Severity:** 🟡 Medium
* **Root Cause:**
  `window.showTab = showTab` line sirf `showTab()` function ke andar execute hoti thi (jab koi pehli baar use call kare). Agar external module ya synthetic event ne pehli call se pehle `window.showTab` ko dhundha toh wo `undefined` milta tha.
* **Fix Applied:**
  Function declare hote hi top-level par global export add kiya gaya:
  ```javascript
  // AFTER (Fixed)
  if (typeof showTab !== 'undefined') {
    window.showTab = showTab;
    window.showTabImpl = showTab;
  }
  ```
* **Verification Test:**
  [`tests/tabsNavigation.test.js`](file:///d:/caseBook-modular/tests/tabsNavigation.test.js#L25-L27).

---

### 6. BUG-006: Core Security & Case Normalization Functions Not Explicitly Exported

* **Affected File:** [`admin.js`](file:///d:/caseBook-modular/admin.js)
* **Severity:** 🟡 Medium
* **Root Cause:**
  Functions jaise `timingSafeEqual`, `sha256Sync`, `generateSecureSalt`, `hashPassword`, `normalizeCaseRecord`, `extractCaseParties` plain top-level functions the aur modular tabs ya test harnesses me accessible nahi the.
* **Fix Applied:**
  Explicit safe window attachments add kiye gaye:
  * `if (typeof timingSafeEqual !== 'undefined') window.timingSafeEqual = timingSafeEqual;`
  * `if (typeof sha256Sync !== 'undefined') window.sha256Sync = sha256Sync;`
  * `if (typeof generateSecureSalt !== 'undefined') window.generateSecureSalt = generateSecureSalt;`
  * `if (typeof hashPassword !== 'undefined') window.hashPassword = hashPassword;`
  * `if (typeof normalizeCaseRecord !== 'undefined') window.normalizeCaseRecord = normalizeCaseRecord;`
  * `if (typeof extractCaseParties !== 'undefined') window.extractCaseParties = extractCaseParties;`
* **Verification Test:**
  [`tests/securityAndAuth.test.js`](file:///d:/caseBook-modular/tests/securityAndAuth.test.js).

---

### 7. BUG-007: `getPaisaDateRangeFilter` & `getPaisaPeriodLabel` TypeError on Missing `getTodayDateString`

* **Affected File:** [`components/tabs/paisa/paisa.js`](file:///d:/caseBook-modular/components/tabs/paisa/paisa.js#L2036) & [`#L2072`](file:///d:/caseBook-modular/components/tabs/paisa/paisa.js#L2072)
* **Severity:** 🔴 High (Finance Filter Blocker)
* **Root Cause:**
  `getPaisaDateRangeFilter` aur `getPaisaPeriodLabel` dono functions directly `const todayStr = getTodayDateString();` call kar rahe the. Agar `utils/dateUtils.js` load hone me delay ho, CDN glitch ho, ya Paisa tab isolated evaluate ho, toh accessing `getTodayDateString()` threw:
  `TypeError: getTodayDateString is not a function`. Isse poora Paisa Tab aur financial ledger filter crash ho jata tha.
* **Fix Applied:**
  Defensive resolution implement ki gayi jisme agar `getTodayDateString` available na ho toh native ISO date fallback (`new Date().toISOString().split('T')[0]`) se date resolve hoti hai:
  ```javascript
  // AFTER (Fixed)
  const todayStr = (typeof getTodayDateString === 'function') 
    ? getTodayDateString() 
    : ((typeof window !== 'undefined' && typeof window.getTodayDateString === 'function') 
      ? window.getTodayDateString() 
      : new Date().toISOString().split('T')[0]);
  ```
  Saath hi `formatPaisaAmount`, `getPersonalBalance`, `getVirtualNetBalance`, `getPaisaDateRangeFilter`, `calculatePaisaTicketTotal`, `getPaisaVendors`, aur `savePaisaVendors` ko window par reliably export kiya gaya.
* **Verification Test:**
  [`tests/paisaCalculations.test.js`](file:///d:/caseBook-modular/tests/paisaCalculations.test.js).

---

### 8. BUG-008: `checkCaseNumberExists` & `updateCaseTableHearing` TypeError on Null Client `from()`

* **Affected File:** [`services/caseService.js`](file:///d:/caseBook-modular/services/caseService.js#L682) & [`#L1565`](file:///d:/caseBook-modular/services/caseService.js#L1565)
* **Severity:** 🔴 High (Duplicate Detection & Hearing Update Blocker)
* **Root Cause:**
  `checkCaseNumberExists` me database lookup ke liye outer guard `if (client)` tha, lekin query mapping array ke andar:
  ```javascript
  // BEFORE (Buggy)
  const queries = tablesToCheck.map(tbl =>
    supabaseClient.from(tbl) // <-- Uninitialized local supabaseClient was null!
      .select('id, case_number, case_name')
  ```
  Is wajah se `TypeError: Cannot read properties of null (reading 'from')` throw hota tha, aur database duplicate validation fail hokar hamesha catch block me chali jaati thi. Same issue `updateCaseTableHearing` me bhi tha.
* **Fix Applied:**
  Queries ko resolved `client` reference se bind kiya gaya:
  ```javascript
  // AFTER (Fixed)
  const queries = tablesToCheck.map(tbl =>
    client.from(tbl)
      .select('id, case_number, case_name')
      .ilike('case_number', cleanNo)
      .limit(2)
  );
  ```
* **Verification Test:**
  [`tests/caseServiceCrud.test.js`](file:///d:/caseBook-modular/tests/caseServiceCrud.test.js#L50-L80).

---

### 9. BUG-009: `performPostCrudRefresh` Fatal ReferenceError on `currentSelectedCase`

* **Affected File:** [`services/caseService.js`](file:///d:/caseBook-modular/services/caseService.js#L490) (`performPostCrudRefresh`)
* **Severity:** 🔴 High (Post-CRUD Refresh Blocker)
* **Root Cause:**
  `performPostCrudRefresh` kisi bhi case ko add, update, ya delete karne ke baad trigger hota hai. Iske andar:
  ```javascript
  // BEFORE (Buggy)
  if (currentSelectedCase && typeof renderSelectedCaseDetails === 'function') { ... }
  ```
  `currentSelectedCase` variable `admin.js` me declare tha lekin `services/caseService.js` ke scope me declared nahi tha. Script loading ya modular isolation me accessing `currentSelectedCase` direct `ReferenceError: currentSelectedCase is not defined` throw karta tha, jisse post-CRUD table sync aur cache update bich me hi abort ho jaata tha.
* **Fix Applied:**
  `typeof` check ke saath safe evaluation lagayi gayi:
  ```javascript
  // AFTER (Fixed)
  if (typeof currentSelectedCase !== 'undefined' && currentSelectedCase && typeof renderSelectedCaseDetails === 'function') {
    // safe update logic
  }
  ```
* **Verification Test:**
  [`tests/caseServiceCrud.test.js`](file:///d:/caseBook-modular/tests/caseServiceCrud.test.js#L85-L125).

---

### 10. BUG-010: `renderSelectedCaseDetails` Fatal ReferenceError on Missing `renderCaseTransferHistory` & Unsafe Global Access

* **Affected File:** [`components/modals/case-modals.js`](file:///d:/caseBook-modular/components/modals/case-modals.js#L1968) & [`#L2143`](file:///d:/caseBook-modular/components/modals/case-modals.js#L2143)
* **Severity:** 🔴 Critical (Case Details View & History Lookup Blocker)
* **Root Cause:**
  1. `renderSelectedCaseDetails(caseObj)` ke andar line 1970 par `renderCaseTransferHistory(caseNumber, caseObj);` direct call ho raha tha, jabki pure codebase me `renderCaseTransferHistory` naam ka function declare hi nahi tha! Iski wajah se jab bhi koi user kisi case par click karta ya search card se select karta, script turant `ReferenceError: renderCaseTransferHistory is not defined` throw karke freeze ho jati thi.
  2. `openCaseHistoryModalByNo(caseNo)` me line 2146 par `allCaseRecords.find(...)` ko naked access kiya gaya tha bina check kiye ki `allCaseRecords` scope me defined hai ya nahi.
  3. `getCasePaisaTransactions(caseNumber)` me `allPaisaTransactions` lexical check tha par `window.allPaisaTransactions` check nahi tha, jisse window par mapped transactions skip ho jaate the.
  4. `renderSelectedCaseDetails` me `currentSelectedCase = caseObj;` window property ko update nahi karta tha, jisse `window.currentSelectedCase` par depend karne wale Quick Fee aur WhatsApp actions null case padhte the.
  5. Utility aur modal functions jaise `renderSelectedCaseDetails`, `fdFormatYMD`, `fdFormatDisplay`, `renderCaseTransferHistory`, `ensureForwardModalMounted` window object par export nahi the.
* **Fix Applied:**
  1. `renderCaseTransferHistory(caseNumber, caseObj)` ka reusable, defensive implementation add kiya gaya jo `window.allTransferRecords` aur fallback se court transfer events render karta hai, aur call ko `typeof renderCaseTransferHistory === 'function'` se guard kiya gaya.
  2. `openCaseHistoryModalByNo` ko safe list resolution di gayi: `typeof allCaseRecords !== 'undefined' ? allCaseRecords : (window.allCaseRecords || [])`.
  3. `getCasePaisaTransactions` ko update karke `window.allPaisaTransactions` check prioritize kiya gaya.
  4. `renderSelectedCaseDetails` me `window.currentSelectedCase = caseObj;` ko reliably set kiya gaya.
  5. Missing exports (`window.renderSelectedCaseDetails`, `window.fdFormatYMD`, `window.fdFormatDisplay`, `window.renderCaseTransferHistory`, etc.) define kiye gaye.
* **Verification Test:**
  [`tests/caseModals.test.js`](file:///d:/caseBook-modular/tests/caseModals.test.js) (12 tests, 100% passing).

---

### 11. BUG-011: Cause List Tab ReferenceError on Missing Window Resolution for `allCaseRecords`, `courts`, and `getDeletedCourtsSet`

* **Affected File:** [`components/tabs/causelist/causelist.js`](file:///d:/caseBook-modular/components/tabs/causelist/causelist.js#L150) & [`admin.js`](file:///d:/caseBook-modular/admin.js#L504)
* **Severity:** 🟡 High (Cause List & Daily Appearance Board Blocker)
* **Root Cause:**
  1. `components/tabs/causelist/causelist.js` ke functions `initCauseListTab`, `renderCauseListTable`, `sendDailyCauseListWhatsApp`, aur `printDailyCauseList` me `allCaseRecords`, `courts`, aur `getDeletedCourtsSet` ko directly evaluate kiya gaya tha bina `typeof` ya window check ke. Agar Cause List tab modular environment ya delayed scripts me evaluate ho, toh accessing `allCaseRecords` threw `ReferenceError: allCaseRecords is not defined`.
  2. `admin.js` me `courts` array aur `getDeletedCourtsSet()` helper declare the lekin unko `window.courts` aur `window.getDeletedCourtsSet` par export nahi kiya gaya tha, jisse cause list court filters aur exclusion logic external modules ke liye inaccessible the.
* **Fix Applied:**
  1. `causelist.js` me defensive fallback lookup implement kiya gaya:
     - `allRecords`: `typeof allCaseRecords !== "undefined" && Array.isArray(allCaseRecords) ? allCaseRecords : (window.allCaseRecords || [])`
     - `courtsList`: `typeof courts !== "undefined" && Array.isArray(courts) ? courts : (window.courts || [])`
     - `deletedCourts`: `typeof getDeletedCourtsSet === "function" ? getDeletedCourtsSet() : (typeof window.getDeletedCourtsSet === "function" ? window.getDeletedCourtsSet() : new Set())`
  2. `admin.js` me `window.courts = courts` aur `window.getDeletedCourtsSet = getDeletedCourtsSet` export add kiye gaye.
* **Verification Test:**
  [`tests/causeList.test.js`](file:///d:/caseBook-modular/tests/causeList.test.js) (7 tests, 100% passing).

---

### 12. BUG-012: Inverted Arguments `(month, year)` Passed to `renderCalendarView` Causing Extreme Date Distortion

* **Affected File:** [`admin.js`](file:///d:/caseBook-modular/admin.js#L2491), [`#L2849`](file:///d:/caseBook-modular/admin.js#L2849), [`#L2916`](file:///d:/caseBook-modular/admin.js#L2916) & [`components/tabs/calendar/calendar.js`](file:///d:/caseBook-modular/components/tabs/calendar/calendar.js#L125)
* **Severity:** 🔴 High (Calendar Rendering & Date Corruption)
* **Root Cause:**
  `calendar.js` me `renderCalendarView(year = currentCalendarYear, month = currentCalendarMonth)` ka first argument `year` aur second argument `month` hai. Lekin `admin.js` ke andar post-update hooks (jaise `updateCaseTableHearing`, `cascadeUpdateCourtName`, aur `cascadeUpdateCaseNumber`) me arguments reverse order me pass kiye ja rahe the:
  `renderCalendarView(currentCalendarMonth, currentCalendarYear);` (e.g. Month 9, Year 2026 ban gaya Year 9, Month 2026). Iske chalte JavaScript `new Date(9, 2026, 1)` evaluate karke calendar ko 170+ saal aage ki distorted dates par le jata tha.
* **Fix Applied:**
  1. `admin.js` ke teeno call sites ko correct kiya gaya: `renderCalendarView(currentCalendarYear, currentCalendarMonth)`.
  2. `components/tabs/calendar/calendar.js` me self-healing normalization guard add kiya gaya:
     ```javascript
     if (typeof year === 'number' && typeof month === 'number' && year < 100 && month > 1900) {
       const temp = year;
       year = month;
       month = temp;
     }
     ```
  3. `calendar.js` me `allCaseRecords` ko `window.allCaseRecords` ke fallback ke saath safely bind kiya gaya.
* **Verification Test:**
  [`tests/calendar.test.js`](file:///d:/caseBook-modular/tests/calendar.test.js) (6 tests, 100% passing).

---

### 13. BUG-013: Calendar Schedule Call Action Always Disabled Due to Missing `clientNumber` Field Check

* **Affected File:** [`components/tabs/calendar/calendar.js`](file:///d:/caseBook-modular/components/tabs/calendar/calendar.js#L357)
* **Severity:** 🟡 Medium (Client Communication Feature Failure)
* **Root Cause:**
  `renderDaySchedule` me phone number extraction sirf `clientPhone`, `criminalClientPhone`, `phone`, `contact` fields check kar raha tha. Jabki pure CaseBook system (Supabase schemas, forms, CRUD, WhatsApp notices) me contact number hamesha `clientNumber` aur `criminalClientNumber` me persist hota hai. Is mismatch ke kaaran valid phone number hone ke bawajood calendar view me Call button hamesha disabled ("No client phone number available") render hota tha.
* **Fix Applied:**
  Field resolution me CaseBook ke standard properties `clientNumber` aur `criminalClientNumber` ko add kiya gaya:
  ```javascript
  const phone = (h.clientNumber || h.criminalClientNumber || h.clientPhone || h.criminalClientPhone || h.phone || h.contact || '').trim();
  ```
* **Verification Test:**
  [`tests/calendar.test.js`](file:///d:/caseBook-modular/tests/calendar.test.js) (test verified phone link injection and enabled call button).

---

### 14. BUG-014: `currentAllCasesFilteredList` Undeclared Variable Assignment Throwing Fatal ReferenceError in Strict Mode

* **Affected File:** [`components/tabs/home/home.js`](file:///d:/caseBook-modular/components/tabs/home/home.js#L1559)
* **Severity:** 🔴 High (Script Initialization Blocker)
* **Root Cause:**
  `currentAllCasesFilteredList = [];` ko line 1559 par bina `var`, `let`, ya `const` ke assign kiya gaya tha. JavaScript strict mode (`"use strict"` / ES modules / modern bundlers) me kisi bhi undeclared variable ko assign karne par execution turant crash ho jaata hai with `ReferenceError: currentAllCasesFilteredList is not defined`.
* **Fix Applied:**
  Variable ko properly declare kiya gaya aur window object par expose kiya gaya:
  ```javascript
  var currentAllCasesFilteredList = [];
  if (typeof currentAllCasesFilteredList !== 'undefined') window.currentAllCasesFilteredList = currentAllCasesFilteredList;
  ```
* **Verification Test:**
  [`tests/upcoming.test.js`](file:///d:/caseBook-modular/tests/upcoming.test.js).

---

### 15. BUG-015: Upcoming Tab Count Chip Statically Hardcoded to "7 Hearings Listed" & Missing Controls Markup

* **Affected File:** [`components/tabs/upcoming/upcoming.js`](file:///d:/caseBook-modular/components/tabs/upcoming/upcoming.js) & [`components/tabs/home/home.js`](file:///d:/caseBook-modular/components/tabs/home/home.js#L3230)
* **Severity:** 🟡 Medium (UI State Mismatch)
* **Root Cause:**
  1. `upcomingListedCountChip` header pill me text hamesha hardcoded `"7 Hearings Listed"` rehta tha kyunki `renderUpcomingWeekHearings()` use update hi nahi karta tha chahe 0 hearing ho ya 10.
  2. `upcoming.js` template me `upcoming-hero-controls` aur `#upcomingTotalBadge` element missing tha jo `home.js` me update karne ki koshish ki ja rahi thi.
  3. `upcoming.js` me `initUpcomingTab` helper nahi tha jisse direct `#upcoming` hash navigation par hearings render trigger na ho pata.
* **Fix Applied:**
  1. `renderUpcomingWeekHearings()` me dynamic badge updater add kiya gaya:
     ```javascript
     const chipBadge = document.getElementById("upcomingListedCountChip");
     if (chipBadge) {
       chipBadge.innerHTML = `<i class="fa-solid fa-list-check"></i> ${upcoming.length} Hearing${upcoming.length === 1 ? "" : "s"} Listed`;
     }
     ```
  2. `upcoming.js` template me `upcomingTotalBadge` controls add kiye gaye aur `initUpcomingTab()` function window par export kiya gaya.
* **Verification Test:**
  [`tests/upcoming.test.js`](file:///d:/caseBook-modular/tests/upcoming.test.js) (5 tests, 100% passing).

---

### 16. BUG-016: Print Dossier Engine Fatal ReferenceError on Naked Global Lookups & Unmounted Template Container

* **Affected File:** [`components/print/print-templates.js`](file:///d:/caseBook-modular/components/print/print-templates.js#L299)
* **Severity:** 🔴 High (A4 Case Dossier & Print PDF Generation Blocker)
* **Root Cause:**
  1. `printCurrentCaseDossier(customCaseObj)` me `const caseObj = customCaseObj || currentSelectedCase;` bina `typeof currentSelectedCase` check kiye naked evaluate hota tha. Aur `printCurrentGuestCaseDossier()` me `if (!currentGuestSelectedCase)` evaluate hota tha. Agar global variables initialize hone se pehle user dossier print kare ya script modular isolation me chale, toh browser turant fatal `ReferenceError: currentSelectedCase is not defined` throw karke print cancel kar deta tha.
  2. Document me `#printTemplatesContainer` DOM element missing hone par print templates mount nahi ho paate the aur `#printableCaseDossier` null rehne se dossier print fail ho jaata tha.
  3. `remarksToPlainText` ko bina window/typeof guard ke call kiya gaya tha.
* **Fix Applied:**
  1. `ensurePrintTemplatesMounted()` add kiya gaya jo `#printTemplatesContainer` ko dynamically create karke template mount karta hai aur window par expose karta hai.
  2. Safe variable resolution lagayi gayi:
     - `currentCase`: `typeof currentSelectedCase !== 'undefined' ? currentSelectedCase : (window.currentSelectedCase || null)`
     - `guestCase`: `typeof currentGuestSelectedCase !== 'undefined' ? currentGuestSelectedCase : (window.currentGuestSelectedCase || null)`
  3. Safe fallback `getRemarkText = typeof remarksToPlainText === 'function' ? remarksToPlainText : ...` implement kiya gaya.
* **Verification Test:**
  [`tests/printTemplates.test.js`](file:///d:/caseBook-modular/tests/printTemplates.test.js) (8 tests, 100% passing).

---

---

### 17. BUG-017: Court Transfer Tab Phantom Function `showCaseDetails`, Broken Civil Case Title Display in Bulk Transfer, and Naked Global ReferenceErrors

* **Affected File:** [`components/tabs/transfer/transfer.js`](file:///d:/caseBook-modular/components/tabs/transfer/transfer.js) & [`admin.js`](file:///d:/caseBook-modular/admin.js#L3990)
* **Severity:** 🔴 High (Inter-Court Transfer Navigation & Bulk Batch Operations Blocker)
* **Root Cause:**
  1. **Phantom Function:** `renderRecentTransfersTable()` me case link aur "eye" dossier button par `onclick="showCaseDetails('${t.case_number}')"` bind tha, lekin pure codebase me `showCaseDetails` naam ka koi function exist hi nahi karta tha! Jab bhi user Recent Transfers me kisi case par click karta, browser turant `ReferenceError: showCaseDetails is not defined` throw karta tha. CaseBook me actual dossier opener `openCaseHistoryModalByNo(caseNo)` hai.
  2. **Bulk Transfer Party Name Distortion:** `renderBulkCasesTable()` me case title `const title = c.caseTitle || \`${c.complainant || 'Complainant'} vs ${c.accused || 'Accused'}\`;` set tha. Isne standard Civil/Revenue/State case fields (`caseName`, `plaintiff`, `defendant`, `victimName`, `accusedName`) ko complete ignore kar diya tha, jiski wajah se civil cases ke aage hamesha `"Complainant vs Accused"` print hota tha! Aur `filterBulkCasesTable()` me plaintiff/defendant/client search supported hi nahi tha.
  3. **Naked Global ReferenceErrors:** `allCaseRecords`, `allCaseTransfers`, `supabaseClient`, `currentSelectedCase`, `performPostCrudRefresh` ko bina safe scope lookups ke access kiya gaya tha, jo strict mode me fatal crash lead karta tha.
  4. **Wrong DOM Element Binding:** `admin.js` me `initTransferTab` ne non-existent ID `bulkOriginCourt` aur non-existent function `renderBulkOriginCasesList` par listener lagaya tha, jabki actual HTML select element `bulkTransferFromCourt` tha aur function `onBulkOriginCourtChange` tha.
* **Fix Applied:**
  1. `showCaseDetails(caseNo)` wrapper implement kiya gaya jo `openCaseHistoryModalByNo(caseNo)` ko invoke karta hai, aur HTML inline handlers me `if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo(...) else showCaseDetails(...)` lagaya gaya.
  2. Reusable `getCaseDisplayTitle(c)` helper add kiya gaya jo `caseName`, `plaintiff vs defendant`, `victim vs accused`, `complainant vs accused` ko proper priority ke sath resolve karta hai.
  3. `filterBulkCasesTable()` me plaintiff, defendant, client name aur case type search add kiya gaya.
  4. Safe globals getters `getTransferAllCaseRecords()` aur `getTransferAllTransfers()` implement kiye gaye jo `window.allCaseRecords` aur `window.allCaseTransfers` ke sath accurately sync rehte hain.
  5. `admin.js` me `bulkTransferFromCourt` element binding aur `onBulkOriginCourtChange()` invocation fix kiya gaya.
* **Verification Test:**
  [`tests/transfer.test.js`](file:///d:/caseBook-modular/tests/transfer.test.js) (6 tests verifying single transfer search, bulk court selection, civil party title display, multi-case selection, recent transfers rendering, and dossier modal invocation — 100% passing).

---

### 18. BUG-018: Disposed Cases Tab Missing Render Function, Empty Display on Direct Tab Switch, and Invisible UTF-8 BOM

* **Affected File:** [`components/tabs/disposed/disposed.js`](file:///d:/caseBook-modular/components/tabs/disposed/disposed.js), [`admin.js`](file:///d:/caseBook-modular/admin.js#L4276), & [`components/tabs/home/home.js`](file:///d:/caseBook-modular/components/tabs/home/home.js#L1310)
* **Severity:** 🟡 Medium (Disposed Cases Table Empty / Missing Data on Navigation)
* **Root Cause:**
  1. `components/tabs/disposed/disposed.js` me sirf static HTML snippet tha aur koi table rendering script (`renderDisposedCasesTable` ya `initDisposedTab`) exist hi nahi karti thi.
  2. `disposedCasesTable` sirf tab `#home` open hone par `renderHomeDashboard()` ke andar populate hota tha. Agar user direct `#disposed` hash par aaye ya sidebar se "Disposed Cases" select kare, toh `admin.js` ka `showTab('disposed')` table populate hi nahi karta tha, aur table hamesha completely blank rehti thi.
  3. `disposed.js` file ke andar line 14 par invisible UTF-8 Byte Order Mark (`\uFEFF`) aur redundant unstyled `<h3>✅ Disposed Cases</h3>` heading thi.
* **Fix Applied:**
  1. `components/tabs/disposed/disposed.js` me modular `renderDisposedCasesTable(records)` aur `initDisposedTab()` functions implement kiye gaye jo:
     - All case types (Civil, Criminal, Revenue, Family, etc.) ke disposed cases ko filter karta hai (Hindi statuses jaise `निस्तारित` aur `फैसला` support ke sath).
     - Proper case badges, court names, parties remarks, disposal comments, aur Edit/Reopen action buttons render karta hai.
     - `#disposedCount` badge ko automatically update karta hai.
     - Window par globally expose hota hai.
  2. `admin.js` me `showTab` handler ke andar `tabId === 'disposed'` case add kiya gaya jo `initDisposedTab()` ya `renderDisposedCasesTable()` call karta hai.
  3. `home.js` me duplicate table code ko `renderDisposedCasesTable(allCaseRecords)` delegate kiya gaya.
  4. Invisible BOM `\uFEFF` aur duplicate heading ko clean kiya gaya.
* **Verification Test:**
  [`tests/disposed.test.js`](file:///d:/caseBook-modular/tests/disposed.test.js) (3 tests verifying empty state, multi-type disposed table rendering, and Hindi status support — 100% passing).

---

### 19. BUG-019: Court Staff Directory Mobile Filter Logic Breakdown on Alphabetical Search Queries

* **Affected File:** [`components/tabs/helpers/helpers.js`](file:///d:/caseBook-modular/components/tabs/helpers/helpers.js#L402)
* **Severity:** 🔴 High (Staff Directory Search Functionality Completely Ineffective)
* **Root Cause:**
  `renderHelpersTable()` me search filter predicate tha:
  ```javascript
  const mobMatch = (h.mobile || '').replace(/\D/g, '').includes(query.replace(/\D/g, '')) || (h.mobile || '').includes(query);
  ```
  Jab user kisi bhi staff member ka naam ya role (jaise `"Reader"`, `"Ahlmad"`, `"Sharma"`) type karta tha, toh `query.replace(/\D/g, '')` me se saare alphabets strip ho jaate the aur result empty string `""` banta tha. JavaScript me kisi bhi phone number string par `.includes("")` evaluate karne par hamesha unconditionally `true` aata hai. Is wajah se har ek staff member `mobMatch = true` satisfy kar leta tha aur text search filter completely fail ho jaata tha (100% staff records return hote the bina filter huye).
* **Fix Applied:**
  `digitsQuery` ko non-empty hone par hi phone search evaluation me shamil kiya gaya:
  ```javascript
  const digitsQuery = query.replace(/\D/g, '');
  const mobMatch = (digitsQuery.length > 0 && (h.mobile || '').replace(/\D/g, '').includes(digitsQuery)) || (h.mobile || '').toLowerCase().includes(query);
  ```
* **Verification Test:**
  [`tests/helpers.test.js`](file:///d:/caseBook-modular/tests/helpers.test.js) (test verified role-based and court-based filtering, returning only matching staff).

---

### 20. BUG-020: Courts & Helpers Tabs Missing Window Exports & Naked Scope ReferenceErrors

* **Affected File:** [`components/tabs/courts/courts.js`](file:///d:/caseBook-modular/components/tabs/courts/courts.js), [`components/tabs/helpers/helpers.js`](file:///d:/caseBook-modular/components/tabs/helpers/helpers.js), & [`admin.js`](file:///d:/caseBook-modular/admin.js#L8484)
* **Severity:** 🔴 High (Inter-Tab Function Calling & Strict Mode Blocker)
* **Root Cause:**
  1. `populateHelperCourtDropdowns()` function `helpers.js` me declared tha aur `admin.js` (line 7103) use `if (typeof populateHelperCourtDropdowns === 'function')` call kar raha tha. Par `helpers.js` ne use `window` par export hi nahi kiya tha, jisse court directory update hone par helper tab ke dropdowns refresh nahi ho paate the.
  2. `handleAddCourtSubmit` function `admin.js` me scoped tha lekin `window.handleAddCourtSubmit` par exposed nahi tha, jisse `courts.js` me direct event binding fail ho sakti thi.
  3. `courts.js` aur `helpers.js` me `courts`, `allCaseRecords`, `supabaseClient`, `performPostCrudRefresh` ko bina defensive scope checks ke access kiya gaya tha.
* **Fix Applied:**
  1. `window.populateHelperCourtDropdowns = populateHelperCourtDropdowns;` export kiya gaya `helpers.js` me.
  2. `window.handleAddCourtSubmit = handleAddCourtSubmit;` export kiya gaya `admin.js` me.
  3. Defensive helpers `getCourtsList()`, `getCourtsAllCaseRecords()`, `getHelpersCourts()` add kiye gaye aur `performPostCrudRefresh` calls par safe checks lagaye gaye.
* **Verification Test:**
  [`tests/courts.test.js`](file:///d:/caseBook-modular/tests/courts.test.js) (5 tests passing) & [`tests/helpers.test.js`](file:///d:/caseBook-modular/tests/helpers.test.js) (5 tests passing).

---

### 21. BUG-021: Case Operations Hub (Manage) Court Dropdown Ignored User Configured Courts & Deleted Courts Set

* **Affected File:** [`components/tabs/manage/manage.js`](file:///d:/caseBook-modular/components/tabs/manage/manage.js#L468)
* **Severity:** 🟡 Medium (Court Synchronization & Data Hygiene Failure)
* **Root Cause:**
  `getCourtDropdownOptions` me courts resolve karne ke liye `window.allCourts` check kiya ja raha tha jo CaseBook me exist hi nahi karta tha (`window.courts` actual live directory array hai). Iske chalte:
  1. Add Case aur Update Case forms me court dropdown hamesha ek static hardcoded array (`['District Court', 'Civil Judge (SD)', 'High Court', 'Chief Judicial Magistrate']`) par fall back ho jaata tha, aur user ke add kiye gaye custom courts display nahi hote the.
  2. Deleted courts set (`getDeletedCourtsSet()`) ko filter out nahi kiya ja raha tha.
  3. `getCourtDropdownOptions` ko `window` par export nahi kiya gaya tha, jisse external modular invocations me `window.getCourtDropdownOptions` call karne par `TypeError` throw ho raha tha.
* **Fix Applied:**
  1. `getCourtDropdownOptions` ko update karke `window.courts` ko primary source banaya gaya.
  2. Active deleted courts filter (`!deletedSet.has(...)`) implement kiya gaya taaki user dwara delete kiye gaye courts add/update dropdowns me na dikhein (jab tak ki wo currently selected court na ho).
  3. `window.getCourtDropdownOptions = getCourtDropdownOptions;` export kiya gaya.
* **Verification Test:**
  [`tests/manage.test.js`](file:///d:/caseBook-modular/tests/manage.test.js) (6 tests, 100% passing).

---

### 22. BUG-022: Live CRUD Manager Naked Global ReferenceErrors on `supabaseClient`, `allPaisaTransactions`, and `allPersonalTransactions`

* **Affected File:** [`components/tabs/livecrud/livecrud.js`](file:///d:/caseBook-modular/components/tabs/livecrud/livecrud.js)
* **Severity:** 🔴 High (Database Manager Tab Crash on Supabase Disconnect / Strict Mode)
* **Root Cause:**
  1. `tryLocalFallback` aur `handleLiveCrudFormSubmit` me `allPaisaTransactions` aur `allPersonalTransactions` ko bina scope verification ke naked identifiers ki tarah access kiya gaya tha. Strict mode me agar financial modules load na huye hon ya arrays declared na hon, toh browser turant fatal `ReferenceError: allPaisaTransactions is not defined` throw karke live CRUD load hona stop kar deta tha.
  2. `savePaisaTransactions(true)` aur `savePersonalData(true)` ko lines 1055 & 1078 par bina `typeof ... === 'function'` check ke direct call kiya gaya tha.
  3. `ensureSupabaseClient` aur `supabaseClient` ko bina window fallback ke direct naked evaluate kiya gaya tha (`if (!ensureSupabaseClient || !ensureSupabaseClient())`).
  4. `escapeHtml` utility function `livecrud.js` ke andar declared nahi thi, aur table render karte samay text escape call karne par `ReferenceError: escapeHtml is not defined` throw hota tha.
* **Fix Applied:**
  1. Safe getter helpers `getLiveCrudPaisaTransactions()` aur `getLiveCrudPersonalTransactions()` implement kiye gaye with window fallbacks.
  2. `savePaisaTransactions` aur `savePersonalData` calls par `typeof ... === 'function'` guards lagaye gaye.
  3. `sbClient` defensive resolution aur safe `ensureSupabaseClient` caller lagaya gaya.
  4. Local self-contained `escapeHtml()` function declare kiya gaya with window fallback.
  5. Missing live CRUD table functions (`renderLiveCrudData`, `renderLiveCrudRows`, `renderLiveCrudDynamicFilterBar`, `handleLiveCrudFilterChange`, `resetLiveCrudFilters`, `getFilteredLiveCrudRows`, `setLiveCrudRows`, `getLiveCrudRows`) window object par export kiye gaye.
* **Verification Test:**
  [`tests/livecrud.test.js`](file:///d:/caseBook-modular/tests/livecrud.test.js) (6 tests, 100% passing).

---

### 23. BUG-023: Live CRUD Pagination Crash on Non-Standard or Mobile DOM Containers (`tblContainer.scrollIntoView is not a function`)

* **Affected File:** [`components/tabs/livecrud/livecrud.js`](file:///d:/caseBook-modular/components/tabs/livecrud/livecrud.js#L784)
* **Severity:** 🟡 Medium (Pagination Click Failure in WebViews & Headless Environments)
* **Root Cause:**
  `setLiveCrudPage(pageNum)` function ke andar table container ko scroll karne ke liye:
  ```javascript
  const tblContainer = document.getElementById('liveCrudTableViewContainer');
  if (tblContainer) {
    tblContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  ```
  call kiya gaya tha. Browser webviews, custom embedded iframe wrappers, aur automated testing frameworks me jahan DOM element standard `.scrollIntoView` implement nahi karta ya mock environment me hota hai, wahan page change click karne par `TypeError: tblContainer.scrollIntoView is not a function` throw hota tha aur page switch completely block ho jaata tha.
* **Fix Applied:**
  `scrollIntoView` call karne se pehle method existence check add kiya gaya:
  ```javascript
  const tblContainer = document.getElementById('liveCrudTableViewContainer');
  if (tblContainer && typeof tblContainer.scrollIntoView === 'function') {
    tblContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  ```
* **Verification Test:**
  [`tests/livecrud.test.js`](file:///d:/caseBook-modular/tests/livecrud.test.js) (test 5: table view pagination and page switching verified).

---

*Log Last Updated: 2026-10-14 — Total Fixed & Verified Bugs: 23*
