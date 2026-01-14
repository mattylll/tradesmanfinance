'use client';

/**
 * Testimonials Section
 * Displays customer testimonials with ratings
 * Renders the testimonial data from trade-data.ts
 */

import { Star, Quote, MapPin, Briefcase } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  business: string;
  location: string;
  loanAmount: string;
  rating: number;
  loanPurpose?: string;
}

interface TestimonialsSectionProps {
  tradeName?: string;
  countyName?: string;
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialsSection({
  tradeName,
  countyName,
  testimonials,
  className = ''
}: TestimonialsSectionProps) {
  const title = tradeName && countyName
    ? `What ${countyName} ${tradeName}s Say About Us`
    : tradeName
    ? `What ${tradeName}s Say About Us`
    : 'What Our Customers Say';

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real feedback from tradesmen who've grown their businesses with our finance solutions.
          </p>

          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= 4.8 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-bold text-gray-900">4.8</span>
            <span className="text-gray-500">from 1,250+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <TrustBadge
              text="FCA Regulated"
              subtext="Authorised & regulated"
            />
            <TrustBadge
              text="4 Hour Decisions"
              subtext="Most applications"
            />
            <TrustBadge
              text="1,250+"
              subtext="Happy customers"
            />
            <TrustBadge
              text="92%"
              subtext="Approval rate"
            />
          </div>
        </div>
      </div>

      {/* Review Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Tradesman Finance',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '1250',
              bestRating: '5',
              worstRating: '1'
            },
            review: testimonials.map(t => ({
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: t.rating.toString(),
                bestRating: '5'
              },
              author: {
                '@type': 'Person',
                name: t.name
              },
              reviewBody: t.quote
            }))
          })
        }}
      />
    </section>
  );
}

// Testimonial Card Component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      {/* Quote Icon */}
      <div className="flex items-start mb-4">
        <Quote className="w-8 h-8 text-orange-200 flex-shrink-0" />
      </div>

      {/* Quote Text */}
      <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
        "{testimonial.quote}"
      </blockquote>

      {/* Rating */}
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= testimonial.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Customer Info */}
      <div className="border-t border-gray-200 pt-4">
        <div className="font-bold text-gray-900">{testimonial.name}</div>
        <div className="text-gray-600 text-sm flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          {testimonial.business}
        </div>
        <div className="text-gray-500 text-sm flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {testimonial.location}
        </div>

        {/* Loan Info */}
        <div className="mt-3 flex items-center gap-4 text-sm">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
            {testimonial.loanAmount}
          </span>
          {testimonial.loanPurpose && (
            <span className="text-gray-500">{testimonial.loanPurpose}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Trust Badge Component
function TrustBadge({ text, subtext }: { text: string; subtext: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-900">{text}</div>
      <div className="text-sm text-gray-500">{subtext}</div>
    </div>
  );
}

export default TestimonialsSection;
