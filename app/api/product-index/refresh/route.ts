import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { scrapeProducts } from "@/lib/scrapeProducts"
import { setProductIndex } from "@/lib/productIndex"
import { isAuthorizedCron } from "@/lib/cronAuth"


export async function GET(req: Request) {
  if (!isAuthorizedCron(req)) {
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

