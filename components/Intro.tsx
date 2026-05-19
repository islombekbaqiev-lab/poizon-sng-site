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
          style={{
            background: "linear-gradient(160deg, #04060F 0%, #050C1A 55%, #060D1F 100%)",
            zIndex: 99999,
          }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
        >
          {/* Blue aura */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 680, height: 320,
              top: "50%", left: "50%",
              translate: "-50% -50%",
              background: "radial-gradient(ellipse, rgba(77,150,255,0.16) 0%, rgba(77,150,255,0.05) 50%, transparent 72%)",
              filter: "blur(50px)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="relative text-center select-none">
            <div
              className="flex items-end justify-center leading-none"
              style={{ perspective: "600px" }}
            >
              {LETTERS.map((letter, i) => (
                <div key={i} className="relative inline-block">
                  <motion.span
                    className="font-black leading-none block"
                    style={{
                      fontSize: "clamp(3.5rem, 13vw, 8rem)",
                      letterSpacing: "-0.01em",
                      color: "rgba(255,255,255,0.62)",
                      textShadow: [
                        "0 4px 0 rgba(77,150,255,0.12)",
                        "0 10px 22px rgba(0,0,0,0.7)",
                      ].join(", "),
                      display: "inline-block",
                    }}
                    initial={{ opacity: 0, y: -40, rotateX: -65, scale: 0.82 }}
                    animate={{ opacity: 1, y: 0,   rotateX: 0,   scale: 1    }}
                    transition={{
                      delay: 0.05 + i * 0.05,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {letter}
                  </motion.span>

                  <motion.span
                    aria-hidden="true"
                    className="font-black leading-none absolute top-0 left-0 pointer-events-none"
                    style={{
                      fontSize: "clamp(3.5rem, 13vw, 8rem)",
                      letterSpacing: "-0.01em",
                      color: "transparent",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      backgroundImage: "linear-gradient(105deg, transparent 15%, rgba(220,235,255,0.4) 38%, rgba(255,255,255,1) 48%, rgba(255,255,255,1) 52%, rgba(220,235,255,0.4) 62%, transparent 85%)",
                      backgroundSize: "260% 100%",
                      backgroundRepeat: "no-repeat",
                      display: "inline-block",
                    }}
                    initial={{ backgroundPosition: "-120% 50%" }}
                    animate={{ backgroundPosition: "220% 50%" }}
                    transition={{
                      delay: 0.52 + i * 0.03,
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                </div>
              ))}
            </div>

            <motion.p
              className="font-semibold tracking-[0.5em] uppercase"
              style={{
                fontSize: "clamp(0.65rem, 1.6vw, 0.95rem)",
                marginTop: "0.5em",
                color: "rgba(255,255,255,0.36)",
                textShadow: "0 0 16px rgba(77,150,255,0.3)",
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
