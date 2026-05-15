import { kv } from "@vercel/kv"

export interface SeoMeta {
  title: string
  description: string
  keywords: string[]
  updatedAt: string
}

const KEY = "pzn:seoMeta:v1"

export async function getSeoMeta(pageKey: string): Promise<SeoMeta | null> {
  try {
    const store = await kv.get<Record<string, SeoMeta>>(KEY)
    return store?.[pageKey] ?? null
  } catch { return null }
}

export async function getAllSeoMeta(): Promise<Record<string, SeoMeta>> {
  try {
    return (await kv.get<Record<string, SeoMeta>>(KEY)) ?? {}
  } catch { return {} }
}

export async function setSeoMetaStore(data: Record<string, SeoMeta>): Promise<void> {
  await kv.set(KEY, data)
}
