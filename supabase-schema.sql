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
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

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
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 'transfer_in' = received from virtual account; 'personal_spent' = personal expense
  type        text NOT NULL CHECK (type IN ('transfer_in', 'personal_spent')),

  amount      numeric(12, 2) NOT NULL CHECK (amount > 0),
  category    text,                  -- e.g. 'food' | 'transport' | 'medical' | 'utilities' | 'clothing' | 'entertainment' | 'other'
  note        text NOT NULL,         -- Description of the transaction (required)
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
CREATE INDEX IF NOT EXISTS idx_transactions_user_date
  ON public.transactions (user_id, txn_date DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_user_type_mode
  ON public.transactions (user_id, type, mode);

-- Personal: fast user lookups and date filtering
CREATE INDEX IF NOT EXISTS idx_personal_txns_user_date
  ON public.personal_transactions (user_id, txn_date DESC);

CREATE INDEX IF NOT EXISTS idx_personal_txns_user_type
  ON public.personal_transactions (user_id, type, txn_date DESC);


-- ============================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================================
-- Each user can only read/write their own rows.

ALTER TABLE public.transactions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_transactions ENABLE ROW LEVEL SECURITY;

-- transactions RLS policies
CREATE POLICY "transactions: user owns rows" ON public.transactions
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- personal_transactions RLS policies
CREATE POLICY "personal_transactions: user owns rows" ON public.personal_transactions
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ============================================================
-- 5. VIEW: money_summary
-- ============================================================
-- Per-user summary of business money — powers the hero card totals.
-- online_received + cash_received = total received
-- transferred_out = total moved to personal wallet (NOT counted in P&L)

CREATE OR REPLACE VIEW public.money_summary AS
SELECT
  user_id,
  -- Received totals
  COALESCE(SUM(amount) FILTER (WHERE type = 'received' AND mode = 'online'), 0)  AS received_online,
  COALESCE(SUM(amount) FILTER (WHERE type = 'received' AND mode = 'cash'),   0)  AS received_cash,
  COALESCE(SUM(amount) FILTER (WHERE type = 'received'),                     0)  AS received_total,
  -- Spent totals
  COALESCE(SUM(amount) FILTER (WHERE type = 'spent' AND mode = 'online'), 0)     AS spent_online,
  COALESCE(SUM(amount) FILTER (WHERE type = 'spent' AND mode = 'cash'),   0)     AS spent_cash,
  COALESCE(SUM(amount) FILTER (WHERE type = 'spent'),                     0)     AS spent_total,
  -- Transfers out (informational only — excluded from net)
  COALESCE(SUM(amount) FILTER (WHERE type = 'transfer_to_personal'),      0)     AS transferred_out,
  -- Net virtual balance = received - spent (transfers excluded)
  COALESCE(SUM(amount) FILTER (WHERE type = 'received'), 0)
    - COALESCE(SUM(amount) FILTER (WHERE type = 'spent'), 0)                     AS net_virtual_balance
FROM public.transactions
GROUP BY user_id;

COMMENT ON VIEW public.money_summary IS
  'Per-user aggregated business totals. ''net_virtual_balance'' = received − spent (transfer_to_personal excluded). Use this for the hero card and for validating transfer amounts.';


-- ============================================================
-- 6. VIEW: personal_summary
-- ============================================================
-- Per-user personal wallet summary.

CREATE OR REPLACE VIEW public.personal_summary AS
SELECT
  user_id,
  COALESCE(SUM(amount) FILTER (WHERE type = 'transfer_in'),    0) AS total_transferred_in,
  COALESCE(SUM(amount) FILTER (WHERE type = 'personal_spent'), 0) AS total_personal_spent,
  -- Running balance of personal wallet
  COALESCE(SUM(amount) FILTER (WHERE type = 'transfer_in'),    0)
    - COALESCE(SUM(amount) FILTER (WHERE type = 'personal_spent'), 0) AS personal_balance
FROM public.personal_transactions
GROUP BY user_id;

COMMENT ON VIEW public.personal_summary IS
  'Per-user personal wallet balance. ''personal_balance'' = total_transferred_in − total_personal_spent.';


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
