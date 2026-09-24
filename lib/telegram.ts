import { MANAGER_LINK, SITE_URL, TG_LINK } from "@/lib/site"

function safeSlug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48)
}

export function buildTelegramUrl(args?: { start?: string }) {
  if (!args?.start) return TG_LINK
  const start = safeSlug(args.start)
  return `${TG_LINK}?start=${encodeURIComponent(start)}`
}

export function productStart(slug: string) {
  return `site_p_${safeSlug(slug)}`
}

export function categoryStart(slug: string) {
  return `site_c_${safeSlug(slug)}`
}

export function leadStart(source: string) {
  return `site_lead_${safeSlug(source)}`
}


// «Купить» ведёт прямо в личку @PoizonAdvisor: t.me/<user>?text= кладёт
// готовое сообщение в поле ввода, а BuyButton дублирует его в буфер —
// на случай, если клиент Telegram параметр text проигнорирует.
export function buyMessage(p: {
  id: string; name: string; url?: string; article?: string
}, price: string) {
  return [
    `Здравствуйте! Хочу купить:`,
    p.name,
    p.article ? `Артикул: ${p.article}` : null,
    `Цена на сайте: ${price}`,
    `Ссылка: ${SITE_URL}/product/${p.id}`,
    p.url ? `Poizon: ${p.url}` : null,
    `Размер:`,
  ].filter(Boolean).join("\n")
}

export function buyUrl(text: string) {
  return `${MANAGER_LINK}?text=${encodeURIComponent(text)}`
}
