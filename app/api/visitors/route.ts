import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

/**
 * Уникальные посетители за последние N часов (по умолчанию 24) с разбивкой по странам.
 * Данные пишет middleware.ts. Доступ — заголовок `Authorization: Bearer $STATS_TOKEN`
 * (читает лид-бот @PoizonAdvisor_bot для ежедневной сводки).
 */
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const token = process.env.STATS_TOKEN
  if (!token || req.headers.get("authorization") !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const hours = Math.min(48, Math.max(1, Number(new URL(req.url).searchParams.get("hours")) || 24))
  const keys: string[] = []
  const now = Date.now()
  for (let i = 0; i < hours; i++) {
    const h = new Date(now - i * 3600_000).toISOString().slice(0, 13).replace(/[-T]/g, "")
    keys.push(`pzn:v:${h}`)
  }

  const members = (await kv.sunion(keys[0], ...keys.slice(1))) as string[]
  // один и тот же посетитель после полуночи UTC получает новый хеш — это приемлемая погрешность
  const countries: Record<string, number> = {}
  for (const m of members) {
    const cc = m.split("|")[1] || "XX"
    countries[cc] = (countries[cc] ?? 0) + 1
  }

  return NextResponse.json({
    hours,
    visitors: members.length,
    countries: Object.entries(countries).sort((a, b) => b[1] - a[1]),
  })
}
