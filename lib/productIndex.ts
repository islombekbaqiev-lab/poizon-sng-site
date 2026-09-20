import { getCatalog, type Product } from "@/lib/catalog"

export type ScrapedProduct = Product

export type ProductIndex = {
  updatedAt: string
  products: Product[]
}

/**
 * Совместимая обёртка над файловым каталогом: вызывающий код остался прежним,
 * но данные больше не ходят в Vercel KV (его закрыли, и витрина из-за этого
 * молча отдавала пустой список).
 */
export async function getProductIndex(): Promise<ProductIndex | null> {
  const c = getCatalog()
  if (!c.products?.length) return null
  return { updatedAt: c.updatedAt, products: c.products }
}
