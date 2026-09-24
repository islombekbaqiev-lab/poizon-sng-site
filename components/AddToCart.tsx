"use client"

import { useState } from "react"
import { cart, type CartItem } from "@/lib/cart"

// variant="icon" — круглая кнопка для тесных карточек, "full" — для страницы товара.
export default function AddToCart({
  item,
  variant = "icon",
  className,
  style,
}: {
  item: Omit<CartItem, "qty">
  variant?: "icon" | "full"
  className?: string
  style?: React.CSSProperties
}) {
  const [added, setAdded] = useState(false)

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    cart.add(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  const icon = added ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  )

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Добавить в корзину"
      className={className ?? (variant === "icon"
        ? "flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150 hover:scale-105 active:scale-90"
        : "flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01]")}
      style={style ?? {
        background: "var(--card-alt)",
        border: "1px solid var(--line)",
        color: "var(--ink)",
      }}
    >
      {icon}
      {variant === "full" && (added ? "Добавлено" : "В корзину")}
    </button>
  )
}
