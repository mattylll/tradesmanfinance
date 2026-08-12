/**
 * Author and Team Data for E-E-A-T Signals
 *
 * E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness
 * This data helps establish credibility with search engines and users.
 */

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  expertise: string[];
  experience: string;
  credentials: string[];
  imageUrl?: string;
  linkedIn?: string;
  email?: string;
}

export interface CompanyCredential {
  name: string;
  description: string;
  icon: string;
  verificationUrl?: string;
}

export const authors: Record<string, Author> = {
  'matt-lenzie': {
    id: 'matt-lenzie',
    name: 'Matt Lenzie',
    role: 'Founder & CEO',
    bio: 'Matt brings 25 years of financial services experience to Tradesman Finance, having built his career across some of the UK\'s leading financial institutions. Starting at Citicapital, he progressed through Blackhorse Motor Finance before joining Bank of Scotland (HBOS/Lloyds Banking Group) as Associate Director in their Corporate division. Since leaving banking, Matt has founded multiple successful finance businesses including Construction Capital, Aptus Financial (specializing in property finance since 2019), and Financial Flow. His deep understanding of both traditional banking and innovative finance structures, combined with expertise in development finance, bridging, venture capital, and private equity, enables him to help tradesmen access the funding they need to grow their businesses. Matt\'s experience spans motor finance, asset finance, corporate lending, property development finance, and business growth strategies.',
    shortBio: 'Founder with 25 years in financial services. Former Bank of Scotland Associate Director with expertise across motor finance, corporate lending, property finance, and business growth.',
    expertise: [
      'Motor Finance',
      'Asset Finance',
      'Corporate Finance',
      'Property Finance',
      'Development Finance',
      'Business Loans',
      'Venture Capital',
      'Private Equity',
      'Commercial Lending',
    ],
    experience: '25 years',
    credentials: [
      'Former Bank of Scotland Associate Director',
      'Lloyds Banking Group (HBOS) Corporate Division',
      'Blackhorse Motor Finance',
      'Citicapital',
      'Property Finance Specialist (7+ years)',
      'Venture Capital Partner',
    ],
    linkedIn: 'https://www.linkedin.com/in/mattlenzie/',
  },
  'tradesman-finance-team': {
    id: 'tradesman-finance-team',
    name: 'Tradesman Finance Team',
    role: 'Finance Specialists',
    bio: 'We work exclusively with trade businesses, which gives us deep insight into the unique challenges and opportunities in the sector. From electricians to builders, plumbers to roofers, we understand your industry and speak your language, and we know which lenders are comfortable with the way trade businesses actually earn.',
    shortBio: 'Specialist trade finance experts helping UK tradesmen find the right funding.',
    expertise: [
      'Equipment Finance',
      'Vehicle Finance',
      'Business Loans',
      'Asset Finance',
      'Invoice Finance',
      'Bad Credit Solutions',
    ],
    experience: 'Trade finance specialists',
    credentials: [
      'Founded by a broker with 25 years in financial services',
      'Specialists in trade and construction finance',
      'UK-wide coverage',
    ],
  },
};

export const companyCredentials: CompanyCredential[] = [
  {
    name: 'Trade Finance Specialists',
    description: 'We work exclusively with UK trade and construction businesses, so we know which lenders understand how you earn.',
    icon: 'award',
  },
  {
    name: 'Secure & Encrypted',
    description: 'Your application data is transmitted over an encrypted connection and only shared with lenders you ask us to approach.',
    icon: 'lock',
  },
  {
    name: 'No Obligation Quotes',
    description: 'Every quote is free and comes with no obligation to proceed. You decide whether an offer is right for you.',
    icon: 'check-shield',
  },
];

export const trustSignals = {
  decisionTime: '24 hours',
};

// Helper functions
export function getAuthorById(id: string): Author | undefined {
  return authors[id];
}

export function getDefaultAuthor(): Author {
  return authors['tradesman-finance-team'];
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}

// Generate Person schema for author
export function generateAuthorSchema(author: Author): object {
  return {
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.shortBio,
    knowsAbout: author.expertise,
    worksFor: {
      '@type': 'Organization',
      name: 'Tradesman Finance UK',
      url: 'https://tradesmanfinance.co.uk',
    },
  };
}
