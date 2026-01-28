import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import vehicleData from '@/data/vehicle-finance-database.json'
import supplementaryData from '@/data/supplementary-data.json'
import { VehicleModelPageContent } from '@/components/vehicles/vehicle-model-page-content'

type VehicleModelPageProps = {
  params: {
    manufacturer: string
    model: string
  }
}

// Generate static paths for all vehicle models
export async function generateStaticParams() {
  const paths: { manufacturer: string; model: string }[] = []

  const vehicles = vehicleData.vehicles as any

  Object.keys(vehicles).forEach((manufacturerSlug) => {
    const manufacturer = vehicles[manufacturerSlug]
    const models = manufacturer.models || {}

    Object.keys(models).forEach((modelKey) => {
      paths.push({
        manufacturer: manufacturerSlug,
        model: modelKey.replace(/_/g, '-'),
      })
    })
  })

  return paths
}

// Generate metadata for SEO
export async function generateMetadata({ params }: VehicleModelPageProps): Promise<Metadata> {
  const manufacturer = (vehicleData.vehicles as any)[params.manufacturer]

  if (!manufacturer) {
    return {
      title: 'Vehicle Not Found',
    }
  }

  const modelKey = params.model.replace(/-/g, '_')
  const model = manufacturer.models?.[modelKey]

  if (!model) {
    return {
      title: 'Vehicle Not Found',
    }
  }

  return {
    title: `${manufacturer.name} ${model.name} Finance | New & Used | Tradesman Finance`,
    description: `Finance ${manufacturer.name} ${model.name} from ${model.typical_monthly_finance}/month. ${model.typical_price}. Payload: ${model.payload}. Perfect for ${model.best_for_trades.join(', ')}. 89% approval rate.`,
    keywords: `${manufacturer.name} ${model.name} finance, ${model.name} van finance, ${manufacturer.name} finance`,
  }
}

export default function VehicleModelPage({ params }: VehicleModelPageProps) {
  const manufacturer = (vehicleData.vehicles as any)[params.manufacturer]

  if (!manufacturer) {
    notFound()
  }

  const modelKey = params.model.replace(/-/g, '_')
  const model = manufacturer.models?.[modelKey]

  if (!model) {
    notFound()
  }

  // Get related models (other models from same manufacturer)
  const relatedModels = Object.entries(manufacturer.models || {})
    .filter(([key]) => key !== modelKey)
    .slice(0, 3)
    .map(([key, mod]: [string, any]) => ({
      slug: key.replace(/_/g, '-'),
      ...mod,
    }))

  return (
    <VehicleModelPageContent
      manufacturer={manufacturer}
      manufacturerSlug={params.manufacturer}
      model={model}
      modelSlug={params.model}
      relatedModels={relatedModels}
      contactPhone={supplementaryData.contact.phone}
    />
  )
}
