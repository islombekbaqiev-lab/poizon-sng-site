"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"

import { CONSENT_EVENT, readConsent } from "@/lib/consent"

const YM_ID  = 109131869
const GA4_ID = "G-LVZ45X3YTE"

/** Сторонние cookie, которые удаляем при отзыве согласия. */
const THIRD_PARTY_COOKIES = ["_ga", "_gid", "_ym_uid", "_ym_d", "_ym_isad", "_ym_visorc", "yandexuid"]

function dropCookie(name: string) {
  const base = `${name}=; Path=/; Max-Age=0; SameSite=Lax`
  document.cookie = base
  // Метрика и GA ставят cookie на корневой домен — чистим и его.
  const root = location.hostname.split(".").slice(-2).join(".")
  document.cookie = `${base}; Domain=.${root}`
}

export default function AnalyticsScripts() {
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setEnabled(readConsent()?.analytics ?? false)

    const onChange = (e: Event) => {
      const next = (e as CustomEvent).detail?.analytics ?? false
      setEnabled(prev => {
        // Отозвали уже выданное согласие: выгрузить скрипты из страницы нельзя,
        // поэтому чистим их cookie и перезагружаемся — так отзыв действительно работает.
        if (prev === true && next === false) {
          THIRD_PARTY_COOKIES.forEach(dropCookie)
          location.reload()
        }
        return next
      })
    }

    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  // В App Router переходы не перезагружают страницу — просмотры шлём вручную.
  useEffect(() => {
    if (!enabled) return
    const w = window as any
    w.gtag?.("config", GA4_ID, { page_path: pathname })
    w.ym?.(YM_ID, "hit", pathname)
  }, [enabled, pathname])

  if (!enabled) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="lazyOnload" />
      <Script id="ga4-init" strategy="lazyOnload">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA4_ID}', { page_path: window.location.pathname, anonymize_ip: true });
      `}</Script>

      <Script id="ym-init" strategy="lazyOnload">{`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
        ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
      `}</Script>
    </>
  )
}
