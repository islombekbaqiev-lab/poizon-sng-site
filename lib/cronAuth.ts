/**
 * Проверка доступа к служебным эндпоинтам (обновление каталога, SEO, статистика).
 *
 * Раньше секрет передавался только в query-строке, а его значение лежало
 * открытым текстом в vercel.json — то есть в git. Любой, у кого есть доступ
 * к репозиторию, мог дёрнуть эти маршруты.
 *
 * Vercel сам подставляет заголовок `Authorization: Bearer $CRON_SECRET`
 * при вызове cron, поэтому секрет в URL больше не нужен. Query-вариант
 * оставлен как запасной — чтобы ручные вызовы не сломались до ротации ключа.
 */
export function isAuthorizedCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false

  const header = req.headers.get("authorization")
  if (header === `Bearer ${secret}`) return true

  return new URL(req.url).searchParams.get("secret") === secret
}
