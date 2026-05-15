import { NextResponse } from "next/server"
import { getProductIndex } from "@/lib/productIndex"

export async function GET() {
  try {
    const index = await getProductIndex()
    if (!index || index.products.length === 0) {
      return NextResponse.json([], { status: 503 })
    }
    return NextResponse.json(index.products, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    })
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
