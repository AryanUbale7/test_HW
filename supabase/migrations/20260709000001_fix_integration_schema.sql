-- ============================================================
-- INTEGRATION FIXES SCHEMA MIGRATION
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Create the glossary_terms table and seed it if not exists
CREATE TABLE IF NOT EXISTS glossary_terms (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  term                text NOT NULL,
  slug                text UNIQUE NOT NULL,
  short_definition    text NOT NULL,
  full_explanation    text,
  arm                 text CHECK (arm IN ('Creation','Protection','Legacy','General')),
  related_term_slugs  text[] DEFAULT '{}',
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

-- Enable RLS on glossary_terms
ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read glossary terms" ON glossary_terms;
CREATE POLICY "Public can read glossary terms"
  ON glossary_terms FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert glossary terms" ON glossary_terms;
CREATE POLICY "Authenticated users can insert glossary terms"
  ON glossary_terms FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update glossary terms" ON glossary_terms;
CREATE POLICY "Authenticated users can update glossary terms"
  ON glossary_terms FOR UPDATE
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete glossary terms" ON glossary_terms;
CREATE POLICY "Authenticated users can delete glossary terms"
  ON glossary_terms FOR DELETE
  TO authenticated
  USING (true);

-- Create set_glossary_updated_at trigger
CREATE OR REPLACE FUNCTION update_glossary_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_glossary_updated_at ON glossary_terms;
CREATE TRIGGER set_glossary_updated_at
  BEFORE UPDATE ON glossary_terms
  FOR EACH ROW
  EXECUTE FUNCTION update_glossary_updated_at();

-- Seed glossary starter terms if table is empty
INSERT INTO glossary_terms (term, slug, short_definition, full_explanation, arm, related_term_slugs)
SELECT * FROM (VALUES
  ('SIP', 'sip', 'A Systematic Investment Plan (SIP) is a method of investing a fixed amount in a mutual fund at regular intervals — weekly, monthly, or quarterly — rather than as a single lump sum.', 'SIPs work by automatically deducting a pre-set amount from your bank account and investing it in a chosen mutual fund scheme. Because you buy units at different market prices over time, SIPs average out your cost per unit — a principle called rupee-cost averaging. This removes the need to time the market and makes disciplined investing accessible even on a modest income. Over long periods, SIPs in equity funds have historically created substantial wealth through the power of compounding.', 'Creation', ARRAY['lump-sum-investment', 'expense-ratio', 'asset-allocation']),
  ('Lump Sum Investment', 'lump-sum-investment', 'A lump sum investment means deploying a large amount of money into a mutual fund or other instrument all at once, rather than spreading it across multiple smaller instalments.', 'Unlike a SIP, a lump sum investment puts your full capital to work immediately. This can be advantageous when markets are at a low point, as you benefit from any subsequent recovery on the entire amount. However, it also means your returns are more sensitive to the exact timing of entry. Lump sum investments are common when people receive one-time windfalls — a bonus, an inheritance, or proceeds from selling a property — and want to put that capital to work without delay.', 'Creation', ARRAY['sip', 'asset-allocation']),
  ('Asset Allocation', 'asset-allocation', 'Asset allocation is the practice of distributing your investments across different asset classes — such as equity, debt, gold, and real estate — to balance potential returns against acceptable risk.', 'No single asset class performs best every year. By holding a mix, you reduce the impact of any one asset class performing poorly. Your ideal allocation depends on your age, income, financial goals, and risk tolerance. A younger investor with a 20-year horizon might hold 80% in equity, while someone nearing retirement might shift toward 60% in debt for stability. Rebalancing periodically — bringing your portfolio back to its target mix — is an important part of maintaining your intended allocation.', 'Creation', ARRAY['sip', 'lump-sum-investment', 'expense-ratio']),
  ('Expense Ratio', 'expense-ratio', 'The expense ratio is the annual fee charged by a mutual fund to cover its management and operating costs, expressed as a percentage of the fund''s total assets.', 'If a fund has an expense ratio of 1.5%, it means ₹1,500 is deducted annually for every ₹1,00,000 you have invested — this is charged daily on a pro-rata basis, not as a lump sum deduction. Lower expense ratios are generally preferable, as they leave more of the fund''s returns in your hands. Direct plans of mutual funds (where you invest without a distributor) carry lower expense ratios than regular plans. Index funds typically have very low expense ratios since they simply track a market index rather than employing active fund management.', 'Creation', ARRAY['sip', 'asset-allocation']),
  ('PMS', 'pms', 'Portfolio Management Services (PMS) is a professional investment service where a licensed portfolio manager constructs and manages a customised portfolio of stocks or other securities on your behalf.', 'PMS is designed for high-net-worth investors; SEBI currently mandates a minimum investment of ₹50 lakhs. Unlike mutual funds where all investors hold units of a shared pool, in PMS you directly own the individual securities in your portfolio. This allows for greater personalisation — the portfolio manager can tailor the strategy to your specific goals, tax situation, and risk appetite. PMS fees typically include a management fee and sometimes a profit-sharing component. It is important to evaluate a PMS provider''s track record and fee structure carefully before investing.', 'Creation', ARRAY['sif', 'asset-allocation']),
  ('SIF', 'sif', 'A Strategic Investment Fund (SIF) is a specialised pool of capital targeting complex private assets, high-yield debt, or venture investments with specific regulatory thresholds.', 'SIFs operate with a higher risk-reward profile than standard mutual funds. They often require larger minimum commitments and feature longer lock-in periods, making them suitable only for accredited, institutional, or ultra-high-net-worth individuals who can bear illiquidity in exchange for uncorrelated returns.', 'Creation', ARRAY['pms', 'asset-allocation']),
  ('Term Insurance', 'term-insurance', 'Term insurance is a pure life insurance product that provides coverage for a specific period (term), paying a death benefit to beneficiaries if the insured dies during that period.', 'Term insurance has no investment component or cash maturity value; if you survive the term, the policy ends without any payout. Because of this pure risk protection nature, premium costs are exceptionally low compared to the coverage amount. It is widely considered the most cost-efficient way to replace income and secure a family''s financial future against the loss of a primary earner.', 'Protection', ARRAY['health-insurance', 'human-life-value']),
  ('Health Insurance', 'health-insurance', 'Health insurance is an insurance coverage that pays for medical, surgical, and sometimes dental expenses incurred by the insured.', 'Health insurance can reimburse the insured for expenses incurred from illness or injury, or pay the care provider directly. Having adequate health insurance prevents a medical emergency from depleting a family''s hard-earned financial reserves, acting as a crucial defensive pillar in wealth protection.', 'Protection', ARRAY['term-insurance']),
  ('Human Life Value', 'human-life-value', 'Human Life Value (HLV) is a financial metric representing the present value of all future income a person is expected to earn, used to estimate the target amount of life insurance required.', 'HLV calculates the economic value of a human life to their dependents. It considers current income, expected remaining working years, liabilities (like home loans), and future financial goals (like children''s education). By discounting these future cash flows, HLV gives a realistic assessment of the insurance cover needed to maintain a family''s standard of living if the breadwinner passes away.', 'Protection', ARRAY['term-insurance']),
  ('Asset Protection', 'asset-protection', 'Asset protection refers to strategies used to safeguard a person''s wealth from claims of creditors, lawsuits, or other legal liabilities.', 'Asset protection involves structuring investments and holdings (such as through trusts, joint accounts, or limited liability entities) to isolate personal assets from business risks. This ensures that personal and family wealth remains secure even during professional or business litigation.', 'Protection', ARRAY['will', 'nomination']),
  ('Will', 'will', 'A Will is a legal document that sets forth your wishes regarding the distribution of your property and the care of any minor children after your death.', 'A Will allows you to name executors to manage your estate, nominate guardians for minor children, and specify exactly who inherits which assets. Without a Will, your estate is distributed according to intestate succession laws, which may not align with your wishes and can lead to lengthy, costly disputes among family members.', 'Legacy', ARRAY['nomination', 'succession-planning', 'trust']),
  ('Nomination', 'nomination', 'A nomination is a process where an asset holder authorizes a nominee to receive the asset in the event of the holder''s death.', 'A nominee is technically a trustee or custodian of the asset, not its ultimate legal heir (unless specified as such in a Will). While nomination simplifies the transfer of funds or securities from financial institutions immediately after death, the nominee is legally obligated to distribute the assets to the legal heirs specified in the Will or determined by succession laws.', 'Legacy', ARRAY['will', 'succession-planning']),
  ('Trust', 'trust', 'A trust is a fiduciary arrangement that allows a third party, or trustee, to hold and manage assets on behalf of a beneficiary or beneficiaries.', 'Trusts can be created during a person''s lifetime (living trust) or established through a Will (testamentary trust). They offer precise control over how and when assets are distributed to heirs, help mitigate estate taxes, protect assets from creditors, and avoid the public probate process, making them central to sophisticated legacy planning.', 'Legacy', ARRAY['will', 'succession-planning', 'asset-protection']),
  ('Succession Planning', 'succession-planning', 'Succession planning is the process of identifying and preparing individuals to take over leadership or ownership roles in a family business or estate.', 'In estate planning, succession planning ensures a smooth transition of asset management, minimizes conflict among heirs, and preserves the continuity of family businesses across generations.', 'Legacy', ARRAY['will', 'trust', 'nomination']),
  ('Estate Tax', 'estate-tax', 'An estate tax is a levy on the transfer of the estate of a deceased person, calculated on the total net value of all assets before distribution to heirs.', 'While India currently does not levy an estate or inheritance tax, legacy planners closely monitor legislative trends. Structuring assets through trusts or gifts during one''s lifetime remains a common precautionary strategy to guard against the potential reintroduction of estate duties.', 'Legacy', ARRAY['trust', 'succession-planning'])
) AS seed (term, slug, short_definition, full_explanation, arm, related_term_slugs)
ON CONFLICT (slug) DO NOTHING;

-- 2. Add gated_by_email column to resources table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='resources' AND column_name='gated_by_email'
  ) THEN
    ALTER TABLE resources ADD COLUMN gated_by_email boolean DEFAULT false;
  END IF;
END $$;

-- 3. Add contacted column to contact_messages table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='contact_messages' AND column_name='contacted'
  ) THEN
    ALTER TABLE contact_messages ADD COLUMN contacted boolean DEFAULT false;
    -- Optionally migrate status data if any exists: if status was 'contacted', set contacted to true
    UPDATE contact_messages SET contacted = true WHERE status = 'contacted';
  END IF;
END $$;

-- 4. Recreate check constraint on posts table to allow 'Guide'
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_type_check;
ALTER TABLE posts ADD CONSTRAINT posts_type_check CHECK (type IN ('Insight', 'News', 'Guide'));
