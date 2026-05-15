"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Country, Rates } from "@/lib/types"

const META: Record<Country, { flag: string; name: string; currency: string; rateKey: keyof Rates }> = {
  RU: { flag: "🇷🇺", name: "Россия",       currency: "₽",   rateKey: "RUB" },
  BY: { flag: "🇧🇾", name: "Беларусь",     currency: "Br",  rateKey: "BYN" },
  KZ: { flag: "🇰🇿", name: "Казахстан",    currency: "₸",   rateKey: "KZT" },
  TJ: { flag: "🇹🇯", name: "Таджикистан",  currency: "с.",  rateKey: "TJS" },
  AM: { flag: "🇦🇲", name: "Армения",      currency: "֏",   rateKey: "AMD" },
  GE: { flag: "🇬🇪", name: "Грузия",       currency: "₾",   rateKey: "GEL" },
  AZ: { flag: "🇦🇿", name: "Азербайджан",  currency: "₼",   rateKey: "AZN" },
  UZ: { flag: "🇺🇿", name: "Узбекистан",   currency: "сум", rateKey: "UZS" },
}

const NAV_LINKS = [
  { label: "Каталог",      href: "#catalog"             },
  { label: "Кроссовки",   href: "/category/sneakers"   },
  { label: "Одежда",      href: "/category/clothes"    },
  { label: "Сумки",       href: "/category/bags"       },
  { label: "Кепки",       href: "/category/caps"       },
  { label: "Как заказать", href: "/how-to-order"        },
  { label: "Размеры",     href: "/size-guide/nike"     },
  { label: "FAQ",         href: "#faq"                 },
]

export default function Header({ country, rates, onChangeCountry }: {
  country: Country | null; rates: Rates; onChangeCountry: () => void
}) {
  const [scrolled,    setScrolled]    = useState(false)
  const [hidden,      setHidden]      = useState(false)
  const [last,        setLast]        = useState(0)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const m = country ? META[country] : null

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setHidden(y > 120 && y > last)
      setLast(y)
      if (y > 20) setMenuOpen(false)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [last])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40"
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: scrolled ? "rgba(4,6,15,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.055)" : "1px solid transparent",
          transition: "background .4s, backdrop-filter .4s, border-color .4s",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-lg font-black tracking-tighter leading-none">POIZON</span>
            <span
              className="text-[10px] font-black px-1.5 py-[3px] rounded-md text-white leading-none"
              style={{ background: "#4D96FF" }}
            >SNG</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map(n => (
              <a
                key={n.label}
                href={n.href}
                className="px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,.42)" }}
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {m && (
              <div
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                style={{ background: "rgba(77,150,255,.08)", border: "1px solid rgba(77,150,255,.16)" }}
              >
                <span style={{ color: "rgba(255,255,255,.38)" }}>1 ¥ =</span>
                <span className="font-bold" style={{ color: "#4D96FF" }}>{rates[m.rateKey]} {m.currency}</span>
              </div>
            )}

            <motion.button
              onClick={onChangeCountry}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
              style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.08)" }}
              whileHover={{ background: "rgba(255,255,255,.09)" }}
              whileTap={{ scale: 0.95 }}
            >
              {m
                ? <><span>{m.flag}</span><span className="hidden sm:inline" style={{ color: "rgba(255,255,255,.5)" }}>{m.name}</span></>
                : <span style={{ color: "rgba(255,255,255,.35)" }}>Страна</span>
              }
            </motion.button>

            {/* Burger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Меню"
            >
              <motion.span
                className="block h-[1.5px] w-5 rounded-full bg-white"
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
                transition={{ duration: 0.22 }}
              />
              <motion.span
                className="block h-[1.5px] w-5 rounded-full bg-white"
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.18 }}
              />
              <motion.span
                className="block h-[1.5px] w-5 rounded-full bg-white"
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
                transition={{ duration: 0.22 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-[60px] left-0 right-0 bottom-0 z-[200] md:hidden overflow-y-auto"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "#04060f",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <nav className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(n => (
                <a
                  key={n.label}
                  href={n.href}
                  className="px-3 py-3 rounded-xl text-sm font-medium transition-colors hover:text-white hover:bg-white/5"
                  style={{ color: "rgba(255,255,255,.55)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {n.label}
                </a>
              ))}
              {m && (
                <div
                  className="flex items-center gap-1.5 px-3 py-2 mt-1 rounded-xl text-xs"
                  style={{ background: "rgba(77,150,255,.06)", border: "1px solid rgba(77,150,255,.12)" }}
                >
                  <span style={{ color: "rgba(255,255,255,.38)" }}>1 ¥ =</span>
                  <span className="font-bold" style={{ color: "#4D96FF" }}>{rates[m.rateKey]} {m.currency}</span>
                  <span className="ml-auto" style={{ color: "rgba(255,255,255,.25)" }}>{m.flag} {m.name}</span>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
