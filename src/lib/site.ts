/**
 * Company facts and page copy. Claims here are the ones we are willing to print.
 */

export const company = {
  name: 'Omega Charts',
  legalName: 'Omega Charts Global, LLC',
  tagline: "Tomorrow's Technologies Today",
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
  hours: 'Weekdays, 9am–5pm Eastern',
} as const;

export const access = {
  title: 'Request access',
  subject: 'Omega Charts — we have your request',
  confirm:
    'Thank you. We have your request and will telephone you on a weekday, between 9am and 5pm Eastern.',
} as const;

export const footerLinks = [
  { href: '#chart', label: 'Chart' },
  { href: '#screen', label: 'Screen' },
  { href: '#access', label: 'Access' },
  { href: '#company', label: 'Firm' },
  { href: '#risk', label: 'Risk' },
] as const;

export const faqs = [
  {
    q: 'What do members see?',
    a: 'A chart that marks when to buy and when to sell, and a screened list of issues currently in the green — names the work considers set to rise. You make the decision.',
  },
  {
    q: 'Is the method published?',
    a: 'No. The readings are mathematical. The method stays with the firm and is not printed on this site.',
  },
  {
    q: 'Do you tell me what to buy?',
    a: 'No. We do not send orders, we do not manage money, and we do not trade your account. The chart and the list are yours to read.',
  },
  {
    q: 'Are results guaranteed?',
    a: 'No. Any firm that promises a return is not telling the truth. You can lose money. The tools do not remove that.',
  },
  {
    q: 'How does a request proceed?',
    a: 'You leave a name and a telephone number. We call on a weekday. If the desk fits how you trade, we open it. If it does not, we say so.',
  },
] as const;

export const riskDisclosure = `Trading futures, forex, equities, and derivatives carries a substantial risk of loss and is not suitable for every investor. You may lose more than your initial deposit. Past performance is not indicative of future results, and hypothetical or simulated results have inherent limitations — they do not reflect real execution, slippage, or the psychological pressure of live capital. Omega Charts Global, LLC is a software and education company. We are not a registered investment adviser, broker-dealer, futures commission merchant, or commodity trading advisor. Nothing on this site is personalised investment advice or a recommendation to buy or sell any instrument. All charts and lists shown on this page are drawings. They are not live readings and not recommendations. Consult a licensed professional and only risk capital you can afford to lose.`;
