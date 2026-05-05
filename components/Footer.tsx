"use client"

import { motion } from "framer-motion"

const TG_ADVISOR = "https://t.me/PoizonAdvisor"
const TG_CHANNEL = "https://t.me/poizonsnggg"
const INSTAGRAM  = "https://www.instagram.com/poizon.sng"

const NAV = [
  { label: "Каталог",      href: "#catalog" },
  { label: "Как работает", href: "#how"     },
  { label: "Отзывы",       href: "#reviews" },
]

const SOCIAL = [
  { label: "Instagram",     href: INSTAGRAM,  color: "rgba(225,48,108,.7)"  },
  { label: "@poizonsnggg",  href: TG_CHANNEL, color: "rgba(77,150,255,.7)"  },
  { label: "@PoizonAdvisor",href: TG_ADVISOR, color: "#4D96FF"              },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Giant wordmark */}
        <div className="overflow-hidden py-10 sm:py-14">
          <motion.p
            className="font-black tracking-tighter leading-none select-none text-center"
            style={{
              fontSize: "clamp(4.5rem, 18vw, 18rem)",
              WebkitTextStroke: "1px rgba(255,255,255,.08)",
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
              <span className="text-lg font-black tracking-tighter">POIZON</span>
              <span className="text-[10px] font-black px-1.5 py-[3px] rounded-md"
                style={{ background: "#4D96FF" }}>SNG</span>
            </div>
            <p className="text-xs leading-relaxed max-w-[200px]" style={{ color: "rgba(255,255,255,.28)" }}>
              Байер с Poizon. Оригиналы из Китая в страны СНГ.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-2.5">
            <p className="eyebrow mb-1" style={{ color: "rgba(255,255,255,.22)", fontSize: ".6rem" }}>Навигация</p>
            {NAV.map(n => (
              <a key={n.label} href={n.href}
                className="text-sm transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,.42)" }}>
                {n.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2.5">
            <p className="eyebrow mb-1" style={{ color: "rgba(255,255,255,.22)", fontSize: ".6rem" }}>Соцсети</p>
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
            <p className="eyebrow mb-4" style={{ color: "rgba(255,255,255,.22)", fontSize: ".6rem" }}>Заказать</p>
            <motion.a
              href={TG_ADVISOR}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-sm font-bold"
              style={{ background: "#4D96FF", boxShadow: "0 6px 24px rgba(77,150,255,.3)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 10px 32px rgba(77,150,255,.48)" }}
              whileTap={{ scale: 0.96 }}
            >
              Написать →
            </motion.a>
          </div>
        </div>

        {/* Bottom */}
        <div className="line-h mb-6" />
        <p className="pb-8 text-[11px] text-center" style={{ color: "rgba(255,255,255,.14)" }}>
          © 2025 POIZON SNG — посредник, не аффилирован с Poizon / 得物 официально
        </p>

      </div>
    </footer>
  )
}
