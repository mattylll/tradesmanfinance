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
  Wrench,
  ChevronRight,
  Zap,
  Package,
  Award,
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

type TradeBrandPageContentProps = {
  manufacturer: any
  manufacturerSlug: string
  tradeName: string
  tradeSlug: string
  stats: any
  tradeProducts: any[]
  testimonials: any[]
  contactPhone: string
}

export function TradeBrandPageContent({
  manufacturer,
  manufacturerSlug,
  tradeName,
  tradeSlug,
  stats,
  tradeProducts,
  testimonials,
  contactPhone,
}: TradeBrandPageContentProps) {
  const tradePercentage = stats?.top_trades?.[tradeName.toLowerCase()] || 0
  const [minPrice] = manufacturer.typical_purchase.replace('£', '').split('-')
  const monthlyFrom = stats ? stats.avg_monthly : Math.round(parseInt(minPrice) / 24)

  // Organize products into kits (starter, professional, master)
  const starterKit = tradeProducts.slice(0, 2)
  const professionalKit = tradeProducts.slice(0, 4)
  const masterKit = tradeProducts

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
            <span className="text-white">For {tradeName}s</span>
          </div>
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
                <Wrench className="w-4 h-4" />
                {manufacturer.tier} Tools for {tradeName}s
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {manufacturer.name} Finance
              <span className="block text-[#ff6b35]">for {tradeName}s</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
            >
              Essential {manufacturer.name} tools for professional {tradeName.toLowerCase()}s. Finance from £{monthlyFrom}/month.
              {tradePercentage > 0 && ` ${tradePercentage}% of our {manufacturer.name} applications come from {tradeName.toLowerCase()}s.`}
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

            {/* Quick Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {[
                { label: `${tradeName}s Trust Us`, value: tradePercentage > 0 ? `${tradePercentage}%` : 'Top Choice', icon: Shield },
                { label: 'Finance From', value: `£${monthlyFrom}/mo`, icon: CheckCircle },
                { label: 'Approval Rate', value: `${stats?.approval_rate || 89}%`, icon: Star },
                { label: 'Products Available', value: `${tradeProducts.length}+`, icon: Package },
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

      {/* === WHY THIS BRAND FOR THIS TRADE === */}
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
              Why {tradeName}s Choose <span className="text-[#ff6b35]">{manufacturer.name}</span>
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
                icon: Award,
                title: `${manufacturer.tier} Grade`,
                description: `${manufacturer.name} tools are built to withstand the demands of professional ${tradeName.toLowerCase()} work day in, day out.`,
              },
              {
                icon: Zap,
                title: 'Trade-Specific Features',
                description: `Every ${manufacturer.name} product is designed with professional {tradeName.toLowerCase()}s in mind, with features that matter for your work.`,
              },
              {
                icon: TrendingUp,
                title: 'ROI Within Weeks',
                description: `Most ${tradeName.toLowerCase()}s see return on investment within ${stats?.payback_jobs || 8} jobs. Finance lets you start earning immediately.`,
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
        </div>
      </section>

      {/* === ESSENTIAL TOOLS === */}
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
              Essential <span className="text-[#ff6b35]">{manufacturer.name} Tools</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400"
            >
              Popular products for {tradeName.toLowerCase()}s
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {tradeProducts.map((product: any) => {
              const [minProductPrice] = product.typical_price.replace('£', '').split('-')
              const monthlyPrice = Math.round(parseInt(minProductPrice) / 24)

              return (
                <motion.div key={product.slug} variants={scaleIn}>
                  <Link href={`/tools/finance/${manufacturerSlug}/${product.slug}`}>
                    <div className="group bg-gray-900 border-2 border-white/5 hover:border-[#ff6b35] rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-[#ff6b35]/20 h-full flex flex-col">
                      <div className="inline-block px-3 py-1 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-full text-xs font-semibold mb-3 text-[#ff6b35] self-start">
                        {product.search_volume} demand
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#ff6b35] transition-colors">
                        {product.name}
                      </h3>
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-white">{product.typical_price}</div>
                        <div className="text-[#ff6b35] font-semibold">From £{monthlyPrice}/month</div>
                      </div>
                      <div className="mt-auto">
                        <div className="flex items-center text-[#ff6b35] group-hover:translate-x-1 transition-transform">
                          <span className="text-sm font-semibold">Finance This Tool</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* === STARTER KITS === */}
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
              Finance Complete <span className="text-[#ff6b35]">Kits</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400"
            >
              Get everything you need in one finance package
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {[
              {
                name: 'Starter Kit',
                products: starterKit,
                description: 'Essential tools to get started',
                badge: 'Best for new businesses',
                gradient: 'from-green-600 to-green-700',
              },
              {
                name: 'Professional Kit',
                products: professionalKit,
                description: 'Complete toolkit for daily work',
                badge: 'Most popular',
                gradient: 'from-[#ff6b35] to-[#ff8f5a]',
              },
              {
                name: 'Master Kit',
                products: masterKit,
                description: 'Everything a pro needs',
                badge: 'Premium choice',
                gradient: 'from-purple-600 to-purple-700',
              },
            ].map((kit) => {
              const totalPrice = kit.products.reduce((sum, p) => {
                const [price] = p.typical_price.replace('£', '').split('-')
                return sum + parseInt(price)
              }, 0)
              const kitMonthly = Math.round(totalPrice / 24)

              return (
                <motion.div key={kit.name} variants={scaleIn}>
                  <div className="bg-gray-950 border-2 border-white/10 rounded-lg p-6 h-full flex flex-col">
                    <div className={`inline-block px-3 py-1 bg-gradient-to-r ${kit.gradient} rounded-full text-xs font-semibold mb-4 text-white self-start`}>
                      {kit.badge}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{kit.name}</h3>
                    <p className="text-gray-400 mb-4">{kit.description}</p>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">{kit.products.length} tools included</div>
                      <div className="text-3xl font-bold text-white">~£{totalPrice.toLocaleString()}</div>
                      <div className="text-[#ff6b35] font-semibold">From £{kitMonthly}/month</div>
                    </div>
                    <div className="mt-auto">
                      <Link href="/contact">
                        <Button className="w-full bg-[#ff6b35] hover:bg-[#ff8f5a] text-white">
                          Get Quote for Kit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

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
                {tradeName}s Using <span className="text-[#ff6b35]">{manufacturer.name}</span>
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
              <span className="text-[#ff6b35]">FAQs</span> for {tradeName}s
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
                question: `What ${manufacturer.name} tools do ${tradeName.toLowerCase()}s typically finance?`,
                answer: `${tradeName}s most commonly finance ${tradeProducts.slice(0, 3).map((p: any) => p.name).join(', ')}. These are the essential tools that provide the best return on investment for professional ${tradeName.toLowerCase()}s.`,
              },
              {
                question: `Can I finance multiple ${manufacturer.name} tools at once?`,
                answer: `Yes! Many ${tradeName.toLowerCase()}s choose to finance a complete kit of ${manufacturer.name} tools in one agreement. This can be more cost-effective and gives you everything you need from day one.`,
              },
              {
                question: `How quickly can I get approved as a ${tradeName.toLowerCase()}?`,
                answer: `Most ${tradeName.toLowerCase()}s get a decision within 60 seconds and funding within 24-48 hours. We understand you need tools to work, so we move fast.`,
              },
              {
                question: `Do other ${tradeName.toLowerCase()}s use ${manufacturer.name}?`,
                answer: tradePercentage > 0
                  ? `Yes! ${tradePercentage}% of our ${manufacturer.name} finance applications come from ${tradeName.toLowerCase()}s. It's a trusted brand in your trade.`
                  : `Absolutely! ${manufacturer.name} is a popular choice among professional ${tradeName.toLowerCase()}s across the UK for its reliability and performance.`,
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
              Ready to Upgrade Your {manufacturer.name} Kit?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of {tradeName.toLowerCase()}s financing {manufacturer.name} tools. From £{monthlyFrom}/month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white h-14 px-10 text-lg font-bold shadow-xl"
              >
                <Link href="/contact">
                  Get Your Quote
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
