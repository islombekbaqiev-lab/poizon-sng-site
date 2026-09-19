import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { isAuthorizedCron } from "@/lib/cronAuth"


export async function GET(req: Request) {
  if (!isAuthorizedCron(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  revalidateTag("seo-data")

  return NextResponse.json({ success: true, revalidated: true, at: new Date().toISOString() })
}
