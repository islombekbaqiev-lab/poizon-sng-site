/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        bg:   "#050C1A",
        fg:   "rgba(255,255,255,0.88)",
        muted:  "rgba(255,255,255,0.48)",
        border: "rgba(255,255,255,0.08)",
        surface: "rgba(255,255,255,0.03)",
        blue: { DEFAULT: "#4D96FF", dim: "rgba(77,150,255,0.15)" },
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0,0,0,0.55)",
        blue: "0 12px 40px rgba(77,150,255,0.32)",
      },
      borderRadius: {
        xl: "24px",
      },
    },
  },
  plugins: [],
}
