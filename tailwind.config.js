/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        page:    "#F2F2F4",
        card:    "#FFFFFF",
        ink:     { DEFAULT: "#111113", 2: "rgba(17,17,19,0.74)", 3: "rgba(17,17,19,0.52)", 4: "rgba(17,17,19,0.38)" },
        line:    "rgba(17,17,19,0.09)",
        accent:  { DEFAULT: "#00B2A0", soft: "rgba(0,178,160,0.10)" },
        danger:  "#F0564A",
      },
      boxShadow: {
        xs:   "0 1px 2px rgba(17,17,19,0.04)",
        soft: "0 2px 8px rgba(17,17,19,0.05)",
        md:   "0 8px 24px rgba(17,17,19,0.07)",
        lg:   "0 20px 50px rgba(17,17,19,0.10)",
        ink:  "0 10px 28px rgba(17,17,19,0.22)",
      },
      borderRadius: { md: "18px", lg: "24px", xl: "30px" },
    },
  },
  plugins: [],
}
