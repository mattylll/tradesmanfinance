'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-800',
        className
      )}
    />
  );
}

/**
 * Hero section skeleton for reducing CLS during page load
 */
export function HeroSkeleton() {
  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content skeleton */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <Skeleton className="h-4 w-48 bg-gray-800" />

            {/* Badge */}
            <Skeleton className="h-10 w-36 rounded-full bg-gray-800" />

            {/* H1 */}
            <div className="space-y-3">
              <Skeleton className="h-14 w-full max-w-md bg-gray-800" />
              <Skeleton className="h-14 w-3/4 bg-gray-800" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full max-w-lg bg-gray-800" />
              <Skeleton className="h-5 w-4/5 bg-gray-800" />
            </div>

            {/* Trust badges */}
            <div className="flex gap-4">
              <Skeleton className="h-5 w-28 bg-gray-800" />
              <Skeleton className="h-5 w-28 bg-gray-800" />
              <Skeleton className="h-5 w-32 bg-gray-800" />
            </div>

            {/* CTA buttons */}
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-14 w-44 rounded-xl bg-[#ff6b35]/30" />
              <Skeleton className="h-14 w-40 rounded-xl bg-gray-800" />
            </div>
          </div>

          {/* Image skeleton */}
          <div className="hidden lg:block">
            <Skeleton className="aspect-[4/3] rounded-2xl bg-gray-800" />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Card grid skeleton for content sections
 */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <Skeleton className="h-12 w-12 rounded-lg mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

/**
 * Trade page skeleton
 */
export function TradePageSkeleton() {
  return (
    <div className="min-h-screen">
      <HeroSkeleton />

      {/* Trust bar */}
      <div className="bg-gray-950 border-b border-white/10 py-5">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-32 bg-gray-800" />
            ))}
          </div>
        </div>
      </div>

      {/* Equipment section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <Skeleton className="h-8 w-48 rounded-full" />
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-5 w-full max-w-md" />
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            </div>
            <Skeleton className="aspect-square rounded-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Calculator skeleton
 */
export function CalculatorSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
