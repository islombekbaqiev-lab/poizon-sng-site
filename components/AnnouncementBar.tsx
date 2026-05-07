"use client"

const MSGS = [
  "✈️ Авиадоставка 3–5 дней",
  "⚡️ Экспресс 10–12 дней",
  "📦 Стандарт 25 дней",
  "🚚 По России через СДЭК",
  "🔥 Оригиналы с Poizon",
  "Оплата в ₽ · ₸ · с. · сум",
  "Бесплатный просчёт цены",
  "100% гарантия подлинности",
  "📦 Трек-номер на каждый заказ",
  "💬 Поддержка 24/7 в Telegram",
]

export default function AnnouncementBar() {
  const doubled = [...MSGS, ...MSGS]
  return (
    <div
      className="relative overflow-hidden flex items-center"
      style={{
        height: "30px",
        background: "rgba(77,150,255,0.07)",
        borderBottom: "1px solid rgba(77,150,255,0.11)",
      }}
    >
      <div className="marquee-fast flex items-center whitespace-nowrap">
        {doubled.map((msg, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span className="text-[11px] font-medium tracking-wide px-5"
              style={{ color: "rgba(255,255,255,0.75)" }}>
              {msg}
            </span>
            <span style={{ color: "rgba(77,150,255,0.22)", fontSize: "8px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
