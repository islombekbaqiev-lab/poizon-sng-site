"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [mounted,  setMounted]  = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

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

    const move  = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true) }
    const down  = () => setClicking(true)
    const up    = () => setClicking(false)
    const over  = (e: MouseEvent) => {
      setHovering(!!(e.target as HTMLElement).closest("a, button, [data-hover]"))
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup",   up)
    document.addEventListener("mouseover", over)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup",   up)
      document.removeEventListener("mouseover", over)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: dx, y: dy,
          translateX: "-50%", translateY: "-50%",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          width:      hovering ? 6 : 5,
          height:     hovering ? 6 : 5,
          background: "#4D96FF",
          boxShadow:  "0 0 10px rgba(77,150,255,.8)",
          transition: "width .15s, height .15s, opacity .3s",
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: rx, y: ry,
          translateX: "-50%", translateY: "-50%",
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          width:      hovering ? 52 : 34,
          height:     hovering ? 52 : 34,
          border:     hovering
            ? "1.5px solid rgba(77,150,255,.55)"
            : "1px solid rgba(255,255,255,.22)",
          background: hovering ? "rgba(77,150,255,.06)" : "transparent",
          scale:      clicking ? 0.82 : 1,
          transition: "width .28s cubic-bezier(.22,1,.36,1), height .28s cubic-bezier(.22,1,.36,1), border .2s, background .2s, scale .1s",
        }}
      />
    </>
  )
}
