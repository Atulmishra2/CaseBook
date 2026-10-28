-- ==============================================================================
-- Migration: Deduplicate Existing Hearings & Create Safe Unique Index
-- File: supabase_hearings_safe_unique_index_migration.sql
-- ==============================================================================

-- 1. Drop existing index if it exists
DROP INDEX IF EXISTS public.idx_hearings_case_date_unique;
DROP INDEX IF EXISTS public.idx_hearings_case_type_date_unique;

-- 2. Clean up existing duplicate hearings (Keeping the latest entry by created_at / id)
-- This resolves ERROR 23505 where duplicate entries (e.g. CM-163-2025 on 2026-09-17) already exist in the database.
DELETE FROM public.hearings
WHERE id IN (
    SELECT id
    FROM (
        SELECT id,
               ROW_NUMBER() OVER (
                   PARTITION BY case_number, COALESCE(case_type, 'civil'), hearing_date
                   ORDER BY created_at DESC, id DESC
               ) AS rnum
        FROM public.hearings
    ) duplicates
    WHERE duplicates.rnum > 1
);

-- 3. Now create the safe compound unique index on (case_number, case_type, hearing_date)
-- This allows same case numbers across different case types (Civil vs State) while preventing
-- accidental double entries for the same case on the same date.
CREATE UNIQUE INDEX idx_hearings_case_type_date_unique 
ON public.hearings (case_number, COALESCE(case_type, 'civil'), hearing_date);
