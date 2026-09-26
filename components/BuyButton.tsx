"use client"

import { fmtFull } from "@/lib/pricing"
import { usePricing } from "@/lib/usePricing"
import { buyMessage, buyUrl } from "@/lib/telegram"

// Ссылка настоящая (href), чтобы работали средний клик и превью;
// в onClick только копируем текст — переход делает сам браузер.
// Цена в сообщении — та же, что на карточке (lib/pricing), в валюте клиента.
export default function BuyButton({
  product,
  className,
  style,
  children,
}: {
  product: { name: string; article?: string; priceRUB: number }
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const { price } = usePricing()
  const text = buyMessage(product, `от ${fmtFull(price(product.priceRUB))}`)

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
