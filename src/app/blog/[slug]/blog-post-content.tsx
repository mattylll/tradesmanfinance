"use client";

import Link from 'next/link';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent } from '@/registry/new-york-v4/ui/card';
import { ArrowRight, ArrowLeft, Calendar, Clock, User, CheckCircle, Share2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogPost, BlogPostContent as BlogPostContentType } from '@/data/blog-posts';
import { getDefaultAuthor } from '@/data/authors';
import { AuthorBio } from '@/components/seo/author-bio';

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

interface BlogPostPageContentProps {
  post: BlogPost;
  content: BlogPostContentType;
  relatedPosts: BlogPost[];
}

export function BlogPostPageContent({ post, content, relatedPosts }: BlogPostPageContentProps) {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Dark industrial background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6b35]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#0ea5a5]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Industrial diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, #ff6b35 40px, #ff6b35 42px)`,
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
            <Link href="/blog" className="hover:text-[#ff6b35] transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{post.category}</span>
          </motion.nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                className="mb-6 border-none px-4 py-1.5 text-sm font-medium"
                style={{ backgroundColor: `${post.color}20`, color: post.color }}
              >
                {post.category}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-6 text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ffd93d] flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#ff6b35]" />
                {new Date(post.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#ff6b35]" />
                {post.readTime}
              </div>
            </motion.div>
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

      {/* Article Content */}
      <article className="relative py-12 md:py-16">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 mb-10 leading-relaxed"
            >
              {post.excerpt}
            </motion.p>

            {/* Separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10"
            />

            {/* Key Takeaways */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-gray-900/80 border-gray-800 mb-12 overflow-hidden">
                <div className="h-1 w-full" style={{ backgroundColor: post.color }} />
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                    <CheckCircle className="h-5 w-5" style={{ color: post.color }} />
                    Key Takeaways
                  </h2>
                  <ul className="space-y-3">
                    {content.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content Sections */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {content.sections.map((section, index) => (
                <motion.section key={index} variants={fadeInUp} className="mb-12">
                  <h2
                    className="text-2xl font-bold mb-4 text-white"
                    style={{ fontFamily: 'var(--font-industrial)' }}
                  >
                    {section.heading}
                  </h2>
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-400 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </motion.section>
              ))}
            </motion.div>

            {/* Separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-12"
            />

            {/* Share & Bookmark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-12"
            >
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                <Bookmark className="h-4 w-4 mr-2" />
                Save for Later
              </Button>
            </motion.div>

            {/* About the Author - E-E-A-T Signal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-lg font-semibold text-white mb-4">About the Author</h3>
              <AuthorBio author={getDefaultAuthor()} />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-[#ff6b35] via-[#ff8f66] to-[#ffd93d] border-none overflow-hidden">
                <CardContent className="p-8 text-center relative">
                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 22px)`,
                    }}
                  />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-industrial)' }}>
                      Need Equipment Finance for Your Trade Business?
                    </h3>
                    <p className="mb-6 text-white/90">
                      Get a free, no-obligation quote. Quick decisions, competitive rates.
                    </p>
                    <Link href="/contact">
                      <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
                        Get Your Free Quote
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="relative py-16 overflow-hidden">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-8 text-white"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Related{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd93d]">
                Articles
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 max-w-3xl"
          >
            {relatedPosts.map((relatedPost) => (
              <motion.div key={relatedPost.slug} variants={fadeInUp}>
                <Link href={`/blog/${relatedPost.slug}`}>
                  <Card className="h-full bg-gray-900/80 border-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group overflow-hidden">
                    <div className="h-1 w-full" style={{ backgroundColor: relatedPost.color }} />
                    <CardContent className="p-6">
                      <Badge
                        className="mb-3 border-none"
                        style={{ backgroundColor: `${relatedPost.color}20`, color: relatedPost.color }}
                      >
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-semibold mb-2 line-clamp-2 text-white group-hover:text-[#ff6b35] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {relatedPost.excerpt}
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
            className="mt-10"
          >
            <Link href="/blog">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
