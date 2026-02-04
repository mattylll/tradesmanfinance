"use client";

import Link from 'next/link';

import { townToSlug, type County } from '@/data/locations';
import { type Trade } from '@/data/trades';
import { getCountySEOData } from '@/data/county-seo-data';
import { getTownSEOData } from '@/data/town-seo-data';
import { getTownLocalData } from '@/data/town-local-data';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Separator } from '@/registry/new-york-v4/ui/separator';
import {
  CheckCircle,
  ArrowRight,
  MapPin,
  Phone,
  TrendingUp,
  Zap,
  Clock,
  Shield,
  Star,
  Wrench,
  Building2,
  Briefcase,
  HardHat,
  Train,
  Quote,
  ChevronDown,
} from 'lucide-react';

// Import SEO components
// import { LocalMarketSection } from '@/components/seo/local-market-section'; // Replaced with trade-specific local section
import { EquipmentFinanceSection } from '@/components/seo/equipment-finance-section';
import { FAQSection } from '@/components/seo/faq-section';
import { TestimonialsSection } from '@/components/seo/testimonials-section';
import { CredentialsSection } from '@/components/seo/credentials-section';
import { RelatedTradesLinks } from '@/components/seo/related-trades-links';
import { EquipmentLinks } from '@/components/seo/equipment-links';

// Import schema generator
import { generateLocationPageSchema } from '@/lib/schema-generator';

// Hero image mapping for trades
function getTradeHeroImage(tradeSlug: string): string {
  const tradeHeroImages: Record<string, string> = {
    'electrician': '/images/electrician-hero.png',
    'plumber': '/images/plumber-hero.png',
    'builder': '/images/builder-hero.png',
    'carpenter': '/images/carpenter-hero.png',
    'heating-engineer': '/images/hvac-hero.png',
    'roofer': '/images/roofer-hero.png',
    'landscaper': '/images/builder-hero.png',
    'bricklayer': '/images/builder-hero.png',
    'plasterer': '/images/builder-hero.png',
    'tiler': '/images/builder-hero.png',
    'painter-decorator': '/images/builder-hero.png',
    'scaffolder': '/images/builder-hero.png',
    'flooring-contractor': '/images/carpenter-hero.png',
    'window-fitter': '/images/builder-hero.png',
    'bathroom-fitter': '/images/plumber-hero.png',
    'shop-fitter': '/images/carpenter-hero.png',
    'locksmith': '/images/builder-hero.png',
    'groundworker': '/images/builder-hero.png',
    'demolition': '/images/builder-hero.png',
    'air-conditioning': '/images/hvac-hero.png',
  };
  return tradeHeroImages[tradeSlug] || '/images/builder-hero.png';
}

// Get accent color for trade
function getTradeAccent(tradeSlug: string): string {
  const accents: Record<string, string> = {
    'electrician': '#ffd93d',
    'plumber': '#0ea5a5',
    'builder': '#ff6b35',
    'carpenter': '#a3e635',
    'heating-engineer': '#f97316',
    'roofer': '#8b5cf6',
  };
  return accents[tradeSlug] || '#ff6b35';
}

// Generate trade-specific introduction based on town data
function generateTradeLocalIntro(trade: Trade, townName: string, townData: ReturnType<typeof getTownLocalData>): string {
  const tradeLower = trade.name.toLowerCase();
  const economyDesc = townData.localEconomy.description;
  const hotSectors = townData.tradeMarket.hotSectors;

  // Map trade to relevant sectors
  const tradeRelevance: Record<string, string[]> = {
    'electrician': ['Commercial fit-outs', 'Smart home installations', 'Industrial maintenance', 'New-build residential', 'Energy efficiency', 'Tech office fit-outs', 'Healthcare facilities'],
    'plumber': ['Bathroom fitting', 'Heating installations', 'New-build residential', 'Healthcare facilities', 'Commercial fit-outs', 'Period property work'],
    'builder': ['Residential renovations', 'Commercial conversions', 'Heritage restoration', 'New-build residential', 'Extensions', 'Warehouse fit-outs'],
    'carpenter': ['Kitchen fitting', 'Shop-fitting', 'Period property work', 'Commercial fit-outs', 'Heritage restoration', 'Bespoke joinery'],
    'heating-engineer': ['Energy efficiency', 'Commercial HVAC', 'New-build residential', 'Boiler installations', 'Healthcare facilities', 'Industrial maintenance'],
    'roofer': ['Period property work', 'Heritage restoration', 'New-build residential', 'Commercial roofing', 'Storm damage repair'],
    'landscaper': ['Garden landscaping', 'Commercial grounds', 'New-build finishing', 'Property development'],
  };

  const relevantSectors = tradeRelevance[trade.slug] || [];
  const matchingSectors = hotSectors.filter(sector =>
    relevantSectors.some(rel => sector.toLowerCase().includes(rel.toLowerCase()) || rel.toLowerCase().includes(sector.toLowerCase()))
  );

  if (matchingSectors.length > 0) {
    return `${townName} ${tradeLower}s benefit from strong local demand, particularly in ${matchingSectors.slice(0, 2).join(' and ').toLowerCase()}. ${economyDesc}`;
  }

  return `${townName} ${tradeLower}s serve a ${townData.localEconomy.economicCharacter || 'growing market'} with consistent demand for quality trade work. ${economyDesc}`;
}

// Generate trade-specific opportunities based on town data
function generateTradeOpportunities(trade: Trade, townData: ReturnType<typeof getTownLocalData>): string[] {
  const opportunities: string[] = [];
  const tradeLower = trade.name.toLowerCase();

  // Trade-specific opportunity mapping
  const tradeOpportunities: Record<string, (townData: ReturnType<typeof getTownLocalData>) => string[]> = {
    'electrician': (data) => {
      const opps = [];
      if (data.localEconomy.keyIndustries.some(i => i.toLowerCase().includes('tech') || i.toLowerCase().includes('digital'))) {
        opps.push('Tech sector office installations and data centre work');
      }
      if (data.localEconomy.keyIndustries.some(i => i.toLowerCase().includes('healthcare'))) {
        opps.push('Healthcare facility electrical maintenance and upgrades');
      }
      if (data.tradeMarket.hotSectors.some(s => s.toLowerCase().includes('residential'))) {
        opps.push('Residential rewiring and smart home installations');
      }
      opps.push(`Commercial and industrial electrical work across ${data.name}`);
      return opps;
    },
    'plumber': (data) => {
      const opps = [];
      if (data.tradeMarket.hotSectors.some(s => s.toLowerCase().includes('bathroom') || s.toLowerCase().includes('residential'))) {
        opps.push('Bathroom installations and renovations');
      }
      if (data.localEconomy.keyIndustries.some(i => i.toLowerCase().includes('healthcare'))) {
        opps.push('Healthcare facility plumbing maintenance');
      }
      opps.push(`Commercial and domestic plumbing across ${data.name}`);
      opps.push('New-build first and second fix work');
      return opps;
    },
    'builder': (data) => {
      const opps = [];
      if (data.tradeMarket.hotSectors.some(s => s.toLowerCase().includes('heritage') || s.toLowerCase().includes('period'))) {
        opps.push('Period property restoration and heritage building work');
      }
      if (data.tradeMarket.majorProjects && data.tradeMarket.majorProjects.length > 0) {
        opps.push(`Major development projects: ${data.tradeMarket.majorProjects[0]}`);
      }
      opps.push(`Residential extensions and renovations in ${data.name}`);
      opps.push('Commercial and industrial construction projects');
      return opps;
    },
    'heating-engineer': (data) => {
      const opps = [];
      opps.push(`Boiler installations and servicing across ${data.name}`);
      if (data.tradeMarket.hotSectors.some(s => s.toLowerCase().includes('energy'))) {
        opps.push('Heat pump installations and energy efficiency upgrades');
      }
      if (data.localEconomy.keyIndustries.some(i => i.toLowerCase().includes('healthcare') || i.toLowerCase().includes('education'))) {
        opps.push('Commercial heating system maintenance');
      }
      opps.push('Gas safety inspections and landlord certificates');
      return opps;
    },
  };

  const generator = tradeOpportunities[trade.slug];
  if (generator) {
    return generator(townData).slice(0, 4);
  }

  // Default opportunities
  return [
    `${trade.name} work across ${townData.name} residential properties`,
    `Commercial ${tradeLower} projects in ${townData.localEconomy.economicCharacter || 'the local area'}`,
    townData.tradeMarket.majorProjects?.[0] || `Local development and renovation work`,
    `Maintenance contracts with local businesses`,
  ];
}

interface TradeLocationContentProps {
  trade: Trade;
  townName: string;
  townSlug: string;
  county: County;
  relatedTrades: Trade[];
  otherTowns: string[];
}

export function TradeLocationContent({
  trade,
  townName,
  townSlug,
  county,
  relatedTrades,
  otherTowns,
}: TradeLocationContentProps) {
  const heroImage = getTradeHeroImage(trade.slug);
  const accent = getTradeAccent(trade.slug);

  // Get enhanced SEO data
  const countySEOData = getCountySEOData(county.slug);
  const townSEOData = getTownSEOData(townSlug, county.slug, county.name, county.region);

  // Get rich town-specific local data
  const townLocalInfo = getTownLocalData(townSlug, townName, county.slug, county.name, county.region);

  // Generate trade-specific introduction based on town data
  const tradeLocalIntro = generateTradeLocalIntro(trade, townName, townLocalInfo);
  const tradeLocalOpportunities = generateTradeOpportunities(trade, townLocalInfo);

  // Generate schema markup
  const schemaMarkup = generateLocationPageSchema({
    trade,
    townName,
    townSlug,
    countyName: county.name,
    countySlug: county.slug,
    region: county.region,
    entityLinks: countySEOData?.entityLinks,
  });

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaMarkup
        }}
      />

      {/* HERO - Trade-specific with dynamic accent */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Dark gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)`,
          }}
        />

        {/* Accent color glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #ff6b35 0%, transparent 70%)',
          }}
        />

        {/* Diagonal cut - now white to transition to light sections */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-white"
          style={{
            clipPath: 'polygon(0 100%, 100% 20%, 100% 100%)',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Content - 7 columns */}
            <div className="lg:col-span-7">
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
                <Link href={`/trades/locations/${county.slug}/${townSlug}`} className="hover:text-[#ff6b35] transition-colors">
                  {townName}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-white">{trade.name}</span>
              </nav>

              {/* Badges */}
              <div className="mb-8 flex flex-wrap gap-3">
                <Badge
                  className="text-white border-none px-5 py-2 text-sm font-bold uppercase tracking-wider"
                  style={{ backgroundColor: accent }}
                >
                  <Wrench className="mr-2 h-4 w-4" />
                  {trade.name}
                </Badge>
                <Badge className="bg-white/10 backdrop-blur text-white border border-white/20 px-5 py-2 text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  {townName}
                </Badge>
                <Badge className="bg-[#ff6b35] text-white border-none px-5 py-2 text-sm font-bold">
                  <Zap className="mr-2 h-4 w-4" />
                  {trade.avgLoanAmount}
                </Badge>
              </div>

              {/* H1 - Primary SEO keyword */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[0.9]">
                <span style={{ color: accent }}>{trade.name}</span><br />
                <span className="text-white">Business Loans</span><br />
                <span className="relative inline-block mt-2">
                  <span className="text-white/50 text-4xl md:text-5xl">in </span>
                  <span className="relative z-10 text-[#ff6b35]">{townName}</span>
                  <span
                    className="absolute bottom-1 left-8 right-0 h-3 -rotate-1"
                    style={{ backgroundColor: `${accent}30` }}
                  />
                </span>
              </h1>

              <p className="text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
                {trade.description}
                <strong className="text-white"> Specialist finance from £25k to £1m</strong> for {trade.name.toLowerCase()}s in {townName}.
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-white/80">24hr Decisions</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-white/80">No Upfront Fees</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2">
                  <Star className="h-5 w-5 text-[#ffd93d]" />
                  <span className="text-sm text-white/80">4.9/5 on Google</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="text-white font-bold text-lg px-10 py-7 rounded-full shadow-[0_0_40px_rgba(255,107,53,0.4)] hover:shadow-[0_0_60px_rgba(255,107,53,0.6)] hover:scale-105 transition-all uppercase tracking-wide"
                    style={{ backgroundColor: accent }}
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

            {/* Hero Image - 5 columns */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative">
                {/* Glow effect */}
                <div
                  className="absolute -inset-6 rounded-3xl blur-2xl opacity-30"
                  style={{
                    background: `linear-gradient(135deg, ${accent} 0%, transparent 100%)`,
                  }}
                />

                <img
                  src={heroImage}
                  alt={`${trade.name} business loans in ${townName}`}
                  className="relative w-full h-auto rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />

                {/* Floating stat cards */}
                <div
                  className="absolute -bottom-6 -left-6 rounded-2xl p-5 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform"
                  style={{ backgroundColor: accent }}
                >
                  <div className="text-2xl font-black text-white">{trade.avgLoanAmount}</div>
                  <div className="text-sm text-white/80">Average Funding</div>
                </div>

                <div className="absolute -top-4 -right-4 bg-[#1a1a2e] border border-white/10 rounded-2xl p-4 shadow-xl transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="text-xl font-black text-[#ff6b35]">24HR</div>
                  <div className="text-xs text-white/60">Decisions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT FINANCE SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Equipment list */}
            <div>
              <Badge
                className="border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${accent}15`, color: accent }}
              >
                Equipment We Finance
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-6">
                {trade.name} <span style={{ color: accent }}>Equipment</span><br />
                Finance in {townName}
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                As a {trade.name.toLowerCase()} in {townName}, you need reliable equipment.
                We finance everything from tools to vehicles to heavy machinery.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {trade.equipmentExamples.map((item, index) => (
                  <div
                    key={item}
                    className="group flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all transform hover:-translate-y-1"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${accent}15` }}
                    >
                      <CheckCircle className="h-6 w-6" style={{ color: accent }} />
                    </div>
                    <span className="font-semibold text-[#1a1a2e]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application steps card */}
            <div className="lg:sticky lg:top-8">
              <div
                className="rounded-2xl p-8 border border-gray-200 bg-white shadow-lg"
              >
                <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">
                  Get {trade.name} Finance in 3 Steps
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ backgroundColor: accent }}
                    >
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a1a2e] mb-1">Quick Application</h4>
                      <p className="text-gray-600 text-sm">Fill in our simple form in under 5 minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ backgroundColor: accent }}
                    >
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a1a2e] mb-1">Fast Decision</h4>
                      <p className="text-gray-600 text-sm">Get approved within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ backgroundColor: accent }}
                    >
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a1a2e] mb-1">Funds Released</h4>
                      <p className="text-gray-600 text-sm">Equipment delivered, you're ready to work</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-8 bg-gray-200" />

                <Link href="/contact">
                  <Button
                    className="w-full text-white font-bold py-6 rounded-xl text-lg"
                    style={{ backgroundColor: accent }}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Full width orange */}
      <section className="py-24 bg-[#ff6b35]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why {townName} {trade.name}s Choose Us
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We understand the {county.name} market. {county.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-[#ff6b35]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">24-Hour Decisions</h3>
              <p className="text-gray-600">No waiting around - get your answer fast.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-[#ff6b35]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">All Credit Considered</h3>
              <p className="text-gray-600">We help everyone access funding.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-[#ff6b35]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">Competitive Rates</h3>
              <p className="text-gray-600">Best deal guaranteed for your trade.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl font-black text-[#ff6b35] mb-1">£25k</div>
              <div className="text-gray-600 text-sm">Minimum Loan</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl font-black text-[#0ea5a5] mb-1">£1m</div>
              <div className="text-gray-600 text-sm">Maximum Loan</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl font-black text-[#ffd93d] mb-1">24hr</div>
              <div className="text-gray-600 text-sm">Fast Decisions</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl font-black text-[#8b5cf6] mb-1">98%</div>
              <div className="text-gray-600 text-sm">Approval Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRADE-SPECIFIC LOCAL MARKET - Unique content for this trade in this town */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Badge
              className="border-none px-4 py-2 mb-6 text-sm font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${accent}15`, color: accent }}
            >
              {trade.name} Work in {townName}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-6">
              Why {townName} Needs <span style={{ color: accent }}>{trade.name}s</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Trade-specific local introduction */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {tradeLocalIntro}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {townLocalInfo.tradeMarket.characterDescription}
              </p>
            </div>

            {/* Local opportunities for this trade */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-2">
                <HardHat className="h-5 w-5" style={{ color: accent }} />
                {trade.name} Opportunities in {townName}
              </h3>
              <ul className="space-y-4">
                {tradeLocalOpportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${accent}15` }}
                    >
                      <TrendingUp className="h-4 w-4" style={{ color: accent }} />
                    </div>
                    <span className="text-gray-700">{opportunity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Two or Three columns: Key Industries, Major Employers (if available), Current Projects */}
          <div className={`grid gap-8 ${townLocalInfo.localEconomy.majorEmployers.length > 0 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {/* Key Industries driving demand */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${accent}15` }}
                >
                  <Briefcase className="h-6 w-6" style={{ color: accent }} />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e]">Key Industries</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Industries driving {trade.name.toLowerCase()} demand in {townName}
              </p>
              <div className="flex flex-wrap gap-2">
                {townLocalInfo.localEconomy.keyIndustries.slice(0, 4).map((industry) => (
                  <span key={industry} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            {/* Major Employers - Only show if we have real data */}
            {townLocalInfo.localEconomy.majorEmployers.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ff6b35]/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-[#ff6b35]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a2e]">Major Employers</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Companies needing {trade.name.toLowerCase()} services
                </p>
                <ul className="space-y-2">
                  {townLocalInfo.localEconomy.majorEmployers.slice(0, 4).map((employer) => (
                    <li key={employer} className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {employer}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Current Projects */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-[#6366f1]" />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e]">Local Projects</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Active developments needing {trade.name.toLowerCase()}s
              </p>
              <ul className="space-y-2">
                {townLocalInfo.tradeMarket.majorProjects.slice(0, 3).map((project) => (
                  <li key={project} className="flex items-center gap-2 text-gray-700 text-sm">
                    <Zap className="h-4 w-4 text-[#6366f1] flex-shrink-0" />
                    {project}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Local context with trade spin */}
          {townLocalInfo.localContext.historicalNote && (
            <div className="mt-12 bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4a] rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <MapPin className="h-5 w-5" style={{ color: accent }} />
                    {trade.name} Work in Historic {townName}
                  </h3>
                  <p className="text-white/80 mb-4">{townLocalInfo.localContext.historicalNote}</p>
                  <p className="text-white/90">
                    {trade.name}s in {townName} often work on a mix of historic and modern properties,
                    requiring both traditional skills and modern techniques.
                  </p>
                </div>
                {townLocalInfo.localContext.transportLinks && townLocalInfo.localContext.transportLinks.length > 0 && (
                  <div className="md:border-l md:border-white/20 md:pl-6">
                    <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Train className="h-4 w-4" />
                      Getting Around
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

      {/* ENHANCED EQUIPMENT FINANCE - From trade data */}
      {trade.equipmentCategories && trade.equipmentCategories.length > 0 && (
        <EquipmentFinanceSection
          tradeName={trade.name}
          tradeSlug={trade.slug}
          townName={townName}
          countyName={county.name}
          equipmentCategories={trade.equipmentCategories}
          popularBrands={trade.equipmentCategories.flatMap(cat =>
            cat.items.filter(item =>
              item.includes('Makita') || item.includes('DeWalt') || item.includes('Festool') ||
              item.includes('Fluke') || item.includes('Rothenberger') || item.includes('Megger') ||
              item.includes('Kubota') || item.includes('JCB') || item.includes('Graco')
            )
          ).slice(0, 8)}
          avgEquipmentLoan={trade.avgLoanAmount}
        />
      )}

      {/* CREDENTIALS SECTION - Certifications and industry bodies */}
      {trade.certifications && trade.certifications.length > 0 && (
        <CredentialsSection
          tradeName={trade.name}
          certifications={trade.certifications}
          industryBodies={countySEOData?.localEcosystem?.tradeBodies}
        />
      )}

      {/* FAQ SECTION - Trade-specific FAQs with schema */}
      {trade.faqs && trade.faqs.length > 0 && (
        <FAQSection
          tradeName={trade.name}
          townName={townName}
          countyName={county.name}
          faqs={trade.faqs}
        />
      )}

      {/* TESTIMONIALS SECTION - Customer reviews */}
      {trade.testimonials && trade.testimonials.length > 0 && (
        <TestimonialsSection
          tradeName={trade.name}
          countyName={county.name}
          testimonials={trade.testimonials}
        />
      )}

      {/* RELATED TRADES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-black text-[#1a1a2e]">
                Other Trade Finance in <span className="text-[#0ea5a5]">{townName}</span>
              </h2>
            </div>
            <Link href={`/trades/locations/${county.slug}/${townSlug}`}>
              <Button
                variant="outline"
                className="border-2 border-[#0ea5a5] text-[#0ea5a5] hover:bg-[#0ea5a5]/10 font-bold rounded-full"
              >
                View All Trades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedTrades.map((relatedTrade) => (
              <Link key={relatedTrade.slug} href={`/trades/locations/${county.slug}/${townSlug}/${relatedTrade.slug}`}>
                <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-[#ff6b35] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="font-bold text-[#1a1a2e] mb-2 group-hover:text-[#ff6b35] transition-colors">
                    {relatedTrade.name}
                  </div>
                  <div className="text-sm text-[#ff6b35]">{relatedTrade.avgLoanAmount}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER TOWNS */}
      {otherTowns.length > 0 && (
        <section className="py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-[#1a1a2e] mb-12">
              {trade.name} Loans in Other <span style={{ color: accent }}>{county.name}</span> Towns
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherTowns.map((town) => (
                <Link
                  key={town}
                  href={`/trades/locations/${county.slug}/${townToSlug(town)}/${trade.slug}`}
                >
                  <div className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-[#ff6b35] hover:shadow-lg transition-all">
                    <span className="font-semibold text-[#1a1a2e] group-hover:text-[#ff6b35] transition-colors">
                      {trade.name} in {town}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href={`/trades/locations/${county.slug}`}>
                <Button
                  variant="outline"
                  className="border-2 font-bold px-8 py-5 rounded-full"
                  style={{ borderColor: accent, color: accent }}
                >
                  View All {county.name} Locations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* MAP SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#1a1a2e] mb-4">
              {trade.name} Finance in <span style={{ color: accent }}>{townName}</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialist {trade.name.toLowerCase()} business loans across {townName} and the wider {county.name} area.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${townName}, ${county.name}, UK`)}&zoom=12`}
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

      {/* Internal Linking: Related Trades */}
      <RelatedTradesLinks
        currentTradeSlug={trade.slug}
        townName={townName}
        townSlug={townSlug}
        countySlug={county.slug}
        limit={4}
      />

      {/* Internal Linking: Equipment by Trade */}
      <EquipmentLinks
        tradeSlug={trade.slug}
        tradeName={trade.name}
        limit={3}
        className="bg-muted"
      />

      {/* CTA - Trade-specific gradient */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accent} 0%, #ff6b35 50%, #ffd93d 100%)`,
          }}
        />

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Grow Your<br />
              <span className="text-black/80">{trade.name} Business?</span>
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Get {trade.name.toLowerCase()} business loans in {townName}.
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
