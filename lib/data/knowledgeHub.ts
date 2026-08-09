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
    learnBrief: `Something silently changes once you have spent decades building. The question stops being "how do I grow this" and becomes "what happens to it and to them when I am no longer here to explain it." Most people never make that turn. They build carefully and leave chaotically, because talking about it feels distant, or simply always postponable to next year. This chapter is about making that turn early and calmly. Not death paperwork, the far more human work of making sure the people you love inherit clarity, not confusion, your values, not just your valuables. It is the most personal money conversation there is, and the one most families have last, if at all.`,
    understandGuides: [
      {
        title: 'Will Your Family Know What To Do Without You?',
        description: `Most of us keep our financial lives quietly to ourselves the accounts, the logins, the little arrangements only we understand. It feels responsible. But that same privacy can become the very thing that strands your family on the hardest day of their lives. This reframes estate planning as it should be - not a grim exercise about dying, but a simple act of care making sure the people you love aren't left guessing. The measure of a legacy isn't only what you leave, it's whether they can find it.`
      },
      {
        title: 'Have You Left Assets… Or Instructions?',
        description: `You can leave behind a great deal and still leave behind a mess. Money without a map isn't a gift but it's a burden handed to grieving people who don't know where to look or whom to ask. The real difference between wealth and a legacy is instructions, who gets what, where it sits, how it's meant to be handled. This is about closing that gap turning a pile of assets into something your family can actually receive.`
      },
      {
        title: 'When Is A Will Enough?',
        description: `For a great many families, a clear, valid, well-kept will does most of the heavy lifting - it says plainly who inherits what, and spares everyone the guesswork. The trouble is rarely that people pick the wrong instrument, it's that they never get around to the simple one. This looks at what a will genuinely does, and the point in a family's life where it's honestly enough so you don't over-engineer what one well-drafted document could have settled. (The drafting itself is a job for a legal professional - this is about knowing when you need one.)`
      },
      {
        title: 'When Does A Family Need A Trust?',
        description: `A trust isn't a status symbol or a rung on some sophistication ladder - it's a tool for specific situations. It starts to earn its place when life gets more layered, a dependent who'll need lifelong care, a business in the mix, a blended family, a wish for privacy, or a desire to control not just who inherits but how and when. This is less about the mechanics of trusts and more about honestly recognising when your circumstances have grown complex enough to warrant one and, just as importantly, when they haven't.`
      },
      {
        title: 'The Hidden Problems Families Discover Too Late',
        description: `This is the unglamorous, high-stakes one. An outdated nomination. The belief that a nominee is the owner one of India's most expensive misunderstandings. A jointly-held asset that didn't pass the way everyone assumed. Investments nobody knew existed. A phone full of logins that die with you. None of these are exotic they are the ordinary cracks that quietly undo decades of careful work. Naming them in advance is the whole point you can only fix what someone has made you see.`
      },
      {
        title: 'Preparing The Next Generation',
        description: `Here is the part almost nobody mentions, leaving wealth and preparing someone to receive it are two entirely different jobs. Money handed to heirs who were never readied for it has a way of evaporating not from bad luck, but from inexperience. This is about the quieter inheritance - the conversations, the judgement, the values that let the next generation hold what you pass on instead of losing it. You spent years growing the wealth, this is about growing the people who will carry it.`
      },
      {
        title: 'Legacy For NRI Families',
        description: `This is its own world, and a hard one. Children who have built their lives abroad, assets that stayed behind in India, and a web of cross-border complexity in between differing laws, repatriation, and the simple question of who manages the Indian side when the family is spread across time zones. This is about organising your Indian estate clearly and coordinating the pieces that reach across borders, so distance doesn't turn your legacy into a tangle.`
      },
      {
        title: 'Conversations Families Avoid',
        description: `Money and mortality are the two subjects Indian families are best at not discussing and that silence is exactly where the problems grow. We tell ourselves there's time, or that raising it invites bad luck, or that it's simply awkward. Meanwhile the questions that matter go unasked until it's too late to ask them. This is about the conversations themselves, why we dodge them, what the dodging costs, and why having them awkward as they are may be the most valuable thing you ever leave behind.`
      }
    ],
    moneyConversations: [
      { title: "What happens to your wealth if you're still here — but no longer able to decide?", slug: 'wealth-without-decision-capacity' },
      { title: 'Have you named someone to carry out your wishes, or only assumed someone will?', slug: 'executing-wishes-nominee-vs-assumed' },
      { title: 'Does treating your children equally mean leaving them the same — or leaving each what they actually need?', slug: 'equal-vs-equitable-inheritance' },
      { title: "You've planned for your children. Have you ever talked to your parents about theirs?", slug: 'talking-to-parents-estate-plans' },
      { title: "If your children are still young, who raises them — and who guards what you've left for them?", slug: 'guardian-choices-for-minors' },
      { title: 'If you built a business, will it survive the day you can no longer run it?', slug: 'business-continuity-succession' },
      { title: 'Will your daughter inherit as clearly as your son — or only in theory?', slug: 'gender-equality-inheritance' },
      { title: "Is estate planning something you'll do when you're old, or the one thing that can't wait until then?", slug: 'timing-of-estate-planning' },
      { title: "When you're gone, does your family inherit only your assets — or your liabilities too?", slug: 'inheriting-liabilities-debts' },
      { title: 'Have you prepared the one who stays behind — or only planned for the ones who inherit?', slug: 'preparing-surviving-spouse' },
      { title: "Is your will a decision you made once, or one that still matches the life you're living now?", slug: 'will-review-and-updates' },
      { title: "If your children have built their lives abroad, do they even want the India you're leaving them — and have you asked?", slug: 'nri-children-inheriting-indian-estate' }
    ],
  },
  {
    slug: 'understanding-insurance',
    number: 'Pillar 05',
    title: 'Insurance Demystified',
    description: 'Protecting your family, income & health.',
    iconName: 'ShieldCheck',
    topicCategory: 'Protection',
    learnBrief: `Before you grow wealth, you have to protect the person building it and the family leaning on them. That's all insurance really is, a quiet promise that if life takes a sudden turn, the people you love don't pay the price for it. Yet most families own policies without owning protection, a mix bought years ago, half-understood, never revisited & understood fully. This chapter puts the worry before the product - not "what should I buy," but "what am I actually protecting, and would it hold on the worst day?"`,
    understandGuides: [
      {
        title: 'What Risks Does Your Family Actually Face?',
        description: `Most insurance talk starts with a product but this starts with the truth underneath it, what would genuinely shake your family - the loss of an earner, a serious illness, an accident, a bill that arrives without warning. Name the real risks first, and the right cover becomes obvious instead of something you are sold.`
      },
      {
        title: 'Protecting Income, Not Just Life',
        description: `Life insurance doesn't really cover a life - it replaces an income. What your family loses isn't only you, it is the salary that paid the EMIs, the fees, the ordinary days. Framed that way, the question shifts from "am I insured?" to "for how many years could my family keep living as they do?"`
      },
      {
        title: 'Protecting Health Before Wealth',
        description: `One serious hospitalization can quietly undo years of patient investing in a single week. Health cover isn't a grudging expense, it's the wall that stops a medical event from becoming a financial one. Before chasing growth, it is worth making sure a single bill can't dismantle it.`
      },
      {
        title: "The Gaps Most Families Don't Know They Have",
        description: `Most families are less covered than they assume. The employer policy that vanishes with the job, no personal accident cover, nothing against a critical illness, a thin emergency fund - each feels minor until it's the one thing missing. This is about seeing the quiet holes before life finds them for you.`
      },
      {
        title: 'When Does Insurance Become Complicated?',
        description: `Insurance rarely fails at the buying, it fails in the fine print - waiting periods, exclusions, room-rent limits, the claim process nobody reads until they're standing in a hospital corridor. This is about understanding what you actually own, well before the day you need it to work.`
      },
      {
        title: "Insurance Decisions You'll Thank Yourself For Later",
        description: `Insurance isn't a one-time purchase but it's a living arrangement that should keep pace with your life. A new child, a bigger loan, a rising salary, an outdated nominee - each is a reason to revisit, not assume. The small reviews you do periodically are the ones your family quietly benefits from later.`
      },
      {
        title: 'Insurance Myths That Cost Families The Most',
        description: `Some of the most expensive insurance mistakes come dressed as common sense. "I'm young, I don't need it yet" - until the cover you could've locked in cheaply is suddenly costlier, or out of reach. "My employer policy is enough" - until you change jobs and it walks out the door with you. "One policy covers everything" - until a claim quietly reveals what it never did. This one gently dismantles the beliefs families lean on, because in insurance, the myth you trust is usually the gap you'll discover at the worst possible moment.`
      }
    ],
    moneyConversations: [
      { title: 'If your income stopped tomorrow, how long would your family\'s lifestyle survive?', slug: 'income-stoppage-survival-duration' },
      { title: 'Is your family insured—or just carrying insurance policies?', slug: 'insured-vs-carrying-policies' },
      { title: "What's more dangerous than having no insurance?", slug: 'more-dangerous-than-no-insurance' },
      { title: 'Do you know the difference between protecting your life and protecting your income?', slug: 'life-vs-income-protection' },
      { title: 'Would your employer still protect your family after you leave the company?', slug: 'employer-policy-post-employment' },
      { title: 'Why do intelligent people postpone buying insurance?', slug: 'why-people-postpone-insurance' },
      { title: 'Should your insurance grow as your salary grows?', slug: 'insurance-growth-vs-salary-growth' },
      { title: 'Why do families discover policy exclusions only during a claim?', slug: 'discovering-exclusions-during-claim' },
      { title: 'Do you need another insurance policy—or a better insurance plan?', slug: 'more-policies-vs-better-plan' },
      { title: "Insurance isn't bought for the day you die. It's bought for the days your family must continue living.", slug: 'insurance-is-for-living-days' },
      { title: 'Did you tell your insurer the whole truth when you bought the policy or leave a quiet door open for them to say no later?', slug: 'non-disclosure-insurer-loophole' },
      { title: 'If your health worsens next year, will you still be allowed to buy the cover you keep postponing today?', slug: 'postponing-insurance-health-risk' },
      { title: "You've protected the one who earns. Have you valued the one whose unpaid work holds the whole home together?", slug: 'valuing-homemaker-protection' },
      { title: 'What happens to all this protection the year you forget to pay a single premium?', slug: 'forgetting-single-insurance-premium' },
      { title: 'Is the nominee on your policy still the right person or someone from a life you\'ve already moved past?', slug: 'policy-nominee-review' }
    ],
  },
  {
    slug: 'retirement-planning',
    number: 'Pillar 06',
    title: 'Retirement Planning',
    description: 'Funding, filling, the years after work.',
    iconName: 'Compass',
    topicCategory: 'Personal',
    learnBrief: `Retirement isn't an ending you save up for it's twenty or thirty unscripted years you have to fund and, harder still, fill. For most people it's the largest financial goal of their life and the least planned, because it feels far away right up until it isn't. This chapter is about arriving there on your own terms: enough money to stop worrying about money, and enough thought given to what the days are actually for. Because the goal was never just to retire comfortably, it was to retire well.`,
    understandGuides: [
      {
        title: 'What Does Retirement Actually Mean To You?',
        description: `Retirement means something different to everyone - for some it's stopping, for others it's finally choosing what to work on. Get that picture clear first, because the number you need depends entirely on the life you are funding. Plan the life, then the money not the other way round.`
      },
      {
        title: 'Building Enough Without Guessing',
        description: `"Enough" isn't a feeling; it's a figure you can actually estimate from your expenses, the years you'll live them, and the quiet way inflation lifts them decade after decade. This is about replacing hope with a rough, honest number, so your plan rests on arithmetic rather than optimism.`
      },
      {
        title: "The Income You'll Need After The Last Salary",
        description: `A corpus isn't the goal, the monthly income it produces is. The real question is how a lifetime's savings turns back into a dependable "salary" that lasts as long as you do. This is about building the pipeline that pays you after nobody else does.`
      },
      {
        title: 'Preparing Your Portfolio For Retirement',
        description: `A portfolio built to grow and one built to sustain you are different machines. As retirement nears, the job quietly shifts from chasing returns to protecting what you've built and drawing from it steadily. This is about reshaping the mix so it can carry you, not just grow for you.`
      },
      {
        title: 'Government Retirement Tools Explained',
        description: `NPS, EPF, PPF - the steady, often underused backbone of an Indian retirement, each with its own rules, limits, and quiet advantages. This is about understanding what these tools genuinely do, so they work as a foundation rather than an afterthought you never quite figured out.`
      },
      {
        title: 'Retirement Mistakes That Are Hard To Reverse',
        description: `Most financial mistakes give you time to recover; retirement mistakes often don't, because you're spending down without a salary to repair the damage. Starting late, underestimating how long you'll live, taking too much risk or too little - this names the errors you most want to catch before the last salary, not after.`
      },
      {
        title: "Retirement Isn't Just About Money",
        description: `This is the piece almost no finance site writes. A funded retirement can still be an empty one — when the work that gave you purpose, structure, and identity suddenly stops. Money buys the freedom; it doesn't fill the day. This is about preparing for the part no corpus covers: who you are, and what you're for, once the working years are done.`
      }
    ],
    moneyConversations: [
      { title: 'At what age would you stop working if money was no longer a concern?', slug: 'retirement-age-financial-freedom' },
      { title: 'Are you saving for retirement—or simply hoping it works out?', slug: 'saving-vs-hoping-for-retirement' },
      { title: 'Will your retirement depend on your investments... or your children?', slug: 'retirement-dependency-investments-vs-children' },
      { title: 'How much of your retirement plan depends on assumptions?', slug: 'retirement-plan-assumptions' },
      { title: 'Have you planned for a longer life—or only a successful career?', slug: 'planning-longer-life-vs-career' },
      { title: 'Does retirement begin when your salary stops—or when your purpose disappears?', slug: 'retirement-start-salary-vs-purpose' },
      { title: 'Can inflation quietly become your longest-lasting expense?', slug: 'inflation-longest-lasting-expense' },
      { title: 'Are you preparing your children for independence—or preparing yourself?', slug: 'preparing-children-vs-self' },
      { title: 'If you retired five years earlier than planned, what would change?', slug: 'five-years-early-retirement' },
      { title: 'Do you know the difference between becoming wealthy and becoming financially independent?', slug: 'wealthy-vs-financially-independent' },
      { title: 'Will your retirement portfolio survive the first five years after retirement?', slug: 'portfolio-survival-first-five-years' },
      { title: "How much retirement is enough if you don't know how long you'll live?", slug: 'enough-retirement-with-unknown-lifespan' },
      { title: 'Can a successful career create a financially difficult retirement?', slug: 'career-success-vs-retirement-difficulty' },
      { title: 'Who are you after your visiting card no longer defines you?', slug: 'who-are-you-without-visiting-card' },
      { title: "You've spent forty years planning for work. Have you spent even four hours planning for life after work?", slug: 'planning-work-vs-planning-life' }
    ],
  },
  {
    slug: 'personal-finance',
    number: 'Pillar 07',
    title: 'Personal Finance',
    description: 'Everyday habits that hold everything up.',
    iconName: 'Wallet',
    topicCategory: 'Personal',
    learnBrief: `Before the investing, the insurance, the big goals there's the ground it all stands on how you earn, spend, save, and borrow, month after month. Get these basics right and everything above them holds; get them wrong and no clever investment can quite make up for it. This chapter is the foundation the quiet, unglamorous habits that decide whether money feels like a source of stress or a sense of control. Nobody teaches this at home or in school, which is exactly why it belongs at the start.`,
    understandGuides: [
      {
        title: 'Save First or Invest First?',
        description: `Everyone rushes to invest, but the order matters more than the enthusiasm an emergency fund comes before the first SIP. This is about the right sequence: a safety net first, so that investing becomes something you can sustain rather than something you are forced to interrupt.`
      },
      {
        title: 'Building an Emergency Fund',
        description: `Life throws the odd bill you didn't plan for a job gap, a repair, a medical week and without a cushion, those moments pull money out of your investments at exactly the wrong time. This is about how much to keep, where to park it, and why it quietly protects everything else you're building.`
      },
      {
        title: 'Budgeting Without Spreadsheets',
        description: `Budgeting fails when it feels like homework. This is about a simple mental framework instead a rough sense of what goes to needs, to future-you, and to living now so you stay in control of your money without tracking every rupee or opening a single spreadsheet.`
      },
      {
        title: 'Understanding Inflation',
        description: `Money sitting idle isn't safe it's quietly shrinking, losing a little purchasing power every year you are not looking. This is about seeing inflation for what it is - the slow, invisible tax that makes "playing it safe" in a savings account its own kind of risk.`
      },
      {
        title: 'Debt Management Basics',
        description: `Not all debt is bad, and not all of it is fine the difference decides whether borrowing builds your life or slowly runs it. This is about telling good debt from bad, knowing what to clear first, and understanding when an EMI is a tool rather than a trap.`
      },
      {
        title: 'Managing a Rising Income Well',
        description: `Here is the trap nobody warns you about as you earn more, you spend more, and the raise vanishes without ever becoming wealth. This is about the gap between earning and keeping: letting your savings grow faster than your lifestyle, so a bigger salary actually leaves you better off.`
      },
      {
        title: 'Financial Mistakes in Your 20s and 30s',
        description: `The costliest money mistakes are the early ones, because they rob you of the one thing you can't buy back, the TIME. Starting late, skipping insurance, spending before saving, chasing quick money this names them plainly, so you can sidestep the errors that quietly cost the most over a lifetime.`
      }
    ],
    moneyConversations: [
      { title: 'If your income stopped for three months tomorrow, would you be inconvenienced or in trouble?', slug: 'income-stop-convenience-vs-trouble' },
      { title: "Do you know where your money actually went last month, or only that it's gone?", slug: 'where-did-money-go' },
      { title: 'Are you saving what\'s left after spending or spending what\'s left after saving?', slug: 'saving-first-vs-spending-first' },
      { title: 'Is the money sitting "safely" in your savings account quietly losing value while you feel responsible?', slug: 'savings-account-idle-cash-loss' },
      { title: 'When your salary rises, does your saving rise with it or only your spending?', slug: 'salary-rise-saving-vs-spending' },
      { title: 'Is your EMI buying you something that grows, or something that shrinks the moment you own it?', slug: 'emi-asset-growth-vs-depreciation' },
      { title: 'Do you own your lifestyle or does the EMI on it own you?', slug: 'lifestyle-ownership-vs-emi-trap' },
      { title: 'If a big expense hit this week, would it come from a fund you kept ready or from your investments?', slug: 'emergency-expense-source' },
      { title: 'Are you managing your money, or just watching it pass through your account?', slug: 'managing-vs-watching-money' },
      { title: "What's the real cost of the years you wait to begin and can you ever earn them back?", slug: 'cost-of-delayed-investing' },
      { title: 'Is a bigger salary making you wealthier, or just raising the price of your life?', slug: 'bigger-salary-wealth-vs-cost' },
      { title: 'Do you have a plan for your money, or only intentions?', slug: 'money-plan-vs-intentions' },
      { title: "When did you last check whether your money habits still fit the life you're living now?", slug: 'money-habits-fit-current-life' },
      { title: 'Are you building financial freedom or just a more expensive version of the same worry?', slug: 'freedom-vs-expensive-worry' },
      { title: 'If your children copied exactly how you handle money, would you be glad — or worried?', slug: 'children-copying-money-habits' }
    ],
  },
];

export function getKnowledgePillarBySlug(slug: string): KnowledgePillar | undefined {
  return KNOWLEDGE_PILLARS.find((p) => p.slug === slug);
}
