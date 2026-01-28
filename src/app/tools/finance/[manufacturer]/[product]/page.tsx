import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import manufacturerData from '@/data/tool-manufacturers-database.json'
import supplementaryData from '@/data/supplementary-data.json'
import { ProductPageContent } from '@/components/tools/product-page-content'

type ProductPageProps = {
  params: {
    manufacturer: string
    product: string
  }
}

// Generate static paths for all products
export async function generateStaticParams() {
  const paths: { manufacturer: string; product: string }[] = []

  const manufacturers = manufacturerData.manufacturers.power_tools as any

  Object.keys(manufacturers).forEach((manufacturerSlug) => {
    const manufacturer = manufacturers[manufacturerSlug]
    const products = manufacturer.flagship_products || {}

    Object.keys(products).forEach((productKey) => {
      paths.push({
        manufacturer: manufacturerSlug,
        product: productKey.replace(/_/g, '-'),
      })
    })
  })

  return paths
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const manufacturer = (manufacturerData.manufacturers.power_tools as any)[params.manufacturer]

  if (!manufacturer) {
    return {
      title: 'Product Not Found',
    }
  }

  const productKey = params.product.replace(/-/g, '_')
  const product = manufacturer.flagship_products?.[productKey]

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const stats = (supplementaryData.application_stats as any)[params.manufacturer]
  const [minPrice] = product.typical_price.replace('£', '').split('-')
  const monthlyFrom = Math.round(parseInt(minPrice) / 24)

  return {
    title: `${product.name} Finance | ${manufacturer.name} | Tradesman Finance`,
    description: `Finance ${product.name} from £${monthlyFrom}/month. ${product.typical_price} spread over 12-60 months. ${stats?.approval_rate || 89}% approval rate for UK tradespeople.`,
    keywords: `${product.name} finance, ${manufacturer.name} finance, ${product.trades.join(' finance, ')} finance`,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const manufacturer = (manufacturerData.manufacturers.power_tools as any)[params.manufacturer]

  if (!manufacturer) {
    notFound()
  }

  const productKey = params.product.replace(/-/g, '_')
  const product = manufacturer.flagship_products?.[productKey]

  if (!product) {
    notFound()
  }

  const stats = (supplementaryData.application_stats as any)[params.manufacturer]

  // Get related products (other products from same manufacturer)
  const relatedProducts = Object.entries(manufacturer.flagship_products || {})
    .filter(([key]) => key !== productKey)
    .slice(0, 3)
    .map(([key, prod]: [string, any]) => ({
      slug: key.replace(/_/g, '-'),
      ...prod,
    }))

  // Get testimonials for this manufacturer and trade
  const testimonials = supplementaryData.testimonials.filter(
    (t: any) => t.brand === params.manufacturer && product.trades.includes(t.trade)
  ).slice(0, 2)

  return (
    <ProductPageContent
      manufacturer={manufacturer}
      manufacturerSlug={params.manufacturer}
      product={product}
      productSlug={params.product}
      stats={stats}
      relatedProducts={relatedProducts}
      testimonials={testimonials}
      contactPhone={supplementaryData.contact.phone}
    />
  )
}
