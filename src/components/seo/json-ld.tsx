// JSON-LD Structured Data Component
// Renders JSON-LD script tags for SEO structured data

interface JsonLdProps {
  data: object | object[];
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLdString = JSON.stringify(data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}

// Pre-built JSON-LD components for common use cases

interface OrganizationJsonLdProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
  };
}

export function OrganizationJsonLd({
  name,
  url,
  logo,
  description,
  contactPoint,
}: OrganizationJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description }),
    ...(contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contactPoint.telephone,
        contactType: contactPoint.contactType,
      },
    }),
  };

  return <JsonLd data={data} />;
}

interface FAQJsonLdProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  if (!questions || questions.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

interface LocalBusinessJsonLdProps {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  priceRange?: string;
  areaServed?: string;
}

export function LocalBusinessJsonLd({
  name,
  description,
  url,
  telephone,
  address,
  priceRange,
  areaServed,
}: LocalBusinessJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    ...(telephone && { telephone }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        ...address,
      },
    }),
    ...(priceRange && { priceRange }),
    ...(areaServed && {
      areaServed: {
        "@type": "City",
        name: areaServed,
      },
    }),
  };

  return <JsonLd data={data} />;
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  serviceType?: string;
  areaServed?: string;
  url?: string;
}

export function ServiceJsonLd({
  name,
  description,
  provider,
  serviceType,
  areaServed,
  url,
}: ServiceJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider.name,
      url: provider.url,
    },
    ...(serviceType && { serviceType }),
    ...(areaServed && {
      areaServed: {
        "@type": "Country",
        name: areaServed,
      },
    }),
    ...(url && { url }),
  };

  return <JsonLd data={data} />;
}

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  publisherName: string;
  publisherLogo?: string;
}

export function ArticleJsonLd({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  publisherName,
  publisherLogo,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    datePublished,
    ...(dateModified && { dateModified }),
    author: {
      "@type": authorName ? "Person" : "Organization",
      name: authorName || publisherName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      ...(publisherLogo && {
        logo: {
          "@type": "ImageObject",
          url: publisherLogo,
        },
      }),
    },
  };

  return <JsonLd data={data} />;
}

interface AggregateRatingJsonLdProps {
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export function AggregateRatingJsonLd({
  itemName,
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
}: AggregateRatingJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      bestRating,
      worstRating,
      reviewCount,
    },
  };

  return <JsonLd data={data} />;
}

export default JsonLd;
