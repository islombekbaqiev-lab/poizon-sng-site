"use client"

import { motion } from "framer-motion"
import { Country } from "@/app/page"

const STEPS = [
  { num: "01", title: "Выбираешь",  desc: "Из каталога или скидываешь ссылку с Poizon — найдём любой товар." },
  { num: "02", title: "Пишешь",     desc: "В Telegram — рассчитаем финальную цену с доставкой за 5 минут." },
  { num: "03", title: "Платишь",    desc: "₽, ₸, сум — принимаем всё. Безопасная сделка." },
  { num: "04", title: "Получаешь",  desc: "Доставка выбирается под твою страну и бюджет." },
]

type DeliveryOption = { icon: string; label: string; days: string; price: string }

const DELIVERY: Record<Country | "default", DeliveryOption[]> = {
  default: [
    { icon: "✈️", label: "Авиа",      days: "3–5 дней",    price: "225 ¥/кг" },
    { icon: "⚡️", label: "Экспресс",  days: "10–12 дней",  price: "173 ¥/кг" },
    { icon: "📦", label: "СДЭК",      days: "по России",   price: "доплата отдельно" },
  ],
  RU: [
    { icon: "✈️", label: "Авиа",      days: "3–5 дней",    price: "225 ¥/кг" },
    { icon: "⚡️", label: "Экспресс",  days: "10–12 дней",  price: "173 ¥/кг" },
    { icon: "📦", label: "СДЭК",      days: "по России",   price: "доплата отдельно" },
  ],
  BY: [
    { icon: "✈️", label: "Авиа",           days: "5–7 дней",   price: "225 ¥/кг" },
    { icon: "🚚", label: "Авто",           days: "20–25 дней", price: "87 ¥/кг"  },
    { icon: "📦", label: "Через Москву",   days: "СДЭК",       price: "доплата отдельно" },
  ],
  KZ: [
    { icon: "🚚", label: "Авто",      days: "4–8 дней",    price: "100 ¥/кг" },
  ],
  TJ: [
    { icon: "✈️", label: "Авиа",      days: "3–6 дней",    price: "100 ¥/кг" },
  ],
  AM: [
    { icon: "✈️", label: "Авиа",           days: "уточняйте",  price: "225 ¥/кг" },
    { icon: "📦", label: "Через Москву",   days: "СДЭК",       price: "доплата отдельно" },
  ],
  GE: [
    { icon: "✈️", label: "Авиа до Москвы", days: "3–5 дней",  price: "225 ¥/кг" },
    { icon: "📦", label: "Далее СДЭК",     days: "уточняйте", price: "доплата отдельно" },
  ],
  AZ: [
    { icon: "✈️", label: "Авиа до Москвы", days: "3–5 дней",  price: "225 ¥/кг" },
    { icon: "📦", label: "Далее СДЭК",     days: "уточняйте", price: "доплата отдельно" },
  ],
  UZ: [
    { icon: "✈️", label: "Авиа",      days: "3–6 дней",    price: "100 ¥/кг" },
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
    <section id="how" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div className="mb-16" {...fadeUp(0)}>
          <p className="eyebrow mb-4">Процесс</p>
          <h2 className="font-black leading-[.88] tracking-tighter"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 6.5rem)" }}>
            КАК ЭТО
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.2)", color: "transparent", display: "block" }}>
              РАБОТАЕТ
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "rgba(255,255,255,.05)" }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              className="flex flex-col p-8 group"
              style={{ background: "#04060F" }}
              {...fadeUp(i * 0.08)}
              whileHover={{ background: "rgba(77,150,255,.04)" } as any}
            >
              <span className="font-black mb-6 select-none"
                style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", color: "rgba(77,150,255,.15)", lineHeight: 1 }}>
                {s.num}
              </span>
              <p className="font-bold text-lg mb-3">{s.title}</p>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,.38)" }}>
                {s.desc}
              </p>
              <div className="mt-6 h-px w-10 rounded-full"
                style={{ background: "rgba(77,150,255,.35)" }} />
            </motion.div>
          ))}
        </div>

        {/* Delivery — country-aware */}
        <motion.div className="mt-8" {...fadeUp(0.24)}>
          {country && (
            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,.28)" }}>
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
                  <p className="font-black text-sm" style={{ color: "#4D96FF" }}>{d.days}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,.25)" }}>{d.price}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div className="mt-8 flex flex-wrap gap-2.5" {...fadeUp(0.3)}>
          {["✅ Оригиналы", "🛡️ Гарантия", "📦 Трек-номер", "💬 Поддержка 24/7"].map(b => (
            <span key={b} className="px-3.5 py-1.5 rounded-full text-xs"
              style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", color: "rgba(255,255,255,.38)" }}>
              {b}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
