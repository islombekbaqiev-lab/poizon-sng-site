"use client"

import { motion } from "framer-motion"

import { buildTelegramUrl, leadStart } from "@/lib/telegram"

const BADGES = ["✅ Оплата после фото товара", "🔁 Не нашли — вернём деньги", "📦 Трек-номер", "✈️ Авиа 3–5 дней"]

export default function CTASection() {
  return (
    <section className="py-28" style={{ borderTop: "1px solid var(--line)" }}>
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
                color: "var(--ink-4)",
                display: "block",
              }}
            >
              НА POIZON?
            </span>
          </h2>

          <p
            className="text-base sm:text-lg mb-10 max-w-sm mx-auto leading-relaxed"
            style={{ color: "var(--ink-4)" }}
          >
            Скинь ссылку — посчитаем финальную цену «под ключ», подберём доставку и будем вести заказ до получения.
          </p>

          <motion.a
            href={buildTelegramUrl({ start: leadStart("cta") })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl text-white font-bold text-base"
            style={{
              background: "var(--ink-block)",
              boxShadow: "0 12px 40px rgba(17,17,19,0.16), 0 0 0 1px rgba(17,17,19,0.16)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 16px 50px rgba(17,17,19,0.16)" }}
            whileTap={{ scale: 0.96 }}
          >
            Написать менеджеру →
          </motion.a>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {BADGES.map(b => (
              <span
                key={b}
                className="text-xs px-3.5 py-1.5 rounded-full"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  color: "var(--ink-3)",
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
