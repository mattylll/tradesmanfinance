"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import {
  FileText,
  Truck,
  Wrench,
  PoundSterling,
  Calculator,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  Star,
  Phone,
  Sparkles,
} from "lucide-react";

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const calculators = [
  {
    title: "Invoice Finance Calculator",
    description:
      "See how much cash you could release from unpaid invoices. Calculate advance amounts and fees instantly.",
    icon: FileText,
    href: "/calculators/invoice-finance",
    badge: "Live",
    available: true,
    color: "#ff6b35",
  },
  {
    title: "Business Loan Calculator",
    description:
      "Calculate monthly repayments for business loans from £5,000 to £500,000 with flexible terms.",
    icon: PoundSterling,
    href: "/calculators/business-loans",
    badge: "Live",
    available: true,
    color: "#6366f1",
  },
  {
    title: "Equipment Finance Calculator",
    description:
      "Work out the cost of financing tools, machinery and equipment for your trade business.",
    icon: Wrench,
    href: "/calculators/equipment-finance",
    badge: "Live",
    available: true,
    color: "#0ea5a5",
  },
  {
    title: "Vehicle Finance Calculator",
    description:
      "Compare HP, lease and hire purchase options for vans, trucks and commercial vehicles.",
    icon: Truck,
    href: "/calculators/vehicle-finance",
    badge: "Live",
    available: true,
    color: "#10b981",
  },
  {
    title: "Affordability Calculator",
    description:
      "Find out how much you could borrow based on your business income and expenses.",
    icon: Calculator,
    href: "/calculators/affordability",
    badge: "Live",
    available: true,
    color: "#f59e0b",
  },
];

const trustPoints = [
  { icon: Zap, text: "Instant Results" },
  { icon: Shield, text: "No Credit Check" },
  { icon: CheckCircle, text: "100% Free" },
  { icon: Star, text: "5-Star Service" },
];

const stats = [
  { value: "10,000+", label: "Calculations Made" },
  { value: "£500M+", label: "Funded" },
  { value: "24hrs", label: "Decision Time" },
  { value: "4.9/5", label: "Rating" },
];

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section - Dark Industrial */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Industrial diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, #ff6b35 40px, #ff6b35 42px)`,
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-gradient-to-br from-orange-500/20 to-yellow-500/10"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-gradient-to-br from-teal-500/15 to-blue-500/10"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/15 border border-[#ff6b35]/20 px-5 py-2 text-sm font-semibold backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4" />
                Free Tools for Tradesmen
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              <span className="text-white">Business Finance </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] via-[#ffd93d] to-[#ff6b35]">
                Calculators
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Work out your finance options in seconds. Our free calculators help
              you understand costs before you apply - no obligation, no credit check.
            </motion.p>

            {/* Trust Points */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-6"
            >
              {trustPoints.map((point, index) => (
                <motion.div
                  key={point.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <point.icon className="h-5 w-5 text-[#ff6b35]" />
                  <span className="text-sm font-medium">{point.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent origin-center"
        />
      </section>

      {/* Stats Bar */}
      <section className="relative py-8 bg-gray-900/80 border-y border-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#ff6b35]" style={{ fontFamily: 'var(--font-industrial)' }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Calculators Grid - Dark */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #ff6b35 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {calculators.map((calc) => (
              <motion.div
                key={calc.title}
                variants={fadeInUp}
                whileHover={calc.available ? { y: -8 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className={`group relative h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-8 overflow-hidden ${
                    calc.available ? "hover:border-gray-700 cursor-pointer" : "opacity-70"
                  } transition-all`}
                >
                  {/* Hover gradient */}
                  {calc.available && (
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${calc.color}08 0%, transparent 50%)`,
                      }}
                    />
                  )}

                  <div className="relative flex items-start justify-between mb-6">
                    <motion.div
                      whileHover={calc.available ? { scale: 1.1, rotate: 5 } : {}}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: calc.available ? `${calc.color}15` : 'rgb(31, 41, 55)' }}
                    >
                      <calc.icon
                        className="h-7 w-7"
                        style={{ color: calc.available ? calc.color : '#6b7280' }}
                      />
                    </motion.div>
                    <Badge
                      className={`${
                        calc.available
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-gray-700/50 text-gray-400 border-gray-600/50'
                      } border`}
                    >
                      {calc.badge}
                    </Badge>
                  </div>

                  <h3 className="relative text-xl font-bold text-white mb-3">
                    {calc.title}
                  </h3>

                  <p className="relative text-gray-400 mb-6 text-sm leading-relaxed">
                    {calc.description}
                  </p>

                  {calc.available ? (
                    <Button
                      asChild
                      className="w-full text-white font-semibold rounded-xl"
                      style={{ backgroundColor: calc.color }}
                    >
                      <Link href={calc.href}>
                        Calculate Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="w-full bg-gray-800 text-gray-500 font-semibold rounded-xl"
                    >
                      Coming Soon
                    </Button>
                  )}

                  {/* Bottom accent bar for available calculators */}
                  {calc.available && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 right-0 h-1 origin-left"
                      style={{ backgroundColor: calc.color }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works - Dark */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />

        {/* Industrial pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #ff6b35 25%, transparent 25%),
              linear-gradient(-45deg, #ff6b35 25%, transparent 25%)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              How Our Calculators <span className="text-[#ff6b35]">Help You</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Enter Your Details",
                  description: "Input the amount you need and adjust the terms to suit your business.",
                },
                {
                  step: "2",
                  title: "See Instant Results",
                  description: "Get a clear breakdown of costs, monthly payments, and total repayments.",
                },
                {
                  step: "3",
                  title: "Apply When Ready",
                  description: "No pressure - apply for a quote when you're confident it's right for you.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-8 h-full hover:border-gray-700 transition-all">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <span className="text-xl font-bold text-white">{item.step}</span>
                    </motion.div>
                    <h3 className="font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Orange Gradient */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a]" />

        {/* Diagonal pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 22px)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-industrial)' }}>
              Ready for a Personalised Quote?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Our calculators give you estimates. For an accurate quote tailored
              to your business, speak to our team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-white text-[#ff6b35] hover:bg-white/90 font-bold text-lg px-10 py-7 rounded-xl shadow-xl"
                  >
                    Get a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#ff6b35] font-bold text-lg px-10 py-7 rounded-xl transition-all"
                asChild
              >
                <a href="tel:08000869015">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 0800 086 9015
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Business Finance Calculators",
            description:
              "Free business finance calculators for UK tradesmen. Calculate invoice finance, equipment loans, vehicle finance and more.",
            url: "https://tradesmanfinance.co.uk/calculators",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: calculators.map((calc, index) => ({
                "@type": "WebApplication",
                position: index + 1,
                name: calc.title,
                description: calc.description,
                applicationCategory: "FinanceApplication",
                operatingSystem: "Web",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "GBP",
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}
