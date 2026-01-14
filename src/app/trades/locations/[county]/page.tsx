import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { counties, getAllCountySlugs, getCountyBySlug, townToSlug } from '@/data/locations';
import { trades } from '@/data/trades';
import { CountyPageContent } from './county-page-content';
import { generateBreadcrumbSchema, generateCountyPageSchema } from '@/lib/schema-generator';

// Generate all county pages at build time
export async function generateStaticParams() {
  return getAllCountySlugs().map((county) => ({
    county,
  }));
}

const SITE_URL = 'https://tradesmanfinance.co.uk';

// SEO: Primary keyword is "Trade Business Loans in {County}"
export async function generateMetadata({
  params
}: {
  params: Promise<{ county: string }>
}): Promise<Metadata> {
  const { county: countySlug } = await params;
  const county = getCountyBySlug(countySlug);

  if (!county) {
    return {
      title: 'County Not Found',
    };
  }

  const pageUrl = `${SITE_URL}/trades/locations/${countySlug}`;
  const title = `Trade Business Loans in ${county.name} | Equipment Finance`;
  const description = `Get trade business loans and equipment finance in ${county.name}. £25,000 to £1,000,000 available for tradesmen across ${county.towns.slice(0, 5).join(', ')} and more.`;

  return {
    title,
    description,
    keywords: `trade business loans ${county.name}, ${county.name} equipment finance, tradesman finance ${county.name}, business loans ${county.name}`,
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
          alt: `Trade Finance in ${county.name} - Tradesman Finance UK`,
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

export default async function CountyPage({
  params
}: {
  params: Promise<{ county: string }>
}) {
  const { county: countySlug } = await params;
  const county = getCountyBySlug(countySlug);

  if (!county) {
    notFound();
  }

  // Get nearby counties in same region
  const nearbyCounties = getAllCountySlugs()
    .filter((slug) => slug !== county.slug)
    .filter((slug) => counties[slug].region === county.region)
    .slice(0, 4)
    .map((slug) => counties[slug]);

  // Generate JSON-LD schemas
  const pageUrl = `${SITE_URL}/trades/locations/${countySlug}`;
  const countySchemas = generateCountyPageSchema({
    countyName: county.name,
    countySlug: county.slug,
    region: county.region,
    towns: county.towns,
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: SITE_URL },
      { name: 'Locations', url: `${SITE_URL}/trades/locations` },
      { name: county.name, url: pageUrl },
    ],
  });

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: countySchemas,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <CountyPageContent
        county={county}
        trades={trades.slice(0, 8)}
        nearbyCounties={nearbyCounties}
      />
    </>
  );
}

