import { DEFAULT_RATES, type Country, type Rates } from "@/lib/types"

/**
 * Единая формула цены для всего сайта: карточки, категории, страница товара,
 * корзина, JSON-LD. Раньше главная считала «цена × 1.15 по курсу», а страница
 * товара показывала сырую цену источника — один и тот же товар стоил по-разному.
 *
 *   цена источника (₽, thepoizon.ru, минимальная по размерам)
 *   → юани по нашему курсу → + наценка сервиса → валюта страны
 *   → округление вверх до «красивого» шага валюты.
 */
export const MARKUP = 0.15

export const CURRENCY: Record<Country, { key: keyof Rates; sym: string; step: number }> = {
  RU: { key: "RUB", sym: "₽",   step: 10   },
  BY: { key: "BYN", sym: "Br",  step: 1    },
  KZ: { key: "KZT", sym: "₸",   step: 100  },
  TJ: { key: "TJS", sym: "с.",  step: 1    },
  AM: { key: "AMD", sym: "֏",   step: 100  },
  GE: { key: "GEL", sym: "₾",   step: 1    },
  AZ: { key: "AZN", sym: "₼",   step: 1    },
  UZ: { key: "UZS", sym: "сум", step: 1000 },
}

export const DEFAULT_COUNTRY: Country = "RU"

export function toCNY(priceRUB: number, rates: Rates = DEFAULT_RATES) {
  return priceRUB / rates.RUB
}

function roundUp(n: number, step: number) {
  return Math.ceil(n / step) * step
}

export function fromCNY(cny: number, country: Country | null, rates: Rates = DEFAULT_RATES) {
  const c = CURRENCY[country ?? DEFAULT_COUNTRY]
  return { amount: roundUp(cny * rates[c.key], c.step), sym: c.sym }
}

/** Цена товара для клиента выбранной страны (без доставки). */
export function sitePrice(priceRUB: number, country: Country | null, rates: Rates = DEFAULT_RATES) {
  return fromCNY(toCNY(priceRUB, rates) * (1 + MARKUP), country, rates)
}

export function fmtFull(x: { amount: number; sym: string }) {
  return `${x.amount.toLocaleString("ru")} ${x.sym}`
}

/** Короткая запись для тесных карточек: «10.5к ₽». */
export function fmtShort(x: { amount: number; sym: string }) {
  const n = x.amount
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M ${x.sym}`
  if (n >= 10_000)    return `${+(n / 1000).toFixed(1)}к ${x.sym}`
  return fmtFull(x)
}

// ── Доставка ────────────────────────────────────────────────────────────────
// Тарифы те же, что в @po1zoncalculator_bot: ¥ за кг, минимум 1 кг на заказ.
export const DELIVERY: Record<Country, { name: string; days: string; perKgCNY: number }> = {
  RU: { name: "Авиа", days: "3–5 дней", perKgCNY: 225 },
  BY: { name: "Авиа", days: "3–5 дней", perKgCNY: 225 },
  AM: { name: "Авиа", days: "3–5 дней", perKgCNY: 225 },
  GE: { name: "Авиа", days: "3–5 дней", perKgCNY: 225 },
  AZ: { name: "Авиа", days: "3–5 дней", perKgCNY: 225 },
  KZ: { name: "Авто", days: "4–8 дней", perKgCNY: 100 },
  UZ: { name: "Авиа", days: "3–6 дней", perKgCNY: 100 },
  TJ: { name: "Авиа", days: "3–6 дней", perKgCNY: 100 },
}

/** Средний вес с упаковкой, кг. Кроссовки с коробкой — 1.2 кг, как в боте. */
export const WEIGHT_KG: Record<string, number> = {
  "Кроссовки": 1.2, "Одежда": 1, "Футболки": 0.4,
  "Сумки": 1, "Кепки": 0.3, "Аксессуары": 0.3,
}

export function deliveryEstimate(
  items: { category?: string; qty: number }[],
  country: Country | null,
  rates: Rates = DEFAULT_RATES,
) {
  const d = DELIVERY[country ?? DEFAULT_COUNTRY]
  const raw = items.reduce((kg, i) => kg + (WEIGHT_KG[i.category ?? ""] ?? 1) * i.qty, 0)
  const kg = Math.max(1, Math.round(raw * 10) / 10)
  return { ...d, kg, ...fromCNY(kg * d.perKgCNY, country, rates) }
}
