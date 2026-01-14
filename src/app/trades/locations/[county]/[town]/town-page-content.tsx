"use client";

import Link from 'next/link';

import { townToSlug, type County } from '@/data/locations';
import { type Trade } from '@/data/trades';
import { getCountySEOData } from '@/data/county-seo-data';
import { getTownSEOData } from '@/data/town-seo-data';
import { getTownLocalData } from '@/data/town-local-data';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
  ArrowRight,
  MapPin,
  Phone,
  Clock,
  TrendingUp,
  CheckCircle,
  Shield,
  Zap,
  Star,
  Wrench,
  Truck,
  Banknote,
  FileText,
  Calculator,
  Building2,
  Briefcase,
  HardHat,
  Train,
  Landmark,
  Users,
  Quote,
  ChevronDown,
} from 'lucide-react';

// Finance products - matching homepage design
const financeProducts = [
  {
    name: 'Equipment Finance',
    description: 'Fund tools, machinery, and specialist equipment',
    icon: Wrench,
    href: '/products/equipment-finance',
    color: 'bg-[#ff6b35]',
  },
  {
    name: 'Vehicle Finance',
    description: 'Vans, trucks, and work vehicles',
    icon: Truck,
    href: '/products/vehicle-finance',
    color: 'bg-[#0ea5a5]',
  },
  {
    name: 'Business Loans',
    description: 'Flexible funding for growth',
    icon: Banknote,
    href: '/products/business-loans',
    color: 'bg-[#6366f1]',
  },
  {
    name: 'Cashflow Finance',
    description: 'Keep business running smoothly',
    icon: TrendingUp,
    href: '/products/cashflow-finance',
    color: 'bg-[#10b981]',
  },
  {
    name: 'Invoice Finance',
    description: 'Unlock cash in unpaid invoices',
    icon: FileText,
    href: '/products/invoice-finance',
    color: 'bg-[#f59e0b]',
  },
  {
    name: 'Asset Finance',
    description: 'Spread the cost over time',
    icon: Calculator,
    href: '/products/asset-finance',
    color: 'bg-[#ec4899]',
  },
];

// SEO components available if needed
// import { LocalMarketSection } from '@/components/seo/local-market-section';
// import { FAQSection } from '@/components/seo/faq-section';
// import { TestimonialsSection } from '@/components/seo/testimonials-section';

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

interface TownPageContentProps {
  townName: string;
  townSlug: string;
  county: County;
  trades: Trade[];
  otherTowns: string[];
}

export function TownPageContent({
  townName,
  townSlug,
  county,
  trades,
  otherTowns,
}: TownPageContentProps) {
  const heroImage = getCountyHeroImage(county.slug);

  // Split trades into featured (first 4) and rest
  const featuredTrades = trades.slice(0, 4);
  const remainingTrades = trades.slice(4);

  // Get enhanced SEO data
  const countySEOData = getCountySEOData(county.slug);
  const townSEOData = getTownSEOData(townSlug, county.slug, county.name, county.region);

  // Get rich town-specific local data
  const townLocalInfo = getTownLocalData(townSlug, townName, county.slug, county.name, county.region);

  // Use town's testimonial if available, otherwise fall back to trade testimonials
  const localTestimonial = townLocalInfo.testimonial;
  const allTestimonials = trades
    .flatMap(trade => trade.testimonials || [])
    .filter(t => t && t.quote)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* HERO - Dramatic with overlapping elements */}
      <section className="relative min-h-[85vh] flex items-center">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
          }}
        />

        {/* Animated accent shapes */}
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #ff6b35 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #0ea5a5 0%, transparent 70%)',
          }}
        />

        {/* Diagonal slice - now white to transition to light sections */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-white"
          style={{
            clipPath: 'polygon(0 100%, 100% 30%, 100% 100%)',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              {/* Breadcrumbs */}
              <nav className="mb-6 text-sm text-white/50">
                <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/trades/locations" className="hover:text-[#ff6b35] transition-colors">Locations</Link>
                <span className="mx-2">/</span>
                <Link href={`/trades/locations/${county.slug}`} className="hover:text-[#ff6b35] transition-colors">
                  {county.name}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-white">{townName}</span>
              </nav>

              {/* Badges */}
              <div className="mb-8 flex flex-wrap gap-3">
                <Badge className="bg-[#ff6b35] text-white border-none px-5 py-2 text-sm font-bold uppercase tracking-wider">
                  <MapPin className="mr-2 h-4 w-4" />
                  {townName}
                </Badge>
                <Badge className="bg-white/10 backdrop-blur text-white border border-white/20 px-5 py-2 text-sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {trades.length} Trades
                </Badge>
                <Badge className="bg-[#ffd93d] text-black border-none px-5 py-2 text-sm font-bold">
                  <Zap className="mr-2 h-4 w-4" />
                  INSTANT QUOTES
                </Badge>
              </div>

              {/* H1 - Primary keyword: Tradesman Business Loans in [Town] */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[0.9]">
                Tradesman Business<br />
                <span className="text-[#ff6b35]">Loans</span>
                <span className="text-white/40 text-4xl md:text-5xl"> in </span>
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#ff6b35]">{townName}</span>
                  <span className="absolute bottom-1 left-0 right-0 h-4 bg-[#ff6b35]/30 -rotate-1" />
                </span>
              </h1>

              <p className="text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
                {townLocalInfo.content.heroSubtitle}.
                <strong className="text-white"> £25k to £1m available</strong> with decisions in 24 hours.
              </p>

              {/* CTA Buttons */}
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

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-white/60">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">No Upfront Fees</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">All Credit Considered</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Star className="h-5 w-5 text-[#ffd93d]" />
                  <span className="text-sm">4.9/5 on Google</span>
                </div>
              </div>
            </div>

            {/* Hero Image with floating cards */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Background glow */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#ff6b35]/20 to-[#0ea5a5]/20 rounded-3xl blur-xl" />

                <img
                  src={heroImage}
                  alt={`Trade finance in ${townName}`}
                  className="relative w-full h-auto rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />

                {/* Overlapping stat cards */}
                <div className="absolute -bottom-8 -left-8 bg-[#1a1a2e] border border-white/10 rounded-2xl p-5 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="text-3xl font-black text-[#ff6b35]">£25k-£1m</div>
                  <div className="text-sm text-white/60">Funding Range</div>
                </div>

                <div className="absolute -top-4 -right-4 bg-[#ff6b35] rounded-2xl p-4 shadow-xl transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="text-xl font-black text-white">24HR</div>
                  <div className="text-xs text-white/80">Decisions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TRADES - Large cards with color accents */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Badge className="bg-[#0ea5a5]/20 text-[#0ea5a5] border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider">
              Popular in {townName}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-4">
              Trade <span className="text-[#0ea5a5]">Finance</span> Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Select your trade to see specific finance packages available in {townName}
            </p>
          </div>

          {/* Featured trades - large cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {featuredTrades.map((trade, index) => {
              const colors = ['#ff6b35', '#0ea5a5', '#8b5cf6', '#f59e0b'];
              const accent = colors[index % colors.length];
              return (
                <Link key={trade.slug} href={`/trades/locations/${county.slug}/${townSlug}/${trade.slug}`}>
                  <div
                    className="group relative overflow-hidden rounded-2xl p-8 min-h-[220px] transform hover:scale-[1.02] transition-all duration-300 bg-white border border-gray-200 shadow-md hover:shadow-xl"
                    style={{
                      borderLeft: `4px solid ${accent}`,
                    }}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-[#1a1a2e]">{trade.name}</h3>
                        <span className="text-2xl font-black" style={{ color: accent }}>
                          {trade.avgLoanAmount}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-6">
                        {trade.name} business loans and equipment finance in {townName}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {trade.equipmentExamples.slice(0, 3).map((item) => (
                          <span key={item} className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-gray-700 group-hover:text-[#ff6b35] transition-colors">
                        <span className="font-semibold">Get Quote</span>
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Remaining trades - compact grid */}
          {remainingTrades.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {remainingTrades.map((trade) => (
                <Link key={trade.slug} href={`/trades/locations/${county.slug}/${townSlug}/${trade.slug}`}>
                  <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-[#ff6b35] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="font-bold text-[#1a1a2e] mb-1 group-hover:text-[#ff6b35] transition-colors">
                      {trade.name}
                    </div>
                    <div className="text-sm text-[#ff6b35]">{trade.avgLoanAmount}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FINANCE PRODUCTS - Matching homepage design */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-[#ff6b35]/10 text-[#ff6b35] border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider">
              Finance Solutions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-4">
              Finance Options for <span className="text-[#ff6b35]">{townName}</span> Tradesmen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whatever your business needs, we have the right finance solution
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {financeProducts.map((finance) => (
              <Link key={finance.name} href={finance.href}>
                <div className="h-full bg-white border border-[#e5e7eb] rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#ff6b35]/30 group cursor-pointer">
                  <div className={`w-14 h-14 ${finance.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
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
          <div className="text-center mb-16">
            <Badge className="bg-white/20 text-white border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider">
              Why {townName} Tradesmen Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Local Knowledge, Fast Funding
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We understand {county.name} and what {townName} tradesmen need to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-[#ff6b35]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">Local Market Expertise</h3>
              <p className="text-gray-600">We understand {county.name} and what {townName} tradesmen need.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-[#ff6b35]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">24-Hour Decisions</h3>
              <p className="text-gray-600">Get approval fast so you can start working immediately.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-[#ff6b35]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">Flexible Terms</h3>
              <p className="text-gray-600">12 to 60 month repayment options that suit your cash flow.</p>
            </div>
          </div>

          <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-[#1a1a2e] mb-6 text-center">Quick Quote for {townName}</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Loan Amount</span>
                <span className="text-xl font-bold text-[#1a1a2e]">£25k - £1m</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Decision Time</span>
                <span className="text-xl font-bold text-[#ff6b35]">24 Hours</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Terms Available</span>
                <span className="text-xl font-bold text-[#1a1a2e]">12-60 Months</span>
              </div>
            </div>
            <Link href="/contact">
              <Button className="w-full bg-[#ff6b35] hover:bg-[#ff8f66] text-white font-bold py-6 rounded-xl text-lg">
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LOCAL ECONOMY & TRADE MARKET - Town-specific content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-12">
            <Badge className="bg-[#0ea5a5]/20 text-[#0ea5a5] border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider">
              About {townName}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-4">
              Trade Work in <span className="text-[#0ea5a5]">{townName}</span>
            </h2>
          </div>

          {/* Introduction - Town-specific content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {townLocalInfo.content.introductionParagraph}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {townLocalInfo.content.whyLocalTradesmen}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#0ea5a5]/10 to-[#0ea5a5]/5 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#0ea5a5]" />
                Local Economy
              </h3>
              <p className="text-gray-700 mb-4">{townLocalInfo.localEconomy.description}</p>
              <div className="flex flex-wrap gap-2">
                {townLocalInfo.localEconomy.keyIndustries.map((industry) => (
                  <span key={industry} className="bg-white px-3 py-1 rounded-full text-sm text-[#1a1a2e] font-medium shadow-sm">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Two or Three columns: Employers (if available), Hot Sectors, Current Projects */}
          <div className={`grid gap-8 mb-12 ${townLocalInfo.localEconomy.majorEmployers.length > 0 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {/* Major Employers - Only show if we have real data */}
            {townLocalInfo.localEconomy.majorEmployers.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ff6b35]/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-[#ff6b35]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a2e]">Major Employers</h3>
                </div>
                <ul className="space-y-2">
                  {townLocalInfo.localEconomy.majorEmployers.map((employer) => (
                    <li key={employer} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {employer}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hot Sectors */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0ea5a5]/10 flex items-center justify-center">
                  <HardHat className="h-6 w-6 text-[#0ea5a5]" />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e]">In-Demand Work</h3>
              </div>
              <ul className="space-y-2">
                {townLocalInfo.tradeMarket.hotSectors.map((sector) => (
                  <li key={sector} className="flex items-center gap-2 text-gray-700">
                    <TrendingUp className="h-4 w-4 text-[#0ea5a5] flex-shrink-0" />
                    {sector}
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Projects */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center">
                  <Landmark className="h-6 w-6 text-[#6366f1]" />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e]">Local Projects</h3>
              </div>
              <ul className="space-y-2">
                {townLocalInfo.tradeMarket.majorProjects.map((project) => (
                  <li key={project} className="flex items-center gap-2 text-gray-700">
                    <Zap className="h-4 w-4 text-[#6366f1] flex-shrink-0" />
                    {project}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Local Context - What the town is known for */}
          {townLocalInfo.localContext.knownFor && townLocalInfo.localContext.knownFor.length > 0 && (
            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4a] rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#ff6b35]" />
                    About {townName}
                  </h3>
                  {townLocalInfo.localContext.historicalNote && (
                    <p className="text-white/80 mb-4">{townLocalInfo.localContext.historicalNote}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {townLocalInfo.localContext.knownFor.map((item) => (
                      <span key={item} className="bg-white/10 backdrop-blur px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {townLocalInfo.localContext.transportLinks && townLocalInfo.localContext.transportLinks.length > 0 && (
                  <div className="md:border-l md:border-white/20 md:pl-6">
                    <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Train className="h-4 w-4" />
                      Transport Links
                    </h4>
                    <ul className="space-y-1">
                      {townLocalInfo.localContext.transportLinks.slice(0, 3).map((link) => (
                        <li key={link} className="text-sm text-white/80">{link}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ SECTION - Town-specific FAQs */}
      {townLocalInfo.faqs && townLocalInfo.faqs.length > 0 && (
        <section className="py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="bg-[#6366f1]/20 text-[#6366f1] border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider">
                  FAQ
                </Badge>
                <h2 className="text-4xl font-black text-[#1a1a2e] mb-4">
                  {townName} Trade Finance <span className="text-[#6366f1]">Questions</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Common questions from {townName} tradesmen about business finance
                </p>
              </div>

              <div className="space-y-4">
                {townLocalInfo.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="text-lg font-bold text-[#1a1a2e] pr-4">{faq.question}</h3>
                      <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LOCAL TESTIMONIAL - Town-specific customer story */}
      {localTestimonial && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="bg-[#ff6b35]/20 text-[#ff6b35] border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider">
                  {townName} Success Story
                </Badge>
                <h2 className="text-4xl font-black text-[#1a1a2e] mb-4">
                  What {townName} <span className="text-[#ff6b35]">Tradesmen</span> Say
                </h2>
              </div>

              <div className="bg-gradient-to-br from-[#ff6b35] to-[#ff8f66] rounded-2xl p-10 text-white relative overflow-hidden">
                {/* Decorative quote mark */}
                <div className="absolute top-4 left-4 opacity-20">
                  <Quote className="h-20 w-20" />
                </div>

                <div className="relative z-10">
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                    "{localTestimonial.quote}"
                  </blockquote>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="font-bold text-lg">{localTestimonial.name}</div>
                      <div className="text-white/80">{localTestimonial.trade} - {localTestimonial.business}</div>
                    </div>
                    {localTestimonial.amount && (
                      <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3 text-center">
                        <div className="text-sm text-white/70">Financed</div>
                        <div className="text-2xl font-black">{localTestimonial.amount}</div>
                      </div>
                    )}
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-1 mt-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-[#ffd93d] text-[#ffd93d]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* OTHER TOWNS */}
      {otherTowns.length > 0 && (
        <section className="py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-black text-[#1a1a2e]">
                  Other Towns in <span className="text-[#0ea5a5]">{county.name}</span>
                </h2>
              </div>
              <Link href={`/trades/locations/${county.slug}`}>
                <Button
                  variant="outline"
                  className="border-2 border-[#0ea5a5] text-[#0ea5a5] hover:bg-[#0ea5a5]/10 font-bold rounded-full"
                >
                  View All Towns
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {otherTowns.map((town) => (
                <Link
                  key={town}
                  href={`/trades/locations/${county.slug}/${townToSlug(town)}`}
                >
                  <div className="group bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-[#0ea5a5] hover:shadow-lg transition-all">
                    <span className="font-semibold text-[#1a1a2e] group-hover:text-[#0ea5a5] transition-colors">{town}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MAP SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#1a1a2e] mb-4">
              Find Us in <span className="text-[#ff6b35]">{townName}</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tradesman Finance serves {townName} and all surrounding areas in {county.name}.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(townName + ', ' + county.name + ', UK')}&zoom=12`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${townName}, ${county.name}`}
            />
          </div>
        </div>
      </section>

      {/* CTA - Bold gradient */}
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
              Ready to Get Funded<br />
              <span className="text-black/80">in {townName}?</span>
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join {townName} tradesmen who've grown their business with us.
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
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#ff6b35] font-bold text-lg px-10 py-7 rounded-full transition-all"
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
    </main>
  );
}
