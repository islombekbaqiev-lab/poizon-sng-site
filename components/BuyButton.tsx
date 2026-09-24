"use client"

import { buyMessage, buyUrl } from "@/lib/telegram"

// Ссылка настоящая (href), чтобы работали средний клик и превью;
// в onClick только копируем текст — переход делает сам браузер.
export default function BuyButton({
  product,
  price,
  className,
  style,
  children,
}: {
  product: { id: string; name: string; url?: string; article?: string }
  price: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const text = buyMessage(product, price)

  return (
    <a
      href={buyUrl(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={e => {
        e.stopPropagation()
        navigator.clipboard?.writeText(text).catch(() => {})
      }}
    >
      {children}
    </a>
  )
}
