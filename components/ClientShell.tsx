"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

import { Country, Rates, DEFAULT_RATES } from "@/lib/types"
import { CONSENT_EVENT, readConsent } from "@/lib/consent"

// Первый экран — в основном бандле, он нужен сразу.
import Header from "@/components/Header"
import Hero   from "@/components/Hero"

// Всё ниже первого экрана — отдельными чанками. HTML по-прежнему рендерится на
// сервере (ssr не отключаем, SEO не страдает), но JS этих секций больше не
// блокирует интерактивность шапки и кнопок в Hero.
const Marquee     = dynamic(() => import("@/components/Marquee"))
const ProductGrid = dynamic(() => import("@/components/ProductGrid"))
const HowItWorks  = dynamic(() => import("@/components/HowItWorks"))
const FAQ         = dynamic(() => import("@/components/FAQ"))
const Testimonials = dynamic(() => import("@/components/Testimonials"))
const CTASection  = dynamic(() => import("@/components/CTASection"))
const Footer      = dynamic(() => import("@/components/Footer"))

// Чисто декоративное и модальное — только на клиенте, без SSR-разметки.
const Intro             = dynamic(() => import("@/components/Intro"),             { ssr: false })
const CountryModal      = dynamic(() => import("@/components/CountryModal"),      { ssr: false })
const MobileFloatingCTA = dynamic(() => import("@/components/MobileFloatingCTA"), { ssr: false })


function BottomMarquee() {
  const items = [
    "ВЫКУПАЕМ НА POIZON", "ПРИВОЗИМ К ТЕБЕ", "КРОССОВКИ", "ОДЕЖДА", "СУМКИ", "КЕПКИ", "АКСЕССУАРЫ", "ФУТБОЛКИ",
    "ВЫКУПАЕМ НА POIZON", "ПРИВОЗИМ К ТЕБЕ", "КРОССОВКИ", "ОДЕЖДА", "СУМКИ", "КЕПКИ", "АКСЕССУАРЫ", "ФУТБОЛКИ",
  ]
  return (
    <div className="overflow-hidden py-5" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="marquee-inner-rev flex items-center whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span className="text-xs font-black uppercase tracking-[.22em]"
              style={{ color: i % 8 < 2 ? "var(--accent)" : "var(--ink-4)" }}>
              {t}
            </span>
            <span className="mx-6 text-[6px]" style={{ color: "var(--ink-5)" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ClientShell() {
  const [country,   setCountry]   = useState<Country | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [rates,     setRates]     = useState<Rates>(DEFAULT_RATES)
  const [showIntro, setShowIntro] = useState(false)
  // На первом визите пользователя встречали сразу два перекрывающих слоя:
  // модалка выбора страны (z-50, блокирует всю страницу) и cookie-баннер
  // поверх неё. Показываем страну только после решения по cookie.
  const [consentDone, setConsentDone] = useState(false)

  useEffect(() => {
    setConsentDone(!!readConsent())
    const onChange = () => setConsentDone(!!readConsent())
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  useEffect(() => {
    if (!sessionStorage.getItem("pzn_intro")) {
      sessionStorage.setItem("pzn_intro", "1")
      setShowIntro(true)
    }
  }, [])

  useEffect(() => {
    const VALID: Country[] = ["RU", "BY", "KZ", "TJ", "AM", "GE", "AZ", "UZ"]
    const saved = localStorage.getItem("pzn_country") as Country | null
    if (saved && VALID.includes(saved)) setCountry(saved)
    else { localStorage.removeItem("pzn_country"); setShowModal(true) }
  }, [])

  // Курсы берём со своего /api/rates: он кэширует ответ на час, так что
  // сторонний сервис не дёргается на каждого посетителя и не видит их IP.
  useEffect(() => {
    fetch("/api/rates")
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setRates(d as Rates) })
      .catch(() => {})
  }, [])

  const handleCountrySelect = (c: Country) => {
    setCountry(c)
    localStorage.setItem("pzn_country", c)
    setShowModal(false)
  }

  return (
    <>
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      {showModal && consentDone && <CountryModal onSelect={handleCountrySelect} />}
      <Header country={country} rates={rates} onChangeCountry={() => setShowModal(true)} />
      <Hero />
      <Marquee />
      <div id="catalog">
        <ProductGrid country={country} rates={rates} />
      </div>
      <HowItWorks country={country} />
      <FAQ />
      <Testimonials />
      <CTASection />
      <BottomMarquee />
      <Footer />
      <MobileFloatingCTA />
    </>
  )
}
