-- ==============================================================================
-- Migration: supabase_courts_upgrade_migration.sql
-- Project: CaseBook Management System
-- Purpose: Upgrade "courts" table schema with dual-identity, cadres, & vacant status.
--          Syncs 24 audited courts and marks 8 obsolete courts as DELETED.
-- ==============================================================================

-- STEP 1: Add new structured columns safely without disturbing existing court_name
ALTER TABLE public.courts 
ADD COLUMN IF NOT EXISTS short_code VARCHAR(50),
ADD COLUMN IF NOT EXISTS civil_title TEXT,
ADD COLUMN IF NOT EXISTS criminal_title TEXT,
ADD COLUMN IF NOT EXISTS cadre VARCHAR(50) DEFAULT 'District Court',
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ACTIVE',
ADD COLUMN IF NOT EXISTS remarks TEXT,
ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;

-- STEP 2: Create indexes for fast lookup and filtering performance
CREATE INDEX IF NOT EXISTS idx_courts_status ON public.courts (status);
CREATE INDEX IF NOT EXISTS idx_courts_cadre ON public.courts (cadre);
CREATE INDEX IF NOT EXISTS idx_courts_short_code ON public.courts (short_code);

-- STEP 3: Soft-delete the 8 obsolete/duplicate courts marked by user in audit
UPDATE public.courts
SET status = 'DELETED', updated_at = timezone('utc'::text, now())
WHERE court_name ILIKE '%POCSO Act%'
   OR court_name ILIKE '%Crime Against Women%'
   OR court_name ILIKE '%Court No. 5%' AND cadre = 'ADJ / Sessions'
   OR court_name ILIKE '%Court No. 8%' AND cadre = 'ADJ / Sessions'
   OR court_name ILIKE '%Court No. 9%' AND cadre = 'ADJ / Sessions'
   OR court_name ILIKE '%Court No. 10%' AND cadre = 'ADJ / Sessions'
   OR court_name ILIKE '%Court No. 16%' AND cadre = 'ADJ / Sessions'
   OR court_name ILIKE '%POCSO-2%';

-- STEP 4: Upsert / Seed the 24 Audited Active & Vacant Courts
-- (Using ON CONFLICT to ensure existing cases stay intact)

INSERT INTO public.courts (court_name, short_code, civil_title, criminal_title, cadre, status, remarks, sort_order)
VALUES
  -- 1. District Judge
  ('District and Sessions Judge, Lakhimpur Kheri', 'DJ', 'District and Sessions Judge, Lakhimpur Kheri', 'Sessions Judge, Lakhimpur Kheri', 'District Judge', 'ACTIVE', '', 1),

  -- 2. ADJ Courts (Active)
  ('Addl. District and Sessions Judge Court No. 1', 'ADJ-1', 'Addl. District and Sessions Judge Court No. 1', 'Addl. Sessions Judge Court No. 1', 'ADJ / Sessions', 'ACTIVE', '', 2),
  ('Addl. District and Sessions Judge Court No. 2', 'ADJ-2', 'Addl. District and Sessions Judge Court No. 2', 'Addl. Sessions Judge Court No. 2', 'ADJ / Sessions', 'ACTIVE', '', 3),
  ('Special Judge (E.C. Act) / Addl. District Judge', 'ADJ-EC', 'Special Judge (E.C. Act) / Addl. District Judge', 'Special Judge (E.C. Act) / Addl. Sessions Judge', 'ADJ / Sessions', 'ACTIVE', '', 4),
  ('Exclusive Special Judge SC/ST Act', 'ADJ-SC/ST', 'Exclusive Special Judge SC/ST Act', 'Exclusive Special Judge SC/ST Act', 'ADJ / Sessions', 'ACTIVE', '', 5),
  ('Addl. District and Sessions Judge (FTC)', 'ADJ-FTC', 'Addl. District and Sessions Judge (FTC)', 'Addl. Sessions Judge (Fast Track Court)', 'ADJ / Sessions', 'ACTIVE', 'Renamed from FTC-1', 6),
  ('Addl. District and Sessions Judge / FTC-New', 'ADJ-FTC-New', 'Addl. District and Sessions Judge / FTC-New', 'Addl. Sessions Judge / FTC-New', 'ADJ / Sessions', 'ACTIVE', 'Renamed from FTC-2', 7),
  ('Addl. District and Sessions Judge Court No. 12', 'ADJ-12', 'Addl. District and Sessions Judge Court No. 12', 'Addl. Sessions Judge Court No. 12', 'ADJ / Sessions', 'ACTIVE', '', 8),
  ('Addl. District and Sessions Judge Court No. 13', 'ADJ-13', 'Addl. District and Sessions Judge Court No. 13', 'Addl. Sessions Judge Court No. 13', 'ADJ / Sessions', 'ACTIVE', '', 9),

  -- 3. Senior Division / ACJM Courts
  ('Chief Judicial Magistrate (CJM Court)', 'CJM', 'Civil Judge Senior Division / CJM Court', 'Chief Judicial Magistrate, Lakhimpur Kheri', 'Senior Division', 'ACTIVE', '', 10),
  ('Add. Civil Judge Senior Division Court No.1/ACJM-1st', 'A.C.J.S.D. - 1', 'Add. Civil Judge Senior Division Court No. 1', 'Addl. Chief Judicial Magistrate Court No. 1 (ACJM-1st)', 'Senior Division', 'ACTIVE', '', 11),
  ('Add. Civil Judge Senior Division Court No.2', 'A.C.J.S.D. - 2', 'Add. Civil Judge Senior Division Court No. 2', 'Addl. Chief Judicial Magistrate Court No. 2 (ACJM-2nd)', 'Senior Division', 'ACTIVE', '', 12),
  ('Add. Civil Judge Senior Division Court No.3', 'A.C.J.S.D. - 3', 'Add. Civil Judge Senior Division Court No. 3', 'Addl. Chief Judicial Magistrate Court No. 3 (ACJM-3rd)', 'Senior Division', 'ACTIVE', '', 13),
  ('ACJM-5 / Add. Civil Judge Senior Division Court No. 5', 'A.C.J.S.D. - 5', 'Add. Civil Judge Senior Division Court No. 5', 'Addl. Chief Judicial Magistrate Court No. 5 (ACJM-5)', 'Senior Division', 'ACTIVE', '', 14),
  ('ACJM-Add. Civil Judge Senior Division', 'ACJM-Main', 'Add. Civil Judge Senior Division (Main Bench)', 'ACJM - Add. Civil Judge Senior Division', 'Senior Division', 'ACTIVE', '', 15),
  ('A.C.J.M-FTC/ A.C.J. Sd/FTC', 'ACJM-FTC', 'Add. Civil Judge Senior Division / Fast Track Court', 'A.C.J.M-FTC / A.C.J. Sd/FTC', 'Senior Division', 'ACTIVE', '', 16),

  -- 4. Junior Division / AJM Courts (Including 3 Vacant)
  ('Addl. Civil Judge Junior Division Court No. 1 / AJM 1st', 'A.C.J.J.D. - 1', 'Addl. Civil Judge Junior Division Court No. 1', 'Addl. Judicial Magistrate Court No. 1 (AJM 1st)', 'Junior Division', 'VACANT', 'Vacant Presiding Officer', 17),
  ('Addl. Civil Judge Junior Division Court No. 2 / AJM 2nd', 'A.C.J.J.D. - 2', 'Addl. Civil Judge Junior Division Court No. 2', 'Addl. Judicial Magistrate Court No. 2 (AJM 2nd)', 'Junior Division', 'VACANT', 'Vacant Presiding Officer', 18),
  ('Add. Civil Judge Junior Division-3rd /AJM-3rd Lakhimpur Kheri', 'A.C.J.J.D. - 3', 'Add. Civil Judge Junior Division-3rd (Lakhimpur Kheri)', 'AJM-3rd Lakhimpur Kheri', 'Junior Division', 'VACANT', 'Vacant Presiding Officer', 19),
  ('Add. Civil Judge Junior Division Court No. 4/AJM-4', 'A.C.J.J.D. - 4', 'Add. Civil Judge Junior Division Court No. 4', 'Addl. Judicial Magistrate Court No. 4 (AJM-4)', 'Junior Division', 'ACTIVE', '', 20),
  ('A.J.M. - F.T.C. - New / Add. Civil Judge Jr. Div. FTC-New', 'AJM-FTC-New', 'Add. Civil Judge Jr. Div. FTC-New', 'A.J.M. - F.T.C. - New', 'Junior Division', 'ACTIVE', '', 21),
  ('Add. Civil Judge Junior Division/FTC', 'A.C.J.J.D. (FTC)', 'Add. Civil Judge Junior Division / FTC', 'Addl. Judicial Magistrate / FTC', 'Junior Division', 'ACTIVE', '', 22),

  -- 5. Family Courts
  ('Principal Judge, Family Court, Lakhimpur Kheri', 'Family-Court', 'Principal Judge, Family Court, Lakhimpur Kheri', 'Principal Judge, Family Court (125 CrPC Jurisdiction)', 'Family Court', 'ACTIVE', '', 23),
  ('1st Addl. Principal Judge, Family Court', 'Family-1st-Addl', '1st Addl. Principal Judge, Family Court', '1st Addl. Principal Judge, Family Court', 'Family Court', 'ACTIVE', '', 24)

ON CONFLICT (court_name) 
DO UPDATE SET
  short_code = EXCLUDED.short_code,
  civil_title = EXCLUDED.civil_title,
  criminal_title = EXCLUDED.criminal_title,
  cadre = EXCLUDED.cadre,
  status = EXCLUDED.status,
  remarks = EXCLUDED.remarks,
  sort_order = EXCLUDED.sort_order,
  updated_at = timezone('utc'::text, now());
