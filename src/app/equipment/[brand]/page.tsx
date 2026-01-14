"use client";

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Button } from '@/registry/new-york-v4/ui/button';
import { ArrowRight, CheckCircle, Wrench, Phone, Clock, Calendar, CreditCard } from 'lucide-react';
import { equipmentBrands } from '@/data/equipment';
import { trades } from '@/data/trades';
import { motion } from 'framer-motion';
import { use } from 'react';

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

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export default function EquipmentBrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: brandSlug } = use(params);
  const brand = equipmentBrands.find((b) => b.slug === brandSlug);

  if (!brand) {
    notFound();
  }

  // Get related trades
  const relatedTrades = trades.filter((trade) =>
    brand.trades.some((t) => trade.name.toLowerCase().includes(t.toLowerCase()) ||
      t.toLowerCase().includes(trade.name.toLowerCase()))
  ).slice(0, 4);

  // Other brands
  const otherBrands = equipmentBrands.filter((b) => b.slug !== brandSlug).slice(0, 3);

  const stats = [
    { label: 'Typical Finance', value: brand.avgFinanceAmount, icon: CreditCard },
    { label: 'Decision Time', value: '24hrs', icon: Clock },
    { label: 'Terms Available', value: '12-60 months', icon: Calendar },
  ];

  const steps = [
    { step: 1, title: 'Choose Your Equipment', desc: `Select the ${brand.name} tools you need` },
    { step: 2, title: 'Get a Quote', desc: 'Quick application, no credit impact' },
    { step: 3, title: 'Fast Approval', desc: 'Decision within 24 hours' },
    { step: 4, title: 'Equipment Delivered', desc: 'Start using your new tools' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark industrial background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0ea5a5]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#ff6b35]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Industrial diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, #0ea5a5 40px, #0ea5a5 42px)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-sm text-white/60"
          >
            <Link href="/" className="hover:text-[#0ea5a5] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/equipment" className="hover:text-[#0ea5a5] transition-colors">Equipment Finance</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{brand.name}</span>
          </motion.nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#0ea5a5]/20 text-[#0ea5a5] hover:bg-[#0ea5a5]/30 border-none px-4 py-1.5 text-sm font-medium">
                {brand.category}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              {brand.name}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3]">
                Equipment Finance
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-2xl mb-10"
            >
              {brand.description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3] text-white hover:opacity-90"
                >
                  Get a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
                asChild
              >
                <a href="tel:08001234567">
                  <Phone className="mr-2 h-5 w-5" />
                  0800 123 4567
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0ea5a5] to-transparent"
        />
      </section>

      {/* Key Stats */}
      <section className="relative py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
              >
                <Card className="bg-gray-900/50 border-gray-800 text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-3">
                      <div className="p-2.5 rounded-lg bg-[#0ea5a5]/10">
                        <stat.icon className="h-5 w-5 text-[#0ea5a5]" />
                      </div>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products & How It Works */}
      <section className="relative py-16 md:py-20">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #0ea5a5 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-12 lg:grid-cols-2"
          >
            {/* Products We Finance */}
            <motion.div variants={fadeInLeft}>
              <h2
                className="text-3xl font-bold mb-6 text-white"
                style={{ fontFamily: 'var(--font-industrial)' }}
              >
                {brand.name} Products{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3]">
                  We Finance
                </span>
              </h2>
              <p className="text-gray-400 mb-8">
                We can finance any {brand.name} equipment for your trade business. Here are some of the most popular items:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {brand.popularProducts.map((product) => (
                  <motion.div
                    key={product}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-800 bg-gray-900/50 hover:border-[#0ea5a5]/50 transition-colors"
                  >
                    <CheckCircle className="h-5 w-5 text-[#0ea5a5] flex-shrink-0" />
                    <span className="font-medium text-white">{product}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div variants={fadeInRight}>
              <Card className="bg-gray-900/80 border-gray-800 overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3]" />
                <CardHeader>
                  <CardTitle className="text-white">
                    How {brand.name} Finance Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {steps.map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0ea5a5] to-[#22d3d3] text-white text-sm font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Trades */}
      {relatedTrades.length > 0 && (
        <section className="relative py-16 overflow-hidden">
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2
                className="text-2xl md:text-3xl font-bold text-white"
                style={{ fontFamily: 'var(--font-industrial)' }}
              >
                {brand.name} Finance for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd93d]">
                  Tradesmen
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"
            >
              {relatedTrades.map((trade) => (
                <motion.div key={trade.slug} variants={fadeInUp}>
                  <Link href={`/trades/${trade.slug}`}>
                    <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-[#ff6b35]/50 transition-all duration-300 hover:-translate-y-1 group">
                      <CardContent className="p-5">
                        <span className="text-3xl mb-3 block">{trade.emoji || '🔧'}</span>
                        <p className="font-semibold text-white group-hover:text-[#ff6b35] transition-colors">
                          {trade.name}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {brand.name} finance from {trade.avgLoanAmount}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Other Brands */}
      <section className="relative py-16">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Other Brands{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3]">
                We Finance
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-3"
          >
            {otherBrands.map((otherBrand) => (
              <motion.div key={otherBrand.slug} variants={fadeInUp}>
                <Link href={`/equipment/${otherBrand.slug}`}>
                  <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-[#0ea5a5]/50 transition-all duration-300 group overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3]" />
                    <CardContent className="p-5">
                      <Badge className="mb-3 bg-[#0ea5a5]/10 text-[#0ea5a5] border-none">
                        {otherBrand.category}
                      </Badge>
                      <p className="font-semibold text-white group-hover:text-[#0ea5a5] transition-colors">
                        {otherBrand.name} Finance
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link href="/equipment">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                View All Brands
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Teal gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5a5] via-[#14b8a6] to-[#22d3d3]" />

        {/* Industrial pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 22px)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Ready to Finance Your {brand.name} Equipment?
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-white/90 mb-8 text-lg"
            >
              Get a free, no-obligation quote today. Quick decisions, competitive rates for all {brand.name} products.
            </motion.p>

            <motion.div variants={scaleIn}>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800 shadow-xl"
                >
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
