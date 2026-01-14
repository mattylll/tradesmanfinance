'use client';

/**
 * Professional Credentials Section
 * Displays trade certifications and industry body memberships
 * Builds trust and demonstrates industry expertise
 */

import { Shield, Award, CheckCircle, Building } from 'lucide-react';

interface CredentialsSectionProps {
  tradeName: string;
  certifications: string[];
  industryBodies?: string[];
  className?: string;
}

export function CredentialsSection({
  tradeName,
  certifications,
  industryBodies = [],
  className = ''
}: CredentialsSectionProps) {
  return (
    <section className={`py-16 bg-gray-900 text-white ${className}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-4">
            <Shield className="w-8 h-8 text-orange-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {tradeName} Finance: Supporting Certified Professionals
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We work with {tradeName.toLowerCase()}s holding industry-recognised certifications
            and memberships. Your qualifications can strengthen your finance application.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Certifications We Support */}
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-orange-400" />
              <h3 className="text-xl font-bold">Certifications We Support</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, index) => (
                <CertificationBadge key={index} name={cert} />
              ))}
            </div>
          </div>

          {/* Industry Bodies */}
          {industryBodies.length > 0 && (
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-bold">Industry Bodies</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {industryBodies.map((body, index) => (
                  <IndustryBadge key={index} name={body} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Benefits of Certification */}
        <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-xl p-8 border border-orange-500/20">
          <h3 className="text-xl font-bold mb-4 text-center">
            How Certifications Help Your Application
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <BenefitItem
              icon={<CheckCircle className="w-5 h-5 text-green-400" />}
              title="Stronger Applications"
              description="Industry certification demonstrates professionalism and commitment to quality standards."
            />
            <BenefitItem
              icon={<CheckCircle className="w-5 h-5 text-green-400" />}
              title="Better Rates"
              description="Certified tradesmen may qualify for more competitive interest rates."
            />
            <BenefitItem
              icon={<CheckCircle className="w-5 h-5 text-green-400" />}
              title="Higher Limits"
              description="Professional qualifications can support applications for larger finance amounts."
            />
          </div>
        </div>

        {/* Not Certified? */}
        <p className="text-center text-gray-400 mt-8">
          Not certified yet?{' '}
          <span className="text-white">
            Don't worry – we work with {tradeName.toLowerCase()}s at all stages of their careers.
          </span>
        </p>
      </div>
    </section>
  );
}

// Certification Badge Component
function CertificationBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg">
      <CheckCircle className="w-4 h-4 text-green-400" />
      <span className="text-white font-medium">{name}</span>
    </div>
  );
}

// Industry Body Badge Component
function IndustryBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600">
      <span className="text-gray-200">{name}</span>
    </div>
  );
}

// Benefit Item Component
function BenefitItem({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <h4 className="font-bold text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

export default CredentialsSection;
