import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllTownParams, getLocationInfo, townToSlug } from '@/data/locations';
import { trades } from '@/data/trades';
import { TownPageContent } from './town-page-content';
import { generateBreadcrumbSchema } from '@/lib/schema-generator';
import { getTownLocalData } from '@/data/town-local-data';
import { generateFAQSchemaData } from '@/components/seo/faq-schema';

const SITE_URL = 'https://tradesmanfinance.co.uk';

// Generate all town pages at build time
export async function generateStaticParams() {
  return getAllTownParams();
}

// SEO: Primary keyword is "Business Loans for Tradesmen in {Town}"
export async function generateMetadata({
  params
}: {
  params: Promise<{ county: string; town: string }>
}): Promise<Metadata> {
  const { county: countySlug, town: townSlug } = await params;
  const location = getLocationInfo(countySlug, townSlug);

  if (!location) {
    return {
      title: 'Location Not Found',
    };
  }

  const pageUrl = `${SITE_URL}/trades/locations/${countySlug}/${townSlug}`;
  const title = `Business Loans for Tradesmen in ${location.townName} | ${location.county.name}`;
  const description = `Get business loans and equipment finance for tradesmen in ${location.townName}, ${location.county.name}. £25,000 to £1,000,000 available for electricians, plumbers, builders and more.`;

  return {
    title,
    description,
    keywords: `business loans ${location.townName}, trade finance ${location.townName}, equipment loan ${location.townName}, ${location.county.name} tradesman finance`,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Tradesman Finance UK',
      type: 'website',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Trade Finance in ${location.townName} - Tradesman Finance UK`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.jpg'],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function TownPage({
  params
}: {
  params: Promise<{ county: string; town: string }>
}) {
  const { county: countySlug, town: townSlug } = await params;
  const location = getLocationInfo(countySlug, townSlug);

  if (!location) {
    notFound();
  }

  const { county, townName } = location;

  // Get other towns in the same county
  const otherTowns = county.towns
    .filter((t) => townToSlug(t) !== townSlug)
    .slice(0, 6);

  // Generate JSON-LD schemas
  const pageUrl = `${SITE_URL}/trades/locations/${countySlug}/${townSlug}`;
  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: SITE_URL },
      { name: 'Locations', url: `${SITE_URL}/trades/locations` },
      { name: county.name, url: `${SITE_URL}/trades/locations/${countySlug}` },
      { name: townName, url: pageUrl },
    ],
  });

  // LocalBusiness schema for town
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${pageUrl}#business`,
    name: `Tradesman Finance - ${townName}`,
    description: `Specialist equipment finance and business loans for tradesmen in ${townName}, ${county.name}.`,
    url: pageUrl,
    areaServed: {
      '@type': 'City',
      name: townName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: county.name,
      },
    },
    priceRange: '££',
    currenciesAccepted: 'GBP',
  };

  // Get town local data for FAQs
  const townLocalData = getTownLocalData(townSlug, townName, countySlug, county.name, county.region);

  // Generate FAQ schema if FAQs are available
  const faqSchema = townLocalData.faqs && townLocalData.faqs.length > 0
    ? generateFAQSchemaData(townLocalData.faqs, `${pageUrl}#faq`)
    : null;

  // Combine all schemas
  const allSchemas = faqSchema
    ? [breadcrumbSchema, localBusinessSchema, faqSchema]
    : [breadcrumbSchema, localBusinessSchema];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allSchemas),
        }}
      />
      <TownPageContent
        townName={townName}
        townSlug={townSlug}
        county={county}
        trades={trades}
        otherTowns={otherTowns}
      />
    </>
  );
}

