import AnnouncementBar from "@/components/AnnouncementBar"
import ClientShell     from "@/components/ClientShell"

export default function Home() {
  return (
    // Светлая страница не нуждается в декоративных блобах и градиентах:
    // фон работает как чистая подложка, а внимание держит сам товар.
    <main className="min-h-screen" style={{ background: "var(--page)" }}>
      {/* Полоса с условиями — в общем потоке, шапка встаёт под ней */}
      <AnnouncementBar />
      <ClientShell />
    </main>
  )
}
