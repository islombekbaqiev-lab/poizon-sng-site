import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

// Только настоящие разделы сайта: иначе любой может наплодить в KV сколько угодно ключей pzn:stats:page:*
const SECTIONS = new Set(["", "about", "blog", "brand", "category", "cookies", "how-to-order", "privacy", "product", "size-guide", "terms"])
const PAGE_RE = /^\/[a-z0-9\-\/]{0,63}$/i
const PER_MINUTE = 20 // заходов с одного посетителя в минуту — больше не считаем

async function visitorKey(req: Request): Promise<string> {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "0.0.0.0"
  const data = new TextEncoder().encode(`${ip}|${process.env.CRON_SECRET ?? "pzn"}`)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest).slice(0, 6), b => b.toString(16).padStart(2, "0")).join("")
}

export async function POST(req: Request) {
  try {
    const { page } = await req.json()
    if (typeof page !== "string" || !PAGE_RE.test(page) || !SECTIONS.has(page.split("/")[1])) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const minute = new Date().toISOString().slice(0, 16)
    const rl = `pzn:rl:${await visitorKey(req)}:${minute}`
    const hits = await kv.incr(rl)
    if (hits === 1) await kv.expire(rl, 120)
    if (hits > PER_MINUTE) {
      return NextResponse.json({ ok: false }, { status: 429 })
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
