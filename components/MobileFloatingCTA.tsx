"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const TG_LINK = "https://t.me/PoizonAdvisor"

export default function MobileFloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 380)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 left-0 right-0 px-4 z-50 lg:hidden pointer-events-none"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
        >
          <motion.a
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl text-white font-bold text-sm pointer-events-auto"
            style={{
              background: "linear-gradient(135deg, #4D96FF 0%, #2563EB 100%)",
              boxShadow: "0 8px 32px rgba(77,150,255,0.48), 0 0 0 1px rgba(77,150,255,0.22)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M11.944 0A12 12 0 1 0 23.888 12 12.012 12.012 0 0 0 11.944 0zm3.3 8.444l-1.97 9.28c-.146.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.536-.194 1.006.131.833.941z"/>
            </svg>
            Написать @PoizonAdvisor
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
