"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import {
  PoundSterling,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  Phone,
  Sparkles,
  ChevronDown,
  Building2,
  TrendingUp,
  Percent,
} from "lucide-react";
import { useState } from "react";
import { BusinessLoanCalculator } from "@/components/calculators";
import { BUSINESS_LOAN_FAQS } from "@/lib/calculators/business-loan";

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
    icon: Zap,
    title: "Instant Calculations",
    description: "See monthly payments and total costs in real-time",
  },
  {
    icon: Shield,
    title: "No Credit Check",
    description: "Using the calculator doesn't affect your credit score",
  },
  {
    icon: Clock,
    title: "Fast Funding",
    description: "Get funds in your account within days of approval",
  },
  {
    icon: CheckCircle,
    title: "Tailored Rates",
    description: "Rates based on your business profile",
  },
];

const loanPurposes = [
  {
    icon: Building2,
    title: "Expansion",
    description: "New premises, renovations, or additional locations",
  },
  {
    icon: TrendingUp,
    title: "Growth Capital",
    description: "Hire staff, increase marketing, or scale operations",
  },
  {
    icon: PoundSterling,
    title: "Cash Flow",
    description: "Bridge gaps between projects and payments",
  },
  {
    icon: Percent,
    title: "Consolidation",
    description: "Combine existing debts into one manageable payment",
  },
];

export default function BusinessLoansCalculatorPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section - Dark Industrial */}
      <section className="relative py-16 md:py-24 overflow-hidden">
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
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/calculators"
                className="inline-flex items-center text-gray-400 hover:text-[#ff6b35] transition-colors mb-8 group"
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
                className="p-4 bg-[#ff6b35]/15 border border-[#ff6b35]/30 rounded-2xl"
              >
                <PoundSterling className="h-10 w-10 text-[#ff6b35]" />
              </motion.div>

              <div className="flex-1">
                <motion.div variants={fadeInUp}>
                  <Badge className="mb-4 bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1.5 text-sm font-semibold">
                    <Sparkles className="mr-2 h-3.5 w-3.5" />
                    Free Calculator
                  </Badge>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-industrial)' }}
                >
                  <span className="text-white">Business Loan </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] via-[#ffd93d] to-[#ff6b35]">
                    Calculator
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-gray-400 max-w-2xl"
                >
                  Calculate monthly repayments, total costs, and see your eligibility
                  for a business loan. Rates tailored to your business profile.
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
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent origin-center"
        />
      </section>

      {/* Calculator Section - Light for better number visibility */}
      <section className="relative py-12 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <BusinessLoanCalculator />
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
            backgroundImage: `radial-gradient(circle, #ff6b35 1px, transparent 1px)`,
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
              Why Use Our <span className="text-[#ff6b35]">Business Loan Calculator</span>?
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
                      className="w-14 h-14 bg-[#ff6b35]/15 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <benefit.icon className="h-7 w-7 text-[#ff6b35]" />
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

      {/* Loan Purposes - Dark */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

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
              className="text-2xl md:text-3xl font-bold text-white text-center mb-12"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              What Tradesmen Use <span className="text-[#ff6b35]">Business Loans For</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {loanPurposes.map((purpose) => (
                <motion.div
                  key={purpose.title}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 hover:border-gray-700 transition-all flex gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-[#ff6b35]/15 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <purpose.icon className="h-6 w-6 text-[#ff6b35]" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-white mb-2">{purpose.title}</h3>
                      <p className="text-sm text-gray-400">{purpose.description}</p>
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
              How to Get <span className="text-[#ff6b35]">Your Business Loan</span>
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Calculate",
                  description: "Use our calculator to see what you could borrow and repay",
                },
                {
                  step: "2",
                  title: "Apply",
                  description: "Quick online application takes just 5 minutes to complete",
                },
                {
                  step: "3",
                  title: "Decision",
                  description: "Get an answer within 24-48 hours from our panel of lenders",
                },
                {
                  step: "4",
                  title: "Funded",
                  description: "Receive funds in your business account within days",
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
                      className="w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-full flex items-center justify-center mx-auto mb-4"
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
              Frequently Asked <span className="text-[#ff6b35]">Questions</span>
            </motion.h2>

            <div className="space-y-4">
              {BUSINESS_LOAN_FAQS.map((faq, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-800/30 transition-colors"
                    >
                      <h3 className="font-bold text-white pr-4">{faq.question}</h3>
                      <ChevronDown
                        className={`h-5 w-5 text-[#ff6b35] flex-shrink-0 transition-transform ${
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

      {/* CTA Section - Orange Gradient */}
      <section className="relative py-16 overflow-hidden">
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-industrial)' }}>
              Ready to Grow Your Trade Business?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Get a personalised quote with no obligation. We work with
              tradesmen across the UK.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact?product=business-loan">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-white text-[#ff6b35] hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-xl shadow-xl"
                  >
                    Get a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#ff6b35] font-bold text-lg px-8 py-6 rounded-xl transition-all"
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
              Other <span className="text-[#ff6b35]">Finance Calculators</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Invoice Finance Calculator",
                  desc: "Release cash from unpaid invoices",
                  href: "/calculators/invoice-finance",
                  available: true,
                },
                {
                  title: "Equipment Finance Calculator",
                  desc: "Work out tool and machinery finance costs",
                  href: "/calculators/equipment-finance",
                  available: true,
                },
                {
                  title: "Vehicle Finance Calculator",
                  desc: "Compare van and truck finance options",
                  href: "/calculators/vehicle-finance",
                  available: true,
                },
              ].map((calc) => (
                <motion.div
                  key={calc.title}
                  variants={fadeInUp}
                  whileHover={{ y: -3 }}
                >
                  <Link href={calc.available ? calc.href : "/calculators"}>
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 p-4 hover:border-gray-700 transition-all">
                      <span className="text-[#ff6b35] font-semibold hover:underline">
                        {calc.title}
                      </span>
                      <p className="text-sm text-gray-400 mt-1">{calc.desc}</p>
                      {!calc.available && (
                        <Badge className="mt-2 bg-gray-700/50 text-gray-400 border-gray-600/50 border text-xs">
                          Coming Soon
                        </Badge>
                      )}
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
              name: "Business Loan Calculator",
              description:
                "Calculate monthly repayments, total costs, and eligibility for a business loan. Free calculator for UK tradesmen.",
              url: "https://tradesmanfinance.co.uk/calculators/business-loans",
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
                  name: "Business Loan Calculator",
                  item: "https://tradesmanfinance.co.uk/calculators/business-loans",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: BUSINESS_LOAN_FAQS.map((faq) => ({
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
