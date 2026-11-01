import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Refactored Login Page & One-Click Auth Specifications', () => {
  let loginHtmlContent;
  let indexHtmlContent;
  let adminJsContent;

  beforeEach(() => {
    loginHtmlContent = fs.readFileSync(path.resolve(__dirname, '../login.html'), 'utf8');
    indexHtmlContent = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    adminJsContent = fs.readFileSync(path.resolve(__dirname, '../admin.js'), 'utf8');
  });

  describe('Standalone login.html Specifications', () => {
    it('contains left branding panel and right form panel', () => {
      expect(loginHtmlContent).toMatch(/CaseBook/i);
      expect(loginHtmlContent).toContain('id="loginForm"');
    });

    it('removes validation: form has novalidate and inputs are not required', () => {
      expect(loginHtmlContent).toMatch(/<form[^>]*id="loginForm"[^>]*novalidate/i);
      const emailInputMatch = loginHtmlContent.match(/<input[^>]*id="email"[^>]*>/i);
      expect(emailInputMatch).not.toBeNull();
      expect(emailInputMatch[0]).not.toContain('required');

      const passwordInputMatch = loginHtmlContent.match(/<input[^>]*id="password"[^>]*>/i);
      expect(passwordInputMatch).not.toBeNull();
      expect(passwordInputMatch[0]).not.toContain('required');
    });

    it('renders email input and password input with default pre-fills for testing', () => {
      expect(loginHtmlContent).toMatch(/id="email"/i);
      expect(loginHtmlContent).toMatch(/id="password"/i);
    });

    it('allows one-click login redirecting to index.html without blocking alerts', () => {
      expect(loginHtmlContent).toContain('handleFormSubmit');
      expect(loginHtmlContent).toContain('handleGuestAccess');
      expect(loginHtmlContent).toMatch(/window\.location\.href\s*=\s*['"]index\.html['"]/);
      expect(loginHtmlContent).not.toMatch(/function\s+handleFormSubmit[\s\S]*?alert\s*\(/);
      expect(loginHtmlContent).not.toMatch(/function\s+handleGuestAccess[\s\S]*?alert\s*\(/);
    });
  });

  describe('Main App (index.html) Login Specifications', () => {
    it('form has novalidate and inputs are not required in index.html', () => {
      expect(indexHtmlContent).toMatch(/<form[^>]*id="loginForm"[^>]*novalidate/i);
      const emailMatch = indexHtmlContent.match(/<input[^>]*id="email"[^>]*>/i);
      expect(emailMatch).not.toBeNull();
      expect(emailMatch[0]).not.toContain('required');

      const passMatch = indexHtmlContent.match(/<input[^>]*id="password"[^>]*>/i);
      expect(passMatch).not.toBeNull();
      expect(passMatch[0]).not.toContain('required');
    });

    it('has one-click login handlers wired to loginSubmitBtn and guestModeBtn', () => {
      expect(indexHtmlContent).toContain('id="loginSubmitBtn"');
      expect(indexHtmlContent).toContain('id="guestModeBtn"');
      expect(indexHtmlContent).toContain('handleAdminLogin');
      expect(indexHtmlContent).toContain('handleGuestLogin');
    });
  });

  describe('admin.js One-Click Auth Logic', () => {
    it('handleAdminLogin bypasses validation and logs user in directly', () => {
      expect(adminJsContent).toContain('function handleAdminLogin');
      expect(adminJsContent).toContain('createAdminSession(username, isPersistent)');
      expect(adminJsContent).toContain('setActiveScreen(\'adminScreen\')');
    });

    it('handleGuestLogin activates guest screen directly with one click', () => {
      expect(adminJsContent).toContain('function handleGuestLogin');
      expect(adminJsContent).toContain('setActiveScreen(\'guestScreen\')');
    });
  });
});
