"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Shield,
  Clock,
  Calculator,
  Percent,
  Zap,
  TrendingUp,
  Star,
  Quote,
  ChevronDown,
  Phone,
  Check,
  X,
  Users,
  Award,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { getProductPage, type ProductPageData } from "@/data/product-pages";
import { QuickQuoteForm } from "@/components/forms/quick-quote-form";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
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

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  Shield,
  Calculator,
  Percent,
  Zap,
  TrendingUp,
};

// Hero images by product
const heroImages: Record<string, string> = {
  'vehicle-finance': '/images/plumber-hero.png',
  'equipment-finance': '/images/electrician-hero.png',
  'business-loans': '/images/builder-hero.png',
  'invoice-finance': '/images/carpenter-hero.png',
  'asset-finance': '/images/hvac-hero.png',
  'cashflow-finance': '/images/roofer-hero.png',
};

interface ProductPageContentProps {
  productSlug: string;
}

export function ProductPageContent({ productSlug }: ProductPageContentProps) {
  const product = getProductPage(productSlug);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  if (!product) {
    return <div>Product not found</div>;
  }

  const heroImage = heroImages[productSlug] || '/images/builder-hero.png';

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tradesmanfinance.co.uk" },
          { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://tradesmanfinance.co.uk/products" },
          { "@type": "ListItem", "position": 3, "name": product.name, "item": `https://tradesmanfinance.co.uk/products/${productSlug}` },
        ],
      },
      // FinancialProduct
      {
        "@type": "FinancialProduct",
        "name": product.name,
        "description": product.heroDescription,
        "provider": {
          "@type": "FinancialService",
          "name": "Tradesman Finance",
          "url": "https://tradesmanfinance.co.uk",
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "GBP",
          "price": product.ratesFrom,
          "description": `Finance from ${product.minFinance} to ${product.maxFinance}`,
        },
      },
      // FAQPage
      {
        "@type": "FAQPage",
        "mainEntity": product.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Hero Section - Dark Industrial */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Industrial diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, ${product.accentColor} 40px, ${product.accentColor} 42px)`,
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: `linear-gradient(to bottom right, ${product.accentColor}30, ${product.accentColor}10)` }}
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
              linear-gradient(${product.accentColor}30 1px, transparent 1px),
              linear-gradient(90deg, ${product.accentColor}30 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-sm"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="text-gray-500 hover:text-[#ff6b35] transition-colors">Home</Link></li>
              <span className="text-gray-600">/</span>
              <li><Link href="/products" className="text-gray-500 hover:text-[#ff6b35] transition-colors">Products</Link></li>
              <span className="text-gray-600">/</span>
              <li className="font-medium" style={{ color: product.accentColor }}>{product.name}</li>
            </ol>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInLeft}>
                <Badge
                  className="mb-6 border px-5 py-2 text-sm font-semibold backdrop-blur-sm"
                  style={{
                    backgroundColor: `${product.accentColor}15`,
                    color: product.accentColor,
                    borderColor: `${product.accentColor}30`,
                  }}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {product.name}
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInLeft}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
                style={{ fontFamily: 'var(--font-industrial)' }}
              >
                <span className="text-white">
                  {product.heroTitle.split(product.heroHighlight)[0]}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{
                  backgroundImage: `linear-gradient(to right, ${product.accentColor}, #ffd93d, ${product.accentColor})`
                }}>
                  {product.heroHighlight}
                </span>
                <span className="text-white">
                  {product.heroTitle.split(product.heroHighlight)[1]}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInLeft}
                className="text-lg md:text-xl text-gray-400 mb-4 leading-relaxed"
              >
                {product.heroDescription}
              </motion.p>

              {/* Rate indication */}
              <motion.div
                variants={fadeInLeft}
                className="mb-8 p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm"
              >
                <p className="text-white font-semibold">
                  <span style={{ color: product.accentColor }}>Rates from {product.ratesFrom}</span>
                </p>
                {product.representativeExample && (
                  <p className="text-sm text-gray-500 mt-1">
                    Representative example: {product.representativeExample.amount} over {product.representativeExample.term} at {product.representativeExample.apr}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInLeft} className="flex flex-wrap gap-4 mb-10">
                <Link href="#quote-form">
                  <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="text-white font-bold text-lg px-10 py-7 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      style={{
                        background: `linear-gradient(to right, ${product.accentColor}, ${product.accentColor}cc)`,
                        boxShadow: `0 0 30px ${product.accentColor}40`,
                      }}
                    >
                      Get Your Free Quote
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-600 text-white hover:bg-white/5 font-semibold text-lg px-8 py-7 rounded-xl transition-all"
                  style={{ '--hover-border-color': product.accentColor } as React.CSSProperties}
                  asChild
                >
                  <a href={`tel:${product.phoneNumber.replace(/\s/g, '')}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    {product.phoneDisplay}
                  </a>
                </Button>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                variants={fadeInLeft}
                className="flex flex-wrap items-center gap-6 text-gray-400 text-sm"
              >
                {[
                  { text: product.decisionTimeDisplay, icon: Clock },
                  { text: `${product.minDeposit} Min Deposit`, icon: Shield },
                  { text: "4.9/5 on Google", icon: Star, special: true },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <item.icon className={`h-5 w-5 ${item.special ? 'text-[#ffd93d] fill-[#ffd93d]' : ''}`} style={{ color: item.special ? undefined : product.accentColor }} />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image with floating stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-800/50"
                style={{ boxShadow: `0 20px 50px ${product.accentColor}20` }}
              >
                <Image
                  src={heroImage}
                  alt={`${product.name} for tradesmen`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-8 left-4 right-4 md:left-8 md:right-8"
              >
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {product.heroStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center border border-gray-800/50"
                    >
                      <div className="text-lg md:text-2xl font-bold" style={{ color: product.accentColor }}>
                        {stat.value}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500 leading-tight">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-1 origin-left"
          style={{ background: `linear-gradient(to right, ${product.accentColor}, #ff6b35, ${product.accentColor})` }}
        />
      </section>

      {/* Benefits Section - Dark */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, ${product.accentColor} 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Why Choose Our <span style={{ color: product.accentColor }}>{product.name}</span>?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
              We specialise in {product.name.toLowerCase()} for tradesmen with flexible options to suit your business
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {product.benefits.map((benefit) => {
              const IconComponent = iconMap[benefit.icon] || Shield;
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 text-center hover:border-gray-700 transition-all">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${product.accentColor}15` }}
                    >
                      <span style={{ color: product.accentColor }}>
                        <IconComponent className="h-7 w-7" />
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Categories Section - Dark with Industrial Pattern */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

        {/* Industrial pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, ${product.accentColor} 25%, transparent 25%),
              linear-gradient(-45deg, ${product.accentColor} 25%, transparent 25%)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              What We <span style={{ color: product.accentColor }}>Finance</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
              From everyday essentials to specialist equipment, we have finance options for every need
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {product.categories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 hover:border-gray-700 transition-all group">
                  <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#ff6b35] transition-colors">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: product.accentColor }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Finance Types Comparison Section - Dark */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Understanding Your <span style={{ color: product.accentColor }}>Options</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
              Different finance types suit different needs. Here's what you need to know.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-8"
          >
            {product.financeTypes.map((financeType, index) => (
              <motion.div
                key={financeType.name}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 hover:border-gray-700 transition-all">
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: product.accentColor }}
                  >
                    {financeType.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{financeType.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                      {financeType.ownAsset ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm text-gray-400">
                        {financeType.ownAsset ? "You own the asset at the end" : "Asset returned at the end"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-gray-700/50">
                    <p className="text-xs font-semibold text-white mb-1">Tax Benefits:</p>
                    <p className="text-sm text-gray-400">{financeType.taxBenefits}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-800/50">
                    <p className="text-xs font-semibold text-white mb-1">Best For:</p>
                    <p className="text-sm text-gray-400">{financeType.bestFor}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Dark with accent gradient */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Subtle accent gradient */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${product.accentColor} 0%, transparent 50%)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              What Tradesmen <span style={{ color: product.accentColor }}>Say About Us</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 text-gray-400">
              <Star className="h-5 w-5 text-[#ffd93d] fill-[#ffd93d]" />
              <span>4.9/5 from 500+ reviews on Google</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {product.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 hover:border-gray-700 transition-all">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-[#ffd93d] fill-[#ffd93d]" />
                    ))}
                  </div>

                  <Quote className="h-8 w-8 text-gray-700 mb-2" />

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  <div className="pt-4 border-t border-gray-800/50">
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.trade} • {testimonial.location}</p>
                    <p className="text-gray-500 text-sm">{testimonial.business}</p>
                    <Badge
                      className="mt-2 border-none text-white"
                      style={{ backgroundColor: product.accentColor }}
                    >
                      Financed {testimonial.amount}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Form Section - Light contrast */}
      <section id="quote-form" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'var(--font-industrial)' }}
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8">
                Get a free, no-obligation quote in minutes. Our team of trade finance specialists
                will find the best {product.name.toLowerCase()} deal for your business.
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4 mb-8">
                {[
                  "No impact on your credit score for initial quote",
                  "Competitive rates from our panel of lenders",
                  "Dedicated trade finance specialist assigned to you",
                  "Support throughout the entire application process",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: product.accentColor }} />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* Representative Example */}
              {product.representativeExample && (
                <motion.div
                  variants={fadeInUp}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6"
                >
                  <p className="text-sm font-semibold text-gray-900 mb-3">Representative Example:</p>
                  <p className="text-sm text-gray-600">
                    Borrow {product.representativeExample.amount} over {product.representativeExample.term}.
                    Monthly payment: {product.representativeExample.monthlyPayment}.
                    Total repayable: {product.representativeExample.totalRepayable}.
                    {product.representativeExample.apr}.
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <QuickQuoteForm productType={productSlug} sourcePage={`/products/${productSlug}`} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Dark */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, ${product.accentColor} 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Frequently Asked <span style={{ color: product.accentColor }}>Questions</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
              Got questions about {product.name.toLowerCase()}? We've got answers.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-4"
          >
            {product.faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-800/30 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-white pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                      style={{ color: product.accentColor }}
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
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Accent Color Gradient */}
      <section
        className="relative py-20 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${product.accentColor}, ${product.accentColor}dd)` }}
        />

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
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-industrial)' }}>
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Apply today for {product.name.toLowerCase()} with {product.decisionTimeDisplay.toLowerCase()}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-white hover:bg-white/90 font-bold text-lg px-10 py-7 rounded-xl shadow-xl"
                    style={{ color: product.accentColor }}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white font-bold text-lg px-10 py-7 rounded-xl transition-all"
                style={{ '--hover-color': product.accentColor } as React.CSSProperties}
                asChild
              >
                <a href={`tel:${product.phoneNumber.replace(/\s/g, '')}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call {product.phoneDisplay}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
