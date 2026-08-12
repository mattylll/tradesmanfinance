import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import manufacturerData from '@/data/tool-manufacturers-database.json'
import { TradeBrandPageContent } from '@/components/tools/trade-brand-page-content'

type TradeBrandPageProps = {
  params: {
    manufacturer: string
    trade: string
  }
}

// Generate static paths for all manufacturer-trade combinations
export async function generateStaticParams() {
  const paths: { manufacturer: string; trade: string }[] = []

  const manufacturers = manufacturerData.manufacturers.power_tools as any

  Object.keys(manufacturers).forEach((manufacturerSlug) => {
    const manufacturer = manufacturers[manufacturerSlug]
    const trades = manufacturer.trades || []

    trades.forEach((trade: string) => {
      paths.push({
        manufacturer: manufacturerSlug,
        trade: trade.toLowerCase().replace(/ /g, '-'),
      })
    })
  })

  return paths
}

// Generate metadata for SEO
export async function generateMetadata({ params }: TradeBrandPageProps): Promise<Metadata> {
  const manufacturer = (manufacturerData.manufacturers.power_tools as any)[params.manufacturer]

  if (!manufacturer) {
    return {
      title: 'Page Not Found',
    }
  }

  const tradeName = params.trade.replace(/-/g, ' ')
  const tradeCapitalized = tradeName.charAt(0).toUpperCase() + tradeName.slice(1)


  return {
    title: `${manufacturer.name} Finance for ${tradeCapitalized}s | Tools & Equipment | Tradesman Finance`,
    description: `Finance ${manufacturer.name} tools for ${tradeName}s. Essential products, starter kits, and professional-grade equipment from £50/month.`,
    keywords: `${manufacturer.name} ${tradeName} finance, ${tradeName} tools finance, ${manufacturer.name} for ${tradeName}s`,
  }
}

export default function TradeBrandPage({ params }: TradeBrandPageProps) {
  const manufacturer = (manufacturerData.manufacturers.power_tools as any)[params.manufacturer]

  if (!manufacturer) {
    notFound()
  }

  const tradeName = params.trade.replace(/-/g, ' ')
  const tradeCapitalized = tradeName.charAt(0).toUpperCase() + tradeName.slice(1)

  // Check if this trade is valid for this manufacturer
  const isValidTrade = manufacturer.trades.some(
    (t: string) => t.toLowerCase() === tradeName.toLowerCase()
  )

  if (!isValidTrade) {
    notFound()
  }


  // Get products suitable for this trade
  const tradeProducts = Object.entries(manufacturer.flagship_products || {})
    .filter(([_, product]: [string, any]) =>
      product.trades.some((t: string) => t.toLowerCase() === tradeName.toLowerCase())
    )
    .map(([key, product]: [string, any]) => ({
      slug: key.replace(/_/g, '-'),
      ...product,
    }))

  return (
    <TradeBrandPageContent
      manufacturer={manufacturer}
      manufacturerSlug={params.manufacturer}
      tradeName={tradeCapitalized}
      tradeSlug={params.trade}
      tradeProducts={tradeProducts}
    />
  )
}
