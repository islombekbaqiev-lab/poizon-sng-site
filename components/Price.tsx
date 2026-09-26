"use client"

import { fmtFull, fmtShort } from "@/lib/pricing"
import { usePricing } from "@/lib/usePricing"

// Для серверных страниц: в HTML — рубли (для SEO и первого кадра),
// после гидрации — валюта страны, которую выбрал клиент.
export default function Price({
  priceRUB, short, from, className, style,
}: {
  priceRUB: number; short?: boolean; from?: boolean
  className?: string; style?: React.CSSProperties
}) {
  const { price } = usePricing()
  const x = price(priceRUB)
  return (
    <span className={className} style={style} suppressHydrationWarning>
      {from ? "от " : ""}{short ? fmtShort(x) : fmtFull(x)}
    </span>
  )
}
