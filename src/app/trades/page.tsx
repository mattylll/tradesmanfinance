"use client";

import type { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { trades } from '@/data/trades';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
  ArrowRight,
  Wrench,
  Zap,
  ChevronRight,
  Phone,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
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

export default function TradesPage() {
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

        <div className="container relative mx-auto px-4 py-20 lg:py-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            {/* Breadcrumbs */}
            <motion.nav variants={fadeInUp} className="mb-6 text-sm text-white/50">
              <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Trades</span>
            </motion.nav>

            {/* Eyebrow badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-8">
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <Wrench className="h-4 w-4 text-[#ff6b35]" />
                <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">
                  {trades.length} Trade Specialisms
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] via-[#ff8f5a] to-[#ffd93d]">
                Solutions
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
            >
              Specialist equipment finance and business loans for UK tradesmen. From power tools to vehicles, we help you grow.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-x-8 gap-y-3 mb-12"
            >
              {[
                { icon: <CheckCircle className="h-4 w-4" />, text: "£25k - £1m Available" },
                { icon: <CheckCircle className="h-4 w-4" />, text: "92% Approval Rate" },
                { icon: <CheckCircle className="h-4 w-4" />, text: "Same Day Decisions" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="text-[#ff6b35]">{item.icon}</span>
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
                      Get Your Free Quote
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

      {/* === TRADES GRID === */}
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 mb-6">
              <Zap className="h-4 w-4 text-[#ff6b35]" />
              <span className="text-sm font-medium text-[#ff6b35] tracking-wide uppercase">
                Browse All Trades
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Find Your <span className="text-[#ff6b35]">Trade</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Select your trade to see specialist equipment finance packages and loan options.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {trades.map((trade, index) => (
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

                      <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-[#ff6b35] transition-colors">
                        {trade.name}
                      </h3>

                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {trade.description}
                      </p>

                      {/* Amount badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-[#ff6b35]">
                          From {trade.avgLoanAmount}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#ff6b35] group-hover:translate-x-1 transition-all" />
                      </div>

                      {/* Equipment tags */}
                      <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-1.5">
                        {trade.equipmentExamples.slice(0, 3).map((item) => (
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
              Ready to Get Started?
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Get a quote in minutes. Our team specializes in trade finance and understands your business needs.
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
                    Get a Free Quote
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
