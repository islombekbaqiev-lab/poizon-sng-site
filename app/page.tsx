import AnnouncementBar from "@/components/AnnouncementBar"
import ClientShell     from "@/components/ClientShell"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050C1A] relative">

      {/* Static background — no JS required */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-100" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize:  "28px 28px",
        }} />
        <div className="blob1 absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)", filter: "blur(60px)" }} />
        <div className="blob2 absolute bottom-[-15%] right-[-8%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)", filter: "blur(80px)" }} />
        <div className="blob3 absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(77,150,255,0.1), transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="relative z-10">
        <AnnouncementBar />
        <ClientShell />
      </div>

    </main>
  )
}
