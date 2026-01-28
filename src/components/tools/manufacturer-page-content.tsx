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
  Wrench,
  ChevronRight,
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

type ManufacturerPageContentProps = {
  manufacturer: any
  stats: any
  testimonials: any[]
  manufacturerSlug: string
  contactPhone: string
}

export function ManufacturerPageContent({
  manufacturer,
  stats,
  testimonials,
  manufacturerSlug,
  contactPhone,
}: ManufacturerPageContentProps) {
  const [minPrice, maxPrice] = manufacturer.typical_purchase.replace('£', '').split('-')
  const monthlyFrom = stats ? stats.avg_monthly : Math.round(parseInt(minPrice) / 24)

  return (
    <main className="min-h-screen">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 py-4 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/tools/finance" className="hover:text-[#ff6b35] transition-colors">Tool Finance</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{manufacturer.name}</span>
        </div>
      </nav>

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
            <motion.div variants={fadeInUp} className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-full text-[#ff6b35] text-sm font-semibold uppercase tracking-wide">
                <Wrench className="w-4 h-4" />
                {manufacturer.tier} Tools
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {manufacturer.name} Finance
              <span className="block text-[#ff6b35]">for Trade Professionals</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
            >
              Finance {manufacturer.name} {manufacturer.tier.toLowerCase()} tools from £{monthlyFrom}/month.
              {stats && ` ${stats.approval_rate}% approval rate.`} Spread the cost over 12-60 months.
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
                <Link href="/calculators">
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
                { label: 'Typical Purchase', value: manufacturer.typical_purchase, icon: Shield },
                { label: 'Finance From', value: `£${monthlyFrom}/mo`, icon: CheckCircle },
                { label: 'Approval Rate', value: `${stats?.approval_rate || 89}%`, icon: Star },
                { label: 'Decision Time', value: '60 sec', icon: Clock },
              ].map((stat, index) => (
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

      {/* === WHY FINANCE SECTION === */}
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
              Why Finance <span className="text-[#ff6b35]">{manufacturer.name} Tools?</span>
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
                icon: Wrench,
                title: `${manufacturer.tier} Quality`,
                description: `${manufacturer.name} ${manufacturer.tier.toLowerCase()} tools are built for professional trade use and built to last.`,
              },
              {
                icon: TrendingUp,
                title: 'Preserve Cash Flow',
                description: `${manufacturer.name} tools typically cost ${manufacturer.typical_purchase}. Finance lets you start earning immediately while spreading the cost.`,
              },
              {
                icon: CheckCircle,
                title: 'Tax Efficient',
                description: 'Finance payments are typically 100% tax deductible as a business expense. Consult your accountant for your specific situation.',
              },
            ].map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={scaleIn}
                className="text-center p-8 bg-gray-950 border border-white/5 rounded-lg"
              >
                <benefit.icon className="w-16 h-16 text-[#ff6b35] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* ROI Stats */}
          {stats && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-16 max-w-3xl mx-auto bg-[#ff6b35]/10 border border-[#ff6b35]/20 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-white">Typical Return on Investment</h3>
              <p className="text-center text-gray-400 mb-8">
                Based on {stats.num_applications.toLocaleString()} applications for {manufacturer.name} equipment:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Average Purchase', value: `£${stats.avg_purchase.toLocaleString()}` },
                  { label: 'Monthly Payment', value: `£${stats.avg_monthly}` },
                  { label: 'Average Term', value: `${stats.avg_term} months` },
                  { label: 'Payback Period', value: `${stats.payback_jobs} jobs` },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-bold text-gray-400 text-sm mb-2 uppercase tracking-wider">{stat.label}</div>
                    <div className="text-3xl font-bold text-[#ff6b35]">{stat.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* === TRADE BREAKDOWN SECTION === */}
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
              {manufacturer.name} Finance by <span className="text-[#ff6b35]">Trade</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400"
            >
              {manufacturer.name} tools are most commonly financed by these trades
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {manufacturer.trades.map((trade: string) => {
              const tradeSlug = trade.toLowerCase().replace(/ /g, '-')
              const tradePercentage = stats?.top_trades?.[trade] || 0

              return (
                <motion.div key={trade} variants={scaleIn}>
                  <Link href={`/tools/finance/${manufacturerSlug}/for-${tradeSlug}`}>
                    <div className="group bg-gray-900 border-2 border-white/5 hover:border-[#ff6b35] rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-[#ff6b35]/20 h-full">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold capitalize text-white group-hover:text-[#ff6b35] transition-colors">
                          For {trade}s
                        </h3>
                        {tradePercentage > 0 && (
                          <span className="bg-[#ff6b35]/10 text-[#ff6b35] px-3 py-1 rounded-full text-sm font-semibold border border-[#ff6b35]/20">
                            {tradePercentage}%
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-4">
                        Popular {manufacturer.name} products for {trade}s
                      </p>
                      <div className="flex items-center text-[#ff6b35] group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-semibold">View Products</span>
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

      {/* === POPULAR PRODUCTS SECTION === */}
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
              Popular <span className="text-[#ff6b35]">{manufacturer.name} Products</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400"
            >
              Finance the tools that grow your business
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {Object.entries(manufacturer.flagship_products || {}).slice(0, 6).map(([key, product]: [string, any]) => {
              const productSlug = key.replace(/_/g, '-')
              const [minProductPrice] = product.typical_price.replace('£', '').split('-')
              const monthlyPrice = Math.round(parseInt(minProductPrice) / 24)

              return (
                <motion.div key={key} variants={scaleIn}>
                  <div className="group bg-gray-950 border-2 border-white/5 hover:border-[#ff6b35] rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-[#ff6b35]/20 h-full flex flex-col">
                    <div className="inline-block px-3 py-1 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-full text-xs font-semibold mb-3 text-[#ff6b35] self-start">
                      {product.search_volume} demand
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#ff6b35] transition-colors">{product.name}</h3>
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-white">{product.typical_price}</div>
                      <div className="text-[#ff6b35] font-semibold">From £{monthlyPrice}/month</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 mb-2">Ideal for:</div>
                      <div className="flex flex-wrap gap-2">
                        {product.trades.slice(0, 3).map((trade: string) => (
                          <span key={trade} className="text-xs bg-gray-900 border border-white/10 px-2 py-1 rounded capitalize text-gray-300">
                            {trade}s
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={`/tools/finance/${manufacturerSlug}/${productSlug}`}
                      className="mt-auto block w-full text-center border-2 border-[#ff6b35] text-[#ff6b35] py-3 rounded-lg font-semibold hover:bg-[#ff6b35] hover:text-white transition-colors"
                    >
                      Finance Now
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* === TESTIMONIALS SECTION === */}
      {testimonials.length > 0 && (
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
                Tradespeople Financing <span className="text-[#ff6b35]">{manufacturer.name}</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {testimonials.map((testimonial: any) => (
                <motion.div key={testimonial.id} variants={scaleIn}>
                  <div className="bg-gray-900 border border-white/10 rounded-lg p-6 h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-[#ffd93d] fill-[#ffd93d]" />
                      ))}
                    </div>
                    <blockquote className="text-gray-300 mb-6 leading-relaxed italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>
                    <div>
                      <div className="font-bold text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-400 capitalize">{testimonial.trade} • {testimonial.location}</div>
                      <div className="text-sm text-[#ff6b35] mt-1">Financed: {manufacturer.name} {testimonial.product}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* === FAQ SECTION === */}
      <section className="relative py-20 bg-gray-900">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {manufacturer.name} Finance <span className="text-[#ff6b35]">FAQs</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {[
              {
                question: `How much can I finance for ${manufacturer.name} tools?`,
                answer: `We offer finance from £500 to £50,000 for ${manufacturer.name} equipment. Most ${manufacturer.name} purchases fall between ${manufacturer.typical_purchase}, which works out at £${monthlyFrom}-£${maxPrice && Math.round(parseInt(maxPrice) / 24)}/month over 24 months.`,
              },
              {
                question: `What's the typical approval rate for ${manufacturer.name} finance?`,
                answer: `Based on our data, ${stats?.approval_rate || 89}% of applications for ${manufacturer.name} tools are approved. We work with multiple lenders to find the best rate for your circumstances.`,
              },
              {
                question: `Is ${manufacturer.name} finance tax deductible?`,
                answer: `Finance payments for business equipment are typically 100% tax deductible as a trading expense. Consult your accountant for advice specific to your situation.`,
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="border-b border-white/10 pb-6"
              >
                <h3 className="text-xl font-bold mb-3 text-white">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
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
              Ready to Finance Your {manufacturer.name} Equipment?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Apply in 60 seconds. {stats?.approval_rate || 89}% approval rate. Finance from £{monthlyFrom}/month.
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
