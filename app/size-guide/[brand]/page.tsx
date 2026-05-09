import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"

const SITE_URL = "https://poizonsng.com"
const TG_LINK  = "https://t.me/PoizonAdvisor"

interface BrandGuide {
  name: string
  slug: string
  tip: string
  categories: string[]
  tables: {
    title: string
    headers: string[]
    rows: string[][]
  }[]
}

const BRANDS: Record<string, BrandGuide> = {
  nike: {
    name: "Nike",
    slug: "nike",
    tip: "Nike обычно соответствует стандартному размеру. Кроссовки с широкой колодкой (Air Max, Dunk) можно брать на 0.5 меньше, беговые (Pegasus, Vaporfly) — на 0.5 больше для комфорта.",
    categories: ["Кроссовки", "Кеды", "Беговые", "Баскетбольные"],
    tables: [
      {
        title: "Мужские / Унисекс",
        headers: ["EU", "US (M)", "UK", "CM"],
        rows: [
          ["38", "5.5", "5", "24"],
          ["38.5", "6", "5.5", "24"],
          ["39", "6.5", "6", "24.5"],
          ["40", "7", "6", "25"],
          ["40.5", "7.5", "6.5", "25.5"],
          ["41", "8", "7", "26"],
          ["42", "8.5", "7.5", "26.5"],
          ["42.5", "9", "8", "27"],
          ["43", "9.5", "8.5", "27.5"],
          ["44", "10", "9", "28"],
          ["44.5", "10.5", "9.5", "28.5"],
          ["45", "11", "10", "29"],
          ["45.5", "11.5", "10.5", "29.5"],
          ["46", "12", "11", "30"],
          ["47", "12.5", "11.5", "30.5"],
          ["47.5", "13", "12", "31"],
        ],
      },
      {
        title: "Женские",
        headers: ["EU", "US (W)", "UK", "CM"],
        rows: [
          ["35.5", "5", "2.5", "22"],
          ["36", "5.5", "3", "22.5"],
          ["36.5", "6", "3.5", "23"],
          ["37.5", "6.5", "4", "23.5"],
          ["38", "7", "4.5", "24"],
          ["38.5", "7.5", "5", "24"],
          ["39", "8", "5.5", "24.5"],
          ["40", "8.5", "6", "25"],
          ["40.5", "9", "6.5", "25.5"],
          ["41", "9.5", "7", "26"],
          ["42", "10", "7.5", "26.5"],
          ["42.5", "10.5", "8", "27"],
          ["43", "11", "8.5", "27.5"],
        ],
      },
    ],
  },
  adidas: {
    name: "Adidas",
    slug: "adidas",
    tip: "Adidas в целом соответствует стандарту. Samba, Gazelle, Stan Smith — точное попадание. Yeezy Boost 350 V2 и 700 лучше брать на 0.5 больше, они зауженные. Ultra Boost — на свой размер.",
    categories: ["Кроссовки", "Кеды", "Беговые", "Yeezy"],
    tables: [
      {
        title: "Мужские / Унисекс",
        headers: ["EU", "US (M)", "UK", "CM"],
        rows: [
          ["36", "4", "3.5", "22"],
          ["36.5", "4.5", "4", "22.5"],
          ["37.5", "5", "4.5", "23"],
          ["38", "5.5", "5", "23.5"],
          ["38.5", "6", "5.5", "24"],
          ["39.5", "6.5", "6", "24.5"],
          ["40", "7", "6.5", "25"],
          ["40.5", "7.5", "7", "25.5"],
          ["41.5", "8", "7.5", "26"],
          ["42", "8.5", "8", "26.5"],
          ["42.5", "9", "8.5", "27"],
          ["43.5", "9.5", "9", "27.5"],
          ["44", "10", "9.5", "28"],
          ["44.5", "10.5", "10", "28.5"],
          ["45.5", "11", "10.5", "29"],
          ["46", "11.5", "11", "29.5"],
          ["46.5", "12", "11.5", "30"],
          ["47.5", "13", "12.5", "31"],
        ],
      },
      {
        title: "Женские",
        headers: ["EU", "US (W)", "UK", "CM"],
        rows: [
          ["35.5", "4", "3", "22"],
          ["36", "4.5", "3.5", "22.5"],
          ["36.5", "5", "4", "23"],
          ["37.5", "5.5", "4.5", "23.5"],
          ["38", "6", "5", "24"],
          ["38.5", "6.5", "5.5", "24.5"],
          ["39.5", "7", "6", "25"],
          ["40", "7.5", "6.5", "25.5"],
          ["40.5", "8", "7", "26"],
          ["41.5", "8.5", "7.5", "26.5"],
          ["42", "9", "8", "27"],
          ["42.5", "9.5", "8.5", "27.5"],
        ],
      },
    ],
  },
  jordan: {
    name: "Jordan",
    slug: "jordan",
    tip: "Jordan Brand использует ту же размерную сетку что и Nike. Air Jordan 1 Low/Mid/High — на свой размер. AJ4 — можно взять на 0.5 меньше, широкая колодка. AJ11 — точный размер. AJ3 — на свой.",
    categories: ["Air Jordan 1", "Air Jordan 3", "Air Jordan 4", "Air Jordan 11"],
    tables: [
      {
        title: "Мужские / Унисекс",
        headers: ["EU", "US (M)", "UK", "CM"],
        rows: [
          ["38", "5.5", "5", "24"],
          ["38.5", "6", "5.5", "24"],
          ["39", "6.5", "6", "24.5"],
          ["40", "7", "6", "25"],
          ["40.5", "7.5", "6.5", "25.5"],
          ["41", "8", "7", "26"],
          ["42", "8.5", "7.5", "26.5"],
          ["42.5", "9", "8", "27"],
          ["43", "9.5", "8.5", "27.5"],
          ["44", "10", "9", "28"],
          ["44.5", "10.5", "9.5", "28.5"],
          ["45", "11", "10", "29"],
          ["45.5", "11.5", "10.5", "29.5"],
          ["46", "12", "11", "30"],
          ["47", "12.5", "11.5", "30.5"],
          ["47.5", "13", "12", "31"],
        ],
      },
      {
        title: "Женские (GS / Grade School)",
        headers: ["EU", "US (W)", "UK", "CM"],
        rows: [
          ["35.5", "5", "2.5", "22"],
          ["36", "5.5", "3", "22.5"],
          ["36.5", "6", "3.5", "23"],
          ["37.5", "6.5", "4", "23.5"],
          ["38", "7", "4.5", "24"],
          ["38.5", "7.5", "5", "24"],
          ["39", "8", "5.5", "24.5"],
          ["40", "8.5", "6", "25"],
          ["40.5", "9", "6.5", "25.5"],
        ],
      },
    ],
  },
  "new-balance": {
    name: "New Balance",
    slug: "new-balance",
    tip: "New Balance исторически бежит маломерно — рекомендуется брать на 0.5 больше обычного размера. Это особенно актуально для 550, 574, 990, 993. Модели 327 — на свой размер. 1906R — на 0.5 больше.",
    categories: ["550", "574", "990v5", "993", "327", "1906R"],
    tables: [
      {
        title: "Мужские / Унисекс (рекомендуется +0.5)",
        headers: ["EU", "US (M)", "UK", "CM"],
        rows: [
          ["36", "4", "3.5", "22.5"],
          ["37", "4.5", "4", "23"],
          ["37.5", "5", "4.5", "23.5"],
          ["38", "5.5", "5", "24"],
          ["38.5", "6", "5.5", "24"],
          ["39.5", "6.5", "6", "24.5"],
          ["40", "7", "6.5", "25"],
          ["40.5", "7.5", "7", "25.5"],
          ["41", "7.5", "7.5", "26"],
          ["41.5", "8", "8", "26.5"],
          ["42", "8.5", "8", "26.5"],
          ["42.5", "9", "8.5", "27"],
          ["43", "9.5", "9", "27.5"],
          ["44", "10", "9.5", "28"],
          ["44.5", "10.5", "10", "28.5"],
          ["45", "11", "10.5", "29"],
          ["45.5", "11.5", "11", "29.5"],
          ["46", "12", "11.5", "30"],
        ],
      },
      {
        title: "Женские",
        headers: ["EU", "US (W)", "UK", "CM"],
        rows: [
          ["35", "5", "2.5", "22"],
          ["35.5", "5.5", "3", "22.5"],
          ["36", "6", "3.5", "23"],
          ["36.5", "6.5", "4", "23.5"],
          ["37", "7", "4.5", "23.5"],
          ["37.5", "7.5", "5", "24"],
          ["38", "8", "5.5", "24.5"],
          ["38.5", "8.5", "6", "25"],
          ["39", "9", "6.5", "25.5"],
          ["39.5", "9.5", "7", "26"],
          ["40", "10", "7.5", "26.5"],
          ["40.5", "10.5", "8", "27"],
        ],
      },
    ],
  },
}

const OTHER_BRANDS = [
  { slug: "nike",        label: "Nike"         },
  { slug: "adidas",      label: "Adidas"       },
  { slug: "jordan",      label: "Jordan"       },
  { slug: "new-balance", label: "New Balance"  },
]

export async function generateStaticParams() {
  return Object.keys(BRANDS).map(slug => ({ brand: slug }))
}

export const dynamicParams = false

export async function generateMetadata(
  { params }: { params: Promise<{ brand: string }> }
): Promise<Metadata> {
  const { brand } = await params
  const g = BRANDS[brand]
  if (!g) return { title: "Не найдено" }

  const title = `Размерная сетка ${g.name} — таблица размеров EU/US/UK/CM | POIZON SNG`
  const desc  = `Таблица размеров ${g.name} для мужчин и женщин. Конвертер EU, US, UK, сантиметры. ${g.tip.slice(0, 100)}…`

  return {
    title,
    description: desc,
    keywords: [
      `размерная сетка ${g.name}`,
      `таблица размеров ${g.name}`,
      `размеры ${g.name} EU US`,
      `${g.name} размер сантиметры`,
      `купить ${g.name} оригинал СНГ`,
    ],
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title, description: desc,
      url: `${SITE_URL}/size-guide/${brand}`,
      siteName: "POIZON SNG", locale: "ru_RU", type: "article",
    },
    alternates: { canonical: `${SITE_URL}/size-guide/${brand}` },
  }
}

export default async function SizeGuidePage(
  { params }: { params: Promise<{ brand: string }> }
) {
  const { brand } = await params
  const g = BRANDS[brand]
  if (!g) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "POIZON SNG", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Размерные сетки", item: `${SITE_URL}/size-guide/${brand}` },
          { "@type": "ListItem", position: 3, name: g.name, item: `${SITE_URL}/size-guide/${brand}` },
        ],
      },
      {
        "@type": "Article",
        headline: `Размерная сетка ${g.name}`,
        description: `Таблица размеров ${g.name}: EU, US, UK, CM для мужчин и женщин`,
        author: { "@type": "Organization", name: "POIZON SNG" },
        publisher: { "@type": "Organization", name: "POIZON SNG", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/size-guide/${brand}`,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#050C1A]" style={{ color: "#fff" }}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <nav className="max-w-4xl mx-auto px-5 sm:px-8 py-5 flex items-center gap-3">
        <Link href="/" className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
          ← Главная
        </Link>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
        <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
          Размерная сетка {g.name}
        </span>
      </nav>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: "#4D96FF" }}>
            Размерная сетка
          </p>
          <h1 className="font-black leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            {g.name}
          </h1>
          <p className="text-sm leading-relaxed mb-4 max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
            Таблица конвертации EU → US → UK → CM для мужских и женских моделей.
          </p>

          {/* Tip */}
          <div className="rounded-2xl p-4 mb-4"
            style={{ background: "rgba(77,150,255,0.08)", border: "1px solid rgba(77,150,255,0.2)" }}>
            <p className="text-xs font-black uppercase tracking-[0.15em] mb-2" style={{ color: "#4D96FF" }}>
              Совет по подбору размера
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              {g.tip}
            </p>
          </div>

          {/* Популярные модели */}
          <div className="flex flex-wrap gap-2">
            {g.categories.map(c => (
              <span key={c} className="text-xs px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Size tables */}
        {g.tables.map(table => (
          <div key={table.title} className="mb-10">
            <h2 className="text-base font-black mb-4">{table.title}</h2>
            <div className="overflow-x-auto rounded-2xl"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(77,150,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {table.headers.map(h => (
                      <th key={h} className="px-4 py-3 text-left font-black text-xs uppercase tracking-wider"
                        style={{ color: "#4D96FF" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, i) => (
                    <tr key={i}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                      }}>
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2.5 font-semibold"
                          style={{ color: j === 0 ? "#fff" : "rgba(255,255,255,0.55)" }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="rounded-3xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5 mb-12"
          style={{ background: "rgba(77,150,255,0.08)", border: "1px solid rgba(77,150,255,0.18)" }}>
          <div>
            <p className="font-black text-lg mb-1">Определились с размером?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Напишите в Telegram — поможем выбрать и выкупим с Poizon.
            </p>
          </div>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3 rounded-2xl text-white font-bold text-sm transition-all hover:scale-105"
            style={{ background: "#4D96FF", boxShadow: "0 8px 24px rgba(77,150,255,0.3)" }}>
            Написать в Telegram →
          </a>
        </div>

        {/* Other brands */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            Другие бренды
          </h2>
          <div className="flex flex-wrap gap-2">
            {OTHER_BRANDS.filter(b => b.slug !== brand).map(b => (
              <Link key={b.slug} href={`/size-guide/${b.slug}`}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.7)" }}>
                {b.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
