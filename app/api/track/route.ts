import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function POST(req: Request) {
  try {
    const { page } = await req.json()
    if (!page || typeof page !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    const country = req.headers.get("x-vercel-ip-country") ?? "XX"

    await Promise.all([
      kv.incr(`pzn:stats:visits:total`),
      kv.incr(`pzn:stats:visits:day:${today}`),
      kv.incr(`pzn:stats:page:${page.slice(0, 64)}`),
      kv.incr(`pzn:stats:country:${country}`),
    ])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
