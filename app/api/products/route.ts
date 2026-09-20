import { NextResponse } from "next/server"
import { getProducts } from "@/lib/catalog"

export const dynamic = "force-static"

export async function GET() {
  const products = getProducts()
  return NextResponse.json(products, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  })
}
