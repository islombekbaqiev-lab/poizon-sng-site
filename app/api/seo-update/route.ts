import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

const CRON_SECRET = process.env.CRON_SECRET

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("secret") !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  revalidateTag("seo-data")

  return NextResponse.json({ success: true, revalidated: true, at: new Date().toISOString() })
}
