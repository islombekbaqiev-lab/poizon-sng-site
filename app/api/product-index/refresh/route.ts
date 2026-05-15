import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { scrapeProducts } from "@/lib/scrapeProducts"
import { setProductIndex } from "@/lib/productIndex"

const CRON_SECRET = process.env.CRON_SECRET

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("secret") !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const products = await scrapeProducts()
  if (products.length === 0) {
    return NextResponse.json({ error: "No products" }, { status: 503 })
  }

  const index = await setProductIndex(products)

  // Keep other cached SEO bits fresh too.
  revalidateTag("seo-data")

  return NextResponse.json({
    success: true,
    updatedAt: index.updatedAt,
    count: index.products.length,
  })
}

