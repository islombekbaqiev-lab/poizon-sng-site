export interface ScrapedProduct {
  id: string
  name: string
  brand: string
  category: string
  priceRUB: number
  image: string
  url: string
  tag?: string
}

const BASE = "https://www.thepoizon.ru"
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

const SOURCES = [
  { path: "/category/sneakers",        category: "Кроссовки" },
  { path: "/category/sneakers?page=3", category: "Кроссовки" },
  { path: "/category/sneakers?page=4", category: "Кроссовки" },
  { path: "/category/sneakers?page=5", category: "Кроссовки" },
  { path: "/category/sneakers?page=6", category: "Кроссовки" },
  { path: "/category/sneakers?page=7", category: "Кроссовки" },
  { path: "/category/apparel",         category: "Одежда"    },
  { path: "/category/apparel-tops",    category: "Футболки"  },
  { path: "/category/bags",            category: "Сумки"     },
  { path: "/category/bags?page=2",     category: "Сумки"     },
  { path: "/category/hats-caps-accessories", category: "Кепки" },
  { path: "/category/accessories-watches",   category: "Аксессуары" },
  { path: "/category/accessories",           category: "Аксессуары" },
] as const

const BRANDS = [
  // Кроссовки
  "Nike", "Adidas", "Jordan", "New Balance", "Puma", "Vans", "Converse",
  "Reebok", "Asics", "Salomon", "Hoka", "Saucony", "On Running", "On",
  "Birkenstock", "UGG", "Crocs", "Timberland", "Dr. Martens",
  "New Balance", "Mizuno", "Brooks", "Merrell", "Keen",
  // Одежда / Streetwear
  "Stone Island", "Off-White", "Fear of God", "Supreme", "Stussy", "BAPE",
  "Carhartt", "The North Face", "Arc'teryx", "Moncler", "Palm Angels",
  "Amiri", "Rick Owens", "Balenciaga", "Valentino", "Burberry",
  "Kenzo", "Marni", "Acne Studios", "Jil Sander", "Lemaire",
  "Y-3", "Yohji Yamamoto", "Comme des Garçons", "CDG", "Maison Margiela",
  "MM6", "Raf Simons", "Undercover", "Neighborhood", "Wtaps",
  "Palace", "Polar Skate", "Thrasher", "Obey", "HUF",
  "Dickies", "Wrangler", "Levi's", "Tommy Hilfiger", "Ralph Lauren",
  "Polo Ralph Lauren", "Lacoste", "Fred Perry", "Champion",
  // Люкс
  "Louis Vuitton", "Gucci", "Prada", "Chanel", "Dior",
  "Fendi", "Celine", "Loewe", "Bottega Veneta", "Hermès",
  "Givenchy", "Versace", "Dolce & Gabbana", "Balmain",
  // Сумки / аксессуары
  "Jacquemus", "Longchamp", "Coach", "Marc Jacobs", "Tory Burch",
  "Kate Spade", "Charles & Keith", "Charles Keith",
  // Кепки / головные уборы
  "New Era", "47 Brand", "Mitchell & Ness",
  // Часы / аксессуары
  "Casio", "G-Shock", "Rolex", "Omega", "Cartier", "Tag Heuer",
  "Swatch", "Daniel Wellington",
]

function extractBrand(name: string): string | null {
  const lower = name.toLowerCase()
  for (const b of BRANDS) {
    if (lower.startsWith(b.toLowerCase())) return b
  }
  return null
}

function cleanName(raw: string): string {
  return raw
    .replace(
      /\s+(Сетчатая|Кожа|Натуральная|Синтетическая|Дышащ|Устойчив|Амортиз|Текстиль|Искусств|Низкий|Высокий|Уличная|Повседневная|Баскетбольные|Кроссовки|Обувь|Мужские|Женские|Унисекс|Скейт|Беговые|Низкие|Высокие|Слип|Трек|Абразив|Легк|Дышащие|Поддержк|Износостойк|Нескольз|Амортизир|ПУ|Полиуретан|Нейлон|Полиэстер|Холст|Хлопок|Джинс|Кожаная|Замша|Велюр|Через\s+плечо|Одно\s+плечо|Сумка|Рюкзак|Кошелек|Клатч|Тоут|Шоппер|Бейсболка|Кепка|Панама|Средняя|Большая|Маленькая|Обычный|Стандартный|Мини|Футболка|Поло|Топ|Блузка|Часы|Браслет|Ожерелье|Кольцо|Серьги|Аксессуар).*/i,
      "",
    )
    .trim()
    .slice(0, 80)
}

function parseProducts(html: string, category: string): Omit<ScrapedProduct, "tag">[] {
  const out: any[] = []
  const chunks = html.split('href="/product/')

  for (const chunk of chunks.slice(1)) {
    const slug = chunk.match(/^([^"]+)"/)?.[1]
    if (!slug) continue

    const imgM = chunk.match(/src="(https:\/\/cdn-img\.thepoizon\.ru[^"]+)"/)
    if (!imgM) continue
    const image = imgM[1].split("?")[0]

    const nameM = chunk.match(/title="([^"]+)"/)
    if (!nameM) continue
    const name = cleanName(nameM[1].trim())

    const priceM = chunk.match(/(\d[\d\s ]{1,8}\d)\s*₽/)
    if (!priceM) continue
    const priceRUB = parseInt(priceM[1].replace(/[\s ]/g, ""), 10)
    if (!priceRUB || priceRUB < 1000) continue

    const brand = extractBrand(name)
    if (!brand) continue

    // Skip if name is just the brand with no model info
    const modelPart = name.replace(new RegExp(`^${brand}\\s*`, "i"), "").trim()
    if (!modelPart) continue

    out.push({
      id: slug.replace(/[/?=]/g, "-").slice(0, 60),
      name,
      brand,
      category,
      priceRUB,
      image,
      url: `${BASE}/product/${slug}`,
    })
  }
  return out
}

function assignTag(priceRUB: number, idx: number): string | undefined {
  if (priceRUB > 35_000) return "Лимит"
  if (idx % 7 === 0) return "Хит"
  if (idx % 11 === 4) return "Новинка"
  return undefined
}

export async function scrapeProducts(): Promise<ScrapedProduct[]> {
  const pages = await Promise.all(
    SOURCES.map((s) =>
      fetch(`${BASE}${s.path}`, {
        headers: { "User-Agent": UA, "Accept-Language": "ru-RU,ru;q=0.9" },
        next: { revalidate: 3600 },
      })
        .then((r) => r.text())
        .then((html) => parseProducts(html, s.category))
        .catch(() => [] as Omit<ScrapedProduct, "tag">[]),
    ),
  )

  const seenIds = new Set<string>()
  function dedup<T extends { id: string }>(arr: T[]): T[] {
    return arr.filter(p => { if (seenIds.has(p.id)) return false; seenIds.add(p.id); return true })
  }

  const allSneakers = dedup([...pages[0], ...pages[1], ...pages[2], ...pages[3], ...pages[4], ...pages[5]])
  const mainSneakers = allSneakers.slice(0, 43)
  const mainIdSet = new Set(mainSneakers.map(p => p.id))
  const budgetSneakers = allSneakers
    .filter(p => p.priceRUB <= 4500 && !mainIdSet.has(p.id))
    .sort((a, b) => a.priceRUB - b.priceRUB)
    .slice(0, 15)

  const apparel  = dedup(pages[6]).slice(0, 20)
  const tops     = dedup(pages[7]).slice(0, 20)
  const bags     = dedup([...pages[8], ...pages[9]]).slice(0, 30)
  const caps     = dedup(pages[10]).slice(0, 20)
  const access   = dedup([...pages[11], ...pages[12]]).slice(0, 20)

  const all = [...mainSneakers, ...budgetSneakers, ...apparel, ...tops, ...bags, ...caps, ...access]
  return all.map((p, i) => ({ ...p, tag: assignTag(p.priceRUB, i) }))
}

