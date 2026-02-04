import type { Metadata } from 'next';
import Link from 'next/link';
import { trades } from '@/data/trades';
import { counties, getRegions } from '@/data/locations';
import {
  Home,
  Package,
  Wrench,
  MapPin,
  Calculator,
  Users,
  Phone,
  Shield,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sitemap | Tradesman Finance - Complete Site Navigation',
  description: 'Navigate the Tradesman Finance website. Find all pages including trade finance options, location-specific services, calculators, and more.',
  openGraph: {
    title: 'Sitemap | Tradesman Finance',
    description: 'Complete navigation guide for Tradesman Finance website.',
    type: 'website',
  },
};

// Section component for consistent styling
function SitemapSection({
  title,
  icon: Icon,
  color,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-gray-200">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <h2
          className="text-xl md:text-2xl font-bold text-gray-900"
          style={{ fontFamily: 'var(--font-industrial)' }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

// Link item component
function SitemapLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-2 py-2 px-3 -mx-3 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <ChevronRight className="h-4 w-4 mt-1 text-gray-400 group-hover:text-[#ff6b35] flex-shrink-0 transition-colors" />
      <div>
        <span className="text-gray-700 group-hover:text-[#ff6b35] font-medium transition-colors">
          {label}
        </span>
        {description && (
          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
    </Link>
  );
}

// Multi-column grid for large lists
function MultiColumnList({
  children,
  columns = 4,
}: {
  children: React.ReactNode;
  columns?: number;
}) {
  const gridCols: Record<number, string> = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  };

  return (
    <div className={`grid gap-x-6 gap-y-1 ${gridCols[columns] || gridCols[4]}`}>
      {children}
    </div>
  );
}

export default function SitemapPage() {
  const regions = getRegions();
  const totalCounties = Object.keys(counties).length;
  const totalTrades = trades.length;

  // Region order for organized display
  const regionOrder = [
    'London',
    'South East England',
    'South West England',
    'East of England',
    'East Midlands',
    'West Midlands',
    'North West England',
    'Yorkshire and the Humber',
    'North East England',
    'Scotland',
    'Wales',
    'Northern Ireland',
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Industrial grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#fff 1px, transparent 1px),
              linear-gradient(90deg, #fff 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container relative mx-auto px-4">
          <nav className="mb-6 text-sm text-white/50">
            <Link href="/" className="hover:text-[#ff6b35] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Sitemap</span>
          </nav>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-industrial)' }}
          >
            Site{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd93d]">
              Map
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
            Complete navigation for Tradesman Finance. Find all our pages organized by category.
          </p>
        </div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6b35] via-[#ffd93d] to-[#ff6b35]" />
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#ff6b35]">{totalTrades}</div>
              <div className="text-sm text-gray-500">Trade Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#0ea5a5]">{totalCounties}</div>
              <div className="text-sm text-gray-500">Counties Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#6366f1]">6</div>
              <div className="text-sm text-gray-500">Finance Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#10b981]">5</div>
              <div className="text-sm text-gray-500">Calculators</div>
            </div>
          </div>

          {/* Home */}
          <SitemapSection title="Home" icon={Home} color="#ff6b35">
            <SitemapLink href="/" label="Homepage" description="Welcome to Tradesman Finance - UK's leading trade business finance specialist" />
          </SitemapSection>

          {/* Products */}
          <SitemapSection title="Finance Products" icon={Package} color="#6366f1">
            <div className="space-y-1">
              <SitemapLink href="/products" label="All Products" description="View all finance products for trade businesses" />
              <SitemapLink href="/products/equipment-finance" label="Equipment Finance" description="Finance tools, machinery, and trade equipment" />
              <SitemapLink href="/products/vehicle-finance" label="Vehicle Finance" description="Vans, trucks, and work vehicle financing" />
              <SitemapLink href="/products/business-loans" label="Business Loans" description="Flexible business loans from GBP5,000 to GBP500,000" />
              <SitemapLink href="/products/cashflow-finance" label="Cashflow Finance" description="Working capital and cash flow solutions" />
              <SitemapLink href="/products/invoice-finance" label="Invoice Finance" description="Unlock cash tied up in unpaid invoices" />
              <SitemapLink href="/products/asset-finance" label="Asset Finance" description="Hire purchase, leasing, and sale and leaseback" />
            </div>
          </SitemapSection>

          {/* All Trades */}
          <SitemapSection title={`Trades (${totalTrades})`} icon={Wrench} color="#ff6b35">
            <div className="mb-4">
              <SitemapLink href="/trades" label="All Trades" description="Browse all trade categories we support" />
            </div>
            <MultiColumnList columns={4}>
              {trades.map((trade) => (
                <SitemapLink
                  key={trade.slug}
                  href={`/trades/${trade.slug}`}
                  label={trade.name}
                />
              ))}
            </MultiColumnList>
          </SitemapSection>

          {/* Locations by Region */}
          <SitemapSection title={`Locations (${totalCounties} Counties)`} icon={MapPin} color="#0ea5a5">
            <div className="mb-6">
              <SitemapLink href="/trades/locations" label="All Locations" description="Browse all UK locations we serve" />
            </div>

            {regionOrder.map((regionName) => {
              const regionCounties = regions[regionName];
              if (!regionCounties || regionCounties.length === 0) return null;

              return (
                <div key={regionName} className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0ea5a5]" />
                    {regionName}
                    <span className="text-sm font-normal text-gray-500">
                      ({regionCounties.length} {regionCounties.length === 1 ? 'county' : 'counties'})
                    </span>
                  </h3>
                  <MultiColumnList columns={4}>
                    {regionCounties.map((countySlug) => {
                      const county = counties[countySlug];
                      return (
                        <SitemapLink
                          key={countySlug}
                          href={`/trades/locations/${countySlug}`}
                          label={county.name}
                        />
                      );
                    })}
                  </MultiColumnList>
                </div>
              );
            })}
          </SitemapSection>

          {/* Calculators */}
          <SitemapSection title="Calculators" icon={Calculator} color="#10b981">
            <div className="space-y-1">
              <SitemapLink href="/calculators" label="All Calculators" description="Finance calculators to help plan your business investment" />
              <SitemapLink href="/calculators/equipment-finance" label="Equipment Finance Calculator" description="Calculate monthly payments for equipment" />
              <SitemapLink href="/calculators/vehicle-finance" label="Vehicle Finance Calculator" description="Work out van and vehicle finance costs" />
              <SitemapLink href="/calculators/business-loans" label="Business Loan Calculator" description="Estimate your business loan repayments" />
              <SitemapLink href="/calculators/invoice-finance" label="Invoice Finance Calculator" description="See how much you could unlock from invoices" />
              <SitemapLink href="/calculators/affordability" label="Affordability Calculator" description="Check what you can afford to borrow" />
            </div>
          </SitemapSection>

          {/* Tools Finance */}
          <SitemapSection title="Tool Brands" icon={Wrench} color="#f59e0b">
            <div className="space-y-1">
              <SitemapLink href="/tools/finance" label="Tools Finance" description="Finance for professional tools and equipment" />
              <SitemapLink href="/equipment" label="Equipment Brands" description="Browse equipment brands we finance" />
            </div>
          </SitemapSection>

          {/* Vehicles Finance */}
          <SitemapSection title="Vehicle Finance" icon={Package} color="#8b5cf6">
            <div className="space-y-1">
              <SitemapLink href="/vehicles/finance" label="Vehicle Finance" description="Finance for work vehicles, vans, and trucks" />
            </div>
          </SitemapSection>

          {/* Team / About */}
          <SitemapSection title="About Us" icon={Users} color="#ec4899">
            <div className="space-y-1">
              <SitemapLink href="/about" label="About Tradesman Finance" description="Learn about our company and mission" />
              <SitemapLink href="/team" label="Our Team" description="Meet the team behind Tradesman Finance" />
              <SitemapLink href="/blog" label="Blog" description="News, guides, and industry insights" />
            </div>
          </SitemapSection>

          {/* Contact */}
          <SitemapSection title="Contact" icon={Phone} color="#14b8a6">
            <div className="space-y-1">
              <SitemapLink href="/contact" label="Contact Us" description="Get in touch with our team" />
            </div>
          </SitemapSection>

          {/* Legal */}
          <SitemapSection title="Legal & Policies" icon={Shield} color="#64748b">
            <div className="space-y-1">
              <SitemapLink href="/terms" label="Terms of Service" description="Our terms and conditions" />
              <SitemapLink href="/privacy-policy" label="Privacy Policy" description="How we handle your data" />
              <SitemapLink href="/accessibility" label="Accessibility Statement" description="Our commitment to accessibility" />
            </div>
          </SitemapSection>

          {/* Additional Info */}
          <div className="mt-16 p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Looking for Something Else?</h3>
            <p className="text-gray-600 mb-4">
              If you cannot find what you are looking for, please do not hesitate to contact us.
              Our team is here to help you find the right finance solution for your trade business.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff6b35] text-white font-semibold rounded-lg hover:bg-[#e55a2b] transition-colors"
              >
                Contact Us
                <ChevronRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:08001234567"
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#ff6b35] hover:text-[#ff6b35] transition-colors"
              >
                <Phone className="h-4 w-4" />
                0800 123 4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
