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

// ── Витрина: порции карточек для сетки на главной ─────────────────────────────

/** Только поля карточки — ссылки на источник и даты витрине не нужны. */
export type CardProduct = Pick<Product, "id" | "name" | "brand" | "category" | "priceRUB" | "image" | "tag" | "article">

export interface ProductPage {
  items: CardProduct[]
  total: number
}

const toCard = (p: Product): CardProduct => ({
  id: p.id, name: p.name, brand: p.brand, category: p.category,
  priceRUB: p.priceRUB, image: p.image, tag: p.tag, article: p.article,
})

/** «Все»: категории вперемешку, чтобы первая страница не была из одних кроссовок. */
let mixed: Product[] | null = null
function mixedProducts(): Product[] {
  if (mixed) return mixed
  const groups = new Map<string, Product[]>()
  for (const p of getProducts()) {
    if (!p.image) continue
    if (!groups.has(p.category)) groups.set(p.category, [])
    groups.get(p.category)!.push(p)
  }
  const queues = Array.from(groups.values()).map(g => [...g])
  const out: Product[] = []
  while (queues.some(q => q.length)) for (const q of queues) { const p = q.shift(); if (p) out.push(p) }
  return (mixed = out)
}

export function listProducts({ cat = "Все", q = "", offset = 0, limit = 12 }:
  { cat?: string; q?: string; offset?: number; limit?: number }): ProductPage {
  let list = cat === "Все" ? mixedProducts() : getProducts().filter(p => p.image && p.category === cat)
  const query = q.trim().toLowerCase()
  if (query) {
    // Числа — только целиком: «jordan 4» не должен находить «Jordan 1 … 40».
    const tests = query.split(/\s+/).map(w => /^\d+$/.test(w)
      ? (h: string) => new RegExp(`(^|\\D)${w}(\\D|$)`).test(h)
      : (h: string) => h.includes(w))
    list = list.filter(p => {
      const hay = `${p.brand} ${p.name} ${p.article ?? ""}`.toLowerCase()
      return tests.every(t => t(hay))
    })
  }
  return { items: list.slice(offset, offset + limit).map(toCard), total: list.length }
}
