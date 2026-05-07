"use client"

const BRANDS = [
  "Nike", "Adidas", "New Balance", "Jordan", "Stone Island",
  "Off-White", "Fear of God", "The North Face", "Salomon", "Hoka",
  "Balenciaga", "Supreme", "Carhartt", "Rick Owens", "Y-3",
  "Stussy", "Asics", "Vans", "Puma", "Travis Scott",
]

export default function Marquee() {
  const items = [...BRANDS, ...BRANDS]
  return (
    <div
      className="overflow-hidden py-6"
      style={{ borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)" }}
    >
      <div className="marquee-inner flex items-center whitespace-nowrap">
        {items.map((b, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span className="text-xs font-bold uppercase tracking-[.24em]"
              style={{ color: "rgba(255,255,255,.45)" }}>
              {b}
            </span>
            <span className="mx-5 text-[6px]" style={{ color: "rgba(77,150,255,.28)" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
