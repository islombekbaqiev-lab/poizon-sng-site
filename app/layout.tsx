import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import NoiseOverlay from "@/components/NoiseOverlay"
import { Analytics } from "@vercel/analytics/next"
import { SITE_URL } from "@/lib/site"
import { getProductIndex } from "@/lib/productIndex"
import { faqPage, wrapGraph } from "@/lib/seo/jsonld"

const YM_ID = 109131869

const OG_IMAGE = "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20241222%2Faa3efedd7ed0417caaf8c8693e7e673d.jpg&w=1200&q=85&fit=contain&fmt=auto"

const FALLBACK_KEYWORDS = [
  "Poizon", "байер Poizon", "кроссовки из Китая",
  "купить кроссовки СНГ", "оригинальные кроссовки доставка",
  "得物 СНГ", "одежда из Китая оригинал",
  "купить Nike оригинал", "купить Adidas из Китая", "байер Китай доставка",
]

const FALLBACK_DESC =
  "Купить кроссовки, одежду и сумки с Poizon (得物) с доставкой в Россию, Казахстан, Беларусь. Оригиналы под ключ: выкуп, фото, трек-номер. Авиа от 3 дней."

function buildKeywords(products: { brand?: string; name: string }[]): string[] {
  const intents = ["купить", "заказать", "оригинал"]
  const geos = ["Россия", "Казахстан", "СНГ"]
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))] as string[]
  const base = [...FALLBACK_KEYWORDS]
  const brandKw = brands.slice(0, 6).flatMap(b => intents.slice(0, 2).map(i => `${i} ${b}`))
  const geoKw = brands.slice(0, 4).flatMap(b => geos.slice(0, 2).map(g => `${b} ${g}`))
  return [...new Set([...base, ...brandKw, ...geoKw])].slice(0, 10)
}

function buildDescription(products: { brand?: string; name: string }[]): string {
  const brands = [...new Set(products.slice(0, 6).map(p => p.brand).filter(Boolean))].join(", ")
  return `Байер с Poizon. ${products.length}+ товаров: ${brands}. Оригиналы с доставкой в Россию, Казахстан, Беларусь. Авиа от 3 дней.`
}

export async function generateMetadata(): Promise<Metadata> {
  let keywords = FALLBACK_KEYWORDS
  let desc = FALLBACK_DESC

  try {
    const index = await getProductIndex()
    const products = index?.products ?? []
    if (products.length > 0) {
      keywords = buildKeywords(products)
      desc = buildDescription(products)
    }
  } catch {}

  return {
    title: "POIZON SNG — Оригинальные товары из Китая",
    description: desc,
    keywords,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: "POIZON SNG — Оригинальные товары из Китая",
      description: desc,
      url: SITE_URL,
      siteName: "POIZON SNG",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "POIZON SNG" }],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "POIZON SNG — Оригинальные товары из Китая",
      description: desc,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: { canonical: SITE_URL },
  }
}

const jsonLd = wrapGraph([
  {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "POIZON SNG",
    url: SITE_URL,
    logo: OG_IMAGE,
    description:
      "Выкуп и доставка с Poizon (得物) в СНГ под ключ: помощь с размером, фото перед отправкой, трек-номер.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Russian", "Kazakh"],
    },
    areaServed: ["RU", "KZ", "BY", "TJ", "UZ", "AM", "GE", "AZ"],
  },
  {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "POIZON SNG",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "ru-RU",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/#catalog`,
      "query-input": "required name=search_term_string",
    },
  },
  faqPage([
    {
      q: "Как убедиться, что товар оригинальный?",
      a: "Poizon (得物) — крупнейшая платформа аутентификации Китая. Каждый товар проходит экспертизу перед отправкой. В комплекте идёт чек Poizon с QR-кодом — вы можете проверить подлинность прямо в приложении.",
    },
    {
      q: "Что входит в премиум‑сопровождение?",
      a: "Мы проверяем наличие и цену, помогаем с размером, выкупаем на Poizon, делаем фото/проверку перед отправкой и выдаём трек-номер. На связи до получения.",
    },
    {
      q: "Сколько стоит доставка?",
      a: "Авиа (3–5 дней) — 225 ¥/кг, Экспресс (10–12 дней) — 173 ¥/кг, Стандарт (~25 дней) — 77 ¥/кг. Точная стоимость зависит от веса и объёма.",
    },
    {
      q: "Можно ли заказать товар, которого нет в каталоге?",
      a: "Да — это основная услуга. Скиньте ссылку с Poizon или название товара в Telegram, и мы выкупим всё что продаётся на платформе.",
    },
  ]),
])

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="yandex-verification" content="9363a32cf61007d4" />
        <meta name="google-site-verification" content="dvUw6mvHVsCIfUr1M-kVZGQp-cgXfWXVTy9x9BNjm58" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NoiseOverlay />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        {/* Яндекс Метрика */}
        <Script id="ym-init" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
          ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
        `}</Script>
        <noscript>
          <div><img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{position:"absolute",left:"-9999px"}} alt="" /></div>
        </noscript>
      </body>
    </html>
  )
}
