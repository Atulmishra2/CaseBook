import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const clientScript = readFileSync(
  resolve(process.cwd(), 'services/supabaseClient.js'),
  'utf8'
);

describe('Supabase Client Zero-Credential Contract', () => {
  it('does not contain hardcoded project URLs or publishable/anon keys in the source code', () => {
    // Must not contain hardcoded project URLs
    expect(clientScript).not.toMatch(/https:\/\/[a-z0-9]+\.supabase\.co/i);
    // Must not contain hardcoded anon/publishable keys
    expect(clientScript).not.toMatch(/sb_publishable_[a-zA-Z0-9_-]+/);
    expect(clientScript).not.toMatch(/eyJhbGciOi/);
  });

  it('reads credentials safely from localStorage', () => {
    expect(clientScript).toContain('localStorage.getItem(\'CASEBOOK_SUPABASE_URL\')');
    expect(clientScript).toContain('localStorage.getItem(\'CASEBOOK_SUPABASE_KEY\')');
  });

  it('provides saveSupabaseConfig and clearSupabaseConfig helper methods', () => {
    expect(clientScript).toContain('window.saveSupabaseConfig');
    expect(clientScript).toContain('window.clearSupabaseConfig');
  });
});
