import { Metadata } from "next"
import { notFound } from "next/navigation"

const SITE_URL = "https://poizonsite.vercel.app"
const TG_LINK  = "https://t.me/PoizonAdvisor"

interface Product {
  id: string; name: string; brand: string
  category: string; priceRUB: number
  image: string; url: string; tag?: string
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${SITE_URL}/api/products`, {
      next: { revalidate: 3600 },
    })
    return res.ok ? res.json() : []
  } catch { return [] }
}

async function getProduct(slug: string): Promise<Product | null> {
  const all = await getProducts()
  return all.find(p => p.id === slug) ?? null
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map(p => ({ slug: p.id }))
}

export const dynamicParams = true

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const p = await getProduct(slug)
  if (!p) return { title: "Товар не найден — POIZON SNG" }

  const price = `от ${p.priceRUB.toLocaleString("ru")} ₽`
  const title = `${p.name} — купить оригинал | POIZON SNG`
  const desc  = `${p.name} — оригинал с Poizon (得物). Доставка в Россию, Казахстан, Беларусь и СНГ. ${price}. Проверка подлинности.`

  return {
    title,
    description: desc,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description: desc,
      url: `${SITE_URL}/product/${slug}`,
      siteName: "POIZON SNG",
      images: p.image ? [{ url: p.image, width: 600, height: 600, alt: p.name }] : [],
      locale: "ru_RU",
      type: "website",
    },
    alternates: { canonical: `${SITE_URL}/product/${slug}` },
  }
}

export default async function ProductPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const p = await getProduct(slug)
  if (!p) notFound()

  const tgUrl  = `${TG_LINK}?start=${encodeURIComponent(p.name)}`
  const retail = Math.round(p.priceRUB * 1.45 / 100) * 100
  const save   = Math.round((1 - p.priceRUB / retail) * 100)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    brand: { "@type": "Brand", name: p.brand },
    image: p.image || undefined,
    description: `Оригинальный товар ${p.name} с платформы Poizon (得物). Доставка в СНГ.`,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: p.priceRUB,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "POIZON SNG" },
    },
  }

  return (
    <main className="min-h-screen bg-[#050C1A]" style={{ color: "#fff" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center gap-3">
        <a href="/" className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
          ← Каталог
        </a>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
        <span className="text-sm truncate" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "200px" }}>
          {p.name}
        </span>
      </nav>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Image */}
          <div className="rounded-3xl overflow-hidden flex items-center justify-center"
            style={{ background: "#fff", aspectRatio: "1/1" }}>
            {p.image
              ? <img src={p.image} alt={p.name}
                  className="w-full h-full object-contain p-10"
                  style={{ maxHeight: "520px" }} />
              : <div className="w-full h-full flex items-center justify-center"
                  style={{ color: "#ccc", fontSize: "14px" }}>{p.brand}</div>
            }
          </div>

          {/* Info */}
          <div className="py-4">
            {p.tag && (
              <span className="inline-block text-[11px] font-black px-3 py-1 rounded-full mb-4 uppercase tracking-wider"
                style={{
                  background: p.tag === "Лимит" ? "#ef4444" : p.tag === "Хит" ? "#4D96FF" : "#10b981",
                  color: "#fff",
                }}>
                {p.tag}
              </span>
            )}

            <p className="text-sm font-black uppercase tracking-[0.18em] mb-2"
              style={{ color: "#4D96FF" }}>{p.brand}</p>

            <h1 className="font-black leading-tight mb-6"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
              {p.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-black">
                {p.priceRUB.toLocaleString("ru")} ₽
              </span>
              <span className="text-sm line-through" style={{ color: "rgba(255,255,255,0.28)" }}>
                {retail.toLocaleString("ru")} ₽
              </span>
              <span className="text-sm font-bold" style={{ color: "#22c55e" }}>−{save}%</span>
            </div>
            <p className="text-xs mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
              Цена в юанях — уточняется в Telegram по актуальному курсу
            </p>

            {/* CTA */}
            <a href={tgUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "#4D96FF", boxShadow: "0 8px 28px rgba(77,150,255,0.35)" }}>
              Заказать в Telegram →
            </a>
            <a href={tgUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center mt-3 w-full py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01]"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
              Узнать точную цену
            </a>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                ["✅", "100% оригинал", "Поиzon проверяет каждый товар"],
                ["✈️", "Авиа 3–5 дней", "Быстрая доставка в СНГ"],
                ["📦", "Трек-номер", "Отслеживание на каждом этапе"],
                ["💬", "Поддержка 24/7", "Ответим в течение часа"],
              ].map(([icon, title, sub]) => (
                <div key={title} className="rounded-2xl p-4"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-lg mb-1">{icon}</p>
                  <p className="text-xs font-bold mb-0.5">{title}</p>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.38)" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* More products CTA */}
        <div className="mt-16 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "rgba(77,150,255,0.08)", border: "1px solid rgba(77,150,255,0.18)" }}>
          <div>
            <p className="font-black text-lg mb-1">Нужен другой товар с Poizon?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Скинь ссылку с Poizon — выкупим любой товар с платформы.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="/" className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }}>
              Каталог
            </a>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-105"
              style={{ background: "#4D96FF" }}>
              Telegram →
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
