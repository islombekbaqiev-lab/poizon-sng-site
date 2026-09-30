import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server"
import { kv } from "@vercel/kv"

/**
 * Счётчик посетителей без cookies — для ежедневной сводки в @PoizonAdvisor_bot.
 *
 * На каждый заход страницы (не ассеты, не API, не боты, не prefetch) пишем в KV
 * член множества «хеш посетителя | страна» в часовой бакет pzn:v:YYYYMMDDHH (UTC).
 * Хеш = SHA-256(IP + User-Agent + дата + секрет), обрезан до 12 символов:
 * соль меняется каждые сутки, сам IP нигде не хранится. Бакеты живут 49 часов.
 * Запись идёт через waitUntil — ответ пользователю не ждёт KV.
 */

const BOT_UA = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|quora|pinterest|vkshare|whatsapp|telegram|lighthouse|headless|curl|wget|python|go-http|axios|node-fetch/i

async function visitorHash(ip: string, ua: string, day: string): Promise<string> {
  const data = new TextEncoder().encode(`${ip}|${ua}|${day}|${process.env.CRON_SECRET ?? "pzn"}`)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest).slice(0, 6), b => b.toString(16).padStart(2, "0")).join("")
}

async function record(req: NextRequest): Promise<void> {
  try {
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "0.0.0.0"
    const ua = req.headers.get("user-agent") ?? ""
    const country = req.headers.get("x-vercel-ip-country") ?? "XX"
    const now = new Date().toISOString() // 2026-09-30T12:34:56Z
    const hour = now.slice(0, 13).replace(/[-T]/g, "") // 2026093012
    const key = `pzn:v:${hour}`
    await kv.sadd(key, `${await visitorHash(ip, ua, now.slice(0, 10))}|${country}`)
    await kv.expire(key, 49 * 3600)
  } catch {
    // статистика не должна ломать сайт
  }
}

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const ua = req.headers.get("user-agent") ?? ""
  const prefetch =
    req.headers.get("purpose") === "prefetch" ||
    req.headers.get("next-router-prefetch") !== null ||
    req.headers.get("x-middleware-prefetch") !== null ||
    req.headers.get("rsc") !== null
  if (req.method === "GET" && !prefetch && ua && !BOT_UA.test(ua)) {
    event.waitUntil(record(req))
  }
  return NextResponse.next()
}

export const config = {
  // только страницы: без /api, /_next, файлов с расширением (картинки, шрифты, видео, sitemap, robots…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
