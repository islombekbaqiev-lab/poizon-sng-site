import Link from "next/link"
import { LEGAL, LEGAL_UPDATED } from "@/lib/legal"

const DOCS = [
  { href: "/privacy", label: "Конфиденциальность" },
  { href: "/cookies", label: "Cookie" },
  { href: "/terms",   label: "Оферта" },
]

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-semibold text-lg mb-3 leading-snug" style={{ color: "var(--ink)" }}>{title}</h2>
      <div className="legal-prose">{children}</div>
    </section>
  )
}

export default function LegalLayout({
  title,
  intro,
  current,
  children,
}: {
  title: string
  intro: string
  current: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-[var(--page)]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors hover:text-[var(--ink)]"
          style={{ color: "var(--ink-3)" }}
        >
          ← На главную
        </Link>

        <p className="eyebrow mb-3">Правовая информация</p>
        <h1 className="font-display leading-[1.1] mb-4"
          style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
          {title}
        </h1>
        <p className="text-base leading-relaxed mb-3" style={{ color: "var(--ink-3)" }}>
          {intro}
        </p>
        <p className="text-xs mb-10" style={{ color: "var(--ink-4)" }}>
          Редакция от {LEGAL_UPDATED} · {LEGAL.operatorShort}
        </p>

        <nav className="flex flex-wrap gap-2 mb-12">
          {DOCS.map(d => (
            <Link
              key={d.href}
              href={d.href}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
              style={
                d.href === current
                  ? { background: "var(--accent-sf)", border: "1px solid var(--accent-ln)", color: "var(--accent)" }
                  : { background: "var(--card)", border: "1px solid var(--line)", color: "var(--ink-3)" }
              }
            >
              {d.label}
            </Link>
          ))}
        </nav>

        {children}

        <div className="line-h my-12" />

        <div className="rounded-2xl p-6"
          style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
          <p className="font-bold text-sm mb-3">Реквизиты и контакты для обращений</p>
          <dl className="text-sm space-y-1.5" style={{ color: "var(--ink-3)" }}>
            <div><span style={{ color: "var(--ink-4)" }}>Оператор: </span>{LEGAL.operator}</div>
            <div><span style={{ color: "var(--ink-4)" }}>ИНН: </span>{LEGAL.inn}</div>
            <div><span style={{ color: "var(--ink-4)" }}>ОГРНИП: </span>{LEGAL.ogrn}</div>
            <div><span style={{ color: "var(--ink-4)" }}>Адрес: </span>{LEGAL.address}</div>
            <div>
              <span style={{ color: "var(--ink-4)" }}>E-mail: </span>
              <a href={`mailto:${LEGAL.email}`} style={{ color: "var(--accent)" }}>{LEGAL.email}</a>
            </div>
            <div>
              <span style={{ color: "var(--ink-4)" }}>Telegram: </span>
              <a href={LEGAL.telegram} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                {LEGAL.telegramHandle}
              </a>
            </div>
          </dl>
        </div>

      </div>
    </main>
  )
}
