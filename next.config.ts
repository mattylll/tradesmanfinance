import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});

// https://nextjs.org/docs/pages/api-reference/next-config-js
const nextConfig: NextConfig = {
    output: 'standalone',

    // Image optimization for Core Web Vitals
    images: {
        // Enable modern image formats for better compression
        formats: ['image/avif', 'image/webp'],

        // Device sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

        // Image sizes for layout optimization
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

        // Minimize layout shift with proper sizing
        minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache

        // Allow remote images if needed
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tradesmanfinance.co.uk',
            },
            {
                protocol: 'https',
                hostname: '*.tradesmanfinance.co.uk',
            },
        ],
    },

    // Compression for smaller bundle sizes
    compress: true,

    // Generate ETags for caching
    generateEtags: true,

    // Enable React strict mode for better development
    reactStrictMode: true,

    // Optimize package imports for smaller bundles
    experimental: {
        optimizePackageImports: [
            'lucide-react',
            'framer-motion',
            'recharts',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
        ],
    },

    // Headers for security and caching
    async headers() {
        return [
            {
                // Cache static assets aggressively
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // Cache fonts
                source: '/fonts/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // Security headers for all routes
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
};

export default withBundleAnalyzer(nextConfig);
