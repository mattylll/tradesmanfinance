'use client';

import Link from 'next/link';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Card, CardContent } from '@/registry/new-york-v4/ui/card';
import { ArrowRight, Wrench } from 'lucide-react';
import { equipmentBrands } from '@/data/equipment';

// Map trades to relevant equipment brands
const tradeEquipmentMap: Record<string, string[]> = {
  'electrician': ['fluke', 'megger', 'makita'],
  'plumber': ['ridgid', 'rothenberger', 'makita'],
  'builder': ['makita', 'festool'],
  'carpenter': ['festool', 'makita'],
  'heating-engineer': ['fluke', 'rothenberger', 'ridgid'],
  'roofer': ['makita'],
  'tiler': ['makita'],
  'plasterer': ['makita', 'festool'],
  'painter-decorator': ['festool'],
  'landscaper': ['makita'],
  'bathroom-fitter': ['ridgid', 'makita'],
  'kitchen-fitter': ['festool', 'makita'],
  'shop-fitter': ['festool', 'makita'],
};

interface EquipmentLinksProps {
  tradeSlug: string;
  tradeName: string;
  limit?: number;
  className?: string;
}

/**
 * Displays links to relevant equipment finance pages based on trade.
 * Improves internal linking for SEO by connecting trade pages to equipment pages.
 */
export function EquipmentLinks({
  tradeSlug,
  tradeName,
  limit = 3,
  className = '',
}: EquipmentLinksProps) {
  // Get relevant equipment for this trade
  const relevantSlugs = tradeEquipmentMap[tradeSlug] || ['makita', 'festool'];
  const relevantEquipment = equipmentBrands
    .filter((brand) => relevantSlugs.includes(brand.slug))
    .slice(0, limit);

  if (relevantEquipment.length === 0) return null;

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2">
          Equipment Finance for {tradeName}s
        </h2>
        <p className="text-muted-foreground mb-6">
          Finance professional equipment from leading brands trusted by {tradeName.toLowerCase()}s.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {relevantEquipment.map((brand) => (
            <Link
              key={brand.slug}
              href={`/equipment/${brand.slug}`}
            >
              <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1 group cursor-pointer border-[#0ea5a5]/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-5 w-5 text-[#0ea5a5]" />
                    <span className="font-semibold group-hover:text-[#0ea5a5] transition-colors">
                      {brand.name} Finance
                    </span>
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    {brand.category}
                  </Badge>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {brand.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/equipment"
            className="text-[#0ea5a5] hover:underline inline-flex items-center gap-1"
          >
            View all equipment brands
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
