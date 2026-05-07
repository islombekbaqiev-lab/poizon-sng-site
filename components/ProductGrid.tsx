"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Country, Rates } from "@/app/page"

const TG_BASE = "https://t.me/PoizonAdvisor"
const MARKUP  = 1.15

interface Product {
  id: string; name: string; brand: string
  category: string; priceRUB: number
  image: string; url: string; tag?: string
}

const RATE_MAP: Record<Country, { key: keyof Rates; symbol: string }> = {
  RU: { key: "RUB", symbol: "₽"   },
  BY: { key: "BYN", symbol: "Br"  },
  KZ: { key: "KZT", symbol: "₸"   },
  TJ: { key: "TJS", symbol: "с."  },
  AM: { key: "AMD", symbol: "֏"   },
  GE: { key: "GEL", symbol: "₾"   },
  AZ: { key: "AZN", symbol: "₼"   },
  UZ: { key: "UZS", symbol: "сум" },
}

const CATEGORIES = ["Все", "Кроссовки", "Одежда"]

const TAG_COLOR: Record<string, { bg: string; text: string }> = {
  "Хит":    { bg: "#4D96FF", text: "#fff" },
  "Новинка":{ bg: "#10b981", text: "#fff" },
  "Лимит":  { bg: "#ef4444", text: "#fff" },
}

const FALLBACK: Product[] = [
  {
    id: "ts-aj1-velvet-brown",
    name: "Travis Scott x Air Jordan 1 Low OG \"Velvet Brown\"",
    brand: "Nike",
    category: "Кроссовки",
    priceRUB: 38900,
    tag: "Лимит",
    url: "https://poizonshop.ru/product/travis-scott-x-air-jordan-1-low-og-velvet-brown-11569302",
    image: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20241222%2Faa3efedd7ed0417caaf8c8693e7e673d.jpg&w=600&q=75&fit=contain&fmt=auto&trim=0&v=1",
  },
  {
    id: "af1-triple-white",
    name: "Nike Air Force 1 '07 Triple White",
    brand: "Nike",
    category: "Кроссовки",
    priceRUB: 12500,
    tag: "Хит",
    url: "https://poizonshop.ru/product/nike-air-force-1-07-triple-white-1190436",
    image: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20230721%2F61c2ccd326aa4232b257115e05333732.jpg&w=600&q=75&fit=contain&fmt=auto&trim=0&v=1",
  },
  {
    id: "af1-07",
    name: "Nike Air Force 1 '07",
    brand: "Nike",
    category: "Кроссовки",
    priceRUB: 11900,
    url: "https://poizonshop.ru/product/nike-air-force-1-07-1237506",
    image: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20230721%2Ff1213edb65e24a37b39eeeb1b3f7420f.jpg&w=600&q=75&fit=contain&fmt=auto&trim=0&v=1",
  },
  {
    id: "af1-triple-black",
    name: "Nike Air Force 1 Low Triple Black",
    brand: "Nike",
    category: "Кроссовки",
    priceRUB: 12200,
    url: "https://poizonshop.ru/product/nike-air-force-1-low-triple-black-1190417",
    image: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20230721%2Fc5f5986aac904703b9ce9b30107c9d00.jpg&w=600&q=75&fit=contain&fmt=auto&trim=0&v=1",
  },
  {
    id: "yeezy-350-zebra",
    name: "Adidas Yeezy Boost 350 V2 Zebra",
    brand: "Adidas",
    category: "Кроссовки",
    priceRUB: 24500,
    tag: "Хит",
    url: "#",
    image: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20230615%2F4b0f6a7e8c2d4f1a9b3e5c7d8f2a4b6c.jpg&w=600&q=75&fit=contain&fmt=auto&trim=0&v=1",
  },
  {
    id: "nb-550-white",
    name: "New Balance 550 White Grey",
    brand: "New Balance",
    category: "Кроссовки",
    priceRUB: 16800,
    tag: "Новинка",
    url: "#",
    image: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20230828%2F9d2f1e3a7c5b8d4f0e6a2c4b1d7f9a3c.jpg&w=600&q=75&fit=contain&fmt=auto&trim=0&v=1",
  },
  {
    id: "jordan-4-bred",
    name: "Air Jordan 4 Retro Bred Reimagined",
    brand: "Jordan",
    category: "Кроссовки",
    priceRUB: 32000,
    tag: "Лимит",
    url: "#",
    image: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20240115%2Fb8e4f2a6c1d3e7f9a0b2c4d6e8f0a2b4.jpg&w=600&q=75&fit=contain&fmt=auto&trim=0&v=1",
  },
  {
    id: "essentials-hoodie-black",
    name: "Fear of God Essentials Hoodie Black",
    brand: "Fear of God",
    category: "Одежда",
    priceRUB: 18500,
    url: "#",
    image: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20231005%2Fc3a7b1d5e9f2a6b0c4d8e2f6a0b4c8d2.jpg&w=600&q=75&fit=contain&fmt=auto&trim=0&v=1",
  },
]

function fmtPrice(n: number, sym: string) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M ${sym}`
  if (n >= 1_000)     return `${+(n / 1000).toFixed(1)}к ${sym}`
  return `${Math.round(n)} ${sym}`
}

// ── No-image placeholder ──────────────────────────────────────────────────────
function NoImg({ brand }: { brand: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{ background: "#F5F5F7" }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C0C0C8" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <span className="text-[10px] font-semibold" style={{ color: "#C0C0C8" }}>{brand}</span>
    </div>
  )
}

// ── BIG hero card (col-span-2 row-span-2) ────────────────────────────────────
function HeroCard({ p, local, symbol }: { p: Product; local: number | null; symbol: string }) {
  const tgUrl      = `${TG_BASE}?start=${encodeURIComponent(p.name)}`
  const displayName = p.name.replace(new RegExp(`^${p.brand}\\s*`, 'i'), '').trim() || p.name

  return (
    <motion.div
      className="col-span-2 row-span-2 flex flex-col rounded-2xl overflow-hidden group"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015, borderColor: "rgba(77,150,255,0.3)", boxShadow: "0 20px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(77,150,255,0.2)" }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image area — white */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center"
        style={{ background: "#FFFFFF", minHeight: 0 }}>
        {p.image
          ? <img src={p.image} alt={p.name} loading="lazy"
              className="w-full h-full object-contain p-6 group-hover:scale-[1.04] transition-transform duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }} />
          : <NoImg brand={p.brand} />
        }
        {p.tag && TAG_COLOR[p.tag] && (
          <span className="absolute top-3 left-3 text-[9px] font-black px-2.5 py-1 rounded-full tracking-wide"
            style={{ background: TAG_COLOR[p.tag].bg, color: TAG_COLOR[p.tag].text }}>
            {p.tag}
          </span>
        )}
        {/* Subtle bottom gradient over white */}
        <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(5,10,24,0.08), transparent)" }} />
      </div>

      {/* Info panel */}
      <div className="flex-shrink-0 p-4" style={{ background: "rgba(5,10,24,0.98)" }}>
        <p className="text-[9px] font-black uppercase tracking-[0.18em] mb-0.5" style={{ color: "#4D96FF" }}>
          {p.brand}
        </p>
        <p className="font-bold text-sm leading-tight mb-3 line-clamp-2">{displayName}</p>
        <div className="flex items-center justify-between gap-3">
          {local !== null
            ? <p className="text-xl font-black tracking-tight">{fmtPrice(local, symbol)}</p>
            : <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Укажите страну</p>
          }
          <motion.a
            href={tgUrl} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-5 py-2 text-white text-xs font-bold rounded-xl"
            style={{ background: "#4D96FF" }}
            onClick={e => e.stopPropagation()}
            whileHover={{ scale: 1.06, backgroundColor: "#3a86ef" }}
            whileTap={{ scale: 0.92 }}>
            Купить →
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// ── Small card (col-span-1 row-span-1) ───────────────────────────────────────
function SmallCard({ p, local, symbol, delay = 0 }: { p: Product; local: number | null; symbol: string; delay?: number }) {
  const tgUrl       = `${TG_BASE}?start=${encodeURIComponent(p.name)}`
  const displayName = p.name.replace(new RegExp(`^${p.brand}\\s*`, 'i'), '').trim() || p.name

  return (
    <motion.div
      className="col-span-1 row-span-1 flex flex-col rounded-2xl overflow-hidden group"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, borderColor: "rgba(77,150,255,0.22)", boxShadow: "0 12px 32px rgba(0,0,0,0.45)", transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Image area — white */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center"
        style={{ background: "#FFFFFF", minHeight: 0 }}>
        {p.image
          ? <img src={p.image} alt={p.name} loading="lazy"
              className="w-full h-full object-contain p-3 group-hover:scale-[1.05] transition-transform duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }} />
          : <NoImg brand={p.brand} />
        }
        {p.tag && TAG_COLOR[p.tag] && (
          <span className="absolute top-2 left-2 text-[8px] font-black px-1.5 py-0.5 rounded-full"
            style={{ background: TAG_COLOR[p.tag].bg, color: TAG_COLOR[p.tag].text }}>
            {p.tag}
          </span>
        )}
      </div>

      {/* Info panel */}
      <div className="flex-shrink-0 p-2.5" style={{ background: "rgba(5,10,24,0.98)" }}>
        <p className="text-[8px] font-black uppercase tracking-[0.16em] mb-0.5" style={{ color: "#4D96FF" }}>
          {p.brand}
        </p>
        <p className="text-[10px] font-semibold leading-tight line-clamp-1 mb-2">{displayName}</p>
        <div className="flex items-center justify-between gap-1">
          {local !== null
            ? <p className="text-xs font-black tracking-tight">{fmtPrice(local, symbol)}</p>
            : <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.28)" }}>—</p>
          }
          <motion.a
            href={tgUrl} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-2.5 py-1 text-white text-[9px] font-bold rounded-lg"
            style={{ background: "#4D96FF" }}
            onClick={e => e.stopPropagation()}
            whileHover={{ scale: 1.08, backgroundColor: "#3a86ef" }}
            whileTap={{ scale: 0.9 }}>
            Купить
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonGrid() {
  return (
    <>
      <motion.div className="col-span-2 row-span-2 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }} />
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div key={i} className="col-span-1 row-span-1 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.1 }} />
      ))}
    </>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ProductGrid({ country, rates }: { country: Country | null; rates: Rates }) {
  const [cat,      setCat]      = useState("Все")
  const [query,    setQuery]    = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const ctrl = new AbortController()
    const timeout = setTimeout(() => ctrl.abort(), 8000)

    fetch('/api/products', { signal: ctrl.signal })
      .then(r => r.json())
      .then((d: Product[]) => { if (Array.isArray(d) && d.length > 0) setProducts(d) })
      .catch(() => {})
      .finally(() => { clearTimeout(timeout); setLoading(false) })

    return () => { ctrl.abort(); clearTimeout(timeout) }
  }, [])

  const rateMeta = country ? RATE_MAP[country] : null
  const source   = products.length > 0 ? products : (!loading ? FALLBACK : [])

  const items = source
    .filter(p => cat === "Все" || p.category === cat)
    .filter(p => !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    )

  const calcLocal = (p: Product) => {
    const priceCNY = p.priceRUB / rates.RUB
    return rateMeta ? priceCNY * MARKUP * rates[rateMeta.key] : null
  }
  const sym = rateMeta?.symbol ?? ""

  const [hero, ...rest] = items

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-5 sm:px-8 pb-20 pt-20"
      style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>

      {/* Header */}
      <motion.div className="flex items-start justify-between mb-10 flex-wrap gap-4"
        initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55 }}>
        <div>
          <p className="eyebrow mb-4">Каталог</p>
          <h2 className="font-black leading-[.88] tracking-tighter"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 6.5rem)" }}>
            ТОВАРЫ
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.2)", color: "transparent", display: "block" }}>
              С POIZON
            </span>
          </h2>
          <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,.25)" }}>
            {loading ? "Загружаем товары…" : `${source.length} позиций · 100% оригиналы`}
          </p>
        </div>
        <div className="flex gap-1 glass rounded-xl p-1">
          {CATEGORIES.map(c => (
            <motion.button key={c} onClick={() => setCat(c)}
              className="relative px-3.5 py-1.5 rounded-lg text-sm font-semibold z-10"
              style={{ color: cat === c ? "#fff" : "rgba(255,255,255,0.38)" }}
              whileTap={{ scale: 0.95 }}>
              {cat === c && (
                <motion.div layoutId="cat-pill"
                  className="absolute inset-0 rounded-lg bg-[#4D96FF]" style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }} />
              )}
              {c}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Search */}
      <motion.div className="relative mb-5"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4 }}>
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="rgba(255,255,255,0.25)" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Поиск по бренду или названию…"
          className="w-full glass rounded-2xl pl-10 pr-4 py-3 text-sm outline-none"
          style={{ color: "rgba(255,255,255,0.8)", caretColor: "#4D96FF", border: "1px solid rgba(255,255,255,0.08)" }} />
        {query && (
          <button onClick={() => setQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">×</button>
        )}
      </motion.div>

      {/* Bento grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
        style={{ gridAutoRows: "220px" }}
      >
        {loading ? (
          <SkeletonGrid />
        ) : items.length === 0 ? (
          <motion.div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center py-20 gap-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-4xl">🔍</p>
            <p className="text-white/40 text-sm">Ничего не найдено</p>
            <button onClick={() => { setCat("Все"); setQuery("") }}
              className="text-[#4D96FF] text-xs underline underline-offset-2 mt-1">
              Сбросить фильтры
            </button>
          </motion.div>
        ) : (
          <>
            {/* Hero card — always first */}
            {hero && <HeroCard p={hero} local={calcLocal(hero)} symbol={sym} />}

            {/* Small cards */}
            {rest.map((p, i) => (
              <SmallCard key={p.id} p={p} local={calcLocal(p)} symbol={sym} delay={i * 0.05} />
            ))}
          </>
        )}
      </div>

      {/* CTA */}
      {!loading && items.length > 0 && (
        <motion.div
          className="mt-8 glass-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <div>
            <p className="text-lg font-black mb-0.5">Нет нужного товара?</p>
            <p className="text-white/32 text-sm">Скинь ссылку с Poizon — выкупим и привезём.</p>
          </div>
          <motion.a href={TG_BASE} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3 bg-[#4D96FF] text-white text-sm font-bold rounded-2xl shadow-xl shadow-[#4D96FF]/25"
            whileHover={{ scale: 1.04, backgroundColor: "#3a86ef" }} whileTap={{ scale: 0.97 }}>
            Написать в Telegram →
          </motion.a>
        </motion.div>
      )}
    </section>
  )
}
