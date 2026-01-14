import type { Metadata } from 'next';
import { blogPosts } from '@/data/blog-posts';
import { BlogPageContent } from './blog-page-content';

const SITE_URL = 'https://tradesmanfinance.co.uk';

export const metadata: Metadata = {
  title: 'Trade Finance Blog | Expert Guides for UK Tradesmen',
  description: 'Expert advice, guides, and tips to help UK tradesmen make smart finance decisions. Learn about equipment finance, van finance, bad credit options, and tax benefits.',
  keywords: 'trade finance blog, tradesman finance guides, equipment finance tips, van finance UK, business loans for tradesmen',
  openGraph: {
    title: 'Trade Finance Blog | Expert Guides for UK Tradesmen',
    description: 'Expert advice, guides, and tips to help UK tradesmen make smart finance decisions.',
    url: `${SITE_URL}/blog`,
    siteName: 'Tradesman Finance UK',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tradesman Finance Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trade Finance Blog | Expert Guides for UK Tradesmen',
    description: 'Expert advice, guides, and tips to help UK tradesmen make smart finance decisions.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

// Generate CollectionPage schema for the blog index
function generateBlogListSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Trade Finance Blog',
    description: 'Expert advice, guides, and tips to help UK tradesmen make smart finance decisions.',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Tradesman Finance UK',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  });
}

export default function BlogPage() {
  const schemaJson = generateBlogListSchema();

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <BlogPageContent posts={blogPosts} />
    </>
  );
}
