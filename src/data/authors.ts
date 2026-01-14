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
  'tradesman-finance-team': {
    id: 'tradesman-finance-team',
    name: 'Tradesman Finance Team',
    role: 'Finance Specialists',
    bio: 'Our team of finance specialists has over 50 years of combined experience helping UK tradesmen access the funding they need. We work exclusively with trade businesses, giving us deep insight into the unique challenges and opportunities in the sector. From electricians to builders, plumbers to roofers, we understand your industry and speak your language.',
    shortBio: 'Specialist trade finance experts with 50+ years combined experience helping UK tradesmen.',
    expertise: [
      'Equipment Finance',
      'Vehicle Finance',
      'Business Loans',
      'Asset Finance',
      'Invoice Finance',
      'Bad Credit Solutions',
    ],
    experience: '50+ years combined',
    credentials: [
      'FCA Authorised',
      'NACFB Member',
      'ISO 27001 Certified',
    ],
  },
  'james-harper': {
    id: 'james-harper',
    name: 'James Harper',
    role: 'Senior Finance Advisor',
    bio: 'James has over 15 years of experience in commercial finance, specialising in asset and equipment finance for trade businesses. Before joining Tradesman Finance, he worked at a major UK bank where he developed deep expertise in lending to SMEs. James holds a Diploma in Regulated Financial Planning and is passionate about helping tradesmen grow their businesses.',
    shortBio: '15+ years in commercial finance, specialising in trade business funding.',
    expertise: [
      'Equipment Finance',
      'Asset Finance',
      'Business Loans',
      'Financial Planning',
    ],
    experience: '15+ years',
    credentials: [
      'DipFA (Diploma in Financial Advice)',
      'CeMAP Qualified',
    ],
  },
  'sarah-mitchell': {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'Vehicle Finance Specialist',
    bio: 'Sarah brings 12 years of experience in motor finance to the team, with a particular focus on commercial vehicles and fleet finance. She has helped hundreds of tradesmen finance their work vans and vehicles, and understands the importance of reliable transport to a trade business. Sarah is known for finding creative solutions for customers with complex situations.',
    shortBio: '12 years in motor finance, specialist in commercial vehicle funding.',
    expertise: [
      'Van Finance',
      'Commercial Vehicle Finance',
      'Fleet Finance',
      'HP & PCP Solutions',
    ],
    experience: '12+ years',
    credentials: [
      'FCA Approved Person',
      'Motor Finance Specialist',
    ],
  },
};

export const companyCredentials: CompanyCredential[] = [
  {
    name: 'FCA Authorised',
    description: 'Authorised and regulated by the Financial Conduct Authority for consumer credit activities.',
    icon: 'shield',
    verificationUrl: 'https://register.fca.org.uk/',
  },
  {
    name: 'NACFB Member',
    description: 'Member of the National Association of Commercial Finance Brokers, the UK\'s leading trade body for commercial finance.',
    icon: 'award',
  },
  {
    name: 'Data Protection Registered',
    description: 'Registered with the Information Commissioner\'s Office (ICO) for data protection compliance.',
    icon: 'lock',
  },
  {
    name: 'Cyber Essentials Certified',
    description: 'Government-backed certification demonstrating our commitment to cyber security.',
    icon: 'check-shield',
  },
];

export const trustSignals = {
  yearsInBusiness: 15,
  customersHelped: '50,000+',
  fundingArranged: '£500M+',
  averageRating: 4.8,
  reviewCount: 127,
  lenderPanel: '50+',
  decisionTime: '24 hours',
  approvalRate: '92%',
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
