import { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/site"
import { getProductIndex } from "@/lib/productIndex"
import { BLOG_POSTS } from "@/lib/blog"
import { BRANDS } from "@/lib/brands"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const index = await getProductIndex().catch(() => null)
  const products = index?.products ?? []
  const lastModified = index?.updatedAt ? new Date(index.updatedAt) : new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                                  lastModified, changeFrequency: "daily",   priority: 1   },
    { url: `${SITE_URL}/#catalog`,                    lastModified, changeFrequency: "daily",   priority: 0.9 },
    { url: `${SITE_URL}/category/sneakers`,    lastModified, changeFrequency: "daily", priority: 0.9  },
    { url: `${SITE_URL}/category/clothes`,     lastModified, changeFrequency: "daily", priority: 0.9  },
    { url: `${SITE_URL}/category/tshirts`,     lastModified, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/category/bags`,        lastModified, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/category/caps`,        lastModified, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/category/accessories`, lastModified, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/#how-it-works`,               lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/#faq`,                        lastModified, changeFrequency: "monthly", priority: 0.6 },
  ]

  const sizeGuideRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/size-guide/nike`,        lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/size-guide/adidas`,      lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/size-guide/jordan`,      lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/size-guide/new-balance`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/size-guide/puma`,        lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/size-guide/vans`,        lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/size-guide/salomon`,     lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/size-guide/hoka`,        lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/size-guide/converse`,    lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/how-to-order`,           lastModified, changeFrequency: "monthly", priority: 0.85 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map(p => ({
    url:             `${SITE_URL}/product/${p.id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority:        0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    ...BLOG_POSTS.map(p => ({
      url:             `${SITE_URL}/blog/${p.slug}`,
      lastModified:    new Date(p.date),
      changeFrequency: "monthly" as const,
      priority:        0.8,
    })),
  ]

  const brandRoutes: MetadataRoute.Sitemap = BRANDS.map((b) => ({
    url:             `${SITE_URL}/brand/${b.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority:        0.82,
  }))

  return [...staticRoutes, ...sizeGuideRoutes, ...brandRoutes, ...blogRoutes, ...productRoutes]
}
