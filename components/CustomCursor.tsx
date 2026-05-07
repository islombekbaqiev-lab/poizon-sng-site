"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type CursorMode = "" | "buy" | "drag"

export default function CustomCursor() {
  const [mounted,  setMounted]  = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [mode,     setMode]     = useState<CursorMode>("")

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Dot — instant
  const dx = useSpring(mx, { stiffness: 1400, damping: 60, mass: 0.2 })
  const dy = useSpring(my, { stiffness: 1400, damping: 60, mass: 0.2 })

  // Ring — soft lag
  const rx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.5 })
  const ry = useSpring(my, { stiffness: 120, damping: 18, mass: 0.5 })

  useEffect(() => {
    setMounted(true)
    if (!window.matchMedia("(pointer: fine)").matches) return

    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)

      const el = e.target as HTMLElement
      const cursorEl = el.closest("[data-cursor]")
      const m = (cursorEl?.getAttribute("data-cursor") ?? "") as CursorMode
      setMode(m)
      setHovering(!!(el.closest("a, button, [data-hover]") || cursorEl))
    }
    const down = () => setClicking(true)
    const up   = () => setClicking(false)

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup",   up)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup",   up)
    }
  }, [])

  if (!mounted) return null

  const ringSize = mode === "buy" ? 80 : hovering ? 52 : 34
  const showLabel = mode === "buy" || mode === "drag"
  const label = mode === "buy" ? "КУПИТЬ" : mode === "drag" ? "ТЯНУТЬ" : ""

  return (
    <>
      {/* Dot — hidden when label shown */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: dx, y: dy,
          translateX: "-50%", translateY: "-50%",
          zIndex: 99999,
          opacity: visible && !showLabel ? 1 : 0,
          width:  hovering ? 6 : 5,
          height: hovering ? 6 : 5,
          background: "#4D96FF",
          boxShadow: "0 0 10px rgba(77,150,255,.8)",
          transition: "width .15s, height .15s, opacity .2s",
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full flex items-center justify-center"
        style={{
          x: rx, y: ry,
          translateX: "-50%", translateY: "-50%",
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          width:  ringSize,
          height: ringSize,
          border: mode === "buy"
            ? "1.5px solid rgba(77,150,255,.7)"
            : hovering
              ? "1.5px solid rgba(77,150,255,.55)"
              : "1px solid rgba(255,255,255,.22)",
          background: mode === "buy"
            ? "rgba(77,150,255,.12)"
            : hovering
              ? "rgba(77,150,255,.06)"
              : "transparent",
          scale:  clicking ? 0.82 : 1,
          transition: "width .3s cubic-bezier(.22,1,.36,1), height .3s cubic-bezier(.22,1,.36,1), border .2s, background .2s, scale .1s, opacity .3s",
        }}
      >
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: ".14em",
              color: "#4D96FF",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
