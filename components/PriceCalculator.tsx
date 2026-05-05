"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rates } from "@/app/page"

const DELIVERY_OPTIONS = [
  { id: "air",      icon: "✈️", label: "Авиа",     days: "3–5 дн",   rate: 225 },
  { id: "express",  icon: "⚡️", label: "Экспресс", days: "10–12 дн", rate: 173 },
  { id: "standard", icon: "📦", label: "Стандарт", days: "25 дн",    rate: 77  },
]

const CURRENCIES = [
  { key: "RUB" as keyof Rates, label: "Россия",      symbol: "₽",   flag: "🇷🇺" },
  { key: "KZT" as keyof Rates, label: "Казахстан",   symbol: "₸",   flag: "🇰🇿" },
  { key: "TJS" as keyof Rates, label: "Таджикистан", symbol: "с.",  flag: "🇹🇯" },
  { key: "UZS" as keyof Rates, label: "Узбекистан",  symbol: "сум", flag: "🇺🇿" },
]

const MARKUP = 1.15

function fmtAmount(n: number, sym: string) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M ${sym}`
  if (n >= 1_000)     return `${(n / 1000).toFixed(1)}к ${sym}`
  return `${Math.round(n)} ${sym}`
}

export default function PriceCalculator({ rates }: { rates: Rates }) {
  const [priceCNY, setPriceCNY] = useState("")
  const [weightKg, setWeightKg] = useState("0.7")
  const [delivery, setDelivery] = useState("air")

  const price   = parseFloat(priceCNY) || 0
  const weight  = parseFloat(weightKg) || 0
  const opt     = DELIVERY_OPTIONS.find(d => d.id === delivery)!

  const itemCostCNY     = price * MARKUP
  const deliveryCostCNY = weight * opt.rate
  const totalCNY        = itemCostCNY + deliveryCostCNY
  const hasResult       = price > 0

  return (
    <section id="calc" className="py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl font-black mb-1">Калькулятор цены</p>
          <p className="text-white/30 text-sm">Введи цену с Poizon — покажем итог с доставкой в твоей валюте</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* ── Left: inputs ── */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-6">

            {/* Price input */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.18em] mb-2.5"
                style={{ color: "rgba(255,255,255,0.3)" }}>
                Цена товара на Poizon
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={priceCNY}
                  onChange={e => setPriceCNY(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full glass rounded-2xl px-4 py-3.5 text-2xl font-black outline-none pr-12"
                  style={{
                    color:       "rgba(255,255,255,0.92)",
                    caretColor:  "#4D96FF",
                    border:      "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold"
                  style={{ color: "rgba(255,255,255,0.28)" }}>¥</span>
              </div>
            </div>

            {/* Weight quick-select */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.18em] mb-2.5"
                style={{ color: "rgba(255,255,255,0.3)" }}>
                Вес&nbsp;
                <span className="font-normal normal-case tracking-normal"
                  style={{ color: "rgba(255,255,255,0.2)" }}>
                  · кроссовки ~0.7 кг, куртка ~1 кг
                </span>
              </label>
              <div className="flex gap-2">
                {["0.5", "0.7", "1.0", "1.5"].map(w => (
                  <motion.button
                    key={w}
                    onClick={() => setWeightKg(w)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors"
                    style={{
                      background:  weightKg === w ? "#4D96FF"                 : "rgba(255,255,255,0.05)",
                      color:       weightKg === w ? "#fff"                    : "rgba(255,255,255,0.45)",
                      border:      `1px solid ${weightKg === w ? "#4D96FF" : "rgba(255,255,255,0.08)"}`,
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {w}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Delivery type */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.18em] mb-2.5"
                style={{ color: "rgba(255,255,255,0.3)" }}>
                Тип доставки
              </label>
              <div className="flex flex-col gap-2">
                {DELIVERY_OPTIONS.map(d => (
                  <motion.button
                    key={d.id}
                    onClick={() => setDelivery(d.id)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-left"
                    style={{
                      background: delivery === d.id ? "rgba(77,150,255,0.14)" : "rgba(255,255,255,0.04)",
                      border:     `1px solid ${delivery === d.id ? "rgba(77,150,255,0.32)" : "rgba(255,255,255,0.07)"}`,
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>{d.icon}</span>
                      <span className="font-semibold"
                        style={{ color: delivery === d.id ? "#fff" : "rgba(255,255,255,0.6)" }}>
                        {d.label}
                      </span>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>{d.days}</span>
                    </div>
                    <span className="text-xs font-bold"
                      style={{ color: delivery === d.id ? "#4D96FF" : "rgba(255,255,255,0.28)" }}>
                      {d.rate} ¥/кг
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right: result ── */}
          <div className="glass-card rounded-2xl p-6 flex flex-col min-h-[360px]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-5"
              style={{ color: "rgba(255,255,255,0.28)" }}>
              Итоговая стоимость
            </p>

            <AnimatePresence mode="wait">
              {!hasResult ? (
                <motion.div
                  key="empty"
                  className="flex-1 flex flex-col items-center justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-5xl">🧮</p>
                  <p className="text-white/22 text-sm text-center leading-relaxed">
                    Введи цену товара слева<br />и выбери доставку
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  className="flex-1 flex flex-col gap-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* CNY breakdown */}
                  <div className="rounded-xl p-4"
                    style={{ background: "rgba(77,150,255,0.08)", border: "1px solid rgba(77,150,255,0.14)" }}>
                    <div className="flex justify-between text-xs mb-1.5"
                      style={{ color: "rgba(255,255,255,0.38)" }}>
                      <span>Товар + наценка 15%</span>
                      <span>{itemCostCNY.toFixed(0)} ¥</span>
                    </div>
                    <div className="flex justify-between text-xs mb-3"
                      style={{ color: "rgba(255,255,255,0.38)" }}>
                      <span>Доставка ({weight} кг × {opt.rate} ¥)</span>
                      <span>{deliveryCostCNY.toFixed(0)} ¥</span>
                    </div>
                    <div className="flex justify-between text-sm font-black pt-3"
                      style={{ borderTop: "1px solid rgba(77,150,255,0.14)" }}>
                      <span>Итого</span>
                      <span style={{ color: "#4D96FF" }}>{totalCNY.toFixed(0)} ¥</span>
                    </div>
                  </div>

                  {/* Currency grid */}
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    {CURRENCIES.map(c => {
                      const amount = totalCNY * rates[c.key]
                      return (
                        <motion.div
                          key={c.key}
                          className="rounded-xl p-3.5 flex flex-col"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                          layout
                        >
                          <div className="flex items-center gap-1.5 mb-2">
                            <span style={{ fontSize: 14 }}>{c.flag}</span>
                            <span className="text-[9px] font-bold uppercase tracking-wide"
                              style={{ color: "rgba(255,255,255,0.3)" }}>
                              {c.label}
                            </span>
                          </div>
                          <p className="text-base font-black tracking-tight leading-none">
                            {fmtAmount(amount, c.symbol)}
                          </p>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="https://t.me/PoizonAdvisor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-sm"
                    style={{
                      background:  "linear-gradient(135deg, #4D96FF, #2563EB)",
                      boxShadow:   "0 6px 24px rgba(77,150,255,0.32)",
                    }}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(77,150,255,0.48)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Заказать за {totalCNY.toFixed(0)} ¥ →
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
