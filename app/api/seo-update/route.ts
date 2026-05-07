import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const SITE_URL = "https://poizonsite.vercel.app"
const CRON_SECRET = process.env.CRON_SECRET

const COUNTRIES = ["Россия", "Казахстан", "Беларусь", "Таджикистан", "Узбекистан", "СНГ"]
const INTENTS = ["купить", "заказать", "оригинал", "из Китая", "байер", "доставка"]

function generateKeywords(products: any[]): string[] {
  const brands = [...new Set(products.map((p: any) => p.brand).filter(Boolean))]
  const models = [...new Set(
    products
      .map((p: any) => p.name.split(" ").slice(0, 3).join(" "))
      .filter((n: string) => n.length > 5)
  )].slice(0, 20)

  const base = [
    "Poizon", "байер Poizon", "кроссовки из Китая", "оригинальные кроссовки СНГ",
    "купить кроссовки из Китая", "байер Китай доставка СНГ", "得物 СНГ",
    "одежда из Китая оригинал", "купить Nike оригинал", "купить Adidas из Китая",
  ]

  // Brand × intent combinations
  const brandKeywords = brands.flatMap(brand =>
    INTENTS.slice(0, 3).map(intent => `${intent} ${brand}`)
  )

  // Brand × country (top brands only)
  const topBrands = brands.slice(0, 8)
  const geoKeywords = topBrands.flatMap(brand =>
    COUNTRIES.slice(0, 3).map(country => `${brand} ${country}`)
  )

  // Popular model keywords
  const modelKeywords = models.slice(0, 10).map(m => `${m} оригинал купить`)

  const all = [...base, ...brandKeywords, ...geoKeywords, ...modelKeywords]
  return [...new Set(all)].slice(0, 60)
}

function generateDescription(products: any[]): string {
  const brands = [...new Set(products.slice(0, 8).map((p: any) => p.brand))].join(", ")
  const count = products.length
  return `Байер с Poizon. ${count}+ товаров: ${brands}. Оригиналы с доставкой в Россию, Казахстан, Беларусь. Авиа от 3 дней. Проверка подлинности.`
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("secret") !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Fetch current product catalog
    const res = await fetch(`${SITE_URL}/api/products`, {
      next: { revalidate: 0 },
    })
    const products = await res.json()

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: "No products" }, { status: 503 })
    }

    const keywords = generateKeywords(products)
    const description = generateDescription(products)

    const seoData = {
      keywords,
      description,
      productCount: products.length,
      brands: [...new Set(products.map((p: any) => p.brand))],
      updatedAt: new Date().toISOString(),
    }

    // Write to public folder — served as static JSON
    const outPath = path.join(process.cwd(), "public", "seo-data.json")
    fs.writeFileSync(outPath, JSON.stringify(seoData, null, 2))

    return NextResponse.json({ success: true, keywordsCount: keywords.length, updatedAt: seoData.updatedAt })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
