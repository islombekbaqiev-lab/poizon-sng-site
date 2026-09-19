"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Country, Rates } from "@/lib/types"
import { buildTelegramUrl, leadStart } from "@/lib/telegram"

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
  { label: "Каталог",      href: "/#catalog"        },
  { label: "О нас",        href: "/about"           },
  { label: "Как заказать", href: "/how-to-order"    },
  { label: "Размеры",      href: "/size-guide/nike" },
  { label: "Блог",         href: "/blog"            },
  { label: "FAQ",          href: "/#faq"            },
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
          // Пока не прокрутили — шапка стоит под полосой объявлений (30px).
          // После скролла полоса уезжает и шапка прилипает к самому верху.
          paddingTop: scrolled ? 0 : 30,
          background: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
          transition: "background .4s, backdrop-filter .4s, border-color .4s, box-shadow .4s, padding-top .35s",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="font-display text-xl leading-none" style={{ color: "var(--ink)" }}>POIZON</span>
            <span
              className="text-[10px] font-black px-1.5 py-[3px] rounded-md text-white leading-none"
              style={{ background: "var(--ink-block)" }}
            >SNG</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map(n => (
              <a
                key={n.label}
                href={n.href}
                className="px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors hover:text-[var(--ink)]"
                style={{ color: "var(--ink-3)" }}
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
                style={{ background: "var(--accent-sf)", border: "1px solid var(--accent-ln)" }}
              >
                <span style={{ color: "var(--ink-4)" }}>1 ¥ =</span>
                <span className="font-bold" style={{ color: "var(--accent)" }}>{rates[m.rateKey]} {m.currency}</span>
              </div>
            )}

            <motion.button
              onClick={onChangeCountry}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
              style={{ background: "var(--card)", border: "1px solid var(--line)", boxShadow: "var(--shadow-xs)" }}
              whileTap={{ scale: 0.95 }}
            >
              {m
                ? <><span>{m.flag}</span><span className="hidden sm:inline" style={{ color: "var(--ink-3)" }}>{m.name}</span></>
                : <span style={{ color: "var(--ink-4)" }}>Страна</span>
              }
            </motion.button>

            {/* Постоянная кнопка конверсии — desktop */}
            <motion.a
              href={buildTelegramUrl({ start: leadStart("header") })}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white"
              style={{ background: "var(--ink-block)", boxShadow: "0 4px 16px rgba(17,17,19,0.16)" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              Написать →
            </motion.a>

            {/* Burger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Меню"
            >
              <motion.span
                className="block h-[1.5px] w-5 rounded-full"
                style={{ background: "var(--ink)" }}
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
                transition={{ duration: 0.22 }}
              />
              <motion.span
                className="block h-[1.5px] w-5 rounded-full"
                style={{ background: "var(--ink)" }}
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.18 }}
              />
              <motion.span
                className="block h-[1.5px] w-5 rounded-full"
                style={{ background: "var(--ink)" }}
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
              background: "var(--page)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <nav className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(n => (
                <a
                  key={n.label}
                  href={n.href}
                  className="px-3 py-3 rounded-xl text-sm font-medium transition-colors hover:text-[var(--ink)] hover:bg-[rgba(17,17,19,0.04)]"
                  style={{ color: "var(--ink-3)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {n.label}
                </a>
              ))}
              {m && (
                <div
                  className="flex items-center gap-1.5 px-3 py-2 mt-1 rounded-xl text-xs"
                  style={{ background: "var(--accent-sf)", border: "1px solid var(--accent-ln)" }}
                >
                  <span style={{ color: "var(--ink-4)" }}>1 ¥ =</span>
                  <span className="font-bold" style={{ color: "var(--accent)" }}>{rates[m.rateKey]} {m.currency}</span>
                  <span className="ml-auto" style={{ color: "var(--ink-4)" }}>{m.flag} {m.name}</span>
                </div>
              )}
              <a
                href={buildTelegramUrl({ start: leadStart("menu") })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-3 mt-2 rounded-xl text-sm font-bold text-white"
                style={{ background: "var(--ink-block)" }}
                onClick={() => setMenuOpen(false)}
              >
                Написать в Telegram →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
