/**
 * Enhanced Trade Data for TradesmanFinance.co.uk
 * Includes FAQs, equipment categories, testimonials, and statistics for SEO
 */

export interface EquipmentCategory {
  name: string;
  items: string[];
  priceRange: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  business: string;
  location: string;
  loanAmount: string;
  rating: number;
}

export interface TradeStatistics {
  avgLoanAmount: number;
  approvalRate: string;
  processingTime: string;
  activeTradesmen: string;
  avgTermMonths: number;
}

export interface Trade {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  keywords: string[];
  equipmentExamples: string[];
  avgLoanAmount: string;
  iconName: string;
  emoji: string;
  equipmentCategories: EquipmentCategory[];
  certifications: string[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  statistics: TradeStatistics;
  relatedTrades: string[];
}

export const trades: Trade[] = [
  {
    name: "Electrician",
    slug: "electrician",
    description: "Electrical contractors providing installation, maintenance, and repair services for residential and commercial properties.",
    longDescription: "Whether you're a sole trader sparky or running a team of electrical contractors, we provide tailored finance solutions for test equipment, vans, and business expansion. From Fluke multimeters to thermal imaging cameras, get the equipment you need to grow your electrical business.",
    keywords: ["electrical contractor finance", "electrician business loan", "electrical equipment loan", "test equipment finance", "NICEIC electrician finance", "Part P electrician loan"],
    equipmentExamples: ["Fluke multimeters", "Cable testers", "Thermal imaging cameras", "Vans and vehicles"],
    avgLoanAmount: "£25,000 - £1,000,000",
    iconName: "Zap",
    emoji: "⚡",
    equipmentCategories: [
      {
        name: "Test Equipment",
        items: ["Fluke multimeters", "Megger insulation testers", "PAT testers", "Loop impedance testers", "RCD testers"],
        priceRange: "£500 - £5,000",
        description: "Essential testing equipment for electrical certification and compliance"
      },
      {
        name: "Installation Tools",
        items: ["SDS drills", "Cable pulling equipment", "Crimping tools", "Heat guns", "Cable cutters"],
        priceRange: "£200 - £2,000",
        description: "Professional-grade tools for electrical installations"
      },
      {
        name: "Diagnostic Equipment",
        items: ["Thermal imaging cameras", "Power quality analyzers", "Cable fault locators", "Earth resistance testers"],
        priceRange: "£1,000 - £10,000",
        description: "Advanced diagnostic tools for troubleshooting and maintenance"
      },
      {
        name: "Vehicles",
        items: ["Transit Custom vans", "Berlingo vans", "Caddy vans", "Fully fitted tool vans"],
        priceRange: "£15,000 - £45,000",
        description: "Work vehicles with optional fit-out for tools and equipment"
      }
    ],
    certifications: ["NICEIC", "NAPIT", "ELECSA", "Part P Registered", "ECA Member", "18th Edition"],
    faqs: [
      {
        question: "What equipment can electricians finance?",
        answer: "Electricians can finance test equipment (Fluke, Megger), installation tools, thermal imaging cameras, vans, and workshop equipment. Most professional electrical equipment qualifies for finance from £1,000 upwards."
      },
      {
        question: "Do I need to be NICEIC registered to get finance?",
        answer: "No, you don't need NICEIC registration to apply for finance. However, being registered with NICEIC, NAPIT, or ELECSA can strengthen your application and may help you access better rates."
      },
      {
        question: "Can I finance a van with tool fit-out included?",
        answer: "Yes, we can finance complete van packages including the vehicle and internal racking/fit-out as a single finance agreement. This is often more cost-effective than separate purchases."
      },
      {
        question: "How quickly can I get finance for test equipment?",
        answer: "Most test equipment finance applications receive a decision within 4 hours. Once approved, funds can typically be released within 24-48 hours, allowing you to purchase equipment quickly."
      },
      {
        question: "What credit score do electricians need for finance?",
        answer: "We work with electricians across all credit profiles. While better credit scores may access lower rates, we have options for those with poor credit history, CCJs, or limited trading history."
      }
    ],
    testimonials: [
      {
        quote: "Needed to upgrade all my test equipment for the 18th Edition requirements. Got approved in 4 hours and had the money in my account the next day. Brilliant service.",
        name: "Dave M.",
        business: "DM Electrical Services",
        location: "Manchester",
        loanAmount: "£8,500",
        rating: 5
      },
      {
        quote: "Financed my first van through Tradesman Finance when I went self-employed. They understood my situation as a new business and found me a great deal.",
        name: "James K.",
        business: "JK Electrical",
        location: "Birmingham",
        loanAmount: "£22,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 35000,
      approvalRate: "92%",
      processingTime: "4 hours",
      activeTradesmen: "45,000+",
      avgTermMonths: 36
    },
    relatedTrades: ["heating-engineer", "air-conditioning", "builder"]
  },
  {
    name: "Plumber",
    slug: "plumber",
    description: "Plumbing professionals offering installation and maintenance of water systems, heating, and drainage.",
    longDescription: "From drain cameras to press fitting tools, we help plumbers invest in the equipment that makes jobs faster and more profitable. Finance solutions for vans, diagnostic equipment, and workshop machinery tailored to the plumbing trade.",
    keywords: ["plumber finance", "plumbing equipment loan", "van finance for plumbers", "drain camera finance", "Gas Safe plumber loan"],
    equipmentExamples: ["Pipe threading machines", "Drain cameras", "Press fitting tools", "Work vans"],
    avgLoanAmount: "£25,000 - £500,000",
    iconName: "Droplets",
    emoji: "🔧",
    equipmentCategories: [
      {
        name: "Diagnostic Equipment",
        items: ["Drain cameras", "Pipe locators", "Thermal imaging", "Leak detection equipment", "Borescopes"],
        priceRange: "£500 - £8,000",
        description: "Find problems fast with professional diagnostic tools"
      },
      {
        name: "Installation Tools",
        items: ["Press fitting tools (Rothenberger, REMS)", "Pipe threading machines", "Pipe freezing kits", "Soldering equipment"],
        priceRange: "£1,000 - £5,000",
        description: "Speed up installations with the right professional tools"
      },
      {
        name: "Clearance Equipment",
        items: ["High-pressure jetters", "Electric drain machines", "Manual drain rods", "Pump equipment"],
        priceRange: "£500 - £15,000",
        description: "Equipment for drainage clearing and maintenance"
      },
      {
        name: "Vehicles",
        items: ["Transit vans", "Partner vans", "Fully equipped service vans", "Welfare vehicles"],
        priceRange: "£12,000 - £40,000",
        description: "Reliable work vehicles for the mobile plumber"
      }
    ],
    certifications: ["Gas Safe", "OFTEC", "CIPHE", "WaterSafe", "Unvented Cylinder"],
    faqs: [
      {
        question: "Can I finance a drain camera and jetter together?",
        answer: "Yes, we can combine multiple equipment items into a single finance agreement. This often provides better monthly payments than financing items separately."
      },
      {
        question: "Do I need Gas Safe registration to get plumbing finance?",
        answer: "Gas Safe registration isn't required for general plumbing finance. It's only needed if you're financing gas-related equipment and intend to work on gas installations."
      },
      {
        question: "What's the minimum trading history required?",
        answer: "We can consider plumbers with as little as 6 months trading history. Newer businesses may need a small deposit, but we have options for most situations."
      },
      {
        question: "Can I finance Rothenberger press fitting tools?",
        answer: "Absolutely. Rothenberger, REMS, and other professional press fitting systems are commonly financed. We can include batteries, jaws, and carrying cases in the same agreement."
      }
    ],
    testimonials: [
      {
        quote: "The drain camera I financed has already paid for itself three times over. Should have done it years ago!",
        name: "Paul T.",
        business: "PT Plumbing Solutions",
        location: "Leeds",
        loanAmount: "£4,200",
        rating: 5
      },
      {
        quote: "Upgraded my whole van setup - Rothenberger press fittings, new racking, the lot. Monthly payments are less than I expected.",
        name: "Mike S.",
        business: "Swift Plumbing",
        location: "Bristol",
        loanAmount: "£12,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 32000,
      approvalRate: "91%",
      processingTime: "4 hours",
      activeTradesmen: "38,000+",
      avgTermMonths: 36
    },
    relatedTrades: ["heating-engineer", "bathroom-fitter", "builder"]
  },
  {
    name: "Builder",
    slug: "builder",
    description: "General builders and construction contractors handling residential and commercial building projects.",
    longDescription: "Whether you need a mini excavator, concrete mixer, or a fleet of transit vans, we provide flexible finance for builders of all sizes. From sole traders to construction companies, get the equipment and capital to take on bigger projects.",
    keywords: ["builder finance", "construction equipment loan", "builder business loan", "excavator finance", "construction working capital"],
    equipmentExamples: ["Excavators", "Concrete mixers", "Scaffolding", "Power tools"],
    avgLoanAmount: "£25,000 - £1,000,000",
    iconName: "Building",
    emoji: "🏗️",
    equipmentCategories: [
      {
        name: "Plant & Machinery",
        items: ["Mini excavators (1-8 tonne)", "Dumpers", "Concrete mixers", "Compactors", "Telehandlers"],
        priceRange: "£8,000 - £80,000",
        description: "Heavy machinery for construction and groundworks"
      },
      {
        name: "Access Equipment",
        items: ["Scaffolding systems", "Mobile towers", "Cherry pickers", "Ladders and steps"],
        priceRange: "£2,000 - £30,000",
        description: "Safe access solutions for working at height"
      },
      {
        name: "Power Tools",
        items: ["Cordless tool kits (Makita, DeWalt)", "Diamond drilling", "Breakers", "Cut-off saws"],
        priceRange: "£500 - £5,000",
        description: "Professional power tools for every construction task"
      },
      {
        name: "Vehicles & Plant Transport",
        items: ["Tipper trucks", "Transit vans", "Flatbed trucks", "Plant trailers"],
        priceRange: "£15,000 - £60,000",
        description: "Vehicles for materials and plant transport"
      }
    ],
    certifications: ["FMB Member", "NHBC Registered", "CITB", "CSCS Card", "Construction Line"],
    faqs: [
      {
        question: "Can I finance a mini excavator for my building business?",
        answer: "Yes, mini excavators are one of our most popular items for builders. We finance new and used machines from all major manufacturers including JCB, Kubota, and Takeuchi."
      },
      {
        question: "Do you offer finance for larger construction projects?",
        answer: "We provide working capital loans up to £500,000 for established construction businesses. This can cover materials, subcontractor costs, and cash flow during larger projects."
      },
      {
        question: "Can I get finance without a personal guarantee?",
        answer: "For established businesses with strong financials, we may be able to offer unsecured finance up to certain limits. Most applications will require a personal guarantee from directors."
      },
      {
        question: "What if I need equipment quickly for a project?",
        answer: "We understand construction timelines. Most equipment finance applications get a decision same-day, and we can often release funds within 24-48 hours for urgent requirements."
      }
    ],
    testimonials: [
      {
        quote: "Financed a 3-tonne Kubota excavator that's transformed my business. Taking on jobs I had to turn down before.",
        name: "Steve R.",
        business: "SR Building & Construction",
        location: "London",
        loanAmount: "£35,000",
        rating: 5
      },
      {
        quote: "Got £50k working capital to take on a commercial extension. The process was straightforward and the team really understood construction.",
        name: "Tony B.",
        business: "TB Construction Ltd",
        location: "Manchester",
        loanAmount: "£50,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 35000,
      approvalRate: "89%",
      processingTime: "Same day",
      activeTradesmen: "65,000+",
      avgTermMonths: 48
    },
    relatedTrades: ["groundworker", "bricklayer", "roofer", "scaffolder"]
  },
  {
    name: "Carpenter",
    slug: "carpenter",
    description: "Skilled carpenters and joiners specializing in woodwork, fitting, and furniture making.",
    longDescription: "From table saws to CNC routers, we help carpenters and joiners invest in workshop machinery that increases productivity and opens up new opportunities. Finance for everything from hand tools to complete workshop fit-outs.",
    keywords: ["carpenter finance", "woodworking equipment loan", "joinery equipment finance", "workshop machinery finance", "CNC router finance"],
    equipmentExamples: ["Table saws", "CNC routers", "Planers", "Workshop machinery"],
    avgLoanAmount: "£25,000 - £750,000",
    iconName: "Hammer",
    emoji: "🪚",
    equipmentCategories: [
      {
        name: "Stationary Machinery",
        items: ["Table saws (Festool, Makita)", "Planer thicknessers", "Bandsaws", "Spindle moulders", "Mortisers"],
        priceRange: "£2,000 - £15,000",
        description: "Workshop machinery for professional joinery"
      },
      {
        name: "CNC & Digital",
        items: ["CNC routers", "Laser cutters", "Edge banders", "CAD workstations"],
        priceRange: "£10,000 - £60,000",
        description: "Advanced digital fabrication equipment"
      },
      {
        name: "Portable Power Tools",
        items: ["Track saws", "Biscuit joiners", "Router systems", "Cordless tool kits"],
        priceRange: "£500 - £5,000",
        description: "High-quality portable tools for site and workshop"
      },
      {
        name: "Dust Extraction",
        items: ["Workshop extractors", "Mobile extractors", "Dust collection systems", "Air filtration"],
        priceRange: "£500 - £8,000",
        description: "Essential dust extraction for health and safety"
      }
    ],
    certifications: ["Guild of Master Craftsmen", "BWF Member", "City & Guilds", "FIRA Gold"],
    faqs: [
      {
        question: "Can I finance a CNC router for my joinery business?",
        answer: "Yes, CNC routers are increasingly popular for financing. We can fund machines from entry-level 3-axis routers to advanced 5-axis systems, including installation and training costs."
      },
      {
        question: "Is Festool equipment available on finance?",
        answer: "Absolutely. Festool track saws, sanders, routers, and complete system sets are all eligible for finance. We can also finance the Systainer storage systems."
      },
      {
        question: "Can I include workshop fit-out in my finance?",
        answer: "Yes, we can create packages that include machinery, extraction, workbenches, and even electrical upgrades for your workshop. All in one manageable monthly payment."
      },
      {
        question: "Do you finance second-hand woodworking machinery?",
        answer: "We do finance quality used machinery, typically up to 7 years old. The equipment needs to be in good working condition and sourced from reputable dealers."
      }
    ],
    testimonials: [
      {
        quote: "The Festool track saw system I financed has made site work so much cleaner and faster. Best investment I've made.",
        name: "Chris W.",
        business: "CW Carpentry",
        location: "Oxford",
        loanAmount: "£3,500",
        rating: 5
      },
      {
        quote: "Took the plunge on a CNC router. Scary amount of money but the finance made it manageable. Now producing work I never could before.",
        name: "Alan D.",
        business: "Precision Joinery Ltd",
        location: "Sheffield",
        loanAmount: "£45,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 38000,
      approvalRate: "90%",
      processingTime: "4 hours",
      activeTradesmen: "28,000+",
      avgTermMonths: 36
    },
    relatedTrades: ["builder", "flooring-contractor", "shop-fitter"]
  },
  {
    name: "Heating Engineer",
    slug: "heating-engineer",
    description: "Gas Safe registered engineers providing boiler installation, servicing, and central heating solutions.",
    longDescription: "Stay competitive with the latest diagnostic equipment, power flush machines, and a reliable van. We understand the heating industry and provide finance solutions that help Gas Safe engineers grow their businesses.",
    keywords: ["heating engineer finance", "boiler installation finance", "gas engineer equipment loan", "Gas Safe engineer finance", "power flush machine finance"],
    equipmentExamples: ["Flue gas analyzers", "Pipe freezing kits", "Power flush machines", "Service vans"],
    avgLoanAmount: "£25,000 - £350,000",
    iconName: "Flame",
    emoji: "🔥",
    equipmentCategories: [
      {
        name: "Diagnostic Equipment",
        items: ["Flue gas analyzers (Kane, Testo)", "Combustion analyzers", "Carbon monoxide detectors", "Manometers"],
        priceRange: "£300 - £2,000",
        description: "Essential gas analysis and safety equipment"
      },
      {
        name: "Installation Tools",
        items: ["Pipe freezing kits", "Press fitting tools", "Soldering equipment", "Bending equipment"],
        priceRange: "£500 - £3,000",
        description: "Professional tools for heating installations"
      },
      {
        name: "Maintenance Equipment",
        items: ["Power flush machines (Kamco, Fernox)", "Magnetic filters", "Chemical dosing equipment", "Pressure testing"],
        priceRange: "£1,000 - £5,000",
        description: "Equipment for system maintenance and cleaning"
      },
      {
        name: "Vehicles",
        items: ["Service vans", "Fully equipped heating vans", "Parts storage systems"],
        priceRange: "£12,000 - £35,000",
        description: "Reliable transport with space for parts and tools"
      }
    ],
    certifications: ["Gas Safe Registered", "OFTEC", "HETAS", "MCS Certified", "Worcester Accredited"],
    faqs: [
      {
        question: "Do I need to be Gas Safe registered to get finance?",
        answer: "Yes, for gas-related equipment finance, you'll need to provide your Gas Safe registration number. This protects both you and your customers."
      },
      {
        question: "Can I finance training courses for new qualifications?",
        answer: "Yes, we can include training costs in your finance package. This is popular for engineers adding renewable qualifications like MCS certification."
      },
      {
        question: "What power flush machines can be financed?",
        answer: "All major brands including Kamco, Fernox, and Adey are eligible. We can also finance chemical stocks and magnetic filter systems alongside the machine."
      },
      {
        question: "Is there finance available for renewable heating equipment?",
        answer: "Absolutely. With the growth in heat pumps and renewable heating, we're seeing more engineers finance specialist tools for installation and maintenance of these systems."
      }
    ],
    testimonials: [
      {
        quote: "Financed a Kamco power flush machine and it's booked solid. Paid for itself in the first few months.",
        name: "Gary H.",
        business: "GH Heating Services",
        location: "Newcastle",
        loanAmount: "£3,800",
        rating: 5
      },
      {
        quote: "Upgraded to a new Testo flue gas analyzer and a fully kitted van. Monthly payment is very manageable.",
        name: "Rob C.",
        business: "RC Plumbing & Heating",
        location: "Glasgow",
        loanAmount: "£28,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 32000,
      approvalRate: "93%",
      processingTime: "4 hours",
      activeTradesmen: "32,000+",
      avgTermMonths: 36
    },
    relatedTrades: ["plumber", "air-conditioning", "electrician"]
  },
  {
    name: "Roofer",
    slug: "roofer",
    description: "Roofing contractors specializing in roof installation, repair, and maintenance for all property types.",
    longDescription: "From scaffolding systems to roofing nailers, we provide finance for the equipment that keeps roofing contractors safe and productive. Whether you're pitched, flat, or specialist roofing, we have finance solutions to match.",
    keywords: ["roofer finance", "roofing equipment loan", "roofing business loan", "scaffolding finance", "roofing contractor finance"],
    equipmentExamples: ["Scaffolding", "Roofing nailers", "Ladders and access equipment", "Material hoists"],
    avgLoanAmount: "£25,000 - £1,000,000",
    iconName: "Home",
    emoji: "🏠",
    equipmentCategories: [
      {
        name: "Access Equipment",
        items: ["Scaffolding systems", "Roof ladders", "Eaves ladders", "Mobile towers", "Safety netting"],
        priceRange: "£2,000 - £25,000",
        description: "Safe access solutions for roofing work"
      },
      {
        name: "Power Tools",
        items: ["Roofing nailers", "Slate cutters", "Hot air welders", "Impact drivers"],
        priceRange: "£300 - £3,000",
        description: "Professional roofing power tools"
      },
      {
        name: "Material Handling",
        items: ["Tile elevators", "Material hoists", "Roofing barrows", "Sheet lifters"],
        priceRange: "£1,000 - £15,000",
        description: "Equipment for moving materials safely"
      },
      {
        name: "Vehicles",
        items: ["Tipper trucks", "Transit vans", "Flatbed vehicles", "Material trailers"],
        priceRange: "£15,000 - £50,000",
        description: "Vehicles for transporting materials and tools"
      }
    ],
    certifications: ["NFRC Member", "Competent Roofer", "TrustMark", "CORC Member", "SPRA Member"],
    faqs: [
      {
        question: "Can I finance a scaffolding system for my roofing business?",
        answer: "Yes, scaffolding is one of our most common items for roofers. We can finance complete systems from manufacturers like HAKI, Layher, and PERI."
      },
      {
        question: "Do you finance tile elevators and hoists?",
        answer: "Absolutely. Tile elevators significantly improve productivity and safety. We can finance equipment from Bumpa, Genie, and other manufacturers."
      },
      {
        question: "Can I get finance for both equipment and a vehicle?",
        answer: "Yes, we can combine equipment and vehicle finance into a single package. This often provides better terms than separate agreements."
      },
      {
        question: "What credit history do roofers typically need?",
        answer: "We work with roofers across all credit profiles. While better credit may access lower rates, we have options for those with adverse credit history."
      }
    ],
    testimonials: [
      {
        quote: "Finally invested in proper scaffolding instead of renting. The finance payments are less than I was spending on hire!",
        name: "Kevin M.",
        business: "KM Roofing",
        location: "Liverpool",
        loanAmount: "£18,000",
        rating: 5
      },
      {
        quote: "The tile elevator has transformed big jobs. My lads aren't knackered by lunchtime anymore!",
        name: "Pete S.",
        business: "PS Roofing Contractors",
        location: "Cardiff",
        loanAmount: "£8,500",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 42000,
      approvalRate: "90%",
      processingTime: "4 hours",
      activeTradesmen: "22,000+",
      avgTermMonths: 42
    },
    relatedTrades: ["scaffolder", "builder", "bricklayer"]
  },
  {
    name: "Landscaper",
    slug: "landscaper",
    description: "Landscape gardeners and contractors providing garden design, construction, and maintenance services.",
    longDescription: "From mini excavators to ride-on mowers, we help landscapers invest in machinery that wins bigger contracts and improves profitability. Finance solutions for equipment, vehicles, and business growth.",
    keywords: ["landscaper finance", "landscaping equipment loan", "garden machinery finance", "mini excavator finance", "grounds maintenance finance"],
    equipmentExamples: ["Mini excavators", "Turf cutters", "Ride-on mowers", "Trailers"],
    avgLoanAmount: "£25,000 - £600,000",
    iconName: "Trees",
    emoji: "🌳",
    equipmentCategories: [
      {
        name: "Plant & Machinery",
        items: ["Mini excavators", "Dumpers", "Turf cutters", "Stump grinders", "Chippers"],
        priceRange: "£5,000 - £50,000",
        description: "Heavy machinery for landscaping projects"
      },
      {
        name: "Mowing Equipment",
        items: ["Ride-on mowers", "Zero-turn mowers", "Cylinder mowers", "Robotic mowers"],
        priceRange: "£3,000 - £25,000",
        description: "Professional mowing equipment for all terrain"
      },
      {
        name: "Grounds Maintenance",
        items: ["Leaf blowers", "Hedge trimmers", "Brush cutters", "Aerators", "Scarifiers"],
        priceRange: "£500 - £5,000",
        description: "Equipment for year-round grounds maintenance"
      },
      {
        name: "Vehicles & Trailers",
        items: ["Pickup trucks", "Tipping trailers", "Plant trailers", "Enclosed trailers"],
        priceRange: "£5,000 - £40,000",
        description: "Transport for plant, materials, and green waste"
      }
    ],
    certifications: ["BALI Member", "APL Accredited", "Lantra Qualified", "NPTC Certified"],
    faqs: [
      {
        question: "Can I finance a mini excavator for landscaping?",
        answer: "Yes, mini excavators are popular for landscapers. We finance machines from 0.8 to 8 tonnes from manufacturers like Kubota, JCB, and Takeuchi."
      },
      {
        question: "Do you finance ride-on mowers for grounds maintenance?",
        answer: "Absolutely. We finance ride-on and zero-turn mowers from Husqvarna, John Deere, Kubota, and other major brands."
      },
      {
        question: "Can I finance a complete trailer and equipment package?",
        answer: "Yes, we can bundle trailers with equipment into a single finance package. This is common for landscapers starting out or expanding their fleet."
      },
      {
        question: "Is seasonal payment structure available for landscapers?",
        answer: "We understand landscaping can be seasonal. We can discuss payment structures that account for busier and quieter periods."
      }
    ],
    testimonials: [
      {
        quote: "Went from hiring a mini digger every job to owning my own Kubota. Game changer for my business.",
        name: "Dan L.",
        business: "DL Landscapes",
        location: "Surrey",
        loanAmount: "£28,000",
        rating: 5
      },
      {
        quote: "Financed a Husqvarna rider and chipper together. The monthly payments are easily covered by one new maintenance contract.",
        name: "Mark T.",
        business: "Green Team Landscaping",
        location: "Edinburgh",
        loanAmount: "£15,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 25000,
      approvalRate: "91%",
      processingTime: "4 hours",
      activeTradesmen: "35,000+",
      avgTermMonths: 42
    },
    relatedTrades: ["groundworker", "builder", "fencing"]
  },
  {
    name: "Bricklayer",
    slug: "bricklayer",
    description: "Skilled bricklayers and masons providing structural and decorative brickwork services.",
    longDescription: "From mortar mixers to scaffolding, we help bricklayers invest in equipment that improves productivity on site. Finance solutions for power tools, mixing equipment, and access systems.",
    keywords: ["bricklayer finance", "bricklaying equipment loan", "masonry equipment finance", "brick saw finance", "mortar mixer finance"],
    equipmentExamples: ["Mortar mixers", "Brick saws", "Scaffolding", "Masonry tools"],
    avgLoanAmount: "£25,000 - £500,000",
    iconName: "Brick",
    emoji: "🧱",
    equipmentCategories: [
      {
        name: "Mixing Equipment",
        items: ["Mortar mixers", "Cement mixers", "Plasticizer dosing", "Paddle mixers"],
        priceRange: "£500 - £5,000",
        description: "Efficient mixing equipment for consistent mortar"
      },
      {
        name: "Cutting Equipment",
        items: ["Brick saws", "Block saws", "Angle grinders", "Diamond blades"],
        priceRange: "£300 - £3,000",
        description: "Precision cutting tools for clean brickwork"
      },
      {
        name: "Access Equipment",
        items: ["Scaffolding", "Trestle platforms", "Mobile towers", "Work platforms"],
        priceRange: "£2,000 - £20,000",
        description: "Safe access for working at height"
      },
      {
        name: "Material Handling",
        items: ["Block lifters", "Barrows", "Material hoists", "Brick grabs"],
        priceRange: "£500 - £8,000",
        description: "Equipment for moving heavy materials safely"
      }
    ],
    certifications: ["Guild of Bricklayers", "CSCS Card", "CITB", "NVQ Level 2/3"],
    faqs: [
      {
        question: "Can I finance a brick saw for my bricklaying business?",
        answer: "Yes, brick and block saws from manufacturers like Clipper and Husqvarna are popular items. We can also include blades and consumables in the initial finance."
      },
      {
        question: "Do you finance scaffolding for bricklayers?",
        answer: "Absolutely. Many bricklayers find that owning scaffolding rather than hiring saves money over time. We can finance complete systems from major manufacturers."
      },
      {
        question: "What's the typical approval time for bricklayer finance?",
        answer: "Most applications receive a decision within 4 hours. For straightforward equipment finance, we can often complete the process same-day."
      },
      {
        question: "Can I get finance as a self-employed bricklayer?",
        answer: "Yes, we work with self-employed bricklayers regularly. We'll typically need 6+ months of trading history and bank statements to support your application."
      }
    ],
    testimonials: [
      {
        quote: "The brick saw I financed is so much faster than the old one. Cleaner cuts mean happier customers.",
        name: "Phil W.",
        business: "PW Brickwork",
        location: "Nottingham",
        loanAmount: "£2,800",
        rating: 5
      },
      {
        quote: "Bought my own scaffold set instead of renting. Already saved money after just 6 months.",
        name: "John C.",
        business: "JC Masonry",
        location: "York",
        loanAmount: "£12,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 35000,
      approvalRate: "90%",
      processingTime: "4 hours",
      activeTradesmen: "18,000+",
      avgTermMonths: 36
    },
    relatedTrades: ["builder", "plasterer", "roofer"]
  },
  {
    name: "Plasterer",
    slug: "plasterer",
    description: "Professional plasterers providing internal and external plastering, rendering, and decorative finishes.",
    longDescription: "From spray plastering machines to mixing equipment, we help plasterers invest in technology that speeds up jobs and improves finish quality. Finance for equipment, vehicles, and business expansion.",
    keywords: ["plasterer finance", "plastering equipment loan", "rendering equipment finance", "spray plaster machine finance"],
    equipmentExamples: ["Plastering machines", "Mixers", "Scaffolding", "Spray equipment"],
    avgLoanAmount: "£25,000 - £300,000",
    iconName: "PaintBucket",
    emoji: "🎨",
    equipmentCategories: [
      {
        name: "Spray Equipment",
        items: ["Plastering machines (PFT, Putzmeister)", "Rendering machines", "Texture sprayers"],
        priceRange: "£5,000 - £25,000",
        description: "Machine application for faster coverage"
      },
      {
        name: "Mixing Equipment",
        items: ["Forced action mixers", "Paddle mixers", "Continuous mixers"],
        priceRange: "£500 - £5,000",
        description: "Consistent mixing for quality finishes"
      },
      {
        name: "Access Equipment",
        items: ["Stilts", "Scaffolding", "Mobile towers", "Trestles"],
        priceRange: "£200 - £8,000",
        description: "Safe access for ceiling and high wall work"
      },
      {
        name: "Hand Tools",
        items: ["Professional trowel sets", "Floats", "Darby boards", "Corner tools"],
        priceRange: "£100 - £1,000",
        description: "Quality hand tools for precision finishing"
      }
    ],
    certifications: ["Federation of Plastering and Drywall Contractors", "NVQ Level 2/3", "CSCS Card"],
    faqs: [
      {
        question: "Can I finance a plastering machine like PFT?",
        answer: "Yes, spray plastering machines from PFT, Putzmeister, and other manufacturers are popular for finance. We can include hoses, guns, and spare parts."
      },
      {
        question: "Is finance available for rendering equipment?",
        answer: "Absolutely. External rendering machines and silicone render application equipment are all eligible for finance."
      },
      {
        question: "What deposit is typically needed for plastering equipment?",
        answer: "Depending on your circumstances, you may not need any deposit. For those with limited credit history, a 10-20% deposit may be requested."
      }
    ],
    testimonials: [
      {
        quote: "The PFT machine was a big investment but it's halved my time on larger jobs. Finance made it possible.",
        name: "Lee R.",
        business: "LR Plastering",
        location: "Derby",
        loanAmount: "£18,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 30000,
      approvalRate: "91%",
      processingTime: "4 hours",
      activeTradesmen: "15,000+",
      avgTermMonths: 30
    },
    relatedTrades: ["builder", "painter-decorator", "tiler"]
  },
  {
    name: "Tiler",
    slug: "tiler",
    description: "Professional tilers specializing in wall and floor tiling for bathrooms, kitchens, and commercial spaces.",
    longDescription: "From wet tile saws to laser levels, we provide finance for the equipment that helps tilers deliver perfect results. Finance solutions for power tools, cutting equipment, and vehicles.",
    keywords: ["tiler finance", "tiling equipment loan", "tile cutting equipment finance", "wet saw finance"],
    equipmentExamples: ["Wet tile saws", "Laser levels", "Tile cutters", "Mixing equipment"],
    avgLoanAmount: "£25,000 - £200,000",
    iconName: "Grid3X3",
    emoji: "🔲",
    equipmentCategories: [
      {
        name: "Cutting Equipment",
        items: ["Wet tile saws", "Manual tile cutters", "Angle grinders", "Diamond hole cutters"],
        priceRange: "£200 - £3,000",
        description: "Precision cutting for all tile types"
      },
      {
        name: "Setting Out",
        items: ["Laser levels", "Spirit levels", "Measuring tools", "Layout systems"],
        priceRange: "£100 - £800",
        description: "Accurate setting out for professional results"
      },
      {
        name: "Mixing & Application",
        items: ["Paddle mixers", "Adhesive applicators", "Grouting tools", "Leveling systems"],
        priceRange: "£100 - £1,000",
        description: "Tools for efficient application"
      },
      {
        name: "Vehicles",
        items: ["Vans with racking", "Tile carriers", "Tool storage systems"],
        priceRange: "£12,000 - £30,000",
        description: "Transport and storage for tiles and tools"
      }
    ],
    certifications: ["TTA Member", "NVQ Tiling", "CITB", "Manufacturers Certified"],
    faqs: [
      {
        question: "Can I finance a professional wet tile saw?",
        answer: "Yes, wet saws from Rubi, Sigma, and other manufacturers are commonly financed. We can include stands and blade packages."
      },
      {
        question: "Do you finance tile leveling systems?",
        answer: "While individual leveling systems may be too small for finance, we can include them as part of a larger equipment package."
      },
      {
        question: "What's the minimum amount for tiling equipment finance?",
        answer: "Our minimum is £1,000, but for smaller amounts, we can combine multiple items into a single finance agreement."
      }
    ],
    testimonials: [
      {
        quote: "Upgraded from a cheap saw to a proper Rubi. The difference in cut quality and speed is night and day.",
        name: "Tom K.",
        business: "TK Tiling",
        location: "Brighton",
        loanAmount: "£2,200",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 28000,
      approvalRate: "92%",
      processingTime: "4 hours",
      activeTradesmen: "12,000+",
      avgTermMonths: 24
    },
    relatedTrades: ["bathroom-fitter", "plasterer", "flooring-contractor"]
  },
  {
    name: "Painter & Decorator",
    slug: "painter-decorator",
    description: "Professional painters and decorators providing interior and exterior painting and decorating services.",
    longDescription: "From airless sprayers to access platforms, we help painters and decorators invest in equipment that wins bigger contracts. Finance for spray equipment, scaffolding, and vehicles.",
    keywords: ["painter decorator finance", "decorating equipment loan", "spray painting equipment finance", "airless sprayer finance"],
    equipmentExamples: ["Airless sprayers", "Scaffolding", "Sanders", "Access platforms"],
    avgLoanAmount: "£25,000 - £250,000",
    iconName: "Paintbrush",
    emoji: "🖌️",
    equipmentCategories: [
      {
        name: "Spray Equipment",
        items: ["Airless sprayers (Graco, Wagner)", "HVLP systems", "Spray guns", "Hose sets"],
        priceRange: "£500 - £8,000",
        description: "Professional spray application equipment"
      },
      {
        name: "Surface Preparation",
        items: ["Electric sanders", "Dust-free sanding systems", "Steam strippers", "Heat guns"],
        priceRange: "£200 - £2,000",
        description: "Efficient surface preparation tools"
      },
      {
        name: "Access Equipment",
        items: ["Mobile scaffolds", "Podium steps", "Telescopic ladders", "Cherry pickers"],
        priceRange: "£500 - £15,000",
        description: "Safe access for all heights"
      },
      {
        name: "Vehicles",
        items: ["Signwritten vans", "Ladder racks", "Internal racking systems"],
        priceRange: "£10,000 - £30,000",
        description: "Professional transport with storage"
      }
    ],
    certifications: ["PDA Member", "Dulux Select Decorator", "Guild of Master Craftsmen"],
    faqs: [
      {
        question: "Can I finance a Graco airless sprayer?",
        answer: "Yes, Graco and Wagner airless sprayers are popular for finance. We can include tips, hoses, and accessories in the package."
      },
      {
        question: "Do you finance dust-free sanding systems?",
        answer: "Absolutely. Mirka and Festool dust-free systems are increasingly popular. We can finance complete systems including extractors."
      },
      {
        question: "Is spray equipment worth financing if I'm just starting out?",
        answer: "Spray equipment can significantly increase your speed on larger jobs. Even for newer decorators, the productivity gains often justify the investment."
      }
    ],
    testimonials: [
      {
        quote: "The Graco sprayer opened up commercial work I couldn't touch before. Best money I've spent on my business.",
        name: "Andy M.",
        business: "AM Decorating",
        location: "Chester",
        loanAmount: "£4,500",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 28000,
      approvalRate: "92%",
      processingTime: "4 hours",
      activeTradesmen: "25,000+",
      avgTermMonths: 30
    },
    relatedTrades: ["plasterer", "tiler", "carpenter"]
  },
  {
    name: "Scaffolder",
    slug: "scaffolder",
    description: "Scaffolding contractors providing safe access solutions for construction and maintenance projects.",
    longDescription: "Whether you're expanding your scaffold stock or buying your first system, we provide finance solutions for scaffolding contractors. From tube and fitting to system scaffolds, and the vehicles to transport it all.",
    keywords: ["scaffolder finance", "scaffolding equipment loan", "scaffold hire finance", "scaffold system finance"],
    equipmentExamples: ["Scaffold systems", "Safety equipment", "Transport vehicles", "Hoists"],
    avgLoanAmount: "£25,000 - £1,000,000",
    iconName: "Layers",
    emoji: "🏗️",
    equipmentCategories: [
      {
        name: "Scaffold Systems",
        items: ["System scaffolds (Layher, HAKI, Cuplok)", "Tube and fitting", "Mobile towers", "Stairway towers"],
        priceRange: "£5,000 - £80,000",
        description: "Complete scaffolding systems for any job"
      },
      {
        name: "Safety Equipment",
        items: ["Safety netting", "Edge protection", "Harnesses", "Fall arrest systems"],
        priceRange: "£500 - £5,000",
        description: "Essential safety equipment for scaffolding work"
      },
      {
        name: "Handling Equipment",
        items: ["Scaffold hoists", "Material lifts", "Trolleys", "Loading systems"],
        priceRange: "£1,000 - £15,000",
        description: "Equipment for efficient scaffold handling"
      },
      {
        name: "Vehicles",
        items: ["Scaffold lorries", "Flatbed trucks", "HIAB vehicles", "Transit vans"],
        priceRange: "£20,000 - £80,000",
        description: "Vehicles for scaffold transport and delivery"
      }
    ],
    certifications: ["NASC Member", "CISRS Card", "PASMA", "SSIP"],
    faqs: [
      {
        question: "Can I finance a Layher or HAKI scaffold system?",
        answer: "Yes, all major system scaffold brands are eligible. We can finance new systems or quality used scaffold from approved suppliers."
      },
      {
        question: "Do you finance scaffold lorries?",
        answer: "Absolutely. From small flatbeds to HIAB vehicles, we finance the transport solutions scaffolders need."
      },
      {
        question: "What's the minimum scaffold purchase you'll finance?",
        answer: "While our minimum is £1,000, most scaffold finance is for larger quantities. We can finance from a few bays to complete systems."
      },
      {
        question: "Can I finance both scaffold and a vehicle together?",
        answer: "Yes, we can create combined packages for scaffold and vehicles. This often provides better terms than separate agreements."
      }
    ],
    testimonials: [
      {
        quote: "Financed 500m of Layher scaffold to grow my business. Now turning over three times what I was before.",
        name: "Dave K.",
        business: "DK Scaffolding",
        location: "London",
        loanAmount: "£65,000",
        rating: 5
      },
      {
        quote: "Started with 100m financed scaffold. Two years later I've bought more. Great relationship with Tradesman Finance.",
        name: "Terry O.",
        business: "T&O Scaffolding",
        location: "Birmingham",
        loanAmount: "£28,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 45000,
      approvalRate: "88%",
      processingTime: "Same day",
      activeTradesmen: "8,000+",
      avgTermMonths: 48
    },
    relatedTrades: ["builder", "roofer", "painter-decorator"]
  },
  {
    name: "Flooring Contractor",
    slug: "flooring-contractor",
    description: "Flooring specialists providing installation of hardwood, laminate, vinyl, and commercial flooring.",
    longDescription: "From floor sanders to moisture meters, we provide finance for flooring contractors. Whether you fit domestic floors or commercial installations, get the equipment you need to deliver perfect results.",
    keywords: ["flooring contractor finance", "flooring equipment loan", "floor sanding equipment finance", "commercial flooring finance"],
    equipmentExamples: ["Floor sanders", "Polishers", "Moisture meters", "Cutting equipment"],
    avgLoanAmount: "£25,000 - £350,000",
    iconName: "Square",
    emoji: "🪵",
    equipmentCategories: [
      {
        name: "Sanding Equipment",
        items: ["Belt sanders", "Edge sanders", "Drum sanders", "Orbital sanders"],
        priceRange: "£1,000 - £10,000",
        description: "Professional sanding equipment for all floor types"
      },
      {
        name: "Finishing Equipment",
        items: ["Floor polishers", "Buffing machines", "Lacquer applicators", "Dust extraction"],
        priceRange: "£500 - £5,000",
        description: "Equipment for professional floor finishes"
      },
      {
        name: "Testing Equipment",
        items: ["Moisture meters", "Hygrometers", "Adhesion testers", "Laser levels"],
        priceRange: "£100 - £1,000",
        description: "Testing equipment for floor preparation"
      },
      {
        name: "Vehicles",
        items: ["Transit vans", "Luton vans", "Flooring delivery vehicles"],
        priceRange: "£12,000 - £35,000",
        description: "Vehicles for equipment and material transport"
      }
    ],
    certifications: ["CFA Member", "NICF Member", "Bona Certified", "Karndean Approved"],
    faqs: [
      {
        question: "Can I finance a complete floor sanding kit?",
        answer: "Yes, we can finance belt sanders, edge sanders, and buffers as a complete package. This is common for flooring contractors starting floor sanding services."
      },
      {
        question: "Do you finance Bona floor finishing equipment?",
        answer: "Absolutely. Bona sanders, finishes, and application equipment are all eligible for finance."
      },
      {
        question: "What's the typical term for flooring equipment finance?",
        answer: "Most flooring equipment is financed over 24-36 months, though we can offer longer terms for larger equipment packages."
      }
    ],
    testimonials: [
      {
        quote: "Invested in a full Bona sanding system. The quality difference compared to my old kit is incredible.",
        name: "Ian S.",
        business: "IS Flooring",
        location: "Reading",
        loanAmount: "£12,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 32000,
      approvalRate: "91%",
      processingTime: "4 hours",
      activeTradesmen: "10,000+",
      avgTermMonths: 30
    },
    relatedTrades: ["carpenter", "tiler", "shop-fitter"]
  },
  {
    name: "Window Fitter",
    slug: "window-fitter",
    description: "Window and door installation specialists providing UPVC, aluminium, and timber window fitting.",
    longDescription: "From glass handling equipment to routers, we help window fitters invest in equipment that makes installations safer and more efficient. Finance for tools, vehicles, and business growth.",
    keywords: ["window fitter finance", "window installation equipment loan", "glazing equipment finance", "UPVC fitting finance"],
    equipmentExamples: ["Glass handling equipment", "Routers", "Installation tools", "Transport vans"],
    avgLoanAmount: "£25,000 - £500,000",
    iconName: "PanelTop",
    emoji: "🪟",
    equipmentCategories: [
      {
        name: "Glass Handling",
        items: ["Vacuum lifters", "Glass carriers", "Suction cups", "Installation trolleys"],
        priceRange: "£500 - £8,000",
        description: "Safe handling equipment for glass and frames"
      },
      {
        name: "Power Tools",
        items: ["Routers", "Multitools", "Impact drivers", "SDS drills"],
        priceRange: "£200 - £2,000",
        description: "Professional installation tools"
      },
      {
        name: "Sealing Equipment",
        items: ["Silicone guns", "Hot melt systems", "Cleaning equipment"],
        priceRange: "£100 - £1,000",
        description: "Sealing and finishing equipment"
      },
      {
        name: "Vehicles",
        items: ["Glass carrying vans", "Frame racks", "Fully equipped fitting vans"],
        priceRange: "£15,000 - £40,000",
        description: "Specialist vehicles for glass and frame transport"
      }
    ],
    certifications: ["FENSA Registered", "CERTASS", "GGF Member", "Glazing Skills Card"],
    faqs: [
      {
        question: "Can I finance a vacuum glass lifter?",
        answer: "Yes, vacuum lifters from manufacturers like Veribor and Grabo are commonly financed. Essential for safe handling of large glazing units."
      },
      {
        question: "Do you finance specialist window fitting vans?",
        answer: "Absolutely. We can finance vehicles with glass racks, frame carriers, and the fit-out required for professional window installation."
      },
      {
        question: "Is FENSA registration required for finance?",
        answer: "While not required for finance, being FENSA or CERTASS registered demonstrates professionalism and can support your application."
      }
    ],
    testimonials: [
      {
        quote: "The vacuum lifter has made such a difference for larger units. Couldn't manage the big jobs safely without it.",
        name: "Steve B.",
        business: "SB Windows & Doors",
        location: "Southampton",
        loanAmount: "£3,500",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 38000,
      approvalRate: "90%",
      processingTime: "4 hours",
      activeTradesmen: "14,000+",
      avgTermMonths: 36
    },
    relatedTrades: ["builder", "carpenter", "shop-fitter"]
  },
  {
    name: "Bathroom Fitter",
    slug: "bathroom-fitter",
    description: "Bathroom installation specialists providing complete bathroom design and fitting services.",
    longDescription: "From plumbing tools to tiling equipment, bathroom fitters need a diverse range of equipment. We provide finance for everything you need to deliver complete bathroom transformations.",
    keywords: ["bathroom fitter finance", "bathroom installation equipment loan", "bathroom fitting tools finance"],
    equipmentExamples: ["Plumbing tools", "Tiling equipment", "Power tools", "Wet room installation kit"],
    avgLoanAmount: "£25,000 - £300,000",
    iconName: "Bath",
    emoji: "🛁",
    equipmentCategories: [
      {
        name: "Plumbing Tools",
        items: ["Press fitting tools", "Pipe cutters", "Soldering equipment", "Testing equipment"],
        priceRange: "£500 - £3,000",
        description: "Plumbing installation equipment"
      },
      {
        name: "Tiling Tools",
        items: ["Wet saws", "Tile cutters", "Grout floats", "Laser levels"],
        priceRange: "£200 - £2,000",
        description: "Tiling installation equipment"
      },
      {
        name: "General Power Tools",
        items: ["Multi-tools", "SDS drills", "Angle grinders", "Jigsaws"],
        priceRange: "£200 - £1,500",
        description: "General installation power tools"
      },
      {
        name: "Wet Room Equipment",
        items: ["Tanking systems", "Linear drain tools", "Waterproofing equipment"],
        priceRange: "£300 - £2,000",
        description: "Specialist wet room installation kit"
      }
    ],
    certifications: ["City & Guilds", "NVQ Plumbing", "Tiling Certification"],
    faqs: [
      {
        question: "Can I finance a complete bathroom fitting toolkit?",
        answer: "Yes, we can bundle plumbing, tiling, and power tools into a single finance package. Ideal for bathroom fitters starting out or upgrading equipment."
      },
      {
        question: "Do you finance wet room installation equipment?",
        answer: "Absolutely. Specialist wet room equipment including tanking systems and linear drain installation tools are eligible."
      },
      {
        question: "What qualifications do I need to get bathroom fitting finance?",
        answer: "No specific qualifications are required, but demonstrating relevant experience and skills will support your application."
      }
    ],
    testimonials: [
      {
        quote: "Upgraded all my bathroom fitting tools in one go. The finance payments are very manageable monthly.",
        name: "Neil P.",
        business: "NP Bathrooms",
        location: "Leicester",
        loanAmount: "£5,500",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 30000,
      approvalRate: "91%",
      processingTime: "4 hours",
      activeTradesmen: "16,000+",
      avgTermMonths: 30
    },
    relatedTrades: ["plumber", "tiler", "electrician"]
  },
  {
    name: "Shop Fitter",
    slug: "shop-fitter",
    description: "Commercial fit-out specialists providing retail, office, and hospitality interior installations.",
    longDescription: "From CNC machines to commercial vehicles, shop fitters need significant equipment investment. We provide finance solutions from workshop machinery to complete fit-out working capital.",
    keywords: ["shop fitter finance", "commercial fit-out loan", "retail fitting equipment finance", "CNC machine finance"],
    equipmentExamples: ["CNC machines", "Workshop equipment", "Transport vehicles", "Installation tools"],
    avgLoanAmount: "£25,000 - £1,000,000",
    iconName: "Store",
    emoji: "🏪",
    equipmentCategories: [
      {
        name: "Workshop Machinery",
        items: ["CNC routers", "Edge banders", "Panel saws", "Spray booths"],
        priceRange: "£10,000 - £80,000",
        description: "Manufacturing equipment for shop fitting"
      },
      {
        name: "Installation Equipment",
        items: ["Power tools", "Laser levels", "Measuring systems", "Fixing equipment"],
        priceRange: "£500 - £5,000",
        description: "On-site installation equipment"
      },
      {
        name: "Transport",
        items: ["Luton vans", "Box trucks", "Flatbed vehicles", "HIAB lorries"],
        priceRange: "£20,000 - £60,000",
        description: "Vehicles for transporting fit-out materials"
      },
      {
        name: "Working Capital",
        items: ["Project finance", "Material purchases", "Subcontractor payments"],
        priceRange: "£25,000 - £150,000",
        description: "Working capital for large fit-out contracts"
      }
    ],
    certifications: ["SafeContractor", "CHAS", "Construction Line", "ISO 9001"],
    faqs: [
      {
        question: "Can you finance CNC machines for shop fitting?",
        answer: "Yes, CNC routers and other workshop machinery are popular for shop fitters. We finance machines from all major manufacturers."
      },
      {
        question: "Do you provide working capital for large contracts?",
        answer: "Absolutely. We can provide working capital finance to help shop fitters take on larger contracts, covering materials and subcontractor costs."
      },
      {
        question: "What's the typical finance amount for shop fitters?",
        answer: "Shop fitters typically finance larger amounts due to machinery and working capital needs. Average loans range from £25,000 to £100,000."
      }
    ],
    testimonials: [
      {
        quote: "The CNC router we financed has transformed what we can produce in-house. Quality is better and lead times are shorter.",
        name: "Richard H.",
        business: "RH Shop Fitting Ltd",
        location: "London",
        loanAmount: "£55,000",
        rating: 5
      },
      {
        quote: "Working capital finance helped us take on a major retail contract. Couldn't have done it without Tradesman Finance.",
        name: "Martin G.",
        business: "Gemini Interiors",
        location: "Manchester",
        loanAmount: "£85,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 55000,
      approvalRate: "87%",
      processingTime: "Same day",
      activeTradesmen: "6,000+",
      avgTermMonths: 48
    },
    relatedTrades: ["carpenter", "electrician", "flooring-contractor"]
  },
  {
    name: "Locksmith",
    slug: "locksmith",
    description: "Security specialists providing lock installation, repair, and emergency access services.",
    longDescription: "From key cutting machines to mobile workshop vans, we help locksmiths invest in equipment that grows their business. Finance for tools, security systems, and vehicles.",
    keywords: ["locksmith finance", "locksmith equipment loan", "security equipment finance", "key cutting machine finance"],
    equipmentExamples: ["Key cutting machines", "Lock picking tools", "Security systems", "Mobile workshop vans"],
    avgLoanAmount: "£25,000 - £250,000",
    iconName: "Lock",
    emoji: "🔐",
    equipmentCategories: [
      {
        name: "Key Cutting",
        items: ["Electronic key machines", "Laser key cutters", "Transponder equipment", "Code machines"],
        priceRange: "£2,000 - £15,000",
        description: "Professional key cutting equipment"
      },
      {
        name: "Entry Tools",
        items: ["Pick sets", "Bypass tools", "Decoders", "Scope equipment"],
        priceRange: "£500 - £3,000",
        description: "Non-destructive entry equipment"
      },
      {
        name: "Security Systems",
        items: ["Safe moving equipment", "Access control tools", "CCTV installation kit"],
        priceRange: "£500 - £5,000",
        description: "Equipment for security installations"
      },
      {
        name: "Mobile Workshop",
        items: ["Fully equipped vans", "Portable workbenches", "Stock systems"],
        priceRange: "£15,000 - £35,000",
        description: "Mobile workshop vehicles for locksmith services"
      }
    ],
    certifications: ["MLA Member", "ALOA Member", "CRB Checked", "SSAIB"],
    faqs: [
      {
        question: "Can I finance a professional key cutting machine?",
        answer: "Yes, key cutting machines from Silca, Keyline, and other manufacturers are commonly financed. We can include software and training costs."
      },
      {
        question: "Do you finance mobile locksmith vans?",
        answer: "Absolutely. We can finance complete mobile workshop setups including the van, equipment, and internal fit-out."
      },
      {
        question: "What's needed to get locksmith equipment finance?",
        answer: "Standard requirements apply - trading history, bank statements, and ID. MLA membership is beneficial but not required."
      }
    ],
    testimonials: [
      {
        quote: "Invested in a proper auto key machine. The extra work it brings in easily covers the finance payments.",
        name: "Carl T.",
        business: "CT Locksmiths",
        location: "Norwich",
        loanAmount: "£8,500",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 32000,
      approvalRate: "90%",
      processingTime: "4 hours",
      activeTradesmen: "4,000+",
      avgTermMonths: 30
    },
    relatedTrades: ["electrician", "window-fitter"]
  },
  {
    name: "Groundworker",
    slug: "groundworker",
    description: "Groundwork contractors providing excavation, foundations, drainage, and site preparation services.",
    longDescription: "From mini excavators to dumpers, groundworkers need serious machinery. We provide finance for plant, equipment, and the vehicles to transport it all.",
    keywords: ["groundworker finance", "groundwork equipment loan", "excavator finance", "plant finance", "drainage equipment finance"],
    equipmentExamples: ["Mini excavators", "Dumpers", "Compactors", "Drainage equipment"],
    avgLoanAmount: "£25,000 - £1,000,000",
    iconName: "Shovel",
    emoji: "⛏️",
    equipmentCategories: [
      {
        name: "Excavators",
        items: ["Micro excavators (0.8t-1.5t)", "Mini excavators (1.5t-8t)", "Midi excavators (8t-13t)"],
        priceRange: "£8,000 - £80,000",
        description: "Excavation machinery for all ground conditions"
      },
      {
        name: "Site Machinery",
        items: ["Dumpers", "Compactors", "Plate compactors", "Rollers"],
        priceRange: "£3,000 - £30,000",
        description: "Essential site preparation machinery"
      },
      {
        name: "Drainage Equipment",
        items: ["Drain laying equipment", "Laser levels", "Pipe cutters", "Testing equipment"],
        priceRange: "£500 - £5,000",
        description: "Drainage installation equipment"
      },
      {
        name: "Transport",
        items: ["Plant trailers", "Low loaders", "Tipper trucks", "Transit vans"],
        priceRange: "£5,000 - £50,000",
        description: "Vehicles for plant and material transport"
      }
    ],
    certifications: ["CPCS Card", "NPORS", "CSCS", "CITB"],
    faqs: [
      {
        question: "Can I finance a mini excavator for groundworks?",
        answer: "Yes, mini excavators are our most popular item for groundworkers. We finance machines from Kubota, JCB, Takeuchi, and all major manufacturers."
      },
      {
        question: "Do you finance new and used plant?",
        answer: "We finance both new and quality used plant. Used machines typically need to be under 7 years old and sourced from approved dealers."
      },
      {
        question: "What's the typical deposit for plant finance?",
        answer: "Depending on your circumstances, you may not need any deposit. For higher-value machines or newer businesses, 10-20% may be requested."
      },
      {
        question: "Can I finance plant and a trailer together?",
        answer: "Yes, we can combine plant and transport into a single finance package. This often provides better terms than separate agreements."
      }
    ],
    testimonials: [
      {
        quote: "Financed a 3-tonne Kubota and a tipping trailer. The monthly payments are less than I was spending on hire.",
        name: "Mike H.",
        business: "MH Groundworks",
        location: "Kent",
        loanAmount: "£42,000",
        rating: 5
      },
      {
        quote: "Started with one digger financed. Now got three and a dumper. Tradesman Finance have been brilliant throughout.",
        name: "Ben L.",
        business: "BL Civil Engineering",
        location: "Bristol",
        loanAmount: "£95,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 40000,
      approvalRate: "89%",
      processingTime: "Same day",
      activeTradesmen: "12,000+",
      avgTermMonths: 48
    },
    relatedTrades: ["builder", "landscaper", "demolition"]
  },
  {
    name: "Demolition",
    slug: "demolition",
    description: "Demolition contractors providing controlled demolition, strip-outs, and site clearance services.",
    longDescription: "Demolition contractors need robust machinery and specialist attachments. We provide finance for excavators, crushers, and all the equipment needed for safe, efficient demolition.",
    keywords: ["demolition contractor finance", "demolition equipment loan", "wrecking equipment finance", "excavator attachments finance"],
    equipmentExamples: ["Excavators with attachments", "Crushers", "Dust suppression", "Safety equipment"],
    avgLoanAmount: "£25,000 - £1,000,000",
    iconName: "Bomb",
    emoji: "💥",
    equipmentCategories: [
      {
        name: "Excavators & Attachments",
        items: ["Demolition excavators", "Hydraulic breakers", "Crushers", "Pulverisers", "Shears"],
        priceRange: "£20,000 - £150,000",
        description: "Primary demolition machinery and attachments"
      },
      {
        name: "Processing Equipment",
        items: ["Crushers", "Screeners", "Magnets", "Recycling equipment"],
        priceRange: "£30,000 - £100,000",
        description: "Material processing and recycling equipment"
      },
      {
        name: "Safety Equipment",
        items: ["Dust suppression", "Water bowsers", "Safety barriers", "Fall protection"],
        priceRange: "£5,000 - £30,000",
        description: "Essential demolition safety equipment"
      },
      {
        name: "Transport",
        items: ["Low loaders", "Articulated trucks", "Grab lorries", "Skip lorries"],
        priceRange: "£40,000 - £150,000",
        description: "Heavy transport for plant and materials"
      }
    ],
    certifications: ["NFDC Member", "NDTG", "CSCS Demolition", "CPCS"],
    faqs: [
      {
        question: "Can I finance a high-reach demolition excavator?",
        answer: "Yes, we finance high-reach excavators and all demolition machinery. We work with established demolition contractors for larger equipment."
      },
      {
        question: "Do you finance crusher attachments?",
        answer: "Absolutely. Crusher buckets, pulverisers, and other attachments can be financed separately or with the host machine."
      },
      {
        question: "What's needed for demolition equipment finance?",
        answer: "We typically need 2+ years trading history for demolition equipment finance due to the specialist nature and higher values involved."
      }
    ],
    testimonials: [
      {
        quote: "Financed a 20-tonne excavator with breaker and crusher. Transformed what jobs we can take on.",
        name: "Jim R.",
        business: "JR Demolition Ltd",
        location: "Midlands",
        loanAmount: "£120,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 75000,
      approvalRate: "85%",
      processingTime: "Same day",
      activeTradesmen: "3,000+",
      avgTermMonths: 60
    },
    relatedTrades: ["groundworker", "builder", "scaffolder"]
  },
  {
    name: "Air Conditioning",
    slug: "air-conditioning",
    description: "HVAC engineers providing air conditioning installation, maintenance, and repair services.",
    longDescription: "With growing demand for air conditioning, now is the time to invest in your HVAC business. Finance for refrigerant equipment, diagnostic tools, and specialist vehicles.",
    keywords: ["air conditioning finance", "HVAC equipment loan", "refrigeration equipment finance", "AC installation finance"],
    equipmentExamples: ["Refrigerant recovery", "Vacuum pumps", "Manifold gauges", "Brazing equipment"],
    avgLoanAmount: "£25,000 - £1,000,000",
    iconName: "Wind",
    emoji: "❄️",
    equipmentCategories: [
      {
        name: "Refrigeration Tools",
        items: ["Recovery units", "Vacuum pumps", "Manifold gauges", "Electronic scales"],
        priceRange: "£500 - £5,000",
        description: "Essential refrigeration servicing tools"
      },
      {
        name: "Installation Equipment",
        items: ["Brazing equipment", "Flaring tools", "Pipe benders", "Nitrogen kits"],
        priceRange: "£300 - £2,000",
        description: "AC system installation equipment"
      },
      {
        name: "Diagnostic Equipment",
        items: ["Leak detectors", "Thermometers", "Anemometers", "Pressure gauges"],
        priceRange: "£200 - £1,500",
        description: "System diagnostic and testing equipment"
      },
      {
        name: "Vehicles",
        items: ["Service vans", "Refrigerant storage vehicles", "Fully equipped AC vans"],
        priceRange: "£15,000 - £40,000",
        description: "Specialist vehicles for AC engineers"
      }
    ],
    certifications: ["F-Gas Certified", "City & Guilds 2079", "REFCOM", "Safe Contractor"],
    faqs: [
      {
        question: "Do I need F-Gas certification to get AC equipment finance?",
        answer: "For refrigerant handling equipment, you'll need to provide your F-Gas certification number. This ensures compliance with environmental regulations."
      },
      {
        question: "Can I finance a complete AC toolkit?",
        answer: "Yes, we can bundle recovery units, vacuum pumps, gauges, and installation tools into a single finance package."
      },
      {
        question: "Is there finance available for AC installation business startup?",
        answer: "Yes, we work with newly F-Gas certified engineers starting their AC businesses. A deposit may be required for newer businesses."
      }
    ],
    testimonials: [
      {
        quote: "Got my F-Gas then financed a complete tool kit. Now doing AC installs I couldn't touch before.",
        name: "Dean W.",
        business: "DW Cooling Services",
        location: "Cambridge",
        loanAmount: "£8,000",
        rating: 5
      }
    ],
    statistics: {
      avgLoanAmount: 35000,
      approvalRate: "91%",
      processingTime: "4 hours",
      activeTradesmen: "8,000+",
      avgTermMonths: 36
    },
    relatedTrades: ["electrician", "heating-engineer", "plumber"]
  }
];

// Helper functions
export function getTradeBySlug(slug: string): Trade | undefined {
  return trades.find(trade => trade.slug === slug);
}

export function getAllTradeSlugs(): string[] {
  return trades.map(trade => trade.slug);
}

export function getRelatedTrades(slug: string): Trade[] {
  const trade = getTradeBySlug(slug);
  if (!trade) return [];
  return trade.relatedTrades
    .map(relatedSlug => getTradeBySlug(relatedSlug))
    .filter((t): t is Trade => t !== undefined);
}

export function getTradesByKeyword(keyword: string): Trade[] {
  const lowerKeyword = keyword.toLowerCase();
  return trades.filter(trade =>
    trade.keywords.some(k => k.toLowerCase().includes(lowerKeyword)) ||
    trade.name.toLowerCase().includes(lowerKeyword) ||
    trade.description.toLowerCase().includes(lowerKeyword)
  );
}

export function getFeaturedTrades(count: number = 8): Trade[] {
  // Return the most popular trades for homepage
  const featuredSlugs = [
    'electrician', 'plumber', 'builder', 'carpenter',
    'heating-engineer', 'roofer', 'landscaper', 'bricklayer'
  ];
  return featuredSlugs
    .slice(0, count)
    .map(slug => getTradeBySlug(slug))
    .filter((t): t is Trade => t !== undefined);
}
