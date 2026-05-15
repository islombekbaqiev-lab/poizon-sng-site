import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"

import { SITE_URL, TG_LINK } from "@/lib/site"
import { breadcrumbList, itemList, wrapGraph } from "@/lib/seo/jsonld"
import { buildTelegramUrl, categoryStart, productStart } from "@/lib/telegram"

interface Product {
  id: string; name: string; brand: string
  category: string; priceRUB: number
  image: string; url: string; tag?: string
}

const CATEGORY_MAP: Record<string, { label: string; desc: string; keywords: string[] }> = {
  "кроссовки": {
    label: "Кроссовки",
    desc: "Кроссовки с Poizon (得物) под ключ: поможем с размером, выкупим, сделаем фото перед отправкой и доставим в страны СНГ. Nike, Adidas, Jordan, New Balance, Salomon.",
    keywords: ["кроссовки из Китая", "купить кроссовки оригинал", "Nike Adidas Jordan доставка СНГ", "байер кроссовки Poizon", "оригинальные кроссовки Россия"],
  },
  "одежда": {
    label: "Одежда",
    desc: "Одежда с Poizon (得物) с премиум‑сопровождением: проверим наличие, согласуем размер, сделаем фото перед отправкой и привезём в страны СНГ. Stone Island, Off‑White, Supreme и др.",
    keywords: ["одежда из Китая оригинал", "купить Stone Island Россия", "байер одежда Poizon", "Supreme Fear of God СНГ", "оригинальная одежда доставка"],
  },
  "футболки": {
    label: "Футболки",
    desc: "Футболки и топы с Poizon (得物): оригинальные бренды из Китая с доставкой в Россию, Казахстан, Беларусь. Nike, Supreme, Stone Island, Off-White.",
    keywords: ["купить футболку из Китая", "футболка байер Poizon", "Supreme Nike футболка СНГ", "оригинальные футболки доставка", "топы из Китая"],
  },
  "сумки": {
    label: "Сумки",
    desc: "Сумки с Poizon (得物): шоперы, кроссбоди, рюкзаки — оригиналы с доставкой в СНГ. Gucci, Prada, Louis Vuitton, Charles Keith и другие бренды.",
    keywords: ["купить сумку из Китая", "сумка байер Poizon", "Gucci Prada сумка СНГ", "оригинальные сумки Россия", "кроссбоди из Китая"],
  },
  "кепки": {
    label: "Кепки",
    desc: "Кепки и головные уборы с Poizon (得物): бейсболки, панамы, шапки — оригиналы с доставкой в Россию и СНГ. Nike, New Era, Supreme и другие.",
    keywords: ["купить кепку из Китая", "бейсболка байер Poizon", "New Era кепка СНГ", "оригинальные кепки доставка", "Supreme кепка Россия"],
  },
  "аксессуары": {
    label: "Аксессуары",
    desc: "Аксессуары с Poizon (得物): часы, украшения, браслеты — оригиналы с доставкой в СНГ. Casio, Rolex, Omega и другие бренды.",
    keywords: ["купить аксессуары из Китая", "часы байер Poizon", "Casio часы СНГ", "оригинальные аксессуары Россия", "украшения из Китая доставка"],
  },
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${SITE_URL}/api/products`, { next: { revalidate: 3600 } })
    return res.ok ? res.json() : []
  } catch { return [] }
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map(slug => ({ slug }))
}


export const dynamicParams = false

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const cat = CATEGORY_MAP[slug]
  if (!cat) return { title: "Не найдено" }

  const title = `${cat.label} с Poizon — купить оригинал | POIZON SNG`
  return {
    title,
    description: cat.desc,
    keywords: cat.keywords,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description: cat.desc,
      url: `${SITE_URL}/category/${slug}`,
      siteName: "POIZON SNG",
      locale: "ru_RU",
      type: "website",
    },
    alternates: { canonical: `${SITE_URL}/category/${slug}` },
  }
}

const TAG_COLOR: Record<string, string> = {
  "Хит": "#4D96FF", "Новинка": "#10b981", "Лимит": "#ef4444",
}

export default async function CategoryPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const cat = CATEGORY_MAP[slug]
  if (!cat) notFound()

  const all      = await getProducts()
  const products = all.filter(p => p.category === cat.label).slice(0, 60)

  const jsonLd = wrapGraph([
    breadcrumbList([
      { name: "POIZON SNG", item: SITE_URL },
      { name: cat.label, item: `${SITE_URL}/category/${slug}` },
    ]),
    itemList(
      `${cat.label} с Poizon`,
      cat.desc,
      products.slice(0, 20).map((p) => ({ url: `${SITE_URL}/product/${p.id}`, name: p.name })),
    ),
  ])

  return (
    <main className="min-h-screen bg-[#050C1A]" style={{ color: "#fff" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center gap-3">
        <Link href="/" className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
          ← Каталог
        </Link>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
        <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
          {cat.label}
        </span>
      </nav>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: "#4D96FF" }}>
            POIZON SNG
          </p>
          <h1 className="font-black leading-tight tracking-tighter mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            {cat.label.toUpperCase()}
            <span className="block" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.2)", color: "transparent" }}>
              С POIZON
            </span>
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            {cat.desc}
          </p>
          <p className="text-sm mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            {products.length} позиций · Фото перед отправкой · Трек-номер · Авиа 3–5 дней
          </p>
        </div>

        {/* Quick order */}
        <div
          className="mb-8 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div>
            <p className="text-sm font-bold mb-1">Хочешь этот товар с Poizon — без лишних шагов?</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Напиши менеджеру: модель, размер, страна доставки — посчитаем цену «под ключ».
            </p>
          </div>
          <a
            href={buildTelegramUrl({ start: categoryStart(slug) })}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-105 flex-shrink-0"
            style={{ background: "#4D96FF" }}
          >
            Написать в Telegram →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map(p => {
            const tgUrl  = buildTelegramUrl({ start: productStart(p.id) })
            const retail = Math.round(p.priceRUB * 1.45 / 100) * 100
            const save   = Math.round((1 - p.priceRUB / retail) * 100)
            const displayName = p.name.replace(new RegExp(`^${p.brand}\\s*`, 'i'), '').trim() || p.name

            return (
              <div key={p.id} className="flex flex-col rounded-2xl overflow-hidden group transition-all duration-200 hover:-translate-y-1"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>

                <Link href={`/product/${p.id}`} className="flex-1 relative overflow-hidden flex items-center justify-center"
                  style={{ background: "#fff", aspectRatio: "1/1" }}>
                  {p.image
                    ? <img src={p.image} alt={p.name} loading="lazy"
                        className="w-full h-full object-contain p-4 group-hover:scale-[1.04] transition-transform duration-500" />
                    : <div className="w-full h-full flex items-center justify-center text-[#ccc] text-xs">{p.brand}</div>
                  }
                  {p.tag && TAG_COLOR[p.tag] && (
                    <span className="absolute top-2 left-2 text-[8px] font-black px-1.5 py-0.5 rounded-full text-white"
                      style={{ background: TAG_COLOR[p.tag] }}>
                      {p.tag}
                    </span>
                  )}
                  <span className="absolute top-2 right-2 text-[8px] font-black px-1.5 py-0.5 rounded-full text-white"
                    style={{ background: "#22c55e" }}>
                    -{save}%
                  </span>
                </Link>

                <div className="flex-shrink-0 p-3" style={{ background: "rgba(5,10,24,0.98)" }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] mb-0.5" style={{ color: "#4D96FF" }}>{p.brand}</p>
                  <p className="text-[11px] font-semibold leading-tight line-clamp-1 mb-2">{displayName}</p>
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-sm font-black">{p.priceRUB.toLocaleString("ru")} ₽</p>
                    <a href={tgUrl} target="_blank" rel="noopener noreferrer"
                      className="px-2.5 py-1 text-white text-[9px] font-bold rounded-lg transition-all duration-150 hover:scale-105"
                      style={{ background: "#4D96FF" }}>
                      Купить
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "rgba(77,150,255,0.08)", border: "1px solid rgba(77,150,255,0.18)" }}>
          <div>
            <p className="font-black text-lg mb-1">Нет нужного товара?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Скинь ссылку с Poizon — выкупим любой товар с платформы.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/" className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }}>
              Весь каталог
            </Link>
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
