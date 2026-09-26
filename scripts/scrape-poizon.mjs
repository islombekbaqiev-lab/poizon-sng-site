#!/usr/bin/env node
/**
 * Каталог напрямую с thepoizon.ru → data/catalog.json. Бесплатно, без Apify.
 *
 * Страница категории отдаёт в __NEXT_DATA__ готовый JSON: 60 товаров на
 * страницу (`?page=N`), бренд, артикул, минимальная цена в рублях, число
 * продаж. Этого хватает витрине — парсить HTML не нужно.
 *
 * Запуск:  node scripts/scrape-poizon.mjs [--pages 3] [--dry]
 *   --pages N  сколько страниц по 60 брать с каждой подкатегории (по умолч. 3)
 *   --dry      вывести план, ничего не качать
 *
 * Если thepoizon.ru снова закроется анти-ботом — есть запасной путь через
 * Apify: scripts/refresh-catalog.mjs (платно, $0.002 за товар).
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT  = join(ROOT, "data", "catalog.json")
const BASE = "https://www.thepoizon.ru"
const UA   = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36"
const DELAY_MS = 1500

/**
 * Подкатегории источника → наши рубрики. Рубрики сайта не расширяем
 * (на них завязаны /category/[slug] и фильтры), а наполняем их из
 * нескольких подкатегорий, чтобы витрина была разнообразной.
 * `pages` переопределяет --pages для узких подкатегорий.
 */
const SOURCES = [
  { path: "/category/sneakers",                         category: "Кроссовки" },
  { path: "/category/sneakers-basketball",              category: "Кроссовки" },
  { path: "/category/sneakers-running",                 category: "Кроссовки" },
  { path: "/category/sneakers-skateboarding",           category: "Кроссовки" },
  { path: "/category/trendy-sneakers-casual-shoes",     category: "Кроссовки" },
  { path: "/category/sneakers-outdoors",                category: "Кроссовки", pages: 1 },
  { path: "/category/boots-shoes",                      category: "Кроссовки", pages: 1 },

  { path: "/category/hoodies-sweatshirts-apparel",      category: "Одежда" },
  { path: "/category/jackets-coats-apparel",            category: "Одежда" },
  { path: "/category/sweaters-apparel",                 category: "Одежда", pages: 1 },
  { path: "/category/denim-apparel",                    category: "Одежда", pages: 1 },
  { path: "/category/pants-apparel",                    category: "Одежда", pages: 2 },
  { path: "/category/shorts-skirts-apparel",            category: "Одежда", pages: 1 },
  { path: "/category/activewear-apparel",               category: "Одежда", pages: 1 },

  { path: "/category/tops-apparel",                     category: "Футболки" },

  { path: "/category/bags",                             category: "Сумки" },
  { path: "/category/bags-backpacks",                   category: "Сумки", pages: 2 },
  { path: "/category/bags-crossbody-bags",              category: "Сумки", pages: 2 },
  { path: "/category/bags-shoulder-bags",               category: "Сумки", pages: 1 },
  { path: "/category/bags-bum-bags-belt-bags",          category: "Сумки", pages: 1 },

  { path: "/category/hats-caps-accessories",            category: "Кепки" },

  { path: "/category/accessories-watches",              category: "Аксессуары", pages: 2 },
  { path: "/category/eyewear-accessories",              category: "Аксессуары", pages: 1 },
  { path: "/category/wallets-card-holders-accessories", category: "Аксессуары", pages: 1 },
  { path: "/category/accessories-belts",                category: "Аксессуары", pages: 1 },
  { path: "/category/accessories-necklaces-pendants",   category: "Аксессуары", pages: 1 },
  { path: "/category/accessories-bracelets-bangles",    category: "Аксессуары", pages: 1 },
  { path: "/category/accessories-scarves-shawls",       category: "Аксессуары", pages: 1 },
]

const sleep = ms => new Promise(r => setTimeout(r, ms))

/** «Продано 1,8 млн» / «Продано 12,3 тыс.» / «Продано 950» → число. */
function parseSold(label) {
  const m = String(label || "").replace(/\s/g, "").match(/([\d,.]+)(млн|тыс)?/)
  if (!m) return 0
  const n = parseFloat(m[1].replace(",", "."))
  if (!isFinite(n)) return 0
  return Math.round(n * (m[2] === "млн" ? 1e6 : m[2] === "тыс" ? 1e3 : 1))
}

function assignTag(p) {
  if (p.priceRUB > 35000) return "Лимит"
  if (p.sold >= 100000) return "Хит"
  if (p.releaseDate && Date.now() - Date.parse(p.releaseDate) < 1000 * 60 * 60 * 24 * 180) return "Новинка"
  return undefined
}

/**
 * Названия на источнике — SEO-простыни вида «Кроссовки Nike Dunk Low Retro
 * Мужские, Низкие, С Амортизацией…». На карточке и в сообщении менеджеру
 * нужна модель: отрезаем хвост после первой запятой и ведущее слово-тип.
 */
function cleanTitle(title, brand) {
  let t = String(title || "").replace(/\s+/g, " ").trim()
  t = t.split(",")[0].trim()
  if (brand) {
    const i = t.toLowerCase().indexOf(brand.toLowerCase())
    if (i > 0 && i < 30) t = t.slice(i)          // «Кроссовки Nike …» → «Nike …»
  }
  return t.slice(0, 90)
}

async function fetchPage(path, page) {
  const url = `${BASE}${path}${page > 1 ? `?page=${page}` : ""}`
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "ru-RU,ru;q=0.9" } })
    if (res.ok) {
      const html = await res.text()
      const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)
      if (m) return JSON.parse(m[1])?.props?.pageProps?.spuList ?? []
    }
    await sleep(DELAY_MS * attempt * 2)   // 429/анти-бот — отступаем и пробуем ещё
  }
  throw new Error(`не отдаёт данные: ${url}`)
}

function normalize(s, category) {
  const money = s?.minSpuPrice?.money
  if (!money || money.currency !== "RUB") return null
  const priceRUB = Math.round(Number(money.amount))
  if (!priceRUB || priceRUB < 800) return null

  const brand = (s.brandName || "").trim()
  const image = s.logoUrl || ""
  const url   = s.url ? BASE + s.url : ""
  const id    = (s.url || "").split("/").filter(Boolean).pop()?.slice(0, 80)
  if (!brand || !image || !id) return null

  const p = {
    id,
    name: cleanTitle(s.title, brand),
    brand,
    category,
    priceRUB,
    image,
    url,
    article: s.articleNumber || undefined,
    sold: parseSold(s.saleTag),
    releaseDate: s.sellDate ? new Date(s.sellDate).toISOString() : undefined,
  }
  p.tag = assignTag(p)
  if (!p.sold) delete p.sold
  return p
}

async function main() {
  const args  = process.argv.slice(2)
  const pages = parseInt(args[args.indexOf("--pages") + 1], 10) || 3
  const dry   = args.includes("--dry")

  const plan = SOURCES.reduce((n, s) => n + (s.pages ?? pages), 0)
  console.log(`Подкатегорий: ${SOURCES.length}, страниц: ${plan}, до ${plan * 60} товаров`)
  if (dry) return

  const byId = new Map()
  for (const s of SOURCES) {
    const n = s.pages ?? pages
    let got = 0
    process.stdout.write(`  ${s.category.padEnd(11)} ${s.path} … `)
    try {
      for (let page = 1; page <= n; page++) {
        const list = await fetchPage(s.path, page)
        for (const raw of list) {
          const p = normalize(raw, s.category)
          // Первая рубрика выигрывает: кроссовок из «Бега» не станет «Одеждой».
          if (p && !byId.has(p.id)) { byId.set(p.id, p); got++ }
        }
        if (list.length < 60) break
        await sleep(DELAY_MS)
      }
      console.log(`+${got}`)
    } catch (e) {
      console.log(`ошибка: ${e.message}`)
    }
    await sleep(DELAY_MS)
  }

  const fresh = [...byId.values()]
  if (fresh.length < 50) {
    console.error(`Собрано всего ${fresh.length} — похоже на блокировку, старый каталог не трогаю.`)
    process.exit(1)
  }

  // Свежие цены перекрывают старые; товары, которых в этот раз не было
  // в выдаче, остаются — витрина от обновления не сокращается.
  const map = new Map()
  if (existsSync(OUT)) {
    try { for (const p of JSON.parse(readFileSync(OUT, "utf8")).products || []) map.set(p.id, p) } catch {}
  }
  for (const p of fresh) map.set(p.id, p)
  const merged = [...map.values()].sort((a, b) => (b.sold || 0) - (a.sold || 0))

  writeFileSync(OUT, JSON.stringify({
    updatedAt: new Date().toISOString(),
    source: "thepoizon.ru",
    count: merged.length,
    products: merged,
  }) + "\n")

  const byCat = {}
  for (const p of merged) byCat[p.category] = (byCat[p.category] || 0) + 1
  console.log(`\nВсего в каталоге: ${merged.length} (в этом прогоне: ${fresh.length})`)
  console.log(Object.entries(byCat).map(([k, v]) => `  ${k}: ${v}`).join("\n"))
}

main().catch(e => { console.error(e); process.exit(1) })
