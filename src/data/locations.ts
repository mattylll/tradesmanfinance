// Enhanced Location Data for TradesmanFinance.co.uk
// Includes population, economic facts, trade statistics, and geographic data

export interface TownData {
  name: string;
  slug: string;
  population?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  keyFacts?: string[];
  topTrades?: string[]; // Most in-demand trades
}

export interface CountyStatistics {
  registeredTradesmen: number;
  avgContractValue: string;
  yearOverYearGrowth: string;
  topTrades: string[];
}

export interface EconomicData {
  gdpContribution?: string;
  keyIndustries: string[];
  employmentRate?: string;
  businessGrowthRate?: string;
  constructionSpend?: string;
}

export interface County {
  name: string;
  slug: string;
  region: string;
  description: string;
  longDescription: string;
  towns: string[];
  townData?: Record<string, TownData>;
  population?: number;
  area?: string; // sq km
  economicFacts: string[];
  economicData?: EconomicData;
  tradeStatistics: CountyStatistics;
  landmarks?: string[];
  seoKeywords?: string[];
}

export interface CountiesData {
  counties: Record<string, County>;
  meta: {
    version: string;
    lastUpdated: string;
    totalCounties: number;
    totalTowns: number;
  };
}

// Convert town name to URL slug
export function townToSlug(town: string): string {
  return town
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Convert slug back to display name (approximate)
export function slugToTownName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const counties: Record<string, County> = {
  "aberdeenshire": {
    name: "Aberdeenshire",
    slug: "aberdeenshire",
    region: "Scotland",
    description: "Scotland's oil and gas capital with strong maritime and energy sectors",
    longDescription: "Aberdeenshire is Scotland's energy powerhouse, home to the UK's oil and gas industry. The region offers exceptional opportunities for tradesmen in the energy sector, with ongoing decommissioning projects, renewable energy installations, and commercial property development driving steady demand for skilled professionals.",
    towns: ["Aberdeen", "Banchory", "Banff", "Ellon", "Fraserburgh", "Huntly", "Inverurie", "Peterhead", "Turriff"],
    population: 262000,
    area: "6,313",
    economicFacts: [
      "Home to 90% of UK's oil and gas exploration activity",
      "Aberdeen is Europe's offshore energy capital",
      "Strong renewable energy sector with offshore wind farms",
      "Growing tech hub with data centres",
      "Major fishing port at Peterhead"
    ],
    economicData: {
      gdpContribution: "£12.5 billion",
      keyIndustries: ["Oil & Gas", "Renewable Energy", "Fishing", "Agriculture", "Tourism"],
      employmentRate: "76%",
      businessGrowthRate: "3.2%",
      constructionSpend: "£890 million"
    },
    tradeStatistics: {
      registeredTradesmen: 8450,
      avgContractValue: "£18,500",
      yearOverYearGrowth: "4.8%",
      topTrades: ["electrician", "plumber", "heating-engineer", "scaffolder"]
    },
    landmarks: ["Balmoral Castle", "Dunnottar Castle", "Aberdeen Harbour"],
    seoKeywords: ["Aberdeen tradesman finance", "oil gas contractor loans", "Scottish tradesman equipment finance"]
  },
  "angus": {
    name: "Angus",
    slug: "angus",
    region: "Scotland",
    description: "Agricultural heartland with engineering and food processing industries",
    longDescription: "Angus combines Scotland's rich agricultural heritage with modern engineering excellence. The region's food processing sector, combined with renewable energy projects and historic property renovations, creates diverse opportunities for tradesmen seeking growth and stability.",
    towns: ["Arbroath", "Forfar", "Kirriemuir", "Montrose"],
    population: 116000,
    area: "2,182",
    economicFacts: [
      "Famous for Angus beef production",
      "Major food processing hub",
      "Growing renewable energy sector",
      "Historic town centres requiring specialist restoration",
      "Strong agricultural machinery sector"
    ],
    economicData: {
      gdpContribution: "£2.8 billion",
      keyIndustries: ["Agriculture", "Food Processing", "Engineering", "Tourism"],
      employmentRate: "74%",
      constructionSpend: "£145 million"
    },
    tradeStatistics: {
      registeredTradesmen: 2850,
      avgContractValue: "£12,200",
      yearOverYearGrowth: "2.9%",
      topTrades: ["builder", "electrician", "plumber", "heating-engineer"]
    },
    landmarks: ["Arbroath Abbey", "Glamis Castle", "Montrose Basin"],
    seoKeywords: ["Angus tradesman finance", "agricultural contractor loans", "Forfar equipment finance"]
  },
  "argyll": {
    name: "Argyll",
    slug: "argyll",
    region: "Scotland",
    description: "West Highland coastal region with tourism and marine trades",
    longDescription: "Argyll's stunning west coast location creates unique opportunities for tradesmen in marine engineering, tourism infrastructure, and renewable energy. The region's challenging geography demands skilled professionals capable of working in remote and island locations.",
    towns: ["Campbeltown", "Dalmally", "Dunoon", "Inveraray", "Lochgilphead", "Oban", "Tarbert"],
    population: 86000,
    area: "6,909",
    economicFacts: [
      "Scotland's premier sailing and boating destination",
      "Growing aquaculture and fish farming industry",
      "Significant tourism sector requiring property maintenance",
      "Major ferry routes requiring infrastructure investment",
      "Renewable energy projects including tidal power"
    ],
    economicData: {
      keyIndustries: ["Tourism", "Marine", "Aquaculture", "Renewable Energy", "Agriculture"],
      employmentRate: "71%",
      constructionSpend: "£95 million"
    },
    tradeStatistics: {
      registeredTradesmen: 1950,
      avgContractValue: "£14,800",
      yearOverYearGrowth: "3.5%",
      topTrades: ["builder", "plumber", "electrician", "roofer"]
    },
    landmarks: ["Inveraray Castle", "Oban Bay", "Isle of Mull"],
    seoKeywords: ["Argyll tradesman finance", "marine contractor loans", "Oban equipment finance"]
  },
  "ayrshire": {
    name: "Ayrshire",
    slug: "ayrshire",
    region: "Scotland",
    description: "Coastal region with aerospace, engineering and tourism",
    longDescription: "Ayrshire combines industrial heritage with modern aerospace manufacturing and world-famous golf tourism. The region's diverse economy offers tradesmen opportunities across sectors from commercial construction to luxury hospitality renovations.",
    towns: ["Ardrossan", "Ayr", "Cumnock", "Dalry", "Darvel", "Girvan", "Irvine", "Kilbirnie", "Kilmarnock", "Largs", "Prestwick", "Saltcoats", "West Kilbride"],
    population: 370000,
    area: "3,369",
    economicFacts: [
      "Home to Prestwick Airport and aerospace manufacturing",
      "World-famous golf courses including Turnberry",
      "Major regeneration projects in Irvine and Kilmarnock",
      "Growing data centre sector",
      "Strong engineering heritage"
    ],
    economicData: {
      gdpContribution: "£6.8 billion",
      keyIndustries: ["Aerospace", "Engineering", "Tourism", "Manufacturing", "Data Centres"],
      employmentRate: "72%",
      constructionSpend: "£320 million"
    },
    tradeStatistics: {
      registeredTradesmen: 9200,
      avgContractValue: "£13,500",
      yearOverYearGrowth: "3.8%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer"]
    },
    landmarks: ["Burns Cottage", "Turnberry Golf Course", "Culzean Castle"],
    seoKeywords: ["Ayrshire tradesman finance", "Kilmarnock contractor loans", "Ayr equipment finance"]
  },
  "bedfordshire": {
    name: "Bedfordshire",
    slug: "bedfordshire",
    region: "East of England",
    description: "Home to logistics, aerospace and manufacturing sectors",
    longDescription: "Bedfordshire's strategic location at the heart of England's logistics network creates exceptional opportunities for tradesmen. The county's mix of aerospace manufacturing, warehouse construction, and residential development ensures steady demand for skilled professionals.",
    towns: ["Bedford", "Biggleswade", "Dunstable", "Leighton Buzzard", "Luton", "Sandy"],
    population: 669000,
    area: "1,235",
    economicFacts: [
      "Major logistics hub with excellent transport links",
      "London Luton Airport drives hospitality and construction",
      "Cranfield University aerospace research",
      "Growing data centre and tech sector",
      "Major warehouse development corridor"
    ],
    economicData: {
      gdpContribution: "£14.5 billion",
      keyIndustries: ["Logistics", "Aerospace", "Manufacturing", "Hospitality", "Tech"],
      employmentRate: "77%",
      businessGrowthRate: "4.1%",
      constructionSpend: "£580 million"
    },
    tradeStatistics: {
      registeredTradesmen: 12800,
      avgContractValue: "£16,200",
      yearOverYearGrowth: "5.2%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "air-conditioning"]
    },
    landmarks: ["Woburn Abbey", "Whipsnade Zoo", "Bedford River Festival"],
    seoKeywords: ["Bedfordshire tradesman finance", "Luton contractor loans", "Bedford equipment finance"]
  },
  "berkshire": {
    name: "Berkshire",
    slug: "berkshire",
    region: "South East England",
    description: "Royal county with tech corridor and financial services",
    longDescription: "Berkshire sits at the heart of Britain's technology corridor, home to global tech headquarters and the Royal family. The county's affluent population and commercial growth create premium opportunities for tradesmen in both residential and commercial sectors.",
    towns: ["Ascot", "Bracknell", "Hungerford", "Maidenhead", "Newbury", "Reading", "Sandhurst", "Slough", "Thatcham", "Windsor", "Wokingham"],
    population: 911000,
    area: "1,262",
    economicFacts: [
      "Home to Microsoft, Oracle and major tech headquarters",
      "Thames Valley Silicon Corridor",
      "Windsor Castle drives luxury property market",
      "Major commercial development in Reading",
      "Strong financial services sector"
    ],
    economicData: {
      gdpContribution: "£35 billion",
      keyIndustries: ["Technology", "Financial Services", "Pharmaceuticals", "Retail", "Hospitality"],
      employmentRate: "80%",
      businessGrowthRate: "4.8%",
      constructionSpend: "£1.2 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 18500,
      avgContractValue: "£22,500",
      yearOverYearGrowth: "5.5%",
      topTrades: ["electrician", "plumber", "builder", "air-conditioning", "heating-engineer"]
    },
    landmarks: ["Windsor Castle", "Ascot Racecourse", "Legoland Windsor"],
    seoKeywords: ["Berkshire tradesman finance", "Reading contractor loans", "Windsor equipment finance"]
  },
  "buckinghamshire": {
    name: "Buckinghamshire",
    slug: "buckinghamshire",
    region: "South East England",
    description: "Chilterns location with strong commuter and business economy",
    longDescription: "Buckinghamshire combines scenic Chilterns countryside with dynamic business centres like Milton Keynes. The county's mix of heritage properties, new developments, and commercial growth offers diverse opportunities for ambitious tradesmen.",
    towns: ["Amersham", "Aylesbury", "Beaconsfield", "Buckingham", "Chesham", "Gerrards Cross", "High Wycombe", "Marlow", "Milton Keynes", "Newport Pagnell", "Princes Risborough"],
    population: 546000,
    area: "1,565",
    economicFacts: [
      "Milton Keynes is UK's fastest-growing city",
      "Major film and TV production at Pinewood Studios",
      "Strong motorsport sector near Silverstone",
      "Chilterns heritage property renovation market",
      "Growing tech and fintech sector"
    ],
    economicData: {
      gdpContribution: "£18 billion",
      keyIndustries: ["Media & Entertainment", "Technology", "Motorsport", "Finance", "Logistics"],
      employmentRate: "79%",
      businessGrowthRate: "5.2%",
      constructionSpend: "£890 million"
    },
    tradeStatistics: {
      registeredTradesmen: 14200,
      avgContractValue: "£19,800",
      yearOverYearGrowth: "6.1%",
      topTrades: ["electrician", "builder", "plumber", "carpenter", "heating-engineer"]
    },
    landmarks: ["Bletchley Park", "Stowe House", "Waddesdon Manor"],
    seoKeywords: ["Buckinghamshire tradesman finance", "Milton Keynes contractor loans", "Aylesbury equipment finance"]
  },
  "cambridgeshire": {
    name: "Cambridgeshire",
    slug: "cambridgeshire",
    region: "East of England",
    description: "Cambridge tech cluster and agricultural heartland",
    longDescription: "Cambridgeshire is home to one of the world's leading university cities and its thriving tech ecosystem. From cutting-edge laboratory fit-outs to fenland agricultural buildings, the county offers exceptional opportunities for forward-thinking tradesmen.",
    towns: ["Cambridge", "Chatteris", "Ely", "Huntingdon", "March", "Peterborough", "St Ives", "Wisbech"],
    population: 678000,
    area: "3,389",
    economicFacts: [
      "Cambridge is Europe's leading biotech hub",
      "Home to ARM, AstraZeneca and major tech firms",
      "Peterborough major regeneration area",
      "Growing data centre sector",
      "Strong agricultural technology innovation"
    ],
    economicData: {
      gdpContribution: "£22 billion",
      keyIndustries: ["Technology", "Biotech & Life Sciences", "Agriculture", "Education", "Logistics"],
      employmentRate: "79%",
      businessGrowthRate: "5.8%",
      constructionSpend: "£980 million"
    },
    tradeStatistics: {
      registeredTradesmen: 13500,
      avgContractValue: "£21,200",
      yearOverYearGrowth: "6.5%",
      topTrades: ["electrician", "plumber", "builder", "air-conditioning", "heating-engineer"]
    },
    landmarks: ["Cambridge University", "Ely Cathedral", "Imperial War Museum Duxford"],
    seoKeywords: ["Cambridgeshire tradesman finance", "Cambridge contractor loans", "Peterborough equipment finance"]
  },
  "cheshire": {
    name: "Cheshire",
    slug: "cheshire",
    region: "North West England",
    description: "Historic county with chemical, automotive and aerospace industries",
    longDescription: "Cheshire combines rural affluence with industrial strength, home to major chemical plants, automotive manufacturing, and one of England's wealthiest populations. The county's diverse economy offers tradesmen opportunities from luxury residential to heavy industrial.",
    towns: ["Alderley Edge", "Cheadle", "Chester", "Congleton", "Crewe", "Knutsford", "Macclesfield", "Middlewich", "Nantwich", "Northwich", "Runcorn", "Sandbach", "Warrington", "Wilmslow"],
    population: 1070000,
    area: "2,343",
    economicFacts: [
      "Major chemical and pharmaceutical manufacturing hub",
      "Bentley Motors headquarters in Crewe",
      "Chester's historic city centre drives tourism",
      "Affluent 'Golden Triangle' around Alderley Edge",
      "Growing logistics sector around Warrington"
    ],
    economicData: {
      gdpContribution: "£28 billion",
      keyIndustries: ["Chemical & Pharmaceutical", "Automotive", "Logistics", "Financial Services", "Tourism"],
      employmentRate: "78%",
      businessGrowthRate: "4.2%",
      constructionSpend: "£1.1 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 22500,
      avgContractValue: "£18,900",
      yearOverYearGrowth: "4.5%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "carpenter"]
    },
    landmarks: ["Chester Cathedral", "Jodrell Bank", "Tatton Park"],
    seoKeywords: ["Cheshire tradesman finance", "Chester contractor loans", "Warrington equipment finance"]
  },
  "cornwall": {
    name: "Cornwall",
    slug: "cornwall",
    region: "South West England",
    description: "Maritime heritage with tourism, fishing and renewable energy",
    longDescription: "Cornwall's stunning coastline and booming tourism sector create year-round opportunities for tradesmen. From boutique hotel renovations to marine engineering and renewable energy installations, Cornwall offers a unique lifestyle alongside strong business potential.",
    towns: ["Bodmin", "Bude", "Camelford", "Falmouth", "Fowey", "Helston", "Launceston", "Liskeard", "Newquay", "Par", "Penryn", "Penzance", "Port Isaac", "Redruth", "Saltash", "St Austell", "St Ives", "Truro", "Wadebridge"],
    population: 570000,
    area: "3,563",
    economicFacts: [
      "UK's top staycation destination post-pandemic",
      "Major renewable energy installations",
      "Growing tech sector with superfast broadband",
      "Spaceport Cornwall aerospace development",
      "Strong second-home renovation market"
    ],
    economicData: {
      gdpContribution: "£11 billion",
      keyIndustries: ["Tourism & Hospitality", "Fishing & Marine", "Renewable Energy", "Agriculture", "Creative Industries"],
      employmentRate: "74%",
      constructionSpend: "£520 million"
    },
    tradeStatistics: {
      registeredTradesmen: 11800,
      avgContractValue: "£14,200",
      yearOverYearGrowth: "5.8%",
      topTrades: ["builder", "electrician", "plumber", "roofer", "carpenter"]
    },
    landmarks: ["Eden Project", "St Michael's Mount", "Tate St Ives"],
    seoKeywords: ["Cornwall tradesman finance", "Truro contractor loans", "Newquay equipment finance"]
  },
  "cumbria": {
    name: "Cumbria",
    slug: "cumbria",
    region: "North West England",
    description: "Lake District with tourism, nuclear and manufacturing",
    longDescription: "Cumbria offers tradesmen a unique combination of Lake District tourism infrastructure, nuclear industry expertise, and rural construction. The region's UNESCO World Heritage status drives premium renovation work while Sellafield provides specialized industrial opportunities.",
    towns: ["Alston", "Ambleside", "Appleby-in-Westmorland", "Barrow-in-Furness", "Brampton", "Carlisle", "Cockermouth", "Coniston", "Grange-over-Sands", "Hawkshead", "Kendal", "Keswick", "Kirkby Stephen", "Maryport", "Penrith", "Sedbergh", "Ulverston", "Whitehaven", "Wigton", "Windermere", "Workington"],
    population: 499000,
    area: "6,768",
    economicFacts: [
      "Lake District UNESCO World Heritage Site",
      "Sellafield nuclear complex - major employer",
      "BAE Systems shipbuilding at Barrow",
      "Premium tourism and hospitality sector",
      "Growing outdoor adventure industry"
    ],
    economicData: {
      gdpContribution: "£12 billion",
      keyIndustries: ["Nuclear", "Tourism", "Defence & Manufacturing", "Agriculture", "Outdoor Recreation"],
      employmentRate: "75%",
      constructionSpend: "£480 million"
    },
    tradeStatistics: {
      registeredTradesmen: 9800,
      avgContractValue: "£15,500",
      yearOverYearGrowth: "3.9%",
      topTrades: ["builder", "plumber", "electrician", "roofer", "heating-engineer"]
    },
    landmarks: ["Lake Windermere", "Hadrian's Wall", "Carlisle Castle"],
    seoKeywords: ["Cumbria tradesman finance", "Lake District contractor loans", "Carlisle equipment finance"]
  },
  "derbyshire": {
    name: "Derbyshire",
    slug: "derbyshire",
    region: "East Midlands",
    description: "Peak District with manufacturing and engineering heritage",
    longDescription: "Derbyshire combines Peak District natural beauty with industrial strength, home to Rolls-Royce and Toyota manufacturing. The county's diverse economy offers tradesmen opportunities from heritage renovation in Buxton to cutting-edge aerospace engineering in Derby.",
    towns: ["Alfreton", "Ashbourne", "Bakewell", "Buxton", "Chesterfield", "Derby", "Glossop", "Heanor", "Ilkeston", "Long Eaton", "Matlock", "Ripley", "Swadlincote"],
    population: 802000,
    area: "2,625",
    economicFacts: [
      "Rolls-Royce aerospace headquarters in Derby",
      "Toyota UK manufacturing plant",
      "Peak District tourism hub",
      "Strong rail engineering heritage",
      "Growing logistics sector"
    ],
    economicData: {
      gdpContribution: "£19 billion",
      keyIndustries: ["Aerospace", "Automotive", "Manufacturing", "Tourism", "Rail Engineering"],
      employmentRate: "76%",
      businessGrowthRate: "3.8%",
      constructionSpend: "£680 million"
    },
    tradeStatistics: {
      registeredTradesmen: 15800,
      avgContractValue: "£14,800",
      yearOverYearGrowth: "4.1%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Peak District", "Chatsworth House", "Derwent Valley Mills"],
    seoKeywords: ["Derbyshire tradesman finance", "Derby contractor loans", "Chesterfield equipment finance"]
  },
  "devon": {
    name: "Devon",
    slug: "devon",
    region: "South West England",
    description: "Two coastlines with maritime, tourism and agriculture",
    longDescription: "Devon's exceptional natural beauty and thriving tourism sector create abundant opportunities for tradesmen. From Plymouth's naval facilities to Exeter's tech growth and the English Riviera's hospitality industry, Devon offers lifestyle and business success.",
    towns: ["Ashburton", "Axminster", "Barnstaple", "Bideford", "Braunton", "Brixham", "Buckfastleigh", "Budleigh Salterton", "Crediton", "Cullompton", "Dartmouth", "Dawlish", "Exeter", "Exmouth", "Holsworthy", "Honiton", "Ilfracombe", "Ivybridge", "Lynton", "Newton Abbot", "Okehampton", "Ottery St Mary", "Paignton", "Plymouth", "Seaton", "Sidmouth", "South Molton", "Tavistock", "Teignmouth", "Tiverton", "Torquay", "Torrington", "Totnes"],
    population: 1190000,
    area: "6,707",
    economicFacts: [
      "Plymouth naval dockyard - major employer",
      "Exeter growing as regional tech hub",
      "English Riviera tourism destination",
      "Strong agricultural and food sector",
      "Marine and renewable energy innovation"
    ],
    economicData: {
      gdpContribution: "£24 billion",
      keyIndustries: ["Tourism & Hospitality", "Defence & Marine", "Agriculture", "Technology", "Healthcare"],
      employmentRate: "75%",
      constructionSpend: "£890 million"
    },
    tradeStatistics: {
      registeredTradesmen: 24500,
      avgContractValue: "£13,800",
      yearOverYearGrowth: "4.6%",
      topTrades: ["builder", "electrician", "plumber", "roofer", "carpenter"]
    },
    landmarks: ["Dartmoor National Park", "Plymouth Hoe", "Exeter Cathedral"],
    seoKeywords: ["Devon tradesman finance", "Plymouth contractor loans", "Exeter equipment finance"]
  },
  "dorset": {
    name: "Dorset",
    slug: "dorset",
    region: "South West England",
    description: "Jurassic Coast with marine, tourism and agriculture",
    longDescription: "Dorset's UNESCO-listed Jurassic Coast and thriving coastal towns create strong demand for skilled tradesmen. The county's affluent retirement population, holiday home market, and marine industries offer diverse opportunities for quality-focused professionals.",
    towns: ["Blandford Forum", "Bournemouth", "Bridport", "Christchurch", "Dorchester", "Gillingham", "Poole", "Shaftesbury", "Sherborne", "Swanage", "Wareham", "Weymouth", "Wimborne"],
    population: 773000,
    area: "2,653",
    economicFacts: [
      "Jurassic Coast UNESCO World Heritage Site",
      "Bournemouth major financial services hub",
      "Poole largest natural harbour in Europe",
      "Strong marine engineering sector",
      "Growing digital and creative industries"
    ],
    economicData: {
      gdpContribution: "£17 billion",
      keyIndustries: ["Financial Services", "Tourism", "Marine & Engineering", "Healthcare", "Digital & Creative"],
      employmentRate: "77%",
      constructionSpend: "£620 million"
    },
    tradeStatistics: {
      registeredTradesmen: 15200,
      avgContractValue: "£15,800",
      yearOverYearGrowth: "4.3%",
      topTrades: ["electrician", "plumber", "builder", "roofer", "heating-engineer"]
    },
    landmarks: ["Durdle Door", "Corfe Castle", "Brownsea Island"],
    seoKeywords: ["Dorset tradesman finance", "Bournemouth contractor loans", "Poole equipment finance"]
  },
  "county-durham": {
    name: "County Durham",
    slug: "county-durham",
    region: "North East England",
    description: "Historic mining region with growing tech and manufacturing sectors",
    longDescription: "County Durham's transformation from mining heartland to modern economy creates unique opportunities for tradesmen. Major regeneration projects, university expansion, and growing manufacturing sectors drive demand for skilled professionals across all trades.",
    towns: ["Barnard Castle", "Bishop Auckland", "Chester-le-Street", "Consett", "Darlington", "Durham", "Newton Aycliffe", "Seaham", "Sedgefield", "Spennymoor", "Stanley"],
    population: 530000,
    area: "2,676",
    economicFacts: [
      "Durham University drives knowledge economy",
      "Newton Aycliffe growing manufacturing hub",
      "Major regeneration at Bishop Auckland",
      "Darlington rail heritage and logistics",
      "Growing renewable energy sector"
    ],
    economicData: {
      gdpContribution: "£10 billion",
      keyIndustries: ["Manufacturing", "Education", "Healthcare", "Logistics", "Renewable Energy"],
      employmentRate: "72%",
      constructionSpend: "£420 million"
    },
    tradeStatistics: {
      registeredTradesmen: 9500,
      avgContractValue: "£12,500",
      yearOverYearGrowth: "4.8%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Durham Cathedral", "Beamish Museum", "Bowes Museum"],
    seoKeywords: ["County Durham tradesman finance", "Durham contractor loans", "Darlington equipment finance"]
  },
  "east-sussex": {
    name: "East Sussex",
    slug: "east-sussex",
    region: "South East England",
    description: "South coast with tourism, creative industries and agriculture",
    longDescription: "East Sussex combines the vibrant creative scene of Brighton with picturesque market towns and stunning coastline. The county's diverse economy and affluent population create strong demand for quality tradesmen across residential and commercial sectors.",
    towns: ["Battle", "Bexhill-on-Sea", "Brighton", "Crowborough", "Eastbourne", "Hailsham", "Hastings", "Heathfield", "Lewes", "Newhaven", "Rye", "Seaford", "Uckfield"],
    population: 554000,
    area: "1,792",
    economicFacts: [
      "Brighton UK's leading digital tech hub outside London",
      "Strong creative and media industries",
      "Eastbourne retirement and hospitality sector",
      "Growing wine industry in the Weald",
      "Hastings regeneration projects"
    ],
    economicData: {
      gdpContribution: "£14 billion",
      keyIndustries: ["Digital & Tech", "Creative Industries", "Tourism", "Healthcare", "Education"],
      employmentRate: "75%",
      businessGrowthRate: "4.5%",
      constructionSpend: "£480 million"
    },
    tradeStatistics: {
      registeredTradesmen: 11200,
      avgContractValue: "£16,200",
      yearOverYearGrowth: "5.1%",
      topTrades: ["electrician", "plumber", "builder", "carpenter", "heating-engineer"]
    },
    landmarks: ["Royal Pavilion Brighton", "Seven Sisters", "Bodiam Castle"],
    seoKeywords: ["East Sussex tradesman finance", "Brighton contractor loans", "Eastbourne equipment finance"]
  },
  "essex": {
    name: "Essex",
    slug: "essex",
    region: "East of England",
    description: "Thames Gateway with logistics, construction and commuter belt",
    longDescription: "Essex's strategic Thames Gateway location and proximity to London create exceptional opportunities for tradesmen. Major infrastructure projects, logistics development, and affluent commuter towns drive consistent demand across all trade specialities.",
    towns: ["Basildon", "Billericay", "Braintree", "Brentwood", "Canvey Island", "Chelmsford", "Clacton-on-Sea", "Colchester", "Grays Thurrock", "Halstead", "Harlow", "Harwich", "Loughton", "Maldon", "Rayleigh", "Rochford", "Saffron Walden", "Southend-on-Sea", "Tilbury", "Walton-on-the-Naze", "Wickford", "Witham"],
    population: 1480000,
    area: "3,670",
    economicFacts: [
      "Thames Gateway regeneration zone",
      "London Gateway - UK's newest major port",
      "Strong logistics and distribution sector",
      "Chelmsford city status and growth",
      "Major commuter belt with high property values"
    ],
    economicData: {
      gdpContribution: "£38 billion",
      keyIndustries: ["Logistics & Ports", "Financial Services", "Construction", "Technology", "Healthcare"],
      employmentRate: "77%",
      businessGrowthRate: "4.3%",
      constructionSpend: "£1.4 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 32500,
      avgContractValue: "£17,500",
      yearOverYearGrowth: "5.4%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "air-conditioning"]
    },
    landmarks: ["Colchester Castle", "Southend Pier", "Layer Marney Tower"],
    seoKeywords: ["Essex tradesman finance", "Chelmsford contractor loans", "Colchester equipment finance"]
  },
  "gloucestershire": {
    name: "Gloucestershire",
    slug: "gloucestershire",
    region: "South West England",
    description: "Cotswolds with aerospace, engineering and tourism",
    longDescription: "Gloucestershire combines Cotswolds charm with cutting-edge aerospace engineering. The county's mix of heritage property renovation, commercial development, and cyber security growth creates diverse opportunities for skilled tradesmen.",
    towns: ["Cheltenham", "Cinderford", "Cirencester", "Gloucester", "Lydney", "Stroud", "Tewkesbury"],
    population: 637000,
    area: "3,150",
    economicFacts: [
      "GCHQ headquarters drives cyber security sector",
      "GE Aviation and Messier-Bugatti aerospace",
      "Cotswolds premium property market",
      "Cheltenham Racecourse and festivals",
      "Growing green tech sector"
    ],
    economicData: {
      gdpContribution: "£16 billion",
      keyIndustries: ["Cyber Security", "Aerospace", "Financial Services", "Tourism", "Manufacturing"],
      employmentRate: "78%",
      businessGrowthRate: "4.1%",
      constructionSpend: "£540 million"
    },
    tradeStatistics: {
      registeredTradesmen: 13200,
      avgContractValue: "£17,200",
      yearOverYearGrowth: "4.6%",
      topTrades: ["electrician", "builder", "plumber", "carpenter", "heating-engineer"]
    },
    landmarks: ["Gloucester Cathedral", "Cheltenham Spa", "Forest of Dean"],
    seoKeywords: ["Gloucestershire tradesman finance", "Cheltenham contractor loans", "Gloucester equipment finance"]
  },
  "greater-london": {
    name: "Greater London",
    slug: "greater-london",
    region: "London",
    description: "Capital city and UK's largest metropolitan area",
    longDescription: "Greater London offers unparalleled opportunities for tradesmen in the UK's largest market. From Canary Wharf commercial fit-outs to Victorian terrace renovations and new-build developments, London provides year-round work at premium rates across all 32 boroughs plus the City of London.",
    towns: [
      "Barking and Dagenham", "Barnet", "Bexley", "Brent", "Bromley",
      "Camden", "City of London", "Croydon", "Ealing", "Enfield",
      "Greenwich", "Hackney", "Hammersmith and Fulham", "Haringey", "Harrow",
      "Havering", "Hillingdon", "Hounslow", "Islington", "Kensington and Chelsea",
      "Kingston upon Thames", "Lambeth", "Lewisham", "Merton", "Newham",
      "Redbridge", "Richmond upon Thames", "Southwark", "Sutton", "Tower Hamlets",
      "Waltham Forest", "Wandsworth", "Westminster"
    ],
    population: 8900000,
    area: "1,572",
    economicFacts: [
      "UK's largest construction market",
      "Constant residential and commercial development",
      "Major infrastructure projects including Crossrail",
      "Premium rates for skilled tradesmen",
      "Diverse sector requirements across 33 boroughs"
    ],
    economicData: {
      gdpContribution: "£503 billion",
      keyIndustries: ["Financial Services", "Technology", "Creative Industries", "Construction", "Healthcare"],
      employmentRate: "76%",
      businessGrowthRate: "3.2%",
      constructionSpend: "£15.2 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 125000,
      avgContractValue: "£28,500",
      yearOverYearGrowth: "4.2%",
      topTrades: ["electrician", "plumber", "builder", "air-conditioning", "heating-engineer"]
    },
    landmarks: ["Tower of London", "Houses of Parliament", "The Shard", "Canary Wharf", "Buckingham Palace"],
    seoKeywords: ["London tradesman finance", "London contractor loans", "London equipment finance", "London business loans"]
  },
  "greater-manchester": {
    name: "Greater Manchester",
    slug: "greater-manchester",
    region: "North West England",
    description: "Northern powerhouse with financial, tech and creative sectors",
    longDescription: "Greater Manchester leads the Northern Powerhouse agenda with major regeneration, tech sector growth, and cultural renaissance. The region offers tradesmen opportunities from MediaCity Salford to Manchester Airport expansion and city centre development.",
    towns: ["Altrincham", "Bolton", "Bury", "Manchester", "Oldham", "Rochdale", "Salford", "Stockport", "Wigan"],
    population: 2850000,
    area: "1,276",
    economicFacts: [
      "MediaCity UK and creative industries hub",
      "Manchester Airport major expansion",
      "Northern Powerhouse rail investment",
      "Strong fintech and tech sector",
      "Major sports and events infrastructure"
    ],
    economicData: {
      gdpContribution: "£67 billion",
      keyIndustries: ["Financial Services", "Technology", "Media & Creative", "Manufacturing", "Healthcare"],
      employmentRate: "74%",
      businessGrowthRate: "4.8%",
      constructionSpend: "£2.8 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 58000,
      avgContractValue: "£16,800",
      yearOverYearGrowth: "5.6%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "air-conditioning"]
    },
    landmarks: ["Old Trafford", "MediaCity UK", "Manchester Cathedral"],
    seoKeywords: ["Manchester tradesman finance", "Greater Manchester contractor loans", "Salford equipment finance"]
  },
  "hampshire": {
    name: "Hampshire",
    slug: "hampshire",
    region: "South East England",
    description: "South coast with maritime, aerospace and technology",
    longDescription: "Hampshire's diverse economy spans maritime heritage, aerospace innovation, and thriving tech sectors. From Southampton's cruise terminal to Farnborough's aerospace giants and Winchester's historic city, the county offers exceptional opportunities for ambitious tradesmen.",
    towns: ["Aldershot", "Alton", "Andover", "Basingstoke", "Bordon", "Eastleigh", "Fareham", "Farnborough", "Fleet", "Gosport", "Havant", "Lymington", "Petersfield", "Portsmouth", "Ringwood", "Romsey", "Southampton", "Whitchurch", "Winchester"],
    population: 1850000,
    area: "3,769",
    economicFacts: [
      "Southampton UK's cruise capital",
      "Farnborough International Airshow",
      "Strong defence sector around Portsmouth",
      "Basingstoke major corporate hub",
      "Growing data centre industry"
    ],
    economicData: {
      gdpContribution: "£48 billion",
      keyIndustries: ["Aerospace & Defence", "Maritime", "Technology", "Financial Services", "Healthcare"],
      employmentRate: "79%",
      businessGrowthRate: "4.2%",
      constructionSpend: "£1.6 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 38500,
      avgContractValue: "£18,200",
      yearOverYearGrowth: "4.8%",
      topTrades: ["electrician", "plumber", "builder", "air-conditioning", "heating-engineer"]
    },
    landmarks: ["Portsmouth Historic Dockyard", "New Forest", "Winchester Cathedral"],
    seoKeywords: ["Hampshire tradesman finance", "Southampton contractor loans", "Portsmouth equipment finance"]
  },
  "hertfordshire": {
    name: "Hertfordshire",
    slug: "hertfordshire",
    region: "East of England",
    description: "Home Counties with film industry, pharma and logistics",
    longDescription: "Hertfordshire's proximity to London and excellent transport links attract major employers across pharma, film, and logistics. The county's affluent towns and commercial growth create strong demand for quality tradesmen at premium rates.",
    towns: ["Baldock", "Berkhamsted", "Borehamwood", "Harpenden", "Hatfield", "Hemel Hempstead", "Hertford", "Hitchin", "Hoddesdon", "Letchworth", "Potters Bar", "Rickmansworth", "Royston", "St Albans", "Stevenage", "Tring", "Ware", "Watford", "Welwyn Garden City"],
    population: 1195000,
    area: "1,643",
    economicFacts: [
      "Warner Bros Studios - Harry Potter production",
      "GSK and major pharma research",
      "Strong commuter economy to London",
      "Hatfield Business Park development",
      "Growing life sciences sector"
    ],
    economicData: {
      gdpContribution: "£42 billion",
      keyIndustries: ["Pharmaceuticals", "Film & TV Production", "Life Sciences", "Financial Services", "Logistics"],
      employmentRate: "80%",
      businessGrowthRate: "4.6%",
      constructionSpend: "£1.2 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 24500,
      avgContractValue: "£19,800",
      yearOverYearGrowth: "5.2%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "carpenter"]
    },
    landmarks: ["Warner Bros Studio Tour", "St Albans Cathedral", "Hatfield House"],
    seoKeywords: ["Hertfordshire tradesman finance", "St Albans contractor loans", "Watford equipment finance"]
  },
  "kent": {
    name: "Kent",
    slug: "kent",
    region: "South East England",
    description: "Garden of England with logistics, ports and agriculture",
    longDescription: "Kent's strategic position as the gateway to Europe drives a logistics and trade economy. From the Channel Tunnel to major ports and thriving market towns, the Garden of England offers tradesmen diverse opportunities in a growing market.",
    towns: ["Ashford", "Canterbury", "Chatham", "Cranbrook", "Dartford", "Deal", "Dover", "Ebbsfleet", "Faversham", "Folkestone", "Gillingham", "Gravesend", "Herne Bay", "Maidstone", "Margate", "Medway", "Ramsgate", "Rochester", "Sandwich", "Sevenoaks", "Sittingbourne", "Tonbridge", "Tunbridge Wells", "Whitstable"],
    population: 1580000,
    area: "3,736",
    economicFacts: [
      "Channel Tunnel and Dover Port logistics",
      "Ebbsfleet Garden City development",
      "Canterbury tourism and education",
      "Major regeneration in Margate and Folkestone",
      "Strong agricultural and wine sector"
    ],
    economicData: {
      gdpContribution: "£42 billion",
      keyIndustries: ["Logistics & Ports", "Tourism", "Manufacturing", "Agriculture", "Financial Services"],
      employmentRate: "77%",
      businessGrowthRate: "4.4%",
      constructionSpend: "£1.5 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 32800,
      avgContractValue: "£16,500",
      yearOverYearGrowth: "5.1%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Canterbury Cathedral", "Dover Castle", "Leeds Castle"],
    seoKeywords: ["Kent tradesman finance", "Maidstone contractor loans", "Canterbury equipment finance"]
  },
  "lancashire": {
    name: "Lancashire",
    slug: "lancashire",
    region: "North West England",
    description: "Industrial heritage with aerospace, nuclear and manufacturing",
    longDescription: "Lancashire combines proud industrial heritage with world-class aerospace manufacturing and growing renewable energy sectors. From BAE Systems to the Blackpool tourism revival, the county offers tradesmen steady work across diverse industries.",
    towns: ["Accrington", "Blackburn", "Blackpool", "Burnley", "Carnforth", "Chorley", "Clitheroe", "Fleetwood", "Lancaster", "Leyland", "Lytham St Annes", "Morecambe", "Nelson", "Ormskirk", "Poulton-le-Fylde", "Preston"],
    population: 1210000,
    area: "3,075",
    economicFacts: [
      "BAE Systems aerospace manufacturing",
      "Preston and Lancaster universities",
      "Blackpool tourism revival",
      "Growing renewable energy sector",
      "Strong manufacturing base"
    ],
    economicData: {
      gdpContribution: "£28 billion",
      keyIndustries: ["Aerospace & Defence", "Manufacturing", "Tourism", "Education", "Energy"],
      employmentRate: "73%",
      businessGrowthRate: "3.8%",
      constructionSpend: "£920 million"
    },
    tradeStatistics: {
      registeredTradesmen: 24200,
      avgContractValue: "£13,500",
      yearOverYearGrowth: "4.2%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Blackpool Tower", "Lancaster Castle", "Ribble Valley"],
    seoKeywords: ["Lancashire tradesman finance", "Preston contractor loans", "Blackpool equipment finance"]
  },
  "leicestershire": {
    name: "Leicestershire",
    slug: "leicestershire",
    region: "East Midlands",
    description: "Midlands manufacturing with textiles, engineering and logistics",
    longDescription: "Leicestershire's central location makes it a logistics powerhouse while maintaining strong manufacturing traditions. Leicester's diverse economy and growing tech sector create opportunities for tradesmen across commercial, industrial, and residential markets.",
    towns: ["Ashby-de-la-Zouch", "Coalville", "Hinckley", "Leicester", "Loughborough", "Lutterworth", "Market Harborough", "Melton Mowbray", "Oakham"],
    population: 712000,
    area: "2,156",
    economicFacts: [
      "MIRA Technology Park automotive R&D",
      "East Midlands Airport logistics hub",
      "Leicester university city growth",
      "Strong food manufacturing sector",
      "Growing e-commerce distribution"
    ],
    economicData: {
      gdpContribution: "£23 billion",
      keyIndustries: ["Logistics", "Manufacturing", "Technology", "Food Processing", "Education"],
      employmentRate: "75%",
      businessGrowthRate: "4.1%",
      constructionSpend: "£780 million"
    },
    tradeStatistics: {
      registeredTradesmen: 14500,
      avgContractValue: "£14,200",
      yearOverYearGrowth: "4.5%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "air-conditioning"]
    },
    landmarks: ["Leicester Cathedral", "National Space Centre", "Bosworth Battlefield"],
    seoKeywords: ["Leicestershire tradesman finance", "Leicester contractor loans", "Loughborough equipment finance"]
  },
  "lincolnshire": {
    name: "Lincolnshire",
    slug: "lincolnshire",
    region: "East Midlands",
    description: "Agricultural heartland with food processing and engineering",
    longDescription: "Lincolnshire's vast agricultural landscape and food processing industry create unique opportunities for tradesmen. From large-scale farming equipment installations to historic cathedral city renovations, the county offers diverse project types.",
    towns: ["Boston", "Bourne", "Gainsborough", "Grantham", "Grimsby", "Lincoln", "Louth", "Market Rasen", "Scunthorpe", "Skegness", "Sleaford", "Spalding", "Stamford"],
    population: 765000,
    area: "6,959",
    economicFacts: [
      "UK's largest agricultural county",
      "Major food processing sector",
      "RAF bases and defence industry",
      "Growing renewable energy (offshore wind)",
      "Grimsby fish processing heritage"
    ],
    economicData: {
      gdpContribution: "£16 billion",
      keyIndustries: ["Agriculture", "Food Processing", "Manufacturing", "Defence", "Renewable Energy"],
      employmentRate: "74%",
      constructionSpend: "£520 million"
    },
    tradeStatistics: {
      registeredTradesmen: 14800,
      avgContractValue: "£12,800",
      yearOverYearGrowth: "3.9%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "groundworker"]
    },
    landmarks: ["Lincoln Cathedral", "Belton House", "Gibraltar Point"],
    seoKeywords: ["Lincolnshire tradesman finance", "Lincoln contractor loans", "Grimsby equipment finance"]
  },
  "merseyside": {
    name: "Merseyside",
    slug: "merseyside",
    region: "North West England",
    description: "Liverpool city region with maritime heritage and creative industries",
    longDescription: "Merseyside's renaissance from maritime powerhouse to cultural capital creates exciting opportunities for tradesmen. Major regeneration projects, growing creative industries, and port development drive demand across all trade specialities.",
    towns: ["Birkenhead", "Bootle", "Liverpool", "Prescot", "St Helens", "Southport", "Wallasey", "Wirral"],
    population: 1430000,
    area: "645",
    economicFacts: [
      "Liverpool Waters £5bn regeneration",
      "Major cruise terminal development",
      "Growing film and TV production",
      "Strong healthcare and life sciences",
      "Port of Liverpool expansion"
    ],
    economicData: {
      gdpContribution: "£32 billion",
      keyIndustries: ["Port & Logistics", "Healthcare", "Creative Industries", "Tourism", "Manufacturing"],
      employmentRate: "71%",
      businessGrowthRate: "4.5%",
      constructionSpend: "£1.1 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 26800,
      avgContractValue: "£14,200",
      yearOverYearGrowth: "5.2%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Liverpool Waterfront", "Anfield", "The Cavern Club"],
    seoKeywords: ["Merseyside tradesman finance", "Liverpool contractor loans", "Wirral equipment finance"]
  },
  "norfolk": {
    name: "Norfolk",
    slug: "norfolk",
    region: "East of England",
    description: "Agricultural region with renewable energy and tourism",
    longDescription: "Norfolk's stunning coastline and agricultural heritage combine with growing renewable energy and tech sectors. Norwich's vibrant city economy and the Broads tourism create diverse opportunities for quality-focused tradesmen.",
    towns: ["Attleborough", "Cromer", "Dereham", "Diss", "Downham Market", "Fakenham", "Great Yarmouth", "King's Lynn", "Norwich", "Sheringham", "Swaffham", "Thetford", "Wells-next-the-Sea", "Wymondham"],
    population: 914000,
    area: "5,372",
    economicFacts: [
      "Major offshore wind energy hub",
      "Norwich insurance and tech sector",
      "Strong agricultural heritage",
      "Norfolk Broads tourism",
      "Growing food processing industry"
    ],
    economicData: {
      gdpContribution: "£19 billion",
      keyIndustries: ["Agriculture", "Renewable Energy", "Financial Services", "Tourism", "Food Processing"],
      employmentRate: "76%",
      constructionSpend: "£620 million"
    },
    tradeStatistics: {
      registeredTradesmen: 16800,
      avgContractValue: "£13,500",
      yearOverYearGrowth: "4.3%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Norwich Cathedral", "Norfolk Broads", "Sandringham Estate"],
    seoKeywords: ["Norfolk tradesman finance", "Norwich contractor loans", "King's Lynn equipment finance"]
  },
  "northamptonshire": {
    name: "Northamptonshire",
    slug: "northamptonshire",
    region: "East Midlands",
    description: "Motorsport valley with logistics and manufacturing",
    longDescription: "Northamptonshire sits at the heart of Britain's Motorsport Valley and logistics network. The county's excellent transport links and growing distribution sector create consistent demand for skilled tradesmen across commercial and industrial projects.",
    towns: ["Corby", "Daventry", "Kettering", "Northampton", "Rushden", "Towcester", "Wellingborough"],
    population: 761000,
    area: "2,364",
    economicFacts: [
      "Silverstone motorsport hub",
      "Major distribution centre corridor",
      "Growing logistics sector",
      "Food processing and manufacturing",
      "Strong commuter links to London"
    ],
    economicData: {
      gdpContribution: "£17 billion",
      keyIndustries: ["Logistics", "Motorsport & Engineering", "Manufacturing", "Footwear", "Food Processing"],
      employmentRate: "77%",
      businessGrowthRate: "4.3%",
      constructionSpend: "£580 million"
    },
    tradeStatistics: {
      registeredTradesmen: 14200,
      avgContractValue: "£14,800",
      yearOverYearGrowth: "4.6%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "air-conditioning"]
    },
    landmarks: ["Silverstone Circuit", "Althorp House", "Rockingham Castle"],
    seoKeywords: ["Northamptonshire tradesman finance", "Northampton contractor loans", "Corby equipment finance"]
  },
  "northumberland": {
    name: "Northumberland",
    slug: "northumberland",
    region: "North East England",
    description: "Rural county with tourism, agriculture and renewable energy",
    longDescription: "Northumberland's dramatic landscapes and Dark Sky Park status drive a growing tourism sector while renewable energy projects and agricultural modernization create opportunities for forward-thinking tradesmen in England's most northerly county.",
    towns: ["Alnwick", "Ashington", "Berwick-on-Tweed", "Cramlington", "Haltwhistle", "Hexham", "Morpeth", "Prudhoe"],
    population: 322000,
    area: "5,013",
    economicFacts: [
      "Northumberland Dark Sky Park tourism",
      "Hadrian's Wall heritage tourism",
      "Growing renewable energy sector",
      "Strong agricultural economy",
      "Cramlington business park growth"
    ],
    economicData: {
      gdpContribution: "£6 billion",
      keyIndustries: ["Tourism", "Agriculture", "Renewable Energy", "Manufacturing", "Healthcare"],
      employmentRate: "73%",
      constructionSpend: "£280 million"
    },
    tradeStatistics: {
      registeredTradesmen: 5800,
      avgContractValue: "£13,200",
      yearOverYearGrowth: "3.8%",
      topTrades: ["builder", "electrician", "plumber", "heating-engineer", "roofer"]
    },
    landmarks: ["Alnwick Castle", "Hadrian's Wall", "Bamburgh Castle"],
    seoKeywords: ["Northumberland tradesman finance", "Alnwick contractor loans", "Hexham equipment finance"]
  },
  "nottinghamshire": {
    name: "Nottinghamshire",
    slug: "nottinghamshire",
    region: "East Midlands",
    description: "Mining heritage with manufacturing, pharma and logistics",
    longDescription: "Nottinghamshire's transformation from coalfields to modern economy creates diverse opportunities for tradesmen. Nottingham's growing tech sector, major pharma presence, and logistics growth ensure consistent demand for skilled professionals.",
    towns: ["Mansfield", "Newark", "Nottingham", "Retford", "Sutton-in-Ashfield", "Worksop"],
    population: 828000,
    area: "2,085",
    economicFacts: [
      "Major pharmaceutical manufacturing hub",
      "Nottingham tech and creative sector growth",
      "Strong logistics and distribution",
      "Universities driving innovation",
      "Healthcare and life sciences development"
    ],
    economicData: {
      gdpContribution: "£22 billion",
      keyIndustries: ["Pharmaceuticals", "Manufacturing", "Logistics", "Technology", "Healthcare"],
      employmentRate: "74%",
      businessGrowthRate: "4.2%",
      constructionSpend: "£720 million"
    },
    tradeStatistics: {
      registeredTradesmen: 16500,
      avgContractValue: "£14,500",
      yearOverYearGrowth: "4.4%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "air-conditioning"]
    },
    landmarks: ["Nottingham Castle", "Sherwood Forest", "Wollaton Hall"],
    seoKeywords: ["Nottinghamshire tradesman finance", "Nottingham contractor loans", "Mansfield equipment finance"]
  },
  "oxfordshire": {
    name: "Oxfordshire",
    slug: "oxfordshire",
    region: "South East England",
    description: "Motorsport and academic excellence with tech sector",
    longDescription: "Oxfordshire combines world-class academia with motorsport excellence and a thriving tech sector. From Oxford's dreaming spires to Silverstone's racing pedigree, the county offers tradesmen premium opportunities in a growing market.",
    towns: ["Abingdon", "Banbury", "Bicester", "Didcot", "Henley-on-Thames", "Oxford", "Thame", "Wallingford", "Wantage", "Witney"],
    population: 691000,
    area: "2,605",
    economicFacts: [
      "Oxford University spinout companies",
      "Science Vale innovation corridor",
      "Motorsport Valley headquarters",
      "Strong biotech and life sciences",
      "Bicester Village retail destination"
    ],
    economicData: {
      gdpContribution: "£26 billion",
      keyIndustries: ["Education & Research", "Technology", "Motorsport", "Life Sciences", "Retail"],
      employmentRate: "80%",
      businessGrowthRate: "5.1%",
      constructionSpend: "£780 million"
    },
    tradeStatistics: {
      registeredTradesmen: 14500,
      avgContractValue: "£19,500",
      yearOverYearGrowth: "5.3%",
      topTrades: ["electrician", "plumber", "builder", "carpenter", "heating-engineer"]
    },
    landmarks: ["Oxford University", "Blenheim Palace", "Henley Regatta"],
    seoKeywords: ["Oxfordshire tradesman finance", "Oxford contractor loans", "Banbury equipment finance"]
  },
  "somerset": {
    name: "Somerset",
    slug: "somerset",
    region: "South West England",
    description: "Agriculture, food processing and tourism",
    longDescription: "Somerset's rolling countryside and historic cities create opportunities in agriculture, food processing, and tourism. From Bath's Georgian restoration market to Glastonbury's festival infrastructure, the county offers tradesmen diverse project types.",
    towns: ["Bath", "Bridgwater", "Burnham-on-Sea", "Chard", "Frome", "Glastonbury", "Minehead", "Shepton Mallet", "Street", "Taunton", "Wells", "Weston-super-Mare", "Yeovil"],
    population: 560000,
    area: "4,171",
    economicFacts: [
      "Bath World Heritage tourism",
      "Hinkley Point C nuclear construction",
      "Strong aerospace and defence sector",
      "Cider and food production heritage",
      "Growing creative industries"
    ],
    economicData: {
      gdpContribution: "£13 billion",
      keyIndustries: ["Tourism", "Energy", "Aerospace", "Agriculture", "Manufacturing"],
      employmentRate: "76%",
      constructionSpend: "£580 million"
    },
    tradeStatistics: {
      registeredTradesmen: 11500,
      avgContractValue: "£14,800",
      yearOverYearGrowth: "4.8%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Bath Roman Baths", "Glastonbury Tor", "Wells Cathedral"],
    seoKeywords: ["Somerset tradesman finance", "Bath contractor loans", "Taunton equipment finance"]
  },
  "staffordshire": {
    name: "Staffordshire",
    slug: "staffordshire",
    region: "West Midlands",
    description: "Potteries with ceramics, manufacturing and brewing heritage",
    longDescription: "Staffordshire's proud industrial heritage continues with ceramics, brewing, and manufacturing. The county's central location and growing logistics sector create opportunities for tradesmen across commercial, industrial, and residential projects.",
    towns: ["Burton-on-Trent", "Cannock", "Leek", "Lichfield", "Newcastle-under-Lyme", "Rugeley", "Stafford", "Stoke-on-Trent", "Stone", "Tamworth", "Uttoxeter"],
    population: 875000,
    area: "2,713",
    economicFacts: [
      "Historic Potteries ceramics industry",
      "Burton brewing heritage and modern production",
      "Alton Towers tourism employer",
      "Growing logistics sector",
      "JCB headquarters at Rocester"
    ],
    economicData: {
      gdpContribution: "£18 billion",
      keyIndustries: ["Manufacturing", "Ceramics", "Brewing", "Logistics", "Tourism"],
      employmentRate: "75%",
      constructionSpend: "£620 million"
    },
    tradeStatistics: {
      registeredTradesmen: 17200,
      avgContractValue: "£13,200",
      yearOverYearGrowth: "3.9%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Alton Towers", "Lichfield Cathedral", "Wedgwood Visitor Centre"],
    seoKeywords: ["Staffordshire tradesman finance", "Stoke contractor loans", "Stafford equipment finance"]
  },
  "suffolk": {
    name: "Suffolk",
    slug: "suffolk",
    region: "East of England",
    description: "Agricultural and maritime heritage with growing tech sector",
    longDescription: "Suffolk's stunning coastline and agricultural heritage combine with growing tech and renewable energy sectors. The Port of Felixstowe and regional tourism create diverse opportunities for quality-focused tradesmen.",
    towns: ["Beccles", "Bungay", "Bury St Edmunds", "Felixstowe", "Haverhill", "Ipswich", "Lowestoft", "Mildenhall", "Newmarket", "Stowmarket", "Sudbury"],
    population: 761000,
    area: "3,801",
    economicFacts: [
      "Port of Felixstowe - UK's largest container port",
      "Strong agricultural sector",
      "Growing offshore energy hub",
      "BT Research at Martlesham",
      "Horse racing industry at Newmarket"
    ],
    economicData: {
      gdpContribution: "£17 billion",
      keyIndustries: ["Port & Logistics", "Agriculture", "Technology", "Energy", "Tourism"],
      employmentRate: "77%",
      constructionSpend: "£520 million"
    },
    tradeStatistics: {
      registeredTradesmen: 14200,
      avgContractValue: "£14,200",
      yearOverYearGrowth: "4.2%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Sutton Hoo", "Framlingham Castle", "Southwold Pier"],
    seoKeywords: ["Suffolk tradesman finance", "Ipswich contractor loans", "Bury St Edmunds equipment finance"]
  },
  "surrey": {
    name: "Surrey",
    slug: "surrey",
    region: "South East England",
    description: "Affluent commuter belt with tech, aerospace and pharmaceuticals",
    longDescription: "Surrey's position as one of England's most affluent counties creates premium opportunities for quality-focused tradesmen. The county's mix of executive homes, corporate headquarters, and tech sector ensures consistent high-value work.",
    towns: ["Camberley", "Caterham", "Cobham", "Dorking", "Epsom", "Esher", "Farnham", "Godalming", "Guildford", "Haslemere", "Leatherhead", "Redhill", "Reigate", "Staines", "Sunbury-on-Thames", "Walton-on-Thames", "Weybridge", "Woking"],
    population: 1190000,
    area: "1,663",
    economicFacts: [
      "UK's most affluent county outside London",
      "Major tech corridor through Guildford",
      "McLaren and other F1 teams",
      "Strong pharmaceutical sector",
      "Premium residential market"
    ],
    economicData: {
      gdpContribution: "£45 billion",
      keyIndustries: ["Technology", "Motorsport", "Pharmaceuticals", "Financial Services", "Aerospace"],
      employmentRate: "81%",
      businessGrowthRate: "4.5%",
      constructionSpend: "£1.3 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 24500,
      avgContractValue: "£24,500",
      yearOverYearGrowth: "4.8%",
      topTrades: ["electrician", "plumber", "builder", "carpenter", "heating-engineer"]
    },
    landmarks: ["Hampton Court Palace", "Box Hill", "RHS Wisley"],
    seoKeywords: ["Surrey tradesman finance", "Guildford contractor loans", "Woking equipment finance"]
  },
  "tyne-and-wear": {
    name: "Tyne & Wear",
    slug: "tyne-and-wear",
    region: "North East England",
    description: "Newcastle metro with tech, digital and offshore energy sectors",
    longDescription: "Tyne and Wear's transformation from shipbuilding heartland to digital and energy hub creates exciting opportunities for tradesmen. Major regeneration, offshore energy, and university growth drive demand across the Newcastle metropolitan area.",
    towns: ["Gateshead", "Newcastle upon Tyne", "North Shields", "South Shields", "Sunderland", "Washington", "Whitley Bay"],
    population: 1140000,
    area: "538",
    economicFacts: [
      "Newcastle tech and digital hub",
      "Major offshore energy sector",
      "University city driving innovation",
      "Nissan manufacturing in Sunderland",
      "Growing cultural and creative industries"
    ],
    economicData: {
      gdpContribution: "£24 billion",
      keyIndustries: ["Technology", "Offshore Energy", "Automotive", "Healthcare", "Education"],
      employmentRate: "71%",
      businessGrowthRate: "4.6%",
      constructionSpend: "£780 million"
    },
    tradeStatistics: {
      registeredTradesmen: 21500,
      avgContractValue: "£14,500",
      yearOverYearGrowth: "4.8%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Angel of the North", "Newcastle Quayside", "Hadrian's Wall"],
    seoKeywords: ["Tyne and Wear tradesman finance", "Newcastle contractor loans", "Sunderland equipment finance"]
  },
  "warwickshire": {
    name: "Warwickshire",
    slug: "warwickshire",
    region: "West Midlands",
    description: "Shakespeare country with automotive, aerospace and logistics",
    longDescription: "Warwickshire's central location at the heart of England's motorway network makes it ideal for automotive and logistics sectors. From Stratford's tourism to Leamington's tech growth, the county offers tradesmen diverse opportunities.",
    towns: ["Alcester", "Atherstone", "Kenilworth", "Leamington Spa", "Nuneaton", "Rugby", "Southam", "Stratford-upon-Avon", "Warwick"],
    population: 571000,
    area: "1,975",
    economicFacts: [
      "JLR engineering centre at Gaydon",
      "Stratford-upon-Avon tourism",
      "Leamington tech and gaming hub",
      "Major logistics corridor",
      "Warwick University innovation"
    ],
    economicData: {
      gdpContribution: "£15 billion",
      keyIndustries: ["Automotive", "Technology", "Tourism", "Logistics", "Manufacturing"],
      employmentRate: "78%",
      businessGrowthRate: "4.4%",
      constructionSpend: "£480 million"
    },
    tradeStatistics: {
      registeredTradesmen: 11500,
      avgContractValue: "£15,800",
      yearOverYearGrowth: "4.6%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "carpenter"]
    },
    landmarks: ["Warwick Castle", "Shakespeare's Birthplace", "Kenilworth Castle"],
    seoKeywords: ["Warwickshire tradesman finance", "Leamington Spa contractor loans", "Stratford equipment finance"]
  },
  "west-midlands": {
    name: "West Midlands",
    slug: "west-midlands",
    region: "West Midlands",
    description: "Birmingham metro area - UK's automotive and manufacturing heartland",
    longDescription: "The West Midlands metropolitan area centres on Birmingham, the UK's second city and manufacturing powerhouse. Major regeneration, HS2 development, and automotive excellence create exceptional opportunities for ambitious tradesmen.",
    towns: ["Birmingham", "Coventry", "Dudley", "Halesowen", "Solihull", "Stourbridge", "Walsall", "West Bromwich", "Wolverhampton"],
    population: 2920000,
    area: "902",
    economicFacts: [
      "HS2 major construction and regeneration",
      "JLR headquarters and manufacturing",
      "Birmingham city centre transformation",
      "Growing tech and fintech sector",
      "Major healthcare and life sciences"
    ],
    economicData: {
      gdpContribution: "£72 billion",
      keyIndustries: ["Automotive", "Manufacturing", "Financial Services", "Healthcare", "Technology"],
      employmentRate: "72%",
      businessGrowthRate: "4.8%",
      constructionSpend: "£3.2 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 62000,
      avgContractValue: "£15,800",
      yearOverYearGrowth: "5.4%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "air-conditioning"]
    },
    landmarks: ["Birmingham Bullring", "Cadbury World", "Black Country Museum"],
    seoKeywords: ["West Midlands tradesman finance", "Birmingham contractor loans", "Coventry equipment finance"]
  },
  "west-sussex": {
    name: "West Sussex",
    slug: "west-sussex",
    region: "South East England",
    description: "South coast with aerospace, hospitality and agriculture",
    longDescription: "West Sussex combines Gatwick Airport's commercial hub with coastal resort towns and South Downs countryside. The county's diverse economy and affluent population create opportunities for quality-focused tradesmen across sectors.",
    towns: ["Arundel", "Bognor Regis", "Burgess Hill", "Chichester", "Crawley", "East Grinstead", "Haywards Heath", "Horsham", "Littlehampton", "Midhurst", "Petworth", "Pulborough", "Shoreham-by-Sea", "Worthing"],
    population: 867000,
    area: "1,991",
    economicFacts: [
      "Gatwick Airport major employer",
      "Strong aerospace sector",
      "Chichester Festival Theatre",
      "Growing tech corridor",
      "South Downs wine industry"
    ],
    economicData: {
      gdpContribution: "£24 billion",
      keyIndustries: ["Aviation", "Technology", "Tourism", "Healthcare", "Manufacturing"],
      employmentRate: "79%",
      businessGrowthRate: "4.2%",
      constructionSpend: "£720 million"
    },
    tradeStatistics: {
      registeredTradesmen: 17500,
      avgContractValue: "£17,200",
      yearOverYearGrowth: "4.5%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Arundel Castle", "Goodwood", "South Downs National Park"],
    seoKeywords: ["West Sussex tradesman finance", "Crawley contractor loans", "Worthing equipment finance"]
  },
  "west-yorkshire": {
    name: "West Yorkshire",
    slug: "west-yorkshire",
    region: "Yorkshire and the Humber",
    description: "Industrial powerhouse with Leeds, Bradford and textile heritage",
    longDescription: "West Yorkshire's transformation from textile mills to financial services and digital industries creates diverse opportunities for tradesmen. Leeds' position as a major financial centre, combined with regeneration across the region, ensures strong demand.",
    towns: ["Batley", "Bingley", "Bradford", "Brighouse", "Dewsbury", "Halifax", "Huddersfield", "Keighley", "Leeds", "Mirfield", "Morley", "Ossett", "Pontefract", "Pudsey", "Shipley", "Todmorden", "Wakefield", "Wetherby"],
    population: 2320000,
    area: "2,029",
    economicFacts: [
      "Leeds major financial services hub",
      "Growing digital and tech sector",
      "University research and innovation",
      "Major healthcare employment",
      "Cultural and creative industries"
    ],
    economicData: {
      gdpContribution: "£52 billion",
      keyIndustries: ["Financial Services", "Technology", "Healthcare", "Manufacturing", "Creative Industries"],
      employmentRate: "73%",
      businessGrowthRate: "4.5%",
      constructionSpend: "£1.8 billion"
    },
    tradeStatistics: {
      registeredTradesmen: 45000,
      avgContractValue: "£14,800",
      yearOverYearGrowth: "5.1%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Leeds City Centre", "Saltaire", "Yorkshire Sculpture Park"],
    seoKeywords: ["West Yorkshire tradesman finance", "Leeds contractor loans", "Bradford equipment finance"]
  },
  "wiltshire": {
    name: "Wiltshire",
    slug: "wiltshire",
    region: "South West England",
    description: "Defence sector with aerospace, electronics and agriculture",
    longDescription: "Wiltshire's concentration of military bases and defence contractors creates unique opportunities for tradesmen with security clearance. The county's mix of high-tech industry and historic market towns offers diverse project types.",
    towns: ["Amesbury", "Calne", "Chippenham", "Devizes", "Malmesbury", "Marlborough", "Melksham", "Salisbury", "Swindon", "Trowbridge", "Warminster", "Westbury"],
    population: 515000,
    area: "3,485",
    economicFacts: [
      "Major defence sector concentration",
      "Dyson technology headquarters",
      "Honda manufacturing (transitioning)",
      "Strong agricultural sector",
      "Stonehenge tourism"
    ],
    economicData: {
      gdpContribution: "£14 billion",
      keyIndustries: ["Defence", "Technology", "Manufacturing", "Agriculture", "Tourism"],
      employmentRate: "78%",
      constructionSpend: "£480 million"
    },
    tradeStatistics: {
      registeredTradesmen: 10500,
      avgContractValue: "£15,500",
      yearOverYearGrowth: "4.2%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Stonehenge", "Salisbury Cathedral", "Longleat"],
    seoKeywords: ["Wiltshire tradesman finance", "Swindon contractor loans", "Salisbury equipment finance"]
  },
  "worcestershire": {
    name: "Worcestershire",
    slug: "worcestershire",
    region: "West Midlands",
    description: "Agriculture, food processing and manufacturing",
    longDescription: "Worcestershire's fertile valleys and market towns combine with growing manufacturing and tech sectors. The county's quality of life and excellent transport links attract businesses and create opportunities for skilled tradesmen.",
    towns: ["Bewdley", "Bromsgrove", "Droitwich", "Evesham", "Kidderminster", "Malvern", "Pershore", "Redditch", "Stourport-on-Severn", "Worcester"],
    population: 592000,
    area: "1,741",
    economicFacts: [
      "Worcester Bosch major employer",
      "Strong food and beverage sector",
      "Growing cyber security cluster",
      "Malvern Hills Area of Outstanding Natural Beauty",
      "Defence technology at QinetiQ"
    ],
    economicData: {
      gdpContribution: "£13 billion",
      keyIndustries: ["Manufacturing", "Food & Beverage", "Technology", "Agriculture", "Defence"],
      employmentRate: "77%",
      constructionSpend: "£420 million"
    },
    tradeStatistics: {
      registeredTradesmen: 11800,
      avgContractValue: "£14,500",
      yearOverYearGrowth: "4.1%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Worcester Cathedral", "Malvern Hills", "Croome Court"],
    seoKeywords: ["Worcestershire tradesman finance", "Worcester contractor loans", "Redditch equipment finance"]
  },
  "north-yorkshire": {
    name: "North Yorkshire",
    slug: "north-yorkshire",
    region: "Yorkshire and the Humber",
    description: "Yorkshire Dales and Moors with tourism and agriculture",
    longDescription: "North Yorkshire's stunning national parks and historic cities create a thriving tourism economy alongside traditional agriculture. From York's heritage market to Harrogate's spa town affluence, the county offers quality opportunities for tradesmen.",
    towns: ["Harrogate", "Knaresborough", "Malton", "Northallerton", "Pickering", "Richmond", "Ripon", "Scarborough", "Selby", "Settle", "Skipton", "Thirsk", "Whitby", "York"],
    population: 618000,
    area: "8,654",
    economicFacts: [
      "York historic tourism destination",
      "Harrogate spa and conference town",
      "Strong agricultural sector",
      "Growing food and beverage industry",
      "Two national parks driving tourism"
    ],
    economicData: {
      gdpContribution: "£15 billion",
      keyIndustries: ["Tourism", "Agriculture", "Food & Beverage", "Financial Services", "Healthcare"],
      employmentRate: "77%",
      constructionSpend: "£520 million"
    },
    tradeStatistics: {
      registeredTradesmen: 12500,
      avgContractValue: "£14,200",
      yearOverYearGrowth: "4.3%",
      topTrades: ["builder", "electrician", "plumber", "heating-engineer", "roofer"]
    },
    landmarks: ["York Minster", "Yorkshire Dales", "North York Moors"],
    seoKeywords: ["North Yorkshire tradesman finance", "York contractor loans", "Harrogate equipment finance"]
  },
  "south-yorkshire": {
    name: "South Yorkshire",
    slug: "south-yorkshire",
    region: "Yorkshire and the Humber",
    description: "Sheffield city region with steel, engineering and advanced manufacturing",
    longDescription: "South Yorkshire's proud steel heritage continues with world-leading advanced manufacturing and materials research. Sheffield's position as an engineering powerhouse, combined with major regeneration, creates excellent opportunities for skilled tradesmen.",
    towns: ["Barnsley", "Doncaster", "Rotherham", "Sheffield"],
    population: 1410000,
    area: "1,552",
    economicFacts: [
      "Sheffield world-leading materials research",
      "Advanced Manufacturing Research Centre",
      "Doncaster logistics hub",
      "Strong healthcare sector",
      "Growing digital and creative industries"
    ],
    economicData: {
      gdpContribution: "£28 billion",
      keyIndustries: ["Advanced Manufacturing", "Healthcare", "Logistics", "Technology", "Creative Industries"],
      employmentRate: "71%",
      businessGrowthRate: "4.3%",
      constructionSpend: "£980 million"
    },
    tradeStatistics: {
      registeredTradesmen: 26500,
      avgContractValue: "£13,800",
      yearOverYearGrowth: "4.7%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Sheffield Winter Garden", "Magna Science Centre", "Doncaster Racecourse"],
    seoKeywords: ["South Yorkshire tradesman finance", "Sheffield contractor loans", "Doncaster equipment finance"]
  },
  // City regions (standalone)
  "belfast": {
    name: "Belfast",
    slug: "belfast",
    region: "Northern Ireland",
    description: "Northern Ireland's capital with aerospace, cyber security and creative industries",
    longDescription: "Belfast's remarkable transformation has created a thriving economy in aerospace, cyber security, and creative industries. Major regeneration projects and growing tech sector offer tradesmen exciting opportunities in Northern Ireland's capital.",
    towns: ["Belfast"],
    population: 345000,
    area: "115",
    economicFacts: [
      "Bombardier aerospace major employer",
      "Growing cyber security hub",
      "Game of Thrones production legacy",
      "Titanic Quarter regeneration",
      "Major university city"
    ],
    economicData: {
      gdpContribution: "£9.5 billion",
      keyIndustries: ["Aerospace", "Cyber Security", "Creative Industries", "Financial Services", "Healthcare"],
      employmentRate: "70%",
      constructionSpend: "£580 million"
    },
    tradeStatistics: {
      registeredTradesmen: 7800,
      avgContractValue: "£14,200",
      yearOverYearGrowth: "5.2%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Titanic Belfast", "Belfast City Hall", "Ulster Museum"],
    seoKeywords: ["Belfast tradesman finance", "Northern Ireland contractor loans", "Belfast equipment finance"]
  },
  "bristol": {
    name: "Bristol",
    slug: "bristol",
    region: "South West England",
    description: "Creative and tech hub with aerospace, financial services and green energy",
    longDescription: "Bristol's vibrant creative scene and tech sector make it one of the UK's most dynamic cities. Major aerospace presence, growing green energy industry, and constant regeneration create exceptional opportunities for forward-thinking tradesmen.",
    towns: ["Bristol"],
    population: 465000,
    area: "110",
    economicFacts: [
      "Airbus and Rolls-Royce aerospace",
      "Growing fintech and tech sector",
      "Strong creative and media industries",
      "Leading green city initiatives",
      "Major university city"
    ],
    economicData: {
      gdpContribution: "£15 billion",
      keyIndustries: ["Aerospace", "Technology", "Creative Industries", "Financial Services", "Green Energy"],
      employmentRate: "77%",
      businessGrowthRate: "4.8%",
      constructionSpend: "£720 million"
    },
    tradeStatistics: {
      registeredTradesmen: 9500,
      avgContractValue: "£17,500",
      yearOverYearGrowth: "5.4%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "air-conditioning"]
    },
    landmarks: ["Clifton Suspension Bridge", "SS Great Britain", "Bristol Harbourside"],
    seoKeywords: ["Bristol tradesman finance", "Bristol contractor loans", "Bristol equipment finance"]
  },
  "cardiff": {
    name: "Cardiff",
    slug: "cardiff",
    region: "Wales",
    description: "Welsh capital with media, financial services and government",
    longDescription: "Cardiff's position as Welsh capital and media hub creates diverse opportunities for tradesmen. Major BBC and media production, financial services growth, and government investment ensure consistent demand for skilled professionals.",
    towns: ["Cardiff"],
    population: 370000,
    area: "140",
    economicFacts: [
      "BBC Wales and S4C headquarters",
      "Growing financial services sector",
      "Welsh Government and public sector",
      "Major events and hospitality",
      "University city driving innovation"
    ],
    economicData: {
      gdpContribution: "£12 billion",
      keyIndustries: ["Media & Broadcasting", "Financial Services", "Public Sector", "Healthcare", "Education"],
      employmentRate: "73%",
      constructionSpend: "£520 million"
    },
    tradeStatistics: {
      registeredTradesmen: 8200,
      avgContractValue: "£14,500",
      yearOverYearGrowth: "4.6%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Cardiff Castle", "Millennium Stadium", "Cardiff Bay"],
    seoKeywords: ["Cardiff tradesman finance", "Welsh contractor loans", "Cardiff equipment finance"]
  },
  "edinburgh": {
    name: "Edinburgh",
    slug: "edinburgh",
    region: "Scotland",
    description: "Scottish capital with financial services, festivals and tourism",
    longDescription: "Edinburgh's stunning architecture and cultural prominence create a unique market for tradesmen. The Scottish capital's financial services sector, world-famous festivals, and tourism infrastructure ensure year-round opportunities for skilled professionals.",
    towns: ["Edinburgh"],
    population: 540000,
    area: "264",
    economicFacts: [
      "UK's second largest financial centre",
      "Edinburgh Festival world-famous events",
      "Strong tech and fintech growth",
      "Major tourism destination",
      "Scottish Government base"
    ],
    economicData: {
      gdpContribution: "£22 billion",
      keyIndustries: ["Financial Services", "Technology", "Tourism", "Education", "Public Sector"],
      employmentRate: "76%",
      businessGrowthRate: "4.2%",
      constructionSpend: "£780 million"
    },
    tradeStatistics: {
      registeredTradesmen: 11500,
      avgContractValue: "£18,500",
      yearOverYearGrowth: "4.8%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Edinburgh Castle", "Royal Mile", "Arthur's Seat"],
    seoKeywords: ["Edinburgh tradesman finance", "Scottish capital contractor loans", "Edinburgh equipment finance"]
  },
  "glasgow": {
    name: "Glasgow",
    slug: "glasgow",
    region: "Scotland",
    description: "Scotland's largest city with engineering, creative industries and regeneration",
    longDescription: "Glasgow's industrial heritage and cultural renaissance create diverse opportunities for tradesmen. Major regeneration, growing creative and tech sectors, and the city's position as Scotland's commercial capital ensure strong demand for skilled professionals.",
    towns: ["Glasgow"],
    population: 635000,
    area: "175",
    economicFacts: [
      "Scotland's largest commercial centre",
      "Strong creative and media sector",
      "Major regeneration programmes",
      "Growing tech and fintech hub",
      "Shipbuilding and engineering heritage"
    ],
    economicData: {
      gdpContribution: "£21 billion",
      keyIndustries: ["Financial Services", "Creative Industries", "Technology", "Healthcare", "Manufacturing"],
      employmentRate: "72%",
      businessGrowthRate: "4.5%",
      constructionSpend: "£920 million"
    },
    tradeStatistics: {
      registeredTradesmen: 13500,
      avgContractValue: "£15,500",
      yearOverYearGrowth: "5.1%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Glasgow Cathedral", "Kelvingrove Museum", "Riverside Museum"],
    seoKeywords: ["Glasgow tradesman finance", "Glasgow contractor loans", "Glasgow equipment finance"]
  },
  "newcastle": {
    name: "Newcastle",
    slug: "newcastle",
    region: "North East England",
    description: "North East hub with tech, digital and offshore energy sectors",
    longDescription: "Newcastle's transformation into a digital and tech hub creates exciting opportunities for tradesmen. Combined with offshore energy expertise and university innovation, the city offers a dynamic market for skilled professionals.",
    towns: ["Newcastle"],
    population: 302000,
    area: "113",
    economicFacts: [
      "Growing tech and digital hub",
      "Major offshore energy sector",
      "University city driving innovation",
      "Strong healthcare and life sciences",
      "Cultural regeneration and tourism"
    ],
    economicData: {
      gdpContribution: "£8 billion",
      keyIndustries: ["Technology", "Offshore Energy", "Healthcare", "Education", "Creative Industries"],
      employmentRate: "71%",
      constructionSpend: "£420 million"
    },
    tradeStatistics: {
      registeredTradesmen: 6500,
      avgContractValue: "£14,200",
      yearOverYearGrowth: "4.9%",
      topTrades: ["electrician", "plumber", "builder", "heating-engineer", "roofer"]
    },
    landmarks: ["Tyne Bridge", "Newcastle Castle", "BALTIC Centre"],
    seoKeywords: ["Newcastle tradesman finance", "Newcastle contractor loans", "Newcastle equipment finance"]
  }
};

// Helper functions

// Get all county slugs
export function getAllCountySlugs(): string[] {
  return Object.keys(counties);
}

// Get county by slug
export function getCountyBySlug(slug: string): County | undefined {
  return counties[slug];
}

// Get all towns for a county
export function getTownsByCounty(countySlug: string): string[] {
  return counties[countySlug]?.towns || [];
}

// Get all town slugs for all counties (for static generation)
export function getAllTownParams(): { county: string; town: string }[] {
  const params: { county: string; town: string }[] = [];

  for (const [countySlug, county] of Object.entries(counties)) {
    for (const town of county.towns) {
      params.push({
        county: countySlug,
        town: townToSlug(town)
      });
    }
  }

  return params;
}

// Get county and town info from slugs
export function getLocationInfo(countySlug: string, townSlug: string): { county: County; townName: string } | null {
  const county = counties[countySlug];
  if (!county) return null;

  const townName = county.towns.find(t => townToSlug(t) === townSlug);
  if (!townName) return null;

  return { county, townName };
}

// Calculate total towns across all counties
export function getTotalTowns(): number {
  return Object.values(counties).reduce((total, county) => total + county.towns.length, 0);
}

// Get regions with their counties
export function getRegions(): Record<string, string[]> {
  const regions: Record<string, string[]> = {};

  for (const county of Object.values(counties)) {
    if (!regions[county.region]) {
      regions[county.region] = [];
    }
    regions[county.region].push(county.slug);
  }

  return regions;
}

// Get counties by region
export function getCountiesByRegion(region: string): County[] {
  return Object.values(counties).filter(county => county.region === region);
}

// Get top counties by tradesman count
export function getTopCountiesByTradesmen(limit: number = 10): County[] {
  return Object.values(counties)
    .sort((a, b) => b.tradeStatistics.registeredTradesmen - a.tradeStatistics.registeredTradesmen)
    .slice(0, limit);
}

// Get counties with highest growth rate
export function getFastestGrowingCounties(limit: number = 10): County[] {
  return Object.values(counties)
    .sort((a, b) => {
      const growthA = parseFloat(a.tradeStatistics.yearOverYearGrowth);
      const growthB = parseFloat(b.tradeStatistics.yearOverYearGrowth);
      return growthB - growthA;
    })
    .slice(0, limit);
}

// Get nearby counties (simple region-based proximity)
export function getNearbyCounties(countySlug: string, limit: number = 5): County[] {
  const county = counties[countySlug];
  if (!county) return [];

  return Object.values(counties)
    .filter(c => c.slug !== countySlug && c.region === county.region)
    .slice(0, limit);
}

// Format population with commas
export function formatPopulation(population?: number): string {
  if (!population) return "N/A";
  return population.toLocaleString();
}

// Get total UK tradesman count
export function getTotalUKTradesmen(): number {
  return Object.values(counties).reduce(
    (total, county) => total + county.tradeStatistics.registeredTradesmen,
    0
  );
}

// Get average contract value across UK
export function getAverageContractValue(): string {
  const values = Object.values(counties).map(county => {
    const value = county.tradeStatistics.avgContractValue.replace(/[£,]/g, "");
    return parseInt(value, 10);
  });
  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  return `£${Math.round(average).toLocaleString()}`;
}

// Generate location-specific SEO content
export function generateLocationSEOTitle(countySlug: string, tradeName: string): string {
  const county = counties[countySlug];
  if (!county) return `${tradeName} Finance | Tradesman Finance`;
  return `${tradeName} Finance in ${county.name} | Equipment Loans & Business Finance`;
}

export function generateLocationSEODescription(countySlug: string, tradeName: string): string {
  const county = counties[countySlug];
  if (!county) return `Get competitive ${tradeName.toLowerCase()} finance rates with Tradesman Finance.`;

  const stats = county.tradeStatistics;
  return `${tradeName} finance in ${county.name}. Join ${stats.registeredTradesmen.toLocaleString()} registered tradesmen. Average contract value ${stats.avgContractValue}. Fast approval, competitive rates.`;
}

// Get meta data for location
export function getLocationMeta(): CountiesData["meta"] {
  return {
    version: "2.0.0",
    lastUpdated: new Date().toISOString(),
    totalCounties: Object.keys(counties).length,
    totalTowns: getTotalTowns()
  };
}
