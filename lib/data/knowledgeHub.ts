export interface SubTopic {
  title: string;
  description: string;
}

export interface KnowledgePillar {
  slug: string;
  title: string;
  description: string;
  iconName: string;
  subtopics: SubTopic[];
}

export const KNOWLEDGE_PILLARS: KnowledgePillar[] = [
  {
    slug: 'mutual-funds-for-beginners',
    title: 'Mutual Funds for Beginners',
    description: 'Start your investing journey the right way.',
    iconName: 'TrendingUp',
    subtopics: [
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
  },
  {
    slug: 'pms-explained',
    title: 'PMS Explained',
    description: 'Professional management for serious investors.',
    iconName: 'Briefcase',
    subtopics: [
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
  },
  {
    slug: 'sif-explained',
    title: 'SIF Explained',
    description: 'Alternative investments simplified.',
    iconName: 'Layers',
    subtopics: [
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
  },
  {
    slug: 'estate-planning-legacy',
    title: 'Estate Planning & Legacy',
    description: 'Plan today for a secure legacy tomorrow.',
    iconName: 'Landmark',
    subtopics: [
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
  },
  {
    slug: 'insurance-demystified',
    title: 'Insurance Demystified',
    description: 'Facts over myths. Protect what matters.',
    iconName: 'ShieldCheck',
    subtopics: [
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
  },
  {
    slug: 'retirement-planning',
    title: 'Retirement Planning',
    description: 'Retire with confidence, not confusion.',
    iconName: 'Compass',
    subtopics: [
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
  },
  {
    slug: 'tax-saving',
    title: 'Tax Saving',
    description: 'Save smartly. Keep more of what you earn.',
    iconName: 'Calculator',
    subtopics: [
      {
        title: 'Old vs New Tax Regime',
        description: 'Which one saves you more — a clear side-by-side with real income examples.',
      },
      {
        title: 'Section 80C Options',
        description: 'ELSS, PPF, NPS, life insurance — what counts, what the limits are, what works best.',
      },
      {
        title: 'ELSS for Tax Saving',
        description: 'Why ELSS is often the smartest 80C option — shortest lock-in, market-linked growth.',
      },
      {
        title: 'Tax-Efficient Investing',
        description: 'How to structure investments to legally minimise tax year on year.',
      },
      {
        title: 'Capital Gains Tax Explained',
        description: 'STCG vs LTCG, indexation, and how to plan redemptions to reduce the tax hit.',
      },
      {
        title: 'Common Tax Mistakes',
        description: 'Last-minute 80C scrambles, wrong regime choices, missed HRA claims — avoidable errors.',
      },
    ],
  },
  {
    slug: 'personal-finance-foundations',
    title: 'Personal Finance Foundations',
    description: 'Learn the basics. Stay ahead always.',
    iconName: 'Wallet',
    subtopics: [
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
  },
  {
    slug: 'market-economy-basics',
    title: 'Market & Economy Basics',
    description: 'Learn the basics. Stay ahead always.',
    iconName: 'LineChart',
    subtopics: [
      {
        title: 'What Is the Stock Market?',
        description: "How markets work, who participates, and why they matter even if you don't invest directly.",
      },
      {
        title: 'Sensex vs Nifty',
        description: "What these indices measure, how they're calculated, and what movements actually mean.",
      },
      {
        title: 'How the Economy Affects Your Investments',
        description: 'Inflation, interest rates, GDP — how macro events ripple into your portfolio.',
      },
      {
        title: 'REITs and Alternate Investments',
        description: 'Real estate investment trusts, gold, bonds — options beyond mutual funds.',
      },
      {
        title: 'Reading Financial News Without Getting Confused',
        description: 'A guide to cutting through noise — what to track, what to ignore.',
      },
      {
        title: 'Key Financial Terms You Must Know',
        description: 'AUM, NAV, expense ratio, alpha, beta — a plain-English glossary for everyday investors.',
      },
    ],
  },
];

export function getKnowledgePillarBySlug(slug: string): KnowledgePillar | undefined {
  return KNOWLEDGE_PILLARS.find((p) => p.slug === slug);
}
