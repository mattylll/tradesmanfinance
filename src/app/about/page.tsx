"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import {
  Users,
  Shield,
  Clock,
  Award,
  CheckCircle,
  Phone,
  ArrowRight,
  Building2,
  Banknote,
  TrendingUp,
  Heart,
  Sparkles,
  Star,
} from "lucide-react";

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

const stats = [
  { value: "10,000+", label: "Tradesmen Funded", icon: Users },
  { value: "£150M+", label: "Finance Arranged", icon: Banknote },
  { value: "98%", label: "Customer Satisfaction", icon: Heart },
  { value: "4.9/5", label: "Trust Rating", icon: Award },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "No hidden fees, no surprises. We believe in clear, honest communication about rates, terms, and what you can expect.",
    color: "#ff6b35",
  },
  {
    icon: Clock,
    title: "Speed & Efficiency",
    description:
      "We know time is money for tradesmen. Our streamlined process means decisions in 24 hours and funds typically within 48 hours.",
    color: "#0ea5a5",
  },
  {
    icon: Users,
    title: "Trade Expertise",
    description:
      "Our team understands the unique challenges tradesmen face. We speak your language and know your industry inside out.",
    color: "#6366f1",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    description:
      "We're not just about loans - we're about helping you grow your business, improve your equipment, and increase your profits.",
    color: "#10b981",
  },
];

const timeline = [
  {
    year: "2015",
    title: "Founded",
    description: "Started with a mission to make finance accessible to UK tradesmen",
  },
  {
    year: "2017",
    title: "1,000 Customers",
    description: "Reached our first major milestone of 1,000 funded tradesmen",
  },
  {
    year: "2019",
    title: "National Coverage",
    description: "Expanded to serve tradesmen across all UK regions",
  },
  {
    year: "2021",
    title: "Digital First",
    description: "Launched our fully digital application process for faster approvals",
  },
  {
    year: "2023",
    title: "10,000 Tradesmen",
    description: "Celebrated funding our 10,000th tradesman business",
  },
  {
    year: "2024",
    title: "Industry Leader",
    description: "Recognised as the UK's leading specialist tradesman finance provider",
  },
];

const team = [
  {
    name: "David Mitchell",
    role: "Managing Director",
    bio: "Former construction industry professional with 20+ years in trade finance",
  },
  {
    name: "Sarah Thompson",
    role: "Head of Lending",
    bio: "Specialist in small business finance with a passion for helping tradesmen succeed",
  },
  {
    name: "James Wilson",
    role: "Customer Success Director",
    bio: "Dedicated to ensuring every tradesman gets the support they need",
  },
];

export default function AboutPage() {
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

        {/* Grid pattern */}
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
                About Tradesman Finance
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              <span className="text-white">Helping UK Tradesmen </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] via-[#ffd93d] to-[#ff6b35]">
                Build Their Dreams
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Since 2015, we've been the trusted finance partner for over 10,000 electricians,
              plumbers, builders, and tradesmen across the UK. We understand your business
              because we've been part of the trade industry ourselves.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] hover:from-[#e55a2b] hover:to-[#ff6b35] text-white font-bold text-lg px-10 py-7 rounded-xl shadow-[0_0_30px_rgba(255,107,53,0.3)] hover:shadow-[0_0_40px_rgba(255,107,53,0.5)] transition-all"
                  >
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/products">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-600 text-white hover:bg-white/5 hover:border-[#ff6b35] font-semibold text-lg px-8 py-7 rounded-xl transition-all"
                  >
                    Explore Finance Options
                  </Button>
                </motion.div>
              </Link>
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

      {/* Stats Section - Dark */}
      <section className="relative py-16 bg-gray-900/80 border-y border-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-2xl bg-[#ff6b35]/15 flex items-center justify-center mx-auto mb-4"
                >
                  <stat.icon className="h-8 w-8 text-[#ff6b35]" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-[#ff6b35] mb-1" style={{ fontFamily: 'var(--font-industrial)' }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section - Dark */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #ff6b35 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInLeft}>
                <Badge className="mb-6 bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20 px-4 py-1.5">
                  Our Mission
                </Badge>
              </motion.div>

              <motion.h2
                variants={fadeInLeft}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: 'var(--font-industrial)' }}
              >
                Making Finance Work for <span className="text-[#ff6b35]">Working Tradesmen</span>
              </motion.h2>

              <motion.p variants={fadeInLeft} className="text-lg text-gray-400 mb-6">
                Traditional banks often don't understand the unique financial needs of tradesmen.
                Irregular income patterns, project-based cash flow, and the need for specialist
                equipment make standard finance products unsuitable.
              </motion.p>

              <motion.p variants={fadeInLeft} className="text-lg text-gray-400 mb-6">
                That's why we created Tradesman Finance. We offer flexible finance solutions
                designed specifically for the way tradesmen actually work and earn.
              </motion.p>

              <motion.ul variants={fadeInLeft} className="space-y-3">
                {[
                  "Flexible repayments aligned with your cash flow",
                  "No penalty for early repayment",
                  "Finance for all credit profiles considered",
                  "Specialist knowledge of trade equipment",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">{item}</span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
                <div className="w-16 h-16 rounded-2xl bg-[#ff6b35]/15 flex items-center justify-center mb-6">
                  <Building2 className="h-8 w-8 text-[#ff6b35]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Built by Tradesmen, for Tradesmen</h3>
                <p className="text-gray-400 mb-4">
                  Our founding team includes former electricians, construction managers, and trade
                  finance specialists. We've walked in your boots and understand the challenges
                  you face every day.
                </p>
                <p className="text-gray-400">
                  This hands-on experience shapes everything we do, from our application process
                  to our flexible repayment options.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Dark */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

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
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20 px-4 py-1.5">
                Our Values
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              What We <span className="text-[#ff6b35]">Stand For</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our values guide every decision we make and every interaction we have with the
              tradesmen we serve.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={fadeInUp} whileHover={{ y: -5 }}>
                <div className="h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 hover:border-gray-700 transition-all">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${value.color}15` }}
                  >
                    <value.icon className="h-7 w-7" style={{ color: value.color }} />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section - Dark */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20 px-4 py-1.5">
                Our Journey
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Growing With <span className="text-[#ff6b35]">UK Tradesmen</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
              From humble beginnings to becoming the UK's trusted tradesman finance provider.
            </motion.p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {timeline.map((event, index) => (
                <motion.div
                  key={event.year}
                  variants={fadeInUp}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] text-white flex items-center justify-center font-bold text-sm shadow-[0_0_20px_rgba(255,107,53,0.3)]"
                    >
                      {event.year.slice(2)}
                    </motion.div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-800 mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="text-sm text-[#ff6b35] font-medium">{event.year}</div>
                    <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section - Dark */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20 px-4 py-1.5">
                Leadership Team
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Meet the People <span className="text-[#ff6b35]">Behind the Mission</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our experienced team is dedicated to helping UK tradesmen succeed.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeInUp} whileHover={{ y: -5 }}>
                <div className="text-center bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 hover:border-gray-700 transition-all">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-20 h-20 rounded-full bg-[#ff6b35]/15 mx-auto mb-4 flex items-center justify-center"
                  >
                    <Users className="h-10 w-10 text-[#ff6b35]" />
                  </motion.div>
                  <h3 className="font-bold text-lg text-white">{member.name}</h3>
                  <p className="text-sm text-[#ff6b35] mb-2">{member.role}</p>
                  <p className="text-sm text-gray-400">{member.bio}</p>
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
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-industrial)' }}>
              Ready to Grow Your Trade Business?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              Join over 10,000 tradesmen who've trusted us to help fund their business growth.
              Get a decision in 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-white text-[#ff6b35] hover:bg-white/90 font-bold text-lg px-10 py-7 rounded-xl shadow-xl"
                  >
                    Get Your Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#ff6b35] font-bold text-lg px-10 py-7 rounded-xl transition-all"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
