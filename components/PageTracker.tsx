"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { CONSENT_EVENT, readConsent } from "@/lib/consent"

/**
 * Собственный счётчик посещений (/api/track). Пишет только агрегаты, но это
 * всё равно аналитика — поэтому стучимся лишь после согласия пользователя.
 */
export default function PageTracker() {
  const pathname = usePathname()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    setAllowed(readConsent()?.analytics ?? false)
    const onChange = (e: Event) => setAllowed((e as CustomEvent).detail?.analytics ?? false)
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  useEffect(() => {
    if (!allowed) return
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname }),
      keepalive: true,
    }).catch(() => {})
  }, [allowed, pathname])

  return null
}
