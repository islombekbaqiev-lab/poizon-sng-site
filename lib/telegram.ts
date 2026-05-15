import { TG_LINK } from "@/lib/site"

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

