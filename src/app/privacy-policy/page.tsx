"use client";

import Link from "next/link";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import { Shield, FileText, Lock, Eye, Users, Clock } from "lucide-react";
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

export default function PrivacyPolicyPage() {
  const summaryItems = [
    { icon: Lock, title: "Your data is secure", desc: "We use industry-standard encryption", color: "#22c55e" },
    { icon: Users, title: "We don't sell data", desc: "Your info stays with us", color: "#0ea5a5" },
    { icon: FileText, title: "You're in control", desc: "Request access or deletion anytime", color: "#ff6b35" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark industrial background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0ea5a5]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#ff6b35]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Industrial diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, #0ea5a5 40px, #0ea5a5 42px)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-sm text-white/60"
          >
            <Link href="/" className="hover:text-[#0ea5a5] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Privacy Policy</span>
          </motion.nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#0ea5a5]/20 text-[#0ea5a5] hover:bg-[#0ea5a5]/30 border-none px-4 py-1.5">
                <Shield className="h-3 w-3 mr-2" />
                Legal
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Privacy{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5a5] to-[#22d3d3]">
                Policy
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
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0ea5a5] to-transparent"
        />
      </section>

      {/* Quick Summary */}
      <section className="relative py-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gray-900/80 border-gray-800 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-[#22c55e] via-[#0ea5a5] to-[#ff6b35]" />
              <CardContent className="p-6 md:p-8">
                <motion.h2 variants={fadeInUp} className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
                  <Eye className="h-5 w-5 text-[#0ea5a5]" />
                  Quick Summary
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {summaryItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      variants={scaleIn}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <item.icon className="h-5 w-5" style={{ color: item.color }} />
                      </div>
                      <div>
                        <strong className="text-white">{item.title}</strong>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 md:py-20">
        {/* Light background for readability */}
        <div className="absolute inset-0 bg-white" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto prose prose-slate max-w-none"
          >
            <h2>1. Introduction</h2>
            <p>
              Tradesman Finance ("we", "us", "our") is committed to protecting and respecting your
              privacy. This privacy policy explains how we collect, use, and protect your personal
              information when you use our website and services.
            </p>
            <p>
              We are a data controller for the purposes of the UK General Data Protection Regulation
              (UK GDPR) and the Data Protection Act 2018.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect and process the following types of personal information:</p>

            <h3>Information You Provide</h3>
            <ul>
              <li><strong>Identity Data:</strong> Full name, date of birth, national insurance number</li>
              <li><strong>Contact Data:</strong> Email address, phone number, postal address</li>
              <li><strong>Financial Data:</strong> Bank account details, income information, credit history</li>
              <li><strong>Business Data:</strong> Company name, trading history, business address</li>
              <li><strong>Application Data:</strong> Information provided in finance applications</li>
            </ul>

            <h3>Information We Collect Automatically</h3>
            <ul>
              <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on site, click patterns</li>
              <li><strong>Cookie Data:</strong> Information collected through cookies and similar technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your personal information for the following purposes:</p>
            <ul>
              <li>To process and assess your finance applications</li>
              <li>To verify your identity and conduct credit checks</li>
              <li>To communicate with you about your application or account</li>
              <li>To provide customer support and respond to enquiries</li>
              <li>To improve our website and services</li>
              <li>To comply with legal and regulatory requirements</li>
              <li>To prevent fraud and protect our business</li>
              <li>To send marketing communications (with your consent)</li>
            </ul>

            <h2>4. Legal Basis for Processing</h2>
            <p>We process your personal data based on the following legal grounds:</p>
            <ul>
              <li><strong>Contract:</strong> To perform our contract with you (e.g., processing your finance application)</li>
              <li><strong>Legal Obligation:</strong> To comply with legal requirements (e.g., anti-money laundering checks)</li>
              <li><strong>Legitimate Interests:</strong> For our legitimate business interests (e.g., improving our services)</li>
              <li><strong>Consent:</strong> Where you have given consent (e.g., for marketing communications)</li>
            </ul>

            <h2>5. Sharing Your Information</h2>
            <p>We may share your personal information with:</p>
            <ul>
              <li><strong>Lending Partners:</strong> Finance providers and credit institutions who may fund your application</li>
              <li><strong>Credit Reference Agencies:</strong> To verify your identity and assess creditworthiness</li>
              <li><strong>Service Providers:</strong> Third parties who help us operate our business</li>
              <li><strong>Regulators:</strong> The Financial Conduct Authority and other regulatory bodies</li>
              <li><strong>Legal Advisers:</strong> Solicitors, accountants, and other professional advisers</li>
            </ul>
            <p>We will never sell your personal information to third parties for marketing purposes.</p>

            <h2>6. Credit Reference Agencies</h2>
            <p>
              When you apply for finance, we will search your credit file at one or more credit
              reference agencies (CRAs). This search will leave a "footprint" on your credit file
              that may be seen by other lenders.
            </p>
            <p>
              If your application is successful, we will share information about your account and
              repayment history with CRAs. This information may be used by other lenders to assess
              future credit applications.
            </p>

            <h2>7. Data Security</h2>
            <p>
              We take the security of your personal information seriously. We have implemented
              appropriate technical and organisational measures to protect your data, including:
            </p>
            <ul>
              <li>SSL/TLS encryption for data in transit</li>
              <li>Encrypted storage for sensitive data</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Staff training on data protection</li>
              <li>Access controls and authentication measures</li>
            </ul>

            <h2>8. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfil the purposes
              for which it was collected and to comply with legal requirements:
            </p>
            <ul>
              <li><strong>Successful applications:</strong> 6 years after the end of the agreement</li>
              <li><strong>Unsuccessful applications:</strong> 3 years from the date of application</li>
              <li><strong>Marketing data:</strong> Until you withdraw consent or 2 years of inactivity</li>
              <li><strong>Website analytics:</strong> 26 months</li>
            </ul>

            <h2>9. Your Rights</h2>
            <p>Under data protection law, you have the following rights:</p>
            <ul>
              <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data in certain circumstances</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Request your data in a machine-readable format</li>
              <li><strong>Right to Object:</strong> Object to certain types of processing</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
            </ul>
            <p>To exercise any of these rights, please contact us using the details below.</p>

            <h2>10. Cookies</h2>
            <p>
              Our website uses cookies and similar technologies. For more information, please see
              our Cookie Policy.
            </p>
            <p>You can manage your cookie preferences through your browser settings or our cookie consent tool.</p>

            <h2>11. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for
              the privacy practices of these websites. We encourage you to read the privacy
              policies of any websites you visit.
            </p>

            <h2>12. Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for individuals under 18 years of age. We do not
              knowingly collect personal information from children.
            </p>

            <h2>13. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any
              significant changes by posting the new policy on our website and updating the
              &quot;Last updated&quot; date.
            </p>

            <h2>14. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data practices, please
              contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:privacy@tradesmanfinance.co.uk">privacy@tradesmanfinance.co.uk</a></li>
              <li><strong>Post:</strong> Data Protection Officer, Tradesman Finance, Finance House, Business Park, London EC1A 1BB</li>
              <li><strong>Phone:</strong> 0800 XXX XXXX</li>
            </ul>

            <h2>15. Complaints</h2>
            <p>
              If you are unhappy with how we have handled your personal information, you have the
              right to lodge a complaint with the Information Commissioner&apos;s Office (ICO):
            </p>
            <ul>
              <li><strong>Website:</strong> <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
              <li><strong>Phone:</strong> 0303 123 1113</li>
            </ul>
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
            <Link href="/terms" className="text-gray-400 hover:text-[#0ea5a5] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-[#0ea5a5] transition-colors">
              Accessibility Statement
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-[#0ea5a5] transition-colors">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
