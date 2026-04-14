/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        brand: "#f97316",
        brandDark: "#ea580c",
        background: "#f8fafc",
        card: "#ffffff",
        textPrimary: "#020617",
        textSecondary: "#64748b",
        success: "#22c55e",
        danger: "#ef4444",
        sectionLight: "#f1f5f9",
        sectionBrand: "#fff7ed",
        sectionDark: "#0f172a",
      },
    },
  },
  plugins: [],
};
