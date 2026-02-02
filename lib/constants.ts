// Navigation Links
export const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Rules', href: '#rules' },
  { label: 'University', href: '#university' },
  { label: 'FAQ', href: '#faq' },
] as const

// Trust badges
export const trustBadges = [
  'Live order book simulation',
  'Trailing drawdown protection',
  'Consistent edge > lucky bets',
  'Payout review + fraud checks',
  'Built for event markets',
] as const

// How It Works Steps
export const steps = [
  {
    step: 1,
    title: 'Choose Your Account',
    description: 'Select an evaluation tier that matches your trading goals.',
    bullets: [
      'Pick from $10k to $150k account sizes',
      'Start with a monthly subscription',
      'Get instant access to the trading terminal',
    ],
  },
  {
    step: 2,
    title: 'Trade & Hit Targets',
    description: 'Execute trades with real market data and prove your edge.',
    bullets: [
      'Trade on high-liquidity prediction markets',
      'Reach 15% profit in Stage 1, then 10% in Stage 2',
      'Manage risk with 8% trailing drawdown protection',
    ],
  },
  {
    step: 3,
    title: 'Get Funded & Earn',
    description: 'Unlock Partner status and start earning real payouts.',
    bullets: [
      'Complete both evaluation stages',
      'Verify your identity for payouts',
      'Withdraw profits and potentially get mirrored',
    ],
  },
] as const

// Features
export const features = [
  {
    icon: 'Activity',
    title: 'Liquidity Guard Execution',
    description: 'Orders consume visible liquidity from live order books. Your estimated fill reflects real market depth—not fantasy fills.',
  },
  {
    icon: 'Filter',
    title: 'Qualified Market Filtering',
    description: 'Only high-volume markets (>$500k threshold) are tradable. This prevents gaming on illiquid, easily-manipulated contracts.',
  },
  {
    icon: 'TrendingDown',
    title: 'Trailing Drawdown Engine',
    description: '8% trailing drawdown follows your high-water mark. Locks in gains while giving room to operate. Optional 10% with Drawdown Shield.',
  },
  {
    icon: 'PieChart',
    title: '40% Consistency Rule',
    description: 'No single event can contribute more than 40% of required profits. Forces diversified edge across multiple markets.',
  },
  {
    icon: 'Terminal',
    title: 'Pro Terminal UI',
    description: 'Full order book depth, risk metrics, P&L tracking, and performance analytics. Built for serious prediction market traders.',
  },
  {
    icon: 'Wallet',
    title: 'Partner Payouts + Mirroring',
    description: 'Verified Partners withdraw profits after review. Exceptional traders may have positions mirrored on live capital.',
  },
] as const

// Pricing Tiers
export const pricingTiers = [
  {
    size: '$10k',
    price: 99,
    popular: false,
    profitTarget1: '15%',
    profitTarget2: '10%',
    drawdown: '8%',
    minContracts: 10,
    bestFor: 'New traders testing the waters',
  },
  {
    size: '$50k',
    price: 250,
    popular: true,
    profitTarget1: '15%',
    profitTarget2: '10%',
    drawdown: '8%',
    minContracts: 10,
    bestFor: 'Balanced risk/reward',
  },
  {
    size: '$75k',
    price: 375,
    popular: false,
    profitTarget1: '15%',
    profitTarget2: '10%',
    drawdown: '8%',
    minContracts: 10,
    bestFor: 'Experienced traders',
  },
  {
    size: '$100k',
    price: 500,
    popular: false,
    profitTarget1: '15%',
    profitTarget2: '10%',
    drawdown: '8%',
    minContracts: 10,
    bestFor: 'High-conviction plays',
  },
  {
    size: '$150k',
    price: 750,
    popular: false,
    profitTarget1: '15%',
    profitTarget2: '10%',
    drawdown: '8%',
    minContracts: 10,
    bestFor: 'Maximum capital allocation',
  },
] as const

// Addons
export const addons = [
  {
    id: 'drawdown-shield',
    name: 'Drawdown Shield',
    price: null, // varies
    description: 'Increase trailing drawdown from 8% to 10%',
  },
  {
    id: 'express-pass',
    name: 'Express Pass',
    price: null, // varies
    description: 'Skip Stage 1 and go directly to Stage 2 evaluation',
  },
] as const

// University Articles
export const universityArticles = [
  {
    title: 'How to Pass the Challenge',
    description: 'Strategic framework for hitting profit targets while managing drawdown effectively.',
    readTime: '8 min read',
    href: '#',
  },
  {
    title: 'Understanding Probability & Edge',
    description: 'Core concepts for identifying +EV opportunities in prediction markets.',
    readTime: '12 min read',
    href: '#',
  },
  {
    title: 'Avoiding Concentration Risk',
    description: 'Why the 40% rule exists and how to build a diversified position book.',
    readTime: '6 min read',
    href: '#',
  },
] as const

// Testimonials
export const testimonials = [
  {
    name: 'Marcus Chen',
    role: 'Partner since 2025',
    content: 'Liquidity Guard changed how I think about execution. No more wishful thinking on fills—you trade what the market can actually absorb.',
    avatar: 'MC',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Stage 2 Trader',
    content: 'The consistency rule forced me to diversify. Ended up being a better trader because of it. Hit my Stage 1 target in 3 weeks.',
    avatar: 'SM',
  },
  {
    name: 'James Park',
    role: 'Partner since 2024',
    content: 'Finally a prop firm that understands prediction markets. The trailing drawdown is fair and the terminal is genuinely useful.',
    avatar: 'JP',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Partner since 2025',
    content: 'Got my first payout within 6 weeks of starting. The rules are strict but transparent. You know exactly what you need to do.',
    avatar: 'ER',
  },
] as const

// FAQs
export const faqs = [
  {
    question: 'Is this real money trading?',
    answer: 'No. PolyProp is a simulated evaluation environment. You trade with virtual capital against real market data and order book depth. Payouts are real and based on your simulated performance.',
  },
  {
    question: 'How do payouts work?',
    answer: 'Once you achieve Partner status by passing both evaluation stages, you can request payouts on your simulated profits. Payouts require KYC verification and are subject to review. Partners keep the majority of their profits.',
  },
  {
    question: 'What is Liquidity Guard?',
    answer: 'Liquidity Guard uses live order book data to calculate realistic fill prices. When you place an order, we estimate the weighted average price based on visible liquidity at multiple price levels—just like a real execution would.',
  },
  {
    question: 'Why the 40% consistency rule?',
    answer: 'The 40% rule prevents lucky one-off wins from masking poor overall trading. No single event or market can contribute more than 40% of your required profit target. This ensures your edge is real and diversified.',
  },
  {
    question: 'What markets are available?',
    answer: 'We filter for high-liquidity prediction markets with sufficient volume (typically >$500k). This includes political events, economic indicators, sports outcomes, and other real-world event contracts on major platforms.',
  },
  {
    question: 'What happens during disputes or resolution delays?',
    answer: 'If a market resolution is disputed or delayed, positions are frozen until resolution. Your drawdown calculation pauses during this period. We follow the official resolution from the underlying market.',
  },
  {
    question: 'Do you require KYC?',
    answer: 'KYC is required at payout stage only. You can complete the evaluation anonymously. Before any withdrawal, you must verify your identity to prevent fraud and multi-accounting.',
  },
  {
    question: 'Can I have multiple accounts?',
    answer: 'No. One person, one account. We use identity verification and behavioral analysis to detect multi-accounting. Violations result in immediate termination and forfeiture of any pending payouts.',
  },
  {
    question: 'What fees are simulated?',
    answer: 'We simulate realistic trading fees on all buys and sells, matching the fee structure of major prediction market platforms. This ensures your P&L reflects what you would actually earn in live trading.',
  },
  {
    question: 'What is the trailing drawdown?',
    answer: 'Your trailing drawdown starts at 8% below your initial balance. As your account grows, the drawdown floor trails upward but never exceeds your starting balance. Once your high-water mark locks in gains, the floor rises permanently.',
  },
  {
    question: 'How long do I have to pass the evaluation?',
    answer: 'There is no time limit. Your account remains active as long as you maintain your monthly subscription. Take the time you need to trade properly—rushing leads to blown accounts.',
  },
  {
    question: 'What is the Express Pass?',
    answer: 'Express Pass allows you to skip Stage 1 and begin directly at Stage 2 evaluation. Pricing varies by account size. Only recommended for experienced traders confident in their edge.',
  },
] as const

// Footer Links
export const footerLinks = {
  product: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Rules', href: '#rules' },
    { label: 'Terminal', href: '#terminal' },
  ],
  resources: [
    { label: 'University', href: '#university' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Discord', href: '#' },
  ],
  legal: [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Risk Disclaimer', href: '#' },
  ],
} as const
