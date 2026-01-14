import { MetadataRoute } from "next";
import { trades, getAllTradeSlugs } from "@/data/trades";
import { counties, getAllCountySlugs, townToSlug } from "@/data/locations";

const SITE_URL = "https://tradesmanfinance.co.uk";

// Priority levels for different page types
const PRIORITY = {
  home: 1.0,
  trades_hub: 0.9,
  locations_hub: 0.9,
  trade_page: 0.8,
  county_page: 0.7,
  town_page: 0.6,
  trade_location_page: 0.5,
  static_page: 0.4,
  blog: 0.6,
};

// Change frequency by page type
const CHANGE_FREQ = {
  home: "weekly" as const,
  trades_hub: "weekly" as const,
  locations_hub: "weekly" as const,
  trade_page: "monthly" as const,
  county_page: "monthly" as const,
  town_page: "monthly" as const,
  trade_location_page: "monthly" as const,
  static_page: "yearly" as const,
  blog: "monthly" as const,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  const urls: MetadataRoute.Sitemap = [];

  // 1. Static pages
  const staticPages = [
    { path: "", priority: PRIORITY.home, changeFreq: CHANGE_FREQ.home },
    { path: "/about", priority: PRIORITY.static_page, changeFreq: CHANGE_FREQ.static_page },
    { path: "/contact", priority: PRIORITY.static_page, changeFreq: CHANGE_FREQ.static_page },
    { path: "/privacy-policy", priority: PRIORITY.static_page, changeFreq: CHANGE_FREQ.static_page },
    { path: "/terms", priority: PRIORITY.static_page, changeFreq: CHANGE_FREQ.static_page },
    { path: "/accessibility", priority: PRIORITY.static_page, changeFreq: CHANGE_FREQ.static_page },
  ];

  staticPages.forEach((page) => {
    urls.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFreq,
      priority: page.priority,
    });
  });

  // 2. Trades hub page
  urls.push({
    url: `${SITE_URL}/trades`,
    lastModified: currentDate,
    changeFrequency: CHANGE_FREQ.trades_hub,
    priority: PRIORITY.trades_hub,
  });

  // 3. Individual trade pages
  const tradeSlugs = getAllTradeSlugs();
  tradeSlugs.forEach((slug) => {
    urls.push({
      url: `${SITE_URL}/trades/${slug}`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQ.trade_page,
      priority: PRIORITY.trade_page,
    });
  });

  // 4. Locations hub page
  urls.push({
    url: `${SITE_URL}/trades/locations`,
    lastModified: currentDate,
    changeFrequency: CHANGE_FREQ.locations_hub,
    priority: PRIORITY.locations_hub,
  });

  // 5. County pages
  const countySlugs = getAllCountySlugs();
  countySlugs.forEach((countySlug) => {
    urls.push({
      url: `${SITE_URL}/trades/locations/${countySlug}`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQ.county_page,
      priority: PRIORITY.county_page,
    });
  });

  // 6. Town pages and Trade-Location pages
  countySlugs.forEach((countySlug) => {
    const county = counties[countySlug];
    if (!county) return;

    county.towns.forEach((townName) => {
      const townSlug = townToSlug(townName);

      // Town index page
      urls.push({
        url: `${SITE_URL}/trades/locations/${countySlug}/${townSlug}`,
        lastModified: currentDate,
        changeFrequency: CHANGE_FREQ.town_page,
        priority: PRIORITY.town_page,
      });

      // Trade-specific pages for each town
      tradeSlugs.forEach((tradeSlug) => {
        urls.push({
          url: `${SITE_URL}/trades/locations/${countySlug}/${townSlug}/${tradeSlug}`,
          lastModified: currentDate,
          changeFrequency: CHANGE_FREQ.trade_location_page,
          priority: PRIORITY.trade_location_page,
        });
      });
    });
  });

  // 7. Blog pages
  const blogSlugs = [
    "equipment-finance-guide-for-tradesmen",
    "van-finance-options-uk-tradesmen",
    "bad-credit-trade-finance",
    "tax-benefits-equipment-leasing",
    "startup-tradesman-finance-options",
  ];

  // Blog index
  urls.push({
    url: `${SITE_URL}/blog`,
    lastModified: currentDate,
    changeFrequency: CHANGE_FREQ.blog,
    priority: PRIORITY.blog,
  });

  // Individual blog posts
  blogSlugs.forEach((slug) => {
    urls.push({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQ.blog,
      priority: PRIORITY.blog,
    });
  });

  // 8. Equipment pages (if implemented)
  const equipmentBrands = [
    "festool",
    "makita",
    "fluke",
    "megger",
    "ridgid",
    "rothenberger",
  ];

  urls.push({
    url: `${SITE_URL}/equipment`,
    lastModified: currentDate,
    changeFrequency: CHANGE_FREQ.trade_page,
    priority: 0.7,
  });

  equipmentBrands.forEach((brand) => {
    urls.push({
      url: `${SITE_URL}/equipment/${brand}`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQ.trade_page,
      priority: 0.6,
    });
  });

  return urls;
}

// Helper function to get sitemap statistics (for debugging/logging)
export function getSitemapStats() {
  const tradeSlugs = getAllTradeSlugs();
  const countySlugs = getAllCountySlugs();

  let totalTowns = 0;
  countySlugs.forEach((countySlug) => {
    const county = counties[countySlug];
    if (county) {
      totalTowns += county.towns.length;
    }
  });

  const staticPages = 6;
  const tradesHubAndIndex = 2;
  const tradePages = tradeSlugs.length;
  const countyPages = countySlugs.length;
  const townPages = totalTowns;
  const tradeLocationPages = totalTowns * tradeSlugs.length;
  const blogPages = 6; // index + 5 articles
  const equipmentPages = 7; // index + 6 brands

  const total =
    staticPages +
    tradesHubAndIndex +
    tradePages +
    countyPages +
    townPages +
    tradeLocationPages +
    blogPages +
    equipmentPages;

  return {
    staticPages,
    tradePages,
    countyPages,
    townPages,
    tradeLocationPages,
    blogPages,
    equipmentPages,
    total,
  };
}

