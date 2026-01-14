'use client';

/**
 * Equipment Finance Section
 * Displays equipment categories and finance options for a specific trade
 * Renders the underutilized equipment data from trade-data.ts
 */

import { Wrench, Truck, TestTube, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface EquipmentCategory {
  name: string;
  items: string[];
  priceRange: string;
  description: string;
}

interface EquipmentFinanceSectionProps {
  tradeName: string;
  tradeSlug: string;
  townName?: string;
  countyName: string;
  equipmentCategories: EquipmentCategory[];
  popularBrands?: string[];
  avgEquipmentLoan?: string;
  className?: string;
}

export function EquipmentFinanceSection({
  tradeName,
  tradeSlug,
  townName,
  countyName,
  equipmentCategories,
  popularBrands,
  avgEquipmentLoan,
  className = ''
}: EquipmentFinanceSectionProps) {
  const locationName = townName || countyName;

  // Icon mapping for equipment categories
  const getCategoryIcon = (categoryName: string) => {
    const lowerName = categoryName.toLowerCase();
    if (lowerName.includes('test') || lowerName.includes('diagnostic')) {
      return <TestTube className="w-6 h-6" />;
    }
    if (lowerName.includes('vehicle') || lowerName.includes('van') || lowerName.includes('transport')) {
      return <Truck className="w-6 h-6" />;
    }
    if (lowerName.includes('power') || lowerName.includes('electric')) {
      return <Zap className="w-6 h-6" />;
    }
    return <Wrench className="w-6 h-6" />;
  };

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {tradeName} Equipment Finance in {locationName}
        </h2>

        {/* Opening Paragraph with Semantic Triple */}
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
          <span className="font-semibold">{locationName} {tradeName.toLowerCase()}s</span>
          {' '}access flexible equipment finance through{' '}
          <span className="font-semibold text-orange-600">Tradesman Finance</span>
          , from essential tools to complete workshop fit-outs. Finance from £1,000 with decisions in hours.
        </p>

        {/* Equipment Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {equipmentCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-orange-300 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                  {getCategoryIcon(category.name)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-orange-600 font-medium">{category.priceRange}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{category.description}</p>

              <ul className="space-y-2">
                {category.items.slice(0, 5).map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-700">
                    <ChevronRight className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular Brands Section */}
        {popularBrands && popularBrands.length > 0 && (
          <div className="bg-gray-900 rounded-xl p-8 mb-10">
            <h3 className="text-xl font-bold text-white mb-4">
              Popular Brands We Finance
            </h3>
            <p className="text-gray-300 mb-4">
              We finance equipment from leading brands trusted by {tradeName.toLowerCase()}s across the UK:
            </p>
            <div className="flex flex-wrap gap-3">
              {popularBrands.map((brand, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Finance Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <BenefitCard
            title="Flexible Terms"
            description={`Finance ${tradeName.toLowerCase()} equipment over 12-60 months with fixed monthly payments.`}
          />
          <BenefitCard
            title="Fast Decisions"
            description="Get a decision in under 4 hours and funds typically within 24-48 hours."
          />
          <BenefitCard
            title="All Credit Considered"
            description="We work with tradesmen across all credit profiles, including new businesses."
          />
        </div>

        {/* Average Loan Info */}
        {avgEquipmentLoan && (
          <div className="text-center">
            <p className="text-gray-600">
              Average {tradeName.toLowerCase()} equipment loan:{' '}
              <span className="font-bold text-gray-900">{avgEquipmentLoan}</span>
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Get Your Equipment Finance Quote
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Benefit Card Component
function BenefitCard({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6">
      <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default EquipmentFinanceSection;
