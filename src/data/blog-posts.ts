/**
 * Blog Post Data
 * Centralized blog post data for SEO metadata and content rendering
 */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  dateModified?: string;
  readTime: string;
  keywords: string[];
  color: string;
}

export interface BlogPostContent {
  sections: Array<{ heading: string; content: string[] }>;
  keyTakeaways: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'equipment-finance-guide-for-tradesmen',
    title: 'The Complete Guide to Equipment Finance for Tradesmen in 2024',
    excerpt: 'Everything you need to know about financing tools, machinery, and vehicles for your trade business. Learn about different finance options, eligibility, and how to get the best rates.',
    category: 'Guides',
    author: 'Tradesman Finance Team',
    date: '2024-01-15',
    dateModified: '2024-12-01',
    readTime: '8 min read',
    keywords: ['equipment finance', 'trade finance guide', 'business loans for tradesmen'],
    color: '#ff6b35',
  },
  {
    slug: 'van-finance-options-uk-tradesmen',
    title: 'Van Finance Options for UK Tradesmen: HP, PCP & Lease Explained',
    excerpt: 'Compare the different van finance options available to tradesmen in the UK. Understand the pros and cons of hire purchase, PCP, and leasing for your work vehicle.',
    category: 'Vehicle Finance',
    author: 'Tradesman Finance Team',
    date: '2024-01-10',
    dateModified: '2024-11-15',
    readTime: '6 min read',
    keywords: ['van finance', 'tradesman van', 'work vehicle finance'],
    color: '#0ea5a5',
  },
  {
    slug: 'bad-credit-trade-finance',
    title: 'Getting Trade Finance with Bad Credit: Your Options Explained',
    excerpt: 'Think bad credit means no finance options? Think again. Discover how tradesmen with poor credit history can still access equipment and vehicle finance.',
    category: 'Finance Tips',
    author: 'Tradesman Finance Team',
    date: '2024-01-05',
    dateModified: '2024-10-20',
    readTime: '5 min read',
    keywords: ['bad credit finance', 'trade finance poor credit', 'equipment loans bad credit'],
    color: '#ffd93d',
  },
  {
    slug: 'tax-benefits-equipment-leasing',
    title: 'Tax Benefits of Equipment Leasing for Self-Employed Tradesmen',
    excerpt: 'Learn how leasing equipment can provide significant tax advantages for your trade business. Understand capital allowances, VAT implications, and when leasing makes sense.',
    category: 'Tax & Accounting',
    author: 'Tradesman Finance Team',
    date: '2023-12-20',
    dateModified: '2024-09-15',
    readTime: '7 min read',
    keywords: ['equipment leasing tax', 'capital allowances', 'self employed tax benefits'],
    color: '#8b5cf6',
  },
  {
    slug: 'startup-tradesman-finance-options',
    title: 'Finance Options for New Tradesmen Just Starting Out',
    excerpt: 'Starting a new trade business? Discover the finance options available to help you get the equipment and vehicles you need, even without an established trading history.',
    category: 'Startup Finance',
    author: 'Tradesman Finance Team',
    date: '2023-12-15',
    dateModified: '2024-08-10',
    readTime: '6 min read',
    keywords: ['startup business loans', 'new tradesman finance', 'first van finance'],
    color: '#22c55e',
  },
];

export const blogContent: Record<string, BlogPostContent> = {
  'equipment-finance-guide-for-tradesmen': {
    sections: [
      {
        heading: 'What is Equipment Finance?',
        content: [
          'Equipment finance is a type of business funding that allows tradesmen to acquire the tools, machinery, and vehicles they need without paying the full cost upfront. Instead of depleting your working capital, you spread the cost over a set period through manageable monthly payments.',
          'For tradesmen, this can mean the difference between taking on larger contracts and missing out on growth opportunities. Whether you need a new van, power tools, specialist machinery, or safety equipment, equipment finance makes it accessible.',
        ],
      },
      {
        heading: 'Types of Equipment Finance Available',
        content: [
          'Hire Purchase (HP): You pay monthly installments and own the equipment outright at the end of the agreement. This is popular for vans and larger machinery.',
          'Finance Lease: You rent the equipment for a fixed period. At the end, you can return it, extend the lease, or purchase at a reduced rate.',
          'Operating Lease: Similar to a finance lease but typically shorter term. Ideal for equipment that becomes outdated quickly.',
          'Asset Refinancing: If you already own equipment, you can use it as security to release cash for other business needs.',
        ],
      },
      {
        heading: 'How to Get the Best Rates',
        content: [
          'Getting the best equipment finance rates requires preparation. Start by knowing your credit score and addressing any issues. Gather your recent business accounts or tax returns. Get quotes from multiple lenders - don\'t just accept the first offer.',
          'Consider using a specialist broker like Tradesman Finance. We have relationships with over 50 lenders and can find deals not available on the high street. Our service is free to you, as we\'re paid by the lender.',
        ],
      },
    ],
    keyTakeaways: [
      'Equipment finance preserves your working capital',
      'Multiple options available: HP, lease, and refinancing',
      'Spread costs over 12-60 months typically',
      'Tax benefits available on leased equipment',
      'Get quotes from specialist brokers for best rates',
    ],
  },
  'van-finance-options-uk-tradesmen': {
    sections: [
      {
        heading: 'Why Van Finance Makes Sense for Tradesmen',
        content: [
          'Your van is more than transport - it\'s your mobile workshop, storage facility, and professional image all in one. For most tradesmen, financing a van rather than buying outright makes solid financial sense.',
          'Van finance allows you to get a reliable, newer vehicle while keeping cash available for tools, materials, and other business needs. Plus, the monthly payments are often tax-deductible.',
        ],
      },
      {
        heading: 'Hire Purchase (HP) Explained',
        content: [
          'With HP, you pay a deposit (typically 10-20%) and then make fixed monthly payments over 2-5 years. At the end, the van is yours.',
          'Pros: You own the van outright, no mileage restrictions, can modify the vehicle as needed.',
          'Cons: Higher monthly payments than PCP, responsible for maintenance and depreciation.',
        ],
      },
      {
        heading: 'PCP (Personal Contract Purchase)',
        content: [
          'PCP offers lower monthly payments but with a balloon payment at the end if you want to keep the van.',
          'Pros: Lower monthly costs, flexibility to change vehicle regularly.',
          'Cons: Mileage restrictions, balloon payment required to own, potential end-of-contract charges.',
        ],
      },
      {
        heading: 'Leasing Options',
        content: [
          'Contract hire or leasing means you never own the van but enjoy fixed monthly costs with maintenance often included.',
          'This works well for tradesmen who want to change vehicles every 2-3 years and prefer predictable costs.',
        ],
      },
    ],
    keyTakeaways: [
      'HP is best if you want to own the van',
      'PCP offers lower monthly payments with flexibility',
      'Leasing suits regular vehicle changers',
      'Consider total cost over the agreement term',
      'Factor in tax benefits for business vehicles',
    ],
  },
  'bad-credit-trade-finance': {
    sections: [
      {
        heading: 'Bad Credit Doesn\'t Mean No Options',
        content: [
          'If you\'ve had credit issues in the past, you might think business finance is off the table. The good news is that specialist lenders understand that life happens - and they\'re willing to look at the bigger picture.',
          'At Tradesman Finance, we work with lenders who specialise in less-than-perfect credit. We focus on your current situation and ability to repay, not just your credit history.',
        ],
      },
      {
        heading: 'What Lenders Really Look At',
        content: [
          'While credit score matters, it\'s not the only factor. Lenders also consider: current income and business performance, how recent any defaults or issues are, the value of the equipment being financed (as security), and whether you have a guarantor.',
          'A strong business performance can offset historical credit issues. If you can show regular income and explain any past problems, many lenders will still approve you.',
        ],
      },
      {
        heading: 'Tips for Improving Your Approval Chances',
        content: [
          'Be honest about your credit history - surprises during the application hurt more than upfront disclosure.',
          'Offer a larger deposit if possible - this reduces lender risk.',
          'Consider a guarantor for the finance agreement.',
          'Start with smaller amounts to build a positive payment history.',
          'Work with a specialist broker who knows which lenders are most flexible.',
        ],
      },
    ],
    keyTakeaways: [
      'Specialist lenders consider more than just credit score',
      'Current income matters more than past issues',
      'Larger deposits improve approval chances',
      'Consider guarantor options',
      'Brokers can match you with flexible lenders',
    ],
  },
  'tax-benefits-equipment-leasing': {
    sections: [
      {
        heading: 'Understanding Capital Allowances',
        content: [
          'When you buy equipment outright, you can claim capital allowances to reduce your tax bill. The Annual Investment Allowance (AIA) lets you deduct 100% of qualifying equipment costs from profits, up to £1 million per year.',
          'However, many tradesmen don\'t have the capital to buy equipment outright - which is where leasing offers an alternative tax-efficient route.',
        ],
      },
      {
        heading: 'Tax Benefits of Leasing',
        content: [
          'With an operating lease, the entire monthly payment is usually tax-deductible as a business expense. This can provide significant tax savings, especially for higher-rate taxpayers.',
          'The equipment stays off your balance sheet, which can help if you need to borrow money elsewhere. You also avoid the hassle of calculating depreciation and claiming allowances.',
        ],
      },
      {
        heading: 'HP vs Lease: Tax Comparison',
        content: [
          'With Hire Purchase, you can claim capital allowances on the equipment cost, plus deduct the interest portion of payments. You\'ll own the asset at the end.',
          'With a finance lease, the tax treatment depends on how it\'s structured. An operating lease usually offers simpler tax treatment with fully deductible payments.',
          'Consult your accountant to determine which option works best for your specific situation.',
        ],
      },
    ],
    keyTakeaways: [
      'AIA allows 100% deduction on equipment purchases',
      'Lease payments are often fully tax-deductible',
      'Operating leases keep assets off your balance sheet',
      'HP allows capital allowances plus interest deduction',
      'Always consult an accountant for your situation',
    ],
  },
  'startup-tradesman-finance-options': {
    sections: [
      {
        heading: 'The Challenge for New Tradesmen',
        content: [
          'Starting a trade business is exciting, but getting finance can be challenging when you don\'t have an established trading history. Many lenders want to see 2-3 years of accounts before approving business finance.',
          'However, specialist lenders understand that everyone has to start somewhere. If you have relevant trade experience and a solid business plan, options are available.',
        ],
      },
      {
        heading: 'Finance Options for Startups',
        content: [
          'Personal guarantees: Many lenders will approve startup finance if you\'re willing to personally guarantee the loan.',
          'Asset-backed lending: If you\'re financing specific equipment, the asset itself provides security, making lenders more comfortable.',
          'Start-up loans: Government-backed startup loans of up to £25,000 are available to new businesses.',
          'Invoice finance: Once you start trading, you can unlock cash from unpaid invoices even without a long trading history.',
        ],
      },
      {
        heading: 'Building Credit for Your Business',
        content: [
          'Start small and build up. Taking out smaller finance agreements and paying them perfectly builds your business credit profile.',
          'Register for a business credit profile with agencies like Experian Business. Pay suppliers and bills on time. Keep personal and business finances separate.',
        ],
      },
    ],
    keyTakeaways: [
      'Specialist lenders work with startups',
      'Asset-backed finance is easier to obtain',
      'Government startup loans available up to £25k',
      'Personal guarantees can help approval',
      'Build credit with smaller agreements first',
    ],
  },
};

// Helper functions
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogContentBySlug(slug: string): BlogPostContent | undefined {
  return blogContent[slug];
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
