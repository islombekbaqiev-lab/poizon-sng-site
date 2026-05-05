import { NextResponse } from 'next/server'

const BASE = 'https://poizonshop.ru'
const UA   = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

const SOURCES = [
  { path: '/sneakers', category: 'Кроссовки' },
  { path: '/apparel',  category: 'Одежда'    },
]

const BRANDS = [
  'New Balance','Stone Island','Off-White','Fear of God','The North Face',
  'Louis Vuitton','Rick Owens','Air Jordan',
  'Nike','Adidas','Jordan','Asics','Puma','Vans','Converse','Reebok',
  'Salomon','Hoka','Balenciaga','Gucci','Supreme','Moncler','Carhartt',
  'Stussy','BAPE','Y-3','Burberry','Valentino','Palm Angels','Amiri',
]

function extractBrand(name: string): string {
  for (const b of BRANDS) {
    if (name.toLowerCase().startsWith(b.toLowerCase())) return b
  }
  return name.split(' ')[0]
}

function parseProducts(html: string, category: string) {
  const out: any[] = []
  const chunks = html.split('href="/product/')

  for (const chunk of chunks.slice(1)) {
    // slug
    const slug = chunk.match(/^([^"]+)"/)?.[1]
    if (!slug) continue

    // name from alt attribute
    const nameRaw = chunk.match(/alt="([^"]+)"/)?.[1]
    if (!nameRaw) continue
    const name = nameRaw
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .trim()

    // image — full proxy URL
    const imgM = chunk.match(/src="(https:\/\/proxy\.b2baisolutions\.io[^"]+)"/)
    if (!imgM) continue
    const image = imgM[1].replace(/&amp;/g, '&')

    // price — handle both formats:
    //   "<!-- -->11 490<!-- --> <span>₽"
    //   "от<!-- --> <!-- -->4 990<!-- --> <span>₽"
    const priceBlock = chunk.match(/price_num[^>]+>([\s\S]{0,120}?)<span>₽/)
    if (!priceBlock) continue
    const priceDigits = priceBlock[1].match(/[\d][\d \s]+/)
    if (!priceDigits) continue
    const priceRUB = parseInt(priceDigits[0].replace(/[ \s]/g, ''), 10)
    if (!priceRUB || priceRUB < 1500) continue

    out.push({
      id:       slug.replace(/[/?=]/g, '-'),
      name,
      brand:    extractBrand(name),
      category,
      priceRUB,
      image,
      url:      `${BASE}/product/${slug}`,
    })
  }
  return out
}

function assignTag(priceRUB: number, idx: number): string | undefined {
  if (priceRUB > 35_000) return 'Лимит'
  if (idx % 7 === 0)     return 'Хит'
  if (idx % 11 === 4)    return 'Новинка'
  return undefined
}

export async function GET() {
  try {
    const pages = await Promise.all(
      SOURCES.map(s =>
        fetch(`${BASE}${s.path}`, {
          headers: { 'User-Agent': UA, 'Accept-Language': 'ru-RU,ru;q=0.9' },
          next:    { revalidate: 3600 },
        })
          .then(r => r.text())
          .then(html => parseProducts(html, s.category))
          .catch(() => [] as any[])
      )
    )

    const all = pages.flat()
    if (all.length === 0) {
      return NextResponse.json({ error: 'no products' }, { status: 503 })
    }

    const products = all
      .slice(0, 28)
      .map((p, i) => ({ ...p, tag: assignTag(p.priceRUB, i) }))

    return NextResponse.json(products, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch (err) {
    console.error('Scrape error:', err)
    return NextResponse.json([], { status: 500 })
  }
}
