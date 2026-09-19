"use client"

import { openConsentSettings } from "@/lib/consent"

export default function CookieSettingsButton({
  label = "Настройки cookie",
  className,
  style,
}: { label?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className={className ?? "px-4 py-2 rounded-xl text-xs font-semibold transition-colors"}
      style={style ?? {
        background: "var(--card)",
        border: "1px solid var(--line)",
        color: "var(--ink-2)",
      }}
    >
      {label}
    </button>
  )
}
