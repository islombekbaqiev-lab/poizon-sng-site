"use client"

import { useSyncExternalStore } from "react"

// Корзина живёт в localStorage и шарится между всеми страницами без провайдера:
// карточки на главной, категории и страница товара пишут в один стор.
// Цена фиксируется в момент добавления — в той валюте, что видел клиент.
export interface CartItem {
  id: string
  name: string
  article?: string
  image?: string
  price: number
  sym: string
  qty: number
}

const KEY = "poizon_cart_v1"
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

export function fmtMoney(n: number, sym: string) {
  return `${Math.round(n).toLocaleString("ru")} ${sym}`
}

// Если клиент успел сменить страну, в корзине могут быть разные валюты —
// складываем по каждой отдельно, а не смешиваем рубли с тенге.
export function cartTotal(list: CartItem[]) {
  const by = new Map<string, number>()
  for (const i of list) by.set(i.sym, (by.get(i.sym) ?? 0) + i.price * i.qty)
  return Array.from(by, ([sym, sum]) => fmtMoney(sum, sym)).join(" + ")
}
