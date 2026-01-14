// SEO Schema Generators for Tradesman Finance
// Generates JSON-LD structured data for various page types

import type { Trade } from "@/data/trades";
import type { County } from "@/data/locations";

const SITE_URL = "https://tradesmanfinance.co.uk";
const COMPANY_NAME = "Tradesman Finance";
const COMPANY_LOGO = `${SITE_URL}/images/logo.png`;

// Organization schema - used site-wide
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: COMPANY_LOGO,
    description:
      "The UK's specialist finance provider for tradesmen and contractors. Equipment finance, van finance, and business loans for electricians, plumbers, builders, and more.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Finance House, Business Park",
      addressLocality: "London",
      postalCode: "EC1A 1BB",
      addressCountry: "GB",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+44-800-XXX-XXXX",
        contactType: "customer service",
        areaServed: "GB",
        availableLanguage: "English",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
    ],
    sameAs: [
      "https://www.facebook.com/tradesmanfinance",
      "https://www.linkedin.com/company/tradesman-finance",
      "https://twitter.com/tradesmanfinance",
    ],
  };
}

// Financial Service schema
export function generateFinancialServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: COMPANY_NAME,
    url: SITE_URL,
    description:
      "Specialist equipment finance and business loans for UK tradesmen and contractors.",
    priceRange: "£1,000 - £500,000",
    currenciesAccepted: "GBP",
    paymentAccepted: "Bank Transfer, Direct Debit",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Trade Finance Products",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Equipment Finance",
            description: "Finance for tools, machinery, and trade equipment",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Van Finance",
            description: "Vehicle finance for work vans and commercial vehicles",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Loans",
            description: "Working capital and growth finance for trade businesses",
          },
        },
      ],
    },
  };
}

// Trade page schema
export function generateTradePageSchema(trade: Trade, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${trade.name} Finance`,
    description: trade.longDescription,
    provider: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    serviceType: "Equipment Finance",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    url: `${SITE_URL}${url}`,
    offers: {
      "@type": "Offer",
      priceRange: `£1,000 - ${trade.statistics.avgLoanAmount}+`,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
  };
}

// FAQ schema for trade pages
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Local business schema for location pages
export function generateLocalBusinessSchema(
  trade: Trade,
  county: County,
  townName: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${trade.name} Finance - ${townName}`,
    description: `${trade.name} equipment finance and business loans in ${townName}, ${county.name}. Fast approval, competitive rates.`,
    url: `${SITE_URL}${url}`,
    areaServed: {
      "@type": "City",
      name: townName,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: county.name,
      },
    },
    priceRange: "£1,000 - £500,000",
    address: {
      "@type": "PostalAddress",
      addressLocality: townName,
      addressRegion: county.name,
      addressCountry: "GB",
    },
    parentOrganization: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
  };
}

// Breadcrumb schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

// Aggregate rating schema (for testimonials)
export function generateAggregateRatingSchema(
  itemName: string,
  ratingValue: number = 4.9,
  reviewCount: number = 1250
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      bestRating: 5,
      worstRating: 1,
      reviewCount: reviewCount,
    },
  };
}

// Website schema with search action
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/trades?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Article schema for blog posts
export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  publishedDate: string,
  modifiedDate: string,
  authorName: string = "Tradesman Finance Team"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: `${SITE_URL}${url}`,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Organization",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
      logo: {
        "@type": "ImageObject",
        url: COMPANY_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${url}`,
    },
  };
}

// How-to schema for guide pages
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: name,
    description: description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// County/Region schema
export function generateCountySchema(county: County, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Tradesman Finance in ${county.name}`,
    description: county.longDescription,
    provider: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: county.name,
      containedInPlace: {
        "@type": "Country",
        name: "United Kingdom",
      },
    },
    url: `${SITE_URL}${url}`,
  };
}

// Helper to combine multiple schemas
export function combineSchemas(...schemas: (object | null)[]): string {
  const validSchemas = schemas.filter(Boolean);
  if (validSchemas.length === 0) return "";
  if (validSchemas.length === 1) return JSON.stringify(validSchemas[0]);
  return JSON.stringify(validSchemas);
}
