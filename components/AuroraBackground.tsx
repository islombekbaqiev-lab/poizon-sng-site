"use client"

export default function AuroraBackground() {
  return (
    <div className="aurora-root" aria-hidden>
      {/* Grain overlay */}
      <svg className="aurora-grain" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Aurora blobs */}
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="aurora-blob aurora-3" />
      <div className="aurora-blob aurora-4" />
      <div className="aurora-blob aurora-5" />

      {/* Dot grid */}
      <div className="aurora-grid" />

      <style>{`
        .aurora-root {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .aurora-grain {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.035;
          z-index: 10;
        }

        .aurora-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 32px 32px;
          z-index: 1;
        }

        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          mix-blend-mode: screen;
          will-change: transform;
        }

        /* Blue primary — top right */
        .aurora-1 {
          width: 700px;
          height: 700px;
          top: -10%;
          right: -5%;
          background: radial-gradient(circle at 40% 40%, rgba(77,150,255,0.22), transparent 65%);
          animation: aurora-drift-1 18s ease-in-out infinite;
        }

        /* Indigo — top left */
        .aurora-2 {
          width: 600px;
          height: 600px;
          top: -15%;
          left: -8%;
          background: radial-gradient(circle at 60% 50%, rgba(99,102,241,0.18), transparent 65%);
          animation: aurora-drift-2 22s ease-in-out infinite;
        }

        /* Cyan accent — center right */
        .aurora-3 {
          width: 400px;
          height: 400px;
          top: 30%;
          right: 15%;
          background: radial-gradient(circle at 50% 50%, rgba(6,182,212,0.13), transparent 65%);
          animation: aurora-drift-3 15s ease-in-out infinite;
          filter: blur(60px);
        }

        /* Purple — bottom left */
        .aurora-4 {
          width: 500px;
          height: 500px;
          bottom: -10%;
          left: 10%;
          background: radial-gradient(circle at 50% 40%, rgba(139,92,246,0.14), transparent 65%);
          animation: aurora-drift-4 25s ease-in-out infinite;
        }

        /* Blue glow — bottom center */
        .aurora-5 {
          width: 350px;
          height: 350px;
          bottom: 5%;
          left: 40%;
          background: radial-gradient(circle at 50% 50%, rgba(37,99,235,0.16), transparent 65%);
          animation: aurora-drift-5 20s ease-in-out infinite;
          filter: blur(70px);
        }

        @keyframes aurora-drift-1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-60px, 40px) scale(1.08); }
          66%      { transform: translate(40px, -50px) scale(0.94); }
        }

        @keyframes aurora-drift-2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(70px, 60px) scale(1.1); }
          70%      { transform: translate(-40px, -30px) scale(0.92); }
        }

        @keyframes aurora-drift-3 {
          0%,100% { transform: translate(0,0) scale(1); }
          30%      { transform: translate(-80px, -40px) scale(1.15); }
          65%      { transform: translate(50px, 60px) scale(0.88); }
        }

        @keyframes aurora-drift-4 {
          0%,100% { transform: translate(0,0) scale(1); }
          45%      { transform: translate(60px, -70px) scale(1.12); }
          75%      { transform: translate(-50px, 40px) scale(0.9); }
        }

        @keyframes aurora-drift-5 {
          0%,100% { transform: translate(0,0) scale(1); }
          35%      { transform: translate(-70px, -50px) scale(1.2); }
          70%      { transform: translate(80px, 30px) scale(0.85); }
        }
      `}</style>
    </div>
  )
}
