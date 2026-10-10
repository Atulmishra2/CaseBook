-- ==============================================================================
-- Supabase Database Security Hardening Migration
-- Case Management System (CaseBook)
--
-- This script hardens Row-Level Security (RLS) across all CMS database tables.
-- It resolves the critical vulnerability where anonymous (anon) users had
-- unrestricted INSERT, UPDATE, and DELETE access.
-- ==============================================================================

-- 1. Enable Row Level Security (RLS) on all core tables
ALTER TABLE IF EXISTS public.civilcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.criminalcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.hearings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.courts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.statecases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.familycases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.revenuecases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.misccivilcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.misccriminalcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.complaintcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.todos ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 2. Clean up overly permissive anonymous policies
-- ==============================================================================

-- Drop wide-open anon delete/update policies on civilcases
DROP POLICY IF EXISTS "Allow anon delete civilcases" ON public.civilcases;
DROP POLICY IF EXISTS "Allow anon update civilcases" ON public.civilcases;
DROP POLICY IF EXISTS "Allow anon insert civilcases" ON public.civilcases;

-- Drop wide-open policies on criminalcases if present
DROP POLICY IF EXISTS "Allow anon delete criminalcases" ON public.criminalcases;
DROP POLICY IF EXISTS "Allow anon update criminalcases" ON public.criminalcases;
DROP POLICY IF EXISTS "Allow anon insert criminalcases" ON public.criminalcases;

-- Drop wide-open policies on hearings
DROP POLICY IF EXISTS "Allow anon delete hearings" ON public.hearings;
DROP POLICY IF EXISTS "Allow anon update hearings" ON public.hearings;
DROP POLICY IF EXISTS "Allow anon insert hearings" ON public.hearings;

-- Drop wide-open policies on courts
DROP POLICY IF EXISTS "Allow anon delete courts" ON public.courts;
DROP POLICY IF EXISTS "Allow anon update courts" ON public.courts;
DROP POLICY IF EXISTS "Allow anon insert courts" ON public.courts;

-- ==============================================================================
-- 3. Define Hardened Role-Based Policies
-- ==============================================================================

-- Core principle:
-- A. Anonymous / Guest users:
--    - Can SELECT (read-only) cases and hearings for client portal verification.
--    - CANNOT DELETE, MODIFY, or TRUNCATE records.
-- B. Authenticated users (Admin / Chambers Advocates):
--    - Full CRUD access (SELECT, INSERT, UPDATE, DELETE).

-- --- CIVIL CASES ---
CREATE POLICY "cms_civilcases_select_policy"
ON public.civilcases
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "cms_civilcases_admin_insert"
ON public.civilcases
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "cms_civilcases_admin_update"
ON public.civilcases
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "cms_civilcases_admin_delete"
ON public.civilcases
FOR DELETE
TO authenticated
USING (true);

-- --- CRIMINAL CASES ---
CREATE POLICY "cms_criminalcases_select_policy"
ON public.criminalcases
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "cms_criminalcases_admin_insert"
ON public.criminalcases
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "cms_criminalcases_admin_update"
ON public.criminalcases
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "cms_criminalcases_admin_delete"
ON public.criminalcases
FOR DELETE
TO authenticated
USING (true);

-- --- HEARINGS ---
CREATE POLICY "cms_hearings_select_policy"
ON public.hearings
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "cms_hearings_admin_insert"
ON public.hearings
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "cms_hearings_admin_update"
ON public.hearings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "cms_hearings_admin_delete"
ON public.hearings
FOR DELETE
TO authenticated
USING (true);

-- --- COURTS DIRECTORY ---
CREATE POLICY "cms_courts_select_policy"
ON public.courts
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "cms_courts_admin_mutation"
ON public.courts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- 4. Temporary / Hybrid Fallback Mode (For client-only deployments without Supabase Auth)
-- ==============================================================================
-- NOTE: If your deployment does not yet use Supabase Email/Password Auth and runs
-- solely on the Anon key from the browser, running the above policies will require
-- you to sign in via Supabase Auth or use an Edge Function / Service Key.
-- If you need Anon mutation while transitioning, run this restricted policy instead:
--
-- CREATE POLICY "cms_anon_insert_audit" ON public.civilcases
--   FOR INSERT TO anon WITH CHECK (case_number IS NOT NULL AND length(case_number) > 0);
--
-- To prevent accidental database wipes, never allow unconditional DELETE for anon:
-- REVOKE TRUNCATE, DELETE ON ALL TABLES IN SCHEMA public FROM anon;
-- ==============================================================================
