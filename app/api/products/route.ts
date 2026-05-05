import { NextResponse } from 'next/server'

const BASE = 'https://www.thepoizon.ru'
const UA   = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

const SOURCES = [
  { path: '/category/sneakers', category: 'Кроссовки' },
  { path: '/category/apparel',  category: 'Одежда'    },
]

const BRANDS = [
  'Nike','Adidas','Jordan','New Balance','Puma','Vans','Converse','Reebok','Asics',
  'Salomon','Hoka','Saucony','On Running',
  'Stone Island','Off-White','Fear of God','Supreme','Stussy','BAPE','Carhartt',
  'The North Face','Arc\'teryx','Moncler','Palm Angels','Amiri','Rick Owens',
  'Louis Vuitton','Gucci','Balenciaga','Valentino','Burberry',
  'UGG','Birkenstock',
]

function extractBrand(name: string): string {
  const lower = name.toLowerCase()
  for (const b of BRANDS) {
    if (lower.startsWith(b.toLowerCase())) return b
  }
  return name.split(' ')[0]
}

function cleanName(raw: string): string {
  // thepoizon.ru names are verbose machine translations — truncate at key info
  return raw
    .replace(/\s+(Сетчатая|Кожа|Натуральная|Синтетическая|Дышащ|Устойчив|Амортиз|Текстиль|Искусств|Низкий|Высокий).*/i, '')
    .trim()
    .slice(0, 80)
}

function parseProducts(html: string, category: string) {
  const out: any[] = []
  const chunks = html.split('href="/product/')

  for (const chunk of chunks.slice(1)) {
    const slug = chunk.match(/^([^"]+)"/)?.[1]
    if (!slug) continue

    // image — cdn-img.thepoizon.ru
    const imgM = chunk.match(/src="(https:\/\/cdn-img\.thepoizon\.ru[^"]+)"/)
    if (!imgM) continue
    // use original jpg without webp conversion for better quality
    const image = imgM[1].split('?')[0]

    // name from <h3>
    const nameM = chunk.match(/<h3[^>]*>([^<]+)<\/h3>/)
    if (!nameM) continue
    const name = cleanName(nameM[1].trim())

    // price — "X XXX ₽"
    const priceM = chunk.match(/([\d\s]+)\s*₽/)
    if (!priceM) continue
    const priceRUB = parseInt(priceM[1].replace(/\s/g, ''), 10)
    if (!priceRUB || priceRUB < 1000) continue

    out.push({
      id:       slug.replace(/[/?=]/g, '-').slice(0, 60),
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
          next: { revalidate: 3600 },
        })
          .then(r => r.text())
          .then(html => parseProducts(html, s.category))
          .catch(() => [] as any[])
      )
    )

    const all = pages.flat()
    if (all.length === 0) {
      return NextResponse.json([], { status: 503 })
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
