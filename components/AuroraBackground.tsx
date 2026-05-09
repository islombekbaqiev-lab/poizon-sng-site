"use client"

export default function AuroraBackground() {
  return (
    <div className="aurora-root" aria-hidden>
      {/* Perspective grid */}
      <div className="aurora-grid-wrap">
        <div className="aurora-grid-plane" />
        <div className="aurora-grid-fade" />
        {/* Horizon glow line */}
        <div className="aurora-horizon-line" />
        {/* Vanishing point glow */}
        <div className="aurora-vp-glow" />
        {/* Scanlines */}
        <div className="aurora-scanlines" />
      </div>

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

        .aurora-grid-wrap {
          position: absolute;
          inset: 0;
          perspective: 400px;
          z-index: 2;
          overflow: hidden;
        }

        .aurora-grid-plane {
          position: absolute;
          width: 260%;
          height: 180%;
          left: -80%;
          top: 36%;
          transform: rotateX(75deg) translateZ(0);
          transform-origin: top center;
          background-image:
            linear-gradient(rgba(77,150,255,0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77,150,255,0.22) 1px, transparent 1px);
          background-size: 80px 80px;
          animation: grid-scroll 4s linear infinite;
        }

        .aurora-grid-fade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom,
              #050C1A 0%,
              #050C1A 30%,
              transparent 42%,
              transparent 78%,
              #050C1A 100%
            ),
            radial-gradient(ellipse 60% 40% at 50% 36%,
              transparent 0%,
              #050C1A 100%
            );
          z-index: 3;
        }

        .aurora-horizon-line {
          position: absolute;
          left: 0; right: 0;
          top: 36%;
          height: 1px;
          background: linear-gradient(to right,
            transparent 0%,
            rgba(77,150,255,0.15) 15%,
            rgba(77,150,255,0.7) 40%,
            rgba(120,200,255,1) 50%,
            rgba(77,150,255,0.7) 60%,
            rgba(77,150,255,0.15) 85%,
            transparent 100%
          );
          z-index: 4;
          filter: blur(0.5px);
        }

        .aurora-vp-glow {
          position: absolute;
          left: 50%;
          top: 36%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse at center bottom,
            rgba(77,150,255,0.28) 0%,
            rgba(77,150,255,0.08) 40%,
            transparent 70%
          );
          z-index: 2;
          filter: blur(8px);
        }

        .aurora-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.08) 3px,
            rgba(0,0,0,0.08) 4px
          );
          z-index: 5;
          pointer-events: none;
        }

        @keyframes grid-scroll {
          from { background-position: 0 0; }
          to   { background-position: 0 80px; }
        }

        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          z-index: 0;
        }

        /* Mobile: kill all animations and blur */
        @media (max-width: 768px) {
          .aurora-blob { animation: none !important; filter: blur(60px); }
          .aurora-3, .aurora-4, .aurora-5 { display: none; }
          .aurora-grid-plane { animation: none !important; }
          .aurora-scanlines { display: none; }
          .aurora-vp-glow { filter: none; }
        }

        /* Blue primary — top right */
        .aurora-1 {
          width: 700px;
          height: 700px;
          top: -10%;
          right: -5%;
          background: rgba(77,150,255,0.22);
          animation: aurora-drift-1 18s ease-in-out infinite;
        }

        /* Indigo — top left */
        .aurora-2 {
          width: 600px;
          height: 600px;
          top: -15%;
          left: -8%;
          background: rgba(99,102,241,0.18);
          animation: aurora-drift-2 22s ease-in-out infinite;
        }

        /* Cyan accent — center right */
        .aurora-3 {
          width: 400px;
          height: 400px;
          top: 30%;
          right: 15%;
          background: rgba(6,182,212,0.13);
          animation: aurora-drift-3 15s ease-in-out infinite;
          filter: blur(70px);
        }

        /* Purple — bottom left */
        .aurora-4 {
          width: 500px;
          height: 500px;
          bottom: -10%;
          left: 10%;
          background: rgba(139,92,246,0.14);
          animation: aurora-drift-4 25s ease-in-out infinite;
        }

        /* Deep blue — bottom center */
        .aurora-5 {
          width: 350px;
          height: 350px;
          bottom: 5%;
          left: 40%;
          background: rgba(37,99,235,0.16);
          animation: aurora-drift-5 20s ease-in-out infinite;
          filter: blur(80px);
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
