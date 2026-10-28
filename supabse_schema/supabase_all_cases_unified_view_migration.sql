-- ==============================================================================
-- Migration: Create Consolidated Unified View for All Case Tables
-- File: supabase_all_cases_unified_view_migration.sql
-- Project: CaseBook
-- ==============================================================================
-- This SQL View merges all 7+ specialized case tables into a single high-speed
-- queryable source. It reduces startup network roundtrips from 13 concurrent requests
-- down to a single fetch, dramatically speeding up loading times on court 3G/4G networks.
-- ==============================================================================

CREATE OR REPLACE VIEW public.all_cases_unified_view AS

-- 1. Civil Cases
SELECT 
    id,
    case_number,
    case_year,
    COALESCE(case_type, 'civil') AS case_type,
    case_name,
    filing_date,
    court_name,
    plaintiff AS first_party,
    defendant AS second_party,
    party_name,
    client_name,
    client_number,
    next_hearing,
    hearing_process,
    case_status,
    remark,
    disposal_comment,
    doc_link,
    NULL::text AS police_station,
    NULL::text AS crime_section,
    NULL::text AS crime_number,
    created_at,
    updated_at
FROM public.civilcases

UNION ALL

-- 2. State Cases (Criminal Trials / State of U.P.)
SELECT 
    id,
    case_number,
    crime_year AS case_year,
    'state' AS case_type,
    case_name,
    filing_date,
    court_name,
    first_party,
    accused_name AS second_party,
    party_name,
    client_name,
    client_number,
    next_hearing,
    hearing_process,
    case_status,
    remark,
    disposal_comment,
    doc_link,
    police_station,
    crime_section,
    crime_number,
    created_at,
    updated_at
FROM public.statecases

UNION ALL

-- 3. Family Cases (Matrimonial / Sec 125 Maintenance / Domestic Violence)
SELECT 
    id,
    case_number,
    case_year,
    'family' AS case_type,
    case_name,
    filing_date,
    court_name,
    petitioner AS first_party,
    respondent AS second_party,
    NULL::text AS party_name,
    client_name,
    client_number,
    next_hearing,
    hearing_process,
    case_status,
    remark,
    disposal_comment,
    doc_link,
    NULL::text AS police_station,
    NULL::text AS crime_section,
    NULL::text AS crime_number,
    created_at,
    updated_at
FROM public.familycases

UNION ALL

-- 4. Revenue Cases (UP Revenue Code / Mutation / Partition / Tehsil)
SELECT 
    id,
    case_number,
    case_year,
    'revenue' AS case_type,
    case_name,
    filing_date,
    court_name,
    applicant AS first_party,
    opposite_party AS second_party,
    NULL::text AS party_name,
    client_name,
    client_number,
    next_hearing,
    hearing_process,
    case_status,
    remark,
    disposal_comment,
    doc_link,
    NULL::text AS police_station,
    NULL::text AS crime_section,
    NULL::text AS crime_number,
    created_at,
    updated_at
FROM public.revenuecases

UNION ALL

-- 5. Misc Civil Cases (Appeals / Revisions / Injunction Applications)
SELECT 
    id,
    case_number,
    case_year,
    'misc_civil' AS case_type,
    case_name,
    filing_date,
    court_name,
    applicant AS first_party,
    opposite_party AS second_party,
    NULL::text AS party_name,
    client_name,
    client_number,
    next_hearing,
    hearing_process,
    case_status,
    remark,
    disposal_comment,
    doc_link,
    NULL::text AS police_station,
    NULL::text AS crime_section,
    NULL::text AS crime_number,
    created_at,
    updated_at
FROM public.misccivilcases

UNION ALL

-- 6. Misc Criminal Cases (Bail Applications / Sec 156(3) / Revisions)
SELECT 
    id,
    case_number,
    crime_year AS case_year,
    'misc_criminal' AS case_type,
    case_name,
    filing_date,
    court_name,
    applicant AS first_party,
    opposite_party AS second_party,
    NULL::text AS party_name,
    client_name,
    client_number,
    next_hearing,
    hearing_process,
    case_status,
    remark,
    disposal_comment,
    doc_link,
    police_station,
    crime_section,
    NULL::text AS crime_number,
    created_at,
    updated_at
FROM public.misccriminalcases

UNION ALL

-- 7. Complaint Cases (Cheque Bounce Sec 138 NI Act / Private Complaints)
SELECT 
    id,
    case_number,
    case_year,
    'complaint' AS case_type,
    case_name,
    filing_date,
    court_name,
    complainant AS first_party,
    accused_name AS second_party,
    NULL::text AS party_name,
    client_name,
    client_number,
    next_hearing,
    hearing_process,
    case_status,
    remark,
    disposal_comment,
    doc_link,
    police_station,
    section_act AS crime_section,
    NULL::text AS crime_number,
    created_at,
    updated_at
FROM public.complaintcases;

-- Grant Read Access to All Roles
GRANT SELECT ON public.all_cases_unified_view TO anon, authenticated, service_role;
