"use client";

import Link from "next/link";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card";
import {
  Accessibility,
  Eye,
  Keyboard,
  Monitor,
  Volume2,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

const lastUpdated = "January 2025";

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

const accessibilityFeatures = [
  {
    icon: Eye,
    title: "Visual Accessibility",
    color: "#ff6b35",
    features: [
      "High contrast colour schemes",
      "Resizable text up to 200%",
      "Alt text on all images",
      "Clear visual hierarchy",
      "No reliance on colour alone for information",
    ],
  },
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    color: "#0ea5a5",
    features: [
      "All functionality accessible via keyboard",
      "Visible focus indicators",
      "Skip navigation links",
      "Logical tab order",
      "No keyboard traps",
    ],
  },
  {
    icon: Volume2,
    title: "Screen Reader Support",
    color: "#8b5cf6",
    features: [
      "Semantic HTML structure",
      "ARIA labels where needed",
      "Descriptive link text",
      "Form field labels",
      "Error message announcements",
    ],
  },
  {
    icon: Monitor,
    title: "Responsive Design",
    color: "#ffd93d",
    features: [
      "Mobile-friendly interface",
      "Readable at all screen sizes",
      "Touch-friendly controls",
      "Portrait and landscape support",
      "Works on all modern devices",
    ],
  },
];

const knownIssues = [
  {
    issue: "Some PDF documents may not be fully accessible",
    workaround: "Contact us for alternative formats",
    status: "In progress",
  },
  {
    issue: "Calculator may have limited screen reader support",
    workaround: "Call us for assistance with calculations",
    status: "Under review",
  },
];

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark industrial background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#22c55e]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#0ea5a5]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Industrial diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, #22c55e 40px, #22c55e 42px)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-sm text-white/60"
          >
            <Link href="/" className="hover:text-[#22c55e] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Accessibility</span>
          </motion.nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#22c55e]/20 text-[#22c55e] hover:bg-[#22c55e]/30 border-none px-4 py-1.5">
                <Accessibility className="h-3 w-3 mr-2" />
                Accessibility
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Accessibility{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80]">
                Statement
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-gray-400"
            >
              Last updated: {lastUpdated}
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#22c55e] to-transparent"
        />
      </section>

      {/* Commitment Statement */}
      <section className="relative py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gray-900/80 border-gray-800 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-[#22c55e] to-[#4ade80]" />
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4">
                  <Accessibility className="h-8 w-8 text-[#22c55e]" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-industrial)' }}>
                  Our Commitment
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Tradesman Finance is committed to ensuring digital accessibility for people
                  with disabilities. We continually work to improve the user experience for
                  everyone and apply relevant accessibility standards.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="relative py-16">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold mb-6 text-white"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Conformance{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80]">
                Status
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 mb-8">
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers
              and developers to improve accessibility for people with disabilities. We aim to
              conform to WCAG 2.1 level AA, the internationally recognised standard for web
              accessibility.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-4 mb-8"
            >
              <motion.div variants={scaleIn}>
                <Card className="bg-green-900/30 border-green-700/50">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="font-bold text-white">WCAG 2.1</div>
                    <div className="text-sm text-gray-400">Level A</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={scaleIn}>
                <Card className="bg-green-900/30 border-green-700/50">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="font-bold text-white">WCAG 2.1</div>
                    <div className="text-sm text-gray-400">Level AA</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={scaleIn}>
                <Card className="bg-amber-900/30 border-amber-700/50">
                  <CardContent className="p-4 text-center">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                    <div className="font-bold text-white">WCAG 2.1</div>
                    <div className="text-sm text-gray-400">Level AAA (Partial)</div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #22c55e 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-8 text-center text-white"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Accessibility{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd93d]">
                Features
              </span>
            </h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              {accessibilityFeatures.map((category) => (
                <motion.div key={category.title} variants={fadeInUp}>
                  <Card className="h-full bg-gray-900/80 border-gray-800 overflow-hidden">
                    <div className="h-1 w-full" style={{ backgroundColor: category.color }} />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg text-white">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${category.color}15` }}
                        >
                          <category.icon className="h-5 w-5" style={{ color: category.color }} />
                        </div>
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Browser Support */}
      <section className="relative py-16">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold mb-6 text-white"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Compatibility
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 mb-8">
              Our website is designed to be compatible with the following assistive technologies:
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeInUp}>
                <h3 className="font-bold mb-4 text-white">Screen Readers</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>NVDA on Windows</li>
                  <li>JAWS on Windows</li>
                  <li>VoiceOver on macOS and iOS</li>
                  <li>TalkBack on Android</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <h3 className="font-bold mb-4 text-white">Browsers</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Chrome (latest 2 versions)</li>
                  <li>Firefox (latest 2 versions)</li>
                  <li>Safari (latest 2 versions)</li>
                  <li>Edge (latest 2 versions)</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Known Issues */}
      <section className="relative py-16 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold mb-6 text-white"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Known{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                Limitations
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 mb-8">
              While we strive to ensure accessibility of our website, there may be some
              limitations. Below are known accessibility issues we are actively working to address:
            </motion.p>

            <div className="space-y-4">
              {knownIssues.map((item, index) => (
                <motion.div key={item.issue} variants={fadeInUp}>
                  <Card className="bg-gray-900/80 border-gray-800 overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-amber-600" />
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{item.issue}</p>
                          <p className="text-sm text-gray-400 mt-1">
                            <strong>Workaround:</strong> {item.workaround}
                          </p>
                        </div>
                        <Badge className="bg-amber-500/20 text-amber-400 border-none">
                          {item.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="relative py-16">
        {/* Light background for readability */}
        <div className="absolute inset-0 bg-white" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Tips for Using Our Website</h2>
            <div className="prose prose-slate max-w-none">
              <h3>Keyboard Navigation</h3>
              <ul>
                <li>Use <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Tab</kbd> to move forward through interactive elements</li>
                <li>Use <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Shift + Tab</kbd> to move backward</li>
                <li>Use <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Enter</kbd> or <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Space</kbd> to activate buttons and links</li>
                <li>Use arrow keys to navigate within menus and forms</li>
                <li>Press <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Escape</kbd> to close modals and popups</li>
              </ul>

              <h3>Adjusting Text Size</h3>
              <ul>
                <li>Use <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Ctrl/Cmd + Plus</kbd> to increase text size</li>
                <li>Use <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Ctrl/Cmd + Minus</kbd> to decrease text size</li>
                <li>Use <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Ctrl/Cmd + 0</kbd> to reset to default size</li>
              </ul>

              <h3>High Contrast Mode</h3>
              <p>
                You can enable high contrast mode in your operating system settings or use
                browser extensions for enhanced contrast.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Green gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e] via-[#16a34a] to-[#15803d]" />

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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-white/90" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Feedback
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            >
              We welcome your feedback on the accessibility of our website. If you encounter
              any barriers or have suggestions for improvement, please let us know.
            </motion.p>

            <motion.div
              variants={scaleIn}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto"
            >
              <h3 className="font-bold mb-4 text-white">Contact Us</h3>
              <p className="text-sm text-white/90 mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:accessibility@tradesmanfinance.co.uk" className="underline hover:text-white">
                  accessibility@tradesmanfinance.co.uk
                </a>
              </p>
              <p className="text-sm text-white/90 mb-2">
                <strong>Phone:</strong> 0800 XXX XXXX
              </p>
              <p className="text-sm text-white/90">
                <strong>Response Time:</strong> Within 5 business days
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="relative py-10 overflow-hidden">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm"
          >
            <Link href="/privacy-policy" className="text-gray-400 hover:text-[#22c55e] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-[#22c55e] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-[#22c55e] transition-colors">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
