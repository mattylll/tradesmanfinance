import type { Metadata } from "next";
import { getProductPage } from "@/data/product-pages";
import { ProductPageContent } from "@/components/products/product-page-content";

const productData = getProductPage('asset-finance')!;

export const metadata: Metadata = {
  title: productData.metaTitle,
  description: productData.metaDescription,
  keywords: productData.keywords.join(', '),
  openGraph: {
    title: productData.metaTitle,
    description: productData.metaDescription,
    url: 'https://tradesmanfinance.co.uk/products/asset-finance',
    siteName: 'Tradesman Finance UK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: productData.metaTitle,
    description: productData.metaDescription,
  },
  alternates: {
    canonical: 'https://tradesmanfinance.co.uk/products/asset-finance',
  },
};

export default function AssetFinancePage() {
  return <ProductPageContent productSlug="asset-finance" />;
}
