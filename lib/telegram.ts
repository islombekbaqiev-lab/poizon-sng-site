import { MANAGER_LINK, TG_LINK } from "@/lib/site"

// Кнопки «Заказать» открывают личку менеджера с готовым приветствием — клиенту остаётся нажать «Отправить».
export function buildTelegramUrl(text = "Здравствуйте! Хочу заказать с Poizon.") {
  return `${TG_LINK}?text=${encodeURIComponent(text)}`
}


// «Купить» ведёт прямо в личку @PoizonAdvisor: t.me/<user>?text= кладёт
// готовое сообщение в поле ввода, а BuyButton дублирует его в буфер.
// Ссылок в тексте нет намеренно: Telegram разворачивал их в большое превью
// с фото. Товар однозначно находится по артикулу.
function itemLine(p: { name: string; article?: string }) {
  return p.article ? `${p.name} (арт. ${p.article})` : p.name
}

export function buyMessage(p: { name: string; article?: string }, price: string) {
  return `Здравствуйте! Хочу приобрести ${itemLine(p)} — ${price}. Уточните, пожалуйста, наличие.`
}

export function cartMessage(
  items: { name: string; article?: string; qty: number; line: string }[],
  delivery: string,
  total: string,
) {
  return [
    "Здравствуйте! Хочу приобрести:",
    ...items.map((i, n) => `${n + 1}. ${itemLine(i)}${i.qty > 1 ? ` ×${i.qty}` : ""} — ${i.line}`),
    delivery,
    `Итого: ${total}`,
    "Уточните, пожалуйста, наличие.",
  ].join("\n")
}

export function buyUrl(text: string) {
  return `${MANAGER_LINK}?text=${encodeURIComponent(text)}`
}
