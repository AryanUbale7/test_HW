import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[key] = value.trim();
  }
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL || '',
  env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      persistSession: false,
    }
  }
);

const now = new Date();
const getPastDate = (daysAgo) => {
  const d = new Date(now);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

async function seed() {
  console.log('=== Starting Mock Blog Posts Seed ===');

  // 1. Ensure a primary author exists in the database
  const { data: authors, error: authorError } = await supabase.from('authors').select('id');
  if (authorError) {
    console.error('Error checking authors table:', authorError.message);
    return;
  }

  let authorId = '';
  if (!authors || authors.length === 0) {
    console.log('No authors found. Seeding primary author: Aryan Ubale...');
    const { data: newAuthor, error: insertAuthorError } = await supabase
      .from('authors')
      .insert({
        name: 'Aryan Ubale',
        bio: 'AMFI-registered Mutual Fund Distributor in Mumbai, Maharashtra, India. helping families create, protect, and pass on wealth.',
        photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=70',
        credentials: ['AMFI-registered MFD', 'PMS & SIF Distributor']
      })
      .select('id')
      .single();

    if (insertAuthorError || !newAuthor) {
      console.error('Error seeding primary author:', insertAuthorError?.message);
      return;
    }
    authorId = newAuthor.id;
    console.log('Primary author seeded successfully with ID:', authorId);
  } else {
    authorId = authors[0].id;
    console.log('Using existing primary author ID:', authorId);
  }

  // 2. Clear out any existing mock posts to make the seed idempotent
  console.log('Clearing existing mock posts starting with "mock-"...');
  const { error: deletePostsError } = await supabase
    .from('posts')
    .delete()
    .like('slug', 'mock-%');

  if (deletePostsError) {
    console.error('Error clearing mock posts:', deletePostsError.message);
    return;
  }

  // 3. Define the 15 mock posts
  const mockPosts = [
    // --- Creation Pillar (5 Posts) ---
    {
      title: 'MOCK: Why Starting Small with SIPs Still Builds Real Wealth',
      slug: 'mock-starting-small-sips-wealth',
      excerpt: 'Discover how consistency and rupee-cost averaging allow small, regular investments to build substantial capital over time.',
      body: `<h2>The Power of Starting Small</h2><p>In wealth creation, the speed at which you start often matters far more than the initial amount you deploy. For many first-time investors, waiting for a large pool of capital is the single greatest obstacle to building wealth. Systematic Investment Plans (SIPs) solve this challenge by allowing families to invest fixed amounts regularly, typically monthly.</p><h2>Understanding Rupee-Cost Averaging</h2><p>When you invest a fixed sum at regular intervals, you automatically purchase more mutual fund units when prices are low and fewer units when prices are high. This mechanism, known as rupee-cost averaging, removes the emotional urge to time the market. Over long investment horizons, this disciplined, mechanical approach averages out the purchase costs, mitigating the impact of short-term volatility.</p><h2>The Mathematical Reality of Compounding</h2><p>Compounding rewards patience and duration. An investment allowed to compound steadily over fifteen or twenty years gains momentum in its later stages as returns generate their own returns. By starting early—even with a modest regular commitment—you leverage the compound interest curve to build a durable wealth foundation without straining your immediate cash flow.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=640&q=70',
      arm: 'Creation',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(40),
      author_id: authorId,
      seo_title: 'MOCK: Why Starting Small with SIPs Builds Long-Term Wealth',
      seo_description: 'Learn how consistency, rupee-cost averaging, and long-term compounding turn small regular SIPs into substantial capital foundations.'
    },
    {
      title: 'MOCK: Understanding Asset Allocation for First-Time Investors',
      slug: 'mock-understanding-asset-allocation',
      excerpt: 'A beginner-friendly guide to balancing equities, debt, and other asset classes based on your goals and risk tolerance.',
      body: `<h2>The Foundation of Portfolio Stability</h2><p>Asset allocation is the practice of distributing your capital across different asset categories, such as equities, debt, gold, and alternative vehicles. It is the single most critical driver of portfolio risk and return, far outweighing individual product selection. The primary objective is to build a structure where asset classes do not move in perfect lockstep.</p><h2>Balancing Growth and Protection</h2><p>Equities provide the growth engine necessary to beat inflation over long periods, but they carry higher short-term volatility. Debt instruments offer capital preservation and income stability, cushioning the portfolio during equity downturns. A balanced asset allocation blends these characteristics based on your family's specific milestones, age, and risk appetite.</p><h2>The Discipline of Periodic Rebalancing</h2><p>As markets move, your portfolio's actual asset mix will drift from its target allocation. For instance, a strong equity market can turn a 60/40 equity-to-debt mix into a 70/30 mix, exposing you to higher risk. Periodic rebalancing involves selling a portion of overperforming assets and buying underperforming ones, restoring your target risk profile with objective discipline.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=640&q=70',
      arm: 'Creation',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(35),
      author_id: authorId,
      seo_title: 'MOCK: Asset Allocation Guide for First-Time Investors',
      seo_description: 'An educational breakdown of asset allocation, balancing growth with stability, and the strategic importance of periodic portfolio rebalancing.'
    },
    {
      title: 'MOCK: The Case for Patience in Long-Term Investing',
      slug: 'mock-case-for-patience-investing',
      excerpt: 'Why tuning out short-term market noise is the most critical skill for achieving your family\'s financial milestones.',
      body: `<h2>Tuning Out the Daily Noise</h2><p>Modern financial media provides a continuous stream of short-term commentary, market predictions, and macroeconomic warnings. For long-term investors, this abundance of information often translates into behavioral traps. Reacting to daily fluctuations or altering your strategy based on news headlines is the primary cause of portfolio underperformance.</p><h2>The Cost of Frequent Churning</h2><p>Every time you alter your portfolio—buying or selling assets in response to market momentum—you incur transaction expenses and potential capital gains taxes. More importantly, frequent trading interrupts the compounding cycle. True wealth creation is a quiet, deliberate process that requires letting your asset allocation do the heavy lifting over multiple years.</p><h2>Focusing on Milestones over Benchmarks</h2><p>A successful investment plan measures progress by the achievement of specific family goals—such as children's higher education or retirement security—rather than outperforming a stock index in a single quarter. By keeping your focus aligned with personal milestones, maintaining patience through market cycles becomes a natural, stress-free discipline.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=640&q=70',
      arm: 'Creation',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(30),
      author_id: authorId,
      seo_title: 'MOCK: The Value of Patience in Generational Investing',
      seo_description: 'Understand the behavioral traps of short-term market noise, the costs of portfolio churn, and focusing on long-term family milestones.'
    },
    {
      title: 'MOCK: PMS vs Mutual Funds: Who Should Consider What',
      slug: 'mock-pms-vs-mutual-funds',
      excerpt: 'Demystifying the key differences in minimum investment thresholds, customization, and fee structures between PMS and Mutual Funds.',
      body: `<h2>Different Vehicles for Different Portfolios</h2><p>Both Mutual Funds and Portfolio Management Services (PMS) provide professional management of asset portfolios, but they serve different wealth profiles and regulatory categories. Under SEBI regulations, a Mutual Fund pools capital from thousands of investors, whereas a PMS manages customized individual accounts, requiring a minimum ticket size of ₹50 lakhs.</p><h2>Pooled Ownership vs. Individual Securities</h2><p>In a mutual fund, you own units of the shared fund. In a PMS, you directly own the underlying shares in your demat account. This direct ownership allows a portfolio manager to customize the strategy, manage individual tax implications, and construct concentrated portfolios that are not bound by mutual fund diversification rules.</p><h2>Comparing Cost and Governance Structure</h2><p>Mutual funds operate under a strict, all-inclusive expense ratio capped by SEBI, built directly into the regular or direct plans. PMS fee structures can include fixed management fees, performance-linked profit sharing, and exit load setups. Understanding these cost models and aligning them with your net worth is essential before selecting a vehicle.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=640&q=70',
      arm: 'Creation',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(25),
      author_id: authorId,
      seo_title: 'MOCK: PMS vs Mutual Funds Comparison in India',
      seo_description: 'An educational guide comparing professional wealth vehicles: minimum thresholds, pooled vs direct ownership, and fee structure differences.'
    },
    {
      title: 'MOCK: How Market Cycles Test Investor Discipline',
      slug: 'mock-market-cycles-discipline',
      excerpt: 'Recent market trends show that investors who maintain their planned asset allocation during volatility achieve greater long-term stability.',
      body: `<h2>Volatility is a Structural Characteristic</h2><p>Market corrections and economic cycles are regular, healthy features of a functioning financial system. However, when a correction occurs, it acts as a severe psychological test. Volatility triggers loss aversion, causing investors to consider selling assets at market lows to "stop the bleeding," which lock in temporary losses permanently.</p><h2>Historical Context of Recoveries</h2><p>Historical data indicates that market downturns are followed by recovery phases, though the duration and trajectory vary. Attempting to exit the market before a drop and re-enter at the bottom requires two correct decisions. Missing even a few of the market's best recovery days severely degrades long-term compounding results.</p><h2>The Value of a Written Policy</h2><p>Maintaining a written Investment Policy Statement (IPS) detailing your asset allocation, emergency funds, and goals acts as an anchor. When volatility rises, reviewing this written commitment helps remove emotional bias, ensuring you stick to the plan rather than making reactive, impulsive changes.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1500628557208-0587e727af0c?auto=format&fit=crop&w=640&q=70',
      arm: 'Creation',
      type: 'News',
      source_url: 'https://example.com/mock-news-market-cycles',
      status: 'published',
      published_at: getPastDate(20),
      author_id: authorId,
      seo_title: 'MOCK: Navigating Market Volatility and Investor Discipline',
      seo_description: 'Explore why market corrections are structural features, the behavioral cost of panic selling, and how to stay disciplined during cycles.'
    },

    // --- Protection Pillar (5 Posts) ---
    {
      title: 'MOCK: Why Term Insurance Should Come Before Any Investment',
      slug: 'mock-why-term-insurance-first',
      excerpt: 'Learn why shielding your family\'s basic financial security is the necessary foundation of all wealth-building plans.',
      body: `<h2>The Defensive Foundation of Wealth</h2><p>A complete financial architecture requires a balance of offense and defense. While equity mutual funds and PMS serve as your wealth-building offense, insurance is your defense. Launching into investment plans without securing basic protection is a structural risk. A single crisis can force you to liquidate long-term assets, halting your compounding process.</p><h2>The Pure Risk Nature of Term Insurance</h2><p>Term insurance is a pure risk protection product. Unlike traditional endowment plans, it has no savings component, survival benefits, or maturity values. Because it focuses solely on risk protection, term insurance offers exceptionally high coverage (sum assured) for a very low, affordable premium, making it the most cost-efficient protection tool available.</p><h2>Securing Your Income Stream</h2><p>For dependents, the primary breadwinner's income is their survival engine. Term insurance replaces this economic value, ensuring that in the event of an untimely demise, the family can pay off liabilities, maintain their standard of living, and achieve planned milestones without being forced into financial compromises.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&w=640&q=70',
      arm: 'Protection',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(32),
      author_id: authorId,
      seo_title: 'MOCK: Why Term Life Insurance is Your First Financial Step',
      seo_description: 'An educational breakdown of pure risk protection, income replacement, and why term insurance forms the foundation of all wealth plans.'
    },
    {
      title: 'MOCK: How Much Life Cover Does a Family Actually Need',
      slug: 'mock-how-much-life-cover',
      excerpt: 'A straightforward guide to calculating your Human Life Value (HLV) to secure sufficient protection for your dependents.',
      body: `<h2>Avoiding the Rule-of-Thumb Trap</h2><p>Many individuals purchase life insurance based on arbitrary round numbers, such as ₹1 crore, without calculating their actual requirements. This arbitrary approach often leaves families underinsured. Determining sufficient life cover requires an objective methodology called the Human Life Value (HLV) calculation.</p><h2>The HLV Framework</h2><p>The HLV calculation framework measures the economic gap left in your absence. It sums your family's ongoing annual living expenses over the working years, adds all outstanding liabilities (such as home loans or business debts), adds major future milestones (like children's higher education), and subtracts your existing liquid assets.</p><h2>Adjusting for Inflation and Life Stages</h2><p>Medical inflation and changing lifestyles mean your insurance requirements are not static. A cover that felt sufficient ten years ago may fall short today. Reviewing your HLV every five years, or after major life events like marriage, childbirth, or acquiring a home loan, ensures your protection level remains robust.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=640&q=70',
      arm: 'Protection',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(28),
      author_id: authorId,
      seo_title: 'MOCK: How to Calculate Human Life Value (HLV) for Life Cover',
      seo_description: 'Discover the Human Life Value (HLV) method for calculating life insurance, taking into account expenses, debts, and milestones.'
    },
    {
      title: 'MOCK: Understanding Riders: What They Add to a Base Policy',
      slug: 'mock-understanding-riders-insurance',
      excerpt: 'A simple overview of critical illness, accidental death, and waiver of premium riders to enhance your protection cover.',
      body: `<h2>Customizing Your Protection Blueprint</h2><p>A basic term insurance policy pays a death benefit to your nominees. However, serious medical diagnoses or accidents can cause severe income loss while you are still alive. Riders are supplementary add-ons that customize your base term policy to cover these living risks.</p><h2>Critical Illness and Disability Protection</h2><p>A Critical Illness Rider pays a lump sum upon the diagnosis of specified illnesses, such as cancer or heart failure, helping fund treatment and replace lost income. An Accidental Total and Permanent Disability rider provides financial support if an accident results in loss of livelihood, cushioning the family from sudden debts.</p><h2>Waiver of Premium: A Vital Safeguard</h2><p>The Waiver of Premium rider ensures that if you are diagnosed with a critical illness or suffer permanent disability, all future premiums for the policy are waived, while the base cover remains active. This prevents your protection from lapses at a time when your cash flow is under maximum stress.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=640&q=70',
      arm: 'Protection',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(22),
      author_id: authorId,
      seo_title: 'MOCK: Guide to Term Insurance Riders in India',
      seo_description: 'Learn about critical illness, accidental disability, and waiver of premium riders, and how they strengthen your base policy.'
    },
    {
      title: 'MOCK: Common Gaps Families Miss in Their Protection Cover',
      slug: 'mock-common-protection-gaps',
      excerpt: 'From medical inflation to ignoring liability coverage, here are the most critical gaps that could expose your wealth.',
      body: `<h2>The Danger of Fragmented Protection</h2><p>Many families assume they are secure because they hold basic insurance policies. However, fragmented or outdated coverage often leaves substantial gaps. A common vulnerability is relying solely on corporate health insurance, which lapses instantly if you transition between jobs or start a business.</p><h2>Ignoring Medical Inflation in Health Cover</h2><p>Hospitalization costs in India are rising faster than general inflation. A base health cover of ₹5 lakhs or ₹10 lakhs can easily be exhausted by a single major surgery. Supplementing your base health policy with a high-limit "Super Top-up" cover is a highly cost-effective way to secure protection against catastrophic bills.</p><h2>Unhedged Liabilities and Debt Risks</h2><p>When you take on large liabilities, like a home loan, you create an immediate vulnerability for your heirs. If the earner passes away, the family may be forced to sell assets to clear the debt. Securing a dedicated term insurance policy matching the outstanding loan amount protects your family's home and assets.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=640&q=70',
      arm: 'Protection',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(15),
      author_id: authorId,
      seo_title: 'MOCK: Identifying Gaps in Family Insurance Cover',
      seo_description: 'An educational review of common insurance gaps, corporate cover limitations, super top-ups, and securing home loan liabilities.'
    },
    {
      title: 'MOCK: Claim Settlement Ratio: What It Actually Tells You',
      slug: 'mock-claim-settlement-ratio-truth',
      excerpt: 'Analyzing IRDAI\'s latest figures to understand what the claim settlement ratio means for policyholders in India.',
      body: `<h2>Reading Beyond the Headlines</h2><p>When selecting an insurance provider, families often rely heavily on the Claim Settlement Ratio (CSR) published annually by the IRDAI. While CSR is a useful indicator of an insurer's historic payouts, it is often misunderstood. A high ratio is not an absolute guarantee of payout for an individual claim.</p><h2>How Insurers Calculate the CSR</h2><p>The Claim Settlement Ratio represents the percentage of claims paid out of the total claims received by the company in a financial year. If an insurer receives 10,000 claims and pays 9,900, its CSR is 99%. The remaining 1% represents claims rejected due to fraud, non-disclosure of medical facts, or unresolved documentation.</p><h2>The Importance of Utmost Good Faith</h2><p>The absolute foundation of an insurance contract is the legal principle of "Utmost Good Faith." Insurers reject claims primarily because policyholders failed to disclose pre-existing illnesses or habits (like smoking) during application. Fully disclosing all facts and filling out the application yourself is the only way to guarantee a smooth claim settlement.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=640&q=70',
      arm: 'Protection',
      type: 'News',
      source_url: 'https://example.com/mock-news-claim-ratio',
      status: 'published',
      published_at: getPastDate(12),
      author_id: authorId,
      seo_title: 'MOCK: Demystifying the Insurance Claim Settlement Ratio (CSR)',
      seo_description: 'Understand how IRDAI Claim Settlement Ratio is calculated, why claims get rejected, and the importance of complete disclosure.'
    },

    // --- Legacy Pillar (5 Posts) ---
    {
      title: 'MOCK: Why Every Family Needs a Will, Regardless of Wealth',
      slug: 'mock-why-every-family-needs-will',
      excerpt: 'Why estate planning is not just for the wealthy, and how a clear Will preserves family harmony and asset distribution.',
      body: `<h2>Estate Planning is Not Just for the Ultra-Wealthy</h2><p>There is a widespread misconception that estate planning and drafting Wills are reserved for high-net-worth individuals or elderly family members. In reality, any individual who owns a bank account, mutual fund investments, or a family home has an estate. A Will is simply a set of clear instructions for transitioning control of these assets.</p><h2>The Risks of Intestate Succession</h2><p>If you pass away without leaving a valid Will, you die "intestate." Your assets are then distributed according to the default succession laws governing your religion (such as the Hindu Succession Act). These default legal frameworks are rigid and may not match your personal intentions, often leading to administrative delays or family disputes.</p><h2>Simplifying the Transition for Heirs</h2><p>A Will allows you to name a trusted executor to manage the probate process and distribute assets. It also allows you to appoint guardians for minor children. By documenting your intentions clearly, you shield your grieving family from legal complexities, asset disputes, and unnecessary visits to civil courts.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=640&q=70',
      arm: 'Legacy',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(38),
      author_id: authorId,
      seo_title: 'MOCK: Will Writing and Estate Planning Essentials in India',
      seo_description: 'An educational guide explaining the importance of Wills, the risks of dying intestate, and simplifying asset transition for heirs.'
    },
    {
      title: 'MOCK: Nomination vs Succession: A Common Confusion Explained',
      slug: 'mock-nomination-vs-succession',
      excerpt: 'Understand why a nominee is merely a custodian of your assets, not the ultimate owner, under Indian succession laws.',
      body: `<h2>The Nominee is Not the Legal Heir</h2><p>In India, millions of bank accounts and mutual fund portfolios have designated nominees. However, a vast majority of asset holders mistakenly believe that the nominee automatically becomes the owner of the asset upon their death. Under Indian law, a nominee is merely a convenient custodian, not the ultimate owner.</p><h2>The Custodian Role of a Nominee</h2><p>A nominee's primary role is to receive the assets from the financial institution upon the holder's death. This prevents the assets from being locked up during legal transitions. Once the nominee receives the assets, they are legally bound to hold them in trust and distribute them to the legal heirs named in the Will or determined by intestate succession.</p><h2>Aligning Nominations with Your Will</h2><p>Because nominations and Wills serve different legal functions, conflicts can arise if they do not match. For example, if you nominate your sibling on a mutual fund but name your spouse in your Will, the nominee must hand over the capital to your spouse. Aligning all nominations with the beneficiaries named in your Will is the key to preventing disputes.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=640&q=70',
      arm: 'Legacy',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(34),
      author_id: authorId,
      seo_title: 'MOCK: Nomination vs Legal Heirship in India Explained',
      seo_description: 'Explore the legal distinction between a nominee and a legal heir in Indian estate planning, and how to align assets with your Will.'
    },
    {
      title: 'MOCK: How Private Trusts Support Multi-Generational Planning',
      slug: 'mock-how-private-trusts-work',
      excerpt: 'An introductory guide to how trusts shield assets, bypass probate, and manage payouts to beneficiaries over time.',
      body: `<h2>A Sophisticated Legacy Instrument</h2><p>While a Will takes effect only after death, a Private Family Trust is a legal structure that operates during your lifetime. It allows a settlor (the creator of the trust) to transfer assets to a trustee (a trusted individual or entity) to manage on behalf of specific beneficiaries (such as children or dependents).</p><h2>Protecting Assets from Claims</h2><p>Assets transferred to an irrevocable private trust are no longer owned by you personally. This separation shields family capital from business risks, creditor claims, or divorce settlements. It also ensures that if the settlor faces professional litigation, the family's basic capital remains secure.</p><h2>Bypassing Probate and Managing Payouts</h2><p>Because the trust continues to exist after the settlor's death, assets held within it do not undergo the public, time-consuming probate process. Furthermore, a trust allows you to specify conditions for how and when payouts should be made, preventing young heirs from mismanaging a sudden windfall.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=640&q=70',
      arm: 'Legacy',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(26),
      author_id: authorId,
      seo_title: 'MOCK: Private Family Trusts in Estate Planning India',
      seo_description: 'Discover how family trusts provide asset protection, control payouts to beneficiaries, and bypass the probate process.'
    },
    {
      title: 'MOCK: Starting the Legacy Conversation With Your Family',
      slug: 'mock-starting-legacy-conversation',
      excerpt: 'Practical tips to initiate conversations with dependents regarding estate planning, nominees, and location of critical documents.',
      body: `<h2>Overcoming the Cultural Taboo</h2><p>In many Indian families, discussing inheritance, Wills, or what happens after death is culturally avoided. This hesitation often leaves dependents completely unaware of the family's financial standing, outstanding liabilities, and the location of critical documents when a crisis occurs.</p><h2>Framing the Discussion Around Stewardship</h2><p>To reduce emotional stress, frame the conversation around stewardship and organization rather than mortality. Discussing legacy planning as an act of love and organization helps dependents understand that the objective is to protect their peace of mind and simplify administrative details later.</p><h2>Creating a Shared Document Checklist</h2><p>Begin by compiling a shared secure checklist containing details of all bank accounts, mutual fund portfolios, insurance policies, property deeds, and corresponding nominees. Storing this list alongside a copy of your Will in a secure location known to your spouse or children is the single most practical legacy step.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&w=640&q=70',
      arm: 'Legacy',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(18),
      author_id: authorId,
      seo_title: 'MOCK: How to Start the Estate Planning Conversation',
      seo_description: 'An educational guide on initiating family discussions about Wills, sharing asset checklists, and organizing key document records.'
    },
    {
      title: 'MOCK: What Happens Without a Will in India',
      slug: 'mock-what-happens-without-will',
      excerpt: 'An overview of intestate succession rules and how assets are distributed under personal laws if you pass away without a Will.',
      body: `<h2>Intestate Succession Regulations</h2><p>When an individual passes away without leaving a valid Will, their estate is subject to intestate succession laws. In India, these rules are governed by personal laws based on religion, such as the Hindu Succession Act, 1956, or the Indian Succession Act, 1925, which apply to Christians and Parsis.</p><h2>The Hierarchy of Legal Heirs</h2><p>Under Hindu law, for example, the property of a deceased male is distributed first among Class I heirs, which include his spouse, children, and mother. If no Class I heirs exist, the estate transitions to Class II heirs. This rigid hierarchy ignores personal relationships or individual dependency, sometimes leaving close companions without legal claims.</p><h2>Administrative and Legal Hurdles</h2><p>Without a Will, financial institutions cannot transfer bank balances or mutual fund units simply based on nominations if the amount exceeds small thresholds. Heirs must secure a Succession Certificate or Letters of Administration from a civil court, a process that can take months and incur high court fee duties.</p>`,
      cover_image_url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=640&q=70',
      arm: 'Legacy',
      type: 'Insight',
      status: 'published',
      published_at: getPastDate(8),
      author_id: authorId,
      seo_title: 'MOCK: Intestate Succession Rules in India Guide',
      seo_description: 'An educational guide to legal inheritance hierarchies, Class I heirs, and administrative hurdles when dying without a Will.'
    }
  ];

  // 4. Batch insert all 15 mock posts
  console.log(`Inserting ${mockPosts.length} mock posts into database...`);
  const { data: insertedPosts, error: insertError } = await supabase
    .from('posts')
    .insert(mockPosts)
    .select('title, slug');

  if (insertError) {
    console.error('Error inserting mock posts:', insertError.message);
    return;
  }

  console.log('=== Mock Posts Seeded Successfully ===');
  console.log('Inserted titles:');
  insertedPosts?.forEach(p => console.log(`- ${p.title} (slug: ${p.slug})`));
}

seed();
