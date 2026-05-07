"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const TG = "https://t.me/PoizonAdvisor"

const PRODUCTS = [
  { img: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20241222%2Faa3efedd7ed0417caaf8c8693e7e673d.jpg&w=800&q=85&fit=contain&fmt=auto&trim=0&v=1", name: "Travis Scott × AJ1 Low", brand: "Nike", tag: "Лимит", price: "38 900 ₽" },
  { img: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20230721%2Fdf3170de0e69448fb764a0f010e1cee8.jpg&w=800&q=85&fit=contain&fmt=auto&trim=0&v=1", name: "Samba OG", brand: "Adidas", tag: "Хит", price: "12 400 ₽" },
  { img: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20241122%2F08dea3882eaf47539bea473737782a49.jpeg&w=800&q=85&fit=contain&fmt=auto&trim=0&v=1", name: "Speedcat OG", brand: "Puma", tag: "Новинка", price: "9 800 ₽" },
]

const STEPS = [
  { n: "01", title: "Выбираешь", body: "Находишь в каталоге или скидываешь ссылку с Poizon — мы найдём что угодно." },
  { n: "02", title: "Мы покупаем", body: "Выкупаем у продавца, проверяем подлинность и упаковываем для авиадоставки." },
  { n: "03", title: "Получаешь", body: "Авиа от 3 дней. Трек-номер на каждый заказ. Доставка в Россию, Казахстан и СНГ." },
]

const TAGS: Record<string, { bg: string }> = {
  "Лимит":   { bg: "#ef4444" },
  "Хит":     { bg: "#4D96FF" },
  "Новинка": { bg: "#10b981" },
}

export default function Preview() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % PRODUCTS.length), 3200)
    return () => clearInterval(t)
  }, [])

  const p = PRODUCTS[active]

  return (
    <div style={{ background: "#04060F", color: "#fff", fontFamily: "'Inter', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(4,6,15,0.85)", backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: "-0.03em" }}>POIZON</span>
          <span style={{ background: "#4D96FF", fontSize: 9, fontWeight: 800, padding: "3px 7px", borderRadius: 6 }}>SNG</span>
        </div>
        <div style={{ display: "flex", gap: 32 }} className="hidden md:flex">
          {["Каталог","Доставка","Отзывы","FAQ"].map(l => (
            <a key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontWeight: 500, textDecoration: "none", cursor: "pointer" }}>{l}</a>
          ))}
        </div>
        <a href={TG} target="_blank" rel="noopener noreferrer" style={{
          background: "#fff", color: "#04060F", fontSize: 12, fontWeight: 700,
          padding: "9px 20px", borderRadius: 999, textDecoration: "none", letterSpacing: "-0.01em"
        }}>Написать →</a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", paddingTop: 56, display: "flex", alignItems: "center", position: "relative" }}>

        {/* single soft glow */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", top: "20%", right: "8%",
          background: "radial-gradient(circle, rgba(77,150,255,0.09) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px", width: "100%",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}
          className="hero-grid">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4D96FF", flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>
                Байер с Poizon · Доставка по СНГ
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 900, lineHeight: 0.92,
              letterSpacing: "-0.04em", marginBottom: 24 }}>
              Оригиналы<br />
              <span style={{ color: "#4D96FF" }}>из Китая</span>
            </h1>

            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.42)", lineHeight: 1.65,
              marginBottom: 40, maxWidth: 380 }}>
              Покупаем на Poizon и привозим к тебе. Кроссовки, одежда, аксессуары — авиа от 3 дней.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
              <a href="#catalog" style={{ background: "#4D96FF", color: "#fff", padding: "13px 28px",
                borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: "none",
                boxShadow: "0 4px 24px rgba(77,150,255,0.35)", letterSpacing: "-0.01em" }}>
                Смотреть каталог
              </a>
              <a href={TG} target="_blank" rel="noopener noreferrer" style={{
                background: "transparent", color: "rgba(255,255,255,0.7)", padding: "13px 28px",
                borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.12)", letterSpacing: "-0.01em" }}>
                Написать →
              </a>
            </div>

            <div style={{ display: "flex", gap: 40 }}>
              {[["245+","заказов"],["от 3","дней авиа"],["100%","оригиналы"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", marginTop: 4, letterSpacing: "0.04em" }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — product */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22,1,0.36,1] }}
            style={{ position: "relative" }}>

            <div style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
              {/* image */}
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ aspectRatio: "1/1", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain",
                    filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.7))" }} />
                </motion.div>
              </AnimatePresence>

              {/* bottom bar */}
              <div style={{ padding: "20px 24px", background: "rgba(255,255,255,0.03)",
                borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>{p.brand}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.01em" }}>{p.name}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 999,
                    background: TAGS[p.tag]?.bg || "#4D96FF", color: "#fff" }}>{p.tag}</span>
                  <span style={{ fontSize: 16, fontWeight: 900, color: "#4D96FF", letterSpacing: "-0.03em" }}>{p.price}</span>
                </div>
              </div>
            </div>

            {/* dots */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 16 }}>
              {PRODUCTS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  width: i === active ? 20 : 6, height: 6, borderRadius: 999, border: "none", cursor: "pointer",
                  background: i === active ? "#4D96FF" : "rgba(255,255,255,0.18)",
                  transition: "all 0.25s ease", padding: 0 }} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)" }} />

      {/* HOW */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 32px" }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#4D96FF",
            textTransform: "uppercase", marginBottom: 12 }}>Как это работает</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Просто. Быстро. Надёжно.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {STEPS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ padding: "32px 28px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.025)", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1,
                color: "rgba(255,255,255,0.04)", position: "absolute", top: 16, right: 20, userSelect: "none" }}>{s.n}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#4D96FF", letterSpacing: "0.12em",
                textTransform: "uppercase", marginBottom: 12 }}>Шаг {s.n}</div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>{s.title}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{s.body}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)" }} />

      {/* CATALOG PREVIEW */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 32px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#4D96FF",
              textTransform: "uppercase", marginBottom: 12 }}>Каталог</div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>Топ сейчас</h2>
          </div>
          <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none", fontWeight: 500 }}>Все товары →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {PRODUCTS.map((pr, i) => (
            <motion.div key={i} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}
              style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.025)", cursor: "pointer" }}>
              <div style={{ aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center",
                padding: 24, background: "rgba(255,255,255,0.02)" }}>
                <img src={pr.img} alt={pr.name} style={{ width: "100%", height: "100%", objectFit: "contain",
                  filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))" }} />
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.28)",
                    letterSpacing: "0.12em", textTransform: "uppercase" }}>{pr.brand}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                    background: TAGS[pr.tag]?.bg || "#4D96FF", color: "#fff" }}>{pr.tag}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.4, marginBottom: 8, letterSpacing: "-0.01em" }}>{pr.name}</div>
                <div style={{ fontSize: 15, fontWeight: 900, color: "#4D96FF", letterSpacing: "-0.02em" }}>{pr.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 100px" }}>
        <div style={{ borderRadius: 24, padding: "56px 48px",
          border: "1px solid rgba(77,150,255,0.18)", background: "rgba(77,150,255,0.05)",
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 8 }}>
              Нашёл что хочешь?
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.38)" }}>Напиши — рассчитаем цену за 5 минут</p>
          </div>
          <a href={TG} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", gap: 10, padding: "14px 32px",
            background: "#4D96FF", color: "#fff", borderRadius: 999, fontSize: 14, fontWeight: 700,
            textDecoration: "none", boxShadow: "0 8px 28px rgba(77,150,255,0.4)", letterSpacing: "-0.01em",
            whiteSpace: "nowrap" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M11.944 0A12 12 0 1 0 23.888 12 12.012 12.012 0 0 0 11.944 0zm3.3 8.444l-1.97 9.28c-.146.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.536-.194 1.006.131.833.941z"/>
            </svg>
            Написать @PoizonAdvisor
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  )
}
