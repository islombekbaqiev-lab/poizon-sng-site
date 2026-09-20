#!/usr/bin/env node
/**
 * Обновление каталога: Poizon (得物) → data/catalog.json
 *
 * Почему через Apify, а не своим фетчем: thepoizon.ru закрылся анти-ботом
 * («Security Verification», HTTP 429) и на прямые запросы больше не отвечает
 * ни из Node, ни из настоящего браузера. Актор ходит через прокси-пул Apify
 * и возвращает уже разобранные поля — название, артикул, цену, картинку.
 *
 * Почему файл в репозитории, а не хранилище: каталог раньше лежал в Vercel KV,
 * KV закрыли, переменных в проекте не осталось — и сайт молча начал отдавать
 * пустой список. Файл в гите так сломаться не может.
 *
 * Запуск:  node scripts/refresh-catalog.mjs [--per 20] [--dry]
 *   --per N   сколько товаров тянуть на каждую категорию (по умолчанию 20)
 *   --dry     только показать план и стоимость, ничего не запускать
 *
 * Цена: $0.002 за товар + $0.00005 за запуск (тариф актора pay-per-event).
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT  = join(ROOT, "data", "catalog.json")

const ACTOR = "piotrv1001~poizon-listings-scraper"
const PRICE_PER_ITEM = 0.002
const PRICE_PER_RUN  = 0.00005

/** Категории источника → наши русские рубрики. */
const SOURCES = [
  { path: "/category/sneakers",               category: "Кроссовки"  },
  { path: "/category/apparel",                category: "Одежда"     },
  { path: "/category/apparel-tops",           category: "Футболки"   },
  { path: "/category/bags",                   category: "Сумки"      },
  { path: "/category/hats-caps-accessories",  category: "Кепки"      },
  { path: "/category/accessories-watches",    category: "Аксессуары" },
  { path: "/category/accessories",            category: "Аксессуары" },
]

const BRANDS = [
  "Nike","Adidas","Jordan","Air Jordan","New Balance","Puma","Vans","Converse","Reebok","Asics",
  "Salomon","Hoka","Saucony","On Running","Birkenstock","UGG","Crocs","Timberland","Dr. Martens",
  "Mizuno","Brooks","Merrell","Keen","Li-Ning","Anta","Xtep","361","Erke",
  "Stone Island","Off-White","Fear of God","Supreme","Stussy","BAPE","Carhartt","The North Face",
  "Arc'teryx","Moncler","Palm Angels","Amiri","Rick Owens","Balenciaga","Valentino","Burberry",
  "Kenzo","Marni","Acne Studios","Jil Sander","Lemaire","Y-3","Yohji Yamamoto","Comme des Garçons",
  "Maison Margiela","MM6","Raf Simons","Undercover","Neighborhood","Wtaps","Palace","Thrasher",
  "Obey","HUF","Dickies","Wrangler","Levi's","Tommy Hilfiger","Ralph Lauren","Polo Ralph Lauren",
  "Lacoste","Fred Perry","Champion","Uniqlo","Zara","H&M","Gap","Columbia","Patagonia","Jack Wolfskin",
  "Louis Vuitton","Gucci","Prada","Chanel","Dior","Fendi","Celine","Loewe","Bottega Veneta","Hermès",
  "Givenchy","Versace","Dolce & Gabbana","Balmain","Jacquemus","Longchamp","Coach","Marc Jacobs",
  "Tory Burch","Kate Spade","Charles & Keith","Jw Pei","Michael Kors",
  "New Era","47 Brand","Mitchell & Ness","Casio","G-Shock","Rolex","Omega","Cartier","Tag Heuer",
  "Swatch","Daniel Wellington","Seiko","Citizen","Apple",
].sort((a, b) => b.length - a.length) // длинные вперёд: «Air Jordan» раньше «Jordan»

/** Слова, с которых название начинается само по себе — это не бренд. */
const NOT_A_BRAND = new Set([
  "мужской","женский","унисекс","новый","оригинальный","классический","повседневный",
  "men","women","unisex","new","classic","casual","the","a","kids","boys","girls",
])

function detectBrand(title) {
  const t = (title || "").toLowerCase()
  for (const b of BRANDS) if (t.startsWith(b.toLowerCase())) return b
  for (const b of BRANDS) if (t.includes(b.toLowerCase())) return b

  // Запасной разбор: на Poizon сотни китайских и нишевых марок, которых нет
  // в списке. Без этого треть выдачи улетала в мусор. Берём первое слово,
  // если оно похоже на имя марки.
  const first = (title || "").trim().split(/\s+/)[0] || ""
  const clean = first.replace(/[^\p{L}\p{N}&'.-]/gu, "")
  if (clean.length < 2 || clean.length > 20) return null
  if (NOT_A_BRAND.has(clean.toLowerCase())) return null
  if (/^\d+$/.test(clean)) return null
  return clean
}

/** «2.6M sold» / «12.3K sold» → число. Нужен для метки «Хит». */
function parseSold(label) {
  const m = String(label || "").match(/([\d.]+)\s*([KMkm])?/)
  if (!m) return 0
  const n = parseFloat(m[1])
  if (!isFinite(n)) return 0
  const mult = m[2] ? { k: 1e3, m: 1e6 }[m[2].toLowerCase()] : 1
  return Math.round(n * mult)
}

function slugFromUrl(url) {
  const last = String(url || "").split("/").filter(Boolean).pop() || ""
  return last.split("?")[0].slice(0, 80)
}

function assignTag(p) {
  if (p.priceRUB > 35000) return "Лимит"
  if (p.sold >= 100000) return "Хит"
  if (p.releaseDate && Date.now() - Date.parse(p.releaseDate) < 1000 * 60 * 60 * 24 * 180) return "Новинка"
  return undefined
}

async function runActor(token, source, perCategory) {
  const url = `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?token=${token}&timeout=300`
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      startUrls: [{ url: `https://www.thepoizon.ru${source.path}` }],
      maxItems: perCategory,
      scrapeDetails: false,
    }),
  })
  if (!res.ok) throw new Error(`${source.path}: HTTP ${res.status} ${(await res.text()).slice(0, 160)}`)
  const items = await res.json()
  return Array.isArray(items) ? items : []
}

function normalize(raw, category) {
  const title = (raw.title || "").trim()
  const image = raw.imageUrl || ""
  const priceRUB = Number(raw.price)
  if (!title || !image || !priceRUB || priceRUB < 500) return null
  if (raw.currency && raw.currency !== "RUB") return null

  const brand = detectBrand(title)
  if (!brand) return null

  const id = slugFromUrl(raw.url)
  if (!id) return null

  const p = {
    id,
    name: title.slice(0, 90),
    brand,
    category,
    priceRUB: Math.round(priceRUB),
    image,
    url: raw.url,
    article: raw.articleNumber || undefined,
    sold: parseSold(raw.soldLabel),
    releaseDate: raw.releaseDate || undefined,
  }
  p.tag = assignTag(p)
  if (!p.sold) delete p.sold
  return p
}

async function main() {
  const args = process.argv.slice(2)
  const per = parseInt(args[args.indexOf("--per") + 1], 10) || 20
  const dry = args.includes("--dry")

  const token = process.env.APIFY_TOKEN
  const planned = SOURCES.length * per
  const cost = planned * PRICE_PER_ITEM + SOURCES.length * PRICE_PER_RUN

  console.log(`Категорий: ${SOURCES.length} × ${per} = до ${planned} товаров`)
  console.log(`Оценка расхода Apify: $${cost.toFixed(2)}`)
  if (dry) return
  if (!token) { console.error("Нет APIFY_TOKEN в окружении"); process.exit(1) }

  const collected = []
  for (const s of SOURCES) {
    process.stdout.write(`  ${s.category.padEnd(11)} ${s.path} … `)
    try {
      const items = await runActor(token, s, per)
      const mapped = items.map(r => normalize(r, s.category)).filter(Boolean)
      collected.push(...mapped)
      console.log(`${items.length} получено, ${mapped.length} годных`)
    } catch (e) {
      console.log(`ошибка: ${e.message}`)
    }
  }

  // Дедуп по id: одна и та же модель попадается в нескольких рубриках.
  const byId = new Map()
  for (const p of collected) if (!byId.has(p.id)) byId.set(p.id, p)
  const products = [...byId.values()]

  if (products.length === 0) {
    console.error("Пусто — старый каталог не трогаю.")
    process.exit(1)
  }

  // Слияние со старым: обновление не должно сокращать витрину,
  // если какая-то категория в этот раз не ответила.
  let merged = products
  if (existsSync(OUT)) {
    try {
      const prev = JSON.parse(readFileSync(OUT, "utf8"))
      const map = new Map((prev.products || []).map(p => [p.id, p]))
      for (const p of products) map.set(p.id, p)
      merged = [...map.values()]
    } catch {}
  }

  merged.sort((a, b) => (b.sold || 0) - (a.sold || 0))

  writeFileSync(OUT, JSON.stringify({
    updatedAt: new Date().toISOString(),
    source: "apify:" + ACTOR,
    count: merged.length,
    products: merged,
  }, null, 0) + "\n")

  const byCat = {}
  for (const p of merged) byCat[p.category] = (byCat[p.category] || 0) + 1
  console.log(`\nВсего в каталоге: ${merged.length} (новых в этом прогоне: ${products.length})`)
  console.log(Object.entries(byCat).map(([k, v]) => `  ${k}: ${v}`).join("\n"))
  console.log(`Записано: data/catalog.json`)
}

main().catch(e => { console.error(e); process.exit(1) })
