import type { Metadata } from "next"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import NoiseOverlay from "@/components/NoiseOverlay"
import { Analytics } from "@vercel/analytics/next"

const OG_IMAGE = "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20241222%2Faa3efedd7ed0417caaf8c8693e7e673d.jpg&w=1200&q=85&fit=contain&fmt=auto"
const SITE_URL = "https://poizonsite.vercel.app"

const INTENTS = ["купить", "заказать", "оригинал"]
const COUNTRIES = ["Россия", "Казахстан", "СНГ"]

const DEFAULT_KEYWORDS = [
  "Poizon", "кроссовки из Китая", "Nike", "Air Jordan",
  "байер Китай", "купить кроссовки СНГ", "оригинальные кроссовки",
]

// Статические keywords — не делаем fetch во время SSR чтобы не вешать страницу
function buildSeoFromProducts() {
  const brands = [
    "Nike", "Adidas", "Jordan", "New Balance", "Puma", "Stone Island",
    "Fear of God", "Supreme", "The North Face", "Balenciaga",
  ]
  const brandKeywords = brands.flatMap(brand =>
    INTENTS.map(intent => `${intent} ${brand}`)
  )
  const geoKeywords = brands.slice(0, 6).flatMap(brand =>
    COUNTRIES.map(c => `${brand} ${c}`)
  )
  const base = [
    "Poizon", "байер Poizon", "кроссовки из Китая",
    "купить кроссовки СНГ", "оригинальные кроссовки доставка",
    "得物 СНГ", "одежда из Китая оригинал",
  ]
  const keywords = [...new Set([...base, ...brandKeywords, ...geoKeywords])].slice(0, 50)
  return { keywords, description: null }
}

export function generateMetadata(): Metadata {
  const { keywords, description } = buildSeoFromProducts()

  const desc = description ?? "Байер с Poizon. Оригинальные кроссовки, одежда и аксессуары с доставкой в Россию, Казахстан, Беларусь. Авиа от 3 дней. 100% оригиналы."

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
