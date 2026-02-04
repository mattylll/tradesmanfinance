"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Award,
  Shield,
  Star,
  Clock,
  CheckCircle,
  Linkedin,
  ArrowRight,
  ChevronUp,
  Building2,
  Briefcase,
  GraduationCap,
  Phone,
  Zap,
} from "lucide-react";
import { Button } from "@/registry/new-york-v4/ui/button";
import { authors, companyCredentials, trustSignals, type Author } from "@/data/authors";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// Team member card component
function TeamMemberCard({ author, featured = false }: { author: Author; featured?: boolean }) {
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
      className={featured ? "lg:col-span-2" : ""}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full"
      >
        {/* Glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            featured
              ? "from-[#ff6b35]/30 to-[#ffd93d]/20"
              : "from-[#ff6b35]/20 to-transparent"
          } opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-500`}
        />

        {/* Card */}
        <div
          className={`relative bg-white border-2 ${
            featured ? "border-[#ff6b35]/30" : "border-gray-200"
          } rounded-2xl p-6 md:p-8 h-full transition-all duration-300 group-hover:border-[#ff6b35] group-hover:shadow-xl`}
        >
          {/* Featured badge */}
          {featured && (
            <div className="absolute -top-3 left-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ffd93d] text-white text-xs font-bold shadow-lg">
                <Star className="h-3 w-3" />
                Founder
              </span>
            </div>
          )}

          <div className={featured ? "flex flex-col lg:flex-row lg:gap-8" : ""}>
            {/* Photo placeholder */}
            <div className={featured ? "lg:flex-shrink-0 mb-6 lg:mb-0" : "mb-6"}>
              <div
                className={`relative ${
                  featured ? "w-32 h-32 lg:w-40 lg:h-40" : "w-24 h-24"
                } mx-auto lg:mx-0`}
              >
                {/* Background ring */}
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ffd93d] ${
                    featured ? "p-1" : "p-0.5"
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                    <span
                      className={`${
                        featured ? "text-3xl lg:text-4xl" : "text-2xl"
                      } font-bold text-[#ff6b35]`}
                    >
                      {initials}
                    </span>
                  </div>
                </div>

                {/* Experience badge */}
                <div
                  className={`absolute ${
                    featured ? "-bottom-2 -right-2" : "-bottom-1 -right-1"
                  } bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg`}
                >
                  {author.experience}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={featured ? "flex-1" : ""}>
              {/* Name and role */}
              <div className="text-center lg:text-left mb-4">
                <h3
                  className={`font-bold text-gray-900 ${
                    featured ? "text-2xl lg:text-3xl" : "text-xl"
                  } mb-1 group-hover:text-[#ff6b35] transition-colors`}
                >
                  {author.name}
                </h3>
                <p className="text-[#ff6b35] font-semibold">{author.role}</p>
              </div>

              {/* Bio */}
              <p
                className={`text-gray-600 leading-relaxed mb-6 text-center lg:text-left ${
                  featured ? "" : "text-sm line-clamp-4"
                }`}
              >
                {featured ? author.bio : author.shortBio}
              </p>

              {/* Credentials */}
              {featured && author.credentials.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#ff6b35]" />
                    Career Highlights
                  </h4>
                  <div className="space-y-2">
                    {author.credentials.map((credential, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{credential}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expertise tags */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {author.expertise.slice(0, featured ? 9 : 4).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* LinkedIn link for Matt */}
              {author.linkedIn && (
                <div className="flex justify-center lg:justify-start">
                  <a
                    href={author.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0077b5] hover:text-[#005885] transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    Connect on LinkedIn
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )}

              {/* Non-featured credentials preview */}
              {!featured && author.credentials.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {author.credentials.slice(0, 2).map((credential, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-gray-500 flex items-center gap-1"
                      >
                        <Award className="h-3 w-3 text-[#ff6b35]" />
                        {credential}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Back to top button component
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/30 flex items-center justify-center hover:bg-[#e55a2b] transition-colors"
      aria-label="Back to top"
    >
      <ChevronUp className="h-6 w-6" />
    </motion.button>
  );
}

export function TeamPageContent() {
  const mattLenzie = authors["matt-lenzie"];
  const jamesHarper = authors["james-harper"];
  const sarahMitchell = authors["sarah-mitchell"];
  const teamGeneral = authors["tradesman-finance-team"];

  const trustStats = [
    {
      icon: Clock,
      value: "25+",
      label: "Years Experience",
      description: "In financial services",
    },
    {
      icon: Users,
      value: trustSignals.customersHelped,
      label: "Customers Helped",
      description: "Tradesmen funded",
    },
    {
      icon: Building2,
      value: trustSignals.fundingArranged,
      label: "Funding Arranged",
      description: "For UK businesses",
    },
    {
      icon: Star,
      value: `${trustSignals.averageRating}`,
      label: "Trustpilot Rating",
      description: `${trustSignals.reviewCount}+ reviews`,
    },
  ];

  return (
    <div>
      {/* === HERO SECTION === */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Diagonal lines pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              #ff6b35 0px,
              #ff6b35 1px,
              transparent 1px,
              transparent 40px
            )`,
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(#fff 1px, transparent 1px),
              linear-gradient(90deg, #fff 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Accent glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#ffd93d]/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Users className="h-4 w-4 text-[#ff6b35]" />
              <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">
                Finance Specialists
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd93d]">
                Expert Team
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Decades of experience in financial services. We understand
              tradesmen because we have worked with them for over 25 years.
            </p>

            {/* Trust stats row */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
            >
              {trustStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 text-center group hover:border-[#ff6b35]/40 transition-colors">
                    <stat.icon className="h-6 w-6 text-[#ff6b35] mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-gray-300 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500">{stat.description}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === FEATURED TEAM MEMBER (Matt Lenzie) === */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-gray-100 to-white">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#000 1px, transparent 1px),
              linear-gradient(90deg, #000 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top decorative border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 mb-6">
              <Briefcase className="h-4 w-4 text-[#ff6b35]" />
              <span className="text-sm font-medium text-[#ff6b35] tracking-wide uppercase">
                Leadership
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Meet Our <span className="text-[#ff6b35]">Founder</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              25 years of experience across major UK financial institutions, now
              helping tradesmen access the funding they need.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <TeamMemberCard author={mattLenzie} featured={true} />
          </motion.div>
        </div>
      </section>

      {/* === TEAM MEMBERS === */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 107, 53, 0.4) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Users className="h-4 w-4 text-[#ffd93d]" />
              <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">
                Our Specialists
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Finance <span className="text-[#ffd93d]">Experts</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our team of specialists brings decades of experience in equipment
              finance, vehicle finance, and business lending.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
          >
            <TeamMemberCard author={jamesHarper} />
            <TeamMemberCard author={sarahMitchell} />
          </motion.div>
        </div>
      </section>

      {/* === COMPANY CREDENTIALS === */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-white">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#000 1px, transparent 1px),
              linear-gradient(90deg, #000 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5a5]/10 border border-[#0ea5a5]/20 mb-6">
              <Shield className="h-4 w-4 text-[#0ea5a5]" />
              <span className="text-sm font-medium text-[#0ea5a5] tracking-wide uppercase">
                Trust & Compliance
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Our <span className="text-[#0ea5a5]">Credentials</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We are fully regulated and committed to maintaining the highest
              standards of professional conduct.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto"
          >
            {companyCredentials.map((credential, index) => (
              <motion.div
                key={credential.name}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full"
                >
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 h-full hover:border-[#0ea5a5] transition-colors text-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0ea5a5] to-[#14b8a6] flex items-center justify-center mx-auto mb-4">
                      {credential.icon === "award" && (
                        <Award className="h-7 w-7 text-white" />
                      )}
                      {credential.icon === "lock" && (
                        <Shield className="h-7 w-7 text-white" />
                      )}
                      {credential.icon === "check-shield" && (
                        <CheckCircle className="h-7 w-7 text-white" />
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {credential.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {credential.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === THE TEAM ETHOS === */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" />

        {/* Accent glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Zap className="h-4 w-4 text-[#ff6b35]" />
                <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">
                  Our Approach
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight"
                style={{ fontFamily: "var(--font-industrial)" }}
              >
                Built for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd93d]">
                  Tradesmen
                </span>
              </h2>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {teamGeneral.bio}
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Specialists in trade and construction finance",
                  "Direct relationships with 50+ lenders",
                  "Same-day decisions on most applications",
                  "No hidden fees or surprises",
                  "Personal service from application to completion",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff6b35]/20 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-[#ff6b35]" />
                    </div>
                    <span className="text-gray-300 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Stats card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={scaleIn}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Shadow glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#ff6b35]/20 to-[#ffd93d]/10 rounded-3xl blur-2xl opacity-50" />

              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Why Choose Us?
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-3xl font-black text-[#ff6b35] mb-2">
                      {trustSignals.approvalRate}
                    </div>
                    <div className="text-sm text-gray-400">Approval Rate</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-3xl font-black text-[#ffd93d] mb-2">
                      {trustSignals.decisionTime}
                    </div>
                    <div className="text-sm text-gray-400">Decision Time</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-3xl font-black text-[#0ea5a5] mb-2">
                      {trustSignals.lenderPanel}
                    </div>
                    <div className="text-sm text-gray-400">Lender Panel</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-3xl font-black text-white mb-2">
                      {trustSignals.yearsInBusiness}+
                    </div>
                    <div className="text-sm text-gray-400">Years Trading</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] via-[#ff8f5a] to-[#ffd93d]" />

        {/* Animated dot pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white/20 rotate-45" />

        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-industrial)" }}
            >
              Ready to Talk to Our Team?
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Get in touch with our finance specialists today. We are here to
              help you find the right funding solution for your trade business.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.4 }}>
              <Link href="/#quote-form">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="bg-gray-900 text-white hover:bg-gray-800 font-bold text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-3xl transition-all"
                  >
                    Get Your Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ duration: 0.4 }}>
              <a href="tel:08001234567">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/80 bg-white/10 text-white hover:bg-white/20 font-bold text-lg px-10 py-7 rounded-xl backdrop-blur-sm"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call 0800 123 4567
                  </Button>
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}
