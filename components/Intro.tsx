"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 900)
    }, 3200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #04060F 0%, #050C1A 55%, #060D1F 100%)",
            zIndex: 99999,
          }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } }}
        >
          {/* Blue radial aura behind text */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 700, height: 340,
              top: "50%", left: "50%",
              translate: "-50% -50%",
              background: "radial-gradient(ellipse, rgba(77,150,255,0.13) 0%, rgba(77,150,255,0.04) 45%, transparent 72%)",
              filter: "blur(55px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Outer glow ring — subtle depth */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 480, height: 180,
              top: "50%", left: "50%",
              translate: "-50% -50%",
              background: "radial-gradient(ellipse, rgba(77,150,255,0.07) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
          />

          {/* Logo — perspective 3D rise */}
          <motion.div
            className="relative text-center select-none overflow-hidden"
            style={{ perspective: "800px" }}
            initial={{ opacity: 0, rotateX: 28, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, rotateX: 0,  y: 0,  scale: 1   }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* POIZON — 3D text shadow depth */}
            <p
              className="font-black leading-none"
              style={{
                fontSize: "clamp(3.5rem, 13vw, 8rem)",
                letterSpacing: "-0.025em",
                color: "#fff",
                textShadow: [
                  "0 1px 0 rgba(255,255,255,0.55)",
                  "0 2px 0 rgba(200,220,255,0.25)",
                  "0 4px 0 rgba(77,150,255,0.18)",
                  "0 8px 0 rgba(77,150,255,0.10)",
                  "0 16px 32px rgba(0,0,0,0.55)",
                  "0 2px 40px rgba(77,150,255,0.22)",
                ].join(", "),
              }}
            >
              POIZON
            </p>

            <p
              className="font-semibold tracking-[0.5em] uppercase"
              style={{
                fontSize: "clamp(0.65rem, 1.6vw, 0.95rem)",
                marginTop: "0.45em",
                color: "rgba(255,255,255,0.38)",
                textShadow: "0 0 20px rgba(77,150,255,0.3)",
                letterSpacing: "0.5em",
              }}
            >
              SNG
            </p>

            {/* Shimmer — slow, wide, blue-tinted luxury sweep */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                inset: "-20% -30%",
                background: "linear-gradient(108deg, transparent 25%, rgba(180,210,255,0.08) 42%, rgba(255,255,255,0.52) 50%, rgba(180,210,255,0.08) 58%, transparent 75%)",
                mixBlendMode: "screen",
              }}
              initial={{ x: "-140%" }}
              animate={{ x: "170%" }}
              transition={{ delay: 1.0, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
