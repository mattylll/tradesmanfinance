import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { trades, getTradeBySlug, getAllTradeSlugs } from '@/data/trades';
import { counties, getAllCountySlugs } from '@/data/locations';
import {
  generateBreadcrumbSchema,
  generateLoanOfferSchema,
  generateFAQSchema,
  generateRatingSchema,
} from '@/lib/schema-generator';
import { TradePageContent } from './trade-page-content';

// Generate all trade pages at build time
export async function generateStaticParams() {
  return getAllTradeSlugs().map((trade) => ({
    trade,
  }));
}

const SITE_URL = 'https://tradesmanfinance.co.uk';

// Generate metadata dynamically
export async function generateMetadata({
  params
}: {
  params: Promise<{ trade: string }>
}): Promise<Metadata> {
  const { trade: tradeSlug } = await params;
  const trade = getTradeBySlug(tradeSlug);

  if (!trade) {
    return {
      title: 'Trade Not Found',
    };
  }

  const pageUrl = `${SITE_URL}/trades/${tradeSlug}`;
  const title = `${trade.name} Finance & Business Loans`;
  const description = `Specialist equipment finance and business loans for ${trade.name.toLowerCase()}s. ${trade.description} Quick decisions, competitive rates from £25k-£1m.`;

  return {
    title,
    description,
    keywords: trade.keywords.join(', '),
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
          alt: `${trade.name} Finance - Tradesman Finance UK`,
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

export default async function TradePage({
  params
}: {
  params: Promise<{ trade: string }>
}) {
  const { trade: tradeSlug } = await params;
  const trade = getTradeBySlug(tradeSlug);

  if (!trade) {
    notFound();
  }

  // Get a sample of counties to show location links
  const countyList = getAllCountySlugs().slice(0, 12);
  const countyData = countyList.map((slug) => counties[slug]);

  // Get related trades
  const relatedTrades = trades
    .filter((t) => t.slug !== trade.slug)
    .slice(0, 4);

  // Generate JSON-LD schemas
  const pageUrl = `${SITE_URL}/trades/${tradeSlug}`;

  const schemas = [
    // Breadcrumb navigation
    generateBreadcrumbSchema({
      items: [
        { name: 'Home', url: SITE_URL },
        { name: 'Trades', url: `${SITE_URL}/trades` },
        { name: trade.name, url: pageUrl },
      ],
    }),
    // Financial product/loan offer
    generateLoanOfferSchema({
      tradeName: trade.name,
      canonicalUrl: pageUrl,
    }),
    // Aggregate rating
    generateRatingSchema({
      tradeName: trade.name,
      canonicalUrl: pageUrl,
    }),
    // FAQs if available
    ...(trade.faqs && trade.faqs.length > 0
      ? [generateFAQSchema({ faqs: trade.faqs, canonicalUrl: pageUrl })]
      : []),
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />
      <TradePageContent
        trade={trade}
        countyData={countyData}
        relatedTrades={relatedTrades}
      />
    </>
  );
}
