'use client';

/**
 * Local Market Overview Section
 * Displays economic data and market information for a county/town
 * Uses semantic triple structure for SEO
 */

import { Building2, TrendingUp, Users, Briefcase } from 'lucide-react';

interface LocalMarketSectionProps {
  countyName: string;
  townName?: string;
  tradeName?: string;
  economy?: {
    gdpContribution?: string;
    constructionSectorValue?: string;
    constructionEmployment?: number;
    activeTradeBusinesses?: number;
    avgProjectValue?: string;
    yoyGrowth?: string;
    keyIndustries?: string[];
  };
  tradeMarket?: {
    topTrades?: Array<{
      trade: string;
      demand: string;
      avgDayRate: string;
      activeContractors: number;
    }>;
    majorProjects?: string[];
    seasonalTrends?: string;
  };
  className?: string;
}

export function LocalMarketSection({
  countyName,
  townName,
  tradeName,
  economy,
  tradeMarket,
  className = ''
}: LocalMarketSectionProps) {
  const locationName = townName || countyName;
  const displayTitle = tradeName
    ? `${tradeName} Market in ${locationName}`
    : `${locationName} Trade Industry Overview`;

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {displayTitle}
        </h2>

        {/* Opening Paragraph with Semantic Triple */}
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
          <span className="font-semibold">{countyName}'s construction sector</span>
          {' '}employs{' '}
          <span className="font-semibold text-orange-600">
            over {economy?.constructionEmployment?.toLocaleString() || '5,000'} skilled tradespeople
          </span>
          , making it a key market for trade finance in the{' '}
          {economy?.keyIndustries?.[0] || 'construction'} sector.
        </p>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {economy?.activeTradeBusinesses && (
            <StatCard
              icon={<Building2 className="w-6 h-6" />}
              label="Trade Businesses"
              value={economy.activeTradeBusinesses.toLocaleString()}
              sublabel={`in ${countyName}`}
            />
          )}

          {economy?.avgProjectValue && (
            <StatCard
              icon={<Briefcase className="w-6 h-6" />}
              label="Avg Project Value"
              value={economy.avgProjectValue}
              sublabel="typical contract"
            />
          )}

          {economy?.yoyGrowth && (
            <StatCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="YoY Growth"
              value={economy.yoyGrowth}
              sublabel="construction sector"
            />
          )}

          {economy?.constructionEmployment && (
            <StatCard
              icon={<Users className="w-6 h-6" />}
              label="Employed"
              value={economy.constructionEmployment.toLocaleString()}
              sublabel="in construction"
            />
          )}
        </div>

        {/* Major Projects / Opportunities */}
        {tradeMarket?.majorProjects && tradeMarket.majorProjects.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Current Opportunities for {countyName} Tradespeople
            </h3>
            <ul className="space-y-3">
              {tradeMarket.majorProjects.map((project, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3" />
                  <span className="text-gray-700">{project}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Top Trades Table */}
        {tradeMarket?.topTrades && tradeMarket.topTrades.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-900">
              <h3 className="text-xl font-bold text-white">
                In-Demand Trades in {countyName}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Trade
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Demand
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Day Rate
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Active Contractors
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tradeMarket.topTrades.map((trade, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">
                        {trade.trade.replace(/-/g, ' ')}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          trade.demand === 'High'
                            ? 'bg-green-100 text-green-800'
                            : trade.demand === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {trade.demand}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {trade.avgDayRate}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {trade.activeContractors.toLocaleString()}+
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Seasonal Trends */}
        {tradeMarket?.seasonalTrends && (
          <p className="mt-6 text-gray-600 italic">
            <span className="font-semibold">Seasonal note:</span> {tradeMarket.seasonalTrends}
          </p>
        )}
      </div>
    </section>
  );
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  sublabel
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center text-orange-500 mb-2">
        {icon}
      </div>
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400">{sublabel}</div>
    </div>
  );
}

export default LocalMarketSection;
