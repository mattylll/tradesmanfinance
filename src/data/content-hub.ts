/**
 * Content Hub Mapping
 *
 * Maps blog posts to relevant trades for internal linking.
 * This improves SEO by creating topical clusters and
 * distributing page authority across the site.
 */

import { blogPosts } from './blog-posts';
import { trades as tradeData } from './trades';

export interface ContentHubLink {
  type: 'blog' | 'trade' | 'calculator' | 'product';
  slug: string;
  title: string;
  description?: string;
  url: string;
}

// Map blog posts to relevant trades
export const blogToTradeMap: Record<string, string[]> = {
  'equipment-finance-guide-for-tradesmen': [
    'electrician',
    'plumber',
    'builder',
    'carpenter',
    'heating-engineer',
  ],
  'van-finance-options-uk-tradesmen': [
    'electrician',
    'plumber',
    'builder',
    'heating-engineer',
    'landscaper',
  ],
  'bad-credit-trade-finance': [
    'electrician',
    'plumber',
    'builder',
    'carpenter',
    'roofer',
  ],
  'tax-benefits-equipment-leasing': [
    'electrician',
    'plumber',
    'builder',
    'carpenter',
  ],
  'startup-tradesman-finance-options': [
    'electrician',
    'plumber',
    'builder',
    'carpenter',
    'landscaper',
  ],
};

// Map trades to relevant blog posts (inverse of above)
export const tradeToBlogMap: Record<string, string[]> = {};

// Build inverse mapping
Object.entries(blogToTradeMap).forEach(([blogSlug, trades]) => {
  trades.forEach((trade) => {
    if (!tradeToBlogMap[trade]) {
      tradeToBlogMap[trade] = [];
    }
    tradeToBlogMap[trade].push(blogSlug);
  });
});

// Map trades to relevant calculators
export const tradeToCalculatorMap: Record<string, string[]> = {
  electrician: ['equipment-finance', 'business-loans', 'vehicle-finance'],
  plumber: ['equipment-finance', 'business-loans', 'vehicle-finance', 'invoice-finance'],
  builder: ['business-loans', 'equipment-finance', 'invoice-finance', 'vehicle-finance'],
  carpenter: ['equipment-finance', 'business-loans'],
  'heating-engineer': ['equipment-finance', 'vehicle-finance', 'business-loans'],
  roofer: ['equipment-finance', 'business-loans', 'vehicle-finance'],
  landscaper: ['equipment-finance', 'vehicle-finance', 'business-loans'],
};

// Calculator info for links
export const calculatorInfo: Record<string, { title: string; description: string }> = {
  'invoice-finance': {
    title: 'Invoice Finance Calculator',
    description: 'See how much you could release from unpaid invoices',
  },
  'business-loans': {
    title: 'Business Loan Calculator',
    description: 'Calculate monthly payments and total cost',
  },
  'equipment-finance': {
    title: 'Equipment Finance Calculator',
    description: 'Finance tools and machinery for your trade',
  },
  'vehicle-finance': {
    title: 'Vehicle Finance Calculator',
    description: 'Compare HP, PCP and leasing options',
  },
  affordability: {
    title: 'Affordability Calculator',
    description: 'See how much you could borrow',
  },
};

/**
 * Get related blog posts for a trade
 */
export function getRelatedBlogPostsForTrade(tradeSlug: string): ContentHubLink[] {
  const blogSlugs = tradeToBlogMap[tradeSlug] || [];
  const links: ContentHubLink[] = [];

  for (const slug of blogSlugs) {
    const post = blogPosts.find((p) => p.slug === slug);
    if (post) {
      links.push({
        type: 'blog',
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        url: `/blog/${post.slug}`,
      });
    }
    if (links.length >= 3) break;
  }

  return links;
}

/**
 * Get related trades for a blog post
 */
export function getRelatedTradesForBlogPost(blogSlug: string): ContentHubLink[] {
  const tradeSlugs = blogToTradeMap[blogSlug] || [];
  const links: ContentHubLink[] = [];

  for (const slug of tradeSlugs) {
    const trade = tradeData.find((t) => t.slug === slug);
    if (trade) {
      links.push({
        type: 'trade',
        slug: trade.slug,
        title: `${trade.name} Finance`,
        description: trade.description,
        url: `/trades/${trade.slug}`,
      });
    }
    if (links.length >= 4) break;
  }

  return links;
}

/**
 * Get relevant calculators for a trade
 */
export function getCalculatorsForTrade(tradeSlug: string): ContentHubLink[] {
  const calcSlugs = tradeToCalculatorMap[tradeSlug] || ['business-loans', 'equipment-finance'];
  const links: ContentHubLink[] = [];

  for (const slug of calcSlugs) {
    const calc = calculatorInfo[slug];
    if (calc) {
      links.push({
        type: 'calculator',
        slug,
        title: calc.title,
        description: calc.description,
        url: `/calculators/${slug}`,
      });
    }
    if (links.length >= 3) break;
  }

  return links;
}

/**
 * Get all content hub links for a trade page
 */
export function getContentHubForTrade(tradeSlug: string): {
  blogs: ContentHubLink[];
  calculators: ContentHubLink[];
} {
  return {
    blogs: getRelatedBlogPostsForTrade(tradeSlug),
    calculators: getCalculatorsForTrade(tradeSlug),
  };
}

/**
 * Get all content hub links for a blog post
 */
export function getContentHubForBlogPost(blogSlug: string): {
  trades: ContentHubLink[];
  calculators: ContentHubLink[];
} {
  const trades = getRelatedTradesForBlogPost(blogSlug);
  const tradeSlug = blogToTradeMap[blogSlug]?.[0];
  const calculators = tradeSlug
    ? getCalculatorsForTrade(tradeSlug)
    : [
        {
          type: 'calculator' as const,
          slug: 'business-loans',
          title: 'Business Loan Calculator',
          description: 'Calculate monthly payments',
          url: '/calculators/business-loans',
        },
      ];

  return { trades, calculators };
}
