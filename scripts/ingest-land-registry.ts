/**
 * Land Registry Data Ingestion Script
 * Pulls property price data from UK House Price Index
 *
 * Data Sources:
 * - UK House Price Index (public dataset): https://landregistry.data.gov.uk/
 * - Price Paid Data: https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads
 *
 * Data Retrieved:
 * - Average property values by area
 * - Transaction volumes (indicator of renovation demand)
 * - Property type breakdown
 * - Price trends
 */

import * as fs from 'fs';
import * as path from 'path';

// Land Registry SPARQL endpoint
const LAND_REGISTRY_SPARQL_URL = 'https://landregistry.data.gov.uk/landregistry/query';

// UK House Price Index API
const HPI_API_URL = 'https://landregistry.data.gov.uk/data/ukhpi';

interface PropertyData {
  averagePrice: number;
  transactionVolume: number;
  detachedAvg: number;
  semiDetachedAvg: number;
  terracedAvg: number;
  flatAvg: number;
  yearOverYearChange: string;
  region: string;
}

interface AreaPropertyStats {
  avgPropertyValue: string;
  medianPropertyValue: string;
  transactionsLast12Months: number;
  propertyTypeBreakdown: {
    detached: { avg: string; percentage: number };
    semiDetached: { avg: string; percentage: number };
    terraced: { avg: string; percentage: number };
    flat: { avg: string; percentage: number };
  };
  priceChange12Months: string;
  renovationOpportunities: string;
}

// Regional average property prices (2024 estimates based on Land Registry data)
const REGIONAL_PROPERTY_PRICES: Record<string, PropertyData> = {
  'Greater London': {
    averagePrice: 523000,
    transactionVolume: 78000,
    detachedAvg: 1050000,
    semiDetachedAvg: 650000,
    terracedAvg: 550000,
    flatAvg: 420000,
    yearOverYearChange: '+2.1%',
    region: 'Greater London'
  },
  'South East England': {
    averagePrice: 375000,
    transactionVolume: 95000,
    detachedAvg: 580000,
    semiDetachedAvg: 380000,
    terracedAvg: 310000,
    flatAvg: 240000,
    yearOverYearChange: '+1.8%',
    region: 'South East England'
  },
  'East of England': {
    averagePrice: 310000,
    transactionVolume: 58000,
    detachedAvg: 485000,
    semiDetachedAvg: 320000,
    terracedAvg: 260000,
    flatAvg: 195000,
    yearOverYearChange: '+1.5%',
    region: 'East of England'
  },
  'South West England': {
    averagePrice: 295000,
    transactionVolume: 52000,
    detachedAvg: 450000,
    semiDetachedAvg: 295000,
    terracedAvg: 245000,
    flatAvg: 195000,
    yearOverYearChange: '+2.3%',
    region: 'South West England'
  },
  'West Midlands': {
    averagePrice: 235000,
    transactionVolume: 48000,
    detachedAvg: 385000,
    semiDetachedAvg: 240000,
    terracedAvg: 175000,
    flatAvg: 145000,
    yearOverYearChange: '+1.2%',
    region: 'West Midlands'
  },
  'East Midlands': {
    averagePrice: 225000,
    transactionVolume: 42000,
    detachedAvg: 350000,
    semiDetachedAvg: 220000,
    terracedAvg: 165000,
    flatAvg: 130000,
    yearOverYearChange: '+1.4%',
    region: 'East Midlands'
  },
  'Yorkshire': {
    averagePrice: 195000,
    transactionVolume: 55000,
    detachedAvg: 320000,
    semiDetachedAvg: 195000,
    terracedAvg: 145000,
    flatAvg: 115000,
    yearOverYearChange: '+1.6%',
    region: 'Yorkshire'
  },
  'North West England': {
    averagePrice: 190000,
    transactionVolume: 62000,
    detachedAvg: 340000,
    semiDetachedAvg: 195000,
    terracedAvg: 135000,
    flatAvg: 125000,
    yearOverYearChange: '+1.9%',
    region: 'North West England'
  },
  'North East England': {
    averagePrice: 155000,
    transactionVolume: 22000,
    detachedAvg: 285000,
    semiDetachedAvg: 160000,
    terracedAvg: 110000,
    flatAvg: 95000,
    yearOverYearChange: '+0.8%',
    region: 'North East England'
  },
  'Scotland': {
    averagePrice: 185000,
    transactionVolume: 85000,
    detachedAvg: 310000,
    semiDetachedAvg: 195000,
    terracedAvg: 155000,
    flatAvg: 125000,
    yearOverYearChange: '+1.1%',
    region: 'Scotland'
  },
  'Wales': {
    averagePrice: 195000,
    transactionVolume: 28000,
    detachedAvg: 295000,
    semiDetachedAvg: 185000,
    terracedAvg: 145000,
    flatAvg: 115000,
    yearOverYearChange: '+1.7%',
    region: 'Wales'
  },
  'Northern Ireland': {
    averagePrice: 175000,
    transactionVolume: 25000,
    detachedAvg: 275000,
    semiDetachedAvg: 175000,
    terracedAvg: 125000,
    flatAvg: 105000,
    yearOverYearChange: '+2.5%',
    region: 'Northern Ireland'
  }
};

// County to region mapping
const COUNTY_REGION_MAP: Record<string, string> = {
  'aberdeenshire': 'Scotland',
  'angus': 'Scotland',
  'argyll': 'Scotland',
  'ayrshire': 'Scotland',
  'edinburgh': 'Scotland',
  'glasgow': 'Scotland',
  'greater-london': 'Greater London',
  'berkshire': 'South East England',
  'buckinghamshire': 'South East England',
  'hampshire': 'South East England',
  'kent': 'South East England',
  'oxfordshire': 'South East England',
  'surrey': 'South East England',
  'west-sussex': 'South East England',
  'east-sussex': 'South East England',
  'hertfordshire': 'South East England',
  'essex': 'East of England',
  'suffolk': 'East of England',
  'norfolk': 'East of England',
  'cambridgeshire': 'East of England',
  'bedfordshire': 'East of England',
  'greater-manchester': 'North West England',
  'lancashire': 'North West England',
  'merseyside': 'North West England',
  'cheshire': 'North West England',
  'cumbria': 'North West England',
  'cornwall': 'South West England',
  'devon': 'South West England',
  'dorset': 'South West England',
  'somerset': 'South West England',
  'gloucestershire': 'South West England',
  'wiltshire': 'South West England',
  'bristol': 'South West England',
  'west-midlands': 'West Midlands',
  'staffordshire': 'West Midlands',
  'warwickshire': 'West Midlands',
  'worcestershire': 'West Midlands',
  'leicestershire': 'East Midlands',
  'nottinghamshire': 'East Midlands',
  'derbyshire': 'East Midlands',
  'northamptonshire': 'East Midlands',
  'lincolnshire': 'East Midlands',
  'west-yorkshire': 'Yorkshire',
  'south-yorkshire': 'Yorkshire',
  'north-yorkshire': 'Yorkshire',
  'tyne-and-wear': 'North East England',
  'northumberland': 'North East England',
  'county-durham': 'North East England',
  'newcastle': 'North East England',
  'cardiff': 'Wales',
  'belfast': 'Northern Ireland',
};

// County-specific price multipliers (based on local market conditions)
const COUNTY_PRICE_MULTIPLIERS: Record<string, number> = {
  'surrey': 1.35,
  'greater-london': 1.0,
  'buckinghamshire': 1.20,
  'berkshire': 1.15,
  'oxfordshire': 1.18,
  'hertfordshire': 1.12,
  'cambridgeshire': 1.08,
  'hampshire': 1.05,
  'kent': 0.95,
  'essex': 0.92,
  'west-sussex': 1.02,
  'east-sussex': 0.95,
  'dorset': 1.05,
  'devon': 0.98,
  'cornwall': 1.02,
  'somerset': 0.90,
  'gloucestershire': 0.95,
  'wiltshire': 0.92,
  'bristol': 1.05,
  'cheshire': 1.08,
  'greater-manchester': 0.95,
  'lancashire': 0.85,
  'merseyside': 0.82,
  'cumbria': 0.88,
  'west-yorkshire': 0.92,
  'south-yorkshire': 0.85,
  'north-yorkshire': 0.95,
  'derbyshire': 0.90,
  'nottinghamshire': 0.88,
  'leicestershire': 0.92,
  'northamptonshire': 0.95,
  'lincolnshire': 0.80,
  'west-midlands': 0.95,
  'staffordshire': 0.85,
  'warwickshire': 0.98,
  'worcestershire': 0.92,
  'norfolk': 0.90,
  'suffolk': 0.95,
  'bedfordshire': 1.00,
  'tyne-and-wear': 0.90,
  'northumberland': 0.85,
  'county-durham': 0.78,
  'newcastle': 0.92,
  'aberdeenshire': 1.05,
  'edinburgh': 1.15,
  'glasgow': 0.90,
  'angus': 0.85,
  'argyll': 0.88,
  'ayrshire': 0.82,
  'cardiff': 1.05,
  'belfast': 0.95
};

/**
 * Attempt to fetch real data from Land Registry SPARQL endpoint
 */
async function fetchLandRegistryData(area: string): Promise<PropertyData | null> {
  try {
    const query = `
      PREFIX ukhpi: <http://landregistry.data.gov.uk/def/ukhpi/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT ?date ?avgPrice
      WHERE {
        ?region rdfs:label "${area}"@en .
        ?obs ukhpi:refRegion ?region ;
             ukhpi:refPeriod ?date ;
             ukhpi:averagePrice ?avgPrice .
      }
      ORDER BY DESC(?date)
      LIMIT 1
    `;

    const response = await fetch(LAND_REGISTRY_SPARQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/sparql-results+json'
      },
      body: `query=${encodeURIComponent(query)}`
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.results?.bindings?.length > 0) {
      const binding = data.results.bindings[0];
      return {
        averagePrice: parseFloat(binding.avgPrice.value),
        transactionVolume: 0, // Would need separate query
        detachedAvg: 0,
        semiDetachedAvg: 0,
        terracedAvg: 0,
        flatAvg: 0,
        yearOverYearChange: '',
        region: area
      };
    }

    return null;
  } catch (error) {
    console.warn(`Could not fetch Land Registry data for ${area}:`, error);
    return null;
  }
}

/**
 * Generate property statistics for a county
 */
function generatePropertyStats(
  countySlug: string,
  population: number
): AreaPropertyStats {
  const region = COUNTY_REGION_MAP[countySlug] || 'England';
  const regionalData = REGIONAL_PROPERTY_PRICES[region] || REGIONAL_PROPERTY_PRICES['East Midlands'];
  const multiplier = COUNTY_PRICE_MULTIPLIERS[countySlug] || 1.0;

  // Calculate county-specific prices
  const avgPrice = Math.round(regionalData.averagePrice * multiplier);
  const medianPrice = Math.round(avgPrice * 0.92); // Median typically ~8% below mean

  // Calculate property type prices
  const detachedAvg = Math.round(regionalData.detachedAvg * multiplier);
  const semiDetachedAvg = Math.round(regionalData.semiDetachedAvg * multiplier);
  const terracedAvg = Math.round(regionalData.terracedAvg * multiplier);
  const flatAvg = Math.round(regionalData.flatAvg * multiplier);

  // Estimate transactions based on population (UK average ~1.5% of homes transact annually)
  // Average household size ~2.4, so transactions = population / 2.4 * 0.015
  const estimatedHouseholds = population / 2.4;
  const transactionsLast12Months = Math.round(estimatedHouseholds * 0.015);

  // Property type breakdown (varies by region)
  const typeBreakdown = getPropertyTypeBreakdown(region);

  // Calculate renovation opportunities based on older housing stock
  const renovationOpportunities = calculateRenovationOpportunities(
    transactionsLast12Months,
    avgPrice,
    region
  );

  return {
    avgPropertyValue: formatCurrency(avgPrice),
    medianPropertyValue: formatCurrency(medianPrice),
    transactionsLast12Months,
    propertyTypeBreakdown: {
      detached: { avg: formatCurrency(detachedAvg), percentage: typeBreakdown.detached },
      semiDetached: { avg: formatCurrency(semiDetachedAvg), percentage: typeBreakdown.semiDetached },
      terraced: { avg: formatCurrency(terracedAvg), percentage: typeBreakdown.terraced },
      flat: { avg: formatCurrency(flatAvg), percentage: typeBreakdown.flat }
    },
    priceChange12Months: regionalData.yearOverYearChange,
    renovationOpportunities
  };
}

/**
 * Get property type breakdown by region
 */
function getPropertyTypeBreakdown(region: string): {
  detached: number;
  semiDetached: number;
  terraced: number;
  flat: number;
} {
  const breakdowns: Record<string, any> = {
    'Greater London': { detached: 8, semiDetached: 15, terraced: 32, flat: 45 },
    'South East England': { detached: 28, semiDetached: 28, terraced: 25, flat: 19 },
    'North West England': { detached: 20, semiDetached: 32, terraced: 35, flat: 13 },
    'Yorkshire': { detached: 22, semiDetached: 30, terraced: 35, flat: 13 },
    'Scotland': { detached: 22, semiDetached: 20, terraced: 25, flat: 33 },
    'Wales': { detached: 28, semiDetached: 25, terraced: 35, flat: 12 },
    'Northern Ireland': { detached: 35, semiDetached: 25, terraced: 30, flat: 10 }
  };

  return breakdowns[region] || { detached: 25, semiDetached: 28, terraced: 30, flat: 17 };
}

/**
 * Calculate renovation opportunities description
 */
function calculateRenovationOpportunities(
  transactions: number,
  avgPrice: number,
  region: string
): string {
  // Higher price areas typically have more renovation spending
  const avgRenovationBudget = avgPrice > 400000 ? '£45,000-£85,000' :
                              avgPrice > 300000 ? '£30,000-£60,000' :
                              avgPrice > 200000 ? '£20,000-£45,000' :
                              '£15,000-£35,000';

  // Estimate renovation activity (roughly 15% of transactions lead to major works)
  const estimatedRenovations = Math.round(transactions * 0.15);

  return `Approximately ${estimatedRenovations.toLocaleString()} major renovations annually with average budgets of ${avgRenovationBudget}`;
}

/**
 * Format number as GBP currency
 */
function formatCurrency(value: number): string {
  return '£' + value.toLocaleString('en-GB');
}

/**
 * Main ingestion function
 */
export async function ingestLandRegistryData(
  countyPopulations: Record<string, number>
): Promise<Record<string, AreaPropertyStats>> {
  console.log('Starting Land Registry data ingestion...');

  const results: Record<string, AreaPropertyStats> = {};

  for (const [countySlug, population] of Object.entries(countyPopulations)) {
    console.log(`Processing ${countySlug}...`);

    // Try to get real data first
    const realData = await fetchLandRegistryData(countySlug.replace('-', ' '));

    if (realData && realData.averagePrice > 0) {
      // Use real data with some estimation for missing fields
      const stats = generatePropertyStats(countySlug, population);
      stats.avgPropertyValue = formatCurrency(Math.round(realData.averagePrice));
      stats.medianPropertyValue = formatCurrency(Math.round(realData.averagePrice * 0.92));
      results[countySlug] = stats;
    } else {
      // Use estimated data
      results[countySlug] = generatePropertyStats(countySlug, population);
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return results;
}

/**
 * Save results to JSON file
 */
export async function saveLandRegistryData(
  data: Record<string, AreaPropertyStats>
): Promise<void> {
  const outputPath = path.join(__dirname, '../src/data/generated/land-registry-data.json');

  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const output = {
    generatedAt: new Date().toISOString(),
    dataSource: 'UK House Price Index / Land Registry with regional estimates',
    note: 'Property values are estimates based on regional averages and local market factors',
    counties: data
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Land Registry data saved to ${outputPath}`);
}

// Sample county populations for standalone testing
const samplePopulations: Record<string, number> = {
  'aberdeenshire': 262000,
  'bedfordshire': 669000,
  'berkshire': 911000,
  'buckinghamshire': 546000,
  'cambridgeshire': 678000,
  'cheshire': 1070000,
  'cornwall': 570000,
  'devon': 1190000,
  'dorset': 773000,
  'essex': 1870000,
  'greater-london': 8900000,
  'greater-manchester': 2850000,
  'hampshire': 1400000,
  'kent': 1860000,
  'surrey': 1200000,
  'west-sussex': 867000,
  'west-yorkshire': 2350000,
};

// Run if called directly
if (require.main === module) {
  ingestLandRegistryData(samplePopulations)
    .then(saveLandRegistryData)
    .then(() => console.log('Land Registry data ingestion complete'))
    .catch(console.error);
}
