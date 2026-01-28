"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
  Wrench,
  Zap,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  ChevronRight,
  Phone,
  Star,
  TrendingUp,
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
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const manufacturers = [
  { name: 'Milwaukee', slug: 'milwaukee', tier: 'Professional', priceRange: '£200-£3,000', gradient: 'from-red-600 to-red-700' },
  { name: 'Festool', slug: 'festool', tier: 'Premium', priceRange: '£500-£5,000', gradient: 'from-green-600 to-green-700' },
  { name: 'DeWalt', slug: 'dewalt', tier: 'Professional', priceRange: '£150-£2,500', gradient: 'from-yellow-600 to-yellow-700' },
  { name: 'Makita', slug: 'makita', tier: 'Professional', priceRange: '£150-£2,000', gradient: 'from-teal-600 to-teal-700' },
  { name: 'Bosch', slug: 'bosch', tier: 'Professional', priceRange: '£150-£2,000', gradient: 'from-blue-600 to-blue-700' },
  { name: 'Fluke', slug: 'fluke', tier: 'Premium', priceRange: '£300-£3,000', gradient: 'from-orange-600 to-orange-700' },
  { name: 'Megger', slug: 'megger', tier: 'Professional', priceRange: '£200-£2,500', gradient: 'from-purple-600 to-purple-700' },
  { name: 'Hilti', slug: 'hilti', tier: 'Premium', priceRange: '£500-£5,000', gradient: 'from-red-700 to-red-800' },
];

const trades = [
  { name: 'Electricians', slug: 'electricians', icon: Zap, description: 'Testing equipment, power tools, and more' },
  { name: 'Plumbers', slug: 'plumbers', icon: Wrench, description: 'Press tools, pipe equipment, and diagnostics' },
  { name: 'Builders', slug: 'builders', icon: CheckCircle, description: 'Power tools, machinery, and site equipment' },
  { name: 'Carpenters', slug: 'carpenters', icon: Wrench, description: 'Precision tools, saws, and woodworking equipment' },
  { name: 'HVAC Engineers', slug: 'hvac-engineers', icon: TrendingUp, description: 'Analyzers, manifolds, and diagnostic tools' },
];

export default function ToolFinanceHub() {
  return (
    <main className="min-h-screen">
      {/* === HERO SECTION - Dark Industrial === */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Diagonal stripe accent */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              #ff6b35 40px,
              #ff6b35 42px
            )`,
          }}
        />

        {/* Industrial grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(#fff 1px, transparent 1px),
              linear-gradient(90deg, #fff 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-full text-[#ff6b35] text-sm font-semibold">
                <Wrench className="w-4 h-4" />
                Tool Finance
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Finance Professional Tools
              <span className="block text-[#ff6b35]">From Leading Brands</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
            >
              Spread the cost over 12-60 months. 89% approval rate. Decision in 60 seconds.
              Get the tools you need to grow your trade business.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#ff6b35] hover:bg-[#ff8f5a] text-white h-14 px-8 text-lg font-semibold"
              >
                <Link href="/calculators">
                  Calculate Finance
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 h-14 px-8 text-lg font-semibold"
              >
                <Link href="/contact">
                  <Phone className="mr-2 w-5 h-5" />
                  Get in Touch
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === STATS BAR === */}
      <section className="relative bg-gray-900 border-y border-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Minimum Finance', value: '£500', icon: Shield },
              { label: 'Approval Rate', value: '89%', icon: Star },
              { label: 'Decision Time', value: '60s', icon: Clock },
              { label: 'Terms Available', value: '12-60mo', icon: CheckCircle },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-[#ff6b35] mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === MANUFACTURERS SECTION === */}
      <section className="relative py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Finance by <span className="text-[#ff6b35]">Manufacturer</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400"
            >
              Get finance for tools from the brands you trust
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {manufacturers.map((manufacturer) => (
              <motion.div
                key={manufacturer.slug}
                variants={scaleIn}
              >
                <Link
                  href={`/tools/finance/${manufacturer.slug}`}
                  className="group block relative overflow-hidden bg-gray-900 border-2 border-white/5 hover:border-[#ff6b35] rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-[#ff6b35]/20"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${manufacturer.gradient} opacity-10 rounded-full blur-3xl transition-opacity group-hover:opacity-20`} />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#ff6b35] transition-colors">
                      {manufacturer.name}
                    </h3>
                    <div className="text-sm text-gray-400 mb-3">{manufacturer.tier}</div>
                    <div className="text-lg font-semibold text-[#ff6b35] mb-4">{manufacturer.priceRange}</div>
                    <div className="flex items-center text-white/60 group-hover:text-white transition-colors">
                      <span className="text-sm">View Finance Options</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === TRADES SECTION === */}
      <section className="relative py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Finance by <span className="text-[#ff6b35]">Trade</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400"
            >
              Tools and equipment specific to your trade
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {trades.map((trade) => (
              <motion.div
                key={trade.slug}
                variants={scaleIn}
              >
                <Link
                  href={`/tools/finance/for-${trade.slug}`}
                  className="group block relative overflow-hidden bg-gray-950 border-2 border-white/5 hover:border-[#ff6b35] rounded-lg p-8 transition-all hover:shadow-lg hover:shadow-[#ff6b35]/20"
                >
                  <trade.icon className="w-12 h-12 text-[#ff6b35] mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#ff6b35] transition-colors">
                    For {trade.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{trade.description}</p>
                  <div className="flex items-center text-[#ff6b35] group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-semibold">View Essential Tools</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === WHY FINANCE SECTION === */}
      <section className="relative py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Why <span className="text-[#ff6b35]">Finance Your Tools?</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Shield,
                title: 'Preserve Cash Flow',
                description: 'Spread the cost of professional tools over 12-60 months instead of paying upfront.',
              },
              {
                icon: TrendingUp,
                title: 'Start Earning Immediately',
                description: 'Get the tools you need to take on jobs now, not after saving for months.',
              },
              {
                icon: CheckCircle,
                title: 'Tax Deductible',
                description: 'Finance payments are typically 100% tax deductible as a business expense.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={scaleIn}
                className="text-center p-8 bg-gray-900 border border-white/5 rounded-lg"
              >
                <benefit.icon className="w-16 h-16 text-[#ff6b35] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="relative py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Finance Your Tools?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Apply in 60 seconds. 89% approval rate. Finance from £50/month.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#ff6b35] hover:bg-[#ff8f5a] text-white h-14 px-8 text-lg font-semibold"
            >
              <Link href="/contact">
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
