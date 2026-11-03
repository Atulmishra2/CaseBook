// ==============================================================================
// Ancillary Data Services (Courts, Helpers, Misc)
// ==============================================================================

async function addCourtToSupabase(courtInput) {
  const isObj = typeof courtInput === 'object' && courtInput !== null;
  const rawName = isObj ? (courtInput.court_name || '') : (courtInput || '');
  const trimmed = rawName.trim();
  if (!trimmed) return false;

  unmarkCourtAsDeleted(trimmed);

  const alreadyInMemory = courts.some(c => c.trim().toLowerCase() === trimmed.toLowerCase());
  const auditedMaster = (typeof auditedCourtsData !== 'undefined' && Array.isArray(auditedCourtsData)) ? auditedCourtsData : [];
  const auditedMatch = auditedMaster.find(ac => ac.court_name.toLowerCase() === trimmed.toLowerCase());

  const courtRecord = {
    court_name: trimmed,
    short_code: (isObj && courtInput.short_code) || (auditedMatch ? auditedMatch.short_code : ''),
    civil_title: (isObj && courtInput.civil_title) || (auditedMatch ? auditedMatch.civil_title : trimmed),
    criminal_title: (isObj && courtInput.criminal_title) || (auditedMatch ? auditedMatch.criminal_title : trimmed),
    cadre: (isObj && courtInput.cadre) || (auditedMatch ? auditedMatch.cadre : 'General'),
    status: (isObj && courtInput.status) || (auditedMatch ? auditedMatch.status : 'ACTIVE'),
    remarks: (isObj && courtInput.remarks) || (auditedMatch ? auditedMatch.remarks : ''),
    court_type: 'District Court'
  };

  if (supabaseClient) {
    try {
      // Check live database for duplicate court
      const { data: existing } = await supabaseClient
        .from('courts')
        .select('id, court_name, status')
        .ilike('court_name', trimmed)
        .limit(1);

      if (existing && existing.length > 0) {
        console.warn(`Court "${trimmed}" already exists in Supabase courts table. Reactivating...`);
        await supabaseClient.from('courts').update({ status: courtRecord.status }).ilike('court_name', trimmed);
        courtRecord.id = existing[0].id;
      } else {
        const { data: insData, error } = await supabaseClient.from('courts').insert([courtRecord]).select('id');
        if (error) {
          // Fallback if rich columns don't exist yet
          const { error: fbErr } = await supabaseClient.from('courts').insert([{ court_name: trimmed, court_type: 'District Court' }]);
          if (fbErr) console.error('Supabase add court fallback error:', fbErr);
        } else if (insData && insData[0]) {
          courtRecord.id = insData[0].id;
        }
      }
    } catch (e) {
      console.error('Supabase add court exception:', e);
    }
  }

  if (!alreadyInMemory) {
    courts.push(trimmed);
  }
  if (!defaultCourts.some(c => c.trim().toLowerCase() === trimmed.toLowerCase())) {
    defaultCourts.push(trimmed);
  }

  if (typeof courtsList !== 'undefined' && Array.isArray(courtsList)) {
    const listIdx = courtsList.findIndex(c => (c.court_name || '').trim().toLowerCase() === trimmed.toLowerCase());
    if (listIdx >= 0) {
      courtsList[listIdx] = courtRecord;
    } else {
      courtsList.push(courtRecord);
    }
    window.courtsList = courtsList;
  }

  saveCourtsToBackup();
  renderCourtOptions();
  renderCriminalCourtOptions();
  renderSearchCourtFilterOptions();
  renderCourtsTable();
  await performPostCrudRefresh();
  return true;
}

async function editCourtInSupabase(oldName, newName) {
  return await cascadeUpdateCourtName(oldName, newName);
}

async function deleteCourtFromSupabase(courtName) {
  const trimmed = (courtName || '').trim();
  if (!trimmed) return false;

  markCourtAsDeleted(trimmed);

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

  if (supabaseClient) {
    try {
      // 1. Soft delete court record (or delete) from courts table
      const { error: updErr } = await supabaseClient.from('courts').update({ status: 'DELETED' }).ilike('court_name', trimmed);
      if (updErr) {
        // Fallback to hard delete if status column doesn't exist
        const { error: delErr } = await supabaseClient.from('courts').delete().ilike('court_name', trimmed);
        if (delErr) console.error('Supabase delete court error:', delErr);
      }

      // 2. Unlink all cases in Supabase that belonged to this court
      const unlinks = caseTables.map(async (table) => {
        try {
          await supabaseClient
            .from(table)
            .update({ court_name: '—', updated_at: new Date().toISOString() })
            .ilike('court_name', trimmed);
        } catch (e) {}
      });
      unlinks.push((async () => {
        try {
          await supabaseClient
            .from('criminalcases')
            .update({ criminal_court_name: '—', updated_at: new Date().toISOString() })
            .ilike('criminal_court_name', trimmed);
        } catch (e) {}
      })());
      await Promise.all(unlinks);
    } catch (e) {
      console.error('Supabase delete court exception:', e);
    }
  }

  // 3. Remove from in-memory courts, defaultCourts & courtsList
  courts = courts.filter(c => c.trim().toLowerCase() !== trimmed.toLowerCase());
  defaultCourts = defaultCourts.filter(c => c.trim().toLowerCase() !== trimmed.toLowerCase());
  if (typeof courtsList !== 'undefined' && Array.isArray(courtsList)) {
    courtsList = courtsList.filter(c => (c.court_name || '').trim().toLowerCase() !== trimmed.toLowerCase());
    window.courtsList = courtsList;
  }

  // 4. Update in-memory cases that belonged to this court
  if (Array.isArray(allCaseRecords)) {
    allCaseRecords.forEach(c => {
      if ((c.courtName || '').trim().toLowerCase() === trimmed.toLowerCase()) {
        c.courtName = '—';
      }
      if ((c.criminalCourtName || '').trim().toLowerCase() === trimmed.toLowerCase()) {
        c.criminalCourtName = '—';
      }
    });
  }

  saveCourtsToBackup();
  renderCourtOptions();
  renderCriminalCourtOptions();
  renderSearchCourtFilterOptions();
  renderCourtsTable();
  refreshAllCaseTables();
  return true;
}

// ==============================================================================
// Authentication & Screens
// ==============================================================================


// Auto-Exports
if (typeof addCourtToSupabase !== 'undefined') window.addCourtToSupabase = addCourtToSupabase;
if (typeof editCourtInSupabase !== 'undefined') window.editCourtInSupabase = editCourtInSupabase;
if (typeof deleteCourtFromSupabase !== 'undefined') window.deleteCourtFromSupabase = deleteCourtFromSupabase;
