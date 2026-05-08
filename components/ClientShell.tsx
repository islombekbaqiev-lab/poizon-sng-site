"use client"

import { useState, useEffect } from "react"
import { Country, Rates, DEFAULT_RATES } from "@/lib/types"
import CountryModal      from "@/components/CountryModal"
import Header            from "@/components/Header"
import Hero              from "@/components/Hero"
import Marquee           from "@/components/Marquee"
import ProductGrid       from "@/components/ProductGrid"
import HowItWorks        from "@/components/HowItWorks"
import Testimonials      from "@/components/Testimonials"
import Footer            from "@/components/Footer"
import CustomCursor      from "@/components/CustomCursor"
import Intro             from "@/components/Intro"
import MobileFloatingCTA from "@/components/MobileFloatingCTA"
import FAQ               from "@/components/FAQ"
import CTASection        from "@/components/CTASection"


export default function ClientShell() {
  const [country,   setCountry]   = useState<Country | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [rates,     setRates]     = useState<Rates>(DEFAULT_RATES)
  const [showIntro, setShowIntro] = useState(false)

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

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/CNY")
      .then(r => r.json())
      .then(d => {
        if (d.rates) setRates({
          RUB: Math.round((d.rates.RUB + 1.2) * 10) / 10,
          KZT: Math.round(d.rates.KZT + 8),
          TJS: Math.round((d.rates.TJS + 0.2) * 100) / 100,
          UZS: Math.round(d.rates.UZS),
          BYN: Math.round((d.rates.BYN + 0.03) * 100) / 100,
          AMD: Math.round(d.rates.AMD + 5),
          GEL: Math.round((d.rates.GEL + 0.03) * 100) / 100,
          AZN: Math.round((d.rates.AZN + 0.02) * 100) / 100,
        })
      })
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
      <CustomCursor />
      {showModal && <CountryModal onSelect={handleCountrySelect} />}
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
      <Footer />
      <MobileFloatingCTA />
    </>
  )
}
