"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import CookieSettingsButton from "@/components/CookieSettingsButton"

const TG_ADVISOR = "https://t.me/PoizonAdvisor"
const TG_CHANNEL = "https://t.me/poizonsnggg"
const INSTAGRAM  = "https://www.instagram.com/poizon.sng"

const NAV = [
  { label: "Каталог",      href: "#catalog" },
  { label: "Как работает", href: "#how"     },
  { label: "Отзывы",       href: "#reviews" },
]

const LEGAL_LINKS = [
  { label: "Конфиденциальность", href: "/privacy" },
  { label: "Файлы cookie",       href: "/cookies" },
  { label: "Публичная оферта",   href: "/terms"   },
]

const SOCIAL = [
  { label: "Instagram",      href: INSTAGRAM,  color: "var(--ink-2)" },
  { label: "@poizonsnggg",   href: TG_CHANNEL, color: "var(--ink-2)" },
  { label: "@PoizonAdvisor", href: TG_ADVISOR, color: "var(--ink)"   },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Giant wordmark */}
        <div className="overflow-hidden py-10 sm:py-14">
          <motion.p
            className="font-bold tracking-tighter leading-none select-none text-center"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
              WebkitTextStroke: "1px rgba(11,11,12,0.14)",
              color: "transparent",
              letterSpacing: "-.04em",
            }}
            initial={{ y: "60%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            POIZON
          </motion.p>
        </div>

        <div className="line-h mb-10" />

        {/* Links row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display text-xl" style={{ color: "var(--ink)" }}>POIZON</span>
              <span className="text-[10px] font-bold px-2 py-[3px] rounded-md"
                style={{ background: "var(--ink-block)", color: "#fff" }}>SNG</span>
            </div>
            <p className="text-xs leading-relaxed max-w-[200px]" style={{ color: "var(--ink-4)" }}>
              Байер с Poizon. Оригиналы из Китая в страны СНГ.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-2.5">
            <p className="eyebrow mb-1" style={{ color: "var(--ink-4)", fontSize: ".6rem" }}>Навигация</p>
            {NAV.map(n => (
              <a key={n.label} href={n.href}
                className="text-sm transition-colors hover:text-[var(--ink)]"
                style={{ color: "var(--ink-3)" }}>
                {n.label}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2.5">
            <p className="eyebrow mb-1" style={{ color: "var(--ink-4)", fontSize: ".6rem" }}>Документы</p>
            {LEGAL_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className="text-sm transition-colors hover:text-[var(--ink)]"
                style={{ color: "var(--ink-3)" }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2.5">
            <p className="eyebrow mb-1" style={{ color: "var(--ink-4)", fontSize: ".6rem" }}>Соцсети</p>
            {SOCIAL.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-sm transition-colors font-medium"
                style={{ color: s.color }}>
                {s.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div>
            <p className="eyebrow mb-4" style={{ color: "var(--ink-4)", fontSize: ".6rem" }}>Заказать</p>
            <motion.a
              href={TG_ADVISOR}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary"
              whileHover={{ scale: 1.04, boxShadow: "0 10px 32px rgba(17,17,19,0.16)" }}
              whileTap={{ scale: 0.96 }}
            >
              Написать →
            </motion.a>
          </div>
        </div>

        {/* Bottom */}
        <div className="line-h mb-6" />
        <div className="pb-8 flex flex-col items-center gap-4">
          <p className="text-[11px] text-center max-w-xl leading-relaxed" style={{ color: "var(--ink-3)" }}>
            © {new Date().getFullYear()} POIZON SNG. Мы — посредник (байер): выкупаем товар по вашему
            поручению и организуем доставку. Не являемся продавцом и не аффилированы с Poizon (得物),
            Nike, Adidas и другими правообладателями; товарные знаки используются для идентификации
            товара. Цены на сайте носят информационный характер и не являются публичной офертой.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <CookieSettingsButton />
            <Link href="/privacy"
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
              style={{ background: "var(--card)", border: "1px solid var(--line)", color: "var(--ink-2)" }}>
              Политика конфиденциальности
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
