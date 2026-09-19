import { NextResponse } from "next/server"

import { DEFAULT_RATES, type Rates } from "@/lib/types"

/**
 * Курсы валют для расчёта цен.
 *
 * Раньше каждый посетитель сам ходил на open.er-api.com из браузера: лишний
 * cross-origin запрос на критическом пути, плюс сторонний сервис видел IP всех
 * наших пользователей, а в части стран СНГ он просто медленный. Теперь запрос
 * делает сервер, результат кэшируется на час и отдаётся всем одинаковым.
 */
export const revalidate = 3600

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/CNY", {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error(`upstream ${res.status}`)

    const d = await res.json()
    const r = d?.rates
    if (!r) throw new Error("no rates in response")

    // Надбавка к межбанковскому курсу — та же, что была на клиенте.
    const rates: Rates = {
      RUB: Math.round((r.RUB + 1.2) * 10) / 10,
      KZT: Math.round(r.KZT + 8),
      TJS: Math.round((r.TJS + 0.2) * 100) / 100,
      UZS: Math.round(r.UZS),
      BYN: Math.round((r.BYN + 0.03) * 100) / 100,
      AMD: Math.round(r.AMD + 5),
      GEL: Math.round((r.GEL + 0.03) * 100) / 100,
      AZN: Math.round((r.AZN + 0.02) * 100) / 100,
    }

    return NextResponse.json(rates, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    })
  } catch {
    // Апстрим лёг — отдаём зашитые курсы, цены на сайте не ломаются.
    return NextResponse.json(DEFAULT_RATES, {
      headers: { "Cache-Control": "public, s-maxage=300" },
    })
  }
}
