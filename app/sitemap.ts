import { MetadataRoute } from "next"

const SITE_URL = "https://poizonsng.com"

interface Product { id: string; name: string }

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${SITE_URL}/api/products`, { next: { revalidate: 3600 } })
    return res.ok ? res.json() : []
  } catch { return [] }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                     lastModified: new Date(), changeFrequency: "daily",   priority: 1   },
    { url: `${SITE_URL}/#catalog`,       lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${SITE_URL}/#how-it-works`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/#faq`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map(p => ({
    url:             `${SITE_URL}/product/${p.id}`,
    lastModified:    new Date(),
    changeFrequency: "weekly" as const,
    priority:        0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}
