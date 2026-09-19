"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const LETTERS = ["P", "O", "I", "Z", "O", "N"]

export default function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 700)
    }, 1800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{ background: "var(--page)", zIndex: 99999 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
        >
          {/* Мягкое мятное свечение вместо тёмной ауры */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 720, height: 340,
              top: "50%", left: "50%", translate: "-50% -50%",
              background: "radial-gradient(ellipse, var(--accent-sf) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="relative text-center select-none">
            <div className="flex items-end justify-center leading-none">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-display block"
                  style={{
                    fontSize: "clamp(3.2rem, 12vw, 7.5rem)",
                    color: "var(--ink)",
                    display: "inline-block",
                  }}
                  initial={{ opacity: 0, y: -28, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="font-semibold tracking-[0.5em] uppercase"
              style={{
                fontSize: "clamp(0.65rem, 1.6vw, 0.9rem)",
                marginTop: "0.6em",
                color: "var(--accent)",
              }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.35, ease: "easeOut" }}
            >
              SNG
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
