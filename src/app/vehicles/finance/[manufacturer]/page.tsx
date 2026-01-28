import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import vehicleData from '@/data/vehicle-finance-database.json'
import supplementaryData from '@/data/supplementary-data.json'
import { VehicleManufacturerPageContent } from '@/components/vehicles/vehicle-manufacturer-page-content'

type VehicleManufacturerPageProps = {
  params: {
    manufacturer: string
  }
}

// Generate static paths for all vehicle manufacturers
export async function generateStaticParams() {
  const manufacturers = Object.keys(vehicleData.vehicles)
  return manufacturers.map((slug) => ({
    manufacturer: slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: VehicleManufacturerPageProps): Promise<Metadata> {
  const manufacturer = (vehicleData.vehicles as any)[params.manufacturer]

  if (!manufacturer) {
    return {
      title: 'Manufacturer Not Found',
    }
  }

  const modelCount = Object.keys(manufacturer.models || {}).length

  return {
    title: `${manufacturer.name} Van Finance | New & Used | Tradesman Finance`,
    description: `Finance ${manufacturer.name} vans and vehicles. ${modelCount} models available. ${manufacturer.reputation}. 89% approval rate. Apply in 60 seconds.`,
    keywords: `${manufacturer.name} van finance, ${manufacturer.name} finance, ${manufacturer.name} commercial vehicle finance`,
  }
}

export default function VehicleManufacturerPage({ params }: VehicleManufacturerPageProps) {
  const manufacturer = (vehicleData.vehicles as any)[params.manufacturer]

  if (!manufacturer) {
    notFound()
  }

  return (
    <VehicleManufacturerPageContent
      manufacturer={manufacturer}
      manufacturerSlug={params.manufacturer}
      contactPhone={supplementaryData.contact.phone}
    />
  )
}
