/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        bg:   "#050C1A",
        blue: { DEFAULT: "#4D96FF", dim: "rgba(77,150,255,0.15)" },
      },
    },
  },
  plugins: [],
}
