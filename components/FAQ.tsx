"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const TG_LINK = "https://t.me/PoizonAdvisor"

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
    q: "Как оплатить из России / Казахстана / Узбекистана?",
    a: "Принимаем переводы в ₽, ₸, сомони и сумах. Конкретный способ оплаты обсуждаем в Telegram — подберём удобный для вашей страны.",
  },
  {
    q: "Можно ли заказать товар, которого нет в каталоге?",
    a: "Да — это основная услуга. Скиньте ссылку с Poizon или название товара в Telegram, и мы выкупим всё что продаётся на платформе.",
  },
  {
    q: "Как узнать свой размер?",
    a: "На Poizon размеры в EU и US. Для Nike/Jordan стандартная таблица, для New Balance часто советуют +0.5. Уточняйте в Telegram — подскажем по конкретной модели.",
  },
  {
    q: "Что если товар придёт с дефектом?",
    a: "Мы проверяем товар после получения от Poizon — фотографируем до отправки. Если Poizon прислал брак, открываем спор и добиваемся возврата или замены.",
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
      style={{ border: `1px solid ${isOpen ? "rgba(77,150,255,.25)" : "rgba(255,255,255,.07)"}`, transition: "border-color .25s" }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        style={{ background: isOpen ? "rgba(77,150,255,.05)" : "rgba(8,14,28,.6)", transition: "background .25s" }}
        onClick={onToggle}
      >
        <span className="text-sm font-semibold leading-snug" style={{ color: isOpen ? "#fff" : "rgba(255,255,255,.75)" }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: isOpen ? "#4D96FF" : "rgba(255,255,255,.08)", color: "#fff" }}
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
              style={{ color: "rgba(255,255,255,.48)", borderTop: "1px solid rgba(255,255,255,.05)" }}
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
    <section id="faq" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow mb-4">Вопросы</p>
            <h2
              className="font-black leading-[.88] tracking-tighter mb-6"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 6.5rem)" }}
            >
              ЧАСТЫЕ
              <span
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.2)", color: "transparent", display: "block" }}
              >
                ВОПРОСЫ
              </span>
            </h2>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,.35)" }}>
              Не нашли ответ? Напишите в Telegram — ответим в течение нескольких минут.
            </p>
            <motion.a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-sm font-bold"
              style={{ background: "#4D96FF", boxShadow: "0 6px 24px rgba(77,150,255,.3)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 10px 32px rgba(77,150,255,.48)" }}
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
