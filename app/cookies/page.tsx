import { Metadata } from "next"
import Link from "next/link"

import LegalLayout, { LegalSection } from "@/components/LegalLayout"
import CookieSettingsButton from "@/components/CookieSettingsButton"
import { LEGAL } from "@/lib/legal"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Политика использования файлов cookie | POIZON SNG",
  description:
    "Какие файлы cookie использует poizonsng.com, зачем они нужны, сколько хранятся и как отозвать согласие или отключить их в браузере.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: `${SITE_URL}/cookies` },
  robots: { index: true, follow: true },
}

const TABLE = [
  {
    name: "pzn_consent",
    cat: "Необходимые",
    purpose: "Хранит ваш выбор в баннере о cookie, чтобы не спрашивать повторно",
    ttl: "6 месяцев",
    owner: "poizonsng.com",
  },
  {
    name: "pzn_country",
    cat: "Необходимые",
    purpose: "Выбранная страна доставки и валюта отображения цен",
    ttl: "До очистки браузера",
    owner: "poizonsng.com (localStorage)",
  },
  {
    name: "pzn_intro",
    cat: "Необходимые",
    purpose: "Отмечает, что заставка уже была показана в текущей сессии",
    ttl: "До закрытия вкладки",
    owner: "poizonsng.com (sessionStorage)",
  },
  {
    name: "_ym_uid, _ym_d, _ym_isad",
    cat: "Аналитические",
    purpose: "Яндекс.Метрика: различение посетителей, статистика посещений",
    ttl: "до 12 месяцев",
    owner: "mc.yandex.ru",
  },
  {
    name: "_ga, _ga_*",
    cat: "Аналитические",
    purpose: "Google Analytics 4: агрегированная статистика поведения на сайте",
    ttl: "до 24 месяцев",
    owner: "google-analytics.com",
  },
]

export default function CookiesPage() {
  return (
    <LegalLayout
      current="/cookies"
      title="Политика использования файлов cookie"
      intro="Что такое cookie, какие именно мы ставим, зачем и как отказаться, не потеряв работоспособность сайта."
    >
      <LegalSection title="1. Что такое cookie">
        <p>
          Cookie — небольшие текстовые файлы, которые сайт сохраняет в вашем браузере. Наряду с
          ними сайт использует технологии локального хранения браузера — localStorage и
          sessionStorage. Ниже под словом «cookie» понимаются все эти механизмы.
        </p>
      </LegalSection>

      <LegalSection title="2. Категории и принцип согласия">
        <p>
          <strong>Необходимые cookie</strong> обеспечивают базовую работу сайта: запоминают ваш
          выбор в баннере, страну доставки и валюту. Без них сайт работать не может, поэтому они
          устанавливаются на основании законного интереса и не требуют согласия.
        </p>
        <p>
          <strong>Аналитические cookie</strong> (Яндекс.Метрика, Google Analytics 4) показывают,
          какие страницы смотрят и где посетители уходят. Соответствующие скрипты{" "}
          <strong>не загружаются, пока вы не дали согласие</strong>: до вашего выбора ни один
          сторонний запрос к mc.yandex.ru или googletagmanager.com со страницы не уходит.
        </p>
        <p>
          <strong>Вебвизор Яндекс.Метрики</strong> (запись движений курсора, кликов и прокрутки)
          включается только при согласии на аналитические cookie. Поля ввода и содержимое
          переписки в записи не попадают.
        </p>
      </LegalSection>

      <LegalSection title="3. Перечень используемых cookie">
        <table>
          <thead>
            <tr><th>Имя</th><th>Категория</th><th>Назначение</th><th>Срок</th><th>Владелец</th></tr>
          </thead>
          <tbody>
            {TABLE.map(r => (
              <tr key={r.name}>
                <td><code>{r.name}</code></td>
                <td>{r.cat}</td>
                <td>{r.purpose}</td>
                <td>{r.ttl}</td>
                <td>{r.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </LegalSection>

      <LegalSection title="4. Как изменить или отозвать согласие">
        <p>
          Решение можно поменять в любой момент — прямо здесь:
        </p>
        <CookieSettingsButton label="Открыть настройки cookie" />
        <p>
          Та же кнопка есть в подвале каждой страницы. После отзыва согласия аналитические
          скрипты перестают загружаться при следующей загрузке страницы, а ранее установленные
          сторонние cookie вы можете удалить средствами браузера.
        </p>
      </LegalSection>

      <LegalSection title="5. Отключение cookie в браузере">
        <p>
          Все браузеры позволяют блокировать или удалять cookie в настройках
          конфиденциальности: Chrome — «Настройки → Конфиденциальность и безопасность → Файлы
          cookie», Safari — «Настройки → Конфиденциальность», Firefox — «Настройки → Приватность
          и защита». Учтите: блокировка всех cookie сбросит выбранную страну доставки и баннер
          согласия будет появляться при каждом визите.
        </p>
      </LegalSection>

      <LegalSection title="6. Связанные документы">
        <p>
          Что происходит с данными после их сбора, описано в{" "}
          <Link href="/privacy">Политике обработки персональных данных</Link>. Вопросы —{" "}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
