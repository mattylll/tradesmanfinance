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
  Package,
  Zap,
  Award,
  Calculator,
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

type ProductPageContentProps = {
  manufacturer: any
  manufacturerSlug: string
  product: any
  productSlug: string
  stats: any
  relatedProducts: any[]
  testimonials: any[]
  contactPhone: string
}

export function ProductPageContent({
  manufacturer,
  manufacturerSlug,
  product,
  productSlug,
  stats,
  relatedProducts,
  testimonials,
  contactPhone,
}: ProductPageContentProps) {
  const [minPrice, maxPrice] = product.typical_price.replace('£', '').split('-')
  const monthlyFrom = Math.round(parseInt(minPrice) / 24)
  const monthlyTo = maxPrice ? Math.round(parseInt(maxPrice) / 24) : null

  return (
    <main className="min-h-screen">
      {/* Breadcrumbs */}
      <nav className="bg-gray-950 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/tools/finance" className="hover:text-[#ff6b35] transition-colors">Tool Finance</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/tools/finance/${manufacturerSlug}`} className="hover:text-[#ff6b35] transition-colors">
              {manufacturer.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{product.name}</span>
          </div>
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
            className="max-w-5xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Product Info */}
              <div>
                <motion.div variants={fadeInUp} className="inline-block mb-4">
                  <Link
                    href={`/tools/finance/${manufacturerSlug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm font-semibold hover:border-[#ff6b35] hover:text-[#ff6b35] transition-all"
                  >
                    <Wrench className="w-4 h-4" />
                    {manufacturer.name}
                  </Link>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                >
                  {product.name}
                  <span className="block text-[#ff6b35] text-3xl md:text-4xl mt-2">Finance Available</span>
                </motion.h1>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-6">
                  {product.trades.slice(0, 3).map((trade: string) => (
                    <span
                      key={trade}
                      className="px-3 py-1.5 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-full text-[#ff6b35] text-sm font-semibold capitalize"
                    >
                      For {trade}s
                    </span>
                  ))}
                </motion.div>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-gray-400 mb-8 leading-relaxed"
                >
                  Finance this {manufacturer.tier.toLowerCase()} tool from £{monthlyFrom}/month with {stats?.approval_rate || 89}% approval rate.
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
                    <Link href="/calculators">
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
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/20 to-[#ffd93d]/10 rounded-2xl blur-2xl" />

                  {/* Card */}
                  <div className="relative bg-gray-900 border-2 border-[#ff6b35]/30 rounded-2xl p-8">
                    <div className="text-center mb-6">
                      <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Product Price</div>
                      <div className="text-5xl font-bold text-white mb-2">{product.typical_price}</div>
                      <div className="text-[#ff6b35] font-semibold">
                        or from £{monthlyFrom}/month{monthlyTo && ` - £${monthlyTo}/month`}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {[
                        { icon: CheckCircle, text: 'Terms: 12-60 months' },
                        { icon: Shield, text: `${stats?.approval_rate || 89}% approval rate` },
                        { icon: Clock, text: '60 second decision' },
                        { icon: Award, text: '100% tax deductible' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-300">
                          <item.icon className="w-5 h-5 text-[#ff6b35]" />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-gray-500 text-center">
                      Representative example: {product.typical_price} over 24 months at 9.9% APR
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === PRODUCT BENEFITS === */}
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
              Why Finance the <span className="text-[#ff6b35]">{product.name}?</span>
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
                icon: TrendingUp,
                title: 'Start Earning Immediately',
                description: `Don't wait to save up ${product.typical_price}. Get the ${product.name} now and start taking on jobs that require it today.`,
              },
              {
                icon: Shield,
                title: 'Preserve Working Capital',
                description: 'Keep cash in your business for materials, wages, and unexpected expenses while spreading the tool cost over time.',
              },
              {
                icon: Award,
                title: 'Tax Deductible Payments',
                description: 'Finance payments are typically 100% tax deductible as a business expense, reducing your overall cost.',
              },
            ].map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={scaleIn}
                className="text-center p-8 bg-gray-950 border border-white/5 rounded-lg hover:border-[#ff6b35]/30 transition-colors"
              >
                <benefit.icon className="w-16 h-16 text-[#ff6b35] mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
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
              Ideal for <span className="text-[#ff6b35]">Your Trade</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400"
            >
              This tool is perfect for {product.trades.length > 1 ? 'these trades' : 'your trade'}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {product.trades.map((trade: string) => (
              <motion.div key={trade} variants={scaleIn}>
                <Link href={`/tools/finance/${manufacturerSlug}/for-${trade.toLowerCase().replace(/ /g, '-')}`}>
                  <div className="group bg-gray-900 border border-white/10 hover:border-[#ff6b35] rounded-lg p-6 text-center transition-all hover:shadow-lg hover:shadow-[#ff6b35]/20">
                    <Wrench className="w-10 h-10 text-[#ff6b35] mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white group-hover:text-[#ff6b35] transition-colors capitalize">
                      {trade}s
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === OFTEN BOUGHT WITH === */}
      {relatedProducts.length > 0 && (
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
                Often Bought <span className="text-[#ff6b35]">Together</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-400"
              >
                Other {manufacturer.name} tools you might need
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {relatedProducts.map((relatedProduct: any) => {
                const [minRelatedPrice] = relatedProduct.typical_price.replace('£', '').split('-')
                const monthlyRelatedPrice = Math.round(parseInt(minRelatedPrice) / 24)

                return (
                  <motion.div key={relatedProduct.slug} variants={scaleIn}>
                    <Link href={`/tools/finance/${manufacturerSlug}/${relatedProduct.slug}`}>
                      <div className="group bg-gray-950 border-2 border-white/5 hover:border-[#ff6b35] rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-[#ff6b35]/20 h-full">
                        <div className="inline-block px-3 py-1 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-full text-xs font-semibold mb-3 text-[#ff6b35]">
                          {relatedProduct.search_volume} demand
                        </div>
                        <h3 className="text-lg font-bold mb-3 text-white group-hover:text-[#ff6b35] transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <div className="mb-4">
                          <div className="text-xl font-bold text-white">{relatedProduct.typical_price}</div>
                          <div className="text-[#ff6b35] font-semibold">From £{monthlyRelatedPrice}/month</div>
                        </div>
                        <div className="flex items-center text-[#ff6b35] group-hover:translate-x-1 transition-transform">
                          <span className="text-sm font-semibold">View Product</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-12 text-center"
            >
              <Link href={`/tools/finance/${manufacturerSlug}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 h-12 px-8 font-semibold"
                >
                  View All {manufacturer.name} Products
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* === TESTIMONIALS === */}
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
                Real <span className="text-[#ff6b35]">Tradespeople</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
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

      {/* === FAQ === */}
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
              <span className="text-[#ff6b35]">FAQs</span> About Financing
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
                question: `What's the monthly payment for the ${product.name}?`,
                answer: `For a ${product.typical_price} ${product.name}, monthly payments typically range from £${monthlyFrom}${monthlyTo ? `-£${monthlyTo}` : ''} depending on the term (12-60 months) and your credit profile.`,
              },
              {
                question: `Can I finance the ${product.name} with other tools?`,
                answer: `Yes! You can combine multiple ${manufacturer.name} products into a single finance agreement. This is ideal for building a complete kit or upgrading your workshop.`,
              },
              {
                question: `Do I need to be VAT registered to get finance?`,
                answer: `No, you don't need to be VAT registered. We help sole traders, partnerships, and limited companies get the equipment they need.`,
              },
              {
                question: `Is the ${product.name} available for immediate delivery?`,
                answer: `Once your finance is approved, you can purchase from any ${manufacturer.name} stockist. We provide the funding, you choose where to buy.`,
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
              Finance Your {product.name} Today
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              From £{monthlyFrom}/month. {stats?.approval_rate || 89}% approval rate. Decision in 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white h-14 px-10 text-lg font-bold shadow-xl"
              >
                <Link href="/calculators">
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
