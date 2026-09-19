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
  "Сравнение": "var(--accent)",
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

  const catColor = CATEGORY_TEXT[post.category] ?? "var(--ink-3)"

  return (
    <main className="min-h-screen" style={{ background: "var(--page)", color: "var(--ink)" }}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="max-w-3xl mx-auto px-5 sm:px-8 py-5 flex items-center gap-3">
        <Link href="/" className="text-sm font-semibold" style={{ color: "var(--ink-3)" }}>
          Главная
        </Link>
        <span style={{ color: "var(--ink-5)" }}>/</span>
        <Link href="/blog" className="text-sm font-semibold" style={{ color: "var(--ink-3)" }}>
          Блог
        </Link>
        <span style={{ color: "var(--ink-5)" }}>/</span>
        <span className="text-sm truncate max-w-[160px]" style={{ color: "var(--ink-2)" }}>
          {post.title}
        </span>
      </nav>

      <article className="max-w-3xl mx-auto px-5 sm:px-8 pb-24">

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-black px-2.5 py-1 rounded-lg"
              style={{ background: "var(--accent-sf)", color: catColor }}>
              {post.category}
            </span>
            <span className="text-xs" style={{ color: "var(--ink-4)" }}>
              {post.readMin} мин читать
            </span>
            <span className="text-xs" style={{ color: "var(--ink-4)" }}>
              {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <h1 className="font-black leading-tight mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.8rem)" }}>
            {post.title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--ink-3)", maxWidth: "42rem" }}>
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
              <p className="text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-14"
          style={{ background: "var(--accent-sf)", border: "1px solid var(--accent-ln)" }}>
          <div>
            <p className="font-black text-lg mb-1">Заказать с Poizon</p>
            <p className="text-sm" style={{ color: "var(--ink-3)" }}>
              Напишите модель и размер — рассчитаем цену с доставкой за 5 минут.
            </p>
          </div>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3 rounded-2xl text-white font-bold text-sm transition-all hover:scale-105"
            style={{ background: "var(--ink-block)", boxShadow: "0 8px 24px rgba(17,17,19,0.16)" }}>
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
                  style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
                  <p className="font-bold text-sm mb-2">{f.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other posts */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] mb-4"
            style={{ color: "var(--ink-4)" }}>
            Другие статьи
          </h2>
          <div className="flex flex-col gap-3">
            {BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}
                className="flex items-center justify-between rounded-xl px-4 py-3 transition-all hover:scale-[1.01]"
                style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
                <span className="text-sm font-semibold leading-snug" style={{ color: "var(--ink-2)" }}>
                  {p.title}
                </span>
                <span className="text-xs ml-4 flex-shrink-0" style={{ color: "var(--accent)" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
