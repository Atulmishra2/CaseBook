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
window.escapeHtml = escapeHtml;

// Validate URLs to prevent javascript: / data: URI based XSS
function safeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed) || /^\/[^/\\]/i.test(trimmed)) {
    return escapeHtml(trimmed);
  }
  return '';
}
window.safeUrl = safeUrl;

// Precomputed Salted SHA-256 Hashes for Default Accounts (Zero plaintext credentials in code)
const DEFAULT_ADMIN_SALT = 'cms_salt_atul_2026';
const DEFAULT_ADMIN_HASH = 'b3b8334bf292bd8ccd8f2a69644cec239e71dec289508ac83c2e77ac03dc2c44';
const DEFAULT_DEMO_SALT = 'cms_salt_demo_2026';
const DEFAULT_DEMO_HASH = '2305ceca56a0e2f55f0e16db4b5deb4f9f4dcdab135b760347e746c659fa9dfd';

let currentSelectedCase = null;

const safeStorage = {
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
window.safeStorage = safeStorage;

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
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const RATE_LIMIT_LOCKOUT_MS = 60000; // 60s cooldown

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
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;
let inactivityTimerId = null;
let lastActivityTime = Date.now();

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
// ==============================================================================
const SUPABASE_URL = 'https://podehqyygbbabkimbcud.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_r8RXVVAf9UJfa9jtdamN_A_I5ZiDflg';

const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes('YOUR_PROJECT_ID') &&
  !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY')
);

let supabaseClient = (isSupabaseConfigured && window.supabase?.createClient)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

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
window.ensureSupabaseClient = ensureSupabaseClient;

// Dataset arrays (hydrated live from Supabase or user entries)
const defaultFallbackCases = [];
let defaultCourts = [
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

let courts = [...defaultCourts];
try {
  const cachedCourts = JSON.parse(localStorage.getItem('cmCourts_backup') || '[]');
  const deletedSet = getDeletedCourtsSet();
  if (Array.isArray(cachedCourts) && cachedCourts.length > 0) {
    courts = cachedCourts.filter(c => c && !deletedSet.has(c.trim().toLowerCase()));
  } else {
    courts = defaultCourts.filter(c => c && !deletedSet.has(c.trim().toLowerCase()));
  }
} catch (e) {}
let allCaseRecords = [];
let caseCardsFilteredList = [];
let caseCardsExpandedIndex = -1;
let guestCases = [];
const defaultFallbackHearings = [];
let allHearingRecords = [];
let allCaseTransfers = [];
window.allCaseTransfers = allCaseTransfers;

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

window.formatDateDMY = formatDateDMY;

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

window.parseDateString = parseDateString;

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

window.toISODate = toISODate;

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

window.formatDateHindi = formatDateHindi;

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
      allCaseTransfers = transfersRes.data;
      window.allCaseTransfers = allCaseTransfers;
      try {
        localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
      } catch (e) {}
      console.log(`Loaded ${allCaseTransfers.length} court transfers from Supabase.`);
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
window.performPostCrudRefresh = performPostCrudRefresh;

// ==============================================================================
// Automatic Uppercase Conversion for Case Number Inputs
// ==============================================================================

const CASE_NUMBER_INPUT_IDS = new Set([
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

window.isCaseNumberInputElement = isCaseNumberInputElement;
window.convertInputToUppercase = convertInputToUppercase;

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
window.checkCaseNumberExists = checkCaseNumberExists;

function clearCaseNumberValidationBadges() {
  document.querySelectorAll('.case-dup-warning, .case-dup-ok').forEach(el => el.remove());
  document.querySelectorAll('.input-dup-error').forEach(el => el.classList.remove('input-dup-error'));
}
window.clearCaseNumberValidationBadges = clearCaseNumberValidationBadges;

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
window.attachCaseNumberDuplicateListeners = attachCaseNumberDuplicateListeners;

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
window.cascadeUpdateCourtName = cascadeUpdateCourtName;

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
window.cascadeUpdateCaseNumber = cascadeUpdateCaseNumber;

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
window.restoreActiveAdminTab = restoreActiveAdminTab;

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
window.checkInitialAuth = checkInitialAuth;

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

window.handleAdminLogin = handleAdminLogin;
window.isValidAdminLogin = isValidAdminLogin;

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
window.handleAdminLogout = handleAdminLogout;

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
window.handleGuestLogin = handleGuestLogin;

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
window.handleLogout = handleLogout;

let tabNavigationHistory = [];
let tabForwardHistory = [];
let currentActiveTabId = 'home';

function showTab(tabId, event, navType = 'navigate') {
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
    renderCaseTypeOptions();
    renderCourtOptions();
    renderCriminalCourtOptions();
    toggleCaseFormByType();
  }

  if (tabId === 'update') {
    renderCaseTypeOptions();
    renderCourtOptions();
    renderCriminalCourtOptions();
    toggleUpdateCaseFormByType();
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
    populateHearingCaseDropdown();
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

  if (tabId === 'themes') {
    if (typeof window.renderThemeSettings === 'function') window.renderThemeSettings();
  }

  if (tabId === 'accounts') {
    renderAccountsTab();
  }

  if (tabId === 'paisa') {
    renderPaisaTab();
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
  if (window.innerWidth <= 768) {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
  }
}

/* ==============================================================================
   Mobile Back Button & History Navigation Architecture
   ============================================================================== */

let lastExitBackPressTime = 0;
let isInternalHistoryNav = false;

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
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('mobile-open');
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
}

function toggleMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  if (sidebar) {
    const isOpen = sidebar.classList.toggle('mobile-open');
    if (sidebarOverlay) {
      sidebarOverlay.classList.toggle('active', isOpen);
    }
  }
}
window.toggleMobileSidebar = toggleMobileSidebar;

window.getOpenModalInfo = getOpenModalInfo;
window.isMobileSidebarOpen = isMobileSidebarOpen;
window.closeMobileSidebarDrawer = closeMobileSidebarDrawer;
window.handlePopStateNavigation = handlePopStateNavigation;
window.setupMobileBackAndHistory = setupMobileBackAndHistory;
window.goPreviousTab = goPreviousTab;
window.goForwardTab = goForwardTab;
window.updateNavigationButtons = updateNavigationButtons;

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
window.togglePasswordVisibility = togglePasswordVisibility;

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
window.handleChangeCredentials = handleChangeCredentials;

// ==============================================================================
// Case Full Details & History Rendering
// ==============================================================================

function getCaseHearingHistory(caseNumber) {
  if (!caseNumber) return [];
  const normalized = caseNumber.trim().toLowerCase();
  const cleanKey = normalized.replace(/[^a-z0-9]/g, '');

  const list = allHearingRecords.filter(h => {
    const hNo = (h.case_number || '').trim().toLowerCase();
    if (hNo === normalized) return true;
    if (cleanKey && hNo.replace(/[^a-z0-9]/g, '') === cleanKey) return true;
    // Fallback: If case is Cr.Rev./129/2026 and hearing is Cri-Rev-
    if ((normalized === 'cr.rev./129/2026' || normalized.includes('129/2026')) && hNo === 'cri-rev-') return true;
    return false;
  });

  // Sort descending by hearing_date
  return list.sort((a, b) => {
    const da = new Date(a.hearing_date || a.created_at);
    const db = new Date(b.hearing_date || b.created_at);
    return db - da;
  });
}

function renderSelectedCaseDetails(caseObj) {
  const emptyBox = document.getElementById('searchCaseDetailsEmpty');
  const contentBox = document.getElementById('searchCaseDetailsContent');
  const badge = document.getElementById('searchCaseTypeBadge');

  if (!caseObj) {
    if (emptyBox) emptyBox.classList.remove('hidden');
    if (contentBox) contentBox.classList.add('hidden');
    const addTodoBtn = document.getElementById('searchAddTodoBtn');
    if (addTodoBtn) addTodoBtn.style.display = 'none';
    if (badge) {
      badge.textContent = 'Select a Case';
      badge.className = 'case-badge';
    }
    return;
  }

  if (emptyBox) emptyBox.classList.add('hidden');
  if (contentBox) contentBox.classList.remove('hidden');

  const caseNumber = caseObj.caseNo || caseObj.criminalCaseNumber || '—';
  const rawType = (caseObj.caseType || 'civil').toLowerCase().trim();
  const isCriminal = rawType === 'state' || rawType === 'criminal' || rawType === 'misc_criminal';
  const isFamily = rawType === 'family';
  const isRevenue = rawType === 'revenue';

  let typeBadgeLabel = 'CIVIL';
  if (isCriminal) typeBadgeLabel = 'STATE (CRIMINAL)';
  else if (isFamily) typeBadgeLabel = 'FAMILY';
  else if (isRevenue) typeBadgeLabel = 'REVENUE';
  else if (rawType === 'complaint') typeBadgeLabel = 'COMPLAINT';
  else typeBadgeLabel = rawType.replace('_', ' ').toUpperCase();

  if (badge) {
    badge.textContent = typeBadgeLabel;
    badge.className = `case-badge ${rawType}`;
  }

  // Build accurate title
  let caseTitle = (caseObj.caseName || '').trim();
  if (!caseTitle || caseTitle.toLowerCase() === 'vs' || caseTitle.toLowerCase() === 'vs.') {
    if (caseObj.plaintiff && caseObj.defendant) {
      caseTitle = `${caseObj.plaintiff} vs ${caseObj.defendant}`;
    } else if (caseObj.victimName && caseObj.accusedName) {
      caseTitle = `${caseObj.victimName} vs ${caseObj.accusedName}`;
    } else if (caseObj.accusedName) {
      caseTitle = `State vs ${caseObj.accusedName}`;
    } else if (caseObj.plaintiff) {
      caseTitle = `${caseObj.plaintiff} vs Opposite`;
    } else {
      caseTitle = caseNumber !== '—' ? `Case ${caseNumber}` : 'Untitled Matter';
    }
  }

  const titleEl = document.getElementById('detailCaseTitle');
  if (titleEl) titleEl.textContent = caseTitle;

  const setVal = (id, val, fallback = '—') => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || fallback;
  };

  const courtName = caseObj.courtName || caseObj.criminalCourtName || 'District Court';
  setVal('detailCaseNo', caseNumber);
  setVal('detailCourtName', courtName);

  const isDisposed = (caseObj.caseStatus || '').toLowerCase().includes('dispose');
  const isUndated = !caseObj.nextHearing || caseObj.nextHearing === '—' || caseObj.nextHearing === 'null' || !caseObj.nextHearing.trim() || caseObj.nextHearing.toLowerCase() === 'undated';

  const statusBadgeEl = document.getElementById('detailCaseStatusBadge');
  if (statusBadgeEl) {
    if (isDisposed) {
      statusBadgeEl.className = 'status-badge disposed';
      statusBadgeEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Disposed Off';
    } else if (isUndated) {
      statusBadgeEl.className = 'status-badge undated';
      statusBadgeEl.style = 'background:#fef3c7; color:#92400e; border:1px solid #fde68a;';
      statusBadgeEl.innerHTML = '<i class="fa-solid fa-calendar-xmark"></i> Undated';
    } else {
      statusBadgeEl.className = 'status-badge pending';
      statusBadgeEl.style = '';
      statusBadgeEl.innerHTML = '<i class="fa-solid fa-clock"></i> Pending';
    }
  }

  setVal('detailNextHearing', isUndated ? '—' : formatDateDMY(caseObj.nextHearing));
  setVal('detailHearingProcess', isUndated ? 'Undated' : (caseObj.hearingProcess || 'Scheduled Hearing'));

  // Determine previous hearing
  const caseHistory = getCaseHearingHistory(caseNumber);
  const currentNext = (caseObj.nextHearing && caseObj.nextHearing !== '—') ? caseObj.nextHearing : null;
  const currentNextISO = toISODate(caseObj.nextHearing);
  const todayISO = toISODate(new Date());

  const prevHearings = caseHistory.filter(h => {
    const hISO = toISODate(h.hearing_date);
    if (currentNextISO && hISO === currentNextISO) return false;
    // A future hearing is an upcoming date, never a "previous" hearing
    if (hISO && hISO > todayISO) return false;
    return true;
  });
  const latestPrev = prevHearings[0];
  const prevHearingDate = latestPrev ? latestPrev.hearing_date : (caseObj.previousHearing || null);
  const prevProcess = latestPrev ? latestPrev.process : (caseObj.previousProcess || null);

  // 1. CARD 1: Court & Case Info (Only related & present fields)
  const courtCardBody = document.getElementById('detailCourtCardBody');
  if (courtCardBody) {
    const filingDate = caseObj.filingDate || caseObj.crimeFilingDate;
    const filingDateFormatted = (filingDate && filingDate !== '—') ? formatDateDMY(filingDate) : null;
    const year = caseObj.caseYear || caseObj.crimeYear || null;

    let props = '';
    props += `
      <div class="dossier-prop">
        <span class="prop-label">Case Type</span>
        <span class="prop-val font-semibold">${escapeHtml(typeBadgeLabel)}</span>
      </div>
    `;
    if (year) {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Registration Year</span>
          <span class="prop-val">${escapeHtml(year)}</span>
        </div>
      `;
    }
    props += `
      <div class="dossier-prop">
        <span class="prop-label">Court / Forum</span>
        <span class="prop-val font-semibold">${escapeHtml(courtName)}</span>
      </div>
    `;
    if (filingDateFormatted) {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Filing Date</span>
          <span class="prop-val">${escapeHtml(filingDateFormatted)}</span>
        </div>
      `;
    }
    if (prevHearingDate && prevHearingDate !== '—') {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Previous Hearing</span>
          <span class="prop-val">${escapeHtml(formatDateDMY(prevHearingDate))}</span>
        </div>
      `;
    }
    if (prevProcess && prevProcess !== '—') {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Previous Stage</span>
          <span class="prop-val">${escapeHtml(prevProcess)}</span>
        </div>
      `;
    }
    if (!isUndated && caseObj.hearingProcess) {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Next Stage</span>
          <span class="prop-val font-semibold" style="color: #1e40af;">${escapeHtml(caseObj.hearingProcess)}</span>
        </div>
      `;
    }
    courtCardBody.innerHTML = props;
  }

  // 2. CARD 2: Parties & Particulars (Show ONLY related fields for this case type!)
  const partiesCardBody = document.getElementById('detailPartiesCardBody');
  if (partiesCardBody) {
    let props = '';

    if (isCriminal) {
      const stateParty = caseObj.firstParty || caseObj.victimName || 'State of U.P.';
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Prosecution / State</span>
          <span class="prop-val font-semibold text-slate-800">${escapeHtml(stateParty)}</span>
        </div>
      `;
      if (caseObj.accusedName) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Accused Person(s)</span>
            <span class="prop-val font-semibold text-slate-900">${escapeHtml(caseObj.accusedName)}</span>
          </div>
        `;
      }
      if (caseObj.policeStation) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Police Station</span>
            <span class="prop-val">🚔 ${escapeHtml(caseObj.policeStation)}</span>
          </div>
        `;
      }
      if (caseObj.crimeNumber || caseObj.firNumber) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Crime / FIR No.</span>
            <span class="prop-val font-semibold">${escapeHtml(caseObj.crimeNumber || caseObj.firNumber)}</span>
          </div>
        `;
      }
      if (caseObj.crimeSection) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Sections / IPC / BNS</span>
            <span class="prop-val">${escapeHtml(caseObj.crimeSection)}</span>
          </div>
        `;
      }
      if (caseObj.custodyStatus) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Custody / Bail Status</span>
            <span class="prop-val">${escapeHtml(caseObj.custodyStatus)}</span>
          </div>
        `;
      }
    } else if (isFamily) {
      const petitioner = caseObj.petitioner || caseObj.plaintiff;
      const respondent = caseObj.respondent || caseObj.defendant;
      if (petitioner) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Petitioner / Applicant</span>
            <span class="prop-val font-semibold">${escapeHtml(petitioner)}</span>
          </div>
        `;
      }
      if (respondent) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Respondent / Opposite</span>
            <span class="prop-val font-semibold">${escapeHtml(respondent)}</span>
          </div>
        `;
      }
      if (caseObj.familyMatterType || caseObj.matterType) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Dispute / Matter Type</span>
            <span class="prop-val">${escapeHtml(caseObj.familyMatterType || caseObj.matterType)}</span>
          </div>
        `;
      }
      if (caseObj.marriageDate) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Marriage Date</span>
            <span class="prop-val">${formatDateDMY(caseObj.marriageDate)}</span>
          </div>
        `;
      }
      if (caseObj.maintenance) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Maintenance Ordered</span>
            <span class="prop-val font-semibold text-emerald-800">${escapeHtml(caseObj.maintenance)}</span>
          </div>
        `;
      }
    } else if (isRevenue) {
      const applicant = caseObj.plaintiff || caseObj.applicant || caseObj.firstParty;
      const opposite = caseObj.defendant || caseObj.respondent || caseObj.oppositeParty;
      if (applicant) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Applicant / Petitioner</span>
            <span class="prop-val font-semibold">${escapeHtml(applicant)}</span>
          </div>
        `;
      }
      if (opposite) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Opposite Party</span>
            <span class="prop-val font-semibold">${escapeHtml(opposite)}</span>
          </div>
        `;
      }
      if (caseObj.revenueMatterType) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Revenue Matter</span>
            <span class="prop-val">${escapeHtml(caseObj.revenueMatterType)}</span>
          </div>
        `;
      }
      if (caseObj.village) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Village / Mauza</span>
            <span class="prop-val">${escapeHtml(caseObj.village)}</span>
          </div>
        `;
      }
      if (caseObj.khataNo || caseObj.gataNo) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Khata / Gata No.</span>
            <span class="prop-val font-semibold">${escapeHtml([caseObj.khataNo ? `Khata: ${caseObj.khataNo}` : '', caseObj.gataNo ? `Gata: ${caseObj.gataNo}` : ''].filter(Boolean).join(' | '))}</span>
          </div>
        `;
      }
    } else {
      // Civil / Standard
      const plaintiff = caseObj.plaintiff || caseObj.firstParty;
      const defendant = caseObj.defendant || caseObj.oppositeParty;
      if (plaintiff) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Plaintiff / Petitioner</span>
            <span class="prop-val font-semibold">${escapeHtml(plaintiff)}</span>
          </div>
        `;
      }
      if (defendant) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Defendant / Respondent</span>
            <span class="prop-val font-semibold">${escapeHtml(defendant)}</span>
          </div>
        `;
      }
      if (caseObj.matterType) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Matter / Suit Nature</span>
            <span class="prop-val">${escapeHtml(caseObj.matterType)}</span>
          </div>
        `;
      }
    }

    if (!props.trim()) {
      props = `<div class="dossier-prop"><span class="prop-label">Parties</span><span class="prop-val">${escapeHtml(caseTitle)}</span></div>`;
    }
    partiesCardBody.innerHTML = props;
  }

  // 3. CARD 3: Client & Documents
  const clientCardBody = document.getElementById('detailClientCardBody');
  if (clientCardBody) {
    const clientName = caseObj.clientName || caseObj.criminalClientName;
    const clientPhone = caseObj.clientNumber || caseObj.criminalClientNumber;
    const docLink = caseObj.docLink || caseObj.doc_link;

    let statusBadgeHtml = '';
    if (isDisposed) {
      statusBadgeHtml = '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed Off</span>';
    } else if (isUndated) {
      statusBadgeHtml = '<span class="status-badge undated" style="background:#fef3c7; color:#92400e; border:1px solid #fde68a;"><i class="fa-solid fa-calendar-xmark"></i> Undated</span>';
    } else {
      statusBadgeHtml = '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
    }

    let props = '';
    props += `
      <div class="dossier-prop">
        <span class="prop-label">Client Name</span>
        <span class="prop-val font-semibold text-teal-800">${escapeHtml(clientName || '—')}</span>
      </div>
    `;
    if (clientPhone) {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Client Contact</span>
          <span class="prop-val"><a href="tel:${escapeHtml(clientPhone)}" style="color:#2563eb; text-decoration:none;">📞 ${escapeHtml(clientPhone)}</a></span>
        </div>
      `;
    }
    props += `
      <div class="dossier-prop">
        <span class="prop-label">Case Status</span>
        <span class="prop-val">${statusBadgeHtml}</span>
      </div>
    `;
    const cleanDoc = safeUrl(docLink);
    if (cleanDoc) {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Order Sheet / File</span>
          <span class="prop-val"><a href="${cleanDoc}" target="_blank" rel="noopener noreferrer" class="doc-link-pill">🔗 Open Document ↗</a></span>
        </div>
      `;
    } else {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Order Sheet / File</span>
          <span class="prop-val" style="color: #94a3b8;">None attached</span>
        </div>
      `;
    }
    clientCardBody.innerHTML = props;
  }

  // 4. Remarks, Co-Parties & Disposal Box
  const remarkEl = document.getElementById('detailCaseRemark');
  if (remarkEl) {
    const remark = caseObj.remark || caseObj.remarks || '';
    const norm = normalizeRemarksData(remark);
    if (norm.type !== 'empty') {
      remarkEl.innerHTML = renderStructuredRemarks(remark);
    } else {
      remarkEl.innerHTML = '<span style="color:#94a3b8; font-style:italic;">No co-parties or remarks recorded for this case.</span>';
    }
  }

  const disposalEl = document.getElementById('detailCaseDisposalComment');
  if (disposalEl) {
    const disposalComment = caseObj.disposalComment || caseObj.disposal_comment || '';
    if (disposalComment && disposalComment.trim()) {
      disposalEl.innerHTML = `<span style="color:#065f46; font-weight:600;">⚖️ ${escapeHtml(disposalComment.trim())}</span>`;
    } else {
      disposalEl.innerHTML = '<span style="color:#94a3b8; font-style:italic;">No disposal comment recorded yet.</span>';
    }
  }

  // 5. PROCEEDINGS & HEARING HISTORY (Dynamic Inline Table)
  const history = getCaseHearingHistory(caseNumber);
  const events = [];

  // Recorded hearings from history
  history.forEach(h => {
    const isNext = Boolean(currentNextISO && toISODate(h.hearing_date) === currentNextISO);
    events.push({
      date: h.hearing_date,
      process: h.process || 'Court Hearing',
      type: isNext ? 'next' : 'prev',
      action: h.action_taken || h.remarks || 'Court proceedings conducted.'
    });
  });

  // Add next hearing milestone if scheduled
  if (currentNext && !events.some(e => toISODate(e.date) === currentNextISO)) {
    events.push({
      date: currentNext,
      process: caseObj.hearingProcess || 'Scheduled Hearing',
      type: 'next',
      action: `Next appearance scheduled at ${courtName}`
    });
  }

  // Add previous hearing milestone if recorded on caseObj
  if (caseObj.previousHearing && caseObj.previousHearing !== '—' && !events.some(e => e.date === caseObj.previousHearing)) {
    events.push({
      date: caseObj.previousHearing,
      process: caseObj.previousProcess || 'Previous Stage',
      type: 'prev',
      action: `Previous proceedings recorded at ${courtName}`
    });
  }

  // Add filing date milestone
  const filingDateVal = caseObj.filingDate || caseObj.crimeFilingDate;
  if (filingDateVal && filingDateVal !== '—' && !events.some(e => e.date === filingDateVal)) {
    events.push({
      date: filingDateVal,
      process: 'Case Inception & Filing',
      type: 'filing',
      action: `Case instituted and registered at ${courtName}`
    });
  }

  // Sort newest first
  events.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    return db - da;
  });

  const inlineTbody = document.getElementById('detailInlineHistoryTableBody');
  if (inlineTbody) {
    if (events.length === 0) {
      inlineTbody.innerHTML = `
        <tr>
          <td colspan="5" class="no-results text-center py-4" style="color: #64748b; padding: 2rem;">
            ℹ️ No proceedings or hearing history records logged yet for this case.
            <div style="margin-top: 8px;">
              <button type="button" class="table-view-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" style="font-size: 0.8rem;">
                📅 Log Next Hearing
              </button>
            </div>
          </td>
        </tr>
      `;
    } else {
      inlineTbody.innerHTML = events.map((ev, idx) => {
        let badgeHtml = '';
        if (ev.type === 'next') {
          badgeHtml = '<span class="history-badge-next" style="background:#e6f4ea; color:#137333; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:600;"><i class="fa-solid fa-clock"></i> Upcoming Hearing</span>';
        } else if (ev.type === 'filing') {
          badgeHtml = '<span class="history-badge-filing" style="background:#e8f0fe; color:#1a73e8; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:600;"><i class="fa-solid fa-file-signature"></i> Initial Filing</span>';
        } else {
          badgeHtml = '<span class="history-badge-prev" style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:600;"><i class="fa-solid fa-circle-check"></i> Past Hearing</span>';
        }

        return `
          <tr>
            <td style="text-align: center; font-weight: 600; color: #64748b;">#${idx + 1}</td>
            <td style="white-space: nowrap; font-weight: 600;">${formatDateDMY(ev.date)}</td>
            <td style="font-weight: 600; color: #1e40af;">${escapeHtml(ev.process || '—')}</td>
            <td>${badgeHtml}</td>
            <td>${escapeHtml(ev.action || 'Court appearance & proceedings recorded.')}</td>
          </tr>
        `;
      }).join('');
    }
  }

  currentSelectedCase = caseObj;

  const editBtn = document.getElementById('detailEditBtn');
  if (editBtn) {
    editBtn.onclick = () => {
      showTab('update');
      const searchInput = document.getElementById('updateSearchInput');
      if (searchInput) {
        searchInput.value = caseObj.caseNo || caseObj.criminalCaseNumber || '';
      }
      loadCaseForUpdate(caseObj.caseNo || caseObj.criminalCaseNumber);
    };
  }

  const hearingBtn = document.getElementById('detailHearingBtn');
  if (hearingBtn) {
    hearingBtn.onclick = () => {
      showTab('hearing');
      const caseNoInput = document.getElementById('hearingCaseNo');
      if (caseNoInput) {
        caseNoInput.value = caseObj.caseNo || caseObj.criminalCaseNumber || '';
      }
    };
  }

  const transferBtn = document.getElementById('detailTransferBtn');
  if (transferBtn) {
    transferBtn.onclick = () => {
      openTransferForCase(caseObj.caseNo || caseObj.criminalCaseNumber || '');
    };
  }

  const whatsappBtn = document.getElementById('detailWhatsAppBtn');
  if (whatsappBtn) {
    whatsappBtn.onclick = () => {
      sendWhatsAppHearingNotice(caseObj);
    };
  }

  // Render Court Transfer History section in dossier
  renderCaseTransferHistory(caseNumber, caseObj);

  const historyBtn = document.getElementById('detailHistoryBtn');
  if (historyBtn) {
    historyBtn.onclick = () => {
      openCaseHistoryModal(caseObj);
    };
  }

  const printBtn = document.getElementById('detailPrintBtn');
  if (printBtn) {
    printBtn.onclick = () => {
      printCurrentCaseDossier(caseObj);
    };
  }

  const addTodoBtn = document.getElementById('searchAddTodoBtn');
  if (addTodoBtn) {
    addTodoBtn.style.display = 'inline-flex';
    addTodoBtn.onclick = () => {
      openTodoForCase(caseObj.caseNo || caseObj.criminalCaseNumber || '');
    };
  }
}

function openCaseHistoryModal(caseObj) {
  if (!caseObj) return;

  const modal = document.getElementById('caseHistoryModal');
  if (!modal) return;

  const caseNumber = caseObj.caseNo || caseObj.criminalCaseNumber || '—';
  const caseName = caseObj.caseName || (caseObj.plaintiff ? `${caseObj.plaintiff} vs ${caseObj.defendant}` : (caseObj.victimName ? `${caseObj.victimName} vs ${caseObj.accusedName}` : '—'));
  const caseType = (caseObj.caseType || 'civil').toUpperCase();
  const courtName = caseObj.courtName || caseObj.criminalCourtName || '—';
  const nextHearing = formatDateDMY(caseObj.nextHearing);
  const nextProcess = caseObj.hearingProcess || '—';

  const modalCaseNo = document.getElementById('modalCaseNo');
  const modalCaseTitle = document.getElementById('modalCaseTitle');
  const modalCourtName = document.getElementById('modalCourtName');
  const modalNextHearingBadge = document.getElementById('modalNextHearingBadge');
  const tbody = document.getElementById('caseHistoryTableBody');
  const emptyBox = document.getElementById('caseHistoryEmpty');

  if (modalCaseNo) modalCaseNo.textContent = caseNumber;
  if (modalCaseTitle) modalCaseTitle.textContent = caseName;
  if (modalCourtName) modalCourtName.textContent = courtName;
  if (modalNextHearingBadge) {
    modalNextHearingBadge.textContent = nextHearing !== '—' ? `${nextHearing} (${nextProcess})` : 'Not Scheduled';
    modalNextHearingBadge.className = `case-badge ${(caseObj.caseType || 'civil').toLowerCase()}`;
  }

  // Retrieve hearings for this case
  const history = getCaseHearingHistory(caseNumber);
  const currentNext = (caseObj.nextHearing && caseObj.nextHearing !== '—') ? caseObj.nextHearing : null;

  // Build unified hearing events list
  const events = [];

  // Add recorded hearings
  const currentNextISO = toISODate(currentNext);
  history.forEach(h => {
    const isNext = Boolean(currentNextISO && toISODate(h.hearing_date) === currentNextISO);
    events.push({
      date: h.hearing_date,
      process: h.process || '—',
      type: isNext ? 'next' : 'prev',
      action: h.action_taken || h.remarks || 'Court proceedings conducted.'
    });
  });

  // If case has next hearing not already present in events
  if (currentNext && !events.some(e => toISODate(e.date) === currentNextISO)) {
    events.push({
      date: currentNext,
      process: caseObj.hearingProcess || 'Scheduled Hearing',
      type: 'next',
      action: `Next hearing appearance at ${courtName}`
    });
  }

  // If case has previousHearing stored on case object not already present
  if (caseObj.previousHearing && caseObj.previousHearing !== '—' && !events.some(e => e.date === caseObj.previousHearing)) {
    events.push({
      date: caseObj.previousHearing,
      process: caseObj.previousProcess || 'Previous Stage',
      type: 'prev',
      action: `Previous proceedings recorded at ${courtName}`
    });
  }

  // Include filing date milestone if available
  const filingDate = caseObj.filingDate || caseObj.crimeFilingDate;
  if (filingDate && filingDate !== '—') {
    events.push({
      date: filingDate,
      process: 'Case Inception & Filing',
      type: 'filing',
      action: `Case instituted and registered at ${courtName}`
    });
  }

  // Sort events descending (newest first)
  events.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    return db - da;
  });

  if (tbody) {
    if (events.length === 0) {
      tbody.innerHTML = '';
      if (emptyBox) emptyBox.classList.remove('hidden');
    } else {
      if (emptyBox) emptyBox.classList.add('hidden');
      tbody.innerHTML = events.map((ev, idx) => {
        let badgeHtml = '';
        if (ev.type === 'next') {
          badgeHtml = '<span class="history-badge-next">Upcoming Hearing</span>';
        } else if (ev.type === 'filing') {
          badgeHtml = '<span class="history-badge-filing">Initial Filing</span>';
        } else {
          badgeHtml = '<span class="history-badge-prev">Previous Hearing</span>';
        }

        return `
          <tr>
            <td><strong>${idx + 1}</strong></td>
            <td><strong>${formatDateDMY(ev.date)}</strong></td>
            <td><strong>${ev.process}</strong></td>
            <td>${badgeHtml}</td>
            <td>${ev.action}</td>
          </tr>
        `;
      }).join('');
    }
  }

  // Hook up update hearing button in modal
  const updateBtn = document.getElementById('modalUpdateHearingBtn');
  if (updateBtn) {
    updateBtn.onclick = () => {
      closeCaseHistoryModal();
      openUpdateHearingForCase(caseNumber);
    };
  }

  modal.classList.remove('hidden');
}

function closeCaseHistoryModal() {
  const modal = document.getElementById('caseHistoryModal');
  if (modal) modal.classList.add('hidden');
}

function openCaseHistoryModalByNo(caseNo) {
  if (!caseNo) return;
  const q = caseNo.trim().toLowerCase();
  const found = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === q || num2 === q;
  });
  if (found) {
    openCaseHistoryModal(found);
  } else {
    alert(`Case "${caseNo}" details could not be found.`);
  }
}

window.openCaseHistoryModal = openCaseHistoryModal;
window.openCaseHistoryModalByNo = openCaseHistoryModalByNo;
window.closeCaseHistoryModal = closeCaseHistoryModal;
window.getCaseHearingHistory = getCaseHearingHistory;

/* ==============================================================================
   Expandable Nav Case Search (top header search icon)
   ============================================================================== */
let navCaseSearchOpen = false;

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

  document.addEventListener('click', e => {
    const wrap = document.getElementById('navCaseSearch');
    if (navCaseSearchOpen && wrap && !wrap.contains(e.target)) {
      toggleNavCaseSearch(false);
    }
  });
});

window.toggleNavCaseSearch = toggleNavCaseSearch;
window.onNavCaseSearchInput = onNavCaseSearchInput;
window.selectNavCaseSearchResult = selectNavCaseSearchResult;

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'allCaseRecords', {
    get() { return allCaseRecords; },
    set(v) { allCaseRecords = v; },
    configurable: true
  });
  Object.defineProperty(window, 'allHearingRecords', {
    get() { return allHearingRecords; },
    set(v) { allHearingRecords = v; },
    configurable: true
  });
}

let currentGuestSelectedCase = null;

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

window.populateHearingCaseDropdown = populateHearingCaseDropdown;

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

window.openUpdateHearingForCase = openUpdateHearingForCase;

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

window.renderHearingCaseInfo = renderHearingCaseInfo;

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

window.setHearingDateOffset = setHearingDateOffset;

// ── Quick Court Stage Preset Helper ─────────────────────────────────────────
function setHearingStagePreset(stageText) {
  const processInput = document.getElementById('hearingProcess');
  if (processInput) {
    processInput.value = stageText;
    updateHearingLivePreview();
  }
}

window.setHearingStagePreset = setHearingStagePreset;

// ── Case-type-aware Court Stage Presets ────────────────────────────────────
// Common core shared by every type + per-type specialist stages.
const HEARING_STAGE_PRESETS = {
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

window.renderHearingStagePills = renderHearingStagePills;

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

window.updateHearingLivePreview = updateHearingLivePreview;

// ==============================================================================
// Edit Previous Hearing Date (in Update Hearing tab)
// ==============================================================================

// Track the hearing record currently being edited
let _editingPrevHearingCaseNo = null;
let _editingPrevHearingRecord = null;

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
window.toggleEditPrevDate = toggleEditPrevDate;

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
window.savePrevDateEdit = savePrevDateEdit;

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
window.showToastNotification = showToastNotification;

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
window.copyCaseNumberToClipboard = copyCaseNumberToClipboard;

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

window.filterCaseTables = filterCaseTables;

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

window.setQuickCaseFilter = setQuickCaseFilter;

// ==============================================================================
// My Daily Cause List & Court Appearance Board Engine
// ==============================================================================

let currentCauseListDate = '';
let currentCauseListCourt = '';

function initCauseListTab() {
  const dateInput = document.getElementById('causeListDateInput');
  const courtSelect = document.getElementById('causeListCourtFilterSelect');

  if (!currentCauseListDate) {
    currentCauseListDate = new Date().toISOString().split('T')[0];
  }
  if (dateInput) {
    dateInput.value = currentCauseListDate;
  }

  // Populate court options for cause list filter (excludes deleted courts)
  if (courtSelect) {
    const prevVal = courtSelect.value || '';
    const deletedCourts = getDeletedCourtsSet();
    const seenCourts = new Set();
    courtSelect.innerHTML = '<option value="">🏛️ All Courts</option>';
    courts.forEach(court => {
      const t = (court || '').trim();
      const key = t.toLowerCase();
      if (!t || deletedCourts.has(key) || seenCourts.has(key)) return;
      seenCourts.add(key);
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      courtSelect.appendChild(opt);
    });
    if (prevVal) courtSelect.value = prevVal;
  }

  renderCauseListTable(currentCauseListDate, courtSelect ? courtSelect.value : '');
}

window.initCauseListTab = initCauseListTab;

function setCauseListDateOffset(daysOffset) {
  const target = new Date();
  target.setDate(target.getDate() + daysOffset);

  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  currentCauseListDate = `${yyyy}-${mm}-${dd}`;

  const dateInput = document.getElementById('causeListDateInput');
  if (dateInput) {
    dateInput.value = currentCauseListDate;
  }

  const courtSelect = document.getElementById('causeListCourtFilterSelect');
  renderCauseListTable(currentCauseListDate, courtSelect ? courtSelect.value : '');
}

window.setCauseListDateOffset = setCauseListDateOffset;

function renderCauseListTable(dateVal = currentCauseListDate, courtFilter = '') {
  if (!dateVal) {
    dateVal = new Date().toISOString().split('T')[0];
  }
  currentCauseListDate = dateVal;
  currentCauseListCourt = (courtFilter || '').trim().toLowerCase();

  const container = document.getElementById('causeListCardsContainer');
  const tbody = document.getElementById('causeListTableBody');
  const bannerDateText = document.getElementById('causeListBannerDateText');
  const bannerDayName = document.getElementById('causeListBannerDayName');

  const totalBadge = document.getElementById('causeListTotalBadge');
  const civilBadge = document.getElementById('causeListCivilBadge');
  const criminalBadge = document.getElementById('causeListCriminalBadge');
  const revenueBadge = document.getElementById('causeListRevenueBadge');
  const navBadge = document.getElementById('causeListNavCount');

  // Format date readable
  const daysOfWeek = ['Sunday (रविवार)', 'Monday (सोमवार)', 'Tuesday (मंगलवार)', 'Wednesday (बुधवार)', 'Thursday (गुरुवार)', 'Friday (शुक्रवार)', 'Saturday (शनिवार)'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const parts = dateVal.split('-');
  const dtObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const dayName = daysOfWeek[dtObj.getDay()];
  const formattedLong = `${parseInt(parts[2], 10)} ${months[dtObj.getMonth()]} ${parts[0]}`;

  if (bannerDateText) bannerDateText.textContent = `Daily Listed Matters — ${formattedLong}`;
  if (bannerDayName) bannerDayName.textContent = `Court Day: ${dayName}`;

  // Find all cases listed for this date
  let listedCases = allCaseRecords.filter(c => {
    return c.nextHearing === dateVal;
  });

  // Filter by court if selected
  if (currentCauseListCourt) {
    listedCases = listedCases.filter(c => {
      const ct = (c.courtName || c.criminalCourtName || '').trim().toLowerCase();
      return ct === currentCauseListCourt;
    });
  }

  // Update stats
  const civilCount = listedCases.filter(c => (c.caseType || 'civil') === 'civil').length;
  const criminalCount = listedCases.filter(c => (c.caseType || '') === 'criminal').length;
  const revenueCount = listedCases.filter(c => (c.caseType || '') === 'revenue').length;

  if (totalBadge) totalBadge.textContent = `${listedCases.length} Total Matters Listed`;
  if (civilBadge) civilBadge.textContent = `${civilCount} Civil`;
  if (criminalBadge) criminalBadge.textContent = `${criminalCount} Criminal`;
  if (revenueBadge) revenueBadge.textContent = `${revenueCount} Revenue`;

  // Update sidebar today count
  const todayStr = new Date().toISOString().split('T')[0];
  const todayListedCount = allCaseRecords.filter(c => c.nextHearing === todayStr).length;
  if (navBadge) navBadge.textContent = String(todayListedCount);

  if (!container && !tbody) return;

  if (listedCases.length === 0) {
    const emptyHtml = `
      <div class="causelist-empty">
        🎉 No court appearances scheduled for <strong>${formattedLong}</strong> (${dayName.split(' ')[0]}).
        <small>Select a different date above or pick a preset.</small>
      </div>
    `;
    if (container) container.innerHTML = emptyHtml;
    if (tbody) tbody.innerHTML = `<tr><td colspan="8" class="no-results" style="padding: 24px;">${emptyHtml}</td></tr>`;
    return;
  }

  // Sort by court name and then case number
  listedCases.sort((a, b) => {
    const courtA = (a.courtName || a.criminalCourtName || '').toUpperCase();
    const courtB = (b.courtName || b.criminalCourtName || '').toUpperCase();
    if (courtA !== courtB) return courtA.localeCompare(courtB);
    const numA = (a.caseNo || a.criminalCaseNumber || '').toUpperCase();
    const numB = (b.caseNo || b.criminalCaseNumber || '').toUpperCase();
    return numA.localeCompare(numB);
  });

  let html = '';
  listedCases.forEach((c, idx) => {
    const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
    const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
    const courtName = c.courtName || c.criminalCourtName || 'District Court';
    const caseType = (c.caseType || 'civil').toLowerCase();
    const stage = c.hearingProcess || c.process || 'Scheduled Hearing';
    const clientName = c.clientName || c.criminalClientName || 'Client';
    const clientPhone = c.clientNumber || c.criminalClientNumber || '';

    html += `
      <div class="cl-card cl-${escapeHtml(caseType)}">
        <div class="cl-card-index">#${idx + 1}</div>
        <div class="cl-card-main">
          <div class="cl-card-top">
            <span class="cl-card-caseno copyable-case-no" title="Double-click to copy Case Number"><i class="fa-solid fa-hashtag"></i> ${escapeHtml(caseNumber)}</span>
            <span class="case-badge ${caseType}">${caseType.toUpperCase()}</span>
            <span class="cl-card-stage"><i class="fa-solid fa-gavel"></i> ${escapeHtml(stage)}</span>
          </div>
          <div class="cl-card-title">${escapeHtml(caseName)}</div>
          <div class="cl-card-meta">
            <span class="cl-meta-court">🏛️ ${escapeHtml(courtName)}</span>
            <span class="cl-meta-client">👤 ${escapeHtml(clientName)}${clientPhone ? ` · 📞 ${escapeHtml(clientPhone)}` : ''}</span>
          </div>
        </div>
        <div class="cl-card-actions">
          <button type="button" class="table-view-btn" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNumber)}')" title="View case proceedings history"><i class="fa-solid fa-scroll"></i><span class="btn-text"> Details</span></button>
          <button type="button" class="table-view-btn update-hearing-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward next hearing date"><i class="fa-solid fa-calendar-plus"></i><span class="btn-text"> Forward Date</span></button>
          <button type="button" class="table-view-btn whatsapp-btn" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNumber)}')" title="Send WhatsApp court notice to client"><i class="fa-brands fa-whatsapp"></i></button>
        </div>
      </div>
    `;
  });

  if (container) container.innerHTML = html;
  if (tbody) tbody.innerHTML = listedCases.map((c, idx) => {
    const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
    const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
    return `<tr><td>#${idx + 1}</td><td><strong>${escapeHtml(caseNumber)}</strong></td><td><strong>${escapeHtml(caseName)}</strong></td></tr>`;
  }).join('');
}

window.renderCauseListTable = renderCauseListTable;

function sendDailyCauseListWhatsApp() {
  const dateVal = currentCauseListDate || new Date().toISOString().split('T')[0];
  const listedCases = allCaseRecords.filter(c => c.nextHearing === dateVal);

  if (listedCases.length === 0) {
    alert(`No court hearings are scheduled for ${formatDateDMY(dateVal)}.`);
    return;
  }

  let msg = `*⚖️ CHAMBERS OF ATUL KUMAR MISHRA*\n`;
  msg += `*DAILY COURT APPEARANCE BOARD / CAUSE LIST*\n`;
  msg += `📅 *Date:* ${formatDateDMY(dateVal)}\n`;
  msg += `📋 *Total Matters:* ${listedCases.length}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  listedCases.forEach((c, idx) => {
    const num = c.caseNo || c.criminalCaseNumber || 'Case';
    const title = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : ''));
    const court = c.courtName || c.criminalCourtName || 'District Court';
    const stage = c.hearingProcess || 'Scheduled Hearing';
    const client = c.clientName || c.criminalClientName || '';

    msg += `*${idx + 1}. [${(c.caseType || 'Civil').toUpperCase()}] ${num}*\n`;
    msg += `   • *Parties:* ${title}\n`;
    msg += `   • *Court:* ${court}\n`;
    msg += `   • *Stage:* ${stage}\n`;
    if (client) msg += `   • *Client:* ${client}\n`;
    msg += `\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_Advocate Atul Kumar Mishra_\nChambers & Legal Consultancy`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

window.sendDailyCauseListWhatsApp = sendDailyCauseListWhatsApp;


// ==============================================================================
// Executive Home Dashboard Engine
// ==============================================================================

function renderHomeDashboard() {
  const greetingEl = document.getElementById('homeHeroGreeting');
  const dateEl = document.getElementById('homeHeroDate');

  const totalEl = document.getElementById('homeTotalCases');
  const breakdownEl = document.getElementById('homePortfolioBreakdown');
  const todayEl = document.getElementById('homeTodayCases');
  const upcomingEl = document.getElementById('homeUpcomingCases');
  const pendingEl = document.getElementById('homePendingCases');
  const pendingPercentEl = document.getElementById('homePendingPercent');
  const undatedEl = document.getElementById('homeUndatedCases');
  const disposedEl = document.getElementById('homeDisposedCases');
  const disposedPercentEl = document.getElementById('homeDisposedPercent');

  const shortcutCivil = document.getElementById('shortcutCivilCount');
  const shortcutCriminal = document.getElementById('shortcutCriminalCount');
  const shortcutRevenue = document.getElementById('shortcutRevenueCount');

  const todayListWrapper = document.getElementById('homeTodayListWrapper');
  const todayBoardDate = document.getElementById('homeTodayBoardDate');
  const tasksContainer = document.getElementById('homeTasksListContainer');
  const todayEmptyState = document.getElementById('homeTodayEmptyState');

  // 1. Dynamic Greeting
  const now = new Date();
  const hours = now.getHours();
  let timeGreeting = 'Good Day';
  if (hours < 12) timeGreeting = 'Good Morning';
  else if (hours < 17) timeGreeting = 'Good Afternoon';
  else timeGreeting = 'Good Evening';

  const daysOfWeek = ['Sunday (रविवार)', 'Monday (सोमवार)', 'Tuesday (मंगलवार)', 'Wednesday (बुधवार)', 'Thursday (गुरुवार)', 'Friday (शुक्रवार)', 'Saturday (शनिवार)'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayName = daysOfWeek[now.getDay()];
  const formattedDate = `${dayName}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  if (greetingEl) greetingEl.textContent = `${timeGreeting}, Advocate Atul Mishra`;
  if (dateEl) dateEl.textContent = `${formattedDate} • Chambers Legal Practice Management`;
  if (todayBoardDate) todayBoardDate.textContent = `Appearances for ${dayName.split(' ')[0]}, ${now.getDate()} ${months[now.getMonth()]}`;

  // 2. Calculations & Robust Date Matching
  const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const in7Days = new Date(todayZero.getTime() + (7 * 24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000));

  const totalCount = allCaseRecords.length;
  const civilCount = allCaseRecords.filter(c => (c.caseType || 'civil').toLowerCase() === 'civil').length;
  const criminalCount = allCaseRecords.filter(c => (c.caseType || '').toLowerCase() === 'criminal').length;
  const revenueCount = allCaseRecords.filter(c => (c.caseType || '').toLowerCase() === 'revenue').length;

  const todayCases = allCaseRecords.filter(c => {
    if (!c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !c.nextHearing.trim()) return false;
    const parsed = parseDateString(c.nextHearing);
    if (!parsed) return false;
    return parsed.getFullYear() === now.getFullYear() &&
           parsed.getMonth() === now.getMonth() &&
           parsed.getDate() === now.getDate();
  });

  const upcomingCases = allCaseRecords.filter(c => {
    if (!c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !c.nextHearing.trim()) return false;
    if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false;
    const parsed = parseDateString(c.nextHearing);
    if (!parsed) return false;
    const hTime = parsed.getTime();
    return hTime >= todayZero.getTime() && hTime <= in7Days.getTime();
  });

  const disposedCount = allCaseRecords.filter(c => (c.caseStatus || '').toLowerCase().includes('dispose')).length;
  const pendingCount = totalCount - disposedCount;
  const undatedCount = allCaseRecords.filter(c => {
    if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false; // disposed = closed, not undated
    const nh = c.nextHearing;
    if (!nh || nh === '—' || nh === 'null' || !String(nh).trim()) return true;
    const iso = toISODate(nh);
    return !iso || iso < new Date().toISOString().split('T')[0];
  }).length;

  const pendingPercent = totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0;
  const disposedPercent = totalCount > 0 ? Math.round((disposedCount / totalCount) * 100) : 0;

  // 3. Update KPI Card Values
  if (totalEl) totalEl.textContent = String(totalCount);
  if (breakdownEl) {
    breakdownEl.innerHTML = `
      <div class="breakdown-inline-row">
        <span>${civilCount} Civil</span>
        <span class="breakdown-dot">•</span>
        <span>${criminalCount} Criminal</span>
        <span class="breakdown-dot">•</span>
        <span>${revenueCount} Revenue</span>
      </div>
    `;
  }
  if (todayEl) todayEl.textContent = String(todayCases.length);
  if (upcomingEl) upcomingEl.textContent = String(upcomingCases.length);
  if (pendingEl) pendingEl.textContent = String(pendingCount);
  if (pendingPercentEl) pendingPercentEl.textContent = `${pendingPercent}% of total caseload`;
  if (undatedEl) undatedEl.textContent = String(undatedCount);
  if (disposedEl) disposedEl.textContent = String(disposedCount);
  if (disposedPercentEl) disposedPercentEl.textContent = `${disposedPercent}% Resolution Rate`;

  // 4. Update Shortcuts
  if (shortcutCivil) shortcutCivil.textContent = `${civilCount} Cases`;
  if (shortcutCriminal) shortcutCriminal.textContent = `${criminalCount} Cases`;
  if (shortcutRevenue) shortcutRevenue.textContent = `${revenueCount} Cases`;

  // 4b. Update Undated Cases Graph Card & Analytics
  const undatedCasesList = allCaseRecords.filter(c => {
    if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false; // disposed = closed, not undated
    const nh = c.nextHearing;
    if (!nh || nh === '—' || nh === 'null' || !String(nh).trim() || String(nh).toLowerCase() === 'undated') return true;
    const iso = toISODate(nh);
    return !iso || iso < new Date().toISOString().split('T')[0];
  });
  const undatedTotal = undatedCasesList.length;
  const undatedCivil = undatedCasesList.filter(c => (c.caseType || 'civil').toLowerCase() === 'civil').length;
  const undatedCriminal = undatedCasesList.filter(c => (c.caseType || '').toLowerCase() === 'criminal').length;
  const undatedRevenue = undatedCasesList.filter(c => (c.caseType || '').toLowerCase() === 'revenue').length;

  const undatedCivilPct = undatedTotal > 0 ? Math.round((undatedCivil / undatedTotal) * 100) : 0;
  const undatedCriminalPct = undatedTotal > 0 ? Math.round((undatedCriminal / undatedTotal) * 100) : 0;
  const undatedRevenuePct = undatedTotal > 0 ? Math.max(0, 100 - undatedCivilPct - undatedCriminalPct) : 0;

  const undatedGraphTotalEl = document.getElementById('undatedGraphTotal');
  const undatedCivilCountEl = document.getElementById('undatedCivilCount');
  const undatedCriminalCountEl = document.getElementById('undatedCriminalCount');
  const undatedRevenueCountEl = document.getElementById('undatedRevenueCount');
  const undatedCivilBarEl = document.getElementById('undatedCivilBar');
  const undatedCriminalBarEl = document.getElementById('undatedCriminalBar');
  const undatedRevenueBarEl = document.getElementById('undatedRevenueBar');
  const undatedFooterNoticeEl = document.getElementById('undatedFooterNotice');

  if (undatedGraphTotalEl) undatedGraphTotalEl.textContent = String(undatedTotal);
  if (undatedCivilCountEl) undatedCivilCountEl.textContent = `${undatedCivil} Cases (${undatedCivilPct}%)`;
  if (undatedCriminalCountEl) undatedCriminalCountEl.textContent = `${undatedCriminal} Cases (${undatedCriminalPct}%)`;
  if (undatedRevenueCountEl) undatedRevenueCountEl.textContent = `${undatedRevenue} Cases (${undatedRevenuePct}%)`;

  if (undatedCivilBarEl) undatedCivilBarEl.style.width = `${undatedCivilPct}%`;
  if (undatedCriminalBarEl) undatedCriminalBarEl.style.width = `${undatedCriminalPct}%`;
  if (undatedRevenueBarEl) undatedRevenueBarEl.style.width = `${undatedRevenuePct}%`;

  if (undatedFooterNoticeEl) {
    undatedFooterNoticeEl.textContent = undatedTotal === 0 
      ? '✅ All active cases have scheduled hearings' 
      : `⚡ ${undatedTotal} ${undatedTotal === 1 ? 'matter requires' : 'matters require'} hearing dates`;
  }

  // SVG Donut segments (circumference = 2 * PI * 38 ≈ 238.76)
  const donutCircumference = 238.76;
  const segCivil = document.getElementById('donutSegmentCivil');
  const segCrim = document.getElementById('donutSegmentCriminal');
  const segRev = document.getElementById('donutSegmentRevenue');

  if (segCivil && segCrim && segRev) {
    if (undatedTotal === 0) {
      segCivil.style.strokeDasharray = `0 ${donutCircumference}`;
      segCrim.style.strokeDasharray = `0 ${donutCircumference}`;
      segRev.style.strokeDasharray = `0 ${donutCircumference}`;
    } else {
      const lenCivil = (undatedCivil / undatedTotal) * donutCircumference;
      const lenCrim = (undatedCriminal / undatedTotal) * donutCircumference;
      const lenRev = (undatedRevenue / undatedTotal) * donutCircumference;

      segCivil.style.strokeDasharray = `${lenCivil} ${donutCircumference - lenCivil}`;
      segCivil.style.strokeDashoffset = '0';

      segCrim.style.strokeDasharray = `${lenCrim} ${donutCircumference - lenCrim}`;
      segCrim.style.strokeDashoffset = `-${lenCivil}`;

      segRev.style.strokeDasharray = `${lenRev} ${donutCircumference - lenRev}`;
      segRev.style.strokeDashoffset = `-${lenCivil + lenCrim}`;
    }
  }

  // 5. Populate Today's Court Appearance Board Table
  if (todayCases.length === 0) {
    if (todayEmptyState) todayEmptyState.style.display = 'flex';
    if (todayListWrapper) todayListWrapper.style.display = 'none';
  } else {
    if (todayEmptyState) todayEmptyState.style.display = 'none';
    if (todayListWrapper) todayListWrapper.style.display = 'flex';
    // Sort by court name and then case number
    todayCases.sort((a, b) => {
      const courtA = (a.courtName || a.criminalCourtName || '').toUpperCase();
      const courtB = (b.courtName || b.criminalCourtName || '').toUpperCase();
      if (courtA !== courtB) return courtA.localeCompare(courtB);
      const numA = (a.caseNo || a.criminalCaseNumber || '').toUpperCase();
      const numB = (b.caseNo || b.criminalCaseNumber || '').toUpperCase();
      return numA.localeCompare(numB);
    });

    let html = '';
    todayCases.forEach((c, idx) => {
      const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
      const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
      const courtName = c.courtName || c.criminalCourtName || 'District Court';
      const caseType = (c.caseType || 'civil').toLowerCase();
      const stage = c.hearingProcess || c.process || 'Listed Hearing';
      const clientName = c.clientName || c.criminalClientName || '—';
      const clientPhone = c.clientNumber || c.criminalClientNumber || '';

      html += `
        <div class="home-today-card">
          <div class="home-today-card-main">
            <span class="home-today-index">#${idx + 1}</span>
            <div class="home-today-card-info">
              <div class="home-today-card-title-row">
                <span class="home-today-caseno">${escapeHtml(caseNumber)}</span>
                <span class="case-badge ${caseType}" style="font-size: 9.5px; padding: 2px 7px; text-transform: uppercase; border-radius: 4px; font-weight: 700;">${caseType}</span>
                <span class="home-today-case-name" title="${escapeHtml(caseName)}">${escapeHtml(caseName)}</span>
              </div>
              <div class="home-today-card-meta">
                <span><i class="fa-solid fa-landmark"></i> ${escapeHtml(courtName)}</span>
                <span class="home-today-stage-pill">${escapeHtml(stage)}</span>
                <span><i class="fa-solid fa-user"></i> ${escapeHtml(clientName)}${clientPhone ? ` • <a href="tel:${escapeHtml(clientPhone)}" style="color: #047857; text-decoration: none; font-weight: 600;" title="Call Client">${escapeHtml(clientPhone)}</a>` : ''}</span>
              </div>
            </div>
          </div>
          <div class="home-today-card-actions">
            <button type="button" class="table-view-btn today-details-btn" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNumber)}')" title="View proceedings details"><i class="fa-solid fa-scroll"></i><span class="btn-text"> Details</span></button>
            <button type="button" class="table-view-btn update-hearing-btn today-forward-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward next hearing date"><i class="fa-solid fa-calendar-plus"></i><span class="btn-text"> Forward</span></button>
            ${clientPhone ? `<a href="tel:${escapeHtml(clientPhone)}" class="table-view-btn call-btn today-call-btn" title="Call Client directly: ${escapeHtml(clientPhone)}"><i class="fa-solid fa-phone"></i></a>` : ''}
            <button type="button" class="table-view-btn whatsapp-btn today-whatsapp-btn" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNumber)}')" title="WhatsApp notice to client"><i class="fa-brands fa-whatsapp"></i></button>
          </div>
        </div>
      `;
    });
    if (todayListWrapper) todayListWrapper.innerHTML = html;
  }

  // 6. Populate Priority Tasks Widget
  if (tasksContainer) {
    const pendingTasks = (caseTasks || []).filter(t => (t.status || '').toLowerCase() !== 'done');
    if (pendingTasks.length === 0) {
      tasksContainer.innerHTML = `
        <div class="home-empty-tasks">
          <span>🎉</span>
          <p>All tasks and deadlines are up-to-date.</p>
          <button type="button" class="primary-btn" style="margin-top: 6px; padding: 6px 12px; font-size: 12px;" onclick="showTab('todo')">➕ Add New Task</button>
        </div>
      `;
    } else {
      let taskHtml = '';
      pendingTasks.slice(0, 5).forEach(t => {
        const isUrgent = (t.priority || '').toLowerCase() === 'high';
        const priorityBadge = isUrgent
          ? '<span style="background: #fee2e2; color: #dc2626; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700;">URGENT</span>'
          : '<span style="background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600;">TASK</span>';

        taskHtml += `
          <div class="home-task-card">
            <div class="home-task-info">
              <div style="display: flex; align-items: center; gap: 6px;">
                ${priorityBadge}
                <span class="home-task-title">${escapeHtml(t.taskTitle || t.task || 'Legal Action')}</span>
              </div>
              <span class="home-task-meta">Case: <strong>${escapeHtml(t.caseNo || 'General')}</strong> • Due: ${formatDateDMY(t.deadlineDate || t.deadline)}</span>
            </div>
            <button type="button" class="table-view-btn" onclick="showTab('todo')" title="Manage task">Manage</button>
          </div>
        `;
      });
      tasksContainer.innerHTML = taskHtml;
    }
  }

  if (typeof updateAccountsBadgesAndShortcut === 'function') {
    updateAccountsBadgesAndShortcut();
  }
}

window.renderHomeDashboard = renderHomeDashboard;

// ==============================================================================
// Dashboard Tables Rendering
// ==============================================================================

function renderCivilCasesTable(cases = null) {
  const tbody = document.querySelector('#civilCasesTable tbody');
  const countEl = document.getElementById('civilCount');
  if (!tbody) return;

  const list = cases || allCaseRecords.filter(c => c.caseType === 'civil');

  if (!list || list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="no-results">No civil cases found.</td></tr>';
    if (countEl) countEl.textContent = '0';
    return;
  }

  tbody.innerHTML = list.map((item) => {
    const caseNumber = getSafeValue(item.caseNo || item.case_number, '—');
    const caseName = getSafeValue(item.caseName || (item.plaintiff ? `${item.plaintiff} vs ${item.defendant}` : '—'), '—');
    const clientName = getSafeValue(item.clientName || item.client, '—');
    const nextHearing = formatDateDMY(item.nextHearing);
    const filingDate = formatDateDMY(item.filingDate);
    const isDisposed = (item.caseStatus || '').toLowerCase().includes('dispose');
    const statusBadge = isDisposed
      ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
      : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';

    const partiesRemark = item.remark || item.remarks || '';
    const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);

    const disposalComment = item.disposalComment || item.disposal_comment || '';
    const disposalCommentHtml = disposalComment
      ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}">⚖️ ${escapeHtml(disposalComment)}</span>`
      : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}">⚖️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

    return `
      <tr>
        <td><strong>${caseNumber}</strong></td>
        <td>${caseName}</td>
        <td>${clientName}</td>
        <td>${statusBadge}</td>
        <td class="case-remark-cell">${partiesRemarkHtml}</td>
        <td class="case-disposal-cell">${disposalCommentHtml}</td>
        <td>${filingDate}</td>
        <td>${nextHearing}</td>
        <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
          <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
        </td>
      </tr>
    `;
  }).join('');

  if (countEl) countEl.textContent = String(list.length);
}

function refreshAllCaseTables() {
  // 1. Civil Cases Table & Count
  const civilCases = allCaseRecords.filter(c => c.caseType === 'civil');
  renderCivilCasesTable(civilCases);

  // 2. State Cases Table & Count (Criminal / State of U.P.)
  const stateCases = allCaseRecords.filter(c => c.caseType === 'state' || c.caseType === 'criminal');
  const stateTable = document.querySelector('#stateCasesTable tbody');
  const legacyCriminalTable = document.querySelector('#criminalCasesTable tbody');
  const stateCountEl = document.getElementById('stateCount');
  const criminalCountEl = document.getElementById('criminalCount');

  if (stateCountEl) stateCountEl.textContent = String(stateCases.length);
  if (criminalCountEl) criminalCountEl.textContent = String(stateCases.length);

  const renderStateRow = c => {
    const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
    const statusBadge = isDisposed
      ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
      : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
    const partiesRemark = c.remark || c.remarks || '';
    const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
    const caseName = c.caseName || (c.firstParty ? `${c.firstParty} vs ${c.accusedName}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
    const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
    const disposalComment = c.disposalComment || c.disposal_comment || '';
    const disposalCommentHtml = disposalComment
      ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}">⚖️ ${escapeHtml(disposalComment)}</span>`
      : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}">⚖️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

    return `
      <tr>
        <td><strong>${escapeHtml(caseNumber)}</strong></td>
        <td>${escapeHtml(c.caseName || (c.firstParty ? `${c.firstParty} vs ${c.accusedName}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—')))}</td>
        <td>${escapeHtml(c.crimeNumber || '—')}</td>
        <td>${escapeHtml(c.policeStation || '—')}</td>
        <td>${escapeHtml(c.crimeSection || '—')}</td>
        <td>${escapeHtml(c.clientName || c.criminalClientName || '—')}</td>
        <td>${statusBadge}</td>
        <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
        <td class="case-remark-cell">${partiesRemarkHtml}</td>
        <td class="case-disposal-cell">${disposalCommentHtml}</td>
        <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
          <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
        </td>
      </tr>
    `;
  };

  if (stateTable) {
    if (stateCases.length === 0) {
      stateTable.innerHTML = '<tr><td colspan="9" class="no-results">No State criminal cases recorded yet.</td></tr>';
    } else {
      stateTable.innerHTML = stateCases.map(renderStateRow).join('');
    }
  }
  if (legacyCriminalTable) {
    if (stateCases.length === 0) {
      legacyCriminalTable.innerHTML = '<tr><td colspan="5" class="no-results">No criminal cases found.</td></tr>';
    } else {
      legacyCriminalTable.innerHTML = stateCases.map(renderStateRow).join('');
    }
  }

  // 3. Family Cases Table & Count (Matrimonial / Maintenance 125)
  const familyCases = allCaseRecords.filter(c => c.caseType === 'family');
  const familyTable = document.querySelector('#familyCasesTable tbody');
  const familyCountEl = document.getElementById('familyCount');
  if (familyCountEl) familyCountEl.textContent = String(familyCases.length);
  if (familyTable) {
    if (familyCases.length === 0) {
      familyTable.innerHTML = '<tr><td colspan="10" class="no-results">No Family or Matrimonial cases recorded yet.</td></tr>';
    } else {
      familyTable.innerHTML = familyCases.map(c => {
        const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
        const statusBadge = isDisposed
          ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
          : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
        const partiesRemark = c.remark || c.remarks || '';
        const caseNumber = c.caseNo || '—';
        const caseName = c.caseName || `${c.petitioner} vs ${c.respondent}`;
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}">⚖️ ${escapeHtml(disposalComment)}</span>`
          : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}">⚖️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.petitioner} vs ${c.respondent}`)}</td>
            <td><span class="case-badge family">${escapeHtml(c.matterType || 'Family Dispute')}</span></td>
            <td>${escapeHtml(c.petitioner || '—')}</td>
            <td>${escapeHtml(c.respondent || '—')}</td>
            <td>${escapeHtml(c.courtName || 'Family Court')}</td>
            <td>${escapeHtml(c.clientName || '—')}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 4. Revenue Cases Table & Count (Land & Tehsil)
  const revenueTable = document.querySelector('#revenueCasesTable tbody');
  const revenueCountEl = document.getElementById('revenueCount');
  const revenueCases = allCaseRecords.filter(c => c.caseType === 'revenue');
  if (revenueCountEl) revenueCountEl.textContent = String(revenueCases.length);
  if (revenueTable) {
    if (revenueCases.length === 0) {
      revenueTable.innerHTML = '<tr><td colspan="12" class="no-results">No Revenue cases recorded yet.</td></tr>';
    } else {
      revenueTable.innerHTML = revenueCases.map(c => {
        const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
        const statusBadge = isDisposed
          ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
          : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
        const partiesRemark = c.remark || c.remarks || '';
        const caseNumber = c.caseNo || '—';
        const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}">⚖️ ${escapeHtml(disposalComment)}</span>`
          : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}">⚖️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.applicant} vs ${c.oppositeParty}`)}</td>
            <td><span class="case-badge revenue">${escapeHtml(c.revenueActSection || 'Revenue Sec')}</span></td>
            <td>${escapeHtml(c.villageMauja || '—')}</td>
            <td>${escapeHtml(c.gataKhataNo || '—')}</td>
            <td>${escapeHtml(c.courtName || 'Tehsildar / SDM')}</td>
            <td>${escapeHtml(c.clientName || '—')}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 5. Misc Civil Cases Table & Count
  const miscCivilTable = document.querySelector('#miscCivilCasesTable tbody');
  const miscCivilCountEl = document.getElementById('miscCivilCount');
  const miscCivilCases = allCaseRecords.filter(c => c.caseType === 'misc_civil');
  if (miscCivilCountEl) miscCivilCountEl.textContent = String(miscCivilCases.length);
  if (miscCivilTable) {
    if (miscCivilCases.length === 0) {
      miscCivilTable.innerHTML = '<tr><td colspan="13" class="no-results">No Misc Civil cases recorded yet.</td></tr>';
    } else {
      miscCivilTable.innerHTML = miscCivilCases.map(c => {
        const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
        const statusBadge = isDisposed
          ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
          : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
        const partiesRemark = c.remark || c.remarks || '';
        const caseNumber = c.caseNo || '—';
        const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}">⚖️ ${escapeHtml(disposalComment)}</span>`
          : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}">⚖️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.applicant} vs ${c.oppositeParty}`)}</td>
            <td><span class="case-badge misc_civil">${escapeHtml(c.proceedingType || 'Misc Application')}</span></td>
            <td>${escapeHtml(c.originalCaseNumber || c.originalCase || '—')}</td>
            <td>${escapeHtml(c.applicant || '—')}</td>
            <td>${escapeHtml(c.oppositeParty || '—')}</td>
            <td>${escapeHtml(c.courtName || 'Court')}</td>
            <td>${escapeHtml(c.clientName || '—')}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 6. Misc Criminal Cases Table & Count
  const miscCriminalTable = document.querySelector('#miscCriminalCasesTable tbody');
  const miscCriminalCountEl = document.getElementById('miscCriminalCount');
  const miscCriminalCases = allCaseRecords.filter(c => c.caseType === 'misc_criminal');
  if (miscCriminalCountEl) miscCriminalCountEl.textContent = String(miscCriminalCases.length);
  if (miscCriminalTable) {
    if (miscCriminalCases.length === 0) {
      miscCriminalTable.innerHTML = '<tr><td colspan="13" class="no-results">No Misc Criminal cases recorded yet.</td></tr>';
    } else {
      miscCriminalTable.innerHTML = miscCriminalCases.map(c => {
        const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
        const statusBadge = isDisposed
          ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
          : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
        const partiesRemark = c.remark || c.remarks || '';
        const caseNumber = c.caseNo || '—';
        const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}">⚖️ ${escapeHtml(disposalComment)}</span>`
          : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}">⚖️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.applicant} vs ${c.oppositeParty}`)}</td>
            <td><span class="case-badge misc_criminal">${escapeHtml(c.proceedingType || 'Bail Application')}</span></td>
            <td>${escapeHtml(c.originalCaseNumber || c.originalCase || '—')}</td>
            <td>${escapeHtml(c.policeStation || '—')}</td>
            <td>${escapeHtml(c.applicant || '—')}</td>
            <td>${escapeHtml(c.courtName || 'Court')}</td>
            <td>${escapeHtml(c.clientName || '—')}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 7. Complaint Cases Table & Count (Cheque Bounce Sec 138 NI Act, Sec 200 CrPC, Defamation)
  const complaintTable = document.querySelector('#complaintCasesTable tbody');
  const complaintCountEl = document.getElementById('complaintCount');
  const complaintCases = allCaseRecords.filter(c => c.caseType === 'complaint');
  if (complaintCountEl) complaintCountEl.textContent = String(complaintCases.length);
  if (complaintTable) {
    if (complaintCases.length === 0) {
      complaintTable.innerHTML = '<tr><td colspan="14" class="no-results">No Complaint cases recorded yet.</td></tr>';
    } else {
      complaintTable.innerHTML = complaintCases.map(c => {
        const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
        const statusBadge = isDisposed
          ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
          : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
        const partiesRemark = c.remark || c.remarks || '';
        const caseNumber = c.caseNo || '—';
        const caseName = c.caseName || `${c.complainant} vs ${c.accusedName}`;
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}">⚖️ ${escapeHtml(disposalComment)}</span>`
          : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}">⚖️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.complainant} vs ${c.accusedName}`)}</td>
            <td><span class="case-badge complaint">${escapeHtml(c.complaintType || 'Complaint')}</span></td>
            <td>${escapeHtml(c.sectionAct || '—')}</td>
            <td>${escapeHtml(c.complainant || '—')}</td>
            <td>${escapeHtml(c.accusedName || '—')}</td>
            <td>${escapeHtml(c.policeStation || '—')}</td>
            <td>${escapeHtml(c.courtName || 'Court')}</td>
            <td>${escapeHtml(c.clientName || '—')}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 8. Disposed Cases Table & Count
  const disposedCases = allCaseRecords.filter(c => (c.caseStatus || '').toLowerCase().includes('dispose'));
  const disposedCountEl = document.getElementById('disposedCount');
  const disposedTable = document.querySelector('#disposedCasesTable tbody');
  if (disposedCountEl) disposedCountEl.textContent = String(disposedCases.length);
  if (disposedTable) {
    if (disposedCases.length === 0) {
      disposedTable.innerHTML = '<tr><td colspan="9" class="no-results">No disposed cases recorded yet.</td></tr>';
    } else {
      disposedTable.innerHTML = disposedCases.map(c => {
        const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
        const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
        const partiesRemark = c.remark || c.remarks || '';
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}">⚖️ ${escapeHtml(disposalComment)}</span>`
          : (remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}">⚖️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(caseName)}</td>
            <td>${escapeHtml(c.clientName || c.criminalClientName || '—')}</td>
            <td><span class="case-badge ${c.caseType || 'civil'}">${(c.caseType || 'Civil').toUpperCase()}</span></td>
            <td>${escapeHtml(c.courtName || c.criminalCourtName || 'District Court')}</td>
            <td><span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="text-align: center; white-space: nowrap;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Reopen Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 5. Undated Cases Table & Count (With Direct Update Hearing Action)
  // "Undated" = no next hearing at all, OR the scheduled date has already
  // passed without being forwarded (needs a fresh date).
  const todayISO = toISODate(new Date());
  const isUndatedCase = (c) => {
    // Disposed cases never count as undated — they're closed, not awaiting a date
    if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false;
    const nh = c.nextHearing;
    if (!nh || nh === '—' || nh === 'null' || String(nh).trim() === '') return true;
    const iso = toISODate(nh);
    if (!iso) return true;
    return iso < todayISO; // hearing date passed, not forwarded
  };
  const undatedCases = allCaseRecords.filter(isUndatedCase);
  const undatedCountEl = document.getElementById('undatedCount');
  const undatedTable = document.querySelector('#undatedCasesTable tbody');
  if (undatedCountEl) undatedCountEl.textContent = String(undatedCases.length);
  if (undatedTable) {
    if (undatedCases.length === 0) {
      undatedTable.innerHTML = '<tr><td colspan="8" class="no-results">🎉 No undated cases! All cases have hearing dates scheduled.</td></tr>';
    } else {
      undatedTable.innerHTML = undatedCases.map(c => {
        const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
        const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
        const nextISO = toISODate(c.nextHearing);
        const dateCell = nextISO
          ? (nextISO < todayISO
              ? `<span class="undated-overdue-chip" title="Hearing date passed — not yet forwarded"><i class="fa-solid fa-clock-rotate-left"></i> ${formatDateDMY(nextISO)}</span>`
              : formatDateDMY(nextISO))
          : '<span class="undated-never-chip"><i class="fa-solid fa-circle-question"></i> Never dated</span>';
        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(caseName)}</td>
            <td>${escapeHtml(c.clientName || c.criminalClientName || '—')}</td>
            <td><span class="case-badge ${c.caseType || 'civil'}">${(c.caseType || 'Civil').toUpperCase()}</span></td>
            <td>${escapeHtml(c.courtName || c.criminalCourtName || 'District Court')}</td>
            <td>${formatDateDMY(c.filingDate || c.crimeFilingDate)}</td>
            <td>${dateCell}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn update-hearing-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward Hearing Date">
                <i class="fa-solid fa-calendar-plus"></i><span class="btn-text"> Date</span>
              </button>
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case Details">
                <i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span>
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 6. All Cases Combined Table with Live Filters
  updateAllCasesTypePillCounts();
  renderAllCasesTableWithFilters();
  renderCaseCards();

  // 7. Render Upcoming Hearings (Next 7 Days)
  renderUpcomingWeekHearings();

  // 8. Guest Mode Table
  renderGuestTable();

  // 9. Home Executive Dashboard
  renderHomeDashboard();

  // 10. My Cases Filter Table
  filterCaseTables();

  // 11. My Daily Cause List
  renderCauseListTable();

  // 12. Interactive Calendar Scheduler
  renderCalendarView();

  // 10. Populate Hearing Case Dropdown
  populateHearingCaseDropdown();

  // 11. To-Do Tasks & Counters
  populateTodoCaseDropdown();
  updateTodoCounters();
  const todoTab = document.getElementById('todo');
  if (todoTab && todoTab.classList && typeof todoTab.classList.contains === 'function' && todoTab.classList.contains('active')) {
    renderCaseTasks();
  }
}

function exportAllCasesToCSV() {
  if (!allCaseRecords || allCaseRecords.length === 0) {
    alert('No cases available to export.');
    return;
  }

  const headers = [
    'Sr No',
    'Case Number',
    'Year',
    'Case Type',
    'Case Name',
    'Court Name',
    'Party Name',
    'Client Name',
    'Client Phone',
    'Filing Date',
    'Next Hearing Date',
    'Hearing Process / Stage',
    'Case Status',
    'Remarks',
    'Document Link'
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = allCaseRecords.map((c, idx) => {
    const caseNum = c.caseNo || c.criminalCaseNumber || '';
    const caseYear = c.caseYear || c.crimeYear || '';
    const caseType = (c.caseType || 'civil').toUpperCase();
    const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : ''));
    const court = c.courtName || c.criminalCourtName || '';
    const party = c.partyName || c.defendant || c.accusedName || c.plaintiff || '';
    const client = c.clientName || c.criminalClientName || '';
    const phone = c.clientNumber || c.criminalClientNumber || '';
    const filing = formatDateDMY(c.filingDate || c.crimeFilingDate);
    const hearing = formatDateDMY(c.nextHearing);
    const stage = c.hearingProcess || c.process || '';
    const status = (c.caseStatus || '').toLowerCase().includes('dispose') ? 'Disposed Off' : 'Pending';
    const remark = remarksToPlainText(c.remark || c.remarks);
    const docLink = c.docLink || c.doc_link || '';

    return [
      idx + 1,
      escapeCSV(caseNum),
      escapeCSV(caseYear),
      escapeCSV(caseType),
      escapeCSV(caseName),
      escapeCSV(court),
      escapeCSV(party),
      escapeCSV(client),
      escapeCSV(phone),
      escapeCSV(filing),
      escapeCSV(hearing),
      escapeCSV(stage),
      escapeCSV(status),
      escapeCSV(remark),
      escapeCSV(docLink)
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const today = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `Chambers_Case_Records_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

window.exportAllCasesToCSV = exportAllCasesToCSV;

// ==========================================
// ALL CASES MASTER REGISTER & LIVE FILTER SUITE (WITH PAGINATION)
// ==========================================

let currentAllCasesFilteredList = [];
let allCasesPageSize = 25; // options: 10, 25, 50, 100, 'all'
let allCasesCurrentPage = 1;

function handleAllCasesPageSizeChange(val) {
  if (val === 'all') {
    allCasesPageSize = 'all';
  } else {
    allCasesPageSize = parseInt(val, 10) || 25;
  }
  allCasesCurrentPage = 1;
  renderAllCasesTableWithFilters(false);
}

function changeAllCasesPage(targetPage) {
  allCasesCurrentPage = targetPage;
  renderAllCasesTableWithFilters(false);
}

function updateAllCasesTypePillCounts() {
  const records = allCaseRecords || [];
  const counts = {
    all: records.length,
    civil: 0,
    state: 0,
    family: 0,
    revenue: 0,
    misc_civil: 0,
    misc_criminal: 0,
    complaint: 0
  };

  records.forEach(c => {
    const t = (c.caseType || 'civil').toLowerCase().trim();
    if (t === 'civil') counts.civil++;
    else if (t === 'state' || t === 'criminal') counts.state++;
    else if (t === 'family') counts.family++;
    else if (t === 'revenue') counts.revenue++;
    else if (t === 'misc_civil' || t === 'misccivil') counts.misc_civil++;
    else if (t === 'misc_criminal' || t === 'misccriminal') counts.misc_criminal++;
    else if (t === 'complaint') counts.complaint++;
  });

  const setPill = (id, count) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(count);
  };

  setPill('pillCountAll', counts.all);
  setPill('pillCountCivil', counts.civil);
  setPill('pillCountState', counts.state);
  setPill('pillCountFamily', counts.family);
  setPill('pillCountRevenue', counts.revenue);
  setPill('pillCountMiscCivil', counts.misc_civil);
  setPill('pillCountMiscCriminal', counts.misc_criminal);
  setPill('pillCountComplaint', counts.complaint);

  // Synchronize sidebar nav counter
  const navBadge = document.getElementById('allCasesNavCount');
  if (navBadge) navBadge.textContent = String(counts.all);

  // Synchronize Case Cards sidebar nav counter
  const cardsNavBadge = document.getElementById('caseCardsNavCount');
  if (cardsNavBadge) cardsNavBadge.textContent = String((allCaseRecords || []).length);
}

function filterAllCasesByType(type) {
  const typeSelect = document.getElementById('allCasesTypeSelect');
  if (typeSelect) {
    typeSelect.value = type || '';
  }

  // Update active pill button
  document.querySelectorAll('.all-cases-type-pills-bar .type-pill-btn').forEach(btn => {
    const btnType = btn.getAttribute('data-type') || '';
    if (btnType === (type || '')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderAllCasesTableWithFilters();
}

function handleAllCasesTypeSelectChange() {
  const typeSelect = document.getElementById('allCasesTypeSelect');
  const val = typeSelect ? typeSelect.value : '';

  // Synchronize pill button active state
  document.querySelectorAll('.all-cases-type-pills-bar .type-pill-btn').forEach(btn => {
    const btnType = btn.getAttribute('data-type') || '';
    if (btnType === val) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderAllCasesTableWithFilters();
}

function resetAllCasesFilters() {
  const searchInput = document.getElementById('allCasesSearchInput');
  const typeSelect = document.getElementById('allCasesTypeSelect');
  const statusSelect = document.getElementById('allCasesStatusSelect');
  const courtSelect = document.getElementById('allCasesCourtSelect');

  if (searchInput) searchInput.value = '';
  if (typeSelect) typeSelect.value = '';
  if (statusSelect) statusSelect.value = '';
  if (courtSelect) courtSelect.value = '';

  document.querySelectorAll('.all-cases-type-pills-bar .type-pill-btn').forEach(btn => {
    const btnType = btn.getAttribute('data-type') || '';
    if (btnType === '') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderAllCasesTableWithFilters();
}

function renderAllCasesTableWithFilters(resetPage = true) {
  const tbody = document.querySelector('#allCasesTable tbody');
  const countBadge = document.getElementById('allCasesCountBadge');
  if (!tbody) return;

  if (resetPage) {
    allCasesCurrentPage = 1;
  }

  const searchInput = document.getElementById('allCasesSearchInput');
  const typeSelect = document.getElementById('allCasesTypeSelect');
  const statusSelect = document.getElementById('allCasesStatusSelect');
  const courtSelect = document.getElementById('allCasesCourtSelect');

  const query = (searchInput?.value || '').trim().toLowerCase();
  const selectedType = (typeSelect?.value || '').trim().toLowerCase();
  const selectedStatus = (statusSelect?.value || '').trim().toLowerCase();
  const selectedCourt = (courtSelect?.value || '').trim().toLowerCase();

  let filtered = (allCaseRecords || []).slice();

  // 1. Filter by Case Type
  if (selectedType) {
    filtered = filtered.filter(c => {
      const t = (c.caseType || 'civil').toLowerCase().trim();
      if (selectedType === 'state') return t === 'state' || t === 'criminal';
      if (selectedType === 'misc_civil') return t === 'misc_civil' || t === 'misccivil';
      if (selectedType === 'misc_criminal') return t === 'misc_criminal' || t === 'misccriminal';
      return t === selectedType;
    });
  }

  // 2. Filter by Status
  if (selectedStatus) {
    filtered = filtered.filter(c => {
      const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
      const isUndated = !c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !c.nextHearing.trim() || c.nextHearing.toLowerCase() === 'undated';
      if (selectedStatus === 'disposed') return isDisposed;
      if (selectedStatus === 'undated') return !isDisposed && isUndated;
      if (selectedStatus === 'pending') return !isDisposed && !isUndated;
      return true;
    });
  }

  // 3. Filter by Court
  if (selectedCourt) {
    filtered = filtered.filter(c => {
      const courtName = (c.courtName || c.criminalCourtName || '').trim().toLowerCase();
      return courtName === selectedCourt;
    });
  }

  // 4. Live Search across multiple indices
  if (query) {
    filtered = filtered.filter(c => {
      const caseNo = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
      const caseName = (c.caseName || '').toLowerCase();
      const plaintiff = (c.plaintiff || '').toLowerCase();
      const defendant = (c.defendant || '').toLowerCase();
      const accused = (c.accusedName || '').toLowerCase();
      const victim = (c.victimName || '').toLowerCase();
      const client = (c.clientName || c.criminalClientName || '').toLowerCase();
      const phone = (c.clientNumber || c.criminalClientNumber || '').toLowerCase();
      const court = (c.courtName || c.criminalCourtName || '').toLowerCase();
      const remark = remarksToSearchString(c.remark || c.remarks);
      const police = (c.policeStation || '').toLowerCase();
      const crimeNo = (c.crimeNumber || c.firNumber || '').toLowerCase();

      return caseNo.includes(query) ||
        caseName.includes(query) ||
        plaintiff.includes(query) ||
        defendant.includes(query) ||
        accused.includes(query) ||
        victim.includes(query) ||
        client.includes(query) ||
        phone.includes(query) ||
        court.includes(query) ||
        remark.includes(query) ||
        police.includes(query) ||
        crimeNo.includes(query);
    });
  }

  currentAllCasesFilteredList = filtered;

  const totalFiltered = filtered.length;
  const isAll = allCasesPageSize === 'all';
  const effectivePageSize = isAll ? totalFiltered : (parseInt(allCasesPageSize, 10) || 25);
  const totalPages = isAll ? 1 : Math.max(1, Math.ceil(totalFiltered / effectivePageSize));

  if (allCasesCurrentPage > totalPages) allCasesCurrentPage = totalPages;
  if (allCasesCurrentPage < 1) allCasesCurrentPage = 1;

  const startIndex = isAll ? 0 : (allCasesCurrentPage - 1) * effectivePageSize;
  const endIndex = isAll ? totalFiltered : Math.min(startIndex + effectivePageSize, totalFiltered);

  // Update count badge
  if (countBadge) {
    countBadge.textContent = `Showing ${totalFiltered} of ${(allCaseRecords || []).length} cases`;
  }

  // Render pagination controls
  renderAllCasesPaginationControls(totalFiltered, effectivePageSize, totalPages, allCasesCurrentPage, isAll);

  if (totalFiltered === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="no-results" style="text-align: center; padding: 2rem; color: #64748b;">
          🔍 No cases match the selected filters or search query.
          <br><button type="button" class="table-view-btn" onclick="resetAllCasesFilters()" style="margin-top: 8px; font-size: 0.8rem;">Clear Filters</button>
        </td>
      </tr>
    `;
    return;
  }

  const pageRecords = filtered.slice(startIndex, endIndex);

  tbody.innerHTML = pageRecords.map(c => {
    const caseNumber = c.caseNo || c.criminalCaseNumber || '—';

    // Sanitize case name and avoid bare 'vs'
    let caseName = (c.caseName || '').trim();
    if (!caseName || caseName.toLowerCase() === 'vs' || caseName.toLowerCase() === 'vs.') {
      if (c.plaintiff && c.defendant) {
        caseName = `${c.plaintiff} vs ${c.defendant}`;
      } else if (c.plaintiff) {
        caseName = `${c.plaintiff} vs Opposite`;
      } else if (c.accusedName) {
        caseName = `State vs ${c.accusedName}`;
      } else if (c.victimName) {
        caseName = `${c.victimName} vs Accused`;
      } else {
        caseName = 'Untitled Matter';
      }
    }

    const courtName = c.courtName || c.criminalCourtName || 'District Court';
    const clientName = c.clientName || c.criminalClientName || '—';
    const clientPhone = c.clientNumber || c.criminalClientNumber || '';

    const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
    const isUndated = !c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !c.nextHearing.trim() || c.nextHearing.toLowerCase() === 'undated';

    let statusBadge = '';
    if (isDisposed) {
      statusBadge = '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>';
    } else if (isUndated) {
      statusBadge = '<span class="status-badge undated" style="background:#fef3c7; color:#92400e; border:1px solid #fde68a;"><i class="fa-solid fa-calendar-xmark"></i> Undated</span>';
    } else {
      statusBadge = '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
    }

    const nextHearingStr = isUndated
      ? '<span style="color: #d97706; font-weight: 600;">—</span>'
      : `<strong>${formatDateDMY(c.nextHearing)}</strong>`;

    const partiesRemark = c.remark || c.remarks || '';
    const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);

    const disposalComment = c.disposalComment || c.disposal_comment || '';
    const disposalCommentHtml = disposalComment
      ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}">⚖️ ${escapeHtml(disposalComment)}</span>`
      : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}">⚖️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

    return `
      <tr>
        <td class="copyable-case-no" title="Double-click to copy Case Number"><strong>${escapeHtml(caseNumber)}</strong></td>
        <td>
          <div style="font-weight: 600; color: #1e293b; word-break: break-word;">${escapeHtml(caseName)}</div>
          ${c.policeStation ? `<small style="color:#64748b;">🚔 PS: ${escapeHtml(c.policeStation)}` + (c.crimeNumber ? ` | ${escapeHtml(c.crimeNumber)}` : '') + `</small>` : ''}
        </td>
        <td>🏛️ ${escapeHtml(courtName)}</td>
        <td>
          <div>${escapeHtml(clientName)}</div>
          ${clientPhone ? `<small style="color:#64748b;">📞 ${escapeHtml(clientPhone)}</small>` : ''}
        </td>
        <td class="all-cases-status-cell">${statusBadge}</td>
        <td class="case-remark-cell">${partiesRemarkHtml}</td>
        <td class="case-disposal-cell">${disposalCommentHtml}</td>
        <td class="all-cases-date-cell">${nextHearingStr}</td>
        <td class="all-cases-actions-cell-td table-actions-td" style="white-space: nowrap; text-align: center;">
          <div class="all-cases-actions-cell" style="display: inline-flex; align-items: center; justify-content: center; gap: 4px;">
            <button type="button" class="all-cases-action-btn details-btn" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNumber)}')" title="View Case Proceedings & Dossier"><i class="fa-solid fa-eye"></i></button>
            <button type="button" class="all-cases-action-btn edit-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case Details"><i class="fa-solid fa-pen-to-square"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/* ==============================================================
   Case Cards Board — 3-line expandable cards for all cases
   ============================================================== */
function getCaseCardDisplayData(c) {
  const caseType = (c.caseType || 'civil').toLowerCase();
  const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
  const courtName = c.courtName || c.criminalCourtName || 'District Court';

  // Sanitize case name and avoid bare 'vs'
  let caseName = (c.caseName || '').trim();
  if (!caseName || caseName.toLowerCase() === 'vs' || caseName.toLowerCase() === 'vs.') {
    if (c.plaintiff && c.defendant) caseName = `${c.plaintiff} vs ${c.defendant}`;
    else if (c.petitioner && c.respondent) caseName = `${c.petitioner} vs ${c.respondent}`;
    else if (c.applicant && c.respondent) caseName = `${c.applicant} vs ${c.respondent}`;
    else if (c.plaintiff) caseName = `${c.plaintiff} vs Opposite`;
    else if (c.accusedName) caseName = `State vs ${c.accusedName}`;
    else if (c.victimName) caseName = `${c.victimName} vs Accused`;
    else caseName = 'Untitled Matter';
  }

  const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose') || Boolean(c.disposalComment || c.disposal_comment);
  const isUndated = !c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !String(c.nextHearing).trim() || String(c.nextHearing).toLowerCase() === 'undated';

  return { caseType, caseNumber, courtName, caseName, isDisposed, isUndated };
}

function buildCaseCardSections(c) {
  const { caseType, caseNumber, courtName, isDisposed, isUndated } = getCaseCardDisplayData(c);
  const isCriminalSide = ['criminal', 'state', 'complaint', 'misc_criminal', 'misccriminal'].includes(caseType);

  // ----- 1. Courts & Case Info -----
  const info = [];
  info.push(['Case Number', caseNumber]);
  info.push(['Case Type', caseType.replace('_', ' ').toUpperCase()]);
  if (c.caseYear || c.crimeYear) info.push(['Registration Year', c.caseYear || c.crimeYear]);
  info.push(['Court / Forum', courtName]);
  if (c.filingDate || c.crimeFilingDate) info.push(['Filing Date', formatDateDMY(c.filingDate || c.crimeFilingDate)]);
  if (c.hearingProcess) info.push(['Next Stage', c.hearingProcess]);

  // ----- 2. Parties & Matter -----
  const parties = [];
  if (isCriminalSide) {
    if (c.victimName || c.firstParty) parties.push(['Complainant / Victim', c.victimName || c.firstParty]);
    if (c.accusedName || c.oppositeParty) parties.push(['Accused / Opposite', c.accusedName || c.oppositeParty]);
    if (c.policeStation) parties.push(['Police Station', c.policeStation]);
    if (c.crimeNumber) parties.push(['FIR / Crime No.', `${c.crimeNumber}${c.crimeYear ? ` / ${c.crimeYear}` : ''}`]);
    if (c.crimeSection) parties.push(['Sections (IPC/BNS)', c.crimeSection]);
    if (c.custodyStatus) parties.push(['Custody / Bail Status', c.custodyStatus]);
  } else if (caseType === 'family') {
    if (c.petitioner || c.plaintiff) parties.push(['Petitioner / Applicant', c.petitioner || c.plaintiff]);
    if (c.respondent || c.defendant) parties.push(['Respondent / Opposite', c.respondent || c.defendant]);
    if (c.familyMatterType || c.matterType) parties.push(['Dispute Nature', c.familyMatterType || c.matterType]);
    if (c.marriageDate) parties.push(['Marriage Date', formatDateDMY(c.marriageDate)]);
    if (c.maintenance) parties.push(['Maintenance Details', c.maintenance]);
  } else if (caseType === 'revenue') {
    if (c.applicant || c.plaintiff) parties.push(['Applicant / Petitioner', c.applicant || c.plaintiff]);
    if (c.respondent || c.defendant) parties.push(['Opposite Party', c.respondent || c.defendant]);
    if (c.revenueMatterType) parties.push(['Revenue Matter Nature', c.revenueMatterType]);
    if (c.village) parties.push(['Village / Mauza', c.village]);
    if (c.khataNo || c.gataNo) parties.push(['Khata / Gata No.', [c.khataNo ? `Khata: ${c.khataNo}` : '', c.gataNo ? `Gata: ${c.gataNo}` : ''].filter(Boolean).join(' | ')]);
  } else {
    if (c.plaintiff || c.firstParty) parties.push(['Plaintiff / Petitioner', c.plaintiff || c.firstParty]);
    if (c.defendant || c.oppositeParty) parties.push(['Defendant / Respondent', c.defendant || c.oppositeParty]);
    if (c.matterType) parties.push(['Matter / Suit Nature', c.matterType]);
  }

  // ----- 3. Hearings -----
  let statusText = 'Pending';
  if (isDisposed) statusText = 'Disposed Off';
  else if (isUndated) statusText = 'Undated / Unscheduled';

  const hearings = [['Status', statusText]];
  if (!isUndated) hearings.push(['Next Hearing', formatDateDMY(c.nextHearing)]);
  if (c.previousHearing) hearings.push(['Previous Hearing', formatDateDMY(c.previousHearing)]);
  if (c.previousProcess) hearings.push(['Previous Process', c.previousProcess]);

  // Full previous-hearing history (dated, process, action taken)
  const hearingHistory = getCaseHearingHistory(caseNumber)
    .filter(h => h.hearing_date && h.hearing_date !== c.nextHearing)
    .map(h => ({ date: h.hearing_date, process: h.process || '—', action: h.action_taken || '—' }));

  // ----- 4. Client & Remarks -----
  const client = [];
  const clientName = c.clientName || c.criminalClientName || c.client || '';
  if (clientName) client.push(['Client', clientName]);
  const clientPhone = c.clientNumber || c.criminalClientNumber || '';
  if (clientPhone) client.push(['Client Phone', clientPhone]);
  const remarkText = remarksToPlainText(c.remark || c.remarks);
  if (remarkText) client.push(['Remarks', remarkText]);
  const disposal = String(c.disposalComment || c.disposal_comment || '').trim();
  if (disposal) client.push(['Disposal Order', disposal]);

  return [
    { num: 1, icon: 'fa-landmark',          title: 'Courts & Case Info', rows: info },
    { num: 2, icon: 'fa-user-group',        title: 'Parties & Matter',   rows: parties },
    { num: 3, icon: 'fa-calendar-days',     title: `Hearings${hearingHistory.length ? ` (${hearingHistory.length} previous)` : ''}`, rows: hearings, history: hearingHistory },
    { num: 4, icon: 'fa-address-card',      title: 'Client & Remarks',   rows: client }
  ].filter(s => s.rows.length > 0);
}

function getDaysUntilHearing(dateStr) {
  if (!dateStr || dateStr === '—' || dateStr === 'null' || !String(dateStr).trim() || String(dateStr).toLowerCase() === 'undated') return null;
  const target = new Date(dateStr);
  if (isNaN(target.getTime())) return null;
  const now = new Date();
  const dTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const dNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((dTarget.getTime() - dNow.getTime()) / (1000 * 60 * 60 * 24));
}

function getCasePartyInitials(name) {
  if (!name || name === '—' || name === 'Not Specified') return '—';
  const clean = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (!parts.length) return '—';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function showCaseBookToast(msg) {
  const t = document.getElementById('caseBookToast') || document.getElementById('toast');
  if (!t) return;
  t.textContent = msg || 'Action completed successfully';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
window.showCaseBookToast = showCaseBookToast;

function toggleCaseCardSection(headerEl) {
  const t = headerEl.querySelector('.toggle');
  if (!t) return;
  const isCollapsed = t.textContent.trim() === '▶';
  t.textContent = isCollapsed ? '▼' : '▶';
  let el = headerEl.nextElementSibling;
  while (el && !el.classList.contains('section-head') && !el.classList.contains('card-actions')) {
    el.style.display = isCollapsed ? '' : 'none';
    el = el.nextElementSibling;
  }

  // Update card head button state based on open sections
  const card = headerEl.closest('.case-card');
  if (card) {
    const hideBtn = card.querySelector('.hide-btn');
    if (hideBtn) {
      const anyOpen = Array.from(card.querySelectorAll('.section-head .toggle')).some(span => span.textContent.trim() === '▼');
      hideBtn.textContent = anyOpen ? '▲ Hide details' : '▼ Show details';
    }
  }
}

function toggleCaseCard(idx) {
  const card = document.querySelector(`.case-card[data-card-index="${idx}"]`);
  if (!card) return;
  const hideBtn = card.querySelector('.hide-btn');
  if (!hideBtn) return;
  const isCurrentlyExpanded = hideBtn.textContent.includes('Hide');
  const sections = card.querySelectorAll('.section-head');

  if (isCurrentlyExpanded) {
    hideBtn.textContent = '▼ Show details';
    sections.forEach(h => {
      const t = h.querySelector('.toggle');
      if (t) t.textContent = '▶';
      let el = h.nextElementSibling;
      while (el && !el.classList.contains('section-head') && !el.classList.contains('card-actions')) {
        el.style.display = 'none';
        el = el.nextElementSibling;
      }
    });
  } else {
    hideBtn.textContent = '▲ Hide details';
    sections.forEach(h => {
      const t = h.querySelector('.toggle');
      if (t) t.textContent = '▼';
      let el = h.nextElementSibling;
      while (el && !el.classList.contains('section-head') && !el.classList.contains('card-actions')) {
        el.style.display = '';
        el = el.nextElementSibling;
      }
    });
  }
}

function caseCardSortValue(c) {
  const { isDisposed, isUndated } = getCaseCardDisplayData(c);
  if (isDisposed) return 3;   // disposed last
  if (isUndated) return 2;    // undated after dated
  return 1;                   // dated first (chronological, see comparator)
}

/* ── Case Cards quick filter pills ── */
let caseCardsActivePill = 'all';

function setCaseCardsPill(filter, btn) {
  caseCardsActivePill = filter;
  document.querySelectorAll('#caseCardsPillRow .chip').forEach(p => {
    p.classList.toggle('active', p === btn || p.getAttribute('data-filter') === filter);
  });
  renderCaseCards();
}

function caseCardMatchesPill(c, pill) {
  if (pill === 'all') return true;
  const { caseType, isDisposed, isUndated } = getCaseCardDisplayData(c);
  if (pill === 'urgent') {
    if (isDisposed || isUndated) return false;
    const days = getDaysUntilHearing(c.nextHearing);
    return days !== null && days >= 0 && days <= 7;
  }
  if (pill === 'thisweek') {
    if (isDisposed || isUndated) return false;
    const days = getDaysUntilHearing(c.nextHearing);
    return days !== null && days >= 0 && days <= 7;
  }
  if (pill === 'revenue') return caseType === 'revenue';
  if (pill === 'civil') return caseType === 'civil';
  if (pill === 'criminal') return ['criminal', 'state', 'complaint', 'misc_criminal', 'misccriminal'].includes(caseType);
  if (pill === 'disposed') return isDisposed;
  if (pill === 'undated') return isUndated && !isDisposed;
  if (pill === 'dated') return !isUndated && !isDisposed;
  return caseType === pill;
}

function updateCaseCardsPillCounts() {
  const records = allCaseRecords || [];
  const totalCount = records.length;
  let pendingCount = 0;
  let hearingThisWeekCount = 0;
  const clientSet = new Set();

  records.forEach(c => {
    const { isDisposed, isUndated } = getCaseCardDisplayData(c);
    if (!isDisposed) pendingCount++;
    if (!isDisposed && !isUndated) {
      const days = getDaysUntilHearing(c.nextHearing);
      if (days !== null && days >= 0 && days <= 7) {
        hearingThisWeekCount++;
      }
    }
    const cName = (c.clientName || c.criminalClientName || c.client || '').trim();
    if (cName) clientSet.add(cName.toLowerCase());
  });

  const totalEl = document.getElementById('cardsStatTotal');
  if (totalEl) totalEl.textContent = String(totalCount);
  const pendingEl = document.getElementById('cardsStatPending');
  if (pendingEl) pendingEl.textContent = String(pendingCount);
  const weekEl = document.getElementById('cardsStatThisWeek');
  if (weekEl) weekEl.textContent = String(hearingThisWeekCount);
  const clientsEl = document.getElementById('cardsStatClients');
  if (clientsEl) clientsEl.textContent = String(clientSet.size);

  const navBadge = document.getElementById('caseCardsNavCount');
  if (navBadge) navBadge.textContent = String(totalCount);
}

function renderCaseCards() {
  const grid = document.getElementById('caseCardsGrid');
  if (!grid) return;

  const searchInput = document.getElementById('caseCardsSearchInput');
  const countBadge = document.getElementById('caseCardsCountBadge');
  const query = (searchInput?.value || '').trim().toLowerCase();

  let filtered = (allCaseRecords || []).slice();

  updateCaseCardsPillCounts();

  if (caseCardsActivePill !== 'all') {
    filtered = filtered.filter(c => caseCardMatchesPill(c, caseCardsActivePill));
  }

  if (query) {
    filtered = filtered.filter(c => {
      const caseNo = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
      const caseName = (c.caseName || '').toLowerCase();
      const plaintiff = (c.plaintiff || c.petitioner || c.applicant || '').toLowerCase();
      const defendant = (c.defendant || c.respondent || c.oppositeParty || '').toLowerCase();
      const accused = (c.accusedName || '').toLowerCase();
      const victim = (c.victimName || '').toLowerCase();
      const client = (c.clientName || c.criminalClientName || '').toLowerCase();
      const phone = (c.clientNumber || c.criminalClientNumber || '').toLowerCase();
      const court = (c.courtName || c.criminalCourtName || '').toLowerCase();
      const remark = remarksToSearchString(c.remark || c.remarks);
      const police = (c.policeStation || '').toLowerCase();
      const crimeNo = (c.crimeNumber || c.firNumber || '').toLowerCase();
      return caseNo.includes(query) || caseName.includes(query) || plaintiff.includes(query) ||
        defendant.includes(query) || accused.includes(query) || victim.includes(query) ||
        client.includes(query) || phone.includes(query) || court.includes(query) ||
        remark.includes(query) || police.includes(query) || crimeNo.includes(query);
    });
  }

  // Sort: dated (nearest first) → undated → disposed
  filtered.sort((a, b) => {
    const rankA = caseCardSortValue(a);
    const rankB = caseCardSortValue(b);
    if (rankA !== rankB) return rankA - rankB;
    if (rankA === 1) return new Date(a.nextHearing) - new Date(b.nextHearing);
    return 0;
  });

  caseCardsFilteredList = filtered;

  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${(allCaseRecords || []).length} cases`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="icon">📭</div>
        <div class="msg">No cases match your filter</div>
        <button type="button" class="cta" onclick="showTab('add')">➕ Add New Case</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((c, idx) => {
    const { caseNumber, courtName, caseName, caseType, isDisposed, isUndated } = getCaseCardDisplayData(c);
    const daysUntil = getDaysUntilHearing(c.nextHearing);
    const isUrgent = !isDisposed && !isUndated && daysUntil !== null && daysUntil >= 0 && daysUntil <= 7;

    let dateBadgeHtml = '';
    if (isDisposed) {
      dateBadgeHtml = '<span class="badge" style="background:#e0e8f9; color:#1e293b;">✔ Disposed</span>';
    } else if (isUndated) {
      dateBadgeHtml = '<span class="badge date">Undated</span>';
    } else {
      dateBadgeHtml = `<span class="badge date">📅 ${escapeHtml(formatDateDMY(c.nextHearing))}</span>`;
    }

    const urgentBadgeHtml = isUrgent ? '<span class="badge urgent">⚠ Hearing Soon</span>' : '';

    const isCriminal = ['criminal', 'state', 'complaint', 'misc_criminal', 'misccriminal'].includes(caseType);
    const appRole = isCriminal ? 'Complainant' : (caseType === 'family' ? 'Petitioner' : (caseType === 'revenue' ? 'Applicant' : 'Plaintiff'));
    const resRole = isCriminal ? 'Accused' : (caseType === 'family' ? 'Respondent' : (caseType === 'revenue' ? 'Opposite Party' : 'Defendant'));
    const appName = (c.plaintiff || c.petitioner || c.applicant || c.firstParty || c.victimName || '').trim() || 'Not Specified';
    const resName = (c.defendant || c.respondent || c.oppositeParty || c.accusedName || '').trim() || 'Not Specified';

    const statusText = isDisposed ? 'Disposed Off' : (isUndated ? 'Undated' : 'Pending');
    const statusColor = isDisposed ? '#059669' : '#ea580c';
    const nextDateText = isDisposed ? 'Disposed' : (isUndated ? 'Undated' : formatDateDMY(c.nextHearing));

    let countdownBarHtml = '';
    if (!isDisposed && !isUndated && daysUntil !== null) {
      const daysLabel = daysUntil === 0 ? 'Today' : (daysUntil === 1 ? '1 day' : (daysUntil < 0 ? `${Math.abs(daysUntil)} days ago` : `${daysUntil} days`));
      countdownBarHtml = `
        <div class="hearing-countdown" style="display: none;">
          <span class="hc-label">⏳ Time until next hearing</span>
          <span class="hc-days">${escapeHtml(daysLabel)}</span>
        </div>
      `;
    }

    const hearingHistory = getCaseHearingHistory(caseNumber)
      .filter(h => h.hearing_date && h.hearing_date !== c.nextHearing);

    const clientName = (c.clientName || c.criminalClientName || c.client || '').trim() || '—';
    const clientPhone = (c.clientNumber || c.criminalClientNumber || '').trim();
    const remarksText = remarksToPlainText(c.remark || c.remarks);

    return `
      <div class="case-card" data-card-index="${idx}">
        <div class="card-head">
          <div class="card-title-row">
            <div class="card-title">${escapeHtml(caseName)}</div>
            <button type="button" class="hide-btn" onclick="toggleCaseCard(${idx})">▼ Show details</button>
          </div>
          <div class="badges">
            <span class="badge">${escapeHtml(caseType.toUpperCase())}</span>
            ${dateBadgeHtml}
            ${urgentBadgeHtml}
          </div>
          <div class="court-line">🏛️ ${escapeHtml(courtName || 'Court not specified')}</div>
        </div>

        <!-- Section 1: Courts & Case Info -->
        <div class="section-head" onclick="toggleCaseCardSection(this)">
          📋 Courts &amp; Case Info <span class="toggle">▶</span>
        </div>
        <div class="detail-rows" style="display: none;">
          <div class="detail-row"><span class="d-label">Case Number</span><span class="d-value">${escapeHtml(caseNumber || '—')}</span></div>
          <div class="detail-row"><span class="d-label">Case Type</span><span class="d-value">${escapeHtml(caseType.toUpperCase())}</span></div>
          <div class="detail-row"><span class="d-label">Reg. Year</span><span class="d-value">${escapeHtml(c.caseYear || c.crimeYear || '—')}</span></div>
          <div class="detail-row"><span class="d-label">Filing Date</span><span class="d-value">${escapeHtml(c.filingDate || c.crimeFilingDate ? formatDateDMY(c.filingDate || c.crimeFilingDate) : '—')}</span></div>
          <div class="detail-row"><span class="d-label">Next Stage</span><span class="d-value">${escapeHtml(c.hearingProcess || '—')}</span></div>
          <div class="detail-row"><span class="d-label">Court</span><span class="d-value">${escapeHtml(courtName || '—')}</span></div>
        </div>

        <!-- Section 2: Parties & Matter -->
        <div class="section-head" onclick="toggleCaseCardSection(this)">
          👥 Parties &amp; Matter <span class="toggle">▶</span>
        </div>
        <div class="parties-grid" style="display: none;">
          <div class="party-box">
            <div class="p-avatar app">${getCasePartyInitials(appName)}</div>
            <div>
              <div class="p-role">${escapeHtml(appRole)}</div>
              <div class="p-name">${escapeHtml(appName)}</div>
            </div>
          </div>
          <div class="party-box">
            <div class="p-avatar res">${getCasePartyInitials(resName)}</div>
            <div>
              <div class="p-role">${escapeHtml(resRole)}</div>
              <div class="p-name">${escapeHtml(resName)}</div>
            </div>
          </div>
        </div>

        <!-- Section 3: Case Status -->
        <div class="section-head" onclick="toggleCaseCardSection(this)">
          📅 Case Status <span class="toggle">▶</span>
        </div>
        <div class="status-grid" style="display: none;">
          <div class="stat-box pending">
            <div class="p-role">Status</div>
            <div class="big" style="color: ${statusColor}">${escapeHtml(statusText)}</div>
          </div>
          <div class="stat-box next">
            <div class="p-role">Next Hearing</div>
            <div class="big" style="color: #0f766e">${escapeHtml(nextDateText)}</div>
          </div>
        </div>
        ${countdownBarHtml}

        <!-- Section 4: Hearings -->
        <div class="section-head" onclick="toggleCaseCardSection(this)">
          📅 Hearings (${hearingHistory.length} previous) <span class="toggle">▶</span>
        </div>
        <div class="timeline" style="display: none;">
          ${hearingHistory.length ? hearingHistory.map(h => `
            <div class="hearing">
              <div class="h-date">${escapeHtml(formatDateDMY(h.date))}</div>
              <div class="h-meta">${escapeHtml(h.action || 'Process & action status')}</div>
              ${h.process && h.process !== '—' ? `<span class="h-chip">Process: ${escapeHtml(h.process)}</span>` : ''}
              ${h.action && h.action !== '—' ? `<span class="h-chip">Action: ${escapeHtml(h.action)}</span>` : ''}
            </div>
          `).join('') : `
            <div style="font-size: 12px; color: #9ca3af; padding: 6px 0;">No previous hearing records available.</div>
          `}
        </div>

        <!-- Section 5: Client & Remarks -->
        <div class="section-head" onclick="toggleCaseCardSection(this)">
          👤 Client &amp; Remarks <span class="toggle">▶</span>
        </div>
        <div class="detail-rows" style="display: none;">
          <div class="detail-row"><span class="d-label">Client</span><span class="d-value">${escapeHtml(clientName)}</span></div>
          <div class="detail-row"><span class="d-label">Phone</span><span class="d-value">${clientPhone ? `📞 ${escapeHtml(clientPhone)}` : '—'}</span></div>
          ${remarksText ? `<div class="detail-row" style="grid-column: 1 / -1;"><span class="d-label">Remarks</span><span class="d-value">${escapeHtml(remarksText)}</span></div>` : ''}
        </div>

        <!-- Card Actions (4-column grid) -->
        <div class="card-actions">
          <button type="button" class="btn btn-dark" onclick="event.stopPropagation(); openCaseHistoryModalByNo('${escapeHtml(caseNumber)}')" title="View Case Proceedings & Dossier">🕘 History</button>
          <button type="button" class="btn btn-dark" onclick="event.stopPropagation(); editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case Details">✏️ Edit</button>
          <button type="button" class="btn btn-out" onclick="event.stopPropagation(); printCurrentCaseDossier(caseCardsFilteredList[${idx}])" title="Print Case Dossier">📁 Dossier</button>
          <button type="button" class="btn btn-del" onclick="event.stopPropagation(); deleteCaseCard(${idx})" title="Delete Case Permanently">🗑 Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

async function deleteCaseCard(idx) {
  const c = (caseCardsFilteredList || [])[idx];
  if (!c) return;
  const caseNumber = c.caseNo || c.criminalCaseNumber || '';
  if (!caseNumber) return;

  const { caseName } = getCaseCardDisplayData(c);
  const confirmed = confirm(`Are you sure you want to permanently delete case "${caseNumber}" (${caseName})? This action cannot be undone.`);
  if (!confirmed) return;

  await deleteCaseFromSupabase(caseNumber);
  showCaseBookToast(`Case "${caseNumber}" deleted successfully`);
}

function renderAllCasesPaginationControls(totalItems, pageSize, totalPages, currentPage, isAll) {
  const infoEl = document.getElementById('allCasesPaginationInfo');
  const controlsEl = document.getElementById('allCasesPaginationControls');

  if (!infoEl || !controlsEl) return;

  if (totalItems === 0) {
    infoEl.textContent = 'Showing 0 to 0 of 0 entries';
    controlsEl.innerHTML = '';
    return;
  }

  const startDisplay = isAll ? 1 : (currentPage - 1) * pageSize + 1;
  const endDisplay = isAll ? totalItems : Math.min(currentPage * pageSize, totalItems);
  const filteredSuffix = totalItems !== (allCaseRecords || []).length
    ? ` (filtered from ${(allCaseRecords || []).length} total cases)`
    : '';

  infoEl.textContent = `Showing ${startDisplay} to ${endDisplay} of ${totalItems} entries${filteredSuffix}`;

  if (isAll || totalPages <= 1) {
    controlsEl.innerHTML = '';
    return;
  }

  let html = '';

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  // First and Previous buttons
  html += `<button type="button" class="pagination-btn" ${isFirst ? 'disabled' : ''} onclick="changeAllCasesPage(1)" title="First Page">«</button>`;
  html += `<button type="button" class="pagination-btn" ${isFirst ? 'disabled' : ''} onclick="changeAllCasesPage(${currentPage - 1})" title="Previous Page">‹ Prev</button>`;

  // Numbered page buttons with smart ellipsis
  const pagesToShow = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pagesToShow.push(i);
  } else {
    pagesToShow.push(1);
    if (currentPage > 4) {
      pagesToShow.push('...');
    }
    const startRange = Math.max(2, currentPage - 1);
    const endRange = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startRange; i <= endRange; i++) {
      if (!pagesToShow.includes(i)) pagesToShow.push(i);
    }
    if (currentPage < totalPages - 3) {
      pagesToShow.push('...');
    }
    if (!pagesToShow.includes(totalPages)) {
      pagesToShow.push(totalPages);
    }
  }

  pagesToShow.forEach(p => {
    if (p === '...') {
      html += `<span class="pagination-ellipsis">…</span>`;
    } else {
      const isActive = p === currentPage ? ' active' : '';
      html += `<button type="button" class="pagination-btn${isActive}" onclick="changeAllCasesPage(${p})">${p}</button>`;
    }
  });

  // Next and Last buttons
  html += `<button type="button" class="pagination-btn" ${isLast ? 'disabled' : ''} onclick="changeAllCasesPage(${currentPage + 1})" title="Next Page">Next ›</button>`;
  html += `<button type="button" class="pagination-btn" ${isLast ? 'disabled' : ''} onclick="changeAllCasesPage(${totalPages})" title="Last Page">»</button>`;

  controlsEl.innerHTML = html;
}

function editCaseFromTable(caseNo) {
  if (!caseNo || caseNo === '—') return;
  showTab('update');
  const searchInput = document.getElementById('updateSearchInput');
  if (searchInput) searchInput.value = caseNo;
  loadCaseForUpdate(caseNo);
}

function exportAllCasesCsv() {
  const casesToExport = currentAllCasesFilteredList && currentAllCasesFilteredList.length > 0
    ? currentAllCasesFilteredList
    : (allCaseRecords || []);

  if (casesToExport.length === 0) {
    if (typeof showToast === 'function') {
      showToast('No cases available to export.', 'error');
    } else {
      alert('No cases available to export.');
    }
    return;
  }

  const headers = [
    'Sr No',
    'Case Number',
    'Case Title / Parties',
    'Case Type',
    'Court / Forum',
    'Client Name',
    'Client Phone',
    'Case Status',
    'Filing Date',
    'Next Hearing Date',
    'Remarks'
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = casesToExport.map((c, idx) => {
    const caseNo = c.caseNo || c.criminalCaseNumber || '';
    const caseTitle = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant || ''}` : (c.accusedName ? `State vs ${c.accusedName}` : ''));
    const rawType = (c.caseType || 'civil').toLowerCase();
    const caseType = rawType === 'state' || rawType === 'criminal' ? 'STATE (CRIMINAL)' : rawType.replace('_', ' ').toUpperCase();
    const court = c.courtName || c.criminalCourtName || '';
    const client = c.clientName || c.criminalClientName || '';
    const phone = c.clientNumber || c.criminalClientNumber || '';
    const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
    const status = isDisposed ? 'Disposed Off' : 'Pending';
    const filing = formatDateDMY(c.filingDate || c.crimeFilingDate);
    const hearing = formatDateDMY(c.nextHearing);
    const remark = remarksToPlainText(c.remark || c.remarks);

    return [
      idx + 1,
      escapeCSV(caseNo),
      escapeCSV(caseTitle),
      escapeCSV(caseType),
      escapeCSV(court),
      escapeCSV(client),
      escapeCSV(phone),
      escapeCSV(status),
      escapeCSV(filing),
      escapeCSV(hearing),
      escapeCSV(remark)
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const today = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `All_Cases_Register_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Window exposures
window.updateAllCasesTypePillCounts = updateAllCasesTypePillCounts;
window.filterAllCasesByType = filterAllCasesByType;
window.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
window.resetAllCasesFilters = resetAllCasesFilters;
window.renderAllCasesTableWithFilters = renderAllCasesTableWithFilters;
window.handleAllCasesPageSizeChange = handleAllCasesPageSizeChange;
window.changeAllCasesPage = changeAllCasesPage;
window.renderAllCasesPaginationControls = renderAllCasesPaginationControls;
window.renderCaseCards = renderCaseCards;
window.setCaseCardsPill = setCaseCardsPill;
window.toggleCaseCard = toggleCaseCard;
window.deleteCaseCard = deleteCaseCard;
window.toggleCaseCardSection = toggleCaseCardSection;
window.editCaseFromTable = editCaseFromTable;
window.exportAllCasesCsv = exportAllCasesCsv;

function renderUpcomingWeekHearings() {
  const container = document.getElementById('upcomingWeekContainer');
  const countBadge = document.getElementById('upcomingWeekCount');
  if (!container) return;

  const now = new Date();
  const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const in7Days = new Date(todayZero.getTime() + (7 * 24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000));

  const upcoming = allCaseRecords.filter(c => {
    if (!c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !c.nextHearing.trim()) return false;
    if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false;

    const parsed = parseDateString(c.nextHearing);
    if (!parsed) return false;
    const hTime = parsed.getTime();
    return hTime >= todayZero.getTime() && hTime <= in7Days.getTime();
  }).sort((a, b) => {
    const da = parseDateString(a.nextHearing) || new Date(9999, 11, 31);
    const db = parseDateString(b.nextHearing) || new Date(9999, 11, 31);
    return da - db;
  });

  const navBadge = document.getElementById('upcomingNavCount');
  if (navBadge) {
    navBadge.textContent = String(upcoming.length);
  }

  const totalBadge = document.getElementById('upcomingTotalBadge');
  if (totalBadge) {
    totalBadge.textContent = `${upcoming.length} Hearing${upcoming.length === 1 ? '' : 's'} Listed`;
  }

  if (countBadge) {
    countBadge.textContent = String(upcoming.length);
  }

  if (upcoming.length === 0) {
    container.innerHTML = `
      <div class="hearing-empty-state-card">
        <div class="hearing-empty-emblem"><i class="fa-solid fa-scale-balanced"></i></div>
        <h3>No Upcoming Hearings</h3>
        <p>Your court docket is completely clear for the next 7 days. No appearances, framing of issues, or evidence proceedings are scheduled.</p>
        <div class="hearing-empty-actions">
          <button type="button" class="primary-btn" onclick="showTab('causelist')" style="padding: 10px 20px; border-radius: 10px;">
            <i class="fa-solid fa-clipboard-list"></i> Daily Cause List
          </button>
          <button type="button" class="secondary-btn" onclick="showTab('calendar')" style="padding: 10px 20px; border-radius: 10px;">
            <i class="fa-regular fa-calendar"></i> Interactive Calendar
          </button>
          <button type="button" class="secondary-btn" onclick="showTab('all')" style="padding: 10px 20px; border-radius: 10px;">
            <i class="fa-solid fa-folder-tree"></i> All Cases
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = upcoming.map(c => {
    const caseNum = c.caseNo || c.criminalCaseNumber || '—';
    const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant || 'Opposite'}` : `${c.victimName || 'State'} vs ${c.accusedName || 'Accused'}`) || '—';
    const court = c.courtName || c.criminalCourtName || 'District Court';
    const dateFormatted = formatDateDMY(c.nextHearing);
    const stage = c.hearingProcess || c.process || 'Scheduled Hearing';
    const clientName = c.clientName || c.criminalClientName || 'Client';
    const clientPhone = c.clientNumber || c.criminalClientNumber || '';
    const rawType = (c.caseType || 'civil').toLowerCase();
    const typeLabel = rawType === 'state' || rawType === 'criminal' ? 'CRIMINAL' : rawType.replace('_', ' ').toUpperCase();
    const remark = c.remark || c.remarks || '';

    const parsedHearing = parseDateString(c.nextHearing);
    let daysBadgeClass = '';
    let daysBadgeIcon = 'fa-regular fa-calendar';
    let daysLeftText = 'Scheduled';
    let isUrgentToday = false;

    if (parsedHearing) {
      const diffTime = parsedHearing.getTime() - todayZero.getTime();
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (daysLeft === 0) {
        daysBadgeClass = 'today';
        daysBadgeIcon = 'fa-solid fa-fire';
        daysLeftText = 'Today in Court';
        isUrgentToday = true;
      } else if (daysLeft === 1) {
        daysBadgeClass = 'tomorrow';
        daysBadgeIcon = 'fa-solid fa-bolt';
        daysLeftText = 'Tomorrow';
      } else {
        daysBadgeIcon = 'fa-regular fa-clock';
        daysLeftText = `In ${daysLeft} Days`;
      }
    }

    return `
      <div class="legal-hearing-card ${isUrgentToday ? 'urgent-today' : ''}">
        <!-- Top Status & Category Strip -->
        <div class="hearing-card-header">
          <span class="hearing-countdown-badge ${daysBadgeClass}">
            <i class="${daysBadgeIcon}"></i> ${daysLeftText}
          </span>
          <span class="hearing-type-badge ${rawType}">
            ${typeLabel}
          </span>
        </div>

        <!-- Case Identity Header Block: Case Name Bigger & Prominent -->
        <div class="hearing-card-title-block">
          <div class="hearing-caseno-row">
            <span class="hearing-caseno-tag"><i class="fa-solid fa-hashtag" style="font-size: 11px;"></i> ${escapeHtml(caseNum)}</span>
            <button type="button" class="hearing-dossier-pill-btn" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNum)}')" title="View Complete Case Dossier">
              <i class="fa-solid fa-folder-open"></i> Dossier
            </button>
          </div>
          <h3 class="hearing-casename" title="${escapeHtml(caseName)}">${escapeHtml(caseName)}</h3>
        </div>

        <!-- Hearing Date & Court Location Highlight Strip -->
        <div class="hearing-datetime-strip">
          <div class="hearing-card-date">
            <i class="fa-solid fa-calendar-day"></i>
            <span>${dateFormatted}</span>
          </div>
          <div class="hearing-card-court" title="${escapeHtml(court)}">
            🏛️ ${escapeHtml(court)}
          </div>
        </div>

        <!-- Structured Case Metadata Details -->
        <div class="hearing-meta-table">
          <div class="hearing-meta-row">
            <span class="hearing-meta-lbl"><i class="fa-solid fa-stairs"></i> Stage / Purpose</span>
            <span class="hearing-meta-val highlight-stage" title="${escapeHtml(stage)}">${escapeHtml(stage)}</span>
          </div>
          <div class="hearing-meta-row">
            <span class="hearing-meta-lbl"><i class="fa-solid fa-user-tie"></i> Client</span>
            <span class="hearing-meta-val" title="${escapeHtml(clientName)}">${escapeHtml(clientName)}</span>
          </div>
          ${clientPhone ? `
          <div class="hearing-meta-row">
            <span class="hearing-meta-lbl"><i class="fa-solid fa-phone"></i> Contact</span>
            <span class="hearing-meta-val" style="font-family: monospace; font-size: 12px;">${escapeHtml(clientPhone)}</span>
          </div>
          ` : ''}
        </div>

        ${remark ? `
        <div class="hearing-remark-box" title="${escapeHtml(remark)}">
          <i class="fa-solid fa-note-sticky"></i>
          <div><strong>Note:</strong> ${escapeHtml(remark)}</div>
        </div>
        ` : ''}

        <!-- Footer Actions: Proceedings History + Direct Call + WhatsApp Notice -->
        <div class="hearing-card-footer">
          <button type="button" class="hearing-primary-cta" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNum)}')">
            <i class="fa-solid fa-file-lines"></i> Proceedings
          </button>
          ${clientPhone ? `
          <a href="tel:${escapeHtml(clientPhone)}" class="hearing-call-cta" title="Call Client directly: ${escapeHtml(clientPhone)}">
            <i class="fa-solid fa-phone"></i> Call
          </a>
          ` : `
          <button type="button" class="hearing-call-cta disabled" title="No client phone number registered" disabled>
            <i class="fa-solid fa-phone-slash"></i> Call
          </button>
          `}
          <button type="button" class="hearing-whatsapp-cta" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNum)}')" title="Dispatch WhatsApp reminder to client">
            <i class="fa-brands fa-whatsapp"></i> Notice
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.renderUpcomingWeekHearings = renderUpcomingWeekHearings;

// ==============================================================================
// Case To-Do List & Deadline Tracker Logic (Supabase Synced & Beautified)
// ==============================================================================
let caseTasks = [];
window.caseTasks = caseTasks;
let currentTodoFilter = 'all';
let todoSearchQuery = '';

function updateTodoSyncIndicator(isSynced) {
  const ind = document.getElementById('todoSyncIndicator');
  if (!ind) return;
  if (isSynced && supabaseClient) {
    ind.className = 'todo-sync-pill';
    ind.innerHTML = '<span class="sync-dot"></span> Supabase Synced';
  } else {
    ind.className = 'todo-sync-pill';
    ind.style.background = '#f1f5f9';
    ind.style.borderColor = '#cbd5e1';
    ind.style.color = '#475569';
    ind.innerHTML = '💾 Local Storage Ready';
  }
}
window.updateTodoSyncIndicator = updateTodoSyncIndicator;

function updateSupabaseStatusIndicator(isConnected) {
  const pill = document.getElementById('homeHeroStatus') || document.querySelector('.hero-status-pill');
  if (!pill) return;
  const textEl = document.getElementById('homeHeroStatusText') || pill.querySelector('span:not(.live-dot)');
  if (isConnected) {
    pill.classList.remove('disconnected');
    pill.classList.add('connected');
    if (textEl) textEl.textContent = 'Supabase Cloud Connected';
  } else {
    pill.classList.remove('connected');
    pill.classList.add('disconnected');
    if (textEl) textEl.textContent = 'Supabase Cloud Disconnected';
  }
}
window.updateSupabaseStatusIndicator = updateSupabaseStatusIndicator;

// Reflect connection state on initial page load (event listeners only fire on changes)
updateSupabaseStatusIndicator(navigator.onLine && !!supabaseClient);

window.addEventListener('online', () => {
  if (supabaseClient) {
    updateSupabaseStatusIndicator(true);
    if (typeof fetchAllDataFromSupabase === 'function') fetchAllDataFromSupabase();
  } else {
    updateSupabaseStatusIndicator(false);
  }
});

window.addEventListener('offline', () => {
  updateSupabaseStatusIndicator(false);
});

function loadCaseTasks() {
  try {
    const raw = safeStorage.get('cmCaseTasks');
    if (raw) {
      caseTasks = JSON.parse(raw);
    } else {
      caseTasks = [];
    }
  } catch (e) {
    caseTasks = [];
  }
  window.caseTasks = caseTasks;
  updateTodoCounters();
}

function saveCaseTasksLocally() {
  window.caseTasks = caseTasks;
  try {
    safeStorage.set('cmCaseTasks', JSON.stringify(caseTasks), true);
  } catch (e) {
    console.error('Failed to save tasks locally:', e);
  }
  updateTodoCounters();
}

function saveCaseTasks() {
  saveCaseTasksLocally();
}

function updateTodoCounters() {
  const total = caseTasks.length;
  const pending = caseTasks.filter(t => t.status !== 'completed').length;
  const completed = caseTasks.filter(t => t.status === 'completed').length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueSoonOrOverdue = caseTasks.filter(t => {
    if (t.status === 'completed') return false;
    const d = parseDateString(t.deadlineDate);
    if (!d) return false;
    d.setHours(0, 0, 0, 0);
    const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  }).length;

  const navBadge = document.getElementById('todoNavCount');
  if (navBadge) navBadge.textContent = String(pending);

  const statTotal = document.getElementById('todoStatTotal');
  const statPending = document.getElementById('todoStatPending');
  const statDueSoon = document.getElementById('todoStatDueSoon');
  const statCompleted = document.getElementById('todoStatCompleted');

  if (statTotal) statTotal.textContent = String(total);
  if (statPending) statPending.textContent = String(pending);
  if (statDueSoon) statDueSoon.textContent = String(dueSoonOrOverdue);
  if (statCompleted) statCompleted.textContent = String(completed);

  const fAll = document.getElementById('todoFilterAllCount');
  const fPending = document.getElementById('todoFilterPendingCount');
  const fDueSoon = document.getElementById('todoFilterDueSoonCount');
  const fCompleted = document.getElementById('todoFilterCompletedCount');

  if (fAll) fAll.textContent = String(total);
  if (fPending) fPending.textContent = String(pending);
  if (fDueSoon) fDueSoon.textContent = String(dueSoonOrOverdue);
  if (fCompleted) fCompleted.textContent = String(completed);

  // Goal Progress Bar
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const progressBar = document.getElementById('todoProgressBar');
  const progressText = document.getElementById('todoProgressPercentage');
  if (progressBar) progressBar.style.width = `${pct}%`;
  if (progressText) progressText.textContent = `${pct}%`;
}

function setTodoPriority(level) {
  const hiddenInput = document.getElementById('todoPriority');
  if (hiddenInput) hiddenInput.value = level;

  document.querySelectorAll('.todo-priority-chip').forEach(chip => {
    chip.classList.toggle('active', chip.classList.contains(level));
  });
}
window.setTodoPriority = setTodoPriority;

// ==============================================================================
// Searchable Combobox for Case Selector
// ==============================================================================
function renderTodoCaseDropdownItems(casesToRender) {
  const container = document.getElementById('todoCaseDropdownList');
  if (!container) return;

  const currentSelected = document.getElementById('todoCaseSelect')?.value || '';

  const generalTaskOptionHtml = `
    <div class="todo-combobox-item todo-general-item ${currentSelected === '__GENERAL__' ? 'selected' : ''}" onclick="selectTodoCase('__GENERAL__')">
      <div class="combobox-item-top">
        <span class="combobox-case-num">📌 General Task</span>
        <span class="case-badge misc">GENERAL</span>
      </div>
      <div class="combobox-item-name">A task not linked to any specific case</div>
      <div class="combobox-item-meta">
        <span>🗂️ Office / personal work, reminders, filings…</span>
      </div>
    </div>
  `;

  if (!casesToRender || casesToRender.length === 0) {
    container.innerHTML = generalTaskOptionHtml + `
      <div class="todo-combobox-empty">
        <span>🔎 No matching cases found</span>
      </div>
    `;
    return;
  }

  container.innerHTML = generalTaskOptionHtml + casesToRender.map(c => {
    const num = c.caseNo || c.criminalCaseNumber || '';
    const name = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
    const court = c.courtName || c.criminalCourtName || 'District Court';
    const caseType = (c.caseType || 'civil').toLowerCase();
    const hasHearing = c.nextHearing && c.nextHearing !== '—';
    const hearingText = hasHearing ? `📅 Hearing: ${formatDateDMY(c.nextHearing)}` : '⚠️ Undated';
    const isSelected = (currentSelected.toLowerCase() === num.toLowerCase());

    return `
      <div class="todo-combobox-item ${isSelected ? 'selected' : ''}" onclick="selectTodoCase('${num}')">
        <div class="combobox-item-top">
          <span class="combobox-case-num">${num}</span>
          <span class="case-badge ${caseType}">${caseType.toUpperCase()}</span>
        </div>
        <div class="combobox-item-name">${name}</div>
        <div class="combobox-item-meta">
          <span>🏛️ ${court}</span>
          <span class="combobox-hearing-badge ${hasHearing ? '' : 'undated'}">${hearingText}</span>
        </div>
      </div>
    `;
  }).join('');
}

function openTodoCaseDropdown() {
  const dropdown = document.getElementById('todoCaseDropdownList');
  if (!dropdown) return;
  dropdown.classList.remove('hidden');

  const searchInput = document.getElementById('todoCaseSearchInput');
  const query = searchInput ? searchInput.value.trim() : '';
  filterTodoCaseDropdown(query);
}
window.openTodoCaseDropdown = openTodoCaseDropdown;

function closeTodoCaseDropdown() {
  const dropdown = document.getElementById('todoCaseDropdownList');
  if (dropdown) dropdown.classList.add('hidden');
}
window.closeTodoCaseDropdown = closeTodoCaseDropdown;

function toggleTodoCaseDropdown() {
  const dropdown = document.getElementById('todoCaseDropdownList');
  if (!dropdown) return;
  if (dropdown.classList.contains('hidden')) {
    openTodoCaseDropdown();
    const searchInput = document.getElementById('todoCaseSearchInput');
    if (searchInput && typeof searchInput.focus === 'function') searchInput.focus();
  } else {
    closeTodoCaseDropdown();
  }
}
window.toggleTodoCaseDropdown = toggleTodoCaseDropdown;

function filterTodoCaseDropdown(query, keepClosed = false) {
  const dropdown = document.getElementById('todoCaseDropdownList');
  if (dropdown && !keepClosed) dropdown.classList.remove('hidden');

  const clearBtn = document.getElementById('todoComboboxClearBtn');
  if (clearBtn) clearBtn.style.display = query ? 'flex' : 'none';

  const cleanQuery = (query || '').trim().toLowerCase();

  const sorted = [...allCaseRecords].sort((a, b) => {
    const numA = (a.caseNo || a.criminalCaseNumber || '').toUpperCase();
    const numB = (b.caseNo || b.criminalCaseNumber || '').toUpperCase();
    return numA.localeCompare(numB);
  });

  if (!cleanQuery) {
    renderTodoCaseDropdownItems(sorted);
    return;
  }

  const filtered = sorted.filter(c => {
    const num = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
    const name = (c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : ''))).toLowerCase();
    const court = (c.courtName || c.criminalCourtName || '').toLowerCase();
    return num.includes(cleanQuery) || name.includes(cleanQuery) || court.includes(cleanQuery);
  });

  renderTodoCaseDropdownItems(filtered);
}
window.filterTodoCaseDropdown = filterTodoCaseDropdown;

function selectTodoCase(caseNo) {
  const select = document.getElementById('todoCaseSelect');
  const searchInput = document.getElementById('todoCaseSearchInput');
  const clearBtn = document.getElementById('todoComboboxClearBtn');

  if (select) select.value = caseNo;

  if (caseNo === '__GENERAL__') {
    if (searchInput) searchInput.value = '📌 General Task (no case linked)';
    if (clearBtn) clearBtn.style.display = 'flex';
    closeTodoCaseDropdown();
    onTodoCaseSelectChange();
    return;
  }

  const found = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === caseNo.toLowerCase() || num2 === caseNo.toLowerCase();
  });

  if (found && searchInput) {
    const name = found.caseName || (found.plaintiff ? `${found.plaintiff} vs ${found.defendant}` : (found.victimName ? `${found.victimName} vs ${found.accusedName}` : '—'));
    searchInput.value = `${caseNo} — ${name}`;
    if (clearBtn) clearBtn.style.display = 'flex';
  }

  closeTodoCaseDropdown();
  onTodoCaseSelectChange();
}
window.selectTodoCase = selectTodoCase;

function clearTodoCaseSelection() {
  const select = document.getElementById('todoCaseSelect');
  const searchInput = document.getElementById('todoCaseSearchInput');
  const clearBtn = document.getElementById('todoComboboxClearBtn');

  if (select) select.value = '';
  if (searchInput) {
    searchInput.value = '';
    if (typeof searchInput.focus === 'function') searchInput.focus();
  }
  if (clearBtn) clearBtn.style.display = 'none';

  onTodoCaseSelectChange();
  openTodoCaseDropdown();
}
window.clearTodoCaseSelection = clearTodoCaseSelection;

function populateTodoCaseDropdown(selectedCaseNo = '') {
  const select = document.getElementById('todoCaseSelect');
  const searchInput = document.getElementById('todoCaseSearchInput');
  const clearBtn = document.getElementById('todoComboboxClearBtn');

  const currentVal = selectedCaseNo || select?.value || '';

  if (select) {
    select.innerHTML = '<option value="">-- Choose Case to Link --</option>';
    const generalOpt = document.createElement('option');
    generalOpt.value = '__GENERAL__';
    generalOpt.textContent = '📌 General Task (no case linked)';
    select.appendChild(generalOpt);
    const sorted = [...allCaseRecords].sort((a, b) => {
      const numA = (a.caseNo || a.criminalCaseNumber || '').toUpperCase();
      const numB = (b.caseNo || b.criminalCaseNumber || '').toUpperCase();
      return numA.localeCompare(numB);
    });

    sorted.forEach(c => {
      const num = c.caseNo || c.criminalCaseNumber || '';
      if (!num) return;
      const name = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
      const hearing = c.nextHearing && c.nextHearing !== '—' ? ` (Hearing: ${formatDateDMY(c.nextHearing)})` : ' (Undated)';
      const opt = document.createElement('option');
      opt.value = num;
      opt.textContent = `${num} — ${name}${hearing}`;
      select.appendChild(opt);
    });
  }

  // Populate combobox dropdown items (keep list closed until user interacts)
  filterTodoCaseDropdown('', true);

  if (currentVal) {
    if (select) select.value = currentVal;
    if (currentVal === '__GENERAL__') {
      if (searchInput) searchInput.value = '📌 General Task (no case linked)';
      if (clearBtn) clearBtn.style.display = 'flex';
      onTodoCaseSelectChange();
      return;
    }
    const found = allCaseRecords.find(c => {
      const num1 = (c.caseNo || '').toLowerCase();
      const num2 = (c.criminalCaseNumber || '').toLowerCase();
      return num1 === currentVal.toLowerCase() || num2 === currentVal.toLowerCase();
    });
    if (found && searchInput) {
      const name = found.caseName || (found.plaintiff ? `${found.plaintiff} vs ${found.defendant}` : (found.victimName ? `${found.victimName} vs ${found.accusedName}` : '—'));
      searchInput.value = `${currentVal} — ${name}`;
      if (clearBtn) clearBtn.style.display = 'flex';
    }
    onTodoCaseSelectChange();
  } else {
    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    onTodoCaseSelectChange();
  }
}

function onTodoCaseSelectChange() {
  const select = document.getElementById('todoCaseSelect');
  const banner = document.getElementById('todoCaseInfoBanner');
  const typeEl = document.getElementById('todoBannerCaseType');
  const numEl = document.getElementById('todoBannerCaseNum');
  const nameEl = document.getElementById('todoBannerCaseName');
  const courtEl = document.getElementById('todoBannerCourt');
  const hearingEl = document.getElementById('todoBannerHearing');
  const deadlineInput = document.getElementById('todoDeadline');

  const val = select?.value;
  if (!val) {
    if (banner) banner.classList.add('hidden');
    return;
  }

  if (val === '__GENERAL__') {
    if (banner) banner.classList.remove('hidden');
    if (typeEl) {
      typeEl.textContent = 'GENERAL';
      typeEl.className = 'case-badge misc';
    }
    if (numEl) numEl.textContent = 'No Case';
    if (nameEl) nameEl.textContent = '📌 General Task — not linked to any case';
    if (courtEl) courtEl.textContent = 'Any / Not applicable';
    if (hearingEl) hearingEl.textContent = '—';
    return;
  }

  const found = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === val.toLowerCase() || num2 === val.toLowerCase();
  });

  if (found) {
    if (banner) banner.classList.remove('hidden');
    const caseType = (found.caseType || 'civil').toLowerCase();
    const caseNum = found.caseNo || found.criminalCaseNumber || '—';
    const caseTitle = found.caseName || (found.plaintiff ? `${found.plaintiff} vs ${found.defendant}` : (found.victimName ? `${found.victimName} vs ${found.accusedName}` : '—'));

    if (typeEl) {
      typeEl.textContent = caseType.toUpperCase();
      typeEl.className = `case-badge ${caseType}`;
    }
    if (numEl) numEl.textContent = caseNum;
    if (nameEl) nameEl.textContent = caseTitle;
    if (courtEl) courtEl.textContent = found.courtName || found.criminalCourtName || 'District Court';
    if (hearingEl) hearingEl.textContent = found.nextHearing && found.nextHearing !== '—' ? formatDateDMY(found.nextHearing) : 'None scheduled (Undated)';

    if (deadlineInput && found.nextHearing && found.nextHearing !== '—') {
      const parsed = parseDateString(found.nextHearing);
      if (parsed) {
        const y = parsed.getFullYear();
        const m = String(parsed.getMonth() + 1).padStart(2, '0');
        const d = String(parsed.getDate()).padStart(2, '0');
        deadlineInput.value = `${y}-${m}-${d}`;
      }
    }
  }
}

function setTodoDeadlinePreset(preset) {
  const select = document.getElementById('todoCaseSelect');
  const deadlineInput = document.getElementById('todoDeadline');
  if (!select || !deadlineInput) return;

  const val = select.value;
  if (!val) {
    alert('Please select a case first.');
    return;
  }

  const found = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === val.toLowerCase() || num2 === val.toLowerCase();
  });

  if (!found || !found.nextHearing || found.nextHearing === '—') {
    alert('This case does not have a scheduled hearing date. Please pick a deadline date manually.');
    return;
  }

  const hearingDate = parseDateString(found.nextHearing);
  if (!hearingDate) return;

  const targetDate = new Date(hearingDate.getTime());
  if (preset === '1day') {
    targetDate.setDate(targetDate.getDate() - 1);
  } else if (preset === '3days') {
    targetDate.setDate(targetDate.getDate() - 3);
  }

  const y = targetDate.getFullYear();
  const m = String(targetDate.getMonth() + 1).padStart(2, '0');
  const d = String(targetDate.getDate()).padStart(2, '0');
  deadlineInput.value = `${y}-${m}-${d}`;
}
window.setTodoDeadlinePreset = setTodoDeadlinePreset;

function toggleTodoReminderFields(isChecked) {
  const toggle = document.getElementById('todoReminderToggle');
  if (typeof isChecked !== 'boolean' && toggle) {
    isChecked = toggle.checked;
  } else if (toggle && toggle.checked !== isChecked) {
    toggle.checked = isChecked;
  }
  const fields = document.getElementById('todoReminderFields');
  const dtInput = document.getElementById('todoReminderDateTime');
  if (!fields) return;

  if (isChecked) {
    fields.classList.remove('hidden');
    fields.style.display = 'block';
    if (dtInput && !dtInput.value) {
      setTodoReminderPreset('deadline_9am');
    }
  } else {
    fields.classList.add('hidden');
    fields.style.display = 'none';
    if (dtInput) dtInput.value = '';
  }
}
window.toggleTodoReminderFields = toggleTodoReminderFields;

function setTodoReminderPreset(preset) {
  const deadlineInput = document.getElementById('todoDeadline');
  const hearingInput = document.getElementById('todoHearingDate');
  const reminderInput = document.getElementById('todoReminderDateTime');
  if (!reminderInput) return;

  let baseDate = null;
  if (deadlineInput && deadlineInput.value) {
    baseDate = new Date(deadlineInput.value + 'T09:00:00');
  } else if (hearingInput && hearingInput.value) {
    baseDate = new Date(hearingInput.value + 'T09:00:00');
  }

  const now = new Date();
  let target;

  if (baseDate && !isNaN(baseDate.getTime())) {
    target = new Date(baseDate.getTime());
    if (preset === '1day_9am') {
      target.setDate(target.getDate() - 1);
      target.setHours(9, 0, 0, 0);
    } else if (preset === '2days_9am') {
      target.setDate(target.getDate() - 2);
      target.setHours(9, 0, 0, 0);
    } else if (preset === 'deadline_9am') {
      target.setHours(9, 0, 0, 0);
    }
    // Safeguard: if calculated target is in the past, default to tomorrow 9 AM
    if (target.getTime() <= now.getTime()) {
      target = new Date(now.getTime());
      target.setDate(target.getDate() + 1);
      target.setHours(9, 0, 0, 0);
    }
  } else {
    // If no deadline or hearing selected yet, set to tomorrow or +2 days at 9 AM
    target = new Date(now.getTime());
    if (preset === '2days_9am') {
      target.setDate(target.getDate() + 2);
    } else {
      target.setDate(target.getDate() + 1);
    }
    target.setHours(9, 0, 0, 0);
  }

  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  const hh = String(target.getHours()).padStart(2, '0');
  const min = String(target.getMinutes()).padStart(2, '0');

  reminderInput.value = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
window.setTodoReminderPreset = setTodoReminderPreset;

let isSubmittingTodo = false;
async function handleAddTodoSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (isSubmittingTodo) return false;

  const select = document.getElementById('todoCaseSelect');
  const titleInput = document.getElementById('todoTitle');
  const deadlineInput = document.getElementById('todoDeadline');
  const priorityInput = document.getElementById('todoPriority');
  const submitBtn = document.getElementById('saveTodoBtn') || document.querySelector('#addTodoForm button[type="submit"]') || document.querySelector('#todoForm button[type="submit"]') || document.getElementById('addTodoSubmitBtn');

  const caseNoRaw = select?.value?.trim();
  const isGeneralTask = caseNoRaw === '__GENERAL__';
  const caseNo = isGeneralTask ? 'GENERAL' : caseNoRaw;
  const title = titleInput?.value?.trim();
  const deadline = deadlineInput?.value;
  const priority = priorityInput?.value || 'medium';

  if ((!caseNo && !isGeneralTask) || !title || !deadline) {
    alert('Please fill in all task fields.');
    return false;
  }

  // Prevent duplicate pending task (same case + same title + same deadline)
  const isDuplicateTask = caseTasks.some(t =>
    t.status !== 'completed' &&
    (t.caseNo || '').trim().toLowerCase() === caseNo.toLowerCase() &&
    (t.taskTitle || '').trim().toLowerCase() === title.toLowerCase() &&
    t.deadlineDate === deadline
  );

  if (isDuplicateTask) {
    alert(`⚠️ A pending task "${title}" with deadline ${deadline} already exists${isGeneralTask ? '' : ` for case ${caseNo}`}.`);
    return false;
  }

  const found = isGeneralTask ? null : allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === caseNo.toLowerCase() || num2 === caseNo.toLowerCase();
  });

  const caseName = found ? (found.caseName || (found.plaintiff ? `${found.plaintiff} vs ${found.defendant}` : (found.victimName ? `${found.victimName} vs ${found.accusedName}` : '—'))) : (isGeneralTask ? 'General Task (no case)' : '—');
  const hearingDate = found?.nextHearing || null;

  try {
    isSubmittingTodo = true;
    if (submitBtn) submitBtn.disabled = true;

    // Check live Supabase for duplicate pending task
    if (supabaseClient && !isGeneralTask) {
      try {
        const { data: dupDb } = await supabaseClient
          .from('case_todos')
          .select('id')
          .ilike('case_number', caseNo)
          .ilike('task_title', title)
          .eq('deadline_date', deadline)
          .neq('status', 'completed')
          .limit(1);

        if (dupDb && dupDb.length > 0) {
          alert(`⚠️ A pending task "${title}" already exists in the database for case ${caseNo}.`);
          return false;
        }
      } catch (checkErr) {
        console.warn('Supabase task duplicate check fallback:', checkErr);
      }
    }

    // Check workflow type for multi-step task templates
    const workflowTypeEl = document.getElementById('todoWorkflowType');
    const workflowType = workflowTypeEl ? workflowTypeEl.value : 'standard';
    const customStepsInput = document.getElementById('todoCustomStepsInput');
    let taskSteps = [];

    if (workflowType === 'certified_copy') {
      taskSteps = [
        { id: 1, name: 'Apply', completed: false, date: null },
        { id: 2, name: 'Copy from office', completed: false, date: null },
        { id: 3, name: 'Preparation in copy office', completed: false, date: null },
        { id: 4, name: 'Receive', completed: false, date: null }
      ];
    } else if (workflowType === 'custom') {
      const rawSteps = customStepsInput ? customStepsInput.value.trim() : '';
      if (rawSteps) {
        const stepNames = rawSteps.split(',').map(s => s.trim()).filter(Boolean);
        taskSteps = stepNames.map((name, idx) => ({
          id: idx + 1,
          name,
          completed: false,
          date: null
        }));
      }
    }

    const copyNumberInput = document.getElementById('todoCopyNumber');
    const copyNumber = copyNumberInput ? copyNumberInput.value.trim() : '';

    // Application number is mandatory for every multi-step workflow task
    if (taskSteps.length > 0 && !copyNumber) {
      if (typeof showToastNotification === 'function') {
        showToastNotification('⚠️ Application No. is required for multi-step tasks. Please enter it above.', 3000);
      }
      copyNumberInput?.focus();
      return false;
    }

    const reminderToggle = document.getElementById('todoReminderToggle');
    const reminderInput = document.getElementById('todoReminderDateTime');
    let reminderDateTime = null;
    if (reminderToggle && reminderToggle.checked && reminderInput && reminderInput.value) {
      reminderDateTime = reminderInput.value;
    }

    const newTask = {
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      caseNo,
      caseName,
      taskTitle: title,
      hearingDate,
      deadlineDate: deadline,
      priority,
      status: 'pending',
      steps: taskSteps,
      copyNumber: copyNumber,
      reminderDateTime: reminderDateTime,
      reminderNotified: false,
      reminderDismissed: false,
      createdAt: new Date().toISOString()
    };

    caseTasks.unshift(newTask);
    saveCaseTasksLocally();
    renderCaseTasks(currentTodoFilter);

    if (titleInput) titleInput.value = '';
    if (customStepsInput) customStepsInput.value = '';
    if (copyNumberInput) copyNumberInput.value = '';
    if (workflowTypeEl) workflowTypeEl.value = 'standard';
    const previewEl = document.getElementById('todoWorkflowStepsPreview');
    if (previewEl) previewEl.classList.add('hidden');
    const customContainerEl = document.getElementById('todoCustomStepsContainer');
    if (customContainerEl) customContainerEl.classList.add('hidden');

    if (reminderToggle) reminderToggle.checked = false;
    const reminderFieldsEl = document.getElementById('todoReminderFields');
    if (reminderFieldsEl) reminderFieldsEl.classList.add('hidden');
    if (reminderInput) reminderInput.value = '';

    showToastNotification(`📝 Task scheduled${isGeneralTask ? '' : ` for ${caseNo}`}!`);

    // Live Supabase Sync (if configured)
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from('case_todos').insert([{
          case_number: newTask.caseNo,
          case_name: newTask.caseNo === 'GENERAL' ? 'General Task (no case)' : newTask.caseName,
          task_title: newTask.taskTitle,
          hearing_date: newTask.hearingDate && newTask.hearingDate !== '—' ? newTask.hearingDate : null,
          deadline_date: newTask.deadlineDate,
          priority: newTask.priority,
          status: newTask.status,
          steps: newTask.steps || [],
          copy_number: newTask.copyNumber || null
        }]).select();

        if (!error && data && data.length > 0) {
          newTask.id = data[0].id;
          saveCaseTasksLocally();
          updateTodoSyncIndicator(true);
        }
      } catch (supaErr) {
        console.warn('Supabase task insert fallback to local:', supaErr);
      }
    }
    await performPostCrudRefresh();
  } finally {
    isSubmittingTodo = false;
    if (submitBtn) submitBtn.disabled = false;
  }

  return false;
}
window.handleAddTodoSubmit = handleAddTodoSubmit;

function onTodoCopyNumberInput(val) {
  const titleInput = document.getElementById('todoTitle');
  if (!titleInput) return;
  const trimmed = (val || '').trim();
  // Only auto-format the title for the Certified Copy workflow
  if (titleInput.value.trim() && !titleInput.value.startsWith('Certified Copy')) return;
  if (trimmed) {
    titleInput.value = 'Certified Copy (App No. ' + trimmed + ')';
  } else {
    titleInput.value = 'Certified Copy Application';
  }
}
window.onTodoCopyNumberInput = onTodoCopyNumberInput;

function onTodoWorkflowTypeChange(val) {
  const preview = document.getElementById('todoWorkflowStepsPreview');
  const customContainer = document.getElementById('todoCustomStepsContainer');
  const copyNumberGroup = document.getElementById('todoCopyNumberGroup');
  const customInput = document.getElementById('todoCustomStepsInput');
  const copyNumberInput = document.getElementById('todoCopyNumber');
  const titleInput = document.getElementById('todoTitle');

  const isMultiStep = val === 'certified_copy' || val === 'custom';

  if (val === 'certified_copy') {
    if (preview) preview.classList.remove('hidden');
    if (customContainer) customContainer.classList.add('hidden');
    const existingNum = copyNumberInput ? copyNumberInput.value.trim() : '';
    if (titleInput && (!titleInput.value.trim() || titleInput.value.startsWith('Certified Copy'))) {
      titleInput.value = existingNum ? ('Certified Copy (App No. ' + existingNum + ')') : 'Certified Copy Application';
    }
  } else if (val === 'custom') {
    if (preview) preview.classList.add('hidden');
    if (customContainer) customContainer.classList.remove('hidden');
    if (customInput) customInput.focus();
  } else {
    if (preview) preview.classList.add('hidden');
    if (customContainer) customContainer.classList.add('hidden');
    if (copyNumberInput) copyNumberInput.value = '';
  }

  // Application No. is required for every multi-step workflow task
  if (copyNumberGroup) copyNumberGroup.classList.toggle('hidden', !isMultiStep);
  if (!isMultiStep && copyNumberInput) copyNumberInput.value = '';
}
window.onTodoWorkflowTypeChange = onTodoWorkflowTypeChange;

function filterTodoTasks(filterType, btnEl = null) {
  currentTodoFilter = filterType;
  const filterBtns = document.querySelectorAll('.todo-filter-tab, .todo-filter-btn');
  filterBtns.forEach(b => {
    b.classList.remove('active');
    if (btnEl ? b === btnEl : b.dataset.filter === filterType) {
      b.classList.add('active');
    }
  });
  renderCaseTasks(filterType);
}
window.filterTodoTasks = filterTodoTasks;

function onTodoSearchInput(val) {
  todoSearchQuery = (val || '').trim().toLowerCase();
  renderCaseTasks(currentTodoFilter);
}
window.onTodoSearchInput = onTodoSearchInput;

async function toggleTaskStatus(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;
  task.status = task.status === 'completed' ? 'pending' : 'completed';
  if (task.steps && Array.isArray(task.steps) && task.steps.length > 0) {
    const isCompleted = task.status === 'completed';
    task.steps.forEach(s => {
      s.completed = isCompleted;
      s.date = isCompleted ? (s.date || new Date().toISOString().split('T')[0]) : null;
    });
  }
  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);

  if (supabaseClient) {
    try {
      await supabaseClient.from('case_todos').update({ 
        status: task.status,
        steps: task.steps || []
      }).eq('id', taskId);
    } catch (e) {
      console.warn('Supabase task toggle fallback to local:', e);
    }
  }
  await performPostCrudRefresh();
}
window.toggleTaskStatus = toggleTaskStatus;

async function toggleTaskSubStep(taskId, stepId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task || !Array.isArray(task.steps)) return;

  const step = task.steps.find(s => s.id === stepId);
  if (!step) return;

  // Steps must be completed strictly in ascending order — block random ticks
  if (!step.completed) {
    const prevIncomplete = task.steps.some(s => s.id < step.id && !s.completed);
    if (prevIncomplete) {
      showToastNotification('⚠️ Steps must be completed in order. Finish earlier steps first.');
      return;
    }
  }

  step.completed = !step.completed;
  step.date = step.completed ? new Date().toISOString().split('T')[0] : null;

  if (step.completed && step.name.toLowerCase().includes('apply') && !task.copyNumber) {
    const entered = prompt('Step "Apply" completed! Enter Certified Copy / Application No. (or cancel to add later):');
    if (entered && entered.trim()) {
      task.copyNumber = entered.trim();
      if (task.taskTitle && task.taskTitle.startsWith('Certified Copy')) {
        task.taskTitle = 'Certified Copy (App No. ' + task.copyNumber + ')';
      }
    }
  }

  // If all steps are completed, automatically mark the whole task completed
  const allCompleted = task.steps.length > 0 && task.steps.every(s => s.completed);
  task.status = allCompleted ? 'completed' : 'pending';

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);

    if (step && step.completed) {
    showToastNotification(`✓ Step completed: ${step.name}`);
  }

  const taskModal = document.getElementById('taskDetailsModal');
  if (taskModal && !taskModal.classList.contains('hidden')) {
    openTaskDetailsModal(taskId);
  }

  if (supabaseClient) {
    try {
      await supabaseClient.from('case_todos').update({ 
        steps: task.steps,
        status: task.status,
        copy_number: task.copyNumber || null,
        task_title: task.taskTitle
      }).eq('id', taskId);
    } catch (e) {
      console.warn('Supabase task step toggle fallback to local:', e);
    }
  }
  await performPostCrudRefresh();
}
window.toggleTaskSubStep = toggleTaskSubStep;

function rescheduleCaseTask(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;
  const currentISO = toISODate(parseDateString(task.deadlineDate) || new Date());
  const entered = prompt(
    `Reschedule task:\n"${task.taskTitle}"\n\nEnter new deadline date (YYYY-MM-DD):`,
    currentISO
  );
  if (entered === null) return;
  const trimmed = entered.trim();
  const parsed = parseDateString(trimmed) || parseDateString(toISODate(new Date(trimmed)));
  if (!parsed) {
    alert('⚠️ Please enter a valid date in YYYY-MM-DD format (e.g. 2026-09-15).');
    return;
  }
  const newDeadline = toISODate(parsed);
  task.deadlineDate = newDeadline;
  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  const taskModal = document.getElementById('taskDetailsModal');
  if (taskModal && !taskModal.classList.contains('hidden')) {
    openTaskDetailsModal(taskId);
  }
  if (supabaseClient) {
    supabaseClient.from('case_todos').update({
      deadline_date: newDeadline
    }).eq('id', taskId).then(() => {
      updateTodoSyncIndicator(true);
    }).catch(e => console.warn('Supabase task reschedule fallback to local:', e));
  }
  showToastNotification(`📅 Task rescheduled to ${formatDateDMY(newDeadline)}!`);
}
window.rescheduleCaseTask = rescheduleCaseTask;

function editTaskCopyNumber(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;
  const current = task.copyNumber || '';
  const entered = prompt('Enter Certified Copy / Application No.:', current);
  if (entered !== null) {
    task.copyNumber = entered.trim();
    if (task.copyNumber && task.taskTitle && task.taskTitle.startsWith('Certified Copy')) {
      task.taskTitle = 'Certified Copy (App No. ' + task.copyNumber + ')';
    }
    saveCaseTasksLocally();
    renderCaseTasks(currentTodoFilter);
    const taskModal = document.getElementById('taskDetailsModal');
    if (taskModal && !taskModal.classList.contains('hidden')) {
      openTaskDetailsModal(taskId);
    }
    if (supabaseClient) {
      supabaseClient.from('case_todos').update({
        copy_number: task.copyNumber || null,
        task_title: task.taskTitle
      }).eq('id', taskId).then(() => {}).catch(e => console.warn(e));
    }
    showToastNotification('Application No. updated!');
  }
}
window.editTaskCopyNumber = editTaskCopyNumber;

async function deleteCaseTask(taskId) {
  if (typeof confirm === 'function' && !confirm('Are you sure you want to remove this task?')) return;
  caseTasks = caseTasks.filter(t => t.id !== taskId);
  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  showToastNotification('🗑️ Task removed');

  if (supabaseClient) {
    try {
      await supabaseClient.from('case_todos').delete().eq('id', taskId);
    } catch (e) {
      console.warn('Supabase task delete fallback to local:', e);
    }
  }
  await performPostCrudRefresh();
}
window.deleteCaseTask = deleteCaseTask;

function openTodoForCase(caseNo) {
  showTab('todo');
  populateTodoCaseDropdown(caseNo);
  setTimeout(() => {
    const titleInput = document.getElementById('todoTitle');
    if (titleInput && typeof titleInput.focus === 'function') titleInput.focus();
  }, 100);
}
window.openTodoForCase = openTodoForCase;

function renderCaseTasks(filter = currentTodoFilter) {
  const container = document.getElementById('todoListContainer');
  if (!container) return;

  updateTodoCounters();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let filtered = [...caseTasks];

  // Apply tab filter
  if (filter === 'pending') {
    filtered = filtered.filter(t => t.status !== 'completed');
  } else if (filter === 'completed') {
    filtered = filtered.filter(t => t.status === 'completed');
  } else if (filter === 'dueSoon') {
    filtered = filtered.filter(t => {
      if (t.status === 'completed') return false;
      const d = parseDateString(t.deadlineDate);
      if (!d) return false;
      d.setHours(0, 0, 0, 0);
      const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 3;
    });
  }

  // Apply search query
  if (todoSearchQuery) {
    filtered = filtered.filter(t => {
      const title = (t.taskTitle || '').toLowerCase();
      const num = (t.caseNo || '').toLowerCase();
      const name = (t.caseName || '').toLowerCase();
      const copy = (t.copyNumber || '').toLowerCase();
      const general = t.caseNo ? '' : 'general task no case';
      return title.includes(todoSearchQuery) || num.includes(todoSearchQuery) || name.includes(todoSearchQuery) || copy.includes(todoSearchQuery) || general.includes(todoSearchQuery);
    });
  }

  if (filtered.length === 0) {
    const msg = todoSearchQuery
      ? `No tasks match "${todoSearchQuery}". Try clearing the search.`
      : filter === 'completed'
      ? 'No completed tasks yet. Mark tasks finished as you prepare for court hearings.'
      : filter === 'dueSoon'
      ? '🎉 No tasks due soon or overdue! All your deadlines are on track.'
      : 'No case preparation tasks found. Choose a case on the left to schedule your first appearance deadline.';
    container.innerHTML = `
      <div class="todo-empty-state">
        <div class="todo-empty-icon-wrap">
          <i class="fa-solid fa-clipboard-list"></i>
        </div>
        <h4 class="todo-empty-title">${filter === 'completed' ? 'No completed tasks' : filter === 'dueSoon' ? 'All clear!' : 'No tasks yet'}</h4>
        <p>${msg}</p>
      </div>
    `;
    return;
  }

  filtered.sort((a, b) => {
    if (a.status !== b.status) return a.status === 'completed' ? 1 : -1;
    const dateA = parseDateString(a.deadlineDate)?.getTime() || 0;
    const dateB = parseDateString(b.deadlineDate)?.getTime() || 0;
    return dateA - dateB;
  });

  container.innerHTML = filtered.map(t => {
    const isDone = t.status === 'completed';
    const d = parseDateString(t.deadlineDate);
    let deadlineBadgeHtml = '';

    if (isDone) {
      deadlineBadgeHtml = `<span class="todo-deadline-badge completed">✅ Completed</span>`;
    } else if (d) {
      d.setHours(0, 0, 0);
      const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays < 0) {
        deadlineBadgeHtml = `<span class="todo-deadline-badge overdue">🔴 Overdue (${Math.abs(diffDays)}d late)</span>`;
      } else if (diffDays === 0) {
        deadlineBadgeHtml = `<span class="todo-deadline-badge today">⚠️ Due Today</span>`;
      } else if (diffDays === 1) {
        deadlineBadgeHtml = `<span class="todo-deadline-badge soon">⏳ Due Tomorrow</span>`;
      } else if (diffDays <= 3) {
        deadlineBadgeHtml = `<span class="todo-deadline-badge soon">⏳ Due in ${diffDays} days</span>`;
      } else {
        deadlineBadgeHtml = `<span class="todo-deadline-badge normal">📅 ${formatDateDMY(t.deadlineDate)}</span>`;
      }
    }

    const priorityLabel = t.priority === 'high' ? '🔴 High' : (t.priority === 'normal' ? '🔵 Normal' : '🟡 Medium');
    const priorityClass = t.priority || 'medium';
    const isGeneralTask = !t.caseNo || t.caseNo === 'GENERAL' || t.caseNo === '—';
    const caseMetaHtml = isGeneralTask
      ? `<span class="todo-general-tag"><i class="fa-solid fa-thumbtack"></i> General Task</span>`
      : `<span class="todo-case-link-wrap"><a href="javascript:void(0);" class="todo-case-link" onclick="event.stopPropagation(); showTab('search'); document.getElementById('globalSearch').value='${t.caseNo}'; filterCaseTables(false);" title="Search case">${t.caseNo}</a></span>`;

    let stepSummaryBadgeHtml = '';
    if (t.steps && Array.isArray(t.steps) && t.steps.length > 0) {
      const completedCount = t.steps.filter(s => s.completed).length;
      const pct = Math.round((completedCount / t.steps.length) * 100);
      stepSummaryBadgeHtml = `
        <span class="todo-step-count-badge" onclick="event.stopPropagation(); openTaskDetailsModal('${t.id}')" title="Multi-Step Workflow (${completedCount}/${t.steps.length} completed)">
          <i class="fa-solid fa-list-check"></i> ${completedCount}/${t.steps.length} Steps (${pct}%)
        </span>
      `;
    }

    let reminderBadgeHtml = '';
    if (t.reminderDateTime && !isDone) {
      const remDate = new Date(t.reminderDateTime);
      if (!isNaN(remDate.getTime())) {
        const isPast = remDate.getTime() <= Date.now();
        const remFmt = remDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) + ' ' + remDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        reminderBadgeHtml = `<span class="todo-reminder-badge ${isPast ? 'triggered' : 'scheduled'}" onclick="event.stopPropagation(); openTaskReminderModal('${t.id}')" title="Reminder: ${remFmt}"><i class="fa-solid fa-bell"></i> ${remFmt}</span>`;
      }
    }

    return `
      <div class="todo-item priority-${priorityClass} ${isDone ? 'status-completed' : ''}" id="${t.id}">
        <div class="todo-item-accent-bar"></div>
        <div class="todo-item-inner">
          <div class="todo-checkbox-wrapper">
            <input type="checkbox" class="todo-checkbox" ${isDone ? 'checked' : ''} onchange="toggleTaskStatus('${t.id}')" title="Mark as ${isDone ? 'Pending' : 'Completed'}">
          </div>
          <div class="todo-item-content" onclick="openTaskDetailsModal('${t.id}')" style="cursor: pointer;" title="Click to view full details">
            <div class="todo-item-top">
              <span class="todo-item-title">${t.taskTitle}</span>
              <span class="todo-priority-pill ${priorityClass}">${priorityLabel}</span>
            </div>
            <div class="todo-compact-meta-row">
              ${caseMetaHtml}
              ${deadlineBadgeHtml}
              ${t.copyNumber ? `<span class="todo-copy-badge" onclick="event.stopPropagation(); editTaskCopyNumber('${t.id}')" title="Copy / App No."><i class="fa-solid fa-stamp"></i> No: <strong>${t.copyNumber}</strong></span>` : ''}
              ${stepSummaryBadgeHtml}
              ${reminderBadgeHtml}
            </div>
          </div>
          <div class="todo-item-actions">
            <button type="button" class="todo-detail-btn" onclick="openTaskDetailsModal('${t.id}')" title="Show Full Details & Actions">
              <i class="fa-solid fa-eye"></i> <span>Show Details</span>
            </button>
            <div class="todo-quick-btns">
              <button type="button" class="todo-reminder-btn ${t.reminderDateTime ? 'has-reminder' : ''}" onclick="openTaskReminderModal('${t.id}')" title="${t.reminderDateTime ? 'Edit Reminder' : 'Set Reminder'}" aria-label="Set Reminder"><i class="fa-solid fa-bell"></i></button>
              <button type="button" class="todo-reschedule-btn" onclick="rescheduleCaseTask('${t.id}')" title="Reschedule Deadline"><i class="fa-solid fa-calendar-days"></i></button>
              <button type="button" class="todo-delete-btn" onclick="deleteCaseTask('${t.id}')" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
window.renderCaseTasks = renderCaseTasks;
window.populateTodoCaseDropdown = populateTodoCaseDropdown;

// ==============================================================================
// Task Details & Management Dossier Modal View
// ==============================================================================

function openTaskDetailsModal(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('taskDetailsModal');
  const content = document.getElementById('taskDetailsModalContent');
  const footer = document.getElementById('taskDetailsModalFooter');
  const taskIdInput = document.getElementById('taskDetailsModalTaskId');
  if (!modal || !content || !footer) return;

  if (taskIdInput) taskIdInput.value = taskId;

  const isDone = task.status === 'completed';
  const isGeneralTask = !task.caseNo || task.caseNo === 'GENERAL' || task.caseNo === '—';
  const hearingFormatted = isGeneralTask ? '—' : (task.hearingDate && task.hearingDate !== '—' ? formatDateDMY(task.hearingDate) : 'Undated');
  const priorityClass = task.priority || 'medium';
  const priorityLabel = task.priority === 'high' ? '🔴 High (Urgent)' : (task.priority === 'normal' ? '🔵 Normal' : '🟡 Medium');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = parseDateString(task.deadlineDate);
  let deadlineBadgeHtml = '';
  let deadlineDiffText = '';

  if (isDone) {
    deadlineBadgeHtml = `<span class="todo-deadline-badge completed">✅ Completed</span>`;
    deadlineDiffText = 'Task has been completed.';
  } else if (d) {
    d.setHours(0, 0, 0);
    const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      deadlineBadgeHtml = `<span class="todo-deadline-badge overdue">🔴 Overdue (${Math.abs(diffDays)} days late)</span>`;
      deadlineDiffText = `⚠️ Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'}!`;
    } else if (diffDays === 0) {
      deadlineBadgeHtml = `<span class="todo-deadline-badge today">⚠️ Due Today</span>`;
      deadlineDiffText = `⚡ Deadline is today!`;
    } else if (diffDays === 1) {
      deadlineBadgeHtml = `<span class="todo-deadline-badge soon">⏳ Due Tomorrow</span>`;
      deadlineDiffText = `⏳ 1 day remaining until deadline.`;
    } else {
      deadlineBadgeHtml = `<span class="todo-deadline-badge ${diffDays <= 3 ? 'soon' : 'normal'}">📅 Due in ${diffDays} days</span>`;
      deadlineDiffText = `📅 ${diffDays} days remaining.`;
    }
  }

  let reminderInfoHtml = '';
  if (task.reminderDateTime) {
    const remDate = new Date(task.reminderDateTime);
    if (!isNaN(remDate.getTime())) {
      const isPast = remDate.getTime() <= Date.now();
      const remFmt = remDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' at ' + remDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      reminderInfoHtml = `
        <div class="task-modal-reminder-pill ${isPast ? 'triggered' : 'scheduled'}">
          <i class="fa-solid fa-bell"></i> <span><strong>Reminder:</strong> ${remFmt} ${isPast ? '(Triggered)' : '(Active)'}</span>
        </div>
      `;
    }
  }

  let stepperModalHtml = '';
  if (task.steps && Array.isArray(task.steps) && task.steps.length > 0) {
    const completedCount = task.steps.filter(s => s.completed).length;
    const pct = Math.round((completedCount / task.steps.length) * 100);
    stepperModalHtml = `
      <div class="task-modal-stepper-box">
        <div class="task-stepper-header">
          <span><i class="fa-solid fa-list-check"></i> <strong>Multi-Step Workflow Progress (${completedCount}/${task.steps.length})</strong></span>
          <span class="task-stepper-pct">${pct}% Completed</span>
        </div>
        <div class="task-stepper-bar-bg" style="height: 8px; margin: 8px 0 12px;">
          <div class="task-stepper-bar-fill" style="width: ${pct}%;"></div>
        </div>
        <div class="task-steps-list">
          ${task.steps.map(step => {
            const isNextStep = !step.completed && !task.steps.some(s => s.id < step.id && !s.completed);
            return `
            <button type="button"
                    class="step-chip ${step.completed ? 'completed' : ''} ${!step.completed && !isNextStep ? 'locked' : ''}"
                    ${!step.completed && !isNextStep ? 'disabled' : ''}
                    onclick="toggleTaskSubStep('${task.id}', ${step.id})"
                    title="${step.completed ? 'Click to re-open this step' : (isNextStep ? 'Click to complete: ' + step.name : 'Complete earlier steps first — ' + step.name)}">
              <span class="step-num-badge">${step.completed ? '✓' : step.id}</span>
              <span class="step-chip-text" style="font-size: 13px;">${step.name}</span>
              ${step.date ? `<small class="step-date-chip" style="font-size: 11px;">📅 ${formatDateDMY(step.date)}</small>` : ''}
              ${!step.completed && !isNextStep ? '<i class="fa-solid fa-lock" style="font-size: 11px; opacity: 0.6; margin-left: 6px;"></i>' : '<i class="fa-solid fa-arrow-pointer" style="font-size: 10px; opacity: 0.4; margin-left: auto;"></i>'}
            </button>
          `;}).join('')}
        </div>
        <div style="font-size: 11px; color: #64748b; margin-top: 8px; text-align: right;">
          💡 Click any active step to complete or revert
        </div>
      </div>
    `;
  }

  content.innerHTML = `
    <div class="task-modal-detail-wrapper">
      <!-- Title & Main Status Card -->
      <div class="task-modal-header-card priority-${priorityClass} ${isDone ? 'is-completed' : ''}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap;">
          <span class="task-modal-priority-badge ${priorityClass}">${priorityLabel}</span>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${deadlineBadgeHtml}
            ${isDone ? '<span class="task-modal-status-badge done">✅ Finished</span>' : '<span class="task-modal-status-badge pending">⏳ In Progress</span>'}
          </div>
        </div>
        <h3 class="task-modal-title" style="${isDone ? 'text-decoration: line-through; opacity: 0.75;' : ''}">${task.taskTitle}</h3>
        ${task.copyNumber ? `
          <div class="task-modal-copy-pill" onclick="editTaskCopyNumber('${task.id}')" title="Click to edit application number">
            <i class="fa-solid fa-stamp"></i> Certified Copy / App No: <strong>${task.copyNumber}</strong> <i class="fa-solid fa-pen" style="font-size: 9px; margin-left: 4px;"></i>
          </div>
        ` : ''}
      </div>

      <!-- Case Information Grid Card -->
      <div class="task-modal-section-card">
        <h4 class="task-modal-section-title"><i class="fa-solid fa-scale-balanced"></i> Linked Case &amp; Court Details</h4>
        ${isGeneralTask ? `
          <div class="task-modal-general-box">
            <i class="fa-solid fa-thumbtack" style="color: #6366f1; font-size: 16px;"></i>
            <div>
              <strong>General Chamber Task</strong>
              <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">This task is a general office/advocate to-do item not linked to a specific court docket.</p>
            </div>
          </div>
        ` : `
          <div class="task-modal-info-grid">
            <div class="task-modal-info-item">
              <span class="task-modal-info-lbl">Case Number</span>
              <span class="task-modal-info-val">
                <a href="javascript:void(0);" class="todo-case-link" onclick="closeTaskDetailsModal(); showTab('search'); document.getElementById('globalSearch').value='${task.caseNo}'; filterCaseTables(false);" title="View Case Dossier">
                  ${task.caseNo} ↗
                </a>
              </span>
            </div>
            <div class="task-modal-info-item">
              <span class="task-modal-info-lbl">Parties Name</span>
              <span class="task-modal-info-val">${task.caseName || '—'}</span>
            </div>
            <div class="task-modal-info-item">
              <span class="task-modal-info-lbl">Court</span>
              <span class="task-modal-info-val">🏛️ ${task.court || '—'}</span>
            </div>
            <div class="task-modal-info-item">
              <span class="task-modal-info-lbl">Next Court Hearing</span>
              <span class="task-modal-info-val" style="color: #1d4ed8; font-weight: 700;">📅 ${hearingFormatted}</span>
            </div>
          </div>
        `}
      </div>

      <!-- Deadline & Reminder Details Card -->
      <div class="task-modal-section-card">
        <h4 class="task-modal-section-title"><i class="fa-solid fa-calendar-check"></i> Deadline &amp; Schedule</h4>
        <div class="task-modal-info-grid">
          <div class="task-modal-info-item">
            <span class="task-modal-info-lbl">Target Deadline Date</span>
            <span class="task-modal-info-val" style="font-weight: 700; font-size: 14px;">📅 ${formatDateDMY(task.deadlineDate)}</span>
            <span style="font-size: 11px; color: #64748b; margin-top: 2px;">${deadlineDiffText}</span>
          </div>
          <div class="task-modal-info-item">
            <span class="task-modal-info-lbl">Reminder Alert</span>
            ${reminderInfoHtml || '<span style="font-size: 12px; color: #94a3b8;">No reminder alert configured</span>'}
          </div>
        </div>
      </div>

      <!-- Multi-step Stepper Section -->
      ${stepperModalHtml}
    </div>
  `;

  footer.innerHTML = `
    <div class="task-modal-actions-grid">
      <button type="button" class="task-modal-btn btn-toggle ${isDone ? 'is-pending' : 'is-done'}" onclick="toggleTaskStatus('${task.id}');" title="${isDone ? 'Mark as Pending' : 'Mark as Completed'}">
        <i class="fa-solid ${isDone ? 'fa-rotate-left' : 'fa-check-double'}"></i> <span>${isDone ? 'Mark as Pending' : 'Mark as Completed'}</span>
      </button>
      <div class="task-modal-secondary-btns">
        <button type="button" class="task-modal-btn btn-reminder" onclick="openTaskReminderModal('${task.id}')" title="Set or Edit Reminder">
          <i class="fa-solid fa-bell"></i> <span>${task.reminderDateTime ? 'Edit Alert' : 'Set Alert'}</span>
        </button>
        <button type="button" class="task-modal-btn btn-reschedule" onclick="rescheduleCaseTask('${task.id}');" title="Reschedule Deadline Date">
          <i class="fa-solid fa-calendar-days"></i> <span>Reschedule</span>
        </button>
        <button type="button" class="task-modal-btn btn-delete" onclick="deleteCaseTask('${task.id}'); closeTaskDetailsModal();" title="Delete Task">
          <i class="fa-solid fa-trash"></i> <span>Delete</span>
        </button>
        <button type="button" class="task-modal-btn btn-close" onclick="closeTaskDetailsModal()" title="Close Dossier">
          <i class="fa-solid fa-xmark"></i> <span>Close</span>
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeTaskDetailsModal() {
  const modal = document.getElementById('taskDetailsModal');
  if (modal) modal.classList.add('hidden');
}

window.openTaskDetailsModal = openTaskDetailsModal;
window.closeTaskDetailsModal = closeTaskDetailsModal;

// ==============================================================================
// Task Reminder & Alert Notification Engine
// ==============================================================================

function playReminderChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // First tone (587.33 Hz - D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.22, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Second tone (880 Hz - A5, bright chime)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.16);
    gain2.gain.setValueAtTime(0, now + 0.16);
    gain2.gain.linearRampToValueAtTime(0.28, now + 0.20);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.16);
    osc2.stop(now + 0.65);
  } catch (e) {
    console.warn('Web Audio chime not allowed or supported:', e);
  }
}
window.playReminderChime = playReminderChime;

function initTodoNotificationBanner() {
  const banner = document.getElementById('todoNotificationBanner');
  if (!banner) return;
  if (!('Notification' in window)) {
    banner.style.display = 'none';
    return;
  }
  const dismissed = safeStorage.get('cmDismissedNotifyBanner') === 'true';
  if (Notification.permission === 'default' && !dismissed) {
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }
}

async function requestTodoNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Browser notifications are not supported in your current browser.');
    return;
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      showToastNotification('🔔 Desktop alerts enabled successfully!');
      const banner = document.getElementById('todoNotificationBanner');
      if (banner) banner.style.display = 'none';
      playReminderChime();
    } else {
      showToastNotification('Notification permission not granted.');
    }
  } catch (e) {
    console.warn('Notification permission error:', e);
  }
}
window.requestTodoNotificationPermission = requestTodoNotificationPermission;

function dismissTodoNotificationBanner() {
  const banner = document.getElementById('todoNotificationBanner');
  if (banner) banner.style.display = 'none';
  safeStorage.set('cmDismissedNotifyBanner', 'true', true);
}
window.dismissTodoNotificationBanner = dismissTodoNotificationBanner;

function checkPendingTodoReminders() {
  if (!Array.isArray(caseTasks) || caseTasks.length === 0) return;
  const now = Date.now();

  caseTasks.forEach(task => {
    if (task.status === 'completed') return;
    if (!task.reminderDateTime) return;
    if (task.reminderDismissed || task.reminderNotified) return;

    const remTime = new Date(task.reminderDateTime).getTime();
    if (!isNaN(remTime) && remTime <= now) {
      triggerTaskReminder(task);
    }
  });
}

function triggerTaskReminder(task) {
  task.reminderNotified = true;
  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);

  // Play audio chime
  playReminderChime();

  // Trigger Native Desktop / PWA Notification if permitted
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const bodyText = `${task.caseNo && task.caseNo !== 'GENERAL' ? `[${task.caseNo}] ` : ''}Due: ${formatDateDMY(task.deadlineDate)}`;
      const notif = new Notification(`⏰ Task Reminder: ${task.taskTitle}`, {
        body: bodyText,
        icon: 'icons/icon-192.png',
        badge: 'icons/icon-192.png',
        tag: task.id,
        requireInteraction: true
      });
      notif.onclick = function() {
        window.focus();
        showTab('todo');
        this.close();
      };
    } catch (e) {
      console.warn('Native notification error:', e);
    }
  }

  // Display In-App Floating Alert Banner
  renderFloatingReminderAlert(task);
}

function renderFloatingReminderAlert(task) {
  const container = document.getElementById('todoFloatingAlertContainer');
  if (!container) return;

  const alertId = `floating_rem_${task.id}`;
  if (document.getElementById(alertId)) return;

  const card = document.createElement('div');
  card.id = alertId;
  card.className = 'todo-floating-alert-card';

  const caseLabel = (task.caseNo && task.caseNo !== 'GENERAL') ? `<span class="floating-rem-case">${task.caseNo}</span>` : '<span class="floating-rem-case general">General</span>';

  card.innerHTML = `
    <div class="floating-rem-top">
      <div class="floating-rem-icon">⏰</div>
      <div class="floating-rem-info">
        <div class="floating-rem-badge-row">
          <span class="floating-rem-tag">REMINDER ALERT</span>
          ${caseLabel}
        </div>
        <div class="floating-rem-title">${task.taskTitle}</div>
        <div class="floating-rem-deadline">📅 Deadline: <strong>${formatDateDMY(task.deadlineDate)}</strong></div>
      </div>
      <button type="button" class="floating-rem-close-btn" onclick="dismissTaskReminder('${task.id}')" title="Dismiss">✕</button>
    </div>
    <div class="floating-rem-actions">
      <button type="button" class="floating-rem-btn snooze" onclick="snoozeTaskReminder('${task.id}', 60)">
        <i class="fa-solid fa-clock-rotate-left"></i> Snooze 1h
      </button>
      <button type="button" class="floating-rem-btn complete" onclick="completeTaskFromReminder('${task.id}')">
        <i class="fa-solid fa-check"></i> Mark Done
      </button>
      <button type="button" class="floating-rem-btn whatsapp" onclick="sendTaskWhatsAppReminder('${task.id}')">
        <i class="fa-brands fa-whatsapp"></i> Share
      </button>
    </div>
  `;

  container.appendChild(card);
}

function snoozeTaskReminder(taskId, minutes = 60) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;

  const snoozeDate = new Date(Date.now() + minutes * 60 * 1000);
  const yyyy = snoozeDate.getFullYear();
  const mm = String(snoozeDate.getMonth() + 1).padStart(2, '0');
  const dd = String(snoozeDate.getDate()).padStart(2, '0');
  const hh = String(snoozeDate.getHours()).padStart(2, '0');
  const min = String(snoozeDate.getMinutes()).padStart(2, '0');

  task.reminderDateTime = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  task.reminderNotified = false;
  task.reminderDismissed = false;

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);

  const el = document.getElementById(`floating_rem_${taskId}`);
  if (el) el.remove();

  showToastNotification(`⏰ Snoozed for ${minutes >= 60 ? (minutes / 60) + ' hour(s)' : minutes + ' minutes'}`);
}
window.snoozeTaskReminder = snoozeTaskReminder;

function completeTaskFromReminder(taskId) {
  const el = document.getElementById(`floating_rem_${taskId}`);
  if (el) el.remove();
  toggleTaskStatus(taskId);
  showToastNotification('✅ Task completed!');
}
window.completeTaskFromReminder = completeTaskFromReminder;

function dismissTaskReminder(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (task) {
    task.reminderDismissed = true;
    saveCaseTasksLocally();
  }
  const el = document.getElementById(`floating_rem_${taskId}`);
  if (el) el.remove();
}
window.dismissTaskReminder = dismissTaskReminder;

function sendTaskWhatsAppReminder(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;

  const caseInfo = (task.caseNo && task.caseNo !== 'GENERAL') ? `\n⚖️ Case: ${task.caseNo} (${task.caseName || '—'})` : '';
  const text = `📌 *Case Task Reminder Alert*\n` +
               `-------------------------------\n` +
               `Task: *${task.taskTitle}*` +
               caseInfo + `\n` +
               `📅 Deadline: ${formatDateDMY(task.deadlineDate)}\n` +
               `Priority: ${task.priority ? task.priority.toUpperCase() : 'MEDIUM'}\n\n` +
               `Sent via CaseBook Management System`;

  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}
window.sendTaskWhatsAppReminder = sendTaskWhatsAppReminder;

// Quick Modal Functions for Setting / Editing Reminders on Tasks
function openTaskReminderModal(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('todoReminderModal');
  const idInput = document.getElementById('todoReminderModalTaskId');
  const dtInput = document.getElementById('todoReminderModalInput');
  const subtitle = document.getElementById('todoReminderModalTaskSubtitle');
  const statusInfo = document.getElementById('todoReminderCurrentStatusText');
  const removeBtn = document.getElementById('todoReminderRemoveBtn');

  if (!modal) return;

  idInput.value = taskId;
  if (subtitle) {
    subtitle.textContent = `${task.taskTitle} (Deadline: ${formatDateDMY(task.deadlineDate)})`;
  }

  if (task.reminderDateTime) {
    if (dtInput) dtInput.value = task.reminderDateTime;
    const remD = new Date(task.reminderDateTime);
    const remFmt = !isNaN(remD.getTime()) ? remD.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : task.reminderDateTime;
    if (statusInfo) statusInfo.innerHTML = `🟢 Current active reminder set for: <strong>${remFmt}</strong>`;
    if (removeBtn) removeBtn.style.display = 'inline-flex';
  } else {
    // Default to deadline morning 9:00 AM or tomorrow morning
    if (dtInput) {
      const deadlineDate = parseDateString(task.deadlineDate);
      if (deadlineDate) {
        const y = deadlineDate.getFullYear();
        const m = String(deadlineDate.getMonth() + 1).padStart(2, '0');
        const d = String(deadlineDate.getDate()).padStart(2, '0');
        dtInput.value = `${y}-${m}-${d}T09:00`;
      } else {
        const tom = new Date();
        tom.setDate(tom.getDate() + 1);
        const y = tom.getFullYear();
        const m = String(tom.getMonth() + 1).padStart(2, '0');
        const d = String(tom.getDate()).padStart(2, '0');
        dtInput.value = `${y}-${m}-${d}T09:00`;
      }
    }
    if (statusInfo) statusInfo.innerHTML = '⚪ No active reminder currently set for this task.';
    if (removeBtn) removeBtn.style.display = 'none';
  }

  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}
window.openTaskReminderModal = openTaskReminderModal;

function closeTodoReminderModal() {
  const modal = document.getElementById('todoReminderModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
}
window.closeTodoReminderModal = closeTodoReminderModal;

function setModalReminderPreset(preset) {
  const dtInput = document.getElementById('todoReminderModalInput');
  const idInput = document.getElementById('todoReminderModalTaskId');
  if (!dtInput) return;

  const task = caseTasks.find(t => t.id === idInput?.value);
  const now = new Date();
  let target = new Date(now.getTime());

  if (preset === 'in1hour') {
    target = new Date(now.getTime() + 60 * 60 * 1000);
  } else if (preset === 'today_evening') {
    target.setHours(18, 0, 0, 0);
    if (target.getTime() <= now.getTime()) {
      target.setDate(target.getDate() + 1);
    }
  } else if (preset === 'tomorrow_9am') {
    target.setDate(target.getDate() + 1);
    target.setHours(9, 0, 0, 0);
  } else if (preset === 'deadline_9am') {
    const dl = parseDateString(task?.deadlineDate);
    if (dl) {
      target = new Date(dl.getTime());
      target.setHours(9, 0, 0, 0);
    } else {
      target.setDate(target.getDate() + 1);
      target.setHours(9, 0, 0, 0);
    }
  }

  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  const hh = String(target.getHours()).padStart(2, '0');
  const min = String(target.getMinutes()).padStart(2, '0');

  dtInput.value = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
window.setModalReminderPreset = setModalReminderPreset;

function saveTaskReminderFromModal() {
  const idInput = document.getElementById('todoReminderModalTaskId');
  const dtInput = document.getElementById('todoReminderModalInput');
  if (!idInput || !idInput.value) return;

  const task = caseTasks.find(t => t.id === idInput.value);
  if (!task) return;

  const val = dtInput ? dtInput.value : '';
  if (!val) {
    alert('Please choose a valid reminder date and time.');
    return;
  }

  task.reminderDateTime = val;
  task.reminderNotified = false;
  task.reminderDismissed = false;

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  closeTodoReminderModal();

  const remD = new Date(val);
  const remFmt = !isNaN(remD.getTime()) ? remD.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : val;
  showToastNotification(`⏰ Reminder set for ${remFmt}!`);

  // Auto-request notification permission if not yet decided
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}
window.saveTaskReminderFromModal = saveTaskReminderFromModal;

function removeTaskReminderFromModal() {
  const idInput = document.getElementById('todoReminderModalTaskId');
  if (!idInput || !idInput.value) return;

  const task = caseTasks.find(t => t.id === idInput.value);
  if (!task) return;

  task.reminderDateTime = null;
  task.reminderNotified = false;
  task.reminderDismissed = false;

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  closeTodoReminderModal();
  showToastNotification('⏰ Reminder removed');
}
window.removeTaskReminderFromModal = removeTaskReminderFromModal;

// Start interval checker for pending reminders (every 30 seconds)
if (!window._todoReminderInterval) {
  window._todoReminderInterval = setInterval(checkPendingTodoReminders, 30000);
}
// Run an immediate check 3 seconds after boot
setTimeout(() => {
  initTodoNotificationBanner();
  checkPendingTodoReminders();
}, 3000);

// ==============================================================================
// Calendar View Scheduler Logic
// ==============================================================================

let currentCalendarYear = 2026;
let currentCalendarMonth = 8; // September (0-indexed: 8)
let selectedCalendarDate = null;

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendarView(year = currentCalendarYear, month = currentCalendarMonth) {
  currentCalendarYear = year;
  currentCalendarMonth = month;

  const monthYearEl = document.getElementById('calendarMonthYear');
  if (monthYearEl) {
    monthYearEl.textContent = `${monthNames[month]} ${year}`;
  }

  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const totalDaysInPrevMonth = new Date(year, month, 0).getDate();

  // Count and map hearings for this month
  let totalHearingsCount = 0;
  let civilHearingsCount = 0;
  let criminalHearingsCount = 0;
  let revenueHearingsCount = 0;

  const dayHearingsMap = {};

  allCaseRecords.forEach(c => {
    if (!c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null') return;

    const str = String(c.nextHearing).trim();
    let hYear = null, hMonth = null, hDay = null;

    const ymd = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (ymd) {
      hYear = parseInt(ymd[1], 10);
      hMonth = parseInt(ymd[2], 10) - 1;
      hDay = parseInt(ymd[3], 10);
    } else {
      const dmy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      if (dmy) {
        hDay = parseInt(dmy[1], 10);
        hMonth = parseInt(dmy[2], 10) - 1;
        hYear = parseInt(dmy[3], 10);
      }
    }

    if (hYear === year && hMonth === month) {
      totalHearingsCount++;
      const type = (c.caseType || 'civil').toLowerCase().trim();
      if (type === 'civil' || type === 'misc_civil') civilHearingsCount++;
      else if (type === 'criminal' || type === 'state' || type === 'complaint' || type === 'misc_criminal') criminalHearingsCount++;
      else if (type === 'revenue') revenueHearingsCount++;

      if (!dayHearingsMap[hDay]) dayHearingsMap[hDay] = [];
      dayHearingsMap[hDay].push(c);
    }
  });

  // Update summary stat chips
  const totalEl = document.getElementById('calTotalHearings');
  const civilEl = document.getElementById('calCivilHearings');
  const crimEl = document.getElementById('calCriminalHearings');
  const revEl = document.getElementById('calRevenueHearings');

  if (totalEl) totalEl.textContent = String(totalHearingsCount);
  if (civilEl) civilEl.textContent = String(civilHearingsCount);
  if (crimEl) crimEl.textContent = String(criminalHearingsCount);
  if (revEl) revEl.textContent = String(revenueHearingsCount);

  const grid = document.getElementById('calendarGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const today = new Date();
  const isCurrentRealMonth = today.getFullYear() === year && today.getMonth() === month;

  // 1. Trailing days from previous month
  for (let i = 0; i < firstDayOfWeek; i++) {
    const prevDayNum = totalDaysInPrevMonth - firstDayOfWeek + i + 1;
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell empty-day';
    cell.innerHTML = `<span class="day-number">${prevDayNum}</span>`;
    grid.appendChild(cell);
  }

  // 2. Active month days
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const cell = document.createElement('div');
    const isToday = isCurrentRealMonth && today.getDate() === day;
    const hearings = dayHearingsMap[day] || [];
    const hasHearings = hearings.length > 0;

    cell.className = `cal-day-cell ${isToday ? 'today-cell' : ''}`;
    if (selectedCalendarDate && selectedCalendarDate.day === day && selectedCalendarDate.month === month && selectedCalendarDate.year === year) {
      cell.classList.add('selected-day');
    }

    let hearingsHtml = '';
    if (hasHearings) {
      hearingsHtml = `
        <div class="day-hearings-container">
          ${hearings.slice(0, 2).map(h => {
            const rawType = (h.caseType || 'civil').toLowerCase().trim();
            const caseNo = h.caseNo || h.criminalCaseNumber || '—';
            let extraClass = '';
            if (rawType === 'state' || rawType === 'complaint' || rawType === 'misc_criminal') {
              extraClass = 'criminal';
            } else if (rawType === 'misc_civil') {
              extraClass = 'civil';
            }
            return `<span class="day-hearing-pill ${escapeHtml(rawType)} ${extraClass}" title="${escapeHtml(caseNo)}: ${escapeHtml(h.caseName || 'Case')}">${escapeHtml(caseNo)}</span>`;
          }).join('')}
          ${hearings.length > 2 ? `<span class="day-count-badge">+${hearings.length - 2} more</span>` : ''}
        </div>
      `;
    }

    cell.innerHTML = `
      <div class="cal-day-header">
        <span class="day-number">${day}</span>
        ${hasHearings ? `<span class="day-count-badge">${hearings.length}</span>` : ''}
      </div>
      ${hearingsHtml}
    `;

    cell.addEventListener('click', () => {
      grid.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected-day'));
      cell.classList.add('selected-day');
      selectedCalendarDate = { day, month, year };
      renderDaySchedule(day, month, year, hearings);
    });

    grid.appendChild(cell);
  }

  // 3. Selection: keep previous selection or select first day with hearings
  if (selectedCalendarDate && selectedCalendarDate.month === month && selectedCalendarDate.year === year) {
    const day = selectedCalendarDate.day;
    renderDaySchedule(day, month, year, dayHearingsMap[day] || []);
  } else {
    const firstDayWithHearings = Object.keys(dayHearingsMap)[0];
    if (firstDayWithHearings) {
      const d = parseInt(firstDayWithHearings, 10);
      selectedCalendarDate = { day: d, month, year };
      const firstCell = grid.querySelectorAll('.cal-day-cell:not(.empty-day)')[d - 1];
      if (firstCell) firstCell.classList.add('selected-day');
      renderDaySchedule(d, month, year, dayHearingsMap[d]);
    } else {
      selectedCalendarDate = { day: 1, month, year };
      renderDaySchedule(1, month, year, []);
    }
  }
}

function renderDaySchedule(day, month, year, hearings) {
  const titleEl = document.getElementById('selectedDateTitle');
  const badgeEl = document.getElementById('selectedDateCountBadge');
  const listEl = document.getElementById('dayScheduleList');

  const dateFormatted = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;

  if (titleEl) {
    titleEl.textContent = `📅 Scheduled Hearings for ${dateFormatted}`;
  }

  if (badgeEl) {
    badgeEl.textContent = `${hearings.length} Hearing${hearings.length === 1 ? '' : 's'}`;
    badgeEl.className = `case-badge ${hearings.length > 0 ? 'civil' : ''}`;
  }

  if (!listEl) return;

  if (!hearings || hearings.length === 0) {
    listEl.innerHTML = `<p class="empty-schedule-msg">No hearings scheduled on <strong>${dateFormatted}</strong>.</p>`;
    return;
  }

  listEl.innerHTML = hearings.map(h => {
    const caseNo = h.caseNo || h.criminalCaseNumber || '—';
    const type = (h.caseType || 'civil').toUpperCase();
    const typeClass = (h.caseType || 'civil').toLowerCase();
    const court = h.courtName || h.criminalCourtName || 'District Court';
    const stage = h.hearingProcess || h.process || 'Scheduled Hearing';
    const client = h.clientName || h.criminalClientName || '—';
    const caseName = h.caseName || (h.plaintiff ? `${h.plaintiff} vs ${h.defendant}` : `${h.victimName} vs ${h.accusedName}`);

    return `
      <div class="schedule-case-card">
        <div class="schedule-case-info">
          <div class="schedule-case-header">
            <span class="schedule-case-no">${caseNo}</span>
            <span class="case-badge ${typeClass}">${type}</span>
          </div>
          <div class="schedule-case-name">${caseName}</div>
          <div class="schedule-case-meta">
            <span>🏛️ ${court}</span>
            <span>📋 <strong>Stage:</strong> ${stage}</span>
            <span>👤 <strong>Client:</strong> ${client}</span>
          </div>
        </div>
        <div class="schedule-case-actions">
          <button type="button" class="table-view-btn whatsapp-btn" onclick="sendWhatsAppHearingNotice('${caseNo}')" title="Send WhatsApp Hearing Notice to Client">
            💬 WhatsApp
          </button>
          <button type="button" class="table-view-btn update-hearing-btn" onclick="openUpdateHearingForCase('${caseNo}')">
            📅 Update
          </button>
          <button type="button" class="table-view-btn" onclick="showTab('search'); document.getElementById('globalSearch').value='${caseNo}'; filterCaseTables(false);">
            🔎 View
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.renderCalendarView = renderCalendarView;
window.renderDaySchedule = renderDaySchedule;

function printDailyCauseList(targetDateStr = '') {
  // If targetDateStr is passed as a MouseEvent/PointerEvent from event listeners, sanitize to empty string
  if (typeof targetDateStr !== 'string') {
    targetDateStr = '';
  }

  let y = null, m = null, d = null, fullDateFormatted = '', weekday = '';

  if (targetDateStr && targetDateStr.includes('-')) {
    const parts = targetDateStr.split('-');
    y = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10) - 1;
    d = parseInt(parts[2], 10);
  } else if (typeof currentCauseListDate !== 'undefined' && currentCauseListDate && String(currentCauseListDate).includes('-')) {
    const parts = String(currentCauseListDate).split('-');
    y = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10) - 1;
    d = parseInt(parts[2], 10);
  } else if (typeof selectedCalendarDate !== 'undefined' && selectedCalendarDate) {
    d = selectedCalendarDate.day;
    m = selectedCalendarDate.month;
    y = selectedCalendarDate.year;
  } else {
    const now = new Date();
    y = now.getFullYear();
    m = now.getMonth();
    d = now.getDate();
  }

  const dateObj = new Date(y, m, d);
  fullDateFormatted = `${String(d).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}/${y}`;
  const weekdayEnglish = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const weekdayHindiMap = {
    Sunday: 'रविवार', Monday: 'सोमवार', Tuesday: 'मंगलवार',
    Wednesday: 'बुधवार', Thursday: 'गुरुवार', Friday: 'शुक्रवार', Saturday: 'शनिवार'
  };
  weekday = `${weekdayEnglish} (${weekdayHindiMap[weekdayEnglish] || ''})`;

  const dateMatchYMD = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  // Filter hearings on this day across allCaseRecords
  const hearingsOnDay = allCaseRecords.filter(c => {
    if (!c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null') return false;
    const str = String(c.nextHearing).trim();
    if (str === dateMatchYMD) return true;

    // Check d/m/y or y/m/d fallback
    let hYear = null, hMonth = null, hDay = null;
    const ymd = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (ymd) {
      hYear = parseInt(ymd[1], 10);
      hMonth = parseInt(ymd[2], 10) - 1;
      hDay = parseInt(ymd[3], 10);
    } else {
      const dmy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      if (dmy) {
        hDay = parseInt(dmy[1], 10);
        hMonth = parseInt(dmy[2], 10) - 1;
        hYear = parseInt(dmy[3], 10);
      }
    }
    return hYear === y && hMonth === m && hDay === d;
  });

  // Filter by court if selected in either dropdown
  const courtFilterVal = (document.getElementById('causeListCourtFilterSelect')?.value || document.getElementById('causeListCourtFilter')?.value || '').trim().toLowerCase();
  const filteredHearings = courtFilterVal
    ? hearingsOnDay.filter(c => (c.courtName || c.criminalCourtName || '').trim().toLowerCase() === courtFilterVal)
    : hearingsOnDay;

  // Sort by Court Name and then Case Number
  filteredHearings.sort((a, b) => {
    const courtA = (a.courtName || a.criminalCourtName || '').toUpperCase();
    const courtB = (b.courtName || b.criminalCourtName || '').toUpperCase();
    if (courtA !== courtB) return courtA.localeCompare(courtB);
    const numA = (a.caseNo || a.criminalCaseNumber || '').toUpperCase();
    const numB = (b.caseNo || b.criminalCaseNumber || '').toUpperCase();
    return numA.localeCompare(numB);
  });

  // Populate Printable Document
  const printDateEl = document.getElementById('causeListPrintDate');
  const printDayEl = document.getElementById('causeListPrintDay');
  const printTotalEl = document.getElementById('causeListPrintTotal');
  const printTimestampEl = document.getElementById('causeListPrintTimestamp');
  const printTbody = document.getElementById('causePrintTableBody');

  if (printDateEl) printDateEl.textContent = fullDateFormatted;
  if (printDayEl) printDayEl.textContent = weekday;
  if (printTotalEl) {
    const courtSuffix = courtFilterVal ? ` (${courtFilterVal.toUpperCase()})` : '';
    printTotalEl.textContent = `${filteredHearings.length} Matter${filteredHearings.length === 1 ? '' : 's'} Listed${courtSuffix}`;
  }
  if (printTimestampEl) {
    const now = new Date();
    printTimestampEl.textContent = `${formatDateDMY(now)} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  if (printTbody) {
    if (filteredHearings.length === 0) {
      const courtNote = courtFilterVal ? ` in ${courtFilterVal}` : '';
      printTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 25px 10px; font-weight: bold; color: #64748b;">No court hearings scheduled on ${fullDateFormatted} (${weekday})${courtNote}.</td></tr>`;
    } else {
      printTbody.innerHTML = filteredHearings.map((h, idx) => {
        const caseNo = h.caseNo || h.criminalCaseNumber || '—';
        const type = (h.caseType || 'civil').toUpperCase();
        const court = h.courtName || h.criminalCourtName || 'District Court';
        const stage = h.hearingProcess || h.process || 'Scheduled Proceeding';
        const client = h.clientName || h.criminalClientName || '—';
        const clientPhone = (h.clientNumber || h.criminalClientNumber) ? `<br><small style="color: #475569; font-weight: 600;">📞 ${h.clientNumber || h.criminalClientNumber}</small>` : '';
        const caseName = h.caseName || (h.plaintiff ? `${h.plaintiff} vs ${h.defendant}` : (h.victimName ? `${h.victimName} vs ${h.accusedName}` : '—'));

        return `
          <tr>
            <td style="text-align: center; font-weight: 800;">${idx + 1}</td>
            <td>
              <strong>${caseNo}</strong>
              <div style="font-size: 9.5px; color: #475569; font-weight: 700; text-transform: uppercase;">[${type}]</div>
            </td>
            <td>
              <strong>${caseName}</strong>
            </td>
            <td>${court}</td>
            <td><strong>${stage}</strong></td>
            <td>${client}${clientPhone}</td>
            <td><div style="min-height: 28px; border-bottom: 1px dotted #94a3b8;"></div></td>
          </tr>
        `;
      }).join('');
    }
  }

  document.body.classList.remove('printing-case-dossier');
  window.print();
}

window.printDailyCauseList = printDailyCauseList;

// ==============================================================================
// Full Case Dossier Printable Engine
// ==============================================================================
function populatePrintableCaseDossier(caseObj) {
  if (!caseObj) return;

  const caseType = (caseObj.caseType || 'civil').toLowerCase();
  const isCriminal = caseType === 'criminal';
  const isFamily = caseType === 'family';
  const isRevenue = caseType === 'revenue';

  const caseNumber = caseObj.caseNo || caseObj.criminalCaseNumber || '—';
  const caseYear = caseObj.caseYear || caseObj.crimeYear || '—';
  const courtName = caseObj.courtName || caseObj.criminalCourtName || '—';
  const filingDateVal = caseObj.filingDate || caseObj.crimeFilingDate;
  const filingDate = formatDateDMY(filingDateVal);
  const nextHearing = formatDateDMY(caseObj.nextHearing);
  const nextProcess = caseObj.hearingProcess || '—';
  const prevHearing = formatDateDMY(caseObj.previousHearing);
  const prevProcess = caseObj.previousProcess || '—';
  const clientName = caseObj.clientName || caseObj.criminalClientName || caseObj.client || '—';
  const clientPhone = caseObj.clientNumber || caseObj.criminalClientNumber || '';

  // Status calculation
  const isDisposed = caseObj.status === 'disposed' || Boolean(caseObj.disposalComment || caseObj.disposal_comment);
  const isUndated = !caseObj.nextHearing || caseObj.nextHearing === '—' || String(caseObj.nextHearing).trim() === '';
  let statusText = 'Pending';
  if (isDisposed) statusText = 'Disposed Off';
  else if (isUndated) statusText = 'Undated / Unscheduled';

  // Case Title
  let caseTitle = caseObj.caseName || '';
  if (!caseTitle) {
    if (isCriminal) {
      const v = caseObj.victimName || caseObj.firstParty;
      const a = caseObj.accusedName || caseObj.oppositeParty;
      caseTitle = v && a ? `${v} vs ${a}` : (v || a || 'Criminal Matter');
    } else if (isFamily) {
      const p = caseObj.petitioner || caseObj.plaintiff;
      const r = caseObj.respondent || caseObj.defendant;
      caseTitle = p && r ? `${p} vs ${r}` : (p || r || 'Family Dispute');
    } else if (isRevenue) {
      const app = caseObj.applicant || caseObj.plaintiff;
      const opp = caseObj.respondent || caseObj.defendant;
      caseTitle = app && opp ? `${app} vs ${opp}` : (app || opp || 'Revenue Matter');
    } else {
      const p = caseObj.plaintiff || caseObj.firstParty;
      const d = caseObj.defendant || caseObj.oppositeParty;
      caseTitle = p && d ? `${p} vs ${d}` : (p || d || 'Civil Suit');
    }
  }

  // Header & Title
  const badgeEl = document.getElementById('casePrintTypeBadge');
  if (badgeEl) badgeEl.textContent = `${caseType.toUpperCase()} CASE`;

  const titleEl = document.getElementById('casePrintTitle');
  if (titleEl) titleEl.textContent = caseTitle;

  const noEl = document.getElementById('casePrintNo');
  if (noEl) noEl.textContent = caseNumber;

  const courtEl = document.getElementById('casePrintCourt');
  if (courtEl) courtEl.textContent = courtName;

  const statusEl = document.getElementById('casePrintStatus');
  if (statusEl) statusEl.textContent = statusText;

  // Grid details
  const ctEl = document.getElementById('casePrintCaseType');
  if (ctEl) ctEl.textContent = caseType.toUpperCase();

  const yrEl = document.getElementById('casePrintYear');
  if (yrEl) yrEl.textContent = caseYear;

  const fdEl = document.getElementById('casePrintFilingDate');
  if (fdEl) fdEl.textContent = filingDate;

  const cfEl = document.getElementById('casePrintCourtFull');
  if (cfEl) cfEl.textContent = courtName;

  const nhEl = document.getElementById('casePrintNextHearing');
  if (nhEl) nhEl.textContent = nextHearing;

  const npEl = document.getElementById('casePrintNextProcess');
  if (npEl) npEl.textContent = nextProcess;

  const phEl = document.getElementById('casePrintPrevHearing');
  if (phEl) phEl.textContent = prevHearing;

  const ppEl = document.getElementById('casePrintPrevProcess');
  if (ppEl) ppEl.textContent = prevProcess;

  // Parties & Matter Particulars
  const partiesContainer = document.getElementById('casePrintPartiesContent');
  if (partiesContainer) {
    const items = [];
    if (isCriminal || caseType === 'state' || caseType === 'complaint' || caseType === 'misc_criminal') {
      if (caseObj.victimName || caseObj.firstParty) items.push(['Complainant / Victim', caseObj.victimName || caseObj.firstParty]);
      if (caseObj.accusedName || caseObj.oppositeParty) items.push(['Accused / Opposite', caseObj.accusedName || caseObj.oppositeParty]);
      if (caseObj.policeStation) items.push(['Police Station', caseObj.policeStation]);
      if (caseObj.crimeNumber) items.push(['FIR / Crime No.', `${caseObj.crimeNumber}${caseObj.crimeYear ? ` / ${caseObj.crimeYear}` : ''}`]);
      if (caseObj.crimeSection) items.push(['Sections (IPC/BNS)', caseObj.crimeSection]);
      if (caseObj.custodyStatus) items.push(['Custody / Bail Status', caseObj.custodyStatus]);
    } else if (isFamily) {
      if (caseObj.petitioner || caseObj.plaintiff) items.push(['Petitioner / Applicant', caseObj.petitioner || caseObj.plaintiff]);
      if (caseObj.respondent || caseObj.defendant) items.push(['Respondent / Opposite', caseObj.respondent || caseObj.defendant]);
      if (caseObj.familyMatterType || caseObj.matterType) items.push(['Dispute Nature', caseObj.familyMatterType || caseObj.matterType]);
      if (caseObj.marriageDate) items.push(['Marriage Date', formatDateDMY(caseObj.marriageDate)]);
      if (caseObj.maintenance) items.push(['Maintenance Details', caseObj.maintenance]);
    } else if (isRevenue) {
      if (caseObj.applicant || caseObj.plaintiff) items.push(['Applicant / Petitioner', caseObj.applicant || caseObj.plaintiff]);
      if (caseObj.respondent || caseObj.defendant) items.push(['Opposite Party', caseObj.respondent || caseObj.defendant]);
      if (caseObj.revenueMatterType) items.push(['Revenue Matter Nature', caseObj.revenueMatterType]);
      if (caseObj.village) items.push(['Village / Mauza', caseObj.village]);
      if (caseObj.khataNo || caseObj.gataNo) items.push(['Khata / Gata No.', [caseObj.khataNo ? `Khata: ${caseObj.khataNo}` : '', caseObj.gataNo ? `Gata: ${caseObj.gataNo}` : ''].filter(Boolean).join(' | ')]);
    } else {
      if (caseObj.plaintiff || caseObj.firstParty) items.push(['Plaintiff / Petitioner', caseObj.plaintiff || caseObj.firstParty]);
      if (caseObj.defendant || caseObj.oppositeParty) items.push(['Defendant / Respondent', caseObj.defendant || caseObj.oppositeParty]);
      if (caseObj.matterType) items.push(['Matter / Suit Nature', caseObj.matterType]);
    }

    if (items.length === 0) {
      items.push(['Parties', caseTitle]);
    }

    partiesContainer.innerHTML = items.map(([k, v]) => `
      <div class="dossier-print-prop-cell">
        <span class="dossier-print-prop-lbl">${escapeHtml(k)}:</span>
        <span class="dossier-print-prop-val">${escapeHtml(v)}</span>
      </div>
    `).join('');
  }

  // Client & Remarks
  const cNameEl = document.getElementById('casePrintClientName');
  if (cNameEl) cNameEl.textContent = clientName;

  const cPhoneEl = document.getElementById('casePrintClientPhone');
  if (cPhoneEl) cPhoneEl.textContent = clientPhone ? clientPhone : '—';

  const remEl = document.getElementById('casePrintRemarks');
  const remarkVal = remarksToPlainText(caseObj.remark || caseObj.remarks);
  if (remEl) remEl.textContent = remarkVal ? remarkVal : 'None recorded.';

  const dispRow = document.getElementById('casePrintDisposalRow');
  const dispEl = document.getElementById('casePrintDisposalComment');
  const disposalVal = caseObj.disposalComment || caseObj.disposal_comment || '';
  if (dispRow && dispEl) {
    if (disposalVal.trim()) {
      dispRow.style.display = '';
      dispEl.textContent = disposalVal.trim();
    } else if (isDisposed) {
      dispRow.style.display = '';
      dispEl.textContent = 'Matter disposed of.';
    } else {
      dispRow.style.display = 'none';
    }
  }

  // Proceedings History
  const historyBody = document.getElementById('casePrintHistoryBody');
  if (historyBody) {
    const history = typeof getCaseHearingHistory === 'function' ? getCaseHearingHistory(caseNumber) : [];
    const events = [];

    history.forEach(h => {
      const isNext = Boolean(caseObj.nextHearing && (h.hearing_date === caseObj.nextHearing));
      events.push({
        date: h.hearing_date,
        process: h.process || 'Court Hearing',
        type: isNext ? 'Upcoming Hearing' : 'Past Hearing',
        action: h.action_taken || h.remarks || 'Court proceedings conducted.'
      });
    });

    if (caseObj.nextHearing && caseObj.nextHearing !== '—' && !events.some(e => e.date === caseObj.nextHearing)) {
      events.push({
        date: caseObj.nextHearing,
        process: caseObj.hearingProcess || 'Scheduled Hearing',
        type: 'Upcoming Hearing',
        action: `Next appearance scheduled at ${courtName}`
      });
    }

    if (caseObj.previousHearing && caseObj.previousHearing !== '—' && !events.some(e => e.date === caseObj.previousHearing)) {
      events.push({
        date: caseObj.previousHearing,
        process: caseObj.previousProcess || 'Previous Stage',
        type: 'Past Hearing',
        action: `Previous proceedings recorded at ${courtName}`
      });
    }

    if (filingDateVal && filingDateVal !== '—' && !events.some(e => e.date === filingDateVal)) {
      events.push({
        date: filingDateVal,
        process: 'Case Inception & Filing',
        type: 'Initial Filing',
        action: `Case instituted and registered at ${courtName}`
      });
    }

    // Sort newest first
    events.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (events.length === 0) {
      historyBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:8px; color:#64748b; font-style:italic;">No recorded proceedings logged yet.</td></tr>';
    } else {
      // Limit to latest 8 hearings to guarantee a clean, single A4 page fit
      const displayEvents = events.slice(0, 8);
      let rowsHtml = displayEvents.map((ev, idx) => {
        const typeClass = String(ev.type || '').toLowerCase().replace(/\s+/g, '-');
        return `
          <tr>
            <td style="text-align: center; font-weight: bold; color: #64748b;">${idx + 1}</td>
            <td style="white-space: nowrap; font-weight: 700; color: #0f172a;">${formatDateDMY(ev.date)}</td>
            <td style="font-weight: 700; color: #1e40af;">${escapeHtml(ev.process || '—')}</td>
            <td><span class="dossier-timeline-tag ${typeClass}">${escapeHtml(ev.type)}</span></td>
            <td>${escapeHtml(ev.action || '—')}</td>
          </tr>
        `;
      }).join('');

      if (events.length > 8) {
        rowsHtml += `
          <tr>
            <td colspan="5" style="text-align: center; padding: 3px; font-size: 8.5px; color: #64748b; background: #f8fafc; font-style: italic;">
              + ${events.length - 8} earlier proceedings on record in CaseBook database
            </td>
          </tr>
        `;
      }

      historyBody.innerHTML = rowsHtml;
    }
  }

  // Timestamp
  const tsEl = document.getElementById('casePrintTimestamp');
  if (tsEl) {
    const now = new Date();
    tsEl.textContent = now.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}

function printCurrentCaseDossier(customCaseObj = null) {
  const caseObj = customCaseObj || currentSelectedCase;
  if (!caseObj) {
    if (typeof showToast === 'function') {
      showToast('Please select a case to print.', 'warning');
    } else {
      alert('Please select a case to print.');
    }
    return;
  }

  populatePrintableCaseDossier(caseObj);
  document.body.classList.add('printing-case-dossier');

  const cleanup = () => {
    document.body.classList.remove('printing-case-dossier');
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);
  setTimeout(cleanup, 4000);

  window.print();
}

function printCurrentGuestCaseDossier() {
  if (!currentGuestSelectedCase) {
    if (typeof showToast === 'function') {
      showToast('Please select a case to print.', 'warning');
    } else {
      alert('Please select a case to print.');
    }
    return;
  }
  printCurrentCaseDossier(currentGuestSelectedCase);
}

window.populatePrintableCaseDossier = populatePrintableCaseDossier;
window.printCurrentCaseDossier = printCurrentCaseDossier;
window.printCurrentGuestCaseDossier = printCurrentGuestCaseDossier;


// ==============================================================================
// WhatsApp Client Notification Engine
// ==============================================================================
let lastUpdatedHearingCase = null;

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

window.sendWhatsAppHearingNotice = sendWhatsAppHearingNotice;

// ==============================================================================
// Update Case Tab Logic
// ==============================================================================

const setVal = (id, val, customInputId) => {
  const el = document.getElementById(id);
  if (!el) return;
  const customEl = customInputId ? document.getElementById(customInputId) : null;
  if (el.tagName === 'SELECT' && val) {
    let optionExists = false;
    for (let i = 0; i < el.options.length; i++) {
      if (el.options[i].value.toLowerCase() === String(val).toLowerCase() || el.options[i].text.toLowerCase() === String(val).toLowerCase()) {
        el.selectedIndex = i;
        optionExists = true;
        break;
      }
    }
    if (!optionExists) {
      // Check if this select has an "Other" option
      let otherOptionIndex = -1;
      for (let i = 0; i < el.options.length; i++) {
        const optVal = el.options[i].value.toLowerCase();
        if (optVal.startsWith('other') || optVal === 'other') {
          otherOptionIndex = i;
          break;
        }
      }
      if (customEl && otherOptionIndex !== -1) {
        el.selectedIndex = otherOptionIndex;
        customEl.style.display = 'block';
        customEl.value = val;
      } else {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        el.appendChild(opt);
        el.value = val;
        if (customEl) {
          customEl.style.display = 'none';
          customEl.value = '';
        }
      }
    } else if (customEl) {
      if (el.value.toLowerCase().startsWith('other') || el.value === 'Other') {
        customEl.style.display = 'block';
      } else {
        customEl.style.display = 'none';
        customEl.value = '';
      }
    }
  } else {
    el.value = val || '';
    if (customEl) {
      customEl.style.display = 'none';
      customEl.value = '';
    }
  }
};

function toggleCaseNumberUnlock(btn) {
  if (!btn) return;
  const targetIds = (btn.getAttribute('data-targets') || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!targetIds.length) return;

  const isCurrentlyUnlocked = btn.classList.contains('unlocked');
  if (!isCurrentlyUnlocked) {
    const confirmUnlock = confirm('⚠️ Changing the Case Number or Year modifies the primary case identifier across registers and hearing history. Do you want to unlock these fields for editing?');
    if (!confirmUnlock) return;

    targetIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.removeAttribute('readonly');
        el.classList.remove('locked-input');
        el.classList.add('unlocked-input');
      }
    });
    btn.classList.add('unlocked');
    btn.innerHTML = '<i class="fa-solid fa-lock-open"></i> <span>Lock</span>';
    btn.title = 'Click to re-lock Case Number & Year fields';
  } else {
    targetIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.setAttribute('readonly', 'true');
        el.classList.add('locked-input');
        el.classList.remove('unlocked-input');
      }
    });
    btn.classList.remove('unlocked');
    btn.innerHTML = '<i class="fa-solid fa-lock"></i> <span>Unlock</span>';
    btn.title = 'Click to unlock and correct Case Number or Year';
  }
}
window.toggleCaseNumberUnlock = toggleCaseNumberUnlock;

let currentlyLoadedOriginalCaseNo = '';

function loadCaseForUpdate(caseNoToFind) {
  const query = (caseNoToFind || document.getElementById('updateSearchInput')?.value || '').trim().toLowerCase();
  const statusEl = document.getElementById('updateSearchStatus');

  if (!query) {
    if (statusEl) {
      statusEl.textContent = 'Please enter a Case Number, Party Name, or Client Name to search.';
      statusEl.className = 'update-status-msg error';
    }
    return;
  }

  // 1. Check for exact case number match first
  let exactMatch = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === query || num2 === query;
  });

  // 2. Filter all potential matches
  const matches = allCaseRecords.filter(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    const name = (c.caseName || '').toLowerCase();
    const plaintiff = (c.plaintiff || '').toLowerCase();
    const defendant = (c.defendant || '').toLowerCase();
    const victim = (c.victimName || '').toLowerCase();
    const accused = (c.accusedName || '').toLowerCase();
    const client = (c.clientName || c.criminalClientName || '').toLowerCase();
    return num1 === query || num2 === query || num1.includes(query) || num2.includes(query) ||
           name.includes(query) || (plaintiff && plaintiff.includes(query)) ||
           (defendant && defendant.includes(query)) || (victim && victim.includes(query)) ||
           (accused && accused.includes(query)) || (client && client.includes(query));
  });

  if (!exactMatch && matches.length === 0) {
    if (statusEl) {
      statusEl.textContent = `❌ Case "${query.toUpperCase()}" not found in local or synchronized records.`;
      statusEl.className = 'update-status-msg error';
    }
    return;
  }

  // 3. Multi-match search disambiguation: render candidate list if > 1 match and no direct exact match
  if (!caseNoToFind && !exactMatch && matches.length > 1) {
    if (statusEl) {
      let html = `
        <div class="update-search-candidates">
          <div class="candidate-header">
            <span>🔍 Found ${matches.length} matches for "<em>${escapeHtml(query)}</em>":</span>
            <small style="color:#64748b;">Click a case below to load its details</small>
          </div>
          <div class="candidate-list">
      `;
      matches.slice(0, 10).forEach(m => {
        const cNo = m.caseNo || m.criminalCaseNumber || '—';
        const cName = m.caseName || (m.plaintiff ? `${m.plaintiff} vs ${m.defendant}` : (m.victimName ? `${m.victimName} vs ${m.accusedName}` : '—'));
        const cType = (m.caseType || 'civil').toUpperCase();
        const cCourt = m.courtName || m.criminalCourtName || 'District Court';
        const cHearing = m.nextHearing && m.nextHearing !== '—' ? m.nextHearing : 'Undated';
        const cClient = m.clientName || m.criminalClientName || '—';
        html += `
          <div class="candidate-item" onclick="loadCaseForUpdate('${escapeHtml(cNo)}')">
            <div class="candidate-item-info">
              <div class="candidate-item-title">
                <strong>${escapeHtml(cNo)}</strong>
                <span class="case-badge ${(m.caseType || 'civil').toLowerCase()}" style="font-size:10px; padding:2px 7px; text-transform:uppercase;">${cType}</span>
                <span>${escapeHtml(cName)}</span>
              </div>
              <div class="candidate-item-meta">
                <span>🏛️ ${escapeHtml(cCourt)}</span>
                <span>📅 Next: ${escapeHtml(cHearing)}</span>
                <span>👤 Client: ${escapeHtml(cClient)}</span>
              </div>
            </div>
            <button type="button" class="candidate-select-btn" onclick="event.stopPropagation(); loadCaseForUpdate('${escapeHtml(cNo)}');">Select &amp; Edit ➔</button>
          </div>
        `;
      });
      html += `</div></div>`;
      statusEl.innerHTML = html;
      statusEl.className = 'update-status-msg';
    }
    return;
  }

  const found = exactMatch || matches[0];
  currentlyLoadedOriginalCaseNo = found.caseNo || found.criminalCaseNumber || '';

  // Reset any unlocked inputs and lock buttons back to default locked state
  document.querySelectorAll('.unlock-case-btn').forEach(btn => {
    btn.classList.remove('unlocked');
    btn.innerHTML = '<i class="fa-solid fa-lock"></i> <span>Unlock</span>';
    btn.title = 'Click to unlock and correct Case Number or Year';
  });
  document.querySelectorAll('#updateCaseForm input.unlocked-input').forEach(inp => {
    inp.setAttribute('readonly', 'true');
    inp.classList.add('locked-input');
    inp.classList.remove('unlocked-input');
  });

  const typeDropdown = document.getElementById('updateCaseTypeDropdown');
  const caseType = (found.caseType || 'civil').toLowerCase();
  if (typeDropdown) {
    typeDropdown.value = caseType;
  }
  toggleUpdateCaseFormByType();

  // Load Status and Remark
  const statusSelect = document.getElementById('updateCaseStatus');
  if (statusSelect) {
    const isDisposed = (found.caseStatus || '').toLowerCase().includes('dispose');
    statusSelect.value = isDisposed ? 'Disposed' : 'Pending';
  }
  const remarkInput = document.getElementById('updateCaseRemark');
  if (remarkInput) {
    const r = found.remark || found.remarks || '';
    remarkInput.value = typeof r === 'object' && r !== null ? remarksToPlainText(r) : r;
  }
  const disposalCommentInput = document.getElementById('updateCaseDisposalComment');
  if (disposalCommentInput) {
    disposalCommentInput.value = found.disposalComment || found.disposal_comment || found.disposalRemark || '';
  }
  if (typeof syncDisposalSectionVisibility === 'function') {
    syncDisposalSectionVisibility();
  }

  if (caseType === 'state' || caseType === 'criminal') {
    setVal('updateStateCaseNumber', found.caseNo || found.criminalCaseNumber);
    setVal('updateStateCrimeYear', found.caseYear || found.crimeYear || '2026');
    setVal('updateStateFilingDate', found.filingDate || found.crimeFilingDate);
    setVal('updateStateCrimeNumber', found.crimeNumber);
    setVal('updateStatePoliceStation', found.policeStation, 'updateStatePoliceStationCustom');
    setVal('updateStateCrimeSection', found.crimeSection);
    setVal('updateStateFirstParty', found.firstParty || found.victimName || 'State of U.P.');
    setVal('updateStateAccusedName', found.accusedName || found.defendant);
    setVal('updateStateCourtName', found.courtName || found.criminalCourtName);
    setVal('updateStateClientName', found.clientName || found.criminalClientName);
    setVal('updateStateClientNumber', found.clientNumber || found.criminalClientNumber);
    setVal('updateStateDocLink', found.docLink || '');
    setVal('updateStateNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateStateNextHearingProcess', found.hearingProcess || found.stage || '');
  } else if (caseType === 'family') {
    setVal('updateFamilyCaseNumber', found.caseNo);
    setVal('updateFamilyCaseYear', found.caseYear || '2026');
    setVal('updateFamilyFilingDate', found.filingDate);
    setVal('updateFamilyMatterType', found.matterType || 'Maintenance (Sec 125 CrPC)', 'updateFamilyMatterTypeCustom');
    setVal('updateFamilyPetitioner', found.petitioner || found.plaintiff);
    setVal('updateFamilyRespondent', found.respondent || found.defendant);
    setVal('updateFamilyMarriageDate', found.marriageDate);
    setVal('updateFamilyMaintenance', found.maintenanceDetail);
    setVal('updateFamilyCourtName', found.courtName);
    setVal('updateFamilyClientName', found.clientName);
    setVal('updateFamilyClientNumber', found.clientNumber);
    setVal('updateFamilyDocLink', found.docLink || '');
    setVal('updateFamilyNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateFamilyNextHearingProcess', found.hearingProcess || found.stage || '');
  } else if (caseType === 'revenue') {
    setVal('updateRevenueCaseNumber', found.caseNo);
    setVal('updateRevenueCaseYear', found.caseYear || '2026');
    setVal('updateRevenueFilingDate', found.filingDate);
    setVal('updateRevenueActSection', found.revenueActSection || 'Sec 34 (Mutation / दाखिल खारिज)', 'updateRevenueActSectionCustom');
    setVal('updateRevenueVillage', found.villageMauja);
    setVal('updateRevenueTehsil', found.parganaTehsil);
    setVal('updateRevenueGataNo', found.gataKhataNo);
    setVal('updateRevenueApplicant', found.applicant || found.plaintiff);
    setVal('updateRevenueOppositeParty', found.oppositeParty || found.defendant);
    setVal('updateRevenueCourtName', found.courtName);
    setVal('updateRevenueClientName', found.clientName);
    setVal('updateRevenueClientNumber', found.clientNumber);
    setVal('updateRevenueDocLink', found.docLink || '');
    setVal('updateRevenueNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateRevenueNextHearingProcess', found.hearingProcess || found.stage || '');
  } else if (caseType === 'misc_civil') {
    setVal('updateMiscCivilCaseNumber', found.caseNo);
    setVal('updateMiscCivilCaseYear', found.caseYear || '2026');
    setVal('updateMiscCivilFilingDate', found.filingDate);
    setVal('updateMiscCivilOriginalCase', found.originalCaseNumber || found.originalCase || '');
    setVal('updateMiscCivilProceedingType', found.proceedingType || 'Temporary Injunction (Order 39 Rule 1 & 2 CPC)', 'updateMiscCivilProceedingTypeCustom');
    setVal('updateMiscCivilApplicant', found.applicant || found.plaintiff);
    setVal('updateMiscCivilOppositeParty', found.oppositeParty || found.defendant);
    setVal('updateMiscCivilCourtName', found.courtName);
    setVal('updateMiscCivilClientName', found.clientName);
    setVal('updateMiscCivilClientNumber', found.clientNumber);
    setVal('updateMiscCivilDocLink', found.docLink || '');
    setVal('updateMiscCivilNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateMiscCivilNextHearingProcess', found.hearingProcess || found.stage || '');
  } else if (caseType === 'misc_criminal') {
    setVal('updateMiscCriminalCaseNumber', found.caseNo);
    setVal('updateMiscCriminalCaseYear', found.caseYear || found.crimeYear || '2026');
    setVal('updateMiscCriminalFilingDate', found.filingDate || found.crimeFilingDate);
    setVal('updateMiscCriminalOriginalCase', found.originalCaseNumber || found.originalCase || '');
    setVal('updateMiscCriminalProceedingType', found.proceedingType || 'Regular Bail (Sec 439 CrPC / Sec 483 BNSS)', 'updateMiscCriminalProceedingTypeCustom');
    setVal('updateMiscCriminalPoliceStation', found.policeStation, 'updateMiscCriminalPoliceStationCustom');
    setVal('updateMiscCriminalCrimeSection', found.crimeSection);
    setVal('updateMiscCriminalApplicant', found.applicant || found.accusedName);
    setVal('updateMiscCriminalOppositeParty', found.oppositeParty || found.firstParty || 'State of U.P.');
    setVal('updateMiscCriminalCourtName', found.courtName);
    setVal('updateMiscCriminalClientName', found.clientName);
    setVal('updateMiscCriminalClientNumber', found.clientNumber);
    setVal('updateMiscCriminalDocLink', found.docLink || '');
    setVal('updateMiscCriminalNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateMiscCriminalNextHearingProcess', found.hearingProcess || found.stage || '');
  } else if (caseType === 'complaint') {
    setVal('updateComplaintCaseNumber', found.caseNo);
    setVal('updateComplaintCaseYear', found.caseYear || '2026');
    setVal('updateComplaintFilingDate', found.filingDate);
    setVal('updateComplaintType', found.complaintType || 'Cheque Bounce (Sec 138 NI Act)', 'updateComplaintTypeCustom');
    setVal('updateComplaintSectionAct', found.sectionAct || '');
    setVal('updateComplaintComplainant', found.complainant || found.plaintiff || '');
    setVal('updateComplaintAccusedName', found.accusedName || found.defendant || '');
    setVal('updateComplaintPoliceStation', found.policeStation || '', 'updateComplaintPoliceStationCustom');
    setVal('updateComplaintCourtName', found.courtName);
    setVal('updateComplaintClientName', found.clientName);
    setVal('updateComplaintClientNumber', found.clientNumber);
    setVal('updateComplaintDocLink', found.docLink || '');
    setVal('updateComplaintNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateComplaintNextHearingProcess', found.hearingProcess || found.stage || '');
  } else {
    setVal('updateCaseNo', found.caseNo);
    setVal('updateCaseYear', found.caseYear || '2026');
    setVal('updateFilingDate', found.filingDate);
    setVal('updatePlaintiff', found.plaintiff);
    setVal('updateDefendant', found.defendant);
    setVal('updateCourtName', found.courtName);
    setVal('updateClientName', found.clientName);
    setVal('updateClientNumber', found.clientNumber);
    setVal('updateCaseDocLink', found.docLink || '');
    setVal('updateNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateNextHearingProcess', found.hearingProcess || found.stage || '');
  }

  // Pre-fill search input if needed
  const updateSearchInput = document.getElementById('updateSearchInput');
  if (updateSearchInput && !updateSearchInput.value) {
    updateSearchInput.value = currentlyLoadedOriginalCaseNo;
  }

  if (statusEl) {
    statusEl.textContent = `✅ Case "${currentlyLoadedOriginalCaseNo}" loaded. You can update details below.`;
    statusEl.className = 'update-status-msg success';
  }
}

let isSubmittingUpdate = false;
async function handleUpdateCaseSubmit(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  if (isSubmittingUpdate) {
    console.warn('Case update submission already in progress, blocking duplicate.');
    return;
  }

  const caseType = document.getElementById('updateCaseTypeDropdown')?.value || 'civil';
  const statusEl = document.getElementById('updateSearchStatus');
  const updateForm = document.getElementById('updateCaseForm');
  const submitBtn = updateForm?.querySelector('button[type="submit"]');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-save"></i> Save Case Details';

  let newCaseNumber = '';
  let newCaseYear = '';
  if (caseType === 'state' || caseType === 'criminal') {
    newCaseNumber = (document.getElementById('updateStateCaseNumber')?.value || document.getElementById('updateCriminalCaseNumber')?.value)?.trim();
    newCaseYear = document.getElementById('updateStateCrimeYear')?.value?.trim();
  } else if (caseType === 'family') {
    newCaseNumber = document.getElementById('updateFamilyCaseNumber')?.value?.trim();
    newCaseYear = document.getElementById('updateFamilyCaseYear')?.value?.trim();
  } else if (caseType === 'revenue') {
    newCaseNumber = document.getElementById('updateRevenueCaseNumber')?.value?.trim();
    newCaseYear = document.getElementById('updateRevenueCaseYear')?.value?.trim();
  } else if (caseType === 'misc_civil') {
    newCaseNumber = document.getElementById('updateMiscCivilCaseNumber')?.value?.trim();
    newCaseYear = document.getElementById('updateMiscCivilCaseYear')?.value?.trim();
  } else if (caseType === 'misc_criminal') {
    newCaseNumber = document.getElementById('updateMiscCriminalCaseNumber')?.value?.trim();
    newCaseYear = document.getElementById('updateMiscCriminalCaseYear')?.value?.trim();
  } else if (caseType === 'complaint') {
    newCaseNumber = document.getElementById('updateComplaintCaseNumber')?.value?.trim();
    newCaseYear = document.getElementById('updateComplaintCaseYear')?.value?.trim();
  } else {
    newCaseNumber = document.getElementById('updateCaseNo')?.value?.trim();
    newCaseYear = document.getElementById('updateCaseYear')?.value?.trim();
  }

  newCaseNumber = String(newCaseNumber || '').trim().toUpperCase();

  if (!newCaseNumber) {
    alert('Please enter a valid Case Number.');
    if (statusEl) {
      statusEl.textContent = 'Please enter a valid Case Number.';
      statusEl.className = 'update-status-msg error';
    }
    return;
  }

  const originalCaseNo = currentlyLoadedOriginalCaseNo || newCaseNumber;

  // Check duplicate if case number is changed (both in-memory and live Supabase query across all tables)
  if (newCaseNumber.toLowerCase() !== originalCaseNo.toLowerCase()) {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking Duplicate...';
    }
    const duplicateExists = await checkCaseNumberExists(newCaseNumber, originalCaseNo);
    if (duplicateExists && duplicateExists.exists) {
      alert(`❌ Case Number "${newCaseNumber}" already exists in the database! Please choose a unique Case Number.`);
      if (statusEl) {
        statusEl.textContent = `❌ Case Number "${newCaseNumber}" already exists on another case.`;
        statusEl.className = 'update-status-msg error';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
      return;
    }
  }

  try {
    isSubmittingUpdate = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving Updates...';
    }

  const caseIndex = allCaseRecords.findIndex(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === originalCaseNo.toLowerCase() || num2 === originalCaseNo.toLowerCase();
  });

  if (caseIndex === -1) {
    alert(`Case "${originalCaseNo}" was not found.`);
    return;
  }

  const targetCase = allCaseRecords[caseIndex];
  targetCase.caseType = caseType;
  targetCase.caseNo = newCaseNumber;
  if (newCaseYear) {
    targetCase.caseYear = newCaseYear;
    if (caseType === 'state' || caseType === 'criminal' || caseType === 'misc_criminal') {
      targetCase.crimeYear = newCaseYear;
    }
  }

  // Save Case Status, Parties Remark, and Disposal Comment
  targetCase.caseStatus = document.getElementById('updateCaseStatus')?.value || 'Pending';
  targetCase.remark = document.getElementById('updateCaseRemark')?.value?.trim() || '';
  targetCase.disposalComment = document.getElementById('updateCaseDisposalComment')?.value?.trim() || '';
  targetCase.disposal_comment = targetCase.disposalComment;

  let fixNextHearingDate = '';
  let fixHearingProcess = '';

  if (caseType === 'state' || caseType === 'criminal') {
    targetCase.criminalCaseNumber = newCaseNumber;
    const psSelect = document.getElementById('updateStatePoliceStation')?.value?.trim() || '';
    const psCustom = document.getElementById('updateStatePoliceStationCustom')?.value?.trim() || '';
    targetCase.policeStation = (psSelect === 'Other' && psCustom) ? psCustom : (psSelect || psCustom || '');
    targetCase.crimeSection = document.getElementById('updateStateCrimeSection')?.value?.trim() || '';
    targetCase.crimeNumber = document.getElementById('updateStateCrimeNumber')?.value?.trim() || '';
    targetCase.filingDate = document.getElementById('updateStateFilingDate')?.value || '';
    targetCase.crimeFilingDate = targetCase.filingDate;
    targetCase.firstParty = document.getElementById('updateStateFirstParty')?.value?.trim() || 'State of U.P.';
    targetCase.victimName = targetCase.firstParty;
    targetCase.accusedName = document.getElementById('updateStateAccusedName')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateStateCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateStateClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateStateClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateStateDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.firstParty} vs ${targetCase.accusedName}`;
    targetCase.partyName = targetCase.accusedName;
    fixNextHearingDate = document.getElementById('updateStateNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateStateNextHearingProcess')?.value?.trim() || '';
  } else if (caseType === 'family') {
    const famSelect = document.getElementById('updateFamilyMatterType')?.value || '';
    const famCustom = document.getElementById('updateFamilyMatterTypeCustom')?.value?.trim() || document.getElementById('familyMatterTypeCustom')?.value?.trim() || '';
    targetCase.matterType = (famSelect.toLowerCase().startsWith('other') && famCustom) ? famCustom : (famSelect || famCustom || 'Maintenance (Sec 125 CrPC)');
    targetCase.filingDate = document.getElementById('updateFamilyFilingDate')?.value || '';
    targetCase.petitioner = document.getElementById('updateFamilyPetitioner')?.value?.trim() || '';
    targetCase.respondent = document.getElementById('updateFamilyRespondent')?.value?.trim() || '';
    targetCase.marriageDate = document.getElementById('updateFamilyMarriageDate')?.value || '';
    targetCase.maintenanceDetail = document.getElementById('updateFamilyMaintenance')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateFamilyCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateFamilyClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateFamilyClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateFamilyDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.petitioner} vs ${targetCase.respondent}`;
    targetCase.partyName = targetCase.respondent;
    fixNextHearingDate = document.getElementById('updateFamilyNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateFamilyNextHearingProcess')?.value?.trim() || '';
  } else if (caseType === 'revenue') {
    const revSelect = document.getElementById('updateRevenueActSection')?.value || '';
    const revCustom = document.getElementById('updateRevenueActSectionCustom')?.value?.trim() || document.getElementById('revenueActSectionCustom')?.value?.trim() || '';
    targetCase.revenueActSection = (revSelect.toLowerCase().startsWith('other') && revCustom) ? revCustom : (revSelect || revCustom || 'Sec 34 (Mutation / दाखिल खारिज)');
    targetCase.filingDate = document.getElementById('updateRevenueFilingDate')?.value || '';
    targetCase.villageMauja = document.getElementById('updateRevenueVillage')?.value?.trim() || '';
    targetCase.parganaTehsil = document.getElementById('updateRevenueTehsil')?.value?.trim() || '';
    targetCase.gataKhataNo = document.getElementById('updateRevenueGataNo')?.value?.trim() || '';
    targetCase.applicant = document.getElementById('updateRevenueApplicant')?.value?.trim() || '';
    targetCase.oppositeParty = document.getElementById('updateRevenueOppositeParty')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateRevenueCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateRevenueClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateRevenueClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateRevenueDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.applicant} vs ${targetCase.oppositeParty}`;
    targetCase.partyName = targetCase.oppositeParty;
    fixNextHearingDate = document.getElementById('updateRevenueNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateRevenueNextHearingProcess')?.value?.trim() || '';
  } else if (caseType === 'misc_civil') {
    targetCase.originalCaseNumber = document.getElementById('updateMiscCivilOriginalCase')?.value?.trim() || '';
    targetCase.originalCase = targetCase.originalCaseNumber;
    const mcProcSelect = document.getElementById('updateMiscCivilProceedingType')?.value || '';
    const mcProcCustom = document.getElementById('updateMiscCivilProceedingTypeCustom')?.value?.trim() || '';
    targetCase.proceedingType = (mcProcSelect.toLowerCase().startsWith('other') && mcProcCustom) ? mcProcCustom : (mcProcSelect || mcProcCustom || 'Temporary Injunction (Order 39 Rule 1 & 2 CPC)');
    targetCase.filingDate = document.getElementById('updateMiscCivilFilingDate')?.value || '';
    targetCase.applicant = document.getElementById('updateMiscCivilApplicant')?.value?.trim() || '';
    targetCase.oppositeParty = document.getElementById('updateMiscCivilOppositeParty')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateMiscCivilCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateMiscCivilClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateMiscCivilClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateMiscCivilDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.applicant} vs ${targetCase.oppositeParty}`;
    targetCase.partyName = targetCase.oppositeParty;
    fixNextHearingDate = document.getElementById('updateMiscCivilNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateMiscCivilNextHearingProcess')?.value?.trim() || '';
  } else if (caseType === 'misc_criminal') {
    targetCase.originalCaseNumber = document.getElementById('updateMiscCriminalOriginalCase')?.value?.trim() || '';
    targetCase.originalCase = targetCase.originalCaseNumber;
    const mcrProcSelect = document.getElementById('updateMiscCriminalProceedingType')?.value || '';
    const mcrProcCustom = document.getElementById('updateMiscCriminalProceedingTypeCustom')?.value?.trim() || '';
    targetCase.proceedingType = (mcrProcSelect.toLowerCase().startsWith('other') && mcrProcCustom) ? mcrProcCustom : (mcrProcSelect || mcrProcCustom || 'Regular Bail (Sec 439 CrPC / Sec 483 BNSS)');
    const mcrPsSelect = document.getElementById('updateMiscCriminalPoliceStation')?.value?.trim() || '';
    const mcrPsCustom = document.getElementById('updateMiscCriminalPoliceStationCustom')?.value?.trim() || '';
    targetCase.policeStation = (mcrPsSelect === 'Other' && mcrPsCustom) ? mcrPsCustom : (mcrPsSelect || mcrPsCustom || '');
    targetCase.crimeSection = document.getElementById('updateMiscCriminalCrimeSection')?.value?.trim() || '';
    targetCase.filingDate = document.getElementById('updateMiscCriminalFilingDate')?.value || '';
    targetCase.crimeFilingDate = targetCase.filingDate;
    targetCase.applicant = document.getElementById('updateMiscCriminalApplicant')?.value?.trim() || '';
    targetCase.oppositeParty = document.getElementById('updateMiscCriminalOppositeParty')?.value?.trim() || 'State of U.P.';
    targetCase.courtName = document.getElementById('updateMiscCriminalCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateMiscCriminalClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateMiscCriminalClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateMiscCriminalDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.applicant} vs ${targetCase.oppositeParty}`;
    targetCase.partyName = targetCase.applicant;
    fixNextHearingDate = document.getElementById('updateMiscCriminalNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateMiscCriminalNextHearingProcess')?.value?.trim() || '';
  } else if (caseType === 'complaint') {
    const compTypeSelect = document.getElementById('updateComplaintType')?.value || '';
    const compTypeCustom = document.getElementById('updateComplaintTypeCustom')?.value?.trim() || '';
    targetCase.complaintType = (compTypeSelect.toLowerCase().startsWith('other') && compTypeCustom) ? compTypeCustom : (compTypeSelect || compTypeCustom || 'Cheque Bounce (Sec 138 NI Act)');
    const compPsSelect = document.getElementById('updateComplaintPoliceStation')?.value?.trim() || '';
    const compPsCustom = document.getElementById('updateComplaintPoliceStationCustom')?.value?.trim() || '';
    targetCase.policeStation = (compPsSelect === 'Other' && compPsCustom) ? compPsCustom : (compPsSelect || compPsCustom || '');
    targetCase.sectionAct = document.getElementById('updateComplaintSectionAct')?.value?.trim() || '';
    targetCase.filingDate = document.getElementById('updateComplaintFilingDate')?.value || '';
    targetCase.complainant = document.getElementById('updateComplaintComplainant')?.value?.trim() || '';
    targetCase.accusedName = document.getElementById('updateComplaintAccusedName')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateComplaintCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateComplaintClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateComplaintClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateComplaintDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.complainant} vs ${targetCase.accusedName}`;
    targetCase.partyName = targetCase.accusedName;
    fixNextHearingDate = document.getElementById('updateComplaintNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateComplaintNextHearingProcess')?.value?.trim() || '';
  } else {
    targetCase.filingDate = document.getElementById('updateFilingDate')?.value || '';
    targetCase.plaintiff = document.getElementById('updatePlaintiff')?.value?.trim() || '';
    targetCase.defendant = document.getElementById('updateDefendant')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateCaseDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.plaintiff} vs ${targetCase.defendant}`;
    targetCase.partyName = targetCase.defendant || targetCase.plaintiff;
    fixNextHearingDate = document.getElementById('updateNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateNextHearingProcess')?.value?.trim() || '';
  }

  if (fixNextHearingDate) {
    targetCase.nextHearing = fixNextHearingDate;
    if (fixHearingProcess) targetCase.hearingProcess = fixHearingProcess;

    // Update in-memory allHearingRecords as well
    const existingHearing = allHearingRecords.find(h => (h.case_number || '').toLowerCase() === originalCaseNo.toLowerCase());
    if (existingHearing) {
      existingHearing.next_hearing_date = fixNextHearingDate;
      if (fixHearingProcess) existingHearing.hearing_process = fixHearingProcess;
      if (originalCaseNo.toLowerCase() !== newCaseNumber.toLowerCase()) {
        existingHearing.case_number = newCaseNumber;
      }
    } else {
      allHearingRecords.unshift({
        id: 'hearing_' + Date.now(),
        case_number: newCaseNumber,
        hearing_date: fixNextHearingDate,
        next_hearing_date: fixNextHearingDate,
        hearing_process: fixHearingProcess || 'Listed Hearing',
        hearing_status: 'Scheduled',
        remarks: 'Updated via Case Update Form'
      });
    }
  }

  // Update in live Supabase database & cascade to hearings table
  await updateCaseInSupabase(originalCaseNo, newCaseNumber, caseType, targetCase);

  // Update in-memory hearing records if case number changed
  if (originalCaseNo.toLowerCase() !== newCaseNumber.toLowerCase()) {
    allHearingRecords.forEach(h => {
      if ((h.case_number || '').toLowerCase() === originalCaseNo.toLowerCase()) {
        h.case_number = newCaseNumber;
      }
    });
  }

  // Update search input & currentlyLoadedOriginalCaseNo to newCaseNumber
  currentlyLoadedOriginalCaseNo = newCaseNumber;
  const updateSearchInput = document.getElementById('updateSearchInput');
  if (updateSearchInput) updateSearchInput.value = newCaseNumber;

  if (statusEl) {
    statusEl.textContent = `🎉 Case "${newCaseNumber}" updated successfully!`;
    statusEl.className = 'update-status-msg success';
  }

  await performPostCrudRefresh({ caseNumber: newCaseNumber });

  if (typeof showToast === 'function') {
    showToast(`Case ${newCaseNumber} details updated successfully!`, 'success');
  } else {
    alert(`Case ${newCaseNumber} details updated and all tables refreshed successfully!`);
  }
  } catch (updateErr) {
    console.error('Error updating case:', updateErr);
    alert(`Error updating case: ${updateErr.message || updateErr}`);
    if (statusEl) {
      statusEl.textContent = `❌ Error: ${updateErr.message || updateErr}`;
      statusEl.className = 'update-status-msg error';
    }
  } finally {
    isSubmittingUpdate = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }
}

// ==============================================================================
// Case Transfer to Another Court (Inter-Court Jurisdictional Transfer)
// ==============================================================================

let isSubmittingTransfer = false;

function loadCaseForTransfer(caseNoToFind) {
  const query = (caseNoToFind || document.getElementById('transferSearchInput')?.value || '').trim().toLowerCase();
  const statusEl = document.getElementById('transferSearchStatus');
  const previewCard = document.getElementById('transferSelectedCaseCard');
  const transferForm = document.getElementById('transferCaseForm');

  if (!query) {
    if (statusEl) {
      statusEl.textContent = 'Please enter a Case Number, Party Name, or Client Name to search.';
      statusEl.className = 'update-status-msg error';
    }
    return;
  }

  // 1. Check for exact case number match first
  let exactMatch = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === query || num2 === query;
  });

  // 2. Filter all potential matches
  const matches = allCaseRecords.filter(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    const name = (c.caseName || '').toLowerCase();
    const plaintiff = (c.plaintiff || '').toLowerCase();
    const defendant = (c.defendant || '').toLowerCase();
    const victim = (c.victimName || '').toLowerCase();
    const accused = (c.accusedName || '').toLowerCase();
    const client = (c.clientName || c.criminalClientName || '').toLowerCase();
    return num1 === query || num2 === query || num1.includes(query) || num2.includes(query) ||
           name.includes(query) || (plaintiff && plaintiff.includes(query)) ||
           (defendant && defendant.includes(query)) || (victim && victim.includes(query)) ||
           (accused && accused.includes(query)) || (client && client.includes(query));
  });

  if (!exactMatch && matches.length === 0) {
    if (statusEl) {
      statusEl.textContent = `❌ Case "${query.toUpperCase()}" not found in database records.`;
      statusEl.className = 'update-status-msg error';
    }
    if (previewCard) previewCard.style.display = 'none';
    if (transferForm) transferForm.style.display = 'none';
    return;
  }

  // 3. Multi-match search disambiguation: render candidate list if > 1 match and no direct exact match
  if (!caseNoToFind && !exactMatch && matches.length > 1) {
    if (statusEl) {
      let html = `
        <div class="update-search-candidates">
          <div class="candidate-header">
            <span>🔍 Found ${matches.length} matches for "<em>${escapeHtml(query)}</em>":</span>
            <small style="color:#64748b;">Click a case below to load it for transfer</small>
          </div>
          <div class="candidate-list">
      `;
      matches.slice(0, 8).forEach(m => {
        const cNo = m.caseNo || m.criminalCaseNumber || '—';
        const cName = m.caseName || (m.plaintiff ? `${m.plaintiff} vs ${m.defendant}` : (m.victimName ? `${m.victimName} vs ${m.accusedName}` : '—'));
        const cType = (m.caseType || 'civil').toUpperCase();
        const cCourt = m.courtName || m.criminalCourtName || 'District Court';
        html += `
          <div class="candidate-item" onclick="loadCaseForTransfer('${escapeHtml(cNo)}')">
            <div class="candidate-item-info">
              <div class="candidate-item-title">
                <strong>${escapeHtml(cNo)}</strong>
                <span class="candidate-item-type ${m.caseType || 'civil'}">${cType}</span>
                <span class="candidate-item-status">${escapeHtml(m.caseStatus || 'Pending')}</span>
              </div>
              <div class="candidate-item-parties">${escapeHtml(cName)}</div>
              <div class="candidate-item-court">🏛️ Current Court: ${escapeHtml(cCourt)}</div>
            </div>
            <div class="candidate-item-action">
              <button type="button" class="primary-btn candidate-pick-btn">Select ➔</button>
            </div>
          </div>
        `;
      });
      html += `
          </div>
        </div>
      `;
      statusEl.innerHTML = html;
      statusEl.className = 'update-status-msg';
    }
    if (previewCard) previewCard.style.display = 'none';
    if (transferForm) transferForm.style.display = 'none';
    return;
  }

  const targetCase = exactMatch || matches[0];
  const caseNo = targetCase.caseNo || targetCase.criminalCaseNumber || '—';
  const caseType = targetCase.caseType || 'civil';
  const currentCourt = targetCase.courtName || targetCase.criminalCourtName || 'District Court';
  const clientName = targetCase.clientName || targetCase.criminalClientName || '—';
  const nextHearing = targetCase.nextHearing && targetCase.nextHearing !== '—' ? formatDateDMY(targetCase.nextHearing) : 'Undated';
  const caseTitle = targetCase.caseName || (targetCase.plaintiff ? `${targetCase.plaintiff} vs ${targetCase.defendant}` : (targetCase.victimName ? `${targetCase.victimName} vs ${targetCase.accusedName}` : caseNo));

  // Populate preview card
  const cNoDisp = document.getElementById('transferCaseNoDisplay');
  if (cNoDisp) cNoDisp.textContent = caseNo;

  const cTypeBadge = document.getElementById('transferCaseTypeBadge');
  if (cTypeBadge) {
    cTypeBadge.textContent = caseType.replace('_', ' ').toUpperCase();
    cTypeBadge.className = `case-badge ${caseType}`;
  }

  const cStatusBadge = document.getElementById('transferCaseStatusBadge');
  if (cStatusBadge) {
    const isDisposed = (targetCase.caseStatus || '').toLowerCase().includes('dispose');
    cStatusBadge.textContent = isDisposed ? 'Disposed Off' : 'Pending';
    cStatusBadge.className = isDisposed ? 'status-badge disposed' : 'status-badge pending';
  }

  const cTitleDisp = document.getElementById('transferCaseTitleDisplay');
  if (cTitleDisp) cTitleDisp.textContent = caseTitle;

  const cCourtDisp = document.getElementById('transferCurrentCourtDisplay');
  if (cCourtDisp) cCourtDisp.textContent = currentCourt;

  const cClientDisp = document.getElementById('transferClientDisplay');
  if (cClientDisp) cClientDisp.textContent = clientName;

  const cHearingDisp = document.getElementById('transferHearingDisplay');
  if (cHearingDisp) cHearingDisp.textContent = nextHearing;

  // Populate Form Fields
  const hiddenNo = document.getElementById('transferHiddenCaseNo');
  if (hiddenNo) hiddenNo.value = caseNo;

  const hiddenType = document.getElementById('transferHiddenCaseType');
  if (hiddenType) hiddenType.value = caseType;

  const hiddenFrom = document.getElementById('transferHiddenFromCourt');
  if (hiddenFrom) hiddenFrom.value = currentCourt;

  const fromDisp = document.getElementById('transferFromCourtDisplay');
  if (fromDisp) fromDisp.value = currentCourt;

  const dateInput = document.getElementById('transferDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  const toCourtSelect = document.getElementById('transferToCourt');
  if (toCourtSelect) {
    toCourtSelect.value = '';
  }

  const searchInput = document.getElementById('transferSearchInput');
  if (searchInput) searchInput.value = caseNo;

  if (statusEl) {
    statusEl.textContent = `✅ Case "${caseNo}" loaded. Specify destination court below.`;
    statusEl.className = 'update-status-msg success';
  }

  if (previewCard) previewCard.style.display = 'block';
  if (transferForm) transferForm.style.display = 'block';
}
window.loadCaseForTransfer = loadCaseForTransfer;

async function handleTransferCaseSubmit(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  if (isSubmittingTransfer) return;

  const caseNo = document.getElementById('transferHiddenCaseNo')?.value?.trim();
  const caseType = document.getElementById('transferHiddenCaseType')?.value?.trim() || 'civil';
  const fromCourt = document.getElementById('transferHiddenFromCourt')?.value?.trim() || document.getElementById('transferFromCourtDisplay')?.value?.trim();
  const toCourt = document.getElementById('transferToCourt')?.value?.trim();
  const transferDate = document.getElementById('transferDate')?.value?.trim() || new Date().toISOString().split('T')[0];
  const orderNo = document.getElementById('transferOrderNo')?.value?.trim() || '';
  const orderDate = document.getElementById('transferOrderDate')?.value?.trim() || null;
  const authority = document.getElementById('transferAuthority')?.value?.trim() || '';
  const reason = document.getElementById('transferReason')?.value?.trim() || 'Judicial / Territorial Court Transfer';
  const docLink = document.getElementById('transferDocLink')?.value?.trim() || '';
  const remarks = document.getElementById('transferRemarks')?.value?.trim() || '';
  const statusEl = document.getElementById('transferSearchStatus');
  const submitBtn = document.getElementById('submitTransferBtn');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-arrow-right-arrow-left"></i> Execute & Save Court Transfer';

  if (!caseNo) {
    alert('Please search and select a case to transfer first.');
    return;
  }

  if (!toCourt) {
    alert('Please select a destination court for the transfer.');
    return;
  }

  if (toCourt.toLowerCase() === fromCourt.toLowerCase()) {
    alert(`The case is already assigned to "${toCourt}". Please select a different destination court.`);
    return;
  }

  const confirmMsg = `Transfer Case "${caseNo}"\n\nFrom: ${fromCourt}\nTo: ${toCourt}\nDate: ${transferDate}\nReason: ${reason}\n\nDo you wish to execute this court transfer?`;
  if (!confirm(confirmMsg)) return;

  try {
    isSubmittingTransfer = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transferring Case...';
    }

    const transferId = 'transfer_' + Date.now();
    const transferRecord = {
      id: transferId,
      case_number: caseNo,
      case_type: caseType,
      from_court: fromCourt,
      to_court: toCourt,
      transfer_date: transferDate,
      order_number: orderNo,
      order_date: orderDate || null,
      transferred_by: authority,
      transfer_reason: reason,
      doc_link: docLink,
      remarks: remarks,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // 1. Insert into Supabase case_transfers table (with graceful fallback)
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from('case_transfers').insert([transferRecord]).select('id');
        if (error) {
          console.warn('Could not insert into Supabase case_transfers (table may need creation):', error.message);
        } else if (data && data[0]?.id) {
          transferRecord.id = data[0].id;
        }
      } catch (insertErr) {
        console.warn('Supabase case_transfers insert exception:', insertErr);
      }
    }

    // 2. Add to in-memory state & persist to local storage backup
    allCaseTransfers.unshift(transferRecord);
    window.allCaseTransfers = allCaseTransfers;
    try {
      localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
    } catch (e) {}

    // 3. Update the case's court in Supabase across the relevant case table
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
    const targetTable = tableMap[caseType] || 'civilcases';

    if (supabaseClient) {
      try {
        const payload = { court_name: toCourt, updated_at: new Date().toISOString() };
        await supabaseClient.from(targetTable).update(payload).ilike('case_number', caseNo);
      } catch (courtUpdateErr) {
        console.warn('Error updating court in Supabase case table:', courtUpdateErr);
      }
    }

    // 4. Update in-memory allCaseRecords
    const foundCase = allCaseRecords.find(c => {
      const num1 = (c.caseNo || '').toLowerCase();
      const num2 = (c.criminalCaseNumber || '').toLowerCase();
      return num1 === caseNo.toLowerCase() || num2 === caseNo.toLowerCase();
    });

    if (foundCase) {
      foundCase.courtName = toCourt;
      foundCase.criminalCourtName = toCourt;
      foundCase.updatedAt = new Date().toISOString();
    }

    // 5. If this case is currently open in Case Dossier, re-render it
    if (currentSelectedCase && ((currentSelectedCase.caseNo || '').toLowerCase() === caseNo.toLowerCase() || (currentSelectedCase.criminalCaseNumber || '').toLowerCase() === caseNo.toLowerCase())) {
      currentSelectedCase.courtName = toCourt;
      currentSelectedCase.criminalCourtName = toCourt;
      renderSelectedCaseDetails(currentSelectedCase);
    }

    // 6. Refresh views & tables
    await performPostCrudRefresh({ caseNumber: caseNo });
    renderRecentTransfersTable();
    updateTransfersCountBadge();

    // 7. Reset form and inform user
    resetTransferForm();
    if (statusEl) {
      statusEl.textContent = `🎉 Success! Case "${caseNo}" successfully transferred from "${fromCourt}" to "${toCourt}".`;
      statusEl.className = 'update-status-msg success';
    }

    if (typeof showToast === 'function') {
      showToast(`Case ${caseNo} transferred to ${toCourt}!`, 'success');
    } else {
      alert(`✅ Case ${caseNo} successfully transferred from "${fromCourt}" to "${toCourt}".`);
    }

  } catch (err) {
    console.error('Error during case transfer:', err);
    alert(`Error transferring case: ${err.message || err}`);
    if (statusEl) {
      statusEl.textContent = `❌ Error: ${err.message || err}`;
      statusEl.className = 'update-status-msg error';
    }
  } finally {
    isSubmittingTransfer = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }
}
window.handleTransferCaseSubmit = handleTransferCaseSubmit;

// ==============================================================================
// BULK CASES TRANSFER LOGIC & STATE
// ==============================================================================
let bulkLoadedCases = [];
let bulkSelectedCaseNumbers = new Set();
let isSubmittingBulkTransfer = false;

function switchTransferMode(mode) {
  const singleBtn = document.getElementById('transferTabBtnSingle');
  const bulkBtn = document.getElementById('transferTabBtnBulk');
  const singleContainer = document.getElementById('singleTransferContainer');
  const bulkContainer = document.getElementById('bulkTransferContainer');

  if (mode === 'bulk') {
    if (singleBtn) singleBtn.classList.remove('active');
    if (bulkBtn) bulkBtn.classList.add('active');
    if (singleContainer) singleContainer.style.display = 'none';
    if (bulkContainer) bulkContainer.style.display = 'block';

    const bulkDateInput = document.getElementById('bulkTransferDate');
    if (bulkDateInput && !bulkDateInput.value) {
      bulkDateInput.value = new Date().toISOString().split('T')[0];
    }
  } else {
    if (singleBtn) singleBtn.classList.add('active');
    if (bulkBtn) bulkBtn.classList.remove('active');
    if (singleContainer) singleContainer.style.display = 'block';
    if (bulkContainer) bulkContainer.style.display = 'none';
  }
}
window.switchTransferMode = switchTransferMode;

function onBulkOriginCourtChange() {
  const courtSelect = document.getElementById('bulkTransferFromCourt');
  const selectedCourt = courtSelect ? courtSelect.value.trim() : '';
  bulkSelectedCaseNumbers.clear();
  updateBulkSelectionCount();

  if (!selectedCourt) {
    bulkLoadedCases = [];
    renderBulkCasesTable([]);
    return;
  }

  // Find all non-disposed cases belonging to this origin court
  bulkLoadedCases = allCaseRecords.filter(c => {
    const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
    if (isDisposed) return false;
    const court = (c.courtName || c.criminalCourtName || '').trim().toLowerCase();
    return court === selectedCourt.toLowerCase();
  });

  const totalEl = document.getElementById('bulkTotalOriginCases');
  if (totalEl) totalEl.textContent = String(bulkLoadedCases.length);

  const filterInput = document.getElementById('bulkCaseFilterInput');
  if (filterInput) filterInput.value = '';

  renderBulkCasesTable(bulkLoadedCases);
}
window.onBulkOriginCourtChange = onBulkOriginCourtChange;

function filterBulkCasesTable() {
  const query = (document.getElementById('bulkCaseFilterInput')?.value || '').toLowerCase().trim();
  if (!query) {
    renderBulkCasesTable(bulkLoadedCases);
    return;
  }
  const filtered = bulkLoadedCases.filter(c => {
    const num = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
    const title = (c.caseTitle || c.complainant || c.accused || '').toLowerCase();
    const stage = (c.caseStage || '').toLowerCase();
    const type = (c.caseType || '').toLowerCase();
    return num.includes(query) || title.includes(query) || stage.includes(query) || type.includes(query);
  });
  renderBulkCasesTable(filtered);
}
window.filterBulkCasesTable = filterBulkCasesTable;

function renderBulkCasesTable(cases) {
  const tbody = document.getElementById('bulkCasesTableBody');
  if (!tbody) return;

  if (!cases || cases.length === 0) {
    const originCourt = document.getElementById('bulkTransferFromCourt')?.value?.trim();
    if (!originCourt) {
      tbody.innerHTML = '<tr><td colspan="5" class="no-results text-center py-6 text-slate-500">Please select an Origin Court above to load its active cases.</td></tr>';
    } else {
      tbody.innerHTML = `<tr><td colspan="5" class="no-results text-center py-6 text-slate-500">No active cases found in "${escapeHtml(originCourt)}".</td></tr>`;
    }
    const allCheckbox = document.getElementById('bulkSelectAllCheckbox');
    if (allCheckbox) allCheckbox.checked = false;
    return;
  }

  tbody.innerHTML = cases.map(c => {
    const caseNo = c.caseNo || c.criminalCaseNumber || '—';
    const caseType = (c.caseType || 'civil').toUpperCase();
    const title = c.caseTitle || `${c.complainant || 'Complainant'} vs ${c.accused || 'Accused'}`;
    const stage = c.caseStage || 'Pending';
    const hearing = c.nextHearing || 'Undated';
    const isChecked = bulkSelectedCaseNumbers.has(caseNo);

    return `
      <tr class="hover:bg-indigo-50/40 transition-colors">
        <td style="text-align: center; vertical-align: middle;">
          <input type="checkbox" class="bulk-case-checkbox" value="${escapeHtml(caseNo)}" ${isChecked ? 'checked' : ''} onchange="onBulkCaseRowCheckboxChange(this)">
        </td>
        <td class="font-semibold text-slate-900" style="vertical-align: middle;">
          <span class="case-badge ${caseType.toLowerCase().includes('crim') ? 'criminal' : caseType.toLowerCase().includes('rev') ? 'revenue' : 'civil'}" style="font-size: 10px; padding: 2px 6px; margin-right: 4px;">${escapeHtml(caseType)}</span>
          ${escapeHtml(caseNo)}
        </td>
        <td style="vertical-align: middle;">
          <div class="font-medium text-slate-800 line-clamp-1">${escapeHtml(title)}</div>
        </td>
        <td style="vertical-align: middle;">
          <span class="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">${escapeHtml(stage)}</span>
        </td>
        <td style="vertical-align: middle;" class="text-xs font-semibold text-slate-700">
          📅 ${escapeHtml(hearing)}
        </td>
      </tr>
    `;
  }).join('');

  const allCheckbox = document.getElementById('bulkSelectAllCheckbox');
  if (allCheckbox) {
    allCheckbox.checked = cases.length > 0 && cases.every(c => bulkSelectedCaseNumbers.has(c.caseNo || c.criminalCaseNumber));
  }
}

function onBulkCaseRowCheckboxChange(checkbox) {
  const caseNo = checkbox.value;
  if (checkbox.checked) {
    bulkSelectedCaseNumbers.add(caseNo);
  } else {
    bulkSelectedCaseNumbers.delete(caseNo);
  }
  updateBulkSelectionCount();

  const allCheckbox = document.getElementById('bulkSelectAllCheckbox');
  if (allCheckbox && bulkLoadedCases.length > 0) {
    allCheckbox.checked = bulkLoadedCases.every(c => bulkSelectedCaseNumbers.has(c.caseNo || c.criminalCaseNumber));
  }
}
window.onBulkCaseRowCheckboxChange = onBulkCaseRowCheckboxChange;

function toggleBulkSelectAll(allCheckbox) {
  const isChecked = allCheckbox.checked;
  bulkLoadedCases.forEach(c => {
    const caseNo = c.caseNo || c.criminalCaseNumber;
    if (!caseNo) return;
    if (isChecked) {
      bulkSelectedCaseNumbers.add(caseNo);
    } else {
      bulkSelectedCaseNumbers.delete(caseNo);
    }
  });

  const rowCheckboxes = document.querySelectorAll('.bulk-case-checkbox');
  rowCheckboxes.forEach(cb => { cb.checked = isChecked; });

  updateBulkSelectionCount();
}
window.toggleBulkSelectAll = toggleBulkSelectAll;

function clearBulkCaseSelection() {
  bulkSelectedCaseNumbers.clear();
  const allCheckbox = document.getElementById('bulkSelectAllCheckbox');
  if (allCheckbox) allCheckbox.checked = false;
  const rowCheckboxes = document.querySelectorAll('.bulk-case-checkbox');
  rowCheckboxes.forEach(cb => { cb.checked = false; });
  updateBulkSelectionCount();
}
window.clearBulkCaseSelection = clearBulkCaseSelection;

function updateBulkSelectionCount() {
  const count = bulkSelectedCaseNumbers.size;
  const countEl = document.getElementById('bulkSelectedCount');
  if (countEl) countEl.textContent = String(count);
  const submitCountEl = document.getElementById('bulkSubmitBtnCount');
  if (submitCountEl) submitCountEl.textContent = String(count);
}

function insertBulkTransferReasonChip(chipText) {
  const input = document.getElementById('bulkTransferReason');
  if (input) {
    input.value = chipText;
    input.focus();
  }
}
window.insertBulkTransferReasonChip = insertBulkTransferReasonChip;

function resetBulkTransferForm() {
  const form = document.getElementById('bulkTransferForm');
  if (form) form.reset();
  const dateInput = document.getElementById('bulkTransferDate');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
  clearBulkCaseSelection();
  const statusEl = document.getElementById('bulkTransferStatus');
  if (statusEl) {
    statusEl.textContent = '';
    statusEl.className = 'update-status-msg';
  }
}
window.resetBulkTransferForm = resetBulkTransferForm;

async function handleBulkTransferSubmit(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  if (isSubmittingBulkTransfer) return;

  const originCourt = document.getElementById('bulkTransferFromCourt')?.value?.trim();
  const toCourt = document.getElementById('bulkTransferToCourt')?.value?.trim();
  const transferDate = document.getElementById('bulkTransferDate')?.value?.trim();
  const orderNo = document.getElementById('bulkTransferOrderNo')?.value?.trim() || '';
  const authority = document.getElementById('bulkTransferAuthority')?.value?.trim() || '';
  const docLink = document.getElementById('bulkTransferDocLink')?.value?.trim() || '';
  const reason = document.getElementById('bulkTransferReason')?.value?.trim() || 'Batch Judicial Reassignment';
  const remarks = document.getElementById('bulkTransferRemarks')?.value?.trim() || '';
  const statusEl = document.getElementById('bulkTransferStatus');
  const submitBtn = document.getElementById('submitBulkTransferBtn');

  if (!originCourt) {
    alert('Please select an Origin Court.');
    return;
  }

  if (bulkSelectedCaseNumbers.size === 0) {
    alert('Please select at least one case to transfer.');
    return;
  }

  if (!toCourt) {
    alert('Please select a destination court for the batch transfer.');
    return;
  }

  if (toCourt.toLowerCase() === originCourt.toLowerCase()) {
    alert(`Destination court cannot be the same as origin court ("${toCourt}").`);
    return;
  }

  if (!transferDate) {
    alert('Please provide the date of the transfer order.');
    return;
  }

  const selectedList = Array.from(bulkSelectedCaseNumbers);
  const confirmMsg = `Execute Batch Court Transfer\n\nTotal Cases to Transfer: ${selectedList.length}\nFrom: ${originCourt}\nTo: ${toCourt}\nOrder Date: ${transferDate}\nReason: ${reason}\n\nAre you sure you want to transfer these ${selectedList.length} cases?`;
  if (!confirm(confirmMsg)) return;

  try {
    isSubmittingBulkTransfer = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Transferring ${selectedList.length} Cases...`;
    }

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

    const newTransferRecords = [];
    const nowIso = new Date().toISOString();

    for (let i = 0; i < selectedList.length; i++) {
      const caseNo = selectedList[i];
      const caseObj = allCaseRecords.find(c => {
        const cNo = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
        return cNo === caseNo.toLowerCase();
      });

      const caseType = caseObj ? (caseObj.caseType || 'civil').toLowerCase() : 'civil';
      const transferId = 'transfer_' + Date.now() + '_' + i;
      const transferRecord = {
        id: transferId,
        case_number: caseNo,
        case_type: caseType,
        from_court: originCourt,
        to_court: toCourt,
        transfer_date: transferDate,
        order_number: orderNo,
        order_date: transferDate,
        transferred_by: authority,
        transfer_reason: reason,
        doc_link: docLink,
        remarks: remarks,
        created_at: nowIso,
        updated_at: nowIso
      };

      // Insert into Supabase case_transfers
      if (supabaseClient) {
        try {
          const { data, error } = await supabaseClient.from('case_transfers').insert([transferRecord]).select('id');
          if (!error && data && data[0]?.id) {
            transferRecord.id = data[0].id;
          }
        } catch (err) {
          console.warn('Supabase case_transfers insert err:', err);
        }

        // Update court_name in case table
        try {
          const targetTable = tableMap[caseType] || 'civilcases';
          await supabaseClient.from(targetTable).update({ court_name: toCourt, updated_at: nowIso }).ilike('case_number', caseNo);
        } catch (courtErr) {
          console.warn('Error updating court for case', caseNo, courtErr);
        }
      }

      // Update in-memory
      if (caseObj) {
        caseObj.courtName = toCourt;
        caseObj.criminalCourtName = toCourt;
        caseObj.updatedAt = nowIso;
      }

      // Also update dossier if currently open
      if (currentSelectedCase && ((currentSelectedCase.caseNo || '').toLowerCase() === caseNo.toLowerCase() || (currentSelectedCase.criminalCaseNumber || '').toLowerCase() === caseNo.toLowerCase())) {
        currentSelectedCase.courtName = toCourt;
        currentSelectedCase.criminalCourtName = toCourt;
        renderSelectedCaseDetails(currentSelectedCase);
      }

      newTransferRecords.unshift(transferRecord);
    }

    // Add to allCaseTransfers
    allCaseTransfers.unshift(...newTransferRecords);
    window.allCaseTransfers = allCaseTransfers;
    try {
      localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
    } catch (e) {}

    // Refresh views
    await performPostCrudRefresh();
    renderRecentTransfersTable();
    updateTransfersCountBadge();

    // Reload the bulk origin court list (the transferred cases won't belong to origin anymore!)
    onBulkOriginCourtChange();

    resetBulkTransferForm();

    if (statusEl) {
      statusEl.textContent = `🎉 Success! Transferred ${selectedList.length} cases from "${originCourt}" to "${toCourt}".`;
      statusEl.className = 'update-status-msg success';
    }

    if (typeof showToast === 'function') {
      showToast(`Batch transfer complete! ${selectedList.length} cases transferred to ${toCourt}`, 'success');
    } else {
      alert(`✅ Success! ${selectedList.length} cases successfully transferred from "${originCourt}" to "${toCourt}".`);
    }

  } catch (err) {
    console.error('Bulk transfer failed:', err);
    alert('An error occurred during batch transfer: ' + err.message);
  } finally {
    isSubmittingBulkTransfer = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fa-solid fa-layer-group"></i> Execute Batch Transfer (<span id="bulkSubmitBtnCount">0</span> Cases)`;
    }
  }
}
window.handleBulkTransferSubmit = handleBulkTransferSubmit;

function renderRecentTransfersTable() {
  const tbody = document.getElementById('transfersRegistryTableBody');
  const badge = document.getElementById('transfersTotalCountBadge');
  if (badge) {
    badge.textContent = `${allCaseTransfers.length} Transfer${allCaseTransfers.length === 1 ? '' : 's'} Logged`;
  }
  if (!tbody) return;

  if (allCaseTransfers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="no-results text-center py-4">No case transfers recorded yet.</td></tr>';
    return;
  }

  tbody.innerHTML = allCaseTransfers.slice(0, 25).map((t, idx) => {
    const cleanDoc = safeUrl(t.doc_link);
    const docBtn = cleanDoc
      ? `<a href="${cleanDoc}" target="_blank" rel="noopener noreferrer" class="table-action-icon-btn" title="View Order Document" style="display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:6px; background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe;"><i class="fa-solid fa-file-arrow-down"></i></a>`
      : '';

    return `
      <tr>
        <td style="text-align: center; font-weight: 600; color: #64748b;">#${idx + 1}</td>
        <td style="white-space: nowrap; font-weight: 600;">${formatDateDMY(t.transfer_date)}</td>
        <td>
          <a href="#" onclick="showCaseDetails('${escapeHtml(t.case_number)}'); return false;" style="font-weight: 700; color: #1e40af; text-decoration: underline;">
            ${escapeHtml(t.case_number)}
          </a>
        </td>
        <td>
          <div class="transfer-direction-pill">
            <span class="transfer-from-court-badge">${escapeHtml(t.from_court || '—')}</span>
            <span class="transfer-arrow-icon"><i class="fa-solid fa-arrow-right"></i></span>
            <span class="transfer-to-court-badge">${escapeHtml(t.to_court || '—')}</span>
          </div>
        </td>
        <td>
          <strong style="color: #1e293b;">${escapeHtml(t.order_number || '—')}</strong>
          ${t.transferred_by ? `<div style="font-size: 11px; color: #64748b;">${escapeHtml(t.transferred_by)}</div>` : ''}
        </td>
        <td>
          <span class="transfer-reason-chip">${escapeHtml(t.transfer_reason || 'Court Transfer')}</span>
        </td>
        <td style="text-align: center;">
          <div style="display: inline-flex; align-items: center; gap: 6px;">
            <button type="button" class="table-action-icon-btn" onclick="showCaseDetails('${escapeHtml(t.case_number)}')" title="View Case Dossier" style="display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:6px; background:#f8fafc; color:#334155; border:1px solid #cbd5e1;">
              <i class="fa-solid fa-eye"></i>
            </button>
            ${docBtn}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}
window.renderRecentTransfersTable = renderRecentTransfersTable;

function renderCaseTransferHistory(caseNumber, caseObj) {
  const tbody = document.getElementById('detailInlineTransferTableBody');
  const badge = document.getElementById('detailTransferCountBadge');
  if (!tbody) return;

  const targetNo = (caseNumber || '').trim().toLowerCase();
  const transfers = (allCaseTransfers || []).filter(t => (t.case_number || '').trim().toLowerCase() === targetNo);

  // Sort descending by transfer_date or created_at
  transfers.sort((a, b) => {
    const da = new Date(a.transfer_date || a.created_at);
    const db = new Date(b.transfer_date || b.created_at);
    return db - da;
  });

  if (badge) {
    badge.textContent = `${transfers.length} Transfer${transfers.length === 1 ? '' : 's'}`;
  }

  if (transfers.length === 0) {
    const currentCourt = caseObj ? (caseObj.courtName || caseObj.criminalCourtName || 'Assigned Court') : 'Assigned Court';
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="no-results text-center py-4" style="color: #64748b; padding: 2rem;">
          ℹ️ No court transfer records found for this case. Matter is presently pending before <strong>${escapeHtml(currentCourt)}</strong>.
          <div style="margin-top: 8px;">
            <button type="button" class="table-view-btn" onclick="openTransferForCase('${escapeHtml(caseNumber)}')" style="font-size: 0.8rem; background: #eef2ff; color: #4338ca; border-color: #c7d2fe;">
              🔄 Transfer to Another Court
            </button>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = transfers.map((t, idx) => {
    const cleanDoc = safeUrl(t.doc_link);
    const docLinkHtml = cleanDoc
      ? `<a href="${cleanDoc}" target="_blank" rel="noopener noreferrer" class="table-action-icon-btn" title="View Transfer Order Document" style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:6px; background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe;"><i class="fa-solid fa-file-arrow-down"></i></a>`
      : '<span style="color:#94a3b8; font-size:12px;">—</span>';

    const authorityHtml = t.transferred_by ? `<div style="font-size:11px; color:#64748b; margin-top:2px;">Auth: ${escapeHtml(t.transferred_by)}</div>` : '';
    const orderNoHtml = t.order_number ? `<strong style="color:#1e293b;">${escapeHtml(t.order_number)}</strong>` : '<span style="color:#64748b;">Suo-moto / Admin</span>';

    return `
      <tr>
        <td style="text-align: center; font-weight: 600; color: #64748b;">#${idx + 1}</td>
        <td style="white-space: nowrap; font-weight: 600;">${formatDateDMY(t.transfer_date)}</td>
        <td>
          <div class="transfer-direction-pill">
            <span class="transfer-from-court-badge" title="Origin Court">${escapeHtml(t.from_court || 'Origin Court')}</span>
            <span class="transfer-arrow-icon"><i class="fa-solid fa-arrow-right"></i></span>
            <span class="transfer-to-court-badge" title="Destination Court">${escapeHtml(t.to_court || 'Destination Court')}</span>
          </div>
        </td>
        <td>
          ${orderNoHtml}
          ${authorityHtml}
        </td>
        <td>
          <span class="transfer-reason-chip">${escapeHtml(t.transfer_reason || 'Court Transfer')}</span>
          ${t.remarks ? `<div style="font-size:11px; color:#475569; margin-top:3px; font-style:italic;">${escapeHtml(t.remarks)}</div>` : ''}
        </td>
        <td style="text-align: center;">
          ${docLinkHtml}
        </td>
      </tr>
    `;
  }).join('');
}
window.renderCaseTransferHistory = renderCaseTransferHistory;

function insertTransferReasonChip(reasonText) {
  const reasonInput = document.getElementById('transferReason');
  if (reasonInput) {
    reasonInput.value = reasonText;
    reasonInput.focus();
  }
}
window.insertTransferReasonChip = insertTransferReasonChip;

function resetTransferForm() {
  const previewCard = document.getElementById('transferSelectedCaseCard');
  const transferForm = document.getElementById('transferCaseForm');
  const searchInput = document.getElementById('transferSearchInput');
  const statusEl = document.getElementById('transferSearchStatus');

  if (previewCard) previewCard.style.display = 'none';
  if (transferForm) {
    transferForm.reset();
    transferForm.style.display = 'none';
  }
  if (searchInput) searchInput.value = '';
  if (statusEl) {
    statusEl.textContent = '';
    statusEl.className = 'update-status-msg';
  }
}
window.resetTransferForm = resetTransferForm;

function openTransferForCase(caseNo) {
  showTab('transfer');
  const searchInput = document.getElementById('transferSearchInput');
  if (searchInput) {
    searchInput.value = caseNo || '';
  }
  loadCaseForTransfer(caseNo);
}
window.openTransferForCase = openTransferForCase;

function updateTransfersCountBadge() {
  const badge = document.getElementById('transfersTotalCountBadge');
  if (badge) {
    badge.textContent = `${allCaseTransfers.length} Transfer${allCaseTransfers.length === 1 ? '' : 's'} Logged`;
  }
}
window.updateTransfersCountBadge = updateTransfersCountBadge;

// ==============================================================================
// Courts & Form Options
// ==============================================================================

const caseTypes = [
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

function renderCourtsTable(filterQuery = '') {
  const countBadge = document.getElementById('courtsTotalCountBadge');
  const searchInput = document.getElementById('courtSearchInput');
  const query = (filterQuery !== undefined && filterQuery !== null && filterQuery !== '' ? filterQuery : (searchInput ? searchInput.value : '') || '').trim().toLowerCase();

  const deletedSet = getDeletedCourtsSet();
  const seen = new Set();
  const allCourtsList = [];

  courts.forEach(c => {
    const t = (c || '').trim();
    if (t && !deletedSet.has(t.toLowerCase()) && !seen.has(t.toLowerCase())) {
      seen.add(t.toLowerCase());
      allCourtsList.push(t);
    }
  });

  allCourtsList.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  const filteredCourts = query
    ? allCourtsList.filter(c => c.toLowerCase().includes(query))
    : allCourtsList;

  if (countBadge) {
    if (query) {
      countBadge.textContent = `${filteredCourts.length} of ${allCourtsList.length} Courts`;
    } else {
      countBadge.textContent = `${allCourtsList.length} Court${allCourtsList.length === 1 ? '' : 's'} Configured`;
    }
  }

  const grid = document.getElementById('courtsCardsGrid');

  if (!grid) return;

  if (filteredCourts.length === 0) {
    grid.innerHTML = `<div class="courts-cards-empty">${query ? `No courts matching "${escapeHtml(query)}".` : 'No courts configured yet. Add a court using the form above.'}</div>`;
    return;
  }

  grid.innerHTML = '';

  filteredCourts.forEach((court, index) => {
    const card = document.createElement('div');
    card.className = 'court-directory-card';
    const casesInCourt = (allCaseRecords || []).filter(c =>
      (c.courtName || '').trim().toLowerCase() === court.trim().toLowerCase() ||
      (c.criminalCourtName || '').trim().toLowerCase() === court.trim().toLowerCase()
    );
    const count = casesInCourt.length;

    card.innerHTML = `
      <div class="court-card-head">
        <span class="court-card-index">#${index + 1}</span>
        <span class="court-card-icon"><i class="fa-solid fa-landmark"></i></span>
        <span class="court-card-name">${escapeHtml(court)}</span>
      </div>
      <div class="court-card-body">
        <span class="court-card-count ${count > 0 ? 'has-cases' : 'zero-cases'}">
          <i class="fa-solid fa-briefcase"></i> ${count} Case${count === 1 ? '' : 's'} Assigned
        </span>
      </div>
      <div class="court-card-actions">
        <button type="button" class="court-btn-edit edit-court" title="Edit Court"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
        <button type="button" class="court-btn-delete delete-court" title="Delete Court"><i class="fa-solid fa-trash-can"></i><span class="btn-text"> Delete</span></button>
      </div>
    `;

    const editBtn = card.querySelector('.edit-court');
    const deleteBtn = card.querySelector('.delete-court');

    editBtn.addEventListener('click', () => {
      openEditCourtModal(court, count);
    });

    deleteBtn.addEventListener('click', () => {
      openDeleteCourtModal(court, count);
    });

    grid.appendChild(card);
  });
}

function openEditCourtModal(courtName, count = 0) {
  const modal = document.getElementById('editCourtModal');
  const origInput = document.getElementById('editCourtOriginalName');
  const nameInput = document.getElementById('editCourtNameInput');
  const noticeText = document.getElementById('editCourtNoticeText');
  const errorDiv = document.getElementById('editCourtErrorMsg');
  const saveBtn = document.getElementById('saveEditCourtBtn');
  const saveBtnText = document.getElementById('saveEditCourtBtnText');

  if (!modal || !nameInput) {
    const newCourt = prompt(`Edit court name "${courtName}"\n(${count} case(s) currently assigned):`, courtName);
    if (newCourt && newCourt.trim() && newCourt.trim().toLowerCase() !== courtName.toLowerCase()) {
      if (courts.some(c => c.trim().toLowerCase() === newCourt.trim().toLowerCase())) {
        alert(`A court named "${newCourt.trim()}" already exists.`);
        return;
      }
      cascadeUpdateCourtName(courtName, newCourt.trim()).then(updatedCount => {
        alert(`✅ Court renamed to "${newCourt.trim()}".\nUpdated ${updatedCount || 0} associated case(s) across the database.`);
      });
    }
    return;
  }

  if (origInput) origInput.value = courtName;
  nameInput.value = courtName;
  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }
  if (noticeText) {
    if (count > 0) {
      noticeText.innerHTML = `<strong>${count} active case(s)</strong> currently assigned to this court will be automatically updated across all tables and filings.`;
    } else {
      noticeText.textContent = 'This court currently has no active cases assigned. Renaming will update the court directory.';
    }
  }
  if (saveBtn) saveBtn.disabled = false;
  if (saveBtnText) saveBtnText.textContent = 'Save Changes';

  modal.classList.remove('hidden');
  setTimeout(() => {
    nameInput.focus();
    nameInput.select();
  }, 100);
}

function closeEditCourtModal() {
  const modal = document.getElementById('editCourtModal');
  if (modal) modal.classList.add('hidden');
}

async function confirmSaveEditedCourt() {
  const origInput = document.getElementById('editCourtOriginalName');
  const nameInput = document.getElementById('editCourtNameInput');
  const errorDiv = document.getElementById('editCourtErrorMsg');
  const saveBtn = document.getElementById('saveEditCourtBtn');
  const saveBtnText = document.getElementById('saveEditCourtBtnText');

  const oldName = (origInput?.value || '').trim();
  const newName = (nameInput?.value || '').trim();

  if (!newName) {
    if (errorDiv) {
      errorDiv.textContent = 'Please enter a valid court name.';
      errorDiv.classList.remove('hidden');
    }
    return;
  }

  if (oldName.toLowerCase() === newName.toLowerCase()) {
    closeEditCourtModal();
    return;
  }

  const alreadyExists = courts.some(c => c.trim().toLowerCase() === newName.toLowerCase() && c.trim().toLowerCase() !== oldName.toLowerCase());
  if (alreadyExists) {
    if (errorDiv) {
      errorDiv.textContent = `A court named "${newName}" already exists. Please choose a different name.`;
      errorDiv.classList.remove('hidden');
    }
    return;
  }

  try {
    if (saveBtn) saveBtn.disabled = true;
    if (saveBtnText) saveBtnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
    if (errorDiv) errorDiv.classList.add('hidden');

    const updatedCount = await cascadeUpdateCourtName(oldName, newName);
    closeEditCourtModal();
    await performPostCrudRefresh();
    alert(`✅ Court renamed to "${newName}".\nUpdated ${updatedCount || 0} associated case(s) across the database.`);
  } catch (err) {
    console.error('Error renaming court:', err);
    if (errorDiv) {
      errorDiv.textContent = `Error saving changes: ${err.message || err}`;
      errorDiv.classList.remove('hidden');
    }
  } finally {
    if (saveBtn) saveBtn.disabled = false;
    if (saveBtnText) saveBtnText.textContent = 'Save Changes';
  }
}

function openDeleteCourtModal(courtName, count = 0) {
  const modal = document.getElementById('deleteCourtModal');
  const targetInput = document.getElementById('deleteCourtTargetName');
  const displaySpan = document.getElementById('deleteCourtDisplayName');
  const casesNotice = document.getElementById('deleteCourtActiveCasesNotice');
  const casesNoticeText = document.getElementById('deleteCourtCasesNoticeText');
  const errorDiv = document.getElementById('deleteCourtErrorMsg');
  const confirmBtn = document.getElementById('confirmDeleteCourtBtn');
  const confirmBtnText = document.getElementById('confirmDeleteCourtBtnText');

  if (!modal) {
    if (confirm(`Delete court: "${courtName}"?${count > 0 ? `\n\n⚠️ Note: ${count} case(s) currently belong to this court and will be unlinked.` : ''}`)) {
      deleteCourtFromSupabase(courtName);
    }
    return;
  }

  if (targetInput) targetInput.value = courtName;
  if (displaySpan) displaySpan.textContent = `"${courtName}"`;

  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }

  if (casesNotice && casesNoticeText) {
    if (count > 0) {
      casesNoticeText.innerHTML = `<strong>⚠️ Warning:</strong> <strong>${count} active case(s)</strong> are currently assigned to this court and will have their court reference unlinked.`;
      casesNotice.classList.remove('hidden');
    } else {
      casesNotice.classList.add('hidden');
      casesNoticeText.textContent = '';
    }
  }

  if (confirmBtn) confirmBtn.disabled = false;
  if (confirmBtnText) confirmBtnText.textContent = 'Delete Court';

  modal.classList.remove('hidden');
}

function closeDeleteCourtModal() {
  const modal = document.getElementById('deleteCourtModal');
  if (modal) modal.classList.add('hidden');
}

async function executeDeleteCourtConfirm() {
  const targetInput = document.getElementById('deleteCourtTargetName');
  const errorDiv = document.getElementById('deleteCourtErrorMsg');
  const confirmBtn = document.getElementById('confirmDeleteCourtBtn');
  const confirmBtnText = document.getElementById('confirmDeleteCourtBtnText');

  const courtName = (targetInput?.value || '').trim();
  if (!courtName) {
    closeDeleteCourtModal();
    return;
  }

  if (confirmBtn) confirmBtn.disabled = true;
  if (confirmBtnText) confirmBtnText.textContent = 'Deleting...';

  try {
    await deleteCourtFromSupabase(courtName);
    closeDeleteCourtModal();
    await performPostCrudRefresh();
    if (typeof showToastNotification === 'function') {
      showToastNotification(`✅ Court "${courtName}" deleted successfully.`, 2500);
    } else if (typeof M !== 'undefined' && M.toast) {
      M.toast({ html: `✅ Court "${courtName}" deleted successfully.` });
    }
  } catch (err) {
    console.error('Error deleting court:', err);
    if (errorDiv) {
      errorDiv.textContent = `Error deleting court: ${err.message || err}`;
      errorDiv.classList.remove('hidden');
    }
    if (confirmBtn) confirmBtn.disabled = false;
    if (confirmBtnText) confirmBtnText.textContent = 'Delete Court';
  }
}

window.openEditCourtModal = openEditCourtModal;
window.closeEditCourtModal = closeEditCourtModal;
window.confirmSaveEditedCourt = confirmSaveEditedCourt;
window.editCourtPrompt = openEditCourtModal;
window.openDeleteCourtModal = openDeleteCourtModal;
window.closeDeleteCourtModal = closeDeleteCourtModal;
window.executeDeleteCourtConfirm = executeDeleteCourtConfirm;
window.deleteCourtFromList = function(courtName) {
  openDeleteCourtModal(courtName);
};

function filterCourtsTable(query) {
  renderCourtsTable(query);
}
window.filterCourtsTable = filterCourtsTable;
window.renderCourtsTable = renderCourtsTable;

async function syncAllCourtsFromDatabase() {
  const syncBtn = document.querySelector('.court-refresh-btn');
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Syncing...</span>';
  }
  try {
    const deletedSet = getDeletedCourtsSet();
    if (supabaseClient) {
      const { data: courtsData } = await supabaseClient.from('courts').select('*').order('court_name');
      if (courtsData && courtsData.length > 0) {
        const seen = new Set();
        courts = [];
        courtsData.forEach(c => {
          const name = (c.court_name || '').trim();
          if (name && !deletedSet.has(name.toLowerCase()) && !seen.has(name.toLowerCase())) {
            seen.add(name.toLowerCase());
            courts.push(name);
          }
        });
      }
    }
    // Also include any courts referenced in cases if not deleted
    (allCaseRecords || []).forEach(item => {
      const cName = (item.courtName || item.criminalCourtName || '').trim();
      if (cName && cName !== '—' && !deletedSet.has(cName.toLowerCase()) && !courts.some(c => c.trim().toLowerCase() === cName.toLowerCase())) {
        courts.push(cName);
      }
    });
    saveCourtsToBackup();
    renderCourtOptions();
    renderCriminalCourtOptions();
    renderSearchCourtFilterOptions();
    renderCourtsTable();
  } catch (err) {
    console.error('Error syncing courts:', err);
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> <span>Sync All Courts</span>';
    }
  }
}
window.syncAllCourtsFromDatabase = syncAllCourtsFromDatabase;

// ==============================================================================
// Court Helpers & Staff Directory Engine
// ==============================================================================

const COURT_HELPERS_STORAGE_KEY = 'casebook_court_helpers';
let courtHelpersList = [];

function getCourtHelpersList() {
  try {
    const raw = localStorage.getItem(COURT_HELPERS_STORAGE_KEY);
    if (raw) {
      courtHelpersList = JSON.parse(raw);
      if (Array.isArray(courtHelpersList)) return courtHelpersList;
    }
  } catch (e) {
    console.error('Error reading court helpers:', e);
  }
  courtHelpersList = [];
  return courtHelpersList;
}

function saveCourtHelpersList(list) {
  courtHelpersList = list || [];
  try {
    localStorage.setItem(COURT_HELPERS_STORAGE_KEY, JSON.stringify(courtHelpersList));
  } catch (e) {
    console.error('Error saving court helpers:', e);
  }
  updateHelpersBadges();
}

function updateHelpersBadges() {
  const helpers = getCourtHelpersList();
  const count = helpers.length;
  const navBadge = document.getElementById('helpersNavCount');
  const totalBadge = document.getElementById('helpersTotalCountBadge');
  if (navBadge) navBadge.textContent = String(count);
  if (totalBadge) totalBadge.textContent = `${count} ${count === 1 ? 'Helper' : 'Helpers'} Registered`;
}

function updateHelpersCloudSyncIndicator(isSynced) {
  const badge = document.getElementById('helpersCloudStatusBadge');
  if (!badge) return;
  if (isSynced) {
    badge.textContent = '🟢 Cloud Synced';
    badge.className = 'db-live-badge';
    badge.style.background = '#f0fdf4';
    badge.style.color = '#15803d';
    badge.style.border = '1px solid #bbf7d0';
  } else {
    badge.textContent = '💾 Local Storage';
    badge.className = 'db-live-badge';
    badge.style.background = '#fefce8';
    badge.style.color = '#854d0e';
    badge.style.border = '1px solid #fef08a';
  }
}

async function syncCourtHelpersFromCloud(showToast = false) {
  const syncBtn = document.getElementById('helpersSyncDbBtn');
  const originalHtml = syncBtn ? syncBtn.innerHTML : '';
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Syncing...</span>';
  }

  ensureSupabaseClient();
  if (!supabaseClient) {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = originalHtml;
    }
    updateHelpersCloudSyncIndicator(false);
    if (showToast && typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Cloud database not connected. Using local offline storage.', 2500);
    }
    return;
  }

  try {
    let res = await supabaseClient.from('court_helpers').select('*').order('created_at', { ascending: false });
    if (res && res.error) {
      // Fallback try table named 'helpers'
      res = await supabaseClient.from('helpers').select('*').order('created_at', { ascending: false });
    }

    if (res && res.data && !res.error) {
      const mapped = res.data.map(h => ({
        id: String(h.id || ('helper_' + Date.now())),
        name: h.name || '',
        court: h.court || '',
        position: h.position || '',
        mobile: h.mobile || '',
        createdAt: h.created_at || new Date().toISOString()
      }));

      courtHelpersList = mapped;
      try {
        localStorage.setItem(COURT_HELPERS_STORAGE_KEY, JSON.stringify(courtHelpersList));
      } catch (e) {}

      updateHelpersBadges();
      updateHelpersCloudSyncIndicator(true);
      renderHelpersTable();

      if (showToast && typeof showToastNotification === 'function') {
        showToastNotification(`✅ Fetched ${mapped.length} court staff records from database.`, 2500);
      }
    } else {
      updateHelpersCloudSyncIndicator(false);
      if (showToast && typeof showToastNotification === 'function') {
        showToastNotification('ℹ️ Database connected. No records found or table not yet created.', 2500);
      }
    }
  } catch (err) {
    console.warn('Error fetching court helpers from database:', err);
    updateHelpersCloudSyncIndicator(false);
    if (showToast && typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Unable to sync with database: ' + (err.message || err), 2500);
    }
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = originalHtml || '<i class="fa-solid fa-arrows-rotate"></i> <span>Sync DB</span>';
    }
  }
}

function populateHelperCourtDropdowns() {
  const selects = [
    document.getElementById('helperCourtSelect'),
    document.getElementById('editHelperCourtSelect'),
    document.getElementById('helperFilterCourtSelect')
  ];

  // Unique sorted courts list
  const activeCourts = Array.from(new Set((courts || []).filter(c => c && c.trim())));
  activeCourts.sort((a, b) => a.localeCompare(b));

  selects.forEach(select => {
    if (!select) return;
    const isFilter = select.id === 'helperFilterCourtSelect';
    const currentVal = select.value;

    select.innerHTML = '';
    if (isFilter) {
      const allOpt = document.createElement('option');
      allOpt.value = '';
      allOpt.textContent = 'All Courts (All Forums)';
      select.appendChild(allOpt);
    } else {
      const defaultOpt = document.createElement('option');
      defaultOpt.value = '';
      defaultOpt.disabled = true;
      defaultOpt.selected = true;
      defaultOpt.textContent = 'Select Court / Forum...';
      select.appendChild(defaultOpt);

      const generalOpt = document.createElement('option');
      generalOpt.value = 'General / All Courts';
      generalOpt.textContent = 'General / All Courts';
      select.appendChild(generalOpt);
    }

    activeCourts.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      select.appendChild(opt);
    });

    if (currentVal && Array.from(select.options).some(o => o.value === currentVal)) {
      select.value = currentVal;
    }
  });
}

function renderHelpersTable(searchQuery = '') {
  const grid = document.getElementById('helpersCardsGrid');
  if (!grid) return;

  populateHelperCourtDropdowns();
  const helpers = getCourtHelpersList();
  const filterCourtSelect = document.getElementById('helperFilterCourtSelect');
  const courtFilterVal = (filterCourtSelect?.value || '').toLowerCase().trim();
  const query = (searchQuery || document.getElementById('helperSearchInput')?.value || '').toLowerCase().trim();

  let filtered = helpers.filter(h => {
    const nameMatch = (h.name || '').toLowerCase().includes(query);
    const courtMatch = (h.court || '').toLowerCase().includes(query);
    const posMatch = (h.position || '').toLowerCase().includes(query);
    const mobMatch = (h.mobile || '').replace(/\D/g, '').includes(query.replace(/\D/g, '')) || (h.mobile || '').includes(query);
    const textMatch = !query || nameMatch || courtMatch || posMatch || mobMatch;

    const courtDropMatch = !courtFilterVal || (h.court || '').toLowerCase().trim() === courtFilterVal;
    return textMatch && courtDropMatch;
  });

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="helper-card helper-card-empty">
        <div style="font-size: 32px; margin-bottom: 8px; opacity: 0.6;"><i class="fa-solid fa-users-slash"></i></div>
        <div style="font-weight: 700; font-size: 15px; color: #334155;">No court helpers or workers found</div>
        <div style="font-size: 13px; margin-top: 4px;">${query || courtFilterVal ? 'Try adjusting your search or court filter.' : 'Add your first court staff member using the form above.'}</div>
      </div>
    `;
    updateHelpersBadges();
    return;
  }

  filtered.forEach((h) => {
    const initial = (h.name || 'W').trim().charAt(0).toUpperCase();
    const cleanMobile = (h.mobile || '').trim();
    const waDigits = cleanMobile.replace(/\D/g, '');
    const waLink = waDigits.length === 10 ? `https://wa.me/91${waDigits}` : `https://wa.me/${waDigits}`;

    const card = document.createElement('div');
    card.className = 'helper-card';

    card.innerHTML = `
      <div class="helper-card-top">
        <div class="helper-card-avatar">${escapeHtml(initial)}</div>
        <div class="helper-card-id">
          <div class="helper-card-name">${escapeHtml(h.name || '—')}</div>
          <div class="helper-card-role"><i class="fa-solid fa-briefcase"></i> ${escapeHtml(h.position || 'Staff')}</div>
        </div>
      </div>
      <div class="helper-card-court">
        <i class="fa-solid fa-landmark"></i>
        <span>${escapeHtml(h.court || 'General')}</span>
      </div>
      <div class="helper-card-contact">
        ${cleanMobile ? `
          <a href="tel:${escapeHtml(cleanMobile)}" class="helper-call-btn" title="Call ${escapeHtml(h.name)}">
            <i class="fa-solid fa-phone"></i> <span>${escapeHtml(cleanMobile)}</span>
          </a>
          <a href="${escapeHtml(waLink)}" target="_blank" rel="noopener noreferrer" class="helper-wa-btn" title="Chat on WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
          </a>
        ` : '<span style="color: #94a3b8; font-size: 13px;">No mobile provided</span>'}
      </div>
      <div class="helper-card-actions">
        <button type="button" class="court-btn-edit edit-helper-btn" title="Edit Staff Details">
          <i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span>
        </button>
        <button type="button" class="court-btn-delete delete-helper-btn" title="Delete Staff Member">
          <i class="fa-solid fa-trash-can"></i><span class="btn-text"> Delete</span>
        </button>
      </div>
    `;

    const editBtn = card.querySelector('.edit-helper-btn');
    const delBtn = card.querySelector('.delete-helper-btn');

    if (editBtn) {
      editBtn.addEventListener('click', () => openEditHelperModal(h.id));
    }
    if (delBtn) {
      delBtn.addEventListener('click', () => openDeleteHelperModal(h.id));
    }

    grid.appendChild(card);
  });

  updateHelpersBadges();
}

function filterHelpersTable(query) {
  renderHelpersTable(query);
}

async function handleSaveHelper(e) {
  if (e && e.preventDefault) e.preventDefault();

  const nameInput = document.getElementById('helperNameInput');
  const courtSelect = document.getElementById('helperCourtSelect');
  const positionInput = document.getElementById('helperPositionInput');
  const mobileInput = document.getElementById('helperMobileInput');
  const submitBtn = document.getElementById('saveHelperSubmitBtn');

  const name = (nameInput?.value || '').trim();
  const court = (courtSelect?.value || '').trim();
  const position = (positionInput?.value || '').trim();
  const mobile = (mobileInput?.value || '').trim();

  if (!name) {
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Please enter the worker / staff name.', 2500);
    }
    nameInput?.focus();
    return;
  }

  if (!court) {
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Please select the assigned court.', 2500);
    }
    courtSelect?.focus();
    return;
  }

  if (!position) {
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Please enter the position / role.', 2500);
    }
    positionInput?.focus();
    return;
  }

  if (!mobile) {
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Please enter the mobile number.', 2500);
    }
    mobileInput?.focus();
    return;
  }

  const helperId = 'helper_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const newHelper = {
    id: helperId,
    name,
    court,
    position,
    mobile,
    createdAt: new Date().toISOString()
  };

  const currentList = getCourtHelpersList();
  currentList.unshift(newHelper);
  saveCourtHelpersList(currentList);

  // Reset form
  if (nameInput) nameInput.value = '';
  if (positionInput) positionInput.value = '';
  if (mobileInput) mobileInput.value = '';
  if (courtSelect) courtSelect.selectedIndex = 0;

  renderHelpersTable();

  // Asynchronously insert into Supabase court_helpers
  ensureSupabaseClient();
  if (supabaseClient) {
    try {
      if (submitBtn) submitBtn.disabled = true;
      const { data, error } = await supabaseClient.from('court_helpers').insert([{
        name,
        court,
        position,
        mobile
      }]).select();

      if (!error && data && data[0] && data[0].id) {
        newHelper.id = String(data[0].id);
        saveCourtHelpersList(currentList);
        updateHelpersCloudSyncIndicator(true);
      }
    } catch (err) {
      console.warn('Notice: Insert to Supabase court_helpers:', err);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  await performPostCrudRefresh();

  if (typeof showToastNotification === 'function') {
    showToastNotification(`✅ Staff member "${name}" (${position}) saved successfully!`, 3000);
  } else if (typeof M !== 'undefined' && M.toast) {
    M.toast({ html: `✅ Staff member "${name}" saved!` });
  }
}

function openEditHelperModal(helperId) {
  const helpers = getCourtHelpersList();
  const helper = helpers.find(h => h.id === helperId);
  if (!helper) return;

  const modal = document.getElementById('editHelperModal');
  const idInput = document.getElementById('editHelperId');
  const nameInput = document.getElementById('editHelperNameInput');
  const courtSelect = document.getElementById('editHelperCourtSelect');
  const positionInput = document.getElementById('editHelperPositionInput');
  const mobileInput = document.getElementById('editHelperMobileInput');
  const errorDiv = document.getElementById('editHelperErrorMsg');

  if (!modal) return;

  populateHelperCourtDropdowns();

  if (idInput) idInput.value = helper.id;
  if (nameInput) nameInput.value = helper.name || '';
  if (positionInput) positionInput.value = helper.position || '';
  if (mobileInput) mobileInput.value = helper.mobile || '';

  if (courtSelect) {
    let found = false;
    Array.from(courtSelect.options).forEach(opt => {
      if (opt.value.toLowerCase() === (helper.court || '').toLowerCase()) {
        opt.selected = true;
        found = true;
      }
    });
    if (!found && helper.court) {
      const newOpt = document.createElement('option');
      newOpt.value = helper.court;
      newOpt.textContent = helper.court;
      newOpt.selected = true;
      courtSelect.appendChild(newOpt);
    }
  }

  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }

  modal.classList.remove('hidden');
  setTimeout(() => {
    nameInput?.focus();
  }, 100);
}

function closeEditHelperModal() {
  const modal = document.getElementById('editHelperModal');
  if (modal) modal.classList.add('hidden');
}

async function confirmSaveEditedHelper() {
  const idInput = document.getElementById('editHelperId');
  const nameInput = document.getElementById('editHelperNameInput');
  const courtSelect = document.getElementById('editHelperCourtSelect');
  const positionInput = document.getElementById('editHelperPositionInput');
  const mobileInput = document.getElementById('editHelperMobileInput');
  const errorDiv = document.getElementById('editHelperErrorMsg');
  const saveBtn = document.getElementById('saveEditHelperBtn');

  const id = idInput?.value;
  const name = (nameInput?.value || '').trim();
  const court = (courtSelect?.value || '').trim();
  const position = (positionInput?.value || '').trim();
  const mobile = (mobileInput?.value || '').trim();

  if (!name || !court || !position || !mobile) {
    if (errorDiv) {
      errorDiv.textContent = 'Please fill out all required fields.';
      errorDiv.classList.remove('hidden');
    }
    return;
  }

  const helpers = getCourtHelpersList();
  const index = helpers.findIndex(h => h.id === id);
  if (index === -1) {
    closeEditHelperModal();
    return;
  }

  helpers[index] = {
    ...helpers[index],
    name,
    court,
    position,
    mobile,
    updatedAt: new Date().toISOString()
  };

  saveCourtHelpersList(helpers);
  closeEditHelperModal();
  renderHelpersTable();

  // Asynchronously update in Supabase court_helpers
  ensureSupabaseClient();
  if (supabaseClient && id && !id.startsWith('helper_')) {
    try {
      if (saveBtn) saveBtn.disabled = true;
      await supabaseClient.from('court_helpers').update({
        name,
        court,
        position,
        mobile,
        updated_at: new Date().toISOString()
      }).eq('id', id);
      updateHelpersCloudSyncIndicator(true);
    } catch (err) {
      console.warn('Notice: Update to Supabase court_helpers:', err);
    } finally {
      if (saveBtn) saveBtn.disabled = false;
    }
  }

  await performPostCrudRefresh();

  if (typeof showToastNotification === 'function') {
    showToastNotification(`✅ Staff details for "${name}" updated successfully!`, 2500);
  }
}

function openDeleteHelperModal(helperId) {
  const helpers = getCourtHelpersList();
  const helper = helpers.find(h => h.id === helperId);
  if (!helper) return;

  const modal = document.getElementById('deleteHelperModal');
  const idInput = document.getElementById('deleteHelperTargetId');
  const nameSpan = document.getElementById('deleteHelperDisplayName');
  const errorDiv = document.getElementById('deleteHelperErrorMsg');

  if (!modal) {
    if (confirm(`Delete court staff member "${helper.name}"?`)) {
      const remaining = helpers.filter(h => h.id !== helperId);
      saveCourtHelpersList(remaining);
      renderHelpersTable();
    }
    return;
  }

  if (idInput) idInput.value = helper.id;
  if (nameSpan) nameSpan.textContent = `"${helper.name}" (${helper.position} • ${helper.court})`;
  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }

  modal.classList.remove('hidden');
}

function closeDeleteHelperModal() {
  const modal = document.getElementById('deleteHelperModal');
  if (modal) modal.classList.add('hidden');
}

async function executeDeleteHelperConfirm() {
  const idInput = document.getElementById('deleteHelperTargetId');
  const id = idInput?.value;
  if (!id) {
    closeDeleteHelperModal();
    return;
  }

  const helpers = getCourtHelpersList();
  const target = helpers.find(h => h.id === id);
  const remaining = helpers.filter(h => h.id !== id);
  saveCourtHelpersList(remaining);

  closeDeleteHelperModal();
  renderHelpersTable();

  // Asynchronously delete from Supabase court_helpers
  ensureSupabaseClient();
  if (supabaseClient && id && !id.startsWith('helper_')) {
    try {
      await supabaseClient.from('court_helpers').delete().eq('id', id);
      updateHelpersCloudSyncIndicator(true);
    } catch (err) {
      console.warn('Notice: Delete from Supabase court_helpers:', err);
    }
  }

  await performPostCrudRefresh();

  if (typeof showToastNotification === 'function') {
    showToastNotification(`✅ Staff member "${target ? target.name : 'Helper'}" removed from directory.`, 2500);
  }
}

function exportHelpersCsv() {
  const helpers = getCourtHelpersList();
  if (helpers.length === 0) {
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ No court staff records to export.', 2200);
    }
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'Sr No,Staff Name,Position,Assigned Court,Mobile Number,Date Added\r\n';

  helpers.forEach((h, idx) => {
    const row = [
      idx + 1,
      `"${(h.name || '').replace(/"/g, '""')}"`,
      `"${(h.position || '').replace(/"/g, '""')}"`,
      `"${(h.court || '').replace(/"/g, '""')}"`,
      `"${(h.mobile || '').replace(/"/g, '""')}"`,
      `"${(h.createdAt || '').split('T')[0]}"`
    ];
    csvContent += row.join(',') + '\r\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Court_Helpers_Directory_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (typeof showToastNotification === 'function') {
    showToastNotification('✅ Court staff directory exported to CSV.', 2500);
  }
}

window.handleSaveHelper = handleSaveHelper;
window.renderHelpersTable = renderHelpersTable;
window.filterHelpersTable = filterHelpersTable;
window.openEditHelperModal = openEditHelperModal;
window.closeEditHelperModal = closeEditHelperModal;
window.confirmSaveEditedHelper = confirmSaveEditedHelper;
window.openDeleteHelperModal = openDeleteHelperModal;
window.closeDeleteHelperModal = closeDeleteHelperModal;
window.executeDeleteHelperConfirm = executeDeleteHelperConfirm;
window.exportHelpersCsv = exportHelpersCsv;
window.syncCourtHelpersFromCloud = syncCourtHelpersFromCloud;
window.updateHelpersCloudSyncIndicator = updateHelpersCloudSyncIndicator;

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
window.insertRemarkChip = insertRemarkChip;

// ==============================================================================
// App Initialization, Form Listeners, and Mobile Navigation
// ==============================================================================

function initializeApp() {
  if (window.__caseMgmtInitialized) return;
  window.__caseMgmtInitialized = true;

  // 0. Check authentication & restore session immediately
  checkInitialAuth();
  initActivityListeners();

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
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
  }

  // Restore desktop collapsed state from localStorage
  try {
    if (window.innerWidth > 768 && localStorage.getItem('cms_sidebar_collapsed') === '1') {
      document.body.classList.add('sidebar-collapsed');
    }
  } catch (e) {}

  function handleSidebarToggle() {
    if (window.innerWidth <= 768) {
      // Mobile drawer toggle
      if (sidebar) {
        const isOpen = sidebar.classList.toggle('mobile-open');
        if (sidebarOverlay) sidebarOverlay.classList.toggle('active', isOpen);
      }
    } else {
      // Desktop icon-only mini sidebar toggle
      const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
      try {
        localStorage.setItem('cms_sidebar_collapsed', isCollapsed ? '1' : '0');
      } catch (e) {}
    }
  }
  window.handleSidebarToggle = handleSidebarToggle;

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', handleSidebarToggle);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
  }

  // Auto-close mobile drawer when tapping links on small screens
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMobileSidebar();
      }
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
  let isSubmittingCase = false;
  document.querySelector('#add form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (isSubmittingCase) {
      console.warn('Case submission already in progress, duplicate submit blocked.');
      return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-plus"></i> Submit Case';

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
  });

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

  const updateHearingForm = document.getElementById('updateHearingForm');
  if (updateHearingForm) {
    updateHearingForm.addEventListener('submit', async (e) => {
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
    });
  }

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
}

window.toggleDossierSection = toggleDossierSection;

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
let currentModalRemarkData = null;

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

window.normalizeRemarksData = normalizeRemarksData;
window.renderCaseTableRemarks = renderCaseTableRemarks;
window.remarksToPlainText = remarksToPlainText;
window.remarksToSearchString = remarksToSearchString;
window.openCaseRemarkModal = openCaseRemarkModal;
window.closeCaseRemarkModal = closeCaseRemarkModal;
window.copyRemarkDataToClipboard = copyRemarkDataToClipboard;

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
window.renderStructuredRemarks = renderStructuredRemarks;

// (escapeHtml is defined globally at top of script)



// ==============================================================================
// Live CRUD (Simple) — Supabase Database Manager Tab
// Simple mobile/desktop interface: browse rows as cards, insert, edit, delete.
// ==============================================================================

let liveCrudCurrentTable = 'civilcases';
let liveCrudRows = [];
let liveCrudListenersWired = false;

function initLiveCrudTab() {
  wireLiveCrudListeners();

  const select = document.getElementById('liveCrudTableSelect');
  if (select && select.value) {
    liveCrudCurrentTable = select.value;
  }
  fetchLiveCrudRows();
}

function wireLiveCrudListeners() {
  if (liveCrudListenersWired) return;
  liveCrudListenersWired = true;

  const select = document.getElementById('liveCrudTableSelect');
  if (select) {
    select.addEventListener('change', () => {
      liveCrudCurrentTable = select.value;
      const searchInput = document.getElementById('liveCrudSearchInput');
      if (searchInput) searchInput.value = '';
      fetchLiveCrudRows();
    });
  }

  const searchInput = document.getElementById('liveCrudSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderLiveCrudRows());
  }

  const clearBtn = document.getElementById('liveCrudSearchClearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      renderLiveCrudRows();
    });
  }

  const refreshBtn = document.getElementById('liveCrudRefreshBtn');
  if (refreshBtn) refreshBtn.addEventListener('click', () => fetchLiveCrudRows());

  const insertBtn = document.getElementById('liveCrudInsertBtn');
  if (insertBtn) insertBtn.addEventListener('click', () => openLiveCrudModal('create', null));

  const closeBtn = document.getElementById('lcModalCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeLiveCrudModal);
  const cancelBtn = document.getElementById('lcModalCancelBtn');
  if (cancelBtn) cancelBtn.addEventListener('click', closeLiveCrudModal);

  const overlay = document.getElementById('liveCrudFormModal');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeLiveCrudModal();
    });
  }
}

async function fetchLiveCrudRows() {
  const container = document.getElementById('liveCrudRowsContainer');
  const badge = document.getElementById('liveCrudTableBadge');
  const countBadge = document.getElementById('liveCrudRowCountBadge');

  if (badge) badge.textContent = 'Table: ' + liveCrudCurrentTable;
  if (container) container.innerHTML = '<div class="lc-empty">⏳ Loading rows from Supabase…</div>';

  const tryLocalFallback = () => {
    if (liveCrudCurrentTable === 'transactions' && Array.isArray(allPaisaTransactions) && allPaisaTransactions.length > 0) {
      liveCrudRows = allPaisaTransactions.map(t => ({
        id: t.id,
        type: t.type || 'spent',
        amount: t.amount || 0,
        client_payee: t.client_payee || '',
        category: t.category || '',
        mode: t.payment_mode || t.mode || 'Cash',
        case_no: t.case_no || '',
        txn_date: t.date || '',
        note: t.note || '',
        created_at: t.created_at || new Date().toISOString()
      }));
      renderLiveCrudRows();
      return true;
    }
    if (liveCrudCurrentTable === 'personal_transactions' && Array.isArray(allPersonalTransactions) && allPersonalTransactions.length > 0) {
      liveCrudRows = allPersonalTransactions.map(t => ({
        id: t.id,
        type: t.type || 'personal_spent',
        amount: t.amount || 0,
        category: t.category || '',
        note: t.note || '',
        txn_date: t.date || '',
        created_at: t.created_at || new Date().toISOString()
      }));
      renderLiveCrudRows();
      return true;
    }
    return false;
  };

  if (!ensureSupabaseClient || !ensureSupabaseClient()) {
    if (tryLocalFallback()) return;
    if (container) container.innerHTML = '<div class="lc-empty">⚠️ Supabase is not connected. Check your internet connection and refresh.</div>';
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from(liveCrudCurrentTable)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) throw error;
    if ((!data || data.length === 0) && tryLocalFallback()) {
      return;
    }
    liveCrudRows = Array.isArray(data) ? data : [];
    renderLiveCrudRows();
  } catch (err) {
    console.warn('Live CRUD fetch error:', err);
    if (tryLocalFallback()) {
      return;
    }
    if (container) container.innerHTML = `<div class="lc-empty">⚠️ Failed to load "${escapeHtml(liveCrudCurrentTable)}": ${escapeHtml(err.message || 'Unknown error')}</div>`;
  }
}

// "case_name" -> "Case Name", "plaintiff" -> "Plaintiff", "next_hearing" -> "Next Hearing"
function prettifyLiveCrudLabel(key) {
  return String(key || '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, ch => ch.toUpperCase());
}

// Pick the most human-meaningful fields to headline each row card
function getLiveCrudHeadlineFields(row) {
  const keys = Object.keys(row);
  const preferred = ['client_payee', 'case_number', 'court_name', 'task_title', 'case_name', 'hearing_date', 'transfer_date', 'helper_name', 'amount', 'note', 'type', 'name', 'title'];
  const headlineKey = preferred.find(p => keys.includes(p)) || keys.find(k => !['id', 'created_at'].includes(k)) || 'id';
  // Desktop cards show up to 7 secondary fields; the ones past the first 3 get
  // the .lc-extra class and are hidden on mobile by CSS
  const secondaryKeys = keys
    .filter(k => k !== headlineKey && !['id', 'created_at'].includes(k))
    .filter(k => {
      const v = row[k];
      return v !== null && v !== undefined && String(v).trim() !== '';
    })
    .slice(0, 7);
  return { headlineKey, secondaryKeys };
}

function renderLiveCrudRows() {
  const container = document.getElementById('liveCrudRowsContainer');
  const countBadge = document.getElementById('liveCrudRowCountBadge');
  if (!container) return;

  const searchInput = document.getElementById('liveCrudSearchInput');
  const q = (searchInput ? searchInput.value : '').trim().toLowerCase();

  let rows = liveCrudRows;
  if (q) {
    rows = rows.filter(r => Object.values(r).some(v =>
      v !== null && v !== undefined && String(v).toLowerCase().includes(q)
    ));
  }

  if (countBadge) countBadge.textContent = `${rows.length}${rows.length !== liveCrudRows.length ? ` of ${liveCrudRows.length}` : ''} rows`;

  if (rows.length === 0) {
    container.innerHTML = `<div class="lc-empty">${liveCrudRows.length === 0
      ? `📭 No rows in "${escapeHtml(liveCrudCurrentTable)}" yet. Use ➕ Insert Row to add the first one.`
      : `🔍 No rows match "${escapeHtml(q)}".`}</div>`;
    return;
  }

  container.innerHTML = rows.map((row, idx) => {
    const { headlineKey, secondaryKeys } = getLiveCrudHeadlineFields(row);
    const headline = String(row[headlineKey] ?? '—');
    // For the hearings table, show the case name right after the case number
    let headlineSuffix = '';
    if (liveCrudCurrentTable === 'hearings' && row.case_number) {
      const matchedCase = (allCaseRecords || []).find(c =>
        (c.caseNo || '').toLowerCase() === String(row.case_number).toLowerCase() ||
        (c.criminalCaseNumber || '').toLowerCase() === String(row.case_number).toLowerCase()
      );
      const caseName = matchedCase?.caseName ||
        (matchedCase?.plaintiff ? `${matchedCase.plaintiff} vs ${matchedCase.defendant}` : '') ||
        (matchedCase?.victimName ? `${matchedCase.victimName} vs ${matchedCase.accusedName}` : '');
      if (caseName) headlineSuffix = `<span class="lc-row-headline-name"> — ${escapeHtml(caseName)}</span>`;
    }
    const secondaryHtml = secondaryKeys.map((k, i) =>
      `<span class="lc-row-secondary${i >= 3 ? ' lc-extra' : ''}"><strong>${escapeHtml(prettifyLiveCrudLabel(k))}:</strong> ${escapeHtml(String(row[k]).slice(0, 80))}</span>`
    ).join('');
    const rowId = String(row.id ?? '');
    const createdAt = row.created_at ? String(row.created_at).slice(0, 10) : '';
    const footerHtml = `
      <div class="lc-row-footer">
        <span class="lc-row-id" title="Row ID">${escapeHtml(rowId)}</span>
        ${createdAt ? `<span class="lc-row-created"><i class="fa-regular fa-clock"></i> ${escapeHtml(createdAt)}</span>` : ''}
      </div>
    `;

    return `
      <div class="lc-row-card">
        <div class="lc-row-body">
          <div class="lc-row-index" title="Row #${idx + 1}">#${idx + 1}</div>
          <div class="lc-row-main">
            <div class="lc-row-headline" title="${escapeHtml(headline)}">${escapeHtml(headline)}${headlineSuffix}</div>
            <div class="lc-row-secondary-group">${secondaryHtml}</div>
            ${footerHtml}
          </div>
        </div>
        <div class="lc-row-actions">
          <button type="button" class="table-view-btn" onclick="openLiveCrudModal('edit', ${escapeHtml(String(rowId)) ? `'${escapeHtml(rowId)}'` : 'null'})" title="Edit this row"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
          <button type="button" class="table-view-btn lc-delete-btn" onclick="deleteLiveCrudRow('${escapeHtml(rowId)}', '${escapeHtml(headline.replace(/'/g, ''))}')" title="Delete this row"><i class="fa-solid fa-trash-can"></i><span class="btn-text"> Delete</span></button>
        </div>
      </div>
    `;
  }).join('');
}

// Columns auto-generated from a real row; read-only/db-managed ones are skipped
function getLiveCrudEditableColumns(sampleRow) {
  if (!sampleRow) return [];
  return Object.keys(sampleRow).filter(k => !['id', 'created_at'].includes(k));
}

function buildLiveCrudFieldHtml(key, value) {
  const strVal = (value === null || value === undefined) ? '' : String(value);
  const isDate = /(^|_)(date|_at)$/.test(key) || /^\d{4}-\d{2}-\d{2}/.test(strVal);
  const isNumber = typeof value === 'number' || (/^\d+(\.\d+)?$/.test(strVal) && strVal !== '');
  const inputType = isDate && /^\d{4}-\d{2}-\d{2}/.test(strVal) ? 'date'
    : (isDate && /_date$/.test(key) ? 'date' : (isNumber ? 'number' : 'text'));

  let valAttr = '';
  if (inputType === 'date') {
    const m = strVal.match(/^(\d{4}-\d{2}-\d{2})/);
    valAttr = m ? ` value="${m[1]}"` : '';
  } else if (inputType === 'number') {
    valAttr = ` value="${escapeHtml(strVal)}"`;
  } else {
    valAttr = ` value="${escapeHtml(strVal)}"`;
  }

  return `
    <div class="modifier-form-group">
      <label for="lcField_${escapeHtml(key)}" class="db-toolbar-label">${escapeHtml(prettifyLiveCrudLabel(key))}:</label>
      <input type="${inputType}" id="lcField_${escapeHtml(key)}" data-lc-column="${escapeHtml(key)}" class="db-search-input" ${valAttr} placeholder="— leave empty to skip —" autocomplete="off">
    </div>
  `;
}

function openLiveCrudModal(action, rowId) {
  const overlay = document.getElementById('liveCrudFormModal');
  const titleEl = document.getElementById('lcModalTitle');
  const subtitleEl = document.getElementById('lcModalSubtitle');
  const iconEl = document.getElementById('lcModalIcon');
  const grid = document.getElementById('lcDynamicFieldsGrid');
  const idInput = document.getElementById('lcRecordId');
  const actionInput = document.getElementById('lcRecordAction');
  const statusMsg = document.getElementById('lcModalStatusMsg');
  if (!overlay || !grid) return;

  const sampleFallback = liveCrudCurrentTable === 'transactions'
    ? { type: 'spent', amount: 0, client_payee: '', category: 'other', mode: 'Cash', note: '', txn_date: (typeof getTodayDateString === 'function' ? getTodayDateString() : '') }
    : (liveCrudCurrentTable === 'personal_transactions'
      ? { type: 'personal_spent', amount: 0, category: 'other', note: '', txn_date: (typeof getTodayDateString === 'function' ? getTodayDateString() : '') }
      : null);

  const row = action === 'edit'
    ? liveCrudRows.find(r => String(r.id) === String(rowId))
    : (liveCrudRows[0] || sampleFallback);

  if (action === 'insert' && !row) {
    alert(`The "${liveCrudCurrentTable}" table is empty, so its column layout is unknown.\n\nAdd the first row via the full "Supabase DB Manager" tab, then Insert will work here too.`);
    return;
  }
  if (action === 'edit' && !row) {
    alert('Could not find that row. Please refresh and try again.');
    return;
  }

  const columns = getLiveCrudEditableColumns(row);
  grid.innerHTML = columns.map(k => buildLiveCrudFieldHtml(k, action === 'edit' ? row[k] : null)).join('');

  if (titleEl) titleEl.textContent = action === 'edit' ? `Edit Row — ${liveCrudCurrentTable}` : `Insert Row — ${liveCrudCurrentTable}`;
  if (subtitleEl) subtitleEl.textContent = action === 'edit'
    ? 'Change field values and save. Empty fields are left unchanged.'
    : 'Fill in values for the new row. Empty fields are skipped.';
  if (iconEl) iconEl.textContent = action === 'edit' ? '✏️' : '➕';
  if (idInput) idInput.value = action === 'edit' ? String(row.id) : '';
  if (actionInput) actionInput.value = action;
  if (statusMsg) { statusMsg.textContent = ''; statusMsg.className = 'update-status-msg'; }

  overlay.classList.remove('hidden');
}

function closeLiveCrudModal() {
  const overlay = document.getElementById('liveCrudFormModal');
  if (overlay) overlay.classList.add('hidden');
}

async function handleLiveCrudFormSubmit(event) {
  if (event && event.preventDefault) event.preventDefault();
  const actionInput = document.getElementById('lcRecordAction');
  const idInput = document.getElementById('lcRecordId');
  const statusMsg = document.getElementById('lcModalStatusMsg');
  const submitBtn = document.getElementById('lcModalSubmitBtn');
  const action = actionInput ? actionInput.value : 'edit';
  const rowId = idInput ? idInput.value : '';

  // Collect filled fields only — empty means "leave unchanged" (edit) / "skip" (insert)
  const payload = {};
  document.querySelectorAll('#lcDynamicFieldsGrid input[data-lc-column]').forEach(input => {
    const col = input.getAttribute('data-lc-column');
    const raw = (input.value || '').trim();
    if (raw === '') return;
    payload[col] = input.type === 'number' ? (raw === '' ? null : Number(raw)) : raw;
  });

  if (Object.keys(payload).length === 0) {
    if (statusMsg) {
      statusMsg.textContent = '⚠️ Please fill at least one field before saving.';
      statusMsg.className = 'update-status-msg error';
    }
    return false;
  }

  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = '⏳ Saving…'; }
  if (statusMsg) { statusMsg.textContent = ''; statusMsg.className = 'update-status-msg'; }

  // Sync to local memory & storage for transactions & personal_transactions
  if (liveCrudCurrentTable === 'transactions') {
    if (action === 'edit') {
      const idx = allPaisaTransactions.findIndex(t => String(t.id) === String(rowId));
      if (idx !== -1) {
        if (payload.amount !== undefined) allPaisaTransactions[idx].amount = Number(payload.amount);
        if (payload.type !== undefined) allPaisaTransactions[idx].type = payload.type;
        if (payload.client_payee !== undefined) allPaisaTransactions[idx].client_payee = payload.client_payee;
        if (payload.category !== undefined) allPaisaTransactions[idx].category = payload.category;
        if (payload.mode !== undefined) allPaisaTransactions[idx].payment_mode = payload.mode;
        if (payload.note !== undefined) allPaisaTransactions[idx].note = payload.note;
        if (payload.txn_date !== undefined) allPaisaTransactions[idx].date = payload.txn_date;
      }
    } else {
      const newTx = {
        id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        type: payload.type || 'spent',
        amount: Number(payload.amount) || 0,
        client_payee: payload.client_payee || '',
        category: payload.category || '',
        payment_mode: payload.mode || 'Cash',
        date: payload.txn_date || (typeof getTodayDateString === 'function' ? getTodayDateString() : ''),
        note: payload.note || '',
        created_at: new Date().toISOString()
      };
      allPaisaTransactions.unshift(newTx);
    }
    savePaisaTransactions(true);
  } else if (liveCrudCurrentTable === 'personal_transactions') {
    if (action === 'edit') {
      const idx = allPersonalTransactions.findIndex(t => String(t.id) === String(rowId));
      if (idx !== -1) {
        if (payload.amount !== undefined) allPersonalTransactions[idx].amount = Number(payload.amount);
        if (payload.type !== undefined) allPersonalTransactions[idx].type = payload.type;
        if (payload.category !== undefined) allPersonalTransactions[idx].category = payload.category;
        if (payload.note !== undefined) allPersonalTransactions[idx].note = payload.note;
        if (payload.txn_date !== undefined) allPersonalTransactions[idx].date = payload.txn_date;
      }
    } else {
      const newPTx = {
        id: 'ptx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        type: payload.type || 'personal_spent',
        amount: Number(payload.amount) || 0,
        category: payload.category || '',
        note: payload.note || '',
        date: payload.txn_date || (typeof getTodayDateString === 'function' ? getTodayDateString() : ''),
        created_at: new Date().toISOString()
      };
      allPersonalTransactions.unshift(newPTx);
    }
    savePersonalData(true);
  }

  try {
    let error = null;
    if (action === 'edit') {
      ({ error } = await supabaseClient.from(liveCrudCurrentTable).update(payload).eq('id', rowId));
    } else {
      ({ error } = await supabaseClient.from(liveCrudCurrentTable).insert([payload]));
    }
    if (error) throw error;

    closeLiveCrudModal();
    await fetchLiveCrudRows();
    await performPostCrudRefresh({ toast: `💾 ${action === 'edit' ? 'Row updated' : 'Row inserted'} in ${liveCrudCurrentTable}` });
  } catch (err) {
    console.error('Live CRUD save error:', err);
    if (liveCrudCurrentTable === 'transactions' || liveCrudCurrentTable === 'personal_transactions') {
      closeLiveCrudModal();
      await fetchLiveCrudRows();
      await performPostCrudRefresh({ toast: `💾 Saved locally (Supabase RLS active for anon)` });
      return false;
    }
    if (statusMsg) {
      statusMsg.textContent = '⚠️ Save failed: ' + (err.message || 'Unknown error');
      statusMsg.className = 'update-status-msg error';
    }
  } finally {
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = '💾 Save to Database'; }
  }
  return false;
}

async function deleteLiveCrudRow(rowId, headline) {
  if (!rowId) return;
  const ok = confirm(`🗑️ Delete this row permanently from "${liveCrudCurrentTable}"?\n\n${headline}\n\nThis cannot be undone.`);
  if (!ok) return;

  if (liveCrudCurrentTable === 'transactions') {
    allPaisaTransactions = allPaisaTransactions.filter(t => String(t.id) !== String(rowId));
    savePaisaTransactions(true);
  } else if (liveCrudCurrentTable === 'personal_transactions') {
    allPersonalTransactions = allPersonalTransactions.filter(t => String(t.id) !== String(rowId));
    savePersonalData(true);
  }

  try {
    const { error } = await supabaseClient.from(liveCrudCurrentTable).delete().eq('id', rowId);
    if (error) throw error;
    await fetchLiveCrudRows();
    await performPostCrudRefresh({ toast: `🗑️ Row deleted from ${liveCrudCurrentTable}` });
  } catch (err) {
    console.error('Live CRUD delete error:', err);
    if (liveCrudCurrentTable === 'transactions' || liveCrudCurrentTable === 'personal_transactions') {
      await fetchLiveCrudRows();
      await performPostCrudRefresh({ toast: `🗑️ Row deleted locally (Supabase RLS active for anon)` });
      return;
    }
    alert('⚠️ Delete failed: ' + (err.message || 'Unknown error'));
  }
}

window.initLiveCrudTab = initLiveCrudTab;
window.openLiveCrudModal = openLiveCrudModal;
window.closeLiveCrudModal = closeLiveCrudModal;
window.handleLiveCrudFormSubmit = handleLiveCrudFormSubmit;
window.deleteLiveCrudRow = deleteLiveCrudRow;


window.renderSearchCourtFilterOptions = renderSearchCourtFilterOptions;
window.filterCaseTables = filterCaseTables;

/* ==============================================================================
   Progressive Web App (PWA) & Mobile Installation Management
   ============================================================================== */
let deferredInstallPrompt = null;

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

window.triggerPwaInstall = triggerPwaInstall;
window.openPwaGuideModal = openPwaGuideModal;
window.closePwaGuideModal = closePwaGuideModal;

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

window.toggleMobileFilterDrawer = toggleMobileFilterDrawer;
window.updateMobileFilterBadges = updateMobileFilterBadges;
window.openMobileFilterDrawer = openMobileFilterDrawer;
window.closeMobileFilterDrawer = closeMobileFilterDrawer;
// ==============================================================================
// Chambers Earning & Expense Manager Subsystem (Chambers Accounts & Khata)
// ==============================================================================

let allAccountRecords = [];
let accountsDateFilter = 'today';
let accountsCustomDate = '';
let accountsSearchQuery = '';
let accountsCategoryFilter = '';
let accountsWorkStatusFilter = '';
let accountsViewMode = (typeof localStorage !== 'undefined' && localStorage.getItem('cmAccountsViewMode')) || 'cards';
let accountsListenersWired = false;

function setAccountsViewMode(mode) {
  accountsViewMode = mode === 'table' ? 'table' : 'cards';
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cmAccountsViewMode', accountsViewMode);
    }
  } catch (e) {}
  updateAccountsViewModeUI();
}

function updateAccountsViewModeUI() {
  const cardsContainer = document.getElementById('accountsCardsContainer');
  const tableContainer = document.getElementById('accountsTableContainer');
  const btnCards = document.getElementById('btnAccountsViewCards');
  const btnTable = document.getElementById('btnAccountsViewTable');

  if (accountsViewMode === 'table') {
    if (cardsContainer) cardsContainer.style.display = 'none';
    if (tableContainer) tableContainer.style.display = 'block';
    if (btnCards) btnCards.classList.remove('active');
    if (btnTable) btnTable.classList.add('active');
  } else {
    if (cardsContainer) cardsContainer.style.display = 'block';
    if (tableContainer) tableContainer.style.display = 'none';
    if (btnCards) btnCards.classList.add('active');
    if (btnTable) btnTable.classList.remove('active');
  }
}

function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getAccountsDateString(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatCurrencyINR(amount) {
  const num = parseFloat(amount) || 0;
  return '₹' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const DEFAULT_SEED_ACCOUNTS = [
  {
    id: 'acc_seed_1',
    entry_date: getTodayDateString(),
    entry_type: 'job',
    client_name: 'Client A',
    client_phone: '9876543210',
    case_number: 'CS.371/2025',
    work_title: 'Certified copy of order sheet',
    category: 'certified_copy',
    amount_received: 500,
    amount_spent: 120,
    net_saving: 380,
    payment_mode: 'Cash',
    payment_status: 'Completed',
    work_status: 'Completed',
    work_completed_date: getTodayDateString(),
    notes: 'Urgent certified copy inspected & delivered',
    created_at: new Date().toISOString()
  },
  {
    id: 'acc_seed_2',
    entry_date: getTodayDateString(),
    entry_type: 'job',
    client_name: 'Client 1',
    client_phone: '9811223344',
    case_number: 'CR.129/2026',
    work_title: 'Vakalatnama & Court fee stamp',
    category: 'court_fee',
    amount_received: 100,
    amount_spent: 20,
    net_saving: 80,
    payment_mode: 'UPI',
    payment_status: 'Completed',
    work_status: 'Completed',
    work_completed_date: getTodayDateString(),
    notes: 'Vakalatnama court fee filed',
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'acc_seed_3',
    entry_date: getTodayDateString(),
    entry_type: 'income',
    client_name: 'Client 2',
    client_phone: '9988776655',
    case_number: '',
    work_title: 'Legal consultation & drafting',
    category: 'advocate_fee',
    amount_received: 300,
    amount_spent: 0,
    net_saving: 300,
    payment_mode: 'Cash',
    payment_status: 'Completed',
    work_status: 'Completed',
    work_completed_date: getTodayDateString(),
    notes: 'Chamber legal consultation (1 hour)',
    created_at: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'acc_seed_4',
    entry_date: getTodayDateString(),
    entry_type: 'expense',
    client_name: 'Chambers Expense',
    client_phone: '',
    case_number: '',
    work_title: 'Chamber Tea & Typing paper ream',
    category: 'office_expense',
    amount_received: 0,
    amount_spent: 80,
    net_saving: -80,
    payment_mode: 'Cash',
    payment_status: 'Completed',
    work_status: 'Completed',
    work_completed_date: getTodayDateString(),
    notes: 'Chamber hospitality & stationery',
    created_at: new Date(Date.now() - 10800000).toISOString()
  },
  {
    id: 'acc_seed_5',
    entry_date: getTodayDateString(),
    entry_type: 'job',
    client_name: 'Client B',
    client_phone: '9822334455',
    case_number: 'CA.54/2026',
    work_title: 'Certified copy of order dated 15-09-2026',
    category: 'certified_copy',
    amount_received: 600,
    amount_spent: 140,
    net_saving: 460,
    payment_mode: 'Cash',
    payment_status: 'Completed',
    work_status: 'Pending',
    work_completed_date: '',
    notes: 'Applied in copying agency; awaiting certified copy issuance',
    created_at: new Date(Date.now() - 1800000).toISOString()
  }
];

function loadAccountsFromStorage() {
  try {
    const raw = safeStorage.get('cmChambersAccounts');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        allAccountRecords = parsed;
        return;
      }
    }
  } catch (e) {
    console.warn('Error reading cmChambersAccounts:', e);
  }
  allAccountRecords = [...DEFAULT_SEED_ACCOUNTS];
  saveAccountsLocally();
}

function saveAccountsLocally() {
  try {
    safeStorage.set('cmChambersAccounts', JSON.stringify(allAccountRecords));
  } catch (e) {
    console.warn('Error saving cmChambersAccounts:', e);
  }
}

function isAccountUuid(id) {
  return typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

async function syncAccountsWithSupabase() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient
      .from('chambers_accounts')
      .select('*')
      .order('entry_date', { ascending: false });

    if (!error && Array.isArray(data)) {
      const badge = document.getElementById('accountsCloudStatusBadge');

      if (data.length > 0) {
        allAccountRecords = data.map(r => ({
          id: String(r.id),
          entry_date: r.entry_date || getTodayDateString(),
          entry_type: r.entry_type || 'job',
          client_name: r.client_name || 'Client',
          client_phone: r.client_phone || '',
          case_number: r.case_number || '',
          work_title: r.work_title || '',
          category: r.category || 'certified_copy',
          amount_received: parseFloat(r.amount_received) || 0,
          amount_spent: parseFloat(r.amount_spent) || 0,
          net_saving: (parseFloat(r.amount_received) || 0) - (parseFloat(r.amount_spent) || 0),
          payment_mode: r.payment_mode || 'Cash',
          payment_status: r.payment_status || 'Completed',
          work_status: r.work_status || 'Pending',
          work_completed_date: r.work_completed_date || '',
          notes: r.notes || '',
          created_at: r.created_at || new Date().toISOString()
        }));
        saveAccountsLocally();
        if (badge) {
          badge.textContent = '🟢 Cloud Synced (' + data.length + ' rows)';
          badge.className = 'db-live-badge connected';
        }
      } else if (allAccountRecords && allAccountRecords.length > 0) {
        // Freshly created Supabase table: seed remote table with existing local transactions
        try {
          const payload = allAccountRecords.map(r => ({
            entry_date: r.entry_date || getTodayDateString(),
            entry_type: r.entry_type || 'job',
            client_name: r.client_name || 'Client',
            client_phone: r.client_phone || '',
            case_number: r.case_number || '',
            work_title: r.work_title || '',
            category: r.category || 'certified_copy',
            amount_received: parseFloat(r.amount_received) || 0,
            amount_spent: parseFloat(r.amount_spent) || 0,
            payment_mode: r.payment_mode || 'Cash',
            payment_status: r.payment_status || 'Completed',
            work_status: r.work_status || 'Pending',
            work_completed_date: r.work_completed_date || null,
            notes: r.notes || ''
          }));
          const { data: insertedData, error: insertErr } = await supabaseClient
            .from('chambers_accounts')
            .insert(payload)
            .select();

          if (!insertErr && Array.isArray(insertedData) && insertedData.length > 0) {
            allAccountRecords = insertedData.map(r => ({
              id: String(r.id),
              entry_date: r.entry_date || getTodayDateString(),
              entry_type: r.entry_type || 'job',
              client_name: r.client_name || 'Client',
              client_phone: r.client_phone || '',
              case_number: r.case_number || '',
              work_title: r.work_title || '',
              category: r.category || 'certified_copy',
              amount_received: parseFloat(r.amount_received) || 0,
              amount_spent: parseFloat(r.amount_spent) || 0,
              net_saving: (parseFloat(r.amount_received) || 0) - (parseFloat(r.amount_spent) || 0),
              payment_mode: r.payment_mode || 'Cash',
              payment_status: r.payment_status || 'Completed',
              work_status: r.work_status || 'Pending',
              work_completed_date: r.work_completed_date || '',
              notes: r.notes || '',
              created_at: r.created_at || new Date().toISOString()
            }));
            saveAccountsLocally();
            if (badge) {
              badge.textContent = '🟢 Cloud Synced (' + allAccountRecords.length + ' rows)';
              badge.className = 'db-live-badge connected';
            }
          }
        } catch (uploadErr) {
          console.warn('Initial accounts upload notice:', uploadErr);
        }
      } else {
        if (badge) {
          badge.textContent = '🟢 Cloud Synced (0 rows)';
          badge.className = 'db-live-badge connected';
        }
      }
      updateAccountsBadgesAndShortcut();
      if (currentActiveTabId === 'accounts') {
        renderAccountsTab();
      }
    } else if (error) {
      console.log('Notice: chambers_accounts table not yet available in Supabase, using offline local storage.');
      const badge = document.getElementById('accountsCloudStatusBadge');
      if (badge) {
        badge.textContent = '🟡 Local Mode (Ready to Sync)';
        badge.className = 'db-live-badge';
      }
    }
  } catch (err) {
    console.warn('Supabase accounts sync notice:', err);
  }
}

function initAccountsTab() {
  ensureAllCasesHaveParties();
  loadAccountsFromStorage();
  populateAccountCaseDropdown();
  wireAccountsEventListeners();
  updateAccountsViewModeUI();
  updateAccountsBadgesAndShortcut();
  if (currentActiveTabId === 'accounts') {
    renderAccountsTab();
  }
}

function wireAccountsEventListeners() {
  if (accountsListenersWired) return;
  accountsListenersWired = true;

  const dateInput = document.getElementById('accountEntryDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = getTodayDateString();
  }

  const customDateInput = document.getElementById('accountsCustomDateInput');
  if (customDateInput && !customDateInput.value) {
    customDateInput.value = getTodayDateString();
  }

  if (accountsDateFilter === 'custom' && accountsCustomDate) {
    const labelEl = document.getElementById('accountsCustomDateLabel');
    if (labelEl) labelEl.textContent = formatDateDMY(accountsCustomDate);
  }
}

function populateAccountCaseDropdown() {
  const select = document.getElementById('accountCaseSelect');
  if (!select) return;

  const currentVal = select.value;
  let html = '<option value="">-- No specific case linked / Ad-hoc work --</option>';

  const sortedCases = [...(allCaseRecords || [])].sort((a, b) => {
    const na = (a.caseNo || '').toLowerCase();
    const nb = (b.caseNo || '').toLowerCase();
    return na.localeCompare(nb);
  });

  sortedCases.forEach(c => {
    const no = c.caseNo || c.criminalCaseNumber || '';
    if (!no) return;
    const name = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : '');
    const client = c.clientName || c.client || '';
    const label = `${no}${name ? ' — ' + name : ''}${client ? ' (' + client + ')' : ''}`;
    html += `<option value="${escapeHtml(no)}">${escapeHtml(label)}</option>`;
  });

  select.innerHTML = html;
  if (currentVal) select.value = currentVal;
}

function handleAccountCaseSelect(caseNo) {
  if (!caseNo) return;
  const match = (allCaseRecords || []).find(c => {
    const num = (c.caseNo || c.criminalCaseNumber || '').trim().toLowerCase();
    return num === caseNo.trim().toLowerCase();
  });

  if (match) {
    const clientNameInput = document.getElementById('accountClientName');
    const clientPhoneInput = document.getElementById('accountClientPhone');
    const cName = match.clientName || match.client || match.plaintiff || match.victimName || '';
    const cPhone = match.clientNumber || match.clientPhone || '';

    if (clientNameInput && (!clientNameInput.value || clientNameInput.value === 'Client A' || clientNameInput.value === 'Client 1' || clientNameInput.value === 'Client 2')) {
      if (cName) clientNameInput.value = cName;
    }
    if (clientPhoneInput && !clientPhoneInput.value) {
      if (cPhone) clientPhoneInput.value = cPhone;
    }
  }
}

// ==============================================================================
// Smart Case Suggestion & Live Fuzzy Search
// ==============================================================================

let smartCaseSuggestionsCache = [];
let smartCaseActiveIndex = -1;

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

function getAccountCategoryBadge(category) {
  const map = {
    'certified_copy': { label: 'Certified Copy', bg: '#eff6ff', color: '#1d4ed8' },
    'court_fee': { label: 'Court Fee & Stamps', bg: '#ecfdf5', color: '#047857' },
    'bail_bond': { label: 'Bail Bond', bg: '#fef3c7', color: '#b45309' },
    'drafting': { label: 'Drafting & Pleading', bg: '#f3e8ff', color: '#7e22ce' },
    'advocate_fee': { label: 'Advocate Fee', bg: '#e0e7ff', color: '#4338ca' },
    'clerkage': { label: 'Munshi Clerkage', bg: '#f1f5f9', color: '#475569' },
    'typing_xerox': { label: 'Typing & Photocopy', bg: '#fef2f2', color: '#b91c1c' },
    'travel': { label: 'Travel & Process', bg: '#fff7ed', color: '#c2410c' },
    'office_expense': { label: 'Chamber Office/Tea', bg: '#fdf4ff', color: '#a21caf' },
    'miscellaneous': { label: 'Miscellaneous', bg: '#f8fafc', color: '#64748b' }
  };
  const c = map[category] || { label: category || 'General', bg: '#f1f5f9', color: '#475569' };
  return `<span style="display:inline-block; font-size:11px; font-weight:600; padding:2px 8px; border-radius:12px; background:${c.bg}; color:${c.color}; border:1px solid ${c.color}33;">${escapeHtml(c.label)}</span>`;
}

function getAccountCategoryLabel(category) {
  const map = {
    'certified_copy': 'Certified Copy',
    'court_fee': 'Court Fee & Stamps',
    'bail_bond': 'Bail Bond / Sureties',
    'drafting': 'Drafting & Pleading',
    'advocate_fee': 'Advocate Fee / Consultation',
    'clerkage': 'Munshi Clerkage',
    'typing_xerox': 'Typing & Photocopy',
    'travel': 'Travel & Process',
    'office_expense': 'Chamber Tea & Office',
    'miscellaneous': 'Miscellaneous'
  };
  return map[category] || category || 'General';
}

function toggleAccountWorkStatus(id) {
  const item = (allAccountRecords || []).find(a => String(a.id) === String(id));
  if (!item) return;

  const willBeCompleted = (item.work_status || 'Pending') !== 'Completed';
  item.work_status = willBeCompleted ? 'Completed' : 'Pending';
  item.work_completed_date = willBeCompleted ? getTodayDateString() : '';
  item.updated_at = new Date().toISOString();

  saveAccountsLocally();
  renderAccountsTab();

  if (supabaseClient && isAccountUuid(id)) {
    supabaseClient.from('chambers_accounts').update({
      work_status: item.work_status,
      work_completed_date: item.work_completed_date || null
    }).eq('id', id).then(({ error }) => {
      if (error) console.warn('Notice updating supabase work_status:', error);
    }).catch(e => console.warn('Supabase work_status notice:', e));
  }
}

function handleAccountWorkStatusChange(val) {
  const dateInput = document.getElementById('accountWorkCompletedDate');
  if (dateInput) {
    if (val === 'Completed') {
      if (!dateInput.value) dateInput.value = getTodayDateString();
    } else {
      dateInput.value = '';
    }
  }
}

function renderAccountsTab() {
  const filtered = getFilteredAccountRecords();
  const periodLabel = getAccountsPeriodLabel();

  // Financial calculations
  const totalInflow = filtered.reduce((s, r) => s + (parseFloat(r.amount_received) || 0), 0);
  const totalOutflow = filtered.reduce((s, r) => s + (parseFloat(r.amount_spent) || 0), 0);
  const netSavings = totalInflow - totalOutflow;
  const count = filtered.length;
  const payerCount = filtered.filter(r => (parseFloat(r.amount_received) || 0) > 0).length;
  const marginPct = totalInflow > 0 ? ((netSavings / totalInflow) * 100).toFixed(1) : '0.0';

  const pendingWorkCount = filtered.filter(r => (r.work_status || 'Pending') !== 'Completed').length;
  const completedWorkCount = filtered.filter(r => (r.work_status || 'Pending') === 'Completed').length;

  // Update KPI Cards
  const kpiInflow = document.getElementById('accountsKpiInflow');
  const kpiOutflow = document.getElementById('accountsKpiOutflow');
  const kpiSavings = document.getElementById('accountsKpiSavings');
  const kpiCount = document.getElementById('accountsKpiCount');
  const kpiInflowSub = document.getElementById('accountsKpiInflowSub');
  const kpiOutflowSub = document.getElementById('accountsKpiOutflowSub');
  const kpiSavingsSub = document.getElementById('accountsKpiSavingsSub');
  const kpiPeriodText = document.getElementById('accountsKpiPeriodText');

  if (kpiInflow) kpiInflow.textContent = formatCurrencyINR(totalInflow);
  if (kpiOutflow) kpiOutflow.textContent = formatCurrencyINR(totalOutflow);
  if (kpiSavings) {
    kpiSavings.textContent = (netSavings < 0 ? '-' : '') + formatCurrencyINR(Math.abs(netSavings));
    kpiSavings.style.color = netSavings < 0 ? '#be123c' : '#047857';
  }
  if (kpiCount) kpiCount.textContent = String(count);
  if (kpiInflowSub) kpiInflowSub.textContent = `From ${payerCount} client payment(s)`;
  if (kpiOutflowSub) kpiOutflowSub.textContent = `Court fees, stamps, typing, etc.`;
  if (kpiSavingsSub) {
    kpiSavingsSub.textContent = `Savings Margin: ${marginPct}%`;
    kpiSavingsSub.style.color = netSavings < 0 ? '#be123c' : '#059669';
  }
  if (kpiPeriodText) kpiPeriodText.textContent = `Showing: ${periodLabel}`;

  // Update Table/Cards Titles
  const tableTitle = document.getElementById('accountsLedgerTableTitle');
  const countText = document.getElementById('accountsLedgerCountText');
  if (tableTitle) tableTitle.textContent = `📋 Transactions Ledger (${periodLabel})`;
  if (countText) {
    countText.textContent = `Showing ${count} transaction(s) • ${pendingWorkCount} Pending Work • ${completedWorkCount} Done`;
  }

  // 1. Render Cards Grid View (Primary/Default)
  const cardsGrid = document.getElementById('accountsCardsGrid');
  if (cardsGrid) {
    if (count === 0) {
      cardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: #94a3b8; background: #ffffff; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <i class="fa-solid fa-receipt" style="font-size: 38px; opacity: 0.5; margin-bottom: 12px; color: #64748b;"></i>
          <h5 style="margin: 0 0 6px 0; color: #475569; font-size: 15px; font-weight: 600;">No transactions recorded for ${escapeHtml(periodLabel)}</h5>
          <p style="margin: 0 0 16px 0; font-size: 13px; color: #94a3b8;">Click "Record Transaction" above to add client fees or work expenses.</p>
          <button type="button" class="primary-btn" onclick="openAddAccountModal('job')" style="display: inline-flex; align-items: center; gap: 6px; font-size: 12px; padding: 7px 16px;">
            <i class="fa-solid fa-plus"></i> Add Transaction Now
          </button>
        </div>
      `;
    } else {
      cardsGrid.innerHTML = filtered.map((r, idx) => {
        const net = (parseFloat(r.amount_received) || 0) - (parseFloat(r.amount_spent) || 0);
        const isNegative = net < 0;
        const entryType = r.entry_type || 'job';
        const natureText = entryType === 'income' ? 'Fee' : (entryType === 'expense' ? 'Chamber Exp' : 'Work + Exp');
        const categoryLabel = getAccountCategoryLabel(r.category);

        const isWorkDone = (r.work_status || 'Pending') === 'Completed';
        const doneDateStr = r.work_completed_date ? formatDateDMY(r.work_completed_date) : '';

        const amountRec = parseFloat(r.amount_received) || 0;
        const amountSp = parseFloat(r.amount_spent) || 0;
        const amountRecFormatted = amountRec.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const amountSpFormatted = amountSp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const amountNetFormatted = Math.abs(net).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        return `
          <div class="account-card ${isWorkDone ? 'card-completed' : 'card-pending'}" id="accountCard_${escapeHtml(r.id)}">
            <!-- Top Row: Client, Case, Date & Status -->
            <div class="account-card-header">
              <div class="account-card-client-wrap">
                <span class="account-client-name" title="${escapeHtml(r.client_name)}">${escapeHtml(r.client_name)}</span>
                ${r.client_phone ? `
                  <a href="tel:${escapeHtml(r.client_phone)}" class="account-phone-link" title="Call client">
                    <i class="fa-solid fa-phone"></i> ${escapeHtml(r.client_phone)}
                  </a>
                ` : ''}
                ${r.case_number ? `
                  <span class="account-case-badge" title="Linked Case">
                    <i class="fa-solid fa-scale-balanced"></i> ${escapeHtml(r.case_number)}
                  </span>
                ` : ''}
              </div>
              <div class="account-card-meta-right">
                <span class="account-card-date">
                  <i class="fa-regular fa-calendar"></i> ${escapeHtml(formatDateDMY(r.entry_date))}
                </span>
                <span class="account-status-pill ${isWorkDone ? 'completed' : 'pending'}">
                  <i class="${isWorkDone ? 'fa-solid fa-circle-check' : 'fa-regular fa-clock'}"></i>
                  ${isWorkDone ? (doneDateStr ? `Done (${escapeHtml(doneDateStr)})` : 'Done') : 'Pending'}
                </span>
              </div>
            </div>

            <!-- Middle Row: Work Description, Nature & Category Tags -->
            <div class="account-card-body">
              <div class="account-work-line">
                <span class="account-badge-nature ${escapeHtml(entryType)}">${escapeHtml(natureText)}</span>
                <span class="account-badge-category">${escapeHtml(categoryLabel)}</span>
                <span class="account-work-title-text">${escapeHtml(r.work_title)}</span>
              </div>
              ${r.notes ? `
                <div class="account-work-note">
                  <i class="fa-regular fa-comment-dots"></i> ${escapeHtml(r.notes)}
                </div>
              ` : ''}
            </div>

            <!-- Bottom Row: Financial Summary & Clean Action Buttons -->
            <div class="account-card-footer">
              <div class="account-financial-strip">
                ${entryType === 'income' ? `
                  <div class="account-fin-item fin-inflow">
                    <span class="fin-lbl">Fee Received</span>
                    <span class="fin-val">+₹${amountRecFormatted}</span>
                  </div>
                ` : entryType === 'expense' ? `
                  <div class="account-fin-item fin-outflow">
                    <span class="fin-lbl">Expense</span>
                    <span class="fin-val">−₹${amountSpFormatted}</span>
                  </div>
                ` : `
                  <div class="account-fin-item fin-inflow">
                    <span class="fin-lbl">Recv</span>
                    <span class="fin-val">+₹${amountRecFormatted}</span>
                  </div>
                  <span class="fin-dot">•</span>
                  <div class="account-fin-item fin-outflow">
                    <span class="fin-lbl">Spent</span>
                    <span class="fin-val">−₹${amountSpFormatted}</span>
                  </div>
                  <span class="fin-dot">•</span>
                  <div class="account-fin-item fin-net ${isNegative ? 'negative' : 'positive'}">
                    <span class="fin-lbl">Net</span>
                    <span class="fin-val">${isNegative ? '−' : '+'}₹${amountNetFormatted}</span>
                  </div>
                `}
                <span class="account-pay-mode-tag" title="Payment Mode & Status">
                  <i class="fa-regular fa-credit-card"></i> ${escapeHtml(r.payment_mode || 'Cash')}${r.payment_status && r.payment_status !== 'Completed' ? ` (${escapeHtml(r.payment_status)})` : ''}
                </span>
              </div>

              <div class="account-actions-strip">
                <button type="button" class="btn-clean-action btn-wa" onclick="sendClientTransactionWhatsApp('${escapeHtml(r.id)}')" title="Send WhatsApp Receipt to Client">
                  <i class="fa-brands fa-whatsapp"></i> <span>Receipt</span>
                </button>
                <button type="button" class="btn-clean-action ${isWorkDone ? 'btn-reopen' : 'btn-done'}" onclick="toggleAccountWorkStatus('${escapeHtml(r.id)}')" title="${isWorkDone ? 'Click to mark as Pending' : 'Click to mark as Completed'}">
                  <i class="${isWorkDone ? 'fa-solid fa-rotate-left' : 'fa-solid fa-check'}"></i> <span>${isWorkDone ? 'Reopen' : 'Mark Done'}</span>
                </button>
                <button type="button" class="btn-clean-icon edit" onclick="editAccountTransaction('${escapeHtml(r.id)}')" title="Edit Transaction">
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="btn-clean-icon delete" onclick="deleteAccountTransaction('${escapeHtml(r.id)}')" title="Delete Transaction">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // 2. Render Table Body (Secondary/Compact view)
  const tbody = document.getElementById('accountsTransactionsTbody');
  if (tbody) {
    if (count === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="accounts-empty-state">
            <div style="padding: 40px 20px; text-align: center; color: #94a3b8;">
              <i class="fa-solid fa-receipt" style="font-size: 38px; opacity: 0.5; margin-bottom: 12px; color: #64748b;"></i>
              <h5 style="margin: 0 0 6px 0; color: #475569; font-size: 15px; font-weight: 600;">No transactions recorded for ${escapeHtml(periodLabel)}</h5>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #94a3b8;">Click "Record Transaction" above to add client fees or work expenses.</p>
              <button type="button" class="primary-btn" onclick="openAddAccountModal('job')" style="display: inline-flex; align-items: center; gap: 6px; font-size: 12px; padding: 7px 16px;">
                <i class="fa-solid fa-plus"></i> Add Transaction Now
              </button>
            </div>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = filtered.map((r, idx) => {
        const net = (parseFloat(r.amount_received) || 0) - (parseFloat(r.amount_spent) || 0);
        const isNegative = net < 0;
        const naturePill = r.entry_type === 'income' 
          ? '<span style="font-size:9.5px; padding:1px 6px; border-radius:10px; background:#dcfce7; color:#166534; font-weight:700; text-transform:uppercase;">Fee</span>'
          : (r.entry_type === 'expense' 
              ? '<span style="font-size:9.5px; padding:1px 6px; border-radius:10px; background:#fee2e2; color:#991b1b; font-weight:700; text-transform:uppercase;">Chamber Exp</span>'
              : '<span style="font-size:9.5px; padding:1px 6px; border-radius:10px; background:#e0e7ff; color:#3730a3; font-weight:700; text-transform:uppercase;">Job + Exp</span>');

        const isWorkDone = (r.work_status || 'Pending') === 'Completed';
        const doneDateStr = r.work_completed_date ? formatDateDMY(r.work_completed_date) : '';
        const workStatusHtml = isWorkDone
          ? `
            <div>
              <span class="work-status-badge completed" title="Work is Completed">
                <i class="fa-solid fa-circle-check"></i> Done
              </span>
              ${doneDateStr ? `<div class="work-completed-date-sub" title="Completed on ${escapeHtml(doneDateStr)}"><i class="fa-solid fa-calendar-check"></i> Done: ${escapeHtml(doneDateStr)}</div>` : ''}
              <div>
                <button type="button" class="work-toggle-btn btn-reopen" onclick="toggleAccountWorkStatus('${escapeHtml(r.id)}')" title="Click to re-open as Pending">
                  <i class="fa-solid fa-rotate-left"></i> Reopen
                </button>
              </div>
            </div>
          `
          : `
            <div>
              <span class="work-status-badge pending" title="Work is Pending / In Progress">
                <i class="fa-solid fa-clock"></i> In Progress
              </span>
              <div>
                <button type="button" class="work-toggle-btn btn-mark-done" onclick="toggleAccountWorkStatus('${escapeHtml(r.id)}')" title="Click to mark work as Completed on today's date">
                  <i class="fa-solid fa-check"></i> Mark Done
                </button>
              </div>
            </div>
          `;

        return `
          <tr>
            <td style="text-align: center; color: #94a3b8; font-weight: 600; font-size: 11px;">#${idx + 1}</td>
            <td style="font-size: 12px; color: #334155; font-weight: 500; white-space: nowrap;">
              ${escapeHtml(formatDateDMY(r.entry_date))}
            </td>
            <td>
              <div style="font-weight: 700; color: #0f172a; font-size: 13px;">${escapeHtml(r.client_name)}</div>
              ${r.client_phone ? `<div style="font-size: 11px; color: #047857; margin-top: 1px;"><i class="fa-solid fa-phone" style="font-size: 9px;"></i> <a href="tel:${escapeHtml(r.client_phone)}" style="color: #047857; text-decoration: none;">${escapeHtml(r.client_phone)}</a></div>` : ''}
              ${r.case_number ? `<div style="margin-top: 2px;"><span class="badge badge-upcoming" style="font-size: 10px; padding: 1px 6px; border-radius: 4px;"><i class="fa-solid fa-scale-balanced"></i> ${escapeHtml(r.case_number)}</span></div>` : ''}
            </td>
            <td>
              <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                <span style="font-weight: 600; color: #1e293b; font-size: 12.5px;">${escapeHtml(r.work_title)}</span>
                ${naturePill}
              </div>
              ${r.notes ? `<div style="font-size: 11px; color: #64748b; margin-top: 2px; font-style: italic;">${escapeHtml(r.notes)}</div>` : ''}
            </td>
            <td>
              ${getAccountCategoryBadge(r.category)}
            </td>
            <td>
              ${workStatusHtml}
            </td>
            <td>
              <div style="font-size: 12px; font-weight: 600; color: #334155;">${escapeHtml(r.payment_mode || 'Cash')}</div>
              <span class="badge ${r.payment_status === 'Completed' ? 'badge-disposed' : (r.payment_status === 'Partial' ? 'badge-upcoming' : 'badge-undated')}" style="font-size: 10px; padding: 1px 6px;">
                ${escapeHtml(r.payment_status || 'Completed')}
              </span>
            </td>
            <td style="text-align: right; white-space: nowrap;">
              <span class="amount-inflow">+${formatCurrencyINR(r.amount_received)}</span>
            </td>
            <td style="text-align: right; white-space: nowrap;">
              <span class="amount-outflow">-${formatCurrencyINR(r.amount_spent)}</span>
            </td>
            <td style="text-align: right; white-space: nowrap;">
              <span class="amount-saving ${isNegative ? 'negative' : ''}">
                ${isNegative ? '-' : '+'}${formatCurrencyINR(Math.abs(net))}
              </span>
            </td>
            <td style="text-align: center; white-space: nowrap;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
                <button type="button" class="wa-receipt-btn" onclick="sendClientTransactionWhatsApp('${escapeHtml(r.id)}')" title="Send WhatsApp Receipt to Client" aria-label="Send WhatsApp Receipt">
                  <i class="fa-brands fa-whatsapp"></i>
                </button>
                <button type="button" class="table-view-btn edit-case-btn" onclick="editAccountTransaction('${escapeHtml(r.id)}')" title="Edit Transaction" style="padding: 4px 7px; font-size: 11px;">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button type="button" class="table-view-btn delete-case-btn" onclick="deleteAccountTransaction('${escapeHtml(r.id)}')" title="Delete Transaction" style="padding: 4px 7px; font-size: 11px; color: #e11d48; border-color: #fecdd3;">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  updateAccountsViewModeUI();
  updateAccountsBadgesAndShortcut();
}

function updateAccountsBadgesAndShortcut() {
  const todayStr = getTodayDateString();
  const todayAccounts = (allAccountRecords || []).filter(r => (r.entry_date || '').slice(0, 10) === todayStr);

  const todayInflow = todayAccounts.reduce((s, r) => s + (parseFloat(r.amount_received) || 0), 0);
  const todayOutflow = todayAccounts.reduce((s, r) => s + (parseFloat(r.amount_spent) || 0), 0);
  const todayNet = todayInflow - todayOutflow;

  const formattedNet = (todayNet < 0 ? '-' : '') + '₹' + Math.round(Math.abs(todayNet)).toLocaleString('en-IN');

  const navBadge = document.getElementById('accountsNavBadge');
  if (navBadge) {
    navBadge.textContent = formattedNet;
    navBadge.style.background = todayNet < 0 ? '#ef4444' : '#10b981';
  }

  const shortcutEl = document.getElementById('shortcutAccountsToday');
  if (shortcutEl) {
    shortcutEl.textContent = `${formattedNet} Today`;
  }
}

function openAddAccountModal(entryType = 'job') {
  const modal = document.getElementById('accountTransactionModal');
  const form = document.getElementById('accountTransactionForm');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('accountEditId').value = '';
  document.getElementById('accountModalTitle').textContent = 'Record Earning & Work Expense';
  document.getElementById('accountModalSubtitle').textContent = 'Enter client payment, work expense (e.g. certified copy), and net savings.';

  const dateInput = document.getElementById('accountEntryDate');
  if (dateInput) dateInput.value = getTodayDateString();

  populateAccountCaseDropdown();
  setAccountModalEntryType(entryType);

  const optDetails = document.getElementById('accountOptionalDetails');
  if (optDetails) optDetails.open = false;

  const suggContainer = document.getElementById('accountClientSuggestions');
  if (suggContainer) {
    suggContainer.classList.add('hidden');
    suggContainer.innerHTML = '';
  }
  const suggBadge = document.getElementById('accountSuggestedCaseBadge');
  if (suggBadge) {
    suggBadge.classList.add('hidden');
    suggBadge.innerHTML = '';
  }
  smartCaseSuggestionsCache = [];
  smartCaseActiveIndex = -1;

  const workStatusEl = document.getElementById('accountWorkStatus');
  const workCompletedDateEl = document.getElementById('accountWorkCompletedDate');

  if (entryType === 'job') {
    document.getElementById('accountAmountReceived').value = '500';
    document.getElementById('accountAmountSpent').value = '120';
    document.getElementById('accountCategory').value = 'certified_copy';
    document.getElementById('accountWorkTitle').value = 'Certified copy of order sheet';
    if (workStatusEl) workStatusEl.value = 'Pending';
    if (workCompletedDateEl) workCompletedDateEl.value = '';
  } else if (entryType === 'income') {
    document.getElementById('accountAmountReceived').value = '500';
    document.getElementById('accountAmountSpent').value = '0';
    document.getElementById('accountCategory').value = 'advocate_fee';
    document.getElementById('accountWorkTitle').value = 'Legal consultation fee';
    if (workStatusEl) workStatusEl.value = 'Completed';
    if (workCompletedDateEl) workCompletedDateEl.value = getTodayDateString();
  } else if (entryType === 'expense') {
    document.getElementById('accountAmountReceived').value = '0';
    document.getElementById('accountAmountSpent').value = '100';
    document.getElementById('accountCategory').value = 'office_expense';
    document.getElementById('accountWorkTitle').value = 'Chambers tea & stationery';
    if (workStatusEl) workStatusEl.value = 'Completed';
    if (workCompletedDateEl) workCompletedDateEl.value = getTodayDateString();
  }

  updateAccountLivePreview();
  modal.classList.remove('hidden');
}

function closeAccountModal() {
  const modal = document.getElementById('accountTransactionModal');
  if (modal) modal.classList.add('hidden');
  const suggContainer = document.getElementById('accountClientSuggestions');
  if (suggContainer) suggContainer.classList.add('hidden');
}

function setAccountModalEntryType(type) {
  const typeInput = document.getElementById('accountEntryType');
  if (typeInput) typeInput.value = type;

  const pillJob = document.getElementById('accTypePillJob');
  const pillIncome = document.getElementById('accTypePillIncome');
  const pillExpense = document.getElementById('accTypePillExpense');

  if (pillJob) pillJob.classList.toggle('active', type === 'job');
  if (pillIncome) pillIncome.classList.toggle('active', type === 'income');
  if (pillExpense) pillExpense.classList.toggle('active', type === 'expense');

  const recCol = document.getElementById('accReceivedCol');
  const spCol = document.getElementById('accSpentCol');
  const recInput = document.getElementById('accountAmountReceived');
  const spInput = document.getElementById('accountAmountSpent');

  if (type === 'income') {
    if (recCol) recCol.style.display = 'block';
    if (spCol) spCol.style.display = 'none';
    if (spInput) spInput.value = '0';
  } else if (type === 'expense') {
    if (recCol) recCol.style.display = 'none';
    if (spCol) spCol.style.display = 'block';
    if (recInput) recInput.value = '0';
  } else {
    if (recCol) recCol.style.display = 'block';
    if (spCol) spCol.style.display = 'block';
  }

  updateAccountLivePreview();
}

function setAccountQuickWorkTag(title, category) {
  const titleInput = document.getElementById('accountWorkTitle');
  const catInput = document.getElementById('accountCategory');
  if (titleInput) titleInput.value = title;
  if (catInput) catInput.value = category;
}

function updateAccountLivePreview() {
  const recInput = document.getElementById('accountAmountReceived');
  const spInput = document.getElementById('accountAmountSpent');
  const previewRec = document.getElementById('calcPreviewReceived');
  const previewSp = document.getElementById('calcPreviewSpent');
  const previewSav = document.getElementById('calcPreviewSaving');
  const step = document.getElementById('calcPreviewSavingsStep');

  const rec = parseFloat(recInput ? recInput.value : 0) || 0;
  const sp = parseFloat(spInput ? spInput.value : 0) || 0;
  const net = rec - sp;

  if (previewRec) previewRec.textContent = formatCurrencyINR(rec);
  if (previewSp) previewSp.textContent = formatCurrencyINR(sp);
  if (previewSav) {
    previewSav.textContent = (net < 0 ? '-' : '') + formatCurrencyINR(Math.abs(net));
  }

  if (step) {
    if (net < 0) {
      step.style.background = '#ffe4e6';
      step.style.borderColor = '#fda4af';
      step.style.color = '#be123c';
    } else {
      step.style.background = '#d1fae5';
      step.style.borderColor = '#6ee7b7';
      step.style.color = '#047857';
    }
  }
}

async function handleSaveAccountTransaction(event) {
  if (event && event.preventDefault) event.preventDefault();

  const editId = document.getElementById('accountEditId')?.value?.trim();
  const entryType = document.getElementById('accountEntryType')?.value?.trim() || 'job';
  const entryDate = document.getElementById('accountEntryDate')?.value?.trim() || getTodayDateString();
  const category = document.getElementById('accountCategory')?.value?.trim() || 'certified_copy';
  const clientName = document.getElementById('accountClientName')?.value?.trim();
  const clientPhone = document.getElementById('accountClientPhone')?.value?.trim() || '';
  const caseNumber = document.getElementById('accountCaseSelect')?.value?.trim() || '';
  const workTitle = document.getElementById('accountWorkTitle')?.value?.trim();
  const amountReceived = parseFloat(document.getElementById('accountAmountReceived')?.value) || 0;
  const amountSpent = parseFloat(document.getElementById('accountAmountSpent')?.value) || 0;
  const paymentMode = document.getElementById('accountPaymentMode')?.value?.trim() || 'Cash';
  const paymentStatus = document.getElementById('accountPaymentStatus')?.value?.trim() || 'Completed';
  const workStatus = document.getElementById('accountWorkStatus')?.value?.trim() || 'Pending';
  let workCompletedDate = document.getElementById('accountWorkCompletedDate')?.value?.trim() || '';
  const notes = document.getElementById('accountNotes')?.value?.trim() || '';

  if (workStatus === 'Completed' && !workCompletedDate) {
    workCompletedDate = entryDate || getTodayDateString();
  } else if (workStatus !== 'Completed') {
    workCompletedDate = '';
  }

  if (!clientName) {
    alert('Please enter a Client or Payee Name.');
    return;
  }
  if (!workTitle) {
    alert('Please enter a Work or Description.');
    return;
  }
  if (amountReceived <= 0 && amountSpent <= 0) {
    alert('Please enter either Amount Received or Work Expense Spent.');
    return;
  }

  const netSaving = amountReceived - amountSpent;
  saveClientToSavedList(clientName, clientPhone, caseNumber);

  if (editId) {
    const idx = (allAccountRecords || []).findIndex(a => String(a.id) === String(editId));
    if (idx !== -1) {
      allAccountRecords[idx] = {
        ...allAccountRecords[idx],
        entry_date: entryDate,
        entry_type: entryType,
        client_name: clientName,
        client_phone: clientPhone,
        case_number: caseNumber,
        work_title: workTitle,
        category,
        amount_received: amountReceived,
        amount_spent: amountSpent,
        net_saving: netSaving,
        payment_mode: paymentMode,
        payment_status: paymentStatus,
        work_status: workStatus,
        work_completed_date: workCompletedDate,
        notes,
        updated_at: new Date().toISOString()
      };
    }

    if (supabaseClient && isAccountUuid(editId)) {
      supabaseClient.from('chambers_accounts').update({
        entry_date: entryDate,
        entry_type: entryType,
        client_name: clientName,
        client_phone: clientPhone,
        case_number: caseNumber,
        work_title: workTitle,
        category,
        amount_received: amountReceived,
        amount_spent: amountSpent,
        payment_mode: paymentMode,
        payment_status: paymentStatus,
        work_status: workStatus,
        work_completed_date: workCompletedDate || null,
        notes
      }).eq('id', editId).then(({ error }) => {
        if (error) console.warn('Notice updating supabase chambers_accounts:', error);
      }).catch(e => console.warn('Supabase update notice:', e));
    }
  } else {
    const newId = 'acc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const newRecord = {
      id: newId,
      entry_date: entryDate,
      entry_type: entryType,
      client_name: clientName,
      client_phone: clientPhone,
      case_number: caseNumber,
      work_title: workTitle,
      category,
      amount_received: amountReceived,
      amount_spent: amountSpent,
      net_saving: netSaving,
      payment_mode: paymentMode,
      payment_status: paymentStatus,
      work_status: workStatus,
      work_completed_date: workCompletedDate,
      notes,
      created_at: new Date().toISOString()
    };

    allAccountRecords.unshift(newRecord);

    if (supabaseClient) {
      supabaseClient.from('chambers_accounts').insert([{
        entry_date: entryDate,
        entry_type: entryType,
        client_name: clientName,
        client_phone: clientPhone,
        case_number: caseNumber,
        work_title: workTitle,
        category,
        amount_received: amountReceived,
        amount_spent: amountSpent,
        payment_mode: paymentMode,
        payment_status: paymentStatus,
        work_status: workStatus,
        work_completed_date: workCompletedDate || null,
        notes
      }]).select().then(({ data, error }) => {
        if (error) console.warn('Notice inserting supabase chambers_accounts:', error);
        else if (data && data[0] && data[0].id) {
          newRecord.id = String(data[0].id);
          saveAccountsLocally();
        }
      }).catch(e => console.warn('Supabase insert notice:', e));
    }
  }

  saveAccountsLocally();
  closeAccountModal();
  renderAccountsTab();
}

function editAccountTransaction(id) {
  const item = (allAccountRecords || []).find(a => String(a.id) === String(id));
  if (!item) return;

  const modal = document.getElementById('accountTransactionModal');
  if (!modal) return;

  populateAccountCaseDropdown();

  document.getElementById('accountEditId').value = item.id;
  document.getElementById('accountModalTitle').textContent = 'Edit Transaction';
  document.getElementById('accountModalSubtitle').textContent = `Updating transaction ID #${escapeHtml(String(item.id).slice(0, 10))}`;

  document.getElementById('accountEntryDate').value = (item.entry_date || '').slice(0, 10) || getTodayDateString();
  document.getElementById('accountCategory').value = item.category || 'certified_copy';
  document.getElementById('accountClientName').value = item.client_name || '';
  document.getElementById('accountClientPhone').value = item.client_phone || '';
  document.getElementById('accountCaseSelect').value = item.case_number || '';
  document.getElementById('accountWorkTitle').value = item.work_title || '';
  document.getElementById('accountAmountReceived').value = item.amount_received || '0';
  document.getElementById('accountAmountSpent').value = item.amount_spent || '0';
  document.getElementById('accountPaymentMode').value = item.payment_mode || 'Cash';
  document.getElementById('accountPaymentStatus').value = item.payment_status || 'Completed';

  const workStatusEl = document.getElementById('accountWorkStatus');
  const workCompletedDateEl = document.getElementById('accountWorkCompletedDate');
  if (workStatusEl) workStatusEl.value = item.work_status || 'Pending';
  if (workCompletedDateEl) workCompletedDateEl.value = (item.work_completed_date || '').slice(0, 10);

  document.getElementById('accountNotes').value = item.notes || '';

  const optDetails = document.getElementById('accountOptionalDetails');
  if (optDetails) {
    const hasOptionalData = Boolean(
      item.case_number ||
      item.client_phone ||
      item.notes ||
      (item.payment_mode && item.payment_mode !== 'Cash') ||
      (item.payment_status && item.payment_status !== 'Completed') ||
      (item.work_status && item.work_status !== 'Pending') ||
      item.work_completed_date
    );
    optDetails.open = hasOptionalData;
  }

  const suggContainer = document.getElementById('accountClientSuggestions');
  if (suggContainer) {
    suggContainer.classList.add('hidden');
    suggContainer.innerHTML = '';
  }
  const suggBadge = document.getElementById('accountSuggestedCaseBadge');
  if (suggBadge) {
    if (item.case_number) {
      showSuggestedCaseBadge(item.case_number, '', false);
    } else {
      suggBadge.classList.add('hidden');
      suggBadge.innerHTML = '';
    }
  }

  setAccountModalEntryType(item.entry_type || 'job');
  updateAccountLivePreview();
  modal.classList.remove('hidden');
}

function deleteAccountTransaction(id) {
  const item = (allAccountRecords || []).find(a => String(a.id) === String(id));
  if (!item) return;

  const ok = confirm(`Are you sure you want to delete this transaction?\n\nClient: ${item.client_name}\nWork: ${item.work_title}\nNet: ${formatCurrencyINR(item.net_saving)}`);
  if (!ok) return;

  allAccountRecords = (allAccountRecords || []).filter(a => String(a.id) !== String(id));
  saveAccountsLocally();
  renderAccountsTab();

  if (supabaseClient && isAccountUuid(id)) {
    supabaseClient.from('chambers_accounts').delete().eq('id', id).then(({ error }) => {
      if (error) console.warn('Notice deleting from supabase chambers_accounts:', error);
    }).catch(e => console.warn('Supabase delete notice:', e));
  }
}

function sendClientTransactionWhatsApp(id) {
  const item = (allAccountRecords || []).find(a => String(a.id) === String(id));
  if (!item) return;

  const dateStr = formatDateDMY(item.entry_date);
  const net = (parseFloat(item.amount_received) || 0) - (parseFloat(item.amount_spent) || 0);
  const isWorkDone = (item.work_status || 'Pending') === 'Completed';
  const workDoneDateStr = item.work_completed_date ? formatDateDMY(item.work_completed_date) : dateStr;

  const workStatusText = isWorkDone
    ? `✅ COMPLETED (Done on ${workDoneDateStr})`
    : `⏳ IN PROGRESS / PENDING (Under Execution in Court)`;

  const workNotice = isWorkDone
    ? `📢 *Notice:* Work is fully completed. Your certified copies/documents are ready for collection at our Chambers.`
    : `📢 *Notice:* Work has been filed/applied in court and is currently in progress.`;

  const text = `🏛️ *CHAMBERS OF ADVOCATE ATUL KUMAR MISHRA*
*FEE & WORK EXPENSE RECEIPT*
━━━━━━━━━━━━━━━━━━━━
📅 *Receipt Date:* ${dateStr}
👤 *Client Name:* ${item.client_name}
${item.case_number ? `⚖️ *Case Number:* ${item.case_number}\n` : ''}📝 *Work Details:* ${item.work_title}
🛠️ *Work Status:* ${workStatusText}
💳 *Payment Mode:* ${item.payment_mode || 'Cash'} (${item.payment_status || 'Completed'})

💰 *FINANCIAL BREAKDOWN:*
• Amount Received: ${formatCurrencyINR(item.amount_received)}
• Court / Work Expense: ${formatCurrencyINR(item.amount_spent)}
• Net Retained / Fee: ${formatCurrencyINR(net)}
${item.notes ? `\n📌 *Remarks:* ${item.notes}` : ''}
${workNotice}
━━━━━━━━━━━━━━━━━━━━
Thank you for consulting our Chambers.
_Generated via CaseBook Chambers Practice Management_`;

  const encoded = encodeURIComponent(text);
  let cleanPhone = (item.client_phone || '').replace(/\D/g, '');
  if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone;

  const url = cleanPhone.length >= 10
    ? `https://wa.me/${cleanPhone}?text=${encoded}`
    : `https://api.whatsapp.com/send?text=${encoded}`;

  window.open(url, '_blank');
}

function sendDailyAccountsSummaryWhatsApp() {
  const filtered = getFilteredAccountRecords();
  const periodLabel = getAccountsPeriodLabel();
  const todayFormatted = formatDateDMY(new Date());

  const totalInflow = filtered.reduce((s, r) => s + (parseFloat(r.amount_received) || 0), 0);
  const totalOutflow = filtered.reduce((s, r) => s + (parseFloat(r.amount_spent) || 0), 0);
  const netSavings = totalInflow - totalOutflow;

  let itemizedText = '';
  if (filtered.length === 0) {
    itemizedText = 'No transactions recorded for this period.\n';
  } else {
    itemizedText = filtered.map((r, i) => {
      const net = (parseFloat(r.amount_received) || 0) - (parseFloat(r.amount_spent) || 0);
      const isDone = (r.work_status || 'Pending') === 'Completed';
      const statusIcon = isDone ? '✅ Done' : '⏳ Pending';
      return `${i + 1}. *${r.client_name}* — ${r.work_title} [${statusIcon}]\n   • Inflow: ${formatCurrencyINR(r.amount_received)} | Expense: ${formatCurrencyINR(r.amount_spent)} | Net: ${formatCurrencyINR(net)}`;
    }).join('\n');
  }

  const message = `📊 *CHAMBERS DAILY KHATA & CLOSING SUMMARY*
🏛️ *Advocate Atul Kumar Mishra*
📅 *Period:* ${periodLabel} (Reconciled on ${todayFormatted})
━━━━━━━━━━━━━━━━━━━━
📥 *TOTAL INFLOW (Received):* ${formatCurrencyINR(totalInflow)}
📤 *TOTAL OUTFLOW (Expenses):* ${formatCurrencyINR(totalOutflow)}
✨ *NET SAVINGS (In Hand):* ${formatCurrencyINR(netSavings)}
📝 *Total Transactions:* ${filtered.length}

*ITEMIZED LEDGER:*
${itemizedText}
━━━━━━━━━━━━━━━━━━━━
_CaseBook Legal Practice Management_`;

  const encoded = encodeURIComponent(message);
  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
}

function exportAccountsToCSV() {
  const filtered = getFilteredAccountRecords();
  const periodLabel = getAccountsPeriodLabel().toLowerCase().replace(/[^a-z0-9]/g, '_');
  const todayStr = getTodayDateString();

  const headers = [
    'Transaction ID',
    'Date',
    'Nature',
    'Client Name',
    'Client Phone',
    'Case Number',
    'Work Description',
    'Category',
    'Work Status',
    'Work Completed Date',
    'Payment Mode',
    'Payment Status',
    'Amount Received (INR)',
    'Amount Spent (INR)',
    'Net Saving (INR)',
    'Notes'
  ];

  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = filtered.map(r => {
    const net = (parseFloat(r.amount_received) || 0) - (parseFloat(r.amount_spent) || 0);
    return [
      escapeCsv(r.id),
      escapeCsv(r.entry_date),
      escapeCsv(r.entry_type),
      escapeCsv(r.client_name),
      escapeCsv(r.client_phone || ''),
      escapeCsv(r.case_number || ''),
      escapeCsv(r.work_title),
      escapeCsv(r.category),
      escapeCsv(r.work_status || 'Pending'),
      escapeCsv(r.work_completed_date || ''),
      escapeCsv(r.payment_mode || 'Cash'),
      escapeCsv(r.payment_status || 'Completed'),
      (parseFloat(r.amount_received) || 0).toFixed(2),
      (parseFloat(r.amount_spent) || 0).toFixed(2),
      net.toFixed(2),
      escapeCsv(r.notes || '')
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Chambers_Accounts_${periodLabel}_${todayStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function printDailyAccountsSheet() {
  const filtered = getFilteredAccountRecords();
  const periodLabel = getAccountsPeriodLabel();
  const todayFormatted = formatDateDMY(new Date());

  const totalInflow = filtered.reduce((s, r) => s + (parseFloat(r.amount_received) || 0), 0);
  const totalOutflow = filtered.reduce((s, r) => s + (parseFloat(r.amount_spent) || 0), 0);
  const netSavings = totalInflow - totalOutflow;

  const printWindow = window.open('', '_blank', 'width=900,height=700');
  if (!printWindow) {
    alert('Please allow popups to print the daily accounts sheet.');
    return;
  }

  const rowsHtml = filtered.map((r, i) => {
    const net = (parseFloat(r.amount_received) || 0) - (parseFloat(r.amount_spent) || 0);
    const isDone = (r.work_status || 'Pending') === 'Completed';
    const statusText = isDone ? `Done${r.work_completed_date ? ' (' + formatDateDMY(r.work_completed_date) + ')' : ''}` : 'In Progress';
    return `
      <tr>
        <td style="text-align:center; padding:8px 6px; border:1px solid #cbd5e1;">${i + 1}</td>
        <td style="padding:8px 6px; border:1px solid #cbd5e1; white-space:nowrap;">${formatDateDMY(r.entry_date)}</td>
        <td style="padding:8px 6px; border:1px solid #cbd5e1;"><strong>${escapeHtml(r.client_name)}</strong>${r.case_number ? ` (${escapeHtml(r.case_number)})` : ''}</td>
        <td style="padding:8px 6px; border:1px solid #cbd5e1;">${escapeHtml(r.work_title)}</td>
        <td style="padding:8px 6px; border:1px solid #cbd5e1; text-align:center; font-weight:600; color:${isDone ? '#047857' : '#b45309'};">${escapeHtml(statusText)}</td>
        <td style="padding:8px 6px; border:1px solid #cbd5e1;">${escapeHtml(r.payment_mode || 'Cash')}</td>
        <td style="text-align:right; padding:8px 6px; border:1px solid #cbd5e1; color:#047857; font-weight:700;">+${formatCurrencyINR(r.amount_received)}</td>
        <td style="text-align:right; padding:8px 6px; border:1px solid #cbd5e1; color:#be123c; font-weight:700;">-${formatCurrencyINR(r.amount_spent)}</td>
        <td style="text-align:right; padding:8px 6px; border:1px solid #cbd5e1; font-weight:700; color:${net < 0 ? '#be123c' : '#047857'};">${net < 0 ? '-' : '+'}${formatCurrencyINR(Math.abs(net))}</td>
      </tr>
    `;
  }).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Chambers Accounts Ledger - ${todayFormatted}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 25px; font-size: 12px; }
        .header { text-align: center; border-bottom: 2px solid #0B132B; padding-bottom: 12px; margin-bottom: 16px; }
        .header h1 { margin: 0; font-size: 20px; color: #0B132B; text-transform: uppercase; letter-spacing: 0.5px; }
        .header p { margin: 4px 0 0 0; color: #475569; font-size: 13px; }
        .kpi-row { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
        .kpi-box { flex: 1; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; background: #f8fafc; text-align: center; }
        .kpi-title { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 4px; }
        .kpi-val { font-size: 16px; font-weight: 800; }
        table { width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 20px; }
        th { background: #f1f5f9; color: #1e293b; padding: 8px 6px; border: 1px solid #cbd5e1; font-weight: 700; text-align: left; }
        .footer { margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
        .sig-box { text-align: center; border-top: 1px solid #0f172a; width: 220px; padding-top: 6px; font-weight: 600; }
        @media print {
          body { margin: 10mm; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Chambers of Advocate Atul Kumar Mishra</h1>
        <p>District &amp; High Courts • Chambers Accounts &amp; Daily Khata Ledger</p>
        <p style="font-size: 11px; color: #64748b; margin-top: 2px;">Period: <strong>${periodLabel}</strong> • Printed on: ${todayFormatted}</p>
      </div>

      <div class="kpi-row">
        <div class="kpi-box">
          <div class="kpi-title">Total Inflow (Received)</div>
          <div class="kpi-val" style="color: #047857;">${formatCurrencyINR(totalInflow)}</div>
        </div>
        <div class="kpi-box">
          <div class="kpi-title">Total Outflow (Spent)</div>
          <div class="kpi-val" style="color: #be123c;">${formatCurrencyINR(totalOutflow)}</div>
        </div>
        <div class="kpi-box" style="background: #ecfdf5; border-color: #6ee7b7;">
          <div class="kpi-title" style="color: #065f46;">Net Savings (In Hand)</div>
          <div class="kpi-val" style="color: #047857;">${formatCurrencyINR(netSavings)}</div>
        </div>
        <div class="kpi-box">
          <div class="kpi-title">Total Transactions</div>
          <div class="kpi-val" style="color: #1e293b;">${filtered.length}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 30px; text-align: center;">#</th>
            <th style="width: 80px;">Date</th>
            <th>Client &amp; Case</th>
            <th>Work Description</th>
            <th style="width: 110px; text-align: center;">Work Status</th>
            <th style="width: 75px;">Payment</th>
            <th style="width: 100px; text-align: right;">Received (+)</th>
            <th style="width: 100px; text-align: right;">Expense (-)</th>
            <th style="width: 100px; text-align: right;">Net Saving</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || '<tr><td colspan="9" style="text-align:center; padding:20px; color:#94a3b8;">No transactions found.</td></tr>'}
        </tbody>
      </table>

      <div class="footer">
        <div style="font-size: 11px; color: #64748b;">
          Generated via CaseBook Chambers Practice Management System<br>
          Verified &amp; Reconciled by Atul Kumar Mishra, Advocate
        </div>
        <div class="sig-box">
          Advocate Signature &amp; Seal
        </div>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 250);
}

window.allAccountRecords = allAccountRecords;
window.initAccountsTab = initAccountsTab;
window.renderAccountsTab = renderAccountsTab;
window.setAccountsDateFilter = setAccountsDateFilter;
window.handleAccountsSearchChange = handleAccountsSearchChange;
window.handleAccountsCategoryFilterChange = handleAccountsCategoryFilterChange;
window.handleAccountsWorkStatusFilterChange = handleAccountsWorkStatusFilterChange;
window.toggleAccountWorkStatus = toggleAccountWorkStatus;
window.handleAccountWorkStatusChange = handleAccountWorkStatusChange;
window.openAddAccountModal = openAddAccountModal;
window.closeAccountModal = closeAccountModal;
window.setAccountModalEntryType = setAccountModalEntryType;
window.setAccountQuickWorkTag = setAccountQuickWorkTag;
window.updateAccountLivePreview = updateAccountLivePreview;
window.handleAccountCaseSelect = handleAccountCaseSelect;
window.handleSaveAccountTransaction = handleSaveAccountTransaction;
window.editAccountTransaction = editAccountTransaction;
window.deleteAccountTransaction = deleteAccountTransaction;
window.sendClientTransactionWhatsApp = sendClientTransactionWhatsApp;
window.sendDailyAccountsSummaryWhatsApp = sendDailyAccountsSummaryWhatsApp;
window.exportAccountsToCSV = exportAccountsToCSV;
window.printDailyAccountsSheet = printDailyAccountsSheet;
window.syncAccountsWithSupabase = syncAccountsWithSupabase;
window.updateAccountsBadgesAndShortcut = updateAccountsBadgesAndShortcut;
window.setAccountsViewMode = setAccountsViewMode;
window.updateAccountsViewModeUI = updateAccountsViewModeUI;
window.triggerAccountsCustomDatePicker = triggerAccountsCustomDatePicker;
window.applyMobileFilters = applyMobileFilters;
window.resetMobileFilters = resetMobileFilters;

// ==============================================================================
// PAISA (EARNING & EXPENSE MANAGER) SUBSYSTEM
// Advocate Personal Finance, Virtual Account & Case/Task Reconciliation
// ==============================================================================

let allPaisaTransactions = [];
let paisaSelectedMonth = 'current';
let paisaSelectedPeriod = 'month'; // 'today' | 'yesterday' | 'week' | 'month' | 'all'
let paisaPersonalSelectedPeriod = 'month';
let paisaDeletedItem = null;
let paisaUndoTimer = null;
let paisaSmartSuggestionsCache = [];
let paisaSmartActiveIndex = -1;
let paisaActiveSuggestionFlow = null;

// Personal Account wallet state
let allPersonalTransactions = []; // { id, type: 'transfer_in'|'personal_spent', amount, note, category, date, created_at }
let paisaTxnFilter = 'all'; // 'all' | 'business' | 'personal'

const DEFAULT_PAISA_VENDORS = {
  ajay: { name: 'Ajay', rate: 11 },
  zameer: { name: 'Zameer', rate: 12 }
};

function getPaisaVendors() {
  try {
    const raw = safeStorage.get('paisa_vendors');
    if (raw) {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (parsed && typeof parsed === 'object') return Object.assign({}, DEFAULT_PAISA_VENDORS, parsed);
    }
  } catch (e) {}
  return Object.assign({}, DEFAULT_PAISA_VENDORS);
}

function savePaisaVendors(vendors) {
  try {
    safeStorage.set('paisa_vendors', JSON.stringify(vendors));
  } catch (e) {}
}

function loadPaisaFromStorage() {
  try {
    const raw = safeStorage.get('paisa_transactions');
    if (raw) {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (Array.isArray(parsed)) {
        // Filter out any legacy dummy seeded entries
        allPaisaTransactions = parsed.filter(t => !String(t.id || '').startsWith('paisa_seed_'));
        return;
      }
    }
  } catch (e) {
    allPaisaTransactions = [];
  }
  allPaisaTransactions = [];
}

function savePaisaTransactions(updateUi = true) {
  try {
    safeStorage.set('paisa_transactions', JSON.stringify(allPaisaTransactions));
  } catch (e) {
    console.error('Failed to save paisa_transactions to storage:', e);
  }
  updatePaisaBadge();
  if (updateUi && currentActiveTabId === 'paisa') {
    renderPaisaTab();
  }
}

function formatPaisaAmount(num) {
  const val = parseFloat(num) || 0;
  return Math.round(val).toLocaleString('en-IN');
}

function updatePaisaBadge() {
  const badge = document.getElementById('paisaNavBadge');
  if (!badge) return;
  const count = allPaisaTransactions.length;
  if (count > 0) {
    badge.textContent = count > 99 ? '99+' : count;
    badge.classList.remove('hidden');
  } else {
    badge.textContent = '0';
  }
}

function getPaisaDateRangeFilter(periodKey) {
  const todayStr = getTodayDateString();
  const yestDate = new Date();
  yestDate.setDate(yestDate.getDate() - 1);
  const yesterdayStr = `${yestDate.getFullYear()}-${String(yestDate.getMonth() + 1).padStart(2, '0')}-${String(yestDate.getDate()).padStart(2, '0')}`;
  
  const weekAgoDate = new Date();
  weekAgoDate.setDate(weekAgoDate.getDate() - 6);
  const weekAgoStr = `${weekAgoDate.getFullYear()}-${String(weekAgoDate.getMonth() + 1).padStart(2, '0')}-${String(weekAgoDate.getDate()).padStart(2, '0')}`;
  
  const currentMonthKey = todayStr.slice(0, 7);

  return function(txn) {
    const d = txn.date || todayStr;
    if (periodKey === 'today') {
      return d === todayStr;
    } else if (periodKey === 'yesterday') {
      return d === yesterdayStr;
    } else if (periodKey === 'week' || periodKey === 'weekly') {
      return d >= weekAgoStr && d <= todayStr;
    } else if (periodKey === 'month' || periodKey === 'monthly' || periodKey === 'current') {
      return d.startsWith(currentMonthKey);
    } else if (periodKey === 'all') {
      return true;
    } else if (periodKey && periodKey.length === 7) {
      return d.startsWith(periodKey);
    }
    return d.startsWith(currentMonthKey);
  };
}

function getPaisaPeriodLabel(periodKey) {
  if (periodKey === 'today') return 'Today';
  if (periodKey === 'yesterday') return 'Yesterday';
  if (periodKey === 'week' || periodKey === 'weekly') return 'This Week';
  if (periodKey === 'month' || periodKey === 'monthly' || periodKey === 'current') return 'This Month';
  if (periodKey === 'all') return 'All Time';
  if (periodKey && periodKey.length === 7) {
    try {
      const [y, m] = periodKey.split('-');
      const d = new Date(parseInt(y), parseInt(m) - 1, 1);
      return d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
    } catch (e) { return periodKey; }
  }
  return 'This Month';
}

function populatePaisaMonthFilter() {
  const select = document.getElementById('paisaMonthFilter');
  if (!select) return;

  const currentVal = select.value || paisaSelectedMonth || 'current';
  const monthSet = new Set();
  const currentMonthKey = getTodayDateString().slice(0, 7);
  monthSet.add(currentMonthKey);

  allPaisaTransactions.forEach(t => {
    if (t.date && t.date.length >= 7) {
      monthSet.add(t.date.slice(0, 7));
    }
  });

  const sortedMonths = Array.from(monthSet).sort().reverse();

  let html = `<option value="current"${currentVal === 'current' ? ' selected' : ''}>📆 This Month</option>`;
  html += `<option value="all"${currentVal === 'all' ? ' selected' : ''}>📅 All Time</option>`;

  sortedMonths.forEach(m => {
    const [y, mm] = m.split('-');
    const d = new Date(parseInt(y), parseInt(mm) - 1, 1);
    const label = d.toLocaleString('en-IN', { month: 'short', year: 'numeric' });
    html += `<option value="${m}"${currentVal === m ? ' selected' : ''}>🗓️ ${label}</option>`;
  });

  select.innerHTML = html;
}

function handlePaisaMonthChange(val) {
  paisaSelectedMonth = val;
  if (val === 'current') paisaSelectedPeriod = 'month';
  else if (val === 'all') paisaSelectedPeriod = 'all';
  else paisaSelectedPeriod = val;
  renderPaisaTab();
}

function handlePaisaPeriodChange(val) {
  paisaSelectedPeriod = val || 'month';
  if (val === 'month') paisaSelectedMonth = 'current';
  else if (val === 'all') paisaSelectedMonth = 'all';
  renderPaisaTab();
}

function handlePaisaPersonalPeriodChange(val) {
  paisaPersonalSelectedPeriod = val || 'month';
  renderPersonalAccountCard();
  renderPersonalTransactionsFeed();
}

function renderPaisaTab() {
  populatePaisaMonthFilter();

  const filterFn = getPaisaDateRangeFilter(paisaSelectedPeriod);
  const filtered = allPaisaTransactions.filter(filterFn);
  const periodLabel = getPaisaPeriodLabel(paisaSelectedPeriod);

  // Sync range select if element exists
  const rangeSel = document.getElementById('paisaTimeRangeSelect');
  if (rangeSel && rangeSel.value !== paisaSelectedPeriod) {
    rangeSel.value = (paisaSelectedPeriod === 'current') ? 'month' : paisaSelectedPeriod;
  }

  // 1. Math calculations — deduct transfer_to_personal from virtual net balance
  let totalReceived = 0;
  let totalSpent = 0;
  let totalTransferred = 0;

  filtered.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') totalReceived += amt;
    else if (t.type === 'spent') totalSpent += amt;
    else if (t.type === 'transfer_to_personal') totalTransferred += amt;
  });

  const netBalance = totalReceived - totalSpent - totalTransferred;

  // 2. Hero Card UI
  const periodBadge = document.getElementById('paisaPeriodBadge');
  const totalRecvEl = document.getElementById('paisaTotalReceived');
  const totalSpentEl = document.getElementById('paisaTotalSpent');
  const netBalEl = document.getElementById('paisaNetBalance');
  const statsPeriodEl = document.getElementById('paisaStatsPeriodText');

  if (periodBadge) periodBadge.textContent = periodLabel;
  if (statsPeriodEl) statsPeriodEl.textContent = `(${periodLabel.toLowerCase()})`;
  if (totalRecvEl) totalRecvEl.textContent = `₹${formatPaisaAmount(totalReceived)}`;
  if (totalSpentEl) totalSpentEl.textContent = `₹${formatPaisaAmount(totalSpent)}`;
  if (netBalEl) {
    netBalEl.textContent = `${netBalance < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(netBalance))}`;
    netBalEl.classList.toggle('negative', netBalance < 0);
  }

  // 2b. Online / Cash split
  updatePaisaOnlineCashStats(filtered);

  // 2c. Render Virtual Card Mini Graph
  renderPaisaVirtualGraph(filtered);

  // 2d. Personal Account card
  renderPersonalAccountCard();

  // 3. Quick Stats: By Category
  renderPaisaCategoryStats(filtered);

  // 4. Quick Stats: By Case (Top 3)
  renderPaisaCaseStats(filtered);

  // 5. Quick Stats: By Vendor (Tickets)
  renderPaisaVendorStats(filtered);

  // 6. Recent Transactions Feed (respects active filter & period)
  renderPaisaTransactionsFeed(getFilteredPaisaTxns(filtered));
}

function renderPaisaVirtualGraph(filtered) {
  const container = document.getElementById('paisaVirtualGraphContainer');
  if (!container) return;

  let totalRecv = 0;
  let totalSpent = 0;
  let totalTrans = 0;

  filtered.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') totalRecv += amt;
    else if (t.type === 'spent') totalSpent += amt;
    else if (t.type === 'transfer_to_personal') totalTrans += amt;
  });

  const totalOutflow = totalSpent + totalTrans;
  const totalVolume = totalRecv + totalOutflow;
  const inPct = totalVolume > 0 ? Math.round((totalRecv / totalVolume) * 100) : 50;
  const outPct = totalVolume > 0 ? (100 - inPct) : 50;

  // 7-day daily activity
  const dayBars = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayLabel = i === 0 ? 'Today' : (i === 1 ? 'Yest' : d.toLocaleDateString('en-IN', { weekday: 'narrow' }));

    let dayIn = 0;
    let dayOut = 0;
    (allPaisaTransactions || []).forEach(t => {
      if (t.date === dateStr) {
        const amt = parseFloat(t.amount) || 0;
        if (t.type === 'received') dayIn += amt;
        else if (t.type === 'spent' || t.type === 'transfer_to_personal') dayOut += amt;
      }
    });
    dayBars.push({ dateStr, dayLabel, dayIn, dayOut });
  }

  const maxVal = Math.max(...dayBars.map(b => Math.max(b.dayIn, b.dayOut)), 500);

  let barsHtml = '';
  dayBars.forEach(b => {
    const inH = Math.max(Math.round((b.dayIn / maxVal) * 32), b.dayIn > 0 ? 4 : 2);
    const outH = Math.max(Math.round((b.dayOut / maxVal) * 32), b.dayOut > 0 ? 4 : 2);
    const title = `${b.dateStr}: +₹${formatPaisaAmount(b.dayIn)} | −₹${formatPaisaAmount(b.dayOut)}`;

    barsHtml += `
      <div class="paisa-chart-col" title="${escapeHtml(title)}">
        <div class="paisa-chart-bars-wrap">
          <div class="paisa-mini-bar bar-in ${b.dayIn > 0 ? 'has-val' : ''}" style="height: ${inH}px;"></div>
          <div class="paisa-mini-bar bar-out ${b.dayOut > 0 ? 'has-val' : ''}" style="height: ${outH}px;"></div>
        </div>
        <span class="paisa-chart-day-lbl">${b.dayLabel}</span>
      </div>
    `;
  });

  const netHintEl = document.getElementById('paisaNetMarginHint');
  if (netHintEl) {
    if (totalRecv > 0) {
      const margin = Math.round(((totalRecv - totalOutflow) / totalRecv) * 100);
      netHintEl.textContent = `${margin >= 0 ? '+' : ''}${margin}% retention margin`;
    } else {
      netHintEl.textContent = 'Cashflow surplus';
    }
  }

  container.innerHTML = `
    <div class="paisa-graph-header">
      <span class="paisa-graph-title"><i class="fa-solid fa-chart-line"></i> 7-DAY CASHFLOW &amp; VOLUME RATIO</span>
      <div class="paisa-graph-legends">
        <span class="legend-in"><span class="legend-dot"></span> In ${inPct}% (₹${formatPaisaAmount(totalRecv)})</span>
        <span class="legend-out"><span class="legend-dot"></span> Out ${outPct}% (₹${formatPaisaAmount(totalOutflow)})</span>
      </div>
    </div>
    <div class="paisa-ratio-track">
      <div class="paisa-ratio-fill fill-in" style="width: ${totalVolume > 0 ? inPct : 50}%;"></div>
      <div class="paisa-ratio-fill fill-out" style="width: ${totalVolume > 0 ? outPct : 50}%;"></div>
    </div>
    <div class="paisa-sparkline-row">
      ${barsHtml}
    </div>
  `;
}

function renderPaisaCategoryStats(filteredTransactions) {
  const container = document.getElementById('paisaCategoryChips');
  if (!container) return;

  const catTotals = {
    ticket: 0,
    travel: 0,
    court: 0,
    food: 0,
    print: 0,
    other: 0
  };

  filteredTransactions.forEach(t => {
    if (t.type === 'spent') {
      const cat = (t.category || 'other').toLowerCase();
      if (catTotals[cat] !== undefined) {
        catTotals[cat] += (parseFloat(t.amount) || 0);
      } else {
        catTotals.other += (parseFloat(t.amount) || 0);
      }
    }
  });

  const meta = [
    { id: 'ticket', icon: '🎫', label: 'Ticket' },
    { id: 'travel', icon: '⛽', label: 'Travel' },
    { id: 'court', icon: '📄', label: 'Court' },
    { id: 'food', icon: '☕', label: 'Food' },
    { id: 'print', icon: '🖨️', label: 'Print' },
    { id: 'other', icon: '📦', label: 'Other' }
  ];

  let html = '';
  meta.forEach(item => {
    const amt = catTotals[item.id] || 0;
    html += `
      <div class="paisa-stat-chip">
        <span class="chip-icon">${item.icon}</span>
        <span class="chip-name">${item.label}</span>
        <span class="chip-amt">₹${formatPaisaAmount(amt)}</span>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderPaisaCaseStats(filteredTransactions) {
  const container = document.getElementById('paisaTopCasesList');
  if (!container) return;

  const caseMap = {};
  filteredTransactions.forEach(t => {
    if (t.case_no) {
      if (!caseMap[t.case_no]) {
        caseMap[t.case_no] = {
          caseNo: t.case_no,
          caseName: t.case_name || t.case_no,
          received: 0,
          spent: 0
        };
      }
      const amt = parseFloat(t.amount) || 0;
      if (t.type === 'received') caseMap[t.case_no].received += amt;
      else if (t.type === 'spent') caseMap[t.case_no].spent += amt;
    }
  });

  const list = Object.values(caseMap);
  if (list.length === 0) {
    container.innerHTML = `<div style="font-size: 12px; color: #94a3b8; padding: 6px 0; font-style: italic;">No case-linked transactions for this period</div>`;
    return;
  }

  list.sort((a, b) => (b.received + b.spent) - (a.received + a.spent));
  const top3 = list.slice(0, 3);

  let html = '';
  top3.forEach(c => {
    const net = c.received - c.spent;
    html += `
      <div class="paisa-case-stat-item">
        <div class="case-meta">
          <span class="case-no">${escapeHtml(c.caseNo)}</span>
          <span class="case-name">${escapeHtml(c.caseName)}</span>
        </div>
        <div class="case-figures">
          <span class="c-rec">+₹${formatPaisaAmount(c.received)}</span>
          <span class="c-sep">/</span>
          <span class="c-sp">−₹${formatPaisaAmount(c.spent)}</span>
          <span class="c-net ${net < 0 ? 'neg' : 'pos'}">(Net: ${net < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(net))})</span>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderPaisaVendorStats(filteredTransactions) {
  const container = document.getElementById('paisaVendorStatsRow');
  if (!container) return;

  let ajayCount = 0;
  let ajaySpent = 0;
  let zameerCount = 0;
  let zameerSpent = 0;

  filteredTransactions.forEach(t => {
    if (t.type === 'spent' && t.category === 'ticket') {
      const v = (t.ticket_details?.vendor || '').toLowerCase();
      const amt = parseFloat(t.amount) || 0;
      const qty = parseInt(t.ticket_details?.qty) || (v === 'ajay' ? Math.round(amt / 11) : (v === 'zameer' ? Math.round(amt / 12) : 1));
      if (v === 'zameer' || (t.client_payee || '').toLowerCase().includes('zameer')) {
        zameerCount += qty;
        zameerSpent += amt;
      } else {
        ajayCount += qty;
        ajaySpent += amt;
      }
    }
  });

  container.innerHTML = `
    <div class="paisa-vendor-card">
      <div class="vendor-header">
        <span class="vendor-badge">Vendor</span>
        <span class="vendor-name">Ajay</span>
        <span class="vendor-rate">@₹11</span>
      </div>
      <div class="vendor-body">
        <span class="vendor-qty">${ajayCount} tickets</span>
        <span class="vendor-spent">₹${formatPaisaAmount(ajaySpent)}</span>
      </div>
    </div>
    <div class="paisa-vendor-card">
      <div class="vendor-header">
        <span class="vendor-badge">Vendor</span>
        <span class="vendor-name">Zameer</span>
        <span class="vendor-rate">@₹12</span>
      </div>
      <div class="vendor-body">
        <span class="vendor-qty">${zameerCount} tickets</span>
        <span class="vendor-spent">₹${formatPaisaAmount(zameerSpent)}</span>
      </div>
    </div>
  `;
}

function renderPaisaTransactionsFeed(transactions) {
  const container = document.getElementById('paisaTransactionsFeed');
  const badge = document.getElementById('paisaTxnCountBadge');
  if (!container) return;

  if (!transactions || transactions.length === 0) {
    container.innerHTML = `
      <div class="paisa-empty-feed">
        <div style="font-size: 28px; margin-bottom: 6px;">💸</div>
        <div style="font-weight: 700; color: #334155; margin-bottom: 4px;">No transactions recorded yet</div>
        <div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Start tracking your earnings and court expenses in one tap.</div>
        <div style="display: flex; gap: 8px; justify-content: center;">
          <button type="button" class="paisa-btn-receive" onclick="openPaisaReceivedModal()" style="font-size: 12px; padding: 6px 14px; min-height: 36px;">+ Received</button>
          <button type="button" class="paisa-btn-spend" onclick="openPaisaSpendModal()" style="font-size: 12px; padding: 6px 14px; min-height: 36px;">− Spent</button>
        </div>
      </div>
    `;
    if (badge) badge.textContent = '0';
    return;
  }

  const sorted = transactions.slice().sort((a, b) => {
    const dateCmp = (b.date || '').localeCompare(a.date || '');
    if (dateCmp !== 0) return dateCmp;
    return (b.created_at || '').localeCompare(a.created_at || '');
  });

  const displayList = sorted.slice(0, 25);
  if (badge) badge.textContent = transactions.length;

  const todayStr = getTodayDateString();
  const yestDate = new Date();
  yestDate.setDate(yestDate.getDate() - 1);
  const yesterdayStr = `${yestDate.getFullYear()}-${String(yestDate.getMonth() + 1).padStart(2, '0')}-${String(yestDate.getDate()).padStart(2, '0')}`;

  const groups = {};
  displayList.forEach(t => {
    const d = t.date || todayStr;
    if (!groups[d]) groups[d] = [];
    groups[d].push(t);
  });

  let html = '';
  const dateKeys = Object.keys(groups).sort().reverse();

  dateKeys.forEach(dateKey => {
    let headerLabel = dateKey;
    if (dateKey === todayStr) {
      headerLabel = 'Today';
    } else if (dateKey === yesterdayStr) {
      headerLabel = 'Yesterday';
    } else {
      try {
        const [y, m, day] = dateKey.split('-');
        const parsedD = new Date(parseInt(y), parseInt(m) - 1, parseInt(day));
        headerLabel = parsedD.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      } catch (e) {
        headerLabel = dateKey;
      }
    }

    let dailyRecv = 0;
    let dailySpent = 0;
    groups[dateKey].forEach(t => {
      const amt = parseFloat(t.amount) || 0;
      if (t.type === 'received') {
        dailyRecv += amt;
      } else if (t.type === 'spent' || t.type === 'transfer_to_personal') {
        dailySpent += amt;
      }
    });

    let summaryHtml = '';
    if (dailyRecv > 0 || dailySpent > 0) {
      const parts = [];
      if (dailyRecv > 0) {
        parts.push(`<span class="paisa-daily-pill pill-earning"><i class="fa-solid fa-arrow-trend-up"></i> +₹${formatPaisaAmount(dailyRecv)}</span>`);
      }
      if (dailySpent > 0) {
        parts.push(`<span class="paisa-daily-pill pill-expense"><i class="fa-solid fa-arrow-trend-down"></i> −₹${formatPaisaAmount(dailySpent)}</span>`);
      }
      summaryHtml = `<div class="paisa-daily-summary">${parts.join('')}</div>`;
    }

    let mobileCardsHtml = '';
    let desktopTableRowsHtml = '';

    groups[dateKey].forEach(t => {
      const isRecv = t.type === 'received';
      const isTransfer = t.type === 'transfer_to_personal';
      const amt = parseFloat(t.amount) || 0;

      let iconHtml = '';
      let pillClass = '';
      let pillSign = '';
      let typeBadge = '';
      let payeeLabel = '';
      let subLine = '';

      if (isRecv) {
        iconHtml = `<div class="paisa-tx-icon tx-icon-recv"><i class="fa-solid fa-arrow-down"></i></div>`;
        pillClass = 'pill-recv';
        pillSign = '+';
        typeBadge = `<span class="paisa-table-type-pill type-recv"><i class="fa-solid fa-arrow-down"></i> Inflow</span>`;
        payeeLabel = escapeHtml(t.client_payee || 'Client');
        const subDetails = [];
        if (t.case_no) subDetails.push(`⚖️ ${escapeHtml(t.case_no)}`);
        if (t.note) subDetails.push(escapeHtml(t.note));
        subLine = subDetails.join(' • ') || 'Client Earning';
      } else if (isTransfer) {
        iconHtml = `<div class="paisa-tx-icon tx-icon-transfer"><i class="fa-solid fa-arrow-right-arrow-left"></i></div>`;
        pillClass = 'pill-transfer';
        pillSign = '−';
        typeBadge = `<span class="paisa-table-type-pill type-transfer"><i class="fa-solid fa-arrow-right-arrow-left"></i> Transfer</span>`;
        payeeLabel = '👤 Transfer to Personal';
        subLine = t.note ? escapeHtml(t.note) : 'Moved to personal wallet';
      } else {
        // spent (business)
        const cat = (t.category || 'other').toLowerCase();
        const icons = {
          ticket: 'fa-ticket',
          travel: 'fa-gas-pump',
          court: 'fa-scale-balanced',
          food: 'fa-mug-hot',
          print: 'fa-print',
          other: 'fa-receipt'
        };
        const iconCls = icons[cat] || 'fa-receipt';
        iconHtml = `<div class="paisa-tx-icon tx-icon-spend"><i class="fa-solid ${iconCls}"></i></div>`;
        pillClass = 'pill-spend';
        pillSign = '−';
        typeBadge = `<span class="paisa-table-type-pill type-spend"><i class="fa-solid ${iconCls}"></i> Expense</span>`;
        payeeLabel = escapeHtml(t.client_payee || 'Expense');
        const subDetails = [];
        if (t.case_no) subDetails.push(`⚖️ ${escapeHtml(t.case_no)}`);
        if (t.category) subDetails.push(t.category.toUpperCase());
        if (t.note) subDetails.push(escapeHtml(t.note));
        subLine = subDetails.join(' • ') || 'Court Expense';
      }

      const modeTag = isTransfer ? '—' : `<span class="tx-mode-tag">${escapeHtml(t.payment_mode || 'Cash')}</span>`;
      const clickHandler = isTransfer ? '' : `onclick="openPaisaDetailModal('${escapeHtml(t.id)}')"`;

      // 1. Mobile card item
      mobileCardsHtml += `
        <div class="paisa-tx-row" ${clickHandler} style="${isTransfer ? '' : 'cursor:pointer;'}">
          ${iconHtml}
          <div class="paisa-tx-info">
            <div class="tx-payee-title">${payeeLabel}</div>
            <div class="tx-sub-meta">${subLine}</div>
          </div>
          <div class="paisa-tx-trailing">
            <div class="tx-amt-pill ${pillClass}">
              ${pillSign}₹${formatPaisaAmount(amt)}
            </div>
            ${isTransfer ? '' : modeTag}
          </div>
        </div>
      `;

      // 2. Desktop table row
      desktopTableRowsHtml += `
        <tr class="paisa-table-row ${isTransfer ? 'row-transfer' : (isRecv ? 'row-recv' : 'row-spend')}" ${clickHandler} style="${isTransfer ? '' : 'cursor:pointer;'}">
          <td>${typeBadge}</td>
          <td>
            <div class="table-payee-name">${payeeLabel}</div>
            ${t.category ? `<span class="table-cat-tag">${escapeHtml(t.category.toUpperCase())}</span>` : ''}
          </td>
          <td>
            <div class="table-meta-text">${subLine}</div>
          </td>
          <td>${modeTag}</td>
          <td style="text-align: right;">
            <span class="tx-amt-pill ${pillClass}">${pillSign}₹${formatPaisaAmount(amt)}</span>
          </td>
          <td style="text-align: center;">
            ${isTransfer ? '' : `<button type="button" class="paisa-table-view-btn" onclick="openPaisaDetailModal('${escapeHtml(t.id)}'); event.stopPropagation();" title="View Details"><i class="fa-solid fa-eye"></i></button>`}
          </td>
        </tr>
      `;
    });

    html += `
      <div class="paisa-date-group-block">
        <div class="paisa-date-group-header">
          <div class="paisa-date-badge">
            <i class="fa-regular fa-calendar-days"></i>
            <span>${headerLabel}</span>
          </div>
          ${summaryHtml}
        </div>

        <!-- Mobile Card Feed View -->
        <div class="paisa-tx-cards-mobile">
          ${mobileCardsHtml}
        </div>

        <!-- Desktop Table View -->
        <div class="paisa-tx-table-desktop">
          <table class="paisa-desktop-table">
            <thead>
              <tr>
                <th style="width: 110px;">Type</th>
                <th style="width: 220px;">Party / Payee</th>
                <th>Case &amp; Notes</th>
                <th style="width: 95px;">Mode</th>
                <th style="width: 120px; text-align: right;">Amount</th>
                <th style="width: 60px; text-align: center;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${desktopTableRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function populatePaisaCaseDropdown(selectId, selectedCaseNo = '') {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  let html = `<option value="">-- No specific case linked --</option>`;
  (allCaseRecords || []).forEach(c => {
    const no = c.caseNo || c.criminalCaseNumber || '';
    if (!no) return;
    const title = c.caseName || c.title || `${c.plaintiff || ''} vs ${c.defendant || ''}`.trim() || no;
    const isSel = (no === selectedCaseNo) ? ' selected' : '';
    html += `<option value="${escapeHtml(no)}"${isSel}>${escapeHtml(no)} - ${escapeHtml(title.slice(0, 40))}</option>`;
  });
  sel.innerHTML = html;
}

function populatePaisaTaskDropdown(selectId, selectedTaskId = '') {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  let html = `<option value="">-- No task linked --</option>`;
  const tasks = Array.isArray(window.caseTasks) ? window.caseTasks : [];
  tasks.forEach(t => {
    const id = t.id || '';
    const title = t.taskTitle || t.title || 'Task';
    const cNo = t.caseNo ? ` [${t.caseNo}]` : '';
    const isSel = (String(id) === String(selectedTaskId)) ? ' selected' : '';
    html += `<option value="${escapeHtml(id)}"${isSel}>${escapeHtml(title)}${escapeHtml(cNo)}</option>`;
  });
  sel.innerHTML = html;
}

function setPaisaMode(flow, mode) {
  const hiddenId = flow === 'received' ? 'paisaReceivedMode' : 'paisaSpendMode';
  const hidden = document.getElementById(hiddenId);
  if (hidden) hidden.value = mode;

  const modalId = flow === 'received' ? 'paisaReceivedModal' : 'paisaSpendModal';
  const modal = document.getElementById(modalId);
  if (modal) {
    const radioName = flow === 'received' ? 'paisaReceivedPaymentMode' : 'paisaSpendPaymentMode';
    modal.querySelectorAll(`input[name="${radioName}"]`).forEach(radio => {
      const isMatch = (radio.value || '').toLowerCase() === (mode || '').toLowerCase();
      radio.checked = isMatch;
      const label = radio.closest('.paisa-radio-btn-label');
      if (label) {
        label.classList.toggle('active', isMatch);
      }
    });

    modal.querySelectorAll('.paisa-mode-chip').forEach(btn => {
      btn.classList.toggle('active', (btn.getAttribute('data-mode') || '').toLowerCase() === (mode || '').toLowerCase());
    });
  }
}

function setPaisaSpendCategory(cat) {
  const hidden = document.getElementById('paisaSpendCategory');
  if (hidden) hidden.value = cat;

  const modal = document.getElementById('paisaSpendModal');
  if (modal) {
    modal.querySelectorAll('.paisa-cat-chip').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
    });
  }

  const calcBox = document.getElementById('paisaTicketCalcBox');
  if (calcBox) {
    if (cat === 'ticket') {
      calcBox.style.display = 'block';
      calculatePaisaTicketTotal();
    } else {
      calcBox.style.display = 'none';
    }
  }
}

function calculatePaisaTicketTotal() {
  const vendorSel = document.getElementById('paisaTicketVendor');
  const qtyInput = document.getElementById('paisaTicketQty');
  const rateHint = document.getElementById('paisaVendorRateHint');
  const amtInput = document.getElementById('paisaSpendAmount');
  if (!vendorSel || !qtyInput) return;

  const vendors = getPaisaVendors();
  const vKey = vendorSel.value || 'ajay';
  const rate = vendors[vKey]?.rate || (vKey === 'zameer' ? 12 : 11);

  if (rateHint) {
    rateHint.textContent = `Rate: ₹${rate}/ticket`;
  }

  const qty = parseInt(qtyInput.value) || 0;
  if (qty > 0 && amtInput) {
    amtInput.value = qty * rate;
  }
}

function handlePaisaClientInput(val, flow) {
  paisaActiveSuggestionFlow = flow;
  const containerId = flow === 'received' ? 'paisaReceivedSuggestions' : 'paisaSpendSuggestions';
  const badgeId = flow === 'received' ? 'paisaReceivedCaseBadge' : 'paisaSpendCaseBadge';
  const container = document.getElementById(containerId);
  const badge = document.getElementById(badgeId);
  if (!container) return;

  if (!val || val.trim().length < 2) {
    container.classList.add('hidden');
    container.innerHTML = '';
    if (badge) badge.classList.add('hidden');
    return;
  }

  const suggestions = (typeof searchSmartCaseSuggestions === 'function')
    ? searchSmartCaseSuggestions(val)
    : [];
  paisaSmartSuggestionsCache = suggestions;
  paisaSmartActiveIndex = -1;

  if (suggestions.length === 0) {
    container.classList.add('hidden');
    container.innerHTML = '';
    if (badge) badge.classList.add('hidden');
    return;
  }

  let html = '';
  suggestions.slice(0, 6).forEach((sug, idx) => {
    const isExact = sug.isExact || (sug.tag && sug.tag.includes('Exact'));
    const badgeCls = sug.type === 'client' ? 'client' : (isExact ? 'exact' : 'case');
    const badgeText = isExact ? '✓ Party Match' : (sug.type === 'client' ? 'Saved Client' : 'Case Match');
    html += `
      <div class="account-suggestion-item" data-index="${idx}" onclick="selectPaisaSuggestion(${idx}, '${flow}')" style="cursor: pointer;">
        <div class="account-suggestion-title">
          <span>${escapeHtml(sug.name || sug.partyName || sug.title)}</span>
          <span class="account-match-pill pill-${badgeCls}">${badgeText}</span>
        </div>
        <div class="account-suggestion-sub">${escapeHtml(sug.sub || (sug.caseNo ? 'Case: ' + sug.caseNo : ''))}</div>
      </div>
    `;
  });

  container.innerHTML = html;
  container.classList.remove('hidden');

  // Auto-suggest badge if top match is strong
  const top = suggestions[0];
  if (top && top.caseNo && (top.isExact || top.score >= 75) && badge) {
    badge.innerHTML = `
      <i class="fa-solid fa-folder-open"></i>
      <span>Link Case <strong>${escapeHtml(top.caseNo)}</strong> (${escapeHtml((top.title || '').slice(0, 30))})?</span>
      <button type="button" class="account-suggested-link-btn" onclick="applyPaisaLinkedCase('${escapeHtml(top.caseNo)}', '${flow}')">✓ Link</button>
    `;
    badge.classList.remove('hidden');
  } else if (badge) {
    badge.classList.add('hidden');
  }
}

function handlePaisaClientKeydown(e, flow) {
  const containerId = flow === 'received' ? 'paisaReceivedSuggestions' : 'paisaSpendSuggestions';
  const container = document.getElementById(containerId);
  if (!container || container.classList.contains('hidden')) return;

  const items = container.querySelectorAll('.account-suggestion-item');
  if (!items || items.length === 0) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    paisaSmartActiveIndex = (paisaSmartActiveIndex + 1) % items.length;
    updatePaisaActiveSuggestion(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    paisaSmartActiveIndex = (paisaSmartActiveIndex - 1 + items.length) % items.length;
    updatePaisaActiveSuggestion(items);
  } else if (e.key === 'Enter') {
    if (paisaSmartActiveIndex >= 0 && paisaSmartActiveIndex < paisaSmartSuggestionsCache.length) {
      e.preventDefault();
      selectPaisaSuggestion(paisaSmartActiveIndex, flow);
    }
  } else if (e.key === 'Escape') {
    container.classList.add('hidden');
  }
}

function updatePaisaActiveSuggestion(items) {
  items.forEach((item, idx) => {
    item.classList.toggle('active', idx === paisaSmartActiveIndex);
    if (idx === paisaSmartActiveIndex) {
      item.scrollIntoView({ block: 'nearest' });
    }
  });
}

function selectPaisaSuggestion(idx, flow) {
  const sug = paisaSmartSuggestionsCache[idx];
  if (!sug) return;

  const nameInputId = flow === 'received' ? 'paisaReceivedClientName' : 'paisaSpendPayeeName';
  const input = document.getElementById(nameInputId);
  if (input) {
    input.value = sug.partyName || sug.name || sug.title || '';
  }

  if (sug.caseNo) {
    applyPaisaLinkedCase(sug.caseNo, flow);
  }

  const containerId = flow === 'received' ? 'paisaReceivedSuggestions' : 'paisaSpendSuggestions';
  const container = document.getElementById(containerId);
  if (container) container.classList.add('hidden');

  const badgeId = flow === 'received' ? 'paisaReceivedCaseBadge' : 'paisaSpendCaseBadge';
  const badge = document.getElementById(badgeId);
  if (badge) badge.classList.add('hidden');
}

function applyPaisaLinkedCase(caseNo, flow) {
  const selectId = flow === 'received' ? 'paisaReceivedCaseSelect' : 'paisaSpendCaseSelect';
  const sel = document.getElementById(selectId);
  if (sel) {
    sel.value = caseNo;
  }
  const badgeId = flow === 'received' ? 'paisaReceivedCaseBadge' : 'paisaSpendCaseBadge';
  const badge = document.getElementById(badgeId);
  if (badge) badge.classList.add('hidden');
}

function openPaisaReceivedModal(editId = null) {
  const modal = document.getElementById('paisaReceivedModal');
  const form = document.getElementById('paisaReceivedForm');
  if (!modal || !form) return;

  const title = document.getElementById('paisaReceivedModalTitle');
  const editIdInput = document.getElementById('paisaReceivedEditId');
  const amountInput = document.getElementById('paisaReceivedAmount');
  const clientInput = document.getElementById('paisaReceivedClientName');
  const dateInput = document.getElementById('paisaReceivedDate');
  const noteInput = document.getElementById('paisaReceivedNote');
  const badge = document.getElementById('paisaReceivedCaseBadge');
  const sugBox = document.getElementById('paisaReceivedSuggestions');

  if (badge) badge.classList.add('hidden');
  if (sugBox) sugBox.classList.add('hidden');

  let selectedCaseNo = '';
  let selectedTaskId = '';
  let targetDate = getTodayDateString();

  if (editId) {
    const tx = allPaisaTransactions.find(t => t.id === editId);
    if (tx) {
      if (title) title.textContent = 'Edit Received Money';
      if (editIdInput) editIdInput.value = tx.id;
      if (amountInput) amountInput.value = tx.amount;
      if (clientInput) clientInput.value = tx.client_payee || '';
      targetDate = tx.date || getTodayDateString();
      if (noteInput) noteInput.value = tx.note || '';
      setPaisaMode('received', tx.payment_mode || 'Cash');
      selectedCaseNo = tx.case_no || '';
      selectedTaskId = tx.task_id || '';
    }
  } else {
    if (title) title.textContent = 'Received Money';
    if (editIdInput) editIdInput.value = '';
    form.reset();
    targetDate = getTodayDateString();
    setPaisaMode('received', 'Cash');
  }

  if (dateInput) {
    dateInput.value = targetDate;
  }

  populatePaisaCaseDropdown('paisaReceivedCaseSelect', selectedCaseNo);
  populatePaisaTaskDropdown('paisaReceivedTaskSelect', selectedTaskId);

  modal.classList.remove('hidden');
  modal.classList.add('active');

  setTimeout(() => {
    if (amountInput) amountInput.focus();
  }, 150);
}

function openPaisaSpendModal(editId = null) {
  const modal = document.getElementById('paisaSpendModal');
  const form = document.getElementById('paisaSpendForm');
  if (!modal || !form) return;

  const title = document.getElementById('paisaSpendModalTitle');
  const editIdInput = document.getElementById('paisaSpendEditId');
  const amountInput = document.getElementById('paisaSpendAmount');
  const payeeInput = document.getElementById('paisaSpendPayeeName');
  const dateInput = document.getElementById('paisaSpendDate');
  const noteInput = document.getElementById('paisaSpendNote');
  const badge = document.getElementById('paisaSpendCaseBadge');
  const sugBox = document.getElementById('paisaSpendSuggestions');
  const ticketVendor = document.getElementById('paisaTicketVendor');
  const ticketValue = document.getElementById('paisaTicketValue');
  const ticketQty = document.getElementById('paisaTicketQty');

  if (badge) badge.classList.add('hidden');
  if (sugBox) sugBox.classList.add('hidden');

  let selectedCaseNo = '';
  let selectedTaskId = '';
  let catToSet = 'ticket';
  let targetDate = getTodayDateString();

  if (editId) {
    const tx = allPaisaTransactions.find(t => t.id === editId);
    if (tx) {
      if (title) title.textContent = 'Edit Expense';
      if (editIdInput) editIdInput.value = tx.id;
      catToSet = tx.category || 'other';
      if (amountInput) amountInput.value = tx.amount;
      if (payeeInput) payeeInput.value = tx.client_payee || '';
      targetDate = tx.date || getTodayDateString();
      if (noteInput) noteInput.value = tx.note || '';
      setPaisaMode('spent', tx.payment_mode || 'Cash');
      selectedCaseNo = tx.case_no || '';
      selectedTaskId = tx.task_id || '';

      if (tx.ticket_details) {
        if (ticketVendor) ticketVendor.value = tx.ticket_details.vendor || 'ajay';
        if (ticketValue) ticketValue.value = tx.ticket_details.value || '10';
        if (ticketQty) ticketQty.value = tx.ticket_details.qty || 1;
      }
    }
  } else {
    if (title) title.textContent = 'Expense';
    if (editIdInput) editIdInput.value = '';
    form.reset();
    targetDate = getTodayDateString();
    setPaisaMode('spent', 'Cash');
    if (ticketVendor) ticketVendor.value = 'ajay';
    if (ticketValue) ticketValue.value = '10';
    if (ticketQty) ticketQty.value = '';
  }

  if (dateInput) {
    dateInput.value = targetDate;
  }

  setPaisaSpendCategory(catToSet);
  populatePaisaCaseDropdown('paisaSpendCaseSelect', selectedCaseNo);
  populatePaisaTaskDropdown('paisaSpendTaskSelect', selectedTaskId);

  modal.classList.remove('hidden');
  modal.classList.add('active');

  setTimeout(() => {
    if (catToSet === 'ticket' && ticketQty) {
      ticketQty.focus();
    } else if (amountInput) {
      amountInput.focus();
    }
  }, 150);
}

function handleSavePaisaReceived(e) {
  if (e && e.preventDefault) e.preventDefault();

  const editId = document.getElementById('paisaReceivedEditId')?.value || '';
  const amount = parseFloat(document.getElementById('paisaReceivedAmount')?.value || 0);
  const clientName = (document.getElementById('paisaReceivedClientName')?.value || '').trim();
  const caseNo = document.getElementById('paisaReceivedCaseSelect')?.value || null;
  const taskId = document.getElementById('paisaReceivedTaskSelect')?.value || null;
  const date = document.getElementById('paisaReceivedDate')?.value || getTodayDateString();
  const mode = document.getElementById('paisaReceivedMode')?.value || 'Cash';
  const note = (document.getElementById('paisaReceivedNote')?.value || '').trim();

  if (!amount || amount <= 0) {
    showPaisaToast('⚠️ Please enter a valid received amount');
    return;
  }
  if (!clientName) {
    showPaisaToast('⚠️ Please enter client or party name');
    return;
  }

  let caseTitle = null;
  if (caseNo) {
    const foundCase = (allCaseRecords || []).find(c => (c.caseNo === caseNo || c.criminalCaseNumber === caseNo));
    if (foundCase) {
      caseTitle = foundCase.caseName || foundCase.title || `${foundCase.plaintiff || ''} vs ${foundCase.defendant || ''}`.trim() || caseNo;
    }
  }

  let taskTitle = null;
  if (taskId) {
    const tasks = Array.isArray(window.caseTasks) ? window.caseTasks : [];
    const foundTask = tasks.find(t => String(t.id) === String(taskId));
    if (foundTask) {
      taskTitle = foundTask.taskTitle || foundTask.title || null;
    }
  }

  if (editId) {
    const idx = allPaisaTransactions.findIndex(t => t.id === editId);
    if (idx !== -1) {
      allPaisaTransactions[idx] = Object.assign({}, allPaisaTransactions[idx], {
        amount,
        client_payee: clientName,
        case_no: caseNo,
        case_name: caseTitle,
        task_id: taskId,
        task_title: taskTitle,
        payment_mode: mode,
        date,
        note,
        updated_at: new Date().toISOString()
      });
    }
  } else {
    const newTx = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      type: 'received',
      amount,
      client_payee: clientName,
      case_no: caseNo,
      case_name: caseTitle,
      task_id: taskId,
      task_title: taskTitle,
      category: 'fee',
      ticket_details: null,
      payment_mode: mode,
      date,
      note,
      created_at: new Date().toISOString()
    };
    allPaisaTransactions.unshift(newTx);
  }

  savePaisaTransactions(true);
  closePaisaModal('paisaReceivedModal');
  showPaisaToast(`✓ Received ₹${formatPaisaAmount(amount)} recorded successfully`);
}

function handleSavePaisaSpend(e) {
  if (e && e.preventDefault) e.preventDefault();

  const editId = document.getElementById('paisaSpendEditId')?.value || '';
  const category = document.getElementById('paisaSpendCategory')?.value || 'other';
  const amount = parseFloat(document.getElementById('paisaSpendAmount')?.value || 0);
  const payee = (document.getElementById('paisaSpendPayeeName')?.value || '').trim() || 'Expense';
  const caseNo = document.getElementById('paisaSpendCaseSelect')?.value || null;
  const taskId = document.getElementById('paisaSpendTaskSelect')?.value || null;
  const date = document.getElementById('paisaSpendDate')?.value || getTodayDateString();
  const mode = document.getElementById('paisaSpendMode')?.value || 'Cash';
  const note = (document.getElementById('paisaSpendNote')?.value || '').trim();

  if (!amount || amount <= 0) {
    showPaisaToast('⚠️ Please enter a valid expense amount');
    return;
  }

  let ticketDetails = null;
  if (category === 'ticket') {
    const vendor = document.getElementById('paisaTicketVendor')?.value || 'ajay';
    const val = parseInt(document.getElementById('paisaTicketValue')?.value) || 10;
    const qty = parseInt(document.getElementById('paisaTicketQty')?.value) || 1;
    const vendors = getPaisaVendors();
    const rate = vendors[vendor]?.rate || (vendor === 'zameer' ? 12 : 11);
    ticketDetails = { vendor, value: val, qty, rate };
  }

  let caseTitle = null;
  if (caseNo) {
    const foundCase = (allCaseRecords || []).find(c => (c.caseNo === caseNo || c.criminalCaseNumber === caseNo));
    if (foundCase) {
      caseTitle = foundCase.caseName || foundCase.title || `${foundCase.plaintiff || ''} vs ${foundCase.defendant || ''}`.trim() || caseNo;
    }
  }

  let taskTitle = null;
  if (taskId) {
    const tasks = Array.isArray(window.caseTasks) ? window.caseTasks : [];
    const foundTask = tasks.find(t => String(t.id) === String(taskId));
    if (foundTask) {
      taskTitle = foundTask.taskTitle || foundTask.title || null;
    }
  }

  if (editId) {
    const idx = allPaisaTransactions.findIndex(t => t.id === editId);
    if (idx !== -1) {
      allPaisaTransactions[idx] = Object.assign({}, allPaisaTransactions[idx], {
        category,
        amount,
        client_payee: payee,
        case_no: caseNo,
        case_name: caseTitle,
        task_id: taskId,
        task_title: taskTitle,
        ticket_details: ticketDetails,
        payment_mode: mode,
        date,
        note,
        updated_at: new Date().toISOString()
      });
    }
  } else {
    const newTx = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      type: 'spent',
      amount,
      client_payee: payee,
      case_no: caseNo,
      case_name: caseTitle,
      task_id: taskId,
      task_title: taskTitle,
      category,
      ticket_details: ticketDetails,
      payment_mode: mode,
      date,
      note,
      created_at: new Date().toISOString()
    };
    allPaisaTransactions.unshift(newTx);
  }

  savePaisaTransactions(true);
  closePaisaModal('paisaSpendModal');
  showPaisaToast(`✓ Spent ₹${formatPaisaAmount(amount)} recorded successfully`);
}

function openPaisaDetailModal(id) {
  const tx = allPaisaTransactions.find(t => t.id === id);
  if (!tx) return;

  const body = document.getElementById('paisaDetailBody');
  const isRecv = tx.type === 'received';
  const amt = parseFloat(tx.amount) || 0;
  const formattedDate = tx.date ? formatDateDMY(tx.date) : '—';
  const modeIcon = (tx.payment_mode || '').toLowerCase().includes('online') || (tx.payment_mode || '').toLowerCase().includes('upi')
    ? '🌐'
    : ((tx.payment_mode || '').toLowerCase().includes('cheque') ? '📜' : '💵');

  let ticketRow = '';
  if (tx.ticket_details) {
    const td = tx.ticket_details;
    ticketRow = `
      <div class="paisa-detail-row">
        <span class="detail-label"><i class="fa-solid fa-ticket"></i> Ticket Details</span>
        <span class="detail-val">Vendor: <strong>${escapeHtml((td.vendor || '').toUpperCase())}</strong> • Qty: ${td.qty} • Rate: ₹${td.rate}/ticket</span>
      </div>
    `;
  }

  let caseRow = '';
  if (tx.case_no) {
    caseRow = `
      <div class="paisa-detail-row">
        <span class="detail-label"><i class="fa-solid fa-scale-balanced"></i> Linked Case</span>
        <span class="detail-val">
          <a href="javascript:void(0);" class="todo-case-link" onclick="closePaisaModal('paisaDetailModal'); showTab('search'); document.getElementById('globalSearch').value='${escapeHtml(tx.case_no)}'; filterCaseTables(false);" title="View Case">
            ${escapeHtml(tx.case_no)} ↗
          </a>
          ${tx.case_name ? ' <small style="color: #64748b;">(' + escapeHtml(tx.case_name) + ')</small>' : ''}
        </span>
      </div>
    `;
  }

  let taskRow = '';
  if (tx.task_title || tx.task_id) {
    taskRow = `
      <div class="paisa-detail-row">
        <span class="detail-label"><i class="fa-solid fa-list-check"></i> Linked Task</span>
        <span class="detail-val"><strong>${escapeHtml(tx.task_title || tx.task_id)}</strong></span>
      </div>
    `;
  }

  let noteRow = '';
  if (tx.note) {
    noteRow = `
      <div class="paisa-detail-row" style="align-items: flex-start;">
        <span class="detail-label"><i class="fa-solid fa-note-sticky"></i> Note / Remarks</span>
        <span class="detail-val note-text" style="font-weight: 500; color: #334155; line-height: 1.4;">${escapeHtml(tx.note)}</span>
      </div>
    `;
  }

  if (body) {
    body.innerHTML = `
      <div class="paisa-detail-hero ${isRecv ? 'hero-recv' : 'hero-spent'}">
        <div class="detail-hero-tag">${isRecv ? '🟢 RECEIVED / INFLOW' : '🔴 EXPENSE / OUTFLOW'}</div>
        <div class="detail-hero-amt">${isRecv ? '+' : '−'}₹${formatPaisaAmount(amt)}</div>
      </div>
      <div class="paisa-detail-list">
        <div class="paisa-detail-row">
          <span class="detail-label"><i class="fa-solid fa-user"></i> Party / Payee</span>
          <span class="detail-val"><strong>${escapeHtml(tx.client_payee || '—')}</strong></span>
        </div>
        <div class="paisa-detail-row">
          <span class="detail-label"><i class="fa-solid fa-calendar-day"></i> Transaction Date</span>
          <span class="detail-val" style="font-weight: 600;">📅 ${escapeHtml(formattedDate)}</span>
        </div>
        <div class="paisa-detail-row">
          <span class="detail-label"><i class="fa-solid fa-tag"></i> Category</span>
          <span class="detail-val"><span class="paisa-detail-cat-badge">${escapeHtml((tx.category || (isRecv ? 'Client Fee' : 'Expense')).toUpperCase())}</span></span>
        </div>
        <div class="paisa-detail-row">
          <span class="detail-label"><i class="fa-solid fa-wallet"></i> Payment Mode</span>
          <span class="detail-val">${modeIcon} ${escapeHtml(tx.payment_mode || 'Cash')}</span>
        </div>
        ${ticketRow}
        ${caseRow}
        ${taskRow}
        ${noteRow}
      </div>
    `;
  }

  const editBtn = document.getElementById('paisaDetailEditBtn');
  if (editBtn) {
    editBtn.onclick = () => {
      closePaisaModal('paisaDetailModal');
      if (tx.type === 'received') {
        openPaisaReceivedModal(tx.id);
      } else {
        openPaisaSpendModal(tx.id);
      }
    };
  }

  const deleteBtn = document.getElementById('paisaDetailDeleteBtn');
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      deletePaisaTransaction(tx.id);
    };
  }

  const modal = document.getElementById('paisaDetailModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('active');
  }
}

function deletePaisaTransaction(id) {
  const idx = allPaisaTransactions.findIndex(t => t.id === id);
  if (idx === -1) return;

  paisaDeletedItem = {
    index: idx,
    item: allPaisaTransactions[idx]
  };

  allPaisaTransactions.splice(idx, 1);
  savePaisaTransactions(true);
  closePaisaModal('paisaDetailModal');

  showPaisaToastWithUndo(`🗑️ Transaction deleted. <button type="button" class="paisa-toast-undo-btn" onclick="undoPaisaDelete()">UNDO (5s)</button>`);
}

function showPaisaToastWithUndo(htmlContent) {
  const toast = document.getElementById('paisaToast');
  if (!toast) return;

  if (paisaUndoTimer) clearTimeout(paisaUndoTimer);

  toast.innerHTML = htmlContent;
  toast.classList.remove('hidden');
  toast.classList.add('active');

  paisaUndoTimer = setTimeout(() => {
    paisaDeletedItem = null;
    hidePaisaToast();
  }, 5000);
}

function undoPaisaDelete() {
  if (!paisaDeletedItem) return;

  if (paisaUndoTimer) clearTimeout(paisaUndoTimer);

  allPaisaTransactions.splice(paisaDeletedItem.index, 0, paisaDeletedItem.item);
  paisaDeletedItem = null;

  savePaisaTransactions(true);
  hidePaisaToast();
  showPaisaToast('✓ Transaction restored');
}

function showPaisaToast(msg) {
  const toast = document.getElementById('paisaToast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('active');

  setTimeout(() => {
    hidePaisaToast();
  }, 3000);
}

function hidePaisaToast() {
  const toast = document.getElementById('paisaToast');
  if (toast) {
    toast.classList.remove('active');
    toast.classList.add('hidden');
  }
}

function openPaisaReportsModal() {
  const content = document.getElementById('paisaReportsContent');
  const subtitle = document.getElementById('paisaReportsPeriodSubtitle');
  if (!content) return;

  const currentMonthKey = getTodayDateString().slice(0, 7);
  let filtered = [];
  let periodName = 'This Month';

  if (paisaSelectedMonth === 'current') {
    filtered = allPaisaTransactions.filter(t => (t.date || '').startsWith(currentMonthKey));
    periodName = 'This Month';
  } else if (paisaSelectedMonth === 'all') {
    filtered = allPaisaTransactions.slice();
    periodName = 'All Time';
  } else {
    filtered = allPaisaTransactions.filter(t => (t.date || '').startsWith(paisaSelectedMonth));
    const [y, m] = paisaSelectedMonth.split('-');
    const d = new Date(parseInt(y), parseInt(m) - 1, 1);
    periodName = d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  }

  if (subtitle) subtitle.textContent = `Period: ${periodName}`;

  let totalRecv = 0;
  let totalSpent = 0;
  let totalTransferred = 0;
  const catMap = { ticket: 0, travel: 0, court: 0, food: 0, print: 0, other: 0 };
  const caseMap = {};
  let ajaySpent = 0;
  let zameerSpent = 0;

  filtered.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') {
      totalRecv += amt;
    } else if (t.type === 'spent') {
      totalSpent += amt;
      const cat = (t.category || 'other').toLowerCase();
      if (catMap[cat] !== undefined) catMap[cat] += amt;
      else catMap.other += amt;

      if (cat === 'ticket') {
        const v = (t.ticket_details?.vendor || '').toLowerCase();
        if (v === 'zameer' || (t.client_payee || '').toLowerCase().includes('zameer')) zameerSpent += amt;
        else ajaySpent += amt;
      }
    } else if (t.type === 'transfer_to_personal') {
      totalTransferred += amt;
    }

    if (t.case_no) {
      if (!caseMap[t.case_no]) {
        caseMap[t.case_no] = {
          caseNo: t.case_no,
          title: t.case_name || t.case_no,
          received: 0,
          spent: 0
        };
      }
      if (t.type === 'received') caseMap[t.case_no].received += amt;
      else if (t.type === 'spent') caseMap[t.case_no].spent += amt;
    }
  });

  const net = totalRecv - totalSpent - totalTransferred;

  let catRows = '';
  Object.keys(catMap).forEach(k => {
    const amt = catMap[k];
    const pct = totalSpent > 0 ? Math.round((amt / totalSpent) * 100) : 0;
    catRows += `
      <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
        <span>${k.toUpperCase()}</span>
        <span>₹${formatPaisaAmount(amt)} (${pct}%)</span>
      </div>
    `;
  });

  let caseRows = '';
  const caseList = Object.values(caseMap).sort((a, b) => (b.received - b.spent) - (a.received - a.spent));
  if (caseList.length > 0) {
    caseList.slice(0, 5).forEach(c => {
      const cNet = c.received - c.spent;
      caseRows += `
        <div style="display: flex; justify-content: space-between; font-size: 11.5px; padding: 4px 0; border-bottom: 1px dashed #e2e8f0;">
          <span>${escapeHtml(c.caseNo)}</span>
          <span style="color: ${cNet >= 0 ? '#059669' : '#dc2626'}; font-weight: 700;">${cNet >= 0 ? '+' : '−'}₹${formatPaisaAmount(Math.abs(cNet))}</span>
        </div>
      `;
    });
  } else {
    caseRows = `<div style="font-size: 11.5px; color: #94a3b8; font-style: italic;">No case transactions logged</div>`;
  }

  content.innerHTML = `
    <div style="background: #0f172a; color: #ffffff; border-radius: 10px; padding: 14px; margin-bottom: 14px;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 4px;">Summary (${escapeHtml(periodName)})</div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: #34d399; font-size: 14px; font-weight: 700;">+₹${formatPaisaAmount(totalRecv)}</span>
        <span style="color: #f87171; font-size: 14px; font-weight: 700;">−₹${formatPaisaAmount(totalSpent)}</span>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: #cbd5e1;">Net Balance:</span>
        <span style="font-size: 16px; font-weight: 800; color: ${net >= 0 ? '#10b981' : '#f87171'};">${net < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(net))}</span>
      </div>
    </div>

    <div style="margin-bottom: 14px;">
      <h4 style="margin: 0 0 6px 0; font-size: 12.5px; font-weight: 700; color: #334155;">Category Breakdown</h4>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px;">
        ${catRows}
      </div>
    </div>

    <div style="margin-bottom: 14px;">
      <h4 style="margin: 0 0 6px 0; font-size: 12.5px; font-weight: 700; color: #334155;">Top Cases (P&amp;L)</h4>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px;">
        ${caseRows}
      </div>
    </div>

    <div>
      <h4 style="margin: 0 0 6px 0; font-size: 12.5px; font-weight: 700; color: #334155;">Ticket Vendors</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 8px 10px; font-size: 11.5px;">
          <div style="font-weight: 700; color: #1e40af;">Ajay</div>
          <div style="color: #3b82f6; font-size: 13px; font-weight: 800;">₹${formatPaisaAmount(ajaySpent)}</div>
        </div>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 8px 10px; font-size: 11.5px;">
          <div style="font-weight: 700; color: #1e40af;">Zameer</div>
          <div style="color: #3b82f6; font-size: 13px; font-weight: 800;">₹${formatPaisaAmount(zameerSpent)}</div>
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById('paisaReportsModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('active');
  }
}

function sharePaisaWhatsAppReport() {
  const currentMonthKey = getTodayDateString().slice(0, 7);
  let filtered = [];
  let periodName = 'This Month';

  if (paisaSelectedMonth === 'current') {
    filtered = allPaisaTransactions.filter(t => (t.date || '').startsWith(currentMonthKey));
    periodName = 'This Month';
  } else if (paisaSelectedMonth === 'all') {
    filtered = allPaisaTransactions.slice();
    periodName = 'All Time';
  } else {
    filtered = allPaisaTransactions.filter(t => (t.date || '').startsWith(paisaSelectedMonth));
    const [y, m] = paisaSelectedMonth.split('-');
    const d = new Date(parseInt(y), parseInt(m) - 1, 1);
    periodName = d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  }

  let totalRecv = 0;
  let totalSpent = 0;
  let totalTransferred = 0;
  const catMap = { ticket: 0, travel: 0, court: 0, food: 0, print: 0, other: 0 };
  const caseMap = {};

  filtered.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') totalRecv += amt;
    else if (t.type === 'spent') {
      totalSpent += amt;
      const cat = (t.category || 'other').toLowerCase();
      if (catMap[cat] !== undefined) catMap[cat] += amt;
      else catMap.other += amt;
    } else if (t.type === 'transfer_to_personal') {
      totalTransferred += amt;
    }
    if (t.case_no) {
      if (!caseMap[t.case_no]) caseMap[t.case_no] = { caseNo: t.case_no, received: 0, spent: 0 };
      if (t.type === 'received') caseMap[t.case_no].received += amt;
      else if (t.type === 'spent') caseMap[t.case_no].spent += amt;
    }
  });

  const net = totalRecv - totalSpent - totalTransferred;

  let text = `*📊 ADVOCATE FINANCE REPORT*\n`;
  text += `*Period:* ${periodName}\n`;
  text += `-----------------------------\n`;
  text += `🟢 *Total Received:* ₹${formatPaisaAmount(totalRecv)}\n`;
  text += `🔴 *Total Spent:* ₹${formatPaisaAmount(totalSpent)}\n`;
  if (totalTransferred > 0) {
    text += `🟣 *Transferred to Personal:* ₹${formatPaisaAmount(totalTransferred)}\n`;
  }
  text += `💰 *Net Balance:* ${net < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(net))}\n`;
  text += `-----------------------------\n`;
  text += `*Category Breakdown:*\n`;
  Object.keys(catMap).forEach(k => {
    if (catMap[k] > 0) {
      text += `• ${k.charAt(0).toUpperCase() + k.slice(1)}: ₹${formatPaisaAmount(catMap[k])}\n`;
    }
  });
  text += `-----------------------------\n`;
  const caseList = Object.values(caseMap).sort((a, b) => (b.received - b.spent) - (a.received - a.spent));
  if (caseList.length > 0) {
    text += `*Top Cases (P&L):*\n`;
    caseList.slice(0, 3).forEach((c, idx) => {
      const cNet = c.received - c.spent;
      text += `${idx + 1}. ${c.caseNo}: ${cNet >= 0 ? '+' : '−'}₹${formatPaisaAmount(Math.abs(cNet))}\n`;
    });
    text += `-----------------------------\n`;
  }
  text += `_Generated via CaseBook Chambers_`;

  const encoded = encodeURIComponent(text);
  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
}

function closePaisaModal(modalId) {
  const modal = document.getElementById('modalId') || document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.classList.add('hidden');
  }
}

function triggerPaisaDatePicker(inputId) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.focus();
  if (typeof el.showPicker === 'function') {
    try { el.showPicker(); } catch (e) {}
  }
}

function initPaisaTab() {
  loadPaisaFromStorage();
  loadPersonalFromStorage();
  updatePaisaBadge();
  if (currentActiveTabId === 'paisa') {
    renderPaisaTab();
  }
}

window.allPaisaTransactions = allPaisaTransactions;
window.initPaisaTab = initPaisaTab;
window.renderPaisaTab = renderPaisaTab;
window.handlePaisaMonthChange = handlePaisaMonthChange;
window.openPaisaReceivedModal = openPaisaReceivedModal;
window.openPaisaSpendModal = openPaisaSpendModal;
window.closePaisaModal = closePaisaModal;
window.setPaisaMode = setPaisaMode;
window.triggerPaisaDatePicker = triggerPaisaDatePicker;
window.setPaisaSpendCategory = setPaisaSpendCategory;
window.calculatePaisaTicketTotal = calculatePaisaTicketTotal;
window.handlePaisaClientInput = handlePaisaClientInput;
window.handlePaisaClientKeydown = handlePaisaClientKeydown;
window.selectPaisaSuggestion = selectPaisaSuggestion;
window.applyPaisaLinkedCase = applyPaisaLinkedCase;
window.handleSavePaisaReceived = handleSavePaisaReceived;
window.handleSavePaisaSpend = handleSavePaisaSpend;
window.openPaisaDetailModal = openPaisaDetailModal;
window.deletePaisaTransaction = deletePaisaTransaction;
window.undoPaisaDelete = undoPaisaDelete;
window.showPaisaToast = showPaisaToast;
window.hidePaisaToast = hidePaisaToast;
window.openPaisaReportsModal = openPaisaReportsModal;
window.sharePaisaWhatsAppReport = sharePaisaWhatsAppReport;
// New exports
window.openPaisaTransferModal = openPaisaTransferModal;
window.handlePaisaTransferToPersonal = handlePaisaTransferToPersonal;
window.openPaisaPersonalSpendModal = openPaisaPersonalSpendModal;
window.handlePaisaPersonalSpend = handlePaisaPersonalSpend;
window.setPaisaTxnFilter = setPaisaTxnFilter;
window.handlePaisaPeriodChange = handlePaisaPeriodChange;
window.handlePaisaPersonalPeriodChange = handlePaisaPersonalPeriodChange;

// ==============================================================================
// PAISA: Personal Account — localStorage wallet (Supabase-ready)
// ==============================================================================

function loadPersonalFromStorage() {
  try {
    const raw = safeStorage.get('paisa_personal_wallet');
    if (raw) {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (parsed && Array.isArray(parsed.transactions)) {
        allPersonalTransactions = parsed.transactions;
        return;
      }
    }
  } catch (e) {}
  allPersonalTransactions = [];
}

function savePersonalData(updateUi = true) {
  try {
    safeStorage.set('paisa_personal_wallet', JSON.stringify({ transactions: allPersonalTransactions }));
  } catch (e) {
    console.error('Failed to save personal wallet:', e);
  }
  if (updateUi && currentActiveTabId === 'paisa') {
    renderPersonalAccountCard();
    renderPersonalTransactionsFeed();
  }
}

function getPersonalBalance() {
  let balance = 0;
  allPersonalTransactions.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'transfer_in') balance += amt;
    else if (t.type === 'personal_spent') balance -= amt;
  });
  return balance;
}

function getVirtualNetBalance() {
  // Compute current virtual net balance from all paisa transactions
  let recv = 0, spent = 0, transferred = 0;
  allPaisaTransactions.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') recv += amt;
    else if (t.type === 'spent') spent += amt;
    else if (t.type === 'transfer_to_personal') transferred += amt;
  });
  return recv - spent - transferred;
}

function renderPersonalAccountCard() {
  const balanceEl = document.getElementById('paisaPersonalBalance');
  const transferredInEl = document.getElementById('paisaPersonalTransferredIn');
  const spentEl = document.getElementById('paisaPersonalSpentThisMonth');
  const recentListEl = document.getElementById('paisaPersonalRecentList');
  const rangeSel = document.getElementById('paisaPersonalTimeRangeSelect');
  if (!balanceEl) return;

  if (rangeSel && rangeSel.value !== paisaPersonalSelectedPeriod) {
    rangeSel.value = (paisaPersonalSelectedPeriod === 'current') ? 'month' : paisaPersonalSelectedPeriod;
  }

  const balance = getPersonalBalance();
  balanceEl.textContent = `${balance < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(balance))}`;
  balanceEl.style.color = '#ffffff';

  // Period calculations
  const filterFn = getPaisaDateRangeFilter(paisaPersonalSelectedPeriod);
  let periodIn = 0;
  let periodOut = 0;
  allPersonalTransactions.forEach(t => {
    if (filterFn(t)) {
      const amt = parseFloat(t.amount) || 0;
      if (t.type === 'transfer_in') periodIn += amt;
      else if (t.type === 'personal_spent') periodOut += amt;
    }
  });
  if (transferredInEl) transferredInEl.textContent = `₹${formatPaisaAmount(periodIn)}`;
  if (spentEl) spentEl.textContent = `₹${formatPaisaAmount(periodOut)}`;

  // Render personal card mini graph
  renderPaisaPersonalGraph();

  // Last 3 personal expenses (if recent list exists)
  if (!recentListEl) return;
  const spentOnly = allPersonalTransactions
    .filter(t => t.type === 'personal_spent')
    .sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.created_at || '').localeCompare(a.created_at || ''));
  const last3 = spentOnly.slice(0, 3);

  if (last3.length === 0) {
    recentListEl.innerHTML = `<div class="paisa-personal-empty">No personal expenses yet</div>`;
    return;
  }

  let html = '';
  last3.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    const note = escapeHtml(t.note || 'Personal expense');
    const dateStr = t.date ? (() => {
      try {
        const [y, m, d] = t.date.split('-');
        return new Date(parseInt(y), parseInt(m) - 1, parseInt(d)).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      } catch (e) { return t.date; }
    })() : '';
    html += `
      <div class="paisa-personal-recent-item">
        <div class="paisa-personal-recent-icon"><i class="fa-solid fa-minus"></i></div>
        <div class="paisa-personal-recent-info">
          <div class="paisa-personal-recent-note">${note}</div>
          <div class="paisa-personal-recent-date">${dateStr}</div>
        </div>
        <div class="paisa-personal-recent-amt">−₹${formatPaisaAmount(amt)}</div>
      </div>
    `;
  });
  recentListEl.innerHTML = html;
}

function renderPaisaPersonalGraph() {
  const container = document.getElementById('paisaPersonalGraphContainer');
  if (!container) return;

  const currentMonthKey = getTodayDateString().slice(0, 7);
  let thisMonthIn = 0;
  let thisMonthOut = 0;
  (allPersonalTransactions || []).forEach(t => {
    if ((t.date || '').startsWith(currentMonthKey)) {
      const amt = parseFloat(t.amount) || 0;
      if (t.type === 'transfer_in') thisMonthIn += amt;
      else if (t.type === 'personal_spent') thisMonthOut += amt;
    }
  });

  const spendPct = thisMonthIn > 0 ? Math.min(Math.round((thisMonthOut / thisMonthIn) * 100), 100) : (thisMonthOut > 0 ? 100 : 0);
  const savePct = Math.max(100 - spendPct, 0);

  // 7-day personal spend activity
  const dayBars = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayLabel = i === 0 ? 'Today' : (i === 1 ? 'Yest' : d.toLocaleDateString('en-IN', { weekday: 'narrow' }));

    let daySpent = 0;
    (allPersonalTransactions || []).forEach(t => {
      if (t.date === dateStr && t.type === 'personal_spent') {
        daySpent += (parseFloat(t.amount) || 0);
      }
    });
    dayBars.push({ dateStr, dayLabel, daySpent });
  }

  const maxSpend = Math.max(...dayBars.map(b => b.daySpent), 300);

  let barsHtml = '';
  dayBars.forEach(b => {
    const h = Math.max(Math.round((b.daySpent / maxSpend) * 30), b.daySpent > 0 ? 5 : 2);
    const title = `${b.dateStr}: −₹${formatPaisaAmount(b.daySpent)}`;

    barsHtml += `
      <div class="paisa-chart-col" title="${escapeHtml(title)}">
        <div class="paisa-chart-bars-wrap" style="height: 32px; justify-content: flex-end;">
          <div class="paisa-mini-bar bar-personal ${b.daySpent > 0 ? 'has-val' : ''}" style="height: ${h}px; width: 8px;"></div>
        </div>
        <span class="paisa-chart-day-lbl">${b.dayLabel}</span>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="paisa-graph-header">
      <span class="paisa-graph-title" style="color: #c4b5fd;"><i class="fa-solid fa-gauge-high"></i> WALLET RETENTION &amp; DAILY SPENDING</span>
      <div class="paisa-graph-legends">
        <span class="legend-in" style="color: #6ee7b7;"><span class="legend-dot" style="background: #6ee7b7;"></span> Avail ${savePct}%</span>
        <span class="legend-out" style="color: #fca5a5;"><span class="legend-dot" style="background: #fca5a5;"></span> Spent ${spendPct}%</span>
      </div>
    </div>
    <div class="paisa-ratio-track" style="background: rgba(255, 255, 255, 0.1);">
      <div class="paisa-ratio-fill" style="width: ${savePct}%; background: linear-gradient(90deg, #10b981, #34d399);"></div>
      <div class="paisa-ratio-fill" style="width: ${spendPct}%; background: linear-gradient(90deg, #f43f5e, #fb7185);"></div>
    </div>
    <div class="paisa-sparkline-row">
      ${barsHtml}
    </div>
  `;
}

// --- Transfer to Personal Modal ---

function openPaisaTransferModal() {
  const modal = document.getElementById('paisaTransferModal');
  if (!modal) return;
  const form = document.getElementById('paisaTransferForm');
  if (form) form.reset();
  const dateInput = document.getElementById('paisaTransferDate');
  if (dateInput) {
    dateInput.value = getTodayDateString();
  }
  const availEl = document.getElementById('paisaTransferAvailableBalance');
  if (availEl) {
    const net = getVirtualNetBalance();
    availEl.textContent = `₹${formatPaisaAmount(net)}`;
    availEl.style.color = net < 0 ? '#dc2626' : '#059669';
  }
  modal.classList.remove('hidden');
  modal.classList.add('active');
  const amtInput = document.getElementById('paisaTransferAmount');
  if (amtInput) setTimeout(() => amtInput.focus(), 100);
}

function handlePaisaTransferToPersonal(e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('paisaTransferAmount')?.value || 0);
  const note = (document.getElementById('paisaTransferNote')?.value || '').trim();
  const date = document.getElementById('paisaTransferDate')?.value || getTodayDateString();

  if (!amount || amount <= 0) {
    showPaisaToast('⚠️ Please enter a valid amount');
    return;
  }

  const virtualNet = getVirtualNetBalance();
  if (amount > virtualNet) {
    showPaisaToast('⚠️ Insufficient balance in Virtual Account');
    return;
  }

  const txId = `paisa_transfer_${Date.now()}`;
  const personalTxId = `personal_in_${Date.now()}`;
  const now = new Date().toISOString();

  // Record deduction in business transactions as type 'transfer_to_personal' (Virtual DEBIT)
  const businessTx = {
    id: txId,
    type: 'transfer_to_personal',
    amount,
    note: note || 'Transfer to Personal',
    date,
    payment_mode: 'Cash',
    client_payee: '👤 Personal Wallet',
    created_at: now
  };
  allPaisaTransactions.unshift(businessTx);
  savePaisaTransactions(false);

  // Record receipt in personal wallet (Personal CREDIT)
  const personalTx = {
    id: personalTxId,
    type: 'transfer_in',
    amount,
    note: note || 'Transfer from Virtual',
    category: '',
    date,
    created_at: now
  };
  allPersonalTransactions.unshift(personalTx);
  savePersonalData(false);

  // Attempt atomic Supabase sync if connected
  if (typeof ensureSupabaseClient === 'function' && ensureSupabaseClient()) {
    (async () => {
      try {
        await Promise.allSettled([
          supabaseClient.from('transactions').insert([{
            type: 'transfer_to_personal',
            amount,
            mode: 'cash',
            client_payee: 'Personal Wallet',
            note: note || 'Transfer to Personal',
            txn_date: date
          }]),
          supabaseClient.from('personal_transactions').insert([{
            type: 'transfer_in',
            amount,
            note: note || 'Transfer from Virtual',
            txn_date: date
          }])
        ]);
      } catch (err) {
        console.warn('Supabase transfer sync:', err);
      }
    })();
  }

  closePaisaModal('paisaTransferModal');
  showPaisaToast(`✅ ₹${formatPaisaAmount(amount)} transferred to Personal Account`);
  renderPaisaTab();
}

// --- Personal Spend Modal ---

function openPaisaPersonalSpendModal() {
  const modal = document.getElementById('paisaPersonalSpendModal');
  if (!modal) return;
  const form = document.getElementById('paisaPersonalSpendForm');
  if (form) form.reset();
  const dateInput = document.getElementById('paisaPersonalSpendDate');
  if (dateInput) {
    dateInput.value = getTodayDateString();
  }
  modal.classList.remove('hidden');
  modal.classList.add('active');
  const amtInput = document.getElementById('paisaPersonalSpendAmount');
  if (amtInput) setTimeout(() => amtInput.focus(), 100);
}

function handlePaisaPersonalSpend(e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('paisaPersonalSpendAmount')?.value || 0);
  const note = (document.getElementById('paisaPersonalSpendNote')?.value || '').trim();
  const category = document.getElementById('paisaPersonalSpendCategory')?.value || '';
  const date = document.getElementById('paisaPersonalSpendDate')?.value || getTodayDateString();

  if (!amount || amount <= 0) {
    showPaisaToast('⚠️ Please enter a valid amount');
    return;
  }
  if (!note) {
    showPaisaToast('⚠️ Please describe what you spent on');
    return;
  }

  const personalTx = {
    id: `personal_spent_${Date.now()}`,
    type: 'personal_spent',
    amount,
    note,
    category,
    date,
    created_at: new Date().toISOString()
  };
  allPersonalTransactions.unshift(personalTx);
  savePersonalData(false);

  closePaisaModal('paisaPersonalSpendModal');
  showPaisaToast(`✅ Personal expense ₹${formatPaisaAmount(amount)} saved`);
  renderPersonalAccountCard();
  renderPersonalTransactionsFeed();
}

// --- Online / Cash split helper ---

function updatePaisaOnlineCashStats(filteredTransactions) {
  const onlineEl = document.getElementById('paisaRecvOnline');
  const cashEl = document.getElementById('paisaRecvCash');
  if (!onlineEl || !cashEl) return;

  let onlineTotal = 0;
  let cashTotal = 0;

  filteredTransactions.forEach(t => {
    if (t.type !== 'received') return;
    const amt = parseFloat(t.amount) || 0;
    const mode = (t.payment_mode || 'Cash').toLowerCase();
    // 'cash' → Cash; anything else (upi, bank, online, transfer) → Online
    if (mode === 'cash') cashTotal += amt;
    else onlineTotal += amt;
  });

  onlineEl.textContent = `₹${formatPaisaAmount(onlineTotal)}`;
  cashEl.textContent = `₹${formatPaisaAmount(cashTotal)}`;
}

// --- Transaction Multi-Filter & Search State ---
let paisaTxnSearchQuery = '';
let paisaTxnModeFilter = 'all'; // 'all' | 'cash' | 'online'
let paisaPersonalTxnSearchQuery = '';

function handlePaisaTxnSearch(val) {
  paisaTxnSearchQuery = (val || '').trim().toLowerCase();
  const clearBtn = document.getElementById('paisaSearchClearBtn');
  if (clearBtn) clearBtn.classList.toggle('hidden', !paisaTxnSearchQuery);
  const filterFn = getPaisaDateRangeFilter(paisaSelectedPeriod);
  const filtered = allPaisaTransactions.filter(filterFn);
  renderPaisaTransactionsFeed(getFilteredPaisaTxns(filtered));
}

function clearPaisaTxnSearch() {
  paisaTxnSearchQuery = '';
  const input = document.getElementById('paisaTxnSearchInput');
  const clearBtn = document.getElementById('paisaSearchClearBtn');
  if (input) input.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');
  const filterFn = getPaisaDateRangeFilter(paisaSelectedPeriod);
  const filtered = allPaisaTransactions.filter(filterFn);
  renderPaisaTransactionsFeed(getFilteredPaisaTxns(filtered));
}

function handlePaisaModeFilterChange(val) {
  paisaTxnModeFilter = val || 'all';
  const filterFn = getPaisaDateRangeFilter(paisaSelectedPeriod);
  const filtered = allPaisaTransactions.filter(filterFn);
  renderPaisaTransactionsFeed(getFilteredPaisaTxns(filtered));
}

function handlePaisaPersonalTxnSearch(val) {
  paisaPersonalTxnSearchQuery = (val || '').trim().toLowerCase();
  const clearBtn = document.getElementById('paisaPersonalSearchClearBtn');
  if (clearBtn) clearBtn.classList.toggle('hidden', !paisaPersonalTxnSearchQuery);
  renderPersonalTransactionsFeed();
}

function clearPaisaPersonalTxnSearch() {
  paisaPersonalTxnSearchQuery = '';
  const input = document.getElementById('paisaPersonalTxnSearchInput');
  const clearBtn = document.getElementById('paisaPersonalSearchClearBtn');
  if (input) input.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');
  renderPersonalTransactionsFeed();
}

function getFilteredPaisaTxns(baseList) {
  let list = baseList || allPaisaTransactions.filter(getPaisaDateRangeFilter(paisaSelectedPeriod));

  // 1. Type filter
  if (paisaTxnFilter === 'business') {
    list = list.filter(t => t.type === 'received' || t.type === 'spent');
  } else if (paisaTxnFilter === 'received') {
    list = list.filter(t => t.type === 'received');
  } else if (paisaTxnFilter === 'spent') {
    list = list.filter(t => t.type === 'spent');
  } else if (paisaTxnFilter === 'personal') {
    list = list.filter(t => t.type === 'transfer_to_personal');
  }

  // 2. Mode filter (Cash vs Online)
  if (paisaTxnModeFilter === 'cash') {
    list = list.filter(t => (t.payment_mode || 'Cash').toLowerCase().includes('cash'));
  } else if (paisaTxnModeFilter === 'online') {
    list = list.filter(t => {
      const m = (t.payment_mode || '').toLowerCase();
      return m.includes('online') || m.includes('upi') || m.includes('bank') || m.includes('cheque');
    });
  }

  // 3. Search query filter
  if (paisaTxnSearchQuery) {
    const q = paisaTxnSearchQuery;
    list = list.filter(t => {
      const payee = (t.client_payee || '').toLowerCase();
      const caseNo = (t.case_no || '').toLowerCase();
      const caseName = (t.case_name || '').toLowerCase();
      const note = (t.note || '').toLowerCase();
      const cat = (t.category || '').toLowerCase();
      const amt = String(t.amount || '');
      return payee.includes(q) || caseNo.includes(q) || caseName.includes(q) || note.includes(q) || cat.includes(q) || amt.includes(q);
    });
  }

  return list;
}

function setPaisaTxnFilter(filter, btn) {
  paisaTxnFilter = filter;
  const row = document.getElementById('paisaTxnFilterRow');
  if (row) {
    row.querySelectorAll('.paisa-txn-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
  const filterFn = getPaisaDateRangeFilter(paisaSelectedPeriod);
  const filtered = allPaisaTransactions.filter(filterFn);
  renderPaisaTransactionsFeed(getFilteredPaisaTxns(filtered));
}

// --- Paisa Account Tab Switcher (Virtual vs Personal) ---

let currentPaisaAccountTab = 'virtual';
let paisaPersonalTxnFilter = 'all';

function switchPaisaAccountTab(tab) {
  currentPaisaAccountTab = tab || 'virtual';
  const virtualView = document.getElementById('paisaVirtualView');
  const personalView = document.getElementById('paisaPersonalView');
  const virtualBtn = document.getElementById('paisaTabVirtualBtn');
  const personalBtn = document.getElementById('paisaTabPersonalBtn');

  if (currentPaisaAccountTab === 'personal') {
    if (virtualView) virtualView.classList.add('hidden');
    if (personalView) personalView.classList.remove('hidden');
    if (virtualBtn) {
      virtualBtn.classList.remove('active');
      virtualBtn.setAttribute('aria-selected', 'false');
    }
    if (personalBtn) {
      personalBtn.classList.add('active');
      personalBtn.setAttribute('aria-selected', 'true');
    }
    renderPersonalAccountCard();
    renderPersonalTransactionsFeed();
  } else {
    if (virtualView) virtualView.classList.remove('hidden');
    if (personalView) personalView.classList.add('hidden');
    if (virtualBtn) {
      virtualBtn.classList.add('active');
      virtualBtn.setAttribute('aria-selected', 'true');
    }
    if (personalBtn) {
      personalBtn.classList.remove('active');
      personalBtn.setAttribute('aria-selected', 'false');
    }
    renderPaisaTab();
  }
}

function setPaisaPersonalTxnFilter(filter, btn) {
  paisaPersonalTxnFilter = filter || 'all';
  const row = document.getElementById('paisaPersonalTxnFilterRow');
  if (row) {
    row.querySelectorAll('.paisa-txn-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
  renderPersonalTransactionsFeed();
}

function renderPersonalTransactionsFeed() {
  const container = document.getElementById('paisaPersonalTransactionsFeed');
  const badge = document.getElementById('paisaPersonalTxnCountBadge');
  if (!container) return;

  const filterFn = getPaisaDateRangeFilter(paisaPersonalSelectedPeriod);
  let list = (allPersonalTransactions || []).filter(filterFn);
  if (paisaPersonalTxnFilter === 'transfer_in') {
    list = list.filter(t => t.type === 'transfer_in');
  } else if (paisaPersonalTxnFilter === 'personal_spent') {
    list = list.filter(t => t.type === 'personal_spent');
  }

  if (badge) badge.textContent = list.length;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="paisa-empty-feed">
        <div style="font-size: 28px; margin-bottom: 6px;">👛</div>
        <div style="font-weight: 700; color: #334155; margin-bottom: 4px;">No personal transactions yet</div>
        <div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Transfer money from Virtual Account or record personal spendings.</div>
        <div style="display: flex; gap: 8px; justify-content: center;">
          <button type="button" class="paisa-personal-btn paisa-transfer-btn" onclick="openPaisaTransferModal()" style="font-size: 12px; padding: 6px 14px; min-height: 36px;"><i class="fa-solid fa-arrow-up-from-bracket"></i> Transfer In</button>
          <button type="button" class="paisa-personal-btn paisa-personal-spend-btn" onclick="openPaisaPersonalSpendModal()" style="font-size: 12px; padding: 6px 14px; min-height: 36px;"><i class="fa-solid fa-minus-circle"></i> Personal Spent</button>
        </div>
      </div>
    `;
    return;
  }

  const sorted = list.slice().sort((a, b) => {
    const dateCmp = (b.date || '').localeCompare(a.date || '');
    if (dateCmp !== 0) return dateCmp;
    return (b.created_at || '').localeCompare(a.created_at || '');
  });

  const displayList = sorted.slice(0, 30);
  const todayStr = getTodayDateString();
  const yestDate = new Date();
  yestDate.setDate(yestDate.getDate() - 1);
  const yesterdayStr = `${yestDate.getFullYear()}-${String(yestDate.getMonth() + 1).padStart(2, '0')}-${String(yestDate.getDate()).padStart(2, '0')}`;

  const groups = {};
  displayList.forEach(t => {
    const d = t.date || todayStr;
    if (!groups[d]) groups[d] = [];
    groups[d].push(t);
  });

  let html = '';
  const dateKeys = Object.keys(groups).sort().reverse();

  dateKeys.forEach(dateKey => {
    let headerLabel = dateKey;
    if (dateKey === todayStr) {
      headerLabel = 'Today';
    } else if (dateKey === yesterdayStr) {
      headerLabel = 'Yesterday';
    } else {
      try {
        const [y, m, day] = dateKey.split('-');
        const parsedD = new Date(parseInt(y), parseInt(m) - 1, parseInt(day));
        headerLabel = parsedD.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      } catch (e) {
        headerLabel = dateKey;
      }
    }

    let dailyIn = 0;
    let dailyOut = 0;
    groups[dateKey].forEach(t => {
      const amt = parseFloat(t.amount) || 0;
      if (t.type === 'transfer_in') dailyIn += amt;
      else if (t.type === 'personal_spent') dailyOut += amt;
    });

    let summaryHtml = '';
    if (dailyIn > 0 || dailyOut > 0) {
      const parts = [];
      if (dailyIn > 0) parts.push(`<span class="paisa-daily-pill pill-earning"><i class="fa-solid fa-arrow-trend-up"></i> +₹${formatPaisaAmount(dailyIn)}</span>`);
      if (dailyOut > 0) parts.push(`<span class="paisa-daily-pill pill-expense"><i class="fa-solid fa-arrow-trend-down"></i> −₹${formatPaisaAmount(dailyOut)}</span>`);
      summaryHtml = `<div class="paisa-daily-summary">${parts.join('')}</div>`;
    }

    let mobileCardsHtml = '';
    let desktopTableRowsHtml = '';

    groups[dateKey].forEach(t => {
      const isIn = t.type === 'transfer_in';
      const amt = parseFloat(t.amount) || 0;
      const iconHtml = isIn
        ? `<div class="paisa-tx-icon tx-icon-recv"><i class="fa-solid fa-arrow-down-left"></i></div>`
        : `<div class="paisa-tx-icon tx-icon-spend" style="background: #fdf2f8; color: #db2777;"><i class="fa-solid fa-bag-shopping"></i></div>`;
      const pillClass = isIn ? 'pill-recv' : 'pill-spend';
      const pillSign = isIn ? '+' : '−';
      const typeBadge = isIn
        ? `<span class="paisa-table-type-pill type-recv"><i class="fa-solid fa-arrow-down-left"></i> Transferred In</span>`
        : `<span class="paisa-table-type-pill type-spend"><i class="fa-solid fa-bag-shopping"></i> Spent</span>`;
      const payeeLabel = isIn ? 'Transferred from Virtual' : escapeHtml(t.note || 'Personal Expense');
      const subLine = isIn ? (t.note ? escapeHtml(t.note) : 'Wallet Inflow') : (t.category ? escapeHtml(t.category.toUpperCase()) : 'Personal Outflow');

      // 1. Mobile card
      mobileCardsHtml += `
        <div class="paisa-tx-row">
          ${iconHtml}
          <div class="paisa-tx-info">
            <div class="tx-payee-title">${payeeLabel}</div>
            <div class="tx-sub-meta">${subLine}</div>
          </div>
          <div class="paisa-tx-trailing">
            <div class="tx-amt-pill ${pillClass}">
              ${pillSign}₹${formatPaisaAmount(amt)}
            </div>
          </div>
        </div>
      `;

      // 2. Desktop table row
      desktopTableRowsHtml += `
        <tr class="paisa-table-row ${isIn ? 'row-recv' : 'row-spend'}">
          <td>${typeBadge}</td>
          <td>
            <div class="table-payee-name">${payeeLabel}</div>
          </td>
          <td>
            <div class="table-meta-text">${subLine}</div>
          </td>
          <td style="text-align: right;">
            <span class="tx-amt-pill ${pillClass}">${pillSign}₹${formatPaisaAmount(amt)}</span>
          </td>
        </tr>
      `;
    });

    html += `
      <div class="paisa-date-group-block">
        <div class="paisa-date-group-header">
          <div class="paisa-date-badge">
            <i class="fa-regular fa-calendar-days"></i>
            <span>${headerLabel}</span>
          </div>
          ${summaryHtml}
        </div>

        <!-- Mobile Card Feed View -->
        <div class="paisa-tx-cards-mobile">
          ${mobileCardsHtml}
        </div>

        <!-- Desktop Table View -->
        <div class="paisa-tx-table-desktop">
          <table class="paisa-desktop-table">
            <thead>
              <tr>
                <th style="width: 140px;">Type</th>
                <th>Description / Payee</th>
                <th style="width: 180px;">Category &amp; Remarks</th>
                <th style="width: 130px; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${desktopTableRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ==============================================================================
// PAISA: Export Statement as Image (High-DPI Retina PNG)
// ==============================================================================

function exportPaisaStatementAsImage(accountType = 'virtual') {
  try {
    const isPersonal = accountType === 'personal';
    const periodKey = isPersonal ? (paisaPersonalSelectedPeriod || 'month') : (paisaSelectedPeriod || 'month');
    const periodLabel = getPaisaPeriodLabel(periodKey);
    const filterFn = getPaisaDateRangeFilter(periodKey);
    
    let rawList = isPersonal
      ? (allPersonalTransactions || []).filter(filterFn)
      : getFilteredPaisaTxns(allPaisaTransactions.filter(filterFn));

    // Sort by date descending
    const sortedList = rawList.slice().sort((a, b) => {
      const dateCmp = (b.date || '').localeCompare(a.date || '');
      if (dateCmp !== 0) return dateCmp;
      return (b.created_at || '').localeCompare(a.created_at || '');
    }).slice(0, 35); // top 35 entries for clean image layout

    // Compute totals
    let totalIn = 0;
    let totalOut = 0;
    rawList.forEach(t => {
      const amt = parseFloat(t.amount) || 0;
      if (isPersonal) {
        if (t.type === 'transfer_in') totalIn += amt;
        else if (t.type === 'personal_spent') totalOut += amt;
      } else {
        if (t.type === 'received') totalIn += amt;
        else if (t.type === 'spent' || t.type === 'transfer_to_personal') totalOut += amt;
      }
    });
    const net = totalIn - totalOut;

    // High-DPI canvas setup (2x resolution for crystal clear export)
    const scale = 2;
    const width = 860;
    const headerHeight = 190;
    const rowHeight = 38;
    const tableHeaderHeight = 36;
    const footerHeight = 60;
    const tableHeight = Math.max(sortedList.length, 1) * rowHeight + tableHeaderHeight;
    const height = headerHeight + tableHeight + footerHeight;

    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // 1. Background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (isPersonal) {
      bgGrad.addColorStop(0, '#1e0840');
      bgGrad.addColorStop(0.5, '#2e1065');
      bgGrad.addColorStop(1, '#0f0524');
    } else {
      bgGrad.addColorStop(0, '#0b132b');
      bgGrad.addColorStop(0.5, '#1c2541');
      bgGrad.addColorStop(1, '#090e1a');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle ambient top glow
    const glowGrad = ctx.createRadialGradient(width / 2, 0, 10, width / 2, 0, 450);
    glowGrad.addColorStop(0, isPersonal ? 'rgba(168, 85, 247, 0.25)' : 'rgba(56, 189, 248, 0.2)');
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, width, 220);

    // 2. Header
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif, -apple-system';
    ctx.fillText('⚖️ Chambers of Atul Kumar Mishra', 30, 42);

    ctx.fillStyle = isPersonal ? '#c4b5fd' : '#94a3b8';
    ctx.font = '500 12px sans-serif';
    ctx.fillText('Advocate & Legal Consultant • Finance & Account Ledger', 30, 62);

    // Statement title & Period Pill
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 17px sans-serif';
    const stmtTitle = isPersonal ? '👛 PERSONAL WALLET STATEMENT' : '💰 VIRTUAL ACCOUNT STATEMENT';
    ctx.fillText(stmtTitle, 30, 96);

    // Period pill badge
    ctx.fillStyle = isPersonal ? 'rgba(233, 213, 255, 0.2)' : 'rgba(56, 189, 248, 0.2)';
    ctx.beginPath();
    ctx.roundRect(width - 240, 26, 210, 28, 14);
    ctx.fill();
    ctx.fillStyle = isPersonal ? '#e9d5ff' : '#38bdf8';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`📅 Period: ${periodLabel}`, width - 135, 44);
    ctx.textAlign = 'left';

    // 3. Summary Metric Cards
    const boxY = 115;
    const boxW = (width - 60 - 24) / 3;
    const boxH = 55;

    // Card 1: Total Received / Inflow
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(30, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 10px sans-serif';
    ctx.fillText(isPersonal ? 'TOTAL TRANSFERRED IN' : 'TOTAL RECEIVED', 42, boxY + 20);
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText(`+₹${formatPaisaAmount(totalIn)}`, 42, boxY + 43);

    // Card 2: Total Spent / Outflow
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(30 + boxW + 12, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 10px sans-serif';
    ctx.fillText(isPersonal ? 'PERSONAL SPENT' : 'TOTAL SPENT', 42 + boxW + 12, boxY + 20);
    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText(`−₹${formatPaisaAmount(totalOut)}`, 42 + boxW + 12, boxY + 43);

    // Card 3: Net Balance
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(30 + (boxW + 12) * 2, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '600 10px sans-serif';
    ctx.fillText(isPersonal ? 'NET SURPLUS / BALANCE' : 'NET OPERATING BALANCE', 42 + (boxW + 12) * 2, boxY + 20);
    ctx.fillStyle = net >= 0 ? '#38bdf8' : '#f87171';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText(`${net < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(net))}`, 42 + (boxW + 12) * 2, boxY + 43);

    // 4. Ledger Table Header
    const tableStartY = headerHeight + 5;
    ctx.fillStyle = isPersonal ? 'rgba(76, 29, 149, 0.6)' : 'rgba(30, 41, 59, 0.7)';
    ctx.beginPath();
    ctx.roundRect(30, tableStartY, width - 60, tableHeaderHeight, [6, 6, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('DATE', 44, tableStartY + 22);
    ctx.fillText('TYPE', 125, tableStartY + 22);
    ctx.fillText('PARTY / DESCRIPTION', 220, tableStartY + 22);
    ctx.fillText('CASE & NOTE', 460, tableStartY + 22);
    ctx.fillText('MODE', 670, tableStartY + 22);
    ctx.textAlign = 'right';
    ctx.fillText('AMOUNT', width - 44, tableStartY + 22);
    ctx.textAlign = 'left';

    // 5. Ledger Table Rows
    let curY = tableStartY + tableHeaderHeight;
    if (sortedList.length === 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(30, curY, width - 60, rowHeight);
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'italic 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No transactions recorded for this period', width / 2, curY + 24);
      ctx.textAlign = 'left';
      curY += rowHeight;
    } else {
      sortedList.forEach((t, idx) => {
        const isEven = idx % 2 === 0;
        ctx.fillStyle = isEven ? 'rgba(255, 255, 255, 0.025)' : 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(30, curY, width - 60, rowHeight);

        // Border bottom line
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.fillRect(30, curY + rowHeight - 1, width - 60, 1);

        const isRecv = isPersonal ? (t.type === 'transfer_in') : (t.type === 'received');
        const isTransfer = !isPersonal && t.type === 'transfer_to_personal';
        const amt = parseFloat(t.amount) || 0;

        // Date
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '11px sans-serif';
        const dateText = t.date || '—';
        ctx.fillText(dateText, 44, curY + 24);

        // Type Tag Pill
        const typePillX = 125;
        const typePillY = curY + 9;
        ctx.beginPath();
        ctx.roundRect(typePillX, typePillY, 78, 20, 4);
        if (isRecv) {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
          ctx.fill();
          ctx.fillStyle = '#34d399';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText(isPersonal ? '📥 INFLOW' : '🟢 RECEIVED', typePillX + 6, typePillY + 14);
        } else if (isTransfer) {
          ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
          ctx.fill();
          ctx.fillStyle = '#c4b5fd';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText('👤 TRANSFER', typePillX + 6, typePillY + 14);
        } else {
          ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
          ctx.fill();
          ctx.fillStyle = '#f87171';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText('🔴 EXPENSE', typePillX + 6, typePillY + 14);
        }

        // Party / Payee
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 11.5px sans-serif';
        const payeeText = (t.client_payee || (isPersonal ? (t.type === 'transfer_in' ? 'Virtual Account' : 'Personal Spend') : 'Expense'));
        ctx.fillText(payeeText.length > 28 ? payeeText.slice(0, 26) + '…' : payeeText, 220, curY + 24);

        // Case & Note
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px sans-serif';
        const noteText = [t.case_no ? `[${t.case_no}]` : '', t.note || t.category || ''].filter(Boolean).join(' ');
        ctx.fillText(noteText.length > 28 ? noteText.slice(0, 26) + '…' : (noteText || '—'), 460, curY + 24);

        // Mode
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10.5px sans-serif';
        ctx.fillText(isTransfer ? 'Transfer' : (t.payment_mode || 'Cash'), 670, curY + 24);

        // Amount
        ctx.textAlign = 'right';
        ctx.font = 'bold 12.5px sans-serif';
        ctx.fillStyle = isRecv ? '#34d399' : '#f87171';
        ctx.fillText(`${isRecv ? '+' : '−'}₹${formatPaisaAmount(amt)}`, width - 44, curY + 24);
        ctx.textAlign = 'left';

        curY += rowHeight;
      });
    }

    // 6. Footer
    const footerY = curY + 15;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(30, footerY, width - 60, 1);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    const timeNow = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    ctx.fillText(`Generated on ${timeNow} • Total Records: ${rawList.length}`, 30, footerY + 20);

    ctx.textAlign = 'right';
    ctx.fillText('CaseBook Legal Management System • Official Financial Audit Trail', width - 30, footerY + 20);
    ctx.textAlign = 'left';

    // 7. Trigger PNG Download
    const downloadDate = getTodayDateString();
    const fileName = `paisa_${accountType}_statement_${downloadDate}.png`;
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showPaisaToast(`📸 Statement image exported successfully (${fileName})`);
  } catch (err) {
    console.error('Failed to export statement image:', err);
    showPaisaToast('⚠️ Failed to export image. Please try again.');
  }
}

window.switchPaisaAccountTab = switchPaisaAccountTab;
window.setPaisaPersonalTxnFilter = setPaisaPersonalTxnFilter;
window.renderPersonalTransactionsFeed = renderPersonalTransactionsFeed;
window.renderPersonalAccountCard = renderPersonalAccountCard;
window.handlePaisaTxnSearch = handlePaisaTxnSearch;
window.clearPaisaTxnSearch = clearPaisaTxnSearch;
window.handlePaisaModeFilterChange = handlePaisaModeFilterChange;
window.handlePaisaPersonalTxnSearch = handlePaisaPersonalTxnSearch;
window.clearPaisaPersonalTxnSearch = clearPaisaPersonalTxnSearch;
window.exportPaisaStatementAsImage = exportPaisaStatementAsImage;

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
window.toggleDocInlinePreview = toggleDocInlinePreview;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
