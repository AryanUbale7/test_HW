export interface SubTopic {
  title: string;
  description: string;
}

export interface MoneyConversationQuestion {
  title: string;
  slug: string;
}

export interface KnowledgePillar {
  slug: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  topicCategory: 'Building' | 'Protection' | 'Legacy' | 'Personal' | 'Economy';
  learnBrief: string;
  understandGuides: SubTopic[];
  moneyConversations: MoneyConversationQuestion[];
}

export const KNOWLEDGE_PILLARS: KnowledgePillar[] = [
  {
    slug: 'starting-your-investment-journey',
    number: 'Pillar 01',
    title: 'Starting Your Investment Journey',
    description: 'First steps into investing.',
    iconName: 'TrendingUp',
    topicCategory: 'Building',
    learnBrief: 'Starting to invest is less about market timing and far more about building the discipline of consistency. This pillar guides you through your first steps with plain-English concepts, clear frameworks, and honest risk awareness.',
    understandGuides: [
      {
        title: 'What Are Mutual Funds?',
        description: 'A plain-English explanation of how mutual funds work, who manages them, and why they exist.',
      },
      {
        title: 'Types of Mutual Funds',
        description: 'Equity, Debt, Hybrid, Index — what each one does and who it suits.',
      },
      {
        title: 'How SIPs Work',
        description: 'Why a small monthly investment beats a large one-time guess. The compounding story.',
      },
      {
        title: 'Index Funds vs Active Funds',
        description: 'The great debate — when to pick passive, when to trust a fund manager.',
      },
      {
        title: 'How to Choose the Right Fund',
        description: 'A simple framework — goals, horizon, risk appetite. No jargon.',
      },
      {
        title: 'Common SIP Mistakes',
        description: 'Stopping SIPs in a downturn, chasing past returns, over-diversifying — what to avoid.',
      },
    ],
    moneyConversations: [
      { title: 'How much do I need before I can start?', slug: 'how-much-before-start' },
      { title: 'Is it too late if everyone began years ago?', slug: 'is-it-too-late-to-start' },
      { title: 'What do I do the first day I see a loss?', slug: 'what-to-do-first-day-of-loss' },
      { title: 'Should I invest lump sum or start a SIP today?', slug: 'lump-sum-vs-sip-today' },
      { title: 'How do I know if my risk appetite is low or high?', slug: 'measuring-risk-appetite' },
      { title: 'What happens to my SIP if I miss a monthly payment?', slug: 'missed-sip-payment' },
      { title: 'Is a 12% return realistic over 10 years?', slug: 'realistic-mutual-fund-returns' },
      { title: 'How many mutual funds should one person own?', slug: 'ideal-number-of-mutual-funds' },
      { title: 'Should I pause SIPs when Nifty hits all-time highs?', slug: 'pausing-sips-at-market-highs' },
      { title: 'What is the real difference between direct and regular plans?', slug: 'direct-vs-regular-plans' },
      { title: 'How do dividends work in mutual funds vs growth options?', slug: 'dividend-vs-growth-option' },
      { title: 'When is the right time to sell a mutual fund?', slug: 'when-to-sell-a-mutual-fund' },
      { title: 'Why does market volatility feel scarier than it actually is?', slug: 'psychology-of-market-volatility' },
      { title: 'How does inflation erode uninvested savings over 5 years?', slug: 'inflation-impact-on-savings' },
      { title: 'What is the single best habit for first-time investors?', slug: 'best-first-time-investor-habit' },
    ],
  },
  {
    slug: 'when-does-investing-become-more-personal',
    number: 'Pillar 02',
    title: 'When Does Investing Become More Personal?',
    description: 'Personalised investing for larger portfolios.',
    iconName: 'User',
    topicCategory: 'Building',
    learnBrief: 'Portfolio Management Services (PMS) offers direct stock ownership and customized portfolio strategies for high-net-worth investors. Understand minimum thresholds, mechanics, and key risk considerations.',
    understandGuides: [
      {
        title: 'What Is PMS?',
        description: "Portfolio Management Services — what it is, who it's for, and how it differs from mutual funds.",
      },
      {
        title: 'How PMS Works',
        description: 'Direct stock ownership, customised portfolios, dedicated managers — the mechanics.',
      },
      {
        title: 'Who Should Invest in PMS?',
        description: 'Minimum ticket size, investor profile, and when PMS makes more sense than mutual funds.',
      },
      {
        title: 'PMS vs Mutual Funds',
        description: 'Side-by-side comparison — control, cost, taxation, and flexibility.',
      },
      {
        title: 'Risks in PMS',
        description: 'Concentration risk, manager dependency, illiquidity — what to watch before investing.',
      },
      {
        title: 'How to Evaluate a PMS Provider',
        description: 'Track record, fee structure, transparency, and questions worth asking.',
      },
    ],
    moneyConversations: [
      { title: 'Is the ₹50 Lakh minimum ticket size in PMS worth it?', slug: 'is-pms-50l-minimum-worth-it' },
      { title: 'How are PMS returns taxed compared to Mutual Funds?', slug: 'pms-taxation-vs-mutual-funds' },
      { title: 'What happens if my PMS portfolio manager underperforms Nifty?', slug: 'pms-underperformance-handling' },
      { title: 'Can I transfer existing stocks into a new PMS account?', slug: 'stock-transfer-into-pms' },
      { title: 'How transparent are transaction charges in PMS fee structures?', slug: 'pms-fee-structure-transparency' },
      { title: 'Why is stock concentration both a benefit and risk in PMS?', slug: 'pms-concentration-risk' },
      { title: 'Should I choose Discretionary or Non-Discretionary PMS?', slug: 'discretionary-vs-non-discretionary-pms' },
      { title: 'How frequently will I receive portfolio reports in PMS?', slug: 'pms-reporting-frequency' },
      { title: 'What is a performance fee watermark in PMS?', slug: 'pms-high-watermark-explained' },
      { title: 'Can I exit a PMS strategy prematurely without penalty?', slug: 'exiting-pms-early' },
      { title: 'How do PMS managers manage cash during market corrections?', slug: 'pms-cash-calls-in-corrections' },
      { title: 'Is PMS suitable for conservative investors?', slug: 'is-pms-for-conservative-investors' },
      { title: 'What questions should I ask before signing a PMS agreement?', slug: 'questions-before-pms-agreement' },
      { title: 'How does stock ownership work in my demat account for PMS?', slug: 'pms-demat-stock-ownership' },
      { title: 'Why do two investors in the same PMS have different returns?', slug: 'why-pms-returns-differ' },
    ],
  },
  {
    slug: 'the-space-between-mutual-funds-and-pms',
    number: 'Pillar 03',
    title: 'The Space Between Mutual funds and PMS',
    description: 'Flexible strategies for more sophisticated investor.',
    iconName: 'Sliders',
    topicCategory: 'Building',
    learnBrief: 'Specialised Investment Funds (SIF) bridges the gap between mutual funds and PMS under SEBI rules. Explore long-short strategies, sector opportunities, and risk management.',
    understandGuides: [
      {
        title: 'What Is SIF?',
        description: 'Specialised Investment Funds — a new SEBI category between mutual funds and PMS.',
      },
      {
        title: 'Types of SIF Strategies',
        description: 'Long-short equity, derivatives-based, sector strategies — the options available.',
      },
      {
        title: 'How SIF Works',
        description: 'How funds are structured, managed, and how returns are generated.',
      },
      {
        title: 'Who Should Invest?',
        description: 'Minimum investment threshold, risk profile, and investor suitability criteria.',
      },
      {
        title: 'SIF vs PMS vs Mutual Funds',
        description: 'Where SIF sits in the product spectrum and when it makes sense.',
      },
      {
        title: 'Risks in SIF',
        description: 'Complexity, liquidity, and regulatory newness — honest risks to know before investing.',
      },
    ],
    moneyConversations: [
      { title: 'Where does SIF fit between Mutual Funds and PMS?', slug: 'sif-positioning-spectrum' },
      { title: 'How do long-short strategies in SIF cushion market drops?', slug: 'how-sif-long-short-works' },
      { title: 'What is the SEBI minimum investment requirement for SIF?', slug: 'sebi-sif-minimum-investment' },
      { title: 'Are derivative-based SIF strategies overly risky for HNIs?', slug: 'sif-derivatives-risk-profile' },
      { title: 'How is liquidity handled in SIF compared to open-ended funds?', slug: 'sif-liquidity-terms' },
      { title: 'What tax rules apply to capital gains from SIF investments?', slug: 'sif-capital-gains-tax' },
      { title: 'Why did SEBI create the SIF framework for Indian investors?', slug: 'why-sebi-created-sif' },
      { title: 'Can SIF generate positive returns during extended bear markets?', slug: 'sif-in-bear-markets' },
      { title: 'What is the ideal allocation percentage for SIF in a portfolio?', slug: 'ideal-sif-portfolio-allocation' },
      { title: 'How do expense ratios in SIF compare to PMS?', slug: 'sif-vs-pms-expense-ratio' },
      { title: 'Who is the ideal investor for SIF strategies?', slug: 'ideal-sif-investor-profile' },
      { title: 'How do sector-specific SIF funds manage downside risks?', slug: 'sif-sectoral-downside-management' },
      { title: 'What disclosures must SIF fund managers provide monthly?', slug: 'sif-monthly-disclosures' },
      { title: 'How does leverage limitation protect SIF investors?', slug: 'sif-leverage-caps-protection' },
      { title: 'Should I replace debt mutual funds with low-volatility SIFs?', slug: 'replacing-debt-funds-with-sif' },
    ],
  },
  {
    slug: 'legacy-planning',
    number: 'Pillar 04',
    title: 'Legacy Planning',
    description: "Preparing your family to receive what's yours.",
    iconName: 'Landmark',
    topicCategory: 'Legacy',
    learnBrief: 'Building wealth is only half the journey; transferring it smoothly without legal disputes or delays is the true mark of legacy. Learn how Wills, Private Trusts, and clear succession planning safeguard your family.',
    understandGuides: [
      {
        title: 'What Is Estate Planning?',
        description: 'Why planning wealth transfer is as important as building it — and what happens without it.',
      },
      {
        title: 'Will vs Trust',
        description: 'When a Will is enough, when a Trust makes more sense, and how they work together.',
      },
      {
        title: 'Nomination vs Ownership',
        description: 'A nominee is not an owner — one of the most misunderstood facts in personal finance.',
      },
      {
        title: 'Succession Planning',
        description: 'Planning who inherits what, how, and with what conditions attached.',
      },
      {
        title: 'Private Trusts in India',
        description: 'How trusts work, what they protect against, and who benefits from setting one up.',
      },
      {
        title: 'Common Estate Planning Mistakes',
        description: 'Outdated nominations, missing Wills, joint assets without clarity — what gets families stuck.',
      },
    ],
    moneyConversations: [
      { title: 'Why is a nominee legally just a trustee and not the final owner?', slug: 'nominee-vs-legal-heir-truth' },
      { title: 'At what age should a family draft their first formal Will?', slug: 'when-to-write-first-will' },
      { title: 'What happens to bank accounts if a person dies without a Will?', slug: 'dying-intestate-in-india' },
      { title: 'How does a Private Family Trust protect assets from future creditors?', slug: 'private-trust-asset-protection' },
      { title: 'Can a registered Will be challenged in court by family members?', slug: 'can-registered-will-be-challenged' },
      { title: 'How do joint holdings with "Either or Survivor" clause work legally?', slug: 'either-or-survivor-clause-explained' },
      { title: 'What is the role of an Executor in executing a Will smoothly?', slug: 'role-of-will-executor' },
      { title: 'How do I ensure digital assets and passwords pass on securely?', slug: 'digital-estate-planning-guide' },
      { title: 'Should business owners create separate business succession trusts?', slug: 'business-succession-trusts' },
      { title: 'What is Probate and when is it legally mandatory in India?', slug: 'probate-mandate-in-india' },
      { title: 'How do gift deeds differ from Will transfers in terms of stamp duty?', slug: 'gift-deed-vs-will-transfer' },
      { title: 'What is a Letter of Administration when no Will exists?', slug: 'letter-of-administration-guide' },
      { title: 'How do I protect inherited wealth for minor children?', slug: 'protecting-wealth-for-minor-children' },
      { title: 'Why should life insurance policies specify MWP Act endorsement?', slug: 'mwp-act-life-insurance-protection' },
      { title: 'How often should a family review and update their estate plan?', slug: 'estate-plan-review-frequency' },
    ],
  },
  {
    slug: 'understanding-insurance',
    number: 'Pillar 05',
    title: 'Understanding Insurance',
    description: 'Protecting your family, income & health.',
    iconName: 'ShieldCheck',
    topicCategory: 'Protection',
    learnBrief: 'Insurance is pure risk mitigation, not a wealth-building product. Clear the myths around term policies, health covers, and policy documentation so your family is never left exposed.',
    understandGuides: [
      {
        title: 'Term Insurance — The Basics',
        description: 'What it is, how it works, and why buying early costs less and protects more.',
      },
      {
        title: 'Term vs Endowment vs ULIP',
        description: 'Clear comparison of the three most common types — what each one actually delivers.',
      },
      {
        title: 'Health Insurance Essentials',
        description: 'What to look for, what gets excluded, and how to avoid claim surprises.',
      },
      {
        title: 'Personal Accident Cover',
        description: "Why it's a supplement, not a substitute for term insurance.",
      },
      {
        title: 'Common Insurance Myths',
        description: "Busting the ones that cost people real money — 'I'm young, I don't need it' and others.",
      },
      {
        title: 'How to Read a Policy Document',
        description: 'Inclusions, exclusions, waiting periods — what to check before signing.',
      },
    ],
    moneyConversations: [
      { title: 'Why mixing insurance with investment usually hurts both goals?', slug: 'separating-insurance-from-investment' },
      { title: 'How much term life insurance cover does an earning member need?', slug: 'calculating-term-insurance-cover' },
      { title: 'Is corporate health insurance enough after job changes or retirement?', slug: 'corporate-vs-personal-health-insurance' },
      { title: 'What is the critical illness rider and when should you add it?', slug: 'critical-illness-rider-guide' },
      { title: 'Why buying term insurance at 25 locks in low premiums for life?', slug: 'buying-term-insurance-early' },
      { title: 'How do pre-existing condition waiting periods affect health claims?', slug: 'health-insurance-waiting-periods' },
      { title: 'What is restoring benefit in health insurance policies?', slug: 'restore-benefit-health-insurance' },
      { title: 'Why does claim settlement ratio matter less than claim amount ratio?', slug: 'claim-settlement-vs-amount-ratio' },
      { title: 'Should non-working spouses or children have term insurance?', slug: 'who-needs-term-insurance' },
      { title: 'What is a Super Top-up health policy and how does it lower costs?', slug: 'super-top-up-health-policy' },
      { title: 'Why must material health disclosures never be hidden from insurers?', slug: 'non-disclosure-dangers-in-insurance' },
      { title: 'What happens to term insurance if you move abroad permanently?', slug: 'term-insurance-for-nris' },
      { title: 'How does personal accident cover differ from term life insurance?', slug: 'personal-accident-vs-term-insurance' },
      { title: 'Why does co-payment clause increase out-of-pocket health costs?', slug: 'copayment-clause-in-health-insurance' },
      { title: 'How do I organize policy documents so my family can claim easily?', slug: 'organizing-family-insurance-claims' },
    ],
  },
  {
    slug: 'retirement-planning',
    number: 'Pillar 06',
    title: 'Retirement Planning',
    description: 'Funding, filling, the years after work.',
    iconName: 'Compass',
    topicCategory: 'Personal',
    learnBrief: 'Retirement planning is working backwards from your future lifestyle to today’s monthly savings rate. Master compounding timelines, NPS, EPF, and Systematic Withdrawal Plans (SWP).',
    understandGuides: [
      {
        title: 'When Should You Start?',
        description: 'Why starting at 25 beats starting at 40 — the compounding gap in real numbers.',
      },
      {
        title: 'How Much Is Enough?',
        description: 'A simple framework to estimate your retirement corpus based on lifestyle and inflation.',
      },
      {
        title: 'NPS vs EPF — What to Prioritise',
        description: 'Government retirement tools explained — benefits, limits, and tax treatment.',
      },
      {
        title: 'Retirement Corpus Calculator',
        description: 'A practical guide to working backwards from your goal to your monthly SIP.',
      },
      {
        title: 'Post-Retirement Income Planning',
        description: 'How to make your corpus last — SWP, annuities, and the sequence of returns risk.',
      },
      {
        title: 'Common Retirement Mistakes',
        description: 'Retiring too early without enough corpus, ignoring inflation, and over-relying on one asset.',
      },
    ],
    moneyConversations: [
      { title: 'Why is starting retirement savings at 25 four times better than 35?', slug: 'compounding-gap-in-retirement' },
      { title: 'How much monthly corpus is needed to generate ₹1 Lakh monthly post-retirement?', slug: 'calculating-1-lakh-retirement-corpus' },
      { title: 'How does inflation silently double your living expenses every 10 years?', slug: 'inflation-doubling-effect-on-retirement' },
      { title: 'What is Sequence of Returns Risk and why is it dangerous at retirement?', slug: 'sequence-of-returns-risk-explained' },
      { title: 'How does an SWP (Systematic Withdrawal Plan) provide tax-efficient monthly income?', slug: 'swp-for-post-retirement-income' },
      { title: 'NPS Tier 1 vs EPF vs PPF: Which should be your core retirement bucket?', slug: 'nps-vs-epf-vs-ppf-comparison' },
      { title: 'Why annuities often offer low yields compared to mutual fund SWPs?', slug: 'annuities-vs-swp-for-pension' },
      { title: 'How do equity mutual funds protect your retirement corpus against healthcare inflation?', slug: 'equity-protection-against-medical-inflation' },
      { title: 'What is the 4% withdrawal rule and does it apply to Indian markets?', slug: '4-percent-rule-in-india' },
      { title: 'Should real estate rental income be your sole retirement strategy?', slug: 'dangers-of-relying-only-on-rental-income' },
      { title: 'How to rebalance from equity to debt 5 years before retirement date?', slug: 'pre-retirement-portfolio-rebalancing' },
      { title: 'What tax benefits apply to NPS lump sum withdrawals at age 60?', slug: 'nps-withdrawal-taxation-at-60' },
      { title: 'How do Reverse Mortgages work for senior citizens in India?', slug: 'reverse-mortgage-guide-india' },
      { title: 'What is the biggest mental adjustment when transitioning from salary to corpus?', slug: 'psychology-of-living-off-corpus' },
      { title: 'How to structure a 3-bucket strategy for post-retirement peace of mind?', slug: 'three-bucket-retirement-strategy' },
    ],
  },
  {
    slug: 'personal-finance',
    number: 'Pillar 07',
    title: 'Personal Finance',
    description: 'Everyday habits that hold everything up.',
    iconName: 'Wallet',
    topicCategory: 'Personal',
    learnBrief: 'Strong financial management rests on a solid foundation: establishing emergency reserves, controlling high-cost debt, budgeting effortlessly, and avoiding major money mistakes in your 20s and 30s.',
    understandGuides: [
      {
        title: 'Save First or Invest First?',
        description: 'The right sequence — emergency fund, then investments. Why the order matters.',
      },
      {
        title: 'Building an Emergency Fund',
        description: 'How much, where to park it, and why it protects your investment habit.',
      },
      {
        title: 'Budgeting Without Spreadsheets',
        description: 'A simple mental framework — needs, investments, savings, lifestyle.',
      },
      {
        title: 'Understanding Inflation',
        description: 'Why keeping money idle in a savings account is quietly losing value every year.',
      },
      {
        title: 'Debt Management Basics',
        description: 'Good debt vs bad debt, how to prioritise repayment, when EMIs make sense.',
      },
      {
        title: 'Financial Mistakes in Your 20s and 30s',
        description: 'Starting late, ignoring insurance, spending before saving — the ones that cost the most.',
      },
    ],
    moneyConversations: [
      { title: 'Why must emergency funds precede any stock market or mutual fund investment?', slug: 'emergency-fund-first-rule' },
      { title: 'How many months of living expenses should be in your liquid emergency pool?', slug: 'how-much-emergency-fund' },
      { title: 'Where should emergency money be parked: Savings Account, Liquid Fund, or FD?', slug: 'where-to-park-emergency-fund' },
      { title: 'What is the 50-30-20 rule and how to customize it for Indian salaries?', slug: '50-30-20-budgeting-rule-india' },
      { title: 'How to pay off high-cost credit card debt using Avalanche vs Snowball methods?', slug: 'avalanche-vs-snowball-debt-payoff' },
      { title: 'Good Debt vs Bad Debt: Is a home loan or education loan considered good debt?', slug: 'good-debt-vs-bad-debt' },
      { title: 'Why is keeping excess cash in a 3% savings account a guaranteed real-value loss?', slug: 'dangers-of-excess-savings-account-cash' },
      { title: 'How does lifestyle creep quietly prevent high earners from building wealth?', slug: 'controlling-lifestyle-creep' },
      { title: 'Should you prepay your home loan early or invest the surplus in equity?', slug: 'prepaying-home-loan-vs-investing' },
      { title: 'What is credit score (CIBIL) and how to maintain it above 750?', slug: 'cibil-score-maintenance' },
      { title: 'How to handle financial peer pressure and lifestyle comparison in your 20s?', slug: 'financial-peer-pressure' },
      { title: 'Why buying a car beyond your 6-month income is a wealth trap?', slug: 'car-buying-financial-rule' },
      { title: 'How to discuss money and financial goals openly with your spouse before marriage?', slug: 'discussing-money-with-spouse' },
      { title: 'What is zero-based budgeting and how does it give every Rupee a job?', slug: 'zero-based-budgeting-guide' },
      { title: 'What is the cost of waiting 5 years before building your first investment pool?', slug: 'cost-of-waiting-to-invest' },
    ],
  },
];

export function getKnowledgePillarBySlug(slug: string): KnowledgePillar | undefined {
  return KNOWLEDGE_PILLARS.find((p) => p.slug === slug);
}
