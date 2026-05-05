"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Country } from "@/app/page"

const COUNTRIES: { code: Country; flag: string; name: string; city: string }[] = [
  { code: "RU", flag: "🇷🇺", name: "Россия",       city: "Москва"   },
  { code: "BY", flag: "🇧🇾", name: "Беларусь",     city: "Минск"    },
  { code: "KZ", flag: "🇰🇿", name: "Казахстан",    city: "Алматы"   },
  { code: "AM", flag: "🇦🇲", name: "Армения",      city: "Ереван"   },
  { code: "GE", flag: "🇬🇪", name: "Грузия",       city: "Тбилиси"  },
  { code: "AZ", flag: "🇦🇿", name: "Азербайджан",  city: "Баку"     },
  { code: "UZ", flag: "🇺🇿", name: "Узбекистан",   city: "Ташкент"  },
]

export default function CountryModal({ onSelect }: { onSelect: (c: Country) => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(5,12,26,0.75)", backdropFilter: "blur(32px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-full max-w-sm mx-4"
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="text-4xl font-black tracking-tighter mb-2">
            POIZON <span className="text-[#4D96FF]">SNG</span>
          </p>
          <p className="text-white/35 text-sm">Оригиналы из Китая · доставка по СНГ</p>
        </div>

        <div className="glass-card rounded-3xl p-5">
          <p className="text-center text-white/35 text-xs mb-4 uppercase tracking-wider">
            Выбери страну доставки
          </p>
          <div className="grid grid-cols-2 gap-2">
            {COUNTRIES.map((c, i) => (
              <motion.button
                key={c.code}
                onClick={() => onSelect(c.code)}
                className={`flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border border-white/[0.07] hover:border-[#4D96FF]/40 hover:bg-[#4D96FF]/10${i === COUNTRIES.length - 1 && COUNTRIES.length % 2 !== 0 ? " col-span-2" : ""}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.35, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="text-2xl">{c.flag}</span>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-[10px] text-white/35">{c.city}</p>
              </motion.button>
            ))}
          </div>
        </div>

        <p className="text-center text-white/20 text-xs mt-4">Поменять можно в любой момент</p>
      </motion.div>
    </motion.div>
  )
}
