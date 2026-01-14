'use client';

/**
 * FAQ Section with Schema Markup
 * Renders FAQ data with accordions and generates FAQPage schema
 */

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  tradeName?: string;
  townName?: string;
  countyName?: string;
  faqs: FAQ[];
  className?: string;
}

export function FAQSection({
  tradeName,
  townName,
  countyName,
  faqs,
  className = ''
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const locationName = townName || countyName || 'your area';
  const title = tradeName
    ? `Frequently Asked Questions: ${tradeName} Finance in ${locationName}`
    : `Trade Finance FAQs for ${locationName}`;

  // Replace placeholders in FAQ content
  const processedFaqs = faqs.map(faq => ({
    question: faq.question
      .replace(/{town}/g, townName || '')
      .replace(/{county}/g, countyName || '')
      .replace(/{trade}/g, tradeName || ''),
    answer: faq.answer
      .replace(/{town}/g, townName || '')
      .replace(/{county}/g, countyName || '')
      .replace(/{trade}/g, tradeName || '')
  }));

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Common questions about {tradeName ? `${tradeName.toLowerCase()} ` : ''}business finance
            {townName ? ` in ${townName}` : ''}.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {processedFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? Our team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700"
          >
            Contact Us
            <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
          </a>
        </div>
      </div>

      {/* FAQPage Schema - rendered as JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: processedFaqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}

// FAQ Item Component with Accordion
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-900 pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
