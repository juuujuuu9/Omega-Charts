/**
 * Single source of truth for company facts, copy, and legal text.
 * Keep verifiable claims here so they are easy to audit and update.
 */

export const company = {
  name: 'Omega Charts',
  legalName: 'Omega Charts Global, LLC',
  tagline: "Tomorrow's Technology Today",
  motto: 'Real data. Real insights. A brighter tomorrow.',
  address: {
    street: '515 East Las Olas Boulevard, Suite 1301',
    city: 'Fort Lauderdale',
    state: 'FL',
    zip: '33301',
    country: 'USA',
  },
  phone: '954.890.4615',
  phoneHref: '+19548904615',
  email: 'info@omegacharts.com',
  url: 'https://omegacharts.com',
} as const;

export const leadMagnet = {
  title: 'The 8% Framework',
  subtitle: 'A 22-page field guide to momentum-based trade selection',
  chapters: [
    'Why 74–89% of retail accounts lose money — the four mechanical causes',
    'Reading momentum divergence before price confirms it',
    'Position sizing math that survives a losing streak',
    'The pre-trade checklist we require of every Omega Charts member',
    'How to backtest an indicator without fooling yourself',
  ],
} as const;

/**
 * The 92% headline claim. The original site asserted this with no source,
 * which is the fastest way to lose a sophisticated trader's trust.
 * ESMA's review of retail CFD accounts across EU brokers remains the most
 * widely cited regulator-published figure in the 74–89% loss range, and
 * individual broker disclosures run higher. Cite, link, and let it breathe.
 */
export const lossStat = {
  range: '74–89%',
  source:
    'ESMA product intervention analysis of retail CFD accounts, corroborated by broker-published RTS 28 / disclosure data.',
  sourceUrl:
    'https://www.esma.europa.eu/press-news/esma-news/esma-agrees-prohibit-binary-options-and-restrict-cfds-protect-retail-investors',
} as const;

export const pillars = [
  {
    key: 'data',
    name: 'Data',
    line: 'Clean, normalised market data — no smoothing tricks that flatter a backtest.',
  },
  {
    key: 'discipline',
    name: 'Discipline',
    line: 'Rules you can state out loud before entry, and audit after the exit.',
  },
  {
    key: 'opportunity',
    name: 'Opportunity',
    line: 'Momentum shifts surfaced early enough to actually act on them.',
  },
  {
    key: 'tomorrow',
    name: 'A Brighter Tomorrow',
    line: 'Skills that compound, so you stop renting someone else’s conviction.',
  },
] as const;

export const platforms = [
  { name: 'TradingView', note: 'Pine Script v5' },
  { name: 'NinjaTrader 8', note: 'C# add-on' },
  { name: 'ThinkOrSwim', note: 'thinkScript' },
  { name: 'MetaTrader 5', note: 'MQL5' },
] as const;

export const nav = [
  { href: '#product', label: 'Indicators' },
  { href: '#how', label: 'How it works' },
  { href: '#platforms', label: 'Platforms' },
  { href: '#faq', label: 'FAQ' },
  { href: '#company', label: 'Company' },
] as const;

export const faqs = [
  {
    q: 'Is this a signal service or a copy-trading group?',
    a: 'No. We do not post entries for you to mirror, and we do not manage money. Omega Charts builds indicators that run inside your own charting platform, on your own account, with your own risk parameters. You make every decision.',
  },
  {
    q: 'Do you guarantee returns?',
    a: 'No, and any firm that does is either breaking the law or about to. Trading involves substantial risk of loss. Our indicators are analysis tools — they improve the quality of the information you act on. They cannot remove risk, and they will produce losing trades.',
  },
  {
    q: 'What does "AI-embedded" actually mean here?',
    a: 'Our momentum models use gradient-boosted classifiers trained on multi-timeframe volatility and volume features to weight the raw momentum reading. In plain terms: the indicator adapts its sensitivity to the current volatility regime instead of using a fixed lookback. It is not a black box that predicts price, and we publish the feature set to members.',
  },
  {
    q: 'Why is access by invitation only?',
    a: 'Two reasons, both practical. Indicator edge degrades as the number of people acting on the same reading grows, so we cap cohort size. And we onboard members personally, which does not scale past a few dozen at a time. It is a capacity limit, not a marketing gimmick.',
  },
  {
    q: 'What platforms do you support?',
    a: 'TradingView (Pine Script), NinjaTrader 8, ThinkOrSwim (thinkScript), and MetaTrader 5. If you trade somewhere else, tell us — porting is usually possible but we will be candid about the timeline.',
  },
  {
    q: 'What happens after I download the guide?',
    a: 'You get the PDF immediately, plus occasional research notes. No cold calls, no boiler room. If a cohort opens and your profile fits, you will get an invitation — and you can unsubscribe from any email in one click.',
  },
] as const;

export const riskDisclosure = `Trading futures, forex, equities, and derivatives carries a substantial risk of loss and is not suitable for every investor. You may lose more than your initial deposit. Past performance is not indicative of future results, and hypothetical or simulated results have inherent limitations — they do not reflect real execution, slippage, or the psychological pressure of live capital. Omega Charts Global, LLC is a software and education company. We are not a registered investment adviser, broker-dealer, futures commission merchant, or commodity trading advisor. Nothing on this site is personalised investment advice or a recommendation to buy or sell any instrument. All charts and indicator readings shown on this page are illustrative renderings for design purposes and do not represent real market data or actual trade results. Consult a licensed professional and only risk capital you can afford to lose.`;
