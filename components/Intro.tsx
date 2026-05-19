"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 700)
    }, 2800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{ background: "#000", zIndex: 99999 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
        >
          {/* Subtle ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 600, height: 300,
              top: "50%", left: "50%",
              translate: "-50% -50%",
              background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Logo + shimmer container */}
          <motion.div
            className="relative text-center select-none overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
              className="font-semibold text-white/35 tracking-[0.5em] uppercase"
              style={{ fontSize: "clamp(0.65rem, 1.6vw, 0.95rem)", marginTop: "0.4em" }}
            >
              SNG
            </p>

            {/* Shimmer sweep — light streak across text */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.12) 55%, transparent 70%)",
                mixBlendMode: "screen",
              }}
              initial={{ x: "-130%" }}
              animate={{ x: "160%" }}
              transition={{ delay: 0.85, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
