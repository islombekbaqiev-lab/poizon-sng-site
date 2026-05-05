"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const LETTERS = "POIZON".split("")

export default function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 500)
    }, 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{ background: "#03080F", zIndex: 99999 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: "easeIn" },
          }}
        >
          {/* Static glow — no animation */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 600, height: 300,
              top: "50%", left: "50%",
              translate: "-50% -50%",
              background: "radial-gradient(ellipse, rgba(77,150,255,0.16) 0%, transparent 65%)",
              filter: "blur(48px)",
            }}
          />

          <div className="relative text-center select-none">
            {/* Letters fly in */}
            <div style={{ perspective: "700px" }}>
              <div className="flex justify-center">
                {LETTERS.map((char, i) => (
                  <motion.span
                    key={i}
                    className="font-black tracking-tighter inline-block"
                    style={{ fontSize: "clamp(4.5rem, 15vw, 10rem)", lineHeight: 1 }}
                    initial={{ opacity: 0, y: 60, rotateX: -70 }}
                    animate={{ opacity: 1, y: 0,  rotateX: 0 }}
                    transition={{
                      delay:    0.06 + i * 0.065,
                      duration: 0.55,
                      ease:     [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Underline */}
            <div className="relative h-px mx-auto mb-3" style={{ width: "80%" }}>
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{ background: "linear-gradient(to right, transparent, #4D96FF, transparent)" }}
                initial={{ width: "0%", left: "50%" }}
                animate={{ width: "100%", left: "0%" }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* SNG */}
            <motion.p
              className="font-black text-[#4D96FF] tracking-[0.55em] text-xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.45 }}
            >
              SNG
            </motion.p>

            {/* Tagline */}
            <motion.p
              className="text-white/20 text-[11px] tracking-[0.35em] uppercase mt-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.45 }}
            >
              Доставка из Китая в СНГ
            </motion.p>

            {/* Progress bar */}
            <div
              className="w-28 mx-auto rounded-full overflow-hidden"
              style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#4D96FF" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.1, duration: 1.9, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
