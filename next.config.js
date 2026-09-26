/** @type {import('next').NextConfig} */

// Content-Security-Policy.
// Домены аналитики оставлены, хотя скрипты грузятся только после согласия:
// CSP — это второй рубеж, а не механизм согласия.
const csp = [
  "default-src 'self'",
  // unsafe-inline/eval нужны Next.js для инлайновых бутстрап-скриптов и JSON-LD.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://yandex.ru https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
  // Инлайновые стили активно используются в компонентах (style={{...}}).
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn-img.thepoizon.ru https://cdn.dewu.com https://proxy.b2baisolutions.io https://hkpoizon-oversea.poizon.com https://mc.yandex.ru https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://mc.yandex.ru https://www.google-analytics.com https://region1.google-analytics.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src https://mc.yandex.ru",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Запрещаем встраивать сайт в чужие фреймы — защита от кликджекинга.
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Дублирует frame-ancestors для старых браузеров.
  { key: "X-Frame-Options", value: "DENY" },
  // Запрещает браузеру «угадывать» тип файла вопреки Content-Type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Во внешние ссылки уходит только домен, без полного URL страницы.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Сайту не нужны камера, микрофон, геолокация и платёжный API — отключаем.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  // Только HTTPS, включая поддомены, на год.
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
]

const nextConfig = {
  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Иконки и статика не меняются между деплоями — кэшируем надолго.
        source: "/:file(favicon.ico|icon-512.png|apple-touch-icon.png)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ]
  },

  images: {
    // Ресайз делает сам CDN Poizon (см. lib/img.ts), оптимизатор Vercel не нужен.
    loader: "custom",
    loaderFile: "./lib/img.ts",
    deviceSizes: [320, 480, 640, 750, 828, 1080],
    imageSizes: [64, 128, 256, 384],
  },
}

module.exports = nextConfig
