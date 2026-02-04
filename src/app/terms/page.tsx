"use client";

import Link from "next/link";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import { FileText, AlertCircle, Scale } from "lucide-react";
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

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark industrial background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8b5cf6]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#ff6b35]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Industrial diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, #8b5cf6 40px, #8b5cf6 42px)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-sm text-white/60"
          >
            <Link href="/" className="hover:text-[#8b5cf6] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Terms & Conditions</span>
          </motion.nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#8b5cf6]/20 text-[#8b5cf6] hover:bg-[#8b5cf6]/30 border-none px-4 py-1.5">
                <Scale className="h-3 w-3 mr-2" />
                Legal
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-industrial)' }}
            >
              Terms &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa]">
                Conditions
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
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent"
        />
      </section>

      {/* Important Notice */}
      <section className="relative py-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-amber-900/30 border-amber-700/50 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-amber-600" />
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-amber-500/20">
                    <AlertCircle className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg mb-2 text-white">Important Notice</h2>
                    <p className="text-amber-200/80">
                      Please read these terms carefully before using our website or services.
                      By using our website, you agree to be bound by these terms. If you do not
                      agree to these terms, please do not use our website or services.
                    </p>
                  </div>
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
            <h2>1. About Us</h2>
            <p>
              Tradesman Finance is a trading name of [Company Name] Limited, a company registered
              in England and Wales with company number [XXXXXXXX]. Our registered office is at
              Finance House, Business Park, London EC1A 1BB.
            </p>
            <p>
              We specialize in non-regulated business finance for trade companies across the UK.
              Our team has over 25 years of combined experience in financial services, helping
              thousands of tradesmen access the equipment finance, vehicle finance, and business
              loans they need to grow their businesses.
            </p>

            <h2>2. Our Services</h2>
            <p>
              Tradesman Finance acts as a credit broker, not a lender. We help connect tradesmen
              and contractors with finance providers who may be able to offer:
            </p>
            <ul>
              <li>Equipment finance and leasing</li>
              <li>Van and vehicle finance</li>
              <li>Business loans</li>
              <li>Working capital facilities</li>
            </ul>
            <p>
              We do not guarantee that we will be able to find a suitable finance product for
              your circumstances. Any finance agreement will be between you and the lender, not
              with Tradesman Finance.
            </p>

            <h2>3. Website Use</h2>
            <h3>3.1 Permitted Use</h3>
            <p>You may use our website for lawful purposes only. You agree not to:</p>
            <ul>
              <li>Use the website in any way that breaches applicable laws or regulations</li>
              <li>Use the website to transmit harmful, offensive, or illegal content</li>
              <li>Attempt to gain unauthorised access to our systems</li>
              <li>Use automated systems to scrape or copy website content</li>
              <li>Interfere with the proper functioning of the website</li>
            </ul>

            <h3>3.2 Account Registration</h3>
            <p>
              If you create an account on our website, you are responsible for maintaining the
              confidentiality of your login credentials and for all activities under your account.
            </p>

            <h2>4. Finance Applications</h2>
            <h3>4.1 Application Process</h3>
            <p>When you submit a finance application through our website:</p>
            <ul>
              <li>You confirm that all information provided is accurate and complete</li>
              <li>You authorise us to share your information with potential lenders</li>
              <li>You consent to credit checks being performed on you</li>
              <li>You understand that submitting an application does not guarantee approval</li>
            </ul>

            <h3>4.2 Credit Checks</h3>
            <p>
              We may perform a &quot;soft&quot; credit check during the initial assessment, which will not
              affect your credit score. If you proceed with a full application, the lender may
              perform a &quot;hard&quot; credit check, which will be visible to other lenders.
            </p>

            <h3>4.3 Lender Decisions</h3>
            <p>
              All lending decisions are made solely by the lender, not by Tradesman Finance.
              We have no control over whether your application is approved, the terms offered,
              or the interest rate applied.
            </p>

            <h2>5. Fees and Charges</h2>
            <h3>5.1 Our Fees</h3>
            <p>
              Tradesman Finance does not charge you any fees for using our broker services.
              We may receive a commission from lenders when a finance agreement is completed.
              This commission does not affect the rate you pay.
            </p>

            <h3>5.2 Lender Fees</h3>
            <p>
              Lenders may charge various fees including arrangement fees, early repayment
              charges, and late payment fees. These will be disclosed in the finance agreement
              before you sign.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, and software, is
              the property of Tradesman Finance or our licensors and is protected by copyright
              and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, or create derivative works from our content
              without our written permission.
            </p>

            <h2>7. Disclaimers</h2>
            <h3>7.1 Information Accuracy</h3>
            <p>
              While we strive to keep our website content accurate and up-to-date, we do not
              guarantee that all information is complete, accurate, or current. Any reliance
              you place on such information is at your own risk.
            </p>

            <h3>7.2 Website Availability</h3>
            <p>
              We do not guarantee that our website will be available at all times or free from
              errors or viruses. We may suspend, withdraw, or restrict access to the website
              at any time without notice.
            </p>

            <h3>7.3 Financial Advice</h3>
            <p>
              The information on our website is general in nature and does not constitute
              financial advice. You should seek independent financial advice before entering
              into any finance agreement.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Tradesman Finance shall not be liable for:</p>
            <ul>
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Loss of profits, business, or anticipated savings</li>
              <li>Loss of data or corruption of data</li>
              <li>Any loss arising from your use of or inability to use our website</li>
              <li>Actions or decisions of third-party lenders</li>
            </ul>
            <p>
              Nothing in these terms excludes our liability for death or personal injury
              caused by our negligence, fraud, or any other liability that cannot be
              excluded by law.
            </p>

            <h2>9. Indemnity</h2>
            <p>
              You agree to indemnify and hold harmless Tradesman Finance, its directors,
              employees, and agents from any claims, damages, or expenses arising from:
            </p>
            <ul>
              <li>Your breach of these terms</li>
              <li>Your use of our website or services</li>
              <li>Any inaccurate information you provide</li>
              <li>Your violation of any third party&apos;s rights</li>
            </ul>

            <h2>10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. These links are provided
              for convenience only. We have no control over third-party websites and accept
              no responsibility for their content or privacy practices.
            </p>

            <h2>11. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link> to understand how we collect,
              use, and protect your personal information.
            </p>

            <h2>12. Complaints</h2>
            <p>
              If you have a complaint about our services, please contact us in the first
              instance. We have an internal complaints procedure and will acknowledge your
              complaint within 5 business days.
            </p>
            <p>
              If you are not satisfied with our response, you may be able to refer your
              complaint to the Financial Ombudsman Service:
            </p>
            <ul>
              <li><strong>Website:</strong> <a href="https://financial-ombudsman.org.uk" target="_blank" rel="noopener noreferrer">financial-ombudsman.org.uk</a></li>
              <li><strong>Phone:</strong> 0800 023 4567</li>
            </ul>

            <h2>13. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Changes will be effective when
              posted on our website. Your continued use of our website after changes are
              posted constitutes acceptance of the updated terms.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These terms are governed by the laws of England and Wales. Any disputes will
              be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>

            <h2>15. Severability</h2>
            <p>
              If any provision of these terms is found to be invalid or unenforceable, the
              remaining provisions will continue in full force and effect.
            </p>

            <h2>16. Contact Us</h2>
            <p>If you have any questions about these terms, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:legal@tradesmanfinance.co.uk">legal@tradesmanfinance.co.uk</a></li>
              <li><strong>Post:</strong> Tradesman Finance, Finance House, Business Park, London EC1A 1BB</li>
              <li><strong>Phone:</strong> 0800 XXX XXXX</li>
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
            <Link href="/privacy-policy" className="text-gray-400 hover:text-[#8b5cf6] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-[#8b5cf6] transition-colors">
              Accessibility Statement
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-[#8b5cf6] transition-colors">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
