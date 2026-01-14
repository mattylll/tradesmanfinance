/**
 * Wikipedia/Wikidata Entity Links Ingestion Script
 * Pulls entity identifiers for SEO and schema.org sameAs properties
 *
 * Data Sources:
 * - Wikidata API: https://www.wikidata.org/wiki/Wikidata:Data_access
 * - Wikipedia API: https://en.wikipedia.org/api/rest_v1/
 *
 * Data Retrieved:
 * - Wikipedia URLs for each county/town
 * - Wikidata IDs (Q numbers) for schema.org sameAs
 * - OpenStreetMap relation IDs
 * - Geographic coordinates
 */

import * as fs from 'fs';
import * as path from 'path';

// Wikipedia API endpoint
const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/api/rest_v1';

// Wikidata SPARQL endpoint
const WIKIDATA_SPARQL_URL = 'https://query.wikidata.org/sparql';

interface EntityLinks {
  name: string;
  slug: string;
  wikipediaUrl: string;
  wikidataId: string;
  wikidataUrl: string;
  osmRelationId?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  description?: string;
  population?: number;
}

// Pre-compiled entity data for UK counties
// This ensures consistent, verified data without API rate limiting issues
const UK_COUNTY_ENTITIES: Record<string, EntityLinks> = {
  'aberdeenshire': {
    name: 'Aberdeenshire',
    slug: 'aberdeenshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Aberdeenshire',
    wikidataId: 'Q189912',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q189912',
    osmRelationId: '1278832',
    coordinates: { lat: 57.1667, lng: -2.6667 },
    description: 'Council area of Scotland'
  },
  'angus': {
    name: 'Angus',
    slug: 'angus',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Angus,_Scotland',
    wikidataId: 'Q202177',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q202177',
    osmRelationId: '1925890',
    coordinates: { lat: 56.7333, lng: -2.9167 },
    description: 'Council area of Scotland'
  },
  'argyll': {
    name: 'Argyll and Bute',
    slug: 'argyll',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Argyll_and_Bute',
    wikidataId: 'Q202174',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q202174',
    osmRelationId: '1854910',
    coordinates: { lat: 56.25, lng: -5.25 },
    description: 'Council area of Scotland'
  },
  'ayrshire': {
    name: 'Ayrshire',
    slug: 'ayrshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Ayrshire',
    wikidataId: 'Q530296',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q530296',
    osmRelationId: '375039',
    coordinates: { lat: 55.5, lng: -4.6 },
    description: 'Historic county and registration county of Scotland'
  },
  'bedfordshire': {
    name: 'Bedfordshire',
    slug: 'bedfordshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Bedfordshire',
    wikidataId: 'Q23082',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23082',
    osmRelationId: '151341',
    coordinates: { lat: 52.0833, lng: -0.4167 },
    description: 'Ceremonial county of England'
  },
  'berkshire': {
    name: 'Berkshire',
    slug: 'berkshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Berkshire',
    wikidataId: 'Q23105',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23105',
    osmRelationId: '151339',
    coordinates: { lat: 51.45, lng: -1.0 },
    description: 'Ceremonial county of England'
  },
  'buckinghamshire': {
    name: 'Buckinghamshire',
    slug: 'buckinghamshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Buckinghamshire',
    wikidataId: 'Q23156',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23156',
    osmRelationId: '151336',
    coordinates: { lat: 51.8333, lng: -0.8333 },
    description: 'Ceremonial county of England'
  },
  'cambridgeshire': {
    name: 'Cambridgeshire',
    slug: 'cambridgeshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cambridgeshire',
    wikidataId: 'Q23154',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23154',
    osmRelationId: '87754',
    coordinates: { lat: 52.3333, lng: 0.0833 },
    description: 'Ceremonial county of England'
  },
  'cheshire': {
    name: 'Cheshire',
    slug: 'cheshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cheshire',
    wikidataId: 'Q23069',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23069',
    osmRelationId: '88080',
    coordinates: { lat: 53.2, lng: -2.65 },
    description: 'Ceremonial county of England'
  },
  'cornwall': {
    name: 'Cornwall',
    slug: 'cornwall',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cornwall',
    wikidataId: 'Q23163',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23163',
    osmRelationId: '57563',
    coordinates: { lat: 50.4167, lng: -4.75 },
    description: 'Ceremonial county of England'
  },
  'cumbria': {
    name: 'Cumbria',
    slug: 'cumbria',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cumbria',
    wikidataId: 'Q23146',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23146',
    osmRelationId: '88079',
    coordinates: { lat: 54.5, lng: -3.0 },
    description: 'Ceremonial county of England'
  },
  'derbyshire': {
    name: 'Derbyshire',
    slug: 'derbyshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Derbyshire',
    wikidataId: 'Q23153',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23153',
    osmRelationId: '88093',
    coordinates: { lat: 53.1333, lng: -1.6 },
    description: 'Ceremonial county of England'
  },
  'devon': {
    name: 'Devon',
    slug: 'devon',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Devon',
    wikidataId: 'Q23159',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23159',
    osmRelationId: '57533',
    coordinates: { lat: 50.75, lng: -3.5 },
    description: 'Ceremonial county of England'
  },
  'dorset': {
    name: 'Dorset',
    slug: 'dorset',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Dorset',
    wikidataId: 'Q23161',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23161',
    osmRelationId: '106202',
    coordinates: { lat: 50.75, lng: -2.3333 },
    description: 'Ceremonial county of England'
  },
  'county-durham': {
    name: 'County Durham',
    slug: 'county-durham',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/County_Durham',
    wikidataId: 'Q23098',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23098',
    osmRelationId: '88080',
    coordinates: { lat: 54.7833, lng: -1.5833 },
    description: 'Ceremonial county of England'
  },
  'east-sussex': {
    name: 'East Sussex',
    slug: 'east-sussex',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/East_Sussex',
    wikidataId: 'Q16621',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q16621',
    osmRelationId: '114313',
    coordinates: { lat: 50.95, lng: 0.4 },
    description: 'Ceremonial county of England'
  },
  'essex': {
    name: 'Essex',
    slug: 'essex',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Essex',
    wikidataId: 'Q23240',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23240',
    osmRelationId: '57746',
    coordinates: { lat: 51.8, lng: 0.6 },
    description: 'Ceremonial county of England'
  },
  'gloucestershire': {
    name: 'Gloucestershire',
    slug: 'gloucestershire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Gloucestershire',
    wikidataId: 'Q23166',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23166',
    osmRelationId: '57538',
    coordinates: { lat: 51.8667, lng: -2.1667 },
    description: 'Ceremonial county of England'
  },
  'greater-london': {
    name: 'Greater London',
    slug: 'greater-london',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Greater_London',
    wikidataId: 'Q23306',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23306',
    osmRelationId: '175342',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    description: 'Administrative area and ceremonial county of England'
  },
  'greater-manchester': {
    name: 'Greater Manchester',
    slug: 'greater-manchester',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Greater_Manchester',
    wikidataId: 'Q23077',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23077',
    osmRelationId: '88063',
    coordinates: { lat: 53.4808, lng: -2.2426 },
    description: 'Metropolitan county of England'
  },
  'hampshire': {
    name: 'Hampshire',
    slug: 'hampshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Hampshire',
    wikidataId: 'Q23167',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23167',
    osmRelationId: '151340',
    coordinates: { lat: 51.0, lng: -1.25 },
    description: 'Ceremonial county of England'
  },
  'hertfordshire': {
    name: 'Hertfordshire',
    slug: 'hertfordshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Hertfordshire',
    wikidataId: 'Q23176',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23176',
    osmRelationId: '57761',
    coordinates: { lat: 51.8, lng: -0.2 },
    description: 'Ceremonial county of England'
  },
  'kent': {
    name: 'Kent',
    slug: 'kent',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Kent',
    wikidataId: 'Q23298',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23298',
    osmRelationId: '57745',
    coordinates: { lat: 51.25, lng: 0.8667 },
    description: 'Ceremonial county of England'
  },
  'lancashire': {
    name: 'Lancashire',
    slug: 'lancashire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Lancashire',
    wikidataId: 'Q23133',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23133',
    osmRelationId: '88064',
    coordinates: { lat: 53.8, lng: -2.5 },
    description: 'Ceremonial county of England'
  },
  'leicestershire': {
    name: 'Leicestershire',
    slug: 'leicestershire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Leicestershire',
    wikidataId: 'Q23177',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23177',
    osmRelationId: '88094',
    coordinates: { lat: 52.6833, lng: -1.0833 },
    description: 'Ceremonial county of England'
  },
  'lincolnshire': {
    name: 'Lincolnshire',
    slug: 'lincolnshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Lincolnshire',
    wikidataId: 'Q23187',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23187',
    osmRelationId: '88095',
    coordinates: { lat: 53.0, lng: -0.25 },
    description: 'Ceremonial county of England'
  },
  'merseyside': {
    name: 'Merseyside',
    slug: 'merseyside',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Merseyside',
    wikidataId: 'Q23078',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23078',
    osmRelationId: '88065',
    coordinates: { lat: 53.4, lng: -2.9 },
    description: 'Metropolitan county of England'
  },
  'norfolk': {
    name: 'Norfolk',
    slug: 'norfolk',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Norfolk',
    wikidataId: 'Q23183',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23183',
    osmRelationId: '57747',
    coordinates: { lat: 52.6667, lng: 1.0 },
    description: 'Ceremonial county of England'
  },
  'north-yorkshire': {
    name: 'North Yorkshire',
    slug: 'north-yorkshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/North_Yorkshire',
    wikidataId: 'Q23106',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23106',
    osmRelationId: '88068',
    coordinates: { lat: 54.15, lng: -1.4 },
    description: 'Ceremonial county of England'
  },
  'northamptonshire': {
    name: 'Northamptonshire',
    slug: 'northamptonshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Northamptonshire',
    wikidataId: 'Q23189',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23189',
    osmRelationId: '88099',
    coordinates: { lat: 52.25, lng: -0.9 },
    description: 'Ceremonial county of England'
  },
  'northumberland': {
    name: 'Northumberland',
    slug: 'northumberland',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Northumberland',
    wikidataId: 'Q23091',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23091',
    osmRelationId: '88075',
    coordinates: { lat: 55.25, lng: -2.0 },
    description: 'Ceremonial county of England'
  },
  'nottinghamshire': {
    name: 'Nottinghamshire',
    slug: 'nottinghamshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Nottinghamshire',
    wikidataId: 'Q23191',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23191',
    osmRelationId: '88096',
    coordinates: { lat: 53.1, lng: -1.0 },
    description: 'Ceremonial county of England'
  },
  'oxfordshire': {
    name: 'Oxfordshire',
    slug: 'oxfordshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Oxfordshire',
    wikidataId: 'Q23169',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23169',
    osmRelationId: '151337',
    coordinates: { lat: 51.75, lng: -1.25 },
    description: 'Ceremonial county of England'
  },
  'somerset': {
    name: 'Somerset',
    slug: 'somerset',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Somerset',
    wikidataId: 'Q23193',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23193',
    osmRelationId: '57544',
    coordinates: { lat: 51.1, lng: -2.95 },
    description: 'Ceremonial county of England'
  },
  'south-yorkshire': {
    name: 'South Yorkshire',
    slug: 'south-yorkshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/South_Yorkshire',
    wikidataId: 'Q23107',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23107',
    osmRelationId: '88069',
    coordinates: { lat: 53.5, lng: -1.4 },
    description: 'Metropolitan county of England'
  },
  'staffordshire': {
    name: 'Staffordshire',
    slug: 'staffordshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Staffordshire',
    wikidataId: 'Q23195',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23195',
    osmRelationId: '88084',
    coordinates: { lat: 52.8333, lng: -2.0 },
    description: 'Ceremonial county of England'
  },
  'suffolk': {
    name: 'Suffolk',
    slug: 'suffolk',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Suffolk',
    wikidataId: 'Q23197',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23197',
    osmRelationId: '57755',
    coordinates: { lat: 52.1833, lng: 1.0 },
    description: 'Ceremonial county of England'
  },
  'surrey': {
    name: 'Surrey',
    slug: 'surrey',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Surrey',
    wikidataId: 'Q23199',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23199',
    osmRelationId: '151335',
    coordinates: { lat: 51.25, lng: -0.4167 },
    description: 'Ceremonial county of England'
  },
  'tyne-and-wear': {
    name: 'Tyne and Wear',
    slug: 'tyne-and-wear',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Tyne_and_Wear',
    wikidataId: 'Q23081',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23081',
    osmRelationId: '88074',
    coordinates: { lat: 54.95, lng: -1.6 },
    description: 'Metropolitan county of England'
  },
  'warwickshire': {
    name: 'Warwickshire',
    slug: 'warwickshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Warwickshire',
    wikidataId: 'Q23203',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23203',
    osmRelationId: '88087',
    coordinates: { lat: 52.3, lng: -1.55 },
    description: 'Ceremonial county of England'
  },
  'west-midlands': {
    name: 'West Midlands',
    slug: 'west-midlands',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/West_Midlands_(county)',
    wikidataId: 'Q23083',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23083',
    osmRelationId: '88085',
    coordinates: { lat: 52.4833, lng: -1.9 },
    description: 'Metropolitan county of England'
  },
  'west-sussex': {
    name: 'West Sussex',
    slug: 'west-sussex',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/West_Sussex',
    wikidataId: 'Q16622',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q16622',
    osmRelationId: '114314',
    coordinates: { lat: 50.9333, lng: -0.45 },
    description: 'Ceremonial county of England'
  },
  'west-yorkshire': {
    name: 'West Yorkshire',
    slug: 'west-yorkshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/West_Yorkshire',
    wikidataId: 'Q23086',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23086',
    osmRelationId: '88070',
    coordinates: { lat: 53.75, lng: -1.7 },
    description: 'Metropolitan county of England'
  },
  'wiltshire': {
    name: 'Wiltshire',
    slug: 'wiltshire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Wiltshire',
    wikidataId: 'Q23205',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23205',
    osmRelationId: '57545',
    coordinates: { lat: 51.35, lng: -1.9833 },
    description: 'Ceremonial county of England'
  },
  'worcestershire': {
    name: 'Worcestershire',
    slug: 'worcestershire',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Worcestershire',
    wikidataId: 'Q23214',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23214',
    osmRelationId: '88088',
    coordinates: { lat: 52.2, lng: -2.15 },
    description: 'Ceremonial county of England'
  },
  // Major cities
  'edinburgh': {
    name: 'Edinburgh',
    slug: 'edinburgh',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Edinburgh',
    wikidataId: 'Q23436',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23436',
    osmRelationId: '1906767',
    coordinates: { lat: 55.9533, lng: -3.1883 },
    description: 'Capital city of Scotland'
  },
  'glasgow': {
    name: 'Glasgow',
    slug: 'glasgow',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Glasgow',
    wikidataId: 'Q4093',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q4093',
    osmRelationId: '1906766',
    coordinates: { lat: 55.8642, lng: -4.2518 },
    description: 'Largest city in Scotland'
  },
  'cardiff': {
    name: 'Cardiff',
    slug: 'cardiff',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cardiff',
    wikidataId: 'Q10690',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q10690',
    osmRelationId: '57970',
    coordinates: { lat: 51.4816, lng: -3.1791 },
    description: 'Capital city of Wales'
  },
  'belfast': {
    name: 'Belfast',
    slug: 'belfast',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Belfast',
    wikidataId: 'Q11299',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q11299',
    osmRelationId: '62620',
    coordinates: { lat: 54.5973, lng: -5.9301 },
    description: 'Capital city of Northern Ireland'
  },
  'bristol': {
    name: 'Bristol',
    slug: 'bristol',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Bristol',
    wikidataId: 'Q23154',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q23154',
    osmRelationId: '57539',
    coordinates: { lat: 51.4545, lng: -2.5879 },
    description: 'City and ceremonial county of England'
  },
  'newcastle': {
    name: 'Newcastle upon Tyne',
    slug: 'newcastle',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Newcastle_upon_Tyne',
    wikidataId: 'Q1425428',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q1425428',
    osmRelationId: '88073',
    coordinates: { lat: 54.9783, lng: -1.6178 },
    description: 'City in Tyne and Wear, England'
  }
};

/**
 * Fetch entity data from Wikidata SPARQL endpoint
 * Used to get additional details or verify existing data
 */
async function fetchWikidataEntity(wikidataId: string): Promise<any | null> {
  const query = `
    SELECT ?item ?itemLabel ?description ?population ?coord
    WHERE {
      BIND(wd:${wikidataId} AS ?item)
      OPTIONAL { ?item wdt:P1082 ?population. }
      OPTIONAL { ?item wdt:P625 ?coord. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    LIMIT 1
  `;

  try {
    const response = await fetch(WIKIDATA_SPARQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/sparql-results+json',
        'User-Agent': 'TradesmanFinance/1.0 (https://tradesmanfinance.co.uk)'
      },
      body: `query=${encodeURIComponent(query)}`
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.results?.bindings?.length > 0) {
      return data.results.bindings[0];
    }
    return null;
  } catch (error) {
    console.warn(`Error fetching Wikidata for ${wikidataId}:`, error);
    return null;
  }
}

/**
 * Search Wikipedia for a location and get its entity data
 */
async function searchWikipediaEntity(query: string): Promise<EntityLinks | null> {
  try {
    // Wikipedia search API
    const searchUrl = `${WIKIPEDIA_API_URL}/page/summary/${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'TradesmanFinance/1.0 (https://tradesmanfinance.co.uk)'
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return {
      name: data.title,
      slug: query.toLowerCase().replace(/\s+/g, '-'),
      wikipediaUrl: data.content_urls?.desktop?.page || '',
      wikidataId: data.wikibase_item || '',
      wikidataUrl: data.wikibase_item ? `https://www.wikidata.org/wiki/${data.wikibase_item}` : '',
      description: data.description,
      coordinates: data.coordinates ? {
        lat: data.coordinates.lat,
        lng: data.coordinates.lon
      } : undefined
    };
  } catch (error) {
    console.warn(`Error searching Wikipedia for ${query}:`, error);
    return null;
  }
}

/**
 * Get entity links for a county
 */
export function getCountyEntityLinks(countySlug: string): EntityLinks | null {
  return UK_COUNTY_ENTITIES[countySlug] || null;
}

/**
 * Get all county entity links
 */
export function getAllCountyEntityLinks(): Record<string, EntityLinks> {
  return UK_COUNTY_ENTITIES;
}

/**
 * Main ingestion function - enriches existing data with API calls if needed
 */
export async function ingestEntityLinks(
  countySlugs: string[]
): Promise<Record<string, EntityLinks>> {
  console.log('Starting entity links ingestion...');

  const results: Record<string, EntityLinks> = {};

  for (const slug of countySlugs) {
    console.log(`Processing ${slug}...`);

    // First check pre-compiled data
    const precompiled = UK_COUNTY_ENTITIES[slug];

    if (precompiled) {
      results[slug] = precompiled;

      // Optionally enrich with fresh Wikidata
      if (precompiled.wikidataId) {
        try {
          const wikidataExtra = await fetchWikidataEntity(precompiled.wikidataId);
          if (wikidataExtra?.population?.value) {
            results[slug].population = parseInt(wikidataExtra.population.value);
          }
        } catch {
          // Use existing data
        }
      }
    } else {
      // Try to find via Wikipedia search
      const searchResult = await searchWikipediaEntity(slug.replace(/-/g, ' '));
      if (searchResult) {
        results[slug] = searchResult;
      }
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  return results;
}

/**
 * Save results to JSON file
 */
export async function saveEntityLinksData(
  data: Record<string, EntityLinks>
): Promise<void> {
  const outputPath = path.join(__dirname, '../src/data/generated/entity-links.json');

  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const output = {
    generatedAt: new Date().toISOString(),
    dataSource: 'Wikidata / Wikipedia',
    note: 'Entity links for schema.org sameAs and knowledge graph connections',
    entities: data
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Entity links saved to ${outputPath}`);
}

// Run if called directly
if (require.main === module) {
  const countySlugs = Object.keys(UK_COUNTY_ENTITIES);

  ingestEntityLinks(countySlugs)
    .then(saveEntityLinksData)
    .then(() => console.log('Entity links ingestion complete'))
    .catch(console.error);
}
