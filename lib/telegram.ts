import { MANAGER_LINK, TG_LINK } from "@/lib/site"

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
// готовое сообщение в поле ввода, а BuyButton дублирует его в буфер.
// Ссылок в тексте нет намеренно: Telegram разворачивал их в большое превью
// с фото. Товар однозначно находится по артикулу.
export function buyMessage(p: { name: string; article?: string }, price: string) {
  const article = p.article ? ` (арт. ${p.article})` : ""
  return `Здравствуйте! Хочу купить ${p.name}${article} — ${price}\nРазмер: `
}

export function buyUrl(text: string) {
  return `${MANAGER_LINK}?text=${encodeURIComponent(text)}`
}
