import type { Metadata } from 'next';
import { HomePageContent } from '@/components/home/home-page-content';

const SITE_URL = 'https://tradesmanfinance.co.uk';

// Server-rendered metadata for SEO
export const metadata: Metadata = {
  title: 'Tradesman Finance UK | Equipment Finance & Business Loans for Tradesmen',
  description: 'Specialist equipment finance and business loans for UK tradesmen. Get funding for electricians, plumbers, builders and more. Quick decisions, competitive rates from £25k-£1m.',
  keywords: 'tradesman finance, equipment finance, business loans, trade finance UK, electrician finance, plumber finance, builder loans',
  openGraph: {
    title: 'Tradesman Finance UK | Equipment Finance & Business Loans',
    description: 'Specialist equipment finance and business loans for UK tradesmen. Quick decisions, competitive rates, £25k-£1m available.',
    url: SITE_URL,
    siteName: 'Tradesman Finance UK',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tradesman Finance UK - Equipment Finance for Tradesmen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tradesman Finance UK | Equipment Finance & Business Loans',
    description: 'Specialist equipment finance and business loans for UK tradesmen. Quick decisions, competitive rates.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// Server Component - renders static HTML for crawlers, then hydrates with client component
export default function HomePage() {
  return <HomePageContent />;
}
