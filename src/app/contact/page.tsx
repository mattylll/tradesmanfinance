"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/forms";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  HelpCircle,
  FileText,
  Building2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

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

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    detail: "0800 XXX XXXX",
    subDetail: "Mon-Fri, 9am-6pm",
    action: "tel:0800XXXXXXX",
    color: "#ff6b35",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "We'll respond within 24 hours",
    detail: "hello@tradesmanfinance.co.uk",
    subDetail: "24/7 support inbox",
    action: "mailto:hello@tradesmanfinance.co.uk",
    color: "#0ea5a5",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Quick answers to your questions",
    detail: "Chat with our team",
    subDetail: "Available Mon-Fri, 9am-6pm",
    action: "#chat",
    color: "#6366f1",
  },
];

const faqs = [
  {
    question: "How quickly can I get a decision?",
    answer:
      "We typically provide a decision within 24 hours of receiving your completed application. For straightforward applications, we can often give an in-principle decision on the same day.",
  },
  {
    question: "What documents do I need?",
    answer:
      "You'll need proof of identity, 3 months of bank statements, and details of your business trading history. For equipment finance, we'll also need a quote for the equipment you want to purchase.",
  },
  {
    question: "Can I apply if I have bad credit?",
    answer:
      "Yes, we consider applications from tradesmen with all credit profiles. We look at the whole picture, including your business performance and ability to repay, not just your credit score.",
  },
  {
    question: "Are there any upfront fees?",
    answer:
      "No, we don't charge any application fees or upfront costs. You only pay once your finance is approved and you've accepted the terms.",
  },
];

const offices = [
  {
    name: "Head Office",
    address: "Finance House, Business Park",
    city: "London, EC1A 1BB",
    phone: "0800 XXX XXXX",
  },
  {
    name: "Northern Office",
    address: "Trade Centre, Industrial Estate",
    city: "Manchester, M1 1AA",
    phone: "0161 XXX XXXX",
  },
];

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section - Dark Industrial */}
      <section className="relative py-20 md:py-28 overflow-hidden">
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
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/15 border border-[#ff6b35]/20 px-5 py-2 text-sm font-semibold backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4" />
                Get in Touch
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              <span className="text-white">We're Here to </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] via-[#ffd93d] to-[#ff6b35]">
                Help
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 leading-relaxed"
            >
              Have questions about finance for your trade business? Our friendly team is ready
              to help you find the right solution. Get in touch today.
            </motion.p>
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

      {/* Contact Methods - Dark */}
      <section className="relative py-12 bg-gray-900/80 border-y border-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {contactMethods.map((method) => (
              <motion.a
                key={method.title}
                href={method.action}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="block group"
              >
                <div className="h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 text-center hover:border-gray-700 transition-all">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${method.color}15` }}
                  >
                    <method.icon className="h-7 w-7" style={{ color: method.color }} />
                  </motion.div>
                  <h3 className="font-bold text-lg text-white mb-1">{method.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{method.description}</p>
                  <p className="font-semibold" style={{ color: method.color }}>{method.detail}</p>
                  <p className="text-xs text-gray-600">{method.subDetail}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content - Form & Info */}
      <section className="relative py-16 overflow-hidden">
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
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form - Light for better visibility */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-industrial)' }}>
                Send Us a <span className="text-[#ff6b35]">Message</span>
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <ContactForm />
              </div>
            </motion.div>

            {/* Side Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {/* Business Hours */}
              <motion.div variants={fadeInRight}>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                    <Clock className="h-5 w-5 text-[#ff6b35]" />
                    Business Hours
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monday - Friday</span>
                      <span className="font-medium text-white">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Saturday</span>
                      <span className="font-medium text-white">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sunday</span>
                      <span className="text-gray-600">Closed</span>
                    </div>
                    <p className="text-sm text-gray-500 pt-2 border-t border-gray-800">
                      We aim to respond to all enquiries within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={fadeInRight}>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                    <HelpCircle className="h-5 w-5 text-[#ff6b35]" />
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/trades"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/15 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-[#ff6b35]" />
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-[#ff6b35] transition-colors">Apply for Finance</div>
                        <div className="text-sm text-gray-500">Get a quote in minutes</div>
                      </div>
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#0ea5a5]/15 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-[#0ea5a5]" />
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-[#0ea5a5] transition-colors">About Us</div>
                        <div className="text-sm text-gray-500">Learn about our company</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Office Locations */}
              <motion.div variants={fadeInRight}>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                    <MapPin className="h-5 w-5 text-[#ff6b35]" />
                    Our Offices
                  </h3>
                  <div className="space-y-4">
                    {offices.map((office) => (
                      <div key={office.name} className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                        <h4 className="font-medium text-white mb-1">{office.name}</h4>
                        <p className="text-sm text-gray-400">{office.address}</p>
                        <p className="text-sm text-gray-400">{office.city}</p>
                        <p className="text-sm text-[#ff6b35] mt-2">{office.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Dark */}
      <section className="relative py-16 overflow-hidden">
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
              <Badge className="mb-4 bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20 px-4 py-1.5 text-sm font-semibold">
                FAQs
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Common <span className="text-[#ff6b35]">Questions</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Find quick answers to the questions we hear most often.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-800/30 transition-colors"
                  >
                    <h3 className="font-bold text-white pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-[#ff6b35] flex-shrink-0 transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFaq === index ? 'auto' : 0,
                      opacity: expandedFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map Section - Dark Placeholder */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative h-[400px] bg-gray-900 border-t border-gray-800/50"
      >
        {/* Dot pattern for map placeholder */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, #ff6b35 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-2xl bg-[#ff6b35]/15 flex items-center justify-center mx-auto mb-4"
            >
              <MapPin className="h-10 w-10 text-[#ff6b35]" />
            </motion.div>
            <p className="text-gray-500">Interactive map coming soon</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
