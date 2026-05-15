import { NextResponse } from "next/server"
import { getProductIndex } from "@/lib/productIndex"
import { scrapeProducts } from "@/lib/scrapeProducts"
import { setProductIndex } from "@/lib/productIndex"

export async function GET() {
  try {
    // Try KV first (fast path)
    const index = await getProductIndex().catch(() => null)
    if (index && index.products.length > 0) {
      return NextResponse.json(index.products, {
        headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
      })
    }

    // Fallback: scrape directly
    const products = await scrapeProducts()
    if (products.length === 0) {
      return NextResponse.json([], { status: 503 })
    }
    setProductIndex(products).catch(() => {})
    return NextResponse.json(products, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    })
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
