"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/registry/new-york-v4/ui/button";
import { ArrowRight, Phone, Shield, Star, Clock, Zap, CheckCircle } from "lucide-react";

interface IndustrialHeroProps {
  title: string;
  highlightWords?: string[];
  description: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    phone?: string;
    href?: string;
  };
  stats?: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
}

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
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const statItem = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function IndustrialHero({
  title = "Trade Finance That Gets You Moving",
  highlightWords = ["Trade Finance"],
  description = "Equipment finance, vehicle loans, and business funding for UK tradesmen. Fast decisions, competitive rates, real support.",
  primaryCTA = { text: "Get Your Free Quote", href: "/contact" },
  secondaryCTA = { text: "0800 123 4567", phone: "tel:08001234567" },
  stats = [
    { label: "Funded to UK Trades", value: "£50M+", icon: <Zap className="h-5 w-5" /> },
    { label: "Tradesmen Helped", value: "50,000+", icon: <Shield className="h-5 w-5" /> },
    { label: "Decision Time", value: "24hrs", icon: <Clock className="h-5 w-5" /> },
    { label: "Trustpilot Rating", value: "4.8★", icon: <Star className="h-5 w-5" /> },
  ],
}: IndustrialHeroProps) {
  // Highlight specific words in the title
  const renderTitle = () => {
    let result = title;
    highlightWords.forEach((word) => {
      result = result.replace(
        new RegExp(`(${word})`, "gi"),
        "|||$1|||"
      );
    });

    return result.split("|||").map((part, index) => {
      const isHighlighted = highlightWords.some(
        (word) => part.toLowerCase() === word.toLowerCase()
      );
      return isHighlighted ? (
        <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] via-[#ff8f5a] to-[#ffd93d]">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      );
    });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* === BACKGROUND LAYERS === */}

      {/* Base dark gradient */}
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
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise/grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs for depth */}
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
        className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#ffd93d]/10 via-[#ff6b35]/5 to-transparent blur-3xl"
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-gray-950/40" />

      {/* === CONTENT === */}
      <div className="container relative mx-auto px-4 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Eyebrow badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-[#ff6b35] animate-pulse" />
                <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">
                  UK&apos;s Leading Trade Finance Specialists
                </span>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.95] tracking-[0.02em]"
              style={{
                fontFamily: "var(--font-industrial), 'Bebas Neue', 'Impact', sans-serif",
              }}
            >
              {renderTitle()}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
            >
              {description}
            </motion.p>

            {/* Trust indicators - inline */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
            >
              {[
                { icon: <CheckCircle className="h-4 w-4" />, text: "No Hidden Fees" },
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
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            >
              <Link href={primaryCTA.href}>
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
                      {primaryCTA.text}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </Button>
                </motion.div>
              </Link>

              {secondaryCTA.phone && (
                <a href={secondaryCTA.phone}>
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
                      {secondaryCTA.text}
                    </Button>
                  </motion.div>
                </a>
              )}
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statItem}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:border-[#ff6b35]/30 transition-colors">
                    <div className="flex justify-center mb-3 text-[#ff6b35]">
                      {stat.icon}
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#ff6b35] to-[#ffd93d] transform rotate-45 translate-x-8 -translate-y-8" />
      </div>
    </section>
  );
}

export default IndustrialHero;
