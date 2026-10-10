-- ==============================================================================
-- CaseBook Paisa & Virtual Account Fix Migration
-- Run this script in Supabase Dashboard -> SQL Editor
-- ==============================================================================
-- This fixes:
-- 1. Error 42501 (RLS violation) caused by strict auth.uid() = user_id policies
--    while CaseBook runs in client-side / anon key mode.
-- 2. "user_id" NOT NULL constraint error on transactions & personal_transactions.
-- ==============================================================================

-- Step 1: Ensure tables exist
CREATE TABLE IF NOT EXISTS public.transactions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  type          text NOT NULL CHECK (type IN ('received', 'spent', 'transfer_to_personal')),
  amount        numeric(12, 2) NOT NULL CHECK (amount > 0),
  mode          text NOT NULL DEFAULT 'cash' CHECK (mode IN ('online', 'cash')),
  client_payee  text,
  category      text,
  note          text,
  case_id       text,
  txn_date      date NOT NULL DEFAULT CURRENT_DATE,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.personal_transactions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  type        text NOT NULL CHECK (type IN ('transfer_in', 'personal_spent')),
  amount      numeric(12, 2) NOT NULL CHECK (amount > 0),
  category    text,
  note        text NOT NULL DEFAULT '',
  txn_date    date NOT NULL DEFAULT CURRENT_DATE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Step 2: Make user_id nullable on existing tables (if created previously with NOT NULL)
ALTER TABLE public.transactions ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.personal_transactions ALTER COLUMN user_id DROP NOT NULL;

-- Step 3: Enable RLS and configure permissive policies for anon & authenticated
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_transactions ENABLE ROW LEVEL SECURITY;

-- Drop previous restrictive policies
DROP POLICY IF EXISTS "transactions: user owns rows" ON public.transactions;
DROP POLICY IF EXISTS "Allow anon all transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow public read transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow anon insert transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow anon update transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow anon delete transactions" ON public.transactions;

DROP POLICY IF EXISTS "personal_transactions: user owns rows" ON public.personal_transactions;
DROP POLICY IF EXISTS "Allow anon all personal_transactions" ON public.personal_transactions;
DROP POLICY IF EXISTS "Allow public read personal_transactions" ON public.personal_transactions;
DROP POLICY IF EXISTS "Allow anon insert personal_transactions" ON public.personal_transactions;
DROP POLICY IF EXISTS "Allow anon update personal_transactions" ON public.personal_transactions;
DROP POLICY IF EXISTS "Allow anon delete personal_transactions" ON public.personal_transactions;

-- Create full CRUD policies for transactions
CREATE POLICY "Allow anon all transactions"
ON public.transactions
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Create full CRUD policies for personal_transactions
CREATE POLICY "Allow anon all personal_transactions"
ON public.personal_transactions
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Step 4: Grant table permissions to anon and authenticated roles
GRANT ALL ON TABLE public.transactions TO anon, authenticated;
GRANT ALL ON TABLE public.personal_transactions TO anon, authenticated;

-- Step 5: Helpful indexes for high-speed queries
CREATE INDEX IF NOT EXISTS idx_transactions_txn_date ON public.transactions (txn_date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type_mode ON public.transactions (type, mode);
CREATE INDEX IF NOT EXISTS idx_personal_txns_txn_date ON public.personal_transactions (txn_date DESC);
CREATE INDEX IF NOT EXISTS idx_personal_txns_type ON public.personal_transactions (type, txn_date DESC);

-- Step 6: Purge any legacy dummy records from database tables
DELETE FROM public.chambers_accounts 
WHERE client_name IN ('Client A', 'Client 1', 'Client 2', 'Chambers Expense', 'Client B')
   OR work_title ILIKE '%Certified copy of order sheet%';

DELETE FROM public.transactions
WHERE client_payee IN ('Client A', 'Client 1', 'Client 2', 'Chambers Expense', 'Client B');

-- Step 7: Drop unused summary views/tables (money_summary, personal_summary)
DROP VIEW IF EXISTS public.money_summary CASCADE;
DROP VIEW IF EXISTS public.personal_summary CASCADE;
DROP TABLE IF EXISTS public.money_summary CASCADE;
DROP TABLE IF EXISTS public.personal_summary CASCADE;
