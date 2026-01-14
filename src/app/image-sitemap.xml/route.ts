/**
 * Image Sitemap Route Handler
 *
 * Generates an XML sitemap specifically for images to help
 * search engines discover and index site imagery.
 *
 * Access at: /image-sitemap.xml
 */

import { NextResponse } from 'next/server';
import { trades } from '@/data/trades';
import { counties } from '@/data/locations';

const SITE_URL = 'https://tradesmanfinance.co.uk';

interface ImageEntry {
  pageUrl: string;
  images: Array<{
    url: string;
    title?: string;
    caption?: string;
    geoLocation?: string;
  }>;
}

// Trade hero images that exist
const AVAILABLE_TRADE_IMAGES = [
  'electrician',
  'plumber',
  'builder',
  'carpenter',
  'roofer',
  'hvac',
];

// County hero images that exist
const AVAILABLE_COUNTY_IMAGES = Object.values(counties).map((c) => c.slug);

function generateImageEntries(): ImageEntry[] {
  const entries: ImageEntry[] = [];

  // Homepage images
  entries.push({
    pageUrl: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        title: 'Tradesman Finance UK - Equipment Finance & Business Loans',
        caption: 'Specialist finance for UK tradesmen including electricians, plumbers, and builders',
      },
    ],
  });

  // Trade page images
  for (const trade of trades) {
    const tradeSlug = trade.slug;
    const imageSlug = AVAILABLE_TRADE_IMAGES.includes(tradeSlug) ? tradeSlug : 'builder';

    entries.push({
      pageUrl: `${SITE_URL}/trades/${tradeSlug}`,
      images: [
        {
          url: `${SITE_URL}/images/${imageSlug}-hero.png`,
          title: `${trade.name} Finance UK - Equipment & Business Loans`,
          caption: `Professional ${trade.name.toLowerCase()} finance solutions for tools, equipment, and vehicles`,
        },
      ],
    });
  }

  // County page images
  for (const county of Object.values(counties)) {
    const imageExists = AVAILABLE_COUNTY_IMAGES.includes(county.slug);
    if (imageExists) {
      entries.push({
        pageUrl: `${SITE_URL}/trades/locations/${county.slug}`,
        images: [
          {
            url: `${SITE_URL}/images/${county.slug}-hero.png`,
            title: `Trade Finance in ${county.name} - Tradesman Finance UK`,
            caption: `Equipment finance and business loans for tradesmen in ${county.name}`,
            geoLocation: `${county.name}, United Kingdom`,
          },
        ],
      });
    }
  }

  // Equipment brand images (if they exist)
  const equipmentBrands = ['makita', 'festool', 'fluke', 'megger', 'ridgid', 'rothenberger'];
  for (const brand of equipmentBrands) {
    entries.push({
      pageUrl: `${SITE_URL}/equipment/${brand}-finance`,
      images: [
        {
          url: `${SITE_URL}/images/equipment/${brand}-logo.png`,
          title: `${brand.charAt(0).toUpperCase() + brand.slice(1)} Equipment Finance`,
          caption: `Finance options for ${brand.charAt(0).toUpperCase() + brand.slice(1)} tools and equipment`,
        },
      ],
    });
  }

  // Calculator page images
  entries.push({
    pageUrl: `${SITE_URL}/calculators`,
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        title: 'Business Finance Calculators - Tradesman Finance UK',
        caption: 'Free calculators for invoice finance, business loans, equipment finance and more',
      },
    ],
  });

  return entries;
}

function generateXml(entries: ImageEntry[]): string {
  const imageUrls = entries
    .map((entry) => {
      const images = entry.images
        .map(
          (img) => `
      <image:image>
        <image:loc>${escapeXml(img.url)}</image:loc>
        ${img.title ? `<image:title>${escapeXml(img.title)}</image:title>` : ''}
        ${img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
        ${img.geoLocation ? `<image:geo_location>${escapeXml(img.geoLocation)}</image:geo_location>` : ''}
      </image:image>`
        )
        .join('');

      return `
    <url>
      <loc>${escapeXml(entry.pageUrl)}</loc>${images}
    </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageUrls}
</urlset>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const entries = generateImageEntries();
  const xml = generateXml(entries);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
