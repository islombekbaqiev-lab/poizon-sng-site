import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getProducts, getProductById, type Product } from "@/lib/catalog"
import { SITE_URL, TG_LINK } from "@/lib/site"
import { breadcrumbList, productLd, wrapGraph } from "@/lib/seo/jsonld"
import BuyButton from "@/components/BuyButton"
import AddToCart from "@/components/AddToCart"
import Price from "@/components/Price"
import { fmtFull, sitePrice } from "@/lib/pricing"
import { poizonImg } from "@/lib/img"

async function getProduct(slug: string): Promise<Product | null> {
  return getProductById(slug) as Product | null
}

export async function generateStaticParams() {
  // Витрина ~200 товаров — собираем все страницы заранее.
  return getProducts().map(p => ({ slug: p.id }))
}

export const dynamicParams = true

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const p = await getProduct(slug)
  if (!p) return { title: "Товар не найден — POIZON SNG" }

  const price = `от ${fmtFull(sitePrice(p.priceRUB, "RU"))}`
  const title = `${p.name} — купить оригинал | POIZON SNG`
  const desc  = `${p.name} с Poizon (得物) под ключ: помощь с размером, выкуп, фото перед отправкой и доставка в страны СНГ. ${price}. Трек-номер на каждый заказ.`

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
    // Без своего twitter-блока наследуется общий из layout с фото AF1 —
    // и Telegram показывал в превью кроссовки на любом товаре.
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: p.image ? [p.image] : [],
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


  const jsonLd = wrapGraph([
    breadcrumbList([
      { name: "POIZON SNG", item: SITE_URL },
      { name: "Каталог", item: `${SITE_URL}/#catalog` },
      { name: p.name, item: `${SITE_URL}/product/${slug}` },
    ]),
    productLd({
      name: p.name,
      brand: p.brand,
      image: p.image,
      description:
        `Товар ${p.name} с платформы Poizon (得物) с премиум‑сопровождением: помощь с размером, выкуп, фото перед отправкой и доставка в СНГ.`,
      priceRUB: sitePrice(p.priceRUB, "RU").amount,
      sellerName: "POIZON SNG",
      article: p.article,
    }),
  ])

  return (
    <main className="min-h-screen bg-[var(--page)]" style={{ color: "var(--ink)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center gap-3">
        <a href="/" className="text-sm font-semibold" style={{ color: "var(--ink-3)" }}>
          ← Каталог
        </a>
        <span style={{ color: "var(--ink-5)" }}>/</span>
        <span className="text-sm truncate" style={{ color: "var(--ink-2)", maxWidth: "200px" }}>
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
              ? <img src={poizonImg(p.image, 828)} alt={p.name} fetchPriority="high"
                  srcSet={`${poizonImg(p.image, 480)} 480w, ${poizonImg(p.image, 828)} 828w, ${poizonImg(p.image, 1080)} 1080w`}
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="w-full h-full object-contain p-10"
                  style={{ maxHeight: "520px" }} />
              : <div className="w-full h-full flex items-center justify-center"
                  style={{ color: "#ccc", fontSize: "14px" }}>{p.brand}</div>
            }
          </div>

          {/* Info */}
          <div className="py-4">
            {p.tag && (
              <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider"
                style={{
                  background: p.tag === "Лимит" ? "var(--danger)" : "var(--ink-block)",
                  color: "#fff",
                }}>
                {p.tag}
              </span>
            )}

            <p className="eyebrow mb-2"
              style={{ color: "var(--accent)" }}>{p.brand}</p>

            <h1 className="font-display leading-[1.02] mb-6"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
              {p.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-sm" style={{ color: "var(--ink-4)" }}>от</span>
              <Price priceRUB={p.priceRUB} className="text-3xl font-bold" />
            </div>
            <p className="text-xs mb-3" style={{ color: "var(--ink-4)" }}>
              Цена за самый доступный размер, с выкупом и сопровождением. Доставка считается отдельно — видно в корзине.
            </p>
            {p.article && (
              <p className="text-xs mb-8" style={{ color: "var(--ink-3)" }}>
                Артикул: <span className="font-semibold" style={{ color: "var(--ink)" }}>{p.article}</span>
              </p>
            )}

            {/* CTA */}
            <BuyButton product={p}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--ink-block)", boxShadow: "0 8px 28px rgba(17,17,19,0.16)" }}>
              Купить →
            </BuyButton>
            <div className="mt-3">
              <AddToCart variant="full"
                item={{ id: p.id, name: p.name, article: p.article, image: p.image, category: p.category, priceRUB: p.priceRUB }} />
            </div>
            <p className="text-[11px] text-center mt-2 mb-1" style={{ color: "var(--ink-4)" }}>
              Откроется чат с @PoizonAdvisor — товар и цена уже в сообщении
            </p>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                ["✅", "100% оригинал", "Поиzon проверяет каждый товар"],
                ["✈️", "Авиа 3–5 дней", "Быстрая доставка в СНГ"],
                ["📦", "Трек-номер", "Отслеживание на каждом этапе"],
                ["📸", "Фото перед отправкой", "Проверим и покажем состояние"],
              ].map(([icon, title, sub]) => (
                <div key={title} className="rounded-2xl p-4"
                  style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
                  <p className="text-lg mb-1">{icon}</p>
                  <p className="text-xs font-bold mb-0.5">{title}</p>
                  <p className="text-[10px]" style={{ color: "var(--ink-4)" }}>{sub}</p>
                </div>
              ))}
            </div>

            {/* Service note */}
            <div
              className="mt-6 rounded-2xl p-4"
              style={{ background: "var(--card)", border: "1px solid var(--line)" }}
            >
              <p className="text-xs font-bold mb-1.5">Премиум‑сопровождение включено</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--ink-3)" }}>
                Подскажем по размеру/посадке, проверим наличие и цену, выкупим на Poizon и отправим с треком.
              </p>
            </div>
          </div>
        </div>

        {/* More products CTA */}
        <div className="mt-16 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "var(--accent-sf)", border: "1px solid var(--accent-ln)" }}>
          <div>
            <p className="font-bold text-lg mb-1">Нужен другой товар с Poizon?</p>
            <p className="text-sm" style={{ color: "var(--ink-3)" }}>
              Скинь ссылку с Poizon — выкупим любой товар с платформы.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="/" className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: "var(--card-alt)", color: "var(--ink)" }}>
              Каталог
            </a>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-105"
              style={{ background: "var(--ink-block)" }}>
              Telegram →
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
