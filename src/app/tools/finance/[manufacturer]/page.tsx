import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import manufacturerData from '@/data/tool-manufacturers-database.json'
import supplementaryData from '@/data/supplementary-data.json'
import { ManufacturerPageContent } from '@/components/tools/manufacturer-page-content'

type ManufacturerPageProps = {
  params: {
    manufacturer: string
  }
}

// Generate static paths for all manufacturers
export async function generateStaticParams() {
  const manufacturers = Object.keys(manufacturerData.manufacturers.power_tools)
  return manufacturers.map((slug) => ({
    manufacturer: slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ManufacturerPageProps): Promise<Metadata> {
  const manufacturer = (manufacturerData.manufacturers.power_tools as any)[params.manufacturer]

  if (!manufacturer) {
    return {
      title: 'Manufacturer Not Found',
    }
  }

  const stats = (supplementaryData.application_stats as any)[params.manufacturer] || {}
  const minPrice = manufacturer.typical_purchase.split('-')[0]
  const maxPrice = manufacturer.typical_purchase.split('-')[1]

  return {
    title: `${manufacturer.name} Finance | Tool Finance for Tradespeople | Tradesman Finance`,
    description: `Finance ${manufacturer.name} tools from ${minPrice}-${maxPrice}. Fast approval for ${manufacturer.trades.join(', ')}. ${stats.approval_rate || 89}% approval rate. Apply in 60 seconds.`,
  }
}

export default function ManufacturerPage({ params }: ManufacturerPageProps) {
  const manufacturer = (manufacturerData.manufacturers.power_tools as any)[params.manufacturer]
  const stats = (supplementaryData.application_stats as any)[params.manufacturer]
  const testimonials = supplementaryData.testimonials.filter(
    (t: any) => t.brand === params.manufacturer
  ).slice(0, 3)

  if (!manufacturer) {
    notFound()
  }

  return (
    <ManufacturerPageContent
      manufacturer={manufacturer}
      stats={stats}
      testimonials={testimonials}
      manufacturerSlug={params.manufacturer}
      contactPhone={supplementaryData.contact.phone}
    />
  )
}
