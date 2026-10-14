import { describe, it, expect, beforeEach } from 'vitest';
import '../admin.js';

describe('admin.js - Security & Cryptographic Utilities', () => {
  it('escapeHtml should properly encode HTML characters to prevent XSS', () => {
    expect(window.escapeHtml).toBeDefined();
    const unsafe = '<script>alert("XSS & \'hack\'")</script>';
    const safe = window.escapeHtml(unsafe);
    expect(safe).toBe('&lt;script&gt;alert(&quot;XSS &amp; &#039;hack&#039;&quot;)&lt;/script&gt;');
    expect(window.escapeHtml(null)).toBe('');
    expect(window.escapeHtml(undefined)).toBe('');
    expect(window.escapeHtml(123)).toBe('123');
  });

  it('safeUrl should validate protocol and reject dangerous javascript/data URIs', () => {
    expect(window.safeUrl).toBeDefined();
    // Valid URLs
    expect(window.safeUrl('https://example.com/doc.pdf')).toBe('https://example.com/doc.pdf');
    expect(window.safeUrl('http://example.com')).toBe('http://example.com');
    expect(window.safeUrl('mailto:lawyer@example.com')).toBe('mailto:lawyer@example.com');
    expect(window.safeUrl('/relative/path/doc.pdf')).toBe('/relative/path/doc.pdf');

    // Dangerous / Malicious URLs
    expect(window.safeUrl('javascript:alert(1)')).toBe('');
    expect(window.safeUrl('data:text/html,<script>alert(1)</script>')).toBe('');
    expect(window.safeUrl('vbscript:msgbox(1)')).toBe('');
    expect(window.safeUrl('')).toBe('');
    expect(window.safeUrl(null)).toBe('');
  });

  it('sha256Sync should compute standard SHA-256 hex string', () => {
    expect(window.sha256Sync).toBeDefined();
    // Known SHA-256 hashes
    // "" (empty string) => e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
    const emptyHash = window.sha256Sync('');
    expect(emptyHash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

    // "hello" => 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
    const helloHash = window.sha256Sync('hello');
    expect(helloHash).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
  });

  it('timingSafeEqual should return true only for matching strings of identical length', () => {
    expect(window.timingSafeEqual).toBeDefined();
    expect(window.timingSafeEqual('secret123', 'secret123')).toBe(true);
    expect(window.timingSafeEqual('secret123', 'secret124')).toBe(false);
    expect(window.timingSafeEqual('secret', 'secret123')).toBe(false);
    expect(window.timingSafeEqual('', '')).toBe(true);
    expect(window.timingSafeEqual('test', null)).toBe(false);
  });

  it('safeStorage should get, set, and remove items with storage fallbacks', () => {
    expect(window.safeStorage).toBeDefined();
    window.safeStorage.set('test_key', 'test_value');
    expect(window.safeStorage.get('test_key')).toBe('test_value');
    window.safeStorage.remove('test_key');
    expect(window.safeStorage.get('test_key')).toBe(null);
  });
});

describe('admin.js - Case Normalization & Party Extraction', () => {
  it('extractCaseParties should parse array and comma-separated parties deduplicated', () => {
    expect(window.extractCaseParties).toBeDefined();

    // From array
    const parties1 = window.extractCaseParties({ parties: ['Ramesh', 'Suresh', 'Ramesh'] });
    expect(parties1).toEqual(['Ramesh', 'Suresh']);

    // From comma separated string
    const parties2 = window.extractCaseParties({ parties: 'Ramesh, Suresh, Mahesh' });
    expect(parties2).toEqual(['Ramesh', 'Suresh', 'Mahesh']);

    // From JSON array string
    const parties3 = window.extractCaseParties({ parties: '["Anita", "Sunita"]' });
    expect(parties3).toEqual(['Anita', 'Sunita']);

    // Filtering placeholders like '—', 'null', 'none'
    const parties4 = window.extractCaseParties({ parties: ['—', 'null', 'Valid Party'] });
    expect(parties4).toEqual(['Valid Party']);
  });

  it('normalizeCaseRecord should normalize civil case records correctly', () => {
    expect(window.normalizeCaseRecord).toBeDefined();

    const rawCivil = {
      id: 101,
      case_type: 'civil',
      case_number: '124/2026',
      court_name: 'Civil Court',
      plaintiff: 'Ramesh Kumar',
      defendant: 'Suresh Kumar',
      next_hearing: '2026-12-01',
      case_status: 'Pending'
    };

    const normalized = window.normalizeCaseRecord(rawCivil, 'civil');
    expect(normalized.caseNo).toBe('124/2026');
    expect(normalized.courtName).toBe('Civil Court');
    expect(normalized.caseType).toBe('civil');
    expect(normalized.parties).toContain('Ramesh Kumar');
    expect(normalized.parties).toContain('Suresh Kumar');
    expect(normalized.nextHearing).toBe('2026-12-01');
  });

  it('normalizeCaseRecord should normalize state/criminal case records correctly', () => {
    const rawCriminal = {
      id: 202,
      case_type: 'criminal',
      case_number: 'CR-55/2026',
      court_name: 'Sessions Court',
      first_party: 'State of U.P.',
      accused_name: 'Vikas Dubey',
      next_hearing: '2026-11-20',
      case_status: 'Hearing'
    };

    const normalized = window.normalizeCaseRecord(rawCriminal, 'criminal');
    expect(normalized.caseNo).toBe('CR-55/2026');
    expect(normalized.courtName).toBe('Sessions Court');
    expect(normalized.firstParty).toBe('State of U.P.');
    expect(normalized.accusedName).toBe('Vikas Dubey');
    expect(normalized.parties).toContain('State of U.P.');
    expect(normalized.parties).toContain('Vikas Dubey');
  });
});
