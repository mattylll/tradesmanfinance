'use client';

import { companyCredentials, trustSignals } from '@/data/authors';
import { Shield, Award, Lock, CheckCircle, Users, Clock, MapPin } from 'lucide-react';

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
          value="Trade only"
          label="Who We Fund"
        />
        <StatCard
          icon={<MapPin className="h-5 w-5" />}
          value="UK-wide"
          label="Coverage"
        />
        <StatCard
          icon={<CheckCircle className="h-5 w-5" />}
          value="Free"
          label="No-Obligation Quote"
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          value={trustSignals.decisionTime}
          label="Typical Decision Time"
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
          value="Trade only"
          label="Who We Fund"
          highlight
        />
        <StatCard
          icon={<MapPin className="h-5 w-5" />}
          value="UK-wide"
          label="Coverage"
        />
        <StatCard
          icon={<CheckCircle className="h-5 w-5" />}
          value="Free"
          label="No-Obligation Quote"
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          value={trustSignals.decisionTime}
          label="Typical Decision Time"
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
        <span className="text-sm">Founded by a broker with 25 years in financial services</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <Award className="h-4 w-4 text-[#ffd93d]" />
        <span className="text-sm">Trade Finance Specialists</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <CheckCircle className="h-4 w-4 text-[#ffd93d]" />
        <span className="text-sm">No-Obligation Quotes</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <Lock className="h-4 w-4 text-green-500" />
        <span className="text-sm">Secure & Encrypted</span>
      </div>
    </div>
  );
}

/**
 * Generate Organization schema
 */
export function generateTrustSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Tradesman Finance UK',
    description: 'Specialist equipment finance and business loans for UK tradesmen',
    url: 'https://tradesmanfinance.co.uk',
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  });
}
