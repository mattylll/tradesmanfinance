/**
 * Review Schema Generator for SEO
 *
 * This module prepares AggregateRating schema for rich results.
 * Currently uses placeholder data - ready for Trustpilot API integration.
 *
 * TODO: When Trustpilot account is set up:
 * 1. Install @trustpilot/api or use their REST API
 * 2. Replace getReviewData() with API call
 * 3. Cache results for performance (recommend 1-hour TTL)
 */

const SITE_URL = 'https://tradesmanfinance.co.uk';

export interface ReviewData {
  rating: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
  source: 'trustpilot' | 'google' | 'placeholder';
  lastUpdated: string;
}

export interface IndividualReview {
  author: string;
  datePublished: string;
  reviewBody: string;
  reviewRating: number;
  trade?: string;
  location?: string;
}

/**
 * Placeholder review data
 * Replace with API call when Trustpilot is set up
 */
export function getReviewData(): ReviewData {
  // TODO: Replace with Trustpilot API call
  // const response = await fetch('https://api.trustpilot.com/v1/business-units/{business-unit-id}');
  // const data = await response.json();
  // return {
  //   rating: data.score.trustScore,
  //   reviewCount: data.numberOfReviews.total,
  //   bestRating: 5,
  //   worstRating: 1,
  //   source: 'trustpilot',
  //   lastUpdated: new Date().toISOString(),
  // };

  return {
    rating: 4.8,
    reviewCount: 127,
    bestRating: 5,
    worstRating: 1,
    source: 'placeholder',
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Sample reviews for display
 * Replace with API call when reviews are available
 */
export function getSampleReviews(): IndividualReview[] {
  // TODO: Replace with Trustpilot API call for recent reviews
  return [
    {
      author: 'James Wilson',
      datePublished: '2024-11-15',
      reviewBody:
        'Excellent service for my electrical business. Got approved for van finance within 24 hours and the rates were very competitive. The team really understands tradesman needs.',
      reviewRating: 5,
      trade: 'Electrician',
      location: 'Manchester',
    },
    {
      author: 'Sarah Mitchell',
      datePublished: '2024-10-28',
      reviewBody:
        'As a plumber starting out, I was worried about getting finance. Tradesman Finance found me a great deal even with limited trading history. Highly recommend!',
      reviewRating: 5,
      trade: 'Plumber',
      location: 'Birmingham',
    },
    {
      author: 'David Thompson',
      datePublished: '2024-10-12',
      reviewBody:
        'Used them for equipment finance for my building business. Process was straightforward and the monthly payments fit my cashflow perfectly.',
      reviewRating: 4,
      trade: 'Builder',
      location: 'Leeds',
    },
  ];
}

/**
 * Generate AggregateRating schema for rich results
 * Can be used on homepage, about page, or any page where ratings should appear
 */
export function generateAggregateRatingSchema(options?: {
  includeReviews?: boolean;
  maxReviews?: number;
}): string {
  const reviewData = getReviewData();
  const reviews = options?.includeReviews ? getSampleReviews().slice(0, options.maxReviews || 3) : [];

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${SITE_URL}/#organization`,
    name: 'Tradesman Finance UK',
    description:
      'Specialist equipment finance and business loans for UK tradesmen including electricians, plumbers, builders and more.',
    url: SITE_URL,
    telephone: '+44-800-123-4567',
    priceRange: '£1,000 - £500,000',
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewData.rating.toString(),
      reviewCount: reviewData.reviewCount.toString(),
      bestRating: reviewData.bestRating.toString(),
      worstRating: reviewData.worstRating.toString(),
    },
  };

  // Add individual reviews if requested
  if (reviews.length > 0) {
    schema.review = reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.reviewRating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    }));
  }

  return JSON.stringify(schema);
}

/**
 * Generate review schema for a specific trade page
 * Filters reviews by trade if available
 */
export function generateTradeReviewSchema(tradeName: string): string | null {
  const reviewData = getReviewData();
  const reviews = getSampleReviews().filter(
    (r) => r.trade?.toLowerCase() === tradeName.toLowerCase()
  );

  // Only generate if we have trade-specific reviews
  if (reviews.length === 0) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${tradeName} Finance`,
    description: `Business loans and equipment finance for ${tradeName.toLowerCase()}s in the UK`,
    brand: {
      '@type': 'Organization',
      name: 'Tradesman Finance UK',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewData.rating.toString(),
      reviewCount: reviews.length.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.reviewRating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    })),
  };

  return JSON.stringify(schema);
}

/**
 * Generate LocalBusiness review schema for location pages
 */
export function generateLocationReviewSchema(
  townName: string,
  countyName: string,
  tradeName?: string
): string {
  const reviewData = getReviewData();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: tradeName
      ? `${tradeName} Finance in ${townName} - Tradesman Finance UK`
      : `Tradesman Finance UK - ${townName}`,
    description: tradeName
      ? `${tradeName} business loans and equipment finance in ${townName}, ${countyName}`
      : `Business loans and equipment finance for tradesmen in ${townName}, ${countyName}`,
    areaServed: {
      '@type': 'City',
      name: townName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: countyName,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewData.rating.toString(),
      reviewCount: reviewData.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
  };

  return JSON.stringify(schema);
}

/**
 * Helper to check if review data is from a real source
 * Useful for displaying appropriate messaging
 */
export function isRealReviewData(): boolean {
  const data = getReviewData();
  return data.source !== 'placeholder';
}

/**
 * Get Trustpilot widget embed code
 * Returns null until Trustpilot is set up
 */
export function getTrustpilotWidget(): string | null {
  // TODO: Replace with actual Trustpilot widget code when account is set up
  // return '<div class="trustpilot-widget" data-locale="en-GB" data-template-id="..." data-businessunit-id="..." data-style-height="150px" data-style-width="100%"></div>';
  return null;
}
