import type { Metadata } from "next"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import NoiseOverlay from "@/components/NoiseOverlay"

const OG_IMAGE = "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20241222%2Faa3efedd7ed0417caaf8c8693e7e673d.jpg&w=1200&q=85&fit=contain&fmt=auto"
const SITE_URL = "https://poizonsite.vercel.app"

export const metadata: Metadata = {
  title: "POIZON SNG — Оригинальные кроссовки и одежда из Китая",
  description: "Байер с Poizon. Оригинальные кроссовки, одежда и аксессуары с доставкой в Россию, Казахстан, Таджикистан, Узбекистан. Авиа от 3 дней. 100% оригиналы. 847+ заказов.",
  keywords: ["Poizon", "кроссовки из Китая", "Nike", "Air Jordan", "Travis Scott", "Air Force 1", "байер Китай", "купить кроссовки СНГ", "доставка из Китая", "оригинальные кроссовки"],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "POIZON SNG — Оригинальные кроссовки из Китая",
    description: "Байер с Poizon. Кроссовки, одежда, аксессуары с доставкой в СНГ. Авиа от 3 дней. 847+ заказов.",
    url: SITE_URL,
    siteName: "POIZON SNG",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "POIZON SNG — Оригинальные кроссовки из Китая",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "POIZON SNG — Оригинальные кроссовки из Китая",
    description: "Байер с Poizon. Авиадоставка от 3 дней в СНГ. Оригиналы.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <NoiseOverlay />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
