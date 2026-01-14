"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { ArrowRight, Phone, CheckCircle, Sparkles } from "lucide-react";

interface BrightHeroProps {
  title: string;
  highlightWord?: string;
  description: string;
  badge?: string;
  imageSrc?: string;
  imageAlt?: string;
  showStats?: boolean;
  stats?: {
    label: string;
    value: string;
    icon?: string;
  }[];
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href?: string;
    phone?: string;
  };
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
  variant?: "default" | "centered" | "image-left";
}

const defaultStats = [
  { label: "Funded to UK Trades", value: "£50M+", icon: "💷" },
  { label: "Tradesmen Helped", value: "50,000+", icon: "👷" },
  { label: "Decision Time", value: "24 Hrs", icon: "⚡" },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export function BrightHero({
  title,
  highlightWord,
  description,
  badge,
  imageSrc,
  imageAlt = "Hero image",
  showStats = true,
  stats = defaultStats,
  primaryCTA = { text: "Get Your Free Quote", href: "/contact" },
  secondaryCTA = { text: "0800 XXX XXXX", phone: "tel:0800000000" },
  breadcrumbs,
  variant = "default",
}: BrightHeroProps) {
  // Split title to highlight a word
  const renderTitle = () => {
    if (!highlightWord) {
      return <span>{title}</span>;
    }

    const parts = title.split(new RegExp(`(${highlightWord})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlightWord.toLowerCase() ? (
            <span key={index} className="text-[#ff6b35]">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  if (variant === "centered") {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fafaf8] to-white py-20 md:py-28">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ff6b35 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {badge && (
              <motion.div variants={fadeInUp}>
                <Badge className="mb-6 bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/15 border-none px-4 py-1.5 text-sm font-medium">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  {badge}
                </Badge>
              </motion.div>
            )}

            <motion.h1
              variants={fadeInUp}
              className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight text-[#1f2937] md:text-5xl lg:text-6xl"
            >
              {renderTitle()}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mb-10 max-w-2xl text-lg text-[#6b7280] md:text-xl leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Link href={primaryCTA.href}>
                <Button
                  size="lg"
                  className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-[0_4px_14px_rgba(255,107,53,0.25)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.35)] hover:-translate-y-0.5 transition-all"
                >
                  {primaryCTA.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {secondaryCTA.phone && (
                <a href={secondaryCTA.phone}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#e5e7eb] text-[#1f2937] hover:bg-[#fafaf8] font-semibold text-lg px-8 py-6 rounded-xl"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    {secondaryCTA.text}
                  </Button>
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fafaf8] via-white to-[#fafaf8]">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ff6b35 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative gradient blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#ff6b35]/10 to-[#ffd93d]/5 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-[#0ea5a5]/5 to-[#ff6b35]/5 rounded-full blur-3xl"
      />

      <div className="container relative mx-auto px-4 py-16 lg:py-24">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 text-sm"
          >
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-[#6b7280] transition-colors hover:text-[#ff6b35]"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#1f2937] font-medium">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-[#9ca3af]">/</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className={variant === "image-left" ? "order-2" : "order-2 lg:order-1"}
          >
            {badge && (
              <motion.div variants={fadeInLeft}>
                <Badge className="mb-6 bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/15 border-none px-4 py-1.5 text-sm font-medium">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  {badge}
                </Badge>
              </motion.div>
            )}

            <motion.h1
              variants={fadeInLeft}
              className="mb-6 text-4xl font-bold tracking-tight text-[#1f2937] md:text-5xl lg:text-6xl leading-[1.1]"
            >
              {renderTitle()}
            </motion.h1>

            <motion.p
              variants={fadeInLeft}
              className="mb-8 text-lg text-[#6b7280] md:text-xl max-w-xl leading-relaxed"
            >
              {description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInLeft} className="flex flex-wrap gap-4 mb-10">
              <Link href={primaryCTA.href}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-[0_4px_14px_rgba(255,107,53,0.25)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.35)] transition-all"
                  >
                    {primaryCTA.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              {secondaryCTA.phone ? (
                <a href={secondaryCTA.phone}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#e5e7eb] text-[#1f2937] hover:bg-[#fafaf8] font-semibold text-lg px-8 py-6 rounded-xl"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      {secondaryCTA.text}
                    </Button>
                  </motion.div>
                </a>
              ) : secondaryCTA.href ? (
                <Link href={secondaryCTA.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#e5e7eb] text-[#1f2937] hover:bg-[#fafaf8] font-semibold text-lg px-8 py-6 rounded-xl"
                    >
                      {secondaryCTA.text}
                    </Button>
                  </motion.div>
                </Link>
              ) : null}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeInLeft}
              className="flex flex-wrap items-center gap-6 text-[#6b7280] text-sm"
            >
              {[
                "No Hidden Fees",
                "92% Approval Rate",
                "Same Day Decisions",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={variant === "image-left" ? "order-1" : "order-1 lg:order-2"}
          >
            <div className="relative">
              {imageSrc ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                >
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </motion.div>
              ) : (
                /* Placeholder visual when no image */
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#fafaf8] to-white rounded-2xl border border-[#e5e7eb] flex items-center justify-center shadow-lg">
                  <div className="text-center p-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#ff6b35]/10 flex items-center justify-center"
                    >
                      <span className="text-4xl">🔧</span>
                    </motion.div>
                    <p className="text-[#6b7280] text-lg font-medium">Trade Finance Specialists</p>
                  </div>
                </div>
              )}

              {/* Floating Stats Cards */}
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute -bottom-8 left-4 right-4 md:left-8 md:right-8"
                >
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white rounded-xl p-3 md:p-4 text-center shadow-lg border border-[#e5e7eb]/50"
                      >
                        {stat.icon && (
                          <span className="text-lg md:text-xl mb-1 block">{stat.icon}</span>
                        )}
                        <div className="text-lg md:text-2xl font-bold text-[#ff6b35]">
                          {stat.value}
                        </div>
                        <div className="text-[10px] md:text-xs text-[#6b7280] leading-tight">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6b35] via-[#ffd93d] to-[#ff6b35] origin-left"
      />
    </section>
  );
}

export default BrightHero;
