/**
 * Town SEO Data Generator
 * Generates unique SEO content for each town based on templates and local data
 *
 * This file provides:
 * - Town demographic data
 * - Local economic context
 * - Geographic relationships
 * - SEO content templates
 */

export interface TownSEOData {
  name: string;
  slug: string;
  countySlug: string;

  // Demographics
  demographics: {
    population: number;
    populationSource: string;
    householdCount: number;
    avgPropertyValue: string;
  };

  // Local trade economy
  tradeEconomy: {
    registeredTradeBusinesses: number;
    constructionProjects: number;
    avgContractValue: string;
    growthRate: string;
  };

  // Geographic context
  geography: {
    coordinates: { lat: number; lng: number };
    nearbyTowns: string[];
    distanceToCountyTown: string;
    transportLinks: string[];
  };

  // Unique local content
  localContent: {
    notableAreas: string[];
    majorEmployers: string[];
    developmentProjects: string[];
  };

  // SEO content templates
  seoContent: {
    h1Template: string;
    introParagraph: string;
    localExpertise: string;
    trustSignal: string;
  };

  // Entity links
  entityLinks?: {
    wikipediaUrl: string;
    wikidataId: string;
  };
}

// Town population estimates (based on 2021 Census data patterns)
const townPopulations: Record<string, number> = {
  // Aberdeenshire
  'aberdeen': 198590,
  'banchory': 7560,
  'banff': 4020,
  'ellon': 10120,
  'fraserburgh': 13280,
  'huntly': 4820,
  'inverurie': 13920,
  'peterhead': 19220,
  'turriff': 5380,

  // West Sussex
  'chichester': 31080,
  'crawley': 118480,
  'horsham': 48620,
  'worthing': 110570,
  'bognor-regis': 24320,
  'littlehampton': 30220,
  'burgess-hill': 33420,
  'haywards-heath': 35270,
  'east-grinstead': 26380,
  'midhurst': 4970,
  'petworth': 3280,
  'arundel': 3540,
  'pulborough': 4820,
  'shoreham-by-sea': 21010,

  // Greater London
  'london': 8799728,

  // Greater Manchester
  'manchester': 547627,
  'bolton': 194189,
  'bury': 196870,
  'rochdale': 118000,
  'salford': 269500,
  'stockport': 294500,
  'altrincham': 52419,
  'oldham': 237110,
  'wigan': 329825,

  // Cambridgeshire
  'cambridge': 145700,
  'peterborough': 215700,
  'huntingdon': 24000,
  'st-ives': 16400,
  'ely': 20256,
  'wisbech': 31573,
  'march': 22298,
  'chatteris': 10453,

  // Devon
  'exeter': 133300,
  'plymouth': 264200,
  'torquay': 65245,
  'paignton': 52322,
  'newton-abbot': 26000,
  'exmouth': 36500,
  'barnstaple': 36500,
  'tiverton': 21335,
  'bideford': 17100,
  'tavistock': 13000,
  'dartmouth': 5500,
  'totnes': 8000,

  // Kent
  'maidstone': 113137,
  'canterbury': 55240,
  'ashford': 74204,
  'dover': 32120,
  'folkestone': 51337,
  'margate': 64000,
  'ramsgate': 40000,
  'tunbridge-wells': 65000,
  'sevenoaks': 30340,
  'gravesend': 74700,
  'dartford': 107700,
  'chatham': 76000,

  // Surrey
  'guildford': 137200,
  'woking': 105367,
  'epsom': 78000,
  'reigate': 25000,
  'dorking': 12000,
  'farnham': 42000,
  'camberley': 40000,
  'staines': 61000,
  'leatherhead': 11318,
  'cobham': 9500,
  'esher': 67000,
  'godalming': 22000,
  'haslemere': 17000,
  'weybridge': 15449,

  // Default for unlisted towns
  'default': 15000
};

// Regional property price multipliers
const regionalPriceMultipliers: Record<string, number> = {
  'greater-london': 1.5,
  'surrey': 1.35,
  'berkshire': 1.2,
  'buckinghamshire': 1.15,
  'hertfordshire': 1.1,
  'kent': 0.95,
  'west-sussex': 1.0,
  'east-sussex': 0.92,
  'hampshire': 1.0,
  'oxfordshire': 1.1,
  'cambridgeshire': 1.05,
  'essex': 0.9,
  'greater-manchester': 0.75,
  'west-yorkshire': 0.7,
  'south-yorkshire': 0.65,
  'tyne-and-wear': 0.6,
  'merseyside': 0.65,
  'lancashire': 0.68,
  'devon': 0.85,
  'cornwall': 0.9,
  'dorset': 0.95,
  'somerset': 0.8,
  'scotland': 0.75,
  'wales': 0.7,
  'northern-ireland': 0.65
};

// Base property prices by property type
const basePropertyPrices = {
  average: 285000,
  detached: 450000,
  semiDetached: 290000,
  terraced: 235000,
  flat: 200000
};

/**
 * Generate town SEO data from basic parameters
 */
export function generateTownSEOData(
  townName: string,
  townSlug: string,
  countySlug: string,
  countyName: string,
  region: string,
  coordinates?: { lat: number; lng: number },
  nearbyTowns?: string[]
): TownSEOData {
  // Get population
  const population = townPopulations[townSlug] || townPopulations['default'];

  // Calculate households (avg 2.4 people per household)
  const householdCount = Math.round(population / 2.4);

  // Calculate property value based on regional multiplier
  const priceMultiplier = regionalPriceMultipliers[countySlug] ||
                         regionalPriceMultipliers[region.toLowerCase().replace(/\s+/g, '-')] ||
                         1.0;
  const avgPropertyValue = Math.round(basePropertyPrices.average * priceMultiplier);

  // Calculate trade businesses (approx 1 per 85 people)
  const registeredTradeBusinesses = Math.round(population / 85);

  // Generate SEO content
  const seoContent = generateSEOContent(townName, countyName, region, population);

  return {
    name: townName,
    slug: townSlug,
    countySlug,
    demographics: {
      population,
      populationSource: 'ONS 2021 Census estimates',
      householdCount,
      avgPropertyValue: formatCurrency(avgPropertyValue)
    },
    tradeEconomy: {
      registeredTradeBusinesses,
      constructionProjects: Math.round(householdCount * 0.015), // ~1.5% turnover
      avgContractValue: formatCurrency(Math.round(avgPropertyValue * 0.08)), // ~8% of property value
      growthRate: getGrowthRate(region)
    },
    geography: {
      coordinates: coordinates || { lat: 51.5, lng: -0.1 }, // Default to London area
      nearbyTowns: nearbyTowns || [],
      distanceToCountyTown: '', // Would be calculated
      transportLinks: getTransportLinks(townName, region)
    },
    localContent: {
      notableAreas: getNotableAreas(townName, population),
      majorEmployers: getMajorEmployers(townName, region),
      developmentProjects: getDevelopmentProjects(townName, population)
    },
    seoContent
  };
}

/**
 * Generate SEO content with semantic triples
 */
function generateSEOContent(
  townName: string,
  countyName: string,
  region: string,
  population: number
): TownSEOData['seoContent'] {
  const sizeDescriptor = population > 100000 ? 'major city' :
                        population > 50000 ? 'large town' :
                        population > 20000 ? 'market town' :
                        population > 10000 ? 'town' : 'community';

  return {
    h1Template: `{Trade} Business Loans in ${townName}, ${countyName}`,
    introParagraph: `${townName} tradesmen [S] access fast, flexible business finance through [P] Tradesman Finance, the UK's specialist trade lender [O]. With over ${Math.round(population / 85).toLocaleString()} trade businesses serving this ${sizeDescriptor}, we understand the local market.`,
    localExpertise: `Our team [S] provides [P] dedicated finance support for ${townName}-based trade businesses [O], from sole traders to growing companies. We understand ${countyName}'s construction market and offer terms designed for real trade work.`,
    trustSignal: `Trusted by tradesmen across ${region}, Tradesman Finance delivers decisions in under 4 hours with funds typically available within 24-48 hours.`
  };
}

/**
 * Get growth rate based on region
 */
function getGrowthRate(region: string): string {
  const rates: Record<string, string> = {
    'Greater London': '+4.2%',
    'South East England': '+5.1%',
    'East of England': '+5.8%',
    'South West England': '+4.6%',
    'West Midlands': '+3.8%',
    'East Midlands': '+4.1%',
    'Yorkshire': '+4.5%',
    'North West England': '+4.8%',
    'North East England': '+3.2%',
    'Scotland': '+3.5%',
    'Wales': '+3.1%',
    'Northern Ireland': '+3.8%'
  };
  return rates[region] || '+4.0%';
}

/**
 * Get transport links for a town
 */
function getTransportLinks(townName: string, region: string): string[] {
  const links: string[] = [];

  // Major towns typically have rail connections
  if (townPopulations[townName.toLowerCase().replace(/\s+/g, '-')] > 20000) {
    links.push(`${townName} Railway Station`);
  }

  // Regional transport
  if (region === 'Greater London') {
    links.push('London Underground', 'Elizabeth Line');
  } else if (region === 'South East England') {
    links.push('Southern Rail', 'Southeastern Railway');
  } else if (region === 'North West England') {
    links.push('Northern Rail', 'TransPennine Express');
  }

  // All towns have road access
  links.push('A-road connections', 'Local bus services');

  return links;
}

/**
 * Get notable areas in a town
 */
function getNotableAreas(townName: string, population: number): string[] {
  const areas: string[] = [];

  if (population > 50000) {
    areas.push(`${townName} Town Centre`, 'Industrial estate', 'Retail park');
  } else if (population > 20000) {
    areas.push(`${townName} High Street`, 'Business district');
  } else {
    areas.push(`${townName} village centre`);
  }

  // Generic areas
  areas.push('Residential neighbourhoods', 'New housing developments');

  return areas;
}

/**
 * Get major employers in a town
 */
function getMajorEmployers(townName: string, region: string): string[] {
  const employers: string[] = [];

  // Always include NHS and council
  employers.push('NHS Trust', 'Local Council');

  // Regional employers
  if (region === 'Greater London') {
    employers.push('Transport for London', 'City of London Corporation');
  } else if (region.includes('South East')) {
    employers.push('Local universities', 'Major retailers');
  } else if (region.includes('North')) {
    employers.push('Manufacturing sector', 'Distribution centres');
  }

  return employers;
}

/**
 * Get development projects
 */
function getDevelopmentProjects(townName: string, population: number): string[] {
  const projects: string[] = [];

  if (population > 50000) {
    projects.push(
      `${townName} town centre regeneration`,
      'New housing developments',
      'Commercial park expansion'
    );
  } else {
    projects.push(
      'Local housing developments',
      'Infrastructure improvements'
    );
  }

  return projects;
}

/**
 * Format number as GBP currency
 */
function formatCurrency(value: number): string {
  return '£' + value.toLocaleString('en-GB');
}

/**
 * Get town SEO data by slug
 */
export function getTownSEOData(
  townSlug: string,
  countySlug: string,
  countyName: string,
  region: string
): TownSEOData {
  const townName = slugToTownName(townSlug);
  return generateTownSEOData(townName, townSlug, countySlug, countyName, region);
}

/**
 * Convert slug to display name
 */
function slugToTownName(slug: string): string {
  return slug
    .split('-')
    .map(word => {
      // Handle special cases
      if (word === 'st') return 'St';
      if (word === 'upon') return 'upon';
      if (word === 'on') return 'on';
      if (word === 'in') return 'in';
      if (word === 'the') return 'the';
      if (word === 'de') return 'de';
      if (word === 'la') return 'la';
      if (word === 'le') return 'le';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .replace(' upon ', '-upon-')
    .replace(' on ', '-on-')
    .replace(' in ', '-in-')
    .replace(' de ', ' de ')
    .replace(' la ', ' la ')
    .replace(' le ', ' le ');
}

/**
 * Trade-specific town content generator
 */
export function generateTradeLocationContent(
  tradeName: string,
  tradeSlug: string,
  townName: string,
  townSlug: string,
  countyName: string,
  countySlug: string,
  region: string
): {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  openingParagraph: string;
  localMarketSection: string;
  equipmentSection: string;
  trustSection: string;
} {
  const population = townPopulations[townSlug] || townPopulations['default'];
  const tradeBusinesses = Math.round(population / 85 * getTradePercentage(tradeSlug));

  return {
    h1: `${tradeName} Business Loans in ${townName} - Equipment & Vehicle Finance`,
    metaTitle: `${tradeName} Finance ${townName} | Equipment Loans & Business Finance`,
    metaDescription: `Fast ${tradeName.toLowerCase()} business loans in ${townName}, ${countyName}. Equipment finance, van loans & working capital. Decisions in 4 hours. Apply today.`,
    openingParagraph: `${townName} ${tradeName.toLowerCase()}s [S] access specialist business finance through [P] Tradesman Finance [O], with decisions in under 24 hours. Serving ${tradeBusinesses.toLocaleString()}+ ${tradeName.toLowerCase()} businesses in ${townName} and across ${countyName}.`,
    localMarketSection: `${townName}'s construction sector [S] supports [P] a thriving community of ${tradeName.toLowerCase()} businesses [O]. With average contract values of ${formatCurrency(Math.round((townPopulations[townSlug] || 15000) * 0.08 / 85))} and ${getGrowthRate(region)} year-on-year growth, there's never been a better time to invest in your ${tradeName.toLowerCase()} business.`,
    equipmentSection: `From specialist tools to work vans, we finance the equipment ${townName} ${tradeName.toLowerCase()}s need to grow. Our flexible terms mean you can spread the cost of major purchases while keeping cash in your business.`,
    trustSection: `Trusted by tradesmen across ${region}, we understand the equipment and finance needs of ${tradeName.toLowerCase()}s. Get a decision in under 4 hours and funds typically within 24-48 hours.`
  };
}

/**
 * Get trade percentage of construction businesses
 */
function getTradePercentage(tradeSlug: string): number {
  const percentages: Record<string, number> = {
    'electrician': 0.18,
    'plumber': 0.14,
    'builder': 0.16,
    'carpenter': 0.08,
    'heating-engineer': 0.07,
    'roofer': 0.05,
    'plasterer': 0.04,
    'painter-decorator': 0.06,
    'landscaper': 0.05,
    'tiler': 0.03,
    'flooring-contractor': 0.02,
    'scaffolder': 0.02,
    'groundworker': 0.04,
    'demolition': 0.01,
    'bricklayer': 0.03,
    'window-fitter': 0.02,
    'bathroom-fitter': 0.02,
    'shop-fitter': 0.01,
    'locksmith': 0.01,
    'air-conditioning': 0.02
  };
  return percentages[tradeSlug] || 0.03;
}

// Export commonly used functions
export {
  townPopulations,
  regionalPriceMultipliers,
  formatCurrency,
  slugToTownName,
  getGrowthRate,
  getTradePercentage
};
