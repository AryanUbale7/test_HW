export interface SubTopic {
  title: string;
  subtext?: string;
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
    learnBrief: `Everyone starts somewhere usually with more questions than answers, and a quiet worry that everyone else already figured this out. You didn't miss a class, there wasn't one. This first Pillar is for exactly that moment - the first salary, the first SIP, the first time the word "portfolio" sounds like it belongs to someone else. We will keep it simple and honest what the basic pieces are, why they matter, and how to begin without first becoming an expert. Because starting well matters far more than starting perfectly, and the earlier you begin, the more quietly time works in your favour.`,
    understandGuides: [
      {
        title: 'Mutual Funds',
        subtext: 'Where most people actually begin',
        description: `Think like a bunch of people put their money into one common pool, and a professional fund manager takes that pool and spreads it across dozens of companies. So, the day you put in your first Rs 5,000, you quietly become a tiny part-owner of maybe forty or fifty businesses without having to read a single balance sheet yourself. That is really the beauty of it. You get the spread and the expertise, and you get to carry on with your life. For most people just starting out, this is the sensible first door not because anyone sold it to them but because it does the heavy lifting, they don't yet have the time or the appetite for. And yes, all of it rides on the market, so nothing here is promised but that's a conversation for a little later.`
      },
      {
        title: 'SIP (Systematic Investment plan)',
        subtext: 'Investing a little, every month, on purpose',
        description: `SIP is just a slightly fancy name for a simple habit you invest a fixed amount every month on a date you pick, and it happens on its own. Rs 3,000, Rs 5,000, whatever sits comfortably with your budget. What I like about it is that it quietly removes the guesswork. You stop trying to catch the market at the 'right moment' that never quite shows up, and you just keep turning up. And here's the part most people miss in the months the market slips, that same Rs 3,000 happens to buy you a few more units than usual. You are not cheering the fall but you have no reason to fear it either. Over the longer period, it tends to be this steadiness, not any clever move, that does the real work. It isn't a promise of profit. It's simply a calmer way to keep the habit going.`
      },
      {
        title: 'Index Funds',
        subtext: 'Owning the whole market instead of guessing',
        description: `This is something that surprises a lot of first-timers you don't actually have to pick the winners to do alright. An index fund doesn't try to be clever. It just copies a market index, say the Nifty 50, and holds the same companies in the same proportion. So, when the broader market does well, you simply come along for the ride. And because there's no manager making constant calls, the running cost tends to be lower and over a long stretch, cost quietly matters more than people expect. I often say this to someone who feels drowned by choice sometimes the smartest thing isn't to outsmart the market, it's to own a small slice of the whole thing and let time do its bit.`
      },
      {
        title: 'Asset Allocation',
        subtext: 'How you split money between different baskets',
        description: `This one sound technical but is really just common aspect. Asset allocation is simply how you divide your money how much sits in equity, which grows over time but swings around a fair bit, and how much sits in the steadier stuff. It usually matters more than which exact fund you pick. Small example, if you're setting aside money for a house down payment a year from now, putting all of it in equity is asking for a headache, because markets can be moody in the short run. But money you won't touch for ten years can happily ride those ups and downs. So, the real question was never 'which fund is best’, it's “when will I actually need this money”. Get that one right.`
      },
      {
        title: 'Behaviour',
        subtext: 'Why the investor usually matters more than the investment',
        description: `If I had to bet on what decides how well someone does over the years, I wouldn't bet on the fund. I'd bet on the person. I've seen it up close two people in almost the same funds, years apart in how they end up, purely because of how they behaved when things got uncomfortable. One panics the moment the market dips and pulls the money out. Another keeps chasing whatever topped the charts last year, always a step late. And a third just stays put, keeps the SIP running and barely opens the app. You can guess who tends to sleep better. None of this is about being brainy. It's about temperament, the slightly boring discipline of not doing something dramatic every time the headlines get loud. That's the part nobody prints on a brochure and that’s the part which matters most.`
      },
      {
        title: 'Your First Portfolio',
        subtext: 'What it actually feels like to begin',
        description: `\'Portfolio\' is one of those words that sounds like it belongs to older men in suits. It really just means the collection of whatever you own and your first one can be refreshingly boring. A fund or two you genuinely understand. That's it. You don't need a big amount to begin, you need to begin. I have watched people wait years for the 'perfect time' and the 'perfect fund,' when starting small and letting it grow alongside their salary would have served them far better. Your first portfolio isn't meant to impress anyone. It's meant to get you into the game and show you how you react so that by the time the amounts get serious, the habits are already sitting in place.`
      },
      {
        title: 'Common Mistakes',
        subtext: 'The ones almost every beginner makes',
        description: `Let me save you a few bruises. The classic one stopping your SIP the moment the market falls, which is precisely when it's silently working hardest for you. Then there's chasing last year's top performer, forgetting that last year's hero is often this year's straggler. Or collecting eight funds that more or less own the same companies, and calling it variety. And my personal favourite, checking the portfolio every single day and riding an emotional rollercoaster that helps absolutely no one. None of these come from being foolish. They come from being human and from nobody having pointed them out earlier. The aim isn't to never feel the urge, it's to catch yourself in the moment, take a breath, and more often than not, do nothing at all.`
      },
      {
        title: 'Market Corrections',
        subtext: 'What happens when things fall, and why it\'s normal',
        description: `At some point, probably sooner than you'd like after you start, the market may fall. It always does a correction, they call it, usually a drop of ten percent or more from a recent high. The first time you see red against your name, it feels personal, as if you did something wrong. You didn't. Falls are just how markets breathe, they've happened many times before and they'll happen again, and historically the market has gone on to recover and move ahead in time, though of course no one can tell you exactly when or by how much. It is my view to everyone in their first dip, the fall itself isn't the risk. Reacting to it is. Understand this before it arrives, and you'll hold steady when it actually counts. That one bit of understanding can be worth more than any suggestion you'll ever be handed.`
      }
    ],
    moneyConversations: [
      { title: 'How much money do you actually need before you are “allowed” to start investing?', slug: 'allowed-investing-minimum' },
      { title: 'Is it too late to begin if everyone around you seems to have started years ago?', slug: 'too-late-to-begin-investing' },
      { title: 'Should you clear all your loans first, or can saving and investing begin alongside them?', slug: 'loans-vs-investing-priority' },
      { title: "What's the real difference between saving money and investing it and does it matter this early?", slug: 'saving-vs-investing-difference' },
      { title: 'If you can only spare a small amount each month, is it even worth starting?', slug: 'small-amount-investing-worth' },
      { title: "How do you begin investing when you don't fully understand where the money is going?", slug: 'investing-without-expert-knowledge' },
      { title: 'Is it safer to wait until you “know more,” or does waiting quietly cost you something too?', slug: 'waiting-cost-of-inertia' },
      { title: 'When the market falls right after you invest, does it mean you made a mistake?', slug: 'market-falls-after-investing-error' },
      { title: 'How do you tell the difference between real guidance and someone simply selling you something?', slug: 'guidance-vs-product-sales' },
      { title: 'Should your first investment be the one with the highest returns, or the one you understand best?', slug: 'first-investment-highest-returns' },
      { title: "Why does everyone's “best fund” seem different and whom are you supposed to believe?", slug: 'why-best-funds-differ' },
      { title: 'Is checking your investment every day helping you, or quietly making you anxious?', slug: 'daily-portfolio-tracking-anxiety' },
      { title: 'What should you actually do on the first day your investment shows a loss?', slug: 'first-day-portfolio-loss-action' },
      { title: 'Does starting with the “wrong” fund set you back, or is starting at all the bigger win?', slug: 'starting-with-wrong-fund' },
      { title: 'How do you keep a SIP going in a month when money already feels tight?', slug: 'keeping-sip-in-tight-month' },
      { title: 'Is your fear of losing money bigger than your fear of never growing it?', slug: 'fear-of-loss-vs-growth' },
      { title: 'When friends talk about stocks and returns, how do you know what\'s worth listening to?', slug: 'filtering-friend-investment-advice' },
      { title: 'How do you begin building wealth without feeling you must first become a finance expert?', slug: 'building-wealth-no-expert' }
    ],
  },
  {
    slug: 'when-does-investing-become-more-personal',
    number: 'Pillar 02',
    title: 'When Does Investing Become More Personal?',
    description: 'Personalized investing for larger portfolios.',
    iconName: 'User',
    topicCategory: 'Building',
    learnBrief: `There are few moments in some financial lives when the mutual fund SIP that served beautifully for a decade starts to feel - not wrong, but not quite enough. Maybe the portfolio has grown large. Maybe the questions have grown more personal. This chapter is about that moment, when investing stops being one-size-fits-all and starts asking for a closer fit. We will walk through what changes as the numbers grow, when a portfolio genuinely needs individual attention, and just as honestly when it doesn't. Because the point isn't to reach for something fancier. It's to notice whether you actually need it.`,
    understandGuides: [
      {
        title: 'Is Mutual Fund Still Enough For Me?',
        description: `This starts with a question most people are slightly embarrassed to ask, have I outgrown mutual funds? Sometimes the answer is yes, the portfolio is large, the needs more specific. But just as often, the itch for "something more sophisticated" is really boredom, or a bit of status talking, rather than a genuine gap. For the overwhelming majority, mutual funds remain more than enough, and there's no prize for complicating things. Knowing which camp you are in is the whole point, a far better question than "what's the next level up."`
      },
      {
        title: 'When Does A Portfolio Need Personal Attention?',
        description: `A mutual fund treats everyone in it identically same holdings, same decisions, for the crore and the lakh alike. That's a feature, not a flaw, right up until your situation stops being average. Maybe there's a large concentrated holding, a complicated tax picture, or specific things you want owned or deliberately avoided. This piece is about spotting those signals honestly the point where a shared, standardised portfolio starts to fit a little less well. Not a portfolio size to brag about, but a set of circumstances that silently ask for a closer, more individual fit.`
      },
      {
        title: 'How Much Wealth Changes The Way You Invest?',
        description: `Here is something people rarely warn you about - investing at ten lakh and at ten crore aren't just bigger versions of the same thing, they differ in kind. As the numbers grow, the quiet goal shifts from "grow this" to "don't lose this," a single mistake starts costing far more than it used to, and simplicity becomes more valuable, not less. This is about that shift in mindset. Less about products, more about how bigger money changes what you should genuinely be worried about and, just as usefully, what stops mattering.`
      },
      {
        title: 'Does Bigger Money Need a Different Strategy?',
        description: `The instinct, once a portfolio crosses a certain size, is that it must now need something cleverer. Sometimes that's true. Often it isn't. This is where I would gently separate a real need from the simple pull of exclusivity because complicated doesn't mean better, and some of the calmest large portfolios I have seen are also the simplest. The honest answer to whether bigger money needs a different strategy is only if your goals and constraints have actually changed. If they haven't, extra sophistication usually just adds cost.`
      },
      {
        title: 'Choosing A Professional Money Manager',
        description: `This is where Portfolio Management Services (PMS) actually enters the picture. In plain terms, instead of pooling your money with thousands of others the way a mutual fund does, a SEBI registered portfolio manager runs an individual portfolio held directly in your own name, with securities you can actually see. It begins at a fifty-lakh minimum, usually costs more than a mutual fund, and is taxed differently, since each transaction happens in your hands. When weighing one, the thing that matters least is last year's return what matters is the manager's process, how the portfolio behaves in the bad years, the transparency, and the true cost. The strategy on paper counts for far less than the discipline behind it.`
      },
      {
        title: 'Mistakes Wealthy Investors Make',
        description: `Wealthy investors make a different set of mistakes from beginners and often more expensive ones. Successful professionals neglect their own portfolios while running everything else brilliantly. People over-concentrate in the very thing that made them rich and call it conviction. Others collect complex products for the quiet feeling of exclusivity, or hand things to whoever sounds most impressive rather than whoever's most disciplined. This piece names those patterns plainly. The through-line is simple, more money magnifies the cost of an ordinary mistake, so the discipline that felt optional at ten lakh becomes the entire game at ten crore.`
      }
    ],
    moneyConversations: [
      { title: 'When you hand your portfolio to a manager, are you giving up control or finally admitting you never fully had it?', slug: 'handing-portfolio-control' },
      { title: 'Why do successful professionals often neglect their own investments?', slug: 'professionals-neglect-investments' },
      { title: 'Are you choosing this for what your portfolio genuinely needs, or for how it feels to have "arrive"?', slug: 'need-vs-status-choice' },
      { title: 'How do you know when experience matters more than information?', slug: 'experience-vs-information' },
      { title: 'With PMS you can see every share you own - is that transparency a comfort, or a fresh temptation to interfere?', slug: 'pms-transparency-interference' },
      { title: 'Could watching every buy and sell make you a worse investor, not a better one?', slug: 'frequent-tracking-bad-investor' },
      { title: "Would you stay with a manager through a full year whose decisions you don't entirely understand?", slug: 'staying-without-understanding' },
      { title: 'When a portfolio holds fewer, larger positions, does that feel like conviction or exposure?', slug: 'concentration-conviction-vs-exposure' },
      { title: "Are you at peace owning something you can't exit as quickly or as cleanly as a mutual fund?", slug: 'pms-liquidity-vs-mutual-fund' },
      { title: 'Does paying a visible, higher fee make you value the service more or quietly resent it?', slug: 'visible-higher-fees-resentment' },
      { title: 'Does your manager do better only when you do, or are they paid the same either way?', slug: 'manager-incentive-alignment' },
      { title: 'How much do you need to understand before you can truly trust, rather than simply hope?', slug: 'trust-vs-hope' },
      { title: "Would you recognise the moment it's time to leave a manager and would you have the discipline to act on it?", slug: 'recognizing-when-to-leave-manager' },
      { title: "If you weren't around tomorrow, could your family understand and carry on the arrangement you've built?", slug: 'family-inheriting-pms-arrangement' },
      { title: "When you measure your portfolio against a friend's or the index every quarter, are you tracking performance or feeding anxiety?", slug: 'tracking-performance-vs-anxiety' },
      { title: 'Before asking what it can return, have you asked what job you actually want it to do in your life?', slug: 'portfolio-purpose-in-life' }
    ],
  },
  {
    slug: 'the-space-between-mutual-funds-and-pms',
    number: 'Pillar 03',
    title: 'The Space Between Mutual funds and PMS',
    description: 'Flexible strategies for more sophisticated investor.',
    iconName: 'Sliders',
    topicCategory: 'Building',
    learnBrief: `An SIF, or Specialised Investment Fund, is a newer SEBI-created category that sits between a mutual fund and a Portfolio Management Service. It's built for a more sophisticated investor, carrying a higher entry threshold than an ordinary mutual fund. What sets it apart is freedom: an SIF can use strategies a regular fund can't like taking both sides of a trade or using derivatives to pursue its goals. That flexibility opens up new possibilities, and new risks alongside them. This section is about understanding it clearly, and honestly, before deciding whether it belongs anywhere near your portfolio.`,
    understandGuides: [
      {
        title: 'What Extra Flexibility Are You Actually Paying For in an SIF?',
        description: `An SIF can do things a plain mutual fund can't, take both sides of a trade, use derivatives, shift more tactically as the manager reads the market. That flexibility is the whole pitch, and sometimes it genuinely earns its keep. But flexibility isn't free, and it isn't always useful - the same freedom that can protect you can also be used to take bigger risks with your money. So, the real question isn't "how much can it do," it is - "how much of what it can do, do I actually need" because you're paying for all of it, whether it helps you or not.`
      },
      {
        title: 'Can You Understand the Strategy Before You Invest?',
        description: `Here's a simple, slightly unfair test - could you explain, in two plain sentences, what this fund actually does to earn its returns? If the honest answer is no, that's worth pausing on not because you aren't clever enough, but because a strategy you can't describe is one you can't judge, and can't hold with any conviction when a bad patch arrives. This is about reading the objective and the approach in plain English before the sophistication impresses you. What you don't understand, you tend to abandon at exactly the wrong moment.`
      },
      {
        title: 'Who Should Not Invest in an SIF?',
        description: `Most conversations start with who a product is for. This one deliberately flips it. An SIF isn't unsuitable only for people who can't afford the ticket - it can be a poor fit for someone with a short horizon, someone who'll need the money at short notice, or someone whose stomach turns at a loss they can't easily explain. Financial eligibility and genuine suitability are two very different things. Knowing clearly that you're not the right investor for something is one of the most valuable, and most underrated, financial decisions you can make.`
      },
      {
        title: 'Where Does SIF Fit Between Mutual Funds and PMS?',
        description: `An SIF lives in the gap more flexible and personalised than a mutual fund, less bespoke than a full portfolio service, and sitting between the two on cost and complexity too. Seeing exactly where it sits matters, because it stops you buying it for a job something simpler already does. The useful question isn't "is an SIF good," it is "what does an SIF do that my existing setup doesn't" and if the honest answer is "not much," that's your answer. It's a specific tool for a specific gap, not an upgrade you graduate into.`
      },
      {
        title: 'What Can Go Wrong Even When the Strategy Sounds Intelligent?',
        description: `A strategy can be genuinely clever and still be a poor investment for you that's the uncomfortable truth this one sits with. Derivatives can amplify a loss as easily as a gain. A concentrated position can turn. A short bet can move the wrong way. And all of it leans on the manager's judgement holding up under pressure. Intelligence on paper isn't the same as a good outcome in your hands what protects you isn't how smart the strategy sounds, but how well its worst realistic year fits a loss you could actually live through.`
      },
      {
        title: 'How Easily Can You Actually Get Out?',
        description: `With an open-ended mutual fund, exiting is usually quick and clean. An SIF may not work that way, there can be windows, waiting periods, or simply less liquidity. Before the strategy pulls you in, it's worth asking the unglamorous question - if life changed suddenly, how fast could this become cash again?`
      },
      {
        title: 'Is the Minimum a Door or a Warning?',
        description: `SIFs carry a high entry threshold, and it's tempting to read that as a status badge. It's better read as a signal the regulator's way of pointing to who this is, and isn't, built for. If the only reason it fits is that you can afford the ticket, that's usually a reason to pause, not to proceed.`
      }
    ],
    moneyConversations: [
      { title: 'If an SIF and a mutual fund arrived at the same place, which one quietly cost you more to get there?', slug: 'sif-vs-mutual-fund-cost' },
      { title: "Have you looked at what you'd actually keep after tax — or only at what the strategy is meant to earn?", slug: 'sif-post-tax-returns' },
      { title: "Would you still be comfortable owning this if you couldn't exit the week you suddenly needed the money?", slug: 'sif-liquidity-lockup' },
      { title: 'Does your manager earn more only when you do — or also simply for taking bigger risks?', slug: 'sif-manager-incentives' },
      { title: "If the entry ticket weren't so high, would this product still feel as attractive to you?", slug: 'sif-ticket-size-allure' },
      { title: 'How much of your comfort rests on the strategy itself — and how much on one person continuing to run it well?', slug: 'sif-key-person-risk' },
      { title: "Would you be at peace owning something whose weak quarters you can't fully explain, even to yourself?", slug: 'sif-weak-quarters-explanation' },
      { title: 'Are you adding this to close a real gap in your plan — or to feel your portfolio has finally grown up?', slug: 'sif-status-vs-utility' },
      { title: 'If you removed this SIF tomorrow, would your plan actually fail — or just feel less sophisticated?', slug: 'sif-removal-impact' },
      { title: 'Do you understand this well enough to keep holding it when someone you respect says you were foolish to buy it?', slug: 'holding-sif-under-criticism' },
      { title: 'At your portfolio size, does one misjudged product cost you more than any extra return it might add?', slug: 'sif-misjudged-product-cost' },
      { title: 'Can you describe, in advance, the kind of year that would make you regret this — and are you at peace with it arriving?', slug: 'sif-regret-minimization' },
      { title: 'Would you recognise the moment to walk away from this strategy — and would you act, or keep hoping?', slug: 'sif-when-to-walk-away' },
      { title: "Are you paying for genuine skill and flexibility — or for the quiet comfort of owning what most people can't?", slug: 'sif-skill-vs-exclusivity' },
      { title: "In the end, is this a decision about your money — or about how you'd like to see yourself as an investor?", slug: 'sif-investor-identity-choice' }
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
