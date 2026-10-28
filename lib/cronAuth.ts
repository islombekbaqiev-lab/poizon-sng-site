/**
 * Проверка доступа к служебным эндпоинтам (обновление каталога, SEO, статистика).
 *
 * Только заголовок `Authorization: Bearer $CRON_SECRET` — Vercel сам подставляет
 * его при вызове cron. Секрет в query-строке больше не принимается: URL оседает
 * в логах, истории и Referer. Ручной вызов:
 *   curl -H "Authorization: Bearer $CRON_SECRET" https://poizonsng.com/api/seo-update
 */
export function isAuthorizedCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return req.headers.get("authorization") === `Bearer ${secret}`
}
