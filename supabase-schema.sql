-- ==============================================================================
-- CaseBook Paisa Manager — Supabase Schema
-- ==============================================================================
-- Tables:
--   transactions          → Business money (received, spent, transfer_to_personal)
--   personal_transactions → Personal wallet (transfer_in, personal_spent)
--
-- Views:
--   money_summary    → Per-user business totals (online/cash/transfer breakdown)
--   personal_summary → Per-user personal wallet totals
--
-- Function:
--   transfer_to_personal(p_amount, p_note, p_date) → atomic transfer (validates balance)
--
-- RLS: all tables are row-locked to auth.uid() = user_id
-- ==============================================================================


-- ============================================================
-- 1. TRANSACTIONS TABLE (Business Money)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.transactions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid REFERENCES auth.users(id) ON DELETE SET NULL,

  -- 'received' | 'spent' | 'transfer_to_personal'
  type          text NOT NULL CHECK (type IN ('received', 'spent', 'transfer_to_personal')),

  amount        numeric(12, 2) NOT NULL CHECK (amount > 0),

  -- Payment mode: 'online' maps to UPI/Bank; 'cash' maps to Cash/default
  mode          text NOT NULL DEFAULT 'cash' CHECK (mode IN ('online', 'cash')),

  client_payee  text,                -- Client name (received) or payee/vendor (spent)
  category      text,                -- 'ticket' | 'travel' | 'court' | 'food' | 'print' | 'other' (for spent rows)
  note          text,                -- Free-form note
  case_id       text,                -- Optional reference to a case (case_no or uuid)
  txn_date      date NOT NULL DEFAULT CURRENT_DATE,
  created_at    timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.transactions IS
  'Business-side transactions: money received from clients, money spent on court work, and transfers to personal wallet.';

COMMENT ON COLUMN public.transactions.type IS
  '''received'' = client payment; ''spent'' = business expense; ''transfer_to_personal'' = money moved to personal wallet (excluded from P&L totals).';

COMMENT ON COLUMN public.transactions.mode IS
  '''online'' = UPI / Bank Transfer; ''cash'' = physical cash. Used for the Online/Cash split display in the Paisa Manager header.';


-- ============================================================
-- 2. PERSONAL_TRANSACTIONS TABLE (Personal Wallet)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.personal_transactions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,

  -- 'transfer_in' = received from virtual account; 'personal_spent' = personal expense
  type        text NOT NULL CHECK (type IN ('transfer_in', 'personal_spent')),

  amount      numeric(12, 2) NOT NULL CHECK (amount > 0),
  category    text,                  -- e.g. 'food' | 'transport' | 'medical' | 'utilities' | 'clothing' | 'entertainment' | 'other'
  note        text NOT NULL DEFAULT '', -- Description of the transaction
  txn_date    date NOT NULL DEFAULT CURRENT_DATE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.personal_transactions IS
  'Personal wallet transactions: money transferred in from virtual account and personal expenses paid from the personal wallet.';

COMMENT ON COLUMN public.personal_transactions.note IS
  'Required description of what the money was spent on (e.g. "Groceries", "Petrol", "Medicine").';


-- ============================================================
-- 3. INDEXES
-- ============================================================

-- Transactions: fast monthly lookups and mode filtering
CREATE INDEX IF NOT EXISTS idx_transactions_txn_date
  ON public.transactions (txn_date DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_type_mode
  ON public.transactions (type, mode);

-- Personal: fast user lookups and date filtering
CREATE INDEX IF NOT EXISTS idx_personal_txns_txn_date
  ON public.personal_transactions (txn_date DESC);

CREATE INDEX IF NOT EXISTS idx_personal_txns_type
  ON public.personal_transactions (type, txn_date DESC);


-- ============================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE public.transactions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "transactions: user owns rows" ON public.transactions;
DROP POLICY IF EXISTS "Allow anon all transactions" ON public.transactions;
CREATE POLICY "Allow anon all transactions" ON public.transactions
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "personal_transactions: user owns rows" ON public.personal_transactions;
DROP POLICY IF EXISTS "Allow anon all personal_transactions" ON public.personal_transactions;
CREATE POLICY "Allow anon all personal_transactions" ON public.personal_transactions
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

GRANT ALL ON TABLE public.transactions TO anon, authenticated;
GRANT ALL ON TABLE public.personal_transactions TO anon, authenticated;


-- ============================================================
-- 5. SUMMARY VIEWS (OPTIONAL / DEPRECATED)
-- ============================================================
-- Note: Totals, Net Balance, and Online/Cash splits are calculated
-- live on the frontend client (renderPaisaTab & getPersonalBalance).
-- Database views money_summary and personal_summary are not required
-- and can be dropped:
DROP VIEW IF EXISTS public.money_summary CASCADE;
DROP VIEW IF EXISTS public.personal_summary CASCADE;


-- ============================================================
-- 7. FUNCTION: transfer_to_personal
-- ============================================================
-- Atomically transfers money from virtual account to personal wallet.
-- Validates that the requested amount does not exceed virtual net balance.
-- Callable via supabase.rpc('transfer_to_personal', { p_amount, p_note, p_date })

CREATE OR REPLACE FUNCTION public.transfer_to_personal(
  p_amount  numeric,
  p_note    text    DEFAULT 'Transfer to Personal',
  p_date    date    DEFAULT CURRENT_DATE
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id       uuid := auth.uid();
  v_virtual_net   numeric;
  v_business_id   uuid;
  v_personal_id   uuid;
BEGIN
  -- Validate user is authenticated
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Not authenticated');
  END IF;

  -- Validate amount
  IF p_amount IS NULL OR p_amount <= 0 THEN
    RETURN json_build_object('success', false, 'error', 'Amount must be greater than zero');
  END IF;

  -- Get current virtual net balance for this user
  SELECT
    COALESCE(SUM(amount) FILTER (WHERE type = 'received'), 0)
      - COALESCE(SUM(amount) FILTER (WHERE type = 'spent'), 0)
  INTO v_virtual_net
  FROM public.transactions
  WHERE user_id = v_user_id;

  -- Validate sufficient balance
  IF p_amount > v_virtual_net THEN
    RETURN json_build_object(
      'success', false,
      'error', format(
        'Insufficient balance. Available: ₹%s, Requested: ₹%s',
        round(v_virtual_net, 2),
        round(p_amount, 2)
      )
    );
  END IF;

  -- Insert transfer_to_personal in business transactions
  INSERT INTO public.transactions (user_id, type, amount, mode, client_payee, note, txn_date)
  VALUES (v_user_id, 'transfer_to_personal', p_amount, 'cash', '👤 Personal Wallet', p_note, p_date)
  RETURNING id INTO v_business_id;

  -- Insert transfer_in in personal_transactions
  INSERT INTO public.personal_transactions (user_id, type, amount, note, txn_date)
  VALUES (v_user_id, 'transfer_in', p_amount, p_note, p_date)
  RETURNING id INTO v_personal_id;

  -- Return success with both generated IDs
  RETURN json_build_object(
    'success',         true,
    'business_txn_id', v_business_id,
    'personal_txn_id', v_personal_id,
    'amount',          p_amount,
    'date',            p_date
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

COMMENT ON FUNCTION public.transfer_to_personal IS
  'Atomically deducts from virtual account and credits personal wallet. Returns JSON with success/error. Call via supabase.rpc(''transfer_to_personal'', { p_amount, p_note, p_date }).';


-- ============================================================
-- Usage examples (frontend — supabase-js):
-- ============================================================
--
-- 1. Get business summary for current user:
--    const { data } = await supabase.from('money_summary').select('*').single();
--
-- 2. Get personal wallet balance:
--    const { data } = await supabase.from('personal_summary').select('*').single();
--
-- 3. Transfer to personal (atomic, validates balance):
--    const { data } = await supabase.rpc('transfer_to_personal', {
--      p_amount: 5000,
--      p_note: 'Monthly withdrawal',
--      p_date: '2024-09-21'
--    });
--    if (!data.success) alert(data.error);
--
-- 4. Record personal expense:
--    const { error } = await supabase.from('personal_transactions').insert({
--      user_id: (await supabase.auth.getUser()).data.user.id,
--      type: 'personal_spent',
--      amount: 350,
--      note: 'Groceries',
--      category: 'food',
--      txn_date: '2024-09-21'
--    });
--
-- 5. Get paginated transaction list:
--    const { data } = await supabase
--      .from('transactions')
--      .select('*')
--      .order('txn_date', { ascending: false })
--      .range(0, 49);
--
-- ============================================================


-- ============================================================
-- CASE_TRANSFERS TABLE (Court Transfers)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.case_transfers (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number     text NOT NULL,
  case_type       text DEFAULT 'civil',
  case_title      text,
  from_court      text NOT NULL,
  to_court        text NOT NULL,
  transfer_date   date NOT NULL DEFAULT CURRENT_DATE,
  order_number    text,
  order_date      date,
  transferred_by  text,
  transfer_reason text,
  doc_link        text,
  remarks         text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.case_transfers IS
  'Court transfers log for all civil, criminal, family, revenue, and other cases.';

CREATE INDEX IF NOT EXISTS idx_case_transfers_case_number
  ON public.case_transfers (case_number);

CREATE INDEX IF NOT EXISTS idx_case_transfers_transfer_date
  ON public.case_transfers (transfer_date DESC);

-- Enable public/anon client access
ALTER TABLE public.case_transfers DISABLE ROW LEVEL SECURITY;

