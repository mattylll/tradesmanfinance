import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://tradesmanfinance.co.uk";

  return {
    rules: [
      // Allow all crawlers by default
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/*.json$",
          "/quote-submitted",
          "/thank-you",
        ],
      },
      // Explicitly allow search engine bots
      {
        userAgent: ["Googlebot", "Googlebot-Image", "Googlebot-Video", "AdsBot-Google"],
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: ["Bingbot", "Slurp", "DuckDuckBot", "Baiduspider", "YandexBot"],
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      // Explicitly allow SEO crawler tools (Ahrefs, Semrush, Moz, Majestic)
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "rogerbot"],
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      // Allow Archive.org WayBackMachine
      {
        userAgent: "ia_archiver",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
