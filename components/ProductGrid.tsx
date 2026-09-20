"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { Country, Rates } from "@/lib/types"
import { buildTelegramUrl, productStart } from "@/lib/telegram"

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    setDesktop(window.matchMedia("(pointer: fine) and (min-width: 768px)").matches)
  }, [])
  return desktop
}

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

const CATEGORIES = ["Все", "Кроссовки", "Одежда", "Футболки", "Сумки", "Кепки", "Аксессуары"]
const PAGE_SIZE = 12

// Бейджи монохромные: цвет на карточке должен идти от фотографии товара,
// а не от подписи. Красный оставлен только дефициту — он и должен «жечь».
const TAG_COLOR: Record<string, { bg: string; text: string }> = {
  "Хит":    { bg: "var(--ink-block)", text: "#fff" },
  "Новинка":{ bg: "#fff",             text: "var(--ink)" },
  "Лимит":  { bg: "var(--danger)",    text: "#fff" },
}

const FALLBACK: Product[] = []

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

// ── BIG hero card ────────────────────────────────────────────────────────────
function HeroCard({ p, local, symbol, priority }: { p: Product; local: number | null; symbol: string; priority?: boolean }) {
  // ВАЖНО: все хуки вызываются до любого return. Ранний выход выше по коду
  // менял количество хуков между рендерами (когда картинка падала в ошибку)
  // и ронял всё дерево — React error #300.
  const [imgFailed, setImgFailed] = useState(false)
  const desktop = useIsDesktop()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgYDesktop = useTransform(scrollYProgress, [0, 1], ["-11%", "11%"])
  const imgYStatic  = useMotionValue("0%")
  const imgY = desktop ? imgYDesktop : imgYStatic

  const tgUrl       = buildTelegramUrl({ start: productStart(p.id) })
  const displayName = p.name.replace(new RegExp(`^${p.brand}\\s*`, 'i'), '').trim() || p.name
  const retail      = local !== null ? Math.round(local * 1.45 / 100) * 100 : null
  const savePct     = retail !== null && local !== null ? Math.round((1 - local / retail) * 100) : null

  if (imgFailed || !p.image) return null

  return (
    <div
      ref={ref}
      data-cursor="buy"
      className="col-span-2 row-span-2 flex flex-col rounded-[24px] overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ background: "var(--card)", boxShadow: "var(--shadow-sm)" }}
    >
      <Link href={`/product/${p.id}`} className="flex-1 relative overflow-hidden flex items-center justify-center"
        style={{ background: "#FFFFFF", minHeight: 0 }}>
        <motion.div className="relative w-full h-full" style={{ y: imgY }}>
          <Image
            src={p.image} alt={p.name}
            fill sizes="(max-width: 768px) 50vw, 400px"
            className="object-contain p-6 group-hover:scale-[1.04] transition-transform duration-500"
            priority={priority}
            onError={() => setImgFailed(true)}
          />
        </motion.div>
        {p.tag && TAG_COLOR[p.tag] && (
          <span className="absolute top-3 left-3 text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wide"
            style={{ background: TAG_COLOR[p.tag].bg, color: TAG_COLOR[p.tag].text }}>
            {p.tag}
          </span>
        )}
        {savePct && (
          <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-1 rounded-full"
            style={{ background: "var(--ink-block)", color: "#fff" }}>
            -{savePct}%
          </span>
        )}
      </Link>
      <div className="flex-shrink-0 p-4" style={{ background: "var(--card)", borderTop: "1px solid var(--line)" }}>
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-0.5" style={{ color: "var(--ink-4)" }}>{p.brand}</p>
        <Link href={`/product/${p.id}`} className="block font-bold text-sm leading-tight mb-3 line-clamp-2 hover:underline underline-offset-2">
          {displayName}
        </Link>
        <div className="flex items-center justify-between gap-3">
          {local !== null ? (
            <div className="flex flex-col">
              {retail && (
                <span className="text-[10px] line-through" style={{ color: "var(--ink-4)" }}>
                  {fmtPrice(retail, symbol)}
                </span>
              )}
              <p className="text-xl font-bold tracking-tight" style={{ color: "var(--ink)" }}>{fmtPrice(local, symbol)}</p>
            </div>
          ) : (
            <p className="text-xs" style={{ color: "var(--ink-4)" }}>Укажите страну</p>
          )}
          <a href={tgUrl} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-5 py-2.5 text-white text-xs font-semibold rounded-full transition-all duration-150 hover:scale-105 active:scale-95"
            style={{ background: "var(--ink-block)" }}
            onClick={e => e.stopPropagation()}>
            Купить →
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Small card ───────────────────────────────────────────────────────────────
function SmallCard({ p, local, symbol, priority }: { p: Product; local: number | null; symbol: string; priority?: boolean }) {
  // Хуки — строго до раннего return (см. комментарий в HeroCard).
  const [imgFailed, setImgFailed] = useState(false)
  const desktop = useIsDesktop()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgYDesktop = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"])
  const imgYStatic  = useMotionValue("0%")
  const imgY = desktop ? imgYDesktop : imgYStatic

  const tgUrl       = buildTelegramUrl({ start: productStart(p.id) })
  const displayName = p.name.replace(new RegExp(`^${p.brand}\\s*`, 'i'), '').trim() || p.name

  if (imgFailed || !p.image) return null

  return (
    <div
      ref={ref}
      data-cursor="buy"
      className="col-span-1 row-span-1 flex flex-col rounded-[20px] overflow-hidden group transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      style={{ background: "var(--card)", boxShadow: "var(--shadow-sm)" }}>
      <Link href={`/product/${p.id}`} className="flex-1 relative overflow-hidden flex items-center justify-center"
        style={{ background: "#FFFFFF", minHeight: 0 }}>
        <motion.div className="relative w-full h-full" style={{ y: imgY }}>
          <Image
            src={p.image} alt={p.name}
            fill sizes="(max-width: 768px) 50vw, 220px"
            className="object-contain p-3 group-hover:scale-[1.05] transition-transform duration-500"
            priority={priority}
            onError={() => setImgFailed(true)}
          />
        </motion.div>
        {p.tag && TAG_COLOR[p.tag] && (
          <span className="absolute top-2 left-2 text-[8px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: TAG_COLOR[p.tag].bg, color: TAG_COLOR[p.tag].text }}>
            {p.tag}
          </span>
        )}
      </Link>
      <div className="flex-shrink-0 p-2.5" style={{ background: "var(--card)", borderTop: "1px solid var(--line)" }}>
        <p className="text-[8px] font-bold uppercase tracking-[0.16em] mb-0.5" style={{ color: "var(--ink-4)" }}>{p.brand}</p>
        <Link href={`/product/${p.id}`} className="block text-[10px] font-semibold leading-tight line-clamp-1 mb-2 hover:underline underline-offset-2">
          {displayName}
        </Link>
        <div className="flex items-center justify-between gap-1">
          {local !== null
            ? <p className="text-xs font-bold tracking-tight">{fmtPrice(local, symbol)}</p>
            : <p className="text-[9px]" style={{ color: "var(--ink-4)" }}>—</p>
          }
          <a href={tgUrl} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-3 py-1.5 text-white text-[9px] font-semibold rounded-full transition-all duration-150 hover:scale-105 active:scale-90"
            style={{ background: "var(--ink-block)" }}
            onClick={e => e.stopPropagation()}>
            Купить
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonGrid() {
  return (
    <>
      <motion.div className="col-span-2 row-span-2 rounded-2xl"
        style={{ background: "var(--card)", border: "1px solid var(--line)" }}
        animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }} />
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div key={i} className="col-span-1 row-span-1 rounded-2xl"
          style={{ background: "var(--card)", border: "1px solid var(--line)" }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.1 }} />
      ))}
    </>
  )
}

function interleave(products: Product[]): Product[] {
  const groups: Record<string, Product[]> = {}
  for (const p of products) {
    if (!groups[p.category]) groups[p.category] = []
    groups[p.category].push(p)
  }
  const keys = Object.keys(groups)
  const result: Product[] = []
  let i = 0
  while (result.length < products.length) {
    const key = keys[i % keys.length]
    const item = groups[key].shift()
    if (item) result.push(item)
    i++
  }
  return result
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ProductGrid({ country, rates }: { country: Country | null; rates: Rates }) {
  const [cat,      setCat]      = useState("Все")
  const [query,    setQuery]    = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)
  const [page,     setPage]     = useState(1)

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
  const raw    = products.length > 0 ? products : (!loading ? FALLBACK : [])
  const source = cat === "Все" ? interleave(raw) : raw

  const filtered = source
    .filter(p => !!p.image)
    .filter(p => cat === "Все" || p.category === cat)
    .filter(p => !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    )

  const items    = filtered.slice(0, page * PAGE_SIZE)
  const hasMore  = filtered.length > items.length

  const calcLocal = (p: Product) => {
    const priceCNY = p.priceRUB / rates.RUB
    return rateMeta ? priceCNY * MARKUP * rates[rateMeta.key] : null
  }
  const sym = rateMeta?.symbol ?? ""

  const [hero, ...rest] = items

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-5 sm:px-8 pb-20 pt-20"
      style={{ borderTop: "1px solid var(--line)" }}>

      {/* Header */}
      <motion.div className="flex items-start justify-between mb-10 flex-wrap gap-4"
        initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55 }}>
        <div>
          <p className="eyebrow mb-4">Каталог</p>
          <h2 className="leading-[0.95]">
            <span className="font-display block" style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)", color: "var(--ink)" }}>
              Товары
            </span>
            <span className="block font-bold" style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)", color: "var(--ink-4)", letterSpacing: "-0.03em" }}>
              с Poizon
            </span>
          </h2>
          <p className="text-xs mt-3" style={{ color: "var(--ink-4)" }}>
            {loading ? "Загружаем товары…" : `${filtered.length} позиций · 100% оригиналы`}
          </p>
        </div>
        <div className="flex gap-1 rounded-full p-1 max-w-full overflow-x-auto"
          style={{ background: "var(--card)", boxShadow: "var(--shadow-xs)", scrollbarWidth: "none" } as React.CSSProperties}>
          {CATEGORIES.map(c => (
            <motion.button key={c} onClick={() => { setCat(c); setPage(1) }}
              className="relative shrink-0 px-4 py-2 rounded-full text-sm font-semibold z-10 transition-colors"
              style={{ color: cat === c ? "#fff" : "var(--ink-3)" }}
              whileTap={{ scale: 0.95 }}>
              {cat === c && (
                <motion.div layoutId="cat-pill"
                  className="absolute inset-0 rounded-full bg-[var(--ink-block)]" style={{ zIndex: -1 }}
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
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="var(--ink-4)" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Поиск по бренду или названию…"
          className="w-full rounded-full pl-11 pr-4 py-3.5 text-sm outline-none"
          style={{ color: "var(--ink)", caretColor: "var(--ink)", background: "var(--card)", boxShadow: "var(--shadow-xs)", border: "1px solid var(--line)" }} />
        {query && (
          <button onClick={() => setQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-4)] hover:text-[var(--ink-2)]">×</button>
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
            <p className="text-[var(--ink-3)] text-sm">Ничего не найдено</p>
            <button onClick={() => { setCat("Все"); setQuery("") }}
              className="text-[var(--ink)] text-xs underline underline-offset-2 mt-1">
              Сбросить фильтры
            </button>
          </motion.div>
        ) : (
          <>
            {/* Hero card — always first */}
            {hero && <HeroCard p={hero} local={calcLocal(hero)} symbol={sym} priority />}

            {/* Small cards */}
            {rest.map((p, i) => (
              <SmallCard key={p.id} p={p} local={calcLocal(p)} symbol={sym} priority={i < 4} />
            ))}
          </>
        )}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setPage(p => p + 1)}
            className="btn btn-quiet">
            Показать ещё ({filtered.length - items.length})
          </button>
        </div>
      )}

      {/* CTA */}
      {!loading && items.length > 0 && (
        <motion.div
          className="mt-8 glass-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <div>
            <p className="text-lg font-bold mb-0.5">Нет нужного товара?</p>
            <p className="text-[var(--ink-4)] text-sm">Скинь ссылку с Poizon — выкупим и привезём.</p>
          </div>
          <motion.a href={buildTelegramUrl()} target="_blank" rel="noopener noreferrer"
            className="btn btn-primary flex-shrink-0"
            whileTap={{ scale: 0.97 }}>
            Написать в Telegram →
          </motion.a>
        </motion.div>
      )}
    </section>
  )
}
