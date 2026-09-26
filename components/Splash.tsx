/**
 * Заставка при первом заходе за сессию.
 *
 * Чистый HTML + CSS (стили — .splash-* в globals.css), без JS-зависимостей:
 * видна с первого кадра, а не после гидрации, как прежний Intro на
 * framer-motion, который сначала показывал сайт, а потом закрывал его.
 * Показывается, только если инлайн-скрипт в layout поставил html[data-intro];
 * тап по заставке сразу её убирает.
 */
const WORD = "POIZON"

const STICKERS = [
  { text: "✓ 100% оригинал", pos: "splash-st-1" },
  { text: "Любой товар с Poizon", pos: "splash-st-2" },
  { text: "✈ от 3 дней", pos: "splash-st-3" },
  { text: "8 стран СНГ", pos: "splash-st-4" },
]

const RIBBON = "POIZON ✦ SNG ✦ ОРИГИНАЛЫ ИЗ КИТАЯ ✦ КРОССОВКИ ✦ ОДЕЖДА ✦ СУМКИ ✦ "

export default function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-ribbon">
        <div className="splash-ribbon-in">{RIBBON.repeat(4)}</div>
      </div>

      <div className="splash-center">
        <div className="splash-word font-display">
          {WORD.split("").map((ch, i) => (
            <span key={i} className="splash-mask">
              <span className="splash-ch" style={{ animationDelay: `${40 + i * 45}ms` }}>{ch}</span>
            </span>
          ))}
        </div>
        <div className="splash-sub">SNG · байер в Китае</div>
      </div>

      {STICKERS.map((s, i) => (
        <span key={s.pos} className={`splash-st ${s.pos}`} style={{ animationDelay: `${420 + i * 80}ms` }}>
          {s.text}
        </span>
      ))}
    </div>
  )
}
