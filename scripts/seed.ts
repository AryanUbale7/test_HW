import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_WRITE_TOKEN

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token
})

const posts = [
  // CREATION
  {
    _type: 'post',
    title: 'Navigating Volatility: The Discipline of Goal-Based Investing',
    slug: { _type: 'slug', current: 'discipline-goal-based-investing' },
    excerpt: 'Market fluctuations are inevitable. Discover how a rigorous, goal-based approach insulates your long-term wealth creation from short-term noise.',
    arm: 'Creation',
    type: 'Insight',
    status: 'published', // Using published as per Option 1 in the plan for visual feedback
    publishedAt: new Date(Date.now() - 1000000000).toISOString(),
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] In periods of economic uncertainty, the natural instinct is to react. However, historical data consistently demonstrates that strategic asset allocation and emotional discipline outperform market timing. By aligning your portfolio strictly with your predetermined milestones, we remove speculation from the equation.' }]
      }
    ]
  },
  {
    _type: 'post',
    title: 'The Shift Toward Alternative Assets in High-Net-Worth Portfolios',
    slug: { _type: 'slug', current: 'alternative-assets-hnw-portfolios' },
    excerpt: 'An analysis of why sophisticated investors are increasingly diversifying beyond public equities to seek uncorrelated returns.',
    arm: 'Creation',
    type: 'Insight',
    status: 'published',
    publishedAt: new Date(Date.now() - 2000000000).toISOString(),
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] Diversification has evolved. While public equities remain a cornerstone of growth, alternative investments offer compelling non-correlated return profiles. This strategy requires rigorous due diligence and a deep understanding of liquidity constraints.' }]
      }
    ]
  },

  // PROTECTION
  {
    _type: 'post',
    title: 'Why Term Life is the Cornerstone of Wealth Protection',
    slug: { _type: 'slug', current: 'term-life-cornerstone-protection' },
    excerpt: 'Demystifying insurance: why we prioritize pure-risk term coverage to maximize your defensive posture efficiently.',
    arm: 'Protection',
    type: 'Insight',
    status: 'published',
    publishedAt: new Date(Date.now() - 3000000000).toISOString(),
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] Insurance is fundamentally a defensive tool, not an investment vehicle. By utilizing pure-risk term life structures, you secure maximum coverage for your family at a fraction of the cost of complex endowment products, leaving more capital free for strategic wealth creation.' }]
      }
    ]
  },
  {
    _type: 'post',
    title: 'Protecting the Family Business from Unforeseen Liabilities',
    slug: { _type: 'slug', current: 'protecting-family-business-liabilities' },
    excerpt: 'Essential strategies for founders to ring-fence their personal assets from business risks.',
    arm: 'Protection',
    type: 'News',
    sourceUrl: 'https://www.wsj.com',
    status: 'published',
    publishedAt: new Date(Date.now() - 4000000000).toISOString(),
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] Founders often have their personal net worth inextricably tied to their enterprise. Implementing robust legal and financial firewalls is critical to ensuring that business volatility does not compromise your family\'s financial security.' }]
      }
    ]
  },

  // LEGACY
  {
    _type: 'post',
    title: 'The Blueprint for Multi-Generational Wealth Transfer',
    slug: { _type: 'slug', current: 'blueprint-generational-wealth-transfer' },
    excerpt: 'Succession is more than a legal transaction. It is the preservation of your values and the seamless transition of stewardship.',
    arm: 'Legacy',
    type: 'Insight',
    status: 'published',
    publishedAt: new Date(Date.now() - 5000000000).toISOString(),
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] A Will dictates who receives your assets, but a comprehensive legacy plan dictates how they receive them. By utilizing private family trusts and clear governance structures, we help mitigate familial friction and protect the integrity of the estate.' }]
      }
    ]
  },
  {
    _type: 'post',
    title: 'Navigating the Complexity of Beneficiary Nominations',
    slug: { _type: 'slug', current: 'navigating-beneficiary-nominations' },
    excerpt: 'A seemingly simple administrative task that, if neglected, can derail the most meticulously drafted estate plan.',
    arm: 'Legacy',
    type: 'Insight',
    status: 'published',
    publishedAt: new Date(Date.now() - 6000000000).toISOString(),
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '[EDUCATIONAL PLACEHOLDER] Conflicts between Wills and financial account nominations are a leading cause of probate delays. Regular auditing of your nominations ensures that your intended beneficiaries receive access to capital immediately and without legal hurdles.' }]
      }
    ]
  }
];

async function seed() {
  if (projectId === 'dummy-project-id') {
    console.warn('Using dummy project ID. The script will run but cannot connect to Sanity.')
  }

  if (!token && projectId !== 'dummy-project-id') {
    console.error('Please provide SANITY_API_WRITE_TOKEN in .env.local to seed data.')
    process.exit(1)
  }

  try {
    console.log('Starting seed process...')
    for (const post of posts) {
      const result = await client.create(post as any)
      console.log(`Seeded post: ${post.title} (${result._id})`)
    }
    console.log('Seeding complete!')
  } catch (error) {
    console.error('Error seeding posts:', error)
  }
}

seed()
