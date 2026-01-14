'use client';

import Link from 'next/link';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Card, CardContent } from '@/registry/new-york-v4/ui/card';
import { ArrowRight } from 'lucide-react';
import { trades, type Trade } from '@/data/trades';
import { townToSlug } from '@/data/locations';

interface RelatedTradesLinksProps {
  currentTradeSlug: string;
  townName: string;
  townSlug: string;
  countySlug: string;
  limit?: number;
  className?: string;
}

/**
 * Displays links to other trade pages in the same location.
 * Improves internal linking for SEO by connecting sibling trade-location pages.
 */
export function RelatedTradesLinks({
  currentTradeSlug,
  townName,
  townSlug,
  countySlug,
  limit = 4,
  className = '',
}: RelatedTradesLinksProps) {
  // Get related trades (exclude current)
  const relatedTrades = trades
    .filter((trade) => trade.slug !== currentTradeSlug)
    .slice(0, limit);

  if (relatedTrades.length === 0) return null;

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2">
          Other Trades in {townName}
        </h2>
        <p className="text-muted-foreground mb-6">
          Looking for a different trade? Explore other finance options in {townName}.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {relatedTrades.map((trade) => (
            <Link
              key={trade.slug}
              href={`/trades/locations/${countySlug}/${townSlug}/${trade.slug}`}
            >
              <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1 group cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{trade.emoji || '🔧'}</span>
                    <span className="font-semibold group-hover:text-[#ff6b35] transition-colors">
                      {trade.name}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {trade.name} finance in {townName}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href={`/trades/locations/${countySlug}/${townSlug}`}
            className="text-[#ff6b35] hover:underline inline-flex items-center gap-1"
          >
            View all trades in {townName}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
