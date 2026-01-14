/**
 * Equipment Brands Data
 * Shared data for equipment finance pages and internal linking components
 */

export interface EquipmentBrand {
  slug: string;
  name: string;
  description: string;
  category: string;
  popularProducts: string[];
  trades: string[];
  avgFinanceAmount: string;
}

export const equipmentBrands: EquipmentBrand[] = [
  {
    slug: 'festool',
    name: 'Festool',
    description: 'Premium German power tools renowned for precision and durability. Finance your Festool equipment with competitive rates.',
    category: 'Power Tools',
    popularProducts: ['Track Saws', 'Sanders', 'Routers', 'Dust Extractors', 'Jigsaws'],
    trades: ['Carpenter', 'Joiner', 'Shop Fitter', 'Kitchen Fitter'],
    avgFinanceAmount: '£5,000 - £15,000',
  },
  {
    slug: 'makita',
    name: 'Makita',
    description: 'Industry-leading power tools trusted by tradesmen worldwide. Get Makita equipment finance with flexible payment options.',
    category: 'Power Tools',
    popularProducts: ['Cordless Drills', 'Circular Saws', 'Impact Drivers', 'Batteries', 'Multi-tools'],
    trades: ['Electrician', 'Plumber', 'Builder', 'Carpenter'],
    avgFinanceAmount: '£2,000 - £10,000',
  },
  {
    slug: 'fluke',
    name: 'Fluke',
    description: 'Professional test and measurement equipment for electrical contractors. Finance Fluke meters and testing equipment.',
    category: 'Test Equipment',
    popularProducts: ['Multimeters', 'Clamp Meters', 'Thermal Imagers', 'Insulation Testers', 'Power Analysers'],
    trades: ['Electrician', 'Heating Engineer', 'Air Conditioning'],
    avgFinanceAmount: '£1,000 - £8,000',
  },
  {
    slug: 'megger',
    name: 'Megger',
    description: 'Specialist electrical testing equipment for UK standards compliance. Finance Megger test equipment for your business.',
    category: 'Test Equipment',
    popularProducts: ['Multifunction Testers', 'Insulation Testers', 'Earth Testers', 'PAT Testers', 'Cable Locators'],
    trades: ['Electrician', 'Heating Engineer'],
    avgFinanceAmount: '£2,000 - £10,000',
  },
  {
    slug: 'ridgid',
    name: 'RIDGID',
    description: 'Professional plumbing and drain cleaning equipment. Finance RIDGID tools to expand your plumbing business.',
    category: 'Plumbing Tools',
    popularProducts: ['Pipe Cutters', 'Threading Machines', 'Drain Cameras', 'Press Tools', 'Drain Machines'],
    trades: ['Plumber', 'Heating Engineer', 'Drainage'],
    avgFinanceAmount: '£3,000 - £15,000',
  },
  {
    slug: 'rothenberger',
    name: 'Rothenberger',
    description: 'German-engineered plumbing and HVAC tools. Get Rothenberger equipment finance for professional-grade tools.',
    category: 'Plumbing Tools',
    popularProducts: ['Pipe Freezers', 'Soldering Tools', 'Press Fitting Tools', 'Drain Cleaners', 'Pipe Benders'],
    trades: ['Plumber', 'Heating Engineer', 'Gas Engineer'],
    avgFinanceAmount: '£2,000 - £12,000',
  },
];

// Helper to get equipment by slug
export function getEquipmentBySlug(slug: string): EquipmentBrand | undefined {
  return equipmentBrands.find((brand) => brand.slug === slug);
}

// Helper to get all equipment slugs
export function getAllEquipmentSlugs(): string[] {
  return equipmentBrands.map((brand) => brand.slug);
}
