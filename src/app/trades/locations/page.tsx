"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

import { counties, getRegions, getTotalTowns } from '@/data/locations';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
  ArrowRight,
  MapPin,
  Phone,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
  Zap,
  ChevronRight,
  Building2,
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function LocationsPage() {
  const regions = getRegions();
  const totalTowns = getTotalTowns();
  const totalCounties = Object.keys(counties).length;

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
  ];

  // Region colors for visual differentiation
  const regionColors: Record<string, string> = {
    'London': '#ff6b35',
    'South East England': '#0ea5a5',
    'South West England': '#6366f1',
    'East of England': '#10b981',
    'East Midlands': '#f59e0b',
    'West Midlands': '#ec4899',
    'North West England': '#8b5cf6',
    'Yorkshire and the Humber': '#14b8a6',
    'North East England': '#f97316',
    'Scotland': '#3b82f6',
  };

  return (
    <main className="min-h-screen">
      {/* === HERO SECTION - Dark Industrial === */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Map-like dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0ea5a5 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

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

        {/* Gradient orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#0ea5a5]/20 via-[#0ea5a5]/5 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#ff6b35]/15 via-[#ff6b35]/5 to-transparent blur-3xl"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-gray-950/40" />

        <div className="container relative mx-auto px-4 py-20 lg:py-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            {/* Breadcrumbs */}
            <motion.nav variants={fadeInUp} className="mb-6 text-sm text-white/50">
              <Link href="/" className="hover:text-[#0ea5a5] transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/trades" className="hover:text-[#0ea5a5] transition-colors">Trades</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Locations</span>
            </motion.nav>

            {/* Eyebrow badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-8">
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-[#0ea5a5]" />
                <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">
                  UK Wide Coverage
                </span>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Trade Finance{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5a5] via-[#14b8a6] to-[#ffd93d]">
                Locations
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
            >
              Trade finance solutions across the entire United Kingdom. Find specialist funding in your local area.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6 mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4"
              >
                <div className="text-4xl font-black text-[#0ea5a5]">{totalCounties}</div>
                <div className="text-sm text-gray-400">Counties</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4"
              >
                <div className="text-4xl font-black text-[#ffd93d]">{totalTowns}+</div>
                <div className="text-sm text-gray-400">Towns</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4"
              >
                <div className="text-4xl font-black text-[#ff6b35]">10</div>
                <div className="text-sm text-gray-400">Regions</div>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-x-8 gap-y-3"
            >
              {[
                { icon: <CheckCircle className="h-4 w-4" />, text: "Same Day Decisions" },
                { icon: <CheckCircle className="h-4 w-4" />, text: "Local Market Expertise" },
                { icon: <CheckCircle className="h-4 w-4" />, text: "All Areas Covered" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="text-[#0ea5a5]">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0ea5a5] via-[#ffd93d] to-[#ff6b35] origin-left"
        />
      </section>

      {/* === TRUST BAR === */}
      <section className="relative bg-gray-950 border-b border-white/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { icon: Shield, text: "25+ Years Experience", highlight: true },
              { icon: Star, text: "4.8★ Trustpilot", highlight: false },
              { icon: Clock, text: "24hr Decisions", highlight: false },
              { icon: Users, text: "50,000+ Funded", highlight: false },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <item.icon className={`h-4 w-4 ${item.highlight ? 'text-[#0ea5a5]' : 'text-gray-400'}`} />
                <span className="text-sm font-medium text-gray-300">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === REGIONS GRID === */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-white">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#000 1px, transparent 1px),
              linear-gradient(90deg, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container relative mx-auto px-4">
          {regionOrder.map((regionName, regionIndex) => {
            const regionCounties = regions[regionName];
            if (!regionCounties || regionCounties.length === 0) return null;

            const regionColor = regionColors[regionName] || '#ff6b35';

            return (
              <motion.div
                key={regionName}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="mb-16 last:mb-0"
              >
                {/* Region header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${regionColor}20` }}
                  >
                    <Building2 className="h-6 w-6" style={{ color: regionColor }} />
                  </div>
                  <div>
                    <h2
                      className="text-2xl md:text-3xl font-black text-gray-900"
                      style={{ fontFamily: "var(--font-industrial)" }}
                    >
                      {regionName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {regionCounties.length} {regionCounties.length === 1 ? 'county' : 'counties'}
                    </p>
                  </div>
                </div>

                {/* Counties grid */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                >
                  {regionCounties.map((countySlug) => {
                    const county = counties[countySlug];
                    return (
                      <motion.div key={countySlug} variants={fadeInUp}>
                        <Link href={`/trades/locations/${countySlug}`}>
                          <motion.div
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className="group h-full bg-gray-50 border-2 border-gray-200 rounded-xl p-5 transition-all hover:shadow-lg"
                            style={{
                              borderLeftWidth: '4px',
                              borderLeftColor: regionColor,
                            }}
                          >
                            <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-gray-700 transition-colors">
                              {county.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">
                              {county.towns.length} towns
                            </p>
                            <p className="text-sm text-gray-400 line-clamp-2">
                              {county.description}
                            </p>
                            <ChevronRight
                              className="float-right mt-2 h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform"
                              style={{ color: regionColor }}
                            />
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5a5] via-[#14b8a6] to-[#10b981]" />

        {/* Dot pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white/20 rotate-45" />

        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Can&apos;t Find Your Location?
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              We provide finance to tradesmen across the entire UK. Get in touch and we&apos;ll help you find the right solution for your business.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.4 }}>
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-[#0ea5a5] hover:bg-gray-100 font-bold text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-3xl transition-all"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ duration: 0.4 }}>
              <a href="tel:08001234567">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/80 bg-white/10 text-white hover:bg-white/20 font-bold text-lg px-10 py-7 rounded-xl backdrop-blur-sm"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    0800 123 4567
                  </Button>
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
