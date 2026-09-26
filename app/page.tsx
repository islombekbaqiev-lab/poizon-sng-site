import AnnouncementBar from "@/components/AnnouncementBar"
import ClientShell     from "@/components/ClientShell"
import Splash          from "@/components/Splash"
import { getProducts, listProducts } from "@/lib/catalog"

export default function Home() {
  return (
    // Светлая страница не нуждается в декоративных блобах и градиентах:
    // фон работает как чистая подложка, а внимание держит сам товар.
    <main className="min-h-screen" style={{ background: "var(--page)" }}>
      {/* Полоса с условиями — в общем потоке, шапка встаёт под ней */}
      <Splash count={getProducts().length} />
      <AnnouncementBar />
      <ClientShell initialProducts={listProducts({ limit: 12 })} />
    </main>
  )
}
