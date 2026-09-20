import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { getCatalog } from "@/lib/catalog"
import { isAuthorizedCron } from "@/lib/cronAuth"

/**
 * Каталог теперь собирается локально скриптом `scripts/refresh-catalog.mjs`
 * и приезжает в прод коммитом, поэтому обновлять на лету нечего — эндпойнт
 * оставлен, чтобы сбрасывать кеш SEO и отдавать состояние витрины.
 */
export async function GET(req: Request) {
  if (!isAuthorizedCron(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const c = getCatalog()
  revalidateTag("seo-data")
  return NextResponse.json({ success: true, updatedAt: c.updatedAt, count: c.count, source: c.source })
}
