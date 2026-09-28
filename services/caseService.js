// ==============================================================================
// Case Data Service (Supabase CRUD)
// ==============================================================================

async function fetchAllDataFromSupabase() {
  ensureSupabaseClient();
  if (!supabaseClient && typeof window !== 'undefined') {
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 100));
      if (ensureSupabaseClient()) break;
    }
  }

  if (!supabaseClient) {
    console.log('Using local fallback data (Supabase not configured or CDN unreachable)');
    updateSupabaseStatusIndicator(false);
    renderCourtOptions();
    renderCriminalCourtOptions();
    renderCourtsTable();
    refreshAllCaseTables();
    return;
  }

  try {
        const safeFetch = async (queryPromise, fallbackPromise = null) => {
      try {
        const res = await queryPromise;
        if (res && res.error) {
          console.warn('[safeFetch] Primary query error:', res.error);
          if (fallbackPromise) {
            const fallbackRes = await fallbackPromise;
            if (fallbackRes && fallbackRes.error) {
              console.warn('[safeFetch] Fallback query error:', fallbackRes.error);
            }
            return fallbackRes || { data: null, error: null };
          }
        }
        return res || { data: null, error: null };
      } catch (err) {
        console.warn('Supabase query exception:', err);
        if (fallbackPromise) {
          try { 
            const fRes = await fallbackPromise;
            if(fRes && fRes.error) console.warn('[safeFetch] Fallback err:', fRes.error);
            return fRes;
          } catch (e) { console.warn('Fallback exception:', e); }
        }
        return { data: null, error: err };
      }
    };

    // Fetch from civilcases, statecases, criminalcases, familycases, revenuecases, misccivilcases, misccriminalcases, complaintcases, hearings, courts, case_todos, case_transfers, and court_helpers concurrently
    const [civilRes, stateRes, criminalRes, familyRes, revenueRes, miscCivilRes, miscCriminalRes, complaintRes, hearingsRes, courtsRes, todosRes, transfersRes, helpersRes] = await Promise.all([
      safeFetch(supabaseClient.from('civilcases').select('*').order('created_at', { ascending: false }), supabaseClient.from('civilcases').select('*')),
      safeFetch(supabaseClient.from('statecases').select('*').order('created_at', { ascending: false }), supabaseClient.from('statecases').select('*')),
      safeFetch(supabaseClient.from('criminalcases').select('*').order('created_at', { ascending: false }), supabaseClient.from('criminalcases').select('*')),
      safeFetch(supabaseClient.from('familycases').select('*').order('created_at', { ascending: false }), supabaseClient.from('familycases').select('*')),
      safeFetch(supabaseClient.from('revenuecases').select('*').order('created_at', { ascending: false }), supabaseClient.from('revenuecases').select('*')),
      safeFetch(supabaseClient.from('misccivilcases').select('*').order('created_at', { ascending: false }), supabaseClient.from('misccivilcases').select('*')),
      safeFetch(supabaseClient.from('misccriminalcases').select('*').order('created_at', { ascending: false }), supabaseClient.from('misccriminalcases').select('*')),
      safeFetch(supabaseClient.from('complaintcases').select('*').order('created_at', { ascending: false }), supabaseClient.from('complaintcases').select('*')),
      safeFetch(supabaseClient.from('hearings').select('*').order('hearing_date', { ascending: false }), supabaseClient.from('hearings').select('*')),
      safeFetch(supabaseClient.from('courts').select('*').order('court_name'), supabaseClient.from('courts').select('*')),
      safeFetch(supabaseClient.from('case_todos').select('*').order('deadline_date', { ascending: true }), supabaseClient.from('case_todos').select('*')),
      safeFetch(supabaseClient.from('case_transfers').select('*').order('transfer_date', { ascending: false }), supabaseClient.from('case_transfers').select('*')),
      safeFetch(supabaseClient.from('court_helpers').select('*').order('created_at', { ascending: false }), supabaseClient.from('helpers').select('*'))
    ]);

    // 1. Sync Courts (Deduplicated)
    const deletedSet = getDeletedCourtsSet();
    const seenCourtNames = new Set();
    courts = [];
    if (courtsRes.data && courtsRes.data.length > 0) {
      courtsRes.data.forEach(c => {
        const name = (c.court_name || '').trim();
        if (name && !seenCourtNames.has(name.toLowerCase()) && !deletedSet.has(name.toLowerCase())) {
          seenCourtNames.add(name.toLowerCase());
          courts.push(name);
        }
      });
      console.log(`Loaded ${courts.length} unique courts from Supabase.`);
    } else {
      defaultCourts.forEach(dc => {
        const name = (dc || '').trim();
        if (name && !seenCourtNames.has(name.toLowerCase()) && !deletedSet.has(name.toLowerCase())) {
          seenCourtNames.add(name.toLowerCase());
          courts.push(name);
        }
      });
    }
    saveCourtsToBackup();
    renderCourtOptions();
    renderCriminalCourtOptions();
    renderCourtsTable();

    // 2. Sync Cases
    let loadedCases = [];

    if (civilRes.data && civilRes.data.length > 0) {
      const normalizedCivil = civilRes.data.map(r => normalizeCaseRecord(r, r.case_type || 'civil'));
      loadedCases = loadedCases.concat(normalizedCivil);
    }

    if (stateRes.data && stateRes.data.length > 0) {
      const normalizedState = stateRes.data.map(r => normalizeCaseRecord(r, 'state'));
      loadedCases = loadedCases.concat(normalizedState);
    }

    if (criminalRes.data && criminalRes.data.length > 0) {
      const normalizedCriminal = criminalRes.data.map(r => normalizeCaseRecord(r, 'state'));
      loadedCases = loadedCases.concat(normalizedCriminal);
    }

    if (familyRes.data && familyRes.data.length > 0) {
      const normalizedFamily = familyRes.data.map(r => normalizeCaseRecord(r, 'family'));
      loadedCases = loadedCases.concat(normalizedFamily);
    }

    if (revenueRes.data && revenueRes.data.length > 0) {
      const normalizedRevenue = revenueRes.data.map(r => normalizeCaseRecord(r, 'revenue'));
      loadedCases = loadedCases.concat(normalizedRevenue);
    }

    if (miscCivilRes.data && miscCivilRes.data.length > 0) {
      const normalizedMiscCivil = miscCivilRes.data.map(r => normalizeCaseRecord(r, 'misc_civil'));
      loadedCases = loadedCases.concat(normalizedMiscCivil);
    }

    if (miscCriminalRes.data && miscCriminalRes.data.length > 0) {
      const normalizedMiscCriminal = miscCriminalRes.data.map(r => normalizeCaseRecord(r, 'misc_criminal'));
      loadedCases = loadedCases.concat(normalizedMiscCriminal);
    }

    if (complaintRes && complaintRes.data && complaintRes.data.length > 0) {
      const normalizedComplaint = complaintRes.data.map(r => normalizeCaseRecord(r, 'complaint'));
      loadedCases = loadedCases.concat(normalizedComplaint);
    }

    // Deduplicate loaded cases across tables so identical case numbers are never repeated in UI
    const seenCaseKeys = new Set();
    const uniqueLoadedCases = [];
    for (const item of loadedCases) {
      const rawKey = (item.caseNo || item.criminalCaseNumber || '').trim().toLowerCase();
      if (!rawKey) {
        uniqueLoadedCases.push(item);
        continue;
      }
      if (!seenCaseKeys.has(rawKey)) {
        seenCaseKeys.add(rawKey);
        uniqueLoadedCases.push(item);
      }
    }
    loadedCases = uniqueLoadedCases;

    // 3. Attach latest hearing dates from hearings table if available & store all hearing history
    if (hearingsRes.data && hearingsRes.data.length > 0) {
      allHearingRecords = hearingsRes.data;

      // Auto-heal orphaned "Cri-Rev-" hearing records by re-linking them to "Cr.Rev./129/2026"
      const orphanedCriRevHearings = allHearingRecords.filter(h => (h.case_number || '').trim().toLowerCase() === 'cri-rev-');
      if (orphanedCriRevHearings.length > 0) {
        const targetCase = loadedCases.find(c => {
          const num = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
          return num === 'cr.rev./129/2026' || num.includes('129/2026');
        });

        if (targetCase) {
          console.log('[AUTO-HEAL] Re-linking ' + orphanedCriRevHearings.length + ' orphaned "Cri-Rev-" hearings to case "' + targetCase.caseNo + '"...');
          orphanedCriRevHearings.forEach(h => {
            h.case_number = targetCase.caseNo;
            h.case_type = 'misc_criminal';
          });

          // Heal database records in background
          if (supabaseClient) {
            supabaseClient.from('hearings')
              .update({ case_number: targetCase.caseNo, case_type: 'misc_criminal' })
              .eq('case_number', 'Cri-Rev-')
              .then(() => console.log('[AUTO-HEAL] Supabase hearings table successfully updated.'))
              .catch(err => console.warn('[AUTO-HEAL] Supabase hearings update notice:', err));

            supabaseClient.from('misccriminalcases')
              .update({ previous_hearing: '2026-09-03', next_hearing: '2026-09-29', hearing_process: 'Summon' })
              .eq('case_number', targetCase.caseNo)
              .then(() => console.log('[AUTO-HEAL] Supabase misccriminalcases table successfully updated.'))
              .catch(err => console.warn('[AUTO-HEAL] Supabase misccriminalcases update notice:', err));
          }
        }
      }

      // Sort newest hearing date first so the latest scheduled hearing takes precedence
      const sortedHearings = [...allHearingRecords].sort((a, b) => {
        const da = new Date(a.hearing_date || a.created_at || 0);
        const db = new Date(b.hearing_date || b.created_at || 0);
        return db - da;
      });

      sortedHearings.forEach(h => {
        const hNum = (h.case_number || '').trim().toLowerCase();
        const hClean = hNum.replace(/[^a-z0-9]/g, '');
        if (!hNum) return;

        const matchingCase = loadedCases.find(c => {
          const cNum = (c.caseNo || c.criminalCaseNumber || '').trim().toLowerCase();
          if (cNum === hNum) return true;
          if (hClean && cNum.replace(/[^a-z0-9]/g, '') === hClean) return true;
          return false;
        });

        if (matchingCase) {
          const hDate = toISODate(h.next_hearing_date || h.hearing_date);
          if (hDate) {
            const currentISO = toISODate(matchingCase.nextHearing);
            const todayISO = toISODate(new Date());
            const isMissing = !currentISO;
            // Case row's next_hearing is today or in the past â€” a newer future hearing
            // record means the case was forwarded, so the record should take over
            const isStale = !!currentISO && currentISO <= todayISO;

            if (isMissing || (isStale && hDate >= todayISO)) {
              if (currentISO && currentISO !== hDate) {
                matchingCase.previousHearing = currentISO;
                matchingCase.previousProcess = matchingCase.hearingProcess || 'â€”';
              }
              matchingCase.nextHearing = hDate;
              matchingCase.hearingProcess = h.process || matchingCase.hearingProcess;
            }
          }
        }
      });
    } else {
      allHearingRecords = [];
    }

    allCaseRecords = loadedCases;
    console.log(`Loaded ${allCaseRecords.length} unique cases from Supabase.`);

    // 4. Sync To-Do Tasks from case_todos (Deduplicated)
    if (todosRes && todosRes.data && !todosRes.error) {
      const seenTaskKeys = new Set();
      const uniqueTasks = [];
      todosRes.data.forEach(t => {
        const key = t.id ? `id_${t.id}` : `${(t.case_number || '').toLowerCase()}_${(t.task_title || '').toLowerCase()}_${t.deadline_date}`;
        if (!seenTaskKeys.has(key)) {
          seenTaskKeys.add(key);
          let parsedSteps = [];
          if (Array.isArray(t.steps)) {
            parsedSteps = t.steps;
          } else if (typeof t.steps === 'string') {
            try { parsedSteps = JSON.parse(t.steps); } catch (e) { parsedSteps = []; }
          }
          uniqueTasks.push({
            id: t.id,
            caseNo: t.case_number,
            caseName: t.case_name || 'â€”',
            taskTitle: t.task_title,
            hearingDate: t.hearing_date,
            deadlineDate: t.deadline_date,
            priority: t.priority || 'medium',
            status: t.status || 'pending',
            steps: parsedSteps,
            copyNumber: t.copy_number || '',
            createdAt: t.created_at
          });
        }
      });
      caseTasks = uniqueTasks;
      window.caseTasks = caseTasks;
      saveCaseTasksLocally();
      updateTodoSyncIndicator(true);
      console.log(`Loaded ${caseTasks.length} unique case tasks from Supabase.`);
    } else {
      updateTodoSyncIndicator(false);
    }

    // 5. Sync Case Transfers from case_transfers
    if (transfersRes && transfersRes.data && !transfersRes.error) {
      if (transfersRes.data.length > 0) {
        allCaseTransfers = transfersRes.data;
        window.allCaseTransfers = allCaseTransfers;
        try {
          localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
        } catch (e) {}
        console.log(`Loaded ${allCaseTransfers.length} court transfers from Supabase.`);
      } else {
        try {
          const localBackup = localStorage.getItem('case_transfers_backup');
          const localTransfers = localBackup ? JSON.parse(localBackup) : [];
          if (Array.isArray(localTransfers) && localTransfers.length > 0) {
            allCaseTransfers = localTransfers;
            window.allCaseTransfers = allCaseTransfers;
            const payload = localTransfers.map(t => ({
              case_number: t.case_number || t.caseNo || '',
              case_type: t.case_type || t.caseType || 'civil',
              case_title: t.case_title || t.caseName || '',
              from_court: t.from_court || t.fromCourt || '',
              to_court: t.to_court || t.toCourt || '',
              transfer_date: t.transfer_date || t.transferDate || getTodayDateString(),
              order_number: t.order_number || t.orderNo || '',
              order_date: t.order_date || t.orderDate || null,
              transferred_by: t.transferred_by || t.authority || '',
              transfer_reason: t.transfer_reason || t.reason || '',
              doc_link: t.doc_link || t.docLink || '',
              remarks: t.remarks || ''
            }));
            supabaseClient.from('case_transfers').insert(payload).select().then(({ data, error }) => {
              if (!error && Array.isArray(data) && data.length > 0) {
                allCaseTransfers = data;
                window.allCaseTransfers = allCaseTransfers;
                try {
                  localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
                } catch (e) {}
                console.log(`Auto-seeded ${data.length} case transfers to Supabase.`);
              }
            }).catch(() => {});
          }
        } catch (e) {}
      }
    } else {
      try {
        const localBackup = localStorage.getItem('case_transfers_backup');
        if (localBackup) {
          allCaseTransfers = JSON.parse(localBackup);
          window.allCaseTransfers = allCaseTransfers;
        }
      } catch (e) {}
    }
    if (typeof renderRecentTransfersTable === 'function') renderRecentTransfersTable();
    if (typeof updateTransfersCountBadge === 'function') updateTransfersCountBadge();

    // 6. Sync Court Helpers from court_helpers table
    if (helpersRes && helpersRes.data && !helpersRes.error) {
      const mappedHelpers = helpersRes.data.map(h => ({
        id: String(h.id || ('helper_' + Date.now())),
        name: h.name || '',
        court: h.court || '',
        position: h.position || '',
        mobile: h.mobile || '',
        createdAt: h.created_at || new Date().toISOString()
      }));
      courtHelpersList = mappedHelpers;
      try {
        localStorage.setItem(COURT_HELPERS_STORAGE_KEY, JSON.stringify(courtHelpersList));
      } catch (e) {}
      updateHelpersBadges();
      if (typeof updateHelpersCloudSyncIndicator === 'function') updateHelpersCloudSyncIndicator(true);
      if (typeof renderHelpersTable === 'function') renderHelpersTable();
      console.log(`Loaded ${courtHelpersList.length} court staff members from Supabase.`);
    } else {
      if (typeof updateHelpersCloudSyncIndicator === 'function') updateHelpersCloudSyncIndicator(false);
    }

    // Ensure all courts mentioned in case records are merged into courts directory (skipping deleted courts)
    if (Array.isArray(allCaseRecords)) {
      const deletedSet = getDeletedCourtsSet();
      let courtsUpdated = false;
      allCaseRecords.forEach(item => {
        const cName = (item.courtName || item.criminalCourtName || '').trim();
        if (cName && cName !== 'â€”' && !deletedSet.has(cName.toLowerCase()) && !courts.some(c => c.trim().toLowerCase() === cName.toLowerCase())) {
          courts.push(cName);
          courtsUpdated = true;
        }
      });
      if (courtsUpdated) {
        saveCourtsToBackup();
        renderCourtOptions();
        renderCriminalCourtOptions();
        renderCourtsTable();
      }
    }

    if (civilRes.error) { alert('Supabase Error: ' + JSON.stringify(civilRes.error)); }
    updateSupabaseStatusIndicator(!civilRes.error);
    refreshAllCaseTables();
    if (typeof syncAccountsWithSupabase === 'function') syncAccountsWithSupabase();
    if (typeof fetchPaisaFromSupabase === 'function') fetchPaisaFromSupabase(false);
  } catch (error) {
    console.error('Supabase live fetch error:', error);
    updateSupabaseStatusIndicator(false);
    const deletedSet = getDeletedCourtsSet();
    if (!courts || courts.length === 0) {
      courts = defaultCourts.filter(c => c && !deletedSet.has(c.trim().toLowerCase()));
    }
    saveCourtsToBackup();
    renderCourtOptions();
    renderCriminalCourtOptions();
    renderCourtsTable();
    refreshAllCaseTables();
  }
}

// ==============================================================================
// Centralized Post-CRUD Auto-Refresh Pipeline
// Automatically re-syncs database and refreshes all views after any CRUD action
// ==============================================================================

async function performPostCrudRefresh(options = {}) {
  try {
    // 1. Fetch fresh data from Supabase (or local fallback)
    if (typeof fetchAllDataFromSupabase === 'function') {
      await fetchAllDataFromSupabase();
    }

    // 2. Refresh all case tables, registers, dashboards, and schedules
    if (typeof refreshAllCaseTables === 'function') {
      refreshAllCaseTables();
    }

    // 3. If a specific case was currently open in Dossier, keep it updated
    if (currentSelectedCase && typeof renderSelectedCaseDetails === 'function') {
      const targetNo = (options.caseNumber || currentSelectedCase.caseNo || currentSelectedCase.criminalCaseNumber || '').trim().toLowerCase();
      if (targetNo) {
        const refreshedCase = allCaseRecords.find(c =>
          (c.caseNo || '').trim().toLowerCase() === targetNo ||
          (c.criminalCaseNumber || '').trim().toLowerCase() === targetNo
        );
        if (refreshedCase) {
          currentSelectedCase = refreshedCase;
          renderSelectedCaseDetails(refreshedCase);
        }
      }
    }

    // 4. If in Tasks/Todo tab, ensure tasks list is re-rendered
    if (typeof renderCaseTasks === 'function') {
      const activeFilter = typeof currentTodoFilter !== 'undefined' ? currentTodoFilter : 'all';
      renderCaseTasks(activeFilter);
    }

    // 5. If in Courts tab, ensure courts table is re-rendered
    if (typeof renderCourtsTable === 'function') {
      renderCourtsTable();
    }

    // 6. If in Court Helpers tab, ensure helpers table is re-rendered
    if (typeof renderHelpersTable === 'function') {
      renderHelpersTable();
    }

    // 7. If in Transfers tab, ensure recent transfers table is re-rendered
    if (typeof renderRecentTransfersTable === 'function') {
      renderRecentTransfersTable();
    }

    // 8. Optional toast notification
    if (options.toast) {
      if (typeof showCaseBookToast === 'function') {
        showCaseBookToast(options.toast);
      }
      if (typeof showToastNotification === 'function') {
        showToastNotification(options.toast);
      } else if (typeof showToast === 'function') {
        showToast(options.toast, 'success');
      }
    }
  } catch (err) {
    console.warn('Post-CRUD auto-refresh notice:', err);
    if (typeof refreshAllCaseTables === 'function') {
      refreshAllCaseTables();
    }
  }
}
if (typeof performPostCrudRefresh !== 'undefined') window.performPostCrudRefresh = performPostCrudRefresh;

// ==============================================================================
// Automatic Uppercase Conversion for Case Number Inputs
// ==============================================================================

var CASE_NUMBER_INPUT_IDS = new Set([
  'caseno',
  'statecasenumber',
  'criminalcasenumber',
  'familycasenumber',
  'revenuecasenumber',
  'misccivilcasenumber',
  'miscciviloriginalcase',
  'misccriminalcasenumber',
  'misccriminaloriginalcase',
  'complaintcasenumber',
  'updatecaseno',
  'updatestatecasenumber',
  'updatecriminalcasenumber',
  'updatefamilycasenumber',
  'updaterevenuecasenumber',
  'updatemisccivilcasenumber',
  'updatemiscciviloriginalcase',
  'updatemisccriminalcasenumber',
  'updatemisccriminaloriginalcase',
  'updatecomplaintcasenumber',
  'hearingcaseno',
  'dbmodnewcaseno',
  'statecrimenumber',
  'updatestatecrimenumber'
]);

function isCaseNumberInputElement(el) {
  if (!el || el.tagName !== 'INPUT') return false;
  const type = (el.type || 'text').toLowerCase();
  if (type !== 'text' && type !== 'search') return false;

  const idLower = (el.id || '').trim().toLowerCase();
  if (CASE_NUMBER_INPUT_IDS.has(idLower)) return true;

  if (el.classList && (el.classList.contains('case-number-input') || el.classList.contains('uppercase-input'))) {
    return true;
  }

  if (el.getAttribute('data-uppercase') === 'true') {
    return true;
  }

  // Check name or placeholder pattern, excluding generic search inputs
  if (!idLower.includes('search') && !idLower.includes('filter')) {
    if (idLower.includes('caseno') || idLower.includes('casenumber') || idLower.includes('case_number') || idLower.includes('crimenumber') || idLower.includes('originalcase')) {
      return true;
    }
  }

  return false;
}

function convertInputToUppercase(inputEl) {
  if (!inputEl || !isCaseNumberInputElement(inputEl)) return;
  const val = inputEl.value;
  if (!val) return;
  const upper = val.toUpperCase();
  if (val !== upper) {
    const start = inputEl.selectionStart;
    const end = inputEl.selectionEnd;
    inputEl.value = upper;
    if (start !== null && end !== null && typeof inputEl.setSelectionRange === 'function') {
      try {
        inputEl.setSelectionRange(start, end);
      } catch (e) {}
    }
  }
}

// Global delegated event listeners for real-time uppercase conversion
document.addEventListener('input', (e) => convertInputToUppercase(e.target), true);
document.addEventListener('change', (e) => convertInputToUppercase(e.target), true);
document.addEventListener('blur', (e) => convertInputToUppercase(e.target), true);
document.addEventListener('paste', (e) => {
  setTimeout(() => convertInputToUppercase(e.target), 0);
}, true);

if (typeof isCaseNumberInputElement !== 'undefined') window.isCaseNumberInputElement = isCaseNumberInputElement;
if (typeof convertInputToUppercase !== 'undefined') window.convertInputToUppercase = convertInputToUppercase;

// ==============================================================================
// Centralized Database Duplicate Prevention Suite
// ==============================================================================

async function checkCaseNumberExists(rawCaseNo, excludeCaseNo = null) {
  if (!rawCaseNo) return { exists: false };
  const cleanNo = String(rawCaseNo).trim().replace(/\s+/g, ' ');
  if (!cleanNo) return { exists: false };

  const cleanLower = cleanNo.toLowerCase();
  const excludeLower = excludeCaseNo ? String(excludeCaseNo).trim().toLowerCase() : null;

  // 1. Check local in-memory records first (instant feedback)
  if (Array.isArray(allCaseRecords)) {
    const localMatch = allCaseRecords.find(c => {
      const cNo1 = (c.caseNo || '').trim().toLowerCase();
      const cNo2 = (c.criminalCaseNumber || '').trim().toLowerCase();
      if (excludeLower && (cNo1 === excludeLower || cNo2 === excludeLower)) {
        return false;
      }
      return cNo1 === cleanLower || cNo2 === cleanLower;
    });

    if (localMatch) {
      return {
        exists: true,
        source: 'local',
        caseNumber: localMatch.caseNo || localMatch.criminalCaseNumber,
        caseName: localMatch.caseName || 'Existing Case',
        caseType: localMatch.caseType || 'civil'
      };
    }
  }

  // 2. Query live Supabase database across all case tables
  if (supabaseClient) {
    try {
      const tablesToCheck = [
        'civilcases',
        'statecases',
        'criminalcases',
        'familycases',
        'revenuecases',
        'misccivilcases',
        'misccriminalcases',
        'complaintcases'
      ];

      const queries = tablesToCheck.map(tbl =>
        supabaseClient
          .from(tbl)
          .select('id, case_number, case_name')
          .ilike('case_number', cleanNo)
          .limit(2)
      );

      const results = await Promise.all(queries);

      for (let i = 0; i < tablesToCheck.length; i++) {
        const { data, error } = results[i];
        if (!error && Array.isArray(data) && data.length > 0) {
          const match = data.find(row => {
            const rowNo = (row.case_number || '').trim().toLowerCase();
            if (excludeLower && rowNo === excludeLower) return false;
            return rowNo === cleanLower;
          });
          if (match) {
            return {
              exists: true,
              source: 'database',
              table: tablesToCheck[i],
              caseNumber: match.case_number,
              caseName: match.case_name || 'Existing Case'
            };
          }
        }
      }
    } catch (supaErr) {
      console.warn('Supabase duplicate check query error:', supaErr);
    }
  }

  return { exists: false };
}
if (typeof checkCaseNumberExists !== 'undefined') window.checkCaseNumberExists = checkCaseNumberExists;

function clearCaseNumberValidationBadges() {
  document.querySelectorAll('.case-dup-warning, .case-dup-ok').forEach(el => el.remove());
  document.querySelectorAll('.input-dup-error').forEach(el => el.classList.remove('input-dup-error'));
}
if (typeof clearCaseNumberValidationBadges !== 'undefined') window.clearCaseNumberValidationBadges = clearCaseNumberValidationBadges;

function attachCaseNumberDuplicateListeners() {
  const caseNumberInputIds = [
    'caseNo',
    'stateCaseNumber',
    'familyCaseNumber',
    'revenueCaseNumber',
    'miscCivilCaseNumber',
    'miscCriminalCaseNumber',
    'complaintCaseNumber'
  ];

  let debounceTimer = null;

  caseNumberInputIds.forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;

    const validateInput = async () => {
      const val = input.value.trim();
      const parent = input.parentElement;
      if (!parent) return;
      parent.querySelectorAll('.case-dup-warning, .case-dup-ok').forEach(el => el.remove());
      input.classList.remove('input-dup-error');

      if (!val) return;

      const dup = await checkCaseNumberExists(val);
      if (dup.exists) {
        input.classList.add('input-dup-error');
        const badge = document.createElement('div');
        badge.className = 'case-dup-warning';
        badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span><strong>Duplicate Warning:</strong> Case Number "${val}" is already registered in ${dup.source === 'database' ? 'table ' + dup.table : 'records'}!</span>`;
        parent.appendChild(badge);
      } else {
        const badge = document.createElement('div');
        badge.className = 'case-dup-ok';
        badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Case Number is unique & available.</span>`;
        parent.appendChild(badge);
      }
    };

    input.addEventListener('blur', validateInput);
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(validateInput, 400);
    });
  });
}
if (typeof attachCaseNumberDuplicateListeners !== 'undefined') window.attachCaseNumberDuplicateListeners = attachCaseNumberDuplicateListeners;

// Add Case to Supabase (or local fallback) with Strict Duplicate Prevention
async function addCaseToSupabase(newCase) {
  let dbInsertFailed = false;

  // Clean and normalize case number
  const cleanCaseNo = (newCase.caseNo || '').trim().replace(/\s+/g, ' ').toUpperCase();
  newCase.caseNo = cleanCaseNo;
  if (newCase.criminalCaseNumber) newCase.criminalCaseNumber = cleanCaseNo;
  if (newCase.originalCaseNumber) newCase.originalCaseNumber = (newCase.originalCaseNumber || '').trim().toUpperCase();
  if (newCase.originalCase) newCase.originalCase = (newCase.originalCase || '').trim().toUpperCase();
  if (newCase.crimeNumber) newCase.crimeNumber = (newCase.crimeNumber || '').trim().toUpperCase();

  // Pre-check database for duplicate before attempting insert
  if (cleanCaseNo) {
    const dupCheck = await checkCaseNumberExists(cleanCaseNo);
    if (dupCheck && dupCheck.exists) {
      console.warn(`[Duplicate Blocked] Case ${cleanCaseNo} already exists in ${dupCheck.source} (${dupCheck.table || 'records'}).`);
      alert(`âŒ Duplicate Entry Blocked!\n\nCase Number "${cleanCaseNo}" is already registered in the database (${dupCheck.source === 'database' ? 'Table: ' + dupCheck.table : 'Case Register'}).\n\nRepeated entry is blocked to preserve database integrity.`);
      return { success: false, duplicate: true };
    }
  }

  if (supabaseClient) {
    try {
      if (newCase.caseType === 'state' || newCase.caseType === 'criminal') {
        const payload = {
          case_number: newCase.caseNo,
          crime_year: parseInt(newCase.caseYear, 10) || 2026,
          case_type: 'state',
          case_name: newCase.caseName,
          police_station: newCase.policeStation,
          crime_section: newCase.crimeSection,
          crime_number: newCase.crimeNumber,
          filing_date: newCase.filingDate || new Date().toISOString().split('T')[0],
          first_party: newCase.firstParty || 'State of U.P.',
          accused_name: newCase.accusedName,
          court_name: newCase.courtName,
          client_name: newCase.clientName,
          client_number: newCase.clientNumber,
          next_hearing: null,
          case_status: 'Pending',
          remark: newCase.remark || ''
        };
        let insertObj = { ...payload, doc_link: newCase.docLink || '' };
        // Try statecases table first
        let { error } = await supabaseClient.from('statecases').insert([insertObj]);
        if (error && (error.code === '42P01' || error.message?.includes('does not exist') || error.code === 'PGRST204')) {
          // Fallback to legacy criminalcases table
          const crimPayload = {
            case_number: newCase.caseNo,
            crime_year: parseInt(newCase.caseYear, 10) || 2026,
            case_type: 'criminal',
            case_name: newCase.caseName,
            police_station: newCase.policeStation,
            crime_section: newCase.crimeSection,
            crime_number: newCase.crimeNumber,
            filing_date: newCase.filingDate,
            victim_name: newCase.firstParty || 'State of U.P.',
            accused_name: newCase.accusedName,
            court_name: newCase.courtName,
            client_name: newCase.clientName,
            client_number: newCase.clientNumber,
            next_hearing: null,
            case_status: 'Pending',
            remark: newCase.remark || ''
          };
          const crimRes = await supabaseClient.from('criminalcases').insert([crimPayload]);
          error = crimRes.error;
        }
        if (error) {
          console.error('Supabase add state case error:', error);
          if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
            alert(`âŒ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`âš ï¸ Failed to add case to database: ${error.message || 'Unknown error'}`);
          }
          dbInsertFailed = true;
        }
      } else if (newCase.caseType === 'family') {
        const payload = {
          case_number: newCase.caseNo,
          case_year: parseInt(newCase.caseYear, 10) || 2026,
          case_type: 'family',
          case_name: newCase.caseName,
          matter_type: newCase.matterType,
          petitioner: newCase.petitioner,
          respondent: newCase.respondent,
          marriage_date: newCase.marriageDate || null,
          maintenance_detail: newCase.maintenanceDetail || '',
          filing_date: newCase.filingDate || new Date().toISOString().split('T')[0],
          court_name: newCase.courtName,
          client_name: newCase.clientName,
          client_number: newCase.clientNumber,
          next_hearing: null,
          case_status: 'Pending',
          remark: newCase.remark || ''
        };
        let insertObj = { ...payload, doc_link: newCase.docLink || '' };
        let { error } = await supabaseClient.from('familycases').insert([insertObj]);
        if (error && (error.code === '42P01' || error.message?.includes('does not exist'))) {
          // Fallback to civilcases
          const civRes = await supabaseClient.from('civilcases').insert([{
            case_number: newCase.caseNo,
            case_year: parseInt(newCase.caseYear, 10) || 2026,
            case_type: 'family',
            case_name: newCase.caseName,
            filing_date: newCase.filingDate,
            plaintiff: newCase.petitioner,
            defendant: newCase.respondent,
            court_name: newCase.courtName,
            client_name: newCase.clientName,
            client_number: newCase.clientNumber,
            remark: `[${newCase.matterType}] ${newCase.remark || ''}`
          }]);
          error = civRes.error;
        }
        if (error) {
          console.error('Supabase add family case error:', error);
          if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
            alert(`âŒ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`âš ï¸ Failed to add case to database: ${error.message || 'Unknown error'}`);
          }
          dbInsertFailed = true;
        }
      } else if (newCase.caseType === 'revenue') {
        const payload = {
          case_number: newCase.caseNo,
          case_year: parseInt(newCase.caseYear, 10) || 2026,
          case_type: 'revenue',
          case_name: newCase.caseName,
          revenue_act_section: newCase.revenueActSection || newCase.actSection || 'Sec 34 (Mutation / à¤¦à¤¾à¤–à¤¿à¤² à¤–à¤¾à¤°à¤¿à¤œ)',
          village_mauja: newCase.villageMauja || newCase.village || '',
          pargana_tehsil: newCase.parganaTehsil || newCase.tehsil || '',
          gata_khata_no: newCase.gataKhataNo || newCase.gataNo || '',
          filing_date: newCase.filingDate || new Date().toISOString().split('T')[0],
          applicant: newCase.applicant,
          opposite_party: newCase.oppositeParty,
          court_name: newCase.courtName,
          client_name: newCase.clientName,
          client_number: newCase.clientNumber,
          next_hearing: null,
          case_status: 'Pending',
          remark: newCase.remark || ''
        };
        let insertObj = { ...payload, doc_link: newCase.docLink || '' };
        let { error } = await supabaseClient.from('revenuecases').insert([insertObj]);
        if (error && (error.code === '42P01' || error.message?.includes('does not exist'))) {
          // Fallback to civilcases
          const civRes = await supabaseClient.from('civilcases').insert([{
            case_number: newCase.caseNo,
            case_year: parseInt(newCase.caseYear, 10) || 2026,
            case_type: 'revenue',
            case_name: newCase.caseName,
            filing_date: newCase.filingDate,
            plaintiff: newCase.applicant,
            defendant: newCase.oppositeParty,
            court_name: newCase.courtName,
            client_name: newCase.clientName,
            client_number: newCase.clientNumber,
            remark: `[${newCase.revenueActSection} - ${newCase.villageMauja}] ${newCase.remark || ''}`
          }]);
          error = civRes.error;
        }
        if (error) {
          console.error('Supabase add revenue case error:', error);
          if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
            alert(`âŒ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`âš ï¸ Failed to add case to database: ${error.message || 'Unknown error'}`);
          }
          dbInsertFailed = true;
        }
      } else if (newCase.caseType === 'misc_civil') {
        const payload = {
          case_number: newCase.caseNo,
          case_year: parseInt(newCase.caseYear, 10) || 2026,
          case_type: 'misc_civil',
          case_name: newCase.caseName,
          original_case_number: newCase.originalCaseNumber || '',
          proceeding_type: newCase.proceedingType || 'Misc Application',
          filing_date: newCase.filingDate || new Date().toISOString().split('T')[0],
          applicant: newCase.applicant,
          opposite_party: newCase.oppositeParty,
          court_name: newCase.courtName,
          client_name: newCase.clientName,
          client_number: newCase.clientNumber,
          next_hearing: null,
          case_status: 'Pending',
          remark: newCase.remark || ''
        };
        let insertObj = { ...payload, doc_link: newCase.docLink || '' };
        let { error } = await supabaseClient.from('misccivilcases').insert([insertObj]);
        if (error && (error.code === '42P01' || error.message?.includes('does not exist'))) {
          // Fallback to civilcases
          const civRes = await supabaseClient.from('civilcases').insert([{
            case_number: newCase.caseNo,
            case_year: parseInt(newCase.caseYear, 10) || 2026,
            case_type: 'misc_civil',
            case_name: newCase.caseName,
            filing_date: newCase.filingDate,
            plaintiff: newCase.applicant,
            defendant: newCase.oppositeParty,
            court_name: newCase.courtName,
            client_name: newCase.clientName,
            client_number: newCase.clientNumber,
            remark: `[${newCase.proceedingType}] ${newCase.remark || ''}`
          }]);
          error = civRes.error;
        }
        if (error) {
          console.error('Supabase add misc civil case error:', error);
          if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
            alert(`âŒ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`âš ï¸ Failed to add case to database: ${error.message || 'Unknown error'}`);
          }
          dbInsertFailed = true;
        }
      } else if (newCase.caseType === 'misc_criminal') {
        const payload = {
          case_number: newCase.caseNo,
          crime_year: parseInt(newCase.caseYear, 10) || 2026,
          case_type: 'misc_criminal',
          case_name: newCase.caseName,
          original_case_number: newCase.originalCaseNumber || '',
          proceeding_type: newCase.proceedingType || 'Bail Application (Sec 439 CrPC)',
          police_station: newCase.policeStation || '',
          crime_section: newCase.crimeSection || '',
          filing_date: newCase.filingDate || new Date().toISOString().split('T')[0],
          applicant: newCase.applicant,
          opposite_party: newCase.oppositeParty || 'State of U.P.',
          court_name: newCase.courtName,
          client_name: newCase.clientName,
          client_number: newCase.clientNumber,
          next_hearing: null,
          case_status: 'Pending',
          remark: newCase.remark || ''
        };
        let insertObj = { ...payload, doc_link: newCase.docLink || '' };
        let { error } = await supabaseClient.from('misccriminalcases').insert([insertObj]);
        if (error && (error.code === '42P01' || error.message?.includes('does not exist'))) {
          // Fallback to criminalcases
          const crimRes = await supabaseClient.from('criminalcases').insert([{
            case_number: newCase.caseNo,
            crime_year: parseInt(newCase.caseYear, 10) || 2026,
            case_type: 'misc_criminal',
            case_name: newCase.caseName,
            police_station: newCase.policeStation || 'Police Station',
            crime_section: newCase.crimeSection || 'IPC',
            crime_number: newCase.originalCaseNumber || newCase.caseNo,
            filing_date: newCase.filingDate,
            victim_name: newCase.oppositeParty || 'State of U.P.',
            accused_name: newCase.applicant,
            court_name: newCase.courtName,
            client_name: newCase.clientName,
            client_number: newCase.clientNumber,
            next_hearing: null,
            case_status: 'Pending',
            remark: `[${newCase.proceedingType}] ${newCase.remark || ''}`
          }]);
          error = crimRes.error;
        }
        if (error) {
          console.error('Supabase add misc criminal case error:', error);
          if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
            alert(`âŒ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`âš ï¸ Failed to add case to database: ${error.message || 'Unknown error'}`);
          }
          dbInsertFailed = true;
        }
      } else if (newCase.caseType === 'complaint') {
        const payload = {
          case_number: newCase.caseNo,
          case_year: parseInt(newCase.caseYear, 10) || 2026,
          case_type: 'complaint',
          complaint_type: newCase.complaintType || 'Cheque Bounce (Sec 138 NI Act)',
          complainant: newCase.complainant || newCase.plaintiff || 'Complainant',
          accused_name: newCase.accusedName || newCase.defendant || 'Accused',
          section_act: newCase.sectionAct || '',
          police_station: newCase.policeStation || '',
          case_name: newCase.caseName,
          court_name: newCase.courtName,
          filing_date: newCase.filingDate || new Date().toISOString().split('T')[0],
          client_name: newCase.clientName,
          client_number: newCase.clientNumber,
          next_hearing: null,
          case_status: 'Pending',
          remark: newCase.remark || ''
        };
        let insertObj = { ...payload, doc_link: newCase.docLink || '' };
        let { error } = await supabaseClient.from('complaintcases').insert([insertObj]);
        if (error && (error.code === '42P01' || error.message?.includes('does not exist'))) {
          // Fallback to criminalcases
          const crimRes = await supabaseClient.from('criminalcases').insert([{
            case_number: newCase.caseNo,
            crime_year: parseInt(newCase.caseYear, 10) || 2026,
            case_type: 'complaint',
            case_name: newCase.caseName,
            police_station: newCase.policeStation || 'Complaint',
            crime_section: newCase.sectionAct || 'Sec 138 NI Act',
            crime_number: newCase.caseNo,
            filing_date: newCase.filingDate,
            victim_name: newCase.complainant,
            accused_name: newCase.accusedName,
            court_name: newCase.courtName,
            client_name: newCase.clientName,
            client_number: newCase.clientNumber,
            next_hearing: null,
            case_status: 'Pending',
            remark: `[${newCase.complaintType}] ${newCase.remark || ''}`
          }]);
          error = crimRes.error;
        }
        if (error) {
          console.error('Supabase add complaint case error:', error);
          if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
            alert(`âŒ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`âš ï¸ Failed to add case to database: ${error.message || 'Unknown error'}`);
          }
          dbInsertFailed = true;
        }
      } else {
        const payload = {
          case_number: newCase.caseNo,
          case_year: parseInt(newCase.caseYear, 10) || 2026,
          case_type: newCase.caseType || 'civil',
          case_name: newCase.caseName,
          filing_date: newCase.filingDate || new Date().toISOString().split('T')[0],
          plaintiff: newCase.plaintiff,
          defendant: newCase.defendant,
          court_name: newCase.courtName,
          client_name: newCase.clientName,
          client_number: newCase.clientNumber,
          next_hearing: null,
          case_status: 'Pending',
          remark: newCase.remark || ''
        };
        let insertObj = { ...payload, doc_link: newCase.docLink || '' };
        let { error } = await supabaseClient.from('civilcases').insert([insertObj]);
        // Fallback: retry without optional columns if column doesn't exist in older Supabase schema
        if (error && (error.message?.includes('doc_link') || error.message?.includes('remark') || error.code === 'PGRST204')) {
          delete insertObj.doc_link;
          let retry1 = await supabaseClient.from('civilcases').insert([insertObj]);
          if (!retry1.error) {
            error = null;
          } else if (retry1.error.message?.includes('remark') || retry1.error.code === 'PGRST204') {
            delete insertObj.remark;
            let retry2 = await supabaseClient.from('civilcases').insert([insertObj]);
            error = retry2.error;
          } else {
            error = retry1.error;
          }
        }
        // Check for unique constraint violation (duplicate case number)
        if (error) {
          console.error('Supabase add civil case error:', error);
          if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
            alert(`âŒ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`âš ï¸ Failed to add case to database: ${error.message || 'Unknown error'}`);
          }
          dbInsertFailed = true;
        }
      }
    } catch (e) {
      console.error('Supabase add error:', e);
      dbInsertFailed = true;
    }
  }

  // Only add to in-memory records if DB insert succeeded (or DB not available) AND not already in records
  if (!dbInsertFailed) {
    const alreadyLocal = allCaseRecords.some(c =>
      (c.caseNo || '').trim().toLowerCase() === cleanCaseNo.toLowerCase() ||
      (c.criminalCaseNumber || '').trim().toLowerCase() === cleanCaseNo.toLowerCase()
    );
    if (!alreadyLocal) {
      allCaseRecords.unshift(newCase);
    }
    await performPostCrudRefresh({ caseNumber: cleanCaseNo });
    return { success: true };
  }
  return { success: false, error: 'Database insert failed' };
}

// Update Case in Supabase (or local fallback)
async function updateCaseInSupabase(originalCaseNumber, newCaseNumberOrType, caseTypeOrTarget, maybeTarget) {
  let originalNo = originalCaseNumber;
  let newCaseNumber = originalCaseNumber;
  let caseType = 'civil';
  let targetCase = null;

  if (typeof maybeTarget === 'object' && maybeTarget !== null) {
    newCaseNumber = newCaseNumberOrType;
    caseType = caseTypeOrTarget;
    targetCase = maybeTarget;
  } else {
    caseType = newCaseNumberOrType;
    targetCase = caseTypeOrTarget;
    newCaseNumber = targetCase?.caseNo || targetCase?.criminalCaseNumber || originalCaseNumber;
  }

  newCaseNumber = String(newCaseNumber || '').trim().toUpperCase();
  if (targetCase) {
    targetCase.caseNo = newCaseNumber;
    if (targetCase.criminalCaseNumber) targetCase.criminalCaseNumber = newCaseNumber;
    if (targetCase.originalCaseNumber) targetCase.originalCaseNumber = String(targetCase.originalCaseNumber || '').trim().toUpperCase();
    if (targetCase.originalCase) targetCase.originalCase = String(targetCase.originalCase || '').trim().toUpperCase();
  }

  if (supabaseClient) {
    try {
      const safeTableUpdate = async (tableName, payload, caseNumber) => {
        let res = await supabaseClient.from(tableName).update(payload).eq('case_number', caseNumber).select('id');
        if (res.error && (res.error.message || '').toLowerCase().includes('disposal_comment')) {
          const fallback = { ...payload };
          delete fallback.disposal_comment;
          res = await supabaseClient.from(tableName).update(fallback).eq('case_number', caseNumber).select('id');
        }
        return res;
      };

      if (caseType === 'state' || caseType === 'criminal') {
        const basePayload = {
          case_number: newCaseNumber,
          crime_year: parseInt(targetCase.caseYear || targetCase.crimeYear, 10) || 2026,
          police_station: targetCase.policeStation,
          crime_section: targetCase.crimeSection,
          crime_number: targetCase.crimeNumber,
          filing_date: targetCase.crimeFilingDate || targetCase.filingDate || null,
          first_party: targetCase.firstParty || 'State of U.P.',
          victim_name: targetCase.firstParty || targetCase.victimName || 'State of U.P.',
          accused_name: targetCase.accusedName,
          court_name: targetCase.courtName,
          client_name: targetCase.clientName,
          client_number: targetCase.clientNumber,
          case_name: targetCase.caseName,
          party_name: targetCase.partyName,
          case_status: targetCase.caseStatus || 'Pending',
          remark: targetCase.remark || '',
          disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
          doc_link: targetCase.docLink || '',
          updated_at: new Date().toISOString()
        };
        if (targetCase.nextHearing && targetCase.nextHearing !== 'â€”') {
          basePayload.next_hearing = targetCase.nextHearing;
        }
        let { data, error } = await safeTableUpdate('statecases', basePayload, originalNo);
        if (error || !data || data.length === 0) {
          await safeTableUpdate('criminalcases', basePayload, originalNo);
        }
      } else if (caseType === 'family') {
        const basePayload = {
          case_number: newCaseNumber,
          case_year: parseInt(targetCase.caseYear, 10) || 2026,
          matter_type: targetCase.matterType,
          petitioner: targetCase.petitioner,
          respondent: targetCase.respondent,
          court_name: targetCase.courtName,
          client_name: targetCase.clientName,
          client_number: targetCase.clientNumber,
          case_name: targetCase.caseName,
          party_name: targetCase.respondent,
          case_status: targetCase.caseStatus || 'Pending',
          remark: targetCase.remark || '',
          disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
          doc_link: targetCase.docLink || '',
          updated_at: new Date().toISOString()
        };
        if (targetCase.filingDate) basePayload.filing_date = targetCase.filingDate;
        if (targetCase.marriageDate) basePayload.marriage_date = targetCase.marriageDate;
        if (targetCase.maintenanceDetail) basePayload.maintenance_detail = targetCase.maintenanceDetail;
        if (targetCase.nextHearing && targetCase.nextHearing !== 'â€”') {
          basePayload.next_hearing = targetCase.nextHearing;
        }
        let { data, error } = await safeTableUpdate('familycases', basePayload, originalNo);
        if (error || !data || data.length === 0) {
          await safeTableUpdate('civilcases', {
            case_number: newCaseNumber,
            case_status: targetCase.caseStatus,
            remark: targetCase.remark,
            disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
            updated_at: new Date().toISOString()
          }, originalNo);
        }
      } else if (caseType === 'revenue') {
        const basePayload = {
          case_number: newCaseNumber,
          case_year: parseInt(targetCase.caseYear, 10) || 2026,
          revenue_act_section: targetCase.revenueActSection || targetCase.actSection || 'Sec 34 (Mutation / à¤¦à¤¾à¤–à¤¿à¤² à¤–à¤¾à¤°à¤¿à¤œ)',
          village_mauja: targetCase.villageMauja || targetCase.village || '',
          pargana_tehsil: targetCase.parganaTehsil || targetCase.tehsil || '',
          gata_khata_no: targetCase.gataKhataNo || targetCase.gataNo || '',
          applicant: targetCase.applicant,
          opposite_party: targetCase.oppositeParty,
          court_name: targetCase.courtName,
          client_name: targetCase.clientName,
          client_number: targetCase.clientNumber,
          case_name: targetCase.caseName,
          party_name: targetCase.oppositeParty,
          case_status: targetCase.caseStatus || 'Pending',
          remark: targetCase.remark || '',
          disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
          doc_link: targetCase.docLink || '',
          updated_at: new Date().toISOString()
        };
        if (targetCase.filingDate) basePayload.filing_date = targetCase.filingDate;
        if (targetCase.nextHearing && targetCase.nextHearing !== 'â€”') {
          basePayload.next_hearing = targetCase.nextHearing;
        }
        let { data, error } = await safeTableUpdate('revenuecases', basePayload, originalNo);
        if (error || !data || data.length === 0) {
          await safeTableUpdate('civilcases', {
            case_number: newCaseNumber,
            case_status: targetCase.caseStatus,
            remark: targetCase.remark,
            disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
            updated_at: new Date().toISOString()
          }, originalNo);
        }
      } else if (caseType === 'misc_civil') {
        const basePayload = {
          case_number: newCaseNumber,
          case_year: parseInt(targetCase.caseYear, 10) || 2026,
          original_case_number: targetCase.originalCaseNumber || targetCase.originalCase || '',
          proceeding_type: targetCase.proceedingType || 'Misc Application',
          applicant: targetCase.applicant,
          opposite_party: targetCase.oppositeParty,
          court_name: targetCase.courtName,
          client_name: targetCase.clientName,
          client_number: targetCase.clientNumber,
          case_name: targetCase.caseName,
          party_name: targetCase.oppositeParty,
          case_status: targetCase.caseStatus || 'Pending',
          remark: targetCase.remark || '',
          disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
          doc_link: targetCase.docLink || '',
          updated_at: new Date().toISOString()
        };
        if (targetCase.filingDate) basePayload.filing_date = targetCase.filingDate;
        if (targetCase.nextHearing && targetCase.nextHearing !== 'â€”') {
          basePayload.next_hearing = targetCase.nextHearing;
        }
        let { data, error } = await safeTableUpdate('misccivilcases', basePayload, originalNo);
        if (error || !data || data.length === 0) {
          await safeTableUpdate('civilcases', {
            case_number: newCaseNumber,
            case_status: targetCase.caseStatus,
            remark: targetCase.remark,
            disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
            updated_at: new Date().toISOString()
          }, originalNo);
        }
      } else if (caseType === 'misc_criminal') {
        const basePayload = {
          case_number: newCaseNumber,
          crime_year: parseInt(targetCase.caseYear || targetCase.crimeYear, 10) || 2026,
          original_case_number: targetCase.originalCaseNumber || targetCase.originalCase || '',
          proceeding_type: targetCase.proceedingType || 'Bail Application (Sec 439 CrPC)',
          police_station: targetCase.policeStation || '',
          crime_section: targetCase.crimeSection || '',
          filing_date: targetCase.filingDate || targetCase.crimeFilingDate || null,
          applicant: targetCase.applicant,
          opposite_party: targetCase.oppositeParty || 'State of U.P.',
          court_name: targetCase.courtName,
          client_name: targetCase.clientName,
          client_number: targetCase.clientNumber,
          case_name: targetCase.caseName,
          party_name: targetCase.applicant,
          case_status: targetCase.caseStatus || 'Pending',
          remark: targetCase.remark || '',
          disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
          doc_link: targetCase.docLink || '',
          updated_at: new Date().toISOString()
        };
        if (targetCase.nextHearing && targetCase.nextHearing !== 'â€”') {
          basePayload.next_hearing = targetCase.nextHearing;
        }
        let { data, error } = await safeTableUpdate('misccriminalcases', basePayload, originalNo);
        if (error || !data || data.length === 0) {
          await safeTableUpdate('criminalcases', {
            case_number: newCaseNumber,
            case_status: targetCase.caseStatus,
            remark: targetCase.remark,
            disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
            updated_at: new Date().toISOString()
          }, originalNo);
        }
      } else if (caseType === 'complaint') {
        const basePayload = {
          case_number: newCaseNumber,
          case_year: parseInt(targetCase.caseYear, 10) || 2026,
          complaint_type: targetCase.complaintType || 'Cheque Bounce (Sec 138 NI Act)',
          complainant: targetCase.complainant || targetCase.plaintiff || 'Complainant',
          accused_name: targetCase.accusedName || targetCase.defendant || 'Accused',
          section_act: targetCase.sectionAct || '',
          police_station: targetCase.policeStation || '',
          filing_date: targetCase.filingDate || null,
          court_name: targetCase.courtName,
          client_name: targetCase.clientName,
          client_number: targetCase.clientNumber,
          case_name: targetCase.caseName,
          party_name: targetCase.accusedName,
          case_status: targetCase.caseStatus || 'Pending',
          remark: targetCase.remark || '',
          disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
          doc_link: targetCase.docLink || '',
          updated_at: new Date().toISOString()
        };
        if (targetCase.nextHearing && targetCase.nextHearing !== 'â€”') {
          basePayload.next_hearing = targetCase.nextHearing;
        }
        let { data, error } = await safeTableUpdate('complaintcases', basePayload, originalNo);
        if (error || !data || data.length === 0) {
          await safeTableUpdate('criminalcases', {
            case_number: newCaseNumber,
            case_status: targetCase.caseStatus,
            remark: targetCase.remark,
            disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
            updated_at: new Date().toISOString()
          }, originalNo);
        }
      } else {
        const basePayload = {
          case_number: newCaseNumber,
          case_year: parseInt(targetCase.caseYear, 10) || 2026,
          filing_date: targetCase.filingDate || null,
          plaintiff: targetCase.plaintiff,
          defendant: targetCase.defendant,
          court_name: targetCase.courtName,
          client_name: targetCase.clientName,
          client_number: targetCase.clientNumber,
          case_name: targetCase.caseName,
          party_name: targetCase.partyName,
          case_status: targetCase.caseStatus || 'Pending',
          remark: targetCase.remark || '',
          disposal_comment: targetCase.disposalComment || targetCase.disposal_comment || null,
          doc_link: targetCase.docLink || '',
          updated_at: new Date().toISOString()
        };
        if (targetCase.nextHearing && targetCase.nextHearing !== 'â€”') {
          basePayload.next_hearing = targetCase.nextHearing;
        }
        let { error } = await safeTableUpdate('civilcases', basePayload, originalNo);
        if (error) {
          delete basePayload.doc_link;
          delete basePayload.remark;
          delete basePayload.disposal_comment;
          await supabaseClient.from('civilcases').update(basePayload).eq('case_number', originalNo);
        }
      }

      // If next hearing date is provided, update or record in hearings table
      if (targetCase.nextHearing && targetCase.nextHearing !== 'â€”') {
        const hearingPayload = {
          case_number: newCaseNumber,
          next_hearing_date: targetCase.nextHearing,
          hearing_process: targetCase.hearingProcess || 'Listed Hearing',
          updated_at: new Date().toISOString()
        };
        const { data: hData, error: hErr } = await supabaseClient
          .from('hearings')
          .update(hearingPayload)
          .eq('case_number', originalNo)
          .select('id');
        if (hErr || !hData || hData.length === 0) {
          await supabaseClient.from('hearings').insert([{
            case_number: newCaseNumber,
            hearing_date: targetCase.nextHearing,
            next_hearing_date: targetCase.nextHearing,
            hearing_process: targetCase.hearingProcess || 'Listed Hearing',
            created_at: new Date().toISOString()
          }]);
        }
      }

      // If case number changed, cascade to hearings and tasks
      if (originalNo.toLowerCase() !== newCaseNumber.toLowerCase()) {
        if (typeof cascadeUpdateCaseNumber === 'function') {
          await cascadeUpdateCaseNumber(originalNo, newCaseNumber);
        } else {
          const { error: hError } = await supabaseClient.from('hearings')
            .update({ case_number: newCaseNumber })
            .eq('case_number', originalNo);
          if (hError) console.error('Supabase update hearings case_number error:', hError);
        }
      }
    } catch (e) {
      console.error('Supabase update error:', e);
    }
  }

  await performPostCrudRefresh({ caseNumber: newCaseNumber });
}

// Delete Case in Supabase (or local fallback)
async function deleteCaseFromSupabase(caseNumber) {
  if (!caseNumber) return;
  const targetNo = caseNumber.trim();

  if (supabaseClient) {
    try {
      const caseTables = [
        'civilcases',
        'statecases',
        'criminalcases',
        'familycases',
        'revenuecases',
        'misccivilcases',
        'misccriminalcases',
        'complaintcases'
      ];
      await Promise.all([
        ...caseTables.map(tbl => supabaseClient.from(tbl).delete().ilike('case_number', targetNo)),
        supabaseClient.from('hearings').delete().ilike('case_number', targetNo),
        supabaseClient.from('case_todos').delete().ilike('case_number', targetNo),
        supabaseClient.from('case_transfers').delete().ilike('case_number', targetNo)
      ]);
    } catch (e) {
      console.error('Supabase delete error:', e);
    }
  }

  const idx = allCaseRecords.findIndex(c => 
    (c.caseNo || '').trim().toLowerCase() === targetNo.toLowerCase() || 
    (c.criminalCaseNumber || '').trim().toLowerCase() === targetNo.toLowerCase()
  );
  if (idx !== -1) {
    allCaseRecords.splice(idx, 1);
  }

  // Cascade in-memory deletion to hearings
  if (Array.isArray(allHearingRecords)) {
    allHearingRecords = allHearingRecords.filter(h => 
      (h.case_number || '').trim().toLowerCase() !== targetNo.toLowerCase()
    );
  }

  // Cascade in-memory deletion to tasks
  if (Array.isArray(caseTasks)) {
    caseTasks = caseTasks.filter(t => 
      (t.caseNo || '').trim().toLowerCase() !== targetNo.toLowerCase()
    );
    if (typeof saveCaseTasksLocally === 'function') saveCaseTasksLocally();
    if (typeof renderCaseTasks === 'function') renderCaseTasks(currentTodoFilter);
  }

  // Cascade in-memory deletion to court transfers
  if (Array.isArray(allCaseTransfers)) {
    allCaseTransfers = allCaseTransfers.filter(t => 
      (t.case_number || '').trim().toLowerCase() !== targetNo.toLowerCase()
    );
    try { localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers)); } catch(e) {}
    if (typeof renderRecentTransfersTable === 'function') renderRecentTransfersTable();
    if (typeof updateTransfersCountBadge === 'function') updateTransfersCountBadge();
  }

  await performPostCrudRefresh();
  if (typeof populateTodoCaseDropdown === 'function') populateTodoCaseDropdown();
  if (typeof renderCalendarView === 'function' && typeof currentCalendarMonth !== 'undefined') {
    renderCalendarView(currentCalendarMonth, currentCalendarYear);
  }
}

// Update Hearing in Supabase (or local fallback)
// Update a case row's hearing fields in one table, matched case-insensitively.
// If the full payload (which may include previous_hearing/previous_process) is
// rejected â€” e.g. a table without those columns â€” retry with the minimal
// next_hearing/hearing_process payload so the forward date still lands.
async function updateCaseTableHearing(tbl, variant, payload) {
  let res = await supabaseClient.from(tbl).update(payload).ilike('case_number', variant).select('id');
  if (res && res.error && (payload.previous_hearing || payload.previous_process)) {
    const minimal = { next_hearing: payload.next_hearing, hearing_process: payload.hearing_process };
    const retry = await supabaseClient.from(tbl).update(minimal).ilike('case_number', variant).select('id');
    if (!retry || !retry.error) {
      console.warn(`Hearing update on "${tbl}" needed the minimal payload (full payload rejected: ${res.error.message}).`);
      return retry || { data: [], error: null };
    }
  }
  return res;
}

async function updateHearingInSupabase(caseNumber, hearingDate, process, actionTaken = '') {
  // Determine case type from allCaseRecords for proper tagging
  const cleanKey = (caseNumber || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const matchedCase = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    if (num1 === caseNumber.toLowerCase() || num2 === caseNumber.toLowerCase()) return true;
    if (cleanKey && (num1.replace(/[^a-z0-9]/g, '') === cleanKey || num2.replace(/[^a-z0-9]/g, '') === cleanKey)) return true;
    return false;
  });

  const caseType = matchedCase?.caseType || 'civil';
  const resolvedCaseNumber = String(matchedCase ? (matchedCase.caseNo || matchedCase.criminalCaseNumber || caseNumber) : caseNumber).trim().toUpperCase();
  const resolvedAction = actionTaken && actionTaken.trim() ? actionTaken.trim() : ('Scheduled stage: ' + process);

  const hearingPayload = {
    case_number: resolvedCaseNumber,
    case_type: caseType,
    hearing_date: hearingDate,
    process: process,
    action_taken: resolvedAction
  };

  // --- Supabase: upsert (update existing or insert new) ---
  if (supabaseClient) {
    try {
      // Check if a hearing already exists for this case + date
      const { data: existing, error: fetchErr } = await supabaseClient
        .from('hearings')
        .select('id')
        .eq('case_number', resolvedCaseNumber)
        .eq('hearing_date', hearingDate)
        .limit(1);

      if (fetchErr) {
        console.error('Supabase hearing lookup error:', fetchErr);
      }

      let dbError = null;
      if (existing && existing.length > 0) {
        // UPDATE existing hearing row
        const { error } = await supabaseClient.from('hearings')
          .update({ process: process, action_taken: resolvedAction })
          .eq('id', existing[0].id);
        dbError = error;
      } else {
        // INSERT new hearing row
        const { error } = await supabaseClient.from('hearings')
          .insert([hearingPayload]);
        dbError = error;
      }

      if (dbError) {
        console.error('Supabase hearing save error:', dbError);
        alert('âš ï¸ Failed to save hearing to database: ' + (dbError.message || 'Unknown error') + '. Changes saved locally only.');
      } else {
        // Update next_hearing and hearing_process across all relevant case tables
        const allCaseTables = [
          'civilcases',
          'statecases',
          'criminalcases',
          'familycases',
          'revenuecases',
          'misccivilcases',
          'misccriminalcases',
          'complaintcases'
        ];

        const tableMap = {
          'civil': 'civilcases',
          'state': 'statecases',
          'criminal': 'criminalcases',
          'family': 'familycases',
          'revenue': 'revenuecases',
          'misc_civil': 'misccivilcases',
          'misc_criminal': 'misccriminalcases',
          'complaint': 'complaintcases'
        };

        const targetTable = tableMap[caseType];
        const updatePayload = { next_hearing: hearingDate, hearing_process: process };

        if (matchedCase && matchedCase.nextHearing && matchedCase.nextHearing !== 'â€”' && toISODate(matchedCase.nextHearing) !== toISODate(hearingDate)) {
          updatePayload.previous_hearing = matchedCase.nextHearing;
          updatePayload.previous_process = matchedCase.hearingProcess || 'â€”';
        }

        // Update the case row in every table it might live in; .select() makes each
        // update return its affected rows so failures and 0-row matches are visible.
        // Candidate match patterns: the resolved number, the raw stored variants from
        // the matched local record, and a fuzzy pattern where punctuation runs become
        // single-char wildcards (DB may store "CSCR/123/2024" vs "CSCR 123 2024").
        const matchVariants = [resolvedCaseNumber];
        if (matchedCase) {
          [matchedCase.caseNo, matchedCase.criminalCaseNumber].forEach(v => {
            const s = String(v || '').trim();
            if (s && s.toUpperCase() !== resolvedCaseNumber) matchVariants.push(s.toUpperCase());
          });
        }
        if (String(caseNumber).trim().toUpperCase() !== resolvedCaseNumber) {
          matchVariants.push(String(caseNumber).trim().toUpperCase());
        }
        const fuzzy = resolvedCaseNumber.replace(/[^A-Z0-9]+/g, '_');
        if (fuzzy !== resolvedCaseNumber) matchVariants.push(fuzzy);

        let updateResults = [];
        for (const variant of matchVariants) {
          updateResults = await Promise.allSettled(
            allCaseTables.map(tbl => updateCaseTableHearing(tbl, variant, updatePayload))
          );
          if (updateResults.some(res =>
            res.status === 'fulfilled' && res.value && !res.value.error &&
            Array.isArray(res.value.data) && res.value.data.length > 0
          )) break; // matched â€” stop trying variants
        }

        let anyError = false;
        let anyRowUpdated = false;
        updateResults.forEach((res, idx) => {
          const tbl = allCaseTables[idx];
          if (res.status === 'rejected') {
            anyError = true;
            console.error(`Hearing case-table update failed on "${tbl}":`, res.reason);
          } else if (res.value && res.value.error) {
            anyError = true;
            console.error(`Hearing case-table update failed on "${tbl}":`, res.value.error);
          } else if (Array.isArray(res.value && res.value.data) && res.value.data.length > 0) {
            anyRowUpdated = true;
          }
        });

        // Only a genuine failure to update the case row anywhere is user-facing;
        // errors on unrelated tables (which matched no row anyway) are just logged.
        if (!anyRowUpdated) {
          const detail = anyError
            ? 'One or more case tables rejected the update (see console for details).'
            : `No case row matched case number "${resolvedCaseNumber}" in any table.`;
          console.error('Hearing case-table update problem:', detail);
          alert('âš ï¸ Hearing saved, but the case record was NOT updated in the database: ' + detail +
                '\n\nThe next hearing date may show incorrectly after reload. Please check the case number and try again.');
        } else if (anyError) {
          console.warn('Hearing case-table update: case row updated, but some unrelated tables rejected the update (see console).');
        }
      }
    } catch (e) {
      console.error('Supabase hearing update error:', e);
      alert('âš ï¸ Hearing update encountered an error. Changes saved locally only.');
    }
  }

  // --- Local in-memory: prevent duplicate entries ---
  const newDateISO = toISODate(hearingDate);
  const existingLocalIdx = allHearingRecords.findIndex(h =>
    (h.case_number || '').toLowerCase() === resolvedCaseNumber.toLowerCase() &&
    toISODate(h.hearing_date) === newDateISO
  );
  if (existingLocalIdx !== -1) {
    // Update existing local entry
    allHearingRecords[existingLocalIdx].process = process;
    allHearingRecords[existingLocalIdx].action_taken = ('Scheduled stage: ' + process);
    allHearingRecords[existingLocalIdx].case_type = caseType;
    allHearingRecords[existingLocalIdx].case_number = resolvedCaseNumber;
  } else {
    // Add new local entry
    allHearingRecords.unshift({
      ...hearingPayload,
      created_at: new Date().toISOString()
    });
  }

  // Update in-memory case record
  if (matchedCase) {
    if (matchedCase.nextHearing && matchedCase.nextHearing !== 'â€”' && toISODate(matchedCase.nextHearing) !== newDateISO) {
      matchedCase.previousHearing = matchedCase.nextHearing;
      matchedCase.previousProcess = matchedCase.hearingProcess || 'â€”';
    }
    matchedCase.nextHearing = hearingDate;
    matchedCase.hearingProcess = process;
  }

  await performPostCrudRefresh({ caseNumber: resolvedCaseNumber });
}

// ==============================================================================
// Referential Integrity & Cascading Updates Suite
// ==============================================================================

async function cascadeUpdateCourtName(oldCourtName, newCourtName) {
  const oldName = (oldCourtName || '').trim();
  const newName = (newCourtName || '').trim();
  if (!oldName || !newName || oldName.toLowerCase() === newName.toLowerCase()) return 0;

  console.log(`[CASCADE] Updating court name from "${oldName}" to "${newName}" across cases and database...`);

  unmarkCourtAsDeleted(newName);
  markCourtAsDeleted(oldName);

  // 1. Update in-memory courts array
  const cIdx = courts.findIndex(c => c.trim().toLowerCase() === oldName.toLowerCase());
  if (cIdx !== -1) {
    courts[cIdx] = newName;
  } else if (!courts.some(c => c.trim().toLowerCase() === newName.toLowerCase())) {
    courts.push(newName);
  }

  // Update defaultCourts in-memory array
  const dIdx = defaultCourts.findIndex(c => c.trim().toLowerCase() === oldName.toLowerCase());
  if (dIdx !== -1) {
    defaultCourts[dIdx] = newName;
  } else if (!defaultCourts.some(c => c.trim().toLowerCase() === newName.toLowerCase())) {
    defaultCourts.push(newName);
  }

  // 2. Update in-memory allCaseRecords
  let affectedCaseCount = 0;
  if (Array.isArray(allCaseRecords)) {
    allCaseRecords.forEach(c => {
      let changed = false;
      if ((c.courtName || '').trim().toLowerCase() === oldName.toLowerCase()) {
        c.courtName = newName;
        changed = true;
      }
      if ((c.criminalCourtName || '').trim().toLowerCase() === oldName.toLowerCase()) {
        c.criminalCourtName = newName;
        changed = true;
      }
      if (changed) affectedCaseCount++;
    });
  }

  // Update in-memory allCaseTransfers
  if (Array.isArray(allCaseTransfers)) {
    allCaseTransfers.forEach(t => {
      if ((t.fromCourt || '').trim().toLowerCase() === oldName.toLowerCase()) {
        t.fromCourt = newName;
      }
      if ((t.toCourt || '').trim().toLowerCase() === oldName.toLowerCase()) {
        t.toCourt = newName;
      }
    });
    try { localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers)); } catch(e) {}
  }

  // 3. Update Supabase database across all tables
  if (supabaseClient) {
    const caseTables = [
      'civilcases',
      'statecases',
      'criminalcases',
      'familycases',
      'revenuecases',
      'misccivilcases',
      'misccriminalcases',
      'complaintcases'
    ];

    try {
      // Check if oldName existed in courts table
      const { data: existingCourt } = await supabaseClient
        .from('courts')
        .select('id')
        .ilike('court_name', oldName)
        .limit(1);

      if (existingCourt && existingCourt.length > 0) {
        await supabaseClient
          .from('courts')
          .update({ court_name: newName, updated_at: new Date().toISOString() })
          .eq('id', existingCourt[0].id);
      } else {
        await supabaseClient
          .from('courts')
          .insert([{ court_name: newName, court_type: 'District Court' }]);
      }

      // Update all case tables where court_name = oldName
      const tableUpdates = caseTables.map(async (table) => {
        try {
          const { error } = await supabaseClient
            .from(table)
            .update({ court_name: newName, updated_at: new Date().toISOString() })
            .ilike('court_name', oldName);
          if (error && !error.message?.includes('column')) {
            console.warn(`[CASCADE] Note on table ${table}:`, error.message);
          }
        } catch (tblErr) {
          console.warn(`[CASCADE] Exception on table ${table}:`, tblErr);
        }
      });

      // Also check criminal_court_name column on criminalcases if exists
      tableUpdates.push((async () => {
        try {
          await supabaseClient
            .from('criminalcases')
            .update({ criminal_court_name: newName, updated_at: new Date().toISOString() })
            .ilike('criminal_court_name', oldName);
        } catch (e) {}
      })());

      // Update case_transfers
      tableUpdates.push((async () => {
        try {
          await supabaseClient
            .from('case_transfers')
            .update({ from_court: newName })
            .ilike('from_court', oldName);
        } catch (e) {}
      })());
      tableUpdates.push((async () => {
        try {
          await supabaseClient
            .from('case_transfers')
            .update({ to_court: newName })
            .ilike('to_court', oldName);
        } catch (e) {}
      })());

      await Promise.all(tableUpdates);
      console.log(`[CASCADE] Database cascading court update completed: "${oldName}" -> "${newName}".`);
    } catch (supaErr) {
      console.error('[CASCADE] Supabase cascading court update error:', supaErr);
    }
  }

  saveCourtsToBackup();

  // 4. Re-render UI components to reflect updated court name
  if (typeof renderCourtOptions === 'function') renderCourtOptions();
  if (typeof renderCriminalCourtOptions === 'function') renderCriminalCourtOptions();
  if (typeof renderSearchCourtFilterOptions === 'function') renderSearchCourtFilterOptions();
  if (typeof renderCourtsTable === 'function') renderCourtsTable();
  if (typeof refreshAllCaseTables === 'function') refreshAllCaseTables();
  if (typeof filterCaseTables === 'function') filterCaseTables();
  if (typeof renderRecentTransfersTable === 'function') renderRecentTransfersTable();
  if (typeof renderCalendarView === 'function' && typeof currentCalendarMonth !== 'undefined') {
    renderCalendarView(currentCalendarMonth, currentCalendarYear);
  }
  if (typeof populateTodoCaseDropdown === 'function') populateTodoCaseDropdown();

  return affectedCaseCount;
}
if (typeof cascadeUpdateCourtName !== 'undefined') window.cascadeUpdateCourtName = cascadeUpdateCourtName;

async function cascadeUpdateCaseNumber(oldCaseNo, newCaseNo) {
  const oldNo = (oldCaseNo || '').trim();
  const newNo = (newCaseNo || '').trim();
  if (!oldNo || !newNo || oldNo.toLowerCase() === newNo.toLowerCase()) return;

  console.log(`[CASCADE] Cascading case number change from "${oldNo}" to "${newNo}"...`);

  // 1. In-memory allHearingRecords
  if (Array.isArray(allHearingRecords)) {
    allHearingRecords.forEach(h => {
      if ((h.case_number || '').trim().toLowerCase() === oldNo.toLowerCase()) {
        h.case_number = newNo;
      }
    });
  }

  // 2. In-memory caseTasks (To-Do items)
  let tasksUpdated = 0;
  if (Array.isArray(caseTasks)) {
    caseTasks.forEach(t => {
      if ((t.caseNo || '').trim().toLowerCase() === oldNo.toLowerCase()) {
        t.caseNo = newNo;
        tasksUpdated++;
      }
    });
    if (tasksUpdated > 0 && typeof saveCaseTasksLocally === 'function') {
      saveCaseTasksLocally();
      if (typeof renderCaseTasks === 'function') renderCaseTasks(currentTodoFilter);
    }
  }

  // 2.5 In-memory allCaseTransfers
  if (Array.isArray(allCaseTransfers)) {
    allCaseTransfers.forEach(t => {
      if ((t.case_number || '').trim().toLowerCase() === oldNo.toLowerCase()) {
        t.case_number = newNo;
      }
    });
    try { localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers)); } catch(e) {}
    if (typeof renderRecentTransfersTable === 'function') renderRecentTransfersTable();
  }

  // 3. Supabase updates on hearings, case_todos and case_transfers
  if (supabaseClient) {
    try {
      await Promise.all([
        supabaseClient.from('hearings').update({ case_number: newNo }).ilike('case_number', oldNo),
        supabaseClient.from('case_todos').update({ case_number: newNo }).ilike('case_number', oldNo),
        supabaseClient.from('case_transfers').update({ case_number: newNo }).ilike('case_number', oldNo)
      ]);
      console.log(`[CASCADE] Supabase hearings, case_todos, and case_transfers updated for case number "${oldNo}" -> "${newNo}".`);
    } catch (err) {
      console.error('[CASCADE] Supabase error cascading case number change:', err);
    }
  }

  // 4. Update UI dropdowns & views
  if (typeof populateTodoCaseDropdown === 'function') populateTodoCaseDropdown(newNo);
  if (typeof renderCalendarView === 'function' && typeof currentCalendarMonth !== 'undefined') {
    renderCalendarView(currentCalendarMonth, currentCalendarYear);
  }
}
if (typeof cascadeUpdateCaseNumber !== 'undefined') window.cascadeUpdateCaseNumber = cascadeUpdateCaseNumber;

// ==============================================================================
// Courts Supabase Management (Live Sync & Cascading Updates)
// ==============================================================================


// Expose to window
if (typeof fetchAllDataFromSupabase !== 'undefined') window.fetchAllDataFromSupabase = fetchAllDataFromSupabase;
if (typeof performPostCrudRefresh !== 'undefined') window.performPostCrudRefresh = performPostCrudRefresh;
if (typeof checkCaseNumberExists !== 'undefined') window.checkCaseNumberExists = checkCaseNumberExists;
if (typeof addCaseToSupabase !== 'undefined') window.addCaseToSupabase = addCaseToSupabase;
if (typeof updateCaseInSupabase !== 'undefined') window.updateCaseInSupabase = updateCaseInSupabase;
if (typeof deleteCaseFromSupabase !== 'undefined') window.deleteCaseFromSupabase = deleteCaseFromSupabase;
if (typeof updateCaseTableHearing !== 'undefined') window.updateCaseTableHearing = updateCaseTableHearing;
if (typeof updateHearingInSupabase !== 'undefined') window.updateHearingInSupabase = updateHearingInSupabase;
if (typeof cascadeUpdateCourtName !== 'undefined') window.cascadeUpdateCourtName = cascadeUpdateCourtName;
if (typeof cascadeUpdateCaseNumber !== 'undefined') window.cascadeUpdateCaseNumber = cascadeUpdateCaseNumber;
