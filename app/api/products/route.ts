import { NextRequest, NextResponse } from "next/server"
import { listProducts } from "@/lib/catalog"

// Сетка на главной берёт товары порциями: раньше браузер тянул весь каталог
// (~3000 позиций, ~280 КБ gzip) ради первых 12 карточек. Ответы кэширует CDN
// по полному URL, так что сервер считает каждую выборку один раз.
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const num = (k: string, def: number, max: number) =>
    Math.min(Math.max(parseInt(sp.get(k) ?? "", 10) || def, 0), max)
  const page = listProducts({
    cat: sp.get("cat") ?? "Все",
    q: (sp.get("q") ?? "").slice(0, 80),
    offset: num("offset", 0, 100_000),
    limit: num("limit", 12, 48) || 12,
  })
  return NextResponse.json(page, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  })
}
