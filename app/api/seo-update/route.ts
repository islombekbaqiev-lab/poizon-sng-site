import { NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { getProductIndex } from "@/lib/productIndex"
import { getAllSeoMeta, setSeoMetaStore, SeoMeta } from "@/lib/seo/metaCache"

const CRON_SECRET = process.env.CRON_SECRET
const client = new Anthropic()

interface BrandSummary {
  brand: string
  count: number
  minPrice: number
  topModels: string[]
}

function summarizeBrands(products: { brand: string; name: string; priceRUB: number }[]): BrandSummary[] {
  const map = new Map<string, BrandSummary>()
  for (const p of products) {
    const key = p.brand.toLowerCase()
    if (!map.has(key)) {
      map.set(key, { brand: p.brand, count: 0, minPrice: Infinity, topModels: [] })
    }
    const s = map.get(key)!
    s.count++
    if (p.priceRUB < s.minPrice) s.minPrice = p.priceRUB
    const model = p.name.replace(new RegExp(`^${p.brand}\\s*`, "i"), "").trim()
    if (model && s.topModels.length < 3) s.topModels.push(model)
  }
  return [...map.values()].filter(b => b.count >= 2).sort((a, b) => b.count - a.count)
}

async function optimizeBrandMeta(brands: BrandSummary[]): Promise<Record<string, SeoMeta>> {
  const prompt = `Ты SEO-специалист для российского интернет-магазина POIZON SNG — байер-сервис, который выкупает товары с китайской платформы Poizon (得物) и доставляет в страны СНГ (Россия, Казахстан, Беларусь и др.).

Для каждого бренда ниже создай SEO-оптимизированные мета-теги на РУССКОМ языке.

БРЕНДЫ:
${brands.map(b =>
  `- ${b.brand}: ${b.count} товаров, от ${b.minPrice.toLocaleString("ru")} ₽, модели: ${b.topModels.join(", ") || "—"}`
).join("\n")}

ТРЕБОВАНИЯ:
- title: до 60 символов, включить бренд + "купить" + "Poizon" или "СНГ"
- description: 120-155 символов, реальные модели + цена + доставка, живой и продающий текст
- keywords: 5-6 фраз, которые реально ищут в Яндексе/Google ("купить [Brand]", "[Brand] байер" и т.д.)

Ответь строго в JSON-формате:
{
  "nike": { "title": "...", "description": "...", "keywords": ["...", "..."] },
  "adidas": { ... }
}
Ключи — бренды в нижнем регистре (как в данных выше).`

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  })

  const text = response.content[0].type === "text" ? response.content[0].text : ""
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error("No JSON in Claude response")

  const parsed: Record<string, { title: string; description: string; keywords: string[] }> = JSON.parse(jsonMatch[0])
  const now = new Date().toISOString()

  const result: Record<string, SeoMeta> = {}
  for (const [key, val] of Object.entries(parsed)) {
    result[`brand:${key}`] = { ...val, updatedAt: now }
  }
  return result
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("secret") !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const index = await getProductIndex()
  if (!index || !index.products.length) {
    return NextResponse.json({ error: "No products in index" }, { status: 503 })
  }

  const brands = summarizeBrands(index.products)
  const existing = await getAllSeoMeta()
  const newMeta = await optimizeBrandMeta(brands)
  const merged = { ...existing, ...newMeta }
  await setSeoMetaStore(merged)

  return NextResponse.json({
    success: true,
    optimized: Object.keys(newMeta).length,
    brands: brands.map(b => b.brand),
    at: new Date().toISOString(),
  })
}
