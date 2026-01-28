"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  ArrowRight,
  CheckCircle,
  Shield,
  TrendingUp,
  Star,
  Phone,
  Truck,
  ChevronRight,
  Gauge,
  Weight,
  Fuel,
  Ruler,
  Calculator,
  Award,
  Package,
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

type VehicleModelPageContentProps = {
  manufacturer: any
  manufacturerSlug: string
  model: any
  modelSlug: string
  relatedModels: any[]
  contactPhone: string
}

export function VehicleModelPageContent({
  manufacturer,
  manufacturerSlug,
  model,
  modelSlug,
  relatedModels,
  contactPhone,
}: VehicleModelPageContentProps) {
  const [minPrice, maxPrice] = model.typical_price.replace('£', '').split('-')
  const [minMonthly, maxMonthly] = model.typical_monthly_finance.replace('£', '').split('-')

  return (
    <main className="min-h-screen">
      {/* Breadcrumbs */}
      <nav className="bg-gray-950 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/vehicles/finance" className="hover:text-[#ff6b35] transition-colors">Vehicle Finance</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/vehicles/finance/${manufacturerSlug}`} className="hover:text-[#ff6b35] transition-colors">
              {manufacturer.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{model.name}</span>
          </div>
        </div>
      </nav>

      {/* === HERO SECTION === */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, #ff6b35 40px, #ff6b35 42px)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Vehicle Info */}
              <div>
                <motion.div variants={fadeInUp} className="inline-block mb-4">
                  <Link
                    href={`/vehicles/finance/${manufacturerSlug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm font-semibold hover:border-[#ff6b35] hover:text-[#ff6b35] transition-all"
                  >
                    <Truck className="w-4 h-4" />
                    {manufacturer.name}
                  </Link>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                >
                  {model.name}
                  <span className="block text-[#ff6b35] text-3xl md:text-4xl mt-2">Finance Available</span>
                </motion.h1>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-6">
                  {model.best_for_trades.slice(0, 3).map((trade: string) => (
                    <span
                      key={trade}
                      className="px-3 py-1.5 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-full text-[#ff6b35] text-sm font-semibold capitalize"
                    >
                      For {trade.replace(/_/g, ' ')}s
                    </span>
                  ))}
                </motion.div>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-gray-400 mb-8 leading-relaxed"
                >
                  Finance this {manufacturer.name} from {model.typical_monthly_finance}/month. 89% approval rate. New & used up to 5 years old.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#ff6b35] hover:bg-[#ff8f5a] text-white h-14 px-8 text-lg font-semibold"
                  >
                    <Link href="/calculators/vehicle-finance">
                      <Calculator className="mr-2 w-5 h-5" />
                      Calculate Finance
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/20 text-white hover:bg-white/10 h-14 px-8 text-lg font-semibold"
                  >
                    <Link href="/contact">
                      Get a Quote
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Right: Pricing Card */}
              <motion.div variants={scaleIn}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/20 to-[#ffd93d]/10 rounded-2xl blur-2xl" />
                  <div className="relative bg-gray-900 border-2 border-[#ff6b35]/30 rounded-2xl p-8">
                    <div className="text-center mb-6">
                      <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Purchase Price</div>
                      <div className="text-5xl font-bold text-white mb-2">{model.typical_price}</div>
                      <div className="text-[#ff6b35] font-semibold">
                        or {model.typical_monthly_finance}/month
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {[
                        { icon: CheckCircle, text: 'Terms: 12-60 months' },
                        { icon: Shield, text: '89% approval rate' },
                        { icon: Star, text: `Resale value: ${model.resale_value}` },
                        { icon: Award, text: '100% tax deductible' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-300">
                          <item.icon className="w-5 h-5 text-[#ff6b35]" />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-gray-500 text-center">
                      Available for new & used vehicles up to 5 years old
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === SPECIFICATIONS === */}
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
              Technical <span className="text-[#ff6b35]">Specifications</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              { icon: Weight, label: 'Payload', value: model.payload },
              { icon: Ruler, label: 'Load Length', value: model.load_length },
              { icon: Fuel, label: 'Fuel Economy', value: model.fuel_economy },
              { icon: Package, label: 'Load Volume', value: model.load_width ? `${model.load_width} wide` : 'Various' },
            ].map((spec) => (
              <motion.div
                key={spec.label}
                variants={scaleIn}
                className="bg-gray-950 border border-white/10 rounded-lg p-6 text-center"
              >
                <spec.icon className="w-12 h-12 text-[#ff6b35] mx-auto mb-4" />
                <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">{spec.label}</div>
                <div className="text-2xl font-bold text-white">{spec.value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Body Types */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-12 max-w-4xl mx-auto text-center"
          >
            <div className="bg-gray-950 border border-white/10 rounded-lg p-6">
              <div className="text-sm text-gray-400 uppercase tracking-wider mb-3">Available Body Types</div>
              <div className="flex flex-wrap gap-3 justify-center">
                {model.body_types.map((bodyType: string) => (
                  <span
                    key={bodyType}
                    className="px-4 py-2 bg-gray-900 border border-white/10 rounded-lg text-white font-semibold capitalize"
                  >
                    {bodyType.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === IDEAL FOR TRADES === */}
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
              Perfect for <span className="text-[#ff6b35]">Your Trade</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {Object.entries(model.why_suitable || {}).map(([trade, reason]: [string, any]) => (
              <motion.div key={trade} variants={scaleIn}>
                <div className="bg-gray-900 border border-white/10 rounded-lg p-6 h-full">
                  <h3 className="text-xl font-bold text-white mb-3 capitalize">
                    For {trade.replace(/_/g, ' ')}s
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{reason}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === OTHER MODELS === */}
      {relatedModels.length > 0 && (
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
                Other <span className="text-[#ff6b35]">{manufacturer.name} Models</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {relatedModels.map((relatedModel: any) => (
                <motion.div key={relatedModel.slug} variants={scaleIn}>
                  <Link href={`/vehicles/finance/${manufacturerSlug}/${relatedModel.slug}`}>
                    <div className="group bg-gray-950 border-2 border-white/5 hover:border-[#ff6b35] rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-[#ff6b35]/20 h-full">
                      <h3 className="text-lg font-bold mb-3 text-white group-hover:text-[#ff6b35] transition-colors">
                        {relatedModel.name}
                      </h3>
                      <div className="mb-4">
                        <div className="text-xl font-bold text-white">{relatedModel.typical_price}</div>
                        <div className="text-[#ff6b35] font-semibold">{relatedModel.typical_monthly_finance}/month</div>
                      </div>
                      <div className="flex items-center text-[#ff6b35] group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-semibold">View Model</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* === FINAL CTA === */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] via-[#ff8f5a] to-[#ffd93d]" />
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
              Finance Your {manufacturer.name} {model.name} Today
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              From {model.typical_monthly_finance}/month. 89% approval rate. Decision in 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white h-14 px-10 text-lg font-bold shadow-xl"
              >
                <Link href="/calculators/vehicle-finance">
                  <Calculator className="mr-2 w-5 h-5" />
                  Calculate My Payments
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
