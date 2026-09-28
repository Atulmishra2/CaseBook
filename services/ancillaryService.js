// ==============================================================================
// Ancillary Data Services (Courts, Helpers, Misc)
// ==============================================================================

async function addCourtToSupabase(courtName) {
  const trimmed = (courtName || '').trim();
  if (!trimmed) return false;

  unmarkCourtAsDeleted(trimmed);

  const alreadyInMemory = courts.some(c => c.trim().toLowerCase() === trimmed.toLowerCase());

  if (supabaseClient) {
    try {
      // Check live database for duplicate court
      const { data: existing } = await supabaseClient
        .from('courts')
        .select('court_name')
        .ilike('court_name', trimmed)
        .limit(1);

      if (existing && existing.length > 0) {
        console.warn(`Court "${trimmed}" already exists in Supabase courts table.`);
        if (!alreadyInMemory) {
          courts.push(existing[0].court_name || trimmed);
        }
      } else {
        const { error } = await supabaseClient.from('courts').insert([{ court_name: trimmed, court_type: 'District Court' }]);
        if (error) console.error('Supabase add court error:', error);
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
      // 1. Delete court record from courts table
      const { error: delErr } = await supabaseClient.from('courts').delete().ilike('court_name', trimmed);
      if (delErr) console.error('Supabase delete court error:', delErr);

      // 2. Unlink all cases in Supabase that belonged to this court
      const unlinks = caseTables.map(async (table) => {
        try {
          await supabaseClient
            .from(table)
            .update({ court_name: 'â€”', updated_at: new Date().toISOString() })
            .ilike('court_name', trimmed);
        } catch (e) {}
      });
      unlinks.push((async () => {
        try {
          await supabaseClient
            .from('criminalcases')
            .update({ criminal_court_name: 'â€”', updated_at: new Date().toISOString() })
            .ilike('criminal_court_name', trimmed);
        } catch (e) {}
      })());
      await Promise.all(unlinks);
    } catch (e) {
      console.error('Supabase delete court exception:', e);
    }
  }

  // 3. Remove from in-memory courts & defaultCourts
  courts = courts.filter(c => c.trim().toLowerCase() !== trimmed.toLowerCase());
  defaultCourts = defaultCourts.filter(c => c.trim().toLowerCase() !== trimmed.toLowerCase());

  // 4. Update in-memory cases that belonged to this court
  if (Array.isArray(allCaseRecords)) {
    allCaseRecords.forEach(c => {
      if ((c.courtName || '').trim().toLowerCase() === trimmed.toLowerCase()) {
        c.courtName = 'â€”';
      }
      if ((c.criminalCourtName || '').trim().toLowerCase() === trimmed.toLowerCase()) {
        c.criminalCourtName = 'â€”';
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
