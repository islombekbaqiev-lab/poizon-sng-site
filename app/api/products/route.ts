import { NextResponse } from 'next/server'

const BASE = 'https://www.thepoizon.ru'
const UA   = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

const SOURCES = [
  { path: '/category/sneakers',        category: 'Кроссовки' },
  { path: '/category/sneakers?page=3', category: 'Кроссовки' },
  { path: '/category/sneakers?page=4', category: 'Кроссовки' },
  { path: '/category/sneakers?page=5', category: 'Кроссовки' },
  { path: '/category/sneakers?page=6', category: 'Кроссовки' },
  { path: '/category/sneakers?page=7', category: 'Кроссовки' },
  { path: '/category/apparel',         category: 'Одежда'    },
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
  return raw
    .replace(/\s+(Сетчатая|Кожа|Натуральная|Синтетическая|Дышащ|Устойчив|Амортиз|Текстиль|Искусств|Низкий|Высокий|Уличная|Повседневная|Баскетбольные|Кроссовки|Обувь|Мужские|Женские|Унисекс|Скейт|Беговые|Низкие|Высокие|Слип|Трек|Абразив|Легк|Дышащие|Поддержк|Износостойк|Нескольз|Амортизир).*/i, '')
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

    // name from title attribute on <a>
    const nameM = chunk.match(/title="([^"]+)"/)
    if (!nameM) continue
    const name = cleanName(nameM[1].trim())

    // price — "13 814 ₽" (space may be non-breaking  )
    const priceM = chunk.match(/(\d[\d\s ]{1,8}\d)\s*₽/)
    if (!priceM) continue
    const priceRUB = parseInt(priceM[1].replace(/[\s ]/g, ''), 10)
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

    // Dedup sneakers from pages 1, 3, 5, 7 by id
    const seenIds = new Set<string>()
    const allSneakers = [...pages[0], ...pages[1], ...pages[2], ...pages[3], ...pages[4], ...pages[5]].filter(p => {
      if (seenIds.has(p.id)) return false
      seenIds.add(p.id)
      return true
    })

    const mainSneakers = allSneakers.slice(0, 43)
    const mainIdSet    = new Set(mainSneakers.map((p: any) => p.id))
    const budgetSneakers = allSneakers
      .filter((p: any) => p.priceRUB <= 4500 && !mainIdSet.has(p.id))
      .sort((a: any, b: any) => a.priceRUB - b.priceRUB)
      .slice(0, 15)

    const apparel = pages[6].slice(0, 20)
    const all = [...mainSneakers, ...budgetSneakers, ...apparel]

    if (all.length === 0) {
      return NextResponse.json([], { status: 503 })
    }

    const products = all.map((p, i) => ({ ...p, tag: assignTag(p.priceRUB, i) }))

    return NextResponse.json(products, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch (err) {
    console.error('Scrape error:', err)
    return NextResponse.json([], { status: 500 })
  }
}
