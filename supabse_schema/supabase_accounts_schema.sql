-- ==============================================================================
-- Supabase Database Schema: Chambers Accounts, Earnings & Expenses Ledger
-- Case Management System (CaseBook)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.chambers_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    entry_type VARCHAR(50) NOT NULL DEFAULT 'job', -- 'job' (work with expense), 'income' (pure fee), 'expense' (pure expense)
    client_name TEXT NOT NULL,
    client_phone VARCHAR(30),
    case_number VARCHAR(100),
    work_title TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'certified_copy', 
    -- 'certified_copy', 'court_fee', 'bail_bond', 'drafting', 'advocate_fee', 'clerkage', 'stationery', 'travel', 'miscellaneous'
    amount_received NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    amount_spent NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    net_saving NUMERIC(12, 2) GENERATED ALWAYS AS (amount_received - amount_spent) STORED,
    payment_mode VARCHAR(30) NOT NULL DEFAULT 'Cash', -- 'Cash', 'UPI', 'Bank Transfer', 'Cheque'
    payment_status VARCHAR(30) NOT NULL DEFAULT 'Completed', -- 'Completed', 'Partial', 'Pending'
    work_status VARCHAR(30) NOT NULL DEFAULT 'Pending', -- 'Pending', 'Completed'
    work_completed_date DATE,
    balance_due NUMERIC(12, 2) DEFAULT 0.00,
    receipt_no VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for lightning fast daily queries and search
CREATE INDEX IF NOT EXISTS idx_chambers_accounts_date ON public.chambers_accounts (entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_chambers_accounts_client ON public.chambers_accounts (client_name);
CREATE INDEX IF NOT EXISTS idx_chambers_accounts_case ON public.chambers_accounts (case_number);
CREATE INDEX IF NOT EXISTS idx_chambers_accounts_type ON public.chambers_accounts (entry_type);
CREATE INDEX IF NOT EXISTS idx_chambers_accounts_category ON public.chambers_accounts (category);
CREATE INDEX IF NOT EXISTS idx_chambers_accounts_work_status ON public.chambers_accounts (work_status);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_chambers_accounts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_chambers_accounts_updated_at ON public.chambers_accounts;
CREATE TRIGGER trigger_chambers_accounts_updated_at
BEFORE UPDATE ON public.chambers_accounts
FOR EACH ROW EXECUTE FUNCTION public.handle_chambers_accounts_updated_at();

-- Row Level Security (RLS)
ALTER TABLE public.chambers_accounts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users full CRUD
CREATE POLICY "cms_accounts_auth_all"
ON public.chambers_accounts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow anon select and insert if hybrid offline-first mode is active
CREATE POLICY "cms_accounts_anon_select"
ON public.chambers_accounts
FOR SELECT
TO anon
USING (true);

CREATE POLICY "cms_accounts_anon_insert"
ON public.chambers_accounts
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "cms_accounts_anon_update"
ON public.chambers_accounts
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);
