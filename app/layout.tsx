import type { Metadata } from "next"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import NoiseOverlay from "@/components/NoiseOverlay"
import { Analytics } from "@vercel/analytics/next"

const OG_IMAGE = "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20241222%2Faa3efedd7ed0417caaf8c8693e7e673d.jpg&w=1200&q=85&fit=contain&fmt=auto"
const SITE_URL = "https://poizonsite.vercel.app"

const FALLBACK_KEYWORDS = [
  "Poizon", "байер Poizon", "кроссовки из Китая",
  "купить кроссовки СНГ", "оригинальные кроссовки доставка",
  "得物 СНГ", "одежда из Китая оригинал",
  "купить Nike оригинал", "купить Adidas из Китая", "байер Китай доставка",
]

const FALLBACK_DESC = "Байер с Poizon. Оригинальные кроссовки, одежда и аксессуары с доставкой в Россию, Казахстан, Беларусь. Авиа от 3 дней. 100% оригиналы."

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
    const res = await fetch(`${SITE_URL}/api/products`, {
      next: { revalidate: 604800, tags: ["seo-data"] },
    })
    if (res.ok) {
      const products = await res.json()
      if (Array.isArray(products) && products.length > 0) {
        keywords = buildKeywords(products)
        desc = buildDescription(products)
      }
    }
  } catch {}

  return {
    title: "POIZON SNG — Оригинальные кроссовки и одежда из Китая",
    description: desc,
    keywords,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: "POIZON SNG — Оригинальные кроссовки из Китая",
      description: desc,
      url: SITE_URL,
      siteName: "POIZON SNG",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "POIZON SNG" }],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "POIZON SNG — Оригинальные кроссовки из Китая",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "POIZON SNG",
      url: SITE_URL,
      logo: OG_IMAGE,
      description: "Байер с Poizon. Оригинальные кроссовки, одежда и аксессуары из Китая с доставкой в СНГ.",
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
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Как убедиться, что товар оригинальный?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Poizon (得物) — крупнейшая платформа аутентификации Китая. Каждый товар проходит экспертизу перед отправкой. В комплекте идёт чек Poizon с QR-кодом — вы можете проверить подлинность прямо в приложении.",
          },
        },
        {
          "@type": "Question",
          name: "Сколько стоит доставка?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Авиа (3–5 дней) — 225 ¥/кг, Экспресс (10–12 дней) — 173 ¥/кг, Стандарт (~25 дней) — 77 ¥/кг. Точная стоимость зависит от веса и объёма.",
          },
        },
        {
          "@type": "Question",
          name: "Как оплатить из России / Казахстана / Узбекистана?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Принимаем переводы в ₽, ₸, сомони и сумах. Конкретный способ оплаты обсуждаем в Telegram — подберём удобный для вашей страны.",
          },
        },
        {
          "@type": "Question",
          name: "Можно ли заказать товар, которого нет в каталоге?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да — это основная услуга. Скиньте ссылку с Poizon или название товара в Telegram, и мы выкупим всё что продаётся на платформе.",
          },
        },
        {
          "@type": "Question",
          name: "Как узнать свой размер?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "На Poizon размеры в EU и US. Для Nike/Jordan стандартная таблица, для New Balance часто советуют +0.5. Уточняйте в Telegram — подскажем по конкретной модели.",
          },
        },
        {
          "@type": "Question",
          name: "Что если товар придёт с дефектом?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Мы проверяем товар после получения от Poizon — фотографируем до отправки. Если Poizon прислал брак, открываем спор и добиваемся возврата или замены.",
          },
        },
        {
          "@type": "Question",
          name: "Есть ли трек-номер?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, трек-номер выдаётся на каждый заказ. Вы сможете отслеживать посылку через СДЭК, Почту России или международный трекер — зависит от выбранного способа доставки.",
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="yandex-verification" content="0d2ad6627b65aae0" />
        <meta name="google-site-verification" content="4hlM12eRQxECWPu6jL61e9VpK3Gkg4AYwDVQSbvzsj4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NoiseOverlay />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
