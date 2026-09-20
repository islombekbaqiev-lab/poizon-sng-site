"use client"

import { motion } from "framer-motion"

import { buildTelegramUrl, leadStart } from "@/lib/telegram"

const BADGES = ["Оплата после фото товара", "Не нашли — вернём деньги", "Трек-номер", "Авиа 3–5 дней"]

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
            className="font-display leading-[0.95] mb-7 select-none"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5.6rem)" }}
          >
            Нашёл что-то
            <span className="block font-sans font-bold" style={{ color: "var(--ink-3)", letterSpacing: "-0.03em", fontSize: "0.82em" }}>
              на Poizon?
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
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full text-white font-semibold text-base"
            style={{ background: "var(--ink-block)", boxShadow: "var(--shadow-ink)" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Написать менеджеру →
          </motion.a>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {BADGES.map(b => (
              <span
                key={b}
                className="text-xs px-3.5 py-1.5 rounded-full"
                style={{ background: "var(--card)", boxShadow: "var(--shadow-xs)", color: "var(--ink-2)" }}
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
