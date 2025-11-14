const fs = require('fs');
const path = require('path');

// Load counties data
const countiesData = JSON.parse(fs.readFileSync('./public/data/uk-counties-towns.json', 'utf8'));

// Helper function to create URL-safe slugs
function slugify(text) {
    return text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

// Start sitemap
const lastmod = getCurrentDate();
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Homepage - Highest Priority -->
  <url>
    <loc>https://tradesmanfinance.co.uk/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Core Pages -->
  <url>
    <loc>https://tradesmanfinance.co.uk/services.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/contact.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/about.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/privacy-policy.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/accessibility-statement.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Trades Index -->
  <url>
    <loc>https://tradesmanfinance.co.uk/trades/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Trade Finance Pages - High Priority -->
  <url>
    <loc>https://tradesmanfinance.co.uk/trades/electrician-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/plumber-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/builder-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/carpenter-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/heating-engineer-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/roofer-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/scaffolder-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/painter-decorator-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/plasterer-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/tiler-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/bathroom-fitter-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/flooring-contractor-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/locksmith-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/landscaper-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/groundworker-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/demolition-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/bricklayer-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/shop-fitter-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/window-fitter-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://tradesmanfinance.co.uk/trades/air-conditioning-finance.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Locations Hub - High Priority -->
  <url>
    <loc>https://tradesmanfinance.co.uk/trades/locations/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

`;

// Add all county pages
sitemap += `  <!-- County Pages - 45 counties -->\n`;
let countyCount = 0;
for (const [slug, county] of Object.entries(countiesData.counties)) {
    sitemap += `  <url>
    <loc>https://tradesmanfinance.co.uk/trades/locations/${slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

`;
    countyCount++;
}

// Add all town pages
sitemap += `  <!-- Town Pages - ${Object.values(countiesData.counties).reduce((sum, c) => sum + c.towns.length, 0)} towns -->\n`;
let townCount = 0;
for (const [countySlug, county] of Object.entries(countiesData.counties)) {
    for (const town of county.towns) {
        const townSlug = slugify(town);
        sitemap += `  <url>
    <loc>https://tradesmanfinance.co.uk/trades/locations/${townSlug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

`;
        townCount++;
    }
}

// Close sitemap
sitemap += `</urlset>`;

// Write sitemap
fs.writeFileSync('sitemap.xml', sitemap, 'utf8');

console.log(`\n========================================`);
console.log(`SITEMAP GENERATED SUCCESSFULLY`);
console.log(`========================================`);
console.log(`Core pages: 26`);
console.log(`County pages: ${countyCount}`);
console.log(`Town pages: ${townCount}`);
console.log(`Total URLs: ${26 + countyCount + townCount}`);
console.log(`File: sitemap.xml`);
console.log(`========================================\n`);
