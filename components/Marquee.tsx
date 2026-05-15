"use client"

const ITEMS = [
  "ОРИГИНАЛЫ ИЗ КИТАЯ",
  "БАЙЕР POIZON",
  "100% ПОДЛИННОСТЬ",
  "ДОСТАВКА В СНГ",
  "АВИА ОТ 3 ДНЕЙ",
  "ФОТО ПЕРЕД ОТПРАВКОЙ",
  "ОРИГИНАЛЫ ИЗ КИТАЯ",
  "ВЫКУП С POIZON",
  "ТРЕК НА КАЖДЫЙ ЗАКАЗ",
  "ПОМОЩЬ С РАЗМЕРОМ",
]

export default function Marquee() {
  const items = [...ITEMS, ...ITEMS]
  return (
    <div
      className="overflow-hidden py-5"
      style={{ borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)" }}
    >
      <div className="marquee-inner flex items-center whitespace-nowrap">
        {items.map((b, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span className="text-xs font-black uppercase tracking-[.22em]"
              style={{ color: "rgba(255,255,255,.5)" }}>
              {b}
            </span>
            <span className="mx-6 text-[6px]" style={{ color: "rgba(77,150,255,.35)" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
