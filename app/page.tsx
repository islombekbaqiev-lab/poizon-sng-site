"use client"

import { useState, useEffect } from "react"
import CountryModal    from "@/components/CountryModal"
import Header          from "@/components/Header"
import AnnouncementBar from "@/components/AnnouncementBar"
import Hero            from "@/components/Hero"
import Marquee         from "@/components/Marquee"
import ProductGrid     from "@/components/ProductGrid"
import HowItWorks      from "@/components/HowItWorks"
import Testimonials    from "@/components/Testimonials"
import Footer          from "@/components/Footer"
import CustomCursor    from "@/components/CustomCursor"
import Intro           from "@/components/Intro"
import MobileFloatingCTA from "@/components/MobileFloatingCTA"
import FAQ             from "@/components/FAQ"
import CTASection      from "@/components/CTASection"

export type Country = "RU" | "BY" | "KZ" | "TJ" | "AM" | "GE" | "AZ" | "UZ"

export interface Rates {
  RUB: number
  KZT: number
  TJS: number
  UZS: number
  BYN: number
  AMD: number
  GEL: number
  AZN: number
}

const DEFAULT_RATES: Rates = {
  RUB: 13.2, KZT: 555, TJS: 1.08, UZS: 1645,
  BYN: 0.40, AMD: 55,  GEL: 0.40, AZN: 0.24,
}

export default function Home() {
  const [country,    setCountry]    = useState<Country | null>(null)
  const [showModal,  setShowModal]  = useState(false)
  const [rates,      setRates]      = useState<Rates>(DEFAULT_RATES)
  const [showIntro,  setShowIntro]  = useState(false)

  useEffect(() => {
    // Show intro only once per browser session — default false prevents flash on return visits
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
    <main className="min-h-screen bg-[#050C1A] relative">

      {/* Intro screen — first visit only */}
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}

      {/* Custom cursor — desktop */}
      <CustomCursor />

      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-100" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize:  "28px 28px",
        }} />
        <div className="blob1 absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)", filter: "blur(60px)" }} />
        <div className="blob2 absolute bottom-[-15%] right-[-8%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)", filter: "blur(60px)" }} />
        <div className="blob3 absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(77,150,255,0.1), transparent 70%)", filter: "blur(80px)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <AnnouncementBar />
        {showModal && <CountryModal onSelect={handleCountrySelect} />}
        <Header
          country={country}
          rates={rates}
          onChangeCountry={() => setShowModal(true)}
        />
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
      </div>

    </main>
  )
}
