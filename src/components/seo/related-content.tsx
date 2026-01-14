'use client';

import Link from 'next/link';
import { type ContentHubLink } from '@/data/content-hub';
import { Card, CardContent } from '@/registry/new-york-v4/ui/card';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { ArrowRight, BookOpen, Calculator, Wrench } from 'lucide-react';

interface RelatedContentProps {
  links: ContentHubLink[];
  title: string;
  variant?: 'cards' | 'list' | 'compact';
  className?: string;
}

const typeIcons = {
  blog: BookOpen,
  calculator: Calculator,
  trade: Wrench,
  product: Wrench,
};

const typeColors = {
  blog: '#ff6b35',
  calculator: '#0ea5a5',
  trade: '#ffd93d',
  product: '#8b5cf6',
};

export function RelatedContent({
  links,
  title,
  variant = 'cards',
  className = '',
}: RelatedContentProps) {
  if (links.length === 0) return null;

  if (variant === 'compact') {
    return (
      <div className={className}>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link key={link.url} href={link.url}>
              <Badge
                className="hover:opacity-80 transition-opacity cursor-pointer"
                style={{
                  backgroundColor: `${typeColors[link.type]}20`,
                  color: typeColors[link.type],
                  borderColor: `${typeColors[link.type]}30`,
                }}
              >
                {link.title}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={className}>
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <ul className="space-y-3">
          {links.map((link) => {
            const Icon = typeIcons[link.type];
            return (
              <li key={link.url}>
                <Link
                  href={link.url}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <Icon
                    className="h-4 w-4 flex-shrink-0"
                    style={{ color: typeColors[link.type] }}
                  />
                  <span className="group-hover:underline">{link.title}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // Cards variant (default)
  return (
    <div className={className}>
      <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-industrial)' }}>
        {title}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => {
          const Icon = typeIcons[link.type];
          return (
            <Link key={link.url} href={link.url}>
              <Card className="h-full bg-gray-900/80 border-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 group cursor-pointer overflow-hidden">
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: typeColors[link.type] }}
                />
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${typeColors[link.type]}15` }}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{ color: typeColors[link.type] }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white group-hover:text-[#ff6b35] transition-colors line-clamp-2 text-sm">
                        {link.title}
                      </h4>
                      {link.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {link.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-[#ff6b35] flex-shrink-0 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Related Guides section for trade pages
 */
export function RelatedGuides({ tradeSlug }: { tradeSlug: string }) {
  // Import dynamically to avoid circular dependencies
  const { getRelatedBlogPostsForTrade } = require('@/data/content-hub');
  const links = getRelatedBlogPostsForTrade(tradeSlug);

  if (links.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <RelatedContent links={links} title="Related Guides" variant="cards" />
      </div>
    </section>
  );
}

/**
 * Related Calculators section
 */
export function RelatedCalculators({ tradeSlug }: { tradeSlug: string }) {
  const { getCalculatorsForTrade } = require('@/data/content-hub');
  const links = getCalculatorsForTrade(tradeSlug);

  if (links.length === 0) return null;

  return (
    <RelatedContent
      links={links}
      title="Try Our Calculators"
      variant="cards"
    />
  );
}

/**
 * Related Trades section for blog posts
 */
export function RelatedTrades({ blogSlug }: { blogSlug: string }) {
  const { getRelatedTradesForBlogPost } = require('@/data/content-hub');
  const links = getRelatedTradesForBlogPost(blogSlug);

  if (links.length === 0) return null;

  return (
    <RelatedContent
      links={links}
      title="Related Trade Finance"
      variant="list"
    />
  );
}
