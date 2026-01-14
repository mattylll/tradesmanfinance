'use client';

import { companyCredentials, trustSignals } from '@/data/authors';
import { Shield, Award, Lock, CheckCircle, Star, Users, Clock, TrendingUp } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'shield': Shield,
  'award': Award,
  'lock': Lock,
  'check-shield': CheckCircle,
};

interface TrustSignalsProps {
  variant?: 'full' | 'compact' | 'badges-only';
  className?: string;
}

export function TrustSignals({ variant = 'full', className = '' }: TrustSignalsProps) {
  if (variant === 'badges-only') {
    return (
      <div className={`flex flex-wrap gap-4 ${className}`}>
        {companyCredentials.slice(0, 3).map((credential) => {
          const Icon = iconMap[credential.icon] || Shield;
          return (
            <div
              key={credential.name}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50"
            >
              <Icon className="h-4 w-4 text-[#ff6b35]" />
              <span className="text-sm font-medium text-gray-300">{credential.name}</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        <StatCard
          icon={<Users className="h-5 w-5" />}
          value={trustSignals.customersHelped}
          label="Customers Helped"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          value={trustSignals.fundingArranged}
          label="Funding Arranged"
        />
        <StatCard
          icon={<Star className="h-5 w-5" />}
          value={trustSignals.averageRating.toString()}
          label="Trustpilot Rating"
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          value={trustSignals.decisionTime}
          label="Decision Time"
        />
      </div>
    );
  }

  // Full variant
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          value={trustSignals.customersHelped}
          label="Customers Helped"
          highlight
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          value={trustSignals.fundingArranged}
          label="Funding Arranged"
        />
        <StatCard
          icon={<Star className="h-5 w-5" />}
          value={`${trustSignals.averageRating}★`}
          label={`${trustSignals.reviewCount} Reviews`}
        />
        <StatCard
          icon={<Shield className="h-5 w-5" />}
          value={trustSignals.lenderPanel}
          label="Lender Partners"
        />
      </div>

      {/* Credentials */}
      <div className="grid md:grid-cols-2 gap-4">
        {companyCredentials.map((credential) => {
          const Icon = iconMap[credential.icon] || Shield;
          return (
            <div
              key={credential.name}
              className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50"
            >
              <div className="p-2 rounded-lg bg-[#ff6b35]/10">
                <Icon className="h-5 w-5 text-[#ff6b35]" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">{credential.name}</h4>
                <p className="text-sm text-gray-400">{credential.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  highlight?: boolean;
}

function StatCard({ icon, value, label, highlight }: StatCardProps) {
  return (
    <div className={`p-4 rounded-xl border ${
      highlight
        ? 'bg-[#ff6b35]/10 border-[#ff6b35]/20'
        : 'bg-gray-800/30 border-gray-700/50'
    }`}>
      <div className={`mb-2 ${highlight ? 'text-[#ff6b35]' : 'text-gray-400'}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

/**
 * Footer trust badges - minimal version for site footer
 */
export function FooterTrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4">
      <div className="flex items-center gap-2 text-gray-400">
        <Shield className="h-4 w-4 text-[#ff6b35]" />
        <span className="text-sm">FCA Authorised</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <Award className="h-4 w-4 text-[#ffd93d]" />
        <span className="text-sm">NACFB Member</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <Star className="h-4 w-4 text-[#ffd93d] fill-[#ffd93d]" />
        <span className="text-sm">{trustSignals.averageRating} Trustpilot</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <Lock className="h-4 w-4 text-green-500" />
        <span className="text-sm">Secure & Encrypted</span>
      </div>
    </div>
  );
}

/**
 * Generate Organization schema with credentials
 */
export function generateTrustSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Tradesman Finance UK',
    description: 'Specialist equipment finance and business loans for UK tradesmen',
    url: 'https://tradesmanfinance.co.uk',
    foundingDate: `${new Date().getFullYear() - trustSignals.yearsInBusiness}`,
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '10-50',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: trustSignals.averageRating.toString(),
      reviewCount: trustSignals.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    hasCredential: companyCredentials.map(cred => ({
      '@type': 'EducationalOccupationalCredential',
      name: cred.name,
      description: cred.description,
    })),
  });
}
