import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

const SECRET = process.env.CRON_SECRET

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("secret") !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Last 3 days
  const days: string[] = []
  for (let i = 0; i < 3; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }

  const [total, ...dailyCounts] = await Promise.all([
    kv.get<number>("pzn:stats:visits:total"),
    ...days.map(d => kv.get<number>(`pzn:stats:visits:day:${d}`)),
  ])

  // Top pages
  const pageKeys = await kv.keys("pzn:stats:page:*")
  const pageCounts: Record<string, number> = {}
  if (pageKeys.length > 0) {
    const vals = await Promise.all(pageKeys.map(k => kv.get<number>(k)))
    pageKeys.forEach((k, i) => {
      pageCounts[k.replace("pzn:stats:page:", "")] = vals[i] ?? 0
    })
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // Top countries
  const countryKeys = await kv.keys("pzn:stats:country:*")
  const countryCounts: Record<string, number> = {}
  if (countryKeys.length > 0) {
    const vals = await Promise.all(countryKeys.map(k => kv.get<number>(k)))
    countryKeys.forEach((k, i) => {
      countryCounts[k.replace("pzn:stats:country:", "")] = vals[i] ?? 0
    })
  }
  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return NextResponse.json({
    total:       total ?? 0,
    last3days:   days.map((d, i) => ({ date: d, visits: dailyCounts[i] ?? 0 })),
    topPages,
    topCountries,
  })
}
