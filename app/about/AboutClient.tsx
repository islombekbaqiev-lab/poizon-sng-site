"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Country, Rates, DEFAULT_RATES } from "@/lib/types"
import CountryModal from "@/components/CountryModal"

const STATS = [
  { value: "100%", label: "Оригиналы" },
  { value: "3–25", label: "Дней доставка" },
  { value: "СНГ", label: "Доставляем" },
  { value: "24/7", label: "Поддержка" },
]

const STEPS = [
  { n: "01", title: "Находишь товар", body: "На Poizon (得物) или скидываешь нам ссылку — мы найдём сами." },
  { n: "02", title: "Мы выкупаем", body: "Оплачиваем на платформе, проверяем подлинность через экспертизу Poizon." },
  { n: "03", title: "Фото перед отправкой", body: "Делаем снимки товара вживую — видишь что едет до оплаты доставки." },
  { n: "04", title: "Доставка до двери", body: "Авиа (3–5 дней), Экспресс (10–12 дней) или Стандарт (~25 дней) — выбираешь сам." },
]

const GUARANTEES = [
  { title: "Оригинальность", body: "Каждый товар проходит проверку подлинности Poizon. В комплекте чек с QR-кодом." },
  { title: "Фото перед отправкой", body: "Присылаем реальные фото товара из Китая. Не понравилось — возвращаем деньги." },
  { title: "Трек-номер", body: "Отслеживаешь посылку на каждом этапе — от склада в Китае до твоей двери." },
  { title: "Поддержка до получения", body: "Менеджер на связи весь путь. Отвечаем быстро — обычно в течение часа." },
]

export default function AboutClient() {
  const [country,   setCountry]   = useState<Country | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [rates,     setRates]     = useState<Rates>(DEFAULT_RATES)

  useEffect(() => {
    const VALID: Country[] = ["RU", "BY", "KZ", "TJ", "AM", "GE", "AZ", "UZ"]
    const saved = localStorage.getItem("pzn_country") as Country | null
    if (saved && VALID.includes(saved)) setCountry(saved)
  }, [])

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/CNY")
      .then(r => r.json())
      .then(d => {
        if (d.rates) setRates({
          RUB: Math.round((d.rates.RUB + 1.2) * 10) / 10,
          KZT: Math.round(d.rates.KZT + 8),
          TJS: Math.round((d.rates.TJS + 0.2) * 100) / 100,
          UZS: Math.round(d.rates.UZS),
          BYN: Math.round((d.rates.BYN + 0.03) * 100) / 100,
          AMD: Math.round(d.rates.AMD + 5),
          GEL: Math.round((d.rates.GEL + 0.03) * 100) / 100,
          AZN: Math.round((d.rates.AZN + 0.02) * 100) / 100,
        })
      })
      .catch(() => {})
  }, [])

  return (
    <div style={{ background: "#04060F", color: "#fff", minHeight: "100vh" }}>
      {showModal && (
        <CountryModal onSelect={c => { setCountry(c); localStorage.setItem("pzn_country", c); setShowModal(false) }} />
      )}
      <Header country={country} rates={rates} onChangeCountry={() => setShowModal(true)} />

      <main className="max-w-4xl mx-auto px-5 sm:px-8 pt-28 pb-24">

        {/* Hero */}
        <div className="mb-16">
          <p className="eyebrow mb-4">О нас</p>
          <h1 className="font-black tracking-tighter leading-[.9] mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}>
            БАЙЕР-СЕРВИС
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.2)", color: "transparent", display: "block" }}>
              POIZON SNG
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,.55)" }}>
            Помогаем покупать оригинальные кроссовки, одежду и аксессуары с китайской платформы Poizon (得物)
            и доставляем в Россию, Казахстан, Беларусь и другие страны СНГ.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
          {STATS.map(s => (
            <div key={s.value} className="surface rounded-2xl p-5 text-center">
              <p className="text-3xl font-black tracking-tight mb-1" style={{ color: "#4D96FF" }}>{s.value}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,.4)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* What is Poizon */}
        <div className="surface rounded-3xl p-7 sm:p-10 mb-10">
          <h2 className="text-2xl font-black mb-4">Что такое Poizon (得物)?</h2>
          <p className="leading-relaxed mb-3" style={{ color: "rgba(255,255,255,.6)" }}>
            Poizon — крупнейшая китайская платформа для покупки и продажи брендовых товаров
            с обязательной экспертизой подлинности. Каждый товар перед отправкой покупателю
            проверяется независимыми экспертами.
          </p>
          <p className="leading-relaxed" style={{ color: "rgba(255,255,255,.6)" }}>
            На платформе представлены Nike, Adidas, Jordan, New Balance, Stone Island, Supreme
            и сотни других брендов — часто дешевле, чем в российских магазинах, даже с учётом доставки.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-10">
          <h2 className="text-2xl font-black mb-6">Как это работает</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {STEPS.map(s => (
              <div key={s.n} className="surface rounded-2xl p-6">
                <p className="text-4xl font-black mb-3" style={{ color: "rgba(77,150,255,.3)" }}>{s.n}</p>
                <p className="font-bold mb-1.5">{s.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.5)" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="mb-14">
          <h2 className="text-2xl font-black mb-6">Наши гарантии</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {GUARANTEES.map(g => (
              <div key={g.title} className="surface rounded-2xl p-6 flex gap-4">
                <span className="text-xl font-black flex-shrink-0" style={{ color: "#4D96FF" }}>✓</span>
                <div>
                  <p className="font-bold mb-1">{g.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.5)" }}>{g.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="surface-2 rounded-3xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl font-black mb-3">Готов сделать заказ?</h2>
          <p className="mb-6 text-sm" style={{ color: "rgba(255,255,255,.45)" }}>
            Напиши нам в Telegram — ответим в течение часа и поможем с выбором.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://t.me/PoizonAdvisor"
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: "#4D96FF", color: "#fff" }}
            >
              Написать в Telegram
            </a>
            <Link
              href="/#catalog"
              className="px-8 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.7)" }}
            >
              Смотреть каталог
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
