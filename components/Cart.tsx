"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cart, useCart } from "@/lib/cart"
import { deliveryEstimate, fmtFull } from "@/lib/pricing"
import { usePricing } from "@/lib/usePricing"
import { buyUrl, cartMessage } from "@/lib/telegram"
import { poizonImg } from "@/lib/img"

export default function Cart() {
  const items = useCart()
  const [open, setOpen] = useState(false)
  const count = items.reduce((n, i) => n + i.qty, 0)

  useEffect(() => { if (!items.length) setOpen(false) }, [items.length])

  const { country, rates, price } = usePricing()
  const lines = items.map(i => {
    const unit = price(i.priceRUB)
    return { ...i, sum: { amount: unit.amount * i.qty, sym: unit.sym } }
  })
  const goods = {
    amount: lines.reduce((n, l) => n + l.sum.amount, 0),
    sym: price(0).sym,
  }
  const ship  = deliveryEstimate(items, country, rates)
  const total = fmtFull({ amount: goods.amount + ship.amount, sym: goods.sym })
  const shipLine = `Доставка ${ship.name.toLowerCase()} (~${ship.kg} кг): ≈ ${fmtFull(ship)}`
  const text = cartMessage(
    lines.map(l => ({ ...l, line: fmtFull(l.sum) })),
    shipLine,
    total,
  )

  return (
    <>
      {/* Плавающая кнопка — над мобильной «Написать @PoizonAdvisor» */}
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Открыть корзину"
            className="fixed right-4 bottom-24 lg:bottom-6 lg:right-6 z-[60] flex items-center gap-2 pl-4 pr-5 py-3 rounded-full text-white text-sm font-semibold"
            style={{ background: "var(--ink-block)", boxShadow: "0 12px 34px rgba(11,11,12,0.26)" }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            whileTap={{ scale: 0.94 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Корзина · {count}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[70]"
              style={{ background: "rgba(0,0,0,0.35)" }}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <motion.aside
              role="dialog"
              aria-label="Корзина"
              data-lenis-prevent
              className="fixed z-[71] bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl sm:left-auto sm:top-0 sm:bottom-0 sm:max-h-none sm:w-[420px] sm:rounded-none sm:rounded-l-3xl flex flex-col"
              style={{ background: "var(--card)", boxShadow: "0 -12px 40px rgba(0,0,0,0.18)" }}
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <p className="font-bold text-lg">Корзина</p>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => cart.clear()} className="text-xs" style={{ color: "var(--ink-4)" }}>
                    Очистить
                  </button>
                  <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть" className="text-2xl leading-none" style={{ color: "var(--ink-3)" }}>
                    ×
                  </button>
                </div>
              </div>

              <ul className="flex-1 overflow-y-auto px-5 divide-y" style={{ borderColor: "var(--line)" }}>
                {lines.map(i => (
                  <li key={i.id} className="flex gap-3 py-3" style={{ borderColor: "var(--line)" }}>
                    <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden" style={{ background: "#fff", border: "1px solid var(--line)" }}>
                      {i.image && <img src={poizonImg(i.image, 128)} alt="" className="w-full h-full object-contain p-1" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold leading-tight line-clamp-2">{i.name}</p>
                      {i.article && <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-4)" }}>арт. {i.article}</p>}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded-full" style={{ border: "1px solid var(--line)" }}>
                          <button type="button" onClick={() => cart.setQty(i.id, i.qty - 1)} className="w-7 h-7 text-sm" aria-label="Меньше">−</button>
                          <span className="w-6 text-center text-xs font-semibold">{i.qty}</span>
                          <button type="button" onClick={() => cart.setQty(i.id, i.qty + 1)} className="w-7 h-7 text-sm" aria-label="Больше">+</button>
                        </div>
                        <p className="text-sm font-bold">{fmtFull(i.sum)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="px-5 pt-3 pb-6" style={{ borderTop: "1px solid var(--line)" }}>
                <div className="flex items-baseline justify-between text-sm mb-1" style={{ color: "var(--ink-3)" }}>
                  <span>Товары</span><span>{fmtFull(goods)}</span>
                </div>
                <div className="flex items-baseline justify-between text-sm mb-2" style={{ color: "var(--ink-3)" }}>
                  <span>Доставка {ship.name.toLowerCase()}, {ship.days} · ~{ship.kg} кг</span><span>≈ {fmtFull(ship)}</span>
                </div>
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-sm" style={{ color: "var(--ink-3)" }}>Итого</span>
                  <span className="text-xl font-bold">{total}</span>
                </div>
                <a
                  href={buyUrl(text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { navigator.clipboard?.writeText(text).catch(() => {}) }}
                  className="flex items-center justify-center w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
                  style={{ background: "var(--ink-block)" }}
                >
                  Оформить в Telegram →
                </a>
                <p className="text-[11px] text-center mt-2" style={{ color: "var(--ink-4)" }}>
                  Цены «от» — за самый доступный размер. Менеджер подтвердит итог под ваш размер.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
