// Единая точка правды по согласию на cookie.
// Значение хранится в first-party cookie `pzn_consent` (см. /cookies),
// чтобы его видел и сервер, и клиент, и оно переживало перезагрузку.

export const CONSENT_COOKIE = "pzn_consent"
export const CONSENT_VERSION = 1
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180 // 6 месяцев
export const CONSENT_EVENT = "pzn:consent"

export interface Consent {
  /** Версия текста политики — при её росте согласие спрашиваем заново. */
  v: number
  /** Технические cookie. Всегда true, поле оставлено для явности. */
  necessary: true
  /** Яндекс.Метрика (включая вебвизор), Google Analytics 4, /api/track. */
  analytics: boolean
  /** Отметка времени принятия решения (ISO). */
  ts: string
}

export const ACCEPT_ALL: Omit<Consent, "ts"> = { v: CONSENT_VERSION, necessary: true, analytics: true }
export const REJECT_ALL: Omit<Consent, "ts"> = { v: CONSENT_VERSION, necessary: true, analytics: false }

/** Читает согласие. null — решение ещё не принято либо версия устарела. */
export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null
  const raw = document.cookie
    .split("; ")
    .find(c => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1)
  if (!raw) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Consent
    if (parsed?.v !== CONSENT_VERSION) return null
    return { ...parsed, necessary: true }
  } catch {
    return null
  }
}

/** Сохраняет решение и оповещает подписчиков в этой же вкладке. */
export function writeConsent(choice: Omit<Consent, "ts">): Consent {
  const value: Consent = { ...choice, necessary: true, ts: new Date().toISOString() }
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : ""
  document.cookie =
    `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}` +
    `; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: value }))
  return value
}

/** Удаляет решение — баннер появится снова. */
export function clearConsent() {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }))
}

/** Просит открыть панель настроек (кнопка в подвале и на /cookies). */
export const CONSENT_OPEN_EVENT = "pzn:consent:open"
export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
}
