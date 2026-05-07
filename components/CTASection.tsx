"use client"

import { motion } from "framer-motion"

const TG_LINK = "https://t.me/PoizonAdvisor"

const BADGES = ["✈️ Авиа 3–5 дней", "📦 Трек-номер", "100% оригинал", "Бесплатный просчёт"]

export default function CTASection() {
  return (
    <section className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-6">Поехали</p>

          <h2
            className="font-black tracking-tighter leading-[.88] mb-7 select-none"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            НАШЁЛ ЧТО-ТО
            <span
              style={{
                WebkitTextStroke: "1.5px rgba(255,255,255,.2)",
                color: "transparent",
                display: "block",
              }}
            >
              НА POIZON?
            </span>
          </h2>

          <p
            className="text-base sm:text-lg mb-10 max-w-sm mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,.38)" }}
          >
            Скинь ссылку — рассчитаем цену с доставкой за 5 минут. Бесплатно.
          </p>

          <motion.a
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl text-white font-bold text-base"
            style={{
              background: "#4D96FF",
              boxShadow: "0 12px 40px rgba(77,150,255,.4), 0 0 0 1px rgba(77,150,255,.25)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 16px 50px rgba(77,150,255,.55)" }}
            whileTap={{ scale: 0.96 }}
          >
            Написать в Telegram →
          </motion.a>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {BADGES.map(b => (
              <span
                key={b}
                className="text-xs px-3.5 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                  color: "rgba(255,255,255,.4)",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
