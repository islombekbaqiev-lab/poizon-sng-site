"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 600)
    }, 1500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ background: "#000", zIndex: 99999 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.6, 1] } }}
        >
          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 500, height: 260,
              top: "50%", left: "50%",
              translate: "-50% -50%",
              background: "radial-gradient(ellipse, rgba(255,255,255,0.055) 0%, transparent 68%)",
              filter: "blur(50px)",
            }}
          />

          {/* Logo — blooms from center like iPhone */}
          <motion.div
            className="relative text-center select-none"
            initial={{ scale: 0.28, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-black text-white leading-none"
              style={{
                fontSize: "clamp(3.5rem, 13vw, 8rem)",
                letterSpacing: "-0.025em",
              }}
            >
              POIZON
            </p>
            <p
              className="font-semibold text-white/40 tracking-[0.5em] uppercase"
              style={{ fontSize: "clamp(0.65rem, 1.6vw, 0.95rem)", marginTop: "0.35em" }}
            >
              SNG
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
