import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  blogPosts,
  getBlogPostBySlug,
  getBlogContentBySlug,
  getAllBlogSlugs,
} from '@/data/blog-posts';
import { BlogPostPageContent } from './blog-post-content';

const SITE_URL = 'https://tradesmanfinance.co.uk';

// Generate all blog post pages at build time
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

// SEO: Dynamic metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const pageUrl = `${SITE_URL}/blog/${slug}`;

  return {
    title: `${post.title} | Tradesman Finance Blog`,
    description: post.excerpt,
    keywords: post.keywords.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: pageUrl,
      siteName: 'Tradesman Finance UK',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      authors: [post.author],
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/images/og-image.jpg'],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

// Generate comprehensive Article schema for SEO
function generateArticleSchema(slug: string) {
  const post = getBlogPostBySlug(slug);
  const content = getBlogContentBySlug(slug);

  if (!post || !content) return '';

  const pageUrl = `${SITE_URL}/blog/${slug}`;

  // Calculate word count for timeRequired
  const wordCount = content.sections.reduce((acc, section) => {
    return acc + section.content.join(' ').split(/\s+/).length;
  }, 0);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}/images/og-image.jpg`,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tradesman Finance UK',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    wordCount: wordCount,
    timeRequired: `PT${parseInt(post.readTime)}M`,
    inLanguage: 'en-GB',
  };

  return JSON.stringify(schema);
}

// Generate BreadcrumbList schema
function generateBreadcrumbSchema(slug: string) {
  const post = getBlogPostBySlug(slug);

  if (!post) return '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  };

  return JSON.stringify(schema);
}

// Generate FAQ schema from key takeaways
function generateFAQSchema(slug: string) {
  const content = getBlogContentBySlug(slug);

  if (!content) return '';

  // Convert sections to FAQ format
  const faqs = content.sections.map((section) => ({
    '@type': 'Question',
    name: section.heading,
    acceptedAnswer: {
      '@type': 'Answer',
      text: section.content.join(' '),
    },
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs,
  };

  return JSON.stringify(schema);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const content = getBlogContentBySlug(slug);

  if (!post || !content) {
    notFound();
  }

  // Related posts (exclude current)
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const articleSchema = generateArticleSchema(slug);
  const breadcrumbSchema = generateBreadcrumbSchema(slug);
  const faqSchema = generateFAQSchema(slug);

  return (
    <>
      {/* JSON-LD Schema Markup - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchema }}
      />
      {/* JSON-LD Schema Markup - Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      {/* JSON-LD Schema Markup - FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <BlogPostPageContent post={post} content={content} relatedPosts={relatedPosts} />
    </>
  );
}
