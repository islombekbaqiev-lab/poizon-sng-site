import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { SITE_URL, TG_LINK } from "@/lib/site"
import { BRANDS, getBrandBySlug } from "@/lib/brands"
import { breadcrumbList, faqPage, wrapGraph } from "@/lib/seo/jsonld"

type Props = { params: { brand: string } }

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getBrandBySlug(params.brand)
  if (!brand) return {}
  return {
    title: `Купить ${brand.name} с Poizon в Россию — цены 2025 | POIZON SNG`,
    description: brand.description,
    keywords: brand.keywords,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: `${brand.name} с Poizon — оригинал с доставкой в СНГ`,
      description: brand.description,
      url: `${SITE_URL}/brand/${brand.slug}`,
      siteName: "POIZON SNG",
      locale: "ru_RU",
      type: "website",
    },
    alternates: { canonical: `${SITE_URL}/brand/${brand.slug}` },
  }
}

export default function BrandPage({ params }: Props) {
  const brand = getBrandBySlug(params.brand)
  if (!brand) notFound()

  const jsonLd = wrapGraph([
    breadcrumbList([
      { name: "POIZON SNG", item: SITE_URL },
      { name: brand.name, item: `${SITE_URL}/brand/${brand.slug}` },
    ]),
    {
      "@type": "CollectionPage",
      name: `${brand.name} с Poizon`,
      description: brand.description,
      url: `${SITE_URL}/brand/${brand.slug}`,
    },
    faqPage(brand.faq.map((f) => ({ q: f.q, a: f.a }))),
  ])

  return (
    <main className="min-h-screen" style={{ background: "var(--page)", color: "var(--ink)" }}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="max-w-4xl mx-auto px-5 sm:px-8 py-5 flex items-center gap-3">
        <Link href="/" className="text-sm font-semibold" style={{ color: "var(--ink-3)" }}>
          Главная
        </Link>
        <span style={{ color: "var(--ink-5)" }}>/</span>
        <span className="text-sm" style={{ color: "var(--ink-2)" }}>{brand.name}</span>
      </nav>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-24">

        {/* Header */}
        <div className="mb-12">
          <p className="eyebrow mb-3">
            Бренд
          </p>
          <h1 className="font-display leading-[1.0] mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
            {brand.tagline}
          </h1>
          <p className="text-base max-w-2xl leading-relaxed" style={{ color: "var(--ink-3)" }}>
            {brand.description}
          </p>
        </div>

        {/* Prices table */}
        <div className="mb-14">
          <h2 className="font-bold text-xl mb-5">Популярные модели и цены</h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--line)" }}>
            <div className="grid grid-cols-3 px-5 py-3 text-xs font-bold uppercase tracking-wider"
              style={{ background: "var(--card)", color: "var(--ink-4)" }}>
              <span>Модель</span>
              <span>Цена на Poizon</span>
              <span>Итого в РФ</span>
            </div>
            {brand.models.map((m, i) => (
              <div key={i}
                className="grid grid-cols-3 px-5 py-4 items-center"
                style={{
                  borderTop: "1px solid var(--line)",
                  background: i % 2 === 0 ? "var(--line)" : "transparent",
                }}>
                <div>
                  <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                    {m.name}
                  </span>
                  {m.note && (
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded-md font-bold"
                      style={{ background: "var(--accent-sf)", color: "var(--accent)" }}>
                      {m.note}
                    </span>
                  )}
                </div>
                <span className="text-sm" style={{ color: "var(--ink-3)" }}>{m.priceCny}</span>
                <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>{m.priceRub}</span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--ink-4)" }}>
            * Цены актуальны на {new Date().toLocaleDateString("ru-RU", { month: "long", year: "numeric" })}. Итоговая цена = Poizon + авиадоставка + комиссия байера.
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-14"
          style={{ background: "var(--accent-sf)", border: "1px solid var(--accent-ln)" }}>
          <div>
            <p className="font-bold text-lg mb-1">Заказать {brand.name} с Poizon</p>
            <p className="text-sm" style={{ color: "var(--ink-3)" }}>
              Напишите модель и размер — рассчитаем точную цену с доставкой за 5 минут.
            </p>
          </div>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3 rounded-2xl text-white font-bold text-sm transition-all hover:scale-105"
            style={{ background: "var(--ink-block)", boxShadow: "0 8px 24px rgba(17,17,19,0.16)" }}>
            Написать в Telegram →
          </a>
        </div>

        {/* FAQ */}
        <div className="mb-14">
          <h2 className="font-bold text-xl mb-5">Частые вопросы</h2>
          <div className="space-y-3">
            {brand.faq.map((f, i) => (
              <div key={i} className="rounded-2xl p-5"
                style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
                <p className="font-bold text-sm mb-2">{f.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Size guide link */}
        {brand.sizeGuideSlug && (
          <div className="mb-14">
            <Link href={`/size-guide/${brand.sizeGuideSlug}`}
              className="flex items-center justify-between rounded-2xl px-6 py-4 transition-all hover:scale-[1.01]"
              style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
              <div>
                <p className="font-bold text-sm">Размерная сетка {brand.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--ink-3)" }}>
                  Таблица соответствия US / EU / UK / CM
                </p>
              </div>
              <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>Смотреть →</span>
            </Link>
          </div>
        )}

        {/* Related brands */}
        {brand.relatedBrands.length > 0 && (
          <div>
            <h2 className="eyebrow mb-4"
              style={{ color: "var(--ink-4)" }}>
              Другие бренды
            </h2>
            <div className="flex flex-wrap gap-2">
              {brand.relatedBrands.map((slug) => {
                const rel = BRANDS.find((b) => b.slug === slug)
                if (!rel) return null
                return (
                  <Link key={slug} href={`/brand/${slug}`}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                    style={{ background: "var(--card)", border: "1px solid var(--line)", color: "var(--ink-2)" }}>
                    {rel.name} →
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
