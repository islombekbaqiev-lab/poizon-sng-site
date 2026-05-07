"use client"

import React, { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useInView, animate } from "framer-motion"

const TG_LINK = "https://t.me/PoizonAdvisor"

const CARDS = [
  {
    img: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20241222%2Faa3efedd7ed0417caaf8c8693e7e673d.jpg&w=600&q=75&fit=contain&fmt=auto&trim=0&v=1",
    name: "Travis Scott × AJ1 Low", brand: "Nike",  tag: "Лимит",   tagBg: "#ef4444", fallbackBg: "#f5f5f0",
  },
  {
    img: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20230721%2Fdf3170de0e69448fb764a0f010e1cee8.jpg&w=600&q=75&fit=contain&fmt=auto&trim=0&v=1",
    name: "Samba OG", brand: "Adidas", tag: "Хит",     tagBg: "#111",    fallbackBg: "#f0f0f0",
  },
  {
    img: "https://proxy.b2baisolutions.io/v1/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20241122%2F08dea3882eaf47539bea473737782a49.jpeg&w=600&q=75&fit=contain&fmt=auto&trim=0&v=1",
    name: "Speedcat OG", brand: "Puma", tag: "Новинка", tagBg: "#10b981", fallbackBg: "#f5f0ee",
  },
]

// closed stack: [rotate, x, y, scale]
const STACK_POS = [
  [  0,   0,   0, 1    ],
  [  7,  22,  14, 0.91 ],
  [ 14,  44,  28, 0.82 ],
] as const

// fan-out state
const FAN_POS = [
  [ -20, -155,  18, 0.93 ],
  [   0,    0, -16, 1.03 ],
  [  20,  155,  18, 0.93 ],
] as const

const STATS = [
  { n: "245+", label: "заказов"       },
  { n: "от 3", label: "дней авиа"     },
  { n: "8",    label: "стран СНГ"     },
  { n: "100%", label: "оригиналы"     },
]

// ── Magnetic button ──────────────────────────────────────────────────────────
function Magnetic({ children, className, style, href, target, rel, onClick }: any) {
  const ref    = useRef<HTMLElement>(null)
  const x      = useMotionValue(0)
  const y      = useMotionValue(0)
  const sx     = useSpring(x, { stiffness: 180, damping: 16 })
  const sy     = useSpring(y, { stiffness: 180, damping: 16 })

  const move = (e: React.MouseEvent) => {
    const el   = ref.current!
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width  / 2) * 0.38)
    y.set((e.clientY - rect.top  - rect.height / 2) * 0.38)
  }
  const leave = () => { x.set(0); y.set(0) }

  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      ref={ref as any}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={className}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={move}
      onMouseLeave={leave}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Tag>
  )
}

// ── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ value }: { value: string }) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView || !ref.current) return
    const m = value.match(/^(\d+)(.*)$/)
    if (!m) { ref.current.textContent = value; return }
    const ctrl = animate(0, parseInt(m[1], 10), {
      duration: 2, ease: "easeOut",
      onUpdate: v => { if (ref.current) ref.current.textContent = Math.round(v) + m[2] },
    })
    return () => ctrl.stop()
  }, [inView, value])
  return <span ref={ref}>{value}</span>
}

// ── Single product card ───────────────────────────────────────────────────────
function ProductCard({
  card, rotate, x, y, scale, zIndex, transition,
}: {
  card: typeof CARDS[number]
  rotate: number; x: number; y: number; scale: number; zIndex: number
  transition: object
}) {
  const [imgErr, setImgErr] = React.useState(false)
  const W = 220, H = 290
  return (
    <motion.div
      animate={{ rotate, x, y, scale }}
      transition={transition}
      style={{
        position: "absolute",
        width: W, height: H,
        zIndex,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.07)",
        transformOrigin: "center bottom",
      }}
    >
      {/* Image area */}
      <div style={{ background: imgErr ? card.fallbackBg : "#f0ede8", height: "65%", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px" }}>
        {imgErr ? (
          <span style={{ fontSize: 13, fontWeight: 900, color: "#111", letterSpacing: "-.01em", textAlign: "center" }}>
            {card.brand}
          </span>
        ) : (
          <img
            src={card.img} alt={card.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            draggable={false}
            onError={() => setImgErr(true)}
          />
        )}
      </div>

      {/* Info area */}
      <div style={{
        background: "#0A0F1E",
        height: "35%",
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
      }}>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".14em", fontWeight: 700 }}>
            {card.brand}
          </span>
          <span style={{
            fontSize: 8, fontWeight: 800, color: "#fff",
            background: card.tagBg, padding: "2px 6px", borderRadius: 4,
          }}>
            {card.tag}
          </span>
        </div>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.3, letterSpacing: "-.01em" }}>
          {card.name}
        </p>
      </div>
    </motion.div>
  )
}

// ── Stacked cards ─────────────────────────────────────────────────────────────
function StackedCards() {
  const [open, setOpen] = React.useState(false)
  const t = { type: "spring", stiffness: 260, damping: 24 }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 340, height: 340 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(o => !o)}
    >
      {/* Glow */}
      <div className="absolute rounded-full pointer-events-none" style={{
        width: 360, height: 360,
        top: "50%", left: "50%", translate: "-50% -50%",
        background: "radial-gradient(circle, rgba(77,150,255,.14) 0%, transparent 65%)",
        filter: "blur(50px)",
      }} />

      {[...CARDS].reverse().map((card, ri) => {
        const i  = CARDS.length - 1 - ri
        const pos = open ? FAN_POS[i] : STACK_POS[i]
        return (
          <ProductCard
            key={i}
            card={card}
            rotate={pos[0]} x={pos[1]} y={pos[2]} scale={pos[3]}
            zIndex={open ? (i === 1 ? 3 : 1) : CARDS.length - i}
            transition={{ ...t, delay: open ? i * 0.04 : (CARDS.length - 1 - i) * 0.03 }}
          />
        )
      })}

      {/* Hint */}
      <motion.p
        animate={{ opacity: open ? 0 : 0.3 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute", bottom: -28,
          left: "50%", translate: "-50% 0",
          fontSize: 10, fontWeight: 600,
          color: "#fff", whiteSpace: "nowrap",
          letterSpacing: ".1em", textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        <span className="hidden lg:inline">наведи →</span>
        <span className="lg:hidden">тапни →</span>
      </motion.p>
    </div>
  )
}

// ── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[60px]">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[40%] right-[10%] -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(77,150,255,.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div className="blob1 absolute top-[-15%] left-[-8%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,.16), transparent 70%)", filter: "blur(70px)" }} />
        <div className="blob2 absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,.13), transparent 70%)", filter: "blur(70px)" }} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-100" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-0 items-center min-h-[calc(100vh-120px)]">

          {/* ── Left ── */}
          <div className="flex flex-col justify-center">

            {/* Eyebrow */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                style={{ background: "rgba(77,150,255,.08)", border: "1px solid rgba(77,150,255,.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#4D96FF" }} />
                <span className="eyebrow" style={{ letterSpacing: ".16em" }}>
                  Poizon SNG · Доставка по СНГ
                </span>
              </div>
            </motion.div>

            {/* Display heading */}
            <div className="mb-7">
              <Reveal delay={0.2}>
                <h1 className="font-black leading-[.85] tracking-tighter select-none"
                  style={{ fontSize: "clamp(3.5rem, 9.5vw, 9.5rem)" }}>
                  ОРИГИНАЛЫ
                </h1>
              </Reveal>
              <Reveal delay={0.32}>
                <h1
                  className="font-black leading-[.85] tracking-tighter select-none"
                  style={{
                    fontSize: "clamp(3.5rem, 9.5vw, 9.5rem)",
                    WebkitTextStroke: "1.5px rgba(255,255,255,.22)",
                    color: "transparent",
                  }}
                >
                  ИЗ КИТАЯ
                </h1>
              </Reveal>
            </div>

            {/* Sub */}
            <motion.p
              className="text-base sm:text-lg mb-10 max-w-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,.38)" }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.6 }}
            >
              Покупаем на Poizon — привозим к тебе.<br />
              Кроссовки, одежда, аксессуары.
            </motion.p>

            {/* Mobile cards */}
            <motion.div
              className="lg:hidden flex justify-center mb-8"
              initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div style={{ transform: "scale(0.72)", transformOrigin: "center center", height: 260 }}>
                <StackedCards />
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mb-10"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.55 }}
            >
              <Magnetic
                href="#catalog"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white font-bold text-sm"
                style={{
                  background: "#4D96FF",
                  boxShadow: "0 8px 32px rgba(77,150,255,.38), 0 0 0 1px rgba(77,150,255,.2)",
                }}
              >
                Смотреть каталог ↓
              </Magnetic>

              <Magnetic
                href={TG_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,.055)",
                  border: "1px solid rgba(255,255,255,.1)",
                  color: "rgba(255,255,255,.6)",
                }}
              >
                Написать →
              </Magnetic>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-x-8 gap-y-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              {STATS.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
                    <CountUp value={s.n} />
                  </span>
                  <span className="text-[11px] mt-1 tracking-wide" style={{ color: "rgba(255,255,255,.28)" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right — desktop ── */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <StackedCards />
          </motion.div>

        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 line-h" />
    </section>
  )
}
