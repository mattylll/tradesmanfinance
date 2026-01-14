"use client";

import Link from 'next/link';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Button } from '@/registry/new-york-v4/ui/button';
import { ArrowRight, Calendar, Clock, BookOpen, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/data/blog-posts';

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

interface BlogPageContentProps {
  posts: BlogPost[];
}

export function BlogPageContent({ posts }: BlogPageContentProps) {
  const stats = [
    { icon: BookOpen, value: '50+', label: 'Expert Articles' },
    { icon: Users, value: '10K+', label: 'Monthly Readers' },
    { icon: TrendingUp, value: '£500M+', label: 'Finance Arranged' },
    { icon: Lightbulb, value: '15+', label: 'Years Experience' },
  ];

  const categories = [
    { name: 'All Posts', count: posts.length, active: true },
    { name: 'Guides', count: posts.filter(p => p.category === 'Guides').length },
    { name: 'Vehicle Finance', count: posts.filter(p => p.category === 'Vehicle Finance').length },
    { name: 'Finance Tips', count: posts.filter(p => p.category === 'Finance Tips').length },
    { name: 'Tax & Accounting', count: posts.filter(p => p.category === 'Tax & Accounting').length },
    { name: 'Startup Finance', count: posts.filter(p => p.category === 'Startup Finance').length },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark industrial background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6b35]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#0ea5a5]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Industrial diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, #ff6b35 40px, #ff6b35 42px)`,
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
            <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </motion.nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#ff6b35]/20 text-[#ff6b35] hover:bg-[#ff6b35]/30 border-none px-4 py-1.5 text-sm font-medium">
                Trade Finance Insights
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Trade Finance{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd93d]">
                Blog
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-2xl"
            >
              Expert advice, guides, and tips to help UK tradesmen make smart finance decisions.
              Learn how to grow your business with the right funding.
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent"
        />
      </section>

      {/* Stats Bar */}
      <section className="relative py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="flex items-center gap-4 justify-center"
              >
                <div className="p-2.5 rounded-lg bg-[#ff6b35]/10">
                  <stat.icon className="w-5 h-5 text-[#ff6b35]" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="relative py-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category) => (
              <Badge
                key={category.name}
                className={`px-4 py-2 cursor-pointer transition-all ${
                  category.active
                    ? 'bg-[#ff6b35] text-white hover:bg-[#ff6b35]/90'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-16 md:py-20">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #ff6b35 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <motion.div key={post.slug} variants={fadeInUp}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full bg-gray-900/80 border-gray-800 backdrop-blur-sm transition-all duration-300 hover:border-gray-600 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ff6b35]/10 group cursor-pointer overflow-hidden">
                    {/* Top accent bar */}
                    <div
                      className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
                      style={{ backgroundColor: post.color }}
                    />

                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge
                          className="text-white border-none"
                          style={{ backgroundColor: `${post.color}20`, color: post.color }}
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-white group-hover:text-[#ff6b35] transition-colors line-clamp-2 text-lg">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 text-gray-400 mt-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(post.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readTime}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-[#ff6b35] group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

        {/* Animated orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0ea5a5]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Stay{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3]">
                Informed
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-gray-300 mb-8"
            >
              Get the latest trade finance tips and guides delivered straight to your inbox.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#0ea5a5] transition-colors flex-1 max-w-sm"
              />
              <Button
                className="bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3] text-white hover:opacity-90 px-8"
              >
                Subscribe
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Orange gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] via-[#ff8f66] to-[#ffd93d]" />

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
              Ready to Get Finance for Your Trade Business?
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-white/90 mb-8 text-lg"
            >
              Get a free, no-obligation quote today. Quick decisions, competitive rates,
              and finance tailored for tradesmen.
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
