// SiteNavigationElement Schema Component
// Generates schema.org SiteNavigationElement structured data for SEO
// This helps search engines understand the site's main navigation structure

import { JsonLd } from './json-ld';

/**
 * Navigation item definition
 */
export interface NavigationItem {
  name: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
}

/**
 * Main navigation structure for Tradesman Finance
 * This is the source of truth for site navigation schema
 */
export const mainNavigationItems: NavigationItem[] = [
  {
    name: 'Home',
    href: '/',
    description: 'Tradesman Finance UK homepage',
  },
  {
    name: 'Products',
    href: '/products',
    description: 'Finance products for tradesmen',
    children: [
      {
        name: 'Equipment Finance',
        href: '/products/equipment-finance',
        description: 'Tools, machinery & trade equipment financing',
      },
      {
        name: 'Vehicle Finance',
        href: '/products/vehicle-finance',
        description: 'Vans, trucks & work vehicles financing',
      },
      {
        name: 'Business Loans',
        href: '/products/business-loans',
        description: 'Flexible funding from £5K to £500K',
      },
      {
        name: 'Asset Finance',
        href: '/products/asset-finance',
        description: 'Hire purchase & leasing options',
      },
      {
        name: 'Cashflow Finance',
        href: '/products/cashflow-finance',
        description: 'Working capital solutions',
      },
      {
        name: 'Invoice Finance',
        href: '/products/invoice-finance',
        description: 'Unlock unpaid invoices',
      },
    ],
  },
  {
    name: 'Trades',
    href: '/trades',
    description: 'Finance solutions by trade',
    children: [
      { name: 'Electrician Finance', href: '/trades/electrician' },
      { name: 'Plumber Finance', href: '/trades/plumber' },
      { name: 'Builder Finance', href: '/trades/builder' },
      { name: 'Carpenter Finance', href: '/trades/carpenter' },
      { name: 'Heating Engineer Finance', href: '/trades/heating-engineer' },
      { name: 'Roofer Finance', href: '/trades/roofer' },
      { name: 'Landscaper Finance', href: '/trades/landscaper' },
    ],
  },
  {
    name: 'Locations',
    href: '/trades/locations',
    description: 'Find tradesman finance by location',
    children: [
      { name: 'London', href: '/trades/locations/greater-london' },
      { name: 'Birmingham', href: '/trades/locations/west-midlands' },
      { name: 'Manchester', href: '/trades/locations/greater-manchester' },
      { name: 'Leeds', href: '/trades/locations/west-yorkshire' },
      { name: 'Glasgow', href: '/trades/locations/glasgow' },
    ],
  },
  {
    name: 'Calculators',
    href: '/calculators',
    description: 'Finance calculators and tools',
  },
  {
    name: 'About',
    href: '/about',
    description: 'About Tradesman Finance UK',
  },
  {
    name: 'Contact',
    href: '/contact',
    description: 'Get in touch with our team',
  },
];

/**
 * Props for SiteNavigationSchema component
 */
interface SiteNavigationSchemaProps {
  /** Base URL for the site (defaults to tradesmanfinance.co.uk) */
  baseUrl?: string;
  /** Custom navigation items (defaults to mainNavigationItems) */
  navigationItems?: NavigationItem[];
  /** Include nested navigation items in schema */
  includeChildren?: boolean;
}

/**
 * Generates SiteNavigationElement schema markup
 *
 * Uses ItemList format which is the recommended approach for site navigation
 * as it clearly defines the navigation structure and ordering.
 *
 * @see https://schema.org/SiteNavigationElement
 * @see https://schema.org/ItemList
 */
export function SiteNavigationSchema({
  baseUrl = 'https://tradesmanfinance.co.uk',
  navigationItems = mainNavigationItems,
  includeChildren = false,
}: SiteNavigationSchemaProps) {
  // Build the main navigation schema using ItemList format
  const mainNavSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${baseUrl}/#main-navigation`,
    name: 'Main Navigation',
    description: 'Primary navigation menu for Tradesman Finance UK',
    itemListElement: navigationItems.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: `${baseUrl}${item.href}`,
      ...(item.description && { description: item.description }),
    })),
  };

  // If includeChildren is true, also add child navigation items
  const childNavSchemas: object[] = [];

  if (includeChildren) {
    navigationItems.forEach((item) => {
      if (item.children && item.children.length > 0) {
        childNavSchemas.push({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': `${baseUrl}${item.href}#navigation`,
          name: `${item.name} Navigation`,
          description: `Sub-navigation for ${item.name}`,
          itemListElement: item.children.map((child, childIndex) => ({
            '@type': 'SiteNavigationElement',
            position: childIndex + 1,
            name: child.name,
            url: `${baseUrl}${child.href}`,
            ...(child.description && { description: child.description }),
          })),
        });
      }
    });
  }

  // Return array of schemas if we have children, otherwise just the main nav
  const schemas = includeChildren && childNavSchemas.length > 0
    ? [mainNavSchema, ...childNavSchemas]
    : mainNavSchema;

  return <JsonLd data={schemas} />;
}

/**
 * Alternative implementation using BreadcrumbList format
 * This can be used if you prefer the breadcrumb-style navigation schema
 */
export function NavigationBreadcrumbSchema({
  baseUrl = 'https://tradesmanfinance.co.uk',
  navigationItems = mainNavigationItems,
}: SiteNavigationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${baseUrl}/#site-navigation`,
    name: 'Site Navigation',
    itemListElement: navigationItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return <JsonLd data={schema} />;
}

/**
 * Comprehensive navigation schema that includes:
 * - Main navigation as SiteNavigationElement
 * - Footer navigation
 * - All sub-navigations
 *
 * Best used in the root layout for full site coverage
 */
export function ComprehensiveSiteNavigationSchema({
  baseUrl = 'https://tradesmanfinance.co.uk',
}: {
  baseUrl?: string;
}) {
  // Main navigation schema
  const mainNav = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${baseUrl}/#main-navigation`,
    name: 'Main Navigation',
    description: 'Primary navigation menu for Tradesman Finance UK',
    numberOfItems: mainNavigationItems.length,
    itemListElement: mainNavigationItems.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: `${baseUrl}${item.href}`,
      ...(item.description && { description: item.description }),
    })),
  };

  // Products sub-navigation
  const productsNav = mainNavigationItems.find(item => item.href === '/products');
  const productsSchema = productsNav?.children ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${baseUrl}/products#navigation`,
    name: 'Products Navigation',
    description: 'Finance products available for tradesmen',
    numberOfItems: productsNav.children.length,
    itemListElement: productsNav.children.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: `${baseUrl}${item.href}`,
      ...(item.description && { description: item.description }),
    })),
  } : null;

  // Trades sub-navigation
  const tradesNav = mainNavigationItems.find(item => item.href === '/trades');
  const tradesSchema = tradesNav?.children ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${baseUrl}/trades#navigation`,
    name: 'Trades Navigation',
    description: 'Finance solutions by trade type',
    numberOfItems: tradesNav.children.length,
    itemListElement: tradesNav.children.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: `${baseUrl}${item.href}`,
    })),
  } : null;

  // Locations sub-navigation
  const locationsNav = mainNavigationItems.find(item => item.href === '/trades/locations');
  const locationsSchema = locationsNav?.children ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${baseUrl}/trades/locations#navigation`,
    name: 'Locations Navigation',
    description: 'Find tradesman finance by UK location',
    numberOfItems: locationsNav.children.length,
    itemListElement: locationsNav.children.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: `${baseUrl}${item.href}`,
    })),
  } : null;

  // Combine all schemas
  const allSchemas = [
    mainNav,
    productsSchema,
    tradesSchema,
    locationsSchema,
  ].filter(Boolean);

  return <JsonLd data={allSchemas} />;
}

export default SiteNavigationSchema;
