import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { SITE_URL, TG_LINK } from "@/lib/site"
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog"
import { breadcrumbList, faqPage, wrapGraph } from "@/lib/seo/jsonld"

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | POIZON SNG`,
    description: post.description,
    keywords: post.keywords,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: "POIZON SNG",
      locale: "ru_RU",
      type: "article",
      publishedTime: post.date,
    },
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
  }
}

const CATEGORY_TEXT: Record<string, string> = {
  "Сравнение": "#4D96FF",
  "Гайд":      "#A78BFA",
  "Подборка":  "#34D399",
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const nodes: any[] = [
    breadcrumbList([
      { name: "POIZON SNG", item: SITE_URL },
      { name: "Блог", item: `${SITE_URL}/blog` },
      { name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ]),
    {
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      publisher: {
        "@type": "Organization",
        name: "POIZON SNG",
        url: SITE_URL,
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    },
  ]
  if (post.faq?.length) nodes.push(faqPage(post.faq.map((f) => ({ q: f.q, a: f.a }))))
  const jsonLd = wrapGraph(nodes)

  const catColor = CATEGORY_TEXT[post.category] ?? "rgba(255,255,255,0.5)"

  return (
    <main className="min-h-screen" style={{ background: "#050C1A", color: "#fff" }}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="max-w-3xl mx-auto px-5 sm:px-8 py-5 flex items-center gap-3">
        <Link href="/" className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
          Главная
        </Link>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
        <Link href="/blog" className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
          Блог
        </Link>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
        <span className="text-sm truncate max-w-[160px]" style={{ color: "rgba(255,255,255,0.7)" }}>
          {post.title}
        </span>
      </nav>

      <article className="max-w-3xl mx-auto px-5 sm:px-8 pb-24">

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-black px-2.5 py-1 rounded-lg"
              style={{ background: "rgba(77,150,255,0.1)", color: catColor }}>
              {post.category}
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              {post.readMin} мин читать
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <h1 className="font-black leading-tight mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.8rem)" }}>
            {post.title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "42rem" }}>
            {post.description}
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-8 mb-14">
          {post.sections.map((sec, i) => (
            <div key={i}>
              {sec.heading && (
                <h2 className="font-black text-xl mb-3">{sec.heading}</h2>
              )}
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-14"
          style={{ background: "rgba(77,150,255,0.08)", border: "1px solid rgba(77,150,255,0.18)" }}>
          <div>
            <p className="font-black text-lg mb-1">Заказать с Poizon</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Напишите модель и размер — рассчитаем цену с доставкой за 5 минут.
            </p>
          </div>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3 rounded-2xl text-white font-bold text-sm transition-all hover:scale-105"
            style={{ background: "#4D96FF", boxShadow: "0 8px 24px rgba(77,150,255,0.3)" }}>
            Написать в Telegram →
          </a>
        </div>

        {/* FAQ */}
        {post.faq && post.faq.length > 0 && (
          <div className="mb-14">
            <h2 className="font-black text-xl mb-5">Частые вопросы</h2>
            <div className="space-y-3">
              {post.faq.map((f, i) => (
                <div key={i} className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="font-bold text-sm mb-2">{f.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other posts */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] mb-4"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            Другие статьи
          </h2>
          <div className="flex flex-col gap-3">
            {BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}
                className="flex items-center justify-between rounded-xl px-4 py-3 transition-all hover:scale-[1.01]"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-sm font-semibold leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {p.title}
                </span>
                <span className="text-xs ml-4 flex-shrink-0" style={{ color: "#4D96FF" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
