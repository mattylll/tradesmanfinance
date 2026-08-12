import type { Metadata } from 'next';
import { TeamPageContent } from '@/components/team/team-page-content';
import { authors } from '@/data/authors';

const SITE_URL = 'https://tradesmanfinance.co.uk';

export const metadata: Metadata = {
  title: 'Meet Our Team | Trade Finance Experts',
  description: 'Meet the team at Tradesman Finance UK. Founded by Matt Lenzie, a broker with 25 years in financial services, we help UK tradesmen access the funding they need.',
  keywords: 'tradesman finance team, trade finance experts, business finance specialists, Matt Lenzie, equipment finance advisors',
  openGraph: {
    title: 'Meet Our Team | Tradesman Finance UK',
    description: 'Meet the team at Tradesman Finance UK, founded by a broker with 25 years in financial services, helping tradesmen grow their businesses.',
    url: `${SITE_URL}/team`,
    siteName: 'Tradesman Finance UK',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: '/images/og-team.jpg',
        width: 1200,
        height: 630,
        alt: 'Tradesman Finance UK Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Our Team | Tradesman Finance UK',
    description: 'Meet the team at Tradesman Finance UK, specialists in finance for UK trade businesses.',
    images: ['/images/og-team.jpg'],
  },
  alternates: {
    canonical: `${SITE_URL}/team`,
  },
};

// Generate structured data for the team page
function generateTeamSchema() {
  const teamMembers = Object.values(authors).filter(author => author.id !== 'tradesman-finance-team');

  // Person schemas for each team member
  const personSchemas = teamMembers.map(author => ({
    '@type': 'Person',
    '@id': `${SITE_URL}/team#${author.id}`,
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    knowsAbout: author.expertise,
    ...(author.linkedIn && { sameAs: [author.linkedIn] }),
    worksFor: {
      '@id': `${SITE_URL}/#organization`,
    },
  }));

  // Organization schema with employee references
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Tradesman Finance UK',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: 'Specialist equipment finance and business loans for UK tradesmen.',
    employee: personSchemas,
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
  };

  // WebPage schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/team#webpage`,
    url: `${SITE_URL}/team`,
    name: 'Meet Our Team | Tradesman Finance UK',
    description: 'Meet the team at Tradesman Finance UK, founded by a broker with 25 years in financial services.',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    mainEntity: personSchemas,
    inLanguage: 'en-GB',
  };

  return { organizationSchema, webPageSchema };
}

export default function TeamPage() {
  const { organizationSchema, webPageSchema } = generateTeamSchema();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <TeamPageContent />
    </>
  );
}
