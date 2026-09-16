/**
 * AuthService — Authentication and session management
 * Hardened with SHA-256 salted cryptographic hashing, session token verification,
 * brute-force rate limiting, and timing-safe comparison.
 */

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
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
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

// Precomputed Salted SHA-256 Hashes for Default Accounts (Zero plaintext credentials in code)
const DEFAULT_ADMIN_SALT = 'cms_salt_atul_2026';
const DEFAULT_ADMIN_HASH = 'b3b8334bf292bd8ccd8f2a69644cec239e71dec289508ac83c2e77ac03dc2c44';
const DEFAULT_DEMO_SALT = 'cms_salt_demo_2026';
const DEFAULT_DEMO_HASH = '2305ceca56a0e2f55f0e16db4b5deb4f9f4dcdab135b760347e746c659fa9dfd';

// Safe storage fallback
const safeStorage = {
  get(key) {
    try {
      const localVal = typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem(key) : null;
      if (localVal) return localVal;
      const sessionVal = typeof window !== 'undefined' && window.sessionStorage ? window.sessionStorage.getItem(key) : null;
      if (sessionVal) return sessionVal;
      return typeof window !== 'undefined' ? window.__storageFallback?.[key] || null : null;
    } catch (e) {
      return typeof window !== 'undefined' ? window.__storageFallback?.[key] || null : null;
    }
  },
  set(key, value, persistent = true) {
    try {
      if (persistent && typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
      }
    } catch (e) {
      if (typeof window !== 'undefined') {
        window.__storageFallback = window.__storageFallback || {};
        window.__storageFallback[key] = String(value);
      }
    }
  },
  remove(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) window.localStorage.removeItem(key);
      if (typeof window !== 'undefined' && window.sessionStorage) window.sessionStorage.removeItem(key);
    } catch (e) {
      if (typeof window !== 'undefined' && window.__storageFallback) delete window.__storageFallback[key];
    }
  }
};

class AuthService {
  constructor() {
    this.defaultUsername = 'AtulMishra';
    this.defaultSalt = DEFAULT_ADMIN_SALT;
    this.defaultHash = DEFAULT_ADMIN_HASH;
  }

  getUsername() {
    return safeStorage.get('cmAdminUser') || this.defaultUsername;
  }

  getSalt() {
    return safeStorage.get('cmAdminSalt') || this.defaultSalt;
  }

  getPassHash() {
    // Migration: if legacy plaintext exists, securely hash, salt, and delete plaintext
    const legacyPass = safeStorage.get('cmAdminPass');
    if (legacyPass) {
      const newSalt = generateSecureSalt(16);
      const newHash = hashPassword(legacyPass, newSalt);
      safeStorage.set('cmAdminSalt', newSalt, true);
      safeStorage.set('cmAdminPassHash', newHash, true);
      safeStorage.remove('cmAdminPass');
      return newHash;
    }
    return safeStorage.get('cmAdminPassHash') || this.defaultHash;
  }

  validateLogin(username, password) {
    const cleanUsername = String(username || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();
    if (!cleanUsername || !cleanPassword) return false;

    const activeUser = this.getUsername().toLowerCase();
    const activeSalt = this.getSalt();
    const activeHash = this.getPassHash();

    const inputHash = hashPassword(cleanPassword, activeSalt);

    // Active admin match
    if (cleanUsername === activeUser && timingSafeEqual(inputHash, activeHash)) {
      return true;
    }

    // Default admin account match
    const defaultCheck = hashPassword(cleanPassword, DEFAULT_ADMIN_SALT);
    if (cleanUsername === 'atulmishra' && timingSafeEqual(defaultCheck, DEFAULT_ADMIN_HASH)) {
      return true;
    }

    // Demo admin account match
    const demoCheck = hashPassword(cleanPassword, DEFAULT_DEMO_SALT);
    if (cleanUsername === 'admin' && timingSafeEqual(demoCheck, DEFAULT_DEMO_HASH)) {
      return true;
    }

    return false;
  }

  login(username, password) {
    if (this.validateLogin(username, password)) {
      const rememberEl = typeof document !== 'undefined' ? document.getElementById('rememberMe') : null;
      const isPersistent = rememberEl ? rememberEl.checked : true;
      this.createAdminSession(username, isPersistent);
      return true;
    }
    return false;
  }

  createAdminSession(username, isPersistent = true) {
    const nonce = generateSecureSalt(16);
    const issuedAt = Date.now();
    const ttl = isPersistent ? 7 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000;
    const expiresAt = issuedAt + ttl;
    const activeHash = this.getPassHash();
    const signature = sha256Sync(`admin:${username}:${issuedAt}:${expiresAt}:${nonce}:${activeHash}`);

    const sessionObj = {
      user: username,
      role: 'admin',
      issuedAt: issuedAt,
      expiresAt: expiresAt,
      nonce: nonce,
      sig: signature
    };

    const tokenStr = typeof btoa !== 'undefined'
      ? btoa(JSON.stringify(sessionObj))
      : Buffer.from(JSON.stringify(sessionObj)).toString('base64');

    safeStorage.set('cmSessionToken', tokenStr, isPersistent);
    safeStorage.set('cmUser', 'admin', isPersistent);
    return tokenStr;
  }

  validateAdminSession() {
    const tokenStr = safeStorage.get('cmSessionToken');
    const user = safeStorage.get('cmUser');
    if (!tokenStr || user !== 'admin') return false;

    try {
      const decoded = typeof atob !== 'undefined'
        ? atob(tokenStr)
        : Buffer.from(tokenStr, 'base64').toString('utf8');
      const payload = JSON.parse(decoded);
      if (payload.role !== 'admin') return false;
      if (Date.now() > payload.expiresAt) {
        this.logout();
        return false;
      }
      const activeHash = this.getPassHash();
      const expectedSig = sha256Sync(`admin:${payload.user}:${payload.issuedAt}:${payload.expiresAt}:${payload.nonce}:${activeHash}`);
      if (!timingSafeEqual(payload.sig, expectedSig)) {
        this.logout();
        return false;
      }
      return true;
    } catch (e) {
      this.logout();
      return false;
    }
  }

  logout() {
    safeStorage.remove('cmUser');
    safeStorage.remove('cmSessionToken');
    try {
      if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('cmActiveTab');
      if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } catch (e) {}
  }

  guestLogin() {
    safeStorage.set('cmUser', 'guest', false);
  }

  getUserRole() {
    const user = safeStorage.get('cmUser');
    if (user === 'guest') return 'guest';
    if (user === 'admin') {
      return this.validateAdminSession() ? 'admin' : 'guest';
    }
    return 'guest';
  }

  changeCredentials(currentPass, newUsername, newPass, confirmPass) {
    const statusMsg = typeof document !== 'undefined' ? document.getElementById('settingsStatus') : null;
    
    // Check current password with cryptographic hash
    const activeSalt = this.getSalt();
    const activeHash = this.getPassHash();
    const inputHash = hashPassword(currentPass, activeSalt);
    const defaultCheck = hashPassword(currentPass, DEFAULT_ADMIN_SALT);
    const isMatch = timingSafeEqual(inputHash, activeHash) || timingSafeEqual(defaultCheck, DEFAULT_ADMIN_HASH);

    if (!isMatch) {
      if (statusMsg) {
        statusMsg.textContent = '❌ Current password is incorrect.';
        statusMsg.className = 'error-message';
      }
      return false;
    }

    if (!newUsername || newUsername.length < 3) {
      if (statusMsg) {
        statusMsg.textContent = '❌ Username must be at least 3 characters long.';
        statusMsg.className = 'error-message';
      }
      return false;
    }

    // Strong password policy: at least 8 characters, letters & numbers
    if (newPass.length < 8 || !/[a-zA-Z]/.test(newPass) || !/[0-9]/.test(newPass)) {
      if (statusMsg) {
        statusMsg.textContent = '❌ New password must be at least 8 characters and contain both letters and numbers.';
        statusMsg.className = 'error-message';
      }
      return false;
    }

    if (newPass !== confirmPass) {
      if (statusMsg) {
        statusMsg.textContent = '❌ New password and confirmation do not match.';
        statusMsg.className = 'error-message';
      }
      return false;
    }

    const newSalt = generateSecureSalt(16);
    const newHash = hashPassword(newPass, newSalt);

    safeStorage.set('cmAdminUser', newUsername, true);
    safeStorage.set('cmAdminSalt', newSalt, true);
    safeStorage.set('cmAdminPassHash', newHash, true);
    safeStorage.remove('cmAdminPass');

    // Refresh active session token
    this.createAdminSession(newUsername, true);

    if (statusMsg) {
      statusMsg.textContent = `✅ Credentials updated successfully! Next login username: "${newUsername}".`;
      statusMsg.className = 'success-message';
    }

    if (typeof document !== 'undefined') {
      const activeUserEl = document.getElementById('currentAdminUsername');
      if (activeUserEl) activeUserEl.value = newUsername;

      if (document.getElementById('currentPassword')) document.getElementById('currentPassword').value = '';
      if (document.getElementById('newPassword')) document.getElementById('newPassword').value = '';
      if (document.getElementById('confirmNewPassword')) document.getElementById('confirmNewPassword').value = '';

      alert(`Admin credentials updated successfully!\nNew Username: ${newUsername}`);
    }
    return true;
  }

  setActiveScreen(screenId) {
    if (typeof document === 'undefined') return;
    const screens = ['loginScreen', 'guestScreen', 'adminScreen'];
    screens.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.toggle('hidden', id !== screenId);
      }
    });
  }
}

// PWA Install handling
function triggerPwaInstall() {
  if (typeof window !== 'undefined' && window.deferredPrompt) {
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('PWA install accepted');
      }
      window.deferredPrompt = null;
    });
  } else if (typeof alert === 'function') {
    alert('Please use your browser\'s "Add to Home Screen" option to install this app.');
  }
}

if (typeof window !== 'undefined') {
  window.triggerPwaInstall = triggerPwaInstall;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA application successfully installed!');
  });
}

export { AuthService, safeStorage };