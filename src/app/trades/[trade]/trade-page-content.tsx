"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

import { type Trade } from '@/data/trades';
import { type County } from '@/data/locations';
import { getContentHubForTrade } from '@/data/content-hub';
import { Button } from '@/registry/new-york-v4/ui/button';
import { RelatedContent } from '@/components/seo/related-content';
import {
  ArrowRight,
  Phone,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
  Zap,
  MapPin,
  ChevronRight,
  Wrench,
  TrendingUp,
  ChevronDown,
  Quote,
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
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// Get trade hero image
function getTradeHeroImage(tradeSlug: string): string {
  const available = [
    'electrician', 'plumber', 'builder', 'carpenter', 'roofer', 'hvac'
  ];

  if (available.includes(tradeSlug)) {
    return `/images/${tradeSlug}-hero.png`;
  }
  return '/images/builder-hero.png';
}

interface TradePageContentProps {
  trade: Trade;
  countyData: County[];
  relatedTrades: Trade[];
}

export function TradePageContent({
  trade,
  countyData,
  relatedTrades,
}: TradePageContentProps) {
  const heroImage = getTradeHeroImage(trade.slug);

  return (
    <main className="min-h-screen overflow-hidden">
      {/* === HERO SECTION - Dark Industrial === */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
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

        {/* Gradient orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#ff6b35]/20 via-[#ff6b35]/5 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#0ea5a5]/15 via-[#0ea5a5]/5 to-transparent blur-3xl"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-gray-950/40" />

        <div className="container relative mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Breadcrumbs */}
              <motion.nav variants={fadeInUp} className="mb-6 text-sm text-white/50">
                <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/trades" className="hover:text-[#ff6b35] transition-colors">Trades</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{trade.name}</span>
              </motion.nav>

              {/* Badges */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ff6b35] text-white">
                  <span className="text-xl">{trade.emoji || "🔧"}</span>
                  <span className="text-sm font-bold uppercase tracking-wider">{trade.name}</span>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Zap className="h-4 w-4 text-[#ffd93d]" />
                  <span className="text-sm font-medium text-gray-300">{trade.avgLoanAmount}</span>
                </div>
              </motion.div>

              {/* Main headline - SEO optimized H1 */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight"
                style={{ fontFamily: "var(--font-industrial)" }}
              >
                {trade.name}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] via-[#ff8f5a] to-[#ffd93d]">
                  Finance
                </span>
                <br className="hidden sm:block" />
                <span className="text-2xl sm:text-3xl md:text-4xl text-gray-400 font-bold">
                  & Business Loans
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-400 max-w-xl mb-8 leading-relaxed"
              >
                {trade.description}
              </motion.p>

              {/* Trust indicators */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-x-6 gap-y-3 mb-10"
              >
                {[
                  { icon: <CheckCircle className="h-4 w-4" />, text: "No Upfront Fees" },
                  { icon: <CheckCircle className="h-4 w-4" />, text: "24hr Decisions" },
                  { icon: <CheckCircle className="h-4 w-4" />, text: "All Credit Considered" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="text-green-400">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4"
              >
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      size="lg"
                      className="relative overflow-hidden bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] hover:from-[#e55a2b] hover:to-[#ff6b35] text-white font-bold text-lg px-10 py-7 rounded-xl shadow-[0_0_40px_rgba(255,107,53,0.3)] hover:shadow-[0_0_60px_rgba(255,107,53,0.4)] transition-all border-0 group"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Get Your Quote
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </motion.div>
                </Link>

                <a href="tel:08001234567">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 font-semibold text-lg px-10 py-7 rounded-xl backdrop-blur-sm transition-all"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      0800 123 4567
                    </Button>
                  </motion.div>
                </a>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Background glow */}
                <div className="absolute -inset-8 bg-gradient-to-br from-[#ff6b35]/20 to-[#0ea5a5]/10 rounded-3xl blur-2xl" />

                <img
                  src={heroImage}
                  alt={`${trade.name} finance and equipment loans`}
                  className="relative w-full h-auto rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />

                {/* Floating stat cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl"
                >
                  <div className="text-3xl font-black text-[#ff6b35]">{trade.avgLoanAmount}</div>
                  <div className="text-sm text-gray-500">Average Funding</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-4 -right-4 bg-[#ffd93d] rounded-xl p-4 shadow-lg transform rotate-3"
                >
                  <div className="text-xl font-black text-gray-900">24HR</div>
                  <div className="text-xs text-gray-700">Decisions</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff6b35] via-[#ffd93d] to-[#ff6b35] origin-left"
        />
      </section>

      {/* === TRUST BAR === */}
      <section className="relative bg-gray-950 border-b border-white/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { icon: Shield, text: "FCA Regulated", highlight: true },
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
                <item.icon className={`h-4 w-4 ${item.highlight ? 'text-[#ff6b35]' : 'text-gray-400'}`} />
                <span className="text-sm font-medium text-gray-300">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === EQUIPMENT WE FINANCE === */}
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Equipment list */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5a5]/10 border border-[#0ea5a5]/20 mb-6">
                <Wrench className="h-4 w-4 text-[#0ea5a5]" />
                <span className="text-sm font-medium text-[#0ea5a5] tracking-wide uppercase">
                  Equipment Finance
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
                style={{ fontFamily: "var(--font-industrial)" }}
              >
                What We <span className="text-[#0ea5a5]">Fund</span>
              </h2>

              <p className="text-gray-600 text-lg mb-8">
                As a {trade.name.toLowerCase()}, you need reliable equipment to deliver quality work.
                We provide flexible finance for all your {trade.name.toLowerCase()} equipment needs.
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {trade.equipmentExamples.map((item, index) => (
                  <motion.div
                    key={item}
                    variants={fadeInUp}
                    transition={{ duration: 0.4 }}
                    className="group flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-[#0ea5a5] hover:bg-white transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0ea5a5]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0ea5a5] transition-colors">
                      <CheckCircle className="h-5 w-5 text-[#0ea5a5] group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-medium text-gray-900">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Why choose us */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={scaleIn}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-[#ff6b35]/10 to-[#ffd93d]/5 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-br from-[#ff6b35] to-[#ff8f5a] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                <p className="text-white/80 mb-6">Specialist trade finance experts who understand your business.</p>

                <div className="space-y-5">
                  {[
                    { num: "1", title: "Quick Decisions", desc: "Get a decision within 24 hours" },
                    { num: "2", title: "Flexible Terms", desc: "12 to 60 month payment options" },
                    { num: "3", title: "Trade Specialists", desc: "We understand your industry" },
                    { num: "4", title: "All Credit Welcome", desc: "We consider all applications" },
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {item.num}
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-white/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === FAQs === */}
      {trade.faqs && trade.faqs.length > 0 && (
        <section className="relative py-20 md:py-28 overflow-hidden bg-gray-50">
          <div className="container relative mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 mb-6">
                <Zap className="h-4 w-4 text-[#6366f1]" />
                <span className="text-sm font-medium text-[#6366f1] tracking-wide uppercase">
                  FAQ
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
                style={{ fontFamily: "var(--font-industrial)" }}
              >
                Common <span className="text-[#6366f1]">Questions</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-3xl mx-auto space-y-4"
            >
              {trade.faqs.map((faq, index) => (
                <motion.details
                  key={index}
                  variants={fadeInUp}
                  className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#6366f1]/50 transition-colors"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-bold text-gray-900 pr-4">{faq.question}</h3>
                    <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.details>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* === TESTIMONIALS === */}
      {trade.testimonials && trade.testimonials.length > 0 && (
        <section className="relative py-20 md:py-28 overflow-hidden">
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
                  Customer Stories
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
                style={{ fontFamily: "var(--font-industrial)" }}
              >
                What {trade.name}s <span className="text-[#ffd93d]">Say</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {trade.testimonials.slice(0, 2).map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#ffd93d]/30 transition-colors"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-[#ffd93d] fill-[#ffd93d]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-300 mb-6 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Finance details */}
                  {testimonial.loanAmount && (
                    <div className="flex gap-3 mb-6">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20">
                        {testimonial.loanAmount}
                      </span>
                    </div>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ffd93d] flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.business} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* === LOCATIONS SECTION === */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-white">
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
                UK Wide Coverage
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              {trade.name} Finance by <span className="text-[#0ea5a5]">Location</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find {trade.name.toLowerCase()} finance solutions in your area
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {countyData.map((county) => (
              <motion.div key={county.slug} variants={fadeInUp}>
                <Link href={`/trades/locations/${county.slug}`}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="group bg-gray-50 border-2 border-gray-200 rounded-xl p-5 hover:border-[#0ea5a5] hover:bg-white transition-all"
                  >
                    <h3 className="font-bold text-gray-900 group-hover:text-[#0ea5a5] transition-colors mb-1">
                      {county.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {county.towns.length} towns
                    </p>
                    <ChevronRight className="float-right h-4 w-4 text-gray-400 group-hover:text-[#0ea5a5] transition-colors" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link href="/trades/locations">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#0ea5a5] text-[#0ea5a5] hover:bg-[#0ea5a5]/10 font-bold px-8 py-6 rounded-xl"
              >
                View All Locations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* === RELATED GUIDES & CALCULATORS === */}
      {(() => {
        const contentHub = getContentHubForTrade(trade.slug);
        const hasContent = contentHub.blogs.length > 0 || contentHub.calculators.length > 0;

        if (!hasContent) return null;

        return (
          <section className="relative py-20 md:py-28 overflow-hidden">
            {/* Dark background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle, #ff6b35 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
              }}
            />

            <div className="container relative mx-auto px-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 mb-6">
                  <TrendingUp className="h-4 w-4 text-[#ff6b35]" />
                  <span className="text-sm font-medium text-[#ff6b35] tracking-wide uppercase">
                    Resources
                  </span>
                </div>
                <h2
                  className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
                  style={{ fontFamily: "var(--font-industrial)" }}
                >
                  Helpful <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd93d]">Resources</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Guides, calculators and tools to help you make informed finance decisions
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid gap-12 lg:grid-cols-2"
              >
                {/* Blog Posts */}
                {contentHub.blogs.length > 0 && (
                  <motion.div variants={fadeInUp}>
                    <RelatedContent
                      links={contentHub.blogs}
                      title="Related Guides"
                      variant="list"
                    />
                  </motion.div>
                )}

                {/* Calculators */}
                {contentHub.calculators.length > 0 && (
                  <motion.div variants={fadeInUp}>
                    <RelatedContent
                      links={contentHub.calculators}
                      title="Try Our Calculators"
                      variant="list"
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>
        );
      })()}

      {/* === RELATED TRADES === */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gray-50">
        <div className="container relative mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2
              className="text-3xl font-black text-gray-900 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Related <span className="text-[#ff6b35]">Trades</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {relatedTrades.map((relatedTrade) => (
              <motion.div key={relatedTrade.slug} variants={fadeInUp}>
                <Link href={`/trades/${relatedTrade.slug}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative h-full"
                  >
                    <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-[#ff6b35] group-hover:shadow-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{relatedTrade.emoji || "🔧"}</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
                      </div>

                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#ff6b35] transition-colors">
                        {relatedTrade.name}
                      </h3>

                      <p className="text-sm text-[#ff6b35] font-semibold">
                        {relatedTrade.avgLoanAmount}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] via-[#ff8f5a] to-[#ffd93d]" />

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
              Ready to Get {trade.name} Finance?
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Get a quote in minutes. Our team specializes in {trade.name.toLowerCase()} finance and understands your business.
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
    </main>
  );
}
