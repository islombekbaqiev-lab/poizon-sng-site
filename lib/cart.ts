"use client"

import { useSyncExternalStore } from "react"

// Корзина живёт в localStorage и шарится между всеми страницами без провайдера:
// карточки на главной, категории и страница товара пишут в один стор.
// Храним исходную цену в рублях источника, а в валюту клиента пересчитываем
// при показе (lib/pricing) — так корзина всегда в одной валюте и совпадает
// с ценами на карточках, даже если клиент сменил страну.
export interface CartItem {
  id: string
  name: string
  article?: string
  image?: string
  category?: string
  priceRUB: number
  qty: number
}

const KEY = "poizon_cart_v2"
const EMPTY: CartItem[] = []
let items: CartItem[] = EMPTY
let loaded = false
const listeners = new Set<() => void>()

function load() {
  if (loaded || typeof window === "undefined") return
  loaded = true
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) items = JSON.parse(raw)
  } catch {}
}

function commit(next: CartItem[]) {
  items = next
  try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
  listeners.forEach(l => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  // Синхронизация между вкладками.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return
    try { items = e.newValue ? JSON.parse(e.newValue) : EMPTY } catch {}
    l()
  }
  window.addEventListener("storage", onStorage)
  return () => { listeners.delete(l); window.removeEventListener("storage", onStorage) }
}

export function useCart() {
  return useSyncExternalStore(subscribe, () => (load(), items), () => EMPTY)
}

export const cart = {
  add(item: Omit<CartItem, "qty">) {
    load()
    const found = items.find(i => i.id === item.id)
    commit(found
      ? items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      : [...items, { ...item, qty: 1 }])
  },
  setQty(id: string, qty: number) {
    load()
    commit(qty <= 0 ? items.filter(i => i.id !== id) : items.map(i => i.id === id ? { ...i, qty } : i))
  },
  clear() { commit(EMPTY) },
}
