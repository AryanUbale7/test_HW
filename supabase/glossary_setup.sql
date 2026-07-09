-- ============================================================
-- GLOSSARY FEATURE — Run this in Supabase SQL Editor
-- ============================================================

-- 1. Create the table
CREATE TABLE glossary_terms (
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

-- 2. RLS: public SELECT, authenticated INSERT/UPDATE/DELETE
ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read glossary terms"
  ON glossary_terms FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert glossary terms"
  ON glossary_terms FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update glossary terms"
  ON glossary_terms FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete glossary terms"
  ON glossary_terms FOR DELETE
  TO authenticated
  USING (true);

-- 3. updated_at trigger (same pattern as posts table)
CREATE OR REPLACE FUNCTION update_glossary_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_glossary_updated_at
  BEFORE UPDATE ON glossary_terms
  FOR EACH ROW
  EXECUTE FUNCTION update_glossary_updated_at();

-- 4. Seed: 15 starter terms across all three arms
INSERT INTO glossary_terms (term, slug, short_definition, full_explanation, arm, related_term_slugs) VALUES

-- === CREATION ===
(
  'SIP',
  'sip',
  'A Systematic Investment Plan (SIP) is a method of investing a fixed amount in a mutual fund at regular intervals — weekly, monthly, or quarterly — rather than as a single lump sum.',
  'SIPs work by automatically deducting a pre-set amount from your bank account and investing it in a chosen mutual fund scheme. Because you buy units at different market prices over time, SIPs average out your cost per unit — a principle called rupee-cost averaging. This removes the need to time the market and makes disciplined investing accessible even on a modest income. Over long periods, SIPs in equity funds have historically created substantial wealth through the power of compounding.',
  'Creation',
  ARRAY['lump-sum-investment', 'expense-ratio', 'asset-allocation']
),
(
  'Lump Sum Investment',
  'lump-sum-investment',
  'A lump sum investment means deploying a large amount of money into a mutual fund or other instrument all at once, rather than spreading it across multiple smaller instalments.',
  'Unlike a SIP, a lump sum investment puts your full capital to work immediately. This can be advantageous when markets are at a low point, as you benefit from any subsequent recovery on the entire amount. However, it also means your returns are more sensitive to the exact timing of entry. Lump sum investments are common when people receive one-time windfalls — a bonus, an inheritance, or proceeds from selling a property — and want to put that capital to work without delay.',
  'Creation',
  ARRAY['sip', 'asset-allocation']
),
(
  'Asset Allocation',
  'asset-allocation',
  'Asset allocation is the practice of distributing your investments across different asset classes — such as equity, debt, gold, and real estate — to balance potential returns against acceptable risk.',
  'No single asset class performs best every year. By holding a mix, you reduce the impact of any one asset class performing poorly. Your ideal allocation depends on your age, income, financial goals, and risk tolerance. A younger investor with a 20-year horizon might hold 80% in equity, while someone nearing retirement might shift toward 60% in debt for stability. Rebalancing periodically — bringing your portfolio back to its target mix — is an important part of maintaining your intended allocation.',
  'Creation',
  ARRAY['sip', 'lump-sum-investment', 'expense-ratio']
),
(
  'Expense Ratio',
  'expense-ratio',
  'The expense ratio is the annual fee charged by a mutual fund to cover its management and operating costs, expressed as a percentage of the fund''s total assets.',
  'If a fund has an expense ratio of 1.5%, it means ₹1,500 is deducted annually for every ₹1,00,000 you have invested — this is charged daily on a pro-rata basis, not as a lump sum deduction. Lower expense ratios are generally preferable, as they leave more of the fund''s returns in your hands. Direct plans of mutual funds (where you invest without a distributor) carry lower expense ratios than regular plans. Index funds typically have very low expense ratios since they simply track a market index rather than employing active fund management.',
  'Creation',
  ARRAY['sip', 'asset-allocation']
),
(
  'PMS',
  'pms',
  'Portfolio Management Services (PMS) is a professional investment service where a licensed portfolio manager constructs and manages a customised portfolio of stocks or other securities on your behalf.',
  'PMS is designed for high-net-worth investors; SEBI currently mandates a minimum investment of ₹50 lakhs. Unlike mutual funds where all investors hold units of a shared pool, in PMS you directly own the individual securities in your portfolio. This allows for greater personalisation — the portfolio manager can tailor the strategy to your specific goals, tax situation, and risk appetite. PMS fees typically include a management fee and sometimes a profit-sharing component. It is important to evaluate a PMS provider''s track record and fee structure carefully before investing.',
  'Creation',
  ARRAY['sif', 'asset-allocation']
),
(
  'SIF',
  'sif',
  'A Strategic Investment Fund (SIF) is a SEBI-regulated investment vehicle that sits between mutual funds and PMS, offering curated, theme-based portfolio strategies typically starting at ₹10 lakhs.',
  'SIFs were introduced to give investors access to more sophisticated, actively managed strategies without the very high entry threshold of PMS. They can invest across equities, debt, derivatives, and other instruments with greater flexibility than conventional mutual funds. SIFs are managed by licensed fund managers and are subject to SEBI oversight. They are suited for investors who want more than a plain mutual fund but are not yet ready for the full PMS commitment.',
  'Creation',
  ARRAY['pms', 'asset-allocation']
),

-- === PROTECTION ===
(
  'Term Insurance',
  'term-insurance',
  'Term insurance is a pure life insurance policy that pays a fixed sum (the sum assured) to your family if you pass away within the policy''s coverage period, with no payout if you survive the term.',
  'Because term insurance covers only the risk of death — with no savings or investment component — it offers the highest life cover for the lowest premium of any insurance type. A 30-year-old non-smoker can typically secure ₹1 crore of cover for under ₹1,000 per month. This makes it the most efficient way to financially protect your family from the loss of your income. The key decisions are the sum assured (how much your family would need), the policy term (until your youngest dependent is financially independent), and the insurer''s claim settlement ratio.',
  'Protection',
  ARRAY['sum-assured', 'rider', 'claim-settlement-ratio']
),
(
  'Sum Assured',
  'sum-assured',
  'The sum assured is the fixed amount your insurer agrees to pay your nominee if you pass away during the policy term — it is the core coverage amount of a life insurance policy.',
  'Choosing the right sum assured is one of the most important decisions in financial planning. A common rule of thumb is 10–15 times your annual income, but a more precise approach accounts for your outstanding liabilities (home loan, other debts), the future income your family would need until financial independence, and any large planned expenses such as children''s education. An undersized sum assured leaves your family financially vulnerable; an oversized one means you pay unnecessarily high premiums.',
  'Protection',
  ARRAY['term-insurance', 'rider']
),
(
  'Rider',
  'rider',
  'A rider is an optional add-on benefit attached to a base insurance policy that extends or customises your coverage — for example, covering critical illness or accidental disability — usually for an additional premium.',
  'Common riders on life insurance include critical illness (lump-sum payout on diagnosis of specified diseases), accidental death benefit (additional payout if death is due to an accident), waiver of premium (future premiums are waived if you become disabled), and income benefit (regular payouts to your family instead of a lump sum). Riders let you tailor protection to your specific risks without buying entirely separate policies. However, not all riders offer equal value — it is worth comparing the cost of a rider against a standalone policy for the same coverage.',
  'Protection',
  ARRAY['term-insurance', 'sum-assured', 'claim-settlement-ratio']
),
(
  'Claim Settlement Ratio',
  'claim-settlement-ratio',
  'The claim settlement ratio (CSR) is the percentage of death claims an insurer settled out of total claims received in a financial year — a higher ratio indicates greater reliability in honouring claims.',
  'For example, a CSR of 98% means the insurer paid out 98 out of every 100 claims it received. IRDAI publishes CSRs annually for all life insurers. While a high CSR is reassuring, it should not be the only factor in choosing an insurer — the absolute number of claims settled, the insurer''s financial strength, the speed of settlement, and the ease of the claims process are equally important. A very small insurer may show a 100% CSR simply because it received very few claims.',
  'Protection',
  ARRAY['term-insurance', 'sum-assured']
),

-- === LEGACY ===
(
  'Will',
  'will',
  'A Will is a legal document in which you specify how your assets should be distributed after your death, and who should be responsible for carrying out those instructions.',
  'A valid Will in India must be in writing, signed by the person making it (the testator) in the presence of at least two witnesses, who must also sign. The Will comes into effect only after death and can be changed at any time during the testator''s lifetime. Without a Will, your assets are distributed according to personal laws applicable to your religion, which may not reflect your actual wishes. A Will can also name a guardian for minor children, making it one of the most important documents any parent should have in place.',
  'Legacy',
  ARRAY['nomination', 'probate', 'trust']
),
(
  'Nomination',
  'nomination',
  'A nomination is the process of designating a person (the nominee) to receive or manage your financial assets — such as bank accounts, insurance policies, or mutual funds — in the event of your death.',
  'Nomination is a facility, not a bequest. In most cases, the nominee receives the asset as a trustee on behalf of the legal heirs, not as the absolute owner. However, in some instruments (like EPF and insurance), the nominee may have a stronger claim. This distinction is often misunderstood — many people believe nominating someone transfers ownership, but a Will (or the applicable succession law) ultimately determines who inherits. Keeping nominations updated after life events like marriage, divorce, or the death of a nominee is essential.',
  'Legacy',
  ARRAY['will', 'probate', 'trust']
),
(
  'Probate',
  'probate',
  'Probate is the legal process through which a court validates a deceased person''s Will and grants authority to the executor to distribute the estate as directed.',
  'In India, probate is mandatory in certain states (Maharashtra, West Bengal, Tamil Nadu) and for Hindus with immovable property in those states. The process involves filing a petition in the High Court, notifying potential claimants, and obtaining a court order — which can take months or even years. For assets like bank accounts, mutual funds, and insurance, institutions typically accept the probate order or succession certificate as proof of authority to transfer assets. Having a clearly drafted Will with named executors can simplify and speed up the probate process considerably.',
  'Legacy',
  ARRAY['will', 'nomination', 'trust', 'power-of-attorney']
),
(
  'Trust',
  'trust',
  'A trust is a legal arrangement in which one party (the settlor) transfers assets to another (the trustee) to be held and managed for the benefit of specified beneficiaries, according to defined terms.',
  'Trusts are powerful tools in estate and legacy planning. A private family trust in India allows you to consolidate family assets, set conditions on how they are distributed (for example, releasing funds to a child only upon reaching a certain age), and ensure continuity across generations. Trusts also offer privacy — unlike a Will, they do not go through probate and are not public records. They require careful drafting, registration, and ongoing administration, making them most suitable for families with complex asset structures or specific succession objectives.',
  'Legacy',
  ARRAY['will', 'nomination', 'probate', 'power-of-attorney']
),
(
  'Power of Attorney',
  'power-of-attorney',
  'A Power of Attorney (PoA) is a legal document that authorises another person (the agent or attorney-in-fact) to act on your behalf in financial, legal, or personal matters.',
  'A General PoA grants broad authority across a range of actions, while a Special PoA is limited to a specific act (such as selling a particular property). A Durable PoA remains valid even if you become mentally incapacitated — making it an important tool in planning for old age or illness. It is crucial to grant PoA only to someone you trust completely, as the agent has significant power to bind you legally. A PoA is automatically revoked upon the death of the person who granted it — at that point, the Will and succession laws take over.',
  'Legacy',
  ARRAY['will', 'trust', 'nomination']
);
