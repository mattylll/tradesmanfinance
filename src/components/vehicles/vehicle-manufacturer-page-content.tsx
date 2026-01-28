"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  ArrowRight,
  CheckCircle,
  Shield,
  TrendingUp,
  Clock,
  Star,
  Phone,
  Truck,
  ChevronRight,
  Zap,
  Gauge,
  Weight,
  Fuel,
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

type VehicleManufacturerPageContentProps = {
  manufacturer: any
  manufacturerSlug: string
  contactPhone: string
}

export function VehicleManufacturerPageContent({
  manufacturer,
  manufacturerSlug,
  contactPhone,
}: VehicleManufacturerPageContentProps) {
  const models = Object.entries(manufacturer.models || {})

  return (
    <main className="min-h-screen">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 py-4 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/vehicles/finance" className="hover:text-[#ff6b35] transition-colors">Vehicle Finance</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{manufacturer.name}</span>
        </div>
      </nav>

      {/* === HERO SECTION === */}
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
            <motion.div variants={fadeInUp} className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-full text-[#ff6b35] text-sm font-semibold uppercase tracking-wide">
                <Truck className="w-4 h-4" />
                Commercial Vehicles
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {manufacturer.name} Van Finance
              <span className="block text-[#ff6b35]">New & Used Vehicles</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
            >
              {manufacturer.reputation}. {manufacturer.marketShare} UK market share. Finance from £250/month.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
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

            {/* Stats Grid */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {[
                { label: 'Market Share', value: manufacturer.marketShare, icon: Star },
                { label: 'Models Available', value: `${models.length}+`, icon: Truck },
                { label: 'Approval Rate', value: '89%', icon: CheckCircle },
                { label: 'Decision Time', value: '60 sec', icon: Clock },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-900 border border-white/10 rounded-lg p-4">
                  <stat.icon className="w-6 h-6 text-[#ff6b35] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#ff6b35] mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === AVAILABLE MODELS SECTION === */}
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
              {manufacturer.name} <span className="text-[#ff6b35]">Models</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400"
            >
              Finance new and used vehicles up to 5 years old
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {models.map(([modelKey, model]: [string, any]) => {
              const modelSlug = modelKey.replace(/_/g, '-')
              const [minPrice, maxPrice] = model.typical_price.replace('£', '').split('-')
              const [minMonthly, maxMonthly] = model.typical_monthly_finance.replace('£', '').split('-')

              return (
                <motion.div key={modelKey} variants={scaleIn}>
                  <Link href={`/vehicles/finance/${manufacturerSlug}/${modelSlug}`}>
                    <div className="group bg-gray-950 border-2 border-white/5 hover:border-[#ff6b35] rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-[#ff6b35]/20 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-[#ff6b35] transition-colors mb-1">
                            {model.name}
                          </h3>
                          <div className="inline-block px-2 py-1 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded text-xs font-semibold text-[#ff6b35]">
                            {model.search_volume} demand
                          </div>
                        </div>
                        <Truck className="w-8 h-8 text-[#ff6b35]" />
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Purchase Price</div>
                        <div className="text-2xl font-bold text-white">{model.typical_price}</div>
                        <div className="text-[#ff6b35] font-semibold">{model.typical_monthly_finance}/month</div>
                      </div>

                      {/* Key Specs */}
                      <div className="space-y-2 mb-4 flex-grow">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Weight className="w-4 h-4 text-[#ff6b35]" />
                          <span>Payload: {model.payload}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Gauge className="w-4 h-4 text-[#ff6b35]" />
                          <span>Load: {model.load_length}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Fuel className="w-4 h-4 text-[#ff6b35]" />
                          <span>{model.fuel_economy}</span>
                        </div>
                      </div>

                      {/* Trade badges */}
                      <div className="mb-4 pt-4 border-t border-white/10">
                        <div className="text-xs text-gray-500 mb-2">Ideal for:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {model.best_for_trades.slice(0, 3).map((trade: string) => (
                            <span
                              key={trade}
                              className="text-xs px-2 py-1 rounded bg-gray-900 border border-white/10 text-gray-300 capitalize"
                            >
                              {trade.replace(/_/g, ' ')}
                            </span>
                          ))}
                          {model.best_for_trades.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded bg-gray-900 border border-white/10 text-gray-300">
                              +{model.best_for_trades.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center text-[#ff6b35] group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-semibold">View Full Specs</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
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
              Why Finance <span className="text-[#ff6b35]">{manufacturer.name}?</span>
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
                title: 'Proven Reliability',
                description: `${manufacturer.name} has ${manufacturer.marketShare} UK market share because of proven reliability and resale value.`,
              },
              {
                icon: TrendingUp,
                title: 'Start Earning Immediately',
                description: `Get your ${manufacturer.name} van now and start taking on jobs. Don't wait months to save the full amount.`,
              },
              {
                icon: CheckCircle,
                title: '100% Tax Deductible',
                description: 'Finance payments are fully tax deductible as a business expense, reducing your overall cost.',
              },
            ].map((benefit) => (
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

      {/* === FINAL CTA === */}
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
              Ready to Finance Your {manufacturer.name}?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Apply in 60 seconds. 89% approval rate. Finance from £250/month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white/80 bg-white/10 text-white hover:bg-white/20 h-14 px-10 text-lg font-bold backdrop-blur-sm"
              >
                <a href={`tel:${contactPhone}`}>
                  <Phone className="mr-2 w-5 h-5" />
                  Call {contactPhone}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
