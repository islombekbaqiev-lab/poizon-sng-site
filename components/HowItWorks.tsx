"use client"

import { motion } from "framer-motion"
import { Country } from "@/lib/types"

const STEPS = [
  { num: "01", title: "Подбираем",  desc: "Скидываешь ссылку или модель. Поможем с размером и проверим наличие." },
  { num: "02", title: "Согласуем",  desc: "В Telegram считаем финальную цену «под ключ» и сроки под твою страну." },
  { num: "03", title: "Выкупаем",   desc: "Покупаем на Poizon, а затем делаем фото/проверку перед отправкой." },
  { num: "04", title: "Доставляем", desc: "Отправляем с трек-номером. На связи до получения." },
]

type DeliveryOption = { icon: string; label: string; days: string; price: string }

const RU_GROUP: DeliveryOption[] = [
  { icon: "✈️", label: "Авиа",             days: "3–5 дней",   price: "225 ¥/кг" },
  { icon: "⚡️", label: "СДЭК Экспресс",   days: "10–12 дней", price: "173 ¥/кг" },
  { icon: "📦", label: "СДЭК Стандарт",   days: "~25 дней",   price: "77 ¥/кг"  },
]

const DELIVERY: Record<Country | "default", DeliveryOption[]> = {
  default: RU_GROUP,
  RU:      RU_GROUP,
  AM:      RU_GROUP,
  BY:      RU_GROUP,
  GE:      RU_GROUP,
  AZ:      RU_GROUP,
  KZ: [
    { icon: "🚗", label: "Авто",  days: "4–8 дней",  price: "100 ¥/кг" },
  ],
  UZ: [
    { icon: "✈️", label: "Авиа", days: "3–6 дней",  price: "100 ¥/кг" },
  ],
  TJ: [
    { icon: "✈️", label: "Авиа", days: "3–6 дней",  price: "100 ¥/кг" },
  ],
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as any },
  }
}

export default function HowItWorks({ country }: { country?: Country | null }) {
  const options = (country ? DELIVERY[country] : null) ?? DELIVERY.default

  return (
    <section id="how" className="py-28" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div className="mb-16" {...fadeUp(0)}>
          <p className="eyebrow mb-4">Процесс</p>
          <h2 className="font-display leading-[1.0]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}>
            Как это
            <span className="block font-sans font-bold"
              style={{ color: "var(--ink-3)", letterSpacing: "-0.03em", fontSize: "0.8em" }}>
              работает
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "var(--card)" }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              className="flex flex-col p-8 group"
              style={{ background: "var(--page)" }}
              {...fadeUp(i * 0.08)}
              whileHover={{ background: "var(--card-alt)" } as any}
            >
              <span className="font-display mb-6 select-none"
                style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", color: "var(--ink-4)", lineHeight: 1 }}>
                {s.num}
              </span>
              <p className="font-bold text-lg mb-3">{s.title}</p>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--ink-4)" }}>
                {s.desc}
              </p>
              <div className="mt-6 h-px w-10 rounded-full"
                style={{ background: "var(--ink-5)" }} />
            </motion.div>
          ))}
        </div>

        {/* Delivery — country-aware */}
        <motion.div className="mt-8" {...fadeUp(0.24)}>
          {country && (
            <p className="text-xs mb-3" style={{ color: "var(--ink-4)" }}>
              Доставка в {
                { RU: "Россию", BY: "Беларусь", KZ: "Казахстан", TJ: "Таджикистан",
                  AM: "Армению", GE: "Грузию", AZ: "Азербайджан", UZ: "Узбекистан" }[country]
              }
            </p>
          )}
          <div className={`grid gap-4 ${
            options.length === 1 ? "grid-cols-1 max-w-xs" :
            options.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
            "grid-cols-1 sm:grid-cols-3"
          }`}>
            {options.map((d, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 flex items-center gap-4">
                <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>{d.icon}</span>
                <div>
                  <p className="font-bold text-sm">{d.label}</p>
                  <p className="font-bold text-sm" style={{ color: "var(--ink)" }}>{d.days}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--ink-4)" }}>{d.price}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div className="mt-8 flex flex-wrap gap-2.5" {...fadeUp(0.3)}>
          {["Оригиналы", "Гарантия подлинности", "Трек-номер", "Поддержка 24/7"].map(b => (
            <span key={b} className="px-4 py-2 rounded-full text-xs font-medium"
              style={{ background: "var(--card)", boxShadow: "var(--shadow-xs)", color: "var(--ink-2)" }}>
              {b}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
