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
            className="relative text-center select-none"
            style={{ perspective: "900px" }}
            initial={{ opacity: 0, rotateX: 24, y: 20, scale: 0.93 }}
            animate={{ opacity: 1, rotateX: 0,  y: 0,  scale: 1   }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* POIZON base text */}
            <div className="relative inline-block leading-none">
              <p
                className="font-black leading-none"
                style={{
                  fontSize: "clamp(3.5rem, 13vw, 8rem)",
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  textShadow: [
                    "0 1px 0 rgba(255,255,255,0.5)",
                    "0 3px 0 rgba(180,210,255,0.22)",
                    "0 7px 0 rgba(77,150,255,0.14)",
                    "0 14px 28px rgba(0,0,0,0.6)",
                    "0 0 50px rgba(77,150,255,0.18)",
                  ].join(", "),
                }}
              >
                POIZON
              </p>

              {/* Shimmer — gradient clipped to letter shapes */}
              <motion.p
                aria-hidden="true"
                className="font-black leading-none absolute top-0 left-0 pointer-events-none"
                style={{
                  fontSize: "clamp(3.5rem, 13vw, 8rem)",
                  letterSpacing: "-0.025em",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundImage: "linear-gradient(105deg, transparent 15%, rgba(180,215,255,0.5) 32%, rgba(255,255,255,1) 50%, rgba(180,215,255,0.5) 68%, transparent 85%)",
                  backgroundSize: "220% 100%",
                  backgroundRepeat: "no-repeat",
                }}
                initial={{ backgroundPosition: "-80% 50%" }}
                animate={{ backgroundPosition: "180% 50%" }}
                transition={{ delay: 0.95, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
              >
                POIZON
              </motion.p>
            </div>

            <p
              className="font-semibold tracking-[0.5em] uppercase"
              style={{
                fontSize: "clamp(0.65rem, 1.6vw, 0.95rem)",
                marginTop: "0.5em",
                color: "rgba(255,255,255,0.36)",
                textShadow: "0 0 18px rgba(77,150,255,0.28)",
              }}
            >
              SNG
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
