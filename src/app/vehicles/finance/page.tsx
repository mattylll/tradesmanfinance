"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
  Truck,
  Zap,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  ChevronRight,
  Phone,
  Star,
  TrendingUp,
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

const manufacturers = [
  { name: 'Ford', slug: 'ford', marketShare: '32%', reputation: 'Most popular trade van in UK', gradient: 'from-blue-600 to-blue-700' },
  { name: 'Mercedes-Benz', slug: 'mercedes', marketShare: '14%', reputation: 'Premium quality, excellent reliability', gradient: 'from-gray-600 to-gray-700' },
  { name: 'Volkswagen', slug: 'volkswagen', marketShare: '11%', reputation: 'German engineering, reliable', gradient: 'from-blue-500 to-blue-600' },
  { name: 'Peugeot', slug: 'peugeot', marketShare: '9%', reputation: 'Value for money, economical', gradient: 'from-blue-400 to-blue-500' },
  { name: 'Citroën', slug: 'citroen', marketShare: '8%', reputation: 'Practical design, comfortable', gradient: 'from-red-600 to-red-700' },
  { name: 'Nissan', slug: 'nissan', marketShare: '7%', reputation: 'Reliable, good payload capacity', gradient: 'from-red-700 to-red-800' },
  { name: 'Renault', slug: 'renault', marketShare: '6%', reputation: 'Affordable, wide range', gradient: 'from-yellow-600 to-yellow-700' },
  { name: 'Vauxhall', slug: 'vauxhall', marketShare: '5%', reputation: 'British heritage, practical', gradient: 'from-red-500 to-red-600' },
];

const vehicleTypes = [
  { name: 'Small Vans', description: 'Compact vans for city work', examples: 'Transit Courier, Citan', icon: Truck },
  { name: 'Medium Vans', description: 'Perfect all-rounders for most trades', examples: 'Transit Custom, Vito', icon: Truck },
  { name: 'Large Vans', description: 'Maximum capacity for big jobs', examples: 'Transit, Sprinter', icon: Truck },
  { name: 'Pickups', description: '4x4 capability with load bed', examples: 'Ranger, Amarok', icon: Truck },
];

export default function VehicleFinanceHub() {
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

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-full text-[#ff6b35] text-sm font-semibold">
                <Truck className="w-4 h-4" />
                Vehicle Finance
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Finance Work Vans & Vehicles
              <span className="block text-[#ff6b35]">From Leading Manufacturers</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
            >
              New and used vans up to 5 years old. From £250/month. 89% approval rate. Decision in 60 seconds.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#ff6b35] hover:bg-[#ff8f5a] text-white h-14 px-8 text-lg font-semibold"
              >
                <Link href="/calculators/vehicle-finance">
                  Calculate Finance
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 h-14 px-8 text-lg font-semibold"
              >
                <Link href="/contact">
                  <Phone className="mr-2 w-5 h-5" />
                  Get in Touch
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === STATS BAR === */}
      <section className="relative bg-gray-900 border-y border-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Finance From', value: '£250/mo', icon: Shield },
              { label: 'Approval Rate', value: '89%', icon: Star },
              { label: 'Decision Time', value: '60s', icon: Clock },
              { label: 'Terms Available', value: '12-60mo', icon: CheckCircle },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-[#ff6b35] mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === MANUFACTURERS SECTION === */}
      <section className="relative py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Finance by <span className="text-[#ff6b35]">Manufacturer</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400"
            >
              All major van manufacturers - new and used up to 5 years old
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {manufacturers.map((manufacturer) => (
              <motion.div
                key={manufacturer.slug}
                variants={scaleIn}
              >
                <Link
                  href={`/vehicles/finance/${manufacturer.slug}`}
                  className="group block relative overflow-hidden bg-gray-900 border-2 border-white/5 hover:border-[#ff6b35] rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-[#ff6b35]/20"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${manufacturer.gradient} opacity-10 rounded-full blur-3xl transition-opacity group-hover:opacity-20`} />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#ff6b35] transition-colors">
                      {manufacturer.name}
                    </h3>
                    <div className="text-sm text-gray-400 mb-3">{manufacturer.reputation}</div>
                    <div className="text-lg font-semibold text-[#ff6b35] mb-4">{manufacturer.marketShare} market share</div>
                    <div className="flex items-center text-white/60 group-hover:text-white transition-colors">
                      <span className="text-sm">View Models</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === VEHICLE TYPES SECTION === */}
      <section className="relative py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Finance by <span className="text-[#ff6b35]">Vehicle Type</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400"
            >
              Find the right size vehicle for your trade
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {vehicleTypes.map((type) => (
              <motion.div
                key={type.name}
                variants={scaleIn}
                className="bg-gray-950 border border-white/10 rounded-lg p-6 text-center"
              >
                <type.icon className="w-12 h-12 text-[#ff6b35] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{type.name}</h3>
                <p className="text-gray-400 mb-3 text-sm">{type.description}</p>
                <p className="text-xs text-gray-500">{type.examples}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === WHY FINANCE SECTION === */}
      <section className="relative py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Why <span className="text-[#ff6b35]">Finance Your Van?</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Shield,
                title: 'Preserve Cash Flow',
                description: 'Keep working capital for materials, wages, and growth instead of tying it up in a van purchase.',
              },
              {
                icon: TrendingUp,
                title: 'Get on the Road Faster',
                description: 'Don\'t wait months to save. Get your van now and start earning immediately with low monthly payments.',
              },
              {
                icon: CheckCircle,
                title: '100% Tax Deductible',
                description: 'Finance payments are fully tax deductible as a business expense, reducing your overall cost.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={scaleIn}
                className="text-center p-8 bg-gray-900 border border-white/5 rounded-lg"
              >
                <benefit.icon className="w-16 h-16 text-[#ff6b35] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="relative py-20 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] via-[#ff8f5a] to-[#ffd93d]" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Finance Your Van?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Apply in 60 seconds. 89% approval rate. Finance from £250/month.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white h-14 px-10 text-lg font-bold shadow-xl"
            >
              <Link href="/contact">
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
