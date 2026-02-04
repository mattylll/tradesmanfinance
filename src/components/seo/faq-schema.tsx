/**
 * FAQ Schema Component
 * Generates FAQPage structured data markup for SEO
 *
 * Usage:
 * <FAQSchema faqs={[{ question: '...', answer: '...' }]} />
 *
 * This component only renders the JSON-LD script tag, no visible UI.
 * For a visible FAQ section with schema, use the FAQSection component.
 *
 * @see https://schema.org/FAQPage
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchemaProps {
  /**
   * Array of FAQ items with question and answer
   */
  faqs: FAQItem[];
  /**
   * Optional: Include the @id for the FAQPage (useful for referencing in other schemas)
   */
  id?: string;
}

/**
 * Generates FAQPage JSON-LD structured data
 * Renders only the script tag - no visible content
 */
export function FAQSchema({ faqs, id }: FAQSchemaProps) {
  // Don't render if no FAQs provided
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Filter out any invalid FAQ items
  const validFaqs = faqs.filter(
    (faq) => faq.question?.trim() && faq.answer?.trim()
  );

  if (validFaqs.length === 0) {
    return null;
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(id && { '@id': id }),
    mainEntity: validFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.trim(),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}

/**
 * Helper function to generate FAQ schema data object
 * Useful when you need to combine with other schema types
 */
export function generateFAQSchemaData(faqs: FAQItem[], id?: string) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const validFaqs = faqs.filter(
    (faq) => faq.question?.trim() && faq.answer?.trim()
  );

  if (validFaqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(id && { '@id': id }),
    mainEntity: validFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.trim(),
      },
    })),
  };
}

/**
 * Process FAQ content by replacing placeholders with actual values
 * Useful for trade/location-specific FAQs that use template variables
 */
export function processFAQContent(
  faqs: FAQItem[],
  replacements: Record<string, string>
): FAQItem[] {
  return faqs.map((faq) => {
    let question = faq.question;
    let answer = faq.answer;

    // Replace all placeholders
    Object.entries(replacements).forEach(([key, value]) => {
      const placeholder = new RegExp(`{${key}}`, 'g');
      question = question.replace(placeholder, value);
      answer = answer.replace(placeholder, value);
    });

    return { question, answer };
  });
}

export default FAQSchema;
