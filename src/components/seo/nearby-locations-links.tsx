'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/registry/new-york-v4/ui/card';
import { MapPin, ArrowRight } from 'lucide-react';
import { counties, getAllCountySlugs, type County } from '@/data/locations';

interface NearbyLocationsLinksProps {
  currentCountySlug: string;
  currentRegion: string;
  limit?: number;
  className?: string;
}

/**
 * Displays links to nearby counties in the same region.
 * Improves internal linking for SEO by connecting geographically related pages.
 */
export function NearbyLocationsLinks({
  currentCountySlug,
  currentRegion,
  limit = 4,
  className = '',
}: NearbyLocationsLinksProps) {
  // Get nearby counties (same region, exclude current)
  const nearbyCounties = getAllCountySlugs()
    .filter((slug) => slug !== currentCountySlug)
    .filter((slug) => counties[slug]?.region === currentRegion)
    .slice(0, limit)
    .map((slug) => counties[slug]);

  if (nearbyCounties.length === 0) return null;

  return (
    <section className={`py-12 bg-muted ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2">
          Trade Finance in Nearby Areas
        </h2>
        <p className="text-muted-foreground mb-6">
          Explore trade finance options in other {currentRegion} locations.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {nearbyCounties.map((county) => (
            <Link
              key={county.slug}
              href={`/trades/locations/${county.slug}`}
            >
              <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1 group cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-[#0ea5a5]" />
                    <span className="font-semibold group-hover:text-[#0ea5a5] transition-colors">
                      {county.name}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {county.towns.length} towns
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/trades/locations"
            className="text-[#0ea5a5] hover:underline inline-flex items-center gap-1"
          >
            View all UK locations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
