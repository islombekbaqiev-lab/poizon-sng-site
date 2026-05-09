import { Metadata } from "next"
import Link from "next/link"

const SITE_URL = "https://poizonsng.com"
const TG_LINK  = "https://t.me/PoizonAdvisor"

export const metadata: Metadata = {
  title: "Как заказать с Poizon в Россию — пошаговая инструкция | POIZON SNG",
  description: "Как купить товар с Poizon (得物) с доставкой в Россию, Казахстан и СНГ. Пошаговая инструкция: от выбора товара до получения. Байер Poizon — проверенная схема.",
  keywords: [
    "как заказать с Poizon", "байер Poizon Россия", "купить с Poizon доставка",
    "как купить с Poizon в Россию", "Poizon доставка Казахстан", "得物 доставка СНГ",
    "байер Китай кроссовки", "как работает байер Poizon",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Как заказать с Poizon в Россию | POIZON SNG",
    description: "Пошаговая инструкция: как купить оригинальные кроссовки и одежду с Poizon (得物) с доставкой в СНГ.",
    url: `${SITE_URL}/how-to-order`,
    siteName: "POIZON SNG",
    locale: "ru_RU",
    type: "article",
  },
  alternates: { canonical: `${SITE_URL}/how-to-order` },
}

const STEPS = [
  {
    n: "01",
    title: "Найдите товар",
    body: "Выберите товар в нашем каталоге или найдите на сайте Poizon (dewu.com / poizon.com). Можно скинуть прямую ссылку на товар или просто написать название модели и размер.",
  },
  {
    n: "02",
    title: "Напишите нам в Telegram",
    body: "Пишите @PoizonAdvisor. Укажите: название товара, размер, страну доставки. Мы проверим наличие и актуальную цену в юанях, пересчитаем в вашу валюту по курсу дня.",
  },
  {
    n: "03",
    title: "Получите расчёт стоимости",
    body: "Мы рассчитаем итоговую цену: стоимость товара + доставка из Китая до вас. Три варианта доставки: Авиа (3–5 дней, 225 ¥/кг), Экспресс (10–12 дней, 173 ¥/кг), Стандарт (~25 дней, 77 ¥/кг).",
  },
  {
    n: "04",
    title: "Оплатите заказ",
    body: "Принимаем переводы в ₽, ₸, BYN, сумах, сомони и других валютах СНГ. Реквизиты и способ оплаты согласуем в Telegram — подберём удобный для вашего банка.",
  },
  {
    n: "05",
    title: "Выкупаем на Poizon",
    body: "После оплаты сразу выкупаем товар на платформе Poizon (得物). Каждый товар проходит экспертизу подлинности Poizon — в комплекте идёт сертификат с QR-кодом.",
  },
  {
    n: "06",
    title: "Доставка к вам",
    body: "Товар летит из Китая к вам. Вы получаете трек-номер и отслеживаете посылку на каждом этапе. Последняя миля по России — СДЭК, по Казахстану — СДЭК/Kazpost.",
  },
]

const FAQS = [
  {
    q: "Сколько стоит доставка?",
    a: "Авиа: 225 ¥/кг (3–5 дней). Экспресс: 173 ¥/кг (10–12 дней). Стандарт: 77 ¥/кг (~25 дней). Пара кроссовок весит ~0.9 кг, так что авиадоставка обойдётся примерно в 200 ¥ (~2 700 ₽).",
  },
  {
    q: "Что такое Poizon (得物)?",
    a: "Poizon (得物, Dewu) — крупнейшая китайская платформа аутентифицированных товаров. Каждый товар проходит проверку экспертами Poizon перед отправкой. Более 300 миллионов пользователей и 100+ миллионов товаров.",
  },
  {
    q: "Откуда берутся цены ниже, чем в России?",
    a: "Poizon — это китайский рынок, где конкуренция выше и цены ниже. Nike Air Force 1 на Poizon стоит ~600 ¥ (≈8 000 ₽), в российских магазинах — 12 000–18 000 ₽. Разница покрывает доставку и нашу комиссию.",
  },
  {
    q: "Как убедиться в подлинности?",
    a: "Все товары проходят многоступенчатую проверку Poizon: визуальная экспертиза, проверка стежки, подошвы, бирок, коробки. Каждый товар получает сертификат с уникальным QR-кодом, который можно проверить в приложении.",
  },
  {
    q: "Можно заказать товар которого нет в каталоге?",
    a: "Да — это основная услуга. Мы выкупаем любой товар с Poizon. Скиньте ссылку с Poizon или dewu.com, или просто напишите название модели — найдём и рассчитаем стоимость.",
  },
]

const SIZE_GUIDES = [
  { slug: "nike",        label: "Nike"        },
  { slug: "adidas",      label: "Adidas"      },
  { slug: "jordan",      label: "Jordan"      },
  { slug: "new-balance", label: "New Balance" },
  { slug: "puma",        label: "Puma"        },
  { slug: "vans",        label: "Vans"        },
  { slug: "salomon",     label: "Salomon"     },
  { slug: "hoka",        label: "Hoka"        },
  { slug: "converse",    label: "Converse"    },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "POIZON SNG", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Как заказать с Poizon", item: `${SITE_URL}/how-to-order` },
      ],
    },
    {
      "@type": "HowTo",
      name: "Как заказать с Poizon в Россию и СНГ",
      description: "Пошаговая инструкция как купить товар с Poizon (得物) с доставкой в Россию, Казахстан и другие страны СНГ через байера.",
      step: STEPS.map(s => ({
        "@type": "HowToStep",
        name: s.title,
        text: s.body,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}

export default function HowToOrderPage() {
  return (
    <main className="min-h-screen bg-[#050C1A]" style={{ color: "#fff" }}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="max-w-4xl mx-auto px-5 sm:px-8 py-5 flex items-center gap-3">
        <Link href="/" className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
          ← Главная
        </Link>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
        <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>Как заказать</span>
      </nav>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-24">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: "#4D96FF" }}>
            Инструкция
          </p>
          <h1 className="font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Как заказать<br />с Poizon в СНГ
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Poizon (得物) — китайская платформа оригинальных товаров. Мы выкупаем и доставляем в Россию,
            Казахстан, Беларусь и ещё 5 стран СНГ.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16 space-y-4">
          {STEPS.map((s, i) => (
            <div key={i} className="flex gap-5 rounded-2xl p-5 transition-all"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-3xl font-black flex-shrink-0 leading-none mt-0.5"
                style={{ color: "rgba(77,150,255,0.35)", fontVariantNumeric: "tabular-nums" }}>
                {s.n}
              </span>
              <div>
                <h2 className="font-black text-base mb-1.5">{s.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5 mb-16"
          style={{ background: "rgba(77,150,255,0.08)", border: "1px solid rgba(77,150,255,0.18)" }}>
          <div>
            <p className="font-black text-lg mb-1">Готовы сделать заказ?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Напишите в Telegram — ответим за 15 минут в рабочее время.
            </p>
          </div>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3 rounded-2xl text-white font-bold text-sm transition-all hover:scale-105"
            style={{ background: "#4D96FF", boxShadow: "0 8px 24px rgba(77,150,255,0.3)" }}>
            Написать в Telegram →
          </a>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="font-black text-xl mb-6">Частые вопросы</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="font-bold text-sm mb-2">{f.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Size guides */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            Размерные сетки брендов
          </h2>
          <div className="flex flex-wrap gap-2">
            {SIZE_GUIDES.map(b => (
              <Link key={b.slug} href={`/size-guide/${b.slug}`}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.7)" }}>
                {b.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
