"use client"

import { motion } from "framer-motion"

const REVIEWS = [
  {
    name: "Диана Новикова",
    handle: "@diana_novikova",
    avatar: "Д",
    color: "#e879f9",
    text: "Привет! Получила!! Кроссовки в отличном состоянии, без каких-либо дефектов. Очень рада что обратилась. Буду рекомендовать вас 💜",
    shoe: "Nike Air Force 1",
    stars: 5,
    date: "12 апр 2025",
  },
  {
    name: "Алишер Т.",
    handle: "@alisher_tashkent",
    avatar: "А",
    color: "#4D96FF",
    text: "Взял Travis Scott AJ1. Доставка 4 дня авиа. Всё пришло в оригинальной коробке, с чеком Poizon. Сервис топ 🔥",
    shoe: "Travis Scott AJ1",
    stars: 5,
    date: "3 мар 2025",
  },
  {
    name: "Максим К.",
    handle: "@maxim_kzn",
    avatar: "М",
    color: "#10b981",
    text: "Уже третий заказ. В этот раз Stone Island. Ребята профессионалы — всё чётко, трек-номер сразу, доставка точно в срок.",
    shoe: "Stone Island",
    stars: 5,
    date: "18 апр 2025",
  },
  {
    name: "Сабина О.",
    handle: "@sabina_almaty",
    avatar: "С",
    color: "#f59e0b",
    text: "Брала подарок мужу — Salomon XT-6. Он в шоке от качества. Упаковка идеальная, всё защищено. Огромное спасибо команде 🙏",
    shoe: "Salomon XT-6",
    stars: 5,
    date: "7 мая 2025",
  },
  {
    name: "Rustam N.",
    handle: "@rustam_uz",
    avatar: "R",
    color: "#f97316",
    text: "Ребята молодцы. Стандарт доставка — пришло за 23 дня. Цена вышла намного дешевле чем в местных магазинах. Качество 100% оригинал",
    shoe: "Nike AF1 Black",
    stars: 5,
    date: "22 фев 2025",
  },
  {
    name: "Дариус М.",
    handle: "@darius_almaty",
    avatar: "Д",
    color: "#06b6d4",
    text: "Ждал 5 дней авиа, всё пришло быстро. Коробка Nike целая, кроссовки точно оригинал — есть QR проверка в приложении. Рекомендую!",
    shoe: "Nike Air Force 1",
    stars: 5,
    date: "1 мая 2025",
  },
  {
    name: "Зарина Б.",
    handle: "@zarina_tashkent",
    avatar: "З",
    color: "#8b5cf6",
    text: "Взяла Fear of God Essentials. Качество как на картинке, швы ровные, бирки на месте. Цена вышла в три раза дешевле официального!",
    shoe: "Fear of God",
    stars: 5,
    date: "28 апр 2025",
  },
  {
    name: "Эмиль Д.",
    handle: "@emil_rnd",
    avatar: "Э",
    color: "#f59e0b",
    text: "Кроссовки отличные, оригинал — всё чётко. Авиа шла 7 дней вместо обещанных 5, но это мелочь. Следующий заказ уже планирую.",
    shoe: "Nike Dunk Low",
    stars: 4,
    date: "15 апр 2025",
  },
  {
    name: "Диля К.",
    handle: "@dilya_uz",
    avatar: "Д",
    color: "#6366f1",
    text: "Всё хорошо, но хотелось бы больше фото перед отправкой. Товар пришёл целый, оригинал проверила через QR. Цена лучше чем у конкурентов.",
    shoe: "Adidas NMD R1",
    stars: 4,
    date: "9 мар 2025",
  },
  {
    name: "Арман Б.",
    handle: "@arman_kz",
    avatar: "А",
    color: "#14b8a6",
    text: "Нормальный сервис. Немного переживал за таможню, но всё дошло без проблем. Упаковка хорошая, кроссы оригинальные. Возьму ещё.",
    shoe: "New Balance 550",
    stars: 4,
    date: "26 апр 2025",
  },
]

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < n ? "#FBBF24" : "rgba(255,255,255,0.15)", fontSize: 11 }}>★</span>
      ))}
    </div>
  )
}

function ReviewCard({ r, i }: { r: typeof REVIEWS[0]; i: number }) {
  return (
    <motion.div
      className="flex-shrink-0 flex flex-col rounded-2xl p-5"
      style={{
        width: 278,
        background: "rgba(8,16,36,0.88)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, borderColor: "rgba(77,150,255,0.22)", transition: { duration: 0.2 } }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
            style={{ background: `${r.color}22`, color: r.color, border: `1.5px solid ${r.color}44` }}
          >
            {r.avatar}
          </div>
          <div>
            <p className="text-xs font-bold leading-tight">{r.name}</p>
            <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{r.handle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full flex-shrink-0"
          style={{ background: "rgba(77,150,255,0.1)", border: "1px solid rgba(77,150,255,0.18)" }}>
          <svg width="7" height="7" viewBox="0 0 24 24" fill="#4D96FF">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span className="text-[8px] font-semibold" style={{ color: "#4D96FF" }}>подтверждён</span>
        </div>
      </div>

      <Stars n={r.stars} />

      <p className="text-xs leading-relaxed mt-2.5 mb-4 flex-1" style={{ color: "rgba(255,255,255,0.72)" }}>
        &ldquo;{r.text}&rdquo;
      </p>

      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${r.color}18`, color: r.color }}>
          {r.shoe}
        </span>
        <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>{r.date}</span>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">Отзывы</p>
          <h2 className="font-black leading-[.88] tracking-tighter mb-2"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 6.5rem)" }}>
            КЛИЕНТЫ
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.2)", color: "transparent", display: "block" }}>
              ГОВОРЯТ
            </span>
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,.28)" }}>245+ успешных заказов · реальные покупатели</p>
        </motion.div>

        <div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {REVIEWS.map((r, i) => (
            <div key={i} className="snap-start flex-shrink-0">
              <ReviewCard r={r} i={i} />
            </div>
          ))}
        </div>

        <motion.div
          className="mt-8 rounded-2xl p-5 flex flex-wrap items-center justify-center gap-8"
          style={{ background: "rgba(8,16,36,0.6)", border: "1px solid rgba(255,255,255,0.07)" }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <div className="text-center">
            <p className="text-3xl font-black" style={{ color: "#4D96FF" }}>5.0</p>
            <Stars n={5} />
            <p className="text-[10px] text-white/30 mt-1">Средняя оценка</p>
          </div>
          <div className="w-px h-10 hidden sm:block" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="text-center">
            <p className="text-3xl font-black">245+</p>
            <p className="text-[10px] text-white/30 mt-1">Выполнено заказов</p>
          </div>
          <div className="w-px h-10 hidden sm:block" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="text-center">
            <p className="text-3xl font-black" style={{ color: "#10b981" }}>100%</p>
            <p className="text-[10px] text-white/30 mt-1">Оригиналов</p>
          </div>
          <div className="w-px h-10 hidden sm:block" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="text-center">
            <p className="text-3xl font-black">4</p>
            <p className="text-[10px] text-white/30 mt-1">Страны доставки</p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
