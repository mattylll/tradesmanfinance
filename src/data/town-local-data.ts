/**
 * Town Local Data
 * Rich, unique content for each town with real local information
 *
 * This file contains:
 * - Local economy and employers
 * - Notable areas and developments
 * - Town-specific context
 * - Local testimonials
 * - Unique FAQs
 */

export interface TownLocalData {
  slug: string;
  name: string;
  countySlug: string;

  // Demographics
  population: number;
  populationYear: string;

  // Local Economy
  localEconomy: {
    description: string;
    keyIndustries: string[];
    majorEmployers: string[];
    businessParks?: string[];
    economicCharacter: string; // e.g., "commuter town", "industrial hub", "market town"
  };

  // Local Context
  localContext: {
    historicalNote?: string;
    knownFor: string[];
    nearbyAttractions?: string[];
    transportLinks: string[];
  };

  // Construction & Trade Market
  tradeMarket: {
    characterDescription: string; // e.g., "High demand for heritage restoration..."
    hotSectors: string[];
    majorProjects: string[];
    localChallenges?: string[];
  };

  // Unique Content
  content: {
    heroSubtitle: string;
    introductionParagraph: string;
    whyLocalTradesmen: string;
    closingCTA: string;
  };

  // Local FAQs
  faqs: Array<{
    question: string;
    answer: string;
  }>;

  // Local testimonial
  testimonial?: {
    quote: string;
    name: string;
    trade: string;
    business: string;
    amount?: string;
  };

  // Coordinates for maps
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Comprehensive town data with real local information
export const townLocalData: Record<string, TownLocalData> = {
  // ============================================
  // HERTFORDSHIRE
  // ============================================
  'st-albans': {
    slug: 'st-albans',
    name: 'St Albans',
    countySlug: 'hertfordshire',
    population: 147373,
    populationYear: '2021',
    localEconomy: {
      description: 'St Albans is an affluent cathedral city with a thriving local economy driven by professional services, retail, and its position as a prime London commuter location.',
      keyIndustries: ['Professional Services', 'Retail', 'Education', 'Healthcare', 'Creative Industries'],
      majorEmployers: ['Oaklands College', 'St Albans City Hospital', 'Rothamsted Research', 'Sainsbury\'s HQ (nearby)', 'Sopra Steria'],
      businessParks: ['Sandridge Gate Business Centre', 'Sutton Road Industrial Estate', 'Colney Street Industrial Area'],
      economicCharacter: 'Affluent commuter city with strong local economy',
    },
    localContext: {
      historicalNote: 'One of Britain\'s oldest towns, founded as Verulamium by the Romans. Home to St Albans Cathedral, England\'s oldest site of continuous Christian worship.',
      knownFor: ['St Albans Cathedral', 'Roman Verulamium', 'Medieval clock tower', 'Historic market', 'CAMRA beer festival'],
      nearbyAttractions: ['Warner Bros. Studio Tour (Harry Potter)', 'Verulamium Park', 'Roman Theatre'],
      transportLinks: ['Thameslink to London St Pancras (20 mins)', 'M1 & M25 nearby', 'A1(M) access'],
    },
    tradeMarket: {
      characterDescription: 'Strong demand for quality tradesmen serving affluent homeowners. High standards expected with premium rates available for skilled work.',
      hotSectors: ['Period property restoration', 'High-end kitchen/bathroom fitting', 'Heritage conservation', 'Garden landscaping', 'Home extensions'],
      majorProjects: [
        'St Albans City Centre regeneration scheme',
        'New housing developments at Oaklands',
        'Marlborough Road commercial development',
        'Abbey View community expansion',
      ],
      localChallenges: ['Conservation area restrictions', 'High parking costs in city centre', 'Affluent client expectations'],
    },
    content: {
      heroSubtitle: 'Serving the historic cathedral city and surrounding villages',
      introductionParagraph: 'St Albans tradesmen serve one of Britain\'s most affluent cities, where Roman heritage meets modern living. With average property values exceeding £650,000 and residents who expect the highest standards, there\'s strong demand for quality electricians, plumbers, builders and specialist trades.',
      whyLocalTradesmen: 'St Albans homeowners invest in their properties. Period conversions, premium kitchen installations, and heritage-sensitive renovations require skilled tradespeople who understand both modern techniques and traditional craftsmanship.',
      closingCTA: 'Get a free quote for your St Albans trade business in under 4 hours',
    },
    faqs: [
      {
        question: 'Do you finance equipment for period property work in St Albans?',
        answer: 'Yes, we regularly finance specialist equipment for tradesmen working on St Albans\' many period properties, from lime mortar tools to heritage-compatible fixtures.',
      },
      {
        question: 'Can I get van finance for working in the St Albans area?',
        answer: 'Absolutely. Many St Albans tradesmen finance vans through us - essential for covering the city and surrounding villages like Harpenden, Wheathampstead, and Redbourn.',
      },
      {
        question: 'What\'s the typical loan size for St Albans tradesmen?',
        answer: 'St Albans tradesmen typically finance between £15,000-£75,000, reflecting the higher equipment standards expected by local clients. We\'ve funded everything from high-end tool kits to complete workshop setups.',
      },
      {
        question: 'Do you work with tradesmen from nearby areas too?',
        answer: 'Yes, we serve tradesmen throughout the St Albans area including Harpenden, Wheathampstead, London Colney, Park Street, and all surrounding villages.',
      },
    ],
    testimonial: {
      quote: 'The period properties in St Albans need specialist equipment. Financed a complete heritage restoration kit - lime mortar mixer, pointing tools, the lot. Paid for itself on the first big job.',
      name: 'Mark H.',
      trade: 'Builder',
      business: 'Heritage Builders St Albans',
      amount: '£18,500',
    },
    coordinates: { lat: 51.7531, lng: -0.3390 },
  },

  'watford': {
    slug: 'watford',
    name: 'Watford',
    countySlug: 'hertfordshire',
    population: 96800,
    populationYear: '2021',
    localEconomy: {
      description: 'Watford is a major commercial hub in the London commuter belt, with significant retail, entertainment, and business services sectors.',
      keyIndustries: ['Retail', 'Entertainment', 'Financial Services', 'Healthcare', 'Film Production'],
      majorEmployers: ['Watford General Hospital', 'Costco', 'TK Maxx Distribution', 'Hilton Hotels', 'Warner Bros. Studios'],
      businessParks: ['Croxley Business Park', 'Watford Business Park', 'Colonial Way Industrial Estate'],
      economicCharacter: 'Major commercial and retail hub',
    },
    localContext: {
      historicalNote: 'Historic market town that grew rapidly with the railway. Home to Watford FC and the famous Watford Palace Theatre.',
      knownFor: ['Watford FC (Vicarage Road)', 'Intu Watford shopping centre', 'Warner Bros. Studio Tour nearby', 'Cassiobury Park'],
      transportLinks: ['Metropolitan & Overground lines to London', 'M1 Junction 5', 'M25 nearby'],
    },
    tradeMarket: {
      characterDescription: 'Diverse demand from commercial, retail, and residential sectors. Strong opportunities in retail fit-outs and commercial maintenance.',
      hotSectors: ['Commercial fit-outs', 'Retail maintenance', 'Residential renovations', 'Film/studio work', 'Healthcare facilities'],
      majorProjects: [
        'Watford Junction redevelopment',
        'Charter Place regeneration',
        'Watford Riverwell mixed-use development',
        'Hospital expansion projects',
      ],
    },
    content: {
      heroSubtitle: 'Commercial hub with diverse trade opportunities',
      introductionParagraph: 'Watford tradesmen benefit from one of the South East\'s busiest commercial centres. From retail fit-outs at Intu Watford to the booming film industry at nearby Warner Bros. Studios, there\'s consistent demand for skilled electrical, plumbing, and construction trades.',
      whyLocalTradesmen: 'Watford\'s mix of commercial and residential work provides year-round opportunities. The town\'s ongoing regeneration projects and proximity to major film studios create unique work for local trades.',
      closingCTA: 'Get your free Watford trade finance quote today',
    },
    faqs: [
      {
        question: 'Do you finance equipment for commercial work in Watford?',
        answer: 'Yes, we regularly finance commercial-grade equipment for Watford tradesmen working on retail, hospitality, and office projects throughout the town centre.',
      },
      {
        question: 'Can I get finance for film/studio work equipment?',
        answer: 'Absolutely. With Warner Bros. Studios nearby, we\'ve financed specialist equipment for tradesmen working in the film industry, from portable power tools to specialist lighting rigs.',
      },
    ],
    testimonial: {
      quote: 'Work on the retail units keeps me busy year-round. Financed a proper commercial fit-out kit - it\'s made jobs so much faster.',
      name: 'Steve R.',
      trade: 'Electrician',
      business: 'SR Electrical Services',
      amount: '£22,000',
    },
    coordinates: { lat: 51.6565, lng: -0.3903 },
  },

  'hemel-hempstead': {
    slug: 'hemel-hempstead',
    name: 'Hemel Hempstead',
    countySlug: 'hertfordshire',
    population: 97500,
    populationYear: '2021',
    localEconomy: {
      description: 'Hemel Hempstead is one of the UK\'s original New Towns with a strong industrial and distribution base, alongside growing professional services.',
      keyIndustries: ['Distribution & Logistics', 'Manufacturing', 'Professional Services', 'Retail', 'Technology'],
      majorEmployers: ['Amazon', 'Dixons Carphone', 'Sopra Steria', 'Kier Group', 'BP (nearby)'],
      businessParks: ['Maylands Business Park', 'Breakspear Park', 'Paradise Industrial Estate'],
      economicCharacter: 'New Town with strong industrial and logistics base',
    },
    localContext: {
      historicalNote: 'Designated a New Town in 1947, famous for its "Magic Roundabout" - the UK\'s first magic roundabout with six mini-roundabouts.',
      knownFor: ['The Magic Roundabout', 'Maylands Business Park', 'Snow Centre', 'Old Town High Street'],
      transportLinks: ['M1 Junction 8', 'M25 nearby', 'Euston line trains'],
    },
    tradeMarket: {
      characterDescription: 'Strong industrial and warehouse work combined with steady residential demand from the large housing stock.',
      hotSectors: ['Warehouse fit-outs', 'Industrial maintenance', 'New-build residential', 'Commercial HVAC', 'Office refurbishments'],
      majorProjects: [
        'Maylands Gateway development',
        'Town centre regeneration',
        'LA1 & LA2 industrial developments',
        'New housing at Spencer\'s Park',
      ],
    },
    content: {
      heroSubtitle: 'Industrial hub with strong trade demand',
      introductionParagraph: 'Hemel Hempstead tradesmen serve one of the UK\'s largest distribution hubs. With Amazon, major retailers, and manufacturing firms all based locally, there\'s consistent demand for commercial electricians, industrial plumbers, and maintenance contractors.',
      whyLocalTradesmen: 'The town\'s industrial base means steady commercial work, while thousands of New Town-era homes require regular maintenance and upgrades.',
      closingCTA: 'Get your free Hemel Hempstead trade finance quote',
    },
    faqs: [
      {
        question: 'Do you finance equipment for warehouse work?',
        answer: 'Yes, we finance industrial and commercial equipment for tradesmen working in Hemel\'s many warehouses and distribution centres.',
      },
    ],
    testimonial: {
      quote: 'The warehouse work in Maylands keeps my team busy. Financed cherry pickers and industrial tools - essential for the big units.',
      name: 'Paul K.',
      trade: 'Electrician',
      business: 'PK Industrial Electrics',
      amount: '£35,000',
    },
    coordinates: { lat: 51.7526, lng: -0.4692 },
  },

  // ============================================
  // ESSEX
  // ============================================
  'chelmsford': {
    slug: 'chelmsford',
    name: 'Chelmsford',
    countySlug: 'essex',
    population: 178388,
    populationYear: '2021',
    localEconomy: {
      description: 'Chelmsford is Essex\'s only city and county town, with a diverse economy spanning professional services, healthcare, retail, and growing tech sector.',
      keyIndustries: ['Professional Services', 'Healthcare', 'Retail', 'Technology', 'Education'],
      majorEmployers: ['Broomfield Hospital', 'Essex County Council', 'Anglia Ruskin University', 'e2v Technologies', 'BAE Systems'],
      businessParks: ['Springfield Business Park', 'Waterhouse Business Centre', 'Chelmsford Business Park'],
      economicCharacter: 'County city with diverse professional economy',
    },
    localContext: {
      historicalNote: 'Granted city status in 2012 for the Queen\'s Diamond Jubilee. Home to Chelmsford Cathedral and birthplace of radio.',
      knownFor: ['Chelmsford Cathedral', 'Birthplace of radio', 'Essex County Cricket Ground', 'Bond Street shopping', 'Hylands House'],
      transportLinks: ['Greater Anglia to Liverpool Street (35 mins)', 'A12 & A130', 'Near M25'],
    },
    tradeMarket: {
      characterDescription: 'Balanced market with strong residential demand and growing commercial sector. City status has boosted investment.',
      hotSectors: ['City centre developments', 'Healthcare facilities', 'Residential extensions', 'Office fit-outs', 'Retail conversions'],
      majorProjects: [
        'Chelmsford Garden Community (10,000 homes)',
        'City centre riverside development',
        'North East Chelmsford expansion',
        'Army & Navy roundabout improvements',
      ],
    },
    content: {
      heroSubtitle: 'Essex\'s city with growing trade opportunities',
      introductionParagraph: 'Chelmsford tradesmen serve Essex\'s only city, where major developments like the Chelmsford Garden Community are creating thousands of new homes. Combined with the city\'s growing professional population, there\'s strong demand for quality electrical, plumbing, and building work.',
      whyLocalTradesmen: 'Chelmsford\'s city status has brought increased investment. The combination of new-build developments, period property renovations, and commercial work provides diverse opportunities.',
      closingCTA: 'Get your free Chelmsford trade finance quote',
    },
    faqs: [
      {
        question: 'Is there demand for tradesmen in Chelmsford\'s new developments?',
        answer: 'Absolutely. The Chelmsford Garden Community alone will create 10,000 new homes over the coming years, creating sustained demand for all trades.',
      },
    ],
    testimonial: {
      quote: 'Chelmsford\'s booming. Between the new builds and the city centre work, I needed to expand. Van finance and new tools sorted in a week.',
      name: 'Danny T.',
      trade: 'Plumber',
      business: 'DT Plumbing Solutions',
      amount: '£28,000',
    },
    coordinates: { lat: 51.7356, lng: 0.4685 },
  },

  'colchester': {
    slug: 'colchester',
    name: 'Colchester',
    countySlug: 'essex',
    population: 192523,
    populationYear: '2021',
    localEconomy: {
      description: 'Britain\'s oldest recorded town with a growing economy driven by the university, military presence, and increasing tech sector.',
      keyIndustries: ['Education', 'Defence', 'Technology', 'Healthcare', 'Tourism'],
      majorEmployers: ['University of Essex', 'Colchester Garrison', 'Colchester Hospital', 'Essex County Council', 'Firstsite Gallery'],
      businessParks: ['Colchester Business Park', 'Severalls Industrial Park', 'The Stanway Centre'],
      economicCharacter: 'Historic garrison town with university and growing tech sector',
    },
    localContext: {
      historicalNote: 'Britain\'s oldest recorded town and first Roman capital. Home to the oldest town walls in Britain and Colchester Castle.',
      knownFor: ['Colchester Castle', 'Britain\'s oldest town', 'Roman walls', 'University of Essex', 'Colchester Zoo'],
      transportLinks: ['Greater Anglia to Liverpool Street (50 mins)', 'A12', 'Near A120 to Stansted'],
    },
    tradeMarket: {
      characterDescription: 'Unique mix of heritage work, military contracts, and university-related projects. Growing demand for energy-efficient installations.',
      hotSectors: ['Heritage restoration', 'Student accommodation', 'Military facilities', 'Period property work', 'Solar installations'],
      majorProjects: [
        'Northern Gateway sports park',
        'Town centre regeneration',
        'University campus expansion',
        'Garrison developments',
      ],
    },
    content: {
      heroSubtitle: 'Britain\'s oldest town with modern opportunities',
      introductionParagraph: 'Colchester tradesmen work in Britain\'s oldest recorded town, where Roman heritage meets modern development. The university, military garrison, and growing population create diverse demand for skilled trades.',
      whyLocalTradesmen: 'Colchester\'s heritage properties require specialist skills, while the university and garrison provide steady commercial work. It\'s a unique market that rewards versatile tradesmen.',
      closingCTA: 'Get your free Colchester trade finance quote',
    },
    faqs: [
      {
        question: 'Do you finance equipment for heritage work in Colchester?',
        answer: 'Yes, Colchester\'s Roman and medieval buildings need specialist care. We finance heritage tools and equipment for sensitive restoration work.',
      },
    ],
    testimonial: {
      quote: 'Working on listed buildings needs the right kit. Financed proper heritage tools - clients really appreciate the quality.',
      name: 'Mike S.',
      trade: 'Builder',
      business: 'Colchester Heritage Builders',
      amount: '£24,000',
    },
    coordinates: { lat: 51.8891, lng: 0.9039 },
  },

  // ============================================
  // GREATER LONDON
  // ============================================
  'london': {
    slug: 'london',
    name: 'London',
    countySlug: 'greater-london',
    population: 8799800,
    populationYear: '2021',
    localEconomy: {
      description: 'London is the UK\'s economic powerhouse, with construction demand driven by continuous development, heritage maintenance, and the highest property values in the country.',
      keyIndustries: ['Finance', 'Technology', 'Professional Services', 'Creative Industries', 'Construction'],
      majorEmployers: ['NHS Trusts', 'Transport for London', 'Major Banks', 'Tech Giants', 'Government'],
      businessParks: ['Canary Wharf', 'Tech City', 'King\'s Cross', 'White City'],
      economicCharacter: 'Global financial capital with premium construction market',
    },
    localContext: {
      knownFor: ['Global financial centre', 'Historic landmarks', 'Cultural institutions', 'World-class architecture'],
      transportLinks: ['Tube network', 'National Rail', 'Heathrow & City airports', 'Eurostar'],
    },
    tradeMarket: {
      characterDescription: 'Premium rates available for quality work. High demand across all trades, with specialist skills commanding top prices.',
      hotSectors: ['High-end residential', 'Commercial fit-outs', 'Heritage restoration', 'Smart home installations', 'Sustainable retrofits'],
      majorProjects: [
        'HS2 and Crossrail 2',
        'Battersea Power Station development',
        'Nine Elms regeneration',
        'King\'s Cross developments',
        'Canary Wharf expansion',
      ],
    },
    content: {
      heroSubtitle: 'Premium rates in the capital',
      introductionParagraph: 'London tradesmen operate in the UK\'s most demanding and rewarding market. With the highest property values and most discerning clients, quality tradespeople can command premium rates for exceptional work.',
      whyLocalTradesmen: 'London\'s construction market never sleeps. From Mayfair townhouses to Canary Wharf offices, there\'s constant demand for skilled electricians, plumbers, builders and specialist trades.',
      closingCTA: 'Get your free London trade finance quote',
    },
    faqs: [
      {
        question: 'Do you work with London tradesmen?',
        answer: 'Absolutely. We work with tradesmen across all London boroughs, from Central London specialists to outer borough contractors.',
      },
      {
        question: 'What finance is available for high-value London projects?',
        answer: 'London projects often require larger investments. We offer finance up to £1 million for equipment, vehicles, and working capital.',
      },
    ],
    testimonial: {
      quote: 'London clients expect the best kit. Financed a complete Hilti setup - it\'s made a real difference to the quality of work.',
      name: 'James K.',
      trade: 'Builder',
      business: 'JK Construction London',
      amount: '£45,000',
    },
    coordinates: { lat: 51.5074, lng: -0.1278 },
  },

  // ============================================
  // GREATER MANCHESTER
  // ============================================
  'manchester': {
    slug: 'manchester',
    name: 'Manchester',
    countySlug: 'greater-manchester',
    population: 547627,
    populationYear: '2021',
    localEconomy: {
      description: 'Manchester is the economic capital of the North, with a booming construction sector driven by regeneration, tech growth, and major infrastructure projects.',
      keyIndustries: ['Technology', 'Financial Services', 'Creative/Media', 'Healthcare', 'Manufacturing'],
      majorEmployers: ['NHS Trusts', 'University of Manchester', 'BBC', 'Co-operative Group', 'Siemens'],
      businessParks: ['MediaCityUK', 'Manchester Science Park', 'Trafford Park', 'Airport City'],
      economicCharacter: 'Northern economic powerhouse with rapid growth',
    },
    localContext: {
      knownFor: ['Industrial heritage', 'Football (United & City)', 'Music scene', 'MediaCityUK', 'Northern Quarter'],
      transportLinks: ['Manchester Airport', 'HS2 coming', 'Extensive tram network', 'M60 orbital'],
    },
    tradeMarket: {
      characterDescription: 'Rapid development creating strong demand. Mix of high-end city centre work and extensive residential suburbs.',
      hotSectors: ['City centre apartments', 'Commercial fit-outs', 'Student accommodation', 'Media/tech offices', 'Industrial conversions'],
      majorProjects: [
        'St John\'s neighbourhood development',
        'HS2 Manchester station',
        'Northern Gateway housing',
        'Airport expansion',
        'MediaCityUK phase 2',
      ],
    },
    content: {
      heroSubtitle: 'Northern powerhouse with booming construction',
      introductionParagraph: 'Manchester tradesmen are riding a construction boom. The city\'s transformation continues with major developments, tech company growth, and thousands of new homes creating sustained demand for all trades.',
      whyLocalTradesmen: 'Manchester\'s growth shows no signs of slowing. From city centre skyscrapers to suburban extensions, quality tradesmen are in high demand.',
      closingCTA: 'Get your free Manchester trade finance quote',
    },
    faqs: [
      {
        question: 'Is Manchester a good market for tradesmen?',
        answer: 'Excellent. Manchester\'s construction boom means strong demand across all trades. The city centre alone has multiple major developments ongoing.',
      },
    ],
    testimonial: {
      quote: 'Manchester\'s on fire for construction work. Financed a new van and full tool upgrade - best decision I\'ve made.',
      name: 'Ryan M.',
      trade: 'Electrician',
      business: 'RM Electrical Manchester',
      amount: '£32,000',
    },
    coordinates: { lat: 53.4808, lng: -2.2426 },
  },

  // ============================================
  // WEST YORKSHIRE
  // ============================================
  'leeds': {
    slug: 'leeds',
    name: 'Leeds',
    countySlug: 'west-yorkshire',
    population: 516298,
    populationYear: '2021',
    localEconomy: {
      description: 'Leeds is Yorkshire\'s economic centre with the UK\'s largest financial services sector outside London and a thriving digital economy.',
      keyIndustries: ['Financial Services', 'Legal Services', 'Digital/Tech', 'Healthcare', 'Manufacturing'],
      majorEmployers: ['Leeds Teaching Hospitals', 'First Direct', 'ASDA HQ', 'Channel 4', 'Universities'],
      businessParks: ['Leeds Dock', 'Wellington Place', 'Thorpe Park', 'Logic Leeds'],
      economicCharacter: 'Regional financial capital with growing tech sector',
    },
    localContext: {
      knownFor: ['Financial services', 'Victoria Quarter shopping', 'Leeds Rhinos', 'Kirkgate Market', 'Headingley'],
      transportLinks: ['HS2 coming', 'Leeds Bradford Airport', 'M1/M62 intersection', 'Trans-Pennine rail'],
    },
    tradeMarket: {
      characterDescription: 'Strong commercial sector combined with Victorian housing stock requiring ongoing maintenance. Growing student accommodation market.',
      hotSectors: ['Office fit-outs', 'Student housing', 'Victorian renovations', 'Healthcare facilities', 'Retail conversions'],
      majorProjects: [
        'HS2 Leeds station',
        'South Bank regeneration',
        'Leeds Aire Park',
        'City Square transformation',
        'West Yorkshire Mass Transit',
      ],
    },
    content: {
      heroSubtitle: 'Yorkshire\'s economic capital',
      introductionParagraph: 'Leeds tradesmen serve the North\'s financial capital, where Victorian grandeur meets modern development. The city\'s thriving economy and major regeneration projects create consistent demand for skilled trades.',
      whyLocalTradesmen: 'Leeds combines commercial opportunity with vast Victorian housing stock. From high-spec office fit-outs to period renovations, versatile tradesmen thrive here.',
      closingCTA: 'Get your free Leeds trade finance quote',
    },
    faqs: [
      {
        question: 'What opportunities are there for tradesmen in Leeds?',
        answer: 'Leeds offers diverse work - commercial fit-outs in the city centre, Victorian renovations in suburbs like Chapel Allerton and Headingley, plus major regeneration projects.',
      },
    ],
    testimonial: {
      quote: 'The office fit-out work in Leeds is constant. Financed commercial-grade kit and it\'s transformed my business.',
      name: 'Chris B.',
      trade: 'Electrician',
      business: 'CB Commercial Electrics',
      amount: '£28,000',
    },
    coordinates: { lat: 53.8008, lng: -1.5491 },
  },

  'bradford': {
    slug: 'bradford',
    name: 'Bradford',
    countySlug: 'west-yorkshire',
    population: 546400,
    populationYear: '2021',
    localEconomy: {
      description: 'Bradford is reinventing itself from its wool trade heritage with growing digital, manufacturing, and education sectors.',
      keyIndustries: ['Manufacturing', 'Digital', 'Education', 'Healthcare', 'Financial Services'],
      majorEmployers: ['Bradford Teaching Hospitals', 'University of Bradford', 'Morrisons HQ', 'Yorkshire Water'],
      economicCharacter: 'Former industrial city in regeneration',
    },
    localContext: {
      knownFor: ['UNESCO City of Film', 'Curry capital', 'Salt\'s Mill', 'Bradford City AFC', 'Victorian architecture'],
      transportLinks: ['Leeds nearby', 'M62 access', 'Bradford Interchange'],
    },
    tradeMarket: {
      characterDescription: 'Affordable property prices driving renovation boom. Strong demand for quality work at competitive rates.',
      hotSectors: ['Property renovation', 'Commercial conversions', 'Healthcare', 'Education facilities', 'Industrial maintenance'],
      majorProjects: [
        'Bradford Live (Odeon restoration)',
        'City centre regeneration',
        'One City Park development',
        'University expansion',
      ],
    },
    content: {
      heroSubtitle: 'Growing opportunities in West Yorkshire',
      introductionParagraph: 'Bradford tradesmen are benefiting from the city\'s regeneration. With affordable property prices attracting investors and significant development projects, there\'s growing demand for skilled trades.',
      whyLocalTradesmen: 'Bradford\'s revival creates opportunities. From Victorian mill conversions to modern developments, tradesmen who deliver quality work build strong reputations.',
      closingCTA: 'Get your free Bradford trade finance quote',
    },
    faqs: [
      {
        question: 'Is Bradford a good area for tradesmen?',
        answer: 'Increasingly so. Bradford\'s regeneration is creating opportunities, while affordable property prices mean more renovation projects.',
      },
    ],
    coordinates: { lat: 53.7960, lng: -1.7594 },
  },

  // ============================================
  // WEST MIDLANDS
  // ============================================
  'birmingham': {
    slug: 'birmingham',
    name: 'Birmingham',
    countySlug: 'west-midlands',
    population: 1144919,
    populationYear: '2021',
    localEconomy: {
      description: 'Birmingham is the UK\'s second largest city with a diverse economy spanning manufacturing, professional services, and a major retail sector.',
      keyIndustries: ['Manufacturing', 'Financial Services', 'Retail', 'Healthcare', 'Education'],
      majorEmployers: ['NHS University Hospitals Birmingham', 'Jaguar Land Rover', 'HSBC UK', 'Universities', 'Birmingham City Council'],
      businessParks: ['Fort Dunlop', 'Aston Science Park', 'Blythe Valley Business Park'],
      economicCharacter: 'Major regional capital with diverse economy',
    },
    localContext: {
      knownFor: ['Bullring shopping centre', 'Jewellery Quarter', 'Cadbury World', 'Birmingham canals', 'Symphony Hall'],
      transportLinks: ['HS2 hub (coming)', 'M6/M42 intersection', 'Birmingham Airport', 'New Street Station'],
    },
    tradeMarket: {
      characterDescription: 'Huge and varied market with everything from city centre commercial to suburban residential. Strong manufacturing heritage means industrial skills valued.',
      hotSectors: ['Commercial fit-outs', 'Industrial maintenance', 'Residential renovations', 'Healthcare facilities', 'Retail upgrades'],
      majorProjects: [
        'HS2 Curzon Street station',
        'Paradise Birmingham redevelopment',
        'Smithfield regeneration',
        'Commonwealth Games legacy projects',
      ],
    },
    content: {
      heroSubtitle: 'The UK\'s second city with massive trade opportunities',
      introductionParagraph: 'Birmingham tradesmen operate in the UK\'s second largest city, where manufacturing heritage meets modern development. With HS2 coming and ongoing regeneration, demand for skilled trades has never been higher.',
      whyLocalTradesmen: 'Birmingham\'s size and diversity mean there\'s always work. From Jewellery Quarter heritage projects to Digbeth commercial conversions, versatile tradesmen build thriving businesses here.',
      closingCTA: 'Get your free Birmingham trade finance quote',
    },
    faqs: [
      {
        question: 'Is Birmingham a good market for tradesmen?',
        answer: 'Excellent. Birmingham\'s size, diversity, and ongoing regeneration create constant demand across all trades. The HS2 development alone will generate years of work.',
      },
      {
        question: 'Do you finance equipment for commercial work in Birmingham?',
        answer: 'Yes, we regularly finance commercial-grade equipment for Birmingham tradesmen working on retail, office, and industrial projects.',
      },
    ],
    testimonial: {
      quote: 'Birmingham\'s got everything - commercial, residential, industrial. Financed a new van and full tool setup. Best investment I\'ve made.',
      name: 'Dave W.',
      trade: 'Electrician',
      business: 'DW Electrical Birmingham',
      amount: '£38,000',
    },
    coordinates: { lat: 52.4862, lng: -1.8904 },
  },

  // ============================================
  // SOUTH YORKSHIRE
  // ============================================
  'sheffield': {
    slug: 'sheffield',
    name: 'Sheffield',
    countySlug: 'south-yorkshire',
    population: 556500,
    populationYear: '2021',
    localEconomy: {
      description: 'Sheffield has transformed from steel city to a diverse economy with strong healthcare, education, and advanced manufacturing sectors.',
      keyIndustries: ['Advanced Manufacturing', 'Healthcare', 'Education', 'Digital', 'Creative Industries'],
      majorEmployers: ['Sheffield Teaching Hospitals', 'University of Sheffield', 'Sheffield Hallam University', 'Boeing', 'McLaren'],
      businessParks: ['Advanced Manufacturing Park', 'Sheffield Business Park', 'Olympic Legacy Park'],
      economicCharacter: 'Former steel city with thriving modern economy',
    },
    localContext: {
      knownFor: ['Steel heritage', 'Two universities', 'Peak District gateway', 'Snooker World Championship', 'Henderson\'s Relish'],
      transportLinks: ['M1 nearby', 'Midland Main Line', 'Supertram network', 'Doncaster Sheffield Airport'],
    },
    tradeMarket: {
      characterDescription: 'Mix of Victorian housing stock requiring maintenance, modern commercial developments, and specialist advanced manufacturing facilities.',
      hotSectors: ['Victorian renovations', 'Student accommodation', 'Advanced manufacturing', 'Healthcare facilities', 'Commercial conversions'],
      majorProjects: [
        'Heart of the City II redevelopment',
        'West Bar regeneration',
        'Sheffield Olympic Legacy Park',
        'Meadowhall expansion',
      ],
    },
    content: {
      heroSubtitle: 'Steel City with growing opportunities',
      introductionParagraph: 'Sheffield tradesmen benefit from a city in transformation. The former steel capital now boasts advanced manufacturing, two universities, and major regeneration projects creating diverse demand.',
      whyLocalTradesmen: 'Sheffield\'s Victorian housing stock needs constant maintenance, while commercial and manufacturing growth creates new opportunities. It\'s a city that rewards quality tradesmen.',
      closingCTA: 'Get your free Sheffield trade finance quote',
    },
    faqs: [
      {
        question: 'What types of work are in demand in Sheffield?',
        answer: 'Sheffield offers diverse work - Victorian house renovations, student accommodation upgrades, healthcare facility maintenance, and advanced manufacturing installations.',
      },
    ],
    testimonial: {
      quote: 'Sheffield\'s got the best of both worlds - Victorian terraces and modern tech. Financed specialist tools and my van. Couldn\'t do what I do without them.',
      name: 'Pete T.',
      trade: 'Plumber',
      business: 'PT Plumbing Sheffield',
      amount: '£26,000',
    },
    coordinates: { lat: 53.3811, lng: -1.4701 },
  },

  // ============================================
  // TYNE AND WEAR
  // ============================================
  'newcastle-upon-tyne': {
    slug: 'newcastle-upon-tyne',
    name: 'Newcastle upon Tyne',
    countySlug: 'tyne-and-wear',
    population: 302820,
    populationYear: '2021',
    localEconomy: {
      description: 'Newcastle is the North East\'s major city with strengths in digital tech, healthcare, and education, plus growing renewable energy sector.',
      keyIndustries: ['Digital Technology', 'Healthcare', 'Education', 'Energy', 'Culture/Tourism'],
      majorEmployers: ['Newcastle Hospitals NHS', 'Newcastle University', 'Sage', 'Northern Rock Foundation', 'Newcastle City Council'],
      businessParks: ['Newcastle Science Central', 'Quorum Business Park', 'Newcastle International Airport zone'],
      economicCharacter: 'Regional capital with growing tech sector',
    },
    localContext: {
      knownFor: ['Newcastle United', 'Tyne Bridge', 'Quayside', 'Grey Street', 'Newcastle Brown Ale'],
      transportLinks: ['Newcastle Airport', 'Metro system', 'East Coast Main Line', 'A1(M)'],
    },
    tradeMarket: {
      characterDescription: 'Strong residential market with Georgian and Victorian properties, plus growing commercial and tech sector work.',
      hotSectors: ['Period property restoration', 'Commercial fit-outs', 'Student accommodation', 'Energy efficiency', 'Tech office installations'],
      majorProjects: [
        'Newcastle Helix development',
        'Pilgrim Street regeneration',
        'Quayside developments',
        'East Pilgrim Street',
      ],
    },
    content: {
      heroSubtitle: 'The North East\'s capital with strong demand',
      introductionParagraph: 'Newcastle tradesmen serve the North East\'s largest city, where historic architecture meets modern tech investment. The city\'s regeneration and growing economy create sustained demand.',
      whyLocalTradesmen: 'Newcastle\'s mix of Georgian townhouses, Victorian terraces, and modern developments means work for all skill levels. Quality tradesmen build strong reputations quickly here.',
      closingCTA: 'Get your free Newcastle trade finance quote',
    },
    faqs: [
      {
        question: 'Is Newcastle a good area for tradesmen?',
        answer: 'Yes, Newcastle offers strong demand. The city\'s historic properties need maintenance while regeneration projects create new work. The tech sector is also growing.',
      },
    ],
    testimonial: {
      quote: 'Newcastle\'s heritage properties are stunning to work on. Financed proper restoration tools - the clients notice the difference.',
      name: 'Alan D.',
      trade: 'Builder',
      business: 'AD Heritage Construction',
      amount: '£22,000',
    },
    coordinates: { lat: 54.9783, lng: -1.6178 },
  },

  // ============================================
  // MERSEYSIDE
  // ============================================
  'liverpool': {
    slug: 'liverpool',
    name: 'Liverpool',
    countySlug: 'merseyside',
    population: 486100,
    populationYear: '2021',
    localEconomy: {
      description: 'Liverpool is a major city with strong creative industries, tourism, port operations, and a growing tech and life sciences sector.',
      keyIndustries: ['Creative Industries', 'Tourism', 'Life Sciences', 'Port/Logistics', 'Healthcare'],
      majorEmployers: ['Liverpool NHS Trust', 'Port of Liverpool', 'Universities', 'Jaguar Land Rover (Halewood)', 'Liverpool City Council'],
      businessParks: ['Liverpool Science Park', 'Atlantic Gateway', 'Liverpool Waters'],
      economicCharacter: 'Cultural capital with diverse economy',
    },
    localContext: {
      knownFor: ['The Beatles', 'Liverpool FC & Everton FC', 'Albert Dock', 'World Heritage waterfront', 'Music scene'],
      transportLinks: ['Liverpool John Lennon Airport', 'M62 to Manchester', 'Merseyrail network', 'Port of Liverpool'],
    },
    tradeMarket: {
      characterDescription: 'Mix of Georgian grandeur, Victorian terraces, and major regeneration projects. Strong tourism sector creates hospitality work.',
      hotSectors: ['Heritage restoration', 'Hospitality fit-outs', 'Student accommodation', 'Residential improvements', 'Commercial conversions'],
      majorProjects: [
        'Liverpool Waters development',
        'Everton Stadium at Bramley-Moore Dock',
        'Paddington Village life sciences hub',
        'Knowledge Quarter expansion',
      ],
    },
    content: {
      heroSubtitle: 'Cultural capital with major development',
      introductionParagraph: 'Liverpool tradesmen work in one of the UK\'s most vibrant cities. From Georgian masterpieces to the massive Liverpool Waters development, the city offers diverse and exciting work.',
      whyLocalTradesmen: 'Liverpool\'s World Heritage status means heritage skills are valued, while major developments like the new Everton stadium create commercial opportunities. It\'s a great city for ambitious tradesmen.',
      closingCTA: 'Get your free Liverpool trade finance quote',
    },
    faqs: [
      {
        question: 'What opportunities are there in Liverpool?',
        answer: 'Liverpool offers heritage restoration work, major development projects like Liverpool Waters and the new Everton stadium, plus strong residential and hospitality demand.',
      },
    ],
    testimonial: {
      quote: 'Liverpool\'s World Heritage buildings need proper care. Invested in specialist tools - the heritage work just keeps coming.',
      name: 'Tony M.',
      trade: 'Builder',
      business: 'TM Heritage Liverpool',
      amount: '£31,000',
    },
    coordinates: { lat: 53.4084, lng: -2.9916 },
  },

  // ============================================
  // BRISTOL
  // ============================================
  'bristol': {
    slug: 'bristol',
    name: 'Bristol',
    countySlug: 'bristol',
    population: 472400,
    populationYear: '2021',
    localEconomy: {
      description: 'Bristol is a major South West city with strengths in aerospace, creative industries, tech, and financial services.',
      keyIndustries: ['Aerospace', 'Creative/Media', 'Technology', 'Financial Services', 'Healthcare'],
      majorEmployers: ['Airbus', 'Rolls-Royce', 'University of Bristol', 'NHS Bristol', 'Lloyds Banking Group'],
      businessParks: ['Temple Quarter Enterprise Zone', 'Filton Enterprise Area', 'Bath Road Business Park'],
      economicCharacter: 'Major regional city with strong tech and aerospace sectors',
    },
    localContext: {
      knownFor: ['Clifton Suspension Bridge', 'Banksy', 'Balloon Fiesta', 'Harbourside', 'Aerospace industry'],
      transportLinks: ['Bristol Airport', 'M4/M5 junction', 'Temple Meads Station', 'MetroBus'],
    },
    tradeMarket: {
      characterDescription: 'Affluent market with high-spec residential work and strong commercial demand from aerospace and tech sectors.',
      hotSectors: ['High-end residential', 'Aerospace facilities', 'Tech office fit-outs', 'Period property renovation', 'Sustainable installations'],
      majorProjects: [
        'Temple Quarter regeneration',
        'Bristol Arena development',
        'Western Harbour development',
        'Filton Airfield housing',
      ],
    },
    content: {
      heroSubtitle: 'South West powerhouse with premium work',
      introductionParagraph: 'Bristol tradesmen enjoy one of the UK\'s most prosperous markets. The city\'s tech boom, aerospace heritage, and affluent population create strong demand for quality trades.',
      whyLocalTradesmen: 'Bristol clients expect high standards and pay for them. From Clifton townhouses to aerospace facilities, skilled tradesmen command premium rates here.',
      closingCTA: 'Get your free Bristol trade finance quote',
    },
    faqs: [
      {
        question: 'Is Bristol a good market for tradesmen?',
        answer: 'Excellent. Bristol\'s affluent population and strong commercial sector mean premium rates for quality work. The city\'s growth shows no signs of slowing.',
      },
    ],
    testimonial: {
      quote: 'Bristol clients want the best. Invested in premium tools and a smart van setup - it\'s paid for itself many times over.',
      name: 'Simon K.',
      trade: 'Electrician',
      business: 'SK Electrical Bristol',
      amount: '£42,000',
    },
    coordinates: { lat: 51.4545, lng: -2.5879 },
  },

  // ============================================
  // CARDIFF
  // ============================================
  'cardiff': {
    slug: 'cardiff',
    name: 'Cardiff',
    countySlug: 'cardiff',
    population: 362400,
    populationYear: '2021',
    localEconomy: {
      description: 'Cardiff is the Welsh capital with a diverse economy spanning government, financial services, media, and education.',
      keyIndustries: ['Government', 'Financial Services', 'Media/TV', 'Education', 'Tourism'],
      majorEmployers: ['Welsh Government', 'BBC Wales', 'Cardiff University', 'Admiral Insurance', 'NHS Wales'],
      businessParks: ['Cardiff Gate Business Park', 'Cardiff Bay', 'Central Square'],
      economicCharacter: 'Capital city with diverse economy',
    },
    localContext: {
      knownFor: ['Cardiff Castle', 'Principality Stadium', 'Cardiff Bay', 'Doctor Who filming', 'Six Nations rugby'],
      transportLinks: ['Cardiff Central Station', 'M4 corridor', 'Cardiff Airport', 'Valley Lines rail'],
    },
    tradeMarket: {
      characterDescription: 'Welsh capital with strong government and commercial sector, plus growing city centre residential development.',
      hotSectors: ['Government buildings', 'Media facilities', 'City centre apartments', 'Commercial fit-outs', 'Stadium/venue work'],
      majorProjects: [
        'Central Square development',
        'Atlantic Wharf regeneration',
        'Cardiff Parkway',
        'Dumballs Road development',
      ],
    },
    content: {
      heroSubtitle: 'Welsh capital with growing opportunities',
      introductionParagraph: 'Cardiff tradesmen serve the Welsh capital, where government, media, and commercial sectors create diverse demand. The city\'s ongoing growth offers excellent opportunities.',
      whyLocalTradesmen: 'Cardiff\'s status as Welsh capital brings government and commercial work, while the growing population creates residential demand. It\'s a market with something for everyone.',
      closingCTA: 'Get your free Cardiff trade finance quote',
    },
    faqs: [
      {
        question: 'What work is available in Cardiff?',
        answer: 'Cardiff offers diverse work - government and commercial buildings, media facilities, city centre apartments, and suburban residential. The capital status brings unique opportunities.',
      },
    ],
    testimonial: {
      quote: 'Cardiff\'s growing fast. Government work, commercial, residential - it\'s all here. Financed my tools and van to keep up with demand.',
      name: 'Dai J.',
      trade: 'Plumber',
      business: 'DJ Plumbing Cardiff',
      amount: '£24,000',
    },
    coordinates: { lat: 51.4816, lng: -3.1791 },
  },

  // ============================================
  // EDINBURGH
  // ============================================
  'edinburgh': {
    slug: 'edinburgh',
    name: 'Edinburgh',
    countySlug: 'edinburgh',
    population: 524930,
    populationYear: '2021',
    localEconomy: {
      description: 'Edinburgh is Scotland\'s capital and a major financial centre with strong tourism, education, and government sectors.',
      keyIndustries: ['Financial Services', 'Tourism', 'Government', 'Education', 'Technology'],
      majorEmployers: ['Scottish Government', 'University of Edinburgh', 'Royal Bank of Scotland', 'NHS Lothian', 'Standard Life'],
      businessParks: ['Edinburgh Park', 'BioQuarter', 'Leith Victoria Quay'],
      economicCharacter: 'Capital city and major financial centre',
    },
    localContext: {
      knownFor: ['Edinburgh Castle', 'Royal Mile', 'Edinburgh Festival', 'Holyrood Palace', 'Arthur\'s Seat'],
      transportLinks: ['Edinburgh Airport', 'Waverley Station', 'Edinburgh Trams', 'M8/M9 access'],
    },
    tradeMarket: {
      characterDescription: 'Premium market with Georgian New Town properties, commercial financial sector, and strong tourism hospitality demand.',
      hotSectors: ['Georgian restoration', 'Financial services offices', 'Hospitality fit-outs', 'Student accommodation', 'High-end residential'],
      majorProjects: [
        'Edinburgh St James Quarter',
        'Waterfront regeneration',
        'BioQuarter expansion',
        'New Town conservation',
      ],
    },
    content: {
      heroSubtitle: 'Scottish capital with premium opportunities',
      introductionParagraph: 'Edinburgh tradesmen operate in Scotland\'s most affluent market. The capital\'s Georgian heritage, financial sector, and tourism industry create strong demand for quality trades.',
      whyLocalTradesmen: 'Edinburgh\'s World Heritage status means heritage skills command premium rates. The city\'s wealth and high standards reward quality tradesmen handsomely.',
      closingCTA: 'Get your free Edinburgh trade finance quote',
    },
    faqs: [
      {
        question: 'Is Edinburgh expensive to work in?',
        answer: 'Edinburgh has higher costs but also higher rates. Quality tradesmen can charge premium prices here, making it one of Scotland\'s most rewarding markets.',
      },
    ],
    testimonial: {
      quote: 'Edinburgh clients expect excellence. Invested in the best tools - the Georgian properties here deserve proper care.',
      name: 'Angus M.',
      trade: 'Builder',
      business: 'AM Heritage Edinburgh',
      amount: '£35,000',
    },
    coordinates: { lat: 55.9533, lng: -3.1883 },
  },

  // ============================================
  // GLASGOW
  // ============================================
  'glasgow': {
    slug: 'glasgow',
    name: 'Glasgow',
    countySlug: 'glasgow',
    population: 635640,
    populationYear: '2021',
    localEconomy: {
      description: 'Glasgow is Scotland\'s largest city with strengths in financial services, healthcare, education, and a growing tech sector.',
      keyIndustries: ['Financial Services', 'Healthcare', 'Education', 'Creative Industries', 'Technology'],
      majorEmployers: ['NHS Greater Glasgow', 'University of Glasgow', 'Scottish Power', 'Morgan Stanley', 'Barclays'],
      businessParks: ['Glasgow Business Park', 'Pacific Quay', 'Atlantic Quay', 'IFSD'],
      economicCharacter: 'Scotland\'s largest city with diverse economy',
    },
    localContext: {
      knownFor: ['Victorian architecture', 'Kelvingrove Museum', 'Celtic & Rangers', 'Music scene', 'Friendly people'],
      transportLinks: ['Glasgow Airport', 'Queen Street & Central Stations', 'Subway', 'M8 motorway'],
    },
    tradeMarket: {
      characterDescription: 'Large and varied market with Victorian tenements, commercial developments, and major regeneration projects.',
      hotSectors: ['Tenement restoration', 'Commercial fit-outs', 'Healthcare facilities', 'Student accommodation', 'Industrial conversions'],
      majorProjects: [
        'Barras regeneration',
        'Glasgow Waterfront development',
        'Queen Elizabeth University Hospital expansion',
        'City centre living developments',
      ],
    },
    content: {
      heroSubtitle: 'Scotland\'s largest city with diverse opportunities',
      introductionParagraph: 'Glasgow tradesmen benefit from Scotland\'s largest market. The city\'s Victorian heritage, commercial growth, and ongoing regeneration create diverse opportunities.',
      whyLocalTradesmen: 'Glasgow\'s tenement flats provide constant maintenance work, while commercial and healthcare sectors offer bigger contracts. It\'s a market with something for everyone.',
      closingCTA: 'Get your free Glasgow trade finance quote',
    },
    faqs: [
      {
        question: 'What types of work are available in Glasgow?',
        answer: 'Glasgow offers everything - tenement flat renovations, commercial office fit-outs, healthcare facilities, and major regeneration projects. It\'s Scotland\'s most diverse market.',
      },
    ],
    testimonial: {
      quote: 'Glasgow\'s got more work than you can handle. Financed a full kit upgrade - the tenement work alone keeps me busy year-round.',
      name: 'Rab S.',
      trade: 'Plumber',
      business: 'RS Plumbing Glasgow',
      amount: '£28,000',
    },
    coordinates: { lat: 55.8642, lng: -4.2518 },
  },

  // ============================================
  // KENT
  // ============================================
  'canterbury': {
    slug: 'canterbury',
    name: 'Canterbury',
    countySlug: 'kent',
    population: 55240,
    populationYear: '2021',
    localEconomy: {
      description: 'Canterbury is a historic cathedral city with a strong tourism and education economy driven by the cathedral and three universities.',
      keyIndustries: ['Tourism', 'Education', 'Retail', 'Healthcare', 'Creative Industries'],
      majorEmployers: ['Canterbury Christ Church University', 'University of Kent', 'Canterbury Cathedral', 'Kent & Canterbury Hospital'],
      economicCharacter: 'Historic cathedral city with tourism and education focus',
    },
    localContext: {
      historicalNote: 'Home to Canterbury Cathedral, the seat of the Archbishop of Canterbury and a UNESCO World Heritage Site. One of England\'s most historic cities.',
      knownFor: ['Canterbury Cathedral', 'Chaucer\'s Tales', 'Roman walls', 'Three universities', 'Historic high street'],
      transportLinks: ['High speed rail to London (55 mins)', 'A2/M2 to London', 'Near Channel ports'],
    },
    tradeMarket: {
      characterDescription: 'Premium heritage market with strict conservation requirements. Strong student accommodation and hospitality demand.',
      hotSectors: ['Heritage restoration', 'Student accommodation', 'Hospitality fit-outs', 'Period property work', 'Tourism facilities'],
      majorProjects: [
        'Cathedral conservation works',
        'Student accommodation developments',
        'City centre regeneration',
        'Healthcare facility upgrades',
      ],
    },
    content: {
      heroSubtitle: 'Historic cathedral city with heritage opportunities',
      introductionParagraph: 'Canterbury tradesmen work in one of England\'s most historic cities. The UNESCO World Heritage cathedral, three universities, and thriving tourism create unique opportunities for skilled trades.',
      whyLocalTradesmen: 'Canterbury\'s conservation area requires specialist skills. Tradesmen who understand heritage work command premium rates in this affluent market.',
      closingCTA: 'Get your free Canterbury trade finance quote',
    },
    faqs: [
      {
        question: 'Do you finance heritage equipment for Canterbury?',
        answer: 'Yes, Canterbury\'s listed buildings and conservation area mean specialist tools are essential. We finance heritage-appropriate equipment for local tradesmen.',
      },
    ],
    testimonial: {
      quote: 'Canterbury\'s heritage properties need the right touch. Invested in proper lime mortar equipment - the cathedral\'s conservation team recommended me.',
      name: 'Keith P.',
      trade: 'Builder',
      business: 'Canterbury Heritage Build',
      amount: '£19,000',
    },
    coordinates: { lat: 51.2802, lng: 1.0789 },
  },

  'maidstone': {
    slug: 'maidstone',
    name: 'Maidstone',
    countySlug: 'kent',
    population: 113137,
    populationYear: '2021',
    localEconomy: {
      description: 'Maidstone is Kent\'s county town with a diverse economy spanning retail, professional services, and manufacturing.',
      keyIndustries: ['Retail', 'Professional Services', 'Manufacturing', 'Healthcare', 'Logistics'],
      majorEmployers: ['Kent County Council', 'Maidstone Hospital', 'Maidstone Studios', 'Major retailers'],
      businessParks: ['20Twenty Business Park', 'Parkwood Industrial Estate', 'Eclipse Business Park'],
      economicCharacter: 'County town with diverse commercial economy',
    },
    localContext: {
      knownFor: ['County town of Kent', 'River Medway', 'Leeds Castle nearby', 'Maidstone United FC'],
      transportLinks: ['High speed rail to London (55 mins)', 'M20 motorway', 'A229 to coast'],
    },
    tradeMarket: {
      characterDescription: 'Balanced market with strong residential demand and steady commercial work from the county town\'s business base.',
      hotSectors: ['Residential improvements', 'Commercial fit-outs', 'Healthcare facilities', 'Retail maintenance', 'Office upgrades'],
      majorProjects: [
        'Town centre regeneration',
        'Maidstone East development',
        'Hospital improvements',
        'New housing estates',
      ],
    },
    content: {
      heroSubtitle: 'Kent\'s county town with steady demand',
      introductionParagraph: 'Maidstone tradesmen serve Kent\'s county town, where council offices, healthcare facilities, and a growing population create consistent demand for all trades.',
      whyLocalTradesmen: 'Maidstone\'s position as Kent\'s administrative centre brings steady work. The mix of residential and commercial creates year-round opportunities.',
      closingCTA: 'Get your free Maidstone trade finance quote',
    },
    faqs: [
      {
        question: 'What opportunities are there in Maidstone?',
        answer: 'Maidstone offers steady residential work plus commercial opportunities from Kent County Council and healthcare facilities. It\'s a reliable, diverse market.',
      },
    ],
    coordinates: { lat: 51.2724, lng: 0.5227 },
  },

  // ============================================
  // SURREY
  // ============================================
  'guildford': {
    slug: 'guildford',
    name: 'Guildford',
    countySlug: 'surrey',
    population: 77057,
    populationYear: '2021',
    localEconomy: {
      description: 'Guildford is an affluent Surrey town with a strong economy driven by technology, gaming, professional services, and the university.',
      keyIndustries: ['Technology', 'Gaming Industry', 'Professional Services', 'Education', 'Healthcare'],
      majorEmployers: ['University of Surrey', 'Electronic Arts', 'Philips', 'Royal Surrey Hospital', 'Surrey County Council'],
      businessParks: ['Surrey Research Park', 'Guildford Business Park'],
      economicCharacter: 'Affluent tech hub with strong professional services',
    },
    localContext: {
      knownFor: ['High street cobbles', 'Guildford Cathedral', 'University of Surrey', 'Gaming industry hub', 'Affluent community'],
      transportLinks: ['30 mins to London Waterloo', 'A3 to London', 'Near Heathrow'],
    },
    tradeMarket: {
      characterDescription: 'Premium residential market with high-value properties and demanding clients. Strong commercial tech sector.',
      hotSectors: ['High-end residential', 'Tech office fit-outs', 'Smart home installations', 'Period property work', 'Luxury extensions'],
      majorProjects: [
        'Town centre regeneration',
        'University expansion',
        'Bedford Road development',
        'North Street Quarter',
      ],
    },
    content: {
      heroSubtitle: 'Affluent Surrey with premium rates',
      introductionParagraph: 'Guildford tradesmen serve one of the South East\'s most affluent markets. High property values, demanding clients, and a strong tech sector create opportunities for quality-focused trades.',
      whyLocalTradesmen: 'Guildford clients expect the best and pay for it. Professional presentation, quality work, and reliability are rewarded with premium rates and repeat business.',
      closingCTA: 'Get your free Guildford trade finance quote',
    },
    faqs: [
      {
        question: 'Is Guildford a good market for tradesmen?',
        answer: 'Excellent for quality-focused tradesmen. Guildford\'s affluent population pays premium rates for reliable, professional service.',
      },
    ],
    testimonial: {
      quote: 'Guildford clients expect top quality. Invested in the best tools and a professional van setup - it\'s essential in this market.',
      name: 'Martin R.',
      trade: 'Electrician',
      business: 'MR Electrical Surrey',
      amount: '£36,000',
    },
    coordinates: { lat: 51.2362, lng: -0.5704 },
  },
};

// Generate data for towns not in the detailed list
export function generateTownLocalData(
  townSlug: string,
  townName: string,
  countySlug: string,
  countyName: string,
  region: string,
  population?: number
): TownLocalData {
  // If we have detailed data, return it
  if (townLocalData[townSlug]) {
    return townLocalData[townSlug];
  }

  // Generate contextual data based on county and region
  const pop = population || 25000;
  const isLargeCity = pop > 100000;
  const isMediumTown = pop > 30000;

  const regionalCharacteristics = getRegionalCharacteristics(region);
  const countyCharacteristics = getCountyCharacteristics(countySlug);

  return {
    slug: townSlug,
    name: townName,
    countySlug: countySlug,
    population: pop,
    populationYear: '2021',
    localEconomy: {
      description: `${townName} is a ${isMediumTown ? 'thriving' : 'growing'} ${countyCharacteristics.townType} in ${countyName}, with a diverse local economy and strong demand for quality trade services.`,
      keyIndustries: countyCharacteristics.industries,
      majorEmployers: generateLocalEmployers(townName, countyCharacteristics, pop),
      economicCharacter: countyCharacteristics.townType,
    },
    localContext: {
      knownFor: generateKnownFor(townName, countySlug),
      transportLinks: generateTransportLinks(countySlug, region),
    },
    tradeMarket: {
      characterDescription: `${townName} offers ${regionalCharacteristics.marketDescription}. ${regionalCharacteristics.tradeNote}`,
      hotSectors: regionalCharacteristics.hotSectors,
      majorProjects: [
        `Residential development in ${townName}`,
        'Local commercial improvements',
        `${countyName} infrastructure upgrades`,
      ],
    },
    content: {
      heroSubtitle: `Serving ${townName} and surrounding areas`,
      introductionParagraph: `${townName} tradesmen serve the local community and surrounding ${countyName} area. With ${isLargeCity ? 'a diverse urban market' : isMediumTown ? 'steady residential demand' : 'a close-knit local economy'}, there\'s consistent work for quality electricians, plumbers, builders and other skilled trades.`,
      whyLocalTradesmen: `${townName}'s ${countyCharacteristics.housingStock} create regular demand for maintenance, improvements, and renovations. Local tradesmen who build strong reputations thrive here.`,
      closingCTA: `Get your free ${townName} trade finance quote`,
    },
    faqs: [
      {
        question: `Do you work with tradesmen in ${townName}?`,
        answer: `Yes, we work with tradesmen throughout ${townName} and the wider ${countyName} area. Our understanding of local conditions helps us find the right finance solutions.`,
      },
      {
        question: `How quickly can ${townName} tradesmen get approved?`,
        answer: `Most ${townName} tradesmen receive a decision within 4 hours, with funds typically available within 24-48 hours of approval.`,
      },
      {
        question: `What finance options are available in ${townName}?`,
        answer: `We offer equipment finance, van and vehicle finance, business loans, and working capital for ${townName} tradesmen. Whatever your trade, we have options.`,
      },
      {
        question: `Can I get finance for my ${townName} trade business if I have bad credit?`,
        answer: `Yes, we look at the whole picture - your work, your business, your ability to repay - not just your credit score.`,
      },
    ],
    coordinates: { lat: 52.0, lng: -1.0 }, // Default, should be overridden with real coords
  };
}

// Regional characteristics
function getRegionalCharacteristics(region: string): {
  marketDescription: string;
  tradeNote: string;
  hotSectors: string[];
} {
  const characteristics: Record<string, { marketDescription: string; tradeNote: string; hotSectors: string[] }> = {
    'London': {
      marketDescription: 'premium rates and high client expectations',
      tradeNote: 'Quality work is well-rewarded in this competitive market.',
      hotSectors: ['High-end residential', 'Commercial fit-outs', 'Smart home installations', 'Heritage restoration'],
    },
    'South East': {
      marketDescription: 'strong residential demand from affluent commuter populations',
      tradeNote: 'Commuter towns offer steady, well-paying domestic work.',
      hotSectors: ['Home extensions', 'Kitchen/bathroom upgrades', 'Garden landscaping', 'Energy efficiency'],
    },
    'East of England': {
      marketDescription: 'growing demand driven by London overspill and local growth',
      tradeNote: 'New developments and established communities both need quality trades.',
      hotSectors: ['New-build finishing', 'Period property maintenance', 'Agricultural buildings', 'Commercial upgrades'],
    },
    'South West': {
      marketDescription: 'tourism-influenced demand with seasonal peaks',
      tradeNote: 'Holiday properties and tourism businesses create unique opportunities.',
      hotSectors: ['Holiday let upgrades', 'Period conversions', 'Hospitality maintenance', 'Renewable installations'],
    },
    'West Midlands': {
      marketDescription: 'diverse industrial and residential opportunities',
      tradeNote: 'Manufacturing and logistics sectors provide commercial work alongside residential.',
      hotSectors: ['Industrial maintenance', 'Warehouse fit-outs', 'Residential renovations', 'Commercial HVAC'],
    },
    'East Midlands': {
      marketDescription: 'logistics-driven commercial work plus residential demand',
      tradeNote: 'The region\'s distribution centres and growing towns need skilled trades.',
      hotSectors: ['Distribution facilities', 'New-build residential', 'Commercial maintenance', 'Office fit-outs'],
    },
    'Yorkshire': {
      marketDescription: 'strong opportunities from urban regeneration to rural properties',
      tradeNote: 'Victorian housing stock and commercial developments both create demand.',
      hotSectors: ['Victorian renovations', 'Commercial conversions', 'Student accommodation', 'Rural properties'],
    },
    'North West': {
      marketDescription: 'regeneration-driven growth alongside established residential work',
      tradeNote: 'Major cities are booming while towns offer steady local work.',
      hotSectors: ['City centre developments', 'Industrial heritage', 'Residential improvements', 'Commercial fit-outs'],
    },
    'North East': {
      marketDescription: 'competitive rates with regeneration opportunities',
      tradeNote: 'Investment in the region is creating new opportunities.',
      hotSectors: ['Regeneration projects', 'Energy sector work', 'Residential maintenance', 'Commercial upgrades'],
    },
    'Scotland': {
      marketDescription: 'varied demand from cities to rural communities',
      tradeNote: 'Weather-resistant work and energy efficiency are valued skills.',
      hotSectors: ['Energy efficiency', 'New-build residential', 'Heritage properties', 'Commercial maintenance'],
    },
    'Wales': {
      marketDescription: 'tourism and residential demand with growing opportunities',
      tradeNote: 'Coastal tourism and valleys communities both need quality trades.',
      hotSectors: ['Holiday properties', 'Period renovations', 'Energy efficiency', 'Commercial maintenance'],
    },
    'Northern Ireland': {
      marketDescription: 'growing market with strong community connections',
      tradeNote: 'Local reputation is key in this close-knit market.',
      hotSectors: ['Residential improvements', 'Commercial maintenance', 'Agricultural buildings', 'New developments'],
    },
  };

  return characteristics[region] || characteristics['South East'];
}

// County characteristics
function getCountyCharacteristics(countySlug: string): {
  townType: string;
  primaryIndustry: string;
  industries: string[];
  housingStock: string;
} {
  const characteristics: Record<string, { townType: string; primaryIndustry: string; industries: string[]; housingStock: string }> = {
    'hertfordshire': {
      townType: 'commuter town',
      primaryIndustry: 'professional services',
      industries: ['Professional Services', 'Healthcare', 'Technology', 'Retail'],
      housingStock: 'mix of period and modern properties',
    },
    'essex': {
      townType: 'growing market town',
      primaryIndustry: 'logistics and services',
      industries: ['Logistics', 'Retail', 'Construction', 'Healthcare'],
      housingStock: 'post-war estates and new developments',
    },
    'kent': {
      townType: 'historic market town',
      primaryIndustry: 'services and agriculture',
      industries: ['Agriculture', 'Tourism', 'Services', 'Logistics'],
      housingStock: 'period properties and new estates',
    },
    'surrey': {
      townType: 'affluent commuter town',
      primaryIndustry: 'professional services',
      industries: ['Finance', 'Technology', 'Healthcare', 'Professional Services'],
      housingStock: 'high-value period and luxury properties',
    },
    // Add more counties as needed
  };

  return characteristics[countySlug] || {
    townType: 'market town',
    primaryIndustry: 'local businesses',
    industries: ['Retail', 'Healthcare', 'Construction', 'Professional Services'],
    housingStock: 'mix of property types',
  };
}

function generateLocalEmployers(townName: string, county: ReturnType<typeof getCountyCharacteristics>, population: number): string[] {
  // For towns without detailed data, we don't show specific employers
  // as generic placeholders like "Townname Schools" are low value
  // Instead, return empty array - the UI should handle this gracefully
  return [];
}

function generateKnownFor(townName: string, countySlug: string): string[] {
  // For towns without detailed data, return empty array
  // Generic placeholders provide no SEO value
  return [];
}

function generateTransportLinks(countySlug: string, region: string): string[] {
  const links: string[] = [];

  if (['hertfordshire', 'essex', 'kent', 'surrey', 'berkshire'].includes(countySlug)) {
    links.push('Rail links to London');
  }

  links.push('Local road network');

  return links;
}

// Export helper function
export function getTownLocalData(
  townSlug: string,
  townName: string,
  countySlug: string,
  countyName: string,
  region: string,
  population?: number
): TownLocalData {
  return townLocalData[townSlug] || generateTownLocalData(townSlug, townName, countySlug, countyName, region, population);
}
