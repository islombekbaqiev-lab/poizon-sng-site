import catalog from "@/data/catalog.json"

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  priceRUB: number
  image: string
  url: string
  tag?: string
  article?: string
  sold?: number
  releaseDate?: string
}

export interface Catalog {
  updatedAt: string
  source: string
  count: number
  products: Product[]
}

/**
 * Каталог лежит файлом в репозитории и обновляется скриптом
 * `node scripts/refresh-catalog.mjs`. Раньше он жил в Vercel KV; KV закрыли,
 * переменные из проекта пропали, и витрина молча опустела — поэтому источник
 * данных больше не зависит от внешнего хранилища и не может отвалиться
 * в рантайме.
 */
export function getCatalog(): Catalog {
  return catalog as Catalog
}

export function getProducts(): Product[] {
  return getCatalog().products
}

export function getProductById(id: string): Product | null {
  return getProducts().find(p => p.id === id) ?? null
}

export function getProductsByCategory(category: string): Product[] {
  return getProducts().filter(p => p.category === category)
}

export function getProductsByBrand(brand: string): Product[] {
  const b = brand.toLowerCase()
  return getProducts().filter(p => p.brand.toLowerCase() === b)
}
