"use client"

import { useState } from "react"

export default function CopyToTelegram({
  href,
  copyText,
  className,
  style,
  children,
}: {
  href: string
  copyText: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const [copied, setCopied] = useState(false)

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {}
    window.open(href, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={style}
      aria-label="Скопировать и открыть Telegram"
    >
      {children}
      {copied && (
        <span className="ml-2 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
          Скопировано
        </span>
      )}
    </button>
  )
}

