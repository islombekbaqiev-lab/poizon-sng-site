"use client"

import { motion } from "framer-motion"

const STEPS = [
  { num: "01", title: "Выбираешь",  desc: "Из каталога или скидываешь ссылку с Poizon — мы найдём любой товар." },
  { num: "02", title: "Пишешь",     desc: "В Telegram — рассчитаем финальную цену вместе с доставкой за 5 минут." },
  { num: "03", title: "Платишь",    desc: "₽, ₸, с., сум — принимаем всё. Безопасная сделка." },
  { num: "04", title: "Получаешь",  desc: "Три варианта доставки: авиа от 3 дней, экспресс, стандарт." },
]

const DELIVERY = [
  { icon: "✈️", label: "Авиа",     days: "3–5 дней",   price: "225 ¥/кг" },
  { icon: "⚡️", label: "Экспресс", days: "10–12 дней", price: "173 ¥/кг" },
  { icon: "📦", label: "Стандарт", days: "25 дней",    price: "77 ¥/кг"  },
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as any },
  }
}

export default function HowItWorks() {
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
                style={{ background: "rgba(77,150,255,.35)", transition: "width .3s" }} />
            </motion.div>
          ))}
        </div>

        {/* Delivery */}
        <motion.div className="mt-8 grid grid-cols-3 gap-4" {...fadeUp(0.24)}>
          {DELIVERY.map((d, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 flex items-center gap-4">
              <span style={{ fontSize: "2rem" }}>{d.icon}</span>
              <div>
                <p className="font-bold text-sm">{d.label}</p>
                <p className="font-black text-sm" style={{ color: "#4D96FF" }}>{d.days}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,.25)" }}>{d.price}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div className="mt-8 flex flex-wrap gap-2.5" {...fadeUp(0.3)}>
          {["✅ Оригиналы", "🛡️ Гарантия", "📦 Трек-номер", "💬 Поддержка 24/7", "🚚 СДЭК по России"].map(b => (
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
