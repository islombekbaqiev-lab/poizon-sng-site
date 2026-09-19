"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"

import {
  ACCEPT_ALL, REJECT_ALL, CONSENT_EVENT, CONSENT_OPEN_EVENT,
  type Consent, readConsent, writeConsent,
} from "@/lib/consent"

type Mode = "hidden" | "banner" | "settings"

export default function CookieConsent() {
  const [mode, setMode]         = useState<Mode>("hidden")
  const [analytics, setAnalytics] = useState(false)

  // Решение читаем только после монтирования — на сервере cookie ещё не видно,
  // а мигание баннера на каждой навигации нам не нужно.
  useEffect(() => {
    const saved = readConsent()
    if (!saved) setMode("banner")
    else setAnalytics(saved.analytics)
  }, [])

  // Кнопка «Настройки cookie» из подвала и со страницы /cookies.
  useEffect(() => {
    const open = () => {
      setAnalytics(readConsent()?.analytics ?? false)
      setMode("settings")
    }
    window.addEventListener(CONSENT_OPEN_EVENT, open)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open)
  }, [])

  // Esc закрывает панель настроек, но не баннер: от баннера нужен явный выбор.
  useEffect(() => {
    if (mode !== "settings") return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMode(readConsent() ? "hidden" : "banner") }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mode])

  const decide = useCallback((choice: Omit<Consent, "ts">) => {
    writeConsent(choice)
    setAnalytics(choice.analytics)
    setMode("hidden")
  }, [])

  if (mode === "hidden") return null

  const link = { color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "2px" }

  return (
    <div
      role="dialog"
      aria-modal={mode === "settings"}
      aria-label="Согласие на использование файлов cookie"
      className="fixed inset-x-0 bottom-0 z-[99996] px-3 pb-3 sm:px-5 sm:pb-5"
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl p-5 sm:p-6"
        style={{
          background: "var(--card)",
          border: "1px solid var(--line)",
          boxShadow: "0 24px 70px rgba(17,17,19,0.14)",
        }}
      >
        {mode === "banner" ? (
          <>
            <p className="font-bold text-sm mb-2">Мы используем файлы cookie</p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--ink-3)" }}>
              Технические cookie нужны, чтобы сайт помнил выбранную страну и валюту — без них он
              не работает. Аналитические (Яндекс.Метрика, Google Analytics) подключаются только
              с вашего согласия и помогают понять, что на сайте улучшить. Подробности —{" "}
              <Link href="/cookies" style={link}>в политике cookie</Link> и{" "}
              <Link href="/privacy" style={link}>политике конфиденциальности</Link>.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => decide(ACCEPT_ALL)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-transform hover:scale-[1.03]"
                style={{ background: "var(--ink-block)", boxShadow: "0 6px 22px rgba(17,17,19,0.16)" }}
              >
                Принять все
              </button>
              <button
                onClick={() => decide(REJECT_ALL)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ background: "var(--card-alt)", border: "1px solid var(--line)", color: "var(--ink-2)" }}
              >
                Только необходимые
              </button>
              <button
                onClick={() => setMode("settings")}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ color: "var(--ink-3)" }}
              >
                Настроить
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="font-bold text-sm mb-4">Настройки cookie</p>

            <div className="rounded-xl p-4 mb-2.5"
              style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold mb-1">Необходимые</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--ink-3)" }}>
                    Выбор страны и валюты, сохранение этого решения. Отключить нельзя — без них
                    сайт не работает.
                  </p>
                </div>
                <span className="text-xs font-semibold shrink-0 mt-0.5" style={{ color: "var(--ink-4)" }}>
                  Всегда вкл.
                </span>
              </div>
            </div>

            <label
              className="block rounded-xl p-4 mb-5 cursor-pointer transition-colors"
              style={{
                background: analytics ? "var(--accent-sf)" : "var(--line)",
                border: `1px solid ${analytics ? "var(--accent-sf)" : "var(--line)"}`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold mb-1">Аналитические</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--ink-3)" }}>
                    Яндекс.Метрика (включая вебвизор) и Google Analytics 4. Скрипты не загружаются,
                    пока переключатель выключен.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={e => setAnalytics(e.target.checked)}
                  className="shrink-0 mt-0.5 w-5 h-5 cursor-pointer accent-[#4D96FF]"
                />
              </div>
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => decide({ ...REJECT_ALL, analytics })}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-transform hover:scale-[1.03]"
                style={{ background: "var(--ink-block)", boxShadow: "0 6px 22px rgba(17,17,19,0.16)" }}
              >
                Сохранить выбор
              </button>
              <button
                onClick={() => decide(ACCEPT_ALL)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ background: "var(--card-alt)", border: "1px solid var(--line)", color: "var(--ink-2)" }}
              >
                Принять все
              </button>
              <button
                onClick={() => decide(REJECT_ALL)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ color: "var(--ink-3)" }}
              >
                Отклонить аналитику
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
