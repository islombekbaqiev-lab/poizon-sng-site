"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { TG_LINK } from "@/lib/site"

const ITEMS = [
  {
    q: "Как убедиться, что товар оригинальный?",
    a: "Poizon (得物) — крупнейшая платформа аутентификации Китая. Каждый товар проходит экспертизу перед отправкой. В комплекте идёт чек Poizon с QR-кодом — вы можете проверить подлинность прямо в приложении.",
  },
  {
    q: "Сколько стоит доставка?",
    a: "Авиа (3–5 дней) — 225 ¥/кг, Экспресс (10–12 дней) — 173 ¥/кг, Стандарт (~25 дней) — 77 ¥/кг. Точная стоимость зависит от веса и объёма. Напишите — рассчитаем за 5 минут.",
  },
  {
    q: "Что входит в премиум‑сопровождение?",
    a: "Мы проверяем наличие и цену, помогаем с размером, выкупаем на Poizon, делаем фото/проверку перед отправкой и выдаём трек-номер. На связи до получения.",
  },
  {
    q: "Можно ли заказать товар, которого нет в каталоге?",
    a: "Да — это основная услуга. Скиньте ссылку с Poizon или название товара в Telegram, и мы выкупим всё что продаётся на платформе.",
  },
  {
    q: "Делаете ли фото перед отправкой?",
    a: "Да. После получения от Poizon мы фотографируем товар и упаковку перед отправкой — чтобы вы видели состояние и комплектацию.",
  },
  {
    q: "Что если товар придёт с дефектом?",
    a: "Мы проверяем товар после получения от Poizon — фотографируем до отправки. Если Poizon прислал брак, открываем спор и добиваемся возврата или замены.",
  },
  {
    q: "Как оплатить из России / Казахстана / Узбекистана?",
    a: "Принимаем переводы в ₽, ₸, BYN, сумах, сомони и других валютах СНГ. Способ оплаты подберём под вашу страну и банк в Telegram.",
  },
  {
    q: "Есть ли трек-номер?",
    a: "Да, трек-номер выдаётся на каждый заказ. Вы сможете отслеживать посылку через СДЭК, Почту России или международный трекер — зависит от выбранного способа доставки.",
  },
]

function Item({ item, isOpen, onToggle }: {
  item: typeof ITEMS[0]; isOpen: boolean; onToggle: () => void
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${isOpen ? "var(--line-2)" : "var(--line)"}`, background: "var(--card)", boxShadow: "var(--shadow-xs)", transition: "border-color .25s" }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        style={{ background: isOpen ? "var(--card-alt)" : "var(--card)", transition: "background .25s" }}
        onClick={onToggle}
      >
        <span className="text-sm font-semibold leading-snug" style={{ color: "var(--ink)" }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: isOpen ? "var(--accent)" : "rgba(17,17,19,0.08)", color: isOpen ? "#fff" : "var(--ink-3)" }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="px-6 pb-5 text-sm leading-relaxed"
              style={{ color: "var(--ink-3)", borderTop: "1px solid var(--line)" }}
            >
              <span className="block pt-4">{item.a}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="py-28" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow mb-4">Вопросы</p>
            <h2
              className="font-display leading-[1.0] mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
            >
              Частые
              <span className="block font-sans font-bold"
                style={{ color: "var(--ink-3)", letterSpacing: "-0.03em", fontSize: "0.8em" }}>
                вопросы
              </span>
            </h2>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: "var(--ink-4)" }}>
              Не нашли ответ? Напишите в Telegram — ответим в течение нескольких минут.
            </p>
            <motion.a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              whileHover={{ scale: 1.04, boxShadow: "0 10px 32px rgba(17,17,19,0.16)" }}
              whileTap={{ scale: 0.96 }}
            >
              Задать вопрос →
            </motion.a>
          </div>

          {/* Right — accordion */}
          <div className="flex flex-col gap-2">
            {ITEMS.map((item, i) => (
              <Item
                key={i}
                item={item}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
