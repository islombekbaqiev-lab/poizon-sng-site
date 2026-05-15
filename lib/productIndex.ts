import { kv } from "@vercel/kv"
import type { ScrapedProduct } from "@/lib/scrapeProducts"

export type ProductIndex = {
  updatedAt: string
  products: ScrapedProduct[]
}

const KEY = "pzn:productIndex:v1"

export async function getProductIndex(): Promise<ProductIndex | null> {
  const data = await kv.get<ProductIndex>(KEY)
  if (!data || !Array.isArray((data as any).products)) return null
  return data
}

export async function setProductIndex(products: ScrapedProduct[]): Promise<ProductIndex> {
  const index: ProductIndex = { updatedAt: new Date().toISOString(), products }
  await kv.set(KEY, index)
  return index
}

