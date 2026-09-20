import { Metadata } from "next"
import Link from "next/link"
import { SITE_URL, TG_LINK } from "@/lib/site"
import { BLOG_POSTS } from "@/lib/blog"
import { breadcrumbList, wrapGraph } from "@/lib/seo/jsonld"

export const metadata: Metadata = {
  title: "Блог о кроссовках и байере Poizon | POIZON SNG",
  description:
    "Гайды, сравнения и советы по покупке оригинальных кроссовок с Poizon (得物). Nike, Adidas, Jordan, New Balance — как выбрать и заказать в Россию.",
  keywords: [
    "блог кроссовки", "гайд кроссовки 2025", "купить оригинал кроссовки",
    "байер Poizon гайд", "сравнение кроссовок", "как выбрать кроссовки",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Блог POIZON SNG — гайды и сравнения кроссовок",
    description: "Полезные статьи о кроссовках: сравнения моделей, как проверить оригинал, лучшие покупки с Poizon.",
    url: `${SITE_URL}/blog`,
    siteName: "POIZON SNG",
    locale: "ru_RU",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/blog` },
}

const CATEGORY_COLORS: Record<string, string> = {
  "Сравнение": "var(--accent-sf)",
  "Гайд":      "rgba(120,80,255,0.15)",
  "Подборка":  "rgba(50,180,120,0.15)",
}
const CATEGORY_TEXT: Record<string, string> = {
  "Сравнение": "var(--accent)",
  "Гайд":      "#A78BFA",
  "Подборка":  "#34D399",
}

const jsonLd = wrapGraph([
  breadcrumbList([
    { name: "POIZON SNG", item: SITE_URL },
    { name: "Блог", item: `${SITE_URL}/blog` },
  ]),
])

export default function BlogIndexPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <main className="min-h-screen" style={{ background: "var(--page)", color: "var(--ink)" }}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="max-w-4xl mx-auto px-5 sm:px-8 py-5 flex items-center gap-3">
        <Link href="/" className="text-sm font-semibold" style={{ color: "var(--ink-3)" }}>
          ← Главная
        </Link>
        <span style={{ color: "var(--ink-5)" }}>/</span>
        <span className="text-sm" style={{ color: "var(--ink)" }}>Блог</span>
      </nav>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-24">

        <div className="mb-12">
          <p className="eyebrow mb-3">
            Блог
          </p>
          <h1 className="font-display leading-[1.0] mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Гайды и сравнения
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "var(--ink-3)" }}>
            Сравниваем модели, объясняем как отличить оригинал и подбираем лучшее с Poizon.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sorted.map((post) => {
            const catBg   = CATEGORY_COLORS[post.category] ?? "var(--line)"
            const catText = CATEGORY_TEXT[post.category]   ?? "var(--ink-3)"
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="block rounded-2xl p-6 transition-all hover:scale-[1.02] hover:border-[var(--line-2)]"
                style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{ background: catBg, color: catText }}>
                    {post.category}
                  </span>
                  <span className="text-xs" style={{ color: "var(--ink-4)" }}>
                    {post.readMin} мин
                  </span>
                </div>
                <h2 className="font-bold text-base leading-snug mb-2">{post.title}</h2>
                <p className="text-sm leading-relaxed line-clamp-2"
                  style={{ color: "var(--ink-3)" }}>
                  {post.description}
                </p>
                <p className="text-xs mt-4 font-semibold" style={{ color: "var(--accent)" }}>
                  Читать →
                </p>
              </Link>
            )
          })}
        </div>

        <div className="mt-16 rounded-3xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{ background: "var(--accent-sf)", border: "1px solid var(--accent-ln)" }}>
          <div>
            <p className="font-bold text-lg mb-1">Нашли нужную модель?</p>
            <p className="text-sm" style={{ color: "var(--ink-3)" }}>
              Напишите в Telegram — рассчитаем цену с доставкой за 5 минут.
            </p>
          </div>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3 rounded-2xl text-white font-bold text-sm transition-all hover:scale-105"
            style={{ background: "var(--ink-block)", boxShadow: "0 8px 24px rgba(17,17,19,0.16)" }}>
            Написать в Telegram →
          </a>
        </div>
      </div>
    </main>
  )
}
