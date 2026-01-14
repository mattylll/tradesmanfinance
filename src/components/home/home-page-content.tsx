"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { trades } from "@/data/trades";
import { counties, getTotalTowns } from "@/data/locations";
import { Button } from "@/registry/new-york-v4/ui/button";
import { IndustrialHero } from "@/components/hero/industrial-hero";
import { LoanCalculator } from "@/components/calculator/loan-calculator";
import { QuickQuoteForm } from "@/components/forms/quick-quote-form";
import {
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Star,
  MapPin,
  FileCheck,
  Banknote,
  ThumbsUp,
  Truck,
  Receipt,
  Wallet,
  Wrench,
  Building2,
  Phone,
  Zap,
  Quote,
  ChevronRight,
} from "lucide-react";

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
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export function HomePageContent() {
  const totalCounties = Object.keys(counties).length;
  const totalTowns = getTotalTowns();
  const totalTrades = trades.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const financeTypes = [
    {
      name: "Equipment Finance",
      description: "Fund tools, machinery, and specialist equipment",
      icon: Wrench,
      href: "/products/equipment-finance",
      gradient: "from-[#ff6b35] to-[#ff8f5a]",
      stat: "£2k-£500k",
    },
    {
      name: "Vehicle Finance",
      description: "Vans, trucks, and work vehicles",
      icon: Truck,
      href: "/products/vehicle-finance",
      gradient: "from-[#0ea5a5] to-[#14b8a6]",
      stat: "0% deposit",
    },
    {
      name: "Business Loans",
      description: "Growth, expansion, or working capital",
      icon: Building2,
      href: "/products/business-loans",
      gradient: "from-[#6366f1] to-[#818cf8]",
      stat: "24hr decisions",
    },
    {
      name: "Cashflow Finance",
      description: "Keep running smoothly between jobs",
      icon: Wallet,
      href: "/products/cashflow-finance",
      gradient: "from-[#10b981] to-[#34d399]",
      stat: "Flexible terms",
    },
    {
      name: "Invoice Finance",
      description: "Unlock cash from unpaid invoices",
      icon: Receipt,
      href: "/products/invoice-finance",
      gradient: "from-[#f59e0b] to-[#fbbf24]",
      stat: "Same day",
    },
  ];

  const popularLocations = [
    { name: "London", slug: "greater-london", emoji: "🏙️" },
    { name: "Birmingham", slug: "west-midlands", emoji: "🔧" },
    { name: "Manchester", slug: "greater-manchester", emoji: "⚡" },
    { name: "Leeds", slug: "west-yorkshire", emoji: "🔨" },
    { name: "Edinburgh", slug: "edinburgh", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    { name: "Liverpool", slug: "merseyside", emoji: "🔩" },
    { name: "Bristol", slug: "bristol", emoji: "🛠️" },
    { name: "Glasgow", slug: "glasgow", emoji: "⚙️" },
  ];

  const testimonials = [
    {
      name: "James Wilson",
      trade: "Electrician",
      location: "Manchester",
      rating: 5,
      amount: "£45,000",
      purpose: "Van & equipment",
      quote: "Fantastic service! Got approved for my van finance within 24 hours. The team really understood what I needed.",
      image: "JW",
    },
    {
      name: "Sarah Mitchell",
      trade: "Plumber",
      location: "Birmingham",
      rating: 5,
      amount: "£28,000",
      purpose: "Business expansion",
      quote: "As a female plumber starting out, I was worried about getting finance. Tradesman Finance made it simple.",
      image: "SM",
    },
    {
      name: "David Thompson",
      trade: "Builder",
      location: "Leeds",
      rating: 5,
      amount: "£75,000",
      purpose: "Equipment & materials",
      quote: "Best rates I found anywhere. The application was straightforward and money in my account within days.",
      image: "DT",
    },
  ];

  const processSteps = [
    {
      step: 1,
      icon: FileCheck,
      title: "Apply in 5 Minutes",
      description: "Quick online form. No paperwork needed initially.",
      detail: "Basic info only",
    },
    {
      step: 2,
      icon: Zap,
      title: "Instant Decision",
      description: "Get approved within 24 hours from our lending partners.",
      detail: "92% approval rate",
    },
    {
      step: 3,
      icon: Banknote,
      title: "Funds Released",
      description: "Money in your account fast so you can get to work.",
      detail: "Often same week",
    },
  ];

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <IndustrialHero
        title="Finance Solutions for UK Tradesmen"
        highlightWords={["UK Tradesmen"]}
        description="Equipment finance, vehicle loans, cashflow solutions, and business funding. Everything you need to grow your trade business."
        primaryCTA={{ text: "Get Your Free Quote", href: "#quote-form" }}
        secondaryCTA={{ text: "0800 123 4567", phone: "tel:08001234567" }}
      />

      {/* === TRUST BAR === */}
      <section className="relative bg-gray-950 border-b border-white/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { icon: Shield, text: "FCA Regulated", highlight: true },
              { icon: Star, text: "4.8★ Trustpilot", highlight: false },
              { icon: Clock, text: "Same Day Decisions", highlight: false },
              { icon: Users, text: "50,000+ Funded", highlight: false },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <item.icon className={`h-4 w-4 ${item.highlight ? 'text-[#ff6b35]' : 'text-gray-400'}`} />
                <span className="text-sm font-medium text-gray-300">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINANCE TYPES - DARK INDUSTRIAL CARDS === */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

        {/* Diagonal lines pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              #ff6b35 0px,
              #ff6b35 1px,
              transparent 1px,
              transparent 40px
            )`,
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(#fff 1px, transparent 1px),
              linear-gradient(90deg, #fff 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Zap className="h-4 w-4 text-[#ff6b35]" />
              <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">
                Complete Finance Solutions
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Every Type of Finance
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd93d]"> You Need</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From equipment and vehicles to cashflow and invoices — comprehensive funding for UK tradesmen.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
          >
            {financeTypes.map((finance, index) => (
              <motion.div
                key={finance.name}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <Link href={finance.href}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative h-full"
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${finance.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`} />

                    {/* Card */}
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-[#ff6b35]/40 group-hover:bg-white/[0.08]">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${finance.gradient} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <finance.icon className="h-7 w-7 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#ff6b35] transition-colors">
                        {finance.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                        {finance.description}
                      </p>

                      {/* Stat badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#ff6b35] px-2.5 py-1 rounded-full bg-[#ff6b35]/10">
                          {finance.stat}
                        </span>
                      </div>

                      {/* Arrow */}
                      <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="h-4 w-4 text-[#ff6b35]" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === CALCULATOR SECTION - GRADIENT TRANSITION === */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Gradient background - light with industrial accents */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white" />

        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Top decorative border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 mb-6">
                <Zap className="h-4 w-4 text-[#ff6b35]" />
                <span className="text-sm font-medium text-[#ff6b35] tracking-wide uppercase">
                  Instant Calculator
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]"
                style={{ fontFamily: "var(--font-industrial)" }}
              >
                See Your Monthly
                <span className="text-[#ff6b35]"> Payments</span>
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Use our calculator to see how affordable trade finance can be. Get an instant estimate with no credit check required.
              </p>

              {/* Feature list */}
              <div className="space-y-4 mb-8">
                {[
                  "No credit check to get a quote",
                  "Rates from 4.9% APR representative",
                  "Terms from 12 to 60 months",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#ff6b35]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-[#ff6b35]" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "£50M+", label: "Funded" },
                  { value: "92%", label: "Approval" },
                  { value: "24hrs", label: "Decisions" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200"
                  >
                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Calculator */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={scaleIn}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Shadow glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#ff6b35]/20 to-[#ffd93d]/10 rounded-3xl blur-2xl opacity-50" />
              <LoanCalculator className="relative shadow-2xl border-2 border-gray-200 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS - DARK SECTION === */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 107, 53, 0.4) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Accent glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Zap className="h-4 w-4 text-[#ffd93d]" />
              <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">
                Simple 3-Step Process
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              How It <span className="text-[#ffd93d]">Works</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Getting finance for your trade business is simple. We&apos;ve streamlined the process to get you funded fast.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto"
          >
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Connection line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5">
                    <div className="w-full h-full bg-gradient-to-r from-[#ff6b35]/60 via-[#ff6b35]/30 to-transparent" />
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.3, duration: 0.8 }}
                      className="absolute inset-0 bg-gradient-to-r from-[#ffd93d] to-transparent origin-left"
                    />
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center h-full group hover:border-[#ff6b35]/40 transition-colors"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ffd93d] flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">{item.step}</span>
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 mx-auto mb-6 w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-9 w-9 text-[#ff6b35]" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Detail badge */}
                  <span className="inline-block text-xs font-semibold text-[#ffd93d] px-3 py-1.5 rounded-full bg-[#ffd93d]/10 border border-[#ffd93d]/20">
                    {item.detail}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === FEATURED TRADES - DRAMATIC CARDS === */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-white">
        {/* Subtle pattern */}
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5a5]/10 border border-[#0ea5a5]/20 mb-6">
              <Wrench className="h-4 w-4 text-[#0ea5a5]" />
              <span className="text-sm font-medium text-[#0ea5a5] tracking-wide uppercase">
                {totalTrades} Trade Specialisms
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Finance for <span className="text-[#ff6b35]">Every Trade</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We specialize in equipment finance for tradesmen across all sectors.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {trades.slice(0, 8).map((trade, index) => (
              <motion.div key={trade.slug} variants={fadeInUp} transition={{ duration: 0.5 }}>
                <Link href={`/trades/${trade.slug}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative h-full"
                  >
                    {/* Card */}
                    <div className="relative bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-[#ff6b35] group-hover:shadow-xl group-hover:bg-white">
                      {/* Trade emoji/icon */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{trade.emoji || "🔧"}</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
                      </div>

                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#ff6b35] transition-colors">
                        {trade.name}
                      </h3>

                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {trade.description}
                      </p>

                      {/* Amount badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#ff6b35]">
                          From {trade.avgLoanAmount}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#ff6b35] group-hover:translate-x-1 transition-all" />
                      </div>

                      {/* Equipment tags */}
                      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-1.5">
                        {trade.equipmentExamples.slice(0, 2).map((item) => (
                          <span
                            key={item}
                            className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link href="/trades">
              <Button
                size="lg"
                className="bg-gray-900 text-white hover:bg-gray-800 font-semibold text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
              >
                View All {totalTrades} Trades
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* === TESTIMONIALS - DARK DRAMATIC SECTION === */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Quote pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <Quote className="absolute top-20 left-10 w-32 h-32 text-white" />
          <Quote className="absolute bottom-20 right-10 w-24 h-24 text-white rotate-180" />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffd93d]/10 border border-[#ffd93d]/20 mb-6">
              <Star className="h-4 w-4 text-[#ffd93d] fill-[#ffd93d]" />
              <span className="text-sm font-medium text-[#ffd93d] tracking-wide uppercase">
                500+ Verified Reviews
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Trusted by <span className="text-[#ffd93d]">Tradesmen</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands of tradesmen who have grown their businesses with our finance solutions.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-full"
                >
                  {/* Card */}
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:border-[#ffd93d]/30 transition-colors">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-[#ffd93d] fill-[#ffd93d]"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-300 mb-6 leading-relaxed text-lg">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    {/* Finance details */}
                    <div className="flex gap-3 mb-6">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20">
                        {testimonial.amount}
                      </span>
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                        {testimonial.purpose}
                      </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ffd93d] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {testimonial.image}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.trade} • {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === QUOTE FORM SECTION === */}
      <section id="quote-form" className="relative py-20 md:py-28 overflow-hidden">
        {/* Light gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white" />

        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Benefits */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 mb-6">
                <Zap className="h-4 w-4 text-[#ff6b35]" />
                <span className="text-sm font-medium text-[#ff6b35] tracking-wide uppercase">
                  Free Quote
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
                style={{ fontFamily: "var(--font-industrial)" }}
              >
                Ready to <span className="text-[#ff6b35]">Get Started?</span>
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Fill in the form and one of our trade finance specialists will contact you within 24 hours with your personalised quote.
              </p>

              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4 mb-8"
              >
                {[
                  "No obligation — completely free",
                  "No impact on your credit score",
                  "Decisions within 24 hours",
                  "Flexible repayment terms",
                  "Specialist trade finance expertise",
                ].map((benefit, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 bg-gradient-to-br from-[#ff6b35]/5 to-[#ffd93d]/5 rounded-2xl border border-[#ff6b35]/20"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#ffd93d] flex items-center justify-center">
                    <ThumbsUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 text-lg">
                      92% Approval Rate
                    </p>
                    <p className="text-gray-600">
                      We work with multiple lenders to find the right solution for your business.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={scaleIn}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Shadow glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#ff6b35]/20 to-[#ffd93d]/10 rounded-3xl blur-2xl opacity-50" />
              <QuickQuoteForm className="relative shadow-2xl rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* === LOCATIONS SECTION === */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" />

        {/* Map pattern hint */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0ea5a5 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5a5]/10 border border-[#0ea5a5]/20 mb-6">
              <MapPin className="h-4 w-4 text-[#0ea5a5]" />
              <span className="text-sm font-medium text-[#0ea5a5] tracking-wide uppercase">
                {totalCounties} Counties • {totalTowns}+ Towns
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              UK-Wide <span className="text-[#0ea5a5]">Coverage</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We provide trade finance across the entire UK. Find specialist funding in your local area.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-4 grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto mb-12"
          >
            {popularLocations.map((location, index) => (
              <motion.div key={location.slug} variants={fadeInUp} transition={{ duration: 0.4 }}>
                <Link href={`/trades/locations/${location.slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5a5]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center transition-all duration-300 group-hover:border-[#0ea5a5]/50 group-hover:bg-white/10">
                      <span className="text-2xl mb-2 block">{location.emoji}</span>
                      <span className="block font-bold text-white group-hover:text-[#0ea5a5] transition-colors">
                        {location.name}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Link href="/trades/locations">
              <Button
                size="lg"
                className="bg-[#0ea5a5] text-white hover:bg-[#0d9494] font-semibold text-lg px-10 py-6 rounded-xl shadow-lg shadow-[#0ea5a5]/25 hover:shadow-xl hover:shadow-[#0ea5a5]/30 transition-all group"
              >
                View All Locations
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* === FINAL CTA - GRADIENT HERO SECTION === */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] via-[#ff8f5a] to-[#ffd93d]" />

        {/* Animated dot pattern */}
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
              Ready to Grow Your Business?
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Get a free, no-obligation quote today. Our team specializes in trade finance and can help you find the right funding.
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
              <Link href="#quote-form">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="bg-gray-900 text-white hover:bg-gray-800 font-bold text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-3xl transition-all"
                  >
                    Get Your Free Quote
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
                    Call 0800 123 4567
                  </Button>
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
