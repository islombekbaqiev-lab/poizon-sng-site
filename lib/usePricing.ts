"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { DEFAULT_RATES, type Country, type Rates } from "@/lib/types"
import { CURRENCY, sitePrice } from "@/lib/pricing"

// Страна и курсы нужны не только главной (ClientShell), но и серверным
// страницам товара/категорий: там цена рендерится в рублях, а на клиенте
// подменяется на валюту выбранной страны.
export const COUNTRY_KEY = "pzn_country"
export const COUNTRY_EVENT = "pzn:country"

function readCountry(): Country | null {
  try {
    const c = localStorage.getItem(COUNTRY_KEY) as Country | null
    return c && c in CURRENCY ? c : null
  } catch { return null }
}

function subscribeCountry(cb: () => void) {
  window.addEventListener(COUNTRY_EVENT, cb)
  window.addEventListener("storage", cb)
  return () => { window.removeEventListener(COUNTRY_EVENT, cb); window.removeEventListener("storage", cb) }
}

export function setCountry(c: Country) {
  try { localStorage.setItem(COUNTRY_KEY, c) } catch {}
  window.dispatchEvent(new Event(COUNTRY_EVENT))
}

export function useCountry() {
  return useSyncExternalStore(subscribeCountry, readCountry, () => null)
}

let ratesPromise: Promise<Rates> | null = null
let ratesCache: Rates = DEFAULT_RATES

export function useRates() {
  const [rates, setRates] = useState<Rates>(ratesCache)
  useEffect(() => {
    ratesPromise ??= fetch("/api/rates")
      .then(r => r.ok ? r.json() : DEFAULT_RATES)
      .catch(() => DEFAULT_RATES)
      .then((r: Rates) => (ratesCache = r))
    ratesPromise.then(setRates)
  }, [])
  return rates
}

export function usePricing() {
  const country = useCountry()
  const rates = useRates()
  return { country, rates, price: (priceRUB: number) => sitePrice(priceRUB, country, rates) }
}
