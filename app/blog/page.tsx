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
  "Сравнение": "rgba(77,150,255,0.15)",
  "Гайд":      "rgba(120,80,255,0.15)",
  "Подборка":  "rgba(50,180,120,0.15)",
}
const CATEGORY_TEXT: Record<string, string> = {
  "Сравнение": "#4D96FF",
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
    <main className="min-h-screen" style={{ background: "#050C1A", color: "#fff" }}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="max-w-4xl mx-auto px-5 sm:px-8 py-5 flex items-center gap-3">
        <Link href="/" className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
          ← Главная
        </Link>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
        <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>Блог</span>
      </nav>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-24">

        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: "#4D96FF" }}>
            Блог
          </p>
          <h1 className="font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Гайды и сравнения
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Сравниваем модели, объясняем как отличить оригинал и подбираем лучшее с Poizon.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sorted.map((post) => {
            const catBg   = CATEGORY_COLORS[post.category] ?? "rgba(255,255,255,0.06)"
            const catText = CATEGORY_TEXT[post.category]   ?? "rgba(255,255,255,0.5)"
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="block rounded-2xl p-6 transition-all hover:scale-[1.02] hover:border-white/10"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-black px-2.5 py-1 rounded-lg"
                    style={{ background: catBg, color: catText }}>
                    {post.category}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {post.readMin} мин
                  </span>
                </div>
                <h2 className="font-black text-base leading-snug mb-2">{post.title}</h2>
                <p className="text-sm leading-relaxed line-clamp-2"
                  style={{ color: "rgba(255,255,255,0.45)" }}>
                  {post.description}
                </p>
                <p className="text-xs mt-4 font-semibold" style={{ color: "#4D96FF" }}>
                  Читать →
                </p>
              </Link>
            )
          })}
        </div>

        <div className="mt-16 rounded-3xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{ background: "rgba(77,150,255,0.08)", border: "1px solid rgba(77,150,255,0.18)" }}>
          <div>
            <p className="font-black text-lg mb-1">Нашли нужную модель?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Напишите в Telegram — рассчитаем цену с доставкой за 5 минут.
            </p>
          </div>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3 rounded-2xl text-white font-bold text-sm transition-all hover:scale-105"
            style={{ background: "#4D96FF", boxShadow: "0 8px 24px rgba(77,150,255,0.3)" }}>
            Написать в Telegram →
          </a>
        </div>
      </div>
    </main>
  )
}
