// ==============================================================================
// Supabase Configuration (Zero-Credential Public Repo Architecture)
// Credentials are stored strictly in client-side localStorage.
// No keys or project URLs are hardcoded in the public repository.
// ==============================================================================

function getStoredSupabaseConfig() {
  var url = '';
  var key = '';
  try {
    if (typeof localStorage !== 'undefined') {
      url = localStorage.getItem('CASEBOOK_SUPABASE_URL') || '';
      key = localStorage.getItem('CASEBOOK_SUPABASE_KEY') || localStorage.getItem('CASEBOOK_SUPABASE_ANON_KEY') || '';
    }
  } catch (e) {
    console.warn('localStorage access failed:', e);
  }
  return { url: (url || '').trim(), key: (key || '').trim() };
}

var _storedConfig = getStoredSupabaseConfig();
var SUPABASE_URL = _storedConfig.url;
var SUPABASE_ANON_KEY = _storedConfig.key;

var isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes('YOUR_PROJECT_ID') &&
  !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY')
);

var supabaseClient = null;

function ensureSupabaseClient() {
  var cfg = getStoredSupabaseConfig();
  SUPABASE_URL = cfg.url;
  SUPABASE_ANON_KEY = cfg.key;
  isSupabaseConfigured = Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes('YOUR_PROJECT_ID') &&
    !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY')
  );
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
  window.isSupabaseConfigured = isSupabaseConfigured;

  if (typeof window !== 'undefined' && window.supabaseClient && isSupabaseConfigured) {
    supabaseClient = window.supabaseClient;
    return supabaseClient;
  }

  var createClientFn = (typeof window !== 'undefined' && window.supabase?.createClient) || (typeof supabase !== 'undefined' ? supabase.createClient : null);

  if (isSupabaseConfigured && createClientFn) {
    try {
      supabaseClient = createClientFn(SUPABASE_URL, SUPABASE_ANON_KEY);
      window.supabaseClient = supabaseClient;
    } catch (e) {
      console.warn('Supabase client creation error:', e);
      supabaseClient = null;
      window.supabaseClient = null;
    }
  } else {
    supabaseClient = null;
    window.supabaseClient = null;
  }
  return supabaseClient;
}

var _initialCreateFn = (typeof window !== 'undefined' && window.supabase?.createClient) || (typeof supabase !== 'undefined' ? supabase.createClient : null);
if (isSupabaseConfigured && _initialCreateFn) {
  try {
    supabaseClient = _initialCreateFn(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    console.warn('Initial Supabase client creation error:', e);
  }
}

// Global helpers to configure credentials safely from UI/Settings without exposing in code
window.saveSupabaseConfig = function(url, key) {
  try {
    if (typeof localStorage !== 'undefined') {
      if (url) localStorage.setItem('CASEBOOK_SUPABASE_URL', url.trim());
      if (key) localStorage.setItem('CASEBOOK_SUPABASE_KEY', key.trim());
    }
    window.supabaseClient = null;
    supabaseClient = null;
    ensureSupabaseClient();
    return true;
  } catch (e) {
    console.error('Failed to save Supabase config to localStorage:', e);
    return false;
  }
};

window.clearSupabaseConfig = function() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('CASEBOOK_SUPABASE_URL');
      localStorage.removeItem('CASEBOOK_SUPABASE_KEY');
      localStorage.removeItem('CASEBOOK_SUPABASE_ANON_KEY');
    }
    window.supabaseClient = null;
    supabaseClient = null;
    window.isSupabaseConfigured = false;
    isSupabaseConfigured = false;
    return true;
  } catch (e) {
    console.error('Failed to clear Supabase config:', e);
    return false;
  }
};

window.getStoredSupabaseConfig = getStoredSupabaseConfig;
window.ensureSupabaseClient = ensureSupabaseClient;
window.supabaseClient = supabaseClient;
window.isSupabaseConfigured = isSupabaseConfigured;
window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
