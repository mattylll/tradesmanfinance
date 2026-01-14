import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllTownParams, getLocationInfo, townToSlug } from '@/data/locations';
import { trades, getTradeBySlug, getAllTradeSlugs } from '@/data/trades';
import { generateLocationPageSchema } from '@/lib/schema-generator';
import { TradeLocationContent } from './trade-location-content';

// Generate all trade-in-town pages at build time
// This is where the bulk of pages come from: ~500 towns x 20 trades = ~10,000 pages
export async function generateStaticParams() {
  const townParams = getAllTownParams();
  const tradeSlugs = getAllTradeSlugs();

  const params: { county: string; town: string; trade: string }[] = [];

  for (const townParam of townParams) {
    for (const trade of tradeSlugs) {
      params.push({
        ...townParam,
        trade,
      });
    }
  }

  return params;
}

const SITE_URL = 'https://tradesmanfinance.co.uk';

// SEO: Primary keyword is "{Trade} Business Loans {Town}"
export async function generateMetadata({
  params
}: {
  params: Promise<{ county: string; town: string; trade: string }>
}): Promise<Metadata> {
  const { county: countySlug, town: townSlug, trade: tradeSlug } = await params;
  const location = getLocationInfo(countySlug, townSlug);
  const trade = getTradeBySlug(tradeSlug);

  if (!location || !trade) {
    return {
      title: 'Page Not Found',
    };
  }

  const pageUrl = `${SITE_URL}/trades/locations/${countySlug}/${townSlug}/${tradeSlug}`;
  const title = `${trade.name} Business Loans in ${location.townName} | ${location.county.name}`;
  const description = `Get ${trade.name.toLowerCase()} business loans and equipment finance in ${location.townName}, ${location.county.name}. Fund ${trade.equipmentExamples.slice(0, 3).join(', ')} and more. Quick decisions, competitive rates.`;

  return {
    title,
    description,
    keywords: `${trade.name} business loans ${location.townName}, ${trade.name.toLowerCase()} equipment finance ${location.county.name}, ${trade.name.toLowerCase()} finance ${location.townName}, ${trade.keywords.slice(0, 3).join(', ')}`,
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
          alt: `${trade.name} Finance in ${location.townName} - Tradesman Finance UK`,
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

export default async function TradeInTownPage({
  params
}: {
  params: Promise<{ county: string; town: string; trade: string }>
}) {
  const { county: countySlug, town: townSlug, trade: tradeSlug } = await params;
  const location = getLocationInfo(countySlug, townSlug);
  const trade = getTradeBySlug(tradeSlug);

  if (!location || !trade) {
    notFound();
  }

  const { county, townName } = location;

  // Get related trades (same category or popular)
  const relatedTrades = trades
    .filter((t) => t.slug !== trade.slug)
    .slice(0, 4);

  // Get other towns in the same county
  const otherTowns = county.towns
    .filter((t) => townToSlug(t) !== townSlug)
    .slice(0, 4);

  // Generate comprehensive schema markup for SEO
  const schemaJson = generateLocationPageSchema({
    trade,
    townName,
    townSlug,
    countyName: county.name,
    countySlug,
    region: county.region || 'England',
  });

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <TradeLocationContent
        trade={trade}
        townName={townName}
        townSlug={townSlug}
        county={county}
        relatedTrades={relatedTrades}
        otherTowns={otherTowns}
      />
    </>
  );
}
