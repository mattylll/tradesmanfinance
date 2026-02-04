"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import {
  Wrench,
  Truck,
  PoundSterling,
  TrendingUp,
  FileText,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Shield,
  Clock,
  Users,
  Star,
  Phone,
  Zap,
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

const products = [
  {
    icon: Wrench,
    title: "Equipment Finance",
    slug: "equipment-finance",
    description: "Finance specialist tools, machinery, and trade equipment with flexible terms.",
    features: ["Tools & machinery", "Diagnostic equipment", "Power tools", "Specialist equipment"],
    color: "#ff6b35",
  },
  {
    icon: Truck,
    title: "Vehicle Finance",
    slug: "vehicle-finance",
    description: "Get your van, truck or work vehicle on the road with competitive finance.",
    features: ["Vans & pickup trucks", "Work vehicles", "Fleet finance", "Used & new vehicles"],
    color: "#0ea5a5",
  },
  {
    icon: PoundSterling,
    title: "Business Loans",
    slug: "business-loans",
    description: "Flexible business loans from £5,000 to £500,000 for trade business growth.",
    features: ["Expansion capital", "Working capital", "Project funding", "Business development"],
    color: "#6366f1",
  },
  {
    icon: TrendingUp,
    title: "Cashflow Finance",
    slug: "cashflow-finance",
    description: "Smooth out your cash flow with flexible working capital solutions.",
    features: ["Revolving credit", "Overdraft alternatives", "Short-term funding", "Bridge finance"],
    color: "#10b981",
  },
  {
    icon: FileText,
    title: "Invoice Finance",
    slug: "invoice-finance",
    description: "Unlock cash tied up in unpaid invoices and improve your cash flow.",
    features: ["Invoice factoring", "Invoice discounting", "Selective finance", "Confidential options"],
    color: "#f59e0b",
  },
  {
    icon: Sparkles,
    title: "Asset Finance",
    slug: "asset-finance",
    description: "Finance any business asset with hire purchase, leasing, or sale & leaseback.",
    features: ["Hire purchase", "Finance lease", "Operating lease", "Sale & leaseback"],
    color: "#ec4899",
  },
];

const stats = [
  { value: "£500M+", label: "Funded to Date" },
  { value: "15,000+", label: "Tradesmen Helped" },
  { value: "24hrs", label: "Decision Time" },
  { value: "4.9/5", label: "Google Rating" },
];

const trustPoints = [
  { icon: Shield, text: "25+ Years Experience" },
  { icon: Clock, text: "Same Day Decisions" },
  { icon: Users, text: "Trade Specialists" },
  { icon: Star, text: "5-Star Service" },
];

export default function ProductsPage() {
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

        {/* Grid pattern overlay */}
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
                Business Finance Products
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              <span className="text-white">Finance Solutions for </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] via-[#ffd93d] to-[#ff6b35]">
                Every Trade Need
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              From equipment and vehicles to business loans and cash flow management,
              we have the right finance solution to help your trade business grow.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] hover:from-[#e55a2b] hover:to-[#ff6b35] text-white font-bold text-lg px-10 py-7 rounded-xl shadow-[0_0_30px_rgba(255,107,53,0.3)] hover:shadow-[0_0_40px_rgba(255,107,53,0.5)] transition-all"
                  >
                    Get Your Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-600 text-white hover:bg-white/5 hover:border-[#ff6b35] font-semibold text-lg px-8 py-7 rounded-xl transition-all"
                asChild
              >
                <a href="tel:08001234567">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 0800 123 4567
                </a>
              </Button>
            </motion.div>

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

      {/* Stats Bar - Dark */}
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

      {/* Products Grid - Dark Industrial */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
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
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Our Finance <span className="text-[#ff6b35]">Products</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
              Tailored finance solutions designed specifically for UK tradesmen and trade businesses
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((product) => (
              <motion.div
                key={product.slug}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="group relative h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-8 hover:border-gray-700 transition-all overflow-hidden">
                    {/* Hover gradient */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${product.color}08 0%, transparent 50%)`,
                      }}
                    />

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${product.color}15` }}
                    >
                      <product.icon className="h-8 w-8" style={{ color: product.color }} />
                    </motion.div>

                    <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-[#ff6b35] transition-colors">
                      {product.title}
                    </h3>

                    <p className="relative text-gray-400 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    <ul className="relative space-y-2 mb-6">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: product.color }} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="relative flex items-center font-semibold group-hover:translate-x-2 transition-transform" style={{ color: product.color }}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>

                    {/* Bottom accent bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 right-0 h-1 origin-left"
                      style={{ backgroundColor: product.color }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us - Dark with Industrial Pattern */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

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
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Why Trade Professionals <span className="text-[#ff6b35]">Choose Us</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
              We understand the unique challenges of running a trade business
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Zap,
                title: "Fast Decisions",
                description: "Get funding decisions within 24 hours, not weeks",
                color: "#ff6b35",
              },
              {
                icon: Shield,
                title: "Trade Experts",
                description: "Our team specialises in trade business finance",
                color: "#0ea5a5",
              },
              {
                icon: PoundSterling,
                title: "Competitive Rates",
                description: "Access to 50+ lenders for the best rates",
                color: "#ffd93d",
              },
              {
                icon: Users,
                title: "Personal Service",
                description: "Dedicated account manager throughout",
                color: "#6366f1",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-8 text-center h-full hover:border-gray-700 transition-all">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="h-8 w-8" style={{ color: item.color }} />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-industrial)' }}>
              Not Sure Which Finance is Right for You?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Our specialist team can help you find the perfect finance solution
              for your trade business needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-white text-[#ff6b35] hover:bg-white/90 font-bold text-lg px-10 py-7 rounded-xl shadow-xl"
                  >
                    Get Expert Advice
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#ff6b35] font-bold text-lg px-10 py-7 rounded-xl transition-all"
                asChild
              >
                <a href="tel:08001234567">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 0800 123 4567
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
