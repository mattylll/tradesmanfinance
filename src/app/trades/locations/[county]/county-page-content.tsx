"use client";

import Link from 'next/link';

import { townToSlug, type County } from '@/data/locations';
import { type Trade } from '@/data/trades';
import { getCountySEOData } from '@/data/county-seo-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
  ArrowRight,
  MapPin,
  Phone,
  Building,
  Briefcase,
  TrendingUp,
  Clock,
  Shield,
  CheckCircle,
  Banknote,
  Truck,
  FileText,
  Calculator,
  Users,
  Award,
  Zap,
} from 'lucide-react';

// Import SEO components
import { LocalMarketSection } from '@/components/seo/local-market-section';
import { FAQSection } from '@/components/seo/faq-section';
import { TestimonialsSection } from '@/components/seo/testimonials-section';

// Import schema generator
import { generateCountyPageSchema } from '@/lib/schema-generator';

// County hero image mapping
function getCountyHeroImage(countySlug: string): string {
  const available = [
    'aberdeenshire', 'angus', 'argyll', 'ayrshire', 'bedfordshire',
    'berkshire', 'buckinghamshire', 'cambridgeshire', 'cheshire', 'cornwall',
    'county-durham', 'cumbria', 'derbyshire', 'devon', 'dorset',
    'east-sussex', 'edinburgh', 'essex', 'glasgow', 'gloucestershire',
    'greater-london', 'greater-manchester', 'hampshire', 'hertfordshire',
    'kent', 'lancashire', 'leicestershire', 'lincolnshire', 'merseyside',
    'newcastle', 'norfolk', 'north-yorkshire', 'northamptonshire',
    'northumberland', 'nottinghamshire', 'oxfordshire', 'somerset',
    'south-yorkshire', 'staffordshire', 'suffolk', 'surrey',
    'tyne-and-wear', 'warwickshire', 'west-midlands', 'west-sussex',
    'west-yorkshire', 'wiltshire', 'worcestershire', 'belfast',
    'bristol', 'cardiff'
  ];

  if (available.includes(countySlug)) {
    return `/images/${countySlug}-hero.png`;
  }
  return '/images/greater-london-hero.png';
}

// Finance products available - matching homepage design
const financeProducts = [
  {
    name: 'Equipment Finance',
    description: 'Fund tools, machinery, and specialist equipment for your trade',
    icon: Briefcase,
    href: '/products/equipment-finance',
    color: 'bg-[#ff6b35]',
  },
  {
    name: 'Vehicle Finance',
    description: 'Vans, trucks, and work vehicles to keep your business moving',
    icon: Truck,
    href: '/products/vehicle-finance',
    color: 'bg-[#0ea5a5]',
  },
  {
    name: 'Business Loans',
    description: 'Flexible funding for growth, expansion, or working capital',
    icon: Banknote,
    href: '/products/business-loans',
    color: 'bg-[#6366f1]',
  },
  {
    name: 'Cashflow Finance',
    description: 'Keep your business running smoothly between jobs',
    icon: TrendingUp,
    href: '/products/cashflow-finance',
    color: 'bg-[#10b981]',
  },
  {
    name: 'Invoice Finance',
    description: 'Unlock cash tied up in unpaid invoices instantly',
    icon: FileText,
    href: '/products/invoice-finance',
    color: 'bg-[#f59e0b]',
  },
  {
    name: 'Asset Finance',
    description: 'Spread the cost of expensive assets over time',
    icon: Calculator,
    href: '/products/asset-finance',
    color: 'bg-[#ec4899]',
  },
];

// Benefits of choosing us
const benefits = [
  {
    title: '24-Hour Decisions',
    description: 'Tradesman Finance provides fast decisions so you can get to work quickly.',
    icon: Clock,
  },
  {
    title: 'Competitive Rates',
    description: 'We compare rates from multiple lenders to find tradesmen the best deals.',
    icon: TrendingUp,
  },
  {
    title: 'All Credit Considered',
    description: 'Tradesman Finance helps tradesmen with all credit histories access funding.',
    icon: Shield,
  },
  {
    title: 'Trade Specialists',
    description: 'Our team understands what tradesmen need and provides expert guidance.',
    icon: Users,
  },
];

interface CountyPageContentProps {
  county: County;
  trades: Trade[];
  nearbyCounties: County[];
}

export function CountyPageContent({
  county,
  trades,
  nearbyCounties,
}: CountyPageContentProps) {
  const heroImage = getCountyHeroImage(county.slug);

  // Get enhanced SEO data for county
  const countySEOData = getCountySEOData(county.slug);

  // Combine testimonials from all trades
  const allTestimonials = trades
    .flatMap(trade => trade.testimonials || [])
    .filter(t => t && t.quote)
    .slice(0, 4);

  // Generate schema markup
  const schemaMarkup = countySEOData ? generateCountyPageSchema({
    countyName: county.name,
    countySlug: county.slug,
    region: county.region,
    towns: county.towns.slice(0, 10),
    entityLinks: countySEOData.entityLinks,
  }) : null;

  return (
    <main className="min-h-screen overflow-hidden">
      {/* JSON-LD Schema Markup */}
      {schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: schemaMarkup
          }}
        />
      )}

      {/* HERO - Dark with engaging design */}
      <section className="relative min-h-[90vh] flex items-center bg-[#0a0a0a]">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          }}
        />

        {/* Animated gradient orbs */}
        <div
          className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #ff6b35 0%, transparent 70%)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #0ea5a5 0%, transparent 70%)',
            animation: 'pulse 6s ease-in-out infinite reverse',
          }}
        />

        {/* Diagonal cut overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-white"
          style={{
            clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Content - Takes 7 columns */}
            <div className="lg:col-span-7">
              {/* Breadcrumbs */}
              <nav className="mb-6 text-sm text-white/50" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/trades" className="hover:text-[#ff6b35] transition-colors">Trades</Link>
                <span className="mx-2">/</span>
                <Link href="/trades/locations" className="hover:text-[#ff6b35] transition-colors">Locations</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{county.name}</span>
              </nav>

              {/* Stacked badges with offset */}
              <div className="mb-8 flex flex-wrap gap-3">
                <Badge className="bg-[#ff6b35] text-white border-none px-5 py-2 text-sm font-bold uppercase tracking-wider">
                  <MapPin className="mr-2 h-4 w-4" />
                  {county.region}
                </Badge>
                <Badge className="bg-white/10 backdrop-blur text-white border border-white/20 px-5 py-2 text-sm">
                  <Building className="mr-2 h-4 w-4" />
                  {county.towns.length} Towns
                </Badge>
                <Badge className="bg-[#ffd93d] text-black border-none px-5 py-2 text-sm font-bold">
                  <Zap className="mr-2 h-4 w-4" />
                  24HR DECISIONS
                </Badge>
              </div>

              {/* H1 - Bold, oversized */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[0.9]">
                Trade Business Loans in{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#ff6b35]">{county.name}</span>
                  <span
                    className="absolute bottom-2 left-0 right-0 h-4 bg-[#ff6b35]/20 -rotate-1"
                    style={{ zIndex: 0 }}
                  />
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed max-w-2xl">
                <strong className="text-white">Tradesman Finance provides specialist business loans</strong> for
                electricians, plumbers, builders and all trades across {county.name}.
              </p>

              {/* Stats bar - overlapping cards */}
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-6 py-4 transform hover:scale-105 transition-transform">
                  <div className="text-3xl font-black text-[#ff6b35]">£25k-£1m</div>
                  <div className="text-sm text-white/60">Funding Available</div>
                </div>
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-6 py-4 transform hover:scale-105 transition-transform -ml-2 mt-2">
                  <div className="text-3xl font-black text-[#0ea5a5]">24hrs</div>
                  <div className="text-sm text-white/60">Fast Decisions</div>
                </div>
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-6 py-4 transform hover:scale-105 transition-transform -ml-2 mt-4">
                  <div className="text-3xl font-black text-[#ffd93d]">98%</div>
                  <div className="text-sm text-white/60">Approval Rate</div>
                </div>
              </div>

              {/* CTA Buttons - Bold styling */}
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-[#ff6b35] hover:bg-[#ff8f66] text-white font-bold text-lg px-10 py-7 rounded-full shadow-[0_0_40px_rgba(255,107,53,0.4)] hover:shadow-[0_0_60px_rgba(255,107,53,0.6)] hover:scale-105 transition-all uppercase tracking-wide"
                  >
                    Get Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className="bg-white text-[#1a1a2e] hover:bg-white/90 font-bold text-lg px-10 py-7 rounded-full"
                  asChild
                >
                  <a href="tel:08001234567">
                    <Phone className="mr-2 h-5 w-5" />
                    0800 123 4567
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero Image - Takes 5 columns, overlapping */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative">
                {/* Background shape */}
                <div
                  className="absolute -inset-8 bg-gradient-to-br from-[#ff6b35]/20 to-[#0ea5a5]/20 rounded-3xl transform rotate-3"
                />
                <img
                  src={heroImage}
                  alt={`Trade business loans in ${county.name}`}
                  className="relative w-full h-auto rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-[#ffd93d] text-black rounded-2xl p-5 shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
                  <div className="text-2xl font-black">25+</div>
                  <div className="text-xs font-bold uppercase">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINANCE PRODUCTS - White background */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl">
            <Badge className="bg-[#ff6b35]/10 text-[#ff6b35] border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider">
              Finance Products
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-4">
              What We <span className="text-[#ff6b35]">Fund</span>
            </h2>
            <p className="text-xl text-[#6b7280]">
              From equipment to vehicles to working capital — we've got {county.name} tradesmen covered.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {financeProducts.map((finance) => (
              <Link key={finance.name} href={finance.href}>
                <div className="h-full bg-white border border-[#e5e7eb] rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#ff6b35]/30 group cursor-pointer">
                  <div
                    className={`w-14 h-14 ${finance.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <finance.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#1f2937] mb-2 group-hover:text-[#ff6b35] transition-colors">
                    {finance.name}
                  </h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    {finance.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Full width orange */}
      <section className="py-24 bg-[#ff6b35]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side */}
            <div className="text-white">
              <Badge className="bg-white/20 text-white border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider">
                Why Choose Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                {county.name} Tradesmen <br/>Trust Us
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Hundreds of tradesmen across {county.name} have funded their businesses with us.
                Here's why they keep coming back.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-[#ff6b35] hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-full shadow-lg"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Right side - benefit cards */}
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="bg-white rounded-xl p-6 shadow-lg transform hover:translate-x-4 transition-transform"
                  style={{
                    marginLeft: `${index * 20}px`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ff6b35]/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-[#ff6b35]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">{benefit.title}</h3>
                      <p className="text-[#6b7280]">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOWNS GRID - Light gray background */}
      <section className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <Badge className="bg-[#0ea5a5]/10 text-[#0ea5a5] border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider">
                {county.towns.length} Locations
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e]">
                Towns in <span className="text-[#0ea5a5]">{county.name}</span>
              </h2>
            </div>
            <p className="text-[#6b7280] max-w-md">
              Select your town to see specific finance options and local trade support.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {county.towns.map((town) => (
              <Link key={town} href={`/trades/locations/${county.slug}/${townToSlug(town)}`}>
                <div className="group bg-white border border-[#e5e7eb] rounded-xl p-5 hover:border-[#0ea5a5] hover:shadow-lg transition-all duration-300">
                  <span className="font-bold text-[#1a1a2e] group-hover:text-[#0ea5a5] transition-colors">{town}</span>
                  <ArrowRight className="float-right h-4 w-4 text-[#9ca3af] group-hover:text-[#0ea5a5] transform group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRADES SECTION - White background */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-[#8b5cf6]/10 text-[#8b5cf6] border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider">
              All Trades Welcome
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-4">
              Finance for <span className="text-[#8b5cf6]">Every Trade</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {trades.map((trade) => (
              <Link key={trade.slug} href={`/trades/${trade.slug}`}>
                <div className="group bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl p-6 hover:border-[#8b5cf6] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-lg font-bold text-[#1a1a2e] mb-2 group-hover:text-[#8b5cf6] transition-colors">
                    {trade.name}
                  </div>
                  <div className="text-[#ff6b35] font-bold text-sm mb-3">
                    {trade.avgLoanAmount}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {trade.equipmentExamples.slice(0, 2).map((item) => (
                      <span key={item} className="text-xs text-[#6b7280] bg-white px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/trades">
              <Button
                variant="outline"
                className="border-2 border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10 font-bold px-8 py-6 rounded-full"
              >
                View All Trades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO CONTENT - Light gray background */}
      <section className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Large quote mark decoration */}
              <div className="absolute -top-8 -left-8 text-[200px] font-black text-[#ff6b35]/10 leading-none select-none">
                "
              </div>

              <div className="relative z-10 space-y-8 text-lg text-[#6b7280]">
                <p className="text-2xl text-[#1a1a2e] font-medium leading-relaxed">
                  {county.name} is home to thousands of skilled tradesmen who power the local economy
                  through construction, maintenance and specialist services.
                </p>
                <p>
                  {county.description}. This creates significant demand for trade services and,
                  consequently, equipment finance. <strong className="text-[#1a1a2e]">Tradesmen in {county.name}
                  require reliable equipment</strong> to deliver quality work for residential and commercial clients.
                </p>
                <p>
                  <strong className="text-[#ff6b35]">Tradesman Finance understands the {county.name} market</strong> and
                  provides tailored finance solutions. Unlike high street banks, we specialize in trade
                  finance and can approve applications within 24 hours.
                </p>
                <p>
                  Our team has helped hundreds of tradesmen across {county.towns.slice(0, 5).join(', ')} and
                  other {county.name} towns access funding from <strong className="text-[#1a1a2e]">£25,000 to £1,000,000</strong>,
                  with repayment terms from 12 to 60 months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL MARKET OVERVIEW - Economic data from county SEO data */}
      {countySEOData && (
        <LocalMarketSection
          countyName={county.name}
          economy={countySEOData.economy}
          tradeMarket={countySEOData.tradeMarket}
        />
      )}

      {/* FAQ SECTION - County-specific FAQs */}
      {countySEOData?.faqs && countySEOData.faqs.length > 0 && (
        <FAQSection
          countyName={county.name}
          faqs={countySEOData.faqs}
        />
      )}

      {/* TESTIMONIALS SECTION - Customer reviews */}
      {allTestimonials.length > 0 && (
        <TestimonialsSection
          countyName={county.name}
          testimonials={allTestimonials}
        />
      )}

      {/* NEARBY COUNTIES - White background */}
      {nearbyCounties.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-[#1a1a2e] mb-12">
              Nearby Areas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {nearbyCounties.map((nearbyCounty) => (
                <Link key={nearbyCounty.slug} href={`/trades/locations/${nearbyCounty.slug}`}>
                  <div className="group bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl p-6 hover:border-[#ff6b35] hover:shadow-lg transition-all">
                    <div className="font-bold text-[#1a1a2e] mb-1 group-hover:text-[#ff6b35] transition-colors">
                      {nearbyCounty.name}
                    </div>
                    <div className="text-sm text-[#6b7280]">
                      {nearbyCounty.towns.length} towns
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MAP SECTION - Light gray */}
      <section className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#1a1a2e] mb-4">
              {county.name} <span className="text-[#ff6b35]">Coverage</span>
            </h2>
            <p className="text-[#6b7280] max-w-2xl mx-auto">
              We cover all {county.towns.length} towns across {county.name} with local knowledge and fast support.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#e5e7eb] shadow-lg">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${county.name}, UK`)}&zoom=9`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing coverage in ${county.name}`}
            />
          </div>
        </div>
      </section>

      {/* CTA - Full bleed gradient */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ff6b35 0%, #ff8f66 50%, #ffd93d 100%)',
          }}
        />

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Fund Your<br />
              <span className="text-black/80">{county.name} Business?</span>
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join hundreds of {county.name} tradesmen who've grown their business with us.
              Free quote, no credit impact, decision in 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-black/80 font-bold text-lg px-10 py-7 rounded-full shadow-2xl hover:scale-105 transition-all"
                >
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                className="bg-white text-[#ff6b35] hover:bg-white/90 font-bold text-lg px-10 py-7 rounded-full"
                asChild
              >
                <a href="tel:08001234567">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
      `}</style>
    </main>
  );
}
