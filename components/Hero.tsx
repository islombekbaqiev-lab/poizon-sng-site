"use client"

import React, { useEffect, useRef, useState } from "react"
import { useInView, animate } from "framer-motion"

import { buildTelegramUrl, leadStart } from "@/lib/telegram"
import { poizonImg } from "@/lib/img"

const CARDS = [
  {
    img: "https://cdn-img.thepoizon.ru/pro-img/origin-img/20260703/dc5a5e9bac6c49afa2c6a34f25747312.jpg",
    name: "Air Force 1 Low '07", brand: "Nike", tag: "Хит",
  },
  {
    img: "https://cdn-img.thepoizon.ru/pro-img/origin-img/20250306/f3748d6e974f4d17a2c565a305559494.jpg",
    name: "Sportswear T-Shirt", brand: "Nike", tag: "Новинка",
  },
  {
    img: "https://cdn-img.thepoizon.ru/pro-img/origin-img/20250620/948572a18f99441fad84a85e4dabce67.jpg",
    name: "Le Pliage Large", brand: "Longchamp", tag: "Лимит",
  },
]

const STATS = [
  { n: "245+", label: "заказов"   },
  { n: "от 3", label: "дней авиа" },
  { n: "8",    label: "стран СНГ" },
  { n: "100%", label: "оригиналы" },
]

const TRUST = ["Оплата после фото товара", "Работаем с 2023", "Не нашли — вернём деньги"]

/* ── Счётчик ──────────────────────────────────────────────────────────── */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView || !ref.current) return
    const m = value.match(/^(\d+)(.*)$/)
    if (!m) { ref.current.textContent = value; return }
    const ctrl = animate(0, parseInt(m[1], 10), {
      duration: 1.4, ease: "easeOut",
      onUpdate: v => { if (ref.current) ref.current.textContent = Math.round(v) + m[2] },
    })
    return () => ctrl.stop()
  }, [inView, value])
  return <span ref={ref}>{value}</span>
}

/* ── Карточка товара в герое ──────────────────────────────────────────── */
function HeroCard({ card, i }: { card: typeof CARDS[number]; i: number }) {
  const [err, setErr] = useState(false)
  return (
    <article
      className="rise card-lift overflow-hidden flex flex-col"
      style={{ animationDelay: `${250 + i * 90}ms` }}>
      {/* Товар всегда на чистом белом — так его видно, а не оформление вокруг */}
      {/* Растягиваем сцену с товаром на всю доступную высоту карточки,
          иначе у вытянутой «главной» карточки под фото остаётся пустота */}
      {/* Квадратная сцена: товар занимает кадр целиком и не тонет в пустоте */}
      <div className="product-stage relative" style={{ aspectRatio: "1 / 1" }}>
        {card.tag && (
          <span
            className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide"
            style={{ background: "var(--ink-block)", color: "#fff" }}
          >
            {card.tag}
          </span>
        )}
        {err ? (
          <span className="text-sm font-bold" style={{ color: "var(--ink-4)" }}>{card.brand}</span>
        ) : (
          <img
            src={poizonImg(card.img, 480)} alt={card.name} draggable={false}
            loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"}
            width={480} height={480}
            onError={() => setErr(true)}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: "12%" }}
          />
        )}
      </div>

      <div className="px-4 pb-4 pt-3">
        <p className="eyebrow mb-1" style={{ fontSize: ".625rem", letterSpacing: ".14em" }}>{card.brand}</p>
        <p className="text-sm font-semibold leading-snug" style={{ color: "var(--ink)" }}>{card.name}</p>
      </div>
    </article>
  )
}

function useOnlineStatus() {
  const [online, setOnline] = useState(false)
  useEffect(() => {
    const h = new Date(new Date().toLocaleString("en", { timeZone: "Europe/Moscow" })).getHours()
    setOnline(h >= 9 && h < 23)
  }, [])
  return online
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
export default function Hero() {
  const online = useOnlineStatus()

  return (
    <section className="relative pt-[84px] pb-14 sm:pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="hero-grid">

          {/* ── Текстовая колонка ── */}
          <div>
            <div
              className="rise inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-7"
              style={{ background: "var(--card)", boxShadow: "var(--shadow-xs)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--ink)" }} />
              <span className="text-[11px] font-semibold tracking-[.12em] uppercase" style={{ color: "var(--ink-2)" }}>
                Доставка по СНГ
              </span>
            </div>

            {/* Заголовок: антиква + гротеск, как в референсе «Discover / Your Best Clothes» */}
            <h1
              className="rise mb-6"
             style={{ animationDelay: "60ms" }}>
              <span className="font-display block leading-[0.95]"
                style={{ fontSize: "clamp(2.9rem, 7vw, 5rem)", color: "var(--ink)" }}>
                Оригиналы
              </span>
              <span className="block font-bold leading-[1.05] mt-1"
                style={{ fontSize: "clamp(2.4rem, 5.6vw, 4rem)", color: "var(--ink-4)", letterSpacing: "-0.03em" }}>
                из Китая
              </span>
            </h1>

            <p
              className="rise text-base sm:text-lg leading-relaxed mb-8 max-w-md"
              style={{ animationDelay: "160ms",  color: "var(--ink-3)" }}
            >
              Выкупаем на Poizon, привозим к тебе. Кроссовки, одежда, аксессуары.
            </p>

            <div
              className="rise flex flex-wrap items-center gap-3 mb-8"
             style={{ animationDelay: "220ms" }}>
              <a
                href={buildTelegramUrl({ start: leadStart("hero") })}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: online ? "#4ade80" : "#cbd5e1" }} />
                  <span className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: online ? "#4ade80" : "#cbd5e1" }} />
                </span>
                {online ? "Скинуть ссылку на товар" : "Написать — ответим утром"}
                <span aria-hidden>→</span>
              </a>

              <a href="#catalog" className="btn btn-ghost">
                Смотреть каталог <span aria-hidden>↓</span>
              </a>
            </div>

            {/* Микро-гарантии */}
            <ul
              className="rise flex flex-wrap items-center gap-x-5 gap-y-2 mb-9"
             style={{ animationDelay: "300ms" }}>
              {TRUST.map(t => (
                <li key={t} className="inline-flex items-center gap-1.5 text-[13px]" style={{ color: "var(--ink-3)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                  {t}
                </li>
              ))}
            </ul>

            {/* Цифры */}
            <div
              className="rise flex flex-wrap gap-x-9 gap-y-5 pt-7"
              style={{ animationDelay: "360ms",  borderTop: "1px solid var(--line)" }}
            >
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="font-display text-2xl sm:text-3xl leading-none" style={{ color: "var(--ink)" }}>
                    <CountUp value={s.n} />
                  </div>
                  <div className="text-[11px] mt-1.5 tracking-wide" style={{ color: "var(--ink-4)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Витрина ── */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 items-start">
            {CARDS.map((c, i) => (
              <HeroCard key={c.name} card={c} i={i} />
            ))}

            {/* Четвёртая ячейка — не товар, а причина довериться */}
            <div
              className="rise rounded-[28px] p-6 flex flex-col justify-between"
              style={{ animationDelay: "520ms",  background: "var(--ink-block)", minHeight: 260, boxShadow: "var(--shadow-ink)" }}
            >
              <div>
                <p className="font-display text-[2.1rem] leading-none mb-2.5" style={{ color: "#fff" }}>
                  Любой товар
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                  Каталог — только витрина. Скинь ссылку с Poizon на что угодно — выкупим и привезём.
                </p>
              </div>
              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold mt-5 px-5 py-2.5 rounded-full self-start"
                style={{ background: "#fff", color: "var(--ink)" }}
              >
                Открыть каталог <span aria-hidden>→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
