// ==============================================================================
// CMS Security & Cryptography Subsystem
// ==============================================================================

// Timing-safe string comparison to mitigate side-channel timing attacks
function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// FIPS 180-2 compliant pure JavaScript SHA-256 (synchronous & self-contained)
function sha256Sync(ascii) {
  function rightRotate(v, amount) { return (v >>> amount) | (v << (32 - amount)); }
  var bytes = [];
  for (var i = 0; i < ascii.length; i++) {
    var code = ascii.charCodeAt(i);
    if (code < 0x80) bytes.push(code);
    else if (code < 0x800) { bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f)); }
    else if (code < 0xd800 || code >= 0xe000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      i++;
      code = 0x10000 + (((code & 0x3ff) << 10) | (ascii.charCodeAt(i) & 0x3ff));
      bytes.push(0xf0 | (code >> 18), 0x80 | ((code >> 12) & 0x3f), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    }
  }
  var bitLength = bytes.length * 8;
  bytes.push(0x80);
  while ((bytes.length % 64) !== 56) bytes.push(0);
  bytes.push(0, 0, 0, 0);
  bytes.push((bitLength >>> 24) & 0xff, (bitLength >>> 16) & 0xff, (bitLength >>> 8) & 0xff, bitLength & 0xff);

  var words = [];
  for (var i = 0; i < bytes.length; i += 4) {
    words.push((bytes[i] << 24) | (bytes[i + 1] << 16) | (bytes[i + 2] << 8) | bytes[i + 3]);
  }

  var h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  var k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  for (var chunk = 0; chunk < words.length; chunk += 16) {
    var w = new Array(64);
    for (var i = 0; i < 16; i++) w[i] = words[chunk + i];
    for (var i = 16; i < 64; i++) {
      var s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      var s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }
    var a = h[0], b = h[1], c = h[2], d = h[3], e = h[4], f = h[5], g = h[6], hVal = h[7];
    for (var i = 0; i < 64; i++) {
      var S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      var ch = (e & f) ^ ((~e) & g);
      var temp1 = (hVal + S1 + ch + k[i] + w[i]) | 0;
      var S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      var maj = (a & b) ^ (a & c) ^ (b & c);
      var temp2 = (S0 + maj) | 0;

      hVal = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }
    h[0] = (h[0] + a) | 0;
    h[1] = (h[1] + b) | 0;
    h[2] = (h[2] + c) | 0;
    h[3] = (h[3] + d) | 0;
    h[4] = (h[4] + e) | 0;
    h[5] = (h[5] + f) | 0;
    h[6] = (h[6] + g) | 0;
    h[7] = (h[7] + hVal) | 0;
  }

  var res = '';
  for (var i = 0; i < 8; i++) {
    res += (h[i] >>> 0).toString(16).padStart(8, '0');
  }
  return res;
}

// Generate random cryptographic salt
function generateSecureSalt(byteLength = 16) {
  try {
    if (window.crypto && window.crypto.getRandomValues) {
      const arr = new Uint8Array(byteLength);
      window.crypto.getRandomValues(arr);
      return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {}
  let s = '';
  for (let i = 0; i < byteLength; i++) {
    s += Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  }
  return s;
}

// Hash password with salt using SHA-256
function hashPassword(password, salt) {
  return sha256Sync(String(password || '') + ':' + String(salt || ''));
}

// Robust HTML escape helper (available globally across entire application)
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
if (typeof escapeHtml !== 'undefined') window.escapeHtml = escapeHtml;

// Validate URLs to prevent javascript: / data: URI based XSS
function safeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed) || /^\/[^/\\]/i.test(trimmed)) {
    return escapeHtml(trimmed);
  }
  return '';
}
if (typeof safeUrl !== 'undefined') window.safeUrl = safeUrl;

// Precomputed Salted SHA-256 Hashes for Default Accounts (Zero plaintext credentials in code)
var DEFAULT_ADMIN_SALT = 'cms_salt_atul_2026';
var DEFAULT_ADMIN_HASH = 'b3b8334bf292bd8ccd8f2a69644cec239e71dec289508ac83c2e77ac03dc2c44';
var DEFAULT_DEMO_SALT = 'cms_salt_demo_2026';
var DEFAULT_DEMO_HASH = '2305ceca56a0e2f55f0e16db4b5deb4f9f4dcdab135b760347e746c659fa9dfd';

var currentSelectedCase = null;

var safeStorage = {
  get(key) {
    try {
      const sessionVal = window.sessionStorage ? window.sessionStorage.getItem(key) : null;
      if (sessionVal) return sessionVal;
      const localVal = window.localStorage ? window.localStorage.getItem(key) : null;
      if (localVal) {
        if (window.sessionStorage) {
          try { window.sessionStorage.setItem(key, localVal); } catch (e) {}
        }
        return localVal;
      }
      return window.__storageFallback?.[key] || null;
    } catch (e) {
      return window.__storageFallback?.[key] || null;
    }
  },
  set(key, value, persistent = true) {
    try {
      if (persistent && window.localStorage) {
        window.localStorage.setItem(key, value);
      } else if (!persistent && window.localStorage) {
        window.localStorage.removeItem(key);
      }
      if (window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
      }
    } catch (e) {
      window.__storageFallback = window.__storageFallback || {};
      window.__storageFallback[key] = String(value);
    }
  },
  remove(key) {
    try {
      if (window.localStorage) window.localStorage.removeItem(key);
      if (window.sessionStorage) window.sessionStorage.removeItem(key);
    } catch (e) {}
    if (window.__storageFallback) delete window.__storageFallback[key];
  }
};
if (typeof safeStorage !== 'undefined') window.safeStorage = safeStorage;

function getActiveAdminUsername() {
  return safeStorage.get('cmAdminUser') || 'AtulMishra';
}

function getActiveAdminSalt() {
  return safeStorage.get('cmAdminSalt') || DEFAULT_ADMIN_SALT;
}

function getActiveAdminPassHash() {
  // Legacy plaintext migration check: if unhashed cmAdminPass exists, migrate it immediately and purge plaintext
  const legacyPass = safeStorage.get('cmAdminPass');
  if (legacyPass) {
    const newSalt = generateSecureSalt(16);
    const newHash = hashPassword(legacyPass, newSalt);
    safeStorage.set('cmAdminSalt', newSalt, true);
    safeStorage.set('cmAdminPassHash', newHash, true);
    safeStorage.remove('cmAdminPass');
    return newHash;
  }
  return safeStorage.get('cmAdminPassHash') || DEFAULT_ADMIN_HASH;
}

function isValidAdminLogin(username, password) {
  const cleanUsername = String(username || '').trim().toLowerCase();
  const cleanPassword = String(password || '').trim();
  if (!cleanUsername || !cleanPassword) return false;

  const activeUser = getActiveAdminUsername().toLowerCase();
  const activeSalt = getActiveAdminSalt();
  const activeHash = getActiveAdminPassHash();

  const inputHash = hashPassword(cleanPassword, activeSalt);

  // Check custom active admin
  if (cleanUsername === activeUser && timingSafeEqual(inputHash, activeHash)) {
    return true;
  }

  // Check default master admin
  const defaultHash = hashPassword(cleanPassword, DEFAULT_ADMIN_SALT);
  if (cleanUsername === 'atulmishra' && timingSafeEqual(defaultHash, DEFAULT_ADMIN_HASH)) {
    return true;
  }

  // Check demo admin
  const demoHash = hashPassword(cleanPassword, DEFAULT_DEMO_SALT);
  if (cleanUsername === 'admin' && timingSafeEqual(demoHash, DEFAULT_DEMO_HASH)) {
    return true;
  }

  return false;
}

// Session Token Creation & Cryptographic Verification
function createAdminSession(username, isPersistent = true) {
  const nonce = generateSecureSalt(16);
  const issuedAt = Date.now();
  const ttl = isPersistent ? 7 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000;
  const expiresAt = issuedAt + ttl;
  const activeHash = getActiveAdminPassHash();
  const signature = sha256Sync(`admin:${username}:${issuedAt}:${expiresAt}:${nonce}:${activeHash}`);

  const sessionObj = {
    user: username,
    role: 'admin',
    issuedAt: issuedAt,
    expiresAt: expiresAt,
    nonce: nonce,
    sig: signature
  };

  const tokenStr = btoa(JSON.stringify(sessionObj));
  safeStorage.set('cmSessionToken', tokenStr, isPersistent);
  safeStorage.set('cmUser', 'admin', isPersistent);
  resetInactivityTimer();
  return tokenStr;
}

function validateAdminSession() {
  const tokenStr = safeStorage.get('cmSessionToken');
  const user = safeStorage.get('cmUser');
  if (!tokenStr || user !== 'admin') return false;

  try {
    const payload = JSON.parse(atob(tokenStr));
    if (payload.role !== 'admin') return false;
    if (Date.now() > payload.expiresAt) {
      console.warn('CMS: Admin session expired.');
      clearAdminSession();
      return false;
    }
    const activeHash = getActiveAdminPassHash();
    const expectedSig = sha256Sync(`admin:${payload.user}:${payload.issuedAt}:${payload.expiresAt}:${payload.nonce}:${activeHash}`);
    if (!timingSafeEqual(payload.sig, expectedSig)) {
      console.warn('CMS: Invalid session signature; possible tampering detected.');
      clearAdminSession();
      return false;
    }
    return true;
  } catch (e) {
    clearAdminSession();
    return false;
  }
}

function clearAdminSession() {
  safeStorage.remove('cmSessionToken');
  safeStorage.remove('cmUser');
}

// Rate Limiting & Brute Force Lockout
var RATE_LIMIT_MAX_ATTEMPTS = 5;
var RATE_LIMIT_LOCKOUT_MS = 60000; // 60s cooldown

function checkLoginRateLimit() {
  try {
    const raw = safeStorage.get('cmRateLimit');
    if (!raw) return { locked: false, remainingSeconds: 0 };
    const data = JSON.parse(raw);
    const now = Date.now();
    if (data.lockedUntil && now < data.lockedUntil) {
      const remainingSeconds = Math.ceil((data.lockedUntil - now) / 1000);
      return { locked: true, remainingSeconds };
    }
    return { locked: false, remainingSeconds: 0 };
  } catch (e) {
    return { locked: false, remainingSeconds: 0 };
  }
}

function recordFailedLoginAttempt() {
  try {
    const raw = safeStorage.get('cmRateLimit');
    const data = raw ? JSON.parse(raw) : { count: 0, lockedUntil: 0 };
    const now = Date.now();
    if (data.lockedUntil && now >= data.lockedUntil) {
      data.count = 0;
      data.lockedUntil = 0;
    }
    data.count = (data.count || 0) + 1;
    if (data.count >= RATE_LIMIT_MAX_ATTEMPTS) {
      data.lockedUntil = now + RATE_LIMIT_LOCKOUT_MS;
    }
    safeStorage.set('cmRateLimit', JSON.stringify(data), true);
    return data;
  } catch (e) {
    return { count: 1, lockedUntil: 0 };
  }
}

function resetLoginRateLimit() {
  safeStorage.remove('cmRateLimit');
}

// Inactivity Auto-Logout Tracker (30 minutes)
var INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;
var inactivityTimerId = null;
var lastActivityTime = Date.now();

function handleUserActivity() {
  const now = Date.now();
  if (now - lastActivityTime > 10000) {
    lastActivityTime = now;
    resetInactivityTimer();
  }
}

function resetInactivityTimer() {
  if (inactivityTimerId) clearTimeout(inactivityTimerId);
  const currentUser = safeStorage.get('cmUser');
  if (currentUser === 'admin') {
    inactivityTimerId = setTimeout(() => {
      onSessionInactivityTimeout();
    }, INACTIVITY_TIMEOUT_MS);
  }
}

function onSessionInactivityTimeout() {
  const currentUser = safeStorage.get('cmUser');
  if (currentUser === 'admin') {
    handleAdminLogout();
    const errorBox = document.getElementById('loginError');
    if (errorBox) {
      errorBox.textContent = '⏱️ Session timed out due to 30 minutes of inactivity for security. Please log in again.';
      errorBox.style.color = '#f59e0b';
    }
    if (typeof showToastNotification === 'function') {
      showToastNotification('Session timed out due to inactivity for security.', 'info');
    }
  }
}

function initActivityListeners() {
  ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
    window.addEventListener(evt, handleUserActivity, { passive: true });
  });
  resetInactivityTimer();
}

// ==============================================================================
// Supabase Configuration
function ensureSupabaseClient() {
  if (!supabaseClient && isSupabaseConfigured && window.supabase?.createClient) {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      window.supabaseClient = supabaseClient;
    } catch (e) {
      console.warn('Supabase client creation error:', e);
    }
  }
  return supabaseClient;
}
if (typeof ensureSupabaseClient !== 'undefined') window.ensureSupabaseClient = ensureSupabaseClient;

// Dataset arrays (hydrated live from Supabase or user entries)
var defaultFallbackCases = [];
var defaultCourts = [
  'Add. Civil Judge Junior Division-3rd /AJM-3rd Lakhimpur Kheri',
  'Add. Civil Judge Junior Division Court No. 4/AJM-4',
  'Add. Civil Judge Junior Division Court No. 5',
  'Add. Civil Judge Junior Division/FTC',
  'Add. Civil Judge SD/ ACJM-Ftc Kheri',
  'Add. Civil Judge Senior Division Court No.2',
  'Add. Civil Judge Senior Division Court No.3',
  'Add. Civil Judge Senior Division Court No. 5',
  'Add. Civil Judge Senior Division/ACJM',
  'Add. District Judge FTC/New',
  'Add. District Magistrate Judicial (ADM-J)',
  'Add. District Magistrate Revenue (ADM-Rev)',
  'Add. Family Court -Ist Lakhimpur Kheri',
  'Add. Sub Divisional Magistrate/ASDM Lakhimpur Kheri',
  'Civil Judge Junior Division Lakhimpur Kheri',
  'Civil Judge Senior Division Lakhimpur Kheri',
  'District & Session Judge Lakhimpur Kheri',
  'Family Court Lakhimpur',
  'Gram Nyayalaya Gola',
  'Gram Nyayalaya Gola Tehsil Gola',
  'S.O.C. Lakhimpur Kheri',
  'Sub Divisional Magistrate/SDM Lakhimpur Kheri',
  'Tehsildar Lakhimpur'
];
function getDeletedCourtsSet() {
  try {
    const list = JSON.parse(localStorage.getItem('cmDeletedCourts') || '[]');
    if (Array.isArray(list)) {
      return new Set(list.map(c => (c || '').trim().toLowerCase()).filter(Boolean));
    }
  } catch (e) {}
  return new Set();
}

function markCourtAsDeleted(courtName) {
  const trimmed = (courtName || '').trim();
  if (!trimmed) return;
  try {
    const list = JSON.parse(localStorage.getItem('cmDeletedCourts') || '[]');
    const lower = trimmed.toLowerCase();
    if (!list.some(c => (c || '').trim().toLowerCase() === lower)) {
      list.push(trimmed);
      localStorage.setItem('cmDeletedCourts', JSON.stringify(list));
    }
  } catch (e) {}
  defaultCourts = defaultCourts.filter(c => (c || '').trim().toLowerCase() !== trimmed.toLowerCase());
}

function unmarkCourtAsDeleted(courtName) {
  const trimmed = (courtName || '').trim();
  if (!trimmed) return;
  try {
    let list = JSON.parse(localStorage.getItem('cmDeletedCourts') || '[]');
    if (Array.isArray(list)) {
      list = list.filter(c => (c || '').trim().toLowerCase() !== trimmed.toLowerCase());
      localStorage.setItem('cmDeletedCourts', JSON.stringify(list));
    }
  } catch (e) {}
}

function saveCourtsToBackup() {
  try {
    courts.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    localStorage.setItem('cmCourts_backup', JSON.stringify(courts));
  } catch (e) {}
}

var courts = [...defaultCourts];
try {
  const cachedCourts = JSON.parse(localStorage.getItem('cmCourts_backup') || '[]');
  const deletedSet = getDeletedCourtsSet();
  if (Array.isArray(cachedCourts) && cachedCourts.length > 0) {
    courts = cachedCourts.filter(c => c && !deletedSet.has(c.trim().toLowerCase()));
  } else {
    courts = defaultCourts.filter(c => c && !deletedSet.has(c.trim().toLowerCase()));
  }
} catch (e) {}
var allCaseRecords = [];
var caseCardsFilteredList = [];
var caseCardsExpandedIndex = -1;
var guestCases = [];
var defaultFallbackHearings = [];
var allHearingRecords = [];
var allCaseTransfers = [];
if (typeof allCaseTransfers !== 'undefined') window.allCaseTransfers = allCaseTransfers;

function getSafeValue(value, fallback = '—') {
  if (value === null || value === undefined || value === '') return fallback;
  return value;
}

function formatDateDMY(dateInput) {
  if (!dateInput || dateInput === '—' || dateInput === 'null' || dateInput === 'undefined') {
    return '—';
  }

  const str = String(dateInput).trim();
  if (!str || str === '—') return '—';

  // If already in DD/MM/YYYY format (e.g. 15/09/2026 or 15-09-2026)
  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, '0');
    const month = dmyMatch[2].padStart(2, '0');
    const year = dmyMatch[3];
    return `${day}/${month}/${year}`;
  }

  // If in YYYY-MM-DD format (e.g. 2026-09-15)
  const ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (ymdMatch) {
    const year = ymdMatch[1];
    const month = ymdMatch[2].padStart(2, '0');
    const day = ymdMatch[3].padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  // Otherwise try Date constructor
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return str;
}

if (typeof formatDateDMY !== 'undefined') window.formatDateDMY = formatDateDMY;

function parseDateString(dateInput) {
  if (!dateInput || dateInput === '—' || dateInput === 'null' || dateInput === 'undefined') return null;
  const str = String(dateInput).trim();
  const ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (ymdMatch) {
    return new Date(parseInt(ymdMatch[1], 10), parseInt(ymdMatch[2], 10) - 1, parseInt(ymdMatch[3], 10));
  }
  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dmyMatch) {
    return new Date(parseInt(dmyMatch[3], 10), parseInt(dmyMatch[2], 10) - 1, parseInt(dmyMatch[1], 10));
  }
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

if (typeof parseDateString !== 'undefined') window.parseDateString = parseDateString;

// Normalizes any date-ish value (YYYY-MM-DD, ISO timestamp, DD/MM/YYYY) to a plain 'YYYY-MM-DD'
// string, or null if unparseable. Use for all date equality comparisons.
function toISODate(dateInput) {
  if (dateInput === null || dateInput === undefined) return null;
  const str = String(dateInput).trim();
  if (!str || str === '—' || str === 'null' || str === 'undefined') return null;
  const ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (ymdMatch) {
    return `${ymdMatch[1]}-${ymdMatch[2].padStart(2, '0')}-${ymdMatch[3].padStart(2, '0')}`;
  }
  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dmyMatch) {
    return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, '0')}-${dmyMatch[1].padStart(2, '0')}`;
  }
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  return null;
}

if (typeof toISODate !== 'undefined') window.toISODate = toISODate;

function formatDateHindi(dateInput) {
  if (!dateInput || dateInput === '—' || dateInput === 'null' || dateInput === 'undefined') {
    return 'तय नहीं';
  }

  const str = String(dateInput).trim();
  if (!str || str === '—') return 'तय नहीं';

  const hindiMonths = [
    'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'
  ];

  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const monthIdx = parseInt(dmyMatch[2], 10) - 1;
    const year = dmyMatch[3];
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${day} ${hindiMonths[monthIdx]} ${year}`;
    }
    return `${day}/${dmyMatch[2]}/${year}`;
  }

  const ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (ymdMatch) {
    const year = ymdMatch[1];
    const monthIdx = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${day} ${hindiMonths[monthIdx]} ${year}`;
    }
    return `${day}/${ymdMatch[2]}/${year}`;
  }

  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    const day = d.getDate();
    const monthIdx = d.getMonth();
    const year = d.getFullYear();
    return `${day} ${hindiMonths[monthIdx]} ${year}`;
  }

  return str;
}

if (typeof formatDateHindi !== 'undefined') window.formatDateHindi = formatDateHindi;

function extractCaseParties(raw, baseParties = []) {
  let list = [];
  if (raw && Array.isArray(raw.parties)) {
    list = list.concat(raw.parties);
  } else if (raw && typeof raw.parties === 'string' && raw.parties.trim()) {
    try {
      const parsed = JSON.parse(raw.parties);
      if (Array.isArray(parsed)) list = list.concat(parsed);
      else list.push(raw.parties.trim());
    } catch (e) {
      raw.parties.split(',').forEach(p => {
        if (p.trim()) list.push(p.trim());
      });
    }
  }

  if (Array.isArray(baseParties)) {
    list = list.concat(baseParties);
  }

  const cleanList = [];
  const seen = new Set();
  list.forEach(item => {
    if (!item) return;
    const s = String(item).trim();
    if (!s || s === '—' || s === 'null' || s === 'undefined' || s.toLowerCase() === 'none') return;
    const lower = s.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      cleanList.push(s);
    }
  });
  return cleanList;
}

// Normalizes raw data from Supabase tables or local state into consistent case structure
function normalizeCaseRecord(raw, defaultType = 'civil') {
  const rec = normalizeCaseRecordRaw(raw, defaultType);
  // Preserve the stored previous hearing (written by updateHearingInSupabase) so it
  // survives reloads instead of being re-derived from history every time.
  rec.previousHearing = raw.previous_hearing || raw.previousHearing || rec.previousHearing || '—';
  rec.previousProcess = raw.previous_process || raw.previousProcess || rec.previousProcess || '—';

  // Extract parties (from raw.parties or candidate party attributes)
  const candidateParties = [
    rec.clientName,
    rec.plaintiff,
    rec.defendant,
    rec.firstParty,
    rec.accusedName,
    rec.victimName,
    rec.petitioner,
    rec.respondent,
    rec.applicant,
    rec.oppositeParty,
    rec.complainant
  ];
  if (rec.caseName) {
    const parts = rec.caseName.split(/\s+(?:vs\.?|v\.?|versus|and|&)\s+/i);
    parts.forEach(p => {
      if (p.trim()) candidateParties.push(p.trim());
    });
  }
  rec.parties = extractCaseParties(raw, candidateParties);
  rec.title = rec.caseName || rec.caseNo || '';
  rec.case_number = rec.caseNo;
  rec.court_name = rec.courtName;
  rec.next_hearing_date = rec.nextHearing;
  rec.nextHearingDate = rec.nextHearing;

  return rec;
}

function normalizeCaseRecordRaw(raw, defaultType = 'civil') {
  const caseType = String(raw.case_type || raw.caseType || defaultType).toLowerCase();
  const rawCaseNo = raw.case_number || raw.caseNo || raw.criminalCaseNumber || raw.case_no || '';
  const caseNo = String(rawCaseNo).trim().toUpperCase();
  const caseYear = String(raw.case_year || raw.crime_year || raw.caseYear || raw.year || '2026');
  const filingDate = raw.filing_date || raw.crime_filing_date || raw.filingDate || '';
  const nextHearing = raw.next_hearing || raw.nextHearing || '—';
  const courtName = raw.court_name || raw.criminal_court_name || raw.courtName || 'District Court';
  const clientName = raw.client_name || raw.criminal_client_name || raw.clientName || '—';
  const clientNumber = raw.client_number || raw.criminal_client_number || raw.clientNumber || '';
  const hearingProcess = raw.hearing_process || raw.process || raw.hearingProcess || '';
  const caseStatus = raw.case_status || raw.status || raw.caseStatus || 'Pending';
  const remark = raw.remark || raw.remarks || raw.case_remark || '';
  const disposalComment = raw.disposal_comment || raw.disposalComment || raw.disposal_remark || raw.disposalRemark || raw.disposal_notes || '';
  const docLink = raw.doc_link || raw.document_link || raw.docLink || raw.doc_url || raw.documentUrl || '';

  // 1. State Cases & Criminal Cases
  if (caseType === 'state' || caseType === 'criminal') {
    const firstParty = raw.first_party || raw.victim_name || raw.victimName || 'State of U.P.';
    const accusedName = raw.accused_name || raw.accusedName || raw.party_name || 'Accused';
    const policeStation = raw.police_station || raw.policeStation || 'Police Station';
    const crimeSection = raw.crime_section || raw.crimeSection || 'IPC';
    const crimeNumber = String(raw.crime_number || raw.crimeNumber || caseNo).trim().toUpperCase();
    const caseName = raw.case_name || `${firstParty} vs ${accusedName}`;

    return {
      id: raw.id,
      caseType: 'state',
      caseNo,
      caseYear,
      criminalCaseNumber: caseNo,
      crimeYear: caseYear,
      filingDate,
      crimeFilingDate: filingDate,
      courtName,
      criminalCourtName: courtName,
      clientName,
      criminalClientName: clientName,
      clientNumber,
      criminalClientNumber: clientNumber,
      nextHearing,
      hearingProcess,
      caseStatus,
      remark,
      disposalComment,
      disposal_comment: disposalComment,
      docLink,
      policeStation,
      crimeSection,
      crimeNumber,
      firstParty,
      victimName: firstParty,
      accusedName,
      caseName,
      partyName: accusedName
    };
  }

  // 2. Family Cases (Matrimonial / Maintenance 125)
  if (caseType === 'family') {
    const petitioner = raw.petitioner || raw.applicant || raw.plaintiff || 'Petitioner';
    const respondent = raw.respondent || raw.opposite_party || raw.defendant || 'Respondent';
    const matterType = raw.matter_type || raw.matterType || 'Maintenance (Sec 125 CrPC)';
    const marriageDate = raw.marriage_date || raw.marriageDate || '';
    const maintenanceDetail = raw.maintenance_detail || raw.maintenanceDetail || '';
    const caseName = raw.case_name || `${petitioner} vs ${respondent}`;

    return {
      id: raw.id,
      caseType: 'family',
      caseNo,
      caseYear,
      filingDate,
      courtName,
      clientName,
      clientNumber,
      nextHearing,
      hearingProcess,
      caseStatus,
      remark,
      disposalComment,
      disposal_comment: disposalComment,
      docLink,
      petitioner,
      respondent,
      matterType,
      marriageDate,
      maintenanceDetail,
      caseName,
      partyName: respondent
    };
  }

  // 3. Revenue Cases (Land / Tehsil / UP Revenue Code)
  if (caseType === 'revenue') {
    const applicant = raw.applicant || raw.plaintiff || 'Applicant';
    const oppositeParty = raw.opposite_party || raw.defendant || 'Gaon Sabha';
    const revenueActSection = raw.revenue_act_section || raw.revenueActSection || 'Sec 34 (Mutation)';
    const villageMauja = raw.village_mauja || raw.villageMauja || '';
    const parganaTehsil = raw.pargana_tehsil || raw.parganaTehsil || '';
    const gataKhataNo = raw.gata_khata_no || raw.gataKhataNo || '';
    const caseName = raw.case_name || `${applicant} vs ${oppositeParty}`;

    return {
      id: raw.id,
      caseType: 'revenue',
      caseNo,
      caseYear,
      filingDate,
      courtName,
      clientName,
      clientNumber,
      nextHearing,
      hearingProcess,
      caseStatus,
      remark,
      disposalComment,
      disposal_comment: disposalComment,
      docLink,
      applicant,
      oppositeParty,
      revenueActSection,
      villageMauja,
      parganaTehsil,
      gataKhataNo,
      caseName,
      partyName: oppositeParty
    };
  }

  // 4. Misc Civil Cases (Appeals, Revisions, Injunctions, Restorations)
  if (caseType === 'misc_civil') {
    const applicant = raw.applicant || raw.appellant || raw.plaintiff || 'Applicant';
    const oppositeParty = raw.opposite_party || raw.respondent || raw.defendant || 'Opposite Party';
    const originalCaseNumber = String(raw.original_case_number || raw.originalCase || '').trim().toUpperCase();
    const proceedingType = raw.proceeding_type || raw.proceedingType || 'Misc Application';
    const caseName = raw.case_name || `${applicant} vs ${oppositeParty}`;

    return {
      id: raw.id,
      caseType: 'misc_civil',
      caseNo,
      caseYear,
      filingDate,
      courtName,
      clientName,
      clientNumber,
      nextHearing,
      hearingProcess,
      caseStatus,
      remark,
      disposalComment,
      disposal_comment: disposalComment,
      docLink,
      applicant,
      oppositeParty,
      originalCaseNumber,
      originalCase: originalCaseNumber,
      proceedingType,
      caseName,
      partyName: oppositeParty
    };
  }

  // 5. Misc Criminal Cases (Bails, Criminal Appeals, Revisions, Sec 156(3))
  if (caseType === 'misc_criminal') {
    const applicant = raw.applicant || raw.accused_name || raw.appellant || 'Applicant';
    const oppositeParty = raw.opposite_party || raw.first_party || 'State of U.P.';
    const originalCaseNumber = String(raw.original_case_number || raw.crime_number || '').trim().toUpperCase();
    const proceedingType = raw.proceeding_type || raw.proceedingType || 'Bail Application (Sec 439 CrPC)';
    const policeStation = raw.police_station || raw.policeStation || '';
    const crimeSection = raw.crime_section || raw.crimeSection || '';
    const caseName = raw.case_name || `${applicant} vs ${oppositeParty}`;

    return {
      id: raw.id,
      caseType: 'misc_criminal',
      caseNo,
      caseYear,
      filingDate,
      courtName,
      clientName,
      clientNumber,
      nextHearing,
      hearingProcess,
      caseStatus,
      remark,
      disposalComment,
      disposal_comment: disposalComment,
      docLink,
      applicant,
      oppositeParty,
      originalCaseNumber,
      originalCase: originalCaseNumber,
      proceedingType,
      policeStation,
      crimeSection,
      caseName,
      partyName: applicant
    };
  }

  // 6. Complaint Cases (Cheque Bounce Sec 138 NI Act, Sec 200 CrPC, Defamation)
  if (caseType === 'complaint') {
    const complainant = raw.complainant || raw.plaintiff || raw.applicant || 'Complainant';
    const accusedName = raw.accused_name || raw.accused || raw.defendant || raw.opposite_party || 'Accused';
    const complaintType = raw.complaint_type || raw.complaintType || 'Cheque Bounce (Sec 138 NI Act)';
    const sectionAct = raw.section_act || raw.sectionAct || '';
    const policeStation = raw.police_station || raw.policeStation || '';
    const caseName = raw.case_name || `${complainant} vs ${accusedName}`;

    return {
      id: raw.id,
      caseType: 'complaint',
      caseNo,
      caseYear,
      filingDate,
      courtName,
      clientName,
      clientNumber,
      nextHearing,
      hearingProcess,
      caseStatus,
      remark,
      disposalComment,
      disposal_comment: disposalComment,
      docLink,
      complainant,
      accusedName,
      defendant: accusedName,
      plaintiff: complainant,
      complaintType,
      sectionAct,
      policeStation,
      caseName,
      partyName: accusedName
    };
  }

  // 7. Default: Civil Cases
  const plaintiff = raw.plaintiff || raw.party_name || 'Plaintiff';
  const defendant = raw.defendant || 'Defendant';
  const caseName = raw.case_name || `${plaintiff} vs ${defendant}`;

  return {
    id: raw.id,
    caseType: 'civil',
    caseNo,
    caseYear,
    filingDate,
    courtName,
    clientName,
    clientNumber,
    nextHearing,
    hearingProcess,
    caseStatus,
    remark,
    disposalComment,
    disposal_comment: disposalComment,
    docLink,
    plaintiff,
    defendant,
    caseName,
    partyName: defendant || plaintiff
  };
}

// ==============================================================================
// Supabase Live Data Fetching & Sync (Cases, Hearings, and Courts)
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
        if (res && res.error && fallbackPromise) {
          return await fallbackPromise;
        }
        return res || { data: null, error: null };
      } catch (err) {
        if (fallbackPromise) {
          try { return await fallbackPromise; } catch (e) { /* ignore */ }
        }
        console.warn('Supabase query error:', err);
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
            // Case row's next_hearing is today or in the past — a newer future hearing
            // record means the case was forwarded, so the record should take over
            const isStale = !!currentISO && currentISO <= todayISO;

            if (isMissing || (isStale && hDate >= todayISO)) {
              if (currentISO && currentISO !== hDate) {
                matchingCase.previousHearing = currentISO;
                matchingCase.previousProcess = matchingCase.hearingProcess || '—';
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
            caseName: t.case_name || '—',
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
        if (cName && cName !== '—' && !deletedSet.has(cName.toLowerCase()) && !courts.some(c => c.trim().toLowerCase() === cName.toLowerCase())) {
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

    updateSupabaseStatusIndicator(true);
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
      alert(`❌ Duplicate Entry Blocked!\n\nCase Number "${cleanCaseNo}" is already registered in the database (${dupCheck.source === 'database' ? 'Table: ' + dupCheck.table : 'Case Register'}).\n\nRepeated entry is blocked to preserve database integrity.`);
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
            alert(`❌ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`⚠️ Failed to add case to database: ${error.message || 'Unknown error'}`);
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
            alert(`❌ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`⚠️ Failed to add case to database: ${error.message || 'Unknown error'}`);
          }
          dbInsertFailed = true;
        }
      } else if (newCase.caseType === 'revenue') {
        const payload = {
          case_number: newCase.caseNo,
          case_year: parseInt(newCase.caseYear, 10) || 2026,
          case_type: 'revenue',
          case_name: newCase.caseName,
          revenue_act_section: newCase.revenueActSection || newCase.actSection || 'Sec 34 (Mutation / दाखिल खारिज)',
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
            alert(`❌ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`⚠️ Failed to add case to database: ${error.message || 'Unknown error'}`);
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
            alert(`❌ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`⚠️ Failed to add case to database: ${error.message || 'Unknown error'}`);
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
            alert(`❌ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`⚠️ Failed to add case to database: ${error.message || 'Unknown error'}`);
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
            alert(`❌ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`⚠️ Failed to add case to database: ${error.message || 'Unknown error'}`);
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
            alert(`❌ Case Number "${newCase.caseNo}" already exists in the database! Cannot add duplicate.`);
          } else {
            alert(`⚠️ Failed to add case to database: ${error.message || 'Unknown error'}`);
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
        if (targetCase.nextHearing && targetCase.nextHearing !== '—') {
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
        if (targetCase.nextHearing && targetCase.nextHearing !== '—') {
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
          revenue_act_section: targetCase.revenueActSection || targetCase.actSection || 'Sec 34 (Mutation / दाखिल खारिज)',
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
        if (targetCase.nextHearing && targetCase.nextHearing !== '—') {
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
        if (targetCase.nextHearing && targetCase.nextHearing !== '—') {
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
        if (targetCase.nextHearing && targetCase.nextHearing !== '—') {
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
        if (targetCase.nextHearing && targetCase.nextHearing !== '—') {
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
        if (targetCase.nextHearing && targetCase.nextHearing !== '—') {
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
      if (targetCase.nextHearing && targetCase.nextHearing !== '—') {
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
// rejected — e.g. a table without those columns — retry with the minimal
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
        alert('⚠️ Failed to save hearing to database: ' + (dbError.message || 'Unknown error') + '. Changes saved locally only.');
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

        if (matchedCase && matchedCase.nextHearing && matchedCase.nextHearing !== '—' && toISODate(matchedCase.nextHearing) !== toISODate(hearingDate)) {
          updatePayload.previous_hearing = matchedCase.nextHearing;
          updatePayload.previous_process = matchedCase.hearingProcess || '—';
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
          )) break; // matched — stop trying variants
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
          alert('⚠️ Hearing saved, but the case record was NOT updated in the database: ' + detail +
                '\n\nThe next hearing date may show incorrectly after reload. Please check the case number and try again.');
        } else if (anyError) {
          console.warn('Hearing case-table update: case row updated, but some unrelated tables rejected the update (see console).');
        }
      }
    } catch (e) {
      console.error('Supabase hearing update error:', e);
      alert('⚠️ Hearing update encountered an error. Changes saved locally only.');
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
    if (matchedCase.nextHearing && matchedCase.nextHearing !== '—' && toISODate(matchedCase.nextHearing) !== newDateISO) {
      matchedCase.previousHearing = matchedCase.nextHearing;
      matchedCase.previousProcess = matchedCase.hearingProcess || '—';
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

  // 3. Remove from in-memory courts & defaultCourts
  courts = courts.filter(c => c.trim().toLowerCase() !== trimmed.toLowerCase());
  defaultCourts = defaultCourts.filter(c => c.trim().toLowerCase() !== trimmed.toLowerCase());

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

function setActiveScreen(screenId) {
  const screens = ['loginScreen', 'guestScreen', 'adminScreen'];
  screens.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.toggle('hidden', id !== screenId);
    }
  });

  if (screenId === 'adminScreen') {
    document.documentElement.classList.add('auth-admin');
    document.documentElement.classList.remove('auth-guest');
    restoreActiveAdminTab();
  } else if (screenId === 'guestScreen') {
    document.documentElement.classList.add('auth-guest');
    document.documentElement.classList.remove('auth-admin');
    renderGuestTable('');
  } else {
    document.documentElement.classList.remove('auth-admin', 'auth-guest');
  }
}

function restoreActiveAdminTab() {
  let targetTab = 'home';
  const hash = (window.location.hash || '').replace(/^#/, '').trim();
  const storedTab = safeStorage.get('cmActiveTab') || (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('cmActiveTab') : null);

  if (hash && document.getElementById(hash)) {
    targetTab = hash;
  } else if (storedTab && document.getElementById(storedTab)) {
    targetTab = storedTab;
  }

  showTab(targetTab, null, 'restore');
}
if (typeof restoreActiveAdminTab !== 'undefined') window.restoreActiveAdminTab = restoreActiveAdminTab;

function checkInitialAuth() {
  const currentUser = safeStorage.get('cmUser');

  // Restore rememberMe checkbox state from localStorage
  const rememberEl = document.getElementById('rememberMe');
  if (rememberEl && window.localStorage) {
    const savedRemember = window.localStorage.getItem('cmRememberMe');
    if (savedRemember !== null) {
      rememberEl.checked = savedRemember === 'true';
    }
  }

  if (currentUser === 'admin') {
    // Cryptographically verify session integrity
    if (validateAdminSession()) {
      setActiveScreen('adminScreen');
      resetInactivityTimer();
      return 'admin';
    } else {
      console.warn('CMS: Admin session invalidated or expired.');
      clearAdminSession();
      setActiveScreen('loginScreen');
      return null;
    }
  } else if (currentUser === 'guest') {
    setActiveScreen('guestScreen');
    return 'guest';
  } else {
    setActiveScreen('loginScreen');
    return null;
  }
}
if (typeof checkInitialAuth !== 'undefined') window.checkInitialAuth = checkInitialAuth;

function handleAdminLogin(event) {
  if (event) {
    if (typeof event.preventDefault === 'function') event.preventDefault();
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }

  const form = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const username = usernameInput ? usernameInput.value : '';
  const password = passwordInput ? passwordInput.value : '';
  const errorBox = document.getElementById('loginError');

  // 1. Check Rate Limiter / Brute-Force Lockout
  const rateLimit = checkLoginRateLimit();
  if (rateLimit.locked) {
    if (errorBox) {
      errorBox.textContent = `🔒 Access temporarily locked due to multiple failed attempts. Try again in ${rateLimit.remainingSeconds}s.`;
      errorBox.style.color = '#ef4444';
    }
    return false;
  }

  if (!username || !password) {
    if (errorBox) {
      errorBox.textContent = 'Please enter both username and password.';
      errorBox.style.color = '#ef4444';
    }
    return false;
  }

  try {
    if (isValidAdminLogin(username, password)) {
      resetLoginRateLimit();
      const rememberEl = document.getElementById('rememberMe');
      const isPersistent = rememberEl ? rememberEl.checked : true;

      // Issue signed cryptographic session token
      createAdminSession(username, isPersistent);

      if (window.localStorage) {
        try { window.localStorage.setItem('cmRememberMe', isPersistent ? 'true' : 'false'); } catch (e) {}
      }
      setActiveScreen('adminScreen');
      if (errorBox) errorBox.textContent = '';
      if (form) form.reset();
      fetchAllDataFromSupabase();
      return false;
    }

    // Record failed attempt and compute remaining attempts
    const failure = recordFailedLoginAttempt();
    if (errorBox) {
      errorBox.style.color = '#ef4444';
      if (failure.lockedUntil && Date.now() < failure.lockedUntil) {
        errorBox.textContent = '🔒 Too many failed login attempts. Locked for 60 seconds for security.';
      } else {
        const remaining = Math.max(0, RATE_LIMIT_MAX_ATTEMPTS - (failure.count || 0));
        errorBox.textContent = `Invalid username or password. (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`;
      }
    }
  } catch (err) {
    console.error('Login error:', err);
    if (errorBox) errorBox.textContent = 'Authentication error. Please try again.';
  }

  return false;
}

if (typeof handleAdminLogin !== 'undefined') window.handleAdminLogin = handleAdminLogin;
if (typeof isValidAdminLogin !== 'undefined') window.isValidAdminLogin = isValidAdminLogin;

function handleAdminLogout(event) {
  if (event && typeof event.preventDefault === 'function') event.preventDefault();
  clearAdminSession();
  if (inactivityTimerId) {
    clearTimeout(inactivityTimerId);
    inactivityTimerId = null;
  }
  try {
    sessionStorage.removeItem('cmActiveTab');
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  } catch (e) {}
  setActiveScreen('loginScreen');
  const form = document.getElementById('loginForm');
  if (form) form.reset();
  const errorBox = document.getElementById('loginError');
  if (errorBox) errorBox.textContent = '';

  const rememberEl = document.getElementById('rememberMe');
  if (rememberEl && window.localStorage) {
    const savedRemember = window.localStorage.getItem('cmRememberMe');
    if (savedRemember !== null) {
      rememberEl.checked = savedRemember === 'true';
    }
  }
}
if (typeof handleAdminLogout !== 'undefined') window.handleAdminLogout = handleAdminLogout;

function handleGuestLogin(event) {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }
  safeStorage.set('cmUser', 'guest', false);
  setActiveScreen('guestScreen');
  fetchAllDataFromSupabase();
  const form = document.getElementById('loginForm');
  if (form) form.reset();
  const errorBox = document.getElementById('loginError');
  if (errorBox) errorBox.textContent = '';
}
if (typeof handleGuestLogin !== 'undefined') window.handleGuestLogin = handleGuestLogin;

function handleLogout(event) {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }
  clearAdminSession();
  if (inactivityTimerId) {
    clearTimeout(inactivityTimerId);
    inactivityTimerId = null;
  }
  try {
    sessionStorage.removeItem('cmActiveTab');
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  } catch (e) {}
  setActiveScreen('loginScreen');
  const form = document.getElementById('loginForm');
  if (form) form.reset();
  const errorBox = document.getElementById('loginError');
  if (errorBox) errorBox.textContent = '';

  const rememberEl = document.getElementById('rememberMe');
  if (rememberEl && window.localStorage) {
    const savedRemember = window.localStorage.getItem('cmRememberMe');
    if (savedRemember !== null) {
      rememberEl.checked = savedRemember === 'true';
    }
  }
}
if (typeof handleLogout !== 'undefined') window.handleLogout = handleLogout;

var tabNavigationHistory = [];
var tabForwardHistory = [];
var currentActiveTabId = 'home';
var tabLoadPromises = new Map();

async function loadTabContent(tabEl) {
  if (!tabEl || !tabEl.dataset.tabSrc || tabEl.dataset.loaded === 'true') {
    return true;
  }
  const tabId = tabEl.id;
  const src = tabEl.dataset.tabSrc;

  // 1. If companion tab module is already in memory
  if (window.__casebook_tabs && window.__casebook_tabs[tabId]) {
    tabEl.innerHTML = window.__casebook_tabs[tabId];
    tabEl.dataset.loaded = 'true';
    return true;
  }

  if (tabLoadPromises.has(src)) {
    return tabLoadPromises.get(src);
  }

  const promise = (async () => {
    // 2. Try native fetch if running under HTTP/HTTPS (GitHub Pages or dev server)
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      try {
        const res = await fetch(src);
        if (res.ok) {
          tabEl.innerHTML = await res.text();
          tabEl.dataset.loaded = 'true';
          return true;
        }
      } catch (err) {
        console.warn(`Fetch failed for ${src}, falling back to script loader:`, err);
      }
    }

    // 3. Fallback for local offline double-click (file:/// protocol where fetch is blocked by browser CORS)
    try {
      const scriptSrc = src.replace(/\.html$/, '.js');
      await new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
        if (existingScript) return resolve();
        const s = document.createElement('script');
        s.src = scriptSrc;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
      if (window.__casebook_tabs && window.__casebook_tabs[tabId]) {
        tabEl.innerHTML = window.__casebook_tabs[tabId];
        tabEl.dataset.loaded = 'true';
        return true;
      }
    } catch (err) {
      console.error(`Failed to load tab ${tabId} via script fallback:`, err);
    }

    tabEl.innerHTML = `<div class="card" style="padding: 24px; text-align: center; color: #ef4444;"><i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem;"></i><p style="margin-top: 10px;">Failed to load tab content.</p><button type="button" class="primary-btn" onclick="showTab('${tabEl.id}')" style="margin-top: 12px; padding: 6px 16px;">Retry</button></div>`;
    return false;
  })();

  tabLoadPromises.set(src, promise);
  try {
    return await promise;
  } finally {
    tabLoadPromises.delete(src);
  }
}

async function loadCaseModals() {
  const container = document.getElementById('caseModalsContainer');
  if (!container || container.dataset.loaded === 'true') return true;

  // 1. In-memory check
  if (window.__casebook_modals && window.__casebook_modals['case-modals']) {
    container.innerHTML = window.__casebook_modals['case-modals'];
    container.dataset.loaded = 'true';
    return true;
  }

  // 2. Fetch if under http/https
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    try {
      const res = await fetch('components/modals/case-modals.html');
      if (res.ok) {
        container.innerHTML = await res.text();
        container.dataset.loaded = 'true';
        return true;
      }
    } catch (e) {
      console.warn('Fetch failed for case-modals.html, falling back to script loader:', e);
    }
  }

  // 3. Script loader fallback
  try {
    await new Promise((resolve) => {
      const existingScript = document.querySelector('script[src="components/modals/case-modals.js"]');
      if (existingScript) return resolve();
      const s = document.createElement('script');
      s.src = 'components/modals/case-modals.js';
      s.onload = resolve;
      s.onerror = resolve;
      document.head.appendChild(s);
    });
    if (window.__casebook_modals && window.__casebook_modals['case-modals']) {
      container.innerHTML = window.__casebook_modals['case-modals'];
      container.dataset.loaded = 'true';
      return true;
    }
  } catch (e) {}
  return false;
}
window.loadCaseModals = loadCaseModals;

async function loadPrintTemplates() {
  const container = document.getElementById('printTemplatesContainer');
  if (!container || container.dataset.loaded === 'true') return true;

  // 1. In-memory check
  if (window.__casebook_templates && window.__casebook_templates['print-templates']) {
    container.innerHTML = window.__casebook_templates['print-templates'];
    container.dataset.loaded = 'true';
    return true;
  }

  // 2. Fetch if under http/https
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    try {
      const res = await fetch('components/print/print-templates.html');
      if (res.ok) {
        container.innerHTML = await res.text();
        container.dataset.loaded = 'true';
        return true;
      }
    } catch (e) {
      console.warn('Fetch failed for print-templates.html, falling back to script loader:', e);
    }
  }

  // 3. Script loader fallback
  try {
    await new Promise((resolve) => {
      const existingScript = document.querySelector('script[src="components/print/print-templates.js"]');
      if (existingScript) return resolve();
      const s = document.createElement('script');
      s.src = 'components/print/print-templates.js';
      s.onload = resolve;
      s.onerror = resolve;
      document.head.appendChild(s);
    });
    if (window.__casebook_templates && window.__casebook_templates['print-templates']) {
      container.innerHTML = window.__casebook_templates['print-templates'];
      container.dataset.loaded = 'true';
      return true;
    }
  } catch (e) {}
  return false;
}
window.loadPrintTemplates = loadPrintTemplates;

function initAddTab() {
  renderCaseTypeOptions();
  renderCourtOptions();
  renderCriminalCourtOptions();
  toggleCaseFormByType();

  const addForm = document.querySelector('#add form');
  if (addForm && !addForm.dataset.bound) {
    addForm.dataset.bound = 'true';
    addForm.addEventListener('submit', handleAddCaseSubmit);
  }

  const caseTypeDropdown = document.getElementById('caseTypeDropdown');
  if (caseTypeDropdown && !caseTypeDropdown.dataset.bound) {
    caseTypeDropdown.dataset.bound = 'true';
    caseTypeDropdown.addEventListener('change', toggleCaseFormByType);
  }

  const addCourtBtn = document.getElementById('addCourtBtn');
  if (addCourtBtn && !addCourtBtn.dataset.bound) {
    addCourtBtn.dataset.bound = 'true';
    addCourtBtn.addEventListener('click', () => {
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }

  const addCriminalCourtBtn = document.getElementById('addCriminalCourtBtn');
  if (addCriminalCourtBtn && !addCriminalCourtBtn.dataset.bound) {
    addCriminalCourtBtn.dataset.bound = 'true';
    addCriminalCourtBtn.addEventListener('click', () => {
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }
}
if (typeof initAddTab !== 'undefined') window.initAddTab = initAddTab;

function initUpdateTab() {
  renderCaseTypeOptions();
  renderCourtOptions();
  renderCriminalCourtOptions();
  toggleUpdateCaseFormByType();

  const updateSearchBtn = document.getElementById('updateSearchBtn');
  const updateSearchInput = document.getElementById('updateSearchInput');

  if (updateSearchBtn && !updateSearchBtn.dataset.bound) {
    updateSearchBtn.dataset.bound = 'true';
    updateSearchBtn.addEventListener('click', () => {
      if (typeof loadCaseForUpdate === 'function') {
        loadCaseForUpdate(updateSearchInput?.value);
      }
    });
  }

  if (updateSearchInput && !updateSearchInput.dataset.bound) {
    updateSearchInput.dataset.bound = 'true';
    updateSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (typeof loadCaseForUpdate === 'function') {
          loadCaseForUpdate(updateSearchInput.value);
        }
      }
    });
  }

  const updateCaseForm = document.getElementById('updateCaseForm');
  if (updateCaseForm && !updateCaseForm.dataset.bound) {
    updateCaseForm.dataset.bound = 'true';
    if (typeof handleUpdateCaseSubmit === 'function') {
      updateCaseForm.addEventListener('submit', handleUpdateCaseSubmit);
    }
  }

  const updateCaseTypeDropdown = document.getElementById('updateCaseTypeDropdown');
  if (updateCaseTypeDropdown && !updateCaseTypeDropdown.dataset.bound) {
    updateCaseTypeDropdown.dataset.bound = 'true';
    updateCaseTypeDropdown.addEventListener('change', toggleUpdateCaseFormByType);
  }

  const updateAddCourtBtn = document.getElementById('updateAddCourtBtn');
  if (updateAddCourtBtn && !updateAddCourtBtn.dataset.bound) {
    updateAddCourtBtn.dataset.bound = 'true';
    updateAddCourtBtn.addEventListener('click', () => {
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }

  const updateAddCriminalCourtBtn = document.getElementById('updateAddCriminalCourtBtn');
  if (updateAddCriminalCourtBtn && !updateAddCriminalCourtBtn.dataset.bound) {
    updateAddCriminalCourtBtn.dataset.bound = 'true';
    updateAddCriminalCourtBtn.addEventListener('click', () => {
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }
}
if (typeof initUpdateTab !== 'undefined') window.initUpdateTab = initUpdateTab;

function initHearingTab() {
  populateHearingCaseDropdown();
  renderHearingStagePills('');
  if (typeof updateHearingLivePreview === 'function') {
    updateHearingLivePreview();
  }

  const hearingCaseSelect = document.getElementById('hearingCaseSelect');
  const hearingCaseNo = document.getElementById('hearingCaseNo');

  if (hearingCaseSelect && !hearingCaseSelect.dataset.bound) {
    hearingCaseSelect.dataset.bound = 'true';
    hearingCaseSelect.addEventListener('change', () => {
      const selectedVal = hearingCaseSelect.value;
      if (hearingCaseNo) {
        hearingCaseNo.value = selectedVal;
      }
      if (typeof renderHearingCaseInfo === 'function') {
        renderHearingCaseInfo(selectedVal);
      }
      if (selectedVal && Array.isArray(allCaseRecords)) {
        const found = allCaseRecords.find(c => {
          const num1 = (c.caseNo || '').toLowerCase();
          const num2 = (c.criminalCaseNumber || '').toLowerCase();
          return num1 === selectedVal.toLowerCase() || num2 === selectedVal.toLowerCase();
        });
        if (found) {
          const hearingProcessInput = document.getElementById('hearingProcess');
          if (hearingProcessInput && found.hearingProcess && !hearingProcessInput.value) {
            hearingProcessInput.value = found.hearingProcess;
          }
          if (typeof renderHearingStagePills === 'function') {
            renderHearingStagePills(found.caseType || found.case_type || '');
          }
          const dateInput = document.getElementById('hearingDate');
          if (dateInput) dateInput.focus();
        }
      }
    });
  }

  if (hearingCaseNo && !hearingCaseNo.dataset.bound) {
    hearingCaseNo.dataset.bound = 'true';
    hearingCaseNo.addEventListener('input', () => {
      const typed = hearingCaseNo.value.trim();
      if (typeof renderHearingCaseInfo === 'function') {
        renderHearingCaseInfo(typed);
      }
      if (hearingCaseSelect) {
        const match = Array.from(hearingCaseSelect.options).find(opt => opt.value.toLowerCase() === typed.toLowerCase());
        if (match) {
          hearingCaseSelect.value = match.value;
        } else {
          hearingCaseSelect.value = '';
        }
      }
      if (Array.isArray(allCaseRecords)) {
        const typedFound = allCaseRecords.find(c => {
          const num1 = (c.caseNo || '').toLowerCase();
          const num2 = (c.criminalCaseNumber || '').toLowerCase();
          return num1 === typed.toLowerCase() || num2 === typed.toLowerCase();
        });
        if (typedFound && typeof renderHearingStagePills === 'function') {
          renderHearingStagePills(typedFound.caseType || typedFound.case_type || '');
        }
      }
    });
  }

  const hearingDateInput = document.getElementById('hearingDate');
  const hearingProcessInput = document.getElementById('hearingProcess');
  if (hearingDateInput && !hearingDateInput.dataset.bound) {
    hearingDateInput.dataset.bound = 'true';
    if (typeof updateHearingLivePreview === 'function') {
      hearingDateInput.addEventListener('input', updateHearingLivePreview);
      hearingDateInput.addEventListener('change', updateHearingLivePreview);
    }
  }
  if (hearingProcessInput && !hearingProcessInput.dataset.bound) {
    hearingProcessInput.dataset.bound = 'true';
    if (typeof updateHearingLivePreview === 'function') {
      hearingProcessInput.addEventListener('input', updateHearingLivePreview);
      hearingProcessInput.addEventListener('change', updateHearingLivePreview);
    }
  }

  const updateHearingForm = document.getElementById('updateHearingForm');
  if (updateHearingForm && !updateHearingForm.dataset.bound) {
    updateHearingForm.dataset.bound = 'true';
    if (typeof handleUpdateHearingSubmit === 'function') {
      updateHearingForm.addEventListener('submit', handleUpdateHearingSubmit);
    }
  }

  const sendWhatsAppHearingBtn = document.getElementById('sendWhatsAppHearingBtn');
  if (sendWhatsAppHearingBtn && !sendWhatsAppHearingBtn.dataset.bound) {
    sendWhatsAppHearingBtn.dataset.bound = 'true';
    sendWhatsAppHearingBtn.addEventListener('click', () => {
      if (typeof sendWhatsAppHearingNotice === 'function') {
        sendWhatsAppHearingNotice(lastUpdatedHearingCase);
      }
    });
  }
}
if (typeof initHearingTab !== 'undefined') window.initHearingTab = initHearingTab;

function initTransferTab() {
  if (typeof renderCourtOptions === 'function') {
    renderCourtOptions();
  }
  if (typeof renderRecentTransfersTable === 'function') {
    renderRecentTransfersTable();
  }
  if (typeof switchTransferMode === 'function') {
    switchTransferMode('single');
  }

  const transferSearchBtn = document.getElementById('transferSearchBtn');
  const transferSearchInput = document.getElementById('transferSearchInput');

  if (transferSearchBtn && !transferSearchBtn.dataset.bound) {
    transferSearchBtn.dataset.bound = 'true';
    transferSearchBtn.addEventListener('click', () => {
      if (typeof loadCaseForTransfer === 'function') {
        loadCaseForTransfer(transferSearchInput?.value);
      }
    });
  }

  if (transferSearchInput && !transferSearchInput.dataset.bound) {
    transferSearchInput.dataset.bound = 'true';
    transferSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (typeof loadCaseForTransfer === 'function') {
          loadCaseForTransfer(transferSearchInput.value);
        }
      }
    });
  }

  const transferCaseForm = document.getElementById('transferCaseForm');
  if (transferCaseForm && !transferCaseForm.dataset.bound) {
    transferCaseForm.dataset.bound = 'true';
    if (typeof handleTransferCaseSubmit === 'function') {
      transferCaseForm.addEventListener('submit', handleTransferCaseSubmit);
    }
  }

  const bulkOriginCourt = document.getElementById('bulkOriginCourt');
  if (bulkOriginCourt && !bulkOriginCourt.dataset.bound) {
    bulkOriginCourt.dataset.bound = 'true';
    bulkOriginCourt.addEventListener('change', () => {
      if (typeof renderBulkOriginCasesList === 'function') {
        renderBulkOriginCasesList(bulkOriginCourt.value);
      }
    });
  }

  const bulkTransferForm = document.getElementById('bulkTransferForm');
  if (bulkTransferForm && !bulkTransferForm.dataset.bound) {
    bulkTransferForm.dataset.bound = 'true';
    if (typeof handleBulkTransferSubmit === 'function') {
      bulkTransferForm.addEventListener('submit', handleBulkTransferSubmit);
    }
  }
}
if (typeof initTransferTab !== 'undefined') window.initTransferTab = initTransferTab;



if (typeof handleAddCaseSubmit !== 'undefined') window.handleAddCaseSubmit = handleAddCaseSubmit;

if (typeof loadTabContent !== 'undefined') window.loadTabContent = loadTabContent;

async function showTab(tabId, event, navType = 'navigate') {
  window.showTab = showTab;
  window.showTabImpl = showTab;
  if (event && event.preventDefault) {
    event.preventDefault();
  }

  // Redirect separate case type views to All Cases with filter pre-selected
  const caseTypeRedirects = {
    'civil': 'civil',
    'state': 'state',
    'criminal': 'state',
    'family': 'family',
    'revenue': 'revenue',
    'misccivil': 'misc_civil',
    'misccriminal': 'misc_criminal',
    'complaint': 'complaint'
  };
  let filterTypeToApply = null;
  if (caseTypeRedirects[tabId]) {
    filterTypeToApply = caseTypeRedirects[tabId];
    tabId = 'all';
  }

  // Redirect legacy Chambers Accounts to modern Paisa Manager
  if (tabId === 'accounts') {
    tabId = 'paisa';
  }

  // Handle history stacks
  if (navType === 'navigate') {
    if (currentActiveTabId && currentActiveTabId !== tabId) {
      tabNavigationHistory.push(currentActiveTabId);
      if (tabNavigationHistory.length > 40) tabNavigationHistory.shift();
      tabForwardHistory = []; // Reset forward history on new navigation
    }
  }

  currentActiveTabId = tabId;
  updateNavigationButtons();

  // Persist current active tab for page refresh retention & synchronize browser history
  try {
    safeStorage.set('cmActiveTab', tabId);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('cmActiveTab', tabId);
    }
    if (window.history) {
      if (navType === 'navigate') {
        window.history.pushState({ app: 'casebook', tab: tabId, timestamp: Date.now() }, '', '#' + tabId);
      } else {
        window.history.replaceState({ app: 'casebook', tab: tabId }, '', '#' + tabId);
      }
    }
  } catch (e) {}

  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.classList.add('active');
    const contentEl = document.querySelector('.content');
    if (contentEl) {
      if (tabId === 'helpers') {
        contentEl.classList.add('helpers-tab-active');
      } else {
        contentEl.classList.remove('helpers-tab-active');
      }
    }
    if (targetTab.dataset.tabSrc && targetTab.dataset.loaded !== 'true') {
      const loaded = await loadTabContent(targetTab);
      if (!loaded || currentActiveTabId !== tabId) return;
    }
  }

  // Auto-close mobile sidebar drawer on tab switch
  if (window.innerWidth <= 992) {
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
  }

  // Update mobile Floating Action Button (FAB) visibility: show on listing/dashboard tabs, hide on form/management tabs
  const mobileFab = document.querySelector('.mobile-fab-btn');
  if (mobileFab) {
    const fabAllowedTabs = ['home', 'search', 'all', 'cards', 'causelist', 'upcoming'];
    if (fabAllowedTabs.includes(tabId)) {
      mobileFab.style.removeProperty('display');
    } else {
      mobileFab.style.setProperty('display', 'none', 'important');
    }
  }

  // Smooth scroll to top for comfortable mobile navigation
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (tabId === 'home') {
    renderHomeDashboard();
  }

  if (tabId === 'search') {
    setTimeout(() => {
      const gs = document.getElementById('globalSearch');
      if (gs) gs.focus();
    }, 250);
    filterCaseTables();
  }

  if (tabId === 'all') {
    updateAllCasesTypePillCounts();
    if (filterTypeToApply !== null) {
      filterAllCasesByType(filterTypeToApply);
    } else {
      renderAllCasesTableWithFilters();
    }
  }

  if (tabId === 'cards') {
    renderCaseCards();
  }

  if (tabId === 'add') {
    if (typeof initAddTab === 'function') {
      initAddTab();
    } else {
      renderCaseTypeOptions();
      renderCourtOptions();
      renderCriminalCourtOptions();
      toggleCaseFormByType();
    }
  }

  if (tabId === 'update') {
    if (typeof initUpdateTab === 'function') {
      initUpdateTab();
    } else {
      renderCaseTypeOptions();
      renderCourtOptions();
      renderCriminalCourtOptions();
      toggleUpdateCaseFormByType();
    }
  }

  if (tabId === 'causelist') {
    initCauseListTab();
  }

  if (tabId === 'calendar') {
    renderCalendarView();
  }

  if (tabId === 'upcoming') {
    renderUpcomingWeekHearings();
  }

  if (tabId === 'todo') {
    populateTodoCaseDropdown();
    renderCaseTasks();
  }

  if (tabId === 'hearing') {
    if (typeof initHearingTab === 'function') {
      initHearingTab();
    } else {
      populateHearingCaseDropdown();
    }
  }

  if (tabId === 'transfer') {
    if (typeof initTransferTab === 'function') {
      initTransferTab();
    }
  }


  if (tabId === 'livecrud') {
    initLiveCrudTab();
  }

  if (tabId === 'courts') {
    renderCourtsTable();
  }

  if (tabId === 'helpers') {
    renderHelpersTable();
  }


  if (tabId === 'accounts') {
    renderAccountsTab();
  }

  if (tabId === 'paisa') {
    renderPaisaTab();
    if (typeof fetchPaisaFromSupabase === 'function') {
      fetchPaisaFromSupabase(false);
    }
  }

  if (tabId === 'settings') {
    const currentAdminEl = document.getElementById('currentAdminUsername');
    const newUsernameEl = document.getElementById('newUsername');
    const activeUser = getActiveAdminUsername();
    if (currentAdminEl) currentAdminEl.value = activeUser;
    if (newUsernameEl && !newUsernameEl.value) newUsernameEl.value = activeUser;
    const statusMsg = document.getElementById('settingsStatus');
    if (statusMsg) statusMsg.textContent = '';
  }

  // Update active sidebar state
  document.querySelectorAll('.sidebar a').forEach(a => {
    a.classList.remove('active');
  });
  const matchingLink = Array.from(document.querySelectorAll('.sidebar a')).find(a => a.getAttribute('onclick')?.includes(`'${tabId}'`));
  if (matchingLink) {
    matchingLink.classList.add('active');
  }

  // Auto-close mobile sidebar on tab change
  if (window.innerWidth <= 1024) {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
  }
}

/* ==============================================================================
   Mobile Back Button & History Navigation Architecture
   ============================================================================== */

var lastExitBackPressTime = 0;
var isInternalHistoryNav = false;

// Return open modal info if any modal dialog is currently displayed
function getOpenModalInfo() {
  const modalList = [
    { id: 'editHelperModal', close: () => (typeof closeEditHelperModal === 'function' ? closeEditHelperModal() : null) },
    { id: 'deleteHelperModal', close: () => (typeof closeDeleteHelperModal === 'function' ? closeDeleteHelperModal() : null) },
    { id: 'editCourtModal', close: () => (typeof closeEditCourtModal === 'function' ? closeEditCourtModal() : null) },
    { id: 'deleteCourtModal', close: () => (typeof closeDeleteCourtModal === 'function' ? closeDeleteCourtModal() : null) },
    { id: 'caseHistoryModal', close: () => (typeof closeCaseHistoryModal === 'function' ? closeCaseHistoryModal() : null) },
    { id: 'pwaGuideModal', close: () => (typeof closePwaGuideModal === 'function' ? closePwaGuideModal() : null) },
    { id: 'todoReminderModal', close: () => (typeof closeTodoReminderModal === 'function' ? closeTodoReminderModal() : null) },
    { id: 'accountTransactionModal', close: () => (typeof closeAccountModal === 'function' ? closeAccountModal() : null) },
    { id: 'paisaReceivedModal', close: () => (typeof closePaisaModal === 'function' ? closePaisaModal('paisaReceivedModal') : null) },
    { id: 'paisaSpendModal', close: () => (typeof closePaisaModal === 'function' ? closePaisaModal('paisaSpendModal') : null) },
    { id: 'paisaDetailModal', close: () => (typeof closePaisaModal === 'function' ? closePaisaModal('paisaDetailModal') : null) },
    { id: 'paisaReportsModal', close: () => (typeof closePaisaModal === 'function' ? closePaisaModal('paisaReportsModal') : null) }
  ];

  for (let i = 0; i < modalList.length; i++) {
    const el = document.getElementById(modalList[i].id);
    if (el && !el.classList.contains('hidden') && el.style.display !== 'none') {
      return modalList[i];
    }
  }
  return null;
}

function isMobileSidebarOpen() {
  const sidebar = document.querySelector('.sidebar');
  return !!(sidebar && sidebar.classList.contains('mobile-open'));
}

function closeMobileSidebarDrawer() {
  const sidebar = document.querySelector('.sidebar') || document.querySelector('.sidenav');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) {
    sidebar.classList.remove('mobile-open');
    sidebar.classList.remove('open');
  }
  if (overlay) overlay.classList.remove('active');
}

function handlePopStateNavigation(event) {
  if (isInternalHistoryNav) {
    isInternalHistoryNav = false;
    return;
  }

  // 1. If any modal dialog is currently open, close it and prevent window back
  const openModal = getOpenModalInfo();
  if (openModal) {
    openModal.close();
    try {
      if (window.history && window.history.pushState) {
        window.history.pushState({ app: 'casebook', tab: currentActiveTabId }, '', '#' + currentActiveTabId);
      }
    } catch (e) {}
    return;
  }

  // 2. If mobile sidebar navigation drawer is open, close it and stay in app
  if (isMobileSidebarOpen()) {
    closeMobileSidebarDrawer();
    try {
      if (window.history && window.history.pushState) {
        window.history.pushState({ app: 'casebook', tab: currentActiveTabId }, '', '#' + currentActiveTabId);
      }
    } catch (e) {}
    return;
  }

  // 3. Guest Screen: if case details card is open on guest portal, dismiss it
  const guestDetails = document.getElementById('guestCaseDetailsContent');
  if (guestDetails && !guestDetails.classList.contains('hidden')) {
    guestDetails.classList.add('hidden');
    const guestEmpty = document.getElementById('guestCaseDetailsEmpty');
    if (guestEmpty) guestEmpty.classList.remove('hidden');
    try {
      if (window.history && window.history.pushState) {
        window.history.pushState({ app: 'casebook', screen: 'guest' }, '', window.location.hash);
      }
    } catch (e) {}
    return;
  }

  // 4. Tab Navigation History Check
  const state = event.state;
  const targetTab = (state && state.tab) ? state.tab : ((window.location.hash || '').replace(/^#/, '').trim());

  if (targetTab && document.getElementById(targetTab) && targetTab !== currentActiveTabId) {
    showTab(targetTab, null, 'history');
    return;
  }

  // 5. Internal tab navigation history stack
  if (tabNavigationHistory.length > 0) {
    const prevTab = tabNavigationHistory.pop();
    if (prevTab && prevTab !== currentActiveTabId && document.getElementById(prevTab)) {
      if (currentActiveTabId) {
        tabForwardHistory.push(currentActiveTabId);
      }
      showTab(prevTab, null, 'history');
      return;
    }
  }

  // 6. If currently on a sub-tab (not 'home'), navigate back to Home Dashboard
  if (currentActiveTabId && currentActiveTabId !== 'home') {
    showTab('home', null, 'history');
    return;
  }

  // 7. On Home Dashboard with no history left:
  // Mobile double-back exit confirmation (prevents accidental window closes)
  const now = Date.now();
  if (now - lastExitBackPressTime < 2500) {
    // Second back press within 2.5s: allow user to exit application
    return;
  } else {
    lastExitBackPressTime = now;
    try {
      if (window.history && window.history.pushState) {
        window.history.pushState({ app: 'casebook', tab: 'home', exitGuard: true }, '', '#home');
      }
    } catch (e) {}
    if (typeof showToastNotification === 'function') {
      showToastNotification('📱 Press back again to exit CaseBook', 2500);
    } else if (typeof M !== 'undefined' && M.toast) {
      M.toast({ html: '📱 Press back again to exit CaseBook' });
    }
  }
}

function setupMobileBackAndHistory() {
  const initialTab = (window.location.hash || '').replace(/^#/, '').trim() || currentActiveTabId || 'home';
  try {
    if (window.history && window.history.replaceState) {
      window.history.replaceState({ app: 'casebook', tab: initialTab, isInitial: true }, '', '#' + initialTab);
      // Push an initial safety state so that pressing back on mobile triggers popstate instead of exiting the page immediately
      window.history.pushState({ app: 'casebook', tab: initialTab }, '', '#' + initialTab);
    }
  } catch (e) {}

  window.removeEventListener('popstate', handlePopStateNavigation);
  window.addEventListener('popstate', handlePopStateNavigation);
}

function goPreviousTab() {
  // 1. If any modal dialog is currently open, close it
  const openModal = getOpenModalInfo();
  if (openModal) {
    openModal.close();
    return;
  }

  // 2. If mobile drawer is open, close it
  if (isMobileSidebarOpen()) {
    closeMobileSidebarDrawer();
    return;
  }

  // 3. If browser history exists and we have internal history, let browser go back
  if (window.history && window.history.length > 1 && tabNavigationHistory.length > 0) {
    window.history.back();
    return;
  }

  // 4. Fallback in-memory history
  if (tabNavigationHistory.length > 0) {
    const previousTabId = tabNavigationHistory.pop();
    if (previousTabId) {
      if (currentActiveTabId) {
        tabForwardHistory.push(currentActiveTabId);
      }
      showTab(previousTabId, null, 'back');
      return;
    }
  }

  // 5. If on any tab other than home, return to home
  if (currentActiveTabId && currentActiveTabId !== 'home') {
    showTab('home', null, 'navigate');
  }
}

function goForwardTab() {
  if (tabForwardHistory.length > 0) {
    const nextTabId = tabForwardHistory.pop();
    if (nextTabId) {
      if (currentActiveTabId) {
        tabNavigationHistory.push(currentActiveTabId);
      }
      showTab(nextTabId, null, 'forward');
    }
  } else if (window.history && window.history.length > 1) {
    window.history.forward();
  }
}

function updateNavigationButtons() {
  const backBtn = document.getElementById('bottomNavBackBtn');
  const forwardBtn = document.getElementById('bottomNavForwardBtn');
  const homeBtn = document.getElementById('bottomNavHomeBtn');
  const tasksBtn = document.getElementById('bottomNavTasksBtn');
  const paisaBtn = document.getElementById('bottomNavPaisaBtn');
  const historyBtn = document.getElementById('bottomNavHistoryBtn');

  if (backBtn) {
    const hasBack = tabNavigationHistory.length > 0 || (currentActiveTabId && currentActiveTabId !== 'home');
    backBtn.disabled = !hasBack;
    backBtn.classList.toggle('disabled', !hasBack);
  }

  if (forwardBtn) {
    const hasForward = tabForwardHistory.length > 0;
    forwardBtn.disabled = !hasForward;
    forwardBtn.classList.toggle('disabled', !hasForward);
  }

  if (homeBtn) {
    homeBtn.classList.toggle('active', currentActiveTabId === 'home');
  }
  if (tasksBtn) {
    tasksBtn.classList.toggle('active', currentActiveTabId === 'todo');
  }
  if (paisaBtn) {
    paisaBtn.classList.toggle('active', currentActiveTabId === 'paisa');
  }
  if (historyBtn) {
    historyBtn.classList.toggle('active', currentActiveTabId === 'causelist' || currentActiveTabId === 'upcoming');
  }

  // Synchronize active state on sidebar links
  try {
    document.querySelectorAll('.sidebar a, .sidenav a').forEach(link => {
      const onclickAttr = link.getAttribute('onclick') || '';
      const match = onclickAttr.match(/showTab\(['"]([^'"]+)['"]/);
      if (match) {
        const targetId = match[1];
        link.classList.toggle('active', targetId === currentActiveTabId);
      }
    });
  } catch (e) {}

  // Synchronize zero-state on badges for collapsed mode
  syncSidebarBadgeZeroState();
}

// ==============================================================================
// ADVOCATE BLACK & WHITE THEME - CONTROLLER & TOGGLE SYSTEM
// ==============================================================================
function updateThemeToggleUI(isDark) {
  const label = document.getElementById('themeToggleLabel');
  const icon = document.getElementById('themeModeIcon');
  if (label) {
    label.textContent = isDark ? 'Dark Mode' : 'Light Mode';
  }
  if (icon) {
    icon.setAttribute('icon', isDark ? 'lucide:moon' : 'lucide:sun');
  }
}

function initCaseBookTheme() {
  try {
    const savedTheme = localStorage.getItem('casebook-theme');
    const isDark = savedTheme !== 'light';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateThemeToggleUI(isDark);
  } catch (e) {
    console.error('Failed to init theme:', e);
  }
}

function toggleCaseBookTheme(e) {
  if (e && e.preventDefault) e.preventDefault();
  try {
    const isDark = document.documentElement.classList.contains('dark');
    const newDark = !isDark;
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('casebook-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('casebook-theme', 'light');
    }
    updateThemeToggleUI(newDark);
    if (typeof showFloatingToast === 'function') {
      showFloatingToast('Switched to ' + (newDark ? 'Dark' : 'Light') + ' Mode', 'info');
    }
  } catch (err) {
    console.error('Theme toggle error:', err);
  }
}

function syncSidebarBadgeZeroState() {
  try {
    document.querySelectorAll('.sidebar a .badge, .sidenav a .badge').forEach(b => {
      const txt = (b.textContent || '').trim();
      const isZero = txt === '0' || txt === '₹0' || txt === '0.00' || txt === '' || txt === 'null' || txt === 'undefined';
      b.setAttribute('data-zero', isZero ? 'true' : 'false');
    });
  } catch (e) {}
}

function initSidebarBadgeObserver() {
  syncSidebarBadgeZeroState();
  try {
    const sidebar = document.querySelector('.sidebar') || document.querySelector('.sidenav');
    if (sidebar && window.MutationObserver) {
      const observer = new MutationObserver(() => {
        syncSidebarBadgeZeroState();
      });
      observer.observe(sidebar, { subtree: true, characterData: true, childList: true });
    }
  } catch (e) {}
}

window.toggleCaseBookTheme = toggleCaseBookTheme;
window.toggleAppTheme = toggleCaseBookTheme;
window.initCaseBookTheme = initCaseBookTheme;
window.syncSidebarBadgeZeroState = syncSidebarBadgeZeroState;

// Initialize theme UI & badge observers immediately if DOM already loaded or on ready
if (document.readyState !== 'loading') {
  initCaseBookTheme();
  initSidebarBadgeObserver();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    initCaseBookTheme();
    initSidebarBadgeObserver();
  });
}

var lastSidebarToggleTime = 0;
function toggleMobileSidebar(ev) {
  if (ev && ev.preventDefault) ev.preventDefault();
  const now = Date.now();
  if (now - lastSidebarToggleTime < 250) return;
  lastSidebarToggleTime = now;

  const sidebar = document.querySelector('.sidebar') || document.querySelector('.sidenav');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  if (!sidebar) return;

  if (window.innerWidth <= 1024) {
    const isOpen = sidebar.classList.toggle('mobile-open');
    sidebar.classList.toggle('open', isOpen);
    if (sidebarOverlay) sidebarOverlay.classList.toggle('active', isOpen);
  } else {
    const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
    try {
      localStorage.setItem('cms_sidebar_collapsed', isCollapsed ? '1' : '0');
    } catch (e) {}
  }
}
window.toggleMobileSidebar = toggleMobileSidebar;
window.handleSidebarToggle = toggleMobileSidebar;

if (typeof getOpenModalInfo !== 'undefined') window.getOpenModalInfo = getOpenModalInfo;
if (typeof isMobileSidebarOpen !== 'undefined') window.isMobileSidebarOpen = isMobileSidebarOpen;
if (typeof closeMobileSidebarDrawer !== 'undefined') window.closeMobileSidebarDrawer = closeMobileSidebarDrawer;
if (typeof handlePopStateNavigation !== 'undefined') window.handlePopStateNavigation = handlePopStateNavigation;
if (typeof setupMobileBackAndHistory !== 'undefined') window.setupMobileBackAndHistory = setupMobileBackAndHistory;
if (typeof goPreviousTab !== 'undefined') window.goPreviousTab = goPreviousTab;
if (typeof goForwardTab !== 'undefined') window.goForwardTab = goForwardTab;
if (typeof updateNavigationButtons !== 'undefined') window.updateNavigationButtons = updateNavigationButtons;

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (btn) btn.textContent = '🙈';
  } else {
    input.type = 'password';
    if (btn) btn.textContent = '👁️';
  }
}
if (typeof togglePasswordVisibility !== 'undefined') window.togglePasswordVisibility = togglePasswordVisibility;

function handleChangeCredentials(event) {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }

  const currentPassInput = document.getElementById('currentPassword');
  const newUsernameInput = document.getElementById('newUsername');
  const newPassInput = document.getElementById('newPassword');
  const confirmPassInput = document.getElementById('confirmNewPassword');
  const statusMsg = document.getElementById('settingsStatus');

  const currentPass = currentPassInput ? currentPassInput.value.trim() : '';
  const newUsername = newUsernameInput ? newUsernameInput.value.trim() : '';
  const newPass = newPassInput ? newPassInput.value.trim() : '';
  const confirmPass = confirmPassInput ? confirmPassInput.value.trim() : '';

  // Verify current password via cryptographic hash
  const activeSalt = getActiveAdminSalt();
  const activeHash = getActiveAdminPassHash();
  const inputHash = hashPassword(currentPass, activeSalt);

  // Check against active credentials or master default
  const defaultHash = hashPassword(currentPass, DEFAULT_ADMIN_SALT);
  const isMatch = timingSafeEqual(inputHash, activeHash) || timingSafeEqual(defaultHash, DEFAULT_ADMIN_HASH);

  if (!isMatch) {
    if (statusMsg) {
      statusMsg.textContent = '❌ Current password is incorrect.';
      statusMsg.style.color = '#ef4444';
    }
    return false;
  }

  if (!newUsername || newUsername.length < 3) {
    if (statusMsg) {
      statusMsg.textContent = '❌ Username must be at least 3 characters long.';
      statusMsg.style.color = '#ef4444';
    }
    return false;
  }

  // Strong password policy: at least 8 characters, containing both letters and numbers
  if (newPass.length < 8 || !/[a-zA-Z]/.test(newPass) || !/[0-9]/.test(newPass)) {
    if (statusMsg) {
      statusMsg.textContent = '❌ New password must be at least 8 characters long and contain both letters and numbers.';
      statusMsg.style.color = '#ef4444';
    }
    return false;
  }

  if (newPass !== confirmPass) {
    if (statusMsg) {
      statusMsg.textContent = '❌ New password and confirmation do not match.';
      statusMsg.style.color = '#ef4444';
    }
    return false;
  }

  // Generate fresh random salt and cryptographic hash
  const newSalt = generateSecureSalt(16);
  const newHash = hashPassword(newPass, newSalt);

  // Save new hashed credentials (never store plaintext)
  safeStorage.set('cmAdminUser', newUsername, true);
  safeStorage.set('cmAdminSalt', newSalt, true);
  safeStorage.set('cmAdminPassHash', newHash, true);
  safeStorage.remove('cmAdminPass'); // Purge legacy plaintext password

  // Refresh active session token
  createAdminSession(newUsername, true);

  if (statusMsg) {
    statusMsg.textContent = `✅ Credentials updated securely! Next login username: "${newUsername}".`;
    statusMsg.style.color = '#10b981';
  }

  const activeUserEl = document.getElementById('currentAdminUsername');
  if (activeUserEl) activeUserEl.value = newUsername;

  if (currentPassInput) currentPassInput.value = '';
  if (newPassInput) newPassInput.value = '';
  if (confirmPassInput) confirmPassInput.value = '';

  alert(`Admin credentials updated successfully!\nNew Username: ${newUsername}`);
  return false;
}
if (typeof handleChangeCredentials !== 'undefined') window.handleChangeCredentials = handleChangeCredentials;

/* ==============================================================================
   Expandable Nav Case Search (top header search icon)
   ============================================================================== */
var navCaseSearchOpen = false;

function toggleNavCaseSearch(open) {
  const wrap = document.getElementById('navCaseSearch');
  const input = document.getElementById('navCaseSearchInput');
  if (!wrap || !input) return;

  navCaseSearchOpen = Boolean(open);
  wrap.classList.toggle('open', navCaseSearchOpen);

  if (navCaseSearchOpen) {
    input.value = '';
    renderNavCaseSearchResults('');
    setTimeout(() => input.focus(), 60);
  } else {
    const results = document.getElementById('navCaseSearchResults');
    if (results) results.classList.remove('has-results');
  }
}

function renderNavCaseSearchResults(query) {
  const resultsEl = document.getElementById('navCaseSearchResults');
  if (!resultsEl) return;

  const q = (query || '').trim().toLowerCase();

  if (!q) {
    resultsEl.classList.remove('has-results');
    resultsEl.innerHTML = '';
    return;
  }

  const matches = (allCaseRecords || []).filter(c => {
    const caseNo = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
    const caseName = (c.caseName || '').toLowerCase();
    const party1 = (c.plaintiff || c.petitioner || c.applicant || c.victimName || c.accusedName || '').toLowerCase();
    const party2 = (c.defendant || c.respondent || c.oppositeParty || c.accusedName || '').toLowerCase();
    const client = (c.clientName || c.criminalClientName || c.client || '').toLowerCase();
    const court = (c.courtName || c.criminalCourtName || '').toLowerCase();
    return caseNo.includes(q) || caseName.includes(q) || party1.includes(q) ||
      party2.includes(q) || client.includes(q) || court.includes(q);
  }).slice(0, 12);

  resultsEl.classList.add('has-results');

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div class="nav-case-search-empty">🔍 No cases match "${escapeHtml(q)}"</div>`;
    return;
  }

  resultsEl.innerHTML = matches.map(c => {
    const { caseNumber, caseName, courtName, isDisposed, isUndated } = getCaseCardDisplayData(c);
    const dateLabel = isDisposed ? 'Disposed' : (isUndated ? 'Undated' : `📅 ${formatDateDMY(c.nextHearing)}`);
    const dateClass = isDisposed ? 'nav-case-search-result-date is-disposed' : (isUndated ? 'nav-case-search-result-date is-undated' : 'nav-case-search-result-date');
    const icon = ['criminal', 'state', 'complaint', 'misc_criminal', 'misccriminal'].includes((c.caseType || 'civil').toLowerCase())
      ? 'fa-gavel' : 'fa-scale-balanced';
    return `
      <div class="nav-case-search-result" role="option" onclick="selectNavCaseSearchResult('${escapeHtml(caseNumber)}')" title="${escapeHtml(caseName)} — ${escapeHtml(caseNumber)}">
        <span class="nav-case-search-result-icon"><i class="fa-solid ${icon}"></i></span>
        <span class="nav-case-search-result-info">
          <span class="nav-case-search-result-caseno">${escapeHtml(caseNumber)}</span>
          <span class="nav-case-search-result-name">${escapeHtml(caseName)}</span>
          <span class="nav-case-search-result-sub">${escapeHtml(courtName)}</span>
        </span>
        <span class="${dateClass}">${dateLabel}</span>
      </div>
    `;
  }).join('');
}

function selectNavCaseSearchResult(caseNumber) {
  toggleNavCaseSearch(false);
  openCaseHistoryModalByNo(caseNumber);
}

function onNavCaseSearchInput(value) {
  renderNavCaseSearchResults(value);
}

// Live input binding + close on outside click / Escape
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('navCaseSearchInput');
  if (input) {
    input.addEventListener('input', e => onNavCaseSearchInput(e.target.value));
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        toggleNavCaseSearch(false);
      } else if (e.key === 'Enter') {
        // Open the top match if present
        const first = document.querySelector('#navCaseSearchResults .nav-case-search-result');
        if (first) first.click();
      }
    });
  }

  // Global Ctrl+K / Cmd+K to toggle case search
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleNavCaseSearch(!navCaseSearchOpen);
    }
  });

  document.addEventListener('click', e => {
    const wrap = document.getElementById('navCaseSearch');
    if (navCaseSearchOpen && wrap && !wrap.contains(e.target)) {
      toggleNavCaseSearch(false);
    }
  });
});

if (typeof toggleNavCaseSearch !== 'undefined') window.toggleNavCaseSearch = toggleNavCaseSearch;
if (typeof onNavCaseSearchInput !== 'undefined') window.onNavCaseSearchInput = onNavCaseSearchInput;
if (typeof selectNavCaseSearchResult !== 'undefined') window.selectNavCaseSearchResult = selectNavCaseSearchResult;

if (typeof window !== 'undefined') {
  try {
    Object.defineProperty(window, 'allCaseRecords', {
      get() { return typeof allCaseRecords !== 'undefined' ? allCaseRecords : (window._allCaseRecords || []); },
      set(v) { if (typeof allCaseRecords !== 'undefined') allCaseRecords = v; window._allCaseRecords = v; },
      configurable: true
    });
  } catch (e) {
    try { window.allCaseRecords = allCaseRecords; } catch (err) {}
  }
  try {
    Object.defineProperty(window, 'allHearingRecords', {
      get() { return typeof allHearingRecords !== 'undefined' ? allHearingRecords : (window._allHearingRecords || []); },
      set(v) { if (typeof allHearingRecords !== 'undefined') allHearingRecords = v; window._allHearingRecords = v; },
      configurable: true
    });
  } catch (e) {
    try { window.allHearingRecords = allHearingRecords; } catch (err) {}
  }
}

var currentGuestSelectedCase = null;

function renderGuestCaseDetails(caseObj) {
  const emptyBox = document.getElementById('guestCaseDetailsEmpty');
  const contentBox = document.getElementById('guestCaseDetailsContent');
  const badge = document.getElementById('guestCaseTypeBadge');

  if (!caseObj) {
    currentGuestSelectedCase = null;
    if (emptyBox) emptyBox.classList.remove('hidden');
    if (contentBox) contentBox.classList.add('hidden');
    if (badge) {
      badge.textContent = 'Select a Case';
      badge.className = 'case-badge';
    }
    return;
  }

  currentGuestSelectedCase = caseObj;

  if (emptyBox) emptyBox.classList.add('hidden');
  if (contentBox) contentBox.classList.remove('hidden');

  const caseType = (caseObj.caseType || 'civil').toLowerCase();
  if (badge) {
    badge.textContent = caseType.toUpperCase();
    badge.className = `case-badge ${caseType}`;
  }

  const setVal = (id, val, fallback = '—') => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || fallback;
  };

  setVal('gDetailCaseNo', caseObj.caseNo || caseObj.criminalCaseNumber);
  setVal('gDetailCaseYear', caseObj.caseYear || caseObj.crimeYear || '2026');
  setVal('gDetailCaseType', (caseObj.caseType || 'Civil').toUpperCase());
  setVal('gDetailCourtName', caseObj.courtName || caseObj.criminalCourtName);
  setVal('gDetailFilingDate', formatDateDMY(caseObj.filingDate || caseObj.crimeFilingDate));
  setVal('gDetailNextHearing', formatDateDMY(caseObj.nextHearing));
  setVal('gDetailCaseName', caseObj.caseName || (caseObj.plaintiff ? `${caseObj.plaintiff} vs ${caseObj.defendant}` : `${caseObj.victimName} vs ${caseObj.accusedName}`));
  setVal('gDetailClient', caseObj.clientName || caseObj.criminalClientName || caseObj.client);

  const gDocEl = document.getElementById('gDetailDocLink');
  if (gDocEl) {
    const cleanDocUrl = safeUrl(caseObj.docLink);
    if (cleanDocUrl) {
      gDocEl.innerHTML = `<a href="${cleanDocUrl}" target="_blank" rel="noopener noreferrer" class="doc-link-pill">🔗 Open Document / Order Sheet ↗</a>`;
    } else {
      gDocEl.textContent = '—';
    }
  }

  const guestPrintBtn = document.getElementById('guestDetailPrintBtn');
  if (guestPrintBtn) {
    guestPrintBtn.onclick = () => {
      printCurrentGuestCaseDossier();
    };
  }
}

function renderGuestTable(searchText = '') {
  const tbody = document.querySelector('#guestCasesTable tbody');
  if (!tbody) return;

  const query = searchText.trim().toLowerCase();

  // Client Privacy Protection: Do not list all clients' records to public viewers by default
  if (!query) {
    tbody.innerHTML = '<tr><td colspan="6" class="no-results" style="padding: 35px 20px; font-size: 14.5px; color: #475569;">🔒 <strong>Private Client Portal:</strong> Please enter your <strong>Case Number</strong> or <strong>Mobile Number</strong> above to securely view your hearing schedule.</td></tr>';
    renderGuestCaseDetails(null);
    return;
  }

  const filtered = allCaseRecords.filter((item) => {
    const haystack = [
      item.caseNo,
      item.criminalCaseNumber,
      item.clientNumber,
      item.criminalClientNumber,
      item.caseName,
      item.clientName,
      item.criminalClientName,
      item.plaintiff,
      item.defendant,
      item.victimName,
      item.accusedName,
      item.courtName,
      item.partyName,
      item.remark
    ].filter(Boolean).join(' ').toLowerCase();
    return haystack.includes(query);
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="no-results" style="padding: 30px 15px;">❌ No case found matching "<strong>${escapeHtml(searchText.trim())}</strong>". Please verify your Case Number or Mobile Number.</td></tr>`;
    renderGuestCaseDetails(null);
    return;
  }

  tbody.innerHTML = '';
  filtered.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.className = `clickable-row ${index === 0 ? 'selected-row' : ''}`;

    const caseNumber = item.caseNo || item.criminalCaseNumber || '—';
    const caseName = item.caseName || (item.plaintiff ? `${item.plaintiff} vs ${item.defendant}` : (item.victimName ? `${item.victimName} vs ${item.accusedName}` : '—'));
    const client = item.clientName || item.criminalClientName || '—';
    const partyName = item.partyName || item.defendant || item.accusedName || item.plaintiff || '—';
    const nextHearing = formatDateDMY(item.nextHearing);

    tr.innerHTML = `
      <td><strong>${escapeHtml(caseNumber)}</strong></td>
      <td>${escapeHtml(caseName)}</td>
      <td>${escapeHtml(client)}</td>
      <td>${escapeHtml(partyName)}</td>
      <td><strong>${escapeHtml(nextHearing)}</strong></td>
      <td class="table-actions-td"><button type="button" class="table-view-btn" title="View Details"><i class="fa-solid fa-eye"></i><span class="btn-text"> View Details</span></button></td>
    `;

    tr.addEventListener('click', () => {
      tbody.querySelectorAll('tr').forEach(r => r.classList.remove('selected-row'));
      tr.classList.add('selected-row');
      renderGuestCaseDetails(item);
    });

    tbody.appendChild(tr);
  });

  renderGuestCaseDetails(filtered[0]);
}

function populateHearingCaseDropdown(selectedCaseNoToInclude = '') {
  const select = document.getElementById('hearingCaseSelect');
  if (!select) return;

  const currentVal = selectedCaseNoToInclude || select.value || '';

  // Undated pending cases only (disposed excluded, dated excluded)
  const undatedCases = [];
  const datedCases = [];

  allCaseRecords.forEach(c => {
    const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
    if (isDisposed) return;
    const isDated = c.nextHearing && c.nextHearing !== '—' && c.nextHearing !== 'null' && c.nextHearing.trim() !== '';
    if (isDated) {
      datedCases.push(c);
    } else {
      undatedCases.push(c);
    }
  });

  // Sort by case number
  const sortFn = (a, b) => {
    const numA = (a.caseNo || a.criminalCaseNumber || '').toUpperCase();
    const numB = (b.caseNo || b.criminalCaseNumber || '').toUpperCase();
    return numA.localeCompare(numB);
  };
  undatedCases.sort(sortFn);
  datedCases.sort(sortFn);

  // Dropdown shows only cases that need a date forwarded:
  // undated (no date yet) + overdue (next date already passed).
  // Future-dated and disposed cases are excluded.
  const todayISO = toISODate(new Date());
  const overdueCases = datedCases.filter(c => {
    const iso = toISODate(c.nextHearing);
    return iso && iso < todayISO;
  });

  let html = `<option value="">-- Choose Case from List (${undatedCases.length} Undated, ${overdueCases.length} Overdue) --</option>`;

  if (undatedCases.length > 0) {
    html += `<optgroup label="❓ Undated Cases (${undatedCases.length} Awaiting First Schedule)">`;
    undatedCases.forEach(c => {
      const caseNum = c.caseNo || c.criminalCaseNumber || '';
      const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : ''));
      const caseType = (c.caseType || 'civil').toUpperCase();
      html += `<option value="${escapeHtml(caseNum)}">❓ ${escapeHtml(caseNum)} — ${escapeHtml(caseName)} [${caseType}] (Undated)</option>`;
    });
    html += `</optgroup>`;
  }

  if (overdueCases.length > 0) {
    html += `<optgroup label="⏰ Overdue Cases (${overdueCases.length} Date Passed — Forward Now)">`;
    overdueCases.forEach(c => {
      const caseNum = c.caseNo || c.criminalCaseNumber || '';
      const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : ''));
      const caseType = (c.caseType || 'civil').toUpperCase();
      const nextDt = formatDateDMY(c.nextHearing);
      html += `<option value="${escapeHtml(caseNum)}">⏰ ${escapeHtml(caseNum)} — ${escapeHtml(caseName)} [${caseType}] (${nextDt} — Passed)</option>`;
    });
    html += `</optgroup>`;
  }

  select.innerHTML = html;

  if (currentVal) {
    select.value = currentVal;
  }
}

if (typeof populateHearingCaseDropdown !== 'undefined') window.populateHearingCaseDropdown = populateHearingCaseDropdown;

function openUpdateHearingForCase(caseNo) {
  showTab('hearing');
  populateHearingCaseDropdown(caseNo);
  const caseInput = document.getElementById('hearingCaseNo');
  if (caseInput) {
    caseInput.value = caseNo;
  }
  const select = document.getElementById('hearingCaseSelect');
  if (select) {
    select.value = caseNo;
  }
  renderHearingCaseInfo(caseNo);
  setTimeout(() => {
    const dateInput = document.getElementById('hearingDate');
    if (dateInput) dateInput.focus();
  }, 100);
}

if (typeof openUpdateHearingForCase !== 'undefined') window.openUpdateHearingForCase = openUpdateHearingForCase;

function renderHearingCaseInfo(caseNo) {
  const query = (caseNo || '').trim().toLowerCase();

  const setDisplayVal = (elId, val) => {
    const el = document.getElementById(elId);
    if (!el) return;
    if ('value' in el && el.tagName === 'INPUT') {
      el.value = val || '—';
    } else {
      el.textContent = val || '—';
    }
  };

  const elBadge = document.getElementById('hearingInfoBadge');
  const clientTag = document.getElementById('hearingCaseClientTag');
  const prevDateDisp = document.getElementById('hearingPrevDateDisplay');

  if (!query) {
    setDisplayVal('hearingInfoCaseName', '—');
    setDisplayVal('hearingInfoCourt', '—');
    setDisplayVal('hearingInfoPrevDate', '—');
    setDisplayVal('hearingInfoPrevProcess', '—');
    if (prevDateDisp) prevDateDisp.textContent = '—';
    if (clientTag) clientTag.textContent = 'Client: —';
    if (elBadge) elBadge.style.display = 'none';
    // No case selected → back to the common stage pill set
    renderHearingStagePills('');
    updateHearingLivePreview();
    return;
  }

  const found = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === query || num2 === query;
  });

  if (!found) {
    setDisplayVal('hearingInfoCaseName', '— (Case not found)');
    setDisplayVal('hearingInfoCourt', '—');
    setDisplayVal('hearingInfoPrevDate', '—');
    setDisplayVal('hearingInfoPrevProcess', '—');
    if (prevDateDisp) prevDateDisp.textContent = 'Case Not Found';
    if (clientTag) clientTag.textContent = 'Client: —';
    if (elBadge) elBadge.style.display = 'none';
    renderHearingStagePills('');
    updateHearingLivePreview();
    return;
  }

  const caseName = found.caseName || (found.plaintiff ? `${found.plaintiff} vs ${found.defendant}` : (found.victimName ? `${found.victimName} vs ${found.accusedName}` : '—'));
  const courtName = found.courtName || found.criminalCourtName || 'District Court';
  const caseType = (found.caseType || 'civil').toUpperCase();
  const clientName = found.clientName || found.criminalClientName || 'Client';
  const clientNumber = found.clientNumber || found.criminalClientNumber || '';

  // Find previous hearing date and process from history
  const caseHistory = getCaseHearingHistory(found.caseNo || found.criminalCaseNumber || '');
  const currentNextISO = toISODate(found.nextHearing);
  const todayISO = toISODate(new Date());

  const prevHearings = caseHistory.filter(h => {
    const hISO = toISODate(h.hearing_date);
    if (currentNextISO && hISO === currentNextISO) return false;
    // A future hearing is an upcoming date, never a "previous" hearing
    if (hISO && hISO > todayISO) return false;
    return true;
  });
  const latestPrev = prevHearings[0];
  const prevDateRaw = latestPrev ? latestPrev.hearing_date : (found.previousHearing && found.previousHearing !== '—' ? found.previousHearing : null);
  const prevDate = prevDateRaw ? formatDateDMY(prevDateRaw) : (currentNextISO ? `${formatDateDMY(currentNextISO)} (Current Fixed Date)` : '— (First Hearing)');
  const prevProcess = latestPrev ? (latestPrev.process || '—') : (found.previousProcess || found.hearingProcess || '—');

  // Populate preview elements
  setDisplayVal('hearingInfoCaseName', caseName);
  setDisplayVal('hearingInfoCourt', courtName);
  setDisplayVal('hearingInfoPrevDate', prevDate);
  setDisplayVal('hearingInfoPrevProcess', prevProcess);

  if (prevDateDisp) {
    prevDateDisp.textContent = prevDateRaw ? formatDateDMY(prevDateRaw) : (currentNextISO ? formatDateDMY(currentNextISO) : 'First Hearing');
  }

  if (clientTag) {
    clientTag.textContent = `Client: ${clientName} ${clientNumber ? '(' + clientNumber + ')' : ''}`;
  }

  // Pre-fill stage if already set
  const processInput = document.getElementById('hearingProcess');
  if (processInput && !processInput.value && found.hearingProcess) {
    processInput.value = found.hearingProcess;
  }

  // Store reference for the "Edit Previous Date" button
  _editingPrevHearingCaseNo = found.caseNo || found.criminalCaseNumber || '';
  _editingPrevHearingRecord = latestPrev || null;

  // Reset edit mode
  const editEl  = document.getElementById('hearingInfoPrevDateEdit');
  const saveBtn = document.getElementById('savePrevDateBtn');
  const editBtn = document.getElementById('editPrevDateBtn');
  const dispEl  = document.getElementById('hearingInfoPrevDate');
  if (editEl)  editEl.style.display  = 'none';
  if (saveBtn) saveBtn.style.display = 'none';
  if (editBtn) { editBtn.textContent = '✏️ Edit Previous Date'; editBtn.title = 'Edit previous date'; }
  if (dispEl)  dispEl.style.display  = 'none';

  if (elBadge) {
    elBadge.style.display = 'inline-block';
    elBadge.textContent = caseType;
    elBadge.className = `case-badge ${(found.caseType || 'civil').toLowerCase()}`;
  }

  updateHearingLivePreview();
}

if (typeof renderHearingCaseInfo !== 'undefined') window.renderHearingCaseInfo = renderHearingCaseInfo;

// ── Quick Forward Next Date Preset Shortcut Handler ─────────────────────────
function setHearingDateOffset(daysOffset) {
  const target = new Date();
  target.setDate(target.getDate() + daysOffset);

  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  const isoDate = `${yyyy}-${mm}-${dd}`;

  const dateInput = document.getElementById('hearingDate');
  if (dateInput) {
    dateInput.value = isoDate;
    updateHearingLivePreview();
  }
}

if (typeof setHearingDateOffset !== 'undefined') window.setHearingDateOffset = setHearingDateOffset;

// ── Quick Court Stage Preset Helper ─────────────────────────────────────────
function setHearingStagePreset(stageText) {
  const processInput = document.getElementById('hearingProcess');
  if (processInput) {
    processInput.value = stageText;
    updateHearingLivePreview();
  }
}

if (typeof setHearingStagePreset !== 'undefined') window.setHearingStagePreset = setHearingStagePreset;

// ── Case-type-aware Court Stage Presets ────────────────────────────────────
// Common core shared by every type + per-type specialist stages.
var HEARING_STAGE_PRESETS = {
  common: [
    { emoji: '📋', label: 'Arguments (बहस)', value: 'Arguments / अंतिम बहस' },
    { emoji: '📑', label: 'Evidence (साक्ष्य)', value: 'Evidence / साक्ष्य-गवाही' },
    { emoji: '✉️', label: 'Notice (समन)', value: 'Notice / Summons (नोटिस-समन)' },
    { emoji: '⚖️', label: 'Framing of Issues (तनकीहात)', value: 'Framing of Issues / तनकीहात' },
    { emoji: '🔍', label: 'Cross Examination (जिरह)', value: 'Cross Examination / जिरह' },
    { emoji: '🏁', label: 'Final Order (फैसला)', value: 'Final Order / फैसला' },
    { emoji: '✅', label: 'Compliance (अनुपालन)', value: 'Compliance / अनुपालन' },
    { emoji: '⏳', label: 'Adjourned (स्थगित)', value: 'Adjourned / स्थगित' },
    { emoji: '📌', label: 'Order Reserved (आदेश आरक्षित)', value: 'Order Reserved / आदेश आरक्षित' }
  ],
  civil: [
    { emoji: '📝', label: 'Written Statement (W.S.)', value: 'Written Statement / जवाबदावा' },
    { emoji: '📄', label: 'Replication (जवाब)', value: 'Replication / जवाबी लिखित बयान' },
    { emoji: '📋', label: 'Rejoinder', value: 'Rejoinder / प्रत्युत्तर' },
    { emoji: '📋', label: 'List of Documents', value: 'List of Documents / दस्तावेज़ सूची' },
    { emoji: '💰', label: 'Interim Application', value: 'Interim Application / अंतरिम प्रार्थना-पत्र' },
    { emoji: '🧾', label: 'Evidence Affidavits', value: 'Evidence by Affidavits / शपथ-पत्र द्वारा साक्ष्य' },
    { emoji: '📜', label: 'Final Arguments', value: 'Final Arguments / अंतिम बहस' },
    { emoji: '📅', label: 'Judgment (निर्णय)', value: 'Judgment / निर्णय' },
    { emoji: '⚡', label: 'Execution (विधिवत् निष्पादन)', value: 'Execution / विधिवत् निष्पादन' },
    { emoji: '🔁', label: 'Review / Appeal Period', value: 'Review-Appeal Period / पुनर्विलोकन-अपील अवधि' }
  ],
  criminal: [
    { emoji: '⚖️', label: 'Bail Hearing (ज़मानत)', value: 'Bail Hearing / ज़मानत सुनवाई' },
    { emoji: '📝', label: 'Charge Sheet ( challan)', value: 'Charge Sheet / चार्जशीट (चालान)' },
    { emoji: '⚖️', label: 'Charging (आरोप तय)', value: 'Charging / आरोप तलब करना' },
    { emoji: '🔍', label: 'PI Status', value: 'Application pending for PI / PI स्थिति' },
    { emoji: '📄', label: 'Statement u/s 313 CrPC', value: 'Statement u/s 313 CrPC / धारा 313 कथन' },
    { emoji: '🔬', label: 'Forensic / Medical Report', value: 'Forensic-Medical Report / फोरेंसिक रिपोर्ट' },
    { emoji: '🏃', label: 'NBW / Process (तलबी)', value: 'NBW-Process Issued / तलबी-वारंट जारी' },
    { emoji: '🧑‍⚖️', label: 'Plea of Guilt (स्वीकारोक्ति)', value: 'Plea of Guilt / स्वीकारोक्ति' },
    { emoji: '📜', label: 'Judgment (सजा/बरी)', value: 'Judgment / निर्णय (सजा-बरी)' }
  ],
  state: [
    { emoji: '⚖️', label: 'Bail Hearing (ज़मानत)', value: 'Bail Hearing / ज़मानत सुनवाई' },
    { emoji: '📝', label: 'Charge Sheet (चालान)', value: 'Charge Sheet / चार्जशीट (चालान)' },
    { emoji: '🔍', label: 'PI Status', value: 'Application pending for PI / PI स्थिति' },
    { emoji: '📄', label: 'Statement u/s 313 CrPC', value: 'Statement u/s 313 CrPC / धारा 313 कथन' },
    { emoji: '🏁', label: 'Final Order (फैसला)', value: 'Final Order / फैसला' }
  ],
  complaint: [
    { emoji: '✉️', label: 'Pre-summoning Evidence', value: 'Pre-summoning Evidence / समन पूर्व साक्ष्य' },
    { emoji: '⚖️', label: 'Summoning Order (समन आदेश)', value: 'Summoning Order / समनीकरण आदेश' },
    { emoji: '⚖️', label: 'Bail Hearing (ज़मानत)', value: 'Bail Hearing / ज़मानत सुनवाई' },
    { emoji: '📝', label: 'Plea in Absence', value: 'Plea in Absence / अनुपस्थिति में पैरवी' },
    { emoji: '🏁', label: 'Final Order (फैसला)', value: 'Final Order / फैसला' }
  ],
  family: [
    { emoji: '🧾', label: 'Maintenance Application', value: 'Maintenance Application / भरण-पोषण प्रार्थना' },
    { emoji: '💞', label: 'Mediation (सुलह)', value: 'Mediation / मेडिएशन-सुलह' },
    { emoji: '🔬', label: 'Counselling Session', value: 'Counselling / परामर्श सत्र' },
    { emoji: '💰', label: 'Interim Maintenance', value: 'Interim Maintenance / अंतरिम भरण-पोषण' },
    { emoji: '📜', label: 'Evidence (साक्ष्य)', value: 'Evidence / साक्ष्य-गवाही' },
    { emoji: '🏁', label: 'Final Order (फैसला)', value: 'Final Order / फैसला' }
  ],
  revenue: [
    { emoji: '📜', label: 'Khasra / Record Correction', value: 'Khasra-Gata Record Correction / खसरा-गाटा शुद्धि' },
    { emoji: '🗺️', label: ' demarcation (भू-निर्धारण)', value: 'Demarcation / भू-निर्धारण' },
    { emoji: '🧾', label: 'Mutation (दाखिल-खारिज)', value: 'Mutation Entry / दाखिल-खारिज' },
    { emoji: '💰', label: 'Compensation Award', value: 'Compensation Award / प्रतिकर निर्णय' },
    { emoji: '📑', label: 'Partition Suit Evidence', value: 'Partition Evidence / बंटवारा साक्ष्य' },
    { emoji: '🏁', label: 'Final Order (फैसला)', value: 'Final Order / फैसला' }
  ],
  misc: [
    { emoji: '🏛️', label: 'Court Fee Defect', value: 'Court Fee Defect / न्याय शुल्क आपत्ति' },
    { emoji: '📄', label: 'Vakalatnama Verification', value: 'Vakalatnama Verification / वकालतनामा जाँच' },
    { emoji: '📋', label: 'Office Report (विभागीय)', value: 'Office Report / विभागीय रिपोर्ट' },
    { emoji: '📦', label: 'Case Transfer', value: 'Case Transfer / मुकदमा स्थानांतरण' }
  ]
};

// Render pills for a given case type into #hearingStagePillsWrap
function renderHearingStagePills(caseType) {
  const wrap = document.getElementById('hearingStagePillsWrap');
  if (!wrap) return;

  const rawType = (caseType || '').trim().toLowerCase();
  let key = 'common';
  if (rawType.includes('civil')) key = 'civil';
  else if (rawType.includes('criminal')) key = 'criminal';
  else if (rawType.includes('state')) key = 'state';
  else if (rawType.includes('complaint')) key = 'complaint';
  else if (rawType.includes('family')) key = 'family';
  else if (rawType.includes('revenue')) key = 'revenue';
  else if (rawType.includes('misc')) key = 'misc';

  const common = HEARING_STAGE_PRESETS.common;
  const specific = (key !== 'common' && HEARING_STAGE_PRESETS[key]) || [];

  let html = '';
  if (specific.length > 0) {
    html += specific.map(p =>
      `<button type="button" class="stage-pill stage-pill-specific" onclick="setHearingStagePreset('${escapeHtml(p.value).replace(/'/g, "\\'")}')">${p.emoji} ${escapeHtml(p.label)}</button>`
    ).join('');
  }
  html += common.map(p =>
    `<button type="button" class="stage-pill" onclick="setHearingStagePreset('${escapeHtml(p.value).replace(/'/g, "\\'")}')">${p.emoji} ${escapeHtml(p.label)}</button>`
  ).join('');

  wrap.innerHTML = html;
}

if (typeof renderHearingStagePills !== 'undefined') window.renderHearingStagePills = renderHearingStagePills;

// ── Live Hearing Progression Preview Updater ─────────────────────────────────
function updateHearingLivePreview() {
  const dateInput = document.getElementById('hearingDate');
  const processInput = document.getElementById('hearingProcess');
  const dateVal = dateInput ? dateInput.value : '';
  const processVal = processInput ? processInput.value.trim() : '';

  const nextDateDisplay = document.getElementById('hearingNextDateDisplay');
  const nextProcessDisplay = document.getElementById('hearingNextProcessDisplay');
  const nextDayNameDisplay = document.getElementById('hearingNextDayNameDisplay');
  const intervalDisplay = document.getElementById('hearingIntervalDisplay');
  const dateReadableInput = document.getElementById('hearingDateReadable');

  if (nextProcessDisplay) {
    nextProcessDisplay.textContent = processVal || '— (Specify Stage)';
  }

  if (!dateVal) {
    if (nextDateDisplay) nextDateDisplay.textContent = 'Select Date Below';
    if (nextDayNameDisplay) nextDayNameDisplay.textContent = 'Choose date below';
    if (intervalDisplay) intervalDisplay.textContent = '—';
    if (dateReadableInput) dateReadableInput.value = '—';
    return;
  }

  const daysOfWeek = ['Sunday (रविवार)', 'Monday (सोमवार)', 'Tuesday (मंगलवार)', 'Wednesday (बुधवार)', 'Thursday (गुरुवार)', 'Friday (शुक्रवार)', 'Saturday (शनिवार)'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const parts = dateVal.split('-');
  const selectedDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const dayName = daysOfWeek[selectedDate.getDay()];
  const formattedReadable = `${parts[2]} ${months[selectedDate.getMonth()]} ${parts[0]} (${dayName.split(' ')[0]})`;

  if (dateReadableInput) dateReadableInput.value = formattedReadable;
  if (nextDateDisplay) nextDateDisplay.textContent = formatDateDMY(dateVal);
  if (nextDayNameDisplay) nextDayNameDisplay.textContent = dayName;

  // Calculate day difference from today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);
  const diffTime = selectedDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (intervalDisplay) {
    if (diffDays === 0) {
      intervalDisplay.textContent = '🎯 Today (आज)';
    } else if (diffDays === 1) {
      intervalDisplay.textContent = '⚡ Tomorrow (कल)';
    } else if (diffDays > 1) {
      intervalDisplay.textContent = `📅 In ${diffDays} Days (+${Math.round(diffDays / 7)} Wks)`;
    } else {
      intervalDisplay.textContent = `⚠️ Past Date (${Math.abs(diffDays)} Days ago)`;
    }
  }
}

if (typeof updateHearingLivePreview !== 'undefined') window.updateHearingLivePreview = updateHearingLivePreview;

// ==============================================================================
// Edit Previous Hearing Date (in Update Hearing tab)
// ==============================================================================

// Track the hearing record currently being edited
var _editingPrevHearingCaseNo = null;
var _editingPrevHearingRecord = null;

function toggleEditPrevDate() {
  const displayEl = document.getElementById('hearingInfoPrevDate');
  const editEl    = document.getElementById('hearingInfoPrevDateEdit');
  const editBtn   = document.getElementById('editPrevDateBtn');
  const saveBtn   = document.getElementById('savePrevDateBtn');
  if (!displayEl || !editEl) return;

  const isEditing = editEl.style.display !== 'none';

  if (isEditing) {
    // Cancel – go back to display mode
    editEl.style.display = 'none';
    displayEl.style.display = '';
    if (saveBtn) saveBtn.style.display = 'none';
    if (editBtn) { editBtn.textContent = '✏️'; editBtn.title = 'Edit previous date'; }
  } else {
    // Enter edit mode – pre-fill with raw ISO date from the stored record
    const rawDate = _editingPrevHearingRecord ? (_editingPrevHearingRecord.hearing_date || '') : '';
    editEl.value = rawDate;
    editEl.style.display = '';
    displayEl.style.display = 'none';
    if (saveBtn) saveBtn.style.display = '';
    if (editBtn) { editBtn.textContent = '✕'; editBtn.title = 'Cancel edit'; }
  }
}
if (typeof toggleEditPrevDate !== 'undefined') window.toggleEditPrevDate = toggleEditPrevDate;

async function savePrevDateEdit() {
  const editEl    = document.getElementById('hearingInfoPrevDateEdit');
  const displayEl = document.getElementById('hearingInfoPrevDate');
  const editBtn   = document.getElementById('editPrevDateBtn');
  const saveBtn   = document.getElementById('savePrevDateBtn');
  const caseNoEl  = document.getElementById('hearingCaseNo');

  if (!editEl || !editEl.value) {
    showToastNotification('⚠️ Please select a valid date first.', 2200);
    return;
  }

  const newDate  = editEl.value;           // YYYY-MM-DD
  const caseNo   = caseNoEl ? caseNoEl.value.trim() : (_editingPrevHearingCaseNo || '');

  if (!caseNo) {
    showToastNotification('⚠️ No case selected. Please load a case first.', 2200);
    return;
  }

  // Update in Supabase hearings table (update the most-recent past hearing for this case)
  if (supabaseClient && _editingPrevHearingRecord && _editingPrevHearingRecord.id) {
    try {
      const { error } = await supabaseClient
        .from('hearings')
        .update({ hearing_date: newDate })
        .eq('id', _editingPrevHearingRecord.id);
      if (error) console.error('Supabase prev date update error:', error);
    } catch (e) {
      console.error('Supabase prev date update exception:', e);
    }
  }

  // Update local allHearingRecords array
  if (_editingPrevHearingRecord) {
    _editingPrevHearingRecord.hearing_date = newDate;
  }

  // Refresh display
  const formatted = formatDateDMY(newDate);
  if (displayEl) {
    displayEl.value = formatted;
    displayEl.textContent = formatted;
  }

  // Return to read-only mode
  if (editEl)   editEl.style.display   = 'none';
  if (displayEl) displayEl.style.display = '';
  if (saveBtn)  saveBtn.style.display  = 'none';
  if (editBtn)  { editBtn.textContent = '✏️'; editBtn.title = 'Edit previous date'; }

  showToastNotification(`✅ Previous date for ${caseNo} updated to ${formatted}`, 2500);

  // Refresh tables so changed date reflects everywhere
  refreshAllCaseTables();
}
if (typeof savePrevDateEdit !== 'undefined') window.savePrevDateEdit = savePrevDateEdit;

// ==============================================================================
// Clipboard Copy & Toast Notifications
// ==============================================================================
function showToastNotification(message, duration = 2200) {
  let toast = document.getElementById('cmGlobalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cmGlobalToast';
    toast.className = 'cm-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  if (toast.__timeout) clearTimeout(toast.__timeout);
  toast.__timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}
if (typeof showToastNotification !== 'undefined') window.showToastNotification = showToastNotification;

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  textArea.style.top = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy error:', err);
  }
  document.body.removeChild(textArea);
}

function copyCaseNumberToClipboard(caseNumber, triggerEl = null) {
  if (!caseNumber || caseNumber === '—') return;
  const cleanNo = caseNumber.trim();

  const showFeedback = () => {
    showToastNotification(`📋 Copied: ${cleanNo}`);
    if (triggerEl) {
      triggerEl.classList.add('copy-success-pulse');
      setTimeout(() => {
        triggerEl.classList.remove('copy-success-pulse');
      }, 500);
    }
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(cleanNo).then(showFeedback).catch(() => {
      fallbackCopyText(cleanNo);
      showFeedback();
    });
  } else {
    fallbackCopyText(cleanNo);
    showFeedback();
  }
}
if (typeof copyCaseNumberToClipboard !== 'undefined') window.copyCaseNumberToClipboard = copyCaseNumberToClipboard;

function filterCaseTables(forceShowAll = false) {
  const searchInput = document.getElementById('globalSearch');
  const courtFilter = document.getElementById('searchCourtFilter');
  const typeFilter = document.getElementById('searchTypeFilter');
  const statusFilter = document.getElementById('searchStatusFilter');
  const dateFilter = document.getElementById('searchDateFilter');
  const countBadge = document.getElementById('searchResultCountBadge');
  const clearBtn = document.getElementById('clearSearchBtn');

  const query = (searchInput?.value || '').trim().toLowerCase();
  const selectedCourt = (courtFilter?.value || '').trim().toLowerCase();
  const selectedType = (typeFilter?.value || '').trim().toLowerCase();
  const selectedStatus = (statusFilter?.value || '').trim().toLowerCase();
  const selectedDate = (dateFilter?.value || '').trim().toLowerCase();

  const resultsTable = document.querySelector('#search .search-results-table');
  const resultsBody = resultsTable?.querySelector('tbody');

  const totalStatEl = document.getElementById('myCasesTotalStat');
  const pendingStatEl = document.getElementById('myCasesPendingStat');
  const todayStatEl = document.getElementById('myCasesTodayStat');
  const undatedStatEl = document.getElementById('myCasesUndatedStat');
  const disposedStatEl = document.getElementById('myCasesDisposedStat');

  const todayStr = new Date().toISOString().split('T')[0];
  const pendingCount = allCaseRecords.filter(c => !(c.caseStatus || '').toLowerCase().includes('dispose')).length;
  const disposedCount = allCaseRecords.filter(c => (c.caseStatus || '').toLowerCase().includes('dispose')).length;
  const todayCount = allCaseRecords.filter(c => c.nextHearing === todayStr).length;
  const undatedCount = allCaseRecords.filter(c => {
    if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false; // disposed = closed, not undated
    const nh = c.nextHearing;
    if (!nh || nh === '—' || nh === 'null' || !String(nh).trim()) return true;
    const iso = toISODate(nh);
    return !iso || iso < todayStr; // passed without being forwarded
  }).length;

  if (totalStatEl) totalStatEl.textContent = String(allCaseRecords.length);
  if (pendingStatEl) pendingStatEl.textContent = String(pendingCount);
  if (todayStatEl) todayStatEl.textContent = String(todayCount);
  if (undatedStatEl) undatedStatEl.textContent = String(undatedCount);
  if (disposedStatEl) disposedStatEl.textContent = String(disposedCount);

  let matches = allCaseRecords;

  // 1. Filter by Case Type
  if (selectedType) {
    matches = matches.filter(c => (c.caseType || 'civil').toLowerCase() === selectedType);
  }

  // 2. Filter by Court
  if (selectedCourt) {
    matches = matches.filter(c => {
      const courtVal = (c.courtName || c.criminalCourtName || '').trim().toLowerCase();
      return courtVal === selectedCourt;
    });
  }

  // 3. Filter by Case Status
  if (selectedStatus) {
    matches = matches.filter(c => {
      const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
      if (selectedStatus === 'disposed') return isDisposed;
      if (selectedStatus === 'pending') return !isDisposed;
      return true;
    });
  }

  // 4. Filter by Hearing Schedule
  if (selectedDate) {
    const todayStr = new Date().toISOString().split('T')[0];
    if (selectedDate === 'today') {
      matches = matches.filter(c => c.nextHearing && c.nextHearing === todayStr);
    } else if (selectedDate === 'upcoming') {
      const weekAhead = new Date();
      weekAhead.setDate(weekAhead.getDate() + 7);
      const weekAheadStr = weekAhead.toISOString().split('T')[0];
      matches = matches.filter(c => {
        if (!c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null') return false;
        return c.nextHearing >= todayStr && c.nextHearing <= weekAheadStr;
      });
    } else if (selectedDate === 'undated') {
      matches = matches.filter(c => {
        if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false; // disposed = closed, not undated
        const nh = c.nextHearing;
        if (!nh || nh === '—' || nh === 'null' || String(nh).trim() === '') return true;
        const iso = toISODate(nh);
        return !iso || iso < new Date().toISOString().split('T')[0];
      });
    } else if (selectedDate === 'scheduled') {
      matches = matches.filter(c => c.nextHearing && c.nextHearing !== '—' && c.nextHearing !== 'null' && c.nextHearing.trim() !== '');
    }
  }

  // 5. Filter by Search Query
  if (query) {
    matches = matches.filter(c => {
      const haystack = [
        c.caseNo,
        c.criminalCaseNumber,
        c.caseName,
        c.plaintiff,
        c.defendant,
        c.victimName,
        c.accusedName,
        c.clientName,
        c.criminalClientName,
        c.clientNumber,
        c.criminalClientNumber,
        c.courtName,
        c.criminalCourtName,
        c.policeStation,
        c.crimeSection,
        c.crimeNumber,
        c.caseType,
        c.caseStatus,
        remarksToPlainText(c.remark || c.remarks),
        c.hearingProcess
      ].filter(Boolean).join(' ').toLowerCase();

      return haystack.includes(query);
    });
  }

  if (countBadge) {
    countBadge.textContent = `Showing ${matches.length} of ${allCaseRecords.length} Cases`;
  }

  if (!resultsBody) return;

  if (matches.length === 0) {
    resultsBody.innerHTML = '<tr><td colspan="10" class="no-results">No cases found matching the specified filters. Try clearing or changing your filters.</td></tr>';
    renderSelectedCaseDetails(null);
    return;
  }

  resultsBody.innerHTML = '';
  matches.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.className = `clickable-row ${index === 0 ? 'selected-row' : ''}`;

    const caseNumber = item.caseNo || item.criminalCaseNumber || '—';
    const caseName = item.caseName || (item.plaintiff ? `${item.plaintiff} vs ${item.defendant}` : (item.victimName ? `${item.victimName} vs ${item.accusedName}` : '—'));
    const courtName = item.courtName || item.criminalCourtName || '—';
    const clientName = item.clientName || item.criminalClientName || '—';
    const caseType = (item.caseType || 'civil').toLowerCase();
    const isDisposed = (item.caseStatus || '').toLowerCase().includes('dispose');
    const statusBadge = isDisposed
      ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
      : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
    const nextHearing = formatDateDMY(item.nextHearing);
    const remark = item.remark || item.remarks || '';
    const remarkHtml = renderCaseTableRemarks(remark, caseNumber, caseName);

    tr.innerHTML = `
      <td style="text-align: center;"><strong>${index + 1}</strong></td>
      <td class="copyable-case-no" title="Double-click to copy Case Number"><strong>${escapeHtml(caseNumber)}</strong></td>
      <td>${escapeHtml(caseName)}</td>
      <td class="case-remark-cell">${remarkHtml}</td>
      <td>${escapeHtml(clientName)}</td>
      <td><span class="case-badge ${caseType}">${caseType.toUpperCase()}</span></td>
      <td>${escapeHtml(courtName)}</td>
      <td>${statusBadge}</td>
      <td><strong>${nextHearing}</strong></td>
      <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
        <div class="all-cases-actions-cell" style="display: inline-flex; align-items: center; justify-content: center; gap: 4px;">
          <button type="button" class="all-cases-action-btn details-btn" onclick="event.stopPropagation(); openCaseHistoryModalByNo('${escapeHtml(caseNumber)}')" title="View Case Proceedings & Dossier"><i class="fa-solid fa-eye"></i></button>
          <button type="button" class="all-cases-action-btn edit-btn" onclick="event.stopPropagation(); editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case Details"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
      </td>
    `;

    const caseNumTd = tr.children ? tr.children[1] : (tr.querySelectorAll ? tr.querySelectorAll('td')[1] : null);
    if (caseNumTd && typeof caseNumTd.addEventListener === 'function') {
      caseNumTd.addEventListener('dblclick', (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        copyCaseNumberToClipboard(caseNumber, caseNumTd);
      });
    }

    tr.addEventListener('click', () => {
      resultsBody.querySelectorAll('tr').forEach(r => r.classList.remove('selected-row'));
      tr.classList.add('selected-row');
      renderSelectedCaseDetails(item);
    });

    resultsBody.appendChild(tr);
  });

  renderSelectedCaseDetails(matches[0]);
}

if (typeof filterCaseTables !== 'undefined') window.filterCaseTables = filterCaseTables;

function setQuickCaseFilter(filterType, evt = null) {
  const searchInput = document.getElementById('globalSearch');
  const typeFilter = document.getElementById('searchTypeFilter');
  const courtFilter = document.getElementById('searchCourtFilter');
  const statusFilter = document.getElementById('searchStatusFilter');
  const dateFilter = document.getElementById('searchDateFilter');

  if (searchInput) searchInput.value = '';
  if (typeFilter) typeFilter.value = '';
  if (courtFilter) courtFilter.value = '';
  if (statusFilter) statusFilter.value = '';
  if (dateFilter) dateFilter.value = '';

  if (filterType === 'today' && dateFilter) {
    dateFilter.value = 'today';
  } else if (filterType === 'undated' && dateFilter) {
    dateFilter.value = 'undated';
  } else if (filterType === 'pending' && statusFilter) {
    statusFilter.value = 'pending';
  } else if (filterType === 'disposed' && statusFilter) {
    statusFilter.value = 'disposed';
  }

  // Update quick chip active states
  const chips = document.querySelectorAll('.quick-filter-chip');
  chips.forEach(chip => chip.classList.remove('active'));

  const activeEvt = evt || (typeof window !== 'undefined' && window.event ? window.event : null);
  if (activeEvt && activeEvt.target && activeEvt.target.classList && activeEvt.target.classList.contains('quick-filter-chip')) {
    activeEvt.target.classList.add('active');
  } else if (filterType === 'all' && chips[0]) {
    chips[0].classList.add('active');
  }

  filterCaseTables();
}

if (typeof setQuickCaseFilter !== 'undefined') window.setQuickCaseFilter = setQuickCaseFilter;


// ==============================================================================
// WhatsApp Client Notification Engine
// ==============================================================================
var lastUpdatedHearingCase = null;

function sendWhatsAppHearingNotice(caseNoOrObj, overrideDate, overrideStage) {
  let caseData = null;
  if (typeof caseNoOrObj === 'object' && caseNoOrObj !== null) {
    caseData = caseNoOrObj;
  } else if (typeof caseNoOrObj === 'string' && caseNoOrObj.trim()) {
    const q = caseNoOrObj.trim().toLowerCase();
    caseData = allCaseRecords.find(c => {
      const num1 = (c.caseNo || '').toLowerCase();
      const num2 = (c.criminalCaseNumber || '').toLowerCase();
      return num1 === q || num2 === q;
    });
  } else if (currentSelectedCase) {
    caseData = currentSelectedCase;
  } else if (lastUpdatedHearingCase) {
    caseData = lastUpdatedHearingCase;
  }

  if (!caseData) {
    alert('Please select or search a case first.');
    return;
  }

  const caseNo = caseData.caseNo || caseData.criminalCaseNumber || 'Case Record';
  const clientName = caseData.clientName || caseData.criminalClientName || 'Client';
  let clientPhone = String(caseData.clientNumber || caseData.criminalClientNumber || '').trim();
  const courtName = caseData.courtName || caseData.criminalCourtName || 'Court';
  const hearingDate = overrideDate || caseData.nextHearing;
  const stage = overrideStage || caseData.hearingProcess || caseData.process || 'Scheduled Hearing';
  const caseTitle = caseData.caseName || (caseData.plaintiff ? `${caseData.plaintiff} vs ${caseData.defendant}` : (caseData.victimName ? `${caseData.victimName} vs ${caseData.accusedName}` : caseNo));

  if (!clientPhone || clientPhone === '—' || clientPhone === 'null') {
    clientPhone = prompt(`Please enter client WhatsApp contact number for ${clientName}:`, '');
    if (!clientPhone || !clientPhone.trim()) return;
  }

  // Clean and normalize phone number
  let cleanDigits = clientPhone.replace(/\D/g, '');
  if (cleanDigits.length === 10) {
    cleanDigits = '91' + cleanDigits;
  }

  const formattedDate = formatDateHindi(hearingDate);

  const message = 
`⚖️ *COURT DATE REMINDER*  
━━━━━━━━━━━━━━━━━━

नमस्ते *${clientName} जी*,

आपके प्रकरण की *अगली सुनवाई* निर्धारित है:

📋 *केस नंबर:* ${caseNo}  
👥 *केस का नाम:* ${caseTitle}  
🏛️ *न्यायालय:* ${courtName}  
📅 *अगली सुनवाई:* *${formattedDate}*

🔔 *महत्वपूर्ण सूचना:*  
कृपया निर्धारित तारीख को *प्रातः 11:00 बजे Chamber/Seat पर उपस्थित रहें।*

📍 *OFFICE ADDRESS*  
*Civil Courts, Chamber No. 5*  
*District & Sessions Court Campus,*  
*Lakhimpur Kheri*

📞 *संपर्क हेतु:*

*श्री सुशील कुमार मिश्रा*  
वरिष्ठ अधिवक्ता  
📱 9839810466

*श्री अतुल कुमार मिश्रा*  
अधिवक्ता  
📱 8318194561

*श्री सुभाष चन्द्र मिश्रा*  
अधिवक्ता  
📱 8081840363

━━━━━━━━━━━━━━━━━━  
🙏 *धन्यवाद*`;

  const waUrl = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

if (typeof sendWhatsAppHearingNotice !== 'undefined') window.sendWhatsAppHearingNotice = sendWhatsAppHearingNotice;

// ==============================================================================
// Courts & Form Options
// ==============================================================================

var caseTypes = [
  { value: 'civil', label: '⚖️ Civil Cases' },
  { value: 'state', label: '🚨 State Cases (Criminal / FIR)' },
  { value: 'family', label: '👨‍👩‍👧 Family Cases (Matrimonial)' },
  { value: 'revenue', label: '🌾 Revenue Cases (Land / Tehsil)' },
  { value: 'misc_civil', label: '📑 Misc Civil (Appeals / Revisions)' },
  { value: 'misc_criminal', label: '⚖️ Misc Criminal (Bails / Appeals)' },
  { value: 'complaint', label: '📢 Complaint Cases (Sec 138 / 200 CrPC)' }
];

function renderCaseTypeOptions() {
  const dropdowns = [
    document.getElementById('caseTypeDropdown'),
    document.getElementById('updateCaseTypeDropdown')
  ];

  dropdowns.forEach((dropdown) => {
    if (!dropdown) return;
    const currentVal = dropdown.value;
    dropdown.innerHTML = '<option value="">-- Select Case Type --</option>';
    caseTypes.forEach((caseType) => {
      const option = document.createElement('option');
      option.value = caseType.value;
      option.textContent = caseType.label;
      dropdown.appendChild(option);
    });
    if (currentVal) dropdown.value = currentVal;
  });
}

function renderCourtOptions() {
  const selects = [
    document.getElementById('courtName'),
    document.getElementById('updateCourtName'),
    document.getElementById('stateCourtName'),
    document.getElementById('updateStateCourtName'),
    document.getElementById('familyCourtName'),
    document.getElementById('updateFamilyCourtName'),
    document.getElementById('revenueCourtName'),
    document.getElementById('updateRevenueCourtName'),
    document.getElementById('miscCivilCourtName'),
    document.getElementById('updateMiscCivilCourtName'),
    document.getElementById('miscCriminalCourtName'),
    document.getElementById('updateMiscCriminalCourtName'),
    document.getElementById('complaintCourtName'),
    document.getElementById('updateComplaintCourtName'),
    document.getElementById('criminalCourtName'),
    document.getElementById('updateCriminalCourtName'),
    document.getElementById('transferToCourt'),
    document.getElementById('bulkTransferFromCourt'),
    document.getElementById('bulkTransferToCourt')
  ];

  selects.forEach((courtSelect) => {
    if (!courtSelect) return;
    const currentVal = courtSelect.value;
    courtSelect.innerHTML = '<option value="">-- Select Court --</option>';
    courts.forEach((court) => {
      const option = document.createElement('option');
      option.value = court;
      option.textContent = court;
      courtSelect.appendChild(option);
    });
    if (currentVal) courtSelect.value = currentVal;
  });

  renderSearchCourtFilterOptions();
  if (typeof populateHelperCourtDropdowns === 'function') {
    populateHelperCourtDropdowns();
  }
}

function renderSearchCourtFilterOptions() {
  const filterSelect = document.getElementById('searchCourtFilter');
  if (!filterSelect) return;

  const currentVal = filterSelect.value || '';
  filterSelect.innerHTML = '<option value="">🏛️ All Courts</option>';

  const uniqueCourts = new Set();
  const deletedCourts = getDeletedCourtsSet();
  courts.forEach(c => {
    if (c && c.trim() && !deletedCourts.has(c.trim().toLowerCase())) uniqueCourts.add(c.trim());
  });
  allCaseRecords.forEach(item => {
    const cName = item.courtName || item.criminalCourtName;
    if (cName && cName.trim() && !deletedCourts.has(cName.trim().toLowerCase())) uniqueCourts.add(cName.trim());
  });

  Array.from(uniqueCourts).sort().forEach(court => {
    const opt = document.createElement('option');
    opt.value = court;
    opt.textContent = court;
    filterSelect.appendChild(opt);
  });

  if (currentVal) filterSelect.value = currentVal;

  const causeListFilter = document.getElementById('causeListCourtFilter');
  if (causeListFilter) {
    const prevCauseVal = causeListFilter.value || '';
    causeListFilter.innerHTML = '<option value="">🏛️ All Courts</option>';
    Array.from(uniqueCourts).sort().forEach(court => {
      const opt = document.createElement('option');
      opt.value = court;
      opt.textContent = court;
      causeListFilter.appendChild(opt);
    });
    if (prevCauseVal) causeListFilter.value = prevCauseVal;
  }

  const causeListMainFilter = document.getElementById('causeListCourtFilterSelect');
  if (causeListMainFilter) {
    const prevMainVal = causeListMainFilter.value || '';
    causeListMainFilter.innerHTML = '<option value="">🏛️ All Courts</option>';
    Array.from(uniqueCourts).sort().forEach(court => {
      const opt = document.createElement('option');
      opt.value = court;
      opt.textContent = court;
      causeListMainFilter.appendChild(opt);
    });
    if (prevMainVal) causeListMainFilter.value = prevMainVal;
  }

  const allCasesCourtFilter = document.getElementById('allCasesCourtSelect');
  if (allCasesCourtFilter) {
    const prevAllVal = allCasesCourtFilter.value || '';
    allCasesCourtFilter.innerHTML = '<option value="">All Courts</option>';
    Array.from(uniqueCourts).sort().forEach(court => {
      const opt = document.createElement('option');
      opt.value = court;
      opt.textContent = court;
      allCasesCourtFilter.appendChild(opt);
    });
    if (prevAllVal) allCasesCourtFilter.value = prevAllVal;
  }
}

function renderCriminalCourtOptions() {
  const selects = [
    document.getElementById('criminalCourtName'),
    document.getElementById('updateCriminalCourtName')
  ];

  selects.forEach((criminalCourtSelect) => {
    if (!criminalCourtSelect) return;
    const currentVal = criminalCourtSelect.value;
    criminalCourtSelect.innerHTML = '<option value="">-- Select Court --</option>';
    courts.forEach((court) => {
      const option = document.createElement('option');
      option.value = court;
      option.textContent = court;
      criminalCourtSelect.appendChild(option);
    });
    if (currentVal) criminalCourtSelect.value = currentVal;
  });
}

function toggleCaseFormByType() {
  const selectedType = document.getElementById('caseTypeDropdown')?.value || 'civil';
  const panels = {
    civil: document.getElementById('generalCaseForm'),
    state: document.getElementById('stateCaseForm'),
    criminal: document.getElementById('stateCaseForm'),
    family: document.getElementById('familyCaseForm'),
    revenue: document.getElementById('revenueCaseForm'),
    misc_civil: document.getElementById('miscCivilCaseForm'),
    misc_criminal: document.getElementById('miscCriminalCaseForm'),
    complaint: document.getElementById('complaintCaseForm')
  };

  const activePanel = panels[selectedType] || panels.civil;

  ['generalCaseForm', 'stateCaseForm', 'familyCaseForm', 'revenueCaseForm', 'miscCivilCaseForm', 'miscCriminalCaseForm', 'complaintCaseForm', 'criminalCaseForm'].forEach(id => {
    const p = document.getElementById(id);
    if (!p) return;
    if (p === activePanel) {
      p.classList.remove('hidden-case-form');
      p.querySelectorAll('input, select, textarea').forEach(field => { field.disabled = false; });
    } else {
      p.classList.add('hidden-case-form');
      p.querySelectorAll('input, select, textarea').forEach(field => { field.disabled = true; });
    }
  });

  if (typeof clearCaseNumberValidationBadges === 'function') {
    clearCaseNumberValidationBadges();
  }
}

function toggleUpdateCaseFormByType() {
  const selectedType = document.getElementById('updateCaseTypeDropdown')?.value || 'civil';
  const panels = {
    civil: document.getElementById('updateGeneralCaseForm'),
    state: document.getElementById('updateStateCaseForm'),
    criminal: document.getElementById('updateStateCaseForm'),
    family: document.getElementById('updateFamilyCaseForm'),
    revenue: document.getElementById('updateRevenueCaseForm'),
    misc_civil: document.getElementById('updateMiscCivilCaseForm'),
    misc_criminal: document.getElementById('updateMiscCriminalCaseForm'),
    complaint: document.getElementById('updateComplaintCaseForm')
  };

  const activePanel = panels[selectedType] || panels.civil;

  ['updateGeneralCaseForm', 'updateStateCaseForm', 'updateFamilyCaseForm', 'updateRevenueCaseForm', 'updateMiscCivilCaseForm', 'updateMiscCriminalCaseForm', 'updateComplaintCaseForm', 'updateCriminalCaseForm'].forEach(id => {
    const p = document.getElementById(id);
    if (!p) return;
    if (p === activePanel) {
      p.classList.remove('hidden-case-form');
      p.querySelectorAll('input:not([readonly]), select, textarea').forEach(field => { field.disabled = false; });
    } else {
      p.classList.add('hidden-case-form');
      p.querySelectorAll('input:not([readonly]), select, textarea').forEach(field => { field.disabled = true; });
    }
  });

  // Ensure Parties / Co-Parties Remark section is positioned beneath the primary parties of the active panel
  const targetPartyAnchor = {
    civil: document.getElementById('updateDefendant')?.closest('.form-group'),
    state: document.getElementById('updateStateAccusedName')?.closest('.form-group'),
    criminal: document.getElementById('updateStateAccusedName')?.closest('.form-group'),
    family: document.getElementById('updateFamilyRespondent')?.closest('.form-group'),
    revenue: document.getElementById('updateRevenueOppositeParty')?.closest('.form-group'),
    misc_civil: document.getElementById('updateMiscOppositeParty')?.closest('.form-group'),
    misc_criminal: document.getElementById('updateMiscCrimOppositeParty')?.closest('.form-group'),
    complaint: document.getElementById('updateComplaintAccused')?.closest('.form-group')
  };
  const anchor = targetPartyAnchor[selectedType] || targetPartyAnchor.civil;
  const remarkWrapper = document.getElementById('updateCaseRemarkWrapper');
  if (anchor && remarkWrapper && anchor.parentNode) {
    anchor.parentNode.insertBefore(remarkWrapper, anchor.nextSibling);
  }
}

function setupOtherFieldToggles() {
  const pairs = [
    ['miscCivilProceedingType', 'miscCivilProceedingTypeCustom'],
    ['miscCriminalProceedingType', 'miscCriminalProceedingTypeCustom'],
    ['updateMiscCivilProceedingType', 'updateMiscCivilProceedingTypeCustom'],
    ['updateMiscCriminalProceedingType', 'updateMiscCriminalProceedingTypeCustom'],
    ['statePoliceStation', 'statePoliceStationCustom'],
    ['miscCriminalPoliceStation', 'miscCriminalPoliceStationCustom'],
    ['updateStatePoliceStation', 'updateStatePoliceStationCustom'],
    ['updateMiscCriminalPoliceStation', 'updateMiscCriminalPoliceStationCustom'],
    ['familyMatterType', 'familyMatterTypeCustom'],
    ['updateFamilyMatterType', 'updateFamilyMatterTypeCustom'],
    ['revenueActSection', 'revenueActSectionCustom'],
    ['updateRevenueActSection', 'updateRevenueActSectionCustom'],
    ['complaintType', 'complaintTypeCustom'],
    ['updateComplaintType', 'updateComplaintTypeCustom'],
    ['complaintPoliceStation', 'complaintPoliceStationCustom'],
    ['updateComplaintPoliceStation', 'updateComplaintPoliceStationCustom']
  ];

  pairs.forEach(([selectId, customInputId]) => {
    const select = document.getElementById(selectId);
    const customInput = document.getElementById(customInputId);
    if (!select || !customInput) return;

    const check = () => {
      const val = (select.value || '').toLowerCase();
      const isOther = val.startsWith('other') || val === 'other';
      if (isOther) {
        customInput.style.display = 'block';
        customInput.focus();
      } else {
        customInput.style.display = 'none';
        customInput.value = '';
      }
    };

    select.addEventListener('change', check);
  });
}

function insertRemarkChip(textareaId, textToInsert) {
  const textarea = document.getElementById(textareaId);
  if (!textarea) return;
  const current = (textarea.value || '').trim();
  if (!current) {
    textarea.value = textToInsert;
  } else if (!current.includes(textToInsert.trim())) {
    textarea.value = current + (current.endsWith(';') || current.endsWith('.') ? ' ' : '; ') + textToInsert;
  }
  textarea.focus();
  const len = textarea.value.length;
  try { textarea.setSelectionRange(len, len); } catch (e) {}
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
}
if (typeof insertRemarkChip !== 'undefined') window.insertRemarkChip = insertRemarkChip;

// ==============================================================================
// App Initialization, Form Listeners, and Mobile Navigation
// ==============================================================================

function initializeApp() {
  if (window.__caseMgmtInitialized) return;
  window.__caseMgmtInitialized = true;

  // 0. Check authentication & restore session immediately
  checkInitialAuth();
  initActivityListeners();
  loadCaseModals();
  loadPrintTemplates();

  // Wire Auth & Logout actions
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleAdminLogin);
  }

  const guestBtn = document.getElementById('guestModeBtn');
  if (guestBtn) {
    guestBtn.addEventListener('click', handleGuestLogin);
  }

  const adminLogoutBtn = document.getElementById('adminLogoutBtn');
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', handleAdminLogout);
  }

  const guestLogoutBtn = document.getElementById('guestLogoutBtn');
  if (guestLogoutBtn) {
    guestLogoutBtn.addEventListener('click', handleLogout);
  }

  const guestSearch = document.getElementById('guestSearch');
  if (guestSearch) {
    guestSearch.addEventListener('input', (e) => renderGuestTable(e.target.value));
  }

  setupOtherFieldToggles();
  if (typeof attachCaseNumberDuplicateListeners === 'function') {
    attachCaseNumberDuplicateListeners();
  }

  // 1. Sidebar Navigation (Mobile Drawer + Desktop Icon-Only Collapsible Toggle)
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function closeMobileSidebar() {
    const sb = document.querySelector('.sidebar') || document.querySelector('.sidenav');
    if (sb) {
      sb.classList.remove('mobile-open');
      sb.classList.remove('open');
    }
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) overlay.classList.remove('active');
  }
  window.closeMobileSidebar = closeMobileSidebar;

  // Restore desktop collapsed state from localStorage
  try {
    if (window.innerWidth > 1024 && localStorage.getItem('cms_sidebar_collapsed') === '1') {
      document.body.classList.add('sidebar-collapsed');
    }
  } catch (e) {}

  if (sidebarToggleBtn) {
    sidebarToggleBtn.onclick = toggleMobileSidebar;
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
  }

  // Global document click listener: collapse sideNav when clicking outside on screen
  document.addEventListener('click', (e) => {
    const sb = document.querySelector('.sidebar') || document.querySelector('.sidenav');
    const overlay = document.getElementById('sidebarOverlay');
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const bottomMoreBtn = document.getElementById('bottomNavMoreBtn');

    if (sb && (sb.classList.contains('mobile-open') || sb.classList.contains('open'))) {
      if (!sb.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target)) && (!bottomMoreBtn || !bottomMoreBtn.contains(e.target))) {
        closeMobileSidebar();
      }
    }
  });

  // Auto-close mobile drawer when tapping links on small/half screens
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileSidebar();
    });
  });

  // Initialize mobile back button interception & browser history tracking
  if (typeof setupMobileBackAndHistory === 'function') {
    setupMobileBackAndHistory();
  }

  // Listen to browser hash navigation
  window.addEventListener('hashchange', () => {
    const hashTab = (window.location.hash || '').replace(/^#/, '').trim();
    if (hashTab && document.getElementById(hashTab) && hashTab !== currentActiveTabId) {
      showTab(hashTab, null, 'restore');
    }
  });

  const searchInput = document.getElementById('globalSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => filterCaseTables());
  }

  const searchCourtFilter = document.getElementById('searchCourtFilter');
  if (searchCourtFilter) {
    searchCourtFilter.addEventListener('change', () => filterCaseTables());
  }

  const searchTypeFilter = document.getElementById('searchTypeFilter');
  if (searchTypeFilter) {
    searchTypeFilter.addEventListener('change', () => filterCaseTables());
  }

  const searchStatusFilter = document.getElementById('searchStatusFilter');
  if (searchStatusFilter) {
    searchStatusFilter.addEventListener('change', () => filterCaseTables());
  }

  const searchDateFilter = document.getElementById('searchDateFilter');
  if (searchDateFilter) {
    searchDateFilter.addEventListener('change', () => filterCaseTables());
  }

  const clearSearchBtn = document.getElementById('clearSearchBtn');
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (searchCourtFilter) searchCourtFilter.value = '';
      if (searchTypeFilter) searchTypeFilter.value = '';
      if (searchStatusFilter) searchStatusFilter.value = '';
      if (searchDateFilter) searchDateFilter.value = '';
      document.querySelectorAll('.quick-filter-chip').forEach(chip => chip.classList.remove('active'));
      filterCaseTables();
    });
  }

  // Cause List Controls
  const causeListDateInput = document.getElementById('causeListDateInput');
  const causeListCourtFilterSelect = document.getElementById('causeListCourtFilterSelect');
  if (causeListDateInput) {
    causeListDateInput.addEventListener('change', (e) => {
      renderCauseListTable(e.target.value, causeListCourtFilterSelect ? causeListCourtFilterSelect.value : '');
    });
  }
  if (causeListCourtFilterSelect) {
    causeListCourtFilterSelect.addEventListener('change', (e) => {
      renderCauseListTable(causeListDateInput ? causeListDateInput.value : '', e.target.value);
    });
  }

  const exportCsvBtn = document.getElementById('exportCsvBtn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', exportAllCasesToCSV);
  }

  // 2. Handle Add Case Form Submit (Live Supabase sync & strict duplicate prevention)
  let isSubmittingAddCase = false;
async function handleAddCaseSubmit(e) {
  e.preventDefault();
  if (isSubmittingAddCase) {
    console.warn('Case submission already in progress, duplicate submit blocked.');
    return;
  }
  const form = e.target || document.querySelector('#add form');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-paper-plane"></i> Submit Case Record';

    const caseType = document.getElementById('caseTypeDropdown')?.value || 'civil';
    
    let newCase = {};
    if (caseType === 'state' || caseType === 'criminal') {
      const stateCaseNumber = document.getElementById('stateCaseNumber')?.value?.trim() || document.getElementById('criminalCaseNumber')?.value?.trim();
      const stateCrimeYear = document.getElementById('stateCrimeYear')?.value?.trim() || document.getElementById('crimeYear')?.value?.trim();
      const statePoliceSelect = document.getElementById('statePoliceStation')?.value?.trim() || document.getElementById('policeStation')?.value?.trim();
      const statePoliceCustom = document.getElementById('statePoliceStationCustom')?.value?.trim();
      const statePoliceStation = (statePoliceSelect === 'Other' && statePoliceCustom) ? statePoliceCustom : (statePoliceSelect || statePoliceCustom || '');

      const stateCrimeSection = document.getElementById('stateCrimeSection')?.value?.trim() || document.getElementById('crimeSection')?.value?.trim();
      const stateFilingDate = document.getElementById('stateFilingDate')?.value?.trim() || document.getElementById('crimeFilingDate')?.value?.trim();
      const stateCrimeNumber = document.getElementById('stateCrimeNumber')?.value?.trim() || document.getElementById('crimeNumber')?.value?.trim();
      const stateFirstParty = document.getElementById('stateFirstParty')?.value?.trim() || 'State of U.P.';
      const stateAccusedName = document.getElementById('stateAccusedName')?.value?.trim() || document.getElementById('accusedName')?.value?.trim();
      const stateCourtName = document.getElementById('stateCourtName')?.value?.trim() || document.getElementById('criminalCourtName')?.value?.trim();
      const stateClientName = document.getElementById('stateClientName')?.value?.trim() || document.getElementById('criminalClientName')?.value?.trim();
      const stateClientNumber = document.getElementById('stateClientNumber')?.value?.trim() || document.getElementById('criminalClientNumber')?.value?.trim();

      newCase = {
        caseType: 'state',
        caseNo: stateCaseNumber,
        caseYear: stateCrimeYear,
        criminalCaseNumber: stateCaseNumber,
        crimeYear: stateCrimeYear,
        policeStation: statePoliceStation,
        crimeSection: stateCrimeSection,
        crimeFilingDate: stateFilingDate,
        filingDate: stateFilingDate,
        crimeNumber: stateCrimeNumber,
        firstParty: stateFirstParty,
        victimName: stateFirstParty,
        accusedName: stateAccusedName,
        courtName: stateCourtName,
        criminalCourtName: stateCourtName,
        clientName: stateClientName,
        criminalClientName: stateClientName,
        clientNumber: stateClientNumber,
        criminalClientNumber: stateClientNumber,
        caseName: `${stateFirstParty} vs ${stateAccusedName}`,
        partyName: stateAccusedName,
        nextHearing: '—',
        caseStatus: 'Pending',
        docLink: document.getElementById('stateDocLink')?.value?.trim() || document.getElementById('criminalDocLink')?.value?.trim() || '',
        remark: document.getElementById('stateCaseRemark')?.value?.trim() || document.getElementById('criminalCaseRemark')?.value?.trim() || ''
      };
    } else if (caseType === 'family') {
      const familyCaseNumber = document.getElementById('familyCaseNumber')?.value?.trim();
      const familyCaseYear = document.getElementById('familyCaseYear')?.value?.trim();
      const familyMatterSelect = document.getElementById('familyMatterType')?.value?.trim();
      const familyMatterCustom = document.getElementById('familyMatterTypeCustom')?.value?.trim();
      const familyMatterType = (familyMatterSelect && familyMatterSelect.toLowerCase().startsWith('other') && familyMatterCustom) ? familyMatterCustom : (familyMatterSelect || familyMatterCustom || 'Maintenance (Sec 125 CrPC)');

      const familyFilingDate = document.getElementById('familyFilingDate')?.value?.trim();
      const familyPetitioner = document.getElementById('familyPetitioner')?.value?.trim();
      const familyRespondent = document.getElementById('familyRespondent')?.value?.trim();
      const familyMarriageDate = document.getElementById('familyMarriageDate')?.value?.trim();
      const familyMaintenance = document.getElementById('familyMaintenance')?.value?.trim();
      const familyCourtName = document.getElementById('familyCourtName')?.value?.trim();
      const familyClientName = document.getElementById('familyClientName')?.value?.trim();
      const familyClientNumber = document.getElementById('familyClientNumber')?.value?.trim();

      newCase = {
        caseType: 'family',
        caseNo: familyCaseNumber,
        caseYear: familyCaseYear,
        matterType: familyMatterType,
        filingDate: familyFilingDate,
        petitioner: familyPetitioner,
        respondent: familyRespondent,
        marriageDate: familyMarriageDate,
        maintenanceDetail: familyMaintenance,
        courtName: familyCourtName,
        clientName: familyClientName,
        clientNumber: familyClientNumber,
        caseName: `${familyPetitioner} vs ${familyRespondent}`,
        partyName: familyRespondent,
        nextHearing: '—',
        caseStatus: 'Pending',
        docLink: document.getElementById('familyDocLink')?.value?.trim() || '',
        remark: document.getElementById('familyCaseRemark')?.value?.trim() || ''
      };
    } else if (caseType === 'revenue') {
      const revenueCaseNumber = document.getElementById('revenueCaseNumber')?.value?.trim();
      const revenueCaseYear = document.getElementById('revenueCaseYear')?.value?.trim();
      const revenueActSelect = document.getElementById('revenueActSection')?.value?.trim();
      const revenueActCustom = document.getElementById('revenueActSectionCustom')?.value?.trim();
      const revenueActSection = (revenueActSelect && revenueActSelect.toLowerCase().startsWith('other') && revenueActCustom) ? revenueActCustom : (revenueActSelect || revenueActCustom || 'Sec 34 (Mutation / दाखिल खारिज)');

      const revenueFilingDate = document.getElementById('revenueFilingDate')?.value?.trim();
      const revenueVillage = document.getElementById('revenueVillage')?.value?.trim();
      const revenueTehsil = document.getElementById('revenueTehsil')?.value?.trim();
      const revenueGataNo = document.getElementById('revenueGataNo')?.value?.trim();
      const revenueApplicant = document.getElementById('revenueApplicant')?.value?.trim();
      const revenueOppositeParty = document.getElementById('revenueOppositeParty')?.value?.trim();
      const revenueCourtName = document.getElementById('revenueCourtName')?.value?.trim();
      const revenueClientName = document.getElementById('revenueClientName')?.value?.trim();
      const revenueClientNumber = document.getElementById('revenueClientNumber')?.value?.trim();

      newCase = {
        caseType: 'revenue',
        caseNo: revenueCaseNumber,
        caseYear: revenueCaseYear,
        revenueActSection: revenueActSection,
        actSection: revenueActSection,
        villageMauja: revenueVillage,
        village: revenueVillage,
        parganaTehsil: revenueTehsil,
        tehsil: revenueTehsil,
        gataKhataNo: revenueGataNo,
        gataNo: revenueGataNo,
        applicant: revenueApplicant,
        oppositeParty: revenueOppositeParty,
        filingDate: revenueFilingDate,
        courtName: revenueCourtName,
        clientName: revenueClientName,
        clientNumber: revenueClientNumber,
        caseName: `${revenueApplicant} vs ${revenueOppositeParty}`,
        partyName: revenueOppositeParty,
        nextHearing: '—',
        caseStatus: 'Pending',
        docLink: document.getElementById('revenueDocLink')?.value?.trim() || '',
        remark: document.getElementById('revenueCaseRemark')?.value?.trim() || ''
      };
    } else if (caseType === 'misc_civil') {
      const miscCivilCaseNumber = document.getElementById('miscCivilCaseNumber')?.value?.trim();
      const miscCivilCaseYear = document.getElementById('miscCivilCaseYear')?.value?.trim();
      const miscCivilOriginalCase = document.getElementById('miscCivilOriginalCase')?.value?.trim();
      const miscCivilProcSelect = document.getElementById('miscCivilProceedingType')?.value?.trim();
      const miscCivilProcCustom = document.getElementById('miscCivilProceedingTypeCustom')?.value?.trim();
      const miscCivilProceedingType = (miscCivilProcSelect && miscCivilProcSelect.toLowerCase().startsWith('other') && miscCivilProcCustom) ? miscCivilProcCustom : (miscCivilProcSelect || miscCivilProcCustom || 'Execution Petition (डिग्री तामीली)');

      const miscCivilApplicant = document.getElementById('miscCivilApplicant')?.value?.trim();
      const miscCivilOppositeParty = document.getElementById('miscCivilOppositeParty')?.value?.trim();
      const miscCivilCourtName = document.getElementById('miscCivilCourtName')?.value?.trim();
      const miscCivilFilingDate = document.getElementById('miscCivilFilingDate')?.value?.trim();
      const miscCivilClientName = document.getElementById('miscCivilClientName')?.value?.trim();
      const miscCivilClientNumber = document.getElementById('miscCivilClientNumber')?.value?.trim();

      newCase = {
        caseType: 'misc_civil',
        caseNo: miscCivilCaseNumber,
        caseYear: miscCivilCaseYear,
        originalCaseNumber: miscCivilOriginalCase,
        originalCase: miscCivilOriginalCase,
        proceedingType: miscCivilProceedingType,
        filingDate: miscCivilFilingDate,
        applicant: miscCivilApplicant,
        oppositeParty: miscCivilOppositeParty,
        courtName: miscCivilCourtName,
        clientName: miscCivilClientName,
        clientNumber: miscCivilClientNumber,
        caseName: `${miscCivilApplicant} vs ${miscCivilOppositeParty}`,
        partyName: miscCivilOppositeParty,
        nextHearing: '—',
        caseStatus: 'Pending',
        docLink: document.getElementById('miscCivilDocLink')?.value?.trim() || '',
        remark: document.getElementById('miscCivilCaseRemark')?.value?.trim() || ''
      };
    } else if (caseType === 'misc_criminal') {
      const miscCriminalCaseNumber = document.getElementById('miscCriminalCaseNumber')?.value?.trim();
      const miscCriminalCaseYear = document.getElementById('miscCriminalCaseYear')?.value?.trim();
      const miscCriminalOriginalCase = document.getElementById('miscCriminalOriginalCase')?.value?.trim();
      const miscCrimProcSelect = document.getElementById('miscCriminalProceedingType')?.value?.trim();
      const miscCrimProcCustom = document.getElementById('miscCriminalProceedingTypeCustom')?.value?.trim();
      const miscCriminalProceedingType = (miscCrimProcSelect && miscCrimProcSelect.toLowerCase().startsWith('other') && miscCrimProcCustom) ? miscCrimProcCustom : (miscCrimProcSelect || miscCrimProcCustom || 'Anticipatory Bail (अग्रिम जमानत)');

      const miscCrimPsSelect = document.getElementById('miscCriminalPoliceStation')?.value?.trim();
      const miscCrimPsCustom = document.getElementById('miscCriminalPoliceStationCustom')?.value?.trim();
      const miscCriminalPoliceStation = (miscCrimPsSelect === 'Other' && miscCrimPsCustom) ? miscCrimPsCustom : (miscCrimPsSelect || miscCrimPsCustom || '');

      const miscCriminalCrimeSection = document.getElementById('miscCriminalCrimeSection')?.value?.trim();
      const miscCriminalApplicant = document.getElementById('miscCriminalApplicant')?.value?.trim();
      const miscCriminalOppositeParty = document.getElementById('miscCriminalOppositeParty')?.value?.trim() || 'State of U.P.';
      const miscCriminalCourtName = document.getElementById('miscCriminalCourtName')?.value?.trim();
      const miscCriminalFilingDate = document.getElementById('miscCriminalFilingDate')?.value?.trim();
      const miscCriminalClientName = document.getElementById('miscCriminalClientName')?.value?.trim();
      const miscCriminalClientNumber = document.getElementById('miscCriminalClientNumber')?.value?.trim();

      newCase = {
        caseType: 'misc_criminal',
        caseNo: miscCriminalCaseNumber,
        caseYear: miscCriminalCaseYear,
        originalCaseNumber: miscCriminalOriginalCase,
        originalCase: miscCriminalOriginalCase,
        proceedingType: miscCriminalProceedingType,
        policeStation: miscCriminalPoliceStation,
        crimeSection: miscCriminalCrimeSection,
        filingDate: miscCriminalFilingDate,
        applicant: miscCriminalApplicant,
        oppositeParty: miscCriminalOppositeParty,
        courtName: miscCriminalCourtName,
        clientName: miscCriminalClientName,
        clientNumber: miscCriminalClientNumber,
        caseName: `${miscCriminalApplicant} vs ${miscCriminalOppositeParty}`,
        partyName: miscCriminalApplicant,
        nextHearing: '—',
        caseStatus: 'Pending',
        docLink: document.getElementById('miscCriminalDocLink')?.value?.trim() || '',
        remark: document.getElementById('miscCriminalCaseRemark')?.value?.trim() || ''
      };
    } else if (caseType === 'complaint') {
      const complaintCaseNumber = document.getElementById('complaintCaseNumber')?.value?.trim();
      const complaintCaseYear = document.getElementById('complaintCaseYear')?.value?.trim();
      const compSelect = document.getElementById('complaintType')?.value?.trim();
      const compCustom = document.getElementById('complaintTypeCustom')?.value?.trim();
      const complaintType = (compSelect && compSelect.toLowerCase().startsWith('other') && compCustom) ? compCustom : (compCustom || compSelect || 'Cheque Bounce (Sec 138 NI Act)');

      const compPsSelect = document.getElementById('complaintPoliceStation')?.value?.trim();
      const compPsCustom = document.getElementById('complaintPoliceStationCustom')?.value?.trim();
      const complaintPoliceStation = (compPsSelect === 'Other' && compPsCustom) ? compPsCustom : (compPsSelect || compPsCustom || '');

      const complaintSectionAct = document.getElementById('complaintSectionAct')?.value?.trim();
      const complaintComplainant = document.getElementById('complaintComplainant')?.value?.trim();
      const complaintAccusedName = document.getElementById('complaintAccusedName')?.value?.trim();
      const complaintCourtName = document.getElementById('complaintCourtName')?.value?.trim();
      const complaintFilingDate = document.getElementById('complaintFilingDate')?.value?.trim();
      const complaintClientName = document.getElementById('complaintClientName')?.value?.trim();
      const complaintClientNumber = document.getElementById('complaintClientNumber')?.value?.trim();

      newCase = {
        caseType: 'complaint',
        caseNo: complaintCaseNumber,
        caseYear: complaintCaseYear,
        complaintType,
        sectionAct: complaintSectionAct,
        complainant: complaintComplainant,
        accusedName: complaintAccusedName,
        policeStation: complaintPoliceStation,
        filingDate: complaintFilingDate,
        courtName: complaintCourtName,
        clientName: complaintClientName,
        clientNumber: complaintClientNumber,
        caseName: `${complaintComplainant} vs ${complaintAccusedName}`,
        partyName: complaintAccusedName,
        nextHearing: '—',
        caseStatus: 'Pending',
        docLink: document.getElementById('complaintDocLink')?.value?.trim() || '',
        remark: document.getElementById('complaintCaseRemark')?.value?.trim() || ''
      };
    } else {
      const caseNo = document.getElementById('caseNo')?.value?.trim();
      const caseYear = document.getElementById('caseYear')?.value?.trim();
      const filingDate = document.getElementById('filingDate')?.value?.trim();
      const plaintiff = document.getElementById('plaintiff')?.value?.trim();
      const defendant = document.getElementById('defendant')?.value?.trim();
      const courtName = document.getElementById('courtName')?.value?.trim();
      const clientName = document.getElementById('clientName')?.value?.trim();
      const clientNumber = document.getElementById('clientNumber')?.value?.trim();

      newCase = {
        caseType: 'civil',
        caseNo,
        caseYear,
        filingDate,
        plaintiff,
        defendant,
        courtName,
        clientName,
        clientNumber,
        caseName: `${plaintiff} vs ${defendant}`,
        partyName: defendant || plaintiff,
        nextHearing: '—',
        caseStatus: 'Pending',
        docLink: document.getElementById('caseDocLink')?.value?.trim() || '',
        remark: document.getElementById('caseRemark')?.value?.trim() || ''
      };
    }

    if (!newCase.caseNo) {
      alert('Please enter a valid Case Number.');
      return;
    }

    // Block incomplete prefix-only case numbers (e.g. "HM-", "Cr.Rev./") at registration
    // so they can't be saved and later trap the hearing-forward flow.
    if (newCase.caseNo.endsWith('-') || newCase.caseNo.endsWith('/') || !/\d/.test(newCase.caseNo)) {
      alert('⚠️ Incomplete Case Number: "' + newCase.caseNo + '"\nPlease enter the full case number (for example: CS.371/2025 or Cr.Rev./129/2026) including number/year before submitting.');
      return;
    }

    try {
      isSubmittingCase = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking & Adding...';
      }

      // Live Supabase + local memory uniqueness verification
      const exists = await checkCaseNumberExists(newCase.caseNo);
      if (exists && exists.exists) {
        alert(`❌ Case Number "${newCase.caseNo}" already exists in the database!\n\nPlease use a unique case number or update the existing record.`);
        return;
      }

      const recordCountBefore = allCaseRecords.length;
      const addResult = await addCaseToSupabase(newCase);

      // Only show success and reset form if the case was actually added
      const wasAdded = (addResult && addResult.success) ||
        (allCaseRecords.length > recordCountBefore) ||
        allCaseRecords.some(c => (c.caseNo || '').toLowerCase() === (newCase.caseNo || '').toLowerCase());

      if (wasAdded) {
        this.reset();
        if (typeof clearCaseNumberValidationBadges === 'function') {
          clearCaseNumberValidationBadges();
        }
        await performPostCrudRefresh({ caseNumber: newCase.caseNo, toast: `🎉 Case ${newCase.caseNo} added successfully!` });
        alert(`🎉 Case ${newCase.caseNo} added and all tables refreshed successfully!`);
      }
    } catch (err) {
      console.error('Error submitting case:', err);
      alert(`Error submitting case: ${err.message || err}`);
    } finally {
      isSubmittingCase = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    }
  }

  // 3. Handle Update Case Form Submit (Live Supabase sync)
  const updateSearchBtn = document.getElementById('updateSearchBtn');
  const updateSearchInput = document.getElementById('updateSearchInput');

  if (updateSearchBtn) {
    updateSearchBtn.addEventListener('click', () => {
      loadCaseForUpdate(updateSearchInput?.value);
    });
  }

  if (updateSearchInput) {
    updateSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        loadCaseForUpdate(updateSearchInput.value);
      }
    });
  }

  const updateCaseForm = document.getElementById('updateCaseForm');
  if (updateCaseForm) {
    updateCaseForm.addEventListener('submit', handleUpdateCaseSubmit);
  }

  const updateCaseTypeDropdown = document.getElementById('updateCaseTypeDropdown');
  if (updateCaseTypeDropdown) {
    updateCaseTypeDropdown.addEventListener('change', toggleUpdateCaseFormByType);
  }

  // 3.6 Handle Transfer Case Form Submit
  const transferSearchBtn = document.getElementById('transferSearchBtn');
  const transferSearchInput = document.getElementById('transferSearchInput');

  if (transferSearchBtn) {
    transferSearchBtn.addEventListener('click', () => {
      loadCaseForTransfer(transferSearchInput?.value);
    });
  }

  if (transferSearchInput) {
    transferSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        loadCaseForTransfer(transferSearchInput.value);
      }
    });
  }

  const transferCaseForm = document.getElementById('transferCaseForm');
  if (transferCaseForm) {
    transferCaseForm.addEventListener('submit', handleTransferCaseSubmit);
  }

  // 3.5 Handle Mark Case as Disposed Button & Wrapped Status Section Sync
  function syncDisposalSectionVisibility() {
    const statusSelect = document.getElementById('updateCaseStatus');
    const disposalSection = document.getElementById('updateCaseDisposalSection') || document.getElementById('updateCaseDisposalCard');
    if (!statusSelect || !disposalSection) return;
    const isDisposed = (statusSelect.value || '').toLowerCase().includes('dispose');
    if (isDisposed) {
      disposalSection.style.display = 'block';
    } else {
      disposalSection.style.display = 'none';
    }
  }
  window.syncDisposalSectionVisibility = syncDisposalSectionVisibility;

  const updateCaseStatusSelect = document.getElementById('updateCaseStatus');
  if (updateCaseStatusSelect) {
    updateCaseStatusSelect.addEventListener('change', () => {
      syncDisposalSectionVisibility();
      if (updateCaseStatusSelect.value === 'Disposed') {
        const disposalInput = document.getElementById('updateCaseDisposalComment');
        if (disposalInput) {
          if (!disposalInput.value.trim()) {
            disposalInput.value = 'Disposed Off on merits';
          }
          disposalInput.focus();
        }
      }
    });
  }

  const markDisposeBtn = document.getElementById('markDisposeBtn');
  if (markDisposeBtn) {
    markDisposeBtn.addEventListener('click', () => {
      const statusSelect = document.getElementById('updateCaseStatus');
      const disposalInput = document.getElementById('updateCaseDisposalComment');
      if (statusSelect) {
        statusSelect.value = 'Disposed';
        syncDisposalSectionVisibility();
      }
      if (disposalInput) {
        if (!disposalInput.value.trim()) {
          disposalInput.value = 'Disposed Off on merits';
        }
        disposalInput.focus();
      }
      const statusEl = document.getElementById('updateSearchStatus');
      if (statusEl) {
        statusEl.textContent = '⚖️ Status set to "Disposed Off". Review/edit disposal comments and click "Save Case Updates".';
        statusEl.className = 'update-status-msg success';
      }
    });
  }

  // 4. Handle Delete Case Form (Search by Case No/Name, Preview, & Delete)
  const deleteSearchInput = document.getElementById('deleteSearchInput');
  const deleteFindBtn = document.getElementById('deleteFindBtn');
  const deleteCaseBtn = document.getElementById('deleteCaseBtn');
  const deleteStatus = document.getElementById('deleteStatus');
  const deletePreviewCard = document.getElementById('deletePreviewCard');
  const deletePreviewEmpty = document.getElementById('deletePreviewEmpty');

  let currentlyLoadedDeleteCase = null;

  function searchCaseForDeletion(queryStr) {
    const q = (queryStr || deleteSearchInput?.value || '').trim().toLowerCase();
    if (!q) {
      if (deleteStatus) {
        deleteStatus.textContent = 'Please enter a Case Number or Case Name to search.';
        deleteStatus.className = 'update-status-msg error';
      }
      if (deletePreviewCard) deletePreviewCard.classList.add('hidden');
      if (deletePreviewEmpty) deletePreviewEmpty.classList.remove('hidden');
      currentlyLoadedDeleteCase = null;
      return;
    }

    const found = allCaseRecords.find(c => {
      const num1 = (c.caseNo || '').toLowerCase();
      const num2 = (c.criminalCaseNumber || '').toLowerCase();
      const name = (c.caseName || '').toLowerCase();
      const plaintiff = (c.plaintiff || '').toLowerCase();
      const defendant = (c.defendant || '').toLowerCase();
      const victim = (c.victimName || '').toLowerCase();
      const accused = (c.accusedName || '').toLowerCase();
      return num1 === q || num2 === q || name.includes(q) || (plaintiff && plaintiff.includes(q)) || (defendant && defendant.includes(q)) || (victim && victim.includes(q)) || (accused && accused.includes(q));
    });

    if (!found) {
      if (deleteStatus) {
        deleteStatus.textContent = `❌ No case found matching "${q.toUpperCase()}".`;
        deleteStatus.className = 'update-status-msg error';
      }
      if (deletePreviewCard) deletePreviewCard.classList.add('hidden');
      if (deletePreviewEmpty) deletePreviewEmpty.classList.remove('hidden');
      currentlyLoadedDeleteCase = null;
      return;
    }

    currentlyLoadedDeleteCase = found;

    // Populate preview card
    const cNum = found.caseNo || found.criminalCaseNumber || '—';
    const cType = (found.caseType || 'civil').toLowerCase();
    const isDisposed = (found.caseStatus || '').toLowerCase().includes('dispose');

    const setText = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt || '—';
    };

    setText('delPreviewCaseNumber', cNum);
    const typeBadge = document.getElementById('delPreviewCaseTypeBadge');
    if (typeBadge) {
      typeBadge.textContent = cType.toUpperCase();
      typeBadge.className = `case-badge ${cType}`;
    }

    const statusBadge = document.getElementById('delPreviewStatusBadge');
    if (statusBadge) {
      statusBadge.className = `status-badge ${isDisposed ? 'disposed' : 'pending'}`;
      statusBadge.textContent = isDisposed ? '✅ Disposed Off' : '⏳ Pending';
    }

    setText('delPreviewCaseName', found.caseName || (found.plaintiff ? `${found.plaintiff} vs ${found.defendant}` : (found.victimName ? `${found.victimName} vs ${found.accusedName}` : '—')));
    setText('delPreviewCourtName', found.courtName || found.criminalCourtName);
    setText('delPreviewClientName', found.clientName || found.criminalClientName);
    setText('delPreviewClientNumber', found.clientNumber || found.criminalClientNumber);
    setText('delPreviewFilingDate', formatDateDMY(found.filingDate || found.crimeFilingDate));
    setText('delPreviewNextHearing', formatDateDMY(found.nextHearing));

    if (deletePreviewEmpty) deletePreviewEmpty.classList.add('hidden');
    if (deletePreviewCard) deletePreviewCard.classList.remove('hidden');
    if (deleteStatus) {
      deleteStatus.textContent = `✅ Case "${cNum}" found! Review details below before deletion.`;
      deleteStatus.className = 'update-status-msg success';
    }
  }

  if (deleteFindBtn) {
    deleteFindBtn.addEventListener('click', () => searchCaseForDeletion());
  }

  if (deleteSearchInput) {
    deleteSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchCaseForDeletion();
      }
    });
  }

  if (deleteCaseBtn) {
    deleteCaseBtn.addEventListener('click', async () => {
      if (!currentlyLoadedDeleteCase) {
        alert('Please search and select a case first before deleting.');
        return;
      }

      const caseNumber = currentlyLoadedDeleteCase.caseNo || currentlyLoadedDeleteCase.criminalCaseNumber;
      const caseName = currentlyLoadedDeleteCase.caseName || caseNumber;

      const confirmDelete = confirm(`Are you sure you want to permanently delete case "${caseNumber}" (${caseName})? This action cannot be undone.`);
      if (confirmDelete) {
        await deleteCaseFromSupabase(caseNumber);
        if (deleteSearchInput) deleteSearchInput.value = '';
        if (deletePreviewCard) deletePreviewCard.classList.add('hidden');
        if (deletePreviewEmpty) deletePreviewEmpty.classList.remove('hidden');
        if (deleteStatus) {
          deleteStatus.textContent = `🗑️ Case "${caseNumber}" deleted successfully!`;
          deleteStatus.className = 'update-status-msg success';
        }
        currentlyLoadedDeleteCase = null;
        alert(`Case "${caseNumber}" has been deleted permanently.`);
      }
    });
  }

  // 5. Handle Update Hearing Form (Live Supabase sync)
  const hearingCaseSelect = document.getElementById('hearingCaseSelect');
  const hearingCaseNo = document.getElementById('hearingCaseNo');

  if (hearingCaseSelect) {
    hearingCaseSelect.addEventListener('change', () => {
      const selectedVal = hearingCaseSelect.value;
      if (hearingCaseNo) {
        hearingCaseNo.value = selectedVal;
      }

      renderHearingCaseInfo(selectedVal);

      if (selectedVal) {
        const found = allCaseRecords.find(c => {
          const num1 = (c.caseNo || '').toLowerCase();
          const num2 = (c.criminalCaseNumber || '').toLowerCase();
          return num1 === selectedVal.toLowerCase() || num2 === selectedVal.toLowerCase();
        });

        if (found) {
          const hearingProcessInput = document.getElementById('hearingProcess');
          if (hearingProcessInput && found.hearingProcess && !hearingProcessInput.value) {
            hearingProcessInput.value = found.hearingProcess;
          }
          // Re-render stage pills to match the selected case's type
          renderHearingStagePills(found.caseType || found.case_type || '');
          const dateInput = document.getElementById('hearingDate');
          if (dateInput) dateInput.focus();
        }
      }
    });
  }

  if (hearingCaseNo) {
    hearingCaseNo.addEventListener('input', () => {
      const typed = hearingCaseNo.value.trim();
      renderHearingCaseInfo(typed);

      if (hearingCaseSelect) {
        const match = Array.from(hearingCaseSelect.options).find(opt => opt.value.toLowerCase() === typed.toLowerCase());
        if (match) {
          hearingCaseSelect.value = match.value;
        } else {
          hearingCaseSelect.value = '';
        }
      }

      // Keep stage pills in sync with the typed case's type
      const typedFound = allCaseRecords.find(c => {
        const num1 = (c.caseNo || '').toLowerCase();
        const num2 = (c.criminalCaseNumber || '').toLowerCase();
        return num1 === typed.toLowerCase() || num2 === typed.toLowerCase();
      });
      if (typedFound) {
        renderHearingStagePills(typedFound.caseType || typedFound.case_type || '');
      }
    });
  }

  // Live preview events for Hearing Date & Process inputs
  const hearingDateInput = document.getElementById('hearingDate');
  const hearingProcessInput = document.getElementById('hearingProcess');
  // Initial render of the common stage pill set
  renderHearingStagePills('');
  if (hearingDateInput) {
    hearingDateInput.addEventListener('input', updateHearingLivePreview);
    hearingDateInput.addEventListener('change', updateHearingLivePreview);
  }
  if (hearingProcessInput) {
    hearingProcessInput.addEventListener('input', updateHearingLivePreview);
    hearingProcessInput.addEventListener('change', updateHearingLivePreview);
  }

async function handleUpdateHearingSubmit(e) {
      e.preventDefault();
      const rawCaseNumber = document.getElementById('hearingCaseNo')?.value?.trim();
      const hearingDate = document.getElementById('hearingDate')?.value;
      const process = document.getElementById('hearingProcess')?.value?.trim();
      const actionTaken = document.getElementById('hearingActionTaken')?.value?.trim() || '';
      const statusEl = document.getElementById('hearingStatus');

      if (!rawCaseNumber || !hearingDate || !process) {
        if (statusEl) {
          statusEl.textContent = 'Please fill all required hearing fields (Case Number, Date & Process).';
          statusEl.className = 'update-status-msg error';
        }
        return;
      }

      // Safeguard against incomplete case prefix inputs like "Cri-Rev-" or "CIV-"
      // Skipped when the typed value IS the complete stored number of a registered
      // case (a legacy record may legitimately look like a prefix).
      const isRegisteredCaseNo = allCaseRecords.some(c =>
        (c.caseNo || '').toLowerCase() === rawCaseNumber.toLowerCase() ||
        (c.criminalCaseNumber || '').toLowerCase() === rawCaseNumber.toLowerCase()
      );
      if (!isRegisteredCaseNo && (rawCaseNumber.endsWith('-') || rawCaseNumber.endsWith('/') || rawCaseNumber.length < 3)) {
        if (statusEl) {
          statusEl.textContent = '⚠️ "' + rawCaseNumber + '" appears to be an incomplete case number prefix. Please select or enter the complete case number (e.g. Cr.Rev./129/2026).';
          statusEl.className = 'update-status-msg error';
        }
        alert('⚠️ Incomplete Case Number: "' + rawCaseNumber + '"\nPlease enter the full case number (for example: Cr.Rev./129/2026) so the hearing attaches properly to the case.');
        return;
      }

      // Auto-resolve case number to the official case number from allCaseRecords if matched
      let caseNumber = rawCaseNumber;
      const cleanTyped = rawCaseNumber.toLowerCase().replace(/[^a-z0-9]/g, '');
      const matchedOfficialCase = allCaseRecords.find(c => {
        const num1 = (c.caseNo || '').toLowerCase();
        const num2 = (c.criminalCaseNumber || '').toLowerCase();
        if (num1 === rawCaseNumber.toLowerCase() || num2 === rawCaseNumber.toLowerCase()) return true;
        if (cleanTyped && (num1.replace(/[^a-z0-9]/g, '') === cleanTyped || num2.replace(/[^a-z0-9]/g, '') === cleanTyped)) return true;
        return false;
      });

      if (matchedOfficialCase) {
        caseNumber = (matchedOfficialCase.caseNo || matchedOfficialCase.criminalCaseNumber || rawCaseNumber).trim().toUpperCase();
      } else {
        caseNumber = (caseNumber || '').trim().toUpperCase();
      }

      await updateHearingInSupabase(caseNumber, hearingDate, process, actionTaken);

      const foundCase = allCaseRecords.find(c => {
        const num1 = (c.caseNo || '').toLowerCase();
        const num2 = (c.criminalCaseNumber || '').toLowerCase();
        return num1 === caseNumber.toLowerCase() || num2 === caseNumber.toLowerCase();
      });

      lastUpdatedHearingCase = foundCase ? { ...foundCase, nextHearing: hearingDate, hearingProcess: process } : { caseNo: caseNumber, nextHearing: hearingDate, hearingProcess: process };

      // Reveal WhatsApp notification card
      const waCard = document.getElementById('hearingWhatsAppSection');
      const waSummary = document.getElementById('whatsappClientSummary');
      if (waCard) {
        waCard.classList.remove('hidden');
        const cName = lastUpdatedHearingCase.clientName || lastUpdatedHearingCase.criminalClientName || 'Client';
        const cPhone = lastUpdatedHearingCase.clientNumber || lastUpdatedHearingCase.criminalClientNumber || 'Direct Phone';
        if (waSummary) {
          waSummary.textContent = `New hearing on ${formatDateDMY(hearingDate)} (${process}) saved for ${cName} (${cPhone}). Click below to notify via WhatsApp.`;
        }
      }

      updateHearingForm.reset();
      if (hearingCaseSelect) hearingCaseSelect.value = '';
      renderHearingCaseInfo('');
      renderHearingStagePills('');
      updateHearingLivePreview();

      await performPostCrudRefresh({ caseNumber: caseNumber });

      if (statusEl) {
        statusEl.textContent = `📅 Hearing for "${caseNumber}" forwarded to ${formatDateDMY(hearingDate)} (${process}) successfully!`;
        statusEl.className = 'update-status-msg success';
      }

      alert(`✅ Hearing for Case "${caseNumber}" has been updated and forwarded to ${formatDateDMY(hearingDate)} (${process}) successfully!`);
  }
  window.handleUpdateHearingSubmit = handleUpdateHearingSubmit;

  // Court mini buttons with return-tab tracking
  let returnToCaseFormTab = null;

  const addCourtBtn = document.getElementById('addCourtBtn');
  if (addCourtBtn) {
    addCourtBtn.addEventListener('click', () => {
      returnToCaseFormTab = 'add';
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }

  const addCriminalCourtBtn = document.getElementById('addCriminalCourtBtn');
  if (addCriminalCourtBtn) {
    addCriminalCourtBtn.addEventListener('click', () => {
      returnToCaseFormTab = 'add';
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }

  const updateAddCourtBtn = document.getElementById('updateAddCourtBtn');
  if (updateAddCourtBtn) {
    updateAddCourtBtn.addEventListener('click', () => {
      returnToCaseFormTab = 'update';
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }

  const updateAddCriminalCourtBtn = document.getElementById('updateAddCriminalCourtBtn');
  if (updateAddCriminalCourtBtn) {
    updateAddCriminalCourtBtn.addEventListener('click', () => {
      returnToCaseFormTab = 'update';
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }

  ['addStateCourtBtn', 'addFamilyCourtBtn', 'addRevenueCourtBtn', 'addMiscCivilCourtBtn', 'addMiscCriminalCourtBtn', 'addComplaintCourtBtn'].forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => {
        returnToCaseFormTab = 'add';
        showTab('courts');
        setTimeout(() => {
          const courtInput = document.getElementById('courtInput');
          if (courtInput) courtInput.focus();
        }, 120);
      });
    }
  });

  ['updateAddStateCourtBtn', 'updateAddFamilyCourtBtn', 'updateAddRevenueCourtBtn', 'updateAddMiscCivilCourtBtn', 'updateAddMiscCriminalCourtBtn', 'updateAddComplaintCourtBtn'].forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => {
        returnToCaseFormTab = 'update';
        showTab('courts');
        setTimeout(() => {
          const courtInput = document.getElementById('courtInput');
          if (courtInput) courtInput.focus();
        }, 120);
      });
    }
  });

  // 6. Handle Add Court Button (Live Supabase sync)
  let isSubmittingCourt = false;
  const saveCourtBtn = document.getElementById('saveCourtBtn');
  const courtInput = document.getElementById('courtInput');

  async function handleAddCourtSubmit() {
    if (isSubmittingCourt) return;
    const input = document.getElementById('courtInput');
    const courtName = (input?.value || '').trim();

    if (!courtName) {
      alert('Please enter a court name.');
      input?.focus();
      return;
    }

    const alreadyExists = courts.some(c => c.trim().toLowerCase() === courtName.toLowerCase());
    if (alreadyExists) {
      alert(`Court "${courtName}" already exists.`);
      input?.focus();
      return;
    }

    const saveBtn = document.getElementById('saveCourtBtn');
    const originalContent = saveBtn ? saveBtn.innerHTML : 'Submit Court';
    try {
      isSubmittingCourt = true;
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Saving Court...</span>';
      }

      await addCourtToSupabase(courtName);
      if (input) input.value = '';

      const activeCaseType = document.getElementById('caseTypeDropdown')?.value;
      const courtSelect = document.getElementById(activeCaseType === 'criminal' ? 'criminalCourtName' : 'courtName');
      if (courtSelect) {
        courtSelect.value = courtName;
      }

      if (returnToCaseFormTab) {
        const dest = returnToCaseFormTab;
        returnToCaseFormTab = null;
        showTab(dest);
        alert(`✅ Court "${courtName}" added and selected in your form!`);
      } else {
        alert(`✅ Court "${courtName}" added successfully to the directory!`);
      }
    } catch (err) {
      console.error('Error saving court:', err);
      alert(`Error saving court: ${err.message || err}`);
    } finally {
      isSubmittingCourt = false;
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalContent;
      }
    }
  }

  if (saveCourtBtn) {
    saveCourtBtn.addEventListener('click', handleAddCourtSubmit);
  }

  if (courtInput) {
    courtInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddCourtSubmit();
      }
    });
  }

  // Edit Court Modal keyboard and overlay backdrop listeners
  const editCourtModal = document.getElementById('editCourtModal');
  if (editCourtModal) {
    editCourtModal.addEventListener('click', (e) => {
      if (e.target === editCourtModal) {
        closeEditCourtModal();
      }
    });
  }

  const editCourtNameInput = document.getElementById('editCourtNameInput');
  if (editCourtNameInput) {
    editCourtNameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        confirmSaveEditedCourt();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeEditCourtModal();
      }
    });
  }

  // Delete Court Modal keyboard and overlay backdrop listeners
  const deleteCourtModal = document.getElementById('deleteCourtModal');
  if (deleteCourtModal) {
    deleteCourtModal.addEventListener('click', (e) => {
      if (e.target === deleteCourtModal) {
        closeDeleteCourtModal();
      }
    });
  }

  // Edit Helper Modal backdrop listener
  const editHelperModal = document.getElementById('editHelperModal');
  if (editHelperModal) {
    editHelperModal.addEventListener('click', (e) => {
      if (e.target === editHelperModal) {
        closeEditHelperModal();
      }
    });
  }

  // Delete Helper Modal backdrop listener
  const deleteHelperModal = document.getElementById('deleteHelperModal');
  if (deleteHelperModal) {
    deleteHelperModal.addEventListener('click', (e) => {
      if (e.target === deleteHelperModal) {
        closeDeleteHelperModal();
      }
    });
  }

  // Todo Reminder Modal backdrop listener
  const todoReminderModal = document.getElementById('todoReminderModal');
  if (todoReminderModal) {
    todoReminderModal.addEventListener('click', (e) => {
      if (e.target === todoReminderModal) {
        closeTodoReminderModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const delModal = document.getElementById('deleteCourtModal');
      if (delModal && !delModal.classList.contains('hidden')) {
        closeDeleteCourtModal();
      }
      const editHModal = document.getElementById('editHelperModal');
      if (editHModal && !editHModal.classList.contains('hidden')) {
        closeEditHelperModal();
      }
      const delHModal = document.getElementById('deleteHelperModal');
      if (delHModal && !delHModal.classList.contains('hidden')) {
        closeDeleteHelperModal();
      }
      const remModal = document.getElementById('todoReminderModal');
      if (remModal && !remModal.classList.contains('hidden')) {
        closeTodoReminderModal();
      }
    }
  });

  const caseTypeDropdownChange = document.getElementById('caseTypeDropdown');
  if (caseTypeDropdownChange) {
    caseTypeDropdownChange.addEventListener('change', toggleCaseFormByType);
  }

  // 7. Calendar View Navigation Listeners
  const prevMonthBtn = document.getElementById('calPrevMonthBtn');
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      let newMonth = currentCalendarMonth - 1;
      let newYear = currentCalendarYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      renderCalendarView(newYear, newMonth);
    });
  }

  const nextMonthBtn = document.getElementById('calNextMonthBtn');
  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
      let newMonth = currentCalendarMonth + 1;
      let newYear = currentCalendarYear;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      renderCalendarView(newYear, newMonth);
    });
  }

  const todayBtn = document.getElementById('calTodayBtn');
  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      const now = new Date();
      renderCalendarView(now.getFullYear(), now.getMonth());
    });
  }

  const printCauseListBtn = document.getElementById('printCauseListBtn');
  if (printCauseListBtn) {
    printCauseListBtn.addEventListener('click', printDailyCauseList);
  }

  // 8. WhatsApp Action Listeners
  const sendWhatsAppHearingBtn = document.getElementById('sendWhatsAppHearingBtn');
  if (sendWhatsAppHearingBtn) {
    sendWhatsAppHearingBtn.addEventListener('click', () => {
      sendWhatsAppHearingNotice(lastUpdatedHearingCase);
    });
  }

  const detailWhatsAppBtn = document.getElementById('detailWhatsAppBtn');
  if (detailWhatsAppBtn) {
    detailWhatsAppBtn.addEventListener('click', () => {
      sendWhatsAppHearingNotice(currentSelectedCase);
    });
  }

  // 9. Case History Modal Listeners
  const closeHistoryModalBtn = document.getElementById('closeCaseHistoryModalBtn');
  if (closeHistoryModalBtn) {
    closeHistoryModalBtn.addEventListener('click', closeCaseHistoryModal);
  }

  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCaseHistoryModal);
  }

  const historyModalOverlay = document.getElementById('caseHistoryModal');
  if (historyModalOverlay) {
    historyModalOverlay.addEventListener('click', (e) => {
      if (e.target === historyModalOverlay) {
        closeCaseHistoryModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeCaseHistoryModal();
    }
  });

  loadCaseTasks();
  const todoCaseSelect = document.getElementById('todoCaseSelect');
  if (todoCaseSelect) {
    todoCaseSelect.addEventListener('change', onTodoCaseSelectChange);
  }

  // Close combobox dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('todoComboboxWrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      closeTodoCaseDropdown();
    }
  });

  renderCaseTypeOptions();
  renderCourtOptions();
  renderCriminalCourtOptions();
  renderSearchCourtFilterOptions();
  toggleCaseFormByType();
  toggleUpdateCaseFormByType();
  renderCourtsTable();
  if (typeof populateHelperCourtDropdowns === 'function') populateHelperCourtDropdowns();
  if (typeof updateHelpersBadges === 'function') updateHelpersBadges();
  renderCalendarView();
  fetchAllDataFromSupabase();
  filterCaseTables();
  if (typeof initAccountsTab === 'function') initAccountsTab();
  if (typeof initPaisaTab === 'function') initPaisaTab();
}
function toggleDossierSection(elementId, forceState = null) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const shouldCollapse = forceState !== null ? !!forceState : !el.classList.contains('is-collapsed');
  if (shouldCollapse) {
    el.classList.add('is-collapsed');
  } else {
    el.classList.remove('is-collapsed');
  }
  const btn = el.querySelector('.dossier-section-collapse-btn');
  if (btn) {
    btn.setAttribute('aria-expanded', (!shouldCollapse).toString());
  }
}

if (typeof toggleDossierSection !== 'undefined') window.toggleDossierSection = toggleDossierSection;

// ==============================================================================
// Beautified Case Remarks & Structured Object Data Engine
// ==============================================================================

/**
 * Normalizes any remark value (Object, Array, JSON string, or plain string)
 * into a structured object representation.
 */
function normalizeRemarksData(raw) {
  if (raw === null || raw === undefined) {
    return { type: 'empty', items: [], raw: '', text: '' };
  }

  let parsed = raw;

  // If string, try JSON parse if it looks like JSON
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (!trimmed) {
      return { type: 'empty', items: [], raw: '', text: '' };
    }
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        parsed = JSON.parse(trimmed);
      } catch (e) {
        // Not valid JSON, keep as plain string
        parsed = trimmed;
      }
    } else {
      parsed = trimmed;
    }
  }

  // If Array
  if (Array.isArray(parsed)) {
    if (parsed.length === 0) {
      return { type: 'empty', items: [], raw, text: '' };
    }
    const items = parsed.map((item, idx) => {
      if (typeof item === 'object' && item !== null) {
        return { key: `#${idx + 1}`, value: remarksToPlainText(item), rawValue: item };
      }
      return { key: `#${idx + 1}`, value: String(item).trim(), rawValue: item };
    }).filter(i => i.value);

    return {
      type: 'array',
      items,
      raw,
      text: items.map(i => `${i.key}: ${i.value}`).join('; ')
    };
  }

  // If Object
  if (typeof parsed === 'object' && parsed !== null) {
    const keys = Object.keys(parsed);
    if (keys.length === 0) {
      return { type: 'empty', items: [], raw, text: '' };
    }

    const items = [];
    keys.forEach(k => {
      const v = parsed[k];
      if (v !== null && v !== undefined && v !== '') {
        const valStr = typeof v === 'object' ? JSON.stringify(v) : String(v).trim();
        if (valStr) {
          items.push({
            key: formatRemarkKeyLabel(k),
            rawKey: k,
            value: valStr,
            rawValue: v
          });
        }
      }
    });

    if (items.length === 0) {
      return { type: 'empty', items: [], raw, text: '' };
    }

    return {
      type: 'object',
      items,
      raw,
      text: items.map(i => `${i.key}: ${i.value}`).join('; ')
    };
  }

  // Plain string
  const str = String(parsed).trim();
  if (!str) {
    return { type: 'empty', items: [], raw: '', text: '' };
  }

  return {
    type: 'string',
    items: [{ key: 'Remark', value: str, rawValue: str }],
    raw: str,
    text: str
  };
}

/**
 * Converts camelCase or snake_case key to Human Readable Title.
 */
function formatRemarkKeyLabel(key) {
  if (!key) return 'Remark';
  if (/^\d+$/.test(String(key))) return `#${Number(key) + 1}`;

  const commonMap = {
    codefendants: 'Co-Defendants',
    co_defendants: 'Co-Defendants',
    coplaintiffs: 'Co-Plaintiffs',
    co_plaintiffs: 'Co-Plaintiffs',
    coparties: 'Co-Parties',
    co_parties: 'Co-Parties',
    oppositeparty: 'Opposite Party',
    oppositeparties: 'Opposite Parties',
    chambernote: 'Chamber Note',
    chambernotes: 'Chamber Notes',
    nexthearing: 'Next Hearing',
    next_hearing: 'Next Hearing',
    hearingdate: 'Hearing Date',
    hearing_date: 'Hearing Date',
    casestatus: 'Case Status',
    case_status: 'Case Status',
    courtorder: 'Court Order',
    court_order: 'Court Order',
    actiontaken: 'Action Taken',
    action_taken: 'Action Taken',
    doclink: 'Document Link',
    doc_link: 'Document Link'
  };

  const lower = String(key).toLowerCase().replace(/[^a-z0-9]/g, '');
  if (commonMap[lower]) return commonMap[lower];

  const upper = String(key).toUpperCase();
  if (upper === 'ID' || upper === 'PS' || upper === 'FIR') return upper;

  let formatted = String(key).replace(/[_\-]+/g, ' ');
  formatted = formatted.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

  return formatted
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Maps field key to FontAwesome icon
 */
function getRemarkKeyIcon(key) {
  const k = String(key || '').toLowerCase();
  if (k.includes('party') || k.includes('parties') || k.includes('defend') || k.includes('plaintiff') || k.includes('accused') || k.includes('victim') || k.includes('petitioner') || k.includes('respondent') || k.includes('witness')) {
    return '<i class="fa-solid fa-users" style="color: #6366f1;"></i>';
  }
  if (k.includes('hear') || k.includes('date') || k.includes('time') || k.includes('dead') || k.includes('sched')) {
    return '<i class="fa-solid fa-calendar-day" style="color: #f59e0b;"></i>';
  }
  if (k.includes('court') || k.includes('bench') || k.includes('judge') || k.includes('forum')) {
    return '<i class="fa-solid fa-landmark" style="color: #8b5cf6;"></i>';
  }
  if (k.includes('order') || k.includes('status') || k.includes('stage') || k.includes('process') || k.includes('dispos') || k.includes('decree') || k.includes('judgment')) {
    return '<i class="fa-solid fa-scale-balanced" style="color: #10b981;"></i>';
  }
  if (k.includes('phone') || k.includes('mobile') || k.includes('contact') || k.includes('tel') || k.includes('call')) {
    return '<i class="fa-solid fa-phone" style="color: #06b6d4;"></i>';
  }
  if (k.includes('note') || k.includes('remark') || k.includes('comment') || k.includes('detail') || k.includes('desc') || k.includes('action') || k.includes('summary')) {
    return '<i class="fa-solid fa-note-sticky" style="color: #0ea5e9;"></i>';
  }
  if (k.includes('urg') || k.includes('prior') || k.includes('alert') || k.includes('warn')) {
    return '<i class="fa-solid fa-triangle-exclamation" style="color: #ef4444;"></i>';
  }
  return '<i class="fa-solid fa-circle-dot" style="color: #64748b;"></i>';
}

/**
 * Decorates parenthetical badges like (Deceased), (Minor), (Major)
 */
function decorateRemarkBadges(text) {
  if (!text) return '';
  let out = escapeHtml(String(text));
  const flags = [
    { re: /\((?:Disceasd|Deceased|Expired)\s*\)/i, label: 'Deceased', cls: 'rmk-badge-deceased' },
    { re: /\(\s*Minor\s*\)/i, label: 'Minor', cls: 'rmk-badge-minor' },
    { re: /\(\s*(?:Major|Adult)\s*\)/i, label: 'Major', cls: 'rmk-badge-major' }
  ];
  flags.forEach(f => {
    if (f.re.test(out)) {
      out = out.replace(f.re, `<span class="rmk-badge ${f.cls}">${f.label}</span>`);
    }
  });
  return out;
}

/**
 * Renders HTML for remarks column inside any Case Table.
 */
function renderCaseTableRemarks(raw, caseNo = '', caseTitle = '') {
  const norm = normalizeRemarksData(raw);

  if (norm.type === 'empty') {
    return '<span class="case-remark-empty">—</span>';
  }

  const safeCaseNo = escapeHtml(String(caseNo || ''));
  const safeTitle = escapeHtml(String(caseTitle || ''));
  const fullTooltip = escapeHtml(norm.text);

  // If structured Object or Array
  if (norm.type === 'object' || norm.type === 'array') {
    const totalCount = norm.items.length;
    const tagLabel = norm.type === 'array' ? 'List Data' : 'Structured Data';
    const tagIcon = norm.type === 'array' ? 'fa-list-ol' : 'fa-layer-group';

    // Show up to 2 items in compact cell
    const displayItems = norm.items.slice(0, 2);
    const hasMore = totalCount > 2;

    const kvRowsHtml = displayItems.map(item => `
      <div class="case-remark-kv-row">
        <span class="case-remark-k">${getRemarkKeyIcon(item.rawKey || item.key)} ${escapeHtml(item.key)}:</span>
        <span class="case-remark-v">${decorateRemarkBadges(item.value)}</span>
      </div>
    `).join('');

    const moreHintHtml = hasMore
      ? `<span class="case-remark-more-hint">+${totalCount - 2} more fields...</span>`
      : '';

    return `
      <div class="case-remark-card" title="${fullTooltip}" onclick="event.stopPropagation(); openCaseRemarkModal('${safeCaseNo}', '${safeTitle}')">
        <div class="case-remark-header-bar">
          <span class="case-remark-tag-pill"><i class="fa-solid ${tagIcon}"></i> ${tagLabel}</span>
          <span class="case-remark-count-tag">${totalCount} ${totalCount === 1 ? 'field' : 'fields'}</span>
        </div>
        <div class="case-remark-kv-list">
          ${kvRowsHtml}
        </div>
        ${moreHintHtml}
      </div>
    `;
  }

  // Plain string remark
  const rawText = norm.text;
  const isParties = /co[- ]?(?:defendant|plaintiff|party|accused)/i.test(rawText);
  const icon = isParties ? 'fa-solid fa-users' : 'fa-solid fa-note-sticky';

  return `
    <div class="case-remark-card" title="${fullTooltip}" onclick="event.stopPropagation(); openCaseRemarkModal('${safeCaseNo}', '${safeTitle}')">
      <div class="case-remark-single-wrap">
        <i class="${icon}"></i>
        <span class="case-remark-text-clamp">${decorateRemarkBadges(rawText)}</span>
      </div>
    </div>
  `;
}

/**
 * Extracts plain text string for search indexing and CSV export.
 */
function remarksToPlainText(raw) {
  const norm = normalizeRemarksData(raw);
  return norm.text || '';
}

/**
 * Extracts lowercase string for search haystack matching.
 */
function remarksToSearchString(raw) {
  return remarksToPlainText(raw).toLowerCase();
}

/**
 * Currently active remark data in the modal for clipboard operations
 */
var currentModalRemarkData = null;

/**
 * Opens the Case Remark Modal with beautified structured inspection
 */
function openCaseRemarkModal(caseNo, caseTitle = '') {
  const modal = document.getElementById('caseRemarkModal');
  if (!modal) return;

  const targetCase = (allCaseRecords || []).find(c => {
    const num = (c.caseNo || c.criminalCaseNumber || '').trim().toLowerCase();
    const target = (caseNo || '').trim().toLowerCase();
    return num === target || (num && target && (num.includes(target) || target.includes(num)));
  });

  const rawRemark = targetCase ? (targetCase.remark || targetCase.remarks || '') : '';
  const caseNumberText = caseNo || (targetCase ? (targetCase.caseNo || targetCase.criminalCaseNumber) : '—');
  const titleText = caseTitle || (targetCase ? (targetCase.caseName || `${targetCase.plaintiff || targetCase.victimName || ''} vs ${targetCase.defendant || targetCase.accusedName || ''}`) : '');

  const norm = normalizeRemarksData(rawRemark);
  currentModalRemarkData = {
    caseNo: caseNumberText,
    caseTitle: titleText,
    norm,
    raw: rawRemark
  };

  const caseNoEl = document.getElementById('caseRemarkModalCaseNo');
  if (caseNoEl) caseNoEl.textContent = `${caseNumberText}${titleText && titleText !== '—' ? ' — ' + titleText : ''}`;

  const contentEl = document.getElementById('caseRemarkModalContent');
  if (contentEl) {
    if (norm.type === 'empty') {
      contentEl.innerHTML = `
        <div style="text-align: center; padding: 30px 15px; color: #94a3b8;">
          <i class="fa-regular fa-folder-open" style="font-size: 32px; margin-bottom: 8px; opacity: 0.6;"></i>
          <p style="margin: 0; font-size: 14px;">No remarks or structured object data recorded for this case.</p>
        </div>
      `;
    } else if (norm.type === 'object' || norm.type === 'array') {
      contentEl.innerHTML = norm.items.map(item => `
        <div class="remark-modal-card-item">
          <div class="remark-modal-key-title">
            ${getRemarkKeyIcon(item.rawKey || item.key)}
            <span>${escapeHtml(item.key)}</span>
          </div>
          <div class="remark-modal-val-body">${decorateRemarkBadges(item.value)}</div>
        </div>
      `).join('');
    } else {
      contentEl.innerHTML = `
        <div class="remark-modal-card-item">
          <div class="remark-modal-key-title">
            <i class="fa-solid fa-note-sticky" style="color: #0ea5e9;"></i>
            <span>Case Remarks</span>
          </div>
          <div class="remark-modal-val-body">${decorateRemarkBadges(norm.text)}</div>
        </div>
      `;
    }
  }

  modal.classList.remove('hidden');
}

/**
 * Closes Case Remark Modal
 */
function closeCaseRemarkModal() {
  const modal = document.getElementById('caseRemarkModal');
  if (modal) modal.classList.add('hidden');
}

/**
 * Copies remark data to clipboard as formatted text or JSON
 */
function copyRemarkDataToClipboard(format = 'text') {
  if (!currentModalRemarkData) return;
  let textToCopy = '';

  if (format === 'json') {
    if (typeof currentModalRemarkData.raw === 'object' && currentModalRemarkData.raw !== null) {
      textToCopy = JSON.stringify(currentModalRemarkData.raw, null, 2);
    } else {
      try {
        const parsed = JSON.parse(currentModalRemarkData.raw);
        textToCopy = JSON.stringify(parsed, null, 2);
      } catch (e) {
        textToCopy = JSON.stringify({ remark: currentModalRemarkData.norm.text }, null, 2);
      }
    }
  } else {
    if (currentModalRemarkData.norm.type === 'object' || currentModalRemarkData.norm.type === 'array') {
      textToCopy = currentModalRemarkData.norm.items.map(i => `${i.key}: ${i.value}`).join('\n');
    } else {
      textToCopy = currentModalRemarkData.norm.text;
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (typeof showToast === 'function') {
        showToast('Remarks copied to clipboard!', 'success');
      } else {
        alert('Remarks copied to clipboard!');
      }
    }).catch(() => {
      if (typeof showToast === 'function') {
        showToast('Failed to copy to clipboard', 'error');
      }
    });
  } else {
    if (typeof showToast === 'function') {
      showToast('Clipboard access not available', 'error');
    }
  }
}

if (typeof normalizeRemarksData !== 'undefined') window.normalizeRemarksData = normalizeRemarksData;
if (typeof renderCaseTableRemarks !== 'undefined') window.renderCaseTableRemarks = renderCaseTableRemarks;
if (typeof remarksToPlainText !== 'undefined') window.remarksToPlainText = remarksToPlainText;
if (typeof remarksToSearchString !== 'undefined') window.remarksToSearchString = remarksToSearchString;
if (typeof openCaseRemarkModal !== 'undefined') window.openCaseRemarkModal = openCaseRemarkModal;
if (typeof closeCaseRemarkModal !== 'undefined') window.closeCaseRemarkModal = closeCaseRemarkModal;
if (typeof copyRemarkDataToClipboard !== 'undefined') window.copyRemarkDataToClipboard = copyRemarkDataToClipboard;

function renderStructuredRemarks(raw) {
  const norm = normalizeRemarksData(raw);
  if (norm.type === 'empty') {
    return '<span style="color:#94a3b8; font-style:italic;">No co-parties or remarks recorded for this case.</span>';
  }

  // If structured Object or Array, render aesthetic cards in dossier
  if (norm.type === 'object' || norm.type === 'array') {
    return `
      <div class="remark-modal-grid" style="gap: 10px;">
        ${norm.items.map(item => `
          <div class="remark-modal-card-item" style="background: #ffffff; padding: 12px 14px;">
            <div class="remark-modal-key-title">
              ${getRemarkKeyIcon(item.rawKey || item.key)}
              <span>${escapeHtml(item.key)}</span>
            </div>
            <div class="remark-modal-val-body">${decorateRemarkBadges(item.value)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  const text = String(norm.text || '');
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const htmlParts = [];
  let plainFallback = [];

  // Status badges for parenthetical flags
  const badge = (label, cls) =>
    `<span class="rmk-badge ${cls}">${escapeHtml(label)}</span>`;
  const decorate = (str) => {
    let out = escapeHtml(str);
    const flags = [
      { re: /\((?:Disceasd|Deceased|Expired)\s*\)/i, label: 'Deceased', cls: 'rmk-badge-deceased' },
      { re: /\(\s*Minor\s*\)/i, label: 'Minor', cls: 'rmk-badge-minor' },
      { re: /\(\s*(?:Major|Adult)\s*\)/i, label: 'Major', cls: 'rmk-badge-major' }
    ];
    flags.forEach(f => {
      if (f.re.test(str)) {
        out = out.replace(new RegExp(escapeHtml(str.match(f.re)[0]), 'i'), badge(f.label, f.cls));
      }
    });
    return out;
  };

  // Section keywords → headings
  const SECTION_RE = /^(co[- ]?defendants?|co[- ]?plaintiffs?|proposed\s+(?:defendants?|plaintiffs?)|defendants?|plaintiffs?|connected\s+suits?|injunction\s+status|limitation|note|notes|remark(?:s)?|other\s+parties)\s*[:\-–]?/i;

  const NUM_RE = /^(?:\d+\s*[-./]\s*|\(\s*\d+\s*\)\s*|\d+\.\s*)?/;

  lines.forEach((line) => {
    const m = line.match(SECTION_RE);
    if (m && line.length <= 400) {
      // Split heading from the rest of the line
      const rest = line.slice(m[0].length).trim();
      htmlParts.push(`<div class="rmk-section">${escapeHtml(m[0].replace(/[:\-–]\s*$/, ''))}</div>`);
      if (rest) {
        // rest may itself contain numbered entries "1- X 2- Y"
        const entries = rest.split(/\s+(?=\d+\s*[-/])/).map(s => s.trim()).filter(Boolean);
        if (entries.length > 1) {
          entries.forEach(e => htmlParts.push(`<div class="rmk-party">${decorate(e)}</div>`));
        } else {
          htmlParts.push(`<div class="rmk-party">${decorate(rest)}</div>`);
        }
      }
    } else {
      // Plain line: maybe numbered entry, maybe free text
      const em = line.match(NUM_RE);
      const body = line.slice(em[0].length).trim();
      if (/^\d/.test(line) && body) {
        htmlParts.push(`<div class="rmk-party"><span class="rmk-num">${escapeHtml(em[0].trim())}</span>${decorate(body)}</div>`);
      } else if (line) {
        plainFallback.push(line);
        htmlParts.push(`<div class="rmk-line">${decorate(line)}</div>`);
      }
    }
  });

  // If we only got plain lines (no sections/party rows), fall back to the
  // old single-block rendering so familiar layouts don't regress.
  const structured = htmlParts.filter(h => /rmk-section|rmk-party/.test(h)).length;
  if (structured === 0) {
    return `<span style="color:#1e293b; font-weight:500;">${decorateRemarkBadges(text)}</span>`;
  }
  return `<div class="rmk-list">${htmlParts.join('')}</div>`;
}
if (typeof renderStructuredRemarks !== 'undefined') window.renderStructuredRemarks = renderStructuredRemarks;

// (escapeHtml is defined globally at top of script)




if (typeof renderSearchCourtFilterOptions !== 'undefined') window.renderSearchCourtFilterOptions = renderSearchCourtFilterOptions;
if (typeof filterCaseTables !== 'undefined') window.filterCaseTables = filterCaseTables;

/* ==============================================================================
   Progressive Web App (PWA) & Mobile Installation Management
   ============================================================================== */
var deferredInstallPrompt = null;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('✅ CMS Legal Service Worker registered with scope:', reg.scope);
      })
      .catch((err) => {
        console.warn('⚠️ CMS Legal Service Worker registration note:', err);
      });
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  console.log('📱 Captured beforeinstallprompt event');
  updateInstallUiState(true);
});

window.addEventListener('appinstalled', () => {
  console.log('🎉 PWA application successfully installed!');
  deferredInstallPrompt = null;
  updateInstallUiState(false);
  alert('🎉 CaseBook has been successfully installed on your Desktop / Device!');
});

function updateInstallUiState(canPrompt) {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const installBtns = document.querySelectorAll('.pwa-install-banner-btn, .header-install-btn, .nav-install-btn');
  
  installBtns.forEach(btn => {
    if (isStandalone) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'inline-flex';
    }
  });
}

// Check install state immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => updateInstallUiState(false));
} else {
  updateInstallUiState(false);
}

async function triggerPwaInstall() {
  if (deferredInstallPrompt) {
    try {
      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      console.log(`Install prompt outcome: ${choiceResult.outcome}`);
      if (choiceResult.outcome === 'accepted') {
        deferredInstallPrompt = null;
        updateInstallUiState(false);
      }
    } catch (err) {
      console.warn('Install prompt error:', err);
      openPwaGuideModal();
    }
  } else {
    openPwaGuideModal();
  }
}

function openPwaGuideModal() {
  const modal = document.getElementById('pwaGuideModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closePwaGuideModal() {
  const modal = document.getElementById('pwaGuideModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

if (typeof triggerPwaInstall !== 'undefined') window.triggerPwaInstall = triggerPwaInstall;
if (typeof openPwaGuideModal !== 'undefined') window.openPwaGuideModal = openPwaGuideModal;
if (typeof closePwaGuideModal !== 'undefined') window.closePwaGuideModal = closePwaGuideModal;

// ==============================================================================
// Mobile Filter Drawer & Active Filter Count Controllers
// ==============================================================================

function updateMobileFilterBadges() {
  try {
    // Search tab active filters
    const sType = document.getElementById('searchTypeFilter')?.value || '';
    const sCourt = document.getElementById('searchCourtFilter')?.value || '';
    const sStatus = document.getElementById('searchStatusFilter')?.value || '';
    const sDate = document.getElementById('searchDateFilter')?.value || '';
    let sCount = 0;
    if (sType) sCount++;
    if (sCourt) sCount++;
    if (sStatus) sCount++;
    if (sDate) sCount++;

    const sBadge = document.getElementById('searchFilterCountBadge');
    if (sBadge) {
      sBadge.textContent = String(sCount);
      sBadge.style.display = sCount > 0 ? 'inline-flex' : 'none';
    }

    // All Cases tab active filters
    const aType = document.getElementById('allCasesTypeSelect')?.value || '';
    const aStatus = document.getElementById('allCasesStatusSelect')?.value || '';
    const aCourt = document.getElementById('allCasesCourtSelect')?.value || '';
    let aCount = 0;
    if (aType) aCount++;
    if (aStatus) aCount++;
    if (aCourt) aCount++;

    const aBadge = document.getElementById('allCasesFilterCountBadge');
    if (aBadge) {
      aBadge.textContent = String(aCount);
      aBadge.style.display = aCount > 0 ? 'inline-flex' : 'none';
    }
  } catch (e) {}
}

function toggleMobileFilterDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  const isOpen = drawer.classList.toggle('open');
  const card = drawer.closest('.my-cases-filter-card, .all-cases-filter-card');
  const triggerBtn = card ? card.querySelector('.mobile-filter-trigger-btn') : null;
  if (triggerBtn) triggerBtn.classList.toggle('active', isOpen);
}

function openMobileFilterDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  drawer.classList.add('open');
  const card = drawer.closest('.my-cases-filter-card, .all-cases-filter-card');
  const triggerBtn = card ? card.querySelector('.mobile-filter-trigger-btn') : null;
  if (triggerBtn) triggerBtn.classList.add('active');
}

function closeMobileFilterDrawer() {
  document.querySelectorAll('.mobile-filter-drawer').forEach(d => {
    d.classList.remove('open');
    const card = d.closest('.my-cases-filter-card, .all-cases-filter-card');
    const triggerBtn = card ? card.querySelector('.mobile-filter-trigger-btn') : null;
    if (triggerBtn) triggerBtn.classList.remove('active');
  });
}

function applyMobileFilters(tab) {
  closeMobileFilterDrawer();
  updateMobileFilterBadges();
  if (tab === 'search') {
    filterCaseTables();
  } else if (tab === 'all') {
    renderAllCasesTableWithFilters();
  }
}

function resetMobileFilters(tab) {
  if (tab === 'search') {
    const sType = document.getElementById('searchTypeFilter');
    const sCourt = document.getElementById('searchCourtFilter');
    const sStatus = document.getElementById('searchStatusFilter');
    const sDate = document.getElementById('searchDateFilter');
    const sSearch = document.getElementById('globalSearch');
    if (sType) sType.value = '';
    if (sCourt) sCourt.value = '';
    if (sStatus) sStatus.value = '';
    if (sDate) sDate.value = '';
    if (sSearch) sSearch.value = '';
    document.querySelectorAll('.quick-filter-chip').forEach(c => c.classList.remove('active'));
    filterCaseTables();
  } else if (tab === 'all') {
    resetAllCasesFilters();
  }
  updateMobileFilterBadges();
  closeMobileFilterDrawer();
}

if (typeof toggleMobileFilterDrawer !== 'undefined') window.toggleMobileFilterDrawer = toggleMobileFilterDrawer;
if (typeof updateMobileFilterBadges !== 'undefined') window.updateMobileFilterBadges = updateMobileFilterBadges;
if (typeof openMobileFilterDrawer !== 'undefined') window.openMobileFilterDrawer = openMobileFilterDrawer;
if (typeof closeMobileFilterDrawer !== 'undefined') window.closeMobileFilterDrawer = closeMobileFilterDrawer;
// ==============================================================================
// Smart Case Suggestion & Live Fuzzy Search
// ==============================================================================

var smartCaseSuggestionsCache = [];
var smartCaseActiveIndex = -1;

function ensureAllCasesHaveParties() {
  if (!Array.isArray(allCaseRecords)) return;
  allCaseRecords.forEach(c => {
    if (!Array.isArray(c.parties) || c.parties.length === 0) {
      const candidateParties = [
        c.clientName,
        c.plaintiff,
        c.defendant,
        c.firstParty,
        c.accusedName,
        c.victimName,
        c.petitioner,
        c.respondent,
        c.applicant,
        c.oppositeParty,
        c.complainant
      ];
      if (c.caseName) {
        const parts = c.caseName.split(/\s+(?:vs\.?|v\.?|versus|and|&)\s+/i);
        parts.forEach(p => {
          if (p.trim()) candidateParties.push(p.trim());
        });
      }
      c.parties = extractCaseParties(c, candidateParties);
      c.title = c.caseName || c.caseNo || '';
      c.case_number = c.caseNo;
      c.court_name = c.courtName;
      c.next_hearing_date = c.nextHearing;
    }
  });
}

function levenshteinDistance(s1, s2) {
  const a = (s1 || '').toLowerCase();
  const b = (s2 || '').toLowerCase();
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

function matchFuzzyQuery(target, query) {
  if (!target || !query) return { matches: false, score: 0, isExact: false };
  const t = String(target).trim().toLowerCase();
  const q = String(query).trim().toLowerCase();
  if (!t || !q) return { matches: false, score: 0, isExact: false };

  // 1. Exact equality
  if (t === q) {
    return { matches: true, score: 100, isExact: true };
  }

  // 2. Starts with query prefix
  if (t.startsWith(q)) {
    return { matches: true, score: 85, isExact: false };
  }

  // 3. Substring match
  if (t.includes(q)) {
    return { matches: true, score: 75, isExact: false };
  }

  // 4. Multi-token match (e.g. "ram pra" matches "Ram Prasad")
  const qTokens = q.split(/\s+/).filter(Boolean);
  const tTokens = t.split(/[\s,\.\-]+/).filter(Boolean);
  const allTokensMatched = qTokens.length > 0 && qTokens.every(qTok => 
    tTokens.some(tTok => tTok.startsWith(qTok) || (qTok.length >= 4 && levenshteinDistance(qTok, tTok) <= 1))
  );

  if (allTokensMatched) {
    return { matches: true, score: 65, isExact: false };
  }

  // 5. Typo tolerance on whole target if lengths are close
  if (q.length >= 4 && Math.abs(t.length - q.length) <= 2) {
    const dist = levenshteinDistance(t, q);
    if (dist <= 2) {
      return { matches: true, score: 50, isExact: false };
    }
  }

  return { matches: false, score: 0, isExact: false };
}

function getAllKnownClients() {
  const map = new Map();

  (allCaseRecords || []).forEach(c => {
    const name = (c.clientName || '').trim();
    if (name && name !== '—' && name.toLowerCase() !== 'unknown' && name.toLowerCase() !== 'none') {
      const key = name.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          name,
          phone: c.clientNumber || '',
          caseNo: c.caseNo || '',
          caseTitle: c.caseName || c.title || ''
        });
      } else {
        const existing = map.get(key);
        if (!existing.phone && c.clientNumber) existing.phone = c.clientNumber;
        if (!existing.caseNo && c.caseNo) {
          existing.caseNo = c.caseNo;
          existing.caseTitle = c.caseName || c.title || '';
        }
      }
    }
  });

  (allAccountRecords || []).forEach(a => {
    const name = (a.client_name || '').trim();
    if (name && name !== '—' && name.toLowerCase() !== 'client a' && name.toLowerCase() !== 'client 1' && name.toLowerCase() !== 'client 2') {
      const key = name.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          name,
          phone: a.client_phone || '',
          caseNo: a.case_number || '',
          caseTitle: ''
        });
      } else {
        const existing = map.get(key);
        if (!existing.phone && a.client_phone) existing.phone = a.client_phone;
        if (!existing.caseNo && a.case_number) existing.caseNo = a.case_number;
      }
    }
  });

  // Also include persistent saved clients cache
  try {
    const saved = JSON.parse(localStorage.getItem('cmSavedClients') || '[]');
    if (Array.isArray(saved)) {
      saved.forEach(s => {
        if (!s || !s.name) return;
        const key = s.name.trim().toLowerCase();
        if (!map.has(key)) {
          map.set(key, {
            name: s.name.trim(),
            phone: s.phone || '',
            caseNo: s.caseNo || '',
            caseTitle: ''
          });
        }
      });
    }
  } catch (e) {}

  return Array.from(map.values());
}

function saveClientToSavedList(name, phone = '', caseNo = '') {
  if (!name || !name.trim()) return;
  const cleanName = name.trim();
  try {
    const list = JSON.parse(localStorage.getItem('cmSavedClients') || '[]');
    const existing = list.find(c => (c.name || '').toLowerCase() === cleanName.toLowerCase());
    if (existing) {
      if (phone && !existing.phone) existing.phone = phone;
      if (caseNo && !existing.caseNo) existing.caseNo = caseNo;
    } else {
      list.push({ name: cleanName, phone: phone || '', caseNo: caseNo || '' });
    }
    localStorage.setItem('cmSavedClients', JSON.stringify(list.slice(-200)));
  } catch (e) {}
}

function searchSmartCaseSuggestions(query) {
  if (!query || query.trim().length < 2) return [];
  ensureAllCasesHaveParties();

  const q = query.trim();
  const results = [];
  const seenKeys = new Set();

  // 1. Check Saved Clients
  const clients = getAllKnownClients();
  clients.forEach(client => {
    const res = matchFuzzyQuery(client.name, q);
    if (res.matches) {
      const key = `client_${client.name.toLowerCase()}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        results.push({
          type: 'client',
          name: client.name,
          partyName: client.name,
          phone: client.phone,
          caseNo: client.caseNo,
          caseTitle: client.caseTitle,
          isExact: res.isExact,
          score: res.score + (res.isExact ? 25 : 5),
          tag: 'saved client',
          label: `${client.name}`,
          sub: client.caseNo ? `Saved client • Case: ${client.caseNo}${client.phone ? ' • ' + client.phone : ''}` : `Saved client ${client.phone ? '• ' + client.phone : ''}`
        });
      }
    }
  });

  // 2. Check Cases: All party names and case titles
  (allCaseRecords || []).forEach(c => {
    const cNo = c.caseNo || c.criminalCaseNumber || '';
    if (!cNo) return;
    const title = c.caseName || c.title || `${c.plaintiff || ''} vs ${c.defendant || ''}`.trim() || cNo;
    const parties = Array.isArray(c.parties) ? c.parties : [];

    // Match against each party in the case
    parties.forEach(party => {
      const res = matchFuzzyQuery(party, q);
      if (res.matches) {
        const key = `case_party_${cNo}_${party.toLowerCase()}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          results.push({
            type: 'case_party',
            partyName: party,
            caseNo: cNo,
            title,
            courtName: c.courtName || '',
            nextHearing: c.nextHearing || '',
            phone: c.clientNumber || '',
            isExact: res.isExact,
            score: res.score + (res.isExact ? 35 : 15),
            tag: res.isExact ? '✓ Party Match' : 'case party match',
            label: `${title} — ${cNo}`,
            sub: `Party: "${party}" ${c.courtName ? '• ' + c.courtName : ''}`
          });
        }
      }
    });

    // Match against case title or case number
    const titleRes = matchFuzzyQuery(title, q);
    const noRes = matchFuzzyQuery(cNo, q);
    if (titleRes.matches || noRes.matches) {
      const key = `case_title_${cNo}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        const score = Math.max(titleRes.score, noRes.score);
        results.push({
          type: 'case_title',
          partyName: c.clientName && c.clientName !== '—' ? c.clientName : '',
          caseNo: cNo,
          title,
          courtName: c.courtName || '',
          nextHearing: c.nextHearing || '',
          phone: c.clientNumber || '',
          isExact: titleRes.isExact || noRes.isExact,
          score: score + (titleRes.isExact ? 20 : 0),
          tag: 'case match',
          label: `${title} — ${cNo}`,
          sub: `Case: ${cNo} ${c.courtName ? '• ' + c.courtName : ''}`
        });
      }
    }
  });

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 8);
}

function handleAccountClientInput(val) {
  const container = document.getElementById('accountClientSuggestions');
  if (!container) return;

  if (!val || val.trim().length < 2) {
    container.classList.add('hidden');
    container.innerHTML = '';
    smartCaseSuggestionsCache = [];
    smartCaseActiveIndex = -1;
    return;
  }

  const suggestions = searchSmartCaseSuggestions(val);
  smartCaseSuggestionsCache = suggestions;
  smartCaseActiveIndex = -1;

  if (suggestions.length === 0) {
    container.classList.add('hidden');
    container.innerHTML = '';
    return;
  }

  renderAccountClientSuggestions(suggestions);
  container.classList.remove('hidden');

  // Auto-suggest badge if top match is strong
  const top = suggestions[0];
  if (top && top.caseNo && (top.isExact || top.score >= 75)) {
    showSuggestedCaseBadge(top.caseNo, top.title, false);
  }
}

function renderAccountClientSuggestions(suggestions) {
  const container = document.getElementById('accountClientSuggestions');
  if (!container) return;

  let html = '';
  suggestions.forEach((item, idx) => {
    const isClient = item.type === 'client';
    const icon = isClient ? '👤' : '📁';
    let tagClass = 'sugg-tag-client';
    if (item.isExact) tagClass = 'sugg-tag-exact';
    else if (item.type === 'case_party') tagClass = 'sugg-tag-party';

    html += `
      <div class="account-suggestion-item ${idx === smartCaseActiveIndex ? 'active' : ''}" 
           data-index="${idx}" 
           onclick="selectAccountCaseSuggestion(${idx})" 
           onmouseenter="setAccountSuggestionActive(${idx})">
        <span class="sugg-icon">${icon}</span>
        <div class="sugg-info">
          <div class="sugg-title">${escapeHtml(item.label)}</div>
          <div class="sugg-sub">${escapeHtml(item.sub)}</div>
        </div>
        <span class="sugg-tag ${tagClass}">${escapeHtml(item.tag)}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

function setAccountSuggestionActive(idx) {
  smartCaseActiveIndex = idx;
  const items = document.querySelectorAll('.account-suggestion-item');
  items.forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
}

function handleAccountClientKeydown(event) {
  const container = document.getElementById('accountClientSuggestions');
  if (!container || container.classList.contains('hidden') || smartCaseSuggestionsCache.length === 0) {
    return;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    smartCaseActiveIndex = (smartCaseActiveIndex + 1) % smartCaseSuggestionsCache.length;
    setAccountSuggestionActive(smartCaseActiveIndex);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    smartCaseActiveIndex = (smartCaseActiveIndex - 1 + smartCaseSuggestionsCache.length) % smartCaseSuggestionsCache.length;
    setAccountSuggestionActive(smartCaseActiveIndex);
  } else if (event.key === 'Enter') {
    if (smartCaseActiveIndex >= 0 && smartCaseActiveIndex < smartCaseSuggestionsCache.length) {
      event.preventDefault();
      selectAccountCaseSuggestion(smartCaseActiveIndex);
    }
  } else if (event.key === 'Escape') {
    container.classList.add('hidden');
  }
}

function selectAccountCaseSuggestion(idx) {
  const item = smartCaseSuggestionsCache[idx];
  if (!item) return;

  const clientInput = document.getElementById('accountClientName');
  const phoneInput = document.getElementById('accountClientPhone');
  const caseSelect = document.getElementById('accountCaseSelect');

  // 1. Fill client/payee name
  if (clientInput) {
    clientInput.value = item.partyName || item.name || clientInput.value;
  }

  // 2. Fill phone if available and empty
  if (phoneInput && item.phone && !phoneInput.value) {
    phoneInput.value = item.phone;
  }

  // 3. Auto-fill and link case
  if (item.caseNo && caseSelect) {
    caseSelect.value = item.caseNo;
    handleAccountCaseSelect(item.caseNo);
    showSuggestedCaseBadge(item.caseNo, item.title, true);
  }

  // Hide suggestions dropdown
  const container = document.getElementById('accountClientSuggestions');
  if (container) {
    container.classList.add('hidden');
    container.innerHTML = '';
  }
}

function showSuggestedCaseBadge(caseNo, caseTitle = '', autoLinked = true) {
  const badge = document.getElementById('accountSuggestedCaseBadge');
  if (!badge) return;

  if (!caseNo) {
    badge.classList.add('hidden');
    badge.innerHTML = '';
    return;
  }

  badge.innerHTML = `
    <span class="badge-text">📁 Link Case: <strong>${escapeHtml(caseNo)}</strong> ✅ (suggested)</span>
    <button type="button" class="badge-dismiss" onclick="dismissAccountCaseSuggestion()" title="Dismiss / Ignore suggestion">✕</button>
  `;
  badge.classList.remove('hidden');

  if (autoLinked) {
    const caseSelect = document.getElementById('accountCaseSelect');
    if (caseSelect) caseSelect.value = caseNo;
  }
}

function dismissAccountCaseSuggestion() {
  const caseSelect = document.getElementById('accountCaseSelect');
  if (caseSelect) caseSelect.value = '';
  const badge = document.getElementById('accountSuggestedCaseBadge');
  if (badge) {
    badge.classList.add('hidden');
    badge.innerHTML = '';
  }
}

// Global click dismiss for suggestions dropdown
if (typeof document !== 'undefined') {
  document.addEventListener('click', function(e) {
    const container = document.getElementById('accountClientSuggestions');
    const input = document.getElementById('accountClientName');
    if (container && !container.classList.contains('hidden')) {
      if (!container.contains(e.target) && e.target !== input) {
        container.classList.add('hidden');
      }
    }
  });
}

function setAccountsDateFilter(preset, customVal = '') {
  accountsDateFilter = preset;
  if (preset === 'custom') {
    if (!customVal) {
      const input = document.getElementById('accountsCustomDateInput');
      if (input && input.value) customVal = input.value;
    }
    if (customVal) {
      accountsCustomDate = customVal;
    }
    const labelEl = document.getElementById('accountsCustomDateLabel');
    if (labelEl) {
      labelEl.textContent = accountsCustomDate ? formatDateDMY(accountsCustomDate) : 'Custom Date';
    }
  } else {
    const labelEl = document.getElementById('accountsCustomDateLabel');
    if (labelEl) {
      labelEl.textContent = 'Custom Date';
    }
  }

  const pills = [
    { id: 'pillDateToday', key: 'today' },
    { id: 'pillDateYesterday', key: 'yesterday' },
    { id: 'pillDateWeek', key: 'this_week' },
    { id: 'pillDateMonth', key: 'this_month' },
    { id: 'pillDateAll', key: 'all' },
    { id: 'pillDateCustom', key: 'custom' }
  ];

  pills.forEach(p => {
    const el = document.getElementById(p.id);
    if (el) el.classList.toggle('active', p.key === preset);
  });

  renderAccountsTab();
}

function triggerAccountsCustomDatePicker(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const input = document.getElementById('accountsCustomDateInput');
  if (input) {
    if (typeof input.showPicker === 'function') {
      try { input.showPicker(); } catch (err) { input.focus(); input.click(); }
    } else {
      input.focus();
      input.click();
    }
  }
}

function handleAccountsSearchChange(val) {
  accountsSearchQuery = (val || '').toLowerCase().trim();
  renderAccountsTab();
}

function handleAccountsCategoryFilterChange(cat) {
  accountsCategoryFilter = cat || '';
  renderAccountsTab();
}

function handleAccountsWorkStatusFilterChange(status) {
  accountsWorkStatusFilter = status || '';
  renderAccountsTab();
}

function getAccountsPeriodLabel() {
  switch (accountsDateFilter) {
    case 'today': return 'Today';
    case 'yesterday': return 'Yesterday';
    case 'this_week': return 'This Week';
    case 'this_month': return 'This Month';
    case 'custom': return accountsCustomDate ? formatDateDMY(accountsCustomDate) : 'Custom Date';
    case 'all': default: return 'All Time';
  }
}

function getFilteredAccountRecords() {
  const todayStr = getTodayDateString();

  const yDate = new Date();
  yDate.setDate(yDate.getDate() - 1);
  const yesterdayStr = getAccountsDateString(yDate);

  const now = new Date();
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6, 0, 0, 0);

  return (allAccountRecords || []).filter(r => {
    // 1. Date Filter
    const entryDateStr = (r.entry_date || '').slice(0, 10);

    if (accountsDateFilter === 'today') {
      if (entryDateStr !== todayStr) return false;
    } else if (accountsDateFilter === 'yesterday') {
      if (entryDateStr !== yesterdayStr) return false;
    } else if (accountsDateFilter === 'this_week') {
      if (!entryDateStr) return false;
      const d = new Date(entryDateStr + 'T00:00:00');
      if (isNaN(d.getTime()) || d < weekStart || d > now) return false;
    } else if (accountsDateFilter === 'this_month') {
      if (!entryDateStr) return false;
      const d = new Date(entryDateStr + 'T00:00:00');
      if (isNaN(d.getTime()) || d.getFullYear() !== now.getFullYear() || d.getMonth() !== now.getMonth()) return false;
    } else if (accountsDateFilter === 'custom') {
      if (accountsCustomDate && entryDateStr !== accountsCustomDate) return false;
    }

    // 2. Category Filter
    if (accountsCategoryFilter && r.category !== accountsCategoryFilter) {
      return false;
    }

    // 3. Work Status Filter
    if (accountsWorkStatusFilter) {
      const status = (r.work_status || 'Pending').toLowerCase();
      if (status !== accountsWorkStatusFilter.toLowerCase()) return false;
    }

    // 4. Search Query Filter
    if (accountsSearchQuery) {
      const haystack = `${r.client_name || ''} ${r.client_phone || ''} ${r.case_number || ''} ${r.work_title || ''} ${r.notes || ''} ${r.category || ''} ${r.payment_mode || ''} ${r.work_status || ''}`.toLowerCase();
      if (!haystack.includes(accountsSearchQuery)) return false;
    }

    return true;
  });
}


function toggleDocInlinePreview() {

  const container = document.getElementById('aboutDocInlinePreviewContainer');
  const iframe = document.getElementById('aboutDocIframe');
  const btnText = document.getElementById('docPreviewBtnText');
  if (!container) return;

  const isHidden = container.style.display === 'none' || !container.style.display;
  if (isHidden) {
    if (iframe && !iframe.getAttribute('src') && iframe.getAttribute('data-src')) {
      iframe.setAttribute('src', iframe.getAttribute('data-src'));
    }
    container.style.display = 'block';
    if (btnText) btnText.textContent = 'Hide Manual Reader';
    try {
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) {}
  } else {
    container.style.display = 'none';
    if (btnText) btnText.textContent = 'Read Manual Here';
  }
}
if (typeof toggleDocInlinePreview !== 'undefined') window.toggleDocInlinePreview = toggleDocInlinePreview;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
