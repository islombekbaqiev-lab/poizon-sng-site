import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "О нас — POIZON SNG",
  description: "Байер-сервис POIZON SNG: выкупаем оригинальные кроссовки, одежду и аксессуары с Poizon (得物) и доставляем в Россию, Казахстан, Беларусь и СНГ.",
  alternates: { canonical: "https://poizonsng.com/about" },
}

export default function AboutPage() {
  return <AboutClient />
}
