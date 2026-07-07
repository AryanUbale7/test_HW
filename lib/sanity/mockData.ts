export const mockPosts = [
  {
    title: 'Navigating Volatility: The Discipline of Goal-Based Investing',
    slug: 'discipline-goal-based-investing',
    excerpt: 'Market fluctuations are inevitable. Discover how a rigorous, goal-based approach insulates your long-term wealth creation from short-term noise.',
    arm: 'Creation',
    type: 'Insight',
    publishedAt: new Date(Date.now() - 1000000000).toISOString(),
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] In periods of economic uncertainty, the natural instinct is to react. However, historical data consistently demonstrates that strategic asset allocation and emotional discipline outperform market timing. By aligning your portfolio strictly with your predetermined milestones, we remove speculation from the equation.' }]
      }
    ]
  },
  {
    title: 'The Shift Toward Alternative Assets in High-Net-Worth Portfolios',
    slug: 'alternative-assets-hnw-portfolios',
    excerpt: 'An analysis of why sophisticated investors are increasingly diversifying beyond public equities to seek uncorrelated returns.',
    arm: 'Creation',
    type: 'Insight',
    publishedAt: new Date(Date.now() - 2000000000).toISOString(),
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] Diversification has evolved. While public equities remain a cornerstone of growth, alternative investments offer compelling non-correlated return profiles. This strategy requires rigorous due diligence and a deep understanding of liquidity constraints.' }]
      }
    ]
  },
  {
    title: 'Why Term Life is the Cornerstone of Wealth Protection',
    slug: 'term-life-cornerstone-protection',
    excerpt: 'Demystifying insurance: why we prioritize pure-risk term coverage to maximize your defensive posture efficiently.',
    arm: 'Protection',
    type: 'Insight',
    publishedAt: new Date(Date.now() - 3000000000).toISOString(),
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] Insurance is fundamentally a defensive tool, not an investment vehicle. By utilizing pure-risk term life structures, you secure maximum coverage for your family at a fraction of the cost of complex endowment products, leaving more capital free for strategic wealth creation.' }]
      }
    ]
  },
  {
    title: 'Protecting the Family Business from Unforeseen Liabilities',
    slug: 'protecting-family-business-liabilities',
    excerpt: 'Essential strategies for founders to ring-fence their personal assets from business risks.',
    arm: 'Protection',
    type: 'News',
    sourceUrl: 'https://www.wsj.com',
    publishedAt: new Date(Date.now() - 4000000000).toISOString(),
    thumbnailUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1000',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] Founders often have their personal net worth inextricably tied to their enterprise. Implementing robust legal and financial firewalls is critical to ensuring that business volatility does not compromise your family\'s financial security.' }]
      }
    ]
  },
  {
    title: 'The Blueprint for Multi-Generational Wealth Transfer',
    slug: 'blueprint-generational-wealth-transfer',
    excerpt: 'Succession is more than a legal transaction. It is the preservation of your values and the seamless transition of stewardship.',
    arm: 'Legacy',
    type: 'Insight',
    publishedAt: new Date(Date.now() - 5000000000).toISOString(),
    thumbnailUrl: 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&q=80&w=1000',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] A Will dictates who receives your assets, but a comprehensive legacy plan dictates how they receive them. By utilizing private family trusts and clear governance structures, we help mitigate familial friction and protect the integrity of the estate.' }]
      }
    ]
  },
  {
    title: 'Navigating the Complexity of Beneficiary Nominations',
    slug: 'navigating-beneficiary-nominations',
    excerpt: 'A seemingly simple administrative task that, if neglected, can derail the most meticulously drafted estate plan.',
    arm: 'Legacy',
    type: 'Insight',
    publishedAt: new Date(Date.now() - 6000000000).toISOString(),
    thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] Conflicts between Wills and financial account nominations are a leading cause of probate delays. Regular auditing of your nominations ensures that your intended beneficiaries receive access to capital immediately and without legal hurdles.' }]
      }
    ]
  }
];

export const mockResources = [
  {
    _id: 'res1',
    title: '2026 Wealth Architecture Guide',
    description: 'A comprehensive overview of structural changes in tax and inheritance laws.',
    gatedByEmail: true,
    fileUrl: '#'
  },
  {
    _id: 'res2',
    title: 'Due Diligence Checklist for Alternative Assets',
    description: 'Our proprietary framework for evaluating private equity and venture funds.',
    gatedByEmail: false,
    fileUrl: '#'
  }
];

export const mockFaqs = [
  {
    _id: 'faq1',
    question: 'How do you charge for your services?',
    answer: 'As an AMFI-registered Mutual Fund Distributor, we are compensated via commissions paid by the Asset Management Companies on the funds we distribute. This means no direct advisory fees for mutual fund distribution.',
    arm: 'General'
  },
  {
    _id: 'faq2',
    question: 'Do you offer direct equity advisory?',
    answer: 'We focus on structural wealth creation via mutual funds, PMS, and SIFs. For direct equity trading, we coordinate with your existing broker or recommend specialized equity advisors.',
    arm: 'Creation'
  },
  {
    _id: 'faq3',
    question: 'Why do you recommend term life over ULIPs?',
    answer: 'Term life provides maximum coverage at minimum cost, serving pure protective purposes. We prefer to separate insurance from investment to maximize both your coverage and your returns.',
    arm: 'Protection'
  }
];
