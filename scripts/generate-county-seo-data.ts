/**
 * Generate Complete County SEO Data
 *
 * This script generates comprehensive SEO data for all 51 UK counties
 * based on the locations.ts data structure
 */

import { counties } from '../src/data/locations';
import * as fs from 'fs';
import * as path from 'path';

interface CountySEOEntry {
  name: string;
  slug: string;
  region: string;
  economy: {
    gdpContribution: string;
    constructionSectorValue: string;
    constructionEmployment: number;
    activeTradeBusinesses: number;
    avgProjectValue: string;
    yoyGrowth: string;
    keyIndustries: string[];
  };
  tradeMarket: {
    topTrades: Array<{
      trade: string;
      demand: 'High' | 'Medium' | 'Low';
      avgDayRate: string;
      activeContractors: number;
    }>;
    majorProjects: string[];
    seasonalTrends: string;
  };
  localEcosystem: {
    majorSuppliers: string[];
    tradeBodies: string[];
    trainingProviders: string[];
  };
  seoContent: {
    openingParagraph: string;
    marketOverview: string;
    whyChooseUs: string;
    closingCTA: string;
  };
  faqs: Array<{ question: string; answer: string }>;
  coordinates?: { lat: number; lng: number };
}

// Regional price multipliers
const regionalMultipliers: Record<string, number> = {
  'London': 1.4,
  'South East': 1.2,
  'South West': 1.0,
  'East of England': 1.05,
  'East Midlands': 0.9,
  'West Midlands': 0.95,
  'Yorkshire': 0.9,
  'North West': 0.95,
  'North East': 0.85,
  'Scotland': 0.95,
  'Wales': 0.85,
  'Northern Ireland': 0.8,
};

// Trade day rates by region
function getDayRates(region: string, trade: string): string {
  const multiplier = regionalMultipliers[region] || 1.0;
  const baseRates: Record<string, [number, number]> = {
    'electrician': [250, 320],
    'plumber': [240, 300],
    'builder': [230, 290],
    'carpenter': [220, 280],
    'heating-engineer': [250, 310],
    'roofer': [240, 300],
    'scaffolder': [260, 330],
    'landscaper': [200, 260],
  };
  const [min, max] = baseRates[trade] || [220, 280];
  return `£${Math.round(min * multiplier)}-£${Math.round(max * multiplier)}`;
}

// Major suppliers by region
const regionalSuppliers: Record<string, string[]> = {
  'Scotland': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'Keyline', 'MKM Building Supplies'],
  'North East': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'MKM Building Supplies', 'Buildbase'],
  'North West': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'Selco', 'MKM Building Supplies'],
  'Yorkshire': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'MKM Building Supplies', 'Buildbase'],
  'East Midlands': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'Buildbase', 'Selco'],
  'West Midlands': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'Selco', 'MKM Building Supplies'],
  'East of England': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'Ridgeons', 'Buildbase'],
  'London': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'Selco', 'City Plumbing'],
  'South East': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'Selco', 'Parker Building Supplies'],
  'South West': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'MKM Building Supplies', 'Harcross'],
  'Wales': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'MKM Building Supplies', 'Buildbase'],
  'Northern Ireland': ['Travis Perkins', 'Jewson', 'Screwfix', 'Toolstation', 'JP Corry', 'Haldane Fisher'],
};

// Trade bodies by region
const regionalTradeBodies: Record<string, string[]> = {
  'Scotland': ['SELECT', 'SNIPEF', 'FMB Scotland', 'CITB', 'Federation of Master Builders'],
  'Wales': ['FMB Cymru', 'NICEIC', 'Gas Safe', 'CITB', 'Welsh Government Trade Skills'],
  'Northern Ireland': ['CEF NI', 'CITB NI', 'Master Builders Association', 'NICEIC', 'Gas Safe'],
  'default': ['Federation of Master Builders', 'NICEIC', 'Gas Safe', 'CITB', 'Electrical Contractors Association'],
};

// Training providers patterns
function getTrainingProviders(countyName: string, region: string): string[] {
  const regionColleges: Record<string, string> = {
    'Scotland': 'Scotland College',
    'North East': 'College',
    'North West': 'College',
    'Wales': 'Welsh College',
    'default': 'College',
  };
  return [
    `${countyName} Technical College`,
    'CITB Training Centre',
    `Local Apprenticeship Provider`,
  ];
}

// Seasonal trends by region
function getSeasonalTrends(region: string): string {
  const trends: Record<string, string> = {
    'Scotland': 'Peak demand April-September, weather-dependent scheduling with premium winter rates',
    'North East': 'Strong year-round demand, peak activity spring-autumn with winter commercial work',
    'North West': 'Steady demand throughout year, peaks in spring-summer for outdoor work',
    'Yorkshire': 'Balanced seasonal demand, heritage renovation peaks spring-autumn',
    'East Midlands': 'Distribution sector drives steady year-round demand',
    'West Midlands': 'Manufacturing and logistics ensure consistent year-round work',
    'East of England': 'Strong residential demand, peaks spring-summer with agricultural work',
    'London': 'Premium rates year-round, minimal seasonal variation',
    'South East': 'Steady premium demand throughout year, garden/landscaping peaks spring-autumn',
    'South West': 'Tourism-linked peaks spring-summer, steady residential demand year-round',
    'Wales': 'Peak activity spring-autumn, tourism and residential renovation focus',
    'Northern Ireland': 'Strong construction sector with year-round commercial activity',
  };
  return trends[region] || 'Peak demand spring-autumn with steady year-round commercial work';
}

// Generate major projects based on county characteristics
function generateMajorProjects(county: typeof counties[string]): string[] {
  const projects: string[] = [];

  if (county.economicData?.keyIndustries) {
    const industries = county.economicData.keyIndustries;

    if (industries.includes('Manufacturing')) {
      projects.push('Industrial facility upgrades and expansions');
    }
    if (industries.includes('Technology') || industries.includes('Tech')) {
      projects.push('Tech park developments and office fit-outs');
    }
    if (industries.includes('Tourism')) {
      projects.push('Hospitality and tourism infrastructure improvements');
    }
    if (industries.includes('Logistics') || industries.includes('Distribution')) {
      projects.push('Warehouse and distribution centre construction');
    }
    if (industries.includes('Renewable Energy') || industries.includes('Energy')) {
      projects.push('Renewable energy installations and infrastructure');
    }
  }

  // Add generic projects
  projects.push(`Residential development across ${county.name}`);
  projects.push('Commercial property refurbishments');

  if (projects.length < 3) {
    projects.push('Public sector building upgrades');
  }

  return projects.slice(0, 4);
}

// Generate FAQs for a county
function generateFAQs(county: typeof counties[string]): Array<{ question: string; answer: string }> {
  return [
    {
      question: `Do you work with tradesmen across ${county.name}?`,
      answer: `Yes, we work with tradesmen throughout ${county.name}, including ${county.towns.slice(0, 3).join(', ')} and all surrounding areas. Our local knowledge helps us understand the specific needs of ${county.region} tradespeople.`
    },
    {
      question: `How quickly can ${county.name} tradesmen get finance approved?`,
      answer: `Most ${county.name} tradesmen receive a decision within 4 hours, with funds typically available within 24-48 hours of approval. We understand that time is money in the trades.`
    },
    {
      question: `What finance is available for ${county.name} trade businesses?`,
      answer: `We offer equipment finance, van and vehicle finance, business loans, and working capital solutions. Whether you're an electrician, plumber, builder, or any other trade, we have options designed for your industry.`
    },
    {
      question: `Can I get finance with bad credit in ${county.name}?`,
      answer: `Yes, we consider applications from all credit backgrounds. We look at the whole picture - your trading history, current work, and ability to repay - not just your credit score.`
    },
  ];
}

// Main generation function
function generateCountySEOData(): Record<string, CountySEOEntry> {
  const seoData: Record<string, CountySEOEntry> = {};

  for (const [slug, county] of Object.entries(counties)) {
    const region = county.region;
    const multiplier = regionalMultipliers[region] || 1.0;
    const tradesmen = county.tradeStatistics?.registeredTradesmen || Math.round((county.population || 100000) * 0.03);

    // Calculate economic values
    const constructionEmployment = Math.round(tradesmen * 0.8);
    const avgProjectValue = `£${Math.round((15000 + (county.population || 100000) / 10000 * 1000) * multiplier).toLocaleString()}`;
    const constructionSectorValue = county.economicData?.constructionSpend ||
      `£${Math.round(tradesmen * 0.05 * multiplier)} million`;

    // Build trade market data
    const topTrades = [
      { trade: 'electrician', demand: 'High' as const, avgDayRate: getDayRates(region, 'electrician'), activeContractors: Math.round(tradesmen * 0.18) },
      { trade: 'plumber', demand: 'High' as const, avgDayRate: getDayRates(region, 'plumber'), activeContractors: Math.round(tradesmen * 0.14) },
      { trade: 'builder', demand: 'High' as const, avgDayRate: getDayRates(region, 'builder'), activeContractors: Math.round(tradesmen * 0.16) },
      { trade: 'heating-engineer', demand: 'Medium' as const, avgDayRate: getDayRates(region, 'heating-engineer'), activeContractors: Math.round(tradesmen * 0.07) },
    ];

    const entry: CountySEOEntry = {
      name: county.name,
      slug: slug,
      region: region,
      economy: {
        gdpContribution: county.economicData?.gdpContribution || `£${Math.round((county.population || 100000) / 1000 * 0.5)} billion`,
        constructionSectorValue: constructionSectorValue,
        constructionEmployment: constructionEmployment,
        activeTradeBusinesses: tradesmen,
        avgProjectValue: avgProjectValue,
        yoyGrowth: county.tradeStatistics?.yearOverYearGrowth || '+3.5%',
        keyIndustries: county.economicData?.keyIndustries || ['Construction', 'Manufacturing', 'Services'],
      },
      tradeMarket: {
        topTrades: topTrades,
        majorProjects: generateMajorProjects(county),
        seasonalTrends: getSeasonalTrends(region),
      },
      localEcosystem: {
        majorSuppliers: regionalSuppliers[region] || regionalSuppliers['default'] || [],
        tradeBodies: regionalTradeBodies[region] || regionalTradeBodies['default'],
        trainingProviders: getTrainingProviders(county.name, region),
      },
      seoContent: {
        openingParagraph: `${county.name} tradesmen access specialist business finance through Tradesman Finance, the UK's dedicated trade lender, with decisions in under 24 hours and local market understanding.`,
        marketOverview: `The ${county.name} construction sector employs over ${constructionEmployment.toLocaleString()} skilled professionals, with ${county.economicData?.keyIndustries?.[0] || 'construction'} and ${county.economicData?.keyIndustries?.[1] || 'services'} driving demand for quality tradespeople.`,
        whyChooseUs: `${county.name} tradesmen choose Tradesman Finance for our understanding of local market conditions, fast decisions, and flexible terms designed for project-based work.`,
        closingCTA: `Get a free, no-obligation quote for ${county.name} trade finance in under 4 hours.`,
      },
      faqs: generateFAQs(county),
    };

    seoData[slug] = entry;
  }

  return seoData;
}

// Generate the TypeScript file content
function generateTypeScriptFile(data: Record<string, CountySEOEntry>): string {
  const entries = Object.entries(data)
    .map(([slug, entry]) => {
      return `  '${slug}': ${JSON.stringify(entry, null, 4).replace(/\n/g, '\n  ')}`;
    })
    .join(',\n');

  return `/**
 * County SEO Data
 * Comprehensive SEO data for UK counties including economic data,
 * trade market info, semantic content, and entity links
 *
 * AUTO-GENERATED - Do not edit manually
 * Generated: ${new Date().toISOString()}
 */

export interface CountySEOData {
  name: string;
  slug: string;
  region: string;
  economy: {
    gdpContribution: string;
    constructionSectorValue: string;
    constructionEmployment: number;
    activeTradeBusinesses: number;
    avgProjectValue: string;
    yoyGrowth: string;
    keyIndustries: string[];
  };
  tradeMarket: {
    topTrades: Array<{
      trade: string;
      demand: 'High' | 'Medium' | 'Low';
      avgDayRate: string;
      activeContractors: number;
    }>;
    majorProjects: string[];
    seasonalTrends: string;
  };
  localEcosystem: {
    majorSuppliers: string[];
    tradeBodies: string[];
    trainingProviders: string[];
  };
  seoContent: {
    openingParagraph: string;
    marketOverview: string;
    whyChooseUs: string;
    closingCTA: string;
  };
  entityLinks?: {
    wikipediaUrl: string;
    wikidataId: string;
    wikidataUrl: string;
    osmRelationId?: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const countySEOData: Record<string, CountySEOData> = {
${entries}
};

export function getCountySEOData(slug: string): CountySEOData | undefined {
  return countySEOData[slug];
}

export function getAllCountySlugs(): string[] {
  return Object.keys(countySEOData);
}

export function getCountiesByRegion(region: string): CountySEOData[] {
  return Object.values(countySEOData).filter(county => county.region === region);
}

export function getCountyFAQs(slug: string): Array<{ question: string; answer: string }> {
  return countySEOData[slug]?.faqs || [];
}

export function getCountyEntityLinks(slug: string): CountySEOData['entityLinks'] | undefined {
  return countySEOData[slug]?.entityLinks;
}
`;
}

// Run the generator
const seoData = generateCountySEOData();
const fileContent = generateTypeScriptFile(seoData);

const outputPath = path.join(__dirname, '../src/data/county-seo-data.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');

console.log(`Generated SEO data for ${Object.keys(seoData).length} counties`);
console.log(`Output written to: ${outputPath}`);
