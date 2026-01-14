"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import {
  Calculator,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  Phone,
  Sparkles,
  ChevronDown,
  TrendingUp,
  Briefcase,
  FileText,
  PoundSterling,
  Target,
} from "lucide-react";
import { useState } from "react";
import { AffordabilityCalculator } from "@/components/calculators/affordability-calculator";
import { AFFORDABILITY_FAQS } from "@/lib/calculators/affordability";

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

const benefits = [
  {
    icon: TrendingUp,
    title: "Know Your Limits",
    description: "Understand how much you can comfortably borrow",
  },
  {
    icon: Shield,
    title: "No Credit Check",
    description: "Using the calculator doesn't affect your score",
  },
  {
    icon: Target,
    title: "Smart Analysis",
    description: "Get a score based on multiple factors",
  },
  {
    icon: Zap,
    title: "Compare Products",
    description: "See borrowing power across all finance types",
  },
];

const factors = [
  {
    icon: TrendingUp,
    title: "Profit & Cashflow",
    description: "Your monthly revenue minus expenses determines available funds",
  },
  {
    icon: Briefcase,
    title: "Business Age",
    description: "Longer trading history typically means better borrowing terms",
  },
  {
    icon: FileText,
    title: "Existing Debt",
    description: "Current obligations affect how much more you can take on",
  },
  {
    icon: Shield,
    title: "Credit Profile",
    description: "Your credit history influences rates and approval chances",
  },
];

export default function AffordabilityCalculatorPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section - Dark Industrial with Amber accent */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Industrial diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, #f59e0b 40px, #f59e0b 42px)`,
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-gradient-to-br from-amber-500/20 to-yellow-500/10"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/calculators"
                className="inline-flex items-center text-gray-400 hover:text-[#f59e0b] transition-colors mb-8 group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Calculators
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col md:flex-row items-start gap-6"
            >
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="p-4 bg-[#f59e0b]/15 border border-[#f59e0b]/30 rounded-2xl"
              >
                <Calculator className="h-10 w-10 text-[#f59e0b]" />
              </motion.div>

              <div className="flex-1">
                <motion.div variants={fadeInUp}>
                  <Badge className="mb-4 bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1.5 text-sm font-semibold">
                    <Sparkles className="mr-2 h-3.5 w-3.5" />
                    Free Assessment Tool
                  </Badge>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-industrial)' }}
                >
                  <span className="text-white">Affordability </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]">
                    Calculator
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-gray-400 max-w-2xl"
                >
                  Find out how much you can comfortably borrow based on your business
                  financials. Get an instant assessment with borrowing power across
                  all our finance products.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent origin-center"
        />
      </section>

      {/* Calculator Section - Light for better number visibility */}
      <section className="relative py-12 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AffordabilityCalculator />
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #f59e0b 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
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
              className="text-2xl md:text-3xl font-bold text-white text-center mb-12"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Why Check Your <span className="text-[#f59e0b]">Affordability</span>?
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 text-center hover:border-gray-700 transition-all">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 bg-[#f59e0b]/15 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <benefit.icon className="h-7 w-7 text-[#f59e0b]" />
                    </motion.div>
                    <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-400">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Consider - Dark */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

        {/* Industrial pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #f59e0b 25%, transparent 25%),
              linear-gradient(-45deg, #f59e0b 25%, transparent 25%)
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
              className="text-2xl md:text-3xl font-bold text-white text-center mb-12"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              What We <span className="text-[#f59e0b]">Consider</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {factors.map((factor) => (
                <motion.div
                  key={factor.title}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 hover:border-gray-700 transition-all flex gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-[#f59e0b]/15 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <factor.icon className="h-6 w-6 text-[#f59e0b]" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-white mb-2">{factor.title}</h3>
                      <p className="text-sm text-gray-400">{factor.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Dark */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />

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
              className="text-2xl md:text-3xl font-bold text-white text-center mb-12"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              How It <span className="text-[#f59e0b]">Works</span>
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Financials",
                  description: "Input your monthly revenue, expenses, and existing debt",
                },
                {
                  step: "2",
                  title: "Add Details",
                  description: "Tell us about your business age and credit profile",
                },
                {
                  step: "3",
                  title: "Get Your Score",
                  description: "See your affordability rating and borrowing power",
                },
                {
                  step: "4",
                  title: "Compare Options",
                  description: "View how much you could borrow for each product",
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 h-full hover:border-gray-700 transition-all">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <span className="text-lg font-bold text-white">{item.step}</span>
                    </motion.div>
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Dark */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold text-white text-center mb-12"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Frequently Asked <span className="text-[#f59e0b]">Questions</span>
            </motion.h2>

            <div className="space-y-4">
              {AFFORDABILITY_FAQS.map((faq, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-800/30 transition-colors"
                    >
                      <h3 className="font-bold text-white pr-4">{faq.question}</h3>
                      <ChevronDown
                        className={`h-5 w-5 text-[#f59e0b] flex-shrink-0 transition-transform ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedFaq === index ? 'auto' : 0,
                        opacity: expandedFaq === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Amber Gradient */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]" />

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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-industrial)' }}>
              Ready to Apply for Finance?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Now you know your borrowing power, speak to our team for a
              personalised quote with rates tailored to your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-white text-[#f59e0b] hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-xl shadow-xl"
                  >
                    Get a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#f59e0b] font-bold text-lg px-8 py-6 rounded-xl transition-all"
                asChild
              >
                <a href="tel:08000869015">
                  <Phone className="mr-2 h-5 w-5" />
                  0800 086 9015
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Calculators - Dark */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

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
              className="text-xl font-bold text-white text-center mb-8"
            >
              Other <span className="text-[#f59e0b]">Finance Calculators</span>
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  title: "Invoice Finance",
                  desc: "Release cash from invoices",
                  href: "/calculators/invoice-finance",
                },
                {
                  title: "Business Loans",
                  desc: "Calculate loan repayments",
                  href: "/calculators/business-loans",
                },
                {
                  title: "Equipment Finance",
                  desc: "Finance tools and machinery",
                  href: "/calculators/equipment-finance",
                },
                {
                  title: "Vehicle Finance",
                  desc: "Compare van finance options",
                  href: "/calculators/vehicle-finance",
                },
              ].map((calc) => (
                <motion.div
                  key={calc.title}
                  variants={fadeInUp}
                  whileHover={{ y: -3 }}
                >
                  <Link href={calc.href}>
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 p-4 hover:border-gray-700 transition-all">
                      <span className="text-[#f59e0b] font-semibold hover:underline">
                        {calc.title}
                      </span>
                      <p className="text-sm text-gray-400 mt-1">{calc.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Affordability Calculator",
              description:
                "Find out how much you can borrow based on your business financials. Free calculator with instant results for UK tradesmen.",
              url: "https://tradesmanfinance.co.uk/calculators/affordability",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "GBP",
              },
              author: {
                "@type": "Organization",
                name: "Tradesman Finance UK",
                url: "https://tradesmanfinance.co.uk",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://tradesmanfinance.co.uk",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Calculators",
                  item: "https://tradesmanfinance.co.uk/calculators",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Affordability Calculator",
                  item: "https://tradesmanfinance.co.uk/calculators/affordability",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: AFFORDABILITY_FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]),
        }}
      />
    </div>
  );
}
