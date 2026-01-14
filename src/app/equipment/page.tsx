"use client";

import Link from 'next/link';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Button } from '@/registry/new-york-v4/ui/button';
import { ArrowRight, Wrench, CheckCircle, Clock, PiggyBank, Shield, Package } from 'lucide-react';
import { equipmentBrands } from '@/data/equipment';
import { motion } from 'framer-motion';

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

export default function EquipmentPage() {
  const benefits = [
    { icon: Clock, title: 'Quick Decisions', desc: '24-hour approval', color: '#ff6b35' },
    { icon: PiggyBank, title: 'Flexible Terms', desc: '12-60 months', color: '#0ea5a5' },
    { icon: Package, title: 'All Brands', desc: 'We finance any brand', color: '#ffd93d' },
    { icon: Shield, title: 'Tax Benefits', desc: 'Payments may be deductible', color: '#8b5cf6' },
  ];

  const otherBrands = [
    'DeWalt', 'Bosch', 'Milwaukee', 'Hilti', 'Metabo', 'Snap-on',
    'Stanley', 'Hitachi', 'Paslode', 'Mirka', 'Stihl', 'Husqvarna'
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

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
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
            <span className="text-white">Equipment Finance</span>
          </motion.nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#0ea5a5]/20 text-[#0ea5a5] hover:bg-[#0ea5a5]/30 border-none px-4 py-1.5 text-sm font-medium">
                <Wrench className="mr-2 h-4 w-4" />
                Brand Finance
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Equipment Finance{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3]">
                by Brand
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-2xl"
            >
              Finance professional tools and equipment from the brands you trust.
              Spread the cost with competitive rates and flexible payment terms.
            </motion.p>
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

      {/* Benefits Section */}
      <section className="relative py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-4"
          >
            {benefits.map((item, index) => (
              <motion.div
                key={item.title}
                variants={scaleIn}
                className="flex items-center gap-4 justify-center md:justify-start"
              >
                <div
                  className="p-2.5 rounded-lg"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="h-5 w-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brand Cards */}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Popular Brands{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3]">
                We Finance
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {equipmentBrands.map((brand, index) => (
              <motion.div key={brand.slug} variants={fadeInUp}>
                <Link href={`/equipment/${brand.slug}`}>
                  <Card className="h-full bg-gray-900/80 border-gray-800 backdrop-blur-sm transition-all duration-300 hover:border-[#0ea5a5]/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0ea5a5]/10 group cursor-pointer overflow-hidden">
                    {/* Top accent bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3] transition-all duration-300 group-hover:h-1.5" />

                    <CardHeader>
                      <Badge className="w-fit mb-2 bg-[#0ea5a5]/10 text-[#0ea5a5] border-none">
                        {brand.category}
                      </Badge>
                      <CardTitle className="text-white group-hover:text-[#0ea5a5] transition-colors">
                        {brand.name} Finance
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {brand.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2 text-gray-300">Popular Products:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {brand.popularProducts.slice(0, 3).map((product) => (
                              <Badge
                                key={product}
                                variant="outline"
                                className="text-xs border-gray-700 text-gray-400"
                              >
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                          <span className="text-sm text-gray-500">
                            Typical: {brand.avgFinanceAmount}
                          </span>
                          <ArrowRight className="h-4 w-4 text-[#0ea5a5] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Other Brands Note */}
      <section className="relative py-16 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

        {/* Animated orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0ea5a5]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Don&apos;t See{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd93d]">
                Your Brand?
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-gray-300 mb-8 max-w-xl mx-auto"
            >
              We finance equipment from virtually any manufacturer. Whether it&apos;s specialist brands or mainstream tools, we can help.
            </motion.p>

            {/* Brand logos/names */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3 mb-10 max-w-3xl mx-auto"
            >
              {otherBrands.map((brand) => (
                <Badge
                  key={brand}
                  className="bg-gray-800/80 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  {brand}
                </Badge>
              ))}
              <Badge className="bg-[#ff6b35]/20 text-[#ff6b35] border-none">
                + Many More
              </Badge>
            </motion.div>

            <motion.div variants={scaleIn}>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#ff6b35] to-[#ffd93d] text-white hover:opacity-90"
                >
                  Get a Quote for Any Equipment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
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
              Ready to Finance Your Equipment?
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-white/90 mb-8 text-lg"
            >
              Get a free, no-obligation quote today. Quick decisions, competitive rates,
              and finance for any brand of professional equipment.
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
