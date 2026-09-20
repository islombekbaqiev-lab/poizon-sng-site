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
        background: "var(--sunken)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="marquee-fast flex items-center whitespace-nowrap">
        {doubled.map((msg, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span className="text-[11px] font-medium tracking-wide px-5"
              style={{ color: "var(--ink-2)" }}>
              {msg}
            </span>
            <span style={{ color: "var(--ink-4)", fontSize: "8px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
