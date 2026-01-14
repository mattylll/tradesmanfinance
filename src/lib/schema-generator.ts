/**
 * Schema.org JSON-LD Generator
 * Generates structured data for SEO and rich snippets
 *
 * Schemas implemented:
 * - FinancialService + LocalBusiness
 * - LoanOrCredit offers
 * - BreadcrumbList
 * - FAQPage
 * - Service
 * - AggregateRating
 * - Organization
 */

import type { Trade } from '@/data/trades';
import type { CountySEOData } from '@/data/county-seo-data';
import type { TownSEOData } from '@/data/town-seo-data';

// Base organization info
const ORGANIZATION = {
  '@type': 'Organization',
  name: 'Tradesman Finance',
  url: 'https://tradesmanfinance.co.uk',
  logo: 'https://tradesmanfinance.co.uk/images/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+44-800-XXX-XXXX',
    contactType: 'customer service',
    areaServed: 'GB',
    availableLanguage: 'English'
  },
  sameAs: [
    'https://www.facebook.com/tradesmanfinance',
    'https://twitter.com/tradesmanfin',
    'https://www.linkedin.com/company/tradesman-finance'
  ]
};

// Site base URL
const BASE_URL = 'https://tradesmanfinance.co.uk';

/**
 * Generate FinancialService schema for location pages
 */
export function generateFinancialServiceSchema(params: {
  tradeName: string;
  tradeSlug: string;
  townName: string;
  townSlug: string;
  countyName: string;
  countySlug: string;
  canonicalUrl: string;
  entityLinks?: {
    wikipediaUrl?: string;
    wikidataId?: string;
  };
}): object {
  const { tradeName, townName, countyName, canonicalUrl, entityLinks } = params;

  return {
    '@context': 'https://schema.org',
    '@type': ['FinancialService', 'LocalBusiness'],
    '@id': `${canonicalUrl}#business`,
    name: `${tradeName} Business Loans ${townName} - Tradesman Finance`,
    description: `Specialist business finance for ${tradeName.toLowerCase()}s in ${townName}, ${countyName}. Equipment loans, van finance, and working capital with fast decisions.`,
    url: canonicalUrl,
    telephone: '+44-800-XXX-XXXX',
    email: 'info@tradesmanfinance.co.uk',
    priceRange: '£1,000 - £500,000',
    currenciesAccepted: 'GBP',
    paymentAccepted: ['Bank Transfer', 'Direct Debit'],
    areaServed: {
      '@type': 'City',
      name: townName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: countyName
      },
      ...(entityLinks?.wikipediaUrl && {
        sameAs: entityLinks.wikipediaUrl
      })
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: townName,
      addressRegion: countyName,
      addressCountry: 'GB'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      }
    ],
    parentOrganization: ORGANIZATION,
    knowsAbout: [
      `${tradeName} equipment finance`,
      `${tradeName} business loans`,
      'Trade van finance',
      'Equipment leasing',
      'Working capital loans'
    ]
  };
}

/**
 * Generate LoanOrCredit schema for loan offers
 */
export function generateLoanOfferSchema(params: {
  tradeName: string;
  canonicalUrl: string;
  avgLoanAmount?: number;
}): object {
  const { tradeName, canonicalUrl, avgLoanAmount = 25000 } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    '@id': `${canonicalUrl}#loan`,
    name: `${tradeName} Equipment Finance`,
    description: `Flexible equipment finance and business loans for ${tradeName.toLowerCase()}s. From £1,000 to £500,000 with competitive rates.`,
    provider: {
      '@type': 'Organization',
      name: 'Tradesman Finance',
      '@id': `${BASE_URL}#organization`
    },
    offers: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'LoanOrCredit',
        name: `${tradeName} Business Loan`,
        loanType: ['Asset Finance', 'Equipment Finance', 'Business Loan'],
        amount: {
          '@type': 'MonetaryAmount',
          currency: 'GBP',
          minValue: '1000',
          maxValue: '500000'
        },
        loanTerm: {
          '@type': 'QuantitativeValue',
          minValue: '12',
          maxValue: '60',
          unitCode: 'MON'
        },
        annualPercentageRate: {
          '@type': 'QuantitativeValue',
          minValue: '7.9',
          maxValue: '24.9',
          unitText: '%'
        },
        requiredCollateral: 'Equipment being financed (for asset finance)',
        gracePeriod: {
          '@type': 'QuantitativeValue',
          value: '30',
          unitCode: 'DAY'
        }
      },
      priceCurrency: 'GBP',
      eligibleRegion: {
        '@type': 'Country',
        name: 'United Kingdom'
      }
    },
    category: 'Business Finance',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Tradesmen',
      geographicArea: 'United Kingdom'
    }
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(params: {
  items: Array<{ name: string; url: string }>;
}): object {
  const { items } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate FAQPage schema from FAQ data
 */
export function generateFAQSchema(params: {
  faqs: Array<{ question: string; answer: string }>;
  canonicalUrl: string;
}): object {
  const { faqs, canonicalUrl } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate Service schema for trade services
 */
export function generateServiceSchema(params: {
  tradeName: string;
  townName: string;
  countyName: string;
  canonicalUrl: string;
  equipmentCategories?: string[];
}): object {
  const { tradeName, townName, countyName, canonicalUrl, equipmentCategories = [] } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    serviceType: `${tradeName} Finance`,
    name: `${tradeName} Business Finance in ${townName}`,
    description: `Comprehensive business finance solutions for ${tradeName.toLowerCase()}s in ${townName}, ${countyName}. Equipment loans, van finance, working capital, and more.`,
    provider: {
      '@type': 'Organization',
      name: 'Tradesman Finance',
      '@id': `${BASE_URL}#organization`
    },
    areaServed: {
      '@type': 'City',
      name: townName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: countyName
      }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${tradeName} Finance Options`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Equipment Finance'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Van & Vehicle Finance'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Working Capital Loans'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Expansion Finance'
          }
        }
      ]
    },
    ...(equipmentCategories.length > 0 && {
      itemListOrder: 'ItemListUnordered',
      itemListElement: equipmentCategories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${category} Finance`
      }))
    })
  };
}

/**
 * Generate aggregate rating schema
 */
export function generateRatingSchema(params: {
  tradeName: string;
  canonicalUrl: string;
}): object {
  const { tradeName, canonicalUrl } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonicalUrl}#rating`,
    name: `${tradeName} Business Finance`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Verified Customer'
        },
        reviewBody: `Excellent service for ${tradeName.toLowerCase()} finance. Fast decision and funds released within 48 hours.`
      }
    ]
  };
}

/**
 * Generate Organization schema for homepage
 */
export function generateOrganizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}#organization`,
    name: 'Tradesman Finance',
    alternateName: 'Tradesman Finance UK',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/logo.png`,
      width: '250',
      height: '60'
    },
    description: 'Specialist business finance for UK tradesmen. Equipment loans, van finance, and working capital with fast decisions.',
    foundingDate: '2010',
    foundingLocation: {
      '@type': 'Place',
      name: 'United Kingdom'
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+44-800-XXX-XXXX',
        contactType: 'customer service',
        areaServed: 'GB',
        availableLanguage: 'English',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00'
        }
      },
      {
        '@type': 'ContactPoint',
        telephone: '+44-800-XXX-XXXX',
        contactType: 'sales',
        areaServed: 'GB',
        availableLanguage: 'English'
      }
    ],
    sameAs: [
      'https://www.facebook.com/tradesmanfinance',
      'https://twitter.com/tradesmanfin',
      'https://www.linkedin.com/company/tradesman-finance'
    ],
    slogan: 'Finance built for trade',
    knowsAbout: [
      'Equipment finance',
      'Business loans',
      'Van finance',
      'Trade finance',
      'Asset finance',
      'Working capital'
    ]
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(params: {
  title: string;
  description: string;
  canonicalUrl: string;
  datePublished?: string;
  dateModified?: string;
}): object {
  const { title, description, canonicalUrl, datePublished, dateModified } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description: description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${BASE_URL}#website`,
      name: 'Tradesman Finance',
      url: BASE_URL
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    inLanguage: 'en-GB',
    potentialAction: {
      '@type': 'ReadAction',
      target: canonicalUrl
    }
  };
}

/**
 * Generate complete schema for a trade-location page
 */
export function generateLocationPageSchema(params: {
  trade: Trade;
  townName: string;
  townSlug: string;
  countyName: string;
  countySlug: string;
  region: string;
  entityLinks?: CountySEOData['entityLinks'];
}): string {
  const { trade, townName, townSlug, countyName, countySlug, region, entityLinks } = params;

  const canonicalUrl = `${BASE_URL}/trades/locations/${countySlug}/${townSlug}/${trade.slug}`;

  const schemas = [
    generateFinancialServiceSchema({
      tradeName: trade.name,
      tradeSlug: trade.slug,
      townName,
      townSlug,
      countyName,
      countySlug,
      canonicalUrl,
      entityLinks
    }),
    generateLoanOfferSchema({
      tradeName: trade.name,
      canonicalUrl,
      avgLoanAmount: trade.statistics?.avgLoanAmount
    }),
    generateBreadcrumbSchema({
      items: [
        { name: 'Home', url: BASE_URL },
        { name: 'Trades', url: `${BASE_URL}/trades` },
        { name: 'Locations', url: `${BASE_URL}/trades/locations` },
        { name: countyName, url: `${BASE_URL}/trades/locations/${countySlug}` },
        { name: townName, url: `${BASE_URL}/trades/locations/${countySlug}/${townSlug}` },
        { name: `${trade.name} Finance`, url: canonicalUrl }
      ]
    }),
    generateFAQSchema({
      faqs: trade.faqs || [],
      canonicalUrl
    }),
    generateServiceSchema({
      tradeName: trade.name,
      townName,
      countyName,
      canonicalUrl,
      equipmentCategories: trade.equipmentCategories?.map(cat => cat.name) || []
    })
  ];

  return JSON.stringify(schemas);
}

/**
 * Generate schema for county page
 */
export function generateCountyPageSchema(params: {
  countyName: string;
  countySlug: string;
  region: string;
  entityLinks?: CountySEOData['entityLinks'];
  towns: string[];
}): string {
  const { countyName, countySlug, region, entityLinks, towns } = params;

  const canonicalUrl = `${BASE_URL}/trades/locations/${countySlug}`;

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      '@id': `${canonicalUrl}#business`,
      name: `Trade Finance ${countyName} - Tradesman Finance`,
      description: `Specialist business finance for tradesmen across ${countyName}. Equipment loans, van finance, and working capital.`,
      url: canonicalUrl,
      areaServed: {
        '@type': 'AdministrativeArea',
        name: countyName,
        containedInPlace: {
          '@type': 'Country',
          name: 'United Kingdom'
        },
        ...(entityLinks?.wikipediaUrl && {
          sameAs: entityLinks.wikipediaUrl
        }),
        ...(entityLinks?.wikidataId && {
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'Wikidata',
            value: entityLinks.wikidataId
          }
        })
      },
      parentOrganization: ORGANIZATION
    },
    generateBreadcrumbSchema({
      items: [
        { name: 'Home', url: BASE_URL },
        { name: 'Trades', url: `${BASE_URL}/trades` },
        { name: 'Locations', url: `${BASE_URL}/trades/locations` },
        { name: countyName, url: canonicalUrl }
      ]
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Towns in ${countyName}`,
      numberOfItems: towns.length,
      itemListElement: towns.slice(0, 20).map((town, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: town,
        url: `${canonicalUrl}/${town.toLowerCase().replace(/\s+/g, '-')}`
      }))
    }
  ];

  return JSON.stringify(schemas);
}

// Export helper to render schemas in pages
export function renderSchemas(schemas: object | object[] | string): string {
  if (typeof schemas === 'string') {
    return schemas;
  }
  return JSON.stringify(Array.isArray(schemas) ? schemas : [schemas]);
}
